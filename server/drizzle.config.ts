import { defineConfig } from 'drizzle-kit';
import { env } from './src/env.ts';

export default defineConfig({
    dialect: 'mysql',
    casing: 'snake_case',
    schema: './src/db/schema/**.ts',
    out: './src/db/migrations',
    dbCredentials: {
        url: env.DATABASE_URL
    }
})