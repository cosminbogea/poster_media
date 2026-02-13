# AGENTS.md - Developer Guide

This file provides context for AI agents working in this repository.

## Project Overview

- **Project Name**: POSTER Photography
- **Framework**: Next.js 16.0.10 with React 19
- **Language**: TypeScript (strict mode enabled)
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS v4 with shadcn/ui conventions
- **Target**: Photography portfolio website

## Build Commands

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

**No test framework is currently configured.** Do not add tests without consulting the user first.

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - All TypeScript strict checks are on
- Use explicit types for function parameters and return types when not obvious
- Use `type` for unions/interfaces, `interface` for object shapes
- Prefer `import { type X }` syntax for type-only imports

### Imports & Path Aliases

- Use path aliases: `@/*` maps to root (`./`)
- Example: `import { Footer } from "@/components/footer"`
- Group imports: React/Next imports first, then third-party, then local
- Use `"use client"` directive at the top of client components

### Naming Conventions

- **Components**: PascalCase (e.g., `ThemeSwitcher`, `Navigation`)
- **Files**: kebab-case for pages/routes (e.g., `contact.tsx`), PascalCase for components
- **Variables**: camelCase
- **Constants**: PascalCase or SCREAMING_SNAKE_CASE
- **CSS Classes**: Tailwind utility classes (kebab-case)

### Component Structure

```tsx
"use client"; // Only for client components

import { useTheme } from "@/components/theme-context";

export function ComponentName() {
  const { value } = useTheme();

  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}
```

### CSS & Styling

- Use Tailwind CSS utility classes
- Use CSS variables from `app/globals.css` (e.g., `var(--primary)`, `var(--background)`)
- Use OKLCH color values in CSS variables
- Use `cn()` utility from `@/lib/utils` for conditional classes:
  ```tsx
  import { cn } from "@/lib/utils";
  
  className={cn("base-class", condition && "conditional-class")}
  ```
- Prefix classes with `md:`, `lg:` for responsive design
- Use `transition-colors` and `duration-X` for animations

### Error Handling

- Use try/catch for async operations
- Display errors gracefully in UI (no raw error messages)
- Use error boundaries where appropriate

### Next.js Conventions

- Server components by default, add `"use client"` for interactivity
- Use `next/font/local` for custom fonts
- Use Next.js Metadata API in `layout.tsx` for SEO
- Use `app/` directory for App Router pages
- Dynamic routes: `app/works/[slug]/page.tsx`

### shadcn/ui Integration

- Uses shadcn/ui "new-york" style
- Component paths: `@/components/ui/`
- Uses Radix UI primitives under the hood
- Icons from `lucide-react`

### Tailwind CSS v4

- Uses `@import "tailwindcss"` syntax
- Custom theme defined in `@theme inline` block in `globals.css`
- CSS variables for all design tokens
- Uses `tw-animate-css` for animations

## Directory Structure

```
/app              - Next.js App Router pages
  /works/[slug]  - Dynamic work detail pages
  layout.tsx     - Root layout with fonts and theme provider
  globals.css    - Global styles and CSS variables
/components       - React components (organized by feature)
  /ui            - shadcn/ui components
  /works         - Work/portfolio related components
  /navigation    - Navigation components
/lib              - Utility functions (utils.ts)
/types            - TypeScript type definitions
/public           - Static assets
```

## Common Patterns

### Theme Support

```tsx
import { useTheme } from "@/components/theme-context";

const { colors } = useTheme();
// colors.background, colors.foreground, colors.primary, etc.
```

### Client Component Pattern

```tsx
"use client";

import { useState } from "react";

export function ClientComponent() {
  const [state, setState] = useState(false);
  // ...
}
```

### Data Fetching (Server Components)

```tsx
// In app/works/page.tsx or similar
import { works } from "@/data/works";

export default function Page() {
  // Direct import of data (simple case)
  // or use fetch() for external APIs
}
```

## Linting

- Uses ESLint with `next/core-web-vitals` and `next/typescript`
- Run `pnpm lint` before committing

## Pre-commit Checklist

1. Run `pnpm lint` - fix any errors
2. Run `pnpm build` - ensure production build succeeds
3. Verify no TypeScript errors

## Important Notes

- This is a photography portfolio site with theme switching (main/black/white)
- Uses custom fonts: Inter and Erbaum
- No test framework configured - do not add tests without asking
- Uses Framer Motion for animations
- Mobile-first responsive design approach
