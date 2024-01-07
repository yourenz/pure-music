/* eslint-disable node/prefer-global/process */
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint2'

export default defineConfig({
  plugins: [
    react(),
    eslint({
      cache: false,
      eslintPath: 'eslint/use-at-your-own-risk',
    }),
  ],
  clearScreen: false,
  server: {
    strictPort: true,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  envPrefix: ['VITE_', 'TAURI_PLATFORM', 'TAURI_ARCH', 'TAURI_FAMILY', 'TAURI_PLATFORM_VERSION', 'TAURI_PLATFORM_TYPE', 'TAURI_DEBUG'],
  build: {
    target: process.env.TAURI_PLATFORM === 'windows' ? 'chrome105' : 'safari13',
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (chunkInfo) => {
          const subDir = path.extname(chunkInfo.name).slice(1)
          return `${subDir}/[name].[hash].[ext]`
        },
        entryFileNames: 'js/[name].[hash].js',
        sourcemap: false,
      },
    },
  },
})
