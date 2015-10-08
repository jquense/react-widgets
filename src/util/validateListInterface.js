import invariant from 'invariant'
var METHODS = ['next', 'prev', 'first', 'last'];

export default function validateListComponent(list){
  if (process.env.NODE_ENV !== 'production') {
    METHODS.forEach(method =>
      invariant(typeof list[method] === 'function', 'List components must implement a `' + method + '()` method') )
  }
}
