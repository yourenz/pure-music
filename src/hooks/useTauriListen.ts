import { useEffect } from 'react'
import { listen } from '@tauri-apps/api/event'
import config from '@/config'

interface Pps {
  eventName: 'pure-music-received'
  cb: (paylod: any) => void
}

function useTauriListen(props: Pps) {
  const { eventName, cb } = props

  useEffect(() => {
    if (!config.isTauri)
      return
    const unlisten = listen(eventName, (event) => {
      cb(event.payload)
    })
    return () => {
      unlisten.then(f => f())
    }
  }, [])
}

export default useTauriListen
