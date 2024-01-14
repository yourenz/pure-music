/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import config from '@/config'
import SpotifyWeb from '@/SpotifyWeb'
import { useLoginStore } from '@/store/system'
import { useAuthStore } from '@/store/auth'

const CallBack: React.FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const callbackCode = queryParams.get('code') as string
  const setToken = useAuthStore().setToken
  const setLogin = useLoginStore().setLogin

  const getAccessToken = async () => {
    const S = new SpotifyWeb({
      clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      redirectUri: config.redirectUri,
    })
    const res = await S.getAccessToken(callbackCode)
    setToken(res)
    setLogin(true)
    window.location.href = '/'
  }

  useEffect(() => {
    if (!callbackCode)
      return
    getAccessToken()
  }, [callbackCode])

  return (
    <>
    </>
  )
}

export default CallBack
