'use strict';
var _ = require('lodash')
  , React = require('react')
  , compat = require('./compat')


function propType(handler, propType) {

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

  createControlledClass: function(displayName, component, controlledValues, defaults) {

    var handlers = _.invert(controlledValues)
      , types    = _.transform(controlledValues, function(obj, handler, prop){
          var type = component.type.propTypes[prop];

          obj[prop] = propType(handler, type)
          obj[defaultKey(prop)] = type
        }, {});

    return React.createClass({

      displayName: displayName,

      propTypes: types,


      getInitialState: function(){
        var props = this.props
          , keys  = _.keys(controlledValues);

        return _.transform(keys, function(state, key){
          state[key] = props[defaultKey(key)]
        }, {})
      },

      shouldComponentUpdate: function() {
        //let the setState trigger the update
        return !this._notifying || !this._notifying.length;
      },

      render: function(){
        var self = this
          , props, handles;

        props = _.mapValues(controlledValues, function(p, key){
          return isProp(self.props, key) ? self.props[key] : self.state[key]
        })

        handles = _.mapValues(handlers, function(prop){
          return _.partial(setAndNotify, self, prop)
        })

        return component(
            _.extend({}, this.props, props, handles)
          , this.props.children);
      }
    })

    function setAndNotify(ctx, prop, value){
      var handler    = controlledValues[prop]
        , controlled = handler && isProp(ctx.props, prop)
        , st = {};

      if ( !ctx._notifying ) ctx._notifying = [];

      if( ctx.props[handler] ) {
        ctx._notifying.push(true)
        ctx.props[handler].apply(ctx, _.rest(arguments, 2))
        ctx._notifying.pop()
      }
        
      st[prop] = value
      ctx.setState(st)

      return !controlled
    }


    function isProp(props, prop){
      return props[prop] !== undefined;
    }
  }
}


function defaultKey(key){
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1)
}