<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- Dev server: `npm run dev` (Turbopack). Build: `npm run build`. Lint: `npm run lint`.
- Typecheck: `npx tsc --noEmit` (no package script; do this before finishing TS changes). `npm run build` also typechecks.
- No test framework is configured.

## Next.js 16 gotchas (verified in next.config.ts)

- `cacheComponents: true` is on: any component reading `searchParams`, `headers()`, `cookies()`, or other request data must be wrapped in a `<Suspense>` boundary (or marked `use cache`), or dev/build errors. Do not opt components out of full-route caching the pre-16 way.
- `reactCompiler: true` is on: write plain function components; leave memoization to the compiler (no manual `useMemo`/`useCallback` unless measured to be needed).
- App Router lives in `src/app`; path alias `@/*` -> `./src/*`.

## Styling & components

- Tailwind v4: theme tokens are defined in CSS (`@theme`/variables in `src/app/globals.css`); there is no `tailwind.config.js`.
- shadcn/ui with the `base-nova` style (`components.json`): primitives are **Base UI** (`@base-ui/react`), not Radix. Check existing props/APIs against Base UI, and add new components with `npx shadcn add <component>` into `src/components/ui`.
- Icons: `lucide-react`. `cn` is re-exported by `@/lib/utils`, which pulls from the `cn` package (not clsx + tailwind-merge directly) — keep new shadcn components importing `cn` from `@/lib/utils`.
