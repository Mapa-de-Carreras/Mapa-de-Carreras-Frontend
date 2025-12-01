import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
  base: '/mapa2025',
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      // Shared
      "@components": path.resolve(__dirname, "./src/shared/components"),
      "@apis": path.resolve(__dirname, "./src/shared/apis"),
      "@lib": path.resolve(__dirname, "./src/shared/lib"),
      "@services": path.resolve(__dirname, "./src/shared/services"),
      "@hooks": path.resolve(__dirname, "./src/shared/hooks"),
      "@globalTypes": path.resolve(__dirname, "./src/shared/types"),
      "@data": path.resolve(__dirname, "./src/shared/data"),

      // Modules
      "@academic": path.resolve(__dirname, "./src/modules/academic"),
      "@academica": path.resolve(__dirname, "./src/modules/academica"),
      "@documentos": path.resolve(__dirname, "./src/modules/documentos"),
      "@designaciones": path.resolve(__dirname, "./src/modules/designaciones"),
      "@estadisticas": path.resolve(__dirname, "./src/modules/estadisticas"),
      "@docentes": path.resolve(__dirname, "./src/modules/docentes"),
      "@users": path.resolve(__dirname, "./src/modules/users"),
      "@usuarios": path.resolve(__dirname, "./src/modules/usuarios"),
      "@assets": path.resolve(__dirname, "./src/assets"),

      "@": path.resolve(__dirname, "./src"),
    },
  }
})