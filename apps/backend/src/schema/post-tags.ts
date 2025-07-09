import { pgTable, uuid, primaryKey, index } from 'drizzle-orm/pg-core'
import { posts } from './posts.js'
import { tags } from './tags.js'

export const postTags = pgTable(
  'post_tags',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.tagId] }),
    index('post_tags_post_id_idx').on(table.postId),
    index('post_tags_tag_id_idx').on(table.tagId),
  ],
)

export type PostTag = typeof postTags.$inferSelect
export type NewPostTag = typeof postTags.$inferInsert
