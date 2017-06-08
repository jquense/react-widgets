'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _style = require('dom-helpers/style');

var _style2 = _interopRequireDefault(_style);

var _height = require('dom-helpers/query/height');

var _height2 = _interopRequireDefault(_height);

var _width = require('dom-helpers/query/width');

var _width2 = _interopRequireDefault(_width);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A streamlined version of TransitionGroup built for managing at most two active children
 * also provides additional hooks for animation start/end
 * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
 * relevent code is licensed accordingly
 */
function getChild(children) {
  return _react2.default.Children.only(children);
}

function key(child) {
  return child && child.key;
}

exports.default = (0, _createReactClass2.default)({

  displayName: 'ReplaceTransitionGroup',

  propTypes: {
    component: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string]),
    childFactory: _propTypes2.default.func,
    onAnimating: _propTypes2.default.func,
    onAnimate: _propTypes2.default.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      component: 'span',
      childFactory: function childFactory(a) {
        return a;
      },
      onAnimating: _3.default.noop,
      onAnimate: _3.default.noop
    };
  },
  getInitialState: function getInitialState() {
    return {
      children: _3.default.splat(this.props.children)
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
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
  },
  componentWillMount: function componentWillMount() {
    this.animatingKeys = {};
    this.leaving = null;
    this.entering = null;
  },
  componentDidMount: function componentDidMount() {
    this._mounted = true;
  },
  componentWillUnmount: function componentWillUnmount() {
    this._mounted = false;
  },
  componentDidUpdate: function componentDidUpdate() {
    var entering = this.entering,
        leaving = this.leaving,
        first = this.refs[key(entering) || key(leaving)],
        node = _compat2.default.findDOMNode(this),
        el = first && _compat2.default.findDOMNode(first);

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
  },
  performEnter: function performEnter(key) {
    var component = this.refs[key];

    if (!component) return;

    this.animatingKeys[key] = true;

    if (component.componentWillEnter) component.componentWillEnter(this._handleDoneEntering.bind(this, key));else this._handleDoneEntering(key);
  },
  _tryFinish: function _tryFinish() {

    if (this.isTransitioning()) return;

    if (this._mounted) (0, _style2.default)(_compat2.default.findDOMNode(this), { overflow: 'visible', height: '', width: '' });

    this.props.onAnimate();
  },
  _handleDoneEntering: function _handleDoneEntering(enterkey) {
    var component = this.refs[enterkey];

    if (component && component.componentDidEnter) component.componentDidEnter();

    delete this.animatingKeys[enterkey];

    if (key(this.props.children) !== enterkey) this.performLeave(enterkey); // This was removed before it had fully entered. Remove it.

    this._tryFinish();
  },
  performLeave: function performLeave(key) {
    var component = this.refs[key];

    if (!component) return;

    this.animatingKeys[key] = true;

    if (component.componentWillLeave) component.componentWillLeave(this._handleDoneLeaving.bind(this, key));else this._handleDoneLeaving(key);
  },
  _handleDoneLeaving: function _handleDoneLeaving(leavekey) {
    var component = this.refs[leavekey];

    if (component && component.componentDidLeave) component.componentDidLeave();

    delete this.animatingKeys[leavekey];

    if (key(this.props.children) === leavekey) this.performEnter(leavekey); // This entered again before it fully left. Add it again.

    else if (this._mounted) this.setState({
        children: this.state.children.filter(function (c) {
          return key(c) !== leavekey;
        })
      });

    this._tryFinish();
  },
  isTransitioning: function isTransitioning() {
    return !!Object.keys(this.animatingKeys).length;
  },
  render: function render() {
    var _this = this;

    var Component = this.props.component;

    return _react2.default.createElement(
      Component,
      _3.default.omitOwnProps(this),
      this.state.children.map(function (c) {
        return _this.props.childFactory(c, key(c));
      })
    );
  }
});
module.exports = exports['default'];