'use strict';

var babelHelpers = require('../util/babelHelpers.js');

exports.__esModule = true;
exports['default'] = FocusMixin;

var _utilWidgetHelpers = require('../util/widgetHelpers');

var _utilInteraction = require('../util/interaction');

var _utilCompat = require('../util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

function FocusMixin(_ref) {
  var willHandle = _ref.willHandle;
  var didHandle = _ref.didHandle;

  function _handleFocus(inst, focused, event) {
    var handler = inst.props[focused ? 'onFocus' : 'onBlur'];

    if (handler && event) event.persist();

    if (willHandle && willHandle.call(inst, focused, event) === false) return;

    inst.setTimeout('focus', function () {
      _utilCompat2['default'].batchedUpdates(function () {
        if (didHandle) didHandle.call(inst, focused, event);

        if (focused !== inst.state.focused) {
          _utilWidgetHelpers.notify(handler, event);
          if (inst.isMounted()) inst.setState({ focused: focused });
        }
      });
    });
  }

  return babelHelpers.createDecoratedObject([{
    key: 'handleBlur',
    decorators: [_utilInteraction.widgetEnabled],
    value: function handleBlur(event) {
      _handleFocus(this, false, event);
    }
  }, {
    key: 'handleFocus',
    decorators: [_utilInteraction.widgetEnabled],
    value: function handleFocus(event) {
      _handleFocus(this, true, event);
    }
  }]);
}

module.exports = exports['default'];