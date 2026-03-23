# News Portal

## Project Identity
React 19 + TypeScript + Tailwind CSS v3 + Redux Toolkit (RTK Query) + Next.js 16.
Data source: NewsAPI.ai. Deadline: June 30th, 10:00 AM.

## Critical Security Rule
NEVER hardcode API keys. ALWAYS use `process.env.NEXT_PUBLIC_NEWS_API_KEY`.
The `.env` file is gitignored. If you see a raw key string in code, flag it and replace immediately.

## Commands
- `npm run dev` — Dev server
- `npm run build` — Production build
- `npm run lint` / `npm run lint:fix` — ESLint

## Architecture
```
src/
  app/
    layout.tsx         # Root layout (Navbar, Footer, Providers)
    page.tsx           # Home route
    search/page.tsx    # Search route
    article/[uri]/page.tsx  # Article detail route (dynamic)
    providers.tsx      # Redux Provider + ThemeInit
    globals.css        # Global styles
  features/
    home/              # HomePage + HeroSection, GenreButtons, LatestNews, etc.
    search/            # SearchPage + FilterPanel, SearchResults, ResultCard, etc.
    article/           # ArticlePage (detail view)
  components/
    ui/                # reusable primitives (Button, Badge, Card, Icon, Skeleton, ErrorMessage)
    layout/            # Navbar, Footer, PageTransition
    shared/            # ArticleCard, ArticleDrawer, SearchBar, ThemeToggle
  store/               # index.ts, themeSlice.ts, newsSlice.ts
  services/            # newsApi.ts (RTK Query — single source of all API calls)
  hooks/               # useTheme.ts, usePagination.ts, useArticleDrawer.ts
  lib/                 # utils.ts (cn, formatDate), constants.ts
  types/               # news.ts
```
- Feature-specific components live in `features/[feature]/`
- Routes: `/` = Home, `/search` = Search, `/article/[uri]` = Article detail
- No barrel `index.ts` files — import directly from file path
- Named exports only, no default exports (except page.tsx files and slices)
- Use `@/` path alias for imports (maps to `src/`)

## Naming
- Components: PascalCase (`ArticleCard`, `ThemeToggle`)
- Hooks: `use` prefix (`useTheme`, `usePagination`)
- Slices: `[name]Slice.ts` (`themeSlice.ts`)

## Skills (detailed guides)
- **Tailwind styling:** `.claude/skills/tailwind-styling.md`
- **RTK Query / data fetching:** `.claude/skills/data-fetching.md`
- **Dark mode / theme:** `.claude/skills/theme-master.md`
- **Creating components:** `.claude/skills/component-creation.md`

## API Reference
Full NewsAPI.ai docs: `.claude/docs/newsapi-reference.md`
Base URL: `https://eventregistry.org/api/v1` — POST with `apiKey` in body.
