var React = require('react/addons')
  , _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function(){
    return {}
  },

  render: function(){
    var Select = require('../../../src/select/select.jsx')
      , list = [
        { label: 'orange', id: 1 },
        { label: 'blue', id: 2 },
        { label: 'red', id: 3 },
        { label: 'purple', id: 4 },
        { label: 'green', id: 5 },
      ]

    return (
      <div className='example form-horizontal'>
        <div className='form-group'>
          <label className='col-sm-4 control-label'>Select</label>
          <div className='col-sm-5'>
            <Select 
              data={list}
              value={this.state.valueA || [list[0]]}
              onChange={this._change.bind(null, 'valueA')}
              textField='label'
              valueField='id'/>
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