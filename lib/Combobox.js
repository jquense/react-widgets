'use strict';

exports.__esModule = true;

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _Filter = require('./util/Filter');

var Filter = _interopRequireWildcard(_Filter);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _WidgetPicker = require('./WidgetPicker');

var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _ComboboxInput = require('./ComboboxInput');

var _ComboboxInput2 = _interopRequireDefault(_ComboboxInput);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _ListGroupable = require('./ListGroupable');

var _ListGroupable2 = _interopRequireDefault(_ListGroupable);

var _validateListInterface = require('./util/validateListInterface');

var _validateListInterface2 = _interopRequireDefault(_validateListInterface);

var _scrollManager = require('./util/scrollManager');

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _focusManager = require('./util/focusManager');

var _focusManager2 = _interopRequireDefault(_focusManager);

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

var propTypes = _extends({}, Filter.propTypes, {

  //-- controlled props -----------
  value: _react2.default.PropTypes.any,
  onChange: _react2.default.PropTypes.func,
  open: _react2.default.PropTypes.bool,
  onToggle: _react2.default.PropTypes.func,
  //------------------------------------

  itemComponent: _propTypes2.default.elementType,
  listComponent: _propTypes2.default.elementType,

  groupComponent: _propTypes2.default.elementType,
  groupBy: _propTypes2.default.accessor,

  data: _react2.default.PropTypes.array,
  valueField: _react2.default.PropTypes.string,
  textField: _propTypes2.default.accessor,
  name: _react2.default.PropTypes.string,

  onSelect: _react2.default.PropTypes.func,

  autoFocus: _react2.default.PropTypes.bool,
  disabled: _propTypes2.default.disabled.acceptsArray,
  readOnly: _propTypes2.default.readOnly,

  suggest: Filter.propTypes.filter,

  busy: _react2.default.PropTypes.bool,

  delay: _react2.default.PropTypes.number,
  dropUp: _react2.default.PropTypes.bool,
  duration: _react2.default.PropTypes.number,

  placeholder: _react2.default.PropTypes.string,

  messages: _react2.default.PropTypes.shape({
    open: _propTypes2.default.message,
    emptyList: _propTypes2.default.message,
    emptyFilter: _propTypes2.default.message
  })
});

