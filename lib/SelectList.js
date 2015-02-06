"use strict";
var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    _ = require("./util/_"),
    cx = require("./util/cx"),
    controlledInput = require("./util/controlledInput"),
    CustomPropTypes = require("./util/propTypes"),
    PlainList = require("./List"),
    GroupableList = require("./ListGroupable"),
    validateList = require("./util/validateListInterface"),
    filter = require("./util/filter"),
    scrollTo = require("./util/dom/scroll");

var propTypes = {

  data: React.PropTypes.array,
  value: React.PropTypes.oneOfType([React.PropTypes.any, React.PropTypes.array]),
  onChange: React.PropTypes.func,
  onMove: React.PropTypes.func,

  multiple: React.PropTypes.bool,

  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,

  valueField: React.PropTypes.string,
  textField: React.PropTypes.string,

  busy: React.PropTypes.bool,

  filter: React.PropTypes.string,
  delay: React.PropTypes.number,

  disabled: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),

  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.array, React.PropTypes.oneOf(["readonly"])]),

  messages: React.PropTypes.shape({
    emptyList: React.PropTypes.string
  }) };


var SelectList = React.createClass({
  displayName: "SelectList",


  propTypes: propTypes,

  mixins: [require("./mixins/WidgetMixin"), require("./mixins/TimeoutMixin"), require("./mixins/DataHelpersMixin"), require("./mixins/RtlParentContextMixin")],

  getDefaultProps: function getDefaultProps() {
    return {
      delay: 250,
      value: [],
      data: [],
      messages: {
        emptyList: "There are no items in this list"
      }
    };
  },

  getDefaultState: function getDefaultState(props) {
    var _this = this;
    var isRadio = !props.multiple,
        values = _.splat(props.value),
        first = isRadio && this._dataItem(props.data, values[0]);

    first = isRadio && first ? first : (this.state || {}).focusedItem || null;

    return {
      focusedItem: first,
      dataItems: !isRadio && values.map(function (item) {
        return _this._dataItem(props.data, item);
      })
    };
  },

  getInitialState: function getInitialState() {
    var state = this.getDefaultState(this.props);

    state.ListItem = getListItem(this);

    return state;
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    return this.setState(this.getDefaultState(nextProps));
  },

  componentDidMount: function () {
    validateList(this.refs.list);
  },

  render: function render() {
    var _$omit = _.omit(this.props, Object.keys(propTypes));

    var className = _$omit.className;
    var props = _objectWithoutProperties(_$omit, ["className"]);
    var focus = this._maybeHandle(this._focus.bind(null, true), true);
    var optID = this._id("_selected_option");
    var blur = this._focus.bind(null, false);
    var List = this.props.listComponent || this.props.groupBy && GroupableList || PlainList;
    var focusedItem = this.state.focused && !this.isDisabled() && !this.isReadOnly() && this.state.focusedItem;

    return React.createElement(
      "div",
      _extends({}, props, {
        onKeyDown: this._maybeHandle(this._keyDown),
        onFocus: focus,
        onBlur: blur,
        tabIndex: "0",
        role: "listbox",
        "aria-busy": !!this.props.busy,
        "aria-activedescendent": this.state.focused ? optID : undefined,
        "aria-disabled": this.isDisabled(),
        "aria-readonly": this.isReadOnly(),
        className: cx(className, {
          "rw-widget": true,
          "rw-selectlist": true,
          "rw-state-focus": this.state.focused,
          "rw-state-disabled": this.isDisabled(),
          "rw-state-readonly": this.isReadOnly(),
          "rw-rtl": this.isRtl(),
          "rw-loading-mask": this.props.busy
        }) }),
      React.createElement(List, _extends({ ref: "list"
      }, _.pick(this.props, Object.keys(List.type.propTypes)), {
        data: this._data(),
        focused: focusedItem,
        optID: optID,
        itemComponent: this.state.ListItem,
        onMove: this._scrollTo }))
    );
  },

  _scrollTo: function _scrollTo(selected, list) {
    var handler = this.props.onMove;

    if (handler) handler(selected, list);else {
      this._scrollCancel && this._scrollCancel();
      // default behavior is to scroll the whole page not just the widget
      this._scrollCancel = scrollTo(selected);
    }
  },

  _keyDown: function (e) {
    var self = this,
        key = e.key,
        multiple = !!this.props.multiple,
        list = this.refs.list,
        focusedItem = this.state.focusedItem;

    if (key === "End") {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: move("prev", null) });else change(move("prev", null));
    } else if (key === "Home") {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: move("next", null) });else change(move("next", null));
    } else if (key === "Enter" || key === " ") {
      e.preventDefault();
      change(focusedItem);
    } else if (key === "ArrowDown" || key === "ArrowRight") {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: move("next", focusedItem) });else change(move("next", focusedItem));
    } else if (key === "ArrowUp" || key === "ArrowLeft") {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: move("prev", focusedItem) });else change(move("prev", focusedItem));
    } else if (this.props.multiple && e.keyCode === 65 && e.ctrlKey) {
      e.preventDefault();
      this._selectAll();
    } else this.search(String.fromCharCode(e.keyCode));

    function change(item, cked) {
      if (item) {
        self._change(item, multiple ? !self._contains(item, self._values()) // toggle value
        : true);
      }
    }

    function move(dir, item) {
      var stop = dir === "next" ? list.last() : list.first(),
          next = list[dir](item);

      while (next !== stop && self.isDisabledItem(next)) next = list[dir](next);

      return self.isDisabledItem(next) ? item : next;
    }
  },

  _selectAll: function () {
    var _this = this;
    var values = this.state.dataItems,
        disabled = this.props.disabled || this.props.readOnly,
        data = this._data(),
        blacklist;

    disabled = Array.isArray(disabled) ? disabled : [];
    //disabled values that are not selected
    blacklist = disabled.filter(function (v) {
      return !_this._contains(v, values);
    });
    data = data.filter(function (v) {
      return !_this._contains(v, blacklist);
    });

    if (data.length === values.length) {
      data = disabled.filter(function (v) {
        return _this._contains(v, values);
      });
      data = data.map(function (v) {
        return _this._dataItem(_this._data(), v);
      });
    }

    this.notify("onChange", [data]);
  },

  _change: function (item, checked) {
    var multiple = !!this.props.multiple,
        blacklist = this.props.disabled || this.props.readOnly,
        values = this.state.dataItems;

    blacklist = Array.isArray(blacklist) ? blacklist : [];

    //if(this._contains(item, blacklist)) return

    if (!multiple) return this.notify("onChange", checked ? item : null);

    values = checked ? values.concat(item) : values.filter(function (v) {
      return v !== item;
    });

    this.notify("onChange", [values || []]);
  },

  _focus: function (focused, e) {
    var _this = this;


    this.setTimeout("focus", function () {
      if (focused) _this.getDOMNode().focus();
      if (focused !== _this.state.focused) {
        _this.setState({ focused: focused });
      }
    });
  },

  isDisabledItem: function (item) {
    return this.isDisabled() || this._contains(item, this.props.disabled);
  },

  isReadOnlyItem: function (item) {
    return this.isReadOnly() || this._contains(item, this.props.readOnly);
  },

  search: function (character) {
    var _this = this;
    var word = ((this._searchTerm || "") + character).toLowerCase(),
        list = this.refs.list;

    this._searchTerm = word;

    this.setTimeout("search", function () {
      var focusedItem = list.next(_this.state.focusedItem, word);

      _this._searchTerm = "";

      if (focusedItem) _this.setState({ focusedItem: focusedItem });
    }, this.props.delay);
  },

  _data: function () {
    return this.props.data;
  },

  _contains: function (item, values) {
    return Array.isArray(values) ? values.some(this._valueMatcher.bind(null, item)) : this._valueMatcher(item, values);
  },

  _values: function () {
    return !!this.props.multiple ? this.state.dataItems : this.props.value;
  }

});


function getListItem(parent) {
  return React.createClass({

    displayName: "SelectItem",

    render: function () {
      var props = _objectWithoutProperties(this.props, []);
      var item = this.props.item;
      var checked = parent._contains(item, parent._values());
      var change = parent._change.bind(null, item);
      var disabled = parent.isDisabledItem(item);
      var readonly = parent.isReadOnlyItem(item);
      var Component = parent.props.itemComponent;
      var name = parent.props.name || parent._id("_name");

      return React.createElement(
        "label",
        {
          className: cx({
            "rw-state-disabled": disabled,
            "rw-state-readonly": readonly
          }) },
        React.createElement("input", _extends({}, props, {
          tabIndex: "-1",
          name: name,
          type: parent.props.multiple ? "checkbox" : "radio",

          onChange: onChange,
          checked: checked,
          disabled: disabled || readonly,
          "aria-disabled": disabled || readonly })),
        Component ? React.createElement(Component, { item: item }) : parent._dataText(item)
      );

      function onChange(e) {
        if (!disabled && !readonly) change(e.target.checked);
      }
    }
  });
}

module.exports = SelectList;

module.exports = controlledInput.createControlledClass(SelectList, { value: "onChange" });

module.exports.BaseSelectList = SelectList;