/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5865F2',
          dark: '#454FBF'
        },
        secondary: '#2C2F33',
        accent: '#99AAB5',
        background: '#000000',
        surface: '#18191C',
        text: {
          DEFAULT: '#FFFFFF',
          secondary: '#B9BBBE'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [],
};