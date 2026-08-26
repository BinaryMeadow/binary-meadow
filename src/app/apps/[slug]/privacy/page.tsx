import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { apps, getApp } from '@/data/apps';
import { company } from '@/lib/site';
import styles from '../../../legal.module.css';

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};
  const url = `/apps/${app.slug}/privacy/`;
  return {
    title: `${app.name} Privacy Policy`,
    description: `How ${app.name} by ${company.name} handles your data.`,
    alternates: { canonical: url },
  };
}

export default async function AppPrivacyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.wrap}>
        <Link href={`/apps/${app.slug}/`} className={styles.back}>
          ← {app.name}
        </Link>
        <h1 className={styles.title}>{app.name} Privacy Policy</h1>
        <p className={styles.updated}>Last updated: {app.privacy.updated}</p>

        <div className={styles.content}>
          <p className={styles.notice}>
            This privacy policy applies specifically to the {app.name} app by{' '}
            {company.name}. For our general policy across all products, see our{' '}
            <Link href="/privacy/">website privacy policy</Link>.
          </p>

          <p>{app.privacy.summary}</p>

          <h2>Data we collect</h2>
          <p>
            {app.privacy.collectsPersonalData
              ? `${app.name} collects the data described below.`
              : `${app.name} does not collect personal data on our servers. It handles the following data, which stays under your control:`}
          </p>
          {app.privacy.dataHandling.map((point) => (
            <div key={point.title}>
              <h2>{point.title}</h2>
              <p>{point.description}</p>
            </div>
          ))}

          <h2>Third-party services</h2>
          <ul>
            {app.privacy.thirdParties.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>

          <h2>Data sharing &amp; selling</h2>
          <p>
            We do not sell your personal data, and we do not share it with third
            parties for advertising. {app.name} contains no advertising and no
            third-party usage analytics.
          </p>

          <h2>Children’s privacy</h2>
          <p>{app.privacy.childrenNote}</p>

          <h2>Your rights</h2>
          <p>
            Because {app.name} does not collect or hold your personal data,
            there is no personal information for us to access, correct, or
            delete on your behalf. If you would like to understand more about
            your rights under UK GDPR, or have any question about this policy,
            contact us at{' '}
            <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as {app.name} evolves. Material changes
            will be reflected on this page with a revised “last updated” date.
          </p>
        </div>
      </div>
    </div>
  );
}
