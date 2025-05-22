import db from '@/db'
import { classesTable } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const classes = await db.select().from(classesTable).execute()

    if (classes.length === 0) {
      return NextResponse.json({ message: 'No classes found' }, { status: 404 })
    }

    return NextResponse.json(
      {
        message: 'Classes fetched successfully',
        data: classes,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
