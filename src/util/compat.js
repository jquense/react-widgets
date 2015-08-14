import React  from 'react';
import ReactDOM  from 'react-dom';
import _ from './_';

var version = React.version.split('.').map(parseFloat);

module.exports = {

  version(){
    return version;
  },

  type(component){
    if( version[0] === 0 && version[1] >= 13)
      return component

    return component.type
  },

  findDOMNode(component){
    return ReactDOM.findDOMNode(component)
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

