export interface Doc {
  authorId: number;
  author: Author;
  link?: string;
  title?: string;
  pubDate?: string;
  contentSnippet?: string;
}

export interface Author {
  name: string;
  avatar_url: string;
  url: string;
}
