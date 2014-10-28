/**  React.DOM */
var React  = require('react')
  , cx  = require('../util/cx')
  , _   = require('lodash')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , $ = require('../util/dom');


var PopupContent = React.createClass({displayName: 'PopupContent',
  render: function(){
    return React.Children.only(this.props.children)
  }
})


module.exports = React.createClass({displayName: 'exports',

	propTypes: {
    duration:       React.PropTypes.number,
    onRequestClose: React.PropTypes.func.isRequired,
    onClosing:      React.PropTypes.func,
    onOpening:      React.PropTypes.func,
    onClose:        React.PropTypes.func,
    onOpen:         React.PropTypes.func
	},

  getDefaultProps: function(){
    return {
      duration:    200,
      open:        false,
      onClosing:   _.noop,
      onOpening:   _.noop,
      onClose:     _.noop,
      onOpen:      _.noop,
    }
  },

	componentDidMount: function(){
    this.close(0)
	},

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
    })
  },

  componentDidUpdate: function(pvProps, pvState){
    var closing =  pvProps.open && !this.props.open
      , opening = !pvProps.open && this.props.open;

    if (opening)      this.open()
    else if (closing) this.close()
  },

	render: function(){
    var Content = mergeIntoProps(
          { className: 'rw-popup rw-widget' }
        , this.props.children);

    Content.props.ref = this.props.children.props.ref;

		return mergeIntoProps(this.props,
      React.DOM.div({className: "rw-popup-container"}, 
        PopupContent({ref: "content"}, 
          Content 
        )
      )
		)
	},

  dimensions: function(){
    var el = this.getDOMNode();

    el.style.display = 'block'
    el.style.height  = $.height(this.refs.content.getDOMNode()) + 'px'
  },

  open: function(){
    var self = this
      , anim = this.getDOMNode()
      , el   = this.refs.content.getDOMNode();

    this.ORGINAL_POSITION = $.css(el, 'position')

    this._isOpening = true
    this.dimensions()
    this.props.onOpening()

    el.style.position = 'absolute'

    $.animate(el
      , { top: 0 }
      , self.props.duration
      , function(){
          if ( !self._isOpening ) return
          el.style.position = self.ORGINAL_POSITION
          anim.style.overflow = 'visible'
          self.ORGINAL_POSITION = null
          self.props.onOpen()
        })

  },

  close: function(dur){
    var self = this
      , el   = this.refs.content.getDOMNode()
      , anim = this.getDOMNode()
      , ht   = anim.style.height;

    this.ORGINAL_POSITION = $.css(el, 'position')

    this._isOpening = false
    this.dimensions()
    this.props.onClosing()

    anim.style.overflow = 'hidden'
    el.style.position = 'absolute'

    $.animate(el
      , { top: '-100%' }
      , dur === undefined ? this.props.duration : dur
      , function() {
          if ( self._isOpening ) return
          el.style.position = self.ORGINAL_POSITION

          anim.style.display = 'none'
          self.ORGINAL_POSITION = null
          self.props.onClose()
        })
  }

})


function childKey(children){
  var nextChildMapping = React.Children.map(children, function(c){ return c });
  for(var key in nextChildMapping) return key
}