'use strict';

exports.__esModule = true;

var _desc, _value, _obj;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _activeElement = require('dom-helpers/activeElement');

var _activeElement2 = _interopRequireDefault(_activeElement);

var _contains = require('dom-helpers/query/contains');

var _contains2 = _interopRequireDefault(_contains);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _DropdownListInput = require('./DropdownListInput');

var _DropdownListInput2 = _interopRequireDefault(_DropdownListInput);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

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

var result = _3.default.result;


var propTypes = _extends({}, _Popup2.default.propTypes, {

  //-- controlled props -----------
  value: _propTypes2.default.any,
  onChange: _propTypes2.default.func,
  open: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func,
  //------------------------------------

  data: _propTypes2.default.array,
  valueField: _propTypes2.default.string,
  textField: _propTypes4.default.accessor,

  valueComponent: _propTypes4.default.elementType,
  itemComponent: _propTypes4.default.elementType,
  listComponent: _propTypes4.default.elementType,

  groupComponent: _propTypes4.default.elementType,
  groupBy: _propTypes4.default.accessor,

  onSelect: _propTypes2.default.func,
  searchTerm: _propTypes2.default.string,
  onSearch: _propTypes2.default.func,
  busy: _propTypes2.default.bool,
  delay: _propTypes2.default.number,
  dropUp: _propTypes2.default.bool,
  duration: _propTypes2.default.number, //popup

  disabled: _propTypes4.default.disabled.acceptsArray,
  readOnly: _propTypes4.default.readOnly.acceptsArray,

  messages: _propTypes2.default.shape({
    open: _propTypes4.default.message,
    emptyList: _propTypes4.default.message,
    emptyFilter: _propTypes4.default.message,
    filterPlaceholder: _propTypes4.default.message
  })
});

