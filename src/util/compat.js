import React  from 'react';
import { findDOMNode } from 'react-dom';

var version = React.version.split('.').map(parseFloat);

module.exports = {

  version(){
    return version;
  },

  findDOMNode(component){
    return findDOMNode(component)
  }

}
