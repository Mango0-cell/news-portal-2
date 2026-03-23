import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface NewsFilters {
  category: string;
  keyword: string;
  lang: string;
  sortBy: string;
  dateStart: string;
  dateEnd: string;
}

const initialState: NewsFilters = {
  category: '',
  keyword: '',
  lang: 'eng',
  sortBy: 'date',
  dateStart: '',
  dateEnd: '',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setLang(state, action: PayloadAction<string>) {
      state.lang = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setDateStart(state, action: PayloadAction<string>) {
      state.dateStart = action.payload;
    },
    setDateEnd(state, action: PayloadAction<string>) {
      state.dateEnd = action.payload;
    },
    clearFilters() {
      return initialState;
    },
  },
});

export const {
  setCategory,
  setKeyword,
  setLang,
  setSortBy,
  setDateStart,
  setDateEnd,
  clearFilters,
} = newsSlice.actions;
export default newsSlice.reducer;
