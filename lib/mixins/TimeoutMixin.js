"use strict";

var _require = require("../util/_");

var has = _require.has;

module.exports = {

  componentWillUnmount: function () {
    var timers = this._timers || {};

    this._unmounted = true;

    for (var k in timers) if (has(timers, k)) clearTimeout(timers[k]);
  },

  setTimeout: function (key, cb, duration) {
    var timers = this._timers || (this._timers = Object.create(null));

    if (this._unmounted) return;

    clearTimeout(timers[key]);
    timers[key] = setTimeout(cb, duration);
  }

};