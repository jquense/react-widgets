'use strict';
var { has } = require('../util/_');


module.exports = {

  componentWillUnmount() {
    var timers = this._timers || {};

    this._unmounted = true;

    for (var k in timers) if ( has(timers, k) )
      this.clearTimeout(k)
  },
  
  clearTimeout(key) {
    var timers = this._timers || {};
    window.clearTimeout(timers[key]);
  },

  setTimeout(key, cb, duration){
    var timers = this._timers || (this._timers = Object.create(null));

    if (this._unmounted)
      return

    this.clearTimeout(key)
    timers[key] = window.setTimeout(() => {
      if (!this._unmounted) cb()
    }, duration)
  }
}
