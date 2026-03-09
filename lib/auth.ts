import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import prisma from "@/lib/db"

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined

        if (!email || !password) {
          throw new Error("Email and password are required")
        }

        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid email or password")
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword
        )

        if (!isPasswordValid) {
          throw new Error("Invalid email or password")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: Record<string, unknown>; user?: Record<string, unknown> }) {
      if (user) {
        token.id = user.id
        token.role = user.role || "user"
      }
      return token
    },
    async session({ session, token }: { session: Record<string, unknown>; token: Record<string, unknown> }) {
      if (session.user) {
        (session.user as Record<string, unknown>).id = token.id
        ;(session.user as Record<string, unknown>).role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
