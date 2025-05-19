import type { NextAuthConfig } from 'next-auth'
import { NextResponse } from 'next/server'

export const authConfig = {
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = auth?.user
      const isOnAppPage = nextUrl.pathname.startsWith('/application')

      if (isOnAppPage) {
        if (isLoggedIn) return true // user is logged in and on app page
        return false // redirect to sign-in page
      } else if (isLoggedIn) {
        const callbackUrl = nextUrl.searchParams.get('callbackUrl') || '/application'
        return NextResponse.redirect(new URL(callbackUrl, nextUrl))
      }
      return true // user is logged in and on sign-in page
    },
  },
  providers: [],
} satisfies NextAuthConfig
