'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = (_temp = _class = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Select.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var bordered = _props.bordered;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['className', 'bordered', 'children']);

    return _react2.default.createElement(
      'span',
      {
        className: (0, _classnames2.default)(className, 'rw-select', bordered && 'rw-select-bordered')
      },
      children ? _react2.default.Children.map(children, function (child) {
        return child && _react2.default.cloneElement(child, { variant: 'select' });
      }) : _react2.default.createElement(_Button2.default, _extends({}, props, { variant: 'select' }))
    );
  };

  return Select;
}(_react2.default.Component), _class.propTypes = {
  bordered: _react2.default.PropTypes.bool
}, _temp);
exports.default = Select;
module.exports = exports['default'];