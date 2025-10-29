# Reddit Client

A responsive Reddit client built with React, Redux Toolkit, Vite, Tailwind CSS, and TypeScript. It supports browsing popular subreddits, searching, filtering, and viewing post details with comments rendered from Markdown.

## Tech Stack
- React 19 + TypeScript
- Redux Toolkit
- React Router
- Tailwind CSS
- React Markdown (with remark-gfm and rehype-sanitize)
- Vitest + Testing Library
- Playwright (E2E)
- Vite

## Features
- Initial view: loads posts from r/popular
- Search posts using Reddit JSON API
- Filter by predefined subreddits (popular, all, pics, news, funny, askreddit, worldnews, technology)
- Detailed post view with comments (Markdown rendered)
- Error and empty states
- Responsive design and accessible UI
- Animations (Framer Motion ready)

## Scripts
```bash
npm run dev       # start dev server
npm run build     # production build
npm run preview   # preview build
npm run test      # unit tests (Vitest)
npm run e2e       # end-to-end tests (Playwright)
```

## API Notes
This uses the Reddit JSON API (no OAuth). Example endpoints:
- https://www.reddit.com/r/popular.json
- https://www.reddit.com/search.json?q=cake%20recipes
- Comments: https://www.reddit.com{permalink}.json

Reddit imposes rate limiting (about 10 req/min for free). This app includes basic in-memory caching for queries.

## Wireframes
- Home: header with search, filters, list of posts
- Post detail: title and comments list

## Future Work
- Persist cache across sessions
- Infinite scrolling
- PWA + offline cache
- CI/CD deployment
- More animations and a richer design system

## Deployment
You can deploy to any static host (e.g., Netlify, Vercel, GitHub Pages). Build with `npm run build` and upload the `dist/` folder.
