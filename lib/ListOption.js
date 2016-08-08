'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListOption = (_temp = _class = function (_React$Component) {
  _inherits(ListOption, _React$Component);

  function ListOption() {
    _classCallCheck(this, ListOption);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ListOption.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var focused = _props.focused;
    var selected = _props.selected;
    var disabled = _props.disabled;


    var props = _3.default.omitOwnProps(this);

    var classes = {
      'rw-state-focus': focused,
      'rw-state-selected': selected,
      'rw-state-disabled': disabled
    };

    return _react2.default.createElement(
      'li',
      _extends({
        role: 'option',
        tabIndex: !disabled ? '-1' : undefined,
        'aria-selected': !!selected,
        className: (0, _classnames2.default)('rw-list-option', className, classes)
      }, props),
      children
    );
  };

  return ListOption;
}(_react2.default.Component), _class.propTypes = {
  dataItem: _react2.default.PropTypes.any,
  focused: _react2.default.PropTypes.bool,
  selected: _react2.default.PropTypes.bool,
  disabled: _react2.default.PropTypes.bool
}, _temp);
exports.default = ListOption;
module.exports = exports['default'];