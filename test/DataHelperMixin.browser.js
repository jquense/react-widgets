
import * as helpers from'../src/util/dataHelpers';

describe('when using DATA HELPERS', function(){
  it('should get a Value Out', function(){
    expect(helpers.dataValue(1)).to.equal(1)
    expect(helpers.dataValue({ a: 3 })).to.eql({ a: 3 })

    expect(helpers.dataValue(1, 'value')).to.equal(1)
    expect(helpers.dataValue({ value: 1 }, 'value')).to.equal(1)
    expect(helpers.dataValue({ value: { a: 3 } }, 'value')).to.eql({ a: 3 })
  })

  describe('Reading Data Text', () => {

    it('should always return a string', function(){

      expect(helpers.dataText('hi')).to.be.a('string').and.to.equal('hi')
      expect(helpers.dataText({ a: 3 })).to.be.a('string').and.to.equal('[object Object]')
      expect(helpers.dataText(null)).to.be.a('string').and.to.equal('')
      expect(helpers.dataText(4)).to.be.a('string').and.to.equal('4')
    })

    it('should use specified field', function(){
      expect(helpers.dataText('hi', 'text')).to.equal('hi')
      expect(helpers.dataText(Object.create({ text: 'hi' }, {}), 'text')).to.equal('hi')
      expect(helpers.dataText(Object.create(null, { text: { value: 'hi' } }), 'text')).to.equal('hi')
      expect(helpers.dataText({ text: 'hi' }, 'text')).to.equal('hi')
      expect(helpers.dataText({ text: { a: 3 } }, 'text')).to.eql('[object Object]')
    })

    it('should fall back to item when missing field', function(){
      expect(helpers.dataText('hi', 'text')).to.equal('hi')
      expect(helpers.dataText({ missing: 'hi' }, 'text')).to.equal('[object Object]')
    })

    it('should work as a function accessor', function(){
      var textField = item => item.text + ' hi';

      expect(helpers.dataText({ text: 'hi' }, textField)).to.equal('hi hi')
      expect(helpers.dataText({ text: 'john' }, textField)).to.equal('john hi')
      expect(helpers.dataText({ text: { a: 3 } }, textField)).to.eql('[object Object] hi')
    })
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
  })

})
