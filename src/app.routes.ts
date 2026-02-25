import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { ROUTES } from '@shared/constants'

const TodayScreen = lazy(() =>
  import('./features/reader/today/screen/today-screen').then((m) => ({ default: m.TodayScreen })),
)
const LetterDetailScreen = lazy(() =>
  import('./features/reader/letter-detail/screen/letter-detail-screen').then((m) => ({ default: m.LetterDetailScreen })),
)
const ArchiveScreen = lazy(() =>
  import('./features/reader/archive/screen/archive-screen').then((m) => ({ default: m.ArchiveScreen })),
)
const BookmarksScreen = lazy(() =>
  import('./features/reader/bookmarks/screen/bookmarks-screen').then((m) => ({ default: m.BookmarksScreen })),
)
const SearchScreen = lazy(() =>
  import('./features/reader/search/screen/search-screen').then((m) => ({ default: m.SearchScreen })),
)
const AdminLoginScreen = lazy(() =>
  import('./features/admin/auth/screen/login-screen').then((m) => ({ default: m.LoginScreen })),
)
const AdminDashboardScreen = lazy(() =>
  import('./features/admin/dashboard/screen/dashboard-screen').then((m) => ({ default: m.DashboardScreen })),
)
const LetterEditorScreen = lazy(() =>
  import('./features/admin/letter-editor/screen/letter-editor-screen').then((m) => ({ default: m.LetterEditorScreen })),
)
const CommentManagerScreen = lazy(() =>
  import('./features/admin/comment-manager/screen/comment-manager-screen').then((m) => ({ default: m.CommentManagerScreen })),
)
const MediaManagerScreen = lazy(() =>
  import('./features/admin/media-manager/screen/media-manager-screen').then((m) => ({ default: m.MediaManagerScreen })),
)

import { AdminLayout } from './features/admin/admin-layout'
import { ReaderLayout } from './features/reader/reader-layout'
import { AuthGuard } from './features/admin/auth/guards/auth-guard'

export const routes: RouteObject[] = [
  {
    element: ReaderLayout,
    children: [
      { path: ROUTES.HOME, element: TodayScreen },
      { path: ROUTES.LETTER, element: LetterDetailScreen },
      { path: ROUTES.ARCHIVE, element: ArchiveScreen },
      { path: ROUTES.BOOKMARKS, element: BookmarksScreen },
      { path: ROUTES.SEARCH, element: SearchScreen },
    ],
  },
  {
    path: ROUTES.ADMIN.LOGIN,
    element: AdminLoginScreen,
  },
  {
    path: ROUTES.ADMIN.ROOT,
    element: AuthGuard,
    children: [
      {
        element: AdminLayout,
        children: [
          { path: ROUTES.ADMIN.DASHBOARD, element: AdminDashboardScreen },
          { path: ROUTES.ADMIN.LETTER_NEW, element: LetterEditorScreen },
          { path: ROUTES.ADMIN.LETTER_EDIT, element: LetterEditorScreen },
          { path: ROUTES.ADMIN.COMMENTS, element: CommentManagerScreen },
          { path: ROUTES.ADMIN.MEDIA, element: MediaManagerScreen },
        ],
      },
    ],
  },
]
