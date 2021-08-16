const rwPlugin = require('../../tailwind').default

module.exports = {
  mode: 'jit',
  purge: [
    `${__dirname}/app/*.js`,
    `${__dirname}/../stories/**/*.{js,jsx,html,css,vue,svelte,ts,tsx}`,

    // Point to your source files if you are also authoring using tailwind
    './src/**/*.{js,jsx,html,css,vue,svelte,ts,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        main: '1fr auto',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [rwPlugin],
  corePlugins: {
    container: false,
  },
}
