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
import { toast } from 'sonner'

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

  const { control, handleSubmit, watch, setError, clearErrors } = form

  const username = watch('username')

  const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
    console.log('data', data)
  }

  const handleClickCheckUser = () => {
    if (!username) {
      setError('username', {
        type: 'manual',
        message: RegisterScreenLabel.message.emptyFieldUsername,
      })
      return
    }
    if (username === 'aerichandesu') {
      setError('username', {
        type: 'manual',
        message: RegisterScreenLabel.message.existUser,
      })
      toast.error('Error', {
        description: RegisterScreenLabel.message.existUser,
        position: 'top-right',
      })
      return
    }
    clearErrors('username')
    toast.success('Success', {
      description: RegisterScreenLabel.message.validUser,
      position: 'top-right',
    })
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
                  />
                  <Button
                    type='button'
                    onClick={handleClickCheckUser}
                  >
                    {RegisterScreenLabel.button.checkUser}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>{RegisterScreenLabel.password}</FormLabel>
                <div className='flex'>
                  <Input
                    type='password'
                    placeholder={RegisterScreenLabel.placeholder.password}
                    {...field}
                  />
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
