import Link from 'next/link';
import Image from 'next/image';
import { company } from '@/lib/site';
import { apps } from '@/data/apps';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="contact">
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <div className={styles.brand}>
              <Image
                src="/apps/binary-meadow-mark-light.png"
                alt=""
                width={40}
                height={40}
                className={styles.mark}
              />
              <span className={styles.brandName}>{company.name}</span>
            </div>
            <p className={styles.brandBlurb}>{company.description}</p>
            <a className={styles.email} href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </div>

          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>Apps</h3>
            <ul>
              {apps.map((app) => (
                <li key={app.slug}>
                  <Link href={`/apps/${app.slug}/`}>{app.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>Company</h3>
            <ul>
              <li>
                <Link href="/#about">About</Link>
              </li>
              <li>
                <Link href="/articles/">Articles</Link>
              </li>
              <li>
                <Link href="/privacy/">Privacy</Link>
              </li>
              <li>
                <Link href="/terms/">Terms</Link>
              </li>
              <li>
                <a href={`mailto:${company.email}`}>Contact</a>
              </li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>More</h3>
            <ul>
              <li>
                <a
                  href={company.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter / X ↗
                </a>
              </li>
              <li>
                <a href={company.founderUrl} target="_blank" rel="noopener noreferrer">
                  faesel.com ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/faesel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.legal}>
          <div className={styles.registration}>
            <p>
              <strong>{company.name}</strong> — {company.jurisdiction}.
            </p>
            <p>
              Company No. {company.companyNumber} · Registered office:{' '}
              {company.registeredOffice}
            </p>
          </div>
          <div className={styles.copyright}>
            <p>
              © {year} {company.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
