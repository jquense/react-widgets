const path = require('path')
const { plugins, rules } = require('webpack-atoms');

module.exports = {
  devtool: 'source-map',
  entry: {
    'react-widgets': './src/index.js'
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    library:  'ReactWidgets',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      rules.js()
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
  },
  plugins: [
    plugins.define(),
    // plugins.uglify(),
    plugins.banner({
      banner: '(c) 2014 - present: Jason Quense | https://github.com/jquense/react-widgets/blob/master/LICENSE.md',
      entryOnly : true
    }),
  ],
  node: {
    Buffer: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
}
