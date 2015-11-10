'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _utilTetherElement = require('./util/tetherElement');

var _utilTetherElement2 = babelHelpers.interopRequireDefault(_utilTetherElement);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var TetherTarget = (function (_React$Component) {
  babelHelpers.inherits(TetherTarget, _React$Component);

  function TetherTarget() {
    babelHelpers.classCallCheck(this, TetherTarget);

    _React$Component.apply(this, arguments);
  }

  TetherTarget.prototype.render = function render() {
    var Component = this.props.component;

    return _react2['default'].createElement(
      Component,
      this.props,
      this.props.children
    );
  };

  TetherTarget.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props;
    var tether = _props.tether;
    var tetherOptions = _props.options;

    var options = babelHelpers._extends({}, tetherOptions, { target: _utilCompat2['default'].findDOMNode(this) });

    this.tethered = new _utilTetherElement2['default'](tether, options);
  };

  TetherTarget.prototype.componentDidUpdate = function componentDidUpdate() {
    var tether = this.props.tether;

    this.tethered.update(tether);
  };

  TetherTarget.prototype.componentWillUnmount = function componentWillUnmount() {
    this.tethered.destroy();
  };

  babelHelpers.createClass(TetherTarget, null, [{
    key: 'propTypes',
    value: {
      tethered: _react.PropTypes.node,
      options: _react.PropTypes.object,
      component: _react.PropTypes.node
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      component: 'div'
    },
    enumerable: true
  }]);
  return TetherTarget;
})(_react2['default'].Component);

exports['default'] = TetherTarget;
module.exports = exports['default'];