#!/usr/bin/env python3
"""Generate brand-coloured QR code SVGs for each app's store listings.

Google Play codes are written to `<slug>.svg` and App Store codes to
`<slug>-ios.svg`. The store URLs are read straight out of `src/data/apps.ts`, so the codes
can never drift from the links rendered on the site.

Requires `segno` (pure Python, no runtime dependency for the site itself):

    python3 -m venv /tmp/qrvenv
    /tmp/qrvenv/bin/pip install segno
    /tmp/qrvenv/bin/python scripts/generate-qr.py
"""
import pathlib
import re
import sys

try:
    import segno
except ImportError:  # pragma: no cover
    sys.exit("segno is required: pip install segno")

ROOT = pathlib.Path(__file__).resolve().parent.parent
APPS_TS = ROOT / "src" / "data" / "apps.ts"
OUT_DIR = ROOT / "public" / "qr"

DARK = "#0c241c"  # --green-950

SLUG_RE = re.compile(r"^\s*slug: '([a-z0-9-]+)',", re.M)
STORES = {
    "": re.compile(r"href: '(https://play\.google\.com/[^']+)'"),
    "-ios": re.compile(r"href: '(https://apps\.apple\.com/[^']+)'"),
}


def store_links(source: str) -> dict[str, str]:
    """Map each output file stem to a store URL, for every app that has one."""
    slugs = [(m.start(), m.group(1)) for m in SLUG_RE.finditer(source)]
    links: dict[str, str] = {}
    for i, (pos, slug) in enumerate(slugs):
        end = slugs[i + 1][0] if i + 1 < len(slugs) else len(source)
        for suffix, pattern in STORES.items():
            match = pattern.search(source, pos, end)
            if match:
                links[f"{slug}{suffix}"] = match.group(1)
    return links


def main() -> None:
    source = APPS_TS.read_text(encoding="utf-8")
    links = store_links(source)
    if not links:
        sys.exit("No store links found in src/data/apps.ts")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for stem, url in sorted(links.items()):
        # Level Q keeps the symbol small enough to stay crisp at ~140px while
        # tolerating partial obstruction; level H produced denser codes that
        # some scanners struggled with.
        qr = segno.make(url, error="q")
        path = OUT_DIR / f"{stem}.svg"
        qr.save(
            path,
            kind="svg",
            scale=10,
            border=2,
            dark=DARK,
            light=None,
            svgclass=None,
            lineclass=None,
            omitsize=True,
            xmldecl=False,
        )
        print(f"{path.relative_to(ROOT)}  ->  {url}")


if __name__ == "__main__":
    main()
