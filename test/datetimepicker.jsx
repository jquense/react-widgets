'use strict';
/*global it, describe, expect, sinon*/
require('../vendor/phantomjs-shim')

var React = require('react/addons');
var DateTimePicker = require('../src/DateTimePicker.jsx')
  , Calendar = require('../src/Calendar.jsx').BaseCalendar
  , Globalize = require('globalize');


var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , findAllType = TestUtils.scryRenderedComponentsWithType
  , trigger = TestUtils.Simulate;

describe('DateTimePicker', function(){

  it('should set initial values', function(){
    var date = new Date()
      , picker = render(<DateTimePicker defaultValue={date} format="MM-dd-yyyy"/>)
      , input  = findClass(picker, 'rw-input').getDOMNode();

    expect( input.value).to.be(Globalize.format(date, 'MM-dd-yyyy'));
  })

  it('should start closed', function(done){
    var picker = render(<DateTimePicker defaultValue={new Date()} />);
    var popups = findAllType(picker, require('../src/Popup.jsx'));

    expect(picker.state.open).to.not.be(true)
    expect(picker.getDOMNode().className).to.not.match(/\brw-open\b/)

    expect(findClass(picker, 'rw-input').getDOMNode().getAttribute('aria-expanded')).to.be('false')

    setTimeout(function(){
      expect(popups.length).to.be(2)
      popups.forEach( popup => expect(popup.getDOMNode().style.display).to.be('none')) 
      done()
    })
  })

  it('should open when clicked', function(){
    var onOpen = sinon.spy()
      , picker = render(<DateTimePicker onToggle={onOpen} />);

    trigger.click(findClass(picker, 'rw-btn-calendar').getDOMNode())

    expect(onOpen.calledOnce).to.be(true)

    trigger.click(findClass(picker, 'rw-btn-time').getDOMNode())

    expect(onOpen.calledTwice).to.be(true)
  })

  it('should change when selecting a time or date', function(){
    var change   = sinon.spy()
      , picker   = render(<DateTimePicker onChange={change} open='calendar' onToggle={()=>{}} />)
      , calendar = findType(picker, Calendar)
      , timelist = findType(picker, require('../src/List.jsx')).getDOMNode().children

    calendar.change(new Date())
    expect(change.calledOnce).to.be(true)
    trigger.click(timelist[0])

    expect(change.calledTwice).to.be(true)
  })

  it('should not show time button when not selected', function(){
    var spy
      , picker = render(<DateTimePicker time={false} calendar={false} onToggle={spy = sinon.spy()}/>);
    
    expect(() => findClass(picker, 'rw-btn-time')).to
      .throwException(/Did not find exactly one match for class:rw-btn-time/)

    expect(() => findClass(picker, 'rw-btn-calendar')).to
      .throwException(/Did not find exactly one match for class:rw-btn-calendar/)

    //make sure keyboard shortcuts don't work either
    trigger.keyDown(picker.getDOMNode(), { altKey: true })
    expect(spy.callCount).to.be(0)
    trigger.keyDown(picker.getDOMNode(), { altKey: true })
    expect(spy.callCount).to.be(0)
  })


  it('should trigger focus/blur events', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()
      , picker = render(<DateTimePicker onBlur={blur} onFocus={focus}/>);

    expect(focus.calledOnce).to.be(false)
    expect(blur.calledOnce).to.be(false)

    trigger.focus(picker.getDOMNode())

    setTimeout(() => {
      expect(focus.calledOnce).to.be(true)
      trigger.blur(picker.getDOMNode())

      setTimeout(() => {
        expect(blur.calledOnce).to.be(true)
        done()
      })
    })
  })

  it('should trigger key events', function(){
    var kp = sinon.spy(), kd = sinon.spy(), ku = sinon.spy()
      , picker = render(<DateTimePicker onKeyPress={kp} onKeyUp={ku} onKeyDown={kd}/>)
      , input  = findClass(picker, 'rw-input').getDOMNode();

    trigger.keyPress(input)
    trigger.keyDown(input)
    trigger.keyUp(input)

    expect(kp.calledOnce).to.be(true)
    expect(kd.calledOnce).to.be(true)
    expect(ku.calledOnce).to.be(true)
  })

  it('should do nothing when disabled', function(done){
    var picker = render(<DateTimePicker defaultValue={new Date} disabled/>)
      , input = findClass(picker, 'rw-input').getDOMNode();

    expect( input.hasAttribute('disabled')).to.be(true);

    trigger.click(findClass(picker, 'rw-i-calendar').getDOMNode())

    setTimeout(() => {
      expect(picker.state.open).to.not.be(true)
      done()
    })
  })

  it('should do nothing when readonly', function(done){
    var picker = render(<DateTimePicker defaultValue={new Date} readOnly/>)
      , input  = findClass(picker, 'rw-input').getDOMNode();

    expect( input.hasAttribute('readonly')).to.be(true);

    trigger.click(findClass(picker, 'rw-i-calendar').getDOMNode())

    setTimeout(() => {
      expect(picker.state.open).to.not.be(true)
      done()
    })
  })

  it('should call Select handler', function(){
    var change   = sinon.spy(), select = sinon.spy()
      , picker   = render(<DateTimePicker onChange={change} onSelect={select}/>)
      , calendar = findType(picker, Calendar)
      , timelist = findType(picker, require('../src/List.jsx')).getDOMNode().children;

    calendar.change(new Date())

    expect(select.calledOnce).to.be(true)
    expect(change.calledAfter(select)).to.be(true)

    select.reset()
    change.reset()

    trigger.click(timelist[0])
    expect(select.calledOnce).to.be(true)
    expect(change.calledAfter(select)).to.be(true)
  })


  it('should change values on key down', function(){
    var change = sinon.spy()
      , picker = render(<DateTimePicker onChange={change} />)
      , timelist = findType(picker, require('../src/List.jsx')).getDOMNode().children;

    trigger.keyDown(picker.getDOMNode(), { key: 'ArrowDown', altKey: true })
    expect(picker.state.open).to.be('calendar')

    trigger.keyDown(picker.getDOMNode(), { key: 'ArrowDown', altKey: true })
    expect(picker.state.open).to.be('time')

    trigger.keyDown(picker.getDOMNode(), { key: 'Home'})

    expect(timelist[0].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(picker.getDOMNode(), { key: 'End'})

    expect(timelist[timelist.length-1].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(picker.getDOMNode(), { key: 'ArrowUp' })
    expect(timelist[timelist.length-2].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(picker.getDOMNode(), { key: 'ArrowDown' })
    expect(timelist[timelist.length-1].className).to.match(/\brw-state-focus\b/)
  })
})