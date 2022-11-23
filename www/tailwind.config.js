module.exports = {
  content: [
    `${__dirname}/docs/**/*.{js,ts,tsx,mdx}`,
    `${__dirname}/src/**/*.{js,ts,tsx}`,
    `${__dirname}/src/**/*.html`,
    `${__dirname}/../react-widgets/src/**/*.tsx`,
  ],
  theme: {
    colors: {},
    flexGrow: {
      0: 0,
      DEFAULT: 1,
      1: 1,
      2: 2,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  darkMode: ['class', '[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
    container: false,
    backgroundColor: false,
    borderColor: false,
    divideColor: false,
    gradientColorStops: false,
    placeholderColor: false,
    ringColor: false,
    ringOffsetColor: false,
    textColor: false,
  },
}
