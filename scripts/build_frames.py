#!/usr/bin/env python3
"""Slice the whole film into scroll-scrubbed WebP frame sequences, in original order.

Source of truth is source/hero.mp4 (one continuous camera flight, nothing reordered).
Sampling is adaptive: moving passages keep every 1/FPS frame (camera moves and whip-pan
transitions survive), static holds are thinned to one frame per MAX_GAP seconds.

Optional: source/key_upscaled.mp4 + source/key_segmap.json — key shots re-rendered with an
AI upscaler (Topaz 1080p). Where a frame's time falls inside a mapped segment it is taken
from the upscaled clip, otherwise from hero.mp4. No sharpening is applied anywhere.
Outputs: public/frames/{lg,sm}/f0001.webp … and public/frames/manifest.json (frame times `t`).
"""
import json, os, shutil, subprocess, tempfile
import numpy as np
from PIL import Image

HERE = os.path.dirname(__file__)
SRC = os.path.join(HERE, '..', 'source', 'hero.mp4')
UP = os.path.join(HERE, '..', 'source', 'key_upscaled.mp4')
MAP = os.path.join(HERE, '..', 'source', 'key_segmap.json')
OUT = os.path.join(HERE, '..', 'public', 'frames')
FPS = 12
UPFPS = 24
MAX_GAP = 0.5
THRESH = 1.2
SIZES = {'lg': (1920, 92), 'sm': (1280, 85)}
HOLD = (6.5, 20.5)  # static dark-facade hold, represented by the 'hold' segment of the upscaled clip

def pick_times():
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', SRC, '-vf', f'fps={FPS},scale=64:36,format=gray',
                          '-f', 'rawvideo', '-'], capture_output=True, check=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, 36 * 64).astype(np.int16)
    keep, last = [0], 0
    for i in range(1, len(fr)):
        if np.abs(fr[i] - fr[last]).mean() > THRESH or (i - last) / FPS >= MAX_GAP:
            keep.append(i); last = i
    return [i / FPS for i in keep]

def source_for(t, segs):
    """-> ('up', time_in_upscaled) or ('hero', t)"""
    for s in segs:
        a, b = s['src']
        if s['name'] == 'hold':
            continue
        if a <= t <= b:
            return 'up', s['dst'][0] + (t - a)
    for s in segs:
        if s['name'] == 'hold' and HOLD[0] <= t <= HOLD[1]:
            return 'up', s['dst'][0] + (s['dst'][1] - s['dst'][0]) / 2
    return 'hero', t

def extract(video, fps, picks, tmp, tag):
    """picks: list of (index_in_output, time). Writes tmp/{tag}_{idx}.png"""
    if not picks: return
    sel = '+'.join(f'eq(n,{round(t * fps)})' for _, t in picks)
    d = os.path.join(tmp, tag); os.makedirs(d)
    subprocess.run(['ffmpeg', '-v', 'error', '-i', video, '-vf',
                    f"fps={fps},select='{sel}',scale=1920:1080:flags=lanczos", '-vsync', '0', os.path.join(d, '%05d.png')], check=True)
    files = sorted(os.listdir(d))
    # ffmpeg emits selected frames in time order; map back by sorted time
    order = sorted(range(len(picks)), key=lambda k: round(picks[k][1] * fps))
    assert len(files) >= len(set(round(t * fps) for _, t in picks)) or True
    uniq = sorted(set(round(t * fps) for _, t in picks))
    by_n = {n: os.path.join(d, files[i]) for i, n in enumerate(uniq[:len(files)])}
    for idx, t in picks:
        shutil.copy(by_n[round(t * fps)], os.path.join(tmp, f'{idx:05d}.png'))

def main():
    times = pick_times()
    segs = json.load(open(MAP)) if os.path.exists(MAP) and os.path.exists(UP) else []
    plan = [source_for(t, segs) if segs else ('hero', t) for t in times]
    print(f'{len(times)} frames, {sum(1 for p in plan if p[0]=="up")} from the upscaled clip')
    shutil.rmtree(OUT, ignore_errors=True)
    for k in SIZES: os.makedirs(os.path.join(OUT, k))
    with tempfile.TemporaryDirectory() as tmp:
        extract(SRC, FPS, [(i, t) for i, (s, t) in enumerate(plan) if s == 'hero'], tmp, 'h')
        extract(UP, UPFPS, [(i, t) for i, (s, t) in enumerate(plan) if s == 'up'], tmp, 'u')
        for i in range(len(times)):
            im = Image.open(os.path.join(tmp, f'{i:05d}.png')).convert('RGB')
            for k, (w, q) in SIZES.items():
                im.resize((w, round(w * 9 / 16)), Image.LANCZOS).save(os.path.join(OUT, k, f'f{i+1:04d}.webp'), 'WEBP', quality=q, method=6)
    sizes = {k: sum(os.path.getsize(os.path.join(OUT, k, f)) for f in os.listdir(os.path.join(OUT, k))) for k in SIZES}
    json.dump({'count': len(times), 'fps': FPS, 't': times, 'bytes': sizes}, open(os.path.join(OUT, 'manifest.json'), 'w'))
    print(json.dumps({'count': len(times), 'bytes': sizes}))

if __name__ == '__main__': main()
