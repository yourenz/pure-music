import request from '@/utils/request'

/**
 *  getAccessToken
 * https://developer.spotify.com/documentation/web-api/concepts/access-token
 */
export async function getAccessToken(options?: SpotifyApi.TokenOption) {
  return request<SpotifyApi.TokenRes>('/api/token', {
    baseURL: 'https://accounts.spotify.com',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: options,
  })
}
