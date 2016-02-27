'use strict';

var _require = require('../util/_');

var has = _require.has;

module.exports = {

  componentWillUnmount: function componentWillUnmount() {
    var timers = this._timers || {};

    this._unmounted = true;

    for (var k in timers) if (has(timers, k)) clearTimeout(timers[k]);
  },

  setTimeout: function setTimeout(key, cb, duration) {
    var _this = this;

    var timers = this._timers || (this._timers = Object.create(null));

    if (this._unmounted) return;

    clearTimeout(timers[key]);
    timers[key] = window.setTimeout(function () {
      if (!_this._unmounted) cb();
    }, duration);
  }
};