'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _activeElement = require('dom-helpers/activeElement');

var _activeElement2 = _interopRequireDefault(_activeElement);

var _contains = require('dom-helpers/query/contains');

var _contains2 = _interopRequireDefault(_contains);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _WidgetPicker = require('./WidgetPicker');

var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _DropdownListInput = require('./DropdownListInput');

var _DropdownListInput2 = _interopRequireDefault(_DropdownListInput);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _ListGroupable = require('./ListGroupable');

var _ListGroupable2 = _interopRequireDefault(_ListGroupable);

var _autoFocus = require('./util/autoFocus');

var _autoFocus2 = _interopRequireDefault(_autoFocus);

var _Filter = require('./util/Filter');

var Filter = _interopRequireWildcard(_Filter);

var _focusManager = require('./util/focusManager');

var _focusManager2 = _interopRequireDefault(_focusManager);

var _mountManager = require('./util/mountManager');

var _mountManager2 = _interopRequireDefault(_mountManager);

var _scrollManager = require('./util/scrollManager');

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _timeoutManager = require('./util/timeoutManager');

var _timeoutManager2 = _interopRequireDefault(_timeoutManager);

var _shallowCompare = require('./util/shallowCompare');

var _shallowCompare2 = _interopRequireDefault(_shallowCompare);

var _withRightToLeft = require('./util/withRightToLeft');

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _dataHelpers = require('./util/dataHelpers');

var _interaction = require('./util/interaction');

