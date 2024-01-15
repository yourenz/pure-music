declare namespace SpotifyApi {

  /**
   * getAccessToken
   */
  interface TokenRequest {
    client_id: string
    grant_type: 'authorization_code' | 'refresh_token'
    code?: string
    redirect_uri?: string
    code_verifier?: string
    refresh_token?: string
  }
  interface TokenResponse {
    access_token: string
    expires_in: number
    refresh_token: string
    scope: string
    token_type: string
  }

  /**
   *TransferPlayback
   */
  interface TransferPlaybackRequest {
    device_ids: string[] // A JSON array containing the ID of the device on which playback should be started/transferred.
    play?: boolean // true: ensure playback happens on new device, false or not provided: keep the current playback state.
  }

  interface TransferPlaybackResponse {
    success: boolean // Indicates whether the transfer operation was successful
    message?: string // Optional message providing additional information about the transfer operation
  }

}
