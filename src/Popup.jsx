'use strict';
var React  = require('react')
  , $ = require('./util/dom')
  , config = require('./util/configuration')
  , cn = require('classnames')
  , compat = require('./util/compat');

var transform = config.animate.transform
  , support = !!config.animate.endEvent

function properties(prop, value){
  var TRANSLATION_MAP = config.animate.TRANSLATION_MAP
  
  if( TRANSLATION_MAP && TRANSLATION_MAP[prop])
    return { [transform]: `${TRANSLATION_MAP[prop]}(${value})` } 

  return { [prop]: value }
}

var PopupContent = React.createClass({
  render: function(){
    var child = this.props.children;

    if ( !child ) return <span className='rw-popup rw-widget' />

    child = React.Children.only(this.props.children)

    return compat.cloneElement(child, { 
      className: cn(child.props.className, 'rw-popup rw-widget') 
    });
  }
})


module.exports = React.createClass({

  displayName: 'Popup',

  propTypes: {
    open:           React.PropTypes.bool,
    dropUp:         React.PropTypes.bool,
    duration:       React.PropTypes.number,

    onRequestClose: React.PropTypes.func.isRequired,
    onClosing:      React.PropTypes.func,
    onOpening:      React.PropTypes.func,
    onClose:        React.PropTypes.func,
    onOpen:         React.PropTypes.func
  },

  getInitialState(){ return {} },

  getDefaultProps(){
    return {
      duration:    200,
      open:        false,
      onClosing:   function(){},
      onOpening:   function(){},
      onClose:     function(){},
      onOpen:      function(){},
    }
  },

  // componentDidMount(){
  //   !this.props.open && this.close(0)
  // },
  componentWillMount(){
    !this.props.open && (this._initialPosition = true)
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
    })
  },

  componentDidUpdate(pvProps, pvState){
    var closing =  pvProps.open && !this.props.open
      , opening = !pvProps.open && this.props.open
      , open    =  this.props.open;

    if (opening)      this.open()
    else if (closing) this.close()
    else if (open)    this.height()
  },

  render() {
    var { 
        className
      , open
      , dropUp
      , ...props } = this.props
      , display = open ? 'block' : void 0
      , styles = {};

    if (this._initialPosition) {
      display = 'none'
    }

    return (
      <div {...props} 
        style={{ 
          display,
          height: this.state.height,
          ...props.style 
        }} 
        className={cn(className, "rw-popup-container", { "rw-dropup": dropUp })}
      >
        <PopupContent ref='content'>
          { this.props.children }
        </PopupContent>
      </div>
    )
  },

  reset(){
    var container = compat.findDOMNode(this)
      , content   = compat.findDOMNode(this.refs.content)
      , style = { display: 'block', overflow: 'hidden'}
    
    $.css(container, style)
    this.height();
    $.css(content, properties('top', this.props.dropUp ? '100%' : '-100%'))
  },

  height(){
    var el = compat.findDOMNode(this)
      , content = compat.findDOMNode(this.refs.content)
      , margin = parseInt($.css(content, 'margin-top'), 10)
               + parseInt($.css(content, 'margin-bottom'), 10);

    var height = $.height(content) + (isNaN(margin) ? 0 : margin )

    if( this.state.height !== height) {
      el.style.height  = height + 'px'
      this.setState({ height })
    }
  },

  open() {
    var self = this
      , anim = compat.findDOMNode(this)
      , el   = compat.findDOMNode(this.refs.content);

    this.ORGINAL_POSITION = $.css(el, 'position')
    this._isOpening = true

    if (this._initialPosition) {
      this._initialPosition = false
      this.reset();
    }
    else
      this.height()

    this.props.onOpening()

    anim.className += ' rw-popup-animating'
    el.style.position = 'absolute'

    config.animate(el
      , { top: 0 }
      , self.props.duration
      , 'ease'
      , function(){
          if ( !self._isOpening ) return

          anim.className = anim.className.replace(/ ?rw-popup-animating/g, '')

          el.style.position = self.ORGINAL_POSITION
          anim.style.overflow = 'visible'
          self.ORGINAL_POSITION = null

          self.props.onOpen()
        })
  },

  close(dur) {
    var self = this
      , el   = compat.findDOMNode(this.refs.content)
      , anim = compat.findDOMNode(this);

    this.ORGINAL_POSITION = $.css(el, 'position')

    this._isOpening = false
    this.height()
    this.props.onClosing()

    anim.style.overflow = 'hidden'
    anim.className += ' rw-popup-animating'
    el.style.position = 'absolute'

    config.animate(el
      , { top: this.props.dropUp ? '100%' : '-100%' }
      , dur === undefined ? this.props.duration : dur
      , 'ease'
      , function() {
          if ( self._isOpening ) return

          el.style.position = self.ORGINAL_POSITION
          anim.className = anim.className.replace(/ ?rw-popup-animating/g, '')

          anim.style.display = 'none'
          self.ORGINAL_POSITION = null
          self.props.onClose()
        })
  }

})


function childKey(children){
  var nextChildMapping = React.Children.map(children, c => c );
  for(var key in nextChildMapping) return key
}