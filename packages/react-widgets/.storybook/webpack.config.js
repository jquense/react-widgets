var path = require('path')
var appConfig = require('../../../tools/app-config');

module.exports = appConfig(path.resolve(__dirname, '../'))
