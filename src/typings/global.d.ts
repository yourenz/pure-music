export {}
declare global {

  interface Window {
    __TAURI__?: any
    onSpotifyWebPlaybackSDKReady: () => void
    Spotify: SpotifyWindow
  }
}
