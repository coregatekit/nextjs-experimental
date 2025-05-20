import argon2 from 'argon2'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import db from './db'
import { usersTable } from './db/schema'
import { eq } from 'drizzle-orm'
import { authConfig } from './auth.config'
import { signInFormSchema } from './app/definitions/sign-in'

async function findUser(username: string) {
  try {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1)

    return user[0]
  } catch (error) {
    console.error('Error finding user:', error)
    throw new Error('Failed to find user')
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
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

        const user = await findUser(
          parsedCredentials.data?.username as string,
        )

        const passwordMatch = await argon2.verify(
          user.password,
          credentials?.password as string,
        )
        if (passwordMatch) return user
        return null
      },
    }),
  ],
})
