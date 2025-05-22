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
  updatedAt: text('updated_at')
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
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
})

export const classesTable = sqliteTable('classes', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  classLevel: integer('class_level').notNull(),
  requiredHonor: integer('required_honor').notNull(),
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
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  jobId: text('job_id')
    .notNull()
    .references(() => jobsTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
})

export const charactersTable = sqliteTable('characters', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text('name').notNull(),
  honorPoints: integer('honor_points').notNull(),
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
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(current_timestamp)`)
    .$onUpdate(() => sql`(current_timestamp)`),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  classId: text('class_id')
    .notNull()
    .references(() => classesTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  jobId: text('job_id')
    .notNull()
    .references(() => jobsTable.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
})