var DropdownList = _react2.default.createClass((_obj = {

  displayName: 'DropdownList',

  mixins: [require('./mixins/TimeoutMixin'), require('./mixins/AutoFocusMixin'), require('./mixins/PureRenderMixin'), require('./mixins/DataFilterMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')(), require('./mixins/FocusMixin')({
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
    var _props = this.props,
        open = _props.open,
        filter = _props.filter,
        value = _props.value,
        data = _props.data,
        searchTerm = _props.searchTerm,
        valueField = _props.valueField;


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
    var open = props.open,
        filter = props.filter,
        value = props.value,
        data = props.data,
        searchTerm = props.searchTerm,
        valueField = props.valueField;


    var processed = filter ? this.filter(data, searchTerm) : data,
        idx = (0, _dataHelpers.dataIndexOf)(data, value, valueField);

    this.setState({
      filteredData: open && filter ? processed : null,
      selectedItem: processed[idx],
      focusedItem: processed[!~idx ? 0 : idx]
    });
  },
  renderFilter: function renderFilter(messages) {
    var _this = this;

    return _react2.default.createElement(
      'div',
      { ref: 'filterWrapper', className: 'rw-filter-input' },
      _react2.default.createElement(_Select2.default, { component: 'span', icon: 'search' }),
      _react2.default.createElement(_Input2.default, {
        ref: 'filter',
        value: this.props.searchTerm,
        placeholder: _3.default.result(messages.filterPlaceholder, this.props),
        onChange: function onChange(e) {
          return (0, _widgetHelpers.notify)(_this.props.onSearch, e.target.value);
        }
      })
    );
  },
  renderList: function renderList(List, id, messages) {
    var _props2 = this.props,
        open = _props2.open,
        filter = _props2.filter,
        data = _props2.data;
    var _state = this.state,
        selectedItem = _state.selectedItem,
        focusedItem = _state.focusedItem;


    var listProps = _3.default.pickProps(this.props, List);
    var items = this._data();

    return _react2.default.createElement(
      'div',
      null,
      filter && this.renderFilter(messages),
      _react2.default.createElement(List, _extends({}, listProps, {
        ref: 'list',
        id: id,
        data: items,
        'aria-live': open && 'polite',
        'aria-labelledby': (0, _widgetHelpers.instanceId)(this),
        'aria-hidden': !this.props.open,
        selected: selectedItem,
        focused: open ? focusedItem : null,
        onSelect: this.handleSelect,
        onMove: this._scrollTo,
        messages: {
          emptyList: data.length ? messages.emptyFilter : messages.emptyList
        } }))
    );
  },
  render: function render() {
    var _this2 = this;

    var _props3 = this.props,
        className = _props3.className,
        tabIndex = _props3.tabIndex,
        duration = _props3.duration,
        valueField = _props3.valueField,
        textField = _props3.textField,
        groupBy = _props3.groupBy,
        messages = _props3.messages,
        data = _props3.data,
        busy = _props3.busy,
        dropUp = _props3.dropUp,
        placeholder = _props3.placeholder,
        value = _props3.value,
        open = _props3.open,
        valueComponent = _props3.valueComponent,
        List = _props3.listComponent;


    List = List || groupBy && _ListGroupable2.default || _List2.default;

    var focused = this.state.focused;


    var disabled = (0, _interaction.isDisabled)(this.props),
        readOnly = (0, _interaction.isReadOnly)(this.props),
        valueItem = (0, _dataHelpers.dataItem)(data, value, valueField) // take value from the raw data
    ,
        listID = (0, _widgetHelpers.instanceId)(this, '__listbox');

    var elementProps = _extends(_3.default.omitOwnProps(this, List), {
      role: 'combobox',
      tabIndex: tabIndex || 0,
      'aria-owns': listID,
      'aria-expanded': !!open,
      'aria-haspopup': true,
      'aria-busy': !!busy,
      'aria-live': !open && 'polite',
      'aria-autocomplete': 'list',
      'aria-disabled': disabled,
      'aria-readonly': readOnly
    });

    var shouldRenderPopup = open || (0, _widgetHelpers.isFirstFocusedRender)(this);

    messages = msgs(messages);

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        ref: 'input',
        className: (0, _classnames2.default)(className, 'rw-dropdownlist'),
        open: open,
        dropUp: dropUp,
        focused: focused,
        disabled: disabled,
        readOnly: readOnly,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        onKeyPress: this.handleKeyPress
      }),
      _react2.default.createElement(_Select2.default, {
        busy: busy,
        icon: 'caret-down',
        component: 'span',
        className: 'rw-dropdownlist-picker',
        label: result(messages.open, this.props)
      }),
      _react2.default.createElement(_DropdownListInput2.default, {
        value: valueItem,
        textField: textField,
        placeholder: placeholder,
        valueComponent: valueComponent
      }),
      shouldRenderPopup && _react2.default.createElement(
        _Popup2.default,
        {
          open: open,
          dropUp: dropUp,
          duration: duration,
          onOpen: function onOpen() {
            return _this2.focus();
          },
          onOpening: function onOpening() {
            return _this2.refs.list.forceUpdate();
          }
        },
        this.renderList(List, listID, messages)
      )
    );
  },
  handleSelect: function handleSelect(data) {
    this.close();
    (0, _widgetHelpers.notify)(this.props.onSelect, data);
    this.change(data);
    this.focus(this);
  },
  handleClick: function handleClick(e) {
    var wrapper = this.refs.filterWrapper;

    if (!this.props.filter || !this.props.open) this.toggle();else if (!(0, _contains2.default)(_compat2.default.findDOMNode(wrapper), e.target)) this.close();

    (0, _widgetHelpers.notify)(this.props.onClick, e);
  },
  handleKeyDown: function handleKeyDown(e) {
    var _this3 = this;

    var key = e.key,
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

    var change = function change(item, fromList) {
      if (item == null) return;
      fromList ? _this3.handleSelect(item) : _this3.change(item);
    };

    if (e.defaultPrevented) return;

    if (key === 'End') {
      e.preventDefault();

      if (isOpen) this.setState({ focusedItem: list.last() });else change(list.last());
    } else if (key === 'Home') {
      e.preventDefault();

      if (isOpen) this.setState({ focusedItem: list.first() });else change(list.first());
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
  },
  handleKeyPress: function handleKeyPress(e) {
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
    var _props4 = this.props,
        filter = _props4.filter,
        open = _props4.open;

    var inst = target || (filter && open ? this.refs.filter : this.refs.input);

    inst = _compat2.default.findDOMNode(inst);

    if ((0, _activeElement2.default)() !== inst) inst.focus();
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
}, (_applyDecoratedDescriptor(_obj, 'handleSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleSelect'), _obj), _applyDecoratedDescriptor(_obj, 'handleClick', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleClick'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyPress', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyPress'), _obj)), _obj));

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