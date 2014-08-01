var React = require('react/addons')
  , TransitionGroup = React.addons.TransitionGroup
  , transitions = require('../util/transition')
  , events      = require('../util/events')
  , $  =  require('zepto');


var SlideChildGroup = React.createClass({

  propTypes: {
    dimension: React.PropTypes.oneOf(['height', 'width'])
  },

  componentDidMount: function() {
    var event = transitions.endEvent()
      , prop  = getSupportedPropertyName()
      , node  = this.getDOMNode()

      this.props.height(node.offsetHeight)
      node.style[prop] = 'translateY(-'+ node.offsetHeight +'px)'  
  },

  componentWillEnter: function(done) {
    var event = transitions.endEvent()
      , prop  = getSupportedPropertyName()
      , node  = this.getDOMNode()
      , $this = $(node)
      , dimension = this.props.dimension;

    if (!event) return finish()

    setTimeout(function(){
      events.on(node, event, finish)
      transitions.emulateEnd(node, 300, event)
      $this.addClass('sliding')
      node.style[prop] = 'translateY(0)'
    }, 0)
    

    function finish() {
      events.off(node, event, finish)
      $this.removeClass('sliding')
      done()
    }
  },

  componentWillLeave: function(done) {
    var event = transitions.endEvent()
      , node  = this.getDOMNode()
      , $this = $(node);

    $this.removeClass('sliding')
    done()
  },

  render: function() {
    return React.Children.only(this.props.children);
  }
})


module.exports = React.createClass({

  _height: function(contentHeight) {
    $(this.getDOMNode()).height(contentHeight) 
  },

  _wrapChild: function(child) {
    return SlideChildGroup({ 
      height: this._height,
      dimension: this.props.dimension 
    },
    child)
  },

  render: function() {
    return this.transferPropsTo(
      TransitionGroup(
        { childFactory: this._wrapChild, style: { position: 'relative', overflow: 'hidden', display: 'block' } },
        this.props.children
      )
    );
  }
});


function getSupportedPropertyName() {
  var properties = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];

  for (var i = 0; i < properties.length; i++)
      if (document.body.style[properties[i]] !== undefined) 
          return properties[i];
}
