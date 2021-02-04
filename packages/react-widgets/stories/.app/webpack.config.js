const path = require('path')
const { plugins, rules } = require('mini-storybook/webpack-atoms')

const tailwindConfig = require.resolve('../config/tailwind.config.js')

module.exports = {
  devtool: 'inline-cheap-module-source-map',
  entry: require.resolve('./index.js'),
  output: {
    publicPath: '/',
    path: `${__dirname}/stories/build`,
  },
  module: {
    rules: [
      rules.js({ rootMode: 'upward' }),
      rules.postcss({
        postcssOptions: {
          plugins: require('mini-storybook/postcss-preset')(tailwindConfig),
        },
      }),
      rules.sass(),
      rules.images(),
      rules.fonts(),
      rules.audioVideo(),
    ],
  },
  plugins: [plugins.html()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
  },
  devServer: {
    historyApiFallback: true,
  },
}
