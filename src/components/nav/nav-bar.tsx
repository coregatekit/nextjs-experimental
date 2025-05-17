import Link from 'next/link'
import React from 'react'

export default function NavBar() {
  return (
    <nav className='relative'>
      <div className='bg-secondary dark:bg-primary-foreground fixed flex h-16 w-full flex-row items-center justify-between p-8'>
        <Link href='/'>
          <div className='text-2xl font-bold'>Heroes MaSter</div>
        </Link>
        <div className='flex flex-row gap-4 text-lg font-bold'>
          <Link href='/application'>
            <div className=''>Start</div>
          </Link>
          <Link href='/register'>
            <div className=''>Register</div>
          </Link>
          <Link href='/member'>
            <div className=''>Member</div>
          </Link>
          <Link href='/shop'>
            <div className=''>Shop</div>
          </Link>
          <Link href='/guide'>
            <div className=''>Guide</div>
          </Link>
          <Link href='/contact'>
            <div className=''>Contact</div>
          </Link>
        </div>
      </div>
    </nav>
  )
}
