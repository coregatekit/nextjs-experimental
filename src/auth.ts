import argon2 from 'argon2'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import db from './db'
import { usersTable } from './db/schema'
import { eq } from 'drizzle-orm'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        const findUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.username, credentials?.username as string))
          .limit(1)

        if (findUser.length === 0) {
          throw new Error('User not found')
        }

        const userData = findUser[0]
        const comparePassword = await argon2.verify(
          userData.password,
          credentials?.password as string,
        )

        if (comparePassword) {
          user = {
            id: userData.id,
            username: userData.username,
            email: userData.email,
          }
        } else {
          throw new Error('Invalid password')
        }

        return user
      },
    }),
  ],
})
