import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATBASE_URL || "";

export const connection = postgres(connectionString, { max: 1 });
export const db = drizzle(connection);
