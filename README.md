# Reddit Client

A responsive Reddit client built with React, Redux Toolkit, Vite, Tailwind CSS (v4), and TypeScript. Browse popular posts, search, filter by subreddit, and view post details with Markdown-rendered comments.

## What’s Included (High-level)
- React 19 + TypeScript app scaffolded with Vite
- Global state with Redux Toolkit (`posts`, `ui` slices)
- Client-side routing with React Router (`/` and `/post/*`)
- UI components: Header (search), Filters (presets), PostList, PostCard
- Post detail page with comments rendered from Markdown
- Tailwind CSS (v4) with a dark-first palette for readability
- Tests: Vitest + Testing Library (unit) and Playwright (E2E)
- Production build via Vite; repo on GitHub

## Technologies Used (Detailed)
- React 19 + TypeScript: modern JSX runtime, strong typing
- Vite: fast dev server, TS + JSX handling, optimized build
- Redux Toolkit: slice-based state management, async thunks (`createAsyncThunk`)
- React Redux: store Provider, hooks (`useDispatch`, `useSelector`)
- React Router: routing for home and post detail
- Tailwind CSS v4: utility-first CSS via `@import "tailwindcss"` (PostCSS plugin `@tailwindcss/postcss`)
- React Markdown: render Reddit Markdown safely
  - `remark-gfm`: GitHub Flavored Markdown tables, strikethrough, etc.
  - `rehype-sanitize`: sanitize HTML output for safety
- Day.js: relative time (e.g., "2 hours ago")
- Testing
  - Vitest + @testing-library/react + @testing-library/jest-dom
  - Playwright for E2E smoke checks (launches dev server)
- Tooling
  - ESLint + Prettier
  - TypeScript project refs (`tsconfig.json`, `tsconfig.app.json`)

## Implementation Details
- State
  - `postsSlice.ts`: fetches lists and post+comments. In-memory cache by query key.
  - `uiSlice.ts`: search term, selected subreddit, simple UI flags.
- API
  - Uses Reddit JSON API directly (no OAuth):
    - Listing: `https://www.reddit.com/r/{subreddit}.json`
    - Search: `https://www.reddit.com/search.json?q={term}`
    - Post+comments: `https://www.reddit.com{permalink}.json`
  - Note: Reddit unauthenticated requests are rate-limited (~10/min). App caches results to mitigate.
- Routing
  - `/` → `Home` (Header, Filters, PostList)
  - `/post/*` → `PostDetail` (post info, comments)
- UI/Styling
  - Tailwind v4 via `src/index.css` `@import "tailwindcss"`
  - Dark-first: page background black, text white for maximum contrast
  - Links and accents use a brand orange
  - Comments rendered via React Markdown with `prose-invert` for dark background
- Accessibility & UX
  - Keyboard-friendly inputs; visible focus via Tailwind defaults
  - Loading, error, and empty states in `PostList`
- Tests
  - Unit: example test for `Header` renders search input
  - E2E: Playwright test verifies initial load and filter interaction

## Project Structure
- `src/store.ts` – Redux store setup
- `src/features/posts/postsSlice.ts` – posts list + details/comments
- `src/features/ui/uiSlice.ts` – search/subreddit UI state
- `src/components/` – `Header`, `Filters`, `PostList`, `PostCard`
- `src/pages/` – `Home`, `PostDetail`
- `src/index.css` – Tailwind import and base colors
- `vite.config.ts` – Vite and Vitest config
- `playwright.config.ts`, `tests/` – E2E tests
- `src/components/__tests__/` – unit tests

## Scripts
```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview build
npm run test      # unit tests (Vitest)
npm run e2e       # end-to-end tests (Playwright)
```

## Deployment Notes
- Builds to `dist/` via `npm run build`.
- Can be hosted on any static host (Vercel, Netlify, GH Pages).
- This repo currently fetches directly from `reddit.com` on the client.

## Decisions and Changes Log (Chronological Summary)
1) Scaffolded Vite React + TS app; installed RTK, Router, Tailwind v4, Markdown, testing.
2) Implemented Redux slices (`posts`, `ui`) and store; added components and pages.
3) Added Tailwind v4 setup via `@tailwindcss/postcss`; simplified `index.css` to dark-first.
4) Wrote unit and E2E tests; production build verified.
5) Pushed to GitHub; added newspaper emoji favicon.
6) Iterated on deployment experiments (SPA rewrites, serverless). Rolled back to simpler direct-fetch approach for reliability and easiest local dev.
7) Adjusted UI for readability (white text on black background in lists and detail views).

## Future Work
- Infinite scroll or pagination
- Persist cache (e.g., localStorage/IndexedDB)
- Richer error handling and retry/backoff for rate limits
- CI/CD with preview deployments
- PWA features / offline caching
- Code-splitting and Lighthouse tuning

## Notes Summary (for quick review)
- Direct Reddit JSON API fetch; no OAuth, rate limited (~10/min)
- State via Redux Toolkit; caching by query key
- Tailwind v4, dark-first UI; white text on black background
- Comments rendered with React Markdown + sanitization
- Tests: Vitest + RTL (unit), Playwright (E2E)
- Repo ready; build targets `dist/`; favicon set to 📰
