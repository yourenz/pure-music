import { create } from 'zustand'
import dayjs from 'dayjs'
import { devtools, logger, persist } from './middlewares'

interface AuthState {
  token: SpotifyApi.TokenResponse
  setToken: (token: SpotifyApi.TokenResponse) => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    logger(
      persist(
        set => ({
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
        }),
        { name: 'tokenStore' },
      ),
      'auth',
    ),
  ),
)
