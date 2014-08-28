var _ = require('lodash')

var compose = module.exports = {
  chain: function chainFunction(a,b){
    return function(){
      a && a.apply(this, arguments)
      b && b.apply(this, arguments)
    }
  },

  merge: function merge(a, b){
      if ( typeof a !== typeof b) throw new TypeError
      else if ( _.isArray(a) )    a.splice(a.length, 0, b)    
      else if ( _.isFunction(a) ) a = wrap(a, b)  
      else                        _.extend(a, b)
      return a
  },

  before: _.curry(function(decorate, method){
    return function before(){
      decorate.apply(this, arguments)
      return method.apply(this, arguments)
    }
  }),

  after: _.curry(function(decorate, method){
    return function after(){
      var r = method.apply(this, arguments)
      decorate.apply(this, arguments)
      return r
    }
  }),

  around: _.curry(function(decorate, method){
    return function around(){
      var args = [method].concat(_.toArray(arguments))
      
      return decorate.apply(this, args)
    }
  }),

  provided: function(guard){
    return compose.around(function(fn){
      var args = _.rest(arguments)

      if(guard.apply(this, args))
        return fn.apply(this, args)
    })
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