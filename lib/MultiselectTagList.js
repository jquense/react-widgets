'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _util_ = require('./util/_');

var _util_2 = babelHelpers.interopRequireDefault(_util_);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilPropTypes = require('./util/propTypes');

var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

var _utilWidgetHelpers = require('./util/widgetHelpers');

var _utilDataHelpers = require('./util/dataHelpers');

var _utilInteraction = require('./util/interaction');

var optionId = function optionId(id, idx) {
  return id + '__option__' + idx;
};

exports['default'] = _react2['default'].createClass({

  displayName: 'MultiselectTagList',

  mixins: [require('./mixins/PureRenderMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: {
    value: _react2['default'].PropTypes.array,
    focused: _react2['default'].PropTypes.number,

    valueField: _react2['default'].PropTypes.string,
    textField: _utilPropTypes2['default'].accessor,

    valueComponent: _react2['default'].PropTypes.func,

    disabled: _utilPropTypes2['default'].disabled.acceptsArray,
    readOnly: _utilPropTypes2['default'].readOnly.acceptsArray
  },

  getDefaultProps: function getDefaultProps() {
    return {
      ariaActiveDescendantKey: 'taglist'
    };
  },

  componentDidUpdate: function componentDidUpdate() {
    var focused = this.props.focused;
    var activeId = optionId(_utilWidgetHelpers.instanceId(this), focused);

    this.ariaActiveDescendant(focused == null || _utilInteraction.isDisabledItem(focused, this.props) ? null : activeId);
  },

  render: function render() {
    var _this = this;

    var props = _util_2['default'].omit(this.props, ['value', 'disabled', 'readOnly']);
    var _props = this.props;
    var focused = _props.focused;
    var value = _props.value;
    var textField = _props.textField;
    var ValueComponent = _props.valueComponent;

    var id = _utilWidgetHelpers.instanceId(this);

    return _react2['default'].createElement(
      'ul',
      babelHelpers._extends({}, props, {
        role: 'listbox',
        tabIndex: '-1',
        className: 'rw-multiselect-taglist'
      }),
      value.map(function (item, i) {
        var isDisabled = _utilInteraction.isDisabledItem(item, _this.props),
            isReadonly = _utilInteraction.isReadOnlyItem(item, _this.props),
            isFocused = !isDisabled && focused === i,
            currentID = optionId(id, i);

        return _react2['default'].createElement(
          'li',
          {
            key: i,
            id: currentID,
            tabIndex: '-1',
            role: 'option',
            className: _classnames2['default']({
              'rw-state-focus': isFocused,
              'rw-state-disabled': isDisabled,
              'rw-state-readonly': isReadonly
            })
          },
          ValueComponent ? _react2['default'].createElement(ValueComponent, { item: item }) : _utilDataHelpers.dataText(item, textField),
          _react2['default'].createElement(
            'span',
            {
              tabIndex: '-1',
              onClick: !(isDisabled || isReadonly) ? _this._delete.bind(null, item) : undefined,
              'aria-disabled': isDisabled,
              'aria-label': 'Unselect',
              disabled: isDisabled
            },
            _react2['default'].createElement(
              'span',
              { className: 'rw-tag-btn', 'aria-hidden': 'true' },
              '×'
            )
          )
        );
      })
    );
  },

  _delete: function _delete(val) {
    this.props.onDelete(val);
  },

  remove: function remove(idx) {
    var val = this.props.value[idx];

    if (val && !(_utilInteraction.isDisabledItem(val, this.props) || _utilInteraction.isReadOnlyItem(val, this.props))) this.props.onDelete(val);
  },

  removeNext: function removeNext() {
    var val = this.props.value[this.props.value.length - 1];

    if (val && !(_utilInteraction.isDisabledItem(val, this.props) || _utilInteraction.isReadOnlyItem(val, this.props))) this.props.onDelete(val);
  },

  clear: function clear() {
    this.setState({ focused: null });
  },

  first: function first() {
    var idx = 0,
        value = this.props.value,
        l = value.length;

    while (idx < l && _utilInteraction.isDisabledItem(value[idx], this.props)) idx++;

    return idx !== l ? idx : null;
  },

  last: function last() {
    var value = this.props.value,
        idx = value.length - 1;

    while (idx > -1 && _utilInteraction.isDisabledItem(value[idx], this.props)) idx--;

    return idx >= 0 ? idx : null;
  },

  next: function next(current) {
    var nextIdx = current + 1,
        value = this.props.value,
        l = value.length;

    while (nextIdx < l && _utilInteraction.isDisabledItem(nextIdx, this.props)) nextIdx++;

    if (current === null || nextIdx >= l) return null;

    return nextIdx;
  },

  prev: function prev(current) {
    var nextIdx = current,
        value = this.props.value;

    if (nextIdx === null || nextIdx === 0) nextIdx = value.length;

    nextIdx--;

    while (nextIdx > -1 && _utilInteraction.isDisabledItem(value[nextIdx], this.props)) nextIdx--;

    return nextIdx >= 0 ? nextIdx : null;
  }
});
module.exports = exports['default'];