import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DownloadButtons from '@/components/DownloadButtons';
import { getApp } from '@/data/apps';
import { opdsServersArticle as article } from '@/data/articles';
import { company } from '@/lib/site';
import { JsonLd, articleSchema, breadcrumbSchema } from '@/lib/jsonld';
import { sources, type SourceId } from './sources';
import styles from '../articles.module.css';

const url = `/articles/${article.slug}/`;
const opdsy = getApp('opdsy')!;

export const metadata: Metadata = {
  title: article.title,
  description: article.description,
  alternates: { canonical: url },
  openGraph: {
    type: 'article',
    title: article.title,
    description: article.description,
    url,
    publishedTime: article.published,
    authors: [company.founderName],
    images: ['/og/opdsy.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: article.title,
    description: article.description,
    images: ['/og/opdsy.png'],
  },
};

function O() {
  return <Link href="/apps/opdsy/">OPDSy</Link>;
}

function S({ id, children }: { id: SourceId; children: React.ReactNode }) {
  return <a href={sources[id].href}>{children}</a>;
}

function Table({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <div
      className={styles.tableRegion}
      role="region"
      aria-label={caption}
      tabIndex={0}
    >
      <table className={styles.table}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) =>
                j === 0 ? (
                  <th key={j} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={j}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const contents = [
  ['short-answer', 'The short answer'],
  ['at-a-glance', 'The seven servers at a glance'],
  ['media', 'Books, comics and audiobooks'],
  ['look-and-feel', 'Look and feel: which one is modern?'],
  ['opds-pse', 'OPDS-PSE: what it is and why it matters'],
  ['opds-versions', 'OPDS 2.0 versus OPDS 1.x'],
  ['reading-sync', 'Reading progress and sync'],
  ['file-structure', 'Folders or metadata: how each server organises your library'],
  ['getting-started', 'Ease of use and entry points'],
  ['before-you-choose', 'Five things worth checking before you commit'],
  ['opdsy', 'Where OPDSy fits'],
  ['verdict', 'So, which is the best?'],
  ['sources', 'Sources'],
] as const;

export default function BestOpdsServersPage() {
  return (
    <article className={styles.article}>
      <JsonLd data={articleSchema(article)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: `${company.url}/` },
          { name: 'Articles', url: `${company.url}/articles/` },
          { name: article.title, url: `${company.url}${url}` },
        ])}
      />
      <Link href="/articles/" className={styles.back}>
        All articles
      </Link>

      <header className={styles.hero}>
        <h1>{article.title}</h1>
        <p className={styles.lead}>
          Whilst integrating OPDS servers into{' '}
          <Link href="/apps/opdsy/">OPDSy</Link>, I got to know the servers
          intimately, quirks and all. <O /> now supports seven of them, and
          each takes a noticeably different view of how a library should be
          organised. Here is my OPDS server comparison.
        </p>
        <p className={styles.byline}>
          By <a href={company.founderUrl}>{company.founderName}</a>
          {' · '}
          <time dateTime={article.published}>17 October 2026</time>
        </p>
      </header>

      <div className={styles.body}>
        <nav className={styles.contents} aria-label="Article contents">
          <strong>In this article</strong>
          <ol>
            {contents.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="short-answer">
          <h2>The short answer</h2>
          <p>
            There is no single best OPDS server, and I would be suspicious of
            anyone who tells you otherwise. Each of these projects is built by
            people who clearly care, and each makes a different trade-off. The
            right one depends far more on what is in your library, and how it
            is already organised, than on any feature checklist.
          </p>
          <p>
            If you want a starting point, this is where I would look first:
          </p>
          <div className={styles.withAside}>
            <Table
              caption="Where I would start, by type of reader"
              head={['If you…', 'Start with', 'Why']}
              rows={[
                [
                  'Mostly read comics or manga',
                  'Komga or Kavita',
                  <>
                    Both organise libraries around series and both support{' '}
                    <a href="#opds-pse">OPDS-PSE page streaming</a> (
                    <S id="komgaOpds">Komga</S>,{' '}
                    <S id="kavitaOpds">Kavita</S>).
                  </>,
                ],
                [
                  'Already curate your books in Calibre',
                  'Calibre-Web',
                  <>
                    It runs on top of your existing Calibre database rather than
                    asking you to migrate (
                    <S id="calibreWebReadme">Calibre-Web README</S>).
                  </>,
                ],
                [
                  'Want your own folder tree to be the way you browse',
                  'Ubooquity',
                  <>
                    It shares the directories you choose, and in my integration
                    work its catalogue mirrors those folders (
                    <S id="ubooquityInstall">installation guide</S>,{' '}
                    <S id="opdsyServers">server-by-server guide</S>).
                  </>,
                ],
                [
                  'Have ebooks, comics and audiobooks together',
                  'BookOrbit, Grimmory or LazyLibrarian',
                  <>
                    All three put audiobooks and comics in their OPDS feeds (
                    <S id="bookOrbitAbout">BookOrbit</S>,{' '}
                    <S id="grimmoryFeed">Grimmory source</S>,{' '}
                    <S id="lazyComics">LazyLibrarian source</S>).
                    LazyLibrarian also handles magazines, and suits you best if
                    you want it to manage your collection too (
                    <S id="lazyIntro">LazyLibrarian</S>).
                  </>,
                ],
              ]}
            />
            <aside className={styles.gutterPanel} aria-label="OPDSy server support">
              <Image
                src={opdsy.icon}
                alt=""
                width={48}
                height={48}
                className={styles.gutterIcon}
              />
              <p>
                <strong>OPDSy supports all seven of these servers.</strong>
              </p>
              <Link href="/apps/opdsy/">Find out more about OPDSy</Link>
            </aside>
          </div>
          <p>
            The rest of this article explains the reasoning, one topic at a
            time, so you can weigh up the parts that matter to you.
          </p>
        </section>

        <section id="at-a-glance">
          <h2>The seven servers at a glance</h2>
          <p>
            A quick introduction before we get into detail. These are the
            servers <O /> integrates with, not every OPDS server in existence.
            If yours is not here, the general principles below still apply.
          </p>
          <ul>
            <li>
              <strong>
                <S id="komgaIntro">Komga</S>
              </strong>{' '}
              is a media server for comics, manga, ebooks and PDFs, built
              around series. It is one of the few servers that publishes both
              an OPDS 1.x and an OPDS 2.0 feed (
              <S id="komgaOpds">Komga OPDS guide</S>).
            </li>
            <li>
              <strong>
                <S id="kavitaReadme">Kavita</S>
              </strong>{' '}
              reads comics, manga, ebooks and PDFs, and adds collections and
              reading lists on top (<S id="kavitaReadme">Kavita README</S>).
              OPDS is switched on by default (
              <S id="kavitaOpds">Kavita OPDS guide</S>).
            </li>
            <li>
              <strong>
                <S id="ubooquitySite">Ubooquity</S>
              </strong>{' '}
              is a lightweight Java server that shares the folders you point
              it at, with a preference for EPUB, CBZ, CBR and PDF. It is free
              for non-commercial use but is not open source (
              <S id="ubooquityDownload">download page</S>,{' '}
              <S id="ubooquityFaq">FAQ</S>).
            </li>
            <li>
              <strong>
                <S id="calibreWebReadme">Calibre-Web</S>
              </strong>{' '}
              is a web front end and OPDS feed for an existing Calibre
              database, with shelves, metadata editing and Kobo sync.
            </li>
            <li>
              <strong>
                <S id="bookOrbitAbout">BookOrbit</S>
              </strong>{' '}
              is a Docker-based reading platform for ebooks, PDFs, comics and
              audiobooks, with dedicated Kobo and KOReader integrations.
            </li>
            <li>
              <strong>
                <S id="grimmoryStart">Grimmory</S>
              </strong>{' '}
              is a Docker-based library for ebooks, comics and audiobooks,
              with rule-based Magic Shelves and a Komga-compatible API (
              <S id="grimmoryOpds">Grimmory OPDS guide</S>).
            </li>
            <li>
              <strong>
                <S id="lazyIntro">LazyLibrarian</S>
              </strong>{' '}
              is primarily a library manager that tracks authors and fetches
              metadata for ebooks, audiobooks, comics and magazines, with an
              OPDS feed on top (<S id="lazyIntro">LazyLibrarian</S>,{' '}
              <S id="lazyComics">source</S>).
            </li>
          </ul>
        </section>

        <section id="media">
          <h2>Books, comics and audiobooks</h2>
          <p>
            The most important thing to understand here is that what a server
            can do in its own web interface and what it hands to a reading app
            over OPDS are two different things. A server can have a lovely
            built-in audiobook player and still not list a single audio file in
            its OPDS feed. So the table below separates the two, and for
            audiobooks I only count a server when its OPDS feed actually
            offers the audio files.
          </p>
          <Table
            caption="What each server supports, and what reaches a reading app over OPDS"
            head={['Server', 'Ebooks', 'Comics and manga', 'Audiobooks over OPDS']}
            rows={[
              [
                'Komga',
                <>
                  EPUB, PDF (<S id="komgaIntro">source</S>)
                </>,
                <>
                  CBZ, CBR (<S id="komgaIntro">source</S>)
                </>,
                'Not in its supported formats',
              ],
              [
                'Kavita',
                <>
                  EPUB, PDF (<S id="kavitaReadme">source</S>)
                </>,
                <>
                  Comic archives and images (<S id="kavitaReadme">source</S>)
                </>,
                'Not in its supported formats',
              ],
              [
                'Ubooquity',
                <>
                  EPUB, PDF and more (<S id="ubooquitySite">source</S>)
                </>,
                <>
                  CBZ, CBR (<S id="ubooquitySite">source</S>)
                </>,
                'Not documented as a feature',
              ],
              [
                'Calibre-Web',
                <>
                  Whatever is in your Calibre library (
                  <S id="calibreWebFeed">source</S>)
                </>,
                <>
                  CBZ, CBR and other comic formats can be uploaded (
                  <S id="calibreWebFormats">source</S>)
                </>,
                <>
                  Yes, for audio files attached to a book in the Calibre
                  database, including MP3, M4B and FLAC (
                  <S id="calibreWebFormats">formats</S>,{' '}
                  <S id="calibreWebFeed">feed</S>)
                </>,
              ],
              [
                'BookOrbit',
                <>
                  Yes (<S id="bookOrbitAbout">source</S>)
                </>,
                <>
                  Yes (<S id="bookOrbitAbout">source</S>)
                </>,
                <>
                  Yes: M4B, MP3, M4A, Opus, OGG and FLAC (
                  <S id="bookOrbitAbout">formats</S>,{' '}
                  <S id="bookOrbitFeed">feed</S>)
                </>,
              ],
              [
                'Grimmory',
                <>
                  Yes (<S id="grimmoryStart">source</S>)
                </>,
                <>
                  CBZ, CBR, CB7 (<S id="grimmoryOpds">source</S>)
                </>,
                <>
                  Yes (<S id="grimmoryStart">formats</S>,{' '}
                  <S id="grimmoryFeed">feed</S>)
                </>,
              ],
              [
                'LazyLibrarian',
                <>
                  Yes (<S id="lazyIntro">source</S>)
                </>,
                <>
                  Yes, with its own Comics and Recent Comics feeds (
                  <S id="lazyComics">source</S>)
                </>,
                <>
                  Yes, with separate audiobook lists. Multi-file audiobooks
                  can be sent as one zip (<S id="lazySource">source</S>)
                </>,
              ],
            ]}
          />
          <h3>What this means in practice</h3>
          <p>
            <strong>For comics and manga,</strong> all seven will serve your
            CBZ files. That includes LazyLibrarian, which gives comics their
            own lists in its feed once you use it to manage them (
            <S id="lazyComics">source</S>). The real differences are how they organise a series and
            whether they can stream pages, which I cover in the{' '}
            <a href="#opds-pse">OPDS-PSE</a> and{' '}
            <a href="#file-structure">file structure</a> sections.
          </p>
          <p>
            <strong>For audiobooks,</strong> the field narrows to four. Komga,
            Kavita and Ubooquity do not list audiobooks amongst their
            supported formats, so if your library includes them you would end
            up running a second server alongside. BookOrbit, Grimmory,
            Calibre-Web and LazyLibrarian all put audio files in their OPDS
            feeds. Calibre-Web is the one with an asterisk: it serves the
            audio files attached to books in your Calibre database, so it
            suits people who already file audiobooks in Calibre rather than
            people who want to point a server at a folder of M4Bs.
          </p>
          <p>
            One more thing worth knowing: a server offering an audio file does
            not guarantee that your reading app can play it. You need a
            client that understands audiobooks too. <O /> plays audiobooks
            from BookOrbit, Grimmory, Calibre-Web and LazyLibrarian, including
            M4B chapters (<S id="opdsyFeatures">OPDSy features</S>).
          </p>
        </section>

        <section id="look-and-feel">
          <h2>Look and feel: which one is modern?</h2>
          <p>
            This is the part of any comparison where it is easiest to pass off
            taste as fact. Whether a dashboard feels
            modern is personal, so rather than score screenshots, here is what
            can actually be checked: how recently each project shipped a
            release, and how you run it.
          </p>
          <Table
            caption="Release activity and deployment, as of 17 October 2026"
            head={['Server', 'Latest release', 'How you run it', 'Source code']}
            rows={[
              [
                'Komga',
                <>
                  1.29.1, 14 October 2026 (<S id="komgaRelease">release</S>)
                </>,
                <>
                  Java or Docker (<S id="komgaIntro">source</S>)
                </>,
                'Public on GitHub',
              ],
              [
                'Kavita',
                <>
                  v0.9.1.4, 2 September 2026 (
                  <S id="kavitaRelease">release</S>)
                </>,
                <>
                  Docker (<S id="kavitaDocker">source</S>)
                </>,
                'Public on GitHub',
              ],
              [
                'Ubooquity',
                <>
                  3.1.0, 10 August 2025 (
                  <S id="ubooquityDownload">download page</S>)
                </>,
                <>
                  A Java 17 JAR file (<S id="ubooquityInstall">source</S>)
                </>,
                <>
                  Not open source (<S id="ubooquityFaq">FAQ</S>)
                </>,
              ],
              [
                'Calibre-Web',
                <>
                  0.6.27, 8 August 2026 (
                  <S id="calibreWebRelease">release</S>)
                </>,
                <>
                  Python (pip) or Docker, pointed at a Calibre library (
                  <S id="calibreWebReadme">source</S>)
                </>,
                'Public on GitHub',
              ],
              [
                'BookOrbit',
                <>
                  v3.4.0, 13 October 2026 (
                  <S id="bookOrbitRelease">release</S>)
                </>,
                <>
                  Docker Compose with PostgreSQL (
                  <S id="bookOrbitInstall">source</S>)
                </>,
                'Public on GitHub',
              ],
              [
                'Grimmory',
                <>
                  v3.5.0, 21 September 2026 (
                  <S id="grimmoryRelease">release</S>)
                </>,
                <>
                  Docker Compose with MariaDB (
                  <S id="grimmoryRepo">source</S>)
                </>,
                'Public on GitHub',
              ],
              [
                'LazyLibrarian',
                <>
                  No tagged release used; the main branch was updated on 16
                  October 2026 (<S id="lazyCommits">commits</S>)
                </>,
                <>
                  Python or Docker (<S id="lazyInstall">source</S>)
                </>,
                'Public on GitLab',
              ],
            ]}
          />
          <p>
            If modern to you means active development and newer ideas, BookOrbit
            and Grimmory stand out on paper. Both shipped within the last
            month, and both offer rule-based smart shelves (BookOrbit calls
            them SmartScopes, Grimmory calls them Magic Shelves) that fill
            themselves from filters you set (
            <S id="bookOrbitOpds">BookOrbit</S>,{' '}
            <S id="grimmoryOpds">Grimmory</S>). Komga and Kavita are just as
            actively maintained, with releases in October and September.
          </p>
          <p>
            Ubooquity moves at a gentler pace: its current version dates from
            August 2025. That is not the same as abandoned, and there is a lot
            to be said for a server that stays put. A server that rarely
            changes is simply one that has stopped asking for your weekends.
          </p>
          <p>
            My honest advice is to look at each project’s own screenshots or
            demo before you decide. Your eyes are a better judge of your taste
            than my table is. And remember that if you mostly read on your
            phone, the server’s interface is something you will see while
            setting it up. Day to day, you will mostly be looking at your
            reading app.
          </p>
        </section>

        <section id="opds-pse">
          <h2>OPDS-PSE: what it is and why it matters</h2>
          <p>
            Plain OPDS is a catalogue. It tells a reading app what books
            exist, and gives it a link to download each one (
            <S id="opds12">OPDS 1.2 specification</S>). For a novel that works
            well enough, because you want the whole book anyway.
          </p>
          <p>
            Comics are different. A comic archive is a bundle of page images,
            and without page streaming your app has to download the whole
            thing before it can show you page one (
            <S id="pseIntro">PSE introduction</S>). You want to start
            reading, not watch a progress bar with literary ambitions.
          </p>
          <p>
            The OPDS Page Streaming Extension, OPDS-PSE for short, fixes this.
            It adds a page count and a link template to each comic, so a
            reading app can ask the server for one page at a time (
            <S id="pse12">PSE 1.2 specification</S>). The practical benefits
            are:
          </p>
          <ul>
            <li>
              <strong>You start reading almost immediately,</strong> rather
              than waiting for a full download.
            </li>
            <li>
              <strong>You only transfer what you read.</strong> Flick through
              ten pages of a 200-page omnibus and you have fetched ten pages,
              which matters on mobile data.
            </li>
            <li>
              <strong>Your phone’s storage stays free,</strong> because
              nothing has to be saved to read it.
            </li>
          </ul>
          <p>
            PSE is an unofficial extension, and it was originally created for
            Ubooquity (<S id="pseIntro">PSE history</S>). Both the server and
            the reading app need to support it. Here is where each server
            stands:
          </p>
          <Table
            caption="OPDS-PSE page streaming support"
            head={['Server', 'Page streaming over OPDS', 'Notes']}
            rows={[
              [
                'Komga',
                'Yes',
                <>
                  PSE 1.2 on its OPDS 1.x feed (
                  <S id="komgaOpds">Komga OPDS guide</S>)
                </>,
              ],
              [
                'Kavita',
                'Yes',
                <>
                  For non-EPUB files (
                  <S id="kavitaOpds">guide</S>,{' '}
                  <S id="kavitaSource">source</S>)
                </>,
              ],
              [
                'Ubooquity',
                'Yes',
                <>
                  The original PSE server (
                  <S id="pseOriginal">PSE 1.0 specification</S>)
                </>,
              ],
              [
                'Calibre-Web',
                'Not found',
                <>
                  Its OPDS feed template offers whole-file downloads only (
                  <S id="calibreWebFeed">source</S>)
                </>,
              ],
              [
                'BookOrbit',
                'Not found',
                <>
                  Its OPDS feed builder offers whole-file downloads only (
                  <S id="bookOrbitFeed">source</S>)
                </>,
              ],
              [
                'Grimmory',
                'Not over OPDS',
                <>
                  Streams comic pages through a separate Komga-compatible API
                  instead (<S id="grimmoryOpds">Grimmory OPDS guide</S>)
                </>,
              ],
              [
                'LazyLibrarian',
                'Not found',
                <>
                  No PSE links in its OPDS catalogue code (
                  <S id="lazySource">source</S>)
                </>,
              ],
            ]}
          />
          <p>
            “Not found” means I checked the current source code and found no
            PSE support, not that it can never arrive. The Grimmory row is
            worth a second look: it can stream comic pages, but through its
            Komga-compatible API rather than its OPDS feed, so you need an app
            that speaks the Komga API to benefit (
            <S id="grimmoryOpds">Grimmory OPDS guide</S>). In my view that is
            not ideal. Most reading-app developers build to the OPDS
            specification and will hesitate to bolt on a second,
            server-specific API, so I would not count on many OPDS apps
            streaming Grimmory comics this way.
          </p>
          <p>
            If you read lots of comics on a phone, I would weigh PSE heavily.
            One caveat: streaming means reading online. If you are heading
            somewhere without signal, download the comic first. <O /> streams
            over PSE where the server supports it, prefetching the next page
            so it is ready before you swipe, and lets you download anything
            for offline reading (<S id="opdsyFeatures">OPDSy features</S>).
          </p>
        </section>

        <section id="opds-versions">
          <h2>OPDS 2.0 versus OPDS 1.x</h2>
          <p>
            OPDS comes in two generations, and the version number tempts
            people into assuming 2.0 must be better. The difference is mostly
            in the format, not in what you can do with your books.
          </p>
          <ul>
            <li>
              <strong>OPDS 1.x</strong> (1.2 is the current revision) describes
              the catalogue as Atom feeds, which are XML. It defines
              navigation feeds for browsing and acquisition feeds for
              downloading (<S id="opds12">OPDS 1.2 specification</S>).
            </li>
            <li>
              <strong>OPDS 2.0</strong> describes the same kind of catalogue
              in JSON, based on the Readium Web Publication Manifest. The
              specification describes itself as a living standard, so it is
              still evolving (<S id="opds2">OPDS 2.0 specification</S>).
            </li>
          </ul>
          <p>
            Both let a reading app browse your library and download books.
            Crucially, OPDS 2.0 does not by itself give you page streaming,
            audiobooks or reading sync. The PSE specification is written as
            an extension to the Atom feeds of OPDS 1.x (
            <S id="pse12">PSE 1.2 specification</S>), which is why Komga
            documents PSE on its 1.x feed specifically (
            <S id="komgaOpds">Komga OPDS guide</S>).
          </p>
          <p>
            Only one of the seven speaks OPDS 2.0, and that is Komga. It
            publishes both versions side by side, at{' '}
            <code>/opds/v1.2/catalog</code> and <code>/opds/v2/catalog</code>{' '}
            (<S id="komgaOpds">Komga OPDS guide</S>). The other six are OPDS
            1.x servers. Kavita, Calibre-Web, BookOrbit, Grimmory and
            LazyLibrarian all build Atom feeds in their source code (
            <S id="kavitaSource">Kavita</S>,{' '}
            <S id="calibreWebFeed">Calibre-Web</S>,{' '}
            <S id="bookOrbitFeed">BookOrbit</S>,{' '}
            <S id="grimmoryOpdsController">Grimmory</S>,{' '}
            <S id="lazySource">LazyLibrarian</S>), and Ubooquity’s feeds are
            the Atom feeds its own page streaming extension was written for (
            <S id="pseOriginal">PSE 1.0 specification</S>).
          </p>
          <p>
            My take: do not choose a server on its OPDS version. Choose it on
            how it organises your library and what it exposes to your reader.
            A well-built OPDS 1.x feed with PSE will serve a comic reader
            better than an OPDS 2.0 feed without it. <O /> reads both
            versions, so either way it is covered (
            <S id="opdsyFaq">OPDSy FAQ</S>).
          </p>
        </section>

        <section id="reading-sync">
          <h2>Reading progress and sync</h2>
          <p>
            Here is a common misconception: connecting two
            apps to the same OPDS server does not mean they share your place
            in a book. The core OPDS specifications cover finding and
            downloading books, not syncing reading positions (
            <S id="opds12">OPDS 1.2</S>, <S id="opds2">OPDS 2.0</S>). PSE can
            hint at the last page read, but it does not define a way for an
            app to send your progress back (
            <S id="pse12">PSE 1.2 specification</S>).
          </p>
          <p>
            So “sync” can mean four quite different things, and it helps to
            know which one you are after:
          </p>
          <ol>
            <li>
              <strong>Your app remembers your place</strong> on one device.
            </li>
            <li>
              <strong>Your app syncs itself between your devices,</strong>{' '}
              say from your phone to your tablet.
            </li>
            <li>
              <strong>The server tracks progress</strong> in its own web
              reader, or through its own API or a dedicated device
              integration.
            </li>
            <li>
              <strong>Your app writes progress back to the server,</strong>{' '}
              so the server’s web reader and other apps pick up where you left
              off.
            </li>
          </ol>
          <p>
            For an OPDS reading app, the fourth kind is the one that matters,
            and it is where the servers differ most. Komga is the only one of
            the seven that lets an OPDS app publish your reading position
            back to it (<S id="komgaProgress">Komga read progress</S>,{' '}
            <S id="opdsyFaq">OPDSy FAQ</S>). Kavita comes a close second in a
            quieter way: when an app streams a comic page by page over PSE,
            Kavita saves the page you reached as your progress (
            <S id="kavitaPageStream">Kavita source</S>). That only works while
            you are streaming, so a book you downloaded and read offline will
            not move your place on the server.
          </p>
          <Table
            caption="Can an OPDS reading app keep your place on the server?"
            head={['Server', 'Progress from an OPDS app', 'What it offers instead']}
            rows={[
              [
                'Komga',
                'Yes',
                <>
                  Tracks read progress per user (
                  <S id="komgaProgress">guide</S>)
                </>,
              ],
              [
                'Kavita',
                'Only while streaming over PSE',
                <>
                  Saves the page you stream as progress (
                  <S id="kavitaPageStream">source</S>)
                </>,
              ],
              [
                'Ubooquity',
                'No',
                <>
                  None documented (<S id="ubooquityManual">manual</S>)
                </>,
              ],
              [
                'Calibre-Web',
                'No',
                <>
                  Kobo sync for Kobo e-readers (
                  <S id="calibreWebReadme">README</S>)
                </>,
              ],
              [
                'BookOrbit',
                'No',
                <>
                  Kobo and KOReader integrations (
                  <S id="bookOrbitAbout">overview</S>,{' '}
                  <S id="bookOrbitKoreader">KOReader guide</S>)
                </>,
              ],
              [
                'Grimmory',
                'No',
                <>
                  KOReader sync through a separate API (
                  <S id="grimmoryKoreader">KOReader guide</S>)
                </>,
              ],
              [
                'LazyLibrarian',
                'No',
                <>
                  Read and To Read lists in its OPDS feed (
                  <S id="lazyOpds">OPDS guide</S>)
                </>,
              ],
            ]}
          />
          <p>
            To be fair to the others, several of them have put real work into
            sync, just aimed at a particular device or app rather than at
            OPDS. If you read on a Kobo or in KOReader, those integrations may
            be exactly what you need. If you read in an OPDS app on your phone,
            though, most of these servers will not know where you got to.
          </p>
          <p>
            This is a gap <O /> fills. Whichever server a book came from, you
            can turn on optional sync through your own Google Drive, end-to-end
            encrypted, which carries your reading progress, favourites,
            highlights and bookmarks between your devices. The server never
            needs to support it. If you use Komga, a separate per-library
            switch also publishes your page back to Komga, so its web reader
            shows the same place (<S id="opdsyFeatures">OPDSy features</S>,{' '}
            <S id="opdsyFaq">OPDSy FAQ</S>).
          </p>
        </section>

        <section id="file-structure">
          <h2>Folders or metadata: how each server organises your library</h2>
          <p>
            This is the difference that shapes everyday browsing most, and it
            is the one I would think about hardest. Imagine a
            library on disk like this:
          </p>
          <pre className={styles.tree}>
            <code>
              {`/comics
  Saga/
    Volume 1/
      Saga #01.cbz
      Saga #02.cbz
    Volume 2/
      Saga #07.cbz`}
            </code>
          </pre>
          <p>
            Broadly, servers take one of two approaches with that tree. Some
            keep your folders as the way you browse. Others read your folders
            and file names, work out what is a series, and then present a
            catalogue organised by series, author or other metadata.
          </p>
          <h3>Your folders, mirrored: Ubooquity</h3>
          <p>
            Ubooquity is set up by choosing the directories you want to share
            (<S id="ubooquityInstall">installation guide</S>). In my
            integration work, its catalogue mirrors those folders as they
            are, with separate entry points for comics and books, however
            deeply you have nested them (
            <S id="opdsyServers">server-by-server guide</S>). If your folder
            tree is already the way you think about your collection, that is
            a genuinely good reason to choose it. You get exactly what you
            built, no more and no less.
          </p>
          <h3>Folders become series: Komga and Kavita</h3>
          <p>
            Komga does use your folders, but differently. It creates a series
            for each folder that contains books, at any depth, and puts each
            book into the series of its parent folder (
            <S id="komgaScan">Komga scanning guide</S>). Your library becomes
            a list of series, not a tree. In the example above, Volume 1 and
            Volume 2 would become two separate series. If you want to group
            them, Komga’s collections let you bundle series together yourself
            (<S id="opdsyServers">server-by-server guide</S>).
          </p>
          <p>
            Kavita works out series from file names, metadata inside the
            files and some folder names, rather than mirroring every folder
            level, and it has some layout rules worth reading before you
            import (<S id="kavitaScanner">Kavita scanner guide</S>). Kavita
            tracks volumes, but in its main OPDS series view every issue
            arrives in one list, rather than as a separate volume level (
            <S id="kavitaSource">Kavita source</S>). If tidy volume grouping
            matters to you, it is worth testing with a few of your own files
            first.
          </p>
          <h3>Metadata first: Calibre-Web, BookOrbit, Grimmory and LazyLibrarian</h3>
          <p>
            These four are book-first. A series is a label on a book rather
            than a folder you open, and you browse by author, series, shelf
            and similar lists.
          </p>
          <ul>
            <li>
              <strong>Calibre-Web</strong> reads everything from your Calibre
              database, and its OPDS feed lets you browse by author,
              publisher, category, series, language, rating and format (
              <S id="calibreWebReadme">README</S>,{' '}
              <S id="calibreWebOpds">source</S>).
            </li>
            <li>
              <strong>BookOrbit</strong> offers All Books, Libraries,
              Collections, SmartScopes, Authors and Series in its OPDS feed (
              <S id="bookOrbitOpds">OPDS guide</S>).
            </li>
            <li>
              <strong>Grimmory</strong> offers Libraries, Shelves, Magic
              Shelves, Authors, Series and a Surprise Me list of random books
              (<S id="grimmoryOpds">OPDS guide</S>). Its Series list is built
              from book metadata, so it stays empty until your files carry a
              series name (<S id="opdsyServers">server-by-server guide</S>).
            </li>
            <li>
              <strong>LazyLibrarian</strong> builds its catalogue from its own
              database, so a file only appears once LazyLibrarian knows about
              it, and empty sections are hidden (
              <S id="lazyOpds">OPDS guide</S>, <S id="lazySource">source</S>).
            </li>
          </ul>
          <p>
            Neither approach is better. Folder-first rewards people who
            already keep their files tidy. Metadata-first rewards people who
            are happy to tag their books, and it is much more forgiving of a
            download folder that has been “temporary” for several years. Be
            honest with yourself about which one you are.
          </p>
        </section>

        <section id="getting-started">
          <h2>Ease of use and entry points</h2>
          <p>
            When a reading app connects to an OPDS server, the first thing it
            sees is the server’s root catalogue: a menu of entry points such
            as Recently Added, Series or Continue Reading. That first screen
            decides how quickly you get from opening the app to reading
            something, and every server fills it differently. Here is what
            each one puts there (
            <S id="opdsyServers">server-by-server guide</S>):
          </p>
          <Table
            caption="What each server offers on its first OPDS screen"
            head={[
              'Server',
              'Pick up where you left off',
              'Ways to browse',
              'Lists you curate',
            ]}
            rows={[
              [
                'Komga',
                'Keep Reading, On Deck',
                'All series, All libraries, Latest series, Latest books, Publishers',
                'Collections, Read lists',
              ],
              [
                'Kavita',
                'On Deck, Want to Read',
                <>
                  All Libraries, Recently Updated, Recently Added (
                  <S id="kavitaSource">source</S>)
                </>,
                'Collections, Reading Lists',
              ],
              [
                'Ubooquity',
                'None',
                'Comics by folder, Books by folder, latest comics, latest books',
                'None',
              ],
              [
                'Calibre-Web',
                'Read Books, Unread Books, Hot Books',
                <>
                  Alphabetical, Recently added, Random, Top Rated, Authors,
                  Publishers, Categories, Series, Languages, Ratings, File
                  formats (<S id="calibreWebOpds">source</S>)
                </>,
                'Shelves',
              ],
              [
                'BookOrbit',
                'None',
                'All Books, Recent Books, Random Books, Libraries, Authors, Series',
                'Collections, SmartScopes',
              ],
              [
                'Grimmory',
                'None',
                <>
                  All Books, Recently Added, Surprise Me, Libraries, Authors,
                  Series (<S id="grimmoryOpdsController">source</S>)
                </>,
                'Shelves, Magic Shelves',
              ],
              [
                'LazyLibrarian',
                <>
                  Read and To Read lists (<S id="lazyOpds">guide</S>)
                </>,
                <>
                  Recent eBooks, Recent AudioBooks, Recent Comics, Recent
                  Magazine Issues, Best Rated, Authors, Series, Genres,
                  Magazines, Comics (<S id="lazySource">source</S>)
                </>,
                'None',
              ],
            ]}
          />
          <p>
            A few things stand out. Komga and Kavita are the only two with
            true “carry on reading” entries, which makes them the quickest to
            get back into a series you are halfway through. Calibre-Web offers
            the most ways to slice your library, which is wonderful if your
            metadata is tidy and a little overwhelming if you just want your
            books. Ubooquity is the simplest of the lot: your folders, plus a
            list of the latest additions. BookOrbit and Grimmory sit in the
            middle, with an All Books list as the obvious way in and curated
            shelves for people who like to organise (
            <S id="opdsyServers">server-by-server guide</S>).
          </p>
          <p>
            Two things catch people out. Lists you curate, such as
            collections and shelves, start empty until you create something
            on the server. And metadata-driven entries like Series stay empty
            on Grimmory until your files carry a series name (
            <S id="opdsyServers">server-by-server guide</S>). Neither is a
            fault, even if an empty list on day one can look like one.
          </p>
          <h3>Connecting your app</h3>
          <p>
            To get that far, your app needs the right address and the right
            sign-in. Here is where each server publishes its feed:
          </p>
          <Table
            caption="Where each server publishes its OPDS feed"
            head={['Server', 'OPDS address', 'Worth knowing']}
            rows={[
              [
                'Komga',
                <>
                  <code>/opds/v1.2/catalog</code> or{' '}
                  <code>/opds/v2/catalog</code>, on port 25600 by default (
                  <S id="komgaOpds">source</S>)
                </>,
                <>
                  Use the v1.2 address if you want PSE page streaming (
                  <S id="komgaOpds">source</S>).
                </>,
              ],
              [
                'Kavita',
                <>
                  A personal URL containing an auth key, copied from your user
                  settings (<S id="kavitaOpds">source</S>)
                </>,
                <>
                  OPDS is on by default. Treat that URL like a password (
                  <S id="kavitaOpds">source</S>).
                </>,
              ],
              [
                'Ubooquity',
                <>
                  See the <S id="opdsyServers">server-by-server guide</S>
                </>,
                <>
                  Administration is local-only unless you enable remote
                  access (<S id="ubooquityManual">source</S>).
                </>,
              ],
              [
                'Calibre-Web',
                <>
                  <code>/opds</code>, on port 8083 by default (
                  <S id="calibreWebReadme">source</S>)
                </>,
                'Books must be in the Calibre database to appear.',
              ],
              [
                'BookOrbit',
                <>
                  <code>/api/v1/opds</code> (<S id="bookOrbitOpds">source</S>)
                </>,
                <>
                  Switch OPDS on and create a separate OPDS account (
                  <S id="bookOrbitOpds">source</S>).
                </>,
              ],
              [
                'Grimmory',
                <>
                  <code>/api/v1/opds</code>, on port 6060 by default (
                  <S id="grimmoryOpds">source</S>)
                </>,
                <>
                  Switch OPDS on and create a separate OPDS user (
                  <S id="grimmoryOpds">source</S>).
                </>,
              ],
              [
                'LazyLibrarian',
                <>
                  <code>/opds</code>, on port 5299 by default (
                  <S id="lazyOpds">source</S>,{' '}
                  <S id="lazyConfig">source</S>)
                </>,
                <>
                  OPDS is off by default and needs a restart after you
                  enable it (<S id="lazyDefaults">source</S>,{' '}
                  <S id="lazyConfig">source</S>).
                </>,
              ],
            ]}
          />
          <p>
            For a visual map of each server’s first screen and the quickest
            route into your books, see my{' '}
            <S id="opdsyServers">server-by-server guide to each library’s entry
            points</S>.
          </p>
        </section>

        <section id="before-you-choose">
          <h2>Five things worth checking before you commit</h2>
          <p>
            A few things that are not on most comparison lists but are worth
            a moment’s thought.
          </p>
          <ol>
            <li>
              <strong>Reading away from home.</strong> A server on your home
              network is not reachable on mobile data just because your app
              speaks OPDS. Most people use a VPN such as Tailscale or
              WireGuard, or a reverse proxy with HTTPS (
              <S id="opdsyFaq">OPDSy FAQ</S>). Keep authentication switched
              on rather than exposing an open server.
            </li>
            <li>
              <strong>How your app signs in.</strong> Your normal web login
              is not always what a reading app uses. BookOrbit and Grimmory
              use separate OPDS accounts, and Kavita uses a personal URL with
              a key in it (<S id="bookOrbitOpds">BookOrbit</S>,{' '}
              <S id="grimmoryOpds">Grimmory</S>,{' '}
              <S id="kavitaOpds">Kavita</S>). Keep those URLs out of
              screenshots and forum posts.
            </li>
            <li>
              <strong>Metadata quality.</strong> Series, author and smart
              shelf lists are only as good as the metadata behind them. A
              blank Series list is often a tagging problem, not a bug (
              <S id="opdsyServers">server-by-server guide</S>).
            </li>
            <li>
              <strong>Backups.</strong> For the database-backed servers, back
              up the database as well as your books. Grimmory’s KOReader sync,
              for example, depends on files staying byte-for-byte identical,
              so re-encoding or replacing files can affect it (
              <S id="grimmoryKoreader">Grimmory KOReader guide</S>).
            </li>
            <li>
              <strong>Licensing.</strong> Six of these servers publish their
              source code. Ubooquity is free for non-commercial use but is
              not open source (
              <S id="ubooquityDownload">download page</S>,{' '}
              <S id="ubooquityFaq">FAQ</S>). That may or may not matter to
              you, but it is worth knowing up front.
            </li>
          </ol>
        </section>

        <section id="opdsy">
          <h2>Where OPDSy fits</h2>
          <p>
            Here is the plug, and I have tried to earn it. Most readers make
            you choose between the files on your device and a self-hosted
            server. <Link href="/apps/opdsy/">OPDSy</Link> is built so you do
            not have to, and it is{' '}
            <a href={sources.opdsyPlay.href}>available on Google Play</a>.
            Everything below is described on the <O /> page (
            <S id="opdsyFeatures">features</S>, <S id="opdsyFaq">FAQ</S>):
          </p>
          <ul>
            <li>
              <strong>One library for everything.</strong> Local folders and
              any number of servers, including all seven in this article, are
              merged into a single home, with Continue Reading, favourites and
              search working across all of them.
            </li>
            <li>
              <strong>OPDS 1.2 and 2.0,</strong> with page-by-page comic
              streaming over OPDS-PSE wherever your server offers it.
            </li>
            <li>
              <strong>Books, comics and audiobooks.</strong> EPUB, MOBI, AZW3,
              FB2, PDF, CBZ and CBR, plus M4B, MP3 and other audiobook
              formats with chapters, playback speed and a sleep timer.
            </li>
            <li>
              <strong>Offline reading.</strong> Download anything from a
              server and read it with no connection.
            </li>
            <li>
              <strong>Private sync on any server.</strong> Optional,
              end-to-end encrypted sync through your own Google Drive keeps
              your place across devices even when your server cannot, plus
              optional progress publishing back to Komga.
            </li>
            <li>
              <strong>A one-time purchase.</strong> No subscription, no ads,
              no tracking and no account with us.
            </li>
          </ul>
          <p>
            You do not need <O /> to use any of these servers, and plenty of
            good readers exist. But if you are self-hosting on Android and are
            tired of running one app for your server and another for your
            local files, <O /> is designed for exactly that.
          </p>
          <aside className={styles.banner} aria-label="Get OPDSy">
            <Link href="/apps/opdsy/" className={styles.bannerApp}>
              <Image
                src={opdsy.icon}
                alt=""
                width={88}
                height={88}
                className={styles.bannerIcon}
              />
              <span>
                <strong>{opdsy.name}</strong>
                <span>{opdsy.tagline}</span>
              </span>
            </Link>
            <div className={styles.bannerBadge}>
              <DownloadButtons downloads={opdsy.downloads} />
            </div>
          </aside>
        </section>

        <section id="verdict">
          <h2>So, which is the best?</h2>
          <p>
            Having integrated all seven, my honest answer is that the best
            OPDS server is the one that matches how your library already
            works.
          </p>
          <ul>
            <li>
              <strong>Comics first?</strong> Komga or Kavita, for series
              organisation and page streaming.
            </li>
            <li>
              <strong>Calibre already runs your life?</strong> Calibre-Web,
              without a migration.
            </li>
            <li>
              <strong>Love your folder tree?</strong> Ubooquity, which leaves
              it exactly as you built it.
            </li>
            <li>
              <strong>Books, comics and audiobooks in one place?</strong>{' '}
              BookOrbit, Grimmory or LazyLibrarian.
            </li>
          </ul>
          <p>
            Try your shortlist with a small sample of your own files, not a
            tidy demo library. Your real collection will tell you very quickly
            which server suits it. And if I have got anything wrong or out of
            date, email <a href={`mailto:${company.email}`}>{company.email}</a>{' '}
            and I will fix it.
          </p>
        </section>

        <section id="sources" className={styles.sources}>
          <h2>Sources</h2>
          <p>
            Every source below was checked on 17 October 2026. Where a link
            points to source code, it is pinned to a specific release or
            commit where one was available, so it will still show the code I
            checked even after the projects move on.
          </p>
          <ol>
            {Object.values(sources).map((source) => (
              <li key={source.href}>
                <a href={source.href}>{source.title}</a>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}
