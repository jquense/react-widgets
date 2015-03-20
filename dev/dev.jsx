'use strict';
require('../src/less/react-widgets.less')

//require('react-a11y')();

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

var { ModalTrigger, Modal } = require('react-bootstrap')



// var g = require('globalize')
var culture = require('globalize/lib/cultures/globalize.culture.es');
// g.culture('fi');

var ListItem = React.createClass({

  render: function(){

    return (<span>{ "hi: " + this.props.item.name}</span>)
  }
})


var MyModal = React.createClass({
  render: function() {
    var list = generateList()
    return (
        <Modal {...this.props} title="Modal heading" animation={false}>
          <DropdownList
              isRtl={false}
              id='MyDropdownList'
              data={ list }
              textField='name'
              valueField='id'
              defaultValue={list[1]}/>
          <div className="modal-footer">
            <button onClick={this.props.onRequestHide}>Close</button>
          </div>
        </Modal>
      );
  }
});

var App = React.createClass({

  getInitialState: function(){
    var list = generateList()
    return {
      data: list,
      suggestdata: suggestList(),
      dropdownValue: list[0],
      comboboxValue: 1,
      //comboboxValue: list[0],
      selectValues: [3,4,5,2],
      calDate: new Date(),
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
          .concat(tag.id)
      })
    }

    return (
      <div style={{ fontSize: 14 }}>
        <div style={{ maxWidth: 600 }}>
          <section className="example" style={{ marginBottom: 20 }}>
            <Calendar
              value={ this.state.calValue }
              min={new Date(2014, 9, 15)}
              culture='es'
              onChange={change.bind(null, 'calValue')}
              messages={{
                dateFormat: str => 'hi'
              }}/>
          </section>
          <section className="example" style={{ marginBottom: 20 }}>
            <DatePicker defaultValue={new Date()}/>
          </section>
        </div>
      </div>

    )


  },


})

React.render(<App/>, document.body);



function generateList(){
  var arr = new Array(100)

  for(var i = 0; i < arr.length; i++){
    var first = chance.first(), last = chance.last()
    arr[i] = { id: i + 1, name: `${first} ${last}`, first, surname: last }
  }

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