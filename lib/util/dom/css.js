"use strict";

var camelize = require("react/lib/camelizeStyleName"),
    hyphenate = require("react/lib/hyphenateStyleName"),
    has = Object.prototype.hasOwnProperty;

module.exports = function cssFn(node, property, value) {
  var css = "",
      props = property;

  if (typeof property === "string") {
    if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(property);else (props = {})[property] = value;
  }

  for (var key in props) if (has.call(props, key)) {
    !props[key] && props[key] !== 0 ? removeStyle(node.style, hyphenate(key)) : css += hyphenate(key) + ":" + props[key] + ";";
  }

  node.style.cssText += ";" + css;
};

function removeStyle(styles, key) {
  return "removeProperty" in styles ? styles.removeProperty(key) : styles.removeAttribute(key);
}

function _getComputedStyle(node) {
  if (!node) throw new Error();
  var doc = node.ownerDocument;

  return "defaultView" in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : { //ie 8 "magic"
    getPropertyValue: function getPropertyValue(prop) {
      var re = /(\-([a-z]){1})/g;
      if (prop == "float") prop = "styleFloat";
      if (re.test(prop)) prop = prop.replace(re, function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return args[2].toUpperCase();
      });

      return node.currentStyle[prop] || null;
    }
  };
}