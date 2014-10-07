'use strict';

module.exports = function caret(el, start, end ){

  if ( start === undefined){
    return {
      start: el.selectionStart,
      end: el.selectionEnd
    }
  }

  el.focus();
  el.setSelectionRange(start, end)
}