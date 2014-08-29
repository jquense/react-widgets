/**  React.DOM */
/**
 * A streamlined version of TransitionGroup built for managing at most two 'active' children
 * also provides additional hooks for animation start/end
 * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
 * relevent code is licensed accordingly 
 */

"use strict";

var React = require('react')
  , cloneWithProps = require('../util/transferProps').cloneWithProps
  , $ = require('../util/dom')
  , _ = require('lodash');

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

      onAnimating: _.noop,
      onAnimate:   _.noop
    };
  },

  getInitialState: function() {
    return {
      children: React.Children.map(this.props.children, function(c){ return c })
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var nextChildMapping = React.Children.map(nextProps.children, function(c){ return c })
      , prevChildMapping = this.state.children
      , newChildren = {};

    //console.log(prevChildMapping, nextChildMapping)
    this.setState({
      children: _.extend({}, prevChildMapping, nextChildMapping)
    });

    _.any(nextChildMapping, function(v, key){
      var hasPrev = prevChildMapping && _.has(prevChildMapping, key)
        , isNext  = !hasPrev && !this.currentlyTransitioningKeys[key];

      if ( isNext ) {
        this.next = key;
      }
      return isNext
    }, this)

    _.any(prevChildMapping, function(v, key){
      var hasNext   = nextChildMapping && _.has(nextChildMapping, key)
        , isCurrent = !hasNext && !this.currentlyTransitioningKeys[key];

      if ( isCurrent ) {
        this.current = key;
      }
      return isCurrent
    }, this)
  },

  componentWillMount: function() {
    this.currentlyTransitioningKeys = {};
    this.current = null;
    this.next    = null;
  },

  componentDidUpdate: function() {
    var current = this.current
      , next    = this.next
      , first = this.refs[current || next] 
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
    this.current = null;

    if ( next )   this.performEnter(next)
    if ( current) this.performLeave(current)
  },

  performEnter: function(key) {
    this.currentlyTransitioningKeys[key] = true;

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
    
    delete this.currentlyTransitioningKeys[key];

    var currentChildMapping = React.Children.map(this.props.children, function(c){ return c })

    if (!currentChildMapping || !_.has(currentChildMapping, key)) 
      this.performLeave(key); // This was removed before it had fully entered. Remove it.
    
    this._tryFinish()
  },

  isTransitioning: function(){
    return Object.keys(this.currentlyTransitioningKeys).length !== 0
  },

  performLeave: function(key) {
    var component = this.refs[key];

    this.currentlyTransitioningKeys[key] = true;

    if (component.componentWillLeave) 
      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
    else 
      this._handleDoneLeaving(key);
    
  },

  _handleDoneLeaving: function(key) {
    var component = this.refs[key];

    if (component.componentDidLeave) 
      component.componentDidLeave();
    
    delete this.currentlyTransitioningKeys[key];

    var currentChildMapping = React.Children.map(this.props.children, function(c){ return c })

    if (currentChildMapping && currentChildMapping.hasOwnProperty(key))
      this.performEnter(key); // This entered again before it fully left. Add it again.
    else {
      var newChildren = _.extend({}, this.state.children);
      delete newChildren[key];
      this.setState({children: newChildren});
    }

    this._tryFinish() 
  },

  render: function() {
    var childrenToRender = {};


    for (var key in this.state.children) {

      var child = this.state.children[key];

      if (child) {
        childrenToRender[key] = cloneWithProps(
          this.props.childFactory(child),
          { ref: key }
        );
      }
    }

    //console.log(Object.keys(childrenToRender))
    // if ( _.size(childrenToRender) === 0) 
    //    return React.DOM.noscript()
    
    // if ( _.size(childrenToRender) === 1)
    //   for( var k in childrenToRender)
    //     return this.transferPropsTo(childrenToRender[k])

    return this.transferPropsTo(this.props.component(null, childrenToRender));
  }
});
