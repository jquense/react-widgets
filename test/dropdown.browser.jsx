/* global it, describe, expect, sinon */
'use strict';
var React    = require('react/addons')
  , Dropdown = require('../src/DropdownList.jsx');

//console.log(sinon)
var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findAllTag = TestUtils.scryRenderedDOMComponentsWithTag
  , findAllClass = TestUtils.scryRenderedDOMComponentsWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , findAllType = TestUtils.scryRenderedComponentWithType
  , trigger = TestUtils.Simulate;

describe('DROPDOWNS', function(){
  var data = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 }
  ];

  it('should set initial values', function(){
    var dropdown = render(
          <Dropdown value={'hello'} onChange={()=>{}} />);

    expect($(findClass(dropdown, 'rw-input').getDOMNode()).text()).to.be('hello');
  })

  it('should respect textField and valueFields', function(){
    var dropdown = render(
          <Dropdown defaultValue={0} data={data} textField='label' valueField='id' />);

    expect($(findClass(dropdown, 'rw-input').getDOMNode()).text())
      .to.be('jimmy');
  })

  it('should start closed', function(done){
    var dropdown = render(<Dropdown defaultValue={0} data={data} textField='label' valueField='id' />);
    var popup = findType(dropdown, require('../src/Popup.jsx'));

    expect(dropdown.state.open).to.not.be(true)
    expect(dropdown.getDOMNode().className).to.not.match(/\brw-open\b/)
    expect(dropdown.getDOMNode().getAttribute('aria-expanded')).to.be('false')

    setTimeout(function(){
      expect(popup.getDOMNode().style.display).to.be('none')
      done()
    }, 0)
  })

  it('should use a value template', function(){
    var templ  = React.createClass({
      render: function() {
        return (<span>{"hello - " + this.props.item}</span>);
      }
    });

    var dropdown = render(<Dropdown defaultValue={'jimmy'} valueComponent={templ} />);

    expect($(findClass(dropdown, 'rw-input').getDOMNode()).text()).to.be('hello - jimmy');
  })

  it('should open when clicked', function(done){
    var dropdown = render(<Dropdown defaultValue={'jimmy'} data={data} duration={0}/>);
    var popup = findType(dropdown, require('../src/Popup.jsx'))

    trigger.click(dropdown.getDOMNode())

    setTimeout(function() {
      expect(dropdown.state.open).to.be(true)
      expect(dropdown.getDOMNode().className).to.match(/\brw-open\b/)
      expect(dropdown.getDOMNode().getAttribute('aria-expanded')).to.be('true')
      expect(popup.props.open).to.be(true)
      done()
    }, 0)
  })

  it('should set id on list', function(){
    var instance = render(<Dropdown />)
      , list = React.findDOMNode(findTag(instance, 'ul'));

    expect(list.hasAttribute('id')).to.be(true);
  })

  it('should trigger focus/blur events', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()
      , picker = render(<Dropdown onBlur={blur} onFocus={focus}/>);

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
      , picker = render(<Dropdown onKeyPress={kp} onKeyUp={ku} onKeyDown={kd}/>)
      , input  = picker.getDOMNode();

    trigger.keyPress(input)
    trigger.keyDown(input)
    trigger.keyUp(input)

    expect(kp.calledOnce).to.be(true)
    expect(kd.calledOnce).to.be(true)
    expect(ku.calledOnce).to.be(true)
  })

  it('should do nothing when disabled', function(done){
    var dropdown = render(<Dropdown defaultValue={'jimmy'} data={data} duration={0} disabled={true}/>)
      , input = dropdown.getDOMNode();

    expect( input.className).to.not.match(/\brw-state-focus\b/)
    expect( input.className).to.match(/\brw-state-disabled\b/)
    expect( input.hasAttribute('aria-disabled')).to.be(true)
    expect( input.getAttribute('aria-disabled')).to.be('true')

    trigger.click(dropdown.getDOMNode())

    setTimeout(function() {
      expect(dropdown.state.open).to.not.be(true)
      done()
    }, 0)
  })

  it('should do nothing when readonly', function(done){
    var dropdown = render(<Dropdown defaultValue={'jimmy'} data={data} duration={0} readOnly={true}/>)
      , input = dropdown.getDOMNode();

    expect( input.hasAttribute('aria-readonly')).to.be(true)
    expect( input.getAttribute('aria-readonly')).to.be('true')

    trigger.click(input)
    trigger.focus(input)

    setTimeout(function() {
      expect(input.className).to.match(/\brw-state-focus\b/)
      expect(dropdown.state.open).to.not.be(false)
      done()
    }, 0)
  })

  it('should call Select handler', function(done){
    var change = sinon.spy(), select = sinon.spy()
      , dropdown = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change} onSelect={select}/>)
      , list = findClass(dropdown, 'rw-list');

    dropdown.getDOMNode().focus()

    setTimeout(function(){

      trigger.click(list.getDOMNode().children[0])

      expect(select.calledOnce).to.be(true)
      expect(change.calledAfter(select)).to.be(true)

      select.reset()
      change.reset()

      trigger.keyDown(dropdown.getDOMNode(), { key: 'ArrowDown'}) //move to different value so change fires
      trigger.keyDown(dropdown.getDOMNode(), { key: 'Enter'})

      expect(select.calledOnce).to.be(true)
      expect(change.calledAfter(select)).to.be(true)
      done()
    })
  })

  it('should change values on key down', function(){
    var change = sinon.spy()
      , dropdown = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>);

    trigger.keyDown(dropdown.getDOMNode(), { key: 'ArrowDown'})

    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[2])).to.be(true)

    dropdown = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(dropdown.getDOMNode(), { key: 'ArrowUp'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[0])).to.be(true)

    dropdown = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(dropdown.getDOMNode(), { key: 'Home'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[0])).to.be(true)

    dropdown = render(<Dropdown value={data[1]} data={data} duration={0} onChange={change}/>)
    change.reset()

    trigger.keyDown(dropdown.getDOMNode(), { key: 'End'})
    expect(change.calledOnce).to.be(true)
    expect(change.calledWith(data[2])).to.be(true)
  })

  it('should search values on typing', function(done){
    var change = sinon.spy()
      , dropdown = render(<Dropdown.BaseDropdownList value={data[0]} data={data} duration={0} delay={0} onChange={change} textField='label' />);

    trigger.keyDown(dropdown.getDOMNode(), { keyCode: 80, key: 'p' })

    setTimeout(() => {
      expect(change.calledOnce).to.be(true)
      expect(change.calledWith(data[2])).to.be(true)

      dropdown.setProps({ value: data[0], open: true, onToggle: ()=>{} })
      trigger.keyDown(dropdown.getDOMNode(), { keyCode: 80, key: 'p' })

      setTimeout(() => {
        expect(dropdown.state.focusedItem).to.be(data[2])
        done()
      })
    })
  })
})