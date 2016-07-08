import React from 'react';
import tsp from 'teaspoon';

import Combobox from '../src/Combobox.jsx';

let ControlledCombobox = Combobox.ControlledComponent;

describe('Combobox', function(){
  var dataList = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 }
  ];

  it('should set initial values', function(){
    tsp(<Combobox value={'hello'} onChange={()=>{}} />)
      .render()
      .find('input.rw-input')
      .tap(c =>
        expect(c.dom().value).to.be('hello'));
  })

  it('should respect textField and valueFields', function(){
    tsp(
      <Combobox
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
    tsp(
      <Combobox
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


  it('should open when clicked', () => {
    let openSpy = sinon.spy();

    tsp(<ControlledCombobox onToggle={openSpy} />)
      .render()
      .first('button')
      .trigger('click')

    expect(openSpy.calledOnce).to.be(true);
    expect(openSpy.calledWith(true)).to.be(true);
  })

  it('should not open when clicked while disabled or readOnly', () => {
    let openSpy = sinon.spy();

    tsp(<ControlledCombobox onToggle={openSpy} disabled />)
      .render()
      .first('button')
      .trigger('click')

    tsp(<ControlledCombobox onToggle={openSpy} readOnly />)
      .render()
      .first('button')
      .trigger('click')

    expect(openSpy.called).to.be(false);
  })

  it('should start closed', () => {
    let inst = tsp(
      <ControlledCombobox
        value={dataList[0]}
        data={dataList}
        textField='label'
        valueField='id'
      />
    )
    .shallowRender()

    expect(inst.props('open')).to.not.equal(true)
    expect(inst.find('Popup').props('open')).to.not.equal(true)

    inst.none('.rw-open')
    inst.single(tsp.s`ComboboxInput[aria-expanded=${false}]`)
  })

  it('should toggle add aria when open', () => {

    let inst = tsp(<ControlledCombobox open />).shallowRender()

    expect(inst.props('open')).to.equal(true)

    inst.single('Popup[open]')
    inst.single('Widget[open]')
    inst.single('ComboboxInput[aria-expanded]')
  })

  it('should foward props to Popup', () => {
    let props = tsp(<ControlledCombobox open duration={2} dropUp />  )
      .shallowRender()
      .find('Popup')
      .props()

    expect(props.dropUp).to.equal(true)
    expect(props.open).to.equal(true)
    expect(props.duration).to.equal(2)
  })

  it('should trigger focus/blur events', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()

    tsp(<Combobox onBlur={blur} onFocus={focus}/>)
      .render()
      .trigger('focus')
      .tap(inst => {
        setTimeout(() => {
          inst.trigger('blur')

          setTimeout(() => {
            expect(focus.calledOnce).to.be(true)
            expect(blur.calledOnce).to.be(true)
            done()
          })
        })
      });
  })

  it('should not trigger focus/blur events when disabled', function(done){
    var blur = sinon.spy()
      , focus = sinon.spy()

    tsp(<Combobox disabled onBlur={blur} onFocus={focus}/>)
      .render()
      .trigger('focus')
      .tap(inst => {
        setTimeout(() => {
          inst.trigger('blur')

          setTimeout(() => {
            expect(focus.called).to.be(false)
            expect(blur.called).to.be(false)
            done()
          })
        })
      });
  })

  it('should trigger key events', function(){
    var kp = sinon.spy()
      , kd = sinon.spy()
      , ku = sinon.spy()

    tsp(
      <Combobox
        onKeyPress={kp}
        onKeyUp={ku}
        onKeyDown={kd}
      />
    )
    .render()
    .trigger('keyPress')
    .trigger('keyDown')
    .trigger('keyUp')

    expect(kp.calledOnce).to.be(true)
    expect(kd.calledOnce).to.be(true)
    expect(ku.calledOnce).to.be(true)
  })

  it('should add correct markup when read-only', () => {
    let input = tsp(<ControlledCombobox readOnly />)
      .render()
      .find('.rw-input')
      .dom()

    expect(input.hasAttribute('readonly')).to.be(true);
    expect(input.getAttribute('aria-readonly')).to.be('true');
  })

  it('should add correct markup when disabled', () => {
    let input = tsp(<ControlledCombobox disabled />)
      .render()
      .find('.rw-input')
      .dom()

    expect(input.hasAttribute('disabled')).to.be(true);
    expect(input.getAttribute('aria-disabled')).to.be('true');
  })


  it('should not trigger form submission', function(){
    let spy = sinon.spy()

    tsp(
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
    .render()
    .find('input')
      .trigger('keyDown', { key: 'Enter' })

    expect(spy.calledOnce).to.equal(true);
  })

  it('should set id on list', () =>{
    expect(
      tsp(<ControlledCombobox open />)
        .shallowRender()
        .find('List')
        .props('id')
      ).to.be.a('string');
  })

  it('should call Select handler', function(){
    let change = sinon.spy()
      , onSelect = sinon.spy();

    tsp(
      <ControlledCombobox
        open
        onToggle={() =>{}}
        data={dataList}
        onChange={change}
        onSelect={onSelect}
      />
    )
    .shallowRender()
    .find('List')
      .trigger('select', dataList[1])

    expect(onSelect.calledOnce).to.be(true)
    expect(change.calledAfter(onSelect)).to.be(true)
  })


  it('should change values on keyDown', function(){
    function assertChangedWithValue(itemIndex) {
      return () => {
        expect(change.calledOnce).to.be(true)
        expect(change.calledWith(dataList[itemIndex])).to.be(true)
        change.reset()
      }
    }

    let change = sinon.spy()

    tsp(
      <Combobox
        data={dataList}
        onChange={change}
        defaultValue={dataList[0]}
      />
    )
    .render()
    .trigger('keyDown', { key: 'ArrowDown' })
      .tap(assertChangedWithValue(1))
    .trigger('keyDown', { key: 'ArrowUp' })
      .tap(assertChangedWithValue(0))
    .trigger('keyDown', { key: 'End' })
      .tap(assertChangedWithValue(dataList.length - 1))
    .trigger('keyDown', { key: 'Home' })
      .tap(assertChangedWithValue(0))
  })

  it('should navigate list', function(){
    let change = sinon.spy();

    let inst = tsp(
      <Combobox
        defaultOpen
        data={dataList}
        textField='label'
        valueField='id'
        onChange={change}
      />
    )
    .render()

    let listItems = inst.find('List').children();

    listItems.first().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'ArrowDown' })
    listItems.nth(1).is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'ArrowUp' })
    listItems.first().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'End' })
    listItems.last().is('.rw-state-focus')

    inst.trigger('keyDown', { key: 'Home' })
    listItems.first().is('.rw-state-focus')
  })
})
