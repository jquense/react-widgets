'use strict';
var React = require('react');

module.exports = React.createClass({displayName: 'exports',

  render: function(){
  	var $__0=     this.props,className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});

    return (
      React.createElement("button", React.__spread({},  props, {type: "button", className: className + ' rw-btn'}), 
        this.props.children
      )
  	)
  }
})