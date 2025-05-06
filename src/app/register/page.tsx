'use client'

import React from 'react'
import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema } from '../form-schema/register-form'
import { Form } from '@/components/ui/form'

export default function Register() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      sex: '',
      verifyCode: '',
    },
  })

  const { handleSubmit } = form

  const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
    console.log('data', data)
  }

  return (
    <div className='mt-16 flex flex-col items-center justify-center'>
      <div>Registration</div>

      {/* Register form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          
        </form>
      </Form>
    </div>
  )
}
