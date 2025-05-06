import React from 'react'

export default function NavBar() {
  return (
    <nav className='relative'>
      <div className='fixed flex flex-row items-center justify-between w-full h-16 bg-secondary dark:bg-primary-foreground'>
        <div>Logo</div>
        <div>Settings</div>
      </div>
    </nav>
  )
}
