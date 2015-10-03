'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _reactLibGetActiveElement = require('react/lib/getActiveElement');

var _reactLibGetActiveElement2 = babelHelpers.interopRequireDefault(_reactLibGetActiveElement);

var _domHelpersQueryContains = require('dom-helpers/query/contains');

var _domHelpersQueryContains2 = babelHelpers.interopRequireDefault(_domHelpersQueryContains);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _Popup = require('./Popup');

var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

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

  data: _react2['default'].PropTypes.array,
  valueField: _react2['default'].PropTypes.string,
  textField: _utilPropTypes2['default'].accessor,

  valueComponent: _utilPropTypes2['default'].elementType,
  itemComponent: _utilPropTypes2['default'].elementType,
  listComponent: _utilPropTypes2['default'].elementType,

  groupComponent: _utilPropTypes2['default'].elementType,
  groupBy: _utilPropTypes2['default'].accessor,

  onSelect: _react2['default'].PropTypes.func,

  searchTerm: _react2['default'].PropTypes.string,
  onSearch: _react2['default'].PropTypes.func,

  busy: _react2['default'].PropTypes.bool,

  delay: _react2['default'].PropTypes.number,

  dropUp: _react2['default'].PropTypes.bool,
  duration: _react2['default'].PropTypes.number, //popup

  disabled: _utilPropTypes2['default'].disabled,

  readOnly: _utilPropTypes2['default'].readOnly,

  messages: _react2['default'].PropTypes.shape({
    open: _utilPropTypes2['default'].message,
    emptyList: _utilPropTypes2['default'].message,
    emptyFilter: _utilPropTypes2['default'].message,
    filterPlaceholder: _utilPropTypes2['default'].message
  })
};

