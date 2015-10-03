/*eslint-disable no-empty */
'use strict';

module.exports = function caret(el, start, end) {
  if (start === undefined) return get(el);

  set(el, start, end);
};

function get(el) {
  var start, end, rangeEl, clone;

  if (el.selectionStart !== undefined) {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else {
    try {
      el.focus();
      rangeEl = el.createTextRange();
      clone = rangeEl.duplicate();

      rangeEl.moveToBookmark(document.selection.createRange().getBookmark());
      clone.setEndPoint('EndToStart', rangeEl);

      start = clone.text.length;
      end = start + rangeEl.text.length;
    } catch (e) {/* not focused or not visible */}
  }

  return { start: start, end: end };
}

function set(el, start, end) {
  var rangeEl;

  try {
    if (el.selectionStart !== undefined) {
      el.focus();
      el.setSelectionRange(start, end);
    } else {
      el.focus();
      rangeEl = el.createTextRange();
      rangeEl.collapse(true);
      rangeEl.moveStart('character', start);
      rangeEl.moveEnd('character', end - start);
      rangeEl.select();
    }
  } catch (e) {/* not focused or not visible */}
}