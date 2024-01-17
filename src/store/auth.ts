import { create } from 'zustand'
import dayjs from 'dayjs'
import { devtools, logger, persist } from './middlewares'

interface AuthState {
  token: SpotifyApi.TokenRes
  setToken: (token: SpotifyApi.TokenRes) => void
  isExpired: () => boolean
}

export const useAuthStore = create<AuthState>()(
  devtools(
    logger(
      persist(
        (set, get) => ({
          token: {
            access_token: '',
            expires_in: 0,
            refresh_token: '',
            scope: '',
            token_type: '',
          },
          setToken: token => set(() => ({
            token: {
              ...token,
              expires_in: dayjs().add(token.expires_in, 'second').unix(),
            },
          })),
          isExpired: () => {
            const { access_token, expires_in } = get().token
            if (access_token && expires_in) {
              const timestamp = dayjs().unix()
              const isAfter = dayjs(timestamp).isAfter(expires_in)
              return isAfter
            }
            else {
              return true
            }
          },
        }),
        { name: 'tokenStore' },
      ),
      'auth',
    ),
  ),
)
