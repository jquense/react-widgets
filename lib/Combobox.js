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

var _utilDataHelpers = require('./util/dataHelpers');

var _utilInteraction = require('./util/interaction');

var _utilWidgetHelpers = require('./util/widgetHelpers');

var defaultSuggest = function defaultSuggest(f) {
  return f === true ? 'startsWith' : f ? f : 'eq';
};

var omit = _util_2['default'].omit;
var pick = _util_2['default'].pick;

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

  autoFocus: _react2['default'].PropTypes.bool,
  disabled: _utilPropTypes2['default'].disabled.acceptsArray,
  readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

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

var ComboBox = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
  key: 'displayName',
  initializer: function initializer() {
    return 'ComboBox';
  }
}, {
  key: 'mixins',
  initializer: function initializer() {
    return [require('./mixins/TimeoutMixin'), require('./mixins/DataFilterMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')('input'), require('./mixins/FocusMixin')({
      willHandle: function willHandle(focused) {
        // not suggesting anymore
        !focused && this.refs.input.accept();
      },
      didHandle: function didHandle(focused) {
        if (!focused) this.close();
      }
    })];
  }
}, {
  key: 'propTypes',
  initializer: function initializer() {
    return propTypes;
  }
}, {
  key: 'getInitialState',
  value: function getInitialState() {
    var _props = this.props;
    var value = _props.value;
    var data = _props.data;
    var valueField = _props.valueField;
    var items = this.process(data, value);
    var idx = _utilDataHelpers.dataIndexOf(items, value, valueField);

    return {
      selectedItem: items[idx],
      focusedItem: items[! ~idx ? 0 : idx],
      processedData: items,
      open: false
    };
  }
}, {
  key: 'getDefaultProps',
  value: function getDefaultProps() {
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
  }
}, {
  key: 'componentDidUpdate',
  value: function componentDidUpdate() {
    this.refs.list && _utilValidateListInterface2['default'](this.refs.list);
  }
}, {
  key: 'shouldComponentUpdate',
  value: function shouldComponentUpdate(nextProps, nextState) {
    var isSuggesting = this.refs.input && this.refs.input.isSuggesting(),
        stateChanged = !_util_2['default'].isShallowEqual(nextState, this.state),
        valueChanged = !_util_2['default'].isShallowEqual(nextProps, this.props);

    return isSuggesting || stateChanged || valueChanged;
  }
}, {
  key: 'componentWillReceiveProps',
  value: function componentWillReceiveProps(nextProps) {
    var value = nextProps.value;
    var data = nextProps.data;
    var valueField = nextProps.valueField;
    var textField = nextProps.textField;

    var rawIdx = _utilDataHelpers.dataIndexOf(data, value, valueField),
        valueItem = rawIdx === -1 ? nextProps.value : nextProps.data[rawIdx],
        isSuggesting = this.refs.input.isSuggesting(),
        items = this.process(nextProps.data, nextProps.value, (rawIdx === -1 || isSuggesting) && _utilDataHelpers.dataText(valueItem, textField)),
        idx = _utilDataHelpers.dataIndexOf(items, value, valueField),
        focused = this.filterIndexOf(items, _utilDataHelpers.dataText(valueItem, textField));

    this._searchTerm = '';

    this.setState({
      processedData: items,
      selectedItem: items[idx],
      focusedItem: items[idx === -1 ? focused !== -1 ? focused : 0 // focus the closest match
      : idx]
    });
  }
}, {
  key: 'render',
  value: function render() {
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

    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

    var elementProps = omit(this.props, Object.keys(propTypes));
    var listProps = pick(this.props, Object.keys(List.propTypes));
    var popupProps = pick(this.props, Object.keys(_Popup2['default'].propTypes));

    var _state = this.state;
    var focusedItem = _state.focusedItem;
    var selectedItem = _state.selectedItem;
    var focused = _state.focused;

    var items = this._data(),
        disabled = _utilInteraction.isDisabled(this.props),
        readOnly = _utilInteraction.isReadOnly(this.props),
        valueItem = _utilDataHelpers.dataItem(data, value, valueField),
        // take value from the raw data
    inputID = _utilWidgetHelpers.instanceId(this, '_input'),
        listID = _utilWidgetHelpers.instanceId(this, '_listbox'),
        completeType = suggest ? filter ? 'both' : 'inline' : filter ? 'list' : '';

    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open;

    messages = msgs(messages);

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, elementProps, {
        ref: 'element',
        onKeyDown: this._keyDown,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        tabIndex: '-1',
        className: _classnames2['default'](className, 'rw-combobox', 'rw-widget', (_cx = {
          'rw-state-focus': focused,
          'rw-state-disabled': disabled,
          'rw-state-readonly': readOnly,
          'rw-rtl': this.isRtl()

        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
      }),
      _react2['default'].createElement(
        _WidgetButton2['default'],
        {
          tabIndex: '-1',
          className: 'rw-select',
          onClick: this.toggle,
          disabled: !!(disabled || readOnly)
        },
        _react2['default'].createElement(
          'i',
          { className: _classnames2['default']('rw-i rw-i-caret-down', { 'rw-loading': busy }) },
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
        value: _utilDataHelpers.dataText(valueItem, textField),
        onChange: this._inputTyping,
        onKeyDown: this._inputKeyDown
      }),
      _react2['default'].createElement(
        _Popup2['default'],
        babelHelpers._extends({}, popupProps, {
          onOpening: function () {
            return _this.refs.list.forceUpdate();
          }
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
  }
}, {
  key: '_onSelect',
  decorators: [_utilInteraction.widgetEditable],
  value: function _onSelect(data) {
    this.close();
    _utilWidgetHelpers.notify(this.props.onSelect, data);
    this.change(data);
    this.focus();
  }
}, {
  key: '_inputKeyDown',
  value: function _inputKeyDown(e) {
    this._deleting = e.key === 'Backspace' || e.key === 'Delete';
    this._isTyping = true;
  }
}, {
  key: '_inputTyping',
  value: function _inputTyping(e) {
    var _props3 = this.props;
    var data = _props3.data;
    var textField = _props3.textField;

    var shouldSuggest = !!this.props.suggest,
        strVal = e.target.value,
        suggestion;

    suggestion = this._deleting || !shouldSuggest ? strVal : this.suggest(this._data(), strVal);

    suggestion = suggestion || strVal;

    data = _util_2['default'].find(data, function (item) {
      return _utilDataHelpers.dataText(item, textField).toLowerCase() === suggestion.toLowerCase();
    });

    this.change(!this._deleting && data ? data : strVal, true);

    this.open();
  }
}, {
  key: 'focus',
  value: function focus() {
    this.refs.input.focus();
  }
}, {
  key: '_keyDown',
  decorators: [_utilInteraction.widgetEditable],
  value: function _keyDown(e) {
    var self = this,
        key = e.key,
        alt = e.altKey,
        list = this.refs.list,
        focusedItem = this.state.focusedItem,
        selectedItem = this.state.selectedItem,
        isOpen = this.props.open;

    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (key === 'End') if (isOpen) this.setState({ focusedItem: list.last() });else select(list.last(), true);else if (key === 'Home') if (isOpen) this.setState({ focusedItem: list.first() });else select(list.first(), true);else if (key === 'Escape' && isOpen) this.close();else if (key === 'Enter' && isOpen) {
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
      if (!item) return self.change(_utilCompat2['default'].findDOMNode(self.refs.input).value, false);

      self.refs.input.accept(true); //removes caret

      if (fromList) return self._onSelect(item);

      self.change(item, false);
    }
  }
}, {
  key: 'change',
  value: function change(data, typing) {
    this._typedChange = !!typing;
    _utilWidgetHelpers.notify(this.props.onChange, data);
  }
}, {
  key: 'open',
  value: function open() {
    if (!this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, true);
  }
}, {
  key: 'close',
  value: function close() {
    if (this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, false);
  }
}, {
  key: 'toggle',
  decorators: [_utilInteraction.widgetEditable],
  value: function toggle() {
    this.focus();

    this.props.open ? this.close() : this.open();
  }
}, {
  key: 'suggest',
  value: function suggest(data, value) {
    var _props4 = this.props;
    var textField = _props4.textField;
    var suggest = _props4.suggest;
    var minLength = _props4.minLength;

    var word = _utilDataHelpers.dataText(value, textField),
        suggestion;

    suggest = defaultSuggest(suggest);

    if (!(word || '').trim() || word.length < (minLength || 1)) return '';

    suggestion = typeof value === 'string' ? _util_2['default'].find(data, getFilter(suggest, word, textField)) : value;

    if (suggestion && (!this.state || !this.state.deleting)) return _utilDataHelpers.dataText(suggestion, textField);

    return '';
  }
}, {
  key: '_data',
  value: function _data() {
    return this.state.processedData;
  }
}, {
  key: 'process',
  value: function process(data, values, searchTerm) {
    if (this.props.filter && searchTerm) data = this.filter(data, searchTerm);

    return data;
  }
}]));

exports['default'] = _uncontrollable2['default'](ComboBox, { open: 'onToggle', value: 'onChange' });

function msgs(msgs) {
  return babelHelpers._extends({
    open: 'open combobox',
    emptyList: 'There are no items in this list',
    emptyFilter: 'The filter returned no results'
  }, msgs);
}

function getFilter(suggest, word, textField) {
  return typeof suggest === 'string' ? function (item) {
    return _utilFilter2['default'][suggest](_utilDataHelpers.dataText(item, textField).toLowerCase(), word.toLowerCase());
  } : function (item) {
    return suggest(item, word);
  };
}
module.exports = exports['default'];