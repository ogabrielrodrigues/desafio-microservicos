import { defineConfig } from 'drizzle-kit'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  schema: './src/storage/schemas/*',
  out: './src/storage/migrations',
  casing: 'snake_case'
})