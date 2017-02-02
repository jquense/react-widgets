import React from 'react';
import Globalize from 'globalize';
import tsp from 'teaspoon';

import DateTimePicker from '../src/DateTimePicker'
import TimeList from '../src/TimeList'
import Calendar from '../src/Calendar'

let ControlledDateTimePicker = DateTimePicker.ControlledComponent;

describe('DateTimePicker', function(){

  it('should set initial values', function(){
    var date = new Date();

    expect(
      tsp(<DateTimePicker defaultValue={date} format="MM-dd-yyyy"/>)
        .render()
        .find('.rw-input')
        .dom().value
    )
    .to.be(Globalize.format(date, 'MM-dd-yyyy'))
  })

  it('should start closed', () => {

    let inst = tsp(<ControlledDateTimePicker />).shallowRender()

    expect(inst.props('open')).to.not.equal(true)
    expect(inst.find('Popup').props('open')).to.not.equal(true)

    inst.none('.rw-open')
    inst.single(tsp.s`DateTimePickerInput[aria-expanded=${false}]`)
  })

  it('should open when clicked', function(){
    var onOpen = sinon.spy()

    tsp(<ControlledDateTimePicker onToggle={onOpen} />)
      .shallowRender()
      .first('Button')
        .trigger('click')
        .end().end()
      .last('Button')
        .trigger('click');

    expect(onOpen.calledTwice).to.be(true)
  })

  it('should change when selecting a date', function(){
    let change = sinon.spy()

    tsp(
      <ControlledDateTimePicker
        open='date'
        onChange={change}
        onToggle={()=>{}}
      />
    )
    .shallowRender()
    .single(Calendar)
    .trigger('change', new Date());

    expect(change.calledOnce).to.be(true)
  })

  it('should change when selecting a time', function(){
    let change = sinon.spy()
      , select = sinon.spy()

    tsp(
      <ControlledDateTimePicker
        open='date'
        onChange={change}
        onSelect={select}
        onToggle={()=>{}}
      />
    )
    .shallowRender()
    .single(TimeList)
    .trigger('select', { date: new Date() });

    expect(select.calledOnce).to.be(true)
    expect(change.calledAfter(select)).to.be(true)
    expect(change.calledOnce).to.be(true)
  })

  it('should change when selecting a time', function(){
    let change = sinon.spy()
      , select = sinon.spy();

    tsp(
      <ControlledDateTimePicker
        open='date'
        onChange={change}
        onSelect={select}
        onToggle={()=>{}}
      />
    )
    .shallowRender()
    .single(TimeList)
    .trigger('select', { date: new Date() });

    expect(select.calledOnce).to.be(true)
    expect(change.calledAfter(select)).to.be(true)
    expect(change.calledOnce).to.be(true)
  })

  it('should set id on list', function(){
    expect(
      tsp(<DateTimePicker />)
      .render()
      .find('ul').dom()
      .hasAttribute('id')
    ).to.be(true);
  })

  it('should not show time button when not selected', function(){
    var spy = sinon.spy()

    tsp(
      <DateTimePicker time={false} date={false} onToggle={spy }/>
    )
    .render()
    .tap(_ => _.none('.rw-btn-time'))
    .tap(_ => _.none('.rw-btn-calendar'))
    .trigger('keyDown', { altKey: true })
    .trigger('keyDown', { altKey: true })

    expect(spy.callCount).to.be(0)
  })


  it('should trigger focus/blur events', function(done){
    let blur = sinon.spy()
    let focus = sinon.spy()

    let inst = tsp(<DateTimePicker onBlur={blur} onFocus={focus} />).render()

    expect(focus.calledOnce).to.be(false)
    expect(blur.calledOnce).to.be(false)

    inst.trigger('focus')

    setTimeout(() => {
      expect(focus.calledOnce).to.be(true)
      inst.trigger('blur')

      setTimeout(() => {
        expect(blur.calledOnce).to.be(true)
        done()
      })
    })
  })

  it('should trigger key events', function(){
    let kp = sinon.spy()
      , kd = sinon.spy()
      , ku = sinon.spy()

    tsp(
      <DateTimePicker onKeyPress={kp} onKeyUp={ku} onKeyDown={kd}/>
    )
    .render()
    .find('.rw-input')
    .trigger('keyPress')
    .trigger('keyDown')
    .trigger('keyUp')

    expect(kp.calledOnce).to.be(true)
    expect(kd.calledOnce).to.be(true)
    expect(ku.calledOnce).to.be(true)
  })

  it('should do nothing when disabled', function(done){
    let inst = tsp(
      <DateTimePicker defaultValue={new Date()} disabled />
    )
    .render()

    let input = inst.find('.rw-input').dom();

    expect(input.hasAttribute('disabled')).to.be(true);

    inst.find('.rw-i-calendar').trigger('click')

    setTimeout(() => {
      expect(inst.unwrap()._values.open).to.not.be(true)
      done()
    })
  })

  it('should do nothing when readonly', function(done){
    let inst = tsp(
      <DateTimePicker defaultValue={new Date()} readOnly />
    )
    .render()

    let input = inst.find('.rw-input').dom();

    expect(input.hasAttribute('readonly')).to.be(true);

    inst.find('.rw-i-calendar').trigger('click')

    setTimeout(() => {
      expect(inst.unwrap()._values.open).to.not.be(true)
      done()
    })
  })

  it('should change values on key down', function(){
    let change = sinon.spy()

    let inst = tsp(
      <DateTimePicker onChange={change} />
    )
    .render()

    let options = inst.find('li').dom()

    inst.trigger('keyDown', { key: 'ArrowDown', altKey: true })

    expect(inst.unwrap()._values.open).to.be('date')

    inst.trigger('keyDown', { key: 'ArrowDown', altKey: true })

    expect(inst.unwrap()._values.open).to.be('time')

    inst.trigger('keyDown', { key: 'Home' })

    expect(options[0].className)
      .to.match(/\brw-state-focus\b/)

    inst.trigger('keyDown', { key: 'End' })

    expect(options[options.length - 1].className)
      .to.match(/\brw-state-focus\b/)

    inst.trigger('keyDown', { key: 'ArrowUp' })

    expect(options[options.length - 2].className)
      .to.match(/\brw-state-focus\b/)

    inst.trigger('keyDown', { key: 'ArrowDown' })

    expect(options[options.length - 1].className)
      .to.match(/\brw-state-focus\b/)
  })


  describe('TimeList', function(){

    it('should render max correctly', ()=>{
      let date = new Date(2014, 0, 16, 9, 30)
      let inst = tsp(
        <TimeList
          value={new Date(2014, 0, 16, 8)}
          max={date}
          preserveDate
        />
      ).render()

      let dates = inst.state('dates');
      let time = dates[dates.length - 1]

      expect(time.date.getHours()).to.eql(9)
      expect(time.date.getMinutes()).to.eql(30)
      expect(time.date.getSeconds()).to.eql(0)

      inst.props('value', new Date(2014, 0, 15, 8))

      dates = inst.state('dates');
      time = dates[dates.length - 1]

      expect(time.date.getHours()).to.eql(23)
      expect(time.date.getMinutes()).to.eql(30)
      expect(time.date.getSeconds()).to.eql(0)
    })

    it('should render min correctly', ()=>{
      let date = new Date(2014, 0, 16, 9, 30)

      let inst = tsp(
        <TimeList value={new Date(2014, 0, 16, 12)} min={date} preserveDate />
      )
      .render()

      let time = inst.state('dates')[0];

      expect(time.date.getHours()).to.eql(9)
      expect(time.date.getMinutes()).to.eql(30)
      expect(time.date.getSeconds()).to.eql(0)

      inst = tsp(<TimeList value={new Date(2014, 0, 18, 8)} min={date} preserveDate />).render()
      time = inst.state('dates')[0];

      expect(time.date.getHours()).to.eql(0)
      expect(time.date.getMinutes()).to.eql(0)
      expect(time.date.getSeconds()).to.eql(0)
    })


    it('should set the step property', ()=>{
      let dates = tsp(<DateTimePicker step={60} />)
        .render()
        .find(TimeList)
        .state('dates')

      expect(dates[0].date.getHours()).to.equal(0)
      expect(dates[1].date.getHours()).to.equal(1)
      expect(dates[2].date.getHours()).to.equal(2)

      dates = tsp(<DateTimePicker step={120} />)
        .render()
        .find(TimeList)
        .state('dates')

      expect(dates[0].date.getHours()).to.equal(0)
      expect(dates[1].date.getHours()).to.equal(2)
      expect(dates[2].date.getHours()).to.equal(4)
    })
  })

})
