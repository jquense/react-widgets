var React = require('react')
  , _ = require('lodash')
  , dates = require('date-arithmetic')
  , Button = require('react-bootstrap/Button')
  , buttonGroup = require('react-bootstrap/ButtonGroup')
  , RW = require('../../../index');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      calendar: true,
      time: true,
      format: 'f',
    }
  },

render: function(){
  var pickerFormat = this.state.time
      ? !this.state.calendar ? 'T' : 'MMM dd, yyyy h:mm tt'
      : 'MMM dd, yyyy'

    return (
      <div className='example'>
        <div className='row'>
          <div className='col-sm-8 demo'>
            <div className='form-group'>
              <RW.DateTimePicker
                value={this.state.value}
                onChange={this._change}
                format={this.state.format}
                max={this.state.max || undefined}
                min={this.state.min || undefined}
                calendar={this.state.calendar}
                time={this.state.time}
                finalView={this.state.finalView}
                initialView={this.state.initialView}
                disabled={this.state.disabled === 'disabled'}
                readOnly={this.state.disabled === 'readonly'}
                onChange={this._change}
                isRtl={this.state.isRtl}/>
            </div>
            <div className='form-group'>
              <label>Custom Rendering</label>
              <RW.DateTimePicker
                value={this.state.value}
                onChange={this._change}
                format={this.state.format}
                max={this.state.max || undefined}
                min={this.state.min || undefined}
                calendar={this.state.calendar}
                time={this.state.time}
                finalView={this.state.finalView}
                initialView={this.state.initialView}
                timeComponent={itemComp}
                disabled={this.state.disabled === 'disabled'}
                readOnly={this.state.disabled === 'readonly'}
                onChange={this._change}
                isRtl={this.state.isRtl}/>
            </div>
            
          </div>
          <div className='col-sm-4 api-panel'>
            <div className='form-group'>
              <label className='checkbox-inline'>
                <input type='checkbox'
                  checked={this.state.isRtl}
                  onChange={_.partial(this._set, 'isRtl', !this.state.isRtl)}/>
                  Right to Left
              </label>
            </div>
            <div className='form-group'>
              <buttonGroup>
                <Button
                  active={this.state.disabled === 'disabled'}
                  onClick={this.disabled}>
                  Disable
                </Button>
                <Button
                  active={this.state.disabled === 'readonly'}
                  onClick={this.readOnly}>
                  Readonly
                </Button>
              </buttonGroup>
            </div>
            <div className='form-group'>
                <Button
                  active={this.state.calendar}
                  onClick={_.partial(this._set, 'calendar', !this.state.calendar)}>
                  Date Picker
                </Button>
                <Button style={{ marginLeft: 10 }}
                  active={this.state.time}
                  onClick={_.partial(this._set, 'time', !this.state.time)}>
                  Time Picker
                </Button>
            </div>
            <div className='form-group'>
              <label className='form-label'>Format</label>
              <RW.Combobox
                  value={this.state.format}
                  data={['MMM dd, yyyy', 'f', 'dd, MMM yyyy HH:mm']}
                  onChange={_.partial(this._set, 'format')}/>
            </div> 
            <div className='form-group'>
              <label className='form-label'>Initial View</label>
              <RW.DropDownlist
                  value={this.state.initialView || 'month'}
                  data={["month", "year", "decade", "century"]}
                  onChange={_.partial(this._set, 'initialView')}/>
            </div>
            <div className='form-group'>
              <label className='form-label'>Final View</label>
              <RW.DropDownlist
                  value={this.state.finalView || 'century'}
                  data={["month", "year", "decade", "century"]}
                  onChange={_.partial(this._set, 'finalView')}/>
            </div>
            <div className='form-group'>
              <label className='form-label'>min</label>
              <RW.DateTimePicker
                  calendar={this.state.calendar}
                  time={this.state.time}
                  format={pickerFormat}
                  value={this.state.min}
                  onChange={_.partial(this._set, 'min')}/>
            </div>
            <div className='form-group'>
              <label className='form-label'>max</label>
              <RW.DateTimePicker
                  calendar={this.state.calendar}
                  time={this.state.time}
                  format={pickerFormat}
                  value={this.state.max}
                  onChange={_.partial(this._set, 'max')}/>
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