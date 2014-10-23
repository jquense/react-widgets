var $ = require('./dom')

module.exports = function scrollTo( selected ) {
  var offset = $.offset(selected)
    , poff   = { top: 0, left: 0 }
    , scrollTop, selectedTop, selectedHeight, listHeight, bottom;

    if( !selected ) return 

    list       = $.scrollParent(selected)
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