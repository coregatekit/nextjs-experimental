'use client'

import React, { useActionState, useTransition } from 'react'
import { SignInScreenLabel } from './label'
import { useForm } from 'react-hook-form'
import {
  SignInActionState,
  signInFormSchema,
  SingInFormSchema,
} from '../definitions/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signIn } from '@/app/actions/sign-in'

export default function SignIn() {
  const form = useForm<SingInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const initialState: SignInActionState = {
    status: 'idle',
    formData: new FormData(),
  }
  const [state, action] = useActionState(signIn, initialState)
  const [pending, startTransition] = useTransition()

  const onSubmit = (data: SingInFormSchema) => {
    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('password', data.password)

    startTransition(() => {
      action(formData)
    })
  }

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
                <FormMessage>{state.fieldErrors?.username}</FormMessage>
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>{SignInScreenLabel.password.label}</FormLabel>
                <Input
                  placeholder={SignInScreenLabel.password.placeholder}
                  {...field}
                  type='password'
                />
                <FormMessage>{state.fieldErrors?.password}</FormMessage>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type='submit'
            className='w-full cursor-pointer'
            disabled={pending}
          >
            {SignInScreenLabel.submit.label}
          </Button>
        </form>
      </Form>
    </div>
  )
}
