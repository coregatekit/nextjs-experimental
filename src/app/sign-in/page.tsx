import React from 'react'
import { SignInScreenLabel } from './label'

export default function SignIn() {
  return (
    <div className='my-16 flex flex-col items-center justify-center'>
      <div className='text-xl font-bold'>{SignInScreenLabel.title}</div>
      <div className='text-lg'>{SignInScreenLabel.subtitle}</div>
    </div>
  )
}
