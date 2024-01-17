declare namespace SpotifyApi {

  /**
   * getAccessToken
   */
  interface TokenOption {
    client_id: string
    grant_type: 'authorization_code' | 'refresh_token'
    code?: string
    redirect_uri?: string
    code_verifier?: string
    refresh_token?: string
  }
  interface TokenRes {
    access_token: string
    expires_in: number
    refresh_token: string
    scope: string
    token_type: string
  }

  /**
   *TransferPlayback
   */
  interface TransferPlaybackOption {
    device_ids: string[] // A JSON array containing the ID of the device on which playback should be started/transferred.
    play?: boolean // true: ensure playback happens on new device, false or not provided: keep the current playback state.
  }

  interface TransferPlaybackRes {
    success: boolean // Indicates whether the transfer operation was successful
    message?: string // Optional message providing additional information about the transfer operation
  }

  interface DeviceObject {
    id: string | null // The device ID. This ID is unique and persistent to some extent. However, this is not guaranteed and any cached device_id should periodically be cleared out and refetched as necessary.
    is_active: boolean // If this device is the currently active device.
    is_private_session: boolean // If this device is currently in a private session.
    is_restricted: boolean // Whether controlling this device is restricted. At present if this is "true" then no Web API commands will be accepted by this device.
    name: string // A human-readable name for the device. Some devices have a name that the user can configure (e.g. "Loudest speaker") and some devices have a generic name associated with the manufacturer or device model. Example: "Kitchen speaker"
    type: string // Device type, such as "computer", "smartphone" or "speaker". Example: "computer"
    volume_percent: number | null // The current volume in percent. Range: 0 - 100. Example: 59
    supports_volume: boolean // If this device can be used to set the volume.
  }

  interface AvailableDevicesRes {
    devices: DeviceObject[] // A set of devices
  }

}
