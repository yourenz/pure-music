// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  formatters: true,
  ignores: ['node_modules/*', 'public/*', 'dist/*', 'src-tauri/*'],
})
