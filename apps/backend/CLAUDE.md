# CLAUDE.md - Backend Application

This file provides guidance to Claude Code when working with the backend application.

## Overview

The backend application provides a GraphQL API built with Pothos schema builder and GraphQL Yoga server, serving as the data layer for the blog and admin applications.

## Technology Stack

- **GraphQL Schema**: Pothos (code-first schema builder)
- **GraphQL Server**: GraphQL Yoga
- **Runtime**: Node.js with ES Modules
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM (to be configured)

## Project Structure

```
apps/backend/
├── src/
│   ├── server.ts       # Server entry point
│   ├── schema.ts       # GraphQL schema definition
│   └── resolvers/      # GraphQL resolvers (to be added)
├── prisma/             # Prisma schema and migrations (to be added)
├── tsconfig.json       # TypeScript configuration
└── package.json        # Package configuration
```

## Development Commands

```bash
# From the backend directory
pnpm dev      # Start development server with hot reload
pnpm build    # Build for production
pnpm start    # Start production server
```

## Key Features

- GraphQL API with Pothos schema builder
- Type-safe resolver implementation
- GraphQL Playground at http://localhost:3003/graphql
- Hot reload in development mode
- ES Modules support

## Schema Design

The GraphQL schema is built using Pothos, a code-first schema builder that provides excellent TypeScript support. The schema is defined in `src/schema.ts`.

## Database Integration

(To be configured with Prisma ORM for PostgreSQL)

## API Endpoints

- **GraphQL Endpoint**: `http://localhost:3003/graphql`
- **GraphQL Playground**: Available at the same URL in development mode

## Authentication & Authorization

(To be implemented based on project requirements)

## Error Handling

GraphQL Yoga provides built-in error handling with proper error masking for production environments.

## Performance Considerations

- Response caching can be implemented with GraphQL Yoga plugins
- DataLoader pattern for N+1 query prevention
- Query depth limiting for security
