import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, connection } from "./db";

console.log("Migrating database...");

migrate(db, { migrationsFolder: "drizzle" });

console.log("Database migrated successfully.");

console.log("Closing database connection...");

connection.end();
