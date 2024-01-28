import "dotenv/config";
import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}
if (!process.env.DB_USER) {
  throw new Error("DATABASE_USERNAME environment variable is not set");
}

if (!process.env.DB_HOST) {
  throw new Error("DATABASE_HOST environment variable is not set");
}

if (!process.env.DB_PW) {
  throw new Error("DATABASE_PASSWORD environment variable is not set");
}

if (!process.env.DB_NAME) {
  throw new Error("DATABASE_NAME environment variable is not set");
}

export default {
  schema: "./src/app/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
