import request from '@/utils/request'

/**
 * Get information about the user’s current playback state, including track or episode, progress, and active device.
 */
export async function getPlaybackState(options?: SpotifyApi.TrackRelinkingParameterObject) {
  return request<SpotifyApi.CurrentPlaybackResponse>('/me/player', {
    method: 'GET',
    ...(options || {}),
  })
}
