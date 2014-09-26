require('../vendor/phantomjs-shim')

var react= require('react')
  , cx = require('../src/util/cx')
  , filters = require('../src/util/filter')
  , transferProps = require('../src/util/transferProps')

describe('when using Class Set', function(){

  it('should concat names', function(){
    expect(cx({ 'a': true, b: true, c: false, d: true})).to.be('a b d')
  })

  it('should ignore empty', function(){
    expect(cx({ 'a': '', b: 0, c: false, d: true})).to.be('d')
  })
  
})


describe('when using prop transfer Utils', function(){

  it('should merge into props object', function(){
    var props = {}
      , newProps = transferProps.mergeIntoProps({a: 'hi'}, props)

    expect(props).to.have.property('a', 'hi')
  })

  it('should merge into descriptor', function(){
    var child = react.createClass({ render: function(){} })({})
      , newProps = transferProps.mergeIntoProps({a: 'hi'}, child)

    expect(child.props).to.have.property('a', 'hi')
  })
  
  it('should merge className', function(){
    var props = { className: 'class hi'}
      , newProps = transferProps.mergeIntoProps({ className: 'new-class' }, props)

    expect(props).to.have.property('className', 'class hi new-class')
  })

  it('should merge style', function(){
    var props = { style: { styleB: true }}
      , newProps = transferProps.mergeIntoProps({ style: { styleA: true } }, props)

    expect(props.style).to.have.keys(['styleA', 'styleB'])
  })

  it('should ignore ref, children ,and key', function(){
    var props = { ref: 'ref', key: 'key', children: [1,2,3] }
      , newProps = transferProps.mergeIntoProps({ ref: 'refB', key: 'keyB', children: [4,5] }, props)

    expect(props).to.have.property('ref', 'ref')
      .and.to.have.property('key', 'key')

    expect(props.children).to.be.eql([1,2,3])
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
   
    expect(filters.contains([1,2], 1)).to.equal(true)
    expect(filters.contains('hello', 'll')).to.equal(true)

    expect(filters.startsWith('hello', 'hel')).to.equal(true)
    expect(filters.endsWith('hello', 'llo')).to.equal(true)
  })
})