'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _obj;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _ListGroupable = require('./ListGroupable');

var _ListGroupable2 = _interopRequireDefault(_ListGroupable);

var _ListOption = require('./ListOption');

var _ListOption2 = _interopRequireDefault(_ListOption);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _validateListInterface = require('./util/validateListInterface');

var _validateListInterface2 = _interopRequireDefault(_validateListInterface);

var _scrollTo2 = require('dom-helpers/util/scrollTo');

var _scrollTo3 = _interopRequireDefault(_scrollTo2);

var _dataHelpers = require('./util/dataHelpers');

var _interaction = require('./util/interaction');

var _widgetHelpers = require('./util/widgetHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var find = _3.default.find;


var propTypes = {

  data: _react2.default.PropTypes.array,
  value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.any, _react2.default.PropTypes.array]),
  onChange: _react2.default.PropTypes.func,
  onMove: _react2.default.PropTypes.func,

  multiple: _react2.default.PropTypes.bool,

  itemComponent: _propTypes2.default.elementType,
  listComponent: _propTypes2.default.elementType,

  valueField: _react2.default.PropTypes.string,
  textField: _propTypes2.default.accessor,

  busy: _react2.default.PropTypes.bool,

  filter: _react2.default.PropTypes.string,
  delay: _react2.default.PropTypes.number,

  disabled: _propTypes2.default.disabled.acceptsArray,
  readOnly: _propTypes2.default.readOnly.acceptsArray,

  messages: _react2.default.PropTypes.shape({
    emptyList: _react2.default.PropTypes.string
  })
};

function getFirstValue(props) {
  var data = props.data,
      value = props.value,
      valueField = props.valueField;

  value = _3.default.splat(value);

  if (value.length) return find(data, function (d) {
    return (0, _dataHelpers.dataIndexOf)(value, d, valueField) !== -1;
  }) || null;

  return null;
}

