'use strict';
var _ = require('lodash')

module.exports = function(classes){
  if( !Array.isArray(classes))
    classes = _.transform(classes, function(arr, value, key){
      if( !!value ) arr.push(key)
    }, [])

  return classes.join(' ')
}
