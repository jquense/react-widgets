var React = require('react')
  , cx = require('react/lib/cx')
  , events = require('../util/events')
  , Animation = require('react/lib/ReactCSSTransitionGroup')
  // , outerHt = require('../util/outerHeight')
  // , outerWt = require('../util/outerWidth')
  , $ = require('zepto');


module.exports = React.createClass({

	propTypes: {
		getAnchor: React.PropTypes.func
	},


  componentWillUnmount: function(){
    var self = this
      , popup = self.refs.popup
      , $popup = $(popup.getDOMNode())
      , $anchor = $(this.props.getAnchor())
      , aOffset, aHeight, aWidth;

      events.off(document, 'click', self._onClick)
  },

	componentDidMount: function(){
		var self = this
		  , popup = self.refs.popup
		  , $popup = $(popup.getDOMNode())
		  , $anchor = $(this.props.getAnchor())
		  , aOffset, aHeight, aWidth;

      //setTimeout(function(){ $popup.addClass('slide-down')}, 0)

      self._onClick = function(e){
        var detached = !$.contains(document, e.target)

        if ( !$.contains($popup[0], e.target) && !detached )
          self.props.onShouldClose()
      }

      events.on(document, 'click', self._onClick )

  		aOffset = $anchor.offset()

  		$popup.css({
  			top: aOffset.top + aOffset.height,
  			left: aOffset.left,
        width: aOffset.width
  		});
	},

	render: function(){

		return (
			<div ref="popup"
        className={cx({
          'rw-popup': true,
          'rw-widget': true,
          //'slide-up': true
        })}>
				{ this.props.children }
			</div>
		)
	}
})