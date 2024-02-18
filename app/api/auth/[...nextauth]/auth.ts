import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import prisma from "@/db/prisma"

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
        if (!credentials?.email || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) throw new Error("User not found")

        const isMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

        if (!isMatch) throw new Error("Wrong password")

        return user
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile, user, credentials }) {
      if (account?.provider === "credentials" && user) return true
      console.log(
        "signIn Callback\n",
        "account\n",
        account,
        "profile\n",
        profile,
        "user\n",
        user,
        "credentials\n",
        credentials
      )
      if (account?.provider !== "google" || !profile || !user) return "/landing"

      const queriedUser = await prisma.user.findUnique({
        where: {
          email: profile.email,
        },
      })

      const isStudent = profile.email?.endsWith("@student.chula.ac.th")

      if (!queriedUser) {
        const defaultUserData = {
          salutation: "-",
          firstname: profile.given_name || "-",
          middlename: "",
          lastname: profile.family_name || "-",
          hashedPassword: "incomplete",
          email: profile.email || "",
          profileImageUrl: profile.picture,
          isGmail: true,
        }
        if (isStudent) {
          const student = await prisma.student.create({
            data: {
              user: {
                create: defaultUserData,
              },
            },
          })
        } else {
          const employer = await prisma.employer.create({
            data: {
              position: "-",
              organization: "-",
              publicEmail: profile.email || "",
              user: {
                create: defaultUserData,
              },
            },
          })
        }
      }

      return true
    },
    async jwt({ token, account, profile, user }) {
      // console.log("jwt Callback", "account\n", account, "token\n", token, "user\n", user)
      if (!account) return token

      token.account = account

      if (account.provider === "credentials") token.user = user as User
      else {
        const queriedUser = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        })

        if (queriedUser) {
          token.user = queriedUser
          token.sub = queriedUser.id
        }
      }

      // if (profile) token.profile = profile //Only Available on Google provider
      return token
    },
    async session({ session, token, user }) {
      // user is always undefined
      console.log("session Callback", "session\n", session, "token\n", token)

      return { ...token, expires: session.expires }
    },
  },
}
