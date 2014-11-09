/*! v"2.0.0" | (c) 2014 Jason Quense | https://github.com/jaquense/react-widgets/blob/master/License.txt */
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
	var React          = __webpack_require__(1)
	  , cx             = __webpack_require__(13)
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
	      '#number-picker', '#select-list', 
	      '#calendar', '#date-picker'];
	
	var Docs = React.createClass({
	
	  displayName: 'DocPage',
	
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
	          React.createElement("aside", {className: "col-sm-3"}, 
	            React.createElement("div", {className: "nav-aside"}, 
	              React.createElement(Tbs.Nav, {className: "side-nav", activeHref: href, onSelect: this.handleNavItemSelect}, 
	                React.createElement(Tbs.SubNav, {key: 0, href: "#intro", text: "Getting Started"}, 
	                  React.createElement(Tbs.NavItem, {key: 0, href: "#intro/install"}, "Install"), 
	                  React.createElement(Tbs.NavItem, {key: 1, href: "#intro/deps"}, "External Dependencies"), 
	                  React.createElement(Tbs.NavItem, {key: 2, href: "#intro/browser"}, "Older Browser Support"), 
	                  React.createElement(Tbs.NavItem, {key: 3, href: "#intro/access"}, "Accessibility"), 
	                  React.createElement(Tbs.NavItem, {key: 4, href: "#intro/style"}, "Styling")
	                ), 
	                React.createElement(Tbs.NavItem, {key: 1, href: "#DropdownList"}, "Dropdown List"), 
	                React.createElement(Tbs.NavItem, {key: 2, href: "#combobox"}, "Combobox"), 
	                React.createElement(Tbs.NavItem, {key: 3, href: "#number-picker"}, "Number Picker"), 
	                React.createElement(Tbs.NavItem, {key: 4, href: "#multiselect"}, "Multiselect"), 
	                React.createElement(Tbs.NavItem, {key: 5, href: "#selectlist"}, "SelectList"), 
	                React.createElement(Tbs.NavItem, {key: 6, href: "#calendar"}, "Calendar"), 
	                React.createElement(Tbs.NavItem, {key: 7, href: "#date-picker"}, 'Date &  Time Picker'), 
	
	                React.createElement(Tbs.NavItem, {key: 8, href: "#migration"}, "Migrating to 2.x")
	              )
	            )
	          ), 
	          React.createElement("article", {className: "col-sm-9 tab-content"}, 
	            React.createElement(GettingStarted, {className: cx({"tab-pane": true, "active": href.split('/')[0] === '#intro' })}), 
	            React.createElement(DropdownList, {className: cx({"tab-pane": true, "active": href === '#DropdownList' })}), 
	            React.createElement(ComboBox, {className: cx({"tab-pane": true, "active": href === '#combobox' })}), 
	            React.createElement(NumberPicker, {className: cx({"tab-pane": true, "active": href === '#number-picker' })}), 
	            React.createElement(MultiSelect, {className: cx({"tab-pane": true, "active": href === '#multiselect' })}), 
	            React.createElement(SelectList, {className: cx({"tab-pane": true, "active": href === '#selectlist' })}), 
	            React.createElement(Calendar, {className: cx({"tab-pane": true, "active": href === '#calendar' })}), 
	            React.createElement(DatePicker, {className: cx({"tab-pane": true, "active": href === '#date-picker' })}), 
	            React.createElement(Migration, {className: cx({"tab-pane": true, "active": href === '#migration' })}), 
	            
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
	
	  handleNavItemSelect: function (key, href) {
	    this.navigate(href)
	  },
	
	  navigate: function(href){
	    var change = this.state.sideHref.split('/')[0] !== href.split('/')[0]
	    this.setState({ sideHref: href });
	    window.location = href;
	    if(change)
	      window.scrollTo(0, 0)
	  }
	})
	
	
	React.render(React.createElement(Docs, null), document.body);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = window.React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	
	module.exports = {
		Button: 		__webpack_require__(24),
		ButtonGroup: 	__webpack_require__(25),
	
		DropdownButton: __webpack_require__(26),
		MenuItem: 		__webpack_require__(27),
	
		Nav: __webpack_require__(28),
		Navbar: __webpack_require__(29),
		SubNav: __webpack_require__(30),
		NavItem: __webpack_require__(31),
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
	
	    var toggle = (
	      React.createElement("button", {type: "button", className: "navbar-toggle", 'data-toggle': "collapse", 'data-target': "#navbar-collapse"}, 
	        React.createElement("span", {className: "sr-only"}, "Toggle navigation"), 
	        React.createElement("span", {className: "icon-bar"}), 
	        React.createElement("span", {className: "icon-bar"}), 
	        React.createElement("span", {className: "icon-bar"})
	      )
	    )
	
	    return (
	      React.createElement(Tbs.Navbar, {fixedTop: true, activeKey: this.props.page, toggleNavKey: 0, toggleButton: toggle, brand: "React Widgets"}, 
	        React.createElement(Tbs.Nav, {role: "navigation", selectKey: 0, activeKey: "docs", className: "navbar-nav"}, 
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
	
	var GettingStarted = React.createClass({displayName: 'GettingStarted',
	
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, "Getting Started ", React.createElement("small", {className: "pull-right", style: {marginTop: 15}}, "current version 2.0.0")), 
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
	  , Default = __webpack_require__(15)
	  , Example = __webpack_require__(16)
	  , MenuItem = __webpack_require__(2).MenuItem
	  , DDButton = __webpack_require__(2).DropdownButton
	  , DropdownListExample = __webpack_require__(17);
	
	var prefix = 'DropdownList/'
	var widgetName = 'DropdownList'
	var DropdownList = React.createClass({displayName: 'DropdownList',
	
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Dropdown List", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, {href: '#' + prefix + 'value'}, "value"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onChange'}, "onChange"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'data'}, "data"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'valueField'}, "valueField"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'textField'}, "textField"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'valueComponent'}, "valueComponent"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'itemComponent'}, "itemComponent"), 
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'open'}, "open"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onToggle'}, "onToggle"), 
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'busy'}, "busy"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'duration'}, "duration"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'isRtl'}, "isRtl"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'messages'}, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'keyboard'}, "Keyboard Navigation")
	            )
	          )
	        ), 
	        React.createElement("p", null, 
	          "A ", React.createElement("code", null, '<select/>'), " tag replacement that offers additional functionality. the Dropdown list"
	        ), 
	        React.createElement(DropdownListExample, null), 
	        React.createElement(Example, {code: 
	          "render: function(){\n"+
	          "  var DropdownList = require('react-widgets').DropdownList\n"+
	          "    , list = [\n"+
	          "      { label: 'orange', id: 1 },\n"+
	          "      { label: 'blue', id: 2 },\n"+
	          "      { label: 'red', id: 3 },\n"+
	          "    ]\n"+
	          "  return (\n"+
	          "    <DropdownList \n"+
	          "      data={list}\n"+
	          "      value={this.state.value}\n"+
	          "      onChange={this._change}\n"+
	          "      textField='label'\n"+
	          "      valueField='id'/>\n"+
	          "  )\n"+
	          "},\n\n"+
	          "_change: function(value){\n"+
	          "  this.setState({\n"+
	          "    value: value\n"+
	          "  })\n"+
	          "}\n"
	        }), 
	
	        React.createElement("h2", null, "Props"), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"value"}, 
	          "value ", React.createElement("small", null, "Any"), React.createElement("strong", null, "controllable (onChange, defaultValue)")
	        ), 
	        React.createElement("p", null, 
	          "The current value of the DropdownList. This can be an object (such as a member of the ", React.createElement("code", null, "data"), " array)" + ' ' +
	          "or a primitive value, hinted to by the ", React.createElement("code", null, "valueField"), ". The widget value does not need to be in" + ' ' +
	          "the ", React.createElement("code", null, "data"), " array; widgets can have values that are not in their list."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onChange"}, 
	          "onChange ", React.createElement("small", null, "Function(Any value)")), 
	        React.createElement("p", null, 
	          "Change event Handler that is called when the value is changed."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"data"}, 
	          "data ", React.createElement("small", null, "Array - mixed")), 
	        React.createElement("p", null, 
	          "provide an array of possible values for the DropdownList. If an array of ", React.createElement("code", null, "objects"), " is provided you" + ' ' +
	          "should use the ", React.createElement("code", null, "valueField"), " and ", React.createElement("code", null, "textField"), " props, to specify which object" + ' ' +
	          "properties comprise the value field (such as an id) and the field used to label the item."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"valueField"}, 
	          "valueField ", React.createElement("small", null, "String")), 
	        React.createElement("p", null, 
	          "A property name of a uniquely identifying field in the ", React.createElement("code", null, "data"), " array. If no valueField is provided," + ' ' +
	          "the widget will use strict equality checks to locate the data item, if it exists."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"textField"}, 
	          "textField ", React.createElement("small", null, "String")), 
	        React.createElement("p", null, 
	          "This prop determines which data item field to display in the combobox and selected item. This prop is" + ' ' +
	          "unnecessary when an ", React.createElement("code", null, "itemComponent"), "  and ", React.createElement("code", null, "valueComponent"), " are provided."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"valueComponent"}, 
	          "valueComponent ", React.createElement("small", null, "Component")), 
	        React.createElement("p", null, 
	          "This component is used to render the selected value of the combobox. The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"itemComponent"}, 
	          "itemComponent ", React.createElement("small", null, "Component")), 
	        React.createElement("p", null, 
	          "This component is used to render each possible item in the DropdownList. The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"open"}, 
	          "open ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false")), React.createElement("strong", null, "controllable (onToggle, defaultOpen)")
	        ), 
	        React.createElement("p", null, 
	          "Whether or not the ", widgetName, " is open. When unset (", React.createElement("code", null, "undefined"), ") the ", widgetName, " will handle the" + ' ' +
	          "opening and closing internally. The ", React.createElement("code", null, "defaultOpen"), " prop can be used to ", 'set', " an" + ' ' +
	          "initialization value for uncontrolled widgets."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onToggle"}, 
	          "onToggle ", React.createElement("small", null, "Function(Boolean isOpen)")), 
	        React.createElement("p", null, 
	          "Called when the ", widgetName, " is about to open or close. ", React.createElement("code", null, "onToggle"), " should be used" + ' ' +
	          "when the ", React.createElement("code", null, "open"), " prop is ", 'set', " otherwise the widget will never open or close."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"busy"}, 
	          "busy ", React.createElement("small", null, "Boolean")), 
	        React.createElement("p", null, 
	          "mark whether the widget is in a busy or loading state. If ", React.createElement("code", null, "true"), " the widget will display a spinner gif, useful" + ' ' +
	          "when loading data via an ajax call."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"duration"}, 
	          "duration ", React.createElement("small", null, "Number", React.createElement(Default, null, "250"))), 
	        React.createElement("p", null, 
	          "The speed, in milliseconds, of the dropdown animation."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"isRtl"}, 
	          "isRtl ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false"))), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	           "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"messages"}, 
	          "messages ", React.createElement("small", null, "Object")), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	        React.createElement("h3", null, "messages.open ", React.createElement("small", null, "String", React.createElement(Default, null, "\"Open Dropdown\""))), 
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
	  , Default = __webpack_require__(15)
	  , Example = __webpack_require__(16)
	  , MenuItem = __webpack_require__(2).MenuItem
	  , DDButton = __webpack_require__(2).DropdownButton
	  , ComboBoxExample = __webpack_require__(18);
	
	var prefix = 'combobox/'
	var widgetName = 'Combobox'
	var ComboBox = React.createClass({displayName: 'ComboBox',
	
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Combobox", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, {href: '#' + prefix + 'value'}, "value"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onChange'}, "onChange"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'data'}, "data"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'valueField'}, "valueField"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'textField'}, "textField"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'itemComponent'}, "itemComponent"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'suggest'}, "suggest"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'filter'}, "filter"), 
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'open'}, "open"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onToggle'}, "onToggle"), 
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'busy'}, "busy"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'duration'}, "duration"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'isRtl'}, "isRtl"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'messages'}, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'keyboard'}, "Keyboard Navigation")
	            )
	          )
	        ), 
	        React.createElement("p", null, 
	          "Select an item from the list, or input a custom value. The combobox can also make suggestions as you type"
	        ), 
	        React.createElement(ComboBoxExample, null), 
	        React.createElement(Example, {code: 
	          "render: function(){\n"+
	          "  //... \n\n" +
	          "  return (\n"+
	          "    <Combobox \n"+
	          "      data={list}\n"+
	          "      value={this.state.value}\n"+
	          "      onChange={this._change}\n"+
	          "      textField='label'\n"+
	          "      valueField='id'/>\n\n"+
	          "    <Combobox \n"+
	          "      data={list}\n"+
	          "      ...\n"+
	          "      suggest={true}\n"+
	          "      filter={false}/>\n\n"+
	          "    <Combobox \n"+
	          "      data={list}\n"+
	          "      value={this.state.value}\n"+
	          "      ...\n"+
	          "      filter={true}/>\n"+
	          "  )\n"+
	          "}"
	        }), 
	        React.createElement("h2", null, "Props"), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"value"}, 
	          "value ", React.createElement("small", null, "Any"), React.createElement("strong", null, "controllable (onChange, defaultValue)")), 
	        React.createElement("p", null, 
	          "The current value of the Combobox. This can be an object (such as a member of the ", React.createElement("code", null, "data"), " array)" + ' ' +
	          "or a primitive value, hinted to by the ", React.createElement("code", null, "valueField"), ". The widget value does not need to be in" + ' ' +
	          "the ", React.createElement("code", null, "data"), ", widgets can have values that are not in their list."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onChange"}, 
	          "onChange ", React.createElement("small", null, "Function(Any value)")), 
	        React.createElement("p", null, 
	          "Called when the value is changed. If the value is on of the ", React.createElement("code", null, "data"), " members" + ' ' +
	          "that item will be returned. In the case of a value not being found in the ", React.createElement("code", null, "data"), " array" + ' ' +
	          "the string value of the combobox will be returned."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"data"}, 
	          "data ", React.createElement("small", null, "Array")), 
	        React.createElement("p", null, 
	          "An array of possible values for the combobox. If an array of ", React.createElement("code", null, "objects"), " is provided you" + ' ' +
	          "should use  the ", React.createElement("code", null, "valueField"), " and ", React.createElement("code", null, "textField"), " props, to specify which object" + ' ' +
	          "properties comprise the value field (such as an id) and the field used to label the item."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"valueField"}, 
	          "valueField ", React.createElement("small", null, "String")), 
	        React.createElement("p", null, 
	          "A property name of a uniquely identifying field in the ", React.createElement("code", null, "data"), " array. If no valueField is provided," + ' ' +
	          "the widget will use strict equality checks to locate the data item, if it exists."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"textField"}, 
	          "textField ", React.createElement("small", null, "String")), 
	        React.createElement("p", null, 
	          "This prop determines which data item field to display in the dropdown list and the text value of combobox." + ' ' +
	          "This prop is unnecessary when an ", React.createElement("code", null, "itemComponent"), " is provided."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"itemComponent"}, 
	          "itemComponent ", React.createElement("small", null, "Component")), 
	        React.createElement("p", null, 
	          "This component is used to render each possible item in the DropdownList. The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"suggest"}, 
	          "suggest ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false"))), 
	        React.createElement("p", null, 
	          "When ", React.createElement("code", null, "true"), " the Combobox will suggest, or fill in, values as you type. The suggestions" + ' ' +
	          "are always \"startsWith\", meaning it will search from the start of the ", React.createElement("code", null, "textField"), " property"
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"filter"}, 
	          "filter ", React.createElement("small", null, "[Boolean, String, Function(String item)]", React.createElement(Default, null, "false"))
	        ), 
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
	        React.createElement("h3", {className: "prop-header", id:  prefix +"open"}, 
	          "open ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false")), React.createElement("strong", null, "controllable (onToggle, defaultOpen)")
	        ), 
	        React.createElement("p", null, 
	          "Whether or not the ", widgetName, " is open. When unset (", React.createElement("code", null, "undefined"), ") the ", widgetName, " will handle the" + ' ' +
	          "opening and closing internally. The ", React.createElement("code", null, "defaultOpen"), " prop can be used to ", 'set', " an" + ' ' +
	          "initialization value for uncontrolled widgets."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onToggle"}, 
	          "onToggle ", React.createElement("small", null, "Function(Boolean isOpen)")), 
	        React.createElement("p", null, 
	         "Called fires when the ", widgetName, " is about to open or close. ", React.createElement("code", null, "onToggle"), " should be used" + ' ' +
	          "when the ", React.createElement("code", null, "open"), " prop is ", 'set', " otherwise the widget will never open or close."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"busy"}, 
	          "busy ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false"))), 
	        React.createElement("p", null, 
	          "Mark whether the widget is in a busy or loading state. If ", React.createElement("code", null, "true"), " the widget will display a spinner gif, useful" + ' ' +
	          "when loading data via an ajax call."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"duration"}, 
	          "duration ", React.createElement("small", null, "Number", React.createElement(Default, null, "250"))), 
	        React.createElement("p", null, 
	          "The speed, in milliseconds, of the dropdown animation."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"isRtl"}, 
	          "isRtl ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false"))), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	           "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"messages"}, 
	          "messages ", React.createElement("small", null, "Object")), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	        React.createElement("h3", null, "messages.open ", React.createElement("small", null, "String", React.createElement(Default, null, "\"Open Combobox\""))), 
	        React.createElement("p", null, 
	          "Combobox button text for screen readers"
	        ), 
	        React.createElement("h3", null, "messages.emptyList ", React.createElement("small", null, "String", React.createElement(Default, null, "\"There are no items in this list\""))), 
	        React.createElement("p", null, 
	          "text to display when the ", React.createElement("code", null, "data"), " prop array is empty"
	        ), 
	        React.createElement("h3", null, "messages.emptyFilter ", React.createElement("small", null, "String", React.createElement(Default, null, "\"The filter returned no results\""))), 
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
	  , Default = __webpack_require__(15)
	  , Example = __webpack_require__(16)
	  , DDButton = __webpack_require__(2).DropdownButton
	  , MenuItem = __webpack_require__(2).MenuItem
	  , MultiselectExample = __webpack_require__(19);
	
	var prefix = 'multiselect/';
	var widgetName = 'Multiselect'
	var Multiselect = React.createClass({displayName: 'Multiselect',
	
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Multiselect", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, {href: '#' + prefix + 'value'}, "value"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onChange'}, "onChange"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'data'}, "data"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'valueField'}, "valueField"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'textField'}, "textField"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'tagComponent'}, "tagComponent"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'itemComponent'}, "itemComponent"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'placeholder'}, "placeholder"), 
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'open'}, "open"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onToggle'}, "onToggle"), 
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'busy'}, "busy"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'disabled'}, "disabled"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'readonly'}, "readonly"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'duration'}, "duration"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'isRtl'}, "isRtl"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'messages'}, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'keyboard'}, "Keyboard Navigation")
	            )
	          )
	        ), 
	        React.createElement("p", null, 
	          "Multiple Multiselection widget."
	        ), 
	        React.createElement(MultiselectExample, null), 
	        React.createElement(Example, {code: 
	          "render: function(){\n"+
	          "  var Multiselect = require('react-widgets').Multiselect\n"+
	          "  //... \n\n" +
	          "  return (\n"+
	          "    <Multiselect \n"+
	          "      data={list}\n"+
	          "      value={this.state.value}\n"+
	          "      onChange={this._change}\n"+
	          "      textField='label'\n"+
	          "      valueField='id'/>\n"+
	          "   )\n"+
	          "}"
	        }), 
	
	        React.createElement("h2", null, "Props"), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"value"}, 
	          "value ", React.createElement("small", null, "Array?"), React.createElement("strong", null, "controllable (onChange, defaultValue)")), 
	        React.createElement("p", null, 
	          "The current values of the Multiselect. The value should can ", React.createElement("code", null, "null"), ", or an array" + ' ' +
	          "of ", React.createElement("code", null, "valieField"), " values, or an array of objects (such as a few items in the ", React.createElement("code", null, "data"), " array)"
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onChange"}, 
	          "onChange ", React.createElement("small", null, 'Function(Any value)')), 
	        React.createElement("p", null, 
	          "change event Handler that is called when the value is changed. The handler will return an array of values"
	        ), 
	        React.createElement("strong", null, "Note:"), React.createElement("span", null, " Just like input tags, if you do not specify an ", React.createElement("code", null, "onChange"), " handler the widget" + ' ' +
	        "becomes readonly"), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"data"}, 
	          "data ", React.createElement("small", null, "Array")), 
	        React.createElement("p", null, 
	          "provide an array of possible values for the ", widgetName, ". If an array of ", React.createElement("code", null, "objects"), " is provided you" + ' ' +
	          "should use the ", React.createElement("code", null, "valueField"), " and ", React.createElement("code", null, "textField"), " props, to specify which object" + ' ' +
	          "properties comprise the value field (such as an id) and the field used to label the item."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"valueField"}, 
	          "valueField ", React.createElement("small", null, "String")), 
	        React.createElement("p", null, 
	          "A property name of a uniquely identifying field in the ", React.createElement("code", null, "data"), " array. If no valueField is provided," + ' ' +
	          "the widget will use strict equality checks to locate the data item, if it exists."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"textField"}, 
	          "textField ", React.createElement("small", null, "String")), 
	        React.createElement("p", null, 
	          "This prop determines which data item field to display in the ", widgetName, " list andselected item This prop is" + ' ' +
	          "unnecessary when an ", React.createElement("code", null, "itemComponent"), " and ", React.createElement("code", null, "tagComponent"), " are provided."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"tagComponent"}, 
	          "tagComponent ", React.createElement("small", null, "Component")), 
	        React.createElement("p", null, 
	          "This component is used to render each selected item. The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"itemComponent"}, 
	          "itemComponent ", React.createElement("small", null, "Component")), 
	        React.createElement("p", null, 
	          "This component is used to render each possible item in the list. The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"placeholder"}, 
	          "placeholder ", React.createElement("small", null, "String")), 
	        React.createElement("p", null, 
	          "The same as an input placeholder, only works in browsers that support the placeholder attribute for inputs"
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"searchTerm"}, 
	          "searchTerm ", React.createElement("small", null, "String"), React.createElement("strong", null, "controllable (onSearch, defaultSearchTerm)")
	        ), 
	        React.createElement("p", null, 
	          "The string value of the current search being typed into the ", widgetName, ". When" + ' ' +
	          "unset (", React.createElement("code", null, "undefined"), ") the ", widgetName, " will handle the filtering internally." + ' ' +
	          "The ", React.createElement("code", null, "defaultSearchTerm"), " prop can be used to ", 'set', " an initialization value for uncontrolled widgets."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onSearch"}, 
	          "onSearch ", React.createElement("small", null, "Function(String searchTerm)")), 
	        React.createElement("p", null, 
	          "Called when the value of the text box changes either from typing or a pasted value. ", 
	          React.createElement("code", null, "onSearch"), " should be used when the ", React.createElement("code", null, "searchTerm"), " prop" + ' ' +
	          "is ", 'set', "."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"open"}, 
	          "open ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false")), React.createElement("strong", null, "controllable (onToggle, defaultOpen)")
	        ), 
	        React.createElement("p", null, 
	          "Whether or not the ", widgetName, " is open. When unset (", React.createElement("code", null, "undefined"), ") the ", widgetName, " will handle the" + ' ' +
	          "opening and closing internally. The ", React.createElement("code", null, "defaultOpen"), " prop can be used to ", 'set', " an" + ' ' +
	          "initialization value for uncontrolled widgets."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onToggle"}, 
	          "onToggle ", React.createElement("small", null, "Function(Boolean isOpen)")), 
	        React.createElement("p", null, 
	          "Called when the ", widgetName, " is about to open or close. ", React.createElement("code", null, "onToggle"), " should be used" + ' ' +
	          "when the ", React.createElement("code", null, "open"), " prop is ", 'set', " otherwise the widget will never open or close."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"busy"}, 
	          "busy ", React.createElement("small", null, "Boolean")), 
	        React.createElement("p", null, 
	          "mark whether the widget is in a busy or loading state. If ", React.createElement("code", null, "true"), " the widget will display a spinner gif, useful" + ' ' +
	          "when loading data via an ajax call."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"duration"}, 
	          "duration ", React.createElement("small", null, "Number", React.createElement(Default, null, "250"))), 
	        React.createElement("p", null, 
	          "The speed, in milliseconds, of the dropdown animation."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"disabled"}, 
	          "disabled ", React.createElement("small", null, "[Boolean, Array]")), 
	        React.createElement("p", null, 
	          "Disable the widget, If an ", React.createElement("code", null, "Array"), " of values is passed in only the tags specified will be disabled."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"readOnly"}, 
	          "readOnly ", React.createElement("small", null, "[Boolean, Array]")), 
	        React.createElement("p", null, 
	          "Place the widget in a readonly mode, If an ", React.createElement("code", null, "Array"), " of values is passed in only the tags specified will be readonly."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"isRtl"}, 
	          "isRtl ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false"))), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	           "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"messages"}, 
	          "messages ", React.createElement("small", null, "Object")), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	
	        React.createElement("h3", null, "messages.emptyList ", React.createElement("small", null, "String", React.createElement(Default, null, "\"There are no items in this list\""))), 
	        React.createElement("p", null, 
	          "text to display when the ", React.createElement("code", null, "data"), " prop array is empty"
	        ), 
	        React.createElement("h3", null, "messages.emptyFilter ", React.createElement("small", null, "String", React.createElement(Default, null, "\"The filter returned no results\""))), 
	        React.createElement("p", null, 
	          "text to display when the the current filter does not return any results"
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
	
	          React.createElement("li", null, React.createElement("kbd", null, "any key"), " search list for item starting with key")
	        )
	      )
	    );
	  }
	
	});
	
	module.exports = Multiselect;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Default = __webpack_require__(15)
	  , Example = __webpack_require__(16)
	  , MenuItem = __webpack_require__(2).MenuItem
	  , DDButton = __webpack_require__(2).DropdownButton
	
	  , SelectListExample = __webpack_require__(20);
	
	var prefix = 'selectlist/'
	var widgetName = 'SelectList'
	var SelectList = React.createClass({displayName: 'SelectList',
	
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Select List", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, {href: '#' + prefix + 'value'}, "value"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onChange'}, "onChange"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'data'}, "data"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'valueField'}, "valueField"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'textField'}, "textField"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'itemComponent'}, "itemComponent"), 
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'multiple'}, "multiple"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onMove'}, "onMove"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'busy'}, "busy"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'disabled'}, "disabled"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'readonly'}, "readonly"), 
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'isRtl'}, "isRtl"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'keyboard'}, "Keyboard Navigation")
	            )
	          )
	        ), 
	        React.createElement("p", null, 
	          "Creates a list of radio buttons or checkboxes bound to a ", 'set', " of data."
	        ), 
	        React.createElement(SelectListExample, null), 
	        React.createElement(Example, {code: 
	          "render: function(){\n"+
	          "  var SelectList = require('react-widgets').SelectList\n"+
	          "    , list = [\n"+
	          "      { label: 'orange', id: 1 },\n"+
	          "      { label: 'blue', id: 2 },\n"+
	          "      { label: 'red', id: 3 },\n"+
	          "    ]\n"+
	          "  return (\n"+
	          "    <SelectList \n"+
	          "      multiple\n" +
	          "      data={list}\n"+
	          "      value={this.state.value}\n"+
	          "      onChange={this._change}\n"+
	          "      textField='label'\n"+
	          "      valueField='id'/>\n"+
	          "  )\n"+
	          "},\n\n"+
	          "_change: function(value){\n"+
	          "  this.setState({\n"+
	          "    value: value\n"+
	          "  })\n"+
	          "}\n"
	        }), 
	
	        React.createElement("h2", null, "Props"), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"value"}, 
	          "value ", React.createElement("small", null, "Any|Array<Any>"), React.createElement("strong", null, "controllable (onChange, defaultValue)")
	        ), 
	        React.createElement("p", null, 
	          "The current value or values of the ", widgetName, ". This can be an object (such as a member of the ", React.createElement("code", null, "data"), " array)" + ' ' +
	          "or a primitive value, hinted to by the ", React.createElement("code", null, "valueField"), ". The widget value does not need to be in" + ' ' +
	          "the ", React.createElement("code", null, "data"), " array; widgets can have values that are not in their list."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onChange"}, 
	          "onChange ", React.createElement("small", null, "Function(Array<Any>|Any values)")), 
	        React.createElement("p", null, 
	          "Change event handler that is called when the value is changed. ", React.createElement("code", null, "values"), " will be an array" + ' ' + 
	          "when ", React.createElement("code", null, "multiple"), " prop is set."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"data"}, 
	          "data ", React.createElement("small", null, "Array - mixed")), 
	        React.createElement("p", null, 
	          "provide an array of possible values for the ", widgetName, ". If an array of ", React.createElement("code", null, "objects"), " is provided you" + ' ' +
	          "should use the ", React.createElement("code", null, "valueField"), " and ", React.createElement("code", null, "textField"), " props, to specify which object" + ' ' +
	          "properties comprise the value field (such as an id) and the field used to label the item."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"valueField"}, 
	          "valueField ", React.createElement("small", null, "String")), 
	        React.createElement("p", null, 
	          "A property name of a uniquely identifying field in the ", React.createElement("code", null, "data"), " array. If no valueField is provided," + ' ' +
	          "the ", widgetName, " will use strict equality checks to locate the data item, if it exists."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"textField"}, 
	          "textField ", React.createElement("small", null, "String")), 
	        React.createElement("p", null, 
	          "This prop determines which data item field to display in the ", widgetName, "."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"itemComponent"}, 
	          "itemComponent ", React.createElement("small", null, "Component")), 
	        React.createElement("p", null, 
	          "This component is used to render each item in the ", widgetName, ". The default component" + ' ' +
	          "renders the text of the selected item (specified by ", React.createElement("code", null, "textfield"), ")"
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"multiple"}, 
	          "multiple ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false"))
	        ), 
	        React.createElement("p", null, 
	          "Whether or not the ", widgetName, " allows multiple selection or not. when ", React.createElement("code", null, "false"), " the ", widgetName, " will" + ' ' + 
	          "render as a list of radio buttons, and checkboxes when ", React.createElement("code", null, "true"), "."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onMove"}, 
	          "onMove ", React.createElement("small", null, "Function(HTMLElement)")), 
	        React.createElement("p", null, 
	          "A handler called when focus shifts on the ", widgetName, ". Internally this is used to ensure the focused item is in view." + ' ' +
	          "If you want to define your own \"scrollTo\" behavior or just disable the default one specify an ", React.createElement("code", null, "onMove"), " handler."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"busy"}, 
	          "busy ", React.createElement("small", null, "Boolean")), 
	        React.createElement("p", null, 
	          "mark whether the widget is in a busy or loading state. If ", React.createElement("code", null, "true"), " the widget will display a spinner gif, useful" + ' ' +
	          "when loading data via an ajax call."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"disabled"}, 
	          "disabled ", React.createElement("small", null, "[Boolean, Array]")), 
	        React.createElement("p", null, 
	          "Disable the widget, if an ", React.createElement("code", null, "Array"), " of values is passed in only those values will be disabled."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix + "readOnly"}, 
	          "readOnly ", React.createElement("small", null, "[Boolean, Array]")), 
	        React.createElement("p", null, 
	          "Place the ", widgetName, " in a readonly mode, If an ", React.createElement("code", null, "Array"), " of values is passed in only those values will be readonly."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"isRtl"}, 
	          "isRtl ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false"))), 
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
	  , Default = __webpack_require__(15)
	  , Example = __webpack_require__(16)
	  , DDButton = __webpack_require__(2).DropdownButton
	  , MenuItem = __webpack_require__(2).MenuItem
	  , CalendarExample = __webpack_require__(21);
	
	var prefix = 'calendar/'
	var Calendar = React.createClass({displayName: 'Calendar',
	
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Calendar", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, {href: '#' + prefix + 'value'}, "value"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onChange'}, "onChange"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'min'}, "min"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'max'}, "max"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'initialView'}, "initialView"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'finalView'}, "finalView"), 
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'duration'}, "duration"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'isRtl'}, "isRtl"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'messages'}, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'keyboard'}, "Keyboard Navigation")
	            )
	          )
	        ), 
	        React.createElement("p", null, 
	          "Calendar widget."
	        ), 
	        React.createElement(CalendarExample, null), 
	        React.createElement(Example, {code: 
	          "render: function(){\n"+
	          "  //... \n\n" +
	          "  return (\n"+
	          "    <Calendar \n"+
	          "      value={this.state.value}\n"+
	          "      onChange={this._change}/>\n"+
	          "   \n"+
	          "    <Calendar \n"+
	          "      ...\n"+
	          "      min={new Date(2014, 0, 1)}\n"+
	          "      max={new Date(2015, 12, 15)}/>\n"+
	          "    \n"+
	          "    <Calendar \n"+
	          "      ...\n"+
	          "      initialView='year'\n"+
	          "      finalView='decade'/>\n"+
	          "   \n"+
	          "}"
	        }), 
	
	        React.createElement("h2", null, "Props"), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"value"}, 
	          "value ", React.createElement("small", null, "Date"), React.createElement("strong", null, "controllable (onChange, defaultValue)")), 
	        React.createElement("p", null, 
	          "The current selected date, should be a Date object or null."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onChange"}, 
	          "onChange ", React.createElement("small", null, 'Function( Date value )')), 
	        React.createElement("p", null, 
	          "change event Handler that is called when the value is changed. The handler is called with the Date object"
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"min"}, 
	          "min ", React.createElement("small", null, "Date")), 
	        React.createElement("p", null, 
	          "The minimum date that the Calendar can navigate from."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"max"}, 
	          "max ", React.createElement("small", null, "Date")), 
	        React.createElement("p", null, 
	          "The maximum date that the Calendar can navigate to."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"initialView"}, 
	
	          "initialView ", React.createElement("small", null, "Enum", React.createElement(Default, null, "\"month\""))
	        ), 
	        React.createElement("p", null, 
	          "The starting and lowest level view the calendar can navigate down to."
	        ), 
	        React.createElement("p", null, 
	          "Acceptable values are:", 
	          React.createElement("code", null, "\"month\""), " ", React.createElement("code", null, "\"year\""), " ", React.createElement("code", null, "\"decade\""), " ", React.createElement("code", null, "\"century\"")
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"finalView"}, 
	          "finalView ", React.createElement("small", null, "Enum", React.createElement(Default, null, "\"century\""))
	        ), 
	        React.createElement("p", null, 
	          "The highest level view the calendar can navigate up to. This value should be higher" + ' ' +
	          "than ", React.createElement("code", null, "initialView")
	        ), 
	        React.createElement("p", null, 
	          "Acceptable values are:", 
	          React.createElement("code", null, "\"month\""), " ", React.createElement("code", null, "\"year\""), " ", React.createElement("code", null, "\"decade\""), " ", React.createElement("code", null, "\"century\"")
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"isRtl"}, 
	          "isRtl ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false"))), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	          "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"messages"}, 
	          "messages ", React.createElement("small", null, "Object")), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	        React.createElement("h3", null, "messages.moveBack ", React.createElement("small", null, "String", React.createElement(Default, null, "\"navigate back\""))), 
	        React.createElement("p", null, 
	          "title and screen reader text for the left arrow button"
	        ), 
	        React.createElement("h3", null, 
	          "messages.moveForward ", React.createElement("small", null, "String", React.createElement(Default, null, "\"navigate forward\""))
	        ), 
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
	  , Default = __webpack_require__(15)
	  , Example = __webpack_require__(16)
	  , DDButton = __webpack_require__(2).DropdownButton
	  , MenuItem = __webpack_require__(2).MenuItem
	  , DatePickerExample = __webpack_require__(22);
	
	var prefix = 'date-picker/'
	var widgetName = 'DateTimePicker'
	var DateTimePicker = React.createClass({displayName: 'DateTimePicker',
	
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Date and Time Picker", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, {href: '#' + prefix + 'value'}, "value"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onChange'}, "onChange"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'data'}, "data"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'calendar'}, "calendar"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'time'}, "time"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'min'}, "min"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'max'}, "max"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'format'}, "format"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'parse'}, "parse"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'initialView'}, "initialView"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'finalView'}, "finalView"), 
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'open'}, "open"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onToggle'}, "onToggle"), 
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'duration'}, "duration"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'isRtl'}, "isRtl"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'messages'}, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'keyboard'}, "Keyboard Navigation")
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
	        React.createElement(Example, {code: 
	          "render: function(){\n"+
	          "  var DateTimePicker = require('react-widgets').DateTimePicker\n"+
	          "  //... \n\n" +
	          "  return (\n"+
	          "    <DateTimePicker \n"+
	          "      value={this.state.value}\n"+
	          "      onChange={this._change}/>\n"+
	          "   \n"+
	          "    <DateTimePicker \n"+
	          "      ...\n"+
	          "      time={false}\n"+
	          "      format='MMM dd yyyy'\n"+
	          "      min={new Date(2014, 0, 1)}\n"+
	          "      max={new Date(2015, 12, 15)}/>\n"+
	          "   \n"+
	          "    <DateTimePicker \n"+
	          "      ...\n"+
	          "      calendar={false}\n"+
	          "      format='H:mm tt'\n"+
	          "   )\n"+
	          "}"
	        }), 
	
	        React.createElement("h2", null, "Props"), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"value"}, 
	          "value ", React.createElement("small", null, "Date?"), React.createElement("strong", null, "controllable (onChange, defaultValue)")), 
	        React.createElement("p", null, 
	          "The current selected date, should be a ", React.createElement("code", null, "Date"), " instance or ", React.createElement("code", null, "null"), "."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onChange"}, 
	          "onChange ", React.createElement("small", null, 'Function( Date? date, String dateStr )')), 
	        React.createElement("p", null, 
	          "change event Handler that is called when the value is changed. The handler is called with both the" + ' ' +
	          "current ", React.createElement("code", null, "Date"), " object (or null if it was not parseable), and the second argument is" + ' ' +
	          "a ", React.createElement("code", null, "string"), " representation of the date value, formated by the ", React.createElement("code", null, "format"), " prop."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"calendar"}, 
	          "calendar ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "true"))), 
	        React.createElement("p", null, 
	          "Whether to show the date picker button."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"time"}, 
	          "time ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "true"))), 
	        React.createElement("p", null, 
	          "Whether to show the time picker button."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"min"}, 
	          "min ", React.createElement("small", null, "Date", React.createElement(Default, null, "Date(1900, 0, 1)"))), 
	        React.createElement("p", null, 
	          "The minimum Date that can be selected. Min only limits selection, it doesn't constrain the date values that" + ' ' +
	          "can be typed or pasted into the widget. If you need this behavior you can constrain values via" + ' ' +
	          "the ", React.createElement("code", null, "onChange"), " handler."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"max"}, 
	          "max ", React.createElement("small", null, "Date", React.createElement(Default, null, "Date(2099, 11, 31)"))), 
	        React.createElement("p", null, 
	          "The maximum Date that can be selected. Max only limits selection, it doesn't constrain the date values that" + ' ' +
	          "can be typed or pasted into the widget. If you need this behavior you can constrain values via" + ' ' +
	          "the ", React.createElement("code", null, "onChange"), " handler."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"format"}, 
	          "format ", React.createElement("small", null, "String", React.createElement(Default, null, "\"M/d/yyyy h:mm tt\""))), 
	        React.createElement("p", null, 
	          "A string format used to display the date value. For more information on prefined and custom formats" + ' ' +
	          "visit the ", React.createElement("a", {href: "https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468#dates"}, 
	            "Globalize.js documentation ", React.createElement("i", {className: "fa fa-external-link"})
	          )
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"parse"}, 
	          "parse ", React.createElement("small", null, '[Function, Array<String>]')), 
	        React.createElement("p", null, 
	          "Determines how the widget parses the typed date string into a Date object. You can provide an array of formats to try," + ' ' +
	          "or provide a ", 'function', " that returns a date to handle parsing yourself"
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"initialView"}, 
	          "initialView ", React.createElement("small", null, "Enum", React.createElement(Default, null, "\"month\""))
	        ), 
	        React.createElement("p", null, 
	          "The starting and lowest level view the calendar can navigate down to."
	        ), 
	        React.createElement("p", null, 
	          "Acceptable values are:", 
	          React.createElement("code", null, "\"month\""), " ", React.createElement("code", null, "\"year\""), " ", React.createElement("code", null, "\"decade\""), " ", React.createElement("code", null, "\"century\"")
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"finalView"}, 
	          "finalView ", React.createElement("small", null, "Enum", React.createElement(Default, null, "\"century\""))
	        ), 
	        React.createElement("p", null, 
	          "The highest level view the calendar can navigate up to. This value should be higher" + ' ' +
	          "than ", React.createElement("code", null, "initialView")
	        ), 
	        React.createElement("p", null, 
	          "Acceptable values are:", 
	          React.createElement("code", null, "\"month\""), " ", React.createElement("code", null, "\"year\""), " ", React.createElement("code", null, "\"decade\""), " ", React.createElement("code", null, "\"century\"")
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"open"}, 
	          "open ", React.createElement("small", null, "[Boolean, String]", React.createElement(Default, null, "false")), React.createElement("strong", null, "controllable (onToggle, defaultOpen)")
	        ), 
	        React.createElement("p", null, 
	          "Whether or not the ", widgetName, " is open. When unset (", React.createElement("code", null, "undefined"), ") the ", widgetName, " will handle the" + ' ' +
	          "opening and closing internally. The ", React.createElement("code", null, "defaultOpen"), " prop can be used to ", 'set', " an" + ' ' +
	          "initialization value for uncontrolled widgets."
	        ), 
	        React.createElement("p", null, 
	          "Acceptable values are: ", React.createElement("code", null, "false"), " ", React.createElement("code", null, "\"calendar\""), " ", React.createElement("code", null, "\"time\"")
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onToggle"}, 
	          "onToggle ", React.createElement("small", null, "Function(Boolean isOpen)")), 
	        React.createElement("p", null, 
	          "Called when the ", widgetName, " is about to open or close. ", React.createElement("code", null, "onToggle"), " should be used" + ' ' +
	          "when the ", React.createElement("code", null, "open"), " prop is ", 'set', " otherwise the widget will never open or close."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"duration"}, 
	          "duration ", React.createElement("small", null, "Number", React.createElement(Default, null, "250"))), 
	        React.createElement("p", null, 
	          "The speed, in milliseconds, of the either dropdown animation."
	        ), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"isRtl"}, 
	          "isRtl ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false"))), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	           "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"messages"}, 
	          "messages ", React.createElement("small", null, "Object")), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	        React.createElement("h3", null, "messages.calendarButton ", React.createElement("small", null, "String", React.createElement(Default, null, "\"Select Date\""))), 
	        React.createElement("p", null, 
	          "title and screen reader text for the left arrow button"
	        ), 
	        React.createElement("h3", null, "messages.timeButton ", React.createElement("small", null, "String", React.createElement(Default, null, "\"Select Time\""))), 
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
	  , Default = __webpack_require__(15)
	  , Example = __webpack_require__(16)
	  , DDButton = __webpack_require__(2).DropdownButton
	  , MenuItem = __webpack_require__(2).MenuItem
	  , NumberPickerExample = __webpack_require__(23);
	
	var prefix = 'number-picker/'
	var NumberPicker = React.createClass({displayName: 'NumberPicker',
	
	  render: function() {
	    return (
	      React.createElement("section", React.__spread({},  this.props), 
	        React.createElement("h1", {className: "page-header"}, 
	          "Number Picker", 
	          React.createElement("span", {className: "pull-right"}, 
	            React.createElement(DDButton, {title: "props", bsStyle: "link", pullRight: true}, 
	              React.createElement(MenuItem, {href: '#' + prefix + 'value'}, "value"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'onChange'}, "onChange"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'format'}, "format"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'min'}, "min"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'max'}, "max"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'step'}, "step"), 
	
	
	              React.createElement(MenuItem, {href: '#' + prefix + 'isRtl'}, "isRtl"), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'messages'}, "messages"), 
	              React.createElement(MenuItem, {divider: true}), 
	              React.createElement(MenuItem, {href: '#' + prefix + 'keyboard'}, "Keyboard Navigation")
	            )
	          )
	
	        ), 
	        React.createElement("p", null, 
	          "Spinner for selecting numbers. Supports multiple formats for display and editing through Globalize.js"
	        ), 
	        React.createElement(NumberPickerExample, null), 
	        React.createElement(Example, {code: 
	          "render: function(){\n"+
	          "  //... \n\n" +
	          "  return (\n"+
	          "    <NumberPicker \n"+
	          "      value={this.state.value}\n"+
	          "      onChange={this._change}\n"+
	          "      min={2}\n"+
	          "      max={10}/>\n\n"+
	          "    <NumberPicker \n"+
	          "      format='c'\n" +
	          "      step={1.5}/>\n\n"+
	          "  )\n"+
	          "}"
	        }), 
	        React.createElement("h2", null, "Props"), 
	        React.createElement("h3", {className: "prop-header", id:  prefix +"value"}, 
	          "value ", React.createElement("small", null, "Number?"), React.createElement("strong", null, "controllable (onChange, defaultValue)")), 
	        React.createElement("p", null, 
	          "The current value of the NumberPicker."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"onChange"}, 
	          "onChange ", React.createElement("small", null, "Function(Number? value)")), 
	        React.createElement("p", null, 
	          "Change event Handler that is called when the value is changed. The handler is called with the" + ' ' +
	          "current numeric value or null."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"format"}, 
	          "format ", React.createElement("small", null, "String", React.createElement(Default, null, "\"d\""))), 
	        React.createElement("p", null, 
	          "A format string used to display the number value. For more information on prefined and custom number and" + ' ' +
	          "currency formats visit the ", 
	          React.createElement("a", {href: "https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468#number-formatting"}, 
	            "Globalize.js documentation ", React.createElement("i", {className: "fa fa-external-link"})
	          ), "."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"min"}, 
	          "min ", React.createElement("small", null, "Number", React.createElement(Default, null, "-Infinity"))), 
	        React.createElement("p", null, 
	          "The minimum number that the NumberPicker value."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"max"}, 
	          "max ", React.createElement("small", null, "Number", React.createElement(Default, null, "Infinity"))), 
	        React.createElement("p", null, 
	          "The maximum number that the NumberPicker value."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"step"}, 
	          "step ", React.createElement("small", null, "Number", React.createElement(Default, null, "1"))), 
	        React.createElement("p", null, 
	          "Amount to increase or decrease value when using the spinner buttons."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"isRtl"}, 
	          "isRtl ", React.createElement("small", null, "Boolean", React.createElement(Default, null, "false"))), 
	        React.createElement("p", null, 
	          "mark whether the widget should render right-to-left. This property can also be implicitly passed to the widget through" + ' ' +
	           "a ", React.createElement("code", null, "childContext"), " prop (", React.createElement("code", null, "isRtl"), ") this allows higher level application components to specify the direction."
	        ), 
	
	        React.createElement("h3", {className: "prop-header", id:  prefix +"messages"}, 
	          "messages ", React.createElement("small", null, "Object")), 
	        React.createElement("p", null, 
	          "Object hash containing display text and/or text for screen readers. Use the ", React.createElement("code", null, "messages"), " object to" + ' ' +
	          "localize widget text and increase accessibility."
	        ), 
	        React.createElement("h3", null, "messages.increment ", React.createElement("small", null, "String", React.createElement(Default, null, "\"increment value\""))), 
	        React.createElement("p", null, 
	          "Number picker spinner up button text for screen readers"
	        ), 
	        React.createElement("h3", null, "messages.decrement ", React.createElement("small", null, "String", React.createElement(Default, null, "\"decrement value\""))), 
	        React.createElement("p", null, "Number picker spinner down button text for screen readers "), 
	
	        React.createElement("h2", {id:  prefix +"keyboard"}, "Keyboard Navigation"), 
	
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
	          React.createElement("li", null, React.createElement("code", null, "require('react-widgets').DropDownlist"), " -> ", React.createElement("code", null, "require('react-widgets').Dropdownlist")), 
	          React.createElement("li", null, React.createElement("code", null, "require('react-widgets').Select"), " -> ", React.createElement("code", null, "require('react-widgets').Multiselect"))
	        ), 
	        React.createElement("h4", null, "File Names and Locations"), 
	        React.createElement("p", null, 
	          "File names and locations have also changed. Components now all have a consistent PascalCase names that match" + ' ' + 
	          "their exported value." + ' ' + 
	          "To make it easier to require individual widgets all file structures for componets have been flattened down" + ' ' + 
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

	'use strict';
	var _ = __webpack_require__(14)
	
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var idCount = 0;
	
	var _ = 
	
	  module.exports = {
	
	    has: has,
	    
	    merge:  __webpack_require__(39),
	
	    extend: __webpack_require__(33),
	
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */
	
	var React = __webpack_require__(1);
	
	var defaultValue = React.createClass({displayName: 'defaultValue',
	
	  render: function() {
	    return (
	      React.createElement("span", {className: "default"}, 
	        "(default: ", this.props.children, ")"
	      )
	    );
	  }
	
	});
	
	module.exports = defaultValue;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1)
	  , _ = __webpack_require__(46);
	
	
	module.exports = React.createClass({displayName: 'exports',
	
	  getDefaultProps: function(){
	    return {
	      language: 'js'
	    }
	  },
	
	  render: function(){
	    return (
	      React.createElement("pre", null, 
	        React.createElement("code", {className:  this.props.language}, 
	          this.props.code
	        )
	      )
	    )
	  }
	})

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Button = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , Dropdown = __webpack_require__(32).DropdownList
	  , NumberPicker = __webpack_require__(32).NumberPicker;
	
	var valueComp = React.createClass({displayName: 'valueComp',
	  render: function() {
	
	    return (React.createElement("span", null, React.createElement("i", {className: "fa fa-comment"}),  '  ' + this.props.item.label))
	  }
	});
	
	var itemComp = React.createClass({displayName: 'itemComp',
	  render: function() {
	    var icons =  ['bicycle', 'area-chart', 'anchor']
	
	    this._icon || (this._icon = icons[getRandomInt(0, 2)])
	    return (
	      React.createElement("div", null, 
	        React.createElement("i", {className: 'fa fa-' + this._icon}), 
	         '  ' + this.props.item.label
	      )
	    );
	  }
	});
	
	
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	
	var DropdownApi = React.createClass({displayName: 'DropdownApi',
	
	  getInitialState: function(){
	
	    return {
	      duration: 250,
	    }
	  },
	
	  render: function() {
	    var list = [
	        { label: 'orange', id: 1 },
	        { label: 'blue', id: 2 },
	        { label: 'red', id: 3 },
	      ];
	
	    return (
	      React.createElement("div", {className: "example"}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-sm-8 demo"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(Dropdown, {
	                disabled: this.state.disabled === 'disabled', 
	                readOnly: this.state.disabled === 'readonly', 
	                value: this.state.value || 1, 
	                data: list, 
	                duration: this.state.duration, 
	                busy: this.state.busy, 
	                onChange: this._change, 
	                isRtl: this.state.isRtl, 
	                valueField: "id", 
	                textField: "label"}
	                )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", null, "Custom Rendering"), 
	              React.createElement(Dropdown, {
	                disabled: this.state.disabled === 'disabled', 
	                readOnly: this.state.disabled === 'readonly', 
	                value: this.state.value || 1, 
	                valueComponent: valueComp, 
	                itemComponent: itemComp, 
	                data: list, 
	                duration: this.state.duration, 
	                busy: this.state.busy, 
	                onChange: this._change, 
	                isRtl: this.state.isRtl, 
	                valueField: "id", 
	                textField: "label"}
	                )
	            )
	          ), 
	          React.createElement("div", {className: "col-sm-4 api-panel"}, 
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Button = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , RW = __webpack_require__(32);
	
	module.exports = React.createClass({displayName: 'exports',
	
	  getInitialState: function(){
	    return {
	      duration: 250,
	      value: 1,
	      suggest: true
	    }
	  },
	
	  render: function(){
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
	      ]
	
	    return (
	      React.createElement("div", {className: "example"}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-sm-8 demo"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(RW.Combobox, {
	                  data: list, 
	                  value: this.state.value, 
	                  onChange: this._change, 
	                  textField: "name", 
	                  valueField: "id", 
	                  suggest: this.state.suggest || false, 
	                  filter: this.state.filter || false, 
	                  disabled: this.state.disabled === 'disabled', 
	                  readOnly: this.state.disabled === 'readonly', 
	
	                  duration: this.state.duration, 
	                  busy: this.state.busy, 
	                  isRtl: this.state.isRtl})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", null, "Custom list Rendering"), 
	              React.createElement(RW.Combobox, {
	                  data: list, 
	                  value: this.state.value, 
	                  onChange: this._change, 
	                  textField: "name", 
	                  valueField: "id", 
	                  suggest: this.state.suggest || false, 
	                  filter: this.state.filter || false, 
	                  disabled: this.state.disabled === 'disabled', 
	                  readOnly: this.state.disabled === 'readonly', 
	                  duration: this.state.duration, 
	                  itemComponent: itemComp, 
	                  busy: this.state.busy, 
	                  isRtl: this.state.isRtl})
	            )
	          ), 
	          React.createElement("div", {className: "col-sm-4 api-panel"}, 
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
	              React.createElement("label", {className: "form-label"}), 
	              React.createElement("label", {className: "checkbox-inline"}, 
	                React.createElement("input", {type: "checkbox", 
	                  checked: this.state.suggest, 
	                  onChange: this._set.bind(null, 'suggest', !this.state.suggest)}), 
	                  "Suggestions"
	              )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "Filter"), 
	              React.createElement(RW.DropdownList, {
	                  value: this.state.filter || false, 
	                  data: [false, 'startsWith', 'endsWith', 'contains'], 
	                  onChange: this._set.bind(null, 'filter')})
	            ), 
	
	            React.createElement("div", {className: "form-group"}, 
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Button = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , RW = __webpack_require__(32);
	
	var chance = new (__webpack_require__(47))
	
	var list = new Array(100)
	
	for(var i = 0; i < list.length; i++)
	  list[i] = { id: i + 1, label: chance.name() }
	
	
	module.exports = React.createClass({displayName: 'exports',
	
	  getInitialState: function(){
	    return {
	      duration: 250,
	      value: [],
	      suggest: true,
	      placeholder: 'a placeholder...'
	    }
	  },
	
	  render: function(){
	    var allVals = this.state.value
	      , disabled = this.state.disabled === true || Array.isArray(this.state.disabled);
	
	    return (
	      React.createElement("div", {className: "example"}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-sm-8 demo"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(RW.Multiselect, {
	                  data: list, 
	                  value: this.state.value, 
	                  onChange: this._change, 
	                  textField: "label", 
	                  valueField: "id", 
	                  placeholder: this.state.placeholder, 
	                  disabled: disabled ? this.state.disabled : false, 
	                  readOnly: this.state.disabled === 'readonly', 
	                  duration: this.state.duration, 
	                  busy: this.state.busy, 
	                  isRtl: this.state.isRtl})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", null, "Custom Rendering"), 
	              React.createElement(RW.Multiselect, {
	                  data: list, 
	                  value: this.state.value, 
	                  onChange: this._change, 
	                  textField: "label", 
	                  valueField: "id", 
	                  placeholder: this.state.placeholder, 
	                  disabled: disabled ? this.state.disabled : false, 
	                  readOnly: this.state.disabled === 'readonly', 
	
	                  duration: this.state.duration, 
	                  itemComponent: itemComp, 
	                  tagComponent: itemComp, 
	                  busy: this.state.busy, 
	                  isRtl: this.state.isRtl})
	            )
	          ), 
	          React.createElement("div", {className: "col-sm-4 api-panel"}, 
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
	              React.createElement("label", {className: "form-label"}, "Disable Multiselect Values"), 
	              React.createElement(RW.Multiselect, {
	                  value:  Array.isArray(this.state.disabled) ? this.state.disabled : [], 
	                  data: allVals, 
	                  textField: "label", 
	                  valueField: "id", 
	                  disabled: this.state.disabled === true, 
	                  messages: { emptyList: "no values selected to the right"}, 
	                  onChange: this._set.bind(null, 'disabled')})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "Placeholder"), 
	              React.createElement("input", {className: "form-control", type: "text", 
	                  value: this.state.placeholder, 
	                  onChange: extract(this._set.bind(null, 'placeholder'))})
	            ), 
	
	            React.createElement("div", {className: "form-group"}, 
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
	         '  ' + this.props.item.label
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
	  , RW = __webpack_require__(32);
	
	
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
	          React.createElement("div", {className: "col-sm-8 demo"}, 
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
	          React.createElement("div", {className: "col-sm-4 api-panel"}, 
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React       = __webpack_require__(1)
	  , Button      = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , RW          = __webpack_require__(32);
	
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
	          React.createElement("div", {className: "col-sm-8"}, 
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
	          React.createElement("div", {className: "col-sm-4 api-panel"}, 
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
	              React.createElement("label", {className: "form-label"}, "Initial View"), 
	              React.createElement(RW.DropdownList, {
	                  value: this.state.initialView || 'month', 
	                  data: ["month", "year", "decade", "century"], 
	                  onChange: this._set.bind(null, 'initialView')})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "Final View"), 
	              React.createElement(RW.DropdownList, {
	                  value: this.state.finalView || 'century', 
	                  data: ["month", "year", "decade", "century"], 
	                  onChange: this._set.bind(null, 'finalView')})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "min"), 
	              React.createElement(RW.DateTimePicker, {
	                  time: false, 
	                  format: "MMM dd, yyyy", 
	                  value: this.state.min, 
	                  onChange: this._set.bind(null, 'min')})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "max"), 
	              React.createElement(RW.DateTimePicker, {
	                  time: false, 
	                  format: "MMM dd, yyyy", 
	                  value: this.state.max, 
	                  onChange: this._set.bind(null, 'max')})
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1)
	  , dates = __webpack_require__(38)
	  , Button = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , RW = __webpack_require__(32);
	
	module.exports = React.createClass({displayName: 'exports',
	  getInitialState: function(){
	    return {
	      calendar: true,
	      time: true,
	      format: 'f',
	    }
	  },
	
	render: function(){
	  var pickerFormat = this.state.time
	      ? !this.state.calendar ? 'T' : 'MMM dd, yyyy h:mm tt'
	      : 'MMM dd, yyyy'
	
	    return (
	      React.createElement("div", {className: "example"}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-sm-8 demo"}, 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement(RW.DateTimePicker, {
	                value: this.state.value, 
	                onChange: this._change, 
	                format: this.state.format, 
	                max: this.state.max || undefined, 
	                min: this.state.min || undefined, 
	                calendar: this.state.calendar, 
	                time: this.state.time, 
	                finalView: this.state.finalView, 
	                initialView: this.state.initialView, 
	                disabled: this.state.disabled === 'disabled', 
	                readOnly: this.state.disabled === 'readonly', 
	                onChange: this._change, 
	                isRtl: this.state.isRtl})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", null, "Custom Rendering"), 
	              React.createElement(RW.DateTimePicker, {
	                value: this.state.value, 
	                onChange: this._change, 
	                format: this.state.format, 
	                max: this.state.max || undefined, 
	                min: this.state.min || undefined, 
	                calendar: this.state.calendar, 
	                time: this.state.time, 
	                finalView: this.state.finalView, 
	                initialView: this.state.initialView, 
	                timeComponent: itemComp, 
	                disabled: this.state.disabled === 'disabled', 
	                readOnly: this.state.disabled === 'readonly', 
	                onChange: this._change, 
	                isRtl: this.state.isRtl})
	            )
	            
	          ), 
	          React.createElement("div", {className: "col-sm-4 api-panel"}, 
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
	                React.createElement(Button, {
	                  active: this.state.calendar, 
	                  onClick: this._set.bind(null, 'calendar', !this.state.calendar)}, 
	                  "Date Picker"
	                ), 
	                React.createElement(Button, {style: { marginLeft: 10}, 
	                  active: this.state.time, 
	                  onClick: this._set.bind(null, 'time', !this.state.time)}, 
	                  "Time Picker"
	                )
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "Format"), 
	              React.createElement(RW.Combobox, {
	                  value: this.state.format, 
	                  data: ['MMM dd, yyyy', 'f', 'dd, MMM yyyy HH:mm'], 
	                  onChange: this._set.bind(null, 'format')})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "Initial View"), 
	              React.createElement(RW.DropdownList, {
	                  value: this.state.initialView || 'month', 
	                  data: ["month", "year", "decade", "century"], 
	                  onChange: this._set.bind(null, 'initialView')})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "Final View"), 
	              React.createElement(RW.DropdownList, {
	                  value: this.state.finalView || 'century', 
	                  data: ["month", "year", "decade", "century"], 
	                  onChange: this._set.bind(null, 'finalView')})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "min"), 
	              React.createElement(RW.DateTimePicker, {
	                  calendar: this.state.calendar, 
	                  time: this.state.time, 
	                  format: pickerFormat, 
	                  value: this.state.min, 
	                  onChange: this._set.bind(null, 'min')})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "max"), 
	              React.createElement(RW.DateTimePicker, {
	                  calendar: this.state.calendar, 
	                  time: this.state.time, 
	                  format: pickerFormat, 
	                  value: this.state.max, 
	                  onChange: this._set.bind(null, 'max')})
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1)
	  , Button = __webpack_require__(2).Button
	  , ButtonGroup = __webpack_require__(2).ButtonGroup
	  , RW = __webpack_require__(32);
	
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
	      React.createElement("div", {className: "example "}, 
	        React.createElement("div", {className: "row"}, 
	          React.createElement("div", {className: "col-sm-8 demo"}, 
	            React.createElement(RW.NumberPicker, {
	                value: this.state.value, 
	                onChange: this._change, 
	                max: this.state.max, 
	                min: this.state.min, 
	                step: this.state.step, 
	                disabled: this.state.disabled === 'disabled', 
	                readOnly: this.state.disabled === 'readonly', 
	                format: this.state.format, 
	                onChange: this._change, 
	                isRtl: this.state.isRtl})
	          ), 
	          React.createElement("div", {className: "col-sm-4 api-panel"}, 
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
	
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "step"), 
	              React.createElement(RW.NumberPicker, {
	                  value: this.state.step, 
	                  onChange: this._set.bind(null, 'step')})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "min"), 
	              React.createElement(RW.NumberPicker, {
	                  value: this.state.min, 
	                  onChange: this._set.bind(null, 'min')})
	            ), 
	            React.createElement("div", {className: "form-group"}, 
	              React.createElement("label", {className: "form-label"}, "max"), 
	              React.createElement(RW.NumberPicker, {
	                  value: this.state.max, 
	                  onChange: this._set.bind(null, 'max')})
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(40);
	var classSet = __webpack_require__(41);
	var BootstrapMixin = __webpack_require__(34);
	
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(40);
	var classSet = __webpack_require__(41);
	var BootstrapMixin = __webpack_require__(34);
	var Button = __webpack_require__(24);
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(40);
	var classSet = __webpack_require__(41);
	var cloneWithProps = __webpack_require__(43);
	
	var createChainedFunction = __webpack_require__(45);
	var BootstrapMixin = __webpack_require__(34);
	var DropdownStateMixin = __webpack_require__(36);
	var Button = __webpack_require__(24);
	var ButtonGroup = __webpack_require__(25);
	var DropdownMenu = __webpack_require__(37);
	var ValidComponentChildren = __webpack_require__(44);
	
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(40);
	var classSet = __webpack_require__(41);
	
	var MenuItem = React.createClass({displayName: 'MenuItem',
	  propTypes: {
	    header:    React.PropTypes.bool,
	    divider:   React.PropTypes.bool,
	    href:      React.PropTypes.string,
	    title:     React.PropTypes.string,
	    onSelect:  React.PropTypes.func,
	    selectKey: React.PropTypes.any
	  },
	
	  getDefaultProps: function () {
	    return {
	      href: '#'
	    };
	  },
	
	  handleClick: function (e) {
	    if (this.props.onSelect) {
	      e.preventDefault();
	      this.props.onSelect(this.props.selectKey);
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(40);
	var BootstrapMixin = __webpack_require__(34);
	var CollapsableMixin = __webpack_require__(35);
	var classSet = __webpack_require__(41);
	var domUtils = __webpack_require__(42);
	var cloneWithProps = __webpack_require__(43);
	
	var ValidComponentChildren = __webpack_require__(44);
	var createChainedFunction = __webpack_require__(45);
	
	
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
	    selectKey: React.PropTypes.any
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
	      if (child.props.selectKey == this.props.activeKey) {
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(40);
	var BootstrapMixin = __webpack_require__(34);
	var classSet = __webpack_require__(41);
	var cloneWithProps = __webpack_require__(43);
	
	var ValidComponentChildren = __webpack_require__(44);
	var createChainedFunction = __webpack_require__(45);
	var Nav = __webpack_require__(28);
	
	
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
	      collapsable: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.selectKey,
	      expanded: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.selectKey && this.isNavExpanded(),
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(40);
	var classSet = __webpack_require__(41);
	var cloneWithProps = __webpack_require__(43);
	
	var ValidComponentChildren = __webpack_require__(44);
	var createChainedFunction = __webpack_require__(45);
	var BootstrapMixin = __webpack_require__(34);
	
	
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
	        this.props.onSelect(this.props.selectKey, this.props.href);
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
	
	    if (this.props.activeKey != null && this.props.activeKey === child.props.selectKey) {
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
	      if (child.props.selectKey == this.props.activeKey) {
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(40);
	var classSet = __webpack_require__(41);
	var BootstrapMixin = __webpack_require__(34);
	
	var NavItem = React.createClass({displayName: 'NavItem',
	  mixins: [BootstrapMixin],
	
	  propTypes: {
	    onSelect: React.PropTypes.func,
	    active: React.PropTypes.bool,
	    disabled: React.PropTypes.bool,
	    href: React.PropTypes.string,
	    title: React.PropTypes.string,
	    selectKey: React.PropTypes.any
	  },
	
	  getDefaultProps: function () {
	    return {
	      href: '#'
	    };
	  },
	
	  render: function () {
	    var classes = {
	      'active': this.props.active,
	      'disabled': this.props.disabled
	    };
	
	    return (
	      React.createElement("li", React.__spread({},  this.props, {className: joinClasses(this.props.className, classSet(classes))}), 
	        React.createElement("a", {
	          href: this.props.href, 
	          title: this.props.title, 
	          onClick: this.handleClick, 
	          ref: "anchor"}, 
	          this.props.children
	        )
	      )
	    );
	  },
	
	  handleClick: function (e) {
	    if (this.props.onSelect) {
	      e.preventDefault();
	
	      if (!this.props.disabled) {
	        this.props.onSelect(this.props.selectKey, this.props.href);
	      }
	    }
	  }
	});
	
	module.exports = NavItem;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	
	
	module.exports = {
	
	  DropdownList:     __webpack_require__(48),
	  Combobox:         __webpack_require__(49),
	
	  Calendar:         __webpack_require__(50),
	  DateTimePicker:   __webpack_require__(51),
	
	  NumberPicker:     __webpack_require__(52),
	  
	  Multiselect:      __webpack_require__(53),
	  SelectList:       __webpack_require__(54),
	
	  utils: {
	    ReplaceTransitionGroup: __webpack_require__(55),
	    SlideTransition:        __webpack_require__(56),
	  }
	}

/***/ },
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var constants = __webpack_require__(57);
	
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var TransitionEvents = __webpack_require__(58);
	
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
	    if (node && nextProps.expanded !== this.props.expanded && this.props.expanded) {
	      node.style[dimension] = this.getCollapsableDimensionValue() + 'px';
	    }
	  },
	
	  componentDidUpdate: function (prevProps, prevState) {
	    if (this.state.collapsing !== prevState.collapsing) {
	      this._afterRender();
	    }
	  },
	
	  _afterRender: function () {
	    if (!this.props.collapsable) {
	      return;
	    }
	
	    this._addEndTransitionListener();
	    setTimeout(this._updateDimensionAfterRender, 0);
	  },
	
	  _updateDimensionAfterRender: function () {
	    var dimension = (typeof this.getCollapsableDimension === 'function') ?
	      this.getCollapsableDimension() : 'height';
	    var node = this.getCollapsableDOMNode();
	
	    if (node) {
	        if(this.isExpanded() && !this.state.collapsing) {
	            node.style[dimension] = 'auto';
	        } else {
	            node.style[dimension] = this.isExpanded() ?
	              this.getCollapsableDimensionValue() + 'px' : '0px';
	        }
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var EventListener = __webpack_require__(59);
	
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var joinClasses = __webpack_require__(40);
	var classSet = __webpack_require__(41);
	var cloneWithProps = __webpack_require__(43);
	
	var createChainedFunction = __webpack_require__(45);
	var ValidComponentChildren = __webpack_require__(44);
	
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
/* 38 */
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
	
	    return dates.gte(day, min, unit) 
	        && dates.lte(day, max, unit)
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
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
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
/* 43 */
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
	var joinClasses = __webpack_require__(40);
	var assign = __webpack_require__(82);
	
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
	
	  function MockLegacyElement(){}
	
	  // Use `child.props.children` if it is provided.
	  if (!newProps.hasOwnProperty(CHILDREN_PROP) &&
	    child.props.hasOwnProperty(CHILDREN_PROP)) {
	    newProps.children = child.props.children;
	  }
	
	  // The need for this is due to the fact that react wraps the normal `createElement(...)`
	  // in legacy checker that fails in this case. We trick react and pass in a Mock legacy wrapper
	  // with the correct type. It is this or include the private stuff.
	  if( React.version.substr(0, 4) === '0.12' ){
	    MockLegacyElement.type = child.type;
	    MockLegacyElement.isReactLegacyFactory = true;
	    return React.createElement(MockLegacyElement, newProps);
	  }
	  
	  //0.13 will remove the deprecation warnings and so the hack above is not needed
	  return React.createElement(child.type, newProps);
	}
	
	module.exports = cloneWithProps;

/***/ },
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
	 * Build: `lodash -o ./dist/lodash.compat.js`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <http://lodash.com/license>
	 */
	;(function() {
	
	  /** Used as a safe reference for `undefined` in pre ES5 environments */
	  var undefined;
	
	  /** Used to pool arrays and objects used internally */
	  var arrayPool = [],
	      objectPool = [];
	
	  /** Used to generate unique IDs */
	  var idCounter = 0;
	
	  /** Used internally to indicate various things */
	  var indicatorObject = {};
	
	  /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
	  var keyPrefix = +new Date + '';
	
	  /** Used as the size when optimizations are enabled for large arrays */
	  var largeArraySize = 75;
	
	  /** Used as the max size of the `arrayPool` and `objectPool` */
	  var maxPoolSize = 40;
	
	  /** Used to detect and test whitespace */
	  var whitespace = (
	    // whitespace
	    ' \t\x0B\f\xA0\ufeff' +
	
	    // line terminators
	    '\n\r\u2028\u2029' +
	
	    // unicode category "Zs" space separators
	    '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
	  );
	
	  /** Used to match empty string literals in compiled template source */
	  var reEmptyStringLeading = /\b__p \+= '';/g,
	      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
	
	  /**
	   * Used to match ES6 template delimiters
	   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals
	   */
	  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
	
	  /** Used to match regexp flags from their coerced string values */
	  var reFlags = /\w*$/;
	
	  /** Used to detected named functions */
	  var reFuncName = /^\s*function[ \n\r\t]+\w/;
	
	  /** Used to match "interpolate" template delimiters */
	  var reInterpolate = /<%=([\s\S]+?)%>/g;
	
	  /** Used to match leading whitespace and zeros to be removed */
	  var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');
	
	  /** Used to ensure capturing order of template delimiters */
	  var reNoMatch = /($^)/;
	
	  /** Used to detect functions containing a `this` reference */
	  var reThis = /\bthis\b/;
	
	  /** Used to match unescaped characters in compiled string literals */
	  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;
	
	  /** Used to assign default `context` object properties */
	  var contextProps = [
	    'Array', 'Boolean', 'Date', 'Error', 'Function', 'Math', 'Number', 'Object',
	    'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',
	    'parseInt', 'setTimeout'
	  ];
	
	  /** Used to fix the JScript [[DontEnum]] bug */
	  var shadowedProps = [
	    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
	    'toLocaleString', 'toString', 'valueOf'
	  ];
	
	  /** Used to make template sourceURLs easier to identify */
	  var templateCounter = 0;
	
	  /** `Object#toString` result shortcuts */
	  var argsClass = '[object Arguments]',
	      arrayClass = '[object Array]',
	      boolClass = '[object Boolean]',
	      dateClass = '[object Date]',
	      errorClass = '[object Error]',
	      funcClass = '[object Function]',
	      numberClass = '[object Number]',
	      objectClass = '[object Object]',
	      regexpClass = '[object RegExp]',
	      stringClass = '[object String]';
	
	  /** Used to identify object classifications that `_.clone` supports */
	  var cloneableClasses = {};
	  cloneableClasses[funcClass] = false;
	  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
	  cloneableClasses[boolClass] = cloneableClasses[dateClass] =
	  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
	  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;
	
	  /** Used as an internal `_.debounce` options object */
	  var debounceOptions = {
	    'leading': false,
	    'maxWait': 0,
	    'trailing': false
	  };
	
	  /** Used as the property descriptor for `__bindData__` */
	  var descriptor = {
	    'configurable': false,
	    'enumerable': false,
	    'value': null,
	    'writable': false
	  };
	
	  /** Used as the data object for `iteratorTemplate` */
	  var iteratorData = {
	    'args': '',
	    'array': null,
	    'bottom': '',
	    'firstArg': '',
	    'init': '',
	    'keys': null,
	    'loop': '',
	    'shadowedProps': null,
	    'support': null,
	    'top': '',
	    'useHas': false
	  };
	
	  /** Used to determine if values are of the language type Object */
	  var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	  };
	
	  /** Used to escape characters for inclusion in compiled string literals */
	  var stringEscapes = {
	    '\\': '\\',
	    "'": "'",
	    '\n': 'n',
	    '\r': 'r',
	    '\t': 't',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  /** Used as a reference to the global object */
	  var root = (objectTypes[typeof window] && window) || this;
	
	  /** Detect free variable `exports` */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
	
	  /** Detect free variable `module` */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
	
	  /** Detect the popular CommonJS extension `module.exports` */
	  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;
	
	  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
	  var freeGlobal = objectTypes[typeof global] && global;
	  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
	    root = freeGlobal;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * The base implementation of `_.indexOf` without support for binary searches
	   * or `fromIndex` constraints.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} [fromIndex=0] The index to search from.
	   * @returns {number} Returns the index of the matched value or `-1`.
	   */
	  function baseIndexOf(array, value, fromIndex) {
	    var index = (fromIndex || 0) - 1,
	        length = array ? array.length : 0;
	
	    while (++index < length) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }
	
	  /**
	   * An implementation of `_.contains` for cache objects that mimics the return
	   * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
	   *
	   * @private
	   * @param {Object} cache The cache object to inspect.
	   * @param {*} value The value to search for.
	   * @returns {number} Returns `0` if `value` is found, else `-1`.
	   */
	  function cacheIndexOf(cache, value) {
	    var type = typeof value;
	    cache = cache.cache;
	
	    if (type == 'boolean' || value == null) {
	      return cache[value] ? 0 : -1;
	    }
	    if (type != 'number' && type != 'string') {
	      type = 'object';
	    }
	    var key = type == 'number' ? value : keyPrefix + value;
	    cache = (cache = cache[type]) && cache[key];
	
	    return type == 'object'
	      ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)
	      : (cache ? 0 : -1);
	  }
	
	  /**
	   * Adds a given value to the corresponding cache object.
	   *
	   * @private
	   * @param {*} value The value to add to the cache.
	   */
	  function cachePush(value) {
	    var cache = this.cache,
	        type = typeof value;
	
	    if (type == 'boolean' || value == null) {
	      cache[value] = true;
	    } else {
	      if (type != 'number' && type != 'string') {
	        type = 'object';
	      }
	      var key = type == 'number' ? value : keyPrefix + value,
	          typeCache = cache[type] || (cache[type] = {});
	
	      if (type == 'object') {
	        (typeCache[key] || (typeCache[key] = [])).push(value);
	      } else {
	        typeCache[key] = true;
	      }
	    }
	  }
	
	  /**
	   * Used by `_.max` and `_.min` as the default callback when a given
	   * collection is a string value.
	   *
	   * @private
	   * @param {string} value The character to inspect.
	   * @returns {number} Returns the code unit of given character.
	   */
	  function charAtCallback(value) {
	    return value.charCodeAt(0);
	  }
	
	  /**
	   * Used by `sortBy` to compare transformed `collection` elements, stable sorting
	   * them in ascending order.
	   *
	   * @private
	   * @param {Object} a The object to compare to `b`.
	   * @param {Object} b The object to compare to `a`.
	   * @returns {number} Returns the sort order indicator of `1` or `-1`.
	   */
	  function compareAscending(a, b) {
	    var ac = a.criteria,
	        bc = b.criteria,
	        index = -1,
	        length = ac.length;
	
	    while (++index < length) {
	      var value = ac[index],
	          other = bc[index];
	
	      if (value !== other) {
	        if (value > other || typeof value == 'undefined') {
	          return 1;
	        }
	        if (value < other || typeof other == 'undefined') {
	          return -1;
	        }
	      }
	    }
	    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	    // that causes it, under certain circumstances, to return the same value for
	    // `a` and `b`. See https://github.com/jashkenas/underscore/pull/1247
	    //
	    // This also ensures a stable sort in V8 and other engines.
	    // See http://code.google.com/p/v8/issues/detail?id=90
	    return a.index - b.index;
	  }
	
	  /**
	   * Creates a cache object to optimize linear searches of large arrays.
	   *
	   * @private
	   * @param {Array} [array=[]] The array to search.
	   * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
	   */
	  function createCache(array) {
	    var index = -1,
	        length = array.length,
	        first = array[0],
	        mid = array[(length / 2) | 0],
	        last = array[length - 1];
	
	    if (first && typeof first == 'object' &&
	        mid && typeof mid == 'object' && last && typeof last == 'object') {
	      return false;
	    }
	    var cache = getObject();
	    cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;
	
	    var result = getObject();
	    result.array = array;
	    result.cache = cache;
	    result.push = cachePush;
	
	    while (++index < length) {
	      result.push(array[index]);
	    }
	    return result;
	  }
	
	  /**
	   * Used by `template` to escape characters for inclusion in compiled
	   * string literals.
	   *
	   * @private
	   * @param {string} match The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeStringChar(match) {
	    return '\\' + stringEscapes[match];
	  }
	
	  /**
	   * Gets an array from the array pool or creates a new one if the pool is empty.
	   *
	   * @private
	   * @returns {Array} The array from the pool.
	   */
	  function getArray() {
	    return arrayPool.pop() || [];
	  }
	
	  /**
	   * Gets an object from the object pool or creates a new one if the pool is empty.
	   *
	   * @private
	   * @returns {Object} The object from the pool.
	   */
	  function getObject() {
	    return objectPool.pop() || {
	      'array': null,
	      'cache': null,
	      'criteria': null,
	      'false': false,
	      'index': 0,
	      'null': false,
	      'number': null,
	      'object': null,
	      'push': null,
	      'string': null,
	      'true': false,
	      'undefined': false,
	      'value': null
	    };
	  }
	
	  /**
	   * Checks if `value` is a DOM node in IE < 9.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if the `value` is a DOM node, else `false`.
	   */
	  function isNode(value) {
	    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
	    // methods that are `typeof` "string" and still can coerce nodes to strings
	    return typeof value.toString != 'function' && typeof (value + '') == 'string';
	  }
	
	  /**
	   * Releases the given array back to the array pool.
	   *
	   * @private
	   * @param {Array} [array] The array to release.
	   */
	  function releaseArray(array) {
	    array.length = 0;
	    if (arrayPool.length < maxPoolSize) {
	      arrayPool.push(array);
	    }
	  }
	
	  /**
	   * Releases the given object back to the object pool.
	   *
	   * @private
	   * @param {Object} [object] The object to release.
	   */
	  function releaseObject(object) {
	    var cache = object.cache;
	    if (cache) {
	      releaseObject(cache);
	    }
	    object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
	    if (objectPool.length < maxPoolSize) {
	      objectPool.push(object);
	    }
	  }
	
	  /**
	   * Slices the `collection` from the `start` index up to, but not including,
	   * the `end` index.
	   *
	   * Note: This function is used instead of `Array#slice` to support node lists
	   * in IE < 9 and to ensure dense arrays are returned.
	   *
	   * @private
	   * @param {Array|Object|string} collection The collection to slice.
	   * @param {number} start The start index.
	   * @param {number} end The end index.
	   * @returns {Array} Returns the new array.
	   */
	  function slice(array, start, end) {
	    start || (start = 0);
	    if (typeof end == 'undefined') {
	      end = array ? array.length : 0;
	    }
	    var index = -1,
	        length = end - start || 0,
	        result = Array(length < 0 ? 0 : length);
	
	    while (++index < length) {
	      result[index] = array[start + index];
	    }
	    return result;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Create a new `lodash` function using the given context object.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns the `lodash` function.
	   */
	  function runInContext(context) {
	    // Avoid issues with some ES3 environments that attempt to use values, named
	    // after built-in constructors like `Object`, for the creation of literals.
	    // ES5 clears this up by stating that literals must use built-in constructors.
	    // See http://es5.github.io/#x11.1.5.
	    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;
	
	    /** Native constructor references */
	    var Array = context.Array,
	        Boolean = context.Boolean,
	        Date = context.Date,
	        Error = context.Error,
	        Function = context.Function,
	        Math = context.Math,
	        Number = context.Number,
	        Object = context.Object,
	        RegExp = context.RegExp,
	        String = context.String,
	        TypeError = context.TypeError;
	
	    /**
	     * Used for `Array` method references.
	     *
	     * Normally `Array.prototype` would suffice, however, using an array literal
	     * avoids issues in Narwhal.
	     */
	    var arrayRef = [];
	
	    /** Used for native method references */
	    var errorProto = Error.prototype,
	        objectProto = Object.prototype,
	        stringProto = String.prototype;
	
	    /** Used to restore the original `_` reference in `noConflict` */
	    var oldDash = context._;
	
	    /** Used to resolve the internal [[Class]] of values */
	    var toString = objectProto.toString;
	
	    /** Used to detect if a method is native */
	    var reNative = RegExp('^' +
	      String(toString)
	        .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	        .replace(/toString| for [^\]]+/g, '.*?') + '$'
	    );
	
	    /** Native method shortcuts */
	    var ceil = Math.ceil,
	        clearTimeout = context.clearTimeout,
	        floor = Math.floor,
	        fnToString = Function.prototype.toString,
	        getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
	        hasOwnProperty = objectProto.hasOwnProperty,
	        push = arrayRef.push,
	        propertyIsEnumerable = objectProto.propertyIsEnumerable,
	        setTimeout = context.setTimeout,
	        splice = arrayRef.splice,
	        unshift = arrayRef.unshift;
	
	    /** Used to set meta data on functions */
	    var defineProperty = (function() {
	      // IE 8 only accepts DOM elements
	      try {
	        var o = {},
	            func = isNative(func = Object.defineProperty) && func,
	            result = func(o, o, o) && func;
	      } catch(e) { }
	      return result;
	    }());
	
	    /* Native method shortcuts for methods with the same name as other `lodash` methods */
	    var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
	        nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
	        nativeIsFinite = context.isFinite,
	        nativeIsNaN = context.isNaN,
	        nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
	        nativeMax = Math.max,
	        nativeMin = Math.min,
	        nativeParseInt = context.parseInt,
	        nativeRandom = Math.random;
	
	    /** Used to lookup a built-in constructor by [[Class]] */
	    var ctorByClass = {};
	    ctorByClass[arrayClass] = Array;
	    ctorByClass[boolClass] = Boolean;
	    ctorByClass[dateClass] = Date;
	    ctorByClass[funcClass] = Function;
	    ctorByClass[objectClass] = Object;
	    ctorByClass[numberClass] = Number;
	    ctorByClass[regexpClass] = RegExp;
	    ctorByClass[stringClass] = String;
	
	    /** Used to avoid iterating non-enumerable properties in IE < 9 */
	    var nonEnumProps = {};
	    nonEnumProps[arrayClass] = nonEnumProps[dateClass] = nonEnumProps[numberClass] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
	    nonEnumProps[boolClass] = nonEnumProps[stringClass] = { 'constructor': true, 'toString': true, 'valueOf': true };
	    nonEnumProps[errorClass] = nonEnumProps[funcClass] = nonEnumProps[regexpClass] = { 'constructor': true, 'toString': true };
	    nonEnumProps[objectClass] = { 'constructor': true };
	
	    (function() {
	      var length = shadowedProps.length;
	      while (length--) {
	        var key = shadowedProps[length];
	        for (var className in nonEnumProps) {
	          if (hasOwnProperty.call(nonEnumProps, className) && !hasOwnProperty.call(nonEnumProps[className], key)) {
	            nonEnumProps[className][key] = false;
	          }
	        }
	      }
	    }());
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates a `lodash` object which wraps the given value to enable intuitive
	     * method chaining.
	     *
	     * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
	     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
	     * and `unshift`
	     *
	     * Chaining is supported in custom builds as long as the `value` method is
	     * implicitly or explicitly included in the build.
	     *
	     * The chainable wrapper functions are:
	     * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
	     * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
	     * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
	     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
	     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
	     * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
	     * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
	     * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
	     * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
	     * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
	     * and `zip`
	     *
	     * The non-chainable wrapper functions are:
	     * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
	     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
	     * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
	     * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
	     * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
	     * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
	     * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
	     * `template`, `unescape`, `uniqueId`, and `value`
	     *
	     * The wrapper functions `first` and `last` return wrapped values when `n` is
	     * provided, otherwise they return unwrapped values.
	     *
	     * Explicit chaining can be enabled by using the `_.chain` method.
	     *
	     * @name _
	     * @constructor
	     * @category Chaining
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns a `lodash` instance.
	     * @example
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // returns an unwrapped value
	     * wrapped.reduce(function(sum, num) {
	     *   return sum + num;
	     * });
	     * // => 6
	     *
	     * // returns a wrapped value
	     * var squares = wrapped.map(function(num) {
	     *   return num * num;
	     * });
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */
	    function lodash(value) {
	      // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor
	      return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__'))
	       ? value
	       : new lodashWrapper(value);
	    }
	
	    /**
	     * A fast path for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @param {boolean} chainAll A flag to enable chaining for all methods
	     * @returns {Object} Returns a `lodash` instance.
	     */
	    function lodashWrapper(value, chainAll) {
	      this.__chain__ = !!chainAll;
	      this.__wrapped__ = value;
	    }
	    // ensure `new lodashWrapper` is an instance of `lodash`
	    lodashWrapper.prototype = lodash.prototype;
	
	    /**
	     * An object used to flag environments features.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    var support = lodash.support = {};
	
	    (function() {
	      var ctor = function() { this.x = 1; },
	          object = { '0': 1, 'length': 1 },
	          props = [];
	
	      ctor.prototype = { 'valueOf': 1, 'y': 1 };
	      for (var key in new ctor) { props.push(key); }
	      for (key in arguments) { }
	
	      /**
	       * Detect if an `arguments` object's [[Class]] is resolvable (all but Firefox < 4, IE < 9).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.argsClass = toString.call(arguments) == argsClass;
	
	      /**
	       * Detect if `arguments` objects are `Object` objects (all but Narwhal and Opera < 10.5).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.argsObject = arguments.constructor == Object && !(arguments instanceof Array);
	
	      /**
	       * Detect if `name` or `message` properties of `Error.prototype` are
	       * enumerable by default. (IE < 9, Safari < 5.1)
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') || propertyIsEnumerable.call(errorProto, 'name');
	
	      /**
	       * Detect if `prototype` properties are enumerable by default.
	       *
	       * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
	       * (if the prototype or a property on the prototype has been set)
	       * incorrectly sets a function's `prototype` property [[Enumerable]]
	       * value to `true`.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.enumPrototypes = propertyIsEnumerable.call(ctor, 'prototype');
	
	      /**
	       * Detect if functions can be decompiled by `Function#toString`
	       * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);
	
	      /**
	       * Detect if `Function#name` is supported (all but IE).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.funcNames = typeof Function.name == 'string';
	
	      /**
	       * Detect if `arguments` object indexes are non-enumerable
	       * (Firefox < 4, IE < 9, PhantomJS, Safari < 5.1).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.nonEnumArgs = key != 0;
	
	      /**
	       * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
	       *
	       * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
	       * made non-enumerable as well (a.k.a the JScript [[DontEnum]] bug).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.nonEnumShadows = !/valueOf/.test(props);
	
	      /**
	       * Detect if own properties are iterated after inherited properties (all but IE < 9).
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.ownLast = props[0] != 'x';
	
	      /**
	       * Detect if `Array#shift` and `Array#splice` augment array-like objects correctly.
	       *
	       * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
	       * and `splice()` functions that fail to remove the last element, `value[0]`,
	       * of array-like objects even though the `length` property is set to `0`.
	       * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
	       * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.spliceObjects = (arrayRef.splice.call(object, 0, 1), !object[0]);
	
	      /**
	       * Detect lack of support for accessing string characters by index.
	       *
	       * IE < 8 can't access characters by index and IE 8 can only access
	       * characters by index on string literals.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';
	
	      /**
	       * Detect if a DOM node's [[Class]] is resolvable (all but IE < 9)
	       * and that the JS engine errors when attempting to coerce an object to
	       * a string without a `toString` function.
	       *
	       * @memberOf _.support
	       * @type boolean
	       */
	      try {
	        support.nodeClass = !(toString.call(document) == objectClass && !({ 'toString': 0 } + ''));
	      } catch(e) {
	        support.nodeClass = true;
	      }
	    }(1));
	
	    /**
	     * By default, the template delimiters used by Lo-Dash are similar to those in
	     * embedded Ruby (ERB). Change the following template settings to use alternative
	     * delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    lodash.templateSettings = {
	
	      /**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'escape': /<%-([\s\S]+?)%>/g,
	
	      /**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'evaluate': /<%([\s\S]+?)%>/g,
	
	      /**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'interpolate': reInterpolate,
	
	      /**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type string
	       */
	      'variable': '',
	
	      /**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type Object
	       */
	      'imports': {
	
	        /**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type Function
	         */
	        '_': lodash
	      }
	    };
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * The template used to create iterator functions.
	     *
	     * @private
	     * @param {Object} data The data object used to populate the text.
	     * @returns {string} Returns the interpolated text.
	     */
	    var iteratorTemplate = function(obj) {
	
	      var __p = 'var index, iterable = ' +
	      (obj.firstArg) +
	      ', result = ' +
	      (obj.init) +
	      ';\nif (!iterable) return result;\n' +
	      (obj.top) +
	      ';';
	       if (obj.array) {
	      __p += '\nvar length = iterable.length; index = -1;\nif (' +
	      (obj.array) +
	      ') {  ';
	       if (support.unindexedChars) {
	      __p += '\n  if (isString(iterable)) {\n    iterable = iterable.split(\'\')\n  }  ';
	       }
	      __p += '\n  while (++index < length) {\n    ' +
	      (obj.loop) +
	      ';\n  }\n}\nelse {  ';
	       } else if (support.nonEnumArgs) {
	      __p += '\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += \'\';\n      ' +
	      (obj.loop) +
	      ';\n    }\n  } else {  ';
	       }
	
	       if (support.enumPrototypes) {
	      __p += '\n  var skipProto = typeof iterable == \'function\';\n  ';
	       }
	
	       if (support.enumErrorProps) {
	      __p += '\n  var skipErrorProps = iterable === errorProto || iterable instanceof Error;\n  ';
	       }
	
	          var conditions = [];    if (support.enumPrototypes) { conditions.push('!(skipProto && index == "prototype")'); }    if (support.enumErrorProps)  { conditions.push('!(skipErrorProps && (index == "message" || index == "name"))'); }
	
	       if (obj.useHas && obj.keys) {
	      __p += '\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] && keys(iterable),\n      length = ownProps ? ownProps.length : 0;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n';
	          if (conditions.length) {
	      __p += '    if (' +
	      (conditions.join(' && ')) +
	      ') {\n  ';
	       }
	      __p +=
	      (obj.loop) +
	      ';    ';
	       if (conditions.length) {
	      __p += '\n    }';
	       }
	      __p += '\n  }  ';
	       } else {
	      __p += '\n  for (index in iterable) {\n';
	          if (obj.useHas) { conditions.push("hasOwnProperty.call(iterable, index)"); }    if (conditions.length) {
	      __p += '    if (' +
	      (conditions.join(' && ')) +
	      ') {\n  ';
	       }
	      __p +=
	      (obj.loop) +
	      ';    ';
	       if (conditions.length) {
	      __p += '\n    }';
	       }
	      __p += '\n  }    ';
	       if (support.nonEnumShadows) {
	      __p += '\n\n  if (iterable !== objectProto) {\n    var ctor = iterable.constructor,\n        isProto = iterable === (ctor && ctor.prototype),\n        className = iterable === stringProto ? stringClass : iterable === errorProto ? errorClass : toString.call(iterable),\n        nonEnum = nonEnumProps[className];\n      ';
	       for (k = 0; k < 7; k++) {
	      __p += '\n    index = \'' +
	      (obj.shadowedProps[k]) +
	      '\';\n    if ((!(isProto && nonEnum[index]) && hasOwnProperty.call(iterable, index))';
	              if (!obj.useHas) {
	      __p += ' || (!nonEnum[index] && iterable[index] !== objectProto[index])';
	       }
	      __p += ') {\n      ' +
	      (obj.loop) +
	      ';\n    }      ';
	       }
	      __p += '\n  }    ';
	       }
	
	       }
	
	       if (obj.array || support.nonEnumArgs) {
	      __p += '\n}';
	       }
	      __p +=
	      (obj.bottom) +
	      ';\nreturn result';
	
	      return __p
	    };
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * The base implementation of `_.bind` that creates the bound function and
	     * sets its meta data.
	     *
	     * @private
	     * @param {Array} bindData The bind data array.
	     * @returns {Function} Returns the new bound function.
	     */
	    function baseBind(bindData) {
	      var func = bindData[0],
	          partialArgs = bindData[2],
	          thisArg = bindData[4];
	
	      function bound() {
	        // `Function#bind` spec
	        // http://es5.github.io/#x15.3.4.5
	        if (partialArgs) {
	          // avoid `arguments` object deoptimizations by using `slice` instead
	          // of `Array.prototype.slice.call` and not assigning `arguments` to a
	          // variable as a ternary expression
	          var args = slice(partialArgs);
	          push.apply(args, arguments);
	        }
	        // mimic the constructor's `return` behavior
	        // http://es5.github.io/#x13.2.2
	        if (this instanceof bound) {
	          // ensure `new bound` is an instance of `func`
	          var thisBinding = baseCreate(func.prototype),
	              result = func.apply(thisBinding, args || arguments);
	          return isObject(result) ? result : thisBinding;
	        }
	        return func.apply(thisArg, args || arguments);
	      }
	      setBindData(bound, bindData);
	      return bound;
	    }
	
	    /**
	     * The base implementation of `_.clone` without argument juggling or support
	     * for `thisArg` binding.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep=false] Specify a deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates clones with source counterparts.
	     * @returns {*} Returns the cloned value.
	     */
	    function baseClone(value, isDeep, callback, stackA, stackB) {
	      if (callback) {
	        var result = callback(value);
	        if (typeof result != 'undefined') {
	          return result;
	        }
	      }
	      // inspect [[Class]]
	      var isObj = isObject(value);
	      if (isObj) {
	        var className = toString.call(value);
	        if (!cloneableClasses[className] || (!support.nodeClass && isNode(value))) {
	          return value;
	        }
	        var ctor = ctorByClass[className];
	        switch (className) {
	          case boolClass:
	          case dateClass:
	            return new ctor(+value);
	
	          case numberClass:
	          case stringClass:
	            return new ctor(value);
	
	          case regexpClass:
	            result = ctor(value.source, reFlags.exec(value));
	            result.lastIndex = value.lastIndex;
	            return result;
	        }
	      } else {
	        return value;
	      }
	      var isArr = isArray(value);
	      if (isDeep) {
	        // check for circular references and return corresponding clone
	        var initedStack = !stackA;
	        stackA || (stackA = getArray());
	        stackB || (stackB = getArray());
	
	        var length = stackA.length;
	        while (length--) {
	          if (stackA[length] == value) {
	            return stackB[length];
	          }
	        }
	        result = isArr ? ctor(value.length) : {};
	      }
	      else {
	        result = isArr ? slice(value) : assign({}, value);
	      }
	      // add array properties assigned by `RegExp#exec`
	      if (isArr) {
	        if (hasOwnProperty.call(value, 'index')) {
	          result.index = value.index;
	        }
	        if (hasOwnProperty.call(value, 'input')) {
	          result.input = value.input;
	        }
	      }
	      // exit for shallow clone
	      if (!isDeep) {
	        return result;
	      }
	      // add the source value to the stack of traversed objects
	      // and associate it with its clone
	      stackA.push(value);
	      stackB.push(result);
	
	      // recursively populate clone (susceptible to call stack limits)
	      (isArr ? baseEach : forOwn)(value, function(objValue, key) {
	        result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);
	      });
	
	      if (initedStack) {
	        releaseArray(stackA);
	        releaseArray(stackB);
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.create` without support for assigning
	     * properties to the created object.
	     *
	     * @private
	     * @param {Object} prototype The object to inherit from.
	     * @returns {Object} Returns the new object.
	     */
	    function baseCreate(prototype, properties) {
	      return isObject(prototype) ? nativeCreate(prototype) : {};
	    }
	    // fallback for browsers without `Object.create`
	    if (!nativeCreate) {
	      baseCreate = (function() {
	        function Object() {}
	        return function(prototype) {
	          if (isObject(prototype)) {
	            Object.prototype = prototype;
	            var result = new Object;
	            Object.prototype = null;
	          }
	          return result || context.Object();
	        };
	      }());
	    }
	
	    /**
	     * The base implementation of `_.createCallback` without support for creating
	     * "_.pluck" or "_.where" style callbacks.
	     *
	     * @private
	     * @param {*} [func=identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of the created callback.
	     * @param {number} [argCount] The number of arguments the callback accepts.
	     * @returns {Function} Returns a callback function.
	     */
	    function baseCreateCallback(func, thisArg, argCount) {
	      if (typeof func != 'function') {
	        return identity;
	      }
	      // exit early for no `thisArg` or already bound by `Function#bind`
	      if (typeof thisArg == 'undefined' || !('prototype' in func)) {
	        return func;
	      }
	      var bindData = func.__bindData__;
	      if (typeof bindData == 'undefined') {
	        if (support.funcNames) {
	          bindData = !func.name;
	        }
	        bindData = bindData || !support.funcDecomp;
	        if (!bindData) {
	          var source = fnToString.call(func);
	          if (!support.funcNames) {
	            bindData = !reFuncName.test(source);
	          }
	          if (!bindData) {
	            // checks if `func` references the `this` keyword and stores the result
	            bindData = reThis.test(source);
	            setBindData(func, bindData);
	          }
	        }
	      }
	      // exit early if there are no `this` references or `func` is bound
	      if (bindData === false || (bindData !== true && bindData[1] & 1)) {
	        return func;
	      }
	      switch (argCount) {
	        case 1: return function(value) {
	          return func.call(thisArg, value);
	        };
	        case 2: return function(a, b) {
	          return func.call(thisArg, a, b);
	        };
	        case 3: return function(value, index, collection) {
	          return func.call(thisArg, value, index, collection);
	        };
	        case 4: return function(accumulator, value, index, collection) {
	          return func.call(thisArg, accumulator, value, index, collection);
	        };
	      }
	      return bind(func, thisArg);
	    }
	
	    /**
	     * The base implementation of `createWrapper` that creates the wrapper and
	     * sets its meta data.
	     *
	     * @private
	     * @param {Array} bindData The bind data array.
	     * @returns {Function} Returns the new function.
	     */
	    function baseCreateWrapper(bindData) {
	      var func = bindData[0],
	          bitmask = bindData[1],
	          partialArgs = bindData[2],
	          partialRightArgs = bindData[3],
	          thisArg = bindData[4],
	          arity = bindData[5];
	
	      var isBind = bitmask & 1,
	          isBindKey = bitmask & 2,
	          isCurry = bitmask & 4,
	          isCurryBound = bitmask & 8,
	          key = func;
	
	      function bound() {
	        var thisBinding = isBind ? thisArg : this;
	        if (partialArgs) {
	          var args = slice(partialArgs);
	          push.apply(args, arguments);
	        }
	        if (partialRightArgs || isCurry) {
	          args || (args = slice(arguments));
	          if (partialRightArgs) {
	            push.apply(args, partialRightArgs);
	          }
	          if (isCurry && args.length < arity) {
	            bitmask |= 16 & ~32;
	            return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
	          }
	        }
	        args || (args = arguments);
	        if (isBindKey) {
	          func = thisBinding[key];
	        }
	        if (this instanceof bound) {
	          thisBinding = baseCreate(func.prototype);
	          var result = func.apply(thisBinding, args);
	          return isObject(result) ? result : thisBinding;
	        }
	        return func.apply(thisBinding, args);
	      }
	      setBindData(bound, bindData);
	      return bound;
	    }
	
	    /**
	     * The base implementation of `_.difference` that accepts a single array
	     * of values to exclude.
	     *
	     * @private
	     * @param {Array} array The array to process.
	     * @param {Array} [values] The array of values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     */
	    function baseDifference(array, values) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = array ? array.length : 0,
	          isLarge = length >= largeArraySize && indexOf === baseIndexOf,
	          result = [];
	
	      if (isLarge) {
	        var cache = createCache(values);
	        if (cache) {
	          indexOf = cacheIndexOf;
	          values = cache;
	        } else {
	          isLarge = false;
	        }
	      }
	      while (++index < length) {
	        var value = array[index];
	        if (indexOf(values, value) < 0) {
	          result.push(value);
	        }
	      }
	      if (isLarge) {
	        releaseObject(values);
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.flatten` without support for callback
	     * shorthands or `thisArg` binding.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
	     * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
	     * @param {number} [fromIndex=0] The index to start from.
	     * @returns {Array} Returns a new flattened array.
	     */
	    function baseFlatten(array, isShallow, isStrict, fromIndex) {
	      var index = (fromIndex || 0) - 1,
	          length = array ? array.length : 0,
	          result = [];
	
	      while (++index < length) {
	        var value = array[index];
	
	        if (value && typeof value == 'object' && typeof value.length == 'number'
	            && (isArray(value) || isArguments(value))) {
	          // recursively flatten arrays (susceptible to call stack limits)
	          if (!isShallow) {
	            value = baseFlatten(value, isShallow, isStrict);
	          }
	          var valIndex = -1,
	              valLength = value.length,
	              resIndex = result.length;
	
	          result.length += valLength;
	          while (++valIndex < valLength) {
	            result[resIndex++] = value[valIndex];
	          }
	        } else if (!isStrict) {
	          result.push(value);
	        }
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.isEqual`, without support for `thisArg` binding,
	     * that allows partial "_.where" style comparisons.
	     *
	     * @private
	     * @param {*} a The value to compare.
	     * @param {*} b The other value to compare.
	     * @param {Function} [callback] The function to customize comparing values.
	     * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
	     * @param {Array} [stackA=[]] Tracks traversed `a` objects.
	     * @param {Array} [stackB=[]] Tracks traversed `b` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */
	    function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
	      // used to indicate that when comparing objects, `a` has at least the properties of `b`
	      if (callback) {
	        var result = callback(a, b);
	        if (typeof result != 'undefined') {
	          return !!result;
	        }
	      }
	      // exit early for identical values
	      if (a === b) {
	        // treat `+0` vs. `-0` as not equal
	        return a !== 0 || (1 / a == 1 / b);
	      }
	      var type = typeof a,
	          otherType = typeof b;
	
	      // exit early for unlike primitive values
	      if (a === a &&
	          !(a && objectTypes[type]) &&
	          !(b && objectTypes[otherType])) {
	        return false;
	      }
	      // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
	      // http://es5.github.io/#x15.3.4.4
	      if (a == null || b == null) {
	        return a === b;
	      }
	      // compare [[Class]] names
	      var className = toString.call(a),
	          otherClass = toString.call(b);
	
	      if (className == argsClass) {
	        className = objectClass;
	      }
	      if (otherClass == argsClass) {
	        otherClass = objectClass;
	      }
	      if (className != otherClass) {
	        return false;
	      }
	      switch (className) {
	        case boolClass:
	        case dateClass:
	          // coerce dates and booleans to numbers, dates to milliseconds and booleans
	          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
	          return +a == +b;
	
	        case numberClass:
	          // treat `NaN` vs. `NaN` as equal
	          return (a != +a)
	            ? b != +b
	            // but treat `+0` vs. `-0` as not equal
	            : (a == 0 ? (1 / a == 1 / b) : a == +b);
	
	        case regexpClass:
	        case stringClass:
	          // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
	          // treat string primitives and their corresponding object instances as equal
	          return a == String(b);
	      }
	      var isArr = className == arrayClass;
	      if (!isArr) {
	        // unwrap any `lodash` wrapped values
	        var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
	            bWrapped = hasOwnProperty.call(b, '__wrapped__');
	
	        if (aWrapped || bWrapped) {
	          return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
	        }
	        // exit for functions and DOM nodes
	        if (className != objectClass || (!support.nodeClass && (isNode(a) || isNode(b)))) {
	          return false;
	        }
	        // in older versions of Opera, `arguments` objects have `Array` constructors
	        var ctorA = !support.argsObject && isArguments(a) ? Object : a.constructor,
	            ctorB = !support.argsObject && isArguments(b) ? Object : b.constructor;
	
	        // non `Object` object instances with different constructors are not equal
	        if (ctorA != ctorB &&
	              !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
	              ('constructor' in a && 'constructor' in b)
	            ) {
	          return false;
	        }
	      }
	      // assume cyclic structures are equal
	      // the algorithm for detecting cyclic structures is adapted from ES 5.1
	      // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
	      var initedStack = !stackA;
	      stackA || (stackA = getArray());
	      stackB || (stackB = getArray());
	
	      var length = stackA.length;
	      while (length--) {
	        if (stackA[length] == a) {
	          return stackB[length] == b;
	        }
	      }
	      var size = 0;
	      result = true;
	
	      // add `a` and `b` to the stack of traversed objects
	      stackA.push(a);
	      stackB.push(b);
	
	      // recursively compare objects and arrays (susceptible to call stack limits)
	      if (isArr) {
	        // compare lengths to determine if a deep comparison is necessary
	        length = a.length;
	        size = b.length;
	        result = size == length;
	
	        if (result || isWhere) {
	          // deep compare the contents, ignoring non-numeric properties
	          while (size--) {
	            var index = length,
	                value = b[size];
	
	            if (isWhere) {
	              while (index--) {
	                if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
	                  break;
	                }
	              }
	            } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
	              break;
	            }
	          }
	        }
	      }
	      else {
	        // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
	        // which, in this case, is more costly
	        forIn(b, function(value, key, b) {
	          if (hasOwnProperty.call(b, key)) {
	            // count the number of properties.
	            size++;
	            // deep compare each property value.
	            return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
	          }
	        });
	
	        if (result && !isWhere) {
	          // ensure both objects have the same number of properties
	          forIn(a, function(value, key, a) {
	            if (hasOwnProperty.call(a, key)) {
	              // `size` will be `-1` if `a` has more properties than `b`
	              return (result = --size > -1);
	            }
	          });
	        }
	      }
	      stackA.pop();
	      stackB.pop();
	
	      if (initedStack) {
	        releaseArray(stackA);
	        releaseArray(stackB);
	      }
	      return result;
	    }
	
	    /**
	     * The base implementation of `_.merge` without argument juggling or support
	     * for `thisArg` binding.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} [callback] The function to customize merging properties.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     */
	    function baseMerge(object, source, callback, stackA, stackB) {
	      (isArray(source) ? forEach : forOwn)(source, function(source, key) {
	        var found,
	            isArr,
	            result = source,
	            value = object[key];
	
	        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
	          // avoid merging previously merged cyclic sources
	          var stackLength = stackA.length;
	          while (stackLength--) {
	            if ((found = stackA[stackLength] == source)) {
	              value = stackB[stackLength];
	              break;
	            }
	          }
	          if (!found) {
	            var isShallow;
	            if (callback) {
	              result = callback(value, source);
	              if ((isShallow = typeof result != 'undefined')) {
	                value = result;
	              }
	            }
	            if (!isShallow) {
	              value = isArr
	                ? (isArray(value) ? value : [])
	                : (isPlainObject(value) ? value : {});
	            }
	            // add `source` and associated `value` to the stack of traversed objects
	            stackA.push(source);
	            stackB.push(value);
	
	            // recursively merge objects and arrays (susceptible to call stack limits)
	            if (!isShallow) {
	              baseMerge(value, source, callback, stackA, stackB);
	            }
	          }
	        }
	        else {
	          if (callback) {
	            result = callback(value, source);
	            if (typeof result == 'undefined') {
	              result = source;
	            }
	          }
	          if (typeof result != 'undefined') {
	            value = result;
	          }
	        }
	        object[key] = value;
	      });
	    }
	
	    /**
	     * The base implementation of `_.random` without argument juggling or support
	     * for returning floating-point numbers.
	     *
	     * @private
	     * @param {number} min The minimum possible value.
	     * @param {number} max The maximum possible value.
	     * @returns {number} Returns a random number.
	     */
	    function baseRandom(min, max) {
	      return min + floor(nativeRandom() * (max - min + 1));
	    }
	
	    /**
	     * The base implementation of `_.uniq` without support for callback shorthands
	     * or `thisArg` binding.
	     *
	     * @private
	     * @param {Array} array The array to process.
	     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
	     * @param {Function} [callback] The function called per iteration.
	     * @returns {Array} Returns a duplicate-value-free array.
	     */
	    function baseUniq(array, isSorted, callback) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = array ? array.length : 0,
	          result = [];
	
	      var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
	          seen = (callback || isLarge) ? getArray() : result;
	
	      if (isLarge) {
	        var cache = createCache(seen);
	        indexOf = cacheIndexOf;
	        seen = cache;
	      }
	      while (++index < length) {
	        var value = array[index],
	            computed = callback ? callback(value, index, array) : value;
	
	        if (isSorted
	              ? !index || seen[seen.length - 1] !== computed
	              : indexOf(seen, computed) < 0
	            ) {
	          if (callback || isLarge) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	      }
	      if (isLarge) {
	        releaseArray(seen.array);
	        releaseObject(seen);
	      } else if (callback) {
	        releaseArray(seen);
	      }
	      return result;
	    }
	
	    /**
	     * Creates a function that aggregates a collection, creating an object composed
	     * of keys generated from the results of running each element of the collection
	     * through a callback. The given `setter` function sets the keys and values
	     * of the composed object.
	     *
	     * @private
	     * @param {Function} setter The setter function.
	     * @returns {Function} Returns the new aggregator function.
	     */
	    function createAggregator(setter) {
	      return function(collection, callback, thisArg) {
	        var result = {};
	        callback = lodash.createCallback(callback, thisArg, 3);
	
	        if (isArray(collection)) {
	          var index = -1,
	              length = collection.length;
	
	          while (++index < length) {
	            var value = collection[index];
	            setter(result, value, callback(value, index, collection), collection);
	          }
	        } else {
	          baseEach(collection, function(value, key, collection) {
	            setter(result, value, callback(value, key, collection), collection);
	          });
	        }
	        return result;
	      };
	    }
	
	    /**
	     * Creates a function that, when called, either curries or invokes `func`
	     * with an optional `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of method flags to compose.
	     *  The bitmask may be composed of the following flags:
	     *  1 - `_.bind`
	     *  2 - `_.bindKey`
	     *  4 - `_.curry`
	     *  8 - `_.curry` (bound)
	     *  16 - `_.partial`
	     *  32 - `_.partialRight`
	     * @param {Array} [partialArgs] An array of arguments to prepend to those
	     *  provided to the new function.
	     * @param {Array} [partialRightArgs] An array of arguments to append to those
	     *  provided to the new function.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new function.
	     */
	    function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
	      var isBind = bitmask & 1,
	          isBindKey = bitmask & 2,
	          isCurry = bitmask & 4,
	          isCurryBound = bitmask & 8,
	          isPartial = bitmask & 16,
	          isPartialRight = bitmask & 32;
	
	      if (!isBindKey && !isFunction(func)) {
	        throw new TypeError;
	      }
	      if (isPartial && !partialArgs.length) {
	        bitmask &= ~16;
	        isPartial = partialArgs = false;
	      }
	      if (isPartialRight && !partialRightArgs.length) {
	        bitmask &= ~32;
	        isPartialRight = partialRightArgs = false;
	      }
	      var bindData = func && func.__bindData__;
	      if (bindData && bindData !== true) {
	        // clone `bindData`
	        bindData = slice(bindData);
	        if (bindData[2]) {
	          bindData[2] = slice(bindData[2]);
	        }
	        if (bindData[3]) {
	          bindData[3] = slice(bindData[3]);
	        }
	        // set `thisBinding` is not previously bound
	        if (isBind && !(bindData[1] & 1)) {
	          bindData[4] = thisArg;
	        }
	        // set if previously bound but not currently (subsequent curried functions)
	        if (!isBind && bindData[1] & 1) {
	          bitmask |= 8;
	        }
	        // set curried arity if not yet set
	        if (isCurry && !(bindData[1] & 4)) {
	          bindData[5] = arity;
	        }
	        // append partial left arguments
	        if (isPartial) {
	          push.apply(bindData[2] || (bindData[2] = []), partialArgs);
	        }
	        // append partial right arguments
	        if (isPartialRight) {
	          unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
	        }
	        // merge flags
	        bindData[1] |= bitmask;
	        return createWrapper.apply(null, bindData);
	      }
	      // fast path for `_.bind`
	      var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
	      return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
	    }
	
	    /**
	     * Creates compiled iteration functions.
	     *
	     * @private
	     * @param {...Object} [options] The compile options object(s).
	     * @param {string} [options.array] Code to determine if the iterable is an array or array-like.
	     * @param {boolean} [options.useHas] Specify using `hasOwnProperty` checks in the object loop.
	     * @param {Function} [options.keys] A reference to `_.keys` for use in own property iteration.
	     * @param {string} [options.args] A comma separated string of iteration function arguments.
	     * @param {string} [options.top] Code to execute before the iteration branches.
	     * @param {string} [options.loop] Code to execute in the object loop.
	     * @param {string} [options.bottom] Code to execute after the iteration branches.
	     * @returns {Function} Returns the compiled function.
	     */
	    function createIterator() {
	      // data properties
	      iteratorData.shadowedProps = shadowedProps;
	
	      // iterator options
	      iteratorData.array = iteratorData.bottom = iteratorData.loop = iteratorData.top = '';
	      iteratorData.init = 'iterable';
	      iteratorData.useHas = true;
	
	      // merge options into a template data object
	      for (var object, index = 0; object = arguments[index]; index++) {
	        for (var key in object) {
	          iteratorData[key] = object[key];
	        }
	      }
	      var args = iteratorData.args;
	      iteratorData.firstArg = /^[^,]+/.exec(args)[0];
	
	      // create the function factory
	      var factory = Function(
	          'baseCreateCallback, errorClass, errorProto, hasOwnProperty, ' +
	          'indicatorObject, isArguments, isArray, isString, keys, objectProto, ' +
	          'objectTypes, nonEnumProps, stringClass, stringProto, toString',
	        'return function(' + args + ') {\n' + iteratorTemplate(iteratorData) + '\n}'
	      );
	
	      // return the compiled function
	      return factory(
	        baseCreateCallback, errorClass, errorProto, hasOwnProperty,
	        indicatorObject, isArguments, isArray, isString, iteratorData.keys, objectProto,
	        objectTypes, nonEnumProps, stringClass, stringProto, toString
	      );
	    }
	
	    /**
	     * Used by `escape` to convert characters to HTML entities.
	     *
	     * @private
	     * @param {string} match The matched character to escape.
	     * @returns {string} Returns the escaped character.
	     */
	    function escapeHtmlChar(match) {
	      return htmlEscapes[match];
	    }
	
	    /**
	     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
	     * customized, this method returns the custom method, otherwise it returns
	     * the `baseIndexOf` function.
	     *
	     * @private
	     * @returns {Function} Returns the "indexOf" function.
	     */
	    function getIndexOf() {
	      var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
	      return result;
	    }
	
	    /**
	     * Checks if `value` is a native function.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
	     */
	    function isNative(value) {
	      return typeof value == 'function' && reNative.test(value);
	    }
	
	    /**
	     * Sets `this` binding data on a given function.
	     *
	     * @private
	     * @param {Function} func The function to set data on.
	     * @param {Array} value The data array to set.
	     */
	    var setBindData = !defineProperty ? noop : function(func, value) {
	      descriptor.value = value;
	      defineProperty(func, '__bindData__', descriptor);
	    };
	
	    /**
	     * A fallback implementation of `isPlainObject` which checks if a given value
	     * is an object created by the `Object` constructor, assuming objects created
	     * by the `Object` constructor have no inherited enumerable properties and that
	     * there are no `Object.prototype` extensions.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     */
	    function shimIsPlainObject(value) {
	      var ctor,
	          result;
	
	      // avoid non Object objects, `arguments` objects, and DOM elements
	      if (!(value && toString.call(value) == objectClass) ||
	          (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor)) ||
	          (!support.argsClass && isArguments(value)) ||
	          (!support.nodeClass && isNode(value))) {
	        return false;
	      }
	      // IE < 9 iterates inherited properties before own properties. If the first
	      // iterated property is an object's own property then there are no inherited
	      // enumerable properties.
	      if (support.ownLast) {
	        forIn(value, function(value, key, object) {
	          result = hasOwnProperty.call(object, key);
	          return false;
	        });
	        return result !== false;
	      }
	      // In most environments an object's own properties are iterated before
	      // its inherited properties. If the last iterated property is an object's
	      // own property then there are no inherited enumerable properties.
	      forIn(value, function(value, key) {
	        result = key;
	      });
	      return typeof result == 'undefined' || hasOwnProperty.call(value, result);
	    }
	
	    /**
	     * Used by `unescape` to convert HTML entities to characters.
	     *
	     * @private
	     * @param {string} match The matched character to unescape.
	     * @returns {string} Returns the unescaped character.
	     */
	    function unescapeHtmlChar(match) {
	      return htmlUnescapes[match];
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Checks if `value` is an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
	     * @example
	     *
	     * (function() { return _.isArguments(arguments); })(1, 2, 3);
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */
	    function isArguments(value) {
	      return value && typeof value == 'object' && typeof value.length == 'number' &&
	        toString.call(value) == argsClass || false;
	    }
	    // fallback for browsers that can't detect `arguments` objects by [[Class]]
	    if (!support.argsClass) {
	      isArguments = function(value) {
	        return value && typeof value == 'object' && typeof value.length == 'number' &&
	          hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee') || false;
	      };
	    }
	
	    /**
	     * Checks if `value` is an array.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
	     * @example
	     *
	     * (function() { return _.isArray(arguments); })();
	     * // => false
	     *
	     * _.isArray([1, 2, 3]);
	     * // => true
	     */
	    var isArray = nativeIsArray || function(value) {
	      return value && typeof value == 'object' && typeof value.length == 'number' &&
	        toString.call(value) == arrayClass || false;
	    };
	
	    /**
	     * A fallback implementation of `Object.keys` which produces an array of the
	     * given object's own enumerable property names.
	     *
	     * @private
	     * @type Function
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names.
	     */
	    var shimKeys = createIterator({
	      'args': 'object',
	      'init': '[]',
	      'top': 'if (!(objectTypes[typeof object])) return result',
	      'loop': 'result.push(index)'
	    });
	
	    /**
	     * Creates an array composed of the own enumerable property names of an object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names.
	     * @example
	     *
	     * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
	     */
	    var keys = !nativeKeys ? shimKeys : function(object) {
	      if (!isObject(object)) {
	        return [];
	      }
	      if ((support.enumPrototypes && typeof object == 'function') ||
	          (support.nonEnumArgs && object.length && isArguments(object))) {
	        return shimKeys(object);
	      }
	      return nativeKeys(object);
	    };
	
	    /** Reusable iterator options shared by `each`, `forIn`, and `forOwn` */
	    var eachIteratorOptions = {
	      'args': 'collection, callback, thisArg',
	      'top': "callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3)",
	      'array': "typeof length == 'number'",
	      'keys': keys,
	      'loop': 'if (callback(iterable[index], index, collection) === false) return result'
	    };
	
	    /** Reusable iterator options for `assign` and `defaults` */
	    var defaultsIteratorOptions = {
	      'args': 'object, source, guard',
	      'top':
	        'var args = arguments,\n' +
	        '    argsIndex = 0,\n' +
	        "    argsLength = typeof guard == 'number' ? 2 : args.length;\n" +
	        'while (++argsIndex < argsLength) {\n' +
	        '  iterable = args[argsIndex];\n' +
	        '  if (iterable && objectTypes[typeof iterable]) {',
	      'keys': keys,
	      'loop': "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
	      'bottom': '  }\n}'
	    };
	
	    /** Reusable iterator options for `forIn` and `forOwn` */
	    var forOwnIteratorOptions = {
	      'top': 'if (!objectTypes[typeof iterable]) return result;\n' + eachIteratorOptions.top,
	      'array': false
	    };
	
	    /**
	     * Used to convert characters to HTML entities:
	     *
	     * Though the `>` character is escaped for symmetry, characters like `>` and `/`
	     * don't require escaping in HTML and have no special meaning unless they're part
	     * of a tag or an unquoted attribute value.
	     * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
	     */
	    var htmlEscapes = {
	      '&': '&amp;',
	      '<': '&lt;',
	      '>': '&gt;',
	      '"': '&quot;',
	      "'": '&#39;'
	    };
	
	    /** Used to convert HTML entities to characters */
	    var htmlUnescapes = invert(htmlEscapes);
	
	    /** Used to match HTML entities and HTML characters */
	    var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),
	        reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');
	
	    /**
	     * A function compiled to iterate `arguments` objects, arrays, objects, and
	     * strings consistenly across environments, executing the callback for each
	     * element in the collection. The callback is bound to `thisArg` and invoked
	     * with three arguments; (value, index|key, collection). Callbacks may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @private
	     * @type Function
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array|Object|string} Returns `collection`.
	     */
	    var baseEach = createIterator(eachIteratorOptions);
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object. Subsequent sources will overwrite property assignments of previous
	     * sources. If a callback is provided it will be executed to produce the
	     * assigned values. The callback is bound to `thisArg` and invoked with two
	     * arguments; (objectValue, sourceValue).
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @alias extend
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param {Function} [callback] The function to customize assigning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
	     * // => { 'name': 'fred', 'employer': 'slate' }
	     *
	     * var defaults = _.partialRight(_.assign, function(a, b) {
	     *   return typeof a == 'undefined' ? b : a;
	     * });
	     *
	     * var object = { 'name': 'barney' };
	     * defaults(object, { 'name': 'fred', 'employer': 'slate' });
	     * // => { 'name': 'barney', 'employer': 'slate' }
	     */
	    var assign = createIterator(defaultsIteratorOptions, {
	      'top':
	        defaultsIteratorOptions.top.replace(';',
	          ';\n' +
	          "if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n" +
	          '  var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);\n' +
	          "} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n" +
	          '  callback = args[--argsLength];\n' +
	          '}'
	        ),
	      'loop': 'result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]'
	    });
	
	    /**
	     * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
	     * be cloned, otherwise they will be assigned by reference. If a callback
	     * is provided it will be executed to produce the cloned values. If the
	     * callback returns `undefined` cloning will be handled by the method instead.
	     * The callback is bound to `thisArg` and invoked with one argument; (value).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep=false] Specify a deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the cloned value.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * var shallow = _.clone(characters);
	     * shallow[0] === characters[0];
	     * // => true
	     *
	     * var deep = _.clone(characters, true);
	     * deep[0] === characters[0];
	     * // => false
	     *
	     * _.mixin({
	     *   'clone': _.partialRight(_.clone, function(value) {
	     *     return _.isElement(value) ? value.cloneNode(false) : undefined;
	     *   })
	     * });
	     *
	     * var clone = _.clone(document.body);
	     * clone.childNodes.length;
	     * // => 0
	     */
	    function clone(value, isDeep, callback, thisArg) {
	      // allows working with "Collections" methods without using their `index`
	      // and `collection` arguments for `isDeep` and `callback`
	      if (typeof isDeep != 'boolean' && isDeep != null) {
	        thisArg = callback;
	        callback = isDeep;
	        isDeep = false;
	      }
	      return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
	    }
	
	    /**
	     * Creates a deep clone of `value`. If a callback is provided it will be
	     * executed to produce the cloned values. If the callback returns `undefined`
	     * cloning will be handled by the method instead. The callback is bound to
	     * `thisArg` and invoked with one argument; (value).
	     *
	     * Note: This method is loosely based on the structured clone algorithm. Functions
	     * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
	     * objects created by constructors other than `Object` are cloned to plain `Object` objects.
	     * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to deep clone.
	     * @param {Function} [callback] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the deep cloned value.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * var deep = _.cloneDeep(characters);
	     * deep[0] === characters[0];
	     * // => false
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'node': element
	     * };
	     *
	     * var clone = _.cloneDeep(view, function(value) {
	     *   return _.isElement(value) ? value.cloneNode(true) : undefined;
	     * });
	     *
	     * clone.node == view.node;
	     * // => false
	     */
	    function cloneDeep(value, callback, thisArg) {
	      return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
	    }
	
	    /**
	     * Creates an object that inherits from the given `prototype` object. If a
	     * `properties` object is provided its own enumerable properties are assigned
	     * to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */
	    function create(prototype, properties) {
	      var result = baseCreate(prototype);
	      return properties ? assign(result, properties) : result;
	    }
	
	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object for all destination properties that resolve to `undefined`. Once a
	     * property is set, additional defaults of the same property will be ignored.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param- {Object} [guard] Allows working with `_.reduce` without using its
	     *  `key` and `object` arguments as sources.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * var object = { 'name': 'barney' };
	     * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
	     * // => { 'name': 'barney', 'employer': 'slate' }
	     */
	    var defaults = createIterator(defaultsIteratorOptions);
	
	    /**
	     * This method is like `_.findIndex` except that it returns the key of the
	     * first element that passes the callback check, instead of the element itself.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [callback=identity] The function called per
	     *  iteration. If a property name or object is provided it will be used to
	     *  create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
	     * @example
	     *
	     * var characters = {
	     *   'barney': {  'age': 36, 'blocked': false },
	     *   'fred': {    'age': 40, 'blocked': true },
	     *   'pebbles': { 'age': 1,  'blocked': false }
	     * };
	     *
	     * _.findKey(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => 'barney' (property order is not guaranteed across environments)
	     *
	     * // using "_.where" callback shorthand
	     * _.findKey(characters, { 'age': 1 });
	     * // => 'pebbles'
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findKey(characters, 'blocked');
	     * // => 'fred'
	     */
	    function findKey(object, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forOwn(object, function(value, key, object) {
	        if (callback(value, key, object)) {
	          result = key;
	          return false;
	        }
	      });
	      return result;
	    }
	
	    /**
	     * This method is like `_.findKey` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [callback=identity] The function called per
	     *  iteration. If a property name or object is provided it will be used to
	     *  create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {string|undefined} Returns the key of the found element, else `undefined`.
	     * @example
	     *
	     * var characters = {
	     *   'barney': {  'age': 36, 'blocked': true },
	     *   'fred': {    'age': 40, 'blocked': false },
	     *   'pebbles': { 'age': 1,  'blocked': true }
	     * };
	     *
	     * _.findLastKey(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => returns `pebbles`, assuming `_.findKey` returns `barney`
	     *
	     * // using "_.where" callback shorthand
	     * _.findLastKey(characters, { 'age': 40 });
	     * // => 'fred'
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findLastKey(characters, 'blocked');
	     * // => 'pebbles'
	     */
	    function findLastKey(object, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forOwnRight(object, function(value, key, object) {
	        if (callback(value, key, object)) {
	          result = key;
	          return false;
	        }
	      });
	      return result;
	    }
	
	    /**
	     * Iterates over own and inherited enumerable properties of an object,
	     * executing the callback for each property. The callback is bound to `thisArg`
	     * and invoked with three arguments; (value, key, object). Callbacks may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.move = function(x, y) {
	     *   this.x += x;
	     *   this.y += y;
	     * };
	     *
	     * _.forIn(new Shape, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
	     */
	    var forIn = createIterator(eachIteratorOptions, forOwnIteratorOptions, {
	      'useHas': false
	    });
	
	    /**
	     * This method is like `_.forIn` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * Shape.prototype.move = function(x, y) {
	     *   this.x += x;
	     *   this.y += y;
	     * };
	     *
	     * _.forInRight(new Shape, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'move', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'move'
	     */
	    function forInRight(object, callback, thisArg) {
	      var pairs = [];
	
	      forIn(object, function(value, key) {
	        pairs.push(key, value);
	      });
	
	      var length = pairs.length;
	      callback = baseCreateCallback(callback, thisArg, 3);
	      while (length--) {
	        if (callback(pairs[length--], pairs[length], object) === false) {
	          break;
	        }
	      }
	      return object;
	    }
	
	    /**
	     * Iterates over own enumerable properties of an object, executing the callback
	     * for each property. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, key, object). Callbacks may exit iteration early by
	     * explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	     *   console.log(key);
	     * });
	     * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
	     */
	    var forOwn = createIterator(eachIteratorOptions, forOwnIteratorOptions);
	
	    /**
	     * This method is like `_.forOwn` except that it iterates over elements
	     * of a `collection` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
	     */
	    function forOwnRight(object, callback, thisArg) {
	      var props = keys(object),
	          length = props.length;
	
	      callback = baseCreateCallback(callback, thisArg, 3);
	      while (length--) {
	        var key = props[length];
	        if (callback(object[key], key, object) === false) {
	          break;
	        }
	      }
	      return object;
	    }
	
	    /**
	     * Creates a sorted array of property names of all enumerable properties,
	     * own and inherited, of `object` that have function values.
	     *
	     * @static
	     * @memberOf _
	     * @alias methods
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property names that have function values.
	     * @example
	     *
	     * _.functions(_);
	     * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
	     */
	    function functions(object) {
	      var result = [];
	      forIn(object, function(value, key) {
	        if (isFunction(value)) {
	          result.push(key);
	        }
	      });
	      return result.sort();
	    }
	
	    /**
	     * Checks if the specified property name exists as a direct property of `object`,
	     * instead of an inherited property.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @param {string} key The name of the property to check.
	     * @returns {boolean} Returns `true` if key is a direct property, else `false`.
	     * @example
	     *
	     * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
	     * // => true
	     */
	    function has(object, key) {
	      return object ? hasOwnProperty.call(object, key) : false;
	    }
	
	    /**
	     * Creates an object composed of the inverted keys and values of the given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to invert.
	     * @returns {Object} Returns the created inverted object.
	     * @example
	     *
	     * _.invert({ 'first': 'fred', 'second': 'barney' });
	     * // => { 'fred': 'first', 'barney': 'second' }
	     */
	    function invert(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = {};
	
	      while (++index < length) {
	        var key = props[index];
	        result[object[key]] = key;
	      }
	      return result;
	    }
	
	    /**
	     * Checks if `value` is a boolean value.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
	     * @example
	     *
	     * _.isBoolean(null);
	     * // => false
	     */
	    function isBoolean(value) {
	      return value === true || value === false ||
	        value && typeof value == 'object' && toString.call(value) == boolClass || false;
	    }
	
	    /**
	     * Checks if `value` is a date.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
	     * @example
	     *
	     * _.isDate(new Date);
	     * // => true
	     */
	    function isDate(value) {
	      return value && typeof value == 'object' && toString.call(value) == dateClass || false;
	    }
	
	    /**
	     * Checks if `value` is a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     */
	    function isElement(value) {
	      return value && value.nodeType === 1 || false;
	    }
	
	    /**
	     * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
	     * length of `0` and objects with no own enumerable properties are considered
	     * "empty".
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Array|Object|string} value The value to inspect.
	     * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({});
	     * // => true
	     *
	     * _.isEmpty('');
	     * // => true
	     */
	    function isEmpty(value) {
	      var result = true;
	      if (!value) {
	        return result;
	      }
	      var className = toString.call(value),
	          length = value.length;
	
	      if ((className == arrayClass || className == stringClass ||
	          (support.argsClass ? className == argsClass : isArguments(value))) ||
	          (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
	        return !length;
	      }
	      forOwn(value, function() {
	        return (result = false);
	      });
	      return result;
	    }
	
	    /**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent to each other. If a callback is provided it will be executed
	     * to compare values. If the callback returns `undefined` comparisons will
	     * be handled by the method instead. The callback is bound to `thisArg` and
	     * invoked with two arguments; (a, b).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} a The value to compare.
	     * @param {*} b The other value to compare.
	     * @param {Function} [callback] The function to customize comparing values.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * var copy = { 'name': 'fred' };
	     *
	     * object == copy;
	     * // => false
	     *
	     * _.isEqual(object, copy);
	     * // => true
	     *
	     * var words = ['hello', 'goodbye'];
	     * var otherWords = ['hi', 'goodbye'];
	     *
	     * _.isEqual(words, otherWords, function(a, b) {
	     *   var reGreet = /^(?:hello|hi)$/i,
	     *       aGreet = _.isString(a) && reGreet.test(a),
	     *       bGreet = _.isString(b) && reGreet.test(b);
	     *
	     *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
	     * });
	     * // => true
	     */
	    function isEqual(a, b, callback, thisArg) {
	      return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
	    }
	
	    /**
	     * Checks if `value` is, or can be coerced to, a finite number.
	     *
	     * Note: This is not the same as native `isFinite` which will return true for
	     * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
	     * @example
	     *
	     * _.isFinite(-101);
	     * // => true
	     *
	     * _.isFinite('10');
	     * // => true
	     *
	     * _.isFinite(true);
	     * // => false
	     *
	     * _.isFinite('');
	     * // => false
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     */
	    function isFinite(value) {
	      return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
	    }
	
	    /**
	     * Checks if `value` is a function.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     */
	    function isFunction(value) {
	      return typeof value == 'function';
	    }
	    // fallback for older versions of Chrome and Safari
	    if (isFunction(/x/)) {
	      isFunction = function(value) {
	        return typeof value == 'function' && toString.call(value) == funcClass;
	      };
	    }
	
	    /**
	     * Checks if `value` is the language type of Object.
	     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(1);
	     * // => false
	     */
	    function isObject(value) {
	      // check if the value is the ECMAScript language type of Object
	      // http://es5.github.io/#x8
	      // and avoid a V8 bug
	      // http://code.google.com/p/v8/issues/detail?id=2291
	      return !!(value && objectTypes[typeof value]);
	    }
	
	    /**
	     * Checks if `value` is `NaN`.
	     *
	     * Note: This is not the same as native `isNaN` which will return `true` for
	     * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */
	    function isNaN(value) {
	      // `NaN` as a primitive is the only value that is not equal to itself
	      // (perform the [[Class]] check first to avoid errors with some host objects in IE)
	      return isNumber(value) && value != +value;
	    }
	
	    /**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(undefined);
	     * // => false
	     */
	    function isNull(value) {
	      return value === null;
	    }
	
	    /**
	     * Checks if `value` is a number.
	     *
	     * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
	     * @example
	     *
	     * _.isNumber(8.4 * 5);
	     * // => true
	     */
	    function isNumber(value) {
	      return typeof value == 'number' ||
	        value && typeof value == 'object' && toString.call(value) == numberClass || false;
	    }
	
	    /**
	     * Checks if `value` is an object created by the `Object` constructor.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * _.isPlainObject(new Shape);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     */
	    var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
	      if (!(value && toString.call(value) == objectClass) || (!support.argsClass && isArguments(value))) {
	        return false;
	      }
	      var valueOf = value.valueOf,
	          objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);
	
	      return objProto
	        ? (value == objProto || getPrototypeOf(value) == objProto)
	        : shimIsPlainObject(value);
	    };
	
	    /**
	     * Checks if `value` is a regular expression.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
	     * @example
	     *
	     * _.isRegExp(/fred/);
	     * // => true
	     */
	    function isRegExp(value) {
	      return value && objectTypes[typeof value] && toString.call(value) == regexpClass || false;
	    }
	
	    /**
	     * Checks if `value` is a string.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
	     * @example
	     *
	     * _.isString('fred');
	     * // => true
	     */
	    function isString(value) {
	      return typeof value == 'string' ||
	        value && typeof value == 'object' && toString.call(value) == stringClass || false;
	    }
	
	    /**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     */
	    function isUndefined(value) {
	      return typeof value == 'undefined';
	    }
	
	    /**
	     * Creates an object with the same keys as `object` and values generated by
	     * running each own enumerable property of `object` through the callback.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new object with values of the results of each `callback` execution.
	     * @example
	     *
	     * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; });
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     *
	     * var characters = {
	     *   'fred': { 'name': 'fred', 'age': 40 },
	     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.mapValues(characters, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 }
	     */
	    function mapValues(object, callback, thisArg) {
	      var result = {};
	      callback = lodash.createCallback(callback, thisArg, 3);
	
	      forOwn(object, function(value, key, object) {
	        result[key] = callback(value, key, object);
	      });
	      return result;
	    }
	
	    /**
	     * Recursively merges own enumerable properties of the source object(s), that
	     * don't resolve to `undefined` into the destination object. Subsequent sources
	     * will overwrite property assignments of previous sources. If a callback is
	     * provided it will be executed to produce the merged values of the destination
	     * and source properties. If the callback returns `undefined` merging will
	     * be handled by the method instead. The callback is bound to `thisArg` and
	     * invoked with two arguments; (objectValue, sourceValue).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The destination object.
	     * @param {...Object} [source] The source objects.
	     * @param {Function} [callback] The function to customize merging properties.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the destination object.
	     * @example
	     *
	     * var names = {
	     *   'characters': [
	     *     { 'name': 'barney' },
	     *     { 'name': 'fred' }
	     *   ]
	     * };
	     *
	     * var ages = {
	     *   'characters': [
	     *     { 'age': 36 },
	     *     { 'age': 40 }
	     *   ]
	     * };
	     *
	     * _.merge(names, ages);
	     * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
	     *
	     * var food = {
	     *   'fruits': ['apple'],
	     *   'vegetables': ['beet']
	     * };
	     *
	     * var otherFood = {
	     *   'fruits': ['banana'],
	     *   'vegetables': ['carrot']
	     * };
	     *
	     * _.merge(food, otherFood, function(a, b) {
	     *   return _.isArray(a) ? a.concat(b) : undefined;
	     * });
	     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
	     */
	    function merge(object) {
	      var args = arguments,
	          length = 2;
	
	      if (!isObject(object)) {
	        return object;
	      }
	      // allows working with `_.reduce` and `_.reduceRight` without using
	      // their `index` and `collection` arguments
	      if (typeof args[2] != 'number') {
	        length = args.length;
	      }
	      if (length > 3 && typeof args[length - 2] == 'function') {
	        var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
	      } else if (length > 2 && typeof args[length - 1] == 'function') {
	        callback = args[--length];
	      }
	      var sources = slice(arguments, 1, length),
	          index = -1,
	          stackA = getArray(),
	          stackB = getArray();
	
	      while (++index < length) {
	        baseMerge(object, sources[index], callback, stackA, stackB);
	      }
	      releaseArray(stackA);
	      releaseArray(stackB);
	      return object;
	    }
	
	    /**
	     * Creates a shallow clone of `object` excluding the specified properties.
	     * Property names may be specified as individual arguments or as arrays of
	     * property names. If a callback is provided it will be executed for each
	     * property of `object` omitting the properties the callback returns truey
	     * for. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The source object.
	     * @param {Function|...string|string[]} [callback] The properties to omit or the
	     *  function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns an object without the omitted properties.
	     * @example
	     *
	     * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
	     * // => { 'name': 'fred' }
	     *
	     * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
	     *   return typeof value == 'number';
	     * });
	     * // => { 'name': 'fred' }
	     */
	    function omit(object, callback, thisArg) {
	      var result = {};
	      if (typeof callback != 'function') {
	        var props = [];
	        forIn(object, function(value, key) {
	          props.push(key);
	        });
	        props = baseDifference(props, baseFlatten(arguments, true, false, 1));
	
	        var index = -1,
	            length = props.length;
	
	        while (++index < length) {
	          var key = props[index];
	          result[key] = object[key];
	        }
	      } else {
	        callback = lodash.createCallback(callback, thisArg, 3);
	        forIn(object, function(value, key, object) {
	          if (!callback(value, key, object)) {
	            result[key] = value;
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Creates a two dimensional array of an object's key-value pairs,
	     * i.e. `[[key1, value1], [key2, value2]]`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns new array of key-value pairs.
	     * @example
	     *
	     * _.pairs({ 'barney': 36, 'fred': 40 });
	     * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
	     */
	    function pairs(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = Array(length);
	
	      while (++index < length) {
	        var key = props[index];
	        result[index] = [key, object[key]];
	      }
	      return result;
	    }
	
	    /**
	     * Creates a shallow clone of `object` composed of the specified properties.
	     * Property names may be specified as individual arguments or as arrays of
	     * property names. If a callback is provided it will be executed for each
	     * property of `object` picking the properties the callback returns truey
	     * for. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The source object.
	     * @param {Function|...string|string[]} [callback] The function called per
	     *  iteration or property names to pick, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns an object composed of the picked properties.
	     * @example
	     *
	     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
	     * // => { 'name': 'fred' }
	     *
	     * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
	     *   return key.charAt(0) != '_';
	     * });
	     * // => { 'name': 'fred' }
	     */
	    function pick(object, callback, thisArg) {
	      var result = {};
	      if (typeof callback != 'function') {
	        var index = -1,
	            props = baseFlatten(arguments, true, false, 1),
	            length = isObject(object) ? props.length : 0;
	
	        while (++index < length) {
	          var key = props[index];
	          if (key in object) {
	            result[key] = object[key];
	          }
	        }
	      } else {
	        callback = lodash.createCallback(callback, thisArg, 3);
	        forIn(object, function(value, key, object) {
	          if (callback(value, key, object)) {
	            result[key] = value;
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * An alternative to `_.reduce` this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own
	     * enumerable properties through a callback, with each callback execution
	     * potentially mutating the `accumulator` object. The callback is bound to
	     * `thisArg` and invoked with four arguments; (accumulator, value, key, object).
	     * Callbacks may exit iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Array|Object} object The object to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
	     *   num *= num;
	     *   if (num % 2) {
	     *     return result.push(num) < 3;
	     *   }
	     * });
	     * // => [1, 9, 25]
	     *
	     * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
	     *   result[key] = num * 3;
	     * });
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     */
	    function transform(object, callback, accumulator, thisArg) {
	      var isArr = isArray(object);
	      if (accumulator == null) {
	        if (isArr) {
	          accumulator = [];
	        } else {
	          var ctor = object && object.constructor,
	              proto = ctor && ctor.prototype;
	
	          accumulator = baseCreate(proto);
	        }
	      }
	      if (callback) {
	        callback = lodash.createCallback(callback, thisArg, 4);
	        (isArr ? baseEach : forOwn)(object, function(value, index, object) {
	          return callback(accumulator, value, index, object);
	        });
	      }
	      return accumulator;
	    }
	
	    /**
	     * Creates an array composed of the own enumerable property values of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Objects
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns an array of property values.
	     * @example
	     *
	     * _.values({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => [1, 2, 3] (property order is not guaranteed across environments)
	     */
	    function values(object) {
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = Array(length);
	
	      while (++index < length) {
	        result[index] = object[props[index]];
	      }
	      return result;
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates an array of elements from the specified indexes, or keys, of the
	     * `collection`. Indexes may be specified as individual arguments or as arrays
	     * of indexes.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
	     *   to retrieve, specified as individual indexes or arrays of indexes.
	     * @returns {Array} Returns a new array of elements corresponding to the
	     *  provided indexes.
	     * @example
	     *
	     * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
	     * // => ['a', 'c', 'e']
	     *
	     * _.at(['fred', 'barney', 'pebbles'], 0, 2);
	     * // => ['fred', 'pebbles']
	     */
	    function at(collection) {
	      var args = arguments,
	          index = -1,
	          props = baseFlatten(args, true, false, 1),
	          length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
	          result = Array(length);
	
	      if (support.unindexedChars && isString(collection)) {
	        collection = collection.split('');
	      }
	      while(++index < length) {
	        result[index] = collection[props[index]];
	      }
	      return result;
	    }
	
	    /**
	     * Checks if a given value is present in a collection using strict equality
	     * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
	     * offset from the end of the collection.
	     *
	     * @static
	     * @memberOf _
	     * @alias include
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {*} target The value to check for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
	     * @example
	     *
	     * _.contains([1, 2, 3], 1);
	     * // => true
	     *
	     * _.contains([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
	     * // => true
	     *
	     * _.contains('pebbles', 'eb');
	     * // => true
	     */
	    function contains(collection, target, fromIndex) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = collection ? collection.length : 0,
	          result = false;
	
	      fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
	      if (isArray(collection)) {
	        result = indexOf(collection, target, fromIndex) > -1;
	      } else if (typeof length == 'number') {
	        result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
	      } else {
	        baseEach(collection, function(value) {
	          if (++index >= fromIndex) {
	            return !(result = value === target);
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through the callback. The corresponding value
	     * of each key is the number of times the key was returned by the callback.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy(['one', 'two', 'three'], 'length');
	     * // => { '3': 2, '5': 1 }
	     */
	    var countBy = createAggregator(function(result, value, key) {
	      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
	    });
	
	    /**
	     * Checks if the given callback returns truey value for **all** elements of
	     * a collection. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias all
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if all elements passed the callback check,
	     *  else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes']);
	     * // => false
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.every(characters, 'age');
	     * // => true
	     *
	     * // using "_.where" callback shorthand
	     * _.every(characters, { 'age': 36 });
	     * // => false
	     */
	    function every(collection, callback, thisArg) {
	      var result = true;
	      callback = lodash.createCallback(callback, thisArg, 3);
	
	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          if (!(result = !!callback(collection[index], index, collection))) {
	            break;
	          }
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          return (result = !!callback(value, index, collection));
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Iterates over elements of a collection, returning an array of all elements
	     * the callback returns truey for. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias select
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of elements that passed the callback check.
	     * @example
	     *
	     * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	     * // => [2, 4, 6]
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.filter(characters, 'blocked');
	     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
	     *
	     * // using "_.where" callback shorthand
	     * _.filter(characters, { 'age': 36 });
	     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
	     */
	    function filter(collection, callback, thisArg) {
	      var result = [];
	      callback = lodash.createCallback(callback, thisArg, 3);
	
	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          var value = collection[index];
	          if (callback(value, index, collection)) {
	            result.push(value);
	          }
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          if (callback(value, index, collection)) {
	            result.push(value);
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Iterates over elements of a collection, returning the first element that
	     * the callback returns truey for. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias detect, findWhere
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the found element, else `undefined`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': false },
	     *   { 'name': 'fred',    'age': 40, 'blocked': true },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
	     * ];
	     *
	     * _.find(characters, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => { 'name': 'barney', 'age': 36, 'blocked': false }
	     *
	     * // using "_.where" callback shorthand
	     * _.find(characters, { 'age': 1 });
	     * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }
	     *
	     * // using "_.pluck" callback shorthand
	     * _.find(characters, 'blocked');
	     * // => { 'name': 'fred', 'age': 40, 'blocked': true }
	     */
	    function find(collection, callback, thisArg) {
	      callback = lodash.createCallback(callback, thisArg, 3);
	
	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          var value = collection[index];
	          if (callback(value, index, collection)) {
	            return value;
	          }
	        }
	      } else {
	        var result;
	        baseEach(collection, function(value, index, collection) {
	          if (callback(value, index, collection)) {
	            result = value;
	            return false;
	          }
	        });
	        return result;
	      }
	    }
	
	    /**
	     * This method is like `_.find` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the found element, else `undefined`.
	     * @example
	     *
	     * _.findLast([1, 2, 3, 4], function(num) {
	     *   return num % 2 == 1;
	     * });
	     * // => 3
	     */
	    function findLast(collection, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      forEachRight(collection, function(value, index, collection) {
	        if (callback(value, index, collection)) {
	          result = value;
	          return false;
	        }
	      });
	      return result;
	    }
	
	    /**
	     * Iterates over elements of a collection, executing the callback for each
	     * element. The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection). Callbacks may exit iteration early by
	     * explicitly returning `false`.
	     *
	     * Note: As with other "Collections" methods, objects with a `length` property
	     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	     * may be used for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @alias each
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
	     * // => logs each number and returns '1,2,3'
	     *
	     * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
	     * // => logs each number and returns the object (property order is not guaranteed across environments)
	     */
	    function forEach(collection, callback, thisArg) {
	      if (callback && typeof thisArg == 'undefined' && isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          if (callback(collection[index], index, collection) === false) {
	            break;
	          }
	        }
	      } else {
	        baseEach(collection, callback, thisArg);
	      }
	      return collection;
	    }
	
	    /**
	     * This method is like `_.forEach` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias eachRight
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
	     * // => logs each number from right to left and returns '3,2,1'
	     */
	    function forEachRight(collection, callback, thisArg) {
	      var iterable = collection,
	          length = collection ? collection.length : 0;
	
	      callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
	      if (isArray(collection)) {
	        while (length--) {
	          if (callback(collection[length], length, collection) === false) {
	            break;
	          }
	        }
	      } else {
	        if (typeof length != 'number') {
	          var props = keys(collection);
	          length = props.length;
	        } else if (support.unindexedChars && isString(collection)) {
	          iterable = collection.split('');
	        }
	        baseEach(collection, function(value, key, collection) {
	          key = props ? props[--length] : --length;
	          return callback(iterable[key], key, collection);
	        });
	      }
	      return collection;
	    }
	
	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of a collection through the callback. The corresponding value
	     * of each key is an array of the elements responsible for generating the key.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * // using "_.pluck" callback shorthand
	     * _.groupBy(['one', 'two', 'three'], 'length');
	     * // => { '3': ['one', 'two'], '5': ['three'] }
	     */
	    var groupBy = createAggregator(function(result, value, key) {
	      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
	    });
	
	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of the collection through the given callback. The corresponding
	     * value of each key is the last element responsible for generating the key.
	     * The callback is bound to `thisArg` and invoked with three arguments;
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * var keys = [
	     *   { 'dir': 'left', 'code': 97 },
	     *   { 'dir': 'right', 'code': 100 }
	     * ];
	     *
	     * _.indexBy(keys, 'dir');
	     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(characters, function(key) { this.fromCharCode(key.code); }, String);
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     */
	    var indexBy = createAggregator(function(result, value, key) {
	      result[key] = value;
	    });
	
	    /**
	     * Invokes the method named by `methodName` on each element in the `collection`
	     * returning an array of the results of each invoked method. Additional arguments
	     * will be provided to each invoked method. If `methodName` is a function it
	     * will be invoked for, and `this` bound to, each element in the `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|string} methodName The name of the method to invoke or
	     *  the function invoked per iteration.
	     * @param {...*} [arg] Arguments to invoke the method with.
	     * @returns {Array} Returns a new array of the results of each invoked method.
	     * @example
	     *
	     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	     * // => [[1, 5, 7], [1, 2, 3]]
	     *
	     * _.invoke([123, 456], String.prototype.split, '');
	     * // => [['1', '2', '3'], ['4', '5', '6']]
	     */
	    function invoke(collection, methodName) {
	      var args = slice(arguments, 2),
	          index = -1,
	          isFunc = typeof methodName == 'function',
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);
	
	      forEach(collection, function(value) {
	        result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
	      });
	      return result;
	    }
	
	    /**
	     * Creates an array of values by running each element in the collection
	     * through the callback. The callback is bound to `thisArg` and invoked with
	     * three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias collect
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of the results of each `callback` execution.
	     * @example
	     *
	     * _.map([1, 2, 3], function(num) { return num * 3; });
	     * // => [3, 6, 9]
	     *
	     * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
	     * // => [3, 6, 9] (property order is not guaranteed across environments)
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.map(characters, 'name');
	     * // => ['barney', 'fred']
	     */
	    function map(collection, callback, thisArg) {
	      var index = -1,
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);
	
	      callback = lodash.createCallback(callback, thisArg, 3);
	      if (isArray(collection)) {
	        while (++index < length) {
	          result[index] = callback(collection[index], index, collection);
	        }
	      } else {
	        baseEach(collection, function(value, key, collection) {
	          result[++index] = callback(value, key, collection);
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Retrieves the maximum value of a collection. If the collection is empty or
	     * falsey `-Infinity` is returned. If a callback is provided it will be executed
	     * for each value in the collection to generate the criterion by which the value
	     * is ranked. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.max(characters, function(chr) { return chr.age; });
	     * // => { 'name': 'fred', 'age': 40 };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.max(characters, 'age');
	     * // => { 'name': 'fred', 'age': 40 };
	     */
	    function max(collection, callback, thisArg) {
	      var computed = -Infinity,
	          result = computed;
	
	      // allows working with functions like `_.map` without using
	      // their `index` argument as a callback
	      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
	        callback = null;
	      }
	      if (callback == null && isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          var value = collection[index];
	          if (value > result) {
	            result = value;
	          }
	        }
	      } else {
	        callback = (callback == null && isString(collection))
	          ? charAtCallback
	          : lodash.createCallback(callback, thisArg, 3);
	
	        baseEach(collection, function(value, index, collection) {
	          var current = callback(value, index, collection);
	          if (current > computed) {
	            computed = current;
	            result = value;
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Retrieves the minimum value of a collection. If the collection is empty or
	     * falsey `Infinity` is returned. If a callback is provided it will be executed
	     * for each value in the collection to generate the criterion by which the value
	     * is ranked. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.min(characters, function(chr) { return chr.age; });
	     * // => { 'name': 'barney', 'age': 36 };
	     *
	     * // using "_.pluck" callback shorthand
	     * _.min(characters, 'age');
	     * // => { 'name': 'barney', 'age': 36 };
	     */
	    function min(collection, callback, thisArg) {
	      var computed = Infinity,
	          result = computed;
	
	      // allows working with functions like `_.map` without using
	      // their `index` argument as a callback
	      if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
	        callback = null;
	      }
	      if (callback == null && isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          var value = collection[index];
	          if (value < result) {
	            result = value;
	          }
	        }
	      } else {
	        callback = (callback == null && isString(collection))
	          ? charAtCallback
	          : lodash.createCallback(callback, thisArg, 3);
	
	        baseEach(collection, function(value, index, collection) {
	          var current = callback(value, index, collection);
	          if (current < computed) {
	            computed = current;
	            result = value;
	          }
	        });
	      }
	      return result;
	    }
	
	    /**
	     * Retrieves the value of a specified property from all elements in the collection.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {string} property The name of the property to pluck.
	     * @returns {Array} Returns a new array of property values.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.pluck(characters, 'name');
	     * // => ['barney', 'fred']
	     */
	    var pluck = map;
	
	    /**
	     * Reduces a collection to a value which is the accumulated result of running
	     * each element in the collection through the callback, where each successive
	     * callback execution consumes the return value of the previous execution. If
	     * `accumulator` is not provided the first element of the collection will be
	     * used as the initial `accumulator` value. The callback is bound to `thisArg`
	     * and invoked with four arguments; (accumulator, value, index|key, collection).
	     *
	     * @static
	     * @memberOf _
	     * @alias foldl, inject
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] Initial value of the accumulator.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var sum = _.reduce([1, 2, 3], function(sum, num) {
	     *   return sum + num;
	     * });
	     * // => 6
	     *
	     * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
	     *   result[key] = num * 3;
	     *   return result;
	     * }, {});
	     * // => { 'a': 3, 'b': 6, 'c': 9 }
	     */
	    function reduce(collection, callback, accumulator, thisArg) {
	      var noaccum = arguments.length < 3;
	      callback = lodash.createCallback(callback, thisArg, 4);
	
	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        if (noaccum) {
	          accumulator = collection[++index];
	        }
	        while (++index < length) {
	          accumulator = callback(accumulator, collection[index], index, collection);
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          accumulator = noaccum
	            ? (noaccum = false, value)
	            : callback(accumulator, value, index, collection)
	        });
	      }
	      return accumulator;
	    }
	
	    /**
	     * This method is like `_.reduce` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias foldr
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [callback=identity] The function called per iteration.
	     * @param {*} [accumulator] Initial value of the accumulator.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var list = [[0, 1], [2, 3], [4, 5]];
	     * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */
	    function reduceRight(collection, callback, accumulator, thisArg) {
	      var noaccum = arguments.length < 3;
	      callback = lodash.createCallback(callback, thisArg, 4);
	      forEachRight(collection, function(value, index, collection) {
	        accumulator = noaccum
	          ? (noaccum = false, value)
	          : callback(accumulator, value, index, collection);
	      });
	      return accumulator;
	    }
	
	    /**
	     * The opposite of `_.filter` this method returns the elements of a
	     * collection that the callback does **not** return truey for.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of elements that failed the callback check.
	     * @example
	     *
	     * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	     * // => [1, 3, 5]
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.reject(characters, 'blocked');
	     * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
	     *
	     * // using "_.where" callback shorthand
	     * _.reject(characters, { 'age': 36 });
	     * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
	     */
	    function reject(collection, callback, thisArg) {
	      callback = lodash.createCallback(callback, thisArg, 3);
	      return filter(collection, function(value, index, collection) {
	        return !callback(value, index, collection);
	      });
	    }
	
	    /**
	     * Retrieves a random element or `n` random elements from a collection.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to sample.
	     * @param {number} [n] The number of elements to sample.
	     * @param- {Object} [guard] Allows working with functions like `_.map`
	     *  without using their `index` arguments as `n`.
	     * @returns {Array} Returns the random sample(s) of `collection`.
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     *
	     * _.sample([1, 2, 3, 4], 2);
	     * // => [3, 1]
	     */
	    function sample(collection, n, guard) {
	      if (collection && typeof collection.length != 'number') {
	        collection = values(collection);
	      } else if (support.unindexedChars && isString(collection)) {
	        collection = collection.split('');
	      }
	      if (n == null || guard) {
	        return collection ? collection[baseRandom(0, collection.length - 1)] : undefined;
	      }
	      var result = shuffle(collection);
	      result.length = nativeMin(nativeMax(0, n), result.length);
	      return result;
	    }
	
	    /**
	     * Creates an array of shuffled values, using a version of the Fisher-Yates
	     * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to shuffle.
	     * @returns {Array} Returns a new shuffled collection.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4, 5, 6]);
	     * // => [4, 1, 6, 3, 5, 2]
	     */
	    function shuffle(collection) {
	      var index = -1,
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);
	
	      forEach(collection, function(value) {
	        var rand = baseRandom(0, ++index);
	        result[index] = result[rand];
	        result[rand] = value;
	      });
	      return result;
	    }
	
	    /**
	     * Gets the size of the `collection` by returning `collection.length` for arrays
	     * and array-like objects or the number of own enumerable properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @returns {number} Returns `collection.length` or number of own enumerable properties.
	     * @example
	     *
	     * _.size([1, 2]);
	     * // => 2
	     *
	     * _.size({ 'one': 1, 'two': 2, 'three': 3 });
	     * // => 3
	     *
	     * _.size('pebbles');
	     * // => 7
	     */
	    function size(collection) {
	      var length = collection ? collection.length : 0;
	      return typeof length == 'number' ? length : keys(collection).length;
	    }
	
	    /**
	     * Checks if the callback returns a truey value for **any** element of a
	     * collection. The function returns as soon as it finds a passing value and
	     * does not iterate over the entire collection. The callback is bound to
	     * `thisArg` and invoked with three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias any
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {boolean} Returns `true` if any element passed the callback check,
	     *  else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'blocked': false },
	     *   { 'name': 'fred',   'age': 40, 'blocked': true }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.some(characters, 'blocked');
	     * // => true
	     *
	     * // using "_.where" callback shorthand
	     * _.some(characters, { 'age': 1 });
	     * // => false
	     */
	    function some(collection, callback, thisArg) {
	      var result;
	      callback = lodash.createCallback(callback, thisArg, 3);
	
	      if (isArray(collection)) {
	        var index = -1,
	            length = collection.length;
	
	        while (++index < length) {
	          if ((result = callback(collection[index], index, collection))) {
	            break;
	          }
	        }
	      } else {
	        baseEach(collection, function(value, index, collection) {
	          return !(result = callback(value, index, collection));
	        });
	      }
	      return !!result;
	    }
	
	    /**
	     * Creates an array of elements, sorted in ascending order by the results of
	     * running each element in a collection through the callback. This method
	     * performs a stable sort, that is, it will preserve the original sort order
	     * of equal elements. The callback is bound to `thisArg` and invoked with
	     * three arguments; (value, index|key, collection).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an array of property names is provided for `callback` the collection
	     * will be sorted by each property value.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of sorted elements.
	     * @example
	     *
	     * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
	     * // => [3, 1, 2]
	     *
	     * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
	     * // => [3, 1, 2]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36 },
	     *   { 'name': 'fred',    'age': 40 },
	     *   { 'name': 'barney',  'age': 26 },
	     *   { 'name': 'fred',    'age': 30 }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.map(_.sortBy(characters, 'age'), _.values);
	     * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
	     *
	     * // sorting by multiple properties
	     * _.map(_.sortBy(characters, ['name', 'age']), _.values);
	     * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
	     */
	    function sortBy(collection, callback, thisArg) {
	      var index = -1,
	          isArr = isArray(callback),
	          length = collection ? collection.length : 0,
	          result = Array(typeof length == 'number' ? length : 0);
	
	      if (!isArr) {
	        callback = lodash.createCallback(callback, thisArg, 3);
	      }
	      forEach(collection, function(value, key, collection) {
	        var object = result[++index] = getObject();
	        if (isArr) {
	          object.criteria = map(callback, function(key) { return value[key]; });
	        } else {
	          (object.criteria = getArray())[0] = callback(value, key, collection);
	        }
	        object.index = index;
	        object.value = value;
	      });
	
	      length = result.length;
	      result.sort(compareAscending);
	      while (length--) {
	        var object = result[length];
	        result[length] = object.value;
	        if (!isArr) {
	          releaseArray(object.criteria);
	        }
	        releaseObject(object);
	      }
	      return result;
	    }
	
	    /**
	     * Converts the `collection` to an array.
	     *
	     * @static
	     * @memberOf _
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to convert.
	     * @returns {Array} Returns the new converted array.
	     * @example
	     *
	     * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
	     * // => [2, 3, 4]
	     */
	    function toArray(collection) {
	      if (collection && typeof collection.length == 'number') {
	        return (support.unindexedChars && isString(collection))
	          ? collection.split('')
	          : slice(collection);
	      }
	      return values(collection);
	    }
	
	    /**
	     * Performs a deep comparison of each element in a `collection` to the given
	     * `properties` object, returning an array of all elements that have equivalent
	     * property values.
	     *
	     * @static
	     * @memberOf _
	     * @type Function
	     * @category Collections
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Object} props The object of property values to filter by.
	     * @returns {Array} Returns a new array of elements that have the given properties.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
	     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * _.where(characters, { 'age': 36 });
	     * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]
	     *
	     * _.where(characters, { 'pets': ['dino'] });
	     * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]
	     */
	    var where = filter;
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are all falsey.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */
	    function compact(array) {
	      var index = -1,
	          length = array ? array.length : 0,
	          result = [];
	
	      while (++index < length) {
	        var value = array[index];
	        if (value) {
	          result.push(value);
	        }
	      }
	      return result;
	    }
	
	    /**
	     * Creates an array excluding all values of the provided arrays using strict
	     * equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to process.
	     * @param {...Array} [values] The arrays of values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
	     * // => [1, 3, 4]
	     */
	    function difference(array) {
	      return baseDifference(array, baseFlatten(arguments, true, true, 1));
	    }
	
	    /**
	     * This method is like `_.find` except that it returns the index of the first
	     * element that passes the callback check, instead of the element itself.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': false },
	     *   { 'name': 'fred',    'age': 40, 'blocked': true },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
	     * ];
	     *
	     * _.findIndex(characters, function(chr) {
	     *   return chr.age < 20;
	     * });
	     * // => 2
	     *
	     * // using "_.where" callback shorthand
	     * _.findIndex(characters, { 'age': 36 });
	     * // => 0
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findIndex(characters, 'blocked');
	     * // => 1
	     */
	    function findIndex(array, callback, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0;
	
	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (++index < length) {
	        if (callback(array[index], index, array)) {
	          return index;
	        }
	      }
	      return -1;
	    }
	
	    /**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of a `collection` from right to left.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36, 'blocked': true },
	     *   { 'name': 'fred',    'age': 40, 'blocked': false },
	     *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
	     * ];
	     *
	     * _.findLastIndex(characters, function(chr) {
	     *   return chr.age > 30;
	     * });
	     * // => 1
	     *
	     * // using "_.where" callback shorthand
	     * _.findLastIndex(characters, { 'age': 36 });
	     * // => 0
	     *
	     * // using "_.pluck" callback shorthand
	     * _.findLastIndex(characters, 'blocked');
	     * // => 2
	     */
	    function findLastIndex(array, callback, thisArg) {
	      var length = array ? array.length : 0;
	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (length--) {
	        if (callback(array[length], length, array)) {
	          return length;
	        }
	      }
	      return -1;
	    }
	
	    /**
	     * Gets the first element or first `n` elements of an array. If a callback
	     * is provided elements at the beginning of the array are returned as long
	     * as the callback returns truey. The callback is bound to `thisArg` and
	     * invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias head, take
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback] The function called
	     *  per element or the number of elements to return. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the first element(s) of `array`.
	     * @example
	     *
	     * _.first([1, 2, 3]);
	     * // => 1
	     *
	     * _.first([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.first([1, 2, 3], function(num) {
	     *   return num < 3;
	     * });
	     * // => [1, 2]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.first(characters, 'blocked');
	     * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
	     * // => ['barney', 'fred']
	     */
	    function first(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;
	
	      if (typeof callback != 'number' && callback != null) {
	        var index = -1;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (++index < length && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array ? array[0] : undefined;
	        }
	      }
	      return slice(array, 0, nativeMin(nativeMax(0, n), length));
	    }
	
	    /**
	     * Flattens a nested array (the nesting can be to any depth). If `isShallow`
	     * is truey, the array will only be flattened a single level. If a callback
	     * is provided each element of the array is passed through the callback before
	     * flattening. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2], [3, [[4]]]]);
	     * // => [1, 2, 3, 4];
	     *
	     * _.flatten([1, [2], [3, [[4]]]], true);
	     * // => [1, 2, 3, [[4]]];
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
	     *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.flatten(characters, 'pets');
	     * // => ['hoppy', 'baby puss', 'dino']
	     */
	    function flatten(array, isShallow, callback, thisArg) {
	      // juggle arguments
	      if (typeof isShallow != 'boolean' && isShallow != null) {
	        thisArg = callback;
	        callback = (typeof isShallow != 'function' && thisArg && thisArg[isShallow] === array) ? null : isShallow;
	        isShallow = false;
	      }
	      if (callback != null) {
	        array = map(array, callback, thisArg);
	      }
	      return baseFlatten(array, isShallow);
	    }
	
	    /**
	     * Gets the index at which the first occurrence of `value` is found using
	     * strict equality for comparisons, i.e. `===`. If the array is already sorted
	     * providing `true` for `fromIndex` will run a faster binary search.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
	     *  to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value or `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 3, 1, 2, 3], 2);
	     * // => 1
	     *
	     * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
	     * // => 4
	     *
	     * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
	     * // => 2
	     */
	    function indexOf(array, value, fromIndex) {
	      if (typeof fromIndex == 'number') {
	        var length = array ? array.length : 0;
	        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
	      } else if (fromIndex) {
	        var index = sortedIndex(array, value);
	        return array[index] === value ? index : -1;
	      }
	      return baseIndexOf(array, value, fromIndex);
	    }
	
	    /**
	     * Gets all but the last element or last `n` elements of an array. If a
	     * callback is provided elements at the end of the array are excluded from
	     * the result as long as the callback returns truey. The callback is bound
	     * to `thisArg` and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback=1] The function called
	     *  per element or the number of elements to exclude. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     *
	     * _.initial([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.initial([1, 2, 3], function(num) {
	     *   return num > 1;
	     * });
	     * // => [1]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.initial(characters, 'blocked');
	     * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]
	     *
	     * // using "_.where" callback shorthand
	     * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');
	     * // => ['barney', 'fred']
	     */
	    function initial(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;
	
	      if (typeof callback != 'number' && callback != null) {
	        var index = length;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (index-- && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = (callback == null || thisArg) ? 1 : callback || n;
	      }
	      return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
	    }
	
	    /**
	     * Creates an array of unique values present in all provided arrays using
	     * strict equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of shared values.
	     * @example
	     *
	     * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
	     * // => [1, 2]
	     */
	    function intersection() {
	      var args = [],
	          argsIndex = -1,
	          argsLength = arguments.length,
	          caches = getArray(),
	          indexOf = getIndexOf(),
	          trustIndexOf = indexOf === baseIndexOf,
	          seen = getArray();
	
	      while (++argsIndex < argsLength) {
	        var value = arguments[argsIndex];
	        if (isArray(value) || isArguments(value)) {
	          args.push(value);
	          caches.push(trustIndexOf && value.length >= largeArraySize &&
	            createCache(argsIndex ? args[argsIndex] : seen));
	        }
	      }
	      var array = args[0],
	          index = -1,
	          length = array ? array.length : 0,
	          result = [];
	
	      outer:
	      while (++index < length) {
	        var cache = caches[0];
	        value = array[index];
	
	        if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
	          argsIndex = argsLength;
	          (cache || seen).push(value);
	          while (--argsIndex) {
	            cache = caches[argsIndex];
	            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
	              continue outer;
	            }
	          }
	          result.push(value);
	        }
	      }
	      while (argsLength--) {
	        cache = caches[argsLength];
	        if (cache) {
	          releaseObject(cache);
	        }
	      }
	      releaseArray(caches);
	      releaseArray(seen);
	      return result;
	    }
	
	    /**
	     * Gets the last element or last `n` elements of an array. If a callback is
	     * provided elements at the end of the array are returned as long as the
	     * callback returns truey. The callback is bound to `thisArg` and invoked
	     * with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback] The function called
	     *  per element or the number of elements to return. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {*} Returns the last element(s) of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     *
	     * _.last([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.last([1, 2, 3], function(num) {
	     *   return num > 1;
	     * });
	     * // => [2, 3]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.last(characters, 'blocked'), 'name');
	     * // => ['fred', 'pebbles']
	     *
	     * // using "_.where" callback shorthand
	     * _.last(characters, { 'employer': 'na' });
	     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
	     */
	    function last(array, callback, thisArg) {
	      var n = 0,
	          length = array ? array.length : 0;
	
	      if (typeof callback != 'number' && callback != null) {
	        var index = length;
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (index-- && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array ? array[length - 1] : undefined;
	        }
	      }
	      return slice(array, nativeMax(0, length - n));
	    }
	
	    /**
	     * Gets the index at which the last occurrence of `value` is found using strict
	     * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
	     * as the offset from the end of the collection.
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {number} [fromIndex=array.length-1] The index to search from.
	     * @returns {number} Returns the index of the matched value or `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
	     * // => 4
	     *
	     * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
	     * // => 1
	     */
	    function lastIndexOf(array, value, fromIndex) {
	      var index = array ? array.length : 0;
	      if (typeof fromIndex == 'number') {
	        index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
	      }
	      while (index--) {
	        if (array[index] === value) {
	          return index;
	        }
	      }
	      return -1;
	    }
	
	    /**
	     * Removes all provided values from the given array using strict equality for
	     * comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to modify.
	     * @param {...*} [value] The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3, 1, 2, 3];
	     * _.pull(array, 2, 3);
	     * console.log(array);
	     * // => [1, 1]
	     */
	    function pull(array) {
	      var args = arguments,
	          argsIndex = 0,
	          argsLength = args.length,
	          length = array ? array.length : 0;
	
	      while (++argsIndex < argsLength) {
	        var index = -1,
	            value = args[argsIndex];
	        while (++index < length) {
	          if (array[index] === value) {
	            splice.call(array, index--, 1);
	            length--;
	          }
	        }
	      }
	      return array;
	    }
	
	    /**
	     * Creates an array of numbers (positive and/or negative) progressing from
	     * `start` up to but not including `end`. If `start` is less than `stop` a
	     * zero-length range is created unless a negative `step` is specified.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} [step=1] The value to increment or decrement by.
	     * @returns {Array} Returns a new range array.
	     * @example
	     *
	     * _.range(4);
	     * // => [0, 1, 2, 3]
	     *
	     * _.range(1, 5);
	     * // => [1, 2, 3, 4]
	     *
	     * _.range(0, 20, 5);
	     * // => [0, 5, 10, 15]
	     *
	     * _.range(0, -4, -1);
	     * // => [0, -1, -2, -3]
	     *
	     * _.range(1, 4, 0);
	     * // => [1, 1, 1]
	     *
	     * _.range(0);
	     * // => []
	     */
	    function range(start, end, step) {
	      start = +start || 0;
	      step = typeof step == 'number' ? step : (+step || 1);
	
	      if (end == null) {
	        end = start;
	        start = 0;
	      }
	      // use `Array(length)` so engines like Chakra and V8 avoid slower modes
	      // http://youtu.be/XAqIpGU8ZZk#t=17m25s
	      var index = -1,
	          length = nativeMax(0, ceil((end - start) / (step || 1))),
	          result = Array(length);
	
	      while (++index < length) {
	        result[index] = start;
	        start += step;
	      }
	      return result;
	    }
	
	    /**
	     * Removes all elements from an array that the callback returns truey for
	     * and returns an array of removed elements. The callback is bound to `thisArg`
	     * and invoked with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to modify.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4, 5, 6];
	     * var evens = _.remove(array, function(num) { return num % 2 == 0; });
	     *
	     * console.log(array);
	     * // => [1, 3, 5]
	     *
	     * console.log(evens);
	     * // => [2, 4, 6]
	     */
	    function remove(array, callback, thisArg) {
	      var index = -1,
	          length = array ? array.length : 0,
	          result = [];
	
	      callback = lodash.createCallback(callback, thisArg, 3);
	      while (++index < length) {
	        var value = array[index];
	        if (callback(value, index, array)) {
	          result.push(value);
	          splice.call(array, index--, 1);
	          length--;
	        }
	      }
	      return result;
	    }
	
	    /**
	     * The opposite of `_.initial` this method gets all but the first element or
	     * first `n` elements of an array. If a callback function is provided elements
	     * at the beginning of the array are excluded from the result as long as the
	     * callback returns truey. The callback is bound to `thisArg` and invoked
	     * with three arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias drop, tail
	     * @category Arrays
	     * @param {Array} array The array to query.
	     * @param {Function|Object|number|string} [callback=1] The function called
	     *  per element or the number of elements to exclude. If a property name or
	     *  object is provided it will be used to create a "_.pluck" or "_.where"
	     *  style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a slice of `array`.
	     * @example
	     *
	     * _.rest([1, 2, 3]);
	     * // => [2, 3]
	     *
	     * _.rest([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.rest([1, 2, 3], function(num) {
	     *   return num < 3;
	     * });
	     * // => [3]
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
	     *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
	     *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
	     * ];
	     *
	     * // using "_.pluck" callback shorthand
	     * _.pluck(_.rest(characters, 'blocked'), 'name');
	     * // => ['fred', 'pebbles']
	     *
	     * // using "_.where" callback shorthand
	     * _.rest(characters, { 'employer': 'slate' });
	     * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
	     */
	    function rest(array, callback, thisArg) {
	      if (typeof callback != 'number' && callback != null) {
	        var n = 0,
	            index = -1,
	            length = array ? array.length : 0;
	
	        callback = lodash.createCallback(callback, thisArg, 3);
	        while (++index < length && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
	      }
	      return slice(array, n);
	    }
	
	    /**
	     * Uses a binary search to determine the smallest index at which a value
	     * should be inserted into a given sorted array in order to maintain the sort
	     * order of the array. If a callback is provided it will be executed for
	     * `value` and each element of `array` to compute their sort ranking. The
	     * callback is bound to `thisArg` and invoked with one argument; (value).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedIndex([20, 30, 50], 40);
	     * // => 2
	     *
	     * // using "_.pluck" callback shorthand
	     * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
	     * // => 2
	     *
	     * var dict = {
	     *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
	     * };
	     *
	     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	     *   return dict.wordToNumber[word];
	     * });
	     * // => 2
	     *
	     * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	     *   return this.wordToNumber[word];
	     * }, dict);
	     * // => 2
	     */
	    function sortedIndex(array, value, callback, thisArg) {
	      var low = 0,
	          high = array ? array.length : low;
	
	      // explicitly reference `identity` for better inlining in Firefox
	      callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
	      value = callback(value);
	
	      while (low < high) {
	        var mid = (low + high) >>> 1;
	        (callback(array[mid]) < value)
	          ? low = mid + 1
	          : high = mid;
	      }
	      return low;
	    }
	
	    /**
	     * Creates an array of unique values, in order, of the provided arrays using
	     * strict equality for comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of combined values.
	     * @example
	     *
	     * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
	     * // => [1, 2, 3, 5, 4]
	     */
	    function union() {
	      return baseUniq(baseFlatten(arguments, true, true));
	    }
	
	    /**
	     * Creates a duplicate-value-free version of an array using strict equality
	     * for comparisons, i.e. `===`. If the array is sorted, providing
	     * `true` for `isSorted` will use a faster algorithm. If a callback is provided
	     * each element of `array` is passed through the callback before uniqueness
	     * is computed. The callback is bound to `thisArg` and invoked with three
	     * arguments; (value, index, array).
	     *
	     * If a property name is provided for `callback` the created "_.pluck" style
	     * callback will return the property value of the given element.
	     *
	     * If an object is provided for `callback` the created "_.where" style callback
	     * will return `true` for elements that have the properties of the given object,
	     * else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias unique
	     * @category Arrays
	     * @param {Array} array The array to process.
	     * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
	     * @param {Function|Object|string} [callback=identity] The function called
	     *  per iteration. If a property name or object is provided it will be used
	     *  to create a "_.pluck" or "_.where" style callback, respectively.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns a duplicate-value-free array.
	     * @example
	     *
	     * _.uniq([1, 2, 1, 3, 1]);
	     * // => [1, 2, 3]
	     *
	     * _.uniq([1, 1, 2, 2, 3], true);
	     * // => [1, 2, 3]
	     *
	     * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
	     * // => ['A', 'b', 'C']
	     *
	     * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
	     * // => [1, 2.5, 3]
	     *
	     * // using "_.pluck" callback shorthand
	     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */
	    function uniq(array, isSorted, callback, thisArg) {
	      // juggle arguments
	      if (typeof isSorted != 'boolean' && isSorted != null) {
	        thisArg = callback;
	        callback = (typeof isSorted != 'function' && thisArg && thisArg[isSorted] === array) ? null : isSorted;
	        isSorted = false;
	      }
	      if (callback != null) {
	        callback = lodash.createCallback(callback, thisArg, 3);
	      }
	      return baseUniq(array, isSorted, callback);
	    }
	
	    /**
	     * Creates an array excluding all provided values using strict equality for
	     * comparisons, i.e. `===`.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {Array} array The array to filter.
	     * @param {...*} [value] The values to exclude.
	     * @returns {Array} Returns a new array of filtered values.
	     * @example
	     *
	     * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
	     * // => [2, 3, 4]
	     */
	    function without(array) {
	      return baseDifference(array, slice(arguments, 1));
	    }
	
	    /**
	     * Creates an array that is the symmetric difference of the provided arrays.
	     * See http://en.wikipedia.org/wiki/Symmetric_difference.
	     *
	     * @static
	     * @memberOf _
	     * @category Arrays
	     * @param {...Array} [array] The arrays to inspect.
	     * @returns {Array} Returns an array of values.
	     * @example
	     *
	     * _.xor([1, 2, 3], [5, 2, 1, 4]);
	     * // => [3, 5, 4]
	     *
	     * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
	     * // => [1, 4, 5]
	     */
	    function xor() {
	      var index = -1,
	          length = arguments.length;
	
	      while (++index < length) {
	        var array = arguments[index];
	        if (isArray(array) || isArguments(array)) {
	          var result = result
	            ? baseUniq(baseDifference(result, array).concat(baseDifference(array, result)))
	            : array;
	        }
	      }
	      return result || [];
	    }
	
	    /**
	     * Creates an array of grouped elements, the first of which contains the first
	     * elements of the given arrays, the second of which contains the second
	     * elements of the given arrays, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @alias unzip
	     * @category Arrays
	     * @param {...Array} [array] Arrays to process.
	     * @returns {Array} Returns a new array of grouped elements.
	     * @example
	     *
	     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     */
	    function zip() {
	      var array = arguments.length > 1 ? arguments : arguments[0],
	          index = -1,
	          length = array ? max(pluck(array, 'length')) : 0,
	          result = Array(length < 0 ? 0 : length);
	
	      while (++index < length) {
	        result[index] = pluck(array, index);
	      }
	      return result;
	    }
	
	    /**
	     * Creates an object composed from arrays of `keys` and `values`. Provide
	     * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
	     * or two arrays, one of `keys` and one of corresponding `values`.
	     *
	     * @static
	     * @memberOf _
	     * @alias object
	     * @category Arrays
	     * @param {Array} keys The array of keys.
	     * @param {Array} [values=[]] The array of values.
	     * @returns {Object} Returns an object composed of the given keys and
	     *  corresponding values.
	     * @example
	     *
	     * _.zipObject(['fred', 'barney'], [30, 40]);
	     * // => { 'fred': 30, 'barney': 40 }
	     */
	    function zipObject(keys, values) {
	      var index = -1,
	          length = keys ? keys.length : 0,
	          result = {};
	
	      if (!values && length && !isArray(keys[0])) {
	        values = [];
	      }
	      while (++index < length) {
	        var key = keys[index];
	        if (values) {
	          result[key] = values[index];
	        } else if (key) {
	          result[key[0]] = key[1];
	        }
	      }
	      return result;
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates a function that executes `func`, with  the `this` binding and
	     * arguments of the created function, only after being called `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {number} n The number of times the function must be called before
	     *  `func` is executed.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('Done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => logs 'Done saving!', after all saves have completed
	     */
	    function after(n, func) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      return function() {
	        if (--n < 1) {
	          return func.apply(this, arguments);
	        }
	      };
	    }
	
	    /**
	     * Creates a function that, when called, invokes `func` with the `this`
	     * binding of `thisArg` and prepends any additional `bind` arguments to those
	     * provided to the bound function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to bind.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var func = function(greeting) {
	     *   return greeting + ' ' + this.name;
	     * };
	     *
	     * func = _.bind(func, { 'name': 'fred' }, 'hi');
	     * func();
	     * // => 'hi fred'
	     */
	    function bind(func, thisArg) {
	      return arguments.length > 2
	        ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
	        : createWrapper(func, 1, null, null, thisArg);
	    }
	
	    /**
	     * Binds methods of an object to the object itself, overwriting the existing
	     * method. Method names may be specified as individual arguments or as arrays
	     * of method names. If no method names are provided all the function properties
	     * of `object` will be bound.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Object} object The object to bind and assign the bound methods to.
	     * @param {...string} [methodName] The object method names to
	     *  bind, specified as individual method names or arrays of method names.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'onClick': function() { console.log('clicked ' + this.label); }
	     * };
	     *
	     * _.bindAll(view);
	     * jQuery('#docs').on('click', view.onClick);
	     * // => logs 'clicked docs', when the button is clicked
	     */
	    function bindAll(object) {
	      var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
	          index = -1,
	          length = funcs.length;
	
	      while (++index < length) {
	        var key = funcs[index];
	        object[key] = createWrapper(object[key], 1, null, null, object);
	      }
	      return object;
	    }
	
	    /**
	     * Creates a function that, when called, invokes the method at `object[key]`
	     * and prepends any additional `bindKey` arguments to those provided to the bound
	     * function. This method differs from `_.bind` by allowing bound functions to
	     * reference methods that will be redefined or don't yet exist.
	     * See http://michaux.ca/articles/lazy-function-definition-pattern.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Object} object The object the method belongs to.
	     * @param {string} key The key of the method.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var object = {
	     *   'name': 'fred',
	     *   'greet': function(greeting) {
	     *     return greeting + ' ' + this.name;
	     *   }
	     * };
	     *
	     * var func = _.bindKey(object, 'greet', 'hi');
	     * func();
	     * // => 'hi fred'
	     *
	     * object.greet = function(greeting) {
	     *   return greeting + 'ya ' + this.name + '!';
	     * };
	     *
	     * func();
	     * // => 'hiya fred!'
	     */
	    function bindKey(object, key) {
	      return arguments.length > 2
	        ? createWrapper(key, 19, slice(arguments, 2), null, object)
	        : createWrapper(key, 3, null, null, object);
	    }
	
	    /**
	     * Creates a function that is the composition of the provided functions,
	     * where each function consumes the return value of the function that follows.
	     * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
	     * Each function is executed with the `this` binding of the composed function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {...Function} [func] Functions to compose.
	     * @returns {Function} Returns the new composed function.
	     * @example
	     *
	     * var realNameMap = {
	     *   'pebbles': 'penelope'
	     * };
	     *
	     * var format = function(name) {
	     *   name = realNameMap[name.toLowerCase()] || name;
	     *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
	     * };
	     *
	     * var greet = function(formatted) {
	     *   return 'Hiya ' + formatted + '!';
	     * };
	     *
	     * var welcome = _.compose(greet, format);
	     * welcome('pebbles');
	     * // => 'Hiya Penelope!'
	     */
	    function compose() {
	      var funcs = arguments,
	          length = funcs.length;
	
	      while (length--) {
	        if (!isFunction(funcs[length])) {
	          throw new TypeError;
	        }
	      }
	      return function() {
	        var args = arguments,
	            length = funcs.length;
	
	        while (length--) {
	          args = [funcs[length].apply(this, args)];
	        }
	        return args[0];
	      };
	    }
	
	    /**
	     * Creates a function which accepts one or more arguments of `func` that when
	     * invoked either executes `func` returning its result, if all `func` arguments
	     * have been provided, or returns a function that accepts one or more of the
	     * remaining `func` arguments, and so on. The arity of `func` can be specified
	     * if `func.length` is not sufficient.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var curried = _.curry(function(a, b, c) {
	     *   console.log(a + b + c);
	     * });
	     *
	     * curried(1)(2)(3);
	     * // => 6
	     *
	     * curried(1, 2)(3);
	     * // => 6
	     *
	     * curried(1, 2, 3);
	     * // => 6
	     */
	    function curry(func, arity) {
	      arity = typeof arity == 'number' ? arity : (+arity || func.length);
	      return createWrapper(func, 4, null, null, null, arity);
	    }
	
	    /**
	     * Creates a function that will delay the execution of `func` until after
	     * `wait` milliseconds have elapsed since the last time it was invoked.
	     * Provide an options object to indicate that `func` should be invoked on
	     * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
	     * to the debounced function will return the result of the last `func` call.
	     *
	     * Note: If `leading` and `trailing` options are `true` `func` will be called
	     * on the trailing edge of the timeout only if the the debounced function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to debounce.
	     * @param {number} wait The number of milliseconds to delay.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
	     * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
	     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // avoid costly calculations while the window size is in flux
	     * var lazyLayout = _.debounce(calculateLayout, 150);
	     * jQuery(window).on('resize', lazyLayout);
	     *
	     * // execute `sendMail` when the click event is fired, debouncing subsequent calls
	     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * });
	     *
	     * // ensure `batchLog` is executed once after 1 second of debounced calls
	     * var source = new EventSource('/stream');
	     * source.addEventListener('message', _.debounce(batchLog, 250, {
	     *   'maxWait': 1000
	     * }, false);
	     */
	    function debounce(func, wait, options) {
	      var args,
	          maxTimeoutId,
	          result,
	          stamp,
	          thisArg,
	          timeoutId,
	          trailingCall,
	          lastCalled = 0,
	          maxWait = false,
	          trailing = true;
	
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      wait = nativeMax(0, wait) || 0;
	      if (options === true) {
	        var leading = true;
	        trailing = false;
	      } else if (isObject(options)) {
	        leading = options.leading;
	        maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
	        trailing = 'trailing' in options ? options.trailing : trailing;
	      }
	      var delayed = function() {
	        var remaining = wait - (now() - stamp);
	        if (remaining <= 0) {
	          if (maxTimeoutId) {
	            clearTimeout(maxTimeoutId);
	          }
	          var isCalled = trailingCall;
	          maxTimeoutId = timeoutId = trailingCall = undefined;
	          if (isCalled) {
	            lastCalled = now();
	            result = func.apply(thisArg, args);
	            if (!timeoutId && !maxTimeoutId) {
	              args = thisArg = null;
	            }
	          }
	        } else {
	          timeoutId = setTimeout(delayed, remaining);
	        }
	      };
	
	      var maxDelayed = function() {
	        if (timeoutId) {
	          clearTimeout(timeoutId);
	        }
	        maxTimeoutId = timeoutId = trailingCall = undefined;
	        if (trailing || (maxWait !== wait)) {
	          lastCalled = now();
	          result = func.apply(thisArg, args);
	          if (!timeoutId && !maxTimeoutId) {
	            args = thisArg = null;
	          }
	        }
	      };
	
	      return function() {
	        args = arguments;
	        stamp = now();
	        thisArg = this;
	        trailingCall = trailing && (timeoutId || !leading);
	
	        if (maxWait === false) {
	          var leadingCall = leading && !timeoutId;
	        } else {
	          if (!maxTimeoutId && !leading) {
	            lastCalled = stamp;
	          }
	          var remaining = maxWait - (stamp - lastCalled),
	              isCalled = remaining <= 0;
	
	          if (isCalled) {
	            if (maxTimeoutId) {
	              maxTimeoutId = clearTimeout(maxTimeoutId);
	            }
	            lastCalled = stamp;
	            result = func.apply(thisArg, args);
	          }
	          else if (!maxTimeoutId) {
	            maxTimeoutId = setTimeout(maxDelayed, remaining);
	          }
	        }
	        if (isCalled && timeoutId) {
	          timeoutId = clearTimeout(timeoutId);
	        }
	        else if (!timeoutId && wait !== maxWait) {
	          timeoutId = setTimeout(delayed, wait);
	        }
	        if (leadingCall) {
	          isCalled = true;
	          result = func.apply(thisArg, args);
	        }
	        if (isCalled && !timeoutId && !maxTimeoutId) {
	          args = thisArg = null;
	        }
	        return result;
	      };
	    }
	
	    /**
	     * Defers executing the `func` function until the current call stack has cleared.
	     * Additional arguments will be provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to defer.
	     * @param {...*} [arg] Arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.defer(function(text) { console.log(text); }, 'deferred');
	     * // logs 'deferred' after one or more milliseconds
	     */
	    function defer(func) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var args = slice(arguments, 1);
	      return setTimeout(function() { func.apply(undefined, args); }, 1);
	    }
	
	    /**
	     * Executes the `func` function after `wait` milliseconds. Additional arguments
	     * will be provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay execution.
	     * @param {...*} [arg] Arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.delay(function(text) { console.log(text); }, 1000, 'later');
	     * // => logs 'later' after one second
	     */
	    function delay(func, wait) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var args = slice(arguments, 2);
	      return setTimeout(function() { func.apply(undefined, args); }, wait);
	    }
	
	    /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided it will be used to determine the cache key for storing the result
	     * based on the arguments provided to the memoized function. By default, the
	     * first argument provided to the memoized function is used as the cache key.
	     * The `func` is executed with the `this` binding of the memoized function.
	     * The result cache is exposed as the `cache` property on the memoized function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] A function used to resolve the cache key.
	     * @returns {Function} Returns the new memoizing function.
	     * @example
	     *
	     * var fibonacci = _.memoize(function(n) {
	     *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
	     * });
	     *
	     * fibonacci(9)
	     * // => 34
	     *
	     * var data = {
	     *   'fred': { 'name': 'fred', 'age': 40 },
	     *   'pebbles': { 'name': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // modifying the result cache
	     * var get = _.memoize(function(name) { return data[name]; }, _.identity);
	     * get('pebbles');
	     * // => { 'name': 'pebbles', 'age': 1 }
	     *
	     * get.cache.pebbles.name = 'penelope';
	     * get('pebbles');
	     * // => { 'name': 'penelope', 'age': 1 }
	     */
	    function memoize(func, resolver) {
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      var memoized = function() {
	        var cache = memoized.cache,
	            key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];
	
	        return hasOwnProperty.call(cache, key)
	          ? cache[key]
	          : (cache[key] = func.apply(this, arguments));
	      }
	      memoized.cache = {};
	      return memoized;
	    }
	
	    /**
	     * Creates a function that is restricted to execute `func` once. Repeat calls to
	     * the function will return the value of the first call. The `func` is executed
	     * with the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // `initialize` executes `createApplication` once
	     */
	    function once(func) {
	      var ran,
	          result;
	
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      return function() {
	        if (ran) {
	          return result;
	        }
	        ran = true;
	        result = func.apply(this, arguments);
	
	        // clear the `func` variable so the function may be garbage collected
	        func = null;
	        return result;
	      };
	    }
	
	    /**
	     * Creates a function that, when called, invokes `func` with any additional
	     * `partial` arguments prepended to those provided to the new function. This
	     * method is similar to `_.bind` except it does **not** alter the `this` binding.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) { return greeting + ' ' + name; };
	     * var hi = _.partial(greet, 'hi');
	     * hi('fred');
	     * // => 'hi fred'
	     */
	    function partial(func) {
	      return createWrapper(func, 16, slice(arguments, 1));
	    }
	
	    /**
	     * This method is like `_.partial` except that `partial` arguments are
	     * appended to those provided to the new function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [arg] Arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var defaultsDeep = _.partialRight(_.merge, _.defaults);
	     *
	     * var options = {
	     *   'variable': 'data',
	     *   'imports': { 'jq': $ }
	     * };
	     *
	     * defaultsDeep(options, _.templateSettings);
	     *
	     * options.variable
	     * // => 'data'
	     *
	     * options.imports
	     * // => { '_': _, 'jq': $ }
	     */
	    function partialRight(func) {
	      return createWrapper(func, 32, null, slice(arguments, 1));
	    }
	
	    /**
	     * Creates a function that, when executed, will only call the `func` function
	     * at most once per every `wait` milliseconds. Provide an options object to
	     * indicate that `func` should be invoked on the leading and/or trailing edge
	     * of the `wait` timeout. Subsequent calls to the throttled function will
	     * return the result of the last `func` call.
	     *
	     * Note: If `leading` and `trailing` options are `true` `func` will be called
	     * on the trailing edge of the timeout only if the the throttled function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {Function} func The function to throttle.
	     * @param {number} wait The number of milliseconds to throttle executions to.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
	     * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // avoid excessively updating the position while scrolling
	     * var throttled = _.throttle(updatePosition, 100);
	     * jQuery(window).on('scroll', throttled);
	     *
	     * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
	     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
	     *   'trailing': false
	     * }));
	     */
	    function throttle(func, wait, options) {
	      var leading = true,
	          trailing = true;
	
	      if (!isFunction(func)) {
	        throw new TypeError;
	      }
	      if (options === false) {
	        leading = false;
	      } else if (isObject(options)) {
	        leading = 'leading' in options ? options.leading : leading;
	        trailing = 'trailing' in options ? options.trailing : trailing;
	      }
	      debounceOptions.leading = leading;
	      debounceOptions.maxWait = wait;
	      debounceOptions.trailing = trailing;
	
	      return debounce(func, wait, debounceOptions);
	    }
	
	    /**
	     * Creates a function that provides `value` to the wrapper function as its
	     * first argument. Additional arguments provided to the function are appended
	     * to those provided to the wrapper function. The wrapper is executed with
	     * the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Functions
	     * @param {*} value The value to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('Fred, Wilma, & Pebbles');
	     * // => '<p>Fred, Wilma, &amp; Pebbles</p>'
	     */
	    function wrap(value, wrapper) {
	      return createWrapper(wrapper, 16, [value]);
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * var getter = _.constant(object);
	     * getter() === object;
	     * // => true
	     */
	    function constant(value) {
	      return function() {
	        return value;
	      };
	    }
	
	    /**
	     * Produces a callback bound to an optional `thisArg`. If `func` is a property
	     * name the created callback will return the property value for a given element.
	     * If `func` is an object the created callback will return `true` for elements
	     * that contain the equivalent object properties, otherwise it will return `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} [func=identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of the created callback.
	     * @param {number} [argCount] The number of arguments the callback accepts.
	     * @returns {Function} Returns a callback function.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // wrap to create custom callback shorthands
	     * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
	     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
	     *   return !match ? func(callback, thisArg) : function(object) {
	     *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
	     *   };
	     * });
	     *
	     * _.filter(characters, 'age__gt38');
	     * // => [{ 'name': 'fred', 'age': 40 }]
	     */
	    function createCallback(func, thisArg, argCount) {
	      var type = typeof func;
	      if (func == null || type == 'function') {
	        return baseCreateCallback(func, thisArg, argCount);
	      }
	      // handle "_.pluck" style callback shorthands
	      if (type != 'object') {
	        return property(func);
	      }
	      var props = keys(func),
	          key = props[0],
	          a = func[key];
	
	      // handle "_.where" style callback shorthands
	      if (props.length == 1 && a === a && !isObject(a)) {
	        // fast path the common case of providing an object with a single
	        // property containing a primitive value
	        return function(object) {
	          var b = object[key];
	          return a === b && (a !== 0 || (1 / a == 1 / b));
	        };
	      }
	      return function(object) {
	        var length = props.length,
	            result = false;
	
	        while (length--) {
	          if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
	            break;
	          }
	        }
	        return result;
	      };
	    }
	
	    /**
	     * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
	     * corresponding HTML entities.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} string The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('Fred, Wilma, & Pebbles');
	     * // => 'Fred, Wilma, &amp; Pebbles'
	     */
	    function escape(string) {
	      return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
	    }
	
	    /**
	     * This method returns the first argument provided to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * _.identity(object) === object;
	     * // => true
	     */
	    function identity(value) {
	      return value;
	    }
	
	    /**
	     * Adds function properties of a source object to the destination object.
	     * If `object` is a function methods will be added to its prototype as well.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {Function|Object} [object=lodash] object The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.chain=true] Specify whether the functions added are chainable.
	     * @example
	     *
	     * function capitalize(string) {
	     *   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	     * }
	     *
	     * _.mixin({ 'capitalize': capitalize });
	     * _.capitalize('fred');
	     * // => 'Fred'
	     *
	     * _('fred').capitalize().value();
	     * // => 'Fred'
	     *
	     * _.mixin({ 'capitalize': capitalize }, { 'chain': false });
	     * _('fred').capitalize();
	     * // => 'Fred'
	     */
	    function mixin(object, source, options) {
	      var chain = true,
	          methodNames = source && functions(source);
	
	      if (!source || (!options && !methodNames.length)) {
	        if (options == null) {
	          options = source;
	        }
	        ctor = lodashWrapper;
	        source = object;
	        object = lodash;
	        methodNames = functions(source);
	      }
	      if (options === false) {
	        chain = false;
	      } else if (isObject(options) && 'chain' in options) {
	        chain = options.chain;
	      }
	      var ctor = object,
	          isFunc = isFunction(ctor);
	
	      forEach(methodNames, function(methodName) {
	        var func = object[methodName] = source[methodName];
	        if (isFunc) {
	          ctor.prototype[methodName] = function() {
	            var chainAll = this.__chain__,
	                value = this.__wrapped__,
	                args = [value];
	
	            push.apply(args, arguments);
	            var result = func.apply(object, args);
	            if (chain || chainAll) {
	              if (value === result && isObject(result)) {
	                return this;
	              }
	              result = new ctor(result);
	              result.__chain__ = chainAll;
	            }
	            return result;
	          };
	        }
	      });
	    }
	
	    /**
	     * Reverts the '_' variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */
	    function noConflict() {
	      context._ = oldDash;
	      return this;
	    }
	
	    /**
	     * A no-operation function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @example
	     *
	     * var object = { 'name': 'fred' };
	     * _.noop(object) === undefined;
	     * // => true
	     */
	    function noop() {
	      // no operation performed
	    }
	
	    /**
	     * Gets the number of milliseconds that have elapsed since the Unix epoch
	     * (1 January 1970 00:00:00 UTC).
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @example
	     *
	     * var stamp = _.now();
	     * _.defer(function() { console.log(_.now() - stamp); });
	     * // => logs the number of milliseconds it took for the deferred function to be called
	     */
	    var now = isNative(now = Date.now) && now || function() {
	      return new Date().getTime();
	    };
	
	    /**
	     * Converts the given value into an integer of the specified radix.
	     * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the
	     * `value` is a hexadecimal, in which case a `radix` of `16` is used.
	     *
	     * Note: This method avoids differences in native ES3 and ES5 `parseInt`
	     * implementations. See http://es5.github.io/#E.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} value The value to parse.
	     * @param {number} [radix] The radix used to interpret the value to parse.
	     * @returns {number} Returns the new integer value.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     */
	    var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {
	      // Firefox < 21 and Opera < 15 follow the ES3 specified implementation of `parseInt`
	      return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
	    };
	
	    /**
	     * Creates a "_.pluck" style function, which returns the `key` value of a
	     * given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} key The name of the property to retrieve.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'fred',   'age': 40 },
	     *   { 'name': 'barney', 'age': 36 }
	     * ];
	     *
	     * var getName = _.property('name');
	     *
	     * _.map(characters, getName);
	     * // => ['barney', 'fred']
	     *
	     * _.sortBy(characters, getName);
	     * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
	     */
	    function property(key) {
	      return function(object) {
	        return object[key];
	      };
	    }
	
	    /**
	     * Produces a random number between `min` and `max` (inclusive). If only one
	     * argument is provided a number between `0` and the given number will be
	     * returned. If `floating` is truey or either `min` or `max` are floats a
	     * floating-point number will be returned instead of an integer.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {number} [min=0] The minimum possible value.
	     * @param {number} [max=1] The maximum possible value.
	     * @param {boolean} [floating=false] Specify returning a floating-point number.
	     * @returns {number} Returns a random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */
	    function random(min, max, floating) {
	      var noMin = min == null,
	          noMax = max == null;
	
	      if (floating == null) {
	        if (typeof min == 'boolean' && noMax) {
	          floating = min;
	          min = 1;
	        }
	        else if (!noMax && typeof max == 'boolean') {
	          floating = max;
	          noMax = true;
	        }
	      }
	      if (noMin && noMax) {
	        max = 1;
	      }
	      min = +min || 0;
	      if (noMax) {
	        max = min;
	        min = 0;
	      } else {
	        max = +max || 0;
	      }
	      if (floating || min % 1 || max % 1) {
	        var rand = nativeRandom();
	        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand +'').length - 1)))), max);
	      }
	      return baseRandom(min, max);
	    }
	
	    /**
	     * Resolves the value of property `key` on `object`. If `key` is a function
	     * it will be invoked with the `this` binding of `object` and its result returned,
	     * else the property value is returned. If `object` is falsey then `undefined`
	     * is returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {Object} object The object to inspect.
	     * @param {string} key The name of the property to resolve.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = {
	     *   'cheese': 'crumpets',
	     *   'stuff': function() {
	     *     return 'nonsense';
	     *   }
	     * };
	     *
	     * _.result(object, 'cheese');
	     * // => 'crumpets'
	     *
	     * _.result(object, 'stuff');
	     * // => 'nonsense'
	     */
	    function result(object, key) {
	      if (object) {
	        var value = object[key];
	        return isFunction(value) ? object[key]() : value;
	      }
	    }
	
	    /**
	     * A micro-templating method that handles arbitrary delimiters, preserves
	     * whitespace, and correctly escapes quotes within interpolated code.
	     *
	     * Note: In the development build, `_.template` utilizes sourceURLs for easier
	     * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	     *
	     * For more information on precompiling templates see:
	     * http://lodash.com/custom-builds
	     *
	     * For more information on Chrome extension sandboxes see:
	     * http://developer.chrome.com/stable/extensions/sandboxingEval.html
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} text The template text.
	     * @param {Object} data The data object used to populate the text.
	     * @param {Object} [options] The options object.
	     * @param {RegExp} [options.escape] The "escape" delimiter.
	     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	     * @param {Object} [options.imports] An object to import into the template as local variables.
	     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	     * @param {string} [sourceURL] The sourceURL of the template's compiled source.
	     * @param {string} [variable] The data object variable name.
	     * @returns {Function|string} Returns a compiled function when no `data` object
	     *  is given, else it returns the interpolated text.
	     * @example
	     *
	     * // using the "interpolate" delimiter to create a compiled template
	     * var compiled = _.template('hello <%= name %>');
	     * compiled({ 'name': 'fred' });
	     * // => 'hello fred'
	     *
	     * // using the "escape" delimiter to escape HTML in data property values
	     * _.template('<b><%- value %></b>', { 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // using the "evaluate" delimiter to generate HTML
	     * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
	     * _.template(list, { 'people': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
	     * _.template('hello ${ name }', { 'name': 'pebbles' });
	     * // => 'hello pebbles'
	     *
	     * // using the internal `print` function in "evaluate" delimiters
	     * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // using a custom template delimiters
	     * _.templateSettings = {
	     *   'interpolate': /{{([\s\S]+?)}}/g
	     * };
	     *
	     * _.template('hello {{ name }}!', { 'name': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // using the `imports` option to import jQuery
	     * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
	     * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the `sourceURL` option to specify a custom sourceURL for the template
	     * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	     *
	     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	     * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     *   var __t, __p = '', __e = _.escape;
	     *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
	     *   return __p;
	     * }
	     *
	     * // using the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and a stack trace
	     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */
	    function template(text, data, options) {
	      // based on John Resig's `tmpl` implementation
	      // http://ejohn.org/blog/javascript-micro-templating/
	      // and Laura Doktorova's doT.js
	      // https://github.com/olado/doT
	      var settings = lodash.templateSettings;
	      text = String(text || '');
	
	      // avoid missing dependencies when `iteratorTemplate` is not defined
	      options = defaults({}, options, settings);
	
	      var imports = defaults({}, options.imports, settings.imports),
	          importsKeys = keys(imports),
	          importsValues = values(imports);
	
	      var isEvaluating,
	          index = 0,
	          interpolate = options.interpolate || reNoMatch,
	          source = "__p += '";
	
	      // compile the regexp to match each delimiter
	      var reDelimiters = RegExp(
	        (options.escape || reNoMatch).source + '|' +
	        interpolate.source + '|' +
	        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	        (options.evaluate || reNoMatch).source + '|$'
	      , 'g');
	
	      text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	        interpolateValue || (interpolateValue = esTemplateValue);
	
	        // escape characters that cannot be included in string literals
	        source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);
	
	        // replace delimiters with snippets
	        if (escapeValue) {
	          source += "' +\n__e(" + escapeValue + ") +\n'";
	        }
	        if (evaluateValue) {
	          isEvaluating = true;
	          source += "';\n" + evaluateValue + ";\n__p += '";
	        }
	        if (interpolateValue) {
	          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	        }
	        index = offset + match.length;
	
	        // the JS engine embedded in Adobe products requires returning the `match`
	        // string in order to produce the correct `offset` value
	        return match;
	      });
	
	      source += "';\n";
	
	      // if `variable` is not specified, wrap a with-statement around the generated
	      // code to add the data object to the top of the scope chain
	      var variable = options.variable,
	          hasVariable = variable;
	
	      if (!hasVariable) {
	        variable = 'obj';
	        source = 'with (' + variable + ') {\n' + source + '\n}\n';
	      }
	      // cleanup code by stripping empty strings
	      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	        .replace(reEmptyStringMiddle, '$1')
	        .replace(reEmptyStringTrailing, '$1;');
	
	      // frame code as the function body
	      source = 'function(' + variable + ') {\n' +
	        (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
	        "var __t, __p = '', __e = _.escape" +
	        (isEvaluating
	          ? ', __j = Array.prototype.join;\n' +
	            "function print() { __p += __j.call(arguments, '') }\n"
	          : ';\n'
	        ) +
	        source +
	        'return __p\n}';
	
	      // Use a sourceURL for easier debugging.
	      // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	      var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';
	
	      try {
	        var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
	      } catch(e) {
	        e.source = source;
	        throw e;
	      }
	      if (data) {
	        return result(data);
	      }
	      // provide the compiled function's source by its `toString` method, in
	      // supported environments, or the `source` property as a convenience for
	      // inlining compiled templates during the build process
	      result.source = source;
	      return result;
	    }
	
	    /**
	     * Executes the callback `n` times, returning an array of the results
	     * of each callback execution. The callback is bound to `thisArg` and invoked
	     * with one argument; (index).
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {number} n The number of times to execute the callback.
	     * @param {Function} callback The function called per iteration.
	     * @param {*} [thisArg] The `this` binding of `callback`.
	     * @returns {Array} Returns an array of the results of each `callback` execution.
	     * @example
	     *
	     * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
	     * // => [3, 6, 4]
	     *
	     * _.times(3, function(n) { mage.castSpell(n); });
	     * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
	     *
	     * _.times(3, function(n) { this.cast(n); }, mage);
	     * // => also calls `mage.castSpell(n)` three times
	     */
	    function times(n, callback, thisArg) {
	      n = (n = +n) > -1 ? n : 0;
	      var index = -1,
	          result = Array(n);
	
	      callback = baseCreateCallback(callback, thisArg, 1);
	      while (++index < n) {
	        result[index] = callback(index);
	      }
	      return result;
	    }
	
	    /**
	     * The inverse of `_.escape` this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
	     * corresponding characters.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} string The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('Fred, Barney &amp; Pebbles');
	     * // => 'Fred, Barney & Pebbles'
	     */
	    function unescape(string) {
	      return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
	    }
	
	    /**
	     * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utilities
	     * @param {string} [prefix] The value to prefix the ID with.
	     * @returns {string} Returns the unique ID.
	     * @example
	     *
	     * _.uniqueId('contact_');
	     * // => 'contact_104'
	     *
	     * _.uniqueId();
	     * // => '105'
	     */
	    function uniqueId(prefix) {
	      var id = ++idCounter;
	      return String(prefix == null ? '' : prefix) + id;
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * Creates a `lodash` object that wraps the given value with explicit
	     * method chaining enabled.
	     *
	     * @static
	     * @memberOf _
	     * @category Chaining
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the wrapper object.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney',  'age': 36 },
	     *   { 'name': 'fred',    'age': 40 },
	     *   { 'name': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _.chain(characters)
	     *     .sortBy('age')
	     *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
	     *     .first()
	     *     .value();
	     * // => 'pebbles is 1'
	     */
	    function chain(value) {
	      value = new lodashWrapper(value);
	      value.__chain__ = true;
	      return value;
	    }
	
	    /**
	     * Invokes `interceptor` with the `value` as the first argument and then
	     * returns `value`. The purpose of this method is to "tap into" a method
	     * chain in order to perform operations on intermediate results within
	     * the chain.
	     *
	     * @static
	     * @memberOf _
	     * @category Chaining
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3, 4])
	     *  .tap(function(array) { array.pop(); })
	     *  .reverse()
	     *  .value();
	     * // => [3, 2, 1]
	     */
	    function tap(value, interceptor) {
	      interceptor(value);
	      return value;
	    }
	
	    /**
	     * Enables explicit method chaining on the wrapper object.
	     *
	     * @name chain
	     * @memberOf _
	     * @category Chaining
	     * @returns {*} Returns the wrapper object.
	     * @example
	     *
	     * var characters = [
	     *   { 'name': 'barney', 'age': 36 },
	     *   { 'name': 'fred',   'age': 40 }
	     * ];
	     *
	     * // without explicit chaining
	     * _(characters).first();
	     * // => { 'name': 'barney', 'age': 36 }
	     *
	     * // with explicit chaining
	     * _(characters).chain()
	     *   .first()
	     *   .pick('age')
	     *   .value();
	     * // => { 'age': 36 }
	     */
	    function wrapperChain() {
	      this.__chain__ = true;
	      return this;
	    }
	
	    /**
	     * Produces the `toString` result of the wrapped value.
	     *
	     * @name toString
	     * @memberOf _
	     * @category Chaining
	     * @returns {string} Returns the string result.
	     * @example
	     *
	     * _([1, 2, 3]).toString();
	     * // => '1,2,3'
	     */
	    function wrapperToString() {
	      return String(this.__wrapped__);
	    }
	
	    /**
	     * Extracts the wrapped value.
	     *
	     * @name valueOf
	     * @memberOf _
	     * @alias value
	     * @category Chaining
	     * @returns {*} Returns the wrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).valueOf();
	     * // => [1, 2, 3]
	     */
	    function wrapperValueOf() {
	      return this.__wrapped__;
	    }
	
	    /*--------------------------------------------------------------------------*/
	
	    // add functions that return wrapped values when chaining
	    lodash.after = after;
	    lodash.assign = assign;
	    lodash.at = at;
	    lodash.bind = bind;
	    lodash.bindAll = bindAll;
	    lodash.bindKey = bindKey;
	    lodash.chain = chain;
	    lodash.compact = compact;
	    lodash.compose = compose;
	    lodash.constant = constant;
	    lodash.countBy = countBy;
	    lodash.create = create;
	    lodash.createCallback = createCallback;
	    lodash.curry = curry;
	    lodash.debounce = debounce;
	    lodash.defaults = defaults;
	    lodash.defer = defer;
	    lodash.delay = delay;
	    lodash.difference = difference;
	    lodash.filter = filter;
	    lodash.flatten = flatten;
	    lodash.forEach = forEach;
	    lodash.forEachRight = forEachRight;
	    lodash.forIn = forIn;
	    lodash.forInRight = forInRight;
	    lodash.forOwn = forOwn;
	    lodash.forOwnRight = forOwnRight;
	    lodash.functions = functions;
	    lodash.groupBy = groupBy;
	    lodash.indexBy = indexBy;
	    lodash.initial = initial;
	    lodash.intersection = intersection;
	    lodash.invert = invert;
	    lodash.invoke = invoke;
	    lodash.keys = keys;
	    lodash.map = map;
	    lodash.mapValues = mapValues;
	    lodash.max = max;
	    lodash.memoize = memoize;
	    lodash.merge = merge;
	    lodash.min = min;
	    lodash.omit = omit;
	    lodash.once = once;
	    lodash.pairs = pairs;
	    lodash.partial = partial;
	    lodash.partialRight = partialRight;
	    lodash.pick = pick;
	    lodash.pluck = pluck;
	    lodash.property = property;
	    lodash.pull = pull;
	    lodash.range = range;
	    lodash.reject = reject;
	    lodash.remove = remove;
	    lodash.rest = rest;
	    lodash.shuffle = shuffle;
	    lodash.sortBy = sortBy;
	    lodash.tap = tap;
	    lodash.throttle = throttle;
	    lodash.times = times;
	    lodash.toArray = toArray;
	    lodash.transform = transform;
	    lodash.union = union;
	    lodash.uniq = uniq;
	    lodash.values = values;
	    lodash.where = where;
	    lodash.without = without;
	    lodash.wrap = wrap;
	    lodash.xor = xor;
	    lodash.zip = zip;
	    lodash.zipObject = zipObject;
	
	    // add aliases
	    lodash.collect = map;
	    lodash.drop = rest;
	    lodash.each = forEach;
	    lodash.eachRight = forEachRight;
	    lodash.extend = assign;
	    lodash.methods = functions;
	    lodash.object = zipObject;
	    lodash.select = filter;
	    lodash.tail = rest;
	    lodash.unique = uniq;
	    lodash.unzip = zip;
	
	    // add functions to `lodash.prototype`
	    mixin(lodash);
	
	    /*--------------------------------------------------------------------------*/
	
	    // add functions that return unwrapped values when chaining
	    lodash.clone = clone;
	    lodash.cloneDeep = cloneDeep;
	    lodash.contains = contains;
	    lodash.escape = escape;
	    lodash.every = every;
	    lodash.find = find;
	    lodash.findIndex = findIndex;
	    lodash.findKey = findKey;
	    lodash.findLast = findLast;
	    lodash.findLastIndex = findLastIndex;
	    lodash.findLastKey = findLastKey;
	    lodash.has = has;
	    lodash.identity = identity;
	    lodash.indexOf = indexOf;
	    lodash.isArguments = isArguments;
	    lodash.isArray = isArray;
	    lodash.isBoolean = isBoolean;
	    lodash.isDate = isDate;
	    lodash.isElement = isElement;
	    lodash.isEmpty = isEmpty;
	    lodash.isEqual = isEqual;
	    lodash.isFinite = isFinite;
	    lodash.isFunction = isFunction;
	    lodash.isNaN = isNaN;
	    lodash.isNull = isNull;
	    lodash.isNumber = isNumber;
	    lodash.isObject = isObject;
	    lodash.isPlainObject = isPlainObject;
	    lodash.isRegExp = isRegExp;
	    lodash.isString = isString;
	    lodash.isUndefined = isUndefined;
	    lodash.lastIndexOf = lastIndexOf;
	    lodash.mixin = mixin;
	    lodash.noConflict = noConflict;
	    lodash.noop = noop;
	    lodash.now = now;
	    lodash.parseInt = parseInt;
	    lodash.random = random;
	    lodash.reduce = reduce;
	    lodash.reduceRight = reduceRight;
	    lodash.result = result;
	    lodash.runInContext = runInContext;
	    lodash.size = size;
	    lodash.some = some;
	    lodash.sortedIndex = sortedIndex;
	    lodash.template = template;
	    lodash.unescape = unescape;
	    lodash.uniqueId = uniqueId;
	
	    // add aliases
	    lodash.all = every;
	    lodash.any = some;
	    lodash.detect = find;
	    lodash.findWhere = find;
	    lodash.foldl = reduce;
	    lodash.foldr = reduceRight;
	    lodash.include = contains;
	    lodash.inject = reduce;
	
	    mixin(function() {
	      var source = {}
	      forOwn(lodash, function(func, methodName) {
	        if (!lodash.prototype[methodName]) {
	          source[methodName] = func;
	        }
	      });
	      return source;
	    }(), false);
	
	    /*--------------------------------------------------------------------------*/
	
	    // add functions capable of returning wrapped and unwrapped values when chaining
	    lodash.first = first;
	    lodash.last = last;
	    lodash.sample = sample;
	
	    // add aliases
	    lodash.take = first;
	    lodash.head = first;
	
	    forOwn(lodash, function(func, methodName) {
	      var callbackable = methodName !== 'sample';
	      if (!lodash.prototype[methodName]) {
	        lodash.prototype[methodName]= function(n, guard) {
	          var chainAll = this.__chain__,
	              result = func(this.__wrapped__, n, guard);
	
	          return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))
	            ? result
	            : new lodashWrapper(result, chainAll);
	        };
	      }
	    });
	
	    /*--------------------------------------------------------------------------*/
	
	    /**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type string
	     */
	    lodash.VERSION = '2.4.1';
	
	    // add "Chaining" functions to the wrapper
	    lodash.prototype.chain = wrapperChain;
	    lodash.prototype.toString = wrapperToString;
	    lodash.prototype.value = wrapperValueOf;
	    lodash.prototype.valueOf = wrapperValueOf;
	
	    // add `Array` functions that return unwrapped values
	    baseEach(['join', 'pop', 'shift'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        var chainAll = this.__chain__,
	            result = func.apply(this.__wrapped__, arguments);
	
	        return chainAll
	          ? new lodashWrapper(result, chainAll)
	          : result;
	      };
	    });
	
	    // add `Array` functions that return the existing wrapped value
	    baseEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        func.apply(this.__wrapped__, arguments);
	        return this;
	      };
	    });
	
	    // add `Array` functions that return new wrapped values
	    baseEach(['concat', 'slice', 'splice'], function(methodName) {
	      var func = arrayRef[methodName];
	      lodash.prototype[methodName] = function() {
	        return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
	      };
	    });
	
	    // avoid array-like object bugs with `Array#shift` and `Array#splice`
	    // in IE < 9, Firefox < 10, Narwhal, and RingoJS
	    if (!support.spliceObjects) {
	      baseEach(['pop', 'shift', 'splice'], function(methodName) {
	        var func = arrayRef[methodName],
	            isSplice = methodName == 'splice';
	
	        lodash.prototype[methodName] = function() {
	          var chainAll = this.__chain__,
	              value = this.__wrapped__,
	              result = func.apply(value, arguments);
	
	          if (value.length === 0) {
	            delete value[0];
	          }
	          return (chainAll || isSplice)
	            ? new lodashWrapper(result, chainAll)
	            : result;
	        };
	      });
	    }
	
	    return lodash;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  // expose Lo-Dash
	  var _ = runInContext();
	
	  // some AMD build optimizers like r.js check for condition patterns like the following:
	  if (true) {
	    // Expose Lo-Dash to the global object even when an AMD loader is present in
	    // case Lo-Dash is loaded with a RequireJS shim config.
	    // See http://requirejs.org/docs/api.html#config-shim
	    root._ = _;
	
	    // define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // check for `exports` after `define` in case a build optimizer adds an `exports` object
	  else if (freeExports && freeModule) {
	    // in Node.js or RingoJS
	    if (moduleExports) {
	      (freeModule.exports = _)._ = _;
	    }
	    // in Narwhal or Rhino -require
	    else {
	      freeExports._ = _;
	    }
	  }
	  else {
	    // in a browser or Rhino
	    root._ = _;
	  }
	}.call(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)(module), (function() { return this; }())))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//  Chance.js 0.5.9
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
	
	        if (seed !== undefined) {
	            // If we were passed a generator rather than a seed, use it.
	            if (typeof seed === 'function') {
	                this.random = seed;
	            } else {
	                this.seed = seed;
	            }
	        }
	
	        // If no generator function was provided, use our MT
	        if (typeof this.random === 'undefined') {
	            this.mt = this.mersenne_twister(seed);
	            this.random = function () {
	                return this.mt.random(this.seed);
	            };
	        }
	    }
	
	    // Random helper functions
	    function initOptions(options, defaults) {
	        options || (options = {});
	        if (!defaults) {
	            return options;
	        }
	        for (var i in defaults) {
	            if (typeof options[i] === 'undefined') {
	                options[i] = defaults[i];
	            }
	        }
	        return options;
	    }
	
	    function testRange(test, errorMessage) {
	        if (test) {
	            throw new RangeError(errorMessage);
	        }
	    }
	
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
	        var num, range;
	
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
	
	    Chance.prototype.string = function (options) {
	        options = initOptions(options);
	
	        var length = options.length || this.natural({min: 5, max: 20}),
	            text = '',
	            pool = options.pool;
	
	        for (var i = 0; i < length; i++) {
	            text += this.character({pool: pool});
	        }
	        return text;
	    };
	
	    // -- End Basics --
	
	    // -- Helpers --
	
	    Chance.prototype.capitalize = function (word) {
	        return word.charAt(0).toUpperCase() + word.substr(1);
	    };
	
	    Chance.prototype.mixin = function (obj) {
	        var chance = this;
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
	                return arr.indexOf(result) !== -1;
	            }
	        });
	
	        var arr = [], count = 0;
	
	        while (arr.length < num) {
	            var result = fn.apply(this, slice.call(arguments, 2));
	            if (!options.comparator(arr, result)) {
	                arr.push(result);
	                // reset count when unique found
	                count = 0;
	            }
	
	            if (++count > num * 50) {
	                throw new RangeError("Chance: num is likely too large for sample set");
	            }
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
	
	    // -- End Helpers --
	
	    // -- Text --
	
	    Chance.prototype.paragraph = function (options) {
	        options = initOptions(options);
	
	        var sentences = options.sentences || this.natural({min: 3, max: 7}),
	            sentence_array = [];
	
	        for (var i = 0; i < sentences; i++) {
	            sentence_array.push(this.sentence());
	        }
	
	        return sentence_array.join(' ');
	    };
	
	    // Could get smarter about this than generating random words and
	    // chaining them together. Such as: http://vq.io/1a5ceOh
	    Chance.prototype.sentence = function (options) {
	        options = initOptions(options);
	
	        var words = options.words || this.natural({min: 12, max: 18}),
	            text, word_array = [];
	
	        for (var i = 0; i < words; i++) {
	            word_array.push(this.word());
	        }
	
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
	
	        return name;
	    };
	
	    // Return the list of available name prefixes based on supplied gender.
	    Chance.prototype.name_prefixes = function (gender) {
	        gender = gender || "all";
	
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
	            dash = '';
	
	        if(options.dashes){
	            dash = '-';
	        }
	
	        if(!options.ssnFour) {
	            ssn = this.string({pool: ssn_pool, length: 3}) + dash +
	            this.string({pool: ssn_pool, length: 2}) + dash +
	            this.string({pool: ssn_pool, length: 4});
	        } else {
	            ssn = this.string({pool: ssn_pool, length: 4});
	        }
	        return ssn;
	    };
	
	    // -- End Person --
	
	    // -- Web --
	
	    Chance.prototype.color = function (options) {
	        function gray(value, delimiter) {
	            return [value, value, value].join(delimiter || '');
	        }
	
	        options = initOptions(options, {format: this.pick(['hex', 'shorthex', 'rgb']), grayscale: false});
	        var isGrayscale = options.grayscale;
	
	        if (options.format === 'hex') {
	            return '#' + (isGrayscale ? gray(this.hash({length: 2})) : this.hash({length: 6}));
	        }
	
	        if (options.format === 'shorthex') {
	            return '#' + (isGrayscale ? gray(this.hash({length: 1})) : this.hash({length: 3}));
	        }
	
	        if (options.format === 'rgb') {
	            if (isGrayscale) {
	                return 'rgb(' + gray(this.natural({max: 255}), ',') + ')';
	            } else {
	                return 'rgb(' + this.natural({max: 255}) + ',' + this.natural({max: 255}) + ',' + this.natural({max: 255}) + ')';
	            }
	        }
	
	        throw new Error('Invalid format provided. Please provide one of "hex", "shorthex", or "rgb"');
	    };
	
	    Chance.prototype.domain = function (options) {
	        options = initOptions(options);
	        return this.word() + '.' + (options.tld || this.tld());
	    };
	
	    Chance.prototype.email = function (options) {
	        options = initOptions(options);
	        return this.word() + '@' + (options.domain || this.domain());
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
	        var ip_addr = [];
	
	        for (var i = 0; i < 8; i++) {
	            ip_addr.push(this.hash({length: 4}));
	        }
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
	
	    // -- End Web --
	
	    // -- Address --
	
	    Chance.prototype.address = function (options) {
	        options = initOptions(options);
	        return this.natural({min: 5, max: 2000}) + ' ' + this.street(options);
	    };
	
	    Chance.prototype.areacode = function (options) {
	        options = initOptions(options, {parens : true});
	        // Don't want area codes to start with 1, or have a 9 as the second digit
	        var areacode = this.natural({min: 2, max: 9}).toString() + this.natural({min: 0, max: 8}).toString() + this.natural({min: 0, max: 9}).toString();
	        return options.parens ? '(' + areacode + ')' : areacode;
	    };
	
	    Chance.prototype.city = function () {
	        return this.capitalize(this.word({syllables: 3}));
	    };
	
	    Chance.prototype.coordinates = function (options) {
	        options = initOptions(options);
	        return this.latitude(options) + ', ' + this.longitude(options);
	    };
	
	    Chance.prototype.geoJson = function (options) {
	        options = initOptions(options);
	        return this.latitude(options) + ', ' + this.longitude(options) + ', ' + this.altitude(options);
	    };
	
	    Chance.prototype.altitude = function (options) {
	        options = initOptions(options, {fixed : 5});
	        return this.floating({min: 0, max: 32736000, fixed: options.fixed});
	    };
	
	    Chance.prototype.depth = function (options) {
	        options = initOptions(options, {fixed: 5});
	        return this.floating({min: -35994, max: 0, fixed: options.fixed});
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
	        options = initOptions(options, {formatted : true});
	        if (!options.formatted) {
	            options.parens = false;
	        }
	        var areacode = this.areacode(options).toString();
	        var exchange = this.natural({min: 2, max: 9}).toString() 
	            + this.natural({min: 0, max: 9}).toString() 
	            + this.natural({min: 0, max: 9}).toString();
	        var subscriber = this.natural({min: 1000, max: 9999}).toString(); // this could be random [0-9]{4}
	        
	        return options.formatted ? areacode + ' ' + exchange + '-' + subscriber : areacode + exchange + subscriber;
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
	
	        return fl + this.character({alpha: true, casing: "upper"}) + this.character({alpha: true, casing: "upper"}) + this.character({alpha: true, casing: "upper"});
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
	
	    Chance.prototype.tv = function (options) {
	        return this.radio(options);
	    };
	
	    // Note: only returning US zip codes, internationalization will be a whole
	    // other beast to tackle at some point.
	    Chance.prototype.zip = function (options) {
	        var zip = "";
	
	        for (var i = 0; i < 5; i++) {
	            zip += this.natural({max: 9}).toString();
	        }
	
	        if (options && options.plusfour === true) {
	            zip += '-';
	            for (i = 0; i < 4; i++) {
	                zip += this.natural({max: 9}).toString();
	            }
	        }
	
	        return zip;
	    };
	
	    // -- End Address --
	
	    // -- Time
	
	    Chance.prototype.ampm = function () {
	        return this.bool() ? 'am' : 'pm';
	    };
	
	    Chance.prototype.date = function (options) {
	        var m = this.month({raw: true}),
	            date_string;
	
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
	
	        var date = new Date(options.year, options.month, options.day, options.hour, options.minute, options.second, options.millisecond);
	
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
	        options = initOptions(options);
	        var max = options.twentyfour ? 24 : 12;
	        return this.natural({min: 1, max: max});
	    };
	
	    Chance.prototype.millisecond = function () {
	        return this.natural({max: 999});
	    };
	
	    Chance.prototype.minute = Chance.prototype.second = function () {
	        return this.natural({max: 59});
	    };
	
	    Chance.prototype.month = function (options) {
	        options = initOptions(options);
	        var month = this.pick(this.months());
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
	
	        var type, number, to_generate, type_name;
	
	        type = (options.type) ?
	                    this.cc_type({ name: options.type, raw: true }) :
	                    this.cc_type({ raw: true });
	        number = type.prefix.split("");
	        to_generate = type.length - type.prefix.length - 1;
	
	        // Generates n - 1 digits
	        for (var i = 0; i < to_generate; i++) {
	            number.push(this.integer({min: 0, max: 9}));
	        }
	
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
	        var month, month_int;
	
	        if (options.future) {
	            do {
	                month = this.month({raw: true}).numeric;
	                month_int = parseInt(month, 10);
	            } while (month_int < new Date().getMonth());
	        } else {
	            month = this.month({raw: true}).numeric;
	        }
	
	        return month;
	    };
	
	    Chance.prototype.exp_year = function () {
	        return this.year({max: new Date().getFullYear() + 10});
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
	                // If this is the first element, we know it doesn't exist
	                if (arr.length === 0) {
	                    return false;
	                }
	
	                return arr.reduce(function(acc, item) {
	                    // If a match has been found, short circuit check and just return
	                    if (acc) {
	                        return acc;
	                    }
	                    return item.code === val.code;
	                }, false);
	            }
	        });
	
	        if (returnAsString) {
	            return  currencies[0] + '/' + currencies[1];
	        } else {
	            return currencies;
	        }
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
	        options = options || {version: 5};
	
	        var guid_pool = "ABCDEF1234567890",
	            variant_pool = "AB89",
	            guid = this.string({pool: guid_pool, length: 8}) + '-' +
	                   this.string({pool: guid_pool, length: 4}) + '-' +
	                   // The Version
	                   options.version +
	                   this.string({pool: guid_pool, length: 3}) + '-' +
	                   // The Variant
	                   this.string({pool: variant_pool, length: 1}) +
	                   this.string({pool: guid_pool, length: 3}) + '-' +
	                   this.string({pool: guid_pool, length: 12});
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
	
	    function copyObject(source, target) {
	        var key;
	
	        target = target || (Array.isArray(source) ? [] : {});
	
	        for (key in source) {
	            if (source.hasOwnProperty(key)) {
	                target[key] = source[key] || target[key];
	            }
	        }
	
	        return target;
	    }
	
	    /** Get the data based on key**/
	    Chance.prototype.get = function (name) {
	        return copyObject(data[name]);
	    };
	
	    /** Set the data as key and data or the data map**/
	    Chance.prototype.set = function (name, values) {
	        if (typeof name === "string") {
	            data[name] = values;
	        } else {
	            data = copyObject(name, data);
	        }
	    };
	
	
	    Chance.prototype.mersenne_twister = function (seed) {
	        return new MersenneTwister(seed);
	    };
	
	    // -- End Miscellaneous --
	
	    Chance.prototype.VERSION = "0.5.9";
	
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
	
	    // If there is a window object, that at least has a document property,
	    // instantiate and define chance on the window
	    if (typeof window === "object" && typeof window.document === "object") {
	        window.Chance = Chance;
	        window.chance = new Chance();
	    }
	})();


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React            = __webpack_require__(1)
	  , _                = __webpack_require__(14)
	  , $                = __webpack_require__(60)
	  , cx               = __webpack_require__(13)
	  , setter           = __webpack_require__(68)
	  , controlledInput  = __webpack_require__(62)
	  , CustomPropTypes  = __webpack_require__(63)
	  , Popup            = __webpack_require__(64)
	  , List             = __webpack_require__(65);
	
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
	    __webpack_require__(83),
	    __webpack_require__(89),
	    __webpack_require__(84),
	    __webpack_require__(86),
	    __webpack_require__(87),
	    __webpack_require__(88)('focusedIndex'),
	    __webpack_require__(88)('selectedIndex')
	  ],
	
	  propTypes: propTypes,
	
		getInitialState: function(){
	    var initialIdx = this._dataIndexOf(this.props.data, this.props.value);
	
			return {
	      selectedIndex: initialIdx,
	      focusedIndex:  initialIdx === -1 ? 0 : initialIdx,
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
	
	  componentWillReceiveProps: function(props){
	    if ( _.isShallowEqual(props.value, this.props.value) )
	      return
	
	    var idx = this._dataIndexOf(props.data, props.value);
	
	    this.setSelectedIndex(idx)
	    this.setFocusedIndex(idx === -1 ? 0 : idx)
	  },
	
		render: function(){
			var $__0=   _.omit(this.props, Object.keys(propTypes)),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , ValueComponent = this.props.valueComponent
	      , valueItem = this._dataItem( this._data(), this.props.value )
	      , optID = this._id('_option');
	
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
	        React.createElement(Popup, {open: this.props.open, onRequestClose: this.close, duration: this.props.duration}, 
	          React.createElement("div", null, 
	            React.createElement(List, {ref: "list", 
	              optID: optID, 
	              'aria-hidden':  !this.props.open, 
	              style: { maxHeight: 200, height: 'auto'}, 
	              data: this.props.data, 
	              initialVisibleItems: this.props.initialBufferSize, 
	              itemHeight: 18, 
	              selectedIndex: this.state.selectedIndex, 
	              focusedIndex: this.state.focusedIndex, 
	              textField: this.props.textField, 
	              valueField: this.props.valueField, 
	              listItem: this.props.itemComponent, 
	              onSelect: this._maybeHandle(this._onSelect)})
	          )
	        )
				)
			)
		},
	
	  setWidth: function() {
	    var width = $.width(this.getDOMNode())
	      , changed = width !== this.state.width;
	
	    if ( changed )
	      this.setState({ width: width })
	  },
	
	  _focus: function(focused){
	    var self = this;
	
	    clearTimeout(self.timer)
	    self.timer = setTimeout(function(){
	
	      if(focused) self.getDOMNode().focus()
	      else        self.close()
	
	      if( focused !== self.state.focused)
	        self.setState({ focused: focused })
	
	    }, 0)
	  },
	
	  _onSelect: function(data, idx, elem){
	    this.close()
	    this.change(data)
	  },
	
	  _keyDown: function(e){
	    var self = this
	      , key = e.key
	      , alt = e.altKey
	      , isOpen = this.props.open;
	
	    if ( key === 'End' ) {
	      if ( isOpen) this.setFocusedIndex(this._data().length - 1)
	      else change(this._data().length - 1)
	      e.preventDefault()
	    }
	    else if ( key === 'Home' ) {
	      if ( isOpen) this.setFocusedIndex(0)
	      else change(0)
	      e.preventDefault()
	    }
	    else if ( key === 'Escape' && isOpen ) {
	      this.close()
	    }
	    else if ( (key === 'Enter' || key === ' ') && isOpen ) {
	      change(this.state.focusedIndex)
	    }
	    else if ( key === 'ArrowDown' ) {
	      if ( alt )         this.open()
	      else if ( isOpen ) this.setFocusedIndex(this.nextFocusedIndex())
	      else               change(this.nextSelectedIndex())
	      e.preventDefault()
	    }
	    else if ( key === 'ArrowUp' ) {
	      if ( alt )         this.close()
	      else if ( isOpen ) this.setFocusedIndex(this.prevFocusedIndex())
	      else               change(this.prevSelectedIndex())
	      e.preventDefault()
	    }
	    else
	      this.search(
	          String.fromCharCode(e.keyCode)
	        , this._locate)
	
	    function change(idx){
	      self.change(self._data()[idx])
	    }
	  },
	
	  change: function(data){
	    var change = this.props.onChange
	
	    if ( change && !_.isShallowEqual(data, this.props.value) ) {
	      change(data)
	      this.close()
	    }
	  },
	
	  _locate: function(word){
	    var key = this.props.open ? 'focusedIndex' : 'selectedIndex'
	      , idx = this.findNextWordIndex(word, this.state[key])
	      , setIndex = setter(key).bind(this);
	
	    if ( idx !== -1)
	      setIndex(idx)
	  },
	
	  _data: function(){
	    return this.props.data
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React  = __webpack_require__(1)
	  , cx     = __webpack_require__(13)
	  , _      = __webpack_require__(14)
	  , $      = __webpack_require__(60)
	  , filter = __webpack_require__(61)
	  , controlledInput  = __webpack_require__(62)
	  , CustomPropTypes  = __webpack_require__(63)
	  
	  , Popup  = __webpack_require__(64)
	  , List   = __webpack_require__(65)
	  , Btn    = __webpack_require__(66)
	  , Input  = __webpack_require__(67);
	
	var propTypes = {
	      //-- controlled props -----------
	      value:          React.PropTypes.any,
	      onChange:       React.PropTypes.func,
	      open:           React.PropTypes.bool,
	      onToggle:       React.PropTypes.func,
	      //------------------------------------
	
	      itemComponent:  CustomPropTypes.elementType,
	
	      data:           React.PropTypes.array,
	      valueField:     React.PropTypes.string,
	      textField:      React.PropTypes.string,
	      name:           React.PropTypes.string,
	
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
	    __webpack_require__(83),
	    __webpack_require__(84),
	    __webpack_require__(85),
	    __webpack_require__(86),
	    __webpack_require__(87),
	    __webpack_require__(88)('focusedIndex'),
	    __webpack_require__(88)('selectedIndex')
	  ],
	
	  propTypes: propTypes,
	
		getInitialState: function(){
	    var items = this.process(this.props.data, this.props.value)
	      , idx   = this._dataIndexOf(items, this.props.value);
	
			return {
				selectedIndex: idx,
	      focusedIndex:  idx === -1 ? 0 : idx,
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
	      selectedIndex:  idx,
	      focusedIndex:   idx === -1
	        ? focused !== -1 ? focused : 0 // focus the closest match
	        : idx
	    })
	  },
	
		render: function(){
			var $__0=     _.omit(this.props, Object.keys(propTypes)),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , valueItem = this._dataItem( this._data(), this.props.value )
	      , items = this._data()
	      , listID = this._id('_listbox')
	      , optID  = this._id( '_option')
	      , completeType = this.props.suggest
	          ? this.props.filter ? 'both' : 'inline'
	          : this.props.filter ? 'list' : '';
	
			return (
				React.createElement("div", React.__spread({},  props , 
	        {ref: "element", 
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
	          role: "combobox", 
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
	            React.createElement(List, {ref: "list", 
	              id: listID, 
	              optID: optID, 
	              'aria-hidden':  !this.props.open, 
	              'aria-live':  completeType && 'polite', 
	              style: { maxHeight: 200, height: 'auto'}, 
	              data: items, 
	              selectedIndex: this.state.selectedIndex, 
	              focusedIndex: this.state.focusedIndex, 
	
	              textField: this.props.textField, 
	              valueField: this.props.valueField, 
	              onSelect: this._maybeHandle(this._onSelect), 
	              listItem: this.props.itemComponent, 
	              messages: {
	                emptyList: this.props.data.length
	                  ? this.props.messages.emptyFilter
	                  : this.props.messages.emptyList
	              }})
	          )
	        )
				)
			)
		},
	
	  setWidth: function() {
	    var width = $.width(this.getDOMNode())
	      , changed = width !== this.state.width;
	
	    if ( changed )
	      this.setState({ width: width })
	  },
	
	  _onSelect: function(data, idx, elem){
	    this.close()
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
	    var self = this;
	
	    clearTimeout(self.timer)
	    !focused && self.refs.input.accept() //not suggesting anymore
	
	    self.timer = setTimeout(function(){
	      if(focused) self.refs.input.focus()
	      else        self.close()
	
	      if( focused !== self.state.focused)
	        self.setState({ focused: focused })
	    }, 0)
	  },
	
	  _keyDown: function(e){
	    var self = this
	      , key  = e.key
	      , alt  = e.altKey
	      , focusedIdx  = this.state.focusedIndex
	      , isOpen      = this.props.open;
	
	    if ( key === 'End' )
	      select(this._data().length - 1)
	
	    else if ( key === 'Home' )
	      select(0)
	
	    else if ( key === 'Escape' && isOpen )
	      this.close()
	
	    else if ( key === 'Enter' && isOpen ) {
	      select(focusedIdx)
	      this.close()
	    }
	
	    else if ( key === 'ArrowDown' ) {
	      if ( alt )
	        this.open()
	      else {
	        if ( isOpen ) this.setFocusedIndex(this.nextFocusedIndex())
	        else select(this.nextSelectedIndex())
	      }
	    }
	    else if ( key === 'ArrowUp' ) {
	      if ( alt )
	        this.close()
	      else {
	        if ( isOpen ) this.setFocusedIndex(this.prevFocusedIndex())
	        else select(this.prevSelectedIndex())
	      }
	    }
	
	    function select(idx) {
	      if( idx === -1 || self._data().length === 0)
	        return self.change(self.refs.input.getDOMNode().value, false)
	
	      self.refs.input.accept(true); //removes caret
	      self.change(self._data()[idx], false)
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React           = __webpack_require__(1)
	  , Header          = __webpack_require__(73)
	  , Month           = __webpack_require__(74)
	  , Year            = __webpack_require__(75)
	  , Decade          = __webpack_require__(76)
	  , Century         = __webpack_require__(77)
	  , cx              = __webpack_require__(13)
	  , controlledInput = __webpack_require__(62)
	  , SlideTransition = __webpack_require__(56)
	  , dates           = __webpack_require__(69)
	  , constants       = __webpack_require__(70)
	  , _               = __webpack_require__(14); //values, omit, object
	
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
	
	
	var Calendar = React.createClass({
	
	  displayName: 'Calendar',
	
	  mixins: [
	    __webpack_require__(83),
	    __webpack_require__(89),
	    __webpack_require__(87)
	  ],
	
	
	  propTypes: {
	
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
	
	    messages:      React.PropTypes.shape({
	      moveBack:    React.PropTypes.string,
	      moveForward: React.PropTypes.string
	    }),
	
	    maintainFocus: React.PropTypes.bool,
	
	  },
	
	  getInitialState: function(){
	    return {
	      selectedIndex: 0,
	      view:          this.props.initialView || 'month',
	      currentDate:   this.inRangeValue(new Date(this.props.value))
	    }
	  },
	
	  getDefaultProps: function(){
	    return {
	      open:  false,
	      value: new Date,
	      min:   new Date(1900,0, 1),
	      max:   new Date(2099,11, 31),
	
	      initialView: 'month',
	      finalView: 'century',
	
	      maintainFocus: true
	    }
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    var bottom  = VIEW_OPTIONS.indexOf(nextProps.initialView)
	      , top     = VIEW_OPTIONS.indexOf(nextProps.finalView)
	      , current = VIEW_OPTIONS.indexOf(this.state.view)
	      , view    = this.state.view
	      , val     = this.inRangeValue(new Date(nextProps.value));
	
	    if( current < bottom )
	      this.setState({ view: view = nextProps.initialView })
	    else if (current > top)
	      this.setState({ view: view = nextProps.finalView })
	
	    //if the value changes reset views to the new one
	    if ( !dates.eq(val, this.props.value, VIEW_UNIT[view]))
	      this.setState({
	        currentDate: val
	      })
	  },
	
	  render: function(){
	    var $__0=   
	                  _.omit(this.props, ['value', 'min', 'max']),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , View     = VIEW[this.state.view]
	      , unit     = this.state.view
	      
	      , disabled = this.props.disabled || this.props.readOnly
	      , date     = this.state.currentDate
	      , labelId  = this._id('_view_label')
	      , key      = this.state.view + '_' + dates[this.state.view](date)
	      , id       = this._id('_view');
	
	    return (
	      React.createElement("div", React.__spread({},  props , 
	        {className: cx(className, {
	          'rw-calendar':       true,
	          'rw-widget':         true,
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
	          direction: this.state.slideDirection, 
	          onAnimate: finished.bind(this)}, 
	
	          React.createElement(View, {ref: "currentView", 
	            key: key, 
	            id: id, 
	            'aria-labeledby': labelId, 
	            selectedDate: this.props.value, 
	            value: this.state.currentDate, 
	            onChange: this._maybeHandle(this.change), 
	            onKeyDown: this._maybeHandle(this._keyDown), 
	            onFocus: this._maybeHandle(this._focus.bind(null, true), true), 
	            onMoveLeft: this._maybeHandle(this.navigate.bind(null,  dir.LEFT)), 
	            onMoveRight: this._maybeHandle(this.navigate.bind(null,  dir.RIGHT)), 
	            disabled: this.props.disabled, 
	            readOnly: this.props.readOnly, 
	            min: this.props.min, 
	            max: this.props.max})
	        )
	      )
	    )
	
	    function finished(){
	      this._focus(true, 'stop');
	    }
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
	
	  _focus: function(val, e){
	    if ( this.props.maintainFocus)
	      val && this.refs.currentView.getDOMNode().focus()
	  },
	
	  change: function(date){
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
	  },
	
	  _label: function() {
	    var view = this.state.view
	      , dt   = this.state.currentDate;
	
	    if ( view === 'month')
	      return dates.format(dt, dates.formats.MONTH_YEAR)
	
	    else if ( view === 'year')
	      return dates.format(dt, dates.formats.YEAR)
	
	    else if ( view === 'decade')
	      return dates.format(dates.firstOfDecade(dt),     dates.formats.YEAR)
	        + ' - ' + dates.format(dates.lastOfDecade(dt), dates.formats.YEAR)
	
	    else if ( view === 'century')
	      return dates.format(dates.firstOfCentury(dt),     dates.formats.YEAR)
	        + ' - ' + dates.format(dates.lastOfCentury(dt), dates.formats.YEAR)
	  },
	
	  inRangeValue: function(value){
	    if( value == null)
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
	
	module.exports = controlledInput.createControlledClass(
	    Calendar, { value: 'onChange' });
	
	module.exports.BaseCalendar = Calendar

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React  = __webpack_require__(1)
	  , cx     = __webpack_require__(13)
	  , _      = __webpack_require__(14) //pick, omit, has
	  , dates  = __webpack_require__(69)
	  , views  = __webpack_require__(70).calendarViews
	  , popups = __webpack_require__(70).datePopups
	
	  , Popup     = __webpack_require__(64)
	  , Calendar  = __webpack_require__(50).BaseCalendar
	  , Time      = __webpack_require__(71)
	  , DateInput = __webpack_require__(72)
	  , Btn       = __webpack_require__(66)
	  , CustomPropTypes = __webpack_require__(63)
	  , controlledInput = __webpack_require__(62);
	
	var viewEnum  = Object.keys(views).map( function(k)  {return views[k];} )
	
	var propTypes = {
	
	    //-- controlled props -----------
	    value:          React.PropTypes.instanceOf(Date),
	    onChange:       React.PropTypes.func,
	    open:           React.PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
	    onToggle:       React.PropTypes.func,
	    //------------------------------------
	
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
	    __webpack_require__(83),
	    __webpack_require__(89),
	    __webpack_require__(87)
	  ],
	
	  propTypes: propTypes,
	
	  getInitialState: function(){
	    return {
	      selectedIndex: 0,
	      open:          false
	    }
	  },
	
	  getDefaultProps: function(){
	    var cal  = _.has(this.props, 'calendar') ? this.props.calendar : true
	      , time = _.has(this.props, 'time') ? this.props.time : true
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
	          'rw-rtl':             this.isRtl()
	        })}), 
	        React.createElement(DateInput, {ref: "valueInput", 
	          'aria-activedescendant':  this.props.open
	            ? this.props.open === popups.CALENDAR ? this._id('_cal_view_selected_item') : timeOptID
	            : undefined, 
	          'aria-expanded':  this.props.open, 
	          'aria-busy': !!this.props.busy, 
	          'aria-owns': owns, 
	          'aria-haspopup': true, 
	          placeholder: this.props.placeholder, 
	          name: this.props.name, 
	          disabled: this.isDisabled(), 
	          readOnly: this.isReadOnly(), 
	          role: "combobox", 
	          value: this.props.value, 
	          focused: this.state.focused, 
	          format: this.props.format, 
	          editFormat: this.props.editFormat, 
	          editing: this.state.focused, 
	          parse: this._parse, 
	          onChange: this._change}), 
	
	        React.createElement("span", {className: "rw-select"}, 
	           this.props.calendar &&
	            React.createElement(Btn, {tabIndex: "-1", 
	              disabled: this.isDisabled() || this.isReadOnly(), 
	              'aria-disabled': this.isDisabled() || this.isReadOnly(), 
	              onClick: this._maybeHandle(this._click.bind(null, popups.CALENDAR))}, 
	              React.createElement("i", {className: "rw-i rw-i-calendar"}, React.createElement("span", {className: "rw-sr"},  this.props.messages.calendarButton))
	            ), 
	          
	           this.props.time &&
	            React.createElement(Btn, {tabIndex: "-1", 
	              disabled: this.isDisabled() || this.isReadOnly(), 
	              'aria-disabled': this.isDisabled() || this.isReadOnly(), 
	              onClick: this._maybeHandle(this._click.bind(null, popups.TIME))}, 
	              React.createElement("i", {className: "rw-i rw-i-clock-o"}, React.createElement("span", {className: "rw-sr"},  this.props.messages.timeButton))
	            )
	          
	        ), 
	         this.props.time &&
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
	                value: this.props.value, 
	                min: this.props.min, 
	                max: this.props.max, 
	                preserveDate: !!this.props.calendar, 
	                itemComponent: this.props.timeComponent, 
	                onSelect: this._maybeHandle(this._selectTime)})
	            )
	        ), 
	        
	         this.props.calendar &&
	          React.createElement(Popup, {
	            className: "rw-calendar-popup", 
	            open:  this.props.open === popups.CALENDAR, 
	            duration: this.props.duration, 
	            onRequestClose: this.close}, 
	
	            React.createElement(Calendar, React.__spread({},  calProps , 
	              {ref: "calPopup", 
	              id: dateListID, 
	              value: this.props.value || new Date, 
	              maintainFocus: false, 
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
	  },
	
	  //timeout prevents transitions from breaking focus
	  _focus: function(focused, e){
	    var self = this
	      , input =  this.refs.valueInput;
	
	    clearTimeout(self.timer)
	
	    self.timer = setTimeout(function(){
	
	      if(focused) input.getDOMNode().focus()
	      else        self.close()
	
	      if( focused !== self.state.focused)
	        self.setState({ focused: focused })
	
	    }, 0)
	  },
	
	  _selectDate: function(date){
	    this.close()
	    this._change(
	        dates.merge(date, this.props.value)
	      , formatDate(date, this.props.format)
	      , true)
	  },
	
	  _selectTime: function(datum){
	    this.close()
	    this._change(
	        dates.merge(this.props.value, datum.date)
	      , formatDate(datum.date, this.props.format)
	      , true)
	  },
	
	  _click: function(view, e){
	    this._focus(true)
	    this.toggle(view, e)
	  },
	
	  _parse: function(string){
	    var parser = typeof this.props.parse === 'function'
	          ? this.props.parse
	          : formatsParser.bind(null, _.splat(this.props.format).concat(this.props.parse));
	
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
	    if ( this.props.open !== view )
	      this.notify('onToggle', view)
	  },
	
	  close: function(){
	    if ( this.props.open)
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
	
	function formatDate(date, format){
	  var val = ''
	
	  if ( (date instanceof Date) && !isNaN(date.getTime()) )
	    val = dates.format(date, format)
	
	  return val;
	}
	
	module.exports.BaseDateTimePicker = DateTimePicker
	
	function formatsParser(formats, str){
	  var date;
	
	  formats = [].concat(formats)
	
	  for(var i=0; i < formats.length; i++ ){
	    date = dates.parse(str, formats[i])
	    if( date) return date
	  }
	  return null
	}
	


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , cx    = __webpack_require__(13)
	  , _     = __webpack_require__(14) //omit
	  , controlledInput  = __webpack_require__(62)
	  , directions = __webpack_require__(70).directions
	  , Input = __webpack_require__(78);
	
	var Btn = __webpack_require__(66)
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
	    __webpack_require__(83),
	    __webpack_require__(89),
	    __webpack_require__(87),
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
	    var $__0=   _.omit(this.props, Object.keys(propTypes)),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , val = this.inRangeValue(this.props.value)
	
	    //console.log('render', this.state.focused)
	
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
	          onKeyDown: this.props.onKeyDown})
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
	    var self = this;
	
	    clearTimeout(self.timer)
	
	    self.timer = setTimeout(function(){
	      var el = self.refs.input.getDOMNode()
	
	      focused && el.focus()
	
	      if( focused !== self.state.focused)
	        self.setState({ focused: focused })
	
	    }, 0)
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
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , cx    = __webpack_require__(13)
	  , _     = __webpack_require__(14)
	  , controlledInput  = __webpack_require__(62)
	  , CustomPropTypes  = __webpack_require__(63)
	  
	  , SelectInput = __webpack_require__(79)
	  , TagList     = __webpack_require__(80)
	  , Popup       = __webpack_require__(64)
	  , List        = __webpack_require__(65);
	
	var propTypes = {
	      data:           React.PropTypes.array,
	      //-- controlled props --
	      value:          React.PropTypes.array,
	      onChange:       React.PropTypes.func,
	
	      searchTerm:     React.PropTypes.string,
	      onSearch:       React.PropTypes.func,
	
	      open:           React.PropTypes.bool,
	      onToggle:       React.PropTypes.func,
	      //-------------------------------------------
	
	      valueField:     React.PropTypes.string,
	      textField:      React.PropTypes.string,
	
	      tagComponent:   CustomPropTypes.elementType,
	      itemComponent:  CustomPropTypes.elementType,
	
	      duration:       React.PropTypes.number, //popup
	
	      placeholder:    React.PropTypes.string,
	
	      disabled:       React.PropTypes.oneOfType([
	                        React.PropTypes.bool,
	                        React.PropTypes.array,
	                        React.PropTypes.oneOf(['disabled'])
	                      ]),
	
	      readOnly:       React.PropTypes.oneOfType([
	                        React.PropTypes.bool,
	                        React.PropTypes.array,
	                        React.PropTypes.oneOf(['readonly'])
	                      ]),
	
	      messages:       React.PropTypes.shape({
	        open:         React.PropTypes.string,
	        emptyList:    React.PropTypes.string,
	        emptyFilter:  React.PropTypes.string
	      })
	    };
	
	var Select = React.createClass({
	
	  displayName: 'Select',
	
	  mixins: [
	    __webpack_require__(83),
	    __webpack_require__(85),
	    __webpack_require__(86),
	    __webpack_require__(87),
	    __webpack_require__(88)('focusedIndex')
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
	        emptyList:   "There are no items in this list",
	        emptyFilter: "The filter returned no results"
	      }
	    }
	  },
	
	  getInitialState: function(){
	    var values = _.splat(this.props.value)
	
	    return {
	      focusedIndex:  0,
	      processedData: this.process(this.props.data, values, ''),
	      dataItems: values.map( function(item)  {return this._dataItem(this.props.data, item);}.bind(this))
	    }
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    var values = _.splat(nextProps.value)
	      , items  = this.process(nextProps.data, values, nextProps.searchTerm)
	
	    this.setState({
	      processedData: items,
	      dataItems: values.map( function(item)  {return this._dataItem(nextProps.data, item);}.bind(this))
	    })
	  },
	
	  render: function(){
	    var $__0=     _.omit(this.props, Object.keys(propTypes)),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , listID  = this._id('_listbox')
	      , optID   = this._id('_option')
	      , items   = this._data()
	      , values  = this.state.dataItems;
	
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
	            onChange: this._typing})
	        ), 
	        React.createElement(Popup, {open: this.props.open, onRequestClose: this.close, duration: this.props.duration}, 
	          React.createElement("div", null, 
	            React.createElement(List, {ref: "list", 
	              id: listID, 
	              optID: optID, 
	              'aria-autocomplete': "list", 
	              'aria-hidden':  !this.props.open, 
	              style: { maxHeight: 200, height: 'auto'}, 
	              data: items, 
	              textField: this.props.textField, 
	              valueField: this.props.valueField, 
	              focusedIndex: this.state.focusedIndex, 
	              onSelect: this._maybeHandle(this._onSelect), 
	              listItem: this.props.itemComponent, 
	              messages: {
	                emptyList: this.props.data.length
	                  ? this.props.messages.emptyFilter
	                  : this.props.messages.emptyList
	              }})
	          )
	        )
	      )
	    )
	  },
	
	  _data: function(){
	    return this.state.processedData
	  },
	
	  _delete: function(value){
	    this._focus(true)
	    this.change(
	      this.state.dataItems.filter( function(d)  {return d !== value;}))
	  },
	
	  _click: function(e){
	    this._focus(true)
	    !this.props.open && this.open()
	  },
	
	  _focus: function(focused, e){
	    var self = this;
	
	    if (this.props.disabled === true )
	      return
	
	    clearTimeout(self.timer)
	
	    self.timer = setTimeout(function(){
	      if(focused) self.refs.input.focus()
	      else        {
	        self.close()
	        self.refs.tagList && self.refs.tagList.clear()
	      }
	
	      if( focused !== self.state.focused)
	        self.setState({ focused: focused })
	    }, 0)
	  },
	
	  _typing: function(e){
	    this.notify('onSearch', [e.target.value])
	    this.open()
	  },
	
	  _onSelect: function(data){
	    if( data === undefined )
	      return //handle custom tags maybe here?
	
	    this.change(this.state.dataItems.concat(data))
	    this.close()
	    this._focus(true)
	  },
	
	  _keyDown: function(e){
	    var key = e.key
	      , alt = e.altKey
	      , searching = !!this.props.searchTerm
	      , isOpen  = this.props.open
	      , tagList = this.refs.tagList;
	
	    if ( key === 'ArrowDown') {
	      e.preventDefault()
	      if ( isOpen ) this.setFocusedIndex(this.nextFocusedIndex())
	      else          this.open()
	    }
	    else if ( key === 'ArrowUp') {
	      e.preventDefault()
	      if ( alt)          this.close()
	      else if ( isOpen ) this.setFocusedIndex(
	        this.prevFocusedIndex())
	    }
	    else if ( key === 'End'){
	      if ( isOpen ) this.setFocusedIndex(this._data().length - 1)
	      else          tagList && tagList.last()
	    }
	    else if (  key === 'Home'){
	      if ( isOpen ) this.setFocusedIndex(0)
	      else          tagList && tagList.first()
	    }
	    else if ( isOpen && key === 'Enter' )
	      this._onSelect(this._data()[this.state.focusedIndex])
	
	    else if ( key === 'Escape')
	      isOpen ? this.close() : this.refs.tagList.clear()
	
	    else if ( !searching && key === 'ArrowLeft')
	     tagList && tagList.prev()
	
	    else if ( !searching && key === 'ArrowRight')
	      tagList && tagList.next()
	
	    else if ( !searching && key === 'Delete')
	      tagList && tagList.removeCurrent()
	
	    else if ( !searching && key === 'Backspace')
	      tagList && tagList.removeNext()
	  },
	
	  change: function(data){
	    var change = this.props.onChange
	    if ( change ) change(data)
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
	
	  _placeholder: function(){
	    return (this.props.value || []).length
	      ? ''
	      : (this.props.placeholder || '')
	  }
	
	})
	
	
	module.exports = controlledInput.createControlledClass(
	    Select, { open: 'onToggle', value: 'onChange', searchTerm: 'onSearch' });
	
	module.exports.BaseMultiselect = Select

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , _  = __webpack_require__(14)
	  , cx = __webpack_require__(13)
	  , controlledInput  = __webpack_require__(62)
	  , CustomPropTypes  = __webpack_require__(63)
	  , scrollTo = __webpack_require__(81);
	
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
	    __webpack_require__(83),
	    __webpack_require__(84),
	    __webpack_require__(86),
	    __webpack_require__(87),
	    __webpack_require__(88)('focusedIndex', 'isDisabledItem')
	  ],
	
	  getDefaultProps: function(){
	    return {
	      delay: 250,
	      value: [],
	      data:  [],
	      messages: {
	        emptyList: 'There are no items in this list'
	      }
	    }
	  },
	
	  getDefaultState: function(props){
	    var isRadio = !props.multiple
	      , values  = _.splat(props.value)
	      , idx     = isRadio && this._dataIndexOf(props.data, values[0]) 
	
	    idx = isRadio && idx !== -1 
	      ? this.nextFocusedIndex(idx - 1) 
	      : ((this.state || {}).focusedIndex || -1)
	
	    return {
	      focusedIndex: idx,
	      dataItems:    !isRadio && values.map(function(item)  {return this._dataItem(props.data, item);}.bind(this))
	    }
	  },
	
	  getInitialState: function(){
	    return this.getDefaultState(this.props)
	  },
	
	  componentWillReceiveProps: function(nextProps) {
	    return this.setState(this.getDefaultState(nextProps))
	  },
	
	  componentDidUpdate: function(prevProps, prevState){
	    if ( prevState.focusedIndex !== this.state.focusedIndex)
	      this._setScrollPosition()
	  },
	
	  render: function() {
	    var $__0=     _.omit(this.props, Object.keys(propTypes)),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , focus = this._maybeHandle(this._focus.bind(null, true), true)
	      , optID = this._id('_selected_option')
	      , blur  = this._focus.bind(null, false);
	
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
	          'rw-selectlist':   true,
	          'rw-state-focus':    this.state.focused,
	          'rw-state-disabled': this.isDisabled(),
	          'rw-state-readonly': this.isReadOnly(),
	          'rw-rtl':            this.isRtl(),
	          'rw-loading-mask':   this.props.busy
	        })}), 
	
	        React.createElement("ul", {className: "rw-list", ref: "list"},  this._rows(optID))
	      ) 
	    );
	  },
	
	  _rows: function(optID){
	    var Component = this.props.itemComponent
	      , name = this._id('_name')
	      , type = this.props.multiple ? 'checkbox' : 'radio';
	
	    return this._data().map( function(item, idx)  {
	      var focused  = this.state.focused && this.state.focusedIndex === idx
	        , checked  = this._contains(item, this._values())
	        , change   = this._change.bind(null, item)
	        , disabled = this.isDisabledItem(item)
	        , readonly = this.isReadOnlyItem(item);
	
	      return (React.createElement("li", {
	        key: 'item_' + idx, 
	        role: "option", 
	        id:  focused ? optID : undefined, 
	        className: cx({ 'rw-state-focus': focused, 'rw-selectlist-item': true })}, 
	        React.createElement(SelectListItem, {
	          type: type, 
	          name: name, 
	          onChange: change, 
	          checked: checked, 
	          readOnly: readonly, 
	          disabled: disabled || readonly}, 
	           Component ? React.createElement(Component, {item: item}) : this._dataText(item)
	          )
	      ))
	    }.bind(this))
	  },
	
	  _keyDown: function(e){
	    var self = this
	      , key = e.key
	      , data = this._data()
	      , multiple = !!this.props.multiple
	      , last = data.length;
	
	    if ( key === 'End' ) {
	      e.preventDefault()
	
	      if ( multiple ) this.setFocusedIndex(this.prevFocusedIndex(last))
	      else            change(this.prevFocusedIndex(last)) 
	    }
	    else if ( key === 'Home' ) {
	      e.preventDefault()
	
	      if ( multiple ) this.setFocusedIndex(this.nextFocusedIndex(-1))
	      else            change(this.nextFocusedIndex(-1)) 
	    }
	    else if ( key === 'Enter' || key === ' ' ) {
	      e.preventDefault()
	      change(this.state.focusedIndex)
	    }
	    else if ( key === 'ArrowDown' || key === 'ArrowRight' ) {
	      e.preventDefault()
	
	      if ( multiple ) this.setFocusedIndex(this.nextFocusedIndex())
	      else            change(this.nextFocusedIndex())
	    }
	    else if ( key === 'ArrowUp' || key === 'A rrowLeft'  ) {
	      e.preventDefault()
	
	      if ( multiple ) this.setFocusedIndex(this.prevFocusedIndex())
	      else            change(this.prevFocusedIndex())
	    }
	    else if (this.props.multiple && e.keyCode === 65 && e.ctrlKey ) {
	      e.preventDefault()
	      this._selectAll() 
	    }
	    else
	      this.search(
	          String.fromCharCode(e.keyCode)
	        , this._locate)
	
	    function change(idx, cked){
	      var item = data[idx];
	      
	      if( idx > -1 && idx < last){
	        self._change(item, cked !== undefined 
	          ? cked
	          : multiple 
	            ? !self._contains(item, self._values()) // toggle value
	            : true)
	      }
	        
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
	
	    if(this._contains(item, blacklist)) return 
	
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
	  },
	
	  _setScrollPosition: function(){
	    var list = this.refs.list.getDOMNode()
	      , selected = list.children[this.state.focusedIndex]
	      , handler  = this.props.onMove || scrollTo;
	
	    if ( this.state.focusedIndex !== -1 )
	      handler(selected)
	  }
	
	});
	
	var SelectListItem = React.createClass({displayName: 'SelectListItem',
	
	  render: function() {
	    var $__0=   this.props,children=$__0.children,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{children:1});
	
	    return (
	      React.createElement("label", {
	        className: cx({ 
	          'rw-state-disabled': props.disabled,
	          'rw-state-readonly': props.readOnly
	        })}, 
	        React.createElement("input", React.__spread({},   props, 
	          {tabIndex: "-1", 
	          onChange: change, 
	          disabled: props.disabled || props.readOnly, 
	          'aria-disabled':  props.disabled ||props.readOnly})), 
	          children 
	      )
	    );
	
	    function change(e){
	      if( !props.disabled && !props.readOnly)
	        props.onChange(e.target.checked)
	    }
	  },
	
	})
	
	
	module.exports = SelectList;
	
	module.exports = controlledInput.createControlledClass(
	    SelectList, { value: 'onChange' });
	
	module.exports.BaseSelectList = SelectList

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A streamlined version of TransitionGroup built for managing at most two active children
	 * also provides additional hooks for animation start/end
	 * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
	 * relevent code is licensed accordingly 
	 */
	
	"use strict";
	
	var React = __webpack_require__(1)
	  , $     = __webpack_require__(60)
	  , _     = __webpack_require__(14);
	
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React   = __webpack_require__(1)
	  , ReplaceTransitionGroup  = __webpack_require__(55)
	  , _ = __webpack_require__(14)
	  , $  =  __webpack_require__(60);
	
	
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
/* 57 */
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
/* 58 */
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
/* 59 */
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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

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


