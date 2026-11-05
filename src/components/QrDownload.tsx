import Image from 'next/image';
import styles from './QrDownload.module.css';

const STORES = {
  android: { file: '', listing: 'Google Play', caption: 'Android' },
  ios: { file: '-ios', listing: 'the App Store', caption: 'iPhone' },
} as const;

/**
 * A small "scan to install" QR code for an app's store listing.
 * Hidden on small screens, where a QR code pointing at the device you are
 * already holding is of no use.
 */
export default function QrDownload({
  slug,
  name,
  href,
  store = 'android',
  variant = 'default',
}: {
  slug: string;
  name: string;
  href: string;
  store?: keyof typeof STORES;
  variant?: 'default' | 'cta';
}) {
  const meta = STORES[store];
  return (
    <a
      className={`${styles.qr} ${variant === 'cta' ? styles.cta : ''}`.trim()}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={`/qr/${slug}${meta.file}.svg`}
        alt={`QR code linking to the ${name} listing on ${meta.listing}`}
        width={132}
        height={132}
        className={styles.image}
        unoptimized
      />
      <span className={styles.caption}>{meta.caption}</span>
    </a>
  );
}
