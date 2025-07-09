import * as dotenv from 'dotenv'

dotenv.config()

interface Env {
  PORT: number
  DATABASE_URL: string
}

const requiredEnvVars = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
} as const

export function getEnv(): Env {
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
    PORT: Number(process.env.PORT),
    DATABASE_URL: requiredEnvVars.DATABASE_URL as string,
  }
}
