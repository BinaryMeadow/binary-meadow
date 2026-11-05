import Image from 'next/image';
import type { DownloadLink } from '@/data/apps';
import styles from './DownloadButtons.module.css';

/** Official "Get it on Google Play" badge aspect ratio (646 x 250). */
const PLAY_BADGE_RATIO = 646 / 250;

/** Official "Download on the App Store" badge aspect ratio (119.66 x 40). */
const APP_STORE_BADGE_RATIO = 119.66 / 40;

/**
 * Apple's badge has no padding around it, but the Play badge PNG does: its
 * visible artwork is about two thirds of the image height. 40px, Apple's
 * minimum on-screen height, lines the two up at the default size.
 */
const APP_STORE_BADGE_HEIGHT = 40;

function isAppStore(dl: DownloadLink): boolean {
  return dl.platform === 'ios' && dl.href.includes('apps.apple.com');
}

function isGooglePlay(dl: DownloadLink): boolean {
  return (
    dl.platform === 'android' &&
    (dl.label.toLowerCase().includes('google play') ||
      dl.href.includes('play.google.com'))
  );
}

export default function DownloadButtons({
  downloads,
  size = 'md',
}: {
  downloads: DownloadLink[];
  size?: 'sm' | 'md';
}) {
  const badgeHeight = size === 'sm' ? 50 : 60;
  const badgeWidth = Math.round(badgeHeight * PLAY_BADGE_RATIO);
  const appStoreWidth = Math.round(APP_STORE_BADGE_HEIGHT * APP_STORE_BADGE_RATIO);

  // An app with no links yet is unreleased, not broken. Say so, rather than
  // rendering an empty row beneath a heading that promises a download.
  //
  // Deliberately *not* a greyed-out Play badge: Google's brand guidelines
  // forbid altering the badge artwork, and showing the real one for an app you
  // cannot install is a broken promise either way.
  if (downloads.length === 0) {
    return (
      <div className={`${styles.group} ${size === 'sm' ? styles.sm : ''}`}>
        <span className={styles.comingSoon} aria-disabled="true">
          Coming soon to Google Play
        </span>
      </div>
    );
  }

  return (
    <div className={`${styles.group} ${size === 'sm' ? styles.sm : ''}`}>
      {downloads.map((dl) => {
        if (isGooglePlay(dl)) {
          return (
            <a
              key={dl.label}
              href={dl.href}
              className={styles.playBadgeLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get it on Google Play"
            >
              <Image
                src="/badges/google-play-badge.png"
                alt="Get it on Google Play"
                width={badgeWidth}
                height={badgeHeight}
                className={styles.playBadge}
                unoptimized
              />
            </a>
          );
        }

        if (isAppStore(dl)) {
          return (
            <a
              key={dl.label}
              href={dl.href}
              className={styles.appStoreBadgeLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download on the App Store"
            >
              <Image
                src="/badges/app-store-badge.svg"
                alt="Download on the App Store"
                width={appStoreWidth}
                height={APP_STORE_BADGE_HEIGHT}
                className={styles.appStoreBadge}
                unoptimized
              />
            </a>
          );
        }

        return (
          <a
            key={dl.label}
            href={dl.href}
            className={`btn btn-primary ${styles.btn}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dl.label}
          </a>
        );
      })}
    </div>
  );
}
