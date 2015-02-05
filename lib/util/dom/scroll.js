"use strict";
var _require = require("./dimensions");

var getOffset = _require.offset;
var height = _require.height;
var getScrollParent = require("./scrollParent");
var scrollTop = require("./scrollTop");
var raf = require("./requestAnimationFrame");

module.exports = function scrollTo(selected, scrollParent) {
    var offset = getOffset(selected),
        poff = { top: 0, left: 0 },
        list,
        listScrollTop,
        selectedTop,
        isWin,
        selectedHeight,
        listHeight,
        bottom;

    if (!selected) return;

    list = scrollParent || getScrollParent(selected);
    isWin = getWindow(list);
    listScrollTop = scrollTop(list);

    listHeight = height(list, true);
    isWin = getWindow(list);

    if (!isWin) poff = getOffset(list);

    offset = {
        top: offset.top - poff.top,
        left: offset.left - poff.left,
        height: offset.height,
        width: offset.width
    };


    selectedHeight = offset.height;
    selectedTop = offset.top + (isWin ? 0 : listScrollTop);
    bottom = selectedTop + selectedHeight;

    listScrollTop = listScrollTop > selectedTop ? selectedTop : bottom > listScrollTop + listHeight ? bottom - listHeight : listScrollTop;

    var id = raf(function () {
        return scrollTop(list, listScrollTop);
    });

    return function () {
        return raf.cancel(id);
    };
};

function getWindow(node) {
    return node === node.window ? node : node.nodeType === 9 && node.defaultView;
}