"use strict";
var _require = require("../util/_");

var has = _require.has;



module.exports = {

  componentWillUnmount: function componentWillUnmount() {
    var timers = this._timers || {};

    for (var k in timers) if (has(timers, k)) clearTimeout(timers[k]);
  },

  setTimeout: (function (_setTimeout) {
    var _setTimeoutWrapper = function setTimeout() {
      return _setTimeout.apply(this, arguments);
    };

    _setTimeoutWrapper.toString = function () {
      return _setTimeout.toString();
    };

    return _setTimeoutWrapper;
  })(function (key, cb, duration) {
    var timers = this._timers || (this._timers = Object.create(null));

    clearTimeout(timers[key]);
    timers[key] = setTimeout(cb, duration);
  })

};