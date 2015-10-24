'use strict';

exports.__esModule = true;
exports['default'] = {
  ios: typeof navigator !== 'undefined' && navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/)
};
module.exports = exports['default'];