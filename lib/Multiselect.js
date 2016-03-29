'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _Popup = require('./Popup');

var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

var _MultiselectInput = require('./MultiselectInput');

var _MultiselectInput2 = babelHelpers.interopRequireDefault(_MultiselectInput);

var _MultiselectTagList = require('./MultiselectTagList');

var _MultiselectTagList2 = babelHelpers.interopRequireDefault(_MultiselectTagList);

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

var compatCreate = function compatCreate(props, msgs) {
  return typeof msgs.createNew === 'function' ? msgs.createNew(props) : [_react2['default'].createElement(
    'strong',
    { key: 'dumb' },
    '"' + props.searchTerm + '"'
  ), ' ' + msgs.createNew];
};

var omit = _util_2['default'].omit;
var pick = _util_2['default'].pick;
var splat = _util_2['default'].splat;

var propTypes = {
  data: _react2['default'].PropTypes.array,
  //-- controlled props --
  value: _react2['default'].PropTypes.array,
  onChange: _react2['default'].PropTypes.func,

  searchTerm: _react2['default'].PropTypes.string,
  onSearch: _react2['default'].PropTypes.func,

  open: _react2['default'].PropTypes.bool,
  onToggle: _react2['default'].PropTypes.func,
  //-------------------------------------------

  valueField: _react2['default'].PropTypes.string,
  textField: _utilPropTypes2['default'].accessor,

  tagComponent: _utilPropTypes2['default'].elementType,
  itemComponent: _utilPropTypes2['default'].elementType,
  listComponent: _utilPropTypes2['default'].elementType,

  groupComponent: _utilPropTypes2['default'].elementType,
  groupBy: _utilPropTypes2['default'].accessor,

  createComponent: _utilPropTypes2['default'].elementType,

  onSelect: _react2['default'].PropTypes.func,
  onCreate: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf([false]), _react2['default'].PropTypes.func]),

  dropUp: _react2['default'].PropTypes.bool,
  duration: _react2['default'].PropTypes.number, //popup

  placeholder: _react2['default'].PropTypes.string,

  autoFocus: _react2['default'].PropTypes.bool,
  disabled: _utilPropTypes2['default'].disabled.acceptsArray,
  readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

  messages: _react2['default'].PropTypes.shape({
    open: _utilPropTypes2['default'].message,
    emptyList: _utilPropTypes2['default'].message,
    emptyFilter: _utilPropTypes2['default'].message,
    createNew: _utilPropTypes2['default'].message
  })
};

