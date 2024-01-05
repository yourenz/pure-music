import '@/i18n/config.ts'
import './css/init.css'
import './css/global.css'
import { RouterProvider } from 'react-router-dom'
import router from '@/routers'
import { Toaster } from '@/components/ui/Sonner'

const App: React.FC = () => {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
