import db from '@/db'
import { classesTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get('job_id')
  try {
    const stmt = db.select().from(classesTable)

    if (jobId) {
      stmt.where(eq(classesTable.jobId, jobId))
    }

    const classes = await stmt.execute()
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
