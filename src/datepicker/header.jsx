var React = require('react/addons')
  , cx    = React.addons.classSet;

var btn = require('../common/btn.jsx')

module.exports = React.createClass({

  propTypes: {
    label:          React.PropTypes.string.isRequired,

    disabled:       React.PropTypes.bool.isRequired,
    onViewChange:   React.PropTypes.func.isRequired,
    onMoveLeft:     React.PropTypes.func.isRequired,
    onMoveRight:    React.PropTypes.func.isRequired,
  },

  mixins: [
    require('../mixins/RtlChildContextMixin')
  ],

  render: function(){
    var self = this
      , rtl = this.isRtl();

    return (
      <div className='rw-header'>
        <btn className="rw-btn-left" onClick={this.props.onMoveLeft}>
          <i className={"rw-i rw-i-caret-" + (rtl ? 'right' : 'left')}>
            <span className="rw-sr">Move Left</span></i>
        </btn>
        <btn className="rw-btn-view" onClick={this.props.onViewChange} disabled={this.props.disabled} >
          { this.props.label }
        </btn>
        <btn className="rw-btn-right" onClick={this.props.onMoveRight}>
          <i className={"rw-i rw-i-caret-" + (rtl ? 'left' : 'right')}>
            <span className="rw-sr">Move Left</span></i>
        </btn>
      </div>
    )
  }
})