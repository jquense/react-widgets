'use strict';
/*global it, describe, expect, sinon, $*/
require('../vendor/phantomjs-shim')

var React = require('react/addons')
  , Calendar = require('../src/Calendar.jsx')
  , BaseCalendar = require('../src/Calendar.jsx').BaseCalendar
  , Header = require('../src/Header.jsx')
  , Footer = require('../src/Footer.jsx')
  , Month  =  require('../src/Month.jsx')
  , Year = require('../src/Year.jsx')
  , Decade = require('../src/Decade.jsx')
  , Century = require('../src/Century.jsx')
  , directions = require('../src/util/constants').directions
  , config = require('../src/util/configuration')
  , dates = require('../src/util/dates')
  , globalize = require('globalize')
  , transform = require('../src/util/_').transform;


var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument
  , findTag = TestUtils.findRenderedDOMComponentWithTag
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , findType = TestUtils.findRenderedComponentWithType
  , trigger = TestUtils.Simulate;



describe('Calendar', () => {

  afterEach(()=> {
    config.animate.restore && 
      config.animate.restore()
  })


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
      , navBtn = findClass(header, 'rw-btn-view').getDOMNode();

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

    trigger.keyDown(picker.getDOMNode(), { ctrlKey: true, key: 'ArrowUp' })

    expect(() => 
      findType(picker, Year)).to.not.throwException();

    trigger.keyDown(picker.getDOMNode(), { ctrlKey: true, key: 'ArrowUp' })

    expect(() => 
      findType(picker, Decade)).to.not.throwException();

    trigger.keyDown(picker.getDOMNode(), { ctrlKey: true, key: 'ArrowUp' })

    expect(() => 
      findType(picker, Century)).to.not.throwException();

  })

  it('should navigate into the past', function(){
    var date    = new Date(2014, 5, 15, 0, 0, 0)
      , picker  = render(<Calendar defaultValue={date} />)
      , header  = findType(picker, Header)
      , leftBtn = findClass(header, 'rw-btn-left').getDOMNode()
      , navBtn  = findClass(header, 'rw-btn-view').getDOMNode();

    syncAnimate()

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
      , picker   = render(<Calendar defaultValue={date} max={new Date(2199,11, 31)} />)
      , header   = findType(picker, Header)
      , rightBtn = findClass(header, 'rw-btn-right').getDOMNode()
      , navBtn   = findClass(header, 'rw-btn-view').getDOMNode();

    syncAnimate()

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

    expect($(footer.getDOMNode()).text())
      .to.equal(
        globalize.format(new Date, 'D'))
  })

  it('should accept footer format', function(){
    var formatter = sinon.spy((dt, culture) => {
      expect(dt).to.be.a(Date)
      expect(culture).to.be.a('string').and.equal('en')
      return 'test'
    })

    var picker = render(<BaseCalendar footer footerFormat={formatter} culture='en'/>)
      , footer = findType(picker, Footer);

    expect($(footer.getDOMNode()).text())
      .to.equal('test')

    expect(formatter.calledOnce).to.be.ok()
  })

  it('should navigate to footer date', () => {
    var picker = render(<BaseCalendar footer value={new Date(2013, 5, 15)}/>)
      , footer = findType(picker, Footer);

    trigger.click(
      findClass(footer, 'rw-btn').getDOMNode())

    expect(
      dates.eq(picker.state.currentDate, new Date(), 'day'))
        .to.be.ok()
  })

  it('should constrain movement by min and max', () => {
    var date     = new Date(2014, 5, 15)
      , picker   = render(<BaseCalendar value={date} max={new Date(2014, 5, 25)}  min={new Date(2014, 5, 5)} onChange={()=>{}}/>)
      , header   = findType(picker, Header)
      , rightBtn = findClass(header, 'rw-btn-right').getDOMNode()
      , leftBtn  = findClass(header, 'rw-btn-left').getDOMNode();

    trigger.click(rightBtn)

    expect(picker.state.currentDate).to.eql(date)

    trigger.click(leftBtn)

    expect(picker.state.currentDate).to.eql(date)

  })

  it('should use passed in culture', function(){
    require('globalize/lib/cultures/globalize.culture.es')

    var date   = new Date(2014, 5, 15)
      , picker = render(<BaseCalendar value={date} culture='es' onChange={()=>{}}/>)
      , headerBtn = findClass(picker, 'rw-btn-view').getDOMNode()
      , head = findTag(picker, 'thead').getDOMNode();
    
    syncAnimate()

    expect($(headerBtn).text()).to.equal('junio 2014')
    expect($(head.children[0].firstChild).text()).to.equal('lu')

    picker.setProps({ initialView: 'year' })

    expect($(findTag(picker, 'tbody').getDOMNode().children[0].firstChild).text())
      .to.equal('ene')
  })

  it('should pass on format', function(){
    var date    = new Date(2014, 5, 15)
      , first   = () => $(calendar.getDOMNode()).find('td:first')
      , formats = transform(
            ['dayFormat', 'dateFormat', 'monthFormat', 'yearFormat', 'decadeFormat' ]
          , (o, v) => o[v] = v)
      , calendar;
    
    syncAnimate()

    calendar = render(<BaseCalendar {...formats} value={date} onChange={()=>{}} />)

    expect(findType(calendar, Month).props.dayFormat).to.equal('dayFormat')
    expect(findType(calendar, Month).props.dateFormat).to.equal('dateFormat')

    calendar.setProps({ initialView: 'year' })

    expect(findType(calendar, Year).props.monthFormat).to.equal('monthFormat')

    calendar.setProps({ initialView: 'decade' })

    expect(findType(calendar, Decade).props.yearFormat).to.equal('yearFormat')

    calendar.setProps({ initialView: 'century' })

    expect(findType(calendar, Century).props.decadeFormat).to.equal('decadeFormat')
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


function syncAnimate(){

  return sinon.stub(config, 'animate', function(node, properties, duration, easing, callback){
    typeof easing === 'function' ? easing() : callback()
  })
}
