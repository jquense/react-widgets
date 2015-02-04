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

    selectedIndex: React.PropTypes.number,
    focusedIndex: React.PropTypes.number,
    valueField: React.PropTypes.string,
    textField: React.PropTypes.string,

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

  getInitialState: function getInitialState() {
    return {};
  },


  componentDidMount: function componentDidMount() {
    this._setScrollPosition();
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (prevProps.focused !== this.props.focused) this._setScrollPosition();
  },

  render: function render() {
    var _this = this;
    var _$omit = _.omit(this.props, ["data"]);

    var className = _$omit.className;
    var props = _objectWithoutProperties(_$omit, ["className"]);
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
      _extends({}, props, {
        className: (className || "") + " rw-list",
        ref: "scrollable",
        role: "listbox" }),
      items
    );
  },

  _data: function _data() {
    return this.props.data;
  },

  _setScrollPosition: function () {
    var list = this.getDOMNode(),
        idx = this._data().indexOf(this.props.focused),
        selected = list.children[idx];

    if (!selected) return;

    this.notify("onMove", [selected, list]);
  }

});