"use strict";
var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require("react"),
    ReplaceTransitionGroup = require("./ReplaceTransitionGroup"),
    _ = require("./util/_"),
    $ = require("./util/dom");


var SlideChildGroup = React.createClass({
  displayName: "SlideChildGroup",


  propTypes: {
    direction: React.PropTypes.oneOf(["left", "right"])
  },

  componentWillEnter: function (done) {
    var _this = this;
    var node = this.getDOMNode(),
        width = $.width(node),
        direction = this.props.direction;

    width = direction === "left" ? width : -width;

    this.ORGINAL_POSITION = node.style.position;

    $.css(node, { position: "absolute", left: width + "px", top: 0 });

    $.animate(node, { left: 0 }, this.props.duration, function () {
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
    var node = this.getDOMNode(),
        width = $.width(node),
        direction = this.props.direction;

    width = direction === "left" ? -width : width;

    this.ORGINAL_POSITION = node.style.position;

    $.css(node, { position: "absolute", top: 0, left: 0 });

    $.animate(node, { left: width + "px" }, this.props.duration, function () {
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
    var style = this.props.style;
    var children = this.props.children;
    var props = _objectWithoutProperties(this.props, ["style", "children"]);

    style = _.assign({}, style, { position: "relative", overflow: "hidden" });

    return React.createElement(
      ReplaceTransitionGroup,
      _extends({}, props, {
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