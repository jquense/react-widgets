'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

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

var _domHelpersUtilScrollTo = require('dom-helpers/util/scrollTo');

var _domHelpersUtilScrollTo2 = babelHelpers.interopRequireDefault(_domHelpersUtilScrollTo);

var omit = _util_2['default'].omit;
var pick = _util_2['default'].pick;
var result = _util_2['default'].result;

var propTypes = {

  data: _react2['default'].PropTypes.array,
  value: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.any, _react2['default'].PropTypes.array]),
  onChange: _react2['default'].PropTypes.func,
  onMove: _react2['default'].PropTypes.func,

  multiple: _react2['default'].PropTypes.bool,

  itemComponent: _utilPropTypes2['default'].elementType,
  listComponent: _utilPropTypes2['default'].elementType,

  valueField: _react2['default'].PropTypes.string,
  textField: _utilPropTypes2['default'].accessor,

  busy: _react2['default'].PropTypes.bool,

  filter: _react2['default'].PropTypes.string,
  delay: _react2['default'].PropTypes.number,

  disabled: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(['disabled'])]),

  readOnly: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.array, _react2['default'].PropTypes.oneOf(['readonly'])]),

  messages: _react2['default'].PropTypes.shape({
    emptyList: _react2['default'].PropTypes.string
  })
};

var SelectList = _react2['default'].createClass({
  displayName: 'SelectList',

  propTypes: propTypes,

  mixins: [require('./mixins/WidgetMixin'), require('./mixins/TimeoutMixin'), require('./mixins/DataHelpersMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')()],

  getDefaultProps: function getDefaultProps() {
    return {
      delay: 250,
      value: [],
      data: [],
      ariaActiveDescendantKey: 'selectlist',
      messages: {
        emptyList: 'There are no items in this list'
      }
    };
  },

  getDefaultState: function getDefaultState(props) {
    var _this = this;

    var isRadio = !props.multiple,
        values = _util_2['default'].splat(props.value),
        first = isRadio && this._dataItem(props.data, values[0]);

    first = isRadio && first ? first : (this.state || {}).focusedItem || null;

    return {
      focusedItem: first,
      dataItems: !isRadio && values.map(function (item) {
        return _this._dataItem(props.data, item);
      })
    };
  },

  getInitialState: function getInitialState() {
    var state = this.getDefaultState(this.props);

    state.ListItem = getListItem(this);

    return state;
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    return this.setState(this.getDefaultState(nextProps));
  },

  componentDidMount: function componentDidMount() {
    (0, _utilValidateListInterface2['default'])(this.refs.list);
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var tabIndex = _props.tabIndex;
    var filter = _props.filter;
    var suggest = _props.suggest;
    var groupBy = _props.groupBy;
    var messages = _props.messages;
    var data = _props.data;
    var busy = _props.busy;
    var dropUp = _props.dropUp;
    var name = _props.name;
    var placeholder = _props.placeholder;
    var value = _props.value;
    var open = _props.open;
    var disabled = _props.disabled;
    var readOnly = _props.readOnly;
    var List = _props.listComponent;

    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

    var elementProps = omit(this.props, Object.keys(propTypes));
    var listProps = pick(this.props, Object.keys(_utilCompat2['default'].type(List).propTypes));

    var _state = this.state;
    var ListItem = _state.ListItem;
    var focusedItem = _state.focusedItem;
    var selectedItem = _state.selectedItem;
    var focused = _state.focused;

    var items = this._data(),
        listID = this._id('_listbox');

    focusedItem = focused && !this.isDisabled() && !this.isReadOnly() && focusedItem;

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, elementProps, {
        onKeyDown: this._maybeHandle(this._keyDown),
        onFocus: this._focus.bind(null, true),
        onBlur: this._focus.bind(null, false),
        role: 'radiogroup',
        'aria-busy': !!busy,
        'aria-disabled': this.isDisabled(),
        'aria-readonly': this.isReadOnly(),
        tabIndex: '-1',
        className: (0, _classnames2['default'])(className, 'rw-widget', 'rw-selectlist', {
          'rw-state-focus': focused,
          'rw-state-disabled': this.isDisabled(),
          'rw-state-readonly': this.isReadOnly(),
          'rw-rtl': this.isRtl(),
          'rw-loading-mask': busy
        })
      }),
      _react2['default'].createElement(List, babelHelpers._extends({}, listProps, {
        ref: 'list',
        id: listID,
        role: 'radiogroup',
        tabIndex: tabIndex || '0',
        data: items,
        focused: focusedItem,
        optionComponent: ListItem,
        itemComponent: this.props.itemComponent,
        onMove: this._scrollTo
      }))
    );
  },

  _scrollTo: function _scrollTo(selected, list) {
    var handler = this.props.onMove;

    if (handler) handler(selected, list);else {
      this._scrollCancel && this._scrollCancel();
      // default behavior is to scroll the whole page not just the widget
      this._scrollCancel = (0, _domHelpersUtilScrollTo2['default'])(selected);
    }
  },

  _keyDown: function _keyDown(e) {
    var self = this,
        key = e.key,
        multiple = !!this.props.multiple,
        list = this.refs.list,
        focusedItem = this.state.focusedItem;

    if (key === 'End') {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: move('prev', null) });else change(move('prev', null));
    } else if (key === 'Home') {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: move('next', null) });else change(move('next', null));
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      change(focusedItem);
    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: move('next', focusedItem) });else change(move('next', focusedItem));
    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: move('prev', focusedItem) });else change(move('prev', focusedItem));
    } else if (this.props.multiple && e.keyCode === 65 && e.ctrlKey) {
      e.preventDefault();
      this._selectAll();
    } else this.search(String.fromCharCode(e.keyCode));

    function change(item) {
      if (item) {
        self._change(item, multiple ? !self._contains(item, self._values()) // toggle value
        : true);
      }
    }

    function move(dir, item) {
      var isDisabled = function isDisabled(item) {
        return self.isDisabledItem(item) || self.isReadOnlyItem(item);
      },
          stop = dir === 'next' ? list.last() : list.first(),
          next = list[dir](item);

      while (next !== stop && isDisabled(next)) next = list[dir](next);

      return isDisabled(next) ? item : next;
    }
  },

  _selectAll: function _selectAll() {
    var _this2 = this;

    var values = this.state.dataItems,
        disabled = this.props.disabled || this.props.readOnly,
        data = this._data(),
        blacklist;

    disabled = Array.isArray(disabled) ? disabled : [];
    //disabled values that are not selected
    blacklist = disabled.filter(function (v) {
      return !_this2._contains(v, values);
    });
    data = data.filter(function (v) {
      return !_this2._contains(v, blacklist);
    });

    if (data.length === values.length) {
      data = disabled.filter(function (v) {
        return _this2._contains(v, values);
      });
      data = data.map(function (v) {
        return _this2._dataItem(_this2._data(), v);
      });
    }

    this.notify('onChange', [data]);
  },

  _change: function _change(item, checked) {
    var multiple = !!this.props.multiple,
        blacklist = this.props.disabled || this.props.readOnly,
        values = this.state.dataItems;

    blacklist = Array.isArray(blacklist) ? blacklist : [];

    if (!multiple) return this.notify('onChange', checked ? item : null);

    values = checked ? values.concat(item) : values.filter(function (v) {
      return v !== item;
    });

    this.notify('onChange', [values || []]);
  },

  _focus: _util_2['default'].ifNotDisabled(true, function (focused, e) {
    var _this3 = this;

    if (focused) _utilCompat2['default'].findDOMNode(this.refs.list).focus();

    this.setTimeout('focus', function () {
      if (focused !== _this3.state.focused) {
        _this3.notify(focused ? 'onFocus' : 'onBlur', e);
        _this3.setState({ focused: focused });
      }
    });
  }),

  isDisabledItem: function isDisabledItem(item) {
    return this.isDisabled() || this._contains(item, this.props.disabled);
  },

  isReadOnlyItem: function isReadOnlyItem(item) {
    return this.isReadOnly() || this._contains(item, this.props.readOnly);
  },

  search: function search(character) {
    var _this4 = this;

    var word = ((this._searchTerm || '') + character).toLowerCase(),
        list = this.refs.list;

    this._searchTerm = word;

    this.setTimeout('search', function () {
      var focusedItem = list.next(_this4.state.focusedItem, word);

      _this4._searchTerm = '';

      if (focusedItem) _this4.setState({ focusedItem: focusedItem });
    }, this.props.delay);
  },

  _data: function _data() {
    return this.props.data;
  },

  _contains: function _contains(item, values) {
    return Array.isArray(values) ? values.some(this._valueMatcher.bind(null, item)) : this._valueMatcher(item, values);
  },

  _values: function _values() {
    return this.props.multiple ? this.state.dataItems : this.props.value;
  }

});

