import '@/i18n/config.ts'
import './css/init.css'
import './css/global.css'
import { RouterProvider } from 'react-router-dom'
import router from '@/routers'

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
