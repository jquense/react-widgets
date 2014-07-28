var _ = require('lodash')

module.exports = {
  chain: function chainFunction(a,b){
    return function(){
      a.apply(this, arguments)
      b.apply(this, arguments)
    }
  },

  merge: function merge(a, b){
      if ( typeof a !== typeof b) throw new TypeError
      else if ( _.isArray(a) )    a.splice(a.length, 0, b)    
      else if ( _.isFunction(a) ) a = wrap(a, b)  
      else                        _.extend(a, b)
      return a
  }
}

function wrap(one, two) {
    return function wrappedMethod(){
        var r1 = one.apply(this, arguments)
          , r2 = two.apply(this, arguments);

        if( r1 == null && r2 == null) return
        if( r1 == null ) return r2
        if( r2 == null ) return r1
        else             return _.extend(r1, r2)
    }
}