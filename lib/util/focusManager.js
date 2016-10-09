'use strict';

exports.__esModule = true;
exports.default = createFocusManager;

var _widgetHelpers = require('./widgetHelpers');

var _interaction = require('./interaction');

var _compat = require('./compat');

var _compat2 = _interopRequireDefault(_compat);

var _timeoutManager = require('./timeoutManager');

var _timeoutManager2 = _interopRequireDefault(_timeoutManager);

var _mountManager = require('./mountManager');

var _mountManager2 = _interopRequireDefault(_mountManager);

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

function createFocusManager(instance, _ref) {
  var _desc, _value, _obj;

  var willHandle = _ref.willHandle;
  var didHandle = _ref.didHandle;

  var timeouts = (0, _timeoutManager2.default)(instance);
  var isMounted = (0, _mountManager2.default)(instance);

  function _handleFocus(inst, focused, event) {
    var handler = inst.props[focused ? 'onFocus' : 'onBlur'];

    if (handler && event) event.persist();

    if (willHandle && willHandle.call(inst, focused, event) === false) return;

    timeouts.set('focus', function () {
      _compat2.default.batchedUpdates(function () {
        if (didHandle) didHandle.call(inst, focused, event);

        if (focused !== inst.state.focused) {
          (0, _widgetHelpers.notify)(handler, event);

          if (isMounted()) inst.setState({ focused: focused });
        }
      });
    });
  }

  var methods = (_obj = {
    handleBlur: function handleBlur(event) {
      _handleFocus(this, false, event);
    },
    handleFocus: function handleFocus(event) {
      _handleFocus(this, true, event);
    }
  }, (_applyDecoratedDescriptor(_obj, 'handleBlur', [_interaction.widgetEnabled], Object.getOwnPropertyDescriptor(_obj, 'handleBlur'), _obj), _applyDecoratedDescriptor(_obj, 'handleFocus', [_interaction.widgetEnabled], Object.getOwnPropertyDescriptor(_obj, 'handleFocus'), _obj)), _obj);

  methods.handleBlur = methods.handleBlur.bind(instance);
  methods.handleFocus = methods.handleFocus.bind(instance);

  return methods;
}
module.exports = exports['default'];