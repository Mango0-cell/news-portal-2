import { ArticlePage } from '@/features/article/ArticlePage';

interface ArticleRouteProps {
  params: Promise<{ uri: string }>;
}

export default async function ArticleRoute({ params }: ArticleRouteProps) {
  const { uri } = await params;
  return <ArticlePage uri={decodeURIComponent(uri)} />;
}
