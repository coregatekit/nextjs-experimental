'use client'

import Link from 'next/link'
import React, { useEffect, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { signOutAction } from '@/app/actions/sign-out'
import { usePathname, useRouter } from 'next/navigation'

export default function NavBar() {
  const { data: session, status, update } = useSession()
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction()
      router.refresh()
    })
  }

  return (
    <nav className='relative'>
      <div className='bg-secondary dark:bg-primary-foreground fixed flex h-16 w-full flex-row items-center justify-between p-8 shadow-md/10 dark:shadow-white/10'>
        <Link href='/'>
          <div className='text-2xl font-bold'>
            Heroes MaSter{' '}
            {status === 'authenticated' && <span>{session.user?.name}</span>}
          </div>
        </Link>
        <div className='flex flex-row gap-4 text-lg font-bold'>
          <Link href='/application'>
            <div className=''>
              {status === 'authenticated' ? 'Application' : 'Start'}
            </div>
          </Link>
          {status === 'unauthenticated' && (
            <Link href='/sign-up'>
              <div className=''>Register</div>
            </Link>
          )}
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
          {status === 'authenticated' && (
            <Button
              variant={'ghost'}
              onClick={handleSignOut}
              className='flex cursor-pointer items-center gap-2'
              disabled={isPending}
            >
              <LogOut />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
