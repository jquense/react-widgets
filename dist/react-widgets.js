<<<<<<< HEAD
/*! v"2.8.0" | (c) 2015 Jason Quense | https://github.com/jquense/react-widgets/blob/master/License.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),function(){try{return require("Globalize")}catch(e){}}()):"function"==typeof define&&define.amd?define(["react","Globalize"],t):"object"==typeof exports?exports.ReactWidgets=t(require("react"),function(){try{return require("Globalize")}catch(e){}}()):e.ReactWidgets=t(e.React,e.Globalize)}(this,function(e,t){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";e.exports={DropdownList:n(1),Combobox:n(55),Calendar:n(59),DateTimePicker:n(72),NumberPicker:n(75),Multiselect:n(78),SelectList:n(82),configure:n(83),utils:{ReplaceTransitionGroup:n(70),SlideTransition:n(69)}}},function(e,t,n){"use strict";function r(e){return a._extends({open:"open dropdown",filterPlaceholder:"",emptyList:"There are no items in this list",emptyFilter:"The filter returned no results"},e)}var a=n(2),i=n(3),s=a.interopRequireDefault(i),o=n(4),u=a.interopRequireDefault(o),l=n(5),p=a.interopRequireDefault(l),d=n(7),c=a.interopRequireDefault(d),f=n(8),h=a.interopRequireDefault(f),m=n(9),y=a.interopRequireDefault(m),v=n(30),g=a.interopRequireDefault(v),b=n(31),D=a.interopRequireDefault(b),T=n(33),w=a.interopRequireDefault(T),x=n(39),_=a.interopRequireDefault(x),O=n(42),P=a.interopRequireDefault(O),k=n(43),I=a.interopRequireDefault(k),R=n(35),E=n(45),C=n(36),N=h["default"].omit,q=h["default"].pick,F=h["default"].result,S={value:s["default"].PropTypes.any,onChange:s["default"].PropTypes.func,open:s["default"].PropTypes.bool,onToggle:s["default"].PropTypes.func,data:s["default"].PropTypes.array,valueField:s["default"].PropTypes.string,textField:D["default"].accessor,valueComponent:D["default"].elementType,itemComponent:D["default"].elementType,listComponent:D["default"].elementType,groupComponent:D["default"].elementType,groupBy:D["default"].accessor,onSelect:s["default"].PropTypes.func,searchTerm:s["default"].PropTypes.string,onSearch:s["default"].PropTypes.func,busy:s["default"].PropTypes.bool,delay:s["default"].PropTypes.number,dropUp:s["default"].PropTypes.bool,duration:s["default"].PropTypes.number,disabled:D["default"].disabled,readOnly:D["default"].readOnly,messages:s["default"].PropTypes.shape({open:D["default"].message,emptyList:D["default"].message,emptyFilter:D["default"].message,filterPlaceholder:D["default"].message})},A=s["default"].createClass(a.createDecoratedObject([{key:"displayName",initializer:function(){return"DropdownList"}},{key:"mixins",initializer:function(){return[n(46),n(47),n(48),n(49),n(54),n(38)()]}},{key:"propTypes",initializer:function(){return S}},{key:"getDefaultProps",value:function(){return{delay:500,value:"",open:!1,data:[],searchTerm:"",messages:r(),ariaActiveDescendantKey:"dropdownlist"}}},{key:"getInitialState",value:function(){var e=this.props,t=e.open,n=e.filter,r=e.value,a=e.data,i=e.searchTerm,s=e.valueField,o=n?this.filter(a,i):a,u=R.dataIndexOf(a,r,s);return{filteredData:t&&n?o:null,selectedItem:o[u],focusedItem:o[u]||a[0]}}},{key:"componentDidUpdate",value:function(){this.refs.list&&P["default"](this.refs.list)}},{key:"componentWillReceiveProps",value:function(e){var t=e.open,n=e.filter,r=e.value,a=e.data,i=e.searchTerm,s=e.valueField,o=n?this.filter(a,i):a,u=R.dataIndexOf(a,r,s);this.setState({filteredData:t&&n?o:null,selectedItem:o[u],focusedItem:o[~u?u:0]})}},{key:"render",value:function(){var e,t=this,n=this.props,i=n.className,o=n.tabIndex,u=n.filter,l=n.valueField,p=n.textField,d=n.groupBy,f=n.messages,h=n.data,m=n.busy,v=n.dropUp,b=n.placeholder,D=n.value,T=n.open,x=n.disabled,O=n.readOnly,P=n.valueComponent,k=n.listComponent;k=k||d&&_["default"]||w["default"];var I=N(this.props,Object.keys(S)),E=q(this.props,Object.keys(g["default"].type(k).propTypes)),A=q(this.props,Object.keys(g["default"].type(y["default"]).propTypes)),L=this.state,M=L.focusedItem,U=L.selectedItem,z=L.focused,V=this._data(),j=R.dataItem(h,D,l),K=C.instanceId(this,"__listbox"),W=C.isFirstFocusedRender(this)||T;return f=r(f),s["default"].createElement("div",a._extends({},I,{ref:"input",role:"combobox",tabIndex:o||"0","aria-expanded":T,"aria-haspopup":!0,"aria-owns":K,"aria-busy":!!m,"aria-live":!T&&"polite","aria-autocomplete":"list","aria-disabled":x,"aria-readonly":O,onKeyDown:this._keyDown,onClick:this._click,onFocus:this._focus.bind(null,!0),onBlur:this._focus.bind(null,!1),className:c["default"](i,"rw-dropdownlist","rw-widget",(e={"rw-state-disabled":x,"rw-state-readonly":O,"rw-state-focus":z,"rw-rtl":this.isRtl()},e["rw-open"+(v?"-up":"")]=T,e))}),s["default"].createElement("span",{className:"rw-dropdownlist-picker rw-select rw-btn"},s["default"].createElement("i",{className:"rw-i rw-i-caret-down"+(m?" rw-loading":"")},s["default"].createElement("span",{className:"rw-sr"},F(f.open,this.props)))),s["default"].createElement("div",{className:"rw-input"},!j&&b?s["default"].createElement("span",{className:"rw-placeholder"},b):this.props.valueComponent?s["default"].createElement(P,{item:j}):R.dataText(j,p)),s["default"].createElement(y["default"],a._extends({},A,{onOpen:function(){return t.focus()},onOpening:function(){return t.refs.list.forceUpdate()},onRequestClose:this.close}),s["default"].createElement("div",null,u&&this._renderFilter(f),W&&s["default"].createElement(k,a._extends({ref:"list"},E,{data:V,id:K,"aria-live":T&&"polite","aria-labelledby":C.instanceId(this),"aria-hidden":!this.props.open,selected:U,focused:T?M:null,onSelect:this._onSelect,onMove:this._scrollTo,messages:{emptyList:h.length?f.emptyFilter:f.emptyList}})))))}},{key:"_renderFilter",value:function(e){var t=this;return s["default"].createElement("div",{ref:"filterWrapper",className:"rw-filter-input"},s["default"].createElement("span",{className:"rw-select rw-btn"},s["default"].createElement("i",{className:"rw-i rw-i-search"})),s["default"].createElement("input",{ref:"filter",className:"rw-input",placeholder:h["default"].result(e.filterPlaceholder,this.props),value:this.props.searchTerm,onChange:function(e){return C.notify(t.props.onSearch,e.target.value)}}))}},{key:"_focus",decorators:[E.widgetEnabled],value:function(e,t){var n=this;this.setTimeout("focus",function(){e||n.close(),e!==n.state.focused&&(C.notify(n.props[e?"onFocus":"onBlur"],t),n.setState({focused:e}))})}},{key:"_onSelect",decorators:[E.widgetEditable],value:function(e){this.close(),C.notify(this.props.onSelect,e),this.change(e),this.focus(this)}},{key:"_click",decorators:[E.widgetEditable],value:function(e){var t=this.refs.filterWrapper;this.props.filter&&this.props.open?p["default"](g["default"].findDOMNode(t),e.target)||this.close():this.toggle(),C.notify(this.props.onClick,e)}},{key:"_keyDown",decorators:[E.widgetEditable],value:function(e){function t(e,t){e&&(t?r._onSelect(e):r.change(e))}var n=this,r=this,a=e.key,i=e.altKey,s=this.refs.list,o=this.props.filter,u=this.state.focusedItem,l=this.state.selectedItem,p=this.props.open,d=function(){n.close(),g["default"].findDOMNode(n).focus()};"End"===a?(p?this.setState({focusedItem:s.last()}):t(s.last()),e.preventDefault()):"Home"===a?(p?this.setState({focusedItem:s.first()}):t(s.first()),e.preventDefault()):"Escape"===a&&p?d():("Enter"===a||" "===a&&!o)&&p?t(this.state.focusedItem,!0):"ArrowDown"===a?(i?this.open():p?this.setState({focusedItem:s.next(u)}):t(s.next(l)),e.preventDefault()):"ArrowUp"===a?(i?d():p?this.setState({focusedItem:s.prev(u)}):t(s.prev(l)),e.preventDefault()):this.props.filter&&p||this.search(String.fromCharCode(e.keyCode),function(e){p?n.setState({focusedItem:e}):t(e)}),C.notify(this.props.onKeyDown,[e])}},{key:"change",value:function(e){h["default"].isShallowEqual(e,this.props.value)||(C.notify(this.props.onChange,e),C.notify(this.props.onSearch,""),this.close())}},{key:"focus",value:function(e){var t=e||(this.props.filter&&this.props.open?this.refs.filter:this.refs.input);u["default"]()!==g["default"].findDOMNode(t)&&g["default"].findDOMNode(t).focus()}},{key:"_data",value:function(){return this.state.filteredData||this.props.data.concat()}},{key:"search",value:function(e,t){var n=this,r=((this._searchTerm||"")+e).toLowerCase();this._searchTerm=r,this.setTimeout("search",function(){var e=n.refs.list,a=n.props.open?"focusedItem":"selectedItem",i=e.next(n.state[a],r);n._searchTerm="",i&&t(i)},this.props.delay)}},{key:"open",value:function(){C.notify(this.props.onToggle,!0)}},{key:"close",value:function(){C.notify(this.props.onToggle,!1)}},{key:"toggle",value:function(){this.props.open?this.close():this.open()}}]));e.exports=I["default"](A,{open:"onToggle",value:"onChange",searchTerm:"onSearch"}),e.exports.BaseDropdownList=A},function(e,t,n){var r,a,i;!function(n,s){a=[t],r=s,i="function"==typeof r?r.apply(t,a):r,!(void 0!==i&&(e.exports=i))}(void 0,function(e){var t=e;t.createDecoratedObject=function(e){for(var t={},n=0;n<e.length;n++){var r=e[n],a=r.decorators,i=r.key;if(delete r.key,delete r.decorators,r.enumerable=!0,r.configurable=!0,("value"in r||r.initializer)&&(r.writable=!0),a)for(var s=0;s<a.length;s++){var o=a[s];if("function"!=typeof o)throw new TypeError("The decorator for method "+r.key+" is of the invalid type "+typeof o);r=o(t,i,r)||r}r.initializer&&(r.value=r.initializer.call(t)),Object.defineProperty(t,i,r)}return t},t.objectWithoutProperties=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},t.interopRequireWildcard=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t},t.interopRequireDefault=function(e){return e&&e.__esModule?e:{"default":e}},t._extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},t.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}})},function(t,n){t.exports=e},function(e,t){function n(){try{return document.activeElement||document.body}catch(e){return document.body}}e.exports=n},function(e,t,n){"use strict";var r=n(6),a=function(){var e=r&&document.documentElement;return e&&e.contains?function(e,t){return e.contains(t)}:e&&e.compareDocumentPosition?function(e,t){return e===t||!!(16&e.compareDocumentPosition(t))}:function(e,t){if(t)do if(t===e)return!0;while(t=t.parentNode);return!1}}();e.exports=a},function(e,t){"use strict";e.exports=!("undefined"==typeof window||!window.document||!window.document.createElement)},function(e,t,n){var r;/*!
=======
/*! (c) 2015 Jason Quense | https://github.com/jquense/react-widgets/blob/master/License.txt */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define([, ], factory);
	else if(typeof exports === 'object')
		exports["ReactWidgets"] = factory(require("react"), require("react-dom"));
	else
		root["ReactWidgets"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_32__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var babelHelpers = __webpack_require__(2);

	var configure = __webpack_require__(3);

	if (process.env.NODE_ENV !== 'production') {
	  [Array.prototype.some, Array.prototype.filter, Array.prototype.reduce].forEach(function (method) {
	    if (!method) throw new Error('One or more ES5 features is not available to ReactWidgets: http://jquense.github.io/react-widgets/docs/#/getting-started/browser');
	  });
	}

	module.exports = babelHelpers._extends({}, configure, {
	  DropdownList: __webpack_require__(22),
	  Combobox: __webpack_require__(57),
	  Calendar: __webpack_require__(61),
	  DateTimePicker: __webpack_require__(75),
	  NumberPicker: __webpack_require__(78),
	  Multiselect: __webpack_require__(81),
	  SelectList: __webpack_require__(84),

	  utils: {
	    ReplaceTransitionGroup: __webpack_require__(73),
	    SlideTransition: __webpack_require__(72)
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === "object") {
	    factory(exports);
	  } else {
	    factory(root.babelHelpers = {});
	  }
	})(this, function (global) {
	  var babelHelpers = global;

	  babelHelpers.createDecoratedObject = function (descriptors) {
	    var target = {};

	    for (var i = 0; i < descriptors.length; i++) {
	      var descriptor = descriptors[i];
	      var decorators = descriptor.decorators;
	      var key = descriptor.key;
	      delete descriptor.key;
	      delete descriptor.decorators;
	      descriptor.enumerable = true;
	      descriptor.configurable = true;
	      if ("value" in descriptor || descriptor.initializer) descriptor.writable = true;

	      if (decorators) {
	        for (var f = 0; f < decorators.length; f++) {
	          var decorator = decorators[f];

	          if (typeof decorator === "function") {
	            descriptor = decorator(target, key, descriptor) || descriptor;
	          } else {
	            throw new TypeError("The decorator for method " + descriptor.key + " is of the invalid type " + typeof decorator);
	          }
	        }
	      }

	      if (descriptor.initializer) {
	        descriptor.value = descriptor.initializer.call(target);
	      }

	      Object.defineProperty(target, key, descriptor);
	    }

	    return target;
	  };

	  babelHelpers.objectWithoutProperties = function (obj, keys) {
	    var target = {};

	    for (var i in obj) {
	      if (keys.indexOf(i) >= 0) continue;
	      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	      target[i] = obj[i];
	    }

	    return target;
	  };

	  babelHelpers.interopRequireWildcard = function (obj) {
	    if (obj && obj.__esModule) {
	      return obj;
	    } else {
	      var newObj = {};

	      if (obj != null) {
	        for (var key in obj) {
	          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	        }
	      }

	      newObj["default"] = obj;
	      return newObj;
	    }
	  };

	  babelHelpers.interopRequireDefault = function (obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  };

	  babelHelpers._extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };
	})

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _utilConfiguration = __webpack_require__(4);

	var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

	var _utilLocalizers = __webpack_require__(18);

	var localizers = babelHelpers.interopRequireWildcard(_utilLocalizers);
	exports['default'] = {

	  setAnimate: function setAnimate(animatefn) {
	    _utilConfiguration2['default'].animate = animatefn;
	  },

	  setLocalizers: function setLocalizers(_ref) {
	    var date = _ref.date;
	    var number = _ref.number;

	    date && this.setDateLocalizer(date);
	    number && this.setNumberLocalizer(number);
	  },

	  setDateLocalizer: localizers.setDate,

	  setNumberLocalizer: localizers.setNumber
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _domAnimate = __webpack_require__(5);

	var _domAnimate2 = babelHelpers.interopRequireDefault(_domAnimate);

	exports['default'] = { animate: _domAnimate2['default'] };
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports['default'] = animate;

	var _domHelpersUtilHyphenate = __webpack_require__(6);

	var _domHelpersUtilHyphenate2 = babelHelpers.interopRequireDefault(_domHelpersUtilHyphenate);

	var _domHelpersStyle = __webpack_require__(7);

	var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

	var _domHelpersEventsOn = __webpack_require__(14);

	var _domHelpersEventsOn2 = babelHelpers.interopRequireDefault(_domHelpersEventsOn);

	var _domHelpersEventsOff = __webpack_require__(16);

	var _domHelpersEventsOff2 = babelHelpers.interopRequireDefault(_domHelpersEventsOff);

	var _domHelpersTransitionProperties = __webpack_require__(17);

	var _domHelpersTransitionProperties2 = babelHelpers.interopRequireDefault(_domHelpersTransitionProperties);

	var has = Object.prototype.hasOwnProperty,
	    reset = {},
	    TRANSLATION_MAP = {
	  left: 'translateX',
	  right: 'translateX',
	  top: 'translateY',
	  bottom: 'translateY'
	};

	reset[_domHelpersTransitionProperties2['default'].property] = reset[_domHelpersTransitionProperties2['default'].duration] = reset[_domHelpersTransitionProperties2['default'].delay] = reset[_domHelpersTransitionProperties2['default'].timing] = '';

	animate.endEvent = _domHelpersTransitionProperties2['default'].end;
	animate.transform = _domHelpersTransitionProperties2['default'].transform;
	animate.TRANSLATION_MAP = TRANSLATION_MAP;

	// super lean animate function for transitions
	// doesn't support all translations to keep it matching the jquery API
	/**
	 * code in part from: Zepto 1.1.4 | zeptojs.com/license
	 */

	function animate(node, properties, duration, easing, callback) {
	  var cssProperties = [],
	      fakeEvent = { target: node, currentTarget: node },
	      cssValues = {},
	      transforms = '',
	      fired;

	  if (typeof easing === 'function') callback = easing, easing = null;

	  if (!_domHelpersTransitionProperties2['default'].end) duration = 0;
	  if (duration === undefined) duration = 200;

	  for (var key in properties) if (has.call(properties, key)) {
	    if (/(top|bottom)/.test(key)) transforms += TRANSLATION_MAP[key] + '(' + properties[key] + ') ';else {
	      cssValues[key] = properties[key];
	      cssProperties.push(_domHelpersUtilHyphenate2['default'](key));
	    }
	  }

	  if (transforms) {
	    cssValues[_domHelpersTransitionProperties2['default'].transform] = transforms;
	    cssProperties.push(_domHelpersTransitionProperties2['default'].transform);
	  }

	  if (duration > 0) {
	    cssValues[_domHelpersTransitionProperties2['default'].property] = cssProperties.join(', ');
	    cssValues[_domHelpersTransitionProperties2['default'].duration] = duration / 1000 + 's';
	    cssValues[_domHelpersTransitionProperties2['default'].delay] = 0 + 's';
	    cssValues[_domHelpersTransitionProperties2['default'].timing] = easing || 'linear';

	    _domHelpersEventsOn2['default'](node, _domHelpersTransitionProperties2['default'].end, done);

	    setTimeout(function () {
	      if (!fired) done(fakeEvent);
	    }, duration + 500);
	  }

	  node.clientLeft; // trigger page reflow
	  _domHelpersStyle2['default'](node, cssValues);

	  if (duration <= 0) setTimeout(done.bind(null, fakeEvent), 0);

	  function done(event) {
	    if (event.target !== event.currentTarget) return;

	    fired = true;
	    _domHelpersEventsOff2['default'](event.target, _domHelpersTransitionProperties2['default'].end, done);
	    _domHelpersStyle2['default'](node, reset);
	    callback && callback.call(this);
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var rUpper = /([A-Z])/g;

	module.exports = function hyphenate(string) {
	  return string.replace(rUpper, '-$1').toLowerCase();
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var camelize = __webpack_require__(8),
	    hyphenate = __webpack_require__(10),
	    _getComputedStyle = __webpack_require__(11),
	    removeStyle = __webpack_require__(13);

	var has = Object.prototype.hasOwnProperty;

	module.exports = function style(node, property, value) {
	  var css = '',
	      props = property;

	  if (typeof property === 'string') {

	    if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(hyphenate(property));else (props = {})[property] = value;
	  }

	  for (var key in props) if (has.call(props, key)) {
	    !props[key] && props[key] !== 0 ? removeStyle(node, hyphenate(key)) : css += hyphenate(key) + ':' + props[key] + ';';
	  }

	  node.style.cssText += ';' + css;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
	 */

	'use strict';
	var camelize = __webpack_require__(9);
	var msPattern = /^-ms-/;

	module.exports = function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	var rHyphen = /-(.)/g;

	module.exports = function camelize(string) {
	  return string.replace(rHyphen, function (_, chr) {
	    return chr.toUpperCase();
	  });
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
	 */

	"use strict";

	var hyphenate = __webpack_require__(6);
	var msPattern = /^ms-/;

	module.exports = function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, "-ms-");
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(12);

	var _utilCamelizeStyle = __webpack_require__(8);

	var _utilCamelizeStyle2 = babelHelpers.interopRequireDefault(_utilCamelizeStyle);

	var rposition = /^(top|right|bottom|left)$/;
	var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

	module.exports = function _getComputedStyle(node) {
	  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
	  var doc = node.ownerDocument;

	  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : { //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
	    getPropertyValue: function getPropertyValue(prop) {
	      var style = node.style;

	      prop = (0, _utilCamelizeStyle2['default'])(prop);

	      if (prop == 'float') prop = 'styleFloat';

	      var current = node.currentStyle[prop] || null;

	      if (current == null && style && style[prop]) current = style[prop];

	      if (rnumnonpx.test(current) && !rposition.test(prop)) {
	        // Remember the original values
	        var left = style.left;
	        var runStyle = node.runtimeStyle;
	        var rsLeft = runStyle && runStyle.left;

	        // Put in the new values to get a computed value out
	        if (rsLeft) runStyle.left = node.currentStyle.left;

	        style.left = prop === 'fontSize' ? '1em' : current;
	        current = style.pixelLeft + 'px';

	        // Revert the changed values
	        style.left = left;
	        if (rsLeft) runStyle.left = rsLeft;
	      }

	      return current;
	    }
	  };
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === "object") {
	    factory(exports);
	  } else {
	    factory(root.babelHelpers = {});
	  }
	})(this, function (global) {
	  var babelHelpers = global;

	  babelHelpers.interopRequireDefault = function (obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  };

	  babelHelpers._extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };
	})

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function removeStyle(node, key) {
	  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);
	var on = function on() {};

	if (canUseDOM) {
	  on = (function () {

	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.addEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.attachEvent('on' + eventName, handler);
	    };
	  })();
	}

	module.exports = on;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);
	var off = function off() {};

	if (canUseDOM) {

	  off = (function () {

	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.removeEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.detachEvent('on' + eventName, handler);
	    };
	  })();
	}

	module.exports = off;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);

	var has = Object.prototype.hasOwnProperty,
	    transform = 'transform',
	    transition = {},
	    transitionTiming,
	    transitionDuration,
	    transitionProperty,
	    transitionDelay;

	if (canUseDOM) {
	  transition = getTransitionProperties();

	  transform = transition.prefix + transform;

	  transitionProperty = transition.prefix + 'transition-property';
	  transitionDuration = transition.prefix + 'transition-duration';
	  transitionDelay = transition.prefix + 'transition-delay';
	  transitionTiming = transition.prefix + 'transition-timing-function';
	}

	module.exports = {
	  transform: transform,
	  end: transition.end,
	  property: transitionProperty,
	  timing: transitionTiming,
	  delay: transitionDelay,
	  duration: transitionDuration
	};

	function getTransitionProperties() {
	  var endEvent,
	      prefix = '',
	      transitions = {
	    O: 'otransitionend',
	    Moz: 'transitionend',
	    Webkit: 'webkitTransitionEnd',
	    ms: 'MSTransitionEnd'
	  };

	  var element = document.createElement('div');

	  for (var vendor in transitions) if (has.call(transitions, vendor)) {
	    if (element.style[vendor + 'TransitionProperty'] !== undefined) {
	      prefix = '-' + vendor.toLowerCase() + '-';
	      endEvent = transitions[vendor];
	      break;
	    }
	  }

	  if (!endEvent && element.style.transitionProperty !== undefined) endEvent = 'transitionend';

	  return { end: endEvent, prefix: prefix };
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports.setNumber = setNumber;
	exports.setDate = setDate;

	var _invariant = __webpack_require__(19);

	var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

	var _ = __webpack_require__(20);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var localePropType = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.func]);

	var REQUIRED_NUMBER_FORMATS = ['default'];

	var REQUIRED_DATE_FORMATS = ['default', 'date', 'time', 'header', 'footer', 'dayOfMonth', 'month', 'year', 'decade', 'century'];

	function _format(localizer, formatter, value, format, culture) {
	  var result = typeof format === 'function' ? format(value, culture, localizer) : formatter.call(localizer, value, format, culture);

	  _invariant2['default'](result == null || typeof result === 'string', '`localizer format(..)` must return a string, null, or undefined');

	  return result;
	}

	function checkFormats(requiredFormats, formats) {
	  if (process.env.NODE_ENV !== 'production') requiredFormats.forEach(function (f) {
	    return _invariant2['default'](_.has(formats, f), 'localizer missing required format: `%s`', f);
	  });
	}

	var _numberLocalizer = createWrapper('NumberPicker');

	function setNumber(_ref) {
	  var _format2 = _ref.format;
	  var _parse = _ref.parse;
	  var _ref$precision = _ref.precision;
	  var precision = _ref$precision === undefined ? function () {
	    return null;
	  } : _ref$precision;
	  var formats = _ref.formats;
	  var propType = _ref.propType;

	  _invariant2['default'](typeof _format2 === 'function', 'number localizer `format(..)` must be a function');
	  _invariant2['default'](typeof _parse === 'function', 'number localizer `parse(..)` must be a function');

	  checkFormats(REQUIRED_NUMBER_FORMATS, formats);

	  _numberLocalizer = {
	    formats: formats,
	    precision: precision,
	    propType: propType || localePropType,

	    format: function format(value, str, culture) {
	      return _format(this, _format2, value, str, culture);
	    },

	    parse: function parse(value, culture) {
	      var result = _parse.call(this, value, culture);
	      _invariant2['default'](result == null || typeof result === 'number', 'number localizer `parse(..)` must return a number, null, or undefined');
	      return result;
	    }
	  };
	}

	var _dateLocalizer = createWrapper('DateTimePicker');

	function setDate(spec) {
	  _invariant2['default'](typeof spec.format === 'function', 'date localizer `format(..)` must be a function');
	  _invariant2['default'](typeof spec.parse === 'function', 'date localizer `parse(..)` must be a function');
	  _invariant2['default'](typeof spec.firstOfWeek === 'function', 'date localizer `firstOfWeek(..)` must be a function');
	  checkFormats(REQUIRED_DATE_FORMATS, spec.formats);

	  _dateLocalizer = {
	    formats: spec.formats,
	    propType: spec.propType || localePropType,
	    startOfWeek: spec.firstOfWeek,
	    format: function format(value, str, culture) {
	      return _format(this, spec.format, value, str, culture);
	    },
	    parse: function parse(value, culture) {
	      var result = spec.parse.call(this, value, culture);
	      _invariant2['default'](result == null || result instanceof Date && !isNaN(result.getTime()), 'date localizer `parse(..)` must return a valid Date, null, or undefined');
	      return result;
	    }
	  };
	}

	var number = {
	  propType: function propType() {
	    var _numberLocalizer2;

	    return (_numberLocalizer2 = _numberLocalizer).propType.apply(_numberLocalizer2, arguments);
	  },
	  getFormat: function getFormat(key, format) {
	    return format || _numberLocalizer.formats[key];
	  },
	  parse: function parse() {
	    var _numberLocalizer3;

	    return (_numberLocalizer3 = _numberLocalizer).parse.apply(_numberLocalizer3, arguments);
	  },
	  format: function format() {
	    var _numberLocalizer4;

	    return (_numberLocalizer4 = _numberLocalizer).format.apply(_numberLocalizer4, arguments);
	  },
	  precision: function precision() {
	    var _numberLocalizer5;

	    return (_numberLocalizer5 = _numberLocalizer).precision.apply(_numberLocalizer5, arguments);
	  }
	};

	exports.number = number;
	var date = {
	  propType: function propType() {
	    var _dateLocalizer2;

	    return (_dateLocalizer2 = _dateLocalizer).propType.apply(_dateLocalizer2, arguments);
	  },
	  getFormat: function getFormat(key, format) {
	    return format || _dateLocalizer.formats[key];
	  },
	  parse: function parse() {
	    var _dateLocalizer3;

	    return (_dateLocalizer3 = _dateLocalizer).parse.apply(_dateLocalizer3, arguments);
	  },
	  format: function format() {
	    var _dateLocalizer4;

	    return (_dateLocalizer4 = _dateLocalizer).format.apply(_dateLocalizer4, arguments);
	  },
	  startOfWeek: function startOfWeek() {
	    var _dateLocalizer5;

	    return (_dateLocalizer5 = _dateLocalizer).startOfWeek.apply(_dateLocalizer5, arguments);
	  }
	};

	exports.date = date;
	exports['default'] = { number: number, date: date };

	function createWrapper() {
	  var dummy = {};

	  ['formats', 'parse', 'format', 'firstOfWeek', 'precision'].forEach(function (name) {
	    return Object.defineProperty(dummy, name, {
	      enumerable: true,
	      get: function get() {
	        throw new Error('[React Widgets] You are attempting to use a widget that requires localization ' + '(Calendar, DateTimePicker, NumberPicker). ' + 'However there is no localizer set. Please configure a localizer. \n\n' + 'see http://jquense.github.io/react-widgets/docs/#/i18n for more info.');
	      }
	    });
	  });
	  return dummy;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	var idCount = 0;

	var _ = module.exports = {

	  has: has,

	  result: function result(value) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return typeof value === 'function' ? value.apply(undefined, args) : value;
	  },

	  isShallowEqual: function isShallowEqual(a, b) {
	    if (a === b) return true;
	    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();

	    if (typeof a !== 'object' && typeof b !== 'object') return a === b;

	    if (typeof a !== typeof b) return false;

	    return shallowEqual(a, b);
	  },

	  transform: function transform(obj, cb, seed) {
	    _.each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
	    return seed;
	  },

	  each: function each(obj, cb, thisArg) {
	    if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

	    for (var key in obj) if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
	  },

	  pick: function pick(obj, keys) {
	    keys = [].concat(keys);
	    return _.transform(obj, function (mapped, val, key) {
	      if (keys.indexOf(key) !== -1) mapped[key] = val;
	    }, {});
	  },

	  omit: function omit(obj, keys) {
	    keys = [].concat(keys);
	    return _.transform(obj, function (mapped, val, key) {
	      if (keys.indexOf(key) === -1) mapped[key] = val;
	    }, {});
	  },

	  find: function find(arr, cb, thisArg) {
	    var result;
	    if (Array.isArray(arr)) {
	      arr.every(function (val, idx) {
	        if (cb.call(thisArg, val, idx, arr)) return (result = val, false);
	        return true;
	      });
	      return result;
	    } else for (var key in arr) if (has(arr, key)) if (cb.call(thisArg, arr[key], key, arr)) return arr[key];
	  },

	  chunk: function chunk(array, chunkSize) {
	    var index = 0,
	        length = array ? array.length : 0,
	        result = [];

	    chunkSize = Math.max(+chunkSize || 1, 1);

	    while (index < length) result.push(array.slice(index, index += chunkSize));

	    return result;
	  },

	  splat: function splat(obj) {
	    return obj == null ? [] : [].concat(obj);
	  },

	  noop: function noop() {},

	  uniqueId: function uniqueId(prefix) {
	    return '' + ((prefix == null ? '' : prefix) + ++idCount);
	  }
	};

	function has(o, k) {
	  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
	}

	function eql(a, b) {
	  return a === b;
	}

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 */
	function shallowEqual(objA, objB) {

	  if (objA == null || objB == null) return false;

	  var keysA = Object.keys(objA),
	      keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) return false;

	  for (var i = 0; i < keysA.length; i++) if (!has(objB, keysA[i]) || !eql(objA[keysA[i]], objB[keysA[i]])) return false;

	  return true;
	}

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _domHelpersActiveElement = __webpack_require__(23);

	var _domHelpersActiveElement2 = babelHelpers.interopRequireDefault(_domHelpersActiveElement);

	var _domHelpersQueryContains = __webpack_require__(25);

	var _domHelpersQueryContains2 = babelHelpers.interopRequireDefault(_domHelpersQueryContains);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _Popup = __webpack_require__(27);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(35);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(41);

	var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

	var _utilValidateListInterface = __webpack_require__(43);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _uncontrollable = __webpack_require__(44);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilInteraction = __webpack_require__(47);

	var _utilWidgetHelpers = __webpack_require__(38);

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;
	var result = _util_2['default'].result;

	var propTypes = {
	  //-- controlled props -----------
	  value: _react2['default'].PropTypes.any,
	  onChange: _react2['default'].PropTypes.func,
	  open: _react2['default'].PropTypes.bool,
	  onToggle: _react2['default'].PropTypes.func,
	  //------------------------------------

	  data: _react2['default'].PropTypes.array,
	  valueField: _react2['default'].PropTypes.string,
	  textField: _utilPropTypes2['default'].accessor,

	  valueComponent: _utilPropTypes2['default'].elementType,
	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,

	  groupComponent: _utilPropTypes2['default'].elementType,
	  groupBy: _utilPropTypes2['default'].accessor,

	  onSelect: _react2['default'].PropTypes.func,

	  searchTerm: _react2['default'].PropTypes.string,
	  onSearch: _react2['default'].PropTypes.func,

	  busy: _react2['default'].PropTypes.bool,

	  delay: _react2['default'].PropTypes.number,

	  dropUp: _react2['default'].PropTypes.bool,
	  duration: _react2['default'].PropTypes.number, //popup

	  disabled: _utilPropTypes2['default'].disabled,

	  readOnly: _utilPropTypes2['default'].readOnly,

	  messages: _react2['default'].PropTypes.shape({
	    open: _utilPropTypes2['default'].message,
	    emptyList: _utilPropTypes2['default'].message,
	    emptyFilter: _utilPropTypes2['default'].message,
	    filterPlaceholder: _utilPropTypes2['default'].message
	  })
	};

	var DropdownList = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'DropdownList';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(49), __webpack_require__(50), __webpack_require__(51), __webpack_require__(56), __webpack_require__(40)()];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      delay: 500,
	      value: '',
	      open: false,
	      data: [],
	      searchTerm: '',
	      messages: msgs(),
	      ariaActiveDescendantKey: 'dropdownlist'
	    };
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var _props = this.props;
	    var open = _props.open;
	    var filter = _props.filter;
	    var value = _props.value;
	    var data = _props.data;
	    var searchTerm = _props.searchTerm;
	    var valueField = _props.valueField;

	    var processed = filter ? this.filter(data, searchTerm) : data,
	        initialIdx = _utilDataHelpers.dataIndexOf(data, value, valueField);

	    return {
	      filteredData: open && filter ? processed : null,
	      selectedItem: processed[initialIdx],
	      focusedItem: processed[initialIdx] || data[0]
	    };
	  }
	}, {
	  key: 'componentDidUpdate',
	  value: function componentDidUpdate() {
	    this.refs.list && _utilValidateListInterface2['default'](this.refs.list);
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(props) {
	    var open = props.open;
	    var filter = props.filter;
	    var value = props.value;
	    var data = props.data;
	    var searchTerm = props.searchTerm;
	    var valueField = props.valueField;

	    var processed = filter ? this.filter(data, searchTerm) : data,
	        idx = _utilDataHelpers.dataIndexOf(data, value, valueField);

	    this.setState({
	      filteredData: open && filter ? processed : null,
	      selectedItem: processed[idx],
	      focusedItem: processed[! ~idx ? 0 : idx]
	    });
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props2 = this.props;
	    var className = _props2.className;
	    var tabIndex = _props2.tabIndex;
	    var filter = _props2.filter;
	    var valueField = _props2.valueField;
	    var textField = _props2.textField;
	    var groupBy = _props2.groupBy;
	    var messages = _props2.messages;
	    var data = _props2.data;
	    var busy = _props2.busy;
	    var dropUp = _props2.dropUp;
	    var placeholder = _props2.placeholder;
	    var value = _props2.value;
	    var open = _props2.open;
	    var disabled = _props2.disabled;
	    var readOnly = _props2.readOnly;
	    var ValueComponent = _props2.valueComponent;
	    var List = _props2.listComponent;

	    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var listProps = pick(this.props, Object.keys(List.propTypes));
	    var popupProps = pick(this.props, Object.keys(_Popup2['default'].propTypes));

	    var _state = this.state;
	    var focusedItem = _state.focusedItem;
	    var selectedItem = _state.selectedItem;
	    var focused = _state.focused;

	    var items = this._data(),
	        valueItem = _utilDataHelpers.dataItem(data, value, valueField),
	        // take value from the raw data
	    listID = _utilWidgetHelpers.instanceId(this, '__listbox');

	    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open;

	    messages = msgs(messages);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: 'input',
	        role: 'combobox',
	        tabIndex: tabIndex || '0',
	        'aria-expanded': open,
	        'aria-haspopup': true,
	        'aria-owns': listID,
	        'aria-busy': !!busy,
	        'aria-live': !open && 'polite',
	        //aria-activedescendant={activeID}
	        'aria-autocomplete': 'list',
	        'aria-disabled': disabled,
	        'aria-readonly': readOnly,
	        onKeyDown: this._keyDown,
	        onClick: this._click,
	        onFocus: this._focus.bind(null, true),
	        onBlur: this._focus.bind(null, false),
	        className: _classnames2['default'](className, 'rw-dropdownlist', 'rw-widget', (_cx = {
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-state-focus': focused,
	          'rw-rtl': this.isRtl()

	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
	      _react2['default'].createElement(
	        'span',
	        { className: 'rw-dropdownlist-picker rw-select rw-btn' },
	        _react2['default'].createElement(
	          'i',
	          { className: 'rw-i rw-i-caret-down' + (busy ? ' rw-loading' : '') },
	          _react2['default'].createElement(
	            'span',
	            { className: 'rw-sr' },
	            result(messages.open, this.props)
	          )
	        )
	      ),
	      _react2['default'].createElement(
	        'div',
	        {
	          className: 'rw-input'
	        },
	        !valueItem && placeholder ? _react2['default'].createElement(
	          'span',
	          { className: 'rw-placeholder' },
	          placeholder
	        ) : this.props.valueComponent ? _react2['default'].createElement(ValueComponent, { item: valueItem }) : _utilDataHelpers.dataText(valueItem, textField)
	      ),
	      _react2['default'].createElement(
	        _Popup2['default'],
	        babelHelpers._extends({}, popupProps, {
	          onOpen: function () {
	            return _this.focus();
	          },
	          onOpening: function () {
	            return _this.refs.list.forceUpdate();
	          },
	          onRequestClose: this.close
	        }),
	        _react2['default'].createElement(
	          'div',
	          null,
	          filter && this._renderFilter(messages),
	          shouldRenderList && _react2['default'].createElement(List, babelHelpers._extends({ ref: 'list'
	          }, listProps, {
	            data: items,
	            id: listID,
	            'aria-live': open && 'polite',
	            'aria-labelledby': _utilWidgetHelpers.instanceId(this),
	            'aria-hidden': !this.props.open,
	            selected: selectedItem,
	            focused: open ? focusedItem : null,
	            onSelect: this._onSelect,
	            onMove: this._scrollTo,
	            messages: {
	              emptyList: data.length ? messages.emptyFilter : messages.emptyList
	            } }))
	        )
	      )
	    );
	  }
	}, {
	  key: '_renderFilter',
	  value: function _renderFilter(messages) {
	    var _this2 = this;

	    return _react2['default'].createElement(
	      'div',
	      { ref: 'filterWrapper', className: 'rw-filter-input' },
	      _react2['default'].createElement(
	        'span',
	        { className: 'rw-select rw-btn' },
	        _react2['default'].createElement('i', { className: 'rw-i rw-i-search' })
	      ),
	      _react2['default'].createElement('input', { ref: 'filter', className: 'rw-input',
	        placeholder: _util_2['default'].result(messages.filterPlaceholder, this.props),
	        value: this.props.searchTerm,
	        onChange: function (e) {
	          return _utilWidgetHelpers.notify(_this2.props.onSearch, e.target.value);
	        } })
	    );
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this3 = this;

	    this.setTimeout('focus', function () {
	      if (!focused) _this3.close();

	      if (focused !== _this3.state.focused) {
	        _utilWidgetHelpers.notify(_this3.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this3.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: '_onSelect',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onSelect(data) {
	    this.close();
	    _utilWidgetHelpers.notify(this.props.onSelect, data);
	    this.change(data);
	    this.focus(this);
	  }
	}, {
	  key: '_click',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _click(e) {
	    var wrapper = this.refs.filterWrapper;

	    if (!this.props.filter || !this.props.open) this.toggle();else if (!_domHelpersQueryContains2['default'](_utilCompat2['default'].findDOMNode(wrapper), e.target)) this.close();

	    _utilWidgetHelpers.notify(this.props.onClick, e);
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var _this4 = this;

	    var self = this,
	        key = e.key,
	        alt = e.altKey,
	        list = this.refs.list,
	        filtering = this.props.filter,
	        focusedItem = this.state.focusedItem,
	        selectedItem = this.state.selectedItem,
	        isOpen = this.props.open,
	        closeWithFocus = function closeWithFocus() {
	      _this4.close(), _utilCompat2['default'].findDOMNode(_this4).focus();
	    };

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End') {
	      if (isOpen) this.setState({ focusedItem: list.last() });else change(list.last());
	      e.preventDefault();
	    } else if (key === 'Home') {
	      if (isOpen) this.setState({ focusedItem: list.first() });else change(list.first());
	      e.preventDefault();
	    } else if (key === 'Escape' && isOpen) {
	      closeWithFocus();
	    } else if ((key === 'Enter' || key === ' ' && !filtering) && isOpen) {
	      change(this.state.focusedItem, true);
	    } else if (key === 'ArrowDown') {
	      if (alt) this.open();else if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else change(list.next(selectedItem));
	      e.preventDefault();
	    } else if (key === 'ArrowUp') {
	      if (alt) closeWithFocus();else if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else change(list.prev(selectedItem));
	      e.preventDefault();
	    } else if (!(this.props.filter && isOpen)) this.search(String.fromCharCode(e.keyCode), function (item) {
	      isOpen ? _this4.setState({ focusedItem: item }) : change(item);
	    });

	    function change(item, fromList) {
	      if (!item) return;
	      fromList ? self._onSelect(item) : self.change(item);
	    }
	  }
	}, {
	  key: 'change',
	  value: function change(data) {
	    if (!_util_2['default'].isShallowEqual(data, this.props.value)) {
	      _utilWidgetHelpers.notify(this.props.onChange, data);
	      _utilWidgetHelpers.notify(this.props.onSearch, '');
	      this.close();
	    }
	  }
	}, {
	  key: 'focus',
	  value: function focus(target) {
	    var inst = target || (this.props.filter && this.props.open ? this.refs.filter : this.refs.input);

	    if (_domHelpersActiveElement2['default']() !== _utilCompat2['default'].findDOMNode(inst)) _utilCompat2['default'].findDOMNode(inst).focus();
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.state.filteredData || this.props.data.concat();
	  }
	}, {
	  key: 'search',
	  value: function search(character, cb) {
	    var _this5 = this;

	    var word = ((this._searchTerm || '') + character).toLowerCase();

	    this._searchTerm = word;

	    this.setTimeout('search', function () {
	      var list = _this5.refs.list,
	          key = _this5.props.open ? 'focusedItem' : 'selectedItem',
	          item = list.next(_this5.state[key], word);

	      _this5._searchTerm = '';
	      if (item) cb(item);
	    }, this.props.delay);
	  }
	}, {
	  key: 'open',
	  value: function open() {
	    _utilWidgetHelpers.notify(this.props.onToggle, true);
	  }
	}, {
	  key: 'close',
	  value: function close() {
	    _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'toggle',
	  value: function toggle() {
	    this.props.open ? this.close() : this.open();
	  }
	}]));

	function msgs(msgs) {
	  return babelHelpers._extends({
	    open: 'open dropdown',
	    filterPlaceholder: '',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results'
	  }, msgs);
	}

	exports['default'] = _uncontrollable2['default'](DropdownList, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' });
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(12);

	exports.__esModule = true;

	/**
	 * document.activeElement
	 */
	exports['default'] = activeElement;

	var _ownerDocument = __webpack_require__(24);

	var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);

	function activeElement() {
	  var doc = arguments[0] === undefined ? document : arguments[0];

	  try {
	    return doc.activeElement;
	  } catch (e) {}
	}

	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = ownerDocument;

	function ownerDocument(node) {
	  return node && node.ownerDocument || document;
	}

	module.exports = exports["default"];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(15);

	var contains = (function () {
	  var root = canUseDOM && document.documentElement;

	  return root && root.contains ? function (context, node) {
	    return context.contains(node);
	  } : root && root.compareDocumentPosition ? function (context, node) {
	    return context === node || !!(context.compareDocumentPosition(node) & 16);
	  } : function (context, node) {
	    if (node) do {
	      if (node === context) return true;
	    } while (node = node.parentNode);

	    return false;
	  };
	})();

	module.exports = contains;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
>>>>>>> origin/master
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
<<<<<<< HEAD
!function(){"use strict";function a(){for(var e="",t=0;t<arguments.length;t++){var n=arguments[t];if(n){var r=typeof n;if("string"===r||"number"===r)e+=" "+n;else if(Array.isArray(n))e+=" "+a.apply(null,n);else if("object"===r)for(var i in n)n.hasOwnProperty(i)&&n[i]&&(e+=" "+i)}}return e.substr(1)}"undefined"!=typeof e&&e.exports?e.exports=a:(r=function(){return a}.call(t,n,t,e),!(void 0!==r&&(e.exports=r)))}()},function(e,t){"use strict";function n(e,t){return e?Object.prototype.hasOwnProperty.call(e,t):!1}function r(e,t){return e===t}function a(e,t){if(null==e||null==t)return!1;var a=Object.keys(e),i=Object.keys(t);if(a.length!==i.length)return!1;for(var s=0;s<a.length;s++)if(!n(t,a[s])||!r(e[a[s]],t[a[s]]))return!1;return!0}var i=0,s=e.exports={has:n,result:function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];return"function"==typeof e?e.apply(void 0,n):e},isShallowEqual:function(e,t){return e===t?!0:e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():"object"!=typeof e&&"object"!=typeof t?e===t:typeof e!=typeof t?!1:a(e,t)},transform:function(e,t,n){return s.each(e,t.bind(null,n=n||(Array.isArray(e)?[]:{}))),n},each:function(e,t,r){if(Array.isArray(e))return e.forEach(t,r);for(var a in e)n(e,a)&&t.call(r,e[a],a,e)},pick:function(e,t){return t=[].concat(t),s.transform(e,function(e,n,r){-1!==t.indexOf(r)&&(e[r]=n)},{})},omit:function(e,t){return t=[].concat(t),s.transform(e,function(e,n,r){-1===t.indexOf(r)&&(e[r]=n)},{})},find:function(e,t,r){var a;if(Array.isArray(e))return e.every(function(n,i){return t.call(r,n,i,e)?(a=n,!1):!0}),a;for(var i in e)if(n(e,i)&&t.call(r,e[i],i,e))return e[i]},chunk:function(e,t){var n=0,r=e?e.length:0,a=[];for(t=Math.max(+t||1,1);r>n;)a.push(e.slice(n,n+=t));return a},splat:function(e){return null==e?[]:[].concat(e)},noop:function(){},uniqueId:function(e){return""+((null==e?"":e)+ ++i)}}},function(e,t,n){"use strict";function r(e,t){var n,r,a=l.animate.TRANSLATION_MAP;return a&&a[e]?(n={},n[c]=a[e]+"("+t+")",n):(r={},r[e]=t,r)}function a(e){var t=s.Children.map(e,function(e){return e});for(var n in t)return n}var i=n(2),s=n(3),o=n(10),u=n(17),l=n(20),p=n(7),d=n(30),c=l.animate.transform,f=s.createClass({displayName:"PopupContent",render:function(){var e=this.props.children;return e?(e=s.Children.only(this.props.children),d.cloneElement(e,{className:p(e.props.className,"rw-popup rw-widget")})):s.createElement("span",{className:"rw-popup rw-widget"})}});e.exports=s.createClass({displayName:"Popup",propTypes:{open:s.PropTypes.bool,dropUp:s.PropTypes.bool,duration:s.PropTypes.number,onRequestClose:s.PropTypes.func.isRequired,onClosing:s.PropTypes.func,onOpening:s.PropTypes.func,onClose:s.PropTypes.func,onOpen:s.PropTypes.func},getInitialState:function(){return{}},getDefaultProps:function(){return{duration:200,open:!1,onClosing:function(){},onOpening:function(){},onClose:function(){},onOpen:function(){}}},componentWillMount:function(){!this.props.open&&(this._initialPosition=!0)},componentWillReceiveProps:function(e){this.setState({contentChanged:a(e.children)!==a(this.props.children)})},componentDidUpdate:function(e){var t=e.open&&!this.props.open,n=!e.open&&this.props.open,r=this.props.open;n?this.open():t?this.close():r&&this.height()},render:function(){var e=this.props,t=e.className,n=e.open,r=e.dropUp,a=i.objectWithoutProperties(e,["className","open","dropUp"]),o=n?"block":void 0;return this._initialPosition&&(o="none"),s.createElement("div",i._extends({},a,{style:i._extends({display:o,height:this.state.height},a.style),className:p(t,"rw-popup-container",{"rw-dropup":r})}),s.createElement(f,{ref:"content"},this.props.children))},reset:function(){var e=d.findDOMNode(this),t=d.findDOMNode(this.refs.content),n={display:"block",overflow:"hidden"};o(e,n),this.height(),o(t,r("top",this.props.dropUp?"100%":"-100%"))},height:function h(){var e=d.findDOMNode(this),t=d.findDOMNode(this.refs.content),n=parseInt(o(t,"margin-top"),10)+parseInt(o(t,"margin-bottom"),10),h=u(t)+(isNaN(n)?0:n);this.state.height!==h&&(e.style.height=h+"px",this.setState({height:h}))},open:function(){var e=this,t=d.findDOMNode(this),n=d.findDOMNode(this.refs.content);this.ORGINAL_POSITION=o(n,"position"),this._isOpening=!0,this._initialPosition?(this._initialPosition=!1,this.reset()):this.height(),this.props.onOpening(),t.className+=" rw-popup-animating",n.style.position="absolute",l.animate(n,{top:0},e.props.duration,"ease",function(){e._isOpening&&(t.className=t.className.replace(/ ?rw-popup-animating/g,""),n.style.position=e.ORGINAL_POSITION,t.style.overflow="visible",e.ORGINAL_POSITION=null,e.props.onOpen())})},close:function(e){var t=this,n=d.findDOMNode(this.refs.content),r=d.findDOMNode(this);this.ORGINAL_POSITION=o(n,"position"),this._isOpening=!1,this.height(),this.props.onClosing(),r.style.overflow="hidden",r.className+=" rw-popup-animating",n.style.position="absolute",l.animate(n,{top:this.props.dropUp?"100%":"-100%"},void 0===e?this.props.duration:e,"ease",function(){t._isOpening||(n.style.position=t.ORGINAL_POSITION,r.className=r.className.replace(/ ?rw-popup-animating/g,""),r.style.display="none",t.ORGINAL_POSITION=null,t.props.onClose())})}})},function(e,t,n){"use strict";var r=n(11),a=n(13),i=n(15),s=n(16),o=Object.prototype.hasOwnProperty;e.exports=function(e,t,n){var u="",l=t;if("string"==typeof t){if(void 0===n)return e.style[r(t)]||i(e).getPropertyValue(t);(l={})[t]=n}for(var p in l)o.call(l,p)&&(l[p]||0===l[p]?u+=a(p)+":"+l[p]+";":s(e,a(p)));e.style.cssText+=";"+u}},function(e,t,n){"use strict";var r=n(12),a=/^-ms-/;e.exports=function(e){return r(e.replace(a,"ms-"))}},function(e,t){"use strict";var n=/-(.)/g;e.exports=function(e){return e.replace(n,function(e,t){return t.toUpperCase()})}},function(e,t,n){"use strict";var r=n(14),a=/^ms-/;e.exports=function(e){return r(e).replace(a,"-ms-")}},function(e,t){"use strict";var n=/([A-Z])/g;e.exports=function(e){return e.replace(n,"-$1").toLowerCase()}},function(e,t){"use strict";e.exports=function(e){if(!e)throw new TypeError("No Element passed to `getComputedStyle()`");var t=e.ownerDocument;return"defaultView"in t?t.defaultView.opener?e.ownerDocument.defaultView.getComputedStyle(e,null):window.getComputedStyle(e,null):{getPropertyValue:function(t){var n=/(\-([a-z]){1})/g;return"float"==t&&(t="styleFloat"),n.test(t)&&(t=t.replace(n,function(){return arguments[2].toUpperCase()})),e.currentStyle[t]||null}}}},function(e,t){"use strict";e.exports=function(e,t){return"removeProperty"in e.style?e.style.removeProperty(t):e.style.removeAttribute(t)}},function(e,t,n){"use strict";var r=n(18),a=n(19);e.exports=function(e,t){var n=a(e);return n?n.innerHeight:t?e.clientHeight:r(e).height}},function(e,t,n){"use strict";var r=n(5),a=n(19);e.exports=function(e){var t=e.ownerDocument,n=t&&t.documentElement,i={top:0,left:0,height:0,width:0};if(t){if(!r(n,e))return i;void 0!==e.getBoundingClientRect&&(i=e.getBoundingClientRect());var s=a(t);return{top:i.top+(s.pageYOffset||n.scrollTop)-(n.clientTop||0),left:i.left+(s.pageXOffset||n.scrollLeft)-(n.clientLeft||0),width:i.width||e.offsetWidth,height:i.height||e.offsetHeight}}}},function(e,t){"use strict";e.exports=function(e){return e===e.window?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}},function(e,t,n){"use strict";var r,a=n(21),i=a.globalizeNumberLocalizer,s=a.globalizeDateLocalizer;try{r=n(25)}catch(o){r={}}e.exports={animate:n(26),locale:{date:s(r),number:i(r)}}},function(e,t,n){"use strict";function r(e){function t(t){return t?(i.globalize||e).findClosestCulture(t):(i.globalize||e).culture()}function n(e){return e=t(e),e&&e.calendar.firstDay||0}function r(e){var r=t(arguments[1]),i=r.name,s=n(r),o=function l(){var l=r.calendar.days.namesShort.slice();return 0===s?l:l.concat(l.splice(0,s))},u=a[i]||(a[i]=o());return u[e]}var a=Object.create(null),i=new o({formats:{date:"d",time:"t","default":"f",header:"MMMM yyyy",footer:"D",weekday:r,dayOfMonth:"dd",month:"MMM",year:"yyyy",decade:function(e,t,n){return n.format(e,n.formats.year,t)+" - "+n.format(u.endOf(e,"decade"),n.formats.year,t)},century:function(e,t,n){return n.format(e,n.formats.year,t)+" - "+n.format(u.endOf(e,"century"),n.formats.year,t)}},firstOfWeek:n,parse:function(t,n,r){return(this.globalize||e).parseDate(t,n,r)},format:function(t,n,r){return(this.globalize||e).format(t,n,r)}});return i.globalize=e,i}function a(e){function t(t){return t?(n.globalize||e).findClosestCulture(t):(n.globalize||e).culture()}var n=new s({formats:{"default":"D"},parse:function(t,n){return(this.globalize||e).parseFloat(t,10,n)},format:function(t,n,r){return(this.globalize||e).format(t,n,r)},precision:function(e,n){var r=t(n),a=r.numberFormat;return"string"==typeof e?e.length>1?parseFloat(e.substr(1)):(-1!==e.indexOf("p")&&(a=a.percent),-1!==e.indexOf("c")&&(a=a.curency),a.decimals||null):null}});return n.globalize=e,n}var i=n(22),s=i.NumberLocalizer,o=i.DateLocalizer,u=n(24);e.exports={globalizeNumberLocalizer:a,globalizeDateLocalizer:r}},function(e,t,n){"use strict";function r(e,t,n,r,a){var i="function"==typeof r?r(n,a,e):t.call(e,n,r,a);return s(null==i||"string"==typeof i,"`localizer format(..)` must return a string, null, or undefined"),i}function a(e,t){}var i=n(2),s=n(23),o=n(8),u=(o.has,n(3)),l=["default"],p=u.PropTypes.oneOfType([u.PropTypes.string,u.PropTypes.func]),d=["default","date","time","header","footer","dayOfMonth","month","year","decade","century"],c=function h(e){var t=this,n=e.format,o=e.parse,u=e.precision,d=e.formats,c=e.propType;i.classCallCheck(this,h),s("function"==typeof n,"number localizer `format(..)` must be a function"),s("function"==typeof o,"number localizer `parse(..)` must be a function"),a(l,d),this.propType=c||p,this.formats=d,this.precision=u||function(){return null},this.format=function(e,a,i){return r(t,n,e,a,i)},this.parse=function(e,n){var r=o.call(t,e,n);return s(null==r||"number"==typeof r,"number localizer `parse(..)` must return a number, null, or undefined"),r}},f=function m(e){var t=this;i.classCallCheck(this,m),s("function"==typeof e.format,"date localizer `format(..)` must be a function"),s("function"==typeof e.parse,"date localizer `parse(..)` must be a function"),s("function"==typeof e.firstOfWeek,"date localizer `firstOfWeek(..)` must be a function"),a(d,e.formats),this.propType=e.propType||p,this.formats=e.formats,this.startOfWeek=e.firstOfWeek,this.format=function(n,a,i){return r(t,e.format,n,a,i)},this.parse=function(n,r,a){var i=e.parse.call(t,n,r,a);return s(null==i||i instanceof Date&&!isNaN(i.getTime()),"date localizer `parse(..)` must return a valid Date, null, or undefined"),i}};e.exports={NumberLocalizer:c,DateLocalizer:f}},function(e,t,n){"use strict";var r=function(e,t,n,r,a,i,s,o){if(!e){var u;if(void 0===t)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[n,r,a,i,s,o],p=0;u=new Error("Invariant Violation: "+t.replace(/%s/g,function(){return l[p++]}))}throw u.framesToPop=1,u}};e.exports=r},function(e,t){function n(e,t){var n=m.month(e),r=n+t;return e=m.month(e,r),0>r&&(r=12+t),m.month(e)!==r%12&&(e=m.date(e,0)),e}function r(e){return function(t,n){return void 0===n?t["get"+e]():(t=new Date(t),t["set"+e](n),t)}}function a(e){return function(t,n,r,a){return e(+m.startOf(t,r,a),+m.startOf(n,r,a))}}var i="milliseconds",s="seconds",o="minutes",u="hours",l="day",p="week",d="month",c="year",f="decade",h="century",m=e.exports={add:function(e,t,r){switch(e=new Date(e),r){case i:case s:case o:case u:case c:return m[r](e,m[r](e)+t);case l:return m.date(e,m.date(e)+t);case p:return m.date(e,m.date(e)+7*t);case d:return n(e,t);case f:return m.year(e,m.year(e)+10*t);case h:return m.year(e,m.year(e)+100*t)}throw new TypeError('Invalid units: "'+r+'"')},subtract:function(e,t,n){return m.add(e,-t,n)},startOf:function(e,t,n){switch(e=new Date(e),t){case"century":case"decade":case"year":e=m.month(e,0);case"month":e=m.date(e,1);case"week":case"day":e=m.hours(e,0);case"hours":e=m.minutes(e,0);case"minutes":e=m.seconds(e,0);case"seconds":e=m.milliseconds(e,0)}return t===f&&(e=m.subtract(e,m.year(e)%10,"year")),t===h&&(e=m.subtract(e,m.year(e)%100,"year")),t===p&&(e=m.weekday(e,0,n)),e},endOf:function(e,t,n){return e=new Date(e),e=m.startOf(e,t,n),e=m.add(e,1,t),e=m.subtract(e,1,i)},eq:a(function(e,t){return e===t}),neq:a(function(e,t){return e!==t}),gt:a(function(e,t){return e>t}),gte:a(function(e,t){return e>=t}),lt:a(function(e,t){return t>e}),lte:a(function(e,t){return t>=e}),min:function(){return new Date(Math.min.apply(Math,arguments))},max:function(){return new Date(Math.max.apply(Math,arguments))},inRange:function(e,t,n,r){return r=r||"day",(!t||m.gte(e,t,r))&&(!n||m.lte(e,n,r))},milliseconds:r("Milliseconds"),seconds:r("Seconds"),minutes:r("Minutes"),hours:r("Hours"),day:r("Day"),date:r("Date"),month:r("Month"),year:r("FullYear"),decade:function(e,t){return void 0===t?m.year(m.startOf(e,f)):m.add(e,t+10,c)},century:function(e,t){return void 0===t?m.year(m.startOf(e,h)):m.add(e,t+100,c)},weekday:function(e,t,n){var r=(m.day(e)+7-(n||0))%7;return void 0===t?r:m.add(e,t-r,l)}}},function(e,n){if("undefined"==typeof t){var r=new Error('Cannot find module "Globalize"');throw r.code="MODULE_NOT_FOUND",r}e.exports=t},function(e,t,n){"use strict";function r(e,t,n,r,c){function f(t){t.target===t.currentTarget&&(h=!0,o(t.target,u.end,f),i(e,p),c&&c.call(this))}var h,m=[],y={target:e,currentTarget:e},v={},g="";"function"==typeof r&&(c=r,r=null),u.end||(n=0),void 0===n&&(n=200);for(var b in t)l.call(t,b)&&(/(top|bottom)/.test(b)?g+=d[b]+"("+t[b]+") ":(v[b]=t[b],m.push(a(b))));g&&(v[u.transform]=g,m.push(u.transform)),n>0&&(v[u.property]=m.join(", "),v[u.duration]=n/1e3+"s",v[u.delay]="0s",v[u.timing]=r||"linear",s(e,u.end,f),setTimeout(function(){h||f(y)},n+500)),e.clientLeft,i(e,v),0>=n&&setTimeout(f.bind(null,y),0)}var a=n(14),i=n(10),s=n(27),o=n(28),u=n(29),l=Object.prototype.hasOwnProperty,p={},d={left:"translateX",right:"translateX",top:"translateY",bottom:"translateY"};p[u.property]=p[u.duration]=p[u.delay]=p[u.timing]="",r.endEvent=u.end,r.transform=u.transform,r.TRANSLATION_MAP=d,e.exports=r},function(e,t,n){"use strict";var r=n(6),a=function(){};r&&(a=function(){return document.addEventListener?function(e,t,n,r){return e.addEventListener(t,n,r||!1)}:document.attachEvent?function(e,t,n){return e.attachEvent("on"+t,n)}:void 0}()),e.exports=a},function(e,t,n){"use strict";var r=n(6),a=function(){};r&&(a=function(){return document.addEventListener?function(e,t,n,r){return e.removeEventListener(t,n,r||!1)}:document.attachEvent?function(e,t,n){return e.detachEvent("on"+t,n)}:void 0}()),e.exports=a},function(e,t,n){"use strict";function r(){var e,t="",n={O:"otransitionend",Moz:"transitionend",Webkit:"webkitTransitionEnd",ms:"MSTransitionEnd"},r=document.createElement("div");for(var a in n)if(l.call(n,a)&&void 0!==r.style[a+"TransitionProperty"]){t="-"+a.toLowerCase()+"-",e=n[a];break}return e||void 0===r.style.transitionProperty||(e="transitionend"),{end:e,prefix:t}}var a,i,s,o,u=n(6),l=Object.prototype.hasOwnProperty,p="transform",d={};u&&(d=r(),p=d.prefix+p,s=d.prefix+"transition-property",i=d.prefix+"transition-duration",o=d.prefix+"transition-delay",a=d.prefix+"transition-timing-function"),e.exports={transform:p,end:d.end,property:s,timing:a,delay:o,duration:i}},function(e,t,n){"use strict";var r=n(3),a=n(8),i=r.version.split(".").map(parseFloat);e.exports={version:function(){return i},type:function(e){return 0===i[0]&&i[1]>=13?e:e.type},findDOMNode:function(e){return r.findDOMNode?r.findDOMNode(e):e.getDOMNode()},cloneElement:function(e,t){return r.cloneElement?r.cloneElement(e,t):(a.each(t,function(t,n){return e.props[n]=t}),e)}}},function(e,t,n){"use strict";function r(e){var t=[s.PropTypes.bool,s.PropTypes.oneOf([e])],n=s.PropTypes.oneOfType(t);return n.acceptsArray=s.PropTypes.oneOfType(t.concat(s.PropTypes.array)),n}function a(e){function t(t,n,r,a,i){return a=a||"<<anonymous>>",null!=n[r]?e(n,r,a,i):t?new Error("Required prop `"+r+"` was not specified in  `"+a+"`."):void 0}var n=t.bind(null,!1);return n.isRequired=t.bind(null,!0),n}var i=n(2),s=n(3),o=i.interopRequireDefault(s),u=n(20),l=i.interopRequireDefault(u),p=n(32),d=i.interopRequireDefault(p),c=l["default"].locale,f=Object.keys(d["default"]).filter(function(e){return"filter"!==e});e.exports={elementType:a(function(e,t,n){if("function"!=typeof e[t]){if(o["default"].isValidElement(e[t]))return new Error("Invalid prop `"+t+"` specified in  `"+n+"`. Expected an Element `type`, not an actual Element");if("string"!=typeof e[t])return new Error("Invalid prop `"+t+"` specified in  `"+n+"`. Expected an Element `type` such as a tag name or return value of React.createClass(...)")}return!0}),numberFormat:a(function(){var e;return(e=c.number).propType.apply(e,arguments)}),dateFormat:a(function(){var e;return(e=c.date).propType.apply(e,arguments)}),disabled:r("disabled"),readOnly:r("readOnly"),accessor:o["default"].PropTypes.oneOfType([o["default"].PropTypes.string,o["default"].PropTypes.func]),message:o["default"].PropTypes.oneOfType([o["default"].PropTypes.func,o["default"].PropTypes.string]),filter:o["default"].PropTypes.oneOfType([o["default"].PropTypes.func,o["default"].PropTypes.bool,o["default"].PropTypes.oneOf(f)])}},function(e,t){"use strict";var n={eq:function(e,t){return e===t},neq:function(e,t){return e!==t},gt:function(e,t){return e>t},gte:function(e,t){return e>=t},lt:function(e,t){return t>e},lte:function(e,t){return t>=e},contains:function(e,t){return-1!==e.indexOf(t)},startsWith:function(e,t){return 0===e.lastIndexOf(t,0)},endsWith:function(e,t){var n=e.length-t.length,r=e.indexOf(t,n);return-1!==r&&r===n}};e.exports=n},function(e,t,n){"use strict";var r=n(2);t.__esModule=!0;var a=n(3),i=r.interopRequireDefault(a),s=n(34),o=r.interopRequireDefault(s),u=n(31),l=r.interopRequireDefault(u),p=n(30),d=r.interopRequireDefault(p),c=n(7),f=r.interopRequireDefault(c),h=n(8),m=r.interopRequireDefault(h),y=n(35),v=n(36),g=function(e,t){return e+"__option__"+t};t["default"]=i["default"].createClass({displayName:"List",mixins:[n(37),n(38)()],propTypes:{data:i["default"].PropTypes.array,onSelect:i["default"].PropTypes.func,onMove:i["default"].PropTypes.func,optionComponent:l["default"].elementType,itemComponent:l["default"].elementType,selectedIndex:i["default"].PropTypes.number,focusedIndex:i["default"].PropTypes.number,valueField:i["default"].PropTypes.string,textField:l["default"].accessor,optionID:i["default"].PropTypes.func,messages:i["default"].PropTypes.shape({emptyList:l["default"].message})},getDefaultProps:function(){return{optID:"",onSelect:function(){},optionComponent:o["default"],ariaActiveDescendantKey:"list",data:[],messages:{emptyList:"There are no items in this list"}}},componentDidMount:function(){this.move()},componentDidUpdate:function(){var e=this.props,t=e.data,n=e.focused,r=t.indexOf(n),a=g(v.instanceId(this),r);this.ariaActiveDescendant(-1!==r?a:null),this.move()},render:function(){var e,t=this.props,n=t.className,a=t.role,s=t.data,o=t.textField,u=t.valueField,l=t.focused,p=t.selected,d=t.messages,c=t.onSelect,h=t.itemComponent,b=t.optionComponent,D=(t.optionID,r.objectWithoutProperties(t,["className","role","data","textField","valueField","focused","selected","messages","onSelect","itemComponent","optionComponent","optionID"])),T=v.instanceId(this);return e=s.length?s.map(function(e,t){var n=g(T,t);return i["default"].createElement(b,{key:"item_"+t,id:n,dataItem:e,focused:l===e,z:!0,selected:p===e,onClick:c.bind(null,e)},h?i["default"].createElement(h,{item:e,value:y.dataValue(e,u),text:y.dataText(e,o)}):y.dataText(e,o))}):i["default"].createElement("li",{className:"rw-list-empty"},m["default"].result(d.emptyList,this.props)),i["default"].createElement("ul",r._extends({id:T,tabIndex:"-1",className:f["default"](n,"rw-list"),role:void 0===a?"listbox":a},D),e)},_data:function(){return this.props.data},move:function(){var e=d["default"].findDOMNode(this),t=this._data().indexOf(this.props.focused),n=e.children[t];n&&v.notify(this.props.onMove,[n,e,this.props.focused])}}),e.exports=t["default"]},function(e,t,n){"use strict";var r=n(2);t.__esModule=!0;var a=n(3),i=r.interopRequireDefault(a),s=n(7),o=r.interopRequireDefault(s),u=i["default"].createClass({displayName:"ListOption",propTypes:{dataItem:i["default"].PropTypes.any,focused:i["default"].PropTypes.bool,selected:i["default"].PropTypes.bool},render:function(){var e=this.props,t=e.className,n=e.children,a=e.focused,s=e.selected,u=r.objectWithoutProperties(e,["className","children","focused","selected"]),l={"rw-state-focus":a,"rw-state-selected":s};return i["default"].createElement("li",r._extends({role:"option",tabIndex:"-1","aria-selected":!!s,className:o["default"]("rw-list-option",t,l)},u),n)}});t["default"]=u,e.exports=t["default"]},function(e,t,n){"use strict";function r(e,t){var n=e;return"function"==typeof t?n=t(e):null==e?n=e:"string"==typeof t&&"object"==typeof e&&t in e&&(n=e[t]),n}function a(e,t){return t&&e&&l.has(e,t)?e[t]:e}function i(e,t){var n=r(e,t);return null==n?"":n+""}function s(e,t,n){for(var r=-1,a=e.length,i=function(e){return o(t,e,n)};++r<a;)if(i(e[r]))return r;return-1}function o(e,t,n){return l.isShallowEqual(a(e,n),a(t,n))}function u(e,t,n){var r,i=e[0];return l.has(t,n)||typeof i==typeof val?t:(r=s(e,a(t,n),n),-1!==r?e[r]:t)}t.__esModule=!0,t.dataValue=a,t.dataText=i,t.dataIndexOf=s,t.valueMatcher=o,t.dataItem=u;var l=n(8)},function(e,t,n){"use strict";function r(e,t){e&&e.apply(null,[].concat(t))}function a(e){var t=arguments.length<=1||void 0===arguments[1]?"":arguments[1];return e.__id||(e.__id=s.uniqueId("rw_")),(e.props.id||e.__id)+t}function i(e){return e._firstFocus||e.state.focused&&(e._firstFocus=!0)}t.__esModule=!0,t.notify=r,t.instanceId=a,t.isFirstFocusedRender=i;var s=n(8)},function(e,t,n){"use strict";function r(e,t,n,r){var a,i,s=l["default"].startsWith,o=-1,u=t.length;for(n=n.toLowerCase();++o<u;)if(a=a||o>r,i=a&&p.dataText(t[o],e).toLowerCase(),a&&s(i,n))return t[o]}function a(e,t,n,r){var a,i,s=l["default"].startsWith,o=t.length;for(n=n.toLowerCase();--o>=0;)if(a=a||r>o,i=a&&p.dataText(t[o],e).toLowerCase(),a&&s(i,n))return t[o]}var i=n(2),s=n(3),o=i.interopRequireDefault(s),u=n(32),l=i.interopRequireDefault(u),p=n(35);e.exports={propTypes:{textField:o["default"].PropTypes.string},first:function(){return this._data()[0]},last:function(){var e=this._data();return e[e.length-1]},prev:function(e,t){var n=this.props.textField,r=this._data(),i=r.indexOf(e);return-1===i&&(i=r.length),t?a(n,r,t,i):--i<0?r[0]:r[i]},next:function(e,t){var n=this.props.textField,a=this._data(),i=a.indexOf(e);return t?r(n,a,t,i):++i===a.length?a[a.length-1]:a[i]}}},function(e,t,n){"use strict";function r(e,t){return t}function a(e,t,n){var r="function"==typeof t?t(n):"string"==typeof t?n.refs[t]:n;r&&(e?o["default"].findDOMNode(r).setAttribute("aria-activedescendant",e):o["default"].findDOMNode(r).removeAttribute("aria-activedescendant"))}var i=n(2);t.__esModule=!0;var s=n(3),o=i.interopRequireDefault(s),u=o["default"].PropTypes.shape({reconcile:o["default"].PropTypes.func});t["default"]=function(e){var t=arguments.length<=1||void 0===arguments[1]?r:arguments[1];return{propTypes:{ariaActiveDescendantKey:o["default"].PropTypes.string.isRequired},contextTypes:{activeDescendants:u},childContextTypes:{activeDescendants:u},ariaActiveDescendant:function(n){var r=arguments.length<=1||void 0===arguments[1]?this.props.ariaActiveDescendantKey:arguments[1],i=this.context.activeDescendants,s=this.__ariaActiveDescendantId;return void 0===n?s:(n=t.call(this,r,n),void 0===n?n=s:(this.__ariaActiveDescendantId=n,a(n,e,this)),void(i&&i.reconcile(r,n)))},getChildContext:function(){var e=this;return this._context||(this._context={activeDescendants:{reconcile:function(t,n){return e.ariaActiveDescendant(n,t)}}})}}},e.exports=t["default"]},function(e,t,n){"use strict";var r=n(2);t.__esModule=!0;var a=n(3),i=r.interopRequireDefault(a),s=n(34),o=r.interopRequireDefault(s),u=n(31),l=r.interopRequireDefault(u),p=n(30),d=r.interopRequireDefault(p),c=n(7),f=r.interopRequireDefault(c),h=n(8),m=r.interopRequireDefault(h),y=n(40),v=r.interopRequireDefault(y),g=n(35),b=n(36),D=function(e,t){return e+"__option__"+t};t["default"]=i["default"].createClass({displayName:"List",mixins:[n(37),n(38)()],propTypes:{data:i["default"].PropTypes.array,onSelect:i["default"].PropTypes.func,onMove:i["default"].PropTypes.func,optionComponent:l["default"].elementType,itemComponent:l["default"].elementType,groupComponent:l["default"].elementType,selected:i["default"].PropTypes.any,focused:i["default"].PropTypes.any,valueField:i["default"].PropTypes.string,textField:l["default"].accessor,optID:i["default"].PropTypes.string,groupBy:l["default"].accessor,messages:i["default"].PropTypes.shape({emptyList:l["default"].message})},getDefaultProps:function(){return{optID:"",onSelect:function(){},data:[],optionComponent:o["default"],ariaActiveDescendantKey:"groupedList",messages:{emptyList:"There are no items in this list"}}},getInitialState:function(){var e=[];return{groups:this._group(this.props.groupBy,this.props.data,e),sortedKeys:e}},componentWillReceiveProps:function(e){var t=[];(e.data!==this.props.data||e.groupBy!==this.props.groupBy)&&this.setState({groups:this._group(e.groupBy,e.data,t),sortedKeys:t})},componentDidMount:function(){this.move()},componentDidUpdate:function(){this.ariaActiveDescendant(this._currentActiveID),this.move()},render:function(){var e=this,t=this.props,n=t.className,a=t.role,s=t.data,o=t.messages,u=(t.onSelect,t.selectedIndex,r.objectWithoutProperties(t,["className","role","data","messages","onSelect","selectedIndex"])),l=b.instanceId(this),p=this.state,d=p.sortedKeys,c=p.groups,h=[],y=-1,v=void 0;return this._currentActiveID=null,h=s.length?d.reduce(function(t,n){v=c[n],t.push(e._renderGroupHeader(n));for(var r=0;r<v.length;r++)t.push(e._renderItem(n,v[r],++y));return t},[]):i["default"].createElement("li",{className:"rw-list-empty"},m["default"].result(o.emptyList,this.props)),i["default"].createElement("ul",r._extends({ref:"scrollable",id:l,tabIndex:"-1",className:f["default"](n,"rw-list","rw-list-grouped"),role:void 0===a?"listbox":a},u),h)},_renderGroupHeader:function(e){var t=this.props.groupComponent,n=b.instanceId(this);return i["default"].createElement("li",{key:"item_"+e,tabIndex:"-1",role:"separator",id:n+"_group_"+e,className:"rw-list-optgroup"},t?i["default"].createElement(t,{item:e}):e)},_renderItem:function(e,t,n){var r=this.props,a=r.focused,s=r.selected,o=r.onSelect,u=r.textField,l=r.valueField,p=r.itemComponent,d=r.optionComponent,c=D(b.instanceId(this),n);return a===t&&(this._currentActiveID=c),i["default"].createElement(d,{key:"item_"+e+"_"+n,id:c,dataItem:t,focused:a===t,selected:s===t,onClick:o.bind(null,t)},p?i["default"].createElement(p,{item:t,value:g.dataValue(t,l),text:g.dataText(t,u)}):g.dataText(t,u))},_isIndexOf:function(e,t){return this.props.data[e]===t},_group:function(e,t,n){var r="function"==typeof e?e:function(t){return t[e]};return n=n||[],v["default"]("string"!=typeof e||!t.length||m["default"].has(t[0],e),"[React Widgets] You are seem to be trying to group this list by a "+("property `"+e+"` that doesn't exist in the dataset items, this may be a typo")),t.reduce(function(e,t){var a=r(t);return m["default"].has(e,a)?e[a].push(t):(n.push(a),e[a]=[t]),e},{})},_data:function(){var e=this.state.groups;return this.state.sortedKeys.reduce(function(t,n){return t.concat(e[n])},[])},move:function(){var e=this.getItemDOMNode(this.props.focused);e&&b.notify(this.props.onMove,[e,d["default"].findDOMNode(this),this.props.focused])},getItemDOMNode:function(e){var t,n,r=d["default"].findDOMNode(this),a=this.state.groups,i=-1;return this.state.sortedKeys.some(function(s){return t=a[s].indexOf(e),i++,-1!==t?!!(n=r.children[i+t+1]):void(i+=a[s].length)}),n}}),e.exports=t["default"]},function(e,t,n){"use strict";var r=n(41),a=r;e.exports=a},function(e,t){function n(e){return function(){return e}}function r(){}r.thatReturns=n,r.thatReturnsFalse=n(!1),r.thatReturnsTrue=n(!0),r.thatReturnsNull=n(null),r.thatReturnsThis=function(){return this},r.thatReturnsArgument=function(e){return e},e.exports=r},function(e,t,n){"use strict";e.exports=function(e){}},function(e,t,n){"use strict";function r(e){return"value"===e?"valueLink":"checked"===e?"checkedLink":null}function a(e){return"default"+e.charAt(0).toUpperCase()+e.substr(1)}function i(e,t,n){return function(){for(var r=arguments.length,a=Array(r),i=0;r>i;i++)a[i]=arguments[i];t&&t.call.apply(t,[e].concat(a)),n&&n.call.apply(n,[e].concat(a))}}function s(e,t,n){return o(e,t.bind(null,n=n||(Array.isArray(e)?[]:{}))),n}function o(e,t,n){if(Array.isArray(e))return e.forEach(t,n);for(var r in e)u(e,r)&&t.call(n,e[r],r,e)}function u(e,t){return e?Object.prototype.hasOwnProperty.call(e,t):!1}var l=n(44),p=n(3);n(23),p.version.split(".").map(parseFloat);e.exports=function(e,t,n){function u(e,n){for(var a=arguments.length,i=Array(a>2?a-2:0),s=2;a>s;s++)i[s-2]=arguments[s];var o=r(e),u=this.props[t[e]];o&&d(this.props,o)&&!u&&(u=this.props[o].requestChange),u&&(this._notifying=!0,u.call.apply(u,[this,n].concat(i)),this._notifying=!1),this.setState(function(){var t={};return t[e]=n,t}())}function d(e,t){return void 0!==e[t]}var c=e.displayName||e.name||"Component",f={};return c=c[0].toUpperCase()+c.substr(1),n=n||{},p.createClass({displayName:"Uncontrolled"+c,propTypes:f,getInitialState:function(){var e=this.props,n=Object.keys(t);return s(n,function(t,n){t[n]=e[a(n)]},{})},shouldComponentUpdate:function(){return!this._notifying},render:function(){var a=this,s={},c=this.props,f=(c.valueLink,c.checkedLink,l.objectWithoutProperties(c,["valueLink","checkedLink"]));return o(t,function(e,t){var n=r(t),i=a.props[t];n&&!d(a.props,t)&&d(a.props,n)&&(i=a.props[n].value),s[t]=void 0!==i?i:a.state[t],s[e]=u.bind(a,t)}),s=l._extends({},f,s),o(n,function(e,t){return s[t]=i(a,e,s[t])}),p.createElement(e,s)}})}},function(e,t,n){var r,a,i;!function(n,s){a=[t],r=s,i="function"==typeof r?r.apply(t,a):r,!(void 0!==i&&(e.exports=i))}(this,function(e){var t=e;t.objectWithoutProperties=function(e,t){var n={};for(var r in e)t.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n},t._extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}})},function(e,t,n){"use strict";function r(e){return e.disabled===!0||"disabled"===e.disabled}function a(e){return e.readOnly===!0||"readOnly"===e.readOnly}function i(e,t){return r(t)||o(e,t.disabled,t.valueField)}function s(e,t){return a(t)||o(e,t.readOnly,t.valueField)}function o(e,t,n){return Array.isArray(t)?t.some(function(t){return p.valueMatcher(e,t,n)}):p.valueMatcher(e,t,n)}function u(e,t,n,r){for(var a=function(e){return i(e,n)||s(e,n)},o="next"===e?r.last():r.first(),u=r[e](t);u!==o&&a(u);)u=r[e](u);return a(u)?t:u}function l(e){function t(t){return function(){for(var n=arguments.length,i=Array(n),s=0;n>s;s++)i[s]=arguments[s];return r(this.props)||!e&&a(this.props)?void 0:t.apply(this,i)}}return function(e,n,r){return r.initializer?!function(){var e=r.initializer;r.initializer=function(){return t(e())}}():r.value=t(r.value),r}}t.__esModule=!0,t.isDisabled=r,t.isReadOnly=a,t.isDisabledItem=i,t.isReadOnlyItem=s,t.contains=o,t.move=u;var p=n(35),d=l(!0);t.widgetEnabled=d;var c=l(!1);t.widgetEditable=c},function(e,t,n){"use strict";var r=n(8),a=r.has;e.exports={componentWillUnmount:function(){var e=this._timers||{};this._unmounted=!0;for(var t in e)a(e,t)&&clearTimeout(e[t])},setTimeout:function(e,t,n){var r=this._timers||(this._timers=Object.create(null));this._unmounted||(clearTimeout(r[e]),r[e]=window.setTimeout(t,n))}}},function(e,t,n){"use strict";var r=n(8);e.exports={shouldComponentUpdate:function(e,t){return!r.isShallowEqual(this.props,e)||!r.isShallowEqual(this.state,t);
}}},function(e,t,n){"use strict";function r(e,t,n){return t=n.props.caseSensitive?t:t.toLowerCase(),function(r){var a=d.dataText(r,n.props.textField);return n.props.caseSensitive||(a=a.toLowerCase()),e(a,t)}}var a=n(2),i=n(3),s=a.interopRequireDefault(i),o=n(32),u=a.interopRequireDefault(o),l=n(31),p=a.interopRequireDefault(l),d=n(35),c=function(e){return e===!0?"startsWith":e?e:"eq"};e.exports={propTypes:{data:s["default"].PropTypes.array,value:s["default"].PropTypes.any,filter:p["default"].filter,caseSensitive:s["default"].PropTypes.bool,minLength:s["default"].PropTypes.number},getDefaultProps:function(){return{caseSensitive:!1,minLength:1}},filterIndexOf:function(e,t){var n=-1,a="function"==typeof this.props.filter?this.props.filter:r(u["default"][c(this.props.filter)],t,this);return!t||!t.trim()||this.props.filter&&t.length<(this.props.minLength||1)?-1:(e.every(function(e,r){return a(e,t,r)?(n=r,!1):!0}),n)},filter:function(e,t){var n="string"==typeof this.props.filter?r(u["default"][this.props.filter],t,this):this.props.filter;return!n||!t||!t.trim()||t.length<(this.props.minLength||1)?e:e.filter(function(e,r){return n(e,t,r)})}}},function(e,t,n){"use strict";var r=n(2);t.__esModule=!0;var a=n(50),i=r.interopRequireDefault(a);t["default"]={_scrollTo:function(e,t,n){var r,a,s=this._scrollState||(this._scrollState={}),o=this.props.onMove,u=s.visible,l=s.focused;s.visible=!(!t.offsetWidth||!t.offsetHeight),s.focused=n,a=l!==n,r=s.visible&&!u,(r||s.visible&&a)&&(o?o(e,t,n):(s.scrollCancel&&s.scrollCancel(),s.scrollCancel=i["default"](e,t)))}},e.exports=t["default"]},function(e,t,n){"use strict";var r=n(18),a=n(17),i=n(51),s=n(52),o=n(53),u=n(19);e.exports=function(e,t){var n,l,p,d,c,f,h,m=r(e),y={top:0,left:0};if(e){n=t||i(e),d=u(n),l=s(n),f=a(n,!0),d=u(n),d||(y=r(n)),m={top:m.top-y.top,left:m.left-y.left,height:m.height,width:m.width},c=m.height,p=m.top+(d?0:l),h=p+c,l=l>p?p:h>l+f?h-f:l;var v=o(function(){return s(n,l)});return function(){return o.cancel(v)}}}},function(e,t,n){"use strict";var r=n(10),a=n(17);e.exports=function(e){var t=r(e,"position"),n="absolute"===t,i=e.ownerDocument;if("fixed"===t)return i||document;for(;(e=e.parentNode)&&9!==e.nodeType;){var s=n&&"static"===r(e,"position"),o=r(e,"overflow")+r(e,"overflow-y")+r(e,"overflow-x");if(!s&&/(auto|scroll)/.test(o)&&a(e)<e.scrollHeight)return e}return document}},function(e,t,n){"use strict";var r=n(19);e.exports=function(e,t){var n=r(e);return void 0===t?n?"pageYOffset"in n?n.pageYOffset:n.document.documentElement.scrollTop:e.scrollTop:void(n?n.scrollTo("pageXOffset"in n?n.pageXOffset:n.document.documentElement.scrollLeft,t):e.scrollTop=t)}},function(e,t,n){"use strict";function r(e){var t=(new Date).getTime(),n=Math.max(0,16-(t-p)),r=setTimeout(e,n);return p=t,r}var a,i=n(6),s=["","webkit","moz","o","ms"],o="clearTimeout",u=r,l=function(e,t){return e+(e?t[0].toUpperCase()+t.substr(1):t)+"AnimationFrame"};i&&s.some(function(e){var t=l(e,"request");return t in window?(o=l(e,"cancel"),u=function(e){return window[t](e)}):void 0});var p=(new Date).getTime();a=function(e){return u(e)},a.cancel=function(e){return window[o](e)},e.exports=a},function(e,t,n){"use strict";var r=n(3);e.exports={propTypes:{isRtl:r.PropTypes.bool},contextTypes:{isRtl:r.PropTypes.bool},childContextTypes:{isRtl:r.PropTypes.bool},getChildContext:function(){return{isRtl:this.props.isRtl||this.context&&this.context.isRtl}},isRtl:function(){return!!(this.props.isRtl||this.context&&this.context.isRtl)}}},function(e,t,n){"use strict";function r(e){return i._extends({open:"open combobox",emptyList:"There are no items in this list",emptyFilter:"The filter returned no results"},e)}function a(e,t,n){return"string"==typeof e?function(r){return f["default"][e](N.dataText(r,n).toLowerCase(),t.toLowerCase())}:function(n){return e(n,t)}}var i=n(2);t.__esModule=!0;var s=n(3),o=i.interopRequireDefault(s),u=n(7),l=i.interopRequireDefault(u),p=n(8),d=i.interopRequireDefault(p),c=n(32),f=i.interopRequireDefault(c),h=n(9),m=i.interopRequireDefault(h),y=n(56),v=i.interopRequireDefault(y),g=n(57),b=i.interopRequireDefault(g),D=n(30),T=i.interopRequireDefault(D),w=n(31),x=i.interopRequireDefault(w),_=n(33),O=i.interopRequireDefault(_),P=n(39),k=i.interopRequireDefault(P),I=n(42),R=i.interopRequireDefault(I),E=n(43),C=i.interopRequireDefault(E),N=n(35),q=n(45),F=n(36),S=function(e){return e===!0?"startsWith":e?e:"eq"},A=d["default"].omit,L=d["default"].pick,M={value:o["default"].PropTypes.any,onChange:o["default"].PropTypes.func,open:o["default"].PropTypes.bool,onToggle:o["default"].PropTypes.func,itemComponent:x["default"].elementType,listComponent:x["default"].elementType,groupComponent:x["default"].elementType,groupBy:x["default"].accessor,data:o["default"].PropTypes.array,valueField:o["default"].PropTypes.string,textField:x["default"].accessor,name:o["default"].PropTypes.string,onSelect:o["default"].PropTypes.func,disabled:x["default"].disabled,readOnly:x["default"].readOnly,suggest:x["default"].filter,filter:x["default"].filter,busy:o["default"].PropTypes.bool,dropUp:o["default"].PropTypes.bool,duration:o["default"].PropTypes.number,placeholder:o["default"].PropTypes.string,messages:o["default"].PropTypes.shape({open:x["default"].message,emptyList:x["default"].message,emptyFilter:x["default"].message})},U=o["default"].createClass(i.createDecoratedObject([{key:"displayName",initializer:function(){return"ComboBox"}},{key:"mixins",initializer:function(){return[n(46),n(48),n(49),n(54),n(38)("input")]}},{key:"propTypes",initializer:function(){return M}},{key:"getInitialState",value:function(){var e=this.props,t=e.value,n=e.data,r=e.valueField,a=this.process(n,t),i=N.dataIndexOf(a,t,r);return{selectedItem:a[i],focusedItem:a[~i?i:0],processedData:a,open:!1}}},{key:"getDefaultProps",value:function(){return{data:[],value:"",open:!1,suggest:!1,filter:!1,delay:500,messages:r(),ariaActiveDescendantKey:"combobox"}}},{key:"componentDidUpdate",value:function(){this.refs.list&&R["default"](this.refs.list)}},{key:"shouldComponentUpdate",value:function(e,t){var n=this.refs.input&&this.refs.input.isSuggesting(),r=!d["default"].isShallowEqual(t,this.state),a=!d["default"].isShallowEqual(e,this.props);return n||r||a}},{key:"componentWillReceiveProps",value:function(e){var t=e.value,n=e.data,r=e.valueField,a=e.textField,i=N.dataIndexOf(n,t,r),s=-1===i?e.value:e.data[i],o=this.refs.input.isSuggesting(),u=this.process(e.data,e.value,(-1===i||o)&&N.dataText(s,a)),l=N.dataIndexOf(u,t,r),p=this.filterIndexOf(u,N.dataText(s,a));this._searchTerm="",this.setState({processedData:u,selectedItem:u[l],focusedItem:u[-1===l?-1!==p?p:0:l]})}},{key:"render",value:function(){var e,t=this,n=this.props,a=n.className,s=n.tabIndex,u=n.filter,p=n.suggest,c=n.valueField,f=n.textField,h=n.groupBy,y=n.messages,g=n.data,D=n.busy,w=n.dropUp,x=n.name,_=n.placeholder,P=n.value,I=n.open,R=n.disabled,E=n.readOnly,C=n.listComponent;C=C||h&&k["default"]||O["default"];var q=A(this.props,Object.keys(M)),S=L(this.props,Object.keys(T["default"].type(C).propTypes)),U=L(this.props,Object.keys(T["default"].type(m["default"]).propTypes)),z=this.state,V=z.focusedItem,j=z.selectedItem,K=z.focused,W=this._data(),B=N.dataItem(g,P,c),G=F.instanceId(this,"_input"),H=F.instanceId(this,"_listbox"),Y=p?u?"both":"inline":u?"list":"",X=F.isFirstFocusedRender(this)||I;return y=r(y),o["default"].createElement("div",i._extends({},q,{ref:"element",onKeyDown:this._keyDown,onFocus:this._focus.bind(null,!0),onBlur:this._focus.bind(null,!1),tabIndex:"-1",className:l["default"](a,"rw-combobox","rw-widget",(e={"rw-state-focus":K,"rw-state-disabled":R,"rw-state-readonly":E,"rw-rtl":this.isRtl()},e["rw-open"+(w?"-up":"")]=I,e))}),o["default"].createElement(v["default"],{tabIndex:"-1",className:"rw-select",onClick:this.toggle,disabled:!(!R&&!E)},o["default"].createElement("i",{className:l["default"]("rw-i rw-i-caret-down",{"rw-loading":D})},o["default"].createElement("span",{className:"rw-sr"},d["default"].result(y.open,this.props)))),o["default"].createElement(b["default"],{ref:"input",id:G,tabIndex:s,suggest:p,name:x,role:"combobox","aria-owns":H,"aria-busy":!!D,"aria-autocomplete":Y,"aria-expanded":I,"aria-haspopup":!0,placeholder:_,disabled:R,readOnly:E,className:"rw-input",value:N.dataText(B,f),onChange:this._inputTyping,onKeyDown:this._inputKeyDown}),o["default"].createElement(m["default"],i._extends({},U,{onOpening:function(){return t.refs.list.forceUpdate()},onRequestClose:this.close}),o["default"].createElement("div",null,X&&o["default"].createElement(C,i._extends({ref:"list"},S,{id:H,data:W,selected:j,focused:V,"aria-hidden":!I,"aria-labelledby":G,"aria-live":I&&"polite",onSelect:this._onSelect,onMove:this._scrollTo,messages:{emptyList:g.length?y.emptyFilter:y.emptyList}})))))}},{key:"_onSelect",decorators:[q.widgetEditable],value:function(e){this.close(),F.notify(this.props.onSelect,e),this.change(e),this.focus()}},{key:"_inputKeyDown",value:function(e){this._deleting="Backspace"===e.key||"Delete"===e.key,this._isTyping=!0}},{key:"_inputTyping",value:function(e){var t,n=this.props,r=n.data,a=n.textField,i=!!this.props.suggest,s=e.target.value;t=this._deleting||!i?s:this.suggest(this._data(),s),t=t||s,r=d["default"].find(r,function(e){return N.dataText(e,a).toLowerCase()===t.toLowerCase()}),this.change(!this._deleting&&r?r:s,!0),this.open()}},{key:"focus",value:function(){this.refs.input.focus()}},{key:"_focus",decorators:[q.widgetEnabled],value:function(e,t){var n=this;!e&&this.refs.input.accept(),this.setTimeout("focus",function(){e||n.close(),e!==n.state.focused&&(F.notify(n.props[e?"onFocus":"onBlur"],t),n.setState({focused:e}))})}},{key:"_keyDown",decorators:[q.widgetEditable],value:function(e){function t(e,t){return e?(n.refs.input.accept(!0),t?n._onSelect(e):void n.change(e,!1)):n.change(T["default"].findDOMNode(n.refs.input).value,!1)}var n=this,r=e.key,a=e.altKey,i=this.refs.list,s=this.state.focusedItem,o=this.state.selectedItem,u=this.props.open;"End"===r?u?this.setState({focusedItem:i.last()}):t(i.last(),!0):"Home"===r?u?this.setState({focusedItem:i.first()}):t(i.first(),!0):"Escape"===r&&u?this.close():"Enter"===r&&u?t(this.state.focusedItem,!0):"ArrowDown"===r?a?this.open():u?this.setState({focusedItem:i.next(s)}):t(i.next(o),!0):"ArrowUp"===r&&(a?this.close():u?this.setState({focusedItem:i.prev(s)}):t(i.prev(o),!0)),F.notify(this.props.onKeyDown,[e])}},{key:"change",value:function(e,t){this._typedChange=!!t,F.notify(this.props.onChange,e)}},{key:"open",value:function(){this.props.open||F.notify(this.props.onToggle,!0)}},{key:"close",value:function(){this.props.open&&F.notify(this.props.onToggle,!1)}},{key:"toggle",decorators:[q.widgetEditable],value:function(){this.focus(),this.props.open?this.close():this.open()}},{key:"suggest",value:function V(e,t){var n,r=this.props,i=r.textField,V=r.suggest,s=r.minLength,o=N.dataText(t,i);return V=S(V),!(o||"").trim()||o.length<(s||1)?"":(n="string"==typeof t?d["default"].find(e,a(V,o,i)):t,!n||this.state&&this.state.deleting?"":N.dataText(n,i))}},{key:"_data",value:function(){return this.state.processedData}},{key:"process",value:function(e,t,n){return this.props.filter&&n&&(e=this.filter(e,n)),e}}])),z=C["default"](U,{open:"onToggle",value:"onChange"});z.BaseComboBox=U,t["default"]=z,e.exports=t["default"]},function(e,t,n){"use strict";var r=n(2),a=n(3),i=n(7);e.exports=a.createClass({displayName:"exports",render:function(){var e=this.props,t=e.className,n=e.children,s=r.objectWithoutProperties(e,["className","children"]);return a.createElement("button",r._extends({},s,{type:"button",className:i(t,"rw-btn")}),n)}})},function(e,t,n){"use strict";var r=n(2);t.__esModule=!0;var a=n(3),i=r.interopRequireDefault(a),s=n(58),o=r.interopRequireDefault(s),u=n(30),l=r.interopRequireDefault(u);t["default"]=i["default"].createClass({displayName:"ComboboxInput",propTypes:{value:i["default"].PropTypes.string,onChange:i["default"].PropTypes.func.isRequired},componentDidUpdate:function(){var e=l["default"].findDOMNode(this),t=this.props.value;if(this.isSuggesting()){var n=t.toLowerCase().indexOf(this._last.toLowerCase())+this._last.length,r=t.length-n;n>=0&&o["default"](e,n,n+r)}},getDefaultProps:function(){return{value:""}},render:function(){return i["default"].createElement("input",r._extends({},this.props,{type:"text","aria-disabled":this.props.disabled,"aria-readonly":this.props.readOnly,className:this.props.className+" rw-input",onKeyDown:this.props.onKeyDown,onChange:this._change,value:null==this.props.value?"":this.props.value}))},isSuggesting:function(){var e=this.props.value,t=null!=this._last&&-1!==e.toLowerCase().indexOf(this._last.toLowerCase());return this.props.suggest&&t},accept:function(e){var t=l["default"].findDOMNode(this).value||"",n=t.length;this._last=null,e&&o["default"](l["default"].findDOMNode(this),n,n)},_change:function(e){var t=e.target.value,n=!!this.props.placeholder;(!n||t||t!==(this.props.value||""))&&(this._last=t,this.props.onChange(e,t))},focus:function(){l["default"].findDOMNode(this).focus()}}),e.exports=t["default"]},function(e,t){"use strict";function n(e){var t,n,r,a;if(void 0!==e.selectionStart)t=e.selectionStart,n=e.selectionEnd;else try{e.focus(),r=e.createTextRange(),a=r.duplicate(),r.moveToBookmark(document.selection.createRange().getBookmark()),a.setEndPoint("EndToStart",r),t=a.text.length,n=t+r.text.length}catch(i){}return{start:t,end:n}}function r(e,t,n){var r;try{void 0!==e.selectionStart?(e.focus(),e.setSelectionRange(t,n)):(e.focus(),r=e.createTextRange(),r.collapse(!0),r.moveStart("character",t),r.moveEnd("character",n-t),r.select())}catch(a){}}e.exports=function(e,t,a){return void 0===t?n(e):void r(e,t,a)}},function(e,t,n){"use strict";function r(e){return e&&!isNaN(e.getTime())?e:null}function a(e){return i._extends({moveBack:"navigate back",moveForward:"navigate forward"},e)}var i=n(2);t.__esModule=!0;var s,o,u,l=n(3),p=i.interopRequireDefault(l),d=n(7),c=i.interopRequireDefault(d),f=n(30),h=i.interopRequireDefault(f),m=n(60),y=i.interopRequireDefault(m),v=n(62),g=i.interopRequireDefault(v),b=n(63),D=i.interopRequireDefault(b),T=n(66),w=i.interopRequireDefault(T),x=n(67),_=i.interopRequireDefault(x),O=n(68),P=i.interopRequireDefault(O),k=n(20),I=i.interopRequireDefault(k),R=n(31),E=i.interopRequireDefault(R),C=n(43),N=i.interopRequireDefault(C),q=n(69),F=i.interopRequireDefault(q),S=n(64),A=i.interopRequireDefault(S),L=n(65),M=i.interopRequireDefault(L),U=n(8),z=i.interopRequireDefault(U),V=n(36),j=n(45),K=M["default"].directions,W=function(e){return Object.keys(e).map(function(t){return e[t]})},B=function(e){return z["default"].transform(e,function(e,t,n){e[t]=n},{})},G=I["default"].locale,H=M["default"].calendarViews,Y=W(H),X=B(M["default"].calendarViewHierarchy),Z=M["default"].calendarViewHierarchy,$=M["default"].calendarViewUnits,J=(s={},s[H.MONTH]=D["default"],s[H.YEAR]=w["default"],s[H.DECADE]=_["default"],s[H.CENTURY]=P["default"],s),Q={ArrowDown:K.DOWN,ArrowUp:K.UP,ArrowRight:K.RIGHT,ArrowLeft:K.LEFT},ee=(o={},o[K.LEFT]=K.RIGHT,o[K.RIGHT]=K.LEFT,o),te=(u={},u[H.YEAR]=1,u[H.DECADE]=10,u[H.CENTURY]=100,u),ne=function(e,t){return e[t+"Format"]||G.date.formats[t]},re={disabled:E["default"].disabled,readOnly:E["default"].readOnly,onChange:p["default"].PropTypes.func,value:p["default"].PropTypes.instanceOf(Date),min:p["default"].PropTypes.instanceOf(Date),max:p["default"].PropTypes.instanceOf(Date),initialView:p["default"].PropTypes.oneOf(Y),finalView:function(e,t,n){var r=p["default"].PropTypes.oneOf(Y)(e,t,n);return r?r:Y.indexOf(e[t])<Y.indexOf(e.initialView)?new Error(("The `"+t+"` prop: `"+e[t]+"` cannot be 'lower' than the `initialView`\n        prop. This creates a range that cannot be rendered.").replace(/\n\t/g,"")):void 0},culture:p["default"].PropTypes.string,footer:p["default"].PropTypes.bool,dayComponent:E["default"].elementType,headerFormat:E["default"].dateFormat,footerFormat:E["default"].dateFormat,dayFormat:E["default"].dateFormat,dateFormat:E["default"].dateFormat,monthFormat:E["default"].dateFormat,yearFormat:E["default"].dateFormat,decadeFormat:E["default"].dateFormat,centuryFormat:E["default"].dateFormat,messages:p["default"].PropTypes.shape({moveBack:p["default"].PropTypes.string,moveForward:p["default"].PropTypes.string})},ae=p["default"].createClass(i.createDecoratedObject([{key:"displayName",initializer:function(){return"Calendar"}},{key:"mixins",initializer:function(){return[n(46),n(47),n(54),n(38)()]}},{key:"propTypes",initializer:function(){return re}},{key:"getInitialState",value:function(){var e=this.inRangeValue(this.props.value);return{selectedIndex:0,view:this.props.initialView||"month",currentDate:e?new Date(e):this.inRangeValue(new Date)}}},{key:"getDefaultProps",value:function(){return{value:null,min:new Date(1900,0,1),max:new Date(2099,11,31),initialView:"month",finalView:"century",tabIndex:"0",footer:!1,ariaActiveDescendantKey:"calendar",messages:a({})}}},{key:"componentWillReceiveProps",value:function(e){var t=Y.indexOf(e.initialView),n=Y.indexOf(e.finalView),a=Y.indexOf(this.state.view),i=this.state.view,s=this.inRangeValue(e.value);t>a?this.setState({view:i=e.initialView}):a>n&&this.setState({view:i=e.finalView}),A["default"].eq(s,r(this.props.value),$[i])||this.setState({currentDate:s?new Date(s):new Date})}},{key:"render",value:function(){var e=this,t=this.props,n=t.className,r=t.value,s=t.footerFormat,o=t.disabled,u=t.readOnly,l=t.finalView,d=t.footer,f=t.messages,m=t.min,v=t.max,b=t.culture,D=t.duration,T=this.state,w=T.view,x=T.currentDate,_=T.slideDirection,O=T.focused,P=J[w],k=$[w],I=new Date,R=!A["default"].inRange(I,m,v,w);k="day"===k?"date":k;var E=V.instanceId(this,"_calendar"),C=V.instanceId(this,"_calendar_label"),N=w+"_"+A["default"][w](x),q=z["default"].omit(this.props,Object.keys(re)),S=z["default"].pick(this.props,Object.keys(h["default"].type(P).propTypes)),L=o||u;return f=a(this.props.messages),p["default"].createElement("div",i._extends({},q,{role:"group",onKeyDown:this._keyDown,onFocus:this._focus.bind(null,!0),onBlur:this._focus.bind(null,!1),className:c["default"](n,"rw-calendar","rw-widget",{"rw-state-focus":O,"rw-state-disabled":o,"rw-state-readonly":u,"rw-rtl":this.isRtl()})}),p["default"].createElement(y["default"],{label:this._label(),labelId:C,messages:f,upDisabled:L||w===l,prevDisabled:L||!A["default"].inRange(this.nextDate(K.LEFT),m,v,w),nextDisabled:L||!A["default"].inRange(this.nextDate(K.RIGHT),m,v,w),onViewChange:this.navigate.bind(null,K.UP,null),onMoveLeft:this.navigate.bind(null,K.LEFT,null),onMoveRight:this.navigate.bind(null,K.RIGHT,null)}),p["default"].createElement(F["default"],{ref:"animation",duration:D,direction:_,onAnimate:function(){return e.focus(!0)}},p["default"].createElement(P,i._extends({},S,{tabIndex:"-1",key:N,id:E,className:"rw-calendar-grid","aria-labelledby":C,today:I,value:r,focused:x,onChange:this.change,onKeyDown:this._keyDown,ariaActiveDescendantKey:"calendarView"}))),d&&p["default"].createElement(g["default"],{value:I,format:s,culture:b,disabled:o||R,readOnly:u,onClick:this.select}))}},{key:"navigate",decorators:[j.widgetEditable],value:function(e,t){var n=this.state.view,r=e===K.LEFT||e===K.UP?"right":"left";t||(t=-1!==[K.LEFT,K.RIGHT].indexOf(e)?this.nextDate(e):this.state.currentDate),e===K.DOWN&&(n=X[n]||n),e===K.UP&&(n=Z[n]||n),this.isValidView(n)&&A["default"].inRange(t,this.props.min,this.props.max,n)&&(V.notify(this.props.onNavigate,[t,r,n]),this.focus(!0),this.setState({currentDate:t,slideDirection:r,view:n}))}},{key:"focus",value:function(){+this.props.tabIndex>-1&&h["default"].findDOMNode(this).focus()}},{key:"_focus",decorators:[j.widgetEnabled],value:function(e,t){var n=this;-1!==+this.props.tabIndex&&this.setTimeout("focus",function(){e!==n.state.focused&&(V.notify(n.props[e?"onFocus":"onBlur"],t),n.setState({focused:e}))})}},{key:"change",decorators:[j.widgetEditable],value:function(e){return this.state.view===this.props.initialView?(V.notify(this.props.onChange,e),void this.focus()):void this.navigate(K.DOWN,e)}},{key:"select",decorators:[j.widgetEditable],value:function(e){var t=this.props.initialView,n=t!==this.state.view||A["default"].gt(e,this.state.currentDate)?"left":"right";V.notify(this.props.onChange,e),this.isValidView(t)&&A["default"].inRange(e,this.props.min,this.props.max,t)&&(this.focus(),this.setState({currentDate:e,slideDirection:n,view:t}))}},{key:"nextDate",value:function(e){var t=e===K.LEFT?"subtract":"add",n=this.state.view,r=n===H.MONTH?n:H.YEAR,a=te[n]||1;return A["default"][t](this.state.currentDate,1*a,r)}},{key:"_keyDown",decorators:[j.widgetEditable],value:function(e){var t=e.ctrlKey,n=e.key,r=Q[n],a=this.state.currentDate,i=this.state.view,s=$[i],o=a;return"Enter"===n?(e.preventDefault(),this.change(a)):(r&&(t?(e.preventDefault(),this.navigate(r)):(this.isRtl()&&ee[r]&&(r=ee[r]),o=A["default"].move(o,this.props.min,this.props.max,i,r),A["default"].eq(a,o,s)||(e.preventDefault(),A["default"].gt(o,a,i)?this.navigate(K.RIGHT,o):A["default"].lt(o,a,i)?this.navigate(K.LEFT,o):this.setState({currentDate:o})))),void V.notify(this.props.onKeyDown,[e]))}},{key:"_label",value:function(){var e=this.props,t=e.culture,n=i.objectWithoutProperties(e,["culture"]),r=this.state.view,a=this.state.currentDate;return"month"===r?G.date.format(a,ne(n,"header"),t):"year"===r?G.date.format(a,ne(n,"year"),t):"decade"===r?G.date.format(A["default"].startOf(a,"decade"),ne(n,"decade"),t):"century"===r?G.date.format(A["default"].startOf(a,"century"),ne(n,"century"),t):void 0}},{key:"inRangeValue",value:function(e){var t=r(e);return null===t?t:A["default"].max(A["default"].min(t,this.props.max),this.props.min)}},{key:"isValidView",value:function(e){var t=Y.indexOf(this.props.initialView),n=Y.indexOf(this.props.finalView),r=Y.indexOf(e);return r>=t&&n>=r}}])),ie=N["default"](ae,{value:"onChange"});ie.BaseCalendar=ae,t["default"]=ie,e.exports=t["default"]},function(e,t,n){"use strict";var r=n(3),a=n(56);e.exports=r.createClass({displayName:"exports",propTypes:{label:r.PropTypes.string.isRequired,labelId:r.PropTypes.string,upDisabled:r.PropTypes.bool.isRequired,prevDisabled:r.PropTypes.bool.isRequired,nextDisabled:r.PropTypes.bool.isRequired,onViewChange:r.PropTypes.func.isRequired,onMoveLeft:r.PropTypes.func.isRequired,onMoveRight:r.PropTypes.func.isRequired,messages:r.PropTypes.shape({moveBack:r.PropTypes.string,moveForward:r.PropTypes.string})},mixins:[n(47),n(61)],getDefaultProps:function(){return{messages:{moveBack:"navigate back",moveForward:"navigate forward"}}},render:function(){var e=this.props,t=e.messages,n=e.label,i=e.labelId,s=e.onMoveRight,o=e.onMoveLeft,u=e.onViewChange,l=e.prevDisabled,p=e.upDisabled,d=e.nextDisabled,c=this.isRtl();return r.createElement("div",{className:"rw-header"},r.createElement(a,{className:"rw-btn-left",tabIndex:"-1",onClick:o,disabled:l,"aria-disabled":l,"aria-label":t.moveBack,title:t.moveBack},r.createElement("i",{"aria-hidden":"false",className:"rw-i rw-i-caret-"+(c?"right":"left")})),r.createElement(a,{id:i,tabIndex:"-1",className:"rw-btn-view",disabled:p,"aria-disabled":p,"aria-live":"polite","aria-atomic":"true",onClick:u},n),r.createElement(a,{className:"rw-btn-right",tabIndex:"-1",onClick:s,disabled:d,title:t.moveForward,"aria-label":t.moveForward,"aria-disabled":d},r.createElement("i",{"aria-hidden":"false",className:"rw-i rw-i-caret-"+(c?"left":"right")})))}})},function(e,t,n){"use strict";var r=n(2);t.__esModule=!0;var a=n(3),i=r.interopRequireDefault(a);t["default"]={contextTypes:{isRtl:i["default"].PropTypes.bool},isRtl:function(){return!!this.context.isRtl}},e.exports=t["default"]},function(e,t,n){"use strict";var r=n(3),a=n(56),i=n(20).locale,s=function(e){return e.format||i.date.formats.footer};e.exports=r.createClass({displayName:"Footer",render:function(){var e=this.props.value,t=i.date.format(e,s(this.props),this.props.culture);return r.createElement("div",{className:"rw-footer"},r.createElement(a,{tabIndex:"-1","aria-disabled":!!this.props.disabled,"aria-readonly":!!this.props.readOnly,disabled:this.props.disabled,readOnly:this.props.readOnly,onClick:this.props.onClick.bind(null,e)},t))}})},function(e,t,n){"use strict";var r=n(2);t.__esModule=!0;var a=n(3),i=r.interopRequireDefault(a),s=n(7),o=r.interopRequireDefault(s),u=n(64),l=r.interopRequireDefault(u),p=n(20),d=r.interopRequireDefault(p),c=n(31),f=r.interopRequireDefault(c),h=n(8),m=r.interopRequireDefault(h),y=n(36),v=d["default"].locale,g=function(e){return e.dayFormat||v.date.formats.weekday},b=function(e){return e.dateFormat||v.date.formats.dayOfMonth},D=function(e,t){return e+"__month_"+l["default"].month(t)+"-"+l["default"].date(t)},T={optionID:i["default"].PropTypes.func,culture:i["default"].PropTypes.string,value:i["default"].PropTypes.instanceOf(Date),focused:i["default"].PropTypes.instanceOf(Date),min:i["default"].PropTypes.instanceOf(Date),max:i["default"].PropTypes.instanceOf(Date),dayComponent:f["default"].elementType,dayFormat:f["default"].dateFormat,dateFormat:f["default"].dateFormat,footerFormat:f["default"].dateFormat,onChange:i["default"].PropTypes.func.isRequired},w=function(e,t){return l["default"].eq(e,t,"day")},x=i["default"].createClass({displayName:"MonthView",statics:{isEqual:w},mixins:[n(61),n(38)()],propTypes:T,componentDidUpdate:function(){var e=D(y.instanceId(this),this.props.focused);this.ariaActiveDescendant(e,null)},render:function(){var e=this.props,t=e.focused,n=e.culture,a=l["default"].visibleDays(t,n),s=m["default"].chunk(a,7),o=m["default"].omit(this.props,Object.keys(T));return i["default"].createElement("table",r._extends({},o,{role:"grid"}),i["default"].createElement("thead",null,i["default"].createElement("tr",null,this._headers(g(this.props),n))),i["default"].createElement("tbody",null,s.map(this._row)))},_row:function(e,t){var n=this,r=this.props,a=r.focused,s=r.today,u=r.disabled,p=r.onChange,d=r.value,c=r.culture,f=r.min,h=r.max,m=r.dayComponent,g=y.instanceId(this),T=v.date.formats.footer;return i["default"].createElement("tr",{key:"week_"+t,role:"row"},e.map(function(e,t){var r=w(e,a),y=w(e,d),x=w(e,s),_=v.date.format(e,b(n.props),c),O=v.date.format(e,T,c),P=D(g,e);return l["default"].inRange(e,f,h)?i["default"].createElement("td",{key:"day_"+t,role:"gridcell",id:P,title:O,"aria-selected":y,"aria-label":O,"aria-readonly":u},i["default"].createElement("span",{"aria-labelledby":P,onClick:p.bind(null,e),className:o["default"]("rw-btn",{"rw-off-range":l["default"].month(e)!==l["default"].month(a),"rw-state-focus":r,"rw-state-selected":y,"rw-now":x})},m?i["default"].createElement(m,{date:e,label:_}):_)):i["default"].createElement("td",{key:"day_"+t,role:"presentation",className:"rw-empty-cell"}," ")}))},_headers:function(e,t){return[0,1,2,3,4,5,6].map(function(n){return i["default"].createElement("th",{key:"header_"+n},v.date.format(n,e,t))})}});t["default"]=x,e.exports=t["default"]},function(e,t,n){"use strict";var r=n(2),a=n(24),i=n(65),s=i.directions,o=i.calendarViewUnits,u=n(20).locale,l=e.exports=r._extends(a,{parse:function(e,t,n){return u.date.parse(e,t,n)},format:function(e,t,n){return u.date.format(e,t,n)},monthsInYear:function(e){var t=[0,1,2,3,4,5,6,7,8,9,10,11],n=new Date(e,0,1);return t.map(function(e){return l.month(n,e)})},firstVisibleDay:function(e,t){var n=l.startOf(e,"month");return l.startOf(n,"week",u.date.startOfWeek(t))},lastVisibleDay:function(e,t){var n=l.endOf(e,"month");return l.endOf(n,"week",u.date.startOfWeek(t))},visibleDays:function(e,t){for(var n=l.firstVisibleDay(e,t),r=l.lastVisibleDay(e,t),a=[];l.lte(n,r,"day");)a.push(n),n=l.add(n,1,"day");return a},move:function(e,t,n,r,a){var i,u="month"===r,p=a===s.UP||a===s.DOWN,d=o[r],c=u&&p?"week":o[r],f=u||!p?1:4;return(a===s.UP||a===s.LEFT)&&(f*=-1),i=l.add(e,f,c),l.inRange(i,t,n,d)?i:e},merge:function(e,t){return null==t&&null==e?null:(null==t&&(t=new Date),null==e&&(e=new Date),e=l.startOf(e,"day"),e=l.hours(e,l.hours(t)),e=l.minutes(e,l.minutes(t)),e=l.seconds(e,l.seconds(t)),l.milliseconds(e,l.milliseconds(t)))},sameMonth:function(e,t){return l.eq(e,t,"month")},today:function(){return this.startOf(new Date,"day")},yesterday:function(){return this.add(this.startOf(new Date,"day"),-1,"day")},tomorrow:function(){return this.add(this.startOf(new Date,"day"),1,"day")}})},function(e,t){"use strict";var n,r,a={MONTH:"month",YEAR:"year",DECADE:"decade",CENTURY:"century"};e.exports={directions:{LEFT:"LEFT",RIGHT:"RIGHT",UP:"UP",DOWN:"DOWN"},datePopups:{TIME:"time",CALENDAR:"calendar"},calendarViews:a,calendarViewHierarchy:(n={},n[a.MONTH]=a.YEAR,n[a.YEAR]=a.DECADE,n[a.DECADE]=a.CENTURY,n),calendarViewUnits:(r={},r[a.MONTH]="day",r[a.YEAR]=a.MONTH,r[a.DECADE]=a.YEAR,r[a.CENTURY]=a.DECADE,r)}},function(e,t,n){"use strict";var r=n(2);t.__esModule=!0;var a=n(3),i=r.interopRequireDefault(a),s=n(7),o=r.interopRequireDefault(s),u=n(64),l=r.interopRequireDefault(u),p=n(20),d=r.interopRequireDefault(p),c=n(8),f=r.interopRequireDefault(c),h=n(31),m=r.interopRequireDefault(h),y=n(36),v=d["default"].locale,g=function(e){return e.monthFormat||v.date.formats.month},b={optionID:i["default"].PropTypes.func,culture:i["default"].PropTypes.string,value:i["default"].PropTypes.instanceOf(Date),focused:i["default"].PropTypes.instanceOf(Date),min:i["default"].PropTypes.instanceOf(Date),max:i["default"].PropTypes.instanceOf(Date),onChange:i["default"].PropTypes.func.isRequired,monthFormat:m["default"].dateFormat},D=function(e,t){return l["default"].eq(e,t,"month")},T=function(e,t){return e+"__year_"+l["default"].year(t)+"-"+l["default"].month(t)},w=i["default"].createClass({displayName:"YearView",mixins:[n(61),n(38)()],propTypes:b,componentDidUpdate:function(){var e=T(y.instanceId(this),this.props.focused);this.ariaActiveDescendant(e)},render:function(){var e=this.props,t=e.className,n=e.focused,a=l["default"].monthsInYear(l["default"].year(n)),s=f["default"].chunk(a,4),u=f["default"].omit(this.props,Object.keys(b));return i["default"].createElement("table",r._extends({},u,{role:"grid",className:o["default"](t,"rw-nav-view")}),i["default"].createElement("tbody",null,s.map(this._row)))},_row:function(e,t){var n=this,r=this.props,a=r.focused,s=r.disabled,u=r.onChange,p=r.value,d=r.today,c=r.culture,f=r.min,h=r.max,m=y.instanceId(this),b=v.date.formats.header;return i["default"].createElement("tr",{key:t,role:"row"},e.map(function(e,t){var r=D(e,a),y=D(e,p),w=D(e,d),x=v.date.format(e,b,c),_=T(m,e);return l["default"].inRange(e,f,h,"month")?i["default"].createElement("td",{key:t,role:"gridcell",id:_,title:x,"aria-selected":y,"aria-readonly":s,"aria-label":x},i["default"].createElement("span",{"aria-labelledby":_,onClick:u.bind(null,e),className:o["default"]("rw-btn",{"rw-state-focus":r,"rw-state-selected":y,"rw-now":w})},v.date.format(e,g(n.props),c))):i["default"].createElement("td",{key:t,className:"rw-empty-cell",role:"presentation"}," ")}))}});t["default"]=w,e.exports=t["default"]},function(e,t,n){"use strict";function r(e,t){return d["default"].gte(e,d["default"].startOf(t,"decade"),"year")&&d["default"].lte(e,d["default"].endOf(t,"decade"),"year")}function a(e){var t=[1,2,3,4,5,6,7,8,9,10,11,12],n=d["default"].add(d["default"].startOf(e,"decade"),-2,"year");return t.map(function(){return n=d["default"].add(n,1,"year")})}var i=n(2);t.__esModule=!0;var s=n(3),o=i.interopRequireDefault(s),u=n(7),l=i.interopRequireDefault(u),p=n(64),d=i.interopRequireDefault(p),c=n(20),f=i.interopRequireDefault(c),h=n(8),m=i.interopRequireDefault(h),y=n(31),v=i.interopRequireDefault(y),g=n(36),b=f["default"].locale,D=function(e){return e.yearFormat||b.date.formats.year},T={optionID:o["default"].PropTypes.func,culture:o["default"].PropTypes.string,value:o["default"].PropTypes.instanceOf(Date),focused:o["default"].PropTypes.instanceOf(Date),min:o["default"].PropTypes.instanceOf(Date),max:o["default"].PropTypes.instanceOf(Date),onChange:o["default"].PropTypes.func.isRequired,yearFormat:v["default"].dateFormat},w=function(e,t){return d["default"].eq(e,t,"year");
},x=function(e,t){return e+"__decade_"+d["default"].year(t)};t["default"]=o["default"].createClass({displayName:"DecadeView",mixins:[n(47),n(61),n(38)()],propTypes:T,componentDidUpdate:function(){var e=x(g.instanceId(this),this.props.focused);this.ariaActiveDescendant(e)},render:function(){var e=this.props,t=e.className,n=e.focused,r=a(n),s=m["default"].chunk(r,4),u=m["default"].omit(this.props,Object.keys(T));return o["default"].createElement("table",i._extends({},u,{role:"grid",className:l["default"](t,"rw-nav-view")}),o["default"].createElement("tbody",null,s.map(this._row)))},_row:function(e,t){var n=this,a=this.props,i=a.focused,s=a.disabled,u=a.onChange,p=a.value,c=a.today,f=a.culture,h=a.min,m=a.max,y=g.instanceId(this);return o["default"].createElement("tr",{key:"row_"+t,role:"row"},e.map(function(e,t){var a=w(e,i),v=w(e,p),g=w(e,c),T=b.date.format(e,D(n.props),f),_=x(y,e);return d["default"].inRange(e,h,m,"year")?o["default"].createElement("td",{key:t,role:"gridcell",id:_,title:T,"aria-selected":v,"aria-label":T,"aria-readonly":s},o["default"].createElement("span",{"aria-labelledby":_,onClick:u.bind(null,e),className:l["default"]("rw-btn",{"rw-off-range":!r(e,i),"rw-state-focus":a,"rw-state-selected":v,"rw-now":g})},T)):o["default"].createElement("td",{key:t,role:"presentation",className:"rw-empty-cell"}," ")}))}}),e.exports=t["default"]},function(e,t,n){"use strict";function r(e,t,n){return f["default"].max(f["default"].min(e,n),t)}function a(e,t,n){return f["default"].gte(e,f["default"].startOf(t,"decade"),"year")&&f["default"].lte(e,f["default"].endOf(n,"decade"),"year")}function i(e,t){return f["default"].gte(e,f["default"].startOf(t,"century"),"year")&&f["default"].lte(e,f["default"].endOf(t,"century"),"year")}function s(e){var t=[1,2,3,4,5,6,7,8,9,10,11,12],n=f["default"].add(f["default"].startOf(e,"century"),-20,"year");return t.map(function(){return n=f["default"].add(n,10,"year")})}var o=n(2);t.__esModule=!0;var u=n(3),l=o.interopRequireDefault(u),p=n(7),d=o.interopRequireDefault(p),c=n(64),f=o.interopRequireDefault(c),h=n(20),m=o.interopRequireDefault(h),y=n(8),v=o.interopRequireDefault(y),g=n(31),b=o.interopRequireDefault(g),D=n(36),T=m["default"].locale,w=function(e){return e.decadeFormat||T.date.formats.decade},x=function(e,t){return f["default"].eq(e,t,"decade")},_=function(e,t){return e+"__century_"+f["default"].year(t)},O={optionID:l["default"].PropTypes.func,culture:l["default"].PropTypes.string,value:l["default"].PropTypes.instanceOf(Date),min:l["default"].PropTypes.instanceOf(Date),max:l["default"].PropTypes.instanceOf(Date),onChange:l["default"].PropTypes.func.isRequired,decadeFormat:b["default"].dateFormat};t["default"]=l["default"].createClass({displayName:"CenturyView",mixins:[n(47),n(61),n(38)()],propTypes:O,componentDidUpdate:function(){var e=_(D.instanceId(this),this.props.focused);this.ariaActiveDescendant(e)},render:function(){var e=this.props,t=e.className,n=e.focused,r=s(n),a=v["default"].chunk(r,4),i=v["default"].omit(this.props,Object.keys(O));return l["default"].createElement("table",o._extends({},i,{role:"grid",className:d["default"](t,"rw-nav-view")}),l["default"].createElement("tbody",null,a.map(this._row)))},_row:function(e,t){var n=this,s=this.props,o=s.focused,u=s.disabled,p=s.onChange,c=s.value,h=s.today,m=s.culture,y=s.min,v=s.max,g=D.instanceId(this,"_century");return l["default"].createElement("tr",{key:"row_"+t,role:"row"},e.map(function(e,t){var s=x(e,o),b=x(e,c),D=x(e,h),O=T.date.format(f["default"].startOf(e,"decade"),w(n.props),m),P=_(g,e);return a(e,y,v)?l["default"].createElement("td",{key:t,role:"gridcell",id:P,title:O,"aria-selected":b,"aria-label":O,"aria-readonly":u},l["default"].createElement("span",{"aria-labelledby":P,onClick:p.bind(null,r(e,y,v)),className:d["default"]("rw-btn",{"rw-off-range":!i(e,o),"rw-state-focus":s,"rw-state-selected":b,"rw-now":D})},O)):l["default"].createElement("td",{key:t,role:"gridcell",className:"rw-empty-cell"}," ")}))}}),e.exports=t["default"]},function(e,t,n){"use strict";var r=n(2),a=n(3),i=n(70),s=n(30),o=n(10),u=n(71),l=n(20),p=a.createClass({displayName:"SlideChildGroup",propTypes:{direction:a.PropTypes.oneOf(["left","right"]),duration:a.PropTypes.number},componentWillEnter:function(e){var t=this,n=s.findDOMNode(this),r=u(n),a=this.props.direction;r="left"===a?r:-r,this.ORGINAL_POSITION=n.style.position,o(n,{position:"absolute",left:r+"px",top:0}),l.animate(n,{left:0},this.props.duration,function(){o(n,{position:t.ORGINAL_POSITION,overflow:"hidden"}),t.ORGINAL_POSITION=null,e&&e()})},componentWillLeave:function(e){var t=this,n=s.findDOMNode(this),r=u(n),a=this.props.direction;r="left"===a?-r:r,this.ORGINAL_POSITION=n.style.position,o(n,{position:"absolute",top:0,left:0}),l.animate(n,{left:r+"px"},this.props.duration,function(){o(n,{position:t.ORGINAL_POSITION,overflow:"hidden"}),t.ORGINAL_POSITION=null,e&&e()})},render:function(){return a.Children.only(this.props.children)}});e.exports=a.createClass({displayName:"exports",propTypes:{direction:a.PropTypes.oneOf(["left","right"]),duration:a.PropTypes.number},getDefaultProps:function(){return{direction:"left",duration:250}},_wrapChild:function(e,t){return a.createElement(p,{key:e.key,ref:t,direction:this.props.direction,duration:this.props.duration},e)},render:function(){var e=this.props,t=e.style,n=e.children,s=r.objectWithoutProperties(e,["style","children"]);return t=r._extends({},t,{position:"relative",overflow:"hidden"}),a.createElement(i,r._extends({},s,{ref:"container",childFactory:this._wrapChild,style:t,component:"div"}),n)},isTransitioning:function(){return this.isMounted()&&this.refs.container.isTransitioning()}})},function(e,t,n){"use strict";function r(e){return i.Children.only(e)}function a(e){return e&&e.key}var i=n(3),s=n(10),o=n(17),u=n(71),l=n(30),p=n(8);e.exports=i.createClass({displayName:"ReplaceTransitionGroup",propTypes:{component:i.PropTypes.oneOfType([i.PropTypes.element,i.PropTypes.string]),childFactory:i.PropTypes.func,onAnimating:i.PropTypes.func,onAnimate:i.PropTypes.func},getDefaultProps:function(){return{component:"span",childFactory:function(e){return e},onAnimating:p.noop,onAnimate:p.noop}},getInitialState:function(){return{children:p.splat(this.props.children)}},componentWillReceiveProps:function(e){var t=r(e.children),n=this.state.children.slice(),i=n[1],s=n[0],o=s&&a(s)===a(t),u=i&&a(i)===a(t);s?!s||i||o?s&&i&&!o&&!u?(n.shift(),n.push(t),this.leaving=i,this.entering=t):o?n.splice(0,1,t):u&&n.splice(1,1,t):(n.push(t),this.leaving=s,this.entering=t):(n.push(t),this.entering=t),(this.state.children[0]!==n[0]||this.state.children[1]!==n[1])&&this.setState({children:n})},componentWillMount:function(){this.animatingKeys={},this.leaving=null,this.entering=null},componentDidUpdate:function(){var e=this.entering,t=this.leaving,n=this.refs[a(e)||a(t)],r=l.findDOMNode(this),i=n&&l.findDOMNode(n);i&&s(r,{overflow:"hidden",height:o(i)+"px",width:u(i)+"px"}),this.props.onAnimating(),this.entering=null,this.leaving=null,e&&this.performEnter(a(e)),t&&this.performLeave(a(t))},performEnter:function(e){var t=this.refs[e];t&&(this.animatingKeys[e]=!0,t.componentWillEnter?t.componentWillEnter(this._handleDoneEntering.bind(this,e)):this._handleDoneEntering(e))},_tryFinish:function(){this.isTransitioning()||(this.isMounted()&&s(l.findDOMNode(this),{overflow:"visible",height:"",width:""}),this.props.onAnimate())},_handleDoneEntering:function(e){var t=this.refs[e];t&&t.componentDidEnter&&t.componentDidEnter(),delete this.animatingKeys[e],a(this.props.children)!==e&&this.performLeave(e),this._tryFinish()},isTransitioning:function(){return 0!==Object.keys(this.animatingKeys).length},performLeave:function(e){var t=this.refs[e];t&&(this.animatingKeys[e]=!0,t.componentWillLeave?t.componentWillLeave(this._handleDoneLeaving.bind(this,e)):this._handleDoneLeaving(e))},_handleDoneLeaving:function(e){var t=this.refs[e];t&&t.componentDidLeave&&t.componentDidLeave(),delete this.animatingKeys[e],a(this.props.children)===e?this.performEnter(e):this.isMounted()&&this.setState({children:this.state.children.filter(function(t){return a(t)!==e})}),this._tryFinish()},render:function(){var e=this,t=this.props.component;return i.createElement(t,this.props,this.state.children.map(function(t){return e.props.childFactory(t,a(t))}))}})},function(e,t,n){"use strict";var r=n(18),a=n(19);e.exports=function(e,t){var n=a(e);return n?n.innerWidth:t?e.clientWidth:r(e).width}},function(e,t,n){"use strict";function r(e){var t=null!=e[K.CALENDAR]?e.calendar:!0,n=null!=e[K.TIME]?e.time:!0;return e.format?e.format:t&&n||!t&&!n?B.date.formats["default"]:B.date.formats[t?"date":"time"]}function a(e,t,n){var r="";return e instanceof Date&&!isNaN(e.getTime())&&(r=B.date.format(e,t,n)),r}function i(e,t,n){for(var r,a=0;a<e.length;a++)if(r=B.date.parse(n,e[a],t))return r;return null}function s(e){return e&&!isNaN(e.getTime())?e:null}var o=n(2);t.__esModule=!0;var u=n(3),l=o.interopRequireDefault(u),p=n(23),d=o.interopRequireDefault(p),c=n(4),f=o.interopRequireDefault(c),h=n(7),m=o.interopRequireDefault(h),y=n(30),v=o.interopRequireDefault(y),g=n(8),b=o.interopRequireDefault(g),D=n(64),T=o.interopRequireDefault(D),w=n(20),x=o.interopRequireDefault(w),_=n(65),O=o.interopRequireDefault(_),P=n(9),k=o.interopRequireDefault(P),I=n(59),R=o.interopRequireDefault(I),E=n(73),C=o.interopRequireDefault(E),N=n(74),q=o.interopRequireDefault(N),F=n(56),S=o.interopRequireDefault(F),A=n(31),L=o.interopRequireDefault(A),M=n(43),U=o.interopRequireDefault(M),z=n(45),V=n(36),j=O["default"].calendarViews,K=O["default"].datePopups,W=R["default"].BaseCalendar,B=x["default"].locale,G=Object.keys(j).map(function(e){return j[e]}),H=b["default"].omit,Y=b["default"].pick,X=o._extends({},v["default"].type(W).propTypes,{value:l["default"].PropTypes.instanceOf(Date),onChange:l["default"].PropTypes.func,open:l["default"].PropTypes.oneOf([!1,K.TIME,K.CALENDAR]),onToggle:l["default"].PropTypes.func,onSelect:l["default"].PropTypes.func,min:l["default"].PropTypes.instanceOf(Date),max:l["default"].PropTypes.instanceOf(Date),culture:l["default"].PropTypes.string,format:L["default"].dateFormat,timeFormat:L["default"].dateFormat,editFormat:L["default"].dateFormat,calendar:l["default"].PropTypes.bool,time:l["default"].PropTypes.bool,timeComponent:L["default"].elementType,dropUp:l["default"].PropTypes.bool,duration:l["default"].PropTypes.number,placeholder:l["default"].PropTypes.string,name:l["default"].PropTypes.string,initialView:l["default"].PropTypes.oneOf(G),finalView:l["default"].PropTypes.oneOf(G),disabled:L["default"].disabled,readOnly:L["default"].readOnly,parse:l["default"].PropTypes.oneOfType([l["default"].PropTypes.arrayOf(l["default"].PropTypes.string),l["default"].PropTypes.string,l["default"].PropTypes.func]),"aria-labelledby":l["default"].PropTypes.string,messages:l["default"].PropTypes.shape({calendarButton:l["default"].PropTypes.string,timeButton:l["default"].PropTypes.string})}),Z=l["default"].createClass(o.createDecoratedObject([{key:"displayName",initializer:function(){return"DateTimePicker"}},{key:"mixins",initializer:function(){return[n(46),n(47),n(49),n(54),n(38)("valueInput",function(e,t){var n=this.props.open,r=this.ariaActiveDescendant(),a=n===K.CALENDAR&&"calendar"===e,i=n===K.TIME&&"timelist"===e;return!r||i||a?t:void 0})]}},{key:"propTypes",initializer:function(){return X}},{key:"getInitialState",value:function(){return{focused:!1}}},{key:"getDefaultProps",value:function(){return{value:null,min:new Date(1900,0,1),max:new Date(2099,11,31),calendar:!0,time:!0,open:!1,footer:!0,messages:{calendarButton:"Select Date",timeButton:"Select Time"},ariaActiveDescendantKey:"dropdownlist"}}},{key:"render",value:function(){var e,t=this,n=this.props,a=n.className,i=n.calendar,u=n.time,p=n.open,d=n.tabIndex,c=n.value,f=n.editFormat,h=n.timeFormat,y=n.culture,g=n.duration,b=n.step,D=n.messages,T=n.min,w=n.max,x=n.busy,_=n.placeholder,O=n.disabled,P=n.readOnly,I=n.name,R=n.dropUp,E=n.timeComponent,N=n["aria-labelledby"],F=this.state.focused,A=V.instanceId(this,"_input"),L=V.instanceId(this,"_time_listbox"),M=V.instanceId(this,"_cal"),U="",z=H(this.props,Object.keys(X)),j=Y(this.props,Object.keys(v["default"].type(W).propTypes)),B=V.isFirstFocusedRender(this)||p,G=O||P,Z=p===K.CALENDAR,$=p===K.TIME;return i&&(U+=M),u&&(U+=" "+L),c=s(c),l["default"].createElement("div",o._extends({},z,{ref:"element",tabIndex:"-1",onKeyDown:this._keyDown,onFocus:this._focus.bind(null,!0),onBlur:this._focus.bind(null,!1),className:m["default"](a,"rw-datetimepicker","rw-widget",(e={"rw-state-focus":F,"rw-state-disabled":O,"rw-state-readonly":P,"rw-has-both":i&&u,"rw-has-neither":!i&&!u,"rw-rtl":this.isRtl()},e["rw-open"+(R?"-up":"")]=p,e))}),l["default"].createElement(q["default"],{ref:"valueInput",id:A,tabIndex:d||0,role:"combobox","aria-labelledby":N,"aria-expanded":!!p,"aria-busy":!!x,"aria-owns":U.trim(),"aria-haspopup":!0,placeholder:_,name:I,disabled:O,readOnly:P,value:c,format:r(this.props),editFormat:f,editing:F,culture:y,parse:this._parse,onChange:this._change}),(i||u)&&l["default"].createElement("span",{className:"rw-select"},i&&l["default"].createElement(S["default"],{tabIndex:"-1",className:"rw-btn-calendar",disabled:G,"aria-disabled":G,"aria-label":D.calendarButton,onClick:this._click.bind(null,K.CALENDAR)},l["default"].createElement("i",{className:"rw-i rw-i-calendar","aria-hidden":"true"})),u&&l["default"].createElement(S["default"],{tabIndex:"-1",className:"rw-btn-time",disabled:G,"aria-disabled":G,"aria-label":D.timeButton,onClick:this._click.bind(null,K.TIME)},l["default"].createElement("i",{className:"rw-i rw-i-clock-o","aria-hidden":"true"}))),l["default"].createElement(k["default"],{dropUp:R,open:$,onRequestClose:this.close,duration:g,onOpening:function(){return t.refs.timePopup.forceUpdate()}},l["default"].createElement("div",null,B&&l["default"].createElement(C["default"],{ref:"timePopup",id:L,ariaActiveDescendantKey:"timelist","aria-labelledby":A,"aria-live":p&&"polite","aria-hidden":!p,value:c,format:h,step:b,min:T,max:w,culture:y,onMove:this._scrollTo,preserveDate:!!i,itemComponent:E,onSelect:this._selectTime}))),l["default"].createElement(k["default"],{className:"rw-calendar-popup",dropUp:R,open:Z,duration:g,onRequestClose:this.close},B&&l["default"].createElement(W,o._extends({},j,{ref:"calPopup",tabIndex:"-1",id:M,value:c,"aria-hidden":!p,"aria-live":"polite",ariaActiveDescendantKey:"calendar",onChange:this._selectDate,onNavigate:function(){return t.focus()}}))))}},{key:"_change",decorators:[z.widgetEditable],value:function(e,t,n){var r=this.props,a=r.onChange,i=r.value;n&&(e=this.inRangeValue(e)),a&&(null==e||null==i?e!=i&&a(e,t):T["default"].eq(e,i)||a(e,t))}},{key:"_keyDown",decorators:[z.widgetEditable],value:function(e){var t=this.props,n=t.open,r=t.calendar,a=t.time;"Escape"===e.key&&n?this.close():e.altKey?(e.preventDefault(),"ArrowDown"===e.key?r&&a?this.open(n===K.CALENDAR?K.TIME:K.CALENDAR):a?this.open(K.TIME):r&&this.open(K.CALENDAR):"ArrowUp"===e.key&&this.close()):n&&(n===K.CALENDAR&&this.refs.calPopup._keyDown(e),n===K.TIME&&this.refs.timePopup._keyDown(e)),V.notify(this.props.onKeyDown,[e])}},{key:"_focus",decorators:[z.widgetEnabled],value:function(e,t){var n=this;this.setTimeout("focus",function(){e||n.close(),e!==n.state.focused&&(V.notify(n.props[e?"onFocus":"onBlur"],t),n.setState({focused:e}))})}},{key:"focus",value:function(){f["default"]()!==v["default"].findDOMNode(this.refs.valueInput)&&this.refs.valueInput.focus()}},{key:"_selectDate",decorators:[z.widgetEditable],value:function(e){var t=r(this.props),n=T["default"].merge(e,this.props.value),i=a(e,t,this.props.culture);this.close(),V.notify(this.props.onSelect,[n,i]),this._change(n,i,!0),this.focus()}},{key:"_selectTime",decorators:[z.widgetEditable],value:function(e){var t=r(this.props),n=T["default"].merge(this.props.value,e.date),i=a(e.date,t,this.props.culture);this.close(),V.notify(this.props.onSelect,[n,i]),this._change(n,i,!0),this.focus()}},{key:"_click",decorators:[z.widgetEditable],value:function(e,t){this.focus(),this.toggle(e,t)}},{key:"_parse",value:function(e){var t=r(this.props,!0),n=this.props.editFormat,a=this.props.parse,s=[];return"function"==typeof a?a(e,this.props.culture):("string"==typeof t&&s.push(t),"string"==typeof n&&s.push(n),a&&(s=s.concat(this.props.parse)),d["default"](s.length,"React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. the DateTimePicker is unable to parse `%s` into a dateTime, please provide either a parse function or Globalize.js compatible string for `format`",e),i(s,this.props.culture,e))}},{key:"toggle",value:function(e){this.props.open?this.props.open!==e?this.open(e):this.close(e):this.open(e)}},{key:"open",value:function(e){this.props.open!==e&&this.props[e]===!0&&V.notify(this.props.onToggle,e)}},{key:"close",value:function(){this.props.open&&V.notify(this.props.onToggle,!1)}},{key:"inRangeValue",value:function(e){return null==e?e:T["default"].max(T["default"].min(e,this.props.max),this.props.min)}}])),$=U["default"](Z,{open:"onToggle",value:"onChange"});$.BaseDateTimePicker=Z,t["default"]=$,e.exports=t["default"]},function(e,t,n){"use strict";var r=n(2),a=n(3),i=n(64),s=n(33),o=n(20).locale,u=n(31),l=function(e){return e.format||o.date.formats.time};e.exports=a.createClass({displayName:"TimeList",propTypes:{value:a.PropTypes.instanceOf(Date),min:a.PropTypes.instanceOf(Date),max:a.PropTypes.instanceOf(Date),step:a.PropTypes.number,itemComponent:u.elementType,format:u.dateFormat,onSelect:a.PropTypes.func,preserveDate:a.PropTypes.bool,culture:a.PropTypes.string},mixins:[n(46)],getDefaultProps:function(){return{step:30,onSelect:function(){},min:new Date(1900,0,1),max:new Date(2099,11,31),preserveDate:!0,delay:300}},getInitialState:function(){var e=this._dates(this.props),t=this._closestDate(e,this.props.value);return{focusedItem:t||e[0],dates:e}},componentWillReceiveProps:function(e){var t=this._dates(e),n=this._closestDate(t,e.value),r=!i.eq(e.value,this.props.value,"minutes"),a=!i.eq(e.min,this.props.min,"minutes"),s=!i.eq(e.max,this.props.max,"minutes");(r||a||s)&&this.setState({focusedItem:n||t[0],dates:t})},render:function(){var e=this.props,t=(e.min,e.max,e.value),n=(e.step,r.objectWithoutProperties(e,["min","max","value","step"])),i=this.state.dates,o=this._closestDate(i,t);return a.createElement(s,r._extends({},n,{ref:"list",data:i,textField:"label",valueField:"date",selected:o,focused:this.state.focusedItem}))},_closestDate:function(e,t){var n,r=6e4*this.props.step,a=null;return t?(t=new Date(Math.floor(t.getTime()/r)*r),n=i.format(t,this.props.format,this.props.culture),e.some(function(e){return e.label===n?a=e:void 0}),a):null},_data:function(){return this.state.dates},_dates:function(e){for(var t=[],n=0,r=this._dateValues(e),a=r.min,s=i.date(a);i.date(a)===s&&i.lte(a,r.max);)n++,t.push({date:a,label:o.date.format(a,l(e),e.culture)}),a=i.add(a,e.step||30,"minutes");return t},_dateValues:function(e){var t,n,r=e.value||i.today(),a=e.preserveDate,s=e.min,o=e.max;return a?(t=i.today(),n=i.tomorrow(),{min:i.eq(r,s,"day")?i.merge(t,s):t,max:i.eq(r,o,"day")?i.merge(t,o):n}):(t=i.startOf(i.merge(new Date,s),"minutes"),n=i.startOf(i.merge(new Date,o),"minutes"),i.lte(n,t)&&i.gt(o,s,"day")&&(n=i.tomorrow()),{min:t,max:n})},_keyDown:function(e){var t=this,n=e.key,r=String.fromCharCode(e.keyCode),a=this.state.focusedItem,i=this.refs.list;"End"===n?this.setState({focusedItem:i.last()}):"Home"===n?this.setState({focusedItem:i.first()}):"Enter"===n?this.props.onSelect(a):"ArrowDown"===n?(e.preventDefault(),this.setState({focusedItem:i.next(a)})):"ArrowUp"===n?(e.preventDefault(),this.setState({focusedItem:i.prev(a)})):(e.preventDefault(),this.search(r,function(e){t.setState({focusedItem:e})}))},scrollTo:function(){this.refs.list.move&&this.refs.list.move()},search:function(e,t){var n=this,r=((this._searchTerm||"")+e).toLowerCase();this._searchTerm=r,this.setTimeout("search",function(){var e=n.refs.list,a=e.next(n.state.focusedItem,r);n._searchTerm="",a&&t(a)},this.props.delay)}})},function(e,t,n){"use strict";function r(e){return!isNaN(e.getTime())}function a(e,t,n){var a="";return e instanceof Date&&r(e)&&(a=p.date.format(e,t,n)),a}function i(e,t,n){return function(){e&&e.apply(n,arguments),t&&t.apply(n,arguments)}}var s=n(2),o=n(3),u=n(7),l=n(30),p=n(20).locale,d=n(31);e.exports=o.createClass({displayName:"DatePickerInput",propTypes:{format:d.dateFormat.isRequired,editFormat:d.dateFormat,parse:o.PropTypes.func.isRequired,value:o.PropTypes.instanceOf(Date),onChange:o.PropTypes.func.isRequired,culture:o.PropTypes.string},getDefaultProps:function(){return{textValue:""}},componentWillReceiveProps:function(e){var t=a(e.value,e.editing&&e.editFormat?e.editFormat:e.format,e.culture);this.startValue=t,this.setState({textValue:t})},getInitialState:function(){var e=a(this.props.value,this.props.editing&&this.props.editFormat?this.props.editFormat:this.props.format,this.props.culture);return this.startValue=e,{textValue:e}},render:function(){var e=this.state.textValue;return o.createElement("input",s._extends({},this.props,{type:"text",className:u({"rw-input":!0}),value:e,"aria-disabled":this.props.disabled,"aria-readonly":this.props.readOnly,disabled:this.props.disabled,readOnly:this.props.readOnly,onChange:this._change,onBlur:i(this.props.blur,this._blur,this)}))},_change:function(e){this.setState({textValue:e.target.value}),this._needsFlush=!0},_blur:function(e){var t,n=e.target.value;this._needsFlush&&(this._needsFlush=!1,t=this.props.parse(n),this.props.onChange(t,a(t,this.props.format,this.props.culture)))},focus:function(){l.findDOMNode(this).focus()}})},function(e,t,n){"use strict";function r(e,t){return t=t||0,e=(""+e).split("e"),e=Math.round(+(e[0]+"e"+(e[1]?+e[1]+t:t))),e=(""+e).split("e"),e=+(e[0]+"e"+(e[1]?+e[1]-t:-t)),e.toFixed(t)}var a=n(2),i=n(45),s=n(36),o=n(3),u=n(7),l=n(8),p=n(30),d=n(31),c=n(43),f=n(65).directions,h=n(76),m=n(20).locale,y=n(77),v=n(56),g=function(e){return e.format||m.number.formats["default"]},b={value:o.PropTypes.number,onChange:o.PropTypes.func,min:o.PropTypes.number,max:o.PropTypes.number,step:o.PropTypes.number,precision:o.PropTypes.number,culture:o.PropTypes.string,format:d.numberFormat,name:o.PropTypes.string,parse:o.PropTypes.func,disabled:d.disabled,readOnly:d.readOnly,messages:o.PropTypes.shape({increment:o.PropTypes.string,decrement:o.PropTypes.string})},D=o.createClass(a.createDecoratedObject([{key:"displayName",initializer:function(){return"NumberPicker"}},{key:"mixins",initializer:function(){return[n(46),n(47),n(54)]}},{key:"propTypes",initializer:function(){return b}},{key:"getDefaultProps",value:function(){return{value:null,open:!1,min:-(1/0),max:1/0,step:1,messages:{increment:"increment value",decrement:"decrement value"}}}},{key:"getInitialState",value:function(){return{focused:!1,active:!1}}},{key:"render",value:function(){var e=l.omit(this.props,Object.keys(b)),t=e.className,n=e.onKeyDown,r=e.onKeyPress,i=e.onKeyUp,s=a.objectWithoutProperties(e,["className","onKeyDown","onKeyPress","onKeyUp"]),p=this.constrainValue(this.props.value);return o.createElement("div",a._extends({},s,{ref:"element",onKeyDown:this._keyDown,onFocus:this._focus.bind(null,!0),onBlur:this._focus.bind(null,!1),tabIndex:"-1",className:u(t,"rw-numberpicker","rw-widget",{"rw-state-focus":this.state.focused,"rw-state-disabled":this.props.disabled,"rw-state-readonly":this.props.readOnly,"rw-rtl":this.isRtl()})}),o.createElement("span",{className:"rw-select"},o.createElement(v,{tabIndex:"-1",className:u({"rw-state-active":this.state.active===f.UP}),onMouseDown:this._mouseDown.bind(null,f.UP),onMouseUp:this._mouseUp.bind(null,f.UP),onClick:this._focus.bind(null,!0),disabled:p===this.props.max||this.props.disabled,"aria-disabled":p===this.props.max||this.props.disabled},o.createElement("i",{className:"rw-i rw-i-caret-up"},o.createElement("span",{className:"rw-sr"},this.props.messages.increment))),o.createElement(v,{tabIndex:"-1",className:u({"rw-state-active":this.state.active===f.DOWN}),onMouseDown:this._mouseDown.bind(null,f.DOWN),onMouseUp:this._mouseUp.bind(null,f.DOWN),onClick:this._focus.bind(null,!0),disabled:p===this.props.min||this.props.disabled,"aria-disabled":p===this.props.min||this.props.disabled},o.createElement("i",{className:"rw-i rw-i-caret-down"},o.createElement("span",{className:"rw-sr"},this.props.messages.decrement)))),o.createElement(y,{ref:"input",tabIndex:s.tabIndex,value:p,editing:this.state.focused,format:this.props.format,parse:this.props.parse,name:this.props.name,role:"spinbutton",min:this.props.min,"aria-valuenow":p,"aria-valuemin":isFinite(this.props.min)?this.props.min:null,"aria-valuemax":isFinite(this.props.max)?this.props.max:null,"aria-disabled":this.props.disabled,"aria-readonly":this.props.readonly,disabled:this.props.disabled,readOnly:this.props.readOnly,onChange:this.change,onKeyDown:n,onKeyPress:r,onKeyUp:i}))}},{key:"_mouseDown",decorators:[i.widgetEditable],value:function(e){var t=e===f.UP?this.increment:this.decrement;this.setState({active:e});var n=t.call(this);e===f.UP&&n===this.props.max||e===f.DOWN&&n===this.props.min?this._mouseUp():this._cancelRepeater||(this._cancelRepeater=h(this._mouseDown.bind(null,e)))}},{key:"_mouseUp",decorators:[i.widgetEditable],value:function(){this.setState({active:!1}),this._cancelRepeater&&this._cancelRepeater(),this._cancelRepeater=null}},{key:"_focus",decorators:[i.widgetEnabled],value:function(e,t){var n=this;e&&p.findDOMNode(this.refs.input).focus(),this.setTimeout("focus",function(){e!==n.state.focused&&(s.notify(n.props[e?"onFocus":"onBlur"],t),n.setState({focused:e}))},0)}},{key:"_keyDown",decorators:[i.widgetEditable],value:function(e){var t=e.key;"End"===t&&isFinite(this.props.max)?this.change(this.props.max):"Home"===t&&isFinite(this.props.min)?this.change(this.props.min):"ArrowDown"===t?(e.preventDefault(),this.decrement()):"ArrowUp"===t&&(e.preventDefault(),this.increment())}},{key:"increment",value:function(){return this.step(this.props.step)}},{key:"decrement",value:function(){return this.step(-this.props.step)}},{key:"step",value:function(e){var t=(this.props.value||0)+e,n=null!=this.props.precision?this.props.precision:m.number.precision(g(this.props));return this.change(null!=n?r(t,n):t),t}},{key:"change",value:function(e){e=this.constrainValue(e),this.props.value!==e&&s.notify(this.props.onChange,e)}},{key:"constrainValue",value:function(e){var t=null==this.props.max?1/0:this.props.max,n=null==this.props.min?-(1/0):this.props.min;return null==e||""===e?null:Math.max(Math.min(e,t),n)}}]));e.exports=c(D,{value:"onChange"}),e.exports.BaseNumberPicker=D},function(e,t){"use strict";function n(e){var t,n=function(){return clearInterval(t)};return t=setInterval(function(){n(),t=setInterval(e,35),e()},500),n}e.exports=n},function(e,t,n){"use strict";function r(e,t,n){return o.number.format(e,t,n)}var a=n(2),i=n(3),s=n(31),o=n(20).locale,u=function(e){return e.format||o.number.formats["default"]};e.exports=i.createClass({displayName:"NumberPickerInput",propTypes:{value:i.PropTypes.number,format:s.numberFormat,parse:i.PropTypes.func.isRequired,culture:i.PropTypes.string,min:i.PropTypes.number,onChange:i.PropTypes.func.isRequired,onKeyDown:i.PropTypes.func},getDefaultProps:function(){return{value:null,editing:!1,parse:function(e,t){return o.number.parse(e,t)}}},getDefaultState:function(e){var t=e.editing?e.value:r(e.value,u(e),e.culture);return(null==t||isNaN(e.value))&&(t=""),{stringValue:""+t}},getInitialState:function(){return this.getDefaultState(this.props)},componentWillReceiveProps:function(e){this.setState(this.getDefaultState(e))},render:function(){var e=this.state.stringValue;return i.createElement("input",a._extends({},this.props,{type:"text",className:"rw-input",onChange:this._change,onBlur:this._finish,"aria-disabled":this.props.disabled,"aria-readonly":this.props.readOnly,disabled:this.props.disabled,readOnly:this.props.readOnly,value:e}))},_change:function(e){var t=e.target.value,n=this.props.parse(e.target.value,this.props.culture),r=this.isValid(n);return null==t||""===t.trim()?this.props.onChange(null):r&&n!==this.props.value&&!this.isAtDelimiter(n,t)?this.props.onChange(n):void((!isNaN(n)||this.isAtDelimiter(n,t))&&this.current(e.target.value))},_finish:function(){var e=this.state.stringValue,t=this.props.parse(e,this.props.culture);!isNaN(t)&&(t<this.props.min||this.isAtDelimiter(t,e))&&this.props.onChange(t)},isAtDelimiter:function(e,t){var n;return t.length<=1?!1:(n=this.props.parse(t.substr(0,t.length-1),this.props.culture),"number"==typeof n&&!isNaN(n)&&n===e)},isValid:function(e){return"number"!=typeof e||isNaN(e)?!1:e>=this.props.min},current:function(e){this.setState({stringValue:e})}})},function(e,t,n){"use strict";function r(e){return a._extends({createNew:"(create new tag)",emptyList:"There are no items in this list",emptyFilter:"The filter returned no results",tagsLabel:"selected items",selectedItems:"selected items",removeLabel:"remove selected item"},e)}var a=n(2),i=n(3),s=a.interopRequireDefault(i),o=n(7),u=a.interopRequireDefault(o),l=n(8),p=a.interopRequireDefault(l),d=n(9),c=a.interopRequireDefault(d),f=n(79),h=a.interopRequireDefault(f),m=n(80),y=a.interopRequireDefault(m),v=n(81),g=a.interopRequireDefault(v),b=n(30),D=a.interopRequireDefault(b),T=n(31),w=a.interopRequireDefault(T),x=n(33),_=a.interopRequireDefault(x),O=n(39),P=a.interopRequireDefault(O),k=n(42),I=a.interopRequireDefault(k),R=n(43),E=a.interopRequireDefault(R),C=n(35),N=n(45),q=n(36),F=function(e,t){return"function"==typeof t.createNew?t.createNew(e):[s["default"].createElement("strong",null,'"'+e.searchTerm+'"')," "+t.createNew]},S=p["default"].omit,A=p["default"].pick,L=p["default"].splat,M={data:s["default"].PropTypes.array,value:s["default"].PropTypes.array,onChange:s["default"].PropTypes.func,searchTerm:s["default"].PropTypes.string,onSearch:s["default"].PropTypes.func,open:s["default"].PropTypes.bool,onToggle:s["default"].PropTypes.func,valueField:s["default"].PropTypes.string,textField:w["default"].accessor,tagComponent:w["default"].elementType,itemComponent:w["default"].elementType,listComponent:w["default"].elementType,groupComponent:w["default"].elementType,groupBy:w["default"].accessor,createComponent:w["default"].elementType,onSelect:s["default"].PropTypes.func,onCreate:s["default"].PropTypes.oneOfType([s["default"].PropTypes.oneOf([!1]),s["default"].PropTypes.func]),dropUp:s["default"].PropTypes.bool,duration:s["default"].PropTypes.number,placeholder:s["default"].PropTypes.string,disabled:w["default"].disabled.acceptsArray,readOnly:w["default"].readOnly.acceptsArray,messages:s["default"].PropTypes.shape({open:w["default"].message,emptyList:w["default"].message,emptyFilter:w["default"].message,createNew:w["default"].message})},U=s["default"].createClass(a.createDecoratedObject([{key:"displayName",initializer:function(){return"Multiselect"}},{key:"mixins",initializer:function(){return[n(46),n(48),n(49),n(54),n(38)("input",function(e,t){var n=this.props.ariaActiveDescendantKey,r=(!this._data().length||null===this.state.focusedItem)&&e===n,a=null!=this.state.focusedTag&&"taglist"===e,i=null==this.state.focusedTag&&"list"===e;return r||a||i?t:void 0})]}},{key:"propTypes",initializer:function(){return M}},{key:"getDefaultProps",value:function(){return{data:[],filter:"startsWith",value:[],open:!1,searchTerm:"",ariaActiveDescendantKey:"multiselect",messages:{createNew:"(create new tag)",emptyList:"There are no items in this list",emptyFilter:"The filter returned no results",tagsLabel:"selected items",selectedItems:"selected items",noneSelected:"no selected items",removeLabel:"remove selected item"}}}},{key:"getInitialState",value:function(){var e=this.props,t=e.data,n=e.value,r=e.valueField,a=e.searchTerm,i=L(n).map(function(e){return C.dataItem(t,e,r)}),t=this.process(t,i,a);return{focusedTag:null,focusedItem:t[0],processedData:t,
dataItems:i}}},{key:"componentDidUpdate",value:function(){this.ariaActiveDescendant(q.instanceId(this,"__createlist_option")),this.refs.list&&I["default"](this.refs.list)}},{key:"componentDidMount",value:function(){h["default"].ios&&(D["default"].findDOMNode(this.refs.wrapper).onClick=function(){})}},{key:"componentWillReceiveProps",value:function(e){var t=e.data,n=e.value,r=e.valueField,a=e.searchTerm,i=p["default"].splat(n),s=this.state.focusedItem,o=this.process(t,i,a);this.setState({processedData:o,focusedItem:-1===o.indexOf(s)?o[0]:s,dataItems:i.map(function(e){return C.dataItem(t,e,r)})})}},{key:"render",value:function(){var e,t=this,n=this.props,i=n.searchTerm,o=n.maxLength,l=n.className,p=n.tabIndex,d=n.textField,f=n.groupBy,h=n.messages,m=n.data,v=n.busy,b=n.dropUp,T=n.open,w=n.disabled,x=n.readOnly,O=n.tagComponent,k=n.listComponent;k=k||f&&P["default"]||_["default"],h=r(h);var I=S(this.props,Object.keys(M)),R=A(this.props,["valueField","textField"]),E=A(this.props,["maxLength","searchTerm"]),N=A(this.props,Object.keys(D["default"].type(k).propTypes)),L=A(this.props,Object.keys(D["default"].type(c["default"]).propTypes)),U=this.state,z=U.focusedTag,V=U.focusedItem,j=U.focused,K=U.dataItems,W=this._data(),B=q.instanceId(this,"_taglist"),G=q.instanceId(this,"__listbox"),H=q.instanceId(this,"__createlist"),Y=q.instanceId(this,"__createlist_option"),X=!!K.length,Z=q.isFirstFocusedRender(this)||T,$=this._shouldShowCreate(),J=!W.length||null===V;if(j)var Q=K.length?h.selectedItems+": "+K.map(function(e){return C.dataText(e,d)}).join(", "):h.noneSelected;return s["default"].createElement("div",a._extends({},I,{ref:"element",id:q.instanceId(this),onKeyDown:this._keyDown,onFocus:this._focus.bind(null,!0),onBlur:this._focus.bind(null,!1),tabIndex:"-1",className:u["default"](l,"rw-widget","rw-multiselect",(e={"rw-state-focus":j,"rw-state-disabled":w===!0,"rw-state-readonly":x===!0,"rw-rtl":this.isRtl()},e["rw-open"+(b?"-up":"")]=T,e))}),s["default"].createElement("span",{ref:"status",id:q.instanceId(this,"__notify"),role:"status",className:"rw-sr","aria-live":"assertive","aria-atomic":"true","aria-relevant":"additions removals text"},Q),s["default"].createElement("div",{className:"rw-multiselect-wrapper",ref:"wrapper"},v&&s["default"].createElement("i",{className:"rw-i rw-loading"}),X&&s["default"].createElement(g["default"],a._extends({},R,{ref:"tagList",id:B,"aria-label":h.tagsLabel,value:K,focused:z,disabled:w,readOnly:x,onDelete:this._delete,valueComponent:O,ariaActiveDescendantKey:"taglist"})),s["default"].createElement(y["default"],a._extends({},E,{ref:"input",tabIndex:p||0,role:"listbox","aria-expanded":T,"aria-busy":!!v,"aria-owns":G+" "+q.instanceId(this,"__notify")+(X?" "+B:"")+($?" "+H:""),"aria-haspopup":!0,value:i,maxLength:o,disabled:w===!0,readOnly:x===!0,placeholder:this._placeholder(),onKeyDown:this._searchKeyDown,onKeyUp:this._searchgKeyUp,onChange:this._typing,onFocus:this._inputFocus,onClick:this._inputFocus}))),s["default"].createElement(c["default"],a._extends({},L,{onOpening:function(){return t.refs.list.forceUpdate()},onRequestClose:this.close}),s["default"].createElement("div",null,Z&&[s["default"].createElement(k,a._extends({ref:"list",key:"0"},N,{readOnly:!!x,disabled:!!w,id:G,"aria-live":"polite","aria-labelledby":q.instanceId(this),"aria-hidden":!T,ariaActiveDescendantKey:"list",data:W,focused:V,onSelect:this._onSelect,onMove:this._scrollTo,messages:{emptyList:m.length?h.emptyFilter:h.emptyList}})),$&&s["default"].createElement("ul",{role:"listbox",id:H,className:"rw-list rw-multiselect-create-tag",key:"1"},s["default"].createElement("li",{onClick:this._onCreate.bind(null,i),role:"option",id:Y,className:u["default"]({"rw-list-option":!0,"rw-state-focus":J})},F(this.props,h)))])))}},{key:"_data",value:function(){return this.state.processedData}},{key:"_delete",value:function(e){this._focus(!0),this.change(this.state.dataItems.filter(function(t){return t!==e}))}},{key:"_inputFocus",value:function(){this._focus(!0),!this.props.open&&this.open()}},{key:"_focus",decorators:[N.widgetEnabled],value:function(e,t){var n=this;this.props.disabled!==!0&&(e&&this.refs.input.focus(),this.setTimeout("focus",function(){e||n.refs.tagList&&n.setState({focusedTag:null}),e!==n.state.focused&&(e?n.open():n.close(),q.notify(n.props[e?"onFocus":"onBlur"],t),n.setState({focused:e}))}))}},{key:"_searchKeyDown",value:function(e){"Backspace"===e.key&&e.target.value&&!this._deletingText&&(this._deletingText=!0)}},{key:"_searchgKeyUp",value:function(e){"Backspace"===e.key&&this._deletingText&&(this._deletingText=!1)}},{key:"_typing",value:function(e){q.notify(this.props.onSearch,[e.target.value]),this.open()}},{key:"_onSelect",decorators:[N.widgetEditable],value:function(e){return void 0===e?void(this.props.onCreate&&this._onCreate(this.props.searchTerm)):(q.notify(this.props.onSelect,e),this.change(this.state.dataItems.concat(e)),this.close(),void this._focus(!0))}},{key:"_onCreate",decorators:[N.widgetEditable],value:function(e){""!==e.trim()&&(q.notify(this.props.onCreate,e),this.props.searchTerm&&q.notify(this.props.onSearch,[""]),this.close(),this._focus(!0))}},{key:"_keyDown",decorators:[N.widgetEditable],value:function(e){var t=e.key,n=e.altKey,r=e.ctrlKey,i=!this.props.searchTerm&&!this._deletingText,s=this.props.open,o=this.state,u=o.focusedTag,l=o.focusedItem,p=this.refs,d=p.list,c=p.tagList,f={focusedTag:null};if("ArrowDown"===t){var h=d.next(l),m=this._shouldShowCreate()&&l===h||null===l;h=m?null:h,e.preventDefault(),s?this.setState(a._extends({focusedItem:h},f)):this.open()}else if("ArrowUp"===t){var y=null===l?d.last():d.prev(l);e.preventDefault(),n?this.close():s&&this.setState(a._extends({focusedItem:y},f))}else"End"===t?s?this.setState(a._extends({focusedItem:d.last()},f)):c&&this.setState({focusedTag:c.last()}):"Home"===t?s?this.setState(a._extends({focusedItem:d.first()},f)):c&&this.setState({focusedTag:c.first()}):s&&"Enter"===t?r&&this.props.onCreate||null===l?this._onCreate(this.props.searchTerm):this._onSelect(this.state.focusedItem):"Escape"===t?s?this.close():c&&this.setState(f):i&&"ArrowLeft"===t?c&&this.setState({focusedTag:c.prev(u)}):i&&"ArrowRight"===t?c&&this.setState({focusedTag:c.next(u)}):i&&"Delete"===t?c&&c.remove(u):i&&"Backspace"===t&&c&&c.removeNext();q.notify(this.props.onKeyDown,[e])}},{key:"change",decorators:[N.widgetEditable],value:function(e){q.notify(this.props.onChange,[e]),q.notify(this.props.onSearch,[""])}},{key:"open",value:function(){this.props.disabled!==!0&&this.props.readOnly!==!0&&q.notify(this.props.onToggle,!0)}},{key:"close",value:function(){q.notify(this.props.onToggle,!1)}},{key:"toggle",value:function(){this.props.open?this.close():this.open()}},{key:"process",value:function(e,t,n){var r=this.props.valueField,a=e.filter(function(e){return!t.some(function(t){return C.valueMatcher(e,t,r)})});return n&&(a=this.filter(a,n)),a}},{key:"_shouldShowCreate",value:function(){var e=this.props,t=e.textField,n=e.searchTerm,r=e.onCreate;return r&&n?!this._data().some(function(e){return C.dataText(e,t)===n})&&!this.state.dataItems.some(function(e){return C.dataText(e,t)===n}):!1}},{key:"_placeholder",value:function(){return(this.props.value||[]).length?"":this.props.placeholder||""}}]));e.exports=E["default"](U,{open:"onToggle",value:"onChange",searchTerm:"onSearch"}),e.exports.BaseMultiselect=U},function(e,t){"use strict";e.exports={ios:"undefined"!=typeof navigator&&navigator.userAgent.match(/(iPod|iPhone|iPad)/)&&navigator.userAgent.match(/AppleWebKit/)}},function(e,t,n){"use strict";var r=n(2);t.__esModule=!0;var a=n(3),i=r.interopRequireDefault(a),s=n(30),o=r.interopRequireDefault(s),u=n(31),l=r.interopRequireDefault(u);t["default"]=i["default"].createClass({displayName:"MultiselectInput",propTypes:{value:i["default"].PropTypes.string,maxLength:i["default"].PropTypes.number,onChange:i["default"].PropTypes.func.isRequired,onFocus:i["default"].PropTypes.func,disabled:l["default"].disabled,readOnly:l["default"].readOnly},componentDidUpdate:function(){this.props.focused&&this.focus()},render:function(){var e=this.props.value,t=this.props.placeholder,n=Math.max((e||t).length,1)+1;return i["default"].createElement("input",r._extends({},this.props,{className:"rw-input",autoComplete:"off","aria-disabled":this.props.disabled,"aria-readonly":this.props.readOnly,disabled:this.props.disabled,readOnly:this.props.readOnly,size:n}))},focus:function(){o["default"].findDOMNode(this).focus()}}),e.exports=t["default"]},function(e,t,n){"use strict";var r=n(2);t.__esModule=!0;var a=n(3),i=r.interopRequireDefault(a),s=n(8),o=r.interopRequireDefault(s),u=n(7),l=r.interopRequireDefault(u),p=n(31),d=r.interopRequireDefault(p),c=n(36),f=n(35),h=n(45),m=function(e,t){return e+"__option__"+t};t["default"]=i["default"].createClass({displayName:"MultiselectTagList",mixins:[n(47),n(38)()],propTypes:{value:i["default"].PropTypes.array,focused:i["default"].PropTypes.number,valueField:i["default"].PropTypes.string,textField:d["default"].accessor,valueComponent:i["default"].PropTypes.func,disabled:d["default"].disabled.acceptsArray,readOnly:d["default"].readOnly.acceptsArray},getDefaultProps:function(){return{ariaActiveDescendantKey:"taglist"}},componentDidUpdate:function(){var e=this.props.focused,t=m(c.instanceId(this),e);this.ariaActiveDescendant(null==e||h.isDisabledItem(e,this.props)?null:t)},render:function(){var e=this,t=o["default"].omit(this.props,["value","disabled","readOnly"]),n=this.props,a=n.focused,s=n.value,u=n.textField,p=n.valueComponent,d=c.instanceId(this);return i["default"].createElement("ul",r._extends({},t,{role:"listbox",tabIndex:"-1",className:"rw-multiselect-taglist"}),s.map(function(t,n){var r=h.isDisabledItem(t,e.props),s=h.isReadOnlyItem(t,e.props),o=!r&&a===n,c=m(d,n);return i["default"].createElement("li",{key:n,id:c,tabIndex:"-1",role:"option",className:l["default"]({"rw-state-focus":o,"rw-state-disabled":r,"rw-state-readonly":s})},p?i["default"].createElement(p,{item:t}):f.dataText(t,u),i["default"].createElement("span",{tabIndex:"-1",onClick:!(r||s)&&e._delete.bind(null,t),"aria-disabled":r,"aria-label":"Unselect",disabled:r},i["default"].createElement("span",{className:"rw-tag-btn","aria-hidden":"true"},"×")))}))},_delete:function(e){this.props.onDelete(e)},remove:function(e){var t=this.props.value[e];!t||h.isDisabledItem(t,this.props)||h.isReadOnlyItem(t,this.props)||this.props.onDelete(t)},removeNext:function(){var e=this.props.value[this.props.value.length-1];!e||h.isDisabledItem(e,this.props)||h.isReadOnlyItem(e,this.props)||this.props.onDelete(e)},clear:function(){this.setState({focused:null})},first:function(){for(var e=0,t=this.props.value,n=t.length;n>e&&h.isDisabledItem(t[e],this.props);)e++;return e!==n?e:null},last:function(){for(var e=this.props.value,t=e.length-1;t>-1&&h.isDisabledItem(e[t],this.props);)t--;return t>=0?t:null},next:function(e){for(var t=e+1,n=this.props.value,r=n.length;r>t&&h.isDisabledItem(t,this.props);)t++;return null===e||t>=r?null:t},prev:function(e){var t=e,n=this.props.value;for((null===t||0===t)&&(t=n.length),t--;t>-1&&h.isDisabledItem(n[t],this.props);)t--;return t>=0?t:null}}),e.exports=t["default"]},function(e,t,n){"use strict";function r(e){return s["default"].createClass({displayName:"SelectItem",render:function(){function t(e){v||g||y(e.target.checked)}var n=this.props,r=n.children,i=n.focused,o=n.selected,u=n.dataItem,l=a.objectWithoutProperties(n,["children","focused","selected","dataItem"]),d=e.props,c=d.multiple,f=d.name,h=void 0===f?O.instanceId(e,"_name"):f,m=_.contains(u,e._values(),e.props.valueField),y=e._change.bind(null,u),v=_.isDisabledItem(u,e.props),g=_.isReadOnlyItem(u,e.props),b=c?"checkbox":"radio";return s["default"].createElement("li",a._extends({},l,{tabIndex:"-1",role:b,"aria-checked":!!m,"aria-disabled":v||g,className:p["default"]("rw-list-option",{"rw-state-focus":i,"rw-state-selected":o,"rw-state-disabled":v,"rw-state-readonly":g})}),s["default"].createElement("label",null,s["default"].createElement("input",{name:h,tabIndex:"-1",role:"presentation",type:b,onChange:t,checked:m,disabled:v||g}),r))}})}var a=n(2);t.__esModule=!0;var i=n(3),s=a.interopRequireDefault(i),o=n(8),u=a.interopRequireDefault(o),l=n(7),p=a.interopRequireDefault(l),d=n(43),c=a.interopRequireDefault(d),f=n(30),h=a.interopRequireDefault(f),m=n(31),y=a.interopRequireDefault(m),v=n(33),g=a.interopRequireDefault(v),b=n(42),D=a.interopRequireDefault(b),T=n(50),w=a.interopRequireDefault(T),x=n(35),_=n(45),O=n(36),P=u["default"].omit,k=u["default"].pick,I={data:s["default"].PropTypes.array,value:s["default"].PropTypes.oneOfType([s["default"].PropTypes.any,s["default"].PropTypes.array]),onChange:s["default"].PropTypes.func,onMove:s["default"].PropTypes.func,multiple:s["default"].PropTypes.bool,itemComponent:y["default"].elementType,listComponent:y["default"].elementType,valueField:s["default"].PropTypes.string,textField:y["default"].accessor,busy:s["default"].PropTypes.bool,filter:s["default"].PropTypes.string,delay:s["default"].PropTypes.number,disabled:y["default"].disabled.acceptsArray,readOnly:y["default"].readOnly.acceptsArray,messages:s["default"].PropTypes.shape({emptyList:s["default"].PropTypes.string})},R=s["default"].createClass(a.createDecoratedObject([{key:"displayName",initializer:function(){return"SelectList"}},{key:"propTypes",initializer:function(){return I}},{key:"mixins",initializer:function(){return[n(46),n(54),n(38)()]}},{key:"getDefaultProps",value:function(){return{delay:250,value:[],data:[],ariaActiveDescendantKey:"selectlist",messages:{emptyList:"There are no items in this list"}}}},{key:"getDefaultState",value:function(e){var t=e.data,n=e.value,r=e.valueField,a=e.multiple,i=!a,s=u["default"].splat(n),o=i&&x.dataItem(t,s[0],r);return o=i&&o?o:(this.state||{}).focusedItem||null,{focusedItem:o,dataItems:!i&&s.map(function(e){return x.dataItem(t,e,r)})}}},{key:"getInitialState",value:function(){var e=this.getDefaultState(this.props);return e.ListItem=r(this),e}},{key:"componentWillReceiveProps",value:function(e){return this.setState(this.getDefaultState(e))}},{key:"componentDidMount",value:function(){D["default"](this.refs.list)}},{key:"render",value:function(){var e=this.props,t=e.className,n=e.tabIndex,r=e.busy,i=e.listComponent;i=i||g["default"];var o=P(this.props,Object.keys(I)),u=k(this.props,Object.keys(h["default"].type(i).propTypes)),l=this.state,d=l.ListItem,c=l.focusedItem,f=l.focused,m=this._data(),y=O.instanceId(this,"_listbox");return c=f&&!_.isDisabled(this.props)&&!_.isReadOnly(this.props)&&c,s["default"].createElement("div",a._extends({},o,{onKeyDown:this._keyDown,onFocus:this._focus.bind(null,!0),onBlur:this._focus.bind(null,!1),role:"radiogroup","aria-busy":!!r,"aria-disabled":_.isDisabled(this.props),"aria-readonly":_.isReadOnly(this.props),tabIndex:"-1",className:p["default"](t,"rw-widget","rw-selectlist",{"rw-state-focus":f,"rw-state-disabled":_.isDisabled(this.props),"rw-state-readonly":_.isReadOnly(this.props),"rw-rtl":this.isRtl(),"rw-loading-mask":r})}),s["default"].createElement(i,a._extends({},u,{ref:"list",id:y,role:"radiogroup",tabIndex:n||"0",data:m,focused:c,optionComponent:d,itemComponent:this.props.itemComponent,onMove:this._scrollTo})))}},{key:"_scrollTo",value:function(e,t){var n=this.props.onMove;n?n(e,t):(this._scrollCancel&&this._scrollCancel(),this._scrollCancel=w["default"](e))}},{key:"_keyDown",decorators:[_.widgetEditable],value:function(e){var t=this,n=e.key,r=this.props,a=r.valueField,i=r.multiple,s=this.refs.list,o=this.state.focusedItem,u=this.props,l=function(e,t){return _.move(e,t,u,s)},p=function(e){e&&t._change(e,i?!_.contains(e,t._values(),a):!0)};"End"===n?(e.preventDefault(),i?this.setState({focusedItem:l("prev",null)}):p(l("prev",null))):"Home"===n?(e.preventDefault(),i?this.setState({focusedItem:l("next",null)}):p(l("next",null))):"Enter"===n||" "===n?(e.preventDefault(),p(o)):"ArrowDown"===n||"ArrowRight"===n?(e.preventDefault(),i?this.setState({focusedItem:l("next",o)}):p(l("next",o))):"ArrowUp"===n||"ArrowLeft"===n?(e.preventDefault(),i?this.setState({focusedItem:l("prev",o)}):p(l("prev",o))):i&&65===e.keyCode&&e.ctrlKey?(e.preventDefault(),this._selectAll()):this.search(String.fromCharCode(e.keyCode))}},{key:"_selectAll",value:function(){var e,t=this,n=this.props,r=n.disabled,a=n.readOnly,i=n.valueField,s=this.state.dataItems,o=this._data();r=r||a,r=Array.isArray(r)?r:[],e=r.filter(function(e){return!_.contains(e,s,i)}),o=o.filter(function(t){return!_.contains(t,e,i)}),o.length===s.length&&(o=r.filter(function(e){return _.contains(e,s,i)}),o=o.map(function(e){return x.dataItem(t._data(),e,i)})),O.notify(this.props.onChange,[o])}},{key:"_change",value:function(e,t){var n=this.props.multiple,r=this.state.dataItems;return(n=!!n)?(r=t?r.concat(e):r.filter(function(t){return t!==e}),void O.notify(this.props.onChange,[r||[]])):O.notify(this.props.onChange,t?e:null)}},{key:"_focus",decorators:[_.widgetEnabled],value:function(e,t){var n=this;e&&h["default"].findDOMNode(this.refs.list).focus(),this.setTimeout("focus",function(){e!==n.state.focused&&(O.notify(n.props[e?"onFocus":"onBlur"],t),n.setState({focused:e}))})}},{key:"search",value:function(e){var t=this,n=((this._searchTerm||"")+e).toLowerCase(),r=this.refs.list;this._searchTerm=n,this.setTimeout("search",function(){var e=r.next(t.state.focusedItem,n);t._searchTerm="",e&&t.setState({focusedItem:e})},this.props.delay)}},{key:"_data",value:function(){return this.props.data}},{key:"_values",value:function(){return this.props.multiple?this.state.dataItems:this.props.value}}])),E=c["default"](R,{value:"onChange"});E.BaseSelectList=R,t["default"]=E,e.exports=t["default"]},function(e,t,n){"use strict";function r(e){return function(){return a(!1,"setGlobalizeInstance() is depreciated. use setDateLocalizer() and setNumberLocalizer() with the Globalize localizers.  TODO DOC LINK"),e.apply(this,arguments)}}var a=n(40),i=n(20),s=n(22),o=s.NumberLocalizer,u=s.DateLocalizer,l=n(21),p=l.globalizeNumberLocalizer,d=l.globalizeDateLocalizer;e.exports={setGlobalizeInstance:r(function(e){i.locale.date=d(e),i.locale.number=p(e)}),setAnimate:function(e){i.animate=e},setDateLocalizer:function(e){i.locale.date=new u(e)},setNumberLocalizer:function(e){i.locale.number=new o(e)}}}])});
=======
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = '';

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}

			return classes.substr(1);
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _domHelpersStyle = __webpack_require__(7);

	var _domHelpersStyle2 = babelHelpers.interopRequireDefault(_domHelpersStyle);

	var _domHelpersQueryHeight = __webpack_require__(28);

	var _domHelpersQueryHeight2 = babelHelpers.interopRequireDefault(_domHelpersQueryHeight);

	var _utilConfiguration = __webpack_require__(4);

	var _utilConfiguration2 = babelHelpers.interopRequireDefault(_utilConfiguration);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var transform = _utilConfiguration2['default'].animate.transform;

	function properties(prop, value) {
	  var _ref, _ref2;

	  var TRANSLATION_MAP = _utilConfiguration2['default'].animate.TRANSLATION_MAP;

	  if (TRANSLATION_MAP && TRANSLATION_MAP[prop]) return (_ref = {}, _ref[transform] = TRANSLATION_MAP[prop] + '(' + value + ')', _ref);

	  return (_ref2 = {}, _ref2[prop] = value, _ref2);
	}

	var PopupContent = _react2['default'].createClass({
	  displayName: 'PopupContent',

	  render: function render() {
	    var child = this.props.children;

	    if (!child) return _react2['default'].createElement('span', { className: 'rw-popup rw-widget' });

	    child = _react2['default'].Children.only(this.props.children);

	    return _react.cloneElement(child, {
	      className: _classnames2['default'](child.props.className, 'rw-popup rw-widget')
	    });
	  }
	});

	module.exports = _react2['default'].createClass({

	  displayName: 'Popup',

	  propTypes: {
	    open: _react2['default'].PropTypes.bool,
	    dropUp: _react2['default'].PropTypes.bool,
	    duration: _react2['default'].PropTypes.number,

	    onRequestClose: _react2['default'].PropTypes.func.isRequired,
	    onClosing: _react2['default'].PropTypes.func,
	    onOpening: _react2['default'].PropTypes.func,
	    onClose: _react2['default'].PropTypes.func,
	    onOpen: _react2['default'].PropTypes.func
	  },

	  getInitialState: function getInitialState() {
	    return {};
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      duration: 200,
	      open: false,
	      onClosing: function onClosing() {},
	      onOpening: function onOpening() {},
	      onClose: function onClose() {},
	      onOpen: function onOpen() {}
	    };
	  },

	  // componentDidMount(){
	  //   !this.props.open && this.close(0)
	  // },
	  componentWillMount: function componentWillMount() {
	    !this.props.open && (this._initialPosition = true);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState({
	      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
	    });
	  },

	  componentDidUpdate: function componentDidUpdate(pvProps) {
	    var closing = pvProps.open && !this.props.open,
	        opening = !pvProps.open && this.props.open,
	        open = this.props.open;

	    if (opening) this.open();else if (closing) this.close();else if (open) this.height();
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var open = _props.open;
	    var dropUp = _props.dropUp;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'open', 'dropUp']);
	    var display = open ? 'block' : void 0;

	    if (this._initialPosition) {
	      display = 'none';
	    }

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, props, {
	        style: babelHelpers._extends({
	          display: display,
	          height: this.state.height
	        }, props.style),
	        className: _classnames2['default'](className, 'rw-popup-container', { 'rw-dropup': dropUp })
	      }),
	      _react2['default'].createElement(
	        PopupContent,
	        { ref: 'content' },
	        this.props.children
	      )
	    );
	  },

	  reset: function reset() {
	    var container = _utilCompat2['default'].findDOMNode(this),
	        content = _utilCompat2['default'].findDOMNode(this.refs.content),
	        style = { display: 'block', overflow: 'hidden' };

	    _domHelpersStyle2['default'](container, style);
	    this.height();
	    _domHelpersStyle2['default'](content, properties('top', this.props.dropUp ? '100%' : '-100%'));
	  },

	  height: function height() {
	    var el = _utilCompat2['default'].findDOMNode(this),
	        content = _utilCompat2['default'].findDOMNode(this.refs.content),
	        margin = parseInt(_domHelpersStyle2['default'](content, 'margin-top'), 10) + parseInt(_domHelpersStyle2['default'](content, 'margin-bottom'), 10);

	    var height = _domHelpersQueryHeight2['default'](content) + (isNaN(margin) ? 0 : margin);

	    if (this.state.height !== height) {
	      el.style.height = height + 'px';
	      this.setState({ height: height });
	    }
	  },

	  open: function open() {
	    var self = this,
	        anim = _utilCompat2['default'].findDOMNode(this),
	        el = _utilCompat2['default'].findDOMNode(this.refs.content);

	    this.ORGINAL_POSITION = _domHelpersStyle2['default'](el, 'position');
	    this._isOpening = true;

	    if (this._initialPosition) {
	      this._initialPosition = false;
	      this.reset();
	    } else this.height();

	    this.props.onOpening();

	    anim.className += ' rw-popup-animating';
	    el.style.position = 'absolute';

	    _utilConfiguration2['default'].animate(el, { top: 0 }, self.props.duration, 'ease', function () {
	      if (!self._isOpening) return;

	      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');

	      el.style.position = self.ORGINAL_POSITION;
	      anim.style.overflow = 'visible';
	      self.ORGINAL_POSITION = null;

	      self.props.onOpen();
	    });
	  },

	  close: function close(dur) {
	    var self = this,
	        el = _utilCompat2['default'].findDOMNode(this.refs.content),
	        anim = _utilCompat2['default'].findDOMNode(this);

	    this.ORGINAL_POSITION = _domHelpersStyle2['default'](el, 'position');

	    this._isOpening = false;
	    this.height();
	    this.props.onClosing();

	    anim.style.overflow = 'hidden';
	    anim.className += ' rw-popup-animating';
	    el.style.position = 'absolute';

	    _utilConfiguration2['default'].animate(el, { top: this.props.dropUp ? '100%' : '-100%' }, dur === undefined ? this.props.duration : dur, 'ease', function () {
	      if (self._isOpening) return;

	      el.style.position = self.ORGINAL_POSITION;
	      anim.className = anim.className.replace(/ ?rw-popup-animating/g, '');

	      anim.style.display = 'none';
	      self.ORGINAL_POSITION = null;
	      self.props.onClose();
	    });
	  }

	});

	function childKey(children) {
	  var nextChildMapping = _react2['default'].Children.map(children, function (c) {
	    return c;
	  });
	  for (var key in nextChildMapping) return key;
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var offset = __webpack_require__(29),
	    getWindow = __webpack_require__(30);

	module.exports = function height(node, client) {
	  var win = getWindow(node);
	  return win ? win.innerHeight : client ? node.clientHeight : offset(node).height;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var contains = __webpack_require__(25),
	    getWindow = __webpack_require__(30),
	    ownerDocument = __webpack_require__(24);

	module.exports = function offset(node) {
	  var doc = ownerDocument(node),
	      win = getWindow(doc),
	      docElem = doc && doc.documentElement,
	      box = { top: 0, left: 0, height: 0, width: 0 };

	  if (!doc) return;

	  // Make sure it's not a disconnected DOM node
	  if (!contains(docElem, node)) return box;

	  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

	  if (box.width || box.height) {

	    box = {
	      top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
	      left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
	      width: (box.width == null ? node.offsetWidth : box.width) || 0,
	      height: (box.height == null ? node.offsetHeight : box.height) || 0
	    };
	  }

	  return box;
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function getWindow(node) {
	  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _reactDom = __webpack_require__(32);

	var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

	var _version = _react2['default'].version.split('.').map(parseFloat);

	module.exports = {

	  version: function version() {
	    return _version;
	  },

	  findDOMNode: function findDOMNode(component) {
	    return _reactDom2['default'].findDOMNode(component);
	  }

	};

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _localizers = __webpack_require__(18);

	var _localizers2 = babelHelpers.interopRequireDefault(_localizers);

	var _filter = __webpack_require__(34);

	var _filter2 = babelHelpers.interopRequireDefault(_filter);

	var filterTypes = Object.keys(_filter2['default']).filter(function (i) {
	  return i !== 'filter';
	});

	function getInteractionPropType(key) {
	  var types = [_react.PropTypes.bool, _react.PropTypes.oneOf([key])],
	      propType = _react.PropTypes.oneOfType(types);

	  propType.acceptsArray = _react.PropTypes.oneOfType(types.concat(_react.PropTypes.array));

	  return propType;
	}

	module.exports = {

	  elementType: createChainableTypeChecker(function (props, propName, componentName) {

	    if (typeof props[propName] !== 'function') {
	      if (_react2['default'].isValidElement(props[propName])) return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type`, not an actual Element');

	      if (typeof props[propName] !== 'string') return new Error('Invalid prop `' + propName + '` specified in  `' + componentName + '`.' + ' Expected an Element `type` such as a tag name or return value of React.createClass(...)');
	    }
	    return null;
	  }),

	  numberFormat: createChainableTypeChecker(function () {
	    var _localizers$number;

	    return (_localizers$number = _localizers2['default'].number).propType.apply(_localizers$number, arguments);
	  }),

	  dateFormat: createChainableTypeChecker(function () {
	    var _localizers$date;

	    return (_localizers$date = _localizers2['default'].date).propType.apply(_localizers$date, arguments);
	  }),

	  disabled: getInteractionPropType('disabled'),
	  readOnly: getInteractionPropType('readOnly'),

	  accessor: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.func]),

	  message: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.func, _react2['default'].PropTypes.string]),

	  filter: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.func, _react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(filterTypes)])
	};

	function createChainableTypeChecker(validate) {

	  function checkType(isRequired, props, propName, componentName, location) {
	    componentName = componentName || '<<anonymous>>';
	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error('Required prop `' + propName + '` was not specified in  `' + componentName + '`.');
	      }
	    } else return validate(props, propName, componentName, location);
	  }

	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);

	  return chainedCheckType;
	}

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	var common = {
	  eq: function eq(a, b) {
	    return a === b;
	  },
	  neq: function neq(a, b) {
	    return a !== b;
	  },
	  gt: function gt(a, b) {
	    return a > b;
	  },
	  gte: function gte(a, b) {
	    return a >= b;
	  },
	  lt: function lt(a, b) {
	    return a < b;
	  },
	  lte: function lte(a, b) {
	    return a <= b;
	  },

	  contains: function contains(a, b) {
	    return a.indexOf(b) !== -1;
	  },

	  startsWith: function startsWith(a, b) {
	    return a.lastIndexOf(b, 0) === 0;
	  },

	  endsWith: function endsWith(a, b) {
	    var pos = a.length - b.length,
	        lastIndex = a.indexOf(b, pos);

	    return lastIndex !== -1 && lastIndex === pos;
	  }
	};

	exports["default"] = common;
	module.exports = exports["default"];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _ListOption = __webpack_require__(36);

	var _ListOption2 = babelHelpers.interopRequireDefault(_ListOption);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilWidgetHelpers = __webpack_require__(38);

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'List',

	  mixins: [__webpack_require__(39), __webpack_require__(40)()],

	  propTypes: {
	    data: _react2['default'].PropTypes.array,
	    onSelect: _react2['default'].PropTypes.func,
	    onMove: _react2['default'].PropTypes.func,

	    optionComponent: _utilPropTypes2['default'].elementType,
	    itemComponent: _utilPropTypes2['default'].elementType,

	    selectedIndex: _react2['default'].PropTypes.number,
	    focusedIndex: _react2['default'].PropTypes.number,
	    valueField: _react2['default'].PropTypes.string,
	    textField: _utilPropTypes2['default'].accessor,

	    optionID: _react2['default'].PropTypes.func,

	    messages: _react2['default'].PropTypes.shape({
	      emptyList: _utilPropTypes2['default'].message
	    })
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      optID: '',
	      onSelect: function onSelect() {},
	      optionComponent: _ListOption2['default'],
	      ariaActiveDescendantKey: 'list',
	      data: [],
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.move();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var _props = this.props;
	    var data = _props.data;
	    var focused = _props.focused;
	    var idx = data.indexOf(focused);
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), idx);

	    this.ariaActiveDescendant(idx !== -1 ? activeId : null);

	    this.move();
	  },

	  render: function render() {
	    var _props2 = this.props;
	    var className = _props2.className;
	    var role = _props2.role;
	    var data = _props2.data;
	    var textField = _props2.textField;
	    var valueField = _props2.valueField;
	    var focused = _props2.focused;
	    var selected = _props2.selected;
	    var messages = _props2.messages;
	    var onSelect = _props2.onSelect;
	    var ItemComponent = _props2.itemComponent;
	    var Option = _props2.optionComponent;
	    var optionID = _props2.optionID;
	    var props = babelHelpers.objectWithoutProperties(_props2, ['className', 'role', 'data', 'textField', 'valueField', 'focused', 'selected', 'messages', 'onSelect', 'itemComponent', 'optionComponent', 'optionID']);
	    var id = _utilWidgetHelpers.instanceId(this);
	    var items;

	    items = !data.length ? _react2['default'].createElement(
	      'li',
	      { className: 'rw-list-empty' },
	      _util_2['default'].result(messages.emptyList, this.props)
	    ) : data.map(function (item, idx) {
	      var currentId = optionId(id, idx);

	      return _react2['default'].createElement(
	        Option,
	        {
	          key: 'item_' + idx,
	          id: currentId,
	          dataItem: item,
	          focused: focused === item,
	          selected: selected === item,
	          onClick: onSelect.bind(null, item)
	        },
	        ItemComponent ? _react2['default'].createElement(ItemComponent, {
	          item: item,
	          value: _utilDataHelpers.dataValue(item, valueField),
	          text: _utilDataHelpers.dataText(item, textField)
	        }) : _utilDataHelpers.dataText(item, textField)
	      );
	    });

	    return _react2['default'].createElement(
	      'ul',
	      babelHelpers._extends({
	        id: id,
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-list'),
	        role: role === undefined ? 'listbox' : role
	      }, props),
	      items
	    );
	  },

	  _data: function _data() {
	    return this.props.data;
	  },

	  move: function move() {
	    var list = _utilCompat2['default'].findDOMNode(this),
	        idx = this._data().indexOf(this.props.focused),
	        selected = list.children[idx];

	    if (!selected) return;

	    _utilWidgetHelpers.notify(this.props.onMove, [selected, list, this.props.focused]);
	  }

	});
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var ListOption = _react2['default'].createClass({
	  displayName: 'ListOption',

	  propTypes: {
	    dataItem: _react2['default'].PropTypes.any,
	    focused: _react2['default'].PropTypes.bool,
	    selected: _react2['default'].PropTypes.bool
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var children = _props.children;
	    var focused = _props.focused;
	    var selected = _props.selected;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'children', 'focused', 'selected']);

	    var classes = {
	      'rw-state-focus': focused,
	      'rw-state-selected': selected
	    };

	    return _react2['default'].createElement(
	      'li',
	      babelHelpers._extends({
	        role: 'option',
	        tabIndex: '-1',
	        'aria-selected': !!selected,
	        className: _classnames2['default']('rw-list-option', className, classes)
	      }, props),
	      children
	    );
	  }
	});

	exports['default'] = ListOption;
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.dataValue = dataValue;
	exports.dataText = dataText;
	exports.dataIndexOf = dataIndexOf;
	exports.valueMatcher = valueMatcher;
	exports.dataItem = dataItem;

	var _ = __webpack_require__(20);

	function accessor(data, field) {
	  var value = data;

	  if (typeof field === 'function') value = field(data);else if (data == null) value = data;else if (typeof field === 'string' && typeof data === 'object' && field in data) value = data[field];

	  return value;
	}

	function dataValue(item, valueField) {
	  return valueField && item && _.has(item, valueField) ? item[valueField] : item;
	}

	function dataText(item, textField) {
	  var value = accessor(item, textField);
	  return value == null ? '' : value + '';
	}

	function dataIndexOf(data, item, valueField) {
	  var idx = -1,
	      len = data.length,
	      finder = function finder(datum) {
	    return valueMatcher(item, datum, valueField);
	  };

	  while (++idx < len) if (finder(data[idx])) return idx;

	  return -1;
	}

	function valueMatcher(a, b, valueField) {
	  return _.isShallowEqual(dataValue(a, valueField), dataValue(b, valueField));
	}

	function dataItem(data, item, valueField) {
	  var first = data[0],
	      idx;

	  // make an attempt to see if we were passed in dataItem vs just a valueField value
	  // either an object with the right prop, or a primitive
	  // { valueField: 5 } || "hello" [ "hello" ]
	  if (_.has(item, valueField) || typeof first === typeof val) return item;

	  idx = dataIndexOf(data, dataValue(item, valueField), valueField);

	  if (idx !== -1) return data[idx];

	  return item;
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.notify = notify;
	exports.instanceId = instanceId;
	exports.isFirstFocusedRender = isFirstFocusedRender;

	var _ = __webpack_require__(20);

	function notify(handler, args) {
	  handler && handler.apply(null, [].concat(args));
	}

	function instanceId(component) {
	  var suffix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  component.__id || (component.__id = _.uniqueId('rw_'));
	  return (component.props.id || component.__id) + suffix;
	}

	function isFirstFocusedRender(component) {
	  return component._firstFocus || component.state.focused && (component._firstFocus = true);
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilFilter = __webpack_require__(34);

	var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

	var _utilDataHelpers = __webpack_require__(37);

	module.exports = {

	  propTypes: {
	    textField: _react2['default'].PropTypes.string
	  },

	  first: function first() {
	    return this._data()[0];
	  },

	  last: function last() {
	    var data = this._data();
	    return data[data.length - 1];
	  },

	  prev: function prev(item, word) {
	    var textField = this.props.textField,
	        data = this._data(),
	        idx = data.indexOf(item);

	    if (idx === -1) idx = data.length;

	    return word ? findPrevInstance(textField, data, word, idx) : --idx < 0 ? data[0] : data[idx];
	  },

	  next: function next(item, word) {
	    var textField = this.props.textField,
	        data = this._data(),
	        idx = data.indexOf(item);

	    return word ? findNextInstance(textField, data, word, idx) : ++idx === data.length ? data[data.length - 1] : data[idx];
	  }

	};

	function findNextInstance(textField, data, word, startIndex) {
	  var matches = _utilFilter2['default'].startsWith,
	      idx = -1,
	      len = data.length,
	      foundStart,
	      itemText;

	  word = word.toLowerCase();

	  while (++idx < len) {
	    foundStart = foundStart || idx > startIndex;
	    itemText = foundStart && _utilDataHelpers.dataText(data[idx], textField).toLowerCase();

	    if (foundStart && matches(itemText, word)) return data[idx];
	  }
	}

	function findPrevInstance(textField, data, word, startIndex) {
	  var matches = _utilFilter2['default'].startsWith,
	      idx = data.length,
	      foundStart,
	      itemText;

	  word = word.toLowerCase();

	  while (--idx >= 0) {
	    foundStart = foundStart || idx < startIndex;
	    itemText = foundStart && _utilDataHelpers.dataText(data[idx], textField).toLowerCase();

	    if (foundStart && matches(itemText, word)) return data[idx];
	  }
	}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var shape = _react2['default'].PropTypes.shape({
	  //setActive: React.PropTypes.func,
	  reconcile: _react2['default'].PropTypes.func
	});

	function defaultReconcile(key, id) {
	  return id;
	}

	function flushAriaToNode(id, nodeOrComponent, ctx) {
	  var node = typeof nodeOrComponent === 'function' ? nodeOrComponent(ctx) : typeof nodeOrComponent === 'string' ? ctx.refs[nodeOrComponent] : ctx;

	  if (node) {
	    if (id) _utilCompat2['default'].findDOMNode(node).setAttribute('aria-activedescendant', id);else _utilCompat2['default'].findDOMNode(node).removeAttribute('aria-activedescendant');
	  }
	}

	exports['default'] = function (nodeOrComponent) {
	  var reconcileChildren = arguments.length <= 1 || arguments[1] === undefined ? defaultReconcile : arguments[1];

	  return {
	    propTypes: {
	      ariaActiveDescendantKey: _react2['default'].PropTypes.string.isRequired
	    },

	    contextTypes: {
	      activeDescendants: shape
	    },

	    childContextTypes: {
	      activeDescendants: shape
	    },

	    ariaActiveDescendant: function ariaActiveDescendant(id) {
	      var key = arguments.length <= 1 || arguments[1] === undefined ? this.props.ariaActiveDescendantKey : arguments[1];
	      var activeDescendants = this.context.activeDescendants;

	      var current = this.__ariaActiveDescendantId;

	      if (id === undefined) return current;

	      id = reconcileChildren.call(this, key, id);

	      if (id === undefined) id = current;else {
	        this.__ariaActiveDescendantId = id;
	        flushAriaToNode(id, nodeOrComponent, this);
	      }

	      activeDescendants && activeDescendants.reconcile(key, id);
	    },

	    getChildContext: function getChildContext() {
	      var _this = this;

	      return this._context || (this._context = {
	        activeDescendants: {
	          reconcile: function reconcile(key, id) {
	            return _this.ariaActiveDescendant(id, key);
	          }
	        }
	      });
	    }
	  };
	};

	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _ListOption = __webpack_require__(36);

	var _ListOption2 = babelHelpers.interopRequireDefault(_ListOption);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _warning = __webpack_require__(42);

	var _warning2 = babelHelpers.interopRequireDefault(_warning);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilWidgetHelpers = __webpack_require__(38);

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'List',

	  mixins: [__webpack_require__(39), __webpack_require__(40)()],

	  propTypes: {
	    data: _react2['default'].PropTypes.array,
	    onSelect: _react2['default'].PropTypes.func,
	    onMove: _react2['default'].PropTypes.func,

	    optionComponent: _utilPropTypes2['default'].elementType,
	    itemComponent: _utilPropTypes2['default'].elementType,
	    groupComponent: _utilPropTypes2['default'].elementType,

	    selected: _react2['default'].PropTypes.any,
	    focused: _react2['default'].PropTypes.any,

	    valueField: _react2['default'].PropTypes.string,
	    textField: _utilPropTypes2['default'].accessor,

	    optID: _react2['default'].PropTypes.string,

	    groupBy: _utilPropTypes2['default'].accessor,

	    messages: _react2['default'].PropTypes.shape({
	      emptyList: _utilPropTypes2['default'].message
	    })
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      optID: '',
	      onSelect: function onSelect() {},
	      data: [],
	      optionComponent: _ListOption2['default'],
	      ariaActiveDescendantKey: 'groupedList',
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    };
	  },

	  getInitialState: function getInitialState() {
	    var keys = [];

	    return {
	      groups: this._group(this.props.groupBy, this.props.data, keys),

	      sortedKeys: keys
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var keys = [];

	    if (nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy) this.setState({
	      groups: this._group(nextProps.groupBy, nextProps.data, keys),
	      sortedKeys: keys
	    });
	  },

	  componentDidMount: function componentDidMount() {
	    this.move();
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this.ariaActiveDescendant(this._currentActiveID);
	    this.move();
	  },

	  render: function render() {
	    var _this = this;

	    var _props = this.props;
	    var className = _props.className;
	    var role = _props.role;
	    var data = _props.data;
	    var messages = _props.messages;
	    var onSelect = _props.onSelect;
	    var selectedIndex = _props.selectedIndex;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'role', 'data', 'messages', 'onSelect', 'selectedIndex']);
	    var id = _utilWidgetHelpers.instanceId(this);var _state = this.state;
	    var sortedKeys = _state.sortedKeys;
	    var groups = _state.groups;

	    var items = [],
	        idx = -1,
	        group = undefined;

	    this._currentActiveID = null;

	    if (data.length) {
	      items = sortedKeys.reduce(function (items, key) {
	        group = groups[key];
	        items.push(_this._renderGroupHeader(key));

	        for (var itemIdx = 0; itemIdx < group.length; itemIdx++) items.push(_this._renderItem(key, group[itemIdx], ++idx));

	        return items;
	      }, []);
	    } else items = _react2['default'].createElement(
	      'li',
	      { className: 'rw-list-empty' },
	      _util_2['default'].result(messages.emptyList, this.props)
	    );

	    return _react2['default'].createElement(
	      'ul',
	      babelHelpers._extends({
	        ref: 'scrollable',
	        id: id,
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-list', 'rw-list-grouped'),
	        role: role === undefined ? 'listbox' : role
	      }, props),
	      items
	    );
	  },

	  _renderGroupHeader: function _renderGroupHeader(group) {
	    var GroupComponent = this.props.groupComponent,
	        id = _utilWidgetHelpers.instanceId(this);

	    return _react2['default'].createElement(
	      'li',
	      {
	        key: 'item_' + group,
	        tabIndex: '-1',
	        role: 'separator',
	        id: id + '_group_' + group,
	        className: 'rw-list-optgroup'
	      },
	      GroupComponent ? _react2['default'].createElement(GroupComponent, { item: group }) : group
	    );
	  },

	  _renderItem: function _renderItem(group, item, idx) {
	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var selected = _props2.selected;
	    var onSelect = _props2.onSelect;
	    var textField = _props2.textField;
	    var valueField = _props2.valueField;
	    var ItemComponent = _props2.itemComponent;
	    var Option = _props2.optionComponent;

	    var currentID = optionId(_utilWidgetHelpers.instanceId(this), idx);

	    if (focused === item) this._currentActiveID = currentID;

	    return _react2['default'].createElement(
	      Option,
	      {
	        key: 'item_' + group + '_' + idx,
	        id: currentID,
	        dataItem: item,
	        focused: focused === item,
	        selected: selected === item,
	        onClick: onSelect.bind(null, item)
	      },
	      ItemComponent ? _react2['default'].createElement(ItemComponent, {
	        item: item,
	        value: _utilDataHelpers.dataValue(item, valueField),
	        text: _utilDataHelpers.dataText(item, textField)
	      }) : _utilDataHelpers.dataText(item, textField)
	    );
	  },

	  _isIndexOf: function _isIndexOf(idx, item) {
	    return this.props.data[idx] === item;
	  },

	  _group: function _group(groupBy, data, keys) {
	    var iter = typeof groupBy === 'function' ? groupBy : function (item) {
	      return item[groupBy];
	    };

	    // the keys array ensures that groups are rendered in the order they came in
	    // which means that if you sort the data array it will render sorted,
	    // so long as you also sorted by group
	    keys = keys || [];

	    _warning2['default'](typeof groupBy !== 'string' || !data.length || _util_2['default'].has(data[0], groupBy), '[React Widgets] You are seem to be trying to group this list by a ' + ('property `' + groupBy + '` that doesn\'t exist in the dataset items, this may be a typo'));

	    return data.reduce(function (grps, item) {
	      var group = iter(item);

	      _util_2['default'].has(grps, group) ? grps[group].push(item) : (keys.push(group), grps[group] = [item]);

	      return grps;
	    }, {});
	  },

	  _data: function _data() {
	    var groups = this.state.groups;

	    return this.state.sortedKeys.reduce(function (flat, grp) {
	      return flat.concat(groups[grp]);
	    }, []);
	  },

	  move: function move() {
	    var selected = this.getItemDOMNode(this.props.focused);

	    if (!selected) return;

	    _utilWidgetHelpers.notify(this.props.onMove, [selected, _utilCompat2['default'].findDOMNode(this), this.props.focused]);
	  },

	  getItemDOMNode: function getItemDOMNode(item) {
	    var list = _utilCompat2['default'].findDOMNode(this),
	        groups = this.state.groups,
	        idx = -1,
	        itemIdx,
	        child;

	    this.state.sortedKeys.some(function (group) {
	      itemIdx = groups[group].indexOf(item);
	      idx++;

	      if (itemIdx !== -1) return !!(child = list.children[idx + itemIdx + 1]);

	      idx += groups[group].length;
	    });

	    return child;
	  }

	});
	module.exports = exports['default'];

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;
	exports['default'] = validateListComponent;

	var _invariant = __webpack_require__(19);

	var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

	var METHODS = ['next', 'prev', 'first', 'last'];

	function validateListComponent(list) {
	  if (process.env.NODE_ENV !== 'production') {
	    METHODS.forEach(function (method) {
	      return _invariant2['default'](typeof list[method] === 'function', 'List components must implement a `' + method + '()` method');
	    });
	  }
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _createUncontrollable = __webpack_require__(45);

	var _createUncontrollable2 = _interopRequireDefault(_createUncontrollable);

	var mixin = {
	  shouldComponentUpdate: function shouldComponentUpdate() {
	    //let the forceUpdate trigger the update
	    return !this._notifying;
	  }
	};

	function set(component, propName, handler, value, args) {
	  if (handler) {
	    component._notifying = true;
	    handler.call.apply(handler, [component, value].concat(args));
	    component._notifying = false;
	  }

	  component._values[propName] = value;
	  component.forceUpdate();
	}

	exports['default'] = _createUncontrollable2['default']([mixin], set);
	module.exports = exports['default'];

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = createUncontrollable;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _react = __webpack_require__(21);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(46);

	var utils = _interopRequireWildcard(_utils);

	function createUncontrollable(mixins, set) {

	  return uncontrollable;

	  function uncontrollable(Component, controlledValues) {
	    var methods = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	    var displayName = Component.displayName || Component.name || 'Component',
	        basePropTypes = utils.getType(Component).propTypes,
	        propTypes;

	    propTypes = utils.uncontrolledPropTypes(controlledValues, basePropTypes, displayName);

	    methods = utils.transform(methods, function (obj, method) {
	      obj[method] = function () {
	        var _refs$inner;

	        return (_refs$inner = this.refs.inner)[method].apply(_refs$inner, arguments);
	      };
	    }, {});

	    var component = _react2['default'].createClass(_extends({

	      displayName: 'Uncontrolled(' + displayName + ')',

	      mixins: mixins,

	      propTypes: propTypes

	    }, methods, {

	      componentWillMount: function componentWillMount() {
	        var props = this.props,
	            keys = Object.keys(controlledValues);

	        this._values = utils.transform(keys, function (values, key) {
	          values[key] = props[utils.defaultKey(key)];
	        }, {});
	      },

	      /**
	       * If a prop switches from controlled to Uncontrolled
	       * reset its value to the defaultValue
	       */
	      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var _this = this;

	        var props = this.props,
	            keys = Object.keys(controlledValues);

	        keys.forEach(function (key) {
	          if (utils.getValue(nextProps, key) === undefined && utils.getValue(props, key) !== undefined) {
	            _this._values[key] = nextProps[utils.defaultKey(key)];
	          }
	        });
	      },

	      render: function render() {
	        var _this2 = this;

	        var newProps = {};
	        var _props = this.props;
	        var valueLink = _props.valueLink;
	        var checkedLink = _props.checkedLink;

	        var props = _objectWithoutProperties(_props, ['valueLink', 'checkedLink']);

	        utils.each(controlledValues, function (handle, propName) {
	          var linkPropName = utils.getLinkName(propName),
	              prop = _this2.props[propName];

	          if (linkPropName && !isProp(_this2.props, propName) && isProp(_this2.props, linkPropName)) {
	            prop = _this2.props[linkPropName].value;
	          }

	          newProps[propName] = prop !== undefined ? prop : _this2._values[propName];

	          newProps[handle] = setAndNotify.bind(_this2, propName);
	        });

	        newProps = _extends({}, props, newProps, { ref: 'inner' });

	        return _react2['default'].createElement(Component, newProps);
	      }

	    }));

	    component.ControlledComponent = Component;

	    return component;

	    function setAndNotify(propName, value) {
	      var linkName = utils.getLinkName(propName),
	          handler = this.props[controlledValues[propName]];

	      if (linkName && isProp(this.props, linkName) && !handler) {
	        handler = this.props[linkName].requestChange;
	      }

	      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	      }

	      set(this, propName, handler, value, args);
	    }

	    function isProp(props, prop) {
	      return props[prop] !== undefined;
	    }
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.customPropType = customPropType;
	exports.uncontrolledPropTypes = uncontrolledPropTypes;
	exports.getType = getType;
	exports.getValue = getValue;
	exports.getLinkName = getLinkName;
	exports.defaultKey = defaultKey;
	exports.chain = chain;
	exports.transform = transform;
	exports.each = each;
	exports.has = has;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(21);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(19);

	var _invariant2 = _interopRequireDefault(_invariant);

	function customPropType(handler, propType, name) {

	  return function (props, propName) {

	    if (props[propName] !== undefined) {
	      if (!props[handler]) {
	        return new Error('You have provided a `' + propName + '` prop to ' + '`' + name + '` without an `' + handler + '` handler. This will render a read-only field. ' + 'If the field should be mutable use `' + defaultKey(propName) + '`. Otherwise, set `' + handler + '`');
	      }

	      return propType && propType(props, propName, name);
	    }
	  };
	}

	function uncontrolledPropTypes(controlledValues, basePropTypes, displayName) {
	  var propTypes = {};

	  if (process.env.NODE_ENV !== 'production' && basePropTypes) {
	    transform(controlledValues, function (obj, handler, prop) {
	      var type = basePropTypes[prop];

	      _invariant2['default'](typeof handler === 'string' && handler.trim().length, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop);

	      obj[prop] = customPropType(handler, type, displayName);

	      if (type !== undefined) obj[defaultKey(prop)] = type;
	    }, propTypes);
	  }

	  return propTypes;
	}

	var version = _react2['default'].version.split('.').map(parseFloat);

	exports.version = version;

	function getType(component) {
	  if (version[0] === 0 && version[1] >= 13) return component;

	  return component.type;
	}

	function getValue(props, name) {
	  var linkPropName = getLinkName(name);

	  if (linkPropName && !isProp(props, name) && isProp(props, linkPropName)) return props[linkPropName].value;

	  return props[name];
	}

	function isProp(props, prop) {
	  return props[prop] !== undefined;
	}

	function getLinkName(name) {
	  return name === 'value' ? 'valueLink' : name === 'checked' ? 'checkedLink' : null;
	}

	function defaultKey(key) {
	  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
	}

	function chain(thisArg, a, b) {
	  return function chainedFunction() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    a && a.call.apply(a, [thisArg].concat(args));
	    b && b.call.apply(b, [thisArg].concat(args));
	  };
	}

	function transform(obj, cb, seed) {
	  each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
	  return seed;
	}

	function each(obj, cb, thisArg) {
	  if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

	  for (var key in obj) if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
	}

	function has(o, k) {
	  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.isDisabled = isDisabled;
	exports.isReadOnly = isReadOnly;
	exports.isDisabledItem = isDisabledItem;
	exports.isReadOnlyItem = isReadOnlyItem;
	exports.contains = contains;
	exports.move = move;

	var _dataHelpers = __webpack_require__(37);

	function isDisabled(props) {
	  return props.disabled === true || props.disabled === 'disabled';
	}

	function isReadOnly(props) {
	  return props.readOnly === true || props.readOnly === 'readOnly';
	}

	function isDisabledItem(item, props) {
	  return isDisabled(props) || contains(item, props.disabled, props.valueField);
	}

	function isReadOnlyItem(item, props) {
	  return isReadOnly(props) || contains(item, props.readOnly, props.valueField);
	}

	function contains(item, values, valueField) {
	  return Array.isArray(values) ? values.some(function (value) {
	    return _dataHelpers.valueMatcher(item, value, valueField);
	  }) : _dataHelpers.valueMatcher(item, values, valueField);
	}

	function move(dir, item, props, list) {
	  var isDisabledOrReadonly = function isDisabledOrReadonly(item) {
	    return isDisabledItem(item, props) || isReadOnlyItem(item, props);
	  },
	      stop = dir === 'next' ? list.last() : list.first(),
	      next = list[dir](item);

	  while (next !== stop && isDisabledOrReadonly(next)) next = list[dir](next);

	  return isDisabledOrReadonly(next) ? item : next;
	}

	var widgetEnabled = interactionDecorator(true);

	exports.widgetEnabled = widgetEnabled;
	var widgetEditable = interactionDecorator(false);

	exports.widgetEditable = widgetEditable;
	function interactionDecorator(disabledOnly) {
	  function wrap(method) {
	    return function decoratedMethod() {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      if (!(isDisabled(this.props) || !disabledOnly && isReadOnly(this.props))) return method.apply(this, args);
	    };
	  }

	  return function decorate(target, key, desc) {
	    if (desc.initializer) {
	      (function () {
	        var init = desc.initializer;
	        desc.initializer = function () {
	          return wrap(init());
	        };
	      })();
	    } else desc.value = wrap(desc.value);
	    return desc;
	  };
	}

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _require = __webpack_require__(20);

	var has = _require.has;

	module.exports = {

	  componentWillUnmount: function componentWillUnmount() {
	    var timers = this._timers || {};

	    this._unmounted = true;

	    for (var k in timers) if (has(timers, k)) clearTimeout(timers[k]);
	  },

	  setTimeout: function setTimeout(key, cb, duration) {
	    var timers = this._timers || (this._timers = Object.create(null));

	    if (this._unmounted) return;

	    clearTimeout(timers[key]);
	    timers[key] = window.setTimeout(cb, duration);
	  }

	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(20);

	//backport PureRenderEqual
	module.exports = {

	  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
	    return !_.isShallowEqual(this.props, nextProps) || !_.isShallowEqual(this.state, nextState);
	  }
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilFilter = __webpack_require__(34);

	var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilDataHelpers = __webpack_require__(37);

	var dflt = function dflt(f) {
	  return f === true ? 'startsWith' : f ? f : 'eq';
	};

	module.exports = {

	  propTypes: {
	    data: _react2['default'].PropTypes.array,
	    value: _react2['default'].PropTypes.any,
	    filter: _utilPropTypes2['default'].filter,
	    caseSensitive: _react2['default'].PropTypes.bool,
	    minLength: _react2['default'].PropTypes.number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      caseSensitive: false,
	      minLength: 1
	    };
	  },

	  filterIndexOf: function filterIndexOf(items, searchTerm) {
	    var idx = -1,
	        matches = typeof this.props.filter === 'function' ? this.props.filter : getFilter(_utilFilter2['default'][dflt(this.props.filter)], searchTerm, this);

	    if (!searchTerm || !searchTerm.trim() || this.props.filter && searchTerm.length < (this.props.minLength || 1)) return -1;

	    items.every(function (item, i) {
	      if (matches(item, searchTerm, i)) return (idx = i, false);

	      return true;
	    });

	    return idx;
	  },

	  filter: function filter(items, searchTerm) {
	    var matches = typeof this.props.filter === 'string' ? getFilter(_utilFilter2['default'][this.props.filter], searchTerm, this) : this.props.filter;

	    if (!matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1)) return items;

	    return items.filter(function (item, idx) {
	      return matches(item, searchTerm, idx);
	    });
	  }
	};

	function getFilter(matcher, searchTerm, ctx) {
	  searchTerm = !ctx.props.caseSensitive ? searchTerm.toLowerCase() : searchTerm;

	  return function (item) {
	    var val = _utilDataHelpers.dataText(item, ctx.props.textField);

	    if (!ctx.props.caseSensitive) val = val.toLowerCase();

	    return matcher(val, searchTerm);
	  };
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _domHelpersUtilScrollTo = __webpack_require__(52);

	var _domHelpersUtilScrollTo2 = babelHelpers.interopRequireDefault(_domHelpersUtilScrollTo);

	exports['default'] = {

	  _scrollTo: function _scrollTo(selected, list, focused) {
	    var state = this._scrollState || (this._scrollState = {}),
	        handler = this.props.onMove,
	        lastVisible = state.visible,
	        lastItem = state.focused,
	        shown,
	        changed;

	    state.visible = !(!list.offsetWidth || !list.offsetHeight);
	    state.focused = focused;

	    changed = lastItem !== focused;
	    shown = state.visible && !lastVisible;

	    if (shown || state.visible && changed) {
	      if (handler) handler(selected, list, focused);else {
	        state.scrollCancel && state.scrollCancel();
	        state.scrollCancel = _domHelpersUtilScrollTo2['default'](selected, list);
	      }
	    }
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var getOffset = __webpack_require__(29),
	    height = __webpack_require__(28),
	    getScrollParent = __webpack_require__(53),
	    scrollTop = __webpack_require__(54),
	    raf = __webpack_require__(55),
	    getWindow = __webpack_require__(30);

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

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var css = __webpack_require__(7),
	    height = __webpack_require__(28);

	module.exports = function scrollPrarent(node) {
	  var position = css(node, 'position'),
	      excludeStatic = position === 'absolute',
	      ownerDoc = node.ownerDocument;

	  if (position === 'fixed') return ownerDoc || document;

	  while ((node = node.parentNode) && node.nodeType !== 9) {

	    var isStatic = excludeStatic && css(node, 'position') === 'static',
	        style = css(node, 'overflow') + css(node, 'overflow-y') + css(node, 'overflow-x');

	    if (isStatic) continue;

	    if (/(auto|scroll)/.test(style) && height(node) < node.scrollHeight) return node;
	  }

	  return document;
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var getWindow = __webpack_require__(30);

	module.exports = function scrollTop(node, val) {
	  var win = getWindow(node);

	  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

	  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var canUseDOM = __webpack_require__(15);

	var vendors = ['', 'webkit', 'moz', 'o', 'ms'],
	    cancel = 'clearTimeout',
	    raf = fallback,
	    compatRaf;

	var getKey = function getKey(vendor, k) {
	  return vendor + (!vendor ? k : k[0].toUpperCase() + k.substr(1)) + 'AnimationFrame';
	};

	if (canUseDOM) {
	  vendors.some(function (vendor) {
	    var rafKey = getKey(vendor, 'request');

	    if (rafKey in window) {
	      cancel = getKey(vendor, 'cancel');
	      return raf = function (cb) {
	        return window[rafKey](cb);
	      };
	    }
	  });
	}

	/* https://github.com/component/raf */
	var prev = new Date().getTime();

	function fallback(fn) {
	  var curr = new Date().getTime(),
	      ms = Math.max(0, 16 - (curr - prev)),
	      req = setTimeout(fn, ms);

	  prev = curr;
	  return req;
	}

	compatRaf = function (cb) {
	  return raf(cb);
	};
	compatRaf.cancel = function (id) {
	  return window[cancel](id);
	};

	module.exports = compatRaf;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(21);

	module.exports = {

	  propTypes: {
	    isRtl: React.PropTypes.bool
	  },

	  contextTypes: {
	    isRtl: React.PropTypes.bool
	  },

	  childContextTypes: {
	    isRtl: React.PropTypes.bool
	  },

	  getChildContext: function getChildContext() {
	    return {
	      isRtl: this.props.isRtl || this.context && this.context.isRtl
	    };
	  },

	  isRtl: function isRtl() {
	    return !!(this.props.isRtl || this.context && this.context.isRtl);
	  }

	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilFilter = __webpack_require__(34);

	var _utilFilter2 = babelHelpers.interopRequireDefault(_utilFilter);

	var _Popup = __webpack_require__(27);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _WidgetButton = __webpack_require__(58);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _ComboboxInput = __webpack_require__(59);

	var _ComboboxInput2 = babelHelpers.interopRequireDefault(_ComboboxInput);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(35);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(41);

	var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

	var _utilValidateListInterface = __webpack_require__(43);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _uncontrollable = __webpack_require__(44);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilInteraction = __webpack_require__(47);

	var _utilWidgetHelpers = __webpack_require__(38);

	var defaultSuggest = function defaultSuggest(f) {
	  return f === true ? 'startsWith' : f ? f : 'eq';
	};

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;

	var propTypes = {
	  //-- controlled props -----------
	  value: _react2['default'].PropTypes.any,
	  onChange: _react2['default'].PropTypes.func,
	  open: _react2['default'].PropTypes.bool,
	  onToggle: _react2['default'].PropTypes.func,
	  //------------------------------------

	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,

	  groupComponent: _utilPropTypes2['default'].elementType,
	  groupBy: _utilPropTypes2['default'].accessor,

	  data: _react2['default'].PropTypes.array,
	  valueField: _react2['default'].PropTypes.string,
	  textField: _utilPropTypes2['default'].accessor,
	  name: _react2['default'].PropTypes.string,

	  onSelect: _react2['default'].PropTypes.func,

	  autoFocus: _react2['default'].PropTypes.bool,
	  disabled: _utilPropTypes2['default'].disabled,
	  readOnly: _utilPropTypes2['default'].readOnly,

	  suggest: _utilPropTypes2['default'].filter,
	  filter: _utilPropTypes2['default'].filter,

	  busy: _react2['default'].PropTypes.bool,

	  dropUp: _react2['default'].PropTypes.bool,
	  duration: _react2['default'].PropTypes.number, //popup

	  placeholder: _react2['default'].PropTypes.string,

	  messages: _react2['default'].PropTypes.shape({
	    open: _utilPropTypes2['default'].message,
	    emptyList: _utilPropTypes2['default'].message,
	    emptyFilter: _utilPropTypes2['default'].message
	  })
	};

	var ComboBox = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'ComboBox';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(50), __webpack_require__(51), __webpack_require__(56), __webpack_require__(40)('input')];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var _props = this.props;
	    var value = _props.value;
	    var data = _props.data;
	    var valueField = _props.valueField;
	    var items = this.process(data, value);
	    var idx = _utilDataHelpers.dataIndexOf(items, value, valueField);

	    return {
	      selectedItem: items[idx],
	      focusedItem: items[! ~idx ? 0 : idx],
	      processedData: items,
	      open: false
	    };
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      data: [],
	      value: '',
	      open: false,
	      suggest: false,
	      filter: false,
	      delay: 500,

	      messages: msgs(),
	      ariaActiveDescendantKey: 'combobox'
	    };
	  }
	}, {
	  key: 'componentDidUpdate',
	  value: function componentDidUpdate() {
	    this.refs.list && _utilValidateListInterface2['default'](this.refs.list);
	  }
	}, {
	  key: 'shouldComponentUpdate',
	  value: function shouldComponentUpdate(nextProps, nextState) {
	    var isSuggesting = this.refs.input && this.refs.input.isSuggesting(),
	        stateChanged = !_util_2['default'].isShallowEqual(nextState, this.state),
	        valueChanged = !_util_2['default'].isShallowEqual(nextProps, this.props);

	    return isSuggesting || stateChanged || valueChanged;
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    var value = nextProps.value;
	    var data = nextProps.data;
	    var valueField = nextProps.valueField;
	    var textField = nextProps.textField;

	    var rawIdx = _utilDataHelpers.dataIndexOf(data, value, valueField),
	        valueItem = rawIdx === -1 ? nextProps.value : nextProps.data[rawIdx],
	        isSuggesting = this.refs.input.isSuggesting(),
	        items = this.process(nextProps.data, nextProps.value, (rawIdx === -1 || isSuggesting) && _utilDataHelpers.dataText(valueItem, textField)),
	        idx = _utilDataHelpers.dataIndexOf(items, value, valueField),
	        focused = this.filterIndexOf(items, _utilDataHelpers.dataText(valueItem, textField));

	    this._searchTerm = '';

	    this.setState({
	      processedData: items,
	      selectedItem: items[idx],
	      focusedItem: items[idx === -1 ? focused !== -1 ? focused : 0 // focus the closest match
	      : idx]
	    });
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props2 = this.props;
	    var className = _props2.className;
	    var tabIndex = _props2.tabIndex;
	    var filter = _props2.filter;
	    var suggest = _props2.suggest;
	    var valueField = _props2.valueField;
	    var textField = _props2.textField;
	    var groupBy = _props2.groupBy;
	    var messages = _props2.messages;
	    var data = _props2.data;
	    var busy = _props2.busy;
	    var dropUp = _props2.dropUp;
	    var name = _props2.name;
	    var autoFocus = _props2.autoFocus;
	    var placeholder = _props2.placeholder;
	    var value = _props2.value;
	    var open = _props2.open;
	    var disabled = _props2.disabled;
	    var readOnly = _props2.readOnly;
	    var List = _props2.listComponent;

	    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var listProps = pick(this.props, Object.keys(List.propTypes));
	    var popupProps = pick(this.props, Object.keys(_Popup2['default'].propTypes));

	    var _state = this.state;
	    var focusedItem = _state.focusedItem;
	    var selectedItem = _state.selectedItem;
	    var focused = _state.focused;

	    var items = this._data(),
	        valueItem = _utilDataHelpers.dataItem(data, value, valueField),
	        // take value from the raw data
	    inputID = _utilWidgetHelpers.instanceId(this, '_input'),
	        listID = _utilWidgetHelpers.instanceId(this, '_listbox'),
	        completeType = suggest ? filter ? 'both' : 'inline' : filter ? 'list' : '';

	    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open;

	    messages = msgs(messages);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: 'element',
	        onKeyDown: this._keyDown,
	        onFocus: this._focus.bind(null, true),
	        onBlur: this._focus.bind(null, false),
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-combobox', 'rw-widget', (_cx = {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-rtl': this.isRtl()

	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
	      }),
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        {
	          tabIndex: '-1',
	          className: 'rw-select',
	          onClick: this.toggle,
	          disabled: !!(disabled || readOnly)
	        },
	        _react2['default'].createElement(
	          'i',
	          { className: _classnames2['default']('rw-i rw-i-caret-down', { 'rw-loading': busy }) },
	          _react2['default'].createElement(
	            'span',
	            { className: 'rw-sr' },
	            _util_2['default'].result(messages.open, this.props)
	          )
	        )
	      ),
	      _react2['default'].createElement(_ComboboxInput2['default'], {
	        ref: 'input',
	        id: inputID,
	        autoFocus: autoFocus,
	        tabIndex: tabIndex,
	        suggest: suggest,
	        name: name,
	        role: 'combobox',
	        'aria-owns': listID,
	        'aria-busy': !!busy,
	        'aria-autocomplete': completeType,
	        'aria-expanded': open,
	        'aria-haspopup': true,
	        placeholder: placeholder,
	        disabled: disabled,
	        readOnly: readOnly,
	        className: 'rw-input',
	        value: _utilDataHelpers.dataText(valueItem, textField),
	        onChange: this._inputTyping,
	        onKeyDown: this._inputKeyDown
	      }),
	      _react2['default'].createElement(
	        _Popup2['default'],
	        babelHelpers._extends({}, popupProps, {
	          onOpening: function () {
	            return _this.refs.list.forceUpdate();
	          },
	          onRequestClose: this.close
	        }),
	        _react2['default'].createElement(
	          'div',
	          null,
	          shouldRenderList && _react2['default'].createElement(List, babelHelpers._extends({ ref: 'list'
	          }, listProps, {
	            id: listID,
	            data: items,
	            selected: selectedItem,
	            focused: focusedItem,
	            'aria-hidden': !open,
	            'aria-labelledby': inputID,
	            'aria-live': open && 'polite',
	            onSelect: this._onSelect,
	            onMove: this._scrollTo,
	            messages: {
	              emptyList: data.length ? messages.emptyFilter : messages.emptyList
	            } }))
	        )
	      )
	    );
	  }
	}, {
	  key: '_onSelect',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onSelect(data) {
	    this.close();
	    _utilWidgetHelpers.notify(this.props.onSelect, data);
	    this.change(data);
	    this.focus();
	  }
	}, {
	  key: '_inputKeyDown',
	  value: function _inputKeyDown(e) {
	    this._deleting = e.key === 'Backspace' || e.key === 'Delete';
	    this._isTyping = true;
	  }
	}, {
	  key: '_inputTyping',
	  value: function _inputTyping(e) {
	    var _props3 = this.props;
	    var data = _props3.data;
	    var textField = _props3.textField;

	    var shouldSuggest = !!this.props.suggest,
	        strVal = e.target.value,
	        suggestion;

	    suggestion = this._deleting || !shouldSuggest ? strVal : this.suggest(this._data(), strVal);

	    suggestion = suggestion || strVal;

	    data = _util_2['default'].find(data, function (item) {
	      return _utilDataHelpers.dataText(item, textField).toLowerCase() === suggestion.toLowerCase();
	    });

	    this.change(!this._deleting && data ? data : strVal, true);

	    this.open();
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    this.refs.input.focus();
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this2 = this;

	    !focused && this.refs.input.accept(); //not suggesting anymore

	    this.setTimeout('focus', function () {

	      if (!focused) _this2.close();

	      if (focused !== _this2.state.focused) {
	        _utilWidgetHelpers.notify(_this2.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this2.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var self = this,
	        key = e.key,
	        alt = e.altKey,
	        list = this.refs.list,
	        focusedItem = this.state.focusedItem,
	        selectedItem = this.state.selectedItem,
	        isOpen = this.props.open;

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End') if (isOpen) this.setState({ focusedItem: list.last() });else select(list.last(), true);else if (key === 'Home') if (isOpen) this.setState({ focusedItem: list.first() });else select(list.first(), true);else if (key === 'Escape' && isOpen) this.close();else if (key === 'Enter' && isOpen) {
	      select(this.state.focusedItem, true);
	    } else if (key === 'ArrowDown') {
	      if (alt) this.open();else {
	        if (isOpen) this.setState({ focusedItem: list.next(focusedItem) });else select(list.next(selectedItem), true);
	      }
	    } else if (key === 'ArrowUp') {
	      if (alt) this.close();else {
	        if (isOpen) this.setState({ focusedItem: list.prev(focusedItem) });else select(list.prev(selectedItem), true);
	      }
	    }

	    function select(item, fromList) {
	      if (!item) return self.change(_utilCompat2['default'].findDOMNode(self.refs.input).value, false);

	      self.refs.input.accept(true); //removes caret

	      if (fromList) return self._onSelect(item);

	      self.change(item, false);
	    }
	  }
	}, {
	  key: 'change',
	  value: function change(data, typing) {
	    this._typedChange = !!typing;
	    _utilWidgetHelpers.notify(this.props.onChange, data);
	  }
	}, {
	  key: 'open',
	  value: function open() {
	    if (!this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, true);
	  }
	}, {
	  key: 'close',
	  value: function close() {
	    if (this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'toggle',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function toggle() {
	    this.focus();

	    this.props.open ? this.close() : this.open();
	  }
	}, {
	  key: 'suggest',
	  value: function suggest(data, value) {
	    var _props4 = this.props;
	    var textField = _props4.textField;
	    var suggest = _props4.suggest;
	    var minLength = _props4.minLength;

	    var word = _utilDataHelpers.dataText(value, textField),
	        suggestion;

	    suggest = defaultSuggest(suggest);

	    if (!(word || '').trim() || word.length < (minLength || 1)) return '';

	    suggestion = typeof value === 'string' ? _util_2['default'].find(data, getFilter(suggest, word, textField)) : value;

	    if (suggestion && (!this.state || !this.state.deleting)) return _utilDataHelpers.dataText(suggestion, textField);

	    return '';
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.state.processedData;
	  }
	}, {
	  key: 'process',
	  value: function process(data, values, searchTerm) {
	    if (this.props.filter && searchTerm) data = this.filter(data, searchTerm);

	    return data;
	  }
	}]));

	exports['default'] = _uncontrollable2['default'](ComboBox, { open: 'onToggle', value: 'onChange' });

	function msgs(msgs) {
	  return babelHelpers._extends({
	    open: 'open combobox',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results'
	  }, msgs);
	}

	function getFilter(suggest, word, textField) {
	  return typeof suggest === 'string' ? function (item) {
	    return _utilFilter2['default'][suggest](_utilDataHelpers.dataText(item, textField).toLowerCase(), word.toLowerCase());
	  } : function (item) {
	    return suggest(item, word);
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	exports['default'] = _react2['default'].createClass({
	  displayName: 'WidgetButton',

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var children = _props.children;
	    var props = babelHelpers.objectWithoutProperties(_props, ['className', 'children']);

	    return _react2['default'].createElement(
	      'button',
	      babelHelpers._extends({}, props, { type: 'button', className: _classnames2['default'](className, 'rw-btn') }),
	      children
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilCaret = __webpack_require__(60);

	var _utilCaret2 = babelHelpers.interopRequireDefault(_utilCaret);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	exports['default'] = _react2['default'].createClass({

	  displayName: 'ComboboxInput',

	  propTypes: {
	    value: _react2['default'].PropTypes.string,
	    onChange: _react2['default'].PropTypes.func.isRequired
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var input = _utilCompat2['default'].findDOMNode(this),
	        val = this.props.value;

	    if (this.isSuggesting()) {
	      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length,
	          end = val.length - start;

	      if (start >= 0) {
	        _utilCaret2['default'](input, start, start + end);
	      }
	    }
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      value: ''
	    };
	  },

	  render: function render() {
	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      type: 'text',
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      className: this.props.className + ' rw-input',
	      onKeyDown: this.props.onKeyDown,
	      onChange: this._change,
	      value: this.props.value == null ? '' : this.props.value
	    }));
	  },

	  isSuggesting: function isSuggesting() {
	    var val = this.props.value,
	        isSuggestion = this._last != null && val.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;

	    return this.props.suggest && isSuggestion;
	  },

	  accept: function accept(removeCaret) {
	    var val = _utilCompat2['default'].findDOMNode(this).value || '',
	        end = val.length;

	    this._last = null;
	    removeCaret && _utilCaret2['default'](_utilCompat2['default'].findDOMNode(this), end, end);
	  },

	  _change: function _change(e) {
	    var val = e.target.value,
	        pl = !!this.props.placeholder;

	    // IE fires input events when setting/unsetting placeholders.
	    // issue #112
	    if (pl && !val && val === (this.props.value || '')) return;

	    this._last = val;
	    this.props.onChange(e, val);
	  },

	  focus: function focus() {
	    _utilCompat2['default'].findDOMNode(this).focus();
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 60 */
/***/ function(module, exports) {

	/*eslint-disable no-empty */
	'use strict';

	exports.__esModule = true;
	exports['default'] = caret;

	function caret(el, start, end) {
	  if (start === undefined) return get(el);

	  set(el, start, end);
	}

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
	module.exports = exports['default'];

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _VIEW, _OPPOSITE_DIRECTION, _MULTIPLIER;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _Header = __webpack_require__(62);

	var _Header2 = babelHelpers.interopRequireDefault(_Header);

	var _Footer = __webpack_require__(64);

	var _Footer2 = babelHelpers.interopRequireDefault(_Footer);

	var _Month = __webpack_require__(65);

	var _Month2 = babelHelpers.interopRequireDefault(_Month);

	var _Year = __webpack_require__(69);

	var _Year2 = babelHelpers.interopRequireDefault(_Year);

	var _Decade = __webpack_require__(70);

	var _Decade2 = babelHelpers.interopRequireDefault(_Decade);

	var _Century = __webpack_require__(71);

	var _Century2 = babelHelpers.interopRequireDefault(_Century);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _uncontrollable = __webpack_require__(44);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _SlideTransition = __webpack_require__(72);

	var _SlideTransition2 = babelHelpers.interopRequireDefault(_SlideTransition);

	var _utilDates = __webpack_require__(66);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilConstants = __webpack_require__(68);

	var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	//values, omit

	var _utilWidgetHelpers = __webpack_require__(38);

	var _utilInteraction = __webpack_require__(47);

	var dir = _utilConstants2['default'].directions,
	    values = function values(obj) {
	  return Object.keys(obj).map(function (k) {
	    return obj[k];
	  });
	},
	    invert = function invert(obj) {
	  return _util_2['default'].transform(obj, function (o, val, key) {
	    o[val] = key;
	  }, {});
	};

	var views = _utilConstants2['default'].calendarViews,
	    VIEW_OPTIONS = values(views),
	    ALT_VIEW = invert(_utilConstants2['default'].calendarViewHierarchy),
	    NEXT_VIEW = _utilConstants2['default'].calendarViewHierarchy,
	    VIEW_UNIT = _utilConstants2['default'].calendarViewUnits,
	    VIEW = (_VIEW = {}, _VIEW[views.MONTH] = _Month2['default'], _VIEW[views.YEAR] = _Year2['default'], _VIEW[views.DECADE] = _Decade2['default'], _VIEW[views.CENTURY] = _Century2['default'], _VIEW);

	var ARROWS_TO_DIRECTION = {
	  ArrowDown: dir.DOWN,
	  ArrowUp: dir.UP,
	  ArrowRight: dir.RIGHT,
	  ArrowLeft: dir.LEFT
	};

	var OPPOSITE_DIRECTION = (_OPPOSITE_DIRECTION = {}, _OPPOSITE_DIRECTION[dir.LEFT] = dir.RIGHT, _OPPOSITE_DIRECTION[dir.RIGHT] = dir.LEFT, _OPPOSITE_DIRECTION);

	var MULTIPLIER = (_MULTIPLIER = {}, _MULTIPLIER[views.YEAR] = 1, _MULTIPLIER[views.DECADE] = 10, _MULTIPLIER[views.CENTURY] = 100, _MULTIPLIER);

	var format = function format(props, f) {
	  return _utilLocalizers.date.getFormat(f, props[f + 'Format']);
	};

	var propTypes = {

	  disabled: _utilPropTypes2['default'].disabled,
	  readOnly: _utilPropTypes2['default'].readOnly,

	  onChange: _react2['default'].PropTypes.func,
	  value: _react2['default'].PropTypes.instanceOf(Date),

	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),

	  initialView: _react2['default'].PropTypes.oneOf(VIEW_OPTIONS),

	  finalView: function finalView(props, propname, componentName) {
	    var err = _react2['default'].PropTypes.oneOf(VIEW_OPTIONS)(props, propname, componentName);

	    if (err) return err;
	    if (VIEW_OPTIONS.indexOf(props[propname]) < VIEW_OPTIONS.indexOf(props.initialView)) return new Error(('The `' + propname + '` prop: `' + props[propname] + '` cannot be \'lower\' than the `initialView`\n        prop. This creates a range that cannot be rendered.').replace(/\n\t/g, ''));
	  },

	  culture: _react2['default'].PropTypes.string,

	  footer: _react2['default'].PropTypes.bool,

	  dayComponent: _utilPropTypes2['default'].elementType,
	  headerFormat: _utilPropTypes2['default'].dateFormat,
	  footerFormat: _utilPropTypes2['default'].dateFormat,

	  dayFormat: _utilPropTypes2['default'].dateFormat,
	  dateFormat: _utilPropTypes2['default'].dateFormat,
	  monthFormat: _utilPropTypes2['default'].dateFormat,
	  yearFormat: _utilPropTypes2['default'].dateFormat,
	  decadeFormat: _utilPropTypes2['default'].dateFormat,
	  centuryFormat: _utilPropTypes2['default'].dateFormat,

	  messages: _react2['default'].PropTypes.shape({
	    moveBack: _react2['default'].PropTypes.string,
	    moveForward: _react2['default'].PropTypes.string
	  })
	};

	var Calendar = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'Calendar';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(49), __webpack_require__(56), __webpack_require__(40)()];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var value = this.inRangeValue(this.props.value);

	    return {
	      selectedIndex: 0,
	      view: this.props.initialView || 'month',
	      currentDate: value ? new Date(value) : this.inRangeValue(new Date())
	    };
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {

	      value: null,
	      min: new Date(1900, 0, 1),
	      max: new Date(2099, 11, 31),

	      initialView: 'month',
	      finalView: 'century',

	      tabIndex: '0',
	      footer: false,

	      ariaActiveDescendantKey: 'calendar',
	      messages: msgs({})
	    };
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    var bottom = VIEW_OPTIONS.indexOf(nextProps.initialView),
	        top = VIEW_OPTIONS.indexOf(nextProps.finalView),
	        current = VIEW_OPTIONS.indexOf(this.state.view),
	        view = this.state.view,
	        val = this.inRangeValue(nextProps.value);

	    if (current < bottom) this.setState({ view: view = nextProps.initialView });else if (current > top) this.setState({ view: view = nextProps.finalView });

	    //if the value changes reset views to the new one
	    if (!_utilDates2['default'].eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) this.setState({
	      currentDate: val ? new Date(val) : new Date()
	    });
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _this = this;

	    var _props = this.props;
	    var className = _props.className;
	    var value = _props.value;
	    var footerFormat = _props.footerFormat;
	    var disabled = _props.disabled;
	    var readOnly = _props.readOnly;
	    var finalView = _props.finalView;
	    var footer = _props.footer;
	    var messages = _props.messages;
	    var min = _props.min;
	    var max = _props.max;
	    var culture = _props.culture;
	    var duration = _props.duration;
	    var _state = this.state;
	    var view = _state.view;
	    var currentDate = _state.currentDate;
	    var slideDirection = _state.slideDirection;
	    var focused = _state.focused;

	    var View = VIEW[view],
	        unit = VIEW_UNIT[view],
	        todaysDate = new Date(),
	        todayNotInRange = !_utilDates2['default'].inRange(todaysDate, min, max, view);

	    unit = unit === 'day' ? 'date' : unit;

	    var viewID = _utilWidgetHelpers.instanceId(this, '_calendar'),
	        labelID = _utilWidgetHelpers.instanceId(this, '_calendar_label'),
	        key = view + '_' + _utilDates2['default'][view](currentDate);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes)),
	        viewProps = _util_2['default'].pick(this.props, Object.keys(View.propTypes));

	    var isDisabled = disabled || readOnly;

	    messages = msgs(this.props.messages);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        role: 'group',
	        onKeyDown: this._keyDown,
	        onFocus: this._focus.bind(null, true),
	        onBlur: this._focus.bind(null, false),
	        className: _classnames2['default'](className, 'rw-calendar', 'rw-widget', {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-rtl': this.isRtl()
	        })
	      }),
	      _react2['default'].createElement(_Header2['default'], {
	        label: this._label(),
	        labelId: labelID,
	        messages: messages,
	        upDisabled: isDisabled || view === finalView,
	        prevDisabled: isDisabled || !_utilDates2['default'].inRange(this.nextDate(dir.LEFT), min, max, view),
	        nextDisabled: isDisabled || !_utilDates2['default'].inRange(this.nextDate(dir.RIGHT), min, max, view),
	        onViewChange: this.navigate.bind(null, dir.UP, null),
	        onMoveLeft: this.navigate.bind(null, dir.LEFT, null),
	        onMoveRight: this.navigate.bind(null, dir.RIGHT, null)
	      }),
	      _react2['default'].createElement(
	        _SlideTransition2['default'],
	        {
	          ref: 'animation',
	          duration: duration,
	          direction: slideDirection,
	          onAnimate: function () {
	            return focused && _this.focus();
	          }
	        },
	        _react2['default'].createElement(View, babelHelpers._extends({}, viewProps, {
	          tabIndex: '-1',
	          key: key,
	          id: viewID,
	          className: 'rw-calendar-grid',
	          'aria-labelledby': labelID,
	          today: todaysDate,
	          value: value,
	          focused: currentDate,
	          onChange: this.change,
	          onKeyDown: this._keyDown,
	          ariaActiveDescendantKey: 'calendarView'
	        }))
	      ),
	      footer && _react2['default'].createElement(_Footer2['default'], {
	        value: todaysDate,
	        format: footerFormat,
	        culture: culture,
	        disabled: disabled || todayNotInRange,
	        readOnly: readOnly,
	        onClick: this.select
	      })
	    );
	  }
	}, {
	  key: 'navigate',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function navigate(direction, date) {
	    var view = this.state.view,
	        slideDir = direction === dir.LEFT || direction === dir.UP ? 'right' : 'left';

	    if (!date) date = [dir.LEFT, dir.RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.state.currentDate;

	    if (direction === dir.DOWN) view = ALT_VIEW[view] || view;

	    if (direction === dir.UP) view = NEXT_VIEW[view] || view;

	    if (this.isValidView(view) && _utilDates2['default'].inRange(date, this.props.min, this.props.max, view)) {
	      _utilWidgetHelpers.notify(this.props.onNavigate, [date, slideDir, view]);
	      this.focus(true);

	      this.setState({
	        currentDate: date,
	        slideDirection: slideDir,
	        view: view
	      });
	    }
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    if (+this.props.tabIndex > -1) _utilCompat2['default'].findDOMNode(this).focus();

	    //console.log(document.activeElement)
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this2 = this;

	    if (+this.props.tabIndex === -1) return;

	    this.setTimeout('focus', function () {
	      if (focused !== _this2.state.focused) {
	        _utilWidgetHelpers.notify(_this2.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this2.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: 'change',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function change(date) {
	    if (this.state.view === this.props.initialView) {
	      _utilWidgetHelpers.notify(this.props.onChange, date);
	      this.focus();
	      return;
	    }

	    this.navigate(dir.DOWN, date);
	  }
	}, {
	  key: 'select',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function select(date) {
	    var view = this.props.initialView,
	        slideDir = view !== this.state.view || _utilDates2['default'].gt(date, this.state.currentDate) ? 'left' // move down to a the view
	    : 'right';

	    _utilWidgetHelpers.notify(this.props.onChange, date);

	    if (this.isValidView(view) && _utilDates2['default'].inRange(date, this.props.min, this.props.max, view)) {
	      this.focus();

	      this.setState({
	        currentDate: date,
	        slideDirection: slideDir,
	        view: view
	      });
	    }
	  }
	}, {
	  key: 'nextDate',
	  value: function nextDate(direction) {
	    var method = direction === dir.LEFT ? 'subtract' : 'add',
	        view = this.state.view,
	        unit = view === views.MONTH ? view : views.YEAR,
	        multi = MULTIPLIER[view] || 1;

	    return _utilDates2['default'][method](this.state.currentDate, 1 * multi, unit);
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var ctrl = e.ctrlKey,
	        key = e.key,
	        direction = ARROWS_TO_DIRECTION[key],
	        current = this.state.currentDate,
	        view = this.state.view,
	        unit = VIEW_UNIT[view],
	        currentDate = current;

	    if (key === 'Enter') {
	      e.preventDefault();
	      return this.change(current);
	    }

	    if (direction) {
	      if (ctrl) {
	        e.preventDefault();
	        this.navigate(direction);
	      } else {
	        if (this.isRtl() && OPPOSITE_DIRECTION[direction]) direction = OPPOSITE_DIRECTION[direction];

	        currentDate = _utilDates2['default'].move(currentDate, this.props.min, this.props.max, view, direction);

	        if (!_utilDates2['default'].eq(current, currentDate, unit)) {
	          e.preventDefault();

	          if (_utilDates2['default'].gt(currentDate, current, view)) this.navigate(dir.RIGHT, currentDate);else if (_utilDates2['default'].lt(currentDate, current, view)) this.navigate(dir.LEFT, currentDate);else this.setState({ currentDate: currentDate });
	        }
	      }
	    }

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);
	  }
	}, {
	  key: '_label',
	  value: function _label() {
	    var _props2 = this.props;
	    var culture = _props2.culture;
	    var props = babelHelpers.objectWithoutProperties(_props2, ['culture']);
	    var view = this.state.view;
	    var dt = this.state.currentDate;

	    if (view === 'month') return _utilLocalizers.date.format(dt, format(props, 'header'), culture);else if (view === 'year') return _utilLocalizers.date.format(dt, format(props, 'year'), culture);else if (view === 'decade') return _utilLocalizers.date.format(_utilDates2['default'].startOf(dt, 'decade'), format(props, 'decade'), culture);else if (view === 'century') return _utilLocalizers.date.format(_utilDates2['default'].startOf(dt, 'century'), format(props, 'century'), culture);
	  }
	}, {
	  key: 'inRangeValue',
	  value: function inRangeValue(_value) {
	    var value = dateOrNull(_value);

	    if (value === null) return value;

	    return _utilDates2['default'].max(_utilDates2['default'].min(value, this.props.max), this.props.min);
	  }
	}, {
	  key: 'isValidView',
	  value: function isValidView(next) {
	    var bottom = VIEW_OPTIONS.indexOf(this.props.initialView),
	        top = VIEW_OPTIONS.indexOf(this.props.finalView),
	        current = VIEW_OPTIONS.indexOf(next);

	    return current >= bottom && current <= top;
	  }
	}]));

	function dateOrNull(dt) {
	  if (dt && !isNaN(dt.getTime())) return dt;
	  return null;
	}

	function msgs(msgs) {
	  return babelHelpers._extends({
	    moveBack: 'navigate back',
	    moveForward: 'navigate forward'
	  }, msgs);
	}

	exports['default'] = _uncontrollable2['default'](Calendar, { value: 'onChange' });
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _WidgetButton = __webpack_require__(58);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	exports['default'] = _react2['default'].createClass({
	  displayName: 'Header',
	  propTypes: {
	    label: _react2['default'].PropTypes.string.isRequired,
	    labelId: _react2['default'].PropTypes.string,

	    upDisabled: _react2['default'].PropTypes.bool.isRequired,
	    prevDisabled: _react2['default'].PropTypes.bool.isRequired,
	    nextDisabled: _react2['default'].PropTypes.bool.isRequired,
	    onViewChange: _react2['default'].PropTypes.func.isRequired,
	    onMoveLeft: _react2['default'].PropTypes.func.isRequired,
	    onMoveRight: _react2['default'].PropTypes.func.isRequired,

	    messages: _react2['default'].PropTypes.shape({
	      moveBack: _react2['default'].PropTypes.string,
	      moveForward: _react2['default'].PropTypes.string
	    })
	  },

	  mixins: [__webpack_require__(49), __webpack_require__(63)],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      messages: {
	        moveBack: 'navigate back',
	        moveForward: 'navigate forward'
	      }
	    };
	  },

	  render: function render() {
	    var _props = this.props;
	    var messages = _props.messages;
	    var label = _props.label;
	    var labelId = _props.labelId;
	    var onMoveRight = _props.onMoveRight;
	    var onMoveLeft = _props.onMoveLeft;
	    var onViewChange = _props.onViewChange;
	    var prevDisabled = _props.prevDisabled;
	    var upDisabled = _props.upDisabled;
	    var nextDisabled = _props.nextDisabled;

	    var rtl = this.isRtl();

	    return _react2['default'].createElement(
	      'div',
	      { className: 'rw-header' },
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        { className: 'rw-btn-left',
	          tabIndex: '-1',
	          onClick: onMoveLeft,
	          disabled: prevDisabled,
	          'aria-disabled': prevDisabled,
	          'aria-label': messages.moveBack,
	          title: messages.moveBack
	        },
	        _react2['default'].createElement('i', { 'aria-hidden': 'false',
	          className: 'rw-i rw-i-caret-' + (rtl ? 'right' : 'left')
	        })
	      ),
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        {
	          id: labelId,
	          tabIndex: '-1',
	          className: 'rw-btn-view',
	          disabled: upDisabled,
	          'aria-disabled': upDisabled,
	          'aria-live': 'polite',
	          'aria-atomic': 'true',
	          onClick: onViewChange
	        },
	        label
	      ),
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        { className: 'rw-btn-right',
	          tabIndex: '-1',
	          onClick: onMoveRight,
	          disabled: nextDisabled,
	          title: messages.moveForward,
	          'aria-label': messages.moveForward,
	          'aria-disabled': nextDisabled
	        },
	        _react2['default'].createElement('i', { 'aria-hidden': 'false',
	          className: 'rw-i rw-i-caret-' + (rtl ? 'left' : 'right')
	        })
	      )
	    );
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	exports['default'] = {

	  contextTypes: {
	    isRtl: _react2['default'].PropTypes.bool
	  },

	  isRtl: function isRtl() {
	    return !!this.context.isRtl;
	  }

	};
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _WidgetButton = __webpack_require__(58);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _utilLocalizers = __webpack_require__(18);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('footer', props.format);
	};

	module.exports = _react2['default'].createClass({

	  displayName: 'Footer',

	  render: function render() {
	    var now = this.props.value,
	        formatted = _utilLocalizers.date.format(now, format(this.props), this.props.culture);

	    return _react2['default'].createElement(
	      'div',
	      { className: 'rw-footer' },
	      _react2['default'].createElement(
	        _WidgetButton2['default'],
	        { tabIndex: '-1',
	          'aria-disabled': !!this.props.disabled,
	          'aria-readonly': !!this.props.readOnly,
	          disabled: this.props.disabled,
	          readOnly: this.props.readOnly,
	          onClick: this.props.onClick.bind(null, now)
	        },
	        formatted
	      )
	    );
	  }

	});

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilDates = __webpack_require__(66);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilWidgetHelpers = __webpack_require__(38);

	var dayFormat = function dayFormat(props) {
	  return _utilLocalizers.date.getFormat('weekday', props.dayFormat);
	},
	    dateFormat = function dateFormat(props) {
	  return _utilLocalizers.date.getFormat('dayOfMonth', props.dateFormat);
	};

	var optionId = function optionId(id, date) {
	  return id + '__month_' + _utilDates2['default'].month(date) + '-' + _utilDates2['default'].date(date);
	};

	var propTypes = {
	  optionID: _react2['default'].PropTypes.func,

	  culture: _react2['default'].PropTypes.string,
	  value: _react2['default'].PropTypes.instanceOf(Date),
	  focused: _react2['default'].PropTypes.instanceOf(Date),
	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),

	  dayComponent: _utilPropTypes2['default'].elementType,

	  dayFormat: _utilPropTypes2['default'].dateFormat,
	  dateFormat: _utilPropTypes2['default'].dateFormat,
	  footerFormat: _utilPropTypes2['default'].dateFormat,

	  onChange: _react2['default'].PropTypes.func.isRequired
	};

	var isEqual = function isEqual(dateA, dateB) {
	  return _utilDates2['default'].eq(dateA, dateB, 'day');
	};

	var MonthView = _react2['default'].createClass({

	  displayName: 'MonthView',

	  statics: {
	    isEqual: isEqual
	  },

	  mixins: [__webpack_require__(63), __webpack_require__(40)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId, null);
	  },

	  render: function render() {
	    var _props = this.props;
	    var focused = _props.focused;
	    var culture = _props.culture;
	    var month = _utilDates2['default'].visibleDays(focused, culture);
	    var rows = _util_2['default'].chunk(month, 7);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid'
	      }),
	      _react2['default'].createElement(
	        'thead',
	        null,
	        _react2['default'].createElement(
	          'tr',
	          null,
	          this._headers(rows[0], dayFormat(this.props), culture)
	        )
	      ),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var today = _props2.today;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var Day = _props2.dayComponent;
	    var id = _utilWidgetHelpers.instanceId(this);
	    var labelFormat = _utilLocalizers.date.getFormat('footer');

	    return _react2['default'].createElement(
	      'tr',
	      { key: 'week_' + rowIdx, role: 'row' },
	      row.map(function (day, colIdx) {

	        var isFocused = isEqual(day, focused),
	            isSelected = isEqual(day, value),
	            isToday = isEqual(day, today),
	            date = _utilLocalizers.date.format(day, dateFormat(_this.props), culture),
	            label = _utilLocalizers.date.format(day, labelFormat, culture);

	        var currentID = optionId(id, day);

	        return !_utilDates2['default'].inRange(day, min, max) ? _react2['default'].createElement(
	          'td',
	          { key: 'day_' + colIdx, role: 'presentation', className: 'rw-empty-cell' },
	          ' '
	        ) : _react2['default'].createElement(
	          'td',
	          {
	            key: 'day_' + colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-label': label,
	            'aria-readonly': disabled
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, day),
	              className: _classnames2['default']('rw-btn', {
	                'rw-off-range': _utilDates2['default'].month(day) !== _utilDates2['default'].month(focused),
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': isToday
	              })
	            },
	            Day ? _react2['default'].createElement(Day, { date: day, label: date }) : date
	          )
	        );
	      })
	    );
	  },

	  _headers: function _headers(week, format, culture) {
	    return week.map(function (date) {
	      return _react2['default'].createElement(
	        'th',
	        { key: 'header_' + _utilDates2['default'].weekday(date, undefined, _utilLocalizers.date.startOfWeek(culture)) },
	        _utilLocalizers.date.format(date, format, culture)
	      );
	    });
	  }

	});

	exports['default'] = MonthView;
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _dateArithmetic = __webpack_require__(67);

	var _dateArithmetic2 = babelHelpers.interopRequireDefault(_dateArithmetic);

	var _constants = __webpack_require__(68);

	var _constants2 = babelHelpers.interopRequireDefault(_constants);

	var _localizers = __webpack_require__(18);

	var directions = _constants2['default'].directions;
	var calendarViewUnits = _constants2['default'].calendarViewUnits;

	var dates = babelHelpers._extends(_dateArithmetic2['default'], {

	  parse: function parse(date, format, culture) {
	    return _localizers.date.parse(date, format, culture);
	  },

	  format: function format(date, _format, culture) {
	    return _localizers.date.format(date, _format, culture);
	  },

	  monthsInYear: function monthsInYear(year) {
	    var months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
	        date = new Date(year, 0, 1);

	    return months.map(function (i) {
	      return dates.month(date, i);
	    });
	  },

	  firstVisibleDay: function firstVisibleDay(date, culture) {
	    var firstOfMonth = dates.startOf(date, 'month');
	    return dates.startOf(firstOfMonth, 'week', _localizers.date.startOfWeek(culture));
	  },

	  lastVisibleDay: function lastVisibleDay(date, culture) {
	    var endOfMonth = dates.endOf(date, 'month');

	    return dates.endOf(endOfMonth, 'week', _localizers.date.startOfWeek(culture));
	  },

	  visibleDays: function visibleDays(date, culture) {
	    var current = dates.firstVisibleDay(date, culture),
	        last = dates.lastVisibleDay(date, culture),
	        days = [];

	    while (dates.lte(current, last, 'day')) {
	      days.push(current);
	      current = dates.add(current, 1, 'day');
	    }

	    return days;
	  },

	  move: function move(date, min, max, unit, direction) {
	    var isMonth = unit === 'month',
	        isUpOrDown = direction === directions.UP || direction === directions.DOWN,
	        rangeUnit = calendarViewUnits[unit],
	        addUnit = isMonth && isUpOrDown ? 'week' : calendarViewUnits[unit],
	        amount = isMonth || !isUpOrDown ? 1 : 4,
	        newDate;

	    if (direction === directions.UP || direction === directions.LEFT) amount *= -1;

	    newDate = dates.add(date, amount, addUnit);

	    return dates.inRange(newDate, min, max, rangeUnit) ? newDate : date;
	  },

	  merge: function merge(date, time) {
	    if (time == null && date == null) return null;

	    if (time == null) time = new Date();
	    if (date == null) date = new Date();

	    date = dates.startOf(date, 'day');
	    date = dates.hours(date, dates.hours(time));
	    date = dates.minutes(date, dates.minutes(time));
	    date = dates.seconds(date, dates.seconds(time));
	    return dates.milliseconds(date, dates.milliseconds(time));
	  },

	  sameMonth: function sameMonth(dateA, dateB) {
	    return dates.eq(dateA, dateB, 'month');
	  },

	  today: function today() {
	    return this.startOf(new Date(), 'day');
	  },

	  yesterday: function yesterday() {
	    return this.add(this.startOf(new Date(), 'day'), -1, 'day');
	  },

	  tomorrow: function tomorrow() {
	    return this.add(this.startOf(new Date(), 'day'), 1, 'day');
	  }
	});

	exports['default'] = dates;
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports) {

	var MILI    = 'milliseconds'
	  , SECONDS = 'seconds'
	  , MINUTES = 'minutes'
	  , HOURS   = 'hours'
	  , DAY     = 'day'
	  , WEEK    = 'week'
	  , MONTH   = 'month'
	  , YEAR    = 'year'
	  , DECADE  = 'decade'
	  , CENTURY = 'century';

	var dates = module.exports = {

	  add: function(date, num, unit) {
	    date = new Date(date)

	    switch (unit){
	      case MILI:
	      case SECONDS:
	      case MINUTES:
	      case HOURS:
	      case YEAR:
	        return dates[unit](date, dates[unit](date) + num)
	      case DAY:
	        return dates.date(date, dates.date(date) + num)
	      case WEEK:
	        return dates.date(date, dates.date(date) + (7 * num))
	      case MONTH:
	        return monthMath(date, num)
	      case DECADE:
	        return dates.year(date, dates.year(date) + (num * 10))
	      case CENTURY:
	        return dates.year(date, dates.year(date) + (num * 100))
	    }

	    throw new TypeError('Invalid units: "' + unit + '"')
	  },

	  subtract: function(date, num, unit) {
	    return dates.add(date, -num, unit)
	  },

	  startOf: function(date, unit, firstOfWeek) {
	    date = new Date(date)

	    switch (unit) {
	      case 'century':
	      case 'decade':
	      case 'year':
	          date = dates.month(date, 0);
	      case 'month':
	          date = dates.date(date, 1);
	      case 'week':
	      case 'day':
	          date = dates.hours(date, 0);
	      case 'hours':
	          date = dates.minutes(date, 0);
	      case 'minutes':
	          date = dates.seconds(date, 0);
	      case 'seconds':
	          date = dates.milliseconds(date, 0);
	    }

	    if (unit === DECADE)
	      date = dates.subtract(date, dates.year(date) % 10, 'year')

	    if (unit === CENTURY)
	      date = dates.subtract(date, dates.year(date) % 100, 'year')

	    if (unit === WEEK)
	      date = dates.weekday(date, 0, firstOfWeek);

	    return date
	  },

	  endOf: function(date, unit, firstOfWeek){
	    date = new Date(date)
	    date = dates.startOf(date, unit, firstOfWeek)
	    date = dates.add(date, 1, unit)
	    date = dates.subtract(date, 1, MILI)
	    return date
	  },

	  eq:  createComparer(function(a, b){ return a === b }),
	  neq: createComparer(function(a, b){ return a !== b }),
	  gt:  createComparer(function(a, b){ return a > b }),
	  gte: createComparer(function(a, b){ return a >= b }),
	  lt:  createComparer(function(a, b){ return a < b }),
	  lte: createComparer(function(a, b){ return a <= b }),

	  min: function(){
	    return new Date(Math.min.apply(Math, arguments))
	  },

	  max: function(){
	    return new Date(Math.max.apply(Math, arguments))
	  },

	  inRange: function(day, min, max, unit){
	    unit = unit || 'day'

	    return (!min || dates.gte(day, min, unit))
	        && (!max || dates.lte(day, max, unit))
	  },

	  milliseconds:   createAccessor('Milliseconds'),
	  seconds:        createAccessor('Seconds'),
	  minutes:        createAccessor('Minutes'),
	  hours:          createAccessor('Hours'),
	  day:            createAccessor('Day'),
	  date:           createAccessor('Date'),
	  month:          createAccessor('Month'),
	  year:           createAccessor('FullYear'),

	  decade: function (date, val) {
	    return val === undefined
	      ? dates.year(dates.startOf(date, DECADE))
	      : dates.add(date, val + 10, YEAR);
	  },

	  century: function (date, val) {
	    return val === undefined
	      ? dates.year(dates.startOf(date, CENTURY))
	      : dates.add(date, val + 100, YEAR);
	  },

	  weekday: function (date, val, firstDay) {
	      var weekday = (dates.day(date) + 7 - (firstDay || 0) ) % 7;

	      return val === undefined
	        ? weekday
	        : dates.add(date, val - weekday, DAY);
	  }
	}


	function monthMath(date, val){
	  var current = dates.month(date)
	    , newMonth  = (current + val);

	    date = dates.month(date, newMonth)

	    if (newMonth < 0 ) newMonth = 12 + val

	    //month rollover
	    if ( dates.month(date) !== ( newMonth % 12))
	      date = dates.date(date, 0) //move to last of month

	    return date
	}

	function createAccessor(method){
	  return function(date, val){
	    if (val === undefined)
	      return date['get' + method]()

	    date = new Date(date)
	    date['set' + method](val)
	    return date
	  }
	}

	function createComparer(operator) {
	  return function (a, b, unit, maybeFoW) {
	    return operator(+dates.startOf(a, unit, maybeFoW), +dates.startOf(b, unit, maybeFoW))
	  };
	}


/***/ },
/* 68 */
/***/ function(module, exports) {

	'use strict';

	var _calendarViewHierarchy, _calendarViewUnits;

	var views = {
	  MONTH: 'month',
	  YEAR: 'year',
	  DECADE: 'decade',
	  CENTURY: 'century'
	};

	module.exports = {

	  directions: {
	    LEFT: 'LEFT',
	    RIGHT: 'RIGHT',
	    UP: 'UP',
	    DOWN: 'DOWN'
	  },

	  datePopups: {
	    TIME: 'time',
	    CALENDAR: 'calendar'
	  },

	  calendarViews: views,

	  calendarViewHierarchy: (_calendarViewHierarchy = {}, _calendarViewHierarchy[views.MONTH] = views.YEAR, _calendarViewHierarchy[views.YEAR] = views.DECADE, _calendarViewHierarchy[views.DECADE] = views.CENTURY, _calendarViewHierarchy),

	  calendarViewUnits: (_calendarViewUnits = {}, _calendarViewUnits[views.MONTH] = 'day', _calendarViewUnits[views.YEAR] = views.MONTH, _calendarViewUnits[views.DECADE] = views.YEAR, _calendarViewUnits[views.CENTURY] = views.DECADE, _calendarViewUnits)
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilDates = __webpack_require__(66);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(38);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('month', props.monthFormat);
	};

	var propTypes = {
	  optionID: _react2['default'].PropTypes.func,
	  culture: _react2['default'].PropTypes.string,
	  value: _react2['default'].PropTypes.instanceOf(Date),
	  focused: _react2['default'].PropTypes.instanceOf(Date),
	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),
	  onChange: _react2['default'].PropTypes.func.isRequired,

	  monthFormat: _utilPropTypes2['default'].dateFormat
	};

	var isEqual = function isEqual(dateA, dateB) {
	  return _utilDates2['default'].eq(dateA, dateB, 'month');
	};
	var optionId = function optionId(id, date) {
	  return id + '__year_' + _utilDates2['default'].year(date) + '-' + _utilDates2['default'].month(date);
	};

	var YearView = _react2['default'].createClass({

	  displayName: 'YearView',

	  mixins: [__webpack_require__(63), __webpack_require__(40)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var focused = _props.focused;
	    var months = _utilDates2['default'].monthsInYear(_utilDates2['default'].year(focused));
	    var rows = _util_2['default'].chunk(months, 4);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid',
	        className: _classnames2['default'](className, 'rw-nav-view')
	      }),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var today = _props2.today;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var id = _utilWidgetHelpers.instanceId(this);
	    var labelFormat = _utilLocalizers.date.getFormat('header');

	    return _react2['default'].createElement(
	      'tr',
	      { key: rowIdx, role: 'row' },
	      row.map(function (date, colIdx) {
	        var isFocused = isEqual(date, focused),
	            isSelected = isEqual(date, value),
	            currentMonth = isEqual(date, today),
	            label = _utilLocalizers.date.format(date, labelFormat, culture);

	        var currentID = optionId(id, date);

	        return _utilDates2['default'].inRange(date, min, max, 'month') ? _react2['default'].createElement(
	          'td',
	          {
	            key: colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-readonly': disabled,
	            'aria-label': label
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, date),
	              className: _classnames2['default']('rw-btn', {
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': currentMonth
	              })
	            },
	            _utilLocalizers.date.format(date, format(_this.props), culture)
	          )
	        ) : _react2['default'].createElement(
	          'td',
	          { key: colIdx, className: 'rw-empty-cell', role: 'presentation' },
	          ' '
	        );
	      })
	    );
	  }

	});

	exports['default'] = YearView;
	module.exports = exports['default'];

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilDates = __webpack_require__(66);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(38);

	var propTypes = {
	  optionID: _react2['default'].PropTypes.func,
	  culture: _react2['default'].PropTypes.string,

	  value: _react2['default'].PropTypes.instanceOf(Date),
	  focused: _react2['default'].PropTypes.instanceOf(Date),
	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),
	  onChange: _react2['default'].PropTypes.func.isRequired,

	  yearFormat: _utilPropTypes2['default'].dateFormat
	};

	var isEqual = function isEqual(dataA, dateB) {
	  return _utilDates2['default'].eq(dataA, dateB, 'year');
	};
	var optionId = function optionId(id, date) {
	  return id + '__decade_' + _utilDates2['default'].year(date);
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'DecadeView',

	  mixins: [__webpack_require__(49), __webpack_require__(63), __webpack_require__(40)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var focused = _props.focused;
	    var years = getDecadeYears(focused);
	    var rows = _util_2['default'].chunk(years, 4);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid',
	        className: _classnames2['default'](className, 'rw-nav-view')
	      }),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var today = _props2.today;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var id = _utilWidgetHelpers.instanceId(this);

	    return _react2['default'].createElement(
	      'tr',
	      { key: 'row_' + rowIdx, role: 'row' },
	      row.map(function (date, colIdx) {
	        var isFocused = isEqual(date, focused),
	            isSelected = isEqual(date, value),
	            currentYear = isEqual(date, today),
	            label = _utilLocalizers.date.format(date, _utilLocalizers.date.getFormat('year', _this.props.yearFormat), culture);

	        var currentID = optionId(id, date);

	        return !_utilDates2['default'].inRange(date, min, max, 'year') ? _react2['default'].createElement(
	          'td',
	          { key: colIdx, role: 'presentation', className: 'rw-empty-cell' },
	          ' '
	        ) : _react2['default'].createElement(
	          'td',
	          {
	            key: colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-label': label,
	            'aria-readonly': disabled
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, date),
	              className: _classnames2['default']('rw-btn', {
	                'rw-off-range': !inDecade(date, focused),
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': currentYear
	              })
	            },
	            label
	          )
	        );
	      })
	    );
	  }
	});

	function inDecade(date, start) {
	  return _utilDates2['default'].gte(date, _utilDates2['default'].startOf(start, 'decade'), 'year') && _utilDates2['default'].lte(date, _utilDates2['default'].endOf(start, 'decade'), 'year');
	}

	function getDecadeYears(_date) {
	  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	      date = _utilDates2['default'].add(_utilDates2['default'].startOf(_date, 'decade'), -2, 'year');

	  return days.map(function () {
	    return date = _utilDates2['default'].add(date, 1, 'year');
	  });
	}
	module.exports = exports['default'];

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilDates = __webpack_require__(66);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(38);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('decade', props.decadeFormat);
	};

	var isEqual = function isEqual(dateA, dateB) {
	  return _utilDates2['default'].eq(dateA, dateB, 'decade');
	};
	var optionId = function optionId(id, date) {
	  return id + '__century_' + _utilDates2['default'].year(date);
	};

	var propTypes = {
	  optionID: _react2['default'].PropTypes.func,
	  culture: _react2['default'].PropTypes.string,
	  value: _react2['default'].PropTypes.instanceOf(Date),
	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),

	  onChange: _react2['default'].PropTypes.func.isRequired,
	  decadeFormat: _utilPropTypes2['default'].dateFormat
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'CenturyView',

	  mixins: [__webpack_require__(49), __webpack_require__(63), __webpack_require__(40)()],

	  propTypes: propTypes,

	  componentDidUpdate: function componentDidUpdate() {
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), this.props.focused);
	    this.ariaActiveDescendant(activeId);
	  },

	  render: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var focused = _props.focused;
	    var years = getCenturyDecades(focused);
	    var rows = _util_2['default'].chunk(years, 4);

	    var elementProps = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    return _react2['default'].createElement(
	      'table',
	      babelHelpers._extends({}, elementProps, {
	        role: 'grid',
	        className: _classnames2['default'](className, 'rw-nav-view')
	      }),
	      _react2['default'].createElement(
	        'tbody',
	        null,
	        rows.map(this._row)
	      )
	    );
	  },

	  _row: function _row(row, rowIdx) {
	    var _this = this;

	    var _props2 = this.props;
	    var focused = _props2.focused;
	    var disabled = _props2.disabled;
	    var onChange = _props2.onChange;
	    var value = _props2.value;
	    var today = _props2.today;
	    var culture = _props2.culture;
	    var min = _props2.min;
	    var max = _props2.max;
	    var id = _utilWidgetHelpers.instanceId(this, '_century');

	    return _react2['default'].createElement(
	      'tr',
	      { key: 'row_' + rowIdx, role: 'row' },
	      row.map(function (date, colIdx) {
	        var isFocused = isEqual(date, focused),
	            isSelected = isEqual(date, value),
	            currentDecade = isEqual(date, today),
	            label = _utilLocalizers.date.format(_utilDates2['default'].startOf(date, 'decade'), format(_this.props), culture);

	        var currentID = optionId(id, date);

	        return !inRange(date, min, max) ? _react2['default'].createElement(
	          'td',
	          { key: colIdx, role: 'gridcell', className: 'rw-empty-cell' },
	          ' '
	        ) : _react2['default'].createElement(
	          'td',
	          {
	            key: colIdx,
	            role: 'gridcell',
	            id: currentID,
	            title: label,
	            'aria-selected': isSelected,
	            'aria-label': label,
	            'aria-readonly': disabled
	          },
	          _react2['default'].createElement(
	            'span',
	            {
	              'aria-labelledby': currentID,
	              onClick: onChange.bind(null, inRangeDate(date, min, max)),
	              className: _classnames2['default']('rw-btn', {
	                'rw-off-range': !inCentury(date, focused),
	                'rw-state-focus': isFocused,
	                'rw-state-selected': isSelected,
	                'rw-now': currentDecade
	              })
	            },
	            label
	          )
	        );
	      })
	    );
	  }

	});

	function inRangeDate(decade, min, max) {
	  return _utilDates2['default'].max(_utilDates2['default'].min(decade, max), min);
	}

	function inRange(decade, min, max) {
	  return _utilDates2['default'].gte(decade, _utilDates2['default'].startOf(min, 'decade'), 'year') && _utilDates2['default'].lte(decade, _utilDates2['default'].endOf(max, 'decade'), 'year');
	}

	function inCentury(date, start) {
	  return _utilDates2['default'].gte(date, _utilDates2['default'].startOf(start, 'century'), 'year') && _utilDates2['default'].lte(date, _utilDates2['default'].endOf(start, 'century'), 'year');
	}

	function getCenturyDecades(_date) {
	  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	      date = _utilDates2['default'].add(_utilDates2['default'].startOf(_date, 'century'), -20, 'year');

	  return days.map(function () {
	    return date = _utilDates2['default'].add(date, 10, 'year');
	  });
	}
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	var React = __webpack_require__(21),
	    ReplaceTransitionGroup = __webpack_require__(73),
	    compat = __webpack_require__(31),
	    css = __webpack_require__(7),
	    getWidth = __webpack_require__(74),
	    config = __webpack_require__(4);

	var SlideChildGroup = React.createClass({
	  displayName: 'SlideChildGroup',

	  propTypes: {
	    direction: React.PropTypes.oneOf(['left', 'right']),
	    duration: React.PropTypes.number
	  },

	  componentWillEnter: function componentWillEnter(done) {
	    var _this = this;

	    var node = compat.findDOMNode(this),
	        width = getWidth(node),
	        direction = this.props.direction;

	    width = direction === 'left' ? width : -width;

	    this.ORGINAL_POSITION = node.style.position;

	    css(node, { position: 'absolute', left: width + 'px', top: 0 });

	    config.animate(node, { left: 0 }, this.props.duration, function () {

	      css(node, {
	        position: _this.ORGINAL_POSITION,
	        overflow: 'hidden'
	      });

	      _this.ORGINAL_POSITION = null;
	      done && done();
	    });
	  },

	  componentWillLeave: function componentWillLeave(done) {
	    var _this2 = this;

	    var node = compat.findDOMNode(this),
	        width = getWidth(node),
	        direction = this.props.direction;

	    width = direction === 'left' ? -width : width;

	    this.ORGINAL_POSITION = node.style.position;

	    css(node, { position: 'absolute', top: 0, left: 0 });

	    config.animate(node, { left: width + 'px' }, this.props.duration, function () {
	      css(node, {
	        position: _this2.ORGINAL_POSITION,
	        overflow: 'hidden'
	      });

	      _this2.ORGINAL_POSITION = null;
	      done && done();
	    });
	  },

	  render: function render() {
	    return React.Children.only(this.props.children);
	  }

	});

	module.exports = React.createClass({
	  displayName: 'exports',

	  propTypes: {
	    direction: React.PropTypes.oneOf(['left', 'right']),
	    duration: React.PropTypes.number
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      direction: 'left',
	      duration: 250
	    };
	  },

	  _wrapChild: function _wrapChild(child, ref) {
	    return React.createElement(
	      SlideChildGroup,
	      { key: child.key, ref: ref,
	        direction: this.props.direction,
	        duration: this.props.duration },
	      child
	    );
	  },

	  render: function render() {
	    var _props = this.props;
	    var style = _props.style;
	    var children = _props.children;
	    var props = babelHelpers.objectWithoutProperties(_props, ['style', 'children']);

	    style = babelHelpers._extends({}, style, { position: 'relative', overflow: 'hidden' });

	    return React.createElement(
	      ReplaceTransitionGroup,
	      babelHelpers._extends({}, props, {
	        ref: 'container',
	        childFactory: this._wrapChild,
	        style: style,
	        component: 'div' }),
	      children
	    );
	  },

	  isTransitioning: function isTransitioning() {
	    return this.isMounted() && this.refs.container.isTransitioning();
	  }
	});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A streamlined version of TransitionGroup built for managing at most two active children
	 * also provides additional hooks for animation start/end
	 * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
	 * relevent code is licensed accordingly
	 */
	'use strict';

	var React = __webpack_require__(21),
	    css = __webpack_require__(7),
	    height = __webpack_require__(28),
	    width = __webpack_require__(74),
	    compat = __webpack_require__(31),
	    _ = __webpack_require__(20);

	module.exports = React.createClass({

	  displayName: 'ReplaceTransitionGroup',

	  propTypes: {
	    component: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]),
	    childFactory: React.PropTypes.func,

	    onAnimating: React.PropTypes.func,
	    onAnimate: React.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      component: 'span',
	      childFactory: function childFactory(a) {
	        return a;
	      },

	      onAnimating: _.noop,
	      onAnimate: _.noop
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      children: _.splat(this.props.children)
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var nextChild = getChild(nextProps.children),
	        stack = this.state.children.slice(),
	        next = stack[1],
	        last = stack[0];

	    var isLastChild = last && key(last) === key(nextChild),
	        isNextChild = next && key(next) === key(nextChild);

	    //no children
	    if (!last) {
	      stack.push(nextChild);
	      this.entering = nextChild;
	    } else if (last && !next && !isLastChild) {
	      //new child
	      stack.push(nextChild);
	      this.leaving = last;
	      this.entering = nextChild;
	    } else if (last && next && !isLastChild && !isNextChild) {
	      // the child is not the current one, exit the current one, add the new one
	      //  - shift the stack down
	      stack.shift();
	      stack.push(nextChild);
	      this.leaving = next;
	      this.entering = nextChild;
	    }
	    //new child that just needs to be re-rendered
	    else if (isLastChild) stack.splice(0, 1, nextChild);else if (isNextChild) stack.splice(1, 1, nextChild);

	    if (this.state.children[0] !== stack[0] || this.state.children[1] !== stack[1]) this.setState({ children: stack });
	  },

	  componentWillMount: function componentWillMount() {
	    this.animatingKeys = {};
	    this.leaving = null;
	    this.entering = null;
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var entering = this.entering,
	        leaving = this.leaving,
	        first = this.refs[key(entering) || key(leaving)],
	        node = compat.findDOMNode(this),
	        el = first && compat.findDOMNode(first);

	    if (el) css(node, {
	      overflow: 'hidden',
	      height: height(el) + 'px',
	      width: width(el) + 'px'
	    });

	    this.props.onAnimating();

	    this.entering = null;
	    this.leaving = null;

	    if (entering) this.performEnter(key(entering));
	    if (leaving) this.performLeave(key(leaving));
	  },

	  performEnter: function performEnter(key) {
	    var component = this.refs[key];

	    if (!component) return;

	    this.animatingKeys[key] = true;

	    if (component.componentWillEnter) component.componentWillEnter(this._handleDoneEntering.bind(this, key));else this._handleDoneEntering(key);
	  },

	  _tryFinish: function _tryFinish() {

	    if (this.isTransitioning()) return;

	    if (this.isMounted()) css(compat.findDOMNode(this), { overflow: 'visible', height: '', width: '' });

	    this.props.onAnimate();
	  },

	  _handleDoneEntering: function _handleDoneEntering(enterkey) {
	    var component = this.refs[enterkey];

	    if (component && component.componentDidEnter) component.componentDidEnter();

	    delete this.animatingKeys[enterkey];

	    if (key(this.props.children) !== enterkey) this.performLeave(enterkey); // This was removed before it had fully entered. Remove it.

	    this._tryFinish();
	  },

	  isTransitioning: function isTransitioning() {
	    return Object.keys(this.animatingKeys).length !== 0;
	  },

	  performLeave: function performLeave(key) {
	    var component = this.refs[key];

	    if (!component) return;

	    this.animatingKeys[key] = true;

	    if (component.componentWillLeave) component.componentWillLeave(this._handleDoneLeaving.bind(this, key));else this._handleDoneLeaving(key);
	  },

	  _handleDoneLeaving: function _handleDoneLeaving(leavekey) {
	    var component = this.refs[leavekey];

	    if (component && component.componentDidLeave) component.componentDidLeave();

	    delete this.animatingKeys[leavekey];

	    if (key(this.props.children) === leavekey) this.performEnter(leavekey); // This entered again before it fully left. Add it again.

	    else if (this.isMounted()) this.setState({
	        children: this.state.children.filter(function (c) {
	          return key(c) !== leavekey;
	        })
	      });

	    this._tryFinish();
	  },

	  render: function render() {
	    var _this = this;

	    var Component = this.props.component;
	    return React.createElement(
	      Component,
	      this.props,
	      this.state.children.map(function (c) {
	        return _this.props.childFactory(c, key(c));
	      })
	    );
	  }
	});

	function getChild(children) {
	  return React.Children.only(children);
	}

	function key(child) {
	  return child && child.key;
	}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var offset = __webpack_require__(29),
	    getWindow = __webpack_require__(30);

	module.exports = function width(node, client) {
	  var win = getWindow(node);
	  return win ? win.innerWidth : client ? node.clientWidth : offset(node).width;
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _invariant = __webpack_require__(19);

	var _invariant2 = babelHelpers.interopRequireDefault(_invariant);

	var _domHelpersActiveElement = __webpack_require__(23);

	var _domHelpersActiveElement2 = babelHelpers.interopRequireDefault(_domHelpersActiveElement);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	//pick, omit, has

	var _utilDates = __webpack_require__(66);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _utilLocalizers = __webpack_require__(18);

	var _utilConstants = __webpack_require__(68);

	var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

	var _Popup = __webpack_require__(27);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _Calendar2 = __webpack_require__(61);

	var _Calendar3 = babelHelpers.interopRequireDefault(_Calendar2);

	var _TimeList = __webpack_require__(76);

	var _TimeList2 = babelHelpers.interopRequireDefault(_TimeList);

	var _DateInput = __webpack_require__(77);

	var _DateInput2 = babelHelpers.interopRequireDefault(_DateInput);

	var _WidgetButton = __webpack_require__(58);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _uncontrollable = __webpack_require__(44);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilInteraction = __webpack_require__(47);

	var _utilWidgetHelpers = __webpack_require__(38);

	var views = _utilConstants2['default'].calendarViews;
	var popups = _utilConstants2['default'].datePopups;

	var Calendar = _Calendar3['default'].ControlledComponent;
	var viewEnum = Object.keys(views).map(function (k) {
	  return views[k];
	});

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;

	var propTypes = babelHelpers._extends({}, Calendar.propTypes, {

	  //-- controlled props -----------
	  value: _react2['default'].PropTypes.instanceOf(Date),
	  onChange: _react2['default'].PropTypes.func,
	  open: _react2['default'].PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
	  onToggle: _react2['default'].PropTypes.func,
	  //------------------------------------

	  onSelect: _react2['default'].PropTypes.func,

	  min: _react2['default'].PropTypes.instanceOf(Date),
	  max: _react2['default'].PropTypes.instanceOf(Date),

	  culture: _react2['default'].PropTypes.string,

	  format: _utilPropTypes2['default'].dateFormat,
	  timeFormat: _utilPropTypes2['default'].dateFormat,
	  editFormat: _utilPropTypes2['default'].dateFormat,

	  calendar: _react2['default'].PropTypes.bool,
	  time: _react2['default'].PropTypes.bool,

	  timeComponent: _utilPropTypes2['default'].elementType,

	  //popup
	  dropUp: _react2['default'].PropTypes.bool,
	  duration: _react2['default'].PropTypes.number,

	  placeholder: _react2['default'].PropTypes.string,
	  name: _react2['default'].PropTypes.string,

	  initialView: _react2['default'].PropTypes.oneOf(viewEnum),
	  finalView: _react2['default'].PropTypes.oneOf(viewEnum),

	  autoFocus: _react2['default'].PropTypes.bool,
	  disabled: _utilPropTypes2['default'].disabled,
	  readOnly: _utilPropTypes2['default'].readOnly,

	  parse: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.string), _react2['default'].PropTypes.string, _react2['default'].PropTypes.func]),

	  'aria-labelledby': _react2['default'].PropTypes.string,

	  messages: _react2['default'].PropTypes.shape({
	    calendarButton: _react2['default'].PropTypes.string,
	    timeButton: _react2['default'].PropTypes.string
	  })
	});

	var DateTimePicker = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'DateTimePicker';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(49), __webpack_require__(51), __webpack_require__(56), __webpack_require__(40)('valueInput', function (key, id) {
	      var open = this.props.open;
	      var current = this.ariaActiveDescendant();
	      var calIsActive = open === popups.CALENDAR && key === 'calendar';
	      var timeIsActive = open === popups.TIME && key === 'timelist';

	      if (!current || (timeIsActive || calIsActive)) return id;
	    })];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    return {
	      focused: false
	    };
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {

	    return {
	      value: null,

	      min: new Date(1900, 0, 1),
	      max: new Date(2099, 11, 31),
	      calendar: true,
	      time: true,
	      open: false,

	      //calendar override
	      footer: true,

	      messages: {
	        calendarButton: 'Select Date',
	        timeButton: 'Select Time'
	      },

	      ariaActiveDescendantKey: 'dropdownlist'
	    };
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props = this.props;
	    var className = _props.className;
	    var calendar = _props.calendar;
	    var time = _props.time;
	    var open = _props.open;
	    var tabIndex = _props.tabIndex;
	    var value = _props.value;
	    var editFormat = _props.editFormat;
	    var timeFormat = _props.timeFormat;
	    var culture = _props.culture;
	    var duration = _props.duration;
	    var step = _props.step;
	    var messages = _props.messages;
	    var min = _props.min;
	    var max = _props.max;
	    var busy = _props.busy;
	    var placeholder = _props.placeholder;
	    var disabled = _props.disabled;
	    var readOnly = _props.readOnly;
	    var name = _props.name;
	    var dropUp = _props.dropUp;
	    var timeComponent = _props.timeComponent;
	    var autoFocus = _props.autoFocus;
	    var ariaLabelledby = _props['aria-labelledby'];
	    var ariaDescribedby = _props['aria-describedby'];
	    var focused = this.state.focused;

	    var inputID = _utilWidgetHelpers.instanceId(this, '_input'),
	        timeListID = _utilWidgetHelpers.instanceId(this, '_time_listbox'),
	        dateListID = _utilWidgetHelpers.instanceId(this, '_cal'),
	        owns = '';

	    var elementProps = omit(this.props, Object.keys(propTypes)),
	        calProps = pick(this.props, Object.keys(Calendar.propTypes));

	    var shouldRenderList = _utilWidgetHelpers.isFirstFocusedRender(this) || open,
	        disabledOrReadonly = disabled || readOnly,
	        calendarIsOpen = open === popups.CALENDAR,
	        timeIsOpen = open === popups.TIME;

	    if (calendar) owns += dateListID;
	    if (time) owns += ' ' + timeListID;

	    value = dateOrNull(value);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: 'element',
	        tabIndex: '-1',
	        onKeyDown: this._keyDown,
	        onFocus: this._focus.bind(null, true),
	        onBlur: this._focus.bind(null, false),
	        className: _classnames2['default'](className, 'rw-datetimepicker', 'rw-widget', (_cx = {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled,
	          'rw-state-readonly': readOnly,
	          'rw-has-both': calendar && time,
	          'rw-has-neither': !calendar && !time,
	          'rw-rtl': this.isRtl()

	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx))
	      }),
	      _react2['default'].createElement(_DateInput2['default'], {
	        ref: 'valueInput',
	        id: inputID,
	        autoFocus: autoFocus,
	        tabIndex: tabIndex || 0,
	        role: 'combobox',
	        'aria-labelledby': ariaLabelledby,
	        'aria-describedby': ariaDescribedby,
	        'aria-expanded': !!open,
	        'aria-busy': !!busy,
	        'aria-owns': owns.trim(),
	        'aria-haspopup': true,
	        placeholder: placeholder,
	        name: name,
	        disabled: disabled,
	        readOnly: readOnly,
	        value: value,
	        format: getFormat(this.props),
	        editFormat: editFormat,
	        editing: focused,
	        culture: culture,
	        parse: this._parse,
	        onChange: this._change
	      }),
	      (calendar || time) && _react2['default'].createElement(
	        'span',
	        { className: 'rw-select' },
	        calendar && _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: 'rw-btn-calendar',
	            disabled: disabledOrReadonly,
	            'aria-disabled': disabledOrReadonly,
	            'aria-label': messages.calendarButton,
	            onClick: this._click.bind(null, popups.CALENDAR)
	          },
	          _react2['default'].createElement('i', { className: 'rw-i rw-i-calendar',
	            'aria-hidden': 'true'
	          })
	        ),
	        time && _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: 'rw-btn-time',
	            disabled: disabledOrReadonly,
	            'aria-disabled': disabledOrReadonly,
	            'aria-label': messages.timeButton,
	            onClick: this._click.bind(null, popups.TIME)
	          },
	          _react2['default'].createElement('i', { className: 'rw-i rw-i-clock-o',
	            'aria-hidden': 'true'
	          })
	        )
	      ),
	      _react2['default'].createElement(
	        _Popup2['default'],
	        {
	          dropUp: dropUp,
	          open: timeIsOpen,
	          onRequestClose: this.close,
	          duration: duration,
	          onOpening: function () {
	            return _this.refs.timePopup.forceUpdate();
	          }
	        },
	        _react2['default'].createElement(
	          'div',
	          null,
	          shouldRenderList && _react2['default'].createElement(_TimeList2['default'], { ref: 'timePopup',
	            id: timeListID,
	            ariaActiveDescendantKey: 'timelist',
	            'aria-labelledby': inputID,
	            'aria-live': open && 'polite',
	            'aria-hidden': !open,
	            value: value,
	            format: timeFormat,
	            step: step,
	            min: min,
	            max: max,
	            culture: culture,
	            onMove: this._scrollTo,
	            preserveDate: !!calendar,
	            itemComponent: timeComponent,
	            onSelect: this._selectTime
	          })
	        )
	      ),
	      _react2['default'].createElement(
	        _Popup2['default'],
	        {
	          className: 'rw-calendar-popup',
	          dropUp: dropUp,
	          open: calendarIsOpen,
	          duration: duration,
	          onRequestClose: this.close
	        },
	        shouldRenderList && _react2['default'].createElement(Calendar, babelHelpers._extends({}, calProps, {
	          ref: 'calPopup',
	          tabIndex: '-1',
	          id: dateListID,
	          value: value,
	          'aria-hidden': !open,
	          'aria-live': 'polite',
	          ariaActiveDescendantKey: 'calendar',
	          onChange: this._selectDate,
	          // #75: need to aggressively reclaim focus from the calendar otherwise
	          // disabled header/footer buttons will drop focus completely from the widget
	          onNavigate: function () {
	            return _this.focus();
	          }
	        }))
	      )
	    );
	  }
	}, {
	  key: '_change',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _change(date, str, constrain) {
	    var _props2 = this.props;
	    var onChange = _props2.onChange;
	    var value = _props2.value;

	    if (constrain) date = this.inRangeValue(date);

	    if (onChange) {
	      if (date == null || value == null) {
	        if (date != value) //eslint-disable-line eqeqeq
	          onChange(date, str);
	      } else if (!_utilDates2['default'].eq(date, value)) onChange(date, str);
	    }
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var _props3 = this.props;
	    var open = _props3.open;
	    var calendar = _props3.calendar;
	    var time = _props3.time;

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (e.key === 'Escape' && open) this.close();else if (e.altKey) {
	      e.preventDefault();

	      if (e.key === 'ArrowDown') {
	        if (calendar && time) this.open(open === popups.CALENDAR ? popups.TIME : popups.CALENDAR);else if (time) this.open(popups.TIME);else if (calendar) this.open(popups.CALENDAR);
	      } else if (e.key === 'ArrowUp') this.close();
	    } else if (open) {
	      if (open === popups.CALENDAR) this.refs.calPopup._keyDown(e);
	      if (open === popups.TIME) this.refs.timePopup._keyDown(e);
	    }
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this2 = this;

	    this.setTimeout('focus', function () {
	      if (!focused) _this2.close();

	      if (focused !== _this2.state.focused) {
	        _utilWidgetHelpers.notify(_this2.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this2.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: 'focus',
	  value: function focus() {
	    if (_domHelpersActiveElement2['default']() !== _utilCompat2['default'].findDOMNode(this.refs.valueInput)) this.refs.valueInput.focus();
	  }
	}, {
	  key: '_selectDate',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _selectDate(date) {
	    var format = getFormat(this.props),
	        dateTime = _utilDates2['default'].merge(date, this.props.value),
	        dateStr = formatDate(date, format, this.props.culture);

	    this.close();
	    _utilWidgetHelpers.notify(this.props.onSelect, [dateTime, dateStr]);
	    this._change(dateTime, dateStr, true);
	    this.focus();
	  }
	}, {
	  key: '_selectTime',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _selectTime(datum) {
	    var format = getFormat(this.props),
	        dateTime = _utilDates2['default'].merge(this.props.value, datum.date),
	        dateStr = formatDate(datum.date, format, this.props.culture);

	    this.close();
	    _utilWidgetHelpers.notify(this.props.onSelect, [dateTime, dateStr]);
	    this._change(dateTime, dateStr, true);
	    this.focus();
	  }
	}, {
	  key: '_click',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _click(view, e) {
	    this.focus();
	    this.toggle(view, e);
	  }
	}, {
	  key: '_parse',
	  value: function _parse(string) {
	    var format = getFormat(this.props, true),
	        editFormat = this.props.editFormat,
	        parse = this.props.parse,
	        formats = [];

	    if (typeof parse === 'function') return parse(string, this.props.culture);

	    if (typeof format === 'string') formats.push(format);

	    if (typeof editFormat === 'string') formats.push(editFormat);

	    if (parse) formats = formats.concat(this.props.parse);

	    _invariant2['default'](formats.length, 'React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. ' + 'the DateTimePicker is unable to parse `%s` into a dateTime, ' + 'please provide either a parse function or Globalize.js compatible string for `format`', string);

	    return formatsParser(formats, this.props.culture, string);
	  }
	}, {
	  key: 'toggle',
	  value: function toggle(view) {
	    this.props.open ? this.props.open !== view ? this.open(view) : this.close(view) : this.open(view);
	  }
	}, {
	  key: 'open',
	  value: function open(view) {
	    if (this.props.open !== view && this.props[view] === true) _utilWidgetHelpers.notify(this.props.onToggle, view);
	  }
	}, {
	  key: 'close',
	  value: function close() {
	    if (this.props.open) _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'inRangeValue',
	  value: function inRangeValue(value) {
	    if (value == null) return value;

	    return _utilDates2['default'].max(_utilDates2['default'].min(value, this.props.max), this.props.min);
	  }
	}]));

	exports['default'] = _uncontrollable2['default'](DateTimePicker, { open: 'onToggle', value: 'onChange' });

	function getFormat(props) {
	  var cal = props[popups.CALENDAR] != null ? props.calendar : true,
	      time = props[popups.TIME] != null ? props.time : true;

	  return props.format ? props.format : cal && time || !cal && !time ? _utilLocalizers.date.getFormat('default') : _utilLocalizers.date.getFormat(cal ? 'date' : 'time');
	}

	function formatDate(date, format, culture) {
	  var val = '';

	  if (date instanceof Date && !isNaN(date.getTime())) val = _utilLocalizers.date.format(date, format, culture);

	  return val;
	}

	function formatsParser(formats, culture, str) {
	  var date;

	  for (var i = 0; i < formats.length; i++) {
	    date = _utilLocalizers.date.parse(str, formats[i], culture);
	    if (date) return date;
	  }
	  return null;
	}

	function dateOrNull(dt) {
	  if (dt && !isNaN(dt.getTime())) return dt;
	  return null;
	}
	module.exports = exports['default'];

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilDates = __webpack_require__(66);

	var _utilDates2 = babelHelpers.interopRequireDefault(_utilDates);

	var _List = __webpack_require__(35);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var format = function format(props) {
	  return _utilLocalizers.date.getFormat('time', props.format);
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'TimeList',

	  propTypes: {
	    value: _react2['default'].PropTypes.instanceOf(Date),
	    min: _react2['default'].PropTypes.instanceOf(Date),
	    max: _react2['default'].PropTypes.instanceOf(Date),
	    step: _react2['default'].PropTypes.number,
	    itemComponent: _utilPropTypes2['default'].elementType,
	    format: _utilPropTypes2['default'].dateFormat,
	    onSelect: _react2['default'].PropTypes.func,
	    preserveDate: _react2['default'].PropTypes.bool,
	    culture: _react2['default'].PropTypes.string
	  },

	  mixins: [__webpack_require__(48)],

	  getDefaultProps: function getDefaultProps() {
	    return {
	      step: 30,
	      onSelect: function onSelect() {},
	      min: new Date(1900, 0, 1),
	      max: new Date(2099, 11, 31),
	      preserveDate: true,
	      delay: 300
	    };
	  },

	  getInitialState: function getInitialState() {
	    var data = this._dates(this.props),
	        focusedItem = this._closestDate(data, this.props.value);

	    return {
	      focusedItem: focusedItem || data[0],
	      dates: data
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var data = this._dates(nextProps),
	        focusedItem = this._closestDate(data, nextProps.value),
	        valChanged = !_utilDates2['default'].eq(nextProps.value, this.props.value, 'minutes'),
	        minChanged = !_utilDates2['default'].eq(nextProps.min, this.props.min, 'minutes'),
	        maxChanged = !_utilDates2['default'].eq(nextProps.max, this.props.max, 'minutes'),
	        localeChanged = this.props.format !== nextProps.format || this.props.culture !== nextProps.culture;

	    if (valChanged || minChanged || maxChanged || localeChanged) {
	      this.setState({
	        focusedItem: focusedItem || data[0],
	        dates: data
	      });
	    }
	  },

	  render: function render() {
	    var _props = this.props;
	    var min = _props.min;
	    var max = _props.max;
	    var value = _props.value;
	    var step = _props.step;
	    var props = babelHelpers.objectWithoutProperties(_props, ['min', 'max', 'value', 'step']);

	    var times = this.state.dates,
	        date = this._closestDate(times, value);

	    return _react2['default'].createElement(_List2['default'], babelHelpers._extends({}, props, {
	      ref: 'list',
	      data: times,
	      textField: 'label',
	      valueField: 'date',
	      selected: date,
	      focused: this.state.focusedItem
	    }));
	  },

	  _closestDate: function _closestDate(times, date) {
	    var roundTo = 1000 * 60 * this.props.step,
	        inst = null,
	        label;

	    if (!date) return null;

	    date = new Date(Math.floor(date.getTime() / roundTo) * roundTo);
	    label = _utilLocalizers.date.format(date, format(this.props), this.props.culture);

	    times.some(function (time) {
	      if (time.label === label) return inst = time;
	    });

	    return inst;
	  },

	  _data: function _data() {
	    return this.state.dates;
	  },

	  _dates: function _dates(props) {
	    var times = [],
	        i = 0,
	        values = this._dateValues(props),
	        start = values.min,
	        startDay = _utilDates2['default'].date(start);

	    while (_utilDates2['default'].date(start) === startDay && _utilDates2['default'].lte(start, values.max)) {
	      i++;
	      times.push({ date: start, label: _utilLocalizers.date.format(start, format(props), props.culture) });
	      start = _utilDates2['default'].add(start, props.step || 30, 'minutes');
	    }
	    return times;
	  },

	  _dateValues: function _dateValues(props) {
	    var value = props.value || _utilDates2['default'].today(),
	        useDate = props.preserveDate,
	        min = props.min,
	        max = props.max,
	        start,
	        end;

	    //compare just the time regradless of whether they fall on the same day
	    if (!useDate) {
	      start = _utilDates2['default'].startOf(_utilDates2['default'].merge(new Date(), min), 'minutes');
	      end = _utilDates2['default'].startOf(_utilDates2['default'].merge(new Date(), max), 'minutes');

	      if (_utilDates2['default'].lte(end, start) && _utilDates2['default'].gt(max, min, 'day')) end = _utilDates2['default'].tomorrow();

	      return {
	        min: start,
	        max: end
	      };
	    }

	    start = _utilDates2['default'].today();
	    end = _utilDates2['default'].tomorrow();
	    //date parts are equal
	    return {
	      min: _utilDates2['default'].eq(value, min, 'day') ? _utilDates2['default'].merge(start, min) : start,
	      max: _utilDates2['default'].eq(value, max, 'day') ? _utilDates2['default'].merge(start, max) : end
	    };
	  },

	  _keyDown: function _keyDown(e) {
	    var _this = this;

	    var key = e.key,
	        character = String.fromCharCode(e.keyCode),
	        focusedItem = this.state.focusedItem,
	        list = this.refs.list;

	    if (key === 'End') this.setState({ focusedItem: list.last() });else if (key === 'Home') this.setState({ focusedItem: list.first() });else if (key === 'Enter') this.props.onSelect(focusedItem);else if (key === 'ArrowDown') {
	      e.preventDefault();
	      this.setState({ focusedItem: list.next(focusedItem) });
	    } else if (key === 'ArrowUp') {
	      e.preventDefault();
	      this.setState({ focusedItem: list.prev(focusedItem) });
	    } else {
	      e.preventDefault();

	      this.search(character, function (item) {
	        _this.setState({ focusedItem: item });
	      });
	    }
	  },

	  scrollTo: function scrollTo() {
	    this.refs.list.move && this.refs.list.move();
	  },

	  search: function search(character, cb) {
	    var _this2 = this;

	    var word = ((this._searchTerm || '') + character).toLowerCase();

	    this._searchTerm = word;

	    this.setTimeout('search', function () {
	      var list = _this2.refs.list,
	          item = list.next(_this2.state.focusedItem, word);

	      _this2._searchTerm = '';
	      if (item) cb(item);
	    }, this.props.delay);
	  }

	});
	module.exports = exports['default'];

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilLocalizers = __webpack_require__(18);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	exports['default'] = _react2['default'].createClass({

	  displayName: 'DatePickerInput',

	  propTypes: {
	    format: _utilPropTypes2['default'].dateFormat.isRequired,
	    editFormat: _utilPropTypes2['default'].dateFormat,
	    parse: _react2['default'].PropTypes.func.isRequired,

	    value: _react2['default'].PropTypes.instanceOf(Date),
	    onChange: _react2['default'].PropTypes.func.isRequired,
	    culture: _react2['default'].PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      textValue: ''
	    };
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    var text = formatDate(nextProps.value, nextProps.editing && nextProps.editFormat ? nextProps.editFormat : nextProps.format, nextProps.culture);

	    this.startValue = text;

	    this.setState({
	      textValue: text
	    });
	  },

	  getInitialState: function getInitialState() {
	    var text = formatDate(this.props.value, this.props.editing && this.props.editFormat ? this.props.editFormat : this.props.format, this.props.culture);

	    this.startValue = text;

	    return {
	      textValue: text
	    };
	  },

	  render: function render() {
	    var value = this.state.textValue;

	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      type: 'text',
	      className: _classnames2['default']({ 'rw-input': true }),
	      value: value,
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      onChange: this._change,
	      onBlur: chain(this.props.blur, this._blur, this) }));
	  },

	  _change: function _change(e) {
	    this.setState({ textValue: e.target.value });
	    this._needsFlush = true;
	  },

	  _blur: function _blur(e) {
	    var val = e.target.value,
	        date;

	    if (this._needsFlush) {
	      this._needsFlush = false;
	      date = this.props.parse(val);

	      this.props.onChange(date, formatDate(date, this.props.format, this.props.culture));
	    }
	  },

	  focus: function focus() {
	    _utilCompat2['default'].findDOMNode(this).focus();
	  }

	});

	function isValid(d) {
	  return !isNaN(d.getTime());
	}

	function formatDate(date, format, culture) {
	  var val = '';

	  if (date instanceof Date && isValid(date)) val = _utilLocalizers.date.format(date, format, culture);

	  return val;
	}

	function chain(a, b, thisArg) {
	  return function () {
	    a && a.apply(thisArg, arguments);
	    b && b.apply(thisArg, arguments);
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _uncontrollable = __webpack_require__(44);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilConstants = __webpack_require__(68);

	var _utilConstants2 = babelHelpers.interopRequireDefault(_utilConstants);

	var _utilRepeater = __webpack_require__(79);

	var _utilRepeater2 = babelHelpers.interopRequireDefault(_utilRepeater);

	var _utilLocalizers = __webpack_require__(18);

	var _NumberInput = __webpack_require__(80);

	var _NumberInput2 = babelHelpers.interopRequireDefault(_NumberInput);

	var _WidgetButton = __webpack_require__(58);

	var _WidgetButton2 = babelHelpers.interopRequireDefault(_WidgetButton);

	var _utilInteraction = __webpack_require__(47);

	var _utilWidgetHelpers = __webpack_require__(38);

	var directions = _utilConstants2['default'].directions;

	var format = function format(props) {
	  return _utilLocalizers.number.getFormat('default', props.format);
	};

	var propTypes = {

	  // -- controlled props -----------
	  value: _react2['default'].PropTypes.number,
	  onChange: _react2['default'].PropTypes.func,
	  //------------------------------------

	  min: _react2['default'].PropTypes.number,
	  max: _react2['default'].PropTypes.number,
	  step: _react2['default'].PropTypes.number,

	  precision: _react2['default'].PropTypes.number,

	  culture: _react2['default'].PropTypes.string,

	  format: _utilPropTypes2['default'].numberFormat,

	  name: _react2['default'].PropTypes.string,

	  parse: _react2['default'].PropTypes.func,

	  autoFocus: _react2['default'].PropTypes.bool,
	  disabled: _utilPropTypes2['default'].disabled,
	  readOnly: _utilPropTypes2['default'].readOnly,

	  messages: _react2['default'].PropTypes.shape({
	    increment: _react2['default'].PropTypes.string,
	    decrement: _react2['default'].PropTypes.string
	  }),

	  placeholder: _react2['default'].PropTypes.string
	};

	var NumberPicker = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'NumberPicker';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(49), __webpack_require__(56)];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      value: null,
	      open: false,

	      min: -Infinity,
	      max: Infinity,
	      step: 1,

	      messages: {
	        increment: 'increment value',
	        decrement: 'decrement value'
	      }
	    };
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    return {
	      focused: false,
	      active: false
	    };
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _$omit = _util_2['default'].omit(this.props, Object.keys(propTypes));

	    var className = _$omit.className;
	    var onKeyPress = _$omit.onKeyPress;
	    var onKeyUp = _$omit.onKeyUp;
	    var autoFocus = _$omit.autoFocus;
	    var props = babelHelpers.objectWithoutProperties(_$omit, ['className', 'onKeyPress', 'onKeyUp', 'autoFocus']);
	    var val = this.constrainValue(this.props.value);

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, props, {
	        ref: 'element',
	        onKeyDown: this._keyDown,
	        onFocus: this._focus.bind(null, true),
	        onBlur: this._focus.bind(null, false),
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-numberpicker', 'rw-widget', {
	          'rw-state-focus': this.state.focused,
	          'rw-state-disabled': this.props.disabled,
	          'rw-state-readonly': this.props.readOnly,
	          'rw-rtl': this.isRtl()
	        }) }),
	      _react2['default'].createElement(
	        'span',
	        { className: 'rw-select' },
	        _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: _classnames2['default']({ 'rw-state-active': this.state.active === directions.UP }),
	            onMouseDown: this._mouseDown.bind(null, directions.UP),
	            onMouseUp: this._mouseUp.bind(null, directions.UP),
	            onMouseOut: this._mouseUp.bind(null, directions.UP),
	            onClick: this._focus.bind(null, true),
	            disabled: val === this.props.max || this.props.disabled,
	            'aria-disabled': val === this.props.max || this.props.disabled },
	          _react2['default'].createElement(
	            'i',
	            { className: 'rw-i rw-i-caret-up' },
	            _react2['default'].createElement(
	              'span',
	              { className: 'rw-sr' },
	              this.props.messages.increment
	            )
	          )
	        ),
	        _react2['default'].createElement(
	          _WidgetButton2['default'],
	          {
	            tabIndex: '-1',
	            className: _classnames2['default']({ 'rw-state-active': this.state.active === directions.DOWN }),
	            onMouseDown: this._mouseDown.bind(null, directions.DOWN),
	            onMouseUp: this._mouseUp.bind(null, directions.DOWN),
	            onMouseOut: this._mouseUp.bind(null, directions.DOWN),
	            onClick: this._focus.bind(null, true),
	            disabled: val === this.props.min || this.props.disabled,
	            'aria-disabled': val === this.props.min || this.props.disabled },
	          _react2['default'].createElement(
	            'i',
	            { className: 'rw-i rw-i-caret-down' },
	            _react2['default'].createElement(
	              'span',
	              { className: 'rw-sr' },
	              this.props.messages.decrement
	            )
	          )
	        )
	      ),
	      _react2['default'].createElement(_NumberInput2['default'], {
	        ref: 'input',
	        tabIndex: props.tabIndex,
	        placeholder: this.props.placeholder,
	        value: val,
	        autoFocus: autoFocus,
	        editing: this.state.focused,
	        format: this.props.format,
	        parse: this.props.parse,
	        name: this.props.name,
	        role: 'spinbutton',
	        min: this.props.min,
	        'aria-valuenow': val,
	        'aria-valuemin': isFinite(this.props.min) ? this.props.min : null,
	        'aria-valuemax': isFinite(this.props.max) ? this.props.max : null,
	        'aria-disabled': this.props.disabled,
	        'aria-readonly': this.props.readonly,
	        disabled: this.props.disabled,
	        readOnly: this.props.readOnly,
	        onChange: this.change,
	        onKeyPress: onKeyPress,
	        onKeyUp: onKeyUp })
	    );
	  }
	}, {
	  key: '_mouseDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _mouseDown(dir) {
	    var method = dir === directions.UP ? this.increment : this.decrement;

	    this.setState({ active: dir });

	    var val = method.call(this);

	    if (!(dir === directions.UP && val === this.props.max || dir === directions.DOWN && val === this.props.min)) {
	      if (!this._cancelRepeater) this._cancelRepeater = _utilRepeater2['default'](this._mouseDown.bind(null, dir));
	    } else this._mouseUp();
	  }
	}, {
	  key: '_mouseUp',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _mouseUp() {
	    this.setState({ active: false });
	    this._cancelRepeater && this._cancelRepeater();
	    this._cancelRepeater = null;
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this = this;

	    focused && _utilCompat2['default'].findDOMNode(this.refs.input).focus();

	    this.setTimeout('focus', function () {
	      if (focused !== _this.state.focused) {
	        _utilWidgetHelpers.notify(_this.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this.setState({ focused: focused });
	      }
	    }, 0);
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var key = e.key;

	    console.log('hiii');
	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End' && isFinite(this.props.max)) this.change(this.props.max);else if (key === 'Home' && isFinite(this.props.min)) this.change(this.props.min);else if (key === 'ArrowDown') {
	      e.preventDefault();
	      this.decrement();
	    } else if (key === 'ArrowUp') {
	      e.preventDefault();
	      this.increment();
	    }
	  }
	}, {
	  key: 'increment',
	  value: function increment() {
	    return this.step(this.props.step);
	  }
	}, {
	  key: 'decrement',
	  value: function decrement() {
	    return this.step(-this.props.step);
	  }
	}, {
	  key: 'step',
	  value: function step(amount) {
	    var value = (this.props.value || 0) + amount;

	    var decimals = this.props.precision != null ? this.props.precision : _utilLocalizers.number.precision(format(this.props));

	    this.change(decimals != null ? round(value, decimals) : value);

	    return value;
	  }
	}, {
	  key: 'change',
	  value: function change(val) {
	    val = this.constrainValue(val);

	    if (this.props.value !== val) _utilWidgetHelpers.notify(this.props.onChange, val);
	  }
	}, {
	  key: 'constrainValue',
	  value: function constrainValue(value) {
	    var max = this.props.max == null ? Infinity : this.props.max,
	        min = this.props.min == null ? -Infinity : this.props.min;

	    if (value == null || value === '') return null;

	    return Math.max(Math.min(value, max), min);
	  }
	}]));

	exports['default'] = _uncontrollable2['default'](NumberPicker, { value: 'onChange' });

	// thank you kendo ui core
	// https://github.com/telerik/kendo-ui-core/blob/master/src/kendo.core.js#L1036
	function round(value, precision) {
	  precision = precision || 0;

	  value = ('' + value).split('e');
	  value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] + precision : precision)));

	  value = ('' + value).split('e');
	  value = +(value[0] + 'e' + (value[1] ? +value[1] - precision : -precision));

	  return value.toFixed(precision);
	}
	module.exports = exports['default'];

	//allow for styling, focus stealing keeping me from the normal what have you

/***/ },
/* 79 */
/***/ function(module, exports) {

	// my tests in ie11/chrome/FF indicate that keyDown repeats
	// at about 35ms+/- 5ms after an initial 500ms delay. callback fires on the leading edge
	"use strict";

	exports.__esModule = true;
	exports["default"] = Repeater;

	function Repeater(callback) {
	  var id,
	      cancel = function cancel() {
	    return clearInterval(id);
	  };

	  id = setInterval(function () {
	    cancel();
	    id = setInterval(callback, 35);
	    callback(); //fire after everything in case the user cancels on the first call
	  }, 500);

	  return cancel;
	}

	module.exports = exports["default"];

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilLocalizers = __webpack_require__(18);

	var format = function format(props) {
	  return _utilLocalizers.number.getFormat('default', props.format);
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'NumberPickerInput',

	  propTypes: {
	    value: _react2['default'].PropTypes.number,
	    placeholder: _react2['default'].PropTypes.string,

	    format: _utilPropTypes2['default'].numberFormat,
	    parse: _react2['default'].PropTypes.func.isRequired,
	    culture: _react2['default'].PropTypes.string,

	    min: _react2['default'].PropTypes.number,

	    onChange: _react2['default'].PropTypes.func.isRequired,
	    onKeyDown: _react2['default'].PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      value: null,
	      editing: false,
	      parse: function parse(number, culture) {
	        return _utilLocalizers.number.parse(number, culture);
	      }
	    };
	  },

	  getDefaultState: function getDefaultState(props) {
	    var value = props.editing ? props.value : formatNumber(props.value, format(props), props.culture);

	    if (value == null || isNaN(props.value)) value = '';

	    return {
	      stringValue: '' + value
	    };
	  },

	  getInitialState: function getInitialState() {
	    return this.getDefaultState(this.props);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    this.setState(this.getDefaultState(nextProps));
	  },

	  render: function render() {
	    var value = this.state.stringValue;

	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      type: 'text',
	      className: 'rw-input',
	      onChange: this._change,
	      onBlur: this._finish,
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      placeholder: this.props.placeholder,
	      value: value }));
	  },

	  _change: function _change(e) {
	    var val = e.target.value,
	        number = this.props.parse(e.target.value, this.props.culture),
	        valid = this.isValid(number);

	    if (val == null || val.trim() === '' || val.trim() === '-') return this.props.onChange(null);

	    if (valid && number !== this.props.value && !this.isAtDelimiter(number, val)) return this.props.onChange(number);

	    //console.log(val !== 0 && !val)
	    if (!isNaN(number) || this.isAtDelimiter(number, val)) this.current(e.target.value);
	  },

	  _finish: function _finish() {
	    var str = this.state.stringValue,
	        number = this.props.parse(str, this.props.culture);

	    // if number is below the min
	    // we need to flush low values and decimal stops, onBlur means i'm done inputing
	    if (!isNaN(number) && (number < this.props.min || this.isAtDelimiter(number, str))) {
	      this.props.onChange(number);
	    }
	  },

	  isAtDelimiter: function isAtDelimiter(num, str) {
	    var next;

	    if (str.length <= 1) return false;

	    next = this.props.parse(str.substr(0, str.length - 1), this.props.culture);

	    return typeof next === 'number' && !isNaN(next) && next === num;
	  },

	  isValid: function isValid(num) {
	    if (typeof num !== 'number' || isNaN(num)) return false;
	    return num >= this.props.min;
	  },

	  //this intermediate state is for when one runs into the decimal or are typing the number
	  current: function current(val) {
	    this.setState({ stringValue: val });
	  }

	});

	// function parseLocaleFloat(number, parser, culture) {
	//   if ( typeof format === 'function')
	//     return format(number, culture)

	//   return config.globalize.parseFloat(number, 10, culture)
	// }

	function formatNumber(number, format, culture) {
	  return _utilLocalizers.number.format(number, format, culture);
	}
	module.exports = exports['default'];

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _Popup = __webpack_require__(27);

	var _Popup2 = babelHelpers.interopRequireDefault(_Popup);

	var _MultiselectInput = __webpack_require__(82);

	var _MultiselectInput2 = babelHelpers.interopRequireDefault(_MultiselectInput);

	var _MultiselectTagList = __webpack_require__(83);

	var _MultiselectTagList2 = babelHelpers.interopRequireDefault(_MultiselectTagList);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(35);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _ListGroupable = __webpack_require__(41);

	var _ListGroupable2 = babelHelpers.interopRequireDefault(_ListGroupable);

	var _utilValidateListInterface = __webpack_require__(43);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _uncontrollable = __webpack_require__(44);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilInteraction = __webpack_require__(47);

	var _utilWidgetHelpers = __webpack_require__(38);

	var compatCreate = function compatCreate(props, msgs) {
	  return typeof msgs.createNew === 'function' ? msgs.createNew(props) : [_react2['default'].createElement(
	    'strong',
	    null,
	    '"' + props.searchTerm + '"'
	  ), ' ' + msgs.createNew];
	};

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;
	var splat = _util_2['default'].splat;

	var propTypes = {
	  data: _react2['default'].PropTypes.array,
	  //-- controlled props --
	  value: _react2['default'].PropTypes.array,
	  onChange: _react2['default'].PropTypes.func,

	  searchTerm: _react2['default'].PropTypes.string,
	  onSearch: _react2['default'].PropTypes.func,

	  open: _react2['default'].PropTypes.bool,
	  onToggle: _react2['default'].PropTypes.func,
	  //-------------------------------------------

	  valueField: _react2['default'].PropTypes.string,
	  textField: _utilPropTypes2['default'].accessor,

	  tagComponent: _utilPropTypes2['default'].elementType,
	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,

	  groupComponent: _utilPropTypes2['default'].elementType,
	  groupBy: _utilPropTypes2['default'].accessor,

	  createComponent: _utilPropTypes2['default'].elementType,

	  onSelect: _react2['default'].PropTypes.func,
	  onCreate: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf([false]), _react2['default'].PropTypes.func]),

	  dropUp: _react2['default'].PropTypes.bool,
	  duration: _react2['default'].PropTypes.number, //popup

	  placeholder: _react2['default'].PropTypes.string,

	  autoFocus: _react2['default'].PropTypes.bool,
	  disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	  readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

	  messages: _react2['default'].PropTypes.shape({
	    open: _utilPropTypes2['default'].message,
	    emptyList: _utilPropTypes2['default'].message,
	    emptyFilter: _utilPropTypes2['default'].message,
	    createNew: _utilPropTypes2['default'].message
	  })
	};

	var Multiselect = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'Multiselect';
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(50), __webpack_require__(51), __webpack_require__(56), __webpack_require__(40)('input', function (key, id) {
	      var myKey = this.props.ariaActiveDescendantKey;

	      var createIsActive = (!this._data().length || this.state.focusedItem === null) && key === myKey;

	      var tagIsActive = this.state.focusedTag != null && key === 'taglist';
	      var listIsActive = this.state.focusedTag == null && key === 'list';

	      if (createIsActive || tagIsActive || listIsActive) return id;
	    })];
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      data: [],
	      filter: 'startsWith',
	      value: [],
	      open: false,
	      searchTerm: '',
	      ariaActiveDescendantKey: 'multiselect',
	      messages: {
	        createNew: '(create new tag)',
	        emptyList: 'There are no items in this list',
	        emptyFilter: 'The filter returned no results',
	        tagsLabel: 'selected items',
	        selectedItems: 'selected items',
	        noneSelected: 'no selected items',
	        removeLabel: 'remove selected item'
	      }
	    };
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var _props = this.props;
	    var data = _props.data;
	    var value = _props.value;
	    var valueField = _props.valueField;
	    var searchTerm = _props.searchTerm;
	    var dataItems = splat(value).map(function (item) {
	      return _utilDataHelpers.dataItem(data, item, valueField);
	    });
	    var processedData = this.process(data, dataItems, searchTerm);

	    return {
	      focusedTag: null,
	      focusedItem: processedData[0],
	      processedData: processedData,
	      dataItems: dataItems
	    };
	  }
	}, {
	  key: 'componentDidUpdate',
	  value: function componentDidUpdate() {
	    this.ariaActiveDescendant(_utilWidgetHelpers.instanceId(this, '__createlist_option'));

	    this.refs.list && _utilValidateListInterface2['default'](this.refs.list);
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    var data = nextProps.data;
	    var value = nextProps.value;
	    var valueField = nextProps.valueField;
	    var searchTerm = nextProps.searchTerm;
	    var values = _util_2['default'].splat(value);
	    var current = this.state.focusedItem;
	    var items = this.process(data, values, searchTerm);

	    this.setState({
	      processedData: items,
	      focusedItem: items.indexOf(current) === -1 ? items[0] : current,
	      dataItems: values.map(function (item) {
	        return _utilDataHelpers.dataItem(data, item, valueField);
	      })
	    });
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _cx,
	        _this = this;

	    var _props2 = this.props;
	    var searchTerm = _props2.searchTerm;
	    var maxLength = _props2.maxLength;
	    var className = _props2.className;
	    var tabIndex = _props2.tabIndex;
	    var textField = _props2.textField;
	    var groupBy = _props2.groupBy;
	    var messages = _props2.messages;
	    var busy = _props2.busy;
	    var dropUp = _props2.dropUp;
	    var open = _props2.open;
	    var disabled = _props2.disabled;
	    var readOnly = _props2.readOnly;
	    var TagComponent = _props2.tagComponent;
	    var List = _props2.listComponent;

	    List = List || groupBy && _ListGroupable2['default'] || _List2['default'];

	    messages = msgs(messages);

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var tagsProps = pick(this.props, ['valueField', 'textField']);
	    var inputProps = pick(this.props, ['maxLength', 'searchTerm', 'autoFocus']);
	    var listProps = pick(this.props, Object.keys(List.propTypes));
	    var popupProps = pick(this.props, Object.keys(_Popup2['default'].propTypes));

	    var _state = this.state;
	    var focusedTag = _state.focusedTag;
	    var focusedItem = _state.focusedItem;
	    var focused = _state.focused;
	    var dataItems = _state.dataItems;

	    var items = this._data(),
	        tagsID = _utilWidgetHelpers.instanceId(this, '_taglist'),
	        listID = _utilWidgetHelpers.instanceId(this, '__listbox'),
	        createID = _utilWidgetHelpers.instanceId(this, '__createlist'),
	        createOptionID = _utilWidgetHelpers.instanceId(this, '__createlist_option');

	    var shouldRenderTags = !!dataItems.length,
	        shouldRenderPopup = _utilWidgetHelpers.isFirstFocusedRender(this) || open,
	        shouldShowCreate = this._shouldShowCreate(),
	        createIsFocused = !items.length || focusedItem === null;

	    if (focused) {
	      var notify = dataItems.length ? messages.selectedItems + ': ' + dataItems.map(function (item) {
	        return _utilDataHelpers.dataText(item, textField);
	      }).join(', ') : messages.noneSelected;
	    }

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        ref: 'element',
	        id: _utilWidgetHelpers.instanceId(this),
	        onKeyDown: this._keyDown,
	        onFocus: this._focus.bind(null, true),
	        onBlur: this._focus.bind(null, false),
	        onTouchEnd: this._focus.bind(null, true),
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-widget', 'rw-multiselect', (_cx = {
	          'rw-state-focus': focused,
	          'rw-state-disabled': disabled === true,
	          'rw-state-readonly': readOnly === true,
	          'rw-rtl': this.isRtl()
	        }, _cx['rw-open' + (dropUp ? '-up' : '')] = open, _cx)) }),
	      _react2['default'].createElement(
	        'span',
	        {
	          ref: 'status',
	          id: _utilWidgetHelpers.instanceId(this, '__notify'),
	          role: 'status',
	          className: 'rw-sr',
	          'aria-live': 'assertive',
	          'aria-atomic': 'true',
	          'aria-relevant': 'additions removals text'
	        },
	        notify
	      ),
	      _react2['default'].createElement(
	        'div',
	        { className: 'rw-multiselect-wrapper', ref: 'wrapper' },
	        busy && _react2['default'].createElement('i', { className: 'rw-i rw-loading' }),
	        shouldRenderTags && _react2['default'].createElement(_MultiselectTagList2['default'], babelHelpers._extends({}, tagsProps, {
	          ref: 'tagList',
	          id: tagsID,
	          'aria-label': messages.tagsLabel,
	          value: dataItems,
	          focused: focusedTag,
	          disabled: disabled,
	          readOnly: readOnly,
	          onDelete: this._delete,
	          valueComponent: TagComponent,
	          ariaActiveDescendantKey: 'taglist'
	        })),
	        _react2['default'].createElement(_MultiselectInput2['default'], babelHelpers._extends({}, inputProps, {
	          ref: 'input',
	          tabIndex: tabIndex || 0,
	          role: 'listbox',
	          'aria-expanded': open,
	          'aria-busy': !!busy,
	          autoFocus: this.props.autoFocus,
	          'aria-owns': listID + ' ' + _utilWidgetHelpers.instanceId(this, '__notify') + (shouldRenderTags ? ' ' + tagsID : '') + (shouldShowCreate ? ' ' + createID : ''),
	          'aria-haspopup': true,
	          value: searchTerm,
	          maxLength: maxLength,
	          disabled: disabled === true,
	          readOnly: readOnly === true,
	          placeholder: this._placeholder(),
	          onKeyDown: this._searchKeyDown,
	          onKeyUp: this._searchgKeyUp,
	          onChange: this._typing,
	          onFocus: this._inputFocus,
	          onClick: this._inputFocus,
	          onTouchEnd: this._inputFocus
	        }))
	      ),
	      _react2['default'].createElement(
	        _Popup2['default'],
	        babelHelpers._extends({}, popupProps, {
	          onOpening: function () {
	            return _this.refs.list.forceUpdate();
	          },
	          onRequestClose: this.close
	        }),
	        _react2['default'].createElement(
	          'div',
	          null,
	          shouldRenderPopup && [_react2['default'].createElement(List, babelHelpers._extends({ ref: 'list',
	            key: 0
	          }, listProps, {
	            readOnly: !!readOnly,
	            disabled: !!disabled,
	            id: listID,
	            'aria-live': 'polite',
	            'aria-labelledby': _utilWidgetHelpers.instanceId(this),
	            'aria-hidden': !open,
	            ariaActiveDescendantKey: 'list',
	            data: items,
	            focused: focusedItem,
	            onSelect: this._onSelect,
	            onMove: this._scrollTo,
	            messages: {
	              emptyList: this._lengthWithoutValues ? messages.emptyFilter : messages.emptyList
	            }
	          })), shouldShowCreate && _react2['default'].createElement(
	            'ul',
	            { key: 1, role: 'listbox', id: createID, className: 'rw-list rw-multiselect-create-tag' },
	            _react2['default'].createElement(
	              'li',
	              { onClick: this._onCreate.bind(null, searchTerm),
	                role: 'option',
	                id: createOptionID,
	                className: _classnames2['default']({
	                  'rw-list-option': true,
	                  'rw-state-focus': createIsFocused
	                }) },
	              compatCreate(this.props, messages)
	            )
	          )]
	        )
	      )
	    );
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.state.processedData;
	  }
	}, {
	  key: '_delete',
	  value: function _delete(value) {
	    this._focus(true);
	    this.change(this.state.dataItems.filter(function (d) {
	      return d !== value;
	    }));
	  }
	}, {
	  key: '_inputFocus',
	  value: function _inputFocus() {
	    this._focus(true);
	    !this.props.open && this.open();
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this2 = this;

	    if (this.props.disabled === true) return;

	    if (focused) this.refs.input.focus();

	    this.setTimeout('focus', function () {
	      if (!focused) _this2.refs.tagList && _this2.setState({ focusedTag: null });

	      if (focused !== _this2.state.focused) {
	        focused ? _this2.open() : _this2.close();

	        _utilWidgetHelpers.notify(_this2.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this2.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: '_searchKeyDown',
	  value: function _searchKeyDown(e) {
	    if (e.key === 'Backspace' && e.target.value && !this._deletingText) this._deletingText = true;
	  }
	}, {
	  key: '_searchgKeyUp',
	  value: function _searchgKeyUp(e) {
	    if (e.key === 'Backspace' && this._deletingText) this._deletingText = false;
	  }
	}, {
	  key: '_typing',
	  value: function _typing(e) {
	    _utilWidgetHelpers.notify(this.props.onSearch, [e.target.value]);
	    this.open();
	  }
	}, {
	  key: '_onSelect',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onSelect(data) {

	    if (data === undefined) {
	      if (this.props.onCreate) this._onCreate(this.props.searchTerm);

	      return;
	    }

	    _utilWidgetHelpers.notify(this.props.onSelect, data);
	    this.change(this.state.dataItems.concat(data));

	    this.close();
	    this._focus(true);
	  }
	}, {
	  key: '_onCreate',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _onCreate(tag) {
	    if (tag.trim() === '') return;

	    _utilWidgetHelpers.notify(this.props.onCreate, tag);
	    this.props.searchTerm && _utilWidgetHelpers.notify(this.props.onSearch, ['']);

	    this.close();
	    this._focus(true);
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var key = e.key;
	    var altKey = e.altKey;
	    var ctrlKey = e.ctrlKey;
	    var noSearch = !this.props.searchTerm && !this._deletingText;
	    var isOpen = this.props.open;var _state2 = this.state;
	    var focusedTag = _state2.focusedTag;
	    var focusedItem = _state2.focusedItem;
	    var _refs = this.refs;
	    var list = _refs.list;
	    var tagList = _refs.tagList;

	    var nullTag = { focusedTag: null };

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'ArrowDown') {
	      var next = list.next(focusedItem),
	          creating = this._shouldShowCreate() && focusedItem === next || focusedItem === null;

	      next = creating ? null : next;

	      e.preventDefault();
	      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: next }, nullTag));else this.open();
	    } else if (key === 'ArrowUp') {
	      var prev = focusedItem === null ? list.last() : list.prev(focusedItem);

	      e.preventDefault();

	      if (altKey) this.close();else if (isOpen) this.setState(babelHelpers._extends({ focusedItem: prev }, nullTag));
	    } else if (key === 'End') {
	      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: list.last() }, nullTag));else tagList && this.setState({ focusedTag: tagList.last() });
	    } else if (key === 'Home') {
	      if (isOpen) this.setState(babelHelpers._extends({ focusedItem: list.first() }, nullTag));else tagList && this.setState({ focusedTag: tagList.first() });
	    } else if (isOpen && key === 'Enter') ctrlKey && this.props.onCreate || focusedItem === null ? this._onCreate(this.props.searchTerm) : this._onSelect(this.state.focusedItem);else if (key === 'Escape') isOpen ? this.close() : tagList && this.setState(nullTag);else if (noSearch && key === 'ArrowLeft') tagList && this.setState({ focusedTag: tagList.prev(focusedTag) });else if (noSearch && key === 'ArrowRight') tagList && this.setState({ focusedTag: tagList.next(focusedTag) });else if (noSearch && key === 'Delete') tagList && tagList.remove(focusedTag);else if (noSearch && key === 'Backspace') tagList && tagList.removeNext();
	  }
	}, {
	  key: 'change',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function change(data) {
	    _utilWidgetHelpers.notify(this.props.onChange, [data]);
	    _utilWidgetHelpers.notify(this.props.onSearch, ['']);
	  }
	}, {
	  key: 'open',
	  value: function open() {
	    if (!(this.props.disabled === true || this.props.readOnly === true)) _utilWidgetHelpers.notify(this.props.onToggle, true);
	  }
	}, {
	  key: 'close',
	  value: function close() {
	    _utilWidgetHelpers.notify(this.props.onToggle, false);
	  }
	}, {
	  key: 'toggle',
	  value: function toggle() {
	    this.props.open ? this.close() : this.open();
	  }
	}, {
	  key: 'process',
	  value: function process(data, values, searchTerm) {
	    var valueField = this.props.valueField;

	    var items = data.filter(function (i) {
	      return !values.some(function (v) {
	        return _utilDataHelpers.valueMatcher(i, v, valueField);
	      });
	    });

	    this._lengthWithoutValues = items.length;

	    if (searchTerm) items = this.filter(items, searchTerm);

	    return items;
	  }
	}, {
	  key: '_shouldShowCreate',
	  value: function _shouldShowCreate() {
	    var _props3 = this.props;
	    var textField = _props3.textField;
	    var searchTerm = _props3.searchTerm;
	    var onCreate = _props3.onCreate;

	    if (!onCreate || !searchTerm) return false;

	    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
	    return !this._data().some(function (v) {
	      return _utilDataHelpers.dataText(v, textField) === searchTerm;
	    }) && !this.state.dataItems.some(function (v) {
	      return _utilDataHelpers.dataText(v, textField) === searchTerm;
	    });
	  }
	}, {
	  key: '_placeholder',
	  value: function _placeholder() {
	    return (this.props.value || []).length ? '' : this.props.placeholder || '';
	  }
	}]));

	function msgs(msgs) {
	  return babelHelpers._extends({
	    createNew: '(create new tag)',
	    emptyList: 'There are no items in this list',
	    emptyFilter: 'The filter returned no results',
	    tagsLabel: 'selected items',
	    selectedItems: 'selected items',
	    removeLabel: 'remove selected item'
	  }, msgs);
	}

	exports['default'] = _uncontrollable2['default'](Multiselect, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' });
	module.exports = exports['default'];

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	exports['default'] = _react2['default'].createClass({

	  displayName: 'MultiselectInput',

	  propTypes: {
	    value: _react2['default'].PropTypes.string,
	    maxLength: _react2['default'].PropTypes.number,
	    onChange: _react2['default'].PropTypes.func.isRequired,
	    onFocus: _react2['default'].PropTypes.func,

	    disabled: _utilPropTypes2['default'].disabled,
	    readOnly: _utilPropTypes2['default'].readOnly
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    this.props.focused && this.focus();
	  },

	  render: function render() {
	    var value = this.props.value,
	        placeholder = this.props.placeholder,
	        size = Math.max((value || placeholder).length, 1) + 1;

	    return _react2['default'].createElement('input', babelHelpers._extends({}, this.props, {
	      className: 'rw-input',
	      autoComplete: 'off',
	      'aria-disabled': this.props.disabled,
	      'aria-readonly': this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      size: size
	    }));
	  },

	  focus: function focus() {
	    _utilCompat2['default'].findDOMNode(this).focus();
	  }

	});
	module.exports = exports['default'];

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _utilWidgetHelpers = __webpack_require__(38);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilInteraction = __webpack_require__(47);

	var optionId = function optionId(id, idx) {
	  return id + '__option__' + idx;
	};

	exports['default'] = _react2['default'].createClass({

	  displayName: 'MultiselectTagList',

	  mixins: [__webpack_require__(49), __webpack_require__(40)()],

	  propTypes: {
	    value: _react2['default'].PropTypes.array,
	    focused: _react2['default'].PropTypes.number,

	    valueField: _react2['default'].PropTypes.string,
	    textField: _utilPropTypes2['default'].accessor,

	    valueComponent: _react2['default'].PropTypes.func,

	    disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	    readOnly: _utilPropTypes2['default'].readOnly.acceptsArray
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      ariaActiveDescendantKey: 'taglist'
	    };
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    var focused = this.props.focused;
	    var activeId = optionId(_utilWidgetHelpers.instanceId(this), focused);

	    this.ariaActiveDescendant(focused == null || _utilInteraction.isDisabledItem(focused, this.props) ? null : activeId);
	  },

	  render: function render() {
	    var _this = this;

	    var props = _util_2['default'].omit(this.props, ['value', 'disabled', 'readOnly']);
	    var _props = this.props;
	    var focused = _props.focused;
	    var value = _props.value;
	    var textField = _props.textField;
	    var ValueComponent = _props.valueComponent;

	    var id = _utilWidgetHelpers.instanceId(this);

	    return _react2['default'].createElement(
	      'ul',
	      babelHelpers._extends({}, props, {
	        role: 'listbox',
	        tabIndex: '-1',
	        className: 'rw-multiselect-taglist'
	      }),
	      value.map(function (item, i) {
	        var isDisabled = _utilInteraction.isDisabledItem(item, _this.props),
	            isReadonly = _utilInteraction.isReadOnlyItem(item, _this.props),
	            isFocused = !isDisabled && focused === i,
	            currentID = optionId(id, i);

	        return _react2['default'].createElement(
	          'li',
	          {
	            key: i,
	            id: currentID,
	            tabIndex: '-1',
	            role: 'option',
	            className: _classnames2['default']({
	              'rw-state-focus': isFocused,
	              'rw-state-disabled': isDisabled,
	              'rw-state-readonly': isReadonly
	            })
	          },
	          ValueComponent ? _react2['default'].createElement(ValueComponent, { item: item }) : _utilDataHelpers.dataText(item, textField),
	          _react2['default'].createElement(
	            'span',
	            {
	              tabIndex: '-1',
	              onClick: !(isDisabled || isReadonly) ? _this._delete.bind(null, item) : undefined,
	              'aria-disabled': isDisabled,
	              'aria-label': 'Unselect',
	              disabled: isDisabled
	            },
	            _react2['default'].createElement(
	              'span',
	              { className: 'rw-tag-btn', 'aria-hidden': 'true' },
	              '×'
	            )
	          )
	        );
	      })
	    );
	  },

	  _delete: function _delete(val) {
	    this.props.onDelete(val);
	  },

	  remove: function remove(idx) {
	    var val = this.props.value[idx];

	    if (val && !(_utilInteraction.isDisabledItem(val, this.props) || _utilInteraction.isReadOnlyItem(val, this.props))) this.props.onDelete(val);
	  },

	  removeNext: function removeNext() {
	    var val = this.props.value[this.props.value.length - 1];

	    if (val && !(_utilInteraction.isDisabledItem(val, this.props) || _utilInteraction.isReadOnlyItem(val, this.props))) this.props.onDelete(val);
	  },

	  clear: function clear() {
	    this.setState({ focused: null });
	  },

	  first: function first() {
	    var idx = 0,
	        value = this.props.value,
	        l = value.length;

	    while (idx < l && _utilInteraction.isDisabledItem(value[idx], this.props)) idx++;

	    return idx !== l ? idx : null;
	  },

	  last: function last() {
	    var value = this.props.value,
	        idx = value.length - 1;

	    while (idx > -1 && _utilInteraction.isDisabledItem(value[idx], this.props)) idx--;

	    return idx >= 0 ? idx : null;
	  },

	  next: function next(current) {
	    var nextIdx = current + 1,
	        value = this.props.value,
	        l = value.length;

	    while (nextIdx < l && _utilInteraction.isDisabledItem(nextIdx, this.props)) nextIdx++;

	    if (current === null || nextIdx >= l) return null;

	    return nextIdx;
	  },

	  prev: function prev(current) {
	    var nextIdx = current,
	        value = this.props.value;

	    if (nextIdx === null || nextIdx === 0) nextIdx = value.length;

	    nextIdx--;

	    while (nextIdx > -1 && _utilInteraction.isDisabledItem(value[nextIdx], this.props)) nextIdx--;

	    return nextIdx >= 0 ? nextIdx : null;
	  }
	});
	module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var babelHelpers = __webpack_require__(2);

	exports.__esModule = true;

	var _react = __webpack_require__(21);

	var _react2 = babelHelpers.interopRequireDefault(_react);

	var _util_ = __webpack_require__(20);

	var _util_2 = babelHelpers.interopRequireDefault(_util_);

	var _classnames = __webpack_require__(26);

	var _classnames2 = babelHelpers.interopRequireDefault(_classnames);

	var _uncontrollable = __webpack_require__(44);

	var _uncontrollable2 = babelHelpers.interopRequireDefault(_uncontrollable);

	var _utilCompat = __webpack_require__(31);

	var _utilCompat2 = babelHelpers.interopRequireDefault(_utilCompat);

	var _utilPropTypes = __webpack_require__(33);

	var _utilPropTypes2 = babelHelpers.interopRequireDefault(_utilPropTypes);

	var _List = __webpack_require__(35);

	var _List2 = babelHelpers.interopRequireDefault(_List);

	var _utilValidateListInterface = __webpack_require__(43);

	var _utilValidateListInterface2 = babelHelpers.interopRequireDefault(_utilValidateListInterface);

	var _domHelpersUtilScrollTo = __webpack_require__(52);

	var _domHelpersUtilScrollTo2 = babelHelpers.interopRequireDefault(_domHelpersUtilScrollTo);

	var _utilDataHelpers = __webpack_require__(37);

	var _utilInteraction = __webpack_require__(47);

	var _utilWidgetHelpers = __webpack_require__(38);

	var omit = _util_2['default'].omit;
	var pick = _util_2['default'].pick;

	var propTypes = {

	  data: _react2['default'].PropTypes.array,
	  value: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.any, _react2['default'].PropTypes.array]),
	  onChange: _react2['default'].PropTypes.func,
	  onMove: _react2['default'].PropTypes.func,

	  multiple: _react2['default'].PropTypes.bool,

	  itemComponent: _utilPropTypes2['default'].elementType,
	  listComponent: _utilPropTypes2['default'].elementType,

	  valueField: _react2['default'].PropTypes.string,
	  textField: _utilPropTypes2['default'].accessor,

	  busy: _react2['default'].PropTypes.bool,

	  filter: _react2['default'].PropTypes.string,
	  delay: _react2['default'].PropTypes.number,

	  disabled: _utilPropTypes2['default'].disabled.acceptsArray,
	  readOnly: _utilPropTypes2['default'].readOnly.acceptsArray,

	  messages: _react2['default'].PropTypes.shape({
	    emptyList: _react2['default'].PropTypes.string
	  })
	};

	var SelectList = _react2['default'].createClass(babelHelpers.createDecoratedObject([{
	  key: 'displayName',
	  initializer: function initializer() {
	    return 'SelectList';
	  }
	}, {
	  key: 'propTypes',
	  initializer: function initializer() {
	    return propTypes;
	  }
	}, {
	  key: 'mixins',
	  initializer: function initializer() {
	    return [__webpack_require__(48), __webpack_require__(56), __webpack_require__(40)()];
	  }
	}, {
	  key: 'getDefaultProps',
	  value: function getDefaultProps() {
	    return {
	      delay: 250,
	      value: [],
	      data: [],
	      ariaActiveDescendantKey: 'selectlist',
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    };
	  }
	}, {
	  key: 'getDefaultState',
	  value: function getDefaultState(props) {
	    var data = props.data;
	    var value = props.value;
	    var valueField = props.valueField;
	    var multiple = props.multiple;
	    var isRadio = !multiple;
	    var values = _util_2['default'].splat(value);
	    var first = isRadio && _utilDataHelpers.dataItem(data, values[0], valueField);

	    first = isRadio && first ? first : (this.state || {}).focusedItem || null;

	    return {
	      focusedItem: first,
	      dataItems: !isRadio && values.map(function (item) {
	        return _utilDataHelpers.dataItem(data, item, valueField);
	      })
	    };
	  }
	}, {
	  key: 'getInitialState',
	  value: function getInitialState() {
	    var state = this.getDefaultState(this.props);

	    state.ListItem = getListItem(this);

	    return state;
	  }
	}, {
	  key: 'componentWillReceiveProps',
	  value: function componentWillReceiveProps(nextProps) {
	    return this.setState(this.getDefaultState(nextProps));
	  }
	}, {
	  key: 'componentDidMount',
	  value: function componentDidMount() {
	    _utilValidateListInterface2['default'](this.refs.list);
	  }
	}, {
	  key: 'render',
	  value: function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var tabIndex = _props.tabIndex;
	    var busy = _props.busy;
	    var List = _props.listComponent;

	    List = List || _List2['default'];

	    var elementProps = omit(this.props, Object.keys(propTypes));
	    var listProps = pick(this.props, Object.keys(List.propTypes));

	    var _state = this.state;
	    var ListItem = _state.ListItem;
	    var focusedItem = _state.focusedItem;
	    var focused = _state.focused;

	    var items = this._data(),
	        listID = _utilWidgetHelpers.instanceId(this, '_listbox');

	    focusedItem = focused && !_utilInteraction.isDisabled(this.props) && !_utilInteraction.isReadOnly(this.props) && focusedItem;

	    return _react2['default'].createElement(
	      'div',
	      babelHelpers._extends({}, elementProps, {
	        onKeyDown: this._keyDown,
	        onFocus: this._focus.bind(null, true),
	        onBlur: this._focus.bind(null, false),
	        role: 'radiogroup',
	        'aria-busy': !!busy,
	        'aria-disabled': _utilInteraction.isDisabled(this.props),
	        'aria-readonly': _utilInteraction.isReadOnly(this.props),
	        tabIndex: '-1',
	        className: _classnames2['default'](className, 'rw-widget', 'rw-selectlist', {
	          'rw-state-focus': focused,
	          'rw-state-disabled': _utilInteraction.isDisabled(this.props),
	          'rw-state-readonly': _utilInteraction.isReadOnly(this.props),
	          'rw-rtl': this.isRtl(),
	          'rw-loading-mask': busy
	        })
	      }),
	      _react2['default'].createElement(List, babelHelpers._extends({}, listProps, {
	        ref: 'list',
	        id: listID,
	        role: 'radiogroup',
	        tabIndex: tabIndex || '0',
	        data: items,
	        focused: focusedItem,
	        optionComponent: ListItem,
	        itemComponent: this.props.itemComponent,
	        onMove: this._scrollTo
	      }))
	    );
	  }
	}, {
	  key: '_scrollTo',
	  value: function _scrollTo(selected, list) {
	    var handler = this.props.onMove;

	    if (handler) handler(selected, list);else {
	      this._scrollCancel && this._scrollCancel();
	      // default behavior is to scroll the whole page not just the widget
	      this._scrollCancel = _domHelpersUtilScrollTo2['default'](selected);
	    }
	  }
	}, {
	  key: '_keyDown',
	  decorators: [_utilInteraction.widgetEditable],
	  value: function _keyDown(e) {
	    var _this = this;

	    var key = e.key;
	    var _props2 = this.props;
	    var valueField = _props2.valueField;
	    var multiple = _props2.multiple;
	    var list = this.refs.list;
	    var focusedItem = this.state.focusedItem;
	    var props = this.props;

	    var moveItem = function moveItem(dir, item) {
	      return _utilInteraction.move(dir, item, props, list);
	    };
	    var change = function change(item) {
	      if (item) _this._change(item, multiple ? !_utilInteraction.contains(item, _this._values(), valueField) // toggle value
	      : true);
	    };

	    _utilWidgetHelpers.notify(this.props.onKeyDown, [e]);

	    if (e.defaultPrevented) return;

	    if (key === 'End') {
	      e.preventDefault();

	      if (multiple) this.setState({ focusedItem: moveItem('prev', null) });else change(moveItem('prev', null));
	    } else if (key === 'Home') {
	      e.preventDefault();

	      if (multiple) this.setState({ focusedItem: moveItem('next', null) });else change(moveItem('next', null));
	    } else if (key === 'Enter' || key === ' ') {
	      e.preventDefault();
	      change(focusedItem);
	    } else if (key === 'ArrowDown' || key === 'ArrowRight') {
	      e.preventDefault();

	      if (multiple) this.setState({ focusedItem: moveItem('next', focusedItem) });else change(moveItem('next', focusedItem));
	    } else if (key === 'ArrowUp' || key === 'ArrowLeft') {
	      e.preventDefault();

	      if (multiple) this.setState({ focusedItem: moveItem('prev', focusedItem) });else change(moveItem('prev', focusedItem));
	    } else if (multiple && e.keyCode === 65 && e.ctrlKey) {
	      e.preventDefault();
	      this.selectAll();
	    } else this.search(String.fromCharCode(e.keyCode));
	  }
	}, {
	  key: 'selectAll',
	  value: function selectAll() {
	    var _this2 = this;

	    var _props3 = this.props;
	    var disabled = _props3.disabled;
	    var readOnly = _props3.readOnly;
	    var valueField = _props3.valueField;
	    var values = this.state.dataItems;
	    var data = this._data();
	    var blacklist;

	    disabled = disabled || readOnly;
	    disabled = Array.isArray(disabled) ? disabled : [];
	    //disabled values that are not selected
	    blacklist = disabled.filter(function (v) {
	      return !_utilInteraction.contains(v, values, valueField);
	    });
	    data = data.filter(function (v) {
	      return !_utilInteraction.contains(v, blacklist, valueField);
	    });

	    if (data.length === values.length) {
	      data = disabled.filter(function (item) {
	        return _utilInteraction.contains(item, values, valueField);
	      });
	      data = data.map(function (item) {
	        return _utilDataHelpers.dataItem(_this2._data(), item, valueField);
	      });
	    }

	    _utilWidgetHelpers.notify(this.props.onChange, [data]);
	  }
	}, {
	  key: '_change',
	  value: function _change(item, checked) {
	    var multiple = this.props.multiple;
	    var values = this.state.dataItems;

	    multiple = !!multiple;

	    if (!multiple) return _utilWidgetHelpers.notify(this.props.onChange, checked ? item : null);

	    values = checked ? values.concat(item) : values.filter(function (v) {
	      return v !== item;
	    });

	    _utilWidgetHelpers.notify(this.props.onChange, [values || []]);
	  }
	}, {
	  key: '_focus',
	  decorators: [_utilInteraction.widgetEnabled],
	  value: function _focus(focused, e) {
	    var _this3 = this;

	    if (focused) _utilCompat2['default'].findDOMNode(this.refs.list).focus();

	    this.setTimeout('focus', function () {
	      if (focused !== _this3.state.focused) {
	        _utilWidgetHelpers.notify(_this3.props[focused ? 'onFocus' : 'onBlur'], e);
	        _this3.setState({ focused: focused });
	      }
	    });
	  }
	}, {
	  key: 'search',
	  value: function search(character) {
	    var _this4 = this;

	    var word = ((this._searchTerm || '') + character).toLowerCase(),
	        list = this.refs.list;

	    this._searchTerm = word;

	    this.setTimeout('search', function () {
	      var focusedItem = list.next(_this4.state.focusedItem, word);

	      _this4._searchTerm = '';

	      if (focusedItem) _this4.setState({ focusedItem: focusedItem });
	    }, this.props.delay);
	  }
	}, {
	  key: '_data',
	  value: function _data() {
	    return this.props.data;
	  }
	}, {
	  key: '_values',
	  value: function _values() {
	    return this.props.multiple ? this.state.dataItems : this.props.value;
	  }
	}]));

	function getListItem(parent) {

	  return _react2['default'].createClass({

	    displayName: 'SelectItem',

	    render: function render() {
	      var _props4 = this.props;
	      var children = _props4.children;
	      var focused = _props4.focused;
	      var selected = _props4.selected;
	      var item = _props4.dataItem;
	      var props = babelHelpers.objectWithoutProperties(_props4, ['children', 'focused', 'selected', 'dataItem']);
	      var _parent$props = parent.props;
	      var multiple = _parent$props.multiple;
	      var _parent$props$name = _parent$props.name;
	      var name = _parent$props$name === undefined ? _utilWidgetHelpers.instanceId(parent, '_name') : _parent$props$name;

	      var checked = _utilInteraction.contains(item, parent._values(), parent.props.valueField),
	          change = parent._change.bind(null, item),
	          disabled = _utilInteraction.isDisabledItem(item, parent.props),
	          readonly = _utilInteraction.isReadOnlyItem(item, parent.props),
	          type = multiple ? 'checkbox' : 'radio';

	      return _react2['default'].createElement(
	        'li',
	        babelHelpers._extends({}, props, {
	          tabIndex: '-1',
	          role: type,
	          'aria-checked': !!checked,
	          'aria-disabled': disabled || readonly,
	          className: _classnames2['default']('rw-list-option', {
	            'rw-state-focus': focused,
	            'rw-state-selected': selected,
	            'rw-state-disabled': disabled,
	            'rw-state-readonly': readonly
	          })
	        }),
	        _react2['default'].createElement(
	          'label',
	          null,
	          _react2['default'].createElement('input', {
	            name: name,
	            tabIndex: '-1',
	            role: 'presentation',
	            type: type,
	            onChange: onChange,
	            checked: checked,
	            disabled: disabled || readonly
	          }),
	          children
	        )
	      );

	      function onChange(e) {
	        if (!disabled && !readonly) change(e.target.checked);
	      }
	    }
	  });
	}

	exports['default'] = _uncontrollable2['default'](SelectList, { value: 'onChange' }, ['selectAll']);
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
>>>>>>> origin/master
