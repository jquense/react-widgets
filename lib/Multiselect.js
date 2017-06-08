'use strict';

exports.__esModule = true;

var _desc, _value, _obj;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _Widget = require('./Widget');

var _Widget2 = _interopRequireDefault(_Widget);

var _Popup = require('./Popup');

var _Popup2 = _interopRequireDefault(_Popup);

var _MultiselectInput = require('./MultiselectInput');

var _MultiselectInput2 = _interopRequireDefault(_MultiselectInput);

var _MultiselectTagList = require('./MultiselectTagList');

var _MultiselectTagList2 = _interopRequireDefault(_MultiselectTagList);

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

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

  data: _propTypes2.default.array,
  //-- controlled props --
  value: _propTypes2.default.array,
  onChange: _propTypes2.default.func,

  searchTerm: _propTypes2.default.string,
  onSearch: _propTypes2.default.func,

  open: _propTypes2.default.bool,
  onToggle: _propTypes2.default.func,
  //-------------------------------------------

  valueField: _propTypes2.default.string,
  textField: _propTypes4.default.accessor,

  tagComponent: _propTypes4.default.elementType,
  itemComponent: _propTypes4.default.elementType,
  listComponent: _propTypes4.default.elementType,

  groupComponent: _propTypes4.default.elementType,
  groupBy: _propTypes4.default.accessor,

  createComponent: _propTypes4.default.elementType,

  onSelect: _propTypes2.default.func,
  onCreate: _propTypes2.default.oneOfType([_propTypes2.default.oneOf([false]), _propTypes2.default.func]),

  inputSize: _propTypes2.default.func,

  busy: _propTypes2.default.bool,
  dropUp: _propTypes2.default.bool,

  placeholder: _propTypes2.default.string,

  autoFocus: _propTypes2.default.bool,
  disabled: _propTypes4.default.disabled.acceptsArray,
  readOnly: _propTypes4.default.readOnly.acceptsArray,

  messages: _propTypes2.default.shape({
    open: _propTypes4.default.message,
    emptyList: _propTypes4.default.message,
    emptyFilter: _propTypes4.default.message,
    createNew: _propTypes4.default.message
  })
});

var Multiselect = (0, _createReactClass2.default)((_obj = {

  displayName: 'Multiselect',

  mixins: [require('./mixins/TimeoutMixin'), require('./mixins/DataFilterMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/FocusMixin')({
    willHandle: function willHandle(focused) {
      focused && this.focus();
    },
    didHandle: function didHandle(focused) {
      if (!focused) this.close();

      if (!focused && this.refs.tagList) this.setState({ focusedTag: null });

      if (focused && !this.props.open) this.open();
    }
  }), require('./mixins/AriaDescendantMixin')('input', function (key, id) {
    var myKey = this.props.ariaActiveDescendantKey;


    var createIsActive = (!this._data().length || this.state.focusedItem === null) && key === myKey;

    var tagIsActive = this.state.focusedTag != null && key === 'taglist';
    var listIsActive = this.state.focusedTag == null && key === 'list';

    if (createIsActive || tagIsActive || listIsActive) return id;
  })],

  propTypes: propTypes,

  getDefaultProps: function getDefaultProps() {
    return {
      data: [],
      filter: 'startsWith',
      value: [],
      open: false,
      searchTerm: '',
      ariaActiveDescendantKey: 'multiselect',
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
    var _props = this.props,
        data = _props.data,
        value = _props.value,
        valueField = _props.valueField,
        searchTerm = _props.searchTerm,
        dataItems = splat(value).map(function (item) {
      return (0, _dataHelpers.dataItem)(data, item, valueField);
    }),
        processedData = this.process(data, dataItems, searchTerm);


    return {
      focusedTag: null,
      focusedItem: processedData[0],
      processedData: processedData,
      dataItems: dataItems
    };
  },
  componentDidUpdate: function componentDidUpdate() {
    this.ariaActiveDescendant((0, _widgetHelpers.instanceId)(this, '__createlist_option'));

    this.refs.list && (0, _validateListInterface2.default)(this.refs.list);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var data = nextProps.data,
        value = nextProps.value,
        valueField = nextProps.valueField,
        searchTerm = nextProps.searchTerm,
        values = _3.default.splat(value),
        current = this.state.focusedItem,
        items = this.process(data, values, searchTerm);

    this.setState({
      processedData: items,
      focusedItem: items.indexOf(current) === -1 ? items[0] : current,
      dataItems: values.map(function (item) {
        return (0, _dataHelpers.dataItem)(data, item, valueField);
      })
    });
  },
  renderCreateItem: function renderCreateItem(id, messages) {
    var _this = this;

    var searchTerm = this.props.searchTerm;
    var focusedItem = this.state.focusedItem;


    var createIsFocused = !this._data().length || focusedItem === null;
    var optionID = (0, _widgetHelpers.instanceId)(this, '__createlist_option');

    return _react2.default.createElement(
      'ul',
      {
        id: id,
        role: 'listbox',
        className: 'rw-list rw-multiselect-create-tag'
      },
      _react2.default.createElement(
        'li',
        {
          id: optionID,
          role: 'option',
          onClick: function onClick() {
            return _this.handleCreate(searchTerm);
          },
          className: (0, _classnames2.default)('rw-list-option', 'rw-create-list-option', createIsFocused && 'rw-state-focus')
        },
        compatCreate(this.props, messages)
      )
    );
  },
  renderInput: function renderInput(owns) {
    var _props2 = this.props,
        searchTerm = _props2.searchTerm,
        maxLength = _props2.maxLength,
        tabIndex = _props2.tabIndex,
        busy = _props2.busy,
        open = _props2.open,
        disabled = _props2.disabled,
        readOnly = _props2.readOnly;


    return _react2.default.createElement(_MultiselectInput2.default, {
      ref: 'input',
      tabIndex: tabIndex || 0,
      role: 'listbox',
      'aria-expanded': !!open,
      'aria-busy': !!busy,
      autoFocus: this.props.autoFocus,
      'aria-owns': owns,
      'aria-haspopup': true,
      value: searchTerm,
      maxLength: maxLength,
      disabled: disabled === true,
      readOnly: readOnly === true,
      placeholder: this.getPlaceholder(),
      inputSize: this.props.inputSize,
      onKeyDown: this.handleSearchKeyDown,
      onKeyUp: this.handleSearchKeyUp,
      onChange: this.handleInputChange,
      onClick: this.handleInputInteraction,
      onTouchEnd: this.handleInputInteraction
    });
  },
  renderList: function renderList(List, id, messages) {
    var _props3 = this.props,
        open = _props3.open,
        disabled = _props3.disabled,
        readOnly = _props3.readOnly;
    var focusedItem = this.state.focusedItem;


    var listProps = _3.default.pickProps(this.props, List);
    var items = this._data();

    return _react2.default.createElement(List, _extends({ ref: 'list',
      key: 0
    }, listProps, {
      readOnly: readOnly,
      disabled: disabled,
      id: id,
      'aria-live': 'polite',
      'aria-labelledby': (0, _widgetHelpers.instanceId)(this),
      'aria-hidden': !open,
      ariaActiveDescendantKey: 'list',
      data: items,
      focused: focusedItem,
      onSelect: this.handleSelect,
      onMove: this._scrollTo,
      messages: {
        emptyList: this._lengthWithoutValues ? messages.emptyFilter : messages.emptyList
      }
    }));
  },
  renderNotificationArea: function renderNotificationArea(id, messages) {
    var textField = this.props.textField;
    var _state = this.state,
        focused = _state.focused,
        dataItems = _state.dataItems;


    return _react2.default.createElement(
      'span',
      {
        id: id,
        role: 'status',
        className: 'rw-sr',
        'aria-live': 'assertive',
        'aria-atomic': 'true',
        'aria-relevant': 'additions removals text'
      },
      focused && (dataItems.length ? messages.selectedItems + ': ' + dataItems.map(function (item) {
        return (0, _dataHelpers.dataText)(item, textField);
      }).join(', ') : messages.noneSelected)
    );
  },
  renderTags: function renderTags(id, messages) {
    var _props4 = this.props,
        disabled = _props4.disabled,
        readOnly = _props4.readOnly,
        valueField = _props4.valueField,
        textField = _props4.textField;
    var _state2 = this.state,
        focusedTag = _state2.focusedTag,
        dataItems = _state2.dataItems;


    var Component = this.props.tagComponent;

    return _react2.default.createElement(_MultiselectTagList2.default, {
      ref: 'tagList',
      id: id,
      valueField: valueField,
      textField: textField,
      'aria-label': messages.tagsLabel,
      value: dataItems,
      focused: focusedTag,
      disabled: disabled,
      readOnly: readOnly,
      onDelete: this.handleDelete,
      valueComponent: Component,
      ariaActiveDescendantKey: 'taglist'
    });
  },
  render: function render() {
    var _this2 = this;

    var _props5 = this.props,
        className = _props5.className,
        groupBy = _props5.groupBy,
        messages = _props5.messages,
        busy = _props5.busy,
        dropUp = _props5.dropUp,
        open = _props5.open,
        duration = _props5.duration,
        disabled = _props5.disabled,
        readOnly = _props5.readOnly,
        List = _props5.listComponent;
    var _state3 = this.state,
        focused = _state3.focused,
        dataItems = _state3.dataItems;


    List = List || groupBy && _ListGroupable2.default || _List2.default;

    var elementProps = _3.default.omitOwnProps(this, List);

    var shouldRenderTags = !!dataItems.length,
        shouldRenderPopup = (0, _widgetHelpers.isFirstFocusedRender)(this) || open,
        shouldShowCreate = this.shouldShowCreate();

    var tagsID = (0, _widgetHelpers.instanceId)(this, '_taglist'),
        listID = (0, _widgetHelpers.instanceId)(this, '__listbox'),
        createID = (0, _widgetHelpers.instanceId)(this, '__createlist'),
        notifyID = (0, _widgetHelpers.instanceId)(this, '__notify');

    var inputOwns = listID + ' ' + notifyID + ' ' + (shouldRenderTags ? tagsID : '') + (shouldShowCreate ? createID : '');

    messages = msgs(messages);

    return _react2.default.createElement(
      _Widget2.default,
      _extends({}, elementProps, {
        id: (0, _widgetHelpers.instanceId)(this),
        open: open,
        dropUp: dropUp,
        focused: focused,
        disabled: disabled === true,
        readOnly: readOnly === true,
        onKeyDown: this.handleKeyDown,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onTouchEnd: this.handleFocus,
        className: (0, _classnames2.default)(className, 'rw-multiselect')
      }),
      this.renderNotificationArea(notifyID, messages),
      _react2.default.createElement(
        'div',
        { className: 'rw-multiselect-wrapper' },
        busy && _react2.default.createElement('span', { className: 'rw-i rw-loading' }),
        shouldRenderTags && this.renderTags(tagsID, messages),
        this.renderInput(inputOwns)
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
          this.renderList(List, listID, messages),
          shouldShowCreate && this.renderCreateItem(createID, messages)
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
  handleInputInteraction: function handleInputInteraction() {
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
    var key = e.key,
        keyCode = e.keyCode,
        altKey = e.altKey,
        ctrlKey = e.ctrlKey,
        noSearch = !this.props.searchTerm && !this._deletingText,
        isOpen = this.props.open;
    var _state4 = this.state,
        focusedTag = _state4.focusedTag,
        focusedItem = _state4.focusedItem;
    var _refs = this.refs,
        list = _refs.list,
        tagList = _refs.tagList;

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
    } else if (isOpen && keyCode === 13) {
      // using keyCode to ignore enter for japanese IME
      e.preventDefault();
      ctrlKey && this.props.onCreate || focusedItem === null ? this.handleCreate(this.props.searchTerm) : this.handleSelect(this.state.focusedItem);
    } else if (key === 'Escape') isOpen ? this.close() : tagList && this.setState(nullTag);else if (noSearch && key === 'ArrowLeft') tagList && this.setState({ focusedTag: tagList.prev(focusedTag) });else if (noSearch && key === 'ArrowRight') tagList && this.setState({ focusedTag: tagList.next(focusedTag) });else if (noSearch && key === 'Delete') tagList && tagList.remove(focusedTag);else if (noSearch && key === 'Backspace') tagList && tagList.removeNext();
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
  shouldShowCreate: function shouldShowCreate() {
    var _props6 = this.props,
        textField = _props6.textField,
        searchTerm = _props6.searchTerm,
        onCreate = _props6.onCreate,
        caseSensitive = _props6.caseSensitive;


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
}, (_applyDecoratedDescriptor(_obj, 'handleInputInteraction', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleInputInteraction'), _obj), _applyDecoratedDescriptor(_obj, 'handleSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleSelect'), _obj), _applyDecoratedDescriptor(_obj, 'handleCreate', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleCreate'), _obj), _applyDecoratedDescriptor(_obj, 'handleKeyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleKeyDown'), _obj), _applyDecoratedDescriptor(_obj, 'change', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'change'), _obj)), _obj));

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