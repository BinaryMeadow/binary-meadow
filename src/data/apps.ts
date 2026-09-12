export type Platform = 'android' | 'ios' | 'macos' | 'windows';

export interface DownloadLink {
  label: string;
  href: string;
  platform: Platform;
}

export interface AppFeature {
  title: string;
  description: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  /**
   * Promotes this capture into the six images published as structured data.
   * Lets an app order its gallery for humans while still showing search
   * engines the most representative screens. Ignored once six are marked.
   */
  featured?: boolean;
}

/** A segment of an attribution line; renders as a link when `href` is set. */
export interface CreditPart {
  text: string;
  href?: string;
}

export interface PrivacyDataPoint {
  title: string;
  description: string;
}

/** How an app is paid for. Deliberately price-free so it needs no upkeep. */
export interface AppPricing {
  /** Short badge text, e.g. "One-time purchase · No ads · No subscription". */
  label: string;
  /** One or two sentences expanding on the badge, shown in the download CTA. */
  detail: string;
  /** Whether the app costs nothing. Drives the structured-data offer. */
  free: boolean;
}

export type ComparisonValue = 'yes' | 'partial' | 'no' | 'unknown';

export interface ComparisonCell {
  value: ComparisonValue;
  /** Short qualifier shown beneath the mark, e.g. "Pro only". */
  note?: string;
}

export interface ComparisonRow {
  feature: string;
  /** One cell per column, in the same order as `columns`. */
  cells: ComparisonCell[];
}

export interface ComparisonColumn {
  name: string;
  /** Primary source for this app's claims, linked from the column header. */
  href?: string;
  /** Marks the column for this app, which is highlighted. */
  self?: boolean;
}

export interface Comparison {
  lead: string;
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  /** Sourcing / accuracy note rendered beneath the table. */
  note: string;
}

/**
 * What sits behind a single entry in a server's top-level OPDS feed. Describes
 * the tile's shape rather than how many items it holds, because counts depend
 * entirely on the reader's own library.
 */
export type ServerTileShape =
  | 'menu'
  | 'list'
  | 'activity'
  | 'user'
  | 'metadata';

export interface ServerTile {
  name: string;
  shape: ServerTileShape;
  /** Short qualifier shown beside the tile name. */
  note?: string;
  /** Marks the tile that is the useful route into the library. */
  wayIn?: boolean;
  /** Levels you pass through from this tile down to a readable file. */
  path?: string[];
}

export interface ServerStructure {
  name: string;
  href?: string;
  /** One-line characterisation of how this server models a library. */
  summary: string;
  /** Top-level entries, in the order the server publishes them. */
  tiles: ServerTile[];
  /** Anything surprising about this server, shown beneath its tiles. */
  caveat?: string;
}

export interface ServerTerm {
  term: string;
  definition: string;
  example: string;
}

