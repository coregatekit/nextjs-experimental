'use client'

import React, { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { signUpFormSchema, SignUpFormSchema } from '../definitions/sign-up'
import { zodResolver } from '@hookform/resolvers/zod'
import { EnumSex } from '../enums/sex'
import { SignUpScreenLabel } from './label'
import { Form } from '@/components/ui/form'
import { signUp } from '../actions/sign-up'

export default function Register() {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      sex: EnumSex.None,
      email: '',
      verifyCode: '',
    },
  })

  const [state, action, pending] = useActionState(signUp, undefined)

  return (
    <div className='my-16 flex flex-col items-center justify-center'>
      <div className='text-xl font-bold'>{SignUpScreenLabel.title}</div>
      <div className='text-lg'>{SignUpScreenLabel.subtitle}</div>

      {/* Sign-up form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(action)}></form>
      </Form>
    </div>
  )
}
