'use strict';

exports.__esModule = true;
exports.default = Footer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _localizers = require('./util/localizers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Footer(_ref) {
  var disabled = _ref.disabled;
  var readOnly = _ref.readOnly;
  var value = _ref.value;
  var onClick = _ref.onClick;
  var culture = _ref.culture;
  var format = _ref.format;

  return _react2.default.createElement(
    'div',
    { className: 'rw-footer' },
    _react2.default.createElement(
      _Button2.default,
      {
        disabled: !!(disabled || readOnly),
        onClick: onClick.bind(null, value)
      },
      _localizers.date.format(value, _localizers.date.getFormat('footer', format), culture)
    )
  );
}
module.exports = exports['default'];