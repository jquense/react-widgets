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

var _TetherTarget = require('./TetherTarget');

var _TetherTarget2 = babelHelpers.interopRequireDefault(_TetherTarget);

var _util_ = require('./util/_');

var transform = _utilConfiguration2['default'].animate.transform;

function properties(prop, value) {
  var _ref, _ref2;

  var TRANSLATION_MAP = _utilConfiguration2['default'].animate.TRANSLATION_MAP;

  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return _ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref;

  return _ref2 = {}, _ref2[prop] = value, _ref2;
}

var PopupContent = _react2['default'].createClass({
  displayName: 'PopupContent',

  render: function render() {
    var props = this.props;
    var child = props.children;

    if (!child) return _react2['default'].createElement('span', { className: 'rw-popup rw-widget' });

    child = _react2['default'].Children.only(props.children);

    return _react.cloneElement(child, babelHelpers._extends({}, props, {
      className: _classnames2['default'](this.props.className, child.props.className, 'rw-popup rw-widget')
    }));
  }
});

module.exports = _react2['default'].createClass({

  displayName: 'TetheredPopup',

  propTypes: {
    open: _react2['default'].PropTypes.bool,
    dropUp: _react2['default'].PropTypes.bool,
    duration: _react2['default'].PropTypes.number,

    onRequestClose: _react2['default'].PropTypes.func.isRequired,
    onClosing: _react2['default'].PropTypes.func,
    onOpening: _react2['default'].PropTypes.func,
    onClose: _react2['default'].PropTypes.func,
    onOpen: _react2['default'].PropTypes.func,
    onKeyDown: _react2['default'].PropTypes.func,
    dropDownHeight: _react2['default'].PropTypes.number
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

  getInitialState: function getInitialState() {
    return {
      width: 'auto'
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

  componentDidMount: function componentDidMount() {
    var placeholder = this.refs.placeholder;

    var placeholderEl = _utilCompat2['default'].findDOMNode(placeholder);
    var width = placeholderEl.offsetWidth;

    this.setState({ width: width });
  },

  componentDidUpdate: function componentDidUpdate(pvProps) {
    var closing = pvProps.open && !this.props.open,
        opening = !pvProps.open && this.props.open;

    var placeholder = this.refs.placeholder;

    var placeholderEl = _utilCompat2['default'].findDOMNode(placeholder);

    var width = placeholderEl.offsetWidth;

    if (width !== this.state.width) this.setState({ width: width });else if (opening) this.open();else if (closing) this.close();
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var open = _props.open;
    var dropUp = _props.dropUp;
    var propStyle = _props.style;
    var onBlur = _props.onBlur;
    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'open', 'dropUp', 'style', 'onBlur']);

    var opacity = open ? 1 : 0;
    var pointerEvents = open ? 'all' : 'none';
    var width = this.state.width;

    return _react2['default'].createElement(
      'div',
      babelHelpers._extends({}, props, {
        style: babelHelpers._extends({}, propStyle),
        className: _classnames2['default'](className, 'rw-popup-container', 'rw-tether', { 'rw-dropup': dropUp })
      }),
      _react2['default'].createElement(
        _TetherTarget2['default'],
        {
          tether: _react2['default'].createElement(
            PopupContent,
            { className: className, tabIndex: 1, ref: 'content', style: { width: width, opacity: opacity, pointerEvents: pointerEvents } },
            _react2['default'].createElement(
              'div',
              { ref: 'wrap' },
              this.props.children
            )
          ),
          options: {
            attachment: 'bottom right',
            classes: {
              element: 'rw-popup-tether-element'
            }
          }
        },
        open && _react2['default'].createElement('div', { className: 'rw-tether-scrim', onClick: onBlur }),
        _react2['default'].createElement('div', { ref: 'placeholder', style: { width: '100%' } })
      )
    );
  },

  onResize: function onResize() {
    var placeholder = this.refs.placeholder;

    if (!placeholder) return false;

    var el = _utilCompat2['default'].findDOMNode(placeholder);
    var width = el.offsetWidth;

    if (width !== this.state.width) this.setState({ width: width });
  },

  reset: function reset() {
    var container = _utilCompat2['default'].findDOMNode(this),
        content = _utilCompat2['default'].findDOMNode(this.refs.content),
        style = { display: 'block', overflow: 'hidden' };

    _domHelpersStyle2['default'](container, style);
    _domHelpersStyle2['default'](content, properties('opacity', 0));
  },

  open: function open() {
    var content = this.refs.content;

    var self = this,
        anim = _utilCompat2['default'].findDOMNode(this),
        contentEl = _utilCompat2['default'].findDOMNode(content);

    var _props2 = this.props;
    var onOpen = _props2.onOpen;
    var onKeyDown = _props2.onKeyDown;
    var getTetherFocus = _props2.getTetherFocus;

    var focusComponent = content;
    var focusEl = undefined;

    if (_util_.isFunction(getTetherFocus)) focusComponent = getTetherFocus();
    if (focusComponent) focusEl = _utilCompat2['default'].findDOMNode(focusComponent);

    this._isOpening = true;

    if (this._initialPosition) {
      this._initialPosition = false;
      this.reset();
    }

    this.props.onOpening();

    anim.className += ' rw-popup-animating';

    _utilConfiguration2['default'].animate(contentEl, { opacity: 1 }, self.props.duration, 'ease', function () {
      if (!self._isOpening) return;

      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');
      anim.style.overflofw = 'visible';

      if (onOpen) onOpen();

      if (!focusEl) return false;

      focusEl.addEventListener('keydown', onKeyDown);
      focusEl.focus();
    });
  },

  close: function close(dur) {
    var self = this,
        el = _utilCompat2['default'].findDOMNode(this.refs.content),
        anim = _utilCompat2['default'].findDOMNode(this);

    this._isOpening = false;
    this.props.onClosing();

    anim.style.overflow = 'hidden';
    anim.className += ' rw-popup-animating';

    _utilConfiguration2['default'].animate(el, { opacity: 0 }, dur === undefined ? this.props.duration : dur, 'ease', function () {
      if (self._isOpening) return;
      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');
      self.props.onClose();
    });
  }

});

function childKey(children) {
  var nextChildMapping = _react2['default'].Children.map(children, function (c) {
    return c;
  });
  for (var key in nextChildMapping) return key;
}