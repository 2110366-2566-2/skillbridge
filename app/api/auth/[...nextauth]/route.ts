import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient()
let userType = ""

export const authOptions: AuthOptions = {
  // adapter: PrismaAdapter(prisma),
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
        if (!credentials?.email || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) return null

        const isMatch = await bcrypt.compare(credentials.password, user.hashedPassword)
        console.log("Match", isMatch)
        if (!isMatch) throw new Error("Invalid password")

        return user

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile, user, credentials }) {
      console.log("userType", userType)

      console.log(
        "signIn",
        "account",
        account,
        "profile",
        profile,
        "user",
        user,
        "credentials",
        credentials
      )
      if (account?.provider === "google" && profile?.email?.endsWith("21@student.chula.ac.th")) {
        console.log("Sign in success")

        return true
      } else if (account?.provider === "credentials") return true
      console.log("Sign in failed")

      return "/"
    },
    async jwt({ token, account, profile, user }) {
      console.log("jwt", "account", account, "profile", profile, "token", token, "user", user)
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account && profile) {
        token.accessToken = account.access_token
        token.profile = profile
      }
      if (user) token.user = user
      return token
    },
    session: async ({ session, token, user }) => {
      console.log("session", "session", session, "token", token, "user", user)
      return session
    },
  },
}

const handler = async (req: NextApiRequest, res: NextApiResponse) =>
  await NextAuth(req, res, authOptions)

export { handler as GET, handler as POST }
