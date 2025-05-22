import db from '@/db'
import { jobsTable } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const jobs = await db.select().from(jobsTable).execute()

    if (jobs.length === 0) {
      return NextResponse.json({ message: 'No jobs found' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Jobs fetched successfully',
      data: jobs,
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
