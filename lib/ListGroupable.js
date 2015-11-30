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

var _warning = require('warning');

var _warning2 = babelHelpers.interopRequireDefault(_warning);

var _utilDataHelpers = require('./util/dataHelpers');

var _utilWidgetHelpers = require('./util/widgetHelpers');

var _utilInteraction = require('./util/interaction');

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
    groupComponent: _utilPropTypes2['default'].elementType,

    selected: _react2['default'].PropTypes.any,
    focused: _react2['default'].PropTypes.any,

    valueField: _utilPropTypes2['default'].accessor,
    textField: _utilPropTypes2['default'].accessor,

    disabled: _utilPropTypes2['default'].disabled.acceptsArray,
    readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

    groupBy: _utilPropTypes2['default'].accessor,

    messages: _react2['default'].PropTypes.shape({
      emptyList: _utilPropTypes2['default'].message
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onSelect: function onSelect() {},
      data: [],
      optionComponent: _ListOption2['default'],
      ariaActiveDescendantKey: 'groupedList',
      messages: {
        emptyList: 'There are no items in this list'
      }
    };
  },

  getInitialState: function getInitialState() {
    var keys = [];

    return {
      groups: this._group(this.props.groupBy, this.props.data, keys),

      sortedKeys: keys
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var keys = [];

    if (nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy) this.setState({
      groups: this._group(nextProps.groupBy, nextProps.data, keys),
      sortedKeys: keys
    });
  },

  componentDidMount: function componentDidMount() {
    this.move();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.ariaActiveDescendant(this._currentActiveID);
    this.move();
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var className = _props.className;
    var role = _props.role;
    var data = _props.data;
    var messages = _props.messages;
    var onSelect = _props.onSelect;
    var selectedIndex = _props.selectedIndex;
    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'role', 'data', 'messages', 'onSelect', 'selectedIndex']);
    var id = _utilWidgetHelpers.instanceId(this);var _state = this.state;
    var sortedKeys = _state.sortedKeys;
    var groups = _state.groups;

    var items = [],
        idx = -1,
        group = undefined;

    this._currentActiveID = null;

    if (data.length) {
      items = sortedKeys.reduce(function (items, key) {
        group = groups[key];
        items.push(_this._renderGroupHeader(key));

        for (var itemIdx = 0; itemIdx < group.length; itemIdx++) items.push(_this._renderItem(key, group[itemIdx], ++idx));

        return items;
      }, []);
    } else items = _react2['default'].createElement(
      'li',
      { className: 'rw-list-empty' },
      _util_2['default'].result(messages.emptyList, this.props)
    );

    return _react2['default'].createElement(
      'ul',
      babelHelpers._extends({
        ref: 'scrollable',
        id: id,
        tabIndex: '-1',
        className: _classnames2['default'](className, 'rw-list', 'rw-list-grouped'),
        role: role === undefined ? 'listbox' : role
      }, props),
      items
    );
  },

  _renderGroupHeader: function _renderGroupHeader(group) {
    var GroupComponent = this.props.groupComponent,
        id = _utilWidgetHelpers.instanceId(this);

    return _react2['default'].createElement(
      'li',
      {
        key: 'item_' + group,
        tabIndex: '-1',
        role: 'separator',
        id: id + '_group_' + group,
        className: 'rw-list-optgroup'
      },
      GroupComponent ? _react2['default'].createElement(GroupComponent, { item: group }) : group
    );
  },

  _renderItem: function _renderItem(group, item, idx) {
    var _props2 = this.props;
    var focused = _props2.focused;
    var selected = _props2.selected;
    var onSelect = _props2.onSelect;
    var textField = _props2.textField;
    var valueField = _props2.valueField;
    var ItemComponent = _props2.itemComponent;
    var Option = _props2.optionComponent;

    var currentID = optionId(_utilWidgetHelpers.instanceId(this), idx),
        isDisabled = _utilInteraction.isDisabledItem(item, this.props),
        isReadOnly = _utilInteraction.isReadOnlyItem(item, this.props);

    if (focused === item) this._currentActiveID = currentID;

    return _react2['default'].createElement(
      Option,
      {
        key: 'item_' + group + '_' + idx,
        id: currentID,
        dataItem: item,
        focused: focused === item,
        selected: selected === item,
        disabled: isDisabled,
        readOnly: isReadOnly,
        onClick: isDisabled || isReadOnly ? undefined : onSelect.bind(null, item)
      },
      ItemComponent ? _react2['default'].createElement(ItemComponent, {
        item: item,
        value: _utilDataHelpers.dataValue(item, valueField),
        text: _utilDataHelpers.dataText(item, textField),
        disabled: isDisabled,
        readOnly: isReadOnly
      }) : _utilDataHelpers.dataText(item, textField)
    );
  },

  _isIndexOf: function _isIndexOf(idx, item) {
    return this.props.data[idx] === item;
  },

  _group: function _group(groupBy, data, keys) {
    var iter = typeof groupBy === 'function' ? groupBy : function (item) {
      return item[groupBy];
    };

    // the keys array ensures that groups are rendered in the order they came in
    // which means that if you sort the data array it will render sorted,
    // so long as you also sorted by group
    keys = keys || [];

    _warning2['default'](typeof groupBy !== 'string' || !data.length || _util_2['default'].has(data[0], groupBy), '[React Widgets] You are seem to be trying to group this list by a ' + ('property `' + groupBy + '` that doesn\'t exist in the dataset items, this may be a typo'));

    return data.reduce(function (grps, item) {
      var group = iter(item);

      _util_2['default'].has(grps, group) ? grps[group].push(item) : (keys.push(group), grps[group] = [item]);

      return grps;
    }, {});
  },

  _data: function _data() {
    var groups = this.state.groups;

    return this.state.sortedKeys.reduce(function (flat, grp) {
      return flat.concat(groups[grp]);
    }, []);
  },

  move: function move() {
    var selected = this.getItemDOMNode(this.props.focused);

    if (!selected) return;

    _utilWidgetHelpers.notify(this.props.onMove, [selected, _utilCompat2['default'].findDOMNode(this), this.props.focused]);
  },

  getItemDOMNode: function getItemDOMNode(item) {
    var list = _utilCompat2['default'].findDOMNode(this),
        groups = this.state.groups,
        idx = -1,
        itemIdx,
        child;

    this.state.sortedKeys.some(function (group) {
      itemIdx = groups[group].indexOf(item);
      idx++;

      if (itemIdx !== -1) return !!(child = list.children[idx + itemIdx + 1]);

      idx += groups[group].length;
    });

    return child;
  }

});
module.exports = exports['default'];