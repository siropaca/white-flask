import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
// eslint-disable-next-line no-restricted-imports
import * as schema from './schema/index.js'
import { getEnv } from './libs/env.js'

const env = getEnv()

const pool = new Pool({
  connectionString: env.DATABASE_URL,
})

export const db = drizzle(pool, { schema })
