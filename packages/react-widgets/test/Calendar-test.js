import React from 'react'
import { mount } from 'enzyme'

import Calendar from '../src/Calendar'

const { move } = Calendar

describe('Calendar', () => {
  let originalTransition

  beforeEach(() => {
    originalTransition = Calendar.Transition
    Calendar.Transition = props => props.children
  })

  afterEach(() => {
    Calendar.Transition = originalTransition
  })

  it('should set default View', () => {
    mount(
      <Calendar defaultValue={new Date()} defaultView="year" />,
    ).assertSingle('YearView')
  })

  it('should click up through views', () => {
    let date = new Date()
    let calendar = mount(<Calendar defaultValue={date} />)

    let navBtn = calendar.find('button.rw-calendar-btn-view')

    calendar.assertSingle('MonthView')

    navBtn.simulate('click')

    calendar.update().assertSingle('YearView')

    navBtn.simulate('click')

    calendar.update().assertSingle('DecadeView')

    navBtn.simulate('click')

    calendar.update().assertSingle('CenturyView')

    expect(navBtn.getDOMNode().hasAttribute('disabled')).to.equal(true)
  })

  it('should key up through views', () => {
    let date = new Date()
    let keys = { ctrlKey: true, key: 'ArrowUp' }

    let wrapper = mount(<Calendar defaultValue={date} />)

    wrapper.assertSingle('MonthView').simulate('keydown', keys)

    wrapper
      .update()
      .assertSingle('YearView')
      .simulate('keydown', keys)

    wrapper
      .update()
      .assertSingle('DecadeView')
      .simulate('keyDown', keys)

    wrapper.update().assertSingle('CenturyView')
  })

  it('should navigate into the past', () => {
    var date = new Date(2014, 5, 15, 0, 0, 0)

    let calendar = mount(<Calendar defaultValue={date} />)

    let leftBtn = calendar.find('button.rw-calendar-btn-left')
    let navBtn = calendar.find('button.rw-calendar-btn-view')

    leftBtn.simulate('click')

    expect(
      calendar
        .update()
        .assertSingle('MonthView')
        .tap(_ => _.prop('value'))
        .prop('focusedItem')
        .getMonth(),
    ).to.equal(4)

    navBtn.simulate('click')
    leftBtn.simulate('click')

    expect(
      calendar
        .update()
        .assertSingle('YearView')
        .prop('focusedItem')
        .getFullYear(),
    ).to.equal(2013)

    navBtn.simulate('click')
    leftBtn.simulate('click')

    expect(
      calendar
        .update()
        .assertSingle('DecadeView')
        .prop('focusedItem')
        .getFullYear(),
    ).to.equal(2003)

    navBtn.simulate('click')
    leftBtn.simulate('click')

    expect(
      calendar
        .update()
        .assertSingle('CenturyView')
        .prop('focusedItem')
        .getFullYear(),
    ).to.equal(1903)
  })

  it('should navigate into the future', () => {
    let date = new Date(2014, 5, 15, 0, 0, 0)
    let calendar = mount(
      <Calendar defaultValue={date} max={new Date(2199, 11, 31)} />,
    )

    let rightBtn = calendar.find('button.rw-calendar-btn-right')
    let navBtn = calendar.find('button.rw-calendar-btn-view')

    rightBtn.simulate('click')

    expect(
      calendar
        .update()
        .assertSingle('MonthView')
        .prop('focusedItem')
        .getMonth(),
    ).to.equal(6)

    navBtn.simulate('click')
    rightBtn.simulate('click')

    expect(
      calendar
        .update()
        .assertSingle('YearView')
        .prop('focusedItem')
        .getFullYear(),
    ).to.equal(2015)

    navBtn.simulate('click')
    rightBtn.simulate('click')

    expect(
      calendar
        .update()
        .assertSingle('DecadeView')
        .prop('focusedItem')
        .getFullYear(),
    ).to.equal(2025)

    navBtn.simulate('click')
    rightBtn.simulate('click')

    expect(
      calendar
        .update()
        .assertSingle('CenturyView')
        .prop('focusedItem')
        .getFullYear(),
    ).to.equal(2125)
  })

  it('should navigate to footer date', () => {
    let changeSpy = sinon.spy()

    mount(<Calendar value={new Date(2013, 5, 15)} onChange={changeSpy} />)
      .find('button.rw-calendar-btn-today')
      .simulate('click')

    expect(changeSpy.calledOnce).to.equal(true)
  })

  it('should constrain movement by min and max', () => {
    let changeSpy = sinon.spy()
    let date = new Date(2014, 5, 15)

    let wrapper = mount(
      <Calendar
        defaultValue={date}
        max={new Date(2014, 5, 25)}
        min={new Date(2014, 5, 5)}
        onCurrentDateChange={changeSpy}
      />,
    )

    wrapper
      .find('button.rw-calendar-btn-right')
      .tap(inst => expect(inst.is('[disabled]')).to.equal(true))
      .simulate('click')

    wrapper
      .find('button.rw-calendar-btn-left')
      .tap(inst => expect(inst.is('[disabled]')).to.equal(true))
      .simulate('click')

    expect(changeSpy.called).to.equal(false)
  })

  it('should accept a currentDate', () => {
    let focused = mount(
      <Calendar
        currentDate={new Date(2000, 1, 15)}
        onCurrentDateChange={() => {}}
      />,
    )
      .assertSingle('MonthView')
      .prop('focusedItem')

    expect(focused.getFullYear()).to.equal(2000)
    expect(focused.getMonth()).to.equal(1)
    expect(focused.getDate()).to.equal(15)
  })

  describe('Date Helpers', () => {
    it('should move to the proper day', () => {
      var date = new Date(2014, 0, 16, 0, 0, 0),
        min,
        max

      expect(move(date, min, max, 'month', 'LEFT').toString()).to.equal(
        new Date(2014, 0, 15, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'month', 'RIGHT').toString()).to.equal(
        new Date(2014, 0, 17, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'month', 'UP').toString()).to.equal(
        new Date(2014, 0, 9, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'month', 'DOWN').toString()).to.equal(
        new Date(2014, 0, 23, 0, 0, 0).toString(),
      )

      min = new Date(2014, 0, 11, 0, 0, 0)
      max = new Date(2014, 0, 20, 0, 0, 0)

      expect(move(date, min, max, 'month', 'UP')).to.eql(date)

      expect(move(date, min, max, 'month', 'DOWN')).to.eql(date)
    })

    it('should move to the proper month', () => {
      var date = new Date(2014, 6, 16, 0, 0, 0),
        min,
        max

      expect(move(date, min, max, 'year', 'LEFT').toString()).to.equal(
        new Date(2014, 5, 16, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'year', 'RIGHT').toString()).to.equal(
        new Date(2014, 7, 16, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'year', 'UP').toString()).to.equal(
        new Date(2014, 2, 16, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'year', 'DOWN').toString()).to.equal(
        new Date(2014, 10, 16, 0, 0, 0).toString(),
      )

      min = new Date(2014, 3, 16, 0, 0, 0)
      max = new Date(2014, 8, 16, 0, 0, 0)

      expect(move(date, min, max, 'year', 'UP')).to.eql(date)

      expect(move(date, min, max, 'year', 'DOWN')).to.eql(date)
    })

    it('should move to the proper year', () => {
      var date = new Date(2015, 6, 16, 0, 0, 0),
        min,
        max

      expect(move(date, min, max, 'decade', 'LEFT').toString()).to.equal(
        new Date(2014, 6, 16, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'decade', 'RIGHT').toString()).to.equal(
        new Date(2016, 6, 16, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'decade', 'UP').toString()).to.equal(
        new Date(2011, 6, 16, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'decade', 'DOWN').toString()).to.equal(
        new Date(2019, 6, 16, 0, 0, 0).toString(),
      )

      min = new Date(2014, 6, 16, 0, 0, 0)
      max = new Date(2016, 6, 16, 0, 0, 0)

      expect(move(date, min, max, 'decade', 'UP')).to.eql(date)

      expect(move(date, min, max, 'decade', 'DOWN')).to.eql(date)
    })

    it('should move to the proper decade', () => {
      var date = new Date(2055, 6, 16, 0, 0, 0),
        min,
        max

      expect(move(date, min, max, 'century', 'LEFT').toString()).to.equal(
        new Date(2045, 6, 16, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'century', 'RIGHT').toString()).to.equal(
        new Date(2065, 6, 16, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'century', 'UP').toString()).to.equal(
        new Date(2015, 6, 16, 0, 0, 0).toString(),
      )

      expect(move(date, min, max, 'century', 'DOWN').toString()).to.equal(
        new Date(2095, 6, 16, 0, 0, 0).toString(),
      )

      min = new Date(2045, 6, 16, 0, 0, 0)
      max = new Date(2065, 6, 16, 0, 0, 0)

      expect(move(date, min, max, 'century', 'UP')).to.eql(date)

      expect(move(date, min, max, 'century', 'DOWN')).to.eql(date)
    })
  })
})
