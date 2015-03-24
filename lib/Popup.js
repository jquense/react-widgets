"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    $ = require("./util/dom"),
    config = require("./util/configuration"),
    cn = require("classnames"),
    compat = require("./util/compat");

var PopupContent = React.createClass({
  displayName: "PopupContent",

  render: function () {
    var child = React.Children.only(this.props.children);

    return compat.cloneElement(child, {
      className: cn(child.props.className, "rw-popup rw-widget")
    });
  }
});

module.exports = React.createClass({
  displayName: "exports",

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

  getDefaultProps: function () {
    return {
      duration: 200,
      open: false,
      onClosing: function () {},
      onOpening: function () {},
      onClose: function () {},
      onOpen: function () {} };
  },

  componentDidMount: function () {
    !this.props.open && this.close(0);
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
    });
  },

  componentDidUpdate: function (pvProps, pvState) {
    var closing = pvProps.open && !this.props.open,
        opening = !pvProps.open && this.props.open;

    if (opening) this.open();else if (closing) this.close();
  },

  render: function () {
    var _props = this.props;
    var className = _props.className;
    var open = _props.open;
    var dropUp = _props.dropUp;
    var props = babelHelpers.objectWithoutProperties(_props, ["className", "open", "dropUp"]);

    return React.createElement(
      "div",
      babelHelpers._extends({}, props, { className: cn(className, "rw-popup-container", { "rw-dropup": dropUp }) }),
      React.createElement(
        PopupContent,
        { ref: "content" },
        this.props.children
      )
    );
  },

  dimensions: function () {
    var el = compat.findDOMNode(this),
        content = compat.findDOMNode(this.refs.content),
        margin = parseInt($.css(content, "margin-top"), 10) + parseInt($.css(content, "margin-bottom"), 10);

    el.style.display = "block";
    el.style.height = $.height(content) + (isNaN(margin) ? 0 : margin) + "px";
  },

  open: function () {
    var self = this,
        anim = compat.findDOMNode(this),
        el = compat.findDOMNode(this.refs.content);

    this.ORGINAL_POSITION = $.css(el, "position");

    this._isOpening = true;
    this.dimensions();
    this.props.onOpening();

    anim.className += " rw-popup-animating";
    el.style.position = "absolute";

    config.animate(el, { top: 0 }, self.props.duration, "ease", function () {
      if (!self._isOpening) return;

      anim.className = anim.className.replace(/ ?rw-popup-animating/g, "");

      el.style.position = self.ORGINAL_POSITION;
      anim.style.overflow = "visible";
      self.ORGINAL_POSITION = null;

      self.props.onOpen();
    });
  },

  close: function (dur) {
    var self = this,
        el = compat.findDOMNode(this.refs.content),
        anim = compat.findDOMNode(this);

    this.ORGINAL_POSITION = $.css(el, "position");

    this._isOpening = false;
    this.dimensions();
    this.props.onClosing();

    anim.style.overflow = "hidden";
    anim.className += " rw-popup-animating";
    el.style.position = "absolute";

    config.animate(el, { top: this.props.dropUp ? "100%" : "-100%" }, dur === undefined ? this.props.duration : dur, "ease", function () {
      if (self._isOpening) return;

      el.style.position = self.ORGINAL_POSITION;
      anim.className = anim.className.replace(/ ?rw-popup-animating/g, "");

      anim.style.display = "none";
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