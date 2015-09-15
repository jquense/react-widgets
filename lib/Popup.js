'use strict';

var babelHelpers = require('./util/babelHelpers.js');

var React = require('react'),
    css = require('dom-helpers/style'),
    getHeight = require('dom-helpers/query/height'),
    config = require('./util/configuration'),
    cn = require('classnames'),
    compat = require('./util/compat');

var transform = config.animate.transform;

function properties(prop, value) {
  var _ref, _ref2;

  var TRANSLATION_MAP = config.animate.TRANSLATION_MAP;

  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return (_ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref);

  return (_ref2 = {}, _ref2[prop] = value, _ref2);
}

var PopupContent = React.createClass({
  displayName: 'PopupContent',

  render: function render() {
    var child = this.props.children;

    if (!child) return React.createElement('span', { className: 'rw-popup rw-widget' });

    child = React.Children.only(this.props.children);

    return compat.cloneElement(child, {
      className: cn(child.props.className, 'rw-popup rw-widget')
    });
  }
});

module.exports = React.createClass({

  displayName: 'Popup',

  propTypes: {
    open: React.PropTypes.bool,
    dropUp: React.PropTypes.bool,
    duration: React.PropTypes.number,

    onRequestClose: React.PropTypes.func.isRequired,
    onClosing: React.PropTypes.func,
    onOpening: React.PropTypes.func,
    onClose: React.PropTypes.func,
    onOpen: React.PropTypes.func
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

    return React.createElement(
      'div',
      babelHelpers._extends({}, props, {
        style: babelHelpers._extends({
          display: display,
          height: this.state.height
        }, props.style),
        className: cn(className, 'rw-popup-container', { 'rw-dropup': dropUp })
      }),
      React.createElement(
        PopupContent,
        { ref: 'content' },
        this.props.children
      )
    );
  },

  reset: function reset() {
    var container = compat.findDOMNode(this),
        content = compat.findDOMNode(this.refs.content),
        style = { display: 'block', overflow: 'hidden' };

    css(container, style);
    this.height();
    css(content, properties('top', this.props.dropUp ? '100%' : '-100%'));
  },

  height: function height() {
    var el = compat.findDOMNode(this),
        content = compat.findDOMNode(this.refs.content),
        margin = parseInt(css(content, 'margin-top'), 10) + parseInt(css(content, 'margin-bottom'), 10);

    var height = getHeight(content) + (isNaN(margin) ? 0 : margin);

    if (this.state.height !== height) {
      el.style.height = height + 'px';
      this.setState({ height: height });
    }
  },

  open: function open() {
    var self = this,
        anim = compat.findDOMNode(this),
        el = compat.findDOMNode(this.refs.content);

    this.ORGINAL_POSITION = css(el, 'position');
    this._isOpening = true;

    if (this._initialPosition) {
      this._initialPosition = false;
      this.reset();
    } else this.height();

    this.props.onOpening();

    anim.className += ' rw-popup-animating';
    el.style.position = 'absolute';

    config.animate(el, { top: 0 }, self.props.duration, 'ease', function () {
      if (!self._isOpening) return;

      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');

      el.style.position = self.ORGINAL_POSITION;
      anim.style.overflow = 'visible';
      self.ORGINAL_POSITION = null;

      self.props.onOpen();
    });
  },

  close: function close(dur) {
    var self = this,
        el = compat.findDOMNode(this.refs.content),
        anim = compat.findDOMNode(this);

    this.ORGINAL_POSITION = css(el, 'position');

    this._isOpening = false;
    this.height();
    this.props.onClosing();

    anim.style.overflow = 'hidden';
    anim.className += ' rw-popup-animating';
    el.style.position = 'absolute';

    config.animate(el, { top: this.props.dropUp ? '100%' : '-100%' }, dur === undefined ? this.props.duration : dur, 'ease', function () {
      if (self._isOpening) return;

      el.style.position = self.ORGINAL_POSITION;
      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');

      anim.style.display = 'none';
      self.ORGINAL_POSITION = null;
      self.props.onClose();
    });
  }

});

function childKey(children) {
  var nextChildMapping = React.Children.map(children, function (c) {
    return c;
  });
  for (var key in nextChildMapping) return key;
}