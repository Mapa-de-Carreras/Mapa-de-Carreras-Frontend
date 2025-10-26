import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Shared
      "@components": path.resolve(__dirname, "./src/shared/components"),
      "@apis": path.resolve(__dirname, "./src/shared/apis"),
      "@lib": path.resolve(__dirname, "./src/shared/lib"),

      // Modules
      "@academic": path.resolve(__dirname, "./src/modules/academic"),
      "@designations": path.resolve(__dirname, "./src/modules/designations"),
      "@management": path.resolve(__dirname, "./src/modules/management"),
      "@statistics": path.resolve(__dirname, "./src/modules/statistics"),
      "@teachers": path.resolve(__dirname, "./src/modules/teachers"),
      "@users": path.resolve(__dirname, "./src/modules/users"),

      "@": path.resolve(__dirname, "./src"),
    },
  },
})