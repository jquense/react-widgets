'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var _OVERFLOW;

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _domHelpersStyle = require('dom-helpers/style');

var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

var _domHelpersQueryHeight = require('dom-helpers/query/height');

var _domHelpersQueryHeight2 = babelHelpers.interopRequireDefault(_domHelpersQueryHeight);

var _domHelpersUtilCamelizeStyle = require('dom-helpers/util/camelizeStyle');

var _domHelpersUtilCamelizeStyle2 = babelHelpers.interopRequireDefault(_domHelpersUtilCamelizeStyle);

var _utilConfiguration = require('./util/configuration');

var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var transform = _domHelpersUtilCamelizeStyle2['default'](_utilConfiguration2['default'].animate.transform);

var CLOSING = 0,
    CLOSED = 1,
    OPENING = 2,
    OPEN = 3;

function properties(prop, value) {
  var _ref, _ref2;

  var TRANSLATION_MAP = _utilConfiguration2['default'].animate.TRANSLATION_MAP;

  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return _ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref;

  return _ref2 = {}, _ref2[prop] = value, _ref2;
}

var OVERFLOW = (_OVERFLOW = {}, _OVERFLOW[CLOSED] = 'hidden', _OVERFLOW[CLOSING] = 'hidden', _OVERFLOW[OPENING] = 'hidden', _OVERFLOW);

module.exports = _react2['default'].createClass({

  displayName: 'Popup',

  propTypes: {
    open: _react2['default'].PropTypes.bool,
    dropUp: _react2['default'].PropTypes.bool,
    duration: _react2['default'].PropTypes.number,

    onClosing: _react2['default'].PropTypes.func,
    onOpening: _react2['default'].PropTypes.func,
    onClose: _react2['default'].PropTypes.func,
    onOpen: _react2['default'].PropTypes.func
  },

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

    _utilCompat2['default'].batchedUpdates(function () {
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
      var height = this.height();
      if (height !== this.state.height) this.setState({ height: height });
    }
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var open = _props.open;
    var dropUp = _props.dropUp;
    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'open', 'dropUp']);
    var _state = this.state;
    var status = _state.status;
    var height = _state.height;

    var overflow = OVERFLOW[status] || 'visible',
        display = status === CLOSED ? 'none' : 'block';

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, props, {
        style: babelHelpers._extends({ display: display, overflow: overflow, height: height }, props.style),
        className: _classnames2['default'](className, 'rw-popup-container', {
          'rw-dropup': dropUp,
          'rw-popup-animating': this.isTransitioning()
        })
      }),
      this.renderChildren()
    );
  },

  renderChildren: function renderChildren() {
    if (!this.props.children) return _react2['default'].createElement('span', { className: 'rw-popup rw-widget' });

    var offset = this.getOffsetForStatus(this.state.status),
        child = _react2['default'].Children.only(this.props.children);

    return _react.cloneElement(child, {
      style: babelHelpers._extends({}, child.props.style, offset, {
        position: this.isTransitioning() ? 'absolute' : undefined
      }),
      className: _classnames2['default'](child.props.className, 'rw-popup rw-widget')
    });
  },

  open: function open() {
    var _this2 = this;

    this.cancelNextCallback();
    var el = _utilCompat2['default'].findDOMNode(this).firstChild,
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
    var el = _utilCompat2['default'].findDOMNode(this).firstChild,
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
    var _CLOSED$CLOSING$OPENING$OPEN$status;

    if (this.state.initialRender) return {};

    var _in = properties('top', this.props.dropUp ? '100%' : '-100%'),
        out = properties('top', 0);
    return (_CLOSED$CLOSING$OPENING$OPEN$status = {}, _CLOSED$CLOSING$OPENING$OPEN$status[CLOSED] = _in, _CLOSED$CLOSING$OPENING$OPEN$status[CLOSING] = out, _CLOSED$CLOSING$OPENING$OPEN$status[OPENING] = _in, _CLOSED$CLOSING$OPENING$OPEN$status[OPEN] = out, _CLOSED$CLOSING$OPENING$OPEN$status)[status] || {};
  },

  height: function height() {
    var container = _utilCompat2['default'].findDOMNode(this),
        content = container.firstChild,
        margin = parseInt(_domHelpersStyle2['default'](content, 'margin-top'), 10) + parseInt(_domHelpersStyle2['default'](content, 'margin-bottom'), 10);

    var old = container.style.display,
        height = undefined;

    container.style.display = 'block';
    height = (_domHelpersQueryHeight2['default'](content) || 0) + (isNaN(margin) ? 0 : margin);
    container.style.display = old;
    return height;
  },

  isTransitioning: function isTransitioning() {
    return this.state.status === OPENING || this.state.status === CLOSED;
  },

  animate: function animate(el, props, dur, easing, cb) {
    this._transition = _utilConfiguration2['default'].animate(el, props, dur, easing, this.setNextCallback(cb));
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
  var nextChildMapping = _react2['default'].Children.map(children, function (c) {
    return c;
  });
  for (var key in nextChildMapping) return key;
}