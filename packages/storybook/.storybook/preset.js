const path = require('path')
const { plugins, rules } = require('webpack-atoms')

async function managerWebpack(config, options) {
  return {
    ...config,
    // mode: 'development',
    devtool: 'inline-module-source-map',
    module: {
      rules: [
        {
          ...rules.js({
            rootMode: 'upward',
          }),
          test: /\.[jt]sx?$/,
        },
        rules.astroturf({ extension: '.module.scss' }),
        // rules.css(),
        rules.sass({ implementation: require('sass') }),
        rules.images(),
        rules.fonts(),
      ],
    },
    plugins: [plugins.extractCss({ disable: true }), ...config.plugins],
  }
}

module.exports = { managerWebpack }
