const path = require('path')
const { plugins, rules } = require('webpack-atoms')

module.exports = {
  devtool: 'inline-module-source-map',
  entry: './stories/.app/index.js',
  output: {
    publicPath: '/',
    path: `${__dirname}/stories/build`,
  },
  module: {
    rules: [
      { ...rules.js({ rootMode: 'upward' }), test: /\.[jt]sx?$/ },
      rules.css(),
      rules.sass(),
      rules.images(),
    ],
  },
  plugins: [plugins.html()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
    alias: {
      'react-widgets': path.resolve('../../src'),
    },
  },
  devServer: {
    historyApiFallback: true,
  },
}
