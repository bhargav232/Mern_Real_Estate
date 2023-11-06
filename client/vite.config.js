import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig({
 
  server: { 
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
      
    },
  },
  plugins: [react()],
})

