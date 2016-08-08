'use strict';

exports.__esModule = true;

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MultiselectTag = require('./MultiselectTag');

var _MultiselectTag2 = _interopRequireDefault(_MultiselectTag);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dataHelpers = require('./util/dataHelpers');

var _interaction = require('./util/interaction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiselectTagList = (_temp2 = _class = function (_React$Component) {
  _inherits(MultiselectTagList, _React$Component);

  function MultiselectTagList() {
    var _temp, _this, _ret;

    _classCallCheck(this, MultiselectTagList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.handleDelete = function (val) {
      _this.props.onDelete(val);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  MultiselectTagList.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props;
    var focused = _props.focused;
    var value = _props.value;
    var id = _props.id;
    var activeId = _props.activeId;
    var textField = _props.textField;
    var label = _props.label;
    var ValueComponent = _props.valueComponent;


    return _react2.default.createElement(
      'ul',
      {
        id: id,
        tabIndex: '-1',
        role: 'listbox',
        'aria-label': label,
        className: 'rw-multiselect-taglist'
      },
      value.map(function (item, i) {
        var isFocused = focused === i;

        return _react2.default.createElement(
          _MultiselectTag2.default,
          {
            key: i,
            id: isFocused ? activeId : null,
            value: item,
            focused: isFocused,
            onClick: _this2.handleDelete,
            disabled: (0, _interaction.isDisabledItem)(item, _this2.props),
            readOnly: (0, _interaction.isReadOnlyItem)(item, _this2.props)
          },
          ValueComponent ? _react2.default.createElement(ValueComponent, { item: item }) : _react2.default.createElement(
            'span',
            null,
            (0, _dataHelpers.dataText)(item, textField)
          )
        );
      })
    );
  };

  MultiselectTagList.prototype.remove = function remove(idx) {
    var val = this.props.value[idx];

    if (val && !((0, _interaction.isDisabledItem)(val, this.props) || (0, _interaction.isReadOnlyItem)(val, this.props))) this.props.onDelete(val);
  };

  MultiselectTagList.prototype.removeNext = function removeNext() {
    var val = this.props.value[this.props.value.length - 1];

    if (val && !((0, _interaction.isDisabledItem)(val, this.props) || (0, _interaction.isReadOnlyItem)(val, this.props))) this.props.onDelete(val);
  };

  MultiselectTagList.prototype.clear = function clear() {
    this.setState({ focused: null });
  };

  MultiselectTagList.prototype.first = function first() {
    var idx = 0,
        value = this.props.value,
        l = value.length;

    while (idx < l && (0, _interaction.isDisabledItem)(value[idx], this.props)) {
      idx++;
    }return idx !== l ? idx : null;
  };

  MultiselectTagList.prototype.last = function last() {
    var value = this.props.value,
        idx = value.length - 1;

    while (idx > -1 && (0, _interaction.isDisabledItem)(value[idx], this.props)) {
      idx--;
    }return idx >= 0 ? idx : null;
  };

  MultiselectTagList.prototype.next = function next(current) {
    var nextIdx = current + 1,
        value = this.props.value,
        l = value.length;

    while (nextIdx < l && (0, _interaction.isDisabledItem)(nextIdx, this.props)) {
      nextIdx++;
    }if (current === null || nextIdx >= l) return null;

    return nextIdx;
  };

  MultiselectTagList.prototype.prev = function prev(current) {
    var nextIdx = current,
        value = this.props.value;

    if (nextIdx === null || nextIdx === 0) nextIdx = value.length;

    nextIdx--;

    while (nextIdx > -1 && (0, _interaction.isDisabledItem)(value[nextIdx], this.props)) {
      nextIdx--;
    }return nextIdx >= 0 ? nextIdx : null;
  };

  return MultiselectTagList;
}(_react2.default.Component), _class.propTypes = {
  id: _react2.default.PropTypes.string.isRequired,
  activeId: _react2.default.PropTypes.string.isRequired,
  label: _react2.default.PropTypes.string,

  value: _react2.default.PropTypes.array,
  focused: _react2.default.PropTypes.number,

  valueField: _react2.default.PropTypes.string,
  textField: _propTypes2.default.accessor,

  onDelete: _react2.default.PropTypes.func.isRequired,
  valueComponent: _react2.default.PropTypes.func,

  disabled: _propTypes2.default.disabled.acceptsArray,
  readOnly: _propTypes2.default.readOnly.acceptsArray
}, _temp2);
exports.default = MultiselectTagList;
module.exports = exports['default'];