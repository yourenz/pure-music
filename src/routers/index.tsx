import { createBrowserRouter, redirect } from 'react-router-dom'
import { getDefaultStore } from 'jotai'
import Layout from '@/layout'
import Login from '@/pages/Login'
import RouteErrorBoundary from '@/components/RouteErrorBoundary'
import { loginAtom } from '@/atoms/system'

const defaultStore = getDefaultStore()
const isLogin = defaultStore.get(loginAtom)

const Routers = createBrowserRouter([
  {
    path: '/',
    errorElement: <RouteErrorBoundary />,
    element: <Layout />,
    loader: async () => {
      if (!isLogin)
        throw redirect('/login')
      return {}
    },

  },
  {
    path: '/login',
    element: <Login />,
    loader: async () => {
      if (isLogin)
        throw redirect('/')
      return {}
    },
  },
])

export default Routers
