const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './app/.vitepress/**/*.vue',
    './app/.vitepress/**/*.js',
    './app/.vitepress/**/*.ts',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        teal: colors.teal,
      },
      spacing: {
        160: '40rem',
        200: '50rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
