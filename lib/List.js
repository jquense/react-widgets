'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _ListOption = require('./ListOption');

var _ListOption2 = babelHelpers.interopRequireDefault(_ListOption);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _utilDataHelpers = require('./util/dataHelpers');

var _utilWidgetHelpers = require('./util/widgetHelpers');

var optionId = function optionId(id, idx) {
  return id + '__option__' + idx;
};

exports['default'] = _react2['default'].createClass({

  displayName: 'List',

  mixins: [require('./mixins/ListMovementMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: {
    data: _react2['default'].PropTypes.array,
    onSelect: _react2['default'].PropTypes.func,
    onMove: _react2['default'].PropTypes.func,

    optionComponent: _utilPropTypes2['default'].elementType,
    itemComponent: _utilPropTypes2['default'].elementType,

    selectedIndex: _react2['default'].PropTypes.number,
    focusedIndex: _react2['default'].PropTypes.number,
    valueField: _react2['default'].PropTypes.string,
    textField: _utilPropTypes2['default'].accessor,

    optionID: _react2['default'].PropTypes.func,

    messages: _react2['default'].PropTypes.shape({
      emptyList: _utilPropTypes2['default'].message
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      optID: '',
      onSelect: function onSelect() {},
      optionComponent: _ListOption2['default'],
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
    var _props = this.props;
    var data = _props.data;
    var focused = _props.focused;
    var idx = data.indexOf(focused);
    var activeId = optionId(_utilWidgetHelpers.instanceId(this), idx);

    this.ariaActiveDescendant(idx !== -1 ? activeId : null);

    this.move();
  },

  render: function render() {
    var _props2 = this.props;
    var className = _props2.className;
    var role = _props2.role;
    var data = _props2.data;
    var textField = _props2.textField;
    var valueField = _props2.valueField;
    var focused = _props2.focused;
    var selected = _props2.selected;
    var messages = _props2.messages;
    var onSelect = _props2.onSelect;
    var ItemComponent = _props2.itemComponent;
    var Option = _props2.optionComponent;
    var optionID = _props2.optionID;
    var props = babelHelpers.objectWithoutProperties(_props2, ['className', 'role', 'data', 'textField', 'valueField', 'focused', 'selected', 'messages', 'onSelect', 'itemComponent', 'optionComponent', 'optionID']);
    var id = _utilWidgetHelpers.instanceId(this);
    var items;

    items = !data.length ? _react2['default'].createElement(
      'li',
      { className: 'rw-list-empty' },
      _util_2['default'].result(messages.emptyList, this.props)
    ) : data.map(function (item, idx) {
      var currentId = optionId(id, idx);

      return _react2['default'].createElement(
        Option,
        {
          key: 'item_' + idx,
          id: currentId,
          dataItem: item,
          focused: focused === item, z: true,
          selected: selected === item,
          onClick: onSelect.bind(null, item)
        },
        ItemComponent ? _react2['default'].createElement(ItemComponent, {
          item: item,
          value: _utilDataHelpers.dataValue(item, valueField),
          text: _utilDataHelpers.dataText(item, textField)
        }) : _utilDataHelpers.dataText(item, textField)
      );
    });

    return _react2['default'].createElement(
      'ul',
      babelHelpers._extends({
        id: id,
        tabIndex: '-1',
        className: _classnames2['default'](className, 'rw-list'),
        role: role === undefined ? 'listbox' : role
      }, props),
      items
    );
  },

  _data: function _data() {
    return this.props.data;
  },

  move: function move() {
    var list = _utilCompat2['default'].findDOMNode(this),
        idx = this._data().indexOf(this.props.focused),
        selected = list.children[idx];

    if (!selected) return;

    _utilWidgetHelpers.notify(this.props.onMove, [selected, list, this.props.focused]);
  }

});
module.exports = exports['default'];