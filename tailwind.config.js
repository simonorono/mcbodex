const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  plugins: [],
  purge: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  theme: {
    screens: {
      'mobile': { 'max': '640px' },
      ...defaultTheme.screens
    }
  },
  variants: {
    extend: {},
  },
}
