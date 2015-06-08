'use strict';
var React = require('react'),
    _ = require('./_');

var _version = React.version.split('.').map(parseFloat);

module.exports = {

  version: function version() {
    return _version;
  },

  type: function type(component) {
    if (_version[0] === 0 && _version[1] >= 13) return component;

    return component.type;
  },

  findDOMNode: function findDOMNode(component) {
    if (React.findDOMNode) return React.findDOMNode(component);

    return component.getDOMNode();
  },

  cloneElement: function cloneElement(child, props) {
    if (React.cloneElement) return React.cloneElement(child, props);

    //just mutate if pre 0.13
    _.each(props, function (value, prop) {
      return child.props[prop] = value;
    });

    return child;
  }
};