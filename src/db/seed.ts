import { classesTable, jobsTable } from './schema'
import * as jobsData from './data/jobs.json'
import * as classesData from './data/classes.json'
import db from '.'
import { eq } from 'drizzle-orm'

async function main() {
  console.log('Seeding database...')
  await seedJobs()
  await seedClasses()
  console.log('Seeding completed!')
}

async function seedJobs(): Promise<void> {
  const data: (typeof jobsTable.$inferInsert)[] = []

  console.log('Preparing seed jobs data...')
  for (let i = 0; i < jobsData.length; i++) {
    data.push({
      name: jobsData[i].name,
      weapon: jobsData[i].weapon,
      description: jobsData[i].description,
      hp: jobsData[i].hp,
      mp: jobsData[i].mp,
      attack: jobsData[i].attack,
      defense: jobsData[i].defense,
      magic: jobsData[i].magic,
      magicDefense: jobsData[i].magicDefense,
      evasion: jobsData[i].evasion,
    })
  }

  console.log('Clearing jobs table...')
  await db.delete(jobsTable).execute()
  console.log('Seeding jobs...')
  await db.insert(jobsTable).values(data).onConflictDoNothing()
  console.log('Jobs seeded successfully!')
}

async function seedClasses(): Promise<void> {
  const data: (typeof classesTable.$inferInsert)[] = []

  console.log('Preparing seed classes data...')
  for (let i = 0; i < classesData.length; i++) {
    const jobs = await db
      .select({ id: jobsTable.id })
      .from(jobsTable)
      .where(eq(jobsTable.name, classesData[i].job))
      .limit(1)
      .execute()
    if (jobs.length === 0) {
      console.error(
        `Job ${classesData[i].job} not found for class ${classesData[i].name}. Skipping...`,
      )
      continue
    }
    data.push({
      name: classesData[i].name,
      description: classesData[i].description,
      classLevel: classesData[i].classLevel,
      requiredHonor: classesData[i].requiredHonor,
      hp: classesData[i].hp,
      mp: classesData[i].mp,
      attack: classesData[i].attack,
      defense: classesData[i].defense,
      magic: classesData[i].magicAttack,
      magicDefense: classesData[i].magicDefense,
      evasion: classesData[i].evasion,
      jobId: jobs[0].id,
    })
  }

  console.log('Clearing classes table...')
  await db.delete(classesTable).execute()
  console.log('Seeding classes...')
  await db.insert(classesTable).values(data).onConflictDoNothing()
  console.log('Classes seeded successfully!')
}

main()
