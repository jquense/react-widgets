"use strict";

var _ = require('./_')
  , React    = require('react')
  , compat   = require('./compat')
  , hasOwn   = Object.prototype.hasOwnProperty
  , RESERVED = {
      className:  resolve(joinClasses),
      children:   function(){},
      key:        function(){},
      ref:        function(){},
      style:      resolve(_.merge)
    };

//mutates first arg
function mergeProps(source, target) {
  for (var key in target) {
    if (hasOwn.call(RESERVED, key) )
      RESERVED[key](source, target[key], key)

    else if ( !hasOwn.call(source, key) )
      source[key] = target[key];
  }
  return source
}

module.exports = {

  mergeIntoProps: function (obj, desc) {
    var props = desc.props ? desc.props : desc;
    mergeProps(props, obj)
    return desc
  },

  cloneWithProps: function (child, props) {
    var newProps = mergeProps(_.extend({}, props), child.props)
      , version  = compat.version();

    if (!hasOwn.call(newProps, 'children') && hasOwn.call(child.props, 'children'))
      newProps.children = child.props.children;

    // TODO remove eventually
    if (version[0] === 0 && version[1] < 11)
      return child.constructor.ConvenienceConstructor(newProps);

    else if (version[0] === 0 && version[1] === 12){
      //this is SO hacky
      mock.isReactLegacyFactory = true
      mock.type = child.type
      return React.createElement(mock, newProps);
    }

    return child.constructor(newProps);

    function mock(){}
  }
}


function resolve(fn){
  return function(src, value, key){
    if( !hasOwn.call(src, key)) src[key] = value
    else src[key] = fn(src[key], value)
  }
}

function joinClasses(a, b){
  if ( !a ) return b || ''
  return a + (b ? ' ' + b : '')
}
