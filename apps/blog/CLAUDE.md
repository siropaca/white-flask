# CLAUDE.md - Blog Application

This file provides guidance to Claude Code when working with the blog application.

## Important Documentation

Please refer to the following documentation for Next.js best practices with LLMs:
- https://nextjs.org/docs

## Overview

The blog application is built with Next.js and provides the public-facing blog interface.

## Technology Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **React**: Latest version with Server Components
- **Styling**: (To be determined based on project requirements)

## Project Structure

```
apps/blog/
├── src/
│   └── app/           # App Router directory
│       ├── layout.tsx # Root layout
│       └── page.tsx   # Home page
├── next.config.ts     # Next.js configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies and scripts
```

## Development Commands

```bash
# From the blog directory
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Key Features

- Public blog interface
- Article listing and viewing
- SEO optimization
- Performance optimized with Next.js features

## Routing

Next.js uses file-based routing with the App Router. Routes are defined in the `src/app/` directory.

## Data Fetching

- Server Components for initial data loading
- Client Components for interactive features
- Integration with backend GraphQL API at `apps/backend`

## Styling Approach

(To be determined based on project requirements - CSS Modules, Tailwind CSS, or CSS-in-JS)

## Performance Optimization

- Automatic code splitting
- Image optimization with next/image
- Font optimization with next/font
- Static generation where possible