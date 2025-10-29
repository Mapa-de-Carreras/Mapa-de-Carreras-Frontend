// tailwind.config.ts
// import iconify from '@iconify/tailwind4' // <--- ELIMINA ESTO

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // iconify({ ... }), // <--- ¡ELIMINA TODO EL PLUGIN DE ICONIFY DE AQUÍ!
  ],
}