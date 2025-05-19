import argon2 from 'argon2'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import db from '../db'
import { usersTable } from '../db/schema'
import { eq } from 'drizzle-orm'
import { authConfig } from './auth.config'
import { signInFormSchema } from './definitions/sign-in'

async function findUser(username: string) {
  return db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1)
}

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parsedCredentials = signInFormSchema.safeParse(credentials)
        if (!parsedCredentials.success) return null

        const foundUser = await findUser(
          parsedCredentials.data?.username as string,
        )
        if (foundUser.length === 0) return null

        const userData = foundUser[0]
        const passwordMatch = await argon2.verify(
          userData.password,
          credentials?.password as string,
        )
        if (passwordMatch) return userData
        return null
      },
    }),
  ],
})
