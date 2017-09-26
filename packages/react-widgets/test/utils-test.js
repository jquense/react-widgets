delete require.cache[require.resolve('../src/util/_')]

var React   = require('react')
  , filters = require('../src/util/Filter').presets
  , _ = require('../src/util/_')
  , propTypes = require('../src/util/PropTypes');


describe('_ utils', function(){

  it('should SHALLOW EQUAL', function() {
    expect( _.isShallowEqual(1, 1) ).to.equal(true)
    expect( _.isShallowEqual(1, '1') ).to.equal(false)
    expect( _.isShallowEqual(1, 1.4) ).to.equal(false)
    expect( _.isShallowEqual('hi', 'hi') ).to.equal(true)
    expect( _.isShallowEqual('hi', 'hiw') ).to.equal(false)

    expect( _.isShallowEqual(null, null) ).to.equal(true)
    expect( _.isShallowEqual(null, undefined) ).to.equal(false)

    expect( _.isShallowEqual([1, 2], [1, 2]) ).to.equal(true)
    expect( _.isShallowEqual([1, 2], [1, 3]) ).to.equal(false)

    expect( _.isShallowEqual([1, 2], { 0: 1, 1: 2}) ).to.equal(true)

    expect( _.isShallowEqual({ a: 1, b: 2}, { b: 2, a: 1 }) ).to.equal(true)
    expect( _.isShallowEqual({ a: 1, b: 2}, { a: 1, c: 'hi' }) ).to.equal(false)
  })
})
describe('when using array filter helpers', function(){

  it('should match correctly', function(){

    expect(filters.eq(1, 1)).to.equal(true)
    expect(filters.neq(2, 1)).to.equal(true)
    expect(filters.lt(1, 2)).to.equal(true)
    expect(filters.lte(1, 1)).to.equal(true)
    expect(filters.gt(2, 1)).to.equal(true)
    expect(filters.gte(1, 1)).to.equal(true)

    expect(filters.contains([1, 2], 1)).to.equal(true)
    expect(filters.contains('hello', 'll')).to.equal(true)

    expect(filters.startsWith('hello', 'hel')).to.equal(true)
    expect(filters.endsWith('hello', 'llo')).to.equal(true)
  })
})

describe('when using custom PropTypes', function(){

  it('should concat names', function(){
    var props = { type: 'span' }

    expect(propTypes.elementType(props, 'type', 'component'))
      .to.equal(null)

    props.type = function(){}

    expect(propTypes.elementType(props, 'type', 'component'))
      .to.equal(null)

    props.type = React.createElement('span')

    expect(
      propTypes.elementType(props, 'type', 'component')).to.be.an('error')

    props.type = true
    expect(propTypes.elementType(props, 'type', 'component')).to.be.an('error')
  })
})

