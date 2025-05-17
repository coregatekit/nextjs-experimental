'use client'

import React, { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import {
  SignUpActionState,
  signUpFormSchema,
  SignUpFormSchema,
} from '../definitions/sign-up'
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

  const initialState: SignUpActionState = {
    status: 'idle',
    formData: new FormData(),
  }
  const [state, action, pending] = useActionState(signUp, initialState)
  
  const handleSubmit = (data: SignUpFormSchema) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    action(formData);
  };

  return (
    <div className='my-16 flex flex-col items-center justify-center'>
      <div className='text-xl font-bold'>{SignUpScreenLabel.title}</div>
      <div className='text-lg'>{SignUpScreenLabel.subtitle}</div>

      {/* Sign-up form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}></form>
      </Form>
    </div>
  )
}
