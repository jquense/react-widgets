"use strict";

module.exports = dasherize;

function dasherize(str) {
  return str.replace(/[A-Z]/g, function (character, index) {
    return (index !== 0 ? "-" : "") + character.toLowerCase();
  });
}