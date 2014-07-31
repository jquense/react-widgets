var React = require('react/addons')
  , TransitionGroup = React.addons.TransitionGroup
  , transitions = require('../util/transition')
  , events      = require('../util/events')
  , $  =  require('zepto');

//thanks Bootstrap
//https://github.com/twbs/bootstrap/blob/master/js/collapse.js
var SlideChildGroup = React.createClass({

  propTypes: {
    dimension: React.PropTypes.oneOf(['height', 'width'])
  },

  componentWillEnter: function(done) {
    var event = transitions.endEvent()
      , node  = this.getDOMNode()
      , $this = $(node)
      , dimension = this.props.dimension;

    $this.removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    if (!event) return finish()

    events.on(node, event, finish)
    transitions.emulateEnd(node, 300, event)

    $this[dimension](node['scroll' + dimension.charAt(0).toUpperCase() + dimension.substr(1)])

    function finish() {
      events.off(node, event, finish)
      $this
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('')
      done && done()
    }
  },

  componentWillLeave: function(done) {
    var event = transitions.endEvent()
      , node  = this.getDOMNode()
      , $this = $(node)
      , dimension = this.props.dimension;

    $this[dimension]($this[dimension]())[0].offsetHeight

    $this.addClass('collapsing')
      .removeClass('collapse in')
      [dimension](0)

    if (!event) return finish()

    events.on(node, event, finish)
    transitions.emulateEnd(node, 300, event)

    function finish() {
      events.off(node, event, finish)
      $this
        .removeClass('collapsing')
        .addClass('collapse')
      done && done()
    }
  },

  render: function() {
    return React.Children.only(this.props.children);
  }
})


module.exports = React.createClass({

  propTypes: {
    dimension: React.PropTypes.oneOf(['height', 'width'])
  },

  getDefaultProps: function(){
    return {
      dimension: 'height'
    }
  },
  _wrapChild: function(child) {
    return SlideChildGroup({ 
      dimension: this.props.dimension 
    },
    child)
  },

  render: function() {
    return this.transferPropsTo(
      TransitionGroup(
        { childFactory: this._wrapChild },
        this.props.children
      )
    );
  }
});
