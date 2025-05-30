// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Azul (color principal y sus variantes)
        primary: {
          DEFAULT: '#4F82B1',
          light: '#6A9AC7',
          dark: '#3A6A96',
        },
        // Fondos
        custom: {
          background: '#EAF4F6',       // Celeste muy claro para fondo
          sidebarBg: '#DBEAEF',        // Variante más clara para sidebar
          navbarBg: '#4779A6',         // Azul oscuro para navbar
        },
        // Acentos
        accent: {
          1: '#BA6B5A',                // Terracota/rojizo
          2: '#7CA556',                // Verde
          3: '#A5D4E0',                // Celeste claro
        },
        // Botones
        button: {
          primary: '#4F82B1',          // Azul (principal)
          secondary: '#7CA556',        // Verde
          cancel: '#BA6B5A',           // Terracota/rojizo
        },
        // Texto
        text: {
          dark: '#2C3E50',             // Azul muy oscuro casi negro
          light: '#FFFFFF',            // Blanco
          muted: '#758A9B',            // Gris azulado para texto secundario
        },
        // Usuario
        user: {
          bubble: '#6A9AC7',           // Azul claro
        },
        // Estado
        state: {
          success: '#7CA556',          // Verde
          warning: '#E9B872',          // Amarillo tostado
          error: '#BA6B5A',            // Terracota/rojizo
          info: '#4F82B1'              // Azul (principal)
        },
        // Conservamos colores originales de emerald y teal para mantener compatibilidad
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
      }),
      backgroundImage: {
        'gradient-navbar': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-sidebar': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-button': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),  // Opcional: para mejores estilos de formularios
    require('tailwind-scrollbar'),  // Para la barra de desplazamiento personalizada
  ],
}