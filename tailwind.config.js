/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        palestine: {
          green: '#007A3D',
          emerald: '#059669',
          red: '#CE1126',
          black: '#111827',
          white: '#FFFFFF',
          darkBg: '#0b0f19',
          cardDark: '#131b2e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        urdu: ['Jameel Noori Nastaleeq', 'Mehr Nastaliq', 'Gulzar', 'Noto Nastaliq Urdu', 'Urdu Typesetting', 'serif'],
        arabic: ['Amiri', 'Traditional Arabic', 'serif']
      }
    },
  },
  plugins: [],
}
