'use strict';
/*global it, describe, expect, sinon*/
require('../vendor/phantomjs-shim')

var React = require('react/addons');
var DateTimePicker = require('../src/DateTimePicker.jsx')
  , Calendar = require('../src/Calendar.jsx')
  , Header = require('../src/Header.jsx')
  , Globalize = require('globalize');


var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , findAllType = TestUtils.scryRenderedComponentsWithType
  , trigger = TestUtils.Simulate;

describe('DateTimePicker', function(){

  it('should set Initial View', function(){
    var date = new Date()
      , picker = render(<Calendar defaultValue={date} initialView='year'/>);

    expect(() => 
      findType(picker, require('../src/Year.jsx'))).to.not.throwException();
  })

  it('should click up through views', function(){
    var date = new Date()
      , picker = render(<Calendar defaultValue={date} />)
      , header = findType(picker, Header)
      , navBtn = findClass(header, 'rw-btn-view').getDOMNode();

    expect(() => 
      findType(picker, require('../src/Month.jsx'))).to.not.throwException();

    trigger.click(navBtn)

    expect(() => 
      findType(picker, require('../src/Year.jsx'))).to.not.throwException();

    trigger.click(navBtn)

    expect(() => 
      findType(picker, require('../src/Decade.jsx'))).to.not.throwException();

    trigger.click(navBtn)

    expect(() => 
      findType(picker, require('../src/Century.jsx'))).to.not.throwException();

    expect(navBtn.hasAttribute('disabled')).to.be(true)
  })

  it.only('should key up through views', function(){
    var date = new Date()
      , picker = render(<Calendar defaultValue={date} />);

    expect(() => 
      findType(picker, require('../src/Month.jsx'))).to.not.throwException();

    trigger.keyDown(picker.getDOMNode(), { ctrlKey: true, key: 'ArrowUp' })

    expect(() => 
      findType(picker, require('../src/Year.jsx'))).to.not.throwException();

    trigger.keyDown(picker.getDOMNode(), { ctrlKey: true, key: 'ArrowUp' })

    expect(() => 
       findType(picker, require('../src/Decade.jsx'))).to.not.throwException();

    trigger.keyDown(picker.getDOMNode(), { ctrlKey: true, key: 'ArrowUp' })

    expect(() => 
      findType(picker, require('../src/Century.jsx'))).to.not.throwException();

  })

})