/**
 * @license
 * Lo-Dash 3.0.0-pre <http://lodash.com/>
 * Copyright 2012-2014 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.6.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
module.exports = function chunk(array, chunkSize) {
  var index = 0,
      length = array ? array.length : 0,
      result = [];

  chunkSize = Math.max(+chunkSize || 1, 1);

  while (index < length)
    result.push(array.slice(index, (index += chunkSize)));
  
  return result;
}