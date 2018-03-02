global.requestAnimationFrame = cb => setTimeout(cb, 0)

const React = require('react')
const sinon = require('sinon')
const chai = require('chai')
const { configure, ShallowWrapper, ReactWrapper } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

const widgetHelpers = require('../src/util/widgetHelpers')

global.chai = chai
global.sinon = sinon

chai.should()
global.expect = chai.expect

configure({ adapter: new Adapter() })

function assertLength(length) {
  return function $assertLength(selector) {
    let result = this.find(selector)
    expect(result).to.have.length(length)
    return result
  }
}

ReactWrapper.prototype.assertSingle = assertLength(1)
ShallowWrapper.prototype.assertSingle = assertLength(1)

ReactWrapper.prototype.assertNone = assertLength(0)
ShallowWrapper.prototype.assertNone = assertLength(0)

require('./test-localizer')()

//disable this particular optimization
sinon.stub(widgetHelpers, 'isFirstFocusedRender').callsFake(() => true)

if (typeof document !== 'undefined') {
  let node = document.createElement('style')
  document.body.appendChild(node)

  node.innerHTML = `
    .rw-popup-transition
    .rw-calendar-transition {
      transition: none;
    }
  `
}

beforeEach(() => {
  if (console.error.restore) console.error.restore()
  sinon.stub(console, 'error')
})

afterEach(function() {
  if (typeof console.error.restore === 'function') {
    if (console.error.called) {
      let err = console.error.getCall(0).args[0]
      console.error.restore()
      throw new Error(`${err}`)
    }
  }
})

if (typeof __REACT_VERSION__ !== 'undefined') {
  it(
    'Ensure we are testing against the correct version of React: ' +
      __REACT_VERSION__,
    () => {
      expect(React.version).to.equal(__REACT_VERSION__)
    }
  )
}
