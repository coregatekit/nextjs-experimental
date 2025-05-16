import db from '@/db'
import { usersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const username = searchParams.get('username')
    const email = searchParams.get('email')

    if (!username && !email) {
      return NextResponse.json(
        { message: 'Username or email is required' },
        { status: 400 }
      )
    }

    const checkAvailability = async (field: 'username' | 'email', value: string) => {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable[field], value))
        .execute()
      
      if (user.length > 0) {
        return NextResponse.json(
          { message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` },
          { status: 409 }
        )
      } else {
        return NextResponse.json(
          { message: `${field.charAt(0).toUpperCase() + field.slice(1)} available` },
          { status: 200 }
        )
      }
    }

    if (username) {
      return await checkAvailability('username', username)
    }
    
    if (email) {
      return await checkAvailability('email', email)
    }
  } catch (error) {
    console.error('Error in check route:', error)
    return NextResponse.json(
      { message: 'Error checking user' },
      { status: 500 }
    )
  }
}
