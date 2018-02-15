import transform from 'lodash/transform';
import React from 'react'
import { mount, shallow } from 'enzyme';

import Calendar from '../src/Calendar'
import Footer from '../src/Footer';
import Month  from '../src/Month';
import Year from '../src/Year';
import Decade from '../src/Decade';
import Century from '../src/Century';
import globalize from 'globalize';


const BaseCalendar = Calendar.ControlledComponent;



describe('Calendar', () => {
  let originalTransition;

  beforeEach(() => {
    originalTransition = BaseCalendar.Transition;
    BaseCalendar.Transition = (props) => props.children;
  })

  afterEach(() => {
    BaseCalendar.Transition = originalTransition
  })

  it('should set default View', () => {
    mount(
      <Calendar
        defaultValue={new Date()}
        defaultView='year'
      />
    )
    .assertSingle(Year);
  })

  it('should click up through views', () => {
    let date = new Date()
    let calendar = mount(<Calendar defaultValue={date} />)

    let navBtn = calendar.find('button.rw-calendar-btn-view')

    calendar.assertSingle(Month);

    navBtn.simulate('click');

    calendar.assertSingle(Year);

    navBtn.simulate('click');

    calendar.assertSingle(Decade);

    navBtn.simulate('click');

    calendar.assertSingle(Century);

    expect(navBtn.getDOMNode().hasAttribute('disabled')).to.equal(true)
  })

  it('should key up through views', () => {
    let date = new Date()
    let keys = { ctrlKey: true, key: 'ArrowUp' };

    let wrapper = mount(<Calendar defaultValue={date} />)

    wrapper.assertSingle(Month)

    wrapper.simulate('keyDown', keys)
        .assertSingle(Year)

    wrapper.simulate('keyDown', keys)
      .assertSingle(Decade)

    wrapper.simulate('keyDown', keys)
        .assertSingle(Century);
  })

  it('should navigate into the past', () => {
    var date= new Date(2014, 5, 15, 0, 0, 0)

    let calendar = mount(<Calendar defaultValue={date} />)

    let leftBtn = calendar.find('button.rw-calendar-btn-left')
    let navBtn = calendar.find('button.rw-calendar-btn-view')

    leftBtn.simulate('click');

    expect(
      calendar
        .assertSingle(Month).prop('focused')
        .getMonth()
    ).to.equal(4);

    navBtn.simulate('click');
    leftBtn.simulate('click');

    expect(
      calendar
        .assertSingle(Year).prop('focused')
        .getFullYear()
    ).to.equal(2013);

    navBtn.simulate('click');
    leftBtn.simulate('click');

    expect(
      calendar
        .assertSingle(Decade).prop('focused')
        .getFullYear()
    ).to.equal(2003);

    navBtn.simulate('click');
    leftBtn.simulate('click');

    expect(
      calendar
        .assertSingle(Century).prop('focused')
        .getFullYear()
    ).to.equal(1903);

  })

  it('should navigate into the future', () => {
    let date = new Date(2014, 5, 15, 0, 0, 0)
    let calendar = mount(
      <Calendar defaultValue={date}  max={new Date(2199, 11, 31)} />
    )

    let rightBtn = calendar.find('button.rw-calendar-btn-right')
    let navBtn = calendar.find('button.rw-calendar-btn-view')

    rightBtn.simulate('click');

    expect(
      calendar
        .assertSingle(Month).prop('focused')
        .getMonth()
    ).to.equal(6);

    navBtn.simulate('click');
    rightBtn.simulate('click');

    expect(
      calendar
        .assertSingle(Year).prop('focused')
        .getFullYear()
    ).to.equal(2015);

    navBtn.simulate('click');
    rightBtn.simulate('click');

    expect(
      calendar
        .assertSingle(Decade).prop('focused')
        .getFullYear()
    ).to.equal(2025);

    navBtn.simulate('click');
    rightBtn.simulate('click');

    expect(
      calendar
        .assertSingle(Century).prop('focused')
        .getFullYear()
    ).to.equal(2125);
  })

  it('should have a footer', () => {
    let wrapper = shallow(<BaseCalendar footer={false} />)

    wrapper.assertNone(Footer)

    wrapper
      .setProps({ footer: true })
      .assertSingle(Footer);

  })

  it('should display date in footer', () => {
    expect(
      mount(<BaseCalendar />)
        .assertSingle(Footer)
        .text()
    )
    .to.equal(globalize.format(new Date(), 'D'));
  })

  it('should accept footer format', () => {
    let formatter = sinon.spy((dt, culture) => {
      expect(dt).to.be.a('Date')
      expect(culture).to.be.a('string').and.equal('en')
      return 'test'
    })

    expect(
      mount(<BaseCalendar footerFormat={formatter} culture='en'/>)
        .assertSingle(Footer)
        .text()
    )
    .to.equal('test')

    expect(formatter.called).to.equal(true)
  })

  it('should navigate to footer date', () => {
    let changeSpy = sinon.spy();

    mount(
      <BaseCalendar
        value={new Date(2013, 5, 15)}
        onChange={changeSpy}
      />
    )
    .find(Footer)
    .find('button')
    .simulate('click')

    expect(
      changeSpy.calledOnce
    )
    .to.equal(true)
  })

  it('should constrain movement by min and max', () => {
    let changeSpy = sinon.spy();
    let date = new Date(2014, 5, 15);

    let wrapper = mount(
      <Calendar
        defaultValue={date}
        max={new Date(2014, 5, 25)}
        min={new Date(2014, 5, 5)}
        onCurrentDateChange={changeSpy}
      />
    )

    wrapper
      .find('button.rw-calendar-btn-right')
      .tap(inst => inst.is('[disabled]'))
      .simulate('click')

    wrapper
      .find('button.rw-calendar-btn-left')
      .tap(inst => inst.is('[disabled]'))
      .simulate('click')

    expect(changeSpy.called).to.equal(false)

  })

  it('should use passed in culture', () => {
    require('globalize/lib/cultures/globalize.culture.es')

    let date = new Date(2014, 5, 15)
    let calendar = mount(
      <Calendar value={date} culture='es' onChange={()=>{}} />
    )

    expect(
      calendar.find('button.rw-calendar-btn-view').contains('junio 2014')
    ).to.equal(true)

    expect(
      calendar.first('thead th').contains('lu')
    ).to.equal(true)

    calendar = mount(
      <Calendar defaultView='year' value={date} culture='es' onChange={()=>{}} />
    )

    expect(
      calendar.first('tbody td').contains('ene')
    )
    .to.equal(true)
  })

  it('should pass on format', () => {
    let date = new Date(2014, 5, 15)
    let formats = transform(
      ['dayFormat', 'dateFormat', 'monthFormat', 'yearFormat', 'decadeFormat' ],
      (o, v) => o[v] = v,
      {}
    )

    let calendar = mount(
      <Calendar
        {...formats}
        value={date}
        onChange={()=>{}}
        onViewChange={()=>{}}
      />
    )

    expect(
      calendar.assertSingle(Month).prop('dayFormat')
    )
    .to.equal('dayFormat');

    expect(
      calendar.assertSingle(Month).prop('dateFormat')
    )
    .to.equal('dateFormat');

    calendar.setProps({ view: 'year' })

    expect(
      calendar.assertSingle(Year).prop('monthFormat')
    )
    .to.equal('monthFormat');

    calendar.setProps({view: 'decade' })

    expect(
      calendar.assertSingle(Decade).prop('yearFormat')
    )
    .to.equal('yearFormat');

    calendar.setProps({view: 'century' })

    expect(
      calendar.assertSingle(Century).prop('decadeFormat')
    )
    .to.equal('decadeFormat');
  })

  it('should accept a currentDate', () => {
    let focused = mount(
      <Calendar
        currentDate={new Date(2000, 1, 15)}
        onCurrentDateChange={()=>{}}
      />
    )
    .assertSingle(Month)
    .prop('focused')

    expect(focused.getFullYear()).to.equal(2000);
    expect(focused.getMonth()).to.equal(1);
    expect(focused.getDate()).to.equal(15);

  })

  describe('Date Helpers', () => {

    it('should move to the proper day', () => {
      var date = new Date(2014, 0, 16, 0, 0, 0)
        , min, max;

      expect(BaseCalendar.move(date, min, max, 'month', 'LEFT').toString())
        .to.equal((new Date(2014, 0, 15, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'month', 'RIGHT').toString())
        .to.equal((new Date(2014, 0, 17, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'month', 'UP').toString())
        .to.equal((new Date(2014, 0, 9, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'month', 'DOWN').toString())
        .to.equal((new Date(2014, 0, 23, 0, 0, 0)).toString())

      min = new Date(2014, 0, 11, 0, 0, 0)
      max = new Date(2014, 0, 20, 0, 0, 0)

      expect(BaseCalendar.move(date, min, max, 'month', 'UP'))
        .to.eql(date)

      expect(BaseCalendar.move(date, min, max, 'month', 'DOWN'))
        .to.eql(date)
    })

    it('should move to the proper month', () => {
      var date = new Date(2014, 6, 16, 0, 0, 0)
        , min, max;

      expect(BaseCalendar.move(date, min, max, 'year', 'LEFT').toString())
        .to.equal((new Date(2014, 5, 16, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'year', 'RIGHT').toString())
        .to.equal((new Date(2014, 7, 16, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'year', 'UP').toString())
        .to.equal((new Date(2014, 2, 16, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'year', 'DOWN').toString())
        .to.equal((new Date(2014, 10, 16, 0, 0, 0)).toString())

      min = new Date(2014, 3, 16, 0, 0, 0)
      max = new Date(2014, 8, 16, 0, 0, 0)

      expect(BaseCalendar.move(date, min, max, 'year', 'UP'))
        .to.eql(date)

      expect(BaseCalendar.move(date, min, max, 'year', 'DOWN'))
        .to.eql(date)
    })

    it('should move to the proper year', () => {
      var date = new Date(2015, 6, 16, 0, 0, 0)
        , min, max;

      expect(BaseCalendar.move(date, min, max, 'decade', 'LEFT').toString())
        .to.equal((new Date(2014, 6, 16, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'decade', 'RIGHT').toString())
        .to.equal((new Date(2016, 6, 16, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'decade', 'UP').toString())
        .to.equal((new Date(2011, 6, 16, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'decade', 'DOWN').toString())
        .to.equal((new Date(2019, 6, 16, 0, 0, 0)).toString())

      min = new Date(2014, 6, 16, 0, 0, 0)
      max = new Date(2016, 6, 16, 0, 0, 0)

      expect(BaseCalendar.move(date, min, max, 'decade', 'UP'))
        .to.eql(date)

      expect(BaseCalendar.move(date, min, max, 'decade', 'DOWN'))
        .to.eql(date)
    })

    it('should move to the proper decade', () => {
      var date = new Date(2055, 6, 16, 0, 0, 0)
        , min, max;

      expect(BaseCalendar.move(date, min, max, 'century', 'LEFT').toString())
        .to.equal((new Date(2045, 6, 16, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'century', 'RIGHT').toString())
        .to.equal((new Date(2065, 6, 16, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'century', 'UP').toString())
        .to.equal((new Date(2015, 6, 16, 0, 0, 0)).toString())

      expect(BaseCalendar.move(date, min, max, 'century', 'DOWN').toString())
        .to.equal((new Date(2095, 6, 16, 0, 0, 0)).toString())

      min = new Date(2045, 6, 16, 0, 0, 0)
      max = new Date(2065, 6, 16, 0, 0, 0)

      expect(BaseCalendar.move(date, min, max, 'century', 'UP'))
        .to.eql(date)

      expect(BaseCalendar.move(date, min, max, 'century', 'DOWN'))
        .to.eql(date)
    })
  })
})
