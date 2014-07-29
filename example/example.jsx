var React = require('react')
var DropdownList = require('../src/DropdownList/dropdown-list.jsx')
var Calendar = require('../src/datepicker/calendar.jsx')

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
		}

		return (
			<div>
				<section className="example" style={{ fontSize: 14 }}>
					<DropdownList data={ this.state.data } value={ this.state.dropdownValue} onChange={change.bind(null, 'dropdownValue')}/>
				</section>
				<section className="example" style={{ fontSize: 14, width: 200 }}>
					<Calendar date={this.state.calDate} onChange={change.bind(null, 'calDate')}/>
				</section>

			</div>
		)
	},


})

React.renderComponent(
	  App()
	, document.body);