'use client'

import React from 'react'
import { SignInScreenLabel } from './label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation'
import { LogIn } from 'lucide-react'

export default function SignIn() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/application'

  return (
    <div className='my-16 flex flex-col items-center justify-center'>
      <div className='text-xl font-bold'>{SignInScreenLabel.title}</div>
      <div className='text-lg'>{SignInScreenLabel.subtitle}</div>

      <form className='mt-12 flex w-96 flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='username'>{SignInScreenLabel.username.label}</label>
          <Input
            id='username-input'
            name='username'
            type='text'
            placeholder={SignInScreenLabel.username.placeholder}
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='password'>{SignInScreenLabel.password.label}</label>
          <Input
            id='password-input'
            name='password'
            type='password'
            placeholder={SignInScreenLabel.password.placeholder}
          />
        </div>

        <Input type='hidden' name='redirectTo' value={callbackUrl} />

        <Button type='submit' className='w-full cursor-pointer'>
          <LogIn />
          {SignInScreenLabel.submit.label}
        </Button>
      </form>
    </div>
  )
}