var SelectList = _react2.default.createClass((_obj = {
  displayName: 'SelectList',


  propTypes: propTypes,

  mixins: [require('./mixins/TimeoutMixin'), require('./mixins/AutoFocusMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')(), require('./mixins/FocusMixin')({
    didHandle: function didHandle(focused) {
      // the rigamarole here is to avoid flicker went clicking an item and
      // gaining focus at the same time.
      if (focused !== this.state.focused) {
        if (!focused) this.setState({ focusedItem: null });else if (focused && !this._clicking) this.setState({
          focusedItem: getFirstValue(this.props)
        });
        this._clicking = false;
      }
    }
  })],

  getDefaultProps: function getDefaultProps() {
    return {
      delay: 250,
      value: [],
      data: [],
      ariaActiveDescendantKey: 'selectlist',
      messages: {
        emptyList: 'There are no items in this list'
      }
    };
  },
  getDefaultState: function getDefaultState(props) {
    var data = props.data,
        value = props.value,
        valueField = props.valueField,
        multiple = props.multiple;


    return {
      dataItems: multiple && _3.default.splat(value).map(function (item) {
        return (0, _dataHelpers.dataItem)(data, item, valueField);
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
  componentDidMount: function componentDidMount() {
    (0, _validateListInterface2.default)(this.refs.list);
  },
  render: function render() {
    var _props = this.props,
        className = _props.className,
        tabIndex = _props.tabIndex,
        busy = _props.busy,
        groupBy = _props.groupBy,
        List = _props.listComponent;


    List = List || groupBy && _ListGroupable2.default || _List2.default;

    var elementProps = _3.default.omitOwnProps(this, List);
    var listProps = _3.default.pickProps(this.props, List);

    var _state = this.state,
        ListItem = _state.ListItem,
        focusedItem = _state.focusedItem,
        focused = _state.focused;


    var items = this._data();

    focusedItem = focused && !(0, _interaction.isDisabled)(this.props) && !(0, _interaction.isReadOnly)(this.props) && focusedItem;

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        onKeyPress: this.handleKeyPress,
        disabled: (0, _interaction.isDisabled)(this.props),
        readOnly: (0, _interaction.isReadOnly)(this.props),
        role: 'radiogroup',
        'aria-busy': !!busy,
        className: (0, _classnames2.default)(className, 'rw-selectlist', busy && 'rw-loading-mask')
      }),
      _react2.default.createElement(List, _extends({}, listProps, {
        ref: 'list',
        role: 'radiogroup',
        tabIndex: tabIndex || '0',
        id: (0, _widgetHelpers.instanceId)(this, '_listbox'),
        data: items,
        focused: focusedItem,
        optionComponent: ListItem,
        itemComponent: this.props.itemComponent,
        onMove: this._scrollTo
      }))
    );
  },
  _scrollTo: function _scrollTo(selected, list) {
    var handler = this.props.onMove;

    if (handler) handler(selected, list);else {
      this._scrollCancel && this._scrollCancel();
      // default behavior is to scroll the whole page not just the widget
      this._scrollCancel = (0, _scrollTo3.default)(selected);
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    var _this = this;

    var key = e.key,
        _props2 = this.props,
        valueField = _props2.valueField,
        multiple = _props2.multiple,
        list = this.refs.list,
        focusedItem = this.state.focusedItem;


    var change = function change(item) {
      if (item) _this.handleChange(item, multiple ? !(0, _interaction.contains)(item, _this._values(), valueField) // toggle value
      : true);
    };

    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (key === 'End') {
      e.preventDefault();
      focusedItem = list.last();

      this.setState({ focusedItem: focusedItem });
      if (!multiple) change(focusedItem);
    } else if (key === 'Home') {
      e.preventDefault();
      focusedItem = list.first();

      this.setState({ focusedItem: focusedItem });
      if (!multiple) change(focusedItem);
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      change(focusedItem);
    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
      e.preventDefault();
      focusedItem = list.next(focusedItem);

      this.setState({ focusedItem: focusedItem });
      if (!multiple) change(focusedItem);
    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
      e.preventDefault();
      focusedItem = list.prev(focusedItem);

      this.setState({ focusedItem: focusedItem });
      if (!multiple) change(focusedItem);
    } else if (multiple && e.keyCode === 65 && e.ctrlKey) {
      e.preventDefault();
      this.selectAll();
    }
  },
  handleKeyPress: function handleKeyPress(e) {
    (0, _widgetHelpers.notify)(this.props.onKeyPress, [e]);

    if (e.defaultPrevented) return;

    this.search(String.fromCharCode(e.which));
  },
  focus: function focus() {
    _compat2.default.findDOMNode(this.refs.list).focus();
  },
  selectAll: function selectAll() {
    var _this2 = this;

    var _props3 = this.props,
        disabled = _props3.disabled,
        readOnly = _props3.readOnly,
        valueField = _props3.valueField,
        values = this.state.dataItems,
        data = this._data(),
        blacklist;

    disabled = disabled || readOnly;
    disabled = Array.isArray(disabled) ? disabled : [];
    //disabled values that are not selected
    blacklist = disabled.filter(function (v) {
      return !(0, _interaction.contains)(v, values, valueField);
    });
    data = data.filter(function (v) {
      return !(0, _interaction.contains)(v, blacklist, valueField);
    });

    if (data.length === values.length) {
      data = disabled.filter(function (item) {
        return (0, _interaction.contains)(item, values, valueField);
      });
      data = data.map(function (item) {
        return (0, _dataHelpers.dataItem)(_this2._data(), item, valueField);
      });
    }

    (0, _widgetHelpers.notify)(this.props.onChange, [data]);
  },
  handleChange: function handleChange(item, checked) {
    var multiple = this.props.multiple,
        values = this.state.dataItems;


    multiple = !!multiple;

    this.clearTimeout('focusedItem');
    this.setState({ focusedItem: item });

    if (!multiple) return (0, _widgetHelpers.notify)(this.props.onChange, checked ? item : null);

    values = checked ? values.concat(item) : values.filter(function (v) {
      return v !== item;
    });

    (0, _widgetHelpers.notify)(this.props.onChange, [values || []]);
  },
  search: function search(character) {
    var _this3 = this;

    var word = ((this._searchTerm || '') + character).toLowerCase(),
        list = this.refs.list,
        multiple = this.props.multiple;

    if (!character) return;

    this._searchTerm = word;

    this.setTimeout('search', function () {
      var focusedItem = list.next(_this3.state.focusedItem, word);

      _this3._searchTerm = '';

      if (focusedItem) {
        !multiple ? _this3.handleChange(focusedItem, true) : _this3.setState({ focusedItem: focusedItem });
      }
    }, this.props.delay);
  },
  _data: function _data() {
    return this.props.data;
  },
  _values: function _values() {
    return this.props.multiple ? this.state.dataItems : this.props.value;
  }
}, (_applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyPress', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyPress'), _obj)), _obj));

function getListItem(parent) {

  return _react2.default.createClass({

    displayName: 'SelectItem',

    handleChange: function handleChange(e) {
      var _props4 = this.props,
          disabled = _props4.disabled,
          readonly = _props4.readonly,
          dataItem = _props4.dataItem;


      if (!disabled && !readonly) parent.handleChange(dataItem, e.target.checked);
    },
    handleMouseDown: function handleMouseDown() {
      parent._clicking = true;
    },
    render: function render() {
      var _props5 = this.props,
          children = _props5.children,
          disabled = _props5.disabled,
          readonly = _props5.readonly,
          item = _props5.dataItem;
      var _parent$props = parent.props,
          multiple = _parent$props.multiple,
          _parent$props$name = _parent$props.name,
          name = _parent$props$name === undefined ? (0, _widgetHelpers.instanceId)(parent, '_name') : _parent$props$name;


      var checked = (0, _interaction.contains)(item, parent._values(), parent.props.valueField),
          type = multiple ? 'checkbox' : 'radio';

      return _react2.default.createElement(
        _ListOption2.default,
        _extends({}, this.props, {
          role: type,
          'aria-checked': !!checked
        }),
        _react2.default.createElement(
          'label',
          { onMouseDown: this.handleMouseDown },
          _react2.default.createElement('input', {
            name: name,
            type: type,
            tabIndex: '-1',
            role: 'presentation',
            checked: checked,
            disabled: disabled || readonly,
            onChange: this.handleChange
          }),
          children
        )
      );
    }
  });
}

exports.default = (0, _uncontrollable2.default)(SelectList, { value: 'onChange' }, ['selectAll', 'focus']);
module.exports = exports['default'];