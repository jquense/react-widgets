var React   = require('react')
  , ReplaceTransitionGroup  = require('./ReplaceTransitionGroup.jsx')
  , $  =  require('../util/dom')
  , _ = require('lodash');


var SlideChildGroup = React.createClass({

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right'])
  },

  getDefaultProps: function(){
    return { duration: 250 }
  },

  componentWillEnter: function(done) {
    var self  = this
      , node  = this.getDOMNode()
      , width = $.width(node)
      , direction = this.props.direction;

    width = direction === 'left' ? width : -width

    this.ORGINAL_POSITION = node.style.position;

    $.css(node, { position: 'absolute', left: width + 'px' , top: 0 })

    $.animate(node, { left: 0 }, self.props.duration, function(){
        $.css(node, { 
          position:  self.ORGINAL_POSITION, 
          overflow: 'hidden'
        });

        self.ORGINAL_POSITION = null
        done && done()
      })
  },

  componentWillLeave: function(done) {
    var self  = this
      , node  = this.getDOMNode()
      , width = $.width(node)
      , direction = this.props.direction;

    width = direction === 'left' ? -width : width

    this.ORGINAL_POSITION = node.style.position

    $.css(node, { position: 'absolute', top: 0, left: 0})

    $.animate(node, { left: width + 'px'}, self.props.duration, function(){
        $.css(node, { 
          position: self.ORGINAL_POSITION, 
          overflow: 'hidden'
        });

        self.ORGINAL_POSITION = null
        done && done()
      })
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
  },

  isTransitioning: function(){
    return this.isMounted() && this.refs.container.isTransitioning()
  },

  
});

