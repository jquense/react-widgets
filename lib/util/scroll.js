'use strict';
var $ = require('./dom')

module.exports = function scrollTo( selected, scrollParent ) {
  var offset = $.offset(selected)
    , poff   = { top: 0, left: 0 }
    , list, scrollTop, selectedTop
    , selectedHeight, listHeight, bottom;

    if( !selected ) return 

    list       = scrollParent || $.scrollParent(selected) // if we know the parent skip this step for perf (maybe)
    scrollTop  = $.scrollTop(list)
    listHeight = $.height(list, true)

    if (!getWindow(list)) 
      poff = $.offset(list)

    offset     = {
      top:    offset.top  - poff.top,
      left:   offset.left - poff.left,
      height: offset.height,
      width:  offset.width
    }

    selectedHeight = offset.height
    selectedTop    = offset.top  + scrollTop
    bottom         = selectedTop + selectedHeight

    scrollTop = scrollTop > selectedTop
          ? selectedTop
          : bottom > (scrollTop + listHeight) 
              ? (bottom - listHeight)
              : scrollTop

    $.scrollTop(list, scrollTop)
}

function getWindow( node ) {
  return node === node.window
    ? node : node.nodeType === 9 && node.defaultView;
}