'use strict';
/*global it, describe, expect, beforeEach */
var React    = require('react/addons')
  , helper = require('../src/mixins/DataHelpersMixin');

var render = React.addons.TestUtils.renderIntoDocument

describe('when using DATA HELPER MIXIN', function(){
  var Component, data;

  beforeEach(function(){
    Component = React.createClass({

      mixins: [helper],

      _data: function(){
        return data
      },

       render: function(){ return null }
    })
  })

  it('should get a Value Out', function(){
    var instance = render(React.createElement(Component))

    expect(instance._dataValue(1)).to.equal(1)
    expect(instance._dataValue({ a: 3 })).to.eql({ a: 3 })

    instance = render(React.createElement(Component, { valueField: 'value'}))

    expect(instance._dataValue(1)).to.equal(1)
    expect(instance._dataValue({ value: 1 })).to.equal(1)
    expect(instance._dataValue({ value: { a: 3 } })).to.eql({ a: 3 })
  })

  it('should get Text Out', function(){
    var instance = render(React.createElement(Component))

    expect(instance._dataText('hi')).to.equal('hi')
    expect(instance._dataText({ a: 3 })).to.equal('[object Object]')

    instance = render(React.createElement(Component, { textField: 'text'}))

    expect(instance._dataText('hi')).to.equal('hi')
    expect(instance._dataText({ text: 'hi' })).to.equal('hi')
    expect(instance._dataText({ text: { a: 3 } })).to.eql('[object Object]')
  })


  it('should work with indexOf', function(){
    var instance = render(React.createElement(Component))
      , val = { value: 3 }

    expect(instance._dataIndexOf([ 2, 3, 1], 1)).to.equal(2)

    expect(instance._dataIndexOf([{}, val, {}], val)).to.equal(1)
    
    expect(instance._dataIndexOf([{}, val, {}], { value: 3 })).to.equal(1)

    instance = render(React.createElement(Component, { valueField: 'value'}))

    expect(instance._dataIndexOf([{}, val, {}], 3)).to.equal(1)

    expect(
      instance._dataIndexOf( [{}, {}, { value: { a: 2 } }], { a: 2 })
    )
    .to.equal(2)
  })
  

  // it.only('should find a dataItem', function(){
  //   var instance = render(React.createElement(Component))
  //     , val = { value: 3 }

  // })
})