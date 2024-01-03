import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  timeout: 5000,
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = ''
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