var _widgetHelpers = require('./util/widgetHelpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

var result = _3.default.result;
var DropdownList = (_class = (_temp = _class2 = function (_React$Component) {
  _inherits(DropdownList, _React$Component);

  function DropdownList() {
    _classCallCheck(this, DropdownList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleFocusChanged = function (focused) {
      if (!focused) _this.close();
    };

    _initDefineProp(_this, 'handleSelect', _descriptor, _this);

    _initDefineProp(_this, 'handleClick', _descriptor2, _this);

    _initDefineProp(_this, 'handleKeyDown', _descriptor3, _this);

    _initDefineProp(_this, 'handleKeyPress', _descriptor4, _this);

    (0, _autoFocus2.default)(_this);

    _this.inputId = (0, _widgetHelpers.instanceId)(_this, '_input');
    _this.listId = (0, _widgetHelpers.instanceId)(_this, '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_this, '_listbox_active_option');

    _this.mounted = (0, _mountManager2.default)(_this);
    _this.timeouts = (0, _timeoutManager2.default)(_this);
    _this.handleScroll = (0, _scrollManager2.default)(_this);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      didHandle: _this.handleFocusChanged
    });

    _this.state = _this.getStateFromProps(_this.props);
    return _this;
  }

  DropdownList.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _shallowCompare2.default.apply(undefined, [this].concat(args));
  };

  DropdownList.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    this.setState(this.getStateFromProps(props));
  };

  DropdownList.prototype.getStateFromProps = function getStateFromProps(props) {
    var value = props.value;
    var data = props.data;
    var searchTerm = props.searchTerm;
    var valueField = props.valueField;
    var filter = props.filter;
    var textField = props.textField;
    var minLength = props.minLength;
    var caseSensitive = props.caseSensitive;


    var initialIdx = (0, _dataHelpers.dataIndexOf)(data, value, valueField);

    data = Filter.filter(data, {
      filter: filter,
      searchTerm: searchTerm,
      minLength: minLength,
      caseSensitive: caseSensitive,
      textField: textField
    });

    return {
      data: data,
      selectedItem: data[initialIdx],
      focusedItem: data[initialIdx] || data[0]
    };
  };

  DropdownList.prototype.renderFilter = function renderFilter(messages) {
    var _this2 = this;

    return _react2.default.createElement(
      _WidgetPicker2.default,
      {
        ref: 'filterWrapper',
        className: 'rw-filter-input rw-input'
      },
      _react2.default.createElement(_Select2.default, { component: 'span', icon: 'search' }),
      _react2.default.createElement('input', {
        ref: 'filter',
        value: this.props.searchTerm,
        className: 'rw-input-reset',
        placeholder: _3.default.result(messages.filterPlaceholder, this.props),
        onChange: function onChange(e) {
          return (0, _widgetHelpers.notify)(_this2.props.onSearch, e.target.value);
        }
      })
    );
  };

  DropdownList.prototype.renderList = function renderList(List, messages) {
    var _props = this.props;
    var open = _props.open;
    var filter = _props.filter;
    var data = _props.data;
    var _state = this.state;
    var selectedItem = _state.selectedItem;
    var focusedItem = _state.focusedItem;


    var listProps = _3.default.pickProps(this.props, List);
    var items = this._data();

    return _react2.default.createElement(
      'div',
      null,
      filter && this.renderFilter(messages),
      _react2.default.createElement(List, _extends({}, listProps, {
        ref: 'list',
        id: this.listId,
        activeId: this.activeId,
        data: items,
        'aria-live': open && 'polite',
        'aria-labelledby': this.inputId,
        'aria-hidden': !this.props.open,
        selected: selectedItem,
        focused: open ? focusedItem : null,
        onSelect: this.handleSelect,
        onMove: this.handleScroll,
        messages: {
          emptyList: data.length ? messages.emptyFilter : messages.emptyList
        } }))
    );
  };

  DropdownList.prototype.render = function render() {
    var _this3 = this;

    var _props2 = this.props;
    var className = _props2.className;
    var tabIndex = _props2.tabIndex;
    var duration = _props2.duration;
    var valueField = _props2.valueField;
    var textField = _props2.textField;
    var groupBy = _props2.groupBy;
    var messages = _props2.messages;
    var data = _props2.data;
    var busy = _props2.busy;
    var dropUp = _props2.dropUp;
    var placeholder = _props2.placeholder;
    var value = _props2.value;
    var open = _props2.open;
    var valueComponent = _props2.valueComponent;
    var List = _props2.listComponent;


    List = List || groupBy && _ListGroupable2.default || _List2.default;

    var focused = this.state.focused;


    var disabled = (0, _interaction.isDisabled)(this.props),
        readOnly = (0, _interaction.isReadOnly)(this.props),
        valueItem = (0, _dataHelpers.dataItem)(data, value, valueField); // take value from the raw data

    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

    var elementProps = _extends(_3.default.omitOwnProps(this, List), {
      name: undefined,
      role: 'combobox',
      id: this.inputId,
      tabIndex: tabIndex || 0,
      'aria-owns': this.listID,
      'aria-activedescendant': open ? this.activeId : null,
      'aria-expanded': !!open,
      'aria-haspopup': true,
      'aria-busy': !!busy,
      'aria-live': !open && 'polite',
      'aria-autocomplete': 'list',
      'aria-disabled': disabled,
      'aria-readonly': readOnly
    });

    messages = msgs(messages);

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        ref: 'input',
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        onKeyPress: this.handleKeyPress,
        className: (0, _classnames2.default)(className, 'rw-dropdown-list')
      }),
      _react2.default.createElement(
        _WidgetPicker2.default,
        {
          open: open,
          dropUp: dropUp,
          focused: focused,
          disabled: disabled,
          readOnly: readOnly,
          className: 'rw-widget-input'
        },
        _react2.default.createElement(_DropdownListInput2.default, {
          value: valueItem,
          textField: textField,
          placeholder: placeholder,
          valueComponent: valueComponent
        }),
        _react2.default.createElement(_Select2.default, {
          busy: busy,
          icon: 'caret-down',
          role: 'presentational',
          'aria-hidden': 'true',
          disabled: disabled || readOnly,
          label: result(messages.open, this.props)
        })
      ),
      shouldRenderPopup && _react2.default.createElement(
        _Popup2.default,
        {
          open: open,
          dropUp: dropUp,
          duration: duration,
          onOpen: function onOpen() {
            return _this3.focus();
          },
          onOpening: function onOpening() {
            return _this3.refs.list.forceUpdate();
          }
        },
        this.renderList(List, messages)
      )
    );
  };

  DropdownList.prototype.change = function change(data) {
    if (!(0, _dataHelpers.valueMatcher)(data, this.props.value, this.props.valueField)) {
      (0, _widgetHelpers.notify)(this.props.onChange, data);
      (0, _widgetHelpers.notify)(this.props.onSearch, '');
      this.close();
    }
  };

  DropdownList.prototype.focus = function focus(target) {
    var _props3 = this.props;
    var filter = _props3.filter;
    var open = _props3.open;

    var inst = target || (filter && open ? this.refs.filter : this.refs.input);

    inst = _compat2.default.findDOMNode(inst);

    if ((0, _activeElement2.default)() !== inst) inst.focus();
  };

  DropdownList.prototype._data = function _data() {
    return this.state.data;
  };

  DropdownList.prototype.search = function search(character, cb) {
    var _this4 = this;

    var word = ((this._searchTerm || '') + character).toLowerCase();

    if (!character) return;

    this._searchTerm = word;

    this.timeouts.set('search', function () {
      var list = _this4.refs.list,
          key = _this4.props.open ? 'focusedItem' : 'selectedItem',
          item = list.next(_this4.state[key], word);

      _this4._searchTerm = '';
      if (item) cb(item);
    }, this.props.delay);
  };

  DropdownList.prototype.open = function open() {
    (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  DropdownList.prototype.close = function close() {
    (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  DropdownList.prototype.toggle = function toggle() {
    this.props.open ? this.close() : this.open();
  };

  return DropdownList;
}(_react2.default.Component), _class2.propTypes = _extends({}, Filter.propTypes, {

  //-- controlled props -----------
  value: _react2.default.PropTypes.any,
  onChange: _react2.default.PropTypes.func,
  open: _react2.default.PropTypes.bool,
  onToggle: _react2.default.PropTypes.func,
  //------------------------------------

  data: _react2.default.PropTypes.array,
  valueField: _react2.default.PropTypes.string,
  textField: _propTypes2.default.accessor,

  valueComponent: _propTypes2.default.elementType,
  itemComponent: _propTypes2.default.elementType,
  listComponent: _propTypes2.default.elementType,

  groupComponent: _propTypes2.default.elementType,
  groupBy: _propTypes2.default.accessor,

  onSelect: _react2.default.PropTypes.func,
  searchTerm: _react2.default.PropTypes.string,
  onSearch: _react2.default.PropTypes.func,
  busy: _react2.default.PropTypes.bool,

  delay: _react2.default.PropTypes.number,
  dropUp: _react2.default.PropTypes.bool,
  duration: _react2.default.PropTypes.number,

  placeholder: _react2.default.PropTypes.string,

  disabled: _propTypes2.default.disabled.acceptsArray,
  readOnly: _propTypes2.default.readOnly,

  messages: _react2.default.PropTypes.shape({
    open: _propTypes2.default.message,
    emptyList: _propTypes2.default.message,
    emptyFilter: _propTypes2.default.message,
    filterPlaceholder: _propTypes2.default.message
  })
}), _class2.defaultProps = {
  delay: 500,
  value: '',
  open: false,
  data: [],
  searchTerm: '',
  minLength: 1,
  filter: true,
  caseSensitive: false,
  messages: msgs()
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'handleSelect', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (data) {
      _this5.close();
      (0, _widgetHelpers.notify)(_this5.props.onSelect, data);
      _this5.change(data);
      _this5.focus(_this5);
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'handleClick', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (e) {
      var wrapper = _this6.refs.filterWrapper;

      if (!_this6.props.filter || !_this6.props.open) _this6.toggle();else if (!(0, _contains2.default)(_compat2.default.findDOMNode(wrapper), e.target)) _this6.close();

      (0, _widgetHelpers.notify)(_this6.props.onClick, e);
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (e) {
      var key = e.key,
          alt = e.altKey,
          list = _this7.refs.list,
          filtering = _this7.props.filter,
          focusedItem = _this7.state.focusedItem,
          selectedItem = _this7.state.selectedItem,
          isOpen = _this7.props.open,
          closeWithFocus = function closeWithFocus() {
        _this7.close(), _compat2.default.findDOMNode(_this7).focus();
      };

      (0, _widgetHelpers.notify)(_this7.props.onKeyDown, [e]);

      var change = function change(item, fromList) {
        if (item == null) return;
        fromList ? _this7.handleSelect(item) : _this7.change(item);
      };

      if (e.defaultPrevented) return;

      if (key === 'End') {
        e.preventDefault();

        if (isOpen) _this7.setState({ focusedItem: list.last() });else change(list.last());
      } else if (key === 'Home') {
        e.preventDefault();

        if (isOpen) _this7.setState({ focusedItem: list.first() });else change(list.first());
      } else if (key === 'Escape' && isOpen) {
        e.preventDefault();
        closeWithFocus();
      } else if ((key === 'Enter' || key === ' ' && !filtering) && isOpen) {
        e.preventDefault();
        change(_this7.state.focusedItem, true);
      } else if (key === ' ' && !isOpen) {
        e.preventDefault();
        _this7.open();
      } else if (key === 'ArrowDown') {
        if (alt) _this7.open();else if (isOpen) _this7.setState({ focusedItem: list.next(focusedItem) });else change(list.next(selectedItem));
        e.preventDefault();
      } else if (key === 'ArrowUp') {
        if (alt) closeWithFocus();else if (isOpen) _this7.setState({ focusedItem: list.prev(focusedItem) });else change(list.prev(selectedItem));
        e.preventDefault();
      }
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'handleKeyPress', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this8 = this;

    return function (e) {
      (0, _widgetHelpers.notify)(_this8.props.onKeyPress, [e]);

      if (e.defaultPrevented) return;

      if (!(_this8.props.filter && _this8.props.open)) _this8.search(String.fromCharCode(e.which), function (item) {
        _this8.mounted() && _this8.props.open ? _this8.setState({ focusedItem: item }) : item && _this8.change(item);
      });
    };
  }
})), _class);


function msgs(msgs) {
  return _extends({
    open: 'open dropdown',
    filterPlaceholder: '',
    emptyList: 'There are no items in this list',
    emptyFilter: 'The filter returned no results'
  }, msgs);
}

DropdownList = (0, _uncontrollable2.default)(DropdownList, {
  open: 'onToggle',
  value: 'onChange',
  searchTerm: 'onSearch'
}, ['focus']);

DropdownList = (0, _withRightToLeft2.default)(DropdownList);

exports.default = DropdownList;
module.exports = exports['default'];