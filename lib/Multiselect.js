'use strict';

exports.__esModule = true;

var _desc, _value, _obj;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _WidgetPicker = require('./WidgetPicker');

var _WidgetPicker2 = _interopRequireDefault(_WidgetPicker);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _MultiselectInput = require('./MultiselectInput');

var _MultiselectInput2 = _interopRequireDefault(_MultiselectInput);

var _MultiselectTagList = require('./MultiselectTagList');

var _MultiselectTagList2 = _interopRequireDefault(_MultiselectTagList);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _ListGroupable = require('./ListGroupable');

var _ListGroupable2 = _interopRequireDefault(_ListGroupable);

var _validateListInterface = require('./util/validateListInterface');

var _validateListInterface2 = _interopRequireDefault(_validateListInterface);

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

var compatCreate = function compatCreate(props, msgs) {
  return typeof msgs.createNew === 'function' ? msgs.createNew(props) : [_react2.default.createElement(
    'strong',
    { key: 'dumb' },
    '"' + props.searchTerm + '"'
  ), ' ' + msgs.createNew];
};

var splat = _3.default.splat;


var propTypes = _extends({}, _Popup2.default.propTypes, {

  data: _react2.default.PropTypes.array,
  //-- controlled props --
  value: _react2.default.PropTypes.array,
  onChange: _react2.default.PropTypes.func,

  searchTerm: _react2.default.PropTypes.string,
  onSearch: _react2.default.PropTypes.func,

  open: _react2.default.PropTypes.bool,
  onToggle: _react2.default.PropTypes.func,
  //-------------------------------------------

  valueField: _react2.default.PropTypes.string,
  textField: _propTypes2.default.accessor,

  tagComponent: _propTypes2.default.elementType,
  itemComponent: _propTypes2.default.elementType,
  listComponent: _propTypes2.default.elementType,

  groupComponent: _propTypes2.default.elementType,
  groupBy: _propTypes2.default.accessor,

  createComponent: _propTypes2.default.elementType,

  onSelect: _react2.default.PropTypes.func,
  onCreate: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.oneOf([false]), _react2.default.PropTypes.func]),

  busy: _react2.default.PropTypes.bool,
  dropUp: _react2.default.PropTypes.bool,

  placeholder: _react2.default.PropTypes.string,

  autoFocus: _react2.default.PropTypes.bool,
  disabled: _propTypes2.default.disabled.acceptsArray,
  readOnly: _propTypes2.default.readOnly,

  messages: _react2.default.PropTypes.shape({
    open: _propTypes2.default.message,
    emptyList: _propTypes2.default.message,
    emptyFilter: _propTypes2.default.message,
    createNew: _propTypes2.default.message
  })
});

