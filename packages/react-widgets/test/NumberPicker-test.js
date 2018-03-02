import React from 'react';
import { mount } from 'enzyme';
import NumberPicker from '../src/NumberPicker';

let ControlledNumberPicker = NumberPicker.ControlledComponent;

describe('NumberPicker', function(){

  it('should set values correctly', function() {
    let expectValueToBe = val =>
      inst => expect(inst.find('.rw-input').getDOMNode().value).to.equal(val)

    mount(<NumberPicker value={15} format='D' onChange={()=>{}} />)
        .tap(expectValueToBe('15'))
      .setProps({ value: null, min: 10, max: 10 })
        .tap(expectValueToBe(''))
      .setProps({ value: 1, min: 10 })
        .tap(expectValueToBe('10'))
      .setProps({ value: 20, max: 10 })
        .tap(expectValueToBe('10'))
      .setProps({ value: 10, format: 'c' })
        .tap(expectValueToBe('$10.00'))
  })

  it('should be able to accept a placeholder', function() {
    let input = mount(
      <NumberPicker
        placeholder="enter number here"
        format='D'
        onChange={()=>{}}
      />
    )
    .find('.rw-input')
    .getDOMNode()

     expect(input.placeholder).to.equal('enter number here');
  })

  it('should pass NAME down', function(){
    let input = mount(<NumberPicker value={15} format='D' onChange={()=>{}} name='hello'/>)
      .find('.rw-input')
      .getDOMNode()

    expect(input.hasAttribute('name')).to.equal(true)
  })

  it('should not fire change until there is a valid value', function(){
    let change = sinon.spy()
    let input = mount(<NumberPicker value={150} format='D' min={100} onChange={change} />)
      .find('.rw-input')

    input.getDOMNode().value = '15'
    input.simulate('change')

    expect(change.called).to.equal(false);

    input.getDOMNode().value = '154'
    input.simulate('change')
    expect(change.calledOnce).to.equal(true);

    //should call change on a null value when no min
    change.resetHistory()

    input = mount(<NumberPicker value={15} format='D' min={-Infinity} onChange={change} />)
      .find('.rw-input')

    input.getDOMNode().value = ''
    input.simulate('change')
    expect(change.calledOnce).to.equal(true)
  })

  it('should change value when spinner is clicked', function(){
    let changeSpy = sinon.spy();

    let inst = mount(
      <NumberPicker
        value={1}
        format='D'
        onChange={changeSpy}
      />
    )

    //increment
    inst
      .find('Button')
      .first()
      .simulate('mouseDown')
      .simulate('mouseUp');

    expect(changeSpy.calledOnce).to.equal(true)
    expect(changeSpy.args[0][0]).to.equal(2)

    //decrement
    inst
      .find('Button')
      .last()
      .simulate('mouseDown')
      .simulate('mouseUp');

    expect(changeSpy.calledTwice).to.equal(true)
    expect(changeSpy.args[1][0]).to.equal(0)
  })

  it('should simulate focus/blur events', function(done){
    let blur = sinon.spy()
      , focus = sinon.spy()

    mount(<NumberPicker onBlur={blur} onFocus={focus}/>)
      .simulate('focus')
      .tap(inst => {
        setTimeout(() => {
          inst.simulate('blur')

          setTimeout(() => {
            expect(focus.calledOnce).to.equal(true)
            expect(blur.calledOnce).to.equal(true)
            done()
          })
        })
      });
  })

  it('should not simulate focus/blur events when disabled', function(done){
    let blur = sinon.spy()
      , focus = sinon.spy()

    mount(<NumberPicker disabled onBlur={blur} onFocus={focus}/>)
      .simulate('focus')
      .tap(inst => {
        setTimeout(() => {
          inst.simulate('blur')

          setTimeout(() => {
            expect(focus.called).to.equal(false)
            expect(blur.called).to.equal(false)
            done()
          })
        })
      });
  })

  it('should simulate key events', function(){
    let kp = sinon.spy()
      , kd = sinon.spy()
      , ku = sinon.spy()

    mount(
      <NumberPicker
        onKeyPress={kp}
        onKeyUp={ku}
        onKeyDown={kd}
      />
    )
    .find('input')
    .simulate('keyPress')
    .simulate('keyDown')
    .simulate('keyUp')

    expect(kp.calledOnce).to.equal(true)
    expect(kd.calledOnce).to.equal(true)
    expect(ku.calledOnce).to.equal(true)
  })

  it('should add correct markup when read-only', () => {
    let input = mount(<ControlledNumberPicker readOnly />)
      .find('.rw-input')
      .getDOMNode()

    expect(input.getAttribute('aria-readonly')).to.equal('true');
  })

  it('should add correct markup when disabled', () => {
    let input = mount(<ControlledNumberPicker disabled />)
      .find('.rw-input')
      .getDOMNode()

    expect(input.getAttribute('aria-disabled')).to.equal('true');
  })


  it('should allow null values with min', function(){
    let changeSpy = sinon.spy();

    mount(
      <NumberPicker
        value={15}
        min={12}
        onChange={changeSpy}
      />
    )
    .find('.rw-input')
    .simulate('change', { target: { value: '' } })

    expect(changeSpy.calledOnce).to.equal(true)
    expect(changeSpy.getCall(0).args[0]).to.equal(null)
  })

  it('should not simulate change at delimiter', function() {
    let changeSpy = sinon.spy();

    mount(
      <NumberPicker
        value={1.5}
        onChange={changeSpy}
      />
    )
    .find('.rw-input')
    .simulate('change', { target: { value: '1.' } })

    expect(changeSpy.callCount).to.equal(0)
  })

  it('should not simulate change while below min', () => {
    let changeSpy = sinon.spy();

    mount(
      <NumberPicker
        value={1.5}
        min={12}
        onChange={changeSpy}
      />
    )
    .find('.rw-input')
    .simulate('change', { target: { value: '11' } })
    .simulate('change', { target: { value: '111' } })

    expect(changeSpy.calledOnce).to.equal(true)
  })


  it('should change values on key down', function() {
    let change = sinon.spy();

    let instance = mount(
      <NumberPicker
        value={10}
        onChange={change}
      />
    )

    instance
      .simulate('keyDown', { key: 'End'})
      .simulate('keyDown', { key: 'Home'})
      .tap(() => {
        expect(change.called).to.equal(false)
      })
      .simulate('keyDown', { key: 'ArrowDown'})
      .tap(() => {
        expect(change.calledOnce).to.equal(true)
        expect(change.calledWith(9)).to.equal(true)

        change.resetHistory()
      })
      .simulate('keyDown', { key: 'ArrowUp'})
      .tap(() => {
        expect(change.calledOnce).to.equal(true)
        expect(change.calledWith(11)).to.equal(true)
        change.resetHistory()
      })
      .setProps({ min: 5, max: 15 })
      .simulate('keyDown', { key: 'End'})
      .tap(() => {
        expect(change.calledOnce).to.equal(true)
        expect(change.calledWith(15)).to.equal(true)
        change.resetHistory()
      })
      .simulate('keyDown', { key: 'Home'})

    expect(change.calledOnce).to.equal(true)
    expect(change.calledWith(5)).to.equal(true)
  })
})
