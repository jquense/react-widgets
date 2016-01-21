var React    = require('react')
  , Dropdown = require('../src/DropdownList.jsx');

import { findDOMNode } from 'react-dom';

var TestUtils = require('react-addons-test-utils');
var render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , trigger = TestUtils.Simulate;

describe('DROPDOWNS', function(){
  var data = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 }
  ];

  it('should set initial values', function(){
    var instance = render(
          <Dropdown value={'hello'} onChange={()=>{}} />);

    expect($(findClass(instance, 'rw-input')).text()).to.be('hello');
  })

  it('should respect textField and valueFields', function(){
    var instance = render(
          <Dropdown defaultValue={0} data={data} textField='label' valueField='id' />);

    expect($(findClass(instance, 'rw-input')).text())
      .to.be('jimmy');
  })

  it('should start closed', function(done){
    var instance = render(<Dropdown defaultValue={0} data={data} textField='label' valueField='id' />);
    var popup = findType(instance, require('../src/Popup.jsx'));

    expect(instance._values.open).to.not.be(true)
    expect(findDOMNode(instance).className).to.not.match(/\brw-open\b/)
    expect(findDOMNode(instance).getAttribute('aria-expanded')).to.be('false')

    setTimeout(function(){
      expect(findDOMNode(popup).style.display).to.be('none')
      done()
    }, 0)
  })

  it('should use a value template', function(){
    var templ  = React.createClass({
      render() {
        return (<span>{'hello - ' + this.props.item}</span>);
      }
    });

    var instance = render(<Dropdown defaultValue={'jimmy'} valueComponent={templ} />);

    expect($(findClass(instance, 'rw-input')).text()).to.be('hello - jimmy');
  })

  it('should open when clicked', function(done){
    var instance = render(<Dropdown defaultValue={'jimmy'} data={data} duration={0}/>);
    var popup = findType(instance, require('../src/Popup.jsx'))

    trigger.click(findDOMNode(instance))

    setTimeout(function() {
      expect(instance._values.open).to.be(true)
      expect(findDOMNode(instance).className).to.match(/\brw-open\b/)
      expect(findDOMNode(instance).getAttribute('aria-expanded')).to.be('true')
      expect(popup.props.open).to.be(true)
      done()
    }, 0)
  })

  it('should set id on list', function(){
    var instance = render(<Dropdown />)
      , list = findTag(instance, 'ul');

    expect(list.hasAttribute('id')).to.be(true);
  })

  it('should trigger focus/blur events', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()
      , instance = render(<Dropdown onBlur={blur} onFocus={focus}/>);

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
      , instance = render(<Dropdown onKeyPress={kp} onKeyUp={ku} onKeyDown={kd}/>)
      , input  = findDOMNode(instance);

    trigger.keyPress(input)
    trigger.keyDown(input)
    trigger.keyUp(input)

    expect(kp.calledOnce).to.be(true)
    expect(kd.calledOnce).to.be(true)
    expect(ku.calledOnce).to.be(true)
  })

  it('should do nothing when disabled', function(done){
    var instance = render(<Dropdown defaultValue={'jimmy'} data={data} duration={0} disabled={true}/>)
      , input = findDOMNode(instance);

    expect( input.className).to.not.match(/\brw-state-focus\b/)
    expect( input.className).to.match(/\brw-state-disabled\b/)
    expect( input.hasAttribute('aria-disabled')).to.be(true)
    expect( input.getAttribute('aria-disabled')).to.be('true')

    trigger.click(findDOMNode(instance))

    setTimeout(function() {
      expect(instance._values.open).to.not.be(true)
      done()
    }, 0)
  })

  it('should do nothing when readonly', function(done){
    var instance = render(<Dropdown defaultValue={'jimmy'} data={data} duration={0} readOnly={true}/>)
      , input = findDOMNode(instance);

    expect( input.hasAttribute('aria-readonly')).to.be(true)
    expect( input.getAttribute('aria-readonly')).to.be('true')

    trigger.click(input)
    trigger.focus(input)

    setTimeout(function() {
      expect(input.className).to.match(/\brw-state-focus\b/)
      expect(instance._values.open).to.not.be(false)
      done()
    }, 0)
  })

  it('should call Select handler', function(done){
    var change = sinon.spy(), select = sinon.spy()
      , instance = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change} onSelect={select}/>)
      , list = findClass(instance, 'rw-list');

    findDOMNode(instance).focus()

    setTimeout(function(){

      trigger.click(list.children[0])

      expect(select.calledOnce).to.be(true)
      expect(change.calledAfter(select)).to.be(true)

      select.reset()
      change.reset()

      trigger.keyDown(findDOMNode(instance), { key: 'ArrowDown'}) //move to different value so change fires
      trigger.keyDown(findDOMNode(instance), { key: 'Enter'})

      expect(select.calledOnce).to.be(true)
      expect(change.calledAfter(select)).to.be(true)
      done()
    })
  })

  it('should change values on key down', function(){
    var change = sinon.spy()
      , instance = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>);

    trigger.keyDown(findDOMNode(instance), { key: 'ArrowDown'})

    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[2])).to.be(true)

    instance = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(findDOMNode(instance), { key: 'ArrowUp'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[0])).to.be(true)

    instance = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(findDOMNode(instance), { key: 'Home'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[0])).to.be(true)

    instance = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(findDOMNode(instance), { key: 'End'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[2])).to.be(true)
  })

  it('should search values on typing', function(done){
    var change = sinon.spy()
      , instance = render(<Dropdown.ControlledComponent value={data[0]} data={data} duration={0} delay={0} onChange={change} textField='label' />);

    trigger.keyPress(findDOMNode(instance), { which: 80, key: 'p' })

    setTimeout(() => {
      expect(change.calledOnce).to.be(true)
      expect(change.calledWith(data[2])).to.be(true)

      instance = render(
        <Dropdown.ControlledComponent open
          onToggle={()=>{}}
          value={data[0]}
          data={data}
          duration={0}
          delay={0}
          onChange={change}
          textField='label'
        />
      );

      trigger.keyPress(findDOMNode(instance), { which: 80, key: 'p' })

      setTimeout(() => {
        expect(instance.state.focusedItem).to.be(data[2])
        done()
      })
    })
  })
})
