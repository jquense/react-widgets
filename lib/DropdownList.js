"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    activeElement = require("react/lib/getActiveElement"),
    _ = require("./util/_"),
    $ = require("./util/dom"),
    cx = require("classnames"),
    compat = require("./util/compat"),
    CustomPropTypes = require("./util/propTypes"),
    Popup = require("./Popup"),
    PlainList = require("./List"),
    GroupableList = require("./ListGroupable"),
    validateList = require("./util/validateListInterface"),
    createUncontrolledWidget = require("uncontrollable");

var propTypes = {
  //-- controlled props -----------
  value: React.PropTypes.any,
  onChange: React.PropTypes.func,
  open: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  //------------------------------------

  data: React.PropTypes.array,
  valueField: React.PropTypes.string,
  textField: CustomPropTypes.accessor,

  valueComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  onSelect: React.PropTypes.func,

  searchTerm: React.PropTypes.string,
  onSearch: React.PropTypes.func,

  busy: React.PropTypes.bool,

  delay: React.PropTypes.number,

  dropUp: React.PropTypes.bool,
  duration: React.PropTypes.number, //popup

  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),

  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["readOnly"])]),

  messages: React.PropTypes.shape({
    open: React.PropTypes.string })
};

var DropdownList = React.createClass({

  displayName: "DropdownList",

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/TimeoutMixin"), require("./mixins/PureRenderMixin"), require("./mixins/DataFilterMixin"), require("./mixins/DataHelpersMixin"), require("./mixins/PopupScrollToMixin"), require("./mixins/RtlParentContextMixin")],

  propTypes: propTypes,

  getDefaultProps: function () {
    return {
      delay: 500,
      value: "",
      open: false,
      data: [],
      searchTerm: "",
      messages: {
        open: "open dropdown",
        filterPlaceholder: "",
        emptyList: "There are no items in this list",
        emptyFilter: "The filter returned no results"
      }
    };
  },

  getInitialState: function () {
    var filter = this.props.open && this.props.filter,
        data = filter ? this.filter(this.props.data, props.searchTerm) : this.props.data,
        initialIdx = this._dataIndexOf(this.props.data, this.props.value);

    return {
      filteredData: filter && data,
      selectedItem: data[initialIdx],
      focusedItem: data[initialIdx] || data[0] };
  },

  componentDidUpdate: function () {
    this.refs.list && validateList(this.refs.list);
  },

  componentWillReceiveProps: function (props) {
    var filter = props.open && props.filter,
        data = filter ? this.filter(props.data, props.searchTerm) : props.data,
        idx = this._dataIndexOf(data, props.value);

    this.setState({
      filteredData: filter && data,
      selectedItem: data[idx],
      focusedItem: data[! ~idx ? 0 : idx]
    });
  },

  render: function () {
    var _this = this;

    var _$omit = _.omit(this.props, Object.keys(propTypes));

    var className = _$omit.className;
    var props = babelHelpers.objectWithoutProperties(_$omit, ["className"]);
    var ValueComponent = this.props.valueComponent;
    var data = this._data();
    var valueItem = this._dataItem(data, this.props.value);
    var optID = this._id("_option");
    var dropUp = this.props.dropUp;
    var renderList = _.isFirstFocusedRender(this) || this.props.open;
    var List = this.props.listComponent || this.props.groupBy && GroupableList || PlainList;

    return React.createElement(
      "div",
      babelHelpers._extends({}, props, {
        ref: "element",
        onKeyDown: this._keyDown,
        onClick: this._click,
        onFocus: this._focus.bind(null, true),
        onBlur: this._focus.bind(null, false),
        "aria-expanded": this.props.open,
        "aria-haspopup": true,
        "aria-busy": !!this.props.busy,
        "aria-activedescendent": this.props.open ? optID : undefined,
        "aria-disabled": this.props.disabled,
        "aria-readonly": this.props.readOnly,
        tabIndex: this.props.disabled ? "-1" : "0",
        className: cx(className, "rw-dropdownlist", "rw-widget", (function () {
          var _cx = {};
          _cx["rw-state-disabled"] = _this.props.disabled;
          _cx["rw-state-readonly"] = _this.props.readOnly;
          _cx["rw-state-focus"] = _this.state.focused;
          _cx["rw-rtl"] = _this.isRtl();
          _cx["rw-open" + (dropUp ? "-up" : "")] = _this.props.open;
          return _cx;
        })()) }),
      React.createElement(
        "span",
        { className: "rw-dropdownlist-picker rw-select rw-btn" },
        React.createElement(
          "i",
          { className: "rw-i rw-i-caret-down" + (this.props.busy ? " rw-loading" : "") },
          React.createElement(
            "span",
            { className: "rw-sr" },
            this.props.messages.open
          )
        )
      ),
      React.createElement(
        "div",
        { className: "rw-input" },
        !valueItem && props.placeholder ? React.createElement(
          "span",
          { className: "rw-placeholder" },
          props.placeholder
        ) : this.props.valueComponent ? React.createElement(ValueComponent, { item: valueItem }) : this._dataText(valueItem)
      ),
      React.createElement(
        Popup,
        babelHelpers._extends({}, _.pick(this.props, Object.keys(compat.type(Popup).propTypes)), {
          onOpen: this.focus,
          onOpening: function () {
            return _this.refs.list.forceUpdate();
          },
          onRequestClose: this.close }),
        React.createElement(
          "div",
          null,
          this.props.filter && this._renderFilter(),
          renderList && React.createElement(List, babelHelpers._extends({ ref: "list"
          }, _.pick(this.props, Object.keys(compat.type(List).propTypes)), {
            data: data,
            optID: optID,
            "aria-hidden": !this.props.open,
            selected: this.state.selectedItem,
            focused: this.props.open ? this.state.focusedItem : null,
            onSelect: this._onSelect,
            onMove: this._scrollTo,
            messages: {
              emptyList: this.props.data.length ? this.props.messages.emptyFilter : this.props.messages.emptyList
            } }))
        )
      )
    );
  },

  _renderFilter: function () {
    var _this = this;

    return React.createElement(
      "div",
      { ref: "filterWrapper", className: "rw-filter-input" },
      React.createElement(
        "span",
        { className: "rw-select rw-btn" },
        React.createElement("i", { className: "rw-i rw-i-search" })
      ),
      React.createElement("input", { ref: "filter", className: "rw-input",
        placeholder: this.props.messages.filterPlaceholder,
        value: this.props.searchTerm,
        onChange: function (e) {
          return _this.notify("onSearch", e.target.value);
        } })
    );
  },

  _focus: _.ifNotDisabled(true, function (focused, e) {
    var _this = this;

    var type = e.type;

    this.setTimeout("focus", function () {
      //console.log(type, focused)
      if (focused) _this.focus();else _this.close();

      if (focused !== _this.state.focused) {
        _this.notify(focused ? "onFocus" : "onBlur", e);
        _this.setState({ focused: focused });
      }
    });
  }),

  _onSelect: _.ifNotDisabled(function (data) {
    this.close();
    this.notify("onSelect", data);
    this.change(data);
  }),

  _click: _.ifNotDisabled(function (e) {
    var wrapper = this.refs.filterWrapper;

    if (!this.props.filter || !this.props.open) this.toggle();else if (!$.contains(compat.findDOMNode(wrapper), e.target)) this.close();

    this.notify("onClick", e);
  }),

  _keyDown: _.ifNotDisabled(function (e) {
    var _this = this;

    var self = this,
        key = e.key,
        alt = e.altKey,
        list = this.refs.list,
        focusedItem = this.state.focusedItem,
        selectedItem = this.state.selectedItem,
        isOpen = this.props.open,
        closeWithFocus = function () {
      _this.close(), compat.findDOMNode(_this).focus();
    };

    if (key === "End") {
      if (isOpen) this.setState({ focusedItem: list.last() });else change(list.last());
      e.preventDefault();
    } else if (key === "Home") {
      if (isOpen) this.setState({ focusedItem: list.first() });else change(list.first());
      e.preventDefault();
    } else if (key === "Escape" && isOpen) {
      closeWithFocus();
    } else if ((key === "Enter" || key === " ") && isOpen) {
      change(this.state.focusedItem, true);
    } else if (key === "ArrowDown") {
      if (alt) this.open();else if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else change(list.next(selectedItem));
      e.preventDefault();
    } else if (key === "ArrowUp") {
      if (alt) closeWithFocus();else if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else change(list.prev(selectedItem));
      e.preventDefault();
    } else if (!(this.props.filter && isOpen)) this.search(String.fromCharCode(e.keyCode), function (item) {
      isOpen ? _this.setState({ focusedItem: item }) : change(item);
    });

    this.notify("onKeyDown", [e]);

    function change(item, fromList) {
      if (!item) return;
      if (fromList) self.notify("onSelect", item);

      self.change(item);
    }
  }),

  change: function (data) {
    if (!_.isShallowEqual(data, this.props.value)) {
      this.notify("onChange", data);
      this.notify("onSearch", "");
      this.close();
    }
    compat.findDOMNode(this).focus();
  },

  focus: function () {
    var inst = this.props.filter && this.props.open ? this.refs.filter : this;

    if (activeElement() !== compat.findDOMNode(inst)) compat.findDOMNode(inst).focus();
  },

  _data: function () {
    return this.state.filteredData || this.props.data;
  },

  search: function (character, cb) {
    var _this = this;

    var word = ((this._searchTerm || "") + character).toLowerCase();

    this._searchTerm = word;

    this.setTimeout("search", function () {
      var list = _this.refs.list,
          key = _this.props.open ? "focusedItem" : "selectedItem",
          item = list.next(_this.state[key], word);

      _this._searchTerm = "";
      if (item) cb(item);
    }, this.props.delay);
  },

  open: function () {
    this.notify("onToggle", true);
  },

  close: function () {
    this.notify("onToggle", false);
  },

  toggle: function () {
    this.props.open ? this.close() : this.open();
  }

});

module.exports = createUncontrolledWidget(DropdownList, { open: "onToggle", value: "onChange", searchTerm: "onSearch" });

module.exports.BaseDropdownList = DropdownList;