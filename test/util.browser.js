'use strict';
/*global it, describe, expect */

require('../vendor/phantomjs-shim')

delete require.cache[require.resolve('../src/util/_')]

var React   = require('react')
  , filters = require('../src/util/filter')
  , _       = require('../src/util/_')
  , propTypes = require('../src/util/propTypes')
  , validateList = require('../src/util/validateListInterface')
  , dates = require('../src/util/dates');



describe('_ utils', function(){

  it('should EACH', function(){
    var cnt = 0
    _.each([1], (v, i, a) => {
      expect(v).equal(1)
      expect(i).equal(0)
      expect(a).eql([1])
    })

    _.each({ a: 1, b: 2, c: 3}, () => cnt++)

    expect(cnt).to.equal(3)
    cnt = 0
    _.each([1,2,3], () => cnt++)
    expect(cnt).to.equal(3)
  })

  it('should OMIT and PICK', function(){
    expect(_.omit({ a: 1, b: 2, c: 3}, ['b','c'])).to.eql({ a: 1 })
    expect(_.pick({ a: 1, b: 2, c: 3}, ['b','c'])).to.eql({ b: 2, c: 3 })
  })

  it('should FIND', function(){
    expect(_.find([1,2,3,4,5], v => v === 2)).to.equal(2)
    expect(_.find([1,2,3,4,5], (v, i) => i === 2)).to.equal(3)
  })

  it('should UNIQUEID', function(){
    expect(_.uniqueId('gello_')).to.equal('gello_' + 1)
    expect(_.uniqueId('ello_')).to.equal('ello_' + 2)
  })

  it('should OBJECT', function(){
    expect(_.object([[1,2], [2,3]])).to.eql({ 1:2, 2: 3})
  })

  it('should SHALLOW EQUAL', function(){
    expect( _.isShallowEqual(1,1) ).to.be(true)
    expect( _.isShallowEqual(1,'1') ).to.be(false)
    expect( _.isShallowEqual(1, 1.4) ).to.be(false)
    expect( _.isShallowEqual('hi', 'hi') ).to.be(true)
    expect( _.isShallowEqual('hi', 'hiw') ).to.be(false)

    expect( _.isShallowEqual(null, null) ).to.be(true)
    expect( _.isShallowEqual(null, undefined) ).to.be(false)

    expect( _.isShallowEqual([1,2], [1,2]) ).to.be(true)
    expect( _.isShallowEqual([1,2], [1,3]) ).to.be(false)

    expect( _.isShallowEqual([1,2], { 0: 1, 1: 2}) ).to.be(true)

    expect( _.isShallowEqual({ a: 1, b: 2}, { b: 2, a: 1 }) ).to.be(true)
    expect( _.isShallowEqual({ a: 1, b: 2}, { a: 1, c: 'hi' }) ).to.be(false)
  })

  it('should TRANSFORM', function(){

    _.transform([1], function(o, v,i){ 
      expect(o).to.eql([])
      expect(v).to.equal(1)
      expect(i).to.equal(0)
    })

    _.transform({ key: 1 }, (o, v, i) => { 
      expect(o).to.eql({})
      expect(v).to.equal(1)
      expect(i).to.equal('key')
    })

    expect( _.transform({ a:0, b:1 }, 
      (o, v, i) => o[i] = ++v )).to.eql({ a:1, b: 2})

    expect( _.transform([ 0, 1 ], 
      (o, v ) => o[v] = ++v, {})).to.eql({ 0:1, 1: 2})
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

describe('when validating Lists', function(){

  it('should throw when methods are not implemented', function(){
    var List = { prev: ()=>{}, next: ()=>{}, last: ()=>{}, first: 'wrong type' }

    expect(()=> validateList(List)).to.throwException(/first()/)
  })

  it('should fail quietly in production', function(){
    var List = { prev: ()=>{}, next: ()=>{}, last: ()=>{}, first: 'wrong type' }

    process.env.NODE_ENV = "production"
    expect(()=> validateList(List)).to.not.throwException()
    process.env.NODE_ENV = "test"
  })

})

describe('when using custom PropTypes', function(){

  it('should concat names', function(){
    var props = { type: 'span' }

    expect(propTypes.elementType(props, 'type', 'component'))
      .to.equal(true)

    props.type = function(){}
    expect(propTypes.elementType(props, 'type', 'component'))
      .to.equal(true)

    props.type = React.createElement('span')

    expect(
      propTypes.elementType(props, 'type', 'component')).to.be.an(Error)

    props.type = true
    expect(
      propTypes.elementType(props, 'type', 'component')).to.be.an(Error)
  })
})

describe('dates util', function(){

  describe('includesOrEquals', function(){
    var day = new Date(2015, 0, 1);

    it('should allow ranges', function() {
      var dayRangeInclusive = [new Date(2014, 11, 31), new Date(2015, 0, 2)]
        , dayRangeNonInclusive = [new Date(2014, 11, 30), new Date(2014, 11, 31)]
        , yearRangeInclusive = [new Date(2015, 0, 1), new Date(2015, 11, 31)]
        , yearRangeNonInclusive = [new Date(2014, 0, 1), new Date(2014, 11, 31)]
        , decadeRangeInclusive = [new Date(2010, 0, 1), new Date(2019, 0, 1)]
        , decadeRangeNonInclusive = [new Date(2020, 0, 1), new Date(2029, 0, 1)]
        , nullStartInclusive = [null, new Date(2015, 0, 1)]
        , nullStartNoneInclusive = [null, new Date(2014, 11, 31)]
        , nullEndInclusive = [new Date(2015, 0, 1), null]
        , nullEndNoneInclusive = [new Date(2014, 11, 31), null]

      expect(dates.includesOrEquals(day, dayRangeInclusive, 'day')).to.equal(true)
      expect(dates.includesOrEquals(day, dayRangeNonInclusive, 'day')).to.equal(false)
      expect(dates.includesOrEquals(day, yearRangeInclusive, 'year')).to.equal(true)
      expect(dates.includesOrEquals(day, yearRangeNonInclusive, 'year')).to.equal(false)
      expect(dates.includesOrEquals(day, decadeRangeInclusive, 'decade')).to.equal(true)
      expect(dates.includesOrEquals(day, decadeRangeNonInclusive, 'decade')).to.equal(false)
      expect(dates.includesOrEquals(day, nullStartInclusive, 'day')).to.equal(true)
      expect(dates.includesOrEquals(day, nullStartNoneInclusive, 'day')).to.equal(false)
      expect(dates.includesOrEquals(day, nullEndInclusive, 'day')).to.equal(true)
      expect(dates.includesOrEquals(day, nullEndNoneInclusive, 'day')).to.equal(false)
    })

    it('should allow single dates', function() {
      var dayInclusive = day
        , dayNonInclusive = new Date(2015, 0, 2)
        , yearInclusive = new Date(2015, 4, 1)
        , yearNonInclusive = new Date(2014, 0, 2)
        , decadeInclusive = new Date(2010, 0, 1)
        , decadeNonInclusive = new Date(2020, 0, 1)

      expect(dates.includesOrEquals(day, dayInclusive, 'day')).to.equal(true)
      expect(dates.includesOrEquals(day, dayNonInclusive, 'day')).to.equal(false)
      expect(dates.includesOrEquals(day, yearInclusive, 'year')).to.equal(true)
      expect(dates.includesOrEquals(day, yearNonInclusive, 'year')).to.equal(false)
      expect(dates.includesOrEquals(day, decadeInclusive, 'decade')).to.equal(true)
      expect(dates.includesOrEquals(day, decadeNonInclusive, 'decade')).to.equal(false)
    })

  })

})