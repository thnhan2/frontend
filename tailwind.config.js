/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bevietnampro': ['bevietnam', 'sans-serif'],
      },

      colors: {
        palette1: {
          'primary': '#ff9000',
          'secondary': '#ffd093',
          'black1': '#ffc738',
          'gray1': '#f5f5f5',
          'white1': '#ffffff',
        }
      }
    },
  },
  plugins: [],
}

