import React  from 'react';
import ReactDOM  from 'react-dom';

var version = React.version.split('.').map(parseFloat);

module.exports = {

  version(){
    return version;
  },

  findDOMNode(component){
    return ReactDOM.findDOMNode(component)
  },

  batchedUpdates(cb) {
    ReactDOM.unstable_batchedUpdates(cb)
  }
}
