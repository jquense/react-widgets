"use strict";
var canUseDOM = require("react/lib/ExecutionEnvironment").canUseDOM;
var hyphenate = require("react/lib/hyphenateStyleName");
var has = Object.prototype.hasOwnProperty;
var css = require("./css");
var _require = require("./events");

var on = _require.on;
var off = _require.off;


var TRANSLATION_MAP = {
  left: "translateX", right: "translateX",
  top: "translateY", bottom: "translateY" };

var reset = {},
    transform = "transform",
    transition = {},
    transitionTiming,
    transitionDuration,
    transitionProperty,
    transitionDelay;

if (canUseDOM) {
  transition = getTransitionProperties();

  transform = transition.prefix + transform;

  reset[transitionProperty = transition.prefix + "transition-property"] = reset[transitionDuration = transition.prefix + "transition-duration"] = reset[transitionDelay = transition.prefix + "transition-delay"] = reset[transitionTiming = transition.prefix + "transition-timing-function"] = "";
}

animate.endEvent = transition.endEvent;

module.exports = animate;

/* code in part from: Zepto 1.1.4 | zeptojs.com/license */
// super lean animate function for transitions
// doesn't support all translations to keep it matching the jquery API
function animate(node, properties, duration, easing, callback) {
  var cssProperties = [],
      fakeEvent = { target: node, currentTarget: node },
      cssValues = {},
      transforms = "",
      fired;

  if (typeof easing === "function") callback = easing, easing = null;

  if (!transition.endEvent) duration = 0;
  if (duration === undefined) duration = 200;

  for (var key in properties) if (has.call(properties, key)) {
    if (/(top|bottom)/.test(key)) transforms += TRANSLATION_MAP[key] + "(" + properties[key] + ") ";else {
      cssValues[key] = properties[key];
      cssProperties.push(hyphenate(key));
    }
  }

  if (transforms) {
    cssValues[transform] = transforms;
    cssProperties.push(transform);
  }

  if (duration > 0) {
    cssValues[transitionProperty] = cssProperties.join(", ");
    cssValues[transitionDuration] = duration / 1000 + "s";
    cssValues[transitionDelay] = 0 + "s";
    cssValues[transitionTiming] = easing || "linear";

    on(node, transition.endEvent, done);

    setTimeout(function () {
      if (!fired) done(fakeEvent);
    }, duration + 500);
  }

  // trigger page reflow
  node.clientLeft;
  css(node, cssValues);

  if (duration <= 0) setTimeout(done.bind(null, fakeEvent), 0);

  function done(event) {
    if (event.target !== event.currentTarget) return;

    fired = true;
    off(event.target, transition.endEvent, done);

    css(node, reset);

    callback && callback.call(this);
  }
}


function getTransitionProperties() {
  var endEvent,
      prefix = "",
      transitions = {
    O: "otransitionend",
    Moz: "transitionend",
    Webkit: "webkitTransitionEnd"
  };

  var element = document.createElement("div");

  for (var vendor in transitions) if (has.call(transitions, vendor)) {
    if (element.style[vendor + "TransitionProperty"] !== undefined) {
      prefix = "-" + vendor.toLowerCase() + "-";
      endEvent = transitions[vendor];
      break;
    }
  }

  if (!endEvent && element.style.transitionProperty !== undefined) endEvent = "transitionend";

  return { endEvent: endEvent, prefix: prefix };
}