import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray

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
    extend: {
      fontFamily: {
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}
