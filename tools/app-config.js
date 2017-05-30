let merge = require('webpack-merge')
let { plugins, rules, loaders } = require('webpack-atoms');

module.exports = function(root, config) {
  return merge({}, config, {
    module: {
      rules: [
        { parser: { amd: false } },
        rules.js({ tagName: 'less', extension: '.less' }),
        rules.css(),
        rules.less(),
        rules.images(),
        rules.woff(),
      ],
    },
    plugins: [
      plugins.define(),
      plugins.extractText(),
    ],
    node: {
      Buffer: false,
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  })
}

module.exports.plugins = plugins;
module.exports.rules = rules;
module.exports.loaders = loaders;
module.exports.merge = merge;
