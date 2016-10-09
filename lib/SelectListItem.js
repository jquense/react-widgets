'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = getSelectListItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListOption = require('./ListOption');

var _ListOption2 = _interopRequireDefault(_ListOption);

var _widgetHelpers = require('./util/widgetHelpers');

var _interaction = require('./util/interaction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getSelectListItem(parent) {
  var _class, _temp2;

  var SelectListItem = (_temp2 = _class = function (_React$Component) {
    _inherits(SelectListItem, _React$Component);

    function SelectListItem() {
      var _temp, _this, _ret;

      _classCallCheck(this, SelectListItem);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleChange = function (e) {
        var _this$props = _this.props;
        var disabled = _this$props.disabled;
        var readOnly = _this$props.readOnly;
        var dataItem = _this$props.dataItem;


        if (!disabled && !readOnly) parent.handleChange(dataItem, e.target.checked);
      }, _this.handleMouseDown = function () {
        parent._clicking = true;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    SelectListItem.prototype.render = function render() {
      var _props = this.props;
      var children = _props.children;
      var disabled = _props.disabled;
      var readOnly = _props.readOnly;
      var item = _props.dataItem;
      var _parent$props = parent.props;
      var multiple = _parent$props.multiple;
      var _parent$props$name = _parent$props.name;
      var name = _parent$props$name === undefined ? (0, _widgetHelpers.instanceId)(parent, '_name') : _parent$props$name;


      var checked = (0, _interaction.contains)(item, parent._values(), parent.props.valueField),
          type = multiple ? 'checkbox' : 'radio';

      return _react2.default.createElement(
        _ListOption2.default,
        _extends({}, this.props, {
          role: type,
          'aria-checked': !!checked
        }),
        _react2.default.createElement(
          'label',
          {
            onMouseDown: this.handleMouseDown,
            className: 'rw-select-list-label'
          },
          _react2.default.createElement('input', {
            name: name,
            type: type,
            tabIndex: '-1',
            role: 'presentation',
            checked: checked,
            className: 'rw-select-list-input',
            disabled: disabled || readOnly,
            onChange: this.handleChange
          }),
          children
        )
      );
    };

    return SelectListItem;
  }(_react2.default.Component), _class.propTypes = {
    disabled: _react2.default.PropTypes.bool,
    readOnly: _react2.default.PropTypes.bool,
    dataItem: _react2.default.PropTypes.any
  }, _temp2);


  return SelectListItem;
}
module.exports = exports['default'];