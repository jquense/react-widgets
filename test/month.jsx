'use strict';
/*global it, describe, expect, sinon*/
var React = require('react/addons');
var Month = require('../src/Month.jsx')
  , directions = require('../src/util/constants').directions
  , Globalize = require('globalize');


var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , findAllType = TestUtils.scryRenderedComponentsWithType
  , trigger = TestUtils.Simulate;

describe('Month Component', function(){

  it('should move to an appropriate date', function(){
    var date   = new Date(2014, 0, 16, 0, 0, 0)
      , picker = render(<Month value={date} onChange={()=>{}}/>);

    expect(picker.move(date, directions.RIGHT).toString())
      .to.equal((new Date(2014, 0, 17, 0, 0, 0)).toString())

    expect(picker.move(date, directions.UP).toString())
      .to.equal((new Date(2014, 0, 9, 0, 0, 0)).toString())

    expect(picker.move(date, directions.DOWN).toString())
      .to.equal((new Date(2014, 0, 23, 0, 0, 0)).toString())


    picker.setProps({
      min: new Date(2014, 0, 11, 0, 0, 0),
      max: new Date(2014, 0, 20, 0, 0, 0)
    })

    expect(picker.move(date, directions.UP))
      .to.eql(date)

    expect(picker.move(date, directions.DOWN))
      .to.eql(date)
  })
})
