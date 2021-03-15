const path = require('path')
const { plugins, rules, loaders } = require('mini-storybook/webpack/utils')

const tailwindConfig = require.resolve('../tailwind.config.js')

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
          plugins: require('mini-storybook/postcss')(tailwindConfig),
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
