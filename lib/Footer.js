'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _localizers = require('./util/localizers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = function format(props) {
  return _localizers.date.getFormat('footer', props.format);
};

module.exports = (0, _createReactClass2.default)({

  displayName: 'Footer',

  render: function render() {
    var _props = this.props,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        value = _props.value;


    return _react2.default.createElement(
      'div',
      { className: 'rw-footer' },
      _react2.default.createElement(
        _Button2.default,
        {
          disabled: !!(disabled || readOnly),
          onClick: this.props.onClick.bind(null, value)
        },
        _localizers.date.format(value, format(this.props), this.props.culture)
      )
    );
  }
});