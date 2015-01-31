/*! v"2.2.1" | (c) 2015 Jason Quense | https://github.com/jaquense/react-widgets/blob/master/License.txt */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "docs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , $__0= 
	   
	   
	   
	   
	   
	      __webpack_require__(13),Route=$__0.Route,run=$__0.run,HistoryLocation=$__0.HistoryLocation,DefaultRoute=$__0.DefaultRoute,RouteHandler=$__0.RouteHandler,Navigation=$__0.Navigation,Link=$__0.Link
	
	  , Navbar         = __webpack_require__(3)
	  , Tbs            = __webpack_require__(2)
	  , GettingStarted = __webpack_require__(4)
	  , DropdownList   = __webpack_require__(5)
	  , ComboBox       = __webpack_require__(6)
	  , MultiSelect    = __webpack_require__(7)
	  , SelectList     = __webpack_require__(8)
	  , Calendar       = __webpack_require__(9)
	  , DatePicker     = __webpack_require__(10)
	  , NumberPicker   = __webpack_require__(11)
	  , Migration      = __webpack_require__(12);
	
	//require('../docs.css')
	
	var locations = [
	      '#intro','#dropdown-list', '#combobox',
	      '#number-picker', '#selectlist', 
	      '#calendar', '#date-picker'];
	
	var Docs = React.createClass({
	
	  displayName: 'DocPage',
	
	  mixins: [ Navigation ],
	
	  getInitialState: function () {
	    return {
	      sideHref: '#intro',
	    }
	  },
	
	  componentDidMount: function(){
	    if(location.hash)
	      this.setState({ sideHref: location.hash.split('/')[0] })
	  },
	
	  render: function(){
	    var href = this.state.sideHref;
	
	    return (
	      React.createElement("div", {style: { marginTop: 72}}, 
	        React.createElement(Navbar, {page: this.props.page}), 
	        React.createElement("div", {className: "container"}, 
	          React.createElement("aside", {className: "col-sm-3 section"}, 
	            React.createElement("div", {className: "nav-aside section-inner"}, 
	              React.createElement("nav", null, 
	                React.createElement("ul", {className: "nav"}, 
	                  React.createElement("li", null, 
	                    React.createElement(Link, {to: "/getting-started"}, "Getting Started"), 
	                    React.createElement("ul", {className: "nav"}, 
	                      React.createElement("li", null, React.createElement(Link, {to: "/getting-started/install"}, "Install")), 
	                      React.createElement("li", null, React.createElement(Link, {to: "/getting-started/deps"}, "External Dependencies")), 
	                      React.createElement("li", null, React.createElement(Link, {to: "/getting-started/browser"}, "Older Browser Support")), 
	                      React.createElement("li", null, React.createElement(Link, {to: "/getting-started/access"}, "Accessibility")), 
	                      React.createElement("li", null, React.createElement(Link, {to: "/getting-started/style"}, "Styling"))
	                    )
	                  ), 
	                  React.createElement("li", null, React.createElement(Link, {to: "dropdown-list"}, "Dropdown List")), 
	                  React.createElement("li", null, React.createElement(Link, {to: "combobox", href: "#combobox"}, "Combobox")), 
	                  React.createElement("li", null, React.createElement(Link, {to: "number-picker", href: "#number-picker"}, "Number Picker")), 
	                  React.createElement("li", null, React.createElement(Link, {to: "multiselect", href: "#multiselect"}, "Multiselect")), 
	                  React.createElement("li", null, React.createElement(Link, {to: "selectlist"}, "SelectList")), 
	                  React.createElement("li", null, React.createElement(Link, {to: "calendar"}, "Calendar")), 
	                  React.createElement("li", null, React.createElement(Link, {to: "datetime-picker"}, 'Date & Time Picker')), 
	                  React.createElement("li", null, React.createElement(Link, {to: "migration"}, "Migrating to 2.x"))
	                )
	              )
	            )
	          ), 
	          React.createElement("article", {className: "col-sm-9 section"}, 
	            React.createElement("div", {className: "section-inner"}, 
	              React.createElement(RouteHandler, null), 
	              React.createElement("div", {className: "clearfix", style: { marginTop: 20}}, 
	                 locations.indexOf(href) > 0 && 
	                  React.createElement("button", {type: "button", className: "btn btn-link pull-left", onClick: this.prev}, "« prev"), 
	                
	                 locations.indexOf(href) < (locations.length - 1) && 
	                  React.createElement("button", {type: "button", className: "btn btn-link pull-right", onClick: this.next}, "next »")
	                
	              )
	            )
	          )
	        )
	      )
	    )
	  },
	  prev: function(){
	    var idx = locations.indexOf(this.state.sideHref)
	      , href = locations[Math.max(idx - 1, 0)];
	
	    this.navigate(href)
	  },
	
	  next: function(){
	    var idx = locations.indexOf(this.state.sideHref)
	      , href = locations[Math.min(idx + 1, locations.length -1)]
	
	    this.navigate(href)
	  },
	
	  handleNavItemSelect: function (key) {
	    this.transitionTo(key)
	  },
	
	  navigate: function(href){
	    // var change = this.state.sideHref.split('/')[0] !== href.split('/')[0]
	    // this.setState({ sideHref: href });
	    // window.location = href;
	    // if(change)
	    //   window.scrollTo(0, 0)
	  }
	})
	
	
	
	var routes = (
	  React.createElement(Route, {name: "app", path: "/", handler: Docs}, 
	    React.createElement(DefaultRoute, {handler: GettingStarted}), 
	
	    React.createElement(Route, {name: "getting-started", path: "getting-started", handler: GettingStarted}, 
	      React.createElement(Route, {path: ":topic", handler: GettingStarted})
	    ), 
	
	    React.createElement(Route, {name: "dropdown-list", path: "dropdown-list", handler: DropdownList}, 
	      React.createElement(Route, {path: ":topic", handler: DropdownList})
	    ), 
	    React.createElement(Route, {name: "combobox", handler: ComboBox}, 
	      React.createElement(Route, {path: ":topic", handler: ComboBox})
	    ), 
	    React.createElement(Route, {name: "multiselect", handler: MultiSelect}, 
	      React.createElement(Route, {path: ":topic", handler: MultiSelect})
	    ), 
	    React.createElement(Route, {name: "selectlist", handler: SelectList}, 
	      React.createElement(Route, {path: ":topic", handler: SelectList})
	    ), 
	    React.createElement(Route, {name: "calendar", handler: Calendar}, 
	      React.createElement(Route, {path: ":topic", handler: Calendar})
	    ), 
	    React.createElement(Route, {name: "datetime-picker", handler: DatePicker}, 
	      React.createElement(Route, {path: ":topic", handler: DatePicker})
	    ), 
	    React.createElement(Route, {name: "number-picker", handler: NumberPicker}, 
	      React.createElement(Route, {path: ":topic", handler: NumberPicker})
	    ), 
	
	    React.createElement(Route, {name: "migration", handler: Migration})
	  )
	);
	
	run(routes, function (Handler, state) {
	  React.render(React.createElement(Handler, {params: state.params}), document.body);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = window.React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	
	module.exports = {
		Button: 		__webpack_require__(47),
		ButtonGroup: 	__webpack_require__(48),
	
		DropdownButton: __webpack_require__(49),
		MenuItem: 		__webpack_require__(50),
	
		Nav: __webpack_require__(51),
		Navbar: __webpack_require__(52),
		SubNav: __webpack_require__(53),
		NavItem: __webpack_require__(54),
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React   = __webpack_require__(1)
	var Tbs     = __webpack_require__(2)
	
	
	module.exports = React.createClass({
	
	  displayName: 'page',
	
	  render: function(){
	
	    return (
	      React.createElement(Tbs.Navbar, {fixedTop: true, activeKey: this.props.page, brand: "React Widgets"}, 
	        React.createElement(Tbs.Nav, {role: "navigation", selectKey: 0, activeKey: "docs", className: "navbar-nav main-nav"}, 
	          React.createElement(Tbs.NavItem, {key: "docs", href: "#"}, "Docs"), 
	          React.createElement(Tbs.NavItem, {key: "dl", href: "https://github.com/jquense/react-widgets/releases"}, "Download"), 
	          React.createElement(Tbs.NavItem, {key: "github", href: "https://github.com/jquense/react-widgets"}, "Github")
	        )
	      )
	    )
	  }
	})

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1);
	var EditableExample = __webpack_require__(15)
	
	var GettingStarted = React.createClass({displayName: 'GettingStarted',
	
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, "Getting Started ", React.createElement("small", {className: "pull-right", style: {marginTop: 15}}, "current version ", ("2.2.1"))), 
	        React.createElement("p", null, 
	          "React-widgets offers a ", 'set', " UI widgets, built from scratch with React. The suite is based on the excellent" + ' ' +
	          "work done by Kendo UI Core, and jQuery UI, but built as true components, and not library wrappers. By" + ' ' +
	          "building each widget entirely in React, it can leavage all of the benefits of the React ecosystem" + ' ' +
	          "and ", React.createElement("a", {href: "http://facebook.github.io/react/blog/2013/11/05/thinking-in-react.html", target: "_blank"}, 
	            "philosophy ", React.createElement("i", {className: "fa fa-external-link"})
	          ), "."
	        ), 
	        React.createElement("p", null, 
	          "A big thanks to both of these libraries for solving most of the difficult problems already, and providing an" + ' ' +
	          "excellent reference for what works, and what does not, in ui inputs."
	        ), 
	        React.createElement("p", null, 
	          "In keeping with the ", 
	          React.createElement("a", {href: "http://facebook.github.io/react/docs/forms.html#controlled-components", target: "_blank"}, 
	            "React approach ", React.createElement("i", {className: "fa fa-external-link"})
	          ), " to form input components, each widget can be ", React.createElement("em", null, "controlled"), " or ", React.createElement("em", null, "uncontrolled"), ". Like form inputs" + ' ' +
	          "the value/onChange prop pair provides the main interface for widget interaction. If a ", React.createElement("code", null, "value"), " prop" + ' ' +
	          "is ", 'set', " the widget's value is said to be ", React.createElement("em", null, "controlled"), ", meaning the parent is responsible for managing its" + ' ' +
	          "state. If the widget does not provide a ", React.createElement("code", null, "value"), " prop, the widget becomes ", React.createElement("em", null, "uncontrolled"), " or responsible" + ' ' +
	          "for managing its own value through internal state. To initialize an uncontrolled widget with a value you can use" + ' ' +
	            "the ", React.createElement("code", null, "defaultValue"), " prop. In addition to the ", React.createElement("code", null, "value"), " prop, widgets may allow other props" + ' ' +
	          "(such as ", React.createElement("code", null, "open"), " or ", React.createElement("code", null, "search"), ") to be controlled by the parent component."
	        ), 
	        React.createElement("p", null, 
	          "Some widgets can also be \"bound\" to a ", 'set', " of data (traditionally an array of models) through" + ' ' +
	          "a ", React.createElement("code", null, "data"), " prop. While they work just as well with data primitives such as strings, numbers, and" + ' ' +
	          "arrays, they really shine through the use of the ", React.createElement("code", null, "valueField"), " and ", React.createElement("code", null, "textField"), " props," + ' ' +
	          "which offer a quick way to display complex data structures."
	        ), 
	
	        React.createElement("h2", {id: "intro/install", className: "prop-header"}, "Install ", React.createElement("a", null)), 
	        React.createElement("p", null, 
	          "The prefered way to install is NPM (", React.createElement("code", null, "npm install react-widgets"), ") and make use of something like Webpack or" + ' ' +
	          "Browserify to bundle the library. There is also a traditional browser build available for" + ' ' + 
	          "download in the ", React.createElement("strong", null, "browser"), " folder. The browser build does not bundle any dependencies, and" + ' ' +
	          "attaches itself to the ", React.createElement("code", null, "window"), " as ", React.createElement("code", null, "ReactWidgets")
	        ), 
	        React.createElement("p", null, 
	          "Compiled CSS, images, and fonts are found in the ", React.createElement("code", null, "dist"), " directory." + ' ' +
	          "Included icons are provided by - ", React.createElement("a", {href: "http://fontawesome.io"}, "Font Awesome by Dave Gandy")
	        ), 
	        React.createElement("strong", null, 
	          "Note: versions prior to 1.1.0 require a build step (transpilation from JSX) when using the NPM package." + ' ' +
	          "As of 1.1.0 the package comes precompiled, and no build step is needed."
	        ), 
	
	        React.createElement("h2", {id: "intro/deps", className: "prop-header"}, "External Dependencies"), 
	        React.createElement("p", null, 
	          "React-widgets ", React.createElement("b", null, "2.x"), " is compatible with React ", React.createElement("b", null, "0.12.0+"), ", while the ", React.createElement("b", null, "1.x"), " branch supports" + ' ' +
	           "React ", React.createElement("b", null, "0.9.0"), " to ", React.createElement("b", null, "0.10.0"), ". Either branch" + ' ' +
	           "expects React to be bundled by you. Consumers of the NPM package should note that React is not listed as direct," + ' ' + 
	           "or peer dependency. This is to help reduce the friction that Peer Dependencies can cause." + ' ' + 
	           "This means that NPM will not warn you if you try to use react-widgets with an incompatible React version."
	        ), 
	        React.createElement("p", null, 
	          "If you use Browserify or Webpack to build your projects, the dependencies listed below will automatically be" + ' ' +
	          "included. They are listed for the sake of those who wish to externalize the lib dependencies to reduce" + ' ' +
	          "duplication, or wish to use a different, compatible, library.", 
	
	          React.createElement("ul", null, 
	            React.createElement("li", null, 
	              React.createElement("a", {href: "https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468"}, "Globalize"), " " + ' ' +
	              "used for date and number localization. Requires a 0.x.x version (not the upcoming 1.0.0)"
	            )
	          )
	        ), 
	        React.createElement("h2", {id: "intro/browser"}, "Older Browser Support"), 
	        React.createElement("p", null, 
	          "Rather than including an entire utility library, like underscore, react widgets takes a hint from React itself," + ' ' + 
	          "and instead relies on es5 (and transpiled es6) functionality. For most browsers this is will not be an issue, as es5" + ' ' + 
	          "is ", React.createElement("a", {href: "http://kangax.github.io/compat-table/es5/"}, "very well supported"), " by modern browsers. However older" + ' ' + 
	          "browsers will need the required functionality polyfilled. In most clases React already requires most of the needed shims" + ' ' + 
	          "(", 
	            React.createElement("a", {target: "_blank", href: "http://facebook.github.io/react/docs/working-with-the-browser.html#polyfills-needed-to-support-older-browsers"}, 
	            "see here ", React.createElement("i", {className: "fa fa-external-link"})
	          ), "). If you are already including ", React.createElement("a", {href: "https://github.com/es-shims/es5-shim"}, "kriskowal's es5-shim"), " then" + ' ' + 
	          "react-widgets propbably has everything it needs." + ' ' +
	
	          "For those interested in the specific additions needed by react-widgets they are:", 
	          React.createElement("ul", null, 
	            React.createElement("li", null, React.createElement("code", null, "Array.prototype.some")), 
	            React.createElement("li", null, React.createElement("code", null, "Array.prototype.filter")), 
	            React.createElement("li", null, React.createElement("code", null, "Array.prototype.reduce"))
	          ), 
	
	          "You can use the excellent ", React.createElement("a", {href: "https://github.com/es-shims/es5-shim"}, "kriskowal's es5-shim"), " for all of these."
	        ), 
	
	        React.createElement("h2", {id: "intro/access"}, "Accessibility and Read Direction"), 
	        React.createElement("p", null, 
	          "React-widgets tries to be as inclusive and wide reaching as possible. Along with an included solution for" + ' ' +
	          "date and number localization, there is first class support for cultures and languages that read" + ' ' +
	          "right to left (with the ", React.createElement("code", null, "isRtl"), " prop)."
	        ), 
	        React.createElement("p", null, 
	          "Each widget also has appropriate ARIA roles and attributes for the benefit of screen readers and visually" + ' ' +
	          "impaired users. Keyboard only navigation of widgets is also supported, for those who prefer to not," + ' ' +
	          "or cannot use a mouse. to help ensure maximum accessibility, every widget should have" + ' ' +
	          "an ", React.createElement("code", null, "id"), " attribute. If you do not wish to provide an id attrbute, the widget will generate" + ' ' +
	          "the necessary id's to properly label and annotate the widget ARIA."
	        ), 
	
	        React.createElement("h2", {id: "intro/style", className: "prop-header"}, "Styling"), 
	        React.createElement("p", null, 
	          "Styling each widget should be a simple matter of adjusting the relevant LESS variables to suit your needs." + ' ' +
	          "Included by default is a \"Twitter Bootstrap\" theme that mimics the look and feel of Twitter Bootstrap 3.0." + ' ' +
	          "This is less an actual theme and more a neutral starting point for creating your own theme.", 
	
	          React.createElement("ul", null, 
	            React.createElement("li", null, 
	              "Widget styles with LESS variables (see ", React.createElement("code", null, "./lib/less/bootstrap-theme.less"), " for reference)."
	            ), 
	            React.createElement("li", null, 
	              "Icon fonts can be swapped out in the ", React.createElement("code", null, "./lib/less/icons.less"), " file"
	            )
	          )
	        )
	      )
	    );
	  }
	
	});
	
	module.exports = GettingStarted;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , EditableExample = __webpack_require__(15)
	  , MenuItem = __webpack_require__(16)
	  , DDButton = __webpack_require__(2).DropdownButton
	  , PropHeader = __webpack_require__(17)
	  , DropdownListExample = __webpack_require__(20)
	
	var prefix = 'dropdown-list/'
	var widgetName = 'DropdownList'
	var DropdownList = React.createClass({displayName: 'DropdownList',
	
	  mixins: [ __webpack_require__(14)(prefix) ],
	  
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Dropdown List", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, null, "value"), 
	              React.createElement(MenuItem, null, "onChange"), 
	              React.createElement(MenuItem, null, "onSelect"), 
	              React.createElement(MenuItem, null, "data"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "valueField"), 
	              React.createElement(MenuItem, null, "textField"), 
	              React.createElement(MenuItem, null, "valueComponent"), 
	              React.createElement(MenuItem, null, "itemComponent"), 
	              React.createElement(MenuItem, null, "groupComponent"), 
	              React.createElement(MenuItem, null, "groupBy"), 
	
	              React.createElement(MenuItem, null, "open"), 
	              React.createElement(MenuItem, null, "onToggle"), 
	
	              React.createElement(MenuItem, null, "busy"), 
	              React.createElement(MenuItem, null, "duration"), 
	              React.createElement(MenuItem, null, "isRtl"), 
	              React.createElement(MenuItem, null, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "Keyboard Navigation")
	            )
	          )
	        ), 
	        React.createElement("p", null, 
	          "A ", React.createElement("code", null, '<select/>'), " tag replacement that offers additional functionality. the Dropdown list"
	        ), 
	        React.createElement(DropdownListExample, null), 
	
	        React.createElement("h2", null, "Props"), 
	
	        React.createElement(PropHeader, {type: "Any", handler: "onChange", controllable: true}, "value"), 
	        React.createElement("p", null, 
	          "The current value of the $", widgetName, ". This can be an object (such as a member of the ", React.createElement("code", null, "data"), " array)" + ' ' +
	          "or a primitive value, hinted to by the ", React.createElement("code", null, "valueField"), ". The widget value does not need to be in" + ' ' +
	          "the ", React.createElement("code", null, "data"), " array; widgets can have values that are not in their list."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(26)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Function(Any value)"}, "onChange"), 
	        React.createElement("p", null, 
	          "Change event Handler that is called when the value is changed."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(27)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Function(Any value)"}, "onSelect"), 
	        React.createElement("p", null, 
	          "This handler fires when an item has been selected from the list. It fires before the ", React.createElement("code", null, "onChange"), " handler, and fires" + ' ' + 
	          "regardless of whether the value has actually changed."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(28)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Array<Any>"}, "data"), 
	        React.createElement("p", null, 
	          "provide an array of possible values for the DropdownList. If an array of ", React.createElement("code", null, "objects"), " is provided you" + ' ' +
	          "should use the ", React.createElement("code", null, "valueField"), " and ", React.createElement("code", null, "textField"), " props, to specify which object" + ' ' +
	          "properties comprise the value field (such as an id) and the field used to label the item."
	        ), 
	
	        React.createElement(PropHeader, {type: "String"}, "valueField"), 
	        React.createElement("p", null, 
	          "A property name of a uniquely identifying field in the ", React.createElement("code", null, "data"), " array. If no valueField is provided," + ' ' +
	          "the widget will use strict equality checks to locate the data item, if it exists."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(29)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "String"}, "textField"), 
	        React.createElement("p", null, 
	          "This prop determines which data item field to display in the combobox and selected item. The ", React.createElement("code", null, "textField"), " prop" + ' ' + 
	          "may also also used as to find an item in the list as you type."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(30)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Component"}, "valueComponent"), 
	        React.createElement("p", null, 
	          "This component is used to render the selected value of the combobox. The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(37)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Component"}, "itemComponent"), 
	        React.createElement("p", null, 
	          "This component is used to render each possible item in the DropdownList. The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(31)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "String | Function(Any dataItem)"}, "groupBy"), 
	        React.createElement("p", null, 
	          "Determines how to group the ", widgetName, " dropdown list. Providing a ", React.createElement("code", null, "string"), " will group" + ' ' + 
	          "the ", React.createElement("code", null, "data"), " array by that property. You can also provide a ", 'function', " which should return the group value."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(32)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Component"}, "groupComponent"), 
	        React.createElement("p", null, 
	          "This component is used to render each option group, when ", React.createElement("code", null, "groupBy"), " is specified. By" + ' ' + 
	          "default the ", React.createElement("code", null, "groupBy"), " value will be used."
	        ), 
	
	        React.createElement(EditableExample, {codeText: __webpack_require__(33)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Boolean"}, "open"), 
	        React.createElement("p", null, 
	          "Whether or not the ", widgetName, " is open. When unset (", React.createElement("code", null, "undefined"), ") the ", widgetName, " will handle the" + ' ' +
	          "opening and closing internally. The ", React.createElement("code", null, "defaultOpen"), " prop can be used to ", 'set', " an" + ' ' +
	          "initialization value for uncontrolled widgets."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(35)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Function(Boolean isOpen)"}, "onToggle"), 
	        React.createElement("p", null, 
	          "Called when the ", widgetName, " is about to open or close. ", React.createElement("code", null, "onToggle"), " should be used" + ' ' +
	          "when the ", React.createElement("code", null, "open"), " prop is ", 'set', " otherwise the widget open buttons won't work."
	        ), 
	
	
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, "busy"), 
	        React.createElement("p", null, 
	          "mark whether the widget is in a busy or loading state. If ", React.createElement("code", null, "true"), " the widget will display a spinner gif, useful" + ' ' +
	          "when loading data via an ajax call."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(36)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Number", default: "250"}, "duration"), 
	        React.createElement("p", null, 
	          "The speed, in milliseconds, of the dropdown animation."
	        ), 
	
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, "isRtl"), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	           "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	        React.createElement(PropHeader, {type: "Object"}, "messages"), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	
	        React.createElement(PropHeader, {type: "String", default: "\"Open Dropdown\""}, "messages.open"), 
	        React.createElement("p", null, 
	          "Dropdown button text for screen readers"
	        ), 
	
	        React.createElement("h2", {id:  prefix +"keyboard"}, "Keyboard Navigation"), 
	
	        React.createElement("ul", {className: "list-unstyled keyboard-list"}, 
	          React.createElement("li", null, React.createElement("kbd", null, "alt + down arrow"), " open dropdown"), 
	          React.createElement("li", null, React.createElement("kbd", null, "alt + up arrow"), " close dropdown"), 
	          React.createElement("li", null, React.createElement("kbd", null, "down arrow"), " move focus to next item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "up arrow"), " move focus to previous item"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "home"), " move focus to first item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "end"), " move focus to last item"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "enter"), " select focused item"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "any key"), " search list for item starting with key")
	        )
	      )
	    );
	  }
	
	});
	
	module.exports = DropdownList;
	


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , MenuItem = __webpack_require__(16)
	  , DDButton = __webpack_require__(2).DropdownButton
	  , PropHeader = __webpack_require__(17)
	  , EditableExample = __webpack_require__(15)
	  , ComboBoxExample = __webpack_require__(19);
	
	var prefix = 'combobox/'
	var widgetName = 'Combobox'
	var ComboBox = React.createClass({displayName: 'ComboBox',
	
	  mixins: [ __webpack_require__(14)(prefix) ],
	  
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Combobox", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, null, "value"), 
	              React.createElement(MenuItem, null, "onChange"), 
	              React.createElement(MenuItem, null, "onSelect"), 
	              React.createElement(MenuItem, null, "data"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "valueField"), 
	              React.createElement(MenuItem, null, "textField"), 
	              React.createElement(MenuItem, null, "itemComponent"), 
	              React.createElement(MenuItem, null, "groupComponent"), 
	              React.createElement(MenuItem, null, "groupBy"), 
	              
	              React.createElement(MenuItem, null, "suggest"), 
	              React.createElement(MenuItem, null, "filter"), 
	
	              React.createElement(MenuItem, null, "open"), 
	              React.createElement(MenuItem, null, "onToggle"), 
	
	              React.createElement(MenuItem, null, "busy"), 
	              React.createElement(MenuItem, null, "duration"), 
	              React.createElement(MenuItem, null, "isRtl"), 
	              React.createElement(MenuItem, null, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "Keyboard Navigation")
	            )
	          )
	        ), 
	        React.createElement("p", null, 
	          "Select an item from the list, or input a custom value. The combobox can also make suggestions as you type"
	        ), 
	        React.createElement(ComboBoxExample, null), 
	        
	        React.createElement("h2", null, "Props"), 
	        React.createElement(PropHeader, {type: "Any", handler: "onChange", controllable: true}, "value"), 
	        React.createElement("p", null, 
	          "The current value of the Combobox. This can be an object (such as a member of the ", React.createElement("code", null, "data"), " array)" + ' ' +
	          "or a primitive value, hinted to by the ", React.createElement("code", null, "valueField"), ". The widget value does not need to be in" + ' ' +
	          "the ", React.createElement("code", null, "data"), ", widgets can have values that are not in their list."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(26)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Function(Any value)"}, "onChange"), 
	        React.createElement("p", null, 
	          "Called when the value is changed. If the value is on of the ", React.createElement("code", null, "data"), " members" + ' ' +
	          "that item will be returned. In the case of a value not being found in the ", React.createElement("code", null, "data"), " array" + ' ' +
	          "the string value of the combobox will be returned."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(27)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Function(Any value)"}, "onSelect"), 
	        React.createElement("p", null, 
	          "This handler fires when an item has been selected from the list. It fires before the ", React.createElement("code", null, "onChange"), " handler, and fires" + ' ' + 
	          "regardless of whether the value has actually changed."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(28)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Array<Any>"}, "data"), 
	        React.createElement("p", null, 
	          "An array of possible values for the combobox. If an array of ", React.createElement("code", null, "objects"), " is provided you" + ' ' +
	          "should use  the ", React.createElement("code", null, "valueField"), " and ", React.createElement("code", null, "textField"), " props, to specify which object" + ' ' +
	          "properties comprise the value field (such as an id) and the field used to label the item."
	        ), 
	
	        React.createElement(PropHeader, {type: "String"}, "valueField"), 
	        React.createElement("p", null, 
	          "A property name of a uniquely identifying field in the ", React.createElement("code", null, "data"), " array. If no valueField is provided," + ' ' +
	          "the widget will use strict equality checks to locate the data item, if it exists."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(29)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "String"}, "textField"), 
	        React.createElement("p", null, 
	          "This prop determines which data item field to display in the dropdown list and the text value of combobox." + ' ' +
	          "This prop is unnecessary when an ", React.createElement("code", null, "itemComponent"), " is provided."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(30)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Component"}, "itemComponent"), 
	        React.createElement("p", null, 
	          "This component is used to render each possible item in the DropdownList. The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(31)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "String | Function(Any dataItem)"}, "groupBy"), 
	        React.createElement("p", null, 
	          "Determines how to group the ", widgetName, " dropdown list. Providing a ", React.createElement("code", null, "string"), " will group" + ' ' + 
	          "the ", React.createElement("code", null, "data"), " array by that property. You can also provide a ", 'function', " which should return the group value."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(32)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Component"}, "groupComponent"), 
	        React.createElement("p", null, 
	          "This component is used to render each option group, when ", React.createElement("code", null, "groupBy"), " is specified. By" + ' ' + 
	          "default the ", React.createElement("code", null, "groupBy"), " value will be used."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(33)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, "suggest"), 
	        React.createElement("p", null, 
	          "When ", React.createElement("code", null, "true"), " the Combobox will suggest, or fill in, values as you type. The suggestions" + ' ' +
	          "are always \"startsWith\", meaning it will search from the start of the ", React.createElement("code", null, "textField"), " property"
	        ), 
	
	        React.createElement(PropHeader, {type: "[Boolean, String, Function(String item)]", default: "false"}, "filter"), 
	        React.createElement("p", null, 
	          "Specify a filtering method used to reduce the items in the dropdown as you type. It can be used in conjuction with" + ' ' +
	          "the ", React.createElement("code", null, "suggest"), " prop or instead of it. There are a few prebuilt filtering methods that can be specified" + ' ' +
	          "by passing the ", React.createElement("code", null, "String"), " name. You can explicitly opt out of filtering by setting filter" + ' ' +
	          "to ", React.createElement("code", null, "false")
	        ), 
	        React.createElement("p", null, 
	          "To handle custom filtering techniques provide" + ' ' +
	          "a ", React.createElement("code", null, 'function'), " that returns ", React.createElement("code", null, "true"), " or ", React.createElement("code", null, "false"), " for each passed in item" + ' ' +
	          "(just like the ", React.createElement("a", {href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter"}, 
	          "array.filter"), " builtin)"
	        ), 
	        React.createElement("p", null, 
	          "Acceptable values for filter are: ", 
	          React.createElement("code", null, "false"), " ", React.createElement("code", null, "\"startsWith\""), " ", React.createElement("code", null, "\"endsWith\""), " ", React.createElement("code", null, "\"contains\""), " ", 
	          React.createElement("code", null, 'function(String item)')
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(34)(widgetName)}), 
	
	
	        React.createElement(PropHeader, {type: "Boolean"}, "open"), 
	        React.createElement("p", null, 
	          "Whether or not the ", widgetName, " is open. When unset (", React.createElement("code", null, "undefined"), ") the ", widgetName, " will handle the" + ' ' +
	          "opening and closing internally. The ", React.createElement("code", null, "defaultOpen"), " prop can be used to ", 'set', " an" + ' ' +
	          "initialization value for uncontrolled widgets."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(35)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Function(Boolean isOpen)"}, "onToggle"), 
	        React.createElement("p", null, 
	         "Called fires when the ", widgetName, " is about to open or close. ", React.createElement("code", null, "onToggle"), " should be used" + ' ' +
	          "when the ", React.createElement("code", null, "open"), " prop is ", 'set', " otherwise the widget will never open or close."
	        ), 
	
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, "busy"), 
	        React.createElement("p", null, 
	          "Mark whether the widget is in a busy or loading state. If ", React.createElement("code", null, "true"), " the widget will display a spinner gif, useful" + ' ' +
	          "when loading data via an ajax call."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(36)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Number", default: "250"}, "duration"), 
	        React.createElement("p", null, 
	          "The speed, in milliseconds, of the dropdown animation."
	        ), 
	
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, "isRtl"), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	           "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	
	        React.createElement(PropHeader, {type: "Object"}, "messages"), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	
	        React.createElement(PropHeader, {type: "String", default: "\"Open Combobox\""}, "messages.open"), 
	        React.createElement("p", null, 
	          "Combobox button text for screen readers"
	        ), 
	
	        React.createElement(PropHeader, {type: "String", default: "\"There are no items in this list\""}, "messages.emptyList"), 
	        React.createElement("p", null, 
	          "text to display when the ", React.createElement("code", null, "data"), " prop array is empty"
	        ), 
	
	        React.createElement(PropHeader, {type: "String", default: "\"The filter returned no results\""}, "messages.emptyFilter"), 
	        React.createElement("p", null, 
	          "text to display when the the current filter does not return any results"
	        ), 
	
	        React.createElement("h2", {id:  prefix +"keyboard"}, "Keyboard Navigation"), 
	
	        React.createElement("ul", {className: "list-unstyled keyboard-list"}, 
	          React.createElement("li", null, React.createElement("kbd", null, "alt + down arrow"), " open dropdown"), 
	          React.createElement("li", null, React.createElement("kbd", null, "alt + up arrow"), " close dropdown"), 
	          React.createElement("li", null, React.createElement("kbd", null, "down arrow"), " move focus to next item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "up arrow"), " move focus to previous item"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "home"), " move focus to first item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "end"), " move focus to last item"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "enter"), " select focused item"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "any key"), " search list for item starting with key")
	        )
	      )
	    );
	  }
	
	});
	
	module.exports = ComboBox;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Default = __webpack_require__(18)
	  , EditableExample = __webpack_require__(15)
	  , DDButton = __webpack_require__(2).DropdownButton
	  , MenuItem = __webpack_require__(16)
	  , PropHeader = __webpack_require__(17)
	  , MultiselectExample = __webpack_require__(21);
	
	var prefix = 'multiselect/';
	var widgetName = 'Multiselect'
	var Multiselect = React.createClass({displayName: 'Multiselect',
	
	  mixins: [ __webpack_require__(14)(prefix) ],
	  
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Multiselect", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, null, "value"), 
	              React.createElement(MenuItem, null, "onChange"), 
	              React.createElement(MenuItem, null, "onSelect"), 
	              React.createElement(MenuItem, null, "onCreate"), 
	              React.createElement(MenuItem, null, "customTags"), 
	              React.createElement(MenuItem, null, "data"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "valueField"), 
	              React.createElement(MenuItem, null, "textField"), 
	              React.createElement(MenuItem, null, "tagComponent"), 
	              React.createElement(MenuItem, null, "itemComponent"), 
	              
	              React.createElement(MenuItem, null, "groupComponent"), 
	              React.createElement(MenuItem, null, "groupBy"), 
	
	              React.createElement(MenuItem, null, "placeholder"), 
	
	              React.createElement(MenuItem, null, "open"), 
	              React.createElement(MenuItem, null, "onToggle"), 
	
	              React.createElement(MenuItem, null, "busy"), 
	              React.createElement(MenuItem, null, "disabled"), 
	              React.createElement(MenuItem, null, "readonly"), 
	              React.createElement(MenuItem, null, "duration"), 
	              React.createElement(MenuItem, null, "isRtl"), 
	              React.createElement(MenuItem, null, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "Keyboard Navigation")
	            )
	          )
	        ), 
	        React.createElement("p", null, 
	          "A select listbox alternative"
	        ), 
	        React.createElement(MultiselectExample, null), 
	
	        React.createElement("h2", null, "Props"), 
	        React.createElement(PropHeader, {type: "Array<Any>", handler: "onChange", controllable: true}, "value"), 
	        React.createElement("p", null, 
	          "The current values of the ", widgetName, ". The value should can ", React.createElement("code", null, "null"), ", or an array" + ' ' +
	          "of ", React.createElement("code", null, "valieField"), " values, or an array of objects (such as a few items in the ", React.createElement("code", null, "data"), " array)"
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(26)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "Function(Array<Any> values)"}, "onChange"), 
	        React.createElement("p", null, 
	          "change event Handler that is called when the value is changed. The handler is called with an array of values"
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(27)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "Function(Any value)"}, "onSelect"), 
	        React.createElement("p", null, 
	          "This handler fires when an item has been selected from the list. It fires before the ", React.createElement("code", null, "onChange"), " handler, and fires" + ' ' + 
	          "regardless of whether the value has actually changed."
	        ), 
	
	        React.createElement(PropHeader, {type: "Function(String searchTerm)"}, "onCreate"), 
	        React.createElement("p", null, 
	          "This handler fires when the user chooses to create a new tag, not in the data list. It is up to the widget parent to implement creation logic," + ' ' + 
	          "a common implementation is shown below, where the new tag is selected and added to the data list."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(38)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Array"}, "data"), 
	        React.createElement("p", null, 
	          "provide an array of possible values for the ", widgetName, ". If an array of ", React.createElement("code", null, "objects"), " is provided you" + ' ' +
	          "should use the ", React.createElement("code", null, "valueField"), " and ", React.createElement("code", null, "textField"), " props, to specify which object" + ' ' +
	          "properties comprise the value field (such as an id) and the field used to label the item."
	        ), 
	
	        React.createElement(PropHeader, {type: "String"}, "valueField"), 
	        React.createElement("p", null, 
	          "A property name of a uniquely identifying field in the ", React.createElement("code", null, "data"), " array. If no valueField is provided," + ' ' +
	          "the widget will use strict equality checks to locate the data item, if it exists."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(29)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "String"}, "textField"), 
	        React.createElement("p", null, 
	          "This prop determines which data item field to display in the ", widgetName, " list andselected item This prop is" + ' ' +
	          "unnecessary when an ", React.createElement("code", null, "itemComponent"), " and ", React.createElement("code", null, "tagComponent"), " are provided."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(30)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "Component"}, "tagComponent"), 
	        React.createElement("p", null, 
	          "This component is used to render each selected item. The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(39)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "Component"}, "itemComponent"), 
	        React.createElement("p", null, 
	          "This component is used to render each possible item in the list. The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(31)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "String | Function(Any dataItem)"}, "groupBy"), 
	        React.createElement("p", null, 
	          "Determines how to group the ", widgetName, " dropdown list. Providing a ", React.createElement("code", null, "string"), " will group" + ' ' + 
	          "the ", React.createElement("code", null, "data"), " array by that property. You can also provide a ", 'function', " which should return the group value."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(32)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "Component"}, "groupComponent"), 
	        React.createElement("p", null, 
	          "This component is used to render each option group, when ", React.createElement("code", null, "groupBy"), " is specified. By" + ' ' + 
	          "default the ", React.createElement("code", null, "groupBy"), " value will be used."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(33)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "String", handler: "onSearch", controllable: true}, "placeholder"), 
	        React.createElement("p", null, 
	          "The same as an input placeholder, only works in browsers that support the placeholder attribute for inputs"
	        ), 
	
	        React.createElement(PropHeader, {type: "String", handler: "onSearch", controllable: true}, "searchTerm"), 
	        React.createElement("p", null, 
	          "The string value of the current search being typed into the ", widgetName, ". When" + ' ' +
	          "unset (", React.createElement("code", null, "undefined"), ") the ", widgetName, " will handle the filtering internally." + ' ' +
	          "The ", React.createElement("code", null, "defaultSearchTerm"), " prop can be used to ", 'set', " an initialization value for uncontrolled widgets."
	        ), 
	
	        React.createElement(PropHeader, {type: "Function(String searchTerm)"}, "onSearch"), 
	        React.createElement("p", null, 
	          "Called when the value of the text box changes either from typing or a pasted value. ", 
	          React.createElement("code", null, "onSearch"), " should be used when the ", React.createElement("code", null, "searchTerm"), " prop" + ' ' +
	          "is ", 'set', "."
	        ), 
	
	        React.createElement(PropHeader, {type: "Boolean"}, "open"), 
	        React.createElement("p", null, 
	          "Whether or not the ", widgetName, " is open. When unset (", React.createElement("code", null, "undefined"), ") the ", widgetName, " will handle the" + ' ' +
	          "opening and closing internally. The ", React.createElement("code", null, "defaultOpen"), " prop can be used to ", 'set', " an" + ' ' +
	          "initialization value for uncontrolled widgets."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(35)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "Function(Boolean isOpen)"}, "onToggle"), 
	        React.createElement("p", null, 
	          "Called when the ", widgetName, " is about to open or close. ", React.createElement("code", null, "onToggle"), " should be used" + ' ' +
	          "when the ", React.createElement("code", null, "open"), " prop is ", 'set', " otherwise the widget will never open or close."
	        ), 
	
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, "busy"), 
	        React.createElement("p", null, 
	          "mark whether the widget is in a busy or loading state. If ", React.createElement("code", null, "true"), " the widget will display a spinner gif, useful" + ' ' +
	          "when loading data via an ajax call."
	        ), 
	        React.createElement(PropHeader, {type: "Number", default: "250"}, "duration"), 
	        React.createElement("p", null, 
	          "The speed, in milliseconds, of the dropdown animation."
	        ), 
	        React.createElement(PropHeader, {type: "[Boolean, Array]"}, "disabled"), 
	        React.createElement("p", null, 
	          "Disable the widget, If an ", React.createElement("code", null, "Array"), " of values is passed in only the tags specified will be disabled."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(40)(widgetName, 'disabled')}), 
	
	        React.createElement(PropHeader, {type: "[Boolean, Array]"}, "readOnly"), 
	        React.createElement("p", null, 
	          "Place the widget in a readonly mode, If an ", React.createElement("code", null, "Array"), " of values is passed in only the tags specified will be readonly."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(40)(widgetName, 'readOnly')}), 
	
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, "isRtl"), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	           "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	
	        React.createElement(PropHeader, {type: "Object"}, "messages"), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	
	        React.createElement("h3", null, "messages.createNew ", React.createElement("small", null, "String", React.createElement(Default, null, "\"(create new tag)\""))), 
	        React.createElement("p", null, 
	          "The text label for creating new tags"
	        ), 
	
	
	        React.createElement(PropHeader, {type: "String", default: "\"There are no items in this list\""}, "messages.emptyList"), 
	        React.createElement("p", null, 
	          "Text to display when the ", React.createElement("code", null, "data"), " prop array is empty"
	        ), 
	        React.createElement(PropHeader, {type: "String", default: "\"The filter returned no results\""}, "messages.emptyFilter"), 
	        React.createElement("p", null, 
	          "Text to display when the the current filter does not return any results"
	        ), 
	
	        React.createElement("h2", {id:  prefix +"keyboard"}, "Keyboard Navigation"), 
	
	        React.createElement("ul", {className: "list-unstyled keyboard-list"}, 
	          React.createElement("li", null, React.createElement("kbd", null, "down arrow"), " open dropdown, and move focus to next item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "up arrow"), " move focus to previous item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "alt + up arrow"), " close dropdown"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "left arrow"), " move focus to previous selected tag"), 
	          React.createElement("li", null, React.createElement("kbd", null, "right arrow"), " move focus to previous selected tag"), 
	          React.createElement("li", null, React.createElement("kbd", null, "delete"), " unselect focused tag"), 
	          React.createElement("li", null, React.createElement("kbd", null, "backspace"), " remove next selected tag"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "home"), " move focus to first item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "end"), " move focus to last item"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "enter"), " select focused item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "ctrl + enter"), " create new tag from current search term"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "any key"), " search list for item starting with key")
	        )
	      )
	    );
	  }
	
	});
	
	var initialExample =
	("\nrender: function(){\n  var Multiselect = require('react-widgets').Multiselect\n    , list = [\n      { label: 'orange', id: 1 },\n      { label: 'blue', id: 2 },\n      { label: 'red', id: 3 },\n    ];\n \n  return (\n    <Multiselect \n      data={list}\n      value={this.state.value}\n      onChange={this._change}\n      textField='label'\n      valueField='id'/>\n   )\n}"
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	);
	
	var onCreateExample =
	("\nrender(){\n  var list = [\n      { label: 'orange', id: 1 },\n      { label: 'blue', id: 2 },\n      { label: 'red', id: 3 },\n    ];\n  \n  function change(values){\n    this.setState({ value: values })\n  }\n\n  function create(color){\n    var tag = { label: color, id: list.length + 1 } // create a tag object\n\n    list.push(value) // add new tag to the data list\n    this.setState({ value: this.state.value.concat(tag) }) //add new tag tothe list of values\n  }\n\n  return (\n    <Multiselect \n      value={this.state.value} \n      data={data} \n      textfield=\"label\"\n      onCreate={create} \n      onChange={change}/>\n  )\n}"
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	);
	
	module.exports = Multiselect;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  
	  , EditableExample = __webpack_require__(15)
	  , MenuItem = __webpack_require__(16)
	  , DDButton = __webpack_require__(2).DropdownButton
	  , PropHeader = __webpack_require__(17)
	  , SelectListExample = __webpack_require__(22);
	
	var prefix = 'selectlist/'
	var widgetName = 'SelectList'
	var SelectList = React.createClass({displayName: 'SelectList',
	
	  mixins: [ __webpack_require__(14)(prefix) ],
	  
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Select List", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, {prefix: prefix}, "value"), 
	              React.createElement(MenuItem, {prefix: prefix}, "onChange"), 
	              React.createElement(MenuItem, {prefix: prefix}, "data"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {prefix: prefix}, "valueField"), 
	              React.createElement(MenuItem, {prefix: prefix}, "textField"), 
	              React.createElement(MenuItem, {prefix: prefix}, "itemComponent"), 
	
	              React.createElement(MenuItem, {prefix: prefix}, "multiple"), 
	              React.createElement(MenuItem, {prefix: prefix}, "onMove"), 
	              React.createElement(MenuItem, {prefix: prefix}, "busy"), 
	              React.createElement(MenuItem, {prefix: prefix}, "disabled"), 
	              React.createElement(MenuItem, {prefix: prefix}, "readonly"), 
	
	              React.createElement(MenuItem, {prefix: prefix}, "isRtl"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {prefix: prefix}, "Keyboard Navigation")
	            )
	          )
	        ), 
	        React.createElement("p", null, 
	          "Creates a list of radio buttons or checkboxes bound to a ", 'set', " of data."
	        ), 
	        React.createElement(SelectListExample, null), 
	        React.createElement("h2", null, "Props"), 
	
	        React.createElement(PropHeader, {type: "Any|Array<Any>", handler: "onChange", controllable: true}, "value"), 
	        React.createElement("p", null, 
	          "The current value or values of the ", widgetName, ". This can be an object (such as a member of the ", React.createElement("code", null, "data"), " array)" + ' ' +
	          "or a primitive value, hinted to by the ", React.createElement("code", null, "valueField"), ". The widget value does not need to be in" + ' ' +
	          "the ", React.createElement("code", null, "data"), " array; widgets can have values that are not in their list."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(26)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "Function(Array<Any>|Any values)"}, "onChange"), 
	        React.createElement("p", null, 
	          "Change event handler that is called when the value is changed. ", React.createElement("code", null, "values"), " will be an array" + ' ' + 
	          "when ", React.createElement("code", null, "multiple"), " prop is set."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(27)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "Array<Any>"}, "data"), 
	        React.createElement("p", null, 
	          "provide an array of possible values for the ", widgetName, ". If an array of ", React.createElement("code", null, "objects"), " is provided you" + ' ' +
	          "should use the ", React.createElement("code", null, "valueField"), " and ", React.createElement("code", null, "textField"), " props, to specify which object" + ' ' +
	          "properties comprise the value field (such as an id) and the field used to label the item."
	        ), 
	
	        React.createElement(PropHeader, {type: "String"}, "valueField"), 
	        React.createElement("p", null, 
	          "A property name of a uniquely identifying field in the ", React.createElement("code", null, "data"), " array. If no valueField is provided," + ' ' +
	          "the ", widgetName, " will use strict equality checks to locate the data item, if it exists."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(29)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "String"}, "textField"), 
	        React.createElement("p", null, 
	          "This prop determines which data item field to display in the ", widgetName, "."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(30)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "Component"}, "itemComponent"), 
	        React.createElement("p", null, 
	          "This component is used to render each item in the ", widgetName, ". The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(31)(widgetName, true)}), 
	
	        React.createElement(PropHeader, {type: "Boolean"}, "multiple"), 
	        React.createElement("p", null, 
	          "Whether or not the ", widgetName, " allows multiple selection or not. when ", React.createElement("code", null, "false"), " the ", widgetName, " will" + ' ' + 
	          "render as a list of radio buttons, and checkboxes when ", React.createElement("code", null, "true"), "."
	        ), 
	
	        React.createElement(PropHeader, {type: "Function(HTMLElement)"}, "onMove"), 
	        React.createElement("p", null, 
	          "A handler called when focus shifts on the ", widgetName, ". Internally this is used to ensure the focused item is in view." + ' ' +
	          "If you want to define your own \"scrollTo\" behavior or just disable the default one specify an ", React.createElement("code", null, "onMove"), " handler."
	        ), 
	
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, "busy"), 
	        React.createElement("p", null, 
	          "mark whether the widget is in a busy or loading state. If ", React.createElement("code", null, "true"), " the widget will display a spinner gif, useful" + ' ' +
	          "when loading data via an ajax call."
	        ), 
	
	        React.createElement(PropHeader, {type: "[Boolean, Array]"}, "disabled"), 
	        React.createElement("p", null, 
	          "Disable the widget, if an ", React.createElement("code", null, "Array"), " of values is passed in only those values will be disabled."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(40)(widgetName, 'disabled')}), 
	
	        React.createElement(PropHeader, {type: "[Boolean, Array]"}, "readOnly"), 
	        React.createElement("p", null, 
	          "Place the ", widgetName, " in a readonly mode, If an ", React.createElement("code", null, "Array"), " of values is passed in only those values will be readonly."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(40)(widgetName, 'readOnly')}), 
	        
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, "isRtl"), 
	        React.createElement("p", null, 
	          "mark whether the ", widgetName, " should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	           "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	
	
	        React.createElement("h2", {id:  prefix +"keyboard"}, "Keyboard Navigation"), 
	
	        React.createElement("ul", {className: "list-unstyled keyboard-list"}, 
	          React.createElement("li", null, React.createElement("kbd", null, "down arrow"), " move focus to or select next item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "up arrow"), " move focus to or select previous item"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "home"), " move focus to or select first item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "end"), " move focus to or select last item"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "spacebar"), " ", React.createElement("kbd", null, "enter"), " toggle focused item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "ctrl + a"), " toggle select all/select none"), 
	          React.createElement("li", null, React.createElement("kbd", null, "any key"), " search list for item starting with key")
	        )
	      )
	    );
	  }
	
	});
	
	module.exports = SelectList;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , EditableExample = __webpack_require__(15)
	  , DDButton = __webpack_require__(2).DropdownButton
	  , MenuItem = __webpack_require__(16)
	  , PropHeader = __webpack_require__(17)
	  , CalendarExample = __webpack_require__(23);
	
	var prefix = 'calendar/'
	var widgetName = "Calendar"
	var Calendar = React.createClass({displayName: 'Calendar',
	
	  mixins: [ __webpack_require__(14)(prefix) ],
	  
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Calendar", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, null, "value"), 
	              React.createElement(MenuItem, null, "onChange"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "min"), 
	              React.createElement(MenuItem, null, "max"), 
	              React.createElement(MenuItem, null, "initialView"), 
	              React.createElement(MenuItem, null, "finalView"), 
	
	              React.createElement(MenuItem, null, "duration"), 
	              React.createElement(MenuItem, null, "isRtl"), 
	              React.createElement(MenuItem, null, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "Keyboard Navigation")
	            )
	          )
	        ), 
	        React.createElement("p", null, 
	          "Calendar widget."
	        ), 
	        React.createElement(CalendarExample, null), 
	
	        React.createElement("h2", null, "Props"), 
	
	        React.createElement(PropHeader, {type: "Date?", handler: "onChange", controllable: true}, "value"), 
	        React.createElement("p", null, 
	          "The current selected date, should be a Date object or null."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(41)(widgetName, ['new Date()'])}), 
	
	        React.createElement(PropHeader, {type: "Function( Date? date )"}, "onChange"), 
	        React.createElement("p", null, 
	          "Change event Handler that is called when the value is changed. The handler is called with the Date object"
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(42)(widgetName, ['new Date()'])}), 
	
	        React.createElement(PropHeader, {type: "Date"}, "min"), 
	        React.createElement("p", null, 
	          "The minimum date that the Calendar can navigate from."
	        ), 
	
	        React.createElement(PropHeader, {type: "Date"}, "max"), 
	        React.createElement("p", null, 
	          "The maximum date that the Calendar can navigate to."
	        ), 
	
	        React.createElement(PropHeader, {type: "Enum", default: "\"month\""}, "initialView"), 
	        React.createElement("p", null, 
	          "The starting and lowest level view the calendar can navigate down to."
	        ), 
	        React.createElement("p", null, 
	          "Acceptable values are:", 
	          React.createElement("code", null, "\"month\""), " ", React.createElement("code", null, "\"year\""), " ", React.createElement("code", null, "\"decade\""), " ", React.createElement("code", null, "\"century\"")
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'initialView', '"year"')}), 
	
	        React.createElement(PropHeader, {type: "Enum", default: "\"century\""}, "finalView"), 
	        React.createElement("p", null, 
	          "The highest level view the calendar can navigate up to. This value should be higher" + ' ' +
	          "than ", React.createElement("code", null, "initialView")
	        ), 
	        React.createElement("p", null, 
	          "Acceptable values are:", 
	          React.createElement("code", null, "\"month\""), " ", React.createElement("code", null, "\"year\""), " ", React.createElement("code", null, "\"decade\""), " ", React.createElement("code", null, "\"century\"")
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'finalView', '"year"')}), 
	        
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, "isRtl"), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	          "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	
	        React.createElement(PropHeader, {type: "Object"}, "messages"), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	
	        React.createElement(PropHeader, {type: "String", default: "\"navigate back\""}, "messages.moveBack"), 
	        React.createElement("p", null, 
	          "title and screen reader text for the left arrow button"
	        ), 
	
	        React.createElement(PropHeader, {type: "String", default: "\"navigate forward\""}, "messages.moveForward"), 
	        React.createElement("p", null, 
	          "title and screen reader text for the right arrow button"
	        ), 
	
	        React.createElement("h2", {id:  prefix +"keyboard"}, "Keyboard Navigation"), 
	
	        React.createElement("ul", {className: "list-unstyled keyboard-list"}, 
	          React.createElement("li", null, React.createElement("kbd", null, "ctrl + down arrow"), " navigate to next view "), 
	          React.createElement("li", null, React.createElement("kbd", null, "ctrl + up arrow"), " navigate to previous view "), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "ctrl + left arrow"), " navigate to previous: month, year, decade, century"), 
	          React.createElement("li", null, React.createElement("kbd", null, "ctrl + right arrow"), " navigate to next: month, year, decade, century"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "left arrow"), " move focus to previous date"), 
	          React.createElement("li", null, React.createElement("kbd", null, "right arrow"), " move focus to next date"), 
	          React.createElement("li", null, React.createElement("kbd", null, "up arrow"), " move focus up within view"), 
	          React.createElement("li", null, React.createElement("kbd", null, "down arrow"), " move focus down within view")
	        )
	      )
	    );
	  }
	
	});
	
	module.exports = Calendar;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , EditableExample = __webpack_require__(15)
	  , DDButton = __webpack_require__(2).DropdownButton
	  , MenuItem = __webpack_require__(16)
	  , PropHeader = __webpack_require__(17)
	  , DatePickerExample = __webpack_require__(24);
	
	var prefix = 'date-picker/'
	var widgetName = 'DateTimePicker'
	var DateTimePicker = React.createClass({displayName: 'DateTimePicker',
	
	  mixins: [ __webpack_require__(14)(prefix) ],
	  
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Date and Time Picker", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, null, "value"), 
	              React.createElement(MenuItem, null, "onChange"), 
	              React.createElement(MenuItem, null, "data"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "calendar"), 
	              React.createElement(MenuItem, null, "time"), 
	              React.createElement(MenuItem, null, "min"), 
	              React.createElement(MenuItem, null, "max"), 
	              React.createElement(MenuItem, null, "format"), 
	              React.createElement(MenuItem, null, "parse"), 
	              React.createElement(MenuItem, null, "initialView"), 
	              React.createElement(MenuItem, null, "finalView"), 
	
	              React.createElement(MenuItem, null, "open"), 
	              React.createElement(MenuItem, null, "onToggle"), 
	
	              React.createElement(MenuItem, null, "duration"), 
	              React.createElement(MenuItem, null, "isRtl"), 
	              React.createElement(MenuItem, null, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "Keyboard Navigation")
	            )
	          )
	        ), 
	        React.createElement("p", null, 
	          "Datepicker widget. Allows you to ", 'set', " different parts of a javascript ", React.createElement("code", null, "Date"), " object. Since dates" + ' ' +
	          "are ", React.createElement("em", null, "highly"), " localized we make use of the" + ' ' +
	          "excellent ", React.createElement("a", {target: "_blank", href: "https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468"}, "Globalize.js"), " library" + ' ' +
	          "internally to format and parse dates from Strings. It is up to you to ", 'set', " the culture via" + ' ' +
	          "the ", React.createElement("code", null, "Globalize.culture()"), " method. All format props expect Globalize compatible format string.", 
	          React.createElement("br", null), React.createElement("br", null), 
	          React.createElement("strong", null, 
	            "Note: we expect a pre 1.0.0 version as  1.0 will dramatically change the Globalize API, once 1.0 is stable we" + ' ' +
	            "will switch to it as well"
	          )
	        ), 
	
	        React.createElement("p", null, 
	          "Dates are never mutated but always return and operate on a new Date instance. When the ", React.createElement("code", null, "calendar"), " prop" + ' ' +
	          "is ", 'set', " the widget takes all props vailable to the Calendar widget (see above)," + ' ' +
	          "the same is true for the keyboard navigation!"
	        ), 
	        React.createElement(DatePickerExample, null), 
	       
	        React.createElement("h2", null, "Props"), 
	        React.createElement(PropHeader, {type: "Date?", handler: "onChange", controllable: true}, "value"), 
	        React.createElement("p", null, 
	          "The current selected date, should be a ", React.createElement("code", null, "Date"), " instance or ", React.createElement("code", null, "null"), "."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(41)(widgetName, ['new Date()', null])}), 
	
	        React.createElement(PropHeader, {type: "Function(Date? date, String dateStr)"}, "onChange"), 
	        React.createElement("p", null, 
	          "change event Handler that is called when the value is changed. The handler is called with both the" + ' ' +
	          "current ", React.createElement("code", null, "Date"), " object (or null if it was not parseable), and the second argument is" + ' ' +
	          "a ", React.createElement("code", null, "string"), " representation of the date value, formated by the ", React.createElement("code", null, "format"), " prop."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(42)(widgetName, ['new Date()', null])}), 
	
	        React.createElement(PropHeader, {type: "Function(Date? value)"}, "onSelect"), 
	        React.createElement("p", null, 
	          "This handler fires when an item has been selected from the list or calendar. It fires before the ", React.createElement("code", null, "onChange"), " handler, and fires" + ' ' + 
	          "regardless of whether the value has actually changed."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(44)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Boolean", default: "true"}, "calendar"), 
	        React.createElement("p", null, 
	          "Whether to show the date picker button."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'calendar', false)}), 
	
	        React.createElement(PropHeader, {type: "Boolean", default: "true"}, "time"), 
	        React.createElement("p", null, 
	          "Whether to show the time picker button."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'time', false)}), 
	
	        React.createElement(PropHeader, {type: "Date", default: ">Date(1900, 0, 1)"}, "min"), 
	        React.createElement("p", null, 
	          "The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that" + ' ' +
	          "can be typed or pasted into the widget. If you need this behavior you can constrain values via" + ' ' +
	          "the ", React.createElement("code", null, "onChange"), " handler."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'min', 'new Date()')}), 
	
	        React.createElement(PropHeader, {type: "Date", default: "Date(2099, 11, 31)"}, "max"), 
	        React.createElement("p", null, 
	          "The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that" + ' ' +
	          "can be typed or pasted into the widget. If you need this behavior you can constrain values via" + ' ' +
	          "the ", React.createElement("code", null, "onChange"), " handler."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'max', 'new Date()')}), 
	
	        React.createElement(PropHeader, {type: "String", default: "\"M/d/yyyy h:mm tt\""}, "format"), 
	        React.createElement("p", null, 
	          "A string format used to display the date value. For more information on prefined and custom formats" + ' ' +
	          "visit the ", React.createElement("a", {href: "https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468#dates"}, 
	            "Globalize.js documentation ", React.createElement("i", {className: "fa fa-external-link"})
	          )
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'format', '"MMM dd yyyy"')}), 
	
	        React.createElement(PropHeader, {type: "[Function, Array<String>]"}, "parse"), 
	        React.createElement("p", null, 
	          "Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try," + ' ' +
	          "or provide a ", 'function', " that returns a date to handle parsing yourself."
	        ), 
	         React.createElement(EditableExample, {codeText: __webpack_require__(45)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Enum", default: "\"month\""}, "initialView"), 
	        React.createElement("p", null, 
	          "The starting and lowest level view the calendar can navigate down to."
	        ), 
	        React.createElement("p", null, 
	          "Acceptable values are:", 
	          React.createElement("code", null, "\"month\""), " ", React.createElement("code", null, "\"year\""), " ", React.createElement("code", null, "\"decade\""), " ", React.createElement("code", null, "\"century\"")
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'initialView', '"year"')}), 
	
	        React.createElement(PropHeader, {type: "Enum", default: "\"century\""}, "finalView"), 
	        React.createElement("p", null, 
	          "The highest level view the calendar can navigate up to. This value should be higher" + ' ' +
	          "than ", React.createElement("code", null, "initialView")
	        ), 
	        React.createElement("p", null, 
	          "Acceptable values are:", 
	          React.createElement("code", null, "\"month\""), " ", React.createElement("code", null, "\"year\""), " ", React.createElement("code", null, "\"decade\""), " ", React.createElement("code", null, "\"century\"")
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'finalView', '"year"')}), 
	
	        React.createElement(PropHeader, {type: "[Boolean, String]", default: "false", controllable: true, handler: "onToggle"}, "open"), 
	        React.createElement("p", null, 
	          "Whether or not the ", widgetName, " is open. When unset (", React.createElement("code", null, "undefined"), ") the ", widgetName, " will handle the" + ' ' +
	          "opening and closing internally. The ", React.createElement("code", null, "defaultOpen"), " prop can be used to ", 'set', " an" + ' ' +
	          "initialization value for uncontrolled widgets."
	        ), 
	        React.createElement("p", null, 
	          "Acceptable values are: ", React.createElement("code", null, "false"), " ", React.createElement("code", null, "\"calendar\""), " ", React.createElement("code", null, "\"time\"")
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(46)(widgetName)}), 
	
	        React.createElement(PropHeader, {type: "Function(Boolean isOpen)"}, "onToggle"), 
	        React.createElement("p", null, 
	          "Called when the ", widgetName, " is about to open or close. ", React.createElement("code", null, "onToggle"), " should be used" + ' ' +
	          "when the ", React.createElement("code", null, "open"), " prop is ", 'set', " otherwise the widget will never open or close."
	        ), 
	
	        React.createElement(PropHeader, {type: "Number", default: "250"}, "duration"), 
	        React.createElement("p", null, 
	          "The speed, in milliseconds, of the either dropdown animation."
	        ), 
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, "isRtl"), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	           "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	
	        React.createElement(PropHeader, {type: "Object"}, "messages"), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	
	        React.createElement(PropHeader, {type: "String", default: "\"Select Date\""}, "messages.calendarButton"), 
	        React.createElement("p", null, 
	          "title and screen reader text for the left arrow button"
	        ), 
	
	        React.createElement(PropHeader, {type: "String", default: "\"Select Time\""}, "messages.timeButton"), 
	        React.createElement("p", null, 
	          "title and screen reader text for the right arrow button"
	        ), 
	
	        React.createElement("h2", {id:  prefix +"keyboard"}, "Keyboard Navigation"), 
	
	        React.createElement("ul", {className: "list-unstyled keyboard-list"}, 
	          React.createElement("li", null, React.createElement("strong", null, "All Calendar keys above also apply")), 
	          React.createElement("li", null, React.createElement("kbd", null, "alt + down arrow"), " open calendar or times"), 
	          React.createElement("li", null, React.createElement("kbd", null, "alt + up arrow"), " close calendar or times"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "down arrow"), " move focus to next time"), 
	          React.createElement("li", null, React.createElement("kbd", null, "up arrow"), " move focus to previous time"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "home"), " move focus to first time"), 
	          React.createElement("li", null, React.createElement("kbd", null, "end"), " move focus to last time"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "enter"), " select focused item"), 
	          React.createElement("li", null, React.createElement("kbd", null, "any key"), " search list for time starting with key")
	        )
	      )
	    );
	  }
	
	});
	
	module.exports = DateTimePicker;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , EditableExample = __webpack_require__(15)
	  , DDButton = __webpack_require__(2).DropdownButton
	  , PropHeader = __webpack_require__(17)
	  , MenuItem = __webpack_require__(16)
	  , NumberPickerExample = __webpack_require__(25);
	
	var prefix = 'number-picker/'
	var widgetName = 'NumberPicker'
	var NumberPicker = React.createClass({displayName: 'NumberPicker',
	
	  mixins: [ __webpack_require__(14)(prefix) ],
	
	
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Number Picker", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, null, "value"), 
	              React.createElement(MenuItem, null, "onChange"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "format"), 
	              React.createElement(MenuItem, null, "min"), 
	              React.createElement(MenuItem, null, "max"), 
	              React.createElement(MenuItem, null, "step"), 
	
	              React.createElement(MenuItem, null, "isRtl"), 
	              React.createElement(MenuItem, null, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, null, "Keyboard Navigation")
	            )
	          )
	
	        ), 
	        React.createElement("p", null, 
	          "Spinner for selecting numbers. Supports multiple formats for display and editing through Globalize.js"
	        ), 
	        React.createElement(NumberPickerExample, null), 
	
	        React.createElement("h2", null, "Props"), 
	        React.createElement(PropHeader, {type: "Number?", handler: "onChange", controllable: true}, "value"), 
	        React.createElement("p", null, 
	          "The current value of the NumberPicker."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(41)(widgetName, [1, null])}), 
	
	        React.createElement(PropHeader, {type: "Function(Number? value)"}, "onChange"), 
	        React.createElement("p", null, 
	          "Change event Handler that is called when the value is changed. The handler is called with the" + ' ' +
	          "current numeric value or null."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(42)(widgetName, [1, null])}), 
	
	        React.createElement(PropHeader, {type: "String", default: "d"}, "format"), 
	        React.createElement("p", null, 
	          "A format string used to display the number value. For more information on prefined and custom number and" + ' ' +
	          "currency formats visit the ", 
	          React.createElement("a", {href: "https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468#number-formatting"}, 
	            "Globalize.js documentation ", React.createElement("i", {className: "fa fa-external-link"})
	          ), "."
	        ), 
	
	        React.createElement(PropHeader, {type: "Number", default: "-Infinity"}, "min"), 
	        React.createElement("p", null, 
	          "The minimum number that the NumberPicker value."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'min', 0)}), 
	
	        React.createElement(PropHeader, {type: "Number", default: "Infinity"}, "max"), 
	        React.createElement("p", null, 
	          "The maximum number that the NumberPicker value."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'max', 5)}), 
	
	        React.createElement(PropHeader, {type: "Number", default: "1"}, "step"), 
	        React.createElement("p", null, 
	          "Amount to increase or decrease value when using the spinner buttons."
	        ), 
	        React.createElement(EditableExample, {codeText: __webpack_require__(43)(widgetName, 'step', 5)}), 
	
	        React.createElement(PropHeader, {type: "Boolean", default: "false"}, 
	          "isRtl"
	        ), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	           "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	
	        React.createElement(PropHeader, {type: "Object"}, "messages"), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	
	        React.createElement(PropHeader, {type: "String", default: "\"increment value\""}, "messages.increment"), 
	        React.createElement("p", null, 
	          "Number picker spinner up button text for screen readers"
	        ), 
	
	        React.createElement(PropHeader, {type: "String", default: "\"decrement value\""}, "messages.decrement"), 
	        React.createElement("p", null, "Number picker spinner down button text for screen readers "), 
	
	        React.createElement(PropHeader, {prefix: prefix}, "Keyboard Navigation"), 
	
	        React.createElement("ul", {className: "list-unstyled keyboard-list"}, 
	          React.createElement("li", null, React.createElement("kbd", null, "down arrow"), " decrement value"), 
	          React.createElement("li", null, React.createElement("kbd", null, "up arrow"), " increment value"), 
	
	          React.createElement("li", null, React.createElement("kbd", null, "home"), " ", 'set', " value to minimum value if finite"), 
	          React.createElement("li", null, React.createElement("kbd", null, "end"), " ", 'set', " value to maximum value if finite")
	        )
	      )
	    );
	  }
	
	});
	
	module.exports = NumberPicker;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1);
	
	
	var MigrationGuide = React.createClass({displayName: 'MigrationGuide',
	
		render: function() {
			return (
				React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, "Migrating to 2.0"), 
	        React.createElement("p", null, 
	          "Migration should be a relatively painless and easy process. The largest underlying reason for the major bump is" + ' ' + 
	          "the inability to adequately support React ", React.createElement("b", null, "0.12"), " along side previous versions. We do, however, take the" + ' ' +
	          "opportunity of a major bump to remove some warts from the widget api and architecture." + ' ' + 
	          "Most changes are consmetic and easily \"grep-able\", but should lead to less confusion and increase ease of use." + ' ' + 
	          "Almost every change can be migrated to via \"find and replace\"."
	        ), 
	        React.createElement("p", null, 
	          "For those unwilling or unable to upgrade, the 1+ branch will continue to be supported for any applicable bug fixes." + ' ' + 
	          "New features, however, will mostly likely only be added to the 2.0 branch."
	        ), 
	
	        React.createElement("h4", null, "Supported versions of React"), 
	        React.createElement("p", null, 
	          "React-widgets now requires React 0.12+" 
	        ), 
	
	        React.createElement("h4", null, "Required polyfills"), 
	        React.createElement("p", null, 
	          "Completing the movement away from utility library dependence, we have removed the last few handrolled es5 methods" + ' ' + 
	          "from the code base. This means that in addition to the polyfills required by React, for old browsers, React-widgets" + ' ' + 
	          "now requires a few more. You can use the" + ' ' + 
	          "excellent ", React.createElement("a", {href: "https://github.com/es-shims/es5-shim"}, "kriskowal's es5-shim"), " for all of these."
	        ), 
	        React.createElement("ul", null, 
	          React.createElement("li", null, React.createElement("code", null, "Array.prototype.some")), 
	          React.createElement("li", null, React.createElement("code", null, "Array.prototype.filter")), 
	          React.createElement("li", null, React.createElement("code", null, "Array.prototype.reduce"))
	        ), 
	
	        React.createElement("h4", null, "Exported Values"), 
	        React.createElement("p", null, 
	          "We have tried to make the consumption of react-widgets as consistent as possible, regardless of whether you require" + ' ' + 
	          "the entire suite, or just make use of a few widgets. To that end, names and locations of files have been changed to" + ' ' + 
	          "make everything consistent. one of the biggest changes is that the ", React.createElement("code", null, "Select"), " widget has changed names" + ' ' +
	          "to ", React.createElement("code", null, "Multiselect"), " which is more descriptive, and makes room for the new ", React.createElement("code", null, "SelectList"), " widget."
	        ), 
	        React.createElement("ul", null, 
	          React.createElement("li", null, React.createElement("code", null, "require('react-widgets').DropDownlist"), " -> ", React.createElement("code", null, "require('react-widgets').DropdownList")), 
	          React.createElement("li", null, React.createElement("code", null, "require('react-widgets').Select"), " -> ", React.createElement("code", null, "require('react-widgets').Multiselect"))
	        ), 
	        React.createElement("h4", null, "File Names and Locations"), 
	        React.createElement("p", null, 
	          "File names and locations have also changed. Components now all have a consistent PascalCase names that match" + ' ' + 
	          "their exported value." + ' ' + 
	          "To make it easier to require individual widgets all file structures for components have been flattened down" + ' ' + 
	          "to just the ", React.createElement("code", null, "lib/"), " directory."
	        ), 
	        React.createElement("ul", null, 
	          React.createElement("li", null, React.createElement("code", null, "react-widgets/lib/select/select"), " -> ", React.createElement("code", null, "react-widgets/lib/Multiselect")), 
	          React.createElement("li", null, React.createElement("code", null, "react-widgets/lib/calendar/calendar"), " -> ", React.createElement("code", null, "react-widgets/lib/Calendar")), 
	          React.createElement("li", null, React.createElement("code", null, "react-widgets/lib/pickers/datepicker"), " -> ", React.createElement("code", null, "react-widgets/lib/DateTimePicker")), 
	
	          React.createElement("li", null, React.createElement("code", null, "react-widgets/lib/pickers/numberpicker"), " -> ", React.createElement("code", null, "react-widgets/lib/NumberPicker")), 
	          React.createElement("li", null, React.createElement("code", null, "react-widgets/lib/dropdowns/dropdown-list"), " -> ", React.createElement("code", null, "react-widgets/lib/DropdownList")), 
	          React.createElement("li", null, React.createElement("code", null, "react-widgets/lib/dropdowns/combobox"), " -> ", React.createElement("code", null, "react-widgets/lib/Combobox"))
	        ), 
	
	        React.createElement("h4", null, "CSS Classes"), 
	        React.createElement("p", null, 
	          "For consumers who have made styling additions and changes outside of just altering LESS variables, a few" + ' ' + 
	          "css classes have also changed to match the naming changes in the files and widgets."
	        ), 
	        React.createElement("ul", null, 
	          React.createElement("li", null, React.createElement("code", null, "rw-dropdown-list"), " -> ", React.createElement("code", null, "rw-dropdownlist")), 
	          React.createElement("li", null, React.createElement("code", null, "rw-number-picker"), " -> ", React.createElement("code", null, "rw-numberpicker")), 
	          React.createElement("li", null, React.createElement("code", null, "rw-date-picker"), " -> ", React.createElement("code", null, "rw-datetimepicker")), 
	
	          React.createElement("li", null, React.createElement("code", null, "rw-select-list"), " -> ", React.createElement("code", null, "rw-multiselect")), 
	          React.createElement("li", null, React.createElement("code", null, "rw-select-wrapper"), " -> ", React.createElement("code", null, "rw-multiselect-wrapper")), 
	          React.createElement("li", null, React.createElement("code", null, "rw-tag-list"), " -> ", React.createElement("code", null, "rw-multiselect-taglist"))
	        )
	      )
			);
		}
	
	});
	  
	  module.exports = MigrationGuide;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports.DefaultRoute = __webpack_require__(55);
	exports.Link = __webpack_require__(56);
	exports.NotFoundRoute = __webpack_require__(57);
	exports.Redirect = __webpack_require__(58);
	exports.Route = __webpack_require__(59);
	exports.RouteHandler = __webpack_require__(60);
	
	exports.HashLocation = __webpack_require__(61);
	exports.HistoryLocation = __webpack_require__(62);
	exports.RefreshLocation = __webpack_require__(63);
	
	exports.ImitateBrowserBehavior = __webpack_require__(64);
	exports.ScrollToTopBehavior = __webpack_require__(65);
	
	exports.Navigation = __webpack_require__(66);
	exports.State = __webpack_require__(67);
	
	exports.create = __webpack_require__(68);
	exports.run = __webpack_require__(69);
	
	exports.History = __webpack_require__(70);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	
	module.exports = function(prefix){
	
	  return {
	
	    mixins: [
	      __webpack_require__(13).State
	    ],
	
	    childContextTypes: {
	      prefix: React.PropTypes.string.isRequired
	    },
	
	    getChildContext:function() {
	      return { prefix:prefix };
	    },
	
	  }
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*global JSXTransformer */
	'use strict';
	
	var React = __webpack_require__(1)
	  , CodeMirrorEditor = __webpack_require__(71)
	  , ReactWidgets = __webpack_require__(72)
	  , genData = __webpack_require__(73);
	
	function listOfPeople(){
	  return genData(15)
	}
	
	function scopedEval(code, mountNode)  {
	  var context = { ReactWidgets:ReactWidgets, listOfPeople:listOfPeople, mountNode:mountNode, React:React }
	
	  return (new Function( "with(this) { " + code + "}")).call(context);
	}
	
	module.exports = React.createClass({displayName: 'exports',
	
	  propTypes: {
	    codeText: React.PropTypes.string.isRequired,
	    transformer: React.PropTypes.func,
	    renderCode: React.PropTypes.bool
	  },
	
	  getDefaultProps: function() {
	    return {
	      transformer: function(code) {
	        return JSXTransformer.transform(code, { harmony: true }).code;
	      }
	    };
	  },
	
	  getInitialState: function() {
	    return {
	      code: this.props.codeText
	    };
	  },
	
	  handleCodeChange: function(value) {
	    this.setState({code: value, error: null }, 
	      function()  {return this.executeCode();}.bind(this));
	    
	  },
	
	
	  compileCode: function() {
	    return this.props.transformer(this.state.code);
	  },
	
	  render: function() {
	
	    return (
	      React.createElement("div", {className: "editable-example row"}, 
	        React.createElement("div", {className: "editable-rendered col-md-5 col-md-push-7"}, 
	          React.createElement("div", {ref: "mount"})
	        ), 
	        React.createElement("div", {className: "editable-editor col-md-7 col-md-pull-5"}, 
	          React.createElement(CodeMirrorEditor, {key: "jsx", 
	            onChange: this.handleCodeChange, 
	            value: this.state.code}), 
	           this.state.error &&
	            React.createElement("div", {className: "text-danger editable-error"}, this.state.error)
	          
	        )
	      )
	      );
	  },
	
	  componentDidMount: function() {
	    this.executeCode();
	  },
	
	  componentWillUpdate: function(nextProps, nextState) {
	    clearTimeout(this.timeoutID);
	    // execute code only when the state's not being updated by switching tab
	    // this avoids re-displaying the error, which comes after a certain delay
	    if (this.state.code !== nextState.code) 
	      setTimeout(function()  {return this.executeCode();}.bind(this));
	  },
	
	  setTimeout: function() {
	    clearTimeout(this.timeoutID);
	    this.timeoutID = setTimeout.apply(null, arguments);
	  },
	
	  componentWillUnmount: function() {
	    var mountNode = this.refs.mount.getDOMNode();
	    
	    try {
	      React.unmountComponentAtNode(mountNode);
	    } 
	    catch (e) { }
	  },
	
	  executeCode: function() {
	    var mountNode = this.refs.mount.getDOMNode();
	
	    try {
	      React.unmountComponentAtNode(mountNode);
	    } 
	    catch (e) { }
	
	    try {
	      scopedEval(this.compileCode(), mountNode);
	    } 
	    catch (err) {
	      this.setTimeout(function()  {
	        this.setState({ error: err.toString() })
	      }.bind(this), 1000);
	    }
	  }
	});


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , MenuItem = __webpack_require__(2).MenuItem;
	
	var ApiMenuItem = React.createClass({displayName: 'ApiMenuItem',
	
	  contextTypes: {
	    prefix: React.PropTypes.string.isRequired
	  },
	
	  navigate:function(e){
	    var anchor = document.getElementById('/' + this.context.prefix + this.props.children.replace(' ', '_'))
	    e.preventDefault()
	    window.scrollTo(window.pageXOffset, anchor.offsetTop)
	  },
	
	  render: function() {
	
	    if( this.props.divider)
	      return  React.createElement(MenuItem, {divider: true})
	
	    var child = this.props.children;
	
	    return (
	       React.createElement(MenuItem, {className: "prop-item", onClick: this.navigate}, 
	        child
	       )
	    );
	  }
	
	});
	
	module.exports = ApiMenuItem;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Default = __webpack_require__(18);
	
	var ApiPropHeader = React.createClass({displayName: 'ApiPropHeader',
	
	  contextTypes: {
	    prefix: React.PropTypes.string.isRequired
	  },
	
	  render: function() {
	    var $__0= 
	         
	        
	        
	        
	           this.props,children=$__0.children,handler=$__0.handler,type=$__0.type,controllable=$__0.controllable,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{children:1,handler:1,type:1,controllable:1});
	
	
	    return (
	       React.createElement("h3", {className: "prop-header", id: ("/" + (this.context.prefix + children.replace(' ', '_')))}, 
	        children, 
	         type && 
	          React.createElement("small", null, 
	            type, 
	             props.default && 
	              React.createElement(Default, null, props.default)
	            
	          ), 
	        
	         controllable && 
	          React.createElement("strong", null, ("controllable (" + handler + ", " + defaultKey(children) + ")"))
	        
	       )
	    );
	  }
	
	});
	
	function defaultKey(key){
	  return 'default' + key.charAt(0).toUpperCase() + key.substr(1)
	}
	
	module.exports = ApiPropHeader;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1);
	
	var defaultValue = React.createClass({displayName: 'defaultValue',
	
	  render: function() {
	    return (
	      React.createElement("span", {className: "default"}, 
	        "(default: " + this.props.children + ")"
	      )
	    );
	  }
	
	});
	
	module.exports = defaultValue;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Button = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , RW = __webpack_require__(72);
	
	var i = 0
	  , list = [
	    { id: i += 1, name: "James" },
	    { id: i += 1, name: "Jan" },
	    { id: i += 1, name: "Jase" },
	    { id: i += 1, name: "Jason" },
	    { id: i += 1, name: "Jim" },
	    { id: i += 1, name: "Jimmy" },
	    { id: i += 1, name: "Jimmy Smith" },
	    { id: i += 1, name: "John" }
	  ];
	
	module.exports = React.createClass({displayName: 'exports',
	
	  getInitialState: function(){
	    return {
	      duration: 250,
	      value: 1,
	      suggest: true
	    }
	  },
	
	  render: function(){
	    var props;
	
	    props = {
	      data: list,
	      defaultValue: 1,
	      textField: 'name',
	      valueField: 'id',
	      suggest: this.state.suggest || false,
	      filter: this.state.filter || false,
	      disabled: this.state.disabled === 'disabled',
	      readOnly: this.state.disabled === 'readonly',
	      groupBy: this.state.groupBy,
	      duration: this.state.duration,
	      busy: this.state.busy,
	      isRtl: this.state.isRtl
	    }
	
	    return (
	      React.createElement("div", {className: "example"}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-md-6 col-lg-7 demo"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(RW.Combobox, React.__spread({},  props))
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", null, "Custom list Rendering"), 
	              React.createElement(RW.Combobox, React.__spread({},  props, {itemComponent: itemComp}))
	            )
	          ), 
	          React.createElement("div", {className: "col-md-6 col-lg-5 api-panel"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.isRtl, 
	                  onChange: this._set.bind(null, 'isRtl', !this.state.isRtl)}), 
	                  "Right to Left"
	              )
	            ), 
	            
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(ButtonGroup, null, 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'disabled', 
	                  onClick: this.disabled}, 
	                  "Disable"
	                ), 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'readonly', 
	                  onClick: this.readOnly}, 
	                  "Readonly"
	                )
	              ), 
	              React.createElement(Button, {style: { marginLeft: 10}, 
	                active: this.state.busy, 
	                onClick: this._set.bind(null, 'busy', !this.state.busy)}, 
	                "Busy"
	              )
	            ), 
	            
	            
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.groupBy, 
	                  onChange: this._set.bind(null, 'groupBy', !this.state.groupBy ? (function(item)  {return item.name.substr(0,2);}) : null)}), 
	                  "Group"
	              ), 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.suggest, 
	                  onChange: this._set.bind(null, 'suggest', !this.state.suggest)}), 
	                  "Suggestions"
	              )
	            ), 
	
	            React.createElement("div", {className: "row"}, 
	              React.createElement("div", {className: "form-group col-xs-6"}, 
	                React.createElement("label", {className: "form-label"}, "Filter"), 
	                React.createElement(RW.DropdownList, {
	                    value: this.state.filter || false, 
	                    data: [false, 'startsWith', 'endsWith', 'contains'], 
	                    onChange: this._set.bind(null, 'filter')})
	              ), 
	
	              React.createElement("div", {className: "form-group  col-xs-6"}, 
	                React.createElement("label", {className: "form-label"}, "Duration"), 
	                React.createElement(RW.NumberPicker, {
	                    value: this.state.duration, 
	                    step: 200, 
	                    min: 0, 
	                    max: 1000, 
	                    onChange: this._set.bind(null, 'duration')})
	              )
	            )
	          )
	        )
	      )
	    )
	  },
	
	  _change: function(val){
	    this.setState({ value: val })
	  },
	
	  _set: function(field, value){
	    var obj = {}
	    obj[field] = value
	    this.setState(obj)
	  },
	
	  readOnly: function(){
	    var val = this.state.disabled === 'readonly' ? false : 'readonly'
	    this.setState({ disabled: val })
	  },
	
	  disabled: function(){
	    var val = this.state.disabled === 'disabled' ? false : 'disabled'
	    this.setState({ disabled: val })
	  },
	
	})
	
	var itemComp = React.createClass({displayName: 'itemComp',
	  render: function() {
	    var icons =  ['bicycle', 'area-chart', 'anchor']
	
	    this._icon || (this._icon = icons[getRandomInt(0, 2)])
	    return (
	      React.createElement("div", null, 
	        React.createElement("i", {className: 'fa fa-' + this._icon}), 
	         '  ' + this.props.item.name
	      )
	    );
	  }
	});
	
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Button = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , Dropdown = __webpack_require__(72).DropdownList
	  , NumberPicker = __webpack_require__(72).NumberPicker
	  , genData = __webpack_require__(73);
	
	var valueComp = React.createClass({displayName: 'valueComp',
	  render: function() {
	
	    return (React.createElement("span", null, React.createElement("i", {className: "fa fa-comment"}),  '  ' + this.props.item.name))
	  }
	});
	
	var itemComp = React.createClass({displayName: 'itemComp',
	  render: function() {
	    var icons =  ['bicycle', 'area-chart', 'anchor']
	
	    this._icon || (this._icon = icons[getRandomInt(0, 2)])
	    return (
	      React.createElement("div", null, 
	        React.createElement("i", {className: 'fa fa-' + this._icon}), 
	         '  ' + this.props.item.name
	      )
	    );
	  }
	});
	
	
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	var list = genData(25);
	
	var DropdownApi = React.createClass({displayName: 'DropdownApi',
	
	  getInitialState: function(){
	
	    return {
	      duration: 250,
	    }
	  },
	
	  render: function() {
	    
	    var props = {
	      disabled: this.state.disabled === 'disabled',
	      readOnly: this.state.disabled === 'readonly',
	      groupBy: this.state.groupBy,
	      defaultValue: 1,
	      data: list,
	      duration: this.state.duration,
	      busy: this.state.busy,
	      isRtl: this.state.isRtl,
	      valueField: 'id',
	      textField: 'name'
	    }
	
	    return (
	      React.createElement("div", {className: "example"}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-md-6 col-lg-7 demo"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(Dropdown, React.__spread({},  props ))
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", null, "Custom Rendering"), 
	              React.createElement(Dropdown, React.__spread({},  props , 
	                {valueComponent: valueComp, 
	                itemComponent: itemComp}))
	            )
	          ), 
	          React.createElement("div", {className: "col-md-6 col-lg-5 api-panel"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.isRtl, 
	                  onChange: this._set.bind(null, 'isRtl', !this.state.isRtl)}), 
	                  "Right to Left"
	              ), 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.groupBy, 
	                  onChange: this._set.bind(null, 'groupBy', !this.state.groupBy ? 'last' : null)}), 
	                  "Group"
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(ButtonGroup, null, 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'disabled', 
	                  onClick: this.disabled}, 
	                  "Disable"
	                ), 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'readonly', 
	                  onClick: this.readOnly}, 
	                  "Readonly"
	                )
	              ), 
	              React.createElement(Button, {style: { marginLeft: 10}, 
	                active: this.state.busy, 
	                onClick: this._set.bind(null, 'busy', !this.state.busy)}, 
	                "Busy"
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "Duration"), 
	              React.createElement(NumberPicker, {
	                  value: this.state.duration, 
	                  step: 200, 
	                  min: 0, 
	                  max: 1000, 
	                  onChange: this._set.bind(null, 'duration')})
	            )
	          )
	        )
	      )
	    );
	  },
	
	  _change: function(val){
	    this.setState({ value: val })
	  },
	
	  _set: function(field, value){
	    var obj = {}
	    obj[field] = value
	    this.setState(obj)
	  },
	
	  readOnly: function(){
	    var val = this.state.disabled === 'readonly' ? false : 'readonly'
	    this.setState({ disabled: val })
	  },
	
	  disabled: function(){
	    var val = this.state.disabled === 'disabled' ? false : 'disabled'
	    this.setState({ disabled: val })
	  },
	});
	
	module.exports = DropdownApi;
	


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Button = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , RW = __webpack_require__(72)
	  , genData = __webpack_require__(73);
	
	var list = genData(50);
	
	module.exports = React.createClass({displayName: 'exports',
	
	  getInitialState: function(){
	    return {
	      duration: 250,
	      value: [],
	      suggest: true,
	      allowCustom: true,
	      placeholder: 'a placeholder...'
	    }
	  },
	
	  render: function(){
	    var allVals = this.state.value
	      , disabled = this.state.disabled === true || Array.isArray(this.state.disabled);
	
	    var props = {
	      data: list,
	      value: this.state.value,
	      onChange: this._change,
	      textField: 'name',
	      valueField: 'id',
	      placeholder: this.state.placeholder,
	      disabled: disabled ? this.state.disabled : false,
	      readOnly: this.state.disabled === 'readonly',
	      onCreate: this.state.allowCustom && onCreate.bind(this),
	      groupBy: this.state.groupBy,
	      duration: this.state.duration,
	      busy: this.state.busy,
	      isRtl: this.state.isRtl
	    }
	
	    function onCreate(tag){
	      var parts = tag.split(' ')
	      //list.push(tag)
	      this.setState({
	        value: [].concat(this.state.value, { 
	          id: list.length + 1, 
	          name: tag, 
	          first: parts[0],
	          last: parts[1],
	        }),
	      })
	    }
	
	    return (
	      React.createElement("div", {className: "example"}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-md-6 col-lg-7 demo"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(RW.Multiselect, React.__spread({},  props))
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", null, "Custom Rendering"), 
	              React.createElement(RW.Multiselect, React.__spread({},  props , 
	                  {itemComponent: itemComp, 
	                  tagComponent: itemComp}))
	            )
	          ), 
	          React.createElement("div", {className: "col-md-6 col-lg-5 api-panel"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.isRtl, 
	                  onChange: this._set.bind(null, 'isRtl', !this.state.isRtl)}), 
	                  "Right to Left"
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.allowCustom, 
	                  onChange: this._set.bind(null, 'allowCustom', !this.state.allowCustom)}), 
	                  "Allow custom tags"
	              ), 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.groupBy, 
	                  onChange: this._set.bind(null, 'groupBy', !this.state.groupBy ? 'last' : null)}), 
	                  "Group"
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(ButtonGroup, null, 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'disabled', 
	                  onClick: this.disabled}, 
	                  "Disable"
	                ), 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'readonly', 
	                  onClick: this.readOnly}, 
	                  "Readonly"
	                )
	              ), 
	              React.createElement(Button, {style: { marginLeft: 10}, 
	                active: this.state.busy, 
	                onClick: this._set.bind(null, 'busy', !this.state.busy)}, 
	                "Busy"
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "Disable Multiselect Values"), 
	              React.createElement(RW.Multiselect, {
	                  value:  Array.isArray(this.state.disabled) ? this.state.disabled : [], 
	                  data: allVals, 
	                  textField: "name", 
	                  valueField: "id", 
	                  disabled: this.state.disabled === true, 
	                  messages: { emptyList: "no values selected to the right"}, 
	                  onChange: this._set.bind(null, 'disabled')})
	            ), 
	            React.createElement("div", {className: "row"}, 
	              React.createElement("div", {className: "form-group col-xs-7"}, 
	                React.createElement("label", {className: "control-label"}, "Placeholder"), 
	                React.createElement("input", {className: "form-control", type: "text", 
	                    value: this.state.placeholder, 
	                    onChange: extract(this._set.bind(null, 'placeholder'))})
	              ), 
	
	              React.createElement("div", {className: "form-group col-xs-5"}, 
	                React.createElement("label", {className: "control-label"}, "Duration"), 
	                React.createElement(RW.NumberPicker, {
	                    value: this.state.duration, 
	                    step: 200, 
	                    min: 0, 
	                    max: 1000, 
	                    onChange: this._set.bind(null, 'duration')})
	              )
	            )
	          )
	        )
	      )
	    )
	  },
	
	  _change: function(val){
	    this.setState({ value: val })
	  },
	
	  _set: function(field, value){
	    var obj = {}
	    obj[field] = value
	    this.setState(obj)
	  },
	
	  readOnly: function(){
	    var val = this.state.disabled === 'readonly' ? false : 'readonly'
	    this.setState({ disabled: val })
	  },
	
	  disabled: function(){
	    var val = this.state.disabled === true ? false : true
	    this.setState({ disabled: val })
	  },
	
	})
	
	function extract(fn){
	  return function(e){
	    return fn(e.target.value)
	  }
	}
	
	var itemComp = React.createClass({displayName: 'itemComp',
	  render: function() {
	    var icons =  ['bicycle', 'area-chart', 'anchor']
	
	    this._icon || (this._icon = icons[getRandomInt(0, 2)])
	    return (
	      React.createElement("span", null, 
	        React.createElement("i", {className: 'fa fa-' + this._icon}), 
	         '  ' + this.props.item.name
	      )
	    );
	  }
	});
	
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Button = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , RW = __webpack_require__(72);
	
	
	// var valueComp = React.createClass({
	//   render: function() {
	//     return (<span><i className='fa fa-comment'></i>{ '  ' + this.props.item.label }</span>)
	//   }
	// });
	
	// var itemComp = React.createClass({
	//   render: function() {
	//     var icons =  ['bicycle', 'area-chart', 'anchor']
	
	//     this._icon || (this._icon = icons[getRandomInt(0, 2)])
	//     return (
	//       <div>
	//         <i className={'fa fa-' + this._icon}></i>
	//         { '  ' + this.props.item.label}
	//       </div>
	//     );
	//   }
	// });
	
	// function getRandomInt(min, max) {
	//   return Math.floor(Math.random() * (max - min + 1)) + min;
	// }
	
	var list = [
	        { label: 'orange', id: 1 },
	        { label: 'blue',   id: 2 },
	        { label: 'red',    id: 3 },
	        { label: 'maroon', id: 4 },
	        { label: 'purple', id: 5 },
	        { label: 'mauve',  id: 6 },
	      ];
	
	var DropdownApi = React.createClass({displayName: 'DropdownApi',
	
	  getInitialState: function(){
	
	    return {
	      duration: 250,
	    }
	  },
	
	  render: function() {
	    var disabled = this.state.disabled === true || Array.isArray(this.state.disabled);
	
	    return (
	      React.createElement("div", {className: "example"}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-md-6 col-lg-7 demo"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(RW.SelectList, {
	                disabled: disabled ? this.state.disabled : false, 
	                readOnly: this.state.disabled === 'readonly', 
	                value: this.state.value, 
	                data: list, 
	                multiple: this.state.multiple, 
	                busy: this.state.busy, 
	                onChange: this._change, 
	                isRtl: this.state.isRtl, 
	                valueField: "id", 
	                textField: "label"}
	                )
	            )
	          ), 
	          React.createElement("div", {className: "col-md-6 col-lg-5 api-panel"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.isRtl, 
	                  onChange: this._set.bind(null, 'isRtl', !this.state.isRtl)}), 
	                  "Right to Left"
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.multiple, 
	                  onChange: this._set.bind(null, 'multiple', !this.state.multiple)}), 
	                  "Is Multiple"
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(ButtonGroup, null, 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'disabled', 
	                  onClick: this.disabled}, 
	                  "Disable"
	                ), 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'readonly', 
	                  onClick: this.readOnly}, 
	                  "Readonly"
	                )
	              ), 
	              React.createElement(Button, {style: { marginLeft: 10}, 
	                active: this.state.busy, 
	                onClick: this._set.bind(null, 'busy', !this.state.busy)}, 
	                "Busy"
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "Disable Values"), 
	              React.createElement(RW.Multiselect, {
	                  value:  Array.isArray(this.state.disabled) ? this.state.disabled : [], 
	                  data: list, 
	                  textField: "label", 
	                  valueField: "id", 
	                  disabled: this.state.disabled === true, 
	                  onChange: this._set.bind(null, 'disabled')})
	            )
	          )
	        )
	      )
	    );
	  },
	
	  _change: function(val){
	    this.setState({ value: val })
	  },
	
	  _set: function(field, value){
	    var obj = {}
	    obj[field] = value
	    this.setState(obj)
	  },
	
	  readOnly: function(){
	    var val = this.state.disabled === 'readonly' ? false : 'readonly'
	    this.setState({ disabled: val })
	  },
	
	  disabled: function(){
	    var val = this.state.disabled === true ? false : true
	    this.setState({ disabled: val })
	  }
	});
	
	module.exports = DropdownApi;
	


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React       = __webpack_require__(1)
	  , Button      = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , RW          = __webpack_require__(72);
	
	module.exports = React.createClass({displayName: 'exports',
	  getInitialState: function(){
	    return {
	      format: ''
	    }
	  },
	
	  render: function(){
	
	    return (
	      React.createElement("div", {className: "example"}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-md-6 col-lg-7 demo"}, 
	            React.createElement(RW.Calendar, {
	                value: this.state.value, 
	                onChange: this._change, 
	                max: this.state.max, 
	                min: this.state.min, 
	                finalView: this.state.finalView, 
	                initialView: this.state.initialView, 
	                disabled: this.state.disabled === 'disabled', 
	                readOnly: this.state.disabled === 'readonly', 
	                isRtl: this.state.isRtl})
	          ), 
	          React.createElement("div", {className: "col-md-6 col-lg-5 api-panel"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.isRtl, 
	                  onChange: this._set.bind(null, 'isRtl', !this.state.isRtl)}), 
	                  "Right to Left"
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(ButtonGroup, null, 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'disabled', 
	                  onClick: this.disabled}, 
	                  "Disable"
	                ), 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'readonly', 
	                  onClick: this.readOnly}, 
	                  "Readonly"
	                )
	              )
	            ), 
	            React.createElement("div", {className: "row"}, 
	              React.createElement("div", {className: "form-group col-xs-6"}, 
	                React.createElement("label", {className: "form-label"}, "Initial View"), 
	                React.createElement(RW.DropdownList, {
	                    value: this.state.initialView || 'month', 
	                    data: ["month", "year", "decade", "century"], 
	                    onChange: this._set.bind(null, 'initialView')})
	              ), 
	              React.createElement("div", {className: "form-group col-xs-6"}, 
	                React.createElement("label", {className: "form-label"}, "Final View"), 
	                React.createElement(RW.DropdownList, {
	                    value: this.state.finalView || 'century', 
	                    data: ["month", "year", "decade", "century"], 
	                    onChange: this._set.bind(null, 'finalView')})
	              )
	            ), 
	            React.createElement("div", {className: "row"}, 
	              React.createElement("div", {className: "form-group col-xs-6"}, 
	                React.createElement("label", {className: "control-label"}, "min"), 
	                React.createElement(RW.DateTimePicker, {
	                    time: false, 
	                    format: "MMM dd, yyyy", 
	                    value: this.state.min, 
	                    onChange: this._set.bind(null, 'min')})
	              ), 
	              React.createElement("div", {className: "form-group col-xs-6"}, 
	                React.createElement("label", {className: "control-label"}, "max"), 
	                React.createElement(RW.DateTimePicker, {
	                    time: false, 
	                    format: "MMM dd yyyy", 
	                    value: this.state.max, 
	                    onChange: this._set.bind(null, 'max')})
	              )
	            )
	          )
	        )
	      )
	    )
	  },
	
	  _change: function(val){
	    this.setState({ value: val })
	  },
	
	  _set: function(field, value){
	    var obj = {}
	    obj[field] = value
	    this.setState(obj)
	  },
	
	  readOnly: function(){
	    var val = this.state.disabled === 'readonly' ? false : 'readonly'
	    this.setState({ disabled: val })
	  },
	
	  disabled: function(){
	    var val = this.state.disabled === 'disabled' ? false : 'disabled'
	    this.setState({ disabled: val })
	  },
	
	})
	
	          


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , dates = __webpack_require__(97)
	  , Button = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , RW = __webpack_require__(72);
	
	module.exports = React.createClass({displayName: 'exports',
	  getInitialState: function(){
	    return {
	      calendar: true,
	      time: true,
	      format: 'f',
	    }
	  },
	
	  render: function(){
	    var props;
	
	    props = {
	      format: this.state.format,
	      max: this.state.max || undefined,
	      min: this.state.min || undefined,
	      calendar: this.state.calendar,
	      time: this.state.time,
	      finalView: this.state.finalView,
	      initialView: this.state.initialView,
	      disabled: this.state.disabled === 'disabled',
	      readOnly: this.state.disabled === 'readonly',
	      isRtl: this.state.isRtl,
	    }
	
	
	    return (
	      React.createElement("div", {className: "example"}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-md-6 demo"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(RW.DateTimePicker, React.__spread({},  props))
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", null, "Custom Rendering"), 
	              React.createElement(RW.DateTimePicker, React.__spread({},  props, {timeComponent: itemComp}))
	            )
	          ), 
	          React.createElement("div", {className: "col-md-6 api-panel"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.isRtl, 
	                  onChange: this._set.bind(null, 'isRtl', !this.state.isRtl)}), 
	                  "Right to Left"
	              )
	            ), 
	            React.createElement("div", {className: "row"}, 
	              React.createElement("div", {className: "form-group col-xs-7"}, 
	                React.createElement(ButtonGroup, null, 
	                  React.createElement(Button, {active: this.state.disabled === 'disabled', onClick: this.disabled}, 
	                    "Disable"
	                  ), 
	                  React.createElement(Button, {active: this.state.disabled === 'readonly', onClick: this.readOnly}, 
	                    "Readonly"
	                  )
	                )
	              ), 
	              React.createElement("div", {className: "form-group col-xs-5"}, 
	                  React.createElement(Button, {
	                    active: this.state.calendar, 
	                    onClick: this._set.bind(null, 'calendar', !this.state.calendar)}, 
	                    "Date"
	                  ), 
	                  React.createElement(Button, {style: { marginLeft: 10}, 
	                    active: this.state.time, 
	                    onClick: this._set.bind(null, 'time', !this.state.time)}, 
	                    "Time"
	                  )
	              )
	            ), 
	
	            React.createElement("div", {className: "row"}, 
	              React.createElement("div", {className: "form-group col-xs-4 col-md-12 col-lg-4"}, 
	                React.createElement("label", {className: "form-label"}, "Format"), 
	                React.createElement(RW.Combobox, {
	                    value: this.state.format, 
	                    data: ['MMM dd, yyyy', 'f', 'dd, MMM yyyy HH:mm'], 
	                    onChange: this._set.bind(null, 'format')})
	              ), 
	              React.createElement("div", {className: "form-group col-xs-4 col-md-6 col-lg-4"}, 
	                React.createElement("label", {className: "form-label"}, "Initial View"), 
	                React.createElement(RW.DropdownList, {
	                    value: this.state.initialView || 'month', 
	                    data: ["month", "year", "decade", "century"], 
	                    onChange: this._set.bind(null, 'initialView')})
	              ), 
	              React.createElement("div", {className: "form-group col-xs-4 col-md-6 col-lg-4"}, 
	                React.createElement("label", {className: "form-label"}, "Final View"), 
	                React.createElement(RW.DropdownList, {
	                    value: this.state.finalView || 'century', 
	                    data: ["month", "year", "decade", "century"], 
	                    onChange: this._set.bind(null, 'finalView')})
	              )
	            ), 
	            React.createElement("div", {className: "row"}, 
	              React.createElement("div", {className: "form-group col-xs-6"}, 
	                React.createElement("label", {className: "control-label"}, "min"), 
	                React.createElement(RW.DateTimePicker, {
	                    time: false, 
	                    format: "MMM dd, yyyy", 
	                    value: this.state.min, 
	                    onChange: this._set.bind(null, 'min')})
	              ), 
	              React.createElement("div", {className: "form-group col-xs-6"}, 
	                React.createElement("label", {className: "control-label"}, "max"), 
	                React.createElement(RW.DateTimePicker, {
	                    time: false, 
	                    format: "MMM dd yyyy", 
	                    value: this.state.max, 
	                    onChange: this._set.bind(null, 'max')})
	              )
	            )
	
	          )
	        )
	      )
	    )
	  },
	
	  _change: function(val){
	    this.setState({ value: val })
	  },
	
	  _set: function(field, value){
	    var obj = {}
	    obj[field] = value
	    this.setState(obj)
	  },
	
	  readOnly: function(){
	    var val = this.state.disabled === 'readonly' ? false : 'readonly'
	    this.setState({ disabled: val })
	  },
	
	  disabled: function(){
	    var val = this.state.disabled === 'disabled' ? false : 'disabled'
	    this.setState({ disabled: val })
	  },
	})
	
	
	var itemComp = React.createClass({displayName: 'itemComp',
	  render: function() {
	    var date   = merge(new Date, this.props.item.date) 
	      , inPast = dates.lt(date, new Date, 'minutes')
	
	    return (
	      React.createElement("div", {className: inPast ? 'overdue' : ''}, 
	        React.createElement("i", {className: 'fa fa-' + (inPast ? 'history' : 'clock')}), 
	         '  ' + this.props.item.label
	      )
	    );
	  }
	});
	
	
	function merge(date, time){
	  if( time == null && date == null)
	    return null
	
	  if( time == null) time = new Date
	  if( date == null) date = new Date
	
	  date = dates.startOf(date, 'day')
	  date = dates.hours(date,        dates.hours(time))
	  date = dates.minutes(date,      dates.minutes(time))
	  date = dates.seconds(date,      dates.seconds(time))
	  return dates.milliseconds(date, dates.milliseconds(time))
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Button = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , RW = __webpack_require__(72);
	
	module.exports = React.createClass({displayName: 'exports',
	  getInitialState: function(){
	    return {
	      value: 15,
	      format: 'D',
	      step: 1,
	    }
	  },
	
	  render: function(){
	
	    return (
	      React.createElement("div", {className: "example"}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-md-6 col-lg-7 demo"}, 
	            React.createElement(RW.NumberPicker, {
	                value: this.state.value, 
	                onChange: this._change, 
	                max: this.state.max, 
	                min: this.state.min, 
	                step: this.state.step, 
	                disabled: this.state.disabled === 'disabled', 
	                readOnly: this.state.disabled === 'readonly', 
	                format: this.state.format, 
	                isRtl: this.state.isRtl})
	          ), 
	          React.createElement("div", {className: "col-md-6 col-lg-5 api-panel"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.isRtl, 
	                  onChange: this._set.bind(null, 'isRtl', !this.state.isRtl)}), 
	                  "Right to Left"
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(ButtonGroup, null, 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'disabled', 
	                  onClick: this.disabled}, 
	                  "Disable"
	                ), 
	                React.createElement(Button, {
	                  active: this.state.disabled === 'readonly', 
	                  onClick: this.readOnly}, 
	                  "Readonly"
	                )
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "Filter"), 
	              React.createElement(RW.DropdownList, {
	                  value: this.state.filter || false, 
	                  data: [false, 'startsWith', 'endsWith', 'contains'], 
	                  onChange: this._set.bind(null, 'filter')})
	            ), 
	
	            React.createElement("div", {className: "row"}, 
	
	              React.createElement("div", {className: "form-group col-xs-4"}, 
	                React.createElement("label", {className: "form-label "}, "step"), 
	                React.createElement(RW.NumberPicker, {
	                    value: this.state.step, 
	                    onChange: this._set.bind(null, 'step')})
	              ), 
	
	              React.createElement("div", {className: "col-xs-4 form-group"}, 
	                React.createElement("label", {className: "form-label"}, "min"), 
	                React.createElement(RW.NumberPicker, {
	                    value: this.state.min, 
	                    onChange: this._set.bind(null, 'min')})
	
	              ), 
	              React.createElement("div", {className: "form-group col-xs-4"}, 
	                React.createElement("label", {className: "form-label"}, "max"), 
	                React.createElement(RW.NumberPicker, {
	                    value: this.state.max, 
	                    onChange: this._set.bind(null, 'max')})
	              )
	            )
	          )
	        )
	      )
	    )
	  },
	
	  _change: function(val){
	    this.setState({ value: val })
	  },
	
	  _set: function(field, value){
	    var obj = {}
	    obj[field] = value
	    this.setState(obj)
	  },
	
	  readOnly: function(){
	    var val = this.state.disabled === 'readonly' ? false : 'readonly'
	    this.setState({ disabled: val })
	  },
	
	  disabled: function(){
	    var val = this.state.disabled === 'disabled' ? false : 'disabled'
	    this.setState({ disabled: val })
	  },
	
	})
	
	function extract(fn){
	  return function(e){
	    return fn(e.target.value)
	  }
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName, isArray){
	  var value = !isArray ? '"orange"' : '["orange", "red"]'
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\n\nvar colors = ['orange', 'red', 'blue', 'purple'];\n\nReact.render(\n    <" + 
	
	
	
	
	widgetName + " defaultValue={" + value + "} data={colors}/>\n  , mountNode);"
	)
	
	return code
	}
	
	


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName, isArray){
	var value = !isArray ? 'colors[0]' : 'colors.slice(0,1)'
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + "\n  , colors = ['orange', 'red', 'blue', 'purple'];\n\nvar Example = React.createClass({\n\n  getInitialState() {\n    return { value: " + 
	
	
	
	
	
	value + " };\n  },\n\n  render() {\n    return (\n      <" + 
	
	
	
	
	widgetName + " \n        data={colors} \n        value={this.state.value}\n        onChange={value => this.setState({ value })}/>)\n  }\n});\n\nReact.render(<Example/>, mountNode);"
	
	
	
	
	
	
	)
	
	  return code
	
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName){
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + "\n  , colors = ['orange', 'red', 'blue', 'purple'];\n\nvar widget =\n      <" + 
	
	
	
	widgetName + " \n        onSelect={() => alert('selected!')} \n        onChange={() => alert('changed!')} \n        data={colors} />\n\nReact.render(widget, mountNode);"
	
	
	
	
	)
	
	return code
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName, isArray){
	var value = !isArray ? '0' : '[0, 1]'
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\nvar colors = [\n  { id: 0, name: 'orange'},\n  { id: 1, name: 'purple'},\n  { id: 2, name: 'red' },\n  { id: 3, name: 'blue' },\n];\n\nvar widget = \n    <" + 
	
	
	
	
	
	
	
	
	widgetName + " \n      valueField='id' textField='name'\n      data={colors}\n      defaultValue={" + 
	
	
	value + "}/>\n\nReact.render(widget, mountNode);"
	
	)
	
	return code
	}
	


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName, isArray){
	var value = !isArray ? 'colors[0]' : 'colors.slice(0,2)'
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\n\nvar colors = [\n  { id: 0, name: 'orange'},\n  { id: 1, name: 'purple'},\n  { id: 2, name: 'red' },\n  { id: 3, name: 'blue' },\n];\n\nvar widget = \n    <" + 
	
	
	
	
	
	
	
	
	
	widgetName + " \n      textField='name'\n      defaultValue={" + 
	
	value + "} \n      data={colors}/>\n\nReact.render(widget, mountNode);"
	
	
	)
	
	return code
	}
	


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function(widgetName) {
	
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\nvar people = listOfPeople();\n\nvar ListItem = React.createClass({\n  render() {\n    var person = this.props.item;\n\n    return (\n      <span>\n        <strong>{ person.firstName }</strong>\n        { \" \" + person.lastName }\n      </span>);\n  }\n})\n\nvar widget =(\n    <" + 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	widgetName + " \n      data={people} \n      textField='name'\n      itemComponent={ListItem}/>\n  ) \n\nReact.render(widget, mountNode);"
	
	
	
	
	
	)
	
	return code
	}
	
	


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function(widgetName) {
	
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\n\nvar people = listOfPeople();\n\nvar widgets =(\n  <div>\n    <" + 
	
	
	
	
	
	widgetName + " \n      data={people} defaultValue={people[0]}\n      textField='name' \n      groupBy='lastName'/>\n\n    <" + 
	
	
	
	
	widgetName + " \n      data={people} defaultValue={people[0]}\n      textField='name' \n      groupBy={ person => person.name.length }/>\n  </div>) \n\nReact.render(widgets, mountNode);"
	
	
	
	
	
	)
	
	return code
	}
	
	


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function(widgetName) {
	
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\nvar people = listOfPeople();\n\nvar GroupByLength = React.createClass({\n  render() {\n    return (<span>\n        {this.props.item + ' letters long'}\n      </span>);\n  }\n})\n\nvar widget =(\n    <" + 
	
	
	
	
	
	
	
	
	
	
	
	widgetName + " \n      data={people} defaultValue={people[0]}\n      textField='name' \n      groupBy={ person => person.name.length }\n      groupComponent={GroupByLength}/>\n  ) \n\nReact.render(widget, mountNode);"
	
	
	
	
	
	
	)
	
	return code
	}
	
	


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function(widgetName) {
	
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\nvar people = listOfPeople();\n\nvar widgets =(<div>\n    <" + 
	
	
	
	widgetName + " \n      data={people} defaultValue={people[0]}\n      textField='name' \n      filter='contains'/>\n    <" + 
	
	
	
	widgetName + " \n      data={people} defaultValue={people[0]}\n      textField='name' \n      filter={filterLastName}/>\n  </div>) \n\nfunction filterLastName(person, value) { \n  var lastname = person.lastName.toLowerCase()\n    , search   = value.toLowerCase();\n\n  return lastname.indexOf(search) === 0 \n}\n\nReact.render(widgets, mountNode);"
	
	
	
	
	
	
	
	
	
	
	
	
	)
	
	return code
	}
	
	


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName){
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + "\n  , colors = ['orange', 'red', 'blue', 'purple'];\n\nvar Example = React.createClass({\n\n  getInitialState() {\n    return { open: false };\n  },\n\n  render() {\n    var open = this.state.open\n      , toggle = () => this.setState({ open: !open});\n\n    return (<div>\n      <button onClick={toggle}>\n        { open ? 'close' : 'open'}\n      </button>\n      <" + 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	widgetName + " open={open} data={colors} />\n    </div>)\n  }\n});\n\nReact.render(<Example/>, mountNode);"
	
	
	
	
	)
	
	return code
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName){
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\n\nReact.render(\n  <" + 
	
	
	widgetName + " busy />, mountNode);")
	
	return code
	}
	


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function(widgetName) {
	
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\nvar people = listOfPeople();\n\nvar ValueInput = React.createClass({\n  render() {\n    return (\n      <span>\n        <strong>hi, </strong>{ this.props.item.name }\n      </span>);\n  }\n})\n\nvar widget =(\n    <" + 
	
	
	
	
	
	
	
	
	
	
	
	
	widgetName + " data={people} \n      textField='name'\n      defaultValue={people[0]}\n      valueComponent={ValueInput}/>\n  ) \n\nReact.render(widget, mountNode);"
	
	
	
	
	
	)
	
	return code
	}
	
	


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName){
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + "\n  , people = listOfPeople();\n\nvar Example = React.createClass({\n\n  getInitialState() {\n    return { value: people.slice(0,2) };\n  },\n\n  _create(name){\n    var tag = { name, id: people.length + 1 } \n    var value = this.state.value.concat(tag)\n    // add new tag to the data list\n    people.push(tag) \n    //add new tag to the list of values\n    this.setState({ value }) \n  },\n\n  render(){\n    // create a tag object\n    return (\n      <Multiselect data={people}\n        value={this.state.value} \n        textField=\"name\"\n        onCreate={this._create}\n        onChange={value => this.setState({ value })}/>\n    )\n  }\n});\n\nReact.render(<Example/>, mountNode);"
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	)
	
	return code
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function(widgetName) {
	
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\nvar people = listOfPeople();\n\nvar TagItem = React.createClass({\n  render() {\n    var person = this.props.item;\n    return (\n      <span>\n        <strong>{ person.firstName }</strong>\n        { \" \" + person.lastName }\n      </span>);\n  }\n})\n\nvar widget =(\n    <" + 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	widgetName + " \n      data={people} \n      textField='name'\n      tagComponent={TagItem}/>) \n\nReact.render(widget, mountNode)"
	
	
	
	
	)
	
	return code
	}
	
	


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName, prop){
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + "\n  , colors = ['orange', 'red', 'blue', 'purple'];\n\nvar Example = React.createClass({\n\n  render() {\n    return (<div>\n      <" + 
	
	
	
	
	
	
	widgetName + " " + prop + " />\n      <" + 
	widgetName + " " + prop + "={colors.slice(1,2)}\n        data={colors}\n        defaultValue={colors.slice(0,2)}/>\n    </div>)\n  }\n});\n\nReact.render(<Example/>, mountNode);"
	
	
	
	
	
	
	)
	
	return code
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName, values){
	  var open = values.length > 1 ? "(<div>" : ''
	    , close = values.length > 1 ? "</div>)" : ''
	  var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\n\nvar widgets = " + 
	
	open + "\n    " + 
	values.map(getWidget).join('').trim() + "\n  " + 
	close + "\n    \nReact.render(widgets, mountNode);"
	
	)
	
	  return code
	
	  function getWidget(v){
	    return ("\n    <" + 
	widgetName + " defaultValue={" + v + "} />")
	  }
	}
	
	
	
	


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName, values){
	  var open = values.length > 1 ? "(<div>" : '('
	    , close = values.length > 1 ? "</div>)" : ')'
	  var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\n\nvar Example = React.createClass({\n\n  getInitialState() {\n    return { " + 
	
	
	
	
	 values.map(getValue).join(', ') + " };\n  },\n\n  render() {\n    var change = (name, value) => {\n      var state = {}\n      state['value' + name] = value\n      this.setState(state)\n    };\n\n    return " + 
	
	
	
	
	
	
	
	
	
	open + "\n      " + 
	values.map(getWidget).join('').trim() + "\n    " + 
	close + "\n  }\n});\n\nReact.render(<Example/>, mountNode);"
	
	
	
	)
	
	return code
	
	  function getValue(v, idx){
	    return ("value" + idx + ": " + v)
	  }
	
	  function getWidget(v, idx){
	    return ("\n      <" + 
	widgetName + " \n        value={this.state.value" + 
	idx + "} \n        onChange={change.bind(null, '" + 
	idx + "')}/>")
	  }
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName, prop, value){
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\n\nReact.render(\n  <" + 
	
	
	widgetName + " " + prop + "={" + value + "} />, mountNode);")
	
	return code
	}
	
	


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName){
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + "\n\nvar widget =\n      <" + 
	
	
	widgetName + " \n        onSelect={() => alert('selected!')} \n        onChange={() => alert('changed!')}/>\n\nReact.render(widget, mountNode);"
	
	
	
	)
	
	return code
	}

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName, isArray){
	  var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\nvar formats = [\n  'MMM d yyyy', \n  'MMM d yy', \n  'd'\n];\n\nvar widgets = (<div>\n    <" + 
	
	
	
	
	
	
	
	widgetName + " parse={formats}/>\n{/* the naive approach: just use the Date constructor */}\n    <" + 
	
	widgetName + " parse={str => new Date(str)}/>\n    <span>Try typing a date using the specified formats</span>\n  </div>)\n\nReact.render(widgets, mountNode);"
	
	
	
	)
	
	  return code
	}


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	module.exports = function(widgetName){
	var code = 
	("\nvar " + 
	widgetName + " = ReactWidgets." + widgetName + ";\n\nvar Example = React.createClass({\n\n  getInitialState() {\n    return { open: false };\n  },\n\n  render() {\n    var open = this.state.open\n      , toggle = e => this.setState({ open: e.target.value });\n\n    return (<div>\n      <label>\n        <input onChange={toggle} type='radio' value='false' name='r'/> \n        Closed\n      </label>\n      <label>\n        <input onChange={toggle} type='radio' value='calendar' name='r'/> \n        Calendar \n      </label>\n      <label>\n        <input onChange={toggle} type='radio' value='time' name='r'/> \n        Time List\n      </label>\n      <" + 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	widgetName + " open={open}/>\n    </div>)\n  }\n});\n\nReact.render(<Example/>, mountNode);"
	
	
	
	
	)
	
	return code
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(78);
	var classSet = __webpack_require__(79);
	var BootstrapMixin = __webpack_require__(74);
	
	var Button = React.createClass({displayName: 'Button',
	  mixins: [BootstrapMixin],
	
	  propTypes: {
	    active:   React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    block:    React.PropTypes.bool,
	    navItem:    React.PropTypes.bool,
	    navDropdown: React.PropTypes.bool,
	    componentClass: React.PropTypes.node
	  },
	
	  getDefaultProps: function () {
	    return {
	      bsClass: 'button',
	      bsStyle: 'default',
	      type: 'button'
	    };
	  },
	
	  render: function () {
	    var classes = this.props.navDropdown ? {} : this.getBsClassSet();
	    var renderFuncName;
	
	    classes['active'] = this.props.active;
	    classes['btn-block'] = this.props.block;
	
	    if (this.props.navItem) {
	      return this.renderNavItem(classes);
	    }
	
	    renderFuncName = this.props.href || this.props.navDropdown ?
	      'renderAnchor' : 'renderButton';
	
	    return this[renderFuncName](classes);
	  },
	
	  renderAnchor: function (classes) {
	
	    var Component = this.props.componentClass || 'a';
	    var href = this.props.href || '#';
	    classes['disabled'] = this.props.disabled;
	
	    return (
	      React.createElement(Component, React.__spread({}, 
	        this.props, 
	        {href: href, 
	        className: joinClasses(this.props.className, classSet(classes)), 
	        role: "button"}), 
	        this.props.children
	      )
	    );
	  },
	
	  renderButton: function (classes) {
	    var Component = this.props.componentClass || 'button';
	
	    return (
	      React.createElement(Component, React.__spread({}, 
	        this.props, 
	        {className: joinClasses(this.props.className, classSet(classes))}), 
	        this.props.children
	      )
	    );
	  },
	
	  renderNavItem: function (classes) {
	    var liClasses = {
	      active: this.props.active
	    };
	
	    return (
	      React.createElement("li", {className: classSet(liClasses)}, 
	        this.renderAnchor(classes)
	      )
	    );
	  }
	});
	
	module.exports = Button;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(78);
	var classSet = __webpack_require__(79);
	var BootstrapMixin = __webpack_require__(74);
	var Button = __webpack_require__(47);
	
	var ButtonGroup = React.createClass({displayName: 'ButtonGroup',
	  mixins: [BootstrapMixin],
	
	  propTypes: {
	    vertical:  React.PropTypes.bool,
	    justified: React.PropTypes.bool
	  },
	
	  getDefaultProps: function () {
	    return {
	      bsClass: 'button-group'
	    };
	  },
	
	  render: function () {
	    var classes = this.getBsClassSet();
	    classes['btn-group'] = !this.props.vertical;
	    classes['btn-group-vertical'] = this.props.vertical;
	    classes['btn-group-justified'] = this.props.justified;
	
	    return (
	      React.createElement("div", React.__spread({}, 
	        this.props, 
	        {className: joinClasses(this.props.className, classSet(classes))}), 
	        this.props.children
	      )
	    );
	  }
	});
	
	module.exports = ButtonGroup;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(78);
	var classSet = __webpack_require__(79);
	var cloneWithProps = __webpack_require__(80);
	
	var createChainedFunction = __webpack_require__(81);
	var BootstrapMixin = __webpack_require__(74);
	var DropdownStateMixin = __webpack_require__(75);
	var Button = __webpack_require__(47);
	var ButtonGroup = __webpack_require__(48);
	var DropdownMenu = __webpack_require__(76);
	var ValidComponentChildren = __webpack_require__(82);
	
	
	var DropdownButton = React.createClass({displayName: 'DropdownButton',
	  mixins: [BootstrapMixin, DropdownStateMixin],
	
	  propTypes: {
	    pullRight: React.PropTypes.bool,
	    dropup:    React.PropTypes.bool,
	    title:     React.PropTypes.node,
	    href:      React.PropTypes.string,
	    onClick:   React.PropTypes.func,
	    onSelect:  React.PropTypes.func,
	    navItem:   React.PropTypes.bool
	  },
	
	  render: function () {
	    var className = 'dropdown-toggle';
	
	    var renderMethod = this.props.navItem ?
	      'renderNavItem' : 'renderButtonGroup';
	
	    return this[renderMethod]([
	      React.createElement(Button, React.__spread({}, 
	        this.props, 
	        {ref: "dropdownButton", 
	        className: joinClasses(this.props.className, className), 
	        onClick: this.handleDropdownClick, 
	        key: 0, 
	        navDropdown: this.props.navItem, 
	        navItem: null, 
	        title: null, 
	        pullRight: null, 
	        dropup: null}), 
	        this.props.title, ' ', 
	        React.createElement("span", {className: "caret"})
	      ),
	      React.createElement(DropdownMenu, {
	        ref: "menu", 
	        'aria-labelledby': this.props.id, 
	        pullRight: this.props.pullRight, 
	        key: 1}, 
	        ValidComponentChildren.map(this.props.children, this.renderMenuItem)
	      )
	    ]);
	  },
	
	  renderButtonGroup: function (children) {
	    var groupClasses = {
	        'open': this.state.open,
	        'dropup': this.props.dropup
	      };
	
	    return (
	      React.createElement(ButtonGroup, {
	        bsSize: this.props.bsSize, 
	        className: classSet(groupClasses)}, 
	        children
	      )
	    );
	  },
	
	  renderNavItem: function (children) {
	    var classes = {
	        'dropdown': true,
	        'open': this.state.open,
	        'dropup': this.props.dropup
	      };
	
	    return (
	      React.createElement("li", {className: classSet(classes)}, 
	        children
	      )
	    );
	  },
	
	  renderMenuItem: function (child, index) {
	    // Only handle the option selection if an onSelect prop has been set on the
	    // component or it's child, this allows a user not to pass an onSelect
	    // handler and have the browser preform the default action.
	    var handleOptionSelect = this.props.onSelect || child.props.onSelect ?
	      this.handleOptionSelect : null;
	
	    return cloneWithProps(
	      child,
	      {
	        // Capture onSelect events
	        onSelect: createChainedFunction(child.props.onSelect, handleOptionSelect),
	
	        // Force special props to be transferred
	        key: child.key ? child.key : index,
	        ref: child.ref
	      }
	    );
	  },
	
	  handleDropdownClick: function (e) {
	    e.preventDefault();
	
	    this.setDropdownState(!this.state.open);
	  },
	
	  handleOptionSelect: function (key) {
	    if (this.props.onSelect) {
	      this.props.onSelect(key);
	    }
	
	    this.setDropdownState(false);
	  }
	});
	
	module.exports = DropdownButton;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(78);
	var classSet = __webpack_require__(79);
	
	var MenuItem = React.createClass({displayName: 'MenuItem',
	  propTypes: {
	    header:    React.PropTypes.bool,
	    divider:   React.PropTypes.bool,
	    href:      React.PropTypes.string,
	    title:     React.PropTypes.string,
	    onSelect:  React.PropTypes.func,
	    eventKey: React.PropTypes.any
	  },
	
	  getDefaultProps: function () {
	    return {
	      href: '#'
	    };
	  },
	
	  handleClick: function (e) {
	    if (this.props.onSelect) {
	      e.preventDefault();
	      this.props.onSelect(this.props.eventKey);
	    }
	  },
	
	  renderAnchor: function () {
	    return (
	      React.createElement("a", {onClick: this.handleClick, href: this.props.href, title: this.props.title, tabIndex: "-1"}, 
	        this.props.children
	      )
	    );
	  },
	
	  render: function () {
	    var classes = {
	        'dropdown-header': this.props.header,
	        'divider': this.props.divider
	      };
	
	    var children = null;
	    if (this.props.header) {
	      children = this.props.children;
	    } else if (!this.props.divider) {
	      children = this.renderAnchor();
	    }
	
	    return (
	      React.createElement("li", React.__spread({},  this.props, {role: "presentation", title: null, href: null, 
	        className: joinClasses(this.props.className, classSet(classes))}), 
	        children
	      )
	    );
	  }
	});
	
	module.exports = MenuItem;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(78);
	var BootstrapMixin = __webpack_require__(74);
	var CollapsableMixin = __webpack_require__(77);
	var classSet = __webpack_require__(79);
	var domUtils = __webpack_require__(83);
	var cloneWithProps = __webpack_require__(80);
	
	var ValidComponentChildren = __webpack_require__(82);
	var createChainedFunction = __webpack_require__(81);
	
	
	var Nav = React.createClass({displayName: 'Nav',
	  mixins: [BootstrapMixin, CollapsableMixin],
	
	  propTypes: {
	    bsStyle: React.PropTypes.oneOf(['tabs','pills']),
	    stacked: React.PropTypes.bool,
	    justified: React.PropTypes.bool,
	    onSelect: React.PropTypes.func,
	    collapsable: React.PropTypes.bool,
	    expanded: React.PropTypes.bool,
	    navbar: React.PropTypes.bool,
	    eventKey: React.PropTypes.any,
	    right: React.PropTypes.bool
	  },
	
	  getDefaultProps: function () {
	    return {
	      bsClass: 'nav'
	    };
	  },
	
	  getCollapsableDOMNode: function () {
	    return this.getDOMNode();
	  },
	
	  getCollapsableDimensionValue: function () {
	    var node = this.refs.ul.getDOMNode(),
	        height = node.offsetHeight,
	        computedStyles = domUtils.getComputedStyles(node);
	
	    return height + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
	  },
	
	  render: function () {
	    var classes = this.props.collapsable ? this.getCollapsableClassSet() : {};
	
	    classes['navbar-collapse'] = this.props.collapsable;
	
	    if (this.props.navbar && !this.props.collapsable) {
	      return (this.renderUl());
	    }
	
	    return (
	      React.createElement("nav", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
	        this.renderUl()
	      )
	    );
	  },
	
	  renderUl: function () {
	    var classes = this.getBsClassSet();
	
	    classes['nav-stacked'] = this.props.stacked;
	    classes['nav-justified'] = this.props.justified;
	    classes['navbar-nav'] = this.props.navbar;
	    classes['pull-right'] = this.props.pullRight;
	    classes['navbar-right'] = this.props.right;
	
	    return (
	      React.createElement("ul", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes)), ref: "ul"}), 
	        ValidComponentChildren.map(this.props.children, this.renderNavItem)
	      )
	    );
	  },
	
	  getChildActiveProp: function (child) {
	    if (child.props.active) {
	      return true;
	    }
	    if (this.props.activeKey != null) {
	      if (child.props.eventKey == this.props.activeKey) {
	        return true;
	      }
	    }
	    if (this.props.activeHref != null) {
	      if (child.props.href === this.props.activeHref) {
	        return true;
	      }
	    }
	
	    return child.props.active;
	  },
	
	  renderNavItem: function (child, index) {
	    return cloneWithProps(
	      child,
	      {
	        active: this.getChildActiveProp(child),
	        activeKey: this.props.activeKey,
	        activeHref: this.props.activeHref,
	        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
	        ref: child.ref,
	        key: child.key ? child.key : index,
	        navItem: true
	      }
	    );
	  }
	});
	
	module.exports = Nav;


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(78);
	var BootstrapMixin = __webpack_require__(74);
	var classSet = __webpack_require__(79);
	var cloneWithProps = __webpack_require__(80);
	
	var ValidComponentChildren = __webpack_require__(82);
	var createChainedFunction = __webpack_require__(81);
	var Nav = __webpack_require__(51);
	
	
	var Navbar = React.createClass({displayName: 'Navbar',
	  mixins: [BootstrapMixin],
	
	  propTypes: {
	    fixedTop: React.PropTypes.bool,
	    fixedBottom: React.PropTypes.bool,
	    staticTop: React.PropTypes.bool,
	    inverse: React.PropTypes.bool,
	    fluid: React.PropTypes.bool,
	    role: React.PropTypes.string,
	    componentClass: React.PropTypes.node.isRequired,
	    brand: React.PropTypes.node,
	    toggleButton: React.PropTypes.node,
	    onToggle: React.PropTypes.func,
	    navExpanded: React.PropTypes.bool,
	    defaultNavExpanded: React.PropTypes.bool
	  },
	
	  getDefaultProps: function () {
	    return {
	      bsClass: 'navbar',
	      bsStyle: 'default',
	      role: 'navigation',
	      componentClass: 'Nav'
	    };
	  },
	
	  getInitialState: function () {
	    return {
	      navExpanded: this.props.defaultNavExpanded
	    };
	  },
	
	  shouldComponentUpdate: function() {
	    // Defer any updates to this component during the `onSelect` handler.
	    return !this._isChanging;
	  },
	
	  handleToggle: function () {
	    if (this.props.onToggle) {
	      this._isChanging = true;
	      this.props.onToggle();
	      this._isChanging = false;
	    }
	
	    this.setState({
	      navExpanded: !this.state.navExpanded
	    });
	  },
	
	  isNavExpanded: function () {
	    return this.props.navExpanded != null ? this.props.navExpanded : this.state.navExpanded;
	  },
	
	  render: function () {
	    var classes = this.getBsClassSet();
	    var ComponentClass = this.props.componentClass;
	
	    classes['navbar-fixed-top'] = this.props.fixedTop;
	    classes['navbar-fixed-bottom'] = this.props.fixedBottom;
	    classes['navbar-static-top'] = this.props.staticTop;
	    classes['navbar-inverse'] = this.props.inverse;
	
	    return (
	      React.createElement(ComponentClass, React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
	        React.createElement("div", {className: this.props.fluid ? 'container-fluid' : 'container'}, 
	          (this.props.brand || this.props.toggleButton || this.props.toggleNavKey) ? this.renderHeader() : null, 
	          ValidComponentChildren.map(this.props.children, this.renderChild)
	        )
	      )
	    );
	  },
	
	  renderChild: function (child, index) {
	    return cloneWithProps(child, {
	      navbar: true,
	      collapsable: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey,
	      expanded: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey && this.isNavExpanded(),
	      key: child.key ? child.key : index,
	      ref: child.ref
	    });
	  },
	
	  renderHeader: function () {
	    var brand;
	
	    if (this.props.brand) {
	      brand = React.isValidElement(this.props.brand) ?
	        cloneWithProps(this.props.brand, {
	          className: 'navbar-brand'
	        }) : React.createElement("span", {className: "navbar-brand"}, this.props.brand);
	    }
	
	    return (
	      React.createElement("div", {className: "navbar-header"}, 
	        brand, 
	        (this.props.toggleButton || this.props.toggleNavKey != null) ? this.renderToggleButton() : null
	      )
	    );
	  },
	
	  renderToggleButton: function () {
	    var children;
	
	    if (React.isValidElement(this.props.toggleButton)) {
	      return cloneWithProps(this.props.toggleButton, {
	        className: 'navbar-toggle',
	        onClick: createChainedFunction(this.handleToggle, this.props.toggleButton.props.onClick)
	      });
	    }
	
	    children = (this.props.toggleButton != null) ?
	      this.props.toggleButton : [
	        React.createElement("span", {className: "sr-only", key: 0}, "Toggle navigation"),
	        React.createElement("span", {className: "icon-bar", key: 1}),
	        React.createElement("span", {className: "icon-bar", key: 2}),
	        React.createElement("span", {className: "icon-bar", key: 3})
	    ];
	
	    return (
	      React.createElement("button", {className: "navbar-toggle", type: "button", onClick: this.handleToggle}, 
	        children
	      )
	    );
	  }
	});
	
	module.exports = Navbar;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(78);
	var classSet = __webpack_require__(79);
	var cloneWithProps = __webpack_require__(80);
	
	var ValidComponentChildren = __webpack_require__(82);
	var createChainedFunction = __webpack_require__(81);
	var BootstrapMixin = __webpack_require__(74);
	
	
	var SubNav = React.createClass({displayName: 'SubNav',
	  mixins: [BootstrapMixin],
	
	  propTypes: {
	    onSelect: React.PropTypes.func,
	    active: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    href: React.PropTypes.string,
	    title: React.PropTypes.string,
	    text: React.PropTypes.node
	  },
	
	  getDefaultProps: function () {
	    return {
	      bsClass: 'nav'
	    };
	  },
	
	  handleClick: function (e) {
	    if (this.props.onSelect) {
	      e.preventDefault();
	
	      if (!this.props.disabled) {
	        this.props.onSelect(this.props.eventKey, this.props.href);
	      }
	    }
	  },
	
	  isActive: function () {
	    return this.isChildActive(this);
	  },
	
	  isChildActive: function (child) {
	    if (child.props.active) {
	      return true;
	    }
	
	    if (this.props.activeKey != null && this.props.activeKey === child.props.eventKey) {
	      return true;
	    }
	
	    if (this.props.activeHref != null && this.props.activeHref === child.props.href) {
	      return true;
	    }
	
	    if (child.props.children) {
	      var isActive = false;
	
	      ValidComponentChildren.forEach(
	        child.props.children,
	        function (child) {
	          if (this.isChildActive(child)) {
	            isActive = true;
	          }
	        },
	        this
	      );
	
	      return isActive;
	    }
	
	    return false;
	  },
	
	  getChildActiveProp: function (child) {
	    if (child.props.active) {
	      return true;
	    }
	    if (this.props.activeKey != null) {
	      if (child.props.eventKey == this.props.activeKey) {
	        return true;
	      }
	    }
	    if (this.props.activeHref != null) {
	      if (child.props.href === this.props.activeHref) {
	        return true;
	      }
	    }
	
	    return child.props.active;
	  },
	
	  render: function () {
	    var classes = {
	      'active': this.isActive(),
	      'disabled': this.props.disabled
	    };
	
	    return (
	      React.createElement("li", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
	        React.createElement("a", {
	          href: this.props.href, 
	          title: this.props.title, 
	          onClick: this.handleClick, 
	          ref: "anchor"}, 
	          this.props.text
	        ), 
	        React.createElement("ul", {className: "nav"}, 
	          ValidComponentChildren.map(this.props.children, this.renderNavItem)
	        )
	      )
	    );
	  },
	
	  renderNavItem: function (child, index) {
	    return cloneWithProps(
	      child,
	      {
	        active: this.getChildActiveProp(child),
	        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
	        ref: child.ref,
	        key: child.key ? child.key : index
	      }
	    );
	  }
	});
	
	module.exports = SubNav;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(78);
	var classSet = __webpack_require__(79);
	var BootstrapMixin = __webpack_require__(74);
	
	var NavItem = React.createClass({displayName: 'NavItem',
	  mixins: [BootstrapMixin],
	
	  propTypes: {
	    onSelect: React.PropTypes.func,
	    active: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    href: React.PropTypes.string,
	    title: React.PropTypes.string,
	    eventKey: React.PropTypes.any
	  },
	
	  getDefaultProps: function () {
	    return {
	      href: '#'
	    };
	  },
	
	  render: function () {
	    var $__0= 
	        
	        
	        
	        
	        
	           this.props,disabled=$__0.disabled,active=$__0.active,href=$__0.href,title=$__0.title,children=$__0.children,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{disabled:1,active:1,href:1,title:1,children:1}),
	        classes = {
	          'active': active,
	          'disabled': disabled
	        };
	
	    return (
	      React.createElement("li", React.__spread({},  props, {className: joinClasses(props.className, classSet(classes))}), 
	        React.createElement("a", {
	          href: href, 
	          title: title, 
	          onClick: this.handleClick, 
	          ref: "anchor"}, 
	          children 
	        )
	      )
	    );
	  },
	
	  handleClick: function (e) {
	    if (this.props.onSelect) {
	      e.preventDefault();
	
	      if (!this.props.disabled) {
	        this.props.onSelect(this.props.eventKey, this.props.href);
	      }
	    }
	  }
	});
	
	module.exports = NavItem;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var FakeNode = __webpack_require__(84);
	var PropTypes = __webpack_require__(85);
	
	/**
	 * A <DefaultRoute> component is a special kind of <Route> that
	 * renders when its parent matches but none of its siblings do.
	 * Only one such route may be used at any given level in the
	 * route hierarchy.
	 */
	var DefaultRoute = React.createClass({
	
	  displayName: 'DefaultRoute',
	
	  mixins: [ FakeNode ],
	
	  propTypes: {
	    name: React.PropTypes.string,
	    path: PropTypes.falsy,
	    handler: React.PropTypes.func.isRequired
	  }
	
	});
	
	module.exports = DefaultRoute;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var classSet = __webpack_require__(114);
	var assign = __webpack_require__(115);
	var Navigation = __webpack_require__(66);
	var State = __webpack_require__(67);
	
	function isLeftClickEvent(event) {
	  return event.button === 0;
	}
	
	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}
	
	/**
	 * <Link> components are used to create an <a> element that links to a route.
	 * When that route is active, the link gets an "active" class name (or the
	 * value of its `activeClassName` prop).
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route name="showPost" path="/posts/:postID" handler={Post}/>
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to="showPost" params={{ postID: "123" }} />
	 *
	 * In addition to params, links may pass along query string parameters
	 * using the `query` prop.
	 *
	 *   <Link to="showPost" params={{ postID: "123" }} query={{ show:true }}/>
	 */
	var Link = React.createClass({
	
	  displayName: 'Link',
	
	  mixins: [ Navigation, State ],
	
	  propTypes: {
	    activeClassName: React.PropTypes.string.isRequired,
	    to: React.PropTypes.string.isRequired,
	    params: React.PropTypes.object,
	    query: React.PropTypes.object,
	    onClick: React.PropTypes.func
	  },
	
	  getDefaultProps: function () {
	    return {
	      activeClassName: 'active'
	    };
	  },
	
	  handleClick: function (event) {
	    var allowTransition = true;
	    var clickResult;
	
	    if (this.props.onClick)
	      clickResult = this.props.onClick(event);
	
	    if (isModifiedEvent(event) || !isLeftClickEvent(event))
	      return;
	
	    if (clickResult === false || event.defaultPrevented === true)
	      allowTransition = false;
	
	    event.preventDefault();
	
	    if (allowTransition)
	      this.transitionTo(this.props.to, this.props.params, this.props.query);
	  },
	
	  /**
	   * Returns the value of the "href" attribute to use on the DOM element.
	   */
	  getHref: function () {
	    return this.makeHref(this.props.to, this.props.params, this.props.query);
	  },
	
	  /**
	   * Returns the value of the "class" attribute to use on the DOM element, which contains
	   * the value of the activeClassName property when this <Link> is active.
	   */
	  getClassName: function () {
	    var classNames = {};
	
	    if (this.props.className)
	      classNames[this.props.className] = true;
	
	    if (this.isActive(this.props.to, this.props.params, this.props.query))
	      classNames[this.props.activeClassName] = true;
	
	    return classSet(classNames);
	  },
	
	  render: function () {
	    var props = assign({}, this.props, {
	      href: this.getHref(),
	      className: this.getClassName(),
	      onClick: this.handleClick
	    });
	
	    return React.DOM.a(props, this.props.children);
	  }
	
	});
	
	module.exports = Link;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var FakeNode = __webpack_require__(84);
	var PropTypes = __webpack_require__(85);
	
	/**
	 * A <NotFoundRoute> is a special kind of <Route> that
	 * renders when the beginning of its parent's path matches
	 * but none of its siblings do, including any <DefaultRoute>.
	 * Only one such route may be used at any given level in the
	 * route hierarchy.
	 */
	var NotFoundRoute = React.createClass({
	
	  displayName: 'NotFoundRoute',
	
	  mixins: [ FakeNode ],
	
	  propTypes: {
	    name: React.PropTypes.string,
	    path: PropTypes.falsy,
	    handler: React.PropTypes.func.isRequired
	  }
	
	});
	
	module.exports = NotFoundRoute;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var FakeNode = __webpack_require__(84);
	var PropTypes = __webpack_require__(85);
	
	/**
	 * A <Redirect> component is a special kind of <Route> that always
	 * redirects to another route when it matches.
	 */
	var Redirect = React.createClass({
	
	  displayName: 'Redirect',
	
	  mixins: [ FakeNode ],
	
	  propTypes: {
	    path: React.PropTypes.string,
	    from: React.PropTypes.string, // Alias for path.
	    to: React.PropTypes.string,
	    handler: PropTypes.falsy
	  }
	
	});
	
	module.exports = Redirect;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var FakeNode = __webpack_require__(84);
	
	/**
	 * <Route> components specify components that are rendered to the page when the
	 * URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is requested,
	 * the tree is searched depth-first to find a route whose path matches the URL.
	 * When one is found, all routes in the tree that lead to it are considered
	 * "active" and their components are rendered into the DOM, nested in the same
	 * order as they are in the tree.
	 *
	 * The preferred way to configure a router is using JSX. The XML-like syntax is
	 * a great way to visualize how routes are laid out in an application.
	 *
	 *   var routes = [
	 *     <Route handler={App}>
	 *       <Route name="login" handler={Login}/>
	 *       <Route name="logout" handler={Logout}/>
	 *       <Route name="about" handler={About}/>
	 *     </Route>
	 *   ];
	 *   
	 *   Router.run(routes, function (Handler) {
	 *     React.render(<Handler/>, document.body);
	 *   });
	 *
	 * Handlers for Route components that contain children can render their active
	 * child route using a <RouteHandler> element.
	 *
	 *   var App = React.createClass({
	 *     render: function () {
	 *       return (
	 *         <div class="application">
	 *           <RouteHandler/>
	 *         </div>
	 *       );
	 *     }
	 *   });
	 */
	var Route = React.createClass({
	
	  displayName: 'Route',
	
	  mixins: [ FakeNode ],
	
	  propTypes: {
	    name: React.PropTypes.string,
	    path: React.PropTypes.string,
	    handler: React.PropTypes.func.isRequired,
	    ignoreScrollBehavior: React.PropTypes.bool
	  }
	
	});
	
	module.exports = Route;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var RouteHandlerMixin = __webpack_require__(86);
	
	/**
	 * A <RouteHandler> component renders the active child route handler
	 * when routes are nested.
	 */
	var RouteHandler = React.createClass({
	
	  displayName: 'RouteHandler',
	
	  mixins: [RouteHandlerMixin],
	
	  getDefaultProps: function () {
	    return {
	      ref: '__routeHandler__'
	    };
	  },
	
	  render: function () {
	    return this.getRouteHandler();
	  }
	
	});
	
	module.exports = RouteHandler;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var LocationActions = __webpack_require__(96);
	var History = __webpack_require__(70);
	var Path = __webpack_require__(87);
	
	/**
	 * Returns the current URL path from the `hash` portion of the URL, including
	 * query string.
	 */
	function getHashPath() {
	  return Path.decode(
	    // We can't use window.location.hash here because it's not
	    // consistent across browsers - Firefox will pre-decode it!
	    window.location.href.split('#')[1] || ''
	  );
	}
	
	var _actionType;
	
	function ensureSlash() {
	  var path = getHashPath();
	
	  if (path.charAt(0) === '/')
	    return true;
	
	  HashLocation.replace('/' + path);
	
	  return false;
	}
	
	var _changeListeners = [];
	
	function notifyChange(type) {
	  if (type === LocationActions.PUSH)
	    History.length += 1;
	
	  var change = {
	    path: getHashPath(),
	    type: type
	  };
	
	  _changeListeners.forEach(function (listener) {
	    listener(change);
	  });
	}
	
	var _isListening = false;
	
	function onHashChange() {
	  if (ensureSlash()) {
	    // If we don't have an _actionType then all we know is the hash
	    // changed. It was probably caused by the user clicking the Back
	    // button, but may have also been the Forward button or manual
	    // manipulation. So just guess 'pop'.
	    notifyChange(_actionType || LocationActions.POP);
	    _actionType = null;
	  }
	}
	
	/**
	 * A Location that uses `window.location.hash`.
	 */
	var HashLocation = {
	
	  addChangeListener: function (listener) {
	    _changeListeners.push(listener);
	
	    // Do this BEFORE listening for hashchange.
	    ensureSlash();
	
	    if (_isListening)
	      return;
	
	    if (window.addEventListener) {
	      window.addEventListener('hashchange', onHashChange, false);
	    } else {
	      window.attachEvent('onhashchange', onHashChange);
	    }
	
	    _isListening = true;
	  },
	
	  removeChangeListener: function(listener) {
	    for (var i = 0, l = _changeListeners.length; i < l; i ++) {
	      if (_changeListeners[i] === listener) {
	        _changeListeners.splice(i, 1);
	        break;
	      }
	    }
	
	    if (window.removeEventListener) {
	      window.removeEventListener('hashchange', onHashChange, false);
	    } else {
	      window.removeEvent('onhashchange', onHashChange);
	    }
	
	    if (_changeListeners.length === 0)
	      _isListening = false;
	  },
	
	
	
	  push: function (path) {
	    _actionType = LocationActions.PUSH;
	    window.location.hash = Path.encode(path);
	  },
	
	  replace: function (path) {
	    _actionType = LocationActions.REPLACE;
	    window.location.replace(window.location.pathname + '#' + Path.encode(path));
	  },
	
	  pop: function () {
	    _actionType = LocationActions.POP;
	    History.back();
	  },
	
	  getCurrentPath: getHashPath,
	
	  toString: function () {
	    return '<HashLocation>';
	  }
	
	};
	
	module.exports = HashLocation;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var LocationActions = __webpack_require__(96);
	var History = __webpack_require__(70);
	var Path = __webpack_require__(87);
	
	/**
	 * Returns the current URL path from `window.location`, including query string.
	 */
	function getWindowPath() {
	  return Path.decode(
	    window.location.pathname + window.location.search
	  );
	}
	
	var _changeListeners = [];
	
	function notifyChange(type) {
	  var change = {
	    path: getWindowPath(),
	    type: type
	  };
	
	  _changeListeners.forEach(function (listener) {
	    listener(change);
	  });
	}
	
	var _isListening = false;
	
	function onPopState() {
	  notifyChange(LocationActions.POP);
	}
	
	/**
	 * A Location that uses HTML5 history.
	 */
	var HistoryLocation = {
	
	  addChangeListener: function (listener) {
	    _changeListeners.push(listener);
	
	    if (_isListening)
	      return;
	
	    if (window.addEventListener) {
	      window.addEventListener('popstate', onPopState, false);
	    } else {
	      window.attachEvent('popstate', onPopState);
	    }
	
	    _isListening = true;
	  },
	
	  removeChangeListener: function(listener) {
	    for (var i = 0, l = _changeListeners.length; i < l; i ++) {
	      if (_changeListeners[i] === listener) {
	        _changeListeners.splice(i, 1);
	        break;
	      }
	    }
	
	    if (window.addEventListener) {
	      window.removeEventListener('popstate', onPopState);
	    } else {
	      window.removeEvent('popstate', onPopState);
	    }
	
	    if (_changeListeners.length === 0)
	      _isListening = false;
	  },
	
	
	
	  push: function (path) {
	    window.history.pushState({ path: path }, '', Path.encode(path));
	    History.length += 1;
	    notifyChange(LocationActions.PUSH);
	  },
	
	  replace: function (path) {
	    window.history.replaceState({ path: path }, '', Path.encode(path));
	    notifyChange(LocationActions.REPLACE);
	  },
	
	  pop: History.back,
	
	  getCurrentPath: getWindowPath,
	
	  toString: function () {
	    return '<HistoryLocation>';
	  }
	
	};
	
	module.exports = HistoryLocation;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var HistoryLocation = __webpack_require__(62);
	var History = __webpack_require__(70);
	var Path = __webpack_require__(87);
	
	/**
	 * A Location that uses full page refreshes. This is used as
	 * the fallback for HistoryLocation in browsers that do not
	 * support the HTML5 history API.
	 */
	var RefreshLocation = {
	
	  push: function (path) {
	    window.location = Path.encode(path);
	  },
	
	  replace: function (path) {
	    window.location.replace(Path.encode(path));
	  },
	
	  pop: History.back,
	
	  getCurrentPath: HistoryLocation.getCurrentPath,
	
	  toString: function () {
	    return '<RefreshLocation>';
	  }
	
	};
	
	module.exports = RefreshLocation;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var LocationActions = __webpack_require__(96);
	
	/**
	 * A scroll behavior that attempts to imitate the default behavior
	 * of modern browsers.
	 */
	var ImitateBrowserBehavior = {
	
	  updateScrollPosition: function (position, actionType) {
	    switch (actionType) {
	      case LocationActions.PUSH:
	      case LocationActions.REPLACE:
	        window.scrollTo(0, 0);
	        break;
	      case LocationActions.POP:
	        if (position) {
	          window.scrollTo(position.x, position.y);
	        } else {
	          window.scrollTo(0, 0);
	        }
	        break;
	    }
	  }
	
	};
	
	module.exports = ImitateBrowserBehavior;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A scroll behavior that always scrolls to the top of the page
	 * after a transition.
	 */
	var ScrollToTopBehavior = {
	
	  updateScrollPosition: function () {
	    window.scrollTo(0, 0);
	  }
	
	};
	
	module.exports = ScrollToTopBehavior;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	
	/**
	 * A mixin for components that modify the URL.
	 *
	 * Example:
	 *
	 *   var MyLink = React.createClass({
	 *     mixins: [ Router.Navigation ],
	 *     handleClick: function (event) {
	 *       event.preventDefault();
	 *       this.transitionTo('aRoute', { the: 'params' }, { the: 'query' });
	 *     },
	 *     render: function () {
	 *       return (
	 *         <a onClick={this.handleClick}>Click me!</a>
	 *       );
	 *     }
	 *   });
	 */
	var Navigation = {
	
	  contextTypes: {
	    makePath: React.PropTypes.func.isRequired,
	    makeHref: React.PropTypes.func.isRequired,
	    transitionTo: React.PropTypes.func.isRequired,
	    replaceWith: React.PropTypes.func.isRequired,
	    goBack: React.PropTypes.func.isRequired
	  },
	
	  /**
	   * Returns an absolute URL path created from the given route
	   * name, URL parameters, and query values.
	   */
	  makePath: function (to, params, query) {
	    return this.context.makePath(to, params, query);
	  },
	
	  /**
	   * Returns a string that may safely be used as the href of a
	   * link to the route with the given name.
	   */
	  makeHref: function (to, params, query) {
	    return this.context.makeHref(to, params, query);
	  },
	
	  /**
	   * Transitions to the URL specified in the arguments by pushing
	   * a new URL onto the history stack.
	   */
	  transitionTo: function (to, params, query) {
	    this.context.transitionTo(to, params, query);
	  },
	
	  /**
	   * Transitions to the URL specified in the arguments by replacing
	   * the current URL in the history stack.
	   */
	  replaceWith: function (to, params, query) {
	    this.context.replaceWith(to, params, query);
	  },
	
	  /**
	   * Transitions to the previous URL.
	   */
	  goBack: function () {
	    this.context.goBack();
	  }
	
	};
	
	module.exports = Navigation;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	
	/**
	 * A mixin for components that need to know the path, routes, URL
	 * params and query that are currently active.
	 *
	 * Example:
	 *
	 *   var AboutLink = React.createClass({
	 *     mixins: [ Router.State ],
	 *     render: function () {
	 *       var className = this.props.className;
	 *   
	 *       if (this.isActive('about'))
	 *         className += ' is-active';
	 *   
	 *       return React.DOM.a({ className: className }, this.props.children);
	 *     }
	 *   });
	 */
	var State = {
	
	  contextTypes: {
	    getCurrentPath: React.PropTypes.func.isRequired,
	    getCurrentRoutes: React.PropTypes.func.isRequired,
	    getCurrentPathname: React.PropTypes.func.isRequired,
	    getCurrentParams: React.PropTypes.func.isRequired,
	    getCurrentQuery: React.PropTypes.func.isRequired,
	    isActive: React.PropTypes.func.isRequired
	  },
	
	  /**
	   * Returns the current URL path.
	   */
	  getPath: function () {
	    return this.context.getCurrentPath();
	  },
	
	  /**
	   * Returns an array of the routes that are currently active.
	   */
	  getRoutes: function () {
	    return this.context.getCurrentRoutes();
	  },
	
	  /**
	   * Returns the current URL path without the query string.
	   */
	  getPathname: function () {
	    return this.context.getCurrentPathname();
	  },
	
	  /**
	   * Returns an object of the URL params that are currently active.
	   */
	  getParams: function () {
	    return this.context.getCurrentParams();
	  },
	
	  /**
	   * Returns an object of the query params that are currently active.
	   */
	  getQuery: function () {
	    return this.context.getCurrentQuery();
	  },
	
	  /**
	   * A helper method to determine if a given route, params, and query
	   * are active.
	   */
	  isActive: function (to, params, query) {
	    return this.context.isActive(to, params, query);
	  }
	
	};
	
	module.exports = State;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint -W058 */
	var React = __webpack_require__(1);
	var warning = __webpack_require__(116);
	var invariant = __webpack_require__(117);
	var canUseDOM = __webpack_require__(118).canUseDOM;
	var ImitateBrowserBehavior = __webpack_require__(64);
	var RouteHandler = __webpack_require__(60);
	var LocationActions = __webpack_require__(96);
	var HashLocation = __webpack_require__(61);
	var HistoryLocation = __webpack_require__(62);
	var RefreshLocation = __webpack_require__(63);
	var NavigationContext = __webpack_require__(88);
	var StateContext = __webpack_require__(89);
	var Scrolling = __webpack_require__(90);
	var createRoutesFromChildren = __webpack_require__(91);
	var supportsHistory = __webpack_require__(92);
	var Transition = __webpack_require__(93);
	var PropTypes = __webpack_require__(85);
	var Redirect = __webpack_require__(94);
	var History = __webpack_require__(70);
	var Cancellation = __webpack_require__(95);
	var Path = __webpack_require__(87);
	
	/**
	 * The default location for new routers.
	 */
	var DEFAULT_LOCATION = canUseDOM ? HashLocation : '/';
	
	/**
	 * The default scroll behavior for new routers.
	 */
	var DEFAULT_SCROLL_BEHAVIOR = canUseDOM ? ImitateBrowserBehavior : null;
	
	/**
	 * The default error handler for new routers.
	 */
	function defaultErrorHandler(error) {
	  // Throw so we don't silently swallow async errors.
	  throw error; // This error probably originated in a transition hook.
	}
	
	/**
	 * The default aborted transition handler for new routers.
	 */
	function defaultAbortHandler(abortReason, location) {
	  if (typeof location === 'string')
	    throw new Error('Unhandled aborted transition! Reason: ' + abortReason);
	
	  if (abortReason instanceof Cancellation) {
	    return;
	  } else if (abortReason instanceof Redirect) {
	    location.replace(this.makePath(abortReason.to, abortReason.params, abortReason.query));
	  } else {
	    location.pop();
	  }
	}
	
	function findMatch(pathname, routes, defaultRoute, notFoundRoute) {
	  var match, route, params;
	
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    route = routes[i];
	
	    // Check the subtree first to find the most deeply-nested match.
	    match = findMatch(pathname, route.childRoutes, route.defaultRoute, route.notFoundRoute);
	
	    if (match != null) {
	      match.routes.unshift(route);
	      return match;
	    }
	
	    // No routes in the subtree matched, so check this route.
	    params = Path.extractParams(route.path, pathname);
	
	    if (params)
	      return createMatch(route, params);
	  }
	
	  // No routes matched, so try the default route if there is one.
	  if (defaultRoute && (params = Path.extractParams(defaultRoute.path, pathname)))
	    return createMatch(defaultRoute, params);
	
	  // Last attempt: does the "not found" route match?
	  if (notFoundRoute && (params = Path.extractParams(notFoundRoute.path, pathname)))
	    return createMatch(notFoundRoute, params);
	
	  return match;
	}
	
	function createMatch(route, params) {
	  return { routes: [ route ], params: params };
	}
	
	function hasProperties(object, properties) {
	  for (var propertyName in properties)
	    if (properties.hasOwnProperty(propertyName) && object[propertyName] !== properties[propertyName])
	      return false;
	
	  return true;
	}
	
	function hasMatch(routes, route, prevParams, nextParams, prevQuery, nextQuery) {
	  return routes.some(function (r) {
	    if (r !== route)
	      return false;
	
	    var paramNames = route.paramNames;
	    var paramName;
	
	    // Ensure that all params the route cares about did not change.
	    for (var i = 0, len = paramNames.length; i < len; ++i) {
	      paramName = paramNames[i];
	
	      if (nextParams[paramName] !== prevParams[paramName])
	        return false;
	    }
	
	    // Ensure the query hasn't changed.
	    return hasProperties(prevQuery, nextQuery) && hasProperties(nextQuery, prevQuery);
	  });
	}
	
	/**
	 * Creates and returns a new router using the given options. A router
	 * is a ReactComponent class that knows how to react to changes in the
	 * URL and keep the contents of the page in sync.
	 *
	 * Options may be any of the following:
	 *
	 * - routes           (required) The route config
	 * - location         The location to use. Defaults to HashLocation when
	 *                    the DOM is available, "/" otherwise
	 * - scrollBehavior   The scroll behavior to use. Defaults to ImitateBrowserBehavior
	 *                    when the DOM is available, null otherwise
	 * - onError          A function that is used to handle errors
	 * - onAbort          A function that is used to handle aborted transitions
	 *
	 * When rendering in a server-side environment, the location should simply
	 * be the URL path that was used in the request, including the query string.
	 */
	function createRouter(options) {
	  options = options || {};
	
	  if (typeof options === 'function') {
	    options = { routes: options }; // Router.create(<Route>)
	  } else if (Array.isArray(options)) {
	    options = { routes: options }; // Router.create([ <Route>, <Route> ])
	  }
	
	  var routes = [];
	  var namedRoutes = {};
	  var components = [];
	  var location = options.location || DEFAULT_LOCATION;
	  var scrollBehavior = options.scrollBehavior || DEFAULT_SCROLL_BEHAVIOR;
	  var onError = options.onError || defaultErrorHandler;
	  var onAbort = options.onAbort || defaultAbortHandler;
	  var state = {};
	  var nextState = {};
	  var pendingTransition = null;
	
	  function updateState() {
	    state = nextState;
	    nextState = {};
	  }
	
	  if (typeof location === 'string') {
	    warning(
	      !canUseDOM || ("development") === 'test',
	      'You should not use a static location in a DOM environment because ' +
	      'the router will not be kept in sync with the current URL'
	    );
	  } else {
	    invariant(
	      canUseDOM,
	      'You cannot use %s without a DOM',
	      location
	    );
	  }
	
	  // Automatically fall back to full page refreshes in
	  // browsers that don't support the HTML history API.
	  if (location === HistoryLocation && !supportsHistory())
	    location = RefreshLocation;
	
	  var router = React.createClass({
	
	    displayName: 'Router',
	
	    mixins: [ NavigationContext, StateContext, Scrolling ],
	
	    statics: {
	
	      defaultRoute: null,
	      notFoundRoute: null,
	
	      /**
	       * Adds routes to this router from the given children object (see ReactChildren).
	       */
	      addRoutes: function (children) {
	        routes.push.apply(routes, createRoutesFromChildren(children, this, namedRoutes));
	      },
	
	      /**
	       * Returns an absolute URL path created from the given route
	       * name, URL parameters, and query.
	       */
	      makePath: function (to, params, query) {
	        var path;
	        if (Path.isAbsolute(to)) {
	          path = Path.normalize(to);
	        } else {
	          var route = namedRoutes[to];
	
	          invariant(
	            route,
	            'Unable to find <Route name="%s">',
	            to
	          );
	
	          path = route.path;
	        }
	
	        return Path.withQuery(Path.injectParams(path, params), query);
	      },
	
	      /**
	       * Returns a string that may safely be used as the href of a link
	       * to the route with the given name, URL parameters, and query.
	       */
	      makeHref: function (to, params, query) {
	        var path = this.makePath(to, params, query);
	        return (location === HashLocation) ? '#' + path : path;
	      },
	
	      /**
	       * Transitions to the URL specified in the arguments by pushing
	       * a new URL onto the history stack.
	       */
	      transitionTo: function (to, params, query) {
	        invariant(
	          typeof location !== 'string',
	          'You cannot use transitionTo with a static location'
	        );
	
	        var path = this.makePath(to, params, query);
	
	        if (pendingTransition) {
	          // Replace so pending location does not stay in history.
	          location.replace(path);
	        } else {
	          location.push(path);
	        }
	      },
	
	      /**
	       * Transitions to the URL specified in the arguments by replacing
	       * the current URL in the history stack.
	       */
	      replaceWith: function (to, params, query) {
	        invariant(
	          typeof location !== 'string',
	          'You cannot use replaceWith with a static location'
	        );
	
	        location.replace(this.makePath(to, params, query));
	      },
	
	      /**
	       * Transitions to the previous URL if one is available. Returns true if the
	       * router was able to go back, false otherwise.
	       *
	       * Note: The router only tracks history entries in your application, not the
	       * current browser session, so you can safely call this function without guarding
	       * against sending the user back to some other site. However, when using
	       * RefreshLocation (which is the fallback for HistoryLocation in browsers that
	       * don't support HTML5 history) this method will *always* send the client back
	       * because we cannot reliably track history length.
	       */
	      goBack: function () {
	        invariant(
	          typeof location !== 'string',
	          'You cannot use goBack with a static location'
	        );
	
	        if (History.length > 1 || location === RefreshLocation) {
	          location.pop();
	          return true;
	        }
	
	        warning(false, 'goBack() was ignored because there is no router history');
	
	        return false;
	      },
	
	      /**
	       * Performs a match of the given pathname against this router and returns an object
	       * with the { routes, params } that match. Returns null if no match can be made.
	       */
	      match: function (pathname) {
	        return findMatch(pathname, routes, this.defaultRoute, this.notFoundRoute) || null;
	      },
	
	      /**
	       * Performs a transition to the given path and calls callback(error, abortReason)
	       * when the transition is finished. If both arguments are null the router's state
	       * was updated. Otherwise the transition did not complete.
	       *
	       * In a transition, a router first determines which routes are involved by beginning
	       * with the current route, up the route tree to the first parent route that is shared
	       * with the destination route, and back down the tree to the destination route. The
	       * willTransitionFrom hook is invoked on all route handlers we're transitioning away
	       * from, in reverse nesting order. Likewise, the willTransitionTo hook is invoked on
	       * all route handlers we're transitioning to.
	       *
	       * Both willTransitionFrom and willTransitionTo hooks may either abort or redirect the
	       * transition. To resolve asynchronously, they may use transition.wait(promise). If no
	       * hooks wait, the transition is fully synchronous.
	       */
	      dispatch: function (path, action, callback) {
	        if (pendingTransition) {
	          pendingTransition.abort(new Cancellation);
	          pendingTransition = null;
	        }
	
	        var prevPath = state.path;
	        if (prevPath === path)
	          return; // Nothing to do!
	
	        // Record the scroll position as early as possible to
	        // get it before browsers try update it automatically.
	        if (prevPath && action !== LocationActions.REPLACE)
	          this.recordScrollPosition(prevPath);
	
	        var pathname = Path.withoutQuery(path);
	        var match = this.match(pathname);
	
	        warning(
	          match != null,
	          'No route matches path "%s". Make sure you have <Route path="%s"> somewhere in your routes',
	          path, path
	        );
	
	        if (match == null)
	          match = {};
	
	        var prevRoutes = state.routes || [];
	        var prevParams = state.params || {};
	        var prevQuery = state.query || {};
	
	        var nextRoutes = match.routes || [];
	        var nextParams = match.params || {};
	        var nextQuery = Path.extractQuery(path) || {};
	
	        var fromRoutes, toRoutes;
	        if (prevRoutes.length) {
	          fromRoutes = prevRoutes.filter(function (route) {
	            return !hasMatch(nextRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
	          });
	
	          toRoutes = nextRoutes.filter(function (route) {
	            return !hasMatch(prevRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
	          });
	        } else {
	          fromRoutes = [];
	          toRoutes = nextRoutes;
	        }
	
	        var transition = new Transition(path, this.replaceWith.bind(this, path));
	        pendingTransition = transition;
	
	        transition.from(fromRoutes, components, function (error) {
	          if (error || transition.isAborted)
	            return callback.call(router, error, transition);
	
	          transition.to(toRoutes, nextParams, nextQuery, function (error) {
	            if (error || transition.isAborted)
	              return callback.call(router, error, transition);
	
	            nextState.path = path;
	            nextState.action = action;
	            nextState.pathname = pathname;
	            nextState.routes = nextRoutes;
	            nextState.params = nextParams;
	            nextState.query = nextQuery;
	
	            callback.call(router, null, transition);
	          });
	        });
	      },
	
	      /**
	       * Starts this router and calls callback(router, state) when the route changes.
	       *
	       * If the router's location is static (i.e. a URL path in a server environment)
	       * the callback is called only once. Otherwise, the location should be one of the
	       * Router.*Location objects (e.g. Router.HashLocation or Router.HistoryLocation).
	       */
	      run: function (callback) {
	        var dispatchHandler = function (error, transition) {
	          pendingTransition = null;
	
	          if (error) {
	            onError.call(router, error);
	          } else if (transition.isAborted) {
	            onAbort.call(router, transition.abortReason, location);
	          } else {
	            callback.call(router, router, nextState);
	          }
	        };
	
	        if (typeof location === 'string') {
	          router.dispatch(location, null, dispatchHandler);
	        } else {
	          // Listen for changes to the location.
	          var changeListener = function (change) {
	            router.dispatch(change.path, change.type, dispatchHandler);
	          };
	
	          if (location.addChangeListener)
	            location.addChangeListener(changeListener);
	
	          // Bootstrap using the current path.
	          router.dispatch(location.getCurrentPath(), null, dispatchHandler);
	        }
	      },
	
	      teardown: function() {
	        location.removeChangeListener(this.changeListener);
	      }
	
	    },
	
	    propTypes: {
	      children: PropTypes.falsy
	    },
	
	    getLocation: function () {
	      return location;
	    },
	
	    getScrollBehavior: function () {
	      return scrollBehavior;
	    },
	
	    getRouteAtDepth: function (depth) {
	      var routes = this.state.routes;
	      return routes && routes[depth];
	    },
	
	    getRouteComponents: function () {
	      return components;
	    },
	
	    getInitialState: function () {
	      updateState();
	      return state;
	    },
	
	    componentWillReceiveProps: function () {
	      updateState();
	      this.setState(state);
	    },
	
	    componentWillUnmount: function() {
	      router.teardown();
	    },
	
	    render: function () {
	      return this.getRouteAtDepth(0) ? React.createElement(RouteHandler, this.props) : null;
	    },
	
	    childContextTypes: {
	      getRouteAtDepth: React.PropTypes.func.isRequired,
	      getRouteComponents: React.PropTypes.func.isRequired,
	      routeHandlers: React.PropTypes.array.isRequired
	    },
	
	    getChildContext: function () {
	      return {
	        getRouteComponents: this.getRouteComponents,
	        getRouteAtDepth: this.getRouteAtDepth,
	        routeHandlers: [ this ]
	      };
	    }
	
	  });
	
	  if (options.routes)
	    router.addRoutes(options.routes);
	
	  return router;
	}
	
	module.exports = createRouter;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var createRouter = __webpack_require__(68);
	
	/**
	 * A high-level convenience method that creates, configures, and
	 * runs a router in one shot. The method signature is:
	 *
	 *   Router.run(routes[, location ], callback);
	 *
	 * Using `window.location.hash` to manage the URL, you could do:
	 *
	 *   Router.run(routes, function (Handler) {
	 *     React.render(<Handler/>, document.body);
	 *   });
	 * 
	 * Using HTML5 history and a custom "cursor" prop:
	 * 
	 *   Router.run(routes, Router.HistoryLocation, function (Handler) {
	 *     React.render(<Handler cursor={cursor}/>, document.body);
	 *   });
	 *
	 * Returns the newly created router.
	 *
	 * Note: If you need to specify further options for your router such
	 * as error/abort handling or custom scroll behavior, use Router.create
	 * instead.
	 *
	 *   var router = Router.create(options);
	 *   router.run(function (Handler) {
	 *     // ...
	 *   });
	 */
	function runRouter(routes, location, callback) {
	  if (typeof location === 'function') {
	    callback = location;
	    location = null;
	  }
	
	  var router = createRouter({
	    routes: routes,
	    location: location
	  });
	
	  router.run(callback);
	
	  return router;
	}
	
	module.exports = runRouter;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var invariant = __webpack_require__(117);
	var canUseDOM = __webpack_require__(118).canUseDOM;
	
	var History = {
	
	  /**
	   * Sends the browser back one entry in the history.
	   */
	  back: function () {
	    invariant(
	      canUseDOM,
	      'Cannot use History.back without a DOM'
	    );
	
	    // Do this first so that History.length will
	    // be accurate in location change listeners.
	    History.length -= 1;
	
	    window.history.back();
	  },
	
	  /**
	   * The current number of entries in the history.
	   */
	  length: 1
	
	};
	
	module.exports = History;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1);
	
	var IS_MOBILE = (
	  navigator.userAgent.match(/Android/i)
	    || navigator.userAgent.match(/webOS/i)
	    || navigator.userAgent.match(/iPhone/i)
	    || navigator.userAgent.match(/iPad/i)
	    || navigator.userAgent.match(/iPod/i)
	    || navigator.userAgent.match(/BlackBerry/i)
	    || navigator.userAgent.match(/Windows Phone/i)
	);
	
	var CodeMirrorEditor = React.createClass({displayName: 'CodeMirrorEditor',
	
	  componentDidMount: function() {
	    if (IS_MOBILE) return;
	
	    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(), {
	      mode: 'javascript',
	      lineNumbers: false,
	      lineWrapping: true,
	      smartIndent: false,  // javascript mode does bad things with jsx indents
	      matchBrackets: true,
	      theme: 'neo',
	      tabSize: 2,
	      readOnly: this.props.readOnly
	    });
	
	    this.editor.on('change', this.handleChange);
	    //setTimeout( () => this.editor.refresh() )
	  },
	
	  componentDidUpdate: function() {
	    this.editor.refresh()
	
	    if (this.props.readOnly) {
	      this.editor.setValue(this.props.codeText);
	    }
	  },
	
	  handleChange: function() {
	    if (!this.props.readOnly) {
	      this.props.onChange && this.props.onChange(this.editor.getValue());
	    }
	  },
	
	  render: function() {
	    var editor = IS_MOBILE 
	      ? React.createElement("pre", {style: {overflow: 'scroll'}}, this.props.value)
	      : React.createElement("textarea", {ref: "editor", defaultValue: this.props.value});
	
	    return (
	      React.createElement("div", {style: this.props.style, className: this.props.className}, 
	        editor
	      )
	    );
	  }
	});
	
	module.exports = CodeMirrorEditor;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	
	
	module.exports = {
	
	  DropdownList:     __webpack_require__(98),
	  Combobox:         __webpack_require__(99),
	
	  Calendar:         __webpack_require__(100),
	  DateTimePicker:   __webpack_require__(101),
	
	  NumberPicker:     __webpack_require__(102),
	  
	  Multiselect:      __webpack_require__(103),
	  SelectList:       __webpack_require__(104),
	
	  utils: {
	    ReplaceTransitionGroup: __webpack_require__(105),
	    SlideTransition:        __webpack_require__(106),
	  }
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var chance = new (__webpack_require__(119))
	
	chance.set('lastNames', ['Smith', 'Williams', 'Chang', 'Diaz', 'Morales'])
	
	module.exports = function generateList(len, lastNames){
	  var arr = new Array(len)
	
	  for(var i = 0; i < arr.length; i++){
	    var firstName = chance.first(), lastName = chance.last()
	    arr[i] = { id: i + 1, name: (firstName + " " + lastName), firstName:firstName, lastName:lastName }
	  }
	
	  return arr
	}


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var constants = __webpack_require__(109);
	
	var BootstrapMixin = {
	  propTypes: {
	    bsClass: React.PropTypes.oneOf(Object.keys(constants.CLASSES)),
	    bsStyle: React.PropTypes.oneOf(Object.keys(constants.STYLES)),
	    bsSize: React.PropTypes.oneOf(Object.keys(constants.SIZES))
	  },
	
	  getBsClassSet: function () {
	    var classes = {};
	
	    var bsClass = this.props.bsClass && constants.CLASSES[this.props.bsClass];
	    if (bsClass) {
	      classes[bsClass] = true;
	
	      var prefix = bsClass + '-';
	
	      var bsSize = this.props.bsSize && constants.SIZES[this.props.bsSize];
	      if (bsSize) {
	        classes[prefix + bsSize] = true;
	      }
	
	      var bsStyle = this.props.bsStyle && constants.STYLES[this.props.bsStyle];
	      if (this.props.bsStyle) {
	        classes[prefix + bsStyle] = true;
	      }
	    }
	
	    return classes;
	  }
	};
	
	module.exports = BootstrapMixin;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var EventListener = __webpack_require__(107);
	
	/**
	 * Checks whether a node is within
	 * a root nodes tree
	 *
	 * @param {DOMElement} node
	 * @param {DOMElement} root
	 * @returns {boolean}
	 */
	function isNodeInRoot(node, root) {
	  while (node) {
	    if (node === root) {
	      return true;
	    }
	    node = node.parentNode;
	  }
	
	  return false;
	}
	
	var DropdownStateMixin = {
	  getInitialState: function () {
	    return {
	      open: false
	    };
	  },
	
	  setDropdownState: function (newState, onStateChangeComplete) {
	    if (newState) {
	      this.bindRootCloseHandlers();
	    } else {
	      this.unbindRootCloseHandlers();
	    }
	
	    this.setState({
	      open: newState
	    }, onStateChangeComplete);
	  },
	
	  handleDocumentKeyUp: function (e) {
	    if (e.keyCode === 27) {
	      this.setDropdownState(false);
	    }
	  },
	
	  handleDocumentClick: function (e) {
	    // If the click originated from within this component
	    // don't do anything.
	    if (isNodeInRoot(e.target, this.getDOMNode())) {
	      return;
	    }
	
	    this.setDropdownState(false);
	  },
	
	  bindRootCloseHandlers: function () {
	    this._onDocumentClickListener =
	      EventListener.listen(document, 'click', this.handleDocumentClick);
	    this._onDocumentKeyupListener =
	      EventListener.listen(document, 'keyup', this.handleDocumentKeyUp);
	  },
	
	  unbindRootCloseHandlers: function () {
	    if (this._onDocumentClickListener) {
	      this._onDocumentClickListener.remove();
	    }
	
	    if (this._onDocumentKeyupListener) {
	      this._onDocumentKeyupListener.remove();
	    }
	  },
	
	  componentWillUnmount: function () {
	    this.unbindRootCloseHandlers();
	  }
	};
	
	module.exports = DropdownStateMixin;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(78);
	var classSet = __webpack_require__(79);
	var cloneWithProps = __webpack_require__(80);
	
	var createChainedFunction = __webpack_require__(81);
	var ValidComponentChildren = __webpack_require__(82);
	
	var DropdownMenu = React.createClass({displayName: 'DropdownMenu',
	  propTypes: {
	    pullRight: React.PropTypes.bool,
	    onSelect: React.PropTypes.func
	  },
	
	  render: function () {
	    var classes = {
	        'dropdown-menu': true,
	        'dropdown-menu-right': this.props.pullRight
	      };
	
	    return (
	        React.createElement("ul", React.__spread({}, 
	          this.props, 
	          {className: joinClasses(this.props.className, classSet(classes)), 
	          role: "menu"}), 
	          ValidComponentChildren.map(this.props.children, this.renderMenuItem)
	        )
	      );
	  },
	
	  renderMenuItem: function (child, index) {
	    return cloneWithProps(
	      child,
	      {
	        // Capture onSelect events
	        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
	
	        // Force special props to be transferred
	        key: child.key ? child.key : index,
	        ref: child.ref
	      }
	    );
	  }
	});
	
	module.exports = DropdownMenu;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var TransitionEvents = __webpack_require__(108);
	
	var CollapsableMixin = {
	
	  propTypes: {
	    collapsable: React.PropTypes.bool,
	    defaultExpanded: React.PropTypes.bool,
	    expanded: React.PropTypes.bool
	  },
	
	  getInitialState: function () {
	    return {
	      expanded: this.props.defaultExpanded != null ? this.props.defaultExpanded : null,
	      collapsing: false
	    };
	  },
	
	  handleTransitionEnd: function () {
	    this._collapseEnd = true;
	    this.setState({
	      collapsing: false
	    });
	  },
	
	  componentWillReceiveProps: function (newProps) {
	    if (this.props.collapsable && newProps.expanded !== this.props.expanded) {
	      this._collapseEnd = false;
	      this.setState({
	        collapsing: true
	      });
	    }
	  },
	
	  _addEndTransitionListener: function () {
	    var node = this.getCollapsableDOMNode();
	
	    if (node) {
	      TransitionEvents.addEndEventListener(
	        node,
	        this.handleTransitionEnd
	      );
	    }
	  },
	
	  _removeEndTransitionListener: function () {
	    var node = this.getCollapsableDOMNode();
	
	    if (node) {
	      TransitionEvents.removeEndEventListener(
	        node,
	        this.handleTransitionEnd
	      );
	    }
	  },
	
	  componentDidMount: function () {
	    this._afterRender();
	  },
	
	  componentWillUnmount: function () {
	    this._removeEndTransitionListener();
	  },
	
	  componentWillUpdate: function (nextProps) {
	    var dimension = (typeof this.getCollapsableDimension === 'function') ?
	      this.getCollapsableDimension() : 'height';
	    var node = this.getCollapsableDOMNode();
	
	    this._removeEndTransitionListener();
	  },
	
	  componentDidUpdate: function (prevProps, prevState) {
	    this._afterRender();
	  },
	
	  _afterRender: function () {
	    if (!this.props.collapsable) {
	      return;
	    }
	
	    this._addEndTransitionListener();
	    setTimeout(this._updateDimensionAfterRender, 0);
	  },
	
	  _updateDimensionAfterRender: function () {
	    var node = this.getCollapsableDOMNode();
	    if (node) {
	        var dimension = (typeof this.getCollapsableDimension === 'function') ?
	            this.getCollapsableDimension() : 'height';
	        node.style[dimension] = this.isExpanded() ?
	            this.getCollapsableDimensionValue() + 'px' : '0px';
	    }
	  },
	
	  isExpanded: function () {
	    return (this.props.expanded != null) ?
	      this.props.expanded : this.state.expanded;
	  },
	
	  getCollapsableClassSet: function (className) {
	    var classes = {};
	
	    if (typeof className === 'string') {
	      className.split(' ').forEach(function (className) {
	        if (className) {
	          classes[className] = true;
	        }
	      });
	    }
	
	    classes.collapsing = this.state.collapsing;
	    classes.collapse = !this.state.collapsing;
	    classes['in'] = this.isExpanded() && !this.state.collapsing;
	
	    return classes;
	  }
	};
	
	module.exports = CollapsableMixin;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/utils/joinClasses.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */
	
	"use strict";
	
	/**
	 * Combines multiple className strings into one.
	 * http://jsperf.com/joinclasses-args-vs-array
	 *
	 * @param {...?string} classes
	 * @return {string}
	 */
	function joinClasses(className/*, ... */) {
	  if (!className) {
	    className = '';
	  }
	  var nextClass;
	  var argLength = arguments.length;
	  if (argLength > 1) {
	    for (var ii = 1; ii < argLength; ii++) {
	      nextClass = arguments[ii];
	      if (nextClass) {
	        className = (className ? className + ' ' : '') + nextClass;
	      }
	    }
	  }
	  return className;
	}
	
	module.exports = joinClasses;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/cx.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */
	
	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  if (typeof classNames == 'object') {
	    return Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}
	
	module.exports = cx;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains modified versions of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/utils/cloneWithProps.js
	 * https://github.com/facebook/react/blob/v0.12.0/src/core/ReactPropTransferer.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 *
	 * TODO: This should be replaced as soon as cloneWithProps is available via
	 *  the core React package or a separate package.
	 *  @see https://github.com/facebook/react/issues/1906
	 */
	
	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(78);
	var assign = __webpack_require__(110);
	
	/**
	 * Creates a transfer strategy that will merge prop values using the supplied
	 * `mergeStrategy`. If a prop was previously unset, this just sets it.
	 *
	 * @param {function} mergeStrategy
	 * @return {function}
	 */
	function createTransferStrategy(mergeStrategy) {
	  return function(props, key, value) {
	    if (!props.hasOwnProperty(key)) {
	      props[key] = value;
	    } else {
	      props[key] = mergeStrategy(props[key], value);
	    }
	  };
	}
	
	var transferStrategyMerge = createTransferStrategy(function(a, b) {
	  // `merge` overrides the first object's (`props[key]` above) keys using the
	  // second object's (`value`) keys. An object's style's existing `propA` would
	  // get overridden. Flip the order here.
	  return assign({}, b, a);
	});
	
	function emptyFunction() {}
	
	/**
	 * Transfer strategies dictate how props are transferred by `transferPropsTo`.
	 * NOTE: if you add any more exceptions to this list you should be sure to
	 * update `cloneWithProps()` accordingly.
	 */
	var TransferStrategies = {
	  /**
	   * Never transfer `children`.
	   */
	  children: emptyFunction,
	  /**
	   * Transfer the `className` prop by merging them.
	   */
	  className: createTransferStrategy(joinClasses),
	  /**
	   * Transfer the `style` prop (which is an object) by merging them.
	   */
	  style: transferStrategyMerge
	};
	
	/**
	 * Mutates the first argument by transferring the properties from the second
	 * argument.
	 *
	 * @param {object} props
	 * @param {object} newProps
	 * @return {object}
	 */
	function transferInto(props, newProps) {
	  for (var thisKey in newProps) {
	    if (!newProps.hasOwnProperty(thisKey)) {
	      continue;
	    }
	
	    var transferStrategy = TransferStrategies[thisKey];
	
	    if (transferStrategy && TransferStrategies.hasOwnProperty(thisKey)) {
	      transferStrategy(props, thisKey, newProps[thisKey]);
	    } else if (!props.hasOwnProperty(thisKey)) {
	      props[thisKey] = newProps[thisKey];
	    }
	  }
	  return props;
	}
	
	/**
	 * Merge two props objects using TransferStrategies.
	 *
	 * @param {object} oldProps original props (they take precedence)
	 * @param {object} newProps new props to merge in
	 * @return {object} a new object containing both sets of props merged.
	 */
	function mergeProps(oldProps, newProps) {
	  return transferInto(assign({}, oldProps), newProps);
	}
	
	
	var ReactPropTransferer = {
	  mergeProps: mergeProps
	};
	
	var CHILDREN_PROP = 'children';
	
	/**
	 * Sometimes you want to change the props of a child passed to you. Usually
	 * this is to add a CSS class.
	 *
	 * @param {object} child child component you'd like to clone
	 * @param {object} props props you'd like to modify. They will be merged
	 * as if you used `transferPropsTo()`.
	 * @return {object} a clone of child with props merged in.
	 */
	function cloneWithProps(child, props) {
	  var newProps = ReactPropTransferer.mergeProps(props, child.props);
	
	  // Use `child.props.children` if it is provided.
	  if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
	    child.props.hasOwnProperty(CHILDREN_PROP)) {
	    newProps.children = child.props.children;
	  }
	
	  if (React.version.substr(0, 4) === '0.12'){
	    var mockLegacyFactory = function(){};
	    mockLegacyFactory.isReactLegacyFactory = true;
	    mockLegacyFactory.type = child.type;
	
	    return React.createElement(mockLegacyFactory, newProps);
	  }
	
	  // The current API doesn't retain _owner and _context, which is why this
	  // doesn't use ReactElement.cloneAndReplaceProps.
	  return React.createElement(child.type, newProps);
	}
	
	module.exports = cloneWithProps;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} one
	 * @param {function} two
	 * @returns {function|null}
	 */
	function createChainedFunction(one, two) {
	  var hasOne = typeof one === 'function';
	  var hasTwo = typeof two === 'function';
	
	  if (!hasOne && !hasTwo) { return null; }
	  if (!hasOne) { return two; }
	  if (!hasTwo) { return one; }
	
	  return function chainedFunction() {
	    one.apply(this, arguments);
	    two.apply(this, arguments);
	  };
	}
	
	module.exports = createChainedFunction;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	
	/**
	 * Maps children that are typically specified as `props.children`,
	 * but only iterates over children that are "valid components".
	 *
	 * The mapFunction provided index will be normalised to the components mapped,
	 * so an invalid component would not increase the index.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} mapFunction.
	 * @param {*} mapContext Context for mapFunction.
	 * @return {object} Object containing the ordered map of results.
	 */
	function mapValidComponents(children, func, context) {
	  var index = 0;
	
	  return React.Children.map(children, function (child) {
	    if (React.isValidElement(child)) {
	      var lastIndex = index;
	      index++;
	      return func.call(context, child, lastIndex);
	    }
	
	    return child;
	  });
	}
	
	/**
	 * Iterates through children that are typically specified as `props.children`,
	 * but only iterates over children that are "valid components".
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child with the index reflecting the position relative to "valid components".
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} forEachFunc.
	 * @param {*} forEachContext Context for forEachContext.
	 */
	function forEachValidComponents(children, func, context) {
	  var index = 0;
	
	  return React.Children.forEach(children, function (child) {
	    if (React.isValidElement(child)) {
	      func.call(context, child, index);
	      index++;
	    }
	  });
	}
	
	/**
	 * Count the number of "valid components" in the Children container.
	 *
	 * @param {?*} children Children tree container.
	 * @returns {number}
	 */
	function numberOfValidComponents(children) {
	  var count = 0;
	
	  React.Children.forEach(children, function (child) {
	    if (React.isValidElement(child)) { count++; }
	  });
	
	  return count;
	}
	
	/**
	 * Determine if the Child container has one or more "valid components".
	 *
	 * @param {?*} children Children tree container.
	 * @returns {boolean}
	 */
	function hasValidComponent(children) {
	  var hasValid = false;
	
	  React.Children.forEach(children, function (child) {
	    if (!hasValid && React.isValidElement(child)) {
	      hasValid = true;
	    }
	  });
	
	  return hasValid;
	}
	
	module.exports = {
	  map: mapValidComponents,
	  forEach: forEachValidComponents,
	  numberOf: numberOfValidComponents,
	  hasValidComponent: hasValidComponent
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Shortcut to compute element style
	 *
	 * @param {HTMLElement} elem
	 * @returns {CssStyle}
	 */
	function getComputedStyles(elem) {
	  return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
	}
	
	/**
	 * Get elements offset
	 *
	 * TODO: REMOVE JQUERY!
	 *
	 * @param {HTMLElement} DOMNode
	 * @returns {{top: number, left: number}}
	 */
	function getOffset(DOMNode) {
	  if (window.jQuery) {
	    return window.jQuery(DOMNode).offset();
	  }
	
	  var docElem = document.documentElement;
	  var box = { top: 0, left: 0 };
	
	  // If we don't have gBCR, just use 0,0 rather than error
	  // BlackBerry 5, iOS 3 (original iPhone)
	  if ( typeof DOMNode.getBoundingClientRect !== 'undefined' ) {
	    box = DOMNode.getBoundingClientRect();
	  }
	
	  return {
	    top: box.top + window.pageYOffset - docElem.clientTop,
	    left: box.left + window.pageXOffset - docElem.clientLeft
	  };
	}
	
	/**
	 * Get elements position
	 *
	 * TODO: REMOVE JQUERY!
	 *
	 * @param {HTMLElement} elem
	 * @param {HTMLElement?} offsetParent
	 * @returns {{top: number, left: number}}
	 */
	function getPosition(elem, offsetParent) {
	  if (window.jQuery) {
	    return window.jQuery(elem).position();
	  }
	
	  var offset,
	      parentOffset = {top: 0, left: 0};
	
	  // Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
	  if (getComputedStyles(elem).position === 'fixed' ) {
	    // We assume that getBoundingClientRect is available when computed position is fixed
	    offset = elem.getBoundingClientRect();
	
	  } else {
	    if (!offsetParent) {
	      // Get *real* offsetParent
	      offsetParent = offsetParent(elem);
	    }
	
	    // Get correct offsets
	    offset = getOffset(elem);
	    if ( offsetParent.nodeName !== 'HTML') {
	      parentOffset = getOffset(offsetParent);
	    }
	
	    // Add offsetParent borders
	    parentOffset.top += parseInt(getComputedStyles(offsetParent).borderTopWidth, 10);
	    parentOffset.left += parseInt(getComputedStyles(offsetParent).borderLeftWidth, 10);
	  }
	
	  // Subtract parent offsets and element margins
	  return {
	    top: offset.top - parentOffset.top - parseInt(getComputedStyles(elem).marginTop, 10),
	    left: offset.left - parentOffset.left - parseInt(getComputedStyles(elem).marginLeft, 10)
	  };
	}
	
	/**
	 * Get parent element
	 *
	 * @param {HTMLElement?} elem
	 * @returns {HTMLElement}
	 */
	function offsetParent(elem) {
	  var docElem = document.documentElement;
	  var offsetParent = elem.offsetParent || docElem;
	
	  while ( offsetParent && ( offsetParent.nodeName !== 'HTML' &&
	    getComputedStyles(offsetParent).position === 'static' ) ) {
	    offsetParent = offsetParent.offsetParent;
	  }
	
	  return offsetParent || docElem;
	}
	
	module.exports = {
	  getComputedStyles: getComputedStyles,
	  getOffset: getOffset,
	  getPosition: getPosition,
	  offsetParent: offsetParent
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var invariant = __webpack_require__(117);
	
	var FakeNode = {
	
	  render: function () {
	    invariant(
	      false,
	      '%s elements should not be rendered',
	      this.constructor.displayName
	    );
	  }
	
	};
	
	module.exports = FakeNode;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var PropTypes = {
	
	  /**
	   * Requires that the value of a prop be falsy.
	   */
	  falsy: function (props, propName, componentName) {
	    if (props[propName])
	      return new Error('<' + componentName + '> may not have a "' + propName + '" prop');
	  }
	
	};
	
	module.exports = PropTypes;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	
	module.exports = {
	  contextTypes: {
	    getRouteAtDepth: React.PropTypes.func.isRequired,
	    getRouteComponents: React.PropTypes.func.isRequired,
	    routeHandlers: React.PropTypes.array.isRequired
	  },
	
	  childContextTypes: {
	    routeHandlers: React.PropTypes.array.isRequired
	  },
	
	  getChildContext: function () {
	    return {
	      routeHandlers: this.context.routeHandlers.concat([ this ])
	    };
	  },
	
	  getRouteDepth: function () {
	    return this.context.routeHandlers.length - 1;
	  },
	
	  componentDidMount: function () {
	    this._updateRouteComponent();
	  },
	
	  componentDidUpdate: function () {
	    this._updateRouteComponent();
	  },
	
	  _updateRouteComponent: function () {
	    var depth = this.getRouteDepth();
	    var components = this.context.getRouteComponents();
	    components[depth] = this.refs[this.props.ref || '__routeHandler__'];
	  },
	
	  getRouteHandler: function (props) {
	    var route = this.context.getRouteAtDepth(this.getRouteDepth());
	    return route ? React.createElement(route.handler, props || this.props) : null;
	  }
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var invariant = __webpack_require__(117);
	var merge = __webpack_require__(136).merge;
	var qs = __webpack_require__(135);
	
	var paramCompileMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|[*.()\[\]\\+|{}^$]/g;
	var paramInjectMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$?]*[?]?)|[*]/g;
	var paramInjectTrailingSlashMatcher = /\/\/\?|\/\?/g;
	var queryMatcher = /\?(.+)/;
	
	var _compiledPatterns = {};
	
	function compilePattern(pattern) {
	  if (!(pattern in _compiledPatterns)) {
	    var paramNames = [];
	    var source = pattern.replace(paramCompileMatcher, function (match, paramName) {
	      if (paramName) {
	        paramNames.push(paramName);
	        return '([^/?#]+)';
	      } else if (match === '*') {
	        paramNames.push('splat');
	        return '(.*?)';
	      } else {
	        return '\\' + match;
	      }
	    });
	
	    _compiledPatterns[pattern] = {
	      matcher: new RegExp('^' + source + '$', 'i'),
	      paramNames: paramNames
	    };
	  }
	
	  return _compiledPatterns[pattern];
	}
	
	var Path = {
	
	  /**
	   * Safely decodes special characters in the given URL path.
	   */
	  decode: function (path) {
	    return decodeURI(path.replace(/\+/g, ' '));
	  },
	
	  /**
	   * Safely encodes special characters in the given URL path.
	   */
	  encode: function (path) {
	    return encodeURI(path).replace(/%20/g, '+');
	  },
	
	  /**
	   * Returns an array of the names of all parameters in the given pattern.
	   */
	  extractParamNames: function (pattern) {
	    return compilePattern(pattern).paramNames;
	  },
	
	  /**
	   * Extracts the portions of the given URL path that match the given pattern
	   * and returns an object of param name => value pairs. Returns null if the
	   * pattern does not match the given path.
	   */
	  extractParams: function (pattern, path) {
	    var object = compilePattern(pattern);
	    var match = path.match(object.matcher);
	
	    if (!match)
	      return null;
	
	    var params = {};
	
	    object.paramNames.forEach(function (paramName, index) {
	      params[paramName] = match[index + 1];
	    });
	
	    return params;
	  },
	
	  /**
	   * Returns a version of the given route path with params interpolated. Throws
	   * if there is a dynamic segment of the route path for which there is no param.
	   */
	  injectParams: function (pattern, params) {
	    params = params || {};
	
	    var splatIndex = 0;
	
	    return pattern.replace(paramInjectMatcher, function (match, paramName) {
	      paramName = paramName || 'splat';
	
	      // If param is optional don't check for existence
	      if (paramName.slice(-1) !== '?') {
	        invariant(
	          params[paramName] != null,
	          'Missing "' + paramName + '" parameter for path "' + pattern + '"'
	        );
	      } else {
	        paramName = paramName.slice(0, -1);
	
	        if (params[paramName] == null)
	          return '';
	      }
	
	      var segment;
	      if (paramName === 'splat' && Array.isArray(params[paramName])) {
	        segment = params[paramName][splatIndex++];
	
	        invariant(
	          segment != null,
	          'Missing splat # ' + splatIndex + ' for path "' + pattern + '"'
	        );
	      } else {
	        segment = params[paramName];
	      }
	
	      return segment;
	    }).replace(paramInjectTrailingSlashMatcher, '/');
	  },
	
	  /**
	   * Returns an object that is the result of parsing any query string contained
	   * in the given path, null if the path contains no query string.
	   */
	  extractQuery: function (path) {
	    var match = path.match(queryMatcher);
	    return match && qs.parse(match[1]);
	  },
	
	  /**
	   * Returns a version of the given path without the query string.
	   */
	  withoutQuery: function (path) {
	    return path.replace(queryMatcher, '');
	  },
	
	  /**
	   * Returns a version of the given path with the parameters in the given
	   * query merged into the query string.
	   */
	  withQuery: function (path, query) {
	    var existingQuery = Path.extractQuery(path);
	
	    if (existingQuery)
	      query = query ? merge(existingQuery, query) : existingQuery;
	
	    var queryString = query && qs.stringify(query);
	
	    if (queryString)
	      return Path.withoutQuery(path) + '?' + queryString;
	
	    return path;
	  },
	
	  /**
	   * Returns true if the given path is absolute.
	   */
	  isAbsolute: function (path) {
	    return path.charAt(0) === '/';
	  },
	
	  /**
	   * Returns a normalized version of the given path.
	   */
	  normalize: function (path, parentRoute) {
	    return path.replace(/^\/*/, '/');
	  },
	
	  /**
	   * Joins two URL paths together.
	   */
	  join: function (a, b) {
	    return a.replace(/\/*$/, '/') + b;
	  }
	
	};
	
	module.exports = Path;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	
	/**
	 * Provides the router with context for Router.Navigation.
	 */
	var NavigationContext = {
	
	  childContextTypes: {
	    makePath: React.PropTypes.func.isRequired,
	    makeHref: React.PropTypes.func.isRequired,
	    transitionTo: React.PropTypes.func.isRequired,
	    replaceWith: React.PropTypes.func.isRequired,
	    goBack: React.PropTypes.func.isRequired
	  },
	
	  getChildContext: function () {
	    return {
	      makePath: this.constructor.makePath,
	      makeHref: this.constructor.makeHref,
	      transitionTo: this.constructor.transitionTo,
	      replaceWith: this.constructor.replaceWith,
	      goBack: this.constructor.goBack
	    };
	  }
	
	};
	
	module.exports = NavigationContext;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var assign = __webpack_require__(115);
	var Path = __webpack_require__(87);
	
	function routeIsActive(activeRoutes, routeName) {
	  return activeRoutes.some(function (route) {
	    return route.name === routeName;
	  });
	}
	
	function paramsAreActive(activeParams, params) {
	  for (var property in params)
	    if (String(activeParams[property]) !== String(params[property]))
	      return false;
	
	  return true;
	}
	
	function queryIsActive(activeQuery, query) {
	  for (var property in query)
	    if (String(activeQuery[property]) !== String(query[property]))
	      return false;
	
	  return true;
	}
	
	/**
	 * Provides the router with context for Router.State.
	 */
	var StateContext = {
	
	  /**
	   * Returns the current URL path + query string.
	   */
	  getCurrentPath: function () {
	    return this.state.path;
	  },
	
	  /**
	   * Returns a read-only array of the currently active routes.
	   */
	  getCurrentRoutes: function () {
	    return this.state.routes.slice(0);
	  },
	
	  /**
	   * Returns the current URL path without the query string.
	   */
	  getCurrentPathname: function () {
	    return this.state.pathname;
	  },
	
	  /**
	   * Returns a read-only object of the currently active URL parameters.
	   */
	  getCurrentParams: function () {
	    return assign({}, this.state.params);
	  },
	
	  /**
	   * Returns a read-only object of the currently active query parameters.
	   */
	  getCurrentQuery: function () {
	    return assign({}, this.state.query);
	  },
	
	  /**
	   * Returns true if the given route, params, and query are active.
	   */
	  isActive: function (to, params, query) {
	    if (Path.isAbsolute(to))
	      return to === this.state.path;
	
	    return routeIsActive(this.state.routes, to) &&
	      paramsAreActive(this.state.params, params) &&
	      (query == null || queryIsActive(this.state.query, query));
	  },
	
	  childContextTypes: {
	    getCurrentPath: React.PropTypes.func.isRequired,
	    getCurrentRoutes: React.PropTypes.func.isRequired,
	    getCurrentPathname: React.PropTypes.func.isRequired,
	    getCurrentParams: React.PropTypes.func.isRequired,
	    getCurrentQuery: React.PropTypes.func.isRequired,
	    isActive: React.PropTypes.func.isRequired
	  },
	
	  getChildContext: function () {
	    return {
	      getCurrentPath: this.getCurrentPath,
	      getCurrentRoutes: this.getCurrentRoutes,
	      getCurrentPathname: this.getCurrentPathname,
	      getCurrentParams: this.getCurrentParams,
	      getCurrentQuery: this.getCurrentQuery,
	      isActive: this.isActive
	    };
	  }
	
	};
	
	module.exports = StateContext;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var invariant = __webpack_require__(117);
	var canUseDOM = __webpack_require__(118).canUseDOM;
	var getWindowScrollPosition = __webpack_require__(111);
	
	function shouldUpdateScroll(state, prevState) {
	  if (!prevState)
	    return true;
	
	  // Don't update scroll position when only the query has changed.
	  if (state.pathname === prevState.pathname)
	    return false;
	
	  var routes = state.routes;
	  var prevRoutes = prevState.routes;
	
	  var sharedAncestorRoutes = routes.filter(function (route) {
	    return prevRoutes.indexOf(route) !== -1;
	  });
	
	  return !sharedAncestorRoutes.some(function (route) {
	    return route.ignoreScrollBehavior;
	  });
	}
	
	/**
	 * Provides the router with the ability to manage window scroll position
	 * according to its scroll behavior.
	 */
	var Scrolling = {
	
	  statics: {
	    /**
	     * Records curent scroll position as the last known position for the given URL path.
	     */
	    recordScrollPosition: function (path) {
	      if (!this.scrollHistory)
	        this.scrollHistory = {};
	
	      this.scrollHistory[path] = getWindowScrollPosition();
	    },
	
	    /**
	     * Returns the last known scroll position for the given URL path.
	     */
	    getScrollPosition: function (path) {
	      if (!this.scrollHistory)
	        this.scrollHistory = {};
	
	      return this.scrollHistory[path] || null;
	    }
	  },
	
	  componentWillMount: function () {
	    invariant(
	      this.getScrollBehavior() == null || canUseDOM,
	      'Cannot use scroll behavior without a DOM'
	    );
	  },
	
	  componentDidMount: function () {
	    this._updateScroll();
	  },
	
	  componentDidUpdate: function (prevProps, prevState) {
	    this._updateScroll(prevState);
	  },
	
	  _updateScroll: function (prevState) {
	    if (!shouldUpdateScroll(this.state, prevState))
	      return;
	
	    var scrollBehavior = this.getScrollBehavior();
	
	    if (scrollBehavior)
	      scrollBehavior.updateScrollPosition(
	        this.constructor.getScrollPosition(this.state.path),
	        this.state.action
	      );
	  }
	
	};
	
	module.exports = Scrolling;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint -W084 */
	var React = __webpack_require__(1);
	var warning = __webpack_require__(116);
	var invariant = __webpack_require__(117);
	var DefaultRoute = __webpack_require__(55);
	var NotFoundRoute = __webpack_require__(57);
	var Redirect = __webpack_require__(58);
	var Route = __webpack_require__(59);
	var Path = __webpack_require__(87);
	
	var CONFIG_ELEMENT_TYPES = [
	  DefaultRoute.type,
	  NotFoundRoute.type,
	  Redirect.type,
	  Route.type
	];
	
	function createRedirectHandler(to, _params, _query) {
	  return React.createClass({
	    statics: {
	      willTransitionTo: function (transition, params, query) {
	        transition.redirect(to, _params || params, _query || query);
	      }
	    },
	
	    render: function () {
	      return null;
	    }
	  });
	}
	
	function checkPropTypes(componentName, propTypes, props) {
	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error = propTypes[propName](props, propName, componentName);
	
	      if (error instanceof Error)
	        warning(false, error.message);
	    }
	  }
	}
	
	function createRoute(element, parentRoute, namedRoutes) {
	  var type = element.type;
	  var props = element.props;
	  var componentName = (type && type.displayName) || 'UnknownComponent';
	
	  invariant(
	    CONFIG_ELEMENT_TYPES.indexOf(type) !== -1,
	    'Unrecognized route configuration element "<%s>"',
	    componentName
	  );
	
	  if (type.propTypes)
	    checkPropTypes(componentName, type.propTypes, props);
	
	  var route = { name: props.name };
	
	  if (props.ignoreScrollBehavior) {
	    route.ignoreScrollBehavior = true;
	  }
	
	  if (type === Redirect.type) {
	    route.handler = createRedirectHandler(props.to, props.params, props.query);
	    props.path = props.path || props.from || '*';
	  } else {
	    route.handler = props.handler;
	  }
	
	  var parentPath = (parentRoute && parentRoute.path) || '/';
	
	  if ((props.path || props.name) && type !== DefaultRoute.type && type !== NotFoundRoute.type) {
	    var path = props.path || props.name;
	
	    // Relative paths extend their parent.
	    if (!Path.isAbsolute(path))
	      path = Path.join(parentPath, path);
	
	    route.path = Path.normalize(path);
	  } else {
	    route.path = parentPath;
	
	    if (type === NotFoundRoute.type)
	      route.path += '*';
	  }
	
	  route.paramNames = Path.extractParamNames(route.path);
	
	  // Make sure the route's path has all params its parent needs.
	  if (parentRoute && Array.isArray(parentRoute.paramNames)) {
	    parentRoute.paramNames.forEach(function (paramName) {
	      invariant(
	        route.paramNames.indexOf(paramName) !== -1,
	        'The nested route path "%s" is missing the "%s" parameter of its parent path "%s"',
	        route.path, paramName, parentRoute.path
	      );
	    });
	  }
	
	  // Make sure the route can be looked up by <Link>s.
	  if (props.name) {
	    invariant(
	      namedRoutes[props.name] == null,
	      'You cannot use the name "%s" for more than one route',
	      props.name
	    );
	
	    namedRoutes[props.name] = route;
	  }
	
	  // Handle <NotFoundRoute>.
	  if (type === NotFoundRoute.type) {
	    invariant(
	      parentRoute,
	      '<NotFoundRoute> must have a parent <Route>'
	    );
	
	    invariant(
	      parentRoute.notFoundRoute == null,
	      'You may not have more than one <NotFoundRoute> per <Route>'
	    );
	
	    parentRoute.notFoundRoute = route;
	
	    return null;
	  }
	
	  // Handle <DefaultRoute>.
	  if (type === DefaultRoute.type) {
	    invariant(
	      parentRoute,
	      '<DefaultRoute> must have a parent <Route>'
	    );
	
	    invariant(
	      parentRoute.defaultRoute == null,
	      'You may not have more than one <DefaultRoute> per <Route>'
	    );
	
	    parentRoute.defaultRoute = route;
	
	    return null;
	  }
	
	  route.childRoutes = createRoutesFromChildren(props.children, route, namedRoutes);
	
	  return route;
	}
	
	/**
	 * Creates and returns an array of route objects from the given ReactChildren.
	 */
	function createRoutesFromChildren(children, parentRoute, namedRoutes) {
	  var routes = [];
	
	  React.Children.forEach(children, function (child) {
	    // Exclude <DefaultRoute>s and <NotFoundRoute>s.
	    if (child = createRoute(child, parentRoute, namedRoutes))
	      routes.push(child);
	  });
	
	  return routes;
	}
	
	module.exports = createRoutesFromChildren;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	function supportsHistory() {
	  /*! taken from modernizr
	   * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	   * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	   * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	   */
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 ||
	      (ua.indexOf('Android 4.0') !== -1)) &&
	      ua.indexOf('Mobile Safari') !== -1 &&
	      ua.indexOf('Chrome') === -1 &&
	      ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  return (window.history && 'pushState' in window.history);
	}
	
	module.exports = supportsHistory;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var assign = __webpack_require__(115);
	var reversedArray = __webpack_require__(112);
	var Redirect = __webpack_require__(94);
	var Promise = __webpack_require__(113);
	
	/**
	 * Runs all hook functions serially and calls callback(error) when finished.
	 * A hook may return a promise if it needs to execute asynchronously.
	 */
	function runHooks(hooks, callback) {
	  var promise;
	  try {
	    promise = hooks.reduce(function (promise, hook) {
	      // The first hook to use transition.wait makes the rest
	      // of the transition async from that point forward.
	      return promise ? promise.then(hook) : hook();
	    }, null);
	  } catch (error) {
	    return callback(error); // Sync error.
	  }
	
	  if (promise) {
	    // Use setTimeout to break the promise chain.
	    promise.then(function () {
	      setTimeout(callback);
	    }, function (error) {
	      setTimeout(function () {
	        callback(error);
	      });
	    });
	  } else {
	    callback();
	  }
	}
	
	/**
	 * Calls the willTransitionFrom hook of all handlers in the given matches
	 * serially in reverse with the transition object and the current instance of
	 * the route's handler, so that the deepest nested handlers are called first.
	 * Calls callback(error) when finished.
	 */
	function runTransitionFromHooks(transition, routes, components, callback) {
	  components = reversedArray(components);
	
	  var hooks = reversedArray(routes).map(function (route, index) {
	    return function () {
	      var handler = route.handler;
	
	      if (!transition.isAborted && handler.willTransitionFrom)
	        return handler.willTransitionFrom(transition, components[index]);
	
	      var promise = transition._promise;
	      transition._promise = null;
	
	      return promise;
	    };
	  });
	
	  runHooks(hooks, callback);
	}
	
	/**
	 * Calls the willTransitionTo hook of all handlers in the given matches
	 * serially with the transition object and any params that apply to that
	 * handler. Calls callback(error) when finished.
	 */
	function runTransitionToHooks(transition, routes, params, query, callback) {
	  var hooks = routes.map(function (route) {
	    return function () {
	      var handler = route.handler;
	
	      if (!transition.isAborted && handler.willTransitionTo)
	        handler.willTransitionTo(transition, params, query);
	
	      var promise = transition._promise;
	      transition._promise = null;
	
	      return promise;
	    };
	  });
	
	  runHooks(hooks, callback);
	}
	
	/**
	 * Encapsulates a transition to a given path.
	 *
	 * The willTransitionTo and willTransitionFrom handlers receive
	 * an instance of this class as their first argument.
	 */
	function Transition(path, retry) {
	  this.path = path;
	  this.abortReason = null;
	  this.isAborted = false;
	  this.retry = retry.bind(this);
	  this._promise = null;
	}
	
	assign(Transition.prototype, {
	
	  abort: function (reason) {
	    if (this.isAborted) {
	      // First abort wins.
	      return;
	    }
	
	    this.abortReason = reason;
	    this.isAborted = true;
	  },
	
	  redirect: function (to, params, query) {
	    this.abort(new Redirect(to, params, query));
	  },
	
	  wait: function (value) {
	    this._promise = Promise.resolve(value);
	  },
	
	  from: function (routes, components, callback) {
	    return runTransitionFromHooks(this, routes, components, callback);
	  },
	
	  to: function (routes, params, query, callback) {
	    return runTransitionToHooks(this, routes, params, query, callback);
	  }
	
	});
	
	module.exports = Transition;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Encapsulates a redirect to the given route.
	 */
	function Redirect(to, params, query) {
	  this.to = to;
	  this.params = params;
	  this.query = query;
	}
	
	module.exports = Redirect;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Represents a cancellation caused by navigating away
	 * before the previous transition has fully resolved.
	 */
	function Cancellation() { }
	
	module.exports = Cancellation;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Actions that modify the URL.
	 */
	var LocationActions = {
	
	  /**
	   * Indicates a new location is being pushed to the history stack.
	   */
	  PUSH: 'push',
	
	  /**
	   * Indicates the current location should be replaced.
	   */
	  REPLACE: 'replace',
	
	  /**
	   * Indicates the most recent entry should be removed from the history stack.
	   */
	  POP: 'pop'
	
	};
	
	module.exports = LocationActions;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var MILI 		= 'milliseconds'
	  , SECONDS = 'seconds'
	  , MINUTES = 'minutes'
	  , HOURS 	= 'hours'
	  , DAY 		= 'day'
	  , WEEK 		= 'week'
	  , MONTH 	= 'month'
	  , YEAR 		= 'year'
	  , DECADE  = 'decade'
	  , CENTURY = 'century';
	
	// function tick(date){
	// 	this.__val__ = date;
	// }
	
	var dates = module.exports = {
	
	  startOfWeek: function(d){
	    return 0;
	  },
	
		add: function(date, num, unit) {
			date = new Date(date)
	
			if ( unit === MILI ) 
				return dates.milliseconds(date, dates.milliseconds(date) + num)
	
			else if ( unit === SECONDS ) 
				return dates.seconds(date, dates.seconds(date) + num)
	
			else if ( unit === MINUTES ) 
				return dates.minutes(date, dates.minutes(date) + num)
	
			else if ( unit === HOURS ) 
				return dates.hours(date, dates.hours(date) + num)
	
			else if ( unit === DAY ) 
				return dates.date(date, dates.date(date) + num)
			
			else if ( unit === WEEK )
				return dates.date(date, dates.date(date) + (7 * num)) 
	
			else if ( unit === MONTH )
				return monthMath(date, num)
	
			else if ( unit === YEAR )
				return dates.year(date, dates.year(date) + num)
	
	    else if ( unit === DECADE )
	      return dates.year(date, dates.year(date) + (num * 10))
	
	    else if ( unit === CENTURY )
	      return dates.year(date, dates.year(date) + (num * 100))
	
			throw new TypeError('Invalid units: "' + unit + '"')
		},
	
		subtract: function(date, num, unit) {
			return dates.add(date, -num, unit)
		},
	
		startOf: function(date, unit) {
	    var decade, century;
	
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
	    	date = dates.weekday(date, 0);
	
	    return date
		},
	
	
		endOf: function(date, unit){
			date = new Date(date)
			date = dates.startOf(date, unit)
			date = dates.add(date, 1, unit)
			date = dates.subtract(date, 1, MILI)
			return date
		},
	
		eq: createComparer(function(a, b){
			return a === b
		}),
	
		gt: createComparer(function(a, b){
			return a > b
		}),
	
		gte: createComparer(function(a, b){
			return a >= b
		}),
	
		lt: createComparer(function(a, b){
			return a < b
		}),
	
		lte: createComparer(function(a, b){
			return a <= b
		}),
	
	  min: function(){
	    var args = Array.prototype.slice.call(arguments);
	
	    return new Date(Math.min.apply(Math, args))
	  },
	
	  max: function(){
	    var args = Array.prototype.slice.call(arguments);
	
	    return new Date(Math.max.apply(Math, args))
	  },
	  
	  inRange: function(day, min, max, unit){
	    unit = unit || 'day'
	
	    return (!min || dates.gte(day, min, unit))
	        && (!max || dates.lte(day, max, unit))
	  },
	
		milliseconds: 	createAccessor('Milliseconds'),
		seconds: 				createAccessor('Seconds'),
		minutes: 				createAccessor('Minutes'),
		hours: 					createAccessor('Hours'),
		day: 						createAccessor('Day'),
		date: 					createAccessor('Date'),
		month: 					createAccessor('Month'),
		year: 					createAccessor('FullYear'),
	
	  decade: function (date, val) {
	    return val == undefined 
	      ? dates.year(dates.startOf(date, DECADE))
	      : dates.add(date, val + 10, YEAR);
	  },
	
	  century: function (date, val) {
	    return val == undefined 
	      ? dates.year(dates.startOf(date, CENTURY))
	      : dates.add(date, val + 100, YEAR);
	  },
	
		weekday: function (date, val) {
	      var weekday = (dates.day(date) + 7 - dates.startOfWeek() ) % 7;
	
	      return val == undefined 
	        ? weekday 
	        : dates.add(date, val - weekday, DAY);
	  },
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
	
	//LOCALIZATION
	
	
	function createAccessor(method){
		method = method.charAt(0).toUpperCase() + method.substr(1)
	
		return function(date, val){
			if (val === undefined)
				return date['get' + method]()
	
			date = new Date(date)
			date['set' + method](val)
			return date
		}
	}
	
	function createComparer(operator) {
	
	    return function (a, b, unit) {
	        return operator(+dates.startOf(a, unit), + dates.startOf(b, unit))
	    };
	}


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React           = __webpack_require__(1)
	  , _               = __webpack_require__(137)
	  , cx              = __webpack_require__(138)
	  
	  , controlledInput = __webpack_require__(139)
	  , CustomPropTypes = __webpack_require__(140)
	  , Popup           = __webpack_require__(120)
	  , PlainList       = __webpack_require__(121)
	  , GroupableList   = __webpack_require__(122)
	  , validateList    = __webpack_require__(141);
	  
	
	var propTypes = {
	  //-- controlled props -----------
	  value:          React.PropTypes.any,
	  onChange:       React.PropTypes.func,
	  open:           React.PropTypes.bool,
	  onToggle:       React.PropTypes.func,
	  //------------------------------------
	
	  data:           React.PropTypes.array,
	  valueField:     React.PropTypes.string,
	  textField:      React.PropTypes.string,
	
	  valueComponent: CustomPropTypes.elementType,
	  itemComponent:  CustomPropTypes.elementType,
	  listComponent:  CustomPropTypes.elementType,
	
	  groupComponent: CustomPropTypes.elementType,
	  groupBy:        React.PropTypes.oneOfType([
	                    React.PropTypes.func,
	                    React.PropTypes.string
	                  ]),
	
	  onSelect:       React.PropTypes.func,
	  
	  busy:           React.PropTypes.bool,
	
	  delay:          React.PropTypes.number,
	  duration:       React.PropTypes.number, //popup
	
	  disabled:       React.PropTypes.oneOfType([
	                        React.PropTypes.bool,
	                        React.PropTypes.oneOf(['disabled'])
	                      ]),
	
	  readOnly:       React.PropTypes.oneOfType([
	                    React.PropTypes.bool,
	                    React.PropTypes.oneOf(['readOnly'])
	                  ]),
	
	  messages:       React.PropTypes.shape({
	    open:         React.PropTypes.string,
	  })
	};
	
	var DropdownList = React.createClass({
	
	  displayName: 'DropdownList',
	
	  mixins: [
	    __webpack_require__(147),
	    __webpack_require__(148),
	    __webpack_require__(149),
	    __webpack_require__(150),
	    __webpack_require__(151)
	  ],
	
	  propTypes: propTypes,
	
		getInitialState: function(){
	    var initialIdx = this._dataIndexOf(this.props.data, this.props.value);
	
			return {
	      selectedItem: this.props.data[initialIdx],
	      focusedItem:  this.props.data[initialIdx] || this.props.data[0],
			}
		},
	
	  getDefaultProps: function(){
	    return {
	      delay: 500,
	      value: '',
	      open: false,
	      data: [],
	      messages: {
	        open: 'open dropdown'
	      }
	    }
	  },
	
	  componentDidMount: function() {
	    validateList(this.refs.list)
	  },
	
	  componentWillReceiveProps: function(props){
	    if ( _.isShallowEqual(props.value, this.props.value) && props.data === this.props.data)
	      return
	
	    var idx = this._dataIndexOf(props.data, props.value);
	
	    this.setState({ 
	      selectedItem: props.data[idx],
	      focusedItem:  props.data[!~idx ? 0 : idx]
	    })
	  },
	
		render: function(){
			var $__0=
	        
	          _.omit(this.props, Object.keys(propTypes)),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , ValueComponent = this.props.valueComponent
	      , valueItem = this._dataItem( this._data(), this.props.value )
	      , optID = this._id('_option')
	      , List  = this.props.listComponent || (this.props.groupBy && GroupableList) || PlainList
	      ;
	
			return (
				React.createElement("div", React.__spread({},  props, 
	        {ref: "element", 
	        onKeyDown: this._maybeHandle(this._keyDown), 
	        onClick: this._maybeHandle(this.toggle), 
	        onFocus: this._maybeHandle(this._focus.bind(null, true), true), 
	        onBlur: this._focus.bind(null, false), 
	        'aria-expanded':  this.props.open, 
	        'aria-haspopup': true, 
	        'aria-busy': !!this.props.busy, 
	        'aria-activedescendent':  this.props.open ? optID : undefined, 
	        'aria-disabled':  this.props.disabled, 
	        'aria-readonly':  this.props.readOnly, 
	        tabIndex: this.props.disabled ? '-1' : "0", 
	        className: cx(className, {
	          'rw-dropdownlist':   true,
	          'rw-widget':          true,
	          'rw-state-disabled':  this.props.disabled,
	          'rw-state-readonly':  this.props.readOnly,
	          'rw-state-focus':     this.state.focused,
	          'rw-open':            this.props.open,
	          'rw-rtl':             this.isRtl()
	        })}), 
	
					React.createElement("span", {className: "rw-dropdownlist-picker rw-select rw-btn"}, 
						React.createElement("i", {className: "rw-i rw-i-caret-down" + (this.props.busy ? ' rw-loading' : "")}, 
	            React.createElement("span", {className: "rw-sr"},  this.props.messages.open)
	          )
					), 
	        React.createElement("div", {className: "rw-input"}, 
	           this.props.valueComponent
	              ? React.createElement(ValueComponent, {item: valueItem})
	              : this._dataText(valueItem)
	          
	        ), 
	        React.createElement(Popup, {open: this.props.open, 
	          onRequestClose: this.close, 
	          duration: this.props.duration}, 
	          React.createElement("div", null, 
	            React.createElement(List, React.__spread({ref: "list"},  
	              _.pick(this.props, Object.keys(List.type.propTypes)), 
	              {optID: optID, 
	              'aria-hidden': !this.props.open, 
	              selected: this.state.selectedItem, 
	              focused: this.props.open ? this.state.focusedItem : null, 
	              onSelect: this._maybeHandle(this._onSelect), 
	              onMove: this._scrollTo}))
	          )
	        )
				)
			)
		},
	
	  _focus: function(focused, e){
	    var self = this;
	
	    clearTimeout(self.timer)
	    self.timer = setTimeout(function(){
	
	      if(focused) self.getDOMNode().focus()
	      else        self.close()
	
	      if( focused !== self.state.focused){
	        self.notify(focused ? 'onFocus' : 'onBlur', e)
	        self.setState({ focused: focused })
	      }
	
	    }, 0)
	  },
	
	  _onSelect: function(data){
	    this.close()
	    this.notify('onSelect', data)
	    this.change(data)
	  },
	
	  _keyDown: function(e){
	    var self = this
	      , key = e.key
	      , alt = e.altKey
	      , list = this.refs.list
	      , focusedItem = this.state.focusedItem
	      , selectedItem = this.state.selectedItem
	      , isOpen = this.props.open;
	
	
	    if ( key === 'End' ) {
	      if ( isOpen) this.setState({ focusedItem: list.last() })
	      else         change(list.last())
	      e.preventDefault()
	    }
	    else if ( key === 'Home' ) {
	      if ( isOpen) this.setState({ focusedItem: list.first() })
	      else         change(list.first())
	      e.preventDefault()
	    }
	    else if ( key === 'Escape' && isOpen ) {
	      this.close()
	    }
	    else if ( (key === 'Enter' || key === ' ') && isOpen ) {
	      change(this.state.focusedItem, true)
	    }
	    else if ( key === 'ArrowDown' ) {
	      if ( alt )         this.open()
	      else if ( isOpen ) this.setState({ focusedItem: list.next(focusedItem) })
	      else               change(list.next(selectedItem))
	      e.preventDefault()
	    }
	    else if ( key === 'ArrowUp' ) {
	      if ( alt )         this.close()
	      else if ( isOpen ) this.setState({ focusedItem: list.prev(focusedItem) })
	      else               change(list.prev(selectedItem))
	      e.preventDefault()
	    }
	    else
	      this.search(String.fromCharCode(e.keyCode), function(item)  {
	        isOpen 
	          ? this.setState({ focusedItem: item })
	          : change(item)
	      }.bind(this))
	
	
	    this.notify('onKeyDown', [e])
	    
	    function change(item, fromList){
	      if(!item) return
	      if(fromList) self.notify('onSelect', item)
	
	      self.change(item)
	    }
	  },
	
	  change: function(data){
	    if ( !_.isShallowEqual(data, this.props.value) ) {
	      this.notify('onChange', data)
	      this.close()
	    }
	  },
	
	  _data: function(){
	    return this.props.data
	  },
	
	  search: function(character, cb){
	    var word = ((this._searchTerm || '') + character).toLowerCase();
	      
	    clearTimeout(this._timer)
	    this._searchTerm = word 
	  
	    this._timer = setTimeout(function()  {
	      var list = this.refs.list
	        , key  = this.props.open ? 'focusedItem' : 'selectedItem'
	        , item = list.next(this.state[key], word);
	      
	      this._searchTerm = ''
	      if ( item) cb(item)
	
	    }.bind(this), this.props.delay)
	  },
	
	  open: function(){
	    this.notify('onToggle', true)
	  },
	
	  close: function(){
	    this.notify('onToggle', false)
	  },
	
	  toggle: function(e){
	    this.props.open
	      ? this.close()
	      : this.open()
	  }
	
	})
	
	
	module.exports = controlledInput.createControlledClass(
	    DropdownList, { open: 'onToggle', value: 'onChange' });
	
	module.exports.BaseDropdownList = DropdownList

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React           = __webpack_require__(1)
	  , cx              = __webpack_require__(138)
	  , _               = __webpack_require__(137)
	  , filter          = __webpack_require__(142)
	  , Popup           = __webpack_require__(120)
	  , Btn             = __webpack_require__(123)
	  , Input           = __webpack_require__(124)
	
	  , controlledInput = __webpack_require__(139)
	  , CustomPropTypes = __webpack_require__(140)
	  , PlainList       = __webpack_require__(121)
	  , GroupableList   = __webpack_require__(122)
	  , validateList    = __webpack_require__(141);
	
	var propTypes = {
	      //-- controlled props -----------
	      value:          React.PropTypes.any,
	      onChange:       React.PropTypes.func,
	      open:           React.PropTypes.bool,
	      onToggle:       React.PropTypes.func,
	      //------------------------------------
	
	      itemComponent:  CustomPropTypes.elementType,
	      listComponent:  CustomPropTypes.elementType,
	
	      groupComponent: CustomPropTypes.elementType,
	      groupBy:        React.PropTypes.oneOfType([
	                        React.PropTypes.func,
	                        React.PropTypes.string
	                      ]),
	
	      data:           React.PropTypes.array,
	      valueField:     React.PropTypes.string,
	      textField:      React.PropTypes.string,
	      name:           React.PropTypes.string,
	
	      onSelect:       React.PropTypes.func,
	      
	      disabled:       React.PropTypes.oneOfType([
	                        React.PropTypes.bool,
	                        React.PropTypes.oneOf(['disabled'])
	                      ]),
	
	      readOnly:       React.PropTypes.oneOfType([
	                        React.PropTypes.bool,
	                        React.PropTypes.oneOf(['readOnly'])
	                      ]),
	
	      suggest:        React.PropTypes.bool,
	      busy:           React.PropTypes.bool,
	
	      duration:       React.PropTypes.number, //popup
	      placeholder:    React.PropTypes.string,
	
	      messages:       React.PropTypes.shape({
	        open:         React.PropTypes.string,
	        emptyList:    React.PropTypes.string,
	        emptyFilter:  React.PropTypes.string
	      })
	    };
	
	var ComboBox = React.createClass({
	
	  displayName: 'ComboBox',
	
	  mixins: [
	    __webpack_require__(147),
	    __webpack_require__(152),
	    __webpack_require__(153),
	    __webpack_require__(149),
	    __webpack_require__(150),
	    __webpack_require__(151)
	  ],
	
	  propTypes: propTypes,
	
		getInitialState: function(){
	    var items = this.process(this.props.data, this.props.value)
	      , idx   = this._dataIndexOf(items, this.props.value);
	
			return {
				selectedItem:  items[idx],
	      focusedItem:   items[!~idx ? 0 : idx],
	      processedData: items,
				open:          false
			}
		},
	
	  getDefaultProps: function(){
	    return {
	      data: [],
	      value: '',
	      open: false,
	      suggest: false,
	      filter: false,
	      delay: 500,
	
	      messages: {
	        open: 'open combobox',
	        emptyList:   "There are no items in this list",
	        emptyFilter: "The filter returned no results"
	      }
	    }
	  },
	
	  componentDidMount: function() {
	    validateList(this.refs.list)
	  },
	
	  shouldComponentUpdate: function(nextProps, nextState){
	    var isSuggesting = this.refs.input && this.refs.input.isSuggesting()
	      , stateChanged = !_.isShallowEqual(nextState, this.state)
	      , valueChanged = !_.isShallowEqual(nextProps, this.props)
	
	    return isSuggesting || stateChanged || valueChanged
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    var rawIdx = this._dataIndexOf(nextProps.data, nextProps.value)
	      , valueItem = rawIdx == -1 ? nextProps.value : nextProps.data[rawIdx]
	      , isSuggesting = this.refs.input.isSuggesting()
	      , items = this.process(
	          nextProps.data
	        , nextProps.value
	        , (rawIdx === -1 || isSuggesting) && this._dataText(valueItem) )
	
	      , idx = this._dataIndexOf(items, nextProps.value)
	      , focused = this.filterIndexOf(items, this._dataText(valueItem));
	
	    this._searchTerm = '';
	
	    this.setState({
	      processedData:  items,
	      selectedItem:   items[idx],
	      focusedItem:    items[idx === -1
	        ? focused !== -1 ? focused : 0 // focus the closest match
	        : idx]
	    })
	  },
	
		render: function(){
			var $__0=     _.omit(this.props, Object.keys(propTypes)),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , valueItem = this._dataItem( this._data(), this.props.value )
	      , items = this._data()
	      , listID = this._id('_listbox')
	      , optID  = this._id( '_option')
	      , List   = this.props.listComponent || (this.props.groupBy && GroupableList) || PlainList
	      , completeType = this.props.suggest
	          ? this.props.filter ? 'both' : 'inline'
	          : this.props.filter ? 'list' : '';
	
			return (
				React.createElement("div", React.__spread({},  props , 
	        {ref: "element", 
	        role: "combobox", 
	        onKeyDown: this._maybeHandle(this._keyDown), 
	        onFocus: this._maybeHandle(this._focus.bind(null, true), true), 
	        onBlur: this._focus.bind(null, false), 
	        tabIndex: "-1", 
	        className: cx(className, {
	          'rw-combobox':        true,
	          'rw-widget':          true,
	          'rw-state-focus':     this.state.focused,
	          'rw-open':            this.props.open,
	          'rw-state-disabled':  this.props.disabled,
	          'rw-state-readonly':  this.props.readOnly,
	          'rw-rtl':             this.isRtl()
	         })}), 
	        React.createElement(Btn, {
	          tabIndex: "-1", 
	          className: "rw-select", 
	          onClick: this._maybeHandle(this.toggle), 
	          disabled: !!(this.props.disabled || this.props.readOnly)}, 
	          React.createElement("i", {className: "rw-i rw-i-caret-down" + (this.props.busy ? ' rw-loading' : "")}, 
	            React.createElement("span", {className: "rw-sr"},  this.props.messages.open)
	          )
	        ), 
	        React.createElement(Input, {
	          ref: "input", 
	          type: "text", 
	          suggest: this.props.suggest, 
	          name: this.props.name, 
	          'aria-owns': listID, 
	          'aria-busy': !!this.props.busy, 
	          'aria-autocomplete': completeType, 
	          'aria-activedescendent':  this.props.open ? optID : undefined, 
	          'aria-expanded':  this.props.open, 
	          'aria-haspopup': true, 
	          placeholder: this.props.placeholder, 
	          disabled: this.props.disabled, 
	          readOnly: this.props.readOnly, 
	          className: "rw-input", 
	          value:  this._dataText(valueItem), 
	          onChange: this._inputTyping, 
	          onKeyDown: this._inputKeyDown}), 
	
	        React.createElement(Popup, {open: this.props.open, onRequestClose: this.close, duration: this.props.duration}, 
	          React.createElement("div", null, 
	            React.createElement(List, React.__spread({ref: "list"}, 
	              _.pick(this.props, Object.keys(List.type.propTypes)), 
	              {id: listID, 
	              optID: optID, 
	              'aria-hidden':  !this.props.open, 
	              'aria-live':  completeType && 'polite', 
	              data: items, 
	              selected: this.state.selectedItem, 
	              focused: this.state.focusedItem, 
	              onSelect: this._maybeHandle(this._onSelect), 
	              onMove: this._scrollTo, 
	              messages: {
	                emptyList: this.props.data.length
	                  ? this.props.messages.emptyFilter
	                  : this.props.messages.emptyList
	              }}))
	          )
	        )
				)
			)
		},
	
	  _onSelect: function(data){
	    this.close()
	    this.notify('onSelect', data)
	    this.change(data)
	    this._focus(true);
	  },
	
	  _inputKeyDown: function(e){
	    this._deleting = e.key === 'Backspace' || e.key === 'Delete'
	    this._isTyping = true
	  },
	
	  _inputTyping: function(e){
	    var self = this
	      , shouldSuggest = !!this.props.suggest
	      , strVal  = e.target.value
	      , suggestion, data;
	
	    suggestion = this._deleting || !shouldSuggest
	      ? strVal : this.suggest(this._data(), strVal)
	
	    suggestion = suggestion || strVal
	
	    data = _.find(self.props.data, 
	      function(item)  {return this._dataText(item).toLowerCase() === suggestion.toLowerCase();}.bind(this))
	
	    this.change(!this._deleting && data
	      ? data
	      : strVal, true)
	
	    this.open()
	  },
	
	  _focus: function(focused, e){
	    clearTimeout(this.timer)
	    !focused && this.refs.input.accept() //not suggesting anymore
	
	    this.timer = setTimeout(function() {
	      if(focused) this.refs.input.focus()
	      else        this.close()
	
	      if( focused !== this.state.focused){
	        this.notify(focused ? 'onFocus' : 'onBlur', e)
	        this.setState({ focused:focused })
	      }
	    }.bind(this), 0)
	  },
	
	  _keyDown: function(e){
	    var self = this
	      , key  = e.key
	      , alt  = e.altKey
	      , list = this.refs.list
	      , focusedItem = this.state.focusedItem
	      , selectedItem = this.state.selectedItem
	      , isOpen = this.props.open;
	
	    if ( key === 'End' )
	      if ( isOpen ) this.setState({ focusedItem: list.last() })
	      else          select(list.last(), true)
	
	    else if ( key === 'Home' )
	      if ( isOpen ) this.setState({ focusedItem: list.first() })
	      else          select(list.first(), true)
	
	    else if ( key === 'Escape' && isOpen )
	      this.close()
	
	    else if ( key === 'Enter' && isOpen ) {
	      this.close()
	      select(this.state.focusedItem, true)
	    }
	
	    else if ( key === 'ArrowDown' ) {
	      if ( alt )
	        this.open()
	      else {
	        if ( isOpen ) this.setState({ focusedItem: list.next(focusedItem) })
	        else          select(list.next(selectedItem), true)
	      }
	    }
	    else if ( key === 'ArrowUp' ) {
	      if ( alt )
	        this.close()
	      else {
	        if ( isOpen ) this.setState({ focusedItem: list.prev(focusedItem) })
	        else          select(list.prev(selectedItem), true)
	      }
	    }
	
	    this.notify('onKeyDown', [e])
	    
	    function select(item, fromList) {
	      if(!item)
	        return self.change(self.refs.input.getDOMNode().value, false)
	
	      self.refs.input.accept(true); //removes caret
	
	      if(fromList) 
	        self.notify('onSelect', item)
	
	      self.change(item, false)
	    }
	  },
	
	  change: function(data, typing){
	    this._typedChange = !!typing
	    this.notify('onChange', data)
	  },
	
	  open: function(){
	    if ( !this.props.open )
	      this.notify('onToggle', true)
	  },
	
	  close: function(){
	    if ( this.props.open )
	      this.notify('onToggle', false)
	  },
	
	  toggle: function(e){
	    this._focus(true)
	
	    this.props.open
	      ? this.close()
	      : this.open()
	  },
	
	  suggest: function(data, value){
	    var word = this._dataText(value)
	      , matcher = filter.startsWith
	      , suggestion = typeof value === 'string'
	          ? _.find(data, finder, this)
	          : value
	
	    if ( suggestion && (!this.state || !this.state.deleting))
	      return this._dataText(suggestion)
	
	    return ''
	
	    function finder(item){
	      return matcher(
	          this._dataText(item).toLowerCase()
	        , word.toLowerCase())
	    }
	  },
	
	  _data: function(){
	    return this.state.processedData
	  },
	
	  process: function(data, values, searchTerm){
	    if( this.props.filter && searchTerm)
	      data = this.filter(data, searchTerm)
	
	    return data
	  }
	})
	
	module.exports = controlledInput.createControlledClass(
	      ComboBox, { open: 'onToggle', value: 'onChange' });
	
	module.exports.BaseComboBox = ComboBox

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React           = __webpack_require__(1)
	  , Header          = __webpack_require__(125)
	  , Month           = __webpack_require__(126)
	  , Year            = __webpack_require__(127)
	  , Decade          = __webpack_require__(128)
	  , Century         = __webpack_require__(129)
	  , cx              = __webpack_require__(138)
	  , controlledInput = __webpack_require__(139)
	  , SlideTransition = __webpack_require__(106)
	  , dates           = __webpack_require__(143)
	  , constants       = __webpack_require__(144)
	  , _               = __webpack_require__(137); //values, omit, object
	
	var dir = constants.directions;
	
	var views        = constants.calendarViews
	  , VIEW_OPTIONS = Object.keys(views).map( function(k)  {return views[k];} )
	  , ALT_VIEW     = _.transform(constants.calendarViewHierarchy, function(o, val, key)  { 
	                      o[val] = key 
	                    }, {})
	  , NEXT_VIEW    = constants.calendarViewHierarchy
	  , VIEW_UNIT    = constants.calendarViewUnits
	  , VIEW  = _.object([
	      [views.MONTH,   Month],
	      [views.YEAR,    Year],
	      [views.DECADE,  Decade],
	      [views.CENTURY, Century]
	    ]);
	
	var MULTIPLIER = _.object([
	      [views.YEAR,    1],
	      [views.DECADE,  10],
	      [views.CENTURY, 100]
	    ]);
	
	var propTypes = {
	
	  onChange:      React.PropTypes.func.isRequired,
	  value:         React.PropTypes.instanceOf(Date),
	
	  min:           React.PropTypes.instanceOf(Date),
	  max:           React.PropTypes.instanceOf(Date),
	
	  initialView:   React.PropTypes.oneOf(VIEW_OPTIONS),
	  finalView:     React.PropTypes.oneOf(VIEW_OPTIONS),
	
	  disabled:       React.PropTypes.oneOfType([
	                      React.PropTypes.bool,
	                      React.PropTypes.oneOf(['disabled'])
	                    ]),
	
	  readOnly:       React.PropTypes.oneOfType([
	                    React.PropTypes.bool,
	                    React.PropTypes.oneOf(['readOnly'])
	                  ]),
	
	  culture:       React.PropTypes.string,
	
	  messages:      React.PropTypes.shape({
	    moveBack:    React.PropTypes.string,
	    moveForward: React.PropTypes.string
	  }),
	
	  maintainFocus: React.PropTypes.bool,
	}
	
	var Calendar = React.createClass({
	
	  displayName: 'Calendar',
	
	  mixins: [
	    __webpack_require__(147),
	    __webpack_require__(148),
	    __webpack_require__(151)
	  ],
	
	  propTypes:propTypes,
	
	  getInitialState: function(){
	    var value = this.inRangeValue(this.props.value);
	
	    return {
	      selectedIndex: 0,
	      view:          this.props.initialView || 'month',
	      currentDate:   value ? new Date(value) : new Date()
	    }
	  },
	
	  getDefaultProps: function(){
	    return {
	
	      value: null,
	      min:   new Date(1900,0, 1),
	      max:   new Date(2099,11, 31),
	
	      initialView: 'month',
	      finalView: 'century',
	
	      tabIndex: '0',
	    }
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    var bottom  = VIEW_OPTIONS.indexOf(nextProps.initialView)
	      , top     = VIEW_OPTIONS.indexOf(nextProps.finalView)
	      , current = VIEW_OPTIONS.indexOf(this.state.view)
	      , view    = this.state.view
	      , val     = this.inRangeValue(nextProps.value);
	
	    if( current < bottom )
	      this.setState({ view: view = nextProps.initialView })
	    else if (current > top)
	      this.setState({ view: view = nextProps.finalView })
	
	    //if the value changes reset views to the new one
	    if ( !dates.eq(val, dateOrNull(this.props.value), VIEW_UNIT[view]))
	      this.setState({
	        currentDate: val ? new Date(val) : new Date()
	      })
	  },
	
	  render: function(){
	    var $__0=
	        
	          _.omit(this.props, Object.keys(propTypes)),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , View     = VIEW[this.state.view]
	      , unit     = this.state.view
	      
	      , disabled = this.props.disabled || this.props.readOnly
	      , date     = this.state.currentDate
	      , labelId  = this._id('_view_label')
	      , key      = this.state.view + '_' + dates[this.state.view](date)
	      , id       = this._id('_view');
	
	    return (
	      React.createElement("div", React.__spread({},  props , 
	        {onKeyDown: this._keyDown, 
	        onFocus: this._maybeHandle(this._focus.bind(null, true), true), 
	        onBlur: this._focus.bind(null, false), 
	        className: cx(className, {
	          'rw-calendar':       true,
	          'rw-widget':         true,
	          'rw-state-focus':    this.state.focused,
	          'rw-state-disabled': this.props.disabled,
	          'rw-state-readonly': this.props.readOnly,
	          'rw-rtl':            this.isRtl()
	        })}), 
	        React.createElement(Header, {
	          label: this._label(), 
	          labelId: labelId, 
	          messages: this.props.messages, 
	          upDisabled:   disabled || this.state.view === this.props.finalView, 
	          prevDisabled: disabled || !dates.inRange(this.nextDate(dir.LEFT), this.props.min, this.props.max, unit), 
	          nextDisabled: disabled || !dates.inRange(this.nextDate(dir.RIGHT), this.props.min, this.props.max, unit), 
	          onViewChange: this._maybeHandle(this.navigate.bind(null, dir.UP, null)), 
	          onMoveLeft: this._maybeHandle(this.navigate.bind(null,  dir.LEFT, null)), 
	          onMoveRight: this._maybeHandle(this.navigate.bind(null,  dir.RIGHT, null))}), 
	
	        React.createElement(SlideTransition, {
	          ref: "animation", 
	          duration: this.props.duration, 
	          direction: this.state.slideDirection, 
	          onAnimate: function()  {return this._focus(true);}.bind(this)}, 
	
	          React.createElement(View, {ref: "currentView", 
	            key: key, 
	            id: id, 
	            culture: this.props.culture, 
	            'aria-labelledby': labelId, 
	            selectedDate: this.props.value, 
	            value: this.state.currentDate, 
	            onChange: this._maybeHandle(this.change), 
	            onKeyDown: this._maybeHandle(this._keyDown), 
	            onMoveLeft: this._maybeHandle(this.navigate.bind(null,  dir.LEFT)), 
	            onMoveRight: this._maybeHandle(this.navigate.bind(null,  dir.RIGHT)), 
	            disabled: this.props.disabled, 
	            readOnly: this.props.readOnly, 
	            min: this.props.min, 
	            max: this.props.max})
	        )
	      )
	    )
	  },
	
	  navigate: function(direction, date){
	    var view     =  this.state.view
	      , slideDir = (direction === dir.LEFT || direction === dir.UP)
	          ? 'right'
	          : 'left';
	
	    if ( !date )
	      date = [ dir.LEFT, dir.RIGHT ].indexOf(direction) !== -1
	        ? this.nextDate(direction)
	        : this.state.currentDate
	
	    if (direction === dir.DOWN )
	      view = ALT_VIEW[view] || view
	
	    if (direction === dir.UP )
	      view = NEXT_VIEW[view] || view
	
	    if ( this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
	      this._focus(true, 'nav');
	
	      this.setState({
	        currentDate:    date,
	        slideDirection: slideDir,
	        view: view
	      })
	    }
	  },
	
	
	  _focus: function(focused, e){
	
	    if ( +this.props.tabIndex === -1)
	      return 
	
	    clearTimeout(this.timer)
	
	    this.timer = setTimeout(function() {
	
	      if(focused) 
	        this.getDOMNode().focus()
	
	      if( focused !== this.state.focused){
	        this.notify(focused ? 'onFocus' : 'onBlur', e)
	        this.setState({ focused: focused })
	      }
	    }.bind(this))
	  },
	
	  change: function(date){
	    setTimeout( function()  {return this._focus(true);}.bind(this))
	
	    if ( this.props.onChange && this.state.view === this.props.initialView)
	      return this.notify('onChange', date)
	
	    this.navigate(dir.DOWN, date)
	  },
	
	  nextDate: function(direction){
	    var method = direction === dir.LEFT ? 'subtract' : 'add'
	      , view   = this.state.view
	      , unit   = view === views.MONTH ? view : views.YEAR
	      , multi  = MULTIPLIER[view] || 1;
	
	    return dates[method](this.state.currentDate, 1 * multi, unit)
	  },
	
	  _keyDown: function(e){
	    var ctrl = e.ctrlKey
	      , key  = e.key;
	
	    if ( ctrl ) {
	      if ( key === 'ArrowDown' ) {
	        e.preventDefault()
	        this.navigate(dir.DOWN)
	      }
	      if ( key === 'ArrowUp' ) {
	        e.preventDefault()
	        this.navigate(dir.UP)
	      }
	      if ( key === 'ArrowLeft' ) {
	        e.preventDefault()
	        this.navigate(dir.LEFT)
	      }
	      if ( key === 'ArrowRight' ) {
	        e.preventDefault()
	        this.navigate(dir.RIGHT)
	      }
	    } 
	    else {
	      this.refs.currentView._keyDown
	        && this.refs.currentView._keyDown(e)
	    }
	
	    this.notify('onKeyDown', [e])
	  },
	
	  _label: function() {
	    var view = this.state.view
	      , dt   = this.state.currentDate
	      , culture = this.props.culture;
	
	    if ( view === 'month')
	      return dates.format(dt, dates.formats.MONTH_YEAR, culture)
	
	    else if ( view === 'year')
	      return dates.format(dt, dates.formats.YEAR)
	
	    else if ( view === 'decade')
	      return dates.format(dates.firstOfDecade(dt),     dates.formats.YEAR, culture)
	        + ' - ' + dates.format(dates.lastOfDecade(dt), dates.formats.YEAR, culture)
	
	    else if ( view === 'century')
	      return dates.format(dates.firstOfCentury(dt),     dates.formats.YEAR, culture)
	        + ' - ' + dates.format(dates.lastOfCentury(dt), dates.formats.YEAR, culture)
	  },
	
	  inRangeValue: function(_value){
	    var value = dateOrNull(_value)
	
	    if( value === null)
	      return value
	
	    return dates.max(
	        dates.min(value, this.props.max)
	      , this.props.min)
	  },
	
	  isValidView: function(next) {
	    var bottom  = VIEW_OPTIONS.indexOf(this.props.initialView)
	      , top     = VIEW_OPTIONS.indexOf(this.props.finalView)
	      , current = VIEW_OPTIONS.indexOf(next);
	
	    return current >= bottom && current <= top
	  }
	});
	
	function dateOrNull(dt){
	  if(dt && !isNaN(dt.getTime())) return dt
	  return null
	}
	
	module.exports = controlledInput.createControlledClass(
	    Calendar, { value: 'onChange' });
	
	module.exports.BaseCalendar = Calendar

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React  = __webpack_require__(1)
	  , cx     = __webpack_require__(138)
	  , _      = __webpack_require__(137) //pick, omit, has
	
	  , dates  = __webpack_require__(143)
	  , views  = __webpack_require__(144).calendarViews
	  , popups = __webpack_require__(144).datePopups
	
	  , Popup     = __webpack_require__(120)
	  , Calendar  = __webpack_require__(100).BaseCalendar
	  , Time      = __webpack_require__(130)
	  , DateInput = __webpack_require__(131)
	  , Btn       = __webpack_require__(123)
	  , CustomPropTypes = __webpack_require__(140)
	  , controlledInput = __webpack_require__(139);
	
	var viewEnum  = Object.keys(views).map( function(k)  {return views[k];} )
	
	var propTypes = {
	
	    //-- controlled props -----------
	    value:          React.PropTypes.instanceOf(Date),
	    onChange:       React.PropTypes.func,
	    open:           React.PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
	    onToggle:       React.PropTypes.func,
	    //------------------------------------
	
	    onSelect:       React.PropTypes.func,
	
	    min:            React.PropTypes.instanceOf(Date),
	    max:            React.PropTypes.instanceOf(Date),
	
	    culture:        React.PropTypes.string,
	    format:         React.PropTypes.string,
	    editFormat:     React.PropTypes.string,
	
	    calendar:       React.PropTypes.bool,
	    time:           React.PropTypes.bool,
	
	    timeComponent:  CustomPropTypes.elementType,
	    duration:       React.PropTypes.number, //popup
	
	    placeholder:    React.PropTypes.string,
	    name:           React.PropTypes.string,
	
	    initialView:    React.PropTypes.oneOf(viewEnum),
	    finalView:      React.PropTypes.oneOf(viewEnum),
	
	    disabled:       React.PropTypes.oneOfType([
	                        React.PropTypes.bool,
	                        React.PropTypes.oneOf(['disabled'])
	                      ]),
	
	    readOnly:       React.PropTypes.oneOfType([
	                      React.PropTypes.bool,
	                      React.PropTypes.oneOf(['readOnly'])
	                    ]),
	
	    parse:          React.PropTypes.oneOfType([
	                      React.PropTypes.arrayOf(React.PropTypes.string),
	                      React.PropTypes.string,
	                      React.PropTypes.func
	                    ]),
	  }
	
	var DateTimePicker = React.createClass({
	  displayName: 'DateTimePicker',
	
	  mixins: [
	    __webpack_require__(147),
	    __webpack_require__(148),
	    __webpack_require__(150),
	    __webpack_require__(151)
	  ],
	
	  propTypes: propTypes,
	
	  getInitialState: function(){
	    return {
	      focused: false,
	    }
	  },
	
	  getDefaultProps: function(){
	    var cal  = _.has(this.props, popups.CALENDAR) ? this.props.calendar : true
	      , time = _.has(this.props, popups.TIME) ? this.props.time : true
	      , both = cal && time
	      , neither = !cal && !time;
	
	    return {
	      value:            null,
	      format:           both || neither
	        ? 'M/d/yyyy h:mm tt'
	        : cal ? 'M/d/yyyy' : 'h:mm tt',
	      min:              new Date(1900,  0,  1),
	      max:              new Date(2099, 11, 31),
	      calendar:         true,
	      time:             true,
	      open:             false,
	      messages: {
	        calendarButton: 'Select Date',
	        timeButton:     'Select Time',
	        next:           'Next Date',
	      }
	    }
	  },
	
	  render: function(){
	    var $__0=     _.omit(this.props, Object.keys(propTypes)),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , calProps   = _.pick(this.props, Object.keys(Calendar.type.propTypes))
	      , timeListID = this._id('_time_listbox')
	      , timeOptID  = this._id('_time_option')
	      , dateListID = this._id('_cal')
	      , value = dateOrNull(this.props.value)
	      , owns;
	
	    if (dateListID && this.props.calendar ) owns = dateListID
	    if (timeListID && this.props.time )     owns += ' ' + timeListID
	
	    return (
	      React.createElement("div", React.__spread({},  props, 
	        {ref: "element", 
	        tabIndex: "-1", 
	        onKeyDown: this._maybeHandle(this._keyDown), 
	        onFocus: this._maybeHandle(this._focus.bind(null, true), true), 
	        onBlur: this._focus.bind(null, false), 
	        className: cx(className, {
	          'rw-datetimepicker':     true,
	          'rw-widget':          true,
	          'rw-open':            this.props.open,
	          'rw-state-focus':     this.state.focused,
	          'rw-state-disabled':  this.isDisabled(),
	          'rw-state-readonly':  this.isReadOnly(),
	          'rw-has-both':        this.props.calendar && this.props.time,
	          'rw-has-neither':     !this.props.calendar && !this.props.time,
	          'rw-rtl':             this.isRtl()
	        })}), 
	        React.createElement(DateInput, {ref: "valueInput", 
	          'aria-activedescendant':  this.props.open
	            ? this.props.open === popups.CALENDAR ? this._id('_cal_view_selected_item') : timeOptID
	            : undefined, 
	          'aria-expanded':  !!this.props.open, 
	          'aria-busy': !!this.props.busy, 
	          'aria-owns': owns, 
	          'aria-haspopup': true, 
	          placeholder: this.props.placeholder, 
	          name: this.props.name, 
	          disabled: this.isDisabled(), 
	          readOnly: this.isReadOnly(), 
	          role:  this.props.time ? 'combobox' : null, 
	          value: value, 
	          focused: this.state.focused, 
	          format: this.props.format, 
	          editFormat: this.props.editFormat, 
	          editing: this.state.focused, 
	          culture: this.props.culture, 
	          parse: this._parse, 
	          onChange: this._change}), 
	         (this.props.calendar || this.props.time) &&
	        React.createElement("span", {className: "rw-select"}, 
	           this.props.calendar &&
	            React.createElement(Btn, {tabIndex: "-1", 
	              className: "rw-btn-calendar", 
	              disabled: this.isDisabled() || this.isReadOnly(), 
	              'aria-disabled': this.isDisabled() || this.isReadOnly(), 
	              onClick: this._maybeHandle(this._click.bind(null, popups.CALENDAR))}, 
	              React.createElement("i", {className: "rw-i rw-i-calendar"}, React.createElement("span", {className: "rw-sr"},  this.props.messages.calendarButton))
	            ), 
	          
	           this.props.time &&
	            React.createElement(Btn, {tabIndex: "-1", 
	              className: "rw-btn-time", 
	              disabled: this.isDisabled() || this.isReadOnly(), 
	              'aria-disabled': this.isDisabled() || this.isReadOnly(), 
	              onClick: this._maybeHandle(this._click.bind(null, popups.TIME))}, 
	              React.createElement("i", {className: "rw-i rw-i-clock-o"}, React.createElement("span", {className: "rw-sr"},  this.props.messages.timeButton))
	            )
	          
	        ), 
	        
	        React.createElement(Popup, {
	          open:  this.props.open === popups.TIME, 
	          onRequestClose: this.close, 
	          duration: this.props.duration}, 
	            React.createElement("div", null, 
	              React.createElement(Time, {ref: "timePopup", 
	                id: timeListID, 
	                optID: timeOptID, 
	                'aria-hidden':  !this.props.open, 
	                style: { maxHeight: 200, height: 'auto'}, 
	                value: value, 
	                min: this.props.min, 
	                max: this.props.max, 
	                culture: this.props.culture, 
	                onMove: this._scrollTo, 
	                preserveDate: !!this.props.calendar, 
	                itemComponent: this.props.timeComponent, 
	                onSelect: this._maybeHandle(this._selectTime)})
	            )
	        ), 
	        React.createElement(Popup, {
	          className: "rw-calendar-popup", 
	          open:  this.props.open === popups.CALENDAR, 
	          duration: this.props.duration, 
	          onRequestClose: this.close}, 
	
	          React.createElement(Calendar, React.__spread({},  calProps , 
	            {ref: "calPopup", 
	            tabIndex: "-1", 
	            id: dateListID, 
	            value: value, 
	            'aria-hidden':  !this.props.open, 
	            onChange: this._maybeHandle(this._selectDate)}))
	        )
	      )
	    )
	  },
	
	  _change: function(date, str, constrain){
	    var change = this.props.onChange
	
	    if(constrain)
	      date = this.inRangeValue(date)
	
	    if( change ) {
	      if( date == null || this.props.value == null){
	        if( date != this.props.value )
	          change(date, str)
	      }
	      else if (!dates.eq(date, this.props.value))
	        change(date, str)
	    }
	  },
	
	  _keyDown: function(e){
	
	    if( e.key === 'Tab')
	      return
	
	    if ( e.key === 'Escape' && this.props.open )
	      this.close()
	
	    else if ( e.altKey ) {
	      e.preventDefault()
	
	      if ( e.key === 'ArrowDown')
	        this.open(this.props.open === popups.CALENDAR
	              ? popups.TIME
	              : popups.CALENDAR)
	      else if ( e.key === 'ArrowUp')
	        this.close()
	
	    } else if (this.props.open ) {
	      if( this.props.open === popups.CALENDAR )
	        this.refs.calPopup._keyDown(e)
	      if( this.props.open === popups.TIME )
	        this.refs.timePopup._keyDown(e)
	    }
	
	    this.notify('onKeyDown', [e])
	  },
	
	  //timeout prevents transitions from breaking focus
	  _focus: function(focused, e){
	    var input =  this.refs.valueInput;
	
	    clearTimeout(this.timer)
	
	    this.timer = setTimeout(function() {
	
	      if(focused) input.getDOMNode().focus()
	      else        this.close()
	
	      if( focused !== this.state.focused){
	        this.notify(focused ? 'onFocus' : 'onBlur', e)
	        this.setState({ focused: focused })
	      }
	    }.bind(this))
	  },
	
	  _selectDate: function(date){
	    var dateTime = dates.merge(date, this.props.value)
	      , dateStr  = formatDate(date, this.props.format, this.props.culture) 
	
	    this.close()
	    this.notify('onSelect', [dateTime, dateStr])
	    this._change(dateTime, dateStr, true)
	  },
	
	  _selectTime: function(datum){
	    var dateTime = dates.merge(this.props.value, datum.date)
	      , dateStr  = formatDate(datum.date, this.props.format, this.props.culture) 
	
	    this.close()
	    this.notify('onSelect', [dateTime, dateStr])
	    this._change(dateTime, dateStr, true)
	  },
	
	  _click: function(view, e){
	    this._focus(true)
	    this.toggle(view, e)
	  },
	
	  _parse: function(string){
	    var parser = typeof this.props.parse === 'function'
	          ? this.props.parse
	          : formatsParser.bind(null
	              , _.splat(this.props.format).concat(this.props.parse)
	              , this.props.culture);
	
	    return parser(string)
	  },
	
	  toggle: function(view, e) {
	
	    this.props.open
	      ? this.state.view !== view
	          ? this.open(view)
	          : this.close(view)
	      : this.open(view)
	  },
	
	  open: function(view){
	    if ( this.props.open !== view && this.props[view] === true )
	      this.notify('onToggle', view)
	  },
	
	  close: function(){
	    if ( this.props.open )
	      this.notify('onToggle', false)
	  },
	
	  inRangeValue: function(value){
	    if( value == null) return value
	
	    return dates.max(
	        dates.min(value, this.props.max)
	      , this.props.min)
	  },
	
	});
	
	
	module.exports = controlledInput.createControlledClass(
	    DateTimePicker
	  , { open: 'onToggle', value: 'onChange' });
	
	function formatDate(date, format, culture){
	  var val = ''
	
	  if ( (date instanceof Date) && !isNaN(date.getTime()) )
	    val = dates.format(date, format, culture)
	
	  return val;
	}
	
	
	
	function formatsParser(formats, culture, str){
	  var date;
	
	  formats = [].concat(formats)
	
	  for(var i=0; i < formats.length; i++ ){
	    date = dates.parse(str, formats[i], culture)
	    if( date) return date
	  }
	  return null
	}
	
	function dateOrNull(dt){
	  if(dt && !isNaN(dt.getTime())) return dt
	  return null
	}
	
	module.exports.BaseDateTimePicker = DateTimePicker

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , cx    = __webpack_require__(138)
	  , _     = __webpack_require__(137) //omit
	  , controlledInput  = __webpack_require__(139)
	  , directions = __webpack_require__(144).directions
	  , Input = __webpack_require__(132);
	
	var Btn = __webpack_require__(123)
	  , propTypes = {
	
	      // -- controlled props -----------
	      value:          React.PropTypes.number,
	      onChange:       React.PropTypes.func,
	      //------------------------------------
	
	      min:            React.PropTypes.number,
	      max:            React.PropTypes.number,
	      step:           React.PropTypes.number,
	
	      culture:        React.PropTypes.string,
	      format:         React.PropTypes.string,
	
	      name:           React.PropTypes.string,
	
	      parse:          React.PropTypes.oneOfType([
	                        React.PropTypes.arrayOf(React.PropTypes.string),
	                        React.PropTypes.string,
	                        React.PropTypes.func
	                      ]),
	
	      disabled:       React.PropTypes.oneOfType([
	                        React.PropTypes.bool,
	                        React.PropTypes.oneOf(['disabled'])
	                      ]),
	
	      readOnly:       React.PropTypes.oneOfType([
	                        React.PropTypes.bool,
	                        React.PropTypes.oneOf(['readOnly'])
	                      ]),
	
	      messages:       React.PropTypes.shape({
	        increment:    React.PropTypes.string,
	        decrement:    React.PropTypes.string
	      })
	    };
	
	var NumberPicker = React.createClass({
	
	  displayName: 'NumberPicker',
	
	  mixins: [
	    __webpack_require__(147),
	    __webpack_require__(148),
	    __webpack_require__(151),
	  ],
	
	  propTypes: propTypes,
	
	  getDefaultProps: function(){
	    return {
	      value: null,
	      open: false,
	
	      format: 'd',
	
	      min: -Infinity,
	      max:  Infinity,
	      step: 1,
	
	      messages: {
	        increment: 'increment value',
	        decrement:  'decrement value'
	      }
	    }
	  },
	
	  getInitialState: function(){
	    return {
	      focused: false,
	      active: false,
	    }
	  },
	
	
	  render: function(){
	    var $__0=
	        
	       
	       
	       
	          _.omit(this.props, Object.keys(propTypes)),className=$__0.className,onKeyDown=$__0.onKeyDown,onKeyPress=$__0.onKeyPress,onKeyUp=$__0.onKeyUp,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,onKeyDown:1,onKeyPress:1,onKeyUp:1})
	      , val = this.inRangeValue(this.props.value)
	
	    return (
	      React.createElement("div", React.__spread({},  props , 
	        {ref: "element", 
	        onKeyDown: this._maybeHandle(this._keyDown), 
	        onFocus: this._maybeHandle(this._focus.bind(null, true), true), 
	        onBlur: this._focus.bind(null, false), 
	        tabIndex: "-1", 
	        className: cx(className, {
	          'rw-numberpicker':   true,
	          'rw-widget':          true,
	          'rw-state-focus':     this.state.focused,
	          'rw-state-disabled':  this.props.disabled,
	          'rw-state-readonly':  this.props.readOnly,
	          'rw-rtl':             this.isRtl()
	        })}), 
	
	        React.createElement("span", {className: "rw-select"}, 
	          React.createElement(Btn, {
	            tabIndex: "-1", 
	            className: cx({ 'rw-state-active': this.state.active === directions.UP}), 
	            onMouseDown: this._maybeHandle(this._mouseDown.bind(null, directions.UP)), 
	            onMouseUp: this._maybeHandle(this._mouseUp.bind(null, directions.UP)), 
	            onClick: this._maybeHandle(this._focus.bind(null, true)), 
	            disabled: val === this.props.max || this.props.disabled, 
	            'aria-disabled': val === this.props.max || this.props.disabled}, 
	
	            React.createElement("i", {className: "rw-i rw-i-caret-up"}, React.createElement("span", {className: "rw-sr"},  this.props.messages.increment))
	          ), 
	          React.createElement(Btn, {
	            tabIndex: "-1", 
	            className: cx({ 'rw-state-active': this.state.active === directions.DOWN}), 
	            onMouseDown: this._maybeHandle(this._mouseDown.bind(null, directions.DOWN)), 
	            onMouseUp: this._maybeHandle(this._mouseUp.bind(null, directions.DOWN)), 
	            onClick: this._maybeHandle(this._focus.bind(null, true)), 
	            disabled: val === this.props.min || this.props.disabled, 
	            'aria-disabled': val === this.props.min || this.props.disabled}, 
	            React.createElement("i", {className: "rw-i rw-i-caret-down"}, React.createElement("span", {className: "rw-sr"},  this.props.messages.decrement))
	          )
	        ), 
	        React.createElement(Input, {
	          ref: "input", 
	          value: val, 
	          editing: this.state.focused, 
	          format: this.props.format, 
	          name: this.props.name, 
	          role: "spinbutton", 
	          min: this.props.min, 
	          'aria-valuenow': val, 
	          'aria-valuemin': isFinite(this.props.min) ? this.props.min : null, 
	          'aria-valuemax': isFinite(this.props.max) ? this.props.max : null, 
	          'aria-disabled':  this.props.disabled, 
	          'aria-readonly':  this.props.readonly, 
	          disabled: this.props.disabled, 
	          readOnly: this.props.readOnly, 
	          onChange: this.change, 
	          onKeyDown: onKeyDown, 
	          onKeyPress: onKeyPress, 
	          onKeyUp: onKeyUp})
	      )
	    )
	  },
	
	  //allow for styling, focus stealing keeping me from the normal what have you
	  _mouseDown: function(dir) {
	    var val = dir === directions.UP
	        ? (this.props.value || 0) + this.props.step
	        : (this.props.value || 0) - this.props.step
	
	    val = this.inRangeValue(val)
	
	    this.setState({ active: dir })
	    this.change(val);
	
	    if( !((dir === directions.UP && val === this.props.max)
	      || (dir === directions.DOWN && val === this.props.min)))
	    {
	      if(!this.interval)
	        this.interval = setInterval(this._mouseDown, 500, dir)
	    }
	    else
	      this._mouseUp()
	  },
	
	  _mouseUp: function(direction, e ){
	    this.setState({ active: false })
	    clearInterval(this.interval)
	    this.interval = null;
	  },
	
	  _focus: function(focused, e){
	    clearTimeout(this.timer)
	
	    this.timer = setTimeout(function() {
	      var el = this.refs.input.getDOMNode()
	
	      focused && el.focus()
	
	      if( focused !== this.state.focused){
	        this.notify(focused ? 'onFocus' : 'onBlur', e)
	        this.setState({ focused: focused })
	      }
	
	    }.bind(this), 0)
	  },
	
	  _keyDown: function(e){
	    var key = e.key;
	
	    if ( key === 'End'  && isFinite(this.props.max))
	      this.change(this.props.max)
	
	    else if ( key === 'Home' && isFinite(this.props.min))
	      this.change(this.props.min)
	
	    else if ( key === 'ArrowDown' ){
	      e.preventDefault()
	      this.decrement()
	    }
	    else if ( key === 'ArrowUp' ){
	      e.preventDefault()
	      this.increment()
	    }
	  },
	
	  increment: function() {
	    this.change(this.inRangeValue((this.props.value || 0) + this.props.step))
	  },
	
	  decrement: function(){
	    this.change(this.inRangeValue((this.props.value || 0) - this.props.step))
	  },
	
	  change: function(val){
	    val = this.inRangeValue(val === '' ? null : val)
	
	    if ( this.props.value !== val )
	      this.notify('onChange', val)
	  },
	
	  inRangeValue: function(value){
	    var max = this.props.max == null ? Infinity : this.props.max
	      , min = this.props.min == null ? -Infinity : this.props.min;
	
	    if( !isFinite(min) && value == null )
	      return value
	
	    return Math.max(Math.min(value, max), min)
	  }
	
	})
	
	module.exports = controlledInput.createControlledClass(
	    NumberPicker, { value: 'onChange' });
	
	module.exports.BaseNumberPicker = NumberPicker

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React           = __webpack_require__(1)
	  , cx              = __webpack_require__(138)
	  , _               = __webpack_require__(137)
	  , SelectInput     = __webpack_require__(133)
	  , TagList         = __webpack_require__(134)
	  , Popup           = __webpack_require__(120)
	  , PlainList       = __webpack_require__(121)
	  , GroupableList   = __webpack_require__(122)
	  , validateList    = __webpack_require__(141)
	  , controlledInput = __webpack_require__(139)
	  , CustomPropTypes = __webpack_require__(140);
	
	var propTypes = {
	      data:            React.PropTypes.array,
	      //-- controlled props --
	      value:           React.PropTypes.array,
	      onChange:        React.PropTypes.func,
	
	      searchTerm:      React.PropTypes.string,
	      onSearch:        React.PropTypes.func,
	
	      open:            React.PropTypes.bool,
	      onToggle:        React.PropTypes.func,
	      //-------------------------------------------
	
	      valueField:      React.PropTypes.string,
	      textField:       React.PropTypes.string,
	
	      tagComponent:    CustomPropTypes.elementType,
	      itemComponent:   CustomPropTypes.elementType,
	      listComponent:   CustomPropTypes.elementType,
	
	      groupComponent:  CustomPropTypes.elementType,
	      groupBy:         React.PropTypes.oneOfType([
	                         React.PropTypes.func,
	                         React.PropTypes.string
	                       ]),
	
	      onSelect:        React.PropTypes.func,
	      onCreate:        React.PropTypes.func,
	
	      duration:        React.PropTypes.number, //popup
	
	      placeholder:     React.PropTypes.string,
	
	      disabled:        React.PropTypes.oneOfType([
	                         React.PropTypes.bool,
	                         React.PropTypes.array,
	                         React.PropTypes.oneOf(['disabled'])
	                      ]),
	
	      readOnly:        React.PropTypes.oneOfType([
	                         React.PropTypes.bool,
	                         React.PropTypes.array,
	                         React.PropTypes.oneOf(['readonly'])
	                       ]),
	
	      messages:        React.PropTypes.shape({
	        open:          React.PropTypes.string,
	        emptyList:     React.PropTypes.string,
	        emptyFilter:   React.PropTypes.string
	      })
	    };
	
	var Select = React.createClass({
	
	  displayName: 'Select',
	
	  mixins: [
	    __webpack_require__(147),
	    __webpack_require__(153),
	    __webpack_require__(149),
	    __webpack_require__(150),
	    __webpack_require__(151)
	  ],
	
	  propTypes: propTypes,
	
	  getDefaultProps: function(){
	    return {
	      data: [],
	      filter: 'startsWith',
	      value: [],
	      open: false,
	      searchTerm: '',
	      messages: {
	        createNew:   "(create new tag)",
	        emptyList:   "There are no items in this list",
	        emptyFilter: "The filter returned no results"
	      }
	    }
	  },
	
	  getInitialState: function(){
	    var dataItems = _.splat(this.props.value).map( function(item)  {return this._dataItem(this.props.data, item);}.bind(this)) 
	      , data = this.process(this.props.data, dataItems, this.props.searchTerm)
	
	    return {
	      focusedItem:   data[0],
	      processedData: data,
	      dataItems:     dataItems
	    }
	  },
	
	  componentDidMount: function() {
	    validateList(this.refs.list)
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    var values = _.splat(nextProps.value)
	      , current = this.state.focusedItem
	      , items  = this.process(nextProps.data, values, nextProps.searchTerm)
	
	    this.setState({
	      processedData: items,
	      focusedItem: items.indexOf(current) === -1 ? items[0]: current,
	      dataItems: values.map( function(item)  {return this._dataItem(nextProps.data, item);}.bind(this))
	    })
	  },
	
	  render: function(){
	    var $__0= 
	        
	       
	          _.omit(this.props, Object.keys(propTypes)),className=$__0.className,children=$__0.children,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,children:1})
	      , listID = this._id('_listbox')
	      , optID  = this._id('_option')
	      , items  = this._data()
	      , values = this.state.dataItems
	      , List   = this.props.listComponent || (this.props.groupBy && GroupableList) || PlainList;
	
	    return (
	      React.createElement("div", React.__spread({},  props, 
	        {ref: "element", 
	        onKeyDown: this._maybeHandle(this._keyDown), 
	        onFocus: this._maybeHandle(this._focus.bind(null, true), true), 
	        onBlur: this._focus.bind(null, false), 
	        tabIndex: "-1", 
	        className: cx(className, {
	          'rw-multiselect':    true,
	          'rw-widget':         true,
	          'rw-state-focus':    this.state.focused,
	          'rw-state-disabled': this.props.disabled === true,
	          'rw-state-readonly': this.props.readOnly === true,
	          'rw-open':           this.props.open,
	          'rw-rtl':            this.isRtl()
	        })}), 
	        React.createElement("div", {className: "rw-multiselect-wrapper", onClick: this._maybeHandle(this._click)}, 
	           this.props.busy &&
	            React.createElement("i", {className: "rw-i rw-loading"}), 
	          
	           !!values.length &&
	            React.createElement(TagList, {
	              ref: "tagList", 
	              value: values, 
	              textField: this.props.textField, 
	              valueField: this.props.valueField, 
	              valueComponent: this.props.tagComponent, 
	              disabled: this.props.disabled, 
	              readOnly: this.props.readOnly, 
	              onDelete: this._delete}), 
	          
	          React.createElement(SelectInput, {
	            ref: "input", 
	            'aria-activedescendent':  this.props.open ? optID : undefined, 
	            'aria-expanded':  this.props.open, 
	            'aria-busy': !!this.props.busy, 
	            'aria-owns': listID, 
	            'aria-haspopup': true, 
	            value: this.props.searchTerm, 
	            disabled: this.props.disabled === true, 
	            readOnly: this.props.readOnly === true, 
	            placeholder: this._placeholder(), 
	            onKeyDown: this._searchKeyDown, 
	            onKeyUp: this._searchgKeyUp, 
	            onChange: this._typing})
	        ), 
	        React.createElement(Popup, {open: this.props.open, onRequestClose: this.close, duration: this.props.duration}, 
	          React.createElement("div", null, 
	            React.createElement(List, React.__spread({ref: "list"}, 
	              _.pick(this.props, Object.keys(List.type.propTypes)), 
	              {id: listID, 
	              optID: optID, 
	              'aria-autocomplete': "list", 
	              'aria-hidden': !this.props.open, 
	              data: items, 
	              focused: this.state.focusedItem, 
	              onSelect: this._maybeHandle(this._onSelect), 
	              onMove: this._scrollTo, 
	              messages: {
	                emptyList: this.props.data.length
	                  ? this.props.messages.emptyFilter
	                  : this.props.messages.emptyList
	              }})), 
	               this._shouldShowCreate() &&
	                React.createElement("ul", {className: "rw-list rw-multiselect-create-tag"}, 
	                  React.createElement("li", {onClick: this._onCreate.bind(null, this.props.searchTerm), 
	                      className: cx({
	                        'rw-list-option': true,
	                        'rw-state-focus': !this._data().length || this.state.focusedItem === null 
	                      })}, 
	                    React.createElement("strong", null, ("\"" + this.props.searchTerm + "\"")), " ",  this.props.messages.createNew
	                  )
	                )
	              
	          )
	        )
	      )
	    )
	  },
	
	  _data:function(){
	    return this.state.processedData
	  },
	
	  _delete:function(value){
	    this._focus(true)
	    this.change(
	      this.state.dataItems.filter( function(d)  {return d !== value;}))
	  },
	
	  _click:function(e){
	    this._focus(true)
	    !this.props.open && this.open()
	  },
	
	  _focus:function(focused, e){
	    if (this.props.disabled === true )
	      return
	
	    clearTimeout(this.timer)
	
	    this.timer = setTimeout(function()  {
	      if(focused) this.refs.input.focus()
	      else        {
	        this.close()
	        this.refs.tagList && this.refs.tagList.clear()
	      }
	      
	      if( focused !== this.state.focused){
	        this.notify(focused ? 'onFocus' : 'onBlur', e)
	        this.setState({ focused: focused })
	      }
	    }.bind(this))
	  },
	
	  _searchKeyDown:function(e){ 
	    if (e.key === 'Backspace' && e.target.value && !this._deletingText)
	      this._deletingText = true
	  },
	
	  _searchgKeyUp:function(e){ 
	    if (e.key === 'Backspace' && this._deletingText) 
	      this._deletingText = false
	  },
	
	  _typing: function(e){
	    this.notify('onSearch', [ e.target.value ])
	    this.open()
	  },
	
	  _onSelect: function(data){
	
	    if( data === undefined && this.props.onCreate )
	      return this._onCreate(this.props.searchTerm)
	
	    this.notify('onSelect', data)
	    this.change(this.state.dataItems.concat(data))
	    this.close()
	    this._focus(true)
	  },
	
	  _onCreate: function(tag){
	    if (tag.trim() === '' ) 
	      return
	
	    this.notify('onCreate', tag)
	    this.close()
	    this._focus(true)
	  },
	
	  _keyDown: function(e){
	    var key = e.key
	      , alt = e.altKey
	      , ctrl = e.ctrlKey
	      , noSearch = !this.props.searchTerm && !this._deletingText
	      , isOpen  = this.props.open
	      , focusedItem = this.state.focusedItem
	      , tagList = this.refs.tagList
	      , list    = this.refs.list;
	
	    if ( key === 'ArrowDown') {
	      var next = list.next('focused')
	        , creating = (this._shouldShowCreate() && focusedItem === next) || focusedItem === null;
	        
	      next = creating ? null : list.next(focusedItem)
	
	      e.preventDefault()
	      if ( isOpen ) this.setState({ focusedItem: next })
	      else          this.open()
	    }
	    else if ( key === 'ArrowUp') {
	      var prev = focusedItem === null 
	        ? list.last() 
	        : list.prev(focusedItem)
	
	      e.preventDefault()
	
	      if ( alt)          this.close()
	      else if ( isOpen ) this.setState({ focusedItem: prev })
	    }
	    else if ( key === 'End'){
	      if ( isOpen ) this.setState({ focusedItem: list.last() })
	      else          tagList && tagList.last()
	    }
	    else if (  key === 'Home'){
	      if ( isOpen ) this.setState({ focusedItem: list.first() })
	      else          tagList && tagList.first()
	    }
	    else if ( isOpen && key === 'Enter' )
	      ctrl && this.props.onCreate
	        ? this._onCreate(this.props.searchTerm)
	        : this._onSelect(this.state.focusedItem)
	
	    else if ( key === 'Escape')
	      isOpen ? this.close() : this.refs.tagList.clear()
	
	    else if ( noSearch && key === 'ArrowLeft')
	     tagList && tagList.prev()
	
	    else if ( noSearch && key === 'ArrowRight')
	      tagList && tagList.next()
	
	    else if ( noSearch && key === 'Delete')
	      tagList && tagList.removeCurrent()
	
	    else if ( noSearch && key === 'Backspace')
	      tagList && tagList.removeNext()
	
	    this.notify('onKeyDown', [e])
	  },
	
	  change: function(data){
	    this.notify('onChange', [data])
	  },
	
	  open: function(){
	    if (!(this.props.disabled === true || this.props.readOnly === true))
	      this.notify('onToggle', true)
	  },
	
	  close: function(){
	    this.notify('onToggle', false)
	  },
	
	  toggle: function(e){
	    this.props.open
	      ? this.close()
	      : this.open()
	  },
	
	  process: function(data, values, searchTerm){
	    var items = data.filter( function(i)  {return !values.some( this._valueMatcher.bind(null, i), this);}.bind(this), this)
	
	    if( searchTerm)
	      items = this.filter(items, searchTerm)
	
	    return items
	  },
	
	  _shouldShowCreate:function(){
	    var text = this.props.searchTerm;
	
	    if ( !(this.props.onCreate && text) ) 
	      return false
	
	    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
	    return !this._data().some( function(v)  {return this._dataText(v) === text;}.bind(this)) 
	        && !this.state.dataItems.some( function(v)  {return this._dataText(v) === text;}.bind(this)) 
	  },
	
	  _placeholder: function(){
	    return (this.props.value || []).length
	      ? ''
	      : (this.props.placeholder || '')
	  }
	
	})
	
	
	module.exports = controlledInput.createControlledClass(Select
	    , { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' }
	    , { onChange: defaultChange, onCreate: defaultChange });
	
	
	function defaultChange(){
	  if ( this.props.searchTerm === undefined )
	    this.setState({ searchTerm: '' })
	}
	
	module.exports.BaseMultiselect = Select

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , _  = __webpack_require__(137)
	  , cx = __webpack_require__(138)
	  , controlledInput  = __webpack_require__(139)
	  , CustomPropTypes  = __webpack_require__(140)
	  , PlainList        = __webpack_require__(121)
	  , GroupableList = __webpack_require__(122)
	  , validateList    = __webpack_require__(141)
	  , scrollTo  = __webpack_require__(145);
	
	var propTypes = {
	
	    data:           React.PropTypes.array,
	    value:          React.PropTypes.oneOfType([
	                      React.PropTypes.any,
	                      React.PropTypes.array
	                    ]),
	    onChange:       React.PropTypes.func,
	    onMove:         React.PropTypes.func,
	
	    multiple:       React.PropTypes.bool,
	
	    itemComponent:  CustomPropTypes.elementType,
	    listComponent:  CustomPropTypes.elementType,
	
	    valueField:     React.PropTypes.string,
	    textField:      React.PropTypes.string,
	
	    busy:           React.PropTypes.bool,
	
	    delay:          React.PropTypes.number, 
	
	    disabled:       React.PropTypes.oneOfType([
	                      React.PropTypes.array,
	                      React.PropTypes.bool,
	                      React.PropTypes.oneOf(['disabled'])
	                    ]),
	
	    readOnly:       React.PropTypes.oneOfType([
	                      React.PropTypes.bool,
	                      React.PropTypes.array,
	                      React.PropTypes.oneOf(['readonly'])
	                    ]),
	
	    messages:       React.PropTypes.shape({
	      emptyList:    React.PropTypes.string
	    }),
	  }
	
	
	var SelectList = React.createClass({displayName: 'SelectList',
	
	  propTypes: propTypes,
	
	  mixins: [
	    __webpack_require__(147),
	    __webpack_require__(152),
	    __webpack_require__(149),
	    __webpack_require__(151)
	  ],
	
	  getDefaultProps:function(){
	    return {
	      delay: 250,
	      value: [],
	      data:  [],
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    }
	  },
	
	  getDefaultState:function(props){
	    var isRadio = !props.multiple
	      , values  = _.splat(props.value)
	      , first   = isRadio && this._dataItem(props.data, values[0]) 
	
	    first = isRadio && first 
	      ? first
	      : ((this.state || {}).focusedItem || null)
	
	    return {
	      focusedItem: first,
	      dataItems:   !isRadio && values.map(function(item)  {return this._dataItem(props.data, item);}.bind(this))
	    }
	  },
	
	  getInitialState:function(){
	    var state = this.getDefaultState(this.props)
	    
	    state.ListItem = getListItem(this)
	
	    return state
	  },
	
	  componentWillReceiveProps:function(nextProps) {
	    return this.setState(this.getDefaultState(nextProps))
	  },
	
	  componentDidMount: function() {
	    validateList(this.refs.list)
	  },
	
	  render:function() {
	    var $__0=     _.omit(this.props, Object.keys(propTypes)),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , focus = this._maybeHandle(this._focus.bind(null, true), true)
	      , optID = this._id('_selected_option')
	      , blur  = this._focus.bind(null, false)
	      , List  = this.props.listComponent || (this.props.groupBy && GroupableList) || PlainList
	      , focusedItem = this.state.focused 
	                    && !this.isDisabled() 
	                    && !this.isReadOnly() 
	                    && this.state.focusedItem;
	
	    return (
	      
	      React.createElement("div", React.__spread({},  props, 
	        {onKeyDown: this._maybeHandle(this._keyDown), 
	        onFocus: focus, 
	        onBlur: blur, 
	        tabIndex: "0", 
	        role: "listbox", 
	        'aria-busy': !!this.props.busy, 
	        'aria-activedescendent':  this.state.focused ? optID : undefined, 
	        'aria-disabled':  this.isDisabled(), 
	        'aria-readonly':  this.isReadOnly(), 
	        className: cx(className, { 
	          'rw-widget':         true,
	          'rw-selectlist':     true,
	          'rw-state-focus':    this.state.focused,
	          'rw-state-disabled': this.isDisabled(),
	          'rw-state-readonly': this.isReadOnly(),
	          'rw-rtl':            this.isRtl(),
	          'rw-loading-mask':   this.props.busy
	        })}), 
	        React.createElement(List, {ref: "list", 
	          data: this._data(), 
	          focused: focusedItem, 
	          optID: optID, 
	          itemComponent: this.state.ListItem, 
	          onMove:  this._scrollTo})
	      ) 
	    );
	  },
	
	  _scrollTo:function(selected, list) {
	    var handler = this.props.onMove; 
	
	    if ( handler ) 
	      handler(selected, list)
	    else {
	      this._scrollCancel && this._scrollCancel()
	      // default behavior is to scroll the whole page not just the widget
	      this._scrollCancel = scrollTo(selected) 
	    }
	  },
	
	  _keyDown: function(e){
	    var self = this
	      , key = e.key
	      , multiple = !!this.props.multiple
	      , list = this.refs.list
	      , focusedItem = this.state.focusedItem;
	
	    if ( key === 'End' ) {
	      e.preventDefault()
	
	      if ( multiple ) this.setState({ focusedItem: move('prev', null) })
	      else            change(move('prev', null)) 
	    }
	    else if ( key === 'Home' ) {
	      e.preventDefault()
	
	      if ( multiple ) this.setState({ focusedItem: move('next', null) })
	      else            change(move('next', null)) 
	    }
	    else if ( key === 'Enter' || key === ' ' ) {
	      e.preventDefault()
	      change(focusedItem)
	    }
	    else if ( key === 'ArrowDown' || key === 'ArrowRight' ) {
	      e.preventDefault()
	
	      if ( multiple ) this.setState({ focusedItem: move('next', focusedItem) })
	      else            change(move('next', focusedItem))
	    }
	    else if ( key === 'ArrowUp' || key === 'ArrowLeft'  ) {
	      e.preventDefault()
	
	      if ( multiple ) this.setState({ focusedItem: move('prev', focusedItem) })
	      else            change(move('prev', focusedItem))
	    }
	    else if (this.props.multiple && e.keyCode === 65 && e.ctrlKey ) {
	      e.preventDefault()
	      this._selectAll() 
	    }
	    else
	      this.search(
	          String.fromCharCode(e.keyCode)
	        , this._locate)
	
	    function change(item, cked){
	      if( item ){
	        self._change(item, multiple 
	            ? !self._contains(item, self._values()) // toggle value
	            : true)
	      }    
	    }
	
	    function move(dir, item){
	      var stop = dir === 'next' ? list.last() : list.first()
	        , next = list[dir](item);
	      
	      while( next !== stop && self.isDisabledItem(next) ) 
	        next = list[dir](next)
	
	      return self.isDisabledItem(next) ? item : next
	    }
	  },
	
	  _selectAll: function(){
	    var values = this.state.dataItems
	      , disabled = this.props.disabled || this.props.readOnly
	      , data = this._data()
	      , blacklist;
	
	    disabled = Array.isArray(disabled) ? disabled : [];
	    //disabled values that are not selected
	    blacklist = disabled.filter( function(v)  {return !this._contains(v, values);}.bind(this))
	    data      = data.filter( function(v)  {return !this._contains(v, blacklist);}.bind(this))
	
	    if ( data.length === values.length) {
	      data = disabled.filter( function(v)  {return this._contains(v, values);}.bind(this))
	      data = data.map( function(v)  {return this._dataItem(this._data(), v);}.bind(this))
	    }
	
	    this.notify('onChange', [data])
	  },
	
	  _change: function(item, checked){
	    var multiple  = !!this.props.multiple
	      , blacklist = this.props.disabled || this.props.readOnly 
	      , values    = this.state.dataItems;
	
	    blacklist = Array.isArray(blacklist) ? blacklist : [];
	
	    //if(this._contains(item, blacklist)) return 
	
	    if ( !multiple )
	      return this.notify('onChange', checked ? item : null)
	
	    values = checked 
	      ? values.concat(item)
	      : values.filter( function(v)  {return v !== item;})
	
	    this.notify('onChange', [values || []])
	  },
	
	  _focus: function(focused, e){
	    var self = this;
	
	    clearTimeout(self.timer)
	
	    self.timer = setTimeout(function(){
	      if( focused) self.getDOMNode().focus()
	      if( focused !== self.state.focused){
	        self.setState({ focused: focused })
	        //!focused && self.next(0)
	      }
	    }, 0)
	  },
	
	  isDisabledItem: function(item) {
	    return this.isDisabled() || this._contains(item, this.props.disabled)
	  },
	
	  isReadOnlyItem: function(item) {
	    return this.isReadOnly() || this._contains(item, this.props.readOnly)
	  },
	
	  _locate: function(word){
	    var idx = this.findNextWordIndex(word, this.state.focusedIndex);
	
	    if ( idx !== -1) 
	      this.setFocusedIndex(idx)
	  },
	
	  _data:function(){
	    return this.props.data
	  },
	
	  _contains: function(item, values){
	    return Array.isArray(values) 
	      ? values.some(this._valueMatcher.bind(null, item))
	      : this._valueMatcher(item, values)
	  },
	
	  _values: function(){
	    return !!this.props.multiple 
	      ? this.state.dataItems
	      : this.props.value
	  }
	
	});
	
	function getListItem(parent){
	
	  return React.createClass({
	
	    render: function() {
	      var $__0=
	             this.props,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{})
	        , item      = this.props.item
	        , checked   = parent._contains(item, parent._values())
	        , change    = parent._change.bind(null, item)
	        , disabled  = parent.isDisabledItem(item)
	        , readonly  = parent.isReadOnlyItem(item)
	        , Component = parent.props.itemComponent
	        , name      = parent.props.name || parent._id('_name');
	
	      return (
	        React.createElement("label", {
	          className: cx({ 
	            'rw-state-disabled': disabled,
	            'rw-state-readonly': readonly
	          })}, 
	          React.createElement("input", React.__spread({},   props, 
	            {tabIndex: "-1", 
	            name: name, 
	            type: parent.props.multiple ? 'checkbox' : 'radio', 
	            
	            onChange: onChange, 
	            checked: checked, 
	            disabled: disabled || readonly, 
	            'aria-disabled': disabled || readonly})), 
	             Component 
	                ? React.createElement(Component, {item: item}) 
	                : parent._dataText(item)
	            
	        )
	      );
	
	      function onChange(e){
	        if( !disabled && !readonly)
	          change(e.target.checked)
	      }
	    }
	  })
	}
	
	module.exports = SelectList;
	
	module.exports = controlledInput.createControlledClass(
	    SelectList, { value: 'onChange' });
	
	module.exports.BaseSelectList = SelectList

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A streamlined version of TransitionGroup built for managing at most two active children
	 * also provides additional hooks for animation start/end
	 * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
	 * relevent code is licensed accordingly 
	 */
	
	"use strict";
	
	var React = __webpack_require__(1)
	  , $     = __webpack_require__(146)
	  , _     = __webpack_require__(137);
	
	module.exports = React.createClass({
	
	  displayName: 'ReplaceTransitionGroup',
	
	  propTypes: {
	    component:    React.PropTypes.oneOfType([
	                    React.PropTypes.element,
	                    React.PropTypes.string
	                  ]),
	    childFactory: React.PropTypes.func,
	
	    onAnimating:  React.PropTypes.func,
	    onAnimate:    React.PropTypes.func,
	  },
	
	  getDefaultProps: function() {
	    return {
	      component:    'span',
	      childFactory: function(a){ return a },
	
	      onAnimating: _.noop,
	      onAnimate:   _.noop
	    };
	  },
	
	  getInitialState: function() {
	    return {
	      children: _.splat(this.props.children)
	    };
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    var nextChild = getChild(nextProps.children)
	      , stack     = this.state.children.slice()
	      , next      = stack[1]
	      , last      = stack[0];
	
	    var isLastChild = last && key(last) === key(nextChild)
	      , isNextChild = next && key(next) === key(nextChild);
	
	    //no children
	    if (!last) {
	      stack.push(nextChild)
	      this.entering = nextChild
	    }
	    else if ( last && !next && !isLastChild) {
	      //new child
	      stack.push(nextChild)
	      this.leaving = last 
	      this.entering = nextChild
	    }
	    else if ( last && next && !isLastChild && !isNextChild) {
	      // the child is not the current one, exit the current one, add the new one
	      //  - shift the stack down
	      stack.shift()
	      stack.push(nextChild)
	      this.leaving  = next
	      this.entering = nextChild
	    }
	    //new child that just needs to be re-rendered
	    else if (isLastChild) stack.splice(0, 1, nextChild) 
	    else if (isNextChild) stack.splice(1, 1, nextChild)
	
	    if( this.state.children[0] !== stack[0] || this.state.children[1] !== stack[1] ) 
	      this.setState({ children: stack });
	  },
	
	  componentWillMount: function() {
	    this.animatingKeys = {};
	    this.leaving  = null;
	    this.entering = null;
	  },
	
	  componentDidUpdate: function() {
	    var entering = this.entering
	      , leaving  = this.leaving
	      , first    = this.refs[key(entering) || key(leaving)]
	      , node     = this.getDOMNode()
	      , el       = first && first.getDOMNode();
	
	    if( el )
	      $.css(node, {
	        overflow: 'hidden',
	        height: $.height(el) + 'px',
	        width:  $.width(el) + 'px'
	      })
	    
	    this.props.onAnimating();
	
	    this.entering = null;
	    this.leaving  = null;
	
	    if (entering) this.performEnter(key(entering))
	    if (leaving)  this.performLeave(key(leaving))
	  },
	
	  performEnter: function(key) {
	    var component = this.refs[key];
	
	    if(!component) return
	
	    this.animatingKeys[key] = true;
	
	    if (component.componentWillEnter) 
	      component.componentWillEnter(
	        this._handleDoneEntering.bind(this, key));
	    else 
	      this._handleDoneEntering(key);
	  },
	
	  _tryFinish: function(){
	    var node = this.getDOMNode()
	
	    if ( this.isTransitioning() )
	      return 
	
	    $.css(node, { overflow: 'visible', height: '', width: '' })
	
	    this.props.onAnimate() 
	  }, 
	
	  _handleDoneEntering: function(enterkey) {
	    var component = this.refs[enterkey];
	
	    if (component && component.componentDidEnter) 
	      component.componentDidEnter();
	    
	    delete this.animatingKeys[enterkey];
	
	    if ( key(this.props.children) !== enterkey) 
	      this.performLeave(enterkey); // This was removed before it had fully entered. Remove it.
	    
	    this._tryFinish()
	  },
	
	  isTransitioning: function(){
	    return Object.keys(this.animatingKeys).length !== 0
	  },
	
	  performLeave: function(key) {
	    var component = this.refs[key];
	
	    if(!component) return
	
	    this.animatingKeys[key] = true;
	
	    if (component.componentWillLeave) 
	      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
	    else 
	      this._handleDoneLeaving(key);
	  },
	
	  _handleDoneLeaving: function(leavekey) {
	    var component = this.refs[leavekey];
	
	    if (component && component.componentDidLeave) 
	      component.componentDidLeave();
	    
	    delete this.animatingKeys[leavekey];
	
	    if (key(this.props.children) === leavekey )
	      this.performEnter(leavekey); // This entered again before it fully left. Add it again.
	    else {
	      var newChildren = this.state.children.filter( function(c)  {return key(c) !== leavekey;});
	      this.setState({ children: newChildren });
	    }
	
	    this._tryFinish() 
	  },
	
	  render: function() {
	    var Component = this.props.component
	    return React.createElement(Component, React.__spread({},  this.props),  this.state.children.map(function(c)  {return this.props.childFactory(c, key(c));}.bind(this)) );
	  }
	});
	
	function getChild(children){
	  return React.Children.only(children)
	}
	
	//CHANGE 0.12.0
	function key(child){
	  return child && child.key
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React   = __webpack_require__(1)
	  , ReplaceTransitionGroup  = __webpack_require__(105)
	  , _ = __webpack_require__(137)
	  , $  =  __webpack_require__(146);
	
	
	var SlideChildGroup = React.createClass({displayName: 'SlideChildGroup',
	
	  propTypes: {
	    direction: React.PropTypes.oneOf(['left', 'right'])
	  },
	
	  componentWillEnter: function(done) {
	    var node  = this.getDOMNode()
	      , width = $.width(node)
	      , direction = this.props.direction;
	
	    width = direction === 'left' ? width : -width
	
	    this.ORGINAL_POSITION = node.style.position;
	    
	    $.css(node, { position: 'absolute', left: width + 'px' , top: 0 })
	
	    $.animate(node, { left: 0 }, this.props.duration, function()  {
	
	        $.css(node, { 
	          position:  this.ORGINAL_POSITION, 
	          overflow: 'hidden'
	        });
	
	        this.ORGINAL_POSITION = null
	        done && done()
	      }.bind(this))
	  },
	
	  componentWillLeave: function(done) {
	    var node  = this.getDOMNode()
	      , width = $.width(node)
	      , direction = this.props.direction;
	
	    width = direction === 'left' ? -width : width
	
	    this.ORGINAL_POSITION = node.style.position
	
	    $.css(node, { position: 'absolute', top: 0, left: 0})
	
	    $.animate(node, { left: width + 'px' }, this.props.duration, function()  {
	        $.css(node, { 
	          position: this.ORGINAL_POSITION, 
	          overflow: 'hidden'
	        });
	
	        this.ORGINAL_POSITION = null
	        done && done()
	      }.bind(this))
	  },
	
	  render: function() {
	    return React.Children.only(this.props.children);
	  }
	
	})
	
	
	module.exports = React.createClass({displayName: 'exports',
	
	  propTypes: {
	    direction: React.PropTypes.oneOf(['left', 'right']),
	    duration:  React.PropTypes.number
	  },
	
	  getDefaultProps: function(){
	    return {
	      direction: 'left',
	      duration: 250
	    }
	  },
	
	  _wrapChild: function(child, ref) {
	    return (React.createElement(SlideChildGroup, {key: child.key, ref: ref, direction: this.props.direction, duration: this.props.duration}, child))
	  },
	
	  render: function() {
	    var $__0=      this.props,style=$__0.style,children=$__0.children,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{style:1,children:1})
	
	    style = _.merge(style, { position: 'relative', overflow: 'hidden' })
	
	    return (
	      React.createElement(ReplaceTransitionGroup, React.__spread({},  
	        props, 
	        {ref: "container", 
	        childFactory: this._wrapChild, 
	        style: style, 
	        component: 'div'}), 
	        children 
	      ))
	  },
	
	  isTransitioning: function(){
	    return this.isMounted() && this.refs.container.isTransitioning()
	  }
	});
	


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * This file contains a modified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/EventListener.js
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * TODO: remove in favour of solution provided by:
	 *  https://github.com/facebook/react/issues/285
	 */
	
	/**
	 * Does not take into account specific nature of platform.
	 */
	var EventListener = {
	  /**
	   * Listen to DOM events during the bubble phase.
	   *
	   * @param {DOMEventTarget} target DOM element to register listener on.
	   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
	   * @param {function} callback Callback function.
	   * @return {object} Object with a `remove` method.
	   */
	  listen: function(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false);
	      return {
	        remove: function() {
	          target.removeEventListener(eventType, callback, false);
	        }
	      };
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback);
	      return {
	        remove: function() {
	          target.detachEvent('on' + eventType, callback);
	        }
	      };
	    }
	  }
	};
	
	module.exports = EventListener;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains a modified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/addons/transitions/ReactTransitionEvents.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */
	
	var canUseDOM = !!(
	  typeof window !== 'undefined' &&
	    window.document &&
	    window.document.createElement
	  );
	
	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },
	
	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};
	
	var endEvents = [];
	
	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;
	
	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }
	
	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }
	
	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}
	
	if (canUseDOM) {
	  detectEvents();
	}
	
	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.
	
	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}
	
	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}
	
	var ReactTransitionEvents = {
	  addEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },
	
	  removeEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};
	
	module.exports = ReactTransitionEvents;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  CLASSES: {
	    'alert': 'alert',
	    'button': 'btn',
	    'button-group': 'btn-group',
	    'button-toolbar': 'btn-toolbar',
	    'column': 'col',
	    'input-group': 'input-group',
	    'form': 'form',
	    'glyphicon': 'glyphicon',
	    'label': 'label',
	    'list-group-item': 'list-group-item',
	    'panel': 'panel',
	    'panel-group': 'panel-group',
	    'progress-bar': 'progress-bar',
	    'nav': 'nav',
	    'navbar': 'navbar',
	    'modal': 'modal',
	    'row': 'row',
	    'well': 'well'
	  },
	  STYLES: {
	    'default': 'default',
	    'primary': 'primary',
	    'success': 'success',
	    'info': 'info',
	    'warning': 'warning',
	    'danger': 'danger',
	    'link': 'link',
	    'inline': 'inline',
	    'tabs': 'tabs',
	    'pills': 'pills'
	  },
	  SIZES: {
	    'large': 'lg',
	    'medium': 'md',
	    'small': 'sm',
	    'xsmall': 'xs'
	  },
	  GLYPHS: [
	    'asterisk',
	    'plus',
	    'euro',
	    'minus',
	    'cloud',
	    'envelope',
	    'pencil',
	    'glass',
	    'music',
	    'search',
	    'heart',
	    'star',
	    'star-empty',
	    'user',
	    'film',
	    'th-large',
	    'th',
	    'th-list',
	    'ok',
	    'remove',
	    'zoom-in',
	    'zoom-out',
	    'off',
	    'signal',
	    'cog',
	    'trash',
	    'home',
	    'file',
	    'time',
	    'road',
	    'download-alt',
	    'download',
	    'upload',
	    'inbox',
	    'play-circle',
	    'repeat',
	    'refresh',
	    'list-alt',
	    'lock',
	    'flag',
	    'headphones',
	    'volume-off',
	    'volume-down',
	    'volume-up',
	    'qrcode',
	    'barcode',
	    'tag',
	    'tags',
	    'book',
	    'bookmark',
	    'print',
	    'camera',
	    'font',
	    'bold',
	    'italic',
	    'text-height',
	    'text-width',
	    'align-left',
	    'align-center',
	    'align-right',
	    'align-justify',
	    'list',
	    'indent-left',
	    'indent-right',
	    'facetime-video',
	    'picture',
	    'map-marker',
	    'adjust',
	    'tint',
	    'edit',
	    'share',
	    'check',
	    'move',
	    'step-backward',
	    'fast-backward',
	    'backward',
	    'play',
	    'pause',
	    'stop',
	    'forward',
	    'fast-forward',
	    'step-forward',
	    'eject',
	    'chevron-left',
	    'chevron-right',
	    'plus-sign',
	    'minus-sign',
	    'remove-sign',
	    'ok-sign',
	    'question-sign',
	    'info-sign',
	    'screenshot',
	    'remove-circle',
	    'ok-circle',
	    'ban-circle',
	    'arrow-left',
	    'arrow-right',
	    'arrow-up',
	    'arrow-down',
	    'share-alt',
	    'resize-full',
	    'resize-small',
	    'exclamation-sign',
	    'gift',
	    'leaf',
	    'fire',
	    'eye-open',
	    'eye-close',
	    'warning-sign',
	    'plane',
	    'calendar',
	    'random',
	    'comment',
	    'magnet',
	    'chevron-up',
	    'chevron-down',
	    'retweet',
	    'shopping-cart',
	    'folder-close',
	    'folder-open',
	    'resize-vertical',
	    'resize-horizontal',
	    'hdd',
	    'bullhorn',
	    'bell',
	    'certificate',
	    'thumbs-up',
	    'thumbs-down',
	    'hand-right',
	    'hand-left',
	    'hand-up',
	    'hand-down',
	    'circle-arrow-right',
	    'circle-arrow-left',
	    'circle-arrow-up',
	    'circle-arrow-down',
	    'globe',
	    'wrench',
	    'tasks',
	    'filter',
	    'briefcase',
	    'fullscreen',
	    'dashboard',
	    'paperclip',
	    'heart-empty',
	    'link',
	    'phone',
	    'pushpin',
	    'usd',
	    'gbp',
	    'sort',
	    'sort-by-alphabet',
	    'sort-by-alphabet-alt',
	    'sort-by-order',
	    'sort-by-order-alt',
	    'sort-by-attributes',
	    'sort-by-attributes-alt',
	    'unchecked',
	    'expand',
	    'collapse-down',
	    'collapse-up',
	    'log-in',
	    'flash',
	    'log-out',
	    'new-window',
	    'record',
	    'save',
	    'open',
	    'saved',
	    'import',
	    'export',
	    'send',
	    'floppy-disk',
	    'floppy-saved',
	    'floppy-remove',
	    'floppy-save',
	    'floppy-open',
	    'credit-card',
	    'transfer',
	    'cutlery',
	    'header',
	    'compressed',
	    'earphone',
	    'phone-alt',
	    'tower',
	    'stats',
	    'sd-video',
	    'hd-video',
	    'subtitles',
	    'sound-stereo',
	    'sound-dolby',
	    'sound-5-1',
	    'sound-6-1',
	    'sound-7-1',
	    'copyright-mark',
	    'registration-mark',
	    'cloud-download',
	    'cloud-upload',
	    'tree-conifer',
	    'tree-deciduous'
	  ]
	};


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains an unmodified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/vendor/stubs/Object.assign.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */
	
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
	
	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }
	
	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }
	
	    var from = Object(nextSource);
	
	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.
	
	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }
	
	  return to;
	};
	
	module.exports = assign;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var invariant = __webpack_require__(117);
	var canUseDOM = __webpack_require__(118).canUseDOM;
	
	/**
	 * Returns the current scroll position of the window as { x, y }.
	 */
	function getWindowScrollPosition() {
	  invariant(
	    canUseDOM,
	    'Cannot get current scroll position without a DOM'
	  );
	
	  return {
	    x: window.pageXOffset || document.documentElement.scrollLeft,
	    y: window.pageYOffset || document.documentElement.scrollTop
	  };
	}
	
	module.exports = getWindowScrollPosition;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	function reversedArray(array) {
	  return array.slice(0).reverse();
	}
	
	module.exports = reversedArray;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var Promise = __webpack_require__(163);
	
	// TODO: Use process.env.NODE_ENV check + envify to enable
	// when's promise monitor here when in dev.
	
	module.exports = Promise;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule cx
	 */
	
	/**
	 * This function is used to mark string literals representing CSS class names
	 * so that they can be transformed statically. This allows for modularization
	 * and minification of CSS class names.
	 *
	 * In static_upstream, this function is actually implemented, but it should
	 * eventually be replaced with something more descriptive, and the transform
	 * that is used in the main stack should be ported for use elsewhere.
	 *
	 * @param string|object className to modularize, or an object of key/values.
	 *                      In the object case, the values are conditions that
	 *                      determine if the className keys should be included.
	 * @param [string ...]  Variable list of classNames in the string case.
	 * @return string       Renderable space-separated CSS className.
	 */
	function cx(classNames) {
	  if (typeof classNames == 'object') {
	    return Object.keys(classNames).filter(function(className) {
	      return classNames[className];
	    }).join(' ');
	  } else {
	    return Array.prototype.join.call(arguments, ' ');
	  }
	}
	
	module.exports = cx;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Object.assign
	 */
	
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign
	
	function assign(target, sources) {
	  if (target == null) {
	    throw new TypeError('Object.assign target cannot be null or undefined');
	  }
	
	  var to = Object(target);
	  var hasOwnProperty = Object.prototype.hasOwnProperty;
	
	  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	    var nextSource = arguments[nextIndex];
	    if (nextSource == null) {
	      continue;
	    }
	
	    var from = Object(nextSource);
	
	    // We don't currently support accessors nor proxies. Therefore this
	    // copy cannot throw. If we ever supported this then we must handle
	    // exceptions and side-effects. We don't support symbols so they won't
	    // be transferred.
	
	    for (var key in from) {
	      if (hasOwnProperty.call(from, key)) {
	        to[key] = from[key];
	      }
	    }
	  }
	
	  return to;
	};
	
	module.exports = assign;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */
	
	"use strict";
	
	var emptyFunction = __webpack_require__(154);
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = emptyFunction;
	
	if (true) {
	  warning = function(condition, format ) {var args=Array.prototype.slice.call(arguments,2);
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      console.warn('Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];}));
	    }
	  };
	}
	
	module.exports = warning;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
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
	  if (true) {
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


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */
	
	/*jslint evil: true */
	
	"use strict";
	
	var canUseDOM = !!(
	  typeof window !== 'undefined' &&
	  window.document &&
	  window.document.createElement
	);
	
	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {
	
	  canUseDOM: canUseDOM,
	
	  canUseWorkers: typeof Worker !== 'undefined',
	
	  canUseEventListeners:
	    canUseDOM && !!(window.addEventListener || window.attachEvent),
	
	  canUseViewport: canUseDOM && !!window.screen,
	
	  isInWorker: !canUseDOM // For now, this is true - might change in the future.
	
	};
	
	module.exports = ExecutionEnvironment;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(Buffer) {//  Chance.js 0.7.1
	//  http://chancejs.com
	//  (c) 2013 Victor Quinn
	//  Chance may be freely distributed or modified under the MIT license.
	
	(function () {
	
	    // Constants
	    var MAX_INT = 9007199254740992;
	    var MIN_INT = -MAX_INT;
	    var NUMBERS = '0123456789';
	    var CHARS_LOWER = 'abcdefghijklmnopqrstuvwxyz';
	    var CHARS_UPPER = CHARS_LOWER.toUpperCase();
	    var HEX_POOL  = NUMBERS + "abcdef";
	
	    // Cached array helpers
	    var slice = Array.prototype.slice;
	
	    // Constructor
	    function Chance (seed) {
	        if (!(this instanceof Chance)) {
	            return new Chance(seed);
	        }
	
	        // if user has provided a function, use that as the generator
	        if (typeof seed === 'function') {
	            this.random = seed;
	            return this;
	        }
	
	        var seedling;
	        
	        if (arguments.length) {
	            // set a starting value of zero so we can add to it
	            this.seed = 0;
	        }
	        // otherwise, leave this.seed blank so that MT will recieve a blank
	
	        for (var i = 0; i < arguments.length; i++) {
	            seedling = 0;
	            if (typeof arguments[i] === 'string') {
	                for (var j = 0; j < arguments[i].length; j++) {
	                    seedling += (arguments[i].length - j) * arguments[i].charCodeAt(j);
	                }
	            } else {
	                seedling = arguments[i];
	            }
	            this.seed += (arguments.length - i) * seedling;
	        }
	
	        // If no generator function was provided, use our MT
	        this.mt = this.mersenne_twister(this.seed);
	        this.random = function () {
	            return this.mt.random(this.seed);
	        };
	
	        return this;
	    }
	
	    Chance.prototype.VERSION = "0.7.1";
	
	    // Random helper functions
	    function initOptions(options, defaults) {
	        options || (options = {});
	
	        if (defaults) {
	            for (var i in defaults) {
	                if (typeof options[i] === 'undefined') {
	                    options[i] = defaults[i];
	                }
	            }
	        }
	
	        return options;
	    }
	
	    function testRange(test, errorMessage) {
	        if (test) {
	            throw new RangeError(errorMessage);
	        }
	    }
	
	    /**
	     * Encode the input string with Base64.
	     * @param input
	     */
	    var base64 = function(input) {
	        throw new Error('No Base64 encoder available.');
	    };
	
	    // Select proper Base64 encoder.
	    (function determineBase64Encoder() {
	        if (typeof btoa === 'function') {
	            base64 = btoa;
	        } else if (typeof Buffer === 'function') {
	            base64 = function(input) {
	                return new Buffer(input).toString('base64');
	            };
	        }
	    })();
	
	    // -- Basics --
	
	    Chance.prototype.bool = function (options) {
	
	        // likelihood of success (true)
	        options = initOptions(options, {likelihood : 50});
	
	        testRange(
	            options.likelihood < 0 || options.likelihood > 100,
	            "Chance: Likelihood accepts values from 0 to 100."
	        );
	
	        return this.random() * 100 < options.likelihood;
	    };
	
	    Chance.prototype.character = function (options) {
	        options = initOptions(options);
	
	        var symbols = "!@#$%^&*()[]",
	            letters, pool;
	
	        testRange(
	            options.alpha && options.symbols,
	            "Chance: Cannot specify both alpha and symbols."
	        );
	
	
	        if (options.casing === 'lower') {
	            letters = CHARS_LOWER;
	        } else if (options.casing === 'upper') {
	            letters = CHARS_UPPER;
	        } else {
	            letters = CHARS_LOWER + CHARS_UPPER;
	        }
	
	        if (options.pool) {
	            pool = options.pool;
	        } else if (options.alpha) {
	            pool = letters;
	        } else if (options.symbols) {
	            pool = symbols;
	        } else {
	            pool = letters + NUMBERS + symbols;
	        }
	
	        return pool.charAt(this.natural({max: (pool.length - 1)}));
	    };
	
	    // Note, wanted to use "float" or "double" but those are both JS reserved words.
	
	    // Note, fixed means N OR LESS digits after the decimal. This because
	    // It could be 14.9000 but in JavaScript, when this is cast as a number,
	    // the trailing zeroes are dropped. Left to the consumer if trailing zeroes are
	    // needed
	    Chance.prototype.floating = function (options) {
	        var num;
	
	        options = initOptions(options, {fixed : 4});
	        var fixed = Math.pow(10, options.fixed);
	
	        testRange(
	            options.fixed && options.precision,
	            "Chance: Cannot specify both fixed and precision."
	        );
	
	        var max = MAX_INT / fixed;
	        var min = -max;
	
	        testRange(
	            options.min && options.fixed && options.min < min,
	            "Chance: Min specified is out of range with fixed. Min should be, at least, " + min
	        );
	        testRange(
	            options.max && options.fixed && options.max > max,
	            "Chance: Max specified is out of range with fixed. Max should be, at most, " + max
	        );
	
	        options = initOptions(options, {min : min, max : max});
	
	        // Todo - Make this work!
	        // options.precision = (typeof options.precision !== "undefined") ? options.precision : false;
	
	        num = this.integer({min: options.min * fixed, max: options.max * fixed});
	        var num_fixed = (num / fixed).toFixed(options.fixed);
	
	        return parseFloat(num_fixed);
	    };
	
	    // NOTE the max and min are INCLUDED in the range. So:
	    //
	    // chance.natural({min: 1, max: 3});
	    //
	    // would return either 1, 2, or 3.
	
	    Chance.prototype.integer = function (options) {
	
	        // 9007199254740992 (2^53) is the max integer number in JavaScript
	        // See: http://vq.io/132sa2j
	        options = initOptions(options, {min: MIN_INT, max: MAX_INT});
	
	        testRange(options.min > options.max, "Chance: Min cannot be greater than Max.");
	
	        return Math.floor(this.random() * (options.max - options.min + 1) + options.min);
	    };
	
	    Chance.prototype.natural = function (options) {
	        options = initOptions(options, {min: 0, max: MAX_INT});
	        return this.integer(options);
	    };
	
	    Chance.prototype.string = function (options) {
	        options = initOptions(options);
	
	        var length = options.length || this.natural({min: 5, max: 20}),
	            pool = options.pool,
	            text = this.n(this.character, length, {pool: pool});
	
	        return text.join("");
	    };
	
	    // -- End Basics --
	
	    // -- Helpers --
	
	    Chance.prototype.capitalize = function (word) {
	        return word.charAt(0).toUpperCase() + word.substr(1);
	    };
	
	    Chance.prototype.mixin = function (obj) {
	        for (var func_name in obj) {
	            Chance.prototype[func_name] = obj[func_name];
	        }
	        return this;
	    };
	
	    // Given a function that generates something random and a number of items to generate,
	    // return an array of items where none repeat.
	    Chance.prototype.unique = function(fn, num, options) {
	        options = initOptions(options, {
	            // Default comparator to check that val is not already in arr.
	            // Should return `false` if item not in array, `true` otherwise
	            comparator: function(arr, val) {
	                return arr.indexOf(val) !== -1;
	            }
	        });
	
	        var arr = [], count = 0, result, MAX_DUPLICATES = num * 50, params = slice.call(arguments, 2);
	
	        while (arr.length < num) {
	            result = fn.apply(this, params);
	            if (!options.comparator(arr, result)) {
	                arr.push(result);
	                // reset count when unique found
	                count = 0;
	            }
	
	            if (++count > MAX_DUPLICATES) {
	                throw new RangeError("Chance: num is likely too large for sample set");
	            }
	        }
	        return arr;
	    };
	
	    /**
	     *  Gives an array of n random terms
	     *  @param fn the function that generates something random
	     *  @param n number of terms to generate
	     *  @param options options for the function fn. 
	     *  There can be more parameters after these. All additional parameters are provided to the given function
	     */
	    Chance.prototype.n = function(fn, n, options) {
	        var i = n || 1, arr = [], params = slice.call(arguments, 2);
	        // Providing a negative count should result in a noop.
	        i = Math.max( 0, i );
	
	        for (null; i--; null) {
	            arr.push(fn.apply(this, params));
	        }
	
	        return arr;
	    };
	
	    // H/T to SO for this one: http://vq.io/OtUrZ5
	    Chance.prototype.pad = function (number, width, pad) {
	        // Default pad to 0 if none provided
	        pad = pad || '0';
	        // Convert number to a string
	        number = number + '';
	        return number.length >= width ? number : new Array(width - number.length + 1).join(pad) + number;
	    };
	
	    Chance.prototype.pick = function (arr, count) {
	        if (arr.length === 0) {
	            throw new RangeError("Chance: Cannot pick() from an empty array");
	        }
	        if (!count || count === 1) {
	            return arr[this.natural({max: arr.length - 1})];
	        } else {
	            return this.shuffle(arr).slice(0, count);
	        }
	    };
	
	    Chance.prototype.shuffle = function (arr) {
	        var old_array = arr.slice(0),
	            new_array = [],
	            j = 0,
	            length = Number(old_array.length);
	
	        for (var i = 0; i < length; i++) {
	            // Pick a random index from the array
	            j = this.natural({max: old_array.length - 1});
	            // Add it to the new array
	            new_array[i] = old_array[j];
	            // Remove that element from the original array
	            old_array.splice(j, 1);
	        }
	
	        return new_array;
	    };
	
	    // Returns a single item from an array with relative weighting of odds
	    Chance.prototype.weighted = function(arr, weights) {
	        if (arr.length !== weights.length) {
	            throw new RangeError("Chance: length of array and weights must match");
	        }
	
	        // If any of the weights are less than 1, we want to scale them up to whole
	        //   numbers for the rest of this logic to work
	        if (weights.some(function(weight) { return weight < 1; })) {
	            var min = weights.reduce(function(min, weight) {
	                return (weight < min) ? weight : min;
	            }, weights[0]);
	
	            var scaling_factor = 1 / min;
	
	            weights = weights.map(function(weight) {
	                return weight * scaling_factor;
	            });
	        }
	
	        var sum = weights.reduce(function(total, weight) {
	            return total + weight;
	        }, 0);
	
	        // get an index
	        var selected = this.natural({ min: 1, max: sum });
	
	        var total = 0;
	        var chosen;
	        // Using some() here so we can bail as soon as we get our match
	        weights.some(function(weight, index) {
	            if (selected <= total + weight) {
	                chosen = arr[index];
	                return true;
	            }
	            total += weight;
	            return false;
	        });
	
	        return chosen;
	    };
	
	    // -- End Helpers --
	
	    // -- Text --
	
	    Chance.prototype.paragraph = function (options) {
	        options = initOptions(options);
	
	        var sentences = options.sentences || this.natural({min: 3, max: 7}),
	            sentence_array = this.n(this.sentence, sentences);
	
	        return sentence_array.join(' ');
	    };
	
	    // Could get smarter about this than generating random words and
	    // chaining them together. Such as: http://vq.io/1a5ceOh
	    Chance.prototype.sentence = function (options) {
	        options = initOptions(options);
	
	        var words = options.words || this.natural({min: 12, max: 18}),
	            text, word_array = this.n(this.word, words);
	
	        text = word_array.join(' ');
	
	        // Capitalize first letter of sentence, add period at end
	        text = this.capitalize(text) + '.';
	
	        return text;
	    };
	
	    Chance.prototype.syllable = function (options) {
	        options = initOptions(options);
	
	        var length = options.length || this.natural({min: 2, max: 3}),
	            consonants = 'bcdfghjklmnprstvwz', // consonants except hard to speak ones
	            vowels = 'aeiou', // vowels
	            all = consonants + vowels, // all
	            text = '',
	            chr;
	
	        // I'm sure there's a more elegant way to do this, but this works
	        // decently well.
	        for (var i = 0; i < length; i++) {
	            if (i === 0) {
	                // First character can be anything
	                chr = this.character({pool: all});
	            } else if (consonants.indexOf(chr) === -1) {
	                // Last character was a vowel, now we want a consonant
	                chr = this.character({pool: consonants});
	            } else {
	                // Last character was a consonant, now we want a vowel
	                chr = this.character({pool: vowels});
	            }
	
	            text += chr;
	        }
	
	        return text;
	    };
	
	    Chance.prototype.word = function (options) {
	        options = initOptions(options);
	
	        testRange(
	            options.syllables && options.length,
	            "Chance: Cannot specify both syllables AND length."
	        );
	
	        var syllables = options.syllables || this.natural({min: 1, max: 3}),
	            text = '';
	
	        if (options.length) {
	            // Either bound word by length
	            do {
	                text += this.syllable();
	            } while (text.length < options.length);
	            text = text.substring(0, options.length);
	        } else {
	            // Or by number of syllables
	            for (var i = 0; i < syllables; i++) {
	                text += this.syllable();
	            }
	        }
	        return text;
	    };
	
	    // -- End Text --
	
	    // -- Person --
	
	    Chance.prototype.age = function (options) {
	        options = initOptions(options);
	        var ageRange;
	
	        switch (options.type) {
	            case 'child':
	                ageRange = {min: 1, max: 12};
	                break;
	            case 'teen':
	                ageRange = {min: 13, max: 19};
	                break;
	            case 'adult':
	                ageRange = {min: 18, max: 65};
	                break;
	            case 'senior':
	                ageRange = {min: 65, max: 100};
	                break;
	            case 'all':
	                ageRange = {min: 1, max: 100};
	                break;
	            default:
	                ageRange = {min: 18, max: 65};
	                break;
	        }
	
	        return this.natural(ageRange);
	    };
	
	    Chance.prototype.birthday = function (options) {
	        options = initOptions(options, {
	            year: (new Date().getFullYear() - this.age(options))
	        });
	
	        return this.date(options);
	    };
	
	    // CPF; ID to identify taxpayers in Brazil
	    Chance.prototype.cpf = function () {
	        var n = this.n(this.natural, 9, { max: 9 });
	        var d1 = n[8]*2+n[7]*3+n[6]*4+n[5]*5+n[4]*6+n[3]*7+n[2]*8+n[1]*9+n[0]*10;
	        d1 = 11 - (d1 % 11);
	        if (d1>=10) {
	            d1 = 0;
	        }
	        var d2 = d1*2+n[8]*3+n[7]*4+n[6]*5+n[5]*6+n[4]*7+n[3]*8+n[2]*9+n[1]*10+n[0]*11;
	        d2 = 11 - (d2 % 11);
	        if (d2>=10) {
	            d2 = 0;
	        }
	        return ''+n[0]+n[1]+n[2]+'.'+n[3]+n[4]+n[5]+'.'+n[6]+n[7]+n[8]+'-'+d1+d2;
	    };
	
	    Chance.prototype.first = function (options) {
	        options = initOptions(options, {gender: this.gender()});
	        return this.pick(this.get("firstNames")[options.gender.toLowerCase()]);
	    };
	
	    Chance.prototype.gender = function () {
	        return this.pick(['Male', 'Female']);
	    };
	
	    Chance.prototype.last = function () {
	        return this.pick(this.get("lastNames"));
	    };
	
	    Chance.prototype.name = function (options) {
	        options = initOptions(options);
	
	        var first = this.first(options),
	            last = this.last(),
	            name;
	
	        if (options.middle) {
	            name = first + ' ' + this.first(options) + ' ' + last;
	        } else if (options.middle_initial) {
	            name = first + ' ' + this.character({alpha: true, casing: 'upper'}) + '. ' + last;
	        } else {
	            name = first + ' ' + last;
	        }
	
	        if (options.prefix) {
	            name = this.prefix(options) + ' ' + name;
	        }
	
	        if (options.suffix) {
	            name = name + ' ' + this.suffix(options);
	        }
	
	        return name;
	    };
	
	    // Return the list of available name prefixes based on supplied gender.
	    Chance.prototype.name_prefixes = function (gender) {
	        gender = gender || "all";
	        gender = gender.toLowerCase();
	
	        var prefixes = [
	            { name: 'Doctor', abbreviation: 'Dr.' }
	        ];
	
	        if (gender === "male" || gender === "all") {
	            prefixes.push({ name: 'Mister', abbreviation: 'Mr.' });
	        }
	
	        if (gender === "female" || gender === "all") {
	            prefixes.push({ name: 'Miss', abbreviation: 'Miss' });
	            prefixes.push({ name: 'Misses', abbreviation: 'Mrs.' });
	        }
	
	        return prefixes;
	    };
	
	    // Alias for name_prefix
	    Chance.prototype.prefix = function (options) {
	        return this.name_prefix(options);
	    };
	
	    Chance.prototype.name_prefix = function (options) {
	        options = initOptions(options, { gender: "all" });
	        return options.full ?
	            this.pick(this.name_prefixes(options.gender)).name :
	            this.pick(this.name_prefixes(options.gender)).abbreviation;
	    };
	
	    Chance.prototype.ssn = function (options) {
	        options = initOptions(options, {ssnFour: false, dashes: true});
	        var ssn_pool = "1234567890",
	            ssn,
	            dash = options.dashes ? '-' : '';
	
	        if(!options.ssnFour) {
	            ssn = this.string({pool: ssn_pool, length: 3}) + dash +
	            this.string({pool: ssn_pool, length: 2}) + dash +
	            this.string({pool: ssn_pool, length: 4});
	        } else {
	            ssn = this.string({pool: ssn_pool, length: 4});
	        }
	        return ssn;
	    };
	
	    // Return the list of available name suffixes
	    Chance.prototype.name_suffixes = function () {
	        var suffixes = [
	            { name: 'Doctor of Osteopathic Medicine', abbreviation: 'D.O.' },
	            { name: 'Doctor of Philosophy', abbreviation: 'Ph.D.' },
	            { name: 'Esquire', abbreviation: 'Esq.' },
	            { name: 'Junior', abbreviation: 'Jr.' },
	            { name: 'Juris Doctor', abbreviation: 'J.D.' },
	            { name: 'Master of Arts', abbreviation: 'M.A.' },
	            { name: 'Master of Business Administration', abbreviation: 'M.B.A.' },
	            { name: 'Master of Science', abbreviation: 'M.S.' },
	            { name: 'Medical Doctor', abbreviation: 'M.D.' },
	            { name: 'Senior', abbreviation: 'Sr.' },
	            { name: 'The Third', abbreviation: 'III' },
	            { name: 'The Fourth', abbreviation: 'IV' }
	        ];
	        return suffixes;
	    };
	
	    // Alias for name_suffix
	    Chance.prototype.suffix = function (options) {
	        return this.name_suffix(options);
	    };
	
	    Chance.prototype.name_suffix = function (options) {
	        options = initOptions(options);
	        return options.full ?
	            this.pick(this.name_suffixes()).name :
	            this.pick(this.name_suffixes()).abbreviation;
	    };
	
	    // -- End Person --
	
	    // -- Mobile --
	    // Android GCM Registration ID
	    Chance.prototype.android_id = function (options) {
	        return "APA91" + this.string({ pool: "0123456789abcefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_", length: 178 });
	    };
	
	    // Apple Push Token
	    Chance.prototype.apple_token = function (options) {
	        return this.string({ pool: "abcdef1234567890", length: 64 });
	    };
	
	    // Windows Phone 8 ANID2
	    Chance.prototype.wp8_anid2 = function (options) {
	        return base64( this.hash( { length : 32 } ) );
	    };
	
	    // Windows Phone 7 ANID
	    Chance.prototype.wp7_anid = function (options) {
	        return 'A=' + this.guid().replace(/-/g, '').toUpperCase() + '&E=' + this.hash({ length:3 }) + '&W=' + this.integer({ min:0, max:9 });
	    };
	
	    // BlackBerry Device PIN
	    Chance.prototype.bb_pin = function (options) {
	        return this.hash({ length: 8 });
	    };
	
	    // -- End Mobile --
	
	    // -- Web --
	    Chance.prototype.color = function (options) {
	        function gray(value, delimiter) {
	            return [value, value, value].join(delimiter || '');
	        }
	
	        options = initOptions(options, {format: this.pick(['hex', 'shorthex', 'rgb', '0x']), grayscale: false, casing: 'lower'});
	        var isGrayscale = options.grayscale;
	        var colorValue;
	
	        if (options.format === 'hex') {
	            colorValue = '#' + (isGrayscale ? gray(this.hash({length: 2})) : this.hash({length: 6}));
	
	        } else if (options.format === 'shorthex') {
	            colorValue = '#' + (isGrayscale ? gray(this.hash({length: 1})) : this.hash({length: 3}));
	
	        } else if (options.format === 'rgb') {
	            if (isGrayscale) {
	                colorValue = 'rgb(' + gray(this.natural({max: 255}), ',') + ')';
	            } else {
	                colorValue = 'rgb(' + this.natural({max: 255}) + ',' + this.natural({max: 255}) + ',' + this.natural({max: 255}) + ')';
	            }
	        } else if (options.format === '0x') {
	            colorValue = '0x' + (isGrayscale ? gray(this.hash({length: 2})) : this.hash({length: 6}));
	        } else {
	            throw new Error('Invalid format provided. Please provide one of "hex", "shorthex", "rgb" or "0x".');
	        }
	
	        if (options.casing === 'upper' ) {
	            colorValue = colorValue.toUpperCase();
	        }
	
	        return colorValue;
	    };
	
	    Chance.prototype.domain = function (options) {
	        options = initOptions(options);
	        return this.word() + '.' + (options.tld || this.tld());
	    };
	
	    Chance.prototype.email = function (options) {
	        options = initOptions(options);
	        return this.word({length: options.length}) + '@' + (options.domain || this.domain());
	    };
	
	    Chance.prototype.fbid = function () {
	        return parseInt('10000' + this.natural({max: 100000000000}), 10);
	    };
	
	    Chance.prototype.google_analytics = function () {
	        var account = this.pad(this.natural({max: 999999}), 6);
	        var property = this.pad(this.natural({max: 99}), 2);
	
	        return 'UA-' + account + '-' + property;
	    };
	
	    Chance.prototype.hashtag = function () {
	        return '#' + this.word();
	    };
	
	    Chance.prototype.ip = function () {
	        // Todo: This could return some reserved IPs. See http://vq.io/137dgYy
	        // this should probably be updated to account for that rare as it may be
	        return this.natural({max: 255}) + '.' +
	               this.natural({max: 255}) + '.' +
	               this.natural({max: 255}) + '.' +
	               this.natural({max: 255});
	    };
	
	    Chance.prototype.ipv6 = function () {
	        var ip_addr = this.n(this.hash, 8, {length: 4});
	
	        return ip_addr.join(":");
	    };
	
	    Chance.prototype.klout = function () {
	        return this.natural({min: 1, max: 99});
	    };
	
	    Chance.prototype.tlds = function () {
	        return ['com', 'org', 'edu', 'gov', 'co.uk', 'net', 'io'];
	    };
	
	    Chance.prototype.tld = function () {
	        return this.pick(this.tlds());
	    };
	
	    Chance.prototype.twitter = function () {
	        return '@' + this.word();
	    };
	
	    Chance.prototype.url = function (options) {
	        options = initOptions(options, { protocol: "http", domain: this.domain(options), domain_prefix: "", path: this.word(), extensions: []});
	
	        var extension = options.extensions.length > 0 ? "." + this.pick(options.extensions) : "";
	        var domain = options.domain_prefix ? options.domain_prefix + "." + options.domain : options.domain;
	
	        return options.protocol + "://" + domain + "/" + options.path + extension;
	    };
	
	    // -- End Web --
	
	    // -- Location --
	
	    Chance.prototype.address = function (options) {
	        options = initOptions(options);
	        return this.natural({min: 5, max: 2000}) + ' ' + this.street(options);
	    };
	
	    Chance.prototype.altitude = function (options) {
	        options = initOptions(options, {fixed : 5, max: 8848});
	        return this.floating({min: 0, max: options.max, fixed: options.fixed});
	    };
	
	    Chance.prototype.areacode = function (options) {
	        options = initOptions(options, {parens : true});
	        // Don't want area codes to start with 1, or have a 9 as the second digit
	        var areacode = this.natural({min: 2, max: 9}).toString() +
	                this.natural({min: 0, max: 8}).toString() +
	                this.natural({min: 0, max: 9}).toString();
	
	        return options.parens ? '(' + areacode + ')' : areacode;
	    };
	
	    Chance.prototype.city = function () {
	        return this.capitalize(this.word({syllables: 3}));
	    };
	
	    Chance.prototype.coordinates = function (options) {
	        options = initOptions(options);
	        return this.latitude(options) + ', ' + this.longitude(options);
	    };
	
	    Chance.prototype.countries = function () {
	        return this.get("countries");
	    };
	
	    Chance.prototype.country = function (options) {
	        options = initOptions(options);
	        var country = this.pick(this.countries());
	        return options.full ? country.name : country.abbreviation;
	    };
	
	    Chance.prototype.depth = function (options) {
	        options = initOptions(options, {fixed: 5, min: -2550});
	        return this.floating({min: options.min, max: 0, fixed: options.fixed});
	    };
	
	    Chance.prototype.geohash = function (options) {
	        options = initOptions(options, { length: 7 });
	        return this.string({ length: options.length, pool: '0123456789bcdefghjkmnpqrstuvwxyz' });
	    };
	
	    Chance.prototype.geojson = function (options) {
	        options = initOptions(options);
	        return this.latitude(options) + ', ' + this.longitude(options) + ', ' + this.altitude(options);
	    };
	
	    Chance.prototype.latitude = function (options) {
	        options = initOptions(options, {fixed: 5, min: -90, max: 90});
	        return this.floating({min: options.min, max: options.max, fixed: options.fixed});
	    };
	
	    Chance.prototype.longitude = function (options) {
	        options = initOptions(options, {fixed: 5, min: -180, max: 180});
	        return this.floating({min: options.min, max: options.max, fixed: options.fixed});
	    };
	
	    Chance.prototype.phone = function (options) {
	        var self = this,
	            numPick,
	            ukNum = function (parts) {
	                var section = [];
	                //fills the section part of the phone number with random numbers.
	                parts.sections.forEach(function(n) {
	                    section.push(self.string({ pool: '0123456789', length: n}));
	                });
	                return parts.area + section.join(' ');
	            };
	        options = initOptions(options, {
	            formatted: true,
	            country: 'us',
	            mobile: false
	        });
	        if (!options.formatted) {
	            options.parens = false;
	        }
	        var phone;
	        switch (options.country) {
	            case 'fr':
	                if (!options.mobile) {
	                    numPick = this.pick([
	                        // Valid zone and département codes.
	                        '01' + this.pick(['30', '34', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '53', '55', '56', '58', '60', '64', '69', '70', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83']) + self.string({ pool: '0123456789', length: 6}),
	                        '02' + this.pick(['14', '18', '22', '23', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '40', '41', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '56', '57', '61', '62', '69', '72', '76', '77', '78', '85', '90', '96', '97', '98', '99']) + self.string({ pool: '0123456789', length: 6}),
	                        '03' + this.pick(['10', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '39', '44', '45', '51', '52', '54', '55', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90']) + self.string({ pool: '0123456789', length: 6}),
	                        '04' + this.pick(['11', '13', '15', '20', '22', '26', '27', '30', '32', '34', '37', '42', '43', '44', '50', '56', '57', '63', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '88', '89', '90', '91', '92', '93', '94', '95', '97', '98']) + self.string({ pool: '0123456789', length: 6}),
	                        '05' + this.pick(['08', '16', '17', '19', '24', '31', '32', '33', '34', '35', '40', '45', '46', '47', '49', '53', '55', '56', '57', '58', '59', '61', '62', '63', '64', '65', '67', '79', '81', '82', '86', '87', '90', '94']) + self.string({ pool: '0123456789', length: 6}),
	                        '09' + self.string({ pool: '0123456789', length: 8}),
	                    ]);
	                    phone = options.formatted ? numPick.match(/../g).join(' ') : numPick;
	                } else {
	                    numPick = this.pick(['06', '07']) + self.string({ pool: '0123456789', length: 8});
	                    phone = options.formatted ? numPick.match(/../g).join(' ') : numPick;
	                }
	                break;
	            case 'uk':
	                if (!options.mobile) {
	                    numPick = this.pick([
	                        //valid area codes of major cities/counties followed by random numbers in required format.
	                        { area: '01' + this.character({ pool: '234569' }) + '1 ', sections: [3,4] },
	                        { area: '020 ' + this.character({ pool: '378' }), sections: [3,4] },
	                        { area: '023 ' + this.character({ pool: '89' }), sections: [3,4] },
	                        { area: '024 7', sections: [3,4] },
	                        { area: '028 ' + this.pick(['25','28','37','71','82','90','92','95']), sections: [2,4] },
	                        { area: '012' + this.pick(['04','08','54','76','97','98']) + ' ', sections: [5] },
	                        { area: '013' + this.pick(['63','64','84','86']) + ' ', sections: [5] },
	                        { area: '014' + this.pick(['04','20','60','61','80','88']) + ' ', sections: [5] },
	                        { area: '015' + this.pick(['24','27','62','66']) + ' ', sections: [5] },
	                        { area: '016' + this.pick(['06','29','35','47','59','95']) + ' ', sections: [5] },
	                        { area: '017' + this.pick(['26','44','50','68']) + ' ', sections: [5] },
	                        { area: '018' + this.pick(['27','37','84','97']) + ' ', sections: [5] },
	                        { area: '019' + this.pick(['00','05','35','46','49','63','95']) + ' ', sections: [5] }
	                    ]);
	                    phone = options.formatted ? ukNum(numPick) : ukNum(numPick).replace(' ', '', 'g');
	                } else {
	                    numPick = this.pick([
	                        { area: '07' + this.pick(['4','5','7','8','9']), sections: [2,6] },
	                        { area: '07624 ', sections: [6] }
	                    ]);
	                    phone = options.formatted ? ukNum(numPick) : ukNum(numPick).replace(' ', '');
	                }
	                break;
	            case 'us':
	                var areacode = this.areacode(options).toString();
	                var exchange = this.natural({ min: 2, max: 9 }).toString() +
	                    this.natural({ min: 0, max: 9 }).toString() +
	                    this.natural({ min: 0, max: 9 }).toString();
	                var subscriber = this.natural({ min: 1000, max: 9999 }).toString(); // this could be random [0-9]{4}
	                phone = options.formatted ? areacode + ' ' + exchange + '-' + subscriber : areacode + exchange + subscriber;
	        }
	        return phone;
	    };
	
	    Chance.prototype.postal = function () {
	        // Postal District
	        var pd = this.character({pool: "XVTSRPNKLMHJGECBA"});
	        // Forward Sortation Area (FSA)
	        var fsa = pd + this.natural({max: 9}) + this.character({alpha: true, casing: "upper"});
	        // Local Delivery Unut (LDU)
	        var ldu = this.natural({max: 9}) + this.character({alpha: true, casing: "upper"}) + this.natural({max: 9});
	
	        return fsa + " " + ldu;
	    };
	
	    Chance.prototype.provinces = function () {
	        return this.get("provinces");
	    };
	
	    Chance.prototype.province = function (options) {
	        return (options && options.full) ?
	            this.pick(this.provinces()).name :
	            this.pick(this.provinces()).abbreviation;
	    };
	
	    Chance.prototype.state = function (options) {
	        return (options && options.full) ?
	            this.pick(this.states(options)).name :
	            this.pick(this.states(options)).abbreviation;
	    };
	
	    Chance.prototype.states = function (options) {
	        options = initOptions(options);
	
	        var states,
	            us_states_and_dc = this.get("us_states_and_dc"),
	            territories = this.get("territories"),
	            armed_forces = this.get("armed_forces");
	
	        states = us_states_and_dc;
	
	        if (options.territories) {
	            states = states.concat(territories);
	        }
	        if (options.armed_forces) {
	            states = states.concat(armed_forces);
	        }
	
	        return states;
	    };
	
	    Chance.prototype.street = function (options) {
	        options = initOptions(options);
	
	        var street = this.word({syllables: 2});
	        street = this.capitalize(street);
	        street += ' ';
	        street += options.short_suffix ?
	            this.street_suffix().abbreviation :
	            this.street_suffix().name;
	        return street;
	    };
	
	    Chance.prototype.street_suffix = function () {
	        return this.pick(this.street_suffixes());
	    };
	
	    Chance.prototype.street_suffixes = function () {
	        // These are the most common suffixes.
	        return this.get("street_suffixes");
	    };
	
	    // Note: only returning US zip codes, internationalization will be a whole
	    // other beast to tackle at some point.
	    Chance.prototype.zip = function (options) {
	        var zip = this.n(this.natural, 5, {max: 9});
	
	        if (options && options.plusfour === true) {
	            zip.push('-');
	            zip = zip.concat(this.n(this.natural, 4, {max: 9}));
	        }
	
	        return zip.join("");
	    };
	
	    // -- End Location --
	
	    // -- Time
	
	    Chance.prototype.ampm = function () {
	        return this.bool() ? 'am' : 'pm';
	    };
	
	    Chance.prototype.date = function (options) {
	        var date_string, date;
	
	        // If interval is specified we ignore preset
	        if(options && (options.min || options.max)) {
	            options = initOptions(options, {
	                american: true,
	                string: false
	            });
	            var min = typeof options.min !== "undefined" ? options.min.getTime() : 1;
	            // 100,000,000 days measured relative to midnight at the beginning of 01 January, 1970 UTC. http://es5.github.io/#x15.9.1.1
	            var max = typeof options.max !== "undefined" ? options.max.getTime() : 8640000000000000;
	
	            date = new Date(this.natural({min: min, max: max}));
	        } else {
	            var m = this.month({raw: true});
	
	            options = initOptions(options, {
	                year: parseInt(this.year(), 10),
	                // Necessary to subtract 1 because Date() 0-indexes month but not day or year
	                // for some reason.
	                month: m.numeric - 1,
	                day: this.natural({min: 1, max: m.days}),
	                hour: this.hour(),
	                minute: this.minute(),
	                second: this.second(),
	                millisecond: this.millisecond(),
	                american: true,
	                string: false
	            });
	
	            date = new Date(options.year, options.month, options.day, options.hour, options.minute, options.second, options.millisecond);
	        }
	
	        if (options.american) {
	            // Adding 1 to the month is necessary because Date() 0-indexes
	            // months but not day for some odd reason.
	            date_string = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
	        } else {
	            date_string = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
	        }
	
	        return options.string ? date_string : date;
	    };
	
	    Chance.prototype.hammertime = function (options) {
	        return this.date(options).getTime();
	    };
	
	    Chance.prototype.hour = function (options) {
	        options = initOptions(options, {min: 1, max: options && options.twentyfour ? 24 : 12});
	
	        testRange(options.min < 1, "Chance: Min cannot be less than 1.");
	        testRange(options.twentyfour && options.max > 24, "Chance: Max cannot be greater than 24 for twentyfour option.");
	        testRange(!options.twentyfour && options.max > 12, "Chance: Max cannot be greater than 12.");
	        testRange(options.min > options.max, "Chance: Min cannot be greater than Max.");
	
	        return this.natural({min: options.min, max: options.max});
	    };
	
	    Chance.prototype.millisecond = function () {
	        return this.natural({max: 999});
	    };
	
	    Chance.prototype.minute = Chance.prototype.second = function (options) {
	        options = initOptions(options, {min: 0, max: 59});
	
	        testRange(options.min < 0, "Chance: Min cannot be less than 0.");
	        testRange(options.max > 59, "Chance: Max cannot be greater than 59.");
	        testRange(options.min > options.max, "Chance: Min cannot be greater than Max.");
	
	        return this.natural({min: options.min, max: options.max});
	    };
	
	    Chance.prototype.month = function (options) {
	        options = initOptions(options, {min: 1, max: 12});
	
	        testRange(options.min < 1, "Chance: Min cannot be less than 1.");
	        testRange(options.max > 12, "Chance: Max cannot be greater than 12.");
	        testRange(options.min > options.max, "Chance: Min cannot be greater than Max.");
	
	        var month = this.pick(this.months().slice(options.min - 1, options.max));
	        return options.raw ? month : month.name;
	    };
	
	    Chance.prototype.months = function () {
	        return this.get("months");
	    };
	
	    Chance.prototype.second = function () {
	        return this.natural({max: 59});
	    };
	
	    Chance.prototype.timestamp = function () {
	        return this.natural({min: 1, max: parseInt(new Date().getTime() / 1000, 10)});
	    };
	
	    Chance.prototype.year = function (options) {
	        // Default to current year as min if none specified
	        options = initOptions(options, {min: new Date().getFullYear()});
	
	        // Default to one century after current year as max if none specified
	        options.max = (typeof options.max !== "undefined") ? options.max : options.min + 100;
	
	        return this.natural(options).toString();
	    };
	
	    // -- End Time
	
	    // -- Finance --
	
	    Chance.prototype.cc = function (options) {
	        options = initOptions(options);
	
	        var type, number, to_generate;
	
	        type = (options.type) ?
	                    this.cc_type({ name: options.type, raw: true }) :
	                    this.cc_type({ raw: true });
	
	        number = type.prefix.split("");
	        to_generate = type.length - type.prefix.length - 1;
	
	        // Generates n - 1 digits
	        number = number.concat(this.n(this.integer, to_generate, {min: 0, max: 9}));
	
	        // Generates the last digit according to Luhn algorithm
	        number.push(this.luhn_calculate(number.join("")));
	
	        return number.join("");
	    };
	
	    Chance.prototype.cc_types = function () {
	        // http://en.wikipedia.org/wiki/Bank_card_number#Issuer_identification_number_.28IIN.29
	        return this.get("cc_types");
	    };
	
	    Chance.prototype.cc_type = function (options) {
	        options = initOptions(options);
	        var types = this.cc_types(),
	            type = null;
	
	        if (options.name) {
	            for (var i = 0; i < types.length; i++) {
	                // Accept either name or short_name to specify card type
	                if (types[i].name === options.name || types[i].short_name === options.name) {
	                    type = types[i];
	                    break;
	                }
	            }
	            if (type === null) {
	                throw new Error("Credit card type '" + options.name + "'' is not supported");
	            }
	        } else {
	            type = this.pick(types);
	        }
	
	        return options.raw ? type : type.name;
	    };
	
	    //return all world currency by ISO 4217
	    Chance.prototype.currency_types = function () {
	        return this.get("currency_types");
	    };
	
	    //return random world currency by ISO 4217
	    Chance.prototype.currency = function () {
	        return this.pick(this.currency_types());
	    };
	
	    //Return random correct currency exchange pair (e.g. EUR/USD) or array of currency code
	    Chance.prototype.currency_pair = function (returnAsString) {
	        var currencies = this.unique(this.currency, 2, {
	            comparator: function(arr, val) {
	
	                return arr.reduce(function(acc, item) {
	                    // If a match has been found, short circuit check and just return
	                    return acc || (item.code === val.code);
	                }, false);
	            }
	        });
	
	        if (returnAsString) {
	            return  currencies[0] + '/' + currencies[1];
	        } else {
	            return currencies;
	        }
	    };
	
	    Chance.prototype.dollar = function (options) {
	        // By default, a somewhat more sane max for dollar than all available numbers
	        options = initOptions(options, {max : 10000, min : 0});
	
	        var dollar = this.floating({min: options.min, max: options.max, fixed: 2}).toString(),
	            cents = dollar.split('.')[1];
	
	        if (cents === undefined) {
	            dollar += '.00';
	        } else if (cents.length < 2) {
	            dollar = dollar + '0';
	        }
	
	        if (dollar < 0) {
	            return '-$' + dollar.replace('-', '');
	        } else {
	            return '$' + dollar;
	        }
	    };
	
	    Chance.prototype.exp = function (options) {
	        options = initOptions(options);
	        var exp = {};
	
	        exp.year = this.exp_year();
	
	        // If the year is this year, need to ensure month is greater than the
	        // current month or this expiration will not be valid
	        if (exp.year === (new Date().getFullYear())) {
	            exp.month = this.exp_month({future: true});
	        } else {
	            exp.month = this.exp_month();
	        }
	
	        return options.raw ? exp : exp.month + '/' + exp.year;
	    };
	
	    Chance.prototype.exp_month = function (options) {
	        options = initOptions(options);
	        var month, month_int,
	            curMonth = new Date().getMonth();
	
	        if (options.future) {
	            do {
	                month = this.month({raw: true}).numeric;
	                month_int = parseInt(month, 10);
	            } while (month_int < curMonth);
	        } else {
	            month = this.month({raw: true}).numeric;
	        }
	
	        return month;
	    };
	
	    Chance.prototype.exp_year = function () {
	        return this.year({max: new Date().getFullYear() + 10});
	    };
	
	    // -- End Finance
	
	    // -- Miscellaneous --
	
	    // Dice - For all the board game geeks out there, myself included ;)
	    function diceFn (range) {
	        return function () {
	            return this.natural(range);
	        };
	    }
	    Chance.prototype.d4 = diceFn({min: 1, max: 4});
	    Chance.prototype.d6 = diceFn({min: 1, max: 6});
	    Chance.prototype.d8 = diceFn({min: 1, max: 8});
	    Chance.prototype.d10 = diceFn({min: 1, max: 10});
	    Chance.prototype.d12 = diceFn({min: 1, max: 12});
	    Chance.prototype.d20 = diceFn({min: 1, max: 20});
	    Chance.prototype.d30 = diceFn({min: 1, max: 30});
	    Chance.prototype.d100 = diceFn({min: 1, max: 100});
	
	    Chance.prototype.rpg = function (thrown, options) {
	        options = initOptions(options);
	        if (thrown === null) {
	            throw new Error("A type of die roll must be included");
	        } else {
	            var bits = thrown.toLowerCase().split("d"),
	                rolls = [];
	
	            if (bits.length !== 2 || !parseInt(bits[0], 10) || !parseInt(bits[1], 10)) {
	                throw new Error("Invalid format provided. Please provide #d# where the first # is the number of dice to roll, the second # is the max of each die");
	            }
	            for (var i = bits[0]; i > 0; i--) {
	                rolls[i - 1] = this.natural({min: 1, max: bits[1]});
	            }
	            return (typeof options.sum !== 'undefined' && options.sum) ? rolls.reduce(function (p, c) { return p + c; }) : rolls;
	        }
	    };
	
	    // Guid
	    Chance.prototype.guid = function (options) {
	        options = initOptions(options, { version: 5 });
	
	        var guid_pool = "abcdef1234567890",
	            variant_pool = "ab89",
	            guid = this.string({ pool: guid_pool, length: 8 }) + '-' +
	                   this.string({ pool: guid_pool, length: 4 }) + '-' +
	                   // The Version
	                   options.version +
	                   this.string({ pool: guid_pool, length: 3 }) + '-' +
	                   // The Variant
	                   this.string({ pool: variant_pool, length: 1 }) +
	                   this.string({ pool: guid_pool, length: 3 }) + '-' +
	                   this.string({ pool: guid_pool, length: 12 });
	        return guid;
	    };
	    
	    // Hash
	    Chance.prototype.hash = function (options) {
	        options = initOptions(options, {length : 40, casing: 'lower'});
	        var pool = options.casing === 'upper' ? HEX_POOL.toUpperCase() : HEX_POOL;
	        return this.string({pool: pool, length: options.length});
	    };
	
	    Chance.prototype.luhn_check = function (num) {
	        var str = num.toString();
	        var checkDigit = +str.substring(str.length - 1);
	        return checkDigit === this.luhn_calculate(+str.substring(0, str.length - 1));
	    };
	
	    Chance.prototype.luhn_calculate = function (num) {
	        var digits = num.toString().split("").reverse();
	        var sum = 0;
	        var digit;
	
	        for (var i = 0, l = digits.length; l > i; ++i) {
	            digit = +digits[i];
	            if (i % 2 === 0) {
	                digit *= 2;
	                if (digit > 9) {
	                    digit -= 9;
	                }
	            }
	            sum += digit;
	        }
	        return (sum * 9) % 10;
	    };
	
	
	    var data = {
	
	        firstNames: {
	            "male": ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Charles", "Thomas", "Christopher", "Daniel", "Matthew", "George", "Donald", "Anthony", "Paul", "Mark", "Edward", "Steven", "Kenneth", "Andrew", "Brian", "Joshua", "Kevin", "Ronald", "Timothy", "Jason", "Jeffrey", "Frank", "Gary", "Ryan", "Nicholas", "Eric", "Stephen", "Jacob", "Larry", "Jonathan", "Scott", "Raymond", "Justin", "Brandon", "Gregory", "Samuel", "Benjamin", "Patrick", "Jack", "Henry", "Walter", "Dennis", "Jerry", "Alexander", "Peter", "Tyler", "Douglas", "Harold", "Aaron", "Jose", "Adam", "Arthur", "Zachary", "Carl", "Nathan", "Albert", "Kyle", "Lawrence", "Joe", "Willie", "Gerald", "Roger", "Keith", "Jeremy", "Terry", "Harry", "Ralph", "Sean", "Jesse", "Roy", "Louis", "Billy", "Austin", "Bruce", "Eugene", "Christian", "Bryan", "Wayne", "Russell", "Howard", "Fred", "Ethan", "Jordan", "Philip", "Alan", "Juan", "Randy", "Vincent", "Bobby", "Dylan", "Johnny", "Phillip", "Victor", "Clarence", "Ernest", "Martin", "Craig", "Stanley", "Shawn", "Travis", "Bradley", "Leonard", "Earl", "Gabriel", "Jimmy", "Francis", "Todd", "Noah", "Danny", "Dale", "Cody", "Carlos", "Allen", "Frederick", "Logan", "Curtis", "Alex", "Joel", "Luis", "Norman", "Marvin", "Glenn", "Tony", "Nathaniel", "Rodney", "Melvin", "Alfred", "Steve", "Cameron", "Chad", "Edwin", "Caleb", "Evan", "Antonio", "Lee", "Herbert", "Jeffery", "Isaac", "Derek", "Ricky", "Marcus", "Theodore", "Elijah", "Luke", "Jesus", "Eddie", "Troy", "Mike", "Dustin", "Ray", "Adrian", "Bernard", "Leroy", "Angel", "Randall", "Wesley", "Ian", "Jared", "Mason", "Hunter", "Calvin", "Oscar", "Clifford", "Jay", "Shane", "Ronnie", "Barry", "Lucas", "Corey", "Manuel", "Leo", "Tommy", "Warren", "Jackson", "Isaiah", "Connor", "Don", "Dean", "Jon", "Julian", "Miguel", "Bill", "Lloyd", "Charlie", "Mitchell", "Leon", "Jerome", "Darrell", "Jeremiah", "Alvin", "Brett", "Seth", "Floyd", "Jim", "Blake", "Micheal", "Gordon", "Trevor", "Lewis", "Erik", "Edgar", "Vernon", "Devin", "Gavin", "Jayden", "Chris", "Clyde", "Tom", "Derrick", "Mario", "Brent", "Marc", "Herman", "Chase", "Dominic", "Ricardo", "Franklin", "Maurice", "Max", "Aiden", "Owen", "Lester", "Gilbert", "Elmer", "Gene", "Francisco", "Glen", "Cory", "Garrett", "Clayton", "Sam", "Jorge", "Chester", "Alejandro", "Jeff", "Harvey", "Milton", "Cole", "Ivan", "Andre", "Duane", "Landon"],
	            "female": ["Mary", "Emma", "Elizabeth", "Minnie", "Margaret", "Ida", "Alice", "Bertha", "Sarah", "Annie", "Clara", "Ella", "Florence", "Cora", "Martha", "Laura", "Nellie", "Grace", "Carrie", "Maude", "Mabel", "Bessie", "Jennie", "Gertrude", "Julia", "Hattie", "Edith", "Mattie", "Rose", "Catherine", "Lillian", "Ada", "Lillie", "Helen", "Jessie", "Louise", "Ethel", "Lula", "Myrtle", "Eva", "Frances", "Lena", "Lucy", "Edna", "Maggie", "Pearl", "Daisy", "Fannie", "Josephine", "Dora", "Rosa", "Katherine", "Agnes", "Marie", "Nora", "May", "Mamie", "Blanche", "Stella", "Ellen", "Nancy", "Effie", "Sallie", "Nettie", "Della", "Lizzie", "Flora", "Susie", "Maud", "Mae", "Etta", "Harriet", "Sadie", "Caroline", "Katie", "Lydia", "Elsie", "Kate", "Susan", "Mollie", "Alma", "Addie", "Georgia", "Eliza", "Lulu", "Nannie", "Lottie", "Amanda", "Belle", "Charlotte", "Rebecca", "Ruth", "Viola", "Olive", "Amelia", "Hannah", "Jane", "Virginia", "Emily", "Matilda", "Irene", "Kathryn", "Esther", "Willie", "Henrietta", "Ollie", "Amy", "Rachel", "Sara", "Estella", "Theresa", "Augusta", "Ora", "Pauline", "Josie", "Lola", "Sophia", "Leona", "Anne", "Mildred", "Ann", "Beulah", "Callie", "Lou", "Delia", "Eleanor", "Barbara", "Iva", "Louisa", "Maria", "Mayme", "Evelyn", "Estelle", "Nina", "Betty", "Marion", "Bettie", "Dorothy", "Luella", "Inez", "Lela", "Rosie", "Allie", "Millie", "Janie", "Cornelia", "Victoria", "Ruby", "Winifred", "Alta", "Celia", "Christine", "Beatrice", "Birdie", "Harriett", "Mable", "Myra", "Sophie", "Tillie", "Isabel", "Sylvia", "Carolyn", "Isabelle", "Leila", "Sally", "Ina", "Essie", "Bertie", "Nell", "Alberta", "Katharine", "Lora", "Rena", "Mina", "Rhoda", "Mathilda", "Abbie", "Eula", "Dollie", "Hettie", "Eunice", "Fanny", "Ola", "Lenora", "Adelaide", "Christina", "Lelia", "Nelle", "Sue", "Johanna", "Lilly", "Lucinda", "Minerva", "Lettie", "Roxie", "Cynthia", "Helena", "Hilda", "Hulda", "Bernice", "Genevieve", "Jean", "Cordelia", "Marian", "Francis", "Jeanette", "Adeline", "Gussie", "Leah", "Lois", "Lura", "Mittie", "Hallie", "Isabella", "Olga", "Phoebe", "Teresa", "Hester", "Lida", "Lina", "Winnie", "Claudia", "Marguerite", "Vera", "Cecelia", "Bess", "Emilie", "John", "Rosetta", "Verna", "Myrtie", "Cecilia", "Elva", "Olivia", "Ophelia", "Georgie", "Elnora", "Violet", "Adele", "Lily", "Linnie", "Loretta", "Madge", "Polly", "Virgie", "Eugenia", "Lucile", "Lucille", "Mabelle", "Rosalie"]
	        },
	
	        lastNames: ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook', 'Morgan', 'Bell', 'Murphy', 'Bailey', 'Rivera', 'Cooper', 'Richardson', 'Cox', 'Howard', 'Ward', 'Torres', 'Peterson', 'Gray', 'Ramirez', 'James', 'Watson', 'Brooks', 'Kelly', 'Sanders', 'Price', 'Bennett', 'Wood', 'Barnes', 'Ross', 'Henderson', 'Coleman', 'Jenkins', 'Perry', 'Powell', 'Long', 'Patterson', 'Hughes', 'Flores', 'Washington', 'Butler', 'Simmons', 'Foster', 'Gonzales', 'Bryant', 'Alexander', 'Russell', 'Griffin', 'Diaz', 'Hayes', 'Myers', 'Ford', 'Hamilton', 'Graham', 'Sullivan', 'Wallace', 'Woods', 'Cole', 'West', 'Jordan', 'Owens', 'Reynolds', 'Fisher', 'Ellis', 'Harrison', 'Gibson', 'McDonald', 'Cruz', 'Marshall', 'Ortiz', 'Gomez', 'Murray', 'Freeman', 'Wells', 'Webb', 'Simpson', 'Stevens', 'Tucker', 'Porter', 'Hunter', 'Hicks', 'Crawford', 'Henry', 'Boyd', 'Mason', 'Morales', 'Kennedy', 'Warren', 'Dixon', 'Ramos', 'Reyes', 'Burns', 'Gordon', 'Shaw', 'Holmes', 'Rice', 'Robertson', 'Hunt', 'Black', 'Daniels', 'Palmer', 'Mills', 'Nichols', 'Grant', 'Knight', 'Ferguson', 'Rose', 'Stone', 'Hawkins', 'Dunn', 'Perkins', 'Hudson', 'Spencer', 'Gardner', 'Stephens', 'Payne', 'Pierce', 'Berry', 'Matthews', 'Arnold', 'Wagner', 'Willis', 'Ray', 'Watkins', 'Olson', 'Carroll', 'Duncan', 'Snyder', 'Hart', 'Cunningham', 'Bradley', 'Lane', 'Andrews', 'Ruiz', 'Harper', 'Fox', 'Riley', 'Armstrong', 'Carpenter', 'Weaver', 'Greene', 'Lawrence', 'Elliott', 'Chavez', 'Sims', 'Austin', 'Peters', 'Kelley', 'Franklin', 'Lawson', 'Fields', 'Gutierrez', 'Ryan', 'Schmidt', 'Carr', 'Vasquez', 'Castillo', 'Wheeler', 'Chapman', 'Oliver', 'Montgomery', 'Richards', 'Williamson', 'Johnston', 'Banks', 'Meyer', 'Bishop', 'McCoy', 'Howell', 'Alvarez', 'Morrison', 'Hansen', 'Fernandez', 'Garza', 'Harvey', 'Little', 'Burton', 'Stanley', 'Nguyen', 'George', 'Jacobs', 'Reid', 'Kim', 'Fuller', 'Lynch', 'Dean', 'Gilbert', 'Garrett', 'Romero', 'Welch', 'Larson', 'Frazier', 'Burke', 'Hanson', 'Day', 'Mendoza', 'Moreno', 'Bowman', 'Medina', 'Fowler', 'Brewer', 'Hoffman', 'Carlson', 'Silva', 'Pearson', 'Holland', 'Douglas', 'Fleming', 'Jensen', 'Vargas', 'Byrd', 'Davidson', 'Hopkins', 'May', 'Terry', 'Herrera', 'Wade', 'Soto', 'Walters', 'Curtis', 'Neal', 'Caldwell', 'Lowe', 'Jennings', 'Barnett', 'Graves', 'Jimenez', 'Horton', 'Shelton', 'Barrett', 'Obrien', 'Castro', 'Sutton', 'Gregory', 'McKinney', 'Lucas', 'Miles', 'Craig', 'Rodriquez', 'Chambers', 'Holt', 'Lambert', 'Fletcher', 'Watts', 'Bates', 'Hale', 'Rhodes', 'Pena', 'Beck', 'Newman', 'Haynes', 'McDaniel', 'Mendez', 'Bush', 'Vaughn', 'Parks', 'Dawson', 'Santiago', 'Norris', 'Hardy', 'Love', 'Steele', 'Curry', 'Powers', 'Schultz', 'Barker', 'Guzman', 'Page', 'Munoz', 'Ball', 'Keller', 'Chandler', 'Weber', 'Leonard', 'Walsh', 'Lyons', 'Ramsey', 'Wolfe', 'Schneider', 'Mullins', 'Benson', 'Sharp', 'Bowen', 'Daniel', 'Barber', 'Cummings', 'Hines', 'Baldwin', 'Griffith', 'Valdez', 'Hubbard', 'Salazar', 'Reeves', 'Warner', 'Stevenson', 'Burgess', 'Santos', 'Tate', 'Cross', 'Garner', 'Mann', 'Mack', 'Moss', 'Thornton', 'Dennis', 'McGee', 'Farmer', 'Delgado', 'Aguilar', 'Vega', 'Glover', 'Manning', 'Cohen', 'Harmon', 'Rodgers', 'Robbins', 'Newton', 'Todd', 'Blair', 'Higgins', 'Ingram', 'Reese', 'Cannon', 'Strickland', 'Townsend', 'Potter', 'Goodwin', 'Walton', 'Rowe', 'Hampton', 'Ortega', 'Patton', 'Swanson', 'Joseph', 'Francis', 'Goodman', 'Maldonado', 'Yates', 'Becker', 'Erickson', 'Hodges', 'Rios', 'Conner', 'Adkins', 'Webster', 'Norman', 'Malone', 'Hammond', 'Flowers', 'Cobb', 'Moody', 'Quinn', 'Blake', 'Maxwell', 'Pope', 'Floyd', 'Osborne', 'Paul', 'McCarthy', 'Guerrero', 'Lindsey', 'Estrada', 'Sandoval', 'Gibbs', 'Tyler', 'Gross', 'Fitzgerald', 'Stokes', 'Doyle', 'Sherman', 'Saunders', 'Wise', 'Colon', 'Gill', 'Alvarado', 'Greer', 'Padilla', 'Simon', 'Waters', 'Nunez', 'Ballard', 'Schwartz', 'McBride', 'Houston', 'Christensen', 'Klein', 'Pratt', 'Briggs', 'Parsons', 'McLaughlin', 'Zimmerman', 'French', 'Buchanan', 'Moran', 'Copeland', 'Roy', 'Pittman', 'Brady', 'McCormick', 'Holloway', 'Brock', 'Poole', 'Frank', 'Logan', 'Owen', 'Bass', 'Marsh', 'Drake', 'Wong', 'Jefferson', 'Park', 'Morton', 'Abbott', 'Sparks', 'Patrick', 'Norton', 'Huff', 'Clayton', 'Massey', 'Lloyd', 'Figueroa', 'Carson', 'Bowers', 'Roberson', 'Barton', 'Tran', 'Lamb', 'Harrington', 'Casey', 'Boone', 'Cortez', 'Clarke', 'Mathis', 'Singleton', 'Wilkins', 'Cain', 'Bryan', 'Underwood', 'Hogan', 'McKenzie', 'Collier', 'Luna', 'Phelps', 'McGuire', 'Allison', 'Bridges', 'Wilkerson', 'Nash', 'Summers', 'Atkins'],
	
	        // Data taken from https://github.com/umpirsky/country-list/blob/master/country/cldr/en_US/country.json
	        countries: [{"name":"Afghanistan","abbreviation":"AF"},{"name":"Albania","abbreviation":"AL"},{"name":"Algeria","abbreviation":"DZ"},{"name":"American Samoa","abbreviation":"AS"},{"name":"Andorra","abbreviation":"AD"},{"name":"Angola","abbreviation":"AO"},{"name":"Anguilla","abbreviation":"AI"},{"name":"Antarctica","abbreviation":"AQ"},{"name":"Antigua and Barbuda","abbreviation":"AG"},{"name":"Argentina","abbreviation":"AR"},{"name":"Armenia","abbreviation":"AM"},{"name":"Aruba","abbreviation":"AW"},{"name":"Australia","abbreviation":"AU"},{"name":"Austria","abbreviation":"AT"},{"name":"Azerbaijan","abbreviation":"AZ"},{"name":"Bahamas","abbreviation":"BS"},{"name":"Bahrain","abbreviation":"BH"},{"name":"Bangladesh","abbreviation":"BD"},{"name":"Barbados","abbreviation":"BB"},{"name":"Belarus","abbreviation":"BY"},{"name":"Belgium","abbreviation":"BE"},{"name":"Belize","abbreviation":"BZ"},{"name":"Benin","abbreviation":"BJ"},{"name":"Bermuda","abbreviation":"BM"},{"name":"Bhutan","abbreviation":"BT"},{"name":"Bolivia","abbreviation":"BO"},{"name":"Bosnia and Herzegovina","abbreviation":"BA"},{"name":"Botswana","abbreviation":"BW"},{"name":"Bouvet Island","abbreviation":"BV"},{"name":"Brazil","abbreviation":"BR"},{"name":"British Antarctic Territory","abbreviation":"BQ"},{"name":"British Indian Ocean Territory","abbreviation":"IO"},{"name":"British Virgin Islands","abbreviation":"VG"},{"name":"Brunei","abbreviation":"BN"},{"name":"Bulgaria","abbreviation":"BG"},{"name":"Burkina Faso","abbreviation":"BF"},{"name":"Burundi","abbreviation":"BI"},{"name":"Cambodia","abbreviation":"KH"},{"name":"Cameroon","abbreviation":"CM"},{"name":"Canada","abbreviation":"CA"},{"name":"Canton and Enderbury Islands","abbreviation":"CT"},{"name":"Cape Verde","abbreviation":"CV"},{"name":"Cayman Islands","abbreviation":"KY"},{"name":"Central African Republic","abbreviation":"CF"},{"name":"Chad","abbreviation":"TD"},{"name":"Chile","abbreviation":"CL"},{"name":"China","abbreviation":"CN"},{"name":"Christmas Island","abbreviation":"CX"},{"name":"Cocos [Keeling] Islands","abbreviation":"CC"},{"name":"Colombia","abbreviation":"CO"},{"name":"Comoros","abbreviation":"KM"},{"name":"Congo - Brazzaville","abbreviation":"CG"},{"name":"Congo - Kinshasa","abbreviation":"CD"},{"name":"Cook Islands","abbreviation":"CK"},{"name":"Costa Rica","abbreviation":"CR"},{"name":"Croatia","abbreviation":"HR"},{"name":"Cuba","abbreviation":"CU"},{"name":"Cyprus","abbreviation":"CY"},{"name":"Czech Republic","abbreviation":"CZ"},{"name":"Côte d’Ivoire","abbreviation":"CI"},{"name":"Denmark","abbreviation":"DK"},{"name":"Djibouti","abbreviation":"DJ"},{"name":"Dominica","abbreviation":"DM"},{"name":"Dominican Republic","abbreviation":"DO"},{"name":"Dronning Maud Land","abbreviation":"NQ"},{"name":"East Germany","abbreviation":"DD"},{"name":"Ecuador","abbreviation":"EC"},{"name":"Egypt","abbreviation":"EG"},{"name":"El Salvador","abbreviation":"SV"},{"name":"Equatorial Guinea","abbreviation":"GQ"},{"name":"Eritrea","abbreviation":"ER"},{"name":"Estonia","abbreviation":"EE"},{"name":"Ethiopia","abbreviation":"ET"},{"name":"Falkland Islands","abbreviation":"FK"},{"name":"Faroe Islands","abbreviation":"FO"},{"name":"Fiji","abbreviation":"FJ"},{"name":"Finland","abbreviation":"FI"},{"name":"France","abbreviation":"FR"},{"name":"French Guiana","abbreviation":"GF"},{"name":"French Polynesia","abbreviation":"PF"},{"name":"French Southern Territories","abbreviation":"TF"},{"name":"French Southern and Antarctic Territories","abbreviation":"FQ"},{"name":"Gabon","abbreviation":"GA"},{"name":"Gambia","abbreviation":"GM"},{"name":"Georgia","abbreviation":"GE"},{"name":"Germany","abbreviation":"DE"},{"name":"Ghana","abbreviation":"GH"},{"name":"Gibraltar","abbreviation":"GI"},{"name":"Greece","abbreviation":"GR"},{"name":"Greenland","abbreviation":"GL"},{"name":"Grenada","abbreviation":"GD"},{"name":"Guadeloupe","abbreviation":"GP"},{"name":"Guam","abbreviation":"GU"},{"name":"Guatemala","abbreviation":"GT"},{"name":"Guernsey","abbreviation":"GG"},{"name":"Guinea","abbreviation":"GN"},{"name":"Guinea-Bissau","abbreviation":"GW"},{"name":"Guyana","abbreviation":"GY"},{"name":"Haiti","abbreviation":"HT"},{"name":"Heard Island and McDonald Islands","abbreviation":"HM"},{"name":"Honduras","abbreviation":"HN"},{"name":"Hong Kong SAR China","abbreviation":"HK"},{"name":"Hungary","abbreviation":"HU"},{"name":"Iceland","abbreviation":"IS"},{"name":"India","abbreviation":"IN"},{"name":"Indonesia","abbreviation":"ID"},{"name":"Iran","abbreviation":"IR"},{"name":"Iraq","abbreviation":"IQ"},{"name":"Ireland","abbreviation":"IE"},{"name":"Isle of Man","abbreviation":"IM"},{"name":"Israel","abbreviation":"IL"},{"name":"Italy","abbreviation":"IT"},{"name":"Jamaica","abbreviation":"JM"},{"name":"Japan","abbreviation":"JP"},{"name":"Jersey","abbreviation":"JE"},{"name":"Johnston Island","abbreviation":"JT"},{"name":"Jordan","abbreviation":"JO"},{"name":"Kazakhstan","abbreviation":"KZ"},{"name":"Kenya","abbreviation":"KE"},{"name":"Kiribati","abbreviation":"KI"},{"name":"Kuwait","abbreviation":"KW"},{"name":"Kyrgyzstan","abbreviation":"KG"},{"name":"Laos","abbreviation":"LA"},{"name":"Latvia","abbreviation":"LV"},{"name":"Lebanon","abbreviation":"LB"},{"name":"Lesotho","abbreviation":"LS"},{"name":"Liberia","abbreviation":"LR"},{"name":"Libya","abbreviation":"LY"},{"name":"Liechtenstein","abbreviation":"LI"},{"name":"Lithuania","abbreviation":"LT"},{"name":"Luxembourg","abbreviation":"LU"},{"name":"Macau SAR China","abbreviation":"MO"},{"name":"Macedonia","abbreviation":"MK"},{"name":"Madagascar","abbreviation":"MG"},{"name":"Malawi","abbreviation":"MW"},{"name":"Malaysia","abbreviation":"MY"},{"name":"Maldives","abbreviation":"MV"},{"name":"Mali","abbreviation":"ML"},{"name":"Malta","abbreviation":"MT"},{"name":"Marshall Islands","abbreviation":"MH"},{"name":"Martinique","abbreviation":"MQ"},{"name":"Mauritania","abbreviation":"MR"},{"name":"Mauritius","abbreviation":"MU"},{"name":"Mayotte","abbreviation":"YT"},{"name":"Metropolitan France","abbreviation":"FX"},{"name":"Mexico","abbreviation":"MX"},{"name":"Micronesia","abbreviation":"FM"},{"name":"Midway Islands","abbreviation":"MI"},{"name":"Moldova","abbreviation":"MD"},{"name":"Monaco","abbreviation":"MC"},{"name":"Mongolia","abbreviation":"MN"},{"name":"Montenegro","abbreviation":"ME"},{"name":"Montserrat","abbreviation":"MS"},{"name":"Morocco","abbreviation":"MA"},{"name":"Mozambique","abbreviation":"MZ"},{"name":"Myanmar [Burma]","abbreviation":"MM"},{"name":"Namibia","abbreviation":"NA"},{"name":"Nauru","abbreviation":"NR"},{"name":"Nepal","abbreviation":"NP"},{"name":"Netherlands","abbreviation":"NL"},{"name":"Netherlands Antilles","abbreviation":"AN"},{"name":"Neutral Zone","abbreviation":"NT"},{"name":"New Caledonia","abbreviation":"NC"},{"name":"New Zealand","abbreviation":"NZ"},{"name":"Nicaragua","abbreviation":"NI"},{"name":"Niger","abbreviation":"NE"},{"name":"Nigeria","abbreviation":"NG"},{"name":"Niue","abbreviation":"NU"},{"name":"Norfolk Island","abbreviation":"NF"},{"name":"North Korea","abbreviation":"KP"},{"name":"North Vietnam","abbreviation":"VD"},{"name":"Northern Mariana Islands","abbreviation":"MP"},{"name":"Norway","abbreviation":"NO"},{"name":"Oman","abbreviation":"OM"},{"name":"Pacific Islands Trust Territory","abbreviation":"PC"},{"name":"Pakistan","abbreviation":"PK"},{"name":"Palau","abbreviation":"PW"},{"name":"Palestinian Territories","abbreviation":"PS"},{"name":"Panama","abbreviation":"PA"},{"name":"Panama Canal Zone","abbreviation":"PZ"},{"name":"Papua New Guinea","abbreviation":"PG"},{"name":"Paraguay","abbreviation":"PY"},{"name":"People's Democratic Republic of Yemen","abbreviation":"YD"},{"name":"Peru","abbreviation":"PE"},{"name":"Philippines","abbreviation":"PH"},{"name":"Pitcairn Islands","abbreviation":"PN"},{"name":"Poland","abbreviation":"PL"},{"name":"Portugal","abbreviation":"PT"},{"name":"Puerto Rico","abbreviation":"PR"},{"name":"Qatar","abbreviation":"QA"},{"name":"Romania","abbreviation":"RO"},{"name":"Russia","abbreviation":"RU"},{"name":"Rwanda","abbreviation":"RW"},{"name":"Réunion","abbreviation":"RE"},{"name":"Saint Barthélemy","abbreviation":"BL"},{"name":"Saint Helena","abbreviation":"SH"},{"name":"Saint Kitts and Nevis","abbreviation":"KN"},{"name":"Saint Lucia","abbreviation":"LC"},{"name":"Saint Martin","abbreviation":"MF"},{"name":"Saint Pierre and Miquelon","abbreviation":"PM"},{"name":"Saint Vincent and the Grenadines","abbreviation":"VC"},{"name":"Samoa","abbreviation":"WS"},{"name":"San Marino","abbreviation":"SM"},{"name":"Saudi Arabia","abbreviation":"SA"},{"name":"Senegal","abbreviation":"SN"},{"name":"Serbia","abbreviation":"RS"},{"name":"Serbia and Montenegro","abbreviation":"CS"},{"name":"Seychelles","abbreviation":"SC"},{"name":"Sierra Leone","abbreviation":"SL"},{"name":"Singapore","abbreviation":"SG"},{"name":"Slovakia","abbreviation":"SK"},{"name":"Slovenia","abbreviation":"SI"},{"name":"Solomon Islands","abbreviation":"SB"},{"name":"Somalia","abbreviation":"SO"},{"name":"South Africa","abbreviation":"ZA"},{"name":"South Georgia and the South Sandwich Islands","abbreviation":"GS"},{"name":"South Korea","abbreviation":"KR"},{"name":"Spain","abbreviation":"ES"},{"name":"Sri Lanka","abbreviation":"LK"},{"name":"Sudan","abbreviation":"SD"},{"name":"Suriname","abbreviation":"SR"},{"name":"Svalbard and Jan Mayen","abbreviation":"SJ"},{"name":"Swaziland","abbreviation":"SZ"},{"name":"Sweden","abbreviation":"SE"},{"name":"Switzerland","abbreviation":"CH"},{"name":"Syria","abbreviation":"SY"},{"name":"São Tomé and Príncipe","abbreviation":"ST"},{"name":"Taiwan","abbreviation":"TW"},{"name":"Tajikistan","abbreviation":"TJ"},{"name":"Tanzania","abbreviation":"TZ"},{"name":"Thailand","abbreviation":"TH"},{"name":"Timor-Leste","abbreviation":"TL"},{"name":"Togo","abbreviation":"TG"},{"name":"Tokelau","abbreviation":"TK"},{"name":"Tonga","abbreviation":"TO"},{"name":"Trinidad and Tobago","abbreviation":"TT"},{"name":"Tunisia","abbreviation":"TN"},{"name":"Turkey","abbreviation":"TR"},{"name":"Turkmenistan","abbreviation":"TM"},{"name":"Turks and Caicos Islands","abbreviation":"TC"},{"name":"Tuvalu","abbreviation":"TV"},{"name":"U.S. Minor Outlying Islands","abbreviation":"UM"},{"name":"U.S. Miscellaneous Pacific Islands","abbreviation":"PU"},{"name":"U.S. Virgin Islands","abbreviation":"VI"},{"name":"Uganda","abbreviation":"UG"},{"name":"Ukraine","abbreviation":"UA"},{"name":"Union of Soviet Socialist Republics","abbreviation":"SU"},{"name":"United Arab Emirates","abbreviation":"AE"},{"name":"United Kingdom","abbreviation":"GB"},{"name":"United States","abbreviation":"US"},{"name":"Unknown or Invalid Region","abbreviation":"ZZ"},{"name":"Uruguay","abbreviation":"UY"},{"name":"Uzbekistan","abbreviation":"UZ"},{"name":"Vanuatu","abbreviation":"VU"},{"name":"Vatican City","abbreviation":"VA"},{"name":"Venezuela","abbreviation":"VE"},{"name":"Vietnam","abbreviation":"VN"},{"name":"Wake Island","abbreviation":"WK"},{"name":"Wallis and Futuna","abbreviation":"WF"},{"name":"Western Sahara","abbreviation":"EH"},{"name":"Yemen","abbreviation":"YE"},{"name":"Zambia","abbreviation":"ZM"},{"name":"Zimbabwe","abbreviation":"ZW"},{"name":"Åland Islands","abbreviation":"AX"}],
	
	        provinces: [
	            {name: 'Alberta', abbreviation: 'AB'},
	            {name: 'British Columbia', abbreviation: 'BC'},
	            {name: 'Manitoba', abbreviation: 'MB'},
	            {name: 'New Brunswick', abbreviation: 'NB'},
	            {name: 'Newfoundland and Labrador', abbreviation: 'NL'},
	            {name: 'Nova Scotia', abbreviation: 'NS'},
	            {name: 'Ontario', abbreviation: 'ON'},
	            {name: 'Prince Edward Island', abbreviation: 'PE'},
	            {name: 'Quebec', abbreviation: 'QC'},
	            {name: 'Saskatchewan', abbreviation: 'SK'},
	
	            // The case could be made that the following are not actually provinces
	            // since they are technically considered "territories" however they all
	            // look the same on an envelope!
	            {name: 'Northwest Territories', abbreviation: 'NT'},
	            {name: 'Nunavut', abbreviation: 'NU'},
	            {name: 'Yukon', abbreviation: 'YT'}
	        ],
	
	        us_states_and_dc: [
	            {name: 'Alabama', abbreviation: 'AL'},
	            {name: 'Alaska', abbreviation: 'AK'},
	            {name: 'Arizona', abbreviation: 'AZ'},
	            {name: 'Arkansas', abbreviation: 'AR'},
	            {name: 'California', abbreviation: 'CA'},
	            {name: 'Colorado', abbreviation: 'CO'},
	            {name: 'Connecticut', abbreviation: 'CT'},
	            {name: 'Delaware', abbreviation: 'DE'},
	            {name: 'District of Columbia', abbreviation: 'DC'},
	            {name: 'Florida', abbreviation: 'FL'},
	            {name: 'Georgia', abbreviation: 'GA'},
	            {name: 'Hawaii', abbreviation: 'HI'},
	            {name: 'Idaho', abbreviation: 'ID'},
	            {name: 'Illinois', abbreviation: 'IL'},
	            {name: 'Indiana', abbreviation: 'IN'},
	            {name: 'Iowa', abbreviation: 'IA'},
	            {name: 'Kansas', abbreviation: 'KS'},
	            {name: 'Kentucky', abbreviation: 'KY'},
	            {name: 'Louisiana', abbreviation: 'LA'},
	            {name: 'Maine', abbreviation: 'ME'},
	            {name: 'Maryland', abbreviation: 'MD'},
	            {name: 'Massachusetts', abbreviation: 'MA'},
	            {name: 'Michigan', abbreviation: 'MI'},
	            {name: 'Minnesota', abbreviation: 'MN'},
	            {name: 'Mississippi', abbreviation: 'MS'},
	            {name: 'Missouri', abbreviation: 'MO'},
	            {name: 'Montana', abbreviation: 'MT'},
	            {name: 'Nebraska', abbreviation: 'NE'},
	            {name: 'Nevada', abbreviation: 'NV'},
	            {name: 'New Hampshire', abbreviation: 'NH'},
	            {name: 'New Jersey', abbreviation: 'NJ'},
	            {name: 'New Mexico', abbreviation: 'NM'},
	            {name: 'New York', abbreviation: 'NY'},
	            {name: 'North Carolina', abbreviation: 'NC'},
	            {name: 'North Dakota', abbreviation: 'ND'},
	            {name: 'Ohio', abbreviation: 'OH'},
	            {name: 'Oklahoma', abbreviation: 'OK'},
	            {name: 'Oregon', abbreviation: 'OR'},
	            {name: 'Pennsylvania', abbreviation: 'PA'},
	            {name: 'Rhode Island', abbreviation: 'RI'},
	            {name: 'South Carolina', abbreviation: 'SC'},
	            {name: 'South Dakota', abbreviation: 'SD'},
	            {name: 'Tennessee', abbreviation: 'TN'},
	            {name: 'Texas', abbreviation: 'TX'},
	            {name: 'Utah', abbreviation: 'UT'},
	            {name: 'Vermont', abbreviation: 'VT'},
	            {name: 'Virginia', abbreviation: 'VA'},
	            {name: 'Washington', abbreviation: 'WA'},
	            {name: 'West Virginia', abbreviation: 'WV'},
	            {name: 'Wisconsin', abbreviation: 'WI'},
	            {name: 'Wyoming', abbreviation: 'WY'}
	        ],
	
	        territories: [
	            {name: 'American Samoa', abbreviation: 'AS'},
	            {name: 'Federated States of Micronesia', abbreviation: 'FM'},
	            {name: 'Guam', abbreviation: 'GU'},
	            {name: 'Marshall Islands', abbreviation: 'MH'},
	            {name: 'Northern Mariana Islands', abbreviation: 'MP'},
	            {name: 'Puerto Rico', abbreviation: 'PR'},
	            {name: 'Virgin Islands, U.S.', abbreviation: 'VI'}
	        ],
	
	        armed_forces: [
	            {name: 'Armed Forces Europe', abbreviation: 'AE'},
	            {name: 'Armed Forces Pacific', abbreviation: 'AP'},
	            {name: 'Armed Forces the Americas', abbreviation: 'AA'}
	        ],
	
	        street_suffixes: [
	            {name: 'Avenue', abbreviation: 'Ave'},
	            {name: 'Boulevard', abbreviation: 'Blvd'},
	            {name: 'Center', abbreviation: 'Ctr'},
	            {name: 'Circle', abbreviation: 'Cir'},
	            {name: 'Court', abbreviation: 'Ct'},
	            {name: 'Drive', abbreviation: 'Dr'},
	            {name: 'Extension', abbreviation: 'Ext'},
	            {name: 'Glen', abbreviation: 'Gln'},
	            {name: 'Grove', abbreviation: 'Grv'},
	            {name: 'Heights', abbreviation: 'Hts'},
	            {name: 'Highway', abbreviation: 'Hwy'},
	            {name: 'Junction', abbreviation: 'Jct'},
	            {name: 'Key', abbreviation: 'Key'},
	            {name: 'Lane', abbreviation: 'Ln'},
	            {name: 'Loop', abbreviation: 'Loop'},
	            {name: 'Manor', abbreviation: 'Mnr'},
	            {name: 'Mill', abbreviation: 'Mill'},
	            {name: 'Park', abbreviation: 'Park'},
	            {name: 'Parkway', abbreviation: 'Pkwy'},
	            {name: 'Pass', abbreviation: 'Pass'},
	            {name: 'Path', abbreviation: 'Path'},
	            {name: 'Pike', abbreviation: 'Pike'},
	            {name: 'Place', abbreviation: 'Pl'},
	            {name: 'Plaza', abbreviation: 'Plz'},
	            {name: 'Point', abbreviation: 'Pt'},
	            {name: 'Ridge', abbreviation: 'Rdg'},
	            {name: 'River', abbreviation: 'Riv'},
	            {name: 'Road', abbreviation: 'Rd'},
	            {name: 'Square', abbreviation: 'Sq'},
	            {name: 'Street', abbreviation: 'St'},
	            {name: 'Terrace', abbreviation: 'Ter'},
	            {name: 'Trail', abbreviation: 'Trl'},
	            {name: 'Turnpike', abbreviation: 'Tpke'},
	            {name: 'View', abbreviation: 'Vw'},
	            {name: 'Way', abbreviation: 'Way'}
	        ],
	
	        months: [
	            {name: 'January', short_name: 'Jan', numeric: '01', days: 31},
	            // Not messing with leap years...
	            {name: 'February', short_name: 'Feb', numeric: '02', days: 28},
	            {name: 'March', short_name: 'Mar', numeric: '03', days: 31},
	            {name: 'April', short_name: 'Apr', numeric: '04', days: 30},
	            {name: 'May', short_name: 'May', numeric: '05', days: 31},
	            {name: 'June', short_name: 'Jun', numeric: '06', days: 30},
	            {name: 'July', short_name: 'Jul', numeric: '07', days: 31},
	            {name: 'August', short_name: 'Aug', numeric: '08', days: 31},
	            {name: 'September', short_name: 'Sep', numeric: '09', days: 30},
	            {name: 'October', short_name: 'Oct', numeric: '10', days: 31},
	            {name: 'November', short_name: 'Nov', numeric: '11', days: 30},
	            {name: 'December', short_name: 'Dec', numeric: '12', days: 31}
	        ],
	
	        // http://en.wikipedia.org/wiki/Bank_card_number#Issuer_identification_number_.28IIN.29
	        cc_types: [
	            {name: "American Express", short_name: 'amex', prefix: '34', length: 15},
	            {name: "Bankcard", short_name: 'bankcard', prefix: '5610', length: 16},
	            {name: "China UnionPay", short_name: 'chinaunion', prefix: '62', length: 16},
	            {name: "Diners Club Carte Blanche", short_name: 'dccarte', prefix: '300', length: 14},
	            {name: "Diners Club enRoute", short_name: 'dcenroute', prefix: '2014', length: 15},
	            {name: "Diners Club International", short_name: 'dcintl', prefix: '36', length: 14},
	            {name: "Diners Club United States & Canada", short_name: 'dcusc', prefix: '54', length: 16},
	            {name: "Discover Card", short_name: 'discover', prefix: '6011', length: 16},
	            {name: "InstaPayment", short_name: 'instapay', prefix: '637', length: 16},
	            {name: "JCB", short_name: 'jcb', prefix: '3528', length: 16},
	            {name: "Laser", short_name: 'laser', prefix: '6304', length: 16},
	            {name: "Maestro", short_name: 'maestro', prefix: '5018', length: 16},
	            {name: "Mastercard", short_name: 'mc', prefix: '51', length: 16},
	            {name: "Solo", short_name: 'solo', prefix: '6334', length: 16},
	            {name: "Switch", short_name: 'switch', prefix: '4903', length: 16},
	            {name: "Visa", short_name: 'visa', prefix: '4', length: 16},
	            {name: "Visa Electron", short_name: 'electron', prefix: '4026', length: 16}
	        ],
	
	        //return all world currency by ISO 4217
	        currency_types: [
	            {'code' : 'AED', 'name' : 'United Arab Emirates Dirham'},
	            {'code' : 'AFN', 'name' : 'Afghanistan Afghani'},
	            {'code' : 'ALL', 'name' : 'Albania Lek'},
	            {'code' : 'AMD', 'name' : 'Armenia Dram'},
	            {'code' : 'ANG', 'name' : 'Netherlands Antilles Guilder'},
	            {'code' : 'AOA', 'name' : 'Angola Kwanza'},
	            {'code' : 'ARS', 'name' : 'Argentina Peso'},
	            {'code' : 'AUD', 'name' : 'Australia Dollar'},
	            {'code' : 'AWG', 'name' : 'Aruba Guilder'},
	            {'code' : 'AZN', 'name' : 'Azerbaijan New Manat'},
	            {'code' : 'BAM', 'name' : 'Bosnia and Herzegovina Convertible Marka'},
	            {'code' : 'BBD', 'name' : 'Barbados Dollar'},
	            {'code' : 'BDT', 'name' : 'Bangladesh Taka'},
	            {'code' : 'BGN', 'name' : 'Bulgaria Lev'},
	            {'code' : 'BHD', 'name' : 'Bahrain Dinar'},
	            {'code' : 'BIF', 'name' : 'Burundi Franc'},
	            {'code' : 'BMD', 'name' : 'Bermuda Dollar'},
	            {'code' : 'BND', 'name' : 'Brunei Darussalam Dollar'},
	            {'code' : 'BOB', 'name' : 'Bolivia Boliviano'},
	            {'code' : 'BRL', 'name' : 'Brazil Real'},
	            {'code' : 'BSD', 'name' : 'Bahamas Dollar'},
	            {'code' : 'BTN', 'name' : 'Bhutan Ngultrum'},
	            {'code' : 'BWP', 'name' : 'Botswana Pula'},
	            {'code' : 'BYR', 'name' : 'Belarus Ruble'},
	            {'code' : 'BZD', 'name' : 'Belize Dollar'},
	            {'code' : 'CAD', 'name' : 'Canada Dollar'},
	            {'code' : 'CDF', 'name' : 'Congo/Kinshasa Franc'},
	            {'code' : 'CHF', 'name' : 'Switzerland Franc'},
	            {'code' : 'CLP', 'name' : 'Chile Peso'},
	            {'code' : 'CNY', 'name' : 'China Yuan Renminbi'},
	            {'code' : 'COP', 'name' : 'Colombia Peso'},
	            {'code' : 'CRC', 'name' : 'Costa Rica Colon'},
	            {'code' : 'CUC', 'name' : 'Cuba Convertible Peso'},
	            {'code' : 'CUP', 'name' : 'Cuba Peso'},
	            {'code' : 'CVE', 'name' : 'Cape Verde Escudo'},
	            {'code' : 'CZK', 'name' : 'Czech Republic Koruna'},
	            {'code' : 'DJF', 'name' : 'Djibouti Franc'},
	            {'code' : 'DKK', 'name' : 'Denmark Krone'},
	            {'code' : 'DOP', 'name' : 'Dominican Republic Peso'},
	            {'code' : 'DZD', 'name' : 'Algeria Dinar'},
	            {'code' : 'EGP', 'name' : 'Egypt Pound'},
	            {'code' : 'ERN', 'name' : 'Eritrea Nakfa'},
	            {'code' : 'ETB', 'name' : 'Ethiopia Birr'},
	            {'code' : 'EUR', 'name' : 'Euro Member Countries'},
	            {'code' : 'FJD', 'name' : 'Fiji Dollar'},
	            {'code' : 'FKP', 'name' : 'Falkland Islands (Malvinas) Pound'},
	            {'code' : 'GBP', 'name' : 'United Kingdom Pound'},
	            {'code' : 'GEL', 'name' : 'Georgia Lari'},
	            {'code' : 'GGP', 'name' : 'Guernsey Pound'},
	            {'code' : 'GHS', 'name' : 'Ghana Cedi'},
	            {'code' : 'GIP', 'name' : 'Gibraltar Pound'},
	            {'code' : 'GMD', 'name' : 'Gambia Dalasi'},
	            {'code' : 'GNF', 'name' : 'Guinea Franc'},
	            {'code' : 'GTQ', 'name' : 'Guatemala Quetzal'},
	            {'code' : 'GYD', 'name' : 'Guyana Dollar'},
	            {'code' : 'HKD', 'name' : 'Hong Kong Dollar'},
	            {'code' : 'HNL', 'name' : 'Honduras Lempira'},
	            {'code' : 'HRK', 'name' : 'Croatia Kuna'},
	            {'code' : 'HTG', 'name' : 'Haiti Gourde'},
	            {'code' : 'HUF', 'name' : 'Hungary Forint'},
	            {'code' : 'IDR', 'name' : 'Indonesia Rupiah'},
	            {'code' : 'ILS', 'name' : 'Israel Shekel'},
	            {'code' : 'IMP', 'name' : 'Isle of Man Pound'},
	            {'code' : 'INR', 'name' : 'India Rupee'},
	            {'code' : 'IQD', 'name' : 'Iraq Dinar'},
	            {'code' : 'IRR', 'name' : 'Iran Rial'},
	            {'code' : 'ISK', 'name' : 'Iceland Krona'},
	            {'code' : 'JEP', 'name' : 'Jersey Pound'},
	            {'code' : 'JMD', 'name' : 'Jamaica Dollar'},
	            {'code' : 'JOD', 'name' : 'Jordan Dinar'},
	            {'code' : 'JPY', 'name' : 'Japan Yen'},
	            {'code' : 'KES', 'name' : 'Kenya Shilling'},
	            {'code' : 'KGS', 'name' : 'Kyrgyzstan Som'},
	            {'code' : 'KHR', 'name' : 'Cambodia Riel'},
	            {'code' : 'KMF', 'name' : 'Comoros Franc'},
	            {'code' : 'KPW', 'name' : 'Korea (North) Won'},
	            {'code' : 'KRW', 'name' : 'Korea (South) Won'},
	            {'code' : 'KWD', 'name' : 'Kuwait Dinar'},
	            {'code' : 'KYD', 'name' : 'Cayman Islands Dollar'},
	            {'code' : 'KZT', 'name' : 'Kazakhstan Tenge'},
	            {'code' : 'LAK', 'name' : 'Laos Kip'},
	            {'code' : 'LBP', 'name' : 'Lebanon Pound'},
	            {'code' : 'LKR', 'name' : 'Sri Lanka Rupee'},
	            {'code' : 'LRD', 'name' : 'Liberia Dollar'},
	            {'code' : 'LSL', 'name' : 'Lesotho Loti'},
	            {'code' : 'LTL', 'name' : 'Lithuania Litas'},
	            {'code' : 'LYD', 'name' : 'Libya Dinar'},
	            {'code' : 'MAD', 'name' : 'Morocco Dirham'},
	            {'code' : 'MDL', 'name' : 'Moldova Leu'},
	            {'code' : 'MGA', 'name' : 'Madagascar Ariary'},
	            {'code' : 'MKD', 'name' : 'Macedonia Denar'},
	            {'code' : 'MMK', 'name' : 'Myanmar (Burma) Kyat'},
	            {'code' : 'MNT', 'name' : 'Mongolia Tughrik'},
	            {'code' : 'MOP', 'name' : 'Macau Pataca'},
	            {'code' : 'MRO', 'name' : 'Mauritania Ouguiya'},
	            {'code' : 'MUR', 'name' : 'Mauritius Rupee'},
	            {'code' : 'MVR', 'name' : 'Maldives (Maldive Islands) Rufiyaa'},
	            {'code' : 'MWK', 'name' : 'Malawi Kwacha'},
	            {'code' : 'MXN', 'name' : 'Mexico Peso'},
	            {'code' : 'MYR', 'name' : 'Malaysia Ringgit'},
	            {'code' : 'MZN', 'name' : 'Mozambique Metical'},
	            {'code' : 'NAD', 'name' : 'Namibia Dollar'},
	            {'code' : 'NGN', 'name' : 'Nigeria Naira'},
	            {'code' : 'NIO', 'name' : 'Nicaragua Cordoba'},
	            {'code' : 'NOK', 'name' : 'Norway Krone'},
	            {'code' : 'NPR', 'name' : 'Nepal Rupee'},
	            {'code' : 'NZD', 'name' : 'New Zealand Dollar'},
	            {'code' : 'OMR', 'name' : 'Oman Rial'},
	            {'code' : 'PAB', 'name' : 'Panama Balboa'},
	            {'code' : 'PEN', 'name' : 'Peru Nuevo Sol'},
	            {'code' : 'PGK', 'name' : 'Papua New Guinea Kina'},
	            {'code' : 'PHP', 'name' : 'Philippines Peso'},
	            {'code' : 'PKR', 'name' : 'Pakistan Rupee'},
	            {'code' : 'PLN', 'name' : 'Poland Zloty'},
	            {'code' : 'PYG', 'name' : 'Paraguay Guarani'},
	            {'code' : 'QAR', 'name' : 'Qatar Riyal'},
	            {'code' : 'RON', 'name' : 'Romania New Leu'},
	            {'code' : 'RSD', 'name' : 'Serbia Dinar'},
	            {'code' : 'RUB', 'name' : 'Russia Ruble'},
	            {'code' : 'RWF', 'name' : 'Rwanda Franc'},
	            {'code' : 'SAR', 'name' : 'Saudi Arabia Riyal'},
	            {'code' : 'SBD', 'name' : 'Solomon Islands Dollar'},
	            {'code' : 'SCR', 'name' : 'Seychelles Rupee'},
	            {'code' : 'SDG', 'name' : 'Sudan Pound'},
	            {'code' : 'SEK', 'name' : 'Sweden Krona'},
	            {'code' : 'SGD', 'name' : 'Singapore Dollar'},
	            {'code' : 'SHP', 'name' : 'Saint Helena Pound'},
	            {'code' : 'SLL', 'name' : 'Sierra Leone Leone'},
	            {'code' : 'SOS', 'name' : 'Somalia Shilling'},
	            {'code' : 'SPL', 'name' : 'Seborga Luigino'},
	            {'code' : 'SRD', 'name' : 'Suriname Dollar'},
	            {'code' : 'STD', 'name' : 'São Tomé and Príncipe Dobra'},
	            {'code' : 'SVC', 'name' : 'El Salvador Colon'},
	            {'code' : 'SYP', 'name' : 'Syria Pound'},
	            {'code' : 'SZL', 'name' : 'Swaziland Lilangeni'},
	            {'code' : 'THB', 'name' : 'Thailand Baht'},
	            {'code' : 'TJS', 'name' : 'Tajikistan Somoni'},
	            {'code' : 'TMT', 'name' : 'Turkmenistan Manat'},
	            {'code' : 'TND', 'name' : 'Tunisia Dinar'},
	            {'code' : 'TOP', 'name' : 'Tonga Pa\'anga'},
	            {'code' : 'TRY', 'name' : 'Turkey Lira'},
	            {'code' : 'TTD', 'name' : 'Trinidad and Tobago Dollar'},
	            {'code' : 'TVD', 'name' : 'Tuvalu Dollar'},
	            {'code' : 'TWD', 'name' : 'Taiwan New Dollar'},
	            {'code' : 'TZS', 'name' : 'Tanzania Shilling'},
	            {'code' : 'UAH', 'name' : 'Ukraine Hryvnia'},
	            {'code' : 'UGX', 'name' : 'Uganda Shilling'},
	            {'code' : 'USD', 'name' : 'United States Dollar'},
	            {'code' : 'UYU', 'name' : 'Uruguay Peso'},
	            {'code' : 'UZS', 'name' : 'Uzbekistan Som'},
	            {'code' : 'VEF', 'name' : 'Venezuela Bolivar'},
	            {'code' : 'VND', 'name' : 'Viet Nam Dong'},
	            {'code' : 'VUV', 'name' : 'Vanuatu Vatu'},
	            {'code' : 'WST', 'name' : 'Samoa Tala'},
	            {'code' : 'XAF', 'name' : 'Communauté Financière Africaine (BEAC) CFA Franc BEAC'},
	            {'code' : 'XCD', 'name' : 'East Caribbean Dollar'},
	            {'code' : 'XDR', 'name' : 'International Monetary Fund (IMF) Special Drawing Rights'},
	            {'code' : 'XOF', 'name' : 'Communauté Financière Africaine (BCEAO) Franc'},
	            {'code' : 'XPF', 'name' : 'Comptoirs Français du Pacifique (CFP) Franc'},
	            {'code' : 'YER', 'name' : 'Yemen Rial'},
	            {'code' : 'ZAR', 'name' : 'South Africa Rand'},
	            {'code' : 'ZMW', 'name' : 'Zambia Kwacha'},
	            {'code' : 'ZWD', 'name' : 'Zimbabwe Dollar'}
	        ]
	    };
	
	    var o_hasOwnProperty = Object.prototype.hasOwnProperty;
	    var o_keys = (Object.keys || function(obj) {
	      var result = [];
	      for (var key in obj) {
	        if (o_hasOwnProperty.call(obj, key)) {
	          result.push(key);
	        }
	      }
	
	      return result;
	    });
	
	    function _copyObject(source, target) {
	      var keys = o_keys(source);
	
	      for (var i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        target[key] = source[key] || target[key];
	      }
	    }
	
	    function _copyArray(source, target) {
	      for (var i = 0, l = source.length; i < l; i++) {
	        target[i] = source[i];
	      }
	    }
	
	    function copyObject(source, _target) {
	        var isArray = Array.isArray(source);
	        var target = _target || (isArray ? new Array(source.length) : {});
	
	        if (isArray) {
	          _copyArray(source, target);
	        } else {
	          _copyObject(source, target);
	        }
	
	        return target;
	    }
	
	    /** Get the data based on key**/
	    Chance.prototype.get = function (name) {
	        return copyObject(data[name]);
	    };
	
	    // Mac Address
	    Chance.prototype.mac_address = function(options){
	        // typically mac addresses are separated by ":"
	        // however they can also be separated by "-"
	        // the network variant uses a dot every fourth byte
	
	        options = initOptions(options);
	        if(!options.separator) {
	            options.separator =  options.networkVersion ? "." : ":";
	        }
	
	        var mac_pool="ABCDEF1234567890",
	            mac = "";
	        if(!options.networkVersion) {
	            mac = this.n(this.string, 6, { pool: mac_pool, length:2 }).join(options.separator);
	        } else {
	            mac = this.n(this.string, 3, { pool: mac_pool, length:4 }).join(options.separator);
	        }
	
	        return mac;
	    };
	
	    Chance.prototype.normal = function (options) {
	        options = initOptions(options, {mean : 0, dev : 1});
	
	        // The Marsaglia Polar method
	        var s, u, v, norm,
	            mean = options.mean,
	            dev = options.dev;
	
	        do {
	            // U and V are from the uniform distribution on (-1, 1)
	            u = this.random() * 2 - 1;
	            v = this.random() * 2 - 1;
	
	            s = u * u + v * v;
	        } while (s >= 1);
	
	        // Compute the standard normal variate
	        norm = u * Math.sqrt(-2 * Math.log(s) / s);
	
	        // Shape and scale
	        return dev * norm + mean;
	    };
	
	    Chance.prototype.radio = function (options) {
	        // Initial Letter (Typically Designated by Side of Mississippi River)
	        options = initOptions(options, {side : "?"});
	        var fl = "";
	        switch (options.side.toLowerCase()) {
	        case "east":
	        case "e":
	            fl = "W";
	            break;
	        case "west":
	        case "w":
	            fl = "K";
	            break;
	        default:
	            fl = this.character({pool: "KW"});
	            break;
	        }
	
	        return fl + this.character({alpha: true, casing: "upper"}) +
	                this.character({alpha: true, casing: "upper"}) +
	                this.character({alpha: true, casing: "upper"});
	    };
	
	    // Set the data as key and data or the data map
	    Chance.prototype.set = function (name, values) {
	        if (typeof name === "string") {
	            data[name] = values;
	        } else {
	            data = copyObject(name, data);
	        }
	    };
	
	    Chance.prototype.tv = function (options) {
	        return this.radio(options);
	    };
	
	    // ID number for Brazil companies
	    Chance.prototype.cnpj = function () {
	        var n = this.n(this.natural, 8, { max: 9 });
	        var d1 = 2+n[7]*6+n[6]*7+n[5]*8+n[4]*9+n[3]*2+n[2]*3+n[1]*4+n[0]*5;
	        d1 = 11 - (d1 % 11);
	        if (d1>=10){
	            d1 = 0;
	        }
	        var d2 = d1*2+3+n[7]*7+n[6]*8+n[5]*9+n[4]*2+n[3]*3+n[2]*4+n[1]*5+n[0]*6;
	        d2 = 11 - (d2 % 11);
	        if (d2>=10){
	            d2 = 0;
	        }
	        return ''+n[0]+n[1]+'.'+n[2]+n[3]+n[4]+'.'+n[5]+n[6]+n[7]+'/0001-'+d1+d2;
	    };
	
	    // -- End Miscellaneous --
	
	    Chance.prototype.mersenne_twister = function (seed) {
	        return new MersenneTwister(seed);
	    };
	
	    // Mersenne Twister from https://gist.github.com/banksean/300494
	    var MersenneTwister = function (seed) {
	        if (seed === undefined) {
	            seed = new Date().getTime();
	        }
	        /* Period parameters */
	        this.N = 624;
	        this.M = 397;
	        this.MATRIX_A = 0x9908b0df;   /* constant vector a */
	        this.UPPER_MASK = 0x80000000; /* most significant w-r bits */
	        this.LOWER_MASK = 0x7fffffff; /* least significant r bits */
	
	        this.mt = new Array(this.N); /* the array for the state vector */
	        this.mti = this.N + 1; /* mti==N + 1 means mt[N] is not initialized */
	
	        this.init_genrand(seed);
	    };
	
	    /* initializes mt[N] with a seed */
	    MersenneTwister.prototype.init_genrand = function (s) {
	        this.mt[0] = s >>> 0;
	        for (this.mti = 1; this.mti < this.N; this.mti++) {
	            s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
	            this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;
	            /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
	            /* In the previous versions, MSBs of the seed affect   */
	            /* only MSBs of the array mt[].                        */
	            /* 2002/01/09 modified by Makoto Matsumoto             */
	            this.mt[this.mti] >>>= 0;
	            /* for >32 bit machines */
	        }
	    };
	
	    /* initialize by an array with array-length */
	    /* init_key is the array for initializing keys */
	    /* key_length is its length */
	    /* slight change for C++, 2004/2/26 */
	    MersenneTwister.prototype.init_by_array = function (init_key, key_length) {
	        var i = 1, j = 0, k, s;
	        this.init_genrand(19650218);
	        k = (this.N > key_length ? this.N : key_length);
	        for (; k; k--) {
	            s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
	            this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525))) + init_key[j] + j; /* non linear */
	            this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
	            i++;
	            j++;
	            if (i >= this.N) { this.mt[0] = this.mt[this.N - 1]; i = 1; }
	            if (j >= key_length) { j = 0; }
	        }
	        for (k = this.N - 1; k; k--) {
	            s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
	            this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941)) - i; /* non linear */
	            this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */
	            i++;
	            if (i >= this.N) { this.mt[0] = this.mt[this.N - 1]; i = 1; }
	        }
	
	        this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
	    };
	
	    /* generates a random number on [0,0xffffffff]-interval */
	    MersenneTwister.prototype.genrand_int32 = function () {
	        var y;
	        var mag01 = new Array(0x0, this.MATRIX_A);
	        /* mag01[x] = x * MATRIX_A  for x=0,1 */
	
	        if (this.mti >= this.N) { /* generate N words at one time */
	            var kk;
	
	            if (this.mti === this.N + 1) {   /* if init_genrand() has not been called, */
	                this.init_genrand(5489); /* a default initial seed is used */
	            }
	            for (kk = 0; kk < this.N - this.M; kk++) {
	                y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk + 1]&this.LOWER_MASK);
	                this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
	            }
	            for (;kk < this.N - 1; kk++) {
	                y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk + 1]&this.LOWER_MASK);
	                this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
	            }
	            y = (this.mt[this.N - 1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
	            this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];
	
	            this.mti = 0;
	        }
	
	        y = this.mt[this.mti++];
	
	        /* Tempering */
	        y ^= (y >>> 11);
	        y ^= (y << 7) & 0x9d2c5680;
	        y ^= (y << 15) & 0xefc60000;
	        y ^= (y >>> 18);
	
	        return y >>> 0;
	    };
	
	    /* generates a random number on [0,0x7fffffff]-interval */
	    MersenneTwister.prototype.genrand_int31 = function () {
	        return (this.genrand_int32() >>> 1);
	    };
	
	    /* generates a random number on [0,1]-real-interval */
	    MersenneTwister.prototype.genrand_real1 = function () {
	        return this.genrand_int32() * (1.0 / 4294967295.0);
	        /* divided by 2^32-1 */
	    };
	
	    /* generates a random number on [0,1)-real-interval */
	    MersenneTwister.prototype.random = function () {
	        return this.genrand_int32() * (1.0 / 4294967296.0);
	        /* divided by 2^32 */
	    };
	
	    /* generates a random number on (0,1)-real-interval */
	    MersenneTwister.prototype.genrand_real3 = function () {
	        return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
	        /* divided by 2^32 */
	    };
	
	    /* generates a random number on [0,1) with 53-bit resolution*/
	    MersenneTwister.prototype.genrand_res53 = function () {
	        var a = this.genrand_int32()>>>5, b = this.genrand_int32()>>>6;
	        return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
	    };
	
	
	    // CommonJS module
	    if (true) {
	        if (typeof module !== 'undefined' && module.exports) {
	            exports = module.exports = Chance;
	        }
	        exports.Chance = Chance;
	    }
	
	    // Register as an anonymous AMD module
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return Chance;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	
	    // if there is a importsScrips object define chance for worker
	    if (typeof importScripts !== 'undefined') {
	        chance = new Chance();
	    }
	
	    // If there is a window object, that at least has a document property,
	    // instantiate and define chance on the window
	    if (typeof window === "object" && typeof window.document === "object") {
	        window.Chance = Chance;
	        window.chance = new Chance();
	    }
	})();
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(162).Buffer))

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React  = __webpack_require__(1)
	  , $ = __webpack_require__(146);
	
	
	var PopupContent = React.createClass({displayName: 'PopupContent',
	  render: function(){
	    var Content = React.Children.only(this.props.children)
	
	    Content.props.className = (Content.props.className || '') + ' rw-popup rw-widget';
	
	    return Content
	  }
	})
	
	
	module.exports = React.createClass({displayName: 'exports',
	
		propTypes: {
	    duration:       React.PropTypes.number,
	    onRequestClose: React.PropTypes.func.isRequired,
	    onClosing:      React.PropTypes.func,
	    onOpening:      React.PropTypes.func,
	    onClose:        React.PropTypes.func,
	    onOpen:         React.PropTypes.func
		},
	
	  getDefaultProps: function(){
	    return {
	      duration:    200,
	      open:        false,
	      onClosing:   function(){},
	      onOpening:   function(){},
	      onClose:     function(){},
	      onOpen:      function(){},
	    }
	  },
	
		componentDidMount: function(){
	    !this.props.open && this.close(0)
		},
	
	  componentWillReceiveProps: function(nextProps) {
	    this.setState({
	      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
	    })
	  },
	
	  componentDidUpdate: function(pvProps, pvState){
	    var closing =  pvProps.open && !this.props.open
	      , opening = !pvProps.open && this.props.open;
	
	    if (opening)      this.open()
	    else if (closing) this.close()
	  },
	
		render: function(){
	    var $__0=      this.props,className=$__0.className,open=$__0.open,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,open:1})
	
			return (
	      React.createElement("div", React.__spread({},  props, {className:  (className ||'') + " rw-popup-container"}), 
	        React.createElement(PopupContent, {ref: "content"}, 
	           this.props.children
	        )
	      )
			)
		},
	
	  dimensions: function(){
	    var el = this.getDOMNode();
	
	    el.style.display = 'block'
	    el.style.height  = $.height(this.refs.content.getDOMNode()) + 'px'
	  },
	
	  open: function(){
	    var self = this
	      , anim = this.getDOMNode()
	      , el   = this.refs.content.getDOMNode();
	
	    this.ORGINAL_POSITION = $.css(el, 'position')
	
	    this._isOpening = true
	    this.dimensions()
	    this.props.onOpening()
	
	    el.style.position = 'absolute'
	
	    $.animate(el
	      , { top: 0 }
	      , self.props.duration
	      , 'ease'
	      , function(){
	          if ( !self._isOpening ) return
	          el.style.position = self.ORGINAL_POSITION
	          anim.style.overflow = 'visible'
	          self.ORGINAL_POSITION = null
	          self.props.onOpen()
	        })
	  },
	
	  close: function(dur){
	    var self = this
	      , el   = this.refs.content.getDOMNode()
	      , anim = this.getDOMNode();
	
	    this.ORGINAL_POSITION = $.css(el, 'position')
	
	    this._isOpening = false
	    this.dimensions()
	    this.props.onClosing()
	
	    anim.style.overflow = 'hidden'
	    el.style.position = 'absolute'
	
	    $.animate(el
	      , { top: '-100%' }
	      , dur === undefined ? this.props.duration : dur
	      , 'ease'
	      , function() {
	          if ( self._isOpening ) return
	          el.style.position = self.ORGINAL_POSITION
	
	          anim.style.display = 'none'
	          self.ORGINAL_POSITION = null
	          self.props.onClose()
	        })
	  }
	
	})
	
	
	function childKey(children){
	  var nextChildMapping = React.Children.map(children, function(c)  {return c;} );
	  for(var key in nextChildMapping) return key
	}

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React   = __webpack_require__(1)
	  , CustomPropTypes  = __webpack_require__(140)
	  , cx = __webpack_require__(138)
	  , _  = __webpack_require__(137);
	
	
	module.exports = React.createClass({
	
	  displayName: 'List',
	
	  mixins: [ 
	    __webpack_require__(147),
	    __webpack_require__(149),
	    __webpack_require__(155)
	  ],
	
	  propTypes: {
	    data:          React.PropTypes.array,
	    onSelect:      React.PropTypes.func,
	    onMove:        React.PropTypes.func,
	    itemComponent: CustomPropTypes.elementType,
	
	    selectedIndex: React.PropTypes.number,
	    focusedIndex:  React.PropTypes.number,
	    valueField:    React.PropTypes.string,
	    textField:     React.PropTypes.string,
	
	    optID:         React.PropTypes.string,
	
	    messages:      React.PropTypes.shape({
	      emptyList:   React.PropTypes.string
	    }),
	  },
	
	
	  getDefaultProps: function(){
	    return {
	      optID:         '',
	      onSelect:      function(){},
	      data:          [],
	      messages: {
	        emptyList:   "There are no items in this list"
	      }
	    }
	  },
	
	  getInitialState:function(){
	    return {}
	  },
	
	
	  componentDidMount:function(){
	    this._setScrollPosition()
	  },
	
	  componentDidUpdate:function(prevProps){
	    if ( prevProps.focused !== this.props.focused)
	      this._setScrollPosition()
	  },
	
		render:function(){
	    var $__0=     _.omit(this.props, ['data']),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , ItemComponent = this.props.itemComponent
	      , items;
	    
	    items = !this.props.data.length 
	      ? React.createElement("li", null,  this.props.messages.emptyList)
	      : this.props.data.map(function(item, idx) {
	          var focused  = item === this.props.focused 
	            , selected = item === this.props.selected;
	
	          return (React.createElement("li", {
	            key: 'item_' + idx, 
	            role: "option", 
	            id:  focused ? this.props.optID : undefined, 
	            'aria-selected': selected, 
	            className: cx({ 
	              'rw-list-option':    true,
	              'rw-state-focus':    focused,
	              'rw-state-selected': selected,
	            }), 
	            onClick: this.props.onSelect.bind(null, item)}, 
	             ItemComponent
	                ? React.createElement(ItemComponent, {item: item})
	                : this._dataText(item)
	            
	          ))
	        }.bind(this));
	    
			return (
				React.createElement("ul", React.__spread({},   props , 
	        {className:  (className || '') + ' rw-list', 
	        ref: "scrollable", 
	        role: "listbox"}), 
	          items 
				)
			)
		},
	
	
	  _data:function(){ 
	    return this.props.data 
	  },
	
	  _setScrollPosition: function(){
	    var list = this.getDOMNode()
	      , idx  = this._data().indexOf(this.props.focused)
	      , selected = list.children[idx];
	
	    if( !selected ) return 
	
	    this.notify('onMove', [selected, list])
	  }
	
	})


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React   = __webpack_require__(1)
	  , CustomPropTypes  = __webpack_require__(140)
	  , cx = __webpack_require__(138)
	  , _  = __webpack_require__(137);
	
	
	module.exports = React.createClass({
	
	  displayName: 'List',
	
	  mixins: [ 
	    __webpack_require__(147),
	    __webpack_require__(149),
	    __webpack_require__(155)
	  ],
	
	  propTypes: {
	    data:           React.PropTypes.array,
	    onSelect:       React.PropTypes.func,
	    onMove:         React.PropTypes.func,
	
	    itemComponent:  CustomPropTypes.elementType,
	    groupComponent: CustomPropTypes.elementType,
	
	    selected:       React.PropTypes.any,
	    focused:        React.PropTypes.any,
	
	    valueField:     React.PropTypes.string,
	    textField:      React.PropTypes.string,
	 
	    optID:          React.PropTypes.string,
	
	    groupBy:        React.PropTypes.oneOfType([
	                     React.PropTypes.func,
	                     React.PropTypes.string
	                    ]),
	
	    messages:       React.PropTypes.shape({
	      emptyList:    React.PropTypes.string
	    }),
	  },
	
	
	  getDefaultProps: function(){
	    return {
	      optID:         '',
	      onSelect:      function(){},
	      data:          [],
	      messages: {
	        emptyList:   "There are no items in this list"
	      }
	    }
	  },
	
	  getInitialState: function() {
	    var keys = [];
	
	    return {
	      groups: this._group(this.props.groupBy, this.props.data, keys),
	
	      sortedKeys: keys
	    };
	  },
	
	  componentWillReceiveProps:function(nextProps) {
	    var keys = [];
	
	    if(nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy)
	      this.setState({ 
	        groups: this._group(nextProps.groupBy, nextProps.data, keys),
	        sortedKeys: keys
	      })
	  },
	
	  componentDidMount:function(prevProps, prevState){
	    this._setScrollPosition()
	  },
	
	  componentDidUpdate:function(prevProps){
	    if ( prevProps.focused !== this.props.focused)
	      this._setScrollPosition()
	  },
	
	  render: function(){
	    var $__0= 
	        
	          _.omit(this.props, ['data', 'selectedIndex']),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , groups = this.state.groups
	      , items = []
	      , idx = -1
	      , group;
	    
	    if ( this.props.data.length ){
	      items = this.state.sortedKeys
	        .reduce( function(items, key)  {
	          group = groups[key]
	          items.push(this._renderGroupHeader(key))
	
	          for (var itemIdx = 0; itemIdx < group.length; itemIdx++) 
	            items.push(
	              this._renderItem(key, group[itemIdx], ++idx))
	
	          return items
	        }.bind(this), [])
	    }
	    else 
	      items = React.createElement("li", null,  this.props.messages.emptyList)
	
	    return (
	      React.createElement("ul", React.__spread({},   props , 
	        {className:  (className || '') + ' rw-list  rw-list-grouped', 
	        ref: "scrollable", 
	        role: "listbox"}), 
	        items 
	      )
	    )
	  },
	
	  _renderGroupHeader:function(group){
	    var ItemComponent = this.props.groupComponent;
	
	    return (React.createElement("li", {
	      key: 'item_' + group, 
	      tabIndex: "-1", 
	      role: "separator", 
	      className: "rw-list-optgroup"}, 
	         ItemComponent ? React.createElement(ItemComponent, {item: group}) : group
	    ))
	  },
	
	  _renderItem:function(group, item, idx){
	    var focused  = this.props.focused  === item
	      , selected = this.props.selected === item
	      , ItemComponent = this.props.itemComponent;
	
	    //console.log('hi')
	    return (
	      React.createElement("li", {
	        key: 'item_' + group + '_' + idx, 
	        role: "option", 
	        id:  focused ? this.props.optID : undefined, 
	        'aria-selected': selected, 
	        onClick: this.props.onSelect.bind(null, item), 
	        className: cx({ 
	          'rw-state-focus':    focused,
	          'rw-state-selected': selected,
	          'rw-list-option':    true
	        })}, 
	           ItemComponent
	              ? React.createElement(ItemComponent, {item: item})
	              : this._dataText(item)
	          
	      ))
	  },
	
	  _isIndexOf:function(idx, item){
	    return this.props.data[idx] === item
	  },
	
	  _group:function(groupBy, data, keys){
	    var iter = typeof groupBy === 'function' ? groupBy : function(item)  {return item[groupBy];}
	
	    // the keys array ensures that groups are rendered in the order they came in
	    // which means that if you sort the data array it will render sorted, 
	    // so long as you also sorted by group
	    keys = keys || []
	
	    return data.reduce( function(grps, item)  {
	      var group = iter(item);
	
	      _.has(grps, group) 
	        ? grps[group].push(item)
	        : (keys.push(group), grps[group] = [item])
	
	      return grps
	    }, {}) 
	  },
	
	  _data:function(){ 
	    var groups = this.state.groups;
	
	    return this.state.sortedKeys
	      .reduce( function(flat, grp)  {return flat.concat(groups[grp]);}, [])
	  },
	
	  _setScrollPosition: function(){
	    var selected = this.getItemDOMNode(this.props.focused);
	
	    if( !selected ) return 
	
	    this.notify('onMove', [ selected, this.getDOMNode() ])
	  },
	
	  getItemDOMNode:function(item){
	    var list = this.getDOMNode()
	      , groups = this.state.groups
	      , idx = -1
	      , itemIdx, child;
	
	    this.state.sortedKeys.some(function(group)  {
	      itemIdx = groups[group].indexOf(item)
	      idx++;
	
	      if( itemIdx !== -1) 
	        return !!(child = list.children[idx + itemIdx + 1])
	
	      idx += groups[group].length
	    })
	
	    return child
	  }
	
	})

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1);
	
	module.exports = React.createClass({displayName: 'exports',
	
	  render: function(){
	  	var $__0=     this.props,className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});
	
	    return (
	      React.createElement("button", React.__spread({},  props, {type: "button", className: (className  || '') + ' rw-btn'}), 
	        this.props.children
	      )
	  	)
	  }
	})

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , caretPos = __webpack_require__(156);
	
	module.exports = React.createClass({displayName: 'exports',
	
	  propTypes: {
	    value:        React.PropTypes.string,
	    onChange:     React.PropTypes.func.isRequired
	  },
	
	
	  // hello
	  componentDidUpdate: function() {
	    var input = this.getDOMNode()
	      , val = this.props.value;
	
	    if ( this.isSuggesting() ){
	      var start = val.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length
	        , end   = val.length - start
	
	      if ( start >= 0) {
	        caretPos(input, start, start + end)
	      }
	    }
	  },
	
	  getDefaultProps: function(){
	    return {
	      value: ''
	    }
	  },
	
	  render: function(){
	    return (
	      React.createElement("input", React.__spread({},  
	        this.props , 
	        {type: "text", 
	        className: this.props.className + ' rw-input', 
	        onKeyDown: this.props.onKeyDown, 
	        onChange: this._change, 
	        value: this.props.value == null ? '' : this.props.value}))
	    )
	  },
	
	  isSuggesting: function(){
	    var val = this.props.value
	      , isSuggestion = this._last != null
	          && val.toLowerCase().indexOf(this._last.toLowerCase()) !== -1;
	
	    return this.props.suggest && isSuggestion
	  },
	
	  accept: function(removeCaret){
	    var val = this.getDOMNode().value || ''
	      , end = val.length;
	
	    this._last = null
	    removeCaret && caretPos(this.getDOMNode(), end, end)
	  },
	
	  _change: function(e){
	    var val = e.target.value
	    this._last = val;
	    this.props.onChange(e, val)
	  },
	
	  focus: function(){
	    this.getDOMNode().focus()
	  }
	});


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Btn = __webpack_require__(123);
	
	module.exports = React.createClass({displayName: 'exports',
	
	  propTypes: {
	    label:          React.PropTypes.string.isRequired,
	    labelId:        React.PropTypes.string,
	
	    upDisabled:     React.PropTypes.bool.isRequired,
	    prevDisabled:   React.PropTypes.bool.isRequired,
	    nextDisabled:   React.PropTypes.bool.isRequired,
	    onViewChange:   React.PropTypes.func.isRequired,
	    onMoveLeft:     React.PropTypes.func.isRequired,
	    onMoveRight:    React.PropTypes.func.isRequired,
	
	    messages:       React.PropTypes.shape({
	      moveBack:     React.PropTypes.string,
	      moveForward:  React.PropTypes.string
	    })
	  },
	
	  mixins: [
	    __webpack_require__(148),
	    __webpack_require__(157)
	  ],
	
	  getDefaultProps: function(){
	    return {
	      messages: {
	        moveBack:     'navigate back',
	        moveForward:  'navigate forward',
	      }
	    }
	  },
	
	  render: function(){
	    var rtl = this.isRtl();
	
	    return (
	      React.createElement("div", {className: "rw-header"}, 
	        React.createElement(Btn, {className: "rw-btn-left", 
	          tabIndex: "-1", 
	          onClick: this.props.onMoveLeft, 
	          disabled: this.props.prevDisabled, 
	          'aria-disabled': this.props.prevDisabled, 
	          title: this.props.moveBack}, 
	          React.createElement("i", {className: "rw-i rw-i-caret-" + (rtl ? 'right' : 'left')}, 
	            React.createElement("span", {className: "rw-sr"}, this.props.moveBack))
	        ), 
	        React.createElement(Btn, {className: "rw-btn-view", 
	          id: this.props.labelId, 
	          tabIndex: "-1", 
	          onClick: this.props.onViewChange, 
	          disabled: this.props.upDisabled, 
	          'aria-disabled': this.props.upDisabled}, 
	           this.props.label
	        ), 
	        React.createElement(Btn, {className: "rw-btn-right", 
	          tabIndex: "-1", 
	          onClick: this.props.onMoveRight, 
	          disabled: this.props.nextDisabled, 
	          'aria-disabled': this.props.nextDisabled, 
	          title: this.props.moveForward}, 
	          React.createElement("i", {className: "rw-i rw-i-caret-" + (rtl ? 'left' : 'right')}, 
	            React.createElement("span", {className: "rw-sr"}, this.props.moveForward))
	        )
	      )
	    )
	  }
	})

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , cx    = __webpack_require__(138)
	  , dates = __webpack_require__(143)
	  , directions = __webpack_require__(144).directions
	  , _   = __webpack_require__(137)
	  , Btn = __webpack_require__(123);
	
	var opposite = {
	  LEFT: directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	module.exports = React.createClass({
	
	  displayName: 'MonthView',
	
	  mixins: [
	    __webpack_require__(147),
	    __webpack_require__(157),
	    __webpack_require__(158)('month', 'day'),
	  ],
	
	  propTypes: {
	    culture:          React.PropTypes.string,
	    value:            React.PropTypes.instanceOf(Date),
	    selectedDate:     React.PropTypes.instanceOf(Date),
	    min:              React.PropTypes.instanceOf(Date),
	    max:              React.PropTypes.instanceOf(Date),
	
	    format:           React.PropTypes.string,
	
	    onChange:         React.PropTypes.func.isRequired, //value is chosen
	    onMoveLeft:       React.PropTypes.func,
	    onMoveRight:      React.PropTypes.func
	  },
	
	  render: function(){
	    var props = _.omit(this.props, ['max', 'min', 'value', 'onChange'])
	      , month = dates.visibleDays(this.props.value)
	      , rows  = _.chunk(month, 7 );
	
	    return (
	      React.createElement("table", React.__spread({},  props, 
	        {role: "grid", 
	        className: "rw-calendar-grid", 
	        'aria-activedescendant': this._id('_selected_item'), 
	        onKeyUp: this._keyUp}), 
	        React.createElement("thead", null, 
	          React.createElement("tr", null,  this._headers() )
	        ), 
	        React.createElement("tbody", null, 
	           rows.map(this._row)
	        )
	      )
	    )
	  },
	
	  _row: function(row, i){
	    var id = this._id('_selected_item')
	    
	    return (
	      React.createElement("tr", {key: 'week_' + i, role: "row"}, 
	       row.map( function(day, idx)  {
	        var focused  = dates.eq(day, this.state.focusedDate, 'day')
	          , selected = dates.eq(day, this.props.selectedDate, 'day');
	
	        return !dates.inRange(day, this.props.min, this.props.max)
	            ? React.createElement("td", {key: 'day_' + idx, role: "gridcell", className: "rw-empty-cell"}, " ")
	            : (React.createElement("td", {key: 'day_' + idx, role: "gridcell"}, 
	                React.createElement(Btn, {
	                  tabIndex: "-1", 
	                  onClick: this.props.onChange.bind(null, day), 
	                  'aria-selected': selected, 
	                  'aria-disabled': this.props.disabled, 
	                  disabled: this.props.disabled, 
	                  className: cx({
	                    'rw-off-range':      dates.month(day) !== dates.month(this.state.focusedDate),
	                    'rw-state-focus':    focused,
	                    'rw-state-selected': selected,
	                  }), 
	                  id: focused ? id : undefined}, 
	                  dates.format(day, 'dd', this.props.culture)
	                )
	              ))
	      }.bind(this))
	      )
	    )
	  },
	
	
	  _headers: function(format){
	    var days = dates.shortDaysOfWeek(this.props.culture);
	
	    return days.map( function(day, i)  
	      {return React.createElement("th", {key: "header_" + i}, day);})
	  },
	
	  move: function(date, direction){
	    var min = this.props.min
	      , max = this.props.max;
	
	    if ( this.isRtl() && opposite[direction])
	      direction =  opposite[direction]
	
	    if ( direction === directions.LEFT)
	      date = nextDate(date, -1, 'day', min, max)
	
	    else if ( direction === directions.RIGHT)
	      date = nextDate(date, 1, 'day',min, max)
	
	    else if ( direction === directions.UP)
	      date = nextDate(date, -1, 'week', min, max)
	
	    else if ( direction === directions.DOWN)
	      date = nextDate(date, 1, 'week', min, max)
	
	    return date
	  }
	
	});
	
	function nextDate(date, val, unit, min, max){
	  var newDate = dates.add(date, val, unit)
	
	  return dates.inRange(newDate, min, max, 'day') ? newDate : date
	}


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React      = __webpack_require__(1)
	  , cx         = __webpack_require__(138)
	  , dates      = __webpack_require__(143)
	  , directions = __webpack_require__(144).directions
	  , Btn        = __webpack_require__(123)
	  , _          = __webpack_require__(137)
	
	var opposite = {
	  LEFT: directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	module.exports = React.createClass({
	
	  displayName: 'YearView',
	
	  mixins: [
	    __webpack_require__(147),
	    __webpack_require__(157),
	    __webpack_require__(158)('year', 'month')
	  ],
	
	  propTypes: {
	    culture:      React.PropTypes.string,
	    value:        React.PropTypes.instanceOf(Date),
	    min:          React.PropTypes.instanceOf(Date),
	    max:          React.PropTypes.instanceOf(Date),
	    onChange:     React.PropTypes.func.isRequired
	  },
	
	
	  render: function(){
	    var props =  _.omit(this.props, ['max', 'min', 'value', 'onChange'])
	      , months = dates.monthsInYear(dates.year(this.props.value))
	      , rows = _.chunk(months, 4);
	
	    return (
	      React.createElement("table", React.__spread({},   props , 
	        {tabIndex: this.props.disabled ? '-1' : "0", 
	        ref: "table", 
	        role: "grid", 
	        className: "rw-calendar-grid rw-nav-view", 
	        'aria-activedescendant': this._id('_selected_item'), 
	        onKeyUp: this._keyUp}), 
	        React.createElement("tbody", null, 
	           rows.map(this._row)
	        )
	      )
	    )
	  },
	
	  _row: function(row, i){
	    var id = this._id('_selected_item');
	    
	    return (
	      React.createElement("tr", {key: i, role: "row"}, 
	       row.map( function(date, i)  {
	        var focused  = dates.eq(date, this.state.focusedDate,  'month')
	          , selected = dates.eq(date, this.props.value,  'month');
	
	        return dates.inRange(date, this.props.min, this.props.max, 'month')
	          ? (React.createElement("td", {key: i, role: "gridcell"}, 
	              React.createElement(Btn, {onClick: this.props.onChange.bind(null, date), tabIndex: "-1", 
	                id: focused ? id : undefined, 
	                'aria-selected': selected, 
	                'aria-disabled': this.props.disabled, 
	                disabled: this.props.disabled, 
	                className: cx({
	                  'rw-state-focus':    focused,
	                  'rw-state-selected': selected
	                })}, 
	                 dates.format(date, dates.formats.MONTH_NAME_ABRV, this.props.culture) 
	              )
	            ))
	          : React.createElement("td", {key: i, className: "rw-empty-cell", role: "gridcell"}, " ")
	      }.bind(this))
	    ))
	  },
	
	  focus: function(){
	    this.refs.table.getDOMNode().focus();
	  },
	
	  move: function(date, direction){
	    var min = this.props.min
	      , max = this.props.max;
	
	    if ( this.isRtl() && opposite[direction])
	      direction =  opposite[direction]
	
	    if ( direction === directions.LEFT)
	      date = nextDate(date, -1, 'month', min, max)
	
	    else if ( direction === directions.RIGHT)
	      date = nextDate(date, 1, 'month', min, max)
	
	    else if ( direction === directions.UP)
	      date = nextDate(date, -4, 'month', min, max)
	
	    else if ( direction === directions.DOWN)
	      date = nextDate(date, 4, 'month', min, max)
	
	    return date
	  }
	
	});
	
	function nextDate(date, val, unit, min, max){
	  var newDate = dates.add(date, val, unit)
	  return dates.inRange(newDate, min, max, 'month') ? newDate : date
	}


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , _ = __webpack_require__(137)
	  , cx    = __webpack_require__(138)
	  , dates = __webpack_require__(143)
	  , directions = __webpack_require__(144).directions
	  , Btn = __webpack_require__(123); 
	
	var opposite = {
	  LEFT: directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	
	module.exports = React.createClass({
	
	  displayName: 'DecadeView',
	
	  mixins: [
	    __webpack_require__(147),
	    __webpack_require__(148),
	    __webpack_require__(157),
	    __webpack_require__(158)('decade', 'year')
	  ],
	
	  propTypes: {
	    culture:      React.PropTypes.string,
	    
	    value:        React.PropTypes.instanceOf(Date),
	    min:          React.PropTypes.instanceOf(Date),
	    max:          React.PropTypes.instanceOf(Date),
	    onChange:     React.PropTypes.func.isRequired
	  },
	
	  render: function(){
	    var props = _.omit(this.props, ['max', 'min', 'value', 'onChange'])
	      , years = getDecadeYears(this.props.value)
	      , rows  = _.chunk(years, 4)
	
	    return (
	      React.createElement("table", React.__spread({},  props, 
	        {tabIndex: this.props.disabled ? '-1' : "0", 
	        role: "grid", 
	        className: "rw-calendar-grid rw-nav-view", 
	        'aria-activedescendant': this._id('_selected_item'), 
	        onKeyUp: this._keyUp}), 
	
	        React.createElement("tbody", null, 
	          rows.map(this._row)
	        )
	      )
	    )
	  },
	
	  _row: function(row, i){
	    var id = this._id('_selected_item')
	
	    return (
	      React.createElement("tr", {key: 'row_' + i, role: "row"}, 
	       row.map( function(date, i)  {
	        var focused  = dates.eq(date, this.state.focusedDate,  'year')
	          , selected = dates.eq(date, this.props.value,  'year');
	
	        return !dates.inRange(date, this.props.min, this.props.max, 'year')
	          ? React.createElement("td", {key: i, role: "gridcell", className: "rw-empty-cell"}, " ")
	          : (React.createElement("td", {key: i, role: "gridcell"}, 
	              React.createElement(Btn, {onClick: this.props.onChange.bind(null, date), tabIndex: "-1", 
	                id:  focused ? id : undefined, 
	                'aria-selected': selected, 
	                'aria-disabled': this.props.disabled, 
	                disabled: this.props.disabled, 
	                className: cx({
	                  'rw-off-range':      !inDecade(date, this.props.value),
	                  'rw-state-focus':    focused,
	                  'rw-state-selected': selected,
	                })}, 
	                 dates.format(date, dates.formats.YEAR, this.props.culture) 
	              )
	            ))
	      }.bind(this))
	    ))
	  },
	
	  move: function(date, direction){
	    var min = this.props.min
	      , max = this.props.max;
	
	    if ( this.isRtl() && opposite[direction])
	      direction =  opposite[direction]
	
	    if ( direction === directions.LEFT)
	      date = nextDate(date, -1, 'year', min, max)
	
	    else if ( direction === directions.RIGHT)
	      date = nextDate(date, 1, 'year', min, max)
	
	    else if ( direction === directions.UP)
	      date = nextDate(date, -4, 'year', min, max)
	
	    else if ( direction === directions.DOWN)
	      date = nextDate(date, 4, 'year', min, max)
	
	    return date
	  }
	
	});
	
	function inDecade(date, start){
	  return dates.gte(date, dates.startOf(start, 'decade'), 'year')
	      && dates.lte(date, dates.endOf(start,'decade'),  'year')
	}
	
	function getDecadeYears(_date){
	  var days = [1,2,3,4,5,6,7,8,9,10,11,12]
	    , date = dates.add(dates.startOf(_date, 'decade'), -2, 'year')
	
	  return days.map( 
	    function(i)  {return date = dates.add(date, 1, 'year');})
	}
	
	function nextDate(date, val, unit, min, max){
	  var newDate = dates.add(date, val, unit)
	  return dates.inRange(newDate, min, max, 'year') ? newDate : date
	}


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React      = __webpack_require__(1)
	  , cx         = __webpack_require__(138)
	  , dates      = __webpack_require__(143)
	  , directions = __webpack_require__(144).directions
	  , Btn        = __webpack_require__(123)
	  , _          = __webpack_require__(137); //omit
	
	var opposite = {
	  LEFT:  directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	
	module.exports = React.createClass({
	
	  displayName: 'CenturyView',
	
	  mixins: [
	    __webpack_require__(147),
	    __webpack_require__(148),
	    __webpack_require__(157),
	    __webpack_require__(158)('century', 'decade')
	  ],
	
	  propTypes: {
	    culture:      React.PropTypes.string,
	    value:        React.PropTypes.instanceOf(Date),
	    min:          React.PropTypes.instanceOf(Date),
	    max:          React.PropTypes.instanceOf(Date),
	
	    onChange:     React.PropTypes.func.isRequired
	  },
	
	  render: function(){
	    var props = _.omit(this.props,  ['max', 'min', 'value', 'onChange'])
	      , years = getCenturyDecades(this.props.value)
	      , rows  = _.chunk(years, 4);
	
	    return (
	      React.createElement("table", React.__spread({},  props, 
	        {tabIndex: this.props.disabled ? '-1' : "0", 
	        role: "grid", 
	        className: "rw-calendar-grid rw-nav-view", 
	        'aria-activedescendant': this._id('_selected_item'), 
	        onKeyUp: this._keyUp}), 
	        React.createElement("tbody", null, 
	           rows.map(this._row)
	        )
	      )
	    )
	  },
	
	  _row: function(row, i){
	    var id = this._id('_selected_item')
	
	    return (
	      React.createElement("tr", {key: 'row_' + i, role: "row"}, 
	       row.map( function(date, i)  {
	        var focused  = dates.eq(date,  this.state.focusedDate,  'decade')
	          , selected = dates.eq(date, this.props.value,  'decade')
	          , d        = inRangeDate(date, this.props.min, this.props.max);
	
	        return !inRange(date, this.props.min, this.props.max)
	          ? React.createElement("td", {key: i, role: "gridcell", className: "rw-empty-cell"}, " ")
	          : (React.createElement("td", {key: i, role: "gridcell"}, 
	              React.createElement(Btn, {onClick: this.props.onChange.bind(null, d), 
	                tabIndex: "-1", 
	                id:  focused ? id : undefined, 
	                'aria-selected': selected, 
	                'aria-disabled': this.props.disabled, 
	                disabled: this.props.disabled, 
	                className: cx({
	                  'rw-off-range':       !inCentury(date, this.props.value),
	                  'rw-state-focus':     focused,
	                  'rw-state-selected':  selected,
	                 })}, 
	                 label(date, this.props.culture) 
	              )
	            ))
	      }.bind(this))
	    ))
	  },
	
	
	  move: function(date, direction){
	    var min = this.props.min
	      , max = this.props.max;
	
	    if ( this.isRtl() && opposite[direction])
	      direction =  opposite[direction]
	
	    if ( direction === directions.LEFT)
	      date = nextDate(date, -1, 'decade', min, max)
	
	    else if ( direction === directions.RIGHT)
	      date = nextDate(date, 1, 'decade', min, max)
	
	    else if ( direction === directions.UP)
	      date = nextDate(date, -4, 'decade', min, max)
	
	    else if ( direction === directions.DOWN)
	      date = nextDate(date, 4, 'decade', min, max)
	
	    return date
	  }
	
	});
	
	function label(date, culture){
	  return dates.format(dates.startOf(date, 'decade'),    dates.formats.YEAR, culture)
	    + ' - ' + dates.format(dates.endOf(date, 'decade'), dates.formats.YEAR, culture)
	}
	
	function inRangeDate(decade, min, max){
	  return dates.max( dates.min(decade, max), min)
	}
	
	function inRange(decade, min, max){
	  return dates.gte(decade, dates.startOf(min, 'decade'), 'year')
	      && dates.lte(decade, dates.endOf(max, 'decade'),  'year')
	}
	
	function inCentury(date, start){
	  return dates.gte(date, dates.startOf(start, 'century'), 'year')
	      && dates.lte(date, dates.endOf(start, 'century'),  'year')
	}
	
	function getCenturyDecades(_date){
	  var days = [1,2,3,4,5,6,7,8,9,10,11,12]
	    , date = dates.add(dates.startOf(_date, 'century'), -20, 'year')
	
	  return days.map( function(i)  {return date = dates.add(date, 10, 'year');})
	}
	
	
	function nextDate(date, val, unit, min, max){
	  var newDate = dates.add(date, val, unit)
	  return dates.inRange(newDate, min, max, 'decade') ? newDate : date
	}


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , dates = __webpack_require__(143)
	  , List = __webpack_require__(121)
	  , CustomPropTypes  = __webpack_require__(140)
	  , _ = __webpack_require__(137) // omit
	
	
	module.exports = React.createClass({
	
	  displayName: 'TimeList',
	
	  propTypes: {
	    value:          React.PropTypes.instanceOf(Date),
	    min:            React.PropTypes.instanceOf(Date),
	    max:            React.PropTypes.instanceOf(Date),
	    step:           React.PropTypes.number,
	    itemComponent:  CustomPropTypes.elementType,
	    onSelect:       React.PropTypes.func,
	    preserveDate:   React.PropTypes.bool,
	    culture:        React.PropTypes.string,
	  },
	
	  getDefaultProps: function(){
	    return {
	      step:   30,
	      format: 't',
	      onSelect: function(){},
	      preserveDate: true,
	      delay: 300
	    }
	  },
	
	  getInitialState: function(){
	    var data = this._dates(this.props)
	      , focusedItem = this._closestDate(data, this.props.value);
	
	    return { 
	      focusedItem: focusedItem || data[0],
	      dates: data
	    }
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    var data = this._dates(nextProps)
	      , focusedItem = this._closestDate(data, this.props.value);
	
	    if ( nextProps.value !== this.props.value)
	      this.setState({ 
	        focusedItem: focusedItem || data[0],
	        dates: data
	      })
	  },
	
	  render: function(){
	    var times = this.state.dates
	      , date  = this._closestDate(times, this.props.value);
	
	    return (
	      React.createElement(List, React.__spread({},  _.omit(this.props, 'value'), 
	        {ref: "list", 
	        data: times, 
	        textField: "label", 
	        valueField: "date", 
	        selected: date, 
	        focused: this.state.focusedItem, 
	        itemComponent: this.props.itemComponent, 
	        onSelect: this.props.onSelect}))
	    )
	  },
	
	  _closestDate: function(times, date){
	    var roundTo = 1000 * 60 * this.props.step
	      , inst = null
	      , label;
	
	    if( !date) return null
	
	    date  = new Date(Math.floor(date.getTime() / roundTo) * roundTo)
	    label = dates.format(date, this.props.format, this.props.culture)
	
	    times.some( function(time)  {
	      if( time.label === label ) 
	        return (inst = time)
	    })
	
	    return inst
	  },
	
	  _data:function(){ 
	    return this.state.dates
	  },
	
	  _dates: function(props){
	    var times  = [], i = 0
	      , values = this._dateValues(props)
	      , start  = values.min
	      , startDay = dates.date(start);
	
	    // debugger;
	    while( i < 100 && (dates.date(start) === startDay && dates.lte(start, values.max) ) ) {
	      i++
	      times.push({ date: start, label: dates.format(start, props.format, props.culture) })
	      start = dates.add(start, props.step || 30, 'minutes')
	    }
	    return times
	  },
	
	  _dateValues: function(props){
	    var value = props.value || dates.today()
	      , useDate = props.preserveDate
	      , min = props.min
	      , max = props.max
	      , start, end;
	
	    //compare just the time regradless of whether they fall on the same day
	    if(!useDate) {
	      start = dates.startOf(dates.merge(new Date, min), 'minutes')
	      end   = dates.startOf(dates.merge(new Date, max), 'minutes')
	
	      if( dates.lte(end, start) && dates.gt(max, min, 'day'))
	        end = dates.tomorrow()
	
	      return {
	        min: start,
	        max: end
	      }
	    }
	
	    //date parts are equal
	    return {
	      min: dates.eq(value, min, 'day') ? min : dates.today(),
	      max: dates.eq(value, max, 'day') ? min : dates.tomorrow()
	    }
	
	  },
	
	  _keyDown: function(e){
	    var key = e.key
	      , character = String.fromCharCode(e.keyCode)
	      , focusedItem  = this.state.focusedItem
	      , list = this.refs.list;
	
	    if ( key === 'End' )
	      this.setState({ focusedItem: list.last() })
	
	    else if ( key === 'Home' )
	      this.setState({ focusedItem: list.first() })
	
	    else if ( key === 'Enter' )
	      this.props.onSelect(focusedItem)
	
	    else if ( key === 'ArrowDown' ) {
	      e.preventDefault()
	      this.setState({ focusedItem: list.next(focusedItem) })
	    }
	    else if ( key === 'ArrowUp' ) {
	      e.preventDefault()
	      this.setState({ focusedItem: list.prev(focusedItem) })
	    }
	    else {
	      e.preventDefault()
	
	      this.search(character, function(item)  {
	        this.setState({ focusedItem: item })
	      }.bind(this))
	    }
	  },
	
	  search: function(character, cb){
	    var word = ((this._searchTerm || '') + character).toLowerCase();
	      
	    clearTimeout(this._timer)
	    this._searchTerm = word 
	
	    this._timer = setTimeout(function()  {
	      var list = this.refs.list
	        , item = list.next(this.state.focusedItem, word);
	      
	      this._searchTerm = ''
	      if (item) cb(item)
	
	    }.bind(this), this.props.delay)
	  },
	
	});


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , cx = __webpack_require__(138)
	  , dates = __webpack_require__(143);
	
	module.exports = React.createClass({
	
	  displayName: 'DatePickerInput',
	
	
	  propTypes: {
	    format:       React.PropTypes.string,
	    parse:        React.PropTypes.func.isRequired,
	
	    value:        React.PropTypes.instanceOf(Date),
	    onChange:     React.PropTypes.func.isRequired,
	    culture:      React.PropTypes.string,
	  },
	
	  getDefaultProps: function(){
	    return {
	      textValue: ''
	    }
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    this.setState({
	      textValue: formatDate(
	            nextProps.value
	          , nextProps.editing && nextProps.editFormat 
	              ? nextProps.editFormat 
	              : nextProps.format
	          , nextProps.culture)
	    })
	  },
	
	  getInitialState: function(){
	    var text = formatDate(
	            this.props.value
	          , this.props.editing && this.props.editFormat 
	              ? this.props.editFormat 
	              : this.props.format
	          , this.props.culture)
	
	    this.lastValue = text
	    return {
	      textValue: text
	    }
	  },
	
	  render: function(){
	    var value = this.state.textValue
	
	    return (
	      React.createElement("input", React.__spread({},  
	        this.props, 
	        {type: "text", 
	        className: cx({'rw-input': true }), 
	        value: value, 
	        'aria-disabled': this.props.disabled, 
	        'aria-readonly': this.props.readOnly, 
	        disabled: this.props.disabled, 
	        readOnly: this.props.readOnly, 
	        onChange: this._change, 
	        onBlur: chain(this.props.blur, this._blur, this)}))
	    )
	  },
	
	  _change: function(e){
	    this.setState({ textValue: e.target.value });
	  },
	
	  _blur: function(e){
	    var val = e.target.value 
	    
	    //console.log('blur', val, e.target, '\nlast', this.lastValue)
	
	    if ( val === this.lastValue) return
	
	    this.lastValue = val;
	    this.props.onChange(this.props.parse(val), val);
	    
	  },
	
	  focus: function(){
	    this.getDOMNode().focus()
	  }
	
	});
	
	function isValid(d) {
	  return !isNaN(d.getTime());
	}
	
	function formatDate(date, format, culture){
	  var val = ''
	
	  if ( (date instanceof Date) && isValid(date) )
	    val = dates.format(date, format, culture)
	
	  return val;
	}
	
	function chain(a,b, thisArg){
	  return function(){
	    a && a.apply(thisArg, arguments)
	    b && b.apply(thisArg, arguments)
	  }
	}

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React   = __webpack_require__(1)
	  , setter  = __webpack_require__(159)
	  , globalize = __webpack_require__(166);
	
	
	module.exports = React.createClass({
	
	  displayName: 'NumberPickerInput', 
	
	  propTypes: {
	    value:        React.PropTypes.number,
	    format:       React.PropTypes.string,
	    min:          React.PropTypes.number,
	    
	    onChange:     React.PropTypes.func.isRequired,
	    onKeyDown:    React.PropTypes.func,
	  },
	
	  getDefaultProps: function(){
	    return {
	      value: null,
	      format: 'd',
	      editing: false,
	    }
	  },
	
	  getInitialState: function() {
	    var value = this.props.editing 
	          ? this.props.value
	          : globalize.format(this.props.value, this.props.format)
	
	    return { 
	      stringValue: value
	    }
	  },
	  
	  componentWillReceiveProps: function(nextProps) {
	    var value = nextProps.editing 
	          ? nextProps.value
	          : globalize.format(nextProps.value, nextProps.format)
	
	    if ( isNaN(nextProps.value) ) 
	      value = ''
	
	    this.current(value)
	  },
	
	  render: function(){
	    var value = this.state.stringValue;
	
	    return (
	      React.createElement("input", React.__spread({},  this.props, 
	        {type: "text", 
	        className: "rw-input", 
	        onChange: this._change, 
	        onBlur: this._finish, 
	        'aria-disabled': this.props.disabled, 
	        'aria-readonly': this.props.readOnly, 
	        disabled: this.props.disabled, 
	        readOnly: this.props.readOnly, 
	        value: value}))
	    )
	  },
	
	  _change: function(e){
	    var val = e.target.value
	      , number = +e.target.value
	      , isNull = val !== 0 && !val
	      , hasMin = isFinite(this.props.min)
	
	    //console.log(hasMin, this.props.min)
	    //a null value is only possible when there is no min
	    if(!hasMin && isNull)
	      return this.props.onChange(null)
	
	    if(this.isValid(number) && number !== this.props.value)
	      return this.props.onChange(number)
	
	    //console.log(val !== 0 && !val)
	    this.current(e.target.value)
	  },
	
	  _finish: function(e){
	    var number = +this.state.stringValue
	
	    // if number is below the min
	    // we need to flush low values eventually, onBlur is definativly no typing
	    if(!isNaN(number) && number < this.props.min) {
	      this.props.onChange(number)
	    }
	  },
	
	  isValid: function(value) {
	    var num = +value;
	
	    if(isNaN(num)) return false
	    return num >= this.props.min
	  },
	
	  //this intermediate state is for when one runs into the decimal or are typing the number
	  current: setter('stringValue'),
	
	});


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1);
	
	module.exports = React.createClass({
	  
	  displayName: 'MultiselectInput',
	
	  propTypes: {
	    value:        React.PropTypes.string,
	    onChange:     React.PropTypes.func.isRequired,
	
	    disabled:     React.PropTypes.bool,
	    readOnly:     React.PropTypes.bool,
	  },
	
	
	  componentDidUpdate: function() {
	    this.props.focused && this.focus()
	  },
	
	  render: function(){
	      var value = this.props.value
	        , placeholder = this.props.placeholder
	        , size = Math.max((value || placeholder).length, 1);
	
	      return (
	        React.createElement("input", React.__spread({},  this.props, 
	          {type: "text", 
	          className: "rw-input", 
	          'aria-disabled': this.props.disabled, 
	          'aria-readonly': this.props.readOnly, 
	          disabled: this.props.disabled, 
	          readOnly: this.props.readOnly, 
	          size: size}))
	      )
	  },
	
	  focus: function(){
	    this.getDOMNode().focus()
	  }
	
	})


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , _     = __webpack_require__(137)
	  , cx    = __webpack_require__(138)
	  , Btn   = __webpack_require__(123)
	
	module.exports = React.createClass({
	  
	  displayName: 'MultiselectTagList',
	
	  mixins: [
	    __webpack_require__(149),
	    __webpack_require__(148)
	  ],
	
	  propTypes: {
	    value:          React.PropTypes.array,
	
	    valueField:     React.PropTypes.string,
	    textField:      React.PropTypes.string,
	
	    valueComponent: React.PropTypes.func,
	
	    disabled:       React.PropTypes.oneOfType([
	                      React.PropTypes.bool,
	                      React.PropTypes.array,
	                      React.PropTypes.oneOf(['disabled'])
	                    ]),
	
	    readOnly:       React.PropTypes.oneOfType([
	                      React.PropTypes.bool,
	                      React.PropTypes.array,
	                      React.PropTypes.oneOf(['readonly'])
	                    ])
	  },
	
	
	  getInitialState: function(){
	    return {
	      focused: null
	    }
	  },
	
	  render: function(){
	      var ValueComponent = this.props.valueComponent
	        , props     = _.omit(this.props, ['value', 'disabled', 'readOnly'])
	        , focusIdx  = this.state.focused
	        , value     = this.props.value;
	
	      return (
	        React.createElement("ul", React.__spread({},  props, 
	          {className: "rw-multiselect-taglist"}), 
	           value.map( function(item, i)  {
	            var disabled = this.isDisabled(item)
	              , readonly = this.isReadOnly(item);
	
	            return (
	              React.createElement("li", {key: i, 
	                  className: cx({
	                    'rw-state-focus': !disabled && focusIdx === i,
	                    'rw-state-disabled': disabled,
	                    'rw-state-readonly': readonly})
	                  }, 
	                 ValueComponent
	                    ? React.createElement(ValueComponent, {item: item })
	                    : this._dataText(item), 
	                
	                React.createElement(Btn, {tabIndex: "-1", onClick: !(disabled || readonly) && this._delete.bind(null, item), 
	                  'aria-disabled': disabled, 
	                  disabled: disabled}, 
	                  "×", React.createElement("span", {className: "rw-sr"},  "Remove " + this._dataText(item))
	                )
	              ))
	          }.bind(this))
	        )
	      )
	  },
	
	  _delete: function(val, e){
	    this.props.onDelete(val)
	  },
	
	  removeCurrent: function(){
	    var val = this.props.value[this.state.focused];
	
	    if ( val && !(this.isDisabled(val)  || this.isReadOnly(val) ))
	      this.props.onDelete(val)
	  },
	
	  isDisabled: function(val, isIdx) {
	    if(isIdx) val = this.props.value[val]
	
	    return this.props.disabled === true || this._dataIndexOf(this.props.disabled || [], val) !== -1
	  },
	
	  isReadOnly: function(val, isIdx) {
	    if(isIdx) val = this.props.value[val]
	
	    return this.props.readOnly === true || this._dataIndexOf(this.props.readOnly || [], val) !== -1
	  },
	
	  removeNext: function(){
	    var val = this.props.value[this.props.value.length - 1];
	
	    if ( val && !(this.isDisabled(val)  || this.isReadOnly(val) ))
	      this.props.onDelete(val)
	  },
	
	  clear: function(){
	    this.setState({ focused: null })
	  },
	
	  first: function(){
	    var idx = 0
	      , l = this.props.value.length;
	
	    while( idx < l && this.isDisabled(idx, true) )
	      idx++
	
	    if (idx !== l)
	      this.setState({ focused: idx })
	  },
	
	  last: function(){
	    var idx = this.props.value.length - 1;
	
	    while( idx > -1 && this.isDisabled(idx, true) )
	      idx--
	
	    if (idx >= 0)
	      this.setState({ focused: idx })
	  },
	
	  next: function(){
	    var nextIdx = this.state.focused + 1
	      , l = this.props.value.length;
	
	    while( nextIdx < l && this.isDisabled(nextIdx, true) )
	      nextIdx++
	
	    if ( this.state.focused === null )
	      return
	
	    if ( nextIdx >= l )
	      return this.clear();
	
	    this.setState({ focused: nextIdx })
	  },
	
	  prev: function(){
	    var nextIdx = this.state.focused;
	
	    if ( nextIdx === null )
	      nextIdx = this.props.value.length
	
	    nextIdx--;
	
	    while( nextIdx > -1 && this.isDisabled(nextIdx, true) )
	      nextIdx--
	
	    if ( nextIdx >= 0 )
	      this.setState({ focused: nextIdx  })
	  }
	})


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(160);


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {// Load modules
	
	
	// Declare internals
	
	var internals = {};
	
	
	exports.arrayToObject = function (source) {
	
	    var obj = {};
	    for (var i = 0, il = source.length; i < il; ++i) {
	        if (typeof source[i] !== 'undefined') {
	
	            obj[i] = source[i];
	        }
	    }
	
	    return obj;
	};
	
	
	exports.merge = function (target, source) {
	
	    if (!source) {
	        return target;
	    }
	
	    if (Array.isArray(source)) {
	        for (var i = 0, il = source.length; i < il; ++i) {
	            if (typeof source[i] !== 'undefined') {
	                if (typeof target[i] === 'object') {
	                    target[i] = exports.merge(target[i], source[i]);
	                }
	                else {
	                    target[i] = source[i];
	                }
	            }
	        }
	
	        return target;
	    }
	
	    if (Array.isArray(target)) {
	        if (typeof source !== 'object') {
	            target.push(source);
	            return target;
	        }
	        else {
	            target = exports.arrayToObject(target);
	        }
	    }
	
	    var keys = Object.keys(source);
	    for (var k = 0, kl = keys.length; k < kl; ++k) {
	        var key = keys[k];
	        var value = source[key];
	
	        if (value &&
	            typeof value === 'object') {
	
	            if (!target[key]) {
	                target[key] = value;
	            }
	            else {
	                target[key] = exports.merge(target[key], value);
	            }
	        }
	        else {
	            target[key] = value;
	        }
	    }
	
	    return target;
	};
	
	
	exports.decode = function (str) {
	
	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};
	
	
	exports.compact = function (obj, refs) {
	
	    if (typeof obj !== 'object' ||
	        obj === null) {
	
	        return obj;
	    }
	
	    refs = refs || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }
	
	    refs.push(obj);
	
	    if (Array.isArray(obj)) {
	        var compacted = [];
	
	        for (var i = 0, l = obj.length; i < l; ++i) {
	            if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }
	
	        return compacted;
	    }
	
	    var keys = Object.keys(obj);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        obj[key] = exports.compact(obj[key], refs);
	    }
	
	    return obj;
	};
	
	
	exports.isRegExp = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};
	
	
	exports.isBuffer = function (obj) {
	
	    if (typeof Buffer !== 'undefined') {
	        return Buffer.isBuffer(obj);
	    }
	    else {
	        return false;
	    }
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(162).Buffer))

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var idCount = 0;
	
	var _ = 
	
	  module.exports = {
	
	    has: has,
	    
	    merge:  __webpack_require__(169),
	
	    extend: __webpack_require__(164),
	
	    isShallowEqual: function (a, b) {
	      if (a === b) return true;
	      if (a instanceof Date && b instanceof Date)
	        return a.getTime() === b.getTime()
	
	      if(typeof a != 'object' && typeof b != 'object')
	        return a === b
	
	      if(typeof a != typeof b ) return false
	
	      return shallowEqual(a, b)
	    }, 
	
	    transform: function(obj, cb, seed){
	      _.each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})))
	      return seed
	    },
	
	    each: function(obj, cb, thisArg){
	      if( Array.isArray(obj)) return obj.forEach(cb, thisArg)
	
	      for(var key in obj) if(has(obj, key)) 
	        cb.call(thisArg, obj[key], key, obj)
	    },
	
	    object: function(arr){
	      return _.transform(arr, 
	        function(obj, val)  {return obj[val[0]] = val[1];}, {})
	    },
	
	    pick: function(obj, keys){
	      keys = [].concat(keys);
	      return _.transform(obj, function(mapped, val, key){
	        if( keys.indexOf(key) !== -1) mapped[key] = val
	      }, {})
	    },
	
	    omit: function(obj, keys){
	      keys = [].concat(keys);
	      return _.transform(obj, function(mapped, val, key){
	        if( keys.indexOf(key) === -1) mapped[key] = val
	      }, {})
	    },
	
	    find: function(arr, cb, thisArg){
	      var result;
	      if( Array.isArray(arr)) {
	        arr.every(function(val, idx){
	          if( cb.call(thisArg, val, idx, arr)) return (result = val), false
	          return true
	        })
	        return result
	      }
	      else 
	        for(var key in arr) if(has(arr, key)) 
	          if( cb.call(thisArg, arr[key], key, arr) ) 
	            return arr[key]; 
	    },
	
	    findIndex: function(arr, cb, thisArg){
	      var idx = -1, len = arr.length;
	
	      while (++idx < len)
	        if( cb.call(thisArg, arr[idx], idx, arr) ) return idx
	      
	      return -1
	    },
	
	    chunk: function(array, chunkSize) {
	      var index = 0, length = array ? array.length : 0
	        , result = [];
	
	      chunkSize = Math.max(+chunkSize || 1, 1)
	
	      while (index < length)
	        result.push(array.slice(index, (index += chunkSize)))
	
	      return result
	    },
	
	    splat: function(obj){
	      return obj == null ? [] : [].concat(obj)
	    },
	
	    noop: function(){},
	
	    uniqueId: function (prefix) {
	      return ''+ ((prefix == null ? '' : prefix) + (++idCount));
	    }
	  }
	
	function has(o, k){
	  return o ? Object.prototype.hasOwnProperty.call(o, k) : false
	}
	
	function shallowEqual(objA, objB) {
	  var key;
	
	  for (key in objA) if ( has(objA, key) && (!has(objB, key) || objA[key] !== objB[key])) 
	    return false;
	     
	  for (key in objB) if ( has(objB, key) && !has(objA, key)) 
	    return false;
	    
	  return true;
	}

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(137)
	
	module.exports = function(existing, classes) {
		if(arguments.length === 1 )
	    if( typeof existing === 'string' )
	      classes = {}
	    else 
	      classes = existing, existing = ''
	
	  if( !Array.isArray(classes))
	    classes = _.transform(classes, function(arr, value, key){
	      if( !!value ) arr.push(key)
	    }, [])
	
	  return (existing ? existing + ' ' : '') + classes.join(' ')
	}


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(137) //invert, transform
	  , React = __webpack_require__(1)
	  , compat = __webpack_require__(161)
	
	
	function compatPropType(handler, propType) {
	
	  return compat.propType(function(props, propName, componentName, location){
	    if(props[propName] !== undefined){
	      if ( !props[handler] )
	        return new Error(
	            'ReactWidgets: you have provided a `' + propName + '` prop to ' 
	          + '`' + componentName + '` without an `' + handler + '` handler. This will render a read-only field. ' 
	          + 'If the field should be mutable use `' + defaultKey(propName) + '`. Otherwise, set `' + handler + '`')
	
	      return propType && propType(props, propName, componentName, location)
	    }
	  })
	}
	
	module.exports = {
	
	  createControlledClass: function(Component, controlledValues, taps) {
	    // var publicMethods 
	    //       = _.transform(publicApi || [], function(obj, method) {
	    //           obj[method] = function (...args){ 
	    //             return this.refs[this._innerRef][method](args) 
	    //           }
	    //         }, {})
	
	    var types = _.transform(controlledValues, function(obj, handler, prop){
	          var type = Component.type.propTypes[prop];
	
	          obj[prop] = compatPropType(handler, type)
	          obj[defaultKey(prop)] = type
	        }, {});
	
	    taps = taps || {}
	
	    return React.createClass({
	
	      displayName: Component.displayName,
	
	      propTypes: types,
	
	      getInitialState: function(){
	        var props = this.props
	          , keys  = Object.keys(controlledValues);
	
	        return _.transform(keys, function(state, key){
	          state[key] = props[defaultKey(key)]
	        }, {})
	      },
	
	      shouldComponentUpdate: function() {
	        //let the setState trigger the update
	        return !this._notifying || !this._notifying.length;
	      },
	
	      render: function(){
	        var props, handles;
	
	        props = _.transform(controlledValues, function(obj, handle, prop)  {
	          obj[prop] = isProp(this.props, prop) ? this.props[prop] : this.state[prop]
	        }.bind(this), {})
	        
	        handles = _.transform(controlledValues, function(obj, handle, prop)  {
	          obj[handle] = setAndNotify.bind(this, prop)
	        }.bind(this), {})
	
	        props = _.merge(this.props, props, handles)
	
	        for(var k in taps) if (_.has(props, k)) {
	          props[k] = chain(this, taps[k], props[k])
	        }
	        //this._innerRef = props.ref = props.ref || 'component'
	
	        return React.createElement(Component, props, this.props.children);
	      }
	    })
	
	    function setAndNotify(prop, value){
	      /*jshint validthis:true */
	      var handler    = controlledValues[prop]
	        , controlled = handler && isProp(this.props, prop)
	        , st = {}
	        , args;
	
	      if ( !this._notifying ) this._notifying = [];
	
	      if( this.props[handler] ) {
	        args = [].slice.call(arguments, 1)
	        this._notifying.push(true)
	        this.props[handler].apply(this, args)
	        this._notifying.pop()
	      }
	        
	      st[prop] = value
	      this.setState(st)
	
	      return !controlled
	    }
	
	    function isProp(props, prop){
	      return props[prop] !== undefined;
	    }
	  }
	}
	
	
	// function invert(controlledValues){
	//   return _.transform(controlledValues, (val, key ) => ,)
	// }
	
	function defaultKey(key){
	  return 'default' + key.charAt(0).toUpperCase() + key.substr(1)
	}
	
	function chain(thisArg, a, b){
	  return function chainedFunction(){
	    a && a.apply(thisArg, arguments)
	    b && b.apply(thisArg, arguments)
	  }
	}

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	
	module.exports = {
	
		elementType: createChainableTypeChecker(
	    function (props, propName, componentName, location) {
	
	      if( typeof props[propName] !== 'function'){
	        if ( React.isValidElement(props[propName]))
	          return new Error(
	            'Invalid prop `' + propName + '` specified in  `' + componentName + '`.' +
	            ' Expected an Element `type`, not an actual Element')
	
	        if (typeof props[propName] !== 'string')
	          return new Error(
	            'Invalid prop `' + propName + '` specified in  `' + componentName + '`.' +
	            ' Expected an Element `type` such as a tag name or return value of React.createClass(...)')
	      }
	      return true
	    })
	}
	
	
	function createChainableTypeChecker(validate) {
	
	  function checkType(isRequired, props, propName, componentName, location) {
	    componentName = componentName || '<<anonymous>>';
	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error(
	          "Required prop `" + propName + "` was not specified in  `" + componentName + "`.");
	      }
	    } 
	    else 
	      return validate(props, propName, componentName, location);
	  }
	
	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);
	
	  return chainedCheckType
	}

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var METHODS = ['next','prev', 'first', 'last'];
	
	module.exports = function validateListComponent(list){
	
	  if( true){
	    METHODS.forEach( function(method)  
	      {return assert(typeof list[method] === 'function', 'List components must implement a `' + method +'()` method');} )
	  }
	}
	
	function assert(condition, msg){
	  var error
	
	  if ( !condition){
	    error = new Error(msg)
	    error.framesToPop = 1;
	    throw error;
	  }  
	}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var common = {
	      eq:   function(a, b){ return a === b },
	      neq:  function(a, b){ return a !== b },
	      gt:   function(a, b){ return a > b   },
	      gte:  function(a, b){ return a >= b  },
	      lt:   function(a, b){ return a < b   },
	      lte:  function(a, b){ return a <= b  },
	
	      contains: function(a, b){
	        return a.indexOf(b) !== -1
	      },
	
	      startsWith: function(a, b) {
	        return a.lastIndexOf(b, 0) === 0;
	      },
	
	      endsWith: function(a, b) {
	        var pos = a.length - b.length
	          , lastIndex = a.indexOf(b, pos);
	
	        return  lastIndex !== -1 && lastIndex === pos;
	      }
	    }
	
	module.exports = common

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dateMath = __webpack_require__(97)
	  , globalize = __webpack_require__(166)
	  , _ = __webpack_require__(137); //extend
	
	var dates = module.exports = _.extend(dateMath, {
	  // wrapper methods for isolating globalize use throughout the lib
	  // looking forward towards the 1.0 release
	  culture: function(culture){
	    return culture
	      ? globalize.findClosestCulture(culture)
	      : globalize.culture()
	  },
	
	  startOfWeek: function(culture){
	    culture = dates.culture(culture)
	
	    if (!culture || !culture.calendar)
	      return 0
	
	    return culture.calendar.firstDay || 0
	  },
	
	  parse: function(date, format, culture){
	    return globalize.parseDate(date, format, culture)
	  },
	
	  format: function(date, format, culture){
	    return globalize.format(date, format, culture)
	  },
	  
	  //-------------------------------------
	
	  shortDaysOfWeek: function (culture){
	    var start = dates.startOfWeek(culture)
	      , days, front;
	
	    culture = dates.culture(culture)
	
	    if (culture && culture.calendar){
	      days = culture.calendar.days.namesShort.slice()
	
	      if(start === 0 ) 
	        return days
	      
	      front = days.splice(0, start)
	      days  = days.concat(front)
	      return days
	    }
	  },
	
	  // daysOfWeek: function(date, format, culture){
	  //   var range = [0,1,2,3,4,5,6]
	  //   if (arguments.length === 1){
	  //     format = date
	  //     date = new Date()
	  //   }
	
	  //   format = format || 'do'
	
	  //   return range.map(i => dates.format(dates.weekday(date, i), format, culture) )
	  // },
	
	  // months: function(date, format, culture){
	  //   var months = [0,1,2,3,4,5,6,7,8,9,10,11]
	
	  //   if (arguments.length === 1){
	  //     format = date
	  //     date = new Date()
	  //   }
	  //   format = format || dates.formats.DAY_NAME_ABRV
	
	  //   return months.map( i => dates.format(dates.month(date, i), format, culture))
	  // },
	
	  monthsInYear: function(year){
	    var months = [0,1,2,3,4,5,6,7,8,9,10,11]
	      , date   = new Date(year, 0, 1)
	
	    return  months.map( function(i)  {return dates.month(date, i);})
	  },
	
	  firstOfDecade: function(date){
	    var decade = dates.year(date) % 10
	
	    return dates.subtract(date, decade, 'year')
	  },
	
	  lastOfDecade: function(date){
	    return dates.add(dates.firstOfDecade(date), 9, 'year')
	  },
	
	  firstOfCentury: function(date){
	    var decade = dates.year(date) % 100
	    return dates.subtract(date, decade, 'year')
	  },
	
	  lastOfCentury: function(date){
	    return dates.add(dates.firstOfCentury(date), 99, 'year')
	  },
	
	  firstVisibleDay: function(date){
	    var firstOfMonth = dates.startOf(date, 'month')
	    return dates.startOf(firstOfMonth, 'week');
	  },
	
	  lastVisibleDay: function(date){
	    var endOfMonth = dates.endOf(date, 'month')
	    return dates.endOf(endOfMonth, 'week');
	  },
	
	  visibleDays: function(date){
	    var current = dates.firstVisibleDay(date)
	      , last = dates.lastVisibleDay(date)
	      , days = [];
	
	    while( dates.lte(current, last, 'day') ) {
	      days.push(current)
	      current = dates.add(current, 1, 'day')
	    }
	
	    return days
	  },
	
	  merge: function(date, time){
	    if( time == null && date == null)
	      return null
	
	    if( time == null) time = new Date()
	    if( date == null) date = new Date()
	
	    date = dates.startOf(date, 'day')
	    date = dates.hours(date,        dates.hours(time))
	    date = dates.minutes(date,      dates.minutes(time))
	    date = dates.seconds(date,      dates.seconds(time))
	    return dates.milliseconds(date, dates.milliseconds(time))
	  },
	
	  sameMonth: function(dateA, dateB){
	    return dates.eq(dateA, dateB, 'month')
	  },
	
	  today: function() {
	    return this.startOf(new Date(), 'day')
	  },
	
	  yesterday: function() {
	    return this.add(this.startOf(new Date(), 'day'), -1, 'day')
	  },
	
	  tomorrow: function() {
	    return this.add(this.startOf(new Date(), 'day'), 1, 'day')
	  },
	
	  formats: {
	    DAY_OF_MONTH:    'dd',
	    DAY_NAME_SHORT:  null,
	    MONTH_NAME_ABRV: 'MMM',
	    MONTH_YEAR:      'MMMM yyyy',
	    YEAR:            'yyyy'
	  }
	
	})

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(137); //object
	
	var views = {
	    MONTH:   'month',
	    YEAR:    'year',
	    DECADE:  'decade',
	    CENTURY: 'century'
	  }
	
	module.exports = {
	
	  directions: {
	    LEFT:  'LEFT',
	    RIGHT: 'RIGHT',
	    UP:    'UP',
	    DOWN:  'DOWN'
	  },
	
	  datePopups: {
	    TIME:     'time',
	    CALENDAR: 'calendar'
	  },
	
	  calendarViews: views,
	
	  calendarViewHierarchy: _.object([
	    [views.MONTH,   views.YEAR],
	    [views.YEAR,    views.DECADE],
	    [views.DECADE,  views.CENTURY]
	  ]),
	
	  calendarViewUnits: _.object([
	    [views.MONTH,   views.DAY],
	    [views.YEAR,    views.MONTH],
	    [views.DECADE,  views.YEAR],
	    [views.CENTURY, views.DECADE],
	  ])
	}


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(146)
	  , raf = __webpack_require__(165)
	
	module.exports = function scrollTo( selected, scrollParent ) {
	  var offset = $.offset(selected)
	    , poff   = { top: 0, left: 0 }
	    , list, scrollTop, selectedTop, isWin
	    , selectedHeight, listHeight, bottom;
	
	    if( !selected ) return 
	
	    list       = scrollParent || $.scrollParent(selected) // if we know the parent skip this step for perf (maybe)
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
	
	    return function()  {return raf.cancel(id);}
	}
	
	function getWindow( node ) {
	  return node === node.window
	    ? node : node.nodeType === 9 && node.defaultView;
	}


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var has = Object.prototype.hasOwnProperty
	  , transitionTiming, transitionDuration
	  , transitionProperty, transitionDelay
	  , notSupported, endEvent
	  , prefix = ''
	  , el = document.createElement('div')
	  , reset = {}
	  , transform ='transform'
	  , transitions = {
	      O:'otransitionend',
	      Moz:'transitionend',
	      Webkit:'webkitTransitionEnd'
	    };
	
	var TRANSLATION_MAP = { 
	      left: 'translateX', right: 'translateX'
	    , top: 'translateY', bottom: 'translateY'}
	
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
	
	transform = prefix + transform
	
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
	
	    return (node && node.ownerDocument) || document
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
	      , transforms =''
	      , fired;
	
	    if ( typeof easing === 'function' )
	      callback = easing, easing = null
	
	    if ( notSupported )           duration = 0
	    if ( duration === undefined ) duration = 200
	
	    for(var key in properties) if ( has.call(properties, key) ) {
	      if( /(top|bottom)/.test(key) ) 
	        transforms += TRANSLATION_MAP[key] +'(' + properties[key] + ') '
	      else{
	        cssValues[key] = properties[key]
	        cssProperties.push(dasherize(key))
	      }
	    }
	
	    if (transforms) {
	      cssValues[transform] = transforms
	      cssProperties.push(transform)
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
	  if( !node) throw new Error()
	  var doc = node.ownerDocument;
	
	  return "defaultView" in doc 
	    ? doc.defaultView.opener
	      ? node.ownerDocument.defaultView.getComputedStyle( node, null )
	      : window.getComputedStyle(node, null)
	    : ie8(node)
	}
	
	function ie8(el) {
	  return {
	    getPropertyValue:function(prop) {
	      var re = /(\-([a-z]){1})/g;
	      if (prop == 'float') prop = 'styleFloat';
	      if (re.test(prop)) {
	          prop = prop.replace(re, function () {
	              return arguments[2].toUpperCase();
	          });
	      }
	      return el.currentStyle[prop] ? el.currentStyle[prop] : null;
	    }
	  }
	}

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , _ =  __webpack_require__(137); //uniqueID
	
	module.exports = {
	
	  propTypes: {
	
	    disabled:       React.PropTypes.oneOfType([
	                        React.PropTypes.bool,
	                        React.PropTypes.oneOf(['disabled'])
	                      ]),
	
	    readOnly:       React.PropTypes.oneOfType([
	                      React.PropTypes.bool,
	                      React.PropTypes.oneOf(['readOnly'])
	                    ]),
	  },
	
	  isDisabled: function(){
	    return this.props.disabled === true || this.props.disabled === 'disabled'
	  },
	
	  isReadOnly: function(){
	    return this.props.readOnly === true
	      || this.props.readOnly === 'readonly'
	  },
	
	  notify: function(handler, args){
	    this.props[handler]
	      && this.props[handler].apply(null, [].concat(args))
	  },
	
	  _id: function(suffix){
	    this._id_ || (this._id_ = _.uniqueId('rw_'))
	    return (this.props.id || this._id_)  + suffix
	  },
	
	  _maybeHandle: function(handler, disabledOnly){
	    if ( !(this.isDisabled() || (!disabledOnly && this.isReadOnly())) )
	      return handler
	    return function(){}
	  },
	}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(137)
	
	//backport PureRenderEqual
	module.exports = {
	
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !_.isShallowEqual(this.props, nextProps) ||
	           !_.isShallowEqual(this.state, nextState);
	  }
	}
	


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , _ =  __webpack_require__(137)
	
	module.exports = {
	  
	  propTypes: {    
	    valueField: React.PropTypes.string,
	    textField:  React.PropTypes.string,
	  },
	
	  _dataValue: function(item){
	    var field = this.props.valueField;
	
	        return field && item && _.has(item, field)
	      ? item[field]
	      : item
	  },
	
	  _dataText: function(item){
	    var field = this.props.textField;
	
	    return (field && item && _.has(item, field)
	      ? item[field]
	      : item) + ''
	  },
	
	  _dataIndexOf: function(data, item){
	    return _.findIndex(data, this._valueMatcher.bind(null, item), this)
	  },
	
	  _valueMatcher: function(a, b){
	    return _.isShallowEqual(
	        this._dataValue(a)
	      , this._dataValue(b)) 
	  },
	
	  _dataItem: function(data, item){
	    var first = data[0]
	      , field = this.props.valueField
	      , idx;
	
	    // make an attempt to see if we were passed in dataItem vs just a valueField value
	    // either an object with the right prop, or a primitive
	    // { valueField: 5 } || "hello" [ "hello" ]
	    if( _.has(item, field) || typeof(first) === typeof(val))
	      return item
	
	    idx = this._dataIndexOf(data, this._dataValue(item))
	
	    if (idx !== -1)
	      return data[idx]
	
	    return item
	  }
	}


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var scrollTo = __webpack_require__(145)
	
	module.exports = {
	
	
	  _scrollTo:function(selected, list) {
	    var handler = this.props.onMove; 
	
	    if ( this.props.open){
	      if ( handler ) 
	        handler(selected, list)
	      else {
	        this._scrollCancel && this._scrollCancel()
	        this._scrollCancel = scrollTo(selected, list)
	      }
	    }
	  },
	}

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	
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
	
	  getChildContext: function() {
	    return { 
	      isRtl: this.props.isRtl || (this.context && this.context.isRtl)
	    }
	  },
	
	  isRtl: function() {
	    return !!(this.props.isRtl || (this.context && this.context.isRtl))
	  }
	
	}

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React  = __webpack_require__(1)
	  , filter = __webpack_require__(142)
	  , helper = __webpack_require__(149)
	  , _      = __webpack_require__(137);
	
	module.exports = {
	  
	    propTypes: {
	      data:          React.PropTypes.array,
	      value:         React.PropTypes.any,
	      delay:         React.PropTypes.number,
	      filter:        React.PropTypes.string,
	    },
	
	    search: function(character, cb){
	      var self    = this
	        , word    = ((this._searchTerm || '') + character).toLowerCase();
	        
	      clearTimeout(this._timer)
	
	      this._searchTerm = word 
	
	      this._timer = setTimeout(function(){
	            self._searchTerm = ''
	            cb(word);
	        }, this.props.delay)    
	    },
	
	    findNextWordIndex: function(word, current){
	      var matcher = filter.startsWith
	        , self    = this;
	        
	      return _.findIndex(self._data(), function(item, i) { 
	        return i >= current
	            && matcher(
	                helper._dataText.call(self, item).toLowerCase()
	              , word.toLowerCase())
	      });    
	    }
	
	}

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React   = __webpack_require__(1)
	  , filters = __webpack_require__(142)
	  , helper  = __webpack_require__(149)
	  , _      = __webpack_require__(137);
	
	var filterTypes = Object.keys(filters).filter( function(i)  {return i !== 'filter';})
	
	module.exports = {
	  
	    propTypes: {
	      data:           React.PropTypes.array,
	      value:          React.PropTypes.any,
	      filter:         React.PropTypes.oneOfType([
	                        React.PropTypes.func,
	                        React.PropTypes.oneOf(filterTypes.concat(false))
	                      ]),
	      caseSensitive:  React.PropTypes.bool,
	      minLength:      React.PropTypes.number,
	    },
	
	    getDefaultProps: function(){
	      return {
	        caseSensitive: false,
	        minLength: 1
	      }
	    },
	
	    filterIndexOf: function(items, searchTerm){
	      var idx = -1
	        , matches = typeof this.props.filter === 'function'
	            ? this.props.filter
	            : getFilter(filters[this.props.filter || 'eq'], searchTerm, this);
	
	      if ( !searchTerm || !searchTerm.trim() || (this.props.filter && searchTerm.length < (this.props.minLength || 1)))
	        return -1
	
	      items.every( function(item, i)  {
	        if (matches(item, searchTerm))
	          return (idx = i), false
	
	        return true
	      })
	
	      return idx  
	    },
	
	    filter: function(items, searchTerm){
	      var matches = typeof this.props.filter === 'string'
	            ? getFilter(filters[this.props.filter], searchTerm, this)
	            : this.props.filter;
	
	      if ( !matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1))
	        return items
	
	      return items.filter( 
	        function(item)  {return matches(item, searchTerm);})
	    }
	  }
	
	
	function getFilter(matcher, searchTerm, ctx){
	  searchTerm = !ctx.caseSensitive 
	    ? searchTerm.toLowerCase() 
	    : searchTerm
	
	  return function(item) {
	    var val = helper._dataText.call(ctx, item);
	
	    if ( !ctx.caseSensitive )
	      val = val.toLowerCase();
	
	    return matcher(val, searchTerm)
	  }
	}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */
	
	function makeEmptyFunction(arg) {
	  return function() {
	    return arg;
	  };
	}
	
	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}
	
	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function() { return this; };
	emptyFunction.thatReturnsArgument = function(arg) { return arg; };
	
	module.exports = emptyFunction;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , _ =  __webpack_require__(137)
	  , filter = __webpack_require__(142)
	  , helper = __webpack_require__(149)
	
	module.exports = {
	  
	  propTypes: {    
	    textField:  React.PropTypes.string,
	  },
	
	  first:function(){
	    return this._data()[0]
	  },
	
	  last:function(){
	    var data = this._data()
	    return data[data.length-1]
	  },
	
	  prev:function(item, word){
	    var data = this._data()
	      , idx  = data.indexOf(item)
	
	    if (idx === -1) idx = data.length;
	
	    return word 
	      ? findNextInstance(this,  data, word, idx, 'prev')
	      : --idx < 0 ? data[0] : data[idx]
	  },
	
	  next:function(item, word){
	    var data = this._data()
	      , idx  = data.indexOf(item)
	
	    return word 
	      ? findNextInstance(this, data, word, idx, 'next')
	      : ++idx === data.length ? data[data.length - 1] : data[idx]
	  }
	
	}
	
	function findNextInstance(ctx, data, word, current, dir){
	  var matcher = filter.startsWith;
	    
	  return _.find(data, function(item, i)  { 
	    return (dir === 'next' ? i > current : i < current)
	        && matcher(
	            helper._dataText.call(ctx, item).toLowerCase()
	          , word.toLowerCase())
	  });    
	}


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function caret(el, start, end ){
	
	  if ( start === undefined)
	    return get(el)
	  
	  set(el, start, end)
	}
	
	function get(el){
	  var start, end, rangeEl, clone;
	
	  if( el.selectionStart !== undefined){
	    start = el.selectionStart
	    end = el.selectionEnd
	  }
	  else {
	    try {
	      el.focus()
	      rangeEl = el.createTextRange()
	      clone = rangeEl.duplicate()
	
	      rangeEl.moveToBookmark(document.selection.createRange().getBookmark());
	      clone.setEndPoint('EndToStart', rangeEl);
	
	      start = clone.text.length;
	      end   = start + rangeEl.text.length
	    }
	    catch(e) { /* not focused or not visible */ }
	  }
	  
	  return { start:start, end:end }
	}
	
	function set(el, start, end){
	  var rangeEl;
	
	  
	  try {
	    if( el.selectionStart !== undefined){
	      el.focus()
	      el.setSelectionRange(start, end)
	    }
	    else {
	      el.focus();
	      rangeEl = el.createTextRange();
	      rangeEl.collapse(true);
	      rangeEl.moveStart("character", start);
	      rangeEl.moveEnd("character", end - start);
	      rangeEl.select();
	    }
	  }
	  catch(e) { /* not focused or not visible */ }
	}

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	
	module.exports = {
	  
	  contextTypes: {
	    isRtl: React.PropTypes.bool
	  },
	
	  isRtl: function() {
	    return !!this.context.isRtl
	  }
	
	}

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , dates = __webpack_require__(143)
	  , directions = __webpack_require__(144).directions;
	
	module.exports = function(viewUnit, smallUnit){
	
	  return { 
	    propTypes: {
	      value:        React.PropTypes.instanceOf(Date),
	      min:          React.PropTypes.instanceOf(Date),
	      max:          React.PropTypes.instanceOf(Date),
	    },
	
	    getInitialState: function(){
	      return {
	        focusedDate:   constrainValue(this.props.value, this.props.min, this.props.max)
	      }
	    },
	
	    componentWillReceiveProps: function(nextProps) {
	      var focused = this.state.focusedDate
	
	      //!dates.inRange(focused, nextProps.min, nextProps.max)
	
	      if ( !dates.eq(nextProps.value, focused, smallUnit) ) 
	        this.setState({
	          focusedDate: nextProps.value
	        })
	    },
	
	    _keyDown: function(e){
	      var key = e.key
	        , current = this.state.focusedDate
	        , date = current;
	
	      if ( key === 'Enter'){
	        e.preventDefault()
	        return this.props.onChange(date)
	      }
	      
	      if ( key === 'ArrowLeft')
	        date = this.move(date, directions.LEFT)
	
	      else if ( key === 'ArrowRight')
	        date = this.move(date, directions.RIGHT)
	
	      else if ( key === 'ArrowUp')
	        date = this.move(date, directions.UP)
	
	      else if ( key === 'ArrowDown')
	        date = this.move(date, directions.DOWN)
	
	
	      if ( !dates.eq(current, date, smallUnit) ) {
	        e.preventDefault()
	
	        if ( dates.gt(date, this.props.value, viewUnit) )
	          return this.props.onMoveRight(date)
	
	        if ( dates.lt(date, this.props.value, viewUnit) )
	          return this.props.onMoveLeft(date)
	
	        this.setState({
	          focusedDate: date
	        })
	      }
	    }
	  }
	}
	
	
	function constrainValue(value, min, max){
	  if( value == null) return value
	  return dates.max(dates.min(value, max), min)
	}

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function stateSetter(key){
	  return function(val){
	    var state = {}
	
	    state[key] = val
	    this.setState(state)
	    return this
	  }
	}

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Stringify = __webpack_require__(167);
	var Parse = __webpack_require__(168);
	
	
	// Declare internals
	
	var internals = {};
	
	
	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1);
	
	var compat = module.exports = {
	
	  version: function(){
	    return React.version.split('.').map(parseFloat);
	  },
	
	  propType: function(fn) {
	
	    return function validator(props, propName, componentName, location){
	      var ver = compat.version()
	        , err = fn.call(this, props, propName, componentName, location)
	
	      if ( err && err !== true ) {
	        if( ver[0] === 0 && ver[1] < 11 )
	          return void 0
	
	        return err
	      }
	
	    }
	  }
	}

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	
	var base64 = __webpack_require__(178)
	var ieee754 = __webpack_require__(176)
	var isArray = __webpack_require__(177)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = Buffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation
	
	var kMaxLength = 0x3fffffff
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Note:
	 *
	 * - Implementation must support adding new properties to `Uint8Array` instances.
	 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
	 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *    incorrect length in some situations.
	 *
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
	 * get the Object implementation, which is slower but will work correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = (function () {
	  try {
	    var buf = new ArrayBuffer(0)
	    var arr = new Uint8Array(buf)
	    arr.foo = function () { return 42 }
	    return 42 === arr.foo() && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	})()
	
	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (subject, encoding, noZero) {
	  if (!(this instanceof Buffer))
	    return new Buffer(subject, encoding, noZero)
	
	  var type = typeof subject
	
	  // Find the length
	  var length
	  if (type === 'number')
	    length = subject > 0 ? subject >>> 0 : 0
	  else if (type === 'string') {
	    if (encoding === 'base64')
	      subject = base64clean(subject)
	    length = Buffer.byteLength(subject, encoding)
	  } else if (type === 'object' && subject !== null) { // assume object is array-like
	    if (subject.type === 'Buffer' && isArray(subject.data))
	      subject = subject.data
	    length = +subject.length > 0 ? Math.floor(+subject.length) : 0
	  } else
	    throw new TypeError('must start with number, buffer, array or string')
	
	  if (this.length > kMaxLength)
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	      'size: 0x' + kMaxLength.toString(16) + ' bytes')
	
	  var buf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Preferred: Return an augmented `Uint8Array` instance for best performance
	    buf = Buffer._augment(new Uint8Array(length))
	  } else {
	    // Fallback: Return THIS instance of Buffer (created by `new`)
	    buf = this
	    buf.length = length
	    buf._isBuffer = true
	  }
	
	  var i
	  if (Buffer.TYPED_ARRAY_SUPPORT && typeof subject.byteLength === 'number') {
	    // Speed optimization -- use set if we're copying from a typed array
	    buf._set(subject)
	  } else if (isArrayish(subject)) {
	    // Treat array-ish objects as a byte array
	    if (Buffer.isBuffer(subject)) {
	      for (i = 0; i < length; i++)
	        buf[i] = subject.readUInt8(i)
	    } else {
	      for (i = 0; i < length; i++)
	        buf[i] = ((subject[i] % 256) + 256) % 256
	    }
	  } else if (type === 'string') {
	    buf.write(subject, 0, encoding)
	  } else if (type === 'number' && !Buffer.TYPED_ARRAY_SUPPORT && !noZero) {
	    for (i = 0; i < length; i++) {
	      buf[i] = 0
	    }
	  }
	
	  return buf
	}
	
	Buffer.isBuffer = function (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b))
	    throw new TypeError('Arguments must be Buffers')
	
	  var x = a.length
	  var y = b.length
	  for (var i = 0, len = Math.min(x, y); i < len && a[i] === b[i]; i++) {}
	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function (list, totalLength) {
	  if (!isArray(list)) throw new TypeError('Usage: Buffer.concat(list[, length])')
	
	  if (list.length === 0) {
	    return new Buffer(0)
	  } else if (list.length === 1) {
	    return list[0]
	  }
	
	  var i
	  if (totalLength === undefined) {
	    totalLength = 0
	    for (i = 0; i < list.length; i++) {
	      totalLength += list[i].length
	    }
	  }
	
	  var buf = new Buffer(totalLength)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}
	
	Buffer.byteLength = function (str, encoding) {
	  var ret
	  str = str + ''
	  switch (encoding || 'utf8') {
	    case 'ascii':
	    case 'binary':
	    case 'raw':
	      ret = str.length
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = str.length * 2
	      break
	    case 'hex':
	      ret = str.length >>> 1
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8ToBytes(str).length
	      break
	    case 'base64':
	      ret = base64ToBytes(str).length
	      break
	    default:
	      ret = str.length
	  }
	  return ret
	}
	
	// pre-set for values that may exist in the future
	Buffer.prototype.length = undefined
	Buffer.prototype.parent = undefined
	
	// toString(encoding, start=0, end=buffer.length)
	Buffer.prototype.toString = function (encoding, start, end) {
	  var loweredCase = false
	
	  start = start >>> 0
	  end = end === undefined || end === Infinity ? this.length : end >>> 0
	
	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'binary':
	        return binarySlice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase)
	          throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.equals = function (b) {
	  if(!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max)
	      str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  return Buffer.compare(this, b)
	}
	
	// `get` will be removed in Node 0.13+
	Buffer.prototype.get = function (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}
	
	// `set` will be removed in Node 0.13+
	Buffer.prototype.set = function (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var byte = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(byte)) throw new Error('Invalid hex string')
	    buf[offset + i] = byte
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length)
	  return charsWritten
	}
	
	function asciiWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length)
	  return charsWritten
	}
	
	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  var charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length)
	  return charsWritten
	}
	
	function utf16leWrite (buf, string, offset, length) {
	  var charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length)
	  return charsWritten
	}
	
	Buffer.prototype.write = function (string, offset, length, encoding) {
	  // Support both (string, offset, length, encoding)
	  // and the legacy (string, encoding, offset, length)
	  if (isFinite(offset)) {
	    if (!isFinite(length)) {
	      encoding = length
	      length = undefined
	    }
	  } else {  // legacy
	    var swap = encoding
	    encoding = offset
	    offset = length
	    length = swap
	  }
	
	  offset = Number(offset) || 0
	  var remaining = this.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	  encoding = String(encoding || 'utf8').toLowerCase()
	
	  var ret
	  switch (encoding) {
	    case 'hex':
	      ret = hexWrite(this, string, offset, length)
	      break
	    case 'utf8':
	    case 'utf-8':
	      ret = utf8Write(this, string, offset, length)
	      break
	    case 'ascii':
	      ret = asciiWrite(this, string, offset, length)
	      break
	    case 'binary':
	      ret = binaryWrite(this, string, offset, length)
	      break
	    case 'base64':
	      ret = base64Write(this, string, offset, length)
	      break
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      ret = utf16leWrite(this, string, offset, length)
	      break
	    default:
	      throw new TypeError('Unknown encoding: ' + encoding)
	  }
	  return ret
	}
	
	Buffer.prototype.toJSON = function () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  var res = ''
	  var tmp = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    if (buf[i] <= 0x7F) {
	      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
	      tmp = ''
	    } else {
	      tmp += '%' + buf[i].toString(16)
	    }
	  }
	
	  return res + decodeUtf8Char(tmp)
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function binarySlice (buf, start, end) {
	  return asciiSlice(buf, start, end)
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len;
	    if (start < 0)
	      start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0)
	      end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start)
	    end = start
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    return Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    var newBuf = new Buffer(sliceLen, undefined, true)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	    return newBuf
	  }
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0)
	    throw new RangeError('offset is not uint')
	  if (offset + ext > length)
	    throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUInt8 = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	      ((this[offset + 1] << 16) |
	      (this[offset + 2] << 8) |
	      this[offset + 3])
	}
	
	Buffer.prototype.readInt8 = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80))
	    return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16) |
	      (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	      (this[offset + 1] << 16) |
	      (this[offset + 2] << 8) |
	      (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function (offset, noAssert) {
	  if (!noAssert)
	    checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new TypeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new TypeError('index out of range')
	}
	
	Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = value
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else objectWriteUInt16(this, value, offset, true)
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else objectWriteUInt16(this, value, offset, false)
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = value
	  } else objectWriteUInt32(this, value, offset, true)
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else objectWriteUInt32(this, value, offset, false)
	  return offset + 4
	}
	
	Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = value
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	  } else objectWriteUInt16(this, value, offset, true)
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = value
	  } else objectWriteUInt16(this, value, offset, false)
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = value
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else objectWriteUInt32(this, value, offset, true)
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
	  value = +value
	  offset = offset >>> 0
	  if (!noAssert)
	    checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = value
	  } else objectWriteUInt32(this, value, offset, false)
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new TypeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new TypeError('index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert)
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function (target, target_start, start, end) {
	  var source = this
	
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (!target_start) target_start = 0
	
	  // Copy 0 bytes; we're done
	  if (end === start) return
	  if (target.length === 0 || source.length === 0) return
	
	  // Fatal error conditions
	  if (end < start) throw new TypeError('sourceEnd < sourceStart')
	  if (target_start < 0 || target_start >= target.length)
	    throw new TypeError('targetStart out of bounds')
	  if (start < 0 || start >= source.length) throw new TypeError('sourceStart out of bounds')
	  if (end < 0 || end > source.length) throw new TypeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length)
	    end = this.length
	  if (target.length - target_start < end - start)
	    end = target.length - target_start + start
	
	  var len = end - start
	
	  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < len; i++) {
	      target[i + target_start] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), target_start)
	  }
	}
	
	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length
	
	  if (end < start) throw new TypeError('end < start')
	
	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return
	
	  if (start < 0 || start >= this.length) throw new TypeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new TypeError('end out of bounds')
	
	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var BP = Buffer.prototype
	
	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true
	
	  // save reference to original Uint8Array get/set methods before overwriting
	  arr._get = arr.get
	  arr._set = arr.set
	
	  // deprecated, will be removed in node 0.13+
	  arr.get = BP.get
	  arr.set = BP.set
	
	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer
	
	  return arr
	}
	
	var INVALID_BASE64_RE = /[^+\/0-9A-z]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function isArrayish (subject) {
	  return isArray(subject) || Buffer.isBuffer(subject) ||
	      subject && typeof subject === 'object' &&
	      typeof subject.length === 'number'
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    var b = str.charCodeAt(i)
	    if (b <= 0x7F) {
	      byteArray.push(b)
	    } else {
	      var start = i
	      if (b >= 0xD800 && b <= 0xDFFF) i++
	      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
	      for (var j = 0; j < h.length; j++) {
	        byteArray.push(parseInt(h[j], 16))
	      }
	    }
	  }
	  return byteArray
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(str)
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length))
	      break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function decodeUtf8Char (str) {
	  try {
	    return decodeURIComponent(str)
	  } catch (err) {
	    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
	  }
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(162).Buffer))

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function (require) {
	
		var makePromise = __webpack_require__(170);
		var Scheduler = __webpack_require__(171);
		var async = __webpack_require__(172);
	
		return makePromise({
			scheduler: new Scheduler(async)
		});
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(__webpack_require__(175));


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = extend
	
	function extend(target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i]
	
	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                target[key] = source[key]
	            }
	        }
	    }
	
	    return target
	}


/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Expose `requestAnimationFrame()`.
	 */
	
	exports = module.exports = window.requestAnimationFrame
	  || window.webkitRequestAnimationFrame
	  || window.mozRequestAnimationFrame
	  || window.oRequestAnimationFrame
	  || window.msRequestAnimationFrame
	  || fallback;
	
	/**
	 * Fallback implementation.
	 */
	
	var prev = new Date().getTime();
	function fallback(fn) {
	  var curr = new Date().getTime();
	  var ms = Math.max(0, 16 - (curr - prev));
	  var req = setTimeout(fn, ms);
	  prev = curr;
	  return req;
	}
	
	/**
	 * Cancel.
	 */
	
	var cancel = window.cancelAnimationFrame
	  || window.webkitCancelAnimationFrame
	  || window.mozCancelAnimationFrame
	  || window.oCancelAnimationFrame
	  || window.msCancelAnimationFrame
	  || window.clearTimeout;
	
	exports.cancel = function(id){
	  cancel.call(window, id);
	};


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Globalize
	 *
	 * http://github.com/jquery/globalize
	 *
	 * Copyright Software Freedom Conservancy, Inc.
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://jquery.org/license
	 */
	
	(function( window, undefined ) {
	
	var Globalize,
		// private variables
		regexHex,
		regexInfinity,
		regexParseFloat,
		regexTrim,
		// private JavaScript utility functions
		arrayIndexOf,
		endsWith,
		extend,
		isArray,
		isFunction,
		isObject,
		startsWith,
		trim,
		truncate,
		zeroPad,
		// private Globalization utility functions
		appendPreOrPostMatch,
		expandFormat,
		formatDate,
		formatNumber,
		getTokenRegExp,
		getEra,
		getEraYear,
		parseExact,
		parseNegativePattern;
	
	// Global variable (Globalize) or CommonJS module (globalize)
	Globalize = function( cultureSelector ) {
		return new Globalize.prototype.init( cultureSelector );
	};
	
	if ( true ) {
		// Assume CommonJS
		module.exports = Globalize;
	} else {
		// Export as global variable
		window.Globalize = Globalize;
	}
	
	Globalize.cultures = {};
	
	Globalize.prototype = {
		constructor: Globalize,
		init: function( cultureSelector ) {
			this.cultures = Globalize.cultures;
			this.cultureSelector = cultureSelector;
	
			return this;
		}
	};
	Globalize.prototype.init.prototype = Globalize.prototype;
	
	// 1. When defining a culture, all fields are required except the ones stated as optional.
	// 2. Each culture should have a ".calendars" object with at least one calendar named "standard"
	//    which serves as the default calendar in use by that culture.
	// 3. Each culture should have a ".calendar" object which is the current calendar being used,
	//    it may be dynamically changed at any time to one of the calendars in ".calendars".
	Globalize.cultures[ "default" ] = {
		// A unique name for the culture in the form <language code>-<country/region code>
		name: "en",
		// the name of the culture in the english language
		englishName: "English",
		// the name of the culture in its own language
		nativeName: "English",
		// whether the culture uses right-to-left text
		isRTL: false,
		// "language" is used for so-called "specific" cultures.
		// For example, the culture "es-CL" means "Spanish, in Chili".
		// It represents the Spanish-speaking culture as it is in Chili,
		// which might have different formatting rules or even translations
		// than Spanish in Spain. A "neutral" culture is one that is not
		// specific to a region. For example, the culture "es" is the generic
		// Spanish culture, which may be a more generalized version of the language
		// that may or may not be what a specific culture expects.
		// For a specific culture like "es-CL", the "language" field refers to the
		// neutral, generic culture information for the language it is using.
		// This is not always a simple matter of the string before the dash.
		// For example, the "zh-Hans" culture is netural (Simplified Chinese).
		// And the "zh-SG" culture is Simplified Chinese in Singapore, whose lanugage
		// field is "zh-CHS", not "zh".
		// This field should be used to navigate from a specific culture to it's
		// more general, neutral culture. If a culture is already as general as it
		// can get, the language may refer to itself.
		language: "en",
		// numberFormat defines general number formatting rules, like the digits in
		// each grouping, the group separator, and how negative numbers are displayed.
		numberFormat: {
			// [negativePattern]
			// Note, numberFormat.pattern has no "positivePattern" unlike percent and currency,
			// but is still defined as an array for consistency with them.
			//   negativePattern: one of "(n)|-n|- n|n-|n -"
			pattern: [ "-n" ],
			// number of decimal places normally shown
			decimals: 2,
			// string that separates number groups, as in 1,000,000
			",": ",",
			// string that separates a number from the fractional portion, as in 1.99
			".": ".",
			// array of numbers indicating the size of each number group.
			// TODO: more detailed description and example
			groupSizes: [ 3 ],
			// symbol used for positive numbers
			"+": "+",
			// symbol used for negative numbers
			"-": "-",
			// symbol used for NaN (Not-A-Number)
			"NaN": "NaN",
			// symbol used for Negative Infinity
			negativeInfinity: "-Infinity",
			// symbol used for Positive Infinity
			positiveInfinity: "Infinity",
			percent: {
				// [negativePattern, positivePattern]
				//   negativePattern: one of "-n %|-n%|-%n|%-n|%n-|n-%|n%-|-% n|n %-|% n-|% -n|n- %"
				//   positivePattern: one of "n %|n%|%n|% n"
				pattern: [ "-n %", "n %" ],
				// number of decimal places normally shown
				decimals: 2,
				// array of numbers indicating the size of each number group.
				// TODO: more detailed description and example
				groupSizes: [ 3 ],
				// string that separates number groups, as in 1,000,000
				",": ",",
				// string that separates a number from the fractional portion, as in 1.99
				".": ".",
				// symbol used to represent a percentage
				symbol: "%"
			},
			currency: {
				// [negativePattern, positivePattern]
				//   negativePattern: one of "($n)|-$n|$-n|$n-|(n$)|-n$|n-$|n$-|-n $|-$ n|n $-|$ n-|$ -n|n- $|($ n)|(n $)"
				//   positivePattern: one of "$n|n$|$ n|n $"
				pattern: [ "($n)", "$n" ],
				// number of decimal places normally shown
				decimals: 2,
				// array of numbers indicating the size of each number group.
				// TODO: more detailed description and example
				groupSizes: [ 3 ],
				// string that separates number groups, as in 1,000,000
				",": ",",
				// string that separates a number from the fractional portion, as in 1.99
				".": ".",
				// symbol used to represent currency
				symbol: "$"
			}
		},
		// calendars defines all the possible calendars used by this culture.
		// There should be at least one defined with name "standard", and is the default
		// calendar used by the culture.
		// A calendar contains information about how dates are formatted, information about
		// the calendar's eras, a standard set of the date formats,
		// translations for day and month names, and if the calendar is not based on the Gregorian
		// calendar, conversion functions to and from the Gregorian calendar.
		calendars: {
			standard: {
				// name that identifies the type of calendar this is
				name: "Gregorian_USEnglish",
				// separator of parts of a date (e.g. "/" in 11/05/1955)
				"/": "/",
				// separator of parts of a time (e.g. ":" in 05:44 PM)
				":": ":",
				// the first day of the week (0 = Sunday, 1 = Monday, etc)
				firstDay: 0,
				days: {
					// full day names
					names: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
					// abbreviated day names
					namesAbbr: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
					// shortest day names
					namesShort: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]
				},
				months: {
					// full month names (13 months for lunar calendards -- 13th month should be "" if not lunar)
					names: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "" ],
					// abbreviated month names
					namesAbbr: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "" ]
				},
				// AM and PM designators in one of these forms:
				// The usual view, and the upper and lower case versions
				//   [ standard, lowercase, uppercase ]
				// The culture does not use AM or PM (likely all standard date formats use 24 hour time)
				//   null
				AM: [ "AM", "am", "AM" ],
				PM: [ "PM", "pm", "PM" ],
				eras: [
					// eras in reverse chronological order.
					// name: the name of the era in this culture (e.g. A.D., C.E.)
					// start: when the era starts in ticks (gregorian, gmt), null if it is the earliest supported era.
					// offset: offset in years from gregorian calendar
					{
						"name": "A.D.",
						"start": null,
						"offset": 0
					}
				],
				// when a two digit year is given, it will never be parsed as a four digit
				// year greater than this year (in the appropriate era for the culture)
				// Set it as a full year (e.g. 2029) or use an offset format starting from
				// the current year: "+19" would correspond to 2029 if the current year 2010.
				twoDigitYearMax: 2029,
				// set of predefined date and time patterns used by the culture
				// these represent the format someone in this culture would expect
				// to see given the portions of the date that are shown.
				patterns: {
					// short date pattern
					d: "M/d/yyyy",
					// long date pattern
					D: "dddd, MMMM dd, yyyy",
					// short time pattern
					t: "h:mm tt",
					// long time pattern
					T: "h:mm:ss tt",
					// long date, short time pattern
					f: "dddd, MMMM dd, yyyy h:mm tt",
					// long date, long time pattern
					F: "dddd, MMMM dd, yyyy h:mm:ss tt",
					// month/day pattern
					M: "MMMM dd",
					// month/year pattern
					Y: "yyyy MMMM",
					// S is a sortable format that does not vary by culture
					S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss"
				}
				// optional fields for each calendar:
				/*
				monthsGenitive:
					Same as months but used when the day preceeds the month.
					Omit if the culture has no genitive distinction in month names.
					For an explaination of genitive months, see http://blogs.msdn.com/michkap/archive/2004/12/25/332259.aspx
				convert:
					Allows for the support of non-gregorian based calendars. This convert object is used to
					to convert a date to and from a gregorian calendar date to handle parsing and formatting.
					The two functions:
						fromGregorian( date )
							Given the date as a parameter, return an array with parts [ year, month, day ]
							corresponding to the non-gregorian based year, month, and day for the calendar.
						toGregorian( year, month, day )
							Given the non-gregorian year, month, and day, return a new Date() object
							set to the corresponding date in the gregorian calendar.
				*/
			}
		},
		// For localized strings
		messages: {}
	};
	
	Globalize.cultures[ "default" ].calendar = Globalize.cultures[ "default" ].calendars.standard;
	
	Globalize.cultures.en = Globalize.cultures[ "default" ];
	
	Globalize.cultureSelector = "en";
	
	//
	// private variables
	//
	
	regexHex = /^0x[a-f0-9]+$/i;
	regexInfinity = /^[+\-]?infinity$/i;
	regexParseFloat = /^[+\-]?\d*\.?\d*(e[+\-]?\d+)?$/;
	regexTrim = /^\s+|\s+$/g;
	
	//
	// private JavaScript utility functions
	//
	
	arrayIndexOf = function( array, item ) {
		if ( array.indexOf ) {
			return array.indexOf( item );
		}
		for ( var i = 0, length = array.length; i < length; i++ ) {
			if ( array[i] === item ) {
				return i;
			}
		}
		return -1;
	};
	
	endsWith = function( value, pattern ) {
		return value.substr( value.length - pattern.length ) === pattern;
	};
	
	extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !isFunction(target) ) {
			target = {};
		}
	
		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( isObject(copy) || (copyIsArray = isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
	
						} else {
							clone = src && isObject(src) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	isArray = Array.isArray || function( obj ) {
		return Object.prototype.toString.call( obj ) === "[object Array]";
	};
	
	isFunction = function( obj ) {
		return Object.prototype.toString.call( obj ) === "[object Function]";
	};
	
	isObject = function( obj ) {
		return Object.prototype.toString.call( obj ) === "[object Object]";
	};
	
	startsWith = function( value, pattern ) {
		return value.indexOf( pattern ) === 0;
	};
	
	trim = function( value ) {
		return ( value + "" ).replace( regexTrim, "" );
	};
	
	truncate = function( value ) {
		if ( isNaN( value ) ) {
			return NaN;
		}
		return Math[ value < 0 ? "ceil" : "floor" ]( value );
	};
	
	zeroPad = function( str, count, left ) {
		var l;
		for ( l = str.length; l < count; l += 1 ) {
			str = ( left ? ("0" + str) : (str + "0") );
		}
		return str;
	};
	
	//
	// private Globalization utility functions
	//
	
	appendPreOrPostMatch = function( preMatch, strings ) {
		// appends pre- and post- token match strings while removing escaped characters.
		// Returns a single quote count which is used to determine if the token occurs
		// in a string literal.
		var quoteCount = 0,
			escaped = false;
		for ( var i = 0, il = preMatch.length; i < il; i++ ) {
			var c = preMatch.charAt( i );
			switch ( c ) {
				case "\'":
					if ( escaped ) {
						strings.push( "\'" );
					}
					else {
						quoteCount++;
					}
					escaped = false;
					break;
				case "\\":
					if ( escaped ) {
						strings.push( "\\" );
					}
					escaped = !escaped;
					break;
				default:
					strings.push( c );
					escaped = false;
					break;
			}
		}
		return quoteCount;
	};
	
	expandFormat = function( cal, format ) {
		// expands unspecified or single character date formats into the full pattern.
		format = format || "F";
		var pattern,
			patterns = cal.patterns,
			len = format.length;
		if ( len === 1 ) {
			pattern = patterns[ format ];
			if ( !pattern ) {
				throw "Invalid date format string \'" + format + "\'.";
			}
			format = pattern;
		}
		else if ( len === 2 && format.charAt(0) === "%" ) {
			// %X escape format -- intended as a custom format string that is only one character, not a built-in format.
			format = format.charAt( 1 );
		}
		return format;
	};
	
	formatDate = function( value, format, culture ) {
		var cal = culture.calendar,
			convert = cal.convert,
			ret;
	
		if ( !format || !format.length || format === "i" ) {
			if ( culture && culture.name.length ) {
				if ( convert ) {
					// non-gregorian calendar, so we cannot use built-in toLocaleString()
					ret = formatDate( value, cal.patterns.F, culture );
				}
				else {
					var eraDate = new Date( value.getTime() ),
						era = getEra( value, cal.eras );
					eraDate.setFullYear( getEraYear(value, cal, era) );
					ret = eraDate.toLocaleString();
				}
			}
			else {
				ret = value.toString();
			}
			return ret;
		}
	
		var eras = cal.eras,
			sortable = format === "s";
		format = expandFormat( cal, format );
	
		// Start with an empty string
		ret = [];
		var hour,
			zeros = [ "0", "00", "000" ],
			foundDay,
			checkedDay,
			dayPartRegExp = /([^d]|^)(d|dd)([^d]|$)/g,
			quoteCount = 0,
			tokenRegExp = getTokenRegExp(),
			converted;
	
		function padZeros( num, c ) {
			var r, s = num + "";
			if ( c > 1 && s.length < c ) {
				r = ( zeros[c - 2] + s);
				return r.substr( r.length - c, c );
			}
			else {
				r = s;
			}
			return r;
		}
	
		function hasDay() {
			if ( foundDay || checkedDay ) {
				return foundDay;
			}
			foundDay = dayPartRegExp.test( format );
			checkedDay = true;
			return foundDay;
		}
	
		function getPart( date, part ) {
			if ( converted ) {
				return converted[ part ];
			}
			switch ( part ) {
				case 0:
					return date.getFullYear();
				case 1:
					return date.getMonth();
				case 2:
					return date.getDate();
				default:
					throw "Invalid part value " + part;
			}
		}
	
		if ( !sortable && convert ) {
			converted = convert.fromGregorian( value );
		}
	
		for ( ; ; ) {
			// Save the current index
			var index = tokenRegExp.lastIndex,
				// Look for the next pattern
				ar = tokenRegExp.exec( format );
	
			// Append the text before the pattern (or the end of the string if not found)
			var preMatch = format.slice( index, ar ? ar.index : format.length );
			quoteCount += appendPreOrPostMatch( preMatch, ret );
	
			if ( !ar ) {
				break;
			}
	
			// do not replace any matches that occur inside a string literal.
			if ( quoteCount % 2 ) {
				ret.push( ar[0] );
				continue;
			}
	
			var current = ar[ 0 ],
				clength = current.length;
	
			switch ( current ) {
				case "ddd":
					//Day of the week, as a three-letter abbreviation
				case "dddd":
					// Day of the week, using the full name
					var names = ( clength === 3 ) ? cal.days.namesAbbr : cal.days.names;
					ret.push( names[value.getDay()] );
					break;
				case "d":
					// Day of month, without leading zero for single-digit days
				case "dd":
					// Day of month, with leading zero for single-digit days
					foundDay = true;
					ret.push(
						padZeros( getPart(value, 2), clength )
					);
					break;
				case "MMM":
					// Month, as a three-letter abbreviation
				case "MMMM":
					// Month, using the full name
					var part = getPart( value, 1 );
					ret.push(
						( cal.monthsGenitive && hasDay() ) ?
						( cal.monthsGenitive[ clength === 3 ? "namesAbbr" : "names" ][ part ] ) :
						( cal.months[ clength === 3 ? "namesAbbr" : "names" ][ part ] )
					);
					break;
				case "M":
					// Month, as digits, with no leading zero for single-digit months
				case "MM":
					// Month, as digits, with leading zero for single-digit months
					ret.push(
						padZeros( getPart(value, 1) + 1, clength )
					);
					break;
				case "y":
					// Year, as two digits, but with no leading zero for years less than 10
				case "yy":
					// Year, as two digits, with leading zero for years less than 10
				case "yyyy":
					// Year represented by four full digits
					part = converted ? converted[ 0 ] : getEraYear( value, cal, getEra(value, eras), sortable );
					if ( clength < 4 ) {
						part = part % 100;
					}
					ret.push(
						padZeros( part, clength )
					);
					break;
				case "h":
					// Hours with no leading zero for single-digit hours, using 12-hour clock
				case "hh":
					// Hours with leading zero for single-digit hours, using 12-hour clock
					hour = value.getHours() % 12;
					if ( hour === 0 ) hour = 12;
					ret.push(
						padZeros( hour, clength )
					);
					break;
				case "H":
					// Hours with no leading zero for single-digit hours, using 24-hour clock
				case "HH":
					// Hours with leading zero for single-digit hours, using 24-hour clock
					ret.push(
						padZeros( value.getHours(), clength )
					);
					break;
				case "m":
					// Minutes with no leading zero for single-digit minutes
				case "mm":
					// Minutes with leading zero for single-digit minutes
					ret.push(
						padZeros( value.getMinutes(), clength )
					);
					break;
				case "s":
					// Seconds with no leading zero for single-digit seconds
				case "ss":
					// Seconds with leading zero for single-digit seconds
					ret.push(
						padZeros( value.getSeconds(), clength )
					);
					break;
				case "t":
					// One character am/pm indicator ("a" or "p")
				case "tt":
					// Multicharacter am/pm indicator
					part = value.getHours() < 12 ? ( cal.AM ? cal.AM[0] : " " ) : ( cal.PM ? cal.PM[0] : " " );
					ret.push( clength === 1 ? part.charAt(0) : part );
					break;
				case "f":
					// Deciseconds
				case "ff":
					// Centiseconds
				case "fff":
					// Milliseconds
					ret.push(
						padZeros( value.getMilliseconds(), 3 ).substr( 0, clength )
					);
					break;
				case "z":
					// Time zone offset, no leading zero
				case "zz":
					// Time zone offset with leading zero
					hour = value.getTimezoneOffset() / 60;
					ret.push(
						( hour <= 0 ? "+" : "-" ) + padZeros( Math.floor(Math.abs(hour)), clength )
					);
					break;
				case "zzz":
					// Time zone offset with leading zero
					hour = value.getTimezoneOffset() / 60;
					ret.push(
						( hour <= 0 ? "+" : "-" ) + padZeros( Math.floor(Math.abs(hour)), 2 ) +
						// Hard coded ":" separator, rather than using cal.TimeSeparator
						// Repeated here for consistency, plus ":" was already assumed in date parsing.
						":" + padZeros( Math.abs(value.getTimezoneOffset() % 60), 2 )
					);
					break;
				case "g":
				case "gg":
					if ( cal.eras ) {
						ret.push(
							cal.eras[ getEra(value, eras) ].name
						);
					}
					break;
			case "/":
				ret.push( cal["/"] );
				break;
			default:
				throw "Invalid date format pattern \'" + current + "\'.";
			}
		}
		return ret.join( "" );
	};
	
	// formatNumber
	(function() {
		var expandNumber;
	
		expandNumber = function( number, precision, formatInfo ) {
			var groupSizes = formatInfo.groupSizes,
				curSize = groupSizes[ 0 ],
				curGroupIndex = 1,
				factor = Math.pow( 10, precision ),
				rounded = Math.round( number * factor ) / factor;
	
			if ( !isFinite(rounded) ) {
				rounded = number;
			}
			number = rounded;
	
			var numberString = number+"",
				right = "",
				split = numberString.split( /e/i ),
				exponent = split.length > 1 ? parseInt( split[1], 10 ) : 0;
			numberString = split[ 0 ];
			split = numberString.split( "." );
			numberString = split[ 0 ];
			right = split.length > 1 ? split[ 1 ] : "";
	
			var l;
			if ( exponent > 0 ) {
				right = zeroPad( right, exponent, false );
				numberString += right.slice( 0, exponent );
				right = right.substr( exponent );
			}
			else if ( exponent < 0 ) {
				exponent = -exponent;
				numberString = zeroPad( numberString, exponent + 1, true );
				right = numberString.slice( -exponent, numberString.length ) + right;
				numberString = numberString.slice( 0, -exponent );
			}
	
			if ( precision > 0 ) {
				right = formatInfo[ "." ] +
					( (right.length > precision) ? right.slice(0, precision) : zeroPad(right, precision) );
			}
			else {
				right = "";
			}
	
			var stringIndex = numberString.length - 1,
				sep = formatInfo[ "," ],
				ret = "";
	
			while ( stringIndex >= 0 ) {
				if ( curSize === 0 || curSize > stringIndex ) {
					return numberString.slice( 0, stringIndex + 1 ) + ( ret.length ? (sep + ret + right) : right );
				}
				ret = numberString.slice( stringIndex - curSize + 1, stringIndex + 1 ) + ( ret.length ? (sep + ret) : "" );
	
				stringIndex -= curSize;
	
				if ( curGroupIndex < groupSizes.length ) {
					curSize = groupSizes[ curGroupIndex ];
					curGroupIndex++;
				}
			}
	
			return numberString.slice( 0, stringIndex + 1 ) + sep + ret + right;
		};
	
		formatNumber = function( value, format, culture ) {
			if ( !isFinite(value) ) {
				if ( value === Infinity ) {
					return culture.numberFormat.positiveInfinity;
				}
				if ( value === -Infinity ) {
					return culture.numberFormat.negativeInfinity;
				}
				return culture.numberFormat[ "NaN" ];
			}
			if ( !format || format === "i" ) {
				return culture.name.length ? value.toLocaleString() : value.toString();
			}
			format = format || "D";
	
			var nf = culture.numberFormat,
				number = Math.abs( value ),
				precision = -1,
				pattern;
			if ( format.length > 1 ) precision = parseInt( format.slice(1), 10 );
	
			var current = format.charAt( 0 ).toUpperCase(),
				formatInfo;
	
			switch ( current ) {
				case "D":
					pattern = "n";
					number = truncate( number );
					if ( precision !== -1 ) {
						number = zeroPad( "" + number, precision, true );
					}
					if ( value < 0 ) number = "-" + number;
					break;
				case "N":
					formatInfo = nf;
					/* falls through */
				case "C":
					formatInfo = formatInfo || nf.currency;
					/* falls through */
				case "P":
					formatInfo = formatInfo || nf.percent;
					pattern = value < 0 ? formatInfo.pattern[ 0 ] : ( formatInfo.pattern[1] || "n" );
					if ( precision === -1 ) precision = formatInfo.decimals;
					number = expandNumber( number * (current === "P" ? 100 : 1), precision, formatInfo );
					break;
				default:
					throw "Bad number format specifier: " + current;
			}
	
			var patternParts = /n|\$|-|%/g,
				ret = "";
			for ( ; ; ) {
				var index = patternParts.lastIndex,
					ar = patternParts.exec( pattern );
	
				ret += pattern.slice( index, ar ? ar.index : pattern.length );
	
				if ( !ar ) {
					break;
				}
	
				switch ( ar[0] ) {
					case "n":
						ret += number;
						break;
					case "$":
						ret += nf.currency.symbol;
						break;
					case "-":
						// don't make 0 negative
						if ( /[1-9]/.test(number) ) {
							ret += nf[ "-" ];
						}
						break;
					case "%":
						ret += nf.percent.symbol;
						break;
				}
			}
	
			return ret;
		};
	
	}());
	
	getTokenRegExp = function() {
		// regular expression for matching date and time tokens in format strings.
		return (/\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g);
	};
	
	getEra = function( date, eras ) {
		if ( !eras ) return 0;
		var start, ticks = date.getTime();
		for ( var i = 0, l = eras.length; i < l; i++ ) {
			start = eras[ i ].start;
			if ( start === null || ticks >= start ) {
				return i;
			}
		}
		return 0;
	};
	
	getEraYear = function( date, cal, era, sortable ) {
		var year = date.getFullYear();
		if ( !sortable && cal.eras ) {
			// convert normal gregorian year to era-shifted gregorian
			// year by subtracting the era offset
			year -= cal.eras[ era ].offset;
		}
		return year;
	};
	
	// parseExact
	(function() {
		var expandYear,
			getDayIndex,
			getMonthIndex,
			getParseRegExp,
			outOfRange,
			toUpper,
			toUpperArray;
	
		expandYear = function( cal, year ) {
			// expands 2-digit year into 4 digits.
			if ( year < 100 ) {
				var now = new Date(),
					era = getEra( now ),
					curr = getEraYear( now, cal, era ),
					twoDigitYearMax = cal.twoDigitYearMax;
				twoDigitYearMax = typeof twoDigitYearMax === "string" ? new Date().getFullYear() % 100 + parseInt( twoDigitYearMax, 10 ) : twoDigitYearMax;
				year += curr - ( curr % 100 );
				if ( year > twoDigitYearMax ) {
					year -= 100;
				}
			}
			return year;
		};
	
		getDayIndex = function	( cal, value, abbr ) {
			var ret,
				days = cal.days,
				upperDays = cal._upperDays;
			if ( !upperDays ) {
				cal._upperDays = upperDays = [
					toUpperArray( days.names ),
					toUpperArray( days.namesAbbr ),
					toUpperArray( days.namesShort )
				];
			}
			value = toUpper( value );
			if ( abbr ) {
				ret = arrayIndexOf( upperDays[1], value );
				if ( ret === -1 ) {
					ret = arrayIndexOf( upperDays[2], value );
				}
			}
			else {
				ret = arrayIndexOf( upperDays[0], value );
			}
			return ret;
		};
	
		getMonthIndex = function( cal, value, abbr ) {
			var months = cal.months,
				monthsGen = cal.monthsGenitive || cal.months,
				upperMonths = cal._upperMonths,
				upperMonthsGen = cal._upperMonthsGen;
			if ( !upperMonths ) {
				cal._upperMonths = upperMonths = [
					toUpperArray( months.names ),
					toUpperArray( months.namesAbbr )
				];
				cal._upperMonthsGen = upperMonthsGen = [
					toUpperArray( monthsGen.names ),
					toUpperArray( monthsGen.namesAbbr )
				];
			}
			value = toUpper( value );
			var i = arrayIndexOf( abbr ? upperMonths[1] : upperMonths[0], value );
			if ( i < 0 ) {
				i = arrayIndexOf( abbr ? upperMonthsGen[1] : upperMonthsGen[0], value );
			}
			return i;
		};
	
		getParseRegExp = function( cal, format ) {
			// converts a format string into a regular expression with groups that
			// can be used to extract date fields from a date string.
			// check for a cached parse regex.
			var re = cal._parseRegExp;
			if ( !re ) {
				cal._parseRegExp = re = {};
			}
			else {
				var reFormat = re[ format ];
				if ( reFormat ) {
					return reFormat;
				}
			}
	
			// expand single digit formats, then escape regular expression characters.
			var expFormat = expandFormat( cal, format ).replace( /([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1" ),
				regexp = [ "^" ],
				groups = [],
				index = 0,
				quoteCount = 0,
				tokenRegExp = getTokenRegExp(),
				match;
	
			// iterate through each date token found.
			while ( (match = tokenRegExp.exec(expFormat)) !== null ) {
				var preMatch = expFormat.slice( index, match.index );
				index = tokenRegExp.lastIndex;
	
				// don't replace any matches that occur inside a string literal.
				quoteCount += appendPreOrPostMatch( preMatch, regexp );
				if ( quoteCount % 2 ) {
					regexp.push( match[0] );
					continue;
				}
	
				// add a regex group for the token.
				var m = match[ 0 ],
					len = m.length,
					add;
				switch ( m ) {
					case "dddd": case "ddd":
					case "MMMM": case "MMM":
					case "gg": case "g":
						add = "(\\D+)";
						break;
					case "tt": case "t":
						add = "(\\D*)";
						break;
					case "yyyy":
					case "fff":
					case "ff":
					case "f":
						add = "(\\d{" + len + "})";
						break;
					case "dd": case "d":
					case "MM": case "M":
					case "yy": case "y":
					case "HH": case "H":
					case "hh": case "h":
					case "mm": case "m":
					case "ss": case "s":
						add = "(\\d\\d?)";
						break;
					case "zzz":
						add = "([+-]?\\d\\d?:\\d{2})";
						break;
					case "zz": case "z":
						add = "([+-]?\\d\\d?)";
						break;
					case "/":
						add = "(\\/)";
						break;
					default:
						throw "Invalid date format pattern \'" + m + "\'.";
				}
				if ( add ) {
					regexp.push( add );
				}
				groups.push( match[0] );
			}
			appendPreOrPostMatch( expFormat.slice(index), regexp );
			regexp.push( "$" );
	
			// allow whitespace to differ when matching formats.
			var regexpStr = regexp.join( "" ).replace( /\s+/g, "\\s+" ),
				parseRegExp = { "regExp": regexpStr, "groups": groups };
	
			// cache the regex for this format.
			return re[ format ] = parseRegExp;
		};
	
		outOfRange = function( value, low, high ) {
			return value < low || value > high;
		};
	
		toUpper = function( value ) {
			// "he-IL" has non-breaking space in weekday names.
			return value.split( "\u00A0" ).join( " " ).toUpperCase();
		};
	
		toUpperArray = function( arr ) {
			var results = [];
			for ( var i = 0, l = arr.length; i < l; i++ ) {
				results[ i ] = toUpper( arr[i] );
			}
			return results;
		};
	
		parseExact = function( value, format, culture ) {
			// try to parse the date string by matching against the format string
			// while using the specified culture for date field names.
			value = trim( value );
			var cal = culture.calendar,
				// convert date formats into regular expressions with groupings.
				// use the regexp to determine the input format and extract the date fields.
				parseInfo = getParseRegExp( cal, format ),
				match = new RegExp( parseInfo.regExp ).exec( value );
			if ( match === null ) {
				return null;
			}
			// found a date format that matches the input.
			var groups = parseInfo.groups,
				era = null, year = null, month = null, date = null, weekDay = null,
				hour = 0, hourOffset, min = 0, sec = 0, msec = 0, tzMinOffset = null,
				pmHour = false;
			// iterate the format groups to extract and set the date fields.
			for ( var j = 0, jl = groups.length; j < jl; j++ ) {
				var matchGroup = match[ j + 1 ];
				if ( matchGroup ) {
					var current = groups[ j ],
						clength = current.length,
						matchInt = parseInt( matchGroup, 10 );
					switch ( current ) {
						case "dd": case "d":
							// Day of month.
							date = matchInt;
							// check that date is generally in valid range, also checking overflow below.
							if ( outOfRange(date, 1, 31) ) return null;
							break;
						case "MMM": case "MMMM":
							month = getMonthIndex( cal, matchGroup, clength === 3 );
							if ( outOfRange(month, 0, 11) ) return null;
							break;
						case "M": case "MM":
							// Month.
							month = matchInt - 1;
							if ( outOfRange(month, 0, 11) ) return null;
							break;
						case "y": case "yy":
						case "yyyy":
							year = clength < 4 ? expandYear( cal, matchInt ) : matchInt;
							if ( outOfRange(year, 0, 9999) ) return null;
							break;
						case "h": case "hh":
							// Hours (12-hour clock).
							hour = matchInt;
							if ( hour === 12 ) hour = 0;
							if ( outOfRange(hour, 0, 11) ) return null;
							break;
						case "H": case "HH":
							// Hours (24-hour clock).
							hour = matchInt;
							if ( outOfRange(hour, 0, 23) ) return null;
							break;
						case "m": case "mm":
							// Minutes.
							min = matchInt;
							if ( outOfRange(min, 0, 59) ) return null;
							break;
						case "s": case "ss":
							// Seconds.
							sec = matchInt;
							if ( outOfRange(sec, 0, 59) ) return null;
							break;
						case "tt": case "t":
							// AM/PM designator.
							// see if it is standard, upper, or lower case PM. If not, ensure it is at least one of
							// the AM tokens. If not, fail the parse for this format.
							pmHour = cal.PM && ( matchGroup === cal.PM[0] || matchGroup === cal.PM[1] || matchGroup === cal.PM[2] );
							if (
								!pmHour && (
									!cal.AM || ( matchGroup !== cal.AM[0] && matchGroup !== cal.AM[1] && matchGroup !== cal.AM[2] )
								)
							) return null;
							break;
						case "f":
							// Deciseconds.
						case "ff":
							// Centiseconds.
						case "fff":
							// Milliseconds.
							msec = matchInt * Math.pow( 10, 3 - clength );
							if ( outOfRange(msec, 0, 999) ) return null;
							break;
						case "ddd":
							// Day of week.
						case "dddd":
							// Day of week.
							weekDay = getDayIndex( cal, matchGroup, clength === 3 );
							if ( outOfRange(weekDay, 0, 6) ) return null;
							break;
						case "zzz":
							// Time zone offset in +/- hours:min.
							var offsets = matchGroup.split( /:/ );
							if ( offsets.length !== 2 ) return null;
							hourOffset = parseInt( offsets[0], 10 );
							if ( outOfRange(hourOffset, -12, 13) ) return null;
							var minOffset = parseInt( offsets[1], 10 );
							if ( outOfRange(minOffset, 0, 59) ) return null;
							tzMinOffset = ( hourOffset * 60 ) + ( startsWith(matchGroup, "-") ? -minOffset : minOffset );
							break;
						case "z": case "zz":
							// Time zone offset in +/- hours.
							hourOffset = matchInt;
							if ( outOfRange(hourOffset, -12, 13) ) return null;
							tzMinOffset = hourOffset * 60;
							break;
						case "g": case "gg":
							var eraName = matchGroup;
							if ( !eraName || !cal.eras ) return null;
							eraName = trim( eraName.toLowerCase() );
							for ( var i = 0, l = cal.eras.length; i < l; i++ ) {
								if ( eraName === cal.eras[i].name.toLowerCase() ) {
									era = i;
									break;
								}
							}
							// could not find an era with that name
							if ( era === null ) return null;
							break;
					}
				}
			}
			var result = new Date(), defaultYear, convert = cal.convert;
			defaultYear = convert ? convert.fromGregorian( result )[ 0 ] : result.getFullYear();
			if ( year === null ) {
				year = defaultYear;
			}
			else if ( cal.eras ) {
				// year must be shifted to normal gregorian year
				// but not if year was not specified, its already normal gregorian
				// per the main if clause above.
				year += cal.eras[( era || 0 )].offset;
			}
			// set default day and month to 1 and January, so if unspecified, these are the defaults
			// instead of the current day/month.
			if ( month === null ) {
				month = 0;
			}
			if ( date === null ) {
				date = 1;
			}
			// now have year, month, and date, but in the culture's calendar.
			// convert to gregorian if necessary
			if ( convert ) {
				result = convert.toGregorian( year, month, date );
				// conversion failed, must be an invalid match
				if ( result === null ) return null;
			}
			else {
				// have to set year, month and date together to avoid overflow based on current date.
				result.setFullYear( year, month, date );
				// check to see if date overflowed for specified month (only checked 1-31 above).
				if ( result.getDate() !== date ) return null;
				// invalid day of week.
				if ( weekDay !== null && result.getDay() !== weekDay ) {
					return null;
				}
			}
			// if pm designator token was found make sure the hours fit the 24-hour clock.
			if ( pmHour && hour < 12 ) {
				hour += 12;
			}
			result.setHours( hour, min, sec, msec );
			if ( tzMinOffset !== null ) {
				// adjust timezone to utc before applying local offset.
				var adjustedMin = result.getMinutes() - ( tzMinOffset + result.getTimezoneOffset() );
				// Safari limits hours and minutes to the range of -127 to 127.  We need to use setHours
				// to ensure both these fields will not exceed this range.	adjustedMin will range
				// somewhere between -1440 and 1500, so we only need to split this into hours.
				result.setHours( result.getHours() + parseInt(adjustedMin / 60, 10), adjustedMin % 60 );
			}
			return result;
		};
	}());
	
	parseNegativePattern = function( value, nf, negativePattern ) {
		var neg = nf[ "-" ],
			pos = nf[ "+" ],
			ret;
		switch ( negativePattern ) {
			case "n -":
				neg = " " + neg;
				pos = " " + pos;
				/* falls through */
			case "n-":
				if ( endsWith(value, neg) ) {
					ret = [ "-", value.substr(0, value.length - neg.length) ];
				}
				else if ( endsWith(value, pos) ) {
					ret = [ "+", value.substr(0, value.length - pos.length) ];
				}
				break;
			case "- n":
				neg += " ";
				pos += " ";
				/* falls through */
			case "-n":
				if ( startsWith(value, neg) ) {
					ret = [ "-", value.substr(neg.length) ];
				}
				else if ( startsWith(value, pos) ) {
					ret = [ "+", value.substr(pos.length) ];
				}
				break;
			case "(n)":
				if ( startsWith(value, "(") && endsWith(value, ")") ) {
					ret = [ "-", value.substr(1, value.length - 2) ];
				}
				break;
		}
		return ret || [ "", value ];
	};
	
	//
	// public instance functions
	//
	
	Globalize.prototype.findClosestCulture = function( cultureSelector ) {
		return Globalize.findClosestCulture.call( this, cultureSelector );
	};
	
	Globalize.prototype.format = function( value, format, cultureSelector ) {
		return Globalize.format.call( this, value, format, cultureSelector );
	};
	
	Globalize.prototype.localize = function( key, cultureSelector ) {
		return Globalize.localize.call( this, key, cultureSelector );
	};
	
	Globalize.prototype.parseInt = function( value, radix, cultureSelector ) {
		return Globalize.parseInt.call( this, value, radix, cultureSelector );
	};
	
	Globalize.prototype.parseFloat = function( value, radix, cultureSelector ) {
		return Globalize.parseFloat.call( this, value, radix, cultureSelector );
	};
	
	Globalize.prototype.culture = function( cultureSelector ) {
		return Globalize.culture.call( this, cultureSelector );
	};
	
	//
	// public singleton functions
	//
	
	Globalize.addCultureInfo = function( cultureName, baseCultureName, info ) {
	
		var base = {},
			isNew = false;
	
		if ( typeof cultureName !== "string" ) {
			// cultureName argument is optional string. If not specified, assume info is first
			// and only argument. Specified info deep-extends current culture.
			info = cultureName;
			cultureName = this.culture().name;
			base = this.cultures[ cultureName ];
		} else if ( typeof baseCultureName !== "string" ) {
			// baseCultureName argument is optional string. If not specified, assume info is second
			// argument. Specified info deep-extends specified culture.
			// If specified culture does not exist, create by deep-extending default
			info = baseCultureName;
			isNew = ( this.cultures[ cultureName ] == null );
			base = this.cultures[ cultureName ] || this.cultures[ "default" ];
		} else {
			// cultureName and baseCultureName specified. Assume a new culture is being created
			// by deep-extending an specified base culture
			isNew = true;
			base = this.cultures[ baseCultureName ];
		}
	
		this.cultures[ cultureName ] = extend(true, {},
			base,
			info
		);
		// Make the standard calendar the current culture if it's a new culture
		if ( isNew ) {
			this.cultures[ cultureName ].calendar = this.cultures[ cultureName ].calendars.standard;
		}
	};
	
	Globalize.findClosestCulture = function( name ) {
		var match;
		if ( !name ) {
			return this.findClosestCulture( this.cultureSelector ) || this.cultures[ "default" ];
		}
		if ( typeof name === "string" ) {
			name = name.split( "," );
		}
		if ( isArray(name) ) {
			var lang,
				cultures = this.cultures,
				list = name,
				i, l = list.length,
				prioritized = [];
			for ( i = 0; i < l; i++ ) {
				name = trim( list[i] );
				var pri, parts = name.split( ";" );
				lang = trim( parts[0] );
				if ( parts.length === 1 ) {
					pri = 1;
				}
				else {
					name = trim( parts[1] );
					if ( name.indexOf("q=") === 0 ) {
						name = name.substr( 2 );
						pri = parseFloat( name );
						pri = isNaN( pri ) ? 0 : pri;
					}
					else {
						pri = 1;
					}
				}
				prioritized.push({ lang: lang, pri: pri });
			}
			prioritized.sort(function( a, b ) {
				if ( a.pri < b.pri ) {
					return 1;
				} else if ( a.pri > b.pri ) {
					return -1;
				}
				return 0;
			});
			// exact match
			for ( i = 0; i < l; i++ ) {
				lang = prioritized[ i ].lang;
				match = cultures[ lang ];
				if ( match ) {
					return match;
				}
			}
	
			// neutral language match
			for ( i = 0; i < l; i++ ) {
				lang = prioritized[ i ].lang;
				do {
					var index = lang.lastIndexOf( "-" );
					if ( index === -1 ) {
						break;
					}
					// strip off the last part. e.g. en-US => en
					lang = lang.substr( 0, index );
					match = cultures[ lang ];
					if ( match ) {
						return match;
					}
				}
				while ( 1 );
			}
	
			// last resort: match first culture using that language
			for ( i = 0; i < l; i++ ) {
				lang = prioritized[ i ].lang;
				for ( var cultureKey in cultures ) {
					var culture = cultures[ cultureKey ];
					if ( culture.language == lang ) {
						return culture;
					}
				}
			}
		}
		else if ( typeof name === "object" ) {
			return name;
		}
		return match || null;
	};
	
	Globalize.format = function( value, format, cultureSelector ) {
		var culture = this.findClosestCulture( cultureSelector );
		if ( value instanceof Date ) {
			value = formatDate( value, format, culture );
		}
		else if ( typeof value === "number" ) {
			value = formatNumber( value, format, culture );
		}
		return value;
	};
	
	Globalize.localize = function( key, cultureSelector ) {
		return this.findClosestCulture( cultureSelector ).messages[ key ] ||
			this.cultures[ "default" ].messages[ key ];
	};
	
	Globalize.parseDate = function( value, formats, culture ) {
		culture = this.findClosestCulture( culture );
	
		var date, prop, patterns;
		if ( formats ) {
			if ( typeof formats === "string" ) {
				formats = [ formats ];
			}
			if ( formats.length ) {
				for ( var i = 0, l = formats.length; i < l; i++ ) {
					var format = formats[ i ];
					if ( format ) {
						date = parseExact( value, format, culture );
						if ( date ) {
							break;
						}
					}
				}
			}
		} else {
			patterns = culture.calendar.patterns;
			for ( prop in patterns ) {
				date = parseExact( value, patterns[prop], culture );
				if ( date ) {
					break;
				}
			}
		}
	
		return date || null;
	};
	
	Globalize.parseInt = function( value, radix, cultureSelector ) {
		return truncate( Globalize.parseFloat(value, radix, cultureSelector) );
	};
	
	Globalize.parseFloat = function( value, radix, cultureSelector ) {
		// radix argument is optional
		if ( typeof radix !== "number" ) {
			cultureSelector = radix;
			radix = 10;
		}
	
		var culture = this.findClosestCulture( cultureSelector );
		var ret = NaN,
			nf = culture.numberFormat;
	
		if ( value.indexOf(culture.numberFormat.currency.symbol) > -1 ) {
			// remove currency symbol
			value = value.replace( culture.numberFormat.currency.symbol, "" );
			// replace decimal seperator
			value = value.replace( culture.numberFormat.currency["."], culture.numberFormat["."] );
		}
	
		//Remove percentage character from number string before parsing
		if ( value.indexOf(culture.numberFormat.percent.symbol) > -1){
			value = value.replace( culture.numberFormat.percent.symbol, "" );
		}
	
		// remove spaces: leading, trailing and between - and number. Used for negative currency pt-BR
		value = value.replace( / /g, "" );
	
		// allow infinity or hexidecimal
		if ( regexInfinity.test(value) ) {
			ret = parseFloat( value );
		}
		else if ( !radix && regexHex.test(value) ) {
			ret = parseInt( value, 16 );
		}
		else {
	
			// determine sign and number
			var signInfo = parseNegativePattern( value, nf, nf.pattern[0] ),
				sign = signInfo[ 0 ],
				num = signInfo[ 1 ];
	
			// #44 - try parsing as "(n)"
			if ( sign === "" && nf.pattern[0] !== "(n)" ) {
				signInfo = parseNegativePattern( value, nf, "(n)" );
				sign = signInfo[ 0 ];
				num = signInfo[ 1 ];
			}
	
			// try parsing as "-n"
			if ( sign === "" && nf.pattern[0] !== "-n" ) {
				signInfo = parseNegativePattern( value, nf, "-n" );
				sign = signInfo[ 0 ];
				num = signInfo[ 1 ];
			}
	
			sign = sign || "+";
	
			// determine exponent and number
			var exponent,
				intAndFraction,
				exponentPos = num.indexOf( "e" );
			if ( exponentPos < 0 ) exponentPos = num.indexOf( "E" );
			if ( exponentPos < 0 ) {
				intAndFraction = num;
				exponent = null;
			}
			else {
				intAndFraction = num.substr( 0, exponentPos );
				exponent = num.substr( exponentPos + 1 );
			}
			// determine decimal position
			var integer,
				fraction,
				decSep = nf[ "." ],
				decimalPos = intAndFraction.indexOf( decSep );
			if ( decimalPos < 0 ) {
				integer = intAndFraction;
				fraction = null;
			}
			else {
				integer = intAndFraction.substr( 0, decimalPos );
				fraction = intAndFraction.substr( decimalPos + decSep.length );
			}
			// handle groups (e.g. 1,000,000)
			var groupSep = nf[ "," ];
			integer = integer.split( groupSep ).join( "" );
			var altGroupSep = groupSep.replace( /\u00A0/g, " " );
			if ( groupSep !== altGroupSep ) {
				integer = integer.split( altGroupSep ).join( "" );
			}
			// build a natively parsable number string
			var p = sign + integer;
			if ( fraction !== null ) {
				p += "." + fraction;
			}
			if ( exponent !== null ) {
				// exponent itself may have a number patternd
				var expSignInfo = parseNegativePattern( exponent, nf, "-n" );
				p += "e" + ( expSignInfo[0] || "+" ) + expSignInfo[ 1 ];
			}
			if ( regexParseFloat.test(p) ) {
				ret = parseFloat( p );
			}
		}
		return ret;
	};
	
	Globalize.culture = function( cultureSelector ) {
		// setter
		if ( typeof cultureSelector !== "undefined" ) {
			this.cultureSelector = cultureSelector;
		}
		// getter
		return this.findClosestCulture( cultureSelector ) || this.cultures[ "default" ];
	};
	
	}( this ));


/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Utils = __webpack_require__(136);
	
	
	// Declare internals
	
	var internals = {
	    delimiter: '&'
	};
	
	
	internals.stringify = function (obj, prefix) {
	
	    if (Utils.isBuffer(obj)) {
	        obj = obj.toString();
	    }
	    else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    }
	    else if (obj === null) {
	        obj = '';
	    }
	
	    if (typeof obj === 'string' ||
	        typeof obj === 'number' ||
	        typeof obj === 'boolean') {
	
	        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
	    }
	
	    var values = [];
	
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']'));
	        }
	    }
	
	    return values;
	};
	
	
	module.exports = function (obj, options) {
	
	    options = options || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;
	
	    var keys = [];
	
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            keys = keys.concat(internals.stringify(obj[key], key));
	        }
	    }
	
	    return keys.join(delimiter);
	};


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules
	
	var Utils = __webpack_require__(136);
	
	
	// Declare internals
	
	var internals = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000
	};
	
	
	internals.parseValues = function (str, options) {
	
	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
	
	    for (var i = 0, il = parts.length; i < il; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;
	
	        if (pos === -1) {
	            obj[Utils.decode(part)] = '';
	        }
	        else {
	            var key = Utils.decode(part.slice(0, pos));
	            var val = Utils.decode(part.slice(pos + 1));
	
	            if (!obj[key]) {
	                obj[key] = val;
	            }
	            else {
	                obj[key] = [].concat(obj[key]).concat(val);
	            }
	        }
	    }
	
	    return obj;
	};
	
	
	internals.parseObject = function (chain, val, options) {
	
	    if (!chain.length) {
	        return val;
	    }
	
	    var root = chain.shift();
	
	    var obj = {};
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(internals.parseObject(chain, val, options));
	    }
	    else {
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        if (!isNaN(index) &&
	            root !== cleanRoot &&
	            index <= options.arrayLimit) {
	
	            obj = [];
	            obj[index] = internals.parseObject(chain, val, options);
	        }
	        else {
	            obj[cleanRoot] = internals.parseObject(chain, val, options);
	        }
	    }
	
	    return obj;
	};
	
	
	internals.parseKeys = function (key, val, options) {
	
	    if (!key) {
	        return;
	    }
	
	    // The regex chunks
	
	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;
	
	    // Get the parent
	
	    var segment = parent.exec(key);
	
	    // Don't allow them to overwrite object prototype properties
	
	    if (Object.prototype.hasOwnProperty(segment[1])) {
	        return;
	    }
	
	    // Stash the parent if it exists
	
	    var keys = [];
	    if (segment[1]) {
	        keys.push(segment[1]);
	    }
	
	    // Loop through children appending to the array until we hit depth
	
	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {
	
	        ++i;
	        if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
	            keys.push(segment[1]);
	        }
	    }
	
	    // If there's a remainder, just add whatever is left
	
	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }
	
	    return internals.parseObject(keys, val, options);
	};
	
	
	module.exports = function (str, options) {
	
	    if (str === '' ||
	        str === null ||
	        typeof str === 'undefined') {
	
	        return {};
	    }
	
	    options = options || {};
	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;
	
	    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
	    var obj = {};
	
	    // Iterate over the keys and setup the new object
	
	    var keys = Object.keys(tempObj);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        var newObj = internals.parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj);
	    }
	
	    return Utils.compact(obj);
	};


/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = extend
	
	function extend() {
	    var target = {}
	
	    for (var i = 0; i < arguments.length; i++) {
	        var source = arguments[i]
	
	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                target[key] = source[key]
	            }
	        }
	    }
	
	    return target
	}


/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
		return function makePromise(environment) {
	
			var tasks = environment.scheduler;
	
			var objectCreate = Object.create ||
				function(proto) {
					function Child() {}
					Child.prototype = proto;
					return new Child();
				};
	
			/**
			 * Create a promise whose fate is determined by resolver
			 * @constructor
			 * @returns {Promise} promise
			 * @name Promise
			 */
			function Promise(resolver, handler) {
				this._handler = resolver === Handler ? handler : init(resolver);
			}
	
			/**
			 * Run the supplied resolver
			 * @param resolver
			 * @returns {Pending}
			 */
			function init(resolver) {
				var handler = new Pending();
	
				try {
					resolver(promiseResolve, promiseReject, promiseNotify);
				} catch (e) {
					promiseReject(e);
				}
	
				return handler;
	
				/**
				 * Transition from pre-resolution state to post-resolution state, notifying
				 * all listeners of the ultimate fulfillment or rejection
				 * @param {*} x resolution value
				 */
				function promiseResolve (x) {
					handler.resolve(x);
				}
				/**
				 * Reject this promise with reason, which will be used verbatim
				 * @param {Error|*} reason rejection reason, strongly suggested
				 *   to be an Error type
				 */
				function promiseReject (reason) {
					handler.reject(reason);
				}
	
				/**
				 * Issue a progress event, notifying all progress listeners
				 * @param {*} x progress event payload to pass to all listeners
				 */
				function promiseNotify (x) {
					handler.notify(x);
				}
			}
	
			// Creation
	
			Promise.resolve = resolve;
			Promise.reject = reject;
			Promise.never = never;
	
			Promise._defer = defer;
			Promise._handler = getHandler;
	
			/**
			 * Returns a trusted promise. If x is already a trusted promise, it is
			 * returned, otherwise returns a new trusted Promise which follows x.
			 * @param  {*} x
			 * @return {Promise} promise
			 */
			function resolve(x) {
				return isPromise(x) ? x
					: new Promise(Handler, new Async(getHandler(x)));
			}
	
			/**
			 * Return a reject promise with x as its reason (x is used verbatim)
			 * @param {*} x
			 * @returns {Promise} rejected promise
			 */
			function reject(x) {
				return new Promise(Handler, new Async(new Rejected(x)));
			}
	
			/**
			 * Return a promise that remains pending forever
			 * @returns {Promise} forever-pending promise.
			 */
			function never() {
				return foreverPendingPromise; // Should be frozen
			}
	
			/**
			 * Creates an internal {promise, resolver} pair
			 * @private
			 * @returns {Promise}
			 */
			function defer() {
				return new Promise(Handler, new Pending());
			}
	
			// Transformation and flow control
	
			/**
			 * Transform this promise's fulfillment value, returning a new Promise
			 * for the transformed result.  If the promise cannot be fulfilled, onRejected
			 * is called with the reason.  onProgress *may* be called with updates toward
			 * this promise's fulfillment.
			 * @param {function=} onFulfilled fulfillment handler
			 * @param {function=} onRejected rejection handler
			 * @deprecated @param {function=} onProgress progress handler
			 * @return {Promise} new promise
			 */
			Promise.prototype.then = function(onFulfilled, onRejected) {
				var parent = this._handler;
				var state = parent.join().state();
	
				if ((typeof onFulfilled !== 'function' && state > 0) ||
					(typeof onRejected !== 'function' && state < 0)) {
					// Short circuit: value will not change, simply share handler
					return new this.constructor(Handler, parent);
				}
	
				var p = this._beget();
				var child = p._handler;
	
				parent.chain(child, parent.receiver, onFulfilled, onRejected,
						arguments.length > 2 ? arguments[2] : void 0);
	
				return p;
			};
	
			/**
			 * If this promise cannot be fulfilled due to an error, call onRejected to
			 * handle the error. Shortcut for .then(undefined, onRejected)
			 * @param {function?} onRejected
			 * @return {Promise}
			 */
			Promise.prototype['catch'] = function(onRejected) {
				return this.then(void 0, onRejected);
			};
	
			/**
			 * Creates a new, pending promise of the same type as this promise
			 * @private
			 * @returns {Promise}
			 */
			Promise.prototype._beget = function() {
				var parent = this._handler;
				var child = new Pending(parent.receiver, parent.join().context);
				return new this.constructor(Handler, child);
			};
	
			// Array combinators
	
			Promise.all = all;
			Promise.race = race;
	
			/**
			 * Return a promise that will fulfill when all promises in the
			 * input array have fulfilled, or will reject when one of the
			 * promises rejects.
			 * @param {array} promises array of promises
			 * @returns {Promise} promise for array of fulfillment values
			 */
			function all(promises) {
				/*jshint maxcomplexity:8*/
				var resolver = new Pending();
				var pending = promises.length >>> 0;
				var results = new Array(pending);
	
				var i, h, x, s;
				for (i = 0; i < promises.length; ++i) {
					x = promises[i];
	
					if (x === void 0 && !(i in promises)) {
						--pending;
						continue;
					}
	
					if (maybeThenable(x)) {
						h = getHandlerMaybeThenable(x);
	
						s = h.state();
						if (s === 0) {
							h.fold(settleAt, i, results, resolver);
						} else if (s > 0) {
							results[i] = h.value;
							--pending;
						} else {
							unreportRemaining(promises, i+1, h);
							resolver.become(h);
							break;
						}
	
					} else {
						results[i] = x;
						--pending;
					}
				}
	
				if(pending === 0) {
					resolver.become(new Fulfilled(results));
				}
	
				return new Promise(Handler, resolver);
	
				function settleAt(i, x, resolver) {
					/*jshint validthis:true*/
					this[i] = x;
					if(--pending === 0) {
						resolver.become(new Fulfilled(this));
					}
				}
			}
	
			function unreportRemaining(promises, start, rejectedHandler) {
				var i, h, x;
				for(i=start; i<promises.length; ++i) {
					x = promises[i];
					if(maybeThenable(x)) {
						h = getHandlerMaybeThenable(x);
	
						if(h !== rejectedHandler) {
							h.visit(h, void 0, h._unreport);
						}
					}
				}
			}
	
			/**
			 * Fulfill-reject competitive race. Return a promise that will settle
			 * to the same state as the earliest input promise to settle.
			 *
			 * WARNING: The ES6 Promise spec requires that race()ing an empty array
			 * must return a promise that is pending forever.  This implementation
			 * returns a singleton forever-pending promise, the same singleton that is
			 * returned by Promise.never(), thus can be checked with ===
			 *
			 * @param {array} promises array of promises to race
			 * @returns {Promise} if input is non-empty, a promise that will settle
			 * to the same outcome as the earliest input promise to settle. if empty
			 * is empty, returns a promise that will never settle.
			 */
			function race(promises) {
				// Sigh, race([]) is untestable unless we return *something*
				// that is recognizable without calling .then() on it.
				if(Object(promises) === promises && promises.length === 0) {
					return never();
				}
	
				var h = new Pending();
				var i, x;
				for(i=0; i<promises.length; ++i) {
					x = promises[i];
					if (x !== void 0 && i in promises) {
						getHandler(x).visit(h, h.resolve, h.reject);
					}
				}
				return new Promise(Handler, h);
			}
	
			// Promise internals
			// Below this, everything is @private
	
			/**
			 * Get an appropriate handler for x, without checking for cycles
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandler(x) {
				if(isPromise(x)) {
					return x._handler.join();
				}
				return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
			}
	
			/**
			 * Get a handler for thenable x.
			 * NOTE: You must only call this if maybeThenable(x) == true
			 * @param {object|function|Promise} x
			 * @returns {object} handler
			 */
			function getHandlerMaybeThenable(x) {
				return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
			}
	
			/**
			 * Get a handler for potentially untrusted thenable x
			 * @param {*} x
			 * @returns {object} handler
			 */
			function getHandlerUntrusted(x) {
				try {
					var untrustedThen = x.then;
					return typeof untrustedThen === 'function'
						? new Thenable(untrustedThen, x)
						: new Fulfilled(x);
				} catch(e) {
					return new Rejected(e);
				}
			}
	
			/**
			 * Handler for a promise that is pending forever
			 * @constructor
			 */
			function Handler() {}
	
			Handler.prototype.when
				= Handler.prototype.become
				= Handler.prototype.notify
				= Handler.prototype.fail
				= Handler.prototype._unreport
				= Handler.prototype._report
				= noop;
	
			Handler.prototype._state = 0;
	
			Handler.prototype.state = function() {
				return this._state;
			};
	
			/**
			 * Recursively collapse handler chain to find the handler
			 * nearest to the fully resolved value.
			 * @returns {object} handler nearest the fully resolved value
			 */
			Handler.prototype.join = function() {
				var h = this;
				while(h.handler !== void 0) {
					h = h.handler;
				}
				return h;
			};
	
			Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
				this.when({
					resolver: to,
					receiver: receiver,
					fulfilled: fulfilled,
					rejected: rejected,
					progress: progress
				});
			};
	
			Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
				this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
			};
	
			Handler.prototype.fold = function(f, z, c, to) {
				this.visit(to, function(x) {
					f.call(c, z, x, this);
				}, to.reject, to.notify);
			};
	
			/**
			 * Handler that invokes fail() on any handler it becomes
			 * @constructor
			 */
			function FailIfRejected() {}
	
			inherit(Handler, FailIfRejected);
	
			FailIfRejected.prototype.become = function(h) {
				h.fail();
			};
	
			var failIfRejected = new FailIfRejected();
	
			/**
			 * Handler that manages a queue of consumers waiting on a pending promise
			 * @constructor
			 */
			function Pending(receiver, inheritedContext) {
				Promise.createContext(this, inheritedContext);
	
				this.consumers = void 0;
				this.receiver = receiver;
				this.handler = void 0;
				this.resolved = false;
			}
	
			inherit(Handler, Pending);
	
			Pending.prototype._state = 0;
	
			Pending.prototype.resolve = function(x) {
				this.become(getHandler(x));
			};
	
			Pending.prototype.reject = function(x) {
				if(this.resolved) {
					return;
				}
	
				this.become(new Rejected(x));
			};
	
			Pending.prototype.join = function() {
				if (!this.resolved) {
					return this;
				}
	
				var h = this;
	
				while (h.handler !== void 0) {
					h = h.handler;
					if (h === this) {
						return this.handler = cycle();
					}
				}
	
				return h;
			};
	
			Pending.prototype.run = function() {
				var q = this.consumers;
				var handler = this.join();
				this.consumers = void 0;
	
				for (var i = 0; i < q.length; ++i) {
					handler.when(q[i]);
				}
			};
	
			Pending.prototype.become = function(handler) {
				if(this.resolved) {
					return;
				}
	
				this.resolved = true;
				this.handler = handler;
				if(this.consumers !== void 0) {
					tasks.enqueue(this);
				}
	
				if(this.context !== void 0) {
					handler._report(this.context);
				}
			};
	
			Pending.prototype.when = function(continuation) {
				if(this.resolved) {
					tasks.enqueue(new ContinuationTask(continuation, this.handler));
				} else {
					if(this.consumers === void 0) {
						this.consumers = [continuation];
					} else {
						this.consumers.push(continuation);
					}
				}
			};
	
			Pending.prototype.notify = function(x) {
				if(!this.resolved) {
					tasks.enqueue(new ProgressTask(x, this));
				}
			};
	
			Pending.prototype.fail = function(context) {
				var c = typeof context === 'undefined' ? this.context : context;
				this.resolved && this.handler.join().fail(c);
			};
	
			Pending.prototype._report = function(context) {
				this.resolved && this.handler.join()._report(context);
			};
	
			Pending.prototype._unreport = function() {
				this.resolved && this.handler.join()._unreport();
			};
	
			/**
			 * Wrap another handler and force it into a future stack
			 * @param {object} handler
			 * @constructor
			 */
			function Async(handler) {
				this.handler = handler;
			}
	
			inherit(Handler, Async);
	
			Async.prototype.when = function(continuation) {
				tasks.enqueue(new ContinuationTask(continuation, this));
			};
	
			Async.prototype._report = function(context) {
				this.join()._report(context);
			};
	
			Async.prototype._unreport = function() {
				this.join()._unreport();
			};
	
			/**
			 * Handler that wraps an untrusted thenable and assimilates it in a future stack
			 * @param {function} then
			 * @param {{then: function}} thenable
			 * @constructor
			 */
			function Thenable(then, thenable) {
				Pending.call(this);
				tasks.enqueue(new AssimilateTask(then, thenable, this));
			}
	
			inherit(Pending, Thenable);
	
			/**
			 * Handler for a fulfilled promise
			 * @param {*} x fulfillment value
			 * @constructor
			 */
			function Fulfilled(x) {
				Promise.createContext(this);
				this.value = x;
			}
	
			inherit(Handler, Fulfilled);
	
			Fulfilled.prototype._state = 1;
	
			Fulfilled.prototype.fold = function(f, z, c, to) {
				runContinuation3(f, z, this, c, to);
			};
	
			Fulfilled.prototype.when = function(cont) {
				runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
			};
	
			var errorId = 0;
	
			/**
			 * Handler for a rejected promise
			 * @param {*} x rejection reason
			 * @constructor
			 */
			function Rejected(x) {
				Promise.createContext(this);
	
				this.id = ++errorId;
				this.value = x;
				this.handled = false;
				this.reported = false;
	
				this._report();
			}
	
			inherit(Handler, Rejected);
	
			Rejected.prototype._state = -1;
	
			Rejected.prototype.fold = function(f, z, c, to) {
				to.become(this);
			};
	
			Rejected.prototype.when = function(cont) {
				if(typeof cont.rejected === 'function') {
					this._unreport();
				}
				runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
			};
	
			Rejected.prototype._report = function(context) {
				tasks.afterQueue(new ReportTask(this, context));
			};
	
			Rejected.prototype._unreport = function() {
				this.handled = true;
				tasks.afterQueue(new UnreportTask(this));
			};
	
			Rejected.prototype.fail = function(context) {
				Promise.onFatalRejection(this, context === void 0 ? this.context : context);
			};
	
			function ReportTask(rejection, context) {
				this.rejection = rejection;
				this.context = context;
			}
	
			ReportTask.prototype.run = function() {
				if(!this.rejection.handled) {
					this.rejection.reported = true;
					Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
				}
			};
	
			function UnreportTask(rejection) {
				this.rejection = rejection;
			}
	
			UnreportTask.prototype.run = function() {
				if(this.rejection.reported) {
					Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
				}
			};
	
			// Unhandled rejection hooks
			// By default, everything is a noop
	
			// TODO: Better names: "annotate"?
			Promise.createContext
				= Promise.enterContext
				= Promise.exitContext
				= Promise.onPotentiallyUnhandledRejection
				= Promise.onPotentiallyUnhandledRejectionHandled
				= Promise.onFatalRejection
				= noop;
	
			// Errors and singletons
	
			var foreverPendingHandler = new Handler();
			var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);
	
			function cycle() {
				return new Rejected(new TypeError('Promise cycle'));
			}
	
			// Task runners
	
			/**
			 * Run a single consumer
			 * @constructor
			 */
			function ContinuationTask(continuation, handler) {
				this.continuation = continuation;
				this.handler = handler;
			}
	
			ContinuationTask.prototype.run = function() {
				this.handler.join().when(this.continuation);
			};
	
			/**
			 * Run a queue of progress handlers
			 * @constructor
			 */
			function ProgressTask(value, handler) {
				this.handler = handler;
				this.value = value;
			}
	
			ProgressTask.prototype.run = function() {
				var q = this.handler.consumers;
				if(q === void 0) {
					return;
				}
	
				for (var c, i = 0; i < q.length; ++i) {
					c = q[i];
					runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
				}
			};
	
			/**
			 * Assimilate a thenable, sending it's value to resolver
			 * @param {function} then
			 * @param {object|function} thenable
			 * @param {object} resolver
			 * @constructor
			 */
			function AssimilateTask(then, thenable, resolver) {
				this._then = then;
				this.thenable = thenable;
				this.resolver = resolver;
			}
	
			AssimilateTask.prototype.run = function() {
				var h = this.resolver;
				tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);
	
				function _resolve(x) { h.resolve(x); }
				function _reject(x)  { h.reject(x); }
				function _notify(x)  { h.notify(x); }
			};
	
			function tryAssimilate(then, thenable, resolve, reject, notify) {
				try {
					then.call(thenable, resolve, reject, notify);
				} catch (e) {
					reject(e);
				}
			}
	
			// Other helpers
	
			/**
			 * @param {*} x
			 * @returns {boolean} true iff x is a trusted Promise
			 */
			function isPromise(x) {
				return x instanceof Promise;
			}
	
			/**
			 * Test just enough to rule out primitives, in order to take faster
			 * paths in some code
			 * @param {*} x
			 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
			 */
			function maybeThenable(x) {
				return (typeof x === 'object' || typeof x === 'function') && x !== null;
			}
	
			function runContinuation1(f, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}
	
				Promise.enterContext(h);
				tryCatchReject(f, h.value, receiver, next);
				Promise.exitContext();
			}
	
			function runContinuation3(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.become(h);
				}
	
				Promise.enterContext(h);
				tryCatchReject3(f, x, h.value, receiver, next);
				Promise.exitContext();
			}
	
			function runNotify(f, x, h, receiver, next) {
				if(typeof f !== 'function') {
					return next.notify(x);
				}
	
				Promise.enterContext(h);
				tryCatchReturn(f, x, receiver, next);
				Promise.exitContext();
			}
	
			/**
			 * Return f.call(thisArg, x), or if it throws return a rejected promise for
			 * the thrown exception
			 */
			function tryCatchReject(f, x, thisArg, next) {
				try {
					next.become(getHandler(f.call(thisArg, x)));
				} catch(e) {
					next.become(new Rejected(e));
				}
			}
	
			/**
			 * Same as above, but includes the extra argument parameter.
			 */
			function tryCatchReject3(f, x, y, thisArg, next) {
				try {
					f.call(thisArg, x, y, next);
				} catch(e) {
					next.become(new Rejected(e));
				}
			}
	
			/**
			 * Return f.call(thisArg, x), or if it throws, *return* the exception
			 */
			function tryCatchReturn(f, x, thisArg, next) {
				try {
					next.notify(f.call(thisArg, x));
				} catch(e) {
					next.notify(e);
				}
			}
	
			function inherit(Parent, Child) {
				Child.prototype = objectCreate(Parent.prototype);
				Child.prototype.constructor = Child;
			}
	
			function noop() {}
	
			return Promise;
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(175)));


/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		var Queue = __webpack_require__(174);
	
		// Credit to Twisol (https://github.com/Twisol) for suggesting
		// this type of extensible queue + trampoline approach for next-tick conflation.
	
		/**
		 * Async task scheduler
		 * @param {function} async function to schedule a single async function
		 * @constructor
		 */
		function Scheduler(async) {
			this._async = async;
			this._queue = new Queue(15);
			this._afterQueue = new Queue(5);
			this._running = false;
	
			var self = this;
			this.drain = function() {
				self._drain();
			};
		}
	
		/**
		 * Enqueue a task
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.enqueue = function(task) {
			this._add(this._queue, task);
		};
	
		/**
		 * Enqueue a task to run after the main task queue
		 * @param {{ run:function }} task
		 */
		Scheduler.prototype.afterQueue = function(task) {
			this._add(this._afterQueue, task);
		};
	
		/**
		 * Drain the handler queue entirely, and then the after queue
		 */
		Scheduler.prototype._drain = function() {
			runQueue(this._queue);
			this._running = false;
			runQueue(this._afterQueue);
		};
	
		/**
		 * Add a task to the q, and schedule drain if not already scheduled
		 * @param {Queue} queue
		 * @param {{run:function}} task
		 * @private
		 */
		Scheduler.prototype._add = function(queue, task) {
			queue.push(task);
			if(!this._running) {
				this._running = true;
				this._async(this.drain);
			}
		};
	
		/**
		 * Run all the tasks in the q
		 * @param queue
		 */
		function runQueue(queue) {
			while(queue.length > 0) {
				queue.shift().run();
			}
		}
	
		return Scheduler;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(175)));


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(process) {/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require) {
	
		// Sniff "best" async scheduling option
		// Prefer process.nextTick or MutationObserver, then check for
		// vertx and finally fall back to setTimeout
	
		/*jshint maxcomplexity:6*/
		/*global process,document,setTimeout,MutationObserver,WebKitMutationObserver*/
		var nextTick, MutationObs;
	
		if (typeof process !== 'undefined' && process !== null &&
			typeof process.nextTick === 'function') {
			nextTick = function(f) {
				process.nextTick(f);
			};
	
		} else if (MutationObs =
			(typeof MutationObserver === 'function' && MutationObserver) ||
			(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver)) {
			nextTick = (function (document, MutationObserver) {
				var scheduled;
				var el = document.createElement('div');
				var o = new MutationObserver(run);
				o.observe(el, { attributes: true });
	
				function run() {
					var f = scheduled;
					scheduled = void 0;
					f();
				}
	
				return function (f) {
					scheduled = f;
					el.setAttribute('class', 'x');
				};
			}(document, MutationObs));
	
		} else {
			nextTick = (function(cjsRequire) {
				var vertx;
				try {
					// vert.x 1.x || 2.x
					vertx = __webpack_require__(173);
				} catch (ignore) {}
	
				if (vertx) {
					if (typeof vertx.runOnLoop === 'function') {
						return vertx.runOnLoop;
					}
					if (typeof vertx.runOnContext === 'function') {
						return vertx.runOnContext;
					}
				}
	
				// capture setTimeout to avoid being caught by fake timers
				// used in time based tests
				var capturedSetTimeout = setTimeout;
				return function (t) {
					capturedSetTimeout(t, 0);
				};
			}(require));
		}
	
		return nextTick;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(175)));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(179)))

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	/* (ignored) */

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/** @license MIT License (c) copyright 2010-2014 original author or authors */
	/** @author Brian Cavalier */
	/** @author John Hann */
	
	(function(define) { 'use strict';
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		/**
		 * Circular queue
		 * @param {number} capacityPow2 power of 2 to which this queue's capacity
		 *  will be set initially. eg when capacityPow2 == 3, queue capacity
		 *  will be 8.
		 * @constructor
		 */
		function Queue(capacityPow2) {
			this.head = this.tail = this.length = 0;
			this.buffer = new Array(1 << capacityPow2);
		}
	
		Queue.prototype.push = function(x) {
			if(this.length === this.buffer.length) {
				this._ensureCapacity(this.length * 2);
			}
	
			this.buffer[this.tail] = x;
			this.tail = (this.tail + 1) & (this.buffer.length - 1);
			++this.length;
			return this.length;
		};
	
		Queue.prototype.shift = function() {
			var x = this.buffer[this.head];
			this.buffer[this.head] = void 0;
			this.head = (this.head + 1) & (this.buffer.length - 1);
			--this.length;
			return x;
		};
	
		Queue.prototype._ensureCapacity = function(capacity) {
			var head = this.head;
			var buffer = this.buffer;
			var newBuffer = new Array(capacity);
			var i = 0;
			var len;
	
			if(head === 0) {
				len = this.length;
				for(; i<len; ++i) {
					newBuffer[i] = buffer[i];
				}
			} else {
				capacity = buffer.length;
				len = this.tail;
				for(; head<capacity; ++i, ++head) {
					newBuffer[i] = buffer[head];
				}
	
				for(head=0; head<len; ++i, ++head) {
					newBuffer[i] = buffer[head];
				}
			}
	
			this.buffer = newBuffer;
			this.head = 0;
			this.tail = this.length;
		};
	
		return Queue;
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}(__webpack_require__(175)));


/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	exports.read = function(buffer, offset, isLE, mLen, nBytes) {
	  var e, m,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      nBits = -7,
	      i = isLE ? (nBytes - 1) : 0,
	      d = isLE ? -1 : 1,
	      s = buffer[offset + i];
	
	  i += d;
	
	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
	
	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
	
	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity);
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
	};
	
	exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c,
	      eLen = nBytes * 8 - mLen - 1,
	      eMax = (1 << eLen) - 1,
	      eBias = eMax >> 1,
	      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
	      i = isLE ? 0 : (nBytes - 1),
	      d = isLE ? 1 : -1,
	      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
	
	  value = Math.abs(value);
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);
	
	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);
	
	  buffer[offset + i - d] |= s * 128;
	};


/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * isArray
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * toString
	 */
	
	var str = Object.prototype.toString;
	
	/**
	 * Whether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */
	
	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};


/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	
	;(function (exports) {
		'use strict';
	
	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array
	
		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
	
		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS)
				return 62 // '+'
			if (code === SLASH)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}
	
		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr
	
			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}
	
			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0
	
			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)
	
			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length
	
			var L = 0
	
			function push (v) {
				arr[L++] = v
			}
	
			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}
	
			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}
	
			return arr
		}
	
		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length
	
			function encode (num) {
				return lookup.charAt(num)
			}
	
			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}
	
			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}
	
			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}
	
			return output
		}
	
		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}(false ? (this.base64js = {}) : exports))


/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	process.nextTick = (function () {
	    var canSetImmediate = typeof window !== 'undefined'
	    && window.setImmediate;
	    var canPost = typeof window !== 'undefined'
	    && window.postMessage && window.addEventListener
	    ;
	
	    if (canSetImmediate) {
	        return function (f) { return window.setImmediate(f) };
	    }
	
	    if (canPost) {
	        var queue = [];
	        window.addEventListener('message', function (ev) {
	            var source = ev.source;
	            if ((source === window || source === null) && ev.data === 'process-tick') {
	                ev.stopPropagation();
	                if (queue.length > 0) {
	                    var fn = queue.shift();
	                    fn();
	                }
	            }
	        }, true);
	
	        return function nextTick(fn) {
	            queue.push(fn);
	            window.postMessage('process-tick', '*');
	        };
	    }
	
	    return function nextTick(fn) {
	        setTimeout(fn, 0);
	    };
	})();
	
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	
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
	}
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};


/***/ }
/******/ ])
//# sourceMappingURL=docs.js.map