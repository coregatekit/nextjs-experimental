import { jobsTable } from './schema'
import * as jobsData from './data/jobs.json'
import db from '.'

function main() {
  console.log('Seeding database...')
  seedJobs()
  console.log('Seeding completed!')
}

async function seedJobs() {
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

  console.log('Seeding jobs...')
  await db.insert(jobsTable).values(data).onConflictDoNothing()
  console.log('Jobs seeded successfully!')
}

main()