export interface ServerStructures {
  lead: string;
  /** Vocabulary every server shares, defined once above the accordions. */
  terms?: ServerTerm[];
  /** Folder layout illustrating how those terms map to disk. */
  termsExample?: { caption: string; lines: string[] };
  servers: ServerStructure[];
  /** Sourcing / accuracy note rendered beneath the accordions. */
  note: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AppPrivacy {
  /**
   * When this app's policy last changed, e.g. "26 August 2026". Per-app rather
   * than a site-wide literal: policies change when an app ships a feature that
   * moves data, so a shared date would either misdate a new policy or falsely
   * claim the others had been revised.
   */
  updated: string;
  /** One-line summary of the app's data posture. */
  summary: string;
  /** Whether the app collects personal data or analytics off-device. */
  collectsPersonalData: boolean;
  /** What data the app handles and where it lives. */
  dataHandling: PrivacyDataPoint[];
  /** External services the app may contact, and why. */
  thirdParties: string[];
  /** App-specific children's privacy statement. */
  childrenNote: string;
}

export interface App {
  slug: string;
  name: string;
  tagline: string;
  /** Short blurb for cards. */
  summary: string;
  /** Longer description for the detail page. */
  description: string;
  category: string;
  icon: string;
  /** Wide promotional banner (e.g. 1024×500). Optional — desktop apps may not have one. */
  featureGraphic?: string;
  platforms: Platform[];
  /** Primary call-to-action grouping shown on cards and detail pages. */
  downloads: DownloadLink[];
  /** Explicit pricing model. Stated without prices, so it never goes stale. */
  pricing?: AppPricing;
  /** Public source repository. Omit for closed-source apps. */
  repository?: string;
  /** A few emphasised selling points, shown prominently above the full feature list. */
  highlights?: AppFeature[];
  features: AppFeature[];
  techStack: string[];
  screenshots: Screenshot[];
  /** Landscape tablet screenshots, shown in a separate section below the phone screenshots. */
  tabletScreenshots?: Screenshot[];
  /** Optional attribution shown beneath the screenshots (e.g. third-party artwork). */
  screenshotsCredit?: CreditPart[];
  /** Accent colour pulled from each app's own identity. */
  accent: string;
  /** Slug of a sibling app promoted in a banner at the foot of this app's page. */
  crossPromo?: string;
  /** Optional feature comparison against the main alternatives. */
  comparison?: Comparison;
  /** Optional walk-through of what each supported server publishes. */
  serverStructures?: ServerStructures;
  /** Frequently asked questions, also emitted as FAQPage structured data. */
  faqs?: FaqItem[];
  /** App-specific privacy policy, linkable from app stores. */
  privacy: AppPrivacy;
}

export const apps: App[] = [
  {
    slug: 'jannah-builder',
    name: 'Jannah Builder',
    tagline: 'Watch your spiritual journey grow.',
    summary:
      'A spiritually-sensitive prayer tracker that visualises consistent worship as a living, growing pixel-art landscape.',
    description:
      'Jannah Builder is a calm, spiritually-sensitive prayer tracker that turns your five daily prayers into a beautiful, growing pixel-art world inspired by Jannah (Paradise).\n\nIt favours calm reflection over gamification and gentle encouragement over guilt. Trees, flowers, buildings and roaming animals appear as you stay consistent — and when a day is missed, only one element is gently affected, so older progress is always preserved.\n\nThere are no streaks to break, no leaderboards and no comparisons. Everything works fully offline with no account required, and your prayer logs never leave your device.',
    category: 'Lifestyle / Wellbeing',
    icon: '/apps/jannah-builder.png',
    featureGraphic: '/apps/jannah-builder-feature.png',
    platforms: ['android'],
    accent: '#2d7a5f',
    repository: 'https://github.com/binarymeadow/jannah-builder',
    downloads: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.jannahbuilder',
        platform: 'android',
      },
      {
        label: 'Download APK',
        href: 'https://github.com/binarymeadow/jannah-builder/releases',
        platform: 'android',
      },
    ],
    techStack: ['React Native', 'Expo SDK 54', 'TypeScript', 'Expo Router'],
    highlights: [
      {
        title: 'Gentle, never guilt',
        description:
          'No streaks, no leaderboards, no comparisons — just calm encouragement. A missed day affects only one element, never your whole garden.',
      },
      {
        title: 'A living Jannah map',
        description:
          'Watch a beautiful pixel-art world grow with your worship — trees, flowers, buildings and roaming wildlife.',
      },
      {
        title: 'Private & fully offline',
        description:
          'No account, no analytics and no tracking of any kind. Every prayer log stays on your device.',
      },
    ],
    features: [
      {
        title: 'Five daily prayers',
        description:
          'Log Fajr, Dhuhr, Asr, Maghrib and Isha with subtle haptics and a gentle chime when the day is complete.',
      },
      {
        title: 'A living Jannah map',
        description:
          'A top-down pixel-art world where trees, multi-stage flowers, buildings and roaming animals appear as you progress.',
      },
      {
        title: 'Gentle decay',
        description:
          'Missed days affect one element at a time — newest first — so older progress is always preserved.',
      },
      {
        title: 'Qur’an & dhikr logging',
        description:
          'Simple daily yes/no logging enriches the ambience with golden light and floating particles, and occasionally grows lasting barakah flowers.',
      },
      {
        title: 'Roaming wildlife',
        description:
          'Animated birds, rabbits, deer and squirrels bring your garden quietly to life.',
      },
      {
        title: 'Seasonal moments',
        description:
          'Beautiful temporary items appear during long periods of consistency, then gently pass.',
      },
      {
        title: 'A journey, not a competition',
        description:
          'Statistics are presented as a personal journey — no streaks displayed, no leaderboards, no comparisons.',
      },
      {
        title: 'Fully offline, no account',
        description:
          'All data stays on your device and the app works without sign-in — nothing is sent to Binary Meadow.',
      },
    ],
    screenshots: [
      { src: '/screenshots/jannah-builder/1-prayer-screenhot.jpg', alt: 'Jannah Builder prayer logging screen' },
      { src: '/screenshots/jannah-builder/2-jannah-map.jpg', alt: 'Jannah Builder living Jannah map' },
      { src: '/screenshots/jannah-builder/3-stats-screen.jpg', alt: 'Jannah Builder statistics screen' },
      { src: '/screenshots/jannah-builder/4all-time-stats-scren.jpg', alt: 'Jannah Builder all-time statistics screen' },
      { src: '/screenshots/jannah-builder/5-settings.jpg', alt: 'Jannah Builder settings screen' },
    ],
    privacy: {
      updated: '25 June 2026',
      summary:
        'Jannah Builder is local-first. Your prayer logs and progress stay on your device and are never sent to us.',
      collectsPersonalData: false,
      dataHandling: [
        {
          title: 'Prayer & worship logs',
          description:
            'Your daily prayer entries, optional Qur’an and dhikr logs, and the state of your Jannah map are stored locally on your device. They are not transmitted to Binary Meadow or any third party.',
        },
        {
          title: 'No account required',
          description:
            'The app works without sign-in. We do not ask for your name, email, phone number, or location, and we do not build a profile of you.',
        },
        {
          title: 'No analytics or tracking',
          description:
            'Jannah Builder does not embed advertising SDKs or third-party analytics, and does not track your activity across other apps or websites.',
        },
      ],
      thirdParties: [
        'Google Play — distributes the app and processes installs under its own privacy policy.',
        'GitHub Releases — hosts the downloadable APK under GitHub’s privacy policy.',
      ],
      childrenNote:
        'Jannah Builder is a family-friendly app suitable for all ages. Because it is local-first and collects no personal data, it can be used safely by children as well as adults.',
    },
  },
  {
    slug: 'task-monster',
    name: 'Task Monster',
    tagline: 'Feed your monster by finishing tasks.',
    summary:
      'A gamified to-do list where every task you finish feeds a pixel monster that grows, levels up and evolves alongside you.',
    description:
      'Task Monster turns your to-do list into a game. Every task you finish becomes food for your very own pixel monster, so getting things done actually feels rewarding.\n\nFinish a task and it drops into the feeder as a tasty bubble. Tap feed and watch your monster chomp it down, level up and slowly evolve. The more you get done, the happier and healthier it becomes.\n\nRaise one of six lively creatures, each with its own look and personality, give it a name and pick its accent colour. It all works offline with no account required, and your tasks never leave your device.',
    category: 'Productivity',
    icon: '/apps/task-monster.png',
    platforms: ['android'],
    accent: '#FF6B9D',
    downloads: [],
    techStack: ['React Native', 'Expo SDK 54', 'TypeScript', 'Expo Router', 'React Native Skia'],
    highlights: [
      {
        title: 'Finishing tasks feeds your monster',
        description:
          'Every completed task drops into the feeder as a tasty bubble. Feed it to your monster to level up, and watch it grow happier and healthier the more you get done.',
      },
      {
        title: 'Six creatures that come to life',
        description:
          'Raise one of six monster species, each with its own look and personality. They blink, wobble, chomp and evolve through levels as you stay consistent.',
      },
      {
        title: 'Private & fully offline',
        description:
          'No account, no ads and no tracking of any kind. Your tasks stay on your device, with optional Google Drive backup only if you choose it.',
      },
    ],
    features: [
      {
        title: 'Gamified to-do list',
        description:
          'Completing tasks feeds and grows your monster, so ticking things off is genuinely rewarding.',
      },
      {
        title: 'Six monster species',
        description:
          'Raise Blip, Cyclo, Trio, Fuzz, Finn or Nib, each with its own character, and switch whenever you like.',
      },
      {
        title: 'Living animations',
        description:
          'Your monster blinks, wobbles, chomps its food and even poops out the odd finished task to keep things playful.',
      },
      {
        title: 'Evolving levels',
        description:
          'Keep feeding your monster to level it up and watch it evolve as your progress builds.',
      },
      {
        title: 'Colourful task groups',
        description:
          'Organise work, home and everything else into tidy, colour-coded groups.',
      },
      {
        title: 'Subtasks, due dates & reminders',
        description:
          'Break bigger tasks down, set a due date and time, and get a gentle reminder before anything is due.',
      },
      {
        title: 'Swipe to feed',
        description:
          'Tick or swipe a task to send it to the feeder, with a quick undo if you change your mind.',
      },
      {
        title: 'Health, happiness & XP',
        description:
          'Simple stats reflect how consistently you are getting things done.',
      },
      {
        title: 'Make it yours',
        description:
          'Give your monster a name, choose from six accent colours, and switch sound effects and haptics on or off.',
      },
      {
        title: 'Fully offline, no account',
        description:
          'Everything works without sign-in and stays on your device, with optional Google Drive backup and sync.',
      },
    ],
    screenshots: [
      { src: '/screenshots/task-monster/1-tasks.jpg', alt: 'Task Monster task list with colourful groups' },
      { src: '/screenshots/task-monster/2-monster.jpg', alt: 'Task Monster monster screen with feed button and stats' },
      { src: '/screenshots/task-monster/3-feed.jpg', alt: 'Task Monster sending a finished task to the feeder' },
      { src: '/screenshots/task-monster/4-characters.jpg', alt: 'Task Monster character picker showing six monster species and accent colours' },
      { src: '/screenshots/task-monster/5-new-task.jpg', alt: 'Task Monster new task form with groups, due date and reminder' },
    ],
    privacy: {
      updated: '12 September 2026',
      summary:
        'Task Monster is local-first. Your tasks and your monster stay on your device and are never sent to us.',
      collectsPersonalData: false,
      dataHandling: [
        {
          title: 'Tasks & monster progress',
          description:
            'Your tasks, groups and your monster’s state are stored locally on your device. They are not transmitted to Binary Meadow or any third party.',
        },
        {
          title: 'No account required',
          description:
            'The app works without sign-in. We do not ask for your name, email, phone number, or location, and we do not build a profile of you.',
        },
        {
          title: 'Optional Google Drive backup',
          description:
            'If you choose to connect Google Drive, a backup of your tasks is stored in your own Drive account so you can sync across devices. This only happens when you connect it, and nothing is sent to us.',
        },
        {
          title: 'No analytics or tracking',
          description:
            'Task Monster does not embed advertising SDKs or third-party analytics, and does not track your activity across other apps or websites.',
        },
      ],
      thirdParties: [
        'Google Play — distributes the app and processes installs under its own privacy policy.',
        'Google Drive — stores your optional backup in your own account, only if you connect it, under Google’s privacy policy.',
      ],
      childrenNote:
        'Task Monster is a family-friendly app suitable for all ages. Because it is local-first and collects no personal data, it can be used safely by children as well as adults.',
    },
  },
  {
    slug: 'opdsy',
    name: 'OPDSy',
    tagline: 'Your files and your servers, one library.',
    summary:
      'One library for the books on your device and on your self-hosted OPDS servers — most readers make you choose one or the other. Private, fast and ad-free.',
    description:
      'Most readers make you choose: local files or a self-hosted server. OPDSy merges both into a single unified library — the folders on your device sitting alongside Komga, Kavita, Ubooquity, Calibre-Web, BookOrbit, Grimmory and any OPDS 1.2 or 2.0 source, each tagged with its own colour.\n\nThat means you can start with nothing but a folder of files — add it as a local library, or open a book straight from your file manager or share sheet — and add servers later, or never. Continue Reading, favourites and search work across everything at once, whichever source a book came from.\n\nRead EPUB, MOBI, AZW3, FB2 and PDF books, CBZ/CBR comics and manga, and Markdown with Mermaid.js diagrams; jump straight to any page or chapter; look a word up in an offline dictionary; highlight passages and bookmark pages; listen to any book with built-in text-to-speech; and download titles for fully offline reading — with no account, no ads and no tracking of any kind.',
    category: 'Books & Reference',
    icon: '/apps/opdsy.png',
    featureGraphic: '/apps/opdsy-feature.png?v=2',
    platforms: ['android'],
    accent: '#1f6f8b',
    crossPromo: 'spinely',
    downloads: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.opdsy',
        platform: 'android',
      },
    ],
    pricing: {
      label: 'One-time purchase · No ads · No subscription',
      detail:
        'Buy OPDSy once on Google Play and it is yours — no subscription, no in-app purchases, no ads and no pro tier. Every feature, sync included, is there from the first launch.',
      free: false,
    },
    techStack: ['Expo SDK 56', 'React Native', 'TypeScript', 'TanStack Query'],
    screenshots: [
      { src: '/screenshots/opdsy/01-home.jpg', featured: true, alt: 'OPDSy home screen with a continue reading card, favourites and the latest items from a connected server' },
      { src: '/screenshots/opdsy/02-library.jpg', featured: true, alt: 'OPDSy library screen listing folders grouped by each connected OPDS library' },
      { src: '/screenshots/opdsy/03-comic-list.jpg', featured: true, alt: 'OPDSy comics folder showing a grid of comic series cover art' },
      { src: '/screenshots/opdsy/04-book-list.jpg', alt: 'OPDSy books folder showing a grid of ebook covers with titles and authors' },
      { src: '/screenshots/opdsy/05-comic-reading.jpg', featured: true, alt: 'OPDSy comic reader with the page controls open, showing reading direction, layout and fit options' },
      { src: '/screenshots/opdsy/05-1-comic-reading-2.jpg', alt: 'OPDSy comic reader with the page thumbnail strip open for jumping between pages' },
      { src: '/screenshots/opdsy/06-book-reading.jpg', featured: true, alt: 'OPDSy ebook reader on a sepia theme with read-aloud speed, text size and theme controls open' },
      { src: '/screenshots/opdsy/06-1-book-reading-2.jpg', alt: 'OPDSy ebook reader on a white theme, showing how the reading theme changes the page' },
      { src: '/screenshots/opdsy/06-2-book-reading-3.jpg', alt: 'OPDSy ebook reader with the contents panel open for jumping to a chapter or page number' },
      { src: '/screenshots/opdsy/06-3-highlight.jpg', alt: 'OPDSy text highlighting with five highlight colours and copy, share and note actions' },
      { src: '/screenshots/opdsy/06-4-dictionary-word.jpg', featured: true, alt: 'OPDSy offline dictionary lookup showing the definition of a tapped word while reading' },
      { src: '/screenshots/opdsy/07-highlights-bookmarks.jpg', alt: 'OPDSy highlights and bookmarks screen with tabs for highlights, bookmarks and looked-up words' },
      { src: '/screenshots/opdsy/08-downloads.jpg', alt: 'OPDSy downloads screen listing books and folders saved for offline reading' },
      { src: '/screenshots/opdsy/09-settings.jpg', alt: 'OPDSy settings screen with libraries, sync, downloads, audio, dictionary, appearance, e-reader, language and about' },
      { src: '/screenshots/opdsy/10-libraries.jpg', alt: 'OPDSy libraries screen listing connected OPDS servers that can be reordered, disabled or removed' },
      { src: '/screenshots/opdsy/10-1-edit-library.jpg', alt: 'OPDSy add library form with server type presets for Ubooquity, Komga, Kavita, Calibre-Web, BookOrbit, Grimmory and other OPDS servers' },
      { src: '/screenshots/opdsy/10-2-local-library.jpg', alt: 'OPDSy add local folder screen for reading files already on the device in place' },
      { src: '/screenshots/opdsy/11-audio.jpg', alt: 'OPDSy audio settings for read-aloud speed, pitch and offline or online voices' },
      { src: '/screenshots/opdsy/12-dictionary.jpg', alt: 'OPDSy dictionary settings with the offline English dictionary installed and looked-up words saved per book' },
      { src: '/screenshots/opdsy/13-sync.jpg', alt: 'OPDSy sync settings with toggles for reading progress, favourites, servers and encrypted server sign-ins' },
      { src: '/screenshots/opdsy/14-appearance.jpg', alt: 'OPDSy appearance settings with cover backdrops, backdrop parallax, card size and accent colour options' },
      { src: '/screenshots/opdsy/15-e-reader.jpg', alt: 'OPDSy e-reader settings for e-ink devices, with high-contrast mode, animations and volume key page turns' },
      { src: '/screenshots/opdsy/16-e-reader-high-contrast.jpg', alt: 'OPDSy e-reader settings with high-contrast mode turned on, showing the black-on-white theme and the choice of which volume key turns the page forward' },
    ],
    tabletScreenshots: [
      { src: '/screenshots/opdsy/tablet/1-home.jpg', alt: 'OPDSy on a tablet — home screen with continue reading and favourites' },
      { src: '/screenshots/opdsy/tablet/2-library.jpg', alt: 'OPDSy on a tablet — unified library browsing view' },
      { src: '/screenshots/opdsy/tablet/3-books.jpg', alt: 'OPDSy on a tablet — book list with cover art' },
      { src: '/screenshots/opdsy/tablet/3.5-book.jpg', alt: 'OPDSy on a tablet — ebook reader in a two-page layout with highlighting and audio' },
      { src: '/screenshots/opdsy/tablet/4-comics.jpg', alt: 'OPDSy on a tablet — comic reader in a two-page spread' },
      { src: '/screenshots/opdsy/tablet/5-downloads.jpg', alt: 'OPDSy on a tablet — offline downloads screen' },
      { src: '/screenshots/opdsy/tablet/6-settings.jpg', alt: 'OPDSy on a tablet — settings screen' },
      { src: '/screenshots/opdsy/tablet/7-libraries.jpg', alt: 'OPDSy on a tablet — connected OPDS servers list' },
      { src: '/screenshots/opdsy/tablet/8-sync.jpg', alt: 'OPDSy on a tablet — cross-device sync settings' },
    ],
    screenshotsCredit: [
      { text: 'Comic and book artwork shown is for demonstration only. ' },
      { text: 'Pepper&Carrot', href: 'https://www.peppercarrot.com/' },
      { text: ' is by ' },
      { text: 'David Revoy', href: 'https://www.davidrevoy.com/' },
      { text: ', licensed under ' },
      {
        text: 'CC BY 4.0',
        href: 'https://creativecommons.org/licenses/by/4.0/',
      },
      { text: '. Other comic covers are public-domain ' },
      {
        text: 'Golden Age comics',
        href: 'https://digitalcomicmuseum.com/',
      },
      { text: ', and book covers are public-domain literary classics.' },
    ],
    highlights: [
      {
        title: 'One library, local and self-hosted',
        description:
          'Most readers make you choose. OPDSy merges on-device folders with Komga, Kavita, Ubooquity, Calibre-Web, BookOrbit, Grimmory and any OPDS 1.2 / 2.0 source into a single unified home.',
      },
      {
        title: 'Private by design, zero tracking',
        description:
          'No account, no ads, no analytics and no tracking of any kind. Your reading is nobody’s business but yours.',
      },
      {
        title: 'One purchase, nothing held back',
        description:
          'Buy it once. No ads, no subscription, no in-app purchases and no pro tier — every feature, sync included, is there from the first launch.',
      },
      {
        title: 'Comics, books and audio',
        description:
          'Read comics and manga, ebooks in EPUB, MOBI, AZW3 and FB2, PDFs and Markdown — or have any book read aloud with text-to-speech.',
      },
      {
        title: 'An offline dictionary',
        description:
          'Tap Define on any word for its meaning, examples and synonyms without leaving the page. Dictionaries are downloaded on demand, and every lookup happens on your device.',
      },
      {
        title: 'The successor to Kuboo',
        description:
          'A resilient, multi-source reader rebuilt from the ground up for speed, reliability and privacy — and actively maintained.',
      },
    ],
    features: [
      {
        title: 'Your own files, no server needed',
        description:
          'Add any on-device folder as a local library — each with its own name and colour — and browse it alongside everything else. Or send a file to OPDSy from your file manager or any share sheet to open it straight in the reader.',
      },
      {
        title: 'One library, many sources',
        description:
          'Mix local folders with as many OPDS servers as you like — Komga, Kavita, Ubooquity, Calibre-Web, BookOrbit, Grimmory or any OPDS 1.2 / 2.0 source — merged into a single home, each tagged with a per-source colour badge.',
      },
      {
        title: 'Books and comics, any format',
        description:
          'Reads EPUB, MOBI, AZW3, FB2 and PDF ebooks, CBZ / CBR comics and manga, and Markdown documents (with Mermaid.js diagrams) — from your device or your servers.',
      },
      {
        title: 'A comic & manga reader',
        description:
          'Paged or continuous vertical-scroll (webtoon) reading, left-to-right or right-to-left direction, fit-to-screen or fit-to-width, landscape dual-page spreads, and double-tap or pinch to zoom.',
      },
      {
        title: 'Page streaming',
        description:
          'Comics on a server stream page-by-page over OPDS-PSE with smart prefetching, so the next page is ready before you swipe — no full archive download needed to start reading.',
      },
      {
        title: 'Built-in PDF & Markdown readers',
        description:
          'Read PDFs in-app with paged or vertical scrolling, fit-to-screen or fit-to-width, single- or two-page layouts, and pinch or double-tap zoom. Markdown renders cleanly, including Mermaid.js diagrams.',
      },
      {
        title: 'Jump straight to a page',
        description:
          'Drag the slider in the controls bar, or tap the page counter to type an exact page. Comics and PDFs also get a filmstrip of page thumbnails to flick through — whether the comic is streaming from a server or sitting on your device. Books list every chapter alongside the page box, and use the printed edition’s own page numbers where the file provides them, saying so plainly when they are only estimates. After a long jump, one tap takes you back.',
      },
      {
        title: 'Look up a word, offline',
        description:
          'Select a word in an ebook, or long-press one in a PDF, and tap Define for its senses, part of speech, examples and synonyms — without losing your place. Inflected forms are understood, so “running” finds “run”. Dictionaries are downloaded from Settings rather than bundled, each verified against a fingerprint built into the app, and words you look up collect in a per-book list you can switch off.',
      },
      {
        title: 'Listen with text-to-speech',
        description:
          'Have any ebook read aloud with your device’s text-to-speech engine — flowing sentence by sentence and continuing across chapters, with adjustable speed, pitch and choice of offline or online voices.',
      },
      {
        title: 'A proper reading experience',
        description:
          'Continue Reading remembers your place across every source, local or remote. Mark books and folders as favourites for one-tap access, track progress, and tune the ebook reader with adjustable fonts, line spacing and light, sepia or OLED-friendly dark themes.',
      },
      {
        title: 'Know what you have read',
        description:
          'Mark any book or comic read or unread from its long-press menu, including something you only part-read. Folders show a READ badge once everything inside them is finished, nested folders included — worked out from what the folder held last time you browsed it, so it costs no extra requests.',
      },
      {
        title: 'Highlights & bookmarks',
        description:
          'Select any passage to highlight it in one of five colours, attach a note, or copy and share the text — and bookmark a place in any book, PDF or comic. Everything lands in one list, and travels with you if you enable sync.',
      },
      {
        title: 'E-ink friendly',
        description:
          'A dedicated E-reader settings screen: independent toggles for a high-contrast black-on-white theme and for switching animations off, to avoid ghosting on slow-refresh screens such as Onyx Boox, plus volume keys that turn the page on devices with physical page buttons.',
      },
      {
        title: 'Read offline, anywhere',
        description:
          'Files in a local library are already offline, and anything on a server can be downloaded straight to your device. Interrupted downloads resume automatically and stay ready when you are.',
      },
      {
        title: 'Resilient by design',
        description:
          'Every source loads independently, so one offline, slow or broken server never crashes your library — and favourites, local files and recent items stay visible even when a server is temporarily down.',
      },
      {
        title: 'Secure credentials',
        description:
          'Server addresses, usernames and passwords are kept in your device’s secure storage (the Android Keystore) and excluded from persisted app state — never sent to Binary Meadow.',
      },
      {
        title: 'Private cross-device sync',
        description:
          'Optionally sync your library, favourites, reading progress, highlights and bookmarks through your own Google Drive — end-to-end encrypted with a passphrase-derived key, readable only on your devices.',
      },
      {
        title: 'Progress back to your server',
        description:
          'Separately, each remote library has a switch — off unless you turn it on — that publishes the page you reach as you read, so Komga’s own web UI and anything else signed in to it show the same place. The library screen reports whether it is actually working. Komga is the only OPDS server that accepts this today.',
      },
    ],
    comparison: {
      lead:
        'Android has plenty of good readers. Most of them, though, are built either for the files on your device or for a server — so a self-hoster ends up running two apps. Every cell below is taken from the app’s own website, store listing, documentation or source code; where we could not confirm something from one of those, it is marked unconfirmed rather than guessed.',
      columns: [
        {
          name: 'OPDSy',
          self: true,
          href: 'https://play.google.com/store/apps/details?id=com.opdsy',
        },
        { name: 'Moon+ Reader', href: 'https://www.moondownload.com/' },
        { name: 'KOReader', href: 'https://github.com/koreader/koreader' },
        { name: 'Librera', href: 'https://librera.mobi/' },
        { name: 'Mihon', href: 'https://mihon.app/' },
        { name: 'ReadEra', href: 'https://readera.org/' },
      ],
      rows: [
        {
          feature: 'Local files and OPDS servers in one merged library',
          cells: [
            { value: 'yes' },
            { value: 'no', note: 'Servers live in a separate Net Library' },
            { value: 'no', note: 'OPDS is a separate download browser' },
            { value: 'unknown', note: 'Only search and download documented' },
            { value: 'no', note: 'No OPDS support' },
            { value: 'no', note: 'No server support in the feature list' },
          ],
        },
        {
          feature: 'Connects to OPDS catalogues',
          cells: [
            { value: 'yes', note: 'OPDS 1.2 and 2.0' },
            { value: 'yes', note: 'Version not stated by the vendor' },
            { value: 'yes', note: 'Version not stated by the project' },
            { value: 'yes', note: 'Version not stated by the vendor' },
            { value: 'no', note: 'Uses its own extension sources' },
            { value: 'unknown', note: 'Not mentioned in the feature list' },
          ],
        },
        {
          feature: 'Page-by-page comic streaming (OPDS-PSE)',
          cells: [
            { value: 'yes' },
            { value: 'unknown', note: 'Not documented' },
            { value: 'yes', note: 'Page streaming in the OPDS plugin' },
            { value: 'unknown', note: 'Not documented' },
            { value: 'no', note: 'No OPDS support' },
            { value: 'unknown', note: 'Not documented' },
          ],
        },
        {
          feature: 'Reads both ebooks and comic archives',
          cells: [
            { value: 'yes', note: 'EPUB, PDF, CBZ, CBT; CBR and CB7 not supported' },
            { value: 'yes', note: 'EPUB, PDF, CBZ, CBR' },
            { value: 'yes', note: 'CBZ and CBT listed; CBR not listed' },
            { value: 'yes', note: 'EPUB, PDF, CBZ, CBR' },
            { value: 'no', note: 'Comics and manga only' },
            { value: 'yes', note: 'EPUB, PDF, CBZ, CBR' },
          ],
        },
        {
          feature: 'Text-to-speech',
          cells: [
            { value: 'yes' },
            { value: 'partial', note: 'Pro version only' },
            { value: 'unknown', note: 'Not in the project feature list' },
            { value: 'yes' },
            { value: 'no', note: 'Comics and manga only' },
            { value: 'partial', note: 'Premium version only' },
          ],
        },
        {
          feature: 'Cross-device sync, end-to-end encrypted',
          cells: [
            { value: 'yes', note: 'Your own Google Drive, encrypted' },
            { value: 'partial', note: 'Drive, Dropbox, WebDAV; no encryption claimed' },
            { value: 'partial', note: 'Progress sync; no encryption claimed' },
            { value: 'partial', note: 'Drive sync in PRO; no encryption claimed' },
            { value: 'partial', note: 'Manual backup files only' },
            { value: 'partial', note: 'Drive sync in Premium; no encryption claimed' },
          ],
        },
        {
          feature: 'No ads in any version',
          cells: [
            { value: 'yes' },
            { value: 'no', note: 'Ads in the free version' },
            { value: 'yes', note: 'No ad code in the source' },
            { value: 'no', note: 'Free version is ad-supported' },
            { value: 'yes', note: 'No ad code in the source' },
            { value: 'unknown', note: 'Not stated by the vendor' },
          ],
        },
        {
          feature: 'Every feature included, no locked tier',
          cells: [
            { value: 'yes', note: 'One-time purchase' },
            { value: 'partial', note: 'Pro unlock' },
            { value: 'yes', note: 'Free and open source' },
            { value: 'partial', note: 'PRO unlock' },
            { value: 'yes', note: 'Free and open source' },
            { value: 'partial', note: 'Premium unlock' },
          ],
        },
        {
          feature: 'No analytics or tracking',
          cells: [
            { value: 'yes' },
            {
              value: 'partial',
              note: 'Privacy policy lists Google Play Services and AdMob',
            },
            { value: 'yes', note: 'No analytics code in the source' },
            {
              value: 'no',
              note: 'Play data safety: name, email and user IDs shared for analytics or advertising',
            },
            { value: 'yes', note: 'No analytics code in the source' },
            {
              value: 'partial',
              note: 'Anonymous usage and crash data, not shared, can be turned off',
            },
          ],
        },
        {
          feature: 'Installable from Google Play',
          cells: [
            { value: 'yes' },
            { value: 'yes' },
            { value: 'no', note: 'F-Droid or APK' },
            { value: 'yes' },
            { value: 'no', note: 'APK only' },
            { value: 'yes' },
          ],
        },
        {
          feature: 'Released in the last twelve months',
          cells: [
            { value: 'yes' },
            { value: 'yes' },
            { value: 'yes' },
            { value: 'no', note: 'Project README says development is frozen' },
            { value: 'yes' },
            { value: 'yes', note: 'Play listing updated May 2026' },
          ],
        },
      ],
      note:
        'Compiled in August 2026 and updated in September 2026 from each app’s own website, Google Play listing, documentation or public source code — column headings link to the source we used. “Unconfirmed” means we could not verify it from one of those sources; it does not mean the feature is missing. Paid tiers change what an app can do, so rows are judged on the version named in the column. These are all good apps built by people who care; if anything here is out of date, tell us and we will correct it.',
    },
    serverStructures: {
      lead:
        'OPDSy shows you exactly what your server publishes — it does not invent a structure of its own. That means the shape of your library depends on which server you run, and the servers differ more than you might expect. Here is what each one puts on the Library screen, and where each entry leads.',
      termsExample: {
        caption:
          'Every server builds its catalogue from your folders. One folder becomes a series; one file inside it becomes a book.',
        lines: [
          '/comics                 the library root you give the server',
          '  Saga/                 a series — one folder',
          '    Saga #01.cbz        a book — one file',
          '    Saga #02.cbz',
          '  Monstress/            another series',
          '    Monstress #01.cbz',
        ],
      },
      terms: [
        {
          term: 'Library',
          definition:
            'A root folder you hand the server. Most people run one or two, and each has its own root that cannot overlap another.',
          example: 'Comics and Books, kept apart.',
        },
        {
          term: 'Series',
          definition:
            'One folder of related files. This is what you open to find something to read.',
          example: 'The Saga folder.',
        },
        {
          term: 'Book',
          definition:
            'One file. Servers use the same word for a single comic issue, a collected volume and a novel.',
          example: 'Saga #01.cbz.',
        },
        {
          term: 'Collection',
          definition:
            'A group of series you make yourself in the server’s web interface — never built from your folders. It can span libraries.',
          example: 'A Batman collection holding every Batman series.',
        },
        {
          term: 'Read list',
          definition:
            'A group of books you make yourself, in a running order, and it can cut across series. Think of it as a playlist for books.',
          example: 'Every book Wolverine turns up in.',
        },
      ],
      servers: [
        {
          name: 'Komga',
          href: 'https://komga.org/',
          summary:
            'Series-first. Komga groups your files into series, then books within them.',
          tiles: [
            { name: 'Keep Reading', shape: 'activity' },
            { name: 'On Deck', shape: 'activity' },
            {
              name: 'All series',
              shape: 'list',
              wayIn: true,
              path: ['A series', 'Its books'],
            },
            { name: 'Latest series', shape: 'list' },
            { name: 'Latest books', shape: 'list' },
            {
              name: 'All libraries',
              shape: 'menu',
              note: 'one per library you configured',
              wayIn: true,
              path: ['A library', 'Its series', 'Their books'],
            },
            {
              name: 'All collections',
              shape: 'user',
              path: ['A collection', 'Its series', 'Their books'],
            },
            { name: 'All read lists', shape: 'user' },
            { name: 'All publishers', shape: 'metadata' },
          ],
          caveat:
            'Collections are the one place any of these servers gives you a genuine third level. If you want a Series → Volume → Issue structure on your phone, a Komga collection is the way to get it.',
        },
        {
          name: 'Kavita',
          href: 'https://www.kavitareader.com/',
          summary:
            'Series-first, but it works out series from your file names rather than your folders.',
          tiles: [
            { name: 'On Deck', shape: 'activity' },
            { name: 'Recently Updated', shape: 'list' },
            { name: 'Recently Added', shape: 'list' },
            { name: 'Reading Lists', shape: 'user' },
            { name: 'Want to Read', shape: 'user' },
            {
              name: 'All Libraries',
              shape: 'menu',
              note: 'one per library you configured',
              wayIn: true,
              path: [
                'A library',
                'Its series',
                'Every issue in the series, in one flat list',
              ],
            },
            { name: 'All Collections', shape: 'user' },
          ],
          caveat:
            'If your series has volumes, that level does not survive. Kavita tracks volumes internally, but its OPDS feed hands out every issue in one flat list, with the volume left only as words in each issue’s title. No reader can restore a level the server never sends, so this is the same in every OPDS app, not just OPDSy.',
        },
        {
          name: 'Ubooquity',
          href: 'https://vaemendis.net/ubooquity/',
          summary:
            'Your folders, mirrored exactly. Nothing is inferred and nothing is flattened.',
          tiles: [
            {
              name: 'Comics — by folder',
              shape: 'menu',
              wayIn: true,
              path: ['Your comics folder', 'Your own sub-folders, all the way down'],
            },
            { name: 'Comics — latest', shape: 'list' },
            {
              name: 'Books — by folder',
              shape: 'menu',
              wayIn: true,
              path: ['Your books folder', 'Your own sub-folders, all the way down'],
            },
            { name: 'Books — latest', shape: 'list' },
          ],
          caveat:
            'The only server here with a separate way in for comics and for books, and the only one whose structure is simply the folder tree you already built. However deep you nested it, that is what you get.',
        },
        {
          name: 'Calibre-Web',
          href: 'https://github.com/janeczku/calibre-web',
          summary:
            'Book-first, with a lot of ways to slice the same shelf by metadata.',
          tiles: [
            {
              name: 'Alphabetical Books',
              shape: 'menu',
              note: 'one per initial letter',
              wayIn: true,
              path: ['A letter', 'The books themselves'],
            },
            { name: 'Hot Books', shape: 'activity', note: 'by download count' },
            { name: 'Top Rated Books', shape: 'metadata' },
            { name: 'Recently added Books', shape: 'list' },
            { name: 'Random Books', shape: 'list' },
            { name: 'Read Books', shape: 'activity' },
            { name: 'Unread Books', shape: 'list' },
            { name: 'Authors', shape: 'metadata' },
            { name: 'Publishers', shape: 'metadata' },
            { name: 'Categories', shape: 'metadata' },
            {
              name: 'Series',
              shape: 'metadata',
              path: ['A letter', 'A series', 'Its books'],
            },
            { name: 'Languages', shape: 'metadata' },
            { name: 'Ratings', shape: 'metadata' },
            { name: 'File formats', shape: 'metadata' },
            { name: 'Shelves', shape: 'user' },
          ],
          caveat:
            'The lettered route drops you straight onto books with no series level in between. Only the Series menu gives you a series to open.',
        },
        {
          name: 'BookOrbit',
          href: 'https://bookorbit.app/',
          summary: 'Book-first. Series is a label on a book rather than a place to visit.',
          tiles: [
            { name: 'All Books', shape: 'list', wayIn: true },
            { name: 'Recent Books', shape: 'list' },
            { name: 'Random Books', shape: 'list', note: 'reshuffled each time' },
            {
              name: 'Libraries',
              shape: 'menu',
              note: 'one per library you configured',
              wayIn: true,
              path: ['A library', 'The books themselves'],
            },
            { name: 'Collections', shape: 'user' },
            { name: 'SmartScopes', shape: 'user' },
            { name: 'Authors', shape: 'metadata' },
            {
              name: 'Series',
              shape: 'metadata',
              path: ['A series', 'Its books'],
            },
          ],
          caveat:
            'Opening a library lists books straight away, with no series level. As with Calibre-Web, the Series menu is the only route that gives you one.',
        },
        {
          name: 'Grimmory',
          href: 'https://grimmory.org/',
          summary:
            'Book-first, with the richest set of ready-made shelves of any server here.',
          tiles: [
            { name: 'All Books', shape: 'list', wayIn: true },
            { name: 'Recently Added', shape: 'list' },
            {
              name: 'Libraries',
              shape: 'menu',
              note: 'one per library you configured',
              wayIn: true,
              path: ['A library', 'The books themselves'],
            },
            { name: 'Shelves', shape: 'user' },
            {
              name: 'Magic Shelves',
              shape: 'user',
              note: 'filled by rules you set',
            },
            { name: 'Authors', shape: 'metadata' },
            {
              name: 'Series',
              shape: 'metadata',
              path: ['A series', 'Its books'],
            },
            { name: 'Surprise Me', shape: 'list', note: 'reshuffled each time' },
          ],
          caveat:
            'Grimmory has to be told to switch its OPDS server on, and it uses a separate set of OPDS accounts from your normal web login — so create one under its settings and use those details in OPDSy. Its Series menu is built from each book’s metadata rather than your folders, so it stays empty until your files carry a series name.',
        },
      ],
      note:
        'Last checked 20 August 2026. An empty entry is normal rather than a fault — reading lists, collections and shelves stay empty until you make one on the server, and the “continue reading” style entries fill up only as you read.',
    },
    faqs: [
      {
        question: 'Do I need a server to use OPDSy?',
        answer:
          'No. Add any folder on your device as a local library and read straight away, or open a file from your file manager or a share sheet. Servers are entirely optional — plenty of people use OPDSy purely as a local reader.',
      },
      {
        question: 'Which servers does OPDSy work with?',
        answer:
          'Komga, Kavita, Ubooquity, Calibre-Web, BookOrbit and Grimmory are all supported, along with any other server that speaks OPDS 1.2 or OPDS 2.0. Comic page streaming uses OPDS-PSE where your server offers it.',
      },
      {
        question: 'Can I use local files and servers at the same time?',
        answer:
          'Yes — that is the point of OPDSy. On-device folders and every connected server are merged into one library, each source tagged with its own colour badge, and Continue Reading, favourites and search all work across the lot.',
      },
      {
        question: 'My server is on my home network — will it work away from home?',
        answer:
          'OPDSy connects to whatever address you give it, so it works anywhere that address is reachable. At home a local address such as http://192.168.1.10:8080 is fine. Away from home you will need your server reachable from the internet — most people use a VPN such as Tailscale or WireGuard, or a reverse proxy with HTTPS. OPDSy does not proxy anything through us.',
      },
      {
        question: 'Does OPDSy support HTTPS, self-signed certificates and reverse proxies?',
        answer:
          'HTTPS and standard reverse-proxy setups work normally, including servers hosted on a subpath. Enter the full base URL of your OPDS feed, including any port or path. Certificates must be trusted by Android, so if you use a self-signed or private CA certificate, install it in your device’s user certificate store first.',
      },
      {
        question: 'How does OPDSy authenticate to my server?',
        answer:
          'HTTP Basic authentication, as used by Komga, Kavita, Ubooquity and Calibre-Web. Your server address, username and password are stored in the Android Keystore, kept out of persisted app state, and never sent to Binary Meadow.',
      },
      {
        question: 'A server is down or slow — does the whole library break?',
        answer:
          'No. Every source loads independently, so one offline, slow or misconfigured server never takes the library down with it. Your local files, favourites and recent items stay visible while it is unavailable.',
      },
      {
        question: 'Which files can I read, and where do local libraries come from?',
        answer:
          'EPUB, MOBI, AZW3, FB2, PDF and Markdown (including Mermaid.js diagrams) for books, and CBZ and CBR for comics and manga. A local library is any folder you pick on internal storage or an SD card, and OPDSy reads only the folders you choose.',
      },
      {
        question: 'Can I read offline?',
        answer:
          'Yes. Files in a local library are already offline, and anything on a server can be downloaded to your device — interrupted downloads resume by themselves.',
      },
      {
        question: 'How much does OPDSy cost?',
        answer:
          'OPDSy is a one-time purchase on Google Play — buy it once and it is yours on every Android device signed in to that Google account. There is no subscription, there are no in-app purchases or ads, and every feature, including encrypted sync, is included. The Play listing shows the current price in your own currency.',
      },
      {
        question: 'How does sync work, and can Binary Meadow see my library?',
        answer:
          'Sync is optional. If you turn it on, your library, favourites, reading progress, highlights and bookmarks are encrypted on your device with a passphrase-derived key and stored in a hidden, app-private folder of your own Google Drive. Only a device holding your passphrase can read it — neither Binary Meadow nor Google can.',
      },
      {
        question: 'Does the dictionary send my lookups anywhere?',
        answer:
          'No. Dictionaries are downloaded once from Settings and then searched entirely on your device, so a word you look up never leaves your phone — and lookups keep working with no connection at all. Each dictionary file is checked against a fingerprint built into the app before it is installed, so a modified or substituted file is refused.',
      },
      {
        question: 'What is the difference between syncing to Google Drive and syncing to my server?',
        answer:
          'They are separate, and you can use either, both or neither. Google Drive sync carries your servers, favourites, reading progress and annotations between your own devices, end-to-end encrypted. Server-side sync instead publishes the page you reach back to the library itself, so its web UI and any other client show the same place — useful if you also read in a browser. Komga is the only OPDS server that accepts this today, and it is off unless you turn it on per library.',
      },
      {
        question: 'Does OPDSy work on e-ink devices and tablets?',
        answer:
          'Yes. A dedicated E-reader settings screen gathers independent toggles for a high-contrast black-on-white theme and for switching animations off, to avoid ghosting on slow-refresh screens such as Onyx Boox, along with volume-key page turns for devices with physical page buttons. Tablets get two-page spreads for both books and comics.',
      },
    ],
    privacy: {
      updated: '25 June 2026',
      summary:
        'OPDSy reads files on your own device and connects only to the self-hosted servers you configure. It has no Binary Meadow account and no analytics, and optional cross-device sync is end-to-end encrypted inside your own Google Drive — so we never see your library, reading activity or credentials.',
      collectsPersonalData: false,
      dataHandling: [
        {
          title: 'Server credentials',
          description:
            'The addresses, usernames and passwords for your OPDS servers are kept in your device’s secure storage (the Android Keystore) and excluded from persisted app state. They are used only to connect to the servers you choose and are never sent to Binary Meadow.',
        },
        {
          title: 'Your library content',
          description:
            'Files you add from your device stay on your device and are never uploaded. Books and comics on a server are streamed directly between your device and your own server. Binary Meadow has no access to your library, reading activity, or the content you view.',
        },
        {
          title: 'Cross-device sync (optional)',
          description:
            'If you turn on sync, your library, favourites and reading progress — and, only if you opt in, your server credentials — are packaged into a single file, end-to-end encrypted on your device with a passphrase-derived key (AES-256-GCM), and stored in a hidden, app-private folder of your own Google Drive. Neither Binary Meadow nor Google can read its contents; only a device holding your passphrase can decrypt it. You can turn sync off and remove the file at any time.',
        },
        {
          title: 'No account or profile',
          description:
            'OPDSy requires no Binary Meadow account. If you use sync you sign in with your own Google account solely to access your Drive’s app folder. We do not collect your name, email, or location, and we build no profile of you.',
        },
        {
          title: 'No analytics or tracking',
          description:
            'OPDSy does not embed advertising SDKs or third-party analytics and does not track you across other apps or websites.',
        },
      ],
      thirdParties: [
        'Your self-hosted OPDS servers (e.g. Ubooquity, Komga, Kavita) — contacted only with the details you provide, under their own policies.',
        'Google Drive — used only if you enable cross-device sync, to store an end-to-end-encrypted copy of your data in a hidden, app-private folder of your own Google account. OPDSy requests only the app-data scope (drive.appdata) and cannot see any of your other Drive files.',
        'Google Play — distributes the app and processes installs under its own privacy policy.',
      ],
      childrenNote:
        'OPDSy is suitable for all ages and can be used in a family or children’s setting. As it displays only the files and servers you configure, the person setting those up controls what is available — so we recommend that a parent or guardian chooses appropriate folders and sources for younger users.',
    },
  },
  {
    slug: 'gridwatch',
    name: 'GridWatch',
    tagline: 'See every AI-assisted session.',
    summary:
      'A retro-Tron-themed desktop dashboard that turns your local GitHub Copilot CLI session data into a real-time control panel.',
    description:
      'GridWatch reads the local session data written by GitHub Copilot CLI and presents it as a beautiful, real-time dashboard — giving you visibility into your AI-assisted workflow across every project you work on.\n\nBrowse sessions with live status and token usage, read full prompt history, track context compaction, explore an interactive skills graph, and manage your MCP and LSP servers — all from one control panel.\n\nEverything runs locally on your machine, wrapped in a neon retro-Tron aesthetic. Optional AI Insights analyse your sessions using an AI provider you configure with your own API key.',
    category: 'Developer Tools',
    icon: '/apps/gridwatch.png',
    platforms: ['macos', 'windows'],
    accent: '#00b8d4',
    repository: 'https://github.com/binarymeadow/gridwatch',
    downloads: [
      {
        label: 'Download for macOS',
        href: 'https://github.com/binarymeadow/gridwatch/releases/latest',
        platform: 'macos',
      },
      {
        label: 'Download for Windows',
        href: 'https://github.com/binarymeadow/gridwatch/releases/latest',
        platform: 'windows',
      },
    ],
    techStack: ['Electron', 'React', 'TypeScript', 'React Flow'],
    highlights: [
      {
        title: 'Everything runs locally',
        description:
          'GridWatch reads your Copilot CLI data on your own machine. Nothing is sent to us — optional AI Insights run only with a provider you configure.',
      },
      {
        title: 'See every session',
        description:
          'Live status, token usage, prompt history and full-text search across every Copilot CLI session and project.',
      },
      {
        title: 'Understand your skills',
        description:
          'An interactive graph of how your skills and agents connect, plus a builder for orchestrator workflows.',
      },
      {
        title: 'Retro-Tron control panel',
        description:
          'Neon cyan, electric blue and orange on near-black — a dashboard that’s as good to look at as it is to use.',
      },
    ],
    features: [
      {
        title: 'Sessions overview',
        description:
          'Browse every Copilot CLI session with live status, token utilisation and last prompt, paginated for fast loading.',
      },
      {
        title: 'Search, filtering & tagging',
        description:
          'Full-text search, multi-select tag filters and a session-type filter, plus custom tags and directory-based auto-tag rules.',
      },
      {
        title: 'Session type detection',
        description:
          'Automatically identifies research and code-review sessions with distinct badges by detecting the agents Copilot used.',
      },
      {
        title: 'Prompt & token history',
        description:
          'Read every user message from a session, and track peak context-window usage over time with charts that survive Copilot’s log pruning.',
      },
      {
        title: 'Compaction tracking',
        description:
          'See when Copilot compacts the conversation — trigger utilisation, messages replaced and tokens saved — with an inline checkpoint viewer.',
      },
      {
        title: 'Skills management',
        description:
          'Browse, create, edit, duplicate, delete, import, export, tag and toggle your Copilot CLI skills, with a Tron-themed markdown viewer.',
      },
      {
        title: 'Skills graph & orchestrator builder',
        description:
          'An interactive React Flow map of skill and agent relationships, with an edit mode to compose sequential or parallel orchestrator workflows that generate runnable SKILL.md blocks.',
      },
      {
        title: 'MCP & LSP dashboards',
        description:
          'Inspect and enable/disable Model Context Protocol and Language Server Protocol servers, browse live tool catalogues, and tame context-window bloat.',
      },
      {
        title: 'Agents panel',
        description:
          'View built-in and custom Copilot agents with per-agent session counts, usage stats and linked session history.',
      },
      {
        title: 'Activity & AI Insights',
        description:
          'A GitHub-style 52-week activity heatmap, plus optional OpenAI-powered prompt-quality scoring and improvement suggestions.',
      },
      {
        title: 'Manage & stay current',
        description:
          'Rename, archive or safely delete sessions, reveal reports and files in Finder or Explorer, with update notifications and 30-second auto-refresh.',
      },
    ],
    screenshots: [
      { src: '/screenshots/gridwatch/sessions.png', alt: 'GridWatch sessions overview' },
      { src: '/screenshots/gridwatch/tokens.png', alt: 'GridWatch token usage graphs' },
      { src: '/screenshots/gridwatch/skills-graph.png', alt: 'GridWatch interactive skills graph' },
      { src: '/screenshots/gridwatch/agents.png', alt: 'GridWatch agents panel' },
      { src: '/screenshots/gridwatch/mcp.png', alt: 'GridWatch MCP server dashboard' },
      { src: '/screenshots/gridwatch/activity.png', alt: 'GridWatch activity heatmap' },
    ],
    privacy: {
      updated: '25 June 2026',
      summary:
        'GridWatch reads your local GitHub Copilot CLI session data on your own machine. Nothing is sent to us; optional AI Insights runs only with a provider you configure.',
      collectsPersonalData: false,
      dataHandling: [
        {
          title: 'Local session data',
          description:
            'GridWatch reads the session files that GitHub Copilot CLI writes on your computer and displays them in the dashboard. This data stays on your machine and is never transmitted to Binary Meadow.',
        },
        {
          title: 'Optional AI Insights',
          description:
            'If you enable AI Insights, session content you choose to analyse is sent to the AI provider you configure using your own API key. This happens only on your explicit action; disable the feature and no data leaves your device.',
        },
        {
          title: 'No account or telemetry',
          description:
            'GridWatch needs no Binary Meadow account and includes no advertising SDKs or third-party usage analytics. We do not collect your name, email, or a profile of your activity.',
        },
      ],
      thirdParties: [
        'GitHub Releases — distributes the desktop app under GitHub’s privacy policy.',
        'Your chosen AI provider — contacted only when you enable AI Insights, using your own API key and under that provider’s policy.',
      ],
      childrenNote:
        'GridWatch is a developer tool intended for adults. It collects no personal data from any user, including children — all session data stays on your own device and is never sent to us.',
    },
  },
  {
    slug: 'spinely',
    name: 'Spinely',
    tagline: 'Scan spines, sort & visualise your shelves.',
    summary:
      'An Android-first bookshelf organiser that scans book spines, sorts your collection and turns your physical shelves into an interactive visual layout.',
    description:
      'Spinely helps you organise the physical bookshelves you already own.\n\nDefine your bookcases and shelves, then log books by scanning their ISBN barcode — with a manual search fallback — and photograph and crop each book’s spine. Choose how to organise (by author, colour, category and more) and get a beautiful, interactive visual shelf.\n\nWhen a shelf overflows, drag the pin inward to set its cut-off: overflow books grey out and flow to the next shelf, committed with a simple confirmation. Everything is local-only — your library stays on your device.',
    category: 'Books & Reference',
    icon: '/apps/spinely.png',
    featureGraphic: '/apps/spinely-feature.png?v=2',
    platforms: ['android'],
    accent: '#8a5a2b',
    crossPromo: 'opdsy',
    downloads: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.spinely',
        platform: 'android',
      },
    ],
    techStack: ['Expo SDK 56', 'React Native', 'TypeScript', 'TanStack Query'],
    highlights: [
      {
        title: 'Scan & catalogue in seconds',
        description:
          'Log books by scanning their ISBN barcode, with automatic metadata lookup and a manual search fallback when you need it.',
      },
      {
        title: 'Your shelves, visualised',
        description:
          'Photograph and crop each book’s spine to build an interactive, true-to-life visual layout of your bookcases.',
      },
      {
        title: 'Private & local-only',
        description:
          'No account and no tracking — your library, spines and layout stay on your device.',
      },
    ],
    features: [
      {
        title: 'Bookcases & shelves',
        description:
          'Define your real bookcases and shelves, then arrange your collection to match the room in front of you.',
      },
      {
        title: 'Barcode scanning & metadata',
        description:
          'Scan an ISBN to pull in book metadata from Open Library and Google Books, with a manual search fallback.',
      },
      {
        title: 'Spine capture & crop',
        description:
          'Photograph each book’s spine and crop it precisely, then tag its dominant colour for colour-based sorting.',
      },
      {
        title: 'Flexible organisation',
        description:
          'Sort and distribute your books by author, colour, category and more, with an engine that lays them out across your shelves.',
      },
      {
        title: 'Interactive visual shelf',
        description:
          'Browse a beautiful, true-to-scale representation of your bookcases built from your own spine photos.',
      },
      {
        title: 'Draggable overflow pin',
        description:
          'When a shelf fills up, drag the pin inward to set its cut-off — overflow books grey out and flow to the next shelf, committed with a confirmation.',
      },
    ],
    screenshots: [
      { src: '/screenshots/spinely/1-shelves.jpg', alt: 'Spinely bookcases overview with an interactive visual shelf' },
      { src: '/screenshots/spinely/1.1-shelves.jpg', alt: 'Spinely interactive visual shelf built from real book spine photos, organised by author' },
      { src: '/screenshots/spinely/1.2-shelf-order.jpg', alt: 'Spinely organise screen stacking sort facets like author, series and spine colour with a live order preview' },
      { src: '/screenshots/spinely/2-shelf-detail.jpg?v=2', alt: 'Spinely bookcase detail with organise, add books and fit options' },
      { src: '/screenshots/spinely/3-library.jpg', alt: 'Spinely library of logged books with search and filters' },
      { src: '/screenshots/spinely/4-log-book.jpg', alt: 'Spinely log a book screen with barcode scan, ISBN and search' },
      { src: '/screenshots/spinely/5-book-detail.jpg', alt: 'Spinely edit book screen with cover, title, authors and categories' },
      { src: '/screenshots/spinely/6-book-spine.jpg?v=2', alt: 'Spinely book detail with captured spine photo and tagged colour' },
      { src: '/screenshots/spinely/7-edit-book-spine.jpg', alt: 'Spinely spine colour picker for colour-based shelf sorting' },
      { src: '/screenshots/spinely/8-settings.jpg', alt: 'Spinely settings screen with library stats and preferred language' },
    ],
    privacy: {
      updated: '25 June 2026',
      summary:
        'Spinely is local-first. Your bookcases, books and spine photos stay on your device and are never sent to us.',
      collectsPersonalData: false,
      dataHandling: [
        {
          title: 'Library & spine photos',
          description:
            'Your bookcases, shelves, logged books and the spine photos you capture are stored locally on your device. They are not transmitted to Binary Meadow or any third party.',
        },
        {
          title: 'No account required',
          description:
            'The app works without sign-in. We do not ask for your name, email, phone number or location, and we do not build a profile of you.',
        },
        {
          title: 'No analytics or tracking',
          description:
            'Spinely does not embed advertising SDKs or third-party analytics, and does not track your activity across other apps or websites.',
        },
      ],
      thirdParties: [
        'Open Library — queried to look up book metadata from an ISBN, under its own privacy policy.',
        'Google Books — queried to look up book metadata from an ISBN, under Google’s privacy policy.',
        'Google Play — distributes the app and processes installs under its own privacy policy.',
      ],
      childrenNote:
        'Spinely is a family-friendly app suitable for all ages. Because it is local-first and collects no personal data, it can be used safely by children as well as adults.',
    },
  },
  {
    slug: 'storyrunner',
    name: 'StoryRunner',
    tagline: 'Every run is a chapter.',
    summary:
      'A GPS running app that turns each run into an episode of an unfolding story, with a route generated to fit the distance you have time for.',
    description:
      'StoryRunner is a running app for people who find running boring.\n\nEach week brings a new episode: a short story, a quest, and a route generated to fit the distance and time you actually have. Narration is triggered by where you are, not by a stopwatch — reach the old signal box and the next scene plays, so the story and the ground move together.\n\nUnderneath it is a straightforward run tracker: route map, distance, pace, duration and steps. The story is the reason to go out; the tracking is what you keep afterwards.\n\nIt runs entirely on your device. There are no accounts, no analytics and no advertising, and your route history is never sent to us.',
    category: 'Health & Fitness',
    icon: '/apps/storyrunner.png',
    platforms: ['android'],
    accent: '#E8A33D',
    downloads: [],
    pricing: {
      label: 'Free to install · Subscription unlocks campaigns',
      detail:
        'StoryRunner is in internal testing and is not yet on Google Play. When it launches, the app and its run tracking will be free; a subscription unlocks the ongoing story campaigns.',
      free: true,
    },
    techStack: [
      'Expo SDK 57',
      'React Native',
      'TypeScript',
      'Expo Router',
      'OpenStreetMap',
    ],
    highlights: [
      {
        title: 'A reason to go out',
        description:
          'A new episode each week, with a quest to finish rather than a number to beat. The story only advances when you run.',
      },
      {
        title: 'Routes that fit your run',
        description:
          'Tell it how far you want to go and it builds a loop from where you are standing — no planning, no driving somewhere first.',
      },
      {
        title: 'Narration tied to place',
        description:
          'Scenes are triggered by reaching a point on the route, not by elapsed time, so the story stays in step with the ground under your feet.',
      },
      {
        title: 'Private by construction',
        description:
          'No account, no analytics, no ads. Your runs are stored on your phone and never sent to us — and privacy zones strip your home from anything you share.',
      },
    ],
    features: [
      {
        title: 'Weekly story episodes',
        description:
          'Each episode is a self-contained quest with its own narration, objectives and payoff, delivered as content rather than shipped in an app update.',
      },
      {
        title: 'Full run tracking',
        description:
          'Route map, distance, pace, duration and step count, recorded in the background with the screen locked and your phone in a pocket.',
      },
      {
        title: 'Generated routes',
        description:
          'Loops built to a target distance from your current position, so a 5K is a 5K whether you are at home or away.',
      },
      {
        title: 'Location-triggered audio',
        description:
          'Narration plays when you arrive somewhere, queued so scenes never overlap or talk over one another.',
      },
      {
        title: 'Privacy zones',
        description:
          'Define an area around your home and every point inside it is removed from anything you share — not nudged to the edge, which would still point at your door.',
      },
      {
        title: 'Works without signal',
        description:
          'Episodes and their audio are downloaded ahead of the run, so the story keeps going where the mobile signal does not.',
      },
    ],
    screenshots: [],
    faqs: [
      {
        question: 'Do I have to pay to use StoryRunner?',
        answer:
          'No. The app is free to install and the run tracking — route map, distance, pace, duration and steps — is free to use. A subscription unlocks the ongoing story campaigns.',
      },
      {
        question: 'Does it work without a phone signal?',
        answer:
          'Yes. Episodes and their narration are downloaded before you set off, and GPS does not need a data connection, so a run in a signal blackspot works normally. Only the map imagery needs the internet.',
      },
      {
        question: 'Does it keep tracking when my phone is locked?',
        answer:
          'Yes. StoryRunner records in the background so you can run with the phone in a pocket. Tracking only happens during a run you started yourself, and a notification is shown the whole time it is active.',
      },
      {
        question: 'Where is my run data stored?',
        answer:
          'On your phone. There are no accounts and no server of ours that receives your runs, so your route history is not something we can see. Uninstalling the app deletes it.',
      },
      {
        question: 'Can I stop it revealing where I live?',
        answer:
          'Yes. Privacy zones let you mark an area such as your home, and every recorded point inside it is removed from anything you share. Your distance and time still count the full run.',
      },
      {
        question: 'Do I need a running watch?',
        answer:
          'No. StoryRunner uses your phone\u2019s GPS and step counter, so a phone and a pair of headphones is the whole kit.',
      },
    ],
    privacy: {
      updated: '26 August 2026',
      summary:
        'StoryRunner records your runs on your phone. There are no accounts, no servers of ours, no analytics and no advertising — your route data never leaves your device unless you deliberately share it.',
      collectsPersonalData: false,
      dataHandling: [
        {
          title: 'Location, including in the background',
          description:
            'Precise GPS location is recorded to draw your route, calculate distance and pace, and trigger story audio at points along the way. Background access exists so a run continues with the phone locked and in a pocket, which is how running is physically done. Location is only collected during a run you started yourself, a persistent notification is shown for the entire time tracking is active, and collection stops when you end the run. It is stored on your device and is not transmitted to us.',
        },
        {
          title: 'Activity and run history',
          description:
            'Step count, run history, settings and quest progress are held in the app\u2019s private storage on your device. Uninstalling StoryRunner deletes all of it.',
        },
        {
          title: 'No account required',
          description:
            'The app works without sign-in. We do not ask for your name, email or phone number, and we do not build a profile of you.',
        },
        {
          title: 'No analytics or tracking',
          description:
            'StoryRunner does not embed advertising SDKs, analytics or crash-reporting services, and does not track your activity across other apps or websites.',
        },
        {
          title: 'Privacy zones',
          description:
            'Because a GPS track is effectively a map of where you live, you can define privacy zones around places such as your home. When you share or export a run, every point inside a zone is removed entirely — not moved to the zone edge, which would leave the direction of travel pointing at your front door. Distance and time are still calculated from the full track, so you keep credit for the whole run.',
        },
        {
          title: 'Map tiles are the one thing that reaches the internet',
          description:
            'To draw a map beneath your route the app downloads map imagery, which necessarily reveals your IP address and which part of the map is being displayed to the tile provider. They do not receive your recorded track, your identity, or any identifier we assign. If you would rather not make those requests, do not open the map view.',
        },
      ],
      thirdParties: [
        'OpenStreetMap — supplies the map imagery drawn beneath your route, under its own privacy policy. Map data is © OpenStreetMap contributors, licensed under the Open Database Licence.',
        'Google Play — distributes the app and processes installs and subscription payments under its own privacy policy. We never receive or store your payment details.',
      ],
      childrenNote:
        'StoryRunner is not directed at children and we do not knowingly collect data from children. Because the app holds no personal data on any server, we hold no children\u2019s data.',
    },
  },
];

export function getApp(slug: string): App | undefined {
  return apps.find((a) => a.slug === slug);
}
