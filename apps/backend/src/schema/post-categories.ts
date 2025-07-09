import { pgTable, uuid, primaryKey, index } from 'drizzle-orm/pg-core'
import { posts } from './posts.js'
import { categories } from './categories.js'

export const postCategories = pgTable(
  'post_categories',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id, { onDelete: 'cascade' }),
    categoryId: uuid('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.categoryId] }),
    index('post_categories_post_id_idx').on(table.postId),
    index('post_categories_category_id_idx').on(table.categoryId),
  ],
)

export type PostCategory = typeof postCategories.$inferSelect
export type NewPostCategory = typeof postCategories.$inferInsert
