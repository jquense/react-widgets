"use strict";
var METHODS = ["next", "prev", "first", "last"];

module.exports = function validateListComponent(list) {
  if ("production" !== process.env.NODE_ENV) {
    METHODS.forEach(function (method) {
      return assert(typeof list[method] === "function", "List components must implement a `" + method + "()` method");
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