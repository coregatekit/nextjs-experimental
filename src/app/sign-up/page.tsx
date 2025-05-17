'use client'

import React, { useActionState } from 'react'
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

  const initialState: SignUpActionState = {
    status: 'idle',
    formData: new FormData(),
  }
  const [state, action, pending] = useActionState(signUp, initialState)

  const handleSubmit = (data: SignUpFormSchema) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString())
    })
    action(formData)
  }

  const handleCheckUser = async () => {}

  const handleCheckEmail = async () => {}

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
                  />
                  <Button type='button' onClick={handleCheckUser}>
                    {SignUpScreenLabel.button.checkUser}
                  </Button>
                </div>
                <FormMessage />
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
                  />
                </div>
                <FormMessage />
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
                  />
                </div>
                <FormMessage />
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
                <FormMessage />
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
