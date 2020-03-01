"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var PropTypes = require("prop-types");
var react_1 = require("react");
var BaseListbox_1 = require("./BaseListbox");
var ListOption_1 = require("./ListOption");
exports.CREATE_OPTION = {};
var propTypes = {
    searchTerm: PropTypes.string,
    focused: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    activeId: PropTypes.string
};
function AddToListOption(_a) {
    var onSelect = _a.onSelect, focused = _a.focused, children = _a.children, activeId = _a.activeId, props = __rest(_a, ["onSelect", "focused", "children", "activeId"]);
    return (<BaseListbox_1["default"] {...props} className="rw-list-option-create">
      <ListOption_1["default"] onSelect={onSelect} focused={focused} activeId={activeId} dataItem={exports.CREATE_OPTION} selected={false}>
        {children}
      </ListOption_1["default"]>
    </BaseListbox_1["default"]>);
}
AddToListOption.propTypes = propTypes;
exports["default"] = AddToListOption;
