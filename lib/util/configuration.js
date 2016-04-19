'use strict';

var babelHelpers = require('./babelHelpers.js');

exports.__esModule = true;

var _domAnimate = require('./dom/animate');

var _domAnimate2 = babelHelpers.interopRequireDefault(_domAnimate);

exports['default'] = { animate: _domAnimate2['default'] };
module.exports = exports['default'];