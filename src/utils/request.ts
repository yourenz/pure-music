import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import i18n from 'i18next'
import { toast } from 'sonner'
import apis from '@/apis'
import { useAuthStore } from '@/store/auth'

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 5000,
})

export function refreshToken() {
  const { refresh_token } = useAuthStore.getState().token
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
    const { access_token } = useAuthStore.getState().token
    if (access_token && !config.url?.includes('token'))
      config.headers.Authorization = `Bearer ${access_token}`
    if (config.url?.includes('token'))
      return config
    if (useAuthStore.getState().isExpired()) {
      if (!isRefreshing) {
        isRefreshing = true
        refreshToken()
          .then((res) => {
            const { access_token } = res
            useAuthStore.setState({
              token: res,
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
  (error: AxiosError<{ error: string, error_description: string }>) => {
    const msg = i18n.t(`request.errorText.${error.response?.status}`)
    toast.error(msg, {
      position: 'top-right',
      description: `${error.response?.data?.error} ${error.response?.data?.error_description}`,
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
