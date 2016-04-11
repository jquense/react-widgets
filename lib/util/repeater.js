"use strict";

exports.__esModule = true;
exports.default = Repeater;
// my tests in ie11/chrome/FF indicate that keyDown repeats
// at about 35ms+/- 5ms after an initial 500ms delay. callback fires on the leading edge
function Repeater(callback) {
  var id,
      cancel = function cancel() {
    return clearInterval(id);
  };

  id = setInterval(function () {
    cancel();
    id = setInterval(callback, 35);
    callback(); //fire after everything in case the user cancels on the first call
  }, 500);

  return cancel;
}
module.exports = exports['default'];