'use strict';
var React   = require('react')
  , ReplaceTransitionGroup  = require('./ReplaceTransitionGroup')
  , _ = require('./util/_')
  , $  =  require('./util/dom');


var SlideChildGroup = React.createClass({displayName: 'SlideChildGroup',

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right'])
  },

  componentWillEnter: function(done) {
    var node  = this.getDOMNode()
      , width = $.width(node)
      , direction = this.props.direction;

    width = direction === 'left' ? width : -width

    this.ORGINAL_POSITION = node.style.position;
    
    $.css(node, { position: 'absolute', left: width + 'px' , top: 0 })

    $.animate(node, { left: 0 }, this.props.duration, function()  {

        $.css(node, { 
          position:  this.ORGINAL_POSITION, 
          overflow: 'hidden'
        });

        this.ORGINAL_POSITION = null
        done && done()
      }.bind(this))
  },

  componentWillLeave: function(done) {
    var node  = this.getDOMNode()
      , width = $.width(node)
      , direction = this.props.direction;

    width = direction === 'left' ? -width : width

    this.ORGINAL_POSITION = node.style.position

    $.css(node, { position: 'absolute', top: 0, left: 0})

    $.animate(node, { left: width + 'px' }, this.props.duration, function()  {
        $.css(node, { 
          position: this.ORGINAL_POSITION, 
          overflow: 'hidden'
        });

        this.ORGINAL_POSITION = null
        done && done()
      }.bind(this))
  },

  render: function() {
    return React.Children.only(this.props.children);
  }

})


module.exports = React.createClass({displayName: 'exports',

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right']),
    duration:  React.PropTypes.number
  },

  getDefaultProps: function(){
    return {
      direction: 'left',
      duration: 250
    }
  },

  _wrapChild: function(child, ref) {
    return (React.createElement(SlideChildGroup, {key: child.key, ref: ref, direction: this.props.direction, duration: this.props.duration}, child))
  },

  render: function() {
    var $__0=      this.props,style=$__0.style,children=$__0.children,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{style:1,children:1})

    style = _.merge(style, { position: 'relative', overflow: 'hidden' })

    return (
      React.createElement(ReplaceTransitionGroup, React.__spread({},  
        props, 
        {ref: "container", 
        childFactory: this._wrapChild, 
        style: style, 
        component: 'div'}), 
        children 
      ))
  },

  isTransitioning: function(){
    return this.isMounted() && this.refs.container.isTransitioning()
  }
});

