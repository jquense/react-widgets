var _ = require('lodash')
  , RESERVED = {
    className: resolve(joinClasses),
    children: _.noop,
    key:   _.noop,
    ref:   _.noop,
    style: resolve(merge)
  };



module.exports = mergeToProps;

function mergeToProps(obj, desc) {
  var props = desc.props ? desc.props : desc;

  _.transform(obj, function(target, value, key){
      if (_.has(RESERVED, key) )      RESERVED[key](target, value, key)
      else if ( !_.has(target, key) ) target[key] = value;

  }, props)

  return desc
}

function resolve(fn){
  return function(src, value, key){
    if( !_.has(src, key)) src[key] = value
    else src[key] = fn(src[key], value)
  }
}

function joinClasses(first){
  return _.reduce(arguments, function(str, next){
    if ( !str ) return next || ''
    if ( next ) return str += ' ' + next
    return str
  }, '')
}

function merge(a, b){
  return _.extend({}, a, b)
}