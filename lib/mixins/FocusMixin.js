'use strict';

exports.__esModule = true;
exports.default = FocusMixin;

var _widgetHelpers = require('../util/widgetHelpers');

var _interaction = require('../util/interaction');

var _compat = require('../util/compat');

var _compat2 = _interopRequireDefault(_compat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function FocusMixin(_ref) {
  var _desc, _value, _obj;

  var willHandle = _ref.willHandle,
      didHandle = _ref.didHandle;

  function _handleFocus(inst, focused, event) {
    var handler = inst.props[focused ? 'onFocus' : 'onBlur'];

    if (handler && event) event.persist();

    if (willHandle && willHandle.call(inst, focused, event) === false) return;

    inst.setTimeout('focus', function () {
      _compat2.default.batchedUpdates(function () {
        if (didHandle) didHandle.call(inst, focused, event);

        if (focused !== inst.state.focused) {
          (0, _widgetHelpers.notify)(handler, event);
          if (inst.isMounted()) inst.setState({ focused: focused });
        }
      });
    });
  }

  return _obj = {
    handleBlur: function handleBlur(event) {
      _handleFocus(this, false, event);
    },
    handleFocus: function handleFocus(event) {
      _handleFocus(this, true, event);
    }
  }, (_applyDecoratedDescriptor(_obj, 'handleBlur', [_interaction.widgetEnabled], Object.getOwnPropertyDescriptor(_obj, 'handleBlur'), _obj), _applyDecoratedDescriptor(_obj, 'handleFocus', [_interaction.widgetEnabled], Object.getOwnPropertyDescriptor(_obj, 'handleFocus'), _obj)), _obj;
}
module.exports = exports['default'];