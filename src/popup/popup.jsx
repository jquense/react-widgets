var React  = require('react')
  , cx  = require('../util/cx')
  , _   = require('lodash')
  , mergeIntoProps = require('../util/transferProps').mergeIntoProps
  , $ = require('../util/dom');

function childKey(children){
  var nextChildMapping = React.Children.map(children, function(c){ return c })
    , key;

  for(key in nextChildMapping)
    return key
}

module.exports = React.createClass({

	propTypes: {
		getAnchor:      React.PropTypes.func.isRequired,
    duration:       React.PropTypes.number,
    onRequestClose: React.PropTypes.func.isRequired,
    onClosing:      React.PropTypes.func,
    onOpening:      React.PropTypes.func,
    onClose:        React.PropTypes.func,
    onOpen:         React.PropTypes.func
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
    $.off(document, 'click', self._onClick)
    $.off(window, 'resize', self._resize)
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

      $.off(window, 'resize',  self._resize)
      $.off(document, 'click', self._onClick)

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
    var style   = _.extend({}, this.props.style || {}, { overflow: 'hidden', position: 'absolute', zIndex: 1005 })
      , Content = mergeIntoProps(
          { className: 'rw-popup rw-widget' }
        , this.props.children);

    Content.props.ref = this.props.children.props.ref;

		return (
      <div style={style} > 
        <PopupContent ref='content'>
          { Content }
        </PopupContent>
      </div>
		)
	},

  dimensions: function(){
    var el = this.getDOMNode();

    el.style.display = 'block'
    el.style.height  = $.height(this.refs.content.getDOMNode()) + 'px'
  },

  position: function(){
    var self    = this
      , aOffset = $.offset(this.props.getAnchor());

      $.css(this.getDOMNode(), {
        top:    aOffset.height - 1 + 'px',
        left:   -1 + 'px'
      });
  },

  open: function(){
    var self = this
      , anim = this.getDOMNode()
      , el   = this.refs.content.getDOMNode();

    this.ORGINAL_POSITION = el.style.position;
    
    this.dimensions()
    this.props.onOpening()

    el.style.position = 'absolute'

    $.animate(el
      , { top: 0 }
      , self.props.duration
      , function(){

        $.css(el, { position: self.ORGINAL_POSITION });

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

    this.ORGINAL_POSITION = el.style.position;
    this.dimensions()
    this.props.onClosing()

    anim.style.overflow = 'hidden'
    el.style.position = 'absolute'

    $.animate(el
      , { top: '-100%' }
      , dur === undefined ? this.props.duration : dur
      , function() {
        $.css(el, { position: self.ORGINAL_POSITION });
        
        anim.style.display = 'none'
        self.ORGINAL_POSITION = null
        self.props.onClose()
      })

  }

})


var PopupContent = React.createClass({
  render: function(){
    return React.Children.only(this.props.children)
  }
})