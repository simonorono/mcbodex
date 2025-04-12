import colors from 'tailwindcss/colors'

module.exports = {
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms')
  ],
  content: ['./index.html', './src/**/*.tsx', './src/**/*.ts'],
  theme: {
    colors: {
      primary: colors.emerald,
      ...colors,
    },
  },
}
