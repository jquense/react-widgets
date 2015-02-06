'use strict';
var { has } = require('../util/_')


module.exports = {

  componentWillUnmount() {
    var timers = this._timers || {};

    for (var k in timers) if ( has(timers, k) ) 
      clearTimeout(timers[k])
  },

  setTimeout(key, cb, duration){
    var timers = this._timers || (this._timers = Object.create(null));

    clearTimeout(timers[key])
    timers[key] = setTimeout(cb, duration)
  }

}