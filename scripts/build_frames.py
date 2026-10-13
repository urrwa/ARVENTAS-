#!/usr/bin/env python3
"""Slice source/hero.mp4 into scroll-scrubbed WebP frame sequences.

Chapters are hand-picked, sharpness-scored segments of the source film (soft/whip-pan stretches
and hard cuts are skipped). Adjacent chapters are cross-dissolved over XF frames so the
sequence plays as one continuous film. No sharpening is applied.
Outputs: public/frames/{lg,sm}/f0001.webp … and public/frames/manifest.json
"""
import json, os, shutil, subprocess, sys, tempfile
from PIL import Image

SRC = os.path.join(os.path.dirname(__file__), '..', 'source', 'hero.mp4')
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'frames')
FPS = 12
XF = 8  # crossfade frames between chapters
# (name, start_s, end_s)
CHAPTERS = [
    ('fassade', 0.2, 3.2),
    ('wohnen', 44.6, 51.6),
    ('schlafen', 60.5, 67.5),
    ('plan', 25.5, 32.0),
    ('luftbild', 79.5, 88.5),
    ('dachterrasse', 111.5, 119.8),
]
SIZES = {'lg': (1600, 78), 'sm': (960, 74)}

def extract(tmp, name, a, b):
    d = os.path.join(tmp, name); os.makedirs(d)
    subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(a), '-t', str(b - a), '-i', SRC,
                    '-vf', f'fps={FPS},scale=1920:1080:flags=lanczos', os.path.join(d, '%04d.png')], check=True)
    return [os.path.join(d, f) for f in sorted(os.listdir(d))]

def main():
    shutil.rmtree(OUT, ignore_errors=True)
    for k in SIZES: os.makedirs(os.path.join(OUT, k))
    with tempfile.TemporaryDirectory() as tmp:
        chaps = [(n, extract(tmp, n, a, b)) for n, a, b in CHAPTERS]
        seq, marks, idx = [], {}, 0
        for ci, (n, files) in enumerate(chaps):
            start = len(seq)
            body = files[:]
            if ci > 0:
                prev_tail = chaps[ci - 1][1][-XF:]
                for j in range(XF):
                    a = Image.open(prev_tail[j]).convert('RGB')
                    b = Image.open(files[j]).convert('RGB')
                    seq.append(Image.blend(a, b, (j + 1) / (XF + 1)))
                body = files[XF:]
            tail = XF if ci < len(chaps) - 1 else 0
            keep = body[:len(body) - tail] if tail else body
            for f in keep: seq.append(Image.open(f).convert('RGB'))
            marks[n] = [start, len(seq)]
        total = len(seq)
        for i, im in enumerate(seq, 1):
            for k, (w, q) in SIZES.items():
                h = round(w * 9 / 16)
                im.resize((w, h), Image.LANCZOS).save(os.path.join(OUT, k, f'f{i:04d}.webp'), 'WEBP', quality=q, method=6)
    sizes = {k: sum(os.path.getsize(os.path.join(OUT, k, f)) for f in os.listdir(os.path.join(OUT, k))) for k in SIZES}
    man = {'count': total, 'fps': FPS, 'chapters': {k: [v[0] / total, v[1] / total] for k, v in marks.items()}, 'bytes': sizes}
    json.dump(man, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1)
    print(json.dumps(man, indent=1))

if __name__ == '__main__': main()
