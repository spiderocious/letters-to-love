import { Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppProvider } from './app.provider'
import { PageSpinner } from '@ui/components'
import { routes } from './app.routes'

const router = createBrowserRouter(routes)

export default function App() {
  return (
    <AppProvider>
      <Suspense fallback={<PageSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </AppProvider>
  )
}
