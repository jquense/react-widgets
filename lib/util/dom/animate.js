'use strict';
var hyphenate = require('dom-helpers/util/hyphenate'),
    css = require('dom-helpers/style'),
    on = require('dom-helpers/events/on'),
    off = require('dom-helpers/events/off'),
    transitionProps = require('dom-helpers/transition/properties');

var has = Object.prototype.hasOwnProperty,
    reset = {},
    TRANSLATION_MAP = {
  left: 'translateX',
  right: 'translateX',
  top: 'translateY',
  bottom: 'translateY'
};

reset[transitionProps.property] = reset[transitionProps.duration] = reset[transitionProps.delay] = reset[transitionProps.timing] = '';

animate.endEvent = transitionProps.end;
animate.transform = transitionProps.transform;
animate.TRANSLATION_MAP = TRANSLATION_MAP;

module.exports = animate;

// super lean animate function for transitions
// doesn't support all translations to keep it matching the jquery API
/**
 * code in part from: Zepto 1.1.4 | zeptojs.com/license
 */
function animate(node, properties, duration, easing, callback) {
  var cssProperties = [],
      fakeEvent = { target: node, currentTarget: node },
      cssValues = {},
      transforms = '',
      fired;

  if (typeof easing === 'function') callback = easing, easing = null;

  if (!transitionProps.end) duration = 0;
  if (duration === undefined) duration = 200;

  for (var key in properties) if (has.call(properties, key)) {
    if (/(top|bottom)/.test(key)) transforms += TRANSLATION_MAP[key] + '(' + properties[key] + ') ';else {
      cssValues[key] = properties[key];
      cssProperties.push(hyphenate(key));
    }
  }

  if (transforms) {
    cssValues[transitionProps.transform] = transforms;
    cssProperties.push(transitionProps.transform);
  }

  if (duration > 0) {
    cssValues[transitionProps.property] = cssProperties.join(', ');
    cssValues[transitionProps.duration] = duration / 1000 + 's';
    cssValues[transitionProps.delay] = 0 + 's';
    cssValues[transitionProps.timing] = easing || 'linear';

    on(node, transitionProps.end, done);

    setTimeout(function () {
      if (!fired) done(fakeEvent);
    }, duration + 500);
  }

  node.clientLeft; // trigger page reflow
  css(node, cssValues);

  if (duration <= 0) setTimeout(done.bind(null, fakeEvent), 0);

  function done(event) {
    if (event.target !== event.currentTarget) return;

    fired = true;
    off(event.target, transitionProps.end, done);
    css(node, reset);
    callback && callback.call(this);
  }
}