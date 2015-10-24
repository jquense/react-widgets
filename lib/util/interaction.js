'use strict';

exports.__esModule = true;
exports.isDisabled = isDisabled;
exports.isReadOnly = isReadOnly;
exports.isDisabledItem = isDisabledItem;
exports.isReadOnlyItem = isReadOnlyItem;
exports.contains = contains;
exports.move = move;

var _dataHelpers = require('./dataHelpers');

function isDisabled(props) {
  return props.disabled === true || props.disabled === 'disabled';
}

function isReadOnly(props) {
  return props.readOnly === true || props.readOnly === 'readOnly';
}

function isDisabledItem(item, props) {
  return isDisabled(props) || contains(item, props.disabled, props.valueField);
}

function isReadOnlyItem(item, props) {
  return isReadOnly(props) || contains(item, props.readOnly, props.valueField);
}

function contains(item, values, valueField) {
  return Array.isArray(values) ? values.some(function (value) {
    return _dataHelpers.valueMatcher(item, value, valueField);
  }) : _dataHelpers.valueMatcher(item, values, valueField);
}

function move(dir, item, props, list) {
  var isDisabledOrReadonly = function isDisabledOrReadonly(item) {
    return isDisabledItem(item, props) || isReadOnlyItem(item, props);
  },
      stop = dir === 'next' ? list.last() : list.first(),
      next = list[dir](item);

  while (next !== stop && isDisabledOrReadonly(next)) next = list[dir](next);

  return isDisabledOrReadonly(next) ? item : next;
}

var widgetEnabled = interactionDecorator(true);

exports.widgetEnabled = widgetEnabled;
var widgetEditable = interactionDecorator(false);

exports.widgetEditable = widgetEditable;
function interactionDecorator(disabledOnly) {
  function wrap(method) {
    return function decoratedMethod() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!(isDisabled(this.props) || !disabledOnly && isReadOnly(this.props))) return method.apply(this, args);
    };
  }

  return function decorate(target, key, desc) {
    if (desc.initializer) {
      (function () {
        var init = desc.initializer;
        desc.initializer = function () {
          return wrap(init());
        };
      })();
    } else desc.value = wrap(desc.value);
    return desc;
  };
}