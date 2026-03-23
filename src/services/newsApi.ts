import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ArticlesResponse } from '../types/news';
import { ITEMS_PER_PAGE } from '../lib/constants';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://eventregistry.org/api/v1',
  }),
  tagTypes: ['Articles'],
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<
      ArticlesResponse,
      { page?: number; category?: string; keyword?: string }
    >({
      query: ({ page = 1, category, keyword }) => ({
        url: '/article/getArticles',
        method: 'POST',
        body: {
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
          lang: 'eng',
          sortBy: 'date',
          articlesCount: ITEMS_PER_PAGE,
          articlesPage: page,
          resultType: 'articles',
          ...(category && { categoryUri: category }),
          ...(keyword && { keyword, keywordSearchMode: 'simple' }),
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.articles.results.map(({ uri }) => ({
                type: 'Articles' as const,
                id: uri,
              })),
              { type: 'Articles', id: 'LIST' },
            ]
          : [{ type: 'Articles', id: 'LIST' }],
    }),

    searchArticles: builder.query<
      ArticlesResponse,
      {
        keyword?: string;
        category?: string;
        lang?: string;
        sortBy?: string;
        dateStart?: string;
        dateEnd?: string;
        page?: number;
      }
    >({
      query: ({
        keyword,
        category,
        lang = 'eng',
        sortBy = 'date',
        dateStart,
        dateEnd,
        page = 1,
      }) => ({
        url: '/article/getArticles',
        method: 'POST',
        body: {
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
          lang,
          sortBy,
          articlesCount: ITEMS_PER_PAGE,
          articlesPage: page,
          resultType: 'articles',
          ...(keyword && { keyword, keywordSearchMode: 'simple' }),
          ...(category && { categoryUri: category }),
          ...(dateStart && { dateStart }),
          ...(dateEnd && { dateEnd }),
        },
      }),
      providesTags: [{ type: 'Articles', id: 'SEARCH' }],
    }),

    getArticleByUri: builder.query<ArticlesResponse, { uri: string }>({
      query: ({ uri }) => ({
        url: '/article/getArticles',
        method: 'POST',
        body: {
          apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
          articleUri: uri,
          resultType: 'articles',
          articlesCount: 1,
        },
      }),
      providesTags: (_result, _error, { uri }) => [{ type: 'Articles', id: uri }],
    }),
  }),
});

export const {
  useGetTopHeadlinesQuery,
  useSearchArticlesQuery,
  useGetArticleByUriQuery,
} = newsApi;
