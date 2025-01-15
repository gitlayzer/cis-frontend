import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    assetsInclude: ['**/*.png'],
    server: {
      port: 3000,
      proxy: command === 'serve' ? {
        '/api/v1': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'),
          secure: false
        }
      } : undefined
    },
    define: {
      'process.env': {}
    }
  }
}) 