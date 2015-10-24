import { findDOMNode } from 'react-dom';

var React = require('react/addons');
var NumberPicker = require('../src/NumberPicker.jsx');

//console.log(sinon)
var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , trigger = TestUtils.Simulate;

describe('NumberPicker', function(){


  it('should set values correctly', function(done){
    var instance = render(<NumberPicker value={15} format='D' onChange={()=>{}} />)
      , input  = findDOMNode(findClass(instance, 'rw-input'));

    expect(input.value).to.be('15');

    instance.setProps({ value: null, min: 10, max: 10 }, function(){
      expect(input.value).to.be('');

      instance.setProps({ value: 1, min: 10 }, function(){
        expect(input.value).to.be('10');

        instance.setProps({ value: 20, max: 10 }, function(){
          expect(input.value).to.be('10');

          instance.setProps({ value: 10, format: 'c' }, function(){
            expect(input.value).to.be('$10.00');
            done()
          })
        })
      })
    })
  })

  it('should be able to accept a placeholder', function(done){
    var picker = render(<NumberPicker placeholder={"enter number here"} format='D' onChange={()=>{}} />)
      , input  = findClass(picker, 'rw-input');

     expect(input.placeholder).to.be('enter number here');
     done();
  })

  it('should pass NAME down', function(){
    var instance = render(<NumberPicker value={15} format='D' onChange={()=>{}} name='hello'/>)
      , input  = findDOMNode(findClass(instance, 'rw-input'));

    expect(input.hasAttribute('name')).to.be(true)
  })

  it('should not fire change until there is a valid value', function(done){
    var change = sinon.spy()
      , instance = render(<NumberPicker value={150} format='D' min={100} onChange={change} />)
      , input  = findDOMNode(findClass(instance, 'rw-input'));

    input.value = '15'
    trigger.change(input)

    expect(change.called).to.be(false);
    expect(input.value).to.be('15');

    input.value = '154'
    trigger.change(input)
    expect(change.calledOnce).to.be(true);

    //should call change on a null value when no min
    change.reset()
    instance.setProps({ value: 15, min: -Infinity }, function(){

      input.value = ''
      trigger.change(input)
      expect(change.calledOnce).to.be(true)
      done()
    })
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
    trigger.change(input, { target: { value: '12 221 ' } })
    trigger.change(input, { target: { value: '221,' } })

    expect(change.callCount).to.be(0)
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

  it('should change values on key down', function(done){
    var change = sinon.spy()
      , instance = render(<NumberPicker value={10} onChange={change} />)
      , input  = findDOMNode(instance);

    trigger.keyDown(input, { key: 'End'})
    trigger.keyDown(input, { key: 'Home'})
    expect(change.called).to.be(false)

    trigger.keyDown(input, { key: 'ArrowDown'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(9)).to.be(true)

    change.reset()

    trigger.keyDown(input, { key: 'ArrowUp'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(11)).to.be(true)

    change.reset()

    instance.setProps({ min: 5, max: 15 }, function(){

      trigger.keyDown(input, { key: 'End'})
      expect(change.calledOnce).to.be(true)
      expect(change.calledWith(15)).to.be(true)

      change.reset()

      trigger.keyDown(input, { key: 'Home'})

      expect(change.calledOnce).to.be(true)
      expect(change.calledWith(5)).to.be(true)

      done()
    })
  })
})
