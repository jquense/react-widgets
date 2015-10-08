'use strict';

var babelHelpers = require('./babelHelpers.js');

exports.__esModule = true;
exports['default'] = validateListComponent;

var _invariant = require('invariant');

var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

var METHODS = ['next', 'prev', 'first', 'last'];

function validateListComponent(list) {
  if (process.env.NODE_ENV !== 'production') {
    METHODS.forEach(function (method) {
      return _invariant2['default'](typeof list[method] === 'function', 'List components must implement a `' + method + '()` method');
    });
  }
}

module.exports = exports['default'];