const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

// Silence warning about lightBlue being removed.
delete colors.lightBlue;

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms')
  ],
  purge: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  theme: {
    colors: {
      primary: colors.emerald,
      ...colors,
    },
  },
  variants: {
    extend: {},
  },
}
