import { createSlice } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: 'light' as Theme },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
      document.documentElement.classList.toggle('dark', state.mode === 'dark');
    },
    initTheme(state) {
      const stored = localStorage.getItem('theme') as Theme | null;
      if (stored) {
        state.mode = stored;
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        state.mode = 'dark';
      }
      document.documentElement.classList.toggle('dark', state.mode === 'dark');
    },
  },
});

export const { toggleTheme, initTheme } = themeSlice.actions;
export default themeSlice.reducer;
