'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ListOption = require('./ListOption');

var _ListOption2 = _interopRequireDefault(_ListOption);

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

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
    data: _propTypes2.default.array,
    onSelect: _propTypes2.default.func,
    onMove: _propTypes2.default.func,

    optionComponent: _propTypes4.default.elementType,
    itemComponent: _propTypes4.default.elementType,
    groupComponent: _propTypes4.default.elementType,

    selected: _propTypes2.default.any,
    focused: _propTypes2.default.any,

    valueField: _propTypes4.default.accessor,
    textField: _propTypes4.default.accessor,

    disabled: _propTypes4.default.disabled.acceptsArray,
    readOnly: _propTypes4.default.readOnly.acceptsArray,

    groupBy: _propTypes4.default.accessor,

    messages: _propTypes2.default.shape({
      emptyList: _propTypes4.default.message
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onSelect: function onSelect() {},
      data: [],
      optionComponent: _ListOption2.default,
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

    var _props = this.props,
        className = _props.className,
        role = _props.role,
        data = _props.data,
        messages = _props.messages;
    var _state = this.state,
        sortedKeys = _state.sortedKeys,
        groups = _state.groups;


    var elementProps = _3.default.omitOwnProps(this);

    var items = [],
        idx = -1,
        group = void 0;

    var id = (0, _widgetHelpers.instanceId)(this);

    this._currentActiveID = null;

    if (data.length) {
      items = sortedKeys.reduce(function (items, key) {
        group = groups[key];
        items.push(_this._renderGroupHeader(key));

        for (var itemIdx = 0; itemIdx < group.length; itemIdx++) {
          items.push(_this._renderItem(key, group[itemIdx], ++idx));
        }return items;
      }, []);
    } else items = _react2.default.createElement(
      'li',
      { className: 'rw-list-empty' },
      _3.default.result(messages.emptyList, this.props)
    );

    return _react2.default.createElement(
      'ul',
      _extends({
        ref: 'scrollable',
        id: id,
        tabIndex: '-1',
        className: (0, _classnames2.default)(className, 'rw-list', 'rw-list-grouped'),
        role: role === undefined ? 'listbox' : role
      }, elementProps),
      items
    );
  },
  _renderGroupHeader: function _renderGroupHeader(group) {
    var GroupComponent = this.props.groupComponent,
        id = (0, _widgetHelpers.instanceId)(this);

    return _react2.default.createElement(
      'li',
      {
        key: 'item_' + group,
        tabIndex: '-1',
        role: 'separator',
        id: id + '_group_' + group,
        className: 'rw-list-optgroup'
      },
      GroupComponent ? _react2.default.createElement(GroupComponent, { item: group }) : group
    );
  },
  _renderItem: function _renderItem(group, item, idx) {
    var _props2 = this.props,
        focused = _props2.focused,
        selected = _props2.selected,
        onSelect = _props2.onSelect,
        textField = _props2.textField,
        valueField = _props2.valueField,
        ItemComponent = _props2.itemComponent,
        Option = _props2.optionComponent;


    var currentID = optionId((0, _widgetHelpers.instanceId)(this), idx),
        isDisabled = (0, _interaction.isDisabledItem)(item, this.props),
        isReadOnly = (0, _interaction.isReadOnlyItem)(item, this.props);

    if (focused === item) this._currentActiveID = currentID;

    return _react2.default.createElement(
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
      ItemComponent ? _react2.default.createElement(ItemComponent, {
        item: item,
        value: (0, _dataHelpers.dataValue)(item, valueField),
        text: (0, _dataHelpers.dataText)(item, textField),
        disabled: isDisabled,
        readOnly: isReadOnly
      }) : (0, _dataHelpers.dataText)(item, textField)
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

    (0, _warning2.default)(typeof groupBy !== 'string' || !data.length || _3.default.has(data[0], groupBy), '[React Widgets] You seem to be trying to group this list by a ' + ('property `' + groupBy + '` that doesn\'t exist in the dataset items, this may be a typo'));

    return data.reduce(function (grps, item) {
      var group = iter(item);

      _3.default.has(grps, group) ? grps[group].push(item) : (keys.push(group), grps[group] = [item]);

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

    (0, _widgetHelpers.notify)(this.props.onMove, [selected, _compat2.default.findDOMNode(this), this.props.focused]);
  },
  getItemDOMNode: function getItemDOMNode(item) {
    var list = _compat2.default.findDOMNode(this),
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