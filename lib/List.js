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

var optionId = function optionId(id, idx) {
  return id + '__option__' + idx;
};

exports.default = _react2.default.createClass({

  displayName: 'List',

  mixins: [require('./mixins/ListMovementMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: {
    data: _react2.default.PropTypes.array,
    onSelect: _react2.default.PropTypes.func,
    onMove: _react2.default.PropTypes.func,

    optionComponent: _propTypes2.default.elementType,
    itemComponent: _propTypes2.default.elementType,

    selected: _react2.default.PropTypes.any,
    focused: _react2.default.PropTypes.any,
    valueField: _propTypes2.default.accessor,
    textField: _propTypes2.default.accessor,

    disabled: _propTypes2.default.disabled.acceptsArray,
    readOnly: _propTypes2.default.readOnly.acceptsArray,

    messages: _react2.default.PropTypes.shape({
      emptyList: _propTypes2.default.message
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onSelect: function onSelect() {},
      optionComponent: _ListOption2.default,
      ariaActiveDescendantKey: 'list',
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
    var _props = this.props,
        data = _props.data,
        focused = _props.focused,
        idx = data.indexOf(focused),
        activeId = optionId((0, _widgetHelpers.instanceId)(this), idx);


    this.ariaActiveDescendant(idx !== -1 ? activeId : null);

    this.move();
  },
  render: function render() {
    var _this = this;

    var _props2 = this.props,
        className = _props2.className,
        role = _props2.role,
        data = _props2.data,
        textField = _props2.textField,
        valueField = _props2.valueField,
        focused = _props2.focused,
        selected = _props2.selected,
        messages = _props2.messages,
        onSelect = _props2.onSelect,
        ItemComponent = _props2.itemComponent,
        Option = _props2.optionComponent;


    var id = (0, _widgetHelpers.instanceId)(this),
        items = void 0;

    var elementProps = _3.default.omitOwnProps(this);

    items = !data.length ? _react2.default.createElement(
      'li',
      { className: 'rw-list-empty' },
      _3.default.result(messages.emptyList, this.props)
    ) : data.map(function (item, idx) {
      var currentId = optionId(id, idx),
          isDisabled = (0, _interaction.isDisabledItem)(item, _this.props),
          isReadOnly = (0, _interaction.isReadOnlyItem)(item, _this.props);

      return _react2.default.createElement(
        Option,
        {
          key: 'item_' + idx,
          id: currentId,
          dataItem: item,
          disabled: isDisabled,
          readOnly: isReadOnly,
          focused: focused === item,
          selected: selected === item,
          onClick: isDisabled || isReadOnly ? undefined : onSelect.bind(null, item)
        },
        ItemComponent ? _react2.default.createElement(ItemComponent, {
          item: item,
          value: (0, _dataHelpers.dataValue)(item, valueField),
          text: (0, _dataHelpers.dataText)(item, textField),
          disabled: isDisabled,
          readOnly: isReadOnly
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