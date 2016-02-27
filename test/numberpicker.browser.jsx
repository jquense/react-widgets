import { findDOMNode } from 'react-dom';
import tsp from 'teaspoon';

var React = require('react');
var NumberPicker = require('../src/NumberPicker.jsx');

//console.log(sinon)
var TestUtils = require('react-addons-test-utils');
var render = TestUtils.renderIntoDocument
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , trigger = TestUtils.Simulate;

describe('NumberPicker', function(){


  it('should set values correctly', function() {
    let expectValueToBe = val =>
      inst => expect(inst.find('.rw-input').dom().value).to.be(val)

    tsp(<NumberPicker value={15} format='D' onChange={()=>{}} />)
      .render()
        .tap(expectValueToBe('15'))
      .props({ value: null, min: 10, max: 10 })
        .tap(expectValueToBe(''))
      .props({ value: 1, min: 10 })
        .tap(expectValueToBe('10'))
      .props({ value: 20, max: 10 })
        .tap(expectValueToBe('10'))
      .props({ value: 10, format: 'c' })
        .tap(expectValueToBe('$10.00'))
  })

  it('should be able to accept a placeholder', function() {
    let input = tsp(<NumberPicker placeholder={"enter number here"} format='D' onChange={()=>{}} />)
      .render()
      .find('.rw-input')
      .dom()

     expect(input.placeholder).to.be('enter number here');
  })

  it('should pass NAME down', function(){
    let input = tsp(<NumberPicker value={15} format='D' onChange={()=>{}} name='hello'/>)
      .render()
      .find('.rw-input')
      .dom()

    expect(input.hasAttribute('name')).to.be(true)
  })

  it('should not fire change until there is a valid value', function(){
    var change = sinon.spy()
    var input = tsp(<NumberPicker value={150} format='D' min={100} onChange={change} />)
      .render()
      .find('.rw-input')

    input.dom().value = '15'
    input.trigger('change')

    expect(change.called).to.be(false);

    input.dom().value = '154'
    input.trigger('change')
    expect(change.calledOnce).to.be(true);

    //should call change on a null value when no min
    change.reset()

    input = tsp(<NumberPicker value={15} format='D' min={-Infinity} onChange={change} />)
      .render()
      .find('.rw-input')

    input.dom().value = ''
    input.trigger('change')
    expect(change.calledOnce).to.be(true)
  })

  it('should change value when spinner is clicked', function(){
    var change = sinon.spy()
      , instance = render(<NumberPicker value={1} format='D' onChange={change} />)
      , upBtn  = findClass(instance, 'rw-select').children[0]
      , dwnBtn  = findClass(instance, 'rw-select').children[1]
      , input  = findDOMNode(findClass(instance, 'rw-input'));

    //increment
    expect(input.value).to.be('1')
    trigger.mouseDown(upBtn)
    trigger.mouseUp(upBtn)

    expect(change.calledOnce).to.be(true)
    expect(change.args[0][0]).to.be(2)

    //decrement
    trigger.mouseDown(dwnBtn)
    trigger.mouseUp(dwnBtn)

    expect(change.calledTwice).to.be(true)
    expect(change.args[1][0]).to.be(0)
  })

  it('should trigger focus/blur events', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()
      , instance = render(<NumberPicker onBlur={blur} onFocus={focus}/>);

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
      , instance = render(<NumberPicker onKeyPress={kp} onKeyUp={ku} onKeyDown={kd}/>)
      , input  = findDOMNode(findClass(instance, 'rw-input'));

    trigger.keyPress(input)
    trigger.keyDown(input)
    trigger.keyUp(input)

    expect(kp.calledOnce).to.be(true)
    expect(kd.calledOnce).to.be(true)
    expect(ku.calledOnce).to.be(true)
  })

  it('should do nothing when disabled', function(){
    var change = sinon.spy()
      , instance = render(<NumberPicker value={0} disabled={true} onChange={change} />)
      , input  = findDOMNode(findClass(instance, 'rw-input'))
      , upBtn  = findClass(instance, 'rw-select').children[0]
      , dwnBtn = findClass(instance, 'rw-select').children[1];

    trigger.focus(input)

    setTimeout(function(){
      expect(findDOMNode(instance).className).to.not.match(/\brw-state-focus\b/)
      expect(findDOMNode(instance).className).to.match(/\brw-state-disabled\b/)
      expect(input.hasAttribute('aria-disabled')).to.be(true)
      expect(input.getAttribute('aria-disabled')).to.be('true')

      trigger.mouseDown(upBtn)
      trigger.mouseDown(dwnBtn)
      expect(change.called).to.be(false)
    }, 0)
  })

  it('should allow null values with min', function(){
    var change = sinon.spy()
      , instance = render(<NumberPicker value={0} min={12} onChange={change} />)
      , input  = findDOMNode(findClass(instance, 'rw-input'));

    trigger.change(input, { target: { value: '' } })

    expect(change.calledOnce).to.be(true)
    expect(change.calledWithExactly(null)).to.be(true)
  })

  it('should not trigger change at delimiter', function() {
    var change = sinon.spy()
      , instance = render(<NumberPicker value={1.5} min={12} onChange={change} />)
      , input  = findDOMNode(findClass(instance, 'rw-input'));

    trigger.change(input, { target: { value: '1.' } })

    expect(change.callCount).to.be(0)

    change = sinon.spy()
    instance = render(<NumberPicker value={1.5} min={12} onChange={change} />)
    input  = findDOMNode(findClass(instance, 'rw-input'))
  })

  it('should not trigger change while below min', function() {
    var change = sinon.spy()
      , instance = render(<NumberPicker value={1.5} min={12} onChange={change} />)
      , input  = findDOMNode(findClass(instance, 'rw-input'));

    trigger.change(input, { target: { value: '11' } })

    expect(change.callCount).to.be(0)

    trigger.change(input, { target: { value: '111' } })

    expect(change.callCount).to.be(1)
  })

  it('should do nothing when readonly', function(){
    var change = sinon.spy()
      , instance = render(<NumberPicker value={0} readOnly={true} onChange={change} />)
      , input  = findDOMNode(findClass(instance, 'rw-input'))
      , upBtn  = findClass(instance, 'rw-select').children[0]
      , dwnBtn = findClass(instance, 'rw-select').children[1];

    trigger.focus(input)

    setTimeout(function(){
      expect(findDOMNode(instance).className).to.match(/\brw-state-focus\b/)
      expect(findDOMNode(instance).className).to.match(/\brw-state-readonly\b/)
      expect(input.hasAttribute('aria-readonly')).to.be(true)
      expect(input.getAttribute('aria-readonly')).to.be('true')

      trigger.mouseDown(upBtn)
      trigger.mouseDown(dwnBtn)
      expect(change.called).to.be(false)
    }, 0)

  })

  it('should change values on key down', function() {
    var change = sinon.spy();

    let instance = tsp(
      <NumberPicker value={10} onChange={change} />
    ).render()

    instance
      .trigger('keyDown', { key: 'End'})
      .trigger('keyDown', { key: 'Home'})
      .tap(() => {
        expect(change.called).to.be(false)
      })
      .trigger('keyDown', { key: 'ArrowDown'})
      .tap(() => {
        expect(change.calledOnce).to.be(true)
        expect(change.calledWith(9)).to.be(true)

        change.reset()
      })
      .trigger('keyDown', { key: 'ArrowUp'})
      .tap(() => {
        expect(change.calledOnce).to.be(true)
        expect(change.calledWith(11)).to.be(true)
        change.reset()
      })
      .props({ min: 5, max: 15 })
      .trigger('keyDown', { key: 'End'})
      .tap(() => {
        expect(change.calledOnce).to.be(true)
        expect(change.calledWith(15)).to.be(true)
        change.reset()
      })
      .trigger('keyDown', { key: 'Home'})

    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(5)).to.be(true)
  })
})
