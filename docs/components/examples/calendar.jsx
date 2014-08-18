var React = require('react/addons')
  , _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function(){
    return {}
  },

  render: function(){
    var Calendar = require('../../../src/calendar/Calendar.jsx')

    return (
      <div className='example'>
        <div className='form-group col-sm-4'>
          <label className=' control-label'>Calendar</label>
          <div>
            <Calendar 

              value={this.state.value || new Date}
              min={new Date(2014, 0, 1)}
              onChange={this._change.bind(null, 'value')}/>
          </div>
        </div>
        <div className='form-group col-sm-4'>
          <label className=' control-label'>Limited depth</label>
          <div>
            <Calendar 
              value={this.state.value || new Date}
              finalView='year'
              onChange={this._change.bind(null, 'value')}/>
          </div>
        </div>
        <div className='form-group col-sm-4'>
          <label className=' control-label'>Calendar</label>
          <div>
            <Calendar 

              value={this.state.value || new Date}
              min={new Date(2014, 0, 1)}
              onChange={this._change.bind(null, 'value')}/>
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