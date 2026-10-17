export interface Article {
  slug: string;
  title: string;
  description: string;
  published: string;
}

export const opdsServersArticle: Article = {
  slug: 'best-opds-servers',
  title: 'Best OPDS Servers: An Honest Self-Hosted Comparison',
  description:
    'An honest comparison of seven self-hosted OPDS servers: comics, audiobooks, OPDS-PSE page streaming, OPDS 2.0, reading sync and how each organises your library.',
  published: '2026-10-17',
};

export const articles: Article[] = [opdsServersArticle];
