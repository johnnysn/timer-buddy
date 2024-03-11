/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
        standard: ['"Quicksand"', ...defaultTheme.fontFamily.sans],
      }
    },
    colors: {
      primary: colors.sky,
      secondary: colors.rose,
      ...colors,
      gray: colors.zinc,
    }
  },
  plugins: [],
  darkMode: 'class'
}

