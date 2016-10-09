'use strict';

exports.__esModule = true;

exports.default = function (component, props, state) {
  return !(0, _.isShallowEqual)(component.props, props) || !(0, _.isShallowEqual)(component.state, state);
};

var _ = require('./_');

module.exports = exports['default'];