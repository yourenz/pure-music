const isTauri = !!window?.__TAURI__
const isDev = import.meta.env.MODE === 'development'

function getRedirectUri() {
  let redirectUri = ''
  if (isDev) {
    if (isTauri)
      redirectUri = 'http://127.0.0.1:58944/callback'
    else
      redirectUri = 'http://127.0.0.1:5173/callback'
  }
  else {
    if (isTauri)
      redirectUri = 'http://127.0.0.1:58944/callback'
    else
    // prod redirectUri
      redirectUri = ''
  }
  return redirectUri
}

export default {
  isTauri,
  isDev,
  redirectUri: getRedirectUri(),
}
