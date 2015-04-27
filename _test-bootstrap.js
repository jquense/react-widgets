
/* global it, expect */
'use strict';
var React = require('react');
var _ = require('./src/util/_')

//disable this particular optimization
sinon.stub(_, 'isFirstFocusedRender', ()=> true)

var testsContext = require.context("./test", true, /\.browser\.(js$|jsx$)/);

if ( typeof __REACT_VERSION__ !== 'undefined' ) {
  it('Ensure we are testing against the correct version of React: ' + __REACT_VERSION__, ()=>{
    expect(React.version).to.equal(__REACT_VERSION__)
  })
}

testsContext.keys().forEach(testsContext);