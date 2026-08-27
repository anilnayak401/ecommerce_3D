/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050507',
          900: '#0A0A0E',
          850: '#111116',
          800: '#17171F',
          700: '#23232E',
          600: '#343444',
        },
        accent: {
          lime: '#E2F544',
          cyan: '#00F0FF',
          silver: '#E4E4E7',
          gold: '#DFB069',
        }
      },
      fontFamily: {
        display: ['Syne', 'Inter', 'sans-serif'],
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
