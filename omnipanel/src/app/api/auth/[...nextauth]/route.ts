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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        /*
         * If the user is singing in with credentials, we can query our databse to check if they exist
         * if they do, we can allow them to enter the app.
         */
        console.log("Credentials", credentials);
        try {
          // Here we will use our custom database to authenticate
          // const user = await signUserInByCredentials(credentials.username);
        } catch (error) {
          // Return null if user data could not be retrieved
          console.error(error);
          return null;
        }
      },
    }),
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
    async session({ session, token }: any) {
      // Add custom logic here
      if (token) {
        console.log("TOKEN STUFF HERE");
        console.log("session", { session, token });
      }

      return session;
    },
    async jwt({ token }: any) {
      // Add custom logic here
      if (token) {
        console.log("JWT STUFF HERE");
        console.log("jwt", { token });
      }
      return token;
    },
    // This is called when a user signs in with a provider
    async signIn({ user, account, profile, email, credentials }: any) {
      /*
       * if the user is signing in with a provider, we can use save the user to the db if they do not exist
       * we can then allow them to enter the app.
       */
      console.log("User Signed in with provider");
      console.log("signIn", { user, account, profile, email, credentials });
      return true;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
