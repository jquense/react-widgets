var React = require('react/addons')
  , _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function(){
    return {}
  },

  render: function(){
    var NumberPicker = require('../../../src/pickers/numberpicker.jsx')

      
    return (
      <div className='example form-horizontal'>
        <div className='form-group'>
          <label className='col-sm-4 control-label'>Number Picker</label>
          <div className='col-sm-5'>
            <NumberPicker 
              value={this.state.valueA || 1}
              onChange={this._change.bind(null, 'valueA')}
              min={2}
              max={10}/>
          </div>
        </div>
        <div className='form-group'>
          <label className='col-sm-4 control-label'>Currency</label>
          <div className='col-sm-5'>
            <NumberPicker 
              value={this.state.valueB || 1}
              onChange={this._change.bind(null, 'valueB')}
              format='c'
              step={1.5}/>
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