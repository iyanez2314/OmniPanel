import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomBytes, randomUUID } from "crypto";

const scopes = ["identify"].join(" ");

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID || "",
      clientSecret: process.env.DISCORD_SECRET || "",
      authorization: { params: { scope: scopes } },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // TODO: Implement this later
    // The CredentialsProvider will allow us to look into our own database for authentication
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     try {
    //       // Here we will use our custom database to authenticate
    //      const user = await signUserInByCredentials(credentials.username);
    //     } catch (error) {
    //       // Return null if user data could not be retrieved
    //       console.error(error);
    //       return null;
    //     }
    //   },
    // }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET || "",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24hrs
    updateAge: 24 * 60 * 60, // 24hrs

    generateRandomSessionId: () => {
      return randomUUID() ?? randomBytes(32).toString("hex");
    },
  },
  callbacks: {
    async session({ session, user, token }) {
      // Add custom logic here
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Add custom logic here
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Add custom logic here
      // If the user is signing in with the credentials provider, we will need to check if the user exists in our database
      console.log("User signined in");
      console.log("signIn", { user, account, profile, email, credentials });
      return true;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
