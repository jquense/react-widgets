'use strict';

exports.__esModule = true;
exports.widgetEditable = exports.widgetEnabled = undefined;
exports.isDisabled = isDisabled;
exports.isReadOnly = isReadOnly;
exports.isDisabledItem = isDisabledItem;
exports.isReadOnlyItem = isReadOnlyItem;
exports.contains = contains;
exports.move = move;

var _dataHelpers = require('./dataHelpers');

function isDisabled(_ref) {
  var disabled = _ref.disabled;

  return disabled === true || disabled === 'disabled';
}

function isReadOnly(_ref2) {
  var readOnly = _ref2.readOnly;

  return readOnly === true || readOnly === 'readOnly';
}

function isDisabledItem(item, props) {
  return isDisabled(props) || contains(item, props.disabled, props.valueField);
}

function isReadOnlyItem(item, props) {
  return isReadOnly(props) || contains(item, props.readOnly, props.valueField);
}

function contains(item, values, valueField) {
  return Array.isArray(values) ? values.some(function (value) {
    return (0, _dataHelpers.valueMatcher)(item, value, valueField);
  }) : (0, _dataHelpers.valueMatcher)(item, values, valueField);
}

function move(dir, item, props, list) {
  var isDisabledOrReadonly = function isDisabledOrReadonly(item) {
    return isDisabledItem(item, props) || isReadOnlyItem(item, props);
  },
      stop = dir === 'next' ? list.last() : list.first(),
      next = list[dir](item);

  while (next !== stop && isDisabledOrReadonly(next)) {
    next = list[dir](next);
  }return isDisabledOrReadonly(next) ? item : next;
}

var widgetEnabled = exports.widgetEnabled = interactionDecorator(true);

var widgetEditable = exports.widgetEditable = interactionDecorator(false);

function interactionDecorator(disabledOnly) {
  function wrap(method) {
    return function decoratedMethod() {
      if (!(isDisabled(this.props) || !disabledOnly && isReadOnly(this.props))) {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return method.apply(this, args);
      }
    };
  }

  return function decorate(target, key, desc) {
    if (desc.initializer) {
      (function () {
        var init = desc.initializer;

        desc.initializer = function () {
          return wrap(init.call(this)).bind(this);
        };
      })();
    } else desc.value = wrap(desc.value);
    return desc;
  };
}