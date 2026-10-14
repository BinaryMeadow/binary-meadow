#!/usr/bin/env python3
"""Generate Open Graph images (1200x630) for the site and each app."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
REG = "/System/Library/Fonts/Supplemental/Arial.ttf"

GREEN_950 = (12, 36, 28)
GREEN_800 = (22, 67, 47)
GREEN_300 = (127, 184, 159)
CREAM = (241, 248, 244)


def vgradient(size, top, bottom):
    w, h = size
    base = Image.new("RGB", size, top)
    top_img = Image.new("RGB", size, bottom)
    mask = Image.new("L", size)
    md = mask.load()
    for y in range(h):
        v = int(255 * (y / h))
        for x in range(w):
            md[x, y] = v
    base.paste(top_img, (0, 0), mask)
    return base


def font(path, sz):
    return ImageFont.truetype(path, sz)


def wrap(draw, text, fnt, max_w):
    words = text.split()
    lines, cur = [], ""
    for word in words:
        test = (cur + " " + word).strip()
        if draw.textlength(test, font=fnt) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def rounded(img, radius):
    mask = Image.new("L", img.size, 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, img.size[0], img.size[1]], radius=radius, fill=255)
    out = img.convert("RGBA")
    out.putalpha(mask)
    return out


def make_home():
    img = vgradient((W, H), GREEN_950, GREEN_800).convert("RGBA")
    d = ImageDraw.Draw(img)
    mark = Image.open("public/apps/binary-meadow-mark-light.png").convert("RGBA")
    mark.thumbnail((150, 150))
    img.paste(mark, (90, 80), mark)
    d.text((90, 250), "Binary Meadow", font=font(BOLD, 96), fill=(255, 255, 255))
    d.text((94, 366), "Thoughtful software, grown with care.",
           font=font(REG, 40), fill=GREEN_300)
    d.text((94, 500), "Jannah Builder   \u00b7   OPDSy   \u00b7   GridWatch",
           font=font(BOLD, 32), fill=CREAM)
    d.rectangle([0, 0, W, 10], fill=(45, 122, 95))
    img.convert("RGB").save("public/og/binary-meadow.png", quality=92)
    print("home OG")


def make_app(slug, name, tagline, icon_path, platform_label):
    img = Image.new("RGBA", (W, H), CREAM + (255,))
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, 18, H], fill=(45, 122, 95))
    icon = Image.open(icon_path).convert("RGBA")
    icon.thumbnail((300, 300))
    icon = rounded(icon, 56)
    img.paste(icon, (96, (H - icon.size[1]) // 2), icon)
    tx = 96 + icon.size[0] + 70
    d.text((tx, 150), name, font=font(BOLD, 84), fill=GREEN_950)
    lines = wrap(d, tagline, font(REG, 38), W - tx - 90)
    y = 270
    for ln in lines:
        d.text((tx, y), ln, font=font(REG, 38), fill=(56, 70, 63))
        y += 52
    pill = platform_label.upper()
    pf = font(BOLD, 26)
    pw = d.textlength(pill, font=pf)
    d.rounded_rectangle([tx, y + 20, tx + pw + 56, y + 78], radius=29,
                        fill=(224, 239, 232))
    d.text((tx + 28, y + 35), pill, font=pf, fill=(31, 92, 70))
    mark = Image.open("public/apps/binary-meadow-mark.png").convert("RGBA")
    mark.thumbnail((70, 70))
    img.paste(mark, (W - 190, H - 100), mark)
    d.text((W - 110, H - 84), "Binary", font=font(BOLD, 22), fill=GREEN_800)
    d.text((W - 110, H - 58), "Meadow", font=font(BOLD, 22), fill=GREEN_800)
    img.convert("RGB").save(f"public/og/{slug}.png", quality=92)
    print(f"{slug} OG")


def make_app_feature(slug, feature_path):
    """Use the app's feature graphic directly as the OG image (fitted to 1200x630)."""
    src = Image.open(feature_path).convert("RGB")
    bg = src.getpixel((0, 0))
    canvas = Image.new("RGB", (W, H), bg)
    sw, sh = src.size
    scale = min(W / sw, H / sh)
    fitted = src.resize((round(sw * scale), round(sh * scale)), Image.LANCZOS)
    canvas.paste(fitted, ((W - fitted.size[0]) // 2, (H - fitted.size[1]) // 2))
    canvas.save(f"public/og/{slug}.png", quality=92)
    print(f"{slug} OG (feature)")


make_home()
make_app_feature("jannah-builder", "public/apps/jannah-builder-feature.png")
make_app_feature("opdsy", "public/apps/opdsy-feature.png")
make_app_feature("spinely", "public/apps/spinely-feature.png")
make_app_feature("task-monster", "public/apps/task-monster-feature.jpg")
make_app("gridwatch", "GridWatch", "See every AI-assisted session.",
         "public/apps/gridwatch.png", "macOS & Windows")