var ComboBox = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(ComboBox, _React$Component);

  function ComboBox(props, context) {
    _classCallCheck(this, ComboBox);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props, context));

    _this.handleFocusWillChange = function (focused) {
      if (!focused && _this.refs.input) _this.refs.input.accept();
    };

    _this.handleFocusChanged = function (focused) {
      if (!focused) _this.close();
    };

    _initDefineProp(_this, 'handleSelect', _descriptor, _this);

    _this.handleInputKeyDown = function (e) {
      _this._deleting = e.key === 'Backspace' || e.key === 'Delete';
      _this._isTyping = true;
    };

    _this.handleInputChange = function (e) {
      var suggestion = _this.suggest(e.target.value);

      _this.change(suggestion, true);
      _this.open();
    };

    _initDefineProp(_this, 'handleKeyDown', _descriptor2, _this);

    _initDefineProp(_this, 'toggle', _descriptor3, _this);

    _this.inputId = (0, _widgetHelpers.instanceId)(_this, '_input');
    _this.listId = (0, _widgetHelpers.instanceId)(_this, '_listbox');
    _this.activeId = (0, _widgetHelpers.instanceId)(_this, '_listbox_active_option');

    _this.handleScroll = (0, _scrollManager2.default)(_this);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      willHandle: _this.handleFocusWillChange,
      didHandle: _this.handleFocusChanged
    });

    _this.state = _extends({}, _this.getStateFromProps(props), {
      open: false
    });
    return _this;
  }

  ComboBox.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var isSuggesting = this.refs.input && this.refs.input.isSuggesting(),
        stateChanged = !_3.default.isShallowEqual(nextState, this.state),
        valueChanged = !_3.default.isShallowEqual(nextProps, this.props);

    return isSuggesting || stateChanged || valueChanged;
  };

  ComboBox.prototype.componentDidUpdate = function componentDidUpdate() {
    this.refs.list && (0, _validateListInterface2.default)(this.refs.list);
  };

  ComboBox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  };

  ComboBox.prototype.getStateFromProps = function getStateFromProps(props) {
    var value = props.value;
    var data = props.data;
    var filter = props.filter;
    var valueField = props.valueField;
    var textField = props.textField;


    var index = (0, _dataHelpers.dataIndexOf)(data, value, valueField);
    var dataItem = index === -1 ? value : data[index];
    var itemText = (0, _dataHelpers.dataText)(dataItem, textField);

    var searchTerm = void 0;
    // filter only when the value is not an item in the data list
    if (index === -1 || this.refs.input && this.refs.input.isSuggesting()) {
      searchTerm = itemText;
    }

    data = Filter.filter(data, _extends({ searchTerm: searchTerm }, props));

    var focusedIndex = index;
    // index may have changed after filtering
    if (index !== -1) {
      index = (0, _dataHelpers.dataIndexOf)(data, value, valueField);
      focusedIndex = index;
    } else {
      // value isn't a dataItem so find the close match
      focusedIndex = Filter.indexOf(data, {
        searchTerm: searchTerm,
        textField: textField,
        filter: filter || true
      });
    }

    return {
      data: data,
      selectedItem: data[index],
      focusedItem: focusedIndex === -1 ? data[0] : data[focusedIndex]
    };
  };

  ComboBox.prototype.renderInput = function renderInput() {
    var _props = this.props;
    var suggest = _props.suggest;
    var filter = _props.filter;
    var textField = _props.textField;
    var busy = _props.busy;
    var name = _props.name;
    var data = _props.data;
    var value = _props.value;
    var valueField = _props.valueField;
    var autoFocus = _props.autoFocus;
    var tabIndex = _props.tabIndex;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;
    var placeholder = _props.placeholder;
    var open = _props.open;


    var valueItem = (0, _dataHelpers.dataItem)(data, value, valueField); // take value from the raw data

    var completeType = suggest ? filter ? 'both' : 'inline' : filter ? 'list' : '';

    return _react2.default.createElement(_ComboboxInput2.default, {
      ref: 'input',
      role: 'combobox',
      name: name,
      id: this.inputId,
      autoFocus: autoFocus,
      tabIndex: tabIndex,
      suggest: suggest,
      disabled: disabled,
      readOnly: readOnly,
      'aria-busy': !!busy,
      'aria-owns': this.listId,
      'aria-autocomplete': completeType,
      'aria-activedescendant': open ? this.activeId : null,
      'aria-expanded': open,
      'aria-haspopup': true,
      placeholder: placeholder,
      value: (0, _dataHelpers.dataText)(valueItem, textField),
      onChange: this.handleInputChange,
      onKeyDown: this.handleInputKeyDown
    });
  };

  ComboBox.prototype.renderList = function renderList(List, messages) {
    var activeId = this.activeId;
    var inputId = this.inputId;
    var listId = this.listId;
    var _props2 = this.props;
    var open = _props2.open;
    var data = _props2.data;
    var _state = this.state;
    var items = _state.data;
    var selectedItem = _state.selectedItem;
    var focusedItem = _state.focusedItem;


    var listProps = _3.default.pickProps(this.props, List);

    return _react2.default.createElement(List, _extends({ ref: 'list'
    }, listProps, {
      id: listId,
      activeId: activeId,
      data: items,
      selected: selectedItem,
      focused: focusedItem,
      'aria-hidden': !open,
      'aria-labelledby': inputId,
      'aria-live': open && 'polite',
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      messages: {
        emptyList: data.length ? messages.emptyFilter : messages.emptyList
      }
    }));
  };

  ComboBox.prototype.render = function render() {
    var _this2 = this;

    var _props3 = this.props;
    var className = _props3.className;
    var duration = _props3.duration;
    var groupBy = _props3.groupBy;
    var messages = _props3.messages;
    var busy = _props3.busy;
    var dropUp = _props3.dropUp;
    var open = _props3.open;
    var List = _props3.listComponent;
    var focused = this.state.focused;


    var disabled = (0, _interaction.isDisabled)(this.props),
        readOnly = (0, _interaction.isReadOnly)(this.props);

    List = List || groupBy && _ListGroupable2.default || _List2.default;

    var elementProps = _3.default.omitOwnProps(this, List);
    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

    messages = msgs(messages);

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
        onKeyDown: this.handleKeyDown,
        className: (0, _classnames2.default)(className, 'rw-combobox')
      }),
      _react2.default.createElement(
        _WidgetPicker2.default,
        {
          open: open,
          dropUp: dropUp,
          focused: focused,
          disabled: disabled,
          readOnly: readOnly
        },
        this.renderInput(),
        _react2.default.createElement(_Select2.default, {
          bordered: true,
          busy: busy,
          icon: 'caret-down',
          onClick: this.toggle,
          disabled: disabled || readOnly,
          label: _3.default.result(messages.open, this.props)
        })
      ),
      shouldRenderPopup && _react2.default.createElement(
        _Popup2.default,
        {
          open: open,
          dropUp: dropUp,
          duration: duration,
          onOpening: function onOpening() {
            return _this2.refs.list.forceUpdate();
          }
        },
        _react2.default.createElement(
          'div',
          null,
          this.renderList(List, messages)
        )
      )
    );
  };

  ComboBox.prototype.focus = function focus() {
    this.refs.input && this.refs.input.focus();
  };

  ComboBox.prototype.change = function change(data, typing) {
    this._typedChange = !!typing;
    (0, _widgetHelpers.notify)(this.props.onChange, data);
  };

  ComboBox.prototype.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  ComboBox.prototype.close = function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  ComboBox.prototype.suggest = function suggest(searchTerm) {
    var _props4 = this.props;
    var textField = _props4.textField;
    var suggest = _props4.suggest;
    var minLength = _props4.minLength;
    var data = this.state.data;


    if (!this._deleting) return Filter.suggest(data, {
      minLength: minLength,
      textField: textField,
      searchTerm: searchTerm,
      filter: suggest,
      caseSensitive: false
    });

    return searchTerm;
  };

  return ComboBox;
}(_react2.default.Component), _class3.propTypes = propTypes, _class3.defaultProps = {
  data: [],
  value: '',
  open: false,
  suggest: false,
  filter: false,
  delay: 500,

  messages: msgs()
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleSelect', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this3 = this;

    return function (data) {
      _this3.close();
      (0, _widgetHelpers.notify)(_this3.props.onSelect, data);
      _this3.change(data);
      _this3.focus();
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function (e) {
      var self = _this4,
          key = e.key,
          alt = e.altKey,
          list = _this4.refs.list,
          focusedItem = _this4.state.focusedItem,
          selectedItem = _this4.state.selectedItem,
          isOpen = _this4.props.open;

      (0, _widgetHelpers.notify)(_this4.props.onKeyDown, [e]);

      if (e.defaultPrevented) return;

      if (key === 'End') {
        e.preventDefault();
        if (isOpen) _this4.setState({ focusedItem: list.last() });else select(list.last(), true);
      } else if (key === 'Home') {
        e.preventDefault();
        if (isOpen) _this4.setState({ focusedItem: list.first() });else select(list.first(), true);
      } else if (key === 'Escape' && isOpen) _this4.close();else if (key === 'Enter' && isOpen) {
        e.preventDefault();
        select(_this4.state.focusedItem, true);
      } else if (key === 'ArrowDown') {
        e.preventDefault();
        if (alt) _this4.open();else {
          if (isOpen) _this4.setState({ focusedItem: list.next(focusedItem) });else select(list.next(selectedItem), true);
        }
      } else if (key === 'ArrowUp') {
        e.preventDefault();
        if (alt) _this4.close();else {
          if (isOpen) _this4.setState({ focusedItem: list.prev(focusedItem) });else select(list.prev(selectedItem), true);
        }
      }

      function select(item, fromList) {
        if (!item) return self.change(_compat2.default.findDOMNode(self.refs.input).value, false);

        self.refs.input.accept();

        if (fromList) return self.handleSelect(item);

        self.change(item, false);
      }
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'toggle', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function () {
      _this5.focus();

      _this5.props.open ? _this5.close() : _this5.open();
    };
  }
})), _class2)) || _class;

exports.default = (0, _uncontrollable2.default)(ComboBox, { open: 'onToggle', value: 'onChange' }, ['focus']);


function msgs(msgs) {
  return _extends({
    open: 'open combobox',
    emptyList: 'There are no items in this list',
    emptyFilter: 'The filter returned no results'
  }, msgs);
}
module.exports = exports['default'];