var path = require('path');
var localizerConfig = require('../../tools/localizer-config');

var name = require('./package.json').name;

module.exports = localizerConfig({
  entry: './localizer.js',
  output: {
    path: path.join(__dirname, './dist'),
    filename: name + '.js'
  },
})
