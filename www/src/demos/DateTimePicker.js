import React from 'react';
import dates from 'date-arithmetic';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import * as RW from 'react-widgets';

import Demo, { createSetter } from '../components/Demo';
import Layout from '../components/Layout';
import { CULTURES, VIEWS } from './Calendar';

let getType = (date, time) => date && time ? 'datetime' : date ? 'date' : 'time';

let getFormat = (date, time, type = 'short') => ({
  [getType(date, time)]: type
})

const formats = [
  {
    value: { datetime: 'medium' },
    text: 'date & time "medium"' },
  {
    value: { date: 'full' },
    text: 'date "full"' },
  {
    value: { time: 'short' },
    text: 'time: "short"' },
  {
    value: 'MMM-dd-yyyy',
    text: '"MMM-dd-yyyy"' },
]


export default class DateTimePickerDemo extends React.Component {
  state = {
    date: true,
    time: true,
    format: formats[0],
    views: VIEWS,
  }

  render() {
    const {
        isRtl, min, max, views, format, culture
      , disabled, readOnly, time, date } = this.state;

    let minMaxFormat = getFormat(date, time)

    let setter = createSetter(this)

    let props = {
      ...this.state,
      max: max || undefined,
      min: min || undefined,
      format: format.value
    }

    return (
      <Demo shortcuts={this.props.shortcuts}>
        <Demo.Stage>
          <div className='form-group'>
            <RW.DateTimePicker defaultValue={new Date()} {...props}/>
          </div>
          <div className='form-group'>
            <label className='control-label'>Custom Rendering</label>
            <RW.DateTimePicker {...props} timeComponent={itemComp}/>
          </div>
        </Demo.Stage>
        <Demo.Controls>
          <Layout>
            <Demo.Control>
              <ButtonGroup>
                <Button
                  active={disabled}
                  onClick={setter('disabled', !disabled)}
                >
                  Disable
                </Button>
                <Button
                  active={readOnly}
                  onClick={setter('readOnly', !readOnly)}
                >
                  Readonly
                </Button>
              </ButtonGroup>
            </Demo.Control>
            <Demo.Control>
              <Checkbox
                checked={date}
                onChange={setter('date', !date)}
              >
                date
              </Checkbox>
            </Demo.Control>
            <Demo.Control>
              <Checkbox
                checked={time}
                onChange={setter('time', !time)}
              >
                time
              </Checkbox>
            </Demo.Control>
          </Layout>

          <Layout>
            <Demo.Control label='culture' flex>
              <RW.DropdownList
                filter={false}
                value={culture || CULTURES[0]}
                data={CULTURES}
                onChange={setter('culture')}
              />
            </Demo.Control>
            <Demo.Control flex={2} label="format">
              <RW.DropdownList
                filter={false}
                value={format}
                data={formats}
                textField="text"
                onChange={setter('format')}
              />
            </Demo.Control>
          </Layout>

          <Layout>
            <Demo.Control label="min" >
              <RW.DateTimePicker
                value={min}
                time={time}
                culture={culture}
                date={date}
                format={minMaxFormat}
                onChange={setter('min')}
              />
            </Demo.Control>
            <Demo.Control label="max">
              <RW.DateTimePicker
                value={max}
                time={time}
                culture={culture}
                date={date}
                format={minMaxFormat}
                onChange={setter('max')}
              />
            </Demo.Control>
          </Layout>


          <Demo.Control label="allowed calendar views">
            <RW.Multiselect
              value={views.length ? views : ['month']}
              data={VIEWS}
              disabled={!date}
              onChange={(views) => setter('views')(
                VIEWS.filter(v => ~views.indexOf(v) // correct order
              ))}
            />
          </Demo.Control>

          <Layout justify="flex-start">
            <Demo.Control>
              <Checkbox
                checked={!!isRtl}
                onChange={setter('isRtl', !isRtl)}
              >
                right-to-left
              </Checkbox>
            </Demo.Control>
          </Layout>
        </Demo.Controls>
    </Demo>
    )
  }
}


class itemComp extends React.Component {
  render() {
    var date   = merge(new Date, this.props.item.date)
      , inPast = dates.lt(date, new Date, 'minutes')

    return (
      <div className={inPast ? 'overdue' : ''}>
        <i className={'fa fa-' + (inPast ? 'history' : 'clock')}></i>
        { '  ' + this.props.item.label}
      </div>
    );
  }
}


function merge(date, time){
  if( time == null && date == null)
    return null

  if( time == null) time = new Date
  if( date == null) date = new Date

  date = dates.startOf(date, 'day')
  date = dates.hours(date,        dates.hours(time))
  date = dates.minutes(date,      dates.minutes(time))
  date = dates.seconds(date,      dates.seconds(time))
  return dates.milliseconds(date, dates.milliseconds(time))
}
