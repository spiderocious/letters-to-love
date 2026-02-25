export const ROUTES = {
  HOME: '/',
  LETTER: '/letter/:id',
  ARCHIVE: '/archive',
  BOOKMARKS: '/bookmarks',
  SEARCH: '/search',
  ADMIN: {
    ROOT: '/admin',
    LOGIN: '/admin/login',
    DASHBOARD: '/admin/dashboard',
    LETTER_NEW: '/admin/letters/new',
    LETTER_EDIT: '/admin/letters/:id/edit',
    COMMENTS: '/admin/comments',
    MEDIA: '/admin/media',
  },
} as const

export function letterPath(id: string): string {
  return `/letter/${id}`
}

export function letterEditPath(id: string): string {
  return `/admin/letters/${id}/edit`
}
