import { pgTable, uuid, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { posts } from './posts'

export const commentStatusEnum = pgEnum('comment_status', ['pending', 'approved', 'spam'])

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  authorName: varchar('author_name', { length: 50 }).notNull(),
  authorEmail: varchar('author_email', { length: 255 }).notNull(),
  content: text('content').notNull(),
  status: commentStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
})

export type Comment = typeof comments.$inferSelect
export type NewComment = typeof comments.$inferInsert