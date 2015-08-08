'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var React = require('react'),
    cx = require('classnames'),
    _ = require('./util/_'),
    support = require('./util/dom/support'),
    compat = require('./util/compat'),
    SelectInput = require('./MultiselectInput'),
    TagList = require('./MultiselectTagList'),
    Popup = require('./Popup'),
    PlainList = require('./List'),
    GroupableList = require('./ListGroupable'),
    validateList = require('./util/validateListInterface'),
    createUncontrolledWidget = require('uncontrollable'),
    CustomPropTypes = require('./util/propTypes');

var compatCreate = function compatCreate(props, msgs) {
  return typeof msgs.createNew === 'function' ? msgs.createNew(props) : [React.createElement(
    'strong',
    null,
    '"' + props.searchTerm + '"'
  ), ' ' + msgs.createNew];
};

var omit = _.omit;
var pick = _.pick;
var result = _.result;
var splat = _.splat;

var propTypes = {
  data: React.PropTypes.array,
  //-- controlled props --
  value: React.PropTypes.array,
  onChange: React.PropTypes.func,

  searchTerm: React.PropTypes.string,
  onSearch: React.PropTypes.func,

  open: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  //-------------------------------------------

  valueField: React.PropTypes.string,
  textField: CustomPropTypes.accessor,

  tagComponent: CustomPropTypes.elementType,
  itemComponent: CustomPropTypes.elementType,
  listComponent: CustomPropTypes.elementType,

  groupComponent: CustomPropTypes.elementType,
  groupBy: CustomPropTypes.accessor,

  createComponent: CustomPropTypes.elementType,

  onSelect: React.PropTypes.func,
  onCreate: React.PropTypes.oneOfType([React.PropTypes.oneOf([false]), React.PropTypes.func]),

  dropUp: React.PropTypes.bool,
  duration: React.PropTypes.number, //popup

  placeholder: React.PropTypes.string,

  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.array, React.PropTypes.oneOf(['disabled'])]),

  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.array, React.PropTypes.oneOf(['readonly'])]),

  messages: React.PropTypes.shape({
    open: CustomPropTypes.message,
    emptyList: CustomPropTypes.message,
    emptyFilter: CustomPropTypes.message,
    createNew: CustomPropTypes.message
  })
};

