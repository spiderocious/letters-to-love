import { lazy, createElement } from 'react'
import type { RouteObject } from 'react-router-dom'
import { ROUTES } from '@shared/constants'
import { ReaderLayout } from './features/reader/reader-layout'
import { AdminLayout } from './features/admin/admin-layout'
import { AuthGuard } from './features/admin/auth/guards/auth-guard'

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
const LoginScreen = lazy(() =>
  import('./features/admin/auth/screen/login-screen').then((m) => ({ default: m.LoginScreen })),
)
const DashboardScreen = lazy(() =>
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

export const routes: RouteObject[] = [
  {
    element: createElement(ReaderLayout),
    children: [
      { path: ROUTES.HOME, element: createElement(TodayScreen) },
      { path: ROUTES.LETTER, element: createElement(LetterDetailScreen) },
      { path: ROUTES.ARCHIVE, element: createElement(ArchiveScreen) },
      { path: ROUTES.BOOKMARKS, element: createElement(BookmarksScreen) },
      { path: ROUTES.SEARCH, element: createElement(SearchScreen) },
    ],
  },
  {
    path: ROUTES.ADMIN.LOGIN,
    element: createElement(LoginScreen),
  },
  {
    path: ROUTES.ADMIN.ROOT,
    element: createElement(AuthGuard),
    children: [
      {
        element: createElement(AdminLayout),
        children: [
          { path: ROUTES.ADMIN.DASHBOARD, element: createElement(DashboardScreen) },
          { path: ROUTES.ADMIN.LETTER_NEW, element: createElement(LetterEditorScreen) },
          { path: ROUTES.ADMIN.LETTER_EDIT, element: createElement(LetterEditorScreen) },
          { path: ROUTES.ADMIN.COMMENTS, element: createElement(CommentManagerScreen) },
          { path: ROUTES.ADMIN.MEDIA, element: createElement(MediaManagerScreen) },
        ],
      },
    ],
  },
]
