# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

White Flask is a personal blog site project using a monorepo structure with pnpm workspaces. It consists of three applications:
- `apps/blog` - Blog site frontend (SvelteKit)
- `apps/admin` - Admin panel (Next.js)
- `apps/backend` - GraphQL API (Pothos + GraphQL Yoga)

## Development Commands

### Essential Commands (from root directory)
```bash
# Start all applications in development mode
pnpm dev

# Build all applications
pnpm build

# Run linting across all packages
pnpm lint
pnpm lint:fix  # Auto-fix linting issues

# Type checking
pnpm type-check

# Run tests
pnpm test
```

### Initial Setup
```bash
# Run bootstrap script to set up the project
mise run bootstrap
# or
./scripts/bootstrap.sh

# Start PostgreSQL database
docker-compose up -d
```

### Application-Specific Commands
When working on specific apps, you can run commands from their directories:
- `apps/admin`: Uses Next.js commands (dev, build, start)
- `apps/backend`: Uses tsx for development (`pnpm dev`), tsc for building
- `apps/blog`: Uses Vite/SvelteKit commands with svelte-check for type checking

## Architecture and Key Patterns

### Monorepo Structure
- Uses pnpm workspaces defined in `pnpm-workspace.yaml`
- Shared TypeScript configuration extends from `tsconfig.base.json`
- Each app has its own `package.json` with specific dependencies

### Technology Stack
- **Frontend**: SvelteKit (blog) and Next.js (admin)
- **Backend**: GraphQL with Pothos schema builder and GraphQL Yoga server
- **Database**: PostgreSQL (via Docker) with Prisma ORM
- **Node.js**: Version 24.2.0 (managed by mise)

### Development Workflow
- Git hooks via Lefthook for pre-commit type checking
- Commitlint enforces Conventional Commits format
- ESLint for code quality across all packages
