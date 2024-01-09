import '@/i18n/config.ts'
import './css/init.css'
import './css/global.css'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import useTauriListen from '@/hooks/useTauriListen'
import router from '@/routers'
import { Toaster } from '@/components/ui/Sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const App: React.FC = () => {
  useTauriListen({ eventName: 'pure-music-received', cb: (paylod) => {
    const code = paylod?.substring(paylod?.indexOf('=') + 1)
    window.location.href = `/callback?code=${code}`
  } })

  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  )
}

export default App
