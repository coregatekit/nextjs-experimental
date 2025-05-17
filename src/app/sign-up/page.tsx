'use client'

import React, {
  useActionState,
  useEffect,
  useState,
  useTransition,
} from 'react'
import { useForm } from 'react-hook-form'
import {
  SignUpActionState,
  signUpFormSchema,
  SignUpFormSchema,
} from '../definitions/sign-up'
import { zodResolver } from '@hookform/resolvers/zod'
import { EnumSex } from '../enums/sex'
import { SignUpScreenLabel } from './label'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { signUp } from '../actions/sign-up'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import useRegister from '../register/hooks/use-register'
import { toast } from 'sonner'

export default function SingUp() {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      sex: EnumSex.None,
      email: '',
    },
  })

  const initialState: SignUpActionState = {
    status: 'idle',
    formData: new FormData(),
  }
  const [state, action] = useActionState(signUp, initialState)
  const [pending, startTransition] = useTransition()
  const { check } = useRegister()

  const username = form.watch('username')
  const email = form.watch('email')

  const [checkedUsername, setCheckedUsername] = useState('')
  const [checkedUsernamePassed, setCheckedUsernamePassed] = useState(false)
  const [checkedEmail, setCheckedEmail] = useState('')
  const [checkedEmailPassed, setCheckedEmailPassed] = useState(false)

  useEffect(() => {
    if (checkedUsername && checkedUsername !== username) {
      setCheckedUsernamePassed(false)
      setCheckedUsername('')
    }
  }, [checkedUsername, username])

  useEffect(() => {
    if (checkedEmail && checkedEmail !== email) {
      setCheckedEmailPassed(false)
      setCheckedEmail('')
    }
  }, [checkedEmail, email])

  const handleSubmit = (data: SignUpFormSchema) => {
    if (!checkedUsernamePassed) {
      form.setError('username', {
        type: 'manual',
        message: SignUpScreenLabel.message.pleaseCheckUser,
      })
      return
    }
    if (!checkedEmailPassed) {
      form.setError('email', {
        type: 'manual',
        message: SignUpScreenLabel.message.pleaseCheckEmail,
      })
      return
    }

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString())
    })
    startTransition(() => {
      action(formData)
    })
  }

  const handleCheckUser = async () => {
    if (!username) {
      form.setError('username', {
        type: 'manual',
        message: SignUpScreenLabel.message.emptyFieldUsername,
      })
      return
    }

    check.mutate(`username=${username}`, {
      onSuccess: () => {
        form.clearErrors('username')
        setCheckedUsername(username)
        setCheckedUsernamePassed(true)
        toast.success('Success', {
          description: SignUpScreenLabel.message.validUser,
          position: 'top-right',
        })
      },
      onError: () => {
        form.setError('username', {
          type: 'manual',
          message: SignUpScreenLabel.message.existUser,
        })
        setCheckedUsername('')
        setCheckedUsernamePassed(false)
        toast.error('Error', {
          description: SignUpScreenLabel.message.existUser,
          position: 'top-right',
        })
      },
    })
  }

  const handleCheckEmail = async () => {
    if (!email) {
      form.setError('email', {
        type: 'manual',
        message: SignUpScreenLabel.message.emptyFieldEmail,
      })
      return
    }

    check.mutate(`email=${email}`, {
      onSuccess: () => {
        form.clearErrors('email')
        setCheckedEmail(email)
        setCheckedEmailPassed(true)
        toast.success('Success', {
          description: SignUpScreenLabel.message.validEmail,
          position: 'top-right',
        })
      },
      onError: () => {
        form.setError('email', {
          type: 'manual',
          message: SignUpScreenLabel.message.existEmail,
        })
        setCheckedEmail('')
        setCheckedEmailPassed(false)
        toast.error('Error', {
          description: SignUpScreenLabel.message.existEmail,
          position: 'top-right',
        })
      },
    })
  }

  return (
    <div className='my-16 flex flex-col items-center justify-center'>
      <div className='text-xl font-bold'>{SignUpScreenLabel.title}</div>
      <div className='text-lg'>{SignUpScreenLabel.subtitle}</div>

      {/* Sign-up form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='mt-12 flex w-96 flex-col gap-4'
        >
          {/* Username */}
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>{SignUpScreenLabel.username}</FormLabel>
                <div className='flex gap-2'>
                  <Input
                    placeholder={SignUpScreenLabel.placeholder.username}
                    {...field}
                    disabled={pending}
                  />
                  <Button type='button' onClick={handleCheckUser}>
                    {SignUpScreenLabel.button.checkUser}
                  </Button>
                </div>
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
                <FormLabel>{SignUpScreenLabel.password}</FormLabel>
                <div className='flex'>
                  <Input
                    type='password'
                    placeholder={SignUpScreenLabel.placeholder.password}
                    {...field}
                    disabled={pending}
                  />
                </div>
                <FormMessage>{state.fieldErrors?.password}</FormMessage>
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>{SignUpScreenLabel.confirmPassword}</FormLabel>
                <div className='flex'>
                  <Input
                    type='password'
                    placeholder={SignUpScreenLabel.placeholder.confirmPassword}
                    {...field}
                    disabled={pending}
                  />
                </div>
                <FormMessage>{state.fieldErrors?.confirmPassword}</FormMessage>
              </FormItem>
            )}
          />

          {/* Sex */}
          <FormField
            control={form.control}
            name='sex'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>{SignUpScreenLabel.sex}</FormLabel>
                <div className='flex'>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-row'
                      disabled={pending}
                    >
                      <FormItem className='flex'>
                        <FormControl>
                          <RadioGroupItem value={EnumSex.Male} />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {EnumSex.Male}
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex'>
                        <FormControl>
                          <RadioGroupItem value={EnumSex.Female} />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {EnumSex.Female}
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex'>
                        <FormControl>
                          <RadioGroupItem value={EnumSex.Other} />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {EnumSex.Other}
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex'>
                        <FormControl>
                          <RadioGroupItem value={EnumSex.PreferNotToSay} />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {EnumSex.PreferNotToSay}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </div>
                <FormMessage>{state.fieldErrors?.sex}</FormMessage>
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>{SignUpScreenLabel.email}</FormLabel>
                <div className='flex gap-2'>
                  <Input
                    placeholder={SignUpScreenLabel.placeholder.email}
                    {...field}
                    disabled={pending}
                  />
                  <Button type='button' onClick={handleCheckEmail}>
                    {SignUpScreenLabel.button.checkEmail}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type='submit' className='w-full cursor-pointer'>
            {SignUpScreenLabel.button.signUp}
          </Button>
        </form>
      </Form>
    </div>
  )
}
