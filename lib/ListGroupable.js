"use strict";
var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    CustomPropTypes = require("./util/propTypes"),
    cx = require("./util/cx"),
    _ = require("./util/_");


module.exports = React.createClass({

  displayName: "List",

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/DataHelpersMixin"), require("./mixins/ListMovementMixin")],

  propTypes: {
    data: React.PropTypes.array,
    onSelect: React.PropTypes.func,
    onMove: React.PropTypes.func,

    itemComponent: CustomPropTypes.elementType,
    groupComponent: CustomPropTypes.elementType,

    selected: React.PropTypes.any,
    focused: React.PropTypes.any,

    valueField: React.PropTypes.string,
    textField: React.PropTypes.string,

    optID: React.PropTypes.string,

    groupBy: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.string]),

    messages: React.PropTypes.shape({
      emptyList: React.PropTypes.string
    }) },


  getDefaultProps: function () {
    return {
      optID: "",
      onSelect: function () {},
      data: [],
      messages: {
        emptyList: "There are no items in this list"
      }
    };
  },

  getInitialState: function () {
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

  componentDidMount: function componentDidMount(prevProps, prevState) {
    this._setScrollPosition();
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (prevProps.focused !== this.props.focused) this._setScrollPosition();
  },

  render: function () {
    var _this = this;
    var _$omit = _.omit(this.props, ["data", "selectedIndex"]);

    var className = _$omit.className;
    var props = _objectWithoutProperties(_$omit, ["className"]);
    var groups = this.state.groups;
    var items = [];
    var idx = -1;
    var group;

    if (this.props.data.length) {
      items = this.state.sortedKeys.reduce(function (items, key) {
        group = groups[key];
        items.push(_this._renderGroupHeader(key));

        for (var itemIdx = 0; itemIdx < group.length; itemIdx++) items.push(_this._renderItem(key, group[itemIdx], ++idx));

        return items;
      }, []);
    } else items = React.createElement(
      "li",
      null,
      this.props.messages.emptyList
    );

    return React.createElement(
      "ul",
      _extends({}, props, {
        className: (className || "") + " rw-list  rw-list-grouped",
        ref: "scrollable",
        role: "listbox" }),
      items
    );
  },

  _renderGroupHeader: function _renderGroupHeader(group) {
    var ItemComponent = this.props.groupComponent;

    return React.createElement(
      "li",
      {
        key: "item_" + group,
        tabIndex: "-1",
        role: "separator",
        className: "rw-list-optgroup" },
      ItemComponent ? React.createElement(ItemComponent, { item: group }) : group
    );
  },

  _renderItem: function _renderItem(group, item, idx) {
    var focused = this.props.focused === item,
        selected = this.props.selected === item,
        ItemComponent = this.props.itemComponent;

    //console.log('hi')
    return React.createElement(
      "li",
      {
        key: "item_" + group + "_" + idx,
        role: "option",
        id: focused ? this.props.optID : undefined,
        "aria-selected": selected,
        onClick: this.props.onSelect.bind(null, item),
        className: cx({
          "rw-state-focus": focused,
          "rw-state-selected": selected,
          "rw-list-option": true
        }) },
      ItemComponent ? React.createElement(ItemComponent, { item: item }) : this._dataText(item)
    );
  },

  _isIndexOf: function _isIndexOf(idx, item) {
    return this.props.data[idx] === item;
  },

  _group: function _group(groupBy, data, keys) {
    var iter = typeof groupBy === "function" ? groupBy : function (item) {
      return item[groupBy];
    };

    // the keys array ensures that groups are rendered in the order they came in
    // which means that if you sort the data array it will render sorted,
    // so long as you also sorted by group
    keys = keys || [];

    return data.reduce(function (grps, item) {
      var group = iter(item);

      _.has(grps, group) ? grps[group].push(item) : (keys.push(group), grps[group] = [item]);

      return grps;
    }, {});
  },

  _data: function _data() {
    var groups = this.state.groups;

    return this.state.sortedKeys.reduce(function (flat, grp) {
      return flat.concat(groups[grp]);
    }, []);
  },

  _setScrollPosition: function () {
    var selected = this.getItemDOMNode(this.props.focused);

    if (!selected) return;

    this.notify("onMove", [selected, this.getDOMNode()]);
  },

  getItemDOMNode: function getItemDOMNode(item) {
    var list = this.getDOMNode(),
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