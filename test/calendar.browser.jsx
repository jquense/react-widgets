import React from 'react'
import ReactDOM from 'react-dom';
import Calendar from '../src/Calendar.jsx'
import Header from '../src/Header.jsx';
import Footer from '../src/Footer.jsx';
import Month  from '../src/Month.jsx';
import Year from '../src/Year.jsx';
import Decade from '../src/Decade.jsx';
import Century from '../src/Century.jsx';
import { directions } from '../src/util/constants';
import dates from '../src/util/dates';
import globalize from 'globalize';
import { transform } from '../src/util/_';
import TestUtils from'react-addons-test-utils';

var render = TestUtils.renderIntoDocument
  , findMultiTag = TestUtils.scryRenderedDOMComponentsWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , trigger = TestUtils.Simulate;

const BaseCalendar = Calendar.ControlledComponent;

describe('Calendar', () => {

  it('should set Initial View', function(){
    var date = new Date()
      , picker = render(<Calendar defaultValue={date} initialView='year'/>);

    expect(() =>
      findType(picker, require('../src/Year.jsx'))).to.not.throwException();
  })

  it('should click up through views', function(){
    var date = new Date()
      , picker = render(<Calendar defaultValue={date} />)
      , header = findType(picker, Header)
      , navBtn = findClass(header, 'rw-btn-view');

    expect(() =>
      findType(picker, Month)).to.not.throwException();

    trigger.click(navBtn)

    expect(() =>
      findType(picker, Year)).to.not.throwException();

    trigger.click(navBtn)

    expect(() =>
      findType(picker, Decade)).to.not.throwException();

    trigger.click(navBtn)

    expect(() =>
      findType(picker, Century)).to.not.throwException();

    expect(navBtn.hasAttribute('disabled')).to.be(true)
  })

  it('should key up through views', function(){
    var date = new Date()
      , picker = render(<Calendar defaultValue={date} />);

    expect(() =>
      findType(picker, Month)).to.not.throwException();

    trigger.keyDown(ReactDOM.findDOMNode(picker), { ctrlKey: true, key: 'ArrowUp' })

    expect(() =>
      findType(picker, Year)).to.not.throwException();

    trigger.keyDown(ReactDOM.findDOMNode(picker), { ctrlKey: true, key: 'ArrowUp' })

    expect(() =>
      findType(picker, Decade)).to.not.throwException();

    trigger.keyDown(ReactDOM.findDOMNode(picker), { ctrlKey: true, key: 'ArrowUp' })

    expect(() =>
      findType(picker, Century)).to.not.throwException();

  })

  it('should navigate into the past', function(){
    var date    = new Date(2014, 5, 15, 0, 0, 0)
      , picker  = render(<Calendar defaultValue={date} />)
      , header  = findType(picker, Header)
      , leftBtn = findClass(header, 'rw-btn-left')
      , navBtn  = findClass(header, 'rw-btn-view');


    trigger.click(leftBtn)

    expect(findType(picker, Month).props.focused.getMonth()).to.be(4);

    trigger.click(navBtn)
    trigger.click(leftBtn)

    expect(findType(picker, Year).props.focused.getFullYear()).to.be(2013);

    trigger.click(navBtn)
    trigger.click(leftBtn)

    expect(findType(picker, Decade).props.focused.getFullYear()).to.be(2003);

    trigger.click(navBtn)
    trigger.click(leftBtn)

    expect(findType(picker, Century).props.focused.getFullYear()).to.be(1903);
  })

  it('should navigate into the future', function(){

    var date     = new Date(2014, 5, 15, 0, 0, 0)
      , picker   = render(<Calendar defaultValue={date} max={new Date(2199, 11, 31)} />)
      , header   = findType(picker, Header)
      , rightBtn = findClass(header, 'rw-btn-right')
      , navBtn   = findClass(header, 'rw-btn-view');

    trigger.click(rightBtn)
    expect(findType(picker, Month).props.focused.getMonth()).to.be(6);

    trigger.click(navBtn)
    trigger.click(rightBtn)

    expect(findType(picker, Year).props.focused.getFullYear()).to.be(2015);

    trigger.click(navBtn)
    trigger.click(rightBtn)

    expect(findType(picker, Decade).props.focused.getFullYear()).to.be(2025);

    trigger.click(navBtn)
    trigger.click(rightBtn)

    expect(findType(picker, Century).props.focused.getFullYear()).to.be(2125);
  })

  it('should have a footer', function(){
    var picker = render(<BaseCalendar/>)
      , footer;

    expect(() => findType(picker, Footer))
      .to.throwException()

    picker = render(<BaseCalendar footer/>)

    expect(() => footer = findType(picker, Footer))
      .to.not.throwException()

    expect($(ReactDOM.findDOMNode(footer)).text())
      .to.equal(
        globalize.format(new Date(), 'D'))
  })

  it('should accept footer format', function(){
    var formatter = sinon.spy((dt, culture) => {
      expect(dt).to.be.a(Date)
      expect(culture).to.be.a('string').and.equal('en')
      return 'test'
    })

    var picker = render(<BaseCalendar footer footerFormat={formatter} culture='en'/>)
      , footer = findType(picker, Footer);

    expect($(ReactDOM.findDOMNode(footer)).text())
      .to.equal('test')

    expect(formatter.calledOnce).to.be.ok()
  })

  it('should navigate to footer date', () => {
    var picker = render(<BaseCalendar footer value={new Date(2013, 5, 15)}/>)
      , footer = findType(picker, Footer);

    trigger.click(
      findClass(footer, 'rw-btn'))

    expect(
      dates.eq(picker.props.currentDate, new Date(), 'day'))
        .to.be.ok()
  })

  it('should constrain movement by min and max', () => {
    var date     = new Date(2014, 5, 15)
      , picker   = render(<Calendar value={date} max={new Date(2014, 5, 25)}  min={new Date(2014, 5, 5)} onChange={()=>{}}/>)
      , header   = findType(picker, Header)
      , rightBtn = findClass(header, 'rw-btn-right')
      , leftBtn  = findClass(header, 'rw-btn-left');


    trigger.click(rightBtn)
    expect(picker.refs.inner.props.currentDate).to.eql(date);

    trigger.click(leftBtn)
    expect(picker.refs.inner.props.currentDate).to.eql(date);

  })

  it('should use passed in culture', function(){
    require('globalize/lib/cultures/globalize.culture.es')

    var date   = new Date(2014, 5, 15)
      , picker = render(<Calendar value={date} culture='es' onChange={()=>{}}/>)
      , headerBtn = findClass(picker, 'rw-btn-view')


    expect($(headerBtn).text()).to.equal('junio 2014')
    expect($(findMultiTag(picker, 'thead')[0].children[0].firstChild).text()).to.equal('lu')

    picker = render(<Calendar initialView='year' value={date} culture='es' onChange={()=>{}}/>)

    expect($(findMultiTag(picker, 'tbody')[0].children[0].firstChild).text())
      .to.equal('ene')
  })

  it('should pass on format', function(){
    var date    = new Date(2014, 5, 15)
      , formats = transform(
            ['dayFormat', 'dateFormat', 'monthFormat', 'yearFormat', 'decadeFormat' ]
          , (o, v) => o[v] = v)
      , calendar;


    calendar = render(<BaseCalendar {...formats} value={date} onChange={()=>{}} />)

    expect(findType(calendar, Month).props.dayFormat).to.equal('dayFormat')
    expect(findType(calendar, Month).props.dateFormat).to.equal('dateFormat')

    calendar = render(<BaseCalendar {...formats} initialView='year' value={date} onChange={()=>{}} />)

    expect(findType(calendar, Year).props.monthFormat).to.equal('monthFormat')

    calendar = render(<BaseCalendar {...formats} initialView='decade' value={date} onChange={()=>{}} />)

    expect(findType(calendar, Decade).props.yearFormat).to.equal('yearFormat')

    calendar = render(<BaseCalendar {...formats} initialView='century' value={date} onChange={()=>{}} />)

    expect(findType(calendar, Century).props.decadeFormat).to.equal('decadeFormat')
  })

  it('should accept a currentDate', function(){
    var currentDate = new Date(2000, 1, 15)
    var calendar = render(<Calendar currentDate={currentDate} onCurrentDateChange={()=>{}}/>)

    expect(() => findType(calendar, Month)).to.not.throwException();

    expect(findType(calendar, Month).props.focused.getFullYear()).to.be(2000);
    expect(findType(calendar, Month).props.focused.getMonth()).to.be(1);
    expect(findType(calendar, Month).props.focused.getDate()).to.be(15);

  })

  describe('Date Helpers', () => {

    it('should move to the proper day', function(){
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

      min = new Date(2014, 0, 11, 0, 0, 0),
      max = new Date(2014, 0, 20, 0, 0, 0)

      expect(dates.move(date, min, max, 'month', directions.UP))
        .to.eql(date)

      expect(dates.move(date, min, max, 'month', directions.DOWN))
        .to.eql(date)
    })

    it('should move to the proper month', function(){
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

      min = new Date(2014, 3, 16, 0, 0, 0),
      max = new Date(2014, 8, 16, 0, 0, 0)

      expect(dates.move(date, min, max, 'year', directions.UP))
        .to.eql(date)

      expect(dates.move(date, min, max, 'year', directions.DOWN))
        .to.eql(date)
    })

    it('should move to the proper year', function(){
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

      min = new Date(2014, 6, 16, 0, 0, 0),
      max = new Date(2016, 6, 16, 0, 0, 0)

      expect(dates.move(date, min, max, 'decade', directions.UP))
        .to.eql(date)

      expect(dates.move(date, min, max, 'decade', directions.DOWN))
        .to.eql(date)
    })

    it('should move to the proper decade', function(){
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

      min = new Date(2045, 6, 16, 0, 0, 0),
      max = new Date(2065, 6, 16, 0, 0, 0)

      expect(dates.move(date, min, max, 'century', directions.UP))
        .to.eql(date)

      expect(dates.move(date, min, max, 'century', directions.DOWN))
        .to.eql(date)
    })
  })
})
