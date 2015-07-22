var React           = require('react')
	, Popup           = require('./Popup')
	, activeElement   = require('react/lib/getActiveElement')
	, List 						= require('./List')
	, compat          = require('./util/compat')
	, _               = require('./util/_')
	, cx 							= require('classnames')
	, PlainList       = require('./List')
	, createUncontrolledWidget = require('uncontrollable');

var SearchBar = React.createClass({

	mixins: [
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
			filter:function(search){
				return (name)=>{
					return name.split("").splice(0, search.length).join("").indexOf(search) != -1
				}
			}
		}
	},

	getInitialState: function(){
		const data = this.props.data
			, initialIdx = this._dataIndexOf(data, this.props.value);


		return {
			selected:data[initialIdx],
			focused:data[initialIdx] || data[0],
			search:'',
			filter:this.props.filter,
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

	_data(data = this.props.data, search = this.state.search){
		const{
			filter,
			} = this.props;

		if(!search.length) return data;

		return data.filter(filter(search));
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
					<span className='rw-select rw-btn' onClick={this._handleSubmit}><i className='rw-i rw-i-search'/></span>
				<input
					type="text"
					ref="input"
					value={search}
					onChange={this._handleInputChange}
					onFocus={this.open}
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
								data={this._data()}
								selected={selected}
								onSelect={this._onSelect}
								onMove={this._scrollTo}
								messages={{emptyList: data.length ? messages.emptyFilter: messages.emptyList}}
							/>
						</div>
				</Popup>
			</div>
		)
	},

	_handleSubmit(){
		const{
			search,
			focused,
			} = this.state;

		this.change(focused || search)
	},

	_handleInputChange(e){
		this.setState({search:e.target.value})
	},

	_onSelect: _.ifNotDisabled(function(data){
		this.notify('onSelect', data);
		this.change(data);
	}),


	_keyDown: _.ifNotDisabled(function (e){
		const key = e.key;
		const{
			data,
			} = this.props;
		const{
			focused,
			search,
			} = this.state;

		 if(key == 'ArrowDown'){
				this.setState({focused: this.next(focused)})
		 }else if(key == 'ArrowUp'){
			 this.setState({focused: this.prev(focused)})
		 }else if(key == 'Enter'){
			 this._handleSubmit();
		 }else{
			 this.setState({focused:this._data()[0] || null})
		 }

	}),

	open(){
		this.setState({open:true})
	},

	close(){
		this.setState({open:false},()=>{
			compat.findDOMNode(this.refs.input).blur();
		})
	},

	change(data){
		const{
			search,
			} = this.state;
		this.notify('onChange', data)
		this.notify('onSearch', search);
		this.close();
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
