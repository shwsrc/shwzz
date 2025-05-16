/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        discord: {
          blue: '#5865F2',
          dark: '#2C2F33',
          darker: '#1E1F22',
          pink: '#EB459E',
        },
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce': 'bounce 1s infinite',
        'spin': 'spin 1s linear infinite',
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
      },
    },
  },
  plugins: [],
};