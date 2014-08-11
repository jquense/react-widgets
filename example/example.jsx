var React = require('react/addons')
var DropdownList = require('../src/dropdowns/dropdown-list.jsx')
var Select = require('../src/select/select.jsx')
//var Calendar = require('../src/datepicker/calendar.jsx')
var DatePicker = require('../src/datepicker/datepicker.jsx')
var ComboBox = require('../src/dropdowns/combobox.jsx')
var chance = new (require('chance'))
//var _ = require('lodash')

var App = React.createClass({

	getInitialState: function(){
		var list = generateList()
		return {
			data: list,
			dropdownValue: list[0],
			comboboxValue: list[0],
			selectValues: [],
			calDate: new Date
		}
	},

	render: function(){
		var self = this;
		
		function change(field, data) {
			var obj = {}

			obj[field] = data
			self.setState(obj)
			console.log('example: set field: ' + field, data)
		}

		return (
			<div style={{ fontSize: 14, width: 300 }}>
				<section className="example">
					<DropdownList 
						data={ this.state.data } 
						textField='name'
						valueField='id'
						value={ this.state.dropdownValue} 
						onChange={change.bind(null, 'dropdownValue')}/>
				</section>
				<section className="example">
				<ComboBox 
						data={ this.state.data } 
						textField='name'
						valueField='id'
						value={ this.state.comboboxValue} 
						onChange={change.bind(null, 'comboboxValue')}/>
				</section>
				<section className="example">
					<Select 
						data={ this.state.data } 
						textField='name'
						valueField='id'
						value={ this.state.selectValues } 
						onChange={change.bind(null, 'selectValues')}/>
				</section>
				<section className="example">
					<DatePicker value={this.state.calDate} onChange={change.bind(null, 'calDate')}/>
				</section>
			</div>
		)
	},


})

React.renderComponent(
	  App()
	, document.body);


				
function generateList(){
	var arr = new Array(100)

	for(var i = 0; i < arr.length; i++)
		arr[i] = { id: i + 1, name: chance.name() }

	return arr
}