import '@/i18n/config.ts'
import './css/init.css'
import './css/global.css'
import { RouterProvider } from 'react-router-dom'
import useTauriListen from '@/hooks/useTauriListen'
import router from '@/routers'
import { Toaster } from '@/components/ui/Sonner'

const App: React.FC = () => {
  useTauriListen({ eventName: 'pure-music-received', cb: (paylod) => {
    const code = paylod?.substring(paylod?.indexOf('=') + 1)
    window.location.href = `/callback?code=${code}`
  } })

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
