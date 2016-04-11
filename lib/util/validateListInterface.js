'use strict';

exports.__esModule = true;
exports.default = validateListComponent;

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var METHODS = ['next', 'prev', 'first', 'last'];

function validateListComponent(list) {
  if (process.env.NODE_ENV !== 'production') {
    METHODS.forEach(function (method) {
      return (0, _invariant2.default)(typeof list[method] === 'function', 'List components must implement a `' + method + '()` method');
    });
  }
}
module.exports = exports['default'];