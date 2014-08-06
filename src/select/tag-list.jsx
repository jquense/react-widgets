var React = require('react/addons')
  , _ = require('lodash')
  , btn = require('../common/btn.jsx')

module.exports = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  propTypes: {
    value:          React.PropTypes.array,
    onChange:       React.PropTypes.func.isRequired,

    valueField:     React.PropTypes.string,
    textField:      React.PropTypes.string,

    valueComponent: React.PropTypes.component
  },

  getDefaultProps: function(){
    return {
      valueComponent: DefaultTag
    }
  },

  render: function(){
      var Item  = this.props.valueComponent 
        , value = this.props.value;

      return this.transferPropsTo(
        <ul className='rw-tag-list'>
          {_.map(value, function(item, i){
            return (
              <li>
                <Item
                  item={item}
                  unselectable='on'
                  textField={this.props.textField}
                  valueField={this.props.valueField}/>
                <btn onClick={this._delete.bind(null, item)} unselectable='on'>
                  <i className="rw-i rw-i-times">
                    <span className="rw-sr">Remove {this._dataText(item)}</span>
                  </i>
                </btn>
              </li>)
          }, this)}
        </ul>
      )
  },

  _delete: function(val, e){
    //e.stopPropagation();
    this.props.onDelete(e, val)
  }
})


var DefaultTag = React.createClass({

  mixins: [ require('../mixins/DataHelpersMixin')],

  render: function(){
      var item = this.props.item;

      return this.transferPropsTo(<span>{ item ? this._dataText(item) : '' }</span>)
  }
})