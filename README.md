# News Portal

A modern news aggregator built with Next.js 16, React 19, and TypeScript. Browse top headlines, search articles by topic, and read full article details — all powered by NewsAPI.ai.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS v3 with dark mode support
- **State Management:** Redux Toolkit + RTK Query
- **Data Source:** [NewsAPI.ai](https://newsapi.ai/)

## Features

- **Home Page** — Hero article, top stories sidebar, genre filter pills, paginated news grid
- **Search Page** — Full-text search with filters (category, date range, language, sort order)
- **Article Detail** — Full article view with hero image, reading time, source info sidebar
- **Dark Mode** — System-aware theme with manual toggle, persisted in localStorage
- **Responsive** — Mobile-first layout with slide-out filter panel and adaptive grids

## Getting Started

### Prerequisites

- Node.js 18+
- A [NewsAPI.ai](https://newsapi.ai/) API key

### Installation

```bash
git clone https://github.com/Mango0-cell/news-portal-2.git
cd news-portal-2
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_NEWS_API_KEY=your_api_key_here
```

You can get a free API key at [newsapi.ai](https://newsapi.ai/).

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    layout.tsx            # Root layout (Navbar, Footer, Providers)
    page.tsx              # Home route (/)
    search/page.tsx       # Search route (/search)
    article/[uri]/page.tsx # Article detail route (/article/[uri])
  features/               # Feature modules
    home/                 # HomePage, HeroSection, GenreButtons, LatestNews
    search/               # SearchPage, FilterPanel, SearchResults, ResultCard
    article/              # ArticlePage (detail view)
  components/
    ui/                   # Reusable primitives (Button, Badge, Card, Icon, Skeleton)
    layout/               # Navbar, Footer, PageTransition
    shared/               # ArticleCard, ArticleDrawer, SearchBar, ThemeToggle
  store/                  # Redux store, themeSlice, newsSlice
  services/               # RTK Query API (newsApi.ts)
  hooks/                  # Custom hooks (useTheme, usePagination, useArticleDrawer)
  lib/                    # Utilities (cn, formatDate) and constants
  types/                  # TypeScript type definitions
```
