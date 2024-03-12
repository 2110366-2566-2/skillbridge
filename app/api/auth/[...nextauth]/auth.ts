import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcrypt";


export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isMatch) throw new Error("Invalid password");

        return user;
        // Any object returned will be saved in `user` property of the JWT
        // If you return null then an error will be displayed advising the user to check their details.
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile, user, credentials }) {
      console.log(
        "signIn",
        "account",
        account,
        "profile",
        profile,
        "user",
        user,
        "credentials",
        credentials,
      );
      if (
        account?.provider === "google" &&
        profile?.email?.endsWith("21@student.chula.ac.th")
      ) {
        console.log("Sign in success");

        return true;
      } else if (account?.provider === "credentials") return true;
      console.log("Sign in failed");

      return "/";
    },
    async jwt({ token, account, profile, user }) {
      console.log(
        "jwt",
        "account",
        account,
        "profile",
        profile,
        "token",
        token,
        "user",
        user,
      );
      if (account) token.account = account;
      if (profile) token.profile = profile;
      if (user) token.user = user;
      return token;
    },
    async session({ session, token, user }) {
      console.log("session", "session", session, "token", token, "user", user);
      return { ...token, expires: session.expires };
    },
  },
};
