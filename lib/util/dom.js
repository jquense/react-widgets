"use strict";
var has = Object.prototype.hasOwnProperty
  , transitionTiming, transitionDuration
  , transitionProperty, transitionDelay
  , notSupported, endEvent
  , prefix = ''
  , el = document.createElement('div')
  , reset = {}
  , transitions = {
      O:'otransitionend',
      Moz:'transitionend',
      Webkit:'webkitTransitionEnd'
    };

for(var vendor in transitions) if( has.call(transitions, vendor) )
{
  if (el.style[vendor + 'TransitionProperty'] !== undefined) {
    prefix = '-' + vendor.toLowerCase() + '-'
    endEvent = transitions[vendor];
    break
  }
}

if (!endEvent && el.style.transitionProperty !== undefined)
  endEvent = 'transitionend'

notSupported = !endEvent

reset[transitionProperty = prefix + 'transition-property'] =
reset[transitionDuration = prefix + 'transition-duration'] =
reset[transitionDelay    = prefix + 'transition-delay'] =
reset[transitionTiming   = prefix + 'transition-timing-function'] = ''

var DOM = module.exports = {

  width: function(node, client){
    var win = getWindow(node)
    return win ? win.innerWidth : client ? node.clientWidth : DOM.offset(node).width
  },

  height: function(node, client){
    var win = getWindow(node)
    return win ? win.innerHeight : client ? node.clientHeight : DOM.offset(node).height
  },

  hasFocus: function(node){
    var doc = node.ownerDocument

    if ( doc.activeElement == null) return false
    return doc.activeElement === node
  },

  offset: function (node) {
    var doc     = node.ownerDocument
      , docElem = doc && doc.documentElement
      , box     = { top: 0, left: 0 };

    if ( !docElem ) return

    if ( !DOM.contains(docElem, node))
      return box

    if ( node.getBoundingClientRect !== undefined )
      box = node.getBoundingClientRect();

    return {
      top: box.top + window.pageYOffset - docElem.clientTop,
      left: box.left + window.pageXOffset - docElem.clientLeft,
      width: box.width || node.offsetWidth,
      height: box.height || node.offsetHeight,
    };
  },

  css: function(node, property, value){
      var css = ''
        , props = property;

      if ( typeof property === 'string') {
        if ( value === undefined)
          return node.style[camelize(property)] || getComputedStyle(node).getPropertyValue(property)
        else
          (props = {})[property] = value
      }

      for(var key in props) if ( has.call(props, key) ) 
      {
        !props[key] && props[key] !== 0
          ? node.style.removeProperty(dasherize(key))
          : (css += dasherize(key) + ':' + props[key] + ';')
      }

      node.style.cssText += ';' + css
  },

  contains: (function(){
    var root = document.documentElement

    return (root && root.contains)
      ? function(context, node){ return context.contains(node); }
      : (root && root.compareDocumentPosition)
          ? function(context, node){
            return context === node || !!(context.compareDocumentPosition(node) & 16);
          }
          : function(context, node){
            if (node) do {
              if (node === context) return true;
            } while ((node = node.parentNode));

            return false;
          }
  })(),

  scrollParent: function(node){
    var position = DOM.css(node, "position" )
      , excludeStatic = position === "absolute";

    if (position === 'fixed') 
      return node.ownerDocument || document

    while ( (node = node.parentNode) && node.nodeType !== 9){
      var isStatic = excludeStatic && DOM.css(node, "position" ) === "static"
        , style    = DOM.css(node, 'overflow') 
                   + DOM.css(node, 'overflow-y') 
                   + DOM.css(node, 'overflow-x');

      if (isStatic) continue
      if ( (/(auto|scroll)/).test(style) && DOM.height(node) < node.scrollHeight )
        return node
    }

    return node.ownerDocument || document
  },

  scrollTop: function(node, val){
    var win = getWindow(node);

    if ( val === undefined )
      return win 
        ? ('pageYOffset' in win) 
          ? win.pageYOffset
          : win.document.documentElement.scrollTop 
        : node.scrollTop;
    
    if ( win ) 
      win.scrollTo(('pageXOffset' in win) 
        ? win.pageXOffset 
        : win.document.documentElement.scrollLeft, val)
    else       
      node.scrollTop = val
  },


  on: function(node, eventName, handler){
    if (node.addEventListener)
      node.addEventListener(eventName, handler, false);

    else if (node.attachEvent)
      node.attachEvent('on' + eventName, handler);

    else
      node['on' + eventName] = handler;
  },

  off: function(node, eventName, handler){
    if (node.addEventListener)
      node.removeEventListener(eventName, handler, false);
    else if (node.attachEvent)
      node.detachEvent('on' + eventName, handler);
    else
      node['on' + eventName] = null;
  },

  trigger: function(node, type){
    var event = document.createEvent('Events')
    event.initEvent(type, true, true)
    node.dispatchEvent(event);
  },

  /* code in part from: Zepto 1.1.4 | zeptojs.com/license */
  // super lean animate function for transitions
  // doesn't support translations to keep it matching the jquery API
  animate: function(node, properties, duration, easing, callback){
    var cssProperties = []
      , fakeEvent = { target: node, currentTarget: node }
      , cssValues = {}
      , fired;

    if ( typeof easing === 'function' )
      callback = easing, easing = null

    if ( notSupported )           duration = 0
    if ( duration === undefined ) duration = 200

    for(var key in properties) if ( has.call(properties, key) ) {
      cssValues[key] = properties[key]
      cssProperties.push(dasherize(key))
    }

    if (duration > 0 ) {
      cssValues[transitionProperty] = cssProperties.join(', ')
      cssValues[transitionDuration] = (duration / 1000) + 's'
      cssValues[transitionDelay]    = 0 + 's'
      cssValues[transitionTiming]   = easing || 'linear'

      DOM.on(node, endEvent, done)

      setTimeout(function(){
        if (!fired) done(fakeEvent)
      }, duration + 25)
    }

    // trigger page reflow
    node.clientLeft

    DOM.css(node, cssValues)

    if (duration <= 0)
      setTimeout(done.bind(null, fakeEvent), 0)

    function done(event) {
      if (event.target !== event.currentTarget) return

      fired = true

      DOM.off(event.target, endEvent, done)
      DOM.css(node, reset)
      callback && callback.call(this)
    }
  }
}

function getWindow( node ) {
  return node === node.window
    ? node : node.nodeType === 9 && node.defaultView;
}

function camelize(str){
  return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' })
}

function dasherize(str) {
  return str.replace(/[A-Z]/g, function(char, index) {
    return (index !== 0 ? '-' : '') + char.toLowerCase();
  });
}

function getComputedStyle(node) {
  return node.ownerDocument.defaultView.opener
    ? node.ownerDocument.defaultView.getComputedStyle( node, null )
    : window.getComputedStyle(node, null);
}
