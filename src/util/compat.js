'use strict';
var React = require('react');

var compat = module.exports = {

  version: function(){
    return React.version.split('.').map(parseFloat);
  },

  propType: function(fn) {

    return function validator(props, propName, componentName, location){
      var err = fn.call(this, props, propName, componentName, location)

      if ( err && err !== true ) 
        return err
    }
  }
}