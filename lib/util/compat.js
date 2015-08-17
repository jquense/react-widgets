'use strict';

var babelHelpers = require('./babelHelpers.js');

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

var _2 = require('./_');

var _3 = babelHelpers.interopRequireDefault(_2);

var _version = _react2['default'].version.split('.').map(parseFloat);

module.exports = {

  version: function version() {
    return _version;
  },

  type: function type(component) {
    if (_version[0] === 0 && _version[1] >= 13) return component;

    return component.type;
  },

  findDOMNode: function findDOMNode(component) {
    return _reactDom2['default'].findDOMNode(component);
  },

  cloneElement: function cloneElement(child, props) {
    if (_react2['default'].cloneElement) return _react2['default'].cloneElement(child, props);

    //just mutate if pre 0.13
    _3['default'].each(props, function (value, prop) {
      return child.props[prop] = value;
    });

    return child;
  }
};