"use strict";

var _ = require('./_')
  , React    = require('react')
  , compat   = require('./compat')
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
    if (_.has(RESERVED, key) )
      RESERVED[key](source, target[key], key)

    else if ( !_.has(source, key) )
      source[key] = target[key];
  }
  return source
}

module.exports = {

  cloneWithProps: function (child, props) {
    var newProps = mergeProps(_.extend({}, props), child.props);

    if (!_.has(newProps, 'children') && _.has(child.props, 'children'))
      newProps.children = child.props.children;

    mock.isReactLegacyFactory = true
    mock.type = child.type

    return React.createElement(mock, newProps);

    function mock(){}
  }
}


function resolve(fn){
  return function(src, value, key){
    if( !_.has(src, key)) src[key] = value
    else src[key] = fn(src[key], value)
  }
}

function joinClasses(a, b){
  if ( !a ) return b || ''
  return a + (b ? ' ' + b : '')
}
