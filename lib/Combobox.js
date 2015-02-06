"use strict";
var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    cx = require("./util/cx"),
    _ = require("./util/_"),
    filter = require("./util/filter"),
    Popup = require("./Popup"),
    Btn = require("./WidgetButton"),
    Input = require("./ComboboxInput"),
    controlledInput = require("./util/controlledInput"),
    CustomPropTypes = require("./util/propTypes"),
    PlainList = require("./List"),
    GroupableList = require("./ListGroupable"),
    validateList = require("./util/validateListInterface");

var propTypes = {
  //-- controlled props -----------
  value: React.PropTypes.any,
  onChange: React.PropTypes.func,
  open: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  //------------------------------------

  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.string]),

  data: React.PropTypes.array,
  valueField: React.PropTypes.string,
  textField: React.PropTypes.string,
  name: React.PropTypes.string,

  onSelect: React.PropTypes.func,

  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),

  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["readOnly"])]),

  suggest: React.PropTypes.bool,
  busy: React.PropTypes.bool,

  duration: React.PropTypes.number, //popup
  placeholder: React.PropTypes.string,

  messages: React.PropTypes.shape({
    open: React.PropTypes.string,
    emptyList: React.PropTypes.string,
    emptyFilter: React.PropTypes.string
  })
};

var ComboBox = React.createClass({

  displayName: "ComboBox",

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/TimeoutMixin"), require("./mixins/DataFilterMixin"), require("./mixins/DataHelpersMixin"), require("./mixins/PopupScrollToMixin"), require("./mixins/RtlParentContextMixin")],

  propTypes: propTypes,

  getInitialState: function () {
    var items = this.process(this.props.data, this.props.value),
        idx = this._dataIndexOf(items, this.props.value);

    return {
      selectedItem: items[idx],
      focusedItem: items[! ~idx ? 0 : idx],
      processedData: items,
      open: false
    };
  },

  getDefaultProps: function () {
    return {
      data: [],
      value: "",
      open: false,
      suggest: false,
      filter: false,
      delay: 500,

      messages: {
        open: "open combobox",
        emptyList: "There are no items in this list",
        emptyFilter: "The filter returned no results"
      }
    };
  },

  componentDidMount: function () {
    validateList(this.refs.list);
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    var isSuggesting = this.refs.input && this.refs.input.isSuggesting(),
        stateChanged = !_.isShallowEqual(nextState, this.state),
        valueChanged = !_.isShallowEqual(nextProps, this.props);

    return isSuggesting || stateChanged || valueChanged;
  },

  componentWillReceiveProps: function (nextProps) {
    var rawIdx = this._dataIndexOf(nextProps.data, nextProps.value),
        valueItem = rawIdx == -1 ? nextProps.value : nextProps.data[rawIdx],
        isSuggesting = this.refs.input.isSuggesting(),
        items = this.process(nextProps.data, nextProps.value, (rawIdx === -1 || isSuggesting) && this._dataText(valueItem)),
        idx = this._dataIndexOf(items, nextProps.value),
        focused = this.filterIndexOf(items, this._dataText(valueItem));

    this._searchTerm = "";

    this.setState({
      processedData: items,
      selectedItem: items[idx],
      focusedItem: items[idx === -1 ? focused !== -1 ? focused : 0 // focus the closest match
      : idx]
    });
  },

  render: function () {
    var _$omit = _.omit(this.props, Object.keys(propTypes));

    var className = _$omit.className;
    var props = _objectWithoutProperties(_$omit, ["className"]);
    var valueItem = this._dataItem(this._data(), this.props.value);
    var items = this._data();
    var listID = this._id("_listbox");
    var optID = this._id("_option");
    var List = this.props.listComponent || this.props.groupBy && GroupableList || PlainList;
    var completeType = this.props.suggest ? this.props.filter ? "both" : "inline" : this.props.filter ? "list" : "";

    return React.createElement(
      "div",
      _extends({}, props, {
        ref: "element",
        role: "combobox",
        onKeyDown: this._maybeHandle(this._keyDown),
        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
        onBlur: this._focus.bind(null, false),
        tabIndex: "-1",
        className: cx(className, {
          "rw-combobox": true,
          "rw-widget": true,
          "rw-state-focus": this.state.focused,
          "rw-open": this.props.open,
          "rw-state-disabled": this.props.disabled,
          "rw-state-readonly": this.props.readOnly,
          "rw-rtl": this.isRtl()
        }) }),
      React.createElement(
        Btn,
        {
          tabIndex: "-1",
          className: "rw-select",
          onClick: this._maybeHandle(this.toggle),
          disabled: !!(this.props.disabled || this.props.readOnly) },
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
      React.createElement(Input, {
        ref: "input",
        type: "text",
        suggest: this.props.suggest,
        name: this.props.name,
        "aria-owns": listID,
        "aria-busy": !!this.props.busy,
        "aria-autocomplete": completeType,
        "aria-activedescendent": this.props.open ? optID : undefined,
        "aria-expanded": this.props.open,
        "aria-haspopup": true,
        placeholder: this.props.placeholder,
        disabled: this.props.disabled,
        readOnly: this.props.readOnly,
        className: "rw-input",
        value: this._dataText(valueItem),
        onChange: this._inputTyping,
        onKeyDown: this._inputKeyDown }),
      React.createElement(
        Popup,
        { open: this.props.open, onRequestClose: this.close, duration: this.props.duration },
        React.createElement(
          "div",
          null,
          React.createElement(List, _extends({ ref: "list"
          }, _.pick(this.props, Object.keys(List.type.propTypes)), {
            id: listID,
            optID: optID,
            "aria-hidden": !this.props.open,
            "aria-live": completeType && "polite",
            data: items,
            selected: this.state.selectedItem,
            focused: this.state.focusedItem,
            onSelect: this._maybeHandle(this._onSelect),
            onMove: this._scrollTo,
            messages: {
              emptyList: this.props.data.length ? this.props.messages.emptyFilter : this.props.messages.emptyList
            } }))
        )
      )
    );
  },

  _onSelect: function (data) {
    this.close();
    this.notify("onSelect", data);
    this.change(data);
    this._focus(true);
  },

  _inputKeyDown: function (e) {
    this._deleting = e.key === "Backspace" || e.key === "Delete";
    this._isTyping = true;
  },

  _inputTyping: function (e) {
    var _this = this;
    var self = this,
        shouldSuggest = !!this.props.suggest,
        strVal = e.target.value,
        suggestion,
        data;

    suggestion = this._deleting || !shouldSuggest ? strVal : this.suggest(this._data(), strVal);

    suggestion = suggestion || strVal;

    data = _.find(self.props.data, function (item) {
      return _this._dataText(item).toLowerCase() === suggestion.toLowerCase();
    });

    this.change(!this._deleting && data ? data : strVal, true);

    this.open();
  },

  _focus: function (focused, e) {
    var _this = this;
    clearTimeout(this.timer);
    !focused && this.refs.input.accept(); //not suggesting anymore

    this.timer = setTimeout(function () {
      if (focused) _this.refs.input.focus();else _this.close();

      if (focused !== _this.state.focused) {
        _this.notify(focused ? "onFocus" : "onBlur", e);
        _this.setState({ focused: focused });
      }
    }, 0);
  },

  _keyDown: function (e) {
    var self = this,
        key = e.key,
        alt = e.altKey,
        list = this.refs.list,
        focusedItem = this.state.focusedItem,
        selectedItem = this.state.selectedItem,
        isOpen = this.props.open;

    if (key === "End") if (isOpen) this.setState({ focusedItem: list.last() });else select(list.last(), true);else if (key === "Home") if (isOpen) this.setState({ focusedItem: list.first() });else select(list.first(), true);else if (key === "Escape" && isOpen) this.close();else if (key === "Enter" && isOpen) {
      this.close();
      select(this.state.focusedItem, true);
    } else if (key === "ArrowDown") {
      if (alt) this.open();else {
        if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else select(list.next(selectedItem), true);
      }
    } else if (key === "ArrowUp") {
      if (alt) this.close();else {
        if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else select(list.prev(selectedItem), true);
      }
    }

    this.notify("onKeyDown", [e]);

    function select(item, fromList) {
      if (!item) return self.change(self.refs.input.getDOMNode().value, false);

      self.refs.input.accept(true); //removes caret

      if (fromList) self.notify("onSelect", item);

      self.change(item, false);
    }
  },

  change: function (data, typing) {
    this._typedChange = !!typing;
    this.notify("onChange", data);
  },

  open: function () {
    if (!this.props.open) this.notify("onToggle", true);
  },

  close: function () {
    if (this.props.open) this.notify("onToggle", false);
  },

  toggle: function (e) {
    this._focus(true);

    this.props.open ? this.close() : this.open();
  },

  suggest: function (data, value) {
    var word = this._dataText(value),
        matcher = filter.startsWith,
        suggestion = typeof value === "string" ? _.find(data, finder, this) : value;

    if (suggestion && (!this.state || !this.state.deleting)) return this._dataText(suggestion);

    return "";

    function finder(item) {
      return matcher(this._dataText(item).toLowerCase(), word.toLowerCase());
    }
  },

  _data: function () {
    return this.state.processedData;
  },

  process: function (data, values, searchTerm) {
    if (this.props.filter && searchTerm) data = this.filter(data, searchTerm);

    return data;
  }
});

module.exports = controlledInput.createControlledClass(ComboBox, { open: "onToggle", value: "onChange" });

module.exports.BaseComboBox = ComboBox;