'use client'

import React from 'react'
import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema } from '../form-schema/register-form'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import RegisterScreenLabel from './label'
import { Input } from '@/components/ui/input'

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

  const { control, handleSubmit } = form

  const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
    console.log('data', data)
  }

  return (
    <div className='mt-16 flex flex-col items-center justify-center'>
      <div>{RegisterScreenLabel.title}</div>
      <div>{RegisterScreenLabel.subtitle}</div>

      {/* Register form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
          {/* Username */}
          <FormField control={control} name='username' render={({ field }) => (
            <FormItem>
              <FormLabel>{RegisterScreenLabel.username}</FormLabel>
              <Input placeholder={RegisterScreenLabel.placeholder.username} {...field}/>
              <FormMessage />
            </FormItem>
          )} />
        </form>
      </Form>
    </div>
  )
}
