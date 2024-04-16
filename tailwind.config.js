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
      main: "#6194B1",
      "main-hover": "#81B4D1",
      "main-dark": "#2E5F7F",
      "main-sub-light": "#BBD1DD",
      "main-light": "#DDF3FE",
      accent: "#E1634C",
      "accent-hover": "#F1735C",
      secondary: colors.rose,
      ...colors,
      gray: colors.zinc,
    }
  },
  plugins: [],
  darkMode: 'class'
}

