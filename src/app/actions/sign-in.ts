'use server'

import { redirect } from 'next/navigation'
import { signIn as signInAction } from 'next-auth/react'
import { SignInActionState, signInFormSchema } from '../definitions/sign-in'

export async function signIn(
  _initialState: SignInActionState,
  formData: FormData,
): Promise<SignInActionState> {
  const form = Object.fromEntries(formData.entries())
  console.log('Triggered signIn action with form data:', form)

  const parsedForm = signInFormSchema.safeParse(form)
  if (!parsedForm.success) {
    return {
      formData,
      status: 'error',
      fieldErrors: parsedForm.error.flatten().fieldErrors,
    }
  }

  try {
    signInAction('credentials', {
      username: parsedForm.data.username,
      password: parsedForm.data.password,
    })
    redirect('/')
  } catch (error) {
    console.error('Error during sign-in:', error)
    return {
      formData,
      status: 'error',
      message: 'An error occurred during sign-in',
    }
  }
}