var DropdownList = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
  key: 'displayName',
  initializer: function initializer() {
    return 'DropdownList';
  }
}, {
  key: 'mixins',
  initializer: function initializer() {
    return [require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/DataFilterMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')()];
  }
}, {
  key: 'propTypes',
  initializer: function initializer() {
    return propTypes;
  }
}, {
  key: 'getDefaultProps',
  value: function getDefaultProps() {
    return {
      delay: 500,
      value: '',
      open: false,
      data: [],
      searchTerm: '',
      messages: msgs(),
      ariaActiveDescendantKey: 'dropdownlist'
    };
  }
}, {
  key: 'getInitialState',
  value: function getInitialState() {
    var _props = this.props;
    var open = _props.open;
    var filter = _props.filter;
    var value = _props.value;
    var data = _props.data;
    var searchTerm = _props.searchTerm;
    var valueField = _props.valueField;

    var processed = filter ? this.filter(data, searchTerm) : data,
        initialIdx = _utilDataHelpers.dataIndexOf(data, value, valueField);

    return {
      filteredData: open && filter ? processed : null,
      selectedItem: processed[initialIdx],
      focusedItem: processed[initialIdx] || data[0]
    };
  }
}, {
  key: 'componentDidUpdate',
  value: function componentDidUpdate() {
    this.refs.list && _utilValidateListInterface2['default'](this.refs.list);
  }
}, {
  key: 'componentWillReceiveProps',
  value: function componentWillReceiveProps(props) {
    var open = props.open;
    var filter = props.filter;
    var value = props.value;
    var data = props.data;
    var searchTerm = props.searchTerm;
    var valueField = props.valueField;

    var processed = filter ? this.filter(data, searchTerm) : data,
        idx = _utilDataHelpers.dataIndexOf(data, value, valueField);

    this.setState({
      filteredData: open && filter ? processed : null,
      selectedItem: processed[idx],
      focusedItem: processed[! ~idx ? 0 : idx]
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
    var disabled = _props2.disabled;
    var readOnly = _props2.readOnly;
    var ValueComponent = _props2.valueComponent;
    var List = _props2.listComponent;

    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

    var elementProps = omit(this.props, Object.keys(propTypes));
    var listProps = pick(this.props, Object.keys(_utilCompat2['default'].type(List).propTypes));
    var popupProps = pick(this.props, Object.keys(_utilCompat2['default'].type(_Popup2['default']).propTypes));

    var _state = this.state;
    var focusedItem = _state.focusedItem;
    var selectedItem = _state.selectedItem;
    var focused = _state.focused;

    var items = this._data(),
        valueItem = _utilDataHelpers.dataItem(data, value, valueField),
        // take value from the raw data
    listID = _utilWidgetHelpers.instanceId(this, '__listbox');

    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open;

    messages = msgs(messages);

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, elementProps, {
        ref: 'input',
        role: 'combobox',
        tabIndex: tabIndex || '0',
        'aria-expanded': open,
        'aria-haspopup': true,
        'aria-owns': listID,
        'aria-busy': !!busy,
        'aria-live': !open && 'polite',
        //aria-activedescendant={activeID}
        'aria-autocomplete': 'list',
        'aria-disabled': disabled,
        'aria-readonly': readOnly,
        onKeyDown: this._keyDown,
        onClick: this._click,
        onFocus: this._focus.bind(null, true),
        onBlur: this._focus.bind(null, false),
        className: _classnames2['default'](className, 'rw-dropdownlist', 'rw-widget', (_cx = {
          'rw-state-disabled': disabled,
          'rw-state-readonly': readOnly,
          'rw-state-focus': focused,
          'rw-rtl': this.isRtl()

        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
      _react2['default'].createElement(
        'span',
        { className: 'rw-dropdownlist-picker rw-select rw-btn' },
        _react2['default'].createElement(
          'i',
          { className: 'rw-i rw-i-caret-down' + (busy ? ' rw-loading' : '') },
          _react2['default'].createElement(
            'span',
            { className: 'rw-sr' },
            result(messages.open, this.props)
          )
        )
      ),
      _react2['default'].createElement(
        'div',
        {
          className: 'rw-input'
        },
        !valueItem && placeholder ? _react2['default'].createElement(
          'span',
          { className: 'rw-placeholder' },
          placeholder
        ) : this.props.valueComponent ? _react2['default'].createElement(ValueComponent, { item: valueItem }) : _utilDataHelpers.dataText(valueItem, textField)
      ),
      _react2['default'].createElement(
        _Popup2['default'],
        babelHelpers._extends({}, popupProps, {
          onOpen: function () {
            return _this.focus();
          },
          onOpening: function () {
            return _this.refs.list.forceUpdate();
          },
          onRequestClose: this.close
        }),
        _react2['default'].createElement(
          'div',
          null,
          filter && this._renderFilter(messages),
          shouldRenderList && _react2['default'].createElement(List, babelHelpers._extends({ ref: 'list'
          }, listProps, {
            data: items,
            id: listID,
            'aria-live': open && 'polite',
            'aria-labelledby': _utilWidgetHelpers.instanceId(this),
            'aria-hidden': !this.props.open,
            selected: selectedItem,
            focused: open ? focusedItem : null,
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
  key: '_renderFilter',
  value: function _renderFilter(messages) {
    var _this2 = this;

    return _react2['default'].createElement(
      'div',
      { ref: 'filterWrapper', className: 'rw-filter-input' },
      _react2['default'].createElement(
        'span',
        { className: 'rw-select rw-btn' },
        _react2['default'].createElement('i', { className: 'rw-i rw-i-search' })
      ),
      _react2['default'].createElement('input', { ref: 'filter', className: 'rw-input',
        placeholder: _util_2['default'].result(messages.filterPlaceholder, this.props),
        value: this.props.searchTerm,
        onChange: function (e) {
          return _utilWidgetHelpers.notify(_this2.props.onSearch, e.target.value);
        } })
    );
  }
}, {
  key: '_focus',
  decorators: [_utilInteraction.widgetEnabled],
  value: function _focus(focused, e) {
    var _this3 = this;

    this.setTimeout('focus', function () {
      if (!focused) _this3.close();

      if (focused !== _this3.state.focused) {
        _utilWidgetHelpers.notify(_this3.props[focused ? 'onFocus' : 'onBlur'], e);
        _this3.setState({ focused: focused });
      }
    });
  }
}, {
  key: '_onSelect',
  decorators: [_utilInteraction.widgetEditable],
  value: function _onSelect(data) {
    this.close();
    _utilWidgetHelpers.notify(this.props.onSelect, data);
    this.change(data);
    this.focus(this);
  }
}, {
  key: '_click',
  decorators: [_utilInteraction.widgetEditable],
  value: function _click(e) {
    var wrapper = this.refs.filterWrapper;

    if (!this.props.filter || !this.props.open) this.toggle();else if (!_domHelpersQueryContains2['default'](_utilCompat2['default'].findDOMNode(wrapper), e.target)) this.close();

    _utilWidgetHelpers.notify(this.props.onClick, e);
  }
}, {
  key: '_keyDown',
  decorators: [_utilInteraction.widgetEditable],
  value: function _keyDown(e) {
    var _this4 = this;

    var self = this,
        key = e.key,
        alt = e.altKey,
        list = this.refs.list,
        filtering = this.props.filter,
        focusedItem = this.state.focusedItem,
        selectedItem = this.state.selectedItem,
        isOpen = this.props.open,
        closeWithFocus = function closeWithFocus() {
      _this4.close(), _utilCompat2['default'].findDOMNode(_this4).focus();
    };

    if (key === 'End') {
      if (isOpen) this.setState({ focusedItem: list.last() });else change(list.last());
      e.preventDefault();
    } else if (key === 'Home') {
      if (isOpen) this.setState({ focusedItem: list.first() });else change(list.first());
      e.preventDefault();
    } else if (key === 'Escape' && isOpen) {
      closeWithFocus();
    } else if ((key === 'Enter' || key === ' ' && !filtering) && isOpen) {
      change(this.state.focusedItem, true);
    } else if (key === 'ArrowDown') {
      if (alt) this.open();else if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else change(list.next(selectedItem));
      e.preventDefault();
    } else if (key === 'ArrowUp') {
      if (alt) closeWithFocus();else if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else change(list.prev(selectedItem));
      e.preventDefault();
    } else if (!(this.props.filter && isOpen)) this.search(String.fromCharCode(e.keyCode), function (item) {
      isOpen ? _this4.setState({ focusedItem: item }) : change(item);
    });

    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

    function change(item, fromList) {
      if (!item) return;
      fromList ? self._onSelect(item) : self.change(item);
    }
  }
}, {
  key: 'change',
  value: function change(data) {
    if (!_util_2['default'].isShallowEqual(data, this.props.value)) {
      _utilWidgetHelpers.notify(this.props.onChange, data);
      _utilWidgetHelpers.notify(this.props.onSearch, '');
      this.close();
    }
  }
}, {
  key: 'focus',
  value: function focus(target) {
    var inst = target || (this.props.filter && this.props.open ? this.refs.filter : this.refs.input);

    if (_reactLibGetActiveElement2['default']() !== _utilCompat2['default'].findDOMNode(inst)) _utilCompat2['default'].findDOMNode(inst).focus();
  }
}, {
  key: '_data',
  value: function _data() {
    return this.state.filteredData || this.props.data.concat();
  }
}, {
  key: 'search',
  value: function search(character, cb) {
    var _this5 = this;

    var word = ((this._searchTerm || '') + character).toLowerCase();

    this._searchTerm = word;

    this.setTimeout('search', function () {
      var list = _this5.refs.list,
          key = _this5.props.open ? 'focusedItem' : 'selectedItem',
          item = list.next(_this5.state[key], word);

      _this5._searchTerm = '';
      if (item) cb(item);
    }, this.props.delay);
  }
}, {
  key: 'open',
  value: function open() {
    _utilWidgetHelpers.notify(this.props.onToggle, true);
  }
}, {
  key: 'close',
  value: function close() {
    _utilWidgetHelpers.notify(this.props.onToggle, false);
  }
}, {
  key: 'toggle',
  value: function toggle() {
    this.props.open ? this.close() : this.open();
  }
}]));

function msgs(msgs) {
  return babelHelpers._extends({
    open: 'open dropdown',
    filterPlaceholder: '',
    emptyList: 'There are no items in this list',
    emptyFilter: 'The filter returned no results'
  }, msgs);
}

module.exports = _uncontrollable2['default'](DropdownList, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' });

module.exports.BaseDropdownList = DropdownList;