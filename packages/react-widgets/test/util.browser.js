delete require.cache[require.resolve('../src/util/_')]

var React   = require('react')
  , filters = require('../src/util/Filter').presets
  , _       = require('../src/util/_')
  , propTypes = require('../src/util/PropTypes')
  , config  = require('../src/util/configuration')
  , configure  = require('../src/configure')
  , validateList = require('../src/util/validateListInterface');


describe('_ utils', function(){

  it('should FIND', function(){
    expect(_.find([1, 2, 3, 4, 5], v => v === 2)).to.equal(2)
    expect(_.find([1, 2, 3, 4, 5], (v, i) => i === 2)).to.equal(3)
  })

  it('should SHALLOW EQUAL', function(){
    expect( _.isShallowEqual(1, 1) ).to.be(true)
    expect( _.isShallowEqual(1, '1') ).to.be(false)
    expect( _.isShallowEqual(1, 1.4) ).to.be(false)
    expect( _.isShallowEqual('hi', 'hi') ).to.be(true)
    expect( _.isShallowEqual('hi', 'hiw') ).to.be(false)

    expect( _.isShallowEqual(null, null) ).to.be(true)
    expect( _.isShallowEqual(null, undefined) ).to.be(false)

    expect( _.isShallowEqual([1, 2], [1, 2]) ).to.be(true)
    expect( _.isShallowEqual([1, 2], [1, 3]) ).to.be(false)

    expect( _.isShallowEqual([1, 2], { 0: 1, 1: 2}) ).to.be(true)

    expect( _.isShallowEqual({ a: 1, b: 2}, { b: 2, a: 1 }) ).to.be(true)
    expect( _.isShallowEqual({ a: 1, b: 2}, { a: 1, c: 'hi' }) ).to.be(false)
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

describe('when validating Lists', function(){

  it('should throw when methods are not implemented', function(){
    var List = { prev: ()=>{}, next: ()=>{}, last: ()=>{}, first: 'wrong type' }

    expect(()=> validateList(List)).to.throwException(/first()/)
  })

  it('should fail quietly in production', function(){
    var List = { prev: ()=>{}, next: ()=>{}, last: ()=>{}, first: 'wrong type' }

    process.env.NODE_ENV = 'production'
    expect(()=> validateList(List)).to.not.throwException()
    process.env.NODE_ENV = 'test'
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
      propTypes.elementType(props, 'type', 'component')).to.be.an(Error)

    props.type = true
    expect(
      propTypes.elementType(props, 'type', 'component')).to.be.an(Error)
  })
})

describe('when configuring dependencies', function(){

  it('should use the instances provided', function(){
    var animate = ()=>{};

    expect(config.animate).to.not.equal(animate)

    configure.setAnimate(animate)

    expect(config.animate).to.equal(animate)
  })
})
