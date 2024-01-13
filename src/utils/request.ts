import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import i18n from 'i18next'
import { toast } from 'sonner'
import { getDefaultStore } from 'jotai'
import dayjs from 'dayjs'
import { tokenAtom } from '@/atoms/spotify'
import apis from '@/apis'

const defaultStore = getDefaultStore()

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 5000,
})

function refreshToken() {
  const { refresh_token } = defaultStore.get(tokenAtom)
  return apis.auth.getAccessToken({
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    grant_type: 'refresh_token',
    refresh_token,
  })
}

let isRefreshing = false
let requests: any[] = []

instance.interceptors.request.use(
  (config) => {
    const { access_token, expires_in } = defaultStore.get(tokenAtom)
    if (access_token && !config.url?.includes('token'))
      config.headers.Authorization = `Bearer ${access_token}`
    if (config.url?.includes('token'))
      return config
    if (access_token && expires_in) {
      const timestamp = dayjs().unix()
      const isAfter = dayjs(timestamp).isAfter(expires_in)
      if (isAfter) {
        if (!isRefreshing) {
          isRefreshing = true
          refreshToken()
            .then((res) => {
              const { access_token, expires_in } = res
              defaultStore.set(tokenAtom, {
                ...res,
                expires_in: dayjs().add(expires_in, 'second').unix(),
              })
              config.headers.Authorization = `Bearer ${access_token}`
              isRefreshing = false
              return access_token
            }).then((access_token) => {
              requests.forEach(cb => cb(access_token))
              requests = []
            }).catch((res) => {
              console.error('refresh token error: ', res)
            })
        }
        const retryOriginalRequest = new Promise((resolve) => {
          requests.push((access_token: string) => {
            config.headers.Authorization = `Bearer ${access_token}`
            resolve(config)
          })
        })
        return retryOriginalRequest as any
      }
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError<{ error: string }>) => {
    const msg = i18n.t(`request.errorText.${error.response?.status}`)
    toast.error(msg, {
      position: 'top-right',
      description: error.response?.data?.error,
    })
    return Promise.reject(error.response?.data)
  },
)

export default function request<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  return instance.request({
    url,
    ...config,
  })
}
