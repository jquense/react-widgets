'use strict';
var reduce = require('array-reduce')
  , map = require('array-map')
  , extend = require('extend');

var _ = 

	module.exports = {

		isArray: Array.isArray || isArray,
		
		has: 		 has,

		transform: function(obj, cb, seed){
			seed = seed || (_.isArray(obj) ? [] : {})
			_.each(obj, function(v, k, l){
				cb(seed, v, k, l)
			})
			return seed
		},

		each: function(obj, cb, thisArg){
			if( _.isArray(obj)) return obj.forEach(cb, thisArg)

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

		mapValues: function(obj, cb, thisArg){
			return _.transform(obj, function(mapped, val, key){
				mapped[key] = cb.call(thisArg, val, key, obj)
			}, {})
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
		// \
		values: function(obj){
			return Object.keys(obj).map( k => obj[k])
		},

		without: function(arr, obj){
			arr.filter( i => i != obj )
		},

		noop: function(){},


	}


function has(o, k){
	return Object.prototype.hasOwnProperty.call(o, k)
}

function isArray(arg) {
	return Object.prototype.toString.call(arg) === '[object Array]';
}