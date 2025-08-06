import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/youtube-clone/', // Replace with your repo name
  plugins: [react()],
});
