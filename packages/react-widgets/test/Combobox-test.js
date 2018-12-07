import React from 'react';
import { mount, shallow } from 'enzyme';

import Combobox from '../src/Combobox';


let ControlledCombobox = Combobox.ControlledComponent;


describe('Combobox', function(){
  var dataList = [
    { label: 'jimmy smith', id: 0 },
    { label: 'sally smith', id: 1 },
    { label: 'pat doe', id: 2 },
    { label: 'suzy smith', id: 3 },
  ];

  it('should set initial values', function(){
    mount(<Combobox value={'hello'} onChange={()=>{}} />)
      .find('input.rw-input')
      .tap(c =>
        expect(c.getDOMNode().value).to.equal('hello'));
  })

  it('should respect textField and valueFields', function(){
    mount(
      <Combobox
        defaultValue={0}
        data={dataList}
        textField={ i => i.label }
        valueField='id'
      />
    )
    .find('input.rw-input')
    .tap(c =>
      expect(c.getDOMNode().value).to.equal('jimmy smith'));
  })

  it('should pass NAME down', function(){
    mount(
      <Combobox
        defaultValue={0}
        data={dataList}
        textField='label'
        valueField='id'
        name='hello'
      />
    )
    .find('.rw-input')
    .tap(c =>
        expect(c.getDOMNode().hasAttribute('name')).to.equal(true));
  })


  it('should open when clicked', () => {
    let openSpy = sinon.spy();

    mount(<ControlledCombobox onToggle={openSpy} />)
      .find('button')
      .first()
      .simulate('click')

    expect(openSpy.calledOnce).to.equal(true);
    expect(openSpy.calledWith(true)).to.equal(true);
  })

  it('should not open when clicked while disabled or readOnly', () => {
    let openSpy = sinon.spy();

    mount(<ControlledCombobox onToggle={openSpy} disabled />)
      .find('button')
      .first()
      .simulate('click')

    mount(<ControlledCombobox onToggle={openSpy} readOnly />)
      .find('button')
      .first()
      .simulate('click')

    expect(openSpy.called).to.equal(false);
  })

  it('should start closed', () => {
    let inst = shallow(
      <ControlledCombobox
        value={dataList[0]}
        data={dataList}
        textField='label'
        valueField='id'
      />
    )

    expect(inst.prop('open')).to.not.equal(true)
    expect(inst.find('Popup').prop('open')).to.not.equal(true)

    inst.assertNone('.rw-open')
    inst.assertSingle(`ComboboxInput[aria-expanded=false]`)
  })

  it('should toggle add aria when open', () => {

    let inst = shallow(<ControlledCombobox open />)

    expect(inst.prop('open')).to.equal(true)

    inst.assertSingle('Popup[open]')
    inst.assertSingle('Widget[open]')
    inst.assertSingle('ComboboxInput[aria-expanded]')
  })

  it('should foward props to Popup', () => {
    let props = shallow(<ControlledCombobox open dropUp />  )
      .find('Popup')
      .props()

    expect(props.dropUp).to.equal(true)
    expect(props.open).to.equal(true)
  })

  it('should simulate focus/blur events', function(done){
    let blur = sinon.spy()
    let focus = sinon.spy()

    mount(<Combobox onBlur={blur} onFocus={focus}/>)
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
    let focus = sinon.spy()

    mount(<Combobox disabled onBlur={blur} onFocus={focus}/>)
      .simulate('focus')
      .tap(inst => {
        setTimeout(() => {
          inst.simulate('blur')

          setTimeout(() => {
            expect(focus.called).to.equal(false)
            //expect(blur.called).to.equal(false)
            done()
          })
        })
      });
  })

  it('should simulate key events', function(){
    var kp = sinon.spy()
      , kd = sinon.spy()
      , ku = sinon.spy()

    mount(
      <Combobox
        onKeyPress={kp}
        onKeyUp={ku}
        onKeyDown={kd}
      />
    )
    .simulate('keyPress')
    .simulate('keyDown')
    .simulate('keyUp')

    expect(kp.calledOnce).to.equal(true)
    expect(kd.calledOnce).to.equal(true)
    expect(ku.calledOnce).to.equal(true)
  })

  it('should add correct markup when read-only', () => {
    let input = mount(<ControlledCombobox readOnly />)
      .find('.rw-input')
      .getDOMNode()

    expect(input.hasAttribute('readonly')).to.equal(true);
    expect(input.getAttribute('aria-readonly')).to.equal('true');
  })

  it('should add correct markup when disabled', () => {
    let input = mount(<ControlledCombobox disabled />)
      .find('.rw-input')
      .getDOMNode()

    expect(input.hasAttribute('disabled')).to.equal(true);
    expect(input.getAttribute('aria-disabled')).to.equal('true');
  })


  it('should not simulate form submission', function(){
    let spy = sinon.spy()

    mount(
      <form
        action='/'
        onSubmit={() => {throw new Error('should not submit!')}}
      >
        <Combobox
          data={dataList}
          onKeyDown={spy}
        />
      </form>
    )
    .find('input')
    .simulate('keyDown', { key: 'Enter' })

    expect(spy.calledOnce).to.equal(true);
  })

  it('should set id on list', () =>{
    expect(
      shallow(<ControlledCombobox open />)
        .find('List')
        .prop('id')
      ).to.be.a('string');
  })

  it('should call onChange with event object', () => {
    let change = sinon.spy()

    shallow(
      <ControlledCombobox
        open
        value='bar'
        data={dataList}
        onChange={change}
        onToggle={() =>{}}
      />
    )
    .find('List')
    .simulate('select', null, 'foo')

    expect(change.getCall(0).args[1]).to.eql({
      originalEvent: 'foo',
      lastValue: 'bar',
    })
  })

  it('should call onChange with event object from keyboard', () => {
    let change = sinon.spy()

    mount(
      <ControlledCombobox
        data={dataList}
        value={dataList[0]}
        onChange={change}
        onToggle={() => {}}
      />
    )
    .simulate('keyDown', { key: 'ArrowDown' })

    let bonusArgs = change.getCall(0).args[1];

    expect(bonusArgs.originalEvent.type).to.equal('keydown')
    expect(bonusArgs.lastValue).to.equal(dataList[0])
  })

  it('should call Select handler', function(){
    let change = sinon.spy()
      , onSelect = sinon.spy();

    shallow(
      <ControlledCombobox
        open
        onToggle={() =>{}}
        data={dataList}
        onChange={change}
        onSelect={onSelect}
      />
    )
    .find('List')
    .simulate('select', dataList[1], 'foo')

    expect(onSelect.calledOnce).to.equal(true)
    expect(onSelect.getCall(0).args[1]).to.eql({ originalEvent: 'foo' })

    expect(change.calledAfter(onSelect)).to.equal(true)
  })


  it('should change values on keyDown', function(){
    function assertChangedWithValue(itemIndex) {
      return () => {
        expect(change.calledOnce).to.equal(true)
        expect(change.calledWith(dataList[itemIndex])).to.equal(true)
        change.resetHistory()
      }
    }

    let change = sinon.spy()

    mount(
      <Combobox
        data={dataList}
        onChange={change}
        defaultValue={dataList[0]}
      />
    )
    .simulate('keyDown', { key: 'ArrowDown' })
      .tap(assertChangedWithValue(1))
    .simulate('keyDown', { key: 'ArrowUp' })
      .tap(assertChangedWithValue(0))
  })

  it('should navigate list', function(){
    let change = sinon.spy();

    let inst = mount(
      <Combobox
        defaultOpen
        data={dataList}
        textField='label'
        valueField='id'
        onChange={change}
      />
    )

    expect(inst.find('List li').first().is('.rw-state-focus')).to.equal(true)

    inst.simulate('keyDown', { key: 'ArrowDown' })
    expect(inst.find('List li').at(1).is('.rw-state-focus')).to.equal(true)

    inst.simulate('keyDown', { key: 'ArrowUp' })
    expect(inst.find('List li').first().is('.rw-state-focus')).to.equal(true)

    inst.simulate('keyDown', { key: 'End' })
    expect(inst.find('List li').last().is('.rw-state-focus')).to.equal(true)

    inst.simulate('keyDown', { key: 'Home' })
    expect(inst.find('List li').first().is('.rw-state-focus')).to.equal(true)
  })

  it('should navigate list when filtered', function(){
    let change = sinon.spy();
    let inst = mount(
      <ControlledCombobox
        open={true}
        filter={'contains'}
        data={dataList}
        value='smith'
        textField='label'
        valueField='id'
        onChange={change}
        onToggle={() => {}}
      />
    )

    expect(inst.find('List li').length).to.equal(3)

    expect(inst.find('List li').first().is('.rw-state-focus')).to.equal(true)

    inst.simulate('keyDown', { key: 'ArrowDown' })
    expect(inst.find('List li').at(1).is('.rw-state-focus')).to.equal(true)

    inst.simulate('keyDown', { key: 'ArrowDown' })
    expect(inst.find('List li').at(2).is('.rw-state-focus')).to.equal(true)
  })

  it('should refocus to the first option when the focused option is filtered out', function() {
    let change = sinon.spy();
    let inst = mount(
      <ControlledCombobox
        open={true}
        filter={'contains'}
        data={dataList}
        value='smith'
        minLength={2}
        textField='label'
        valueField='id'
        onChange={change}
        onToggle={() => {}}
      />
    )

    expect(inst.find('List li').length).to.equal(3)

    expect(inst.find('List li').first().is('.rw-state-focus')).to.equal(true)
    expect(inst.state().focusedItem).to.equal(dataList[0])
    inst.setProps({
        value: 'doe',
    })

    expect(inst.find('List li').length).to.equal(1)

    expect(inst.find('List li').first().is('.rw-state-focus')).to.equal(true)
    expect(inst.state().focusedItem).to.equal(dataList[2])
  })

  it('should default focus to the selected value', function() {
    let change = sinon.spy();
    let inst = mount(
      <ControlledCombobox
        open={true}
        data={dataList}
        value={dataList[2]}
        minLength={2}
        textField='label'
        valueField='id'
        onChange={change}
        onToggle={() => {}}
      />
    )

    expect(inst.find('List li').length).to.equal(4)

    expect(inst.find('List li').at(2).is('.rw-state-focus')).to.equal(true)
    expect(inst.state().focusedItem).to.equal(dataList[2])

    inst.simulate('keyDown', { key: 'ArrowDown' })
    expect(inst.find('List li').at(2).is('.rw-state-focus')).to.equal(false)
    expect(inst.find('List li').at(3).is('.rw-state-focus')).to.equal(true)
  })
})