function getListItem(parent) {

  return _react2['default'].createClass({

    displayName: 'SelectItem',

    render: function render() {
      var _props2 = this.props;
      var children = _props2.children;
      var focused = _props2.focused;
      var selected = _props2.selected;
      var item = _props2.dataItem;
      var props = babelHelpers.objectWithoutProperties(_props2, ['children', 'focused', 'selected', 'dataItem']);
      var _parent$props = parent.props;
      var multiple = _parent$props.multiple;
      var _parent$props$name = _parent$props.name;
      var name = _parent$props$name === undefined ? parent._id('_name') : _parent$props$name;

      var checked = parent._contains(item, parent._values()),
          change = parent._change.bind(null, item),
          disabled = parent.isDisabledItem(item),
          readonly = parent.isReadOnlyItem(item),
          type = multiple ? 'checkbox' : 'radio';

      return _react2['default'].createElement(
        'li',
        babelHelpers._extends({}, props, {
          tabIndex: '-1',
          role: type,
          'aria-checked': !!checked,
          'aria-disabled': disabled || readonly,
          className: (0, _classnames2['default'])('rw-list-option', {
            'rw-state-focus': focused,
            'rw-state-selected': selected,
            'rw-state-disabled': disabled,
            'rw-state-readonly': readonly
          })
        }),
        _react2['default'].createElement(
          'label',
          null,
          _react2['default'].createElement('input', {
            name: name,
            tabIndex: '-1',
            role: 'presentation',
            type: type,
            onChange: onChange,
            checked: checked,
            disabled: disabled || readonly
          }),
          children
        )
      );

      function onChange(e) {
        if (!disabled && !readonly) change(e.target.checked);
      }
    }
  });
}

var UncontrolledSelectList = (0, _uncontrollable2['default'])(SelectList, { value: 'onChange' });

UncontrolledSelectList.BaseSelectList = SelectList;

exports['default'] = UncontrolledSelectList;
module.exports = exports['default'];