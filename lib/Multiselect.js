'use strict';

exports.__esModule = true;

var _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

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

var _Filter = require('./util/Filter');

var Filter = _interopRequireWildcard(_Filter);

var _validateListInterface = require('./util/validateListInterface');

var _validateListInterface2 = _interopRequireDefault(_validateListInterface);

var _scrollManager = require('./util/scrollManager');

var _scrollManager2 = _interopRequireDefault(_scrollManager);

var _focusManager = require('./util/focusManager');

var _focusManager2 = _interopRequireDefault(_focusManager);

var _withRightToLeft = require('./util/withRightToLeft');

var _withRightToLeft2 = _interopRequireDefault(_withRightToLeft);

var _dataHelpers = require('./util/dataHelpers');

var _interaction = require('./util/interaction');

var _widgetHelpers = require('./util/widgetHelpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var compatCreate = function compatCreate(props, msgs) {
  return typeof msgs.createNew === 'function' ? msgs.createNew(props) : [_react2.default.createElement(
    'strong',
    { key: 'dumb' },
    '"' + props.searchTerm + '"'
  ), ' ' + msgs.createNew];
};

var propTypes = _extends({}, _Popup2.default.propTypes, Filter.propTypes, {

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

var Multiselect = (0, _withRightToLeft2.default)(_class = (_class2 = (_temp = _class3 = function (_React$Component) {
  _inherits(Multiselect, _React$Component);

  function Multiselect() {
    _classCallCheck(this, Multiselect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.handleFocusWillChange = function (focused) {
      if (focused) _this.focus();
    };

    _this.handleFocusDidChange = function (focused) {
      if (focused) return;

      _this.close();

      if (_this.refs.tagList) _this.setState({ focusedTag: null });
    };

    _this.handleDelete = function (value) {
      var dataItems = _this.state.dataItems;

      _this.focus();
      _this.change(dataItems.filter(function (d) {
        return d !== value;
      }));
    };

    _this.handleSearchKeyDown = function (e) {
      if (e.key === 'Backspace' && e.target.value && !_this._deletingText) _this._deletingText = true;
    };

    _this.handleSearchKeyUp = function (e) {
      if (e.key === 'Backspace' && _this._deletingText) _this._deletingText = false;
    };

    _this.handleInputChange = function (e) {
      (0, _widgetHelpers.notify)(_this.props.onSearch, [e.target.value]);
      _this.open();
    };

    _initDefineProp(_this, 'handleClick', _descriptor, _this);

    _initDefineProp(_this, 'handleSelect', _descriptor2, _this);

    _initDefineProp(_this, 'handleCreate', _descriptor3, _this);

    _initDefineProp(_this, 'handleKeyDown', _descriptor4, _this);

    _this.inputId = (0, _widgetHelpers.instanceId)(_this, '_input');
    _this.tagsId = (0, _widgetHelpers.instanceId)(_this, '_taglist');
    _this.notifyId = (0, _widgetHelpers.instanceId)(_this, '_notify_area');
    _this.listId = (0, _widgetHelpers.instanceId)(_this, '_listbox');
    _this.createId = (0, _widgetHelpers.instanceId)(_this, '_createlist_option');
    _this.activeTagId = (0, _widgetHelpers.instanceId)(_this, '_taglist_active_tag');
    _this.activeOptionId = (0, _widgetHelpers.instanceId)(_this, '_listbox_active_option');

    _this.handleScroll = (0, _scrollManager2.default)(_this);
    _this.focusManager = (0, _focusManager2.default)(_this, {
      willHandle: _this.handleFocusWillChange,
      didHandle: _this.handleFocusDidChange
    });

    _this.state = _extends({
      focusedTag: null
    }, _this.getStateFromProps(_this.props));
    return _this;
  }

  Multiselect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  };

  Multiselect.prototype.componentDidUpdate = function componentDidUpdate() {
    this.refs.list && (0, _validateListInterface2.default)(this.refs.list);
  };

  Multiselect.prototype.getStateFromProps = function getStateFromProps(props) {
    var data = props.data;
    var valueField = props.valueField;
    var textField = props.textField;
    var searchTerm = props.searchTerm;
    var minLength = props.minLength;
    var caseSensitive = props.caseSensitive;
    var filter = props.filter;


    var values = _3.default.splat(props.value);
    var dataItems = values.map(function (item) {
      return (0, _dataHelpers.dataItem)(data, item, valueField);
    });

    data = data.filter(function (i) {
      return !values.some(function (v) {
        return (0, _dataHelpers.valueMatcher)(i, v, valueField);
      });
    });

    this._lengthWithoutValues = data.length;

    data = Filter.filter(data, {
      filter: filter,
      searchTerm: searchTerm,
      minLength: minLength,
      caseSensitive: caseSensitive,
      textField: textField
    });

    var current = this.state && this.state.focusedItem;

    return {
      data: data,
      dataItems: dataItems,
      focusedItem: data.indexOf(current) === -1 ? data[0] : current
    };
  };

  Multiselect.prototype.renderCreateItem = function renderCreateItem(messages) {
    var _this2 = this;

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
            return _this2.handleCreate(searchTerm);
          },
          id: createIsFocused ? this.activeOptionId : null,
          className: (0, _classnames2.default)('rw-list-option', 'rw-create-list-option', createIsFocused && 'rw-state-focus')
        },
        compatCreate(this.props, messages)
      )
    );
  };

  Multiselect.prototype.renderInput = function renderInput(ownedIds) {
    var _props = this.props;
    var searchTerm = _props.searchTerm;
    var maxLength = _props.maxLength;
    var tabIndex = _props.tabIndex;
    var busy = _props.busy;
    var autoFocus = _props.autoFocus;
    var open = _props.open;
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
  };

  Multiselect.prototype.renderList = function renderList(List, messages) {
    var inputId = this.inputId;
    var activeOptionId = this.activeOptionId;
    var listId = this.listId;
    var open = this.props.open;
    var _state2 = this.state;
    var focusedItem = _state2.focusedItem;
    var items = _state2.data;


    var listProps = _3.default.pickProps(this.props, List);

    return _react2.default.createElement(List, _extends({ ref: 'list', key: 0
    }, listProps, {
      id: listId,
      activeId: activeOptionId,
      data: items,
      focused: focusedItem,
      onSelect: this.handleSelect,
      onMove: this.handleScroll,
      'aria-live': 'polite',
      'aria-labelledby': inputId,
      'aria-hidden': !open,
      messages: {
        emptyList: this._lengthWithoutValues ? messages.emptyFilter : messages.emptyList
      }
    }));
  };

  Multiselect.prototype.renderNotificationArea = function renderNotificationArea(messages) {
    var textField = this.props.textField;
    var _state3 = this.state;
    var focused = _state3.focused;
    var dataItems = _state3.dataItems;


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
  };

  Multiselect.prototype.renderTags = function renderTags(messages) {
    var _props2 = this.props;
    var disabled = _props2.disabled;
    var readOnly = _props2.readOnly;
    var valueField = _props2.valueField;
    var textField = _props2.textField;
    var _state4 = this.state;
    var focusedTag = _state4.focusedTag;
    var dataItems = _state4.dataItems;


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
  };

  Multiselect.prototype.render = function render() {
    var _this3 = this;

    var _props3 = this.props;
    var className = _props3.className;
    var groupBy = _props3.groupBy;
    var messages = _props3.messages;
    var busy = _props3.busy;
    var dropUp = _props3.dropUp;
    var open = _props3.open;
    var duration = _props3.duration;
    var List = _props3.listComponent;
    var _state5 = this.state;
    var focused = _state5.focused;
    var dataItems = _state5.dataItems;


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
        onBlur: this.focusManager.handleBlur,
        onFocus: this.focusManager.handleFocus,
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
            return _this3.refs.list.forceUpdate();
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
  };

  Multiselect.prototype.change = function change(data) {
    var _props4 = this.props;
    var onChange = _props4.onChange;
    var onSearch = _props4.onSearch;

    (0, _widgetHelpers.notify)(onChange, [data]);
    (0, _widgetHelpers.notify)(onSearch, ['']);
  };

  Multiselect.prototype.focus = function focus() {
    this.refs.input && this.refs.input.focus();
  };

  Multiselect.prototype.open = function open() {
    if (!this.props.open) (0, _widgetHelpers.notify)(this.props.onToggle, true);
  };

  Multiselect.prototype.close = function close() {
    (0, _widgetHelpers.notify)(this.props.onToggle, false);
  };

  Multiselect.prototype.isCreateTagFocused = function isCreateTagFocused() {
    var _state6 = this.state;
    var data = _state6.data;
    var focusedItem = _state6.focusedItem;


    if (!this.shouldShowCreate()) return false;

    return !data.length || focusedItem === null;
  };

  Multiselect.prototype.shouldShowCreate = function shouldShowCreate() {
    var _props5 = this.props;
    var textField = _props5.textField;
    var searchTerm = _props5.searchTerm;
    var onCreate = _props5.onCreate;
    var caseSensitive = _props5.caseSensitive;
    var _state7 = this.state;
    var data = _state7.data;
    var dataItems = _state7.dataItems;


    if (!onCreate || !searchTerm) return false;

    var lower = function lower(text) {
      return caseSensitive ? text : text.toLowerCase();
    };
    var eq = function eq(v) {
      return lower((0, _dataHelpers.dataText)(v, textField)) === lower(searchTerm);
    };

    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
    return !data.some(eq) && !dataItems.some(eq);
  };

  Multiselect.prototype.getPlaceholder = function getPlaceholder() {
    var _props6 = this.props;
    var value = _props6.value;
    var placeholder = _props6.placeholder;

    return (value && value.length ? '' : placeholder) || '';
  };

  return Multiselect;
}(_react2.default.Component), _class3.propTypes = propTypes, _class3.defaultProps = {
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
}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'handleClick', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this4 = this;

    return function () {
      _this4.open();
    };
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'handleSelect', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this5 = this;

    return function (data) {
      if (data === undefined) {
        if (_this5.props.onCreate) _this5.handleCreate(_this5.props.searchTerm);

        return;
      }
      (0, _widgetHelpers.notify)(_this5.props.onSelect, data);
      _this5.change(_this5.state.dataItems.concat(data));

      _this5.close();
      _this5.focus();
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'handleCreate', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this6 = this;

    return function (tag) {
      if (tag.trim() === '') return;

      (0, _widgetHelpers.notify)(_this6.props.onCreate, tag);
      _this6.props.searchTerm && (0, _widgetHelpers.notify)(_this6.props.onSearch, ['']);

      _this6.close();
      _this6.focus();
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'handleKeyDown', [_interaction.widgetEditable], {
  enumerable: true,
  initializer: function initializer() {
    var _this7 = this;

    return function (e) {
      var key = e.key;
      var altKey = e.altKey;
      var ctrlKey = e.ctrlKey;
      var noSearch = !_this7.props.searchTerm && !_this7._deletingText;
      var isOpen = _this7.props.open;var _state8 = _this7.state;
      var focusedTag = _state8.focusedTag;
      var focusedItem = _state8.focusedItem;
      var _refs = _this7.refs;
      var list = _refs.list;
      var tagList = _refs.tagList;

      var nullTag = { focusedTag: null };

      (0, _widgetHelpers.notify)(_this7.props.onKeyDown, [e]);

      if (e.defaultPrevented) return;

      if (key === 'ArrowDown') {
        var next = list.next(focusedItem),
            creating = _this7.shouldShowCreate() && focusedItem === next || focusedItem === null;

        next = creating ? null : next;

        e.preventDefault();
        if (isOpen) _this7.setState(_extends({ focusedItem: next }, nullTag));else _this7.open();
      } else if (key === 'ArrowUp') {
        var prev = focusedItem === null ? list.last() : list.prev(focusedItem);

        e.preventDefault();

        if (altKey) _this7.close();else if (isOpen) _this7.setState(_extends({ focusedItem: prev }, nullTag));
      } else if (key === 'End') {
        e.preventDefault();
        if (isOpen) _this7.setState(_extends({ focusedItem: list.last() }, nullTag));else tagList && _this7.setState({ focusedTag: tagList.last() });
      } else if (key === 'Home') {
        e.preventDefault();
        if (isOpen) _this7.setState(_extends({ focusedItem: list.first() }, nullTag));else tagList && _this7.setState({ focusedTag: tagList.first() });
      } else if (isOpen && key === 'Enter') {
        e.preventDefault();
        ctrlKey && _this7.props.onCreate || focusedItem === null ? _this7.handleCreate(_this7.props.searchTerm) : _this7.handleSelect(_this7.state.focusedItem);
      } else if (key === 'Escape') isOpen ? _this7.close() : tagList && _this7.setState(nullTag);else if (noSearch && key === 'ArrowLeft') tagList && _this7.setState({ focusedTag: tagList.prev(focusedTag) });else if (noSearch && key === 'ArrowRight') tagList && _this7.setState({ focusedTag: tagList.next(focusedTag) });else if (noSearch && key === 'Delete') tagList && tagList.remove(focusedTag);else if (noSearch && key === 'Backspace') tagList && tagList.removeNext();else if (noSearch && key === ' ' && !isOpen) {
        e.preventDefault();
        _this7.open();
      }
    };
  }
})), _class2)) || _class;

exports.default = (0, _uncontrollable2.default)(Multiselect, {
  open: 'onToggle',
  value: 'onChange',
  searchTerm: 'onSearch'
}, ['focus']);


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
module.exports = exports['default'];