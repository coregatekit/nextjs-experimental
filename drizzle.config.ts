import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: process.env.DB_FILE_NAME || 'file:./mmo.db',
  },
  out: './drizzle',
});
