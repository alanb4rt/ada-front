import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App'
import ProtectedRoutes from './components/ProtectedRoutes'
import AuthPage from './pages/AuthPage'

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
])

export default function Router() {
  return <RouterProvider router={router} />
}
