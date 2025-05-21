import { sql } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { EnumSex } from '@/app/enums/sex'

export const usersTable = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  sex: text('sex').notNull().default(EnumSex.PreferNotToSay),
  email: text('email').notNull().unique(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
})

export const jobsTable = sqliteTable('jobs', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  weapon: text('weapon').notNull(),
  description: text('description').notNull(),
  hp: integer('hp').notNull(),
  mp: integer('mp').notNull(),
  attack: integer('attack').notNull(),
  defense: integer('defense').notNull(),
  magic: integer('magic').notNull(),
  magicDefense: integer('magic_defense').notNull(),
  evasion: integer('evasion').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
})
