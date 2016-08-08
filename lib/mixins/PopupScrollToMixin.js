'use strict';

exports.__esModule = true;

var _scrollTo2 = require('dom-helpers/util/scrollTo');

var _scrollTo3 = _interopRequireDefault(_scrollTo2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  _scrollTo: function _scrollTo(selected, list, focused) {
    var state = this._scrollState || (this._scrollState = {}),
        handler = this.props.onMove,
        lastVisible = state.visible,
        lastItem = state.focused,
        shown,
        changed;

    state.visible = !(!list.offsetWidth || !list.offsetHeight);
    state.focused = focused;

    changed = lastItem !== focused;
    shown = state.visible && !lastVisible;

    if (shown || state.visible && changed) {
      if (handler) handler(selected, list, focused);else {
        state.scrollCancel && state.scrollCancel();
        state.scrollCancel = (0, _scrollTo3.default)(selected, list);
      }
    }
  }
};
module.exports = exports['default'];