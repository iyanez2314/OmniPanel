import { db } from "./db";
import { NewUser, User, users } from "./schema";

// ALL USER RELATED QUIERIES

// Create a new user
export async function createUser(user: NewUser): Promise<User[]> {
  return db.insert(users).values(user).returning();
}

// create a new user with a discord account
