const path = require('path');
const merge = require('webpack-merge');
const { plugins, rules, loaders } = require('webpack-atoms');

module.exports = function (config) {
  return merge({}, config, {
    devtool: 'source-map',
    entry: `${loaders.imports().loader}?` +
      `module=${path.resolve(process.cwd(), config.entry)}` +
      `!${require.resolve('./shim.js')}`,
    output: {
      libraryTarget: 'var'
    },
    module: {
      rules: [
        rules.js()
      ]
    },
    plugins: [
      plugins.define(),
      plugins.banner({
        banner:'(c) 2014 - present: Jason Quense | https://github.com/jquense/react-widgets/blob/master/LICENSE.md',
        entryOnly : true,
      }),
    ],
    externals: {
      'react': 'window.React',
      'react-widgets/lib/configure': 'window.ReactWidgets',
    },
    node: {
      Buffer: false
    },
  })
}
