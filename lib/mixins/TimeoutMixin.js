'use strict';

var _require = require('../util/_'),
    has = _require.has;

module.exports = {
  componentWillUnmount: function componentWillUnmount() {
    var timers = this._timers || {};

    this._unmounted = true;

    for (var k in timers) {
      if (has(timers, k)) this.clearTimeout(k);
    }
  },
  clearTimeout: function clearTimeout(key) {
    var timers = this._timers || {};
    window.clearTimeout(timers[key]);
  },
  setTimeout: function setTimeout(key, cb, duration) {
    var _this = this;

    var timers = this._timers || (this._timers = Object.create(null));

    if (this._unmounted) return;

    this.clearTimeout(key);
    timers[key] = window.setTimeout(function () {
      if (!_this._unmounted) cb();
    }, duration);
  }
};