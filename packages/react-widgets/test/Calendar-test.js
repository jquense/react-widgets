import transform from 'lodash/transform';
import React from 'react'
import tsp from 'teaspoon';

import Calendar from '../src/Calendar'
import Footer from '../src/Footer';
import Month  from '../src/Month';
import Year from '../src/Year';
import Decade from '../src/Decade';
import Century from '../src/Century';
import { directions } from '../src/util/constants';
import dates from '../src/util/dates';
import globalize from 'globalize';


const BaseCalendar = Calendar.ControlledComponent;

describe('Calendar', () => {

  it('should set default View', () => {
    tsp(
      <Calendar
        defaultValue={new Date()}
        defaultView='year'
      />
    )
    .render()
    .single(Year);
  })

  it('should click up through views', () => {
    let date = new Date()
    let calendar = tsp(<Calendar defaultValue={date} />).render()

    let navBtn = calendar.find('button.rw-calendar-btn-view')

    calendar.single(Month);

    navBtn.trigger('click');

    calendar.single(Year);

    navBtn.trigger('click');

    calendar.single(Decade);

    navBtn.trigger('click');

    calendar.single(Century);

    expect(navBtn.dom().hasAttribute('disabled')).to.be(true)
  })

  it('should key up through views', () => {
    let date = new Date()
    let keys = { ctrlKey: true, key: 'ArrowUp' };

    tsp(<Calendar defaultValue={date} />).render()
      .single(Month)
      .end()
      .trigger('keyDown', keys)
        .single(Year)
        .end()
      .trigger('keyDown', keys)
        .single(Decade)
        .end()
      .trigger('keyDown', keys)
        .single(Century);
  })

  it('should navigate into the past', () => {
    var date= new Date(2014, 5, 15, 0, 0, 0)

    let calendar = tsp(<Calendar defaultValue={date} />).render()

    let leftBtn = calendar.find('button.rw-calendar-btn-left')
    let navBtn = calendar.find('button.rw-calendar-btn-view')

    leftBtn.trigger('click');

    expect(
      calendar
        .single(Month).props('focused')
        .getMonth()
    ).to.be(4);

    navBtn.trigger('click');
    leftBtn.trigger('click');

    expect(
      calendar
        .single(Year).props('focused')
        .getFullYear()
    ).to.be(2013);

    navBtn.trigger('click');
    leftBtn.trigger('click');

    expect(
      calendar
        .single(Decade).props('focused')
        .getFullYear()
    ).to.be(2003);

    navBtn.trigger('click');
    leftBtn.trigger('click');

    expect(
      calendar
        .single(Century).props('focused')
        .getFullYear()
    ).to.be(1903);

  })

  it('should navigate into the future', () => {
    let date = new Date(2014, 5, 15, 0, 0, 0)
    let calendar = tsp(
      <Calendar defaultValue={date}  max={new Date(2199, 11, 31)} />
    )
    .render()

    let rightBtn = calendar.find('button.rw-calendar-btn-right')
    let navBtn = calendar.find('button.rw-calendar-btn-view')

    rightBtn.trigger('click');

    expect(
      calendar
        .single(Month).props('focused')
        .getMonth()
    ).to.be(6);

    navBtn.trigger('click');
    rightBtn.trigger('click');

    expect(
      calendar
        .single(Year).props('focused')
        .getFullYear()
    ).to.be(2015);

    navBtn.trigger('click');
    rightBtn.trigger('click');

    expect(
      calendar
        .single(Decade).props('focused')
        .getFullYear()
    ).to.be(2025);

    navBtn.trigger('click');
    rightBtn.trigger('click');

    expect(
      calendar
        .single(Century).props('focused')
        .getFullYear()
    ).to.be(2125);
  })

  it('should have a footer', () => {
    tsp(<BaseCalendar footer={false} />)
      .shallowRender()
      .none(Footer)
        .end()
      .props('footer', true)
      .single(Footer);

  })

  it('should display date in footer', () => {
    expect(
      tsp(<BaseCalendar />)
        .render()
        .single(Footer)
        .text()
    )
    .to.equal(globalize.format(new Date(), 'D'));
  })

  it('should accept footer format', () => {
    let formatter = sinon.spy((dt, culture) => {
      expect(dt).to.be.a(Date)
      expect(culture).to.be.a('string').and.equal('en')
      return 'test'
    })

    expect(
      tsp(<BaseCalendar footerFormat={formatter} culture='en'/>)
        .render()
        .single(Footer)
        .text()
    )
    .to.equal('test')

    expect(formatter.calledOnce).to.be.ok()
  })

  it('should navigate to footer date', () => {
    let changeSpy = sinon.spy();

    tsp(
      <BaseCalendar
        value={new Date(2013, 5, 15)}
        onChange={changeSpy}
      />
    )
    .shallowRender()
    .find(Footer)
    .trigger('click')

    expect(
      changeSpy.calledOnce
    )
    .to.equal(true)
  })

  it('should constrain movement by min and max', () => {
    let changeSpy = sinon.spy();
    let date = new Date(2014, 5, 15);

    tsp(
      <Calendar
        defaultValue={date}
        max={new Date(2014, 5, 25)}
        min={new Date(2014, 5, 5)}
        onCurrentDateChange={changeSpy}
      />
    )
    .render()
    .find('.rw-calendar-btn-right')
      .tap(inst => inst.is('[disabled]'))
      .trigger('click')
      .end()
    .find('.rw-calendar-btn-left')
      .tap(inst => inst.is('[disabled]'))
      .trigger('click')

    expect(changeSpy.called).to.equal(false)

  })

  it('should use passed in culture', () => {
    require('globalize/lib/cultures/globalize.culture.es')

    let date = new Date(2014, 5, 15)
    let calendar = tsp(
      <Calendar value={date} culture='es' onChange={()=>{}} />
    )
    .render()

    expect(
      calendar.find('button.rw-calendar-btn-view').text()
    ).to.equal('junio 2014')

    expect(
      calendar.first('thead th').text()
    ).to.equal('lu')

    calendar = tsp(
      <Calendar defaultView='year' value={date} culture='es' onChange={()=>{}} />
    )
    .render()

    expect(
      calendar.first('tbody td').text()
    )
    .to.equal('ene')
  })

  it('should pass on format', () => {
    let date = new Date(2014, 5, 15)
    let formats = transform(
      ['dayFormat', 'dateFormat', 'monthFormat', 'yearFormat', 'decadeFormat' ],
      (o, v) => o[v] = v,
      {}
    )

    let calendar = tsp(
      <Calendar
        {...formats}
        value={date}
        onChange={()=>{}}
        onViewChange={()=>{}}
      />
    )
    .render()

    expect(
      calendar.single(Month).props('dayFormat')
    )
    .to.be('dayFormat');

    expect(
      calendar.single(Month).props('dateFormat')
    )
    .to.be('dateFormat');

    calendar.props('view', 'year')

    expect(
      calendar.single(Year).props('monthFormat')
    )
    .to.be('monthFormat');

    calendar.props('view', 'decade')

    expect(
      calendar.single(Decade).props('yearFormat')
    )
    .to.be('yearFormat');

    calendar.props('view', 'century')

    expect(
      calendar.single(Century).props('decadeFormat')
    )
    .to.be('decadeFormat');
  })

  it('should accept a currentDate', () => {
    let focused = tsp(
      <Calendar
        currentDate={new Date(2000, 1, 15)}
        onCurrentDateChange={()=>{}}
      />
    )
    .render()
    .single(Month)
    .props('focused')

    expect(focused.getFullYear()).to.be(2000);
    expect(focused.getMonth()).to.be(1);
    expect(focused.getDate()).to.be(15);

  })

  describe('Date Helpers', () => {

    it('should move to the proper day', () => {
      var date = new Date(2014, 0, 16, 0, 0, 0)
        , min, max;

      expect(dates.move(date, min, max, 'month', directions.LEFT).toString())
        .to.equal((new Date(2014, 0, 15, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'month', directions.RIGHT).toString())
        .to.equal((new Date(2014, 0, 17, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'month', directions.UP).toString())
        .to.equal((new Date(2014, 0, 9, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'month', directions.DOWN).toString())
        .to.equal((new Date(2014, 0, 23, 0, 0, 0)).toString())

      min = new Date(2014, 0, 11, 0, 0, 0)
      max = new Date(2014, 0, 20, 0, 0, 0)

      expect(dates.move(date, min, max, 'month', directions.UP))
        .to.eql(date)

      expect(dates.move(date, min, max, 'month', directions.DOWN))
        .to.eql(date)
    })

    it('should move to the proper month', () => {
      var date = new Date(2014, 6, 16, 0, 0, 0)
        , min, max;

      expect(dates.move(date, min, max, 'year', directions.LEFT).toString())
        .to.equal((new Date(2014, 5, 16, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'year', directions.RIGHT).toString())
        .to.equal((new Date(2014, 7, 16, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'year', directions.UP).toString())
        .to.equal((new Date(2014, 2, 16, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'year', directions.DOWN).toString())
        .to.equal((new Date(2014, 10, 16, 0, 0, 0)).toString())

      min = new Date(2014, 3, 16, 0, 0, 0)
      max = new Date(2014, 8, 16, 0, 0, 0)

      expect(dates.move(date, min, max, 'year', directions.UP))
        .to.eql(date)

      expect(dates.move(date, min, max, 'year', directions.DOWN))
        .to.eql(date)
    })

    it('should move to the proper year', () => {
      var date = new Date(2015, 6, 16, 0, 0, 0)
        , min, max;

      expect(dates.move(date, min, max, 'decade', directions.LEFT).toString())
        .to.equal((new Date(2014, 6, 16, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'decade', directions.RIGHT).toString())
        .to.equal((new Date(2016, 6, 16, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'decade', directions.UP).toString())
        .to.equal((new Date(2011, 6, 16, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'decade', directions.DOWN).toString())
        .to.equal((new Date(2019, 6, 16, 0, 0, 0)).toString())

      min = new Date(2014, 6, 16, 0, 0, 0)
      max = new Date(2016, 6, 16, 0, 0, 0)

      expect(dates.move(date, min, max, 'decade', directions.UP))
        .to.eql(date)

      expect(dates.move(date, min, max, 'decade', directions.DOWN))
        .to.eql(date)
    })

    it('should move to the proper decade', () => {
      var date = new Date(2055, 6, 16, 0, 0, 0)
        , min, max;

      expect(dates.move(date, min, max, 'century', directions.LEFT).toString())
        .to.equal((new Date(2045, 6, 16, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'century', directions.RIGHT).toString())
        .to.equal((new Date(2065, 6, 16, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'century', directions.UP).toString())
        .to.equal((new Date(2015, 6, 16, 0, 0, 0)).toString())

      expect(dates.move(date, min, max, 'century', directions.DOWN).toString())
        .to.equal((new Date(2095, 6, 16, 0, 0, 0)).toString())

      min = new Date(2045, 6, 16, 0, 0, 0)
      max = new Date(2065, 6, 16, 0, 0, 0)

      expect(dates.move(date, min, max, 'century', directions.UP))
        .to.eql(date)

      expect(dates.move(date, min, max, 'century', directions.DOWN))
        .to.eql(date)
    })
  })
})
