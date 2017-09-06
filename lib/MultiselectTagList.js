'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes3 = require('./util/propTypes');

var _propTypes4 = _interopRequireDefault(_propTypes3);

var _widgetHelpers = require('./util/widgetHelpers');

var _dataHelpers = require('./util/dataHelpers');

var _interaction = require('./util/interaction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optionId = function optionId(id, idx) {
  return id + '__option__' + idx;
};

exports.default = (0, _createReactClass2.default)({
  displayName: 'MultiselectTagList',


  mixins: [require('./mixins/PureRenderMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: {
    value: _propTypes2.default.array,
    focused: _propTypes2.default.number,

    valueField: _propTypes2.default.string,
    textField: _propTypes4.default.accessor,

    onDelete: _propTypes2.default.func.isRequired,
    valueComponent: _propTypes2.default.func,

    disabled: _propTypes4.default.disabled.acceptsArray,
    readOnly: _propTypes4.default.readOnly.acceptsArray
  },

  getDefaultProps: function getDefaultProps() {
    return {
      ariaActiveDescendantKey: 'taglist'
    };
  },
  componentDidUpdate: function componentDidUpdate() {
    var focused = this.props.focused,
        activeId = optionId((0, _widgetHelpers.instanceId)(this), focused);


    this.ariaActiveDescendant(focused == null || (0, _interaction.isDisabledItem)(focused, this.props) ? null : activeId);
  },
  render: function render() {
    var _this = this;

    var _props = this.props,
        focused = _props.focused,
        value = _props.value,
        textField = _props.textField,
        ValueComponent = _props.valueComponent;


    var id = (0, _widgetHelpers.instanceId)(this);
    var props = _3.default.omitOwnProps(this);

    return _react2.default.createElement(
      'ul',
      _extends({}, props, {
        role: 'listbox',
        tabIndex: '-1',
        className: 'rw-multiselect-taglist'
      }),
      value.map(function (item, i) {
        var isDisabled = (0, _interaction.isDisabledItem)(item, _this.props),
            isReadonly = (0, _interaction.isReadOnlyItem)(item, _this.props),
            isFocused = !isDisabled && focused === i,
            currentID = optionId(id, i);

        return _react2.default.createElement(
          'li',
          {
            key: i,
            id: currentID,
            tabIndex: '-1',
            role: 'option',
            className: (0, _classnames2.default)({
              'rw-state-focus': isFocused,
              'rw-state-disabled': isDisabled,
              'rw-state-readonly': isReadonly
            })
          },
          ValueComponent ? _react2.default.createElement(ValueComponent, { item: item }) : (0, _dataHelpers.dataText)(item, textField),
          _react2.default.createElement(
            'span',
            {
              tabIndex: '-1',
              onClick: !(isDisabled || isReadonly) ? _this._delete.bind(null, item) : undefined,
              'aria-disabled': isDisabled,
              'aria-label': 'Unselect',
              disabled: isDisabled
            },
            _react2.default.createElement(
              'span',
              { className: 'rw-tag-btn', 'aria-hidden': 'true' },
              '\xD7'
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

    if (val && !((0, _interaction.isDisabledItem)(val, this.props) || (0, _interaction.isReadOnlyItem)(val, this.props))) this.props.onDelete(val);
  },
  removeNext: function removeNext() {
    var val = this.props.value[this.props.value.length - 1];

    if (val && !((0, _interaction.isDisabledItem)(val, this.props) || (0, _interaction.isReadOnlyItem)(val, this.props))) this.props.onDelete(val);
  },
  clear: function clear() {
    this.setState({ focused: null });
  },
  first: function first() {
    var idx = 0,
        value = this.props.value,
        l = value.length;

    while (idx < l && (0, _interaction.isDisabledItem)(value[idx], this.props)) {
      idx++;
    }return idx !== l ? idx : null;
  },
  last: function last() {
    var value = this.props.value,
        idx = value.length - 1;

    while (idx > -1 && (0, _interaction.isDisabledItem)(value[idx], this.props)) {
      idx--;
    }return idx >= 0 ? idx : null;
  },
  next: function next(current) {
    var nextIdx = current + 1,
        value = this.props.value,
        l = value.length;

    while (nextIdx < l && (0, _interaction.isDisabledItem)(nextIdx, this.props)) {
      nextIdx++;
    }if (current === null || nextIdx >= l) return null;

    return nextIdx;
  },
  prev: function prev(current) {
    var nextIdx = current,
        value = this.props.value;

    if (nextIdx === null || nextIdx === 0) nextIdx = value.length;

    nextIdx--;

    while (nextIdx > -1 && (0, _interaction.isDisabledItem)(value[nextIdx], this.props)) {
      nextIdx--;
    }return nextIdx >= 0 ? nextIdx : null;
  }
});
module.exports = exports['default'];