# Skill: RTK Query Data Fetching

## Rules

- ALL API logic lives in `src/services/newsApi.ts`. No exceptions.
- Use auto-generated hooks ONLY (`useGetTopHeadlinesQuery`, `useSearchArticlesQuery`).
- NEVER call `fetch()` or `axios` directly in components.
- Use `providesTags` / `invalidatesTags` for cache management.
- API key: always use `process.env.NEXT_PUBLIC_NEWS_API_KEY` in POST body.

## Adding a New Endpoint

1. Open `src/services/newsApi.ts`.
2. Add the endpoint inside the `endpoints` builder following the existing pattern.
3. Export the auto-generated hook at the bottom.
4. Wire the hook into the target component.
5. Run `npm run lint` to verify.

## Endpoint Template

```ts
// Inside endpoints: (builder) => ({
myNewEndpoint: builder.query<ResponseType, ParamsType>({
  query: (params) => ({
    url: '/article/getArticles',
    method: 'POST',
    body: {
      apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
      lang: 'eng',
      sortBy: 'date',
      articlesCount: ITEMS_PER_PAGE,
      articlesPage: params.page ?? 1,
      resultType: 'articles',
      // ... spread optional params
    },
  }),
  providesTags: [{ type: 'Articles', id: 'TAG_NAME' }],
}),
// })

// Export at bottom:
// export const { useMyNewEndpointQuery } = newsApi;
```

## Using Hooks in Components

```tsx
import { useGetTopHeadlinesQuery } from '../services/newsApi';

function MyComponent() {
  const { data, isLoading, error, isFetching } = useGetTopHeadlinesQuery({
    page: 1,
    category: 'news/Arts_and_Entertainment',
  });

  if (isLoading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;

  return <>{data?.articles.results.map(article => ...)}</>;
}
```

## API Reference

See `.claude/docs/newsapi-reference.md` for full endpoint docs, params, and response shapes.
