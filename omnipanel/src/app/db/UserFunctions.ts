import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import { Credentials } from "../api/auth/[...nextauth]/route";
import postgres from "postgres";
import { eq } from "drizzle-orm";
const queryClient = postgres(process.env.DATABASE_URL || "");
const db = drizzle(queryClient, { schema });

export async function findUser(userInfo: Credentials | null, provider: string) {
  if (!userInfo) {
    return null;
  }
  try {
    const userTable = schema.users;
    let foundUser = null;

    if (provider === "email") {
      console.log("Finding user by email");
      foundUser = await db
        .select()
        .from(userTable)
        .where(eq(schema.users.email, userInfo.email || ""));
    } else if (provider === "discord") {
      console.log("Finding user by username", userInfo);
      foundUser = await db
        .select()
        .from(userTable)
        .where(eq(schema.users.username, userInfo.username || ""));
    }

    if (!foundUser || foundUser.length === 0) {
      console.log("User not found, creating new user");
      const newUser = await createUser(userInfo, provider);
      console.log("New user created in the find", newUser);
      if (!newUser || newUser.length === 0) {
        return null;
      }
    }

    console.log("Found user", foundUser);

    return foundUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createUser(user: Credentials, provider: string) {
  try {
    const newUser = await db.insert(schema.users).values({
      fullName: "",
      email: user.email || "",
      phone: "",
      username: user.username || "",
      password: user.password || "",
      subscription: "free",
      providerId: user.id || "",
      accountProvider: provider as "google" | "discord" | "email",
    });

    console.log("New user created", newUser);

    if (!newUser || newUser.length === 0) {
      return null;
    }
    return newUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function loginUser(user: Credentials, provider: string) {
  try {
    let foundUser = null;
    switch (provider) {
      case "email":
        foundUser = await findUser(user || "", provider);
        break;
      case "google":
        break;
      case "discord":
        foundUser = await findUser(user || "", provider);
        break;
      default:
        break;
    }

    return foundUser;
  } catch (error) {
    console.error(error);
    return null;
  }
}
