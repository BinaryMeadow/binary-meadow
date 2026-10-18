import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { company } from '@/lib/site';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f5c46',
};

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} — ${company.tagline}`,
    template: `%s · ${company.shortName}`,
  },
  description: company.description,
  applicationName: company.shortName,
  authors: [{ name: company.founderName, url: company.founderUrl }],
  creator: company.founderName,
  publisher: company.name,
  alternates: {
    canonical: '/',
  },
  keywords: [
    'Binary Meadow',
    'Jannah Builder',
    'OPDSy',
    'GridWatch',
    'Android apps',
    'desktop apps',
    'indie software studio',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    title: `${company.name} — ${company.tagline}`,
    description: company.description,
    siteName: company.name,
    url: company.url,
    images: [
      {
        url: '/og/binary-meadow.png',
        width: 1200,
        height: 630,
        alt: `${company.name} — ${company.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: company.twitter,
    creator: company.twitter,
    title: `${company.name} — ${company.tagline}`,
    description: company.description,
    images: ['/og/binary-meadow.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/apps/binary-meadow-mark.png',
    apple: '/apple-icon.png',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body>
        <a href="#main" className="visually-hidden">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "de9fc1ea7b0441658e1fef3bdf41bfcd"}'
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
