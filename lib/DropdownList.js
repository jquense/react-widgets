'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _obj;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _activeElement = require('dom-helpers/activeElement');

var _activeElement2 = _interopRequireDefault(_activeElement);

var _contains = require('dom-helpers/query/contains');

var _contains2 = _interopRequireDefault(_contains);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

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

var omit = _3.default.omit;
var pick = _3.default.pick;
var result = _3.default.result;


var propTypes = {
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
  duration: _react2.default.PropTypes.number, //popup

  disabled: _propTypes2.default.disabled.acceptsArray,
  readOnly: _propTypes2.default.readOnly.acceptsArray,

  messages: _react2.default.PropTypes.shape({
    open: _propTypes2.default.message,
    emptyList: _propTypes2.default.message,
    emptyFilter: _propTypes2.default.message,
    filterPlaceholder: _propTypes2.default.message
  })
};

var DropdownList = _react2.default.createClass((_obj = {

  displayName: 'DropdownList',

  mixins: [require('./mixins/TimeoutMixin'), require('./mixins/PureRenderMixin'), require('./mixins/DataFilterMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')(), require('./mixins/FocusMixin')({
    didHandle: function didHandle(focused) {
      if (!focused) this.close();
    }
  })],

  propTypes: propTypes,

  getDefaultProps: function getDefaultProps() {
    return {
      delay: 500,
      value: '',
      open: false,
      data: [],
      searchTerm: '',
      messages: msgs(),
      ariaActiveDescendantKey: 'dropdownlist'
    };
  },
  getInitialState: function getInitialState() {
    var _props = this.props;
    var open = _props.open;
    var filter = _props.filter;
    var value = _props.value;
    var data = _props.data;
    var searchTerm = _props.searchTerm;
    var valueField = _props.valueField;


    var processed = filter ? this.filter(data, searchTerm) : data,
        initialIdx = (0, _dataHelpers.dataIndexOf)(data, value, valueField);

    return {
      filteredData: open && filter ? processed : null,
      selectedItem: processed[initialIdx],
      focusedItem: processed[initialIdx] || data[0]
    };
  },
  componentDidUpdate: function componentDidUpdate() {
    this.refs.list && (0, _validateListInterface2.default)(this.refs.list);
  },
  componentWillReceiveProps: function componentWillReceiveProps(props) {
    var open = props.open;
    var filter = props.filter;
    var value = props.value;
    var data = props.data;
    var searchTerm = props.searchTerm;
    var valueField = props.valueField;


    var processed = filter ? this.filter(data, searchTerm) : data,
        idx = (0, _dataHelpers.dataIndexOf)(data, value, valueField);

    this.setState({
      filteredData: open && filter ? processed : null,
      selectedItem: processed[idx],
      focusedItem: processed[! ~idx ? 0 : idx]
    });
  },
  render: function render() {
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
    var ValueComponent = _props2.valueComponent;
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
        listID = (0, _widgetHelpers.instanceId)(this, '__listbox');

    var shouldRenderList = (0, _widgetHelpers.isFirstFocusedRender)(this) || open;

    messages = msgs(messages);

    return _react2.default.createElement(
      'div',
      _extends({}, elementProps, {
        ref: 'input',
        role: 'combobox',
        tabIndex: tabIndex || '0',
        'aria-expanded': open,
        'aria-haspopup': true,
        'aria-owns': listID,
        'aria-busy': !!busy,
        'aria-live': !open && 'polite',
        'aria-autocomplete': 'list',
        'aria-disabled': disabled,
        'aria-readonly': readOnly,
        onKeyDown: this._keyDown,
        onKeyPress: this._keyPress,
        onClick: this._click,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        className: (0, _classnames2.default)(className, 'rw-dropdownlist', 'rw-widget', (_cx = {
          'rw-state-disabled': disabled,
          'rw-state-readonly': readOnly,
          'rw-state-focus': focused,
          'rw-rtl': this.isRtl()

        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
      _react2.default.createElement(
        'span',
        { className: 'rw-dropdownlist-picker rw-select rw-btn' },
        _react2.default.createElement(
          'i',
          { className: 'rw-i rw-i-caret-down' + (busy ? ' rw-loading' : '') },
          _react2.default.createElement(
            'span',
            { className: 'rw-sr' },
            result(messages.open, this.props)
          )
        )
      ),
      _react2.default.createElement(
        'div',
        {
          className: 'rw-input'
        },
        !valueItem && placeholder ? _react2.default.createElement(
          'span',
          { className: 'rw-placeholder' },
          placeholder
        ) : this.props.valueComponent ? _react2.default.createElement(ValueComponent, { item: valueItem }) : (0, _dataHelpers.dataText)(valueItem, textField)
      ),
      _react2.default.createElement(
        _Popup2.default,
        _extends({}, popupProps, {
          onOpen: function onOpen() {
            return _this.focus();
          },
          onOpening: function onOpening() {
            return _this.refs.list.forceUpdate();
          }
        }),
        _react2.default.createElement(
          'div',
          null,
          filter && this._renderFilter(messages),
          shouldRenderList && _react2.default.createElement(List, _extends({ ref: 'list'
          }, listProps, {
            data: items,
            id: listID,
            'aria-live': open && 'polite',
            'aria-labelledby': (0, _widgetHelpers.instanceId)(this),
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
  },
  _renderFilter: function _renderFilter(messages) {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      { ref: 'filterWrapper', className: 'rw-filter-input' },
      _react2.default.createElement(
        'span',
        { className: 'rw-select rw-btn' },
        _react2.default.createElement('i', { className: 'rw-i rw-i-search' })
      ),
      _react2.default.createElement('input', { ref: 'filter', className: 'rw-input',
        autoComplete: 'off',
        placeholder: _3.default.result(messages.filterPlaceholder, this.props),
        value: this.props.searchTerm,
        onChange: function onChange(e) {
          return (0, _widgetHelpers.notify)(_this2.props.onSearch, e.target.value);
        } })
    );
  },
  _onSelect: function _onSelect(data) {
    this.close();
    (0, _widgetHelpers.notify)(this.props.onSelect, data);
    this.change(data);
    this.focus(this);
  },
  _click: function _click(e) {
    var wrapper = this.refs.filterWrapper;

    if (!this.props.filter || !this.props.open) this.toggle();else if (!(0, _contains2.default)(_compat2.default.findDOMNode(wrapper), e.target)) this.close();

    (0, _widgetHelpers.notify)(this.props.onClick, e);
  },
  _keyDown: function _keyDown(e) {
    var _this3 = this;

    var self = this,
        key = e.key,
        alt = e.altKey,
        list = this.refs.list,
        filtering = this.props.filter,
        focusedItem = this.state.focusedItem,
        selectedItem = this.state.selectedItem,
        isOpen = this.props.open,
        closeWithFocus = function closeWithFocus() {
      _this3.close(), _compat2.default.findDOMNode(_this3).focus();
    };

    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (key === 'End') {
      if (isOpen) this.setState({ focusedItem: list.last() });else change(list.last());
      e.preventDefault();
    } else if (key === 'Home') {
      if (isOpen) this.setState({ focusedItem: list.first() });else change(list.first());
      e.preventDefault();
    } else if (key === 'Escape' && isOpen) {
      e.preventDefault();
      closeWithFocus();
    } else if ((key === 'Enter' || key === ' ' && !filtering) && isOpen) {
      e.preventDefault();
      change(this.state.focusedItem, true);
    } else if (key === ' ' && !filtering && !isOpen) {
      e.preventDefault();
      this.open();
    } else if (key === 'ArrowDown') {
      if (alt) this.open();else if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else change(list.next(selectedItem));
      e.preventDefault();
    } else if (key === 'ArrowUp') {
      if (alt) closeWithFocus();else if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else change(list.prev(selectedItem));
      e.preventDefault();
    }

    function change(item, fromList) {
      if (!item) return;
      fromList ? self._onSelect(item) : self.change(item);
    }
  },
  _keyPress: function _keyPress(e) {
    var _this4 = this;

    (0, _widgetHelpers.notify)(this.props.onKeyPress, [e]);

    if (e.defaultPrevented) return;

    if (!(this.props.filter && this.props.open)) this.search(String.fromCharCode(e.which), function (item) {
      _this4.isMounted() && _this4.props.open ? _this4.setState({ focusedItem: item }) : item && _this4.change(item);
    });
  },
  change: function change(data) {
    if (!(0, _dataHelpers.valueMatcher)(data, this.props.value, this.props.valueField)) {
      (0, _widgetHelpers.notify)(this.props.onChange, data);
      (0, _widgetHelpers.notify)(this.props.onSearch, '');
      this.close();
    }
  },
  focus: function focus(target) {
    var inst = target || (this.props.filter && this.props.open ? this.refs.filter : this.refs.input);

    if ((0, _activeElement2.default)() !== _compat2.default.findDOMNode(inst)) _compat2.default.findDOMNode(inst).focus();
  },
  _data: function _data() {
    return this.state.filteredData || this.props.data.concat();
  },
  search: function search(character, cb) {
    var _this5 = this;

    var word = ((this._searchTerm || '') + character).toLowerCase();

    if (!character) return;

    this._searchTerm = word;

    this.setTimeout('search', function () {
      var list = _this5.refs.list,
          key = _this5.props.open ? 'focusedItem' : 'selectedItem',
          item = list.next(_this5.state[key], word);

      _this5._searchTerm = '';
      if (item) cb(item);
    }, this.props.delay);
  },
  open: function open() {
    (0, _widgetHelpers.notify)(this.props.onToggle, true);
  },
  close: function close() {
    (0, _widgetHelpers.notify)(this.props.onToggle, false);
  },
  toggle: function toggle() {
    this.props.open ? this.close() : this.open();
  }
}, (_applyDecoratedDescriptor(_obj, '_onSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_onSelect'), _obj), _applyDecoratedDescriptor(_obj, '_click', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_click'), _obj), _applyDecoratedDescriptor(_obj, '_keyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_keyDown'), _obj), _applyDecoratedDescriptor(_obj, '_keyPress', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_keyPress'), _obj)), _obj));

function msgs(msgs) {
  return _extends({
    open: 'open dropdown',
    filterPlaceholder: '',
    emptyList: 'There are no items in this list',
    emptyFilter: 'The filter returned no results'
  }, msgs);
}

exports.default = (0, _uncontrollable2.default)(DropdownList, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }, ['focus']);
module.exports = exports['default'];