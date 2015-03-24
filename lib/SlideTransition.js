"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    ReplaceTransitionGroup = require("./ReplaceTransitionGroup"),
    _ = require("./util/_"),
    compat = require("./util/compat"),
    $ = require("./util/dom"),
    config = require("./util/configuration");

var SlideChildGroup = React.createClass({
  displayName: "SlideChildGroup",

  propTypes: {
    direction: React.PropTypes.oneOf(["left", "right"]),
    duration: React.PropTypes.number
  },

  componentWillEnter: function (done) {
    var _this = this;

    var node = compat.findDOMNode(this),
        width = $.width(node),
        direction = this.props.direction;

    width = direction === "left" ? width : -width;

    this.ORGINAL_POSITION = node.style.position;

    $.css(node, { position: "absolute", left: width + "px", top: 0 });

    config.animate(node, { left: 0 }, this.props.duration, function () {

      $.css(node, {
        position: _this.ORGINAL_POSITION,
        overflow: "hidden"
      });

      _this.ORGINAL_POSITION = null;
      done && done();
    });
  },

  componentWillLeave: function (done) {
    var _this = this;

    var node = compat.findDOMNode(this),
        width = $.width(node),
        direction = this.props.direction;

    width = direction === "left" ? -width : width;

    this.ORGINAL_POSITION = node.style.position;

    $.css(node, { position: "absolute", top: 0, left: 0 });

    config.animate(node, { left: width + "px" }, this.props.duration, function () {
      $.css(node, {
        position: _this.ORGINAL_POSITION,
        overflow: "hidden"
      });

      _this.ORGINAL_POSITION = null;
      done && done();
    });
  },

  render: function () {
    return React.Children.only(this.props.children);
  }

});

module.exports = React.createClass({
  displayName: "exports",

  propTypes: {
    direction: React.PropTypes.oneOf(["left", "right"]),
    duration: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      direction: "left",
      duration: 250
    };
  },

  _wrapChild: function (child, ref) {
    return React.createElement(
      SlideChildGroup,
      { key: child.key, ref: ref,
        direction: this.props.direction,
        duration: this.props.duration },
      child
    );
  },

  render: function () {
    var _props = this.props;
    var style = _props.style;
    var children = _props.children;
    var props = babelHelpers.objectWithoutProperties(_props, ["style", "children"]);

    style = _.assign({}, style, { position: "relative", overflow: "hidden" });

    return React.createElement(
      ReplaceTransitionGroup,
      babelHelpers._extends({}, props, {
        ref: "container",
        childFactory: this._wrapChild,
        style: style,
        component: "div" }),
      children
    );
  },

  isTransitioning: function () {
    return this.isMounted() && this.refs.container.isTransitioning();
  }
});