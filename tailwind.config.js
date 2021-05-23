const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  plugins: [],
  purge: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  theme: {
    colors,
    screens: {
      'mobile': { 'max': '640px' },
      ...defaultTheme.screens
    }
  },
  variants: {
    extend: {},
  },
}
