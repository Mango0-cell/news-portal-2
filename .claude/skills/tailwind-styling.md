# Skill: Tailwind CSS v3 Styling

## Rules

- Use atomic Tailwind classes ONLY. No custom CSS unless absolutely unavoidable.
- Use `cn()` from `src/lib/utils.ts` for conditional class logic. NEVER use template literals for classes.
- Dark mode strategy: `darkMode: 'class'` in `tailwind.config.ts`.
- Every color class MUST have a `dark:` variant pair:
  - `bg-white dark:bg-gray-900`
  - `text-gray-900 dark:text-gray-100`
  - `border-gray-200 dark:border-gray-700`
- Never use inline styles for colors or spacing.

## Responsive Design

- Mobile-first: write base classes for mobile, add responsive prefixes for larger screens.
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px).
- Example: `text-sm md:text-base lg:text-lg`

## Fonts

- Display font: `font-display` (Playfair Display) — use for headings.
- Body font: `font-body` (Inter) — use for paragraph text.
- Defined in `tailwind.config.ts` under `theme.extend.fontFamily`.

## cn() Usage

```tsx
import { cn } from '../lib/utils';

// Conditional classes
<div className={cn(
  'p-4 rounded-lg bg-white dark:bg-gray-800',
  isActive && 'ring-2 ring-blue-500',
  className
)} />
```

## Common Patterns

```tsx
// Card with dark mode
'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm'

// Text hierarchy
'text-gray-900 dark:text-gray-100'   // Primary text
'text-gray-600 dark:text-gray-400'   // Secondary text
'text-gray-400 dark:text-gray-500'   // Muted text

// Interactive states
'hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'

// Container
'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
```
