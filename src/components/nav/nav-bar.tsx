'use client'

import Link from 'next/link'
import React, { useEffect, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { signOutAction } from '@/app/actions/sign-out'
import { usePathname, useRouter } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import { cn } from '@/lib/utils'

export default function NavBar() {
  const { data: session, status, update } = useSession()
  const [, startTransition] = useTransition()
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
      <div className='fixed flex h-16 w-full flex-row items-center justify-between p-8 shadow-md/10 dark:shadow-white/10'>
        <Link href='/'>
          <div className='text-2xl font-bold'>
            Heroes MaSter{' '}
            {status === 'authenticated' && <span>{session.user?.name}</span>}
          </div>
        </Link>
        <div className='flex flex-row gap-4 text-lg font-bold'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                {status === 'unauthenticated' && (
                  <NavigationMenuLink
                    href='/sign-up'
                    className={cn(navigationMenuTriggerStyle())}
                  >
                    Register
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href='/application'
                  className={cn(navigationMenuTriggerStyle())}
                >
                  {status === 'authenticated' ? 'Application' : 'Start'}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href='/member'
                  className={cn(navigationMenuTriggerStyle())}
                >
                  Member
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href='/shop'
                  className={cn(navigationMenuTriggerStyle())}
                >
                  Shop
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href='/guide'
                  className={cn(navigationMenuTriggerStyle())}
                >
                  Guide
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href='/contact'
                  className={cn(navigationMenuTriggerStyle())}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>

              {status === 'authenticated' && (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle())}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  )
}
