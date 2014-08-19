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

  getDefaultProps: function(){
    return { duration: 250 }
  },

  componentWillEnter: function(done) {
    var self = this
      , event = transitions.endEvent()
      , node  = this.getDOMNode()
      , $this = $(node)
      , width = $this.width()
      , direction = this.props.direction;

    this.ORGINAL_POSITION = $this.css('position');

    $this.css({ position: 'absolute', overflow: 'hidden', left:  direction === 'left' ? width : -width, top: 0 })
      .animate({ left: 0 }, self.props.duration, function(){
        $this.css({ 
          position:  self.ORGINAL_POSITION || 'static', 
          overflow: 'hidden'
        });

        self.ORGINAL_POSITION = null
        done && done()
      })
  },

  componentWillLeave: function(done) {
    var self = this
      , event = transitions.endEvent()
      , node  = this.getDOMNode()
      , $this = $(node)
      , width = $this.width()
      , direction = this.props.direction;

    this.ORGINAL_POSITION = $this.css('position');

    $this.css({ position: 'absolute', overflow: 'hidden', top: 0, left: 0})
      .animate({ left: direction === 'left' ? -width : width }, self.props.duration, function(){
        $this.css({ 
          position:  self.ORGINAL_POSITION || 'static', 
          overflow: 'hidden'
        });

        self.ORGINAL_POSITION = null
        done && done()
      })
  },

  render: function() {
    return React.Children.only(this.props.children);
  },

  
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
  },

  isTransitioning: function(){
    return this.isMounted() && this.refs.container.isTransitioning()
  },

  
});

