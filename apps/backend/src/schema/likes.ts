import { pgTable, uuid, timestamp, index } from 'drizzle-orm/pg-core'
import { posts } from './posts.js'

export const likes = pgTable(
  'likes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => [
    index('likes_post_id_idx').on(table.postId),
    index('likes_created_at_idx').on(table.createdAt),
  ],
)

export type Like = typeof likes.$inferSelect
export type NewLike = typeof likes.$inferInsert
