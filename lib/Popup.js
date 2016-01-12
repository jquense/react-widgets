'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var _react = require('react');

var _react2 = babelHelpers.interopRequireDefault(_react);

var _domHelpersStyle = require('dom-helpers/style');

var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

var _domHelpersQueryHeight = require('dom-helpers/query/height');

var _domHelpersQueryHeight2 = babelHelpers.interopRequireDefault(_domHelpersQueryHeight);

var _utilConfiguration = require('./util/configuration');

var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

var _classnames = require('classnames');

var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

var _utilCompat = require('./util/compat');

var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

var transform = _utilConfiguration2['default'].animate.transform;

var CLOSING = 0,
    OPENING = 1,
    NONE = 2;

function properties(prop, value) {
  var _ref, _ref2;

  var TRANSLATION_MAP = _utilConfiguration2['default'].animate.TRANSLATION_MAP;

  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return _ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref;

  return _ref2 = {}, _ref2[prop] = value, _ref2;
}

var PopupContent = _react2['default'].createClass({
  displayName: 'PopupContent',

  render: function render() {
    var child = this.props.children;

    if (!child) return _react2['default'].createElement('span', { className: 'rw-popup rw-widget' });

    child = _react2['default'].Children.only(this.props.children);

    return _react.cloneElement(child, {
      className: _classnames2['default'](child.props.className, 'rw-popup rw-widget')
    });
  }
});

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
    return {};
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

  // componentDidMount(){
  //   !this.props.open && this.close(0)
  // },
  componentWillMount: function componentWillMount() {
    !this.props.open && (this._initialPosition = true);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState({
      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
    });
  },

  componentDidUpdate: function componentDidUpdate(pvProps) {
    var closing = pvProps.open && !this.props.open,
        opening = !pvProps.open && this.props.open,
        open = this.props.open;

    if (pvProps.dropUp !== this.props.dropUp && this.transitionState !== NONE) {
      this._transition && this._transition.cancel();
      this.reset();
      opening = this.transitionState === OPENING;
      closing = this.transitionState === CLOSING;
    }

    if (opening) this.open();else if (closing) this.close();else if (open) this.height();
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var open = _props.open;
    var dropUp = _props.dropUp;
    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'open', 'dropUp']);
    var display = open ? 'block' : void 0;

    if (this._initialPosition) {
      display = 'none';
    }

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, props, {
        style: babelHelpers._extends({
          display: display,
          height: this.state.height
        }, props.style),
        className: _classnames2['default'](className, 'rw-popup-container', { 'rw-dropup': dropUp })
      }),
      _react2['default'].createElement(
        PopupContent,
        { ref: 'content' },
        this.props.children
      )
    );
  },

  reset: function reset() {
    var container = _utilCompat2['default'].findDOMNode(this),
        content = _utilCompat2['default'].findDOMNode(this.refs.content),
        style = { display: 'block', overflow: 'hidden' };

    _domHelpersStyle2['default'](container, style);
    this.height();
    _domHelpersStyle2['default'](content, properties('top', this.props.dropUp ? '100%' : '-100%'));
  },

  height: function height() {
    var el = _utilCompat2['default'].findDOMNode(this),
        content = _utilCompat2['default'].findDOMNode(this.refs.content),
        margin = parseInt(_domHelpersStyle2['default'](content, 'margin-top'), 10) + parseInt(_domHelpersStyle2['default'](content, 'margin-bottom'), 10);

    var height = (_domHelpersQueryHeight2['default'](content) || 0) + (isNaN(margin) ? 0 : margin);

    if (this.state.height !== height) {
      el.style.height = height + 'px';
      this.setState({ height: height });
    }
  },

  open: function open() {
    var _this = this;

    var self = this,
        anim = _utilCompat2['default'].findDOMNode(this),
        el = _utilCompat2['default'].findDOMNode(this.refs.content);

    this.ORGINAL_POSITION = _domHelpersStyle2['default'](el, 'position');
    this.transitionState = OPENING;

    if (this._initialPosition) {
      this._initialPosition = false;
      this.reset();
    } else this.height();

    this.props.onOpening();

    anim.className += ' rw-popup-animating';
    el.style.position = 'absolute';

    this._transition = _utilConfiguration2['default'].animate(el, { top: 0 }, self.props.duration, 'ease', function () {
      if (_this.transitionState !== OPENING) return;

      _this.transitionState = NONE;
      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');

      el.style.position = self.ORGINAL_POSITION;
      anim.style.overflow = 'visible';
      _this.ORGINAL_POSITION = null;

      _this.props.onOpen();
    });
  },

  close: function close(dur) {
    var _this2 = this;

    var el = _utilCompat2['default'].findDOMNode(this.refs.content),
        anim = _utilCompat2['default'].findDOMNode(this);

    this.ORGINAL_POSITION = _domHelpersStyle2['default'](el, 'position');

    this.transitionState = CLOSING;

    this.height();
    this.props.onClosing();

    anim.style.overflow = 'hidden';
    anim.className += ' rw-popup-animating';
    el.style.position = 'absolute';

    this._transition = _utilConfiguration2['default'].animate(el, { top: this.props.dropUp ? '100%' : '-100%' }, dur === undefined ? this.props.duration : dur, 'ease', function () {
      if (_this2.transitionState !== CLOSING) return;

      _this2.transitionState = NONE;
      el.style.position = self.ORGINAL_POSITION;
      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');

      anim.style.display = 'none';
      _this2.ORGINAL_POSITION = null;
      _this2.props.onClose();
    });
  }

});

function childKey(children) {
  var nextChildMapping = _react2['default'].Children.map(children, function (c) {
    return c;
  });
  for (var key in nextChildMapping) return key;
}