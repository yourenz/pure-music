/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAtom } from 'jotai'
import dayjs from 'dayjs'
import config from '@/config'
import SpotifyWeb from '@/SpotifyWeb'
import { tokenAtom } from '@/atoms/spotify'
import { loginAtom } from '@/atoms/system'

const CallBack: React.FC = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const callbackCode = queryParams.get('code') as string
  const [, setToken] = useAtom(tokenAtom)
  const [, setLogin] = useAtom(loginAtom)

  const getAccessToken = async () => {
    const S = new SpotifyWeb({
      clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      redirectUri: config.redirectUri,
    })
    const res = await S.getAccessToken(callbackCode)
    setToken({
      ...res,
      expires_in: dayjs().add(res.expires_in, 'second').unix(),
    })
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
