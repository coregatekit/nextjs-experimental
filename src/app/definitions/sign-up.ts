import { z } from 'zod'
import { EnumSex } from '../enums/sex'

export const signUpFormSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(6, { message: 'Username must be at least 6 characters long' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[a-zA-Z]/, {
      message: 'Password must contain at least one letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  confirmPassword: z
    .string({ required_error: 'Confirm password is required' })
    .min(6, { message: 'Confirm password must be at least 6 characters long' })
    .regex(/[a-zA-Z]/, {
      message: 'Password must contain at least one letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  sex: z.enum(
    [
      EnumSex.Male,
      EnumSex.Female,
      EnumSex.Other,
      EnumSex.PreferNotToSay,
      EnumSex.None,
    ],
    { required_error: 'Sex is required', message: 'Please select your sex' },
  ),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  verifyCode: z
    .string({
      required_error: 'Verification code is required',
    })
    .min(6, {
      message: 'Verification code must be at least 6 characters long',
    }),
})

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>
export type SignUpActionState = {
  status: 'idle' | 'success' | 'error'
  formData?: FormData
  message?: string
  fieldErrors?: {
    username?: string[]
    password?: string[]
    confirmPassword?: string[]
    sex?: string[]
    email?: string[]
    verifyCode?: string[]
  }
}
