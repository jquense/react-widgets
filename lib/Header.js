'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
  displayName: 'Header',
  propTypes: {
    label: _react2.default.PropTypes.string.isRequired,
    labelId: _react2.default.PropTypes.string,

    upDisabled: _react2.default.PropTypes.bool.isRequired,
    prevDisabled: _react2.default.PropTypes.bool.isRequired,
    nextDisabled: _react2.default.PropTypes.bool.isRequired,
    onViewChange: _react2.default.PropTypes.func.isRequired,
    onMoveLeft: _react2.default.PropTypes.func.isRequired,
    onMoveRight: _react2.default.PropTypes.func.isRequired,

    messages: _react2.default.PropTypes.shape({
      moveBack: _react2.default.PropTypes.string,
      moveForward: _react2.default.PropTypes.string
    })
  },

  mixins: [require('./mixins/PureRenderMixin'), require('./mixins/RtlChildContextMixin')],

  getDefaultProps: function getDefaultProps() {
    return {
      messages: {
        moveBack: 'navigate back',
        moveForward: 'navigate forward'
      }
    };
  },
  render: function render() {
    var _props = this.props,
        messages = _props.messages,
        label = _props.label,
        labelId = _props.labelId,
        onMoveRight = _props.onMoveRight,
        onMoveLeft = _props.onMoveLeft,
        onViewChange = _props.onViewChange,
        prevDisabled = _props.prevDisabled,
        upDisabled = _props.upDisabled,
        nextDisabled = _props.nextDisabled;


    var rtl = this.isRtl();

    return _react2.default.createElement(
      'div',
      { className: 'rw-header' },
      _react2.default.createElement(_Button2.default, {
        className: 'rw-btn-left',
        onClick: onMoveLeft,
        disabled: prevDisabled,
        label: messages.moveBack,
        icon: 'caret-' + (rtl ? 'right' : 'left')
      }),
      _react2.default.createElement(
        _Button2.default,
        {
          id: labelId,
          onClick: onViewChange,
          className: 'rw-btn-view',
          disabled: upDisabled,
          'aria-live': 'polite',
          'aria-atomic': 'true'
        },
        label
      ),
      _react2.default.createElement(_Button2.default, {
        className: 'rw-btn-right',
        onClick: onMoveRight,
        disabled: nextDisabled,
        label: messages.moveForward,
        icon: 'caret-' + (rtl ? 'left' : 'right')
      })
    );
  }
});
module.exports = exports['default'];