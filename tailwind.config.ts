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
        display: ['Cormorant Garamond', 'serif'],
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
        glow: '0 0 20px rgba(244, 160, 168, 0.5)',
        'glow-lg': '0 0 40px rgba(244, 160, 168, 0.7)',
      },
      animation: {
        'pulse-soft': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        heartbeat: 'heartbeat 0.9s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'draw-line': 'drawLine 0.8s ease-out forwards',
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
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.2)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.15)' },
          '70%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(3deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-2deg)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(244, 160, 168, 0.3)' },
          '50%': { boxShadow: '0 0 24px rgba(244, 160, 168, 0.8)' },
        },
        drawLine: {
          from: { transform: 'scaleY(0)', transformOrigin: 'top' },
          to: { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
      },
    },
  },
  plugins: [],
}

export default config
