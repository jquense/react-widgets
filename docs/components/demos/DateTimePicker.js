'use strict';
var React = require('react')
  , dates = require('date-arithmetic')
var Button      = require('react-bootstrap/lib/Button')
var ButtonGroup = require('react-bootstrap/lib/ButtonGroup')
  , RW = require('../../../src/index');

require('globalize/lib/cultures/globalize.culture.en-GB');
require('globalize/lib/cultures/globalize.culture.es');
require('globalize/lib/cultures/globalize.culture.fr');
require('globalize/lib/cultures/globalize.culture.ar-AE');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      calendar: true,
      time: true,
      format: 'f'
    }
  },

  render: function(){
    var props;

    let cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE'];

    let format = this.state.time && this.state.calendar
      ? 'MM/dd/yyyy h:mm tt'
      : this.state.time ? 't' : 'd'

    props = {
      format: this.state.format,
      max: this.state.max || undefined,
      min: this.state.min || undefined,
      culture: this.state.culture,
      calendar: this.state.calendar,
      time: this.state.time,
      finalView: this.state.finalView,
      initialView: this.state.initialView,
      disabled: this.state.disabled === 'disabled',
      readOnly: this.state.disabled === 'readonly',
      isRtl: !!this.state.isRtl
    }


    return (
      <div className='example' role='application'>
        <div className='row'>
          <div className='col-md-6 demo'>
            <div className='form-group'>
              <RW.DateTimePicker defaultValue={new Date()} {...props}/>
            </div>
            <div className='form-group'>
              <label>Custom Rendering</label>
              <RW.DateTimePicker {...props} timeComponent={itemComp}/>
            </div>
          </div>
          <div className='col-md-6 api-panel'>
            <div className="row">
              <div className='form-group col-xs-6'>
                <label className='control-label'>{' '}</label>
                <div className='checkbox'>
                  <label>
                    <input type='checkbox'
                      checked={!!this.state.isRtl}
                      onChange={this._set.bind(null, 'isRtl', !this.state.isRtl)}
                    />
                    Right to Left
                  </label>
                </div>
              </div>
              <div className='form-group col-xs-6'>
                <label className='control-label'>culture</label>
                <RW.DropdownList
                    value={this.state.culture || cultures[0]}
                    data={cultures}
                    onChange={this._set.bind(null, 'culture')}/>
              </div>
            </div>
            <div className="row">
              <div className='form-group col-xs-7'>
                <ButtonGroup>
                  <Button active={this.state.disabled === 'disabled'} onClick={this.disabled}>
                    Disable
                  </Button>
                  <Button active={this.state.disabled === 'readonly'} onClick={this.readOnly}>
                    Readonly
                  </Button>
                </ButtonGroup>
              </div>
              <div className='form-group col-xs-5'>
                  <Button
                    active={this.state.calendar}
                    onClick={this._set.bind(null, 'calendar', !this.state.calendar)}>
                    Date
                  </Button>
                  <Button style={{ marginLeft: 10 }}
                    active={this.state.time}
                    onClick={this._set.bind(null, 'time', !this.state.time)}>
                    Time
                  </Button>
              </div>
            </div>

            <div className="row">
              <div className='form-group col-xs-4 col-md-12 col-lg-4'>
                <label className='form-label'>Format</label>
                <RW.Combobox
                    value={this.state.format}
                    data={['MMM dd, yyyy', 'f', 'dd, MMM yyyy HH:mm']}
                    onChange={this._set.bind(null, 'format')}/>
              </div>
              <div className='form-group col-xs-4 col-md-6 col-lg-4'>
                <label className='form-label'>Initial View</label>
                <RW.DropdownList
                    value={this.state.initialView || 'month'}
                    data={["month", "year", "decade", "century"]}
                    onChange={this._set.bind(null, 'initialView')}/>
              </div>
              <div className='form-group col-xs-4 col-md-6 col-lg-4'>
                <label className='form-label'>Final View</label>
                <RW.DropdownList
                    value={this.state.finalView || 'century'}
                    data={["month", "year", "decade", "century"]}
                    onChange={this._set.bind(null, 'finalView')}/>
              </div>
            </div>
            <div className="row">
              <div className='form-group col-xs-6'>
                <label className='control-label'>min</label>
                <RW.DateTimePicker
                    time={this.state.time} calendar={this.state.calendar}
                    format={format}
                    value={this.state.min}
                    onChange={this._set.bind(null, 'min')}/>
              </div>
              <div className='form-group col-xs-6'>
                <label className='control-label'>max</label>
                <RW.DateTimePicker
                    time={this.state.time} calendar={this.state.calendar}
                    format={format}
                    value={this.state.max}
                    onChange={this._set.bind(null, 'max')}/>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  },

  _change: function(val){
    this.setState({ value: val })
  },

  _set: function(field, value){
    var obj = {}
    obj[field] = value
    this.setState(obj)
  },

  readOnly: function(){
    var val = this.state.disabled === 'readonly' ? false : 'readonly'
    this.setState({ disabled: val })
  },

  disabled: function(){
    var val = this.state.disabled === 'disabled' ? false : 'disabled'
    this.setState({ disabled: val })
  },
})


var itemComp = React.createClass({
  render: function() {
    var date   = merge(new Date, this.props.item.date)
      , inPast = dates.lt(date, new Date, 'minutes')

    return (
      <div className={inPast ? 'overdue' : ''}>
        <i className={'fa fa-' + (inPast ? 'history' : 'clock')}></i>
        { '  ' + this.props.item.label}
      </div>
    );
  }
});


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
