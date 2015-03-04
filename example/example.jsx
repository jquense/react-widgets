'use strict';
var React = require('react/addons')
var DropdownList = require('../src/DropdownList.jsx')
var Multiselect = require('../src/Multiselect.jsx')
var Calendar = require('../src/Calendar.jsx')
var DatePicker = require('../src/DateTimepicker.jsx')
var NumberPicker = require('../src/NumberPicker.jsx')
var ComboBox = require('../src/Combobox.jsx')
var SelectList = require('../src/SelectList.jsx')
var chance = new (require('chance'))
var _ = require('lodash');


var TagList = require('../src/MultiselectTagList.jsx');
var list = generateList();

// var g = require('globalize')
// var culture = require('globalize/lib/cultures/globalize.culture.es');
// g.culture('fi');

// var TaglessMultiSelect = React.createClass({

//   mixins: [
//     require('./src/mixins/DataHelpersMixin')
//   ],

//   render(){
//     var {
//       value,
//       data,
//       ...props } = this.props;

//     //remove the selected values from data list
//     data = data.filter( i => !value.some( this._valueMatcher.bind(null, i), this))

//     return <Multiselect {...props} data={data} value={[]} onChange={this._change}/>
//   },

//   _change(values){
//     this.props.onChange && 
//       this.props.onChange(
//         this.props.value.concat(values)) // return all the values
//   }
// });

var App = React.createClass({

  getInitialState: function(){
    
    return {
      data: list,
      values: [],
    }
  },

  render: function(){
    var self = this;

    function onChange([val]){

      self.setState({
        values: self.state.values.concat(val),
        data:   self.state.data.filter( v => v !== val)
      })
    }

    function onDelete(val){
      self.setState({
        values: self.state.values.filter( v => v !== val),
        data:   self.state.data.concat(val)
      })
    }

    return (
      <div style={{ fontSize: 14 }}>
        <div style={{ maxWidth: 600 }}>
          <section>
            <Multiselect data={this.state.data} value={[]} onChange={onChange} />
            <TagList value={this.state.values} onDelete={onDelete} />
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
    arr[i] = `${first} ${last}`
  }

  return arr
}