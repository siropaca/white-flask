import { pgTable, uuid, varchar, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core'

export const postStatusEnum = pgEnum('post_status', ['draft', 'published', 'archived'])

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 200 }).notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  coverImageUrl: varchar('cover_image_url', { length: 500 }),
  status: postStatusEnum('status').default('draft').notNull(),
  likeCount: integer('like_count').default(0).notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
})

export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert