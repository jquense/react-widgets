import React from 'react';
import sinon from 'sinon'
import chai from 'chai'
import Enzyme, { ShallowWrapper, ReactWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import * as widgetHelpers from '../src/util/widgetHelpers';

global.chai = chai
global.sinon = sinon

chai.should();
global.expect = chai.expect

Enzyme.configure({ adapter: new Adapter() });

function assertLength(length) {
  return function $assertLength(selector) {
    let result = this.find(selector);
    expect(result).to.have.length(length);
    return result;
  };
}

ReactWrapper.prototype.assertSingle = assertLength(1);
ShallowWrapper.prototype.assertSingle = assertLength(1);

ReactWrapper.prototype.assertNone = assertLength(0);
ShallowWrapper.prototype.assertNone = assertLength(0);

require('./test-localizer')()

//disable this particular optimization
sinon.stub(widgetHelpers, 'isFirstFocusedRender').callsFake(() => true)

let node = document.createElement('style');
  document.body.appendChild(node);

node.innerHTML = `
  .rw-popup-transition
  .rw-calendar-transition {
    transition: none;
  }
`

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

if ( typeof __REACT_VERSION__ !== 'undefined' ) {
  it('Ensure we are testing against the correct version of React: ' + __REACT_VERSION__, ()=> {
    expect(React.version).to.equal(__REACT_VERSION__)
  })
}
