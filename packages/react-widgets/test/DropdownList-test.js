import React from 'react'
import { mount, shallow } from 'enzyme'

import DropdownList from '../src/DropdownList'

let ControlledDropdownList = DropdownList.ControlledComponent

describe('DROPDOWNS', function() {
  let data = [
    { label: 'jimmy', id: 0 },
    { label: 'sally', id: 1 },
    { label: 'pat', id: 2 },
  ]

  it('should set initial values', function() {
    expect(
      mount(<ControlledDropdownList value={'hello'} />)
        .find('.rw-input')
        .text()
    ).to.equal('hello')
  })

  it('should respect textField and valueFields', function() {
    expect(
      mount(
        <DropdownList
          defaultValue={0}
          data={data}
          textField={i => i.label}
          valueField="id"
        />
      )
        .find('.rw-input')
        .text()
    ).to.equal('jimmy')
  })

  it('should open when clicked', () => {
    let openSpy = sinon.spy()

    mount(<ControlledDropdownList onToggle={openSpy} />)
      .find('.rw-widget-picker')
      .simulate('click')

    expect(openSpy.calledOnce).to.equal(true)
    expect(openSpy.calledWith(true)).to.equal(true)
  })

  it('should respect autoFocus', () => {
    expect(mount(<ControlledDropdownList autoFocus />).getDOMNode()).to.equal(
      document.activeElement
    )
  })

  it('should not open when clicked while disabled or readOnly', () => {
    let openSpy = sinon.spy()

    mount(<ControlledDropdownList onToggle={openSpy} disabled />).simulate(
      'click'
    )

    mount(<ControlledDropdownList onToggle={openSpy} readOnly />).simulate(
      'click'
    )

    expect(openSpy.called).to.equal(false)
  })

  it('should start closed', () => {
    let inst = shallow(
      <ControlledDropdownList
        value={data[0]}
        data={data}
        textField="label"
        valueField="id"
      />
    )

    expect(inst.prop('open')).to.not.equal(true)
    expect(inst.find('Popup').prop('open')).to.not.equal(true)

    inst.assertNone('.rw-open')
    inst.is(`[aria-expanded=false]`)
  })

  it('should toggle add aria when open', () => {
    let inst = shallow(<ControlledDropdownList open />)

    expect(inst.prop('open')).to.equal(true)

    inst.is('[aria-expanded]')
    inst.assertSingle('Popup[open]')
    inst.assertSingle('Widget[open]')
  })

  it('should foward props to Popup', () => {
    let props = shallow(<ControlledDropdownList open dropUp />)
      .find('Popup')
      .props()

    expect(props.dropUp).to.equal(true)
    expect(props.open).to.equal(true)
  })

  it('should simulate focus/blur events', function(done) {
    let blur = sinon.spy(),
      focus = sinon.spy()

    mount(<DropdownList onBlur={blur} onFocus={focus} />)
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
      })
  })

  it('should not simulate focus/blur events when disabled', function(done) {
    let blur = sinon.spy(),
      focus = sinon.spy()

    mount(<DropdownList disabled onBlur={blur} onFocus={focus} />)
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
      })
  })

  it('should simulate key events', function() {
    let kp = sinon.spy(),
      kd = sinon.spy(),
      ku = sinon.spy()

    mount(<DropdownList onKeyPress={kp} onKeyUp={ku} onKeyDown={kd} />)
      .simulate('keyPress')
      .simulate('keyDown')
      .simulate('keyUp')

    expect(kp.calledOnce).to.equal(true)
    expect(kd.calledOnce).to.equal(true)
    expect(ku.calledOnce).to.equal(true)
  })

  it('should add correct markup when read-only', () => {
    let input = mount(<ControlledDropdownList readOnly />).getDOMNode()

    expect(input.getAttribute('aria-readonly')).to.equal('true')
  })

  it('should add correct markup when disabled', () => {
    let input = mount(<ControlledDropdownList disabled />).getDOMNode()

    expect(input.getAttribute('aria-disabled')).to.equal('true')
  })

  it('should use a value template', function() {
    function ValueComponent({ item }) {
      return <span>{'hello - ' + item}</span>
    }

    expect(
      mount(
        <DropdownList defaultValue={'jimmy'} valueComponent={ValueComponent} />
      )
        .find('.rw-input')
        .text()
    ).to.equal('hello - jimmy')
  })

  it('should call onChange with event object from select', function() {
    let change = sinon.spy()

    mount(
      <ControlledDropdownList
        open
        data={data}
        value={data[0]}
        searchTerm="foooo"
        onChange={change}
        onToggle={() => {}}
      />
    )
      .find('List')
      .prop('onSelect')(null, 'foo')

    expect(change.getCall(0).args[1]).to.eql({
      originalEvent: 'foo',
      lastValue: data[0],
      searchTerm: 'foooo',
    })
  })

  it('should call onChange with event object from keyboard', () => {
    let change = sinon.spy()

    mount(
      <ControlledDropdownList
        data={data}
        value={data[0]}
        onChange={change}
        onToggle={() => {}}
      />
    ).simulate('keyDown', { key: 'ArrowDown' })

    let bonusArgs = change.getCall(0).args[1]

    expect(bonusArgs.originalEvent.type).to.equal('keydown')
    expect(bonusArgs.searchTerm).to.equal('')
    expect(bonusArgs.lastValue).to.equal(data[0])
  })

  it('should call Select handler', function() {
    let change = sinon.spy(),
      onSelect = sinon.spy()

    mount(
      <ControlledDropdownList
        open
        onToggle={() => {}}
        data={data}
        onChange={change}
        onSelect={onSelect}
      />
    )
      .find('List')
      .prop('onSelect')(data[1], 'foo')

    expect(onSelect.calledOnce).to.equal(true)
    expect(onSelect.getCall(0).args[1]).to.eql({ originalEvent: 'foo' })

    expect(change.calledAfter(onSelect)).to.equal(true)
  })

  it('should change values on keyDown', function() {
    function assertChangedWithValue(itemIndex) {
      return () => {
        expect(change.calledOnce).to.equal(true)
        expect(change.calledWith(data[itemIndex])).to.equal(true)
        change.resetHistory()
      }
    }

    let change = sinon.spy()

    mount(<DropdownList data={data} onChange={change} defaultValue={data[0]} />)
      .simulate('keyDown', { key: 'ArrowDown' })
      .tap(assertChangedWithValue(1))
      .simulate('keyDown', { key: 'ArrowUp' })
      .tap(assertChangedWithValue(0))
      .simulate('keyDown', { key: 'End' })
      .tap(assertChangedWithValue(data.length - 1))
      .simulate('keyDown', { key: 'Home' })
      .tap(assertChangedWithValue(0))
  })

  it('should navigate list', function() {
    let change = sinon.spy()

    let inst = mount(
      <DropdownList
        defaultOpen
        data={data}
        textField="label"
        valueField="id"
        onChange={change}
      />
    )

    let listItems = inst.find('List li')

    listItems.first().is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'ArrowDown' })
    listItems.at(1).is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'ArrowUp' })
    listItems.first().is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'End' })
    listItems.last().is('.rw-state-focus')

    inst.simulate('keyDown', { key: 'Home' })
    listItems.first().is('.rw-state-focus')
  })

  it('should search and change values', done => {
    let change = sinon.spy()

    mount(
      <ControlledDropdownList
        value={data[0]}
        data={data}
        delay={0}
        onChange={change}
        textField="label"
      />
    ).simulate('keyPress', { which: 80, key: 'p' })

    setTimeout(() => {
      expect(change.calledOnce).to.equal(true)
      expect(change.calledWith(data[2])).to.equal(true)

      done()
    })
  })

  it('should search values on typing when not filtering', done => {
    let change = sinon.spy()

    let inst = mount(
      <ControlledDropdownList
        open
        delay={0}
        filter={false}
        value={data[0]}
        data={data}
        onChange={change}
        textField="label"
      />
    ).simulate('keyPress', { which: 80, key: 'p' })

    setTimeout(() => {
      expect(inst.state('focusedItem')).to.equal(data[2])
      done()
    }, 10)
  })

  it('should search values on typing when not filtering - back direction', done => {
    let change = sinon.spy()

    let inst = mount(
      <ControlledDropdownList
        open
        delay={0}
        filter={false}
        value={data[2]}
        data={data}
        onChange={change}
        textField="label"
      />
    ).simulate('keyPress', { which: 74, key: 'j' })

    setTimeout(() => {
      expect(inst.state('focusedItem')).to.equal(data[0])
      done()
    }, 10)
  })
})
