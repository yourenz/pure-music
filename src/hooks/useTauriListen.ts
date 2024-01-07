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
    const unlisten = async () => {
      const listener = await listen(eventName, (event) => {
        if (event?.payload)
          cb(event?.payload)
      })
      return listener
    }
    return () => {
      unlisten()
    }
  }, [eventName])
}

export default useTauriListen
