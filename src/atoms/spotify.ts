import { atomWithStorage } from 'jotai/utils'

const tokenValue: SpotifyApi.TokenRes = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token') || '')
  : {
      access_token: '',
      expires_in: 0,
      refresh_token: '',
      scope: '',
      token_type: '',
    }

export const tokenAtom = atomWithStorage<SpotifyApi.TokenRes>('token', tokenValue)
