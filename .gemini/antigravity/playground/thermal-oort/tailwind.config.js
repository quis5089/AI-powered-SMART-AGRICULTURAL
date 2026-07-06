/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#E8F5E9',
          DEFAULT: '#2E7D32',
          dark: '#1B5E20',
          accent: '#81C784',
        },
        earth: {
          light: '#FAF8F5',
          DEFAULT: '#8D6E63',
          dark: '#4E342E',
        }
      }
    },
  },
  plugins: [],
}
