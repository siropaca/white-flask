import { pgTable, uuid, varchar, text, timestamp, pgEnum, index } from 'drizzle-orm/pg-core'

export const postStatusEnum = pgEnum('post_status', ['draft', 'published', 'archived'])

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  coverImageUrl: varchar('cover_image_url', { length: 500 }),
  status: postStatusEnum('status').default('draft').notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('posts_status_idx').on(table.status),
  index('posts_published_at_idx').on(table.publishedAt),
  index('posts_status_published_at_idx').on(table.status, table.publishedAt),
])

export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert