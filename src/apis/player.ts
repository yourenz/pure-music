import request from '@/utils/request'

export async function transferPlayback(options?: SpotifyApi.TransferPlaybackRequest) {
  return request<SpotifyApi.TransferPlaybackResponse>('/me/player', {
    method: 'GET',
    data: options,
  })
}