/***/ },
/* 61 */
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(14) //invert, transform
	  , React = __webpack_require__(1)
	  , compat = __webpack_require__(90)
	
	
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
	
	  createControlledClass: function(Component, controlledValues, publicApi) {
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
	
	        props    = _.merge(this.props, props, handles)
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

/***/ },
/* 63 */
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
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React  = __webpack_require__(1)
	  , $ = __webpack_require__(60);
	
	
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
	    this.close(0)
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
	    var $__0=     this.props,className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React   = __webpack_require__(1)
	  , CustomPropTypes  = __webpack_require__(63)
	  , cx = __webpack_require__(13)
	  , _  = __webpack_require__(14);
	
	
	module.exports = React.createClass({
	
	  displayName: 'List',
	
	  mixins: [ 
	    __webpack_require__(86)
	  ],
	
	  propTypes: {
	    data:          React.PropTypes.array,
	    onSelect:      React.PropTypes.func,
	    listItem:      CustomPropTypes.elementType,
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
	      delay:         500,
	      optID:         '',
	      onSelect:      function(){},
	      data:          [],
	      messages: {
	        emptyList:   "There are no items in this list"
	      }
	    }
	  },
	
	  componentDidMount: function(prevProps, prevState){
	    this._setScrollPosition()
	  },
	
	  componentDidUpdate: function(prevProps, prevState){
	    if ( prevProps.focusedIndex !== this.props.focusedIndex)
	      this._setScrollPosition()
	  },
	
		render: function(){
	    var $__0=     _.omit(this.props, ['data', 'selectedIndex']),className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1})
	      , ItemComponent = this.props.listItem
	      , emptyList   = React.createElement("li", null,  this.props.messages.emptyList)
	      , items;
	    
	    items = this.props.data.map(function(item, idx){
	      var focused = this.props.focusedIndex === idx;
	
	      return (React.createElement("li", {
	        key: 'item_' + idx, 
	        role: "option", 
	        id:  focused ? this.props.optID : undefined, 
	        'aria-selected':  idx === this.props.selectedIndex, 
	        className: cx({ 
	          'rw-state-focus':    focused,
	          'rw-state-selected': idx === this.props.selectedIndex,
	        }), 
	        onClick: this.props.onSelect.bind(null, item, idx)}, 
	         ItemComponent
	            ? React.createElement(ItemComponent, {item: item})
	            : this._dataText(item)
	        
	      ))
	    }, this);
	    
			return (
				React.createElement("ul", React.__spread({},   props , 
	        {className:  className + ' rw-list', 
	        ref: "scrollable", 
	        role: "listbox", 
	        tabIndex: "-1", 
	        onKeyDown: this._keyDown, 
	        onKeyPress: this.search}), 
	         !this.props.data.length 
	          ? emptyList 
	          : items
				)
			)
		},
	
	  _setScrollPosition: function(){
	    var list = this.getDOMNode()
	      , selected = list.children[this.props.focusedIndex]
	      , scrollTop, listHeight, selectedTop, selectedHeight, bottom;
	
	    if( !selected ) return 
	
	    scrollTop   = list.scrollTop
	    listHeight  = list.clientHeight
	
	    selectedTop =  selected.offsetTop
	    selectedHeight = selected.offsetHeight
	
	    bottom =  selectedTop + selectedHeight
	
	    list.scrollTop = scrollTop > selectedTop
	      ? selectedTop
	      : bottom > (scrollTop + listHeight) 
	          ? (bottom - listHeight)
	          : scrollTop
	  }
	
	})

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1);
	
	module.exports = React.createClass({displayName: 'exports',
	
	  render: function(){
	  	var $__0=     this.props,className=$__0.className,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});
	
	    return (
	      React.createElement("button", React.__spread({},  props, {type: "button", className: className + ' rw-btn'}), 
	        this.props.children
	      )
	  	)
	  }
	})

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , caretPos = __webpack_require__(91);
	
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
/* 68 */
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
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dateMath = __webpack_require__(38)
	  , globalize = __webpack_require__(95)
	  , _ = __webpack_require__(14); //extend
	
	var dates = module.exports = _.extend(dateMath, {
	  // wrapper methods for isolating globalize use throughout the lib
	  // looking forward towards the 1.0 release
	  culture: function(){
	    return globalize.culture()
	  },
	
	  startOfWeek: function(date){
	    var culture = globalize.culture()
	
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
	
	  shortDaysOfWeek: function (){
	    var culture = dates.culture()
	      , start = dates.startOfWeek()
	      , days, front;
	
	    if (culture && culture.calendar){
	      days = culture.calendar.days.namesShort.slice()
	
	      if(start === 0 ) 
	        return days
	      
	      front = days.splice(0, start)
	      days  = days.concat(front)
	      return days
	    }
	  },
	
	  daysOfWeek: function(date, format){
	    var range = [0,1,2,3,4,5,6]
	    if (arguments.length === 1){
	      format = date
	      date = new Date()
	    }
	
	    format = format || 'do'
	
	    return range.map(function(i)  {return dates.format(dates.weekday(date, i), format);} )
	  },
	
	  months: function(date, format){
	    var months = [0,1,2,3,4,5,6,7,8,9,10,11]
	
	    if (arguments.length === 1){
	      format = date
	      date = new Date()
	    }
	    format = format || dates.formats.DAY_NAME_ABRV
	
	    return months.map( function(i)  {return dates.format(dates.month(date, i), format);})
	  },
	
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
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(14); //object
	
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , dates = __webpack_require__(69)
	  , List = __webpack_require__(65)
	  , CustomPropTypes  = __webpack_require__(63)
	  , _ = __webpack_require__(14) // omit
	
	
	module.exports = React.createClass({
	
	  displayName: 'TimeList',
	
	  mixins: [
	    __webpack_require__(84),
	    __webpack_require__(88)('selectedIndex'),
	    __webpack_require__(88)('focusedIndex')
	  ],
	
	  propTypes: {
	    value:          React.PropTypes.instanceOf(Date),
	    min:            React.PropTypes.instanceOf(Date),
	    max:            React.PropTypes.instanceOf(Date),
	    step:           React.PropTypes.number,
	    itemComponent:  CustomPropTypes.elementType,
	    onSelect:       React.PropTypes.func,
	    preserveDate:   React.PropTypes.bool,
	  },
	
	  getDefaultProps: function(){
	    return {
	      step:   30,
	      format: 't',
	      onSelect: function(){},
	      preserveDate: true,
	    }
	  },
	
	  getInitialState: function(){
	    var idx = this._selectedIndex(this._data(), this.props.value)
	
	    return { focusedIndex: idx === -1 ? 0 : idx}
	  },
	
	  render: function(){
	    var times = this._data()
	      , idx = this._selectedIndex(times, this.props.value);
	
	    return (
	      React.createElement(List, React.__spread({},  _.omit(this.props, 'value'), 
	        {ref: "list", 
	        data: times, 
	        textField: "label", 
	        valueField: "date", 
	        selectedIndex: idx, 
	        focusedIndex: this.state.focusedIndex, 
	        listItem: this.props.itemComponent, 
	        onSelect: this.props.onSelect}))
	    )
	
	  },
	
	  _selectedIndex: function(times, date){
	    var roundTo = 1000 * 60 * this.props.step
	      , idx = -1, label;
	
	    if( !date) return 0
	
	    date  = new Date(Math.floor(date.getTime() / roundTo) * roundTo)
	    label = dates.format(date, this.props.format)
	
	    times.every( function(time, i)  {
	      if( time.label === label ) return (idx = i), false
	      return true
	    })
	
	    return idx
	  },
	
	  _data: function(){
	    var times  = [], i = 0
	      , values = this._dateValues()
	      , start  = values.min
	      , startDay = dates.date(start);
	
	    // debugger;
	    while( i < 100 && (dates.date(start) === startDay && dates.lte(start, values.max) ) ) {
	      i++
	      times.push({ date: start, label: dates.format(start, this.props.format) })
	      start = dates.add(start, this.props.step || 30, 'minutes')
	    }
	    return times
	  },
	
	  _dateValues: function(){
	    var value = this.props.value || dates.today()
	      , useDate = this.props.preserveDate
	      , min = this.props.min
	      , max = this.props.max
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
	    var self = this
	      , key = e.key
	      , character = String.fromCharCode(e.keyCode);
	
	    if ( key === 'End' )
	      this.setFocusedIndex(
	        this._data().length - 1)
	
	    else if ( key === 'Home' )
	      this.setFocusedIndex(0)
	
	    else if ( key === 'Enter' )
	      this.props.onSelect(this._data()[this.state.focusedIndex])
	
	    else if ( key === 'ArrowDown' ) {
	      e.preventDefault()
	      this.setFocusedIndex(
	        this.nextFocusedIndex())
	    }
	    else if ( key === 'ArrowUp' ) {
	      e.preventDefault()
	      this.setFocusedIndex(
	        this.prevFocusedIndex())
	    }
	    else {
	      e.preventDefault()
	      this.search(character, function(word){
	        self.setFocusedIndex(
	          this.findNextWordIndex(word, self.state.focusedIndex))
	      })
	    }
	  }
	
	});


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , cx = __webpack_require__(13)
	  , dates = __webpack_require__(69);
	
	module.exports = React.createClass({
	
	  displayName: 'DatePickerInput',
	
	
	  propTypes: {
	    format:       React.PropTypes.string,
	    parse:        React.PropTypes.func.isRequired,
	
	    value:        React.PropTypes.instanceOf(Date),
	    onChange:     React.PropTypes.func.isRequired,
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
	              : nextProps.format)
	    })
	  },
	
	  getInitialState: function(){
	    var text = formatDate(
	            this.props.value
	          , this.props.editing && this.props.editFormat 
	              ? this.props.editFormat 
	              : this.props.format)
	
	    return {
	      textValue: text,
	      lastValue: text
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
	
	  _blur: function(){
	    var val = this.state.textValue
	
	    if ( val === this.state.lastValue) return
	
	    this.props.onChange(this.props.parse(val), val);
	    this.setState({ lastValue: val });
	  },
	
	  focus: function(){
	    this.getDOMNode().focus()
	  },
	
	  
	});
	
	function isValid(d) {
	  return !isNaN(d.getTime());
	}
	
	function formatDate(date, format){
	  var val = ''
	
	  if ( (date instanceof Date) && isValid(date) )
	    val = dates.format(date, format)
	
	  return val;
	}
	
	function chain(a,b, thisArg){
	  return function(){
	    a && a.apply(thisArg, arguments)
	    b && b.apply(thisArg, arguments)
	  }
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , Btn = __webpack_require__(66);
	
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
	    __webpack_require__(89),
	    __webpack_require__(92)
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
	          onClick: this.props.onMoveLeft, 
	          disabled: this.props.prevDisabled, 
	          'aria-disabled': this.props.prevDisabled, 
	          title: this.props.moveBack}, 
	          React.createElement("i", {className: "rw-i rw-i-caret-" + (rtl ? 'right' : 'left')}, 
	            React.createElement("span", {className: "rw-sr"}, this.props.moveBack))
	        ), 
	        React.createElement(Btn, {className: "rw-btn-view", 
	          id: this.props.labelId, 
	          onClick: this.props.onViewChange, 
	          disabled: this.props.upDisabled, 
	          'aria-disabled': this.props.upDisabled}, 
	           this.props.label
	        ), 
	        React.createElement(Btn, {className: "rw-btn-right", 
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
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , cx    = __webpack_require__(13)
	  , dates = __webpack_require__(69)
	  , directions = __webpack_require__(70).directions
	  , _   = __webpack_require__(14)
	  , Btn = __webpack_require__(66);
	
	var opposite = {
	  LEFT: directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	module.exports = React.createClass({
	
	  displayName: 'MonthView',
	
	  mixins: [
	    __webpack_require__(83),
	    __webpack_require__(92),
	    __webpack_require__(93)('month', 'day'),
	  ],
	
	  propTypes: {
	    culture:          React.PropTypes.array,
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
	        tabIndex: this.props.disabled ? '-1' : "0", 
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
	      React.createElement("tr", {key: 'week_' + i}, 
	       row.map( function(day, idx)  {
	        var focused  = dates.eq(day, this.state.focusedDate, 'day')
	          , selected = dates.eq(day, this.props.selectedDate, 'day');
	
	        return !dates.inRange(day, this.props.min, this.props.max)
	            ? React.createElement("td", {key: 'day_' + idx, className: "rw-empty-cell"}, " ")
	            : (React.createElement("td", {key: 'day_' + idx}, 
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
	                  dates.format(day, 'dd')
	                )
	              ))
	      }.bind(this))
	      )
	    )
	  },
	
	
	  _headers: function(format){
	    var days = dates.shortDaysOfWeek(format);
	
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React      = __webpack_require__(1)
	  , cx         = __webpack_require__(13)
	  , dates      = __webpack_require__(69)
	  , directions = __webpack_require__(70).directions
	  , Btn        = __webpack_require__(66)
	  , _          = __webpack_require__(14)
	
	var opposite = {
	  LEFT: directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	module.exports = React.createClass({
	
	  displayName: 'YearView',
	
	  mixins: [
	    __webpack_require__(83),
	    __webpack_require__(92),
	    __webpack_require__(93)('year', 'month')
	  ],
	
	  propTypes: {
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
	      React.createElement("tr", {key: i}, 
	       row.map( function(date, i)  {
	        var focused  = dates.eq(date, this.state.focusedDate,  'month')
	          , selected = dates.eq(date, this.props.value,  'month');
	
	        return dates.inRange(date, this.props.min, this.props.max, 'month')
	          ? (React.createElement("td", {key: i}, 
	              React.createElement(Btn, {onClick: this.props.onChange.bind(null, date), tabIndex: "-1", 
	                id: focused ? id : undefined, 
	                'aria-selected': selected, 
	                'aria-disabled': this.props.disabled, 
	                disabled: this.props.disabled, 
	                className: cx({
	                  'rw-state-focus':    focused,
	                  'rw-state-selected': selected
	                })}, 
	                 dates.format(date, dates.formats.MONTH_NAME_ABRV) 
	              )
	            ))
	          : React.createElement("td", {key: i, className: "rw-empty-cell"}, " ")
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
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , _ = __webpack_require__(14)
	  , cx    = __webpack_require__(13)
	  , dates = __webpack_require__(69)
	  , directions = __webpack_require__(70).directions
	  , Btn = __webpack_require__(66); 
	
	var opposite = {
	  LEFT: directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	
	module.exports = React.createClass({
	
	  displayName: 'DecadeView',
	
	  mixins: [
	    __webpack_require__(83),
	    __webpack_require__(89),
	    __webpack_require__(92),
	    __webpack_require__(93)('decade', 'year')
	  ],
	
	  propTypes: {
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
	      React.createElement("tr", {key: 'row_' + i}, 
	       row.map( function(date, i)  {
	        var focused  = dates.eq(date,  this.state.focusedDate,  'year')
	          , selected = dates.eq(date, this.props.value,  'year');
	
	        return !dates.inRange(date, this.props.min, this.props.max, 'year')
	          ? React.createElement("td", {key: i, className: "rw-empty-cell"}, " ")
	          : (React.createElement("td", {key: i}, 
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
	                 dates.format(date, dates.formats.YEAR) 
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React      = __webpack_require__(1)
	  , cx         = __webpack_require__(13)
	  , dates      = __webpack_require__(69)
	  , directions = __webpack_require__(70).directions
	  , Btn        = __webpack_require__(66)
	  , _          = __webpack_require__(14); //omit
	
	var opposite = {
	  LEFT:  directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	
	module.exports = React.createClass({
	
	  displayName: 'CenturyView',
	
	  mixins: [
	    __webpack_require__(83),
	    __webpack_require__(89),
	    __webpack_require__(92),
	    __webpack_require__(93)('century', 'decade')
	  ],
	
	  propTypes: {
	    value:         React.PropTypes.instanceOf(Date),
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
	      React.createElement("tr", {key: 'row_' + i}, 
	       row.map( function(date, i)  {
	        var focused  = dates.eq(date,  this.state.focusedDate,  'decade')
	          , selected = dates.eq(date, this.props.value,  'decade')
	          , d        = inRangeDate(date, this.props.min, this.props.max);
	
	        return !inRange(date, this.props.min, this.props.max)
	          ? React.createElement("td", {key: i, className: "rw-empty-cell"}, " ")
	          : (React.createElement("td", {key: i}, 
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
	                 label(date) 
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
	
	function label(date){
	  return dates.format(dates.startOf(date, 'decade'),    dates.formats.YEAR)
	    + ' - ' + dates.format(dates.endOf(date, 'decade'), dates.formats.YEAR)
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React   = __webpack_require__(1)
	  , setter  = __webpack_require__(68)
	  , globalize = __webpack_require__(95);
	
	
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
	        onKeyDown: this.props.onKeyDown, 
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
/* 79 */
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
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , _     = __webpack_require__(14)
	  , cx    = __webpack_require__(13)
	  , Btn   = __webpack_require__(66)
	
	module.exports = React.createClass({
	  
	  displayName: 'MultiselectTagList',
	
	  mixins: [
	    __webpack_require__(86),
	    __webpack_require__(89)
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
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(60)
	
	module.exports = function scrollTo( selected ) {
	  var offset = $.offset(selected)
	    , poff   = { top: 0, left: 0 }
	    , list, scrollTop, selectedTop
	    , selectedHeight, listHeight, bottom;
	
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

/***/ },
/* 82 */
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
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , _ =  __webpack_require__(14); //uniqueID
	
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React  = __webpack_require__(1)
	  , filter = __webpack_require__(61)
	  , helper = __webpack_require__(86)
	  , _      = __webpack_require__(14);
	
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
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React   = __webpack_require__(1)
	  , filters = __webpack_require__(61)
	  , helper  = __webpack_require__(86)
	  , _      = __webpack_require__(14);
	
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
	            : filters[this.props.filter || 'eq'];
	
	      if ( !searchTerm || !searchTerm.trim() || (this.props.filter && searchTerm.length < (this.props.minLength || 1)))
	        return -1
	
	      if ( !this.props.caseSensitive)
	        searchTerm = searchTerm.toLowerCase();
	
	      items.every( function(item, i)  {
	        var val = helper._dataText.call(this, item);
	
	        if ( !this.props.caseSensitive) 
	          val = val.toLowerCase();
	
	        if (matches(val, searchTerm.toLowerCase()))
	          return (idx = i), false
	
	        return true
	      }.bind(this))
	
	      return idx  
	    },
	
	    filter: function(items, searchTerm){
	      var matches = typeof this.props.filter === 'string'
	            ? filters[this.props.filter]
	            : this.props.filter;
	
	      if ( !matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1))
	        return items
	
	      if ( !this.props.caseSensitive)
	        searchTerm = searchTerm.toLowerCase();
	
	      return items.filter( function(item)  {
	        var val = helper._dataText.call(this, item);
	
	        if ( !this.props.caseSensitive)
	          val = val.toLowerCase();
	
	        return matches(val, searchTerm.toLowerCase())
	      }.bind(this))
	    }
	  }


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , _ =  __webpack_require__(14)
	
	module.exports = {
	  
	  propTypes: {    
	    valueField: React.PropTypes.string,
	    textField:  React.PropTypes.string
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
/* 87 */
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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React  = __webpack_require__(1);
	
	module.exports = function(stateKey, disabled) {
	  var methodName = stateKey.charAt(0).toUpperCase() + stateKey.substr(1);
	
	
	  var mixin = {
	  
	    propTypes: {
	      data:          React.PropTypes.array,
	      value:         React.PropTypes.any
	    }
	  }
	
	  mixin['set' + methodName] = function(idx){
	    var state = {}; state[stateKey] = idx;
	
	    if(idx !== -1) 
	      this.setState(state);
	    return this
	  }
	
	  mixin['prev' + methodName] = function(nextIdx){
	    var data = this._data()
	      , stateIdx = this.state && this.state[stateKey] || 0;
	    
	    nextIdx = (nextIdx === undefined ? stateIdx : nextIdx) -1;
	
	    while( nextIdx > -1 && isDisabled(this, data[nextIdx])) nextIdx--
	
	    if ( nextIdx < 0 ) 
	      nextIdx = disabled ? -1 : 0
	    
	    return nextIdx;
	  }
	
	  mixin['next' + methodName] = function(nextIdx){
	    var data = this._data()
	      , stateIdx = this.state && this.state[stateKey] || 0;
	
	    nextIdx = (nextIdx === undefined ? stateIdx : nextIdx) + 1
	
	    while( nextIdx < data.length && isDisabled(this, data[nextIdx])) nextIdx++
	
	    if ( nextIdx >= data.length )
	      nextIdx = disabled ? -1 : data.length - 1;
	
	    return nextIdx;
	  }
	
	  function isDisabled(ctx, item){
	    return disabled && ctx[disabled](item)
	  }
	
	  return mixin;
	}


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var _ = __webpack_require__(14)
	
	//backport PureRenderEqual
	module.exports = {
	
	  shouldComponentUpdate: function(nextProps, nextState) {
	    return !_.isShallowEqual(this.props, nextProps) ||
	           !_.isShallowEqual(this.state, nextState);
	  }
	}
	


/***/ },
/* 90 */
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
	          return console.warn(err instanceof Error ? err.message : err)
	
	        return err
	      }
	
	    }
	  }
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 92 */
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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1)
	  , dates = __webpack_require__(69)
	  , directions = __webpack_require__(70).directions;
	
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
	
	      if ( key === 'Enter')
	        return this.props.onChange(date)
	      
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
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 95 */
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


/***/ }
/******/ ])
//# sourceMappingURL=docs.js.map