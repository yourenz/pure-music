import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/layout'
import Login from '@/pages/Login'
import RouteErrorBoundary from '@/components/RouteErrorBoundary'

const Routers = createBrowserRouter([
  {
    path: '/',
    errorElement: <RouteErrorBoundary />,
    element: <Layout />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default Routers
