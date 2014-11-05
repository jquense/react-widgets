/** @jsx React.DOM */
var React = require('react');

var btn = require('../common/btn')

module.exports = React.createClass({displayName: 'exports',

  propTypes: {
    label:          React.PropTypes.string.isRequired,
    labelId:        React.PropTypes.string,

    upDisabled:     React.PropTypes.bool.isRequired,
    prevDisabled:   React.PropTypes.bool.isRequired,
    nextDisabled:   React.PropTypes.bool.isRequired,
    onViewChange:   React.PropTypes.func.isRequired,
    onMoveLeft:     React.PropTypes.func.isRequired,
    onMoveRight:    React.PropTypes.func.isRequired,

    messages:       React.PropTypes.shape({
      moveBack:     React.PropTypes.string,
      moveForward:  React.PropTypes.string
    })
  },

  mixins: [
    require('../mixins/PureRenderMixin'),
    require('../mixins/RtlChildContextMixin')
  ],

  getDefaultProps: function(){
    return {
      messages: {
        moveBack:     'navigate back',
        moveForward:  'navigate forward',
      }
    }
  },

  render: function(){
    var self = this
      , rtl = this.isRtl();

    return (
      React.DOM.div({className: "rw-header"}, 
        btn({className: "rw-btn-left", 
          onClick: this.props.onMoveLeft, 
          disabled: this.props.prevDisabled, 
          'aria-disabled': this.props.prevDisabled, 
          title: this.props.moveBack}, 
          React.DOM.i({className: "rw-i rw-i-caret-" + (rtl ? 'right' : 'left')}, 
            React.DOM.span({className: "rw-sr"}, this.props.moveBack))
        ), 
        btn({className: "rw-btn-view", 
          id: this.props.labelId, 
          onClick: this.props.onViewChange, 
          disabled: this.props.upDisabled, 
          'aria-disabled': this.props.upDisabled}, 
           this.props.label
        ), 
        btn({className: "rw-btn-right", 
          onClick: this.props.onMoveRight, 
          disabled: this.props.nextDisabled, 
          'aria-disabled': this.props.nextDisabled, 
          title: this.props.moveForward}, 
          React.DOM.i({className: "rw-i rw-i-caret-" + (rtl ? 'left' : 'right')}, 
            React.DOM.span({className: "rw-sr"}, this.props.moveForward))
        )
      )
    )
  }
})