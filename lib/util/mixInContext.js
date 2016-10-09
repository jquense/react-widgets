"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = mixInContext;
function mixInContext(componentClass, _ref) {
  var propTypes = _ref.propTypes;
  var contextTypes = _ref.contextTypes;
  var childContextTypes = _ref.childContextTypes;
  var getChildContext = _ref.getChildContext;


  if (propTypes) componentClass.propTypes = _extends({}, componentClass.propTypes, propTypes);

  if (contextTypes) componentClass.contextTypes = _extends({}, componentClass.contextTypes, contextTypes);

  if (childContextTypes) componentClass.childContextTypes = _extends({}, componentClass.childContextTypes, childContextTypes);

  if (getChildContext) {
    (function () {
      var baseGCContext = componentClass.prototype.getChildContext;

      componentClass.prototype.getChildContext = function $getChildContext() {
        return _extends({}, baseGCContext && baseGCContext.call(this), getChildContext.call(this));
      };
    })();
  }

  return componentClass;
}
module.exports = exports['default'];