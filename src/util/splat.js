'use strict';
module.exports = function(obj){
  return obj == null ? [] : [].concat(obj)
}