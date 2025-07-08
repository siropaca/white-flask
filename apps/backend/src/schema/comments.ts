import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'
import { posts } from './posts'

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  authorName: varchar('author_name', { length: 50 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
})

export type Comment = typeof comments.$inferSelect
export type NewComment = typeof comments.$inferInsert
