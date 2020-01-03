const path = require('path')
const webpack = require('webpack')
const { plugins, rules, loaders } = require('webpack-atoms')

let [externals] = process.argv.slice(2)
const dirname = process.cwd()

let { name } = require(`${dirname}/package.json`)

const compiler = webpack({
  // mode: 'production',
  // optimization: {
  //   minimize: false,
  // },
  entry:
    `${loaders.imports().loader}?` +
    `module=${path.join(dirname, 'localizer.js')}` +
    `!${require.resolve('./shim.js')}`,

  output: {
    path: path.join(dirname, './dist'),
    filename: name + '.js',
    libraryTarget: 'var',
  },
  module: {
    rules: [rules.js({ envName: 'esm', rootMode: 'upwards' })],
  },
  plugins: [
    plugins.define(),
    plugins.banner({
      banner:
        '(c) 2014 - present: Jason Quense | https://github.com/jquense/react-widgets/blob/master/LICENSE.md',
      entryOnly: true,
    }),
  ],
  externals: {
    react: 'window.React',
    'react-widgets/lib/configure': 'window.ReactWidgets',
    ...JSON.parse(externals || '{}'),
  },
  node: {
    Buffer: false,
  },
})

compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) console.error(err.details)
    process.exit(1) // eslint-disable-line
  }

  if (stats.hasErrors()) {
    process.exitCode = 2
  }
})
