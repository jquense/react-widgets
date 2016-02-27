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

var _ListOption = require('./ListOption');

var _ListOption2 = babelHelpers.interopRequireDefault(_ListOption);

var _utilValidateListInterface = require('./util/validateListInterface');

var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

var _domHelpersUtilScrollTo = require('dom-helpers/util/scrollTo');

var _domHelpersUtilScrollTo2 = babelHelpers.interopRequireDefault(_domHelpersUtilScrollTo);

var _utilDataHelpers = require('./util/dataHelpers');

var _utilInteraction = require('./util/interaction');

var _utilWidgetHelpers = require('./util/widgetHelpers');

var omit = _util_2['default'].omit;
var pick = _util_2['default'].pick;

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

  disabled: _utilPropTypes2['default'].disabled.acceptsArray,
  readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

  messages: _react2['default'].PropTypes.shape({
    emptyList: _react2['default'].PropTypes.string
  })
};

var SelectList = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
  key: 'displayName',
  initializer: function initializer() {
    return 'SelectList';
  }
}, {
  key: 'propTypes',
  initializer: function initializer() {
    return propTypes;
  }
}, {
  key: 'mixins',
  initializer: function initializer() {
    return [require('./mixins/TimeoutMixin'), require('./mixins/RtlParentContextMixin'), require('./mixins/AriaDescendantMixin')(), require('./mixins/FocusMixin')({
      willHandle: function willHandle(focused) {
        if (focused) this.focus();
      }
    })];
  }
}, {
  key: 'getDefaultProps',
  value: function getDefaultProps() {
    return {
      delay: 250,
      value: [],
      data: [],
      ariaActiveDescendantKey: 'selectlist',
      messages: {
        emptyList: 'There are no items in this list'
      }
    };
  }
}, {
  key: 'getDefaultState',
  value: function getDefaultState(props) {
    var data = props.data;
    var value = props.value;
    var valueField = props.valueField;
    var multiple = props.multiple;
    var isRadio = !multiple;
    var values = _util_2['default'].splat(value);
    var first = isRadio && _utilDataHelpers.dataItem(data, values[0], valueField);

    first = isRadio && first ? first : (this.state || {}).focusedItem || null;

    return {
      focusedItem: first,
      dataItems: !isRadio && values.map(function (item) {
        return _utilDataHelpers.dataItem(data, item, valueField);
      })
    };
  }
}, {
  key: 'getInitialState',
  value: function getInitialState() {
    var state = this.getDefaultState(this.props);

    state.ListItem = getListItem(this);

    return state;
  }
}, {
  key: 'componentWillReceiveProps',
  value: function componentWillReceiveProps(nextProps) {
    return this.setState(this.getDefaultState(nextProps));
  }
}, {
  key: 'componentDidMount',
  value: function componentDidMount() {
    _utilValidateListInterface2['default'](this.refs.list);
  }
}, {
  key: 'render',
  value: function render() {
    var _props = this.props;
    var className = _props.className;
    var tabIndex = _props.tabIndex;
    var busy = _props.busy;
    var groupBy = _props.groupBy;
    var List = _props.listComponent;

    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

    var elementProps = omit(this.props, Object.keys(propTypes));
    var listProps = pick(this.props, Object.keys(List.propTypes));

    var _state = this.state;
    var ListItem = _state.ListItem;
    var focusedItem = _state.focusedItem;
    var focused = _state.focused;

    var items = this._data(),
        listID = _utilWidgetHelpers.instanceId(this, '_listbox');

    focusedItem = focused && !_utilInteraction.isDisabled(this.props) && !_utilInteraction.isReadOnly(this.props) && focusedItem;

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, elementProps, {
        onKeyDown: this._keyDown,
        onKeyPress: this._keyPress,
        onBlur: this.handleBlur,
        onFocus: this.handleFocus,
        role: 'radiogroup',
        'aria-busy': !!busy,
        'aria-disabled': _utilInteraction.isDisabled(this.props),
        'aria-readonly': _utilInteraction.isReadOnly(this.props),
        tabIndex: '-1',
        className: _classnames2['default'](className, 'rw-widget', 'rw-selectlist', {
          'rw-state-focus': focused,
          'rw-state-disabled': _utilInteraction.isDisabled(this.props),
          'rw-state-readonly': _utilInteraction.isReadOnly(this.props),
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
  }
}, {
  key: '_scrollTo',
  value: function _scrollTo(selected, list) {
    var handler = this.props.onMove;

    if (handler) handler(selected, list);else {
      this._scrollCancel && this._scrollCancel();
      // default behavior is to scroll the whole page not just the widget
      this._scrollCancel = _domHelpersUtilScrollTo2['default'](selected);
    }
  }
}, {
  key: '_keyDown',
  decorators: [_utilInteraction.widgetEditable],
  value: function _keyDown(e) {
    var _this = this;

    var key = e.key;
    var _props2 = this.props;
    var valueField = _props2.valueField;
    var multiple = _props2.multiple;
    var list = this.refs.list;
    var focusedItem = this.state.focusedItem;

    var change = function change(item) {
      if (item) _this._change(item, multiple ? !_utilInteraction.contains(item, _this._values(), valueField) // toggle value
      : true);
    };

    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

    if (e.defaultPrevented) return;

    if (key === 'End') {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: list.last() });else change(list.last());
    } else if (key === 'Home') {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: list.first() });else change(list.first());
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      change(focusedItem);
    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: list.next(focusedItem) });else change(list.next(focusedItem));
    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
      e.preventDefault();

      if (multiple) this.setState({ focusedItem: list.prev(focusedItem) });else change(list.prev(focusedItem));
    } else if (multiple && e.keyCode === 65 && e.ctrlKey) {
      e.preventDefault();
      this.selectAll();
    }
  }
}, {
  key: '_keyPress',
  decorators: [_utilInteraction.widgetEditable],
  value: function _keyPress(e) {
    _utilWidgetHelpers.notify(this.props.onKeyPress, [e]);

    if (e.defaultPrevented) return;

    this.search(String.fromCharCode(e.which));
  }
}, {
  key: 'focus',
  value: function focus() {
    _utilCompat2['default'].findDOMNode(this.refs.list).focus();
  }
}, {
  key: 'selectAll',
  value: function selectAll() {
    var _this2 = this;

    var _props3 = this.props;
    var disabled = _props3.disabled;
    var readOnly = _props3.readOnly;
    var valueField = _props3.valueField;
    var values = this.state.dataItems;
    var data = this._data();
    var blacklist;

    disabled = disabled || readOnly;
    disabled = Array.isArray(disabled) ? disabled : [];
    //disabled values that are not selected
    blacklist = disabled.filter(function (v) {
      return !_utilInteraction.contains(v, values, valueField);
    });
    data = data.filter(function (v) {
      return !_utilInteraction.contains(v, blacklist, valueField);
    });

    if (data.length === values.length) {
      data = disabled.filter(function (item) {
        return _utilInteraction.contains(item, values, valueField);
      });
      data = data.map(function (item) {
        return _utilDataHelpers.dataItem(_this2._data(), item, valueField);
      });
    }

    _utilWidgetHelpers.notify(this.props.onChange, [data]);
  }
}, {
  key: '_change',
  value: function _change(item, checked) {
    var multiple = this.props.multiple;
    var values = this.state.dataItems;

    multiple = !!multiple;

    if (!multiple) return _utilWidgetHelpers.notify(this.props.onChange, checked ? item : null);

    values = checked ? values.concat(item) : values.filter(function (v) {
      return v !== item;
    });

    _utilWidgetHelpers.notify(this.props.onChange, [values || []]);
  }
}, {
  key: 'search',
  value: function search(character) {
    var _this3 = this;

    var word = ((this._searchTerm || '') + character).toLowerCase(),
        list = this.refs.list,
        multiple = this.props.multiple;

    if (!character) return;

    this._searchTerm = word;

    this.setTimeout('search', function () {
      var focusedItem = list.next(_this3.state.focusedItem, word);

      _this3._searchTerm = '';

      if (focusedItem) {
        !multiple ? _this3._change(focusedItem, true) : _this3.setState({ focusedItem: focusedItem });
      }
    }, this.props.delay);
  }
}, {
  key: '_data',
  value: function _data() {
    return this.props.data;
  }
}, {
  key: '_values',
  value: function _values() {
    return this.props.multiple ? this.state.dataItems : this.props.value;
  }
}]));

function getListItem(parent) {

  return _react2['default'].createClass({

    displayName: 'SelectItem',

    render: function render() {
      var _props4 = this.props;
      var children = _props4.children;
      var disabled = _props4.disabled;
      var readonly = _props4.readonly;
      var item = _props4.dataItem;
      var _parent$props = parent.props;
      var multiple = _parent$props.multiple;
      var _parent$props$name = _parent$props.name;
      var name = _parent$props$name === undefined ? _utilWidgetHelpers.instanceId(parent, '_name') : _parent$props$name;

      var checked = _utilInteraction.contains(item, parent._values(), parent.props.valueField),
          change = parent._change.bind(null, item),
          type = multiple ? 'checkbox' : 'radio';

      return _react2['default'].createElement(
        _ListOption2['default'],
        babelHelpers._extends({}, this.props, {
          role: type,
          'aria-checked': !!checked
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

exports['default'] = _uncontrollable2['default'](SelectList, { value: 'onChange' }, ['selectAll']);
module.exports = exports['default'];