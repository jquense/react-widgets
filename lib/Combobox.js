'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _obj;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _filter = require('./util/filter');

var _filter2 = _interopRequireDefault(_filter);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _WidgetButton = require('./WidgetButton');

var _WidgetButton2 = _interopRequireDefault(_WidgetButton);

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

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

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

var defaultSuggest = function defaultSuggest(f) {
  return f === true ? 'startsWith' : f ? f : 'eq';
};

var omit = _3.default.omit;
var pick = _3.default.pick;


var propTypes = {
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
  readOnly: _propTypes2.default.readOnly.acceptsArray,

  suggest: _propTypes2.default.filter,
  filter: _propTypes2.default.filter,

  busy: _react2.default.PropTypes.bool,

  dropUp: _react2.default.PropTypes.bool,
  duration: _react2.default.PropTypes.number, //popup

  placeholder: _react2.default.PropTypes.string,

  messages: _react2.default.PropTypes.shape({
    open: _propTypes2.default.message,
    emptyList: _propTypes2.default.message,
    emptyFilter: _propTypes2.default.message
  })
};

var ComboBox = _react2.default.createClass((_obj = {

  displayName: 'ComboBox',

  mixins: [require('./mixins/TimeoutMixin'), require('./mixins/DataFilterMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')('input'), require('./mixins/FocusMixin')({
    willHandle: function willHandle(focused) {
      // not suggesting anymore
      !focused && this.refs.input.accept();
    },
    didHandle: function didHandle(focused) {
      if (!focused) this.close();
    }
  })],

  propTypes: propTypes,

  getInitialState: function getInitialState() {
    var _props = this.props;
    var value = _props.value;
    var data = _props.data;
    var valueField = _props.valueField;
    var items = this.process(data, value);
    var idx = (0, _dataHelpers.dataIndexOf)(items, value, valueField);

    return {
      selectedItem: items[idx],
      focusedItem: items[! ~idx ? 0 : idx],
      processedData: items,
      open: false
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      value: '',
      open: false,
      suggest: false,
      filter: false,
      delay: 500,

      messages: msgs(),
      ariaActiveDescendantKey: 'combobox'
    };
  },
  componentDidUpdate: function componentDidUpdate() {
    this.refs.list && (0, _validateListInterface2.default)(this.refs.list);
  },
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    var isSuggesting = this.refs.input && this.refs.input.isSuggesting(),
        stateChanged = !_3.default.isShallowEqual(nextState, this.state),
        valueChanged = !_3.default.isShallowEqual(nextProps, this.props);

    return isSuggesting || stateChanged || valueChanged;
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    var data = nextProps.data;
    var valueField = nextProps.valueField;
    var textField = nextProps.textField;


    var rawIdx = (0, _dataHelpers.dataIndexOf)(data, value, valueField),
        valueItem = rawIdx === -1 ? nextProps.value : nextProps.data[rawIdx],
        isSuggesting = this.refs.input.isSuggesting(),
        items = this.process(nextProps.data, nextProps.value, (rawIdx === -1 || isSuggesting) && (0, _dataHelpers.dataText)(valueItem, textField)),
        idx = (0, _dataHelpers.dataIndexOf)(items, value, valueField),
        focused = this.filterIndexOf(items, (0, _dataHelpers.dataText)(valueItem, textField));

    this._searchTerm = '';

    this.setState({
      processedData: items,
      selectedItem: items[idx],
      focusedItem: items[idx === -1 ? focused !== -1 ? focused : 0 // focus the closest match
      : idx]
    });
  },
  render: function render() {
    var _cx,
        _this = this;

    var _props2 = this.props;
    var className = _props2.className;
    var tabIndex = _props2.tabIndex;
    var filter = _props2.filter;
    var suggest = _props2.suggest;
    var valueField = _props2.valueField;
    var textField = _props2.textField;
    var groupBy = _props2.groupBy;
    var messages = _props2.messages;
    var data = _props2.data;
    var busy = _props2.busy;
    var dropUp = _props2.dropUp;
    var name = _props2.name;
    var autoFocus = _props2.autoFocus;
    var placeholder = _props2.placeholder;
    var value = _props2.value;
    var open = _props2.open;
    var List = _props2.listComponent;


    List = List || groupBy && _ListGroupable2.default || _List2.default;

    var elementProps = omit(this.props, Object.keys(propTypes));
    var listProps = pick(this.props, Object.keys(List.propTypes));
    var popupProps = pick(this.props, Object.keys(_Popup2.default.propTypes));

    var _state = this.state;
    var focusedItem = _state.focusedItem;
    var selectedItem = _state.selectedItem;
    var focused = _state.focused;


    var items = this._data(),
        disabled = (0, _interaction.isDisabled)(this.props),
        readOnly = (0, _interaction.isReadOnly)(this.props),
        valueItem = (0, _dataHelpers.dataItem)(data, value, valueField) // take value from the raw data
    ,
        inputID = (0, _widgetHelpers.instanceId)(this, '_input'),
        listID = (0, _widgetHelpers.instanceId)(this, '_listbox'),
        completeType = suggest ? filter ? 'both' : 'inline' : filter ? 'list' : '';

    var shouldRenderList = (0, _widgetHelpers.isFirstFocusedRender)(this) || open;

    messages = msgs(messages);

    return _react2.default.createElement(
      'div',
      _extends({}, elementProps, {
        ref: 'element',
        onKeyDown: this._keyDown,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        tabIndex: '-1',
        className: (0, _classnames2.default)(className, 'rw-combobox', 'rw-widget', (_cx = {
          'rw-state-focus': focused,
          'rw-state-disabled': disabled,
          'rw-state-readonly': readOnly,
          'rw-rtl': this.isRtl()

        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
      }),
      _react2.default.createElement(
        _WidgetButton2.default,
        {
          tabIndex: '-1',
          className: 'rw-select',
          onClick: this.toggle,
          disabled: !!(disabled || readOnly)
        },
        _react2.default.createElement(
          'i',
          { className: (0, _classnames2.default)('rw-i rw-i-caret-down', { 'rw-loading': busy }) },
          _react2.default.createElement(
            'span',
            { className: 'rw-sr' },
            _3.default.result(messages.open, this.props)
          )
        )
      ),
      _react2.default.createElement(_ComboboxInput2.default, {
        ref: 'input',
        id: inputID,
        autoFocus: autoFocus,
        tabIndex: tabIndex,
        suggest: suggest,
        name: name,
        role: 'combobox',
        'aria-owns': listID,
        'aria-busy': !!busy,
        'aria-autocomplete': completeType,
        'aria-expanded': open,
        'aria-haspopup': true,
        placeholder: placeholder,
        disabled: disabled,
        readOnly: readOnly,
        className: 'rw-input',
        value: (0, _dataHelpers.dataText)(valueItem, textField),
        onChange: this._inputTyping,
        onKeyDown: this._inputKeyDown
      }),
      _react2.default.createElement(
        _Popup2.default,
        _extends({}, popupProps, {
          onOpening: function onOpening() {
            return _this.refs.list.forceUpdate();
          }
        }),
        _react2.default.createElement(
          'div',
          null,
          shouldRenderList && _react2.default.createElement(List, _extends({ ref: 'list'
          }, listProps, {
            id: listID,
            data: items,
            selected: selectedItem,
            focused: focusedItem,
            'aria-hidden': !open,
            'aria-labelledby': inputID,
            'aria-live': open && 'polite',
            onSelect: this._onSelect,
            onMove: this._scrollTo,
            messages: {
              emptyList: data.length ? messages.emptyFilter : messages.emptyList
            } }))
        )
      )
    );
  },
  _onSelect: function _onSelect(data) {
    this.close();
    (0, _widgetHelpers.notify)(this.props.onSelect, data);
    this.change(data);
    this.focus();
  },
  _inputKeyDown: function _inputKeyDown(e) {
    this._deleting = e.key === 'Backspace' || e.key === 'Delete';
    this._isTyping = true;
  },
  _inputTyping: function _inputTyping(e) {
    var _props3 = this.props;
    var data = _props3.data;
    var textField = _props3.textField;


    var shouldSuggest = !!this.props.suggest,
        strVal = e.target.value,
        suggestion;

    suggestion = this._deleting || !shouldSuggest ? strVal : this.suggest(this._data(), strVal);

    suggestion = suggestion || strVal;

    data = _3.default.find(data, function (item) {
      return (0, _dataHelpers.dataText)(item, textField).toLowerCase() === suggestion.toLowerCase();
    });

    this.change(!this._deleting && data ? data : strVal, true);

    this.open();
  },
  focus: function focus() {
    this.refs.input.focus();
  },
  _keyDown: function _keyDown(e) {
    var self = this,
        key = e.key,
        alt = e.altKey,
        list = this.refs.list,
        focusedItem = this.state.focusedItem,
        selectedItem = this.state.selectedItem,
        isOpen = this.props.open;

    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (key === 'End') {
      if (isOpen) this.setState({ focusedItem: list.last() });else select(list.last(), true);
    } else if (key === 'Home') {
      if (isOpen) this.setState({ focusedItem: list.first() });else select(list.first(), true);
    } else if (key === 'Escape' && isOpen) this.close();else if (key === 'Enter' && isOpen) {
      e.preventDefault();
      select(this.state.focusedItem, true);
    } else if (key === 'ArrowDown') {
      if (alt) this.open();else {
        if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else select(list.next(selectedItem), true);
      }
    } else if (key === 'ArrowUp') {
      if (alt) this.close();else {
        if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else select(list.prev(selectedItem), true);
      }
    }

    function select(item, fromList) {
      if (!item) return self.change(_compat2.default.findDOMNode(self.refs.input).value, false);

      self.refs.input.accept(true); //removes caret

      if (fromList) return self._onSelect(item);

      self.change(item, false);
    }
  },
  change: function change(data, typing) {
    this._typedChange = !!typing;
    (0, _widgetHelpers.notify)(this.props.onChange, data);
  },
  open: function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  },
  close: function close() {
    if (this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, false);
  },
  toggle: function toggle() {
    this.focus();

    this.props.open ? this.close() : this.open();
  },
  suggest: function suggest(data, value) {
    var _props4 = this.props;
    var textField = _props4.textField;
    var suggest = _props4.suggest;
    var minLength = _props4.minLength;


    var word = (0, _dataHelpers.dataText)(value, textField),
        suggestion;

    suggest = defaultSuggest(suggest);

    if (!(word || '').trim() || word.length < (minLength || 1)) return '';

    suggestion = typeof value === 'string' ? _3.default.find(data, getFilter(suggest, word, textField)) : value;

    if (suggestion && (!this.state || !this.state.deleting)) return (0, _dataHelpers.dataText)(suggestion, textField);

    return '';
  },
  _data: function _data() {
    return this.state.processedData;
  },
  process: function process(data, values, searchTerm) {
    if (this.props.filter && searchTerm) data = this.filter(data, searchTerm);

    return data;
  }
}, (_applyDecoratedDescriptor(_obj, '_onSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_onSelect'), _obj), _applyDecoratedDescriptor(_obj, '_keyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_keyDown'), _obj), _applyDecoratedDescriptor(_obj, 'toggle', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'toggle'), _obj)), _obj));

exports.default = (0, _uncontrollable2.default)(ComboBox, { open: 'onToggle', value: 'onChange' }, ['focus']);


function msgs(msgs) {
  return _extends({
    open: 'open combobox',
    emptyList: 'There are no items in this list',
    emptyFilter: 'The filter returned no results'
  }, msgs);
}

function getFilter(suggest, word, textField) {
  return typeof suggest === 'string' ? function (item) {
    return _filter2.default[suggest]((0, _dataHelpers.dataText)(item, textField).toLowerCase(), word.toLowerCase());
  } : function (item) {
    return suggest(item, word);
  };
}
module.exports = exports['default'];