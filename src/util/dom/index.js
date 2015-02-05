"use strict";
var { 
    on
  , off } = require('./events')
  , { 
    height
  , width
  , offset } = require('./dimensions')

module.exports = {

  height, 

  width, 

  offset,

  on, 

  off, 

  css: require('./css'),

  contains: require('./contains'),

  scrollParent: require('./scrollParent'),

  scrollTop: require('./scrollTop'),

  raf: require('./requestAnimationFrame'),

  animate: require('./animate'),
}