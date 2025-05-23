'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUpFormSchema, SignUpFormSchema } from '../definitions/sign-up'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import RegisterScreenLabel from './label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { EnumSex } from '../enums/sex'
import { useRouter } from 'next/navigation'
import { generateCaptcha } from '@/lib/generators'
import useRegister from './hooks/use-register'

export default function Register() {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      sex: EnumSex.None,
    },
  })
  const { control, handleSubmit, watch, setError, clearErrors, reset } = form
  const { signup, check } = useRegister()
  const navigate = useRouter()

  const [checkedUsername, setCheckedUsername] = useState<string>('')
  const [isCheckUserPassed, setIsCheckUserPassed] = useState<boolean>(false)
  const [checkedEmail, setCheckedEmail] = useState<string>('')
  const [isCheckEmailPassed, setIsCheckEmailPassed] = useState<boolean>(false)
  const [captchaCode, setCaptchaCode] = useState<string>(generateCaptcha())
  const captchaCanvasRef = useRef<HTMLCanvasElement>(null)

  const username = watch('username')
  const email = watch('email')

  useEffect(() => {
    drawCaptcha(captchaCode)
  }, [captchaCode])

  useEffect(() => {
    if (username !== checkedUsername) {
      setIsCheckUserPassed(false)
      setCheckedUsername('')
    }
  }, [username, checkedUsername])

  useEffect(() => {
    if (email !== checkedEmail) {
      setIsCheckEmailPassed(false)
      setCheckedEmail('')
    }
  }, [email, checkedEmail])

  const onSubmit = (data: SignUpFormSchema) => {
    if (!isCheckUserPassed) {
      setError('username', {
        type: 'manual',
        message: RegisterScreenLabel.message.pleaseCheckUser,
      })
      toast.error('Error', {
        description: RegisterScreenLabel.message.pleaseCheckUser,
        position: 'top-right',
      })
      return
    }

    if (!isCheckEmailPassed) {
      setError('email', {
        type: 'manual',
        message: RegisterScreenLabel.message.pleaseCheckEmail,
      })
      toast.error('Error', {
        description: RegisterScreenLabel.message.pleaseCheckEmail,
        position: 'top-right',
      })
      return
    }

    signup.mutate(
      {
        username: data.username,
        password: data.password,
        email: data.email,
        sex: data.sex,
      },
      {
        onSuccess: () => {
          toast.success('Success', {
            description: RegisterScreenLabel.message.registerSuccess,
            position: 'top-right',
          })
          reset()
          setIsCheckUserPassed(false)
          navigate.replace('/')
        },
        onError: (error) => {
          toast.error('Error', {
            description: error.message,
            position: 'top-right',
          })
        },
      },
    )
  }

  const handleClickCheckUser = () => {
    if (!username) {
      setError('username', {
        type: 'manual',
        message: RegisterScreenLabel.message.emptyFieldUsername,
      })
      return
    }

    check.mutate(`username=${username}`, {
      onSuccess: () => {
        clearErrors('username')
        toast.success('Success', {
          description: RegisterScreenLabel.message.validUser,
          position: 'top-right',
        })
        setIsCheckUserPassed(true)
      },
      onError: () => {
        setError('username', {
          type: 'manual',
          message: RegisterScreenLabel.message.existUser,
        })
        toast.error('Error', {
          description: RegisterScreenLabel.message.existUser,
          position: 'top-right',
        })
      },
    })
  }

  const handleClickCheckEmail = () => {
    if (!email) {
      setError('email', {
        type: 'manual',
        message: RegisterScreenLabel.message.emptyFieldEmail,
      })
      return
    }

    check.mutate(`email=${email}`, {
      onSuccess: () => {
        clearErrors('email')
        toast.success('Success', {
          description: RegisterScreenLabel.message.validEmail,
          position: 'top-right',
        })
        setIsCheckEmailPassed(true)
      },
      onError: () => {
        setError('email', {
          type: 'manual',
          message: RegisterScreenLabel.message.existEmail,
        })
        toast.error('Error', {
          description: RegisterScreenLabel.message.existEmail,
          position: 'top-right',
        })
      },
    })
  }

  const regenerateCaptcha = () => {
    const newCaptchaCode = generateCaptcha()
    setCaptchaCode(newCaptchaCode)
    drawCaptcha(newCaptchaCode)
  }

  const drawCaptcha = (captcha: string) => {
    const canvas = captchaCanvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = '20px Arial'
        ctx.fillStyle = '#000'
        ctx.fillText(captcha, 7, 18)
      }
    }
  }

  return (
    <div className='my-16 flex flex-col items-center justify-center'>
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
                  <Button type='button' onClick={handleClickCheckUser}>
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
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>{RegisterScreenLabel.confirmPassword}</FormLabel>
                <div className='flex'>
                  <Input
                    type='password'
                    placeholder={
                      RegisterScreenLabel.placeholder.confirmPassword
                    }
                    {...field}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sex */}
          <FormField
            control={control}
            name='sex'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>{RegisterScreenLabel.sex}</FormLabel>
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
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex flex-col gap-2'>
                <FormLabel>{RegisterScreenLabel.email}</FormLabel>
                <div className='flex gap-2'>
                  <Input
                    placeholder={RegisterScreenLabel.placeholder.email}
                    {...field}
                  />
                  <Button type='button' onClick={handleClickCheckEmail}>
                    {RegisterScreenLabel.button.checkEmail}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Captcha */}
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2'>
              <canvas
                ref={captchaCanvasRef}
                width={100}
                height={20}
                className='rounded border bg-gray-200'
              />
            </div>
            <Button type='button' onClick={regenerateCaptcha} className='w-1/3'>
              {RegisterScreenLabel.button.refreshCaptcha}
            </Button>
          </div>

          {/* Submit Button */}
          <Button type='submit' className='w-full'>
            {RegisterScreenLabel.button.register}
          </Button>
        </form>
      </Form>
    </div>
  )
}
