var events = require('./events');

var transitions = {
    'transition':'transitionend',
    'OTransition':'otransitionend', 
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd'
};

var CACHED_EVENT_NAME;

//thanks Bootstrap, stack overflow and alex mccaw
//https://github.com/twbs/bootstrap/blob/master/js/collapse.js
//http://stackoverflow.com/questions/5023514/how-do-i-normalize-css3-transition-functions-across-browsers
//http://blog.alexmaccaw.com/css-transitions
module.exports = {

  emulateEnd: function(el, duration, event) {
    var called = false;

    events.on(el, event, done);

    setTimeout(function() { 
      if (!called) events.trigger(el, event); 
    }, duration);

    function done() { 
      called = true;
      events.off(el, event, done) 
    }
  },

  endEvent: function() {
    var el;

    if ( CACHED_EVENT_NAME ) return CACHED_EVENT_NAME

    el = document.createElement('div')

    for (var i in transitions)
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined)
            return CACHED_EVENT_NAME = transitions[i];
  }
}



