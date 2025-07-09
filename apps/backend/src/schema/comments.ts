import { pgTable, uuid, varchar, text, timestamp, index } from 'drizzle-orm/pg-core'
import { posts } from './posts.js'

export const comments = pgTable(
  'comments',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    authorName: varchar('author_name', { length: 50 }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [index('comments_post_id_idx').on(table.postId)],
)

export type Comment = typeof comments.$inferSelect
export type NewComment = typeof comments.$inferInsert
