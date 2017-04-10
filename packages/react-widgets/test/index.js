import 'es5-shim';
import React from 'react';
import * as widgetHelpers from '../src/util/widgetHelpers';

import config from '../src/util/configuration';

require('../../react-widgets-globalize/localizer')()

//disable this particular optimization
sinon.stub(widgetHelpers, 'isFirstFocusedRender', ()=> true)

beforeEach(() => {
  sinon.stub(console, 'error');

  sinon.stub(config, 'animate', function(...args) {
    args.pop()()
  })
});

afterEach(function () {
  if (typeof console.error.restore === 'function') {
    if (console.error.called)
      throw new Error(`${console.error.getCall(0).args[0]} \nIn '${this.currentTest.fullTitle()}'`)

    console.error.restore();
  }

  config.animate.restore &&
    config.animate.restore()
});

var testsContext = require.context('.', true, /\-test\.(js$|jsx$)/);

if ( typeof __REACT_VERSION__ !== 'undefined' ) {
  it('Ensure we are testing against the correct version of React: ' + __REACT_VERSION__, ()=> {
    expect(React.version).to.equal(__REACT_VERSION__)
  })
}

testsContext.keys().forEach(testsContext);
