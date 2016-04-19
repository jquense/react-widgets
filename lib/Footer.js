'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _WidgetButton = require('./WidgetButton');

var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

var _utilLocalizers = require('./util/localizers');

var format = function format(props) {
  return _utilLocalizers.date.getFormat('footer', props.format);
};

module.exports = _react2['default'].createClass({

  displayName: 'Footer',

  render: function render() {
    var now = this.props.value,
        formatted = _utilLocalizers.date.format(now, format(this.props), this.props.culture);

    return _react2['default'].createElement(
      'div',
      { className: 'rw-footer' },
      _react2['default'].createElement(
        _WidgetButton2['default'],
        { tabIndex: '-1',
          'aria-disabled': !!this.props.disabled,
          'aria-readonly': !!this.props.readOnly,
          disabled: this.props.disabled,
          readOnly: this.props.readOnly,
          onClick: this.props.onClick.bind(null, now)
        },
        formatted
      )
    );
  }

});