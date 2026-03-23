export const ITEMS_PER_PAGE = 20;

export const GENRES = [
  { label: 'Top Stories', value: '', icon: 'trending_up' },
  { label: 'Technology', value: 'dmoz/Computers', icon: 'computer' },
  { label: 'Science', value: 'dmoz/Science', icon: 'science' },
  { label: 'Business', value: 'dmoz/Business', icon: 'business_center' },
  { label: 'Sports', value: 'dmoz/Sports', icon: 'sports_soccer' },
  { label: 'Health', value: 'dmoz/Health', icon: 'favorite' },
  { label: 'Entertainment', value: 'dmoz/Arts', icon: 'movie' },
  { label: 'World', value: 'dmoz/Society', icon: 'public' },
] as const;

export const LANGUAGES = [
  { label: 'English', value: 'eng' },
  { label: 'Spanish', value: 'spa' },
  { label: 'French', value: 'fra' },
  { label: 'German', value: 'deu' },
] as const;

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'date' },
  { label: 'Relevance', value: 'rel' },
  { label: 'Source Importance', value: 'sourceImportance' },
] as const;
