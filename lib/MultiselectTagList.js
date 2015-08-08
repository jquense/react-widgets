'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var _mixinsWidgetMixin = require('./mixins/WidgetMixin');

var _mixinsWidgetMixin2 = babelHelpers.interopRequireDefault(_mixinsWidgetMixin);

var React = require('react'),
    _ = require('./util/_'),
    cx = require('classnames'),
    CustomPropTypes = require('./util/propTypes');

var optionId = function optionId(id, idx) {
  return '' + id + '__option__' + idx;
};

module.exports = React.createClass({

  displayName: 'MultiselectTagList',

  mixins: [require('./mixins/DataHelpersMixin'), require('./mixins/PureRenderMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: {
    value: React.PropTypes.array,
    focused: React.PropTypes.number,

    valueField: React.PropTypes.string,
    textField: CustomPropTypes.accessor,

    valueComponent: React.PropTypes.func,

    disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.array, React.PropTypes.oneOf(['disabled'])]),

    readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.array, React.PropTypes.oneOf(['readonly'])])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      ariaActiveDescendantKey: 'taglist'
    };
  },

  componentDidUpdate: function componentDidUpdate() {
    var _props = this.props;
    var value = _props.value;
    var focused = _props.focused;
    var activeId = optionId(_mixinsWidgetMixin2['default']._id.call(this), focused);

    this.ariaActiveDescendant(focused == null || this.isDisabled(focused) ? null : activeId);
  },

  render: function render() {
    var _this = this;

    var ValueComponent = this.props.valueComponent;
    var props = _.omit(this.props, ['value', 'disabled', 'readOnly']);
    var _props2 = this.props;
    var focused = _props2.focused;
    var optionID = _props2.optionID;
    var value = _props2.value;

    var id = _mixinsWidgetMixin2['default']._id.call(this);

    return React.createElement(
      'ul',
      babelHelpers._extends({}, props, {
        role: 'listbox',
        tabIndex: '-1',
        className: 'rw-multiselect-taglist'
      }),
      value.map(function (item, i) {
        var isDisabled = _this.isDisabled(item),
            isReadonly = _this.isReadOnly(item),
            isFocused = !isDisabled && focused === i,
            currentID = optionId(id, i);

        return React.createElement(
          'li',
          {
            key: i,
            id: currentID,
            tabIndex: '-1',
            role: 'option',
            className: cx({
              'rw-state-focus': isFocused,
              'rw-state-disabled': isDisabled,
              'rw-state-readonly': isReadonly
            })
          },
          ValueComponent ? React.createElement(ValueComponent, { item: item }) : _this._dataText(item),
          React.createElement(
            'span',
            {
              tabIndex: '-1',
              onClick: !(isDisabled || isReadonly) && _this._delete.bind(null, item),
              'aria-disabled': isDisabled,
              'aria-label': 'Unselect',
              disabled: isDisabled
            },
            React.createElement(
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

    if (val && !(this.isDisabled(val) || this.isReadOnly(val))) this.props.onDelete(val);
  },

  removeNext: function removeNext() {
    var val = this.props.value[this.props.value.length - 1];

    if (val && !(this.isDisabled(val) || this.isReadOnly(val))) this.props.onDelete(val);
  },

  isDisabled: function isDisabled(val, isIdx) {
    if (isIdx) val = this.props.value[val];

    return this.props.disabled === true || this._dataIndexOf(this.props.disabled || [], val) !== -1;
  },

  isReadOnly: function isReadOnly(val, isIdx) {
    if (isIdx) val = this.props.value[val];

    return this.props.readOnly === true || this._dataIndexOf(this.props.readOnly || [], val) !== -1;
  },

  clear: function clear() {
    this.setState({ focused: null });
  },

  first: function first() {
    var idx = 0,
        l = this.props.value.length;

    while (idx < l && this.isDisabled(idx, true)) idx++;

    return idx !== l ? idx : null;
  },

  last: function last() {
    var idx = this.props.value.length - 1;

    while (idx > -1 && this.isDisabled(idx, true)) idx--;

    return idx >= 0 ? idx : null;
  },

  next: function next(current) {
    var nextIdx = current + 1,
        l = this.props.value.length;

    while (nextIdx < l && this.isDisabled(nextIdx, true)) nextIdx++;

    if (current === null || nextIdx >= l) return null;

    return nextIdx;
  },

  prev: function prev(current) {
    var nextIdx = current;

    if (nextIdx === null || nextIdx === 0) nextIdx = this.props.value.length;

    nextIdx--;

    while (nextIdx > -1 && this.isDisabled(nextIdx, true)) nextIdx--;

    return nextIdx >= 0 ? nextIdx : null;
  }
});