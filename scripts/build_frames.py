#!/usr/bin/env python3
"""Slice the whole of source/hero.mp4 into scroll-scrubbed WebP frame sequences, in original order.

The video is one continuous camera flight, so nothing is reordered or cross-faded. Sampling is
adaptive: moving passages keep every 1/FPS frame (so the camera moves and whip-pan transitions
survive), static holds are thinned to one frame per MAX_GAP seconds.
Outputs: public/frames/{lg,sm}/f0001.webp … and public/frames/manifest.json (frame times `t`).
"""
import json, os, shutil, subprocess, tempfile
import numpy as np
from PIL import Image

HERE = os.path.dirname(__file__)
SRC = os.path.join(HERE, '..', 'source', 'hero.mp4')
OUT = os.path.join(HERE, '..', 'public', 'frames')
FPS = 12
MAX_GAP = 0.5      # seconds; longest gap allowed inside a static hold
THRESH = 1.2       # mean abs difference (0-255, 64x36 gray) that counts as motion
SIZES = {'lg': (1920, 92), 'sm': (1280, 85)}

def pick_times():
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', SRC, '-vf', f'fps={FPS},scale=64:36,format=gray',
                          '-f', 'rawvideo', '-'], capture_output=True, check=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, 36 * 64).astype(np.int16)
    keep, last = [0], 0
    for i in range(1, len(fr)):
        moved = np.abs(fr[i] - fr[last]).mean() > THRESH
        if moved or (i - last) / FPS >= MAX_GAP:
            keep.append(i); last = i
    return [i / FPS for i in keep], len(fr)

def main():
    times, n = pick_times()
    print(f'{len(times)} of {n} frames kept')
    shutil.rmtree(OUT, ignore_errors=True)
    for k in SIZES: os.makedirs(os.path.join(OUT, k))
    with tempfile.TemporaryDirectory() as tmp:
        # extract the chosen frames in one pass using the frame index list
        sel = '+'.join(f'eq(n,{round(t * FPS)})' for t in times)
        subprocess.run(['ffmpeg', '-v', 'error', '-i', SRC, '-vf', f"fps={FPS},select='{sel}',scale=1920:1080:flags=lanczos",
                        '-vsync', '0', os.path.join(tmp, '%05d.png')], check=True)
        files = sorted(os.listdir(tmp))
        assert len(files) == len(times), (len(files), len(times))
        for i, f in enumerate(files, 1):
            im = Image.open(os.path.join(tmp, f)).convert('RGB')
            for k, (w, q) in SIZES.items():
                im.resize((w, round(w * 9 / 16)), Image.LANCZOS).save(os.path.join(OUT, k, f'f{i:04d}.webp'), 'WEBP', quality=q, method=6)
            os.remove(os.path.join(tmp, f))
    sizes = {k: sum(os.path.getsize(os.path.join(OUT, k, f)) for f in os.listdir(os.path.join(OUT, k))) for k in SIZES}
    json.dump({'count': len(times), 'fps': FPS, 't': times, 'bytes': sizes}, open(os.path.join(OUT, 'manifest.json'), 'w'))
    print(json.dumps({'count': len(times), 'bytes': sizes}))

if __name__ == '__main__': main()
