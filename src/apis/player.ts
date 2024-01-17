import request from '@/utils/request'

export async function transferPlayback(options?: SpotifyApi.TransferPlaybackOption) {
  return request<SpotifyApi.TransferPlaybackRes>('/me/player', {
    method: 'PUT',
    data: options,
  })
}

export async function getAvailableDevices() {
  return request<SpotifyApi.AvailableDevicesRes>('/me/player/devices', {
    method: 'GET',
  })
}
