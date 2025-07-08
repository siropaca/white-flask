import { relations } from 'drizzle-orm'

// Export all tables
export * from './posts'
export * from './categories'
export * from './tags'
export * from './post-categories'
export * from './post-tags'
export * from './comments'
export * from './likes'

// Import tables for relations
import { posts } from './posts'
import { categories } from './categories'
import { tags } from './tags'
import { postCategories } from './post-categories'
import { postTags } from './post-tags'
import { comments } from './comments'
import { likes } from './likes'

// Define relationships
export const postsRelations = relations(posts, ({ many }) => ({
  categories: many(postCategories),
  tags: many(postTags),
  comments: many(comments),
  likes: many(likes),
}))

export const categoriesRelations = relations(categories, ({ many }) => ({
  posts: many(postCategories),
}))

export const tagsRelations = relations(tags, ({ many }) => ({
  posts: many(postTags),
}))

export const postCategoriesRelations = relations(postCategories, ({ one }) => ({
  post: one(posts, {
    fields: [postCategories.postId],
    references: [posts.id],
  }),
  category: one(categories, {
    fields: [postCategories.categoryId],
    references: [categories.id],
  }),
}))

export const postTagsRelations = relations(postTags, ({ one }) => ({
  post: one(posts, {
    fields: [postTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postTags.tagId],
    references: [tags.id],
  }),
}))

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}))

export const likesRelations = relations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
}))