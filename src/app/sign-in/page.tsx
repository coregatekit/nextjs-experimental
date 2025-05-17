import React from 'react'
import { SignInScreenLabel } from './label'
import { useForm } from 'react-hook-form'
import { signInFormSchema, SingInFormSchema } from '../definitions/sign-in'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'

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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          
        </form>
      </Form>
    </div>
  )
}
