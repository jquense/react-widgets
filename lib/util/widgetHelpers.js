'use strict';

exports.__esModule = true;
exports.notify = notify;
exports.instanceId = instanceId;
exports.isFirstFocusedRender = isFirstFocusedRender;

var _ = require('./_');

function notify(handler, args) {
  handler && handler.apply(null, [].concat(args));
}

function instanceId(component) {
  var suffix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

  component.__id || (component.__id = _.uniqueId('rw_'));
  return (component.props.id || component.__id) + suffix;
}

function isFirstFocusedRender(component) {
  return component._firstFocus || component.state.focused && (component._firstFocus = true);
}