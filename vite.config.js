import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // Sin la barra al final
        target: 'http://backoffice.urbx.io',
        changeOrigin: true,
      }
    }
  }
});
