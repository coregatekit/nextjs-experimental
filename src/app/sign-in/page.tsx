'use client'

import React from 'react'
import { SignInScreenLabel } from './label'
import { useForm } from 'react-hook-form'
import { signInFormSchema, SingInFormSchema } from '../definitions/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export default function SignIn() {
  const form = useForm<SingInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: SingInFormSchema) => {}

  return (
    <div className='my-16 flex flex-col items-center justify-center'>
      <div className='text-xl font-bold'>{SignInScreenLabel.title}</div>
      <div className='text-lg'>{SignInScreenLabel.subtitle}</div>

      {/* Sign In form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mt-12 flex w-96 flex-col gap-4'
        >
          {/* Username */}
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>{SignInScreenLabel.username.label}</FormLabel>
                <Input
                  placeholder={SignInScreenLabel.username.placeholder}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
