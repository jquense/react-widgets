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

    expect(findType(picker, Month).state.focusedDate.getMonth()).to.be(4);

    trigger.click(navBtn)
    trigger.click(leftBtn)

    expect(findType(picker, Year).state.focusedDate.getFullYear()).to.be(2013);

    trigger.click(navBtn)
    trigger.click(leftBtn)

    expect(findType(picker, Decade).state.focusedDate.getFullYear()).to.be(2003);

    trigger.click(navBtn)
    trigger.click(leftBtn)

    expect(findType(picker, Century).state.focusedDate.getFullYear()).to.be(1903);
  })

  it('should navigate into the future', function(){
    var date     = new Date(2014, 5, 15, 0, 0, 0)
      , picker   = render(<Calendar defaultValue={date} max={new Date(2199,11, 31)} />)
      , header   = findType(picker, Header)
      , rightBtn = findClass(header, 'rw-btn-right').getDOMNode()
      , navBtn   = findClass(header, 'rw-btn-view').getDOMNode();

    syncAnimate()

    trigger.click(rightBtn)

    expect(findType(picker, Month).state.focusedDate.getMonth()).to.be(6);

    trigger.click(navBtn)
    trigger.click(rightBtn)

    expect(findType(picker, Year).state.focusedDate.getFullYear()).to.be(2015);

    trigger.click(navBtn)
    trigger.click(rightBtn)

    expect(findType(picker, Decade).state.focusedDate.getFullYear()).to.be(2025);

    trigger.click(navBtn)
    trigger.click(rightBtn)

    expect(findType(picker, Century).state.focusedDate.getFullYear()).to.be(2125);
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

})


function syncAnimate(){

  return sinon.stub(config, 'animate', function(node, properties, duration, easing, callback){
    typeof easing === 'function' ? easing() : callback()
  })
}
