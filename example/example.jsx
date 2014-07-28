var React = require('react')
var DropdownList = require('../src/DropdownList/dropdown-list.jsx')
var Calendar = require('../src/datepicker/calendar.jsx')

var App = React.createClass({

	getInitialState: function(){

		return {
			data: [ 'cherry', 'vanilla','cola','lemon-lime','grapefruit','ginder-ale'],
			value: 'cherry'
		}
	},

	render: function(){
		var self = this;
		
		function change(data){
			self.setState({ value: data })
		}

		return (
			<div>
				<section className="example" style={{ fontSize: 14 }}>
					<DropdownList data={ this.state.data } value={ this.state.value} onChange={change}/>
				</section>
				<section className="example" style={{ fontSize: 14, width: 200 }}>
					<Calendar date={new Date}/>
				</section>

			</div>
		)
	},


})

React.renderComponent(
	  App()
	, document.body);