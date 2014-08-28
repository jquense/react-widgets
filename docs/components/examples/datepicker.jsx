var React = require('react')
  , _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function(){
    return {}
  },

  render: function(){
    var DatePicker = require('../../../index').DateTimePicker

    return (
      <div className='example '>
        <div className='row'>
          <div className='form-group col-sm-4'>
            <label className=' control-label'>Date and Time</label>
            <div>
              <DatePicker 
                id='DatePicker_1'
                value={this.state.valueA || new Date}
                onChange={this._change.bind(null, 'valueA')}/>
            </div>
          </div>
          <div className='form-group col-sm-4'>
            <label className=' control-label'>Date</label>
            <div>
              <DatePicker
                id='DatePicker_3'
                time={false}
                format='MMM dd yyyy'
                value={this.state.valueC || new Date}
                onChange={this._change.bind(null, 'valueC')}
                min={new Date(2014, 0, 1)}
                max={new Date(2015, 2, 15)}/>
            </div>
          </div>
          <div className='form-group col-sm-4'>
            <label className=' control-label'>Time</label>
            <div>
              <DatePicker 
                id='DatePicker_2'
                format='H:mm tt'
                value={this.state.valueB || new Date}
                calendar={false}
                onChange={this._change.bind(null, 'valueB')}/>
            </div>
          </div>
        </div>
      </div>
    )
  },

  _change: function(key, value){
    var state = {}
    state[key] = value
    this.setState(state)
  }

})

          