var React = require('react/addons')
  , cx    = React.addons.classSet;

var btn = require('../common/btn.jsx')

module.exports = React.createClass({

  propTypes: {
    label:          React.PropTypes.string.isRequired,

    upDisabled:     React.PropTypes.bool.isRequired,
    prevDisabled:   React.PropTypes.bool.isRequired,
    nextDisabled:   React.PropTypes.bool.isRequired,
    onViewChange:   React.PropTypes.func.isRequired,
    onMoveLeft:     React.PropTypes.func.isRequired,
    onMoveRight:    React.PropTypes.func.isRequired,
  },

  mixins: [
    require('../mixins/PureRenderMixin'),
    require('../mixins/RtlChildContextMixin')
  ],

  render: function(){
    var self = this
      , rtl = this.isRtl();

    return (
      <div className='rw-header'>
        <btn className="rw-btn-left" 
          onClick={this.props.onMoveLeft}
          disabled={this.props.prevDisabled} 
          aria-disabled={this.props.prevDisabled}>
          <i className={"rw-i rw-i-caret-" + (rtl ? 'right' : 'left')}>
            <span className="rw-sr">Move Left</span></i>
        </btn>
        <btn className="rw-btn-view" 
          onClick={this.props.onViewChange} 
          disabled={this.props.upDisabled} 
          aria-disabled={this.props.upDisabled}>
          { this.props.label }
        </btn>
        <btn className="rw-btn-right" 
          onClick={this.props.onMoveRight}
          disabled={this.props.nextDisabled} 
          aria-disabled={this.props.nextDisabled}>
          <i className={"rw-i rw-i-caret-" + (rtl ? 'left' : 'right')}>
            <span className="rw-sr">Move Left</span></i>
        </btn>
      </div>
    )
  }
})