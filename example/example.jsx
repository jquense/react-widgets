var React = require('react/addons')
var Widgets = require('../index')
var DropdownList = require('../src/dropdowns/dropdown-list.jsx')
var Select = require('../src/select/select.jsx')
var Calendar = require('../src/calendar/calendar.jsx')
var DatePicker = require('../src/pickers/datepicker.jsx')
var NumberPicker = require('../src/pickers/numberpicker.jsx')
var ComboBox = require('../src/dropdowns/Combobox.jsx')
var chance = new (require('chance'))
//var _ = require('lodash')

var ListItem = React.createClass({

	render: function(){

		return (
			<span>{ "hi: " + this.props.item.name}</span>
		)
	}
})

var App = React.createClass({

	getInitialState: function(){
		var list = generateList()
		return {
			data: list,
			suggestdata: suggestList(),
			dropdownValue: list[0],
			comboboxValue: 1,
			//comboboxValue: list[0],
			selectValues: [1,3],
			calDate: new Date(2014,5,10,0,0,0),
			numberValue: 1
		}
	},

	render: function(){
		var self = this;

		function change(field, data) {
			var obj = {}

			if(field === 'selectValues')
				data = _.pluck(data, 'id')

			obj[field] = _.has(data, 'id') ? data.id : data

			self.setState(obj)
			//console.log('example: set field: ' + field, data)
		}

		return (
			<div style={{ fontSize: 14 }}>
				<div style={{ maxWidth: 600 }}>
					<section className="example" style={{ marginBottom: 20 }}>
						<DropdownList
							isRtl={false}
							id='MyDropdownList'
							data={ this.state.data }
							textField='name'
							valueField='id'
							initialBufferSize={10}
							busy={false}
							open={this.state.open}
							onToggle={change.bind(null, 'open')}/>
					</section>
					<section className="example" style={{ marginBottom: 20 }}>
						<Calendar

							value={ new Date }
							onChange={change.bind(null, 'calValue')}/>
					</section>
					<section className="example" style={{ marginBottom: 20 }}>
					<ComboBox
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
							onChange={change.bind(null, 'selectValues')}
							busy={false}
							tagComponent={ListItem}
							itemComponent={ListItem}/>
					</section>
					<section className="example" style={{ marginBottom: 20 }}>
						<DatePicker
							isRtl={false}
							id='swweeeeet'
							value={this.state.calDate}
							format='MM/dd/yy'
							min={new Date(2014,5,1,0,0,0)}
							max={new Date(2014,5,15,0,0,0)}/>
					</section>
					<section className="example" style={{ marginBottom: 20 }}>
						<NumberPicker id='AwesomeNumPicker'
							isRtl={false}
							format="D"
							value={this.state.numberValue}
							onChange={change.bind(null, 'numberValue')}/>
					</section>
				</div>
				<div className='clearfix'>
					<div className='c1' style={{ float: 'left', width: 150, height: 200 }}/>
					<div className='c2' style={{ float: 'left', width: 150, height: 200 }}/>
					<div className='c3' style={{ float: 'left', width: 150, height: 200 }}/>
					<div className='c4' style={{ float: 'left', width: 150, height: 200 }}/>
					<div className='c5' style={{ float: 'left', width: 150, height: 200 }}/>
					<div className='c6' style={{ float: 'left', width: 150, height: 200 }}/>
					<div className='c7' style={{ float: 'left', width: 150, height: 200 }}/>
					<div className='c8' style={{ float: 'left', width: 150, height: 200 }}/>
				</div>
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
// <section className="example" style={{ marginBottom: 20 }}>
// 						<Calendar
// 							id='Calendar'
// 							value={ new Date }
// 							onChange={change.bind(null, 'calValue')}/>
// 					</section>
// 					<section className="example" style={{ marginBottom: 20 }}>
// 					<ComboBox
// 							isRtl={false}
// 							data={ this.state.data }
// 							textField='name'
// 							valueField='id'
// 							suggest={true}
// 							busy={true}
// 							value={ this.state.comboboxValue}
// 							onChange={change.bind(null, 'comboboxValue')}/>
// 					</section>
// 					<section className="example" style={{ marginBottom: 20 }}>
// 						<Select
// 							isRtl={false}
// 							data={ this.state.data }
// 							placeholder="hi i am a placeholder"
// 							textField='name'
// 							valueField='id'
// 							value={ this.state.selectValues }
// 							busy={true}
// 							tagComponent={ListItem}
// 							itemComponent={ListItem}
// 							onChange={change.bind(null, 'selectValues')}/>
// 					</section>
// 					<section className="example" style={{ marginBottom: 20 }}>
// 						<DatePicker
// 							id='AwesomeDatePicker'
// 							isRtl={false}
// 							value={this.state.calDate}
// 							onChange={change.bind(null, 'calDate')}/>
// 					</section>
// 					<section className="example" style={{ marginBottom: 20 }}>
// 						<NumberPicker id='AwesomeNumPicker'
// 							isRtl={false}
// 							min={0}
// 							max={5}
// 							format="c"
// 							value={this.state.numberValue}
// 							onChange={change.bind(null, 'numberValue')}/>
// 					</section>