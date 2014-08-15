var React   = require('react/addons')
  , ReplaceTransitionGroup  = require('./ReplaceTransitionGroup.jsx')
  , $  =  require('$')
  , transitions = require('../util/transition')
  , events  =  require('../util/events')
  , _ = require('lodash');


var SlideChildGroup = React.createClass({

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right'])
  },

  componentWillEnter: function(done) {
    var self = this
      , event = transitions.endEvent()
      , node  = this.getDOMNode()
      , $this = $(node)
      , direction = this.props.direction;

    $this.removeClass('slide-' + direction + ' out')
      .addClass('slide-' + direction)

    if (!event) return finish()

    setTimeout(function(){
      $this.addClass('in')
      events.on(node, event, finish)
      transitions.emulateEnd(node, 300, event)
    }, 0)

    function finish() {
      events.off(node, event, finish)
      $this.removeClass('slide-' + direction)
      done && done()  
    }
  },

  componentWillLeave: function(done) {
    var self = this
      , event = transitions.endEvent()
      , node  = this.getDOMNode()
      , $this = $(node)
      , direction = this.props.direction;

    $this.removeClass('out')
      .addClass('slide-' + direction + ' in')

    if (!event) return finish()

    setTimeout(function(){
      $this.addClass('out')
      events.on(node, event, finish)
      transitions.emulateEnd(node, 300, event)
    }, 0)

    events.on(node, event, finish)
    transitions.emulateEnd(node, 300, event)

    function finish() {
      events.off(node, event, finish)
      $this.removeClass('slide-'+ direction)
      done && done()
    }
  },

  render: function() {
    return React.Children.only(this.props.children);
  }
})


module.exports = React.createClass({

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right'])
  },

  getDefaultProps: function(){
    return {
      direction: 'left'
    }
  },

  _wrapChild: function(child) {
    var self = this;

    return SlideChildGroup({ 
      direction: this.props.direction
    },
    child)
  },


  render: function() {

    return this.transferPropsTo(
      ReplaceTransitionGroup(
        { 
          ref: 'container', 
          childFactory: this._wrapChild, 
          style: { position: 'relative', overflow: 'hidden' },
          component: React.DOM.div
        },
        this.props.children
      )
    );
  }

  
});

