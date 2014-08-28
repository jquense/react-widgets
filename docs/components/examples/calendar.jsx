var React = require('react')
  , _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function(){
    return {}
  },

  render: function(){
    var Calendar = require('../../../index').Calendar

    return (
      <div className='example '>
        <div className='row'>
          <div className='form-group col-md-4'>
            <label className=' control-label'>Calendar</label>
            <div>
              <Calendar 
                id='Calendar_1'
                value={this.state.valueA || new Date}
                onChange={this._change.bind(null, 'valueA')}/>
            </div>
          </div>
          <div className='form-group col-md-4'>
            <label className=' control-label'>Min and Max set</label>
            <div>
              <Calendar
                id='Calendar_3'
                value={this.state.valueC || new Date}
                onChange={this._change.bind(null, 'valueC')}
                min={new Date(2014, 0, 1)}
                max={new Date(2015, 2, 15)}/>
            </div>
          </div>
          <div className='form-group col-md-4'>
            <label className=' control-label'>Limited depth</label>
            <div>
              <Calendar 
                id='Calendar_2'
                value={this.state.valueB || new Date}
                finalView='decade'
                initialView='year'
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

          
