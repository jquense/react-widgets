'use strict';

var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM
  , cancel = 'clearTimeout'
  , raf    = fallback
  , compatRaf;
  
var keys = [
        'cancelAnimationFrame'
      , 'webkitCancelAnimationFrame'
      , 'mozCancelAnimationFrame'
      , 'oCancelAnimationFrame'
      , 'msCancelAnimationFrame'
      ];


compatRaf = cb => raf(cb)
compatRaf.cancel = id => window[cancel](id)

module.exports = compatRaf

if ( canUseDOM ) {
  raf = window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.oRequestAnimationFrame
      || window.msRequestAnimationFrame
      || fallback;

  for (var i = 0; i < keys.length; i++)
    if ( keys[i] in window){
      cancel = keys[i]
      break
    }
}

/* https://github.com/component/raf */
var prev = new Date().getTime();

function fallback(fn) {
  var curr = new Date().getTime()
    , ms = Math.max(0, 16 - (curr - prev))
    , req = setTimeout(fn, ms)
  prev = curr;
  return req;
}