var Multiselect = _react2.default.createClass((_obj = {

  displayName: 'Multiselect',

  mixins: [require('./mixins/TimeoutMixin'), require('./mixins/DataFilterMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/FocusMixin')({
    willHandle: function willHandle(focused) {
      focused && this.focus();
    },
    didHandle: function didHandle(focused) {
      if (!focused) this.close();

      if (!focused && this.refs.tagList) this.setState({ focusedTag: null });

      // if (focused && !this.props.open && !this.props.readOnly === true)
      //   this.open()
    }
  })],

  propTypes: propTypes,

  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      filter: 'startsWith',
      value: [],
      open: false,
      searchTerm: '',
      messages: {
        createNew: '(create new tag)',
        emptyList: 'There are no items in this list',
        emptyFilter: 'The filter returned no results',
        tagsLabel: 'selected items',
        selectedItems: 'selected items',
        noneSelected: 'no selected items',
        removeLabel: 'remove selected item'
      }
    };
  },
  getInitialState: function getInitialState() {
    var _props = this.props;
    var data = _props.data;
    var value = _props.value;
    var valueField = _props.valueField;
    var searchTerm = _props.searchTerm;
    var dataItems = splat(value).map(function (item) {
      return (0, _dataHelpers.dataItem)(data, item, valueField);
    });
    var processedData = this.process(data, dataItems, searchTerm);

    return {
      focusedTag: null,
      focusedItem: processedData[0],
      processedData: processedData,
      dataItems: dataItems
    };
  },
  componentWillMount: function componentWillMount() {
    this.inputId = (0, _widgetHelpers.instanceId)(this, '_input');
    this.tagsId = (0, _widgetHelpers.instanceId)(this, '_taglist');
    this.notifyId = (0, _widgetHelpers.instanceId)(this, '_notify_area');
    this.listId = (0, _widgetHelpers.instanceId)(this, '_listbox');
    this.createId = (0, _widgetHelpers.instanceId)(this, '_createlist_option');
    this.activeTagId = (0, _widgetHelpers.instanceId)(this, '_taglist_active_tag');
    this.activeOptionId = (0, _widgetHelpers.instanceId)(this, '_listbox_active_option');
  },
  componentDidUpdate: function componentDidUpdate() {
    this.refs.list && (0, _validateListInterface2.default)(this.refs.list);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var data = nextProps.data;
    var value = nextProps.value;
    var valueField = nextProps.valueField;
    var searchTerm = nextProps.searchTerm;
    var values = _3.default.splat(value);
    var current = this.state.focusedItem;
    var items = this.process(data, values, searchTerm);

    this.setState({
      processedData: items,
      focusedItem: items.indexOf(current) === -1 ? items[0] : current,
      dataItems: values.map(function (item) {
        return (0, _dataHelpers.dataItem)(data, item, valueField);
      })
    });
  },
  renderCreateItem: function renderCreateItem(messages) {
    var _this = this;

    var searchTerm = this.props.searchTerm;

    var createIsFocused = this.isCreateTagFocused();

    return _react2.default.createElement(
      'ul',
      {
        role: 'listbox',
        id: this.createId,
        className: 'rw-list rw-multiselect-create-tag'
      },
      _react2.default.createElement(
        'li',
        {
          role: 'option',
          onClick: function onClick() {
            return _this.handleCreate(searchTerm);
          },
          id: createIsFocused ? this.activeOptionId : null,
          className: (0, _classnames2.default)('rw-list-option', 'rw-create-list-option', createIsFocused && 'rw-state-focus')
        },
        compatCreate(this.props, messages)
      )
    );
  },
  renderInput: function renderInput(ownedIds) {
    var _props2 = this.props;
    var searchTerm = _props2.searchTerm;
    var maxLength = _props2.maxLength;
    var tabIndex = _props2.tabIndex;
    var busy = _props2.busy;
    var autoFocus = _props2.autoFocus;
    var open = _props2.open;
    var _state = this.state;
    var focusedItem = _state.focusedItem;
    var focusedTag = _state.focusedTag;


    var disabled = (0, _interaction.isDisabled)(this.props);
    var readOnly = (0, _interaction.isReadOnly)(this.props);
    var active = open ? (focusedItem || this.isCreateTagFocused()) && this.activeOptionId : focusedTag && this.activeTagId;

    return _react2.default.createElement(_MultiselectInput2.default, {
      ref: 'input',
      autoFocus: autoFocus,
      tabIndex: tabIndex || 0,
      role: 'listbox',
      'aria-expanded': !!open,
      'aria-busy': !!busy,
      'aria-owns': ownedIds,
      'aria-haspopup': true,
      'aria-activedescendant': active || null,
      value: searchTerm,
      maxLength: maxLength,
      disabled: disabled,
      readOnly: readOnly,
      placeholder: this.getPlaceholder(),
      onKeyDown: this.handleSearchKeyDown,
      onKeyUp: this.handleSearchKeyUp,
      onChange: this.handleInputChange
    });
  },
  renderList: function renderList(List, messages) {
    var inputId = this.inputId;
    var activeOptionId = this.activeOptionId;
    var listId = this.listId;
    var open = this.props.open;
    var focusedItem = this.state.focusedItem;


    var listProps = _3.default.pickProps(this.props, List);
    var items = this._data();

    return _react2.default.createElement(List, _extends({ ref: 'list', key: 0
    }, listProps, {
      id: listId,
      activeId: activeOptionId,
      data: items,
      focused: focusedItem,
      onSelect: this.handleSelect,
      onMove: this._scrollTo,
      'aria-live': 'polite',
      'aria-labelledby': inputId,
      'aria-hidden': !open,
      messages: {
        emptyList: this._lengthWithoutValues ? messages.emptyFilter : messages.emptyList
      }
    }));
  },
  renderNotificationArea: function renderNotificationArea(messages) {
    var textField = this.props.textField;
    var _state2 = this.state;
    var focused = _state2.focused;
    var dataItems = _state2.dataItems;


    var itemText = dataItems.map(function (item) {
      return (0, _dataHelpers.dataText)(item, textField);
    }).join(', ');

    return _react2.default.createElement(
      'span',
      {
        id: this.notifyId,
        role: 'status',
        className: 'rw-sr',
        'aria-live': 'assertive',
        'aria-atomic': 'true',
        'aria-relevant': 'additions removals text'
      },
      focused && (dataItems.length ? messages.selectedItems + ': ' + itemText : messages.noneSelected)
    );
  },
  renderTags: function renderTags(messages) {
    var _props3 = this.props;
    var disabled = _props3.disabled;
    var readOnly = _props3.readOnly;
    var valueField = _props3.valueField;
    var textField = _props3.textField;
    var _state3 = this.state;
    var focusedTag = _state3.focusedTag;
    var dataItems = _state3.dataItems;


    var Component = this.props.tagComponent;

    return _react2.default.createElement(_MultiselectTagList2.default, {
      ref: 'tagList',
      id: this.tagsId,
      activeId: this.activeTagId,
      valueField: valueField,
      textField: textField,
      label: messages.tagsLabel,
      value: dataItems,
      focused: focusedTag,
      disabled: disabled,
      readOnly: readOnly,
      onDelete: this.handleDelete,
      valueComponent: Component
    });
  },
  render: function render() {
    var _this2 = this;

    var _props4 = this.props;
    var className = _props4.className;
    var groupBy = _props4.groupBy;
    var messages = _props4.messages;
    var busy = _props4.busy;
    var dropUp = _props4.dropUp;
    var open = _props4.open;
    var duration = _props4.duration;
    var List = _props4.listComponent;
    var _state4 = this.state;
    var focused = _state4.focused;
    var dataItems = _state4.dataItems;


    List = List || groupBy && _ListGroupable2.default || _List2.default;

    var elementProps = _3.default.omitOwnProps(this, List);

    var shouldRenderTags = !!dataItems.length,
        shouldRenderPopup = (0, _widgetHelpers.isFirstFocusedRender)(this) || open,
        shouldShowCreate = this.shouldShowCreate();

    var inputOwns = this.listId + ' ' + this.notifyId + ' ' + (shouldRenderTags ? this.tagsId : '') + (shouldShowCreate ? this.createId : '');

    var disabled = (0, _interaction.isDisabled)(this.props);
    var readOnly = (0, _interaction.isReadOnly)(this.props);

    messages = msgs(messages);

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        onKeyDown: this.handleKeyDown,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        className: (0, _classnames2.default)(className, 'rw-multiselect')
      }),
      this.renderNotificationArea(messages),
      _react2.default.createElement(
        _WidgetPicker2.default,
        {
          open: open,
          dropUp: dropUp,
          focused: focused,
          disabled: disabled,
          readOnly: readOnly,
          className: 'rw-widget-input',
          onClick: this.handleClick,
          onTouchEnd: this.handleClick
        },
        _react2.default.createElement(
          'div',
          null,
          shouldRenderTags && this.renderTags(messages),
          this.renderInput(inputOwns)
        ),
        _react2.default.createElement(_Select2.default, {
          busy: busy,
          icon: focused ? 'caret-down' : '',
          'aria-hidden': 'true',
          role: 'presentational',
          disabled: disabled || readOnly
        })
      ),
      shouldRenderPopup && _react2.default.createElement(
        _Popup2.default,
        {
          dropUp: dropUp,
          open: open,
          duration: duration,
          onOpening: function onOpening() {
            return _this2.refs.list.forceUpdate();
          }
        },
        _react2.default.createElement(
          'div',
          null,
          this.renderList(List, messages),
          shouldShowCreate && this.renderCreateItem(messages)
        )
      )
    );
  },
  _data: function _data() {
    return this.state.processedData;
  },
  handleDelete: function handleDelete(value) {
    this.focus();
    this.change(this.state.dataItems.filter(function (d) {
      return d !== value;
    }));
  },
  handleSearchKeyDown: function handleSearchKeyDown(e) {
    if (e.key === 'Backspace' && e.target.value && !this._deletingText) this._deletingText = true;
  },
  handleSearchKeyUp: function handleSearchKeyUp(e) {
    if (e.key === 'Backspace' && this._deletingText) this._deletingText = false;
  },
  handleInputChange: function handleInputChange(e) {
    (0, _widgetHelpers.notify)(this.props.onSearch, [e.target.value]);
    this.open();
  },
  handleClick: function handleClick() {
    this.open();
  },
  handleSelect: function handleSelect(data) {
    if (data === undefined) {
      if (this.props.onCreate) this.handleCreate(this.props.searchTerm);

      return;
    }
    (0, _widgetHelpers.notify)(this.props.onSelect, data);
    this.change(this.state.dataItems.concat(data));

    this.close();
    this.focus();
  },
  handleCreate: function handleCreate(tag) {
    if (tag.trim() === '') return;

    (0, _widgetHelpers.notify)(this.props.onCreate, tag);
    this.props.searchTerm && (0, _widgetHelpers.notify)(this.props.onSearch, ['']);

    this.close();
    this.focus();
  },
  handleKeyDown: function handleKeyDown(e) {
    var key = e.key;
    var altKey = e.altKey;
    var ctrlKey = e.ctrlKey;
    var noSearch = !this.props.searchTerm && !this._deletingText;
    var isOpen = this.props.open;var _state5 = this.state;
    var focusedTag = _state5.focusedTag;
    var focusedItem = _state5.focusedItem;
    var _refs = this.refs;
    var list = _refs.list;
    var tagList = _refs.tagList;

    var nullTag = { focusedTag: null };

    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (key === 'ArrowDown') {
      var next = list.next(focusedItem),
          creating = this.shouldShowCreate() && focusedItem === next || focusedItem === null;

      next = creating ? null : next;

      e.preventDefault();
      if (isOpen) this.setState(_extends({ focusedItem: next }, nullTag));else this.open();
    } else if (key === 'ArrowUp') {
      var prev = focusedItem === null ? list.last() : list.prev(focusedItem);

      e.preventDefault();

      if (altKey) this.close();else if (isOpen) this.setState(_extends({ focusedItem: prev }, nullTag));
    } else if (key === 'End') {
      e.preventDefault();
      if (isOpen) this.setState(_extends({ focusedItem: list.last() }, nullTag));else tagList && this.setState({ focusedTag: tagList.last() });
    } else if (key === 'Home') {
      e.preventDefault();
      if (isOpen) this.setState(_extends({ focusedItem: list.first() }, nullTag));else tagList && this.setState({ focusedTag: tagList.first() });
    } else if (isOpen && key === 'Enter') {
      e.preventDefault();
      ctrlKey && this.props.onCreate || focusedItem === null ? this.handleCreate(this.props.searchTerm) : this.handleSelect(this.state.focusedItem);
    } else if (key === 'Escape') isOpen ? this.close() : tagList && this.setState(nullTag);else if (noSearch && key === 'ArrowLeft') tagList && this.setState({ focusedTag: tagList.prev(focusedTag) });else if (noSearch && key === 'ArrowRight') tagList && this.setState({ focusedTag: tagList.next(focusedTag) });else if (noSearch && key === 'Delete') tagList && tagList.remove(focusedTag);else if (noSearch && key === 'Backspace') tagList && tagList.removeNext();else if (noSearch && key === ' ' && !isOpen) {
      e.preventDefault();
      this.open();
    }
  },
  change: function change(data) {
    (0, _widgetHelpers.notify)(this.props.onChange, [data]);
    (0, _widgetHelpers.notify)(this.props.onSearch, ['']);
  },
  focus: function focus() {
    this.refs.input && this.refs.input.focus();
  },
  open: function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  },
  close: function close() {
    (0, _widgetHelpers.notify)(this.props.onToggle, false);
  },
  toggle: function toggle() {
    this.props.open ? this.close() : this.open();
  },
  process: function process(data, values, searchTerm) {
    var valueField = this.props.valueField;

    var items = data.filter(function (i) {
      return !values.some(function (v) {
        return (0, _dataHelpers.valueMatcher)(i, v, valueField);
      });
    });

    this._lengthWithoutValues = items.length;

    if (searchTerm) items = this.filter(items, searchTerm);

    return items;
  },
  isCreateTagFocused: function isCreateTagFocused() {
    var focusedItem = this.state.focusedItem;


    if (!this.shouldShowCreate()) return false;

    return !this._data().length || focusedItem === null;
  },
  shouldShowCreate: function shouldShowCreate() {
    var _props5 = this.props;
    var textField = _props5.textField;
    var searchTerm = _props5.searchTerm;
    var onCreate = _props5.onCreate;
    var caseSensitive = _props5.caseSensitive;


    if (!onCreate || !searchTerm) return false;

    var lower = function lower(text) {
      return caseSensitive ? text : text.toLowerCase();
    };
    var eq = function eq(v) {
      return lower((0, _dataHelpers.dataText)(v, textField)) === lower(searchTerm);
    };

    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
    return !this._data().some(eq) && !this.state.dataItems.some(eq);
  },
  getPlaceholder: function getPlaceholder() {
    return (this.props.value || []).length ? '' : this.props.placeholder || '';
  }
}, (_applyDecoratedDescriptor(_obj, 'handleClick', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleClick'), _obj), _applyDecoratedDescriptor(_obj, 'handleSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleSelect'), _obj), _applyDecoratedDescriptor(_obj, 'handleCreate', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleCreate'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj), _applyDecoratedDescriptor(_obj, 'change', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'change'), _obj)), _obj));

function msgs(msgs) {
  return _extends({
    createNew: '(create new tag)',
    emptyList: 'There are no items in this list',
    emptyFilter: 'The filter returned no results',
    tagsLabel: 'selected items',
    selectedItems: 'selected items',
    removeLabel: 'remove selected item'
  }, msgs);
}

exports.default = (0, _uncontrollable2.default)(Multiselect, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }, ['focus']);
module.exports = exports['default'];