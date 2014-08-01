var React  = require('react/addons')
  , cx     = React.addons.classSet
  , events = require('../util/events')
  , Animation = React.addonsCSSTransitionGroup
  , _ = require('lodash')
  , mergePropsInto = require('../util/transferProps')
  // , outerHt = require('../util/outerHeight')
  // , outerWt = require('../util/outerWidth')
  , $ = require('zepto');



module.exports = React.createClass({

	propTypes: {
		getAnchor:      React.PropTypes.func.isRequired,
    onRequestClose: React.PropTypes.func.isRequired,
    onClosing:      React.PropTypes.func,
    onOpening:      React.PropTypes.func,
    onClose:        React.PropTypes.func,
    onOpen:         React.PropTypes.func,
    height:         React.PropTypes.oneOfType([
                      React.PropTypes.number, 
                      React.PropTypes.string
                    ])
	},

  getDefaultProps: function(){
    return {
      height:      'auto',
      duration:    200,
      open:        false,
      onClosing:   _.noop,
      onOpening:   _.noop,
      onClose:     _.noop,
      onOpen:      _.noop,
    }
  },


  componentWillUnmount: function(){
    $(document).off('click', self._onClick)
    $(window).off('resize', self._resize)
  },


	componentDidMount: function(){
		var self = this
      , node = this.getDOMNode();

      self._onClick = function(e){
        var detached = !$.contains(document, e.target)

        if ( self.props.open && !$.contains(node, e.target) && !detached )
          self.props.onRequestClose()
      }

      self._resize = _.throttle(this.position.bind(this), 100)

      $(window).on('resize',  self._resize)
      $(document).on('click', self._onClick)

      this.position()
      this.close(0)
	},

  componentDidUpdate: function(pvProps, pvState){
    var closing =  pvProps.open && !this.props.open
      , opening = !pvProps.open && this.props.open;

    this.position()

    if (opening)      this.open()
    else if (closing) this.close()
    else  this.close(0)
  },

	render: function(){
    var style   = { overflow: 'hidden', position: 'fixed', zIndex: 1005 }
      , Content = mergePropsInto(
          { className: 'rw-popup rw-widget', style: { position: 'absolute' } }
        , this.props.children);

    Content.props.ref = this.props.children.props.ref;

		return (
      <div style={style}> 
        <PopupContent ref='content'>
          { Content }
        </PopupContent>
      </div>
		)
	},

  position: function(){
    var self    = this
      , $anim   = $(this.getDOMNode())
      , $anchor = $(this.props.getAnchor())
      , height  = this._height()
      , aOffset, aHeight, aWidth;

      aOffset = $anchor.offset()

      $anim.css({
        top:    aOffset.top + aOffset.height,
        left:   aOffset.left,
        width:  aOffset.width
      });
  },

  open: function(){
    var self = this
      , anim = this.getDOMNode()
      , el = $(this.refs.content.getDOMNode());

    this.props.onOpening()

    anim.style.display = 'block'

    el.animate({ translateY: 0 }, this.props.duration, function(){
      anim.style.overflow = 'visible'
      self.props.onOpen()
    })
  },

  close: function(dur){
    var self = this
      , el = $(this.refs.content.getDOMNode())
      , anim = this.getDOMNode()
      , ht = this._height()

    this.props.onClosing()
    anim.style.overflow = 'hidden'
    anim.style.height   = _.isNumber(ht) ? ht + 'px' : ht

    el.animate({ translateY: -ht + 'px' }, dur === undefined ? this.props.duration : dur, function(){
      anim.style.display = 'none'
      self.props.onClose()
    })
  },

  _height: function(){
    var ht = this.props.height 
      , nodeHt = this.refs.content.getDOMNode().scrollHeight

    return ht === 'auto' 
      ? nodeHt
      : (ht > nodeHt ? nodeHt : ht)
  }
})


var PopupContent = React.createClass({
  render: function(){
    return React.Children.only(this.props.children)
  }
})