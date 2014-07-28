var React = require('react')
  , cx = require('react/lib/cx');

module.exports = React.createClass({

  propTypes: {
    label:          React.PropTypes.string.isRequired,

    onViewChange:   React.PropTypes.func,
    onMoveLeft:     React.PropTypes.func,
    onMoveRight:    React.PropTypes.func,
  },


  render: function(){
    var self = this;

    return (
      <div className='rw-header'>
        <button className="rw-btn rw-btn-left" onClick={this.props.onMoveLeft}>
          <i className="rw-i rw-i-caret-left"><span className="rw-sr">Move Left</span></i>
        </button>
        <button className="rw-btn rw-btn-view" onClick={this.props.onViewChange}>
          { this.props.label }
        </button>
        <button className="rw-btn rw-btn-right" onClick={this.props.onMoveRight}>
          <i className="rw-i rw-i-caret-right"><span className="rw-sr">Move Left</span></i>
        </button>
      </div>
    )
  }
})