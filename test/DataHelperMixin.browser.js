
import * as helpers from'../src/util/dataHelpers';

describe('when using DATA HELPERS', function(){
  describe('Getting Data Values', () => {

    it('should get a Value Out', function(){
      expect(helpers.dataValue(1)).to.equal(1)
      expect(helpers.dataValue({ a: 3 })).to.eql({ a: 3 })
      expect(helpers.dataValue([ 3 ])).to.eql([ 3 ])

      expect(helpers.dataValue(1, 'value')).to.equal(1)
      expect(helpers.dataValue({ value: 1 }, 'value')).to.equal(1)
      expect(helpers.dataValue({ value: { a: 3 } }, 'value')).to.eql({ a: 3 })

      expect(helpers.dataValue(1, 0)).to.equal(1)
      expect(helpers.dataValue(1, 1)).to.equal(1)
      expect(helpers.dataValue([ 1 ], 0)).to.equal(1)
      expect(helpers.dataValue([ 1, 2 ], 1)).to.equal(2)
      expect(helpers.dataValue([ { a: 3 } ], 0)).to.eql({ a: 3 })
      expect(helpers.dataValue([ { a: 3 }, 'foo' ], 1)).to.eql('foo')
    })

  })

  describe('Reading Data Text', () => {

    it('should always return a string', function(){

      expect(helpers.dataText('hi')).to.be.a('string').and.to.equal('hi')
      expect(helpers.dataText({ a: 3 })).to.be.a('string').and.to.equal('[object Object]')
      expect(helpers.dataText([ 1 ])).to.be.a('string').and.to.equal('1')
      expect(helpers.dataText(null)).to.be.a('string').and.to.equal('')
      expect(helpers.dataText(4)).to.be.a('string').and.to.equal('4')
    })

    it('should use specified field', function(){
      expect(helpers.dataText(2, 'text')).to.equal('2')
      expect(helpers.dataText(2, 1)).to.equal('2')
      expect(helpers.dataText('hi', 'text')).to.equal('hi')
      expect(helpers.dataText(Object.create({ text: 'hi' }, {}), 'text')).to.equal('hi')
      expect(helpers.dataText(Object.create(null, { text: { value: 'hi' } }), 'text')).to.equal('hi')
      expect(helpers.dataText({ text: 'hi' }, 'text')).to.equal('hi')
      expect(helpers.dataText({ text: { a: 3 } }, 'text')).to.eql('[object Object]')
      expect(helpers.dataText([ 'hi' ], 0)).to.equal('hi')
      expect(helpers.dataText([ { a: 3 } ], 0)).to.eql('[object Object]')
    })

    it('should fall back to item when missing field', function(){
      expect(helpers.dataText('hi', 'text')).to.equal('hi')
      expect(helpers.dataText({ missing: 'hi' }, 'text')).to.equal('[object Object]')
      expect(helpers.dataText([ 'hi' ], 0)).to.equal('hi')
      expect(helpers.dataText([ { a: 3 } ], 0)).to.eql('[object Object]')
    })

    it('should work as a function accessor', function(){
      var textField = item => item.text + ' hi';

      expect(helpers.dataText({ text: 'hi' }, textField)).to.equal('hi hi')
      expect(helpers.dataText({ text: 'john' }, textField)).to.equal('john hi')
      expect(helpers.dataText({ text: { a: 3 } }, textField)).to.eql('[object Object] hi')

      textField = item => item[0] + ' hi';

      expect(helpers.dataText([ 'hi' ], textField)).to.equal('hi hi')
      expect(helpers.dataText([ 'john' ], textField)).to.equal('john hi')
      expect(helpers.dataText([ { a: 3 } ], textField)).to.eql('[object Object] hi')
    })

  })

  describe('Finding Data Values', () => {

    it('should work with valueMatcher', function(){
      expect(helpers.valueMatcher({ id:'j', label:'jimmy' }, { id:'j', label:'jimmy' }, 'id')).to.be(true)
      expect(helpers.valueMatcher({ id:'j', label:'jimmy' }, { id:'j', label:'jimmy' }, 'label')).to.be(true)
      expect(helpers.valueMatcher({ id:'j', label:'jimmy' }, { id:'f', label:'foo' }, 'foo')).to.be(false)

      expect(helpers.valueMatcher([ 'j', 'jimmy' ], [ 'j', 'jimmy' ], 0)).to.be(true)
      expect(helpers.valueMatcher([ 'j', 'jimmy' ], [ 'j', 'jimmy' ], 1)).to.be(true)
      expect(helpers.valueMatcher([ 'j', 'jimmy' ], [ 'f', 'foo' ], 0)).to.be(false)

      expect(helpers.valueMatcher([ 'j', 'jimmy' ], 'j', 0)).to.be(true)
      expect(helpers.valueMatcher([ 'j', 'jimmy' ], 'jimmy', 1)).to.be(true)
      expect(helpers.valueMatcher([ 'j', 'jimmy' ], 'f', 0)).to.be(false)
      expect(helpers.valueMatcher([ 'j', 'jimmy' ], 'foo', 1)).to.be(false)

      expect(helpers.valueMatcher([ 1, 2 ], 1, 0)).to.be(true)
      expect(helpers.valueMatcher([ 1, 2 ], 2, 1)).to.be(true)
      expect(helpers.valueMatcher([ 1, 2 ], 2, 0)).to.be(false)
      expect(helpers.valueMatcher([ 1, 2 ], 1, 1)).to.be(false)
    })

    it('should work with indexOf', function(){
      var val = { value: 3 }

      expect(helpers.dataIndexOf([ 2, 3, 1], 1)).to.equal(2)
      expect(helpers.dataIndexOf([{}, val, {}], val)).to.equal(1)
      expect(helpers.dataIndexOf([{}, val, {}], { value: 3 })).to.equal(1)
      expect(helpers.dataIndexOf([{}, val, {}], 3, 'value')).to.equal(1)
      expect(
        helpers.dataIndexOf( [{}, {}, { value: { a: 2 } }], { a: 2 }, 'value')
      )
      .to.equal(2)

      var arr = [
        [ 'j', 'jimmy' ],
        [ 's', 'sally' ],
        [ 'p', 'pat' ]
      ];

      // Array item values without a valueField
      expect(helpers.dataIndexOf(arr, [ 's', 'sally' ])).to.equal(1)
      expect(helpers.dataIndexOf(arr, [ 'f', 'foo' ])).to.equal(-1)

      // Scalar values with a valueField
      expect(helpers.dataIndexOf(arr, 'p', 0)).to.equal(2)
      expect(helpers.dataIndexOf(arr, 'f', 0)).to.equal(-1)

      expect(helpers.dataIndexOf(arr, 'pat', 1)).to.equal(2)

      expect(helpers.dataIndexOf(arr, 'foo', 1)).to.equal(-1)

      expect(helpers.dataIndexOf(arr, [ 'f', 'foo' ], 0)).to.equal(-1)
    })

  })

})
