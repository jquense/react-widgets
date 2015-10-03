'use strict';
var METHODS = ['next', 'prev', 'first', 'last'];

module.exports = function validateListComponent(list) {

  if (process.env.NODE_ENV !== 'production') {
    METHODS.forEach(function (method) {
      return assert(typeof list[method] === 'function', 'List components must implement a `' + method + '()` method');
    });
  }
};

function assert(condition, msg) {
  var error;

  if (!condition) {
    error = new Error(msg);
    error.framesToPop = 1;
    throw error;
  }
}