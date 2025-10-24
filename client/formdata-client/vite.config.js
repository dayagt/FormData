import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/FormData/', // Usa el nombre exacto de tu repositorio
});