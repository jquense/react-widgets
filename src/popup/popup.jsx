var React  = require('react/addons')
  , cx     = React.addons.classSet
  , events = require('../util/events')
  , _ = require('lodash')
  , mergePropsInto = require('../util/transferProps')
  , $ = require('$');

function childKey(children){
  var nextChildMapping = React.Children.map(children, function(c){ return c })
    , key;

  for(key in nextChildMapping)
    return key
}

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
          , clickedPopup = $.contains(node, e.target)
          , clickedAnchor = $.contains(self.props.getAnchor(), e.target)

        if ( self.props.open && !clickedAnchor && !clickedPopup && !detached )
          self.props.onRequestClose()
      }

      self._resize = _.throttle(this.position.bind(this), 100)

      $(window).on('resize',  self._resize)
      $(document).on('click', self._onClick)

      this.position()
      this.close(0)
	},

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
    })
  },

  componentDidUpdate: function(pvProps, pvState){
    var self = this
      , closing =  pvProps.open && !this.props.open
      , opening = !pvProps.open && this.props.open
      , same    = pvProps.open === this.props.open;

    this.position()

    if (opening)      self.open()
    else if (closing) self.close()
  },

	render: function(){
    var style   = _.extend({}, this.props.style || {}, { overflow: 'hidden', position: 'fixed', zIndex: 1005 })
      , Content = mergePropsInto(
          { className: 'rw-popup rw-widget' }
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

  dimensions: function(){
    var el = $(this.refs.content.getDOMNode())
      , anim = this.getDOMNode()

    anim.style.display = 'block'
    anim.style.height  = el.height() + 'px'
    anim.style.width   = el.width() + 'px'
  },

  position: function(){
    var self    = this
      , $anim   = $(this.getDOMNode())
      , $anchor = $(this.props.getAnchor())
      , aOffset, aHeight, aWidth;

      aOffset = $anchor.offset()

      $anim.css({
        top:    aOffset.top + aOffset.height - 1,
        left:   aOffset.left,
       // width:  aOffset.width
      });
  },

  open: function(){
    var self = this
      , anim = this.getDOMNode()
      , el = $(this.refs.content.getDOMNode());

    this.ORGINAL_POSITION = el.css('position');
    
    this.dimensions()
    this.props.onOpening()

    el.css('position', 'absolute')
      .animate({ translateY: 0 }, self.props.duration, function(){
        el.css('position', self.ORGINAL_POSITION || 'static');
        anim.style.overflow = 'visible'
        self.ORGINAL_POSITION = null
        self.props.onOpen()
      })
  },

  close: function(dur){
    var self = this
      , el = $(this.refs.content.getDOMNode())
      , anim = this.getDOMNode()
      , ht   = anim.style.height //this._height()

    this.ORGINAL_POSITION = el.css('position');
    this.dimensions()

    this.props.onClosing()

    anim.style.overflow = 'hidden'
    
    el.css('position', 'absolute')
      .animate({ translateY: '-100%' }, dur === undefined ? this.props.duration : dur, function() {
        el.css('position', self.ORGINAL_POSITION || 'static');
        
        anim.style.display = 'none'
        self.ORGINAL_POSITION = null
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