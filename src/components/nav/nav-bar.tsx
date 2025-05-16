import React from 'react'

export default function NavBar() {
  return (
    <nav className='relative'>
      <div className='bg-secondary dark:bg-primary-foreground fixed flex h-16 w-full flex-row items-center justify-between'>
        <div>Logo</div>
        <div>Settings</div>
      </div>
    </nav>
  )
}
