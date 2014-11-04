'use strict';
var extend = require('xtend')
  , idCount = 0;

var _ = 

	module.exports = {

		has: has,
		
		merge: require('xtend'),

		extend: require('xtend/mutable'),

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

		map: function(obj, cb, thisArg){
			var arr = [];
			_.each(obj, function(v, k, l){
				arr.push(cb.call(thisArg, v, k, l))
			})
			return arr
		},

		object: function(arr){
			return _.transform(arr, function(obj, val){
				obj[val[0]] = val[1]
			}, {})
		},

		some: function(arr, cb, thisArg){
			for(var idx = 0; idx < arr.length; ++idx)
				if ( cb.call(thisArg, arr[idx], idx, arr) ) 
					return true
			
			return false
		},

		pick: function(obj, keys){
			return _.transform(obj, function(mapped, val, key){
				if( keys.indexOf(key) !== -1) mapped[key] = val
			}, {})
		},

		omit: function(obj, keys){
			return _.transform(obj, function(mapped, val, key){
				if( keys.indexOf(key) === -1) mapped[key] = val
			}, {})
		},

		values: function(obj){
			return Object.keys(obj).map( k => obj[k])
		},

		remove: function(arr, obj){
			var list = arr.slice()
			  , idx  = list.indexOf(obj)

			if( idx !== -1) list.splice(idx, 1)
			return list
		},

		findIndex: function(arr, cb, thisArg){
			var idx = -1;

			while (++idx < arr.length)
				if( cb.call(thisArg, arr[idx], idx, arr) )
					return idx
			
			return -1
		},

		noop: function(){},

		uniqueId: function (prefix) {
      return (prefix == null ? '' : prefix) + (++idCount);
    }
	}

function has(o, k){
	return Object.prototype.hasOwnProperty.call(o, k)
}