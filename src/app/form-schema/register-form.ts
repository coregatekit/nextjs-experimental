import { z, type ZodType } from 'zod'
import type { RegisterForm } from '../types/register-form'
import { EnumSex } from '../enums/sex'

const registerFormSchema: ZodType<RegisterForm> = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(6, { message: 'Username must be at least 6 characters long' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' }),
  confirmPassword: z
    .string({ required_error: 'Confirm password is required' })
    .min(6, { message: 'Confirm password must be at least 6 characters long' }),
  sex: z.enum(
    [EnumSex.Male, EnumSex.Female, EnumSex.Other, EnumSex.PreferNotToSay],
    { required_error: 'Sex is required', message: 'Please select your sex' },
  ),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .min(1, { message: 'Email is required' }),
  verifyCode: z.string({
    required_error: 'Verification code is required',
  }).min(6, {
    message: 'Verification code must be at least 6 characters long',
  }),
})

export { registerFormSchema }
