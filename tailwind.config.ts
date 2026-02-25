import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#F5C842',
          'yellow-light': '#FDE68A',
          'yellow-dark': '#D4A017',
        },
        romantic: {
          cream: '#FFF8F0',
          'cream-dark': '#F5EBE0',
          blush: '#F9B8C0',
          rose: '#F4A0A8',
          'rose-dark': '#E87080',
          brown: '#3D1F1F',
          'brown-light': '#6B3A3A',
          'brown-muted': '#9B6B6B',
        },
        dark: {
          bg: '#1A0A0A',
          surface: '#2D1515',
          border: '#4A2020',
          text: '#F5E6E0',
          muted: '#C49090',
        },
      },
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        romantic: '0 4px 24px rgba(244, 160, 168, 0.18)',
        'romantic-lg': '0 8px 40px rgba(244, 160, 168, 0.24)',
        card: '0 2px 12px rgba(61, 31, 31, 0.08)',
        'card-hover': '0 6px 24px rgba(61, 31, 31, 0.14)',
      },
      animation: {
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
