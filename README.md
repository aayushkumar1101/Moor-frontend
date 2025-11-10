# Moor Studio Front-End

This project implements the Moor Studio marketing and portfolio site using Next.js (App Router) and Tailwind CSS. The design system is based on the provided Figma exploration and the `Moor(studio).pdf` reference.

## Requirements

- Node.js 18+
- [pnpm](https://pnpm.io) (v8 or newer recommended)

Install dependencies and start the development server with pnpm:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 to view the site. Changes to files inside `app/` and `components/` are hot-reloaded.

## Structure

- `app/` — Next.js App Router pages, layout, and global styles
- `components/` — Reusable UI primitives (navigation, hero, service grid, testimonials, etc.) built from the design system
- `public/assets/` — Optimised design assets copied from the supplied exports

## Scripts

```bash
pnpm dev      # Start the local development server
pnpm build    # Create a production build
pnpm start    # Run the production server
pnpm lint     # Static analysis via ESLint
```

## Design Notes

- Components are responsive by default, matching the mobile and desktop layouts noted in the PDF deliverable.
- Props expose content, imagery, and CTAs so sections can be rearranged or reused across future pages.
- Typography, spacing, and color decisions follow the Figma tokens while relying on Tailwind CSS utilities.

## Deployment

Deploy using your preferred Next.js-compatible hosting provider (e.g., Vercel, Netlify). Run `pnpm build` prior to deployment to ensure a successful production build.
