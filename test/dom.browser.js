'use strict';
/*global it, describe, expect, $ */
require('../vendor/phantomjs-shim')

var DOM = require('../src/util/dom')

// not everything just stuff that ie hates
describe('DOM Work', () => {

  it('should set css values', () => {
    $('body').html('<div/>')

    DOM.css($('body > div')[0], { height: '15px' })

    expect(DOM.css($('body > div')[0], 'height') ).to.be('15px');
  })

  it('should get scrollParent', () => {
    $('body').html('<div style="height: 200px; overflow:scroll;"><div style="height: 500px"/></div>')

    var parent = DOM.scrollParent($('body > div > div')[0]);

    expect(parent).to.be($('body > div')[0]);
  })

})