export interface Article {
  uri: string;
  title: string;
  body: string;
  url: string;
  image: string | null;
  date: string;
  time: string;
  source: { uri: string; title: string };
}

export interface ArticlesResponse {
  articles: {
    results: Article[];
    totalResults: number;
    page: number;
    count: number;
    pages: number;
  };
}
