/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#F8FAFC',
        charcoal: '#0B0B12',
        night: '#11111A',
        panel: '#181824',
        violet: '#7C3AED',
        clay: '#7C3AED',
        moss: '#A78BFA',
        linen: '#0B0B12',
        stone: '#1F1F2E',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(124, 58, 237, 0.22)',
        glow: '0 0 35px rgba(124, 58, 237, 0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
