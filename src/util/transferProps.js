var joinClasses = require('react/lib/joinClasses')
  , merge = require('react/lib/merge')
  , _ = require('lodash')

var RESERVED = {
  className: resolve(joinClasses),
  children: _.noop,
  key: _.noop,
  ref: _.noop,
  style: resolve(merge)
}

function resolve(fn){

  return function(src, value, key){
    if( !_.has(src, key)) src[key] = value
    else src[key] = fn(src[key], value)
  }
}

module.exports = transferTo;

function transferTo(obj, desc) {
  var props = desc.props ? desc.props : desc;

  _.transform(obj, function(target, value, key){
      if (_.has(RESERVED, key) )      RESERVED[key](target, value, key)
      else if ( !_.has(target, key) ) target[key] = value;

  }, props)

  //console.log(props)
  return desc
}