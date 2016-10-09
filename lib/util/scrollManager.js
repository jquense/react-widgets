'use strict';

exports.__esModule = true;
exports.default = createScrollManager;

var _scrollTo = require('dom-helpers/util/scrollTo');

var _scrollTo2 = _interopRequireDefault(_scrollTo);

var _spyOnComponent = require('spy-on-component');

var _spyOnComponent2 = _interopRequireDefault(_spyOnComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createScrollManager(component) {
  var getScrollParent = arguments.length <= 1 || arguments[1] === undefined ? function (list) {
    return list.parentNode;
  } : arguments[1];


  var currentFocused = void 0,
      currentVisible = void 0,
      cancelScroll = void 0;

  var onMove = component.props.onMove;
  var mounted = true;

  (0, _spyOnComponent2.default)(component, {
    componentWillReceiveProps: function componentWillReceiveProps(_ref) {
      var nextOnMove = _ref.onMove;

      onMove = nextOnMove;
    },
    componentWillUnmount: function componentWillUnmount() {
      mounted = false;
    }
  });

  return function (selected, list, nextFocused) {
    if (!mounted) return;

    var lastVisible = currentVisible;
    var lastItem = currentFocused;
    var shown = void 0,
        changed = void 0;

    currentVisible = !(!list.offsetWidth || !list.offsetHeight);
    currentVisible = nextFocused;

    changed = lastItem !== nextFocused;
    shown = currentVisible && !lastVisible;

    if (shown || currentVisible && changed) {
      if (onMove) onMove(selected, list, nextFocused);else {
        cancelScroll && cancelScroll();
        cancelScroll = (0, _scrollTo2.default)(selected, false && getScrollParent(list));
      }
    }
  };
}
module.exports = exports['default'];