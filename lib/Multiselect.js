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
  return typeof msgs.create === 'function' ? msgs.create(props) : [React.createElement(
    'strong',
    null,
    '"' + props.searchTerm + '"'
  ), msgs.create];
};

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

  mixins: [require('./mixins/WidgetMixin'), require('./mixins/TimeoutMixin'), require('./mixins/DataFilterMixin'), require('./mixins/DataHelpersMixin'), require('./mixins/PopupScrollToMixin'), require('./mixins/RtlParentContextMixin')],

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
        emptyFilter: 'The filter returned no results'
      }
    };
  },

  getInitialState: function getInitialState() {
    var _this = this;

    var dataItems = _.splat(this.props.value).map(function (item) {
      return _this._dataItem(_this.props.data, item);
    }),
        data = this.process(this.props.data, dataItems, this.props.searchTerm);

    return {
      focusedItem: data[0],
      processedData: data,
      dataItems: dataItems
    };
  },

  componentDidUpdate: function componentDidUpdate() {
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

    var _$omit = _.omit(this.props, Object.keys(propTypes));

    var className = _$omit.className;
    var children = _$omit.children;
    var props = babelHelpers.objectWithoutProperties(_$omit, ['className', 'children']);

    var listID = this._id('_listbox');
    var optID = this._id('_option');
    var items = this._data();
    var values = this.state.dataItems;
    var dropUp = this.props.dropUp;
    var messages = msgs(this.props.messages);
    var renderPopup = _.isFirstFocusedRender(this) || this.props.open;
    var List = this.props.listComponent || this.props.groupBy && GroupableList || PlainList;
    var listProps = _.pick(this.props, Object.keys(compat.type(List).propTypes));

    return React.createElement(
      'div',
      babelHelpers._extends({}, props, {
        ref: 'element',
        onKeyDown: this._maybeHandle(this._keyDown),
        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
        onBlur: this._focus.bind(null, false),
        tabIndex: '-1',
        className: cx(className, 'rw-multiselect', 'rw-widget', (_cx = {}, _cx['rw-state-focus'] = this.state.focused, _cx['rw-state-disabled'] = this.props.disabled === true, _cx['rw-state-readonly'] = this.props.readOnly === true, _cx['rw-rtl'] = this.isRtl(), _cx['rw-open' + (dropUp ? '-up' : '')] = this.props.open, _cx)) }),
      React.createElement(
        'div',
        { className: 'rw-multiselect-wrapper', ref: 'wrapper' },
        this.props.busy && React.createElement('i', { className: 'rw-i rw-loading' }),
        !!values.length && React.createElement(TagList, {
          ref: 'tagList',
          value: values,
          textField: this.props.textField,
          valueField: this.props.valueField,
          valueComponent: this.props.tagComponent,
          disabled: this.props.disabled,
          readOnly: this.props.readOnly,
          onDelete: this._delete }),
        React.createElement(SelectInput, {
          ref: 'input',
          tabIndex: props.tabIndex,
          'aria-activedescendent': this.props.open ? optID : undefined,
          'aria-expanded': this.props.open,
          'aria-busy': !!this.props.busy,
          'aria-owns': listID,
          'aria-haspopup': true,
          value: this.props.searchTerm,
          disabled: this.props.disabled === true,
          readOnly: this.props.readOnly === true,
          placeholder: this._placeholder(),
          onKeyDown: this._searchKeyDown,
          onKeyUp: this._searchgKeyUp,
          onChange: this._typing,
          onFocus: this._inputFocus,
          onClick: this._inputFocus,
          maxLength: this.props.maxLength })
      ),
      React.createElement(
        Popup,
        babelHelpers._extends({}, _.pick(this.props, Object.keys(compat.type(Popup).propTypes)), {
          onOpening: function () {
            return _this3.refs.list.forceUpdate();
          },
          onRequestClose: this.close }),
        React.createElement(
          'div',
          null,
          renderPopup && [React.createElement(List, babelHelpers._extends({ ref: 'list', key: '0'
          }, listProps, {
            readOnly: !!listProps.readOnly,
            disabled: !!listProps.disabled,
            id: listID,
            optID: optID,
            'aria-autocomplete': 'list',
            'aria-hidden': !this.props.open,
            data: items,
            focused: this.state.focusedItem,
            onSelect: this._maybeHandle(this._onSelect),
            onMove: this._scrollTo,
            messages: {
              emptyList: this.props.data.length ? messages.emptyFilter : messages.emptyList
            } })), this._shouldShowCreate() && React.createElement(
            'ul',
            { className: 'rw-list rw-multiselect-create-tag', key: '1' },
            React.createElement(
              'li',
              { onClick: this._onCreate.bind(null, this.props.searchTerm),
                className: cx({
                  'rw-list-option': true,
                  'rw-state-focus': !this._data().length || this.state.focusedItem === null
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
      if (!focused) _this4.refs.tagList && _this4.refs.tagList.clear();

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
    var key = e.key,
        alt = e.altKey,
        ctrl = e.ctrlKey,
        noSearch = !this.props.searchTerm && !this._deletingText,
        isOpen = this.props.open,
        focusedItem = this.state.focusedItem,
        tagList = this.refs.tagList,
        list = this.refs.list;

    if (key === 'ArrowDown') {
      var next = list.next(focusedItem),
          creating = this._shouldShowCreate() && focusedItem === next || focusedItem === null;

      next = creating ? null : next;

      e.preventDefault();
      if (isOpen) this.setState({ focusedItem: next });else this.open();
    } else if (key === 'ArrowUp') {
      var prev = focusedItem === null ? list.last() : list.prev(focusedItem);

      e.preventDefault();

      if (alt) this.close();else if (isOpen) this.setState({ focusedItem: prev });
    } else if (key === 'End') {
      if (isOpen) this.setState({ focusedItem: list.last() });else tagList && tagList.last();
    } else if (key === 'Home') {
      if (isOpen) this.setState({ focusedItem: list.first() });else tagList && tagList.first();
    } else if (isOpen && key === 'Enter') ctrl && this.props.onCreate || focusedItem === null ? this._onCreate(this.props.searchTerm) : this._onSelect(this.state.focusedItem);else if (key === 'Escape') isOpen ? this.close() : tagList && tagList.clear();else if (noSearch && key === 'ArrowLeft') tagList && tagList.prev();else if (noSearch && key === 'ArrowRight') tagList && tagList.next();else if (noSearch && key === 'Delete') tagList && tagList.removeCurrent();else if (noSearch && key === 'Backspace') tagList && tagList.removeNext();

    this.notify('onKeyDown', [e]);
  },

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
    emptyFilter: 'The filter returned no results' }, msgs);
}

module.exports = createUncontrolledWidget(Multiselect, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' });

// function defaultChange(){
//   if ( this.props.searchTerm === undefined )
//     this.setState({ searchTerm: '' })
// }

module.exports.BaseMultiselect = Multiselect;