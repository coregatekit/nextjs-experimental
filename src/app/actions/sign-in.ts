'use server'

import { AuthError } from 'next-auth';
import { signIn } from 'next-auth/react';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid username or password'
        default:
          return 'Something went wrong'
      }
    }
    throw error
  }
}