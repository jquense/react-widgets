'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WidgetButton = require('./WidgetButton');

var _WidgetButton2 = _interopRequireDefault(_WidgetButton);

var _localizers = require('./util/localizers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = function format(props) {
  return _localizers.date.getFormat('footer', props.format);
};

module.exports = _react2.default.createClass({

  displayName: 'Footer',

  render: function render() {
    var _props = this.props;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;
    var value = _props.value;


    return _react2.default.createElement(
      'div',
      { className: 'rw-footer' },
      _react2.default.createElement(
        _WidgetButton2.default,
        {
          disabled: !!(disabled || readOnly),
          onClick: this.props.onClick.bind(null, value)
        },
        _localizers.date.format(value, format(this.props), this.props.culture)
      )
    );
  }
});