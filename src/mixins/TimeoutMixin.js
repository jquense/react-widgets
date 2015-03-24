'use strict';
var { has } = require('../util/_');


module.exports = {

  componentWillUnmount() {
    var timers = this._timers || {};

    this._unmounted = true;

    for (var k in timers) if ( has(timers, k) ) 
      clearTimeout(timers[k])
  },

  setTimeout(key, cb, duration){
    var timers = this._timers || (this._timers = Object.create(null));

    if ( this._unmounted) 
      return
    
    clearTimeout(timers[key])
    timers[key] = setTimeout(cb, duration)
  }

}