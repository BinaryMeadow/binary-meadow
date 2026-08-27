import { company } from './site';
import type { App, Screenshot } from '@/data/apps';

/**
 * Renders a JSON-LD <script> tag. Safe for static export — the data is
 * serialised at build time.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    legalName: company.name,
    url: company.url,
    logo: `${company.url}/apps/binary-meadow-mark.png`,
    email: company.email,
    description: company.description,
    sameAs: [company.twitterUrl, 'https://github.com/faesel'],
    foundingLocation: company.registeredOffice,
    founder: {
      '@type': 'Person',
      name: company.founderName,
      url: company.founderUrl,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB',
    },
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.name,
    url: company.url,
    publisher: {
      '@type': 'Organization',
      name: company.name,
    },
  };
}

const OS_MAP: Record<string, string> = {
  android: 'Android',
  ios: 'iOS',
  macos: 'macOS',
  windows: 'Windows',
};

/**
 * Picks the six screenshots published as structured data: any marked
 * `featured` first, then the gallery order to make up the difference.
 * Search engines get the most representative screens without forcing the
 * on-page gallery to be reordered around them.
 */
function schemaScreenshots(screenshots: Screenshot[]) {
  const featured = screenshots.filter((s) => s.featured);
  const rest = screenshots.filter((s) => !s.featured);
  return [...featured, ...rest].slice(0, 6);
}

export function softwareApplicationSchema(app: App) {
  const isMobile = app.platforms.some((p) => p === 'android' || p === 'ios');
  const playListing = app.downloads.find((d) =>
    d.href.includes('play.google.com'),
  );
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    alternateName: app.tagline,
    description: app.summary,
    url: `${company.url}/apps/${app.slug}/`,
    image: `${company.url}${app.icon}`,
    // Omitted entirely rather than emitted empty for an app with no captures yet.
    ...(app.screenshots.length > 0
      ? {
          screenshot: schemaScreenshots(app.screenshots).map(
            (s) => `${company.url}${s.src.split('?')[0]}`,
          ),
        }
      : {}),    applicationCategory: isMobile ? 'MobileApplication' : 'DesktopApplication',
    applicationSubCategory: app.category,
    operatingSystem: app.platforms.map((p) => OS_MAP[p]).join(', '),
    featureList: app.features.map((f) => f.title),
    ...(playListing ? { downloadUrl: playListing.href } : {}),
    ...(app.repository ? { codeRepository: app.repository } : {}),
    ...(app.pricing
      ? app.pricing.free
        ? {
            isAccessibleForFree: true,
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'GBP',
              ...(playListing
                ? {
                    availability: 'https://schema.org/InStock',
                    url: playListing.href,
                  }
                : {}),
            },
          }
        : {
            // Paid app: the store listing is the single source of truth for
            // price and currency, so no price is asserted here.
            isAccessibleForFree: false,
            ...(playListing
              ? {
                  offers: {
                    '@type': 'Offer',
                    availability: 'https://schema.org/InStock',
                    url: playListing.href,
                  },
                }
              : {}),
          }
      : {
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'GBP',
          },
        }),
    publisher: {
      '@type': 'Organization',
      name: company.name,
      url: company.url,
    },
    author: {
      '@type': 'Organization',
      name: company.name,
      url: company.url,
    },
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Lists the studio's apps on the home page so search engines see the catalogue. */
export function appsItemListSchema(list: App[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Apps by ${company.name}`,
    itemListElement: list.map((app, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: app.name,
      url: `${company.url}/apps/${app.slug}/`,
    })),
  };
}
