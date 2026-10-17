export interface Source {
  title: string;
  href: string;
}

export const sources = {
  opds12: {
    title: 'OPDS Catalog 1.2 specification',
    href: 'https://specs.opds.io/opds-1.2',
  },
  opds2: {
    title: 'OPDS Catalog 2.0 specification',
    href: 'https://specs.opds.io/opds-2.0',
  },
  pse12: {
    title: 'OPDS Page Streaming Extension 1.2 specification',
    href: 'https://anansi-project.github.io/docs/opds-pse/specs/v1.2',
  },
  pseIntro: {
    title: 'OPDS-PSE introduction and history (Anansi Project)',
    href: 'https://anansi-project.github.io/docs/opds-pse/intro',
  },
  pseOriginal: {
    title: 'Original OPDS-PSE 1.0 specification',
    href: 'https://vaemendis.net/opds-pse/',
  },
  komgaIntro: {
    title: 'Komga: introduction and supported formats',
    href: 'https://komga.org/docs/introduction/',
  },
  komgaOpds: {
    title: 'Komga: OPDS guide',
    href: 'https://komga.org/docs/guides/opds/',
  },
  komgaScan: {
    title: 'Komga: scanning, analysis and metadata',
    href: 'https://komga.org/docs/guides/scan-analysis-refresh/',
  },
  komgaProgress: {
    title: 'Komga: read progress guide',
    href: 'https://komga.org/docs/guides/read-progress/',
  },
  komgaRelease: {
    title: 'Komga 1.29.1 release',
    href: 'https://github.com/gotson/komga/releases/tag/1.29.1',
  },
  kavitaReadme: {
    title: 'Kavita: official README',
    href: 'https://github.com/Kareadita/Kavita',
  },
  kavitaOpds: {
    title: 'Kavita: OPDS guide',
    href: 'https://wiki.kavitareader.com/guides/features/opds/',
  },
  kavitaScanner: {
    title: 'Kavita: scanner guide',
    href: 'https://wiki.kavitareader.com/guides/scanner/',
  },
  kavitaPageStream: {
    title: 'Kavita v0.9.1.4: OPDS page streaming saves reading progress',
    href: 'https://github.com/Kareadita/Kavita/blob/v0.9.1.4/Kavita.Server/Controllers/OPDSController.cs#L689-L735',
  },
  grimmoryOpdsController: {
    title: 'Grimmory v3.5.0: OPDS controller (Atom feeds and entry points)',
    href: 'https://github.com/grimmory-tools/grimmory/blob/v3.5.0/backend/src/main/java/org/booklore/controller/OpdsController.java#L33-L180',
  },
  opdsyPlay: {
    title: 'OPDSy on Google Play',
    href: 'https://play.google.com/store/apps/details?id=com.opdsy',
  },
  kavitaSource: {
    title: 'Kavita v0.9.1.4: OPDS service source',
    href: 'https://github.com/Kareadita/Kavita/blob/v0.9.1.4/Kavita.Services/OpdsService.cs',
  },
  kavitaDocker: {
    title: 'Kavita: Docker installation',
    href: 'https://wiki.kavitareader.com/installation/docker/dockerhub/',
  },
  kavitaRelease: {
    title: 'Kavita v0.9.1.4 release',
    href: 'https://github.com/Kareadita/Kavita/releases/tag/v0.9.1.4',
  },
  ubooquitySite: {
    title: 'Ubooquity: official site',
    href: 'https://vaemendis.net/ubooquity/',
  },
  ubooquityInstall: {
    title: 'Ubooquity: installation guide',
    href: 'https://vaemendis.github.io/ubooquity-doc/pages/installation-guide.html',
  },
  ubooquityManual: {
    title: 'Ubooquity: user manual',
    href: 'https://vaemendis.github.io/ubooquity-doc/pages/manual.html',
  },
  ubooquityFaq: {
    title: 'Ubooquity: FAQ',
    href: 'https://vaemendis.github.io/ubooquity-doc/pages/faq.html',
  },
  ubooquityDownload: {
    title: 'Ubooquity: download page',
    href: 'https://vaemendis.net/ubooquity/static2/download',
  },
  calibreWebReadme: {
    title: 'Calibre-Web: official README',
    href: 'https://github.com/janeczku/calibre-web',
  },
  calibreWebFeed: {
    title: 'Calibre-Web: OPDS feed template source',
    href: 'https://github.com/janeczku/calibre-web/blob/6e840acbda8d62fdd159bf3855c01872d629a914/cps/templates/feed.xml',
  },
  calibreWebOpds: {
    title: 'Calibre-Web: OPDS routes source',
    href: 'https://github.com/janeczku/calibre-web/blob/6e840acbda8d62fdd159bf3855c01872d629a914/cps/opds.py',
  },
  calibreWebFormats: {
    title: 'Calibre-Web: supported upload formats source',
    href: 'https://github.com/janeczku/calibre-web/blob/6e840acbda8d62fdd159bf3855c01872d629a914/cps/constants.py#L150-L157',
  },
  calibreWebRelease: {
    title: 'Calibre-Web 0.6.27 release',
    href: 'https://github.com/janeczku/calibre-web/releases/tag/0.6.27',
  },
  bookOrbitAbout: {
    title: 'BookOrbit: what is BookOrbit?',
    href: 'https://bookorbit.app/what-is-bookorbit/',
  },
  bookOrbitOpds: {
    title: 'BookOrbit: OPDS guide',
    href: 'https://bookorbit.app/opds/',
  },
  bookOrbitFeed: {
    title: 'BookOrbit v3.4.0: OPDS feed builder source',
    href: 'https://github.com/bookorbit/bookorbit/blob/v3.4.0/server/src/modules/opds/opds.service.ts#L165-L253',
  },
  bookOrbitKoreader: {
    title: 'BookOrbit: KOReader sync guide',
    href: 'https://bookorbit.app/koreader/',
  },
  bookOrbitInstall: {
    title: 'BookOrbit: installation guide',
    href: 'https://bookorbit.app/installation/',
  },
  bookOrbitRelease: {
    title: 'BookOrbit v3.4.0 release',
    href: 'https://github.com/bookorbit/bookorbit/releases/tag/v3.4.0',
  },
  grimmoryStart: {
    title: 'Grimmory: getting started',
    href: 'https://grimmory.org/docs/getting-started/',
  },
  grimmoryOpds: {
    title: 'Grimmory: OPDS and Komga API guide',
    href: 'https://grimmory.org/docs/integration/opds/',
  },
  grimmoryFeed: {
    title: 'Grimmory v3.5.0: OPDS feed service source',
    href: 'https://github.com/grimmory-tools/grimmory/blob/v3.5.0/backend/src/main/java/org/booklore/service/opds/OpdsFeedService.java#L608-L755',
  },
  grimmoryKoreader: {
    title: 'Grimmory: KOReader sync guide',
    href: 'https://grimmory.org/docs/integration/koreader/',
  },
  grimmoryRepo: {
    title: 'Grimmory: official repository',
    href: 'https://github.com/grimmory-tools/grimmory',
  },
  grimmoryRelease: {
    title: 'Grimmory v3.5.0 release',
    href: 'https://github.com/grimmory-tools/grimmory/releases/tag/v3.5.0',
  },
  lazyIntro: {
    title: 'LazyLibrarian: official introduction',
    href: 'https://lazylibrarian.gitlab.io/',
  },
  lazyOpds: {
    title: 'LazyLibrarian: OPDS guide',
    href: 'https://lazylibrarian.gitlab.io/opds/',
  },
  lazyConfig: {
    title: 'LazyLibrarian: interface configuration',
    href: 'https://lazylibrarian.gitlab.io/config_interface/',
  },
  lazySource: {
    title: 'LazyLibrarian: OPDS catalogue source',
    href: 'https://gitlab.com/LazyLibrarian/LazyLibrarian/-/blob/754d0eb68d0c129798dc7ab8f17d22a1b81aa7b6/lazylibrarian/opds.py',
  },
  lazyComics: {
    title: 'LazyLibrarian: Comics and Recent Comics OPDS feeds',
    href: 'https://gitlab.com/LazyLibrarian/LazyLibrarian/-/blob/754d0eb68d0c129798dc7ab8f17d22a1b81aa7b6/lazylibrarian/opds.py#L210-221',
  },
  lazyDefaults: {
    title: 'LazyLibrarian: default configuration source',
    href: 'https://gitlab.com/LazyLibrarian/LazyLibrarian/-/blob/master/lazylibrarian/configdefs.py',
  },
  lazyInstall: {
    title: 'LazyLibrarian: installation guide',
    href: 'https://lazylibrarian.gitlab.io/install/',
  },
  lazyCommits: {
    title: 'LazyLibrarian: commit history',
    href: 'https://gitlab.com/LazyLibrarian/LazyLibrarian/-/commits/master',
  },
  opdsyFeatures: {
    title: 'OPDSy: features',
    href: '/apps/opdsy/#features',
  },
  opdsyServers: {
    title: 'OPDSy: your library, server by server',
    href: 'https://www.binarymeadow.com/apps/opdsy/#servers',
  },
  opdsyFaq: {
    title: 'OPDSy: frequently asked questions',
    href: '/apps/opdsy/#faq',
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;
