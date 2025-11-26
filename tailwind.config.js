/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        holly: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        cranberry: {
          50: '#fdf2f4',
          100: '#fce7ea',
          500: '#be123c',
          600: '#a11d3a',
          700: '#9f1239',
        },
        gold: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#eab308',
        },
        cream: '#fdfbf7',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
