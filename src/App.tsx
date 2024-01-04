import { RouterProvider } from 'react-router-dom'
import router from '@/routers'
import './css/init.css'
import './css/global.css'

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
