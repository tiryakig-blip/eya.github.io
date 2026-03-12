import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold:       { DEFAULT: '#B8860B', light: '#D4A017', dark: '#8B6508' },
        terra:      { DEFAULT: '#C2714F', light: '#D4876A', dark: '#A05A3C' },
        sand:       { DEFAULT: '#E8D5B0', light: '#F5ECD8', dark: '#C9B58A' },
        stone:      { DEFAULT: '#6B6560', light: '#8C857F', dark: '#4A4440' },
        obsidian:   { DEFAULT: '#1C1917', light: '#2D2825' },
        parchment:  { DEFAULT: '#FAF8F5', dark: '#F0EBE3' },
      },
      fontFamily: {
        serif:  ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans:   ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
        'counter':   'counter 2s ease-out forwards',
        'shimmer':   'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
