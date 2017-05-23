'use strict';

exports.__esModule = true;

var _desc, _value, _obj;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _filter = require('./util/filter');

var _filter2 = _interopRequireDefault(_filter);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _ComboboxInput = require('./ComboboxInput');

var _ComboboxInput2 = _interopRequireDefault(_ComboboxInput);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

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

var propTypes = _extends({}, _Popup2.default.propTypes, {

  //-- controlled props -----------
  value: _propTypes2.default.any,
  onChange: _propTypes2.default.func,
  open: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func,
  //------------------------------------

  itemComponent: _propTypes4.default.elementType,
  listComponent: _propTypes4.default.elementType,

  groupComponent: _propTypes4.default.elementType,
  groupBy: _propTypes4.default.accessor,

  data: _propTypes2.default.array,
  valueField: _propTypes2.default.string,
  textField: _propTypes4.default.accessor,
  name: _propTypes2.default.string,

  onSelect: _propTypes2.default.func,

  autoFocus: _propTypes2.default.bool,
  disabled: _propTypes4.default.disabled.acceptsArray,
  readOnly: _propTypes4.default.readOnly.acceptsArray,

  suggest: _propTypes4.default.filter,
  filter: _propTypes4.default.filter,

  busy: _propTypes2.default.bool,

  dropUp: _propTypes2.default.bool,
  duration: _propTypes2.default.number,
  delay: _propTypes2.default.number,

  placeholder: _propTypes2.default.string,

  messages: _propTypes2.default.shape({
    open: _propTypes4.default.message,
    emptyList: _propTypes4.default.message,
    emptyFilter: _propTypes4.default.message
  })
});

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
    var _props = this.props,
        value = _props.value,
        data = _props.data,
        valueField = _props.valueField,
        items = this.process(data, value),
        idx = (0, _dataHelpers.dataIndexOf)(items, value, valueField);


    return {
      selectedItem: items[idx],
      focusedItem: items[!~idx ? 0 : idx],
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
    var value = nextProps.value,
        data = nextProps.data,
        valueField = nextProps.valueField,
        textField = nextProps.textField;


    var rawIdx = (0, _dataHelpers.dataIndexOf)(data, value, valueField),
        valueItem = rawIdx === -1 ? nextProps.value : nextProps.data[rawIdx],
        isSuggesting = this.refs.input && this.refs.input.isSuggesting();

    var items = this.process(nextProps.data, nextProps.value, (rawIdx === -1 || isSuggesting) && (0, _dataHelpers.dataText)(valueItem, textField));

    var idx = (0, _dataHelpers.dataIndexOf)(items, value, valueField),
        focused = this.filterIndexOf(items, (0, _dataHelpers.dataText)(valueItem, textField));

    this._searchTerm = '';

    this.setState({
      processedData: items,
      selectedItem: items[idx],
      focusedItem: items[idx === -1 ? focused !== -1 ? focused : 0 // focus the closest match
      : idx]
    });
  },
  renderInput: function renderInput(listID) {
    var _props2 = this.props,
        suggest = _props2.suggest,
        filter = _props2.filter,
        textField = _props2.textField,
        busy = _props2.busy,
        name = _props2.name,
        data = _props2.data,
        value = _props2.value,
        valueField = _props2.valueField,
        autoFocus = _props2.autoFocus,
        tabIndex = _props2.tabIndex,
        disabled = _props2.disabled,
        readOnly = _props2.readOnly,
        placeholder = _props2.placeholder,
        open = _props2.open;


    var valueItem = (0, _dataHelpers.dataItem)(data, value, valueField); // take value from the raw data

    var completeType = suggest ? filter ? 'both' : 'inline' : filter ? 'list' : '';

    return _react2.default.createElement(_ComboboxInput2.default, {
      ref: 'input',
      id: (0, _widgetHelpers.instanceId)(this, '_input'),
      autoFocus: autoFocus,
      tabIndex: tabIndex,
      suggest: suggest,
      name: name,
      role: 'combobox',
      disabled: disabled,
      readOnly: readOnly,
      'aria-owns': listID,
      'aria-busy': !!busy,
      'aria-autocomplete': completeType,
      'aria-expanded': open,
      'aria-haspopup': true,
      placeholder: placeholder,
      value: (0, _dataHelpers.dataText)(valueItem, textField),
      onChange: this.handleInputChange,
      onKeyDown: this.handleInputKeyDown
    });
  },
  renderList: function renderList(List, id, messages) {
    var _props3 = this.props,
        open = _props3.open,
        data = _props3.data;
    var _state = this.state,
        selectedItem = _state.selectedItem,
        focusedItem = _state.focusedItem;


    var listProps = _3.default.pickProps(this.props, List);
    var items = this._data();

    return _react2.default.createElement(List, _extends({ ref: 'list'
    }, listProps, {
      id: id,
      data: items,
      selected: selectedItem,
      focused: focusedItem,
      'aria-hidden': !open,
      'aria-labelledby': (0, _widgetHelpers.instanceId)(this),
      'aria-live': open && 'polite',
      onSelect: this.handleSelect,
      onMove: this._scrollTo,
      messages: {
        emptyList: data.length ? messages.emptyFilter : messages.emptyList
      }
    }));
  },
  render: function render() {
    var _this = this;

    var _props4 = this.props,
        className = _props4.className,
        duration = _props4.duration,
        groupBy = _props4.groupBy,
        messages = _props4.messages,
        busy = _props4.busy,
        dropUp = _props4.dropUp,
        open = _props4.open,
        List = _props4.listComponent;
    var focused = this.state.focused;


    var disabled = (0, _interaction.isDisabled)(this.props),
        readOnly = (0, _interaction.isReadOnly)(this.props),
        listID = (0, _widgetHelpers.instanceId)(this, '_listbox');

    List = List || groupBy && _ListGroupable2.default || _List2.default;

    var elementProps = _3.default.omitOwnProps(this, List);
    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

    messages = msgs(messages);

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        open: open,
        dropUp: dropUp,
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onKeyDown: this.handleKeyDown,
        className: (0, _classnames2.default)(className, 'rw-combobox')
      }),
      _react2.default.createElement(_Select2.default, {
        onClick: this.toggle,
        disabled: !!(disabled || readOnly),
        busy: busy,
        icon: 'caret-down',
        label: _3.default.result(messages.open, this.props)
      }),
      this.renderInput(listID),
      shouldRenderPopup && _react2.default.createElement(
        _Popup2.default,
        {
          open: open,
          dropUp: dropUp,
          duration: duration,
          onOpening: function onOpening() {
            return _this.refs.list.forceUpdate();
          }
        },
        _react2.default.createElement(
          'div',
          null,
          this.renderList(List, listID, messages)
        )
      )
    );
  },
  handleSelect: function handleSelect(data) {
    this.close();
    (0, _widgetHelpers.notify)(this.props.onSelect, data);
    this.change(data);
    this.focus();
  },
  handleInputKeyDown: function handleInputKeyDown(e) {
    this._deleting = e.key === 'Backspace' || e.key === 'Delete';
    this._isTyping = true;
  },
  handleInputChange: function handleInputChange(e) {
    var _props5 = this.props,
        data = _props5.data,
        textField = _props5.textField;


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
    this.refs.input && this.refs.input.focus();
  },
  handleKeyDown: function handleKeyDown(e) {
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

      if (fromList) return self.handleSelect(item);

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
    var _props6 = this.props,
        textField = _props6.textField,
        suggest = _props6.suggest,
        minLength = _props6.minLength;


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
}, (_applyDecoratedDescriptor(_obj, 'handleSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleSelect'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj), _applyDecoratedDescriptor(_obj, 'toggle', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'toggle'), _obj)), _obj));

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