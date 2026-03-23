# Skill: Theme / Dark Mode

## Architecture

- **Slice:** `src/store/themeSlice.ts` — Redux state with `toggleTheme` and `initTheme` actions.
- **Hook:** `src/hooks/useTheme.ts` — Exposes `theme` and `toggleTheme` to components.
- **Toggle UI:** `src/components/shared/ThemeToggle.tsx` — Button component.
- **Strategy:** Tailwind `darkMode: 'class'` — toggles `.dark` class on `<html>`.

## How It Works

1. On load, `getInitialTheme()` checks `localStorage('theme')` then `prefers-color-scheme`.
2. `initTheme` applies the `.dark` class to `document.documentElement`.
3. `toggleTheme` flips the state, updates `localStorage`, and toggles the `.dark` class.

## Rules

- Every color class MUST have a `dark:` variant. No exceptions.
- Use `cn()` for conditional dark mode classes, never template literals.
- Never use inline styles for theme colors.
- Test both light and dark mode when adding any visual component.

## Adding Dark Mode to a Component

```tsx
// WRONG
<div className="bg-white text-black">

// RIGHT
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

## Common Dark Mode Pairs

| Light             | Dark               |
|-------------------|-------------------|
| `bg-white`        | `dark:bg-gray-900` |
| `bg-gray-50`      | `dark:bg-gray-800` |
| `text-gray-900`   | `dark:text-gray-100` |
| `text-gray-600`   | `dark:text-gray-400` |
| `border-gray-200` | `dark:border-gray-700` |
| `shadow-sm`       | `dark:shadow-gray-900/20` |
