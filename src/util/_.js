'use strict';
var idCount = 0;

var _ = 

  module.exports = {

    has: has,
    
    merge:  require('xtend'),

    extend: require('xtend/mutable'),

    isShallowEqual: function (a, b) {
      if (a === b) return true;
      if (a instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime()

      if(typeof a != 'object' && typeof b != 'object')
        return a === b

      if(typeof a != typeof b ) return false

      return shallowEqual(a, b)
    }, 

    transform: function(obj, cb, seed){
      seed = seed || (Array.isArray(obj) ? [] : {})
      _.each(obj, function(v, k, l){
        cb(seed, v, k, l)
      })
      return seed
    },

    each: function(obj, cb, thisArg){
      if( Array.isArray(obj)) return obj.forEach(cb, thisArg)

      for(var key in obj) if(has(obj, key)) 
        cb.call(thisArg, obj[key], key, obj)
    },

    object: function(arr){
      return _.transform(arr, function(obj, val){
        obj[val[0]] = val[1]
      }, {})
    },

    filter: function(arr, cb, thisArg){
      var idx = -1, len = arr.length
        , result = [];

      while( ++idx < len)
        if ( cb.call(thisArg, arr[idx], idx, arr) ) 
          result.push(arr[idx])
      
      return result
    },

    some: function(arr, cb, thisArg){
      var idx = -1, len = arr.length;

      while( ++idx < len)
        if ( cb.call(thisArg, arr[idx], idx, arr) ) return true
      
      return false
    },

    pick: function(obj, keys){
      keys = [].concat(keys);
      return _.transform(obj, function(mapped, val, key){
        if( keys.indexOf(key) !== -1) mapped[key] = val
      }, {})
    },

    omit: function(obj, keys){
      keys = [].concat(keys);
      return _.transform(obj, function(mapped, val, key){
        if( keys.indexOf(key) === -1) mapped[key] = val
      }, {})
    },

    find: function(arr, cb, thisArg){
      var result;
      if( Array.isArray(arr)) {
        arr.every(function(val, idx){
          if( cb.call(thisArg, val, idx, arr)) return (result = val), false
          return true
        })
        return result
      }
      else 
        for(var key in arr) if(has(arr, key)) 
          if( cb.call(thisArg, arr[key], key, arr) ) 
            return arr[key]; 
    },

    findIndex: function(arr, cb, thisArg){
      var idx = -1, len = arr.length;

      while (++idx < len)
        if( cb.call(thisArg, arr[idx], idx, arr) ) return idx
      
      return -1
    },

    chunk: function(array, chunkSize) {
      var index = 0, length = array ? array.length : 0
        , result = [];

      chunkSize = Math.max(+chunkSize || 1, 1)

      while (index < length)
        result.push(array.slice(index, (index += chunkSize)))

      return result
    },

    splat: function(obj){
      return obj == null ? [] : [].concat(obj)
    },

    noop: function(){},

    uniqueId: function (prefix) {
      return ''+ ((prefix == null ? '' : prefix) + (++idCount));
    }
  }

function has(o, k){
  return o && Object.prototype.hasOwnProperty.call(o, k)
}

function shallowEqual(objA, objB) {
  var key;

  for (key in objA) if ( has(objA, key) && (!has(objB, key) || objA[key] !== objB[key])) 
    return false;
     
  for (key in objB) if ( has(objB, key) && !has(objA, key)) 
    return false;
    
  return true;
}