import { mount } from 'enzyme'
import React from 'react'
import Combobox from '../src/Combobox'

describe('Combobox', function() {
  var dataList = [
    { label: 'jimmy smith', id: 0 },
    { label: 'sally smith', id: 1 },
    { label: 'pat doe', id: 2 },
    { label: 'suzy smith', id: 3 },
  ]

  it('should set initial values', function() {
    mount(<Combobox value={'hello'} onChange={() => {}} />)
      .find('input.rw-input')
      .tap(c => expect(c.getDOMNode().value).to.equal('hello'))
  })

  it('should respect textField and dataKeys', function() {
    mount(
      <Combobox
        defaultValue={0}
        data={dataList}
        textField={i => i.label}
        dataKey="id"
      />,
    )
      .find('input.rw-input')
      .tap(c => expect(c.getDOMNode().value).to.equal('jimmy smith'))
  })

  it('should pass NAME down', function() {
    mount(
      <Combobox
        defaultValue={0}
        data={dataList}
        textField="label"
        dataKey="id"
        name="hello"
      />,
    )
      .find('.rw-input')
      .tap(c => expect(c.getDOMNode().hasAttribute('name')).to.equal(true))
  })

  it('should open when clicked', () => {
    let openSpy = sinon.spy()

    mount(<Combobox onToggle={openSpy} />)
      .find('button')
      .first()
      .simulate('click')

    expect(openSpy.calledOnce).to.equal(true)
    expect(openSpy.calledWith(true)).to.equal(true)
  })

  it('should not open when clicked while disabled or readOnly', () => {
    let openSpy = sinon.spy()

    mount(<Combobox onToggle={openSpy} disabled />)
      .find('button')
      .first()
      .simulate('click')

    mount(<Combobox onToggle={openSpy} readOnly />)
      .find('button')
      .first()
      .simulate('click')

    expect(openSpy.called).to.equal(false)
  })

  it('should start closed', () => {
    let inst = mount(
      <Combobox
        value={dataList[0]}
        data={dataList}
        textField="label"
        dataKey="id"
      />,
    )

    expect(inst.prop('open')).to.not.equal(true)
    expect(inst.find('Popup').prop('open')).to.not.equal(true)

    inst.assertNone('.rw-open')
    inst.assertSingle(`input[aria-expanded=false]`)
  })

  it('should toggle add aria when open', () => {
    let inst = mount(<Combobox open />)

    expect(inst.prop('open')).to.equal(true)

    inst.assertSingle('Popup[open]')
    inst.assertSingle('Widget[open]')
    inst.assertSingle('input[aria-expanded]')
  })

  it('should foward props to Popup', () => {
    let props = mount(<Combobox open dropUp />)
      .find('Popup')
      .props()

    expect(props.dropUp).to.equal(true)
    expect(props.open).to.equal(true)
  })

  it('should simulate focus/blur events', () => {
    let blur = sinon.spy()
    let focus = sinon.spy()

    mount(<Combobox onBlur={blur} onFocus={focus} />)
      .simulateWithTimers('focus')
      .simulateWithTimers('blur')

    expect(focus.calledOnce).to.equal(true)
    expect(blur.calledOnce).to.equal(true)
  })

  it('should not simulate focus/blur events when disabled', () => {
    let blur = sinon.spy()
    let focus = sinon.spy()

    mount(<Combobox disabled onBlur={blur} onFocus={focus} />)
      .simulateWithTimers('focus')
      .simulateWithTimers('blur')

    expect(focus.called).to.equal(false)
    //expect(blur.called).to.equal(false)
  })

  it('should simulate key events', function() {
    var kp = sinon.spy(),
      kd = sinon.spy(),
      ku = sinon.spy()

    mount(<Combobox onKeyPress={kp} onKeyUp={ku} onKeyDown={kd} />)
      .simulate('keyPress')
      .simulate('keyDown')
      .simulate('keyUp')

    expect(kp.calledOnce).to.equal(true)
    expect(kd.calledOnce).to.equal(true)
    expect(ku.calledOnce).to.equal(true)
  })

  it('should add correct markup when read-only', () => {
    let input = mount(<Combobox readOnly />)
      .find('.rw-input')
      .getDOMNode()

    expect(input.hasAttribute('readonly')).to.equal(true)
    expect(input.getAttribute('aria-readonly')).to.equal('true')
  })

  it('should add correct markup when disabled', () => {
    let input = mount(<Combobox disabled />)
      .find('.rw-input')
      .getDOMNode()

    expect(input.hasAttribute('disabled')).to.equal(true)
    expect(input.getAttribute('aria-disabled')).to.equal('true')
  })

  it('should not simulate form submission', function() {
    let spy = sinon.spy()

    mount(
      <form
        action="/"
        onSubmit={() => {
          throw new Error('should not submit!')
        }}
      >
        <Combobox data={dataList} onKeyDown={spy} />
      </form>,
    )
      .find('input')
      .simulate('keyDown', { key: 'Enter' })

    expect(spy.calledOnce).to.equal(true)
  })

  it('should set id on list', () => {
    expect(
      mount(<Combobox open />)
        .find('List')
        .prop('id'),
    ).to.be.a('string')
  })

  it('should call onChange with event object', () => {
    let change = sinon.spy()

    mount(
      <Combobox
        open
        value="bar"
        data={dataList}
        onChange={change}
        onToggle={() => {}}
      />,
    )
      .find('List')
      .act(_ => _.prop('onChange')(null, { originalEvent: 'foo' }))

    expect(change.getCall(0).args[1]).to.eql({
      originalEvent: 'foo',
      lastValue: 'bar',
    })
  })

  it('should call Select handler', function() {
    let change = sinon.spy(),
      onSelect = sinon.spy()

    mount(
      <Combobox
        open
        onToggle={() => {}}
        data={dataList}
        onChange={change}
        onSelect={onSelect}
      />,
    )
      .find('List')
      .act(_ => _.prop('onChange')(dataList[1], { originalEvent: 'foo' }))

    expect(onSelect.calledOnce).to.equal(true)
    expect(onSelect.getCall(0).args[1]).to.eql({ originalEvent: 'foo' })

    expect(change.calledAfter(onSelect)).to.equal(true)
  })

  it('should navigate list', function() {
    let change = sinon.spy()

    let inst = mount(
      <Combobox
        defaultOpen
        data={dataList}
        textField="label"
        dataKey="id"
        onChange={change}
      />,
    )

    let listItems = () => inst.update().find('ListOption > div')

    inst.simulate('keyDown', { key: 'ArrowDown' })
    listItems()
      .first()
      .is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'ArrowDown' })
    expect(
      listItems()
        .at(1)
        .is('.rw-state-focus'),
    ).to.equal(true)

    inst.simulate('keyDown', { key: 'ArrowUp' })
    expect(
      listItems()
        .first()
        .is('.rw-state-focus'),
    ).to.equal(true)

    inst.simulate('keyDown', { key: 'End' })
    expect(
      listItems()
        .last()
        .is('.rw-state-focus'),
    ).to.equal(true)

    inst.simulate('keyDown', { key: 'Home' })
    expect(
      listItems()
        .first()
        .is('.rw-state-focus'),
    ).to.equal(true)
  })

  it('should default focus to the selected value', function() {
    let change = sinon.spy()
    let inst = mount(
      <Combobox
        open={true}
        data={dataList}
        value={dataList[2]}
        minLength={2}
        textField="label"
        dataKey="id"
        onChange={change}
        onToggle={() => {}}
      />,
    )

    expect(inst.find('ListOption > div').length).to.equal(4)

    expect(
      inst
        .find('ListOption > div')
        .at(2)
        .is('.rw-state-focus'),
    ).to.equal(true)

    inst.simulate('keyDown', { key: 'ArrowDown' })

    expect(
      inst
        .update()
        .find('ListOption > div')
        .at(2)
        .is('.rw-state-focus'),
    ).to.equal(false)

    expect(
      inst
        .update()
        .find('ListOption > div')
        .at(3)
        .is('.rw-state-focus'),
    ).to.equal(true)
  })
})
