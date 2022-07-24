/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tomato: {
          DEFAULT: '#CA4A1C',
          50: '#F9E9D2',
          100: '#F6DCBC',
          200: '#F0BE8F',
          300: '#EA9A62',
          400: '#E37035',
          500: '#CA4A1C',
          600: '#A23116',
          700: '#791D11',
          800: '#510E0B',
          900: '#280606',
        },
        clay: {
          DEFAULT: '#947B6B',
          50: '#F5F3F2',
          100: '#E7E2DE',
          200: '#CCC0B8',
          300: '#B09E92',
          400: '#947B6B',
          500: '#7F695C',
          600: '#6A574D',
          700: '#56463E',
          800: '#41352F',
          900: '#2C2420',
        },
      },
      fontFamily: {
        sans: [
          'Albert Sans',
          'system-ui',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Krona One',
          'system-ui',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
