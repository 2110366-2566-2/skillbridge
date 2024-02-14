import { User as UserDB } from "@prisma/client"
import NextAuth, { Account } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserDB
    account: Account
    email: string
    exp: number
    expires: Date
    iat: number
    jti: string
    sub: string
  }

  interface User extends UserDB {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: User
    account: Account
    email: string
    exp: number
    expires: Date
    iat: number
    jti: string
    sub: string
  }
}
