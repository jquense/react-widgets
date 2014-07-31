var React   = require('react/addons')
  , TransitionGroup  = React.addons.TransitionGroup
  , $  =  require('zepto')
  , events  =  require('../util/events');

//thanks Bootstrap, stack overflow and alex mccaw
//https://github.com/twbs/bootstrap/blob/master/js/collapse.js
//http://stackoverflow.com/questions/5023514/how-do-i-normalize-css3-transition-functions-across-browsers
//http://blog.alexmaccaw.com/css-transitions
var SlideChildGroup = React.createClass({

  propTypes: {
    dimension: React.PropTypes.oneOf(['height', 'width'])
  },

  componentWillEnter: function(done) {
    var event = transitionEndEventName()
      , node  = this.getDOMNode()
      , $this = $(node)
      , dimension = this.props.dimension;

    $this.removeClass('collapse')
      .addClass('collapsing')
      .height(0)

    if (!event) return finish()

    events.on(node, event, finish)
    emulateTransitionEnd(node, 300, event)

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
    var event = transitionEndEventName()
      , node  = this.getDOMNode()
      , $this = $(node)
      , dimension = this.props.dimension;

    $this[dimension]($this[dimension]())[0].offsetHeight

    $this.addClass('collapsing')
      .removeClass('collapse in')
      [dimension](0)

    if (!event) return finish()

    events.on(node, event, finish)
    emulateTransitionEnd(node, 300, event)

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

function emulateTransitionEnd(el, duration, event) {
  var called = false;

  events.on(el, event, done);

  setTimeout(function() { 
    if (!called) events.trigger(el, event); 
  }, duration);

  function done() { 
    called = true;
    events.off(el, event, done) 
  }
};

function transitionEndEventName () {
    var i,
        undefined,
        el = document.createElement('div'),
        transitions = {
            'transition':'transitionend',
            'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

    for (i in transitions)
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined)
            return transitions[i];
}