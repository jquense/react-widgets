'use strict';

module.exports = dasherize

function dasherize(str) {
  return str.replace(/[A-Z]/g, 
    (character, index) => (index !== 0 ? '-' : '') + character.toLowerCase());
}

