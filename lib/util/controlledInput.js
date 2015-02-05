"use strict";
var _ = require("./_") //invert, transform
,
    React = require("react"),
    compat = require("./compat");


function compatPropType(handler, propType) {
  return compat.propType(function (props, propName, componentName, location) {
    if (props[propName] !== undefined) {
      if (!props[handler]) return new Error("ReactWidgets: you have provided a `" + propName + "` prop to " + "`" + componentName + "` without an `" + handler + "` handler. This will render a read-only field. " + "If the field should be mutable use `" + defaultKey(propName) + "`. Otherwise, set `" + handler + "`");

      return propType && propType(props, propName, componentName, location);
    }
  });
}

module.exports = {

  createControlledClass: function (Component, controlledValues, taps) {
    var types = {};

    if (process.env.NODE_ENV !== "production") {
      types = _.transform(controlledValues, function (obj, handler, prop) {
        var type = Component.type.propTypes[prop];

        obj[prop] = compatPropType(handler, type);
        obj[defaultKey(prop)] = type;
      }, {});
    }

    taps = taps || {};

    return React.createClass({

      displayName: Component.displayName,

      propTypes: types,

      getInitialState: function () {
        var props = this.props,
            keys = Object.keys(controlledValues);

        return _.transform(keys, function (state, key) {
          state[key] = props[defaultKey(key)];
        }, {});
      },

      shouldComponentUpdate: function () {
        //let the setState trigger the update
        return !this._notifying || !this._notifying.length;
      },

      render: function () {
        var _this = this;
        var props = {};

        _.each(controlledValues, function (handle, prop) {
          props[prop] = isProp(_this.props, prop) ? _this.props[prop] : _this.state[prop];

          props[handle] = setAndNotify.bind(_this, prop);
        });

        props = _.assign({}, this.props, props);

        for (var k in taps) if (_.has(props, k)) props[k] = chain(this, taps[k], props[k]);

        return React.createElement(Component, props, this.props.children);
      }
    });

    function setAndNotify(prop, value) {
      /*jshint validthis:true */
      var handler = controlledValues[prop],
          controlled = handler && isProp(this.props, prop),
          state = {},
          args;

      if (!this._notifying) this._notifying = [];

      if (this.props[handler]) {
        args = [].slice.call(arguments, 1);
        this._notifying.push(true);
        this.props[handler].apply(this, args);
        this._notifying.pop();
      }

      state[prop] = value;
      this.setState(state);

      return !controlled;
    }

    function isProp(props, prop) {
      return props[prop] !== undefined;
    }
  }
};

function defaultKey(key) {
  return "default" + key.charAt(0).toUpperCase() + key.substr(1);
}

function chain(thisArg, a, b) {
  return function chainedFunction() {
    a && a.apply(thisArg, arguments);
    b && b.apply(thisArg, arguments);
  };
}