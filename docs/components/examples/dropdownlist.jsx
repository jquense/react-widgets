var React = require('react')
  , TabbedArea = require('react-bootstrap/TabbedArea')
  , TabPane   = require('react-bootstrap/TabPane')
  , _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function(){
    return { value: 1 }
  },

  render: function(){
    var DropdownList = require('../../../index').DropDownlist
      , DropdownApi = require('./dropdown-api.jsx')
      , list = [
          { label: 'orange', id: 1 },
          { label: 'blue', id: 2 },
          { label: 'red', id: 3 },
        ];

    return (
      <TabbedArea>
        <TabPane key='1' tab='example'>
          <div className='example'>
            <DropdownList 
              data={list}
              value={this.state.value}
              onChange={this._change}
              textField='label'
              valueField='id'/>
          </div>
        </TabPane>
        <TabPane key='0' tab='api'>
          <DropdownApi />
        </TabPane>
      </TabbedArea>
    )
  },

  _change: function(value){
    this.setState({
      value: value
    })
  }

})