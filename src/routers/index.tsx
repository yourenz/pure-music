import { createBrowserRouter, redirect } from 'react-router-dom'
import RouteErrorBoundary from '@/components/RouteErrorBoundary'
import Layout from '@/layout'
import Login from '@/pages/Login'
import CallBack from '@/pages/CallBack'
import { useLoginStore } from '@/store/system'

const isLogin = useLoginStore.getState().login
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
  {
    path: '/callback',
    element: <CallBack />,
    loader: async () => {
      if (isLogin)
        throw redirect('/')
      return {}
    },
  },
])

export default Routers
