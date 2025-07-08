import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core'

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 30 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
})

export type Tag = typeof tags.$inferSelect
export type NewTag = typeof tags.$inferInsert