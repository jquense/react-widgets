'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListOption = require('./ListOption');

var _ListOption2 = _interopRequireDefault(_ListOption);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _dataHelpers = require('./util/dataHelpers');

var _widgetHelpers = require('./util/widgetHelpers');

var _interaction = require('./util/interaction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({

  displayName: 'List',

  mixins: [require('./mixins/ListMovementMixin')],

  propTypes: {
    data: _react2.default.PropTypes.array,
    onSelect: _react2.default.PropTypes.func,
    onMove: _react2.default.PropTypes.func,

    optionComponent: _propTypes2.default.elementType,
    itemComponent: _propTypes2.default.elementType,

    activeId: _react2.default.PropTypes.string,
    selected: _react2.default.PropTypes.any,
    focused: _react2.default.PropTypes.any,
    valueField: _propTypes2.default.accessor,
    textField: _propTypes2.default.accessor,

    disabled: _propTypes2.default.disabled.acceptsArray,

    messages: _react2.default.PropTypes.shape({
      emptyList: _propTypes2.default.message
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onSelect: function onSelect() {},
      optionComponent: _ListOption2.default,
      data: [],
      messages: {
        emptyList: 'There are no items in this list'
      }
    };
  },
  componentDidMount: function componentDidMount() {
    this.move();
  },
  componentDidUpdate: function componentDidUpdate() {
    this.move();
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var className = _props.className;
    var role = _props.role;
    var data = _props.data;
    var activeId = _props.activeId;
    var textField = _props.textField;
    var valueField = _props.valueField;
    var focused = _props.focused;
    var selected = _props.selected;
    var messages = _props.messages;
    var onSelect = _props.onSelect;
    var ItemComponent = _props.itemComponent;
    var Option = _props.optionComponent;


    var id = (0, _widgetHelpers.instanceId)(this),
        items = void 0;

    var elementProps = _3.default.omitOwnProps(this);

    items = !data.length ? _react2.default.createElement(
      'li',
      { className: 'rw-list-empty' },
      _3.default.result(messages.emptyList, this.props)
    ) : data.map(function (item, idx) {
      var isDisabled = (0, _interaction.isDisabledItem)(item, _this.props);
      var isFocused = focused === item;
      var id = isFocused ? activeId : undefined;

      return _react2.default.createElement(
        Option,
        {
          id: id,
          key: 'item_' + idx,
          dataItem: item,
          disabled: isDisabled,
          focused: isFocused,
          selected: selected === item,
          onClick: isDisabled ? undefined : onSelect.bind(null, item)
        },
        ItemComponent ? _react2.default.createElement(ItemComponent, {
          item: item,
          value: (0, _dataHelpers.dataValue)(item, valueField),
          text: (0, _dataHelpers.dataText)(item, textField),
          disabled: isDisabled
        }) : (0, _dataHelpers.dataText)(item, textField)
      );
    });

    return _react2.default.createElement(
      'ul',
      _extends({
        id: id,
        tabIndex: '-1',
        className: (0, _classnames2.default)(className, 'rw-list'),
        role: role === undefined ? 'listbox' : role
      }, elementProps),
      items
    );
  },
  _data: function _data() {
    return this.props.data;
  },
  move: function move() {
    var list = _compat2.default.findDOMNode(this),
        idx = this._data().indexOf(this.props.focused),
        selected = list.children[idx];

    if (!selected) return;

    (0, _widgetHelpers.notify)(this.props.onMove, [selected, list, this.props.focused]);
  }
});
module.exports = exports['default'];