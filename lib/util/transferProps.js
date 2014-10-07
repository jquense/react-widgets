"use strict";

var _ = require('lodash')
  , React = require('react')
  , RESERVED = {
      className: resolve(joinClasses),
      children:   _.noop,
      key:        _.noop,
      ref:        _.noop,
      style:      resolve(merge)
    };

//mutates first arg
function mergeProps(source, target) {

  return _.transform(target, function(source, value, key){
      if (_.has(RESERVED, key) )
        RESERVED[key](source, value, key)

      else if ( !_.has(source, key) )
        source[key] = value;

  }, source)
}

module.exports = {

  mergeIntoProps: function (obj, desc) {
    var props = desc.props ? desc.props : desc;
    mergeProps(props, obj)
    return desc
  },

  cloneWithProps: function (child, props) {
    var newProps = mergeProps(_.clone(props), child.props)
      , version  = _.map(React.version.split('.'), parseFloat);

    if (!_.has(newProps, 'children') && _.has(child.props, 'children'))
      newProps.children = child.props.children;

    // TODO remove eventually
    if (version[0] === 0 && version[1] < 11)
      return child.constructor.ConvenienceConstructor(newProps);

    return child.constructor(newProps);
  }
}

function resolve(fn){
  return function(src, value, key){
    if( !_.has(src, key)) src[key] = value
    else src[key] = fn(src[key], value)
  }
}

function joinClasses(){
  return _.reduce(arguments, function(str, next){
    if ( !str ) return next || ''
    if ( next ) return str += ' ' + next
    return str
  }, '')
}

function merge(a, b){
  return _.extend({}, a, b)
}