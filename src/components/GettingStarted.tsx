import type { GettingStarted as GettingStartedData } from '@/data/apps';
import styles from './GettingStarted.module.css';

export default function GettingStarted({ data }: { data: GettingStartedData }) {
  return (
    <>
      <p className={styles.lead}>{data.lead}</p>
      <ol className={styles.steps}>
        {data.steps.map((step, i) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.number} aria-hidden="true">
              {i + 1}
            </span>
            <div className={styles.body}>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
              {step.code && (
                <figure className={styles.codeBlock}>
                  {step.codeLabel && (
                    <figcaption className={styles.codeLabel}>{step.codeLabel}</figcaption>
                  )}
                  <pre className={styles.pre} tabIndex={0}>
                    <code>{step.code}</code>
                  </pre>
                </figure>
              )}
              {step.after && <p className={styles.text}>{step.after}</p>}
              {step.note && (
                <p className={styles.note}>
                  <strong>Note:</strong> {step.note}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
