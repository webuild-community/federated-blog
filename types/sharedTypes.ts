export interface Doc {
  author: Author;
  link: string;
  title: string;
  pubDate: string;
  contentSnippet: string;
}

export interface Author {
  name: string;
  avatar_url: string;
  url: string;
}
