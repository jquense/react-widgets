'use strict';

exports.__esModule = true;
exports.default = spyOnMount;

var _spyOnComponent = require('spy-on-component');

var _spyOnComponent2 = _interopRequireDefault(_spyOnComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function spyOnMount(componentInstance) {
  var mounted = true;

  // if (componentInstance.isMounted)
  //   return componentInstance.isMounted.bind(componentInstance);

  (0, _spyOnComponent2.default)(componentInstance, {
    componentWillUnmount: function componentWillUnmount() {
      mounted = false;
    }
  });

  return function () {
    return mounted;
  };
}
module.exports = exports['default'];