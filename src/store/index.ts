import { configureStore } from '@reduxjs/toolkit';
import { newsApi } from '../services/newsApi';
import themeReducer from './themeSlice';
import newsReducer from './newsSlice';

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    theme: themeReducer,
    news: newsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
