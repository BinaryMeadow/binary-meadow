#!/usr/bin/env python3
"""Generate the StoryRunner app icon (1024x1024) in the Binary Meadow house style.

A winding amber route across a dark "night run" ground: a teal start pip, the
leg already run in amber, the leg still ahead dimmed, and a diamond waypoint at
the destination. The unfinished leg is the whole idea of the app — a route with
a story still ahead of you — so it is deliberately legible, not decorative.

Colours are lifted from the app's own theme (`src/theme/palette.ts`) rather
than eyeballed, so the icon cannot drift from the product.

Two notes on technique, both learned the hard way:

- The stroke is stamped as a round brush along the path, *not* drawn with
  `ImageDraw.line(joint="curve")`. At this width that method leaves visible
  seams where consecutive segment polygons overlap, which downscaling turns
  into a hatched texture rather than a solid road.
- Everything is rendered at 4x and downscaled with Lanczos, so the curve and
  the round caps stay smooth.
"""
from PIL import Image, ImageDraw

SS = 4  # supersampling factor
SIZE = 1024
W = H = SIZE * SS

OUT = "/Users/Faesel.Saeed/Code/faesel/binary-meadow/public/apps/storyrunner.png"

# StoryRunner palette — see storyrunner/src/theme/palette.ts.
INK_900 = (0x0B, 0x0E, 0x12)
INK_700 = (0x1E, 0x25, 0x2F)
AMBER_500 = (0xE8, 0xA3, 0x3D)
AMBER_300 = (0xF5, 0xC9, 0x78)
TEAL_400 = (0x4F, 0xB3, 0xA8)
PARCHMENT_DIM = (0xA7, 0x9F, 0x91)


def lerp(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def bezier(points, steps=400):
    """Evaluate a chain of cubic Beziers sharing endpoints."""
    out = []
    for i in range(0, len(points) - 3, 3):
        p0, p1, p2, p3 = points[i : i + 4]
        for s in range(steps + 1):
            t = s / steps
            u = 1 - t
            out.append(
                (
                    u * u * u * p0[0]
                    + 3 * u * u * t * p1[0]
                    + 3 * u * t * t * p2[0]
                    + t * t * t * p3[0],
                    u * u * u * p0[1]
                    + 3 * u * u * t * p1[1]
                    + 3 * u * t * t * p2[1]
                    + t * t * t * p3[1],
                )
            )
    return out


def stroke_path(draw, pts, radius, fill):
    """Stamp a round brush along `pts`, giving seam-free caps and joins."""
    for x, y in pts:
        draw.ellipse([x - radius, y - radius, x + radius, y + radius], fill=fill)


def main():
    img = Image.new("RGB", (W, H), INK_900)
    draw = ImageDraw.Draw(img)

    # Vertical ink gradient, lightest at the top like a horizon.
    for y in range(H):
        draw.line([(0, y), (W, y)], fill=lerp(INK_700, INK_900, y / (H - 1)))

    def p(x, y):
        return (x * SS, y * SS)

    # A route climbing bottom-left to top-right with one switchback, sized to
    # sit on the diagonal so the square reads as balanced.
    curve = bezier(
        [
            p(210, 845),
            p(210, 640),
            p(455, 690),
            p(485, 520),
            p(515, 355),
            p(650, 335),
            p(800, 220),
        ]
    )

    r = 31 * SS  # half the stroke width
    cut = int(len(curve) * 0.60)  # where "now" sits on the route

    stroke_path(draw, curve[cut:], r, PARCHMENT_DIM)  # still to come
    stroke_path(draw, curve[: cut + 1], r, AMBER_500)  # already run

    def dot(centre, rad, fill):
        x, y = centre
        draw.ellipse([x - rad, y - rad, x + rad, y + rad], fill=fill)

    # Destination waypoint, drawn before the runner so the runner always wins.
    ex, ey = curve[-1]
    d = 60 * SS
    draw.polygon(
        [(ex, ey - d), (ex + d, ey), (ex, ey + d), (ex - d, ey)],
        fill=AMBER_500,
        outline=INK_900,
        width=9 * SS,
    )

    # Start: a teal pip, the one cool note in the palette.
    dot(curve[0], 42 * SS, INK_900)
    dot(curve[0], 28 * SS, TEAL_400)

    # Where the runner is now — bright amber with an ink collar so it reads
    # against the road it sits on.
    dot(curve[cut], 72 * SS, INK_900)
    dot(curve[cut], 54 * SS, AMBER_300)

    img.resize((SIZE, SIZE), Image.LANCZOS).save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} ({SIZE}x{SIZE})")


if __name__ == "__main__":
    main()
