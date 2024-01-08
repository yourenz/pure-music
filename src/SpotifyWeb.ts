import { open } from '@tauri-apps/api/shell'
import config from '@/config'
import apis from '@/apis'

/**
 * spotify scopes
 * https://developer.spotify.com/documentation/web-api/concepts/scopes
 */
const SCOPES = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'app-remote-control',
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-modify',
  'user-follow-read',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private',
  // 'user-soa-link',
  // 'user-soa-unlink',
  // 'user-manage-entitlements',
  // 'user-manage-partner',
  // 'user-create-partner'
]

interface SpotifyWebProps {
  clientId: string
  redirectUri: string
}

class SpotifyWeb {
  private clientId: SpotifyWebProps['clientId']
  private redirectUri: SpotifyWebProps['redirectUri']

  constructor({
    clientId,
    redirectUri,
  }: SpotifyWebProps) {
    this.clientId = clientId
    this.redirectUri = redirectUri
  }

  redirectToAuthCodeFlow = async () => {
    const verifier = this.generateCodeVerifier(128)
    const challenge = await this.generateCodeChallenge(verifier)
    localStorage.setItem('verifier', verifier)
    const params = new URLSearchParams()
    const scopeStr = SCOPES?.join(' ')
    params.append('client_id', this.clientId)
    params.append('response_type', 'code')
    params.append('redirect_uri', this.redirectUri)
    params.append('scope', scopeStr)
    params.append('code_challenge_method', 'S256')
    params.append('code_challenge', challenge)
    const url = `https://accounts.spotify.com/authorize?${params.toString()}`
    if (config.isTauri)
      await open(url)
    else
      window.location.href = url
  }

  getAccessToken = async (code: string) => {
    const verifier = localStorage.getItem('verifier')
    const res = await apis.auth.getAccessToken({
      client_id: this.clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.redirectUri,
      code_verifier: verifier!,
    })
    return res
  }

  private generateCodeVerifier = (length: number) => {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
  }

  private generateCodeChallenge = async (codeVerifier: string) => {
    const data = new TextEncoder().encode(codeVerifier)
    const digest = await window.crypto.subtle.digest('SHA-256', data)
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }
}

export default SpotifyWeb
