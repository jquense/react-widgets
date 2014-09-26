(function(){
  var Ap = Array.prototype;
  var slice = Ap.slice;
  var proto = Function.prototype;

  if (!proto.bind) {
    proto.bind = function(context) {
      var func = this;
      var args = slice.call(arguments, 1);

      function bound() {
        var invokedAsConstructor = func.prototype && (this instanceof func);
        return func.apply(
          !invokedAsConstructor && context || this,
          args.concat(slice.call(arguments))
        );
      }
      bound.prototype = func.prototype;

      return bound;
    };
  }

})();