'use strict';
var _ = require('./_') //invert, transform
  , React = require('react')
  , compat = require('./compat')


function compatPropType(handler, propType) {

  return compat.propType(function(props, propName, componentName, location){
    if(props[propName] !== undefined){
      if ( !props[handler] )
        return new Error(
            'ReactWidgets: you have provided a `' + propName + '` prop to ' 
          + '`' + componentName + '` without an `' + handler + '` handler. This will render a read-only field. ' 
          + 'If the field should be mutable use `' + defaultKey(propName) + '`. Otherwise, set `' + handler + '`')

      return propType && propType(props, propName, componentName, location)
    }
  })
}

module.exports = {

  createControlledClass: function(Component, controlledValues, publicApi) {
    // var publicMethods 
    //       = _.transform(publicApi || [], function(obj, method) {
    //           obj[method] = function (...args){ 
    //             return this.refs[this._innerRef][method](args) 
    //           }
    //         }, {})

    var types = _.transform(controlledValues, function(obj, handler, prop){
          var type = Component.type.propTypes[prop];

          obj[prop] = compatPropType(handler, type)
          obj[defaultKey(prop)] = type
        }, {});

    return React.createClass({

      displayName: Component.displayName,

      propTypes: types,

      getInitialState: function(){
        var props = this.props
          , keys  = Object.keys(controlledValues);

        return _.transform(keys, function(state, key){
          state[key] = props[defaultKey(key)]
        }, {})
      },

      shouldComponentUpdate: function() {
        //let the setState trigger the update
        return !this._notifying || !this._notifying.length;
      },

      render: function(){
        var props, handles;

        props = _.transform(controlledValues, function(obj, handle, prop)  {
          obj[prop] = isProp(this.props, prop) ? this.props[prop] : this.state[prop]
        }.bind(this), {})
        
        handles = _.transform(controlledValues, function(obj, handle, prop)  {
          obj[handle] = setAndNotify.bind(this, prop)
        }.bind(this), {})

        props    = _.merge(this.props, props, handles)
        //this._innerRef = props.ref = props.ref || 'component'

        return React.createElement(Component, props, this.props.children);
      }
    })

    function setAndNotify(prop, value){
      /*jshint validthis:true */
      var handler    = controlledValues[prop]
        , controlled = handler && isProp(this.props, prop)
        , st = {}
        , args;

      if ( !this._notifying ) this._notifying = [];

      if( this.props[handler] ) {
        args = [].slice.call(arguments, 1)
        this._notifying.push(true)
        this.props[handler].apply(this, args)
        this._notifying.pop()
      }
        
      st[prop] = value
      this.setState(st)

      return !controlled
    }

    function isProp(props, prop){
      return props[prop] !== undefined;
    }
  }
}


// function invert(controlledValues){
//   return _.transform(controlledValues, (val, key ) => ,)
// }

function defaultKey(key){
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1)
}