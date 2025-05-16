'use client'

import { Button } from '@/components/ui/button'
import { Check, ClipboardCopy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Contact() {
  const btcAddress = 'bc1qj0t7sxyuq80gchq2w3d5la9ly5tc7cmwnppfqw'
  const evmAddress = '0x9Cb226AA0F857F1ED562577e9Fe015d0C45d210a'
  const solAddress = 'Hbt7UoZnZo4iYEoWbVLWrnPMRiYzSK7ACjWKcXhev5CX'
  const [isCopiedBtc, setIsCopiedBtc] = useState(false)
  const [isCopiedEvm, setIsCopiedEvm] = useState(false)
  const [isCopiedSol, setIsCopiedSol] = useState(false)

  const handleCopyBtc = () => {
    navigator.clipboard.writeText(btcAddress)
    setIsCopiedBtc(true)
    setTimeout(() => {
      setIsCopiedBtc(false)
    }, 2000)
  }

  const handleCopyEvm = () => {
    navigator.clipboard.writeText(evmAddress)
    setIsCopiedEvm(true)
    setTimeout(() => {
      setIsCopiedEvm(false)
    }, 2000)
  }

  return (
    <div className='mt-16 flex w-full items-center justify-center'>
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
        <div className='flex flex-row items-center justify-center gap-4 text-sm'>
          <p>btc</p>
          <p>{btcAddress}</p>
          <Button variant='ghost' className='cursor-pointer text-sm' onClick={handleCopyBtc}>
            {isCopiedBtc ? (
              <span className='flex flex-row items-center gap-2'>
                <Check />
                Copied
              </span>
            ) : (
              <span className='flex flex-row items-center gap-2'>
                <ClipboardCopy />
                Copy
              </span>
            )}
          </Button>
        </div>
        <div className='flex flex-row items-center justify-center gap-4 text-sm'>
          <p>evm</p>
          <p>{evmAddress}</p>
          <Button variant='ghost' className='cursor-pointer text-sm' onClick={handleCopyEvm}>
            {isCopiedEvm ? (
              <span className='flex flex-row items-center gap-2'>
                <Check />
                Copied
              </span>
            ) : (
              <span className='flex flex-row items-center gap-2'>
                <ClipboardCopy />
                Copy
              </span>
            )}
          </Button>
        </div>
        <div className='flex flex-row items-center justify-center gap-4 text-sm'>
          <p>sol</p>
          <p>{solAddress}</p>
          <Button variant='ghost' className='cursor-pointer text-sm'>
            Copy
          </Button>
        </div>
      </div>
    </div>
  )
}
