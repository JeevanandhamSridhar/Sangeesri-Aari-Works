/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf9e7',
          100: '#faf0c0',
          200: '#f5e07a',
          300: '#f0ce3a',
          400: '#e8bb18',
          500: '#D4AF37',
          600: '#b8920d',
          700: '#8f6e0d',
          800: '#6b5211',
          900: '#5a4312',
          950: '#342407',
        },
        darkbase: '#0A0806',
        cream: '#FDF8F0',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
