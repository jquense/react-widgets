'use strict';
var $ = require('./dom')
  , raf = require('raf-component')

module.exports = function scrollTo( selected, scrollParent ) {
  var offset = $.offset(selected)
    , poff   = { top: 0, left: 0 }
    , list, scrollTop, selectedTop, isWin
    , selectedHeight, listHeight, bottom;

    if( !selected ) return 

    list       = scrollParent || $.scrollParent(selected) // if we know the parent skip this step for perf (maybe)

    isWin      = getWindow(list)
    scrollTop  = $.scrollTop(list)

    listHeight = $.height(list, true)
    isWin      = getWindow(list)

    if (!isWin) 
      poff = $.offset(list)

    offset     = {
      top:    offset.top  - poff.top,
      left:   offset.left - poff.left,
      height: offset.height,
      width:  offset.width
    }

    
    selectedHeight = offset.height
    selectedTop    = offset.top  + (isWin ? 0 : scrollTop)
    bottom         = selectedTop + selectedHeight

    scrollTop = scrollTop > selectedTop
          ? selectedTop
          : bottom > (scrollTop + listHeight) 
              ? (bottom - listHeight)
              : scrollTop

    var id = raf(function()  {return $.scrollTop(list, scrollTop);})

    // raf-component throws an error in ie8 does not like when you windows.call()
    return function()  {return window[cancel](id);}
}

var cancel;
var keys = [
      'cancelAnimationFrame'
    , 'webkitCancelAnimationFrame'
    , 'mozCancelAnimationFrame'
    , 'oCancelAnimationFrame'
    , 'msCancelAnimationFrame'
    , 'clearTimeout'
    ];

for (var i = 0; i < keys.length; i++)
  if ( keys[i] in window){
    cancel = keys[i]
    break
  }


function getWindow( node ) {
  return node === node.window
    ? node : node.nodeType === 9 && node.defaultView;
}
