'use client';

import { useEffect } from 'react';
import styles from './ServerStructures.module.css';

/**
 * Permalink for a single server accordion.
 *
 * The link sits inside a `<summary>`, where a plain fragment link is unreliable:
 * whether the browser toggles the accordion as well as following the link
 * depends on how it resolves the activation target. The click is handled
 * explicitly instead, so activating the permalink always opens the panel rather
 * than collapsing the one the visitor is reading.
 *
 * Arriving from outside is handled too — a fragment pointing at a collapsed
 * `<details>` only scrolls to it, leaving the content the link promised hidden.
 */
export default function ServerAnchor({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  useEffect(() => {
    const openIfTargeted = () => {
      if (window.location.hash !== `#${id}`) return;
      reveal(id);
    };

    openIfTargeted();
    window.addEventListener('hashchange', openIfTargeted);
    return () => window.removeEventListener('hashchange', openIfTargeted);
  }, [id]);

  return (
    <a
      href={`#${id}`}
      className={styles.anchor}
      aria-label={`Link to ${name}`}
      onClick={(event) => {
        // Suppresses both the link navigation and any toggle the surrounding
        // summary would otherwise perform, so the two cannot fight each other.
        event.preventDefault();
        window.history.pushState(null, '', `#${id}`);
        reveal(id);
      }}
    >
      #
    </a>
  );
}

function reveal(id: string) {
  const details = document.getElementById(id);
  if (!(details instanceof HTMLDetailsElement)) return;
  details.open = true;
  details.scrollIntoView({ block: 'start' });
}
