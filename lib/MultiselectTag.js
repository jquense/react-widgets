'use strict';

exports.__esModule = true;

var _class, _temp2;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiselectTag = (_temp2 = _class = function (_React$Component) {
  _inherits(MultiselectTag, _React$Component);

  function MultiselectTag() {
    var _temp, _this, _ret;

    _classCallCheck(this, MultiselectTag);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.onClick = function () {
      var _this$props = _this.props;
      var value = _this$props.value;
      var disabled = _this$props.disabled;
      var readOnly = _this$props.readOnly;
      var onClick = _this$props.onClick;


      if (disabled || readOnly) {
        return;
      }

      onClick(value);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MultiselectTag.prototype.renderDelete = function renderDelete() {
    var _props = this.props;
    var label = _props.label;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;


    return _react2.default.createElement(
      _Button2.default,
      {
        variant: 'select',
        onClick: this.onClick,
        className: 'rw-multiselect-tag-btn',
        disabled: disabled || readOnly,
        'aria-label': label || 'Remove item'
      },
      _react2.default.createElement(
        'span',
        { 'aria-hidden': 'true' },
        '×'
      )
    );
  };

  MultiselectTag.prototype.render = function render() {
    var _props2 = this.props;
    var id = _props2.id;
    var children = _props2.children;
    var focused = _props2.focused;
    var disabled = _props2.disabled;
    var readOnly = _props2.readOnly;

    var tabIndex = disabled ? undefined : '-1';

    return _react2.default.createElement(
      'li',
      {
        id: id,
        role: 'option',
        tabIndex: tabIndex,
        className: (0, _classnames2.default)('rw-multiselect-tag', disabled && 'rw-state-disabled', readOnly && 'rw-state-readonly', focused && !disabled && 'rw-state-focus')
      },
      children,
      this.renderDelete()
    );
  };

  return MultiselectTag;
}(_react2.default.Component), _class.propTypes = {
  id: _react2.default.PropTypes.string.isRequired,
  onClick: _react2.default.PropTypes.func.isRequired,
  focused: _react2.default.PropTypes.bool,
  readOnly: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool,
  label: _react2.default.PropTypes.string,
  value: _react2.default.PropTypes.any
}, _temp2);
exports.default = MultiselectTag;
module.exports = exports['default'];