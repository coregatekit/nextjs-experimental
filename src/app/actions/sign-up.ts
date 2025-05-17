'use server'

import { SignUpActionState, signUpFormSchema } from '@/app/definitions/sign-up'
import db from '@/db'
import { usersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import argon2 from 'argon2'
import { redirect } from 'next/navigation'

export async function signUp(
  _initialState: SignUpActionState,
  formData: FormData,
): Promise<SignUpActionState> {
  const form = Object.fromEntries(formData.entries())
  console.log('Triggered signUp action with form data:', form)

  const parsedForm = signUpFormSchema.safeParse(form)
  if (!parsedForm.success) {
    return {
      status: 'error',
      fieldErrors: parsedForm.error.flatten().fieldErrors,
    }
  }

  const [username] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, parsedForm.data.username))

  if (username) {
    return {
      status: 'error',
      fieldErrors: {
        username: ['Username already exists'],
      },
    }
  }

  const [email] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, parsedForm.data.email))

  if (email) {
    return {
      status: 'error',
      fieldErrors: {
        email: ['Email already exists'],
      },
    }
  }

  const hashedPassword = await argon2.hash(parsedForm.data.password, {
    type: argon2.argon2id,
    hashLength: 32,
    timeCost: 3,
    memoryCost: 2 ** 16,
    parallelism: 1,
  })

  const user = await db.insert(usersTable).values({
    username: parsedForm.data.username,
    password: hashedPassword,
    email: parsedForm.data.email,
    sex: parsedForm.data.sex,
  })

  if (!user) {
    return {
      status: 'error',
      message: 'Error creating user',
    }
  }

  redirect('/')
}
