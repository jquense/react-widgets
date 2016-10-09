'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _class3, _temp;

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

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _SelectListItem = require('./SelectListItem');

var _SelectListItem2 = _interopRequireDefault(_SelectListItem);

var _autoFocus = require('./util/autoFocus');

var _autoFocus2 = _interopRequireDefault(_autoFocus);

var _scrollManager = require('./util/scrollManager');

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _timeoutManager = require('./util/timeoutManager');

var _timeoutManager2 = _interopRequireDefault(_timeoutManager);

var _focusManager = require('./util/focusManager');

var _focusManager2 = _interopRequireDefault(_focusManager);

var _withRightToLeft = require('./util/withRightToLeft');

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _validateListInterface = require('./util/validateListInterface');

var _validateListInterface2 = _interopRequireDefault(_validateListInterface);

var _dataHelpers = require('./util/dataHelpers');

var _interaction = require('./util/interaction');

var _widgetHelpers = require('./util/widgetHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var find = _3.default.find;


function getFirstValue(props) {
  var data = props.data;
  var value = props.value;
  var valueField = props.valueField;

  value = _3.default.splat(value);

  if (value.length) return find(data, function (d) {
    return (0, _dataHelpers.dataIndexOf)(value, d, valueField) !== -1;
  }) || null;

  return null;
}

var SelectList = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(SelectList, _React$Component);

  function SelectList() {
    _classCallCheck(this, SelectList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleFocusChanged = function (focused) {
      // the rigamarole here is to avoid flicker went clicking an item and
      // gaining focus at the same time.
      if (focused !== _this.state.focused) {
        if (!focused) _this.setState({ focusedItem: null });else if (focused && !_this._clicking) _this.setState({
          focusedItem: getFirstValue(_this.props)
        });
        _this._clicking = false;
      }
    };

    _initDefineProp(_this, 'handleKeyDown', _descriptor, _this);

    _initDefineProp(_this, 'handleKeyPress', _descriptor2, _this);

    _this.handleChange = function (item, checked) {
      var multiple = _this.props.multiple;
      var values = _this.state.dataItems;

      multiple = !!multiple;

      _this.setState({ focusedItem: item });

      if (!multiple) return (0, _widgetHelpers.notify)(_this.props.onChange, checked ? item : null);

      values = checked ? values.concat(item) : values.filter(function (v) {
        return v !== item;
      });

      (0, _widgetHelpers.notify)(_this.props.onChange, [values || []]);
    };

    (0, _autoFocus2.default)(_this);

    _this.widgetId = (0, _widgetHelpers.instanceId)(_this, '_widget');
    _this.listId = (0, _widgetHelpers.instanceId)(_this, '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_this, '_listbox_active_option');

    _this.timeouts = (0, _timeoutManager2.default)(_this);
    _this.handleScroll = (0, _scrollManager2.default)(_this, false);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      didHandle: _this.handleFocusChanged
    });

    _this.ListItem = (0, _SelectListItem2.default)(_this);
    _this.state = _this.getDefaultState(_this.props);
    return _this;
  }

  SelectList.prototype.getDefaultState = function getDefaultState(props) {
    var data = props.data;
    var value = props.value;
    var valueField = props.valueField;
    var multiple = props.multiple;


    return {
      dataItems: multiple && _3.default.splat(value).map(function (item) {
        return (0, _dataHelpers.dataItem)(data, item, valueField);
      })
    };
  };

  SelectList.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    return this.setState(this.getDefaultState(nextProps));
  };

  SelectList.prototype.componentDidMount = function componentDidMount() {
    (0, _validateListInterface2.default)(this.refs.list);
  };

  SelectList.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var tabIndex = _props.tabIndex;
    var busy = _props.busy;
    var groupBy = _props.groupBy;
    var List = _props.listComponent;


    List = List || groupBy && _ListGroupable2.default || _List2.default;

    var elementProps = _3.default.omitOwnProps(this, List);
    var listProps = _3.default.pickProps(this.props, List);

    var _state = this.state;
    var focusedItem = _state.focusedItem;
    var focused = _state.focused;

    var ListItem = this.ListItem;
    var items = this._data();

    focusedItem = focused && !(0, _interaction.isDisabled)(this.props) && !(0, _interaction.isReadOnly)(this.props) && focusedItem;

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        id: this.widgetId,
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        onKeyDown: this.handleKeyDown,
        onKeyPress: this.handleKeyPress,
        focused: focused,
        disabled: (0, _interaction.isDisabled)(this.props),
        readOnly: (0, _interaction.isReadOnly)(this.props),
        role: 'radiogroup',
        'aria-busy': !!busy,
        'aria-activedescendant': this.activeId,
        className: (0, _classnames2.default)(className, 'rw-select-list', 'rw-widget-input', 'rw-widget-container', busy && 'rw-loading-mask')
      }),
      _react2.default.createElement(List, _extends({}, listProps, {
        ref: 'list',
        role: 'radiogroup',
        tabIndex: tabIndex || '0',
        id: this.listId,
        activeId: this.activeId,
        data: items,
        focused: focusedItem,
        optionComponent: ListItem,
        itemComponent: this.props.itemComponent,
        onMove: this.handleScroll
      }))
    );
  };

  SelectList.prototype.focus = function focus() {
    _compat2.default.findDOMNode(this.refs.list).focus();
  };

  SelectList.prototype.selectAll = function selectAll() {
    var _this2 = this;

    var _props2 = this.props;
    var disabled = _props2.disabled;
    var readOnly = _props2.readOnly;
    var valueField = _props2.valueField;
    var values = this.state.dataItems;
    var data = this._data();
    var blacklist;

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
  };

  SelectList.prototype.search = function search(character) {
    var _this3 = this;

    var word = ((this._searchTerm || '') + character).toLowerCase(),
        list = this.refs.list,
        multiple = this.props.multiple;

    if (!character) return;

    this._searchTerm = word;

    this.timeouts.set('search', function () {
      var focusedItem = list.next(_this3.state.focusedItem, word);

      _this3._searchTerm = '';

      if (focusedItem) {
        !multiple ? _this3.handleChange(focusedItem, true) : _this3.setState({ focusedItem: focusedItem });
      }
    }, this.props.delay);
  };

  SelectList.prototype._data = function _data() {
    return this.props.data;
  };

  SelectList.prototype._values = function _values() {
    return this.props.multiple ? this.state.dataItems : this.props.value;
  };

  return SelectList;
}(_react2.default.Component), _class3.propTypes = _extends({}, _autoFocus2.default.propTypes, {

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
  readOnly: _propTypes2.default.readOnly,

  messages: _react2.default.PropTypes.shape({
    emptyList: _propTypes2.default.message
  })
}), _class3.defaultProps = {
  delay: 250,
  value: [],
  data: [],
  messages: {
    emptyList: 'There are no items in this list'
  }
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (e) {
      var key = e.key;
      var _props3 = _this4.props;
      var valueField = _props3.valueField;
      var multiple = _props3.multiple;
      var list = _this4.refs.list;
      var focusedItem = _this4.state.focusedItem;

      var change = function change(item) {
        if (item) _this4.handleChange(item, multiple ? !(0, _interaction.contains)(item, _this4._values(), valueField) // toggle value
        : true);
      };

      (0, _widgetHelpers.notify)(_this4.props.onKeyDown, [e]);

      if (e.defaultPrevented) return;

      if (key === 'End') {
        e.preventDefault();
        focusedItem = list.last();

        _this4.setState({ focusedItem: focusedItem });
        if (!multiple) change(focusedItem);
      } else if (key === 'Home') {
        e.preventDefault();
        focusedItem = list.first();

        _this4.setState({ focusedItem: focusedItem });
        if (!multiple) change(focusedItem);
      } else if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        change(focusedItem);
      } else if (key === 'ArrowDown' || key === 'ArrowRight') {
        e.preventDefault();
        focusedItem = list.next(focusedItem);

        _this4.setState({ focusedItem: focusedItem });
        if (!multiple) change(focusedItem);
      } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
        e.preventDefault();
        focusedItem = list.prev(focusedItem);

        _this4.setState({ focusedItem: focusedItem });
        if (!multiple) change(focusedItem);
      } else if (multiple && e.keyCode === 65 && e.ctrlKey) {
        e.preventDefault();
        _this4.selectAll();
      }
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyPress', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (e) {
      (0, _widgetHelpers.notify)(_this5.props.onKeyPress, [e]);

      if (e.defaultPrevented) return;

      _this5.search(String.fromCharCode(e.which));
    };
  }
})), _class2)) || _class;

SelectList = (0, _uncontrollable2.default)(SelectList, {
  value: 'onChange'
}, ['selectAll', 'focus']);

exports.default = SelectList;
module.exports = exports['default'];