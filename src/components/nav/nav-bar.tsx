import Link from 'next/link'
import React from 'react'

export default function NavBar() {
  return (
    <nav className='relative'>
      <div className='bg-secondary dark:bg-primary-foreground fixed flex h-16 w-full flex-row items-center justify-between p-8'>
        <Link href='/'>
          <div className='text-2xl font-bold'>Heroes MaSter</div>
        </Link>
        <div>Settings</div>
      </div>
    </nav>
  )
}
