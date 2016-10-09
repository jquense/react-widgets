'use strict';

exports.__esModule = true;

var _class, _temp; /**
                    * A streamlined version of TransitionGroup built for managing at most two active children
                    * also provides additional hooks for animation start/end
                    * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
                    * relevent code is licensed accordingly
                    */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _style = require('dom-helpers/style');

var _style2 = _interopRequireDefault(_style);

var _height = require('dom-helpers/query/height');

var _height2 = _interopRequireDefault(_height);

var _width = require('dom-helpers/query/width');

var _width2 = _interopRequireDefault(_width);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _mountManager = require('./util/mountManager');

var _mountManager2 = _interopRequireDefault(_mountManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getChild(children) {
  return _react2.default.Children.only(children);
}

function key(child) {
  return child && child.key;
}

var ReplaceTransitionGroup = (_temp = _class = function (_React$Component) {
  _inherits(ReplaceTransitionGroup, _React$Component);

  function ReplaceTransitionGroup() {
    _classCallCheck(this, ReplaceTransitionGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args)));

    _this.mounted = (0, _mountManager2.default)(_this);
    _this.animatingKeys = {};
    _this.leaving = null;
    _this.entering = null;

    _this.state = {
      children: _3.default.splat(_this.props.children)
    };
    return _this;
  }

  ReplaceTransitionGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var nextChild = getChild(nextProps.children),
        stack = this.state.children.slice(),
        next = stack[1],
        last = stack[0];

    var isLastChild = last && key(last) === key(nextChild),
        isNextChild = next && key(next) === key(nextChild);

    //no children
    if (!last) {
      stack.push(nextChild);
      this.entering = nextChild;
    } else if (last && !next && !isLastChild) {
      //new child
      stack.push(nextChild);
      this.leaving = last;
      this.entering = nextChild;
    } else if (last && next && !isLastChild && !isNextChild) {
      // the child is not the current one, exit the current one, add the new one
      //  - shift the stack down
      stack.shift();
      stack.push(nextChild);
      this.leaving = next;
      this.entering = nextChild;
    }
    //new child that just needs to be re-rendered
    else if (isLastChild) stack.splice(0, 1, nextChild);else if (isNextChild) stack.splice(1, 1, nextChild);

    if (this.state.children[0] !== stack[0] || this.state.children[1] !== stack[1]) this.setState({ children: stack });
  };

  ReplaceTransitionGroup.prototype.componentDidUpdate = function componentDidUpdate() {
    var entering = this.entering,
        leaving = this.leaving,
        first = this.refs[key(entering) || key(leaving)],
        node = (0, _reactDom.findDOMNode)(this),
        el = first && (0, _reactDom.findDOMNode)(first);

    if (el) (0, _style2.default)(node, {
      overflow: 'hidden',
      height: (0, _height2.default)(el) + 'px',
      width: (0, _width2.default)(el) + 'px'
    });

    this.props.onAnimating();

    this.entering = null;
    this.leaving = null;

    if (entering) this.performEnter(key(entering));
    if (leaving) this.performLeave(key(leaving));
  };

  ReplaceTransitionGroup.prototype.performEnter = function performEnter(key) {
    var _this2 = this;

    var component = this.refs[key];

    if (!component) return;

    this.animatingKeys[key] = true;

    if (component.componentWillEnter) component.componentWillEnter(function () {
      return _this2._handleDoneEntering(key);
    });else this._handleDoneEntering(key);
  };

  ReplaceTransitionGroup.prototype._tryFinish = function _tryFinish() {
    if (this.isTransitioning()) return;

    if (this.mounted()) (0, _style2.default)((0, _reactDom.findDOMNode)(this), { overflow: 'visible', height: '', width: '' });

    this.props.onAnimate();
  };

  ReplaceTransitionGroup.prototype._handleDoneEntering = function _handleDoneEntering(enterkey) {
    var component = this.refs[enterkey];

    if (component && component.componentDidEnter) component.componentDidEnter();

    delete this.animatingKeys[enterkey];

    if (key(this.props.children) !== enterkey) this.performLeave(enterkey); // This was removed before it had fully entered. Remove it.

    this._tryFinish();
  };

  ReplaceTransitionGroup.prototype.performLeave = function performLeave(key) {
    var _this3 = this;

    var component = this.refs[key];

    if (!component) return;

    this.animatingKeys[key] = true;

    if (component.componentWillLeave) component.componentWillLeave(function () {
      return _this3._handleDoneLeaving(key);
    });else this._handleDoneLeaving(key);
  };

  ReplaceTransitionGroup.prototype._handleDoneLeaving = function _handleDoneLeaving(leavekey) {
    var component = this.refs[leavekey];

    if (component && component.componentDidLeave) component.componentDidLeave();

    delete this.animatingKeys[leavekey];

    if (key(this.props.children) === leavekey) this.performEnter(leavekey); // This entered again before it fully left. Add it again.

    else if (this.mounted()) this.setState({
        children: this.state.children.filter(function (c) {
          return key(c) !== leavekey;
        })
      });

    this._tryFinish();
  };

  ReplaceTransitionGroup.prototype.isTransitioning = function isTransitioning() {
    return !!Object.keys(this.animatingKeys).length;
  };

  ReplaceTransitionGroup.prototype.render = function render() {
    var _this4 = this;

    var Component = this.props.component;

    return _react2.default.createElement(
      Component,
      _3.default.omitOwnProps(this),
      this.state.children.map(function (c) {
        return _this4.props.childFactory(c, key(c));
      })
    );
  };

  return ReplaceTransitionGroup;
}(_react2.default.Component), _class.propTypes = {
  component: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.element, _react2.default.PropTypes.string]),
  childFactory: _react2.default.PropTypes.func,
  onAnimating: _react2.default.PropTypes.func,
  onAnimate: _react2.default.PropTypes.func
}, _class.defaultProps = {
  component: 'span',
  childFactory: function childFactory(a) {
    return a;
  },
  onAnimating: _3.default.noop,
  onAnimate: _3.default.noop
}, _temp);
exports.default = ReplaceTransitionGroup;
module.exports = exports['default'];