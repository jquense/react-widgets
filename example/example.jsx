var React = require('react')
var DropdownList = require('../src/DropdownList/dropdown-list.jsx')
var Calendar = require('../src/datepicker/calendar.jsx')
var DatePicker = require('../src/datepicker/datepicker.jsx')

var App = React.createClass({

	getInitialState: function(){

		return {
			data: [ 'cherry', 'vanilla','cola','lemon-lime','grapefruit','ginder-ale'],
			dropdownValue: 'cherry',
			calDate: new Date
		}
	},

	render: function(){
		var self = this;
		
		function change(field, data) {
			var obj = {}

			obj[field] = data
			self.setState(obj)
			console.log('example: set field: ' + field)
		}

		return (
			<div>
				<section className="example" style={{ fontSize: 14 }}>
					<DropdownList data={ this.state.data } value={ this.state.dropdownValue} onChange={change.bind(null, 'dropdownValue')}/>
				</section>
				<section className="example" style={{ fontSize: 14, width: 200 }}>
					<DatePicker value={this.state.calDate} onChange={change.bind(null, 'calDate')}/>
				</section>

			</div>
		)
	},


})

React.renderComponent(
	  App()
	, document.body);