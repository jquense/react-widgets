'use strict';
/*global it, describe, expect, sinon*/
require('../vendor/phantomjs-shim')

import { findDOMNode } from 'react-dom';

var React = require('react');
var ComboBox = require('../src/Combobox.jsx');
var Popup = require('../src/Popup.jsx')
var $ = require('teaspoon');

var TestUtils = require('react-addons-test-utils');
var render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , trigger = TestUtils.Simulate;


describe('ComboBox', function(){
  var dataList = [
        { label: 'jimmy', id: 0 },
        { label: 'sally', id: 1 },
        { label: 'pat', id: 2 }
      ];

  it('should set initial values', function(){
    $(<ComboBox value={'hello'} onChange={()=>{}} />)
      .render()
      .find('input.rw-input')
      .tap(c =>
        expect(c.dom().value).to.be('hello'));
  })

  it('should respect textField and valueFields', function(){
    $(
      <ComboBox
        defaultValue={0}
        data={dataList}
        textField={ i => i.label }
        valueField='id'
      />
    ).render()
      .find('input.rw-input')
      .tap(c =>
        expect(c.dom().value).to.be('jimmy'));
  })

  it('should pass NAME down', function(){
    $(
      <ComboBox
        defaultValue={0}
        data={dataList}
        textField='label'
        valueField='id'
        name='hello'
      />
    ).render()
      .find(':dom.rw-input')
      .tap(c =>
        expect(c.dom().hasAttribute('name')).to.be(true));
  })

  it('should start closed', function(done){
    var inst = $(
      <ComboBox
        defaultValue={0}
        data={dataList}
        textField='label'
        valueField='id'
      />
    ).render()

    let input = inst.find('.rw-input:dom').dom()
      , popup = inst.find(Popup).dom();

    expect(inst.unwrap()._values.open).to.not.be(true)

    expect(inst.dom().className).to.not.match(/\brw-open\b/)
    expect(input.getAttribute('aria-expanded')).to.be('false')

    setTimeout(function(){
      expect(popup.style.display).to.be('none')
      done()
    }, 0)
  })

  it('should open when clicked', function(done){
    var inst = $(
      <ComboBox
        defaultValue={0}
        data={dataList}
        textField='label'
        valueField='id'
      />
    ).render()

    let input = inst.find('.rw-input:dom').dom()
      , popup = inst.find(Popup).unwrap();

    expect(inst.unwrap()._values.open).to.not.be(true)
    expect(inst.dom().className).to.not.match(/\brw-open\b/)

    inst.single('.rw-select:dom')
      .trigger('click')

    expect(input.getAttribute('aria-expanded')).to.be('true')
    expect(popup.props.open).to.be(true)
    done()

  })

  it('should trigger focus/blur events', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()
      , picker = render(<ComboBox onBlur={blur} onFocus={focus}/>);

    expect(focus.calledOnce).to.be(false)
    expect(blur.calledOnce).to.be(false)

    trigger.focus(findDOMNode(picker))

    setTimeout(() => {
      expect(focus.calledOnce).to.be(true)
      trigger.blur(findDOMNode(picker))

      setTimeout(() => {
        expect(blur.calledOnce).to.be(true)
        done()
      })
    })
  })

  it('should trigger key events', function(){
    var kp = sinon.spy(), kd = sinon.spy(), ku = sinon.spy()
      , comboBox = render(<ComboBox onKeyPress={kp} onKeyUp={ku} onKeyDown={kd}/>)
      , input    = findClass(comboBox, 'rw-input');

    trigger.keyPress(input)
    trigger.keyDown(input)
    trigger.keyUp(input)

    expect(kp.calledOnce).to.be(true)
    expect(kd.calledOnce).to.be(true)
    expect(ku.calledOnce).to.be(true)
  })

  it('should do nothing when disabled', function(done){
    var comboBox = render(<ComboBox defaultValue={'jimmy'} data={dataList} duration={0} disabled={true}/>)
      , input = findClass(comboBox, 'rw-input');

    expect( input.hasAttribute('disabled')).to.be(true);

    trigger.click(findTag(comboBox, 'button'))

    setTimeout(function() {
      expect(comboBox._values.open).to.not.be(true)
      done()
    }, 0)
  })

  it('should do nothing when readonly', function(done){
    var comboBox = render(<ComboBox defaultValue={'jimmy'} data={dataList} duration={0} readOnly={true}/>)
      , input = findClass(comboBox, 'rw-input');

    expect( input.hasAttribute('readonly')).to.be(true);

    trigger.click(findTag(comboBox, 'button'))

    setTimeout(function() {
      expect(comboBox._values.open).to.not.be(true)
      done()
    }, 0)
  })

  it('should not trigger form submission', function(){
    let spy;
    let select = $(
      <form action='/' onSubmit={() => { throw new Error('should not submit!') }}>
        <ComboBox data={dataList} onSearch={()=>{}} onKeyDown={spy = sinon.spy()}/>
      </form>
    ).render();

    select.find('input')
      .trigger('keyDown', { key: 'Enter' })

    expect(spy.calledOnce).to.equal(true);
  })

  it('should set id on list', function(){
    var comboBox = render(<ComboBox defaultValue={'jimmy'} data={dataList} duration={0} readOnly={true}/>)
      , list = findTag(comboBox, 'ul');

    expect(list.hasAttribute('id')).to.be(true);
  })

  it('should call Select handler', function(done){
    var change = sinon.spy(), select = sinon.spy()
      , comboBox = render(<ComboBox open={true} value={dataList[1]} data={dataList} duration={0} onChange={change} onSelect={select} onToggle={()=>{}}/>)
      , list = findClass(comboBox, 'rw-list');

    findDOMNode(comboBox).focus()

    setTimeout(function(){

      trigger.click(findDOMNode(list).children[0])

      expect(select.calledOnce).to.be(true)
      expect(change.calledAfter(select)).to.be(true)

      select.reset()
      comboBox = render(<ComboBox open={true} value={[]} data={dataList} duration={0} onChange={change} onSelect={select} onToggle={()=>{}}/>)
      trigger.keyDown(findDOMNode(comboBox), { key: 'Enter'})

      expect(select.calledOnce).to.be(true)
      expect(change.calledAfter(select)).to.be(true)

      done()
    })
  })

  it('should change values on key down', function(){
    var change = sinon.spy()
      , comboBox = render(<ComboBox value={dataList[1]} data={dataList} duration={0} onChange={change}/>);

    trigger.keyDown(findDOMNode(comboBox), { key: 'ArrowDown'})

    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(dataList[2])).to.be(true)

    comboBox = render(<ComboBox value={dataList[1]} data={dataList} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(findDOMNode(comboBox), { key: 'ArrowUp'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(dataList[0])).to.be(true)

    comboBox = render(<ComboBox value={dataList[1]} data={dataList} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(findDOMNode(comboBox), { key: 'Home'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(dataList[0])).to.be(true)

    comboBox = render(<ComboBox value={dataList[1]} data={dataList} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(findDOMNode(comboBox), { key: 'End'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(dataList[2])).to.be(true)
  })


})
