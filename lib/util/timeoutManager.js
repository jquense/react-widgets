'use strict';

exports.__esModule = true;
exports.default = createTimeoutManager;

var _spyOnComponent = require('spy-on-component');

var _spyOnComponent2 = _interopRequireDefault(_spyOnComponent);

var _mountManager = require('./mountManager');

var _mountManager2 = _interopRequireDefault(_mountManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createTimeoutManager(componentInstance) {
  var isMounted = (0, _mountManager2.default)(componentInstance);
  var timers = Object.create(null);
  var manager = void 0;

  (0, _spyOnComponent2.default)(componentInstance, {
    componentWillUnmount: function componentWillUnmount() {
      for (var k in timers) {
        clearTimeout(timers[k]);
      }timers = null;
    }
  });

  return manager = {
    clear: function clear(key) {
      clearTimeout(timers[key]);
    },
    set: function set(key, fn, ms) {
      if (!isMounted()) return;

      manager.clear(key);
      timers[key] = setTimeout(fn, ms);
    }
  };
}
module.exports = exports['default'];