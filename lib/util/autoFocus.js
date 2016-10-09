'use strict';

exports.__esModule = true;
exports.default = makeAutoFocusable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _spyOnComponent = require('spy-on-component');

var _spyOnComponent2 = _interopRequireDefault(_spyOnComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeAutoFocusable(instance) {
  (0, _spyOnComponent2.default)(instance, {
    componentDidMount: function componentDidMount() {
      var autoFocus = this.props.autoFocus;


      if (autoFocus) this.focus ? this.focus() : (0, _reactDom.findDOMNode)(this).focus();
    }
  });
}

makeAutoFocusable.propTypes = {
  autoFocus: _react2.default.PropTypes.bool
};
module.exports = exports['default'];