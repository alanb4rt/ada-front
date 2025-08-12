import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import AuthPage from './pages/AuthPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
