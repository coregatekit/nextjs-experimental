import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Contact() {
  return (
    <div className='flex h-96 w-full items-center justify-center'>
      <div className='flex w-2/3 flex-col items-center justify-center gap-4'>
        <h1 className='text-4xl font-bold'>Contact</h1>
        <p className='text-2xl font-semibold'>Joe Kim</p>
        <p className='text-xl font-semibold'>@coregatekit</p>
        <Link href='mailto:joesm.genie@gmail.com' className='text-lg'>
          joesm.genie@gmail.com
        </Link>
        <Link href='https://github.com/coregatekit' target='_blank'>
          {/* Check if the theme is dark or light */}
          <div className='dark:hidden'>
            <Image
              src={'/github-mark.svg'}
              width={48}
              height={48}
              alt='coregatekit'
              className='transition-opacity hover:opacity-80'
            />
          </div>
          <div className='hidden dark:block'>
            <Image
              src={'/github-mark-white.svg'}
              width={48}
              height={48}
              alt='coregatekit'
              className='transition-opacity hover:opacity-80'
            />
          </div>
        </Link>

        <div className='text-xl'>Buy me a coffee ☕️</div>
        <p>btc bc1qj0t7sxyuq80gchq2w3d5la9ly5tc7cmwnppfqw</p>
        <p>evm 0x9Cb226AA0F857F1ED562577e9Fe015d0C45d210a</p>
        <p>sol Hbt7UoZnZo4iYEoWbVLWrnPMRiYzSK7ACjWKcXhev5CX</p>
      </div>
    </div>
  )
}
