import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import i18n from 'i18next'
import { toast } from 'sonner'
import { getDefaultStore } from 'jotai'
import { tokenAtom } from '@/atoms/spotify'

const defaultStore = getDefaultStore()

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = defaultStore.get(tokenAtom)?.access_token
    if (accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    const msg = i18n.t(`request.errorText.${error.response.status}`)
    toast.error(msg, {
      position: 'top-right',
    })
    return Promise.reject(error.response)
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
