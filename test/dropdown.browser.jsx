import React from 'react';
import tsp from 'teaspoon';

import DropdownList from '../src/DropdownList.jsx';

let ControlledDropdownList = DropdownList.ControlledComponent;


describe('DROPDOWNS', function(){
  var data = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 }
  ];

  it('should set initial values', function(){
    expect(
      tsp(<ControlledDropdownList value={'hello'} />)
      .render()
      .find(':dom.rw-input')
      .text()
    ).to.be('hello');
  })

  it('should respect textField and valueFields', function(){
    expect(
      tsp(
        <DropdownList
          defaultValue={0}
          data={data}
          textField={i => i.label}
          valueField='id'
        />
      )
      .render()
      .find(':dom.rw-input')
      .text()
    ).to.be('jimmy');
  })

  it('should open when clicked', () => {
    let openSpy = sinon.spy();

    tsp(<ControlledDropdownList onToggle={openSpy} />)
      .render()
      .trigger('click')

    expect(openSpy.calledOnce).to.be(true);
    expect(openSpy.calledWith(true)).to.be(true);
  })

  it('should respect autoFocus', () => {
    expect(
      tsp(<ControlledDropdownList autoFocus />)
        .render(true)
        .dom()
    ).to.equal(document.activeElement);
  })

  it('should not open when clicked while disabled or readOnly', () => {
    let openSpy = sinon.spy();

    tsp(<ControlledDropdownList onToggle={openSpy} disabled />)
      .render()
      .trigger('click')

    tsp(<ControlledDropdownList onToggle={openSpy} readOnly />)
      .render()
      .trigger('click')

    expect(openSpy.called).to.be(false);
  })

  it('should start closed', () => {
    let inst = tsp(
      <ControlledDropdownList
        value={data[0]}
        data={data}
        textField='label'
        valueField='id'
      />
    )
    .shallowRender()

    expect(inst.props('open')).to.not.equal(true)
    expect(inst.find('Popup').props('open')).to.not.equal(true)

    inst.none('.rw-open')
    inst.is(tsp.s`[aria-expanded=${false}]`)
  })

  it('should toggle add aria when open', () => {

    let inst = tsp(<ControlledDropdownList open />).shallowRender()

    expect(inst.props('open')).to.equal(true)

    inst.is('[aria-expanded]')
    inst.single('Popup[open]')
    inst.single('Widget[open]')
  })

  it('should foward props to Popup', () => {
    let props = tsp(<ControlledDropdownList open duration={2} dropUp />  )
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

    tsp(<DropdownList onBlur={blur} onFocus={focus}/>)
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

    tsp(<DropdownList disabled onBlur={blur} onFocus={focus}/>)
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
      <DropdownList
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
    let input = tsp(<ControlledDropdownList readOnly />)
      .render()
      .dom()

    expect(input.getAttribute('aria-readonly')).to.be('true');
  })

  it('should add correct markup when disabled', () => {
    let input = tsp(<ControlledDropdownList disabled />)
      .render()
      .dom()

    expect(input.getAttribute('aria-disabled')).to.be('true');
  })

  it('should use a value template', function(){
    function ValueComponent({ item }) {
      return <span>{'hello - ' + item}</span>;
    }

    expect(
      tsp(
        <DropdownList
          defaultValue={'jimmy'}
          valueComponent={ValueComponent}
        />
      )
      .render()
      .find(':dom.rw-input')
      .text()
    )
    .to.be('hello - jimmy');
  })

  it('should change values on keyDown', function(){
    function assertChangedWithValue(itemIndex) {
      return () => {
        expect(change.calledOnce).to.be(true)
        expect(change.calledWith(data[itemIndex])).to.be(true)
        change.reset()
      }
    }

    let change = sinon.spy()

    tsp(
      <DropdownList
        data={data}
        onChange={change}
        defaultValue={data[0]}
      />
    )
    .render()
    .trigger('keyDown', { key: 'ArrowDown' })
      .tap(assertChangedWithValue(1))
    .trigger('keyDown', { key: 'ArrowUp' })
      .tap(assertChangedWithValue(0))
    .trigger('keyDown', { key: 'End' })
      .tap(assertChangedWithValue(data.length - 1))
    .trigger('keyDown', { key: 'Home' })
      .tap(assertChangedWithValue(0))
  })

  it('should navigate list', function(){
    let change = sinon.spy();

    let inst = tsp(
      <DropdownList
        defaultOpen
        data={data}
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


  it('should search and change values', done => {
    let change = sinon.spy()

    tsp(
      <ControlledDropdownList
        value={data[0]}
        data={data}
        delay={0}
        onChange={change}
        textField='label'
      />
    )
    .render()
    .trigger('keyPress', { which: 80, key: 'p' })

    setTimeout(() => {
      expect(change.calledOnce).to.be(true)
      expect(change.calledWith(data[2])).to.be(true)

      done()
    })
  })

  it('should search values on typing', done => {
    let change = sinon.spy()

    let inst = tsp(
      <ControlledDropdownList
        open
        value={data[0]}
        data={data}
        delay={0}
        onChange={change}
        textField='label'
      />
    )
    .render()
    .trigger('keyPress', { which: 80, key: 'p' })

    setTimeout(() => {
      expect(inst.state('focusedItem')).to.be(data[2])
      done()
    })
  })
})
