'use strict';
require('../src/less/react-widgets.less')

var Globalize = require('globalize')
var localizers = require('../src/localizers/globalize')
var numberLocalizer = require('../src/localizers/simple-number')

Globalize.load(
	require('cldr-data/main/en-GB/ca-gregorian.json'),
	require('cldr-data/main/en-GB/currencies.json'),
	require('cldr-data/main/en-GB/dateFields.json'),
	require('cldr-data/main/en-GB/numbers.json'),
  require('cldr-data/supplemental/numberingSystems.json'),
	require('cldr-data/supplemental/currencyData.json'),
	require('cldr-data/supplemental/likelySubtags.json'),
	require('cldr-data/supplemental/timeData.json'),
	require('cldr-data/supplemental/weekData.json')
);
Globalize.locale('en-GB')

localizers(Globalize)
numberLocalizer()

var React = require('react/addons')
var index = require('../src')
var dates = require('../src/util/dates')
var DropdownList = require('../src/DropdownList.jsx')
var Multiselect = require('../src/Multiselect.jsx')
var Calendar = require('../src/Calendar.jsx')
var DateTimePicker = require('../src/DateTimePicker.jsx')
var NumberPicker = require('../src/NumberPicker.jsx')
// var ComboBox = require('../src/Combobox.jsx')
// var SelectList = require('../src/SelectList.jsx')
// var List = require('../src/List.jsx')

var chance = new (require('chance'))

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

  dropdowns(){
    var i = 0, dropdowns = [];

    while (i++ < 50) {
      dropdowns.push(<DropdownList
        valueField='id'
        textField='name'
        data={generateList()}
      />)
    }

    this.start = +(new Date())
    this.setState({ dropdowns })
  },

  componentDidUpdate(){
    if (this.start){
      console.log('rendered: ', +(new Date) - this.start)
      this.start = null
    }
  },

  render(){
    var self = this;

    function change(field, data) {
      var obj = {}

      if(field === 'selectValues' && Array.isArray(data))
        data = data.map( d => d.id)

      if(field === 'open') console.log(field, data)

      obj[field] = data.hasOwnProperty('id') ? data.id : data

      self.setState(obj)
      //console.log('example: set field: ' + field, data)
    }

    return (
      <div style={{ fontSize: 14 }}>
        <div style={{ maxWidth: 600, height: 1500 }}>

          <section className="example" style={{ marginBottom: 20 }}>
            <button
              onClick={() => this.setState({
                calDate: dates.add(this.state.calDate, 1, 'month')
              })}
            >
              add
            </button>
            <DateTimePicker/>
            <Calendar
              value={this.state.calDate}
              onChange={calDate => this.setState({ calDate })}
            />
            <NumberPicker />
          </section>
        </div>
      </div>
    )
  }


})

React.render(<App/>, document.body);



function generateList(limit = 100){
  var arr = new Array(limit)

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
