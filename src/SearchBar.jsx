var React           = require('react/addons')
	,{LinkedStateMixin} = React.addons
	, Popup           = require('./Popup')
	, activeElement   = require('react/lib/getActiveElement')
	, List 						= require('./List')
	, compat          = require('./util/compat')
	, _               = require('./util/_')
	, cx 							= require('classnames')
	, _clone 					= require('lodash/lang/clone')
	, PlainList       = require('./List')
	, createUncontrolledWidget = require('uncontrollable');

var SearchBar = React.createClass({

	mixins: [
		LinkedStateMixin,
		require('./mixins/WidgetMixin'),
		require('./mixins/TimeoutMixin'),
		require('./mixins/PureRenderMixin'),
		require('./mixins/DataFilterMixin'),
		require('./mixins/DataHelpersMixin'),
		require('./mixins/PopupScrollToMixin'),
		require('./mixins/RtlParentContextMixin'),
		require('./mixins/ListMovementMixin')
	],

	getDefaultProps(){
		return{
			className:'',
			open:false,
			disabled:false,
			readOnly:false,
			busy:false,
			dropUp:false,
			messages: msgs(),
		}
	},

	getInitialState: function(){
		const data = this._data()
			, initialIdx = this._dataIndexOf(this.props.data, this.props.value);


		return {
			selected:data[initialIdx],
			focused:data[initialIdx] || data[0],
			search:'',
		}
	},

	componentWillReceiveProps(props){
			const data = props.data
			, idx = this._dataIndexOf(data, props.value);

		this.setState({
			search: data[idx],
			selected: data[idx],
			focused:  data[!~idx ? 0 : idx]
		})
	},

	render(){
		const{
			className,
			dropUp,
			data,
			messages,
			} = this.props;
		const{
			open,
			selected,
			focused,
			search,
			} = this.state;
		const optID = this._id('_option');

		return (
			<div
				aria-expanded={open}
				aria-haspopup={true}
				onKeyDown={this._keyDown}
				className={cx(className,'rw-searchbar','rw-widget',{
					['rw-open' + (dropUp ? '-up' : '')]: open,
					'rw-rtl':             this.isRtl(),
				})}
				>
					<span className='rw-select rw-btn'><i className='rw-i rw-i-search'/></span>
				<input
					type="text"
					valueLink={this.linkState('search')}
					onFocus={this.open}
					onBlur={this.close}
					className="rw-input"/>
				<Popup
					{..._.pick(this.props, Object.keys(compat.type(Popup).propTypes))}
					open={open}
          onRequestClose={this.close}
					>
						<div>
							<List
								{..._.pick(
									this.props
									, Object.keys(compat.type(List).propTypes))
								}
								optID={optID}
								focused={open ? focused : null}
								data={this._data(data,search)}
								selected={selected}
								onSelect={()=>{console.log('selecting')}}
								onMove={this._scrollTo}
								messages={{emptyList: data.length ? messages.emptyFilter: messages.emptyList}}
							/>
						</div>
				</Popup>
			</div>
		)
	},

	_data(data = this.props.data, search = ''){

		if(!search.length) return data;

		return data.filter((name)=>{
			return name.indexOf(search) != -1
		});
	},

	_onSelect: _.ifNotDisabled(function(data){
		this.close()
		this.notify('onSelect', data)
		this.change(data)
		this.focus(this)
	}),


	_keyDown: _.ifNotDisabled(function (e){
		const key = e.key;
		const{
			focused,
			} = this.state;

		 if(key == 'ArrowDown'){
				this.setState({focused: this.next(focused)})
		 }else if(key == 'ArrowUp'){
			 this.setState({focused: this.prev(focused)})
		 }else if(key == 'Enter'){
			 this.change(focused, true);
		 }

	}),

	open(){
		this.setState({open:true})
	},

	close(){
		this.setState({open:false})
	},

	change(data){
		const{
			search,
			} = this.state;
		if ( !_.isShallowEqual(data, this.props.value) ) {
			this.notify('onChange', data)
			this.notify('onSearch', search);
			this.close();
		}
	},

});

function msgs(msgs){
	return {
		open: 'open search',
		filterPlaceholder: '',
		emptyList:   'There are no items in this list',
		emptyFilter: 'The filter returned no results',
		...msgs
	}
}


module.exports = createUncontrolledWidget(
	SearchBar, { open: 'onToggle', value: 'onChange', search: 'onSearch' });

module.exports.SearchBar = SearchBar;
