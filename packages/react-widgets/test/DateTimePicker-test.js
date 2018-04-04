import React from 'react'
import Globalize from 'globalize'
import { mount, shallow } from 'enzyme'

import DateTimePicker from '../src/DateTimePicker'
import TimeList from '../src/TimeList'
import Calendar from '../src/Calendar'

let ControlledDateTimePicker = DateTimePicker.ControlledComponent

describe('DateTimePicker', () => {
  it('should set initial values', () => {
    var date = new Date()

    expect(
      mount(<DateTimePicker defaultValue={date} format="MM-dd-yyyy" />)
        .find('.rw-input')
        .getDOMNode().value
    ).to.equal(Globalize.format(date, 'MM-dd-yyyy'))
  })

  it('should start closed', () => {
    let inst = shallow(<ControlledDateTimePicker />)

    expect(inst.prop('open')).to.not.equal(true)

    expect(
      inst
        .find('Popup')
        .first()
        .prop('open')
    ).to.not.equal(true)

    inst.assertNone('.rw-open')
    inst.assertSingle(`DateTimePickerInput[aria-expanded=false]`)
  })

  it('should open when clicked', () => {
    var onOpen = sinon.spy()

    let wrapper = shallow(<ControlledDateTimePicker onToggle={onOpen} />)

    wrapper
      .find('Button')
      .first()
      .simulate('click')

    wrapper
      .find('Button')
      .last()
      .simulate('click')

    expect(onOpen.calledTwice).to.equal(true)
  })

  it('passes default props to calendar', () => {
    let wrapper = mount(
      <ControlledDateTimePicker open="date" defaultView="year" />
    )

    expect(wrapper.find(Calendar.ControlledComponent).props().view).to.equal(
      'year'
    )
  })

  it('should change when selecting a date', () => {
    let change = sinon.spy()

    shallow(
      <ControlledDateTimePicker
        open="date"
        onChange={change}
        onToggle={() => {}}
      />
    )
      .assertSingle(Calendar)
      .simulate('change', new Date())

    expect(change.calledOnce).to.equal(true)
  })

  it('should change when selecting a time', () => {
    let change = sinon.spy(),
      select = sinon.spy()

    shallow(
      <ControlledDateTimePicker
        open="date"
        onChange={change}
        onSelect={select}
        onToggle={() => {}}
      />
    )
      .assertSingle(TimeList)
      .simulate('select', { date: new Date() })

    expect(select.calledOnce).to.equal(true)
    expect(change.calledAfter(select)).to.equal(true)
    expect(change.calledOnce).to.equal(true)
  })

  it('should change when selecting a time', () => {
    let change = sinon.spy(),
      select = sinon.spy()

    shallow(
      <ControlledDateTimePicker
        open="date"
        onChange={change}
        onSelect={select}
        onToggle={() => {}}
      />
    )
      .assertSingle(TimeList)
      .simulate('select', { date: new Date() })

    expect(select.calledOnce).to.equal(true)
    expect(change.calledAfter(select)).to.equal(true)
    expect(change.calledOnce).to.equal(true)
  })

  it('should set id on list', () => {
    expect(
      mount(<DateTimePicker />)
        .find('ul')
        .getDOMNode()
        .hasAttribute('id')
    ).to.equal(true)
  })

  it('should not show time button when not selected', () => {
    var spy = sinon.spy()

    mount(<DateTimePicker time={false} date={false} onToggle={spy} />)
      .tap(_ => _.assertNone('.rw-btn-time'))
      .tap(_ => _.assertNone('.rw-btn-calendar'))
      .simulate('keyDown', { altKey: true })
      .simulate('keyDown', { altKey: true })

    expect(spy.callCount).to.equal(0)
  })

  it('should simulate focus/blur events', done => {
    let blur = sinon.spy()
    let focus = sinon.spy()

    let inst = mount(<DateTimePicker onBlur={blur} onFocus={focus} />)

    expect(focus.calledOnce).to.equal(false)
    expect(blur.calledOnce).to.equal(false)

    inst.simulate('focus')

    setTimeout(() => {
      expect(focus.calledOnce).to.equal(true)
      inst.simulate('blur')

      setTimeout(() => {
        expect(blur.calledOnce).to.equal(true)
        done()
      })
    })
  })

  it('should simulate key events', () => {
    let kp = sinon.spy(),
      kd = sinon.spy(),
      ku = sinon.spy()

    mount(<DateTimePicker onKeyPress={kp} onKeyUp={ku} onKeyDown={kd} />)
      .find('.rw-input')
      .simulate('keyPress')
      .simulate('keyDown')
      .simulate('keyUp')

    expect(kp.calledOnce).to.equal(true)
    expect(kd.calledOnce).to.equal(true)
    expect(ku.calledOnce).to.equal(true)
  })

  it('should do nothing when disabled', done => {
    let wrapper = mount(<DateTimePicker defaultValue={new Date()} disabled />)

    let input = wrapper.find('.rw-input').getDOMNode()

    expect(input.hasAttribute('disabled')).to.equal(true)

    wrapper.find('.rw-i-calendar').simulate('click')

    setTimeout(() => {
      expect(wrapper.instance()._values.open).to.not.equal(true)
      done()
    }, 0)
  })

  it('should do nothing when readonly', done => {
    let wrapper = mount(<DateTimePicker defaultValue={new Date()} readOnly />)

    let input = wrapper.find('.rw-input').getDOMNode()

    expect(input.hasAttribute('readonly')).to.equal(true)

    wrapper.find('.rw-i-calendar').simulate('click')

    setTimeout(() => {
      expect(wrapper.instance()._values.open).to.not.equal(true)
      done()
    })
  })

  it('should change values on key down', () => {
    let change = sinon.spy()

    let wrapper = mount(<DateTimePicker onChange={change} />)

    let options = wrapper.find('li').map(n => n.getDOMNode())

    wrapper.simulate('keyDown', { key: 'ArrowDown', altKey: true })

    expect(wrapper.instance()._values.open).to.equal('date')

    wrapper.simulate('keyDown', { key: 'ArrowDown', altKey: true })

    expect(wrapper.instance()._values.open).to.equal('time')

    wrapper.simulate('keyDown', { key: 'Home' })

    expect(options[0].className).to.match(/\brw-state-focus\b/)

    wrapper.simulate('keyDown', { key: 'End' })

    expect(options[options.length - 1].className).to.match(/\brw-state-focus\b/)

    wrapper.simulate('keyDown', { key: 'ArrowUp' })

    expect(options[options.length - 2].className).to.match(/\brw-state-focus\b/)

    wrapper.simulate('keyDown', { key: 'ArrowDown' })

    expect(options[options.length - 1].className).to.match(/\brw-state-focus\b/)
  })

  describe('TimeList', () => {
    it('should render max correctly', () => {
      let date = new Date(2014, 0, 16, 9, 30)
      let inst = mount(
        <TimeList value={new Date(2014, 0, 16, 8)} max={date} preserveDate />
      )

      let dates = inst.state('data')
      let time = dates[dates.length - 1]

      expect(time.date.getHours()).to.eql(9)
      expect(time.date.getMinutes()).to.eql(30)
      expect(time.date.getSeconds()).to.eql(0)

      inst.setProps({ value: new Date(2014, 0, 15, 8) })

      dates = inst.state('data')
      time = dates[dates.length - 1]

      expect(time.date.getHours()).to.eql(23)
      expect(time.date.getMinutes()).to.eql(30)
      expect(time.date.getSeconds()).to.eql(0)
    })

    it('should render min correctly', () => {
      let date = new Date(2014, 0, 16, 9, 30)

      let inst = mount(
        <TimeList value={new Date(2014, 0, 16, 12)} min={date} preserveDate />
      )

      let time = inst.state('data')[0]

      expect(time.date.getHours()).to.eql(9)
      expect(time.date.getMinutes()).to.eql(30)
      expect(time.date.getSeconds()).to.eql(0)

      inst = mount(
        <TimeList value={new Date(2014, 0, 18, 8)} min={date} preserveDate />
      )
      time = inst.state('data')[0]

      expect(time.date.getHours()).to.eql(0)
      expect(time.date.getMinutes()).to.eql(0)
      expect(time.date.getSeconds()).to.eql(0)
    })

    it('should set the step property', () => {
      let dates = mount(<DateTimePicker step={60} />)
        .find(TimeList)
        .instance().state.data

      expect(dates[0].date.getHours()).to.equal(0)
      expect(dates[1].date.getHours()).to.equal(1)
      expect(dates[2].date.getHours()).to.equal(2)

      dates = mount(<DateTimePicker step={120} />)
        .find(TimeList)
        .instance().state.data

      expect(dates[0].date.getHours()).to.equal(0)
      expect(dates[1].date.getHours()).to.equal(2)
      expect(dates[2].date.getHours()).to.equal(4)
    })
  })
})
