'use strict';

var React = require('react'),
    Btn = require('./WidgetButton'),
    localizers = require('./util/configuration').locale;

var format = function format(props) {
  return props.format || localizers.date.formats.footer;
};

module.exports = React.createClass({

  displayName: 'Footer',

  render: function render() {
    var now = this.props.value,
        formatted = localizers.date.format(now, format(this.props), this.props.culture);

    return React.createElement(
      'div',
      { className: 'rw-footer' },
      React.createElement(
        Btn,
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