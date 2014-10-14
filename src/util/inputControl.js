'use strict';
var _ = require('lodash')
  , React = require('react')
  , compat = require('./compat')

var ic = module.exports = {

  propType: function(handler, propType) {

    return compat.propType(function(props, propName, componentName, location){
      if(props[propName] !== undefined){
        if ( !props[handler] )
          return new Error('ReactWidgets: you have provided a `' + propName
            + '` prop to `' + componentName + '` without an `' + handler + '` handler, effectively making it read-only.'
            + ' either provide the handler or make the prop `uncontrolled` by setting it to `undefined`')

        return propType && propType(props, propName, componentName, location)
      }
    })
  },

  createControlledClass: function(displayName, component, controlledValues, defaults) {

    var handlers = _.invert(controlledValues)
      , types = _.transform(controlledValues, function(obj, handler, prop){
          obj[prop] = ic.propType(handler, component.type.propTypes[prop])
        }, {});

    return React.createClass({

      displayName: displayName,

      propTypes: types,

      getInitialState: function(){
        var props = this.props
          , keys  = _.keys(controlledValues);

        return _.transform(keys, function(state, key){
          var defaultKey = 'default' + key.charAt(0).toUpperCase() + key.substr(1)

          state[key] = _.has(props, defaultKey)
            ? props[defaultKey]
            : defaults[key]
        }, {})
      },

      render: function(){
        var self = this
          , props, handles;

        props = _.mapValues(controlledValues, function(p, key){
          return getValue(key, self.props, self.state)
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

      if( ctx.props[handler] )
        ctx.props[handler].apply(ctx, _.rest(arguments, 2))

      st[prop] = value
      ctx.setState(st)

      return !controlled
    }

    function getValue(key, props, state){
      return isProp(props, key)
        ? props[key]
        : state[key]
    }

    function isProp(props, prop){
      return props[prop] !== undefined;
    }
  },

  // mixin: {

  //   getValue: function(key, props, state){
  //     var isControlled;

  //     props = props || this.props
  //     state = state || this.state

  //     isControlled = props[key] !== undefined

  //     return  props[key] === undefined
  //       ? state[key]
  //       : props[key]
  //   },

  //   isProp: function(prop){
  //     return this.props[prop] !== undefined;
  //   },

  //   controlledDefaults: function(map) {
  //     var props = this.props
  //       , keys  = _.keys(this.controlledValues);

  //     return _.transform(keys, function(state, key){
  //       var defaultKey = 'default' + key.charAt(0).toUpperCase() + key.substr(1)

  //       state[key] = _.has(props, defaultKey)
  //         ? props[defaultKey]
  //         : map[key]
  //     }, {})
  //   },

  //   setAndNotify: function(prop, value, additionalArgs){
  //     var handler    = this.controlledValues[prop]
  //       , controlled = handler && this.isProp(prop)
  //       , args       = [ value ].concat(additionalArgs);

  //     if( this.props[handler] )
  //       this.props[handler].apply(this, args)

  //     var st = {}
  //     st[prop] = args[0]
  //     this.setState(st)


  //     return !controlled
  //   }
  // }
}
