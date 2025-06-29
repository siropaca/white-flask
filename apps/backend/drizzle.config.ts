import { defineConfig } from 'drizzle-kit'
import { getEnv } from './src/libs/env'

const env = getEnv()

export default defineConfig({
  schema: './src/schema/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
