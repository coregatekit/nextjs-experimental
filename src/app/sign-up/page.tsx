'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { signUpFormSchema, SignUpFormSchema } from '../definitions/sign-up'
import { zodResolver } from '@hookform/resolvers/zod'
import { EnumSex } from '../enums/sex'
import { SignUpScreenLabel } from './label'

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

  return (
    <div className='my-16 flex flex-col items-center justify-center'>
      <div className='text-xl font-bold'>{SignUpScreenLabel.title}</div>
      <div className='text-lg'>{SignUpScreenLabel.subtitle}</div>
    </div>
  )
}
