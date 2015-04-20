"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    CustomPropTypes = require("./util/propTypes"),
    compat = require("./util/compat"),
    cx = require("classnames"),
    _ = require("./util/_"),
    $ = require("./util/dom");

module.exports = React.createClass({

  displayName: "List",

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/DataHelpersMixin"), require("./mixins/ListMovementMixin")],

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
    return {};
  },

  componentDidMount: function () {
    this.move();
  },

  componentDidUpdate: function (prevProps) {
    this.move();
  },

  render: function () {
    var _this = this;

    var _$omit = _.omit(this.props, ["data"]);

    var className = _$omit.className;
    var props = babelHelpers.objectWithoutProperties(_$omit, ["className"]);
    var ItemComponent = this.props.itemComponent;
    var items;

    items = !this.props.data.length ? React.createElement(
      "li",
      null,
      this.props.messages.emptyList
    ) : this.props.data.map(function (item, idx) {
      var focused = item === _this.props.focused,
          selected = item === _this.props.selected;

      return React.createElement(
        "li",
        {
          tabIndex: "-1",
          key: "item_" + idx,
          role: "option",
          id: focused ? _this.props.optID : undefined,
          "aria-selected": selected,
          className: cx({
            "rw-list-option": true,
            "rw-state-focus": focused,
            "rw-state-selected": selected }),
          onClick: _this.props.onSelect.bind(null, item) },
        ItemComponent ? React.createElement(ItemComponent, { item: item }) : _this._dataText(item)
      );
    });

    return React.createElement(
      "ul",
      babelHelpers._extends({}, props, {
        className: (className || "") + " rw-list",
        ref: "scrollable",
        role: "listbox" }),
      items
    );
  },

  _data: function () {
    return this.props.data;
  },

  move: function () {
    var list = compat.findDOMNode(this),
        idx = this._data().indexOf(this.props.focused),
        selected = list.children[idx];

    if (!selected) return;

    this.notify("onMove", [selected, list, this.props.focused]);
  }

});