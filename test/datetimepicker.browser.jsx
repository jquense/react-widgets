'use strict';
/*global it, describe, expect, sinon*/
require('../vendor/phantomjs-shim')

import { findDOMNode } from 'react-dom';

var React = require('react');
var DateTimePicker = require('../src/DateTimePicker.jsx')
  , TimeList = require('../src/TimeList.jsx')
  , Calendar = require('../src/Calendar.jsx').ControlledComponent
  , Globalize = require('globalize');


var TestUtils = require('react-addons-test-utils');
var render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , findAllType = TestUtils.scryRenderedComponentsWithType
  , trigger = TestUtils.Simulate;

describe('DateTimePicker', function(){

  it('should set initial values', function(){
    var date = new Date()
      , instance = render(<DateTimePicker defaultValue={date} format="MM-dd-yyyy"/>)
      , input  = findClass(instance, 'rw-input');

    expect( input.value).to.be(Globalize.format(date, 'MM-dd-yyyy'));
  })

  it('should start closed', function(done){
    var instance = render(<DateTimePicker defaultValue={new Date()} />);
    var popups = findAllType(instance, require('../src/Popup.jsx'));

    expect(instance._values.open).to.not.be(true)
    expect(findDOMNode(instance).className).to.not.match(/\brw-open\b/)

    expect(findClass(instance, 'rw-input').getAttribute('aria-expanded')).to.be('false')

    setTimeout(function(){
      expect(popups.length).to.be(2)
      popups.forEach( popup => expect(findDOMNode(popup).style.display).to.be('none'))
      done()
    })
  })

  it('should open when clicked', function(){
    var onOpen = sinon.spy()
      , instance = render(<DateTimePicker onToggle={onOpen} />);

    trigger.click(findClass(instance, 'rw-btn-calendar'))

    expect(onOpen.calledOnce).to.be(true)

    trigger.click(findClass(instance, 'rw-btn-time'))

    expect(onOpen.calledTwice).to.be(true)
  })

  it('should change when selecting a time or date', function(){
    var change   = sinon.spy()
      , instance   = render(<DateTimePicker onChange={change} open='calendar' onToggle={()=>{}} />)
      , calendar = findType(instance, Calendar)
      , timelist = findDOMNode(findType(instance, require('../src/List.jsx'))).children

    calendar.change(new Date())
    expect(change.calledOnce).to.be(true)
    trigger.click(timelist[0])

    expect(change.calledTwice).to.be(true)
  })

  it('should set id on list', function(){
    var instance = render(<DateTimePicker />)
      , list = findTag(instance, 'ul');

    expect(list.hasAttribute('id')).to.be(true);
  })

  it('should not show time button when not selected', function(){
    var spy
      , instance = render(<DateTimePicker time={false} calendar={false} onToggle={spy = sinon.spy()}/>);

    expect(() => findClass(instance, 'rw-btn-time')).to
      .throwException(/Did not find exactly one match.+/)

    expect(() => findClass(instance, 'rw-btn-calendar')).to
      .throwException(/Did not find exactly one match.+/)

    //make sure keyboard shortcuts don't work either
    trigger.keyDown(findDOMNode(instance), { altKey: true })
    expect(spy.callCount).to.be(0)

    trigger.keyDown(findDOMNode(instance), { altKey: true })
    expect(spy.callCount).to.be(0)
  })


  it('should trigger focus/blur events', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()
      , instance = render(<DateTimePicker onBlur={blur} onFocus={focus}/>);

    expect(focus.calledOnce).to.be(false)
    expect(blur.calledOnce).to.be(false)

    trigger.focus(findDOMNode(instance))

    setTimeout(() => {
      expect(focus.calledOnce).to.be(true)
      trigger.blur(findDOMNode(instance))

      setTimeout(() => {
        expect(blur.calledOnce).to.be(true)
        done()
      })
    })
  })

  it('should trigger key events', function(){
    var kp = sinon.spy(), kd = sinon.spy(), ku = sinon.spy()
      , instance = render(<DateTimePicker onKeyPress={kp} onKeyUp={ku} onKeyDown={kd}/>)
      , input  = findClass(instance, 'rw-input');

    trigger.keyPress(input)
    trigger.keyDown(input)
    trigger.keyUp(input)

    expect(kp.calledOnce).to.be(true)
    expect(kd.calledOnce).to.be(true)
    expect(ku.calledOnce).to.be(true)
  })

  it('should do nothing when disabled', function(done){
    var instance = render(<DateTimePicker defaultValue={new Date()} disabled/>)
      , input = findClass(instance, 'rw-input');

    expect( input.hasAttribute('disabled')).to.be(true);

    trigger.click(findClass(instance, 'rw-i-calendar'))

    setTimeout(() => {
      expect(instance._values.open).to.not.be(true)
      done()
    })
  })

  it('should do nothing when readonly', function(done){
    var instance = render(<DateTimePicker defaultValue={new Date()} readOnly/>)
      , input  = findClass(instance, 'rw-input');

    expect( input.hasAttribute('readonly')).to.be(true);

    trigger.click(findClass(instance, 'rw-i-calendar'))

    setTimeout(() => {
      expect(instance._values.open).to.not.be(true)
      done()
    })
  })

  it('should call Select handler', function(){
    var change   = sinon.spy(), select = sinon.spy()
      , instance   = render(<DateTimePicker onChange={change} onSelect={select}/>)
      , calendar = findType(instance, Calendar)
      , timelist = findDOMNode(findType(instance, require('../src/List.jsx'))).children;

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
      , instance = render(<DateTimePicker onChange={change} />)
      , timelist = findDOMNode(findType(instance, require('../src/List.jsx'))).children;

    trigger.keyDown(findDOMNode(instance), { key: 'ArrowDown', altKey: true })
    expect(instance._values.open).to.be('calendar')

    trigger.keyDown(findDOMNode(instance), { key: 'ArrowDown', altKey: true })
    expect(instance._values.open).to.be('time')

    trigger.keyDown(findDOMNode(instance), { key: 'Home'})

    expect(timelist[0].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(instance), { key: 'End'})

    expect(timelist[timelist.length - 1].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(instance), { key: 'ArrowUp' })
    expect(timelist[timelist.length - 2].className).to.match(/\brw-state-focus\b/)

    trigger.keyDown(findDOMNode(instance), { key: 'ArrowDown' })
    expect(timelist[timelist.length - 1].className).to.match(/\brw-state-focus\b/)
  })


  describe('TimeList', function(){

    it('should render max correctly', ()=>{
      var date = new Date(2014, 0, 16, 9, 30)
        , inst = render(<TimeList value={new Date(2014, 0, 16, 8)} max={date} preserveDate/>)

      var time = inst.state.dates[inst.state.dates.length - 1]

      expect(time.date.getHours()).to.eql(9)
      expect(time.date.getMinutes()).to.eql(30)
      expect(time.date.getSeconds()).to.eql(0)

      inst = render(<TimeList value={new Date(2014, 0, 15, 8)} max={date} preserveDate/>)

      time = inst.state.dates[inst.state.dates.length - 1]

      expect(time.date.getHours()).to.eql(23)
      expect(time.date.getMinutes()).to.eql(30)
      expect(time.date.getSeconds()).to.eql(0)
    })

    it('should render min correctly', ()=>{
      var date = new Date(2014, 0, 16, 9, 30)
        , inst = render(<TimeList value={new Date(2014, 0, 16, 12)} min={date} preserveDate/>)

      var time = inst.state.dates[0]

      expect(time.date.getHours()).to.eql(9)
      expect(time.date.getMinutes()).to.eql(30)
      expect(time.date.getSeconds()).to.eql(0)

      inst = render(<TimeList value={new Date(2014, 0, 18, 8)} min={date} preserveDate/>)

      time = inst.state.dates[0]

      expect(time.date.getHours()).to.eql(0)
      expect(time.date.getMinutes()).to.eql(0)
      expect(time.date.getSeconds()).to.eql(0)
    })


    it('should set the step property', ()=>{
      var inst = render(<DateTimePicker step={60}/>);
      var dates = findType(inst, TimeList).state.dates

      expect(dates[0].date.getHours()).to.eql(0)
      expect(dates[1].date.getHours()).to.eql(1)
      expect(dates[2].date.getHours()).to.eql(2)

      inst = render(<DateTimePicker step={120}/>)
      dates = findType(inst, TimeList).state.dates

      expect(dates[0].date.getHours()).to.eql(0)
      expect(dates[1].date.getHours()).to.eql(2)
      expect(dates[2].date.getHours()).to.eql(4)
    })
  })

})
