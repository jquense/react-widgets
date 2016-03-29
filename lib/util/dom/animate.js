'use strict';

var babelHelpers = require('../babelHelpers.js');

exports.__esModule = true;
exports['default'] = animate;

var _domHelpersUtilHyphenate = require('dom-helpers/util/hyphenate');

var _domHelpersUtilHyphenate2 = babelHelpers.interopRequireDefault(_domHelpersUtilHyphenate);

var _domHelpersStyle = require('dom-helpers/style');

var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

var _domHelpersEventsOn = require('dom-helpers/events/on');

var _domHelpersEventsOn2 = babelHelpers.interopRequireDefault(_domHelpersEventsOn);

var _domHelpersEventsOff = require('dom-helpers/events/off');

var _domHelpersEventsOff2 = babelHelpers.interopRequireDefault(_domHelpersEventsOff);

var _domHelpersTransitionProperties = require('dom-helpers/transition/properties');

var _domHelpersTransitionProperties2 = babelHelpers.interopRequireDefault(_domHelpersTransitionProperties);

var has = Object.prototype.hasOwnProperty,
    reset = {},
    TRANSLATION_MAP = {
  left: 'translateX',
  right: 'translateX',
  top: 'translateY',
  bottom: 'translateY'
};

reset[_domHelpersTransitionProperties2['default'].property] = reset[_domHelpersTransitionProperties2['default'].duration] = reset[_domHelpersTransitionProperties2['default'].delay] = reset[_domHelpersTransitionProperties2['default'].timing] = '';

animate.endEvent = _domHelpersTransitionProperties2['default'].end;
animate.transform = _domHelpersTransitionProperties2['default'].transform;
animate.TRANSLATION_MAP = TRANSLATION_MAP;

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

  if (!_domHelpersTransitionProperties2['default'].end) duration = 0;
  if (duration === undefined) duration = 200;

  for (var key in properties) if (has.call(properties, key)) {
    if (/(top|bottom)/.test(key)) transforms += TRANSLATION_MAP[key] + '(' + properties[key] + ') ';else {
      cssValues[key] = properties[key];
      cssProperties.push(_domHelpersUtilHyphenate2['default'](key));
    }
  }

  if (transforms) {
    cssValues[_domHelpersTransitionProperties2['default'].transform] = transforms;
    cssProperties.push(_domHelpersTransitionProperties2['default'].transform);
  }

  if (duration > 0) {
    cssValues[_domHelpersTransitionProperties2['default'].property] = cssProperties.join(', ');
    cssValues[_domHelpersTransitionProperties2['default'].duration] = duration / 1000 + 's';
    cssValues[_domHelpersTransitionProperties2['default'].delay] = 0 + 's';
    cssValues[_domHelpersTransitionProperties2['default'].timing] = easing || 'linear';

    _domHelpersEventsOn2['default'](node, _domHelpersTransitionProperties2['default'].end, done);

    setTimeout(function () {
      if (!fired) done(fakeEvent);
    }, duration + 500);
  }

  node.clientLeft; // trigger page reflow
  _domHelpersStyle2['default'](node, cssValues);

  if (duration <= 0) setTimeout(done.bind(null, fakeEvent), 0);

  return {
    cancel: function cancel() {
      if (fired) return;
      fired = true;
      _domHelpersEventsOff2['default'](node, _domHelpersTransitionProperties2['default'].end, done);
      _domHelpersStyle2['default'](node, reset);
    }
  };

  function done(event) {
    if (event.target !== event.currentTarget) return;

    fired = true;
    _domHelpersEventsOff2['default'](event.target, _domHelpersTransitionProperties2['default'].end, done);
    _domHelpersStyle2['default'](node, reset);
    callback && callback.call(this);
  }
}

module.exports = exports['default'];