import { z } from 'zod'

export const signInFormSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(6, {
      message: 'Username must be at least 6 characters long',
    }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, {
      message: 'Password must be at least 6 characters long',
    }),
})

export type SingInFormSchema = z.infer<typeof signInFormSchema>
export type SignInActionState = {
  status: 'idle' | 'success' | 'error'
  formData: FormData
  message?: string
  fieldErrors?: {
    username?: string[]
    password?: string[]
  }
}
