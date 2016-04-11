'use strict';

exports.__esModule = true;
exports.default = animate;

var _hyphenate = require('dom-helpers/util/hyphenate');

var _hyphenate2 = _interopRequireDefault(_hyphenate);

var _style = require('dom-helpers/style');

var _style2 = _interopRequireDefault(_style);

var _on = require('dom-helpers/events/on');

var _on2 = _interopRequireDefault(_on);

var _off = require('dom-helpers/events/off');

var _off2 = _interopRequireDefault(_off);

var _properties = require('dom-helpers/transition/properties');

var _properties2 = _interopRequireDefault(_properties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var has = Object.prototype.hasOwnProperty,
    reset = {},
    TRANSLATION_MAP = {
  left: 'translateX',
  right: 'translateX',
  top: 'translateY',
  bottom: 'translateY'
};

reset[_properties2.default.property] = reset[_properties2.default.duration] = reset[_properties2.default.delay] = reset[_properties2.default.timing] = '';

animate.endEvent = _properties2.default.end;
animate.transform = _properties2.default.transform;
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

  if (!_properties2.default.end) duration = 0;
  if (duration === undefined) duration = 200;

  for (var key in properties) {
    if (has.call(properties, key)) {
      if (/(top|bottom)/.test(key)) transforms += TRANSLATION_MAP[key] + '(' + properties[key] + ') ';else {
        cssValues[key] = properties[key];
        cssProperties.push((0, _hyphenate2.default)(key));
      }
    }
  }if (transforms) {
    cssValues[_properties2.default.transform] = transforms;
    cssProperties.push(_properties2.default.transform);
  }

  if (duration > 0) {
    cssValues[_properties2.default.property] = cssProperties.join(', ');
    cssValues[_properties2.default.duration] = duration / 1000 + 's';
    cssValues[_properties2.default.delay] = 0 + 's';
    cssValues[_properties2.default.timing] = easing || 'linear';

    (0, _on2.default)(node, _properties2.default.end, done);

    setTimeout(function () {
      if (!fired) done(fakeEvent);
    }, duration + 500);
  }

  node.clientLeft; // trigger page reflow
  (0, _style2.default)(node, cssValues);

  if (duration <= 0) setTimeout(done.bind(null, fakeEvent), 0);

  return {
    cancel: function cancel() {
      if (fired) return;
      fired = true;
      (0, _off2.default)(node, _properties2.default.end, done);
      (0, _style2.default)(node, reset);
    }
  };

  function done(event) {
    if (event.target !== event.currentTarget) return;

    fired = true;
    (0, _off2.default)(event.target, _properties2.default.end, done);
    (0, _style2.default)(node, reset);
    callback && callback.call(this);
  }
}
module.exports = exports['default'];