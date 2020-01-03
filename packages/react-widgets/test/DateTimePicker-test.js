import { mount } from 'enzyme'
import React from 'react'
import DateTimePicker from '../src/DateTimePicker'

describe('DateTimePicker', () => {
  it('should set initial values', () => {
    var date = new Date()

    expect(
      mount(
        <DateTimePicker
          defaultValue={date}
          formats={{ datetime: { date: 'short' } }}
        />,
      )
        .find('DateTimePickerInput')
        .getDOMNode().value,
    ).to.equal(date.toLocaleString({ date: 'short' }))
  })

  it('should start closed', () => {
    let inst = mount(<DateTimePicker />)

    expect(inst.find('Popup').prop('open')).to.not.equal(true)

    expect(inst.prop('open')).to.not.equal(true)

    inst.assertNone('.rw-open')
    inst.assertSingle(`DateTimePickerInput[aria-expanded=false]`)
  })

  it('should open when clicked', () => {
    let onOpen = sinon.spy()
    let wrapper = mount(<DateTimePicker onToggle={onOpen} />)

    wrapper
      .find('.rw-select Button')
      .first()
      .simulate('click')

    wrapper
      .find('.rw-select Button')
      .last()
      .simulate('click')

    expect(onOpen.getCalls().length).to.equal(2)
  })

  it('passes default props to calendar', () => {
    let wrapper = mount(
      <DateTimePicker open calendarProps={{ defaultView: 'year' }} />,
    )

    expect(wrapper.find('Calendar').props().defaultView).to.equal('year')
  })

  it('should change when selecting a date', () => {
    let change = sinon.spy()

    mount(<DateTimePicker open onChange={change} onToggle={() => {}} />)
      .find('td.rw-cell')
      .first()
      .simulate('click')

    expect(change.calledOnce).to.equal(true)
  })

  xit('should change when selecting a time', () => {
    let change = sinon.spy(),
      select = sinon.spy()

    mount(
      <DateTimePicker
        open
        onChange={change}
        onSelect={select}
        onToggle={() => {}}
      />,
    )
      .find('li.rw-list-option')
      .first()
      .simulate('click')

    expect(select.calledOnce).to.equal(true)
    expect(change.calledAfter(select)).to.equal(true)
    expect(change.calledOnce).to.equal(true)
  })

  xit('should not show time button when not selected', () => {
    var spy = sinon.spy()

    mount(<DateTimePicker includeTime={false} date={false} onToggle={spy} />)
      .tap(_ => _.assertNone('.rw-btn-time'))
      .tap(_ => _.assertNone('.rw-btn-calendar'))
      .simulate('keyDown', { altKey: true })
      .simulate('keyDown', { altKey: true })

    expect(spy.callCount).to.equal(0)
  })

  it('should simulate focus/blur events', () => {
    let blur = sinon.spy()
    let focus = sinon.spy()

    mount(<DateTimePicker onBlur={blur} onFocus={focus} />)
      .simulateWithTimers('focus')
      .simulateWithTimers('blur')
  })

  it('should simulate key events', () => {
    let kp = sinon.spy(),
      kd = sinon.spy(),
      ku = sinon.spy()

    mount(<DateTimePicker onKeyPress={kp} onKeyUp={ku} onKeyDown={kd} />)
      .find('input.rw-input')
      .simulate('keyPress')
      .simulate('keyDown')
      .simulate('keyUp')

    expect(kp.calledOnce).to.equal(true)
    expect(kd.calledOnce).to.equal(true)
    expect(ku.calledOnce).to.equal(true)
  })

  it('should do nothing when disabled', () => {
    let spy = sinon.spy()
    let wrapper = mount(
      <DateTimePicker defaultValue={new Date()} disabled onToggle={spy} />,
    )

    let input = wrapper.find('input.rw-input').getDOMNode()

    expect(input.hasAttribute('disabled')).to.equal(true)

    wrapper
      .find('.rw-i-calendar')
      .simulate('click')
      .update()

    expect(spy.called).to.equal(false)
  })

  it('should do nothing when readonly', () => {
    let spy = sinon.spy()
    let wrapper = mount(
      <DateTimePicker defaultValue={new Date()} readOnly onToggle={spy} />,
    )

    let input = wrapper.find('input.rw-input').getDOMNode()

    expect(input.hasAttribute('readonly')).to.equal(true)

    wrapper
      .find('.rw-i-calendar')
      .simulate('click')
      .update()

    expect(spy.called).to.equal(false)
  })
})
