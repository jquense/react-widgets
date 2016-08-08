'use strict';

exports.__esModule = true;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = (_temp = _class = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    var _props = this.props;
    var messages = _props.messages;
    var label = _props.label;
    var labelId = _props.labelId;
    var onMoveRight = _props.onMoveRight;
    var onMoveLeft = _props.onMoveLeft;
    var onViewChange = _props.onViewChange;
    var prevDisabled = _props.prevDisabled;
    var upDisabled = _props.upDisabled;
    var nextDisabled = _props.nextDisabled;


    var rtl = this.context.isRtl;

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
  };

  return Header;
}(_react2.default.Component), _class.propTypes = {
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
}, _class.defaultProps = {
  messages: {
    moveBack: 'navigate back',
    moveForward: 'navigate forward'
  }
}, _class.contextTypes = {
  isRtl: _react2.default.PropTypes.bool
}, _temp);
exports.default = Header;
module.exports = exports['default'];