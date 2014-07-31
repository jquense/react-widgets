var React   = require('react/addons')
  , TransitionGroup  = React.addons.TransitionGroup
  , $  =  require('zepto')
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

    $this.removeClass('slide-left out')
      .addClass('slide-left')

    this.props.onEnter()

    if (!event) return finish()

    setTimeout(function(){
      $this.addClass('in')
      events.on(node, event, finish)
      transitions.emulateEnd(node, 300, event)
    }, 0)
    //node.style.left = 0;


    function finish() {
      events.off(node, event, finish)
      $this.removeClass('slide-left')
      done && done() 
      self.props.onLeave()
    }
  },

  componentWillLeave: function(done) {
    var self = this
      , event = transitions.endEvent()
      , node  = this.getDOMNode()
      , $this = $(node)
      , direction = this.props.direction;

    $this.removeClass('out')
      .addClass('slide-left in')

    this.props.onEnter()

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
      //$this.removeClass('slide-left')
      done && done()
      self.props.onLeave()
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
    return SlideChildGroup({ 
      direction: this.props.direction,
      onEnter: this._enter,
      onLeave: this._leave
    },
    child)
  },

  render: function() {
    this._enter = _.after(2, this.enter)
    this._leave = _.after(2, this.leave)

    return this.transferPropsTo(
      TransitionGroup(
        { 
          ref: 'container', 
          childFactory: this._wrapChild, 
          style: { position: 'relative', overflow: 'hidden' },
          component: React.DOM.div
        },
        this.props.children
      )
    );
  },

  enter: function(){
    var node = this.getDOMNode();

    $(node).height(node['scrollHeight'])
  },

  leave: function(){
    var node = this.getDOMNode();

    $(node).height('')
  }
});

