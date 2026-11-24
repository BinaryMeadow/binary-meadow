import type { Platform } from '@/data/apps';
import styles from './PlatformBadge.module.css';

export type PlatformGroup = 'Mobile' | 'Desktop' | 'Server';

const META: Record<Platform, { label: string; group: PlatformGroup }> = {
  android: { label: 'Android', group: 'Mobile' },
  ios: { label: 'iOS', group: 'Mobile' },
  macos: { label: 'macOS', group: 'Desktop' },
  windows: { label: 'Windows', group: 'Desktop' },
  docker: { label: 'Docker', group: 'Server' },
};

export function platformGroup(platforms: Platform[]): PlatformGroup {
  return META[platforms[0]].group;
}

export default function PlatformBadge({ platform }: { platform: Platform }) {
  const meta = META[platform];
  return (
    <span className={styles.badge} data-platform={platform}>
      {meta.label}
    </span>
  );
}
