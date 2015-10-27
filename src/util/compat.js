import React  from 'react';

var version = React.version.split('.').map(parseFloat);

module.exports = {

  version(){
    return version;
  },

  findDOMNode(component){
    return React.findDOMNode(component)
  }

}
