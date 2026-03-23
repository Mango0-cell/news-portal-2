# Skill: Creating Components

## Rules

- Named exports only. No default exports.
- TypeScript props interface for every component.
- Tailwind atomic classes only. Include `dark:` variants for all color classes.
- Use `cn()` from `src/lib/utils.ts` for conditional classes.

## File Locations

| Type                | Path                                      |
|---------------------|-------------------------------------------|
| UI primitives       | `src/components/ui/[Name].tsx`            |
| Layout              | `src/components/layout/[Name].tsx`        |
| Shared / reusable   | `src/components/shared/[Name].tsx`        |
| Page-specific       | `src/pages/[Page]/components/[Name].tsx`  |

## Naming

- Components: PascalCase, feature-prefixed (`ArticleCard`, `NewsFilter`).
- Hooks: camelCase with `use` prefix (`useTheme`, `usePagination`).
- No barrel `index.ts` files — import directly from file path.

## Template

```tsx
import { cn } from '../../lib/utils';

interface MyComponentProps {
  title: string;
  className?: string;
}

export function MyComponent({ title, className }: MyComponentProps) {
  return (
    <div className={cn(
      'p-4 bg-white dark:bg-gray-800 rounded-lg',
      className
    )}>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h2>
    </div>
  );
}
```

## Testing

Write a basic test in `src/components/__tests__/[Name].test.tsx`.
