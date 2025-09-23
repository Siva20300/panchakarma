/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          500: '#6d28d9',
          600: '#4f46e5',
          700: '#4338ca',
        },
        ayur: {
          50: '#f0f9f5',
          100: '#dcf2e7',
          200: '#bce5d1',
          300: '#8dd1b1',
          400: '#5ab68a',
          500: '#5E8B7E',
          600: '#4a7366',
          700: '#3d5f54',
          800: '#334c45',
          900: '#2c3f3a',
        },
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
