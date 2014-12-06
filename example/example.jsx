'use strict';
var React = require('react/addons')
var DropdownList = require('../src/DropdownList.jsx')
var Select = require('../src/Multiselect.jsx')
var Calendar = require('../src/Calendar.jsx')
var DatePicker = require('../src/DateTimepicker.jsx')
var NumberPicker = require('../src/NumberPicker.jsx')
var ComboBox = require('../src/Combobox.jsx')
var SelectList = require('../src/SelectList.jsx')
var chance = new (require('chance'))
var _ = require('lodash')


// var g = require('globalize')
// var culture = require('globalize/lib/cultures/globalize.culture.fi');
// g.culture('fi');

var ListItem = React.createClass({

  render: function(){

    return (<span>{ "hi: " + this.props.item.name}</span>)
  }
})

// var a = { a:1, b: 3};
// var c = { ...a, x: 1 };

var App = React.createClass({

  getInitialState: function(){
    var list = generateList()
    return {
      data: list,
      suggestdata: suggestList(),
      dropdownValue: list[0],
      comboboxValue: 1,
      //comboboxValue: list[0],
      selectValues: 3,
      calDate: new Date,
      numberValue: 1,
      open: false
    }
  },

  render: function(){
    var self = this;

    function change(field, data) {
      var obj = {}

      if(field === 'selectValues' && Array.isArray(data))
        data = _.pluck(data, 'id')

      if(field === 'open') console.log(field, data)

      obj[field] = _.has(data, 'id') ? data.id : data

      self.setState(obj)
      //console.log('example: set field: ' + field, data)
    }

    function create(tag){
      var data;

      tag = { id: self.state.data.length + 1, name: tag }
      data = self.state.data.concat(tag)

      self.setState({
        data: data,
        selectValues: []
          .concat(self.state.selectValues)
          .concat(tag)
      })
    }

    return (
      <div style={{ fontSize: 14 }}>
        <div style={{ maxWidth: 600 }}>
        {/* <section className="example" style={{ height: '400px', overflow: 'auto' }}>
          <div style={{ height: 150 }}>
            sgsdgsdg sdgdg<br/>assdgsdgsdg<br/>asdasdasdasdasd
          </div>
          <SelectList
            textField='name'
            valueField='id'
            data={this.state.data}
            value={this.state.selectValues}
            disabled={[1 ,6]}
            multiple
            busy={false}
            
            onChange={change.bind(null, 'selectValues')}/>
        </section>*/}
        
          <section className="example" style={{ marginBottom: 20 }}>
            <DropdownList
              isRtl={false}
              id='MyDropdownList'
              data={ this.state.data }
              textField='name'
              valueField='id'
              busy={false}
              value={this.state.dropdownValue}
              onChange={change.bind(null, 'dropdownValue')}/>
          </section>
          <section className="example" style={{ marginBottom: 20 }}>
            <Calendar
              value={ this.state.calValue }
              min={new Date(2014, 9, 15)}
              max={new Date(2025, 0, 15)}
              onChange={change.bind(null, 'calValue')}/>
          </section>
          <section className="example" style={{ marginBottom: 20 }}>
          <ComboBox
              isRtl={true}
              data={ this.state.suggestdata }
              textField='name'
              valueField='id'
              filter={'startsWith'}
              suggest={true}
              busy={false}
              disabled={false}
              value={ this.state.comboboxValue}
              onChange={change.bind(null, 'comboboxValue')}/>
          </section>
          <section className="example" style={{ marginBottom: 20 }}>
            <Select
              isRtl={false}
              data={ this.state.data }
              placeholder="hi i am a placeholder"
              textField='name'
              valueField='id'
              value={ this.state.selectValues }
              busy={false}
              allowCustomTags
              onCreate={create}
              open={true} 
              searchTerm="custom tag" 
              tagComponent={ListItem}
              itemComponent={ListItem}
              onChange={change.bind(null, 'selectValues')}/>
          </section>
          <section className="example" style={{ marginBottom: 20 }}>
            <DatePicker
              isRtl={false}
              id='swweeeeet'
              time={true}
              format='f'
              min={new Date(2013,5,1,0,0,0)}/>
          </section>
          <section className="example" style={{ marginBottom: 20 }}>
            <NumberPicker id='AwesomeNumPicker'
              isRtl={false}
              format="D"
              value={this.state.numberValue}
              onChange={change.bind(null, 'numberValue')}/>
          </section>
        </div>
      </div>

    )


  },


})

React.render(<App/>, document.body);



function generateList(){
  var arr = new Array(100)

  for(var i = 0; i < arr.length; i++)
    arr[i] = { id: i + 1, name: chance.name() }

  return arr
}

function suggestList(){
  var i = 0;

  return [
    { id: i += 1, name: "james" },
    { id: i += 1, name: "jan" },
    { id: i += 1, name: "jase" },
    { id: i += 1, name: "jason" },
    { id: i += 1, name: "jim" },
    { id: i += 1, name: "jimmy" },
    { id: i += 1, name: "jimmy smith" },
    { id: i += 1, name: "john" }
  ]
}
