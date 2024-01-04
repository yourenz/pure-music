// eslint.config.js
import antfu from '@antfu/eslint-config'

const ignores = [
  'dist',
  'node_modules',
  'public',
  'src/components/ui',
  'src-tauri',
  '*.config.js',
  '*.json',
  '*.yaml',
]

export default antfu(
  {
    react: true,
    formatters: true,
    rules: {
      'no-console': 'off',
    },
  },
  {
    ignores,
  },
)