var Multiselect = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
  key: 'displayName',
  initializer: function initializer() {
    return 'Multiselect';
  }
}, {
  key: 'mixins',
  initializer: function initializer() {
    return [require('./mixins/TimeoutMixin'), require('./mixins/DataFilterMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/FocusMixin')({
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
    })];
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
  }
}, {
  key: 'getInitialState',
  value: function getInitialState() {
    var _props = this.props;
    var data = _props.data;
    var value = _props.value;
    var valueField = _props.valueField;
    var searchTerm = _props.searchTerm;
    var dataItems = splat(value).map(function (item) {
      return _utilDataHelpers.dataItem(data, item, valueField);
    });
    var processedData = this.process(data, dataItems, searchTerm);

    return {
      focusedTag: null,
      focusedItem: processedData[0],
      processedData: processedData,
      dataItems: dataItems
    };
  }
}, {
  key: 'componentDidUpdate',
  value: function componentDidUpdate() {
    this.ariaActiveDescendant(_utilWidgetHelpers.instanceId(this, '__createlist_option'));

    this.refs.list && _utilValidateListInterface2['default'](this.refs.list);
  }
}, {
  key: 'componentWillReceiveProps',
  value: function componentWillReceiveProps(nextProps) {
    var data = nextProps.data;
    var value = nextProps.value;
    var valueField = nextProps.valueField;
    var searchTerm = nextProps.searchTerm;
    var values = _util_2['default'].splat(value);
    var current = this.state.focusedItem;
    var items = this.process(data, values, searchTerm);

    this.setState({
      processedData: items,
      focusedItem: items.indexOf(current) === -1 ? items[0] : current,
      dataItems: values.map(function (item) {
        return _utilDataHelpers.dataItem(data, item, valueField);
      })
    });
  }
}, {
  key: 'render',
  value: function render() {
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

    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

    messages = msgs(messages);

    var elementProps = omit(this.props, Object.keys(propTypes));
    var tagsProps = pick(this.props, ['valueField', 'textField']);
    var inputProps = pick(this.props, ['maxLength', 'searchTerm', 'autoFocus']);
    var listProps = pick(this.props, Object.keys(List.propTypes));
    var popupProps = pick(this.props, Object.keys(_Popup2['default'].propTypes));

    var _state = this.state;
    var focusedTag = _state.focusedTag;
    var focusedItem = _state.focusedItem;
    var focused = _state.focused;
    var dataItems = _state.dataItems;

    var items = this._data(),
        tagsID = _utilWidgetHelpers.instanceId(this, '_taglist'),
        listID = _utilWidgetHelpers.instanceId(this, '__listbox'),
        createID = _utilWidgetHelpers.instanceId(this, '__createlist'),
        createOptionID = _utilWidgetHelpers.instanceId(this, '__createlist_option');

    var shouldRenderTags = !!dataItems.length,
        shouldRenderPopup = _utilWidgetHelpers.isFirstFocusedRender(this) || open,
        shouldShowCreate = this._shouldShowCreate(),
        createIsFocused = !items.length || focusedItem === null;

    if (focused) {
      var notify = dataItems.length ? messages.selectedItems + ': ' + dataItems.map(function (item) {
        return _utilDataHelpers.dataText(item, textField);
      }).join(', ') : messages.noneSelected;
    }

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, elementProps, {
        ref: 'element',
        id: _utilWidgetHelpers.instanceId(this),
        onKeyDown: this._keyDown,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        onTouchEnd: this.handleFocus,
        tabIndex: '-1',
        className: _classnames2['default'](className, 'rw-widget', 'rw-multiselect', (_cx = {
          'rw-state-focus': focused,
          'rw-state-disabled': disabled === true,
          'rw-state-readonly': readOnly === true,
          'rw-rtl': this.isRtl()
        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
      _react2['default'].createElement(
        'span',
        {
          ref: 'status',
          id: _utilWidgetHelpers.instanceId(this, '__notify'),
          role: 'status',
          className: 'rw-sr',
          'aria-live': 'assertive',
          'aria-atomic': 'true',
          'aria-relevant': 'additions removals text'
        },
        notify
      ),
      _react2['default'].createElement(
        'div',
        { className: 'rw-multiselect-wrapper', ref: 'wrapper' },
        busy && _react2['default'].createElement('i', { className: 'rw-i rw-loading' }),
        shouldRenderTags && _react2['default'].createElement(_MultiselectTagList2['default'], babelHelpers._extends({}, tagsProps, {
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
        _react2['default'].createElement(_MultiselectInput2['default'], babelHelpers._extends({}, inputProps, {
          ref: 'input',
          tabIndex: tabIndex || 0,
          role: 'listbox',
          'aria-expanded': open,
          'aria-busy': !!busy,
          autoFocus: this.props.autoFocus,
          'aria-owns': listID + ' ' + _utilWidgetHelpers.instanceId(this, '__notify') + (shouldRenderTags ? ' ' + tagsID : '') + (shouldShowCreate ? ' ' + createID : ''),
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
          shouldRenderPopup && [_react2['default'].createElement(List, babelHelpers._extends({ ref: 'list',
            key: 0
          }, listProps, {
            readOnly: readOnly,
            disabled: disabled,
            id: listID,
            'aria-live': 'polite',
            'aria-labelledby': _utilWidgetHelpers.instanceId(this),
            'aria-hidden': !open,
            ariaActiveDescendantKey: 'list',
            data: items,
            focused: focusedItem,
            onSelect: this._onSelect,
            onMove: this._scrollTo,
            messages: {
              emptyList: this._lengthWithoutValues ? messages.emptyFilter : messages.emptyList
            }
          })), shouldShowCreate && _react2['default'].createElement(
            'ul',
            { key: 1, role: 'listbox', id: createID, className: 'rw-list rw-multiselect-create-tag' },
            _react2['default'].createElement(
              'li',
              { onClick: this._onCreate.bind(null, searchTerm),
                role: 'option',
                id: createOptionID,
                className: _classnames2['default']({
                  'rw-list-option': true,
                  'rw-state-focus': createIsFocused
                }) },
              compatCreate(this.props, messages)
            )
          )]
        )
      )
    );
  }
}, {
  key: '_data',
  value: function _data() {
    return this.state.processedData;
  }
}, {
  key: '_delete',
  value: function _delete(value) {
    this.focus();
    this.change(this.state.dataItems.filter(function (d) {
      return d !== value;
    }));
  }
}, {
  key: '_searchKeyDown',
  value: function _searchKeyDown(e) {
    if (e.key === 'Backspace' && e.target.value && !this._deletingText) this._deletingText = true;
  }
}, {
  key: '_searchgKeyUp',
  value: function _searchgKeyUp(e) {
    if (e.key === 'Backspace' && this._deletingText) this._deletingText = false;
  }
}, {
  key: '_typing',
  value: function _typing(e) {
    _utilWidgetHelpers.notify(this.props.onSearch, [e.target.value]);
    this.open();
  }
}, {
  key: 'handleInputInteraction',
  decorators: [_utilInteraction.widgetEditable],
  value: function handleInputInteraction() {
    this.open();
  }
}, {
  key: '_onSelect',
  decorators: [_utilInteraction.widgetEditable],
  value: function _onSelect(data) {

    if (data === undefined) {
      if (this.props.onCreate) this._onCreate(this.props.searchTerm);

      return;
    }

    _utilWidgetHelpers.notify(this.props.onSelect, data);
    this.change(this.state.dataItems.concat(data));

    this.close();
    this.focus();
  }
}, {
  key: '_onCreate',
  decorators: [_utilInteraction.widgetEditable],
  value: function _onCreate(tag) {
    if (tag.trim() === '') return;

    _utilWidgetHelpers.notify(this.props.onCreate, tag);
    this.props.searchTerm && _utilWidgetHelpers.notify(this.props.onSearch, ['']);

    this.close();
    this.focus();
  }
}, {
  key: '_keyDown',
  decorators: [_utilInteraction.widgetEditable],
  value: function _keyDown(e) {
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

    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (key === 'ArrowDown') {
      var next = list.next(focusedItem),
          creating = this._shouldShowCreate() && focusedItem === next || focusedItem === null;

      next = creating ? null : next;

      e.preventDefault();
      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: next }, nullTag));else this.open();
    } else if (key === 'ArrowUp') {
      var prev = focusedItem === null ? list.last() : list.prev(focusedItem);

      e.preventDefault();

      if (altKey) this.close();else if (isOpen) this.setState(babelHelpers._extends({ focusedItem: prev }, nullTag));
    } else if (key === 'End') {
      e.preventDefault();
      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: list.last() }, nullTag));else tagList && this.setState({ focusedTag: tagList.last() });
    } else if (key === 'Home') {
      e.preventDefault();
      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: list.first() }, nullTag));else tagList && this.setState({ focusedTag: tagList.first() });
    } else if (isOpen && key === 'Enter') {
      e.preventDefault();
      ctrlKey && this.props.onCreate || focusedItem === null ? this._onCreate(this.props.searchTerm) : this._onSelect(this.state.focusedItem);
    } else if (key === 'Escape') isOpen ? this.close() : tagList && this.setState(nullTag);else if (noSearch && key === 'ArrowLeft') tagList && this.setState({ focusedTag: tagList.prev(focusedTag) });else if (noSearch && key === 'ArrowRight') tagList && this.setState({ focusedTag: tagList.next(focusedTag) });else if (noSearch && key === 'Delete') tagList && tagList.remove(focusedTag);else if (noSearch && key === 'Backspace') tagList && tagList.removeNext();
  }
}, {
  key: 'change',
  decorators: [_utilInteraction.widgetEditable],
  value: function change(data) {
    _utilWidgetHelpers.notify(this.props.onChange, [data]);
    _utilWidgetHelpers.notify(this.props.onSearch, ['']);
  }
}, {
  key: 'focus',
  value: function focus() {
    this.refs.input.focus();
  }
}, {
  key: 'open',
  value: function open() {
    if (!this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, true);
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
}, {
  key: 'process',
  value: function process(data, values, searchTerm) {
    var valueField = this.props.valueField;

    var items = data.filter(function (i) {
      return !values.some(function (v) {
        return _utilDataHelpers.valueMatcher(i, v, valueField);
      });
    });

    this._lengthWithoutValues = items.length;

    if (searchTerm) items = this.filter(items, searchTerm);

    return items;
  }
}, {
  key: '_shouldShowCreate',
  value: function _shouldShowCreate() {
    var _props3 = this.props;
    var textField = _props3.textField;
    var searchTerm = _props3.searchTerm;
    var onCreate = _props3.onCreate;

    if (!onCreate || !searchTerm) return false;

    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
    return !this._data().some(function (v) {
      return _utilDataHelpers.dataText(v, textField) === searchTerm;
    }) && !this.state.dataItems.some(function (v) {
      return _utilDataHelpers.dataText(v, textField) === searchTerm;
    });
  }
}, {
  key: '_placeholder',
  value: function _placeholder() {
    return (this.props.value || []).length ? '' : this.props.placeholder || '';
  }
}]));

function msgs(msgs) {
  return babelHelpers._extends({
    createNew: '(create new tag)',
    emptyList: 'There are no items in this list',
    emptyFilter: 'The filter returned no results',
    tagsLabel: 'selected items',
    selectedItems: 'selected items',
    removeLabel: 'remove selected item'
  }, msgs);
}

exports['default'] = _uncontrollable2['default'](Multiselect, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }, ['focus']);
module.exports = exports['default'];