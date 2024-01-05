export default {
  isTauri: !!window?.__TAURI__,
  isDev: import.meta.env.MODE === 'development',
}
