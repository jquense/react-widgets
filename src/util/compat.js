'use strict';
var React = require('react')
  , _ = require('lodash')

var compat = module.exports = {

  version: function(){
    return _.map(React.version.split('.'), parseFloat);
  },

  propType: function(fn) {

    return function validator(props, propName, componentName, location){
      var ver = compat.version()
        , err = fn.call(this, props, propName, componentName, location)

      if ( err && err !== true ) {
        if( ver[0] === 0 && ver[1] < 11 )
          return console.warn(err instanceof Error ? err.message : err)

        return err
      }

    }
  }
}