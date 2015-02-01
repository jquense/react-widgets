"use strict";
var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    $ = require("./util/dom");


var PopupContent = React.createClass({
  displayName: "PopupContent",
  render: function () {
    var Content = React.Children.only(this.props.children);

    Content.props.className = (Content.props.className || "") + " rw-popup rw-widget";

    return Content;
  }
});


module.exports = React.createClass({
  displayName: "exports",


  propTypes: {
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
    var className = this.props.className;
    var open = this.props.open;
    var props = _objectWithoutProperties(this.props, ["className", "open"]);

    return React.createElement(
      "div",
      _extends({}, props, { className: (className || "") + " rw-popup-container" }),
      React.createElement(
        PopupContent,
        { ref: "content" },
        this.props.children
      )
    );
  },

  dimensions: function () {
    var el = this.getDOMNode(),
        content = this.refs.content.getDOMNode(),
        margin = parseInt($.css(content, "margin-top"), 10) + parseInt($.css(content, "margin-bottom"), 10);

    el.style.display = "block";
    el.style.height = $.height(content) + (isNaN(margin) ? 0 : margin) + "px";
  },

  open: function () {
    var self = this,
        anim = this.getDOMNode(),
        el = this.refs.content.getDOMNode();

    this.ORGINAL_POSITION = $.css(el, "position");

    this._isOpening = true;
    this.dimensions();
    this.props.onOpening();

    anim.className += " rw-popup-animating";
    el.style.position = "absolute";

    $.animate(el, { top: 0 }, self.props.duration, "ease", function () {
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
        el = this.refs.content.getDOMNode(),
        anim = this.getDOMNode();

    this.ORGINAL_POSITION = $.css(el, "position");

    this._isOpening = false;
    this.dimensions();
    this.props.onClosing();

    anim.style.overflow = "hidden";
    anim.className += " rw-popup-animating";
    el.style.position = "absolute";

    $.animate(el, { top: "-100%" }, dur === undefined ? this.props.duration : dur, "ease", function () {
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