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

var compatCreate = function compatCreate(props, msgs) {
  return typeof msgs.createNew === 'function' ? msgs.createNew(props) : [_react2.default.createElement(
    'strong',
    { key: 'dumb' },
    '"' + props.searchTerm + '"'
  ), ' ' + msgs.createNew];
};

var omit = _3.default.omit;
var pick = _3.default.pick;
var splat = _3.default.splat;


var propTypes = {
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

  dropUp: _react2.default.PropTypes.bool,
  duration: _react2.default.PropTypes.number, //popup

  placeholder: _react2.default.PropTypes.string,

  autoFocus: _react2.default.PropTypes.bool,
  disabled: _propTypes2.default.disabled.acceptsArray,
  readOnly: _propTypes2.default.readOnly.acceptsArray,

  messages: _react2.default.PropTypes.shape({
    open: _propTypes2.default.message,
    emptyList: _propTypes2.default.message,
    emptyFilter: _propTypes2.default.message,
    createNew: _propTypes2.default.message
  })
};

var Multiselect = _react2.default.createClass((_obj = {

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
  componentDidUpdate: function componentDidUpdate() {
    this.ariaActiveDescendant((0, _widgetHelpers.instanceId)(this, '__createlist_option'));

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
  render: function render() {
    var _cx,
        _this = this;

    var _props2 = this.props;
    var searchTerm = _props2.searchTerm;
    var maxLength = _props2.maxLength;
    var className = _props2.className;
    var tabIndex = _props2.tabIndex;
    var textField = _props2.textField;
    var groupBy = _props2.groupBy;
    var messages = _props2.messages;
    var busy = _props2.busy;
    var dropUp = _props2.dropUp;
    var open = _props2.open;
    var disabled = _props2.disabled;
    var readOnly = _props2.readOnly;
    var TagComponent = _props2.tagComponent;
    var List = _props2.listComponent;


    List = List || groupBy && _ListGroupable2.default || _List2.default;

    messages = msgs(messages);

    var elementProps = omit(this.props, Object.keys(propTypes));
    var tagsProps = pick(this.props, ['valueField', 'textField']);
    var inputProps = pick(this.props, ['maxLength', 'searchTerm', 'autoFocus']);
    var listProps = pick(this.props, Object.keys(List.propTypes));
    var popupProps = pick(this.props, Object.keys(_Popup2.default.propTypes));

    var _state = this.state;
    var focusedTag = _state.focusedTag;
    var focusedItem = _state.focusedItem;
    var focused = _state.focused;
    var dataItems = _state.dataItems;


    var items = this._data(),
        tagsID = (0, _widgetHelpers.instanceId)(this, '_taglist'),
        listID = (0, _widgetHelpers.instanceId)(this, '__listbox'),
        createID = (0, _widgetHelpers.instanceId)(this, '__createlist'),
        createOptionID = (0, _widgetHelpers.instanceId)(this, '__createlist_option');

    var shouldRenderTags = !!dataItems.length,
        shouldRenderPopup = (0, _widgetHelpers.isFirstFocusedRender)(this) || open,
        shouldShowCreate = this._shouldShowCreate(),
        createIsFocused = !items.length || focusedItem === null;

    if (focused) {
      var notify = dataItems.length ? messages.selectedItems + ': ' + dataItems.map(function (item) {
        return (0, _dataHelpers.dataText)(item, textField);
      }).join(', ') : messages.noneSelected;
    }

    return _react2.default.createElement(
      'div',
      _extends({}, elementProps, {
        ref: 'element',
        id: (0, _widgetHelpers.instanceId)(this),
        onKeyDown: this._keyDown,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onTouchEnd: this.handleFocus,
        tabIndex: '-1',
        className: (0, _classnames2.default)(className, 'rw-widget', 'rw-multiselect', (_cx = {
          'rw-state-focus': focused,
          'rw-state-disabled': disabled === true,
          'rw-state-readonly': readOnly === true,
          'rw-rtl': this.isRtl()
        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
      _react2.default.createElement(
        'span',
        {
          ref: 'status',
          id: (0, _widgetHelpers.instanceId)(this, '__notify'),
          role: 'status',
          className: 'rw-sr',
          'aria-live': 'assertive',
          'aria-atomic': 'true',
          'aria-relevant': 'additions removals text'
        },
        notify
      ),
      _react2.default.createElement(
        'div',
        { className: 'rw-multiselect-wrapper', ref: 'wrapper' },
        busy && _react2.default.createElement('i', { className: 'rw-i rw-loading' }),
        shouldRenderTags && _react2.default.createElement(_MultiselectTagList2.default, _extends({}, tagsProps, {
          ref: 'tagList',
          id: tagsID,
          'aria-label': messages.tagsLabel,
          value: dataItems,
          focused: focusedTag,
          disabled: disabled,
          readOnly: readOnly,
          onDelete: this._delete,
          valueComponent: TagComponent,
          ariaActiveDescendantKey: 'taglist'
        })),
        _react2.default.createElement(_MultiselectInput2.default, _extends({}, inputProps, {
          ref: 'input',
          tabIndex: tabIndex || 0,
          role: 'listbox',
          'aria-expanded': open,
          'aria-busy': !!busy,
          autoFocus: this.props.autoFocus,
          'aria-owns': listID + ' ' + (0, _widgetHelpers.instanceId)(this, '__notify') + (shouldRenderTags ? ' ' + tagsID : '') + (shouldShowCreate ? ' ' + createID : ''),
          'aria-haspopup': true,
          value: searchTerm,
          maxLength: maxLength,
          disabled: disabled === true,
          readOnly: readOnly === true,
          placeholder: this._placeholder(),
          onKeyDown: this._searchKeyDown,
          onKeyUp: this._searchgKeyUp,
          onChange: this._typing,
          onClick: this.handleInputInteraction,
          onTouchEnd: this.handleInputInteraction
        }))
      ),
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
          shouldRenderPopup && [_react2.default.createElement(List, _extends({ ref: 'list',
            key: 0
          }, listProps, {
            readOnly: readOnly,
            disabled: disabled,
            id: listID,
            'aria-live': 'polite',
            'aria-labelledby': (0, _widgetHelpers.instanceId)(this),
            'aria-hidden': !open,
            ariaActiveDescendantKey: 'list',
            data: items,
            focused: focusedItem,
            onSelect: this._onSelect,
            onMove: this._scrollTo,
            messages: {
              emptyList: this._lengthWithoutValues ? messages.emptyFilter : messages.emptyList
            }
          })), shouldShowCreate && _react2.default.createElement(
            'ul',
            { key: 1, role: 'listbox', id: createID, className: 'rw-list rw-multiselect-create-tag' },
            _react2.default.createElement(
              'li',
              { onClick: this._onCreate.bind(null, searchTerm),
                role: 'option',
                id: createOptionID,
                className: (0, _classnames2.default)({
                  'rw-list-option': true,
                  'rw-state-focus': createIsFocused
                }) },
              compatCreate(this.props, messages)
            )
          )]
        )
      )
    );
  },
  _data: function _data() {
    return this.state.processedData;
  },
  _delete: function _delete(value) {
    this.focus();
    this.change(this.state.dataItems.filter(function (d) {
      return d !== value;
    }));
  },
  _searchKeyDown: function _searchKeyDown(e) {
    if (e.key === 'Backspace' && e.target.value && !this._deletingText) this._deletingText = true;
  },
  _searchgKeyUp: function _searchgKeyUp(e) {
    if (e.key === 'Backspace' && this._deletingText) this._deletingText = false;
  },
  _typing: function _typing(e) {
    (0, _widgetHelpers.notify)(this.props.onSearch, [e.target.value]);
    this.open();
  },
  handleInputInteraction: function handleInputInteraction() {
    this.open();
  },
  _onSelect: function _onSelect(data) {

    if (data === undefined) {
      if (this.props.onCreate) this._onCreate(this.props.searchTerm);

      return;
    }

    (0, _widgetHelpers.notify)(this.props.onSelect, data);
    this.change(this.state.dataItems.concat(data));

    this.close();
    this.focus();
  },
  _onCreate: function _onCreate(tag) {
    if (tag.trim() === '') return;

    (0, _widgetHelpers.notify)(this.props.onCreate, tag);
    this.props.searchTerm && (0, _widgetHelpers.notify)(this.props.onSearch, ['']);

    this.close();
    this.focus();
  },
  _keyDown: function _keyDown(e) {
    var key = e.key;
    var altKey = e.altKey;
    var ctrlKey = e.ctrlKey;
    var noSearch = !this.props.searchTerm && !this._deletingText;
    var isOpen = this.props.open;var _state2 = this.state;
    var focusedTag = _state2.focusedTag;
    var focusedItem = _state2.focusedItem;
    var _refs = this.refs;
    var list = _refs.list;
    var tagList = _refs.tagList;

    var nullTag = { focusedTag: null };

    (0, _widgetHelpers.notify)(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (key === 'ArrowDown') {
      var next = list.next(focusedItem),
          creating = this._shouldShowCreate() && focusedItem === next || focusedItem === null;

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
      ctrlKey && this.props.onCreate || focusedItem === null ? this._onCreate(this.props.searchTerm) : this._onSelect(this.state.focusedItem);
    } else if (key === 'Escape') isOpen ? this.close() : tagList && this.setState(nullTag);else if (noSearch && key === 'ArrowLeft') tagList && this.setState({ focusedTag: tagList.prev(focusedTag) });else if (noSearch && key === 'ArrowRight') tagList && this.setState({ focusedTag: tagList.next(focusedTag) });else if (noSearch && key === 'Delete') tagList && tagList.remove(focusedTag);else if (noSearch && key === 'Backspace') tagList && tagList.removeNext();
  },
  change: function change(data) {
    (0, _widgetHelpers.notify)(this.props.onChange, [data]);
    (0, _widgetHelpers.notify)(this.props.onSearch, ['']);
  },
  focus: function focus() {
    this.refs.input.focus();
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
  _shouldShowCreate: function _shouldShowCreate() {
    var _props3 = this.props;
    var textField = _props3.textField;
    var searchTerm = _props3.searchTerm;
    var onCreate = _props3.onCreate;


    if (!onCreate || !searchTerm) return false;

    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
    return !this._data().some(function (v) {
      return (0, _dataHelpers.dataText)(v, textField) === searchTerm;
    }) && !this.state.dataItems.some(function (v) {
      return (0, _dataHelpers.dataText)(v, textField) === searchTerm;
    });
  },
  _placeholder: function _placeholder() {
    return (this.props.value || []).length ? '' : this.props.placeholder || '';
  }
}, (_applyDecoratedDescriptor(_obj, 'handleInputInteraction', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'handleInputInteraction'), _obj), _applyDecoratedDescriptor(_obj, '_onSelect', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_onSelect'), _obj), _applyDecoratedDescriptor(_obj, '_onCreate', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_onCreate'), _obj), _applyDecoratedDescriptor(_obj, '_keyDown', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, '_keyDown'), _obj), _applyDecoratedDescriptor(_obj, 'change', [_interaction.widgetEditable], Object.getOwnPropertyDescriptor(_obj, 'change'), _obj)), _obj));

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