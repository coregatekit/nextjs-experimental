'use client'

import React from 'react'
import type { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema } from '../form-schema/register-form'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import RegisterScreenLabel from './label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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

  const { control, handleSubmit, watch, setError } = form

  const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
    console.log('data', data)
  }

  const handleClickCheckUser = () => {
    if (watch('username') === 'aerichandesu') {
      setError('username', {
        type: 'manual',
        message: RegisterScreenLabel.message.existUser,
      })
    }
  }

  return (
    <div className='mt-16 flex flex-col items-center justify-center'>
      <div>{RegisterScreenLabel.title}</div>
      <div>{RegisterScreenLabel.subtitle}</div>

      {/* Register form */}
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-12 flex w-96 flex-col gap-4'
        >
          {/* Username */}
          <FormField
            control={control}
            name='username'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>{RegisterScreenLabel.username}</FormLabel>
                <div className='flex gap-2'>
                  <Input
                    placeholder={RegisterScreenLabel.placeholder.username}
                    {...field}
                    className='w-2/3'
                  />
                  <Button type="button" onClick={handleClickCheckUser}>{RegisterScreenLabel.button.checkUser}</Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
