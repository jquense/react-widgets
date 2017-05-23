'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ReplaceTransitionGroup = require('./ReplaceTransitionGroup');

var _ReplaceTransitionGroup2 = _interopRequireDefault(_ReplaceTransitionGroup);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _style = require('dom-helpers/style');

var _style2 = _interopRequireDefault(_style);

var _width = require('dom-helpers/query/width');

var _width2 = _interopRequireDefault(_width);

var _configuration = require('./util/configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideChildGroup = _react2.default.createClass({
  displayName: 'SlideChildGroup',


  propTypes: {
    direction: _propTypes2.default.oneOf(['left', 'right']),
    duration: _propTypes2.default.number
  },

  componentWillEnter: function componentWillEnter(done) {
    var _this = this;

    var node = _compat2.default.findDOMNode(this),
        width = (0, _width2.default)(node),
        direction = this.props.direction;

    width = direction === 'left' ? width : -width;

    this.ORGINAL_POSITION = node.style.position;

    (0, _style2.default)(node, { position: 'absolute', left: width + 'px', top: 0 });

    _configuration2.default.animate(node, { left: 0 }, this.props.duration, function () {

      (0, _style2.default)(node, {
        position: _this.ORGINAL_POSITION,
        overflow: 'hidden'
      });

      _this.ORGINAL_POSITION = null;
      done && done();
    });
  },
  componentWillLeave: function componentWillLeave(done) {
    var _this2 = this;

    var node = _compat2.default.findDOMNode(this),
        width = (0, _width2.default)(node),
        direction = this.props.direction;

    width = direction === 'left' ? -width : width;

    this.ORGINAL_POSITION = node.style.position;

    (0, _style2.default)(node, { position: 'absolute', top: 0, left: 0 });

    _configuration2.default.animate(node, { left: width + 'px' }, this.props.duration, function () {
      (0, _style2.default)(node, {
        position: _this2.ORGINAL_POSITION,
        overflow: 'hidden'
      });

      _this2.ORGINAL_POSITION = null;
      done && done();
    });
  },
  render: function render() {
    return _react2.default.Children.only(this.props.children);
  }
});

module.exports = _react2.default.createClass({
  displayName: 'exports',


  propTypes: {
    direction: _propTypes2.default.oneOf(['left', 'right']),
    duration: _propTypes2.default.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      direction: 'left',
      duration: 250
    };
  },
  _wrapChild: function _wrapChild(child, ref) {
    return _react2.default.createElement(
      SlideChildGroup,
      { key: child.key, ref: ref,
        direction: this.props.direction,
        duration: this.props.duration },
      child
    );
  },
  render: function render() {
    var _props = this.props,
        style = _props.style,
        children = _props.children;


    style = _extends({}, style, {
      position: 'relative',
      overflow: 'hidden'
    });

    return _react2.default.createElement(
      _ReplaceTransitionGroup2.default,
      _extends({}, _3.default.omitOwnProps(this), {
        ref: 'container',
        component: 'div',
        childFactory: this._wrapChild,
        style: style
      }),
      children
    );
  }
});