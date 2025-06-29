import * as dotenv from 'dotenv'

dotenv.config()

interface Env {
  PORT: string
  DATABASE_URL: string
}

export function getEnv(): Env {
  const requiredEnvVars = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
  }

  // 必須環境変数のチェック
  const missingVars: string[] = []
  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      missingVars.push(key)
    }
  }

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`)
  }

  return {
    PORT: requiredEnvVars.PORT as string,
    DATABASE_URL: requiredEnvVars.DATABASE_URL as string,
  } as const
}
