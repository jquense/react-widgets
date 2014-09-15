
var _ = require('lodash')
  , common = {
    eq:   function(a, b){ return a === b },
    neq:  function(a, b){ return a !== b },
    gt:   function(a, b){ return a > b   },
    gte:  function(a, b){ return a >= b  },
    lt:   function(a, b){ return a < b   },
    lte:  function(a, b){ return a <= b  },

    contains: function(a, b){ 
      return _.contains(a, b) 
    },

    startsWith: function(a, b) {
      return a.lastIndexOf(b, 0) === 0;
    },

    endsWith: function(a, b) {
      var pos = a.length - b.length
        , lastIndex = a.indexOf(b, pos);

      return  lastIndex !== -1 && lastIndex === pos;
    }
  }

module.exports = common

// module.exports.filter = function filter(obj, filter) {
  
//   filter = typeof filter === 'string' ? common[filter] : filter

//   if ( typeof filter !== 'function') throw new TypeError

//   return _.filter(obj, filter)
// }
