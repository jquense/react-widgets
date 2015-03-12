"use strict";
var React = require("react"),
    Btn = require("./WidgetButton");

module.exports = React.createClass({
  displayName: "exports",

  propTypes: {
    label: React.PropTypes.string.isRequired,
    labelId: React.PropTypes.string,

    upDisabled: React.PropTypes.bool.isRequired,
    prevDisabled: React.PropTypes.bool.isRequired,
    nextDisabled: React.PropTypes.bool.isRequired,
    onViewChange: React.PropTypes.func.isRequired,
    onMoveLeft: React.PropTypes.func.isRequired,
    onMoveRight: React.PropTypes.func.isRequired,

    messages: React.PropTypes.shape({
      moveBack: React.PropTypes.string,
      moveForward: React.PropTypes.string
    })
  },

  mixins: [require("./mixins/PureRenderMixin"), require("./mixins/RtlChildContextMixin")],

  getDefaultProps: function () {
    return {
      messages: {
        moveBack: "navigate back",
        moveForward: "navigate forward" }
    };
  },

  render: function () {
    var rtl = this.isRtl();

    return React.createElement(
      "div",
      { className: "rw-header" },
      React.createElement(
        Btn,
        { className: "rw-btn-left",
          tabIndex: "-1",
          onClick: this.props.onMoveLeft,
          disabled: this.props.prevDisabled,
          "aria-disabled": this.props.prevDisabled,
          title: this.props.moveBack },
        React.createElement("i", { className: "rw-i rw-i-caret-" + (rtl ? "right" : "left") }),
        React.createElement(
          "span",
          { className: "rw-sr" },
          this.props.messages.moveBack
        )
      ),
      React.createElement(
        Btn,
        { className: "rw-btn-view",
          id: this.props.labelId,
          tabIndex: "-1",
          onClick: this.props.onViewChange,
          disabled: this.props.upDisabled,
          "aria-disabled": this.props.upDisabled },
        this.props.label
      ),
      React.createElement(
        Btn,
        { className: "rw-btn-right",
          tabIndex: "-1",
          onClick: this.props.onMoveRight,
          disabled: this.props.nextDisabled,
          "aria-disabled": this.props.nextDisabled,
          title: this.props.moveForward },
        React.createElement("i", { className: "rw-i rw-i-caret-" + (rtl ? "left" : "right") }),
        React.createElement(
          "span",
          { className: "rw-sr" },
          this.props.messages.moveForward
        )
      )
    );
  }
});