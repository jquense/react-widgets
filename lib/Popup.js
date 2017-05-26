'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _OVERFLOW;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _2 = require('./util/_');

var _3 = _interopRequireDefault(_2);

var _style = require('dom-helpers/style');

var _style2 = _interopRequireDefault(_style);

var _height = require('dom-helpers/query/height');

var _height2 = _interopRequireDefault(_height);

var _camelizeStyle = require('dom-helpers/util/camelizeStyle');

var _camelizeStyle2 = _interopRequireDefault(_camelizeStyle);

var _configuration = require('./util/configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _compat = require('./util/compat');

var _compat2 = _interopRequireDefault(_compat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transform = (0, _camelizeStyle2.default)(_configuration2.default.animate.transform);

var CLOSING = 0,
    CLOSED = 1,
    OPENING = 2,
    OPEN = 3;

function properties(prop, value) {
  var _ref, _ref2;

  var TRANSLATION_MAP = _configuration2.default.animate.TRANSLATION_MAP;

  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return _ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref;

  return _ref2 = {}, _ref2[prop] = value, _ref2;
}

var OVERFLOW = (_OVERFLOW = {}, _OVERFLOW[CLOSED] = 'hidden', _OVERFLOW[CLOSING] = 'hidden', _OVERFLOW[OPENING] = 'hidden', _OVERFLOW);

var propTypes = {
  open: _propTypes2.default.bool,
  dropUp: _propTypes2.default.bool,
  duration: _propTypes2.default.number,

  onClosing: _propTypes2.default.func,
  onOpening: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  onOpen: _propTypes2.default.func
};

exports.default = (0, _createReactClass2.default)({

  displayName: 'Popup',

  propTypes: propTypes,

  getInitialState: function getInitialState() {
    return {
      initialRender: true,
      status: this.props.open ? OPENING : CLOSED
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      duration: 200,
      open: false,
      onClosing: function onClosing() {},
      onOpening: function onOpening() {},
      onClose: function onClose() {},
      onOpen: function onOpen() {}
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
    });
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var isOpen = this.state.status === OPENING;

    _compat2.default.batchedUpdates(function () {
      _this.setState({ initialRender: false });
      if (isOpen) {
        _this.open();
      }
    });
  },
  componentDidUpdate: function componentDidUpdate(pvProps) {
    var closing = pvProps.open && !this.props.open,
        opening = !pvProps.open && this.props.open,
        open = this.props.open,
        status = this.state.status;

    if (!!pvProps.dropUp !== !!this.props.dropUp) {
      this.cancelNextCallback();
      if (status === OPENING) this.open();
      if (status === CLOSING) this.close();
      return;
    }

    if (opening) this.open();else if (closing) this.close();else if (open) {
      // this.height() returns a floating point number with the desired height
      // for this popup. Because of potential rounding errors in floating point
      // aritmetic we must allow an error margin when comparing to the current
      // state, otherwise we can end up in an infinite loop where the height
      // is never exactly equal to our target value.
      var height = this.height(),
          diff = Math.abs(height - this.state.height);
      if (isNaN(diff) || diff > 0.1) this.setState({ height: height });
    }
  },
  render: function render() {
    var _props = this.props,
        className = _props.className,
        dropUp = _props.dropUp,
        style = _props.style,
        _state = this.state,
        status = _state.status,
        height = _state.height;


    var overflow = OVERFLOW[status] || 'visible',
        display = status === CLOSED ? 'none' : 'block';

    return _react2.default.createElement(
      'div',
      {
        style: _extends({
          display: display,
          overflow: overflow,
          height: height
        }, style),
        className: (0, _classnames2.default)(className, 'rw-popup-container', dropUp && 'rw-dropup', this.isTransitioning() && 'rw-popup-animating')
      },
      this.renderChildren()
    );
  },
  renderChildren: function renderChildren() {
    if (!this.props.children) return _react2.default.createElement('span', { className: 'rw-popup rw-widget' });

    var offset = this.getOffsetForStatus(this.state.status),
        child = _react2.default.Children.only(this.props.children);

    return (0, _react.cloneElement)(child, {
      style: _extends({}, child.props.style, offset, {
        position: this.isTransitioning() ? 'absolute' : undefined
      }),
      className: (0, _classnames2.default)(child.props.className, 'rw-popup rw-widget')
    });
  },
  open: function open() {
    var _this2 = this;

    this.cancelNextCallback();
    var el = _compat2.default.findDOMNode(this).firstChild,
        height = this.height();

    this.props.onOpening();

    this.safeSetState({ status: OPENING, height: height }, function () {
      var offset = _this2.getOffsetForStatus(OPEN),
          duration = _this2.props.duration;

      _this2.animate(el, offset, duration, 'ease', function () {
        _this2.safeSetState({ status: OPEN }, function () {
          _this2.props.onOpen();
        });
      });
    });
  },
  close: function close() {
    var _this3 = this;

    this.cancelNextCallback();
    var el = _compat2.default.findDOMNode(this).firstChild,
        height = this.height();

    this.props.onClosing();

    this.safeSetState({ status: CLOSING, height: height }, function () {
      var offset = _this3.getOffsetForStatus(CLOSED),
          duration = _this3.props.duration;

      _this3.animate(el, offset, duration, 'ease', function () {
        return _this3.safeSetState({ status: CLOSED }, function () {
          _this3.props.onClose();
        });
      });
    });
  },
  getOffsetForStatus: function getOffsetForStatus(status) {
    var _CLOSED$CLOSING$OPENI;

    if (this.state.initialRender) return {};

    var _in = properties('top', this.props.dropUp ? '100%' : '-100%'),
        out = properties('top', 0);
    return (_CLOSED$CLOSING$OPENI = {}, _CLOSED$CLOSING$OPENI[CLOSED] = _in, _CLOSED$CLOSING$OPENI[CLOSING] = out, _CLOSED$CLOSING$OPENI[OPENING] = _in, _CLOSED$CLOSING$OPENI[OPEN] = out, _CLOSED$CLOSING$OPENI)[status] || {};
  },
  height: function height() {
    var container = _compat2.default.findDOMNode(this),
        content = container.firstChild,
        margin = parseInt((0, _style2.default)(content, 'margin-top'), 10) + parseInt((0, _style2.default)(content, 'margin-bottom'), 10);

    var old = container.style.display,
        height = void 0;

    container.style.display = 'block';
    height = ((0, _height2.default)(content) || 0) + (isNaN(margin) ? 0 : margin);
    container.style.display = old;
    return height;
  },
  isTransitioning: function isTransitioning() {
    return this.state.status === OPENING || this.state.status === CLOSED;
  },
  animate: function animate(el, props, dur, easing, cb) {
    this._transition = _configuration2.default.animate(el, props, dur, easing, this.setNextCallback(cb));
  },
  cancelNextCallback: function cancelNextCallback() {
    if (this._transition && this._transition.cancel) {
      this._transition.cancel();
      this._transition = null;
    }
    if (this.nextCallback) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  },
  safeSetState: function safeSetState(nextState, callback) {
    this.setState(nextState, this.setNextCallback(callback));
  },
  setNextCallback: function setNextCallback(callback) {
    var _this4 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      return active = false;
    };
    return this.nextCallback;
  }
});


function childKey(children) {
  var nextChildMapping = _react2.default.Children.map(children, function (c) {
    return c;
  });
  for (var key in nextChildMapping) {
    return key;
  }
}
module.exports = exports['default'];