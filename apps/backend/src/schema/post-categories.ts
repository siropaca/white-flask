import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core'
import { posts } from './posts'
import { categories } from './categories'

export const postCategories = pgTable('post_categories', {
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
}, (table) => ({
  pk: primaryKey({ columns: [table.postId, table.categoryId] })
}))

export type PostCategory = typeof postCategories.$inferSelect
export type NewPostCategory = typeof postCategories.$inferInsert