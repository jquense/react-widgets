var React  = require('react/addons')
  , cx     = React.addons.classSet
  , events = require('../util/events')
  , Animation = React.addonsCSSTransitionGroup
  // , outerHt = require('../util/outerHeight')
  // , outerWt = require('../util/outerWidth')
  , $ = require('zepto');

var PopupContent = React.createClass({

  componentDidMount: function(){
    this.props.height(this.getDOMNode().scrollHeight)
  },

  render: function(){
    return React.Children.only(this.props.children)
  }
})

module.exports = React.createClass({

	propTypes: {
		getAnchor: React.PropTypes.func.isRequired,
    height:    React.PropTypes.number
	},

  getDefaultProps: function(){
    return {
      height:   200
    }
  },

  componentWillUnmount: function(){
    var self = this
      , popup = self.refs.popup
      , $popup = $(popup.getDOMNode())
      , $anchor = $(this.props.getAnchor())
      , aOffset, aHeight, aWidth;

      events.off(document, 'click', self._onClick)
  },

  _height: function(contentHeight) {
    var height = this.props.height;

    // if ( this.isMounted() )
    //   $(this.refs.content.getDOMNode()).height(contentHeight > height ? height : "auto") 
  },

	componentDidMount: function(){
		var self    = this
		  , popup   = self.refs.popup
		  , $popup  = $(popup.getDOMNode())
		  , $anchor = $(this.props.getAnchor())
      , height  = this.props.height
		  , aOffset, aHeight, aWidth;

      //setTimeout(function(){ $popup.addClass('slide-down')}, 0)

      self._onClick = function(e){
        var detached = !$.contains(document, e.target)

        if ( !$.contains($popup[0], e.target) && !detached )
          self.props.onShouldClose()
      }

      events.on(document, 'click', self._onClick )

  		aOffset = $anchor.offset()

  		// $popup.css({
  		// 	top: aOffset.top + aOffset.height,
  		// 	left: aOffset.left,
    //     width: aOffset.width
  		// });
	},

	render: function(){

		return (
			<div ref="popup"
        style={{ height: 200 }}
        className={cx({
          'rw-popup': true,
          'rw-widget': true,
          //'slide-up': true
        })}>
        <div ref='content'>
          <PopupContent height={this._height}>{ this.props.children }</PopupContent>
        </div>
			</div>
		)
	}
})