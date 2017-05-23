'use strict';

exports.__esModule = true;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _dataHelpers = require('./util/dataHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropdownListInput = (_temp = _class = function (_React$Component) {
  _inherits(DropdownListInput, _React$Component);

  function DropdownListInput() {
    _classCallCheck(this, DropdownListInput);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DropdownListInput.prototype.render = function render() {
    var _props = this.props,
        placeholder = _props.placeholder,
        value = _props.value,
        textField = _props.textField,
        Component = _props.valueComponent;


    return _react2.default.createElement(
      'div',
      { className: 'rw-input' },
      !value && placeholder ? _react2.default.createElement(
        'span',
        { className: 'rw-placeholder' },
        placeholder
      ) : Component ? _react2.default.createElement(Component, { item: value }) : (0, _dataHelpers.dataText)(value, textField)
    );
  };

  return DropdownListInput;
}(_react2.default.Component), _class.propTypes = {
  value: _propTypes2.default.any,
  placeholder: _propTypes2.default.string,
  textField: _propTypes4.default.accessor,
  valueComponent: _propTypes4.default.elementType
}, _temp);
exports.default = DropdownListInput;
module.exports = exports['default'];