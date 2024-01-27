import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const scopes = ["identify"].join(" ");

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID || "",
      clientSecret: process.env.DISCORD_SECRET || "",
      authorization: { params: { scope: scopes } },
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
