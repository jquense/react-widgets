'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _utilFilter = require('./util/filter');

var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

var _Popup = require('./Popup');

var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

var _WidgetButton = require('./WidgetButton');

var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

var _ComboboxInput = require('./ComboboxInput');

var _ComboboxInput2 = babelHelpers.interopRequireDefault(_ComboboxInput);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _List = require('./List');

var _List2 = babelHelpers.interopRequireDefault(_List);

var _ListGroupable = require('./ListGroupable');

var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

var _utilValidateListInterface = require('./util/validateListInterface');

var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

var defaultSuggest = function defaultSuggest(f) {
  return f === true ? 'startsWith' : f ? f : 'eq';
};

var omit = _util_2['default'].omit;
var pick = _util_2['default'].pick;
var result = _util_2['default'].result;

var propTypes = {
  //-- controlled props -----------
  value: _react2['default'].PropTypes.any,
  onChange: _react2['default'].PropTypes.func,
  open: _react2['default'].PropTypes.bool,
  onToggle: _react2['default'].PropTypes.func,
  //------------------------------------

  itemComponent: _utilPropTypes2['default'].elementType,
  listComponent: _utilPropTypes2['default'].elementType,

  groupComponent: _utilPropTypes2['default'].elementType,
  groupBy: _utilPropTypes2['default'].accessor,

  data: _react2['default'].PropTypes.array,
  valueField: _react2['default'].PropTypes.string,
  textField: _utilPropTypes2['default'].accessor,
  name: _react2['default'].PropTypes.string,

  onSelect: _react2['default'].PropTypes.func,

  disabled: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(['disabled'])]),

  readOnly: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(['readOnly'])]),

  suggest: _utilPropTypes2['default'].filter,
  filter: _utilPropTypes2['default'].filter,

  busy: _react2['default'].PropTypes.bool,

  dropUp: _react2['default'].PropTypes.bool,
  duration: _react2['default'].PropTypes.number, //popup

  placeholder: _react2['default'].PropTypes.string,

  messages: _react2['default'].PropTypes.shape({
    open: _utilPropTypes2['default'].message,
    emptyList: _utilPropTypes2['default'].message,
    emptyFilter: _utilPropTypes2['default'].message
  })
};

