'use strict';
require('../src/less/react-widgets.less')

//require('react-a11y')();
var configure = require('../src/configure')

//configure.setGlobalizeInstance(window.Globalize);

var React = require('react/addons')
//var jquery = require('jquery')
var index = require('../src')
var DropdownList = require('../src/DropdownList.jsx')
var Multiselect = require('../src/Multiselect.jsx')
var Calendar = require('../src/Calendar.jsx')
var DatePicker = require('../src/DateTimePicker.jsx')
var NumberPicker = require('../src/NumberPicker.jsx')
var ComboBox = require('../src/Combobox.jsx')
var SelectList = require('../src/SelectList.jsx')
var List = require('../src/List.jsx')

var chance = new (require('chance'))

var { ModalTrigger, Modal } = require('react-bootstrap')

// var moment = require('moment')

// var endOfDecade = date => moment(date).add(10, 'year').add(-1, 'millisecond').toDate()
// var endOfCentury = date => moment(date).add(100, 'year').add(-1, 'millisecond').toDate()

// configure.setDateLocalizer({
//   formats: {
//     date: 'L',
//     time: 'LT',
//     default: 'lll',
//     header: 'MMMM YYYY',
//     footer: 'LL',
//     weekday: (day, culture, localizer) => moment().locale(culture).weekday(day).format('dd'),

//     dayOfMonth: 'DD',
//     month: 'MMM',
//     year: 'YYYY',

//     decade: (date, culture, localizer) => {
//       return localizer.format(date, 'YYYY', culture)
//         + ' - ' + localizer.format(endOfDecade(date), 'YYYY', culture)
//     },

//     century: (date, culture, localizer) => {
//       return localizer.format(date, 'YYYY', culture)
//         + ' - ' + localizer.format(endOfCentury(date), 'YYYY', culture)
//     }
//   },

//   firstOfWeek(culture){
//     return moment.localeData(culture).firstDayOfWeek()
//   },

//   parse(value, format, culture){
//     return moment(value, format).locale(culture).toDate()
//   },

//   format(value, format, culture){
//     return moment(value).locale(culture).format(format)
//   }
// })


// configure.setAnimate((element, props, duration, ease, callback) => {
//   return jquery(element).animate(props, duration, callback)
// })


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
          <button onClick={() => this.dropdowns()}>add</button>

          <DatePicker editFormat='d' onChange={(...args)=> console.log(args)}/>


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