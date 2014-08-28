var React = require('react')
  , _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function(){
    return {}
  },

  render: function(){
    var Combobox = require('../../../index').Combobox
      , list = [
        { label: 'orange', id: 1 },
        { label: 'blue', id: 2 },
        { label: 'red', id: 3 },
      ]

    return (
      <div className='example form-horizontal'>
        <div className='form-group'>
          <label className='col-sm-4 control-label'>Combobox</label>
          <div className='col-sm-5'>
            <Combobox 
              data={list}
              value={this.state.valueA || list[0]}
              onChange={this._change.bind(null, 'valueA')}
              textField='label'
              valueField='id'/>
          </div>
        </div>
        <div className='form-group'>
          <label className='col-sm-4 control-label'>Suggestions</label>
          <div className='col-sm-5'>
            <Combobox 
              data={list}
              value={this.state.valueB || list[0]}
              onChange={this._change.bind(null, 'valueB')}
              suggest={true}
              textField='label'
              valueField='id'/>
          </div>
        </div>
        <div className='form-group'>
          <label className='col-sm-4 control-label'>Filter</label>
          <div className='col-sm-5'>
            <Combobox 
              data={list}
              suggest={false}
              filter='startsWith'
              value={this.state.valueC || list[0]}
              onChange={this._change.bind(null, 'valueC')}
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