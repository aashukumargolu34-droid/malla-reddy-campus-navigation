/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        campus: {
          midnight: '#06121d',
          panel: '#0f1f2d',
          accent: '#38bdf8',
          mint: '#22c55e',
          gold: '#fbbf24',
          danger: '#f97316',
        },
      },
      boxShadow: {
        soft: '0 12px 40px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
};
