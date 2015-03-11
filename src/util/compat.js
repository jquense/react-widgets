'use strict';
var React = require('react')
  , _ = require('./_')
  , version = React.version.split('.').map(parseFloat);


var compat = module.exports = {

  version(){
    return version;
  },

  propType(fn) {

    return function validator(props, propName, componentName, location){
      var err = fn.call(this, props, propName, componentName, location)

      if ( err && err !== true ) 
        return err
    }
  },

  type(component){
    if( version[0] === 0 && version[1] >= 13)
      return component

    return component.type
  },

  findDOMNode(component){
    if( React.findDOMNode )
      return React.findDOMNode(component)

    return component.getDOMNode()
  },

  cloneElement(child, props){
    if ( React.cloneElement )
      return React.cloneElement(child, props)

    //just mutate if pre 0.13
    _.each(props, 
      (value, prop) => child.props[prop] = value)

    return child
  }
}

