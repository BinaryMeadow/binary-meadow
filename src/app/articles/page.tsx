import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/articles';
import { company } from '@/lib/site';
import { JsonLd, breadcrumbSchema } from '@/lib/jsonld';
import styles from './articles.module.css';

const title = 'Articles';
const description =
  'Practical guides and honest comparisons from building the apps at Binary Meadow. Start with choosing an OPDS server for your reading library.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/articles/' },
  openGraph: {
    title,
    description,
    type: 'website',
    url: '/articles/',
    images: ['/og/binary-meadow.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og/binary-meadow.png'],
  },
};

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(iso));

export default function ArticlesPage() {
  return (
    <div className={`container ${styles.index}`}>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: `${company.url}/` },
          { name: title, url: `${company.url}/articles/` },
        ])}
      />
      <header className={styles.heading}>
        <span className="eyebrow">From the workshop</span>
        <h1 className="section-title">Articles</h1>
      </header>
      <div className={styles.cards}>
        {articles.map((article) => (
          <article key={article.slug} className={styles.card}>
            <time dateTime={article.published} className={styles.date}>
              {formatDate(article.published)}
            </time>
            <h2>
              <Link href={`/articles/${article.slug}/`}>{article.title}</Link>
            </h2>
            <p>{article.description}</p>
            <Link href={`/articles/${article.slug}/`} className={styles.readLink}>
              Read the comparison
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
