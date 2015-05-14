"use strict";
var React = require("react"),
    filters = require("./filter");

var filterTypes = Object.keys(filters).filter(function (i) {
  return i !== "filter";
});

module.exports = {

  elementType: createChainableTypeChecker(function (props, propName, componentName, location) {

    if (typeof props[propName] !== "function") {
      if (React.isValidElement(props[propName])) return new Error("Invalid prop `" + propName + "` specified in  `" + componentName + "`." + " Expected an Element `type`, not an actual Element");

      if (typeof props[propName] !== "string") return new Error("Invalid prop `" + propName + "` specified in  `" + componentName + "`." + " Expected an Element `type` such as a tag name or return value of React.createClass(...)");
    }
    return true;
  }),

  localeFormat: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),

  accessor: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),

  filter: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.bool, React.PropTypes.oneOf(filterTypes)]) };

function createChainableTypeChecker(validate) {

  function checkType(isRequired, props, propName, componentName, location) {
    componentName = componentName || "<<anonymous>>";
    if (props[propName] == null) {
      if (isRequired) {
        return new Error("Required prop `" + propName + "` was not specified in  `" + componentName + "`.");
      }
    } else return validate(props, propName, componentName, location);
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}