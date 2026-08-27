# Binary Meadow — Website

The official marketing site for **Binary Meadow Ltd**, a UK-registered independent
software studio. It showcases the studio's apps and provides download links and
company information.

Built with **Next.js (App Router)** and exported as a fully **static** site — no
server runtime required.

## Apps showcased

| App | Platform | Repository |
| --- | --- | --- |
| **Jannah Builder** | Android (mobile) | https://github.com/faesel/jannah-builder |
| **OPDSy** | Android (mobile) | https://github.com/faesel/opdsy |
| **GridWatch** | macOS & Windows (desktop) | https://github.com/faesel/gridwatch |

## Tech stack

- **Next.js 14** (App Router) with `output: 'export'` for static hosting
- **React 18** + **TypeScript** (strict)
- **CSS Modules** + a small set of global CSS variables for the design system
- No client-side data fetching — all content lives in `src/data/apps.ts`

## Design

The look and feel is derived directly from the Binary Meadow logo: **bold,
simplistic and minimalistic**, with a forest/teal green palette on near-white
backgrounds and generous whitespace. Tokens are defined in
`src/app/globals.css`.

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout (Header, Footer, metadata)
│   ├── page.tsx              # Home (hero, apps grid, about, contact)
│   ├── apps/[slug]/page.tsx  # Per-app detail pages (statically generated)
│   ├── privacy/              # Privacy policy (placeholder)
│   ├── terms/                # Terms of use (placeholder)
│   ├── not-found.tsx         # 404 page
│   └── globals.css           # Design tokens + base styles
├── components/               # Header, Footer, AppCard, PlatformBadge, …
├── data/apps.ts              # Single source of truth for app metadata
└── lib/site.ts               # Company details & navigation
public/
├── logo/                     # Full logo
├── apps/                     # App icons + logo mark
└── screenshots/<app>/         # Per-app product screenshots, numbered in display order
```

## Development
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
```

Serve the build locally:

```bash
npx serve out
```

### QR codes

Each app with a Google Play listing has a "Scan to install" QR code, shown in
the download CTA on desktop only (`public/qr/<slug>.svg`). The codes are
generated from the Play URLs in `src/data/apps.ts`, so they cannot drift from
the links on the page. Regenerate them after changing a store URL:

```bash
python3 -m venv /tmp/qrvenv
/tmp/qrvenv/bin/pip install segno
/tmp/qrvenv/bin/python scripts/generate-qr.py
```

### App page content blocks

Optional fields on each app in `src/data/apps.ts` drive extra sections:

| Field | Renders |
| --- | --- |
| `pricing` | A pricing-model badge in the hero (e.g. "One-time purchase · No ads · No subscription") and the expanded wording in the download CTA. Deliberately states the *model*, never a price, so it needs no upkeep across currencies — and `free` drives the structured-data offer. |
| `comparison` | The "vs the alternatives" feature table, plus a sourcing note. |
| `faqs` | The FAQ accordion, also emitted as `FAQPage` structured data. |

## SEO

The site follows current SEO best practices:

- Per-page **title**, **description** and **canonical** URLs.
- **Open Graph** + **Twitter Card** tags with 1200×630 share images
  (`public/og/`, regenerated via `python3 scripts/generate-og.py`).
- **JSON-LD** structured data — `Organization`, `WebSite` and an `ItemList` of
  the apps on the home page; `SoftwareApplication` (with `offers`,
  `isAccessibleForFree`, `featureList` and screenshots), `BreadcrumbList` and
  `FAQPage` on each app page.
- Auto-generated **`sitemap.xml`**, **`robots.txt`** and **web manifest**
  (`src/app/sitemap.ts`, `robots.ts`, `manifest.ts`).
- `metadataBase` and all absolute URLs derive from `siteConfig.url`
  (`src/lib/site.ts`), so changing the domain updates everything.

## Deployment & CI

Hosted on **GitHub Pages** with a custom domain (`public/CNAME` →
`www.binarymeadow.com`), deployed automatically by GitHub Actions.

- **`.github/workflows/deploy.yml`** — on push to `main`, type-checks, builds the
  static export and publishes it to GitHub Pages (official `deploy-pages`
  action; no separate branch needed).
- **`.github/workflows/ci.yml`** — on pull requests and non-`main` branches,
  runs the type check and a full build to validate changes before merge.

After the first push, enable Pages with **Settings → Pages → Source: GitHub
Actions** (the deploy workflow does this automatically via
`configure-pages`).

## Things to update before going live

- **Company details** in `src/lib/site.ts` — replace the placeholder company
  number, registered office, and contact email with the official record.
- **Store links** in `src/data/apps.ts` — keep the Google Play and release URLs
  in step with the published store listings.
- **Legal pages** — `privacy` and `terms` are templates and should be reviewed
  by a qualified adviser.
- **DNS** — point `www.binarymeadow.com` at GitHub Pages (CNAME to
  `faesel.github.io`).

## Security note

This is a **static export**, so the runtime Next.js advisories reported by
`npm audit` (image optimiser, middleware, RSC-over-HTTP) do not apply — there is
no Next.js server in production. Next is pinned to the latest 14.2.x patch.

---

A Binary Meadow Ltd project · Built by [Faesel Saeed](https://www.faesel.com)