var Multiselect = React.createClass({

  displayName: 'Multiselect',

  mixins: [require('./mixins/WidgetMixin'), require('./mixins/TimeoutMixin'), require('./mixins/DataFilterMixin'), require('./mixins/DataHelpersMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')('input', function (key, id) {
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
    var _this = this;

    var dataItems = splat(this.props.value).map(function (item) {
      return _this._dataItem(_this.props.data, item);
    }),
        data = this.process(this.props.data, dataItems, this.props.searchTerm);

    return {
      focusedTag: null,
      focusedItem: data[0],
      processedData: data,
      dataItems: dataItems
    };
  },

  componentDidUpdate: function componentDidUpdate() {
    this.ariaActiveDescendant(this._id('__createlist_option'));

    this.refs.list && validateList(this.refs.list);
  },

  componentDidMount: function componentDidMount() {
    // https://github.com/facebook/react/issues/1169
    if (support.ios) compat.findDOMNode(this.refs.wrapper).onClick = function () {};
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    var values = _.splat(nextProps.value),
        current = this.state.focusedItem,
        items = this.process(nextProps.data, values, nextProps.searchTerm);

    this.setState({
      processedData: items,
      focusedItem: items.indexOf(current) === -1 ? items[0] : current,
      dataItems: values.map(function (item) {
        return _this2._dataItem(nextProps.data, item);
      })
    });
  },

  render: function render() {
    var _cx,
        _this3 = this;

    var _props = this.props;
    var searchTerm = _props.searchTerm;
    var maxLength = _props.maxLength;
    var className = _props.className;
    var children = _props.children;
    var tabIndex = _props.tabIndex;
    var groupBy = _props.groupBy;
    var messages = _props.messages;
    var data = _props.data;
    var busy = _props.busy;
    var dropUp = _props.dropUp;
    var placeholder = _props.placeholder;
    var value = _props.value;
    var open = _props.open;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;
    var TagComponent = _props.tagComponent;
    var List = _props.listComponent;

    List = List || groupBy && GroupableList || PlainList;

    messages = msgs(messages);

    var elementProps = omit(this.props, Object.keys(propTypes));
    var tagsProps = pick(this.props, ['valueField', 'textField']);
    var inputProps = pick(this.props, ['maxLength', 'searchTerm']);
    var listProps = pick(this.props, Object.keys(compat.type(List).propTypes));
    var popupProps = pick(this.props, Object.keys(compat.type(Popup).propTypes));

    var _state = this.state;
    var focusedTag = _state.focusedTag;
    var focusedItem = _state.focusedItem;
    var selectedItem = _state.selectedItem;
    var focused = _state.focused;
    var dataItems = _state.dataItems;

    var items = this._data(),
        tagsID = this._id('_taglist'),
        listID = this._id('__listbox'),
        createID = this._id('__createlist'),
        createOptionID = this._id('__createlist_option');

    var shouldRenderTags = !!dataItems.length,
        shouldRenderPopup = _.isFirstFocusedRender(this) || open,
        shouldShowCreate = this._shouldShowCreate(),
        createIsFocused = !items.length || focusedItem === null;

    if (focused) {
      var notify = dataItems.length ? messages.selectedItems + ': ' + dataItems.map(this._dataText).join(', ') : messages.noneSelected;
    }

    return React.createElement(
      'div',
      babelHelpers._extends({}, elementProps, {
        ref: 'element',
        id: this._id(),
        onKeyDown: this._maybeHandle(this._keyDown),
        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
        onBlur: this._focus.bind(null, false),
        tabIndex: '-1',
        className: cx(className, 'rw-widget', 'rw-multiselect', (_cx = {}, _cx['rw-state-focus'] = focused, _cx['rw-state-disabled'] = disabled === true, _cx['rw-state-readonly'] = readOnly === true, _cx['rw-rtl'] = this.isRtl(), _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
      React.createElement(
        'span',
        {
          ref: 'status',
          id: this._id('__notify'),
          role: 'status',
          className: 'sr-only',
          'aria-live': 'assertive',
          'aria-atomic': 'true',
          'aria-relevant': 'additions removals text'
        },
        notify
      ),
      React.createElement(
        'div',
        { className: 'rw-multiselect-wrapper', ref: 'wrapper' },
        busy && React.createElement('i', { className: 'rw-i rw-loading' }),
        shouldRenderTags && React.createElement(TagList, babelHelpers._extends({}, tagsProps, {
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
        React.createElement(SelectInput, babelHelpers._extends({}, inputProps, {
          ref: 'input',
          tabIndex: tabIndex || 0,
          role: 'listbox',
          'aria-expanded': open,
          'aria-busy': !!busy,
          'aria-owns': listID + ' ' + this._id('__notify') + (shouldRenderTags ? ' ' + tagsID : '') + (shouldShowCreate ? ' ' + createID : ''),
          'aria-haspopup': true,
          value: searchTerm,
          maxLength: maxLength,
          disabled: disabled === true,
          readOnly: readOnly === true,
          placeholder: this._placeholder(),
          onKeyDown: this._searchKeyDown,
          onKeyUp: this._searchgKeyUp,
          onChange: this._typing,
          onFocus: this._inputFocus,
          onClick: this._inputFocus
        }))
      ),
      React.createElement(
        Popup,
        babelHelpers._extends({}, popupProps, {
          onOpening: function () {
            return _this3.refs.list.forceUpdate();
          },
          onRequestClose: this.close
        }),
        React.createElement(
          'div',
          null,
          shouldRenderPopup && [React.createElement(List, babelHelpers._extends({ ref: 'list',
            key: '0'
          }, listProps, {
            readOnly: !!readOnly,
            disabled: !!disabled,
            id: listID,
            'aria-live': 'polite',
            'aria-labelledby': this._id(),
            'aria-hidden': !open,
            ariaActiveDescendantKey: 'list',
            data: items,
            focused: focusedItem,
            onSelect: this._maybeHandle(this._onSelect),
            onMove: this._scrollTo,
            messages: {
              emptyList: data.length ? messages.emptyFilter : messages.emptyList
            }
          })), shouldShowCreate && React.createElement(
            'ul',
            { role: 'listbox', id: createID, className: 'rw-list rw-multiselect-create-tag', key: '1' },
            React.createElement(
              'li',
              { onClick: this._onCreate.bind(null, searchTerm),
                role: 'option',
                id: createOptionID,
                className: cx({
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
    this._focus(true);
    this.change(this.state.dataItems.filter(function (d) {
      return d !== value;
    }));
  },

  _inputFocus: function _inputFocus() {
    this._focus(true);
    !this.props.open && this.open();
  },

  _focus: function _focus(focused, e) {
    var _this4 = this;

    if (this.props.disabled === true) return;

    if (focused) this.refs.input.focus();

    this.setTimeout('focus', function () {
      if (!focused) _this4.refs.tagList && _this4.setState({ focusedTag: null });

      if (focused !== _this4.state.focused) {
        focused ? _this4.open() : _this4.close();

        _this4.notify(focused ? 'onFocus' : 'onBlur', e);
        _this4.setState({ focused: focused });
      }
    });
  },

  _searchKeyDown: function _searchKeyDown(e) {
    if (e.key === 'Backspace' && e.target.value && !this._deletingText) this._deletingText = true;
  },

  _searchgKeyUp: function _searchgKeyUp(e) {
    if (e.key === 'Backspace' && this._deletingText) this._deletingText = false;
  },

  _typing: function _typing(e) {
    this.notify('onSearch', [e.target.value]);
    this.open();
  },

  _onSelect: function _onSelect(data) {

    if (data === undefined) {
      if (this.props.onCreate) this._onCreate(this.props.searchTerm);

      return;
    }

    this.notify('onSelect', data);
    this.change(this.state.dataItems.concat(data));

    this.close();
    this._focus(true);
  },

  _onCreate: function _onCreate(tag) {
    if (tag.trim() === '') return;

    this.notify('onCreate', tag);
    this.props.searchTerm && this.notify('onSearch', ['']);

    this.close();
    this._focus(true);
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
      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: list.last() }, nullTag));else tagList && this.setState({ focusedTag: tagList.last() });
    } else if (key === 'Home') {
      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: list.first() }, nullTag));else tagList && this.setState({ focusedTag: tagList.first() });
    } else if (isOpen && key === 'Enter') ctrlKey && this.props.onCreate || focusedItem === null ? this._onCreate(this.props.searchTerm) : this._onSelect(this.state.focusedItem);else if (key === 'Escape') isOpen ? this.close() : tagList && this.setState(nullTag);else if (noSearch && key === 'ArrowLeft') tagList && this.setState({ focusedTag: tagList.prev(focusedTag) });else if (noSearch && key === 'ArrowRight') tagList && this.setState({ focusedTag: tagList.next(focusedTag) });else if (noSearch && key === 'Delete') tagList && tagList.remove(focusedTag);else if (noSearch && key === 'Backspace') tagList && tagList.removeNext();

    this.notify('onKeyDown', [e]);
  },

  // _firstFocus(){
  //   this.open()
  // }

  change: function change(data) {
    this.notify('onChange', [data]);
    this.props.searchTerm && this.notify('onSearch', ['']);
  },

  open: function open() {
    if (!(this.props.disabled === true || this.props.readOnly === true)) this.notify('onToggle', true);
  },

  close: function close() {
    this.notify('onToggle', false);
  },

  toggle: function toggle() {
    this.props.open ? this.close() : this.open();
  },

  process: function process(data, values, searchTerm) {
    var _this5 = this;

    var items = data.filter(function (i) {
      return !values.some(_this5._valueMatcher.bind(null, i), _this5);
    }, this);

    if (searchTerm) items = this.filter(items, searchTerm);

    return items;
  },

  _shouldShowCreate: function _shouldShowCreate() {
    var _this6 = this;

    var text = this.props.searchTerm;

    if (!this.props.onCreate || !text) return false;

    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
    return !this._data().some(function (v) {
      return _this6._dataText(v) === text;
    }) && !this.state.dataItems.some(function (v) {
      return _this6._dataText(v) === text;
    });
  },

  _placeholder: function _placeholder() {
    return (this.props.value || []).length ? '' : this.props.placeholder || '';
  }

});

function msgs(msgs) {
  return babelHelpers._extends({
    createNew: '(create new tag)',
    emptyList: 'There are no items in this list',
    emptyFilter: 'The filter returned no results',
    tagsLabel: 'selected items',
    selectedItems: 'selected items',
    removeLabel: 'remove selected item' }, msgs);
}

module.exports = createUncontrolledWidget(Multiselect, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' });

// function defaultChange(){
//   if ( this.props.searchTerm === undefined )
//     this.setState({ searchTerm: '' })
// }

module.exports.BaseMultiselect = Multiselect;