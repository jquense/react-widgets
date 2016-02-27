'use strict';
require('es5-shim')
var React = require('react');
var widgetHelpers = require('../src/util/widgetHelpers')
var globalize = require('globalize')

require('../src/localizers/globalize')(globalize)

//disable this particular optimization
sinon.stub(widgetHelpers, 'isFirstFocusedRender', ()=> true)

beforeEach(() => {
  sinon.stub(console, 'error');
});

afterEach(function () {
  if (typeof console.error.restore === 'function') {
    if (console.error.called)
      throw new Error(`${console.error.getCall(0).args[0]} \nIn '${this.currentTest.fullTitle()}'`)

    console.error.restore();
  }
});

var testsContext = require.context('../test', true, /\.browser\.(js$|jsx$)/);

if ( typeof __REACT_VERSION__ !== 'undefined' ) {
  it('Ensure we are testing against the correct version of React: ' + __REACT_VERSION__, ()=> {
    expect(React.version).to.equal(__REACT_VERSION__)
  })
}

testsContext.keys().forEach(testsContext);
