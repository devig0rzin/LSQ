"""Converte os PNG extraídos do vídeo em sequências WebP para o hero.

Uso: python3 -I build_hero_frames.py <pasta png> <apps/web>

- Desktop: quadro inteiro 1280x720.
- Celular: recorte vertical (proporção 0,9) que ACOMPANHA a peça quadro a quadro,
  como um operador de câmera. A posição da peça é medida pelo brilho do metal acima
  da bancada e suavizada para o enquadramento não tremer.
"""
import os, sys
import numpy as np
from PIL import Image

src, web = sys.argv[1], sys.argv[2]
out_d = os.path.join(web, "public", "hero-sequence", "desktop")
out_m = os.path.join(web, "public", "hero-sequence", "mobile")
for d in (out_d, out_m):
    os.makedirs(d, exist_ok=True)
    for f in os.listdir(d):
        os.remove(os.path.join(d, f))

files = sorted(f for f in os.listdir(src) if f.endswith(".png"))
images = [Image.open(os.path.join(src, f)).convert("RGB") for f in files]
W, H = images[0].size

# 1) centro horizontal da peça em cada quadro (fração da largura)
centers = []
for im in images:
    a = np.asarray(im.convert("L"), dtype=float)
    band = a[int(0.08 * H):int(0.55 * H), int(0.16 * W):int(0.94 * W)]
    ys, xs = np.nonzero(band > 110)
    centers.append(None if len(xs) < 3000 else (np.median(xs) + 0.16 * W) / W)

# quadros iniciais (peça ainda entrando) herdam o primeiro centro confiável
first = next(i for i, c in enumerate(centers) if c is not None and i >= 10)
for i in range(len(centers)):
    if i < first or centers[i] is None:
        centers[i] = centers[first] if i < first else centers[i - 1]

# 2) suavização (média móvel de 11 quadros) para um pan de câmera estável
k = 5
padded = [centers[0]] * k + centers + [centers[-1]] * k
smooth = [sum(padded[i:i + 2 * k + 1]) / (2 * k + 1) for i in range(len(centers))]

# 3) exporta
crop_w = round(H * 0.9)  # 648 px de 1280
out_w, out_h = 576, 640
tot_d = tot_m = 0
for i, (im, fx) in enumerate(zip(images, smooth), 1):
    pd = os.path.join(out_d, f"{i:03d}.webp")
    im.save(pd, "WEBP", quality=72, method=6)
    left = int(round(min(max(fx * W - crop_w / 2, 0), W - crop_w)))
    crop = im.crop((left, 0, left + crop_w, H)).resize((out_w, out_h), Image.LANCZOS)
    pm = os.path.join(out_m, f"{i:03d}.webp")
    crop.save(pm, "WEBP", quality=70, method=6)
    tot_d += os.path.getsize(pd)
    tot_m += os.path.getsize(pm)

n = len(files)
print(f"frames: {n}  desktop: {tot_d/1048576:.2f} MB  celular: {tot_m/1048576:.2f} MB")
print("centro da peça (suavizado) a cada 10 quadros:", [round(smooth[i], 2) for i in range(0, n, 10)])
