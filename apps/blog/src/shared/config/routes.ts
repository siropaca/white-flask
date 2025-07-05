export const ROUTES = {
  home: '/',
  blog: {
    index: '/blog',
    detail: (id: string) => `/blog/${id}`,
  },
  works: '/works',
  about: '/about',
  contact: '/contact',
} as const

export type Routes = typeof ROUTES
