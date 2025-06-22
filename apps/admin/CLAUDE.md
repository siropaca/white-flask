# CLAUDE.md - Admin Application

This file provides guidance to Claude Code when working with the admin application.

## Important Documentation

Please refer to the following documentation for SvelteKit best practices with LLMs:
- https://svelte.jp/docs/llms

## Overview

The admin application is built with SvelteKit and provides an administrative interface for managing the blog content.

## Technology Stack

- **Framework**: SvelteKit
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Components**: (To be determined based on project requirements)

## Project Structure

```
apps/admin/
├── src/
│   ├── app.html        # HTML template
│   └── routes/         # SvelteKit routes
├── static/             # Static assets
├── svelte.config.mjs   # Svelte configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.mjs     # Vite configuration
```

## Development Commands

```bash
# From the admin directory
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm preview  # Preview production build
```

## Key Features

- Admin dashboard for blog management
- Content creation and editing
- User management (if applicable)
- Analytics and statistics viewing

## Routing

SvelteKit uses file-based routing. Routes are defined in the `src/routes/` directory.

## State Management

(To be determined based on project requirements)

## API Integration

The admin app communicates with the backend GraphQL API located at `apps/backend`.