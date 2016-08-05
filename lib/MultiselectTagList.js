'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MultiselectTag = require('./MultiselectTag');

var _MultiselectTag2 = _interopRequireDefault(_MultiselectTag);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _propTypes = require('./util/propTypes');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _widgetHelpers = require('./util/widgetHelpers');

var _dataHelpers = require('./util/dataHelpers');

var _interaction = require('./util/interaction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var optionId = function optionId(id, idx) {
  return id + '__option__' + idx;
};

exports.default = _react2.default.createClass({
  displayName: 'MultiselectTagList',


  mixins: [require('./mixins/PureRenderMixin'), require('./mixins/AriaDescendantMixin')()],

  propTypes: {
    value: _react2.default.PropTypes.array,
    focused: _react2.default.PropTypes.number,

    valueField: _react2.default.PropTypes.string,
    textField: _propTypes2.default.accessor,

    onDelete: _react2.default.PropTypes.func.isRequired,
    valueComponent: _react2.default.PropTypes.func,

    disabled: _propTypes2.default.disabled.acceptsArray,
    readOnly: _propTypes2.default.readOnly.acceptsArray
  },

  getDefaultProps: function getDefaultProps() {
    return {
      ariaActiveDescendantKey: 'taglist'
    };
  },
  componentDidUpdate: function componentDidUpdate() {
    var focused = this.props.focused;
    var activeId = optionId((0, _widgetHelpers.instanceId)(this), focused);

    this.ariaActiveDescendant(focused == null || (0, _interaction.isDisabledItem)(focused, this.props) ? null : activeId);
  },
  render: function render() {
    var _this = this;

    var _props = this.props;
    var focused = _props.focused;
    var value = _props.value;
    var textField = _props.textField;
    var ValueComponent = _props.valueComponent;


    var id = (0, _widgetHelpers.instanceId)(this);
    var props = _3.default.omitOwnProps(this);

    return _react2.default.createElement(
      'ul',
      _extends({}, props, {
        tabIndex: '-1',
        role: 'listbox',
        className: 'rw-multiselect-taglist'
      }),
      value.map(function (item, i) {
        var currentID = optionId(id, i);

        return _react2.default.createElement(
          _MultiselectTag2.default,
          {
            key: i,
            id: currentID,
            value: item,
            focused: focused === i,
            onClick: _this.handleDelete,
            disabled: (0, _interaction.isDisabledItem)(item, _this.props),
            readOnly: (0, _interaction.isReadOnlyItem)(item, _this.props)
          },
          ValueComponent ? _react2.default.createElement(ValueComponent, { item: item }) : _react2.default.createElement(
            'span',
            null,
            (0, _dataHelpers.dataText)(item, textField)
          )
        );
      })
    );
  },
  handleDelete: function handleDelete(val) {
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