// Define the WebPlaybackPlayer object
interface WebPlaybackPlayer {
  device_id: string
}
// Define the WebPlaybackState object
interface WebPlaybackState {
  context: {
    uri: string | null
    metadata: any | null
  }
  disallows: {
    pausing?: boolean
    peeking_next?: boolean
    peeking_prev?: boolean
    resuming?: boolean
    seeking?: boolean
    skipping_next?: boolean
    skipping_prev?: boolean
  }
  paused: boolean
  position: number
  duration: number
  repeat_mode: number
  shuffle: boolean
  track_window: {
    current_track: WebPlaybackTrack
    previous_tracks: WebPlaybackTrack[]
    next_tracks: WebPlaybackTrack[]
  }
}

// Define the WebPlaybackTrack object
interface WebPlaybackTrack {
  uri: string
  id: string | null
  type: 'track' | 'episode' | 'ad'
  media_type: 'audio' | 'video'
  name: string
  is_playable: boolean
  album: {
    uri: string
    name: string
    images: Array<{ url: string }>
  }
  artists: Array<{
    uri: string
    name: string
  }>
}

// Define the WebPlaybackError object
interface WebPlaybackError {
  message: string
}

// Define the player object with its methods, events, and the WebPlaybackState
interface SpotifyPlayer {
  connect: () => Promise<boolean>
  disconnect: () => void
  addListener(event_name: 'ready', callback: (player: WebPlaybackPlayer) => void): boolean
  addListener(event_name: 'not_ready', callback: (player: WebPlaybackPlayer) => void): boolean
  addListener(event_name: 'player_state_changed', callback: (state: WebPlaybackState) => void): boolean
  addListener(event_name: 'playback_error', callback: (error: WebPlaybackError) => void): boolean
  addListener(event_name: string, callback: (...args: any[]) => void): boolean // Fallback for other event names
  removeListener: (event_name: string, callback?: Function) => boolean
  getCurrentState: () => Promise<WebPlaybackState | null>
  setName: (name: string) => Promise<void>
  getVolume: () => Promise<number>
  setVolume: (volume: number) => Promise<void>
  pause: () => Promise<void>
  resume: () => Promise<void>
  togglePlay: () => Promise<void>
  seek: (position_ms: number) => Promise<void>
  previousTrack: () => Promise<void>
  nextTrack: () => Promise<void>
  activateElement: () => Promise<void>
  on: (event_name: string, callback: Function) => void // Type definition for adding event listeners
}

interface SpotifyWindow {
  Player: {
    new (config: {
      name: string
      getOAuthToken: (cb: (token: string) => void) => void
      volume: number
    }): SpotifyPlayer
  }
}