var ComboBox = _react2['default'].createClass({

  displayName: 'ComboBox',

  mixins: [require('./mixins/WidgetMixin'), require('./mixins/TimeoutMixin'), require('./mixins/DataFilterMixin'), require('./mixins/DataHelpersMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')('input')],

  propTypes: propTypes,

  getInitialState: function getInitialState() {
    var items = this.process(this.props.data, this.props.value),
        idx = this._dataIndexOf(items, this.props.value);

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
    this.refs.list && (0, _utilValidateListInterface2['default'])(this.refs.list);
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    var isSuggesting = this.refs.input && this.refs.input.isSuggesting(),
        stateChanged = !_util_2['default'].isShallowEqual(nextState, this.state),
        valueChanged = !_util_2['default'].isShallowEqual(nextProps, this.props);

    return isSuggesting || stateChanged || valueChanged;
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var rawIdx = this._dataIndexOf(nextProps.data, nextProps.value),
        valueItem = rawIdx === -1 ? nextProps.value : nextProps.data[rawIdx],
        isSuggesting = this.refs.input.isSuggesting(),
        items = this.process(nextProps.data, nextProps.value, (rawIdx === -1 || isSuggesting) && this._dataText(valueItem)),
        idx = this._dataIndexOf(items, nextProps.value),
        focused = this.filterIndexOf(items, this._dataText(valueItem));

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

    var _props = this.props;
    var className = _props.className;
    var tabIndex = _props.tabIndex;
    var filter = _props.filter;
    var suggest = _props.suggest;
    var groupBy = _props.groupBy;
    var messages = _props.messages;
    var data = _props.data;
    var busy = _props.busy;
    var dropUp = _props.dropUp;
    var name = _props.name;
    var placeholder = _props.placeholder;
    var value = _props.value;
    var open = _props.open;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;
    var List = _props.listComponent;

    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

    var elementProps = omit(this.props, Object.keys(propTypes));
    var listProps = pick(this.props, Object.keys(_utilCompat2['default'].type(List).propTypes));
    var popupProps = pick(this.props, Object.keys(_utilCompat2['default'].type(_Popup2['default']).propTypes));

    var _state = this.state;
    var focusedItem = _state.focusedItem;
    var selectedItem = _state.selectedItem;
    var focused = _state.focused;

    var items = this._data(),
        valueItem = this._dataItem(data, value) // take value from the raw data
    ,
        inputID = this._id('_input'),
        listID = this._id('_listbox'),
        completeType = this.props.suggest ? this.props.filter ? 'both' : 'inline' : this.props.filter ? 'list' : '';

    var shouldRenderList = _util_2['default'].isFirstFocusedRender(this) || open;

    messages = msgs(messages);

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, elementProps, {
        ref: 'element',
        onKeyDown: this._keyDown,
        onFocus: this._focus.bind(null, true),
        onBlur: this._focus.bind(null, false),
        tabIndex: '-1',
        className: (0, _classnames2['default'])(className, 'rw-combobox', 'rw-widget', (_cx = {}, _cx['rw-state-focus'] = focused, _cx['rw-state-disabled'] = disabled, _cx['rw-state-readonly'] = readOnly, _cx['rw-rtl'] = this.isRtl(), _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
      }),
      _react2['default'].createElement(
        _WidgetButton2['default'],
        {
          tabIndex: '-1',
          className: 'rw-select',
          onClick: this.toggle,
          disabled: !!(this.props.disabled || this.props.readOnly)
        },
        _react2['default'].createElement(
          'i',
          { className: (0, _classnames2['default'])('rw-i rw-i-caret-down', { 'rw-loading': busy }) },
          _react2['default'].createElement(
            'span',
            { className: 'rw-sr' },
            _util_2['default'].result(messages.open, this.props)
          )
        )
      ),
      _react2['default'].createElement(_ComboboxInput2['default'], {
        ref: 'input',
        id: inputID,
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
        value: this._dataText(valueItem),
        onChange: this._inputTyping,
        onKeyDown: this._inputKeyDown
      }),
      _react2['default'].createElement(
        _Popup2['default'],
        babelHelpers._extends({}, popupProps, {
          onOpening: function () {
            return _this.refs.list.forceUpdate();
          },
          onRequestClose: this.close
        }),
        _react2['default'].createElement(
          'div',
          null,
          shouldRenderList && _react2['default'].createElement(List, babelHelpers._extends({ ref: 'list'
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

  _onSelect: _util_2['default'].ifNotDisabled(function (data) {
    this.close();
    this.notify('onSelect', data);
    this.change(data);
    this.focus();
  }),

  _inputKeyDown: function _inputKeyDown(e) {
    this._deleting = e.key === 'Backspace' || e.key === 'Delete';
    this._isTyping = true;
  },

  _inputTyping: function _inputTyping(e) {
    var _this2 = this;

    var self = this,
        shouldSuggest = !!this.props.suggest,
        strVal = e.target.value,
        suggestion,
        data;

    suggestion = this._deleting || !shouldSuggest ? strVal : this.suggest(this._data(), strVal);

    suggestion = suggestion || strVal;

    data = _util_2['default'].find(self.props.data, function (item) {
      return _this2._dataText(item).toLowerCase() === suggestion.toLowerCase();
    });

    this.change(!this._deleting && data ? data : strVal, true);

    this.open();
  },

  focus: function focus() {
    this.refs.input.focus();
  },

  _focus: _util_2['default'].ifNotDisabled(true, function (focused, e) {
    var _this3 = this;

    !focused && this.refs.input.accept(); //not suggesting anymore

    this.setTimeout('focus', function () {

      if (!focused) _this3.close();

      if (focused !== _this3.state.focused) {
        _this3.notify(focused ? 'onFocus' : 'onBlur', e);
        _this3.setState({ focused: focused });
      }
    });
  }),

  _keyDown: _util_2['default'].ifNotDisabled(function (e) {
    var self = this,
        key = e.key,
        alt = e.altKey,
        list = this.refs.list,
        focusedItem = this.state.focusedItem,
        selectedItem = this.state.selectedItem,
        isOpen = this.props.open;

    if (key === 'End') if (isOpen) this.setState({ focusedItem: list.last() });else select(list.last(), true);else if (key === 'Home') if (isOpen) this.setState({ focusedItem: list.first() });else select(list.first(), true);else if (key === 'Escape' && isOpen) this.close();else if (key === 'Enter' && isOpen) {
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

    this.notify('onKeyDown', [e]);

    function select(item, fromList) {
      if (!item) return self.change(_utilCompat2['default'].findDOMNode(self.refs.input).value, false);

      self.refs.input.accept(true); //removes caret

      if (fromList) return self._onSelect(item);

      self.change(item, false);
    }
  }),

  change: function change(data, typing) {
    this._typedChange = !!typing;
    this.notify('onChange', data);
  },

  open: function open() {
    if (!this.props.open) this.notify('onToggle', true);
  },

  close: function close() {
    if (this.props.open) this.notify('onToggle', false);
  },

  toggle: _util_2['default'].ifNotDisabled(function () {
    this.focus();

    this.props.open ? this.close() : this.open();
  }),

  suggest: function suggest(data, value) {
    var word = this._dataText(value),
        suggest = defaultSuggest(this.props.suggest),
        suggestion;

    if (!(word || '').trim() || word.length < (this.props.minLength || 1)) return '';

    suggestion = typeof value === 'string' ? _util_2['default'].find(data, getFilter(suggest, word, this)) : value;

    if (suggestion && (!this.state || !this.state.deleting)) return this._dataText(suggestion);

    return '';
  },

  _data: function _data() {
    return this.state.processedData;
  },

  process: function process(data, values, searchTerm) {
    if (this.props.filter && searchTerm) data = this.filter(data, searchTerm);

    return data;
  }
});

function msgs(msgs) {
  return babelHelpers._extends({
    open: 'open combobox',
    emptyList: 'There are no items in this list',
    emptyFilter: 'The filter returned no results' }, msgs);
}

function getFilter(suggest, word, ctx) {
  return typeof suggest === 'string' ? function (item) {
    return _utilFilter2['default'][suggest](ctx._dataText(item).toLowerCase(), word.toLowerCase());
  } : function (item) {
    return suggest(item, word);
  };
}

var UncontrolledComboBox = (0, _uncontrollable2['default'])(ComboBox, { open: 'onToggle', value: 'onChange' });

UncontrolledComboBox.BaseComboBox = ComboBox;

exports['default'] = UncontrolledComboBox;
module.exports = exports['default'];