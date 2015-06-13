'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var React = require('react'),
    CustomPropTypes = require('./util/propTypes'),
    compat = require('./util/compat'),
    cx = require('classnames'),
    _ = require('./util/_');

module.exports = React.createClass({

  displayName: 'List',

  mixins: [require('./mixins/WidgetMixin'), require('./mixins/DataHelpersMixin'), require('./mixins/ListMovementMixin')],

  propTypes: {
    data: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    onMove: React.PropTypes.func,
    itemComponent: CustomPropTypes.elementType,

    selectedIndex: React.PropTypes.number,
    focusedIndex: React.PropTypes.number,
    valueField: React.PropTypes.string,
    textField: CustomPropTypes.accessor,

    optID: React.PropTypes.string,

    messages: React.PropTypes.shape({
      emptyList: CustomPropTypes.message
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      optID: '',
      onSelect: function onSelect() {},
      data: [],
      messages: {
        emptyList: 'There are no items in this list'
      }
    };
  },

  getInitialState: function getInitialState() {
    return {};
  },

  componentDidMount: function componentDidMount() {
    this.move();
  },

  componentDidUpdate: function componentDidUpdate() {
    this.move();
  },

  render: function render() {
    var _this = this;

    var _$omit = _.omit(this.props, ['data']);

    var className = _$omit.className;
    var props = babelHelpers.objectWithoutProperties(_$omit, ['className']);
    var ItemComponent = this.props.itemComponent;
    var items;

    items = !this.props.data.length ? React.createElement(
      'li',
      { className: 'rw-list-empty' },
      _.result(this.props.messages.emptyList, this.props)
    ) : this.props.data.map(function (item, idx) {
      var focused = item === _this.props.focused,
          selected = item === _this.props.selected;

      return React.createElement(
        'li',
        {
          tabIndex: '-1',
          key: 'item_' + idx,
          role: 'option',
          id: focused ? _this.props.optID : undefined,
          'aria-selected': selected,
          className: cx({
            'rw-list-option': true,
            'rw-state-focus': focused,
            'rw-state-selected': selected
          }),
          onClick: _this.props.onSelect.bind(null, item) },
        ItemComponent ? React.createElement(ItemComponent, { item: item, value: _this._dataValue(item), text: _this._dataText(item) }) : _this._dataText(item)
      );
    });

    return React.createElement(
      'ul',
      babelHelpers._extends({}, props, {
        className: (className || '') + ' rw-list',
        ref: 'scrollable',
        role: 'listbox' }),
      items
    );
  },

  _data: function _data() {
    return this.props.data;
  },

  move: function move() {
    var list = compat.findDOMNode(this),
        idx = this._data().indexOf(this.props.focused),
        selected = list.children[idx];

    if (!selected) return;

    this.notify('onMove', [selected, list, this.props.focused]);
  }

});