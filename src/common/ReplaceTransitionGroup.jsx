/**
 * A streamlined version of TransitionGroup built for managing at most two 'active' children
 * also provides additional hooks for animation start/end
 * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
 * relevent code is licensed accordingly 
 */

"use strict";

var React = require('react')
  , cloneWithProps = require('../util/transferProps').cloneWithProps
  , transferPropsTo = require('../util/transferProps').mergeIntoProps
  , $ = require('../util/dom')
  , _ = require('../util/_');




module.exports = React.createClass({

  displayName: 'ReplaceTransitionGroup',

  propTypes: {
    component:    React.PropTypes.func,
    childFactory: React.PropTypes.func,

    onAnimating:  React.PropTypes.func,
    onAnimate:    React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      component: React.DOM.span,
      childFactory: function(a){ return a },

      onAnimating: function(){},
      onAnimate:   function(){}
    };
  },

  getInitialState: function() {
    // var map = React.Children.map(this.props.children, c => c)
    //   , current; 

    // _.find(map, (c, key) => current = key, true)

    return {
      last:     React.Children.only(this.props.children),
      next:     null,
      children: React.Children.map(this.props.children, c => c)
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var nextChild    = getChild(nextProps.children)
      , prevChildren = this.state.children
      , next = this.state.next
      , last = this.state.last
      , remove;

    var isLastChild = last && key(last) === key(nextChild)
      , isNextChild = next && key(next) === key(nextChild)
      , isAnimating = this.animatingKeys[key(nextChild)];

    if(!isLastChild && !isNextChild && !isAnimating){
      this.last = next || last
      this.next = nextChild
    }

    this.setState({
      last: this.last || last,
      next: this.next || nextChild
    });
  },

  componentWillMount: function() {
    this.animatingKeys = {};
    this.current = null;
    this.next    = null;
  },

  componentDidUpdate: function() {
    var last  = this.last
      , next  = this.next
      , first = this.refs.last || this.refs.next
      , node  = this.getDOMNode()
      , el    = first && first.getDOMNode()
      , ht, wt;

    if( el ) {
      ht = $.height(el) + 'px'
      wt = $.width(el) + 'px'

      $.css(node, {
        overflow: 'hidden',
        height: ht,
        width: wt
      })
    }

    this.props.onAnimating();

    this.next = null;
    this.last = null;

    if (next) this.performEnter('next')
    if (last) this.performLeave('last')
  },

  performEnter: function(key) {
    this.animatingKeys[key] = true;

    var component = this.refs[key];

    if (component.componentWillEnter) 
      component.componentWillEnter(
        this._handleDoneEntering.bind(this, key));
    else 
      this._handleDoneEntering(key);
    
  },

  _tryFinish: function(){
    var node = this.getDOMNode()

    if ( this.isTransitioning() )
      return 

    $.css(node, {
      overflow: 'visible',
      height: '',
      width: ''
    })

    this.props.onAnimate() 
  }, 

  _handleDoneEntering: function(key) {
    var component = this.refs[key];

    if (component.componentDidEnter) 
      component.componentDidEnter();
    
    delete this.animatingKeys[key];

    var currentChildMapping = React.Children.map(this.props.children, function(c){ return c })

    if (!currentChildMapping || !_.has(currentChildMapping, key)) 
      this.performLeave(key); // This was removed before it had fully entered. Remove it.
    
    this._tryFinish()
  },

  isTransitioning: function(){
    return Object.keys(this.animatingKeys).length !== 0
  },

  performLeave: function(key) {
    var component = this.refs[key];

    this.animatingKeys[key] = true;

    if (component.componentWillLeave) 
      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
    else 
      this._handleDoneLeaving(key);
    
  },

  _handleDoneLeaving: function(key) {
    var component = this.refs[key];

    if (component.componentDidLeave) 
      component.componentDidLeave();
    
    delete this.animatingKeys[key];

    var currentChildMapping = React.Children.map(this.props.children, function(c){ return c })

    if (currentChildMapping && currentChildMapping.hasOwnProperty(key))
      this.performEnter(key); // This entered again before it fully left. Add it again.
    else {
      var newChildren = _.merge(this.state.children);
      delete newChildren[key];
      this.setState({children: newChildren});
    }

    this._tryFinish() 
  },

  render: function() {
    var childrenToRender = [
          this.state.last && cloneWithProps(this.props.childFactory(this.state.last), { ref: 'last' }),
          this.state.next && cloneWithProps(this.props.childFactory(this.state.next), { ref: 'next' }),
        ];

    return transferPropsTo(this.props, 
            this.props.component(null, childrenToRender));
  }
});

function getChild(children){
  // var map = React.Children.map(React.Children.only(this.props.children), c => c), key; 
  // _.find(map, (c, k) => key = k)
  return React.Children.only(children)
}

//CHANGE 0.12.0
function key(child){
  return child.props.key
}


function mergeChildren(children, current, next){
  if(Object.keys(children).length > 2) throw new TypeError()

  var newCurrent = _.find(children, (c, k) => k === current)
    , newNext    = _.find(children, (c, k) => k !== newCurrent);

  return {
    current: newCurrent,
    next:    newNext || next
  }
}