import db from '@/db'
import { usersTable } from '@/db/schema'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { username, password, email, sex } = await request.json()

    const user = await db
      .insert(usersTable)
      .values({
        username,
        password,
        email,
        sex,
      })
      .returning({ id: usersTable.id })

    return NextResponse.json(
      {
        message: 'User registered successfully',
        data: user,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error in signup route:', error)
    return NextResponse.json(
      {
        message: 'Error registering user',
      },
      { status: 500 },
    )
  }
}
