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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var testsContext = __webpack_require__(1);
	testsContext.keys().forEach(testsContext);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./DataHelperMixin.browser.js": 2,
		"./calendar.browser.jsx": 3,
		"./datetimepicker.browser.jsx": 5,
		"./dom.browser.js": 6,
		"./month.browser.jsx": 10,
		"./multiselect.browser.jsx": 11,
		"./numberpicker.browser.jsx": 12,
		"./util.browser.js": 13
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 1;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*global it, describe, expect, beforeEach */
	var React = __webpack_require__(14),
	    helper = __webpack_require__(17);
	
	var render = React.addons.TestUtils.renderIntoDocument;
	
	describe("when using DATA HELPER MIXIN", function () {
	  var Component, data;
	
	  beforeEach(function () {
	    Component = React.createClass({
	      displayName: "Component",
	
	      mixins: [helper],
	
	      _data: function () {
	        return data;
	      },
	
	      render: function () {
	        return null;
	      }
	    });
	  });
	
	  it("should get a Value Out", function () {
	    var instance = render(React.createElement(Component));
	
	    expect(instance._dataValue(1)).to.equal(1);
	    expect(instance._dataValue({ a: 3 })).to.eql({ a: 3 });
	
	    instance = render(React.createElement(Component, { valueField: "value" }));
	
	    expect(instance._dataValue(1)).to.equal(1);
	    expect(instance._dataValue({ value: 1 })).to.equal(1);
	    expect(instance._dataValue({ value: { a: 3 } })).to.eql({ a: 3 });
	  });
	
	  it("should get Text Out", function () {
	    var instance = render(React.createElement(Component));
	
	    expect(instance._dataText("hi")).to.equal("hi");
	    expect(instance._dataText({ a: 3 })).to.equal("[object Object]");
	
	    instance = render(React.createElement(Component, { textField: "text" }));
	
	    expect(instance._dataText("hi")).to.equal("hi");
	    expect(instance._dataText({ text: "hi" })).to.equal("hi");
	    expect(instance._dataText({ text: { a: 3 } })).to.eql("[object Object]");
	  });
	
	  it("should work with indexOf", function () {
	    var instance = render(React.createElement(Component)),
	        val = { value: 3 };
	
	    expect(instance._dataIndexOf([2, 3, 1], 1)).to.equal(2);
	
	    expect(instance._dataIndexOf([{}, val, {}], val)).to.equal(1);
	
	    expect(instance._dataIndexOf([{}, val, {}], { value: 3 })).to.equal(1);
	
	    instance = render(React.createElement(Component, { valueField: "value" }));
	
	    expect(instance._dataIndexOf([{}, val, {}], 3)).to.equal(1);
	
	    expect(instance._dataIndexOf([{}, {}, { value: { a: 2 } }], { a: 2 })).to.equal(2);
	  });
	});
	// it.only('should find a dataItem', function(){
	//   var instance = render(React.createElement(Component))
	//     , val = { value: 3 }

	// })

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	/*global it, describe, expect, sinon, $*/
	__webpack_require__(16);
	
	var React = __webpack_require__(14),
	    Calendar = __webpack_require__(18),
	    BaseCalendar = __webpack_require__(18).BaseCalendar,
	    Header = __webpack_require__(19),
	    Footer = __webpack_require__(20),
	    Month = __webpack_require__(21),
	    Year = __webpack_require__(22),
	    Decade = __webpack_require__(23),
	    Century = __webpack_require__(24),
	    DOM = __webpack_require__(38),
	    dates = __webpack_require__(25),
	    globalize = __webpack_require__(41);
	
	var TestUtils = React.addons.TestUtils,
	    render = TestUtils.renderIntoDocument,
	    findTag = TestUtils.findRenderedDOMComponentWithTag,
	    findClass = TestUtils.findRenderedDOMComponentWithClass,
	    findType = TestUtils.findRenderedComponentWithType,
	    trigger = TestUtils.Simulate;
	
	describe("Calendar", function () {
	
	    afterEach(function () {
	        DOM.animate.restore && DOM.animate.restore();
	    });
	
	    it("should set Initial View", function () {
	        var date = new Date(),
	            picker = render(React.createElement(Calendar, { defaultValue: date, initialView: "year" }));
	
	        expect(function () {
	            return findType(picker, __webpack_require__(22));
	        }).to.not.throwException();
	    });
	
	    it("should click up through views", function () {
	        var date = new Date(),
	            picker = render(React.createElement(Calendar, { defaultValue: date })),
	            header = findType(picker, Header),
	            navBtn = findClass(header, "rw-btn-view").getDOMNode();
	
	        expect(function () {
	            return findType(picker, Month);
	        }).to.not.throwException();
	
	        trigger.click(navBtn);
	
	        expect(function () {
	            return findType(picker, Year);
	        }).to.not.throwException();
	
	        trigger.click(navBtn);
	
	        expect(function () {
	            return findType(picker, Decade);
	        }).to.not.throwException();
	
	        trigger.click(navBtn);
	
	        expect(function () {
	            return findType(picker, Century);
	        }).to.not.throwException();
	
	        expect(navBtn.hasAttribute("disabled")).to.be(true);
	    });
	
	    it("should key up through views", function () {
	        var date = new Date(),
	            picker = render(React.createElement(Calendar, { defaultValue: date }));
	
	        expect(function () {
	            return findType(picker, Month);
	        }).to.not.throwException();
	
	        trigger.keyDown(picker.getDOMNode(), { ctrlKey: true, key: "ArrowUp" });
	
	        expect(function () {
	            return findType(picker, Year);
	        }).to.not.throwException();
	
	        trigger.keyDown(picker.getDOMNode(), { ctrlKey: true, key: "ArrowUp" });
	
	        expect(function () {
	            return findType(picker, Decade);
	        }).to.not.throwException();
	
	        trigger.keyDown(picker.getDOMNode(), { ctrlKey: true, key: "ArrowUp" });
	
	        expect(function () {
	            return findType(picker, Century);
	        }).to.not.throwException();
	    });
	
	    it("should navigate into the past", function () {
	        var date = new Date(2014, 5, 15, 0, 0, 0),
	            picker = render(React.createElement(Calendar, { defaultValue: date })),
	            header = findType(picker, Header),
	            leftBtn = findClass(header, "rw-btn-left").getDOMNode(),
	            navBtn = findClass(header, "rw-btn-view").getDOMNode();
	
	        syncAnimate();
	
	        trigger.click(leftBtn);
	
	        expect(findType(picker, Month).state.focusedDate.getMonth()).to.be(4);
	
	        trigger.click(navBtn);
	        trigger.click(leftBtn);
	
	        expect(findType(picker, Year).state.focusedDate.getFullYear()).to.be(2013);
	
	        trigger.click(navBtn);
	        trigger.click(leftBtn);
	
	        expect(findType(picker, Decade).state.focusedDate.getFullYear()).to.be(2003);
	
	        trigger.click(navBtn);
	        trigger.click(leftBtn);
	
	        expect(findType(picker, Century).state.focusedDate.getFullYear()).to.be(1903);
	    });
	
	    it("should navigate into the future", function () {
	        var date = new Date(2014, 5, 15, 0, 0, 0),
	            picker = render(React.createElement(Calendar, { defaultValue: date, max: new Date(2199, 11, 31) })),
	            header = findType(picker, Header),
	            rightBtn = findClass(header, "rw-btn-right").getDOMNode(),
	            navBtn = findClass(header, "rw-btn-view").getDOMNode();
	
	        syncAnimate();
	
	        trigger.click(rightBtn);
	
	        expect(findType(picker, Month).state.focusedDate.getMonth()).to.be(6);
	
	        trigger.click(navBtn);
	        trigger.click(rightBtn);
	
	        expect(findType(picker, Year).state.focusedDate.getFullYear()).to.be(2015);
	
	        trigger.click(navBtn);
	        trigger.click(rightBtn);
	
	        expect(findType(picker, Decade).state.focusedDate.getFullYear()).to.be(2025);
	
	        trigger.click(navBtn);
	        trigger.click(rightBtn);
	
	        expect(findType(picker, Century).state.focusedDate.getFullYear()).to.be(2125);
	    });
	
	    it("should have a footer", function () {
	        var picker = render(React.createElement(BaseCalendar, null)),
	            footer;
	
	        expect(function () {
	            return findType(picker, Footer);
	        }).to.throwException();
	
	        picker = render(React.createElement(BaseCalendar, { footer: true }));
	
	        expect(function () {
	            return footer = findType(picker, Footer);
	        }).to.not.throwException();
	
	        expect($(footer.getDOMNode()).text()).to.equal(globalize.format(new Date(), "D"));
	    });
	
	    it("should accept footer format", function () {
	        var formatter = sinon.spy(function (dt, culture) {
	            expect(dt).to.be.a(Date);
	            expect(culture).to.be.a("string").and.equal("en");
	            return "test";
	        });
	
	        var picker = render(React.createElement(BaseCalendar, { footer: true, footerFormat: formatter, culture: "en" })),
	            footer = findType(picker, Footer);
	
	        expect($(footer.getDOMNode()).text()).to.equal("test");
	
	        expect(formatter.calledOnce).to.be.ok();
	    });
	
	    it("should navigate to footer date", function () {
	        var picker = render(React.createElement(BaseCalendar, { footer: true, value: new Date(2013, 5, 15) })),
	            footer = findType(picker, Footer);
	
	        trigger.click(findClass(footer, "rw-btn").getDOMNode());
	
	        expect(dates.eq(picker.state.currentDate, new Date(), "day")).to.be.ok();
	    });
	
	    it("should constrain movement by min and max", function () {
	        var date = new Date(2014, 5, 15),
	            picker = render(React.createElement(BaseCalendar, { value: date, max: new Date(2014, 5, 25), min: new Date(2014, 5, 5), onChange: function () {} })),
	            header = findType(picker, Header),
	            rightBtn = findClass(header, "rw-btn-right").getDOMNode(),
	            leftBtn = findClass(header, "rw-btn-left").getDOMNode();
	
	        trigger.click(rightBtn);
	
	        expect(picker.state.currentDate).to.eql(date);
	
	        trigger.click(leftBtn);
	
	        expect(picker.state.currentDate).to.eql(date);
	    });
	
	    it("should use passed in culture", function () {
	        __webpack_require__(39);
	
	        var date = new Date(2014, 5, 15),
	            picker = render(React.createElement(BaseCalendar, { value: date, culture: "es", onChange: function () {} })),
	            headerBtn = findClass(picker, "rw-btn-view").getDOMNode(),
	            head = findTag(picker, "thead").getDOMNode();
	
	        syncAnimate();
	
	        expect($(headerBtn).text()).to.equal("junio 2014");
	        expect($(head.children[0].firstChild).text()).to.equal("lu");
	
	        picker.setProps({ initialView: "year" });
	
	        expect($(findTag(picker, "tbody").getDOMNode().children[0].firstChild).text()).to.equal("ene");
	    });
	
	    it("should pass on format", function () {
	        var date = new Date(2014, 5, 15),
	            first = function () {
	            return $(calendar.getDOMNode()).find("td:first");
	        },
	            formats = _.transform(["dayFormat", "dateFormat", "monthFormat", "yearFormat", "decadeFormat"], function (o, v) {
	            return o[v] = v;
	        }),
	            calendar;
	
	        syncAnimate();
	
	        calendar = render(React.createElement(BaseCalendar, _extends({}, formats, { value: date, onChange: function () {} })));
	
	        expect(findType(calendar, Month).props.dayFormat).to.equal("dayFormat");
	        expect(findType(calendar, Month).props.dateFormat).to.equal("dateFormat");
	
	        calendar.setProps({ initialView: "year" });
	
	        expect(findType(calendar, Year).props.monthFormat).to.equal("monthFormat");
	
	        calendar.setProps({ initialView: "decade" });
	
	        expect(findType(calendar, Decade).props.yearFormat).to.equal("yearFormat");
	
	        calendar.setProps({ initialView: "century" });
	
	        expect(findType(calendar, Century).props.decadeFormat).to.equal("decadeFormat");
	    });
	});
	
	function syncAnimate() {
	    return sinon.stub(DOM, "animate", function (node, properties, duration, easing, callback) {
	        typeof easing === "function" ? easing() : callback();
	    });
	}

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*global it, describe, expect, sinon*/
	__webpack_require__(16);
	
	var React = __webpack_require__(14);
	var DateTimePicker = __webpack_require__(26),
	    Calendar = __webpack_require__(18).BaseCalendar,
	    Globalize = __webpack_require__(41);
	
	var TestUtils = React.addons.TestUtils,
	    render = TestUtils.renderIntoDocument,
	    findTag = TestUtils.findRenderedDOMComponentWithTag,
	    findClass = TestUtils.findRenderedDOMComponentWithClass,
	    findType = TestUtils.findRenderedComponentWithType,
	    findAllType = TestUtils.scryRenderedComponentsWithType,
	    trigger = TestUtils.Simulate;
	
	describe("DateTimePicker", function () {
	
	  it("should set initial values", function () {
	    var date = new Date(),
	        picker = render(React.createElement(DateTimePicker, { defaultValue: date, format: "MM-dd-yyyy" })),
	        input = findClass(picker, "rw-input").getDOMNode();
	
	    expect(input.value).to.be(Globalize.format(date, "MM-dd-yyyy"));
	  });
	
	  it("should start closed", function (done) {
	    var picker = render(React.createElement(DateTimePicker, { defaultValue: new Date() }));
	    var popups = findAllType(picker, __webpack_require__(27));
	
	    expect(picker.state.open).to.not.be(true);
	    expect(picker.getDOMNode().className).to.not.match(/\brw-open\b/);
	
	    expect(findClass(picker, "rw-input").getDOMNode().getAttribute("aria-expanded")).to.be("false");
	
	    setTimeout(function () {
	      expect(popups.length).to.be(2);
	      popups.forEach(function (popup) {
	        return expect(popup.getDOMNode().style.display).to.be("none");
	      });
	      done();
	    });
	  });
	
	  it("should open when clicked", function () {
	    var onOpen = sinon.spy(),
	        picker = render(React.createElement(DateTimePicker, { onToggle: onOpen }));
	
	    trigger.click(findClass(picker, "rw-btn-calendar").getDOMNode());
	
	    expect(onOpen.calledOnce).to.be(true);
	
	    trigger.click(findClass(picker, "rw-btn-time").getDOMNode());
	
	    expect(onOpen.calledTwice).to.be(true);
	  });
	
	  it("should change when selecting a time or date", function () {
	    var change = sinon.spy(),
	        picker = render(React.createElement(DateTimePicker, { onChange: change, open: "calendar", onToggle: function () {} })),
	        calendar = findType(picker, Calendar),
	        timelist = findType(picker, __webpack_require__(28)).getDOMNode().children;
	
	    calendar.change(new Date());
	    expect(change.calledOnce).to.be(true);
	    trigger.click(timelist[0]);
	
	    expect(change.calledTwice).to.be(true);
	  });
	
	  it("should not show time button when not selected", function () {
	    var spy,
	        picker = render(React.createElement(DateTimePicker, { time: false, calendar: false, onToggle: spy = sinon.spy() }));
	
	    expect(function () {
	      return findClass(picker, "rw-btn-time");
	    }).to.throwException(/Did not find exactly one match for class:rw-btn-time/);
	
	    expect(function () {
	      return findClass(picker, "rw-btn-calendar");
	    }).to.throwException(/Did not find exactly one match for class:rw-btn-calendar/);
	
	    //make sure keyboard shortcuts don't work either
	    trigger.keyDown(picker.getDOMNode(), { altKey: true });
	    expect(spy.callCount).to.be(0);
	    trigger.keyDown(picker.getDOMNode(), { altKey: true });
	    expect(spy.callCount).to.be(0);
	  });
	
	  it("should trigger focus/blur events", function (done) {
	    var blur = sinon.spy(),
	        focus = sinon.spy(),
	        picker = render(React.createElement(DateTimePicker, { onBlur: blur, onFocus: focus }));
	
	    expect(focus.calledOnce).to.be(false);
	    expect(blur.calledOnce).to.be(false);
	
	    trigger.focus(picker.getDOMNode());
	
	    setTimeout(function () {
	      expect(focus.calledOnce).to.be(true);
	      trigger.blur(picker.getDOMNode());
	
	      setTimeout(function () {
	        expect(blur.calledOnce).to.be(true);
	        done();
	      });
	    });
	  });
	
	  it("should trigger key events", function () {
	    var kp = sinon.spy(),
	        kd = sinon.spy(),
	        ku = sinon.spy(),
	        picker = render(React.createElement(DateTimePicker, { onKeyPress: kp, onKeyUp: ku, onKeyDown: kd })),
	        input = findClass(picker, "rw-input").getDOMNode();
	
	    trigger.keyPress(input);
	    trigger.keyDown(input);
	    trigger.keyUp(input);
	
	    expect(kp.calledOnce).to.be(true);
	    expect(kd.calledOnce).to.be(true);
	    expect(ku.calledOnce).to.be(true);
	  });
	
	  it("should do nothing when disabled", function (done) {
	    var picker = render(React.createElement(DateTimePicker, { defaultValue: new Date(), disabled: true })),
	        input = findClass(picker, "rw-input").getDOMNode();
	
	    expect(input.hasAttribute("disabled")).to.be(true);
	
	    trigger.click(findClass(picker, "rw-i-calendar").getDOMNode());
	
	    setTimeout(function () {
	      expect(picker.state.open).to.not.be(true);
	      done();
	    });
	  });
	
	  it("should do nothing when readonly", function (done) {
	    var picker = render(React.createElement(DateTimePicker, { defaultValue: new Date(), readOnly: true })),
	        input = findClass(picker, "rw-input").getDOMNode();
	
	    expect(input.hasAttribute("readonly")).to.be(true);
	
	    trigger.click(findClass(picker, "rw-i-calendar").getDOMNode());
	
	    setTimeout(function () {
	      expect(picker.state.open).to.not.be(true);
	      done();
	    });
	  });
	
	  it("should call Select handler", function () {
	    var change = sinon.spy(),
	        select = sinon.spy(),
	        picker = render(React.createElement(DateTimePicker, { onChange: change, onSelect: select })),
	        calendar = findType(picker, Calendar),
	        timelist = findType(picker, __webpack_require__(28)).getDOMNode().children;
	
	    calendar.change(new Date());
	
	    expect(select.calledOnce).to.be(true);
	    expect(change.calledAfter(select)).to.be(true);
	
	    select.reset();
	    change.reset();
	
	    trigger.click(timelist[0]);
	    expect(select.calledOnce).to.be(true);
	    expect(change.calledAfter(select)).to.be(true);
	  });
	
	  it("should change values on key down", function () {
	    var change = sinon.spy(),
	        picker = render(React.createElement(DateTimePicker, { onChange: change })),
	        timelist = findType(picker, __webpack_require__(28)).getDOMNode().children;
	
	    trigger.keyDown(picker.getDOMNode(), { key: "ArrowDown", altKey: true });
	    expect(picker.state.open).to.be("calendar");
	
	    trigger.keyDown(picker.getDOMNode(), { key: "ArrowDown", altKey: true });
	    expect(picker.state.open).to.be("time");
	
	    trigger.keyDown(picker.getDOMNode(), { key: "Home" });
	
	    expect(timelist[0].className).to.match(/\brw-state-focus\b/);
	
	    trigger.keyDown(picker.getDOMNode(), { key: "End" });
	
	    expect(timelist[timelist.length - 1].className).to.match(/\brw-state-focus\b/);
	
	    trigger.keyDown(picker.getDOMNode(), { key: "ArrowUp" });
	    expect(timelist[timelist.length - 2].className).to.match(/\brw-state-focus\b/);
	
	    trigger.keyDown(picker.getDOMNode(), { key: "ArrowDown" });
	    expect(timelist[timelist.length - 1].className).to.match(/\brw-state-focus\b/);
	  });
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*global it, describe, expect, $ */
	__webpack_require__(16);
	
	var DOM = __webpack_require__(38);
	
	// not everything just stuff that ie hates
	describe("DOM Work", function () {
	
	  it("should set css values", function () {
	    $("body").html("<div/>");
	
	    DOM.css($("body > div")[0], { height: "15px" });
	
	    expect(DOM.css($("body > div")[0], "height")).to.be("15px");
	  });
	
	  it("should get scrollParent", function () {
	    $("body").html("<div style=\"height: 200px; overflow:scroll;\"><div style=\"height: 500px\"/></div>");
	
	    var parent = DOM.scrollParent($("body > div > div")[0]);
	
	    expect(parent).to.be($("body > div")[0]);
	  });
	});

/***/ },
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*global it, describe, expect, sinon*/
	var React = __webpack_require__(14);
	var Month = __webpack_require__(21),
	    directions = __webpack_require__(29).directions,
	    Globalize = __webpack_require__(41);
	
	var TestUtils = React.addons.TestUtils,
	    render = TestUtils.renderIntoDocument,
	    findTag = TestUtils.findRenderedDOMComponentWithTag,
	    findClass = TestUtils.findRenderedDOMComponentWithClass,
	    findType = TestUtils.findRenderedComponentWithType,
	    findAllType = TestUtils.scryRenderedComponentsWithType,
	    trigger = TestUtils.Simulate;
	
	describe("Month Component", function () {
	
	    it("should move to an appropriate date", function () {
	        var date = new Date(2014, 0, 16, 0, 0, 0),
	            picker = render(React.createElement(Month, { value: date, onChange: function () {}, dateFormat: "dd", dayFormat: "d" }));
	
	        expect(picker.move(date, directions.RIGHT).toString()).to.equal(new Date(2014, 0, 17, 0, 0, 0).toString());
	
	        expect(picker.move(date, directions.UP).toString()).to.equal(new Date(2014, 0, 9, 0, 0, 0).toString());
	
	        expect(picker.move(date, directions.DOWN).toString()).to.equal(new Date(2014, 0, 23, 0, 0, 0).toString());
	
	        picker.setProps({
	            min: new Date(2014, 0, 11, 0, 0, 0),
	            max: new Date(2014, 0, 20, 0, 0, 0)
	        });
	
	        expect(picker.move(date, directions.UP)).to.eql(date);
	
	        expect(picker.move(date, directions.DOWN)).to.eql(date);
	    });
	
	    it("should use the right format", function () {
	        var date = new Date(2015, 1, 16, 0, 0, 0),
	            formatter = sinon.spy(function () {
	            return "hi";
	        }),
	            picker = render(React.createElement(Month, { value: date, onChange: function () {}, dateFormat: "dd", dayFormat: "d" })),
	            first = function () {
	            return $(picker.getDOMNode()).find("td:first");
	        };
	
	        expect(first().text()).to.equal("01");
	
	        picker = render(React.createElement(Month, { value: date, onChange: function () {}, dateFormat: "-d", dayFormat: "d" }));
	
	        expect(first().text()).to.equal("-1");
	
	        picker = render(React.createElement(Month, { value: date, onChange: function () {}, dateFormat: formatter, culture: "en", dayFormat: "d" }));
	
	        expect(formatter.called).to.be.ok();
	
	        expect(formatter.args[0].length).to.equal(2);
	        expect(formatter.args[0][0]).to.be.a(Date);
	        expect(formatter.args[0][1]).to.be.a("string").and.to.equal("en");
	
	        expect(first().text()).to.equal("hi");
	    });
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*global it, describe, expect, sinon, $ */
	__webpack_require__(16);
	
	var React = __webpack_require__(14);
	var Select = __webpack_require__(30),
	    TagList = __webpack_require__(31);
	
	var TestUtils = React.addons.TestUtils,
	    render = TestUtils.renderIntoDocument,
	    findTag = TestUtils.findRenderedDOMComponentWithTag,
	    findClass = TestUtils.findRenderedDOMComponentWithClass,
	    findType = TestUtils.findRenderedComponentWithType,
	    trigger = TestUtils.Simulate;
	
	describe("Multiselect", function () {
	    var dataList = [{ label: "jimmy", id: 0 }, { label: "sally", id: 1 }, { label: "pat", id: 2 }];
	
	    it("should set initial values", function () {
	        var select = render(React.createElement(Select, { value: ["hello"], onChange: function () {} })),
	            tags = findType(select, TagList).getDOMNode();
	
	        expect($(tags).find("li:first-child > span").text()).to.be("hello");
	    });
	
	    it("should respect textField and valueFields", function () {
	        var select = render(React.createElement(Select, { defaultValue: [0], data: dataList, textField: "label", valueField: "id" })),
	            tags = findType(select, TagList).getDOMNode();
	
	        expect($(tags).find("li:first-child > span").text()).to.be("jimmy");
	    });
	
	    it("should start closed", function (done) {
	        var select = render(React.createElement(Select, { defaultValue: [0], data: dataList, textField: "label", valueField: "id" }));
	        var popup = findType(select, __webpack_require__(27));
	
	        expect(select.state.open).to.not.be(true);
	        expect(select.getDOMNode().className).to.not.match(/\brw-open\b/);
	        expect(findClass(select, "rw-input").getDOMNode().getAttribute("aria-expanded")).to.be("false");
	
	        setTimeout(function () {
	            expect($(popup.getDOMNode()).css("display")).to.be("none");
	            done();
	        }, 0);
	    });
	
	    it("should open when focused", function (done) {
	        var select = render(React.createElement(Select, { defaultValue: ["jimmy"], data: dataList, duration: 0 }));
	        var popup = findType(select, __webpack_require__(27));
	
	        trigger.focus(select.getDOMNode());
	
	        setTimeout(function () {
	            expect(select.state.open).to.be(true);
	            expect(select.getDOMNode().className).to.match(/\brw-open\b/);
	            expect(findClass(select, "rw-input").getDOMNode().getAttribute("aria-expanded")).to.be("true");
	            expect(popup.props.open).to.be(true);
	            done();
	        });
	    });
	
	    it("should remove tag when clicked", function () {
	        var del = sinon.spy(),
	            tags = render(React.createElement(TagList, { value: [dataList[0], dataList[1]], data: dataList, textField: "label", valueField: "id", onDelete: del })).getDOMNode();
	
	        expect($(tags).children().length).to.be(2);
	        trigger.click(tags.children[1].children[1]); // click button
	
	        expect(del.calledOnce).to.be(true);
	        expect(del.calledWith(dataList[1])).to.be(true);
	    });
	
	    it("should change value when tag is clicked", function () {
	        var change = sinon.spy(),
	            select = render(React.createElement(Select, { onChange: change, value: [dataList[0], dataList[1]], data: dataList, textField: "label", valueField: "id" })),
	            tags = findType(select, TagList).getDOMNode();
	
	        expect($(tags).children().length).to.be(2);
	        trigger.click(tags.children[1].children[1]); // click button
	
	        expect(change.calledOnce).to.be(true);
	        expect(change.args[0][0]).to.eql([dataList[0]]);
	    });
	
	    it("should trigger focus/blur events", function (done) {
	        var blur = sinon.spy(),
	            focus = sinon.spy(),
	            select = render(React.createElement(Select, { onBlur: blur, onFocus: focus }));
	
	        expect(focus.calledOnce).to.be(false);
	        expect(blur.calledOnce).to.be(false);
	
	        trigger.focus(select.getDOMNode());
	
	        setTimeout(function () {
	            expect(focus.calledOnce).to.be(true);
	            trigger.blur(select.getDOMNode());
	
	            setTimeout(function () {
	                expect(blur.calledOnce).to.be(true);
	                done();
	            });
	        });
	    });
	
	    it("should trigger key events", function () {
	        var kp = sinon.spy(),
	            kd = sinon.spy(),
	            ku = sinon.spy(),
	            select = render(React.createElement(Select, { onKeyPress: kp, onKeyUp: ku, onKeyDown: kd })),
	            input = findType(select, __webpack_require__(32)).getDOMNode();
	
	        trigger.keyPress(input);
	        trigger.keyDown(input);
	        trigger.keyUp(input);
	
	        expect(kp.calledOnce).to.be(true);
	        expect(kd.calledOnce).to.be(true);
	        expect(ku.calledOnce).to.be(true);
	    });
	
	    it("should do nothing when disabled", function (done) {
	        var select = render(React.createElement(Select, { defaultValue: ["jimmy"], data: dataList, duration: 0, disabled: true })),
	            input = findType(select, __webpack_require__(32)).getDOMNode(),
	            tags = findType(select, TagList).getDOMNode();
	
	        expect(input.hasAttribute("disabled")).to.be(true);
	        expect(input.getAttribute("aria-disabled")).to.be("true");
	        //expect( input.getAttribute('disabled')).to.be('');
	
	        trigger.click(findTag(select, "button").getDOMNode());
	
	        setTimeout(function () {
	            expect(select.state.open).to.not.be(true);
	            expect(tags.children.length).to.be(1);
	            expect(select.getDOMNode().className).to.not.match(/\brw-state-focus\b/);
	            done();
	        }, 0);
	    });
	
	    it("should disable only certain tags", function (done) {
	        var select = render(React.createElement(Select, { defaultValue: [0, 1], data: dataList, disabled: [1], textField: "label", valueField: "id" })),
	            tags = findType(select, TagList).getDOMNode();
	
	        expect(tags.children.length).to.be(2);
	        expect(tags.children[1].className).to.match(/\brw-state-disabled\b/);
	
	        trigger.click(tags.children[1].children[1]); // click button
	
	        setTimeout(function () {
	            expect(tags.children.length).to.be(2);
	            done();
	        }, 0);
	    });
	
	    it("should do nothing when readonly", function (done) {
	        var select = render(React.createElement(Select, { defaultValue: ["jimmy"], data: dataList, duration: 0, readOnly: true })),
	            input = findType(select, __webpack_require__(32)).getDOMNode(),
	            tags = findType(select, TagList).getDOMNode();
	
	        expect(input.hasAttribute("readonly")).to.be(true);
	        expect(input.getAttribute("aria-readonly")).to.be("true");
	
	        trigger.click(findTag(select, "button").getDOMNode());
	
	        setTimeout(function () {
	            expect(select.state.open).to.not.be(true);
	            expect(tags.children.length).to.be(1);
	            done();
	        }, 0);
	    });
	
	    it("should readonly only certain tags", function (done) {
	        var select = render(React.createElement(Select, { defaultValue: [0, 1], data: dataList, readOnly: [1], textField: "label", valueField: "id" })),
	            tags = findType(select, TagList).getDOMNode();
	
	        expect(tags.children.length).to.be(2);
	        expect(tags.children[1].className).to.match(/\brw-state-readonly\b/);
	
	        trigger.click(tags.children[1].children[1]); // click button
	
	        setTimeout(function () {
	            expect(tags.children.length).to.be(2);
	            done();
	        });
	    });
	
	    it("should call Select handler", function (done) {
	        var change = sinon.spy(),
	            select = sinon.spy(),
	            ms = render(React.createElement(Select, { value: [dataList[1]], data: dataList, onChange: change, onSelect: select })),
	            list = findClass(ms, "rw-list");
	
	        ms.getDOMNode().focus();
	
	        setTimeout(function () {
	
	            trigger.click(list.getDOMNode().children[0]);
	
	            expect(select.calledOnce).to.be(true);
	            expect(change.calledAfter(select)).to.be(true);
	
	            select.reset();
	            change.reset();
	
	            trigger.keyDown(ms.getDOMNode(), { key: "ArrowDown" }); //move to different value so change fires
	            trigger.keyDown(ms.getDOMNode(), { key: "Enter" });
	
	            expect(select.calledOnce).to.be(true);
	            expect(change.calledAfter(select)).to.be(true);
	            done();
	        });
	    });
	
	    it("should clear SearchTerm when uncontrolled", function () {
	        var ms = render(React.createElement(Select, { data: dataList, defaultSearchTerm: "ji", open: true, textField: "label", valueField: "id", onToggle: function () {} }));
	
	        var input = findType(ms, Select.BaseMultiselect);
	
	        expect(input.props.searchTerm).to.be("ji");
	
	        trigger.keyDown(ms.getDOMNode(), { key: "Enter" });
	
	        expect(input.props.searchTerm).to.be("");
	    });
	
	    it("should not clear SearchTerm when controlled", function () {
	        var ms = render(React.createElement(Select, { searchTerm: "jim", data: dataList, onSearch: function () {} }));
	
	        var input = findTag(ms, "input").getDOMNode();
	        trigger.keyDown(ms.getDOMNode(), { key: "Enter" });
	
	        expect(input.value).to.be("jim");
	    });
	
	    it("should show create tag correctly", function () {
	        var ms = render(React.createElement(Select, { searchTerm: "custom tag", onCreate: function () {}, data: dataList, onSearch: function () {} }));
	
	        expect(function err() {
	            findClass(ms, "rw-multiselect-create-tag");
	        }).to.not.throwException();
	
	        ms.setProps({ searchTerm: "" });
	
	        expect(function err() {
	            findClass(ms, "rw-multiselect-create-tag");
	        }).to.throwException();
	
	        ms.setProps({ onCreate: null });
	
	        expect(function err() {
	            findClass(ms, "rw-multiselect-create-tag");
	        }).to.throwException();
	    });
	
	    it("should call onCreate", function () {
	        var create = sinon.spy(),
	            ms = render(React.createElement(Select, {
	            open: true,
	            searchTerm: "custom tag",
	            data: dataList,
	            onCreate: create,
	            onSearch: function () {}, onToggle: function () {} })),
	            createLi = findClass(ms, "rw-multiselect-create-tag").getDOMNode().children[0];
	
	        trigger.click(createLi);
	
	        expect(create.calledOnce).to.ok();
	        expect(create.calledWith("custom tag")).to.ok();
	
	        // only option is create
	        create.reset();
	        trigger.keyDown(ms.getDOMNode(), { key: "Enter" });
	
	        expect(create.calledOnce).to.ok();
	        expect(create.calledWith("custom tag")).to.ok();
	
	        // other values have focus
	        ms = render(React.createElement(Select, { open: true, searchTerm: "custom tag", data: ["custom tag time"], onCreate: create, onSearch: function () {}, onToggle: function () {} }));
	        create.reset();
	        trigger.keyDown(ms.getDOMNode(), { key: "Enter" });
	
	        expect(create.called).to.be(false);
	
	        trigger.keyDown(ms.getDOMNode(), { key: "Enter", ctrlKey: true });
	
	        expect(create.calledOnce).to.ok();
	        expect(create.calledWith("custom tag")).to.ok();
	    });
	
	    it("should change values on key down", function () {
	        var change = sinon.spy(),
	            select = render(React.createElement(Select, { value: [0, 1, 2], data: dataList, textField: "label", valueField: "id", onChange: change })),
	            tags = findType(select, TagList).getDOMNode(),
	            list = findClass(select, "rw-list").getDOMNode();
	
	        trigger.keyDown(select.getDOMNode(), { key: "ArrowLeft" });
	
	        expect(tags.children[2].className).to.match(/\brw-state-focus\b/);
	        expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/);
	
	        trigger.keyDown(select.getDOMNode(), { key: "ArrowLeft" });
	
	        expect(tags.children[1].className).to.match(/\brw-state-focus\b/);
	        expect(tags.children[2].className).to.not.match(/\brw-state-focus\b/);
	
	        trigger.keyDown(select.getDOMNode(), { key: "ArrowRight" });
	
	        expect(tags.children[2].className).to.match(/\brw-state-focus\b/);
	        expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/);
	
	        trigger.keyDown(select.getDOMNode(), { key: "Home" });
	
	        expect(tags.children[0].className).to.match(/\brw-state-focus\b/);
	        expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/);
	
	        trigger.keyDown(select.getDOMNode(), { key: "Delete" });
	
	        expect(change.calledOnce).to.be(true);
	        expect(change.args[0][0]).to.eql(dataList.slice(1, 3));
	        change.reset();
	
	        trigger.keyDown(select.getDOMNode(), { key: "End" });
	
	        expect(tags.children[2].className).to.match(/\brw-state-focus\b/);
	        expect(tags.children[1].className).to.not.match(/\brw-state-focus\b/);
	
	        trigger.keyDown(select.getDOMNode(), { key: "Backspace" });
	
	        expect(change.calledOnce).to.be(true);
	        expect(change.args[0][0]).to.eql(dataList.slice(0, 2));
	        change.reset();
	
	        trigger.keyDown(select.getDOMNode(), { key: "ArrowDown" });
	        expect(select.state.open).to.be(true);
	
	        select.setProps({ open: true, value: [], onToggle: function () {} });
	
	        trigger.keyDown(select.getDOMNode(), { key: "ArrowDown" });
	        expect(list.children[1].className).to.match(/\brw-state-focus\b/);
	
	        trigger.keyDown(select.getDOMNode(), { key: "End" });
	        expect(list.children[2].className).to.match(/\brw-state-focus\b/);
	
	        trigger.keyDown(select.getDOMNode(), { key: "Home" });
	        expect(list.children[0].className).to.match(/\brw-state-focus\b/);
	    });
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*global it, describe, expect, sinon*/
	__webpack_require__(16);
	
	var React = __webpack_require__(14);
	var NumberPicker = __webpack_require__(33);
	
	//console.log(sinon)
	var TestUtils = React.addons.TestUtils,
	    render = TestUtils.renderIntoDocument,
	    findTag = TestUtils.findRenderedDOMComponentWithTag,
	    findClass = TestUtils.findRenderedDOMComponentWithClass,
	    findAllTag = TestUtils.scryRenderedDOMComponentsWithTag,
	    findAllClass = TestUtils.scryRenderedDOMComponentsWithClass,
	    findType = TestUtils.findRenderedComponentWithType,
	    findAllType = TestUtils.scryRenderedComponentWithType,
	    trigger = TestUtils.Simulate;
	
	describe("Numberpicker", function () {
	
	  it("should set values correctly", function (done) {
	    var picker = render(React.createElement(NumberPicker, { value: 15, format: "D", onChange: function () {} })),
	        input = findClass(picker, "rw-input").getDOMNode();
	
	    expect(input.value).to.be("15");
	
	    picker.setProps({ value: null }, function () {
	      expect(input.value).to.be("");
	
	      picker.setProps({ value: null, min: 10 }, function () {
	        //only allow null when min is not set
	        expect(input.value).to.be("10");
	
	        picker.setProps({ value: 20, max: 10 }, function () {
	          expect(input.value).to.be("10");
	
	          picker.setProps({ value: 10, format: "c" }, function () {
	            expect(input.value).to.be("$10.00");
	            done();
	          });
	        });
	      });
	    });
	  });
	
	  it("should pass NAME down", function () {
	    var picker = render(React.createElement(NumberPicker, { value: 15, format: "D", onChange: function () {}, name: "hello" })),
	        input = findClass(picker, "rw-input").getDOMNode();
	
	    expect(input.hasAttribute("name")).to.be(true);
	  });
	
	  it("should not fire change until there is a valid value", function (done) {
	    var change = sinon.spy(),
	        picker = render(React.createElement(NumberPicker, { value: 150, format: "D", min: 100, onChange: change })),
	        input = findClass(picker, "rw-input").getDOMNode();
	
	    input.value = "15";
	    trigger.change(input);
	
	    expect(change.called).to.be(false);
	    expect(input.value).to.be("15");
	
	    input.value = "154";
	    trigger.change(input);
	    expect(change.calledOnce).to.be(true);
	
	    //should call change on a null value when no min
	    change.reset();
	    picker.setProps({ value: 15, min: -Infinity }, function () {
	
	      input.value = "";
	      trigger.change(input);
	      expect(change.calledOnce).to.be(true);
	      done();
	    });
	  });
	
	  it("should change value when spinner is clicked", function () {
	    var change = sinon.spy(),
	        picker = render(React.createElement(NumberPicker, { value: 1, format: "D", onChange: change })),
	        upBtn = findClass(picker, "rw-select").getDOMNode().children[0],
	        dwnBtn = findClass(picker, "rw-select").getDOMNode().children[1],
	        input = findClass(picker, "rw-input").getDOMNode();
	
	    //increment
	    expect(input.value).to.be("1");
	    trigger.mouseDown(upBtn);
	    trigger.mouseUp(upBtn);
	
	    expect(change.calledOnce).to.be(true);
	    expect(change.args[0][0]).to.be(2);
	
	    //decrement
	    trigger.mouseDown(dwnBtn);
	    trigger.mouseUp(dwnBtn);
	
	    expect(change.calledTwice).to.be(true);
	    expect(change.args[1][0]).to.be(0);
	  });
	
	  it("should trigger focus/blur events", function (done) {
	    var blur = sinon.spy(),
	        focus = sinon.spy(),
	        picker = render(React.createElement(NumberPicker, { onBlur: blur, onFocus: focus }));
	
	    expect(focus.calledOnce).to.be(false);
	    expect(blur.calledOnce).to.be(false);
	
	    trigger.focus(picker.getDOMNode());
	
	    setTimeout(function () {
	      expect(focus.calledOnce).to.be(true);
	      trigger.blur(picker.getDOMNode());
	
	      setTimeout(function () {
	        expect(blur.calledOnce).to.be(true);
	        done();
	      });
	    });
	  });
	
	  it("should trigger key events", function () {
	    var kp = sinon.spy(),
	        kd = sinon.spy(),
	        ku = sinon.spy(),
	        picker = render(React.createElement(NumberPicker, { onKeyPress: kp, onKeyUp: ku, onKeyDown: kd })),
	        input = findClass(picker, "rw-input").getDOMNode();
	
	    trigger.keyPress(input);
	    trigger.keyDown(input);
	    trigger.keyUp(input);
	
	    expect(kp.calledOnce).to.be(true);
	    expect(kd.calledOnce).to.be(true);
	    expect(ku.calledOnce).to.be(true);
	  });
	
	  it("should do nothing when disabled", function () {
	    var change = sinon.spy(),
	        picker = render(React.createElement(NumberPicker, { value: 0, disabled: true, onChange: change })),
	        input = findClass(picker, "rw-input").getDOMNode(),
	        upBtn = findClass(picker, "rw-select").getDOMNode().children[0],
	        dwnBtn = findClass(picker, "rw-select").getDOMNode().children[1];
	
	    trigger.focus(input);
	
	    setTimeout(function () {
	      expect(picker.getDOMNode().className).to.not.match(/\brw-state-focus\b/);
	      expect(picker.getDOMNode().className).to.match(/\brw-state-disabled\b/);
	      expect(input.hasAttribute("aria-disabled")).to.be(true);
	      expect(input.getAttribute("aria-disabled")).to.be("true");
	
	      trigger.mouseDown(upBtn);
	      trigger.mouseDown(dwnBtn);
	      expect(change.called).to.be(false);
	    }, 0);
	  });
	
	  it("should do nothing when readonly", function () {
	    var change = sinon.spy(),
	        picker = render(React.createElement(NumberPicker, { value: 0, readOnly: true, onChange: change })),
	        input = findClass(picker, "rw-input").getDOMNode(),
	        upBtn = findClass(picker, "rw-select").getDOMNode().children[0],
	        dwnBtn = findClass(picker, "rw-select").getDOMNode().children[1];
	
	    trigger.focus(input);
	
	    setTimeout(function () {
	      expect(picker.getDOMNode().className).to.match(/\brw-state-focus\b/);
	      expect(picker.getDOMNode().className).to.match(/\brw-state-readonly\b/);
	      expect(input.hasAttribute("aria-readonly")).to.be(true);
	      expect(input.getAttribute("aria-readonly")).to.be("true");
	
	      trigger.mouseDown(upBtn);
	      trigger.mouseDown(dwnBtn);
	      expect(change.called).to.be(false);
	    }, 0);
	  });
	
	  it("should change values on key down", function (done) {
	    var change = sinon.spy(),
	        picker = render(React.createElement(NumberPicker, { value: 10, onChange: change })),
	        input = picker.getDOMNode();
	
	    trigger.keyDown(input, { key: "End" });
	    trigger.keyDown(input, { key: "Home" });
	    expect(change.called).to.be(false);
	
	    trigger.keyDown(input, { key: "ArrowDown" });
	    expect(change.calledOnce).to.be(true);
	    expect(change.calledWith(9)).to.be(true);
	
	    change.reset();
	
	    trigger.keyDown(input, { key: "ArrowUp" });
	    expect(change.calledOnce).to.be(true);
	    expect(change.calledWith(11)).to.be(true);
	
	    change.reset();
	
	    picker.setProps({ min: 5, max: 15 }, function () {
	
	      trigger.keyDown(input, { key: "End" });
	      expect(change.calledOnce).to.be(true);
	      expect(change.calledWith(15)).to.be(true);
	
	      change.reset();
	
	      trigger.keyDown(input, { key: "Home" });
	
	      expect(change.calledOnce).to.be(true);
	      expect(change.calledWith(5)).to.be(true);
	
	      done();
	    });
	  });
	});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	/*global it, describe, expect */
	
	__webpack_require__(16);
	
	delete __webpack_require__.c[/*require.resolve*/(34)];
	
	var React = __webpack_require__(15),
	    filters = __webpack_require__(35),
	    _ = __webpack_require__(34),
	    propTypes = __webpack_require__(36),
	    validateList = __webpack_require__(37);
	
	describe("_ utils", function () {
	
	  it("should EACH", function () {
	    var cnt = 0;
	    _.each([1], function (v, i, a) {
	      expect(v).equal(1);
	      expect(i).equal(0);
	      expect(a).eql([1]);
	    });
	
	    _.each({ a: 1, b: 2, c: 3 }, function () {
	      return cnt++;
	    });
	
	    expect(cnt).to.equal(3);
	    cnt = 0;
	    _.each([1, 2, 3], function () {
	      return cnt++;
	    });
	    expect(cnt).to.equal(3);
	  });
	
	  it("should OMIT and PICK", function () {
	    expect(_.omit({ a: 1, b: 2, c: 3 }, ["b", "c"])).to.eql({ a: 1 });
	    expect(_.pick({ a: 1, b: 2, c: 3 }, ["b", "c"])).to.eql({ b: 2, c: 3 });
	  });
	
	  it("should FIND", function () {
	    expect(_.find([1, 2, 3, 4, 5], function (v) {
	      return v === 2;
	    })).to.equal(2);
	    expect(_.find([1, 2, 3, 4, 5], function (v, i) {
	      return i === 2;
	    })).to.equal(3);
	  });
	
	  it("should UNIQUEID", function () {
	    expect(_.uniqueId("gello_")).to.equal("gello_" + 1);
	    expect(_.uniqueId("ello_")).to.equal("ello_" + 2);
	  });
	
	  it("should SHALLOW EQUAL", function () {
	    expect(_.isShallowEqual(1, 1)).to.be(true);
	    expect(_.isShallowEqual(1, "1")).to.be(false);
	    expect(_.isShallowEqual(1, 1.4)).to.be(false);
	    expect(_.isShallowEqual("hi", "hi")).to.be(true);
	    expect(_.isShallowEqual("hi", "hiw")).to.be(false);
	
	    expect(_.isShallowEqual(null, null)).to.be(true);
	    expect(_.isShallowEqual(null, undefined)).to.be(false);
	
	    expect(_.isShallowEqual([1, 2], [1, 2])).to.be(true);
	    expect(_.isShallowEqual([1, 2], [1, 3])).to.be(false);
	
	    expect(_.isShallowEqual([1, 2], { 0: 1, 1: 2 })).to.be(true);
	
	    expect(_.isShallowEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).to.be(true);
	    expect(_.isShallowEqual({ a: 1, b: 2 }, { a: 1, c: "hi" })).to.be(false);
	  });
	
	  it("should TRANSFORM", function () {
	
	    _.transform([1], function (o, v, i) {
	      expect(o).to.eql([]);
	      expect(v).to.equal(1);
	      expect(i).to.equal(0);
	    });
	
	    _.transform({ key: 1 }, function (o, v, i) {
	      expect(o).to.eql({});
	      expect(v).to.equal(1);
	      expect(i).to.equal("key");
	    });
	
	    expect(_.transform({ a: 0, b: 1 }, function (o, v, i) {
	      return o[i] = ++v;
	    })).to.eql({ a: 1, b: 2 });
	
	    expect(_.transform([0, 1], function (o, v) {
	      return o[v] = ++v;
	    }, {})).to.eql({ 0: 1, 1: 2 });
	  });
	});
	
	describe("when using array filter helpers", function () {
	
	  it("should match correctly", function () {
	
	    expect(filters.eq(1, 1)).to.equal(true);
	    expect(filters.neq(2, 1)).to.equal(true);
	    expect(filters.lt(1, 2)).to.equal(true);
	    expect(filters.lte(1, 1)).to.equal(true);
	    expect(filters.gt(2, 1)).to.equal(true);
	    expect(filters.gte(1, 1)).to.equal(true);
	
	    expect(filters.contains([1, 2], 1)).to.equal(true);
	    expect(filters.contains("hello", "ll")).to.equal(true);
	
	    expect(filters.startsWith("hello", "hel")).to.equal(true);
	    expect(filters.endsWith("hello", "llo")).to.equal(true);
	  });
	});
	
	describe("when validating Lists", function () {
	
	  it("should throw when methods are not implemented", function () {
	    var List = { prev: function () {}, next: function () {}, last: function () {}, first: "wrong type" };
	
	    expect(function () {
	      return validateList(List);
	    }).to.throwException(/first()/);
	  });
	
	  it("should fail quietly in production", function () {
	    var List = { prev: function () {}, next: function () {}, last: function () {}, first: "wrong type" };
	
	    process.env.NODE_ENV = "production";
	    expect(function () {
	      return validateList(List);
	    }).to.not.throwException();
	    process.env.NODE_ENV = "test";
	  });
	});
	
	describe("when using custom PropTypes", function () {
	
	  it("should concat names", function () {
	    var props = { type: "span" };
	
	    expect(propTypes.elementType(props, "type", "component")).to.equal(true);
	
	    props.type = function () {};
	    expect(propTypes.elementType(props, "type", "component")).to.equal(true);
	
	    props.type = React.createElement("span");
	
	    expect(propTypes.elementType(props, "type", "component")).to.be.an(Error);
	
	    props.type = true;
	    expect(propTypes.elementType(props, "type", "component")).to.be.an(Error);
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = window.React.addons;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = window.React;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	  var Ap = Array.prototype;
	  var slice = Ap.slice;
	  var proto = Function.prototype;
	
	  if (!proto.bind) {
	    proto.bind = function (context) {
	      var func = this;
	      var args = slice.call(arguments, 1);
	
	      function bound() {
	        var invokedAsConstructor = func.prototype && this instanceof func;
	        return func.apply(!invokedAsConstructor && context || this, args.concat(slice.call(arguments)));
	      }
	      bound.prototype = func.prototype;
	
	      return bound;
	    };
	  }
	})();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(15),
	    _ = __webpack_require__(34);
	
	module.exports = {
	
	  propTypes: {
	    valueField: React.PropTypes.string,
	    textField: React.PropTypes.string },
	
	  _dataValue: function (item) {
	    var field = this.props.valueField;
	
	    return field && item && _.has(item, field) ? item[field] : item;
	  },
	
	  _dataText: function (item) {
	    var field = this.props.textField;
	
	    return (field && item && _.has(item, field) ? item[field] : item) + "";
	  },
	
	  _dataIndexOf: function (data, item) {
	    var _this = this;
	
	    var idx = -1,
	        len = data.length,
	        finder = function (datum) {
	      return _this._valueMatcher(item, datum);
	    };
	
	    while (++idx < len) if (finder(data[idx])) return idx;
	
	    return -1;
	  },
	
	  _valueMatcher: function (a, b) {
	    return _.isShallowEqual(this._dataValue(a), this._dataValue(b));
	  },
	
	  _dataItem: function (data, item) {
	    var first = data[0],
	        field = this.props.valueField,
	        idx;
	
	    // make an attempt to see if we were passed in dataItem vs just a valueField value
	    // either an object with the right prop, or a primitive
	    // { valueField: 5 } || "hello" [ "hello" ]
	    if (_.has(item, field) || typeof first === typeof val) return item;
	
	    idx = this._dataIndexOf(data, this._dataValue(item));
	
	    if (idx !== -1) return data[idx];
	
	    return item;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    cx = __webpack_require__(66),
	    compat = __webpack_require__(47),
	    Header = __webpack_require__(19),
	    Footer = __webpack_require__(20),
	    Month = __webpack_require__(21),
	    Year = __webpack_require__(22),
	    Decade = __webpack_require__(23),
	    Century = __webpack_require__(24),
	    CustomPropTypes = __webpack_require__(36),
	    createUncontrolledWidget = __webpack_require__(68),
	    SlideTransition = __webpack_require__(48),
	    dates = __webpack_require__(25),
	    constants = __webpack_require__(29),
	    _ = __webpack_require__(34); //values, omit
	
	var dir = constants.directions,
	    values = function (obj) {
	  return Object.keys(obj).map(function (k) {
	    return obj[k];
	  });
	},
	    invert = function (obj) {
	  return _.transform(obj, function (o, val, key) {
	    o[val] = key;
	  }, {});
	};
	
	var views = constants.calendarViews,
	    VIEW_OPTIONS = values(views),
	    ALT_VIEW = invert(constants.calendarViewHierarchy),
	    NEXT_VIEW = constants.calendarViewHierarchy,
	    VIEW_UNIT = constants.calendarViewUnits,
	    VIEW = (function () {
	  var _VIEW = {};
	  _VIEW[views.MONTH] = Month;
	  _VIEW[views.YEAR] = Year;
	  _VIEW[views.DECADE] = Decade;
	  _VIEW[views.CENTURY] = Century;
	  return _VIEW;
	})();
	
	var MULTIPLIER = (function () {
	  var _MULTIPLIER = {};
	  _MULTIPLIER[views.YEAR] = 1;
	  _MULTIPLIER[views.DECADE] = 10;
	  _MULTIPLIER[views.CENTURY] = 100;
	  return _MULTIPLIER;
	})();
	
	var VIEW_FORMATS = (function () {
	  var _VIEW_FORMATS = {};
	  _VIEW_FORMATS[views.MONTH] = "dateFormat";
	  _VIEW_FORMATS[views.YEAR] = "monthFormat";
	  _VIEW_FORMATS[views.DECADE] = "yearFormat";
	  _VIEW_FORMATS[views.CENTURY] = "decadeFormat";
	  return _VIEW_FORMATS;
	})();
	
	var propTypes = {
	
	  onChange: React.PropTypes.func,
	  value: React.PropTypes.instanceOf(Date),
	
	  min: React.PropTypes.instanceOf(Date),
	  max: React.PropTypes.instanceOf(Date),
	
	  initialView: React.PropTypes.oneOf(VIEW_OPTIONS),
	
	  finalView: function (props, propname, componentName) {
	    var err = React.PropTypes.oneOf(VIEW_OPTIONS)(props, propname, componentName);
	
	    if (err) return err;
	    if (VIEW_OPTIONS.indexOf(props[propname]) < VIEW_OPTIONS.indexOf(props.initialView)) return new Error(("The `" + propname + "` prop: `" + props[propname] + "` cannot be 'lower' than the `initialView` \n                        prop. This creates a range that cannot be rendered.").replace(/\n\t/g, ""));
	  },
	
	  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),
	
	  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["readOnly"])]),
	
	  culture: React.PropTypes.string,
	
	  footer: React.PropTypes.bool,
	
	  headerFormat: CustomPropTypes.localeFormat,
	  footerFormat: CustomPropTypes.localeFormat,
	
	  dayFormat: CustomPropTypes.localeFormat,
	  dateFormat: CustomPropTypes.localeFormat,
	  monthFormat: CustomPropTypes.localeFormat,
	  yearFormat: CustomPropTypes.localeFormat,
	  decadeFormat: CustomPropTypes.localeFormat,
	  centuryFormat: CustomPropTypes.localeFormat,
	
	  messages: React.PropTypes.shape({
	    moveBack: React.PropTypes.string,
	    moveForward: React.PropTypes.string })
	};
	
	var Calendar = React.createClass({
	
	  displayName: "Calendar",
	
	  mixins: [__webpack_require__(45), __webpack_require__(49), __webpack_require__(43), __webpack_require__(50)],
	
	  propTypes: propTypes,
	
	  getInitialState: function () {
	    var value = this.inRangeValue(this.props.value);
	
	    return {
	      selectedIndex: 0,
	      view: this.props.initialView || "month",
	      currentDate: value ? new Date(value) : this.inRangeValue(new Date())
	    };
	  },
	
	  getDefaultProps: function () {
	    return {
	
	      value: null,
	      min: new Date(1900, 0, 1),
	      max: new Date(2099, 11, 31),
	
	      initialView: "month",
	      finalView: "century",
	
	      tabIndex: "0",
	      footer: false,
	
	      headerFormat: dates.formats.MONTH_YEAR,
	      footerFormat: dates.formats.FOOTER,
	
	      dayFormat: dates.shortDay,
	      dateFormat: dates.formats.DAY_OF_MONTH,
	      monthFormat: dates.formats.MONTH_NAME_ABRV,
	      yearFormat: dates.formats.YEAR,
	
	      decadeFormat: function (dt, culture) {
	        return "" + dates.format(dt, dates.formats.YEAR, culture) + " - " + dates.format(dates.endOf(dt, "decade"), dates.formats.YEAR, culture);
	      },
	
	      centuryFormat: function (dt, culture) {
	        return "" + dates.format(dt, dates.formats.YEAR, culture) + " - " + dates.format(dates.endOf(dt, "century"), dates.formats.YEAR, culture);
	      },
	
	      messages: msgs({})
	    };
	  },
	
	  componentWillReceiveProps: function (nextProps) {
	    var bottom = VIEW_OPTIONS.indexOf(nextProps.initialView),
	        top = VIEW_OPTIONS.indexOf(nextProps.finalView),
	        current = VIEW_OPTIONS.indexOf(this.state.view),
	        view = this.state.view,
	        val = this.inRangeValue(nextProps.value);
	
	    if (current < bottom) this.setState({ view: view = nextProps.initialView });else if (current > top) this.setState({ view: view = nextProps.finalView });
	
	    //if the value changes reset views to the new one
	    if (!dates.eq(val, dateOrNull(this.props.value), VIEW_UNIT[view])) this.setState({
	      currentDate: val ? new Date(val) : new Date()
	    });
	  },
	
	  render: function () {
	    var _this = this;
	
	    var _$omit = _.omit(this.props, Object.keys(propTypes));
	
	    var className = _$omit.className;
	    var props = _objectWithoutProperties(_$omit, ["className"]);
	    var View = VIEW[this.state.view];
	    var viewProps = _.pick(this.props, Object.keys(compat.type(View).propTypes));
	    var unit = this.state.view;
	    var messages = msgs(this.props.messages);
	
	    var disabled = this.props.disabled || this.props.readOnly;
	    var date = this.state.currentDate;
	    var todaysDate = new Date();
	    var todayNotInRange = !dates.inRange(todaysDate, this.props.min, this.props.max, unit);
	    var labelId = this._id("_view_label");
	    var key = this.state.view + "_" + dates[this.state.view](date);
	    var id = this._id("_view");
	
	    return React.createElement(
	      "div",
	      _extends({}, props, {
	        onKeyDown: this._keyDown,
	        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
	        onBlur: this._focus.bind(null, false),
	        className: cx(className, "rw-calendar", "rw-widget", {
	          "rw-state-focus": this.state.focused,
	          "rw-state-disabled": this.props.disabled,
	          "rw-state-readonly": this.props.readOnly,
	          "rw-rtl": this.isRtl()
	        }) }),
	      React.createElement(Header, {
	        label: this._label(),
	        labelId: labelId,
	        messages: messages,
	        upDisabled: disabled || this.state.view === this.props.finalView,
	        prevDisabled: disabled || !dates.inRange(this.nextDate(dir.LEFT), this.props.min, this.props.max, unit),
	        nextDisabled: disabled || !dates.inRange(this.nextDate(dir.RIGHT), this.props.min, this.props.max, unit),
	        onViewChange: this._maybeHandle(this.navigate.bind(null, dir.UP, null)),
	        onMoveLeft: this._maybeHandle(this.navigate.bind(null, dir.LEFT, null)),
	        onMoveRight: this._maybeHandle(this.navigate.bind(null, dir.RIGHT, null)) }),
	      React.createElement(
	        SlideTransition,
	        {
	          ref: "animation",
	          duration: props.duration,
	          direction: this.state.slideDirection,
	          onAnimate: function () {
	            return _this._focus(true);
	          } },
	        React.createElement(View, _extends({}, viewProps, {
	          ref: "currentView",
	          key: key,
	          id: id,
	          "aria-labelledby": labelId,
	          selectedDate: this.props.value,
	          today: todaysDate,
	          value: this.state.currentDate,
	          onChange: this._maybeHandle(this.change),
	          onKeyDown: this._maybeHandle(this._keyDown),
	          onMoveLeft: this._maybeHandle(this.navigate.bind(null, dir.LEFT)),
	          onMoveRight: this._maybeHandle(this.navigate.bind(null, dir.RIGHT)) }))
	      ),
	      this.props.footer && React.createElement(Footer, {
	        value: todaysDate,
	        format: this.props.footerFormat,
	        culture: this.props.culture,
	        disabled: this.props.disabled || todayNotInRange,
	        readOnly: this.props.readOnly,
	        onClick: this._maybeHandle(this.select)
	      })
	    );
	  },
	
	  navigate: function (direction, date) {
	    var view = this.state.view,
	        slideDir = direction === dir.LEFT || direction === dir.UP ? "right" : "left";
	
	    if (!date) date = [dir.LEFT, dir.RIGHT].indexOf(direction) !== -1 ? this.nextDate(direction) : this.state.currentDate;
	
	    if (direction === dir.DOWN) view = ALT_VIEW[view] || view;
	
	    if (direction === dir.UP) view = NEXT_VIEW[view] || view;
	
	    if (this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
	      this._focus(true, "nav");
	
	      this.setState({
	        currentDate: date,
	        slideDirection: slideDir,
	        view: view
	      });
	    }
	  },
	
	  _focus: function (focused, e) {
	    var _this = this;
	
	    if (+this.props.tabIndex === -1) return;
	
	    this.setTimeout("focus", function () {
	
	      if (focused) _this.getDOMNode().focus();
	
	      if (focused !== _this.state.focused) {
	        _this.notify(focused ? "onFocus" : "onBlur", e);
	        _this.setState({ focused: focused });
	      }
	    });
	  },
	
	  change: function (date) {
	    var _this = this;
	
	    setTimeout(function () {
	      return _this._focus(true);
	    });
	
	    if (this.props.onChange && this.state.view === this.props.initialView) return this.notify("onChange", date);
	
	    this.navigate(dir.DOWN, date);
	  },
	
	  select: function (date) {
	    var view = this.props.initialView,
	        slideDir = view !== this.state.view || dates.gt(date, this.state.currentDate) ? "left" // move down to a the view
	    : "right";
	
	    this.notify("onChange", date);
	
	    if (this.isValidView(view) && dates.inRange(date, this.props.min, this.props.max, view)) {
	      this._focus(true, "nav");
	
	      this.setState({
	        currentDate: date,
	        slideDirection: slideDir,
	        view: view
	      });
	    }
	  },
	
	  nextDate: function (direction) {
	    var method = direction === dir.LEFT ? "subtract" : "add",
	        view = this.state.view,
	        unit = view === views.MONTH ? view : views.YEAR,
	        multi = MULTIPLIER[view] || 1;
	
	    return dates[method](this.state.currentDate, 1 * multi, unit);
	  },
	
	  _keyDown: function (e) {
	    var ctrl = e.ctrlKey,
	        key = e.key;
	
	    if (ctrl) {
	      if (key === "ArrowDown") {
	        e.preventDefault();
	        this.navigate(dir.DOWN);
	      }
	      if (key === "ArrowUp") {
	        e.preventDefault();
	        this.navigate(dir.UP);
	      }
	      if (key === "ArrowLeft") {
	        e.preventDefault();
	        this.navigate(dir.LEFT);
	      }
	      if (key === "ArrowRight") {
	        e.preventDefault();
	        this.navigate(dir.RIGHT);
	      }
	    } else {
	      this.refs.currentView._keyDown && this.refs.currentView._keyDown(e);
	    }
	
	    this.notify("onKeyDown", [e]);
	  },
	
	  _label: function () {
	    var _props = this.props;
	    var culture = _props.culture;
	    var props = _objectWithoutProperties(_props, ["culture"]);
	    var view = this.state.view;
	    var dt = this.state.currentDate;
	
	    if (view === "month") return dates.format(dt, props.headerFormat, culture);else if (view === "year") return dates.format(dt, props.yearFormat, culture);else if (view === "decade") return dates.format(dates.startOf(dt, "decade"), props.decadeFormat, culture);else if (view === "century") return dates.format(dates.startOf(dt, "century"), props.centuryFormat, culture);
	  },
	
	  inRangeValue: function (_value) {
	    var value = dateOrNull(_value);
	
	    if (value === null) return value;
	
	    return dates.max(dates.min(value, this.props.max), this.props.min);
	  },
	
	  isValidView: function (next) {
	    var bottom = VIEW_OPTIONS.indexOf(this.props.initialView),
	        top = VIEW_OPTIONS.indexOf(this.props.finalView),
	        current = VIEW_OPTIONS.indexOf(next);
	
	    return current >= bottom && current <= top;
	  }
	});
	
	function dateOrNull(dt) {
	  if (dt && !isNaN(dt.getTime())) return dt;
	  return null;
	}
	
	function msgs(msgs) {
	  return _extends({
	    moveBack: "navigate back",
	    moveForward: "navigate forward" }, msgs);
	}
	
	function formats(obj) {
	  return _extends({
	    headerFormat: dates.formats.MONTH_YEAR,
	    dateFormat: dates.formats.DAY_OF_MONTH,
	    monthFormat: dates.formats.MONTH_NAME_ABRV,
	    yearFormat: dates.formats.YEAR,
	
	    decadeFormat: function (dt, culture) {
	      return "" + dates.format(dt, dates.formats.YEAR, culture) + " - " + dates.format(dates.endOf(dt, "decade"), dates.formats.YEAR, culture);
	    },
	
	    centuryFormat: function (dt, culture) {
	      return "" + dates.format(dt, dates.formats.YEAR, culture) + " - " + dates.format(dates.endOf(dt, "century"), dates.formats.YEAR, culture);
	    } }, obj);
	}
	
	module.exports = createUncontrolledWidget(Calendar, { value: "onChange" });
	
	module.exports.BaseCalendar = Calendar;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(15),
	    Btn = __webpack_require__(42);
	
	module.exports = React.createClass({
	  displayName: "exports",
	
	  propTypes: {
	    label: React.PropTypes.string.isRequired,
	    labelId: React.PropTypes.string,
	
	    upDisabled: React.PropTypes.bool.isRequired,
	    prevDisabled: React.PropTypes.bool.isRequired,
	    nextDisabled: React.PropTypes.bool.isRequired,
	    onViewChange: React.PropTypes.func.isRequired,
	    onMoveLeft: React.PropTypes.func.isRequired,
	    onMoveRight: React.PropTypes.func.isRequired,
	
	    messages: React.PropTypes.shape({
	      moveBack: React.PropTypes.string,
	      moveForward: React.PropTypes.string
	    })
	  },
	
	  mixins: [__webpack_require__(43), __webpack_require__(44)],
	
	  getDefaultProps: function () {
	    return {
	      messages: {
	        moveBack: "navigate back",
	        moveForward: "navigate forward" }
	    };
	  },
	
	  render: function () {
	    var rtl = this.isRtl();
	
	    return React.createElement(
	      "div",
	      { className: "rw-header" },
	      React.createElement(
	        Btn,
	        { className: "rw-btn-left",
	          tabIndex: "-1",
	          onClick: this.props.onMoveLeft,
	          disabled: this.props.prevDisabled,
	          "aria-disabled": this.props.prevDisabled,
	          title: this.props.moveBack },
	        React.createElement("i", { className: "rw-i rw-i-caret-" + (rtl ? "right" : "left") }),
	        React.createElement(
	          "span",
	          { className: "rw-sr" },
	          this.props.messages.moveBack
	        )
	      ),
	      React.createElement(
	        Btn,
	        { className: "rw-btn-view",
	          id: this.props.labelId,
	          tabIndex: "-1",
	          onClick: this.props.onViewChange,
	          disabled: this.props.upDisabled,
	          "aria-disabled": this.props.upDisabled },
	        this.props.label
	      ),
	      React.createElement(
	        Btn,
	        { className: "rw-btn-right",
	          tabIndex: "-1",
	          onClick: this.props.onMoveRight,
	          disabled: this.props.nextDisabled,
	          "aria-disabled": this.props.nextDisabled,
	          title: this.props.moveForward },
	        React.createElement("i", { className: "rw-i rw-i-caret-" + (rtl ? "left" : "right") }),
	        React.createElement(
	          "span",
	          { className: "rw-sr" },
	          this.props.messages.moveForward
	        )
	      )
	    );
	  }
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(15),
	    Btn = __webpack_require__(42),
	    dates = __webpack_require__(25);
	
	module.exports = React.createClass({
	
	  displayName: "Footer",
	
	  render: function () {
	    var now = this.props.value,
	        formatted = dates.format(now, this.props.format, this.props.culture);
	
	    return React.createElement(
	      "div",
	      { className: "rw-footer" },
	      React.createElement(
	        Btn,
	        {
	          "aria-disabled": !!this.props.disabled,
	          "aria-readonly": !!this.props.readOnly,
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    cx = __webpack_require__(66),
	    dates = __webpack_require__(25),
	    directions = __webpack_require__(29).directions,
	    CustomPropTypes = __webpack_require__(36),
	    _ = __webpack_require__(34),
	    Btn = __webpack_require__(42);
	
	var opposite = {
	  LEFT: directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	module.exports = React.createClass({
	
	  displayName: "MonthView",
	
	  mixins: [__webpack_require__(45), __webpack_require__(44), __webpack_require__(46)("month", "day")],
	
	  propTypes: {
	    culture: React.PropTypes.string,
	    value: React.PropTypes.instanceOf(Date),
	    selectedDate: React.PropTypes.instanceOf(Date),
	    min: React.PropTypes.instanceOf(Date),
	    max: React.PropTypes.instanceOf(Date),
	
	    dayFormat: CustomPropTypes.localeFormat.isRequired,
	    dateFormat: CustomPropTypes.localeFormat.isRequired,
	
	    onChange: React.PropTypes.func.isRequired, //value is chosen
	    onMoveLeft: React.PropTypes.func,
	    onMoveRight: React.PropTypes.func
	  },
	
	  render: function () {
	    var props = _.omit(this.props, ["max", "min", "value", "onChange"]),
	        month = dates.visibleDays(this.props.value),
	        rows = _.chunk(month, 7);
	
	    return React.createElement(
	      "table",
	      _extends({}, props, {
	        role: "grid",
	        className: "rw-calendar-grid",
	        "aria-activedescendant": this._id("_selected_item"),
	        onKeyUp: this._keyUp }),
	      React.createElement(
	        "thead",
	        null,
	        React.createElement(
	          "tr",
	          null,
	          this._headers(props.dayFormat, props.culture)
	        )
	      ),
	      React.createElement(
	        "tbody",
	        null,
	        rows.map(this._row)
	      )
	    );
	  },
	
	  _row: function (row, i) {
	    var _this = this;
	
	    var id = this._id("_selected_item");
	
	    return React.createElement(
	      "tr",
	      { key: "week_" + i, role: "row" },
	      row.map(function (day, idx) {
	        var focused = dates.eq(day, _this.state.focusedDate, "day"),
	            selected = dates.eq(day, _this.props.selectedDate, "day"),
	            today = dates.eq(day, _this.props.today, "day");
	
	        return !dates.inRange(day, _this.props.min, _this.props.max) ? React.createElement(
	          "td",
	          { key: "day_" + idx, role: "gridcell", className: "rw-empty-cell" },
	          " "
	        ) : React.createElement(
	          "td",
	          { key: "day_" + idx, role: "gridcell" },
	          React.createElement(
	            Btn,
	            {
	              tabIndex: "-1",
	              onClick: _this.props.onChange.bind(null, day),
	              "aria-selected": selected,
	              "aria-disabled": _this.props.disabled,
	              disabled: _this.props.disabled,
	              className: cx({
	                "rw-off-range": dates.month(day) !== dates.month(_this.state.focusedDate),
	                "rw-state-focus": focused,
	                "rw-state-selected": selected,
	                "rw-now": today
	              }),
	              id: focused ? id : undefined },
	            dates.format(day, _this.props.dateFormat, _this.props.culture)
	          )
	        );
	      })
	    );
	  },
	
	  _headers: function (format, culture) {
	    return [0, 1, 2, 3, 4, 5, 6].map(function (day) {
	      return React.createElement(
	        "th",
	        { key: "header_" + day },
	        dates.format(day, format, culture)
	      );
	    });
	  },
	
	  move: function (date, direction) {
	    var min = this.props.min,
	        max = this.props.max;
	
	    if (this.isRtl() && opposite[direction]) direction = opposite[direction];
	
	    if (direction === directions.LEFT) date = nextDate(date, -1, "day", min, max);else if (direction === directions.RIGHT) date = nextDate(date, 1, "day", min, max);else if (direction === directions.UP) date = nextDate(date, -1, "week", min, max);else if (direction === directions.DOWN) date = nextDate(date, 1, "week", min, max);
	
	    return date;
	  }
	
	});
	
	function nextDate(date, val, unit, min, max) {
	  var newDate = dates.add(date, val, unit);
	
	  return dates.inRange(newDate, min, max, "day") ? newDate : date;
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    cx = __webpack_require__(66),
	    dates = __webpack_require__(25),
	    directions = __webpack_require__(29).directions,
	    Btn = __webpack_require__(42),
	    _ = __webpack_require__(34),
	    CustomPropTypes = __webpack_require__(36);
	
	var opposite = {
	  LEFT: directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	module.exports = React.createClass({
	
	  displayName: "YearView",
	
	  mixins: [__webpack_require__(45), __webpack_require__(44), __webpack_require__(46)("year", "month")],
	
	  propTypes: {
	    culture: React.PropTypes.string,
	    value: React.PropTypes.instanceOf(Date),
	    min: React.PropTypes.instanceOf(Date),
	    max: React.PropTypes.instanceOf(Date),
	    onChange: React.PropTypes.func.isRequired,
	
	    monthFormat: CustomPropTypes.localeFormat.isRequired
	  },
	
	  render: function () {
	    var props = _.omit(this.props, ["max", "min", "value", "onChange"]),
	        months = dates.monthsInYear(dates.year(this.props.value)),
	        rows = _.chunk(months, 4);
	
	    return React.createElement(
	      "table",
	      _extends({}, props, {
	        tabIndex: this.props.disabled ? "-1" : "0",
	        ref: "table",
	        role: "grid",
	        className: "rw-calendar-grid rw-nav-view",
	        "aria-activedescendant": this._id("_selected_item"),
	        onKeyUp: this._keyUp }),
	      React.createElement(
	        "tbody",
	        null,
	        rows.map(this._row)
	      )
	    );
	  },
	
	  _row: function (row, i) {
	    var _this = this;
	
	    var id = this._id("_selected_item");
	
	    return React.createElement(
	      "tr",
	      { key: i, role: "row" },
	      row.map(function (date, i) {
	        var focused = dates.eq(date, _this.state.focusedDate, "month"),
	            selected = dates.eq(date, _this.props.value, "month"),
	            currentMonth = dates.eq(date, _this.props.today, "month");
	
	        return dates.inRange(date, _this.props.min, _this.props.max, "month") ? React.createElement(
	          "td",
	          { key: i, role: "gridcell" },
	          React.createElement(
	            Btn,
	            { onClick: _this.props.onChange.bind(null, date), tabIndex: "-1",
	              id: focused ? id : undefined,
	              "aria-selected": selected,
	              "aria-disabled": _this.props.disabled,
	              disabled: _this.props.disabled,
	              className: cx({
	                "rw-state-focus": focused,
	                "rw-state-selected": selected,
	                "rw-now": currentMonth
	              }) },
	            dates.format(date, _this.props.monthFormat, _this.props.culture)
	          )
	        ) : React.createElement(
	          "td",
	          { key: i, className: "rw-empty-cell", role: "gridcell" },
	          " "
	        );
	      })
	    );
	  },
	
	  focus: function () {
	    this.refs.table.getDOMNode().focus();
	  },
	
	  move: function (date, direction) {
	    var min = this.props.min,
	        max = this.props.max;
	
	    if (this.isRtl() && opposite[direction]) direction = opposite[direction];
	
	    if (direction === directions.LEFT) date = nextDate(date, -1, "month", min, max);else if (direction === directions.RIGHT) date = nextDate(date, 1, "month", min, max);else if (direction === directions.UP) date = nextDate(date, -4, "month", min, max);else if (direction === directions.DOWN) date = nextDate(date, 4, "month", min, max);
	
	    return date;
	  }
	
	});
	
	function nextDate(date, val, unit, min, max) {
	  var newDate = dates.add(date, val, unit);
	  return dates.inRange(newDate, min, max, "month") ? newDate : date;
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    _ = __webpack_require__(34),
	    cx = __webpack_require__(66),
	    dates = __webpack_require__(25),
	    directions = __webpack_require__(29).directions,
	    CustomPropTypes = __webpack_require__(36),
	    Btn = __webpack_require__(42);
	
	var opposite = {
	  LEFT: directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	module.exports = React.createClass({
	
	  displayName: "DecadeView",
	
	  mixins: [__webpack_require__(45), __webpack_require__(43), __webpack_require__(44), __webpack_require__(46)("decade", "year")],
	
	  propTypes: {
	    culture: React.PropTypes.string,
	
	    value: React.PropTypes.instanceOf(Date),
	    min: React.PropTypes.instanceOf(Date),
	    max: React.PropTypes.instanceOf(Date),
	    onChange: React.PropTypes.func.isRequired,
	
	    yearFormat: CustomPropTypes.localeFormat.isRequired
	
	  },
	
	  render: function () {
	    var props = _.omit(this.props, ["max", "min", "value", "onChange"]),
	        years = getDecadeYears(this.props.value),
	        rows = _.chunk(years, 4);
	
	    return React.createElement(
	      "table",
	      _extends({}, props, {
	        tabIndex: this.props.disabled ? "-1" : "0",
	        role: "grid",
	        className: "rw-calendar-grid rw-nav-view",
	        "aria-activedescendant": this._id("_selected_item"),
	        onKeyUp: this._keyUp }),
	      React.createElement(
	        "tbody",
	        null,
	        rows.map(this._row)
	      )
	    );
	  },
	
	  _row: function (row, i) {
	    var _this = this;
	
	    var id = this._id("_selected_item");
	
	    return React.createElement(
	      "tr",
	      { key: "row_" + i, role: "row" },
	      row.map(function (date, i) {
	        var focused = dates.eq(date, _this.state.focusedDate, "year"),
	            selected = dates.eq(date, _this.props.value, "year"),
	            currentYear = dates.eq(date, _this.props.today, "year");
	
	        return !dates.inRange(date, _this.props.min, _this.props.max, "year") ? React.createElement(
	          "td",
	          { key: i, role: "gridcell", className: "rw-empty-cell" },
	          " "
	        ) : React.createElement(
	          "td",
	          { key: i, role: "gridcell" },
	          React.createElement(
	            Btn,
	            { onClick: _this.props.onChange.bind(null, date), tabIndex: "-1",
	              id: focused ? id : undefined,
	              "aria-selected": selected,
	              "aria-disabled": _this.props.disabled,
	              disabled: _this.props.disabled,
	              className: cx({
	                "rw-off-range": !inDecade(date, _this.props.value),
	                "rw-state-focus": focused,
	                "rw-state-selected": selected,
	                "rw-now": currentYear
	              }) },
	            dates.format(date, _this.props.yearFormat, _this.props.culture)
	          )
	        );
	      })
	    );
	  },
	
	  move: function (date, direction) {
	    var min = this.props.min,
	        max = this.props.max;
	
	    if (this.isRtl() && opposite[direction]) direction = opposite[direction];
	
	    if (direction === directions.LEFT) date = nextDate(date, -1, "year", min, max);else if (direction === directions.RIGHT) date = nextDate(date, 1, "year", min, max);else if (direction === directions.UP) date = nextDate(date, -4, "year", min, max);else if (direction === directions.DOWN) date = nextDate(date, 4, "year", min, max);
	
	    return date;
	  }
	
	});
	
	function inDecade(date, start) {
	  return dates.gte(date, dates.startOf(start, "decade"), "year") && dates.lte(date, dates.endOf(start, "decade"), "year");
	}
	
	function getDecadeYears(_date) {
	  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	      date = dates.add(dates.startOf(_date, "decade"), -2, "year");
	
	  return days.map(function (i) {
	    return date = dates.add(date, 1, "year");
	  });
	}
	
	function nextDate(date, val, unit, min, max) {
	  var newDate = dates.add(date, val, unit);
	  return dates.inRange(newDate, min, max, "year") ? newDate : date;
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    cx = __webpack_require__(66),
	    dates = __webpack_require__(25),
	    directions = __webpack_require__(29).directions,
	    Btn = __webpack_require__(42),
	    _ = __webpack_require__(34),
	    CustomPropTypes = __webpack_require__(36); //omit
	
	var opposite = {
	  LEFT: directions.RIGHT,
	  RIGHT: directions.LEFT
	};
	
	module.exports = React.createClass({
	
	  displayName: "CenturyView",
	
	  mixins: [__webpack_require__(45), __webpack_require__(43), __webpack_require__(44), __webpack_require__(46)("century", "decade")],
	
	  propTypes: {
	    culture: React.PropTypes.string,
	    value: React.PropTypes.instanceOf(Date),
	    min: React.PropTypes.instanceOf(Date),
	    max: React.PropTypes.instanceOf(Date),
	
	    onChange: React.PropTypes.func.isRequired,
	
	    decadeFormat: CustomPropTypes.localeFormat.isRequired
	  },
	
	  render: function () {
	    var props = _.omit(this.props, ["max", "min", "value", "onChange"]),
	        years = getCenturyDecades(this.props.value),
	        rows = _.chunk(years, 4);
	
	    return React.createElement(
	      "table",
	      _extends({}, props, {
	        tabIndex: this.props.disabled ? "-1" : "0",
	        role: "grid",
	        className: "rw-calendar-grid rw-nav-view",
	        "aria-activedescendant": this._id("_selected_item"),
	        onKeyUp: this._keyUp }),
	      React.createElement(
	        "tbody",
	        null,
	        rows.map(this._row)
	      )
	    );
	  },
	
	  _row: function (row, i) {
	    var _this = this;
	
	    var id = this._id("_selected_item");
	
	    return React.createElement(
	      "tr",
	      { key: "row_" + i, role: "row" },
	      row.map(function (date, i) {
	        var focused = dates.eq(date, _this.state.focusedDate, "decade"),
	            selected = dates.eq(date, _this.props.value, "decade"),
	            d = inRangeDate(date, _this.props.min, _this.props.max),
	            currentDecade = dates.eq(date, _this.props.today, "decade");
	
	        return !inRange(date, _this.props.min, _this.props.max) ? React.createElement(
	          "td",
	          { key: i, role: "gridcell", className: "rw-empty-cell" },
	          " "
	        ) : React.createElement(
	          "td",
	          { key: i, role: "gridcell" },
	          React.createElement(
	            Btn,
	            { onClick: _this.props.onChange.bind(null, d),
	              tabIndex: "-1",
	              id: focused ? id : undefined,
	              "aria-selected": selected,
	              "aria-disabled": _this.props.disabled,
	              disabled: _this.props.disabled,
	              className: cx({
	                "rw-off-range": !inCentury(date, _this.props.value),
	                "rw-state-focus": focused,
	                "rw-state-selected": selected,
	                "rw-now": currentDecade
	              }) },
	            dates.format(dates.startOf(date, "decade"), _this.props.decadeFormat, _this.props.culture)
	          )
	        );
	      })
	    );
	  },
	
	  move: function (date, direction) {
	    var min = this.props.min,
	        max = this.props.max;
	
	    if (this.isRtl() && opposite[direction]) direction = opposite[direction];
	
	    if (direction === directions.LEFT) date = nextDate(date, -1, "decade", min, max);else if (direction === directions.RIGHT) date = nextDate(date, 1, "decade", min, max);else if (direction === directions.UP) date = nextDate(date, -4, "decade", min, max);else if (direction === directions.DOWN) date = nextDate(date, 4, "decade", min, max);
	
	    return date;
	  }
	
	});
	
	function label(date, format, culture) {
	  return dates.format(dates.startOf(date, "decade"), format, culture) + " - " + dates.format(dates.endOf(date, "decade"), format, culture);
	}
	
	function inRangeDate(decade, min, max) {
	  return dates.max(dates.min(decade, max), min);
	}
	
	function inRange(decade, min, max) {
	  return dates.gte(decade, dates.startOf(min, "decade"), "year") && dates.lte(decade, dates.endOf(max, "decade"), "year");
	}
	
	function inCentury(date, start) {
	  return dates.gte(date, dates.startOf(start, "century"), "year") && dates.lte(date, dates.endOf(start, "century"), "year");
	}
	
	function getCenturyDecades(_date) {
	  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	      date = dates.add(dates.startOf(_date, "century"), -20, "year");
	
	  return days.map(function (i) {
	    return date = dates.add(date, 10, "year");
	  });
	}
	
	function nextDate(date, val, unit, min, max) {
	  var newDate = dates.add(date, val, unit);
	  return dates.inRange(newDate, min, max, "decade") ? newDate : date;
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var dateMath = __webpack_require__(67),
	    globalize = __webpack_require__(41),
	    _ = __webpack_require__(34); //extend
	
	var shortNames = {};
	
	var dates = module.exports = _.assign(dateMath, {
	  // wrapper methods for isolating globalize use throughout the lib
	  // looking forward towards the 1.0 release
	  culture: function (culture) {
	    return culture ? globalize.findClosestCulture(culture) : globalize.culture();
	  },
	
	  startOfWeek: function (culture) {
	    culture = dates.culture(culture);
	
	    if (!culture || !culture.calendar) return 0;
	
	    return culture.calendar.firstDay || 0;
	  },
	
	  parse: function (date, format, culture) {
	    if (typeof format === "function") return format(date, culture);
	
	    return globalize.parseDate(date, format, culture);
	  },
	
	  format: function (date, format, culture) {
	    if (typeof format === "function") return format(date, culture);
	
	    return globalize.format(date, format, culture);
	  },
	
	  //-------------------------------------
	
	  shortDay: function (dayOfTheWeek) {
	    var culture = arguments[1] === undefined ? "default" : arguments[1];
	    var names = shortNames[culture] || (shortNames[culture] = dates.shortDaysOfWeek(culture));
	
	    return names[dayOfTheWeek];
	  },
	
	  shortDaysOfWeek: function (culture) {
	    var start = dates.startOfWeek(culture),
	        days,
	        front;
	
	    culture = dates.culture(culture);
	
	    if (culture && culture.calendar) {
	      days = culture.calendar.days.namesShort.slice();
	
	      if (start === 0) return days;
	
	      front = days.splice(0, start);
	      days = days.concat(front);
	      return days;
	    }
	  },
	
	  monthsInYear: function (year) {
	    var months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
	        date = new Date(year, 0, 1);
	
	    return months.map(function (i) {
	      return dates.month(date, i);
	    });
	  },
	
	  firstOfDecade: function (date) {
	    var decade = dates.year(date) % 10;
	
	    return dates.subtract(date, decade, "year");
	  },
	
	  lastOfDecade: function (date) {
	    return dates.add(dates.firstOfDecade(date), 9, "year");
	  },
	
	  firstOfCentury: function (date) {
	    var decade = dates.year(date) % 100;
	    return dates.subtract(date, decade, "year");
	  },
	
	  lastOfCentury: function (date) {
	    return dates.add(dates.firstOfCentury(date), 99, "year");
	  },
	
	  firstVisibleDay: function (date) {
	    var firstOfMonth = dates.startOf(date, "month");
	    return dates.startOf(firstOfMonth, "week");
	  },
	
	  lastVisibleDay: function (date) {
	    var endOfMonth = dates.endOf(date, "month");
	    return dates.endOf(endOfMonth, "week");
	  },
	
	  visibleDays: function (date) {
	    var current = dates.firstVisibleDay(date),
	        last = dates.lastVisibleDay(date),
	        days = [];
	
	    while (dates.lte(current, last, "day")) {
	      days.push(current);
	      current = dates.add(current, 1, "day");
	    }
	
	    return days;
	  },
	
	  merge: function (date, time) {
	    if (time == null && date == null) return null;
	
	    if (time == null) time = new Date();
	    if (date == null) date = new Date();
	
	    date = dates.startOf(date, "day");
	    date = dates.hours(date, dates.hours(time));
	    date = dates.minutes(date, dates.minutes(time));
	    date = dates.seconds(date, dates.seconds(time));
	    return dates.milliseconds(date, dates.milliseconds(time));
	  },
	
	  sameMonth: function (dateA, dateB) {
	    return dates.eq(dateA, dateB, "month");
	  },
	
	  today: function () {
	    return this.startOf(new Date(), "day");
	  },
	
	  yesterday: function () {
	    return this.add(this.startOf(new Date(), "day"), -1, "day");
	  },
	
	  tomorrow: function () {
	    return this.add(this.startOf(new Date(), "day"), 1, "day");
	  },
	
	  formats: {
	    DAY_OF_MONTH: "dd",
	    DAY_NAME_SHORT: null,
	    MONTH_NAME_ABRV: "MMM",
	    MONTH_YEAR: "MMMM yyyy",
	    YEAR: "yyyy",
	    FOOTER: "D"
	  }
	
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    invariant = __webpack_require__(69),
	    cx = __webpack_require__(66),
	    compat = __webpack_require__(47),
	    _ = __webpack_require__(34) //pick, omit, has
	
	,
	    dates = __webpack_require__(25),
	    views = __webpack_require__(29).calendarViews,
	    popups = __webpack_require__(29).datePopups,
	    Popup = __webpack_require__(27),
	    Calendar = __webpack_require__(18).BaseCalendar,
	    Time = __webpack_require__(51),
	    DateInput = __webpack_require__(52),
	    Btn = __webpack_require__(42),
	    CustomPropTypes = __webpack_require__(36),
	    createUncontrolledWidget = __webpack_require__(68);
	
	var viewEnum = Object.keys(views).map(function (k) {
	  return views[k];
	});
	
	var propTypes = _extends({}, compat.type(Calendar).propTypes, {
	
	  //-- controlled props -----------
	  value: React.PropTypes.instanceOf(Date),
	  onChange: React.PropTypes.func,
	  open: React.PropTypes.oneOf([false, popups.TIME, popups.CALENDAR]),
	  onToggle: React.PropTypes.func,
	  //------------------------------------
	
	  onSelect: React.PropTypes.func,
	
	  min: React.PropTypes.instanceOf(Date),
	  max: React.PropTypes.instanceOf(Date),
	
	  culture: React.PropTypes.string,
	
	  format: CustomPropTypes.localeFormat,
	  editFormat: CustomPropTypes.localeFormat,
	
	  calendar: React.PropTypes.bool,
	  time: React.PropTypes.bool,
	
	  timeComponent: CustomPropTypes.elementType,
	
	  //popup
	  dropUp: React.PropTypes.bool,
	  duration: React.PropTypes.number,
	
	  placeholder: React.PropTypes.string,
	  name: React.PropTypes.string,
	
	  initialView: React.PropTypes.oneOf(viewEnum),
	  finalView: React.PropTypes.oneOf(viewEnum),
	
	  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),
	
	  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["readOnly"])]),
	
	  parse: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.string), React.PropTypes.string, React.PropTypes.func]),
	
	  messages: React.PropTypes.shape({
	    calendarButton: React.PropTypes.string,
	    timeButton: React.PropTypes.string })
	});
	
	var DateTimePicker = React.createClass({
	
	  displayName: "DateTimePicker",
	
	  mixins: [__webpack_require__(45), __webpack_require__(49), __webpack_require__(43), __webpack_require__(53), __webpack_require__(50)],
	
	  propTypes: propTypes,
	
	  getInitialState: function () {
	    return {
	      focused: false };
	  },
	
	  getDefaultProps: function () {
	
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
	        calendarButton: "Select Date",
	        timeButton: "Select Time" }
	    };
	  },
	
	  render: function () {
	    var _this = this;
	
	    var _$omit = _.omit(this.props, Object.keys(propTypes));
	
	    var className = _$omit.className;
	    var props = _objectWithoutProperties(_$omit, ["className"]);
	    var calProps = _.pick(this.props, Object.keys(compat.type(Calendar).propTypes));
	
	    var timeListID = this._id("_time_listbox");
	    var timeOptID = this._id("_time_option");
	    var dateListID = this._id("_cal");
	    var dropUp = this.props.dropUp;
	    var value = dateOrNull(this.props.value);
	    var owns;
	
	    if (dateListID && this.props.calendar) owns = dateListID;
	    if (timeListID && this.props.time) owns += " " + timeListID;
	
	    return React.createElement(
	      "div",
	      _extends({}, props, {
	        ref: "element",
	        tabIndex: "-1",
	        onKeyDown: this._maybeHandle(this._keyDown),
	        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
	        onBlur: this._focus.bind(null, false),
	        className: cx(className, "rw-datetimepicker", "rw-widget", (function () {
	          var _cx = {};
	          _cx["rw-state-focus"] = _this.state.focused;
	          _cx["rw-state-disabled"] = _this.isDisabled();
	          _cx["rw-state-readonly"] = _this.isReadOnly();
	          _cx["rw-has-both"] = _this.props.calendar && _this.props.time;
	          _cx["rw-has-neither"] = !_this.props.calendar && !_this.props.time;
	          _cx["rw-rtl"] = _this.isRtl();
	          _cx["rw-open" + (dropUp ? "-up" : "")] = _this.props.open;
	          return _cx;
	        })()) }),
	      React.createElement(DateInput, { ref: "valueInput",
	        "aria-activedescendant": this.props.open ? this.props.open === popups.CALENDAR ? this._id("_cal_view_selected_item") : timeOptID : undefined,
	        "aria-expanded": !!this.props.open,
	        "aria-busy": !!this.props.busy,
	        "aria-owns": owns,
	        "aria-haspopup": true,
	        placeholder: this.props.placeholder,
	        name: this.props.name,
	        disabled: this.isDisabled(),
	        readOnly: this.isReadOnly(),
	        role: this.props.time ? "combobox" : null,
	        value: value,
	
	        format: getFormat(this.props),
	        editFormat: this.props.editFormat,
	
	        editing: this.state.focused,
	        culture: this.props.culture,
	        parse: this._parse,
	        onChange: this._change }),
	      (this.props.calendar || this.props.time) && React.createElement(
	        "span",
	        { className: "rw-select" },
	        this.props.calendar && React.createElement(
	          Btn,
	          { tabIndex: "-1",
	            className: "rw-btn-calendar",
	            disabled: this.isDisabled() || this.isReadOnly(),
	            "aria-disabled": this.isDisabled() || this.isReadOnly(),
	            onClick: this._maybeHandle(this._click.bind(null, popups.CALENDAR)) },
	          React.createElement(
	            "i",
	            { className: "rw-i rw-i-calendar" },
	            React.createElement(
	              "span",
	              { className: "rw-sr" },
	              this.props.messages.calendarButton
	            )
	          )
	        ),
	        this.props.time && React.createElement(
	          Btn,
	          { tabIndex: "-1",
	            className: "rw-btn-time",
	            disabled: this.isDisabled() || this.isReadOnly(),
	            "aria-disabled": this.isDisabled() || this.isReadOnly(),
	            onClick: this._maybeHandle(this._click.bind(null, popups.TIME)) },
	          React.createElement(
	            "i",
	            { className: "rw-i rw-i-clock-o" },
	            React.createElement(
	              "span",
	              { className: "rw-sr" },
	              this.props.messages.timeButton
	            )
	          )
	        )
	      ),
	      React.createElement(
	        Popup,
	        {
	          dropUp: dropUp,
	          open: this.props.open === popups.TIME,
	          onRequestClose: this.close },
	        React.createElement(
	          "div",
	          null,
	          React.createElement(Time, { ref: "timePopup",
	            id: timeListID,
	            optID: timeOptID,
	            "aria-hidden": !this.props.open,
	            style: { maxHeight: 200, height: "auto" },
	            value: value,
	            min: this.props.min,
	            max: this.props.max,
	            culture: this.props.culture,
	            onMove: this._scrollTo,
	            preserveDate: !!this.props.calendar,
	            itemComponent: this.props.timeComponent,
	            onSelect: this._maybeHandle(this._selectTime) })
	        )
	      ),
	      React.createElement(
	        Popup,
	        {
	          className: "rw-calendar-popup",
	          dropUp: dropUp,
	          open: this.props.open === popups.CALENDAR,
	          duration: this.props.duration,
	          onRequestClose: this.close },
	        React.createElement(Calendar, _extends({}, calProps, {
	          ref: "calPopup",
	          tabIndex: "-1",
	          id: dateListID,
	          value: value,
	          "aria-hidden": !this.props.open,
	          onChange: this._maybeHandle(this._selectDate) }))
	      )
	    );
	  },
	
	  _change: function (date, str, constrain) {
	    var change = this.props.onChange;
	
	    if (constrain) date = this.inRangeValue(date);
	
	    if (change) {
	      if (date == null || this.props.value == null) {
	        if (date != this.props.value) change(date, str);
	      } else if (!dates.eq(date, this.props.value)) change(date, str);
	    }
	  },
	
	  _keyDown: function (e) {
	
	    if (e.key === "Tab") return;
	
	    if (e.key === "Escape" && this.props.open) this.close();else if (e.altKey) {
	      e.preventDefault();
	
	      if (e.key === "ArrowDown") this.open(this.props.open === popups.CALENDAR ? popups.TIME : popups.CALENDAR);else if (e.key === "ArrowUp") this.close();
	    } else if (this.props.open) {
	      if (this.props.open === popups.CALENDAR) this.refs.calPopup._keyDown(e);
	      if (this.props.open === popups.TIME) this.refs.timePopup._keyDown(e);
	    }
	
	    this.notify("onKeyDown", [e]);
	  },
	
	  //timeout prevents transitions from breaking focus
	  _focus: function (focused, e) {
	    var _this = this;
	
	    var input = this.refs.valueInput;
	
	    this.setTimeout("focus", function () {
	
	      if (focused) input.getDOMNode().focus();else _this.close();
	
	      if (focused !== _this.state.focused) {
	        _this.notify(focused ? "onFocus" : "onBlur", e);
	        _this.setState({ focused: focused });
	      }
	    });
	  },
	
	  _selectDate: function (date) {
	    var format = getFormat(this.props),
	        dateTime = dates.merge(date, this.props.value),
	        dateStr = formatDate(date, format, this.props.culture);
	
	    this.close();
	    this.notify("onSelect", [dateTime, dateStr]);
	    this._change(dateTime, dateStr, true);
	  },
	
	  _selectTime: function (datum) {
	    var format = getFormat(this.props),
	        dateTime = dates.merge(this.props.value, datum.date),
	        dateStr = formatDate(datum.date, format, this.props.culture);
	
	    this.close();
	    this.notify("onSelect", [dateTime, dateStr]);
	    this._change(dateTime, dateStr, true);
	  },
	
	  _click: function (view, e) {
	    this._focus(true);
	    this.toggle(view, e);
	  },
	
	  _parse: function (string) {
	    var format = getFormat(this.props, true),
	        formats = [];
	
	    if (this.props.parse === "function") return this.props.parse(string, v);
	
	    if (typeof format !== "function") formats.push(format);
	
	    if (this.props.parse) formats = formats.concat(props.parse);
	
	    invariant(formats.length, "React Widgets: there are no specified `parse` formats provided and the `format` prop is a function. " + "the DateTimePicker is unable to parse `%s` into a dateTime, " + "please provide either a parse function or Globalize.js compatible string format", string);
	
	    return formatsParser(formats, this.props.culture, string);
	  },
	
	  toggle: function (view, e) {
	
	    this.props.open ? this.state.view !== view ? this.open(view) : this.close(view) : this.open(view);
	  },
	
	  open: function (view) {
	    if (this.props.open !== view && this.props[view] === true) this.notify("onToggle", view);
	  },
	
	  close: function () {
	    if (this.props.open) this.notify("onToggle", false);
	  },
	
	  inRangeValue: function (value) {
	    if (value == null) return value;
	
	    return dates.max(dates.min(value, this.props.max), this.props.min);
	  } });
	
	module.exports = createUncontrolledWidget(DateTimePicker, { open: "onToggle", value: "onChange" });
	
	module.exports.BaseDateTimePicker = DateTimePicker;
	
	function getFormat(props) {
	  var cal = props[popups.CALENDAR] != null ? props.calendar : true,
	      time = props[popups.TIME] != null ? props.time : true;
	
	  return props.format ? props.format : cal && time || !cal && !time ? "f" : cal ? "d" : "t";
	}
	
	function formatDate(date, format, culture) {
	  var val = "";
	
	  if (date instanceof Date && !isNaN(date.getTime())) val = dates.format(date, format, culture);
	
	  return val;
	}
	
	function formatsParser(formats, culture, str) {
	  var date;
	
	  for (var i = 0; i < formats.length; i++) {
	    date = dates.parse(str, formats[i], culture);
	    if (date) return date;
	  }
	  return null;
	}
	
	function dateOrNull(dt) {
	  if (dt && !isNaN(dt.getTime())) return dt;
	  return null;
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    $ = __webpack_require__(38),
	    cx = __webpack_require__(66);
	
	var PopupContent = React.createClass({
	  displayName: "PopupContent",
	
	  render: function () {
	    var Content = React.Children.only(this.props.children);
	
	    Content.props.className = (Content.props.className || "") + " rw-popup rw-widget";
	
	    return Content;
	  }
	});
	
	module.exports = React.createClass({
	  displayName: "exports",
	
	  propTypes: {
	    open: React.PropTypes.bool,
	    dropUp: React.PropTypes.bool,
	    duration: React.PropTypes.number,
	
	    onRequestClose: React.PropTypes.func.isRequired,
	    onClosing: React.PropTypes.func,
	    onOpening: React.PropTypes.func,
	    onClose: React.PropTypes.func,
	    onOpen: React.PropTypes.func
	  },
	
	  getDefaultProps: function () {
	    return {
	      duration: 200,
	      open: false,
	      onClosing: function () {},
	      onOpening: function () {},
	      onClose: function () {},
	      onOpen: function () {} };
	  },
	
	  componentDidMount: function () {
	    !this.props.open && this.close(0);
	  },
	
	  componentWillReceiveProps: function (nextProps) {
	    this.setState({
	      contentChanged: childKey(nextProps.children) !== childKey(this.props.children)
	    });
	  },
	
	  componentDidUpdate: function (pvProps, pvState) {
	    var closing = pvProps.open && !this.props.open,
	        opening = !pvProps.open && this.props.open;
	
	    if (opening) this.open();else if (closing) this.close();
	  },
	
	  render: function () {
	    var _props = this.props;
	    var className = _props.className;
	    var open = _props.open;
	    var dropUp = _props.dropUp;
	
	    var props = _objectWithoutProperties(_props, ["className", "open", "dropUp"]);
	
	    return React.createElement(
	      "div",
	      _extends({}, props, { className: cx(className, "rw-popup-container", { "rw-dropup": dropUp }) }),
	      React.createElement(
	        PopupContent,
	        { ref: "content" },
	        this.props.children
	      )
	    );
	  },
	
	  dimensions: function () {
	    var el = this.getDOMNode(),
	        content = this.refs.content.getDOMNode(),
	        margin = parseInt($.css(content, "margin-top"), 10) + parseInt($.css(content, "margin-bottom"), 10);
	
	    el.style.display = "block";
	    el.style.height = $.height(content) + (isNaN(margin) ? 0 : margin) + "px";
	  },
	
	  open: function () {
	    var self = this,
	        anim = this.getDOMNode(),
	        el = this.refs.content.getDOMNode();
	
	    this.ORGINAL_POSITION = $.css(el, "position");
	
	    this._isOpening = true;
	    this.dimensions();
	    this.props.onOpening();
	
	    anim.className += " rw-popup-animating";
	    el.style.position = "absolute";
	
	    $.animate(el, { top: 0 }, self.props.duration, "ease", function () {
	      if (!self._isOpening) return;
	
	      anim.className = anim.className.replace(/ ?rw-popup-animating/g, "");
	
	      el.style.position = self.ORGINAL_POSITION;
	      anim.style.overflow = "visible";
	      self.ORGINAL_POSITION = null;
	
	      self.props.onOpen();
	    });
	  },
	
	  close: function (dur) {
	    var self = this,
	        el = this.refs.content.getDOMNode(),
	        anim = this.getDOMNode();
	
	    this.ORGINAL_POSITION = $.css(el, "position");
	
	    this._isOpening = false;
	    this.dimensions();
	    this.props.onClosing();
	
	    anim.style.overflow = "hidden";
	    anim.className += " rw-popup-animating";
	    el.style.position = "absolute";
	
	    $.animate(el, { top: this.props.dropUp ? "100%" : "-100%" }, dur === undefined ? this.props.duration : dur, "ease", function () {
	      if (self._isOpening) return;
	
	      el.style.position = self.ORGINAL_POSITION;
	      anim.className = anim.className.replace(/ ?rw-popup-animating/g, "");
	
	      anim.style.display = "none";
	      self.ORGINAL_POSITION = null;
	      self.props.onClose();
	    });
	  }
	
	});
	
	function childKey(children) {
	  var nextChildMapping = React.Children.map(children, function (c) {
	    return c;
	  });
	  for (var key in nextChildMapping) return key;
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    CustomPropTypes = __webpack_require__(36),
	    cx = __webpack_require__(66),
	    _ = __webpack_require__(34);
	
	module.exports = React.createClass({
	
	  displayName: "List",
	
	  mixins: [__webpack_require__(45), __webpack_require__(17), __webpack_require__(54)],
	
	  propTypes: {
	    data: React.PropTypes.array,
	    onSelect: React.PropTypes.func,
	    onMove: React.PropTypes.func,
	    itemComponent: CustomPropTypes.elementType,
	
	    selectedIndex: React.PropTypes.number,
	    focusedIndex: React.PropTypes.number,
	    valueField: React.PropTypes.string,
	    textField: React.PropTypes.string,
	
	    optID: React.PropTypes.string,
	
	    messages: React.PropTypes.shape({
	      emptyList: React.PropTypes.string
	    }) },
	
	  getDefaultProps: function () {
	    return {
	      optID: "",
	      onSelect: function () {},
	      data: [],
	      messages: {
	        emptyList: "There are no items in this list"
	      }
	    };
	  },
	
	  getInitialState: function () {
	    return {};
	  },
	
	  componentDidMount: function () {
	    this._setScrollPosition();
	  },
	
	  componentDidUpdate: function (prevProps) {
	    if (prevProps.focused !== this.props.focused) this._setScrollPosition();
	  },
	
	  render: function () {
	    var _this = this;
	
	    var _$omit = _.omit(this.props, ["data"]);
	
	    var className = _$omit.className;
	    var props = _objectWithoutProperties(_$omit, ["className"]);
	    var ItemComponent = this.props.itemComponent;
	    var items;
	
	    items = !this.props.data.length ? React.createElement(
	      "li",
	      null,
	      this.props.messages.emptyList
	    ) : this.props.data.map(function (item, idx) {
	      var focused = item === _this.props.focused,
	          selected = item === _this.props.selected;
	
	      return React.createElement(
	        "li",
	        {
	          tabIndex: "-1",
	          key: "item_" + idx,
	          role: "option",
	          id: focused ? _this.props.optID : undefined,
	          "aria-selected": selected,
	          className: cx({
	            "rw-list-option": true,
	            "rw-state-focus": focused,
	            "rw-state-selected": selected }),
	          onClick: _this.props.onSelect.bind(null, item) },
	        ItemComponent ? React.createElement(ItemComponent, { item: item }) : _this._dataText(item)
	      );
	    });
	
	    return React.createElement(
	      "ul",
	      _extends({}, props, {
	        className: (className || "") + " rw-list",
	        ref: "scrollable",
	        role: "listbox" }),
	      items
	    );
	  },
	
	  _data: function () {
	    return this.props.data;
	  },
	
	  _setScrollPosition: function () {
	    var list = this.getDOMNode(),
	        idx = this._data().indexOf(this.props.focused),
	        selected = list.children[idx];
	
	    if (!selected) return;
	
	    this.notify("onMove", [selected, list]);
	  }
	
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(34); //object
	
	var views = {
	  MONTH: "month",
	  YEAR: "year",
	  DECADE: "decade",
	  CENTURY: "century"
	};
	
	module.exports = {
	
	  directions: {
	    LEFT: "LEFT",
	    RIGHT: "RIGHT",
	    UP: "UP",
	    DOWN: "DOWN"
	  },
	
	  datePopups: {
	    TIME: "time",
	    CALENDAR: "calendar"
	  },
	
	  calendarViews: views,
	
	  calendarViewHierarchy: (function () {
	    var _calendarViewHierarchy = {};
	    _calendarViewHierarchy[views.MONTH] = views.YEAR;
	    _calendarViewHierarchy[views.YEAR] = views.DECADE;
	    _calendarViewHierarchy[views.DECADE] = views.CENTURY;
	    return _calendarViewHierarchy;
	  })(),
	
	  calendarViewUnits: (function () {
	    var _calendarViewUnits = {};
	    _calendarViewUnits[views.MONTH] = views.DAY;
	    _calendarViewUnits[views.YEAR] = views.MONTH;
	    _calendarViewUnits[views.DECADE] = views.YEAR;
	    _calendarViewUnits[views.CENTURY] = views.DECADE;
	    return _calendarViewUnits;
	  })()
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    cx = __webpack_require__(66),
	    _ = __webpack_require__(34),
	    SelectInput = __webpack_require__(32),
	    TagList = __webpack_require__(31),
	    Popup = __webpack_require__(27),
	    PlainList = __webpack_require__(28),
	    GroupableList = __webpack_require__(55),
	    validateList = __webpack_require__(37),
	    createUncontrolledWidget = __webpack_require__(68),
	    CustomPropTypes = __webpack_require__(36);
	
	var propTypes = {
	  data: React.PropTypes.array,
	  //-- controlled props --
	  value: React.PropTypes.array,
	  onChange: React.PropTypes.func,
	
	  searchTerm: React.PropTypes.string,
	  onSearch: React.PropTypes.func,
	
	  open: React.PropTypes.bool,
	  onToggle: React.PropTypes.func,
	  //-------------------------------------------
	
	  valueField: React.PropTypes.string,
	  textField: React.PropTypes.string,
	
	  tagComponent: CustomPropTypes.elementType,
	  itemComponent: CustomPropTypes.elementType,
	  listComponent: CustomPropTypes.elementType,
	
	  groupComponent: CustomPropTypes.elementType,
	  groupBy: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.string]),
	
	  onSelect: React.PropTypes.func,
	  onCreate: React.PropTypes.func,
	
	  dropUp: React.PropTypes.bool,
	  duration: React.PropTypes.number, //popup
	
	  placeholder: React.PropTypes.string,
	
	  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.array, React.PropTypes.oneOf(["disabled"])]),
	
	  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.array, React.PropTypes.oneOf(["readonly"])]),
	
	  messages: React.PropTypes.shape({
	    open: React.PropTypes.string,
	    emptyList: React.PropTypes.string,
	    emptyFilter: React.PropTypes.string
	  })
	};
	
	var Multiselect = React.createClass({
	
	  displayName: "Multiselect",
	
	  mixins: [__webpack_require__(45), __webpack_require__(49), __webpack_require__(56), __webpack_require__(17), __webpack_require__(53), __webpack_require__(50)],
	
	  propTypes: propTypes,
	
	  getDefaultProps: function () {
	    return {
	      data: [],
	      filter: "startsWith",
	      value: [],
	      open: false,
	      searchTerm: "",
	      messages: {
	        createNew: "(create new tag)",
	        emptyList: "There are no items in this list",
	        emptyFilter: "The filter returned no results"
	      }
	    };
	  },
	
	  getInitialState: function () {
	    var _this = this;
	
	    var dataItems = _.splat(this.props.value).map(function (item) {
	      return _this._dataItem(_this.props.data, item);
	    }),
	        data = this.process(this.props.data, dataItems, this.props.searchTerm);
	
	    return {
	      focusedItem: data[0],
	      processedData: data,
	      dataItems: dataItems
	    };
	  },
	
	  componentDidMount: function () {
	    validateList(this.refs.list);
	  },
	
	  componentWillReceiveProps: function (nextProps) {
	    var _this = this;
	
	    var values = _.splat(nextProps.value),
	        current = this.state.focusedItem,
	        items = this.process(nextProps.data, values, nextProps.searchTerm);
	
	    this.setState({
	      processedData: items,
	      focusedItem: items.indexOf(current) === -1 ? items[0] : current,
	      dataItems: values.map(function (item) {
	        return _this._dataItem(nextProps.data, item);
	      })
	    });
	  },
	
	  render: function () {
	    var _this = this;
	
	    var _$omit = _.omit(this.props, Object.keys(propTypes));
	
	    var className = _$omit.className;
	    var children = _$omit.children;
	    var props = _objectWithoutProperties(_$omit, ["className", "children"]);
	
	    var listID = this._id("_listbox");
	    var optID = this._id("_option");
	    var items = this._data();
	    var values = this.state.dataItems;
	    var dropUp = this.props.dropUp;
	
	    var List = this.props.listComponent || this.props.groupBy && GroupableList || PlainList;
	    var listProps = _.pick(this.props, Object.keys(List.type.propTypes));
	
	    return React.createElement(
	      "div",
	      _extends({}, props, {
	        ref: "element",
	        onKeyDown: this._maybeHandle(this._keyDown),
	        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
	        onBlur: this._focus.bind(null, false),
	        tabIndex: "-1",
	        className: cx(className, "rw-multiselect", "rw-widget", (function () {
	          var _cx = {};
	          _cx["rw-state-focus"] = _this.state.focused;
	          _cx["rw-state-disabled"] = _this.props.disabled === true;
	          _cx["rw-state-readonly"] = _this.props.readOnly === true;
	          _cx["rw-rtl"] = _this.isRtl();
	          _cx["rw-open" + (dropUp ? "-up" : "")] = _this.props.open;
	          return _cx;
	        })()) }),
	      React.createElement(
	        "div",
	        { className: "rw-multiselect-wrapper" },
	        this.props.busy && React.createElement("i", { className: "rw-i rw-loading" }),
	        !!values.length && React.createElement(TagList, {
	          ref: "tagList",
	          value: values,
	          textField: this.props.textField,
	          valueField: this.props.valueField,
	          valueComponent: this.props.tagComponent,
	          disabled: this.props.disabled,
	          readOnly: this.props.readOnly,
	          onDelete: this._delete }),
	        React.createElement(SelectInput, {
	          ref: "input",
	          "aria-activedescendent": this.props.open ? optID : undefined,
	          "aria-expanded": this.props.open,
	          "aria-busy": !!this.props.busy,
	          "aria-owns": listID,
	          "aria-haspopup": true,
	          value: this.props.searchTerm,
	          disabled: this.props.disabled === true,
	          readOnly: this.props.readOnly === true,
	          placeholder: this._placeholder(),
	          onKeyDown: this._searchKeyDown,
	          onKeyUp: this._searchgKeyUp,
	          onChange: this._typing,
	          onFocus: this._inputFocus,
	          maxLength: this.props.maxLength })
	      ),
	      React.createElement(
	        Popup,
	        _extends({}, _.pick(this.props, Object.keys(Popup.type.propTypes)), {
	          onRequestClose: this.close }),
	        React.createElement(
	          "div",
	          null,
	          React.createElement(List, _extends({ ref: "list"
	          }, listProps, {
	            readOnly: !!listProps.readOnly,
	            disabled: !!listProps.disabled,
	            id: listID,
	            optID: optID,
	            "aria-autocomplete": "list",
	            "aria-hidden": !this.props.open,
	            data: items,
	            focused: this.state.focusedItem,
	            onSelect: this._maybeHandle(this._onSelect),
	            onMove: this._scrollTo,
	            messages: {
	              emptyList: this.props.data.length ? this.props.messages.emptyFilter : this.props.messages.emptyList
	            } })),
	          this._shouldShowCreate() && React.createElement(
	            "ul",
	            { className: "rw-list rw-multiselect-create-tag" },
	            React.createElement(
	              "li",
	              { onClick: this._onCreate.bind(null, this.props.searchTerm),
	                className: cx({
	                  "rw-list-option": true,
	                  "rw-state-focus": !this._data().length || this.state.focusedItem === null
	                }) },
	              React.createElement(
	                "strong",
	                null,
	                "\"" + this.props.searchTerm + "\""
	              ),
	              " ",
	              this.props.messages.createNew
	            )
	          )
	        )
	      )
	    );
	  },
	
	  _data: function () {
	    return this.state.processedData;
	  },
	
	  _delete: function (value) {
	    this._focus(true);
	    this.change(this.state.dataItems.filter(function (d) {
	      return d !== value;
	    }));
	  },
	
	  _inputFocus: function (e) {
	    this._focus(true);
	    !this.props.open && this.open();
	  },
	
	  _focus: function (focused, e) {
	    var _this = this;
	
	    if (this.props.disabled === true) return;
	
	    this.setTimeout("focus", function () {
	      if (focused) _this.refs.input.focus();else _this.refs.tagList && _this.refs.tagList.clear();
	
	      if (focused !== _this.state.focused) {
	        focused ? _this.open() : _this.close();
	
	        _this.notify(focused ? "onFocus" : "onBlur", e);
	        _this.setState({ focused: focused });
	      }
	    });
	  },
	
	  _searchKeyDown: function (e) {
	    if (e.key === "Backspace" && e.target.value && !this._deletingText) this._deletingText = true;
	  },
	
	  _searchgKeyUp: function (e) {
	    if (e.key === "Backspace" && this._deletingText) this._deletingText = false;
	  },
	
	  _typing: function (e) {
	    this.notify("onSearch", [e.target.value]);
	    this.open();
	  },
	
	  _onSelect: function (data) {
	
	    if (data === undefined) {
	      if (this.props.onCreate) this._onCreate(this.props.searchTerm);
	
	      return;
	    }
	
	    this.notify("onSelect", data);
	    this.change(this.state.dataItems.concat(data));
	    this.close();
	    this._focus(true);
	  },
	
	  _onCreate: function (tag) {
	    if (tag.trim() === "") return;
	
	    this.notify("onCreate", tag);
	    this.close();
	    this._focus(true);
	  },
	
	  _keyDown: function (e) {
	    var key = e.key,
	        alt = e.altKey,
	        ctrl = e.ctrlKey,
	        noSearch = !this.props.searchTerm && !this._deletingText,
	        isOpen = this.props.open,
	        focusedItem = this.state.focusedItem,
	        tagList = this.refs.tagList,
	        list = this.refs.list;
	
	    if (key === "ArrowDown") {
	      var next = list.next("focused"),
	          creating = this._shouldShowCreate() && focusedItem === next || focusedItem === null;
	
	      next = creating ? null : list.next(focusedItem);
	
	      e.preventDefault();
	      if (isOpen) this.setState({ focusedItem: next });else this.open();
	    } else if (key === "ArrowUp") {
	      var prev = focusedItem === null ? list.last() : list.prev(focusedItem);
	
	      e.preventDefault();
	
	      if (alt) this.close();else if (isOpen) this.setState({ focusedItem: prev });
	    } else if (key === "End") {
	      if (isOpen) this.setState({ focusedItem: list.last() });else tagList && tagList.last();
	    } else if (key === "Home") {
	      if (isOpen) this.setState({ focusedItem: list.first() });else tagList && tagList.first();
	    } else if (isOpen && key === "Enter") ctrl && this.props.onCreate ? this._onCreate(this.props.searchTerm) : this._onSelect(this.state.focusedItem);else if (key === "Escape") isOpen ? this.close() : this.refs.tagList.clear();else if (noSearch && key === "ArrowLeft") tagList && tagList.prev();else if (noSearch && key === "ArrowRight") tagList && tagList.next();else if (noSearch && key === "Delete") tagList && tagList.removeCurrent();else if (noSearch && key === "Backspace") tagList && tagList.removeNext();
	
	    this.notify("onKeyDown", [e]);
	  },
	
	  change: function (data) {
	    this.notify("onChange", [data]);
	  },
	
	  open: function () {
	    if (!(this.props.disabled === true || this.props.readOnly === true)) this.notify("onToggle", true);
	  },
	
	  close: function () {
	    this.notify("onToggle", false);
	  },
	
	  toggle: function (e) {
	    this.props.open ? this.close() : this.open();
	  },
	
	  process: function (data, values, searchTerm) {
	    var _this = this;
	
	    var items = data.filter(function (i) {
	      return !values.some(_this._valueMatcher.bind(null, i), _this);
	    }, this);
	
	    if (searchTerm) items = this.filter(items, searchTerm);
	
	    return items;
	  },
	
	  _shouldShowCreate: function () {
	    var _this = this;
	
	    var text = this.props.searchTerm;
	
	    if (!(this.props.onCreate && text)) return false;
	
	    // if there is an exact match on textFields: "john" => { name: "john" }, don't show
	    return !this._data().some(function (v) {
	      return _this._dataText(v) === text;
	    }) && !this.state.dataItems.some(function (v) {
	      return _this._dataText(v) === text;
	    });
	  },
	
	  _placeholder: function () {
	    return (this.props.value || []).length ? "" : this.props.placeholder || "";
	  }
	
	});
	
	module.exports = createUncontrolledWidget(Multiselect, { open: "onToggle", value: "onChange", searchTerm: "onSearch" }, { onChange: defaultChange, onCreate: defaultChange });
	
	function defaultChange() {
	  if (this.props.searchTerm === undefined) this.setState({ searchTerm: "" });
	}
	
	module.exports.BaseMultiselect = Multiselect;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    _ = __webpack_require__(34),
	    cx = __webpack_require__(66),
	    Btn = __webpack_require__(42);
	
	module.exports = React.createClass({
	
	  displayName: "MultiselectTagList",
	
	  mixins: [__webpack_require__(17), __webpack_require__(43)],
	
	  propTypes: {
	    value: React.PropTypes.array,
	
	    valueField: React.PropTypes.string,
	    textField: React.PropTypes.string,
	
	    valueComponent: React.PropTypes.func,
	
	    disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.array, React.PropTypes.oneOf(["disabled"])]),
	
	    readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.array, React.PropTypes.oneOf(["readonly"])])
	  },
	
	  getInitialState: function () {
	    return {
	      focused: null
	    };
	  },
	
	  render: function () {
	    var _this = this;
	
	    var ValueComponent = this.props.valueComponent,
	        props = _.omit(this.props, ["value", "disabled", "readOnly"]),
	        focusIdx = this.state.focused,
	        value = this.props.value;
	
	    return React.createElement(
	      "ul",
	      _extends({}, props, {
	        className: "rw-multiselect-taglist" }),
	      value.map(function (item, i) {
	        var disabled = _this.isDisabled(item),
	            readonly = _this.isReadOnly(item);
	
	        return React.createElement(
	          "li",
	          { key: i,
	            className: cx({
	              "rw-state-focus": !disabled && focusIdx === i,
	              "rw-state-disabled": disabled,
	              "rw-state-readonly": readonly }) },
	          ValueComponent ? React.createElement(ValueComponent, { item: item }) : _this._dataText(item),
	          React.createElement(
	            Btn,
	            { tabIndex: "-1", onClick: !(disabled || readonly) && _this._delete.bind(null, item),
	              "aria-disabled": disabled,
	              disabled: disabled },
	            "×",
	            React.createElement(
	              "span",
	              { className: "rw-sr" },
	              "Remove " + _this._dataText(item)
	            )
	          )
	        );
	      })
	    );
	  },
	
	  _delete: function (val, e) {
	    this.props.onDelete(val);
	  },
	
	  removeCurrent: function () {
	    var val = this.props.value[this.state.focused];
	
	    if (val && !(this.isDisabled(val) || this.isReadOnly(val))) this.props.onDelete(val);
	  },
	
	  isDisabled: function (val, isIdx) {
	    if (isIdx) val = this.props.value[val];
	
	    return this.props.disabled === true || this._dataIndexOf(this.props.disabled || [], val) !== -1;
	  },
	
	  isReadOnly: function (val, isIdx) {
	    if (isIdx) val = this.props.value[val];
	
	    return this.props.readOnly === true || this._dataIndexOf(this.props.readOnly || [], val) !== -1;
	  },
	
	  removeNext: function () {
	    var val = this.props.value[this.props.value.length - 1];
	
	    if (val && !(this.isDisabled(val) || this.isReadOnly(val))) this.props.onDelete(val);
	  },
	
	  clear: function () {
	    this.setState({ focused: null });
	  },
	
	  first: function () {
	    var idx = 0,
	        l = this.props.value.length;
	
	    while (idx < l && this.isDisabled(idx, true)) idx++;
	
	    if (idx !== l) this.setState({ focused: idx });
	  },
	
	  last: function () {
	    var idx = this.props.value.length - 1;
	
	    while (idx > -1 && this.isDisabled(idx, true)) idx--;
	
	    if (idx >= 0) this.setState({ focused: idx });
	  },
	
	  next: function () {
	    var nextIdx = this.state.focused + 1,
	        l = this.props.value.length;
	
	    while (nextIdx < l && this.isDisabled(nextIdx, true)) nextIdx++;
	
	    if (this.state.focused === null) return;
	
	    if (nextIdx >= l) return this.clear();
	
	    this.setState({ focused: nextIdx });
	  },
	
	  prev: function () {
	    var nextIdx = this.state.focused;
	
	    if (nextIdx === null) nextIdx = this.props.value.length;
	
	    nextIdx--;
	
	    while (nextIdx > -1 && this.isDisabled(nextIdx, true)) nextIdx--;
	
	    if (nextIdx >= 0) this.setState({ focused: nextIdx });
	  }
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15);
	
	module.exports = React.createClass({
	
	  displayName: "MultiselectInput",
	
	  propTypes: {
	    value: React.PropTypes.string,
	    maxLength: React.PropTypes.number,
	    onChange: React.PropTypes.func.isRequired,
	    onFocus: React.PropTypes.func,
	
	    disabled: React.PropTypes.bool,
	    readOnly: React.PropTypes.bool },
	
	  componentDidUpdate: function () {
	    this.props.focused && this.focus();
	  },
	
	  render: function () {
	    var value = this.props.value,
	        placeholder = this.props.placeholder,
	        size = Math.max((value || placeholder).length, 1);
	
	    return React.createElement("input", _extends({}, this.props, {
	      type: "text",
	      className: "rw-input",
	      "aria-disabled": this.props.disabled,
	      "aria-readonly": this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      size: size }));
	  },
	
	  focus: function () {
	    this.getDOMNode().focus();
	  }
	
	});

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    cx = __webpack_require__(66),
	    _ = __webpack_require__(34) //omit
	,
	    CustomPropTypes = __webpack_require__(36),
	    createUncontrolledWidget = __webpack_require__(68),
	    directions = __webpack_require__(29).directions,
	    Input = __webpack_require__(57);
	
	var Btn = __webpack_require__(42),
	    propTypes = {
	
	  // -- controlled props -----------
	  value: React.PropTypes.number,
	  onChange: React.PropTypes.func,
	  //------------------------------------
	
	  min: React.PropTypes.number,
	  max: React.PropTypes.number,
	  step: React.PropTypes.number,
	
	  culture: React.PropTypes.string,
	
	  format: CustomPropTypes.localeFormat,
	
	  name: React.PropTypes.string,
	
	  parse: React.PropTypes.func,
	
	  disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),
	
	  readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["readOnly"])]),
	
	  messages: React.PropTypes.shape({
	    increment: React.PropTypes.string,
	    decrement: React.PropTypes.string
	  })
	};
	
	var NumberPicker = React.createClass({
	
	  displayName: "NumberPicker",
	
	  mixins: [__webpack_require__(45), __webpack_require__(49), __webpack_require__(43), __webpack_require__(50)],
	
	  propTypes: propTypes,
	
	  getDefaultProps: function () {
	    return {
	      value: null,
	      open: false,
	
	      format: "d",
	
	      min: -Infinity,
	      max: Infinity,
	      step: 1,
	
	      messages: {
	        increment: "increment value",
	        decrement: "decrement value"
	      }
	    };
	  },
	
	  getInitialState: function () {
	    return {
	      focused: false,
	      active: false };
	  },
	
	  render: function () {
	    var _$omit = _.omit(this.props, Object.keys(propTypes));
	
	    var className = _$omit.className;
	    var onKeyDown = _$omit.onKeyDown;
	    var onKeyPress = _$omit.onKeyPress;
	    var onKeyUp = _$omit.onKeyUp;
	    var props = _objectWithoutProperties(_$omit, ["className", "onKeyDown", "onKeyPress", "onKeyUp"]);
	    var val = this.inRangeValue(this.props.value);
	
	    return React.createElement(
	      "div",
	      _extends({}, props, {
	        ref: "element",
	        onKeyDown: this._maybeHandle(this._keyDown),
	        onFocus: this._maybeHandle(this._focus.bind(null, true), true),
	        onBlur: this._focus.bind(null, false),
	        tabIndex: "-1",
	        className: cx(className, "rw-numberpicker", "rw-widget", {
	          "rw-state-focus": this.state.focused,
	          "rw-state-disabled": this.props.disabled,
	          "rw-state-readonly": this.props.readOnly,
	          "rw-rtl": this.isRtl()
	        }) }),
	      React.createElement(
	        "span",
	        { className: "rw-select" },
	        React.createElement(
	          Btn,
	          {
	            tabIndex: "-1",
	            className: cx({ "rw-state-active": this.state.active === directions.UP }),
	            onMouseDown: this._maybeHandle(this._mouseDown.bind(null, directions.UP)),
	            onMouseUp: this._maybeHandle(this._mouseUp.bind(null, directions.UP)),
	            onClick: this._maybeHandle(this._focus.bind(null, true)),
	            disabled: val === this.props.max || this.props.disabled,
	            "aria-disabled": val === this.props.max || this.props.disabled },
	          React.createElement(
	            "i",
	            { className: "rw-i rw-i-caret-up" },
	            React.createElement(
	              "span",
	              { className: "rw-sr" },
	              this.props.messages.increment
	            )
	          )
	        ),
	        React.createElement(
	          Btn,
	          {
	            tabIndex: "-1",
	            className: cx({ "rw-state-active": this.state.active === directions.DOWN }),
	            onMouseDown: this._maybeHandle(this._mouseDown.bind(null, directions.DOWN)),
	            onMouseUp: this._maybeHandle(this._mouseUp.bind(null, directions.DOWN)),
	            onClick: this._maybeHandle(this._focus.bind(null, true)),
	            disabled: val === this.props.min || this.props.disabled,
	            "aria-disabled": val === this.props.min || this.props.disabled },
	          React.createElement(
	            "i",
	            { className: "rw-i rw-i-caret-down" },
	            React.createElement(
	              "span",
	              { className: "rw-sr" },
	              this.props.messages.decrement
	            )
	          )
	        )
	      ),
	      React.createElement(Input, {
	        ref: "input",
	        value: val,
	        editing: this.state.focused,
	        format: this.props.format,
	        parse: this.props.parse,
	        name: this.props.name,
	        role: "spinbutton",
	        min: this.props.min,
	        "aria-valuenow": val,
	        "aria-valuemin": isFinite(this.props.min) ? this.props.min : null,
	        "aria-valuemax": isFinite(this.props.max) ? this.props.max : null,
	        "aria-disabled": this.props.disabled,
	        "aria-readonly": this.props.readonly,
	        disabled: this.props.disabled,
	        readOnly: this.props.readOnly,
	        onChange: this.change,
	        onKeyDown: onKeyDown,
	        onKeyPress: onKeyPress,
	        onKeyUp: onKeyUp })
	    );
	  },
	
	  //allow for styling, focus stealing keeping me from the normal what have you
	  _mouseDown: function (dir) {
	    var val = dir === directions.UP ? (this.props.value || 0) + this.props.step : (this.props.value || 0) - this.props.step;
	
	    val = this.inRangeValue(val);
	
	    this.setState({ active: dir });
	    this.change(val);
	
	    if (!(dir === directions.UP && val === this.props.max || dir === directions.DOWN && val === this.props.min)) {
	      if (!this.interval) this.interval = setInterval(this._mouseDown, 500, dir);
	    } else this._mouseUp();
	  },
	
	  _mouseUp: function (direction, e) {
	    this.setState({ active: false });
	    clearInterval(this.interval);
	    this.interval = null;
	  },
	
	  _focus: function (focused, e) {
	    var _this = this;
	
	    this.setTimeout("focus", function () {
	      var el = _this.refs.input.getDOMNode();
	
	      focused && el.focus();
	
	      if (focused !== _this.state.focused) {
	        _this.notify(focused ? "onFocus" : "onBlur", e);
	        _this.setState({ focused: focused });
	      }
	    }, 0);
	  },
	
	  _keyDown: function (e) {
	    var key = e.key;
	
	    if (key === "End" && isFinite(this.props.max)) this.change(this.props.max);else if (key === "Home" && isFinite(this.props.min)) this.change(this.props.min);else if (key === "ArrowDown") {
	      e.preventDefault();
	      this.decrement();
	    } else if (key === "ArrowUp") {
	      e.preventDefault();
	      this.increment();
	    }
	  },
	
	  increment: function () {
	    this.change(this.inRangeValue((this.props.value || 0) + this.props.step));
	  },
	
	  decrement: function () {
	    this.change(this.inRangeValue((this.props.value || 0) - this.props.step));
	  },
	
	  change: function (val) {
	    val = this.inRangeValue(val === "" ? null : val);
	
	    if (this.props.value !== val) this.notify("onChange", val);
	  },
	
	  inRangeValue: function (value) {
	    var max = this.props.max == null ? Infinity : this.props.max,
	        min = this.props.min == null ? -Infinity : this.props.min;
	
	    if (!isFinite(min) && value == null) return value;
	
	    return Math.max(Math.min(value, max), min);
	  }
	
	});
	
	module.exports = createUncontrolledWidget(NumberPicker, { value: "onChange" });
	
	module.exports.BaseNumberPicker = NumberPicker;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var idCount = 0;
	
	var _ = module.exports = {
	
	  has: has,
	
	  assign: __webpack_require__(70),
	
	  isShallowEqual: function (a, b) {
	    if (a === b) return true;
	    if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
	
	    if (typeof a != "object" && typeof b != "object") return a === b;
	
	    if (typeof a != typeof b) return false;
	
	    return shallowEqual(a, b);
	  },
	
	  transform: function (obj, cb, seed) {
	    _.each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
	    return seed;
	  },
	
	  each: function (obj, cb, thisArg) {
	    if (Array.isArray(obj)) return obj.forEach(cb, thisArg);
	
	    for (var key in obj) if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
	  },
	
	  // object: function(arr){
	  //   return _.transform(arr,
	  //     (obj, val) => obj[val[0]] = val[1], {})
	  // },
	
	  pick: function (obj, keys) {
	    keys = [].concat(keys);
	    return _.transform(obj, function (mapped, val, key) {
	      if (keys.indexOf(key) !== -1) mapped[key] = val;
	    }, {});
	  },
	
	  omit: function (obj, keys) {
	    keys = [].concat(keys);
	    return _.transform(obj, function (mapped, val, key) {
	      if (keys.indexOf(key) === -1) mapped[key] = val;
	    }, {});
	  },
	
	  find: function (arr, cb, thisArg) {
	    var result;
	    if (Array.isArray(arr)) {
	      arr.every(function (val, idx) {
	        if (cb.call(thisArg, val, idx, arr)) return (result = val, false);
	        return true;
	      });
	      return result;
	    } else for (var key in arr) if (has(arr, key)) if (cb.call(thisArg, arr[key], key, arr)) return arr[key];
	  },
	
	  chunk: function (array, chunkSize) {
	    var index = 0,
	        length = array ? array.length : 0,
	        result = [];
	
	    chunkSize = Math.max(+chunkSize || 1, 1);
	
	    while (index < length) result.push(array.slice(index, index += chunkSize));
	
	    return result;
	  },
	
	  splat: function (obj) {
	    return obj == null ? [] : [].concat(obj);
	  },
	
	  noop: function () {},
	
	  uniqueId: function (prefix) {
	    return "" + ((prefix == null ? "" : prefix) + ++idCount);
	  },
	
	  ifNotDisabled: function (disabledOnly, fn) {
	    if (argument.length === 1) fn = disabledOnly, disabledOnly = false;
	
	    return function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }
	
	      if (!(this.isDisabled() || !disabledOnly && this.isReadOnly())) return;
	
	      return fn.apply(this, args);
	    };
	  }
	};
	
	function has(o, k) {
	  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
	}
	
	function shallowEqual(objA, objB) {
	  var key;
	
	  for (key in objA) if (has(objA, key) && (!has(objB, key) || objA[key] !== objB[key])) return false;
	
	  for (key in objB) if (has(objB, key) && !has(objA, key)) return false;
	
	  return true;
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var common = {
	  eq: function (a, b) {
	    return a === b;
	  },
	  neq: function (a, b) {
	    return a !== b;
	  },
	  gt: function (a, b) {
	    return a > b;
	  },
	  gte: function (a, b) {
	    return a >= b;
	  },
	  lt: function (a, b) {
	    return a < b;
	  },
	  lte: function (a, b) {
	    return a <= b;
	  },
	
	  contains: function (a, b) {
	    return a.indexOf(b) !== -1;
	  },
	
	  startsWith: function (a, b) {
	    return a.lastIndexOf(b, 0) === 0;
	  },
	
	  endsWith: function (a, b) {
	    var pos = a.length - b.length,
	        lastIndex = a.indexOf(b, pos);
	
	    return lastIndex !== -1 && lastIndex === pos;
	  }
	};
	
	module.exports = common;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(15);
	
	module.exports = {
	
	  elementType: createChainableTypeChecker(function (props, propName, componentName, location) {
	
	    if (typeof props[propName] !== "function") {
	      if (React.isValidElement(props[propName])) return new Error("Invalid prop `" + propName + "` specified in  `" + componentName + "`." + " Expected an Element `type`, not an actual Element");
	
	      if (typeof props[propName] !== "string") return new Error("Invalid prop `" + propName + "` specified in  `" + componentName + "`." + " Expected an Element `type` such as a tag name or return value of React.createClass(...)");
	    }
	    return true;
	  }),
	
	  localeFormat: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]) };
	
	function createChainableTypeChecker(validate) {
	
	  function checkType(isRequired, props, propName, componentName, location) {
	    componentName = componentName || "<<anonymous>>";
	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error("Required prop `" + propName + "` was not specified in  `" + componentName + "`.");
	      }
	    } else return validate(props, propName, componentName, location);
	  }
	
	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);
	
	  return chainedCheckType;
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	var METHODS = ["next", "prev", "first", "last"];
	
	module.exports = function validateListComponent(list) {
	
	  if ("production" !== process.env.NODE_ENV) {
	    METHODS.forEach(function (method) {
	      return assert(typeof list[method] === "function", "List components must implement a `" + method + "()` method");
	    });
	  }
	};
	
	function assert(condition, msg) {
	  var error;
	
	  if (!condition) {
	    error = new Error(msg);
	    error.framesToPop = 1;
	    throw error;
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _require = __webpack_require__(58);
	
	var on = _require.on;
	var off = _require.off;
	
	var _require2 = __webpack_require__(59);
	
	var height = _require2.height;
	var width = _require2.width;
	var offset = _require2.offset;
	
	module.exports = {
	
	  height: height,
	
	  width: width,
	
	  offset: offset,
	
	  on: on,
	
	  off: off,
	
	  css: __webpack_require__(60),
	
	  contains: __webpack_require__(61),
	
	  scrollParent: __webpack_require__(62),
	
	  scrollTop: __webpack_require__(63),
	
	  raf: __webpack_require__(64),
	
	  animate: __webpack_require__(65) };

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Globalize Culture es
	 *
	 * http://github.com/jquery/globalize
	 *
	 * Copyright Software Freedom Conservancy, Inc.
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://jquery.org/license
	 *
	 * This file was generated by the Globalize Culture Generator
	 * Translation: bugs found in this file need to be fixed in the generator
	 */
	
	(function( window, undefined ) {
	
	var Globalize;
	
	if ( true ) {
		// Assume CommonJS
		Globalize = __webpack_require__( 41 );
	} else {
		// Global variable
		Globalize = window.Globalize;
	}
	
	Globalize.addCultureInfo( "es", "default", {
		name: "es",
		englishName: "Spanish",
		nativeName: "español",
		language: "es",
		numberFormat: {
			",": ".",
			".": ",",
			"NaN": "NeuN",
			negativeInfinity: "-Infinito",
			positiveInfinity: "Infinito",
			percent: {
				",": ".",
				".": ","
			},
			currency: {
				pattern: ["-n $","n $"],
				",": ".",
				".": ",",
				symbol: "€"
			}
		},
		calendars: {
			standard: {
				firstDay: 1,
				days: {
					names: ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],
					namesAbbr: ["dom","lun","mar","mié","jue","vie","sáb"],
					namesShort: ["do","lu","ma","mi","ju","vi","sá"]
				},
				months: {
					names: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre",""],
					namesAbbr: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic",""]
				},
				AM: null,
				PM: null,
				eras: [{"name":"d.C.","start":null,"offset":0}],
				patterns: {
					d: "dd/MM/yyyy",
					D: "dddd, dd' de 'MMMM' de 'yyyy",
					t: "H:mm",
					T: "H:mm:ss",
					f: "dddd, dd' de 'MMMM' de 'yyyy H:mm",
					F: "dddd, dd' de 'MMMM' de 'yyyy H:mm:ss",
					M: "dd MMMM",
					Y: "MMMM' de 'yyyy"
				}
			}
		}
	});
	
	}( this ));


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    draining = true;
	    var currentQueue;
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        var i = -1;
	        while (++i < len) {
	            currentQueue[i]();
	        }
	        len = queue.length;
	    }
	    draining = false;
	}
	process.nextTick = function (fun) {
	    queue.push(fun);
	    if (!draining) {
	        setTimeout(drainQueue, 0);
	    }
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
	
	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 41 */
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15);
	var cn = __webpack_require__(66);
	module.exports = React.createClass({
	  displayName: "exports",
	
	  render: function () {
	    var _props = this.props;
	    var className = _props.className;
	    var children = _props.children;
	
	    var props = _objectWithoutProperties(_props, ["className", "children"]);
	
	    return React.createElement(
	      "button",
	      _extends({}, props, { type: "button", className: cn(className, "rw-btn") }),
	      children
	    );
	  }
	});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(34);
	
	//backport PureRenderEqual
	module.exports = {
	
	  shouldComponentUpdate: function (nextProps, nextState) {
	    return !_.isShallowEqual(this.props, nextProps) || !_.isShallowEqual(this.state, nextState);
	  }
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(15);
	
	module.exports = {
	
	  contextTypes: {
	    isRtl: React.PropTypes.bool
	  },
	
	  isRtl: function () {
	    return !!this.context.isRtl;
	  }
	
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(15),
	    _ = __webpack_require__(34); //uniqueID
	
	module.exports = {
	
	  propTypes: {
	
	    disabled: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["disabled"])]),
	
	    readOnly: React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.oneOf(["readOnly"])]) },
	
	  isDisabled: function () {
	    return this.props.disabled === true || this.props.disabled === "disabled";
	  },
	
	  isReadOnly: function () {
	    return this.props.readOnly === true || this.props.readOnly === "readonly";
	  },
	
	  notify: function (handler, args) {
	    this.props[handler] && this.props[handler].apply(null, [].concat(args));
	  },
	
	  _id: function (suffix) {
	    this._id_ || (this._id_ = _.uniqueId("rw_"));
	    return (this.props.id || this._id_) + suffix;
	  },
	
	  _maybeHandle: function (handler, disabledOnly) {
	    if (!(this.isDisabled() || !disabledOnly && this.isReadOnly())) return handler;
	    return function () {};
	  } };

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(15),
	    dates = __webpack_require__(25),
	    directions = __webpack_require__(29).directions;
	
	module.exports = function (viewUnit, smallUnit) {
	
	  return {
	    propTypes: {
	      value: React.PropTypes.instanceOf(Date),
	      min: React.PropTypes.instanceOf(Date),
	      max: React.PropTypes.instanceOf(Date) },
	
	    getInitialState: function () {
	      return {
	        focusedDate: constrainValue(this.props.value, this.props.min, this.props.max)
	      };
	    },
	
	    componentWillReceiveProps: function (nextProps) {
	      var focused = this.state.focusedDate;
	
	      //!dates.inRange(focused, nextProps.min, nextProps.max)
	
	      if (!dates.eq(nextProps.value, focused, smallUnit)) this.setState({
	        focusedDate: nextProps.value
	      });
	    },
	
	    _keyDown: function (e) {
	      var key = e.key,
	          current = this.state.focusedDate,
	          date = current;
	
	      if (key === "Enter") {
	        e.preventDefault();
	        return this.props.onChange(date);
	      }
	
	      if (key === "ArrowLeft") date = this.move(date, directions.LEFT);else if (key === "ArrowRight") date = this.move(date, directions.RIGHT);else if (key === "ArrowUp") date = this.move(date, directions.UP);else if (key === "ArrowDown") date = this.move(date, directions.DOWN);
	
	      if (!dates.eq(current, date, smallUnit)) {
	        e.preventDefault();
	
	        if (dates.gt(date, this.props.value, viewUnit)) return this.props.onMoveRight(date);
	
	        if (dates.lt(date, this.props.value, viewUnit)) return this.props.onMoveLeft(date);
	
	        this.setState({
	          focusedDate: date
	        });
	      }
	    }
	  };
	};
	
	function constrainValue(value, min, max) {
	  if (value == null) return value;
	  return dates.max(dates.min(value, max), min);
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(15),
	    version = React.version.split(".").map(parseFloat);
	
	var compat = module.exports = {
	
	  version: function () {
	    return version;
	  },
	
	  propType: function (fn) {
	
	    return function validator(props, propName, componentName, location) {
	      var err = fn.call(this, props, propName, componentName, location);
	
	      if (err && err !== true) return err;
	    };
	  },
	
	  type: function (component) {
	    if (version[0] === 0 && version[1] >= 13) return component;
	
	    return component.type;
	  }
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    ReplaceTransitionGroup = __webpack_require__(71),
	    _ = __webpack_require__(34),
	    $ = __webpack_require__(38);
	
	var SlideChildGroup = React.createClass({
	  displayName: "SlideChildGroup",
	
	  propTypes: {
	    direction: React.PropTypes.oneOf(["left", "right"]),
	    duration: React.PropTypes.number
	  },
	
	  componentWillEnter: function (done) {
	    var _this = this;
	
	    var node = this.getDOMNode(),
	        width = $.width(node),
	        direction = this.props.direction;
	
	    width = direction === "left" ? width : -width;
	
	    this.ORGINAL_POSITION = node.style.position;
	
	    $.css(node, { position: "absolute", left: width + "px", top: 0 });
	
	    $.animate(node, { left: 0 }, this.props.duration, function () {
	
	      $.css(node, {
	        position: _this.ORGINAL_POSITION,
	        overflow: "hidden"
	      });
	
	      _this.ORGINAL_POSITION = null;
	      done && done();
	    });
	  },
	
	  componentWillLeave: function (done) {
	    var _this = this;
	
	    var node = this.getDOMNode(),
	        width = $.width(node),
	        direction = this.props.direction;
	
	    width = direction === "left" ? -width : width;
	
	    this.ORGINAL_POSITION = node.style.position;
	
	    $.css(node, { position: "absolute", top: 0, left: 0 });
	
	    $.animate(node, { left: width + "px" }, this.props.duration, function () {
	      $.css(node, {
	        position: _this.ORGINAL_POSITION,
	        overflow: "hidden"
	      });
	
	      _this.ORGINAL_POSITION = null;
	      done && done();
	    });
	  },
	
	  render: function () {
	    return React.Children.only(this.props.children);
	  }
	
	});
	
	module.exports = React.createClass({
	  displayName: "exports",
	
	  propTypes: {
	    direction: React.PropTypes.oneOf(["left", "right"]),
	    duration: React.PropTypes.number
	  },
	
	  getDefaultProps: function () {
	    return {
	      direction: "left",
	      duration: 250
	    };
	  },
	
	  _wrapChild: function (child, ref) {
	    return React.createElement(
	      SlideChildGroup,
	      { key: child.key, ref: ref,
	        direction: this.props.direction,
	        duration: this.props.duration },
	      child
	    );
	  },
	
	  render: function () {
	    var _props = this.props;
	    var style = _props.style;
	    var children = _props.children;
	
	    var props = _objectWithoutProperties(_props, ["style", "children"]);
	
	    style = _.assign({}, style, { position: "relative", overflow: "hidden" });
	
	    return React.createElement(
	      ReplaceTransitionGroup,
	      _extends({}, props, {
	        ref: "container",
	        childFactory: this._wrapChild,
	        style: style,
	        component: "div" }),
	      children
	    );
	  },
	
	  isTransitioning: function () {
	    return this.isMounted() && this.refs.container.isTransitioning();
	  }
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _require = __webpack_require__(34);
	
	var has = _require.has;
	
	module.exports = {
	
	  componentWillUnmount: function () {
	    var timers = this._timers || {};
	
	    for (var k in timers) if (has(timers, k)) clearTimeout(timers[k]);
	  },
	
	  setTimeout: function (key, cb, duration) {
	    var timers = this._timers || (this._timers = Object.create(null));
	
	    clearTimeout(timers[key]);
	    timers[key] = setTimeout(cb, duration);
	  }
	
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(15);
	
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
	
	  getChildContext: function () {
	    return {
	      isRtl: this.props.isRtl || this.context && this.context.isRtl
	    };
	  },
	
	  isRtl: function () {
	    return !!(this.props.isRtl || this.context && this.context.isRtl);
	  }
	
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    dates = __webpack_require__(25),
	    List = __webpack_require__(28),
	    CustomPropTypes = __webpack_require__(36),
	    _ = __webpack_require__(34); // omit
	
	module.exports = React.createClass({
	
	  displayName: "TimeList",
	
	  propTypes: {
	    value: React.PropTypes.instanceOf(Date),
	    min: React.PropTypes.instanceOf(Date),
	    max: React.PropTypes.instanceOf(Date),
	    step: React.PropTypes.number,
	    itemComponent: CustomPropTypes.elementType,
	    onSelect: React.PropTypes.func,
	    preserveDate: React.PropTypes.bool,
	    culture: React.PropTypes.string },
	
	  mixins: [__webpack_require__(49)],
	
	  getDefaultProps: function () {
	    return {
	      step: 30,
	      format: "t",
	      onSelect: function () {},
	      preserveDate: true,
	      delay: 300
	    };
	  },
	
	  getInitialState: function () {
	    var data = this._dates(this.props),
	        focusedItem = this._closestDate(data, this.props.value);
	
	    return {
	      focusedItem: focusedItem || data[0],
	      dates: data
	    };
	  },
	
	  componentWillReceiveProps: function (nextProps) {
	    var data = this._dates(nextProps),
	        focusedItem = this._closestDate(data, this.props.value);
	
	    if (nextProps.value !== this.props.value) this.setState({
	      focusedItem: focusedItem || data[0],
	      dates: data
	    });
	  },
	
	  render: function () {
	    var times = this.state.dates,
	        date = this._closestDate(times, this.props.value);
	
	    return React.createElement(List, _extends({}, _.omit(this.props, "value"), {
	      ref: "list",
	      data: times,
	      textField: "label",
	      valueField: "date",
	      selected: date,
	      focused: this.state.focusedItem,
	      itemComponent: this.props.itemComponent,
	      onSelect: this.props.onSelect }));
	  },
	
	  _closestDate: function (times, date) {
	    var roundTo = 1000 * 60 * this.props.step,
	        inst = null,
	        label;
	
	    if (!date) return null;
	
	    date = new Date(Math.floor(date.getTime() / roundTo) * roundTo);
	    label = dates.format(date, this.props.format, this.props.culture);
	
	    times.some(function (time) {
	      if (time.label === label) return inst = time;
	    });
	
	    return inst;
	  },
	
	  _data: function () {
	    return this.state.dates;
	  },
	
	  _dates: function (props) {
	    var times = [],
	        i = 0,
	        values = this._dateValues(props),
	        start = values.min,
	        startDay = dates.date(start);
	
	    // debugger;
	    while (i < 100 && (dates.date(start) === startDay && dates.lte(start, values.max))) {
	      i++;
	      times.push({ date: start, label: dates.format(start, props.format, props.culture) });
	      start = dates.add(start, props.step || 30, "minutes");
	    }
	    return times;
	  },
	
	  _dateValues: function (props) {
	    var value = props.value || dates.today(),
	        useDate = props.preserveDate,
	        min = props.min,
	        max = props.max,
	        start,
	        end;
	
	    //compare just the time regradless of whether they fall on the same day
	    if (!useDate) {
	      start = dates.startOf(dates.merge(new Date(), min), "minutes");
	      end = dates.startOf(dates.merge(new Date(), max), "minutes");
	
	      if (dates.lte(end, start) && dates.gt(max, min, "day")) end = dates.tomorrow();
	
	      return {
	        min: start,
	        max: end
	      };
	    }
	
	    //date parts are equal
	    return {
	      min: dates.eq(value, min, "day") ? min : dates.today(),
	      max: dates.eq(value, max, "day") ? min : dates.tomorrow()
	    };
	  },
	
	  _keyDown: function (e) {
	    var _this = this;
	
	    var key = e.key,
	        character = String.fromCharCode(e.keyCode),
	        focusedItem = this.state.focusedItem,
	        list = this.refs.list;
	
	    if (key === "End") this.setState({ focusedItem: list.last() });else if (key === "Home") this.setState({ focusedItem: list.first() });else if (key === "Enter") this.props.onSelect(focusedItem);else if (key === "ArrowDown") {
	      e.preventDefault();
	      this.setState({ focusedItem: list.next(focusedItem) });
	    } else if (key === "ArrowUp") {
	      e.preventDefault();
	      this.setState({ focusedItem: list.prev(focusedItem) });
	    } else {
	      e.preventDefault();
	
	      this.search(character, function (item) {
	        _this.setState({ focusedItem: item });
	      });
	    }
	  },
	
	  search: function (character, cb) {
	    var _this = this;
	
	    var word = ((this._searchTerm || "") + character).toLowerCase();
	
	    this._searchTerm = word;
	
	    this.setTimeout("search", function () {
	      var list = _this.refs.list,
	          item = list.next(_this.state.focusedItem, word);
	
	      _this._searchTerm = "";
	      if (item) cb(item);
	    }, this.props.delay);
	  } });

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    cx = __webpack_require__(66),
	    dates = __webpack_require__(25),
	    CustomPropTypes = __webpack_require__(36);
	
	module.exports = React.createClass({
	
	  displayName: "DatePickerInput",
	
	  propTypes: {
	    format: CustomPropTypes.localeFormat,
	    parse: React.PropTypes.func.isRequired,
	
	    value: React.PropTypes.instanceOf(Date),
	    onChange: React.PropTypes.func.isRequired,
	    culture: React.PropTypes.string },
	
	  getDefaultProps: function () {
	    return {
	      textValue: ""
	    };
	  },
	
	  componentWillReceiveProps: function (nextProps) {
	    this.setState({
	      textValue: formatDate(nextProps.value, nextProps.editing && nextProps.editFormat ? nextProps.editFormat : nextProps.format, nextProps.culture)
	    });
	  },
	
	  getInitialState: function () {
	    var text = formatDate(this.props.value, this.props.editing && this.props.editFormat ? this.props.editFormat : this.props.format, this.props.culture);
	
	    this.lastValue = text;
	
	    return {
	      textValue: text
	    };
	  },
	
	  render: function () {
	    var value = this.state.textValue;
	
	    return React.createElement("input", _extends({}, this.props, {
	      type: "text",
	      className: cx({ "rw-input": true }),
	      value: value,
	      "aria-disabled": this.props.disabled,
	      "aria-readonly": this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      onChange: this._change,
	      onBlur: chain(this.props.blur, this._blur, this) }));
	  },
	
	  _change: function (e) {
	    this.setState({ textValue: e.target.value });
	  },
	
	  _blur: function (e) {
	    var val = e.target.value;
	
	    this.props.onChange(this.props.parse(val), val);
	  },
	
	  focus: function () {
	    this.getDOMNode().focus();
	  }
	
	});
	
	function isValid(d) {
	  return !isNaN(d.getTime());
	}
	
	function formatDate(date, format, culture) {
	  var val = "";
	
	  if (date instanceof Date && isValid(date)) val = dates.format(date, format, culture);
	
	  return val;
	}
	
	function chain(a, b, thisArg) {
	  return function () {
	    a && a.apply(thisArg, arguments);
	    b && b.apply(thisArg, arguments);
	  };
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var scrollTo = __webpack_require__(72);
	
	module.exports = {
	
	  _scrollTo: function (selected, list) {
	    var handler = this.props.onMove;
	
	    if (this.props.open) {
	      if (handler) handler(selected, list);else {
	        this._scrollCancel && this._scrollCancel();
	        this._scrollCancel = scrollTo(selected, list);
	      }
	    }
	  } };

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(15),
	    _ = __webpack_require__(34),
	    filter = __webpack_require__(35),
	    helper = __webpack_require__(17);
	
	module.exports = {
	
	  propTypes: {
	    textField: React.PropTypes.string },
	
	  first: function () {
	    return this._data()[0];
	  },
	
	  last: function () {
	    var data = this._data();
	    return data[data.length - 1];
	  },
	
	  prev: function (item, word) {
	    var data = this._data(),
	        idx = data.indexOf(item);
	
	    if (idx === -1) idx = data.length;
	
	    return word ? findPrevInstance(this, data, word, idx) : --idx < 0 ? data[0] : data[idx];
	  },
	
	  next: function (item, word) {
	    var data = this._data(),
	        idx = data.indexOf(item);
	
	    return word ? findNextInstance(this, data, word, idx) : ++idx === data.length ? data[data.length - 1] : data[idx];
	  }
	
	};
	
	function findNextInstance(ctx, data, word, startIndex) {
	  var matches = filter.startsWith,
	      idx = -1,
	      len = data.length,
	      foundStart,
	      itemText;
	
	  word = word.toLowerCase();
	
	  while (++idx < len) {
	    foundStart = foundStart || idx > startIndex;
	    itemText = foundStart && helper._dataText.call(ctx, data[idx]).toLowerCase();
	
	    if (foundStart && matches(itemText, word)) return data[idx];
	  }
	}
	
	function findPrevInstance(ctx, data, word, startIndex) {
	  var matches = filter.startsWith,
	      idx = data.length,
	      foundStart,
	      itemText;
	
	  word = word.toLowerCase();
	
	  while (--idx >= 0) {
	    foundStart = foundStart || idx < startIndex;
	    itemText = foundStart && helper._dataText.call(ctx, data[idx]).toLowerCase();
	
	    if (foundStart && matches(itemText, word)) return data[idx];
	  }
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    CustomPropTypes = __webpack_require__(36),
	    cx = __webpack_require__(66),
	    _ = __webpack_require__(34);
	
	module.exports = React.createClass({
	
	  displayName: "List",
	
	  mixins: [__webpack_require__(45), __webpack_require__(17), __webpack_require__(54)],
	
	  propTypes: {
	    data: React.PropTypes.array,
	    onSelect: React.PropTypes.func,
	    onMove: React.PropTypes.func,
	
	    itemComponent: CustomPropTypes.elementType,
	    groupComponent: CustomPropTypes.elementType,
	
	    selected: React.PropTypes.any,
	    focused: React.PropTypes.any,
	
	    valueField: React.PropTypes.string,
	    textField: React.PropTypes.string,
	
	    optID: React.PropTypes.string,
	
	    groupBy: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.string]),
	
	    messages: React.PropTypes.shape({
	      emptyList: React.PropTypes.string
	    }) },
	
	  getDefaultProps: function () {
	    return {
	      optID: "",
	      onSelect: function () {},
	      data: [],
	      messages: {
	        emptyList: "There are no items in this list"
	      }
	    };
	  },
	
	  getInitialState: function () {
	    var keys = [];
	
	    return {
	      groups: this._group(this.props.groupBy, this.props.data, keys),
	
	      sortedKeys: keys
	    };
	  },
	
	  componentWillReceiveProps: function (nextProps) {
	    var keys = [];
	
	    if (nextProps.data !== this.props.data || nextProps.groupBy !== this.props.groupBy) this.setState({
	      groups: this._group(nextProps.groupBy, nextProps.data, keys),
	      sortedKeys: keys
	    });
	  },
	
	  componentDidMount: function (prevProps, prevState) {
	    this._setScrollPosition();
	  },
	
	  componentDidUpdate: function (prevProps) {
	    if (prevProps.focused !== this.props.focused) this._setScrollPosition();
	  },
	
	  render: function () {
	    var _this = this;
	
	    var _$omit = _.omit(this.props, ["data", "selectedIndex"]);
	
	    var className = _$omit.className;
	    var props = _objectWithoutProperties(_$omit, ["className"]);
	    var groups = this.state.groups;
	    var items = [];
	    var idx = -1;
	    var group;
	
	    if (this.props.data.length) {
	      items = this.state.sortedKeys.reduce(function (items, key) {
	        group = groups[key];
	        items.push(_this._renderGroupHeader(key));
	
	        for (var itemIdx = 0; itemIdx < group.length; itemIdx++) items.push(_this._renderItem(key, group[itemIdx], ++idx));
	
	        return items;
	      }, []);
	    } else items = React.createElement(
	      "li",
	      null,
	      this.props.messages.emptyList
	    );
	
	    return React.createElement(
	      "ul",
	      _extends({}, props, {
	        className: (className || "") + " rw-list  rw-list-grouped",
	        ref: "scrollable",
	        role: "listbox" }),
	      items
	    );
	  },
	
	  _renderGroupHeader: function (group) {
	    var ItemComponent = this.props.groupComponent;
	
	    return React.createElement(
	      "li",
	      {
	        key: "item_" + group,
	        tabIndex: "-1",
	        role: "separator",
	        className: "rw-list-optgroup" },
	      ItemComponent ? React.createElement(ItemComponent, { item: group }) : group
	    );
	  },
	
	  _renderItem: function (group, item, idx) {
	    var focused = this.props.focused === item,
	        selected = this.props.selected === item,
	        ItemComponent = this.props.itemComponent;
	
	    //console.log('hi')
	    return React.createElement(
	      "li",
	      {
	        key: "item_" + group + "_" + idx,
	        role: "option",
	        id: focused ? this.props.optID : undefined,
	        "aria-selected": selected,
	        onClick: this.props.onSelect.bind(null, item),
	        className: cx({
	          "rw-state-focus": focused,
	          "rw-state-selected": selected,
	          "rw-list-option": true
	        }) },
	      ItemComponent ? React.createElement(ItemComponent, { item: item }) : this._dataText(item)
	    );
	  },
	
	  _isIndexOf: function (idx, item) {
	    return this.props.data[idx] === item;
	  },
	
	  _group: function (groupBy, data, keys) {
	    var iter = typeof groupBy === "function" ? groupBy : function (item) {
	      return item[groupBy];
	    };
	
	    // the keys array ensures that groups are rendered in the order they came in
	    // which means that if you sort the data array it will render sorted,
	    // so long as you also sorted by group
	    keys = keys || [];
	
	    return data.reduce(function (grps, item) {
	      var group = iter(item);
	
	      _.has(grps, group) ? grps[group].push(item) : (keys.push(group), grps[group] = [item]);
	
	      return grps;
	    }, {});
	  },
	
	  _data: function () {
	    var groups = this.state.groups;
	
	    return this.state.sortedKeys.reduce(function (flat, grp) {
	      return flat.concat(groups[grp]);
	    }, []);
	  },
	
	  _setScrollPosition: function () {
	    var selected = this.getItemDOMNode(this.props.focused);
	
	    if (!selected) return;
	
	    this.notify("onMove", [selected, this.getDOMNode()]);
	  },
	
	  getItemDOMNode: function (item) {
	    var list = this.getDOMNode(),
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

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(15),
	    filters = __webpack_require__(35),
	    helper = __webpack_require__(17);
	
	var filterTypes = Object.keys(filters).filter(function (i) {
	  return i !== "filter";
	});
	
	module.exports = {
	
	  propTypes: {
	    data: React.PropTypes.array,
	    value: React.PropTypes.any,
	    filter: React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.oneOf(filterTypes.concat(false))]),
	    caseSensitive: React.PropTypes.bool,
	    minLength: React.PropTypes.number },
	
	  getDefaultProps: function () {
	    return {
	      caseSensitive: false,
	      minLength: 1
	    };
	  },
	
	  filterIndexOf: function (items, searchTerm) {
	    var idx = -1,
	        matches = typeof this.props.filter === "function" ? this.props.filter : getFilter(filters[this.props.filter || "eq"], searchTerm, this);
	
	    if (!searchTerm || !searchTerm.trim() || this.props.filter && searchTerm.length < (this.props.minLength || 1)) return -1;
	
	    items.every(function (item, i) {
	      if (matches(item, searchTerm)) return (idx = i, false);
	
	      return true;
	    });
	
	    return idx;
	  },
	
	  filter: function (items, searchTerm) {
	    var matches = typeof this.props.filter === "string" ? getFilter(filters[this.props.filter], searchTerm, this) : this.props.filter;
	
	    if (!matches || !searchTerm || !searchTerm.trim() || searchTerm.length < (this.props.minLength || 1)) return items;
	
	    return items.filter(function (item) {
	      return matches(item, searchTerm);
	    });
	  }
	};
	
	function getFilter(matcher, searchTerm, ctx) {
	  searchTerm = !ctx.caseSensitive ? searchTerm.toLowerCase() : searchTerm;
	
	  return function (item) {
	    var val = helper._dataText.call(ctx, item);
	
	    if (!ctx.caseSensitive) val = val.toLowerCase();
	
	    return matcher(val, searchTerm);
	  };
	}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(15),
	    CustomPropTypes = __webpack_require__(36),
	    globalize = __webpack_require__(41);
	
	module.exports = React.createClass({
	
	  displayName: "NumberPickerInput",
	
	  propTypes: {
	    value: React.PropTypes.number,
	
	    format: CustomPropTypes.localeFormat.isRequired,
	    parse: React.PropTypes.func.isRequired,
	    culture: React.PropTypes.string,
	
	    min: React.PropTypes.number,
	
	    onChange: React.PropTypes.func.isRequired,
	    onKeyDown: React.PropTypes.func },
	
	  getDefaultProps: function () {
	    return {
	      value: null,
	      format: "d",
	      editing: false,
	      parse: function (number, culture) {
	        return globalize.parseFloat(number, 10, culture);
	      }
	    };
	  },
	
	  getDefaultState: function (props) {
	    var value = props.editing ? props.value : formatNumber(props.value, props.format, props.culture);
	
	    if (value == null || isNaN(props.value)) value = "";
	
	    return {
	      stringValue: "" + value
	    };
	  },
	
	  getInitialState: function () {
	    return this.getDefaultState(this.props);
	  },
	
	  componentWillReceiveProps: function (nextProps) {
	    this.setState(this.getDefaultState(nextProps));
	  },
	
	  render: function () {
	    var value = this.state.stringValue;
	
	    return React.createElement("input", _extends({}, this.props, {
	      type: "text",
	      className: "rw-input",
	      onChange: this._change,
	      onBlur: this._finish,
	      "aria-disabled": this.props.disabled,
	      "aria-readonly": this.props.readOnly,
	      disabled: this.props.disabled,
	      readOnly: this.props.readOnly,
	      value: value }));
	  },
	
	  _change: function (e) {
	    var val = e.target.value,
	        number = this.props.parse(e.target.value, this.props.culture),
	        isNull = val !== 0 && !val,
	        hasMin = this.props.min && isFinite(this.props.min);
	
	    //a null value is only possible when there is no min
	    if (!hasMin && isNull) return this.props.onChange(null);
	
	    if (this.isValid(number) && number !== this.props.value) return this.props.onChange(number);
	
	    //console.log(val !== 0 && !val)
	    this.current(e.target.value);
	  },
	
	  _finish: function (e) {
	    var number = this.props.parse(this.state.stringValue, this.props.culture);
	
	    // if number is below the min
	    // we need to flush low values eventually, onBlur means i'm done inputing
	    if (!isNaN(number) && number < this.props.min) {
	      this.props.onChange(number);
	    }
	  },
	
	  isValid: function (num) {
	    if (typeof num !== "number" || isNaN(num)) return false;
	    return num >= this.props.min;
	  },
	
	  //this intermediate state is for when one runs into the decimal or are typing the number
	  current: function (val) {
	    this.setState({ stringValue: val });
	  }
	
	});
	
	function parseLocaleFloat(number, parser, culture) {
	  if (typeof format === "function") return format(number, culture);
	
	  return globalize.parseFloat(number, 10, culture);
	}
	
	function formatNumber(number, format, culture) {
	  if (typeof format === "function") return format(number, culture);
	
	  return globalize.format(number, format, culture);
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = {
	
	  on: function (node, eventName, handler) {
	    if (node.addEventListener) node.addEventListener(eventName, handler, false);else if (node.attachEvent) node.attachEvent("on" + eventName, handler);
	  },
	
	  off: function (node, eventName, handler) {
	    if (node.addEventListener) node.removeEventListener(eventName, handler, false);else if (node.attachEvent) node.detachEvent("on" + eventName, handler);
	  }
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var contains = __webpack_require__(61);
	
	function offset(node) {
	  var doc = node.ownerDocument,
	      docElem = doc && doc.documentElement,
	      box = { top: 0, left: 0, height: 0, width: 0 };
	
	  if (!docElem) return;
	
	  if (!contains(docElem, node)) return box;
	
	  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();
	
	  return {
	    top: box.top + window.pageYOffset - docElem.clientTop,
	    left: box.left + window.pageXOffset - docElem.clientLeft,
	    width: box.width || node.offsetWidth,
	    height: box.height || node.offsetHeight };
	}
	
	module.exports = {
	
	  width: function (node, client) {
	    var win = getWindow(node);
	    return win ? win.innerWidth : client ? node.clientWidth : offset(node).width;
	  },
	
	  height: function (node, client) {
	    var win = getWindow(node);
	    return win ? win.innerHeight : client ? node.clientHeight : offset(node).height;
	  },
	
	  offset: offset
	
	};
	
	function getWindow(node) {
	  return node === node.window ? node : node.nodeType === 9 && node.defaultView;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var camelize = __webpack_require__(73),
	    hyphenate = __webpack_require__(74),
	    has = Object.prototype.hasOwnProperty;
	
	module.exports = function cssFn(node, property, value) {
	  var css = "",
	      props = property;
	
	  if (typeof property === "string") {
	    if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(property);else (props = {})[property] = value;
	  }
	
	  for (var key in props) if (has.call(props, key)) {
	    !props[key] && props[key] !== 0 ? removeStyle(node.style, hyphenate(key)) : css += hyphenate(key) + ":" + props[key] + ";";
	  }
	
	  node.style.cssText += ";" + css;
	};
	
	function removeStyle(styles, key) {
	  return "removeProperty" in styles ? styles.removeProperty(key) : styles.removeAttribute(key);
	}
	
	function _getComputedStyle(node) {
	  if (!node) throw new Error();
	  var doc = node.ownerDocument;
	
	  return "defaultView" in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : { //ie 8 "magic"
	    getPropertyValue: function (prop) {
	      var re = /(\-([a-z]){1})/g;
	      if (prop == "float") prop = "styleFloat";
	      if (re.test(prop)) prop = prop.replace(re, function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        return args[2].toUpperCase();
	      });
	
	      return node.currentStyle[prop] || null;
	    }
	  };
	}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var canUseDOM = __webpack_require__(75).canUseDOM;
	
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var css = __webpack_require__(60);
	
	var _require = __webpack_require__(59);
	
	var height = _require.height;
	
	module.exports = function scrollPrarent(node) {
	  var position = css(node, "position"),
	      excludeStatic = position === "absolute",
	      ownerDoc = node.ownerDocument;
	
	  if (position === "fixed") return ownerDoc || document;
	
	  while ((node = node.parentNode) && node.nodeType !== 9) {
	
	    var isStatic = excludeStatic && css(node, "position") === "static",
	        style = css(node, "overflow") + css(node, "overflow-y") + css(node, "overflow-x");
	
	    if (isStatic) continue;
	
	    if (/(auto|scroll)/.test(style) && height(node) < node.scrollHeight) return node;
	  }
	
	  return document;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function scrollTop(node, val) {
	  var win = node === node.window ? node : node.nodeType === 9 && node.defaultView;
	
	  if (val === undefined) return win ? "pageYOffset" in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;
	
	  if (win) win.scrollTo("pageXOffset" in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var canUseDOM = __webpack_require__(75).canUseDOM,
	    cancel = "clearTimeout",
	    raf = fallback,
	    compatRaf;
	
	var keys = ["cancelAnimationFrame", "webkitCancelAnimationFrame", "mozCancelAnimationFrame", "oCancelAnimationFrame", "msCancelAnimationFrame"];
	
	compatRaf = function (cb) {
	  return raf(cb);
	};
	compatRaf.cancel = function (id) {
	  return window[cancel](id);
	};
	
	module.exports = compatRaf;
	
	if (canUseDOM) {
	  raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || fallback;
	
	  for (var i = 0; i < keys.length; i++) if (keys[i] in window) {
	    cancel = keys[i];
	    break;
	  }
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

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var canUseDOM = __webpack_require__(75).canUseDOM;
	var hyphenate = __webpack_require__(74);
	var has = Object.prototype.hasOwnProperty;
	var css = __webpack_require__(60);
	
	var _require = __webpack_require__(58);
	
	var on = _require.on;
	var off = _require.off;
	
	var TRANSLATION_MAP = {
	  left: "translateX", right: "translateX",
	  top: "translateY", bottom: "translateY" };
	
	var reset = {},
	    transform = "transform",
	    transition = {},
	    transitionTiming,
	    transitionDuration,
	    transitionProperty,
	    transitionDelay;
	
	if (canUseDOM) {
	  transition = getTransitionProperties();
	
	  transform = transition.prefix + transform;
	
	  reset[transitionProperty = transition.prefix + "transition-property"] = reset[transitionDuration = transition.prefix + "transition-duration"] = reset[transitionDelay = transition.prefix + "transition-delay"] = reset[transitionTiming = transition.prefix + "transition-timing-function"] = "";
	}
	
	animate.endEvent = transition.endEvent;
	
	module.exports = animate;
	
	/* code in part from: Zepto 1.1.4 | zeptojs.com/license */
	// super lean animate function for transitions
	// doesn't support all translations to keep it matching the jquery API
	function animate(node, properties, duration, easing, callback) {
	  var cssProperties = [],
	      fakeEvent = { target: node, currentTarget: node },
	      cssValues = {},
	      transforms = "",
	      fired;
	
	  if (typeof easing === "function") callback = easing, easing = null;
	
	  if (!transition.endEvent) duration = 0;
	  if (duration === undefined) duration = 200;
	
	  for (var key in properties) if (has.call(properties, key)) {
	    if (/(top|bottom)/.test(key)) transforms += TRANSLATION_MAP[key] + "(" + properties[key] + ") ";else {
	      cssValues[key] = properties[key];
	      cssProperties.push(hyphenate(key));
	    }
	  }
	
	  if (transforms) {
	    cssValues[transform] = transforms;
	    cssProperties.push(transform);
	  }
	
	  if (duration > 0) {
	    cssValues[transitionProperty] = cssProperties.join(", ");
	    cssValues[transitionDuration] = duration / 1000 + "s";
	    cssValues[transitionDelay] = 0 + "s";
	    cssValues[transitionTiming] = easing || "linear";
	
	    on(node, transition.endEvent, done);
	
	    setTimeout(function () {
	      if (!fired) done(fakeEvent);
	    }, duration + 500);
	  }
	
	  // trigger page reflow
	  node.clientLeft;
	  css(node, cssValues);
	
	  if (duration <= 0) setTimeout(done.bind(null, fakeEvent), 0);
	
	  function done(event) {
	    if (event.target !== event.currentTarget) return;
	
	    fired = true;
	    off(event.target, transition.endEvent, done);
	
	    css(node, reset);
	
	    callback && callback.call(this);
	  }
	}
	
	function getTransitionProperties() {
	  var endEvent,
	      prefix = "",
	      transitions = {
	    O: "otransitionend",
	    Moz: "transitionend",
	    Webkit: "webkitTransitionEnd"
	  };
	
	  var element = document.createElement("div");
	
	  for (var vendor in transitions) if (has.call(transitions, vendor)) {
	    if (element.style[vendor + "TransitionProperty"] !== undefined) {
	      prefix = "-" + vendor.toLowerCase() + "-";
	      endEvent = transitions[vendor];
	      break;
	    }
	  }
	
	  if (!endEvent && element.style.transitionProperty !== undefined) endEvent = "transitionend";
	
	  return { endEvent: endEvent, prefix: prefix };
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	function classNames() {
		var args = arguments;
		var classes = [];
	
		for (var i = 0; i < args.length; i++) {
			var arg = args[i];
			if (!arg) {
				continue;
			}
	
			if ('string' === typeof arg || 'number' === typeof arg) {
				classes.push(arg);
			} else if ('object' === typeof arg) {
				for (var key in arg) {
					if (!arg.hasOwnProperty(key) || !arg[key]) {
						continue;
					}
					classes.push(key);
				}
			}
		}
		return classes.join(' ');
	}
	
	// safely export classNames in case the script is included directly on a page
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	}


/***/ },
/* 67 */
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {"use strict";
	var babelHelpers = __webpack_require__(76);
	var React = __webpack_require__(15);
	var invariant = __webpack_require__(69);
	
	function customPropType(handler, propType) {
	
	  return function (props, propName, componentName, location) {
	
	    if (props[propName] !== undefined) {
	      if (!props[handler]) return new Error("You have provided a `" + propName + "` prop to " + "`" + componentName + "` without an `" + handler + "` handler. This will render a read-only field. " + "If the field should be mutable use `" + defaultKey(propName) + "`. Otherwise, set `" + handler + "`");
	
	      return propType && propType(props, propName, componentName, location);
	    }
	  };
	}
	
	var version = React.version.split(".").map(parseFloat);
	
	function getType(component) {
	  if (version[0] === 0 && version[1] >= 13) return component;
	
	  return component.type;
	}
	
	module.exports = function (Component, controlledValues, taps) {
	  var types = {};
	
	  if (process.env.NODE_ENV !== "production" && getType(Component).propTypes) {
	    types = transform(controlledValues, function (obj, handler, prop) {
	      var type = getType(Component).propTypes[prop];
	
	      invariant(typeof handler === "string" && handler.trim().length, "Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable", Component.displayName, prop);
	
	      obj[prop] = customPropType(handler, type);
	      obj[defaultKey(prop)] = type;
	    }, {});
	  }
	
	  taps = taps || {};
	
	  return React.createClass({
	
	    displayName: Component.displayName,
	
	    propTypes: types,
	
	    getInitialState: function () {
	      var props = this.props,
	          keys = Object.keys(controlledValues);
	
	      return transform(keys, function (state, key) {
	        state[key] = props[defaultKey(key)];
	      }, {});
	    },
	
	    shouldComponentUpdate: function () {
	      //let the setState trigger the update
	      return !this._notifying || !this._notifying.length;
	    },
	
	    render: function () {
	      var _this = this;
	
	      var props = {};
	
	      each(controlledValues, function (handle, prop) {
	
	        props[prop] = isProp(_this.props, prop) ? _this.props[prop] : _this.state[prop];
	
	        props[handle] = setAndNotify.bind(_this, prop);
	      });
	
	      props = babelHelpers._extends({}, this.props, props);
	
	      each(taps, function (val, key) {
	        return props[key] = chain(_this, val, props[key]);
	      });
	
	      return React.createElement(Component, props);
	    }
	  });
	
	  function setAndNotify(prop, value) {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }
	
	    var handler = controlledValues[prop],
	        controlled = handler && isProp(this.props, prop),
	        args;
	
	    if (this.props[handler]) {
	      this._notifying = true;
	      this.props[handler].apply(this, [value].concat(args));
	      this._notifying = false;
	    }
	
	    this.setState((function () {
	      var _setState = {};
	      _setState[prop] = value;
	      return _setState;
	    })());
	
	    return !controlled;
	  }
	
	  function isProp(props, prop) {
	    return props[prop] !== undefined;
	  }
	};
	
	function defaultKey(key) {
	  return "default" + key.charAt(0).toUpperCase() + key.substr(1);
	}
	
	function chain(thisArg, a, b) {
	  return function chainedFunction() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    a && a.apply(thisArg, [].concat(args));
	    b && b.apply(thisArg, [].concat(args));
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
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
	  if ("production" !== process.env.NODE_ENV) {
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)))

/***/ },
/* 70 */
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A streamlined version of TransitionGroup built for managing at most two active children
	 * also provides additional hooks for animation start/end
	 * https://github.com/facebook/react/blob/master/src/addons/transitions/ReactTransitionGroup.js
	 * relevent code is licensed accordingly 
	 */
	
	"use strict";
	
	var React = __webpack_require__(15),
	    $ = __webpack_require__(38),
	    _ = __webpack_require__(34);
	
	module.exports = React.createClass({
	
	  displayName: "ReplaceTransitionGroup",
	
	  propTypes: {
	    component: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.string]),
	    childFactory: React.PropTypes.func,
	
	    onAnimating: React.PropTypes.func,
	    onAnimate: React.PropTypes.func },
	
	  getDefaultProps: function () {
	    return {
	      component: "span",
	      childFactory: function (a) {
	        return a;
	      },
	
	      onAnimating: _.noop,
	      onAnimate: _.noop
	    };
	  },
	
	  getInitialState: function () {
	    return {
	      children: _.splat(this.props.children)
	    };
	  },
	
	  componentWillReceiveProps: function (nextProps) {
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
	
	  componentWillMount: function () {
	    this.animatingKeys = {};
	    this.leaving = null;
	    this.entering = null;
	  },
	
	  componentDidUpdate: function () {
	    var entering = this.entering,
	        leaving = this.leaving,
	        first = this.refs[key(entering) || key(leaving)],
	        node = this.getDOMNode(),
	        el = first && first.getDOMNode();
	
	    if (el) $.css(node, {
	      overflow: "hidden",
	      height: $.height(el) + "px",
	      width: $.width(el) + "px"
	    });
	
	    this.props.onAnimating();
	
	    this.entering = null;
	    this.leaving = null;
	
	    if (entering) this.performEnter(key(entering));
	    if (leaving) this.performLeave(key(leaving));
	  },
	
	  performEnter: function (key) {
	    var component = this.refs[key];
	
	    if (!component) return;
	
	    this.animatingKeys[key] = true;
	
	    if (component.componentWillEnter) component.componentWillEnter(this._handleDoneEntering.bind(this, key));else this._handleDoneEntering(key);
	  },
	
	  _tryFinish: function () {
	
	    if (this.isTransitioning()) return;
	
	    if (this.isMounted()) $.css(this.getDOMNode(), { overflow: "visible", height: "", width: "" });
	
	    this.props.onAnimate();
	  },
	
	  _handleDoneEntering: function (enterkey) {
	    var component = this.refs[enterkey];
	
	    if (component && component.componentDidEnter) component.componentDidEnter();
	
	    delete this.animatingKeys[enterkey];
	
	    if (key(this.props.children) !== enterkey) this.performLeave(enterkey); // This was removed before it had fully entered. Remove it.
	
	    this._tryFinish();
	  },
	
	  isTransitioning: function () {
	    return Object.keys(this.animatingKeys).length !== 0;
	  },
	
	  performLeave: function (key) {
	    var component = this.refs[key];
	
	    if (!component) return;
	
	    this.animatingKeys[key] = true;
	
	    if (component.componentWillLeave) component.componentWillLeave(this._handleDoneLeaving.bind(this, key));else this._handleDoneLeaving(key);
	  },
	
	  _handleDoneLeaving: function (leavekey) {
	    var component = this.refs[leavekey];
	
	    if (component && component.componentDidLeave) component.componentDidLeave();
	
	    delete this.animatingKeys[leavekey];
	
	    if (key(this.props.children) === leavekey) this.performEnter(leavekey);else if (this.isMounted()) this.setState({
	      children: this.state.children.filter(function (c) {
	        return key(c) !== leavekey;
	      })
	    });
	
	    this._tryFinish();
	  },
	
	  render: function () {
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
	// This entered again before it fully left. Add it again.

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _require = __webpack_require__(59);
	
	var getOffset = _require.offset;
	var height = _require.height;
	var getScrollParent = __webpack_require__(62);
	var scrollTop = __webpack_require__(63);
	var raf = __webpack_require__(64);
	
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

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelizeStyleName
	 * @typechecks
	 */
	
	"use strict";
	
	var camelize = __webpack_require__(77);
	
	var msPattern = /^-ms-/;
	
	/**
	 * Camelcases a hyphenated CSS property name, for example:
	 *
	 *   > camelizeStyleName('background-color')
	 *   < "backgroundColor"
	 *   > camelizeStyleName('-moz-transition')
	 *   < "MozTransition"
	 *   > camelizeStyleName('-ms-transition')
	 *   < "msTransition"
	 *
	 * As Andi Smith suggests
	 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	 * is converted to lowercase `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	}
	
	module.exports = camelizeStyleName;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule hyphenateStyleName
	 * @typechecks
	 */
	
	"use strict";
	
	var hyphenate = __webpack_require__(78);
	
	var msPattern = /^ms-/;
	
	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, '-ms-');
	}
	
	module.exports = hyphenateStyleName;


/***/ },
/* 75 */
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
/* 76 */
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
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelize
	 * @typechecks
	 */
	
	var _hyphenPattern = /-(.)/g;
	
	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function(_, character) {
	    return character.toUpperCase();
	  });
	}
	
	module.exports = camelize;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule hyphenate
	 * @typechecks
	 */
	
	var _uppercasePattern = /([A-Z])/g;
	
	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}
	
	module.exports = hyphenate;


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDE4YTcxMGJlOTdmYTNkYWY1YmIiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvdGVzdC5qcyIsIndlYnBhY2s6Ly8vLi90ZXN0IFxcLmJyb3dzZXJcXC4oanMkfGpzeCQpIiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3Rlc3QvRGF0YUhlbHBlck1peGluLmJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvdGVzdC9jYWxlbmRhci5icm93c2VyLmpzeCIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy90ZXN0L2RhdGV0aW1lcGlja2VyLmJyb3dzZXIuanN4Iiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3Rlc3QvZG9tLmJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvdGVzdC9tb250aC5icm93c2VyLmpzeCIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy90ZXN0L211bHRpc2VsZWN0LmJyb3dzZXIuanN4Iiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3Rlc3QvbnVtYmVycGlja2VyLmJyb3dzZXIuanN4Iiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3Rlc3QvdXRpbC5icm93c2VyLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcIndpbmRvdy5SZWFjdC5hZGRvbnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ3aW5kb3cuUmVhY3RcIiIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy92ZW5kb3IvcGhhbnRvbWpzLXNoaW0uanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL21peGlucy9EYXRhSGVscGVyc01peGluLmpzIiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9DYWxlbmRhci5qc3giLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL0hlYWRlci5qc3giLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL0Zvb3Rlci5qc3giLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL01vbnRoLmpzeCIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvWWVhci5qc3giLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL0RlY2FkZS5qc3giLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL0NlbnR1cnkuanN4Iiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2RhdGVzLmpzIiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9EYXRlVGltZVBpY2tlci5qc3giLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL1BvcHVwLmpzeCIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvTGlzdC5qc3giLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL3V0aWwvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9NdWx0aXNlbGVjdC5qc3giLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL011bHRpc2VsZWN0VGFnTGlzdC5qc3giLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL011bHRpc2VsZWN0SW5wdXQuanN4Iiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9OdW1iZXJQaWNrZXIuanN4Iiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL18uanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL3V0aWwvZmlsdGVyLmpzIiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL3Byb3BUeXBlcy5qcyIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvdXRpbC92YWxpZGF0ZUxpc3RJbnRlcmZhY2UuanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL3V0aWwvZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZ2xvYmFsaXplL2xpYi9jdWx0dXJlcy9nbG9iYWxpemUuY3VsdHVyZS5lcy5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi9nbG9iYWxpemUvbGliL2dsb2JhbGl6ZS5qcyIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvV2lkZ2V0QnV0dG9uLmpzeCIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvbWl4aW5zL1B1cmVSZW5kZXJNaXhpbi5qcyIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvbWl4aW5zL1J0bENoaWxkQ29udGV4dE1peGluLmpzIiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9taXhpbnMvV2lkZ2V0TWl4aW4uanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL21peGlucy9EYXRlRm9jdXNNaXhpbi5qcyIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvdXRpbC9jb21wYXQuanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL1NsaWRlVHJhbnNpdGlvbi5qc3giLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL21peGlucy9UaW1lb3V0TWl4aW4uanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL21peGlucy9SdGxQYXJlbnRDb250ZXh0TWl4aW4uanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL1RpbWVMaXN0LmpzeCIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvRGF0ZUlucHV0LmpzeCIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvbWl4aW5zL1BvcHVwU2Nyb2xsVG9NaXhpbi5qcyIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvbWl4aW5zL0xpc3RNb3ZlbWVudE1peGluLmpzIiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9MaXN0R3JvdXBhYmxlLmpzeCIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvbWl4aW5zL0RhdGFGaWx0ZXJNaXhpbi5qcyIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvTnVtYmVySW5wdXQuanN4Iiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2RvbS9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL3V0aWwvZG9tL2RpbWVuc2lvbnMuanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL3V0aWwvZG9tL2Nzcy5qcyIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvdXRpbC9kb20vY29udGFpbnMuanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL3V0aWwvZG9tL3Njcm9sbFBhcmVudC5qcyIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvdXRpbC9kb20vc2Nyb2xsVG9wLmpzIiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2RvbS9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuanMiLCJ3ZWJwYWNrOi8vL0U6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL3V0aWwvZG9tL2FuaW1hdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jbGFzc25hbWVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZGF0ZS1hcml0aG1ldGljL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vdW5jb250cm9sbGFibGUvbGliL3VuY29udHJvbGxhYmxlLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2ludmFyaWFudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9PYmplY3QuYXNzaWduLmpzIiwid2VicGFjazovLy9FOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9SZXBsYWNlVHJhbnNpdGlvbkdyb3VwLmpzeCIsIndlYnBhY2s6Ly8vRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvdXRpbC9kb20vc2Nyb2xsLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2NhbWVsaXplU3R5bGVOYW1lLmpzIiwid2VicGFjazovLy8uL34vcmVhY3QvbGliL2h5cGhlbmF0ZVN0eWxlTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudC5qcyIsIndlYnBhY2s6Ly8vLi9+L3VuY29udHJvbGxhYmxlL2xpYi91dGlsL2JhYmVsSGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9jYW1lbGl6ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlYWN0L2xpYi9oeXBoZW5hdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0EsS0FBSSxZQUFZLEdBQUcsc0JBQXdELENBQUM7QUFDNUUsYUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQzs7Ozs7O0FDRHpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBaUMsdURBQXVEO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDckJBLGFBQVksQ0FBQzs7QUFFYixLQUFJLEtBQUssR0FBTSxtQkFBTyxDQUFDLEVBQWMsQ0FBQztLQUNsQyxNQUFNLEdBQUcsbUJBQU8sQ0FBQyxFQUFnQyxDQUFDLENBQUM7O0FBRXZELEtBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQjs7QUFFdEQsU0FBUSxDQUFDLDhCQUE4QixFQUFFLFlBQVU7QUFDakQsT0FBSSxTQUFTLEVBQUUsSUFBSSxDQUFDOztBQUVwQixhQUFVLENBQUMsWUFBVTtBQUNuQixjQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBRTVCLGFBQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQzs7QUFFaEIsWUFBSyxFQUFFLFlBQVU7QUFDZixnQkFBTyxJQUFJO1FBQ1o7O0FBRUEsYUFBTSxFQUFFLFlBQVU7QUFBRSxnQkFBTyxJQUFJO1FBQUU7TUFDbkMsQ0FBQztJQUNILENBQUM7O0FBRUYsS0FBRSxDQUFDLHdCQUF3QixFQUFFLFlBQVU7QUFDckMsU0FBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRXJELFdBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDMUMsV0FBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7O0FBRXRELGFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQzs7QUFFekUsV0FBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMxQyxXQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDckQsV0FBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNsRSxDQUFDOztBQUVGLEtBQUUsQ0FBQyxxQkFBcUIsRUFBRSxZQUFVO0FBQ2xDLFNBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVyRCxXQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQy9DLFdBQU0sQ0FBQyxRQUFRLENB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LEtBQUssRUFBRSxJQUFLLEVBQUMsUUFBUSxFQUFFLFlBQUksRUFBRyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsU0FBUyxFQUFDLEdBQUcsR0FBRSxDQUFDLENBQUM7O0FBRTNGLGVBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FDbkQsRUFBRSxDQUFDLEtBQUssQ0FBRSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFFLFFBQVEsRUFBRSxDQUFDOztBQUV4RCxlQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQ2hELEVBQUUsQ0FBQyxLQUFLLENBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBRSxRQUFRLEVBQUUsQ0FBQzs7QUFFdkQsZUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUNsRCxFQUFFLENBQUMsS0FBSyxDQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUUsUUFBUSxFQUFFLENBQUM7O0FBR3hELGVBQU0sQ0FBQyxRQUFRLENBQUM7QUFDZCxnQkFBRyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ25DLGdCQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUs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QUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRTtjQUFNLEdBQUcsRUFBRTtNQUFBLENBQUM7O0FBRXhDLFdBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN2QixRQUFHLEdBQUcsQ0FBQztBQUNQLE1BQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFO2NBQU0sR0FBRyxFQUFFO01BQUEsQ0FBQztBQUM1QixXQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDeEIsQ0FBQzs7QUFFRixLQUFFLENBQUMsc0JBQXNCLEVBQUUsWUFBVTtBQUNuQyxXQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDL0QsV0FBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDdEUsQ0FBQzs7QUFFRixLQUFFLENBQUMsYUFBYSxFQUFFLFlBQVU7QUFDMUIsV0FBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBQztjQUFJLENBQUMsS0FBSyxDQUFDO01BQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDckQsV0FBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQztjQUFLLENBQUMsS0FBSyxDQUFDO01BQUEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7QUFFRixLQUFFLENBQUMsaUJBQWlCLEVBQUUsWUFBVTtBQUM5QixXQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNuRCxXQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDOztBQUVGLEtBQUUsQ0FBQyxzQkFBc0IsRUFBRSxZQUFVO0FBQ25DLFdBQU0sQ0FBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBQzNDLFdBQU0sQ0FBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQzlDLFdBQU0sQ0FBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO0FBQy9DLFdBQU0sQ0FBRSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBQ2xELFdBQU0sQ0FBRSxDQUFDLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOztBQUVwRCxXQUFNLENBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztBQUNsRCxXQUFNLENBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs7QUFFeEQsV0FBTSxDQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBQ3BELFdBQU0sQ0FBRSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs7QUFFckQsV0FBTSxDQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7O0FBRTVELFdBQU0sQ0FBRSxDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENB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LEVBQUUsR0FBRyxDQUFDLE1BRTFDLElBQUssU0FBUyxLQUFLLFVBQVUsQ0FBQyxLQUFLLEVBQ3RDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUV6QyxJQUFLLFNBQVMsS0FBSyxVQUFVLENBQUMsRUFBRSxFQUNuQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUUxQyxJQUFLLFNBQVMsS0FBSyxVQUFVLENBQUMsSUFBSSxFQUNyQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7O0FBRTlDLFlBQU8sSUFBSTtJQUNaOztFQUVGLENBQUMsQ0FBQzs7QUFFSCxVQUFTLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQztBQUNuQyxVQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQUssTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUNsRSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO0VBQ3ZFOztBQUVELFVBQVMsV0FBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQ3BDLFVBQU8sS0FBSyxDQUFDLEdBQUcsQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUM7RUFDL0M7O0FBRUQsVUFBUyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUM7QUFDaEMsVUFBTyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsSUFDdkQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUcsTUFBTSxDQUFDO0VBQzlEOztBQUVELFVBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUM7QUFDN0IsVUFBTyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBRSxNQUFNLENBQUMsSUFDeEQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEVBQUcsTUFBTSxDQUFDO0VBQy9EOztBQUVELFVBQVMsaUJBQWlCLENBQUMsS0FBSyxFQUFDO0FBQy9CLE9BQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUM7T0FDbkMsSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDOztBQUVsRSxVQUFPLElBQUksQ0FBQyxHQUFHLENBQUUsV0FBQztZQUFLLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDO0lBQUMsQ0FBQztFQUM1RDs7QUFHRCxVQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDO0FBQzFDLE9BQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcs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LENBQUMsSUFBSSxDQUFDO0FBQ2hELFdBQVEsRUFBUSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUk7QUFDcEMsT0FBSSxFQUFZLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzVFLFdBQVEsRUFBUSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUk7OztBQUdwQyxXQUFRLEVBQVEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJOztBQUVwQyxNQUFHLEVBQWEsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0FBQ2hELE1BQUcsRUFBYSxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7O0FBRWhELFVBQU8sRUFBUyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07O0FBRXRDLFNBQU0sRUFBVSxlQUFlLENBQUMsWUFBWTtBQUM1QyxhQUFVLEVBQU0sZUFBZSxDQUFDLFlBQVk7O0FBRTVDLFdBQVEsRUFBUSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUk7QUFDcEMsT0FBSSxFQUFZLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSTs7QUFFcEMsZ0JBQWEsRUFBRyxlQUFlLENBQUMsV0FBVzs7O0FBRzNDLFNBQU0sRUFBVSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUk7QUFDcEMsV0FBUSxFQUFRLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTs7QUFFdEMsY0FBVyxFQUFLLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUN0QyxPQUFJLEVBQVksS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNOztBQUV0QyxjQUFXLEVBQUssS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO0FBQy9DLFlBQVMsRUFBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7O0FBRS9DLFdBQVEsRUFBUSxLQUFLLENBQUMsU0FBUyxDQUFDLFNB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U0FBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLEVBQ3hDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLEVBQUU7O0FBRXBDLFNBQUcsT0FBTyxDQUFDLElBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLFFBQVEsRUFDN0MsT0FBTyxDQUFDLEtBQUssQ0FBQzs7QUFFaEIsU0FBRyxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsRUFBRyxPQUFPLEtBQUs7O0FBRXRDLFlBQU8sWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUI7O0FBRUQsWUFBUyxFQUFFLFVBQVMsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUM7QUFDaEMsTUFBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pFLFlBQU8sSUFBSTtJQUNaOztBQUVELE9BQUksRUFBRSxVQUFTLEdBQUcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFDO0FBQzlCLFNBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQzs7QUFFdkQsVUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsSUFBRyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUNsQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN2Qzs7Ozs7OztBQU9ELE9BQUksRUFBRSxVQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUM7QUFDdkIsU0FBSSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNkJBQTRCLFVBQVU7Ozs7Ozs7QUN6RHRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0MsWUFBWTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBNkI7QUFDN0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVEsWUFBWTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBc0IsV0FBVztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLFFBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxTQUFRLEVBQUU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUyxFQUFFO0FBQ1g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MsT0FBTztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRkFBa0YsRUFBRTtBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLEVBQUU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQWtCOztBQUVsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBa0MsT0FBTztBQUN6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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b250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQxOGE3MTBiZTk3ZmEzZGFmNWJiXG4gKiovIiwidmFyIHRlc3RzQ29udGV4dCA9IHJlcXVpcmUuY29udGV4dChcIi4vdGVzdFwiLCB0cnVlLCAvXFwuYnJvd3NlclxcLihqcyR8anN4JCkvKTtcclxudGVzdHNDb250ZXh0LmtleXMoKS5mb3JFYWNoKHRlc3RzQ29udGV4dCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy90ZXN0LmpzXG4gKiovIiwidmFyIG1hcCA9IHtcblx0XCIuL0RhdGFIZWxwZXJNaXhpbi5icm93c2VyLmpzXCI6IDIsXG5cdFwiLi9jYWxlbmRhci5icm93c2VyLmpzeFwiOiAzLFxuXHRcIi4vZGF0ZXRpbWVwaWNrZXIuYnJvd3Nlci5qc3hcIjogNSxcblx0XCIuL2RvbS5icm93c2VyLmpzXCI6IDYsXG5cdFwiLi9tb250aC5icm93c2VyLmpzeFwiOiAxMCxcblx0XCIuL211bHRpc2VsZWN0LmJyb3dzZXIuanN4XCI6IDExLFxuXHRcIi4vbnVtYmVycGlja2VyLmJyb3dzZXIuanN4XCI6IDEyLFxuXHRcIi4vdXRpbC5icm93c2VyLmpzXCI6IDEzXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHJldHVybiBtYXBbcmVxXSB8fCAoZnVuY3Rpb24oKSB7IHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpIH0oKSk7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDE7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdGVzdCBcXC5icm93c2VyXFwuKGpzJHxqc3gkKVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLypnbG9iYWwgaXQsIGRlc2NyaWJlLCBleHBlY3QsIGJlZm9yZUVhY2ggKi9cclxudmFyIFJlYWN0ICAgID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJylcclxuICAsIGhlbHBlciA9IHJlcXVpcmUoJy4uL3NyYy9taXhpbnMvRGF0YUhlbHBlcnNNaXhpbicpO1xyXG5cclxudmFyIHJlbmRlciA9IFJlYWN0LmFkZG9ucy5UZXN0VXRpbHMucmVuZGVySW50b0RvY3VtZW50XHJcblxyXG5kZXNjcmliZSgnd2hlbiB1c2luZyBEQVRBIEhFTFBFUiBNSVhJTicsIGZ1bmN0aW9uKCl7XHJcbiAgdmFyIENvbXBvbmVudCwgZGF0YTtcclxuXHJcbiAgYmVmb3JlRWFjaChmdW5jdGlvbigpe1xyXG4gICAgQ29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICAgICAgbWl4aW5zOiBbaGVscGVyXSxcclxuXHJcbiAgICAgIF9kYXRhOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHJldHVybiBkYXRhXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAgcmVuZGVyOiBmdW5jdGlvbigpeyByZXR1cm4gbnVsbCB9XHJcbiAgICB9KVxyXG4gIH0pXHJcblxyXG4gIGl0KCdzaG91bGQgZ2V0IGEgVmFsdWUgT3V0JywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBpbnN0YW5jZSA9IHJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCkpXHJcblxyXG4gICAgZXhwZWN0KGluc3RhbmNlLl9kYXRhVmFsdWUoMSkpLnRvLmVxdWFsKDEpXHJcbiAgICBleHBlY3QoaW5zdGFuY2UuX2RhdGFWYWx1ZSh7IGE6IDMgfSkpLnRvLmVxbCh7IGE6IDMgfSlcclxuXHJcbiAgICBpbnN0YW5jZSA9IHJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgeyB2YWx1ZUZpZWxkOiAndmFsdWUnfSkpXHJcblxyXG4gICAgZXhwZWN0KGluc3RhbmNlLl9kYXRhVmFsdWUoMSkpLnRvLmVxdWFsKDEpXHJcbiAgICBleHBlY3QoaW5zdGFuY2UuX2RhdGFWYWx1ZSh7IHZhbHVlOiAxIH0pKS50by5lcXVhbCgxKVxyXG4gICAgZXhwZWN0KGluc3RhbmNlLl9kYXRhVmFsdWUoeyB2YWx1ZTogeyBhOiAzIH0gfSkpLnRvLmVxbCh7IGE6IDMgfSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGdldCBUZXh0IE91dCcsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaW5zdGFuY2UgPSByZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQpKVxyXG5cclxuICAgIGV4cGVjdChpbnN0YW5jZS5fZGF0YVRleHQoJ2hpJykpLnRvLmVxdWFsKCdoaScpXHJcbiAgICBleHBlY3QoaW5zdGFuY2UuX2RhdGFUZXh0KHsgYTogMyB9KSkudG8uZXF1YWwoJ1tvYmplY3QgT2JqZWN0XScpXHJcblxyXG4gICAgaW5zdGFuY2UgPSByZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIHsgdGV4dEZpZWxkOiAndGV4dCd9KSlcclxuXHJcbiAgICBleHBlY3QoaW5zdGFuY2UuX2RhdGFUZXh0KCdoaScpKS50by5lcXVhbCgnaGknKVxyXG4gICAgZXhwZWN0KGluc3RhbmNlLl9kYXRhVGV4dCh7IHRleHQ6ICdoaScgfSkpLnRvLmVxdWFsKCdoaScpXHJcbiAgICBleHBlY3QoaW5zdGFuY2UuX2RhdGFUZXh0KHsgdGV4dDogeyBhOiAzIH0gfSkpLnRvLmVxbCgnW29iamVjdCBPYmplY3RdJylcclxuICB9KVxyXG5cclxuXHJcbiAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggaW5kZXhPZicsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgaW5zdGFuY2UgPSByZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQpKVxyXG4gICAgICAsIHZhbCA9IHsgdmFsdWU6IDMgfVxyXG5cclxuICAgIGV4cGVjdChpbnN0YW5jZS5fZGF0YUluZGV4T2YoWyAyLCAzLCAxXSwgMSkpLnRvLmVxdWFsKDIpXHJcblxyXG4gICAgZXhwZWN0KGluc3RhbmNlLl9kYXRhSW5kZXhPZihbe30sIHZhbCwge31dLCB2YWwpKS50by5lcXVhbCgxKVxyXG4gICAgXHJcbiAgICBleHBlY3QoaW5zdGFuY2UuX2RhdGFJbmRleE9mKFt7fSwgdmFsLCB7fV0sIHsgdmFsdWU6IDMgfSkpLnRvLmVxdWFsKDEpXHJcblxyXG4gICAgaW5zdGFuY2UgPSByZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChDb21wb25lbnQsIHsgdmFsdWVGaWVsZDogJ3ZhbHVlJ30pKVxyXG5cclxuICAgIGV4cGVjdChpbnN0YW5jZS5fZGF0YUluZGV4T2YoW3t9LCB2YWwsIHt9XSwgMykpLnRvLmVxdWFsKDEpXHJcblxyXG4gICAgZXhwZWN0KFxyXG4gICAgICBpbnN0YW5jZS5fZGF0YUluZGV4T2YoIFt7fSwge30sIHsgdmFsdWU6IHsgYTogMiB9IH1dLCB7IGE6IDIgfSlcclxuICAgIClcclxuICAgIC50by5lcXVhbCgyKVxyXG4gIH0pXHJcbiAgXHJcblxyXG4gIC8vIGl0Lm9ubHkoJ3Nob3VsZCBmaW5kIGEgZGF0YUl0ZW0nLCBmdW5jdGlvbigpe1xyXG4gIC8vICAgdmFyIGluc3RhbmNlID0gcmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50KSlcclxuICAvLyAgICAgLCB2YWwgPSB7IHZhbHVlOiAzIH1cclxuXHJcbiAgLy8gfSlcclxufSlcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3Rlc3QvRGF0YUhlbHBlck1peGluLmJyb3dzZXIuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbi8qZ2xvYmFsIGl0LCBkZXNjcmliZSwgZXhwZWN0LCBzaW5vbiwgJCovXHJcbnJlcXVpcmUoJy4uL3ZlbmRvci9waGFudG9tanMtc2hpbScpXHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdC9hZGRvbnMnKVxyXG4gICwgQ2FsZW5kYXIgPSByZXF1aXJlKCcuLi9zcmMvQ2FsZW5kYXIuanN4JylcclxuICAsIEJhc2VDYWxlbmRhciA9IHJlcXVpcmUoJy4uL3NyYy9DYWxlbmRhci5qc3gnKS5CYXNlQ2FsZW5kYXJcclxuICAsIEhlYWRlciA9IHJlcXVpcmUoJy4uL3NyYy9IZWFkZXIuanN4JylcclxuICAsIEZvb3RlciA9IHJlcXVpcmUoJy4uL3NyYy9Gb290ZXIuanN4JylcclxuICAsIE1vbnRoICA9ICByZXF1aXJlKCcuLi9zcmMvTW9udGguanN4JylcclxuICAsIFllYXIgPSByZXF1aXJlKCcuLi9zcmMvWWVhci5qc3gnKVxyXG4gICwgRGVjYWRlID0gcmVxdWlyZSgnLi4vc3JjL0RlY2FkZS5qc3gnKVxyXG4gICwgQ2VudHVyeSA9IHJlcXVpcmUoJy4uL3NyYy9DZW50dXJ5LmpzeCcpXHJcbiAgLCBET00gPSByZXF1aXJlKCcuLi9zcmMvdXRpbC9kb20nKVxyXG4gICwgZGF0ZXMgPSByZXF1aXJlKCcuLi9zcmMvdXRpbC9kYXRlcycpXHJcbiAgLCBnbG9iYWxpemUgPSByZXF1aXJlKCdnbG9iYWxpemUnKTtcclxuXHJcblxyXG52YXIgVGVzdFV0aWxzID0gUmVhY3QuYWRkb25zLlRlc3RVdGlsc1xyXG4gICwgcmVuZGVyID0gVGVzdFV0aWxzLnJlbmRlckludG9Eb2N1bWVudFxyXG4gICwgZmluZFRhZyA9IFRlc3RVdGlscy5maW5kUmVuZGVyZWRET01Db21wb25lbnRXaXRoVGFnXHJcbiAgLCBmaW5kQ2xhc3MgPSBUZXN0VXRpbHMuZmluZFJlbmRlcmVkRE9NQ29tcG9uZW50V2l0aENsYXNzXHJcbiAgLCBmaW5kVHlwZSA9IFRlc3RVdGlscy5maW5kUmVuZGVyZWRDb21wb25lbnRXaXRoVHlwZVxyXG4gICwgdHJpZ2dlciA9IFRlc3RVdGlscy5TaW11bGF0ZTtcclxuXHJcbmRlc2NyaWJlKCdDYWxlbmRhcicsICgpID0+IHtcclxuXHJcbiAgYWZ0ZXJFYWNoKCgpPT4ge1xyXG4gICAgRE9NLmFuaW1hdGUucmVzdG9yZSAmJiBcclxuICAgICAgRE9NLmFuaW1hdGUucmVzdG9yZSgpXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCBzZXQgSW5pdGlhbCBWaWV3JywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxyXG4gICAgICAsIHBpY2tlciA9IHJlbmRlcig8Q2FsZW5kYXIgZGVmYXVsdFZhbHVlPXtkYXRlfSBpbml0aWFsVmlldz0neWVhcicvPik7XHJcblxyXG4gICAgZXhwZWN0KCgpID0+IFxyXG4gICAgICBmaW5kVHlwZShwaWNrZXIsIHJlcXVpcmUoJy4uL3NyYy9ZZWFyLmpzeCcpKSkudG8ubm90LnRocm93RXhjZXB0aW9uKCk7XHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCBjbGljayB1cCB0aHJvdWdoIHZpZXdzJywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxyXG4gICAgICAsIHBpY2tlciA9IHJlbmRlcig8Q2FsZW5kYXIgZGVmYXVsdFZhbHVlPXtkYXRlfSAvPilcclxuICAgICAgLCBoZWFkZXIgPSBmaW5kVHlwZShwaWNrZXIsIEhlYWRlcilcclxuICAgICAgLCBuYXZCdG4gPSBmaW5kQ2xhc3MoaGVhZGVyLCAncnctYnRuLXZpZXcnKS5nZXRET01Ob2RlKCk7XHJcblxyXG4gICAgZXhwZWN0KCgpID0+IFxyXG4gICAgICBmaW5kVHlwZShwaWNrZXIsIE1vbnRoKSkudG8ubm90LnRocm93RXhjZXB0aW9uKCk7XHJcblxyXG4gICAgdHJpZ2dlci5jbGljayhuYXZCdG4pXHJcblxyXG4gICAgZXhwZWN0KCgpID0+IFxyXG4gICAgICBmaW5kVHlwZShwaWNrZXIsIFllYXIpKS50by5ub3QudGhyb3dFeGNlcHRpb24oKTtcclxuXHJcbiAgICB0cmlnZ2VyLmNsaWNrKG5hdkJ0bilcclxuXHJcbiAgICBleHBlY3QoKCkgPT4gXHJcbiAgICAgIGZpbmRUeXBlKHBpY2tlciwgRGVjYWRlKSkudG8ubm90LnRocm93RXhjZXB0aW9uKCk7XHJcblxyXG4gICAgdHJpZ2dlci5jbGljayhuYXZCdG4pXHJcblxyXG4gICAgZXhwZWN0KCgpID0+IFxyXG4gICAgICBmaW5kVHlwZShwaWNrZXIsIENlbnR1cnkpKS50by5ub3QudGhyb3dFeGNlcHRpb24oKTtcclxuXHJcbiAgICBleHBlY3QobmF2QnRuLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkudG8uYmUodHJ1ZSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGtleSB1cCB0aHJvdWdoIHZpZXdzJywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxyXG4gICAgICAsIHBpY2tlciA9IHJlbmRlcig8Q2FsZW5kYXIgZGVmYXVsdFZhbHVlPXtkYXRlfSAvPik7XHJcblxyXG4gICAgZXhwZWN0KCgpID0+IFxyXG4gICAgICBmaW5kVHlwZShwaWNrZXIsIE1vbnRoKSkudG8ubm90LnRocm93RXhjZXB0aW9uKCk7XHJcblxyXG4gICAgdHJpZ2dlci5rZXlEb3duKHBpY2tlci5nZXRET01Ob2RlKCksIHsgY3RybEtleTogdHJ1ZSwga2V5OiAnQXJyb3dVcCcgfSlcclxuXHJcbiAgICBleHBlY3QoKCkgPT4gXHJcbiAgICAgIGZpbmRUeXBlKHBpY2tlciwgWWVhcikpLnRvLm5vdC50aHJvd0V4Y2VwdGlvbigpO1xyXG5cclxuICAgIHRyaWdnZXIua2V5RG93bihwaWNrZXIuZ2V0RE9NTm9kZSgpLCB7IGN0cmxLZXk6IHRydWUsIGtleTogJ0Fycm93VXAnIH0pXHJcblxyXG4gICAgZXhwZWN0KCgpID0+IFxyXG4gICAgICBmaW5kVHlwZShwaWNrZXIsIERlY2FkZSkpLnRvLm5vdC50aHJvd0V4Y2VwdGlvbigpO1xyXG5cclxuICAgIHRyaWdnZXIua2V5RG93bihwaWNrZXIuZ2V0RE9NTm9kZSgpLCB7IGN0cmxLZXk6IHRydWUsIGtleTogJ0Fycm93VXAnIH0pXHJcblxyXG4gICAgZXhwZWN0KCgpID0+IFxyXG4gICAgICBmaW5kVHlwZShwaWNrZXIsIENlbnR1cnkpKS50by5ub3QudGhyb3dFeGNlcHRpb24oKTtcclxuXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCBuYXZpZ2F0ZSBpbnRvIHRoZSBwYXN0JywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBkYXRlICAgID0gbmV3IERhdGUoMjAxNCwgNSwgMTUsIDAsIDAsIDApXHJcbiAgICAgICwgcGlja2VyICA9IHJlbmRlcig8Q2FsZW5kYXIgZGVmYXVsdFZhbHVlPXtkYXRlfSAvPilcclxuICAgICAgLCBoZWFkZXIgID0gZmluZFR5cGUocGlja2VyLCBIZWFkZXIpXHJcbiAgICAgICwgbGVmdEJ0biA9IGZpbmRDbGFzcyhoZWFkZXIsICdydy1idG4tbGVmdCcpLmdldERPTU5vZGUoKVxyXG4gICAgICAsIG5hdkJ0biAgPSBmaW5kQ2xhc3MoaGVhZGVyLCAncnctYnRuLXZpZXcnKS5nZXRET01Ob2RlKCk7XHJcblxyXG4gICAgc3luY0FuaW1hdGUoKVxyXG5cclxuICAgIHRyaWdnZXIuY2xpY2sobGVmdEJ0bilcclxuXHJcbiAgICBleHBlY3QoZmluZFR5cGUocGlja2VyLCBNb250aCkuc3RhdGUuZm9jdXNlZERhdGUuZ2V0TW9udGgoKSkudG8uYmUoNCk7XHJcblxyXG4gICAgdHJpZ2dlci5jbGljayhuYXZCdG4pXHJcbiAgICB0cmlnZ2VyLmNsaWNrKGxlZnRCdG4pXHJcblxyXG4gICAgZXhwZWN0KGZpbmRUeXBlKHBpY2tlciwgWWVhcikuc3RhdGUuZm9jdXNlZERhdGUuZ2V0RnVsbFllYXIoKSkudG8uYmUoMjAxMyk7XHJcblxyXG4gICAgdHJpZ2dlci5jbGljayhuYXZCdG4pXHJcbiAgICB0cmlnZ2VyLmNsaWNrKGxlZnRCdG4pXHJcblxyXG4gICAgZXhwZWN0KGZpbmRUeXBlKHBpY2tlciwgRGVjYWRlKS5zdGF0ZS5mb2N1c2VkRGF0ZS5nZXRGdWxsWWVhcigpKS50by5iZSgyMDAzKTtcclxuXHJcbiAgICB0cmlnZ2VyLmNsaWNrKG5hdkJ0bilcclxuICAgIHRyaWdnZXIuY2xpY2sobGVmdEJ0bilcclxuXHJcbiAgICBleHBlY3QoZmluZFR5cGUocGlja2VyLCBDZW50dXJ5KS5zdGF0ZS5mb2N1c2VkRGF0ZS5nZXRGdWxsWWVhcigpKS50by5iZSgxOTAzKTtcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIG5hdmlnYXRlIGludG8gdGhlIGZ1dHVyZScsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZGF0ZSAgICAgPSBuZXcgRGF0ZSgyMDE0LCA1LCAxNSwgMCwgMCwgMClcclxuICAgICAgLCBwaWNrZXIgICA9IHJlbmRlcig8Q2FsZW5kYXIgZGVmYXVsdFZhbHVlPXtkYXRlfSBtYXg9e25ldyBEYXRlKDIxOTksMTEsIDMxKX0gLz4pXHJcbiAgICAgICwgaGVhZGVyICAgPSBmaW5kVHlwZShwaWNrZXIsIEhlYWRlcilcclxuICAgICAgLCByaWdodEJ0biA9IGZpbmRDbGFzcyhoZWFkZXIsICdydy1idG4tcmlnaHQnKS5nZXRET01Ob2RlKClcclxuICAgICAgLCBuYXZCdG4gICA9IGZpbmRDbGFzcyhoZWFkZXIsICdydy1idG4tdmlldycpLmdldERPTU5vZGUoKTtcclxuXHJcbiAgICBzeW5jQW5pbWF0ZSgpXHJcblxyXG4gICAgdHJpZ2dlci5jbGljayhyaWdodEJ0bilcclxuXHJcbiAgICBleHBlY3QoZmluZFR5cGUocGlja2VyLCBNb250aCkuc3RhdGUuZm9jdXNlZERhdGUuZ2V0TW9udGgoKSkudG8uYmUoNik7XHJcblxyXG4gICAgdHJpZ2dlci5jbGljayhuYXZCdG4pXHJcbiAgICB0cmlnZ2VyLmNsaWNrKHJpZ2h0QnRuKVxyXG5cclxuICAgIGV4cGVjdChmaW5kVHlwZShwaWNrZXIsIFllYXIpLnN0YXRlLmZvY3VzZWREYXRlLmdldEZ1bGxZZWFyKCkpLnRvLmJlKDIwMTUpO1xyXG5cclxuICAgIHRyaWdnZXIuY2xpY2sobmF2QnRuKVxyXG4gICAgdHJpZ2dlci5jbGljayhyaWdodEJ0bilcclxuXHJcbiAgICBleHBlY3QoZmluZFR5cGUocGlja2VyLCBEZWNhZGUpLnN0YXRlLmZvY3VzZWREYXRlLmdldEZ1bGxZZWFyKCkpLnRvLmJlKDIwMjUpO1xyXG5cclxuICAgIHRyaWdnZXIuY2xpY2sobmF2QnRuKVxyXG4gICAgdHJpZ2dlci5jbGljayhyaWdodEJ0bilcclxuXHJcbiAgICBleHBlY3QoZmluZFR5cGUocGlja2VyLCBDZW50dXJ5KS5zdGF0ZS5mb2N1c2VkRGF0ZS5nZXRGdWxsWWVhcigpKS50by5iZSgyMTI1KTtcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGhhdmUgYSBmb290ZXInLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHBpY2tlciA9IHJlbmRlcig8QmFzZUNhbGVuZGFyLz4pXHJcbiAgICAgICwgZm9vdGVyO1xyXG5cclxuICAgIGV4cGVjdCgoKSA9PiBmaW5kVHlwZShwaWNrZXIsIEZvb3RlcikpXHJcbiAgICAgIC50by50aHJvd0V4Y2VwdGlvbigpXHJcblxyXG4gICAgcGlja2VyID0gcmVuZGVyKDxCYXNlQ2FsZW5kYXIgZm9vdGVyLz4pXHJcblxyXG4gICAgZXhwZWN0KCgpID0+IGZvb3RlciA9IGZpbmRUeXBlKHBpY2tlciwgRm9vdGVyKSlcclxuICAgICAgLnRvLm5vdC50aHJvd0V4Y2VwdGlvbigpXHJcblxyXG4gICAgZXhwZWN0KCQoZm9vdGVyLmdldERPTU5vZGUoKSkudGV4dCgpKVxyXG4gICAgICAudG8uZXF1YWwoXHJcbiAgICAgICAgZ2xvYmFsaXplLmZvcm1hdChuZXcgRGF0ZSwgJ0QnKSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGFjY2VwdCBmb290ZXIgZm9ybWF0JywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBmb3JtYXR0ZXIgPSBzaW5vbi5zcHkoKGR0LCBjdWx0dXJlKSA9PiB7XHJcbiAgICAgIGV4cGVjdChkdCkudG8uYmUuYShEYXRlKVxyXG4gICAgICBleHBlY3QoY3VsdHVyZSkudG8uYmUuYSgnc3RyaW5nJykuYW5kLmVxdWFsKCdlbicpXHJcbiAgICAgIHJldHVybiAndGVzdCdcclxuICAgIH0pXHJcblxyXG4gICAgdmFyIHBpY2tlciA9IHJlbmRlcig8QmFzZUNhbGVuZGFyIGZvb3RlciBmb290ZXJGb3JtYXQ9e2Zvcm1hdHRlcn0gY3VsdHVyZT0nZW4nLz4pXHJcbiAgICAgICwgZm9vdGVyID0gZmluZFR5cGUocGlja2VyLCBGb290ZXIpO1xyXG5cclxuICAgIGV4cGVjdCgkKGZvb3Rlci5nZXRET01Ob2RlKCkpLnRleHQoKSlcclxuICAgICAgLnRvLmVxdWFsKCd0ZXN0JylcclxuXHJcbiAgICBleHBlY3QoZm9ybWF0dGVyLmNhbGxlZE9uY2UpLnRvLmJlLm9rKClcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIG5hdmlnYXRlIHRvIGZvb3RlciBkYXRlJywgKCkgPT4ge1xyXG4gICAgdmFyIHBpY2tlciA9IHJlbmRlcig8QmFzZUNhbGVuZGFyIGZvb3RlciB2YWx1ZT17bmV3IERhdGUoMjAxMywgNSwgMTUpfS8+KVxyXG4gICAgICAsIGZvb3RlciA9IGZpbmRUeXBlKHBpY2tlciwgRm9vdGVyKTtcclxuXHJcbiAgICB0cmlnZ2VyLmNsaWNrKFxyXG4gICAgICBmaW5kQ2xhc3MoZm9vdGVyLCAncnctYnRuJykuZ2V0RE9NTm9kZSgpKVxyXG5cclxuICAgIGV4cGVjdChcclxuICAgICAgZGF0ZXMuZXEocGlja2VyLnN0YXRlLmN1cnJlbnREYXRlLCBuZXcgRGF0ZSgpLCAnZGF5JykpXHJcbiAgICAgICAgLnRvLmJlLm9rKClcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGNvbnN0cmFpbiBtb3ZlbWVudCBieSBtaW4gYW5kIG1heCcsICgpID0+IHtcclxuICAgIHZhciBkYXRlICAgICA9IG5ldyBEYXRlKDIwMTQsIDUsIDE1KVxyXG4gICAgICAsIHBpY2tlciAgID0gcmVuZGVyKDxCYXNlQ2FsZW5kYXIgdmFsdWU9e2RhdGV9IG1heD17bmV3IERhdGUoMjAxNCwgNSwgMjUpfSAgbWluPXtuZXcgRGF0ZSgyMDE0LCA1LCA1KX0gb25DaGFuZ2U9eygpPT57fX0vPilcclxuICAgICAgLCBoZWFkZXIgICA9IGZpbmRUeXBlKHBpY2tlciwgSGVhZGVyKVxyXG4gICAgICAsIHJpZ2h0QnRuID0gZmluZENsYXNzKGhlYWRlciwgJ3J3LWJ0bi1yaWdodCcpLmdldERPTU5vZGUoKVxyXG4gICAgICAsIGxlZnRCdG4gID0gZmluZENsYXNzKGhlYWRlciwgJ3J3LWJ0bi1sZWZ0JykuZ2V0RE9NTm9kZSgpO1xyXG5cclxuICAgIHRyaWdnZXIuY2xpY2socmlnaHRCdG4pXHJcblxyXG4gICAgZXhwZWN0KHBpY2tlci5zdGF0ZS5jdXJyZW50RGF0ZSkudG8uZXFsKGRhdGUpXHJcblxyXG4gICAgdHJpZ2dlci5jbGljayhsZWZ0QnRuKVxyXG5cclxuICAgIGV4cGVjdChwaWNrZXIuc3RhdGUuY3VycmVudERhdGUpLnRvLmVxbChkYXRlKVxyXG5cclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIHVzZSBwYXNzZWQgaW4gY3VsdHVyZScsIGZ1bmN0aW9uKCl7XHJcbiAgICByZXF1aXJlKCdnbG9iYWxpemUvbGliL2N1bHR1cmVzL2dsb2JhbGl6ZS5jdWx0dXJlLmVzJylcclxuXHJcbiAgICB2YXIgZGF0ZSAgID0gbmV3IERhdGUoMjAxNCwgNSwgMTUpXHJcbiAgICAgICwgcGlja2VyID0gcmVuZGVyKDxCYXNlQ2FsZW5kYXIgdmFsdWU9e2RhdGV9IGN1bHR1cmU9J2VzJyAgb25DaGFuZ2U9eygpPT57fX0vPilcclxuICAgICAgLCBoZWFkZXJCdG4gPSBmaW5kQ2xhc3MocGlja2VyLCAncnctYnRuLXZpZXcnKS5nZXRET01Ob2RlKClcclxuICAgICAgLCBoZWFkID0gZmluZFRhZyhwaWNrZXIsICd0aGVhZCcpLmdldERPTU5vZGUoKTtcclxuICAgIFxyXG4gICAgc3luY0FuaW1hdGUoKVxyXG5cclxuICAgIGV4cGVjdCgkKGhlYWRlckJ0bikudGV4dCgpKS50by5lcXVhbCgnanVuaW8gMjAxNCcpXHJcbiAgICBleHBlY3QoJChoZWFkLmNoaWxkcmVuWzBdLmZpcnN0Q2hpbGQpLnRleHQoKSkudG8uZXF1YWwoJ2x1JylcclxuXHJcbiAgICBwaWNrZXIuc2V0UHJvcHMoeyBpbml0aWFsVmlldzogJ3llYXInIH0pXHJcblxyXG4gICAgZXhwZWN0KCQoZmluZFRhZyhwaWNrZXIsICd0Ym9keScpLmdldERPTU5vZGUoKS5jaGlsZHJlblswXS5maXJzdENoaWxkKS50ZXh0KCkpXHJcbiAgICAgIC50by5lcXVhbCgnZW5lJylcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIHBhc3Mgb24gZm9ybWF0JywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBkYXRlICAgID0gbmV3IERhdGUoMjAxNCwgNSwgMTUpXHJcbiAgICAgICwgZmlyc3QgICA9ICgpID0+ICQoY2FsZW5kYXIuZ2V0RE9NTm9kZSgpKS5maW5kKCd0ZDpmaXJzdCcpXHJcbiAgICAgICwgZm9ybWF0cyA9IF8udHJhbnNmb3JtKFxyXG4gICAgICAgICAgICBbJ2RheUZvcm1hdCcsICdkYXRlRm9ybWF0JywgJ21vbnRoRm9ybWF0JywgJ3llYXJGb3JtYXQnLCAnZGVjYWRlRm9ybWF0JyBdXHJcbiAgICAgICAgICAsIChvLCB2KSA9PiBvW3ZdID0gdilcclxuICAgICAgLCBjYWxlbmRhcjtcclxuICAgIFxyXG4gICAgc3luY0FuaW1hdGUoKVxyXG5cclxuICAgIGNhbGVuZGFyID0gcmVuZGVyKDxCYXNlQ2FsZW5kYXIgey4uLmZvcm1hdHN9IHZhbHVlPXtkYXRlfSBvbkNoYW5nZT17KCk9Pnt9fSAvPilcclxuXHJcbiAgICBleHBlY3QoZmluZFR5cGUoY2FsZW5kYXIsIE1vbnRoKS5wcm9wcy5kYXlGb3JtYXQpLnRvLmVxdWFsKCdkYXlGb3JtYXQnKVxyXG4gICAgZXhwZWN0KGZpbmRUeXBlKGNhbGVuZGFyLCBNb250aCkucHJvcHMuZGF0ZUZvcm1hdCkudG8uZXF1YWwoJ2RhdGVGb3JtYXQnKVxyXG5cclxuICAgIGNhbGVuZGFyLnNldFByb3BzKHsgaW5pdGlhbFZpZXc6ICd5ZWFyJyB9KVxyXG5cclxuICAgIGV4cGVjdChmaW5kVHlwZShjYWxlbmRhciwgWWVhcikucHJvcHMubW9udGhGb3JtYXQpLnRvLmVxdWFsKCdtb250aEZvcm1hdCcpXHJcblxyXG4gICAgY2FsZW5kYXIuc2V0UHJvcHMoeyBpbml0aWFsVmlldzogJ2RlY2FkZScgfSlcclxuXHJcbiAgICBleHBlY3QoZmluZFR5cGUoY2FsZW5kYXIsIERlY2FkZSkucHJvcHMueWVhckZvcm1hdCkudG8uZXF1YWwoJ3llYXJGb3JtYXQnKVxyXG5cclxuICAgIGNhbGVuZGFyLnNldFByb3BzKHsgaW5pdGlhbFZpZXc6ICdjZW50dXJ5JyB9KVxyXG5cclxuICAgIGV4cGVjdChmaW5kVHlwZShjYWxlbmRhciwgQ2VudHVyeSkucHJvcHMuZGVjYWRlRm9ybWF0KS50by5lcXVhbCgnZGVjYWRlRm9ybWF0JylcclxuICB9KVxyXG5cclxufSlcclxuXHJcblxyXG5mdW5jdGlvbiBzeW5jQW5pbWF0ZSgpe1xyXG4gIHJldHVybiBzaW5vbi5zdHViKERPTSwgJ2FuaW1hdGUnLCBmdW5jdGlvbihub2RlLCBwcm9wZXJ0aWVzLCBkdXJhdGlvbiwgZWFzaW5nLCBjYWxsYmFjayl7XHJcbiAgICB0eXBlb2YgZWFzaW5nID09PSAnZnVuY3Rpb24nID8gZWFzaW5nKCkgOiBjYWxsYmFjaygpXHJcbiAgfSlcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3Rlc3QvY2FsZW5kYXIuYnJvd3Nlci5qc3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbi8qZ2xvYmFsIGl0LCBkZXNjcmliZSwgZXhwZWN0LCBzaW5vbiovXHJcbnJlcXVpcmUoJy4uL3ZlbmRvci9waGFudG9tanMtc2hpbScpXHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdC9hZGRvbnMnKTtcclxudmFyIERhdGVUaW1lUGlja2VyID0gcmVxdWlyZSgnLi4vc3JjL0RhdGVUaW1lUGlja2VyLmpzeCcpXHJcbiAgLCBDYWxlbmRhciA9IHJlcXVpcmUoJy4uL3NyYy9DYWxlbmRhci5qc3gnKS5CYXNlQ2FsZW5kYXJcclxuICAsIEdsb2JhbGl6ZSA9IHJlcXVpcmUoJ2dsb2JhbGl6ZScpO1xyXG5cclxuXHJcbnZhciBUZXN0VXRpbHMgPSBSZWFjdC5hZGRvbnMuVGVzdFV0aWxzXHJcbiAgLCByZW5kZXIgPSBUZXN0VXRpbHMucmVuZGVySW50b0RvY3VtZW50XHJcbiAgLCBmaW5kVGFnID0gVGVzdFV0aWxzLmZpbmRSZW5kZXJlZERPTUNvbXBvbmVudFdpdGhUYWdcclxuICAsIGZpbmRDbGFzcyA9IFRlc3RVdGlscy5maW5kUmVuZGVyZWRET01Db21wb25lbnRXaXRoQ2xhc3NcclxuICAsIGZpbmRUeXBlID0gVGVzdFV0aWxzLmZpbmRSZW5kZXJlZENvbXBvbmVudFdpdGhUeXBlXHJcbiAgLCBmaW5kQWxsVHlwZSA9IFRlc3RVdGlscy5zY3J5UmVuZGVyZWRDb21wb25lbnRzV2l0aFR5cGVcclxuICAsIHRyaWdnZXIgPSBUZXN0VXRpbHMuU2ltdWxhdGU7XHJcblxyXG5kZXNjcmliZSgnRGF0ZVRpbWVQaWNrZXInLCBmdW5jdGlvbigpe1xyXG5cclxuICBpdCgnc2hvdWxkIHNldCBpbml0aWFsIHZhbHVlcycsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcclxuICAgICAgLCBwaWNrZXIgPSByZW5kZXIoPERhdGVUaW1lUGlja2VyIGRlZmF1bHRWYWx1ZT17ZGF0ZX0gZm9ybWF0PVwiTU0tZGQteXl5eVwiLz4pXHJcbiAgICAgICwgaW5wdXQgID0gZmluZENsYXNzKHBpY2tlciwgJ3J3LWlucHV0JykuZ2V0RE9NTm9kZSgpO1xyXG5cclxuICAgIGV4cGVjdCggaW5wdXQudmFsdWUpLnRvLmJlKEdsb2JhbGl6ZS5mb3JtYXQoZGF0ZSwgJ01NLWRkLXl5eXknKSk7XHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCBzdGFydCBjbG9zZWQnLCBmdW5jdGlvbihkb25lKXtcclxuICAgIHZhciBwaWNrZXIgPSByZW5kZXIoPERhdGVUaW1lUGlja2VyIGRlZmF1bHRWYWx1ZT17bmV3IERhdGUoKX0gLz4pO1xyXG4gICAgdmFyIHBvcHVwcyA9IGZpbmRBbGxUeXBlKHBpY2tlciwgcmVxdWlyZSgnLi4vc3JjL1BvcHVwLmpzeCcpKTtcclxuXHJcbiAgICBleHBlY3QocGlja2VyLnN0YXRlLm9wZW4pLnRvLm5vdC5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KHBpY2tlci5nZXRET01Ob2RlKCkuY2xhc3NOYW1lKS50by5ub3QubWF0Y2goL1xcYnJ3LW9wZW5cXGIvKVxyXG5cclxuICAgIGV4cGVjdChmaW5kQ2xhc3MocGlja2VyLCAncnctaW5wdXQnKS5nZXRET01Ob2RlKCkuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykpLnRvLmJlKCdmYWxzZScpXHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBleHBlY3QocG9wdXBzLmxlbmd0aCkudG8uYmUoMilcclxuICAgICAgcG9wdXBzLmZvckVhY2goIHBvcHVwID0+IGV4cGVjdChwb3B1cC5nZXRET01Ob2RlKCkuc3R5bGUuZGlzcGxheSkudG8uYmUoJ25vbmUnKSkgXHJcbiAgICAgIGRvbmUoKVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIG9wZW4gd2hlbiBjbGlja2VkJywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBvbk9wZW4gPSBzaW5vbi5zcHkoKVxyXG4gICAgICAsIHBpY2tlciA9IHJlbmRlcig8RGF0ZVRpbWVQaWNrZXIgb25Ub2dnbGU9e29uT3Blbn0gLz4pO1xyXG5cclxuICAgIHRyaWdnZXIuY2xpY2soZmluZENsYXNzKHBpY2tlciwgJ3J3LWJ0bi1jYWxlbmRhcicpLmdldERPTU5vZGUoKSlcclxuXHJcbiAgICBleHBlY3Qob25PcGVuLmNhbGxlZE9uY2UpLnRvLmJlKHRydWUpXHJcblxyXG4gICAgdHJpZ2dlci5jbGljayhmaW5kQ2xhc3MocGlja2VyLCAncnctYnRuLXRpbWUnKS5nZXRET01Ob2RlKCkpXHJcblxyXG4gICAgZXhwZWN0KG9uT3Blbi5jYWxsZWRUd2ljZSkudG8uYmUodHJ1ZSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGNoYW5nZSB3aGVuIHNlbGVjdGluZyBhIHRpbWUgb3IgZGF0ZScsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgY2hhbmdlICAgPSBzaW5vbi5zcHkoKVxyXG4gICAgICAsIHBpY2tlciAgID0gcmVuZGVyKDxEYXRlVGltZVBpY2tlciBvbkNoYW5nZT17Y2hhbmdlfSBvcGVuPSdjYWxlbmRhcicgb25Ub2dnbGU9eygpPT57fX0gLz4pXHJcbiAgICAgICwgY2FsZW5kYXIgPSBmaW5kVHlwZShwaWNrZXIsIENhbGVuZGFyKVxyXG4gICAgICAsIHRpbWVsaXN0ID0gZmluZFR5cGUocGlja2VyLCByZXF1aXJlKCcuLi9zcmMvTGlzdC5qc3gnKSkuZ2V0RE9NTm9kZSgpLmNoaWxkcmVuXHJcblxyXG4gICAgY2FsZW5kYXIuY2hhbmdlKG5ldyBEYXRlKCkpXHJcbiAgICBleHBlY3QoY2hhbmdlLmNhbGxlZE9uY2UpLnRvLmJlKHRydWUpXHJcbiAgICB0cmlnZ2VyLmNsaWNrKHRpbWVsaXN0WzBdKVxyXG5cclxuICAgIGV4cGVjdChjaGFuZ2UuY2FsbGVkVHdpY2UpLnRvLmJlKHRydWUpXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCBub3Qgc2hvdyB0aW1lIGJ1dHRvbiB3aGVuIG5vdCBzZWxlY3RlZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgc3B5XHJcbiAgICAgICwgcGlja2VyID0gcmVuZGVyKDxEYXRlVGltZVBpY2tlciB0aW1lPXtmYWxzZX0gY2FsZW5kYXI9e2ZhbHNlfSBvblRvZ2dsZT17c3B5ID0gc2lub24uc3B5KCl9Lz4pO1xyXG4gICAgXHJcbiAgICBleHBlY3QoKCkgPT4gZmluZENsYXNzKHBpY2tlciwgJ3J3LWJ0bi10aW1lJykpLnRvXHJcbiAgICAgIC50aHJvd0V4Y2VwdGlvbigvRGlkIG5vdCBmaW5kIGV4YWN0bHkgb25lIG1hdGNoIGZvciBjbGFzczpydy1idG4tdGltZS8pXHJcblxyXG4gICAgZXhwZWN0KCgpID0+IGZpbmRDbGFzcyhwaWNrZXIsICdydy1idG4tY2FsZW5kYXInKSkudG9cclxuICAgICAgLnRocm93RXhjZXB0aW9uKC9EaWQgbm90IGZpbmQgZXhhY3RseSBvbmUgbWF0Y2ggZm9yIGNsYXNzOnJ3LWJ0bi1jYWxlbmRhci8pXHJcblxyXG4gICAgLy9tYWtlIHN1cmUga2V5Ym9hcmQgc2hvcnRjdXRzIGRvbid0IHdvcmsgZWl0aGVyXHJcbiAgICB0cmlnZ2VyLmtleURvd24ocGlja2VyLmdldERPTU5vZGUoKSwgeyBhbHRLZXk6IHRydWUgfSlcclxuICAgIGV4cGVjdChzcHkuY2FsbENvdW50KS50by5iZSgwKVxyXG4gICAgdHJpZ2dlci5rZXlEb3duKHBpY2tlci5nZXRET01Ob2RlKCksIHsgYWx0S2V5OiB0cnVlIH0pXHJcbiAgICBleHBlY3Qoc3B5LmNhbGxDb3VudCkudG8uYmUoMClcclxuICB9KVxyXG5cclxuXHJcbiAgaXQoJ3Nob3VsZCB0cmlnZ2VyIGZvY3VzL2JsdXIgZXZlbnRzJywgZnVuY3Rpb24oZG9uZSl7XHJcbiAgICB2YXIgYmx1ciA9IHNpbm9uLnNweSgpXHJcbiAgICAgICwgZm9jdXMgPSBzaW5vbi5zcHkoKVxyXG4gICAgICAsIHBpY2tlciA9IHJlbmRlcig8RGF0ZVRpbWVQaWNrZXIgb25CbHVyPXtibHVyfSBvbkZvY3VzPXtmb2N1c30vPik7XHJcblxyXG4gICAgZXhwZWN0KGZvY3VzLmNhbGxlZE9uY2UpLnRvLmJlKGZhbHNlKVxyXG4gICAgZXhwZWN0KGJsdXIuY2FsbGVkT25jZSkudG8uYmUoZmFsc2UpXHJcblxyXG4gICAgdHJpZ2dlci5mb2N1cyhwaWNrZXIuZ2V0RE9NTm9kZSgpKVxyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBleHBlY3QoZm9jdXMuY2FsbGVkT25jZSkudG8uYmUodHJ1ZSlcclxuICAgICAgdHJpZ2dlci5ibHVyKHBpY2tlci5nZXRET01Ob2RlKCkpXHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBleHBlY3QoYmx1ci5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgICAgIGRvbmUoKVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIHRyaWdnZXIga2V5IGV2ZW50cycsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIga3AgPSBzaW5vbi5zcHkoKSwga2QgPSBzaW5vbi5zcHkoKSwga3UgPSBzaW5vbi5zcHkoKVxyXG4gICAgICAsIHBpY2tlciA9IHJlbmRlcig8RGF0ZVRpbWVQaWNrZXIgb25LZXlQcmVzcz17a3B9IG9uS2V5VXA9e2t1fSBvbktleURvd249e2tkfS8+KVxyXG4gICAgICAsIGlucHV0ICA9IGZpbmRDbGFzcyhwaWNrZXIsICdydy1pbnB1dCcpLmdldERPTU5vZGUoKTtcclxuXHJcbiAgICB0cmlnZ2VyLmtleVByZXNzKGlucHV0KVxyXG4gICAgdHJpZ2dlci5rZXlEb3duKGlucHV0KVxyXG4gICAgdHJpZ2dlci5rZXlVcChpbnB1dClcclxuXHJcbiAgICBleHBlY3Qoa3AuY2FsbGVkT25jZSkudG8uYmUodHJ1ZSlcclxuICAgIGV4cGVjdChrZC5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KGt1LmNhbGxlZE9uY2UpLnRvLmJlKHRydWUpXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCBkbyBub3RoaW5nIHdoZW4gZGlzYWJsZWQnLCBmdW5jdGlvbihkb25lKXtcclxuICAgIHZhciBwaWNrZXIgPSByZW5kZXIoPERhdGVUaW1lUGlja2VyIGRlZmF1bHRWYWx1ZT17bmV3IERhdGV9IGRpc2FibGVkLz4pXHJcbiAgICAgICwgaW5wdXQgPSBmaW5kQ2xhc3MocGlja2VyLCAncnctaW5wdXQnKS5nZXRET01Ob2RlKCk7XHJcblxyXG4gICAgZXhwZWN0KCBpbnB1dC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpLnRvLmJlKHRydWUpO1xyXG5cclxuICAgIHRyaWdnZXIuY2xpY2soZmluZENsYXNzKHBpY2tlciwgJ3J3LWktY2FsZW5kYXInKS5nZXRET01Ob2RlKCkpXHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGV4cGVjdChwaWNrZXIuc3RhdGUub3BlbikudG8ubm90LmJlKHRydWUpXHJcbiAgICAgIGRvbmUoKVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGRvIG5vdGhpbmcgd2hlbiByZWFkb25seScsIGZ1bmN0aW9uKGRvbmUpe1xyXG4gICAgdmFyIHBpY2tlciA9IHJlbmRlcig8RGF0ZVRpbWVQaWNrZXIgZGVmYXVsdFZhbHVlPXtuZXcgRGF0ZX0gcmVhZE9ubHkvPilcclxuICAgICAgLCBpbnB1dCAgPSBmaW5kQ2xhc3MocGlja2VyLCAncnctaW5wdXQnKS5nZXRET01Ob2RlKCk7XHJcblxyXG4gICAgZXhwZWN0KCBpbnB1dC5oYXNBdHRyaWJ1dGUoJ3JlYWRvbmx5JykpLnRvLmJlKHRydWUpO1xyXG5cclxuICAgIHRyaWdnZXIuY2xpY2soZmluZENsYXNzKHBpY2tlciwgJ3J3LWktY2FsZW5kYXInKS5nZXRET01Ob2RlKCkpXHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGV4cGVjdChwaWNrZXIuc3RhdGUub3BlbikudG8ubm90LmJlKHRydWUpXHJcbiAgICAgIGRvbmUoKVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGNhbGwgU2VsZWN0IGhhbmRsZXInLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGNoYW5nZSAgID0gc2lub24uc3B5KCksIHNlbGVjdCA9IHNpbm9uLnNweSgpXHJcbiAgICAgICwgcGlja2VyICAgPSByZW5kZXIoPERhdGVUaW1lUGlja2VyIG9uQ2hhbmdlPXtjaGFuZ2V9IG9uU2VsZWN0PXtzZWxlY3R9Lz4pXHJcbiAgICAgICwgY2FsZW5kYXIgPSBmaW5kVHlwZShwaWNrZXIsIENhbGVuZGFyKVxyXG4gICAgICAsIHRpbWVsaXN0ID0gZmluZFR5cGUocGlja2VyLCByZXF1aXJlKCcuLi9zcmMvTGlzdC5qc3gnKSkuZ2V0RE9NTm9kZSgpLmNoaWxkcmVuO1xyXG5cclxuICAgIGNhbGVuZGFyLmNoYW5nZShuZXcgRGF0ZSgpKVxyXG5cclxuICAgIGV4cGVjdChzZWxlY3QuY2FsbGVkT25jZSkudG8uYmUodHJ1ZSlcclxuICAgIGV4cGVjdChjaGFuZ2UuY2FsbGVkQWZ0ZXIoc2VsZWN0KSkudG8uYmUodHJ1ZSlcclxuXHJcbiAgICBzZWxlY3QucmVzZXQoKVxyXG4gICAgY2hhbmdlLnJlc2V0KClcclxuXHJcbiAgICB0cmlnZ2VyLmNsaWNrKHRpbWVsaXN0WzBdKVxyXG4gICAgZXhwZWN0KHNlbGVjdC5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KGNoYW5nZS5jYWxsZWRBZnRlcihzZWxlY3QpKS50by5iZSh0cnVlKVxyXG4gIH0pXHJcblxyXG5cclxuICBpdCgnc2hvdWxkIGNoYW5nZSB2YWx1ZXMgb24ga2V5IGRvd24nLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGNoYW5nZSA9IHNpbm9uLnNweSgpXHJcbiAgICAgICwgcGlja2VyID0gcmVuZGVyKDxEYXRlVGltZVBpY2tlciBvbkNoYW5nZT17Y2hhbmdlfSAvPilcclxuICAgICAgLCB0aW1lbGlzdCA9IGZpbmRUeXBlKHBpY2tlciwgcmVxdWlyZSgnLi4vc3JjL0xpc3QuanN4JykpLmdldERPTU5vZGUoKS5jaGlsZHJlbjtcclxuXHJcbiAgICB0cmlnZ2VyLmtleURvd24ocGlja2VyLmdldERPTU5vZGUoKSwgeyBrZXk6ICdBcnJvd0Rvd24nLCBhbHRLZXk6IHRydWUgfSlcclxuICAgIGV4cGVjdChwaWNrZXIuc3RhdGUub3BlbikudG8uYmUoJ2NhbGVuZGFyJylcclxuXHJcbiAgICB0cmlnZ2VyLmtleURvd24ocGlja2VyLmdldERPTU5vZGUoKSwgeyBrZXk6ICdBcnJvd0Rvd24nLCBhbHRLZXk6IHRydWUgfSlcclxuICAgIGV4cGVjdChwaWNrZXIuc3RhdGUub3BlbikudG8uYmUoJ3RpbWUnKVxyXG5cclxuICAgIHRyaWdnZXIua2V5RG93bihwaWNrZXIuZ2V0RE9NTm9kZSgpLCB7IGtleTogJ0hvbWUnfSlcclxuXHJcbiAgICBleHBlY3QodGltZWxpc3RbMF0uY2xhc3NOYW1lKS50by5tYXRjaCgvXFxicnctc3RhdGUtZm9jdXNcXGIvKVxyXG5cclxuICAgIHRyaWdnZXIua2V5RG93bihwaWNrZXIuZ2V0RE9NTm9kZSgpLCB7IGtleTogJ0VuZCd9KVxyXG5cclxuICAgIGV4cGVjdCh0aW1lbGlzdFt0aW1lbGlzdC5sZW5ndGgtMV0uY2xhc3NOYW1lKS50by5tYXRjaCgvXFxicnctc3RhdGUtZm9jdXNcXGIvKVxyXG5cclxuICAgIHRyaWdnZXIua2V5RG93bihwaWNrZXIuZ2V0RE9NTm9kZSgpLCB7IGtleTogJ0Fycm93VXAnIH0pXHJcbiAgICBleHBlY3QodGltZWxpc3RbdGltZWxpc3QubGVuZ3RoLTJdLmNsYXNzTmFtZSkudG8ubWF0Y2goL1xcYnJ3LXN0YXRlLWZvY3VzXFxiLylcclxuXHJcbiAgICB0cmlnZ2VyLmtleURvd24ocGlja2VyLmdldERPTU5vZGUoKSwgeyBrZXk6ICdBcnJvd0Rvd24nIH0pXHJcbiAgICBleHBlY3QodGltZWxpc3RbdGltZWxpc3QubGVuZ3RoLTFdLmNsYXNzTmFtZSkudG8ubWF0Y2goL1xcYnJ3LXN0YXRlLWZvY3VzXFxiLylcclxuICB9KVxyXG59KVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvdGVzdC9kYXRldGltZXBpY2tlci5icm93c2VyLmpzeFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLypnbG9iYWwgaXQsIGRlc2NyaWJlLCBleHBlY3QsICQgKi9cclxucmVxdWlyZSgnLi4vdmVuZG9yL3BoYW50b21qcy1zaGltJylcclxuXHJcbnZhciBET00gPSByZXF1aXJlKCcuLi9zcmMvdXRpbC9kb20nKVxyXG5cclxuLy8gbm90IGV2ZXJ5dGhpbmcganVzdCBzdHVmZiB0aGF0IGllIGhhdGVzXHJcbmRlc2NyaWJlKCdET00gV29yaycsICgpID0+IHtcclxuXHJcbiAgaXQoJ3Nob3VsZCBzZXQgY3NzIHZhbHVlcycsICgpID0+IHtcclxuICAgICQoJ2JvZHknKS5odG1sKCc8ZGl2Lz4nKVxyXG5cclxuICAgIERPTS5jc3MoJCgnYm9keSA+IGRpdicpWzBdLCB7IGhlaWdodDogJzE1cHgnIH0pXHJcblxyXG4gICAgZXhwZWN0KERPTS5jc3MoJCgnYm9keSA+IGRpdicpWzBdLCAnaGVpZ2h0JykgKS50by5iZSgnMTVweCcpO1xyXG4gIH0pXHJcblxyXG4gIGl0KCdzaG91bGQgZ2V0IHNjcm9sbFBhcmVudCcsICgpID0+IHtcclxuICAgICQoJ2JvZHknKS5odG1sKCc8ZGl2IHN0eWxlPVwiaGVpZ2h0OiAyMDBweDsgb3ZlcmZsb3c6c2Nyb2xsO1wiPjxkaXYgc3R5bGU9XCJoZWlnaHQ6IDUwMHB4XCIvPjwvZGl2PicpXHJcblxyXG4gICAgdmFyIHBhcmVudCA9IERPTS5zY3JvbGxQYXJlbnQoJCgnYm9keSA+IGRpdiA+IGRpdicpWzBdKTtcclxuXHJcbiAgICBleHBlY3QocGFyZW50KS50by5iZSgkKCdib2R5ID4gZGl2JylbMF0pO1xyXG4gIH0pXHJcblxyXG59KVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvdGVzdC9kb20uYnJvd3Nlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLypnbG9iYWwgaXQsIGRlc2NyaWJlLCBleHBlY3QsIHNpbm9uKi9cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XHJcbnZhciBNb250aCA9IHJlcXVpcmUoJy4uL3NyYy9Nb250aC5qc3gnKVxyXG4gICwgZGlyZWN0aW9ucyA9IHJlcXVpcmUoJy4uL3NyYy91dGlsL2NvbnN0YW50cycpLmRpcmVjdGlvbnNcclxuICAsIEdsb2JhbGl6ZSA9IHJlcXVpcmUoJ2dsb2JhbGl6ZScpO1xyXG5cclxuXHJcbnZhciBUZXN0VXRpbHMgPSBSZWFjdC5hZGRvbnMuVGVzdFV0aWxzXHJcbiAgLCByZW5kZXIgPSBUZXN0VXRpbHMucmVuZGVySW50b0RvY3VtZW50XHJcbiAgLCBmaW5kVGFnID0gVGVzdFV0aWxzLmZpbmRSZW5kZXJlZERPTUNvbXBvbmVudFdpdGhUYWdcclxuICAsIGZpbmRDbGFzcyA9IFRlc3RVdGlscy5maW5kUmVuZGVyZWRET01Db21wb25lbnRXaXRoQ2xhc3NcclxuICAsIGZpbmRUeXBlID0gVGVzdFV0aWxzLmZpbmRSZW5kZXJlZENvbXBvbmVudFdpdGhUeXBlXHJcbiAgLCBmaW5kQWxsVHlwZSA9IFRlc3RVdGlscy5zY3J5UmVuZGVyZWRDb21wb25lbnRzV2l0aFR5cGVcclxuICAsIHRyaWdnZXIgPSBUZXN0VXRpbHMuU2ltdWxhdGU7XHJcblxyXG5kZXNjcmliZSgnTW9udGggQ29tcG9uZW50JywgZnVuY3Rpb24oKXtcclxuXHJcbiAgaXQoJ3Nob3VsZCBtb3ZlIHRvIGFuIGFwcHJvcHJpYXRlIGRhdGUnLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGRhdGUgICA9IG5ldyBEYXRlKDIwMTQsIDAsIDE2LCAwLCAwLCAwKVxyXG4gICAgICAsIHBpY2tlciA9IHJlbmRlcig8TW9udGggdmFsdWU9e2RhdGV9IG9uQ2hhbmdlPXsoKT0+e319IGRhdGVGb3JtYXQ9J2RkJyBkYXlGb3JtYXQ9J2QnLz4pO1xyXG5cclxuICAgIGV4cGVjdChwaWNrZXIubW92ZShkYXRlLCBkaXJlY3Rpb25zLlJJR0hUKS50b1N0cmluZygpKVxyXG4gICAgICAudG8uZXF1YWwoKG5ldyBEYXRlKDIwMTQsIDAsIDE3LCAwLCAwLCAwKSkudG9TdHJpbmcoKSlcclxuXHJcbiAgICBleHBlY3QocGlja2VyLm1vdmUoZGF0ZSwgZGlyZWN0aW9ucy5VUCkudG9TdHJpbmcoKSlcclxuICAgICAgLnRvLmVxdWFsKChuZXcgRGF0ZSgyMDE0LCAwLCA5LCAwLCAwLCAwKSkudG9TdHJpbmcoKSlcclxuXHJcbiAgICBleHBlY3QocGlja2VyLm1vdmUoZGF0ZSwgZGlyZWN0aW9ucy5ET1dOKS50b1N0cmluZygpKVxyXG4gICAgICAudG8uZXF1YWwoKG5ldyBEYXRlKDIwMTQsIDAsIDIzLCAwLCAwLCAwKSkudG9TdHJpbmcoKSlcclxuXHJcblxyXG4gICAgcGlja2VyLnNldFByb3BzKHtcclxuICAgICAgbWluOiBuZXcgRGF0ZSgyMDE0LCAwLCAxMSwgMCwgMCwgMCksXHJcbiAgICAgIG1heDogbmV3IERhdGUoMjAxNCwgMCwgMjAsIDAsIDAsIDApXHJcbiAgICB9KVxyXG5cclxuICAgIGV4cGVjdChwaWNrZXIubW92ZShkYXRlLCBkaXJlY3Rpb25zLlVQKSlcclxuICAgICAgLnRvLmVxbChkYXRlKVxyXG5cclxuICAgIGV4cGVjdChwaWNrZXIubW92ZShkYXRlLCBkaXJlY3Rpb25zLkRPV04pKVxyXG4gICAgICAudG8uZXFsKGRhdGUpXHJcbiAgfSkgXHJcblxyXG4gIGl0KCdzaG91bGQgdXNlIHRoZSByaWdodCBmb3JtYXQnLCAoKSA9PiB7XHJcbiAgICB2YXIgZGF0ZSAgID0gbmV3IERhdGUoMjAxNSwgMSwgMTYsIDAsIDAsIDApXHJcbiAgICAgICwgZm9ybWF0dGVyID0gc2lub24uc3B5KCgpID0+ICdoaScpXHJcbiAgICAgICwgcGlja2VyID0gcmVuZGVyKDxNb250aCB2YWx1ZT17ZGF0ZX0gb25DaGFuZ2U9eygpPT57fX0gZGF0ZUZvcm1hdD0nZGQnIGRheUZvcm1hdD0nZCcvPilcclxuICAgICAgLCBmaXJzdCAgPSAoKSA9PiAkKHBpY2tlci5nZXRET01Ob2RlKCkpLmZpbmQoJ3RkOmZpcnN0Jyk7XHJcblxyXG4gICAgZXhwZWN0KGZpcnN0KCkudGV4dCgpKS50by5lcXVhbCgnMDEnKVxyXG5cclxuICAgIHBpY2tlciA9IHJlbmRlcig8TW9udGggdmFsdWU9e2RhdGV9IG9uQ2hhbmdlPXsoKT0+e319IGRhdGVGb3JtYXQ9Jy1kJyBkYXlGb3JtYXQ9J2QnLz4pXHJcblxyXG4gICAgZXhwZWN0KGZpcnN0KCkudGV4dCgpKS50by5lcXVhbCgnLTEnKVxyXG5cclxuICAgIHBpY2tlciA9IHJlbmRlcig8TW9udGggdmFsdWU9e2RhdGV9IG9uQ2hhbmdlPXsoKT0+e319IGRhdGVGb3JtYXQ9e2Zvcm1hdHRlcn0gY3VsdHVyZT0nZW4nIGRheUZvcm1hdD0nZCcvPilcclxuXHJcbiAgICBleHBlY3QoZm9ybWF0dGVyLmNhbGxlZCkudG8uYmUub2soKTtcclxuXHJcbiAgICBleHBlY3QoZm9ybWF0dGVyLmFyZ3NbMF0ubGVuZ3RoKS50by5lcXVhbCgyKTtcclxuICAgIGV4cGVjdChmb3JtYXR0ZXIuYXJnc1swXVswXSkudG8uYmUuYShEYXRlKTtcclxuICAgIGV4cGVjdChmb3JtYXR0ZXIuYXJnc1swXVsxXSkudG8uYmUuYSgnc3RyaW5nJykuYW5kLnRvLmVxdWFsKCdlbicpO1xyXG5cclxuICAgIGV4cGVjdChmaXJzdCgpLnRleHQoKSkudG8uZXF1YWwoJ2hpJylcclxuICB9KVxyXG59KVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3Rlc3QvbW9udGguYnJvd3Nlci5qc3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbi8qZ2xvYmFsIGl0LCBkZXNjcmliZSwgZXhwZWN0LCBzaW5vbiwgJCAqL1xyXG5yZXF1aXJlKCcuLi92ZW5kb3IvcGhhbnRvbWpzLXNoaW0nKVxyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QvYWRkb25zJyk7XHJcbnZhciBTZWxlY3QgPSByZXF1aXJlKCcuLi9zcmMvTXVsdGlzZWxlY3QuanN4JylcclxuICAsIFRhZ0xpc3QgPSByZXF1aXJlKCcuLi9zcmMvTXVsdGlzZWxlY3RUYWdMaXN0LmpzeCcpO1xyXG5cclxudmFyIFRlc3RVdGlscyA9IFJlYWN0LmFkZG9ucy5UZXN0VXRpbHNcclxuICAsIHJlbmRlciA9IFRlc3RVdGlscy5yZW5kZXJJbnRvRG9jdW1lbnRcclxuICAsIGZpbmRUYWcgPSBUZXN0VXRpbHMuZmluZFJlbmRlcmVkRE9NQ29tcG9uZW50V2l0aFRhZ1xyXG4gICwgZmluZENsYXNzID0gVGVzdFV0aWxzLmZpbmRSZW5kZXJlZERPTUNvbXBvbmVudFdpdGhDbGFzc1xyXG4gICwgZmluZFR5cGUgPSBUZXN0VXRpbHMuZmluZFJlbmRlcmVkQ29tcG9uZW50V2l0aFR5cGVcclxuICAsIHRyaWdnZXIgPSBUZXN0VXRpbHMuU2ltdWxhdGU7XHJcblxyXG5cclxuXHJcbmRlc2NyaWJlKCdNdWx0aXNlbGVjdCcsIGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGRhdGFMaXN0ID0gW1xyXG4gICAgICAgIHsgbGFiZWw6ICdqaW1teScsIGlkOiAwIH0sXHJcbiAgICAgICAgeyBsYWJlbDogJ3NhbGx5JywgaWQ6IDEgfSxcclxuICAgICAgICB7IGxhYmVsOiAncGF0JywgaWQ6IDIgfVxyXG4gICAgICBdO1xyXG5cclxuICBpdCgnc2hvdWxkIHNldCBpbml0aWFsIHZhbHVlcycsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgc2VsZWN0ID0gcmVuZGVyKDxTZWxlY3QgdmFsdWU9e1snaGVsbG8nXX0gb25DaGFuZ2U9eygpPT57fX0gLz4pXHJcbiAgICAgICwgdGFncyAgID0gZmluZFR5cGUoc2VsZWN0LCBUYWdMaXN0KS5nZXRET01Ob2RlKCk7XHJcblxyXG4gICAgZXhwZWN0KCAkKHRhZ3MpLmZpbmQoJ2xpOmZpcnN0LWNoaWxkID4gc3BhbicpLnRleHQoKSApLnRvLmJlKCdoZWxsbycpO1xyXG4gIH0pXHJcblxyXG4gIGl0KCdzaG91bGQgcmVzcGVjdCB0ZXh0RmllbGQgYW5kIHZhbHVlRmllbGRzJywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxlY3QgPSByZW5kZXIoPFNlbGVjdCBkZWZhdWx0VmFsdWU9e1swXX0gZGF0YT17ZGF0YUxpc3R9IHRleHRGaWVsZD0nbGFiZWwnIHZhbHVlRmllbGQ9J2lkJyAvPilcclxuICAgICAgLCB0YWdzICAgPSBmaW5kVHlwZShzZWxlY3QsIFRhZ0xpc3QpLmdldERPTU5vZGUoKTtcclxuXHJcbiAgICBleHBlY3QoICQodGFncykuZmluZCgnbGk6Zmlyc3QtY2hpbGQgPiBzcGFuJykudGV4dCgpICkudG8uYmUoJ2ppbW15Jyk7XHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCBzdGFydCBjbG9zZWQnLCBmdW5jdGlvbihkb25lKXtcclxuICAgIHZhciBzZWxlY3QgPSByZW5kZXIoPFNlbGVjdCBkZWZhdWx0VmFsdWU9e1swXX0gZGF0YT17ZGF0YUxpc3R9IHRleHRGaWVsZD0nbGFiZWwnIHZhbHVlRmllbGQ9J2lkJyAvPik7XHJcbiAgICB2YXIgcG9wdXAgPSBmaW5kVHlwZShzZWxlY3QsIHJlcXVpcmUoJy4uL3NyYy9Qb3B1cC5qc3gnKSk7XHJcblxyXG4gICAgZXhwZWN0KHNlbGVjdC5zdGF0ZS5vcGVuKS50by5ub3QuYmUodHJ1ZSlcclxuICAgIGV4cGVjdChzZWxlY3QuZ2V0RE9NTm9kZSgpLmNsYXNzTmFtZSkudG8ubm90Lm1hdGNoKC9cXGJydy1vcGVuXFxiLylcclxuICAgIGV4cGVjdChmaW5kQ2xhc3Moc2VsZWN0LCAncnctaW5wdXQnKS5nZXRET01Ob2RlKCkuZ2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJykpLnRvLmJlKCdmYWxzZScpXHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBleHBlY3QoJChwb3B1cC5nZXRET01Ob2RlKCkpLmNzcygnZGlzcGxheScpKS50by5iZSgnbm9uZScpXHJcbiAgICAgIGRvbmUoKVxyXG4gICAgfSwgMClcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIG9wZW4gd2hlbiBmb2N1c2VkJywgZnVuY3Rpb24oZG9uZSl7XHJcbiAgICB2YXIgc2VsZWN0ID0gcmVuZGVyKDxTZWxlY3QgZGVmYXVsdFZhbHVlPXtbJ2ppbW15J119IGRhdGE9e2RhdGFMaXN0fSBkdXJhdGlvbj17MH0vPik7XHJcbiAgICB2YXIgcG9wdXAgPSBmaW5kVHlwZShzZWxlY3QsIHJlcXVpcmUoJy4uL3NyYy9Qb3B1cC5qc3gnKSlcclxuXHJcbiAgICB0cmlnZ2VyLmZvY3VzKHNlbGVjdC5nZXRET01Ob2RlKCkpXHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgZXhwZWN0KHNlbGVjdC5zdGF0ZS5vcGVuKS50by5iZSh0cnVlKVxyXG4gICAgICBleHBlY3Qoc2VsZWN0LmdldERPTU5vZGUoKS5jbGFzc05hbWUpLnRvLm1hdGNoKC9cXGJydy1vcGVuXFxiLylcclxuICAgICAgZXhwZWN0KGZpbmRDbGFzcyhzZWxlY3QsICdydy1pbnB1dCcpLmdldERPTU5vZGUoKS5nZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKSkudG8uYmUoJ3RydWUnKVxyXG4gICAgICBleHBlY3QocG9wdXAucHJvcHMub3BlbikudG8uYmUodHJ1ZSlcclxuICAgICAgZG9uZSgpXHJcbiAgICB9KVxyXG4gIH0pXHJcblxyXG4gIGl0KCdzaG91bGQgcmVtb3ZlIHRhZyB3aGVuIGNsaWNrZWQnLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGRlbCA9IHNpbm9uLnNweSgpXHJcbiAgICAgICwgdGFncyA9IHJlbmRlcihcclxuICAgICAgICAgIDxUYWdMaXN0IHZhbHVlPXtbZGF0YUxpc3RbMF0sIGRhdGFMaXN0WzFdXX0gZGF0YT17ZGF0YUxpc3R9IHRleHRGaWVsZD0nbGFiZWwnIHZhbHVlRmllbGQ9J2lkJyBvbkRlbGV0ZT17ZGVsfS8+KVxyXG4gICAgICAgICAgLmdldERPTU5vZGUoKTtcclxuXHJcbiAgICBleHBlY3QoJCh0YWdzKS5jaGlsZHJlbigpLmxlbmd0aCkudG8uYmUoMilcclxuICAgIHRyaWdnZXIuY2xpY2sodGFncy5jaGlsZHJlblsxXS5jaGlsZHJlblsxXSkgLy8gY2xpY2sgYnV0dG9uXHJcblxyXG4gICAgZXhwZWN0KGRlbC5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KGRlbC5jYWxsZWRXaXRoKGRhdGFMaXN0WzFdKSkudG8uYmUodHJ1ZSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGNoYW5nZSB2YWx1ZSB3aGVuIHRhZyBpcyBjbGlja2VkJywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBjaGFuZ2UgPSBzaW5vbi5zcHkoKVxyXG4gICAgICAsIHNlbGVjdCA9IHJlbmRlcig8U2VsZWN0IG9uQ2hhbmdlPXtjaGFuZ2V9IHZhbHVlPXtbZGF0YUxpc3RbMF0sIGRhdGFMaXN0WzFdXX0gZGF0YT17ZGF0YUxpc3R9IHRleHRGaWVsZD0nbGFiZWwnIHZhbHVlRmllbGQ9J2lkJyAvPilcclxuICAgICAgLCB0YWdzICAgPSBmaW5kVHlwZShzZWxlY3QsIFRhZ0xpc3QpLmdldERPTU5vZGUoKVxyXG5cclxuICAgIGV4cGVjdCgkKHRhZ3MpLmNoaWxkcmVuKCkubGVuZ3RoKS50by5iZSgyKVxyXG4gICAgdHJpZ2dlci5jbGljayh0YWdzLmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdKSAvLyBjbGljayBidXR0b25cclxuXHJcbiAgICBleHBlY3QoY2hhbmdlLmNhbGxlZE9uY2UpLnRvLmJlKHRydWUpXHJcbiAgICBleHBlY3QoY2hhbmdlLmFyZ3NbMF1bMF0pLnRvLmVxbChbIGRhdGFMaXN0WzBdIF0pXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCB0cmlnZ2VyIGZvY3VzL2JsdXIgZXZlbnRzJywgZnVuY3Rpb24oZG9uZSl7XHJcbiAgICB2YXIgYmx1ciA9IHNpbm9uLnNweSgpXHJcbiAgICAgICwgZm9jdXMgPSBzaW5vbi5zcHkoKVxyXG4gICAgICAsIHNlbGVjdCA9IHJlbmRlcig8U2VsZWN0IG9uQmx1cj17Ymx1cn0gb25Gb2N1cz17Zm9jdXN9Lz4pO1xyXG5cclxuICAgIGV4cGVjdChmb2N1cy5jYWxsZWRPbmNlKS50by5iZShmYWxzZSlcclxuICAgIGV4cGVjdChibHVyLmNhbGxlZE9uY2UpLnRvLmJlKGZhbHNlKVxyXG5cclxuICAgIHRyaWdnZXIuZm9jdXMoc2VsZWN0LmdldERPTU5vZGUoKSlcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZXhwZWN0KGZvY3VzLmNhbGxlZE9uY2UpLnRvLmJlKHRydWUpXHJcbiAgICAgIHRyaWdnZXIuYmx1cihzZWxlY3QuZ2V0RE9NTm9kZSgpKVxyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZXhwZWN0KGJsdXIuY2FsbGVkT25jZSkudG8uYmUodHJ1ZSlcclxuICAgICAgICBkb25lKClcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCB0cmlnZ2VyIGtleSBldmVudHMnLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGtwID0gc2lub24uc3B5KCksIGtkID0gc2lub24uc3B5KCksIGt1ID0gc2lub24uc3B5KClcclxuICAgICAgLCBzZWxlY3QgPSByZW5kZXIoPFNlbGVjdCBvbktleVByZXNzPXtrcH0gb25LZXlVcD17a3V9IG9uS2V5RG93bj17a2R9Lz4pXHJcbiAgICAgICwgaW5wdXQgID0gZmluZFR5cGUoc2VsZWN0LCByZXF1aXJlKCcuLi9zcmMvTXVsdGlzZWxlY3RJbnB1dC5qc3gnKSkuZ2V0RE9NTm9kZSgpO1xyXG5cclxuICAgIHRyaWdnZXIua2V5UHJlc3MoaW5wdXQpXHJcbiAgICB0cmlnZ2VyLmtleURvd24oaW5wdXQpXHJcbiAgICB0cmlnZ2VyLmtleVVwKGlucHV0KVxyXG5cclxuICAgIGV4cGVjdChrcC5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KGtkLmNhbGxlZE9uY2UpLnRvLmJlKHRydWUpXHJcbiAgICBleHBlY3Qoa3UuY2FsbGVkT25jZSkudG8uYmUodHJ1ZSlcclxuICB9KVxyXG5cclxuXHJcbiAgaXQoJ3Nob3VsZCBkbyBub3RoaW5nIHdoZW4gZGlzYWJsZWQnLCBmdW5jdGlvbihkb25lKXtcclxuICAgIHZhciBzZWxlY3QgPSByZW5kZXIoPFNlbGVjdCBkZWZhdWx0VmFsdWU9e1snamltbXknXX0gZGF0YT17ZGF0YUxpc3R9IGR1cmF0aW9uPXswfSBkaXNhYmxlZD17dHJ1ZX0vPilcclxuICAgICAgLCBpbnB1dCAgPSBmaW5kVHlwZShzZWxlY3QsIHJlcXVpcmUoJy4uL3NyYy9NdWx0aXNlbGVjdElucHV0LmpzeCcpKS5nZXRET01Ob2RlKClcclxuICAgICAgLCB0YWdzICAgPSBmaW5kVHlwZShzZWxlY3QsIFRhZ0xpc3QpLmdldERPTU5vZGUoKTtcclxuXHJcbiAgICBleHBlY3QoIGlucHV0Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSkudG8uYmUodHJ1ZSk7XHJcbiAgICBleHBlY3QoIGlucHV0LmdldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcpKS50by5iZSgndHJ1ZScpO1xyXG4gICAgLy9leHBlY3QoIGlucHV0LmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKSkudG8uYmUoJycpO1xyXG5cclxuICAgIHRyaWdnZXIuY2xpY2soZmluZFRhZyhzZWxlY3QsICdidXR0b24nKS5nZXRET01Ob2RlKCkpXHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgZXhwZWN0KHNlbGVjdC5zdGF0ZS5vcGVuKS50by5ub3QuYmUodHJ1ZSlcclxuICAgICAgZXhwZWN0KHRhZ3MuY2hpbGRyZW4ubGVuZ3RoKS50by5iZSgxKVxyXG4gICAgICBleHBlY3Qoc2VsZWN0LmdldERPTU5vZGUoKS5jbGFzc05hbWUpLnRvLm5vdC5tYXRjaCgvXFxicnctc3RhdGUtZm9jdXNcXGIvKVxyXG4gICAgICBkb25lKClcclxuICAgIH0sIDApXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCBkaXNhYmxlIG9ubHkgY2VydGFpbiB0YWdzJywgZnVuY3Rpb24oZG9uZSl7XHJcbiAgICB2YXIgc2VsZWN0ID0gcmVuZGVyKDxTZWxlY3QgZGVmYXVsdFZhbHVlPXtbMCwxXX0gZGF0YT17ZGF0YUxpc3R9IGRpc2FibGVkPXtbMV19ICB0ZXh0RmllbGQ9J2xhYmVsJyB2YWx1ZUZpZWxkPSdpZCcvPilcclxuICAgICAgLCB0YWdzICAgPSBmaW5kVHlwZShzZWxlY3QsIFRhZ0xpc3QpLmdldERPTU5vZGUoKTtcclxuXHJcbiAgICBleHBlY3QodGFncy5jaGlsZHJlbi5sZW5ndGgpLnRvLmJlKDIpXHJcbiAgICBleHBlY3QodGFncy5jaGlsZHJlblsxXS5jbGFzc05hbWUpLnRvLm1hdGNoKC9cXGJydy1zdGF0ZS1kaXNhYmxlZFxcYi8pO1xyXG5cclxuICAgIHRyaWdnZXIuY2xpY2sodGFncy5jaGlsZHJlblsxXS5jaGlsZHJlblsxXSkgLy8gY2xpY2sgYnV0dG9uXHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgZXhwZWN0KHRhZ3MuY2hpbGRyZW4ubGVuZ3RoKS50by5iZSgyKVxyXG4gICAgICBkb25lKClcclxuICAgIH0sIDApXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCBkbyBub3RoaW5nIHdoZW4gcmVhZG9ubHknLCBmdW5jdGlvbihkb25lKXtcclxuICAgIHZhciBzZWxlY3QgPSByZW5kZXIoPFNlbGVjdCBkZWZhdWx0VmFsdWU9e1snamltbXknXX0gZGF0YT17ZGF0YUxpc3R9IGR1cmF0aW9uPXswfSByZWFkT25seT17dHJ1ZX0vPilcclxuICAgICAgLCBpbnB1dCAgPSBmaW5kVHlwZShzZWxlY3QsIHJlcXVpcmUoJy4uL3NyYy9NdWx0aXNlbGVjdElucHV0LmpzeCcpKS5nZXRET01Ob2RlKClcclxuICAgICAgLCB0YWdzICAgPSBmaW5kVHlwZShzZWxlY3QsIFRhZ0xpc3QpLmdldERPTU5vZGUoKTtcclxuXHJcbiAgICBleHBlY3QoIGlucHV0Lmhhc0F0dHJpYnV0ZSgncmVhZG9ubHknKSkudG8uYmUodHJ1ZSk7XHJcbiAgICBleHBlY3QoIGlucHV0LmdldEF0dHJpYnV0ZSgnYXJpYS1yZWFkb25seScpKS50by5iZSgndHJ1ZScpO1xyXG5cclxuICAgIHRyaWdnZXIuY2xpY2soZmluZFRhZyhzZWxlY3QsICdidXR0b24nKS5nZXRET01Ob2RlKCkpXHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgZXhwZWN0KHNlbGVjdC5zdGF0ZS5vcGVuKS50by5ub3QuYmUodHJ1ZSlcclxuICAgICAgZXhwZWN0KHRhZ3MuY2hpbGRyZW4ubGVuZ3RoKS50by5iZSgxKVxyXG4gICAgICBkb25lKClcclxuICAgIH0sIDApXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCByZWFkb25seSBvbmx5IGNlcnRhaW4gdGFncycsIGZ1bmN0aW9uKGRvbmUpe1xyXG4gICAgdmFyIHNlbGVjdCA9IHJlbmRlcig8U2VsZWN0IGRlZmF1bHRWYWx1ZT17WzAsMV19IGRhdGE9e2RhdGFMaXN0fSByZWFkT25seT17WzFdfSAgdGV4dEZpZWxkPSdsYWJlbCcgdmFsdWVGaWVsZD0naWQnLz4pXHJcbiAgICAgICwgdGFncyAgID0gZmluZFR5cGUoc2VsZWN0LCBUYWdMaXN0KS5nZXRET01Ob2RlKCk7XHJcblxyXG4gICAgZXhwZWN0KHRhZ3MuY2hpbGRyZW4ubGVuZ3RoKS50by5iZSgyKVxyXG4gICAgZXhwZWN0KHRhZ3MuY2hpbGRyZW5bMV0uY2xhc3NOYW1lKS50by5tYXRjaCgvXFxicnctc3RhdGUtcmVhZG9ubHlcXGIvKTtcclxuXHJcbiAgICB0cmlnZ2VyLmNsaWNrKHRhZ3MuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMV0pIC8vIGNsaWNrIGJ1dHRvblxyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGV4cGVjdCh0YWdzLmNoaWxkcmVuLmxlbmd0aCkudG8uYmUoMilcclxuICAgICAgZG9uZSgpXHJcbiAgICB9KVxyXG4gIH0pXHJcblxyXG4gIGl0KCdzaG91bGQgY2FsbCBTZWxlY3QgaGFuZGxlcicsIGZ1bmN0aW9uKGRvbmUpe1xyXG4gICAgdmFyIGNoYW5nZSA9IHNpbm9uLnNweSgpLCBzZWxlY3QgPSBzaW5vbi5zcHkoKVxyXG4gICAgICAsIG1zID0gcmVuZGVyKDxTZWxlY3QgdmFsdWU9e1tkYXRhTGlzdFsxXV19IGRhdGE9e2RhdGFMaXN0fSBvbkNoYW5nZT17Y2hhbmdlfSBvblNlbGVjdD17c2VsZWN0fS8+KVxyXG4gICAgICAsIGxpc3QgPSBmaW5kQ2xhc3MobXMsICdydy1saXN0Jyk7XHJcblxyXG4gICAgbXMuZ2V0RE9NTm9kZSgpLmZvY3VzKClcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICB0cmlnZ2VyLmNsaWNrKGxpc3QuZ2V0RE9NTm9kZSgpLmNoaWxkcmVuWzBdKVxyXG5cclxuICAgICAgZXhwZWN0KHNlbGVjdC5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgICBleHBlY3QoY2hhbmdlLmNhbGxlZEFmdGVyKHNlbGVjdCkpLnRvLmJlKHRydWUpXHJcbiAgICAgIFxyXG4gICAgICBzZWxlY3QucmVzZXQoKVxyXG4gICAgICBjaGFuZ2UucmVzZXQoKVxyXG5cclxuICAgICAgdHJpZ2dlci5rZXlEb3duKG1zLmdldERPTU5vZGUoKSwgeyBrZXk6ICdBcnJvd0Rvd24nfSkgLy9tb3ZlIHRvIGRpZmZlcmVudCB2YWx1ZSBzbyBjaGFuZ2UgZmlyZXNcclxuICAgICAgdHJpZ2dlci5rZXlEb3duKG1zLmdldERPTU5vZGUoKSwgeyBrZXk6ICdFbnRlcid9KVxyXG4gICAgICBcclxuICAgICAgZXhwZWN0KHNlbGVjdC5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgICBleHBlY3QoY2hhbmdlLmNhbGxlZEFmdGVyKHNlbGVjdCkpLnRvLmJlKHRydWUpXHJcbiAgICAgIGRvbmUoKVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGNsZWFyIFNlYXJjaFRlcm0gd2hlbiB1bmNvbnRyb2xsZWQnLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIG1zID0gcmVuZGVyKDxTZWxlY3QgZGF0YT17ZGF0YUxpc3R9IGRlZmF1bHRTZWFyY2hUZXJtPSdqaScgb3BlbiB0ZXh0RmllbGQ9J2xhYmVsJyB2YWx1ZUZpZWxkPSdpZCcgb25Ub2dnbGU9eygpPT57fX0vPik7XHJcblxyXG4gICAgdmFyIGlucHV0ID0gZmluZFR5cGUobXMsIFNlbGVjdC5CYXNlTXVsdGlzZWxlY3QpXHJcblxyXG4gICAgZXhwZWN0KGlucHV0LnByb3BzLnNlYXJjaFRlcm0pLnRvLmJlKCdqaScpXHJcblxyXG4gICAgdHJpZ2dlci5rZXlEb3duKG1zLmdldERPTU5vZGUoKSwgeyBrZXk6ICdFbnRlcid9KVxyXG5cclxuICAgIGV4cGVjdChpbnB1dC5wcm9wcy5zZWFyY2hUZXJtKS50by5iZSgnJylcclxuXHJcbiAgfSlcclxuXHJcblxyXG4gIGl0KCdzaG91bGQgbm90IGNsZWFyIFNlYXJjaFRlcm0gd2hlbiBjb250cm9sbGVkJywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBtcyA9IHJlbmRlcig8U2VsZWN0IHNlYXJjaFRlcm09XCJqaW1cIiBkYXRhPXtkYXRhTGlzdH0gb25TZWFyY2g9eygpPT57fX0vPik7XHJcblxyXG4gICAgdmFyIGlucHV0ID0gZmluZFRhZyhtcywgJ2lucHV0JykuZ2V0RE9NTm9kZSgpXHJcbiAgICB0cmlnZ2VyLmtleURvd24obXMuZ2V0RE9NTm9kZSgpLCB7IGtleTogJ0VudGVyJ30pXHJcblxyXG4gICAgZXhwZWN0KGlucHV0LnZhbHVlKS50by5iZSgnamltJylcclxuICB9KVxyXG5cclxuXHJcbiAgaXQoJ3Nob3VsZCBzaG93IGNyZWF0ZSB0YWcgY29ycmVjdGx5JywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBtcyA9IHJlbmRlcig8U2VsZWN0IHNlYXJjaFRlcm09XCJjdXN0b20gdGFnXCIgb25DcmVhdGU9eygpPT57fX0gZGF0YT17ZGF0YUxpc3R9IG9uU2VhcmNoPXsoKT0+e319Lz4pO1xyXG5cclxuICAgIGV4cGVjdChmdW5jdGlvbiBlcnIoKSB7XHJcbiAgICAgIGZpbmRDbGFzcyhtcywgJ3J3LW11bHRpc2VsZWN0LWNyZWF0ZS10YWcnKSB9KS50by5ub3QudGhyb3dFeGNlcHRpb24oKVxyXG5cclxuICAgIG1zLnNldFByb3BzKHsgc2VhcmNoVGVybTogJycgfSlcclxuXHJcbiAgICBleHBlY3QoZnVuY3Rpb24gZXJyKCkge1xyXG4gICAgICBmaW5kQ2xhc3MobXMsICdydy1tdWx0aXNlbGVjdC1jcmVhdGUtdGFnJykgfSkudG8udGhyb3dFeGNlcHRpb24oKVxyXG5cclxuICAgIG1zLnNldFByb3BzKHsgb25DcmVhdGU6IG51bGwgfSkgXHJcblxyXG4gICAgZXhwZWN0KGZ1bmN0aW9uIGVycigpIHtcclxuICAgICAgZmluZENsYXNzKG1zLCAncnctbXVsdGlzZWxlY3QtY3JlYXRlLXRhZycpIH0pLnRvLnRocm93RXhjZXB0aW9uKClcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGNhbGwgb25DcmVhdGUnLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGNyZWF0ZSA9IHNpbm9uLnNweSgpXHJcbiAgICAgICwgbXMgPSByZW5kZXIoPFNlbGVjdCBcclxuICAgICAgICAgIG9wZW49e3RydWV9IFxyXG4gICAgICAgICAgc2VhcmNoVGVybT1cImN1c3RvbSB0YWdcIiBcclxuICAgICAgICAgIGRhdGE9e2RhdGFMaXN0fSBcclxuICAgICAgICAgIG9uQ3JlYXRlPXtjcmVhdGV9IFxyXG4gICAgICAgICAgb25TZWFyY2g9eygpPT57fX0gb25Ub2dnbGU9eygpPT57fX0vPilcclxuXHJcbiAgICAgICwgY3JlYXRlTGkgPSBmaW5kQ2xhc3MobXMsICdydy1tdWx0aXNlbGVjdC1jcmVhdGUtdGFnJykuZ2V0RE9NTm9kZSgpLmNoaWxkcmVuWzBdO1xyXG5cclxuICAgIHRyaWdnZXIuY2xpY2soY3JlYXRlTGkpXHJcblxyXG4gICAgZXhwZWN0KGNyZWF0ZS5jYWxsZWRPbmNlKS50by5vaygpXHJcbiAgICBleHBlY3QoY3JlYXRlLmNhbGxlZFdpdGgoXCJjdXN0b20gdGFnXCIpKS50by5vaygpXHJcblxyXG4gICAgLy8gb25seSBvcHRpb24gaXMgY3JlYXRlXHJcbiAgICBjcmVhdGUucmVzZXQoKVxyXG4gICAgdHJpZ2dlci5rZXlEb3duKG1zLmdldERPTU5vZGUoKSwgeyBrZXk6ICdFbnRlcid9KVxyXG5cclxuICAgIGV4cGVjdChjcmVhdGUuY2FsbGVkT25jZSkudG8ub2soKVxyXG4gICAgZXhwZWN0KGNyZWF0ZS5jYWxsZWRXaXRoKFwiY3VzdG9tIHRhZ1wiKSkudG8ub2soKVxyXG5cclxuICAgIC8vIG90aGVyIHZhbHVlcyBoYXZlIGZvY3VzXHJcbiAgICBtcyA9IHJlbmRlcig8U2VsZWN0IG9wZW49e3RydWV9IHNlYXJjaFRlcm09XCJjdXN0b20gdGFnXCIgZGF0YT17WydjdXN0b20gdGFnIHRpbWUnXX0gIG9uQ3JlYXRlPXtjcmVhdGV9IG9uU2VhcmNoPXsoKT0+e319IG9uVG9nZ2xlPXsoKT0+e319Lz4pXHJcbiAgICBjcmVhdGUucmVzZXQoKVxyXG4gICAgdHJpZ2dlci5rZXlEb3duKG1zLmdldERPTU5vZGUoKSwgeyBrZXk6ICdFbnRlcid9KVxyXG5cclxuICAgIGV4cGVjdChjcmVhdGUuY2FsbGVkKS50by5iZShmYWxzZSlcclxuXHJcbiAgICB0cmlnZ2VyLmtleURvd24obXMuZ2V0RE9NTm9kZSgpLCB7IGtleTogJ0VudGVyJywgY3RybEtleTogdHJ1ZSB9KVxyXG5cclxuICAgIGV4cGVjdChjcmVhdGUuY2FsbGVkT25jZSkudG8ub2soKVxyXG4gICAgZXhwZWN0KGNyZWF0ZS5jYWxsZWRXaXRoKFwiY3VzdG9tIHRhZ1wiKSkudG8ub2soKVxyXG4gIH0pXHJcblxyXG4gIGl0KCdzaG91bGQgY2hhbmdlIHZhbHVlcyBvbiBrZXkgZG93bicsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgY2hhbmdlID0gc2lub24uc3B5KClcclxuICAgICAgLCBzZWxlY3QgPSByZW5kZXIoPFNlbGVjdCB2YWx1ZT17WzAsMSwyXX0gZGF0YT17ZGF0YUxpc3R9IHRleHRGaWVsZD0nbGFiZWwnIHZhbHVlRmllbGQ9J2lkJyBvbkNoYW5nZT17Y2hhbmdlfS8+KVxyXG4gICAgICAsIHRhZ3MgICA9IGZpbmRUeXBlKHNlbGVjdCwgVGFnTGlzdCkuZ2V0RE9NTm9kZSgpXHJcbiAgICAgICwgbGlzdCAgID0gZmluZENsYXNzKHNlbGVjdCwgJ3J3LWxpc3QnKS5nZXRET01Ob2RlKCk7XHJcblxyXG5cclxuICAgIHRyaWdnZXIua2V5RG93bihzZWxlY3QuZ2V0RE9NTm9kZSgpLCB7IGtleTogJ0Fycm93TGVmdCd9KVxyXG5cclxuXHJcbiAgICBleHBlY3QodGFncy5jaGlsZHJlblsyXS5jbGFzc05hbWUpLnRvLm1hdGNoKC9cXGJydy1zdGF0ZS1mb2N1c1xcYi8pXHJcbiAgICBleHBlY3QodGFncy5jaGlsZHJlblsxXS5jbGFzc05hbWUpLnRvLm5vdC5tYXRjaCgvXFxicnctc3RhdGUtZm9jdXNcXGIvKVxyXG5cclxuICAgIHRyaWdnZXIua2V5RG93bihzZWxlY3QuZ2V0RE9NTm9kZSgpLCB7IGtleTogJ0Fycm93TGVmdCd9KVxyXG5cclxuICAgIGV4cGVjdCh0YWdzLmNoaWxkcmVuWzFdLmNsYXNzTmFtZSkudG8ubWF0Y2goL1xcYnJ3LXN0YXRlLWZvY3VzXFxiLylcclxuICAgIGV4cGVjdCh0YWdzLmNoaWxkcmVuWzJdLmNsYXNzTmFtZSkudG8ubm90Lm1hdGNoKC9cXGJydy1zdGF0ZS1mb2N1c1xcYi8pXHJcblxyXG4gICAgdHJpZ2dlci5rZXlEb3duKHNlbGVjdC5nZXRET01Ob2RlKCksIHsga2V5OiAnQXJyb3dSaWdodCd9KVxyXG5cclxuICAgIGV4cGVjdCh0YWdzLmNoaWxkcmVuWzJdLmNsYXNzTmFtZSkudG8ubWF0Y2goL1xcYnJ3LXN0YXRlLWZvY3VzXFxiLylcclxuICAgIGV4cGVjdCh0YWdzLmNoaWxkcmVuWzFdLmNsYXNzTmFtZSkudG8ubm90Lm1hdGNoKC9cXGJydy1zdGF0ZS1mb2N1c1xcYi8pXHJcblxyXG4gICAgdHJpZ2dlci5rZXlEb3duKHNlbGVjdC5nZXRET01Ob2RlKCksIHsga2V5OiAnSG9tZSd9KVxyXG5cclxuICAgIGV4cGVjdCh0YWdzLmNoaWxkcmVuWzBdLmNsYXNzTmFtZSkudG8ubWF0Y2goL1xcYnJ3LXN0YXRlLWZvY3VzXFxiLylcclxuICAgIGV4cGVjdCh0YWdzLmNoaWxkcmVuWzFdLmNsYXNzTmFtZSkudG8ubm90Lm1hdGNoKC9cXGJydy1zdGF0ZS1mb2N1c1xcYi8pXHJcblxyXG4gICAgdHJpZ2dlci5rZXlEb3duKHNlbGVjdC5nZXRET01Ob2RlKCksIHsga2V5OiAnRGVsZXRlJ30pXHJcblxyXG4gICAgZXhwZWN0KGNoYW5nZS5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KGNoYW5nZS5hcmdzWzBdWzBdKS50by5lcWwoZGF0YUxpc3Quc2xpY2UoMSwgMykpXHJcbiAgICBjaGFuZ2UucmVzZXQoKVxyXG5cclxuICAgIHRyaWdnZXIua2V5RG93bihzZWxlY3QuZ2V0RE9NTm9kZSgpLCB7IGtleTogJ0VuZCd9KVxyXG5cclxuICAgIGV4cGVjdCh0YWdzLmNoaWxkcmVuWzJdLmNsYXNzTmFtZSkudG8ubWF0Y2goL1xcYnJ3LXN0YXRlLWZvY3VzXFxiLylcclxuICAgIGV4cGVjdCh0YWdzLmNoaWxkcmVuWzFdLmNsYXNzTmFtZSkudG8ubm90Lm1hdGNoKC9cXGJydy1zdGF0ZS1mb2N1c1xcYi8pXHJcblxyXG4gICAgdHJpZ2dlci5rZXlEb3duKHNlbGVjdC5nZXRET01Ob2RlKCksIHsga2V5OiAnQmFja3NwYWNlJ30pXHJcblxyXG4gICAgZXhwZWN0KGNoYW5nZS5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KGNoYW5nZS5hcmdzWzBdWzBdKS50by5lcWwoZGF0YUxpc3Quc2xpY2UoMCwgMikpXHJcbiAgICBjaGFuZ2UucmVzZXQoKVxyXG5cclxuICAgIHRyaWdnZXIua2V5RG93bihzZWxlY3QuZ2V0RE9NTm9kZSgpLCB7IGtleTogJ0Fycm93RG93bid9KVxyXG4gICAgZXhwZWN0KHNlbGVjdC5zdGF0ZS5vcGVuKS50by5iZSh0cnVlKVxyXG5cclxuICAgIHNlbGVjdC5zZXRQcm9wcyh7IG9wZW46IHRydWUsIHZhbHVlOltdLCBvblRvZ2dsZTogKCk9Pnt9IH0pXHJcblxyXG4gICAgdHJpZ2dlci5rZXlEb3duKHNlbGVjdC5nZXRET01Ob2RlKCksIHsga2V5OiAnQXJyb3dEb3duJ30pXHJcbiAgICBleHBlY3QobGlzdC5jaGlsZHJlblsxXS5jbGFzc05hbWUpLnRvLm1hdGNoKC9cXGJydy1zdGF0ZS1mb2N1c1xcYi8pXHJcblxyXG4gICAgdHJpZ2dlci5rZXlEb3duKHNlbGVjdC5nZXRET01Ob2RlKCksIHsga2V5OiAnRW5kJ30pXHJcbiAgICBleHBlY3QobGlzdC5jaGlsZHJlblsyXS5jbGFzc05hbWUpLnRvLm1hdGNoKC9cXGJydy1zdGF0ZS1mb2N1c1xcYi8pXHJcblxyXG4gICAgdHJpZ2dlci5rZXlEb3duKHNlbGVjdC5nZXRET01Ob2RlKCksIHsga2V5OiAnSG9tZSd9KVxyXG4gICAgZXhwZWN0KGxpc3QuY2hpbGRyZW5bMF0uY2xhc3NOYW1lKS50by5tYXRjaCgvXFxicnctc3RhdGUtZm9jdXNcXGIvKVxyXG4gIH0pXHJcblxyXG59KVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvdGVzdC9tdWx0aXNlbGVjdC5icm93c2VyLmpzeFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLypnbG9iYWwgaXQsIGRlc2NyaWJlLCBleHBlY3QsIHNpbm9uKi9cclxucmVxdWlyZSgnLi4vdmVuZG9yL3BoYW50b21qcy1zaGltJylcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2FkZG9ucycpO1xyXG52YXIgTnVtYmVyUGlja2VyID0gcmVxdWlyZSgnLi4vc3JjL051bWJlclBpY2tlci5qc3gnKTtcclxuXHJcbi8vY29uc29sZS5sb2coc2lub24pXHJcbnZhciBUZXN0VXRpbHMgPSBSZWFjdC5hZGRvbnMuVGVzdFV0aWxzXHJcbiAgLCByZW5kZXIgPSBUZXN0VXRpbHMucmVuZGVySW50b0RvY3VtZW50XHJcbiAgLCBmaW5kVGFnID0gVGVzdFV0aWxzLmZpbmRSZW5kZXJlZERPTUNvbXBvbmVudFdpdGhUYWdcclxuICAsIGZpbmRDbGFzcyA9IFRlc3RVdGlscy5maW5kUmVuZGVyZWRET01Db21wb25lbnRXaXRoQ2xhc3NcclxuICAsIGZpbmRBbGxUYWcgPSBUZXN0VXRpbHMuc2NyeVJlbmRlcmVkRE9NQ29tcG9uZW50c1dpdGhUYWdcclxuICAsIGZpbmRBbGxDbGFzcyA9IFRlc3RVdGlscy5zY3J5UmVuZGVyZWRET01Db21wb25lbnRzV2l0aENsYXNzXHJcbiAgLCBmaW5kVHlwZSA9IFRlc3RVdGlscy5maW5kUmVuZGVyZWRDb21wb25lbnRXaXRoVHlwZVxyXG4gICwgZmluZEFsbFR5cGUgPSBUZXN0VXRpbHMuc2NyeVJlbmRlcmVkQ29tcG9uZW50V2l0aFR5cGVcclxuICAsIHRyaWdnZXIgPSBUZXN0VXRpbHMuU2ltdWxhdGU7XHJcblxyXG5kZXNjcmliZSgnTnVtYmVycGlja2VyJywgZnVuY3Rpb24oKXtcclxuXHJcblxyXG4gIGl0KCdzaG91bGQgc2V0IHZhbHVlcyBjb3JyZWN0bHknLCBmdW5jdGlvbihkb25lKXtcclxuICAgIHZhciBwaWNrZXIgPSByZW5kZXIoPE51bWJlclBpY2tlciB2YWx1ZT17MTV9IGZvcm1hdD0nRCcgb25DaGFuZ2U9eygpPT57fX0gLz4pXHJcbiAgICAgICwgaW5wdXQgID0gZmluZENsYXNzKHBpY2tlciwgJ3J3LWlucHV0JykuZ2V0RE9NTm9kZSgpO1xyXG5cclxuICAgIGV4cGVjdChpbnB1dC52YWx1ZSkudG8uYmUoJzE1Jyk7XHJcblxyXG4gICAgcGlja2VyLnNldFByb3BzKHsgdmFsdWU6IG51bGwgfSwgZnVuY3Rpb24oKXtcclxuICAgICAgZXhwZWN0KGlucHV0LnZhbHVlKS50by5iZSgnJyk7XHJcblxyXG4gICAgICBwaWNrZXIuc2V0UHJvcHMoeyB2YWx1ZTogbnVsbCwgbWluOiAxMCB9LCBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vb25seSBhbGxvdyBudWxsIHdoZW4gbWluIGlzIG5vdCBzZXRcclxuICAgICAgICBleHBlY3QoaW5wdXQudmFsdWUpLnRvLmJlKCcxMCcpO1xyXG5cclxuICAgICAgICBwaWNrZXIuc2V0UHJvcHMoeyB2YWx1ZTogMjAsIG1heDogMTAgfSwgZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGV4cGVjdChpbnB1dC52YWx1ZSkudG8uYmUoJzEwJyk7XHJcblxyXG4gICAgICAgICAgcGlja2VyLnNldFByb3BzKHsgdmFsdWU6IDEwLCBmb3JtYXQ6ICdjJyB9LCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBleHBlY3QoaW5wdXQudmFsdWUpLnRvLmJlKCckMTAuMDAnKTtcclxuICAgICAgICAgICAgZG9uZSgpXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH0pXHJcblxyXG4gIGl0KCdzaG91bGQgcGFzcyBOQU1FIGRvd24nLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHBpY2tlciA9IHJlbmRlcig8TnVtYmVyUGlja2VyIHZhbHVlPXsxNX0gZm9ybWF0PSdEJyBvbkNoYW5nZT17KCk9Pnt9fSBuYW1lPSdoZWxsbycvPilcclxuICAgICAgLCBpbnB1dCAgPSBmaW5kQ2xhc3MocGlja2VyLCAncnctaW5wdXQnKS5nZXRET01Ob2RlKCk7XHJcblxyXG4gICAgZXhwZWN0KGlucHV0Lmhhc0F0dHJpYnV0ZSgnbmFtZScpKS50by5iZSh0cnVlKVxyXG4gIH0pXHJcblxyXG4gIGl0KCdzaG91bGQgbm90IGZpcmUgY2hhbmdlIHVudGlsIHRoZXJlIGlzIGEgdmFsaWQgdmFsdWUnLCBmdW5jdGlvbihkb25lKXtcclxuICAgIHZhciBjaGFuZ2UgPSBzaW5vbi5zcHkoKVxyXG4gICAgICAsIHBpY2tlciA9IHJlbmRlcig8TnVtYmVyUGlja2VyIHZhbHVlPXsxNTB9IGZvcm1hdD0nRCcgbWluPXsxMDB9IG9uQ2hhbmdlPXtjaGFuZ2V9IC8+KVxyXG4gICAgICAsIGlucHV0ICA9IGZpbmRDbGFzcyhwaWNrZXIsICdydy1pbnB1dCcpLmdldERPTU5vZGUoKTtcclxuXHJcbiAgICBpbnB1dC52YWx1ZSA9ICcxNSdcclxuICAgIHRyaWdnZXIuY2hhbmdlKGlucHV0KVxyXG5cclxuICAgIGV4cGVjdChjaGFuZ2UuY2FsbGVkKS50by5iZShmYWxzZSk7XHJcbiAgICBleHBlY3QoaW5wdXQudmFsdWUpLnRvLmJlKCcxNScpO1xyXG5cclxuICAgIGlucHV0LnZhbHVlID0gJzE1NCdcclxuICAgIHRyaWdnZXIuY2hhbmdlKGlucHV0KVxyXG4gICAgZXhwZWN0KGNoYW5nZS5jYWxsZWRPbmNlKS50by5iZSh0cnVlKTtcclxuXHJcbiAgICAvL3Nob3VsZCBjYWxsIGNoYW5nZSBvbiBhIG51bGwgdmFsdWUgd2hlbiBubyBtaW5cclxuICAgIGNoYW5nZS5yZXNldCgpXHJcbiAgICBwaWNrZXIuc2V0UHJvcHMoeyB2YWx1ZTogMTUsIG1pbjogLUluZmluaXR5IH0sIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICBpbnB1dC52YWx1ZSA9ICcnXHJcbiAgICAgIHRyaWdnZXIuY2hhbmdlKGlucHV0KVxyXG4gICAgICBleHBlY3QoY2hhbmdlLmNhbGxlZE9uY2UpLnRvLmJlKHRydWUpXHJcbiAgICAgIGRvbmUoKVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGNoYW5nZSB2YWx1ZSB3aGVuIHNwaW5uZXIgaXMgY2xpY2tlZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgY2hhbmdlID0gc2lub24uc3B5KClcclxuICAgICAgLCBwaWNrZXIgPSByZW5kZXIoPE51bWJlclBpY2tlciB2YWx1ZT17MX0gZm9ybWF0PSdEJyBvbkNoYW5nZT17Y2hhbmdlfSAvPilcclxuICAgICAgLCB1cEJ0biAgPSBmaW5kQ2xhc3MocGlja2VyLCAncnctc2VsZWN0JykuZ2V0RE9NTm9kZSgpLmNoaWxkcmVuWzBdXHJcbiAgICAgICwgZHduQnRuICA9IGZpbmRDbGFzcyhwaWNrZXIsICdydy1zZWxlY3QnKS5nZXRET01Ob2RlKCkuY2hpbGRyZW5bMV1cclxuICAgICAgLCBpbnB1dCAgPSBmaW5kQ2xhc3MocGlja2VyLCAncnctaW5wdXQnKS5nZXRET01Ob2RlKCk7XHJcblxyXG4gICAgLy9pbmNyZW1lbnRcclxuICAgIGV4cGVjdChpbnB1dC52YWx1ZSkudG8uYmUoJzEnKVxyXG4gICAgdHJpZ2dlci5tb3VzZURvd24odXBCdG4pXHJcbiAgICB0cmlnZ2VyLm1vdXNlVXAodXBCdG4pXHJcblxyXG4gICAgZXhwZWN0KGNoYW5nZS5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KGNoYW5nZS5hcmdzWzBdWzBdKS50by5iZSgyKVxyXG5cclxuICAgIC8vZGVjcmVtZW50XHJcbiAgICB0cmlnZ2VyLm1vdXNlRG93bihkd25CdG4pXHJcbiAgICB0cmlnZ2VyLm1vdXNlVXAoZHduQnRuKVxyXG5cclxuICAgIGV4cGVjdChjaGFuZ2UuY2FsbGVkVHdpY2UpLnRvLmJlKHRydWUpXHJcbiAgICBleHBlY3QoY2hhbmdlLmFyZ3NbMV1bMF0pLnRvLmJlKDApXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCB0cmlnZ2VyIGZvY3VzL2JsdXIgZXZlbnRzJywgZnVuY3Rpb24oZG9uZSl7XHJcbiAgICB2YXIgYmx1ciA9IHNpbm9uLnNweSgpXHJcbiAgICAgICwgZm9jdXMgPSBzaW5vbi5zcHkoKVxyXG4gICAgICAsIHBpY2tlciA9IHJlbmRlcig8TnVtYmVyUGlja2VyIG9uQmx1cj17Ymx1cn0gb25Gb2N1cz17Zm9jdXN9Lz4pO1xyXG5cclxuICAgIGV4cGVjdChmb2N1cy5jYWxsZWRPbmNlKS50by5iZShmYWxzZSlcclxuICAgIGV4cGVjdChibHVyLmNhbGxlZE9uY2UpLnRvLmJlKGZhbHNlKVxyXG5cclxuICAgIHRyaWdnZXIuZm9jdXMocGlja2VyLmdldERPTU5vZGUoKSlcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgZXhwZWN0KGZvY3VzLmNhbGxlZE9uY2UpLnRvLmJlKHRydWUpXHJcbiAgICAgIHRyaWdnZXIuYmx1cihwaWNrZXIuZ2V0RE9NTm9kZSgpKVxyXG5cclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZXhwZWN0KGJsdXIuY2FsbGVkT25jZSkudG8uYmUodHJ1ZSlcclxuICAgICAgICBkb25lKClcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCB0cmlnZ2VyIGtleSBldmVudHMnLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGtwID0gc2lub24uc3B5KCksIGtkID0gc2lub24uc3B5KCksIGt1ID0gc2lub24uc3B5KClcclxuICAgICAgLCBwaWNrZXIgPSByZW5kZXIoPE51bWJlclBpY2tlciBvbktleVByZXNzPXtrcH0gb25LZXlVcD17a3V9IG9uS2V5RG93bj17a2R9Lz4pXHJcbiAgICAgICwgaW5wdXQgID0gZmluZENsYXNzKHBpY2tlciwgJ3J3LWlucHV0JykuZ2V0RE9NTm9kZSgpO1xyXG5cclxuICAgIHRyaWdnZXIua2V5UHJlc3MoaW5wdXQpXHJcbiAgICB0cmlnZ2VyLmtleURvd24oaW5wdXQpXHJcbiAgICB0cmlnZ2VyLmtleVVwKGlucHV0KVxyXG5cclxuICAgIGV4cGVjdChrcC5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KGtkLmNhbGxlZE9uY2UpLnRvLmJlKHRydWUpXHJcbiAgICBleHBlY3Qoa3UuY2FsbGVkT25jZSkudG8uYmUodHJ1ZSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGRvIG5vdGhpbmcgd2hlbiBkaXNhYmxlZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgY2hhbmdlID0gc2lub24uc3B5KClcclxuICAgICAgLCBwaWNrZXIgPSByZW5kZXIoPE51bWJlclBpY2tlciB2YWx1ZT17MH0gZGlzYWJsZWQ9e3RydWV9IG9uQ2hhbmdlPXtjaGFuZ2V9IC8+KVxyXG4gICAgICAsIGlucHV0ICA9IGZpbmRDbGFzcyhwaWNrZXIsICdydy1pbnB1dCcpLmdldERPTU5vZGUoKVxyXG4gICAgICAsIHVwQnRuICA9IGZpbmRDbGFzcyhwaWNrZXIsICdydy1zZWxlY3QnKS5nZXRET01Ob2RlKCkuY2hpbGRyZW5bMF1cclxuICAgICAgLCBkd25CdG4gPSBmaW5kQ2xhc3MocGlja2VyLCAncnctc2VsZWN0JykuZ2V0RE9NTm9kZSgpLmNoaWxkcmVuWzFdO1xyXG5cclxuICAgIHRyaWdnZXIuZm9jdXMoaW5wdXQpXHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICBleHBlY3QocGlja2VyLmdldERPTU5vZGUoKS5jbGFzc05hbWUpLnRvLm5vdC5tYXRjaCgvXFxicnctc3RhdGUtZm9jdXNcXGIvKVxyXG4gICAgICBleHBlY3QocGlja2VyLmdldERPTU5vZGUoKS5jbGFzc05hbWUpLnRvLm1hdGNoKC9cXGJydy1zdGF0ZS1kaXNhYmxlZFxcYi8pXHJcbiAgICAgIGV4cGVjdChpbnB1dC5oYXNBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnKSkudG8uYmUodHJ1ZSlcclxuICAgICAgZXhwZWN0KGlucHV0LmdldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcpKS50by5iZSgndHJ1ZScpXHJcblxyXG4gICAgICB0cmlnZ2VyLm1vdXNlRG93bih1cEJ0bilcclxuICAgICAgdHJpZ2dlci5tb3VzZURvd24oZHduQnRuKVxyXG4gICAgICBleHBlY3QoY2hhbmdlLmNhbGxlZCkudG8uYmUoZmFsc2UpXHJcbiAgICB9LCAwKVxyXG4gIH0pXHJcblxyXG4gIGl0KCdzaG91bGQgZG8gbm90aGluZyB3aGVuIHJlYWRvbmx5JywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBjaGFuZ2UgPSBzaW5vbi5zcHkoKVxyXG4gICAgICAsIHBpY2tlciA9IHJlbmRlcig8TnVtYmVyUGlja2VyIHZhbHVlPXswfSByZWFkT25seT17dHJ1ZX0gb25DaGFuZ2U9e2NoYW5nZX0gLz4pXHJcbiAgICAgICwgaW5wdXQgID0gZmluZENsYXNzKHBpY2tlciwgJ3J3LWlucHV0JykuZ2V0RE9NTm9kZSgpXHJcbiAgICAgICwgdXBCdG4gID0gZmluZENsYXNzKHBpY2tlciwgJ3J3LXNlbGVjdCcpLmdldERPTU5vZGUoKS5jaGlsZHJlblswXVxyXG4gICAgICAsIGR3bkJ0biA9IGZpbmRDbGFzcyhwaWNrZXIsICdydy1zZWxlY3QnKS5nZXRET01Ob2RlKCkuY2hpbGRyZW5bMV07XHJcblxyXG4gICAgdHJpZ2dlci5mb2N1cyhpbnB1dClcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIGV4cGVjdChwaWNrZXIuZ2V0RE9NTm9kZSgpLmNsYXNzTmFtZSkudG8ubWF0Y2goL1xcYnJ3LXN0YXRlLWZvY3VzXFxiLylcclxuICAgICAgZXhwZWN0KHBpY2tlci5nZXRET01Ob2RlKCkuY2xhc3NOYW1lKS50by5tYXRjaCgvXFxicnctc3RhdGUtcmVhZG9ubHlcXGIvKVxyXG4gICAgICBleHBlY3QoaW5wdXQuaGFzQXR0cmlidXRlKCdhcmlhLXJlYWRvbmx5JykpLnRvLmJlKHRydWUpXHJcbiAgICAgIGV4cGVjdChpbnB1dC5nZXRBdHRyaWJ1dGUoJ2FyaWEtcmVhZG9ubHknKSkudG8uYmUoJ3RydWUnKVxyXG5cclxuICAgICAgdHJpZ2dlci5tb3VzZURvd24odXBCdG4pXHJcbiAgICAgIHRyaWdnZXIubW91c2VEb3duKGR3bkJ0bilcclxuICAgICAgZXhwZWN0KGNoYW5nZS5jYWxsZWQpLnRvLmJlKGZhbHNlKVxyXG4gICAgfSwgMClcclxuXHJcbiAgfSlcclxuXHJcbiAgaXQoJ3Nob3VsZCBjaGFuZ2UgdmFsdWVzIG9uIGtleSBkb3duJywgZnVuY3Rpb24oZG9uZSl7XHJcbiAgICB2YXIgY2hhbmdlID0gc2lub24uc3B5KClcclxuICAgICAgLCBwaWNrZXIgPSByZW5kZXIoPE51bWJlclBpY2tlciB2YWx1ZT17MTB9IG9uQ2hhbmdlPXtjaGFuZ2V9IC8+KVxyXG4gICAgICAsIGlucHV0ICA9IHBpY2tlci5nZXRET01Ob2RlKCk7XHJcblxyXG4gICAgdHJpZ2dlci5rZXlEb3duKGlucHV0LCB7IGtleTogJ0VuZCd9KVxyXG4gICAgdHJpZ2dlci5rZXlEb3duKGlucHV0LCB7IGtleTogJ0hvbWUnfSlcclxuICAgIGV4cGVjdChjaGFuZ2UuY2FsbGVkKS50by5iZShmYWxzZSlcclxuXHJcbiAgICB0cmlnZ2VyLmtleURvd24oaW5wdXQsIHsga2V5OiAnQXJyb3dEb3duJ30pXHJcbiAgICBleHBlY3QoY2hhbmdlLmNhbGxlZE9uY2UpLnRvLmJlKHRydWUpXHJcbiAgICBleHBlY3QoY2hhbmdlLmNhbGxlZFdpdGgoOSkpLnRvLmJlKHRydWUpXHJcblxyXG4gICAgY2hhbmdlLnJlc2V0KClcclxuXHJcbiAgICB0cmlnZ2VyLmtleURvd24oaW5wdXQsIHsga2V5OiAnQXJyb3dVcCd9KVxyXG4gICAgZXhwZWN0KGNoYW5nZS5jYWxsZWRPbmNlKS50by5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KGNoYW5nZS5jYWxsZWRXaXRoKDExKSkudG8uYmUodHJ1ZSlcclxuXHJcbiAgICBjaGFuZ2UucmVzZXQoKVxyXG5cclxuICAgIHBpY2tlci5zZXRQcm9wcyh7IG1pbjogNSwgbWF4OiAxNSB9LCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgdHJpZ2dlci5rZXlEb3duKGlucHV0LCB7IGtleTogJ0VuZCd9KVxyXG4gICAgICBleHBlY3QoY2hhbmdlLmNhbGxlZE9uY2UpLnRvLmJlKHRydWUpXHJcbiAgICAgIGV4cGVjdChjaGFuZ2UuY2FsbGVkV2l0aCgxNSkpLnRvLmJlKHRydWUpXHJcblxyXG4gICAgICBjaGFuZ2UucmVzZXQoKVxyXG5cclxuICAgICAgdHJpZ2dlci5rZXlEb3duKGlucHV0LCB7IGtleTogJ0hvbWUnfSlcclxuXHJcbiAgICAgIGV4cGVjdChjaGFuZ2UuY2FsbGVkT25jZSkudG8uYmUodHJ1ZSlcclxuICAgICAgZXhwZWN0KGNoYW5nZS5jYWxsZWRXaXRoKDUpKS50by5iZSh0cnVlKVxyXG5cclxuICAgICAgZG9uZSgpXHJcbiAgICB9KVxyXG4gIH0pXHJcbn0pXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy90ZXN0L251bWJlcnBpY2tlci5icm93c2VyLmpzeFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuLypnbG9iYWwgaXQsIGRlc2NyaWJlLCBleHBlY3QgKi9cclxuXHJcbnJlcXVpcmUoJy4uL3ZlbmRvci9waGFudG9tanMtc2hpbScpXHJcblxyXG5kZWxldGUgcmVxdWlyZS5jYWNoZVtyZXF1aXJlLnJlc29sdmUoJy4uL3NyYy91dGlsL18nKV1cclxuXHJcbnZhciBSZWFjdCAgID0gcmVxdWlyZSgncmVhY3QnKVxyXG4gICwgZmlsdGVycyA9IHJlcXVpcmUoJy4uL3NyYy91dGlsL2ZpbHRlcicpXHJcbiAgLCBfICAgICAgID0gcmVxdWlyZSgnLi4vc3JjL3V0aWwvXycpXHJcbiAgLCBwcm9wVHlwZXMgPSByZXF1aXJlKCcuLi9zcmMvdXRpbC9wcm9wVHlwZXMnKVxyXG4gICwgdmFsaWRhdGVMaXN0ID0gcmVxdWlyZSgnLi4vc3JjL3V0aWwvdmFsaWRhdGVMaXN0SW50ZXJmYWNlJyk7XHJcblxyXG5cclxuZGVzY3JpYmUoJ18gdXRpbHMnLCBmdW5jdGlvbigpe1xyXG5cclxuICBpdCgnc2hvdWxkIEVBQ0gnLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGNudCA9IDBcclxuICAgIF8uZWFjaChbMV0sICh2LCBpLCBhKSA9PiB7XHJcbiAgICAgIGV4cGVjdCh2KS5lcXVhbCgxKVxyXG4gICAgICBleHBlY3QoaSkuZXF1YWwoMClcclxuICAgICAgZXhwZWN0KGEpLmVxbChbMV0pXHJcbiAgICB9KVxyXG5cclxuICAgIF8uZWFjaCh7IGE6IDEsIGI6IDIsIGM6IDN9LCAoKSA9PiBjbnQrKylcclxuXHJcbiAgICBleHBlY3QoY250KS50by5lcXVhbCgzKVxyXG4gICAgY250ID0gMFxyXG4gICAgXy5lYWNoKFsxLDIsM10sICgpID0+IGNudCsrKVxyXG4gICAgZXhwZWN0KGNudCkudG8uZXF1YWwoMylcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIE9NSVQgYW5kIFBJQ0snLCBmdW5jdGlvbigpe1xyXG4gICAgZXhwZWN0KF8ub21pdCh7IGE6IDEsIGI6IDIsIGM6IDN9LCBbJ2InLCdjJ10pKS50by5lcWwoeyBhOiAxIH0pXHJcbiAgICBleHBlY3QoXy5waWNrKHsgYTogMSwgYjogMiwgYzogM30sIFsnYicsJ2MnXSkpLnRvLmVxbCh7IGI6IDIsIGM6IDMgfSlcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIEZJTkQnLCBmdW5jdGlvbigpe1xyXG4gICAgZXhwZWN0KF8uZmluZChbMSwyLDMsNCw1XSwgdiA9PiB2ID09PSAyKSkudG8uZXF1YWwoMilcclxuICAgIGV4cGVjdChfLmZpbmQoWzEsMiwzLDQsNV0sICh2LCBpKSA9PiBpID09PSAyKSkudG8uZXF1YWwoMylcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIFVOSVFVRUlEJywgZnVuY3Rpb24oKXtcclxuICAgIGV4cGVjdChfLnVuaXF1ZUlkKCdnZWxsb18nKSkudG8uZXF1YWwoJ2dlbGxvXycgKyAxKVxyXG4gICAgZXhwZWN0KF8udW5pcXVlSWQoJ2VsbG9fJykpLnRvLmVxdWFsKCdlbGxvXycgKyAyKVxyXG4gIH0pXHJcblxyXG4gIGl0KCdzaG91bGQgU0hBTExPVyBFUVVBTCcsIGZ1bmN0aW9uKCl7XHJcbiAgICBleHBlY3QoIF8uaXNTaGFsbG93RXF1YWwoMSwxKSApLnRvLmJlKHRydWUpXHJcbiAgICBleHBlY3QoIF8uaXNTaGFsbG93RXF1YWwoMSwnMScpICkudG8uYmUoZmFsc2UpXHJcbiAgICBleHBlY3QoIF8uaXNTaGFsbG93RXF1YWwoMSwgMS40KSApLnRvLmJlKGZhbHNlKVxyXG4gICAgZXhwZWN0KCBfLmlzU2hhbGxvd0VxdWFsKCdoaScsICdoaScpICkudG8uYmUodHJ1ZSlcclxuICAgIGV4cGVjdCggXy5pc1NoYWxsb3dFcXVhbCgnaGknLCAnaGl3JykgKS50by5iZShmYWxzZSlcclxuXHJcbiAgICBleHBlY3QoIF8uaXNTaGFsbG93RXF1YWwobnVsbCwgbnVsbCkgKS50by5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KCBfLmlzU2hhbGxvd0VxdWFsKG51bGwsIHVuZGVmaW5lZCkgKS50by5iZShmYWxzZSlcclxuXHJcbiAgICBleHBlY3QoIF8uaXNTaGFsbG93RXF1YWwoWzEsMl0sIFsxLDJdKSApLnRvLmJlKHRydWUpXHJcbiAgICBleHBlY3QoIF8uaXNTaGFsbG93RXF1YWwoWzEsMl0sIFsxLDNdKSApLnRvLmJlKGZhbHNlKVxyXG5cclxuICAgIGV4cGVjdCggXy5pc1NoYWxsb3dFcXVhbChbMSwyXSwgeyAwOiAxLCAxOiAyfSkgKS50by5iZSh0cnVlKVxyXG5cclxuICAgIGV4cGVjdCggXy5pc1NoYWxsb3dFcXVhbCh7IGE6IDEsIGI6IDJ9LCB7IGI6IDIsIGE6IDEgfSkgKS50by5iZSh0cnVlKVxyXG4gICAgZXhwZWN0KCBfLmlzU2hhbGxvd0VxdWFsKHsgYTogMSwgYjogMn0sIHsgYTogMSwgYzogJ2hpJyB9KSApLnRvLmJlKGZhbHNlKVxyXG4gIH0pXHJcblxyXG4gIGl0KCdzaG91bGQgVFJBTlNGT1JNJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBfLnRyYW5zZm9ybShbMV0sIGZ1bmN0aW9uKG8sIHYsaSl7IFxyXG4gICAgICBleHBlY3QobykudG8uZXFsKFtdKVxyXG4gICAgICBleHBlY3QodikudG8uZXF1YWwoMSlcclxuICAgICAgZXhwZWN0KGkpLnRvLmVxdWFsKDApXHJcbiAgICB9KVxyXG5cclxuICAgIF8udHJhbnNmb3JtKHsga2V5OiAxIH0sIChvLCB2LCBpKSA9PiB7IFxyXG4gICAgICBleHBlY3QobykudG8uZXFsKHt9KVxyXG4gICAgICBleHBlY3QodikudG8uZXF1YWwoMSlcclxuICAgICAgZXhwZWN0KGkpLnRvLmVxdWFsKCdrZXknKVxyXG4gICAgfSlcclxuXHJcbiAgICBleHBlY3QoIF8udHJhbnNmb3JtKHsgYTowLCBiOjEgfSwgXHJcbiAgICAgIChvLCB2LCBpKSA9PiBvW2ldID0gKyt2ICkpLnRvLmVxbCh7IGE6MSwgYjogMn0pXHJcblxyXG4gICAgZXhwZWN0KCBfLnRyYW5zZm9ybShbIDAsIDEgXSwgXHJcbiAgICAgIChvLCB2ICkgPT4gb1t2XSA9ICsrdiwge30pKS50by5lcWwoeyAwOjEsIDE6IDJ9KVxyXG4gIH0pXHJcbn0pXHJcblxyXG5kZXNjcmliZSgnd2hlbiB1c2luZyBhcnJheSBmaWx0ZXIgaGVscGVycycsIGZ1bmN0aW9uKCl7XHJcblxyXG4gIGl0KCdzaG91bGQgbWF0Y2ggY29ycmVjdGx5JywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBleHBlY3QoZmlsdGVycy5lcSgxLCAxKSkudG8uZXF1YWwodHJ1ZSlcclxuICAgIGV4cGVjdChmaWx0ZXJzLm5lcSgyLCAxKSkudG8uZXF1YWwodHJ1ZSlcclxuICAgIGV4cGVjdChmaWx0ZXJzLmx0KDEsIDIpKS50by5lcXVhbCh0cnVlKVxyXG4gICAgZXhwZWN0KGZpbHRlcnMubHRlKDEsIDEpKS50by5lcXVhbCh0cnVlKVxyXG4gICAgZXhwZWN0KGZpbHRlcnMuZ3QoMiwgMSkpLnRvLmVxdWFsKHRydWUpXHJcbiAgICBleHBlY3QoZmlsdGVycy5ndGUoMSwgMSkpLnRvLmVxdWFsKHRydWUpXHJcbiAgIFxyXG4gICAgZXhwZWN0KGZpbHRlcnMuY29udGFpbnMoWzEsMl0sIDEpKS50by5lcXVhbCh0cnVlKVxyXG4gICAgZXhwZWN0KGZpbHRlcnMuY29udGFpbnMoJ2hlbGxvJywgJ2xsJykpLnRvLmVxdWFsKHRydWUpXHJcblxyXG4gICAgZXhwZWN0KGZpbHRlcnMuc3RhcnRzV2l0aCgnaGVsbG8nLCAnaGVsJykpLnRvLmVxdWFsKHRydWUpXHJcbiAgICBleHBlY3QoZmlsdGVycy5lbmRzV2l0aCgnaGVsbG8nLCAnbGxvJykpLnRvLmVxdWFsKHRydWUpXHJcbiAgfSlcclxufSlcclxuXHJcbmRlc2NyaWJlKCd3aGVuIHZhbGlkYXRpbmcgTGlzdHMnLCBmdW5jdGlvbigpe1xyXG5cclxuICBpdCgnc2hvdWxkIHRocm93IHdoZW4gbWV0aG9kcyBhcmUgbm90IGltcGxlbWVudGVkJywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBMaXN0ID0geyBwcmV2OiAoKT0+e30sIG5leHQ6ICgpPT57fSwgbGFzdDogKCk9Pnt9LCBmaXJzdDogJ3dyb25nIHR5cGUnIH1cclxuXHJcbiAgICBleHBlY3QoKCk9PiB2YWxpZGF0ZUxpc3QoTGlzdCkpLnRvLnRocm93RXhjZXB0aW9uKC9maXJzdCgpLylcclxuICB9KVxyXG5cclxuICBpdCgnc2hvdWxkIGZhaWwgcXVpZXRseSBpbiBwcm9kdWN0aW9uJywgZnVuY3Rpb24oKXtcclxuICAgIHZhciBMaXN0ID0geyBwcmV2OiAoKT0+e30sIG5leHQ6ICgpPT57fSwgbGFzdDogKCk9Pnt9LCBmaXJzdDogJ3dyb25nIHR5cGUnIH1cclxuXHJcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwicHJvZHVjdGlvblwiXHJcbiAgICBleHBlY3QoKCk9PiB2YWxpZGF0ZUxpc3QoTGlzdCkpLnRvLm5vdC50aHJvd0V4Y2VwdGlvbigpXHJcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9IFwidGVzdFwiXHJcbiAgfSlcclxuXHJcbn0pXHJcblxyXG5kZXNjcmliZSgnd2hlbiB1c2luZyBjdXN0b20gUHJvcFR5cGVzJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgaXQoJ3Nob3VsZCBjb25jYXQgbmFtZXMnLCBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHByb3BzID0geyB0eXBlOiAnc3BhbicgfVxyXG5cclxuICAgIGV4cGVjdChwcm9wVHlwZXMuZWxlbWVudFR5cGUocHJvcHMsICd0eXBlJywgJ2NvbXBvbmVudCcpKVxyXG4gICAgICAudG8uZXF1YWwodHJ1ZSlcclxuXHJcbiAgICBwcm9wcy50eXBlID0gZnVuY3Rpb24oKXt9XHJcbiAgICBleHBlY3QocHJvcFR5cGVzLmVsZW1lbnRUeXBlKHByb3BzLCAndHlwZScsICdjb21wb25lbnQnKSlcclxuICAgICAgLnRvLmVxdWFsKHRydWUpXHJcblxyXG4gICAgcHJvcHMudHlwZSA9IFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxyXG5cclxuICAgIGV4cGVjdChcclxuICAgICAgcHJvcFR5cGVzLmVsZW1lbnRUeXBlKHByb3BzLCAndHlwZScsICdjb21wb25lbnQnKSkudG8uYmUuYW4oRXJyb3IpXHJcblxyXG4gICAgcHJvcHMudHlwZSA9IHRydWVcclxuICAgIGV4cGVjdChcclxuICAgICAgcHJvcFR5cGVzLmVsZW1lbnRUeXBlKHByb3BzLCAndHlwZScsICdjb21wb25lbnQnKSkudG8uYmUuYW4oRXJyb3IpXHJcbiAgfSlcclxufSlcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3Rlc3QvdXRpbC5icm93c2VyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuUmVhY3QuYWRkb25zO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJ3aW5kb3cuUmVhY3QuYWRkb25zXCJcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuUmVhY3Q7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIndpbmRvdy5SZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIihmdW5jdGlvbigpe1xyXG4gIHZhciBBcCA9IEFycmF5LnByb3RvdHlwZTtcclxuICB2YXIgc2xpY2UgPSBBcC5zbGljZTtcclxuICB2YXIgcHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XHJcblxyXG4gIGlmICghcHJvdG8uYmluZCkge1xyXG4gICAgcHJvdG8uYmluZCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcclxuICAgICAgdmFyIGZ1bmMgPSB0aGlzO1xyXG4gICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIGJvdW5kKCkge1xyXG4gICAgICAgIHZhciBpbnZva2VkQXNDb25zdHJ1Y3RvciA9IGZ1bmMucHJvdG90eXBlICYmICh0aGlzIGluc3RhbmNlb2YgZnVuYyk7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkoXHJcbiAgICAgICAgICAhaW52b2tlZEFzQ29uc3RydWN0b3IgJiYgY29udGV4dCB8fCB0aGlzLFxyXG4gICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgYm91bmQucHJvdG90eXBlID0gZnVuYy5wcm90b3R5cGU7XHJcblxyXG4gICAgICByZXR1cm4gYm91bmQ7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy92ZW5kb3IvcGhhbnRvbWpzLXNoaW0uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcclxuICAsIF8gPSAgcmVxdWlyZSgnLi4vdXRpbC9fJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIFxyXG4gIHByb3BUeXBlczogeyAgICBcclxuICAgIHZhbHVlRmllbGQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0ZXh0RmllbGQ6ICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gIH0sXHJcblxyXG4gIF9kYXRhVmFsdWU6IGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgdmFyIGZpZWxkID0gdGhpcy5wcm9wcy52YWx1ZUZpZWxkO1xyXG5cclxuICAgICAgICByZXR1cm4gZmllbGQgJiYgaXRlbSAmJiBfLmhhcyhpdGVtLCBmaWVsZClcclxuICAgICAgPyBpdGVtW2ZpZWxkXVxyXG4gICAgICA6IGl0ZW1cclxuICB9LFxyXG5cclxuICBfZGF0YVRleHQ6IGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgdmFyIGZpZWxkID0gdGhpcy5wcm9wcy50ZXh0RmllbGQ7XHJcblxyXG4gICAgcmV0dXJuIChmaWVsZCAmJiBpdGVtICYmIF8uaGFzKGl0ZW0sIGZpZWxkKVxyXG4gICAgICA/IGl0ZW1bZmllbGRdXHJcbiAgICAgIDogaXRlbSkgKyAnJ1xyXG4gIH0sXHJcblxyXG4gIF9kYXRhSW5kZXhPZjogZnVuY3Rpb24oZGF0YSwgaXRlbSl7XHJcbiAgICB2YXIgaWR4ID0gLTEsIGxlbiA9IGRhdGEubGVuZ3RoXHJcbiAgICAgICwgZmluZGVyID0gZGF0dW0gPT4gdGhpcy5fdmFsdWVNYXRjaGVyKGl0ZW0sIGRhdHVtKTtcclxuXHJcbiAgICB3aGlsZSAoKytpZHggPCBsZW4pXHJcbiAgICAgIGlmKCBmaW5kZXIoZGF0YVtpZHhdKSApIHJldHVybiBpZHhcclxuICAgIFxyXG4gICAgcmV0dXJuIC0xXHJcbiAgfSxcclxuXHJcbiAgX3ZhbHVlTWF0Y2hlcjogZnVuY3Rpb24oYSwgYil7XHJcbiAgICByZXR1cm4gXy5pc1NoYWxsb3dFcXVhbChcclxuICAgICAgICB0aGlzLl9kYXRhVmFsdWUoYSlcclxuICAgICAgLCB0aGlzLl9kYXRhVmFsdWUoYikpIFxyXG4gIH0sXHJcblxyXG4gIF9kYXRhSXRlbTogZnVuY3Rpb24oZGF0YSwgaXRlbSl7XHJcbiAgICB2YXIgZmlyc3QgPSBkYXRhWzBdXHJcbiAgICAgICwgZmllbGQgPSB0aGlzLnByb3BzLnZhbHVlRmllbGRcclxuICAgICAgLCBpZHg7XHJcblxyXG4gICAgLy8gbWFrZSBhbiBhdHRlbXB0IHRvIHNlZSBpZiB3ZSB3ZXJlIHBhc3NlZCBpbiBkYXRhSXRlbSB2cyBqdXN0IGEgdmFsdWVGaWVsZCB2YWx1ZVxyXG4gICAgLy8gZWl0aGVyIGFuIG9iamVjdCB3aXRoIHRoZSByaWdodCBwcm9wLCBvciBhIHByaW1pdGl2ZVxyXG4gICAgLy8geyB2YWx1ZUZpZWxkOiA1IH0gfHwgXCJoZWxsb1wiIFsgXCJoZWxsb1wiIF1cclxuICAgIGlmKCBfLmhhcyhpdGVtLCBmaWVsZCkgfHwgdHlwZW9mKGZpcnN0KSA9PT0gdHlwZW9mKHZhbCkpXHJcbiAgICAgIHJldHVybiBpdGVtXHJcblxyXG4gICAgaWR4ID0gdGhpcy5fZGF0YUluZGV4T2YoZGF0YSwgdGhpcy5fZGF0YVZhbHVlKGl0ZW0pKVxyXG5cclxuICAgIGlmIChpZHggIT09IC0xKVxyXG4gICAgICByZXR1cm4gZGF0YVtpZHhdXHJcblxyXG4gICAgcmV0dXJuIGl0ZW1cclxuICB9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvbWl4aW5zL0RhdGFIZWxwZXJzTWl4aW4uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBSZWFjdCAgICAgICAgICAgPSByZXF1aXJlKCdyZWFjdCcpXHJcbiAgLCBjeCAgICAgICAgICAgICAgPSByZXF1aXJlKCdjbGFzc25hbWVzJylcclxuICAsIGNvbXBhdCAgICAgICAgICA9IHJlcXVpcmUoJy4vdXRpbC9jb21wYXQnKVxyXG4gICwgSGVhZGVyICAgICAgICAgID0gcmVxdWlyZSgnLi9IZWFkZXInKVxyXG4gICwgRm9vdGVyICAgICAgICAgID0gcmVxdWlyZSgnLi9Gb290ZXInKVxyXG4gICwgTW9udGggICAgICAgICAgID0gcmVxdWlyZSgnLi9Nb250aCcpXHJcbiAgLCBZZWFyICAgICAgICAgICAgPSByZXF1aXJlKCcuL1llYXInKVxyXG4gICwgRGVjYWRlICAgICAgICAgID0gcmVxdWlyZSgnLi9EZWNhZGUnKVxyXG4gICwgQ2VudHVyeSAgICAgICAgID0gcmVxdWlyZSgnLi9DZW50dXJ5JykgXHJcbiAgLCBDdXN0b21Qcm9wVHlwZXMgPSByZXF1aXJlKCcuL3V0aWwvcHJvcFR5cGVzJylcclxuICAsIGNyZWF0ZVVuY29udHJvbGxlZFdpZGdldCA9IHJlcXVpcmUoJ3VuY29udHJvbGxhYmxlJylcclxuICAsIFNsaWRlVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vU2xpZGVUcmFuc2l0aW9uJylcclxuICAsIGRhdGVzICAgICAgICAgICA9IHJlcXVpcmUoJy4vdXRpbC9kYXRlcycpXHJcbiAgLCBjb25zdGFudHMgICAgICAgPSByZXF1aXJlKCcuL3V0aWwvY29uc3RhbnRzJylcclxuICAsIF8gICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vdXRpbC9fJyk7IC8vdmFsdWVzLCBvbWl0XHJcblxyXG52YXIgZGlyICAgID0gY29uc3RhbnRzLmRpcmVjdGlvbnNcclxuICAsIHZhbHVlcyA9IG9iaiA9PiBPYmplY3Qua2V5cyhvYmopLm1hcCggayA9PiBvYmpba10gKVxyXG4gICwgaW52ZXJ0ID0gb2JqID0+IF8udHJhbnNmb3JtKG9iaiwgKG8sIHZhbCwga2V5KSA9PiB7IG9bdmFsXSA9IGtleSB9LCB7fSk7XHJcblxyXG52YXIgdmlld3MgICAgICAgID0gY29uc3RhbnRzLmNhbGVuZGFyVmlld3NcclxuICAsIFZJRVdfT1BUSU9OUyA9IHZhbHVlcyh2aWV3cylcclxuICAsIEFMVF9WSUVXICAgICA9IGludmVydChjb25zdGFudHMuY2FsZW5kYXJWaWV3SGllcmFyY2h5KVxyXG4gICwgTkVYVF9WSUVXICAgID0gY29uc3RhbnRzLmNhbGVuZGFyVmlld0hpZXJhcmNoeVxyXG4gICwgVklFV19VTklUICAgID0gY29uc3RhbnRzLmNhbGVuZGFyVmlld1VuaXRzXHJcbiAgLCBWSUVXICA9IHtcclxuICAgICAgW3ZpZXdzLk1PTlRIXTogICBNb250aCxcclxuICAgICAgW3ZpZXdzLllFQVJdOiAgICBZZWFyLFxyXG4gICAgICBbdmlld3MuREVDQURFXTogIERlY2FkZSxcclxuICAgICAgW3ZpZXdzLkNFTlRVUlldOiBDZW50dXJ5XHJcbiAgICB9O1xyXG5cclxudmFyIE1VTFRJUExJRVIgPSB7XHJcbiAgICAgIFt2aWV3cy5ZRUFSXTogICAgMSxcclxuICAgICAgW3ZpZXdzLkRFQ0FERV06ICAxMCxcclxuICAgICAgW3ZpZXdzLkNFTlRVUlldOiAxMDBcclxuICAgIH07XHJcblxyXG52YXIgVklFV19GT1JNQVRTICA9IHtcclxuICAgICAgW3ZpZXdzLk1PTlRIXTogICAnZGF0ZUZvcm1hdCcsXHJcbiAgICAgIFt2aWV3cy5ZRUFSXTogICAgJ21vbnRoRm9ybWF0JyxcclxuICAgICAgW3ZpZXdzLkRFQ0FERV06ICAneWVhckZvcm1hdCcsXHJcbiAgICAgIFt2aWV3cy5DRU5UVVJZXTogJ2RlY2FkZUZvcm1hdCdcclxuICAgIH1cclxuXHJcblxyXG5cclxudmFyIHByb3BUeXBlcyA9IHtcclxuXHJcbiAgb25DaGFuZ2U6ICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgdmFsdWU6ICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXHJcblxyXG4gIG1pbjogICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxyXG4gIG1heDogICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxyXG5cclxuICBpbml0aWFsVmlldzogICBSZWFjdC5Qcm9wVHlwZXMub25lT2YoVklFV19PUFRJT05TKSxcclxuXHJcbiAgZmluYWxWaWV3OiAgICAgZnVuY3Rpb24gKHByb3BzLCBwcm9wbmFtZSwgY29tcG9uZW50TmFtZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IFJlYWN0LlByb3BUeXBlcy5vbmVPZihWSUVXX09QVElPTlMpKHByb3BzLCBwcm9wbmFtZSwgY29tcG9uZW50TmFtZSlcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBlcnIpIHJldHVybiBlcnJcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIFZJRVdfT1BUSU9OUy5pbmRleE9mKHByb3BzW3Byb3BuYW1lXSkgPCBWSUVXX09QVElPTlMuaW5kZXhPZihwcm9wcy5pbml0aWFsVmlldykgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgVGhlIFxcYCR7cHJvcG5hbWV9XFxgIHByb3A6IFxcYCR7cHJvcHNbcHJvcG5hbWVdfVxcYCBjYW5ub3QgYmUgJ2xvd2VyJyB0aGFuIHRoZSBcXGBpbml0aWFsVmlld1xcYCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcC4gVGhpcyBjcmVhdGVzIGEgcmFuZ2UgdGhhdCBjYW5ub3QgYmUgcmVuZGVyZWQuYC5yZXBsYWNlKC9cXG5cXHQvZywgJycpKVxyXG4gICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gIGRpc2FibGVkOiAgICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydkaXNhYmxlZCddKVxyXG4gICAgICAgICAgICAgICAgIF0pLFxyXG5cclxuICByZWFkT25seTogICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsncmVhZE9ubHknXSlcclxuICAgICAgICAgICAgICAgICBdKSxcclxuICBcclxuICBjdWx0dXJlOiAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gIFxyXG4gIGZvb3RlcjogICAgICAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG5cclxuICBoZWFkZXJGb3JtYXQ6ICBDdXN0b21Qcm9wVHlwZXMubG9jYWxlRm9ybWF0LFxyXG4gIGZvb3RlckZvcm1hdDogIEN1c3RvbVByb3BUeXBlcy5sb2NhbGVGb3JtYXQsXHJcbiAgXHJcbiAgZGF5Rm9ybWF0OiAgICAgQ3VzdG9tUHJvcFR5cGVzLmxvY2FsZUZvcm1hdCxcclxuICBkYXRlRm9ybWF0OiAgICBDdXN0b21Qcm9wVHlwZXMubG9jYWxlRm9ybWF0LFxyXG4gIG1vbnRoRm9ybWF0OiAgIEN1c3RvbVByb3BUeXBlcy5sb2NhbGVGb3JtYXQsXHJcbiAgeWVhckZvcm1hdDogICAgQ3VzdG9tUHJvcFR5cGVzLmxvY2FsZUZvcm1hdCxcclxuICBkZWNhZGVGb3JtYXQ6ICBDdXN0b21Qcm9wVHlwZXMubG9jYWxlRm9ybWF0LFxyXG4gIGNlbnR1cnlGb3JtYXQ6IEN1c3RvbVByb3BUeXBlcy5sb2NhbGVGb3JtYXQsXHJcblxyXG4gIG1lc3NhZ2VzOiAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICBtb3ZlQmFjazogICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBtb3ZlRm9yd2FyZDogIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgfSlcclxufVxyXG5cclxudmFyIENhbGVuZGFyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBkaXNwbGF5TmFtZTogJ0NhbGVuZGFyJyxcclxuXHJcbiAgbWl4aW5zOiBbXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9XaWRnZXRNaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvVGltZW91dE1peGluJyksXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9QdXJlUmVuZGVyTWl4aW4nKSxcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL1J0bFBhcmVudENvbnRleHRNaXhpbicpXHJcbiAgXSxcclxuXHJcbiAgcHJvcFR5cGVzLFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdmFsdWUgPSB0aGlzLmluUmFuZ2VWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzZWxlY3RlZEluZGV4OiAwLFxyXG4gICAgICB2aWV3OiAgICAgICAgICB0aGlzLnByb3BzLmluaXRpYWxWaWV3IHx8ICdtb250aCcsXHJcbiAgICAgIGN1cnJlbnREYXRlOiAgIHZhbHVlID8gbmV3IERhdGUodmFsdWUpIDogdGhpcy5pblJhbmdlVmFsdWUobmV3IERhdGUoKSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgdmFsdWU6ICAgICAgICBudWxsLFxyXG4gICAgICBtaW46ICAgICAgICAgIG5ldyBEYXRlKDE5MDAsMCwgMSksXHJcbiAgICAgIG1heDogICAgICAgICAgbmV3IERhdGUoMjA5OSwxMSwgMzEpLFxyXG5cclxuICAgICAgaW5pdGlhbFZpZXc6ICAnbW9udGgnLFxyXG4gICAgICBmaW5hbFZpZXc6ICAgICdjZW50dXJ5JyxcclxuXHJcbiAgICAgIHRhYkluZGV4OiAgICAgJzAnLFxyXG4gICAgICBmb290ZXI6ICAgICAgICBmYWxzZSxcclxuXHJcbiAgICAgIGhlYWRlckZvcm1hdDogIGRhdGVzLmZvcm1hdHMuTU9OVEhfWUVBUixcclxuICAgICAgZm9vdGVyRm9ybWF0OiAgZGF0ZXMuZm9ybWF0cy5GT09URVIsXHJcblxyXG4gICAgICBkYXlGb3JtYXQ6ICAgICBkYXRlcy5zaG9ydERheSxcclxuICAgICAgZGF0ZUZvcm1hdDogICAgZGF0ZXMuZm9ybWF0cy5EQVlfT0ZfTU9OVEgsXHJcbiAgICAgIG1vbnRoRm9ybWF0OiAgIGRhdGVzLmZvcm1hdHMuTU9OVEhfTkFNRV9BQlJWLFxyXG4gICAgICB5ZWFyRm9ybWF0OiAgICBkYXRlcy5mb3JtYXRzLllFQVIsXHJcblxyXG4gICAgICBkZWNhZGVGb3JtYXQ6ICAoZHQsIGN1bHR1cmUpID0+IFxyXG4gICAgICAgIGAke2RhdGVzLmZvcm1hdChkdCwgZGF0ZXMuZm9ybWF0cy5ZRUFSLCBjdWx0dXJlKX0gLSAke2RhdGVzLmZvcm1hdChkYXRlcy5lbmRPZihkdCwgJ2RlY2FkZScpLCBkYXRlcy5mb3JtYXRzLllFQVIsIGN1bHR1cmUpfWAsXHJcbiAgICAgIFxyXG4gICAgICBjZW50dXJ5Rm9ybWF0OiAoZHQsIGN1bHR1cmUpID0+IFxyXG4gICAgICAgIGAke2RhdGVzLmZvcm1hdChkdCwgZGF0ZXMuZm9ybWF0cy5ZRUFSLCBjdWx0dXJlKX0gLSAke2RhdGVzLmZvcm1hdChkYXRlcy5lbmRPZihkdCwgJ2NlbnR1cnknKSwgZGF0ZXMuZm9ybWF0cy5ZRUFSLCBjdWx0dXJlKX1gLFxyXG5cclxuICAgICAgbWVzc2FnZXM6IG1zZ3Moe30pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICB2YXIgYm90dG9tICA9IFZJRVdfT1BUSU9OUy5pbmRleE9mKG5leHRQcm9wcy5pbml0aWFsVmlldylcclxuICAgICAgLCB0b3AgICAgID0gVklFV19PUFRJT05TLmluZGV4T2YobmV4dFByb3BzLmZpbmFsVmlldylcclxuICAgICAgLCBjdXJyZW50ID0gVklFV19PUFRJT05TLmluZGV4T2YodGhpcy5zdGF0ZS52aWV3KVxyXG4gICAgICAsIHZpZXcgICAgPSB0aGlzLnN0YXRlLnZpZXdcclxuICAgICAgLCB2YWwgICAgID0gdGhpcy5pblJhbmdlVmFsdWUobmV4dFByb3BzLnZhbHVlKTtcclxuXHJcbiAgICBpZiggY3VycmVudCA8IGJvdHRvbSApXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aWV3OiB2aWV3ID0gbmV4dFByb3BzLmluaXRpYWxWaWV3IH0pXHJcbiAgICBlbHNlIGlmIChjdXJyZW50ID4gdG9wKVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgdmlldzogdmlldyA9IG5leHRQcm9wcy5maW5hbFZpZXcgfSlcclxuXHJcbiAgICAvL2lmIHRoZSB2YWx1ZSBjaGFuZ2VzIHJlc2V0IHZpZXdzIHRvIHRoZSBuZXcgb25lXHJcbiAgICBpZiAoICFkYXRlcy5lcSh2YWwsIGRhdGVPck51bGwodGhpcy5wcm9wcy52YWx1ZSksIFZJRVdfVU5JVFt2aWV3XSkpXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIGN1cnJlbnREYXRlOiB2YWwgPyBuZXcgRGF0ZSh2YWwpIDogbmV3IERhdGUoKVxyXG4gICAgICB9KVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgIHZhciB7XHJcbiAgICAgICAgY2xhc3NOYW1lXHJcbiAgICAgICwgLi4ucHJvcHMgfSA9IF8ub21pdCh0aGlzLnByb3BzLCBPYmplY3Qua2V5cyhwcm9wVHlwZXMpKVxyXG4gICAgICAsIFZpZXcgICAgICAgPSBWSUVXW3RoaXMuc3RhdGUudmlld11cclxuICAgICAgLCB2aWV3UHJvcHMgID0gXy5waWNrKHRoaXMucHJvcHMsIE9iamVjdC5rZXlzKGNvbXBhdC50eXBlKFZpZXcpLnByb3BUeXBlcykpXHJcbiAgICAgICwgdW5pdCAgICAgICA9IHRoaXMuc3RhdGUudmlld1xyXG4gICAgICAsIG1lc3NhZ2VzICAgPSBtc2dzKHRoaXMucHJvcHMubWVzc2FnZXMpXHJcblxyXG4gICAgICAsIGRpc2FibGVkICAgPSB0aGlzLnByb3BzLmRpc2FibGVkIHx8IHRoaXMucHJvcHMucmVhZE9ubHlcclxuICAgICAgLCBkYXRlICAgICAgID0gdGhpcy5zdGF0ZS5jdXJyZW50RGF0ZVxyXG4gICAgICAsIHRvZGF5c0RhdGUgPSBuZXcgRGF0ZSgpXHJcbiAgICAgICwgdG9kYXlOb3RJblJhbmdlID0gIWRhdGVzLmluUmFuZ2UodG9kYXlzRGF0ZSwgdGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4LCB1bml0KVxyXG4gICAgICAsIGxhYmVsSWQgICAgPSB0aGlzLl9pZCgnX3ZpZXdfbGFiZWwnKVxyXG4gICAgICAsIGtleSAgICAgICAgPSB0aGlzLnN0YXRlLnZpZXcgKyAnXycgKyBkYXRlc1t0aGlzLnN0YXRlLnZpZXddKGRhdGUpXHJcbiAgICAgICwgaWQgICAgICAgICA9IHRoaXMuX2lkKCdfdmlldycpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgey4uLnByb3BzIH1cclxuICAgICAgICBvbktleURvd249e3RoaXMuX2tleURvd259XHJcbiAgICAgICAgb25Gb2N1cz17dGhpcy5fbWF5YmVIYW5kbGUodGhpcy5fZm9jdXMuYmluZChudWxsLCB0cnVlKSwgdHJ1ZSl9XHJcbiAgICAgICAgb25CbHVyID17dGhpcy5fZm9jdXMuYmluZChudWxsLCBmYWxzZSl9XHJcbiAgICAgICAgY2xhc3NOYW1lPXtjeChjbGFzc05hbWUsICdydy1jYWxlbmRhcicsICdydy13aWRnZXQnLCB7XHJcbiAgICAgICAgICAncnctc3RhdGUtZm9jdXMnOiAgICB0aGlzLnN0YXRlLmZvY3VzZWQsXHJcbiAgICAgICAgICAncnctc3RhdGUtZGlzYWJsZWQnOiB0aGlzLnByb3BzLmRpc2FibGVkLFxyXG4gICAgICAgICAgJ3J3LXN0YXRlLXJlYWRvbmx5JzogdGhpcy5wcm9wcy5yZWFkT25seSxcclxuICAgICAgICAgICdydy1ydGwnOiAgICAgICAgICAgIHRoaXMuaXNSdGwoKVxyXG4gICAgICAgIH0pfT5cclxuICAgICAgICA8SGVhZGVyXHJcbiAgICAgICAgICBsYWJlbD17dGhpcy5fbGFiZWwoKX1cclxuICAgICAgICAgIGxhYmVsSWQ9e2xhYmVsSWR9XHJcbiAgICAgICAgICBtZXNzYWdlcz17bWVzc2FnZXN9XHJcbiAgICAgICAgICB1cERpc2FibGVkPXsgIGRpc2FibGVkIHx8IHRoaXMuc3RhdGUudmlldyA9PT0gdGhpcy5wcm9wcy5maW5hbFZpZXd9XHJcbiAgICAgICAgICBwcmV2RGlzYWJsZWQ9e2Rpc2FibGVkIHx8ICFkYXRlcy5pblJhbmdlKHRoaXMubmV4dERhdGUoZGlyLkxFRlQpLCB0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgsIHVuaXQpfVxyXG4gICAgICAgICAgbmV4dERpc2FibGVkPXtkaXNhYmxlZCB8fCAhZGF0ZXMuaW5SYW5nZSh0aGlzLm5leHREYXRlKGRpci5SSUdIVCksIHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCwgdW5pdCl9XHJcbiAgICAgICAgICBvblZpZXdDaGFuZ2U9e3RoaXMuX21heWJlSGFuZGxlKHRoaXMubmF2aWdhdGUuYmluZChudWxsLCBkaXIuVVAsIG51bGwpKX1cclxuICAgICAgICAgIG9uTW92ZUxlZnQgPXt0aGlzLl9tYXliZUhhbmRsZSh0aGlzLm5hdmlnYXRlLmJpbmQobnVsbCwgIGRpci5MRUZULCBudWxsKSl9XHJcbiAgICAgICAgICBvbk1vdmVSaWdodD17dGhpcy5fbWF5YmVIYW5kbGUodGhpcy5uYXZpZ2F0ZS5iaW5kKG51bGwsICBkaXIuUklHSFQsIG51bGwpKX0vPlxyXG5cclxuICAgICAgICA8U2xpZGVUcmFuc2l0aW9uXHJcbiAgICAgICAgICByZWY9J2FuaW1hdGlvbidcclxuICAgICAgICAgIGR1cmF0aW9uPXtwcm9wcy5kdXJhdGlvbn1cclxuICAgICAgICAgIGRpcmVjdGlvbj17dGhpcy5zdGF0ZS5zbGlkZURpcmVjdGlvbn1cclxuICAgICAgICAgIG9uQW5pbWF0ZT17KCkgPT4gdGhpcy5fZm9jdXModHJ1ZSl9PlxyXG5cclxuICAgICAgICAgIDxWaWV3IHsuLi52aWV3UHJvcHN9XHJcbiAgICAgICAgICAgIHJlZj0nY3VycmVudFZpZXcnXHJcbiAgICAgICAgICAgIGtleT17a2V5fVxyXG4gICAgICAgICAgICBpZD17aWR9XHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWxsZWRieT17bGFiZWxJZH1cclxuICAgICAgICAgICAgc2VsZWN0ZWREYXRlPXt0aGlzLnByb3BzLnZhbHVlfVxyXG4gICAgICAgICAgICB0b2RheT17dG9kYXlzRGF0ZX1cclxuICAgICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuY3VycmVudERhdGV9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl9tYXliZUhhbmRsZSh0aGlzLmNoYW5nZSl9XHJcbiAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5fbWF5YmVIYW5kbGUodGhpcy5fa2V5RG93bil9XHJcbiAgICAgICAgICAgIG9uTW92ZUxlZnQgPXt0aGlzLl9tYXliZUhhbmRsZSh0aGlzLm5hdmlnYXRlLmJpbmQobnVsbCwgIGRpci5MRUZUKSl9XHJcbiAgICAgICAgICAgIG9uTW92ZVJpZ2h0PXt0aGlzLl9tYXliZUhhbmRsZSh0aGlzLm5hdmlnYXRlLmJpbmQobnVsbCwgIGRpci5SSUdIVCkpfS8+XHJcblxyXG4gICAgICAgIDwvU2xpZGVUcmFuc2l0aW9uPlxyXG4gICAgICAgIHsgdGhpcy5wcm9wcy5mb290ZXIgJiZcclxuICAgICAgICAgIDxGb290ZXIgXHJcbiAgICAgICAgICAgIHZhbHVlPXt0b2RheXNEYXRlfVxyXG4gICAgICAgICAgICBmb3JtYXQ9e3RoaXMucHJvcHMuZm9vdGVyRm9ybWF0fVxyXG4gICAgICAgICAgICBjdWx0dXJlPXt0aGlzLnByb3BzLmN1bHR1cmV9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXsgdGhpcy5wcm9wcy5kaXNhYmxlZCB8fCB0b2RheU5vdEluUmFuZ2V9XHJcbiAgICAgICAgICAgIHJlYWRPbmx5PXt0aGlzLnByb3BzLnJlYWRPbmx5fVxyXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9tYXliZUhhbmRsZSh0aGlzLnNlbGVjdCl9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIH0gXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKVxyXG4gIH0sXHJcblxyXG4gIG5hdmlnYXRlOiBmdW5jdGlvbihkaXJlY3Rpb24sIGRhdGUpe1xyXG4gICAgdmFyIHZpZXcgICAgID0gIHRoaXMuc3RhdGUudmlld1xyXG4gICAgICAsIHNsaWRlRGlyID0gKGRpcmVjdGlvbiA9PT0gZGlyLkxFRlQgfHwgZGlyZWN0aW9uID09PSBkaXIuVVApXHJcbiAgICAgICAgICA/ICdyaWdodCdcclxuICAgICAgICAgIDogJ2xlZnQnO1xyXG5cclxuICAgIGlmICggIWRhdGUgKVxyXG4gICAgICBkYXRlID0gWyBkaXIuTEVGVCwgZGlyLlJJR0hUIF0uaW5kZXhPZihkaXJlY3Rpb24pICE9PSAtMVxyXG4gICAgICAgID8gdGhpcy5uZXh0RGF0ZShkaXJlY3Rpb24pXHJcbiAgICAgICAgOiB0aGlzLnN0YXRlLmN1cnJlbnREYXRlXHJcblxyXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gZGlyLkRPV04gKVxyXG4gICAgICB2aWV3ID0gQUxUX1ZJRVdbdmlld10gfHwgdmlld1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IGRpci5VUCApXHJcbiAgICAgIHZpZXcgPSBORVhUX1ZJRVdbdmlld10gfHwgdmlld1xyXG5cclxuICAgIGlmICggdGhpcy5pc1ZhbGlkVmlldyh2aWV3KSAmJiBkYXRlcy5pblJhbmdlKGRhdGUsIHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCwgdmlldykpIHtcclxuICAgICAgdGhpcy5fZm9jdXModHJ1ZSwgJ25hdicpO1xyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgY3VycmVudERhdGU6ICAgIGRhdGUsXHJcbiAgICAgICAgc2xpZGVEaXJlY3Rpb246IHNsaWRlRGlyLFxyXG4gICAgICAgIHZpZXc6IHZpZXdcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBfZm9jdXM6IGZ1bmN0aW9uKGZvY3VzZWQsIGUpe1xyXG4gICAgaWYgKCArdGhpcy5wcm9wcy50YWJJbmRleCA9PT0gLTEpXHJcbiAgICAgIHJldHVybiBcclxuXHJcbiAgICB0aGlzLnNldFRpbWVvdXQoJ2ZvY3VzJywgKCkgPT4ge1xyXG5cclxuICAgICAgaWYoZm9jdXNlZCkgXHJcbiAgICAgICAgdGhpcy5nZXRET01Ob2RlKCkuZm9jdXMoKVxyXG5cclxuICAgICAgaWYoIGZvY3VzZWQgIT09IHRoaXMuc3RhdGUuZm9jdXNlZCl7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoZm9jdXNlZCA/ICdvbkZvY3VzJyA6ICdvbkJsdXInLCBlKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiBmb2N1c2VkIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgY2hhbmdlKGRhdGUpe1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLl9mb2N1cyh0cnVlKSlcclxuXHJcbiAgICBpZiAoIHRoaXMucHJvcHMub25DaGFuZ2UgJiYgdGhpcy5zdGF0ZS52aWV3ID09PSB0aGlzLnByb3BzLmluaXRpYWxWaWV3KVxyXG4gICAgICByZXR1cm4gdGhpcy5ub3RpZnkoJ29uQ2hhbmdlJywgZGF0ZSlcclxuXHJcbiAgICB0aGlzLm5hdmlnYXRlKGRpci5ET1dOLCBkYXRlKVxyXG4gIH0sXHJcblxyXG4gIHNlbGVjdChkYXRlKXtcclxuICAgIHZhciB2aWV3ID0gdGhpcy5wcm9wcy5pbml0aWFsVmlld1xyXG4gICAgICAsIHNsaWRlRGlyID0gdmlldyAhPT0gdGhpcy5zdGF0ZS52aWV3IHx8IGRhdGVzLmd0KGRhdGUsIHRoaXMuc3RhdGUuY3VycmVudERhdGUpXHJcbiAgICAgICAgICA/ICdsZWZ0JyAvLyBtb3ZlIGRvd24gdG8gYSB0aGUgdmlld1xyXG4gICAgICAgICAgOiAncmlnaHQnO1xyXG5cclxuICAgIHRoaXMubm90aWZ5KCdvbkNoYW5nZScsIGRhdGUpXHJcblxyXG4gICAgaWYgKCB0aGlzLmlzVmFsaWRWaWV3KHZpZXcpICYmIGRhdGVzLmluUmFuZ2UoZGF0ZSwgdGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4LCB2aWV3KSkge1xyXG4gICAgICB0aGlzLl9mb2N1cyh0cnVlLCAnbmF2Jyk7XHJcblxyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICBjdXJyZW50RGF0ZTogICAgZGF0ZSxcclxuICAgICAgICBzbGlkZURpcmVjdGlvbjogc2xpZGVEaXIsXHJcbiAgICAgICAgdmlldzogdmlld1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBuZXh0RGF0ZTogZnVuY3Rpb24oZGlyZWN0aW9uKXtcclxuICAgIHZhciBtZXRob2QgPSBkaXJlY3Rpb24gPT09IGRpci5MRUZUID8gJ3N1YnRyYWN0JyA6ICdhZGQnXHJcbiAgICAgICwgdmlldyAgID0gdGhpcy5zdGF0ZS52aWV3XHJcbiAgICAgICwgdW5pdCAgID0gdmlldyA9PT0gdmlld3MuTU9OVEggPyB2aWV3IDogdmlld3MuWUVBUlxyXG4gICAgICAsIG11bHRpICA9IE1VTFRJUExJRVJbdmlld10gfHwgMTtcclxuXHJcbiAgICByZXR1cm4gZGF0ZXNbbWV0aG9kXSh0aGlzLnN0YXRlLmN1cnJlbnREYXRlLCAxICogbXVsdGksIHVuaXQpXHJcbiAgfSxcclxuXHJcbiAgX2tleURvd246IGZ1bmN0aW9uKGUpe1xyXG4gICAgdmFyIGN0cmwgPSBlLmN0cmxLZXlcclxuICAgICAgLCBrZXkgID0gZS5rZXk7XHJcblxyXG4gICAgaWYgKCBjdHJsICkge1xyXG4gICAgICBpZiAoIGtleSA9PT0gJ0Fycm93RG93bicgKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZShkaXIuRE9XTilcclxuICAgICAgfVxyXG4gICAgICBpZiAoIGtleSA9PT0gJ0Fycm93VXAnICkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgIHRoaXMubmF2aWdhdGUoZGlyLlVQKVxyXG4gICAgICB9XHJcbiAgICAgIGlmICgga2V5ID09PSAnQXJyb3dMZWZ0JyApIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICB0aGlzLm5hdmlnYXRlKGRpci5MRUZUKVxyXG4gICAgICB9XHJcbiAgICAgIGlmICgga2V5ID09PSAnQXJyb3dSaWdodCcgKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgdGhpcy5uYXZpZ2F0ZShkaXIuUklHSFQpXHJcbiAgICAgIH1cclxuICAgIH0gXHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5yZWZzLmN1cnJlbnRWaWV3Ll9rZXlEb3duXHJcbiAgICAgICAgJiYgdGhpcy5yZWZzLmN1cnJlbnRWaWV3Ll9rZXlEb3duKGUpXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ub3RpZnkoJ29uS2V5RG93bicsIFtlXSlcclxuICB9LFxyXG5cclxuICBfbGFiZWw6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIHsgXHJcbiAgICAgICAgY3VsdHVyZVxyXG4gICAgICAsIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzXHJcbiAgICAgICwgdmlldyA9IHRoaXMuc3RhdGUudmlld1xyXG4gICAgICAsIGR0ICAgPSB0aGlzLnN0YXRlLmN1cnJlbnREYXRlO1xyXG5cclxuICAgIGlmICggdmlldyA9PT0gJ21vbnRoJylcclxuICAgICAgcmV0dXJuIGRhdGVzLmZvcm1hdChkdCwgcHJvcHMuaGVhZGVyRm9ybWF0LCBjdWx0dXJlKVxyXG5cclxuICAgIGVsc2UgaWYgKCB2aWV3ID09PSAneWVhcicpXHJcbiAgICAgIHJldHVybiBkYXRlcy5mb3JtYXQoZHQsIHByb3BzLnllYXJGb3JtYXQsIGN1bHR1cmUpXHJcblxyXG4gICAgZWxzZSBpZiAoIHZpZXcgPT09ICdkZWNhZGUnKVxyXG4gICAgICByZXR1cm4gZGF0ZXMuZm9ybWF0KGRhdGVzLnN0YXJ0T2YoZHQsICdkZWNhZGUnKSwgcHJvcHMuZGVjYWRlRm9ybWF0LCBjdWx0dXJlKVxyXG5cclxuICAgIGVsc2UgaWYgKCB2aWV3ID09PSAnY2VudHVyeScpXHJcbiAgICAgIHJldHVybiBkYXRlcy5mb3JtYXQoZGF0ZXMuc3RhcnRPZihkdCwgJ2NlbnR1cnknKSwgcHJvcHMuY2VudHVyeUZvcm1hdCwgY3VsdHVyZSlcclxuICB9LFxyXG5cclxuICBpblJhbmdlVmFsdWU6IGZ1bmN0aW9uKF92YWx1ZSl7XHJcbiAgICB2YXIgdmFsdWUgPSBkYXRlT3JOdWxsKF92YWx1ZSlcclxuXHJcbiAgICBpZiggdmFsdWUgPT09IG51bGwpXHJcbiAgICAgIHJldHVybiB2YWx1ZVxyXG5cclxuICAgIHJldHVybiBkYXRlcy5tYXgoXHJcbiAgICAgICAgZGF0ZXMubWluKHZhbHVlLCB0aGlzLnByb3BzLm1heClcclxuICAgICAgLCB0aGlzLnByb3BzLm1pbilcclxuICB9LFxyXG5cclxuICBpc1ZhbGlkVmlldzogZnVuY3Rpb24obmV4dCkge1xyXG4gICAgdmFyIGJvdHRvbSAgPSBWSUVXX09QVElPTlMuaW5kZXhPZih0aGlzLnByb3BzLmluaXRpYWxWaWV3KVxyXG4gICAgICAsIHRvcCAgICAgPSBWSUVXX09QVElPTlMuaW5kZXhPZih0aGlzLnByb3BzLmZpbmFsVmlldylcclxuICAgICAgLCBjdXJyZW50ID0gVklFV19PUFRJT05TLmluZGV4T2YobmV4dCk7XHJcblxyXG4gICAgcmV0dXJuIGN1cnJlbnQgPj0gYm90dG9tICYmIGN1cnJlbnQgPD0gdG9wXHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGRhdGVPck51bGwoZHQpe1xyXG4gIGlmKGR0ICYmICFpc05hTihkdC5nZXRUaW1lKCkpKSByZXR1cm4gZHRcclxuICByZXR1cm4gbnVsbFxyXG59XHJcblxyXG5mdW5jdGlvbiBtc2dzKG1zZ3Mpe1xyXG4gIHJldHVybiB7XHJcbiAgICBtb3ZlQmFjazogICAgICduYXZpZ2F0ZSBiYWNrJyxcclxuICAgIG1vdmVGb3J3YXJkOiAgJ25hdmlnYXRlIGZvcndhcmQnLFxyXG4gICAgLi4ubXNnc1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0cyhvYmope1xyXG4gIHJldHVybiB7XHJcbiAgICBoZWFkZXJGb3JtYXQ6ICBkYXRlcy5mb3JtYXRzLk1PTlRIX1lFQVIsXHJcbiAgICBkYXRlRm9ybWF0OiAgICBkYXRlcy5mb3JtYXRzLkRBWV9PRl9NT05USCxcclxuICAgIG1vbnRoRm9ybWF0OiAgIGRhdGVzLmZvcm1hdHMuTU9OVEhfTkFNRV9BQlJWLFxyXG4gICAgeWVhckZvcm1hdDogICAgZGF0ZXMuZm9ybWF0cy5ZRUFSLFxyXG5cclxuICAgIGRlY2FkZUZvcm1hdDogIChkdCwgY3VsdHVyZSkgPT4gXHJcbiAgICAgIGAke2RhdGVzLmZvcm1hdChkdCwgZGF0ZXMuZm9ybWF0cy5ZRUFSLCBjdWx0dXJlKX0gLSAke2RhdGVzLmZvcm1hdChkYXRlcy5lbmRPZihkdCwgJ2RlY2FkZScpLCBkYXRlcy5mb3JtYXRzLllFQVIsIGN1bHR1cmUpfWAsXHJcbiAgICBcclxuICAgIGNlbnR1cnlGb3JtYXQ6IChkdCwgY3VsdHVyZSkgPT4gXHJcbiAgICAgIGAke2RhdGVzLmZvcm1hdChkdCwgZGF0ZXMuZm9ybWF0cy5ZRUFSLCBjdWx0dXJlKX0gLSAke2RhdGVzLmZvcm1hdChkYXRlcy5lbmRPZihkdCwgJ2NlbnR1cnknKSwgZGF0ZXMuZm9ybWF0cy5ZRUFSLCBjdWx0dXJlKX1gLFxyXG4gICAgICBcclxuICAgIC4uLm9ialxyXG4gIH1cclxufVxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVW5jb250cm9sbGVkV2lkZ2V0KFxyXG4gICAgQ2FsZW5kYXIsIHsgdmFsdWU6ICdvbkNoYW5nZScgfSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5CYXNlQ2FsZW5kYXIgPSBDYWxlbmRhclxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL0NhbGVuZGFyLmpzeFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxyXG4gICwgQnRuID0gcmVxdWlyZSgnLi9XaWRnZXRCdXR0b24nKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGxhYmVsOiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICBsYWJlbElkOiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHJcbiAgICB1cERpc2FibGVkOiAgICAgUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICAgIHByZXZEaXNhYmxlZDogICBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxyXG4gICAgbmV4dERpc2FibGVkOiAgIFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXHJcbiAgICBvblZpZXdDaGFuZ2U6ICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgIG9uTW92ZUxlZnQ6ICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgb25Nb3ZlUmlnaHQ6ICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblxyXG4gICAgbWVzc2FnZXM6ICAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICAgIG1vdmVCYWNrOiAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgbW92ZUZvcndhcmQ6ICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIG1peGluczogW1xyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvUHVyZVJlbmRlck1peGluJyksXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9SdGxDaGlsZENvbnRleHRNaXhpbicpXHJcbiAgXSxcclxuXHJcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWVzc2FnZXM6IHtcclxuICAgICAgICBtb3ZlQmFjazogICAgICduYXZpZ2F0ZSBiYWNrJyxcclxuICAgICAgICBtb3ZlRm9yd2FyZDogICduYXZpZ2F0ZSBmb3J3YXJkJyxcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgIHZhciBydGwgPSB0aGlzLmlzUnRsKCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiBjbGFzc05hbWU9J3J3LWhlYWRlcic+XHJcbiAgICAgICAgPEJ0biBjbGFzc05hbWU9XCJydy1idG4tbGVmdFwiXHJcbiAgICAgICAgICB0YWJJbmRleD0nLTEnXHJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uTW92ZUxlZnR9XHJcbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5wcmV2RGlzYWJsZWR9XHJcbiAgICAgICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLnByb3BzLnByZXZEaXNhYmxlZH1cclxuICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLm1vdmVCYWNrfT5cclxuICAgICAgICAgIDxpIGNsYXNzTmFtZT17XCJydy1pIHJ3LWktY2FyZXQtXCIgKyAocnRsID8gJ3JpZ2h0JyA6ICdsZWZ0Jyl9PjwvaT5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJ3LXNyXCI+e3RoaXMucHJvcHMubWVzc2FnZXMubW92ZUJhY2t9PC9zcGFuPlxyXG4gICAgICAgIDwvQnRuPlxyXG4gICAgICAgIDxCdG4gY2xhc3NOYW1lPVwicnctYnRuLXZpZXdcIlxyXG4gICAgICAgICAgaWQ9e3RoaXMucHJvcHMubGFiZWxJZH1cclxuICAgICAgICAgIHRhYkluZGV4PSctMSdcclxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25WaWV3Q2hhbmdlfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMudXBEaXNhYmxlZH1cclxuICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMucHJvcHMudXBEaXNhYmxlZH0+XHJcbiAgICAgICAgICB7IHRoaXMucHJvcHMubGFiZWwgfVxyXG4gICAgICAgIDwvQnRuPlxyXG4gICAgICAgIDxCdG4gY2xhc3NOYW1lPVwicnctYnRuLXJpZ2h0XCJcclxuICAgICAgICAgIHRhYkluZGV4PSctMSdcclxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25Nb3ZlUmlnaHR9XHJcbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5uZXh0RGlzYWJsZWR9XHJcbiAgICAgICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLnByb3BzLm5leHREaXNhYmxlZH1cclxuICAgICAgICAgIHRpdGxlPXt0aGlzLnByb3BzLm1vdmVGb3J3YXJkfT5cclxuICAgICAgICAgIDxpIGNsYXNzTmFtZT17XCJydy1pIHJ3LWktY2FyZXQtXCIgKyAocnRsID8gJ2xlZnQnIDogJ3JpZ2h0Jyl9PjwvaT5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJ3LXNyXCI+e3RoaXMucHJvcHMubWVzc2FnZXMubW92ZUZvcndhcmR9PC9zcGFuPlxyXG4gICAgICAgIDwvQnRuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0pXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvSGVhZGVyLmpzeFxuICoqLyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcclxuICAsIEJ0biA9IHJlcXVpcmUoJy4vV2lkZ2V0QnV0dG9uJylcclxuICAsIGRhdGVzID0gcmVxdWlyZSgnLi91dGlsL2RhdGVzJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgICBkaXNwbGF5TmFtZTogJ0Zvb3RlcicsXHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICB2YXIgbm93ID0gdGhpcy5wcm9wcy52YWx1ZVxyXG4gICAgICAgICwgZm9ybWF0dGVkID0gZGF0ZXMuZm9ybWF0KFxyXG4gICAgICAgICAgICBub3dcclxuICAgICAgICAgICwgdGhpcy5wcm9wcy5mb3JtYXRcclxuICAgICAgICAgICwgdGhpcy5wcm9wcy5jdWx0dXJlKTtcclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3J3LWZvb3Rlcic+XHJcbiAgICAgICAgICA8QnRuIFxyXG4gICAgICAgICAgICBhcmlhLWRpc2FibGVkPXshIXRoaXMucHJvcHMuZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIGFyaWEtcmVhZG9ubHk9eyEhdGhpcy5wcm9wcy5yZWFkT25seX1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIHJlYWRPbmx5PXt0aGlzLnByb3BzLnJlYWRPbmx5fVxyXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xpY2suYmluZChudWxsLCBub3cpfVxyXG4gICAgICAgICAgPnsgZm9ybWF0dGVkIH08L0J0bj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9Gb290ZXIuanN4XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXHJcbiAgLCBjeCAgICA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKVxyXG4gICwgZGF0ZXMgPSByZXF1aXJlKCcuL3V0aWwvZGF0ZXMnKVxyXG4gICwgZGlyZWN0aW9ucyA9IHJlcXVpcmUoJy4vdXRpbC9jb25zdGFudHMnKS5kaXJlY3Rpb25zXHJcbiAgLCBDdXN0b21Qcm9wVHlwZXMgPSByZXF1aXJlKCcuL3V0aWwvcHJvcFR5cGVzJylcclxuICAsIF8gICA9IHJlcXVpcmUoJy4vdXRpbC9fJylcclxuICAsIEJ0biA9IHJlcXVpcmUoJy4vV2lkZ2V0QnV0dG9uJyk7XHJcblxyXG52YXIgb3Bwb3NpdGUgPSB7XHJcbiAgTEVGVDogZGlyZWN0aW9ucy5SSUdIVCxcclxuICBSSUdIVDogZGlyZWN0aW9ucy5MRUZUXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgZGlzcGxheU5hbWU6ICdNb250aFZpZXcnLFxyXG5cclxuICBtaXhpbnM6IFtcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL1dpZGdldE1peGluJyksXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9SdGxDaGlsZENvbnRleHRNaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvRGF0ZUZvY3VzTWl4aW4nKSgnbW9udGgnLCAnZGF5JyksXHJcbiAgXSxcclxuXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBjdWx0dXJlOiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdmFsdWU6ICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXHJcbiAgICBzZWxlY3RlZERhdGU6ICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcclxuICAgIG1pbjogICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxyXG4gICAgbWF4OiAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXHJcblxyXG4gICAgZGF5Rm9ybWF0OiAgICAgICAgQ3VzdG9tUHJvcFR5cGVzLmxvY2FsZUZvcm1hdC5pc1JlcXVpcmVkLFxyXG4gICAgZGF0ZUZvcm1hdDogICAgICAgQ3VzdG9tUHJvcFR5cGVzLmxvY2FsZUZvcm1hdC5pc1JlcXVpcmVkLFxyXG5cclxuICAgIG9uQ2hhbmdlOiAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsIC8vdmFsdWUgaXMgY2hvc2VuXHJcbiAgICBvbk1vdmVMZWZ0OiAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uTW92ZVJpZ2h0OiAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHByb3BzID0gXy5vbWl0KHRoaXMucHJvcHMsIFsnbWF4JywgJ21pbicsICd2YWx1ZScsICdvbkNoYW5nZSddKVxyXG4gICAgICAsIG1vbnRoID0gZGF0ZXMudmlzaWJsZURheXModGhpcy5wcm9wcy52YWx1ZSlcclxuICAgICAgLCByb3dzICA9IF8uY2h1bmsobW9udGgsIDcgKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8dGFibGUgey4uLnByb3BzfVxyXG4gICAgICAgIHJvbGU9J2dyaWQnXHJcbiAgICAgICAgY2xhc3NOYW1lPSdydy1jYWxlbmRhci1ncmlkJ1xyXG4gICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17dGhpcy5faWQoJ19zZWxlY3RlZF9pdGVtJyl9XHJcbiAgICAgICAgb25LZXlVcD17dGhpcy5fa2V5VXB9PlxyXG4gICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgIDx0cj57dGhpcy5faGVhZGVycyhwcm9wcy5kYXlGb3JtYXQsIHByb3BzLmN1bHR1cmUpfTwvdHI+XHJcbiAgICAgICAgPC90aGVhZD5cclxuICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICB7IHJvd3MubWFwKHRoaXMuX3Jvdyl9XHJcbiAgICAgICAgPC90Ym9keT5cclxuICAgICAgPC90YWJsZT5cclxuICAgIClcclxuICB9LFxyXG5cclxuICBfcm93OiBmdW5jdGlvbihyb3csIGkpe1xyXG4gICAgdmFyIGlkID0gdGhpcy5faWQoJ19zZWxlY3RlZF9pdGVtJylcclxuICAgIFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRyIGtleT17J3dlZWtfJyArIGl9IHJvbGU9J3Jvdyc+XHJcbiAgICAgIHsgcm93Lm1hcCggKGRheSwgaWR4KSA9PiB7XHJcbiAgICAgICAgdmFyIGZvY3VzZWQgID0gZGF0ZXMuZXEoZGF5LCB0aGlzLnN0YXRlLmZvY3VzZWREYXRlLCAnZGF5JylcclxuICAgICAgICAgICwgc2VsZWN0ZWQgPSBkYXRlcy5lcShkYXksIHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlLCAnZGF5JylcclxuICAgICAgICAgICwgdG9kYXkgPSBkYXRlcy5lcShkYXksIHRoaXMucHJvcHMudG9kYXksICdkYXknKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICFkYXRlcy5pblJhbmdlKGRheSwgdGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KVxyXG4gICAgICAgICAgICA/IDx0ZCAga2V5PXsnZGF5XycgKyBpZHh9IHJvbGU9J2dyaWRjZWxsJyBjbGFzc05hbWU9J3J3LWVtcHR5LWNlbGwnID4mbmJzcDs8L3RkPlxyXG4gICAgICAgICAgICA6ICg8dGQga2V5PXsnZGF5XycgKyBpZHh9IHJvbGU9J2dyaWRjZWxsJz5cclxuICAgICAgICAgICAgICAgIDxCdG5cclxuICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9Jy0xJ1xyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2hhbmdlLmJpbmQobnVsbCwgZGF5KX1cclxuICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsZWN0ZWR9XHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KHtcclxuICAgICAgICAgICAgICAgICAgICAncnctb2ZmLXJhbmdlJzogICAgICBkYXRlcy5tb250aChkYXkpICE9PSBkYXRlcy5tb250aCh0aGlzLnN0YXRlLmZvY3VzZWREYXRlKSxcclxuICAgICAgICAgICAgICAgICAgICAncnctc3RhdGUtZm9jdXMnOiAgICBmb2N1c2VkLFxyXG4gICAgICAgICAgICAgICAgICAgICdydy1zdGF0ZS1zZWxlY3RlZCc6IHNlbGVjdGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICdydy1ub3cnOiB0b2RheVxyXG4gICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgICAgaWQ9e2ZvY3VzZWQgPyBpZCA6IHVuZGVmaW5lZH0+XHJcbiAgICAgICAgICAgICAgICAgIHtkYXRlcy5mb3JtYXQoZGF5LCB0aGlzLnByb3BzLmRhdGVGb3JtYXQsIHRoaXMucHJvcHMuY3VsdHVyZSl9XHJcbiAgICAgICAgICAgICAgICA8L0J0bj5cclxuICAgICAgICAgICAgICA8L3RkPilcclxuICAgICAgfSl9XHJcbiAgICAgIDwvdHI+XHJcbiAgICApXHJcbiAgfSxcclxuXHJcblxyXG4gIF9oZWFkZXJzOiBmdW5jdGlvbihmb3JtYXQsIGN1bHR1cmUpe1xyXG4gICAgcmV0dXJuIFswLDEsMiwzLDQsNSw2XS5tYXAoIChkYXkpID0+IFxyXG4gICAgICA8dGgga2V5PXtcImhlYWRlcl9cIiArIGRheSB9PntkYXRlcy5mb3JtYXQoZGF5LCBmb3JtYXQsIGN1bHR1cmUpfTwvdGg+KVxyXG4gIH0sXHJcblxyXG4gIG1vdmU6IGZ1bmN0aW9uKGRhdGUsIGRpcmVjdGlvbil7XHJcbiAgICB2YXIgbWluID0gdGhpcy5wcm9wcy5taW5cclxuICAgICAgLCBtYXggPSB0aGlzLnByb3BzLm1heDtcclxuXHJcbiAgICBpZiAoIHRoaXMuaXNSdGwoKSAmJiBvcHBvc2l0ZVtkaXJlY3Rpb25dKVxyXG4gICAgICBkaXJlY3Rpb24gPSAgb3Bwb3NpdGVbZGlyZWN0aW9uXVxyXG5cclxuICAgIGlmICggZGlyZWN0aW9uID09PSBkaXJlY3Rpb25zLkxFRlQpXHJcbiAgICAgIGRhdGUgPSBuZXh0RGF0ZShkYXRlLCAtMSwgJ2RheScsIG1pbiwgbWF4KVxyXG5cclxuICAgIGVsc2UgaWYgKCBkaXJlY3Rpb24gPT09IGRpcmVjdGlvbnMuUklHSFQpXHJcbiAgICAgIGRhdGUgPSBuZXh0RGF0ZShkYXRlLCAxLCAnZGF5JyxtaW4sIG1heClcclxuXHJcbiAgICBlbHNlIGlmICggZGlyZWN0aW9uID09PSBkaXJlY3Rpb25zLlVQKVxyXG4gICAgICBkYXRlID0gbmV4dERhdGUoZGF0ZSwgLTEsICd3ZWVrJywgbWluLCBtYXgpXHJcblxyXG4gICAgZWxzZSBpZiAoIGRpcmVjdGlvbiA9PT0gZGlyZWN0aW9ucy5ET1dOKVxyXG4gICAgICBkYXRlID0gbmV4dERhdGUoZGF0ZSwgMSwgJ3dlZWsnLCBtaW4sIG1heClcclxuXHJcbiAgICByZXR1cm4gZGF0ZVxyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gbmV4dERhdGUoZGF0ZSwgdmFsLCB1bml0LCBtaW4sIG1heCl7XHJcbiAgdmFyIG5ld0RhdGUgPSBkYXRlcy5hZGQoZGF0ZSwgdmFsLCB1bml0KVxyXG5cclxuICByZXR1cm4gZGF0ZXMuaW5SYW5nZShuZXdEYXRlLCBtaW4sIG1heCwgJ2RheScpID8gbmV3RGF0ZSA6IGRhdGVcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9Nb250aC5qc3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBSZWFjdCAgICAgID0gcmVxdWlyZSgncmVhY3QnKVxyXG4gICwgY3ggICAgICAgICA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKVxyXG4gICwgZGF0ZXMgICAgICA9IHJlcXVpcmUoJy4vdXRpbC9kYXRlcycpXHJcbiAgLCBkaXJlY3Rpb25zID0gcmVxdWlyZSgnLi91dGlsL2NvbnN0YW50cycpLmRpcmVjdGlvbnNcclxuICAsIEJ0biAgICAgICAgPSByZXF1aXJlKCcuL1dpZGdldEJ1dHRvbicpXHJcbiAgLCBfICAgICAgICAgID0gcmVxdWlyZSgnLi91dGlsL18nKVxyXG4gICwgQ3VzdG9tUHJvcFR5cGVzID0gcmVxdWlyZSgnLi91dGlsL3Byb3BUeXBlcycpO1xyXG5cclxudmFyIG9wcG9zaXRlID0ge1xyXG4gIExFRlQ6IGRpcmVjdGlvbnMuUklHSFQsXHJcbiAgUklHSFQ6IGRpcmVjdGlvbnMuTEVGVFxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGRpc3BsYXlOYW1lOiAnWWVhclZpZXcnLFxyXG5cclxuICBtaXhpbnM6IFtcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL1dpZGdldE1peGluJyksXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9SdGxDaGlsZENvbnRleHRNaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvRGF0ZUZvY3VzTWl4aW4nKSgneWVhcicsICdtb250aCcpXHJcbiAgXSxcclxuXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBjdWx0dXJlOiAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB2YWx1ZTogICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxyXG4gICAgbWluOiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcclxuICAgIG1heDogICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXHJcbiAgICBvbkNoYW5nZTogICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcblxyXG4gICAgbW9udGhGb3JtYXQ6ICBDdXN0b21Qcm9wVHlwZXMubG9jYWxlRm9ybWF0LmlzUmVxdWlyZWRcclxuICB9LFxyXG5cclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHByb3BzID0gIF8ub21pdCh0aGlzLnByb3BzLCBbJ21heCcsICdtaW4nLCAndmFsdWUnLCAnb25DaGFuZ2UnXSlcclxuICAgICAgLCBtb250aHMgPSBkYXRlcy5tb250aHNJblllYXIoZGF0ZXMueWVhcih0aGlzLnByb3BzLnZhbHVlKSlcclxuICAgICAgLCByb3dzID0gXy5jaHVuayhtb250aHMsIDQpO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0YWJsZSB7IC4uLnByb3BzIH1cclxuICAgICAgICB0YWJJbmRleD17dGhpcy5wcm9wcy5kaXNhYmxlZCA/ICctMScgOiBcIjBcIn1cclxuICAgICAgICByZWY9J3RhYmxlJ1xyXG4gICAgICAgIHJvbGU9J2dyaWQnXHJcbiAgICAgICAgY2xhc3NOYW1lPSdydy1jYWxlbmRhci1ncmlkIHJ3LW5hdi12aWV3J1xyXG4gICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17dGhpcy5faWQoJ19zZWxlY3RlZF9pdGVtJyl9XHJcbiAgICAgICAgb25LZXlVcD17dGhpcy5fa2V5VXB9PlxyXG4gICAgICAgIDx0Ym9keSA+XHJcbiAgICAgICAgICB7IHJvd3MubWFwKHRoaXMuX3Jvdyl9XHJcbiAgICAgICAgPC90Ym9keT5cclxuICAgICAgPC90YWJsZT5cclxuICAgIClcclxuICB9LFxyXG5cclxuICBfcm93OiBmdW5jdGlvbihyb3csIGkpe1xyXG4gICAgdmFyIGlkID0gdGhpcy5faWQoJ19zZWxlY3RlZF9pdGVtJyk7XHJcbiAgICBcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0ciBrZXk9e2l9IHJvbGU9J3Jvdyc+XHJcbiAgICAgIHsgcm93Lm1hcCggKGRhdGUsIGkpID0+IHtcclxuICAgICAgICB2YXIgZm9jdXNlZCAgPSBkYXRlcy5lcShkYXRlLCB0aGlzLnN0YXRlLmZvY3VzZWREYXRlLCAgJ21vbnRoJylcclxuICAgICAgICAgICwgc2VsZWN0ZWQgPSBkYXRlcy5lcShkYXRlLCB0aGlzLnByb3BzLnZhbHVlLCAgJ21vbnRoJylcclxuICAgICAgICAgICwgY3VycmVudE1vbnRoID0gZGF0ZXMuZXEoZGF0ZSwgdGhpcy5wcm9wcy50b2RheSwgJ21vbnRoJyk7XHJcblxyXG4gICAgICAgIHJldHVybiBkYXRlcy5pblJhbmdlKGRhdGUsIHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCwgJ21vbnRoJylcclxuICAgICAgICAgID8gKDx0ZCBrZXk9e2l9IHJvbGU9J2dyaWRjZWxsJz5cclxuICAgICAgICAgICAgICA8QnRuIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DaGFuZ2UuYmluZChudWxsLCBkYXRlKX0gdGFiSW5kZXg9Jy0xJ1xyXG4gICAgICAgICAgICAgICAgaWQ9e2ZvY3VzZWQgPyBpZCA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbGVjdGVkfVxyXG4gICAgICAgICAgICAgICAgYXJpYS1kaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XHJcbiAgICAgICAgICAgICAgICAgICdydy1zdGF0ZS1mb2N1cyc6ICAgIGZvY3VzZWQsXHJcbiAgICAgICAgICAgICAgICAgICdydy1zdGF0ZS1zZWxlY3RlZCc6IHNlbGVjdGVkLFxyXG4gICAgICAgICAgICAgICAgICAncnctbm93JzogICAgICAgICAgICBjdXJyZW50TW9udGhcclxuICAgICAgICAgICAgICAgIH0pfT5cclxuICAgICAgICAgICAgICAgIHsgZGF0ZXMuZm9ybWF0KGRhdGUsIHRoaXMucHJvcHMubW9udGhGb3JtYXQsIHRoaXMucHJvcHMuY3VsdHVyZSkgfVxyXG4gICAgICAgICAgICAgIDwvQnRuPlxyXG4gICAgICAgICAgICA8L3RkPilcclxuICAgICAgICAgIDogPHRkIGtleT17aX0gY2xhc3NOYW1lPSdydy1lbXB0eS1jZWxsJyByb2xlPSdncmlkY2VsbCc+Jm5ic3A7PC90ZD5cclxuICAgICAgfSl9XHJcbiAgICA8L3RyPilcclxuICB9LFxyXG5cclxuICBmb2N1czogZnVuY3Rpb24oKXtcclxuICAgIHRoaXMucmVmcy50YWJsZS5nZXRET01Ob2RlKCkuZm9jdXMoKTtcclxuICB9LFxyXG5cclxuICBtb3ZlOiBmdW5jdGlvbihkYXRlLCBkaXJlY3Rpb24pe1xyXG4gICAgdmFyIG1pbiA9IHRoaXMucHJvcHMubWluXHJcbiAgICAgICwgbWF4ID0gdGhpcy5wcm9wcy5tYXg7XHJcblxyXG4gICAgaWYgKCB0aGlzLmlzUnRsKCkgJiYgb3Bwb3NpdGVbZGlyZWN0aW9uXSlcclxuICAgICAgZGlyZWN0aW9uID0gIG9wcG9zaXRlW2RpcmVjdGlvbl1cclxuXHJcbiAgICBpZiAoIGRpcmVjdGlvbiA9PT0gZGlyZWN0aW9ucy5MRUZUKVxyXG4gICAgICBkYXRlID0gbmV4dERhdGUoZGF0ZSwgLTEsICdtb250aCcsIG1pbiwgbWF4KVxyXG5cclxuICAgIGVsc2UgaWYgKCBkaXJlY3Rpb24gPT09IGRpcmVjdGlvbnMuUklHSFQpXHJcbiAgICAgIGRhdGUgPSBuZXh0RGF0ZShkYXRlLCAxLCAnbW9udGgnLCBtaW4sIG1heClcclxuXHJcbiAgICBlbHNlIGlmICggZGlyZWN0aW9uID09PSBkaXJlY3Rpb25zLlVQKVxyXG4gICAgICBkYXRlID0gbmV4dERhdGUoZGF0ZSwgLTQsICdtb250aCcsIG1pbiwgbWF4KVxyXG5cclxuICAgIGVsc2UgaWYgKCBkaXJlY3Rpb24gPT09IGRpcmVjdGlvbnMuRE9XTilcclxuICAgICAgZGF0ZSA9IG5leHREYXRlKGRhdGUsIDQsICdtb250aCcsIG1pbiwgbWF4KVxyXG5cclxuICAgIHJldHVybiBkYXRlXHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5mdW5jdGlvbiBuZXh0RGF0ZShkYXRlLCB2YWwsIHVuaXQsIG1pbiwgbWF4KXtcclxuICB2YXIgbmV3RGF0ZSA9IGRhdGVzLmFkZChkYXRlLCB2YWwsIHVuaXQpXHJcbiAgcmV0dXJuIGRhdGVzLmluUmFuZ2UobmV3RGF0ZSwgbWluLCBtYXgsICdtb250aCcpID8gbmV3RGF0ZSA6IGRhdGVcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9ZZWFyLmpzeFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxyXG4gICwgXyA9IHJlcXVpcmUoJy4vdXRpbC9fJylcclxuICAsIGN4ICAgID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpXHJcbiAgLCBkYXRlcyA9IHJlcXVpcmUoJy4vdXRpbC9kYXRlcycpXHJcbiAgLCBkaXJlY3Rpb25zID0gcmVxdWlyZSgnLi91dGlsL2NvbnN0YW50cycpLmRpcmVjdGlvbnNcclxuICAsIEN1c3RvbVByb3BUeXBlcyA9IHJlcXVpcmUoJy4vdXRpbC9wcm9wVHlwZXMnKVxyXG4gICwgQnRuID0gcmVxdWlyZSgnLi9XaWRnZXRCdXR0b24nKTsgXHJcblxyXG52YXIgb3Bwb3NpdGUgPSB7XHJcbiAgTEVGVDogZGlyZWN0aW9ucy5SSUdIVCxcclxuICBSSUdIVDogZGlyZWN0aW9ucy5MRUZUXHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGRpc3BsYXlOYW1lOiAnRGVjYWRlVmlldycsXHJcblxyXG4gIG1peGluczogW1xyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvV2lkZ2V0TWl4aW4nKSxcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL1B1cmVSZW5kZXJNaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvUnRsQ2hpbGRDb250ZXh0TWl4aW4nKSxcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL0RhdGVGb2N1c01peGluJykoJ2RlY2FkZScsICd5ZWFyJylcclxuICBdLFxyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGN1bHR1cmU6ICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgIFxyXG4gICAgdmFsdWU6ICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcclxuICAgIG1pbjogICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXHJcbiAgICBtYXg6ICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxyXG4gICAgb25DaGFuZ2U6ICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cclxuICAgIHllYXJGb3JtYXQ6ICAgQ3VzdG9tUHJvcFR5cGVzLmxvY2FsZUZvcm1hdC5pc1JlcXVpcmVkXHJcblxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgIHZhciBwcm9wcyA9IF8ub21pdCh0aGlzLnByb3BzLCBbJ21heCcsICdtaW4nLCAndmFsdWUnLCAnb25DaGFuZ2UnXSlcclxuICAgICAgLCB5ZWFycyA9IGdldERlY2FkZVllYXJzKHRoaXMucHJvcHMudmFsdWUpXHJcbiAgICAgICwgcm93cyAgPSBfLmNodW5rKHllYXJzLCA0KVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0YWJsZSB7Li4ucHJvcHN9IFxyXG4gICAgICAgIHRhYkluZGV4PXt0aGlzLnByb3BzLmRpc2FibGVkID8gJy0xJyA6IFwiMFwifVxyXG4gICAgICAgIHJvbGU9J2dyaWQnXHJcbiAgICAgICAgY2xhc3NOYW1lPSdydy1jYWxlbmRhci1ncmlkIHJ3LW5hdi12aWV3J1xyXG4gICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17dGhpcy5faWQoJ19zZWxlY3RlZF9pdGVtJyl9XHJcbiAgICAgICAgb25LZXlVcD17dGhpcy5fa2V5VXB9PlxyXG5cclxuICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICB7cm93cy5tYXAodGhpcy5fcm93KX1cclxuICAgICAgICA8L3Rib2R5PlxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKVxyXG4gIH0sXHJcblxyXG4gIF9yb3c6IGZ1bmN0aW9uKHJvdywgaSl7XHJcbiAgICB2YXIgaWQgPSB0aGlzLl9pZCgnX3NlbGVjdGVkX2l0ZW0nKVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDx0ciBrZXk9eydyb3dfJyArIGl9IHJvbGU9J3Jvdyc+XHJcbiAgICAgIHsgcm93Lm1hcCggKGRhdGUsIGkpID0+IHtcclxuICAgICAgICB2YXIgZm9jdXNlZCAgICAgPSBkYXRlcy5lcShkYXRlLCB0aGlzLnN0YXRlLmZvY3VzZWREYXRlLCAgJ3llYXInKVxyXG4gICAgICAgICAgLCBzZWxlY3RlZCAgICA9IGRhdGVzLmVxKGRhdGUsIHRoaXMucHJvcHMudmFsdWUsICAneWVhcicpXHJcbiAgICAgICAgICAsIGN1cnJlbnRZZWFyID0gZGF0ZXMuZXEoZGF0ZSwgdGhpcy5wcm9wcy50b2RheSwgJ3llYXInKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICFkYXRlcy5pblJhbmdlKGRhdGUsIHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCwgJ3llYXInKVxyXG4gICAgICAgICAgPyA8dGQga2V5PXtpfSByb2xlPSdncmlkY2VsbCcgY2xhc3NOYW1lPSdydy1lbXB0eS1jZWxsJz4mbmJzcDs8L3RkPlxyXG4gICAgICAgICAgOiAoPHRkIGtleT17aX0gcm9sZT0nZ3JpZGNlbGwnPlxyXG4gICAgICAgICAgICAgIDxCdG4gb25DbGljaz17dGhpcy5wcm9wcy5vbkNoYW5nZS5iaW5kKG51bGwsIGRhdGUpfSB0YWJJbmRleD0nLTEnXHJcbiAgICAgICAgICAgICAgICBpZD17IGZvY3VzZWQgPyBpZCA6IHVuZGVmaW5lZCB9XHJcbiAgICAgICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtzZWxlY3RlZH1cclxuICAgICAgICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goe1xyXG4gICAgICAgICAgICAgICAgICAncnctb2ZmLXJhbmdlJzogICAgICAhaW5EZWNhZGUoZGF0ZSwgdGhpcy5wcm9wcy52YWx1ZSksXHJcbiAgICAgICAgICAgICAgICAgICdydy1zdGF0ZS1mb2N1cyc6ICAgIGZvY3VzZWQsXHJcbiAgICAgICAgICAgICAgICAgICdydy1zdGF0ZS1zZWxlY3RlZCc6IHNlbGVjdGVkLFxyXG4gICAgICAgICAgICAgICAgICAncnctbm93JzogICAgICAgICAgICBjdXJyZW50WWVhclxyXG4gICAgICAgICAgICAgICAgfSl9PlxyXG4gICAgICAgICAgICAgICAgeyBkYXRlcy5mb3JtYXQoZGF0ZSwgdGhpcy5wcm9wcy55ZWFyRm9ybWF0LCB0aGlzLnByb3BzLmN1bHR1cmUpIH1cclxuICAgICAgICAgICAgICA8L0J0bj5cclxuICAgICAgICAgICAgPC90ZD4pXHJcbiAgICAgIH0pfVxyXG4gICAgPC90cj4pXHJcbiAgfSxcclxuXHJcbiAgbW92ZTogZnVuY3Rpb24oZGF0ZSwgZGlyZWN0aW9uKXtcclxuICAgIHZhciBtaW4gPSB0aGlzLnByb3BzLm1pblxyXG4gICAgICAsIG1heCA9IHRoaXMucHJvcHMubWF4O1xyXG5cclxuICAgIGlmICggdGhpcy5pc1J0bCgpICYmIG9wcG9zaXRlW2RpcmVjdGlvbl0pXHJcbiAgICAgIGRpcmVjdGlvbiA9ICBvcHBvc2l0ZVtkaXJlY3Rpb25dXHJcblxyXG4gICAgaWYgKCBkaXJlY3Rpb24gPT09IGRpcmVjdGlvbnMuTEVGVClcclxuICAgICAgZGF0ZSA9IG5leHREYXRlKGRhdGUsIC0xLCAneWVhcicsIG1pbiwgbWF4KVxyXG5cclxuICAgIGVsc2UgaWYgKCBkaXJlY3Rpb24gPT09IGRpcmVjdGlvbnMuUklHSFQpXHJcbiAgICAgIGRhdGUgPSBuZXh0RGF0ZShkYXRlLCAxLCAneWVhcicsIG1pbiwgbWF4KVxyXG5cclxuICAgIGVsc2UgaWYgKCBkaXJlY3Rpb24gPT09IGRpcmVjdGlvbnMuVVApXHJcbiAgICAgIGRhdGUgPSBuZXh0RGF0ZShkYXRlLCAtNCwgJ3llYXInLCBtaW4sIG1heClcclxuXHJcbiAgICBlbHNlIGlmICggZGlyZWN0aW9uID09PSBkaXJlY3Rpb25zLkRPV04pXHJcbiAgICAgIGRhdGUgPSBuZXh0RGF0ZShkYXRlLCA0LCAneWVhcicsIG1pbiwgbWF4KVxyXG5cclxuICAgIHJldHVybiBkYXRlXHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5mdW5jdGlvbiBpbkRlY2FkZShkYXRlLCBzdGFydCl7XHJcbiAgcmV0dXJuIGRhdGVzLmd0ZShkYXRlLCBkYXRlcy5zdGFydE9mKHN0YXJ0LCAnZGVjYWRlJyksICd5ZWFyJylcclxuICAgICAgJiYgZGF0ZXMubHRlKGRhdGUsIGRhdGVzLmVuZE9mKHN0YXJ0LCdkZWNhZGUnKSwgICd5ZWFyJylcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0RGVjYWRlWWVhcnMoX2RhdGUpe1xyXG4gIHZhciBkYXlzID0gWzEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyXVxyXG4gICAgLCBkYXRlID0gZGF0ZXMuYWRkKGRhdGVzLnN0YXJ0T2YoX2RhdGUsICdkZWNhZGUnKSwgLTIsICd5ZWFyJylcclxuXHJcbiAgcmV0dXJuIGRheXMubWFwKCBcclxuICAgIGkgPT4gZGF0ZSA9IGRhdGVzLmFkZChkYXRlLCAxLCAneWVhcicpKVxyXG59XHJcblxyXG5mdW5jdGlvbiBuZXh0RGF0ZShkYXRlLCB2YWwsIHVuaXQsIG1pbiwgbWF4KXtcclxuICB2YXIgbmV3RGF0ZSA9IGRhdGVzLmFkZChkYXRlLCB2YWwsIHVuaXQpXHJcbiAgcmV0dXJuIGRhdGVzLmluUmFuZ2UobmV3RGF0ZSwgbWluLCBtYXgsICd5ZWFyJykgPyBuZXdEYXRlIDogZGF0ZVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL0RlY2FkZS5qc3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBSZWFjdCAgICAgID0gcmVxdWlyZSgncmVhY3QnKVxyXG4gICwgY3ggICAgICAgICA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKVxyXG4gICwgZGF0ZXMgICAgICA9IHJlcXVpcmUoJy4vdXRpbC9kYXRlcycpXHJcbiAgLCBkaXJlY3Rpb25zID0gcmVxdWlyZSgnLi91dGlsL2NvbnN0YW50cycpLmRpcmVjdGlvbnNcclxuICAsIEJ0biAgICAgICAgPSByZXF1aXJlKCcuL1dpZGdldEJ1dHRvbicpXHJcbiAgLCBfICAgICAgICAgID0gcmVxdWlyZSgnLi91dGlsL18nKVxyXG4gICwgQ3VzdG9tUHJvcFR5cGVzID0gcmVxdWlyZSgnLi91dGlsL3Byb3BUeXBlcycpOyAvL29taXRcclxuXHJcbnZhciBvcHBvc2l0ZSA9IHtcclxuICBMRUZUOiAgZGlyZWN0aW9ucy5SSUdIVCxcclxuICBSSUdIVDogZGlyZWN0aW9ucy5MRUZUXHJcbn07XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGRpc3BsYXlOYW1lOiAnQ2VudHVyeVZpZXcnLFxyXG5cclxuICBtaXhpbnM6IFtcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL1dpZGdldE1peGluJyksXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9QdXJlUmVuZGVyTWl4aW4nKSxcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL1J0bENoaWxkQ29udGV4dE1peGluJyksXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9EYXRlRm9jdXNNaXhpbicpKCdjZW50dXJ5JywgJ2RlY2FkZScpXHJcbiAgXSxcclxuXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICBjdWx0dXJlOiAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB2YWx1ZTogICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxyXG4gICAgbWluOiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcclxuICAgIG1heDogICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXHJcblxyXG4gICAgb25DaGFuZ2U6ICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgXHJcbiAgICBkZWNhZGVGb3JtYXQ6IEN1c3RvbVByb3BUeXBlcy5sb2NhbGVGb3JtYXQuaXNSZXF1aXJlZFxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgIHZhciBwcm9wcyA9IF8ub21pdCh0aGlzLnByb3BzLCAgWydtYXgnLCAnbWluJywgJ3ZhbHVlJywgJ29uQ2hhbmdlJ10pXHJcbiAgICAgICwgeWVhcnMgPSBnZXRDZW50dXJ5RGVjYWRlcyh0aGlzLnByb3BzLnZhbHVlKVxyXG4gICAgICAsIHJvd3MgID0gXy5jaHVuayh5ZWFycywgNCk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRhYmxlIHsuLi5wcm9wc30gXHJcbiAgICAgICAgdGFiSW5kZXg9e3RoaXMucHJvcHMuZGlzYWJsZWQgPyAnLTEnIDogXCIwXCJ9XHJcbiAgICAgICAgcm9sZT0nZ3JpZCdcclxuICAgICAgICBjbGFzc05hbWU9J3J3LWNhbGVuZGFyLWdyaWQgcnctbmF2LXZpZXcnXHJcbiAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXt0aGlzLl9pZCgnX3NlbGVjdGVkX2l0ZW0nKX1cclxuICAgICAgICBvbktleVVwPXt0aGlzLl9rZXlVcH0+XHJcbiAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgeyByb3dzLm1hcCh0aGlzLl9yb3cpfVxyXG4gICAgICAgIDwvdGJvZHk+XHJcbiAgICAgIDwvdGFibGU+XHJcbiAgICApXHJcbiAgfSxcclxuXHJcbiAgX3JvdzogZnVuY3Rpb24ocm93LCBpKXtcclxuICAgIHZhciBpZCA9IHRoaXMuX2lkKCdfc2VsZWN0ZWRfaXRlbScpXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRyIGtleT17J3Jvd18nICsgaX0gcm9sZT0ncm93Jz5cclxuICAgICAgeyByb3cubWFwKCAoZGF0ZSwgaSkgPT4ge1xyXG4gICAgICAgIHZhciBmb2N1c2VkICAgICAgID0gZGF0ZXMuZXEoZGF0ZSwgIHRoaXMuc3RhdGUuZm9jdXNlZERhdGUsICAnZGVjYWRlJylcclxuICAgICAgICAgICwgc2VsZWN0ZWQgICAgICA9IGRhdGVzLmVxKGRhdGUsIHRoaXMucHJvcHMudmFsdWUsICAnZGVjYWRlJylcclxuICAgICAgICAgICwgZCAgICAgICAgICAgICA9IGluUmFuZ2VEYXRlKGRhdGUsIHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heClcclxuICAgICAgICAgICwgY3VycmVudERlY2FkZSA9IGRhdGVzLmVxKGRhdGUsIHRoaXMucHJvcHMudG9kYXksICdkZWNhZGUnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuICFpblJhbmdlKGRhdGUsIHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heClcclxuICAgICAgICAgID8gPHRkIGtleT17aX0gcm9sZT0nZ3JpZGNlbGwnIGNsYXNzTmFtZT0ncnctZW1wdHktY2VsbCc+Jm5ic3A7PC90ZD5cclxuICAgICAgICAgIDogKDx0ZCBrZXk9e2l9IHJvbGU9J2dyaWRjZWxsJz5cclxuICAgICAgICAgICAgICA8QnRuIG9uQ2xpY2s9e3RoaXMucHJvcHMub25DaGFuZ2UuYmluZChudWxsLCBkKX1cclxuICAgICAgICAgICAgICAgIHRhYkluZGV4PSctMSdcclxuICAgICAgICAgICAgICAgIGlkPXsgZm9jdXNlZCA/IGlkIDogdW5kZWZpbmVkIH1cclxuICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbGVjdGVkfVxyXG4gICAgICAgICAgICAgICAgYXJpYS1kaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XHJcbiAgICAgICAgICAgICAgICAgICdydy1vZmYtcmFuZ2UnOiAgICAgICAhaW5DZW50dXJ5KGRhdGUsIHRoaXMucHJvcHMudmFsdWUpLFxyXG4gICAgICAgICAgICAgICAgICAncnctc3RhdGUtZm9jdXMnOiAgICAgZm9jdXNlZCxcclxuICAgICAgICAgICAgICAgICAgJ3J3LXN0YXRlLXNlbGVjdGVkJzogIHNlbGVjdGVkLFxyXG4gICAgICAgICAgICAgICAgICAncnctbm93JzogICAgICAgICAgICAgY3VycmVudERlY2FkZVxyXG4gICAgICAgICAgICAgICAgIH0pfT5cclxuICAgICAgICAgICAgICAgIHsgZGF0ZXMuZm9ybWF0KGRhdGVzLnN0YXJ0T2YoZGF0ZSwgJ2RlY2FkZScpLCB0aGlzLnByb3BzLmRlY2FkZUZvcm1hdCwgdGhpcy5wcm9wcy5jdWx0dXJlKSB9XHJcbiAgICAgICAgICAgICAgPC9CdG4+XHJcbiAgICAgICAgICAgIDwvdGQ+KVxyXG4gICAgICB9KX1cclxuICAgIDwvdHI+KVxyXG4gIH0sXHJcblxyXG5cclxuICBtb3ZlOiBmdW5jdGlvbihkYXRlLCBkaXJlY3Rpb24pe1xyXG4gICAgdmFyIG1pbiA9IHRoaXMucHJvcHMubWluXHJcbiAgICAgICwgbWF4ID0gdGhpcy5wcm9wcy5tYXg7XHJcblxyXG4gICAgaWYgKCB0aGlzLmlzUnRsKCkgJiYgb3Bwb3NpdGVbZGlyZWN0aW9uXSlcclxuICAgICAgZGlyZWN0aW9uID0gIG9wcG9zaXRlW2RpcmVjdGlvbl1cclxuXHJcbiAgICBpZiAoIGRpcmVjdGlvbiA9PT0gZGlyZWN0aW9ucy5MRUZUKVxyXG4gICAgICBkYXRlID0gbmV4dERhdGUoZGF0ZSwgLTEsICdkZWNhZGUnLCBtaW4sIG1heClcclxuXHJcbiAgICBlbHNlIGlmICggZGlyZWN0aW9uID09PSBkaXJlY3Rpb25zLlJJR0hUKVxyXG4gICAgICBkYXRlID0gbmV4dERhdGUoZGF0ZSwgMSwgJ2RlY2FkZScsIG1pbiwgbWF4KVxyXG5cclxuICAgIGVsc2UgaWYgKCBkaXJlY3Rpb24gPT09IGRpcmVjdGlvbnMuVVApXHJcbiAgICAgIGRhdGUgPSBuZXh0RGF0ZShkYXRlLCAtNCwgJ2RlY2FkZScsIG1pbiwgbWF4KVxyXG5cclxuICAgIGVsc2UgaWYgKCBkaXJlY3Rpb24gPT09IGRpcmVjdGlvbnMuRE9XTilcclxuICAgICAgZGF0ZSA9IG5leHREYXRlKGRhdGUsIDQsICdkZWNhZGUnLCBtaW4sIG1heClcclxuXHJcbiAgICByZXR1cm4gZGF0ZVxyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gbGFiZWwoZGF0ZSwgZm9ybWF0LCBjdWx0dXJlKXtcclxuICByZXR1cm4gZGF0ZXMuZm9ybWF0KGRhdGVzLnN0YXJ0T2YoZGF0ZSwgJ2RlY2FkZScpLCAgICBmb3JtYXQsIGN1bHR1cmUpXHJcbiAgICArICcgLSAnICsgZGF0ZXMuZm9ybWF0KGRhdGVzLmVuZE9mKGRhdGUsICdkZWNhZGUnKSwgZm9ybWF0LCBjdWx0dXJlKVxyXG59XHJcblxyXG5mdW5jdGlvbiBpblJhbmdlRGF0ZShkZWNhZGUsIG1pbiwgbWF4KXtcclxuICByZXR1cm4gZGF0ZXMubWF4KCBkYXRlcy5taW4oZGVjYWRlLCBtYXgpLCBtaW4pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluUmFuZ2UoZGVjYWRlLCBtaW4sIG1heCl7XHJcbiAgcmV0dXJuIGRhdGVzLmd0ZShkZWNhZGUsIGRhdGVzLnN0YXJ0T2YobWluLCAnZGVjYWRlJyksICd5ZWFyJylcclxuICAgICAgJiYgZGF0ZXMubHRlKGRlY2FkZSwgZGF0ZXMuZW5kT2YobWF4LCAnZGVjYWRlJyksICAneWVhcicpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluQ2VudHVyeShkYXRlLCBzdGFydCl7XHJcbiAgcmV0dXJuIGRhdGVzLmd0ZShkYXRlLCBkYXRlcy5zdGFydE9mKHN0YXJ0LCAnY2VudHVyeScpLCAneWVhcicpXHJcbiAgICAgICYmIGRhdGVzLmx0ZShkYXRlLCBkYXRlcy5lbmRPZihzdGFydCwgJ2NlbnR1cnknKSwgICd5ZWFyJylcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q2VudHVyeURlY2FkZXMoX2RhdGUpe1xyXG4gIHZhciBkYXlzID0gWzEsMiwzLDQsNSw2LDcsOCw5LDEwLDExLDEyXVxyXG4gICAgLCBkYXRlID0gZGF0ZXMuYWRkKGRhdGVzLnN0YXJ0T2YoX2RhdGUsICdjZW50dXJ5JyksIC0yMCwgJ3llYXInKVxyXG5cclxuICByZXR1cm4gZGF5cy5tYXAoIGkgPT4gKGRhdGUgPSBkYXRlcy5hZGQoZGF0ZSwgMTAsICd5ZWFyJykpKVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gbmV4dERhdGUoZGF0ZSwgdmFsLCB1bml0LCBtaW4sIG1heCl7XHJcbiAgdmFyIG5ld0RhdGUgPSBkYXRlcy5hZGQoZGF0ZSwgdmFsLCB1bml0KVxyXG4gIHJldHVybiBkYXRlcy5pblJhbmdlKG5ld0RhdGUsIG1pbiwgbWF4LCAnZGVjYWRlJykgPyBuZXdEYXRlIDogZGF0ZVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL0NlbnR1cnkuanN4XG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG52YXIgZGF0ZU1hdGggPSByZXF1aXJlKCdkYXRlLWFyaXRobWV0aWMnKVxyXG4gICwgZ2xvYmFsaXplID0gcmVxdWlyZSgnZ2xvYmFsaXplJylcclxuICAsIF8gPSByZXF1aXJlKCcuL18nKTsgLy9leHRlbmRcclxuXHJcbnZhciBzaG9ydE5hbWVzID0ge307XHJcblxyXG52YXIgZGF0ZXMgPSBtb2R1bGUuZXhwb3J0cyA9IF8uYXNzaWduKGRhdGVNYXRoLCB7XHJcbiAgLy8gd3JhcHBlciBtZXRob2RzIGZvciBpc29sYXRpbmcgZ2xvYmFsaXplIHVzZSB0aHJvdWdob3V0IHRoZSBsaWJcclxuICAvLyBsb29raW5nIGZvcndhcmQgdG93YXJkcyB0aGUgMS4wIHJlbGVhc2VcclxuICBjdWx0dXJlOiBmdW5jdGlvbihjdWx0dXJlKXtcclxuICAgIHJldHVybiBjdWx0dXJlXHJcbiAgICAgID8gZ2xvYmFsaXplLmZpbmRDbG9zZXN0Q3VsdHVyZShjdWx0dXJlKVxyXG4gICAgICA6IGdsb2JhbGl6ZS5jdWx0dXJlKClcclxuICB9LFxyXG5cclxuICBzdGFydE9mV2VlazogZnVuY3Rpb24oY3VsdHVyZSl7XHJcbiAgICBjdWx0dXJlID0gZGF0ZXMuY3VsdHVyZShjdWx0dXJlKVxyXG5cclxuICAgIGlmICghY3VsdHVyZSB8fCAhY3VsdHVyZS5jYWxlbmRhcilcclxuICAgICAgcmV0dXJuIDBcclxuXHJcbiAgICByZXR1cm4gY3VsdHVyZS5jYWxlbmRhci5maXJzdERheSB8fCAwXHJcbiAgfSxcclxuXHJcbiAgcGFyc2U6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCwgY3VsdHVyZSkge1xyXG4gICAgaWYgKCB0eXBlb2YgZm9ybWF0ID09PSAnZnVuY3Rpb24nKVxyXG4gICAgICByZXR1cm4gZm9ybWF0KGRhdGUsIGN1bHR1cmUpXHJcblxyXG4gICAgcmV0dXJuIGdsb2JhbGl6ZS5wYXJzZURhdGUoZGF0ZSwgZm9ybWF0LCBjdWx0dXJlKVxyXG4gIH0sXHJcblxyXG4gIGZvcm1hdDogZnVuY3Rpb24oZGF0ZSwgZm9ybWF0LCBjdWx0dXJlKXtcclxuICAgIGlmICggdHlwZW9mIGZvcm1hdCA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgcmV0dXJuIGZvcm1hdChkYXRlLCBjdWx0dXJlKVxyXG5cclxuICAgIHJldHVybiBnbG9iYWxpemUuZm9ybWF0KGRhdGUsIGZvcm1hdCwgY3VsdHVyZSlcclxuICB9LFxyXG4gIFxyXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBzaG9ydERheTogZnVuY3Rpb24oZGF5T2ZUaGVXZWVrKXtcclxuICAgIHZhciBjdWx0dXJlID0gYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyBcImRlZmF1bHRcIiA6IGFyZ3VtZW50c1sxXTtcclxuICAgIHZhciBuYW1lcyA9IHNob3J0TmFtZXNbY3VsdHVyZV0gfHwgKHNob3J0TmFtZXNbY3VsdHVyZV0gPSBkYXRlcy5zaG9ydERheXNPZldlZWsoY3VsdHVyZSkpO1xyXG5cclxuICAgIHJldHVybiBuYW1lc1tkYXlPZlRoZVdlZWtdO1xyXG4gIH0sXHJcblxyXG4gIHNob3J0RGF5c09mV2VlazogZnVuY3Rpb24gKGN1bHR1cmUpe1xyXG4gICAgdmFyIHN0YXJ0ID0gZGF0ZXMuc3RhcnRPZldlZWsoY3VsdHVyZSlcclxuICAgICAgLCBkYXlzLCBmcm9udDtcclxuXHJcbiAgICBjdWx0dXJlID0gZGF0ZXMuY3VsdHVyZShjdWx0dXJlKVxyXG5cclxuICAgIGlmIChjdWx0dXJlICYmIGN1bHR1cmUuY2FsZW5kYXIpe1xyXG4gICAgICBkYXlzID0gY3VsdHVyZS5jYWxlbmRhci5kYXlzLm5hbWVzU2hvcnQuc2xpY2UoKVxyXG5cclxuICAgICAgaWYoc3RhcnQgPT09IDAgKSBcclxuICAgICAgICByZXR1cm4gZGF5c1xyXG4gICAgICBcclxuICAgICAgZnJvbnQgPSBkYXlzLnNwbGljZSgwLCBzdGFydClcclxuICAgICAgZGF5cyAgPSBkYXlzLmNvbmNhdChmcm9udClcclxuICAgICAgcmV0dXJuIGRheXNcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBtb250aHNJblllYXI6IGZ1bmN0aW9uKHllYXIpe1xyXG4gICAgdmFyIG1vbnRocyA9IFswLDEsMiwzLDQsNSw2LDcsOCw5LDEwLDExXVxyXG4gICAgICAsIGRhdGUgICA9IG5ldyBEYXRlKHllYXIsIDAsIDEpXHJcblxyXG4gICAgcmV0dXJuICBtb250aHMubWFwKCBpID0+IGRhdGVzLm1vbnRoKGRhdGUsIGkpKVxyXG4gIH0sXHJcblxyXG4gIGZpcnN0T2ZEZWNhZGU6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgdmFyIGRlY2FkZSA9IGRhdGVzLnllYXIoZGF0ZSkgJSAxMFxyXG5cclxuICAgIHJldHVybiBkYXRlcy5zdWJ0cmFjdChkYXRlLCBkZWNhZGUsICd5ZWFyJylcclxuICB9LFxyXG5cclxuICBsYXN0T2ZEZWNhZGU6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgcmV0dXJuIGRhdGVzLmFkZChkYXRlcy5maXJzdE9mRGVjYWRlKGRhdGUpLCA5LCAneWVhcicpXHJcbiAgfSxcclxuXHJcbiAgZmlyc3RPZkNlbnR1cnk6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgdmFyIGRlY2FkZSA9IGRhdGVzLnllYXIoZGF0ZSkgJSAxMDBcclxuICAgIHJldHVybiBkYXRlcy5zdWJ0cmFjdChkYXRlLCBkZWNhZGUsICd5ZWFyJylcclxuICB9LFxyXG5cclxuICBsYXN0T2ZDZW50dXJ5OiBmdW5jdGlvbihkYXRlKXtcclxuICAgIHJldHVybiBkYXRlcy5hZGQoZGF0ZXMuZmlyc3RPZkNlbnR1cnkoZGF0ZSksIDk5LCAneWVhcicpXHJcbiAgfSxcclxuXHJcbiAgZmlyc3RWaXNpYmxlRGF5OiBmdW5jdGlvbihkYXRlKXtcclxuICAgIHZhciBmaXJzdE9mTW9udGggPSBkYXRlcy5zdGFydE9mKGRhdGUsICdtb250aCcpXHJcbiAgICByZXR1cm4gZGF0ZXMuc3RhcnRPZihmaXJzdE9mTW9udGgsICd3ZWVrJyk7XHJcbiAgfSxcclxuXHJcbiAgbGFzdFZpc2libGVEYXk6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgdmFyIGVuZE9mTW9udGggPSBkYXRlcy5lbmRPZihkYXRlLCAnbW9udGgnKVxyXG4gICAgcmV0dXJuIGRhdGVzLmVuZE9mKGVuZE9mTW9udGgsICd3ZWVrJyk7XHJcbiAgfSxcclxuXHJcbiAgdmlzaWJsZURheXM6IGZ1bmN0aW9uKGRhdGUpe1xyXG4gICAgdmFyIGN1cnJlbnQgPSBkYXRlcy5maXJzdFZpc2libGVEYXkoZGF0ZSlcclxuICAgICAgLCBsYXN0ID0gZGF0ZXMubGFzdFZpc2libGVEYXkoZGF0ZSlcclxuICAgICAgLCBkYXlzID0gW107XHJcblxyXG4gICAgd2hpbGUoIGRhdGVzLmx0ZShjdXJyZW50LCBsYXN0LCAnZGF5JykgKSB7XHJcbiAgICAgIGRheXMucHVzaChjdXJyZW50KVxyXG4gICAgICBjdXJyZW50ID0gZGF0ZXMuYWRkKGN1cnJlbnQsIDEsICdkYXknKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBkYXlzXHJcbiAgfSxcclxuXHJcbiAgbWVyZ2U6IGZ1bmN0aW9uKGRhdGUsIHRpbWUpe1xyXG4gICAgaWYoIHRpbWUgPT0gbnVsbCAmJiBkYXRlID09IG51bGwpXHJcbiAgICAgIHJldHVybiBudWxsXHJcblxyXG4gICAgaWYoIHRpbWUgPT0gbnVsbCkgdGltZSA9IG5ldyBEYXRlKClcclxuICAgIGlmKCBkYXRlID09IG51bGwpIGRhdGUgPSBuZXcgRGF0ZSgpXHJcblxyXG4gICAgZGF0ZSA9IGRhdGVzLnN0YXJ0T2YoZGF0ZSwgJ2RheScpXHJcbiAgICBkYXRlID0gZGF0ZXMuaG91cnMoZGF0ZSwgICAgICAgIGRhdGVzLmhvdXJzKHRpbWUpKVxyXG4gICAgZGF0ZSA9IGRhdGVzLm1pbnV0ZXMoZGF0ZSwgICAgICBkYXRlcy5taW51dGVzKHRpbWUpKVxyXG4gICAgZGF0ZSA9IGRhdGVzLnNlY29uZHMoZGF0ZSwgICAgICBkYXRlcy5zZWNvbmRzKHRpbWUpKVxyXG4gICAgcmV0dXJuIGRhdGVzLm1pbGxpc2Vjb25kcyhkYXRlLCBkYXRlcy5taWxsaXNlY29uZHModGltZSkpXHJcbiAgfSxcclxuXHJcbiAgc2FtZU1vbnRoOiBmdW5jdGlvbihkYXRlQSwgZGF0ZUIpe1xyXG4gICAgcmV0dXJuIGRhdGVzLmVxKGRhdGVBLCBkYXRlQiwgJ21vbnRoJylcclxuICB9LFxyXG5cclxuICB0b2RheTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGFydE9mKG5ldyBEYXRlKCksICdkYXknKVxyXG4gIH0sXHJcblxyXG4gIHllc3RlcmRheTogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hZGQodGhpcy5zdGFydE9mKG5ldyBEYXRlKCksICdkYXknKSwgLTEsICdkYXknKVxyXG4gIH0sXHJcblxyXG4gIHRvbW9ycm93OiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmFkZCh0aGlzLnN0YXJ0T2YobmV3IERhdGUoKSwgJ2RheScpLCAxLCAnZGF5JylcclxuICB9LFxyXG5cclxuICBmb3JtYXRzOiB7XHJcbiAgICBEQVlfT0ZfTU9OVEg6ICAgICdkZCcsXHJcbiAgICBEQVlfTkFNRV9TSE9SVDogIG51bGwsXHJcbiAgICBNT05USF9OQU1FX0FCUlY6ICdNTU0nLFxyXG4gICAgTU9OVEhfWUVBUjogICAgICAnTU1NTSB5eXl5JyxcclxuICAgIFlFQVI6ICAgICAgICAgICAgJ3l5eXknLFxyXG4gICAgRk9PVEVSOiAgICAgICAgICAnRCdcclxuICB9XHJcblxyXG59KVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL3V0aWwvZGF0ZXMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBSZWFjdCAgPSByZXF1aXJlKCdyZWFjdCcpXHJcbiAgLCBpbnZhcmlhbnQgPSByZXF1aXJlKCdyZWFjdC9saWIvaW52YXJpYW50JylcclxuICAsIGN4ICAgICA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKVxyXG4gICwgY29tcGF0ID0gcmVxdWlyZSgnLi91dGlsL2NvbXBhdCcpXHJcbiAgLCBfICAgICAgPSByZXF1aXJlKCcuL3V0aWwvXycpIC8vcGljaywgb21pdCwgaGFzXHJcblxyXG4gICwgZGF0ZXMgID0gcmVxdWlyZSgnLi91dGlsL2RhdGVzJylcclxuICAsIHZpZXdzICA9IHJlcXVpcmUoJy4vdXRpbC9jb25zdGFudHMnKS5jYWxlbmRhclZpZXdzXHJcbiAgLCBwb3B1cHMgPSByZXF1aXJlKCcuL3V0aWwvY29uc3RhbnRzJykuZGF0ZVBvcHVwc1xyXG5cclxuICAsIFBvcHVwICAgICA9IHJlcXVpcmUoJy4vUG9wdXAnKVxyXG4gICwgQ2FsZW5kYXIgID0gcmVxdWlyZSgnLi9DYWxlbmRhcicpLkJhc2VDYWxlbmRhclxyXG4gICwgVGltZSAgICAgID0gcmVxdWlyZSgnLi9UaW1lTGlzdCcpXHJcbiAgLCBEYXRlSW5wdXQgPSByZXF1aXJlKCcuL0RhdGVJbnB1dCcpXHJcbiAgLCBCdG4gICAgICAgPSByZXF1aXJlKCcuL1dpZGdldEJ1dHRvbicpXHJcbiAgLCBDdXN0b21Qcm9wVHlwZXMgPSByZXF1aXJlKCcuL3V0aWwvcHJvcFR5cGVzJylcclxuICAsIGNyZWF0ZVVuY29udHJvbGxlZFdpZGdldCA9IHJlcXVpcmUoJ3VuY29udHJvbGxhYmxlJyk7XHJcblxyXG52YXIgdmlld0VudW0gID0gT2JqZWN0LmtleXModmlld3MpLm1hcCggayA9PiB2aWV3c1trXSApO1xyXG5cclxudmFyIHByb3BUeXBlcyA9IHtcclxuXHJcbiAgICAuLi5jb21wYXQudHlwZShDYWxlbmRhcikucHJvcFR5cGVzLFxyXG5cclxuICAgIC8vLS0gY29udHJvbGxlZCBwcm9wcyAtLS0tLS0tLS0tLVxyXG4gICAgdmFsdWU6ICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxyXG4gICAgb25DaGFuZ2U6ICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgb3BlbjogICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZihbZmFsc2UsIHBvcHVwcy5USU1FLCBwb3B1cHMuQ0FMRU5EQVJdKSxcclxuICAgIG9uVG9nZ2xlOiAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgb25TZWxlY3Q6ICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cclxuICAgIG1pbjogICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcclxuICAgIG1heDogICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuaW5zdGFuY2VPZihEYXRlKSxcclxuXHJcbiAgICBjdWx0dXJlOiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHJcbiAgICBmb3JtYXQ6ICAgICAgICAgQ3VzdG9tUHJvcFR5cGVzLmxvY2FsZUZvcm1hdCxcclxuICAgIGVkaXRGb3JtYXQ6ICAgICBDdXN0b21Qcm9wVHlwZXMubG9jYWxlRm9ybWF0LFxyXG5cclxuICAgIGNhbGVuZGFyOiAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIHRpbWU6ICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuXHJcbiAgICB0aW1lQ29tcG9uZW50OiAgQ3VzdG9tUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxyXG5cclxuICAgIC8vcG9wdXBcclxuICAgIGRyb3BVcDogICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgIGR1cmF0aW9uOiAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG5cclxuICAgIHBsYWNlaG9sZGVyOiAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbmFtZTogICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblxyXG4gICAgaW5pdGlhbFZpZXc6ICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZih2aWV3RW51bSksXHJcbiAgICBmaW5hbFZpZXc6ICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKHZpZXdFbnVtKSxcclxuXHJcbiAgICBkaXNhYmxlZDogICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydkaXNhYmxlZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgXSksXHJcblxyXG4gICAgcmVhZE9ubHk6ICAgICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydyZWFkT25seSddKVxyXG4gICAgICAgICAgICAgICAgICAgIF0pLFxyXG5cclxuICAgIHBhcnNlOiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5hcnJheU9mKFJlYWN0LlByb3BUeXBlcy5zdHJpbmcpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jXHJcbiAgICAgICAgICAgICAgICAgICAgXSksXHJcblxyXG5cclxuICAgIG1lc3NhZ2VzOiAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICAgIGNhbGVuZGFyQnV0dG9uOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLCBcclxuICAgICAgdGltZUJ1dHRvbjogICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsIFxyXG4gICAgfSlcclxuICB9XHJcblxyXG5cclxudmFyIERhdGVUaW1lUGlja2VyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBkaXNwbGF5TmFtZTogJ0RhdGVUaW1lUGlja2VyJyxcclxuXHJcbiAgbWl4aW5zOiBbXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9XaWRnZXRNaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvVGltZW91dE1peGluJyksXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9QdXJlUmVuZGVyTWl4aW4nKSxcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL1BvcHVwU2Nyb2xsVG9NaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvUnRsUGFyZW50Q29udGV4dE1peGluJylcclxuICBdLFxyXG5cclxuICBwcm9wVHlwZXM6IHByb3BUeXBlcyxcclxuXHJcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZm9jdXNlZDogZmFsc2UsXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHZhbHVlOiAgICAgICAgICAgIG51bGwsXHJcbiAgICAgIFxyXG4gICAgICBtaW46ICAgICAgICAgICAgICBuZXcgRGF0ZSgxOTAwLCAgMCwgIDEpLFxyXG4gICAgICBtYXg6ICAgICAgICAgICAgICBuZXcgRGF0ZSgyMDk5LCAxMSwgMzEpLFxyXG4gICAgICBjYWxlbmRhcjogICAgICAgICB0cnVlLFxyXG4gICAgICB0aW1lOiAgICAgICAgICAgICB0cnVlLFxyXG4gICAgICBvcGVuOiAgICAgICAgICAgICBmYWxzZSxcclxuXHJcbiAgICAgIC8vY2FsZW5kYXIgb3ZlcnJpZGVcclxuICAgICAgZm9vdGVyOiAgICAgICAgICAgdHJ1ZSxcclxuXHJcbiAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgY2FsZW5kYXJCdXR0b246ICdTZWxlY3QgRGF0ZScsXHJcbiAgICAgICAgdGltZUJ1dHRvbjogICAgICdTZWxlY3QgVGltZScsXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgeyBcclxuICAgICAgICBjbGFzc05hbWVcclxuICAgICAgLCAuLi5wcm9wcyB9ID0gXy5vbWl0KHRoaXMucHJvcHMsIE9iamVjdC5rZXlzKHByb3BUeXBlcykpXHJcbiAgICAgICwgY2FsUHJvcHMgICA9IF8ucGljayh0aGlzLnByb3BzLCBPYmplY3Qua2V5cyhjb21wYXQudHlwZShDYWxlbmRhcikucHJvcFR5cGVzKSlcclxuXHJcbiAgICAgICwgdGltZUxpc3RJRCA9IHRoaXMuX2lkKCdfdGltZV9saXN0Ym94JylcclxuICAgICAgLCB0aW1lT3B0SUQgID0gdGhpcy5faWQoJ190aW1lX29wdGlvbicpXHJcbiAgICAgICwgZGF0ZUxpc3RJRCA9IHRoaXMuX2lkKCdfY2FsJylcclxuICAgICAgLCBkcm9wVXAgPSB0aGlzLnByb3BzLmRyb3BVcFxyXG4gICAgICAsIHZhbHVlID0gZGF0ZU9yTnVsbCh0aGlzLnByb3BzLnZhbHVlKVxyXG4gICAgICAsIG93bnM7XHJcblxyXG4gICAgaWYgKGRhdGVMaXN0SUQgJiYgdGhpcy5wcm9wcy5jYWxlbmRhciApIG93bnMgPSBkYXRlTGlzdElEXHJcbiAgICBpZiAodGltZUxpc3RJRCAmJiB0aGlzLnByb3BzLnRpbWUgKSAgICAgb3ducyArPSAnICcgKyB0aW1lTGlzdElEXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiB7Li4ucHJvcHN9XHJcbiAgICAgICAgcmVmPVwiZWxlbWVudFwiXHJcbiAgICAgICAgdGFiSW5kZXg9XCItMVwiXHJcbiAgICAgICAgb25LZXlEb3duPXt0aGlzLl9tYXliZUhhbmRsZSh0aGlzLl9rZXlEb3duKX1cclxuICAgICAgICBvbkZvY3VzPXt0aGlzLl9tYXliZUhhbmRsZSh0aGlzLl9mb2N1cy5iaW5kKG51bGwsIHRydWUpLCB0cnVlKX1cclxuICAgICAgICBvbkJsdXIgPXt0aGlzLl9mb2N1cy5iaW5kKG51bGwsIGZhbHNlKX1cclxuICAgICAgICBjbGFzc05hbWU9e2N4KGNsYXNzTmFtZSwgJ3J3LWRhdGV0aW1lcGlja2VyJywgJ3J3LXdpZGdldCcsIHtcclxuICAgICAgICAgICdydy1zdGF0ZS1mb2N1cyc6ICAgICB0aGlzLnN0YXRlLmZvY3VzZWQsXHJcbiAgICAgICAgICAncnctc3RhdGUtZGlzYWJsZWQnOiAgdGhpcy5pc0Rpc2FibGVkKCksXHJcbiAgICAgICAgICAncnctc3RhdGUtcmVhZG9ubHknOiAgdGhpcy5pc1JlYWRPbmx5KCksXHJcbiAgICAgICAgICAncnctaGFzLWJvdGgnOiAgICAgICAgdGhpcy5wcm9wcy5jYWxlbmRhciAmJiB0aGlzLnByb3BzLnRpbWUsXHJcbiAgICAgICAgICAncnctaGFzLW5laXRoZXInOiAgICAgIXRoaXMucHJvcHMuY2FsZW5kYXIgJiYgIXRoaXMucHJvcHMudGltZSxcclxuICAgICAgICAgICdydy1ydGwnOiAgICAgICAgICAgICB0aGlzLmlzUnRsKCksXHJcblxyXG4gICAgICAgICAgWydydy1vcGVuJyArIChkcm9wVXAgPyAnLXVwJyA6ICcnKV06IHRoaXMucHJvcHMub3BlblxyXG4gICAgICAgIH0pfT5cclxuXHJcbiAgICAgICAgPERhdGVJbnB1dCByZWY9J3ZhbHVlSW5wdXQnXHJcbiAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9eyB0aGlzLnByb3BzLm9wZW5cclxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLm9wZW4gPT09IHBvcHVwcy5DQUxFTkRBUiA/IHRoaXMuX2lkKCdfY2FsX3ZpZXdfc2VsZWN0ZWRfaXRlbScpIDogdGltZU9wdElEXHJcbiAgICAgICAgICAgIDogdW5kZWZpbmVkIH1cclxuICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9eyAhIXRoaXMucHJvcHMub3BlbiB9XHJcbiAgICAgICAgICBhcmlhLWJ1c3k9eyEhdGhpcy5wcm9wcy5idXN5fVxyXG4gICAgICAgICAgYXJpYS1vd25zPXtvd25zfVxyXG4gICAgICAgICAgYXJpYS1oYXNwb3B1cD17dHJ1ZX1cclxuICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZCgpfVxyXG4gICAgICAgICAgcmVhZE9ubHk9e3RoaXMuaXNSZWFkT25seSgpfVxyXG4gICAgICAgICAgcm9sZT17IHRoaXMucHJvcHMudGltZSA/ICdjb21ib2JveCcgOiBudWxsIH1cclxuICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgIFxyXG4gICAgICAgICAgZm9ybWF0PXtnZXRGb3JtYXQodGhpcy5wcm9wcyl9XHJcbiAgICAgICAgICBlZGl0Rm9ybWF0PXt0aGlzLnByb3BzLmVkaXRGb3JtYXR9XHJcblxyXG4gICAgICAgICAgZWRpdGluZz17dGhpcy5zdGF0ZS5mb2N1c2VkfVxyXG4gICAgICAgICAgY3VsdHVyZT17dGhpcy5wcm9wcy5jdWx0dXJlfVxyXG4gICAgICAgICAgcGFyc2U9e3RoaXMuX3BhcnNlfVxyXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX2NoYW5nZX0gLz5cclxuICAgICAgICAgIFxyXG4gICAgICAgIHsgKHRoaXMucHJvcHMuY2FsZW5kYXIgfHwgdGhpcy5wcm9wcy50aW1lKSAmJlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ncnctc2VsZWN0Jz5cclxuICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY2FsZW5kYXIgJiZcclxuICAgICAgICAgICAgPEJ0biB0YWJJbmRleD0nLTEnXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPSdydy1idG4tY2FsZW5kYXInXHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZCgpIHx8IHRoaXMuaXNSZWFkT25seSgpfVxyXG4gICAgICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZCgpIHx8IHRoaXMuaXNSZWFkT25seSgpfVxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX21heWJlSGFuZGxlKHRoaXMuX2NsaWNrLmJpbmQobnVsbCwgcG9wdXBzLkNBTEVOREFSKSl9PlxyXG4gICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cInJ3LWkgcnctaS1jYWxlbmRhclwiPjxzcGFuIGNsYXNzTmFtZT1cInJ3LXNyXCI+eyB0aGlzLnByb3BzLm1lc3NhZ2VzLmNhbGVuZGFyQnV0dG9uIH08L3NwYW4+PC9pPlxyXG4gICAgICAgICAgICA8L0J0bj5cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHsgdGhpcy5wcm9wcy50aW1lICYmXHJcbiAgICAgICAgICAgIDxCdG4gdGFiSW5kZXg9Jy0xJ1xyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT0ncnctYnRuLXRpbWUnXHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZCgpIHx8IHRoaXMuaXNSZWFkT25seSgpfVxyXG4gICAgICAgICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMuaXNEaXNhYmxlZCgpIHx8IHRoaXMuaXNSZWFkT25seSgpfVxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX21heWJlSGFuZGxlKHRoaXMuX2NsaWNrLmJpbmQobnVsbCwgcG9wdXBzLlRJTUUpKX0+XHJcbiAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwicnctaSBydy1pLWNsb2NrLW9cIj48c3BhbiBjbGFzc05hbWU9XCJydy1zclwiPnsgdGhpcy5wcm9wcy5tZXNzYWdlcy50aW1lQnV0dG9uIH08L3NwYW4+PC9pPlxyXG4gICAgICAgICAgICA8L0J0bj5cclxuICAgICAgICAgIH1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIDxQb3B1cCBcclxuICAgICAgICAgIGRyb3BVcD17ZHJvcFVwfVxyXG4gICAgICAgICAgb3Blbj17IHRoaXMucHJvcHMub3BlbiA9PT0gcG9wdXBzLlRJTUUgfVxyXG4gICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e3RoaXMuY2xvc2V9PlxyXG5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxUaW1lIHJlZj1cInRpbWVQb3B1cFwiXHJcbiAgICAgICAgICAgICAgaWQ9e3RpbWVMaXN0SUR9XHJcbiAgICAgICAgICAgICAgb3B0SUQ9e3RpbWVPcHRJRH1cclxuICAgICAgICAgICAgICBhcmlhLWhpZGRlbj17ICF0aGlzLnByb3BzLm9wZW4gfVxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IG1heEhlaWdodDogMjAwLCBoZWlnaHQ6ICdhdXRvJyB9fVxyXG4gICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgICAgICBtaW49e3RoaXMucHJvcHMubWlufVxyXG4gICAgICAgICAgICAgIG1heD17dGhpcy5wcm9wcy5tYXh9XHJcbiAgICAgICAgICAgICAgY3VsdHVyZT17dGhpcy5wcm9wcy5jdWx0dXJlfVxyXG4gICAgICAgICAgICAgIG9uTW92ZT17dGhpcy5fc2Nyb2xsVG99XHJcbiAgICAgICAgICAgICAgcHJlc2VydmVEYXRlPXshIXRoaXMucHJvcHMuY2FsZW5kYXJ9XHJcbiAgICAgICAgICAgICAgaXRlbUNvbXBvbmVudD17dGhpcy5wcm9wcy50aW1lQ29tcG9uZW50fVxyXG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLl9tYXliZUhhbmRsZSh0aGlzLl9zZWxlY3RUaW1lKX0vPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9Qb3B1cD5cclxuICAgICAgICA8UG9wdXBcclxuICAgICAgICAgIGNsYXNzTmFtZT0ncnctY2FsZW5kYXItcG9wdXAnXHJcbiAgICAgICAgICBkcm9wVXA9e2Ryb3BVcH1cclxuICAgICAgICAgIG9wZW49eyB0aGlzLnByb3BzLm9wZW4gPT09IHBvcHVwcy5DQUxFTkRBUn1cclxuICAgICAgICAgIGR1cmF0aW9uPXt0aGlzLnByb3BzLmR1cmF0aW9ufVxyXG4gICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e3RoaXMuY2xvc2V9PlxyXG5cclxuICAgICAgICAgIDxDYWxlbmRhciB7Li4uY2FsUHJvcHMgfVxyXG4gICAgICAgICAgICByZWY9XCJjYWxQb3B1cFwiXHJcbiAgICAgICAgICAgIHRhYkluZGV4PSctMSdcclxuICAgICAgICAgICAgaWQ9e2RhdGVMaXN0SUR9XHJcbiAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgICAgYXJpYS1oaWRkZW49eyAhdGhpcy5wcm9wcy5vcGVuIH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuX21heWJlSGFuZGxlKHRoaXMuX3NlbGVjdERhdGUpfS8+XHJcbiAgICAgICAgPC9Qb3B1cD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfSxcclxuXHJcbiAgX2NoYW5nZTogZnVuY3Rpb24oZGF0ZSwgc3RyLCBjb25zdHJhaW4pe1xyXG4gICAgdmFyIGNoYW5nZSA9IHRoaXMucHJvcHMub25DaGFuZ2VcclxuXHJcbiAgICBpZihjb25zdHJhaW4pXHJcbiAgICAgIGRhdGUgPSB0aGlzLmluUmFuZ2VWYWx1ZShkYXRlKVxyXG5cclxuICAgIGlmKCBjaGFuZ2UgKSB7XHJcbiAgICAgIGlmKCBkYXRlID09IG51bGwgfHwgdGhpcy5wcm9wcy52YWx1ZSA9PSBudWxsKXtcclxuICAgICAgICBpZiggZGF0ZSAhPSB0aGlzLnByb3BzLnZhbHVlIClcclxuICAgICAgICAgIGNoYW5nZShkYXRlLCBzdHIpXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoIWRhdGVzLmVxKGRhdGUsIHRoaXMucHJvcHMudmFsdWUpKVxyXG4gICAgICAgIGNoYW5nZShkYXRlLCBzdHIpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgX2tleURvd246IGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgIGlmKCBlLmtleSA9PT0gJ1RhYicpXHJcbiAgICAgIHJldHVyblxyXG5cclxuICAgIGlmICggZS5rZXkgPT09ICdFc2NhcGUnICYmIHRoaXMucHJvcHMub3BlbiApXHJcbiAgICAgIHRoaXMuY2xvc2UoKVxyXG5cclxuICAgIGVsc2UgaWYgKCBlLmFsdEtleSApIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICBpZiAoIGUua2V5ID09PSAnQXJyb3dEb3duJylcclxuICAgICAgICB0aGlzLm9wZW4odGhpcy5wcm9wcy5vcGVuID09PSBwb3B1cHMuQ0FMRU5EQVJcclxuICAgICAgICAgICAgICA/IHBvcHVwcy5USU1FXHJcbiAgICAgICAgICAgICAgOiBwb3B1cHMuQ0FMRU5EQVIpXHJcbiAgICAgIGVsc2UgaWYgKCBlLmtleSA9PT0gJ0Fycm93VXAnKVxyXG4gICAgICAgIHRoaXMuY2xvc2UoKVxyXG5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5vcGVuICkge1xyXG4gICAgICBpZiggdGhpcy5wcm9wcy5vcGVuID09PSBwb3B1cHMuQ0FMRU5EQVIgKVxyXG4gICAgICAgIHRoaXMucmVmcy5jYWxQb3B1cC5fa2V5RG93bihlKVxyXG4gICAgICBpZiggdGhpcy5wcm9wcy5vcGVuID09PSBwb3B1cHMuVElNRSApXHJcbiAgICAgICAgdGhpcy5yZWZzLnRpbWVQb3B1cC5fa2V5RG93bihlKVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubm90aWZ5KCdvbktleURvd24nLCBbZV0pXHJcbiAgfSxcclxuXHJcbiAgLy90aW1lb3V0IHByZXZlbnRzIHRyYW5zaXRpb25zIGZyb20gYnJlYWtpbmcgZm9jdXNcclxuICBfZm9jdXM6IGZ1bmN0aW9uKGZvY3VzZWQsIGUpe1xyXG4gICAgdmFyIGlucHV0ID0gIHRoaXMucmVmcy52YWx1ZUlucHV0O1xyXG5cclxuICAgIHRoaXMuc2V0VGltZW91dCgnZm9jdXMnLCAoKSA9PiB7XHJcblxyXG4gICAgICBpZihmb2N1c2VkKSBpbnB1dC5nZXRET01Ob2RlKCkuZm9jdXMoKVxyXG4gICAgICBlbHNlICAgICAgICB0aGlzLmNsb3NlKClcclxuXHJcbiAgICAgIGlmKCBmb2N1c2VkICE9PSB0aGlzLnN0YXRlLmZvY3VzZWQpe1xyXG4gICAgICAgIHRoaXMubm90aWZ5KGZvY3VzZWQgPyAnb25Gb2N1cycgOiAnb25CbHVyJywgZSlcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogZm9jdXNlZCB9KVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH0sXHJcblxyXG4gIF9zZWxlY3REYXRlOiBmdW5jdGlvbihkYXRlKXtcclxuICAgIHZhciBmb3JtYXQgICA9IGdldEZvcm1hdCh0aGlzLnByb3BzKSBcclxuICAgICAgLCBkYXRlVGltZSA9IGRhdGVzLm1lcmdlKGRhdGUsIHRoaXMucHJvcHMudmFsdWUpXHJcbiAgICAgICwgZGF0ZVN0ciAgPSBmb3JtYXREYXRlKGRhdGUsIGZvcm1hdCwgdGhpcy5wcm9wcy5jdWx0dXJlKSBcclxuXHJcbiAgICB0aGlzLmNsb3NlKClcclxuICAgIHRoaXMubm90aWZ5KCdvblNlbGVjdCcsIFtkYXRlVGltZSwgZGF0ZVN0cl0pXHJcbiAgICB0aGlzLl9jaGFuZ2UoZGF0ZVRpbWUsIGRhdGVTdHIsIHRydWUpXHJcbiAgfSxcclxuXHJcbiAgX3NlbGVjdFRpbWU6IGZ1bmN0aW9uKGRhdHVtKXtcclxuICAgIHZhciBmb3JtYXQgICA9IGdldEZvcm1hdCh0aGlzLnByb3BzKSBcclxuICAgICAgLCBkYXRlVGltZSA9IGRhdGVzLm1lcmdlKHRoaXMucHJvcHMudmFsdWUsIGRhdHVtLmRhdGUpXHJcbiAgICAgICwgZGF0ZVN0ciAgPSBmb3JtYXREYXRlKGRhdHVtLmRhdGUsIGZvcm1hdCwgdGhpcy5wcm9wcy5jdWx0dXJlKSBcclxuXHJcbiAgICB0aGlzLmNsb3NlKClcclxuICAgIHRoaXMubm90aWZ5KCdvblNlbGVjdCcsIFtkYXRlVGltZSwgZGF0ZVN0cl0pXHJcbiAgICB0aGlzLl9jaGFuZ2UoZGF0ZVRpbWUsIGRhdGVTdHIsIHRydWUpXHJcbiAgfSxcclxuXHJcbiAgX2NsaWNrOiBmdW5jdGlvbih2aWV3LCBlKXtcclxuICAgIHRoaXMuX2ZvY3VzKHRydWUpXHJcbiAgICB0aGlzLnRvZ2dsZSh2aWV3LCBlKVxyXG4gIH0sXHJcblxyXG4gIF9wYXJzZTogZnVuY3Rpb24oc3RyaW5nKXtcclxuICAgIHZhciBmb3JtYXQgPSBnZXRGb3JtYXQodGhpcy5wcm9wcywgdHJ1ZSlcclxuICAgICAgLCBmb3JtYXRzID0gW107XHJcblxyXG4gICAgaWYgKCB0aGlzLnByb3BzLnBhcnNlID09PSAnZnVuY3Rpb24nIClcclxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMucGFyc2Uoc3RyaW5nLCB2KVxyXG5cclxuICAgIGlmICggdHlwZW9mIGZvcm1hdCAhPT0gJ2Z1bmN0aW9uJylcclxuICAgICAgZm9ybWF0cy5wdXNoKGZvcm1hdClcclxuXHJcbiAgICBpZiAodGhpcy5wcm9wcy5wYXJzZSlcclxuICAgICAgZm9ybWF0cyA9IGZvcm1hdHMuY29uY2F0KHByb3BzLnBhcnNlKVxyXG5cclxuICAgIGludmFyaWFudChmb3JtYXRzLmxlbmd0aCwgXHJcbiAgICAgICdSZWFjdCBXaWRnZXRzOiB0aGVyZSBhcmUgbm8gc3BlY2lmaWVkIGBwYXJzZWAgZm9ybWF0cyBwcm92aWRlZCBhbmQgdGhlIGBmb3JtYXRgIHByb3AgaXMgYSBmdW5jdGlvbi4gJyArXHJcbiAgICAgICd0aGUgRGF0ZVRpbWVQaWNrZXIgaXMgdW5hYmxlIHRvIHBhcnNlIGAlc2AgaW50byBhIGRhdGVUaW1lLCAnICtcclxuICAgICAgJ3BsZWFzZSBwcm92aWRlIGVpdGhlciBhIHBhcnNlIGZ1bmN0aW9uIG9yIEdsb2JhbGl6ZS5qcyBjb21wYXRpYmxlIHN0cmluZyBmb3JtYXQnLCBzdHJpbmcpO1xyXG5cclxuICAgIHJldHVybiBmb3JtYXRzUGFyc2VyKGZvcm1hdHMsIHRoaXMucHJvcHMuY3VsdHVyZSwgc3RyaW5nKTtcclxuICB9LFxyXG5cclxuICB0b2dnbGU6IGZ1bmN0aW9uKHZpZXcsIGUpIHtcclxuXHJcbiAgICB0aGlzLnByb3BzLm9wZW5cclxuICAgICAgPyB0aGlzLnN0YXRlLnZpZXcgIT09IHZpZXdcclxuICAgICAgICAgID8gdGhpcy5vcGVuKHZpZXcpXHJcbiAgICAgICAgICA6IHRoaXMuY2xvc2UodmlldylcclxuICAgICAgOiB0aGlzLm9wZW4odmlldylcclxuICB9LFxyXG5cclxuICBvcGVuOiBmdW5jdGlvbih2aWV3KXtcclxuICAgIGlmICggdGhpcy5wcm9wcy5vcGVuICE9PSB2aWV3ICYmIHRoaXMucHJvcHNbdmlld10gPT09IHRydWUgKVxyXG4gICAgICB0aGlzLm5vdGlmeSgnb25Ub2dnbGUnLCB2aWV3KVxyXG4gIH0sXHJcblxyXG4gIGNsb3NlOiBmdW5jdGlvbigpe1xyXG4gICAgaWYgKCB0aGlzLnByb3BzLm9wZW4gKVxyXG4gICAgICB0aGlzLm5vdGlmeSgnb25Ub2dnbGUnLCBmYWxzZSlcclxuICB9LFxyXG5cclxuICBpblJhbmdlVmFsdWU6IGZ1bmN0aW9uKHZhbHVlKXtcclxuICAgIGlmKCB2YWx1ZSA9PSBudWxsKSByZXR1cm4gdmFsdWVcclxuXHJcbiAgICByZXR1cm4gZGF0ZXMubWF4KFxyXG4gICAgICAgIGRhdGVzLm1pbih2YWx1ZSwgdGhpcy5wcm9wcy5tYXgpXHJcbiAgICAgICwgdGhpcy5wcm9wcy5taW4pXHJcbiAgfSxcclxuXHJcbn0pO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVW5jb250cm9sbGVkV2lkZ2V0KFxyXG4gICAgRGF0ZVRpbWVQaWNrZXJcclxuICAsIHsgb3BlbjogJ29uVG9nZ2xlJywgdmFsdWU6ICdvbkNoYW5nZScgfSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5CYXNlRGF0ZVRpbWVQaWNrZXIgPSBEYXRlVGltZVBpY2tlclxyXG5cclxuZnVuY3Rpb24gZ2V0Rm9ybWF0KHByb3BzKXtcclxuICB2YXIgY2FsICA9IHByb3BzW3BvcHVwcy5DQUxFTkRBUl0gIT0gbnVsbCA/IHByb3BzLmNhbGVuZGFyIDogdHJ1ZVxyXG4gICAgLCB0aW1lID0gcHJvcHNbcG9wdXBzLlRJTUVdICE9IG51bGwgPyBwcm9wcy50aW1lIDogdHJ1ZTtcclxuIFxyXG4gIHJldHVybiBwcm9wcy5mb3JtYXQgXHJcbiAgICA/IHByb3BzLmZvcm1hdCBcclxuICAgIDogKGNhbCAmJiB0aW1lKSB8fCAoIWNhbCAmJiAhdGltZSlcclxuICAgICAgPyAnZidcclxuICAgICAgOiBjYWwgPyAnZCcgOiAndCdcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQsIGN1bHR1cmUpe1xyXG4gIHZhciB2YWwgPSAnJ1xyXG5cclxuICBpZiAoKGRhdGUgaW5zdGFuY2VvZiBEYXRlKSAmJiAhaXNOYU4oZGF0ZS5nZXRUaW1lKCkpKVxyXG4gICAgdmFsID0gZGF0ZXMuZm9ybWF0KGRhdGUsIGZvcm1hdCwgY3VsdHVyZSlcclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0c1BhcnNlcihmb3JtYXRzLCBjdWx0dXJlLCBzdHIpe1xyXG4gIHZhciBkYXRlO1xyXG5cclxuICBmb3IgKHZhciBpPTA7IGkgPCBmb3JtYXRzLmxlbmd0aDsgaSsrICl7XHJcbiAgICBkYXRlID0gZGF0ZXMucGFyc2Uoc3RyLCBmb3JtYXRzW2ldLCBjdWx0dXJlKVxyXG4gICAgaWYgKGRhdGUpIHJldHVybiBkYXRlXHJcbiAgfVxyXG4gIHJldHVybiBudWxsXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRhdGVPck51bGwoZHQpe1xyXG4gIGlmIChkdCAmJiAhaXNOYU4oZHQuZ2V0VGltZSgpKSkgcmV0dXJuIGR0XHJcbiAgcmV0dXJuIG51bGxcclxufVxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvRGF0ZVRpbWVQaWNrZXIuanN4XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgID0gcmVxdWlyZSgncmVhY3QnKVxyXG4gICwgJCA9IHJlcXVpcmUoJy4vdXRpbC9kb20nKVxyXG4gICwgY3ggPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XHJcblxyXG5cclxudmFyIFBvcHVwQ29udGVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgQ29udGVudCA9IFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbilcclxuXHJcbiAgICBDb250ZW50LnByb3BzLmNsYXNzTmFtZSA9IChDb250ZW50LnByb3BzLmNsYXNzTmFtZSB8fCAnJykgKyAnIHJ3LXBvcHVwIHJ3LXdpZGdldCc7XHJcblxyXG4gICAgcmV0dXJuIENvbnRlbnRcclxuICB9XHJcbn0pXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgb3BlbjogICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgZHJvcFVwOiAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgZHVyYXRpb246ICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcblxyXG4gICAgb25SZXF1ZXN0Q2xvc2U6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBvbkNsb3Npbmc6ICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbk9wZW5pbmc6ICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbkNsb3NlOiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBvbk9wZW46ICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmNcclxuICB9LFxyXG5cclxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBkdXJhdGlvbjogICAgMjAwLFxyXG4gICAgICBvcGVuOiAgICAgICAgZmFsc2UsXHJcbiAgICAgIG9uQ2xvc2luZzogICBmdW5jdGlvbigpe30sXHJcbiAgICAgIG9uT3BlbmluZzogICBmdW5jdGlvbigpe30sXHJcbiAgICAgIG9uQ2xvc2U6ICAgICBmdW5jdGlvbigpe30sXHJcbiAgICAgIG9uT3BlbjogICAgICBmdW5jdGlvbigpe30sXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAhdGhpcy5wcm9wcy5vcGVuICYmIHRoaXMuY2xvc2UoMClcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBjb250ZW50Q2hhbmdlZDogY2hpbGRLZXkobmV4dFByb3BzLmNoaWxkcmVuKSAhPT0gY2hpbGRLZXkodGhpcy5wcm9wcy5jaGlsZHJlbilcclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbihwdlByb3BzLCBwdlN0YXRlKXtcclxuICAgIHZhciBjbG9zaW5nID0gIHB2UHJvcHMub3BlbiAmJiAhdGhpcy5wcm9wcy5vcGVuXHJcbiAgICAgICwgb3BlbmluZyA9ICFwdlByb3BzLm9wZW4gJiYgdGhpcy5wcm9wcy5vcGVuO1xyXG5cclxuICAgIGlmIChvcGVuaW5nKSAgICAgIHRoaXMub3BlbigpXHJcbiAgICBlbHNlIGlmIChjbG9zaW5nKSB0aGlzLmNsb3NlKClcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgeyBcclxuICAgICAgICBjbGFzc05hbWVcclxuICAgICAgLCBvcGVuXHJcbiAgICAgICwgZHJvcFVwXHJcbiAgICAgICwgLi4ucHJvcHMgfSA9IHRoaXMucHJvcHNcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IHsuLi5wcm9wc30gY2xhc3NOYW1lPXtjeChjbGFzc05hbWUsIFwicnctcG9wdXAtY29udGFpbmVyXCIsIHsgXCJydy1kcm9wdXBcIjogZHJvcFVwIH0pfT5cclxuICAgICAgICA8UG9wdXBDb250ZW50IHJlZj0nY29udGVudCc+XHJcbiAgICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxyXG4gICAgICAgIDwvUG9wdXBDb250ZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9LFxyXG5cclxuICBkaW1lbnNpb25zOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGVsID0gdGhpcy5nZXRET01Ob2RlKClcclxuICAgICAgLCBjb250ZW50ID0gdGhpcy5yZWZzLmNvbnRlbnQuZ2V0RE9NTm9kZSgpXHJcbiAgICAgICwgbWFyZ2luID0gcGFyc2VJbnQoJC5jc3MoY29udGVudCwgJ21hcmdpbi10b3AnKSwgMTApXHJcbiAgICAgICAgICAgICAgICsgcGFyc2VJbnQoJC5jc3MoY29udGVudCwgJ21hcmdpbi1ib3R0b20nKSwgMTApO1xyXG5cclxuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXHJcbiAgICBlbC5zdHlsZS5oZWlnaHQgID0gJC5oZWlnaHQoY29udGVudCkgKyAoaXNOYU4obWFyZ2luKSA/IDAgOiBtYXJnaW4gKSArICdweCdcclxuICB9LFxyXG5cclxuICBvcGVuOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgICwgYW5pbSA9IHRoaXMuZ2V0RE9NTm9kZSgpXHJcbiAgICAgICwgZWwgICA9IHRoaXMucmVmcy5jb250ZW50LmdldERPTU5vZGUoKTtcclxuXHJcbiAgICB0aGlzLk9SR0lOQUxfUE9TSVRJT04gPSAkLmNzcyhlbCwgJ3Bvc2l0aW9uJylcclxuXHJcbiAgICB0aGlzLl9pc09wZW5pbmcgPSB0cnVlXHJcbiAgICB0aGlzLmRpbWVuc2lvbnMoKVxyXG4gICAgdGhpcy5wcm9wcy5vbk9wZW5pbmcoKVxyXG5cclxuICAgIGFuaW0uY2xhc3NOYW1lICs9ICcgcnctcG9wdXAtYW5pbWF0aW5nJ1xyXG4gICAgZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXHJcblxyXG4gICAgJC5hbmltYXRlKGVsXHJcbiAgICAgICwgeyB0b3A6IDAgfVxyXG4gICAgICAsIHNlbGYucHJvcHMuZHVyYXRpb25cclxuICAgICAgLCAnZWFzZSdcclxuICAgICAgLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgaWYgKCAhc2VsZi5faXNPcGVuaW5nICkgcmV0dXJuXHJcblxyXG4gICAgICAgICAgYW5pbS5jbGFzc05hbWUgPSBhbmltLmNsYXNzTmFtZS5yZXBsYWNlKC8gP3J3LXBvcHVwLWFuaW1hdGluZy9nLCAnJylcclxuXHJcbiAgICAgICAgICBlbC5zdHlsZS5wb3NpdGlvbiA9IHNlbGYuT1JHSU5BTF9QT1NJVElPTlxyXG4gICAgICAgICAgYW5pbS5zdHlsZS5vdmVyZmxvdyA9ICd2aXNpYmxlJ1xyXG4gICAgICAgICAgc2VsZi5PUkdJTkFMX1BPU0lUSU9OID0gbnVsbFxyXG5cclxuICAgICAgICAgIHNlbGYucHJvcHMub25PcGVuKClcclxuICAgICAgICB9KVxyXG4gIH0sXHJcblxyXG4gIGNsb3NlOiBmdW5jdGlvbihkdXIpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgICwgZWwgICA9IHRoaXMucmVmcy5jb250ZW50LmdldERPTU5vZGUoKVxyXG4gICAgICAsIGFuaW0gPSB0aGlzLmdldERPTU5vZGUoKTtcclxuXHJcbiAgICB0aGlzLk9SR0lOQUxfUE9TSVRJT04gPSAkLmNzcyhlbCwgJ3Bvc2l0aW9uJylcclxuXHJcbiAgICB0aGlzLl9pc09wZW5pbmcgPSBmYWxzZVxyXG4gICAgdGhpcy5kaW1lbnNpb25zKClcclxuICAgIHRoaXMucHJvcHMub25DbG9zaW5nKClcclxuXHJcbiAgICBhbmltLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcclxuICAgIGFuaW0uY2xhc3NOYW1lICs9ICcgcnctcG9wdXAtYW5pbWF0aW5nJ1xyXG4gICAgZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXHJcblxyXG4gICAgJC5hbmltYXRlKGVsXHJcbiAgICAgICwgeyB0b3A6IHRoaXMucHJvcHMuZHJvcFVwID8gJzEwMCUnIDogJy0xMDAlJyB9XHJcbiAgICAgICwgZHVyID09PSB1bmRlZmluZWQgPyB0aGlzLnByb3BzLmR1cmF0aW9uIDogZHVyXHJcbiAgICAgICwgJ2Vhc2UnXHJcbiAgICAgICwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAoIHNlbGYuX2lzT3BlbmluZyApIHJldHVyblxyXG5cclxuICAgICAgICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gc2VsZi5PUkdJTkFMX1BPU0lUSU9OXHJcbiAgICAgICAgICBhbmltLmNsYXNzTmFtZSA9IGFuaW0uY2xhc3NOYW1lLnJlcGxhY2UoLyA/cnctcG9wdXAtYW5pbWF0aW5nL2csICcnKVxyXG5cclxuICAgICAgICAgIGFuaW0uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgc2VsZi5PUkdJTkFMX1BPU0lUSU9OID0gbnVsbFxyXG4gICAgICAgICAgc2VsZi5wcm9wcy5vbkNsb3NlKClcclxuICAgICAgICB9KVxyXG4gIH1cclxuXHJcbn0pXHJcblxyXG5cclxuZnVuY3Rpb24gY2hpbGRLZXkoY2hpbGRyZW4pe1xyXG4gIHZhciBuZXh0Q2hpbGRNYXBwaW5nID0gUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCBjID0+IGMgKTtcclxuICBmb3IodmFyIGtleSBpbiBuZXh0Q2hpbGRNYXBwaW5nKSByZXR1cm4ga2V5XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9Qb3B1cC5qc3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBSZWFjdCAgID0gcmVxdWlyZSgncmVhY3QnKVxyXG4gICwgQ3VzdG9tUHJvcFR5cGVzICA9IHJlcXVpcmUoJy4vdXRpbC9wcm9wVHlwZXMnKVxyXG4gICwgY3ggPSByZXF1aXJlKCdjbGFzc25hbWVzJylcclxuICAsIF8gID0gcmVxdWlyZSgnLi91dGlsL18nKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgZGlzcGxheU5hbWU6ICdMaXN0JyxcclxuXHJcbiAgbWl4aW5zOiBbIFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvV2lkZ2V0TWl4aW4nKSxcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL0RhdGFIZWxwZXJzTWl4aW4nKSxcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL0xpc3RNb3ZlbWVudE1peGluJylcclxuICBdLFxyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGRhdGE6ICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5hcnJheSxcclxuICAgIG9uU2VsZWN0OiAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgb25Nb3ZlOiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICBpdGVtQ29tcG9uZW50OiBDdXN0b21Qcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcblxyXG4gICAgc2VsZWN0ZWRJbmRleDogUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgIGZvY3VzZWRJbmRleDogIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcbiAgICB2YWx1ZUZpZWxkOiAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdGV4dEZpZWxkOiAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHJcbiAgICBvcHRJRDogICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cclxuICAgIG1lc3NhZ2VzOiAgICAgIFJlYWN0LlByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICAgIGVtcHR5TGlzdDogICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcbiAgICB9KSxcclxuICB9LFxyXG5cclxuXHJcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgb3B0SUQ6ICAgICAgICAgJycsXHJcbiAgICAgIG9uU2VsZWN0OiAgICAgICgpPT57fSxcclxuICAgICAgZGF0YTogICAgICAgICAgW10sXHJcbiAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgZW1wdHlMaXN0OiAgIFwiVGhlcmUgYXJlIG5vIGl0ZW1zIGluIHRoaXMgbGlzdFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKXtcclxuICAgIHJldHVybiB7fVxyXG4gIH0sXHJcblxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgdGhpcy5fc2V0U2Nyb2xsUG9zaXRpb24oKVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpe1xyXG4gICAgaWYgKCBwcmV2UHJvcHMuZm9jdXNlZCAhPT0gdGhpcy5wcm9wcy5mb2N1c2VkKVxyXG4gICAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbigpXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICB2YXIgeyBjbGFzc05hbWUsIC4uLnByb3BzIH0gPSBfLm9taXQodGhpcy5wcm9wcywgWydkYXRhJ10pXHJcbiAgICAgICwgSXRlbUNvbXBvbmVudCA9IHRoaXMucHJvcHMuaXRlbUNvbXBvbmVudFxyXG4gICAgICAsIGl0ZW1zO1xyXG4gICAgXHJcbiAgICBpdGVtcyA9ICF0aGlzLnByb3BzLmRhdGEubGVuZ3RoIFxyXG4gICAgICA/IDxsaT57IHRoaXMucHJvcHMubWVzc2FnZXMuZW1wdHlMaXN0IH08L2xpPlxyXG4gICAgICA6IHRoaXMucHJvcHMuZGF0YS5tYXAoKGl0ZW0sIGlkeCkgPT57XHJcbiAgICAgICAgICB2YXIgZm9jdXNlZCAgPSBpdGVtID09PSB0aGlzLnByb3BzLmZvY3VzZWQgXHJcbiAgICAgICAgICAgICwgc2VsZWN0ZWQgPSBpdGVtID09PSB0aGlzLnByb3BzLnNlbGVjdGVkO1xyXG5cclxuICAgICAgICAgIHJldHVybiAoPGxpIFxyXG4gICAgICAgICAgICB0YWJJbmRleD0nLTEnXHJcbiAgICAgICAgICAgIGtleT17J2l0ZW1fJyArIGlkeH1cclxuICAgICAgICAgICAgcm9sZT0nb3B0aW9uJ1xyXG4gICAgICAgICAgICBpZD17IGZvY3VzZWQgPyB0aGlzLnByb3BzLm9wdElEIDogdW5kZWZpbmVkIH1cclxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsZWN0ZWR9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goeyBcclxuICAgICAgICAgICAgICAncnctbGlzdC1vcHRpb24nOiAgICB0cnVlLFxyXG4gICAgICAgICAgICAgICdydy1zdGF0ZS1mb2N1cyc6ICAgIGZvY3VzZWQsXHJcbiAgICAgICAgICAgICAgJ3J3LXN0YXRlLXNlbGVjdGVkJzogc2VsZWN0ZWQsXHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLm9uU2VsZWN0LmJpbmQobnVsbCwgaXRlbSl9PlxyXG4gICAgICAgICAgICB7IEl0ZW1Db21wb25lbnRcclxuICAgICAgICAgICAgICAgID8gPEl0ZW1Db21wb25lbnQgaXRlbT17aXRlbX0vPlxyXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9kYXRhVGV4dChpdGVtKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICA8L2xpPilcclxuICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHVsIHsgLi4ucHJvcHMgfSBcclxuICAgICAgICBjbGFzc05hbWU9eyAoY2xhc3NOYW1lIHx8ICcnKSArICcgcnctbGlzdCcgfSBcclxuICAgICAgICByZWY9J3Njcm9sbGFibGUnXHJcbiAgICAgICAgcm9sZT0nbGlzdGJveCc+XHJcbiAgICAgICAgICB7IGl0ZW1zIH1cclxuICAgICAgPC91bD5cclxuICAgIClcclxuICB9LFxyXG5cclxuICBfZGF0YSgpeyBcclxuICAgIHJldHVybiB0aGlzLnByb3BzLmRhdGEgXHJcbiAgfSxcclxuXHJcbiAgX3NldFNjcm9sbFBvc2l0aW9uOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGxpc3QgPSB0aGlzLmdldERPTU5vZGUoKVxyXG4gICAgICAsIGlkeCAgPSB0aGlzLl9kYXRhKCkuaW5kZXhPZih0aGlzLnByb3BzLmZvY3VzZWQpXHJcbiAgICAgICwgc2VsZWN0ZWQgPSBsaXN0LmNoaWxkcmVuW2lkeF07XHJcblxyXG4gICAgaWYoICFzZWxlY3RlZCApIHJldHVybiBcclxuXHJcbiAgICB0aGlzLm5vdGlmeSgnb25Nb3ZlJywgWyBzZWxlY3RlZCwgbGlzdCBdKVxyXG4gIH1cclxuXHJcbn0pXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL0xpc3QuanN4XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgXyA9IHJlcXVpcmUoJy4vXycpOyAvL29iamVjdFxyXG5cclxudmFyIHZpZXdzID0ge1xyXG4gICAgTU9OVEg6ICAgJ21vbnRoJyxcclxuICAgIFlFQVI6ICAgICd5ZWFyJyxcclxuICAgIERFQ0FERTogICdkZWNhZGUnLFxyXG4gICAgQ0VOVFVSWTogJ2NlbnR1cnknXHJcbiAgfVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIGRpcmVjdGlvbnM6IHtcclxuICAgIExFRlQ6ICAnTEVGVCcsXHJcbiAgICBSSUdIVDogJ1JJR0hUJyxcclxuICAgIFVQOiAgICAnVVAnLFxyXG4gICAgRE9XTjogICdET1dOJ1xyXG4gIH0sXHJcblxyXG4gIGRhdGVQb3B1cHM6IHtcclxuICAgIFRJTUU6ICAgICAndGltZScsXHJcbiAgICBDQUxFTkRBUjogJ2NhbGVuZGFyJ1xyXG4gIH0sXHJcblxyXG4gIGNhbGVuZGFyVmlld3M6IHZpZXdzLFxyXG5cclxuICBjYWxlbmRhclZpZXdIaWVyYXJjaHk6IHtcclxuICAgIFt2aWV3cy5NT05USF06ICAgdmlld3MuWUVBUixcclxuICAgIFt2aWV3cy5ZRUFSXTogICAgdmlld3MuREVDQURFLFxyXG4gICAgW3ZpZXdzLkRFQ0FERV06ICB2aWV3cy5DRU5UVVJZXHJcbiAgfSxcclxuXHJcbiAgY2FsZW5kYXJWaWV3VW5pdHM6IHtcclxuICAgIFt2aWV3cy5NT05USF06ICAgdmlld3MuREFZLFxyXG4gICAgW3ZpZXdzLllFQVJdOiAgICB2aWV3cy5NT05USCxcclxuICAgIFt2aWV3cy5ERUNBREVdOiAgdmlld3MuWUVBUixcclxuICAgIFt2aWV3cy5DRU5UVVJZXTogdmlld3MuREVDQURFLFxyXG4gIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2NvbnN0YW50cy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ICAgICAgICAgICA9IHJlcXVpcmUoJ3JlYWN0JylcclxuICAsIGN4ICAgICAgICAgICAgICA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKVxyXG4gICwgXyAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi91dGlsL18nKVxyXG4gICwgU2VsZWN0SW5wdXQgICAgID0gcmVxdWlyZSgnLi9NdWx0aXNlbGVjdElucHV0JylcclxuICAsIFRhZ0xpc3QgICAgICAgICA9IHJlcXVpcmUoJy4vTXVsdGlzZWxlY3RUYWdMaXN0JylcclxuICAsIFBvcHVwICAgICAgICAgICA9IHJlcXVpcmUoJy4vUG9wdXAnKVxyXG4gICwgUGxhaW5MaXN0ICAgICAgID0gcmVxdWlyZSgnLi9MaXN0JylcclxuICAsIEdyb3VwYWJsZUxpc3QgICA9IHJlcXVpcmUoJy4vTGlzdEdyb3VwYWJsZScpXHJcbiAgLCB2YWxpZGF0ZUxpc3QgICAgPSByZXF1aXJlKCcuL3V0aWwvdmFsaWRhdGVMaXN0SW50ZXJmYWNlJylcclxuICAsIGNyZWF0ZVVuY29udHJvbGxlZFdpZGdldCA9IHJlcXVpcmUoJ3VuY29udHJvbGxhYmxlJylcclxuICAsIEN1c3RvbVByb3BUeXBlcyA9IHJlcXVpcmUoJy4vdXRpbC9wcm9wVHlwZXMnKTtcclxuXHJcbnZhciBwcm9wVHlwZXMgPSB7XHJcbiAgICAgIGRhdGE6ICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgICAvLy0tIGNvbnRyb2xsZWQgcHJvcHMgLS1cclxuICAgICAgdmFsdWU6ICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgIG9uQ2hhbmdlOiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblxyXG4gICAgICBzZWFyY2hUZXJtOiAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgIG9uU2VhcmNoOiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblxyXG4gICAgICBvcGVuOiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICBvblRvZ2dsZTogICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgIHZhbHVlRmllbGQ6ICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgdGV4dEZpZWxkOiAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cclxuICAgICAgdGFnQ29tcG9uZW50OiAgICBDdXN0b21Qcm9wVHlwZXMuZWxlbWVudFR5cGUsXHJcbiAgICAgIGl0ZW1Db21wb25lbnQ6ICAgQ3VzdG9tUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxyXG4gICAgICBsaXN0Q29tcG9uZW50OiAgIEN1c3RvbVByb3BUeXBlcy5lbGVtZW50VHlwZSxcclxuXHJcbiAgICAgIGdyb3VwQ29tcG9uZW50OiAgQ3VzdG9tUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxyXG4gICAgICBncm91cEJ5OiAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgXSksXHJcblxyXG4gICAgICBvblNlbGVjdDogICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgICBvbkNyZWF0ZTogICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG5cclxuICAgICAgZHJvcFVwOiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgICAgZHVyYXRpb246ICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLCAvL3BvcHVwXHJcblxyXG4gICAgICBwbGFjZWhvbGRlcjogICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblxyXG4gICAgICBkaXNhYmxlZDogICAgICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydkaXNhYmxlZCddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgXSksXHJcblxyXG4gICAgICByZWFkT25seTogICAgICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydyZWFkb25seSddKVxyXG4gICAgICAgICAgICAgICAgICAgICAgIF0pLFxyXG5cclxuICAgICAgbWVzc2FnZXM6ICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgIG9wZW46ICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgZW1wdHlMaXN0OiAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBlbXB0eUZpbHRlcjogICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcbiAgICAgIH0pXHJcbiAgICB9O1xyXG5cclxudmFyIE11bHRpc2VsZWN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBkaXNwbGF5TmFtZTogJ011bHRpc2VsZWN0JyxcclxuXHJcbiAgbWl4aW5zOiBbXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9XaWRnZXRNaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvVGltZW91dE1peGluJyksXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9EYXRhRmlsdGVyTWl4aW4nKSxcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL0RhdGFIZWxwZXJzTWl4aW4nKSxcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL1BvcHVwU2Nyb2xsVG9NaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvUnRsUGFyZW50Q29udGV4dE1peGluJylcclxuICBdLFxyXG5cclxuICBwcm9wVHlwZXM6IHByb3BUeXBlcyxcclxuXHJcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZGF0YTogW10sXHJcbiAgICAgIGZpbHRlcjogJ3N0YXJ0c1dpdGgnLFxyXG4gICAgICB2YWx1ZTogW10sXHJcbiAgICAgIG9wZW46IGZhbHNlLFxyXG4gICAgICBzZWFyY2hUZXJtOiAnJyxcclxuICAgICAgbWVzc2FnZXM6IHtcclxuICAgICAgICBjcmVhdGVOZXc6ICAgXCIoY3JlYXRlIG5ldyB0YWcpXCIsXHJcbiAgICAgICAgZW1wdHlMaXN0OiAgIFwiVGhlcmUgYXJlIG5vIGl0ZW1zIGluIHRoaXMgbGlzdFwiLFxyXG4gICAgICAgIGVtcHR5RmlsdGVyOiBcIlRoZSBmaWx0ZXIgcmV0dXJuZWQgbm8gcmVzdWx0c1wiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZGF0YUl0ZW1zID0gXy5zcGxhdCh0aGlzLnByb3BzLnZhbHVlKS5tYXAoIGl0ZW0gPT4gdGhpcy5fZGF0YUl0ZW0odGhpcy5wcm9wcy5kYXRhLCBpdGVtKSkgXHJcbiAgICAgICwgZGF0YSA9IHRoaXMucHJvY2Vzcyh0aGlzLnByb3BzLmRhdGEsIGRhdGFJdGVtcywgdGhpcy5wcm9wcy5zZWFyY2hUZXJtKVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZvY3VzZWRJdGVtOiAgIGRhdGFbMF0sXHJcbiAgICAgIHByb2Nlc3NlZERhdGE6IGRhdGEsXHJcbiAgICAgIGRhdGFJdGVtczogICAgIGRhdGFJdGVtc1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgIHZhbGlkYXRlTGlzdCh0aGlzLnJlZnMubGlzdClcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgIHZhciB2YWx1ZXMgPSBfLnNwbGF0KG5leHRQcm9wcy52YWx1ZSlcclxuICAgICAgLCBjdXJyZW50ID0gdGhpcy5zdGF0ZS5mb2N1c2VkSXRlbVxyXG4gICAgICAsIGl0ZW1zICA9IHRoaXMucHJvY2VzcyhuZXh0UHJvcHMuZGF0YSwgdmFsdWVzLCBuZXh0UHJvcHMuc2VhcmNoVGVybSlcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgcHJvY2Vzc2VkRGF0YTogaXRlbXMsXHJcbiAgICAgIGZvY3VzZWRJdGVtOiBpdGVtcy5pbmRleE9mKGN1cnJlbnQpID09PSAtMSA/IGl0ZW1zWzBdOiBjdXJyZW50LFxyXG4gICAgICBkYXRhSXRlbXM6IHZhbHVlcy5tYXAoIGl0ZW0gPT4gdGhpcy5fZGF0YUl0ZW0obmV4dFByb3BzLmRhdGEsIGl0ZW0pKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgeyBcclxuICAgICAgICBjbGFzc05hbWVcclxuICAgICAgLCBjaGlsZHJlblxyXG4gICAgICAsIC4uLnByb3BzIH0gPSBfLm9taXQodGhpcy5wcm9wcywgT2JqZWN0LmtleXMocHJvcFR5cGVzKSlcclxuXHJcbiAgICAgICwgbGlzdElEID0gdGhpcy5faWQoJ19saXN0Ym94JylcclxuICAgICAgLCBvcHRJRCAgPSB0aGlzLl9pZCgnX29wdGlvbicpXHJcbiAgICAgICwgaXRlbXMgID0gdGhpcy5fZGF0YSgpXHJcbiAgICAgICwgdmFsdWVzID0gdGhpcy5zdGF0ZS5kYXRhSXRlbXNcclxuICAgICAgLCBkcm9wVXAgPSB0aGlzLnByb3BzLmRyb3BVcFxyXG5cclxuICAgICAgLCBMaXN0ICAgPSB0aGlzLnByb3BzLmxpc3RDb21wb25lbnQgfHwgKHRoaXMucHJvcHMuZ3JvdXBCeSAmJiBHcm91cGFibGVMaXN0KSB8fCBQbGFpbkxpc3RcclxuICAgICAgLCBsaXN0UHJvcHMgID0gXy5waWNrKHRoaXMucHJvcHMsIE9iamVjdC5rZXlzKExpc3QudHlwZS5wcm9wVHlwZXMpKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IHsuLi5wcm9wc31cclxuICAgICAgICByZWY9XCJlbGVtZW50XCJcclxuICAgICAgICBvbktleURvd249e3RoaXMuX21heWJlSGFuZGxlKHRoaXMuX2tleURvd24pfVxyXG4gICAgICAgIG9uRm9jdXM9e3RoaXMuX21heWJlSGFuZGxlKHRoaXMuX2ZvY3VzLmJpbmQobnVsbCwgdHJ1ZSksIHRydWUpfVxyXG4gICAgICAgIG9uQmx1ciA9e3RoaXMuX2ZvY3VzLmJpbmQobnVsbCwgZmFsc2UpfVxyXG4gICAgICAgIHRhYkluZGV4PVwiLTFcIlxyXG4gICAgICAgIGNsYXNzTmFtZT17Y3goY2xhc3NOYW1lLCAncnctbXVsdGlzZWxlY3QnLCAncnctd2lkZ2V0Jywge1xyXG4gICAgICAgICAgJ3J3LXN0YXRlLWZvY3VzJzogICAgdGhpcy5zdGF0ZS5mb2N1c2VkLFxyXG4gICAgICAgICAgJ3J3LXN0YXRlLWRpc2FibGVkJzogdGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdHJ1ZSxcclxuICAgICAgICAgICdydy1zdGF0ZS1yZWFkb25seSc6IHRoaXMucHJvcHMucmVhZE9ubHkgPT09IHRydWUsXHJcbiAgICAgICAgICAncnctcnRsJzogICAgICAgICAgICB0aGlzLmlzUnRsKCksXHJcblxyXG4gICAgICAgICAgWydydy1vcGVuJyArIChkcm9wVXAgPyAnLXVwJyA6ICcnKV06IHRoaXMucHJvcHMub3BlblxyXG5cclxuICAgICAgICB9KX0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3J3LW11bHRpc2VsZWN0LXdyYXBwZXInPlxyXG4gICAgICAgICAgeyB0aGlzLnByb3BzLmJ1c3kgJiZcclxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwicnctaSBydy1sb2FkaW5nXCI+PC9pPlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgeyAhIXZhbHVlcy5sZW5ndGggJiZcclxuICAgICAgICAgICAgPFRhZ0xpc3RcclxuICAgICAgICAgICAgICByZWY9J3RhZ0xpc3QnXHJcbiAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlc31cclxuICAgICAgICAgICAgICB0ZXh0RmllbGQ9e3RoaXMucHJvcHMudGV4dEZpZWxkfVxyXG4gICAgICAgICAgICAgIHZhbHVlRmllbGQ9e3RoaXMucHJvcHMudmFsdWVGaWVsZH1cclxuICAgICAgICAgICAgICB2YWx1ZUNvbXBvbmVudD17dGhpcy5wcm9wcy50YWdDb21wb25lbnR9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9e3RoaXMucHJvcHMucmVhZE9ubHl9XHJcbiAgICAgICAgICAgICAgb25EZWxldGU9e3RoaXMuX2RlbGV0ZX0vPlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgPFNlbGVjdElucHV0IFxyXG4gICAgICAgICAgICByZWY9J2lucHV0J1xyXG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRlbnQ9eyB0aGlzLnByb3BzLm9wZW4gPyBvcHRJRCA6IHVuZGVmaW5lZCB9XHJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9eyB0aGlzLnByb3BzLm9wZW4gfVxyXG4gICAgICAgICAgICBhcmlhLWJ1c3k9eyEhdGhpcy5wcm9wcy5idXN5fVxyXG4gICAgICAgICAgICBhcmlhLW93bnM9e2xpc3RJRH1cclxuICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD17dHJ1ZX1cclxuICAgICAgICAgICAgdmFsdWU9e3RoaXMucHJvcHMuc2VhcmNoVGVybX1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWQgPT09IHRydWV9XHJcbiAgICAgICAgICAgIHJlYWRPbmx5PXt0aGlzLnByb3BzLnJlYWRPbmx5ID09PSB0cnVlfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5fcGxhY2Vob2xkZXIoKX1cclxuICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLl9zZWFyY2hLZXlEb3dufVxyXG4gICAgICAgICAgICBvbktleVVwPXt0aGlzLl9zZWFyY2hnS2V5VXB9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLl90eXBpbmd9XHJcbiAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuX2lucHV0Rm9jdXN9XHJcbiAgICAgICAgICAgIG1heExlbmd0aD17dGhpcy5wcm9wcy5tYXhMZW5ndGh9Lz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8UG9wdXAgey4uLl8ucGljayh0aGlzLnByb3BzLCBPYmplY3Qua2V5cyhQb3B1cC50eXBlLnByb3BUeXBlcykpfVxyXG4gICAgICAgICAgb25SZXF1ZXN0Q2xvc2U9e3RoaXMuY2xvc2V9PlxyXG5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxMaXN0IHJlZj1cImxpc3RcIlxyXG4gICAgICAgICAgICAgIHsuLi5saXN0UHJvcHN9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyEhbGlzdFByb3BzLnJlYWRPbmx5fVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXshIWxpc3RQcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgICAgICBpZD17bGlzdElEfVxyXG4gICAgICAgICAgICAgIG9wdElEPXtvcHRJRH1cclxuICAgICAgICAgICAgICBhcmlhLWF1dG9jb21wbGV0ZT0nbGlzdCdcclxuICAgICAgICAgICAgICBhcmlhLWhpZGRlbj17IXRoaXMucHJvcHMub3Blbn1cclxuICAgICAgICAgICAgICBkYXRhPXtpdGVtc31cclxuICAgICAgICAgICAgICBmb2N1c2VkPXt0aGlzLnN0YXRlLmZvY3VzZWRJdGVtfVxyXG4gICAgICAgICAgICAgIG9uU2VsZWN0PXt0aGlzLl9tYXliZUhhbmRsZSh0aGlzLl9vblNlbGVjdCl9XHJcbiAgICAgICAgICAgICAgb25Nb3ZlPXt0aGlzLl9zY3JvbGxUb31cclxuICAgICAgICAgICAgICBtZXNzYWdlcz17e1xyXG4gICAgICAgICAgICAgICAgZW1wdHlMaXN0OiB0aGlzLnByb3BzLmRhdGEubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5tZXNzYWdlcy5lbXB0eUZpbHRlclxyXG4gICAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMubWVzc2FnZXMuZW1wdHlMaXN0XHJcbiAgICAgICAgICAgICAgfX0vPlxyXG4gICAgICAgICAgICAgIHsgdGhpcy5fc2hvdWxkU2hvd0NyZWF0ZSgpICYmXHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwicnctbGlzdCBydy1tdWx0aXNlbGVjdC1jcmVhdGUtdGFnXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxsaSBvbkNsaWNrPXt0aGlzLl9vbkNyZWF0ZS5iaW5kKG51bGwsIHRoaXMucHJvcHMuc2VhcmNoVGVybSl9IFxyXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdydy1saXN0LW9wdGlvbic6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdydy1zdGF0ZS1mb2N1cyc6ICF0aGlzLl9kYXRhKCkubGVuZ3RoIHx8IHRoaXMuc3RhdGUuZm9jdXNlZEl0ZW0gPT09IG51bGwgXHJcbiAgICAgICAgICAgICAgICAgICAgICB9KX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz57YFwiJHt0aGlzLnByb3BzLnNlYXJjaFRlcm19XCJgfTwvc3Ryb25nPiB7IHRoaXMucHJvcHMubWVzc2FnZXMuY3JlYXRlTmV3IH1cclxuICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9Qb3B1cD5cclxuICAgICAgPC9kaXY+XHJcbiAgICApXHJcbiAgfSxcclxuXHJcbiAgX2RhdGEoKXtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLnByb2Nlc3NlZERhdGFcclxuICB9LFxyXG5cclxuICBfZGVsZXRlKHZhbHVlKXtcclxuICAgIHRoaXMuX2ZvY3VzKHRydWUpXHJcbiAgICB0aGlzLmNoYW5nZShcclxuICAgICAgdGhpcy5zdGF0ZS5kYXRhSXRlbXMuZmlsdGVyKCBkID0+IGQgIT09IHZhbHVlKSlcclxuICB9LFxyXG5cclxuICBfaW5wdXRGb2N1cyhlKXtcclxuICAgIHRoaXMuX2ZvY3VzKHRydWUpXHJcbiAgICAhdGhpcy5wcm9wcy5vcGVuICYmIHRoaXMub3BlbigpXHJcbiAgfSxcclxuXHJcbiAgX2ZvY3VzKGZvY3VzZWQsIGUpe1xyXG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHRydWUgKVxyXG4gICAgICByZXR1cm5cclxuXHJcbiAgICB0aGlzLnNldFRpbWVvdXQoJ2ZvY3VzJywgKCkgPT4ge1xyXG4gICAgICBpZiggZm9jdXNlZCkgXHJcbiAgICAgICAgdGhpcy5yZWZzLmlucHV0LmZvY3VzKClcclxuXHJcbiAgICAgIGVsc2UgXHJcbiAgICAgICAgdGhpcy5yZWZzLnRhZ0xpc3QgJiYgdGhpcy5yZWZzLnRhZ0xpc3QuY2xlYXIoKVxyXG4gICAgICBcclxuICAgICAgaWYoIGZvY3VzZWQgIT09IHRoaXMuc3RhdGUuZm9jdXNlZCl7XHJcbiAgICAgICAgZm9jdXNlZCBcclxuICAgICAgICAgID8gdGhpcy5vcGVuKCkgXHJcbiAgICAgICAgICA6IHRoaXMuY2xvc2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub3RpZnkoZm9jdXNlZCA/ICdvbkZvY3VzJyA6ICdvbkJsdXInLCBlKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiBmb2N1c2VkIH0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgX3NlYXJjaEtleURvd24oZSl7IFxyXG4gICAgaWYgKGUua2V5ID09PSAnQmFja3NwYWNlJyAmJiBlLnRhcmdldC52YWx1ZSAmJiAhdGhpcy5fZGVsZXRpbmdUZXh0KVxyXG4gICAgICB0aGlzLl9kZWxldGluZ1RleHQgPSB0cnVlXHJcbiAgfSxcclxuXHJcbiAgX3NlYXJjaGdLZXlVcChlKXsgXHJcbiAgICBpZiAoZS5rZXkgPT09ICdCYWNrc3BhY2UnICYmIHRoaXMuX2RlbGV0aW5nVGV4dCkgXHJcbiAgICAgIHRoaXMuX2RlbGV0aW5nVGV4dCA9IGZhbHNlXHJcbiAgfSxcclxuXHJcbiAgX3R5cGluZzogZnVuY3Rpb24oZSl7XHJcbiAgICB0aGlzLm5vdGlmeSgnb25TZWFyY2gnLCBbIGUudGFyZ2V0LnZhbHVlIF0pXHJcbiAgICB0aGlzLm9wZW4oKVxyXG4gIH0sXHJcblxyXG4gIF9vblNlbGVjdDogZnVuY3Rpb24oZGF0YSl7XHJcblxyXG4gICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBpZiAodGhpcy5wcm9wcy5vbkNyZWF0ZSlcclxuICAgICAgICB0aGlzLl9vbkNyZWF0ZSh0aGlzLnByb3BzLnNlYXJjaFRlcm0pXHJcbiBcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ub3RpZnkoJ29uU2VsZWN0JywgZGF0YSlcclxuICAgIHRoaXMuY2hhbmdlKHRoaXMuc3RhdGUuZGF0YUl0ZW1zLmNvbmNhdChkYXRhKSlcclxuICAgIHRoaXMuY2xvc2UoKVxyXG4gICAgdGhpcy5fZm9jdXModHJ1ZSlcclxuICB9LFxyXG5cclxuICBfb25DcmVhdGU6IGZ1bmN0aW9uKHRhZyl7XHJcbiAgICBpZiAodGFnLnRyaW0oKSA9PT0gJycgKSBcclxuICAgICAgcmV0dXJuXHJcblxyXG4gICAgdGhpcy5ub3RpZnkoJ29uQ3JlYXRlJywgdGFnKVxyXG4gICAgdGhpcy5jbG9zZSgpXHJcbiAgICB0aGlzLl9mb2N1cyh0cnVlKVxyXG4gIH0sXHJcblxyXG4gIF9rZXlEb3duOiBmdW5jdGlvbihlKXtcclxuICAgIHZhciBrZXkgPSBlLmtleVxyXG4gICAgICAsIGFsdCA9IGUuYWx0S2V5XHJcbiAgICAgICwgY3RybCA9IGUuY3RybEtleVxyXG4gICAgICAsIG5vU2VhcmNoID0gIXRoaXMucHJvcHMuc2VhcmNoVGVybSAmJiAhdGhpcy5fZGVsZXRpbmdUZXh0XHJcbiAgICAgICwgaXNPcGVuICA9IHRoaXMucHJvcHMub3BlblxyXG4gICAgICAsIGZvY3VzZWRJdGVtID0gdGhpcy5zdGF0ZS5mb2N1c2VkSXRlbVxyXG4gICAgICAsIHRhZ0xpc3QgPSB0aGlzLnJlZnMudGFnTGlzdFxyXG4gICAgICAsIGxpc3QgICAgPSB0aGlzLnJlZnMubGlzdDtcclxuXHJcbiAgICBpZiAoIGtleSA9PT0gJ0Fycm93RG93bicpIHtcclxuICAgICAgdmFyIG5leHQgPSBsaXN0Lm5leHQoJ2ZvY3VzZWQnKVxyXG4gICAgICAgICwgY3JlYXRpbmcgPSAodGhpcy5fc2hvdWxkU2hvd0NyZWF0ZSgpICYmIGZvY3VzZWRJdGVtID09PSBuZXh0KSB8fCBmb2N1c2VkSXRlbSA9PT0gbnVsbDtcclxuICAgICAgICBcclxuICAgICAgbmV4dCA9IGNyZWF0aW5nID8gbnVsbCA6IGxpc3QubmV4dChmb2N1c2VkSXRlbSlcclxuXHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBpZiAoIGlzT3BlbiApIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkSXRlbTogbmV4dCB9KVxyXG4gICAgICBlbHNlICAgICAgICAgIHRoaXMub3BlbigpXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgga2V5ID09PSAnQXJyb3dVcCcpIHtcclxuICAgICAgdmFyIHByZXYgPSBmb2N1c2VkSXRlbSA9PT0gbnVsbCBcclxuICAgICAgICA/IGxpc3QubGFzdCgpIFxyXG4gICAgICAgIDogbGlzdC5wcmV2KGZvY3VzZWRJdGVtKVxyXG5cclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICBpZiAoIGFsdCkgICAgICAgICAgdGhpcy5jbG9zZSgpXHJcbiAgICAgIGVsc2UgaWYgKCBpc09wZW4gKSB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZEl0ZW06IHByZXYgfSlcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCBrZXkgPT09ICdFbmQnKXtcclxuICAgICAgaWYgKCBpc09wZW4gKSB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZEl0ZW06IGxpc3QubGFzdCgpIH0pXHJcbiAgICAgIGVsc2UgICAgICAgICAgdGFnTGlzdCAmJiB0YWdMaXN0Lmxhc3QoKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoICBrZXkgPT09ICdIb21lJyl7XHJcbiAgICAgIGlmICggaXNPcGVuICkgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWRJdGVtOiBsaXN0LmZpcnN0KCkgfSlcclxuICAgICAgZWxzZSAgICAgICAgICB0YWdMaXN0ICYmIHRhZ0xpc3QuZmlyc3QoKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIGlzT3BlbiAmJiBrZXkgPT09ICdFbnRlcicgKVxyXG4gICAgICBjdHJsICYmIHRoaXMucHJvcHMub25DcmVhdGVcclxuICAgICAgICA/IHRoaXMuX29uQ3JlYXRlKHRoaXMucHJvcHMuc2VhcmNoVGVybSlcclxuICAgICAgICA6IHRoaXMuX29uU2VsZWN0KHRoaXMuc3RhdGUuZm9jdXNlZEl0ZW0pXHJcblxyXG4gICAgZWxzZSBpZiAoIGtleSA9PT0gJ0VzY2FwZScpXHJcbiAgICAgIGlzT3BlbiA/IHRoaXMuY2xvc2UoKSA6IHRoaXMucmVmcy50YWdMaXN0LmNsZWFyKClcclxuXHJcbiAgICBlbHNlIGlmICggbm9TZWFyY2ggJiYga2V5ID09PSAnQXJyb3dMZWZ0JylcclxuICAgICB0YWdMaXN0ICYmIHRhZ0xpc3QucHJldigpXHJcblxyXG4gICAgZWxzZSBpZiAoIG5vU2VhcmNoICYmIGtleSA9PT0gJ0Fycm93UmlnaHQnKVxyXG4gICAgICB0YWdMaXN0ICYmIHRhZ0xpc3QubmV4dCgpXHJcblxyXG4gICAgZWxzZSBpZiAoIG5vU2VhcmNoICYmIGtleSA9PT0gJ0RlbGV0ZScpXHJcbiAgICAgIHRhZ0xpc3QgJiYgdGFnTGlzdC5yZW1vdmVDdXJyZW50KClcclxuXHJcbiAgICBlbHNlIGlmICggbm9TZWFyY2ggJiYga2V5ID09PSAnQmFja3NwYWNlJylcclxuICAgICAgdGFnTGlzdCAmJiB0YWdMaXN0LnJlbW92ZU5leHQoKVxyXG5cclxuICAgIHRoaXMubm90aWZ5KCdvbktleURvd24nLCBbZV0pXHJcbiAgfSxcclxuXHJcbiAgY2hhbmdlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgIHRoaXMubm90aWZ5KCdvbkNoYW5nZScsIFtkYXRhXSlcclxuICB9LFxyXG5cclxuICBvcGVuOiBmdW5jdGlvbigpe1xyXG4gICAgaWYgKCEodGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdHJ1ZSB8fCB0aGlzLnByb3BzLnJlYWRPbmx5ID09PSB0cnVlKSlcclxuICAgICAgdGhpcy5ub3RpZnkoJ29uVG9nZ2xlJywgdHJ1ZSlcclxuICB9LFxyXG5cclxuICBjbG9zZTogZnVuY3Rpb24oKXtcclxuICAgIHRoaXMubm90aWZ5KCdvblRvZ2dsZScsIGZhbHNlKVxyXG4gIH0sXHJcblxyXG4gIHRvZ2dsZTogZnVuY3Rpb24oZSl7XHJcbiAgICB0aGlzLnByb3BzLm9wZW5cclxuICAgICAgPyB0aGlzLmNsb3NlKClcclxuICAgICAgOiB0aGlzLm9wZW4oKVxyXG4gIH0sXHJcblxyXG4gIHByb2Nlc3M6IGZ1bmN0aW9uKGRhdGEsIHZhbHVlcywgc2VhcmNoVGVybSl7XHJcbiAgICB2YXIgaXRlbXMgPSBkYXRhLmZpbHRlciggaSA9PiAhdmFsdWVzLnNvbWUoIHRoaXMuX3ZhbHVlTWF0Y2hlci5iaW5kKG51bGwsIGkpLCB0aGlzKSwgdGhpcylcclxuXHJcbiAgICBpZiggc2VhcmNoVGVybSlcclxuICAgICAgaXRlbXMgPSB0aGlzLmZpbHRlcihpdGVtcywgc2VhcmNoVGVybSlcclxuXHJcbiAgICByZXR1cm4gaXRlbXNcclxuICB9LFxyXG5cclxuICBfc2hvdWxkU2hvd0NyZWF0ZSgpe1xyXG4gICAgdmFyIHRleHQgPSB0aGlzLnByb3BzLnNlYXJjaFRlcm07XHJcblxyXG4gICAgaWYgKCAhKHRoaXMucHJvcHMub25DcmVhdGUgJiYgdGV4dCkgKSBcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgLy8gaWYgdGhlcmUgaXMgYW4gZXhhY3QgbWF0Y2ggb24gdGV4dEZpZWxkczogXCJqb2huXCIgPT4geyBuYW1lOiBcImpvaG5cIiB9LCBkb24ndCBzaG93XHJcbiAgICByZXR1cm4gIXRoaXMuX2RhdGEoKS5zb21lKCB2ID0+IHRoaXMuX2RhdGFUZXh0KHYpID09PSB0ZXh0KSBcclxuICAgICAgICAmJiAhdGhpcy5zdGF0ZS5kYXRhSXRlbXMuc29tZSggdiA9PiB0aGlzLl9kYXRhVGV4dCh2KSA9PT0gdGV4dCkgXHJcbiAgfSxcclxuXHJcbiAgX3BsYWNlaG9sZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuICh0aGlzLnByb3BzLnZhbHVlIHx8IFtdKS5sZW5ndGhcclxuICAgICAgPyAnJ1xyXG4gICAgICA6ICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyIHx8ICcnKVxyXG4gIH1cclxuXHJcbn0pXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVVbmNvbnRyb2xsZWRXaWRnZXQoTXVsdGlzZWxlY3RcclxuICAgICwgeyBvcGVuOiAnb25Ub2dnbGUnLCB2YWx1ZTogJ29uQ2hhbmdlJywgc2VhcmNoVGVybTogJ29uU2VhcmNoJyB9XHJcbiAgICAsIHsgb25DaGFuZ2U6IGRlZmF1bHRDaGFuZ2UsIG9uQ3JlYXRlOiBkZWZhdWx0Q2hhbmdlIH0pO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGRlZmF1bHRDaGFuZ2UoKXtcclxuICBpZiAoIHRoaXMucHJvcHMuc2VhcmNoVGVybSA9PT0gdW5kZWZpbmVkIClcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBzZWFyY2hUZXJtOiAnJyB9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5CYXNlTXVsdGlzZWxlY3QgPSBNdWx0aXNlbGVjdFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL011bHRpc2VsZWN0LmpzeFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxyXG4gICwgXyAgICAgPSByZXF1aXJlKCcuL3V0aWwvXycpXHJcbiAgLCBjeCAgICA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKVxyXG4gICwgQnRuICAgPSByZXF1aXJlKCcuL1dpZGdldEJ1dHRvbicpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICBcclxuICBkaXNwbGF5TmFtZTogJ011bHRpc2VsZWN0VGFnTGlzdCcsXHJcblxyXG4gIG1peGluczogW1xyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvRGF0YUhlbHBlcnNNaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvUHVyZVJlbmRlck1peGluJylcclxuICBdLFxyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIHZhbHVlOiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcblxyXG4gICAgdmFsdWVGaWVsZDogICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICB0ZXh0RmllbGQ6ICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHJcbiAgICB2YWx1ZUNvbXBvbmVudDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblxyXG4gICAgZGlzYWJsZWQ6ICAgICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydkaXNhYmxlZCddKVxyXG4gICAgICAgICAgICAgICAgICAgIF0pLFxyXG5cclxuICAgIHJlYWRPbmx5OiAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsncmVhZG9ubHknXSlcclxuICAgICAgICAgICAgICAgICAgICBdKVxyXG4gIH0sXHJcblxyXG5cclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBmb2N1c2VkOiBudWxsXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgVmFsdWVDb21wb25lbnQgPSB0aGlzLnByb3BzLnZhbHVlQ29tcG9uZW50XHJcbiAgICAgICAgLCBwcm9wcyAgICAgPSBfLm9taXQodGhpcy5wcm9wcywgWyd2YWx1ZScsICdkaXNhYmxlZCcsICdyZWFkT25seSddKVxyXG4gICAgICAgICwgZm9jdXNJZHggID0gdGhpcy5zdGF0ZS5mb2N1c2VkXHJcbiAgICAgICAgLCB2YWx1ZSAgICAgPSB0aGlzLnByb3BzLnZhbHVlO1xyXG5cclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8dWwgey4uLnByb3BzfSBcclxuICAgICAgICAgIGNsYXNzTmFtZT0ncnctbXVsdGlzZWxlY3QtdGFnbGlzdCc+XHJcbiAgICAgICAgICB7IHZhbHVlLm1hcCggKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgICAgdmFyIGRpc2FibGVkID0gdGhpcy5pc0Rpc2FibGVkKGl0ZW0pXHJcbiAgICAgICAgICAgICAgLCByZWFkb25seSA9IHRoaXMuaXNSZWFkT25seShpdGVtKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGxpIGtleT17aX1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3J3LXN0YXRlLWZvY3VzJzogIWRpc2FibGVkICYmIGZvY3VzSWR4ID09PSBpLFxyXG4gICAgICAgICAgICAgICAgICAgICdydy1zdGF0ZS1kaXNhYmxlZCc6IGRpc2FibGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICdydy1zdGF0ZS1yZWFkb25seSc6IHJlYWRvbmx5fSlcclxuICAgICAgICAgICAgICAgICAgfT5cclxuICAgICAgICAgICAgICAgIHsgVmFsdWVDb21wb25lbnRcclxuICAgICAgICAgICAgICAgICAgICA/IDxWYWx1ZUNvbXBvbmVudCBpdGVtPXtpdGVtIH0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5fZGF0YVRleHQoaXRlbSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDxCdG4gdGFiSW5kZXg9Jy0xJyBvbkNsaWNrPXshKGRpc2FibGVkIHx8IHJlYWRvbmx5KSAmJiB0aGlzLl9kZWxldGUuYmluZChudWxsLCBpdGVtKX1cclxuICAgICAgICAgICAgICAgICAgYXJpYS1kaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH0+XHJcbiAgICAgICAgICAgICAgICAgICZ0aW1lczs8c3BhbiBjbGFzc05hbWU9XCJydy1zclwiPnsgXCJSZW1vdmUgXCIgKyB0aGlzLl9kYXRhVGV4dChpdGVtKSB9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9CdG4+XHJcbiAgICAgICAgICAgICAgPC9saT4pXHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L3VsPlxyXG4gICAgICApXHJcbiAgfSxcclxuXHJcbiAgX2RlbGV0ZTogZnVuY3Rpb24odmFsLCBlKXtcclxuICAgIHRoaXMucHJvcHMub25EZWxldGUodmFsKVxyXG4gIH0sXHJcblxyXG4gIHJlbW92ZUN1cnJlbnQ6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdmFsID0gdGhpcy5wcm9wcy52YWx1ZVt0aGlzLnN0YXRlLmZvY3VzZWRdO1xyXG5cclxuICAgIGlmICggdmFsICYmICEodGhpcy5pc0Rpc2FibGVkKHZhbCkgIHx8IHRoaXMuaXNSZWFkT25seSh2YWwpICkpXHJcbiAgICAgIHRoaXMucHJvcHMub25EZWxldGUodmFsKVxyXG4gIH0sXHJcblxyXG4gIGlzRGlzYWJsZWQ6IGZ1bmN0aW9uKHZhbCwgaXNJZHgpIHtcclxuICAgIGlmKGlzSWR4KSB2YWwgPSB0aGlzLnByb3BzLnZhbHVlW3ZhbF1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gdHJ1ZSB8fCB0aGlzLl9kYXRhSW5kZXhPZih0aGlzLnByb3BzLmRpc2FibGVkIHx8IFtdLCB2YWwpICE9PSAtMVxyXG4gIH0sXHJcblxyXG4gIGlzUmVhZE9ubHk6IGZ1bmN0aW9uKHZhbCwgaXNJZHgpIHtcclxuICAgIGlmKGlzSWR4KSB2YWwgPSB0aGlzLnByb3BzLnZhbHVlW3ZhbF1cclxuXHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZWFkT25seSA9PT0gdHJ1ZSB8fCB0aGlzLl9kYXRhSW5kZXhPZih0aGlzLnByb3BzLnJlYWRPbmx5IHx8IFtdLCB2YWwpICE9PSAtMVxyXG4gIH0sXHJcblxyXG4gIHJlbW92ZU5leHQ6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdmFsID0gdGhpcy5wcm9wcy52YWx1ZVt0aGlzLnByb3BzLnZhbHVlLmxlbmd0aCAtIDFdO1xyXG5cclxuICAgIGlmICggdmFsICYmICEodGhpcy5pc0Rpc2FibGVkKHZhbCkgIHx8IHRoaXMuaXNSZWFkT25seSh2YWwpICkpXHJcbiAgICAgIHRoaXMucHJvcHMub25EZWxldGUodmFsKVxyXG4gIH0sXHJcblxyXG4gIGNsZWFyOiBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWQ6IG51bGwgfSlcclxuICB9LFxyXG5cclxuICBmaXJzdDogZnVuY3Rpb24oKXtcclxuICAgIHZhciBpZHggPSAwXHJcbiAgICAgICwgbCA9IHRoaXMucHJvcHMudmFsdWUubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlKCBpZHggPCBsICYmIHRoaXMuaXNEaXNhYmxlZChpZHgsIHRydWUpIClcclxuICAgICAgaWR4KytcclxuXHJcbiAgICBpZiAoaWR4ICE9PSBsKVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogaWR4IH0pXHJcbiAgfSxcclxuXHJcbiAgbGFzdDogZnVuY3Rpb24oKXtcclxuICAgIHZhciBpZHggPSB0aGlzLnByb3BzLnZhbHVlLmxlbmd0aCAtIDE7XHJcblxyXG4gICAgd2hpbGUoIGlkeCA+IC0xICYmIHRoaXMuaXNEaXNhYmxlZChpZHgsIHRydWUpIClcclxuICAgICAgaWR4LS1cclxuXHJcbiAgICBpZiAoaWR4ID49IDApXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiBpZHggfSlcclxuICB9LFxyXG5cclxuICBuZXh0OiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIG5leHRJZHggPSB0aGlzLnN0YXRlLmZvY3VzZWQgKyAxXHJcbiAgICAgICwgbCA9IHRoaXMucHJvcHMudmFsdWUubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlKCBuZXh0SWR4IDwgbCAmJiB0aGlzLmlzRGlzYWJsZWQobmV4dElkeCwgdHJ1ZSkgKVxyXG4gICAgICBuZXh0SWR4KytcclxuXHJcbiAgICBpZiAoIHRoaXMuc3RhdGUuZm9jdXNlZCA9PT0gbnVsbCApXHJcbiAgICAgIHJldHVyblxyXG5cclxuICAgIGlmICggbmV4dElkeCA+PSBsIClcclxuICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKTtcclxuXHJcbiAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZDogbmV4dElkeCB9KVxyXG4gIH0sXHJcblxyXG4gIHByZXY6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgbmV4dElkeCA9IHRoaXMuc3RhdGUuZm9jdXNlZDtcclxuXHJcbiAgICBpZiAoIG5leHRJZHggPT09IG51bGwgKVxyXG4gICAgICBuZXh0SWR4ID0gdGhpcy5wcm9wcy52YWx1ZS5sZW5ndGhcclxuXHJcbiAgICBuZXh0SWR4LS07XHJcblxyXG4gICAgd2hpbGUoIG5leHRJZHggPiAtMSAmJiB0aGlzLmlzRGlzYWJsZWQobmV4dElkeCwgdHJ1ZSkgKVxyXG4gICAgICBuZXh0SWR4LS1cclxuXHJcbiAgICBpZiAoIG5leHRJZHggPj0gMCApXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiBuZXh0SWR4ICB9KVxyXG4gIH1cclxufSlcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvTXVsdGlzZWxlY3RUYWdMaXN0LmpzeFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gIFxyXG4gIGRpc3BsYXlOYW1lOiAnTXVsdGlzZWxlY3RJbnB1dCcsXHJcblxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgdmFsdWU6ICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgbWF4TGVuZ3RoOiAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgb25DaGFuZ2U6ICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgb25Gb2N1czogICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHJcbiAgICBkaXNhYmxlZDogICAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgcmVhZE9ubHk6ICAgICBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICB9LFxyXG5cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMucHJvcHMuZm9jdXNlZCAmJiB0aGlzLmZvY3VzKClcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciB2YWx1ZSA9IHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICAsIHBsYWNlaG9sZGVyID0gdGhpcy5wcm9wcy5wbGFjZWhvbGRlclxyXG4gICAgICAgICwgc2l6ZSA9IE1hdGgubWF4KCh2YWx1ZSB8fCBwbGFjZWhvbGRlcikubGVuZ3RoLCAxKTtcclxuXHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzfVxyXG4gICAgICAgICAgdHlwZT0ndGV4dCcgXHJcbiAgICAgICAgICBjbGFzc05hbWU9J3J3LWlucHV0J1xyXG4gICAgICAgICAgYXJpYS1kaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgIGFyaWEtcmVhZG9ubHk9e3RoaXMucHJvcHMucmVhZE9ubHl9XHJcbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgIHJlYWRPbmx5PXt0aGlzLnByb3BzLnJlYWRPbmx5fVxyXG4gICAgICAgICAgc2l6ZT17c2l6ZX0vPlxyXG4gICAgICApXHJcbiAgfSxcclxuXHJcbiAgZm9jdXM6IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLmdldERPTU5vZGUoKS5mb2N1cygpXHJcbiAgfVxyXG5cclxufSlcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvTXVsdGlzZWxlY3RJbnB1dC5qc3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcclxuICAsIGN4ICAgID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpXHJcbiAgLCBfICAgICA9IHJlcXVpcmUoJy4vdXRpbC9fJykgLy9vbWl0XHJcbiAgLCBDdXN0b21Qcm9wVHlwZXMgPSByZXF1aXJlKCcuL3V0aWwvcHJvcFR5cGVzJylcclxuICAsIGNyZWF0ZVVuY29udHJvbGxlZFdpZGdldCA9IHJlcXVpcmUoJ3VuY29udHJvbGxhYmxlJylcclxuICAsIGRpcmVjdGlvbnMgPSByZXF1aXJlKCcuL3V0aWwvY29uc3RhbnRzJykuZGlyZWN0aW9uc1xyXG4gICwgSW5wdXQgPSByZXF1aXJlKCcuL051bWJlcklucHV0Jyk7XHJcblxyXG52YXIgQnRuID0gcmVxdWlyZSgnLi9XaWRnZXRCdXR0b24nKVxyXG4gICwgcHJvcFR5cGVzID0ge1xyXG5cclxuICAgICAgLy8gLS0gY29udHJvbGxlZCBwcm9wcyAtLS0tLS0tLS0tLVxyXG4gICAgICB2YWx1ZTogICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgb25DaGFuZ2U6ICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgbWluOiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgIG1heDogICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICBzdGVwOiAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm51bWJlcixcclxuXHJcbiAgICAgIGN1bHR1cmU6ICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cclxuICAgICAgZm9ybWF0OiAgICAgICAgIEN1c3RvbVByb3BUeXBlcy5sb2NhbGVGb3JtYXQsXHJcblxyXG4gICAgICBuYW1lOiAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuXHJcbiAgICAgIHBhcnNlOiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHJcbiAgICAgIGRpc2FibGVkOiAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ2Rpc2FibGVkJ10pXHJcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuXHJcbiAgICAgIHJlYWRPbmx5OiAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZihbJ3JlYWRPbmx5J10pXHJcbiAgICAgICAgICAgICAgICAgICAgICBdKSxcclxuXHJcbiAgICAgIG1lc3NhZ2VzOiAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgICAgIGluY3JlbWVudDogICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBkZWNyZW1lbnQ6ICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxuICAgICAgfSlcclxuICAgIH07XHJcblxyXG52YXIgTnVtYmVyUGlja2VyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBkaXNwbGF5TmFtZTogJ051bWJlclBpY2tlcicsXHJcblxyXG4gIG1peGluczogW1xyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvV2lkZ2V0TWl4aW4nKSxcclxuICAgIHJlcXVpcmUoJy4vbWl4aW5zL1RpbWVvdXRNaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvUHVyZVJlbmRlck1peGluJyksXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9SdGxQYXJlbnRDb250ZXh0TWl4aW4nKSxcclxuICBdLFxyXG5cclxuICBwcm9wVHlwZXM6IHByb3BUeXBlcyxcclxuXHJcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsdWU6IG51bGwsXHJcbiAgICAgIG9wZW46IGZhbHNlLFxyXG5cclxuICAgICAgZm9ybWF0OiAnZCcsXHJcblxyXG4gICAgICBtaW46IC1JbmZpbml0eSxcclxuICAgICAgbWF4OiAgSW5maW5pdHksXHJcbiAgICAgIHN0ZXA6IDEsXHJcblxyXG4gICAgICBtZXNzYWdlczoge1xyXG4gICAgICAgIGluY3JlbWVudDogJ2luY3JlbWVudCB2YWx1ZScsXHJcbiAgICAgICAgZGVjcmVtZW50OiAgJ2RlY3JlbWVudCB2YWx1ZSdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGZvY3VzZWQ6IGZhbHNlLFxyXG4gICAgICBhY3RpdmU6IGZhbHNlLFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIge1xyXG4gICAgICAgIGNsYXNzTmFtZVxyXG4gICAgICAsIG9uS2V5RG93blxyXG4gICAgICAsIG9uS2V5UHJlc3NcclxuICAgICAgLCBvbktleVVwXHJcbiAgICAgICwgLi4ucHJvcHMgfSA9IF8ub21pdCh0aGlzLnByb3BzLCBPYmplY3Qua2V5cyhwcm9wVHlwZXMpKVxyXG4gICAgICAsIHZhbCA9IHRoaXMuaW5SYW5nZVZhbHVlKHRoaXMucHJvcHMudmFsdWUpXHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdiB7Li4ucHJvcHMgfVxyXG4gICAgICAgIHJlZj1cImVsZW1lbnRcIlxyXG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5fbWF5YmVIYW5kbGUodGhpcy5fa2V5RG93bil9XHJcbiAgICAgICAgb25Gb2N1cz17dGhpcy5fbWF5YmVIYW5kbGUodGhpcy5fZm9jdXMuYmluZChudWxsLCB0cnVlKSwgdHJ1ZSl9XHJcbiAgICAgICAgb25CbHVyID17dGhpcy5fZm9jdXMuYmluZChudWxsLCBmYWxzZSl9XHJcbiAgICAgICAgdGFiSW5kZXg9XCItMVwiXHJcbiAgICAgICAgY2xhc3NOYW1lPXtjeChjbGFzc05hbWUsICdydy1udW1iZXJwaWNrZXInLCAncnctd2lkZ2V0Jywge1xyXG4gICAgICAgICAgJ3J3LXN0YXRlLWZvY3VzJzogICAgIHRoaXMuc3RhdGUuZm9jdXNlZCxcclxuICAgICAgICAgICdydy1zdGF0ZS1kaXNhYmxlZCc6ICB0aGlzLnByb3BzLmRpc2FibGVkLFxyXG4gICAgICAgICAgJ3J3LXN0YXRlLXJlYWRvbmx5JzogIHRoaXMucHJvcHMucmVhZE9ubHksXHJcbiAgICAgICAgICAncnctcnRsJzogICAgICAgICAgICAgdGhpcy5pc1J0bCgpXHJcbiAgICAgICAgfSl9PlxyXG5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3J3LXNlbGVjdCc+XHJcbiAgICAgICAgICA8QnRuXHJcbiAgICAgICAgICAgIHRhYkluZGV4PSctMSdcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjeCh7ICdydy1zdGF0ZS1hY3RpdmUnOiB0aGlzLnN0YXRlLmFjdGl2ZSA9PT0gZGlyZWN0aW9ucy5VUH0pfVxyXG4gICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5fbWF5YmVIYW5kbGUodGhpcy5fbW91c2VEb3duLmJpbmQobnVsbCwgZGlyZWN0aW9ucy5VUCkpfVxyXG4gICAgICAgICAgICBvbk1vdXNlVXA9e3RoaXMuX21heWJlSGFuZGxlKHRoaXMuX21vdXNlVXAuYmluZChudWxsLCBkaXJlY3Rpb25zLlVQKSl9XHJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuX21heWJlSGFuZGxlKHRoaXMuX2ZvY3VzLmJpbmQobnVsbCwgdHJ1ZSkpfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17dmFsID09PSB0aGlzLnByb3BzLm1heCB8fCB0aGlzLnByb3BzLmRpc2FibGVkfVxyXG4gICAgICAgICAgICBhcmlhLWRpc2FibGVkPXt2YWwgPT09IHRoaXMucHJvcHMubWF4IHx8IHRoaXMucHJvcHMuZGlzYWJsZWR9PlxyXG5cclxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwicnctaSBydy1pLWNhcmV0LXVwXCI+PHNwYW4gY2xhc3NOYW1lPVwicnctc3JcIj57IHRoaXMucHJvcHMubWVzc2FnZXMuaW5jcmVtZW50IH08L3NwYW4+PC9pPlxyXG4gICAgICAgICAgPC9CdG4+IFxyXG4gICAgICAgICAgPEJ0blxyXG4gICAgICAgICAgICB0YWJJbmRleD0nLTEnXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goeyAncnctc3RhdGUtYWN0aXZlJzogdGhpcy5zdGF0ZS5hY3RpdmUgPT09IGRpcmVjdGlvbnMuRE9XTn0pfVxyXG4gICAgICAgICAgICBvbk1vdXNlRG93bj17dGhpcy5fbWF5YmVIYW5kbGUodGhpcy5fbW91c2VEb3duLmJpbmQobnVsbCwgZGlyZWN0aW9ucy5ET1dOKSl9XHJcbiAgICAgICAgICAgIG9uTW91c2VVcD17dGhpcy5fbWF5YmVIYW5kbGUodGhpcy5fbW91c2VVcC5iaW5kKG51bGwsIGRpcmVjdGlvbnMuRE9XTikpfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLl9tYXliZUhhbmRsZSh0aGlzLl9mb2N1cy5iaW5kKG51bGwsIHRydWUpKX1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e3ZhbCA9PT0gdGhpcy5wcm9wcy5taW4gfHwgdGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgICAgYXJpYS1kaXNhYmxlZD17dmFsID09PSB0aGlzLnByb3BzLm1pbiB8fCB0aGlzLnByb3BzLmRpc2FibGVkfT5cclxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwicnctaSBydy1pLWNhcmV0LWRvd25cIj48c3BhbiBjbGFzc05hbWU9XCJydy1zclwiPnsgdGhpcy5wcm9wcy5tZXNzYWdlcy5kZWNyZW1lbnQgfTwvc3Bhbj48L2k+XHJcbiAgICAgICAgICA8L0J0bj5cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPElucHV0XHJcbiAgICAgICAgICByZWY9J2lucHV0J1xyXG4gICAgICAgICAgdmFsdWU9e3ZhbH1cclxuICAgICAgICAgIGVkaXRpbmc9e3RoaXMuc3RhdGUuZm9jdXNlZH1cclxuICAgICAgICAgIGZvcm1hdD17dGhpcy5wcm9wcy5mb3JtYXR9XHJcbiAgICAgICAgICBwYXJzZT17dGhpcy5wcm9wcy5wYXJzZX1cclxuICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cclxuICAgICAgICAgIHJvbGU9J3NwaW5idXR0b24nXHJcbiAgICAgICAgICBtaW49e3RoaXMucHJvcHMubWlufVxyXG4gICAgICAgICAgYXJpYS12YWx1ZW5vdz17dmFsfVxyXG4gICAgICAgICAgYXJpYS12YWx1ZW1pbj17aXNGaW5pdGUodGhpcy5wcm9wcy5taW4pID8gdGhpcy5wcm9wcy5taW4gOiBudWxsIH1cclxuICAgICAgICAgIGFyaWEtdmFsdWVtYXg9e2lzRmluaXRlKHRoaXMucHJvcHMubWF4KSA/IHRoaXMucHJvcHMubWF4IDogbnVsbCB9XHJcbiAgICAgICAgICBhcmlhLWRpc2FibGVkPXsgdGhpcy5wcm9wcy5kaXNhYmxlZCB9XHJcbiAgICAgICAgICBhcmlhLXJlYWRvbmx5PXsgdGhpcy5wcm9wcy5yZWFkb25seSB9XHJcbiAgICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICAgIHJlYWRPbmx5PXt0aGlzLnByb3BzLnJlYWRPbmx5fVxyXG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuY2hhbmdlfVxyXG4gICAgICAgICAgb25LZXlEb3duPXtvbktleURvd259XHJcbiAgICAgICAgICBvbktleVByZXNzPXtvbktleVByZXNzfVxyXG4gICAgICAgICAgb25LZXlVcD17b25LZXlVcH0vPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9LFxyXG5cclxuICAvL2FsbG93IGZvciBzdHlsaW5nLCBmb2N1cyBzdGVhbGluZyBrZWVwaW5nIG1lIGZyb20gdGhlIG5vcm1hbCB3aGF0IGhhdmUgeW91XHJcbiAgX21vdXNlRG93bjogZnVuY3Rpb24oZGlyKSB7XHJcbiAgICB2YXIgdmFsID0gZGlyID09PSBkaXJlY3Rpb25zLlVQXHJcbiAgICAgICAgPyAodGhpcy5wcm9wcy52YWx1ZSB8fCAwKSArIHRoaXMucHJvcHMuc3RlcFxyXG4gICAgICAgIDogKHRoaXMucHJvcHMudmFsdWUgfHwgMCkgLSB0aGlzLnByb3BzLnN0ZXBcclxuXHJcbiAgICB2YWwgPSB0aGlzLmluUmFuZ2VWYWx1ZSh2YWwpXHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGFjdGl2ZTogZGlyIH0pXHJcbiAgICB0aGlzLmNoYW5nZSh2YWwpO1xyXG5cclxuICAgIGlmKCAhKChkaXIgPT09IGRpcmVjdGlvbnMuVVAgJiYgdmFsID09PSB0aGlzLnByb3BzLm1heClcclxuICAgICAgfHwgKGRpciA9PT0gZGlyZWN0aW9ucy5ET1dOICYmIHZhbCA9PT0gdGhpcy5wcm9wcy5taW4pKSlcclxuICAgIHtcclxuICAgICAgaWYoIXRoaXMuaW50ZXJ2YWwpXHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKHRoaXMuX21vdXNlRG93biwgNTAwLCBkaXIpXHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICAgIHRoaXMuX21vdXNlVXAoKVxyXG4gIH0sXHJcblxyXG4gIF9tb3VzZVVwOiBmdW5jdGlvbihkaXJlY3Rpb24sIGUgKXtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBhY3RpdmU6IGZhbHNlIH0pXHJcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpXHJcbiAgICB0aGlzLmludGVydmFsID0gbnVsbDtcclxuICB9LFxyXG5cclxuICBfZm9jdXM6IGZ1bmN0aW9uKGZvY3VzZWQsIGUpe1xyXG5cclxuICAgIHRoaXMuc2V0VGltZW91dCgnZm9jdXMnLCAoKSA9PiB7XHJcbiAgICAgIHZhciBlbCA9IHRoaXMucmVmcy5pbnB1dC5nZXRET01Ob2RlKClcclxuXHJcbiAgICAgIGZvY3VzZWQgJiYgZWwuZm9jdXMoKVxyXG5cclxuICAgICAgaWYoIGZvY3VzZWQgIT09IHRoaXMuc3RhdGUuZm9jdXNlZCl7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoZm9jdXNlZCA/ICdvbkZvY3VzJyA6ICdvbkJsdXInLCBlKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkOiBmb2N1c2VkIH0pXHJcbiAgICAgIH1cclxuXHJcbiAgICB9LCAwKVxyXG4gIH0sXHJcblxyXG4gIF9rZXlEb3duOiBmdW5jdGlvbihlKXtcclxuICAgIHZhciBrZXkgPSBlLmtleTtcclxuXHJcbiAgICBpZiAoIGtleSA9PT0gJ0VuZCcgICYmIGlzRmluaXRlKHRoaXMucHJvcHMubWF4KSlcclxuICAgICAgdGhpcy5jaGFuZ2UodGhpcy5wcm9wcy5tYXgpXHJcblxyXG4gICAgZWxzZSBpZiAoIGtleSA9PT0gJ0hvbWUnICYmIGlzRmluaXRlKHRoaXMucHJvcHMubWluKSlcclxuICAgICAgdGhpcy5jaGFuZ2UodGhpcy5wcm9wcy5taW4pXHJcblxyXG4gICAgZWxzZSBpZiAoIGtleSA9PT0gJ0Fycm93RG93bicgKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIHRoaXMuZGVjcmVtZW50KClcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKCBrZXkgPT09ICdBcnJvd1VwJyApe1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgdGhpcy5pbmNyZW1lbnQoKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGluY3JlbWVudDogZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmNoYW5nZSh0aGlzLmluUmFuZ2VWYWx1ZSgodGhpcy5wcm9wcy52YWx1ZSB8fCAwKSArIHRoaXMucHJvcHMuc3RlcCkpXHJcbiAgfSxcclxuXHJcbiAgZGVjcmVtZW50OiBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5jaGFuZ2UodGhpcy5pblJhbmdlVmFsdWUoKHRoaXMucHJvcHMudmFsdWUgfHwgMCkgLSB0aGlzLnByb3BzLnN0ZXApKVxyXG4gIH0sXHJcblxyXG4gIGNoYW5nZTogZnVuY3Rpb24odmFsKXtcclxuICAgIHZhbCA9IHRoaXMuaW5SYW5nZVZhbHVlKHZhbCA9PT0gJycgPyBudWxsIDogdmFsKVxyXG5cclxuICAgIGlmICggdGhpcy5wcm9wcy52YWx1ZSAhPT0gdmFsIClcclxuICAgICAgdGhpcy5ub3RpZnkoJ29uQ2hhbmdlJywgdmFsKVxyXG4gIH0sXHJcblxyXG4gIGluUmFuZ2VWYWx1ZTogZnVuY3Rpb24odmFsdWUpe1xyXG4gICAgdmFyIG1heCA9IHRoaXMucHJvcHMubWF4ID09IG51bGwgPyBJbmZpbml0eSA6IHRoaXMucHJvcHMubWF4XHJcbiAgICAgICwgbWluID0gdGhpcy5wcm9wcy5taW4gPT0gbnVsbCA/IC1JbmZpbml0eSA6IHRoaXMucHJvcHMubWluO1xyXG5cclxuICAgIGlmKCAhaXNGaW5pdGUobWluKSAmJiB2YWx1ZSA9PSBudWxsIClcclxuICAgICAgcmV0dXJuIHZhbHVlXHJcblxyXG4gICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKHZhbHVlLCBtYXgpLCBtaW4pXHJcbiAgfVxyXG5cclxufSlcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVW5jb250cm9sbGVkV2lkZ2V0KFxyXG4gICAgTnVtYmVyUGlja2VyLCB7IHZhbHVlOiAnb25DaGFuZ2UnIH0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMuQmFzZU51bWJlclBpY2tlciA9IE51bWJlclBpY2tlclxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL051bWJlclBpY2tlci5qc3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBpZENvdW50ID0gMDtcclxuXHJcbnZhciBfID0gXHJcblxyXG4gIG1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICAgIGhhczogaGFzLFxyXG4gICAgXHJcbiAgICBhc3NpZ246IHJlcXVpcmUoJ3JlYWN0L2xpYi9PYmplY3QuYXNzaWduJyksXHJcblxyXG4gICAgaXNTaGFsbG93RXF1YWw6IGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgIGlmIChhID09PSBiKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgaWYgKGEgaW5zdGFuY2VvZiBEYXRlICYmIGIgaW5zdGFuY2VvZiBEYXRlKVxyXG4gICAgICAgIHJldHVybiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKClcclxuXHJcbiAgICAgIGlmKHR5cGVvZiBhICE9ICdvYmplY3QnICYmIHR5cGVvZiBiICE9ICdvYmplY3QnKVxyXG4gICAgICAgIHJldHVybiBhID09PSBiXHJcblxyXG4gICAgICBpZih0eXBlb2YgYSAhPSB0eXBlb2YgYiApIHJldHVybiBmYWxzZVxyXG5cclxuICAgICAgcmV0dXJuIHNoYWxsb3dFcXVhbChhLCBiKVxyXG4gICAgfSwgXHJcblxyXG4gICAgdHJhbnNmb3JtOiBmdW5jdGlvbihvYmosIGNiLCBzZWVkKXtcclxuICAgICAgXy5lYWNoKG9iaiwgY2IuYmluZChudWxsLCBzZWVkID0gc2VlZCB8fCAoQXJyYXkuaXNBcnJheShvYmopID8gW10gOiB7fSkpKVxyXG4gICAgICByZXR1cm4gc2VlZFxyXG4gICAgfSxcclxuXHJcbiAgICBlYWNoOiBmdW5jdGlvbihvYmosIGNiLCB0aGlzQXJnKXtcclxuICAgICAgaWYoIEFycmF5LmlzQXJyYXkob2JqKSkgcmV0dXJuIG9iai5mb3JFYWNoKGNiLCB0aGlzQXJnKVxyXG5cclxuICAgICAgZm9yKHZhciBrZXkgaW4gb2JqKSBpZihoYXMob2JqLCBrZXkpKSBcclxuICAgICAgICBjYi5jYWxsKHRoaXNBcmcsIG9ialtrZXldLCBrZXksIG9iailcclxuICAgIH0sXHJcblxyXG4gICAgLy8gb2JqZWN0OiBmdW5jdGlvbihhcnIpe1xyXG4gICAgLy8gICByZXR1cm4gXy50cmFuc2Zvcm0oYXJyLCBcclxuICAgIC8vICAgICAob2JqLCB2YWwpID0+IG9ialt2YWxbMF1dID0gdmFsWzFdLCB7fSlcclxuICAgIC8vIH0sXHJcblxyXG4gICAgcGljazogZnVuY3Rpb24ob2JqLCBrZXlzKXtcclxuICAgICAga2V5cyA9IFtdLmNvbmNhdChrZXlzKTtcclxuICAgICAgcmV0dXJuIF8udHJhbnNmb3JtKG9iaiwgZnVuY3Rpb24obWFwcGVkLCB2YWwsIGtleSl7XHJcbiAgICAgICAgaWYoIGtleXMuaW5kZXhPZihrZXkpICE9PSAtMSkgbWFwcGVkW2tleV0gPSB2YWxcclxuICAgICAgfSwge30pXHJcbiAgICB9LFxyXG5cclxuICAgIG9taXQ6IGZ1bmN0aW9uKG9iaiwga2V5cyl7XHJcbiAgICAgIGtleXMgPSBbXS5jb25jYXQoa2V5cyk7XHJcbiAgICAgIHJldHVybiBfLnRyYW5zZm9ybShvYmosIGZ1bmN0aW9uKG1hcHBlZCwgdmFsLCBrZXkpe1xyXG4gICAgICAgIGlmKCBrZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIG1hcHBlZFtrZXldID0gdmFsXHJcbiAgICAgIH0sIHt9KVxyXG4gICAgfSxcclxuXHJcbiAgICBmaW5kOiBmdW5jdGlvbihhcnIsIGNiLCB0aGlzQXJnKXtcclxuICAgICAgdmFyIHJlc3VsdDtcclxuICAgICAgaWYoIEFycmF5LmlzQXJyYXkoYXJyKSkge1xyXG4gICAgICAgIGFyci5ldmVyeShmdW5jdGlvbih2YWwsIGlkeCl7XHJcbiAgICAgICAgICBpZiggY2IuY2FsbCh0aGlzQXJnLCB2YWwsIGlkeCwgYXJyKSkgcmV0dXJuIChyZXN1bHQgPSB2YWwpLCBmYWxzZVxyXG4gICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgfVxyXG4gICAgICBlbHNlIFxyXG4gICAgICAgIGZvcih2YXIga2V5IGluIGFycikgaWYoIGhhcyhhcnIsIGtleSkgKSBcclxuICAgICAgICAgIGlmKCBjYi5jYWxsKHRoaXNBcmcsIGFycltrZXldLCBrZXksIGFycikgKSBcclxuICAgICAgICAgICAgcmV0dXJuIGFycltrZXldOyBcclxuICAgIH0sXHJcblxyXG4gICAgY2h1bms6IGZ1bmN0aW9uKGFycmF5LCBjaHVua1NpemUpIHtcclxuICAgICAgdmFyIGluZGV4ID0gMCwgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwXHJcbiAgICAgICAgLCByZXN1bHQgPSBbXTtcclxuXHJcbiAgICAgIGNodW5rU2l6ZSA9IE1hdGgubWF4KCtjaHVua1NpemUgfHwgMSwgMSlcclxuXHJcbiAgICAgIHdoaWxlIChpbmRleCA8IGxlbmd0aClcclxuICAgICAgICByZXN1bHQucHVzaChhcnJheS5zbGljZShpbmRleCwgKGluZGV4ICs9IGNodW5rU2l6ZSkpKVxyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgfSxcclxuXHJcbiAgICBzcGxhdDogZnVuY3Rpb24ob2JqKXtcclxuICAgICAgcmV0dXJuIG9iaiA9PSBudWxsID8gW10gOiBbXS5jb25jYXQob2JqKVxyXG4gICAgfSxcclxuXHJcbiAgICBub29wOiBmdW5jdGlvbigpe30sXHJcblxyXG4gICAgdW5pcXVlSWQ6IGZ1bmN0aW9uIChwcmVmaXgpIHtcclxuICAgICAgcmV0dXJuICcnKyAoKHByZWZpeCA9PSBudWxsID8gJycgOiBwcmVmaXgpICsgKCsraWRDb3VudCkpO1xyXG4gICAgfSxcclxuXHJcbiAgICBpZk5vdERpc2FibGVkOiBmdW5jdGlvbiAoZGlzYWJsZWRPbmx5LCBmbil7XHJcbiAgICAgIGlmIChhcmd1bWVudC5sZW5ndGggPT09IDEpXHJcbiAgICAgICAgZm4gPSBkaXNhYmxlZE9ubHksIGRpc2FibGVkT25seSA9IGZhbHNlO1xyXG5cclxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3Mpe1xyXG4gICAgICAgIGlmICggISh0aGlzLmlzRGlzYWJsZWQoKSB8fCAoIWRpc2FibGVkT25seSAmJiB0aGlzLmlzUmVhZE9ubHkoKSkpIClcclxuICAgICAgICAgIHJldHVyblxyXG5cclxuICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbmZ1bmN0aW9uIGhhcyhvLCBrKXtcclxuICByZXR1cm4gbyA/IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBrKSA6IGZhbHNlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XHJcbiAgdmFyIGtleTtcclxuXHJcbiAgZm9yIChrZXkgaW4gb2JqQSkgaWYgKCBoYXMob2JqQSwga2V5KSAmJiAoIWhhcyhvYmpCLCBrZXkpIHx8IG9iakFba2V5XSAhPT0gb2JqQltrZXldKSkgXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgXHJcbiAgZm9yIChrZXkgaW4gb2JqQikgaWYgKCBoYXMob2JqQiwga2V5KSAmJiAhaGFzKG9iakEsIGtleSkpIFxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgXHJcbiAgcmV0dXJuIHRydWU7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL18uanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBjb21tb24gPSB7XHJcbiAgICAgIGVxOiAgIGZ1bmN0aW9uKGEsIGIpeyByZXR1cm4gYSA9PT0gYiB9LFxyXG4gICAgICBuZXE6ICBmdW5jdGlvbihhLCBiKXsgcmV0dXJuIGEgIT09IGIgfSxcclxuICAgICAgZ3Q6ICAgZnVuY3Rpb24oYSwgYil7IHJldHVybiBhID4gYiAgIH0sXHJcbiAgICAgIGd0ZTogIGZ1bmN0aW9uKGEsIGIpeyByZXR1cm4gYSA+PSBiICB9LFxyXG4gICAgICBsdDogICBmdW5jdGlvbihhLCBiKXsgcmV0dXJuIGEgPCBiICAgfSxcclxuICAgICAgbHRlOiAgZnVuY3Rpb24oYSwgYil7IHJldHVybiBhIDw9IGIgIH0sXHJcblxyXG4gICAgICBjb250YWluczogZnVuY3Rpb24oYSwgYil7XHJcbiAgICAgICAgcmV0dXJuIGEuaW5kZXhPZihiKSAhPT0gLTFcclxuICAgICAgfSxcclxuXHJcbiAgICAgIHN0YXJ0c1dpdGg6IGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICByZXR1cm4gYS5sYXN0SW5kZXhPZihiLCAwKSA9PT0gMDtcclxuICAgICAgfSxcclxuXHJcbiAgICAgIGVuZHNXaXRoOiBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IGEubGVuZ3RoIC0gYi5sZW5ndGhcclxuICAgICAgICAgICwgbGFzdEluZGV4ID0gYS5pbmRleE9mKGIsIHBvcyk7XHJcblxyXG4gICAgICAgIHJldHVybiAgbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvcztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb21tb25cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2ZpbHRlci5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIGVsZW1lbnRUeXBlOiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihcclxuICAgIGZ1bmN0aW9uIChwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uKSB7XHJcblxyXG4gICAgICBpZiggdHlwZW9mIHByb3BzW3Byb3BOYW1lXSAhPT0gJ2Z1bmN0aW9uJyl7XHJcbiAgICAgICAgaWYgKCBSZWFjdC5pc1ZhbGlkRWxlbWVudChwcm9wc1twcm9wTmFtZV0pKVxyXG4gICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcclxuICAgICAgICAgICAgJ0ludmFsaWQgcHJvcCBgJyArIHByb3BOYW1lICsgJ2Agc3BlY2lmaWVkIGluICBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcclxuICAgICAgICAgICAgJyBFeHBlY3RlZCBhbiBFbGVtZW50IGB0eXBlYCwgbm90IGFuIGFjdHVhbCBFbGVtZW50JylcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wc1twcm9wTmFtZV0gIT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcclxuICAgICAgICAgICAgJ0ludmFsaWQgcHJvcCBgJyArIHByb3BOYW1lICsgJ2Agc3BlY2lmaWVkIGluICBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcclxuICAgICAgICAgICAgJyBFeHBlY3RlZCBhbiBFbGVtZW50IGB0eXBlYCBzdWNoIGFzIGEgdGFnIG5hbWUgb3IgcmV0dXJuIHZhbHVlIG9mIFJlYWN0LmNyZWF0ZUNsYXNzKC4uLiknKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9KSxcclxuXHJcbiAgICBsb2NhbGVGb3JtYXQ6IFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsIFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jXHJcbiAgICAgICAgICAgICAgICAgIF0pLFxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcclxuXHJcbiAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24pIHtcclxuICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8ICc8PGFub255bW91cz4+JztcclxuICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xyXG4gICAgICBpZiAoaXNSZXF1aXJlZCkge1xyXG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoXHJcbiAgICAgICAgICBcIlJlcXVpcmVkIHByb3AgYFwiICsgcHJvcE5hbWUgKyBcImAgd2FzIG5vdCBzcGVjaWZpZWQgaW4gIGBcIiArIGNvbXBvbmVudE5hbWUgKyBcImAuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG4gICAgZWxzZSBcclxuICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XHJcbiAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XHJcblxyXG4gIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL3Byb3BUeXBlcy5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIE1FVEhPRFMgPSBbJ25leHQnLCdwcmV2JywgJ2ZpcnN0JywgJ2xhc3QnXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdmFsaWRhdGVMaXN0Q29tcG9uZW50KGxpc3Qpe1xyXG5cclxuICBpZiggXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKXtcclxuICAgIE1FVEhPRFMuZm9yRWFjaCggbWV0aG9kID0+IFxyXG4gICAgICBhc3NlcnQodHlwZW9mIGxpc3RbbWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJywgJ0xpc3QgY29tcG9uZW50cyBtdXN0IGltcGxlbWVudCBhIGAnICsgbWV0aG9kICsnKClgIG1ldGhvZCcpIClcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFzc2VydChjb25kaXRpb24sIG1zZyl7XHJcbiAgdmFyIGVycm9yXHJcblxyXG4gIGlmICggIWNvbmRpdGlvbil7XHJcbiAgICBlcnJvciA9IG5ldyBFcnJvcihtc2cpXHJcbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7XHJcbiAgICB0aHJvdyBlcnJvcjtcclxuICB9ICBcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL3V0aWwvdmFsaWRhdGVMaXN0SW50ZXJmYWNlLmpzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbnZhciB7IFxyXG4gICAgb25cclxuICAsIG9mZiB9ID0gcmVxdWlyZSgnLi9ldmVudHMnKVxyXG4gICwgeyBcclxuICAgIGhlaWdodFxyXG4gICwgd2lkdGhcclxuICAsIG9mZnNldCB9ID0gcmVxdWlyZSgnLi9kaW1lbnNpb25zJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICBoZWlnaHQsIFxyXG5cclxuICB3aWR0aCwgXHJcblxyXG4gIG9mZnNldCxcclxuXHJcbiAgb24sIFxyXG5cclxuICBvZmYsIFxyXG5cclxuICBjc3M6IHJlcXVpcmUoJy4vY3NzJyksXHJcblxyXG4gIGNvbnRhaW5zOiByZXF1aXJlKCcuL2NvbnRhaW5zJyksXHJcblxyXG4gIHNjcm9sbFBhcmVudDogcmVxdWlyZSgnLi9zY3JvbGxQYXJlbnQnKSxcclxuXHJcbiAgc2Nyb2xsVG9wOiByZXF1aXJlKCcuL3Njcm9sbFRvcCcpLFxyXG5cclxuICByYWY6IHJlcXVpcmUoJy4vcmVxdWVzdEFuaW1hdGlvbkZyYW1lJyksXHJcblxyXG4gIGFuaW1hdGU6IHJlcXVpcmUoJy4vYW5pbWF0ZScpLFxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvdXRpbC9kb20vaW5kZXguanNcbiAqKi8iLCIvKlxuICogR2xvYmFsaXplIEN1bHR1cmUgZXNcbiAqXG4gKiBodHRwOi8vZ2l0aHViLmNvbS9qcXVlcnkvZ2xvYmFsaXplXG4gKlxuICogQ29weXJpZ2h0IFNvZnR3YXJlIEZyZWVkb20gQ29uc2VydmFuY3ksIEluYy5cbiAqIER1YWwgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBvciBHUEwgVmVyc2lvbiAyIGxpY2Vuc2VzLlxuICogaHR0cDovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIFRoaXMgZmlsZSB3YXMgZ2VuZXJhdGVkIGJ5IHRoZSBHbG9iYWxpemUgQ3VsdHVyZSBHZW5lcmF0b3JcbiAqIFRyYW5zbGF0aW9uOiBidWdzIGZvdW5kIGluIHRoaXMgZmlsZSBuZWVkIHRvIGJlIGZpeGVkIGluIHRoZSBnZW5lcmF0b3JcbiAqL1xuXG4oZnVuY3Rpb24oIHdpbmRvdywgdW5kZWZpbmVkICkge1xuXG52YXIgR2xvYmFsaXplO1xuXG5pZiAoIHR5cGVvZiByZXF1aXJlICE9PSBcInVuZGVmaW5lZFwiICYmXG5cdHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiICYmXG5cdHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgKSB7XG5cdC8vIEFzc3VtZSBDb21tb25KU1xuXHRHbG9iYWxpemUgPSByZXF1aXJlKCBcImdsb2JhbGl6ZVwiICk7XG59IGVsc2Uge1xuXHQvLyBHbG9iYWwgdmFyaWFibGVcblx0R2xvYmFsaXplID0gd2luZG93Lkdsb2JhbGl6ZTtcbn1cblxuR2xvYmFsaXplLmFkZEN1bHR1cmVJbmZvKCBcImVzXCIsIFwiZGVmYXVsdFwiLCB7XG5cdG5hbWU6IFwiZXNcIixcblx0ZW5nbGlzaE5hbWU6IFwiU3BhbmlzaFwiLFxuXHRuYXRpdmVOYW1lOiBcImVzcGHDsW9sXCIsXG5cdGxhbmd1YWdlOiBcImVzXCIsXG5cdG51bWJlckZvcm1hdDoge1xuXHRcdFwiLFwiOiBcIi5cIixcblx0XHRcIi5cIjogXCIsXCIsXG5cdFx0XCJOYU5cIjogXCJOZXVOXCIsXG5cdFx0bmVnYXRpdmVJbmZpbml0eTogXCItSW5maW5pdG9cIixcblx0XHRwb3NpdGl2ZUluZmluaXR5OiBcIkluZmluaXRvXCIsXG5cdFx0cGVyY2VudDoge1xuXHRcdFx0XCIsXCI6IFwiLlwiLFxuXHRcdFx0XCIuXCI6IFwiLFwiXG5cdFx0fSxcblx0XHRjdXJyZW5jeToge1xuXHRcdFx0cGF0dGVybjogW1wiLW4gJFwiLFwibiAkXCJdLFxuXHRcdFx0XCIsXCI6IFwiLlwiLFxuXHRcdFx0XCIuXCI6IFwiLFwiLFxuXHRcdFx0c3ltYm9sOiBcIuKCrFwiXG5cdFx0fVxuXHR9LFxuXHRjYWxlbmRhcnM6IHtcblx0XHRzdGFuZGFyZDoge1xuXHRcdFx0Zmlyc3REYXk6IDEsXG5cdFx0XHRkYXlzOiB7XG5cdFx0XHRcdG5hbWVzOiBbXCJkb21pbmdvXCIsXCJsdW5lc1wiLFwibWFydGVzXCIsXCJtacOpcmNvbGVzXCIsXCJqdWV2ZXNcIixcInZpZXJuZXNcIixcInPDoWJhZG9cIl0sXG5cdFx0XHRcdG5hbWVzQWJicjogW1wiZG9tXCIsXCJsdW5cIixcIm1hclwiLFwibWnDqVwiLFwianVlXCIsXCJ2aWVcIixcInPDoWJcIl0sXG5cdFx0XHRcdG5hbWVzU2hvcnQ6IFtcImRvXCIsXCJsdVwiLFwibWFcIixcIm1pXCIsXCJqdVwiLFwidmlcIixcInPDoVwiXVxuXHRcdFx0fSxcblx0XHRcdG1vbnRoczoge1xuXHRcdFx0XHRuYW1lczogW1wiZW5lcm9cIixcImZlYnJlcm9cIixcIm1hcnpvXCIsXCJhYnJpbFwiLFwibWF5b1wiLFwianVuaW9cIixcImp1bGlvXCIsXCJhZ29zdG9cIixcInNlcHRpZW1icmVcIixcIm9jdHVicmVcIixcIm5vdmllbWJyZVwiLFwiZGljaWVtYnJlXCIsXCJcIl0sXG5cdFx0XHRcdG5hbWVzQWJicjogW1wiZW5lXCIsXCJmZWJcIixcIm1hclwiLFwiYWJyXCIsXCJtYXlcIixcImp1blwiLFwianVsXCIsXCJhZ29cIixcInNlcFwiLFwib2N0XCIsXCJub3ZcIixcImRpY1wiLFwiXCJdXG5cdFx0XHR9LFxuXHRcdFx0QU06IG51bGwsXG5cdFx0XHRQTTogbnVsbCxcblx0XHRcdGVyYXM6IFt7XCJuYW1lXCI6XCJkLkMuXCIsXCJzdGFydFwiOm51bGwsXCJvZmZzZXRcIjowfV0sXG5cdFx0XHRwYXR0ZXJuczoge1xuXHRcdFx0XHRkOiBcImRkL01NL3l5eXlcIixcblx0XHRcdFx0RDogXCJkZGRkLCBkZCcgZGUgJ01NTU0nIGRlICd5eXl5XCIsXG5cdFx0XHRcdHQ6IFwiSDptbVwiLFxuXHRcdFx0XHRUOiBcIkg6bW06c3NcIixcblx0XHRcdFx0ZjogXCJkZGRkLCBkZCcgZGUgJ01NTU0nIGRlICd5eXl5IEg6bW1cIixcblx0XHRcdFx0RjogXCJkZGRkLCBkZCcgZGUgJ01NTU0nIGRlICd5eXl5IEg6bW06c3NcIixcblx0XHRcdFx0TTogXCJkZCBNTU1NXCIsXG5cdFx0XHRcdFk6IFwiTU1NTScgZGUgJ3l5eXlcIlxuXHRcdFx0fVxuXHRcdH1cblx0fVxufSk7XG5cbn0oIHRoaXMgKSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9nbG9iYWxpemUvbGliL2N1bHR1cmVzL2dsb2JhbGl6ZS5jdWx0dXJlLmVzLmpzXG4gKiogbW9kdWxlIGlkID0gMzlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gdHJ1ZTtcbiAgICB2YXIgY3VycmVudFF1ZXVlO1xuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgICAgICAgICBjdXJyZW50UXVldWVbaV0oKTtcbiAgICAgICAgfVxuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG59XG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHF1ZXVlLnB1c2goZnVuKTtcbiAgICBpZiAoIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIVxuICogR2xvYmFsaXplXG4gKlxuICogaHR0cDovL2dpdGh1Yi5jb20vanF1ZXJ5L2dsb2JhbGl6ZVxuICpcbiAqIENvcHlyaWdodCBTb2Z0d2FyZSBGcmVlZG9tIENvbnNlcnZhbmN5LCBJbmMuXG4gKiBEdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgb3IgR1BMIFZlcnNpb24gMiBsaWNlbnNlcy5cbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqL1xuXG4oZnVuY3Rpb24oIHdpbmRvdywgdW5kZWZpbmVkICkge1xuXG52YXIgR2xvYmFsaXplLFxuXHQvLyBwcml2YXRlIHZhcmlhYmxlc1xuXHRyZWdleEhleCxcblx0cmVnZXhJbmZpbml0eSxcblx0cmVnZXhQYXJzZUZsb2F0LFxuXHRyZWdleFRyaW0sXG5cdC8vIHByaXZhdGUgSmF2YVNjcmlwdCB1dGlsaXR5IGZ1bmN0aW9uc1xuXHRhcnJheUluZGV4T2YsXG5cdGVuZHNXaXRoLFxuXHRleHRlbmQsXG5cdGlzQXJyYXksXG5cdGlzRnVuY3Rpb24sXG5cdGlzT2JqZWN0LFxuXHRzdGFydHNXaXRoLFxuXHR0cmltLFxuXHR0cnVuY2F0ZSxcblx0emVyb1BhZCxcblx0Ly8gcHJpdmF0ZSBHbG9iYWxpemF0aW9uIHV0aWxpdHkgZnVuY3Rpb25zXG5cdGFwcGVuZFByZU9yUG9zdE1hdGNoLFxuXHRleHBhbmRGb3JtYXQsXG5cdGZvcm1hdERhdGUsXG5cdGZvcm1hdE51bWJlcixcblx0Z2V0VG9rZW5SZWdFeHAsXG5cdGdldEVyYSxcblx0Z2V0RXJhWWVhcixcblx0cGFyc2VFeGFjdCxcblx0cGFyc2VOZWdhdGl2ZVBhdHRlcm47XG5cbi8vIEdsb2JhbCB2YXJpYWJsZSAoR2xvYmFsaXplKSBvciBDb21tb25KUyBtb2R1bGUgKGdsb2JhbGl6ZSlcbkdsb2JhbGl6ZSA9IGZ1bmN0aW9uKCBjdWx0dXJlU2VsZWN0b3IgKSB7XG5cdHJldHVybiBuZXcgR2xvYmFsaXplLnByb3RvdHlwZS5pbml0KCBjdWx0dXJlU2VsZWN0b3IgKTtcbn07XG5cbmlmICggdHlwZW9mIHJlcXVpcmUgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0dHlwZW9mIGV4cG9ydHMgIT09IFwidW5kZWZpbmVkXCIgJiZcblx0dHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0Ly8gQXNzdW1lIENvbW1vbkpTXG5cdG1vZHVsZS5leHBvcnRzID0gR2xvYmFsaXplO1xufSBlbHNlIHtcblx0Ly8gRXhwb3J0IGFzIGdsb2JhbCB2YXJpYWJsZVxuXHR3aW5kb3cuR2xvYmFsaXplID0gR2xvYmFsaXplO1xufVxuXG5HbG9iYWxpemUuY3VsdHVyZXMgPSB7fTtcblxuR2xvYmFsaXplLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IEdsb2JhbGl6ZSxcblx0aW5pdDogZnVuY3Rpb24oIGN1bHR1cmVTZWxlY3RvciApIHtcblx0XHR0aGlzLmN1bHR1cmVzID0gR2xvYmFsaXplLmN1bHR1cmVzO1xuXHRcdHRoaXMuY3VsdHVyZVNlbGVjdG9yID0gY3VsdHVyZVNlbGVjdG9yO1xuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn07XG5HbG9iYWxpemUucHJvdG90eXBlLmluaXQucHJvdG90eXBlID0gR2xvYmFsaXplLnByb3RvdHlwZTtcblxuLy8gMS4gV2hlbiBkZWZpbmluZyBhIGN1bHR1cmUsIGFsbCBmaWVsZHMgYXJlIHJlcXVpcmVkIGV4Y2VwdCB0aGUgb25lcyBzdGF0ZWQgYXMgb3B0aW9uYWwuXG4vLyAyLiBFYWNoIGN1bHR1cmUgc2hvdWxkIGhhdmUgYSBcIi5jYWxlbmRhcnNcIiBvYmplY3Qgd2l0aCBhdCBsZWFzdCBvbmUgY2FsZW5kYXIgbmFtZWQgXCJzdGFuZGFyZFwiXG4vLyAgICB3aGljaCBzZXJ2ZXMgYXMgdGhlIGRlZmF1bHQgY2FsZW5kYXIgaW4gdXNlIGJ5IHRoYXQgY3VsdHVyZS5cbi8vIDMuIEVhY2ggY3VsdHVyZSBzaG91bGQgaGF2ZSBhIFwiLmNhbGVuZGFyXCIgb2JqZWN0IHdoaWNoIGlzIHRoZSBjdXJyZW50IGNhbGVuZGFyIGJlaW5nIHVzZWQsXG4vLyAgICBpdCBtYXkgYmUgZHluYW1pY2FsbHkgY2hhbmdlZCBhdCBhbnkgdGltZSB0byBvbmUgb2YgdGhlIGNhbGVuZGFycyBpbiBcIi5jYWxlbmRhcnNcIi5cbkdsb2JhbGl6ZS5jdWx0dXJlc1sgXCJkZWZhdWx0XCIgXSA9IHtcblx0Ly8gQSB1bmlxdWUgbmFtZSBmb3IgdGhlIGN1bHR1cmUgaW4gdGhlIGZvcm0gPGxhbmd1YWdlIGNvZGU+LTxjb3VudHJ5L3JlZ2lvbiBjb2RlPlxuXHRuYW1lOiBcImVuXCIsXG5cdC8vIHRoZSBuYW1lIG9mIHRoZSBjdWx0dXJlIGluIHRoZSBlbmdsaXNoIGxhbmd1YWdlXG5cdGVuZ2xpc2hOYW1lOiBcIkVuZ2xpc2hcIixcblx0Ly8gdGhlIG5hbWUgb2YgdGhlIGN1bHR1cmUgaW4gaXRzIG93biBsYW5ndWFnZVxuXHRuYXRpdmVOYW1lOiBcIkVuZ2xpc2hcIixcblx0Ly8gd2hldGhlciB0aGUgY3VsdHVyZSB1c2VzIHJpZ2h0LXRvLWxlZnQgdGV4dFxuXHRpc1JUTDogZmFsc2UsXG5cdC8vIFwibGFuZ3VhZ2VcIiBpcyB1c2VkIGZvciBzby1jYWxsZWQgXCJzcGVjaWZpY1wiIGN1bHR1cmVzLlxuXHQvLyBGb3IgZXhhbXBsZSwgdGhlIGN1bHR1cmUgXCJlcy1DTFwiIG1lYW5zIFwiU3BhbmlzaCwgaW4gQ2hpbGlcIi5cblx0Ly8gSXQgcmVwcmVzZW50cyB0aGUgU3BhbmlzaC1zcGVha2luZyBjdWx0dXJlIGFzIGl0IGlzIGluIENoaWxpLFxuXHQvLyB3aGljaCBtaWdodCBoYXZlIGRpZmZlcmVudCBmb3JtYXR0aW5nIHJ1bGVzIG9yIGV2ZW4gdHJhbnNsYXRpb25zXG5cdC8vIHRoYW4gU3BhbmlzaCBpbiBTcGFpbi4gQSBcIm5ldXRyYWxcIiBjdWx0dXJlIGlzIG9uZSB0aGF0IGlzIG5vdFxuXHQvLyBzcGVjaWZpYyB0byBhIHJlZ2lvbi4gRm9yIGV4YW1wbGUsIHRoZSBjdWx0dXJlIFwiZXNcIiBpcyB0aGUgZ2VuZXJpY1xuXHQvLyBTcGFuaXNoIGN1bHR1cmUsIHdoaWNoIG1heSBiZSBhIG1vcmUgZ2VuZXJhbGl6ZWQgdmVyc2lvbiBvZiB0aGUgbGFuZ3VhZ2Vcblx0Ly8gdGhhdCBtYXkgb3IgbWF5IG5vdCBiZSB3aGF0IGEgc3BlY2lmaWMgY3VsdHVyZSBleHBlY3RzLlxuXHQvLyBGb3IgYSBzcGVjaWZpYyBjdWx0dXJlIGxpa2UgXCJlcy1DTFwiLCB0aGUgXCJsYW5ndWFnZVwiIGZpZWxkIHJlZmVycyB0byB0aGVcblx0Ly8gbmV1dHJhbCwgZ2VuZXJpYyBjdWx0dXJlIGluZm9ybWF0aW9uIGZvciB0aGUgbGFuZ3VhZ2UgaXQgaXMgdXNpbmcuXG5cdC8vIFRoaXMgaXMgbm90IGFsd2F5cyBhIHNpbXBsZSBtYXR0ZXIgb2YgdGhlIHN0cmluZyBiZWZvcmUgdGhlIGRhc2guXG5cdC8vIEZvciBleGFtcGxlLCB0aGUgXCJ6aC1IYW5zXCIgY3VsdHVyZSBpcyBuZXR1cmFsIChTaW1wbGlmaWVkIENoaW5lc2UpLlxuXHQvLyBBbmQgdGhlIFwiemgtU0dcIiBjdWx0dXJlIGlzIFNpbXBsaWZpZWQgQ2hpbmVzZSBpbiBTaW5nYXBvcmUsIHdob3NlIGxhbnVnYWdlXG5cdC8vIGZpZWxkIGlzIFwiemgtQ0hTXCIsIG5vdCBcInpoXCIuXG5cdC8vIFRoaXMgZmllbGQgc2hvdWxkIGJlIHVzZWQgdG8gbmF2aWdhdGUgZnJvbSBhIHNwZWNpZmljIGN1bHR1cmUgdG8gaXQnc1xuXHQvLyBtb3JlIGdlbmVyYWwsIG5ldXRyYWwgY3VsdHVyZS4gSWYgYSBjdWx0dXJlIGlzIGFscmVhZHkgYXMgZ2VuZXJhbCBhcyBpdFxuXHQvLyBjYW4gZ2V0LCB0aGUgbGFuZ3VhZ2UgbWF5IHJlZmVyIHRvIGl0c2VsZi5cblx0bGFuZ3VhZ2U6IFwiZW5cIixcblx0Ly8gbnVtYmVyRm9ybWF0IGRlZmluZXMgZ2VuZXJhbCBudW1iZXIgZm9ybWF0dGluZyBydWxlcywgbGlrZSB0aGUgZGlnaXRzIGluXG5cdC8vIGVhY2ggZ3JvdXBpbmcsIHRoZSBncm91cCBzZXBhcmF0b3IsIGFuZCBob3cgbmVnYXRpdmUgbnVtYmVycyBhcmUgZGlzcGxheWVkLlxuXHRudW1iZXJGb3JtYXQ6IHtcblx0XHQvLyBbbmVnYXRpdmVQYXR0ZXJuXVxuXHRcdC8vIE5vdGUsIG51bWJlckZvcm1hdC5wYXR0ZXJuIGhhcyBubyBcInBvc2l0aXZlUGF0dGVyblwiIHVubGlrZSBwZXJjZW50IGFuZCBjdXJyZW5jeSxcblx0XHQvLyBidXQgaXMgc3RpbGwgZGVmaW5lZCBhcyBhbiBhcnJheSBmb3IgY29uc2lzdGVuY3kgd2l0aCB0aGVtLlxuXHRcdC8vICAgbmVnYXRpdmVQYXR0ZXJuOiBvbmUgb2YgXCIobil8LW58LSBufG4tfG4gLVwiXG5cdFx0cGF0dGVybjogWyBcIi1uXCIgXSxcblx0XHQvLyBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgbm9ybWFsbHkgc2hvd25cblx0XHRkZWNpbWFsczogMixcblx0XHQvLyBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgbnVtYmVyIGdyb3VwcywgYXMgaW4gMSwwMDAsMDAwXG5cdFx0XCIsXCI6IFwiLFwiLFxuXHRcdC8vIHN0cmluZyB0aGF0IHNlcGFyYXRlcyBhIG51bWJlciBmcm9tIHRoZSBmcmFjdGlvbmFsIHBvcnRpb24sIGFzIGluIDEuOTlcblx0XHRcIi5cIjogXCIuXCIsXG5cdFx0Ly8gYXJyYXkgb2YgbnVtYmVycyBpbmRpY2F0aW5nIHRoZSBzaXplIG9mIGVhY2ggbnVtYmVyIGdyb3VwLlxuXHRcdC8vIFRPRE86IG1vcmUgZGV0YWlsZWQgZGVzY3JpcHRpb24gYW5kIGV4YW1wbGVcblx0XHRncm91cFNpemVzOiBbIDMgXSxcblx0XHQvLyBzeW1ib2wgdXNlZCBmb3IgcG9zaXRpdmUgbnVtYmVyc1xuXHRcdFwiK1wiOiBcIitcIixcblx0XHQvLyBzeW1ib2wgdXNlZCBmb3IgbmVnYXRpdmUgbnVtYmVyc1xuXHRcdFwiLVwiOiBcIi1cIixcblx0XHQvLyBzeW1ib2wgdXNlZCBmb3IgTmFOIChOb3QtQS1OdW1iZXIpXG5cdFx0XCJOYU5cIjogXCJOYU5cIixcblx0XHQvLyBzeW1ib2wgdXNlZCBmb3IgTmVnYXRpdmUgSW5maW5pdHlcblx0XHRuZWdhdGl2ZUluZmluaXR5OiBcIi1JbmZpbml0eVwiLFxuXHRcdC8vIHN5bWJvbCB1c2VkIGZvciBQb3NpdGl2ZSBJbmZpbml0eVxuXHRcdHBvc2l0aXZlSW5maW5pdHk6IFwiSW5maW5pdHlcIixcblx0XHRwZXJjZW50OiB7XG5cdFx0XHQvLyBbbmVnYXRpdmVQYXR0ZXJuLCBwb3NpdGl2ZVBhdHRlcm5dXG5cdFx0XHQvLyAgIG5lZ2F0aXZlUGF0dGVybjogb25lIG9mIFwiLW4gJXwtbiV8LSVufCUtbnwlbi18bi0lfG4lLXwtJSBufG4gJS18JSBuLXwlIC1ufG4tICVcIlxuXHRcdFx0Ly8gICBwb3NpdGl2ZVBhdHRlcm46IG9uZSBvZiBcIm4gJXxuJXwlbnwlIG5cIlxuXHRcdFx0cGF0dGVybjogWyBcIi1uICVcIiwgXCJuICVcIiBdLFxuXHRcdFx0Ly8gbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIG5vcm1hbGx5IHNob3duXG5cdFx0XHRkZWNpbWFsczogMixcblx0XHRcdC8vIGFycmF5IG9mIG51bWJlcnMgaW5kaWNhdGluZyB0aGUgc2l6ZSBvZiBlYWNoIG51bWJlciBncm91cC5cblx0XHRcdC8vIFRPRE86IG1vcmUgZGV0YWlsZWQgZGVzY3JpcHRpb24gYW5kIGV4YW1wbGVcblx0XHRcdGdyb3VwU2l6ZXM6IFsgMyBdLFxuXHRcdFx0Ly8gc3RyaW5nIHRoYXQgc2VwYXJhdGVzIG51bWJlciBncm91cHMsIGFzIGluIDEsMDAwLDAwMFxuXHRcdFx0XCIsXCI6IFwiLFwiLFxuXHRcdFx0Ly8gc3RyaW5nIHRoYXQgc2VwYXJhdGVzIGEgbnVtYmVyIGZyb20gdGhlIGZyYWN0aW9uYWwgcG9ydGlvbiwgYXMgaW4gMS45OVxuXHRcdFx0XCIuXCI6IFwiLlwiLFxuXHRcdFx0Ly8gc3ltYm9sIHVzZWQgdG8gcmVwcmVzZW50IGEgcGVyY2VudGFnZVxuXHRcdFx0c3ltYm9sOiBcIiVcIlxuXHRcdH0sXG5cdFx0Y3VycmVuY3k6IHtcblx0XHRcdC8vIFtuZWdhdGl2ZVBhdHRlcm4sIHBvc2l0aXZlUGF0dGVybl1cblx0XHRcdC8vICAgbmVnYXRpdmVQYXR0ZXJuOiBvbmUgb2YgXCIoJG4pfC0kbnwkLW58JG4tfChuJCl8LW4kfG4tJHxuJC18LW4gJHwtJCBufG4gJC18JCBuLXwkIC1ufG4tICR8KCQgbil8KG4gJClcIlxuXHRcdFx0Ly8gICBwb3NpdGl2ZVBhdHRlcm46IG9uZSBvZiBcIiRufG4kfCQgbnxuICRcIlxuXHRcdFx0cGF0dGVybjogWyBcIigkbilcIiwgXCIkblwiIF0sXG5cdFx0XHQvLyBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgbm9ybWFsbHkgc2hvd25cblx0XHRcdGRlY2ltYWxzOiAyLFxuXHRcdFx0Ly8gYXJyYXkgb2YgbnVtYmVycyBpbmRpY2F0aW5nIHRoZSBzaXplIG9mIGVhY2ggbnVtYmVyIGdyb3VwLlxuXHRcdFx0Ly8gVE9ETzogbW9yZSBkZXRhaWxlZCBkZXNjcmlwdGlvbiBhbmQgZXhhbXBsZVxuXHRcdFx0Z3JvdXBTaXplczogWyAzIF0sXG5cdFx0XHQvLyBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgbnVtYmVyIGdyb3VwcywgYXMgaW4gMSwwMDAsMDAwXG5cdFx0XHRcIixcIjogXCIsXCIsXG5cdFx0XHQvLyBzdHJpbmcgdGhhdCBzZXBhcmF0ZXMgYSBudW1iZXIgZnJvbSB0aGUgZnJhY3Rpb25hbCBwb3J0aW9uLCBhcyBpbiAxLjk5XG5cdFx0XHRcIi5cIjogXCIuXCIsXG5cdFx0XHQvLyBzeW1ib2wgdXNlZCB0byByZXByZXNlbnQgY3VycmVuY3lcblx0XHRcdHN5bWJvbDogXCIkXCJcblx0XHR9XG5cdH0sXG5cdC8vIGNhbGVuZGFycyBkZWZpbmVzIGFsbCB0aGUgcG9zc2libGUgY2FsZW5kYXJzIHVzZWQgYnkgdGhpcyBjdWx0dXJlLlxuXHQvLyBUaGVyZSBzaG91bGQgYmUgYXQgbGVhc3Qgb25lIGRlZmluZWQgd2l0aCBuYW1lIFwic3RhbmRhcmRcIiwgYW5kIGlzIHRoZSBkZWZhdWx0XG5cdC8vIGNhbGVuZGFyIHVzZWQgYnkgdGhlIGN1bHR1cmUuXG5cdC8vIEEgY2FsZW5kYXIgY29udGFpbnMgaW5mb3JtYXRpb24gYWJvdXQgaG93IGRhdGVzIGFyZSBmb3JtYXR0ZWQsIGluZm9ybWF0aW9uIGFib3V0XG5cdC8vIHRoZSBjYWxlbmRhcidzIGVyYXMsIGEgc3RhbmRhcmQgc2V0IG9mIHRoZSBkYXRlIGZvcm1hdHMsXG5cdC8vIHRyYW5zbGF0aW9ucyBmb3IgZGF5IGFuZCBtb250aCBuYW1lcywgYW5kIGlmIHRoZSBjYWxlbmRhciBpcyBub3QgYmFzZWQgb24gdGhlIEdyZWdvcmlhblxuXHQvLyBjYWxlbmRhciwgY29udmVyc2lvbiBmdW5jdGlvbnMgdG8gYW5kIGZyb20gdGhlIEdyZWdvcmlhbiBjYWxlbmRhci5cblx0Y2FsZW5kYXJzOiB7XG5cdFx0c3RhbmRhcmQ6IHtcblx0XHRcdC8vIG5hbWUgdGhhdCBpZGVudGlmaWVzIHRoZSB0eXBlIG9mIGNhbGVuZGFyIHRoaXMgaXNcblx0XHRcdG5hbWU6IFwiR3JlZ29yaWFuX1VTRW5nbGlzaFwiLFxuXHRcdFx0Ly8gc2VwYXJhdG9yIG9mIHBhcnRzIG9mIGEgZGF0ZSAoZS5nLiBcIi9cIiBpbiAxMS8wNS8xOTU1KVxuXHRcdFx0XCIvXCI6IFwiL1wiLFxuXHRcdFx0Ly8gc2VwYXJhdG9yIG9mIHBhcnRzIG9mIGEgdGltZSAoZS5nLiBcIjpcIiBpbiAwNTo0NCBQTSlcblx0XHRcdFwiOlwiOiBcIjpcIixcblx0XHRcdC8vIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgKDAgPSBTdW5kYXksIDEgPSBNb25kYXksIGV0Yylcblx0XHRcdGZpcnN0RGF5OiAwLFxuXHRcdFx0ZGF5czoge1xuXHRcdFx0XHQvLyBmdWxsIGRheSBuYW1lc1xuXHRcdFx0XHRuYW1lczogWyBcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCIgXSxcblx0XHRcdFx0Ly8gYWJicmV2aWF0ZWQgZGF5IG5hbWVzXG5cdFx0XHRcdG5hbWVzQWJicjogWyBcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiIF0sXG5cdFx0XHRcdC8vIHNob3J0ZXN0IGRheSBuYW1lc1xuXHRcdFx0XHRuYW1lc1Nob3J0OiBbIFwiU3VcIiwgXCJNb1wiLCBcIlR1XCIsIFwiV2VcIiwgXCJUaFwiLCBcIkZyXCIsIFwiU2FcIiBdXG5cdFx0XHR9LFxuXHRcdFx0bW9udGhzOiB7XG5cdFx0XHRcdC8vIGZ1bGwgbW9udGggbmFtZXMgKDEzIG1vbnRocyBmb3IgbHVuYXIgY2FsZW5kYXJkcyAtLSAxM3RoIG1vbnRoIHNob3VsZCBiZSBcIlwiIGlmIG5vdCBsdW5hcilcblx0XHRcdFx0bmFtZXM6IFsgXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiLCBcIlwiIF0sXG5cdFx0XHRcdC8vIGFiYnJldmlhdGVkIG1vbnRoIG5hbWVzXG5cdFx0XHRcdG5hbWVzQWJicjogWyBcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiLCBcIlwiIF1cblx0XHRcdH0sXG5cdFx0XHQvLyBBTSBhbmQgUE0gZGVzaWduYXRvcnMgaW4gb25lIG9mIHRoZXNlIGZvcm1zOlxuXHRcdFx0Ly8gVGhlIHVzdWFsIHZpZXcsIGFuZCB0aGUgdXBwZXIgYW5kIGxvd2VyIGNhc2UgdmVyc2lvbnNcblx0XHRcdC8vICAgWyBzdGFuZGFyZCwgbG93ZXJjYXNlLCB1cHBlcmNhc2UgXVxuXHRcdFx0Ly8gVGhlIGN1bHR1cmUgZG9lcyBub3QgdXNlIEFNIG9yIFBNIChsaWtlbHkgYWxsIHN0YW5kYXJkIGRhdGUgZm9ybWF0cyB1c2UgMjQgaG91ciB0aW1lKVxuXHRcdFx0Ly8gICBudWxsXG5cdFx0XHRBTTogWyBcIkFNXCIsIFwiYW1cIiwgXCJBTVwiIF0sXG5cdFx0XHRQTTogWyBcIlBNXCIsIFwicG1cIiwgXCJQTVwiIF0sXG5cdFx0XHRlcmFzOiBbXG5cdFx0XHRcdC8vIGVyYXMgaW4gcmV2ZXJzZSBjaHJvbm9sb2dpY2FsIG9yZGVyLlxuXHRcdFx0XHQvLyBuYW1lOiB0aGUgbmFtZSBvZiB0aGUgZXJhIGluIHRoaXMgY3VsdHVyZSAoZS5nLiBBLkQuLCBDLkUuKVxuXHRcdFx0XHQvLyBzdGFydDogd2hlbiB0aGUgZXJhIHN0YXJ0cyBpbiB0aWNrcyAoZ3JlZ29yaWFuLCBnbXQpLCBudWxsIGlmIGl0IGlzIHRoZSBlYXJsaWVzdCBzdXBwb3J0ZWQgZXJhLlxuXHRcdFx0XHQvLyBvZmZzZXQ6IG9mZnNldCBpbiB5ZWFycyBmcm9tIGdyZWdvcmlhbiBjYWxlbmRhclxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0XCJuYW1lXCI6IFwiQS5ELlwiLFxuXHRcdFx0XHRcdFwic3RhcnRcIjogbnVsbCxcblx0XHRcdFx0XHRcIm9mZnNldFwiOiAwXG5cdFx0XHRcdH1cblx0XHRcdF0sXG5cdFx0XHQvLyB3aGVuIGEgdHdvIGRpZ2l0IHllYXIgaXMgZ2l2ZW4sIGl0IHdpbGwgbmV2ZXIgYmUgcGFyc2VkIGFzIGEgZm91ciBkaWdpdFxuXHRcdFx0Ly8geWVhciBncmVhdGVyIHRoYW4gdGhpcyB5ZWFyIChpbiB0aGUgYXBwcm9wcmlhdGUgZXJhIGZvciB0aGUgY3VsdHVyZSlcblx0XHRcdC8vIFNldCBpdCBhcyBhIGZ1bGwgeWVhciAoZS5nLiAyMDI5KSBvciB1c2UgYW4gb2Zmc2V0IGZvcm1hdCBzdGFydGluZyBmcm9tXG5cdFx0XHQvLyB0aGUgY3VycmVudCB5ZWFyOiBcIisxOVwiIHdvdWxkIGNvcnJlc3BvbmQgdG8gMjAyOSBpZiB0aGUgY3VycmVudCB5ZWFyIDIwMTAuXG5cdFx0XHR0d29EaWdpdFllYXJNYXg6IDIwMjksXG5cdFx0XHQvLyBzZXQgb2YgcHJlZGVmaW5lZCBkYXRlIGFuZCB0aW1lIHBhdHRlcm5zIHVzZWQgYnkgdGhlIGN1bHR1cmVcblx0XHRcdC8vIHRoZXNlIHJlcHJlc2VudCB0aGUgZm9ybWF0IHNvbWVvbmUgaW4gdGhpcyBjdWx0dXJlIHdvdWxkIGV4cGVjdFxuXHRcdFx0Ly8gdG8gc2VlIGdpdmVuIHRoZSBwb3J0aW9ucyBvZiB0aGUgZGF0ZSB0aGF0IGFyZSBzaG93bi5cblx0XHRcdHBhdHRlcm5zOiB7XG5cdFx0XHRcdC8vIHNob3J0IGRhdGUgcGF0dGVyblxuXHRcdFx0XHRkOiBcIk0vZC95eXl5XCIsXG5cdFx0XHRcdC8vIGxvbmcgZGF0ZSBwYXR0ZXJuXG5cdFx0XHRcdEQ6IFwiZGRkZCwgTU1NTSBkZCwgeXl5eVwiLFxuXHRcdFx0XHQvLyBzaG9ydCB0aW1lIHBhdHRlcm5cblx0XHRcdFx0dDogXCJoOm1tIHR0XCIsXG5cdFx0XHRcdC8vIGxvbmcgdGltZSBwYXR0ZXJuXG5cdFx0XHRcdFQ6IFwiaDptbTpzcyB0dFwiLFxuXHRcdFx0XHQvLyBsb25nIGRhdGUsIHNob3J0IHRpbWUgcGF0dGVyblxuXHRcdFx0XHRmOiBcImRkZGQsIE1NTU0gZGQsIHl5eXkgaDptbSB0dFwiLFxuXHRcdFx0XHQvLyBsb25nIGRhdGUsIGxvbmcgdGltZSBwYXR0ZXJuXG5cdFx0XHRcdEY6IFwiZGRkZCwgTU1NTSBkZCwgeXl5eSBoOm1tOnNzIHR0XCIsXG5cdFx0XHRcdC8vIG1vbnRoL2RheSBwYXR0ZXJuXG5cdFx0XHRcdE06IFwiTU1NTSBkZFwiLFxuXHRcdFx0XHQvLyBtb250aC95ZWFyIHBhdHRlcm5cblx0XHRcdFx0WTogXCJ5eXl5IE1NTU1cIixcblx0XHRcdFx0Ly8gUyBpcyBhIHNvcnRhYmxlIGZvcm1hdCB0aGF0IGRvZXMgbm90IHZhcnkgYnkgY3VsdHVyZVxuXHRcdFx0XHRTOiBcInl5eXlcXHUwMDI3LVxcdTAwMjdNTVxcdTAwMjctXFx1MDAyN2RkXFx1MDAyN1RcXHUwMDI3SEhcXHUwMDI3OlxcdTAwMjdtbVxcdTAwMjc6XFx1MDAyN3NzXCJcblx0XHRcdH1cblx0XHRcdC8vIG9wdGlvbmFsIGZpZWxkcyBmb3IgZWFjaCBjYWxlbmRhcjpcblx0XHRcdC8qXG5cdFx0XHRtb250aHNHZW5pdGl2ZTpcblx0XHRcdFx0U2FtZSBhcyBtb250aHMgYnV0IHVzZWQgd2hlbiB0aGUgZGF5IHByZWNlZWRzIHRoZSBtb250aC5cblx0XHRcdFx0T21pdCBpZiB0aGUgY3VsdHVyZSBoYXMgbm8gZ2VuaXRpdmUgZGlzdGluY3Rpb24gaW4gbW9udGggbmFtZXMuXG5cdFx0XHRcdEZvciBhbiBleHBsYWluYXRpb24gb2YgZ2VuaXRpdmUgbW9udGhzLCBzZWUgaHR0cDovL2Jsb2dzLm1zZG4uY29tL21pY2hrYXAvYXJjaGl2ZS8yMDA0LzEyLzI1LzMzMjI1OS5hc3B4XG5cdFx0XHRjb252ZXJ0OlxuXHRcdFx0XHRBbGxvd3MgZm9yIHRoZSBzdXBwb3J0IG9mIG5vbi1ncmVnb3JpYW4gYmFzZWQgY2FsZW5kYXJzLiBUaGlzIGNvbnZlcnQgb2JqZWN0IGlzIHVzZWQgdG9cblx0XHRcdFx0dG8gY29udmVydCBhIGRhdGUgdG8gYW5kIGZyb20gYSBncmVnb3JpYW4gY2FsZW5kYXIgZGF0ZSB0byBoYW5kbGUgcGFyc2luZyBhbmQgZm9ybWF0dGluZy5cblx0XHRcdFx0VGhlIHR3byBmdW5jdGlvbnM6XG5cdFx0XHRcdFx0ZnJvbUdyZWdvcmlhbiggZGF0ZSApXG5cdFx0XHRcdFx0XHRHaXZlbiB0aGUgZGF0ZSBhcyBhIHBhcmFtZXRlciwgcmV0dXJuIGFuIGFycmF5IHdpdGggcGFydHMgWyB5ZWFyLCBtb250aCwgZGF5IF1cblx0XHRcdFx0XHRcdGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5vbi1ncmVnb3JpYW4gYmFzZWQgeWVhciwgbW9udGgsIGFuZCBkYXkgZm9yIHRoZSBjYWxlbmRhci5cblx0XHRcdFx0XHR0b0dyZWdvcmlhbiggeWVhciwgbW9udGgsIGRheSApXG5cdFx0XHRcdFx0XHRHaXZlbiB0aGUgbm9uLWdyZWdvcmlhbiB5ZWFyLCBtb250aCwgYW5kIGRheSwgcmV0dXJuIGEgbmV3IERhdGUoKSBvYmplY3Rcblx0XHRcdFx0XHRcdHNldCB0byB0aGUgY29ycmVzcG9uZGluZyBkYXRlIGluIHRoZSBncmVnb3JpYW4gY2FsZW5kYXIuXG5cdFx0XHQqL1xuXHRcdH1cblx0fSxcblx0Ly8gRm9yIGxvY2FsaXplZCBzdHJpbmdzXG5cdG1lc3NhZ2VzOiB7fVxufTtcblxuR2xvYmFsaXplLmN1bHR1cmVzWyBcImRlZmF1bHRcIiBdLmNhbGVuZGFyID0gR2xvYmFsaXplLmN1bHR1cmVzWyBcImRlZmF1bHRcIiBdLmNhbGVuZGFycy5zdGFuZGFyZDtcblxuR2xvYmFsaXplLmN1bHR1cmVzLmVuID0gR2xvYmFsaXplLmN1bHR1cmVzWyBcImRlZmF1bHRcIiBdO1xuXG5HbG9iYWxpemUuY3VsdHVyZVNlbGVjdG9yID0gXCJlblwiO1xuXG4vL1xuLy8gcHJpdmF0ZSB2YXJpYWJsZXNcbi8vXG5cbnJlZ2V4SGV4ID0gL14weFthLWYwLTldKyQvaTtcbnJlZ2V4SW5maW5pdHkgPSAvXlsrXFwtXT9pbmZpbml0eSQvaTtcbnJlZ2V4UGFyc2VGbG9hdCA9IC9eWytcXC1dP1xcZCpcXC4/XFxkKihlWytcXC1dP1xcZCspPyQvO1xucmVnZXhUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8vXG4vLyBwcml2YXRlIEphdmFTY3JpcHQgdXRpbGl0eSBmdW5jdGlvbnNcbi8vXG5cbmFycmF5SW5kZXhPZiA9IGZ1bmN0aW9uKCBhcnJheSwgaXRlbSApIHtcblx0aWYgKCBhcnJheS5pbmRleE9mICkge1xuXHRcdHJldHVybiBhcnJheS5pbmRleE9mKCBpdGVtICk7XG5cdH1cblx0Zm9yICggdmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKyApIHtcblx0XHRpZiAoIGFycmF5W2ldID09PSBpdGVtICkge1xuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAtMTtcbn07XG5cbmVuZHNXaXRoID0gZnVuY3Rpb24oIHZhbHVlLCBwYXR0ZXJuICkge1xuXHRyZXR1cm4gdmFsdWUuc3Vic3RyKCB2YWx1ZS5sZW5ndGggLSBwYXR0ZXJuLmxlbmd0aCApID09PSBwYXR0ZXJuO1xufTtcblxuZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG5cdHZhciBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNvcHlJc0FycmF5LCBjbG9uZSxcblx0XHR0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sXG5cdFx0aSA9IDEsXG5cdFx0bGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCxcblx0XHRkZWVwID0gZmFsc2U7XG5cblx0Ly8gSGFuZGxlIGEgZGVlcCBjb3B5IHNpdHVhdGlvblxuXHRpZiAoIHR5cGVvZiB0YXJnZXQgPT09IFwiYm9vbGVhblwiICkge1xuXHRcdGRlZXAgPSB0YXJnZXQ7XG5cdFx0dGFyZ2V0ID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuXHRcdC8vIHNraXAgdGhlIGJvb2xlYW4gYW5kIHRoZSB0YXJnZXRcblx0XHRpID0gMjtcblx0fVxuXG5cdC8vIEhhbmRsZSBjYXNlIHdoZW4gdGFyZ2V0IGlzIGEgc3RyaW5nIG9yIHNvbWV0aGluZyAocG9zc2libGUgaW4gZGVlcCBjb3B5KVxuXHRpZiAoIHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIgJiYgIWlzRnVuY3Rpb24odGFyZ2V0KSApIHtcblx0XHR0YXJnZXQgPSB7fTtcblx0fVxuXG5cdGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdC8vIE9ubHkgZGVhbCB3aXRoIG5vbi1udWxsL3VuZGVmaW5lZCB2YWx1ZXNcblx0XHRpZiAoIChvcHRpb25zID0gYXJndW1lbnRzWyBpIF0pICE9IG51bGwgKSB7XG5cdFx0XHQvLyBFeHRlbmQgdGhlIGJhc2Ugb2JqZWN0XG5cdFx0XHRmb3IgKCBuYW1lIGluIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHNyYyA9IHRhcmdldFsgbmFtZSBdO1xuXHRcdFx0XHRjb3B5ID0gb3B0aW9uc1sgbmFtZSBdO1xuXG5cdFx0XHRcdC8vIFByZXZlbnQgbmV2ZXItZW5kaW5nIGxvb3Bcblx0XHRcdFx0aWYgKCB0YXJnZXQgPT09IGNvcHkgKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWN1cnNlIGlmIHdlJ3JlIG1lcmdpbmcgcGxhaW4gb2JqZWN0cyBvciBhcnJheXNcblx0XHRcdFx0aWYgKCBkZWVwICYmIGNvcHkgJiYgKCBpc09iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSBpc0FycmF5KGNvcHkpKSApICkge1xuXHRcdFx0XHRcdGlmICggY29weUlzQXJyYXkgKSB7XG5cdFx0XHRcdFx0XHRjb3B5SXNBcnJheSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNBcnJheShzcmMpID8gc3JjIDogW107XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2xvbmUgPSBzcmMgJiYgaXNPYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIE5ldmVyIG1vdmUgb3JpZ2luYWwgb2JqZWN0cywgY2xvbmUgdGhlbVxuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0gZXh0ZW5kKCBkZWVwLCBjbG9uZSwgY29weSApO1xuXG5cdFx0XHRcdC8vIERvbid0IGJyaW5nIGluIHVuZGVmaW5lZCB2YWx1ZXNcblx0XHRcdFx0fSBlbHNlIGlmICggY29weSAhPT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdHRhcmdldFsgbmFtZSBdID0gY29weTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgbW9kaWZpZWQgb2JqZWN0XG5cdHJldHVybiB0YXJnZXQ7XG59O1xuXG5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiggb2JqICkge1xuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCBvYmogKSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xufTtcblxuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKCBvYmogKSB7XG5cdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoIG9iaiApID09PSBcIltvYmplY3QgRnVuY3Rpb25dXCI7XG59O1xuXG5pc09iamVjdCA9IGZ1bmN0aW9uKCBvYmogKSB7XG5cdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoIG9iaiApID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xufTtcblxuc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKCB2YWx1ZSwgcGF0dGVybiApIHtcblx0cmV0dXJuIHZhbHVlLmluZGV4T2YoIHBhdHRlcm4gKSA9PT0gMDtcbn07XG5cbnRyaW0gPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdHJldHVybiAoIHZhbHVlICsgXCJcIiApLnJlcGxhY2UoIHJlZ2V4VHJpbSwgXCJcIiApO1xufTtcblxudHJ1bmNhdGUgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdGlmICggaXNOYU4oIHZhbHVlICkgKSB7XG5cdFx0cmV0dXJuIE5hTjtcblx0fVxuXHRyZXR1cm4gTWF0aFsgdmFsdWUgPCAwID8gXCJjZWlsXCIgOiBcImZsb29yXCIgXSggdmFsdWUgKTtcbn07XG5cbnplcm9QYWQgPSBmdW5jdGlvbiggc3RyLCBjb3VudCwgbGVmdCApIHtcblx0dmFyIGw7XG5cdGZvciAoIGwgPSBzdHIubGVuZ3RoOyBsIDwgY291bnQ7IGwgKz0gMSApIHtcblx0XHRzdHIgPSAoIGxlZnQgPyAoXCIwXCIgKyBzdHIpIDogKHN0ciArIFwiMFwiKSApO1xuXHR9XG5cdHJldHVybiBzdHI7XG59O1xuXG4vL1xuLy8gcHJpdmF0ZSBHbG9iYWxpemF0aW9uIHV0aWxpdHkgZnVuY3Rpb25zXG4vL1xuXG5hcHBlbmRQcmVPclBvc3RNYXRjaCA9IGZ1bmN0aW9uKCBwcmVNYXRjaCwgc3RyaW5ncyApIHtcblx0Ly8gYXBwZW5kcyBwcmUtIGFuZCBwb3N0LSB0b2tlbiBtYXRjaCBzdHJpbmdzIHdoaWxlIHJlbW92aW5nIGVzY2FwZWQgY2hhcmFjdGVycy5cblx0Ly8gUmV0dXJucyBhIHNpbmdsZSBxdW90ZSBjb3VudCB3aGljaCBpcyB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgdG9rZW4gb2NjdXJzXG5cdC8vIGluIGEgc3RyaW5nIGxpdGVyYWwuXG5cdHZhciBxdW90ZUNvdW50ID0gMCxcblx0XHRlc2NhcGVkID0gZmFsc2U7XG5cdGZvciAoIHZhciBpID0gMCwgaWwgPSBwcmVNYXRjaC5sZW5ndGg7IGkgPCBpbDsgaSsrICkge1xuXHRcdHZhciBjID0gcHJlTWF0Y2guY2hhckF0KCBpICk7XG5cdFx0c3dpdGNoICggYyApIHtcblx0XHRcdGNhc2UgXCJcXCdcIjpcblx0XHRcdFx0aWYgKCBlc2NhcGVkICkge1xuXHRcdFx0XHRcdHN0cmluZ3MucHVzaCggXCJcXCdcIiApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHF1b3RlQ291bnQrKztcblx0XHRcdFx0fVxuXHRcdFx0XHRlc2NhcGVkID0gZmFsc2U7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIlxcXFxcIjpcblx0XHRcdFx0aWYgKCBlc2NhcGVkICkge1xuXHRcdFx0XHRcdHN0cmluZ3MucHVzaCggXCJcXFxcXCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlc2NhcGVkID0gIWVzY2FwZWQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0c3RyaW5ncy5wdXNoKCBjICk7XG5cdFx0XHRcdGVzY2FwZWQgPSBmYWxzZTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBxdW90ZUNvdW50O1xufTtcblxuZXhwYW5kRm9ybWF0ID0gZnVuY3Rpb24oIGNhbCwgZm9ybWF0ICkge1xuXHQvLyBleHBhbmRzIHVuc3BlY2lmaWVkIG9yIHNpbmdsZSBjaGFyYWN0ZXIgZGF0ZSBmb3JtYXRzIGludG8gdGhlIGZ1bGwgcGF0dGVybi5cblx0Zm9ybWF0ID0gZm9ybWF0IHx8IFwiRlwiO1xuXHR2YXIgcGF0dGVybixcblx0XHRwYXR0ZXJucyA9IGNhbC5wYXR0ZXJucyxcblx0XHRsZW4gPSBmb3JtYXQubGVuZ3RoO1xuXHRpZiAoIGxlbiA9PT0gMSApIHtcblx0XHRwYXR0ZXJuID0gcGF0dGVybnNbIGZvcm1hdCBdO1xuXHRcdGlmICggIXBhdHRlcm4gKSB7XG5cdFx0XHR0aHJvdyBcIkludmFsaWQgZGF0ZSBmb3JtYXQgc3RyaW5nIFxcJ1wiICsgZm9ybWF0ICsgXCJcXCcuXCI7XG5cdFx0fVxuXHRcdGZvcm1hdCA9IHBhdHRlcm47XG5cdH1cblx0ZWxzZSBpZiAoIGxlbiA9PT0gMiAmJiBmb3JtYXQuY2hhckF0KDApID09PSBcIiVcIiApIHtcblx0XHQvLyAlWCBlc2NhcGUgZm9ybWF0IC0tIGludGVuZGVkIGFzIGEgY3VzdG9tIGZvcm1hdCBzdHJpbmcgdGhhdCBpcyBvbmx5IG9uZSBjaGFyYWN0ZXIsIG5vdCBhIGJ1aWx0LWluIGZvcm1hdC5cblx0XHRmb3JtYXQgPSBmb3JtYXQuY2hhckF0KCAxICk7XG5cdH1cblx0cmV0dXJuIGZvcm1hdDtcbn07XG5cbmZvcm1hdERhdGUgPSBmdW5jdGlvbiggdmFsdWUsIGZvcm1hdCwgY3VsdHVyZSApIHtcblx0dmFyIGNhbCA9IGN1bHR1cmUuY2FsZW5kYXIsXG5cdFx0Y29udmVydCA9IGNhbC5jb252ZXJ0LFxuXHRcdHJldDtcblxuXHRpZiAoICFmb3JtYXQgfHwgIWZvcm1hdC5sZW5ndGggfHwgZm9ybWF0ID09PSBcImlcIiApIHtcblx0XHRpZiAoIGN1bHR1cmUgJiYgY3VsdHVyZS5uYW1lLmxlbmd0aCApIHtcblx0XHRcdGlmICggY29udmVydCApIHtcblx0XHRcdFx0Ly8gbm9uLWdyZWdvcmlhbiBjYWxlbmRhciwgc28gd2UgY2Fubm90IHVzZSBidWlsdC1pbiB0b0xvY2FsZVN0cmluZygpXG5cdFx0XHRcdHJldCA9IGZvcm1hdERhdGUoIHZhbHVlLCBjYWwucGF0dGVybnMuRiwgY3VsdHVyZSApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHZhciBlcmFEYXRlID0gbmV3IERhdGUoIHZhbHVlLmdldFRpbWUoKSApLFxuXHRcdFx0XHRcdGVyYSA9IGdldEVyYSggdmFsdWUsIGNhbC5lcmFzICk7XG5cdFx0XHRcdGVyYURhdGUuc2V0RnVsbFllYXIoIGdldEVyYVllYXIodmFsdWUsIGNhbCwgZXJhKSApO1xuXHRcdFx0XHRyZXQgPSBlcmFEYXRlLnRvTG9jYWxlU3RyaW5nKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0cmV0ID0gdmFsdWUudG9TdHJpbmcoKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdHZhciBlcmFzID0gY2FsLmVyYXMsXG5cdFx0c29ydGFibGUgPSBmb3JtYXQgPT09IFwic1wiO1xuXHRmb3JtYXQgPSBleHBhbmRGb3JtYXQoIGNhbCwgZm9ybWF0ICk7XG5cblx0Ly8gU3RhcnQgd2l0aCBhbiBlbXB0eSBzdHJpbmdcblx0cmV0ID0gW107XG5cdHZhciBob3VyLFxuXHRcdHplcm9zID0gWyBcIjBcIiwgXCIwMFwiLCBcIjAwMFwiIF0sXG5cdFx0Zm91bmREYXksXG5cdFx0Y2hlY2tlZERheSxcblx0XHRkYXlQYXJ0UmVnRXhwID0gLyhbXmRdfF4pKGR8ZGQpKFteZF18JCkvZyxcblx0XHRxdW90ZUNvdW50ID0gMCxcblx0XHR0b2tlblJlZ0V4cCA9IGdldFRva2VuUmVnRXhwKCksXG5cdFx0Y29udmVydGVkO1xuXG5cdGZ1bmN0aW9uIHBhZFplcm9zKCBudW0sIGMgKSB7XG5cdFx0dmFyIHIsIHMgPSBudW0gKyBcIlwiO1xuXHRcdGlmICggYyA+IDEgJiYgcy5sZW5ndGggPCBjICkge1xuXHRcdFx0ciA9ICggemVyb3NbYyAtIDJdICsgcyk7XG5cdFx0XHRyZXR1cm4gci5zdWJzdHIoIHIubGVuZ3RoIC0gYywgYyApO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHIgPSBzO1xuXHRcdH1cblx0XHRyZXR1cm4gcjtcblx0fVxuXG5cdGZ1bmN0aW9uIGhhc0RheSgpIHtcblx0XHRpZiAoIGZvdW5kRGF5IHx8IGNoZWNrZWREYXkgKSB7XG5cdFx0XHRyZXR1cm4gZm91bmREYXk7XG5cdFx0fVxuXHRcdGZvdW5kRGF5ID0gZGF5UGFydFJlZ0V4cC50ZXN0KCBmb3JtYXQgKTtcblx0XHRjaGVja2VkRGF5ID0gdHJ1ZTtcblx0XHRyZXR1cm4gZm91bmREYXk7XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRQYXJ0KCBkYXRlLCBwYXJ0ICkge1xuXHRcdGlmICggY29udmVydGVkICkge1xuXHRcdFx0cmV0dXJuIGNvbnZlcnRlZFsgcGFydCBdO1xuXHRcdH1cblx0XHRzd2l0Y2ggKCBwYXJ0ICkge1xuXHRcdFx0Y2FzZSAwOlxuXHRcdFx0XHRyZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHRyZXR1cm4gZGF0ZS5nZXRNb250aCgpO1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHRyZXR1cm4gZGF0ZS5nZXREYXRlKCk7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyBcIkludmFsaWQgcGFydCB2YWx1ZSBcIiArIHBhcnQ7XG5cdFx0fVxuXHR9XG5cblx0aWYgKCAhc29ydGFibGUgJiYgY29udmVydCApIHtcblx0XHRjb252ZXJ0ZWQgPSBjb252ZXJ0LmZyb21HcmVnb3JpYW4oIHZhbHVlICk7XG5cdH1cblxuXHRmb3IgKCA7IDsgKSB7XG5cdFx0Ly8gU2F2ZSB0aGUgY3VycmVudCBpbmRleFxuXHRcdHZhciBpbmRleCA9IHRva2VuUmVnRXhwLmxhc3RJbmRleCxcblx0XHRcdC8vIExvb2sgZm9yIHRoZSBuZXh0IHBhdHRlcm5cblx0XHRcdGFyID0gdG9rZW5SZWdFeHAuZXhlYyggZm9ybWF0ICk7XG5cblx0XHQvLyBBcHBlbmQgdGhlIHRleHQgYmVmb3JlIHRoZSBwYXR0ZXJuIChvciB0aGUgZW5kIG9mIHRoZSBzdHJpbmcgaWYgbm90IGZvdW5kKVxuXHRcdHZhciBwcmVNYXRjaCA9IGZvcm1hdC5zbGljZSggaW5kZXgsIGFyID8gYXIuaW5kZXggOiBmb3JtYXQubGVuZ3RoICk7XG5cdFx0cXVvdGVDb3VudCArPSBhcHBlbmRQcmVPclBvc3RNYXRjaCggcHJlTWF0Y2gsIHJldCApO1xuXG5cdFx0aWYgKCAhYXIgKSB7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHQvLyBkbyBub3QgcmVwbGFjZSBhbnkgbWF0Y2hlcyB0aGF0IG9jY3VyIGluc2lkZSBhIHN0cmluZyBsaXRlcmFsLlxuXHRcdGlmICggcXVvdGVDb3VudCAlIDIgKSB7XG5cdFx0XHRyZXQucHVzaCggYXJbMF0gKTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHZhciBjdXJyZW50ID0gYXJbIDAgXSxcblx0XHRcdGNsZW5ndGggPSBjdXJyZW50Lmxlbmd0aDtcblxuXHRcdHN3aXRjaCAoIGN1cnJlbnQgKSB7XG5cdFx0XHRjYXNlIFwiZGRkXCI6XG5cdFx0XHRcdC8vRGF5IG9mIHRoZSB3ZWVrLCBhcyBhIHRocmVlLWxldHRlciBhYmJyZXZpYXRpb25cblx0XHRcdGNhc2UgXCJkZGRkXCI6XG5cdFx0XHRcdC8vIERheSBvZiB0aGUgd2VlaywgdXNpbmcgdGhlIGZ1bGwgbmFtZVxuXHRcdFx0XHR2YXIgbmFtZXMgPSAoIGNsZW5ndGggPT09IDMgKSA/IGNhbC5kYXlzLm5hbWVzQWJiciA6IGNhbC5kYXlzLm5hbWVzO1xuXHRcdFx0XHRyZXQucHVzaCggbmFtZXNbdmFsdWUuZ2V0RGF5KCldICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImRcIjpcblx0XHRcdFx0Ly8gRGF5IG9mIG1vbnRoLCB3aXRob3V0IGxlYWRpbmcgemVybyBmb3Igc2luZ2xlLWRpZ2l0IGRheXNcblx0XHRcdGNhc2UgXCJkZFwiOlxuXHRcdFx0XHQvLyBEYXkgb2YgbW9udGgsIHdpdGggbGVhZGluZyB6ZXJvIGZvciBzaW5nbGUtZGlnaXQgZGF5c1xuXHRcdFx0XHRmb3VuZERheSA9IHRydWU7XG5cdFx0XHRcdHJldC5wdXNoKFxuXHRcdFx0XHRcdHBhZFplcm9zKCBnZXRQYXJ0KHZhbHVlLCAyKSwgY2xlbmd0aCApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIk1NTVwiOlxuXHRcdFx0XHQvLyBNb250aCwgYXMgYSB0aHJlZS1sZXR0ZXIgYWJicmV2aWF0aW9uXG5cdFx0XHRjYXNlIFwiTU1NTVwiOlxuXHRcdFx0XHQvLyBNb250aCwgdXNpbmcgdGhlIGZ1bGwgbmFtZVxuXHRcdFx0XHR2YXIgcGFydCA9IGdldFBhcnQoIHZhbHVlLCAxICk7XG5cdFx0XHRcdHJldC5wdXNoKFxuXHRcdFx0XHRcdCggY2FsLm1vbnRoc0dlbml0aXZlICYmIGhhc0RheSgpICkgP1xuXHRcdFx0XHRcdCggY2FsLm1vbnRoc0dlbml0aXZlWyBjbGVuZ3RoID09PSAzID8gXCJuYW1lc0FiYnJcIiA6IFwibmFtZXNcIiBdWyBwYXJ0IF0gKSA6XG5cdFx0XHRcdFx0KCBjYWwubW9udGhzWyBjbGVuZ3RoID09PSAzID8gXCJuYW1lc0FiYnJcIiA6IFwibmFtZXNcIiBdWyBwYXJ0IF0gKVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJNXCI6XG5cdFx0XHRcdC8vIE1vbnRoLCBhcyBkaWdpdHMsIHdpdGggbm8gbGVhZGluZyB6ZXJvIGZvciBzaW5nbGUtZGlnaXQgbW9udGhzXG5cdFx0XHRjYXNlIFwiTU1cIjpcblx0XHRcdFx0Ly8gTW9udGgsIGFzIGRpZ2l0cywgd2l0aCBsZWFkaW5nIHplcm8gZm9yIHNpbmdsZS1kaWdpdCBtb250aHNcblx0XHRcdFx0cmV0LnB1c2goXG5cdFx0XHRcdFx0cGFkWmVyb3MoIGdldFBhcnQodmFsdWUsIDEpICsgMSwgY2xlbmd0aCApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInlcIjpcblx0XHRcdFx0Ly8gWWVhciwgYXMgdHdvIGRpZ2l0cywgYnV0IHdpdGggbm8gbGVhZGluZyB6ZXJvIGZvciB5ZWFycyBsZXNzIHRoYW4gMTBcblx0XHRcdGNhc2UgXCJ5eVwiOlxuXHRcdFx0XHQvLyBZZWFyLCBhcyB0d28gZGlnaXRzLCB3aXRoIGxlYWRpbmcgemVybyBmb3IgeWVhcnMgbGVzcyB0aGFuIDEwXG5cdFx0XHRjYXNlIFwieXl5eVwiOlxuXHRcdFx0XHQvLyBZZWFyIHJlcHJlc2VudGVkIGJ5IGZvdXIgZnVsbCBkaWdpdHNcblx0XHRcdFx0cGFydCA9IGNvbnZlcnRlZCA/IGNvbnZlcnRlZFsgMCBdIDogZ2V0RXJhWWVhciggdmFsdWUsIGNhbCwgZ2V0RXJhKHZhbHVlLCBlcmFzKSwgc29ydGFibGUgKTtcblx0XHRcdFx0aWYgKCBjbGVuZ3RoIDwgNCApIHtcblx0XHRcdFx0XHRwYXJ0ID0gcGFydCAlIDEwMDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXQucHVzaChcblx0XHRcdFx0XHRwYWRaZXJvcyggcGFydCwgY2xlbmd0aCApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImhcIjpcblx0XHRcdFx0Ly8gSG91cnMgd2l0aCBubyBsZWFkaW5nIHplcm8gZm9yIHNpbmdsZS1kaWdpdCBob3VycywgdXNpbmcgMTItaG91ciBjbG9ja1xuXHRcdFx0Y2FzZSBcImhoXCI6XG5cdFx0XHRcdC8vIEhvdXJzIHdpdGggbGVhZGluZyB6ZXJvIGZvciBzaW5nbGUtZGlnaXQgaG91cnMsIHVzaW5nIDEyLWhvdXIgY2xvY2tcblx0XHRcdFx0aG91ciA9IHZhbHVlLmdldEhvdXJzKCkgJSAxMjtcblx0XHRcdFx0aWYgKCBob3VyID09PSAwICkgaG91ciA9IDEyO1xuXHRcdFx0XHRyZXQucHVzaChcblx0XHRcdFx0XHRwYWRaZXJvcyggaG91ciwgY2xlbmd0aCApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIkhcIjpcblx0XHRcdFx0Ly8gSG91cnMgd2l0aCBubyBsZWFkaW5nIHplcm8gZm9yIHNpbmdsZS1kaWdpdCBob3VycywgdXNpbmcgMjQtaG91ciBjbG9ja1xuXHRcdFx0Y2FzZSBcIkhIXCI6XG5cdFx0XHRcdC8vIEhvdXJzIHdpdGggbGVhZGluZyB6ZXJvIGZvciBzaW5nbGUtZGlnaXQgaG91cnMsIHVzaW5nIDI0LWhvdXIgY2xvY2tcblx0XHRcdFx0cmV0LnB1c2goXG5cdFx0XHRcdFx0cGFkWmVyb3MoIHZhbHVlLmdldEhvdXJzKCksIGNsZW5ndGggKVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJtXCI6XG5cdFx0XHRcdC8vIE1pbnV0ZXMgd2l0aCBubyBsZWFkaW5nIHplcm8gZm9yIHNpbmdsZS1kaWdpdCBtaW51dGVzXG5cdFx0XHRjYXNlIFwibW1cIjpcblx0XHRcdFx0Ly8gTWludXRlcyB3aXRoIGxlYWRpbmcgemVybyBmb3Igc2luZ2xlLWRpZ2l0IG1pbnV0ZXNcblx0XHRcdFx0cmV0LnB1c2goXG5cdFx0XHRcdFx0cGFkWmVyb3MoIHZhbHVlLmdldE1pbnV0ZXMoKSwgY2xlbmd0aCApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInNcIjpcblx0XHRcdFx0Ly8gU2Vjb25kcyB3aXRoIG5vIGxlYWRpbmcgemVybyBmb3Igc2luZ2xlLWRpZ2l0IHNlY29uZHNcblx0XHRcdGNhc2UgXCJzc1wiOlxuXHRcdFx0XHQvLyBTZWNvbmRzIHdpdGggbGVhZGluZyB6ZXJvIGZvciBzaW5nbGUtZGlnaXQgc2Vjb25kc1xuXHRcdFx0XHRyZXQucHVzaChcblx0XHRcdFx0XHRwYWRaZXJvcyggdmFsdWUuZ2V0U2Vjb25kcygpLCBjbGVuZ3RoIClcblx0XHRcdFx0KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwidFwiOlxuXHRcdFx0XHQvLyBPbmUgY2hhcmFjdGVyIGFtL3BtIGluZGljYXRvciAoXCJhXCIgb3IgXCJwXCIpXG5cdFx0XHRjYXNlIFwidHRcIjpcblx0XHRcdFx0Ly8gTXVsdGljaGFyYWN0ZXIgYW0vcG0gaW5kaWNhdG9yXG5cdFx0XHRcdHBhcnQgPSB2YWx1ZS5nZXRIb3VycygpIDwgMTIgPyAoIGNhbC5BTSA/IGNhbC5BTVswXSA6IFwiIFwiICkgOiAoIGNhbC5QTSA/IGNhbC5QTVswXSA6IFwiIFwiICk7XG5cdFx0XHRcdHJldC5wdXNoKCBjbGVuZ3RoID09PSAxID8gcGFydC5jaGFyQXQoMCkgOiBwYXJ0ICk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImZcIjpcblx0XHRcdFx0Ly8gRGVjaXNlY29uZHNcblx0XHRcdGNhc2UgXCJmZlwiOlxuXHRcdFx0XHQvLyBDZW50aXNlY29uZHNcblx0XHRcdGNhc2UgXCJmZmZcIjpcblx0XHRcdFx0Ly8gTWlsbGlzZWNvbmRzXG5cdFx0XHRcdHJldC5wdXNoKFxuXHRcdFx0XHRcdHBhZFplcm9zKCB2YWx1ZS5nZXRNaWxsaXNlY29uZHMoKSwgMyApLnN1YnN0ciggMCwgY2xlbmd0aCApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInpcIjpcblx0XHRcdFx0Ly8gVGltZSB6b25lIG9mZnNldCwgbm8gbGVhZGluZyB6ZXJvXG5cdFx0XHRjYXNlIFwienpcIjpcblx0XHRcdFx0Ly8gVGltZSB6b25lIG9mZnNldCB3aXRoIGxlYWRpbmcgemVyb1xuXHRcdFx0XHRob3VyID0gdmFsdWUuZ2V0VGltZXpvbmVPZmZzZXQoKSAvIDYwO1xuXHRcdFx0XHRyZXQucHVzaChcblx0XHRcdFx0XHQoIGhvdXIgPD0gMCA/IFwiK1wiIDogXCItXCIgKSArIHBhZFplcm9zKCBNYXRoLmZsb29yKE1hdGguYWJzKGhvdXIpKSwgY2xlbmd0aCApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcInp6elwiOlxuXHRcdFx0XHQvLyBUaW1lIHpvbmUgb2Zmc2V0IHdpdGggbGVhZGluZyB6ZXJvXG5cdFx0XHRcdGhvdXIgPSB2YWx1ZS5nZXRUaW1lem9uZU9mZnNldCgpIC8gNjA7XG5cdFx0XHRcdHJldC5wdXNoKFxuXHRcdFx0XHRcdCggaG91ciA8PSAwID8gXCIrXCIgOiBcIi1cIiApICsgcGFkWmVyb3MoIE1hdGguZmxvb3IoTWF0aC5hYnMoaG91cikpLCAyICkgK1xuXHRcdFx0XHRcdC8vIEhhcmQgY29kZWQgXCI6XCIgc2VwYXJhdG9yLCByYXRoZXIgdGhhbiB1c2luZyBjYWwuVGltZVNlcGFyYXRvclxuXHRcdFx0XHRcdC8vIFJlcGVhdGVkIGhlcmUgZm9yIGNvbnNpc3RlbmN5LCBwbHVzIFwiOlwiIHdhcyBhbHJlYWR5IGFzc3VtZWQgaW4gZGF0ZSBwYXJzaW5nLlxuXHRcdFx0XHRcdFwiOlwiICsgcGFkWmVyb3MoIE1hdGguYWJzKHZhbHVlLmdldFRpbWV6b25lT2Zmc2V0KCkgJSA2MCksIDIgKVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJnXCI6XG5cdFx0XHRjYXNlIFwiZ2dcIjpcblx0XHRcdFx0aWYgKCBjYWwuZXJhcyApIHtcblx0XHRcdFx0XHRyZXQucHVzaChcblx0XHRcdFx0XHRcdGNhbC5lcmFzWyBnZXRFcmEodmFsdWUsIGVyYXMpIF0ubmFtZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIi9cIjpcblx0XHRcdHJldC5wdXNoKCBjYWxbXCIvXCJdICk7XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgXCJJbnZhbGlkIGRhdGUgZm9ybWF0IHBhdHRlcm4gXFwnXCIgKyBjdXJyZW50ICsgXCJcXCcuXCI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXQuam9pbiggXCJcIiApO1xufTtcblxuLy8gZm9ybWF0TnVtYmVyXG4oZnVuY3Rpb24oKSB7XG5cdHZhciBleHBhbmROdW1iZXI7XG5cblx0ZXhwYW5kTnVtYmVyID0gZnVuY3Rpb24oIG51bWJlciwgcHJlY2lzaW9uLCBmb3JtYXRJbmZvICkge1xuXHRcdHZhciBncm91cFNpemVzID0gZm9ybWF0SW5mby5ncm91cFNpemVzLFxuXHRcdFx0Y3VyU2l6ZSA9IGdyb3VwU2l6ZXNbIDAgXSxcblx0XHRcdGN1ckdyb3VwSW5kZXggPSAxLFxuXHRcdFx0ZmFjdG9yID0gTWF0aC5wb3coIDEwLCBwcmVjaXNpb24gKSxcblx0XHRcdHJvdW5kZWQgPSBNYXRoLnJvdW5kKCBudW1iZXIgKiBmYWN0b3IgKSAvIGZhY3RvcjtcblxuXHRcdGlmICggIWlzRmluaXRlKHJvdW5kZWQpICkge1xuXHRcdFx0cm91bmRlZCA9IG51bWJlcjtcblx0XHR9XG5cdFx0bnVtYmVyID0gcm91bmRlZDtcblxuXHRcdHZhciBudW1iZXJTdHJpbmcgPSBudW1iZXIrXCJcIixcblx0XHRcdHJpZ2h0ID0gXCJcIixcblx0XHRcdHNwbGl0ID0gbnVtYmVyU3RyaW5nLnNwbGl0KCAvZS9pICksXG5cdFx0XHRleHBvbmVudCA9IHNwbGl0Lmxlbmd0aCA+IDEgPyBwYXJzZUludCggc3BsaXRbMV0sIDEwICkgOiAwO1xuXHRcdG51bWJlclN0cmluZyA9IHNwbGl0WyAwIF07XG5cdFx0c3BsaXQgPSBudW1iZXJTdHJpbmcuc3BsaXQoIFwiLlwiICk7XG5cdFx0bnVtYmVyU3RyaW5nID0gc3BsaXRbIDAgXTtcblx0XHRyaWdodCA9IHNwbGl0Lmxlbmd0aCA+IDEgPyBzcGxpdFsgMSBdIDogXCJcIjtcblxuXHRcdHZhciBsO1xuXHRcdGlmICggZXhwb25lbnQgPiAwICkge1xuXHRcdFx0cmlnaHQgPSB6ZXJvUGFkKCByaWdodCwgZXhwb25lbnQsIGZhbHNlICk7XG5cdFx0XHRudW1iZXJTdHJpbmcgKz0gcmlnaHQuc2xpY2UoIDAsIGV4cG9uZW50ICk7XG5cdFx0XHRyaWdodCA9IHJpZ2h0LnN1YnN0ciggZXhwb25lbnQgKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoIGV4cG9uZW50IDwgMCApIHtcblx0XHRcdGV4cG9uZW50ID0gLWV4cG9uZW50O1xuXHRcdFx0bnVtYmVyU3RyaW5nID0gemVyb1BhZCggbnVtYmVyU3RyaW5nLCBleHBvbmVudCArIDEsIHRydWUgKTtcblx0XHRcdHJpZ2h0ID0gbnVtYmVyU3RyaW5nLnNsaWNlKCAtZXhwb25lbnQsIG51bWJlclN0cmluZy5sZW5ndGggKSArIHJpZ2h0O1xuXHRcdFx0bnVtYmVyU3RyaW5nID0gbnVtYmVyU3RyaW5nLnNsaWNlKCAwLCAtZXhwb25lbnQgKTtcblx0XHR9XG5cblx0XHRpZiAoIHByZWNpc2lvbiA+IDAgKSB7XG5cdFx0XHRyaWdodCA9IGZvcm1hdEluZm9bIFwiLlwiIF0gK1xuXHRcdFx0XHQoIChyaWdodC5sZW5ndGggPiBwcmVjaXNpb24pID8gcmlnaHQuc2xpY2UoMCwgcHJlY2lzaW9uKSA6IHplcm9QYWQocmlnaHQsIHByZWNpc2lvbikgKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRyaWdodCA9IFwiXCI7XG5cdFx0fVxuXG5cdFx0dmFyIHN0cmluZ0luZGV4ID0gbnVtYmVyU3RyaW5nLmxlbmd0aCAtIDEsXG5cdFx0XHRzZXAgPSBmb3JtYXRJbmZvWyBcIixcIiBdLFxuXHRcdFx0cmV0ID0gXCJcIjtcblxuXHRcdHdoaWxlICggc3RyaW5nSW5kZXggPj0gMCApIHtcblx0XHRcdGlmICggY3VyU2l6ZSA9PT0gMCB8fCBjdXJTaXplID4gc3RyaW5nSW5kZXggKSB7XG5cdFx0XHRcdHJldHVybiBudW1iZXJTdHJpbmcuc2xpY2UoIDAsIHN0cmluZ0luZGV4ICsgMSApICsgKCByZXQubGVuZ3RoID8gKHNlcCArIHJldCArIHJpZ2h0KSA6IHJpZ2h0ICk7XG5cdFx0XHR9XG5cdFx0XHRyZXQgPSBudW1iZXJTdHJpbmcuc2xpY2UoIHN0cmluZ0luZGV4IC0gY3VyU2l6ZSArIDEsIHN0cmluZ0luZGV4ICsgMSApICsgKCByZXQubGVuZ3RoID8gKHNlcCArIHJldCkgOiBcIlwiICk7XG5cblx0XHRcdHN0cmluZ0luZGV4IC09IGN1clNpemU7XG5cblx0XHRcdGlmICggY3VyR3JvdXBJbmRleCA8IGdyb3VwU2l6ZXMubGVuZ3RoICkge1xuXHRcdFx0XHRjdXJTaXplID0gZ3JvdXBTaXplc1sgY3VyR3JvdXBJbmRleCBdO1xuXHRcdFx0XHRjdXJHcm91cEluZGV4Kys7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bWJlclN0cmluZy5zbGljZSggMCwgc3RyaW5nSW5kZXggKyAxICkgKyBzZXAgKyByZXQgKyByaWdodDtcblx0fTtcblxuXHRmb3JtYXROdW1iZXIgPSBmdW5jdGlvbiggdmFsdWUsIGZvcm1hdCwgY3VsdHVyZSApIHtcblx0XHRpZiAoICFpc0Zpbml0ZSh2YWx1ZSkgKSB7XG5cdFx0XHRpZiAoIHZhbHVlID09PSBJbmZpbml0eSApIHtcblx0XHRcdFx0cmV0dXJuIGN1bHR1cmUubnVtYmVyRm9ybWF0LnBvc2l0aXZlSW5maW5pdHk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIHZhbHVlID09PSAtSW5maW5pdHkgKSB7XG5cdFx0XHRcdHJldHVybiBjdWx0dXJlLm51bWJlckZvcm1hdC5uZWdhdGl2ZUluZmluaXR5O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGN1bHR1cmUubnVtYmVyRm9ybWF0WyBcIk5hTlwiIF07XG5cdFx0fVxuXHRcdGlmICggIWZvcm1hdCB8fCBmb3JtYXQgPT09IFwiaVwiICkge1xuXHRcdFx0cmV0dXJuIGN1bHR1cmUubmFtZS5sZW5ndGggPyB2YWx1ZS50b0xvY2FsZVN0cmluZygpIDogdmFsdWUudG9TdHJpbmcoKTtcblx0XHR9XG5cdFx0Zm9ybWF0ID0gZm9ybWF0IHx8IFwiRFwiO1xuXG5cdFx0dmFyIG5mID0gY3VsdHVyZS5udW1iZXJGb3JtYXQsXG5cdFx0XHRudW1iZXIgPSBNYXRoLmFicyggdmFsdWUgKSxcblx0XHRcdHByZWNpc2lvbiA9IC0xLFxuXHRcdFx0cGF0dGVybjtcblx0XHRpZiAoIGZvcm1hdC5sZW5ndGggPiAxICkgcHJlY2lzaW9uID0gcGFyc2VJbnQoIGZvcm1hdC5zbGljZSgxKSwgMTAgKTtcblxuXHRcdHZhciBjdXJyZW50ID0gZm9ybWF0LmNoYXJBdCggMCApLnRvVXBwZXJDYXNlKCksXG5cdFx0XHRmb3JtYXRJbmZvO1xuXG5cdFx0c3dpdGNoICggY3VycmVudCApIHtcblx0XHRcdGNhc2UgXCJEXCI6XG5cdFx0XHRcdHBhdHRlcm4gPSBcIm5cIjtcblx0XHRcdFx0bnVtYmVyID0gdHJ1bmNhdGUoIG51bWJlciApO1xuXHRcdFx0XHRpZiAoIHByZWNpc2lvbiAhPT0gLTEgKSB7XG5cdFx0XHRcdFx0bnVtYmVyID0gemVyb1BhZCggXCJcIiArIG51bWJlciwgcHJlY2lzaW9uLCB0cnVlICk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCB2YWx1ZSA8IDAgKSBudW1iZXIgPSBcIi1cIiArIG51bWJlcjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiTlwiOlxuXHRcdFx0XHRmb3JtYXRJbmZvID0gbmY7XG5cdFx0XHRcdC8qIGZhbGxzIHRocm91Z2ggKi9cblx0XHRcdGNhc2UgXCJDXCI6XG5cdFx0XHRcdGZvcm1hdEluZm8gPSBmb3JtYXRJbmZvIHx8IG5mLmN1cnJlbmN5O1xuXHRcdFx0XHQvKiBmYWxscyB0aHJvdWdoICovXG5cdFx0XHRjYXNlIFwiUFwiOlxuXHRcdFx0XHRmb3JtYXRJbmZvID0gZm9ybWF0SW5mbyB8fCBuZi5wZXJjZW50O1xuXHRcdFx0XHRwYXR0ZXJuID0gdmFsdWUgPCAwID8gZm9ybWF0SW5mby5wYXR0ZXJuWyAwIF0gOiAoIGZvcm1hdEluZm8ucGF0dGVyblsxXSB8fCBcIm5cIiApO1xuXHRcdFx0XHRpZiAoIHByZWNpc2lvbiA9PT0gLTEgKSBwcmVjaXNpb24gPSBmb3JtYXRJbmZvLmRlY2ltYWxzO1xuXHRcdFx0XHRudW1iZXIgPSBleHBhbmROdW1iZXIoIG51bWJlciAqIChjdXJyZW50ID09PSBcIlBcIiA/IDEwMCA6IDEpLCBwcmVjaXNpb24sIGZvcm1hdEluZm8gKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0aHJvdyBcIkJhZCBudW1iZXIgZm9ybWF0IHNwZWNpZmllcjogXCIgKyBjdXJyZW50O1xuXHRcdH1cblxuXHRcdHZhciBwYXR0ZXJuUGFydHMgPSAvbnxcXCR8LXwlL2csXG5cdFx0XHRyZXQgPSBcIlwiO1xuXHRcdGZvciAoIDsgOyApIHtcblx0XHRcdHZhciBpbmRleCA9IHBhdHRlcm5QYXJ0cy5sYXN0SW5kZXgsXG5cdFx0XHRcdGFyID0gcGF0dGVyblBhcnRzLmV4ZWMoIHBhdHRlcm4gKTtcblxuXHRcdFx0cmV0ICs9IHBhdHRlcm4uc2xpY2UoIGluZGV4LCBhciA/IGFyLmluZGV4IDogcGF0dGVybi5sZW5ndGggKTtcblxuXHRcdFx0aWYgKCAhYXIgKSB7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRzd2l0Y2ggKCBhclswXSApIHtcblx0XHRcdFx0Y2FzZSBcIm5cIjpcblx0XHRcdFx0XHRyZXQgKz0gbnVtYmVyO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiJFwiOlxuXHRcdFx0XHRcdHJldCArPSBuZi5jdXJyZW5jeS5zeW1ib2w7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCItXCI6XG5cdFx0XHRcdFx0Ly8gZG9uJ3QgbWFrZSAwIG5lZ2F0aXZlXG5cdFx0XHRcdFx0aWYgKCAvWzEtOV0vLnRlc3QobnVtYmVyKSApIHtcblx0XHRcdFx0XHRcdHJldCArPSBuZlsgXCItXCIgXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCIlXCI6XG5cdFx0XHRcdFx0cmV0ICs9IG5mLnBlcmNlbnQuc3ltYm9sO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXQ7XG5cdH07XG5cbn0oKSk7XG5cbmdldFRva2VuUmVnRXhwID0gZnVuY3Rpb24oKSB7XG5cdC8vIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgbWF0Y2hpbmcgZGF0ZSBhbmQgdGltZSB0b2tlbnMgaW4gZm9ybWF0IHN0cmluZ3MuXG5cdHJldHVybiAoL1xcL3xkZGRkfGRkZHxkZHxkfE1NTU18TU1NfE1NfE18eXl5eXx5eXx5fGhofGh8SEh8SHxtbXxtfHNzfHN8dHR8dHxmZmZ8ZmZ8Znx6enp8enp8enxnZ3xnL2cpO1xufTtcblxuZ2V0RXJhID0gZnVuY3Rpb24oIGRhdGUsIGVyYXMgKSB7XG5cdGlmICggIWVyYXMgKSByZXR1cm4gMDtcblx0dmFyIHN0YXJ0LCB0aWNrcyA9IGRhdGUuZ2V0VGltZSgpO1xuXHRmb3IgKCB2YXIgaSA9IDAsIGwgPSBlcmFzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRzdGFydCA9IGVyYXNbIGkgXS5zdGFydDtcblx0XHRpZiAoIHN0YXJ0ID09PSBudWxsIHx8IHRpY2tzID49IHN0YXJ0ICkge1xuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAwO1xufTtcblxuZ2V0RXJhWWVhciA9IGZ1bmN0aW9uKCBkYXRlLCBjYWwsIGVyYSwgc29ydGFibGUgKSB7XG5cdHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xuXHRpZiAoICFzb3J0YWJsZSAmJiBjYWwuZXJhcyApIHtcblx0XHQvLyBjb252ZXJ0IG5vcm1hbCBncmVnb3JpYW4geWVhciB0byBlcmEtc2hpZnRlZCBncmVnb3JpYW5cblx0XHQvLyB5ZWFyIGJ5IHN1YnRyYWN0aW5nIHRoZSBlcmEgb2Zmc2V0XG5cdFx0eWVhciAtPSBjYWwuZXJhc1sgZXJhIF0ub2Zmc2V0O1xuXHR9XG5cdHJldHVybiB5ZWFyO1xufTtcblxuLy8gcGFyc2VFeGFjdFxuKGZ1bmN0aW9uKCkge1xuXHR2YXIgZXhwYW5kWWVhcixcblx0XHRnZXREYXlJbmRleCxcblx0XHRnZXRNb250aEluZGV4LFxuXHRcdGdldFBhcnNlUmVnRXhwLFxuXHRcdG91dE9mUmFuZ2UsXG5cdFx0dG9VcHBlcixcblx0XHR0b1VwcGVyQXJyYXk7XG5cblx0ZXhwYW5kWWVhciA9IGZ1bmN0aW9uKCBjYWwsIHllYXIgKSB7XG5cdFx0Ly8gZXhwYW5kcyAyLWRpZ2l0IHllYXIgaW50byA0IGRpZ2l0cy5cblx0XHRpZiAoIHllYXIgPCAxMDAgKSB7XG5cdFx0XHR2YXIgbm93ID0gbmV3IERhdGUoKSxcblx0XHRcdFx0ZXJhID0gZ2V0RXJhKCBub3cgKSxcblx0XHRcdFx0Y3VyciA9IGdldEVyYVllYXIoIG5vdywgY2FsLCBlcmEgKSxcblx0XHRcdFx0dHdvRGlnaXRZZWFyTWF4ID0gY2FsLnR3b0RpZ2l0WWVhck1heDtcblx0XHRcdHR3b0RpZ2l0WWVhck1heCA9IHR5cGVvZiB0d29EaWdpdFllYXJNYXggPT09IFwic3RyaW5nXCIgPyBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkgJSAxMDAgKyBwYXJzZUludCggdHdvRGlnaXRZZWFyTWF4LCAxMCApIDogdHdvRGlnaXRZZWFyTWF4O1xuXHRcdFx0eWVhciArPSBjdXJyIC0gKCBjdXJyICUgMTAwICk7XG5cdFx0XHRpZiAoIHllYXIgPiB0d29EaWdpdFllYXJNYXggKSB7XG5cdFx0XHRcdHllYXIgLT0gMTAwO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geWVhcjtcblx0fTtcblxuXHRnZXREYXlJbmRleCA9IGZ1bmN0aW9uXHQoIGNhbCwgdmFsdWUsIGFiYnIgKSB7XG5cdFx0dmFyIHJldCxcblx0XHRcdGRheXMgPSBjYWwuZGF5cyxcblx0XHRcdHVwcGVyRGF5cyA9IGNhbC5fdXBwZXJEYXlzO1xuXHRcdGlmICggIXVwcGVyRGF5cyApIHtcblx0XHRcdGNhbC5fdXBwZXJEYXlzID0gdXBwZXJEYXlzID0gW1xuXHRcdFx0XHR0b1VwcGVyQXJyYXkoIGRheXMubmFtZXMgKSxcblx0XHRcdFx0dG9VcHBlckFycmF5KCBkYXlzLm5hbWVzQWJiciApLFxuXHRcdFx0XHR0b1VwcGVyQXJyYXkoIGRheXMubmFtZXNTaG9ydCApXG5cdFx0XHRdO1xuXHRcdH1cblx0XHR2YWx1ZSA9IHRvVXBwZXIoIHZhbHVlICk7XG5cdFx0aWYgKCBhYmJyICkge1xuXHRcdFx0cmV0ID0gYXJyYXlJbmRleE9mKCB1cHBlckRheXNbMV0sIHZhbHVlICk7XG5cdFx0XHRpZiAoIHJldCA9PT0gLTEgKSB7XG5cdFx0XHRcdHJldCA9IGFycmF5SW5kZXhPZiggdXBwZXJEYXlzWzJdLCB2YWx1ZSApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHJldCA9IGFycmF5SW5kZXhPZiggdXBwZXJEYXlzWzBdLCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9O1xuXG5cdGdldE1vbnRoSW5kZXggPSBmdW5jdGlvbiggY2FsLCB2YWx1ZSwgYWJiciApIHtcblx0XHR2YXIgbW9udGhzID0gY2FsLm1vbnRocyxcblx0XHRcdG1vbnRoc0dlbiA9IGNhbC5tb250aHNHZW5pdGl2ZSB8fCBjYWwubW9udGhzLFxuXHRcdFx0dXBwZXJNb250aHMgPSBjYWwuX3VwcGVyTW9udGhzLFxuXHRcdFx0dXBwZXJNb250aHNHZW4gPSBjYWwuX3VwcGVyTW9udGhzR2VuO1xuXHRcdGlmICggIXVwcGVyTW9udGhzICkge1xuXHRcdFx0Y2FsLl91cHBlck1vbnRocyA9IHVwcGVyTW9udGhzID0gW1xuXHRcdFx0XHR0b1VwcGVyQXJyYXkoIG1vbnRocy5uYW1lcyApLFxuXHRcdFx0XHR0b1VwcGVyQXJyYXkoIG1vbnRocy5uYW1lc0FiYnIgKVxuXHRcdFx0XTtcblx0XHRcdGNhbC5fdXBwZXJNb250aHNHZW4gPSB1cHBlck1vbnRoc0dlbiA9IFtcblx0XHRcdFx0dG9VcHBlckFycmF5KCBtb250aHNHZW4ubmFtZXMgKSxcblx0XHRcdFx0dG9VcHBlckFycmF5KCBtb250aHNHZW4ubmFtZXNBYmJyIClcblx0XHRcdF07XG5cdFx0fVxuXHRcdHZhbHVlID0gdG9VcHBlciggdmFsdWUgKTtcblx0XHR2YXIgaSA9IGFycmF5SW5kZXhPZiggYWJiciA/IHVwcGVyTW9udGhzWzFdIDogdXBwZXJNb250aHNbMF0sIHZhbHVlICk7XG5cdFx0aWYgKCBpIDwgMCApIHtcblx0XHRcdGkgPSBhcnJheUluZGV4T2YoIGFiYnIgPyB1cHBlck1vbnRoc0dlblsxXSA6IHVwcGVyTW9udGhzR2VuWzBdLCB2YWx1ZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gaTtcblx0fTtcblxuXHRnZXRQYXJzZVJlZ0V4cCA9IGZ1bmN0aW9uKCBjYWwsIGZvcm1hdCApIHtcblx0XHQvLyBjb252ZXJ0cyBhIGZvcm1hdCBzdHJpbmcgaW50byBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB3aXRoIGdyb3VwcyB0aGF0XG5cdFx0Ly8gY2FuIGJlIHVzZWQgdG8gZXh0cmFjdCBkYXRlIGZpZWxkcyBmcm9tIGEgZGF0ZSBzdHJpbmcuXG5cdFx0Ly8gY2hlY2sgZm9yIGEgY2FjaGVkIHBhcnNlIHJlZ2V4LlxuXHRcdHZhciByZSA9IGNhbC5fcGFyc2VSZWdFeHA7XG5cdFx0aWYgKCAhcmUgKSB7XG5cdFx0XHRjYWwuX3BhcnNlUmVnRXhwID0gcmUgPSB7fTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgcmVGb3JtYXQgPSByZVsgZm9ybWF0IF07XG5cdFx0XHRpZiAoIHJlRm9ybWF0ICkge1xuXHRcdFx0XHRyZXR1cm4gcmVGb3JtYXQ7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gZXhwYW5kIHNpbmdsZSBkaWdpdCBmb3JtYXRzLCB0aGVuIGVzY2FwZSByZWd1bGFyIGV4cHJlc3Npb24gY2hhcmFjdGVycy5cblx0XHR2YXIgZXhwRm9ybWF0ID0gZXhwYW5kRm9ybWF0KCBjYWwsIGZvcm1hdCApLnJlcGxhY2UoIC8oW1xcXlxcJFxcLlxcKlxcK1xcP1xcfFxcW1xcXVxcKFxcKVxce1xcfV0pL2csIFwiXFxcXFxcXFwkMVwiICksXG5cdFx0XHRyZWdleHAgPSBbIFwiXlwiIF0sXG5cdFx0XHRncm91cHMgPSBbXSxcblx0XHRcdGluZGV4ID0gMCxcblx0XHRcdHF1b3RlQ291bnQgPSAwLFxuXHRcdFx0dG9rZW5SZWdFeHAgPSBnZXRUb2tlblJlZ0V4cCgpLFxuXHRcdFx0bWF0Y2g7XG5cblx0XHQvLyBpdGVyYXRlIHRocm91Z2ggZWFjaCBkYXRlIHRva2VuIGZvdW5kLlxuXHRcdHdoaWxlICggKG1hdGNoID0gdG9rZW5SZWdFeHAuZXhlYyhleHBGb3JtYXQpKSAhPT0gbnVsbCApIHtcblx0XHRcdHZhciBwcmVNYXRjaCA9IGV4cEZvcm1hdC5zbGljZSggaW5kZXgsIG1hdGNoLmluZGV4ICk7XG5cdFx0XHRpbmRleCA9IHRva2VuUmVnRXhwLmxhc3RJbmRleDtcblxuXHRcdFx0Ly8gZG9uJ3QgcmVwbGFjZSBhbnkgbWF0Y2hlcyB0aGF0IG9jY3VyIGluc2lkZSBhIHN0cmluZyBsaXRlcmFsLlxuXHRcdFx0cXVvdGVDb3VudCArPSBhcHBlbmRQcmVPclBvc3RNYXRjaCggcHJlTWF0Y2gsIHJlZ2V4cCApO1xuXHRcdFx0aWYgKCBxdW90ZUNvdW50ICUgMiApIHtcblx0XHRcdFx0cmVnZXhwLnB1c2goIG1hdGNoWzBdICk7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBhZGQgYSByZWdleCBncm91cCBmb3IgdGhlIHRva2VuLlxuXHRcdFx0dmFyIG0gPSBtYXRjaFsgMCBdLFxuXHRcdFx0XHRsZW4gPSBtLmxlbmd0aCxcblx0XHRcdFx0YWRkO1xuXHRcdFx0c3dpdGNoICggbSApIHtcblx0XHRcdFx0Y2FzZSBcImRkZGRcIjogY2FzZSBcImRkZFwiOlxuXHRcdFx0XHRjYXNlIFwiTU1NTVwiOiBjYXNlIFwiTU1NXCI6XG5cdFx0XHRcdGNhc2UgXCJnZ1wiOiBjYXNlIFwiZ1wiOlxuXHRcdFx0XHRcdGFkZCA9IFwiKFxcXFxEKylcIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInR0XCI6IGNhc2UgXCJ0XCI6XG5cdFx0XHRcdFx0YWRkID0gXCIoXFxcXEQqKVwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwieXl5eVwiOlxuXHRcdFx0XHRjYXNlIFwiZmZmXCI6XG5cdFx0XHRcdGNhc2UgXCJmZlwiOlxuXHRcdFx0XHRjYXNlIFwiZlwiOlxuXHRcdFx0XHRcdGFkZCA9IFwiKFxcXFxke1wiICsgbGVuICsgXCJ9KVwiO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZGRcIjogY2FzZSBcImRcIjpcblx0XHRcdFx0Y2FzZSBcIk1NXCI6IGNhc2UgXCJNXCI6XG5cdFx0XHRcdGNhc2UgXCJ5eVwiOiBjYXNlIFwieVwiOlxuXHRcdFx0XHRjYXNlIFwiSEhcIjogY2FzZSBcIkhcIjpcblx0XHRcdFx0Y2FzZSBcImhoXCI6IGNhc2UgXCJoXCI6XG5cdFx0XHRcdGNhc2UgXCJtbVwiOiBjYXNlIFwibVwiOlxuXHRcdFx0XHRjYXNlIFwic3NcIjogY2FzZSBcInNcIjpcblx0XHRcdFx0XHRhZGQgPSBcIihcXFxcZFxcXFxkPylcIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInp6elwiOlxuXHRcdFx0XHRcdGFkZCA9IFwiKFsrLV0/XFxcXGRcXFxcZD86XFxcXGR7Mn0pXCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ6elwiOiBjYXNlIFwielwiOlxuXHRcdFx0XHRcdGFkZCA9IFwiKFsrLV0/XFxcXGRcXFxcZD8pXCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCIvXCI6XG5cdFx0XHRcdFx0YWRkID0gXCIoXFxcXC8pXCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhyb3cgXCJJbnZhbGlkIGRhdGUgZm9ybWF0IHBhdHRlcm4gXFwnXCIgKyBtICsgXCJcXCcuXCI7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGFkZCApIHtcblx0XHRcdFx0cmVnZXhwLnB1c2goIGFkZCApO1xuXHRcdFx0fVxuXHRcdFx0Z3JvdXBzLnB1c2goIG1hdGNoWzBdICk7XG5cdFx0fVxuXHRcdGFwcGVuZFByZU9yUG9zdE1hdGNoKCBleHBGb3JtYXQuc2xpY2UoaW5kZXgpLCByZWdleHAgKTtcblx0XHRyZWdleHAucHVzaCggXCIkXCIgKTtcblxuXHRcdC8vIGFsbG93IHdoaXRlc3BhY2UgdG8gZGlmZmVyIHdoZW4gbWF0Y2hpbmcgZm9ybWF0cy5cblx0XHR2YXIgcmVnZXhwU3RyID0gcmVnZXhwLmpvaW4oIFwiXCIgKS5yZXBsYWNlKCAvXFxzKy9nLCBcIlxcXFxzK1wiICksXG5cdFx0XHRwYXJzZVJlZ0V4cCA9IHsgXCJyZWdFeHBcIjogcmVnZXhwU3RyLCBcImdyb3Vwc1wiOiBncm91cHMgfTtcblxuXHRcdC8vIGNhY2hlIHRoZSByZWdleCBmb3IgdGhpcyBmb3JtYXQuXG5cdFx0cmV0dXJuIHJlWyBmb3JtYXQgXSA9IHBhcnNlUmVnRXhwO1xuXHR9O1xuXG5cdG91dE9mUmFuZ2UgPSBmdW5jdGlvbiggdmFsdWUsIGxvdywgaGlnaCApIHtcblx0XHRyZXR1cm4gdmFsdWUgPCBsb3cgfHwgdmFsdWUgPiBoaWdoO1xuXHR9O1xuXG5cdHRvVXBwZXIgPSBmdW5jdGlvbiggdmFsdWUgKSB7XG5cdFx0Ly8gXCJoZS1JTFwiIGhhcyBub24tYnJlYWtpbmcgc3BhY2UgaW4gd2Vla2RheSBuYW1lcy5cblx0XHRyZXR1cm4gdmFsdWUuc3BsaXQoIFwiXFx1MDBBMFwiICkuam9pbiggXCIgXCIgKS50b1VwcGVyQ2FzZSgpO1xuXHR9O1xuXG5cdHRvVXBwZXJBcnJheSA9IGZ1bmN0aW9uKCBhcnIgKSB7XG5cdFx0dmFyIHJlc3VsdHMgPSBbXTtcblx0XHRmb3IgKCB2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0cmVzdWx0c1sgaSBdID0gdG9VcHBlciggYXJyW2ldICk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRzO1xuXHR9O1xuXG5cdHBhcnNlRXhhY3QgPSBmdW5jdGlvbiggdmFsdWUsIGZvcm1hdCwgY3VsdHVyZSApIHtcblx0XHQvLyB0cnkgdG8gcGFyc2UgdGhlIGRhdGUgc3RyaW5nIGJ5IG1hdGNoaW5nIGFnYWluc3QgdGhlIGZvcm1hdCBzdHJpbmdcblx0XHQvLyB3aGlsZSB1c2luZyB0aGUgc3BlY2lmaWVkIGN1bHR1cmUgZm9yIGRhdGUgZmllbGQgbmFtZXMuXG5cdFx0dmFsdWUgPSB0cmltKCB2YWx1ZSApO1xuXHRcdHZhciBjYWwgPSBjdWx0dXJlLmNhbGVuZGFyLFxuXHRcdFx0Ly8gY29udmVydCBkYXRlIGZvcm1hdHMgaW50byByZWd1bGFyIGV4cHJlc3Npb25zIHdpdGggZ3JvdXBpbmdzLlxuXHRcdFx0Ly8gdXNlIHRoZSByZWdleHAgdG8gZGV0ZXJtaW5lIHRoZSBpbnB1dCBmb3JtYXQgYW5kIGV4dHJhY3QgdGhlIGRhdGUgZmllbGRzLlxuXHRcdFx0cGFyc2VJbmZvID0gZ2V0UGFyc2VSZWdFeHAoIGNhbCwgZm9ybWF0ICksXG5cdFx0XHRtYXRjaCA9IG5ldyBSZWdFeHAoIHBhcnNlSW5mby5yZWdFeHAgKS5leGVjKCB2YWx1ZSApO1xuXHRcdGlmICggbWF0Y2ggPT09IG51bGwgKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Ly8gZm91bmQgYSBkYXRlIGZvcm1hdCB0aGF0IG1hdGNoZXMgdGhlIGlucHV0LlxuXHRcdHZhciBncm91cHMgPSBwYXJzZUluZm8uZ3JvdXBzLFxuXHRcdFx0ZXJhID0gbnVsbCwgeWVhciA9IG51bGwsIG1vbnRoID0gbnVsbCwgZGF0ZSA9IG51bGwsIHdlZWtEYXkgPSBudWxsLFxuXHRcdFx0aG91ciA9IDAsIGhvdXJPZmZzZXQsIG1pbiA9IDAsIHNlYyA9IDAsIG1zZWMgPSAwLCB0ek1pbk9mZnNldCA9IG51bGwsXG5cdFx0XHRwbUhvdXIgPSBmYWxzZTtcblx0XHQvLyBpdGVyYXRlIHRoZSBmb3JtYXQgZ3JvdXBzIHRvIGV4dHJhY3QgYW5kIHNldCB0aGUgZGF0ZSBmaWVsZHMuXG5cdFx0Zm9yICggdmFyIGogPSAwLCBqbCA9IGdyb3Vwcy5sZW5ndGg7IGogPCBqbDsgaisrICkge1xuXHRcdFx0dmFyIG1hdGNoR3JvdXAgPSBtYXRjaFsgaiArIDEgXTtcblx0XHRcdGlmICggbWF0Y2hHcm91cCApIHtcblx0XHRcdFx0dmFyIGN1cnJlbnQgPSBncm91cHNbIGogXSxcblx0XHRcdFx0XHRjbGVuZ3RoID0gY3VycmVudC5sZW5ndGgsXG5cdFx0XHRcdFx0bWF0Y2hJbnQgPSBwYXJzZUludCggbWF0Y2hHcm91cCwgMTAgKTtcblx0XHRcdFx0c3dpdGNoICggY3VycmVudCApIHtcblx0XHRcdFx0XHRjYXNlIFwiZGRcIjogY2FzZSBcImRcIjpcblx0XHRcdFx0XHRcdC8vIERheSBvZiBtb250aC5cblx0XHRcdFx0XHRcdGRhdGUgPSBtYXRjaEludDtcblx0XHRcdFx0XHRcdC8vIGNoZWNrIHRoYXQgZGF0ZSBpcyBnZW5lcmFsbHkgaW4gdmFsaWQgcmFuZ2UsIGFsc28gY2hlY2tpbmcgb3ZlcmZsb3cgYmVsb3cuXG5cdFx0XHRcdFx0XHRpZiAoIG91dE9mUmFuZ2UoZGF0ZSwgMSwgMzEpICkgcmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiTU1NXCI6IGNhc2UgXCJNTU1NXCI6XG5cdFx0XHRcdFx0XHRtb250aCA9IGdldE1vbnRoSW5kZXgoIGNhbCwgbWF0Y2hHcm91cCwgY2xlbmd0aCA9PT0gMyApO1xuXHRcdFx0XHRcdFx0aWYgKCBvdXRPZlJhbmdlKG1vbnRoLCAwLCAxMSkgKSByZXR1cm4gbnVsbDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJNXCI6IGNhc2UgXCJNTVwiOlxuXHRcdFx0XHRcdFx0Ly8gTW9udGguXG5cdFx0XHRcdFx0XHRtb250aCA9IG1hdGNoSW50IC0gMTtcblx0XHRcdFx0XHRcdGlmICggb3V0T2ZSYW5nZShtb250aCwgMCwgMTEpICkgcmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwieVwiOiBjYXNlIFwieXlcIjpcblx0XHRcdFx0XHRjYXNlIFwieXl5eVwiOlxuXHRcdFx0XHRcdFx0eWVhciA9IGNsZW5ndGggPCA0ID8gZXhwYW5kWWVhciggY2FsLCBtYXRjaEludCApIDogbWF0Y2hJbnQ7XG5cdFx0XHRcdFx0XHRpZiAoIG91dE9mUmFuZ2UoeWVhciwgMCwgOTk5OSkgKSByZXR1cm4gbnVsbDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJoXCI6IGNhc2UgXCJoaFwiOlxuXHRcdFx0XHRcdFx0Ly8gSG91cnMgKDEyLWhvdXIgY2xvY2spLlxuXHRcdFx0XHRcdFx0aG91ciA9IG1hdGNoSW50O1xuXHRcdFx0XHRcdFx0aWYgKCBob3VyID09PSAxMiApIGhvdXIgPSAwO1xuXHRcdFx0XHRcdFx0aWYgKCBvdXRPZlJhbmdlKGhvdXIsIDAsIDExKSApIHJldHVybiBudWxsO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIkhcIjogY2FzZSBcIkhIXCI6XG5cdFx0XHRcdFx0XHQvLyBIb3VycyAoMjQtaG91ciBjbG9jaykuXG5cdFx0XHRcdFx0XHRob3VyID0gbWF0Y2hJbnQ7XG5cdFx0XHRcdFx0XHRpZiAoIG91dE9mUmFuZ2UoaG91ciwgMCwgMjMpICkgcmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwibVwiOiBjYXNlIFwibW1cIjpcblx0XHRcdFx0XHRcdC8vIE1pbnV0ZXMuXG5cdFx0XHRcdFx0XHRtaW4gPSBtYXRjaEludDtcblx0XHRcdFx0XHRcdGlmICggb3V0T2ZSYW5nZShtaW4sIDAsIDU5KSApIHJldHVybiBudWxsO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcInNcIjogY2FzZSBcInNzXCI6XG5cdFx0XHRcdFx0XHQvLyBTZWNvbmRzLlxuXHRcdFx0XHRcdFx0c2VjID0gbWF0Y2hJbnQ7XG5cdFx0XHRcdFx0XHRpZiAoIG91dE9mUmFuZ2Uoc2VjLCAwLCA1OSkgKSByZXR1cm4gbnVsbDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJ0dFwiOiBjYXNlIFwidFwiOlxuXHRcdFx0XHRcdFx0Ly8gQU0vUE0gZGVzaWduYXRvci5cblx0XHRcdFx0XHRcdC8vIHNlZSBpZiBpdCBpcyBzdGFuZGFyZCwgdXBwZXIsIG9yIGxvd2VyIGNhc2UgUE0uIElmIG5vdCwgZW5zdXJlIGl0IGlzIGF0IGxlYXN0IG9uZSBvZlxuXHRcdFx0XHRcdFx0Ly8gdGhlIEFNIHRva2Vucy4gSWYgbm90LCBmYWlsIHRoZSBwYXJzZSBmb3IgdGhpcyBmb3JtYXQuXG5cdFx0XHRcdFx0XHRwbUhvdXIgPSBjYWwuUE0gJiYgKCBtYXRjaEdyb3VwID09PSBjYWwuUE1bMF0gfHwgbWF0Y2hHcm91cCA9PT0gY2FsLlBNWzFdIHx8IG1hdGNoR3JvdXAgPT09IGNhbC5QTVsyXSApO1xuXHRcdFx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdFx0XHQhcG1Ib3VyICYmIChcblx0XHRcdFx0XHRcdFx0XHQhY2FsLkFNIHx8ICggbWF0Y2hHcm91cCAhPT0gY2FsLkFNWzBdICYmIG1hdGNoR3JvdXAgIT09IGNhbC5BTVsxXSAmJiBtYXRjaEdyb3VwICE9PSBjYWwuQU1bMl0gKVxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHQpIHJldHVybiBudWxsO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcImZcIjpcblx0XHRcdFx0XHRcdC8vIERlY2lzZWNvbmRzLlxuXHRcdFx0XHRcdGNhc2UgXCJmZlwiOlxuXHRcdFx0XHRcdFx0Ly8gQ2VudGlzZWNvbmRzLlxuXHRcdFx0XHRcdGNhc2UgXCJmZmZcIjpcblx0XHRcdFx0XHRcdC8vIE1pbGxpc2Vjb25kcy5cblx0XHRcdFx0XHRcdG1zZWMgPSBtYXRjaEludCAqIE1hdGgucG93KCAxMCwgMyAtIGNsZW5ndGggKTtcblx0XHRcdFx0XHRcdGlmICggb3V0T2ZSYW5nZShtc2VjLCAwLCA5OTkpICkgcmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwiZGRkXCI6XG5cdFx0XHRcdFx0XHQvLyBEYXkgb2Ygd2Vlay5cblx0XHRcdFx0XHRjYXNlIFwiZGRkZFwiOlxuXHRcdFx0XHRcdFx0Ly8gRGF5IG9mIHdlZWsuXG5cdFx0XHRcdFx0XHR3ZWVrRGF5ID0gZ2V0RGF5SW5kZXgoIGNhbCwgbWF0Y2hHcm91cCwgY2xlbmd0aCA9PT0gMyApO1xuXHRcdFx0XHRcdFx0aWYgKCBvdXRPZlJhbmdlKHdlZWtEYXksIDAsIDYpICkgcmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwienp6XCI6XG5cdFx0XHRcdFx0XHQvLyBUaW1lIHpvbmUgb2Zmc2V0IGluICsvLSBob3VyczptaW4uXG5cdFx0XHRcdFx0XHR2YXIgb2Zmc2V0cyA9IG1hdGNoR3JvdXAuc3BsaXQoIC86LyApO1xuXHRcdFx0XHRcdFx0aWYgKCBvZmZzZXRzLmxlbmd0aCAhPT0gMiApIHJldHVybiBudWxsO1xuXHRcdFx0XHRcdFx0aG91ck9mZnNldCA9IHBhcnNlSW50KCBvZmZzZXRzWzBdLCAxMCApO1xuXHRcdFx0XHRcdFx0aWYgKCBvdXRPZlJhbmdlKGhvdXJPZmZzZXQsIC0xMiwgMTMpICkgcmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHR2YXIgbWluT2Zmc2V0ID0gcGFyc2VJbnQoIG9mZnNldHNbMV0sIDEwICk7XG5cdFx0XHRcdFx0XHRpZiAoIG91dE9mUmFuZ2UobWluT2Zmc2V0LCAwLCA1OSkgKSByZXR1cm4gbnVsbDtcblx0XHRcdFx0XHRcdHR6TWluT2Zmc2V0ID0gKCBob3VyT2Zmc2V0ICogNjAgKSArICggc3RhcnRzV2l0aChtYXRjaEdyb3VwLCBcIi1cIikgPyAtbWluT2Zmc2V0IDogbWluT2Zmc2V0ICk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlIFwielwiOiBjYXNlIFwienpcIjpcblx0XHRcdFx0XHRcdC8vIFRpbWUgem9uZSBvZmZzZXQgaW4gKy8tIGhvdXJzLlxuXHRcdFx0XHRcdFx0aG91ck9mZnNldCA9IG1hdGNoSW50O1xuXHRcdFx0XHRcdFx0aWYgKCBvdXRPZlJhbmdlKGhvdXJPZmZzZXQsIC0xMiwgMTMpICkgcmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0XHR0ek1pbk9mZnNldCA9IGhvdXJPZmZzZXQgKiA2MDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJnXCI6IGNhc2UgXCJnZ1wiOlxuXHRcdFx0XHRcdFx0dmFyIGVyYU5hbWUgPSBtYXRjaEdyb3VwO1xuXHRcdFx0XHRcdFx0aWYgKCAhZXJhTmFtZSB8fCAhY2FsLmVyYXMgKSByZXR1cm4gbnVsbDtcblx0XHRcdFx0XHRcdGVyYU5hbWUgPSB0cmltKCBlcmFOYW1lLnRvTG93ZXJDYXNlKCkgKTtcblx0XHRcdFx0XHRcdGZvciAoIHZhciBpID0gMCwgbCA9IGNhbC5lcmFzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdFx0XHRcdFx0aWYgKCBlcmFOYW1lID09PSBjYWwuZXJhc1tpXS5uYW1lLnRvTG93ZXJDYXNlKCkgKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXJhID0gaTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gY291bGQgbm90IGZpbmQgYW4gZXJhIHdpdGggdGhhdCBuYW1lXG5cdFx0XHRcdFx0XHRpZiAoIGVyYSA9PT0gbnVsbCApIHJldHVybiBudWxsO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dmFyIHJlc3VsdCA9IG5ldyBEYXRlKCksIGRlZmF1bHRZZWFyLCBjb252ZXJ0ID0gY2FsLmNvbnZlcnQ7XG5cdFx0ZGVmYXVsdFllYXIgPSBjb252ZXJ0ID8gY29udmVydC5mcm9tR3JlZ29yaWFuKCByZXN1bHQgKVsgMCBdIDogcmVzdWx0LmdldEZ1bGxZZWFyKCk7XG5cdFx0aWYgKCB5ZWFyID09PSBudWxsICkge1xuXHRcdFx0eWVhciA9IGRlZmF1bHRZZWFyO1xuXHRcdH1cblx0XHRlbHNlIGlmICggY2FsLmVyYXMgKSB7XG5cdFx0XHQvLyB5ZWFyIG11c3QgYmUgc2hpZnRlZCB0byBub3JtYWwgZ3JlZ29yaWFuIHllYXJcblx0XHRcdC8vIGJ1dCBub3QgaWYgeWVhciB3YXMgbm90IHNwZWNpZmllZCwgaXRzIGFscmVhZHkgbm9ybWFsIGdyZWdvcmlhblxuXHRcdFx0Ly8gcGVyIHRoZSBtYWluIGlmIGNsYXVzZSBhYm92ZS5cblx0XHRcdHllYXIgKz0gY2FsLmVyYXNbKCBlcmEgfHwgMCApXS5vZmZzZXQ7XG5cdFx0fVxuXHRcdC8vIHNldCBkZWZhdWx0IGRheSBhbmQgbW9udGggdG8gMSBhbmQgSmFudWFyeSwgc28gaWYgdW5zcGVjaWZpZWQsIHRoZXNlIGFyZSB0aGUgZGVmYXVsdHNcblx0XHQvLyBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IGRheS9tb250aC5cblx0XHRpZiAoIG1vbnRoID09PSBudWxsICkge1xuXHRcdFx0bW9udGggPSAwO1xuXHRcdH1cblx0XHRpZiAoIGRhdGUgPT09IG51bGwgKSB7XG5cdFx0XHRkYXRlID0gMTtcblx0XHR9XG5cdFx0Ly8gbm93IGhhdmUgeWVhciwgbW9udGgsIGFuZCBkYXRlLCBidXQgaW4gdGhlIGN1bHR1cmUncyBjYWxlbmRhci5cblx0XHQvLyBjb252ZXJ0IHRvIGdyZWdvcmlhbiBpZiBuZWNlc3Nhcnlcblx0XHRpZiAoIGNvbnZlcnQgKSB7XG5cdFx0XHRyZXN1bHQgPSBjb252ZXJ0LnRvR3JlZ29yaWFuKCB5ZWFyLCBtb250aCwgZGF0ZSApO1xuXHRcdFx0Ly8gY29udmVyc2lvbiBmYWlsZWQsIG11c3QgYmUgYW4gaW52YWxpZCBtYXRjaFxuXHRcdFx0aWYgKCByZXN1bHQgPT09IG51bGwgKSByZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQvLyBoYXZlIHRvIHNldCB5ZWFyLCBtb250aCBhbmQgZGF0ZSB0b2dldGhlciB0byBhdm9pZCBvdmVyZmxvdyBiYXNlZCBvbiBjdXJyZW50IGRhdGUuXG5cdFx0XHRyZXN1bHQuc2V0RnVsbFllYXIoIHllYXIsIG1vbnRoLCBkYXRlICk7XG5cdFx0XHQvLyBjaGVjayB0byBzZWUgaWYgZGF0ZSBvdmVyZmxvd2VkIGZvciBzcGVjaWZpZWQgbW9udGggKG9ubHkgY2hlY2tlZCAxLTMxIGFib3ZlKS5cblx0XHRcdGlmICggcmVzdWx0LmdldERhdGUoKSAhPT0gZGF0ZSApIHJldHVybiBudWxsO1xuXHRcdFx0Ly8gaW52YWxpZCBkYXkgb2Ygd2Vlay5cblx0XHRcdGlmICggd2Vla0RheSAhPT0gbnVsbCAmJiByZXN1bHQuZ2V0RGF5KCkgIT09IHdlZWtEYXkgKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBpZiBwbSBkZXNpZ25hdG9yIHRva2VuIHdhcyBmb3VuZCBtYWtlIHN1cmUgdGhlIGhvdXJzIGZpdCB0aGUgMjQtaG91ciBjbG9jay5cblx0XHRpZiAoIHBtSG91ciAmJiBob3VyIDwgMTIgKSB7XG5cdFx0XHRob3VyICs9IDEyO1xuXHRcdH1cblx0XHRyZXN1bHQuc2V0SG91cnMoIGhvdXIsIG1pbiwgc2VjLCBtc2VjICk7XG5cdFx0aWYgKCB0ek1pbk9mZnNldCAhPT0gbnVsbCApIHtcblx0XHRcdC8vIGFkanVzdCB0aW1lem9uZSB0byB1dGMgYmVmb3JlIGFwcGx5aW5nIGxvY2FsIG9mZnNldC5cblx0XHRcdHZhciBhZGp1c3RlZE1pbiA9IHJlc3VsdC5nZXRNaW51dGVzKCkgLSAoIHR6TWluT2Zmc2V0ICsgcmVzdWx0LmdldFRpbWV6b25lT2Zmc2V0KCkgKTtcblx0XHRcdC8vIFNhZmFyaSBsaW1pdHMgaG91cnMgYW5kIG1pbnV0ZXMgdG8gdGhlIHJhbmdlIG9mIC0xMjcgdG8gMTI3LiAgV2UgbmVlZCB0byB1c2Ugc2V0SG91cnNcblx0XHRcdC8vIHRvIGVuc3VyZSBib3RoIHRoZXNlIGZpZWxkcyB3aWxsIG5vdCBleGNlZWQgdGhpcyByYW5nZS5cdGFkanVzdGVkTWluIHdpbGwgcmFuZ2Vcblx0XHRcdC8vIHNvbWV3aGVyZSBiZXR3ZWVuIC0xNDQwIGFuZCAxNTAwLCBzbyB3ZSBvbmx5IG5lZWQgdG8gc3BsaXQgdGhpcyBpbnRvIGhvdXJzLlxuXHRcdFx0cmVzdWx0LnNldEhvdXJzKCByZXN1bHQuZ2V0SG91cnMoKSArIHBhcnNlSW50KGFkanVzdGVkTWluIC8gNjAsIDEwKSwgYWRqdXN0ZWRNaW4gJSA2MCApO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xufSgpKTtcblxucGFyc2VOZWdhdGl2ZVBhdHRlcm4gPSBmdW5jdGlvbiggdmFsdWUsIG5mLCBuZWdhdGl2ZVBhdHRlcm4gKSB7XG5cdHZhciBuZWcgPSBuZlsgXCItXCIgXSxcblx0XHRwb3MgPSBuZlsgXCIrXCIgXSxcblx0XHRyZXQ7XG5cdHN3aXRjaCAoIG5lZ2F0aXZlUGF0dGVybiApIHtcblx0XHRjYXNlIFwibiAtXCI6XG5cdFx0XHRuZWcgPSBcIiBcIiArIG5lZztcblx0XHRcdHBvcyA9IFwiIFwiICsgcG9zO1xuXHRcdFx0LyogZmFsbHMgdGhyb3VnaCAqL1xuXHRcdGNhc2UgXCJuLVwiOlxuXHRcdFx0aWYgKCBlbmRzV2l0aCh2YWx1ZSwgbmVnKSApIHtcblx0XHRcdFx0cmV0ID0gWyBcIi1cIiwgdmFsdWUuc3Vic3RyKDAsIHZhbHVlLmxlbmd0aCAtIG5lZy5sZW5ndGgpIF07XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICggZW5kc1dpdGgodmFsdWUsIHBvcykgKSB7XG5cdFx0XHRcdHJldCA9IFsgXCIrXCIsIHZhbHVlLnN1YnN0cigwLCB2YWx1ZS5sZW5ndGggLSBwb3MubGVuZ3RoKSBdO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIi0gblwiOlxuXHRcdFx0bmVnICs9IFwiIFwiO1xuXHRcdFx0cG9zICs9IFwiIFwiO1xuXHRcdFx0LyogZmFsbHMgdGhyb3VnaCAqL1xuXHRcdGNhc2UgXCItblwiOlxuXHRcdFx0aWYgKCBzdGFydHNXaXRoKHZhbHVlLCBuZWcpICkge1xuXHRcdFx0XHRyZXQgPSBbIFwiLVwiLCB2YWx1ZS5zdWJzdHIobmVnLmxlbmd0aCkgXTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKCBzdGFydHNXaXRoKHZhbHVlLCBwb3MpICkge1xuXHRcdFx0XHRyZXQgPSBbIFwiK1wiLCB2YWx1ZS5zdWJzdHIocG9zLmxlbmd0aCkgXTtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCIobilcIjpcblx0XHRcdGlmICggc3RhcnRzV2l0aCh2YWx1ZSwgXCIoXCIpICYmIGVuZHNXaXRoKHZhbHVlLCBcIilcIikgKSB7XG5cdFx0XHRcdHJldCA9IFsgXCItXCIsIHZhbHVlLnN1YnN0cigxLCB2YWx1ZS5sZW5ndGggLSAyKSBdO1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdH1cblx0cmV0dXJuIHJldCB8fCBbIFwiXCIsIHZhbHVlIF07XG59O1xuXG4vL1xuLy8gcHVibGljIGluc3RhbmNlIGZ1bmN0aW9uc1xuLy9cblxuR2xvYmFsaXplLnByb3RvdHlwZS5maW5kQ2xvc2VzdEN1bHR1cmUgPSBmdW5jdGlvbiggY3VsdHVyZVNlbGVjdG9yICkge1xuXHRyZXR1cm4gR2xvYmFsaXplLmZpbmRDbG9zZXN0Q3VsdHVyZS5jYWxsKCB0aGlzLCBjdWx0dXJlU2VsZWN0b3IgKTtcbn07XG5cbkdsb2JhbGl6ZS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oIHZhbHVlLCBmb3JtYXQsIGN1bHR1cmVTZWxlY3RvciApIHtcblx0cmV0dXJuIEdsb2JhbGl6ZS5mb3JtYXQuY2FsbCggdGhpcywgdmFsdWUsIGZvcm1hdCwgY3VsdHVyZVNlbGVjdG9yICk7XG59O1xuXG5HbG9iYWxpemUucHJvdG90eXBlLmxvY2FsaXplID0gZnVuY3Rpb24oIGtleSwgY3VsdHVyZVNlbGVjdG9yICkge1xuXHRyZXR1cm4gR2xvYmFsaXplLmxvY2FsaXplLmNhbGwoIHRoaXMsIGtleSwgY3VsdHVyZVNlbGVjdG9yICk7XG59O1xuXG5HbG9iYWxpemUucHJvdG90eXBlLnBhcnNlSW50ID0gZnVuY3Rpb24oIHZhbHVlLCByYWRpeCwgY3VsdHVyZVNlbGVjdG9yICkge1xuXHRyZXR1cm4gR2xvYmFsaXplLnBhcnNlSW50LmNhbGwoIHRoaXMsIHZhbHVlLCByYWRpeCwgY3VsdHVyZVNlbGVjdG9yICk7XG59O1xuXG5HbG9iYWxpemUucHJvdG90eXBlLnBhcnNlRmxvYXQgPSBmdW5jdGlvbiggdmFsdWUsIHJhZGl4LCBjdWx0dXJlU2VsZWN0b3IgKSB7XG5cdHJldHVybiBHbG9iYWxpemUucGFyc2VGbG9hdC5jYWxsKCB0aGlzLCB2YWx1ZSwgcmFkaXgsIGN1bHR1cmVTZWxlY3RvciApO1xufTtcblxuR2xvYmFsaXplLnByb3RvdHlwZS5jdWx0dXJlID0gZnVuY3Rpb24oIGN1bHR1cmVTZWxlY3RvciApIHtcblx0cmV0dXJuIEdsb2JhbGl6ZS5jdWx0dXJlLmNhbGwoIHRoaXMsIGN1bHR1cmVTZWxlY3RvciApO1xufTtcblxuLy9cbi8vIHB1YmxpYyBzaW5nbGV0b24gZnVuY3Rpb25zXG4vL1xuXG5HbG9iYWxpemUuYWRkQ3VsdHVyZUluZm8gPSBmdW5jdGlvbiggY3VsdHVyZU5hbWUsIGJhc2VDdWx0dXJlTmFtZSwgaW5mbyApIHtcblxuXHR2YXIgYmFzZSA9IHt9LFxuXHRcdGlzTmV3ID0gZmFsc2U7XG5cblx0aWYgKCB0eXBlb2YgY3VsdHVyZU5hbWUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0Ly8gY3VsdHVyZU5hbWUgYXJndW1lbnQgaXMgb3B0aW9uYWwgc3RyaW5nLiBJZiBub3Qgc3BlY2lmaWVkLCBhc3N1bWUgaW5mbyBpcyBmaXJzdFxuXHRcdC8vIGFuZCBvbmx5IGFyZ3VtZW50LiBTcGVjaWZpZWQgaW5mbyBkZWVwLWV4dGVuZHMgY3VycmVudCBjdWx0dXJlLlxuXHRcdGluZm8gPSBjdWx0dXJlTmFtZTtcblx0XHRjdWx0dXJlTmFtZSA9IHRoaXMuY3VsdHVyZSgpLm5hbWU7XG5cdFx0YmFzZSA9IHRoaXMuY3VsdHVyZXNbIGN1bHR1cmVOYW1lIF07XG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBiYXNlQ3VsdHVyZU5hbWUgIT09IFwic3RyaW5nXCIgKSB7XG5cdFx0Ly8gYmFzZUN1bHR1cmVOYW1lIGFyZ3VtZW50IGlzIG9wdGlvbmFsIHN0cmluZy4gSWYgbm90IHNwZWNpZmllZCwgYXNzdW1lIGluZm8gaXMgc2Vjb25kXG5cdFx0Ly8gYXJndW1lbnQuIFNwZWNpZmllZCBpbmZvIGRlZXAtZXh0ZW5kcyBzcGVjaWZpZWQgY3VsdHVyZS5cblx0XHQvLyBJZiBzcGVjaWZpZWQgY3VsdHVyZSBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGJ5IGRlZXAtZXh0ZW5kaW5nIGRlZmF1bHRcblx0XHRpbmZvID0gYmFzZUN1bHR1cmVOYW1lO1xuXHRcdGlzTmV3ID0gKCB0aGlzLmN1bHR1cmVzWyBjdWx0dXJlTmFtZSBdID09IG51bGwgKTtcblx0XHRiYXNlID0gdGhpcy5jdWx0dXJlc1sgY3VsdHVyZU5hbWUgXSB8fCB0aGlzLmN1bHR1cmVzWyBcImRlZmF1bHRcIiBdO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGN1bHR1cmVOYW1lIGFuZCBiYXNlQ3VsdHVyZU5hbWUgc3BlY2lmaWVkLiBBc3N1bWUgYSBuZXcgY3VsdHVyZSBpcyBiZWluZyBjcmVhdGVkXG5cdFx0Ly8gYnkgZGVlcC1leHRlbmRpbmcgYW4gc3BlY2lmaWVkIGJhc2UgY3VsdHVyZVxuXHRcdGlzTmV3ID0gdHJ1ZTtcblx0XHRiYXNlID0gdGhpcy5jdWx0dXJlc1sgYmFzZUN1bHR1cmVOYW1lIF07XG5cdH1cblxuXHR0aGlzLmN1bHR1cmVzWyBjdWx0dXJlTmFtZSBdID0gZXh0ZW5kKHRydWUsIHt9LFxuXHRcdGJhc2UsXG5cdFx0aW5mb1xuXHQpO1xuXHQvLyBNYWtlIHRoZSBzdGFuZGFyZCBjYWxlbmRhciB0aGUgY3VycmVudCBjdWx0dXJlIGlmIGl0J3MgYSBuZXcgY3VsdHVyZVxuXHRpZiAoIGlzTmV3ICkge1xuXHRcdHRoaXMuY3VsdHVyZXNbIGN1bHR1cmVOYW1lIF0uY2FsZW5kYXIgPSB0aGlzLmN1bHR1cmVzWyBjdWx0dXJlTmFtZSBdLmNhbGVuZGFycy5zdGFuZGFyZDtcblx0fVxufTtcblxuR2xvYmFsaXplLmZpbmRDbG9zZXN0Q3VsdHVyZSA9IGZ1bmN0aW9uKCBuYW1lICkge1xuXHR2YXIgbWF0Y2g7XG5cdGlmICggIW5hbWUgKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmluZENsb3Nlc3RDdWx0dXJlKCB0aGlzLmN1bHR1cmVTZWxlY3RvciApIHx8IHRoaXMuY3VsdHVyZXNbIFwiZGVmYXVsdFwiIF07XG5cdH1cblx0aWYgKCB0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRuYW1lID0gbmFtZS5zcGxpdCggXCIsXCIgKTtcblx0fVxuXHRpZiAoIGlzQXJyYXkobmFtZSkgKSB7XG5cdFx0dmFyIGxhbmcsXG5cdFx0XHRjdWx0dXJlcyA9IHRoaXMuY3VsdHVyZXMsXG5cdFx0XHRsaXN0ID0gbmFtZSxcblx0XHRcdGksIGwgPSBsaXN0Lmxlbmd0aCxcblx0XHRcdHByaW9yaXRpemVkID0gW107XG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRuYW1lID0gdHJpbSggbGlzdFtpXSApO1xuXHRcdFx0dmFyIHByaSwgcGFydHMgPSBuYW1lLnNwbGl0KCBcIjtcIiApO1xuXHRcdFx0bGFuZyA9IHRyaW0oIHBhcnRzWzBdICk7XG5cdFx0XHRpZiAoIHBhcnRzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRcdFx0cHJpID0gMTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRuYW1lID0gdHJpbSggcGFydHNbMV0gKTtcblx0XHRcdFx0aWYgKCBuYW1lLmluZGV4T2YoXCJxPVwiKSA9PT0gMCApIHtcblx0XHRcdFx0XHRuYW1lID0gbmFtZS5zdWJzdHIoIDIgKTtcblx0XHRcdFx0XHRwcmkgPSBwYXJzZUZsb2F0KCBuYW1lICk7XG5cdFx0XHRcdFx0cHJpID0gaXNOYU4oIHByaSApID8gMCA6IHByaTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRwcmkgPSAxO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRwcmlvcml0aXplZC5wdXNoKHsgbGFuZzogbGFuZywgcHJpOiBwcmkgfSk7XG5cdFx0fVxuXHRcdHByaW9yaXRpemVkLnNvcnQoZnVuY3Rpb24oIGEsIGIgKSB7XG5cdFx0XHRpZiAoIGEucHJpIDwgYi5wcmkgKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fSBlbHNlIGlmICggYS5wcmkgPiBiLnByaSApIHtcblx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fSk7XG5cdFx0Ly8gZXhhY3QgbWF0Y2hcblx0XHRmb3IgKCBpID0gMDsgaSA8IGw7IGkrKyApIHtcblx0XHRcdGxhbmcgPSBwcmlvcml0aXplZFsgaSBdLmxhbmc7XG5cdFx0XHRtYXRjaCA9IGN1bHR1cmVzWyBsYW5nIF07XG5cdFx0XHRpZiAoIG1hdGNoICkge1xuXHRcdFx0XHRyZXR1cm4gbWF0Y2g7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gbmV1dHJhbCBsYW5ndWFnZSBtYXRjaFxuXHRcdGZvciAoIGkgPSAwOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0bGFuZyA9IHByaW9yaXRpemVkWyBpIF0ubGFuZztcblx0XHRcdGRvIHtcblx0XHRcdFx0dmFyIGluZGV4ID0gbGFuZy5sYXN0SW5kZXhPZiggXCItXCIgKTtcblx0XHRcdFx0aWYgKCBpbmRleCA9PT0gLTEgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gc3RyaXAgb2ZmIHRoZSBsYXN0IHBhcnQuIGUuZy4gZW4tVVMgPT4gZW5cblx0XHRcdFx0bGFuZyA9IGxhbmcuc3Vic3RyKCAwLCBpbmRleCApO1xuXHRcdFx0XHRtYXRjaCA9IGN1bHR1cmVzWyBsYW5nIF07XG5cdFx0XHRcdGlmICggbWF0Y2ggKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG1hdGNoO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR3aGlsZSAoIDEgKTtcblx0XHR9XG5cblx0XHQvLyBsYXN0IHJlc29ydDogbWF0Y2ggZmlyc3QgY3VsdHVyZSB1c2luZyB0aGF0IGxhbmd1YWdlXG5cdFx0Zm9yICggaSA9IDA7IGkgPCBsOyBpKysgKSB7XG5cdFx0XHRsYW5nID0gcHJpb3JpdGl6ZWRbIGkgXS5sYW5nO1xuXHRcdFx0Zm9yICggdmFyIGN1bHR1cmVLZXkgaW4gY3VsdHVyZXMgKSB7XG5cdFx0XHRcdHZhciBjdWx0dXJlID0gY3VsdHVyZXNbIGN1bHR1cmVLZXkgXTtcblx0XHRcdFx0aWYgKCBjdWx0dXJlLmxhbmd1YWdlID09IGxhbmcgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGN1bHR1cmU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZWxzZSBpZiAoIHR5cGVvZiBuYW1lID09PSBcIm9iamVjdFwiICkge1xuXHRcdHJldHVybiBuYW1lO1xuXHR9XG5cdHJldHVybiBtYXRjaCB8fCBudWxsO1xufTtcblxuR2xvYmFsaXplLmZvcm1hdCA9IGZ1bmN0aW9uKCB2YWx1ZSwgZm9ybWF0LCBjdWx0dXJlU2VsZWN0b3IgKSB7XG5cdHZhciBjdWx0dXJlID0gdGhpcy5maW5kQ2xvc2VzdEN1bHR1cmUoIGN1bHR1cmVTZWxlY3RvciApO1xuXHRpZiAoIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSApIHtcblx0XHR2YWx1ZSA9IGZvcm1hdERhdGUoIHZhbHVlLCBmb3JtYXQsIGN1bHR1cmUgKTtcblx0fVxuXHRlbHNlIGlmICggdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiICkge1xuXHRcdHZhbHVlID0gZm9ybWF0TnVtYmVyKCB2YWx1ZSwgZm9ybWF0LCBjdWx0dXJlICk7XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcblxuR2xvYmFsaXplLmxvY2FsaXplID0gZnVuY3Rpb24oIGtleSwgY3VsdHVyZVNlbGVjdG9yICkge1xuXHRyZXR1cm4gdGhpcy5maW5kQ2xvc2VzdEN1bHR1cmUoIGN1bHR1cmVTZWxlY3RvciApLm1lc3NhZ2VzWyBrZXkgXSB8fFxuXHRcdHRoaXMuY3VsdHVyZXNbIFwiZGVmYXVsdFwiIF0ubWVzc2FnZXNbIGtleSBdO1xufTtcblxuR2xvYmFsaXplLnBhcnNlRGF0ZSA9IGZ1bmN0aW9uKCB2YWx1ZSwgZm9ybWF0cywgY3VsdHVyZSApIHtcblx0Y3VsdHVyZSA9IHRoaXMuZmluZENsb3Nlc3RDdWx0dXJlKCBjdWx0dXJlICk7XG5cblx0dmFyIGRhdGUsIHByb3AsIHBhdHRlcm5zO1xuXHRpZiAoIGZvcm1hdHMgKSB7XG5cdFx0aWYgKCB0eXBlb2YgZm9ybWF0cyA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdGZvcm1hdHMgPSBbIGZvcm1hdHMgXTtcblx0XHR9XG5cdFx0aWYgKCBmb3JtYXRzLmxlbmd0aCApIHtcblx0XHRcdGZvciAoIHZhciBpID0gMCwgbCA9IGZvcm1hdHMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0XHR2YXIgZm9ybWF0ID0gZm9ybWF0c1sgaSBdO1xuXHRcdFx0XHRpZiAoIGZvcm1hdCApIHtcblx0XHRcdFx0XHRkYXRlID0gcGFyc2VFeGFjdCggdmFsdWUsIGZvcm1hdCwgY3VsdHVyZSApO1xuXHRcdFx0XHRcdGlmICggZGF0ZSApIHtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRwYXR0ZXJucyA9IGN1bHR1cmUuY2FsZW5kYXIucGF0dGVybnM7XG5cdFx0Zm9yICggcHJvcCBpbiBwYXR0ZXJucyApIHtcblx0XHRcdGRhdGUgPSBwYXJzZUV4YWN0KCB2YWx1ZSwgcGF0dGVybnNbcHJvcF0sIGN1bHR1cmUgKTtcblx0XHRcdGlmICggZGF0ZSApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRhdGUgfHwgbnVsbDtcbn07XG5cbkdsb2JhbGl6ZS5wYXJzZUludCA9IGZ1bmN0aW9uKCB2YWx1ZSwgcmFkaXgsIGN1bHR1cmVTZWxlY3RvciApIHtcblx0cmV0dXJuIHRydW5jYXRlKCBHbG9iYWxpemUucGFyc2VGbG9hdCh2YWx1ZSwgcmFkaXgsIGN1bHR1cmVTZWxlY3RvcikgKTtcbn07XG5cbkdsb2JhbGl6ZS5wYXJzZUZsb2F0ID0gZnVuY3Rpb24oIHZhbHVlLCByYWRpeCwgY3VsdHVyZVNlbGVjdG9yICkge1xuXHQvLyByYWRpeCBhcmd1bWVudCBpcyBvcHRpb25hbFxuXHRpZiAoIHR5cGVvZiByYWRpeCAhPT0gXCJudW1iZXJcIiApIHtcblx0XHRjdWx0dXJlU2VsZWN0b3IgPSByYWRpeDtcblx0XHRyYWRpeCA9IDEwO1xuXHR9XG5cblx0dmFyIGN1bHR1cmUgPSB0aGlzLmZpbmRDbG9zZXN0Q3VsdHVyZSggY3VsdHVyZVNlbGVjdG9yICk7XG5cdHZhciByZXQgPSBOYU4sXG5cdFx0bmYgPSBjdWx0dXJlLm51bWJlckZvcm1hdDtcblxuXHRpZiAoIHZhbHVlLmluZGV4T2YoY3VsdHVyZS5udW1iZXJGb3JtYXQuY3VycmVuY3kuc3ltYm9sKSA+IC0xICkge1xuXHRcdC8vIHJlbW92ZSBjdXJyZW5jeSBzeW1ib2xcblx0XHR2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoIGN1bHR1cmUubnVtYmVyRm9ybWF0LmN1cnJlbmN5LnN5bWJvbCwgXCJcIiApO1xuXHRcdC8vIHJlcGxhY2UgZGVjaW1hbCBzZXBlcmF0b3Jcblx0XHR2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoIGN1bHR1cmUubnVtYmVyRm9ybWF0LmN1cnJlbmN5W1wiLlwiXSwgY3VsdHVyZS5udW1iZXJGb3JtYXRbXCIuXCJdICk7XG5cdH1cblxuXHQvL1JlbW92ZSBwZXJjZW50YWdlIGNoYXJhY3RlciBmcm9tIG51bWJlciBzdHJpbmcgYmVmb3JlIHBhcnNpbmdcblx0aWYgKCB2YWx1ZS5pbmRleE9mKGN1bHR1cmUubnVtYmVyRm9ybWF0LnBlcmNlbnQuc3ltYm9sKSA+IC0xKXtcblx0XHR2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoIGN1bHR1cmUubnVtYmVyRm9ybWF0LnBlcmNlbnQuc3ltYm9sLCBcIlwiICk7XG5cdH1cblxuXHQvLyByZW1vdmUgc3BhY2VzOiBsZWFkaW5nLCB0cmFpbGluZyBhbmQgYmV0d2VlbiAtIGFuZCBudW1iZXIuIFVzZWQgZm9yIG5lZ2F0aXZlIGN1cnJlbmN5IHB0LUJSXG5cdHZhbHVlID0gdmFsdWUucmVwbGFjZSggLyAvZywgXCJcIiApO1xuXG5cdC8vIGFsbG93IGluZmluaXR5IG9yIGhleGlkZWNpbWFsXG5cdGlmICggcmVnZXhJbmZpbml0eS50ZXN0KHZhbHVlKSApIHtcblx0XHRyZXQgPSBwYXJzZUZsb2F0KCB2YWx1ZSApO1xuXHR9XG5cdGVsc2UgaWYgKCAhcmFkaXggJiYgcmVnZXhIZXgudGVzdCh2YWx1ZSkgKSB7XG5cdFx0cmV0ID0gcGFyc2VJbnQoIHZhbHVlLCAxNiApO1xuXHR9XG5cdGVsc2Uge1xuXG5cdFx0Ly8gZGV0ZXJtaW5lIHNpZ24gYW5kIG51bWJlclxuXHRcdHZhciBzaWduSW5mbyA9IHBhcnNlTmVnYXRpdmVQYXR0ZXJuKCB2YWx1ZSwgbmYsIG5mLnBhdHRlcm5bMF0gKSxcblx0XHRcdHNpZ24gPSBzaWduSW5mb1sgMCBdLFxuXHRcdFx0bnVtID0gc2lnbkluZm9bIDEgXTtcblxuXHRcdC8vICM0NCAtIHRyeSBwYXJzaW5nIGFzIFwiKG4pXCJcblx0XHRpZiAoIHNpZ24gPT09IFwiXCIgJiYgbmYucGF0dGVyblswXSAhPT0gXCIobilcIiApIHtcblx0XHRcdHNpZ25JbmZvID0gcGFyc2VOZWdhdGl2ZVBhdHRlcm4oIHZhbHVlLCBuZiwgXCIobilcIiApO1xuXHRcdFx0c2lnbiA9IHNpZ25JbmZvWyAwIF07XG5cdFx0XHRudW0gPSBzaWduSW5mb1sgMSBdO1xuXHRcdH1cblxuXHRcdC8vIHRyeSBwYXJzaW5nIGFzIFwiLW5cIlxuXHRcdGlmICggc2lnbiA9PT0gXCJcIiAmJiBuZi5wYXR0ZXJuWzBdICE9PSBcIi1uXCIgKSB7XG5cdFx0XHRzaWduSW5mbyA9IHBhcnNlTmVnYXRpdmVQYXR0ZXJuKCB2YWx1ZSwgbmYsIFwiLW5cIiApO1xuXHRcdFx0c2lnbiA9IHNpZ25JbmZvWyAwIF07XG5cdFx0XHRudW0gPSBzaWduSW5mb1sgMSBdO1xuXHRcdH1cblxuXHRcdHNpZ24gPSBzaWduIHx8IFwiK1wiO1xuXG5cdFx0Ly8gZGV0ZXJtaW5lIGV4cG9uZW50IGFuZCBudW1iZXJcblx0XHR2YXIgZXhwb25lbnQsXG5cdFx0XHRpbnRBbmRGcmFjdGlvbixcblx0XHRcdGV4cG9uZW50UG9zID0gbnVtLmluZGV4T2YoIFwiZVwiICk7XG5cdFx0aWYgKCBleHBvbmVudFBvcyA8IDAgKSBleHBvbmVudFBvcyA9IG51bS5pbmRleE9mKCBcIkVcIiApO1xuXHRcdGlmICggZXhwb25lbnRQb3MgPCAwICkge1xuXHRcdFx0aW50QW5kRnJhY3Rpb24gPSBudW07XG5cdFx0XHRleHBvbmVudCA9IG51bGw7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aW50QW5kRnJhY3Rpb24gPSBudW0uc3Vic3RyKCAwLCBleHBvbmVudFBvcyApO1xuXHRcdFx0ZXhwb25lbnQgPSBudW0uc3Vic3RyKCBleHBvbmVudFBvcyArIDEgKTtcblx0XHR9XG5cdFx0Ly8gZGV0ZXJtaW5lIGRlY2ltYWwgcG9zaXRpb25cblx0XHR2YXIgaW50ZWdlcixcblx0XHRcdGZyYWN0aW9uLFxuXHRcdFx0ZGVjU2VwID0gbmZbIFwiLlwiIF0sXG5cdFx0XHRkZWNpbWFsUG9zID0gaW50QW5kRnJhY3Rpb24uaW5kZXhPZiggZGVjU2VwICk7XG5cdFx0aWYgKCBkZWNpbWFsUG9zIDwgMCApIHtcblx0XHRcdGludGVnZXIgPSBpbnRBbmRGcmFjdGlvbjtcblx0XHRcdGZyYWN0aW9uID0gbnVsbDtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpbnRlZ2VyID0gaW50QW5kRnJhY3Rpb24uc3Vic3RyKCAwLCBkZWNpbWFsUG9zICk7XG5cdFx0XHRmcmFjdGlvbiA9IGludEFuZEZyYWN0aW9uLnN1YnN0ciggZGVjaW1hbFBvcyArIGRlY1NlcC5sZW5ndGggKTtcblx0XHR9XG5cdFx0Ly8gaGFuZGxlIGdyb3VwcyAoZS5nLiAxLDAwMCwwMDApXG5cdFx0dmFyIGdyb3VwU2VwID0gbmZbIFwiLFwiIF07XG5cdFx0aW50ZWdlciA9IGludGVnZXIuc3BsaXQoIGdyb3VwU2VwICkuam9pbiggXCJcIiApO1xuXHRcdHZhciBhbHRHcm91cFNlcCA9IGdyb3VwU2VwLnJlcGxhY2UoIC9cXHUwMEEwL2csIFwiIFwiICk7XG5cdFx0aWYgKCBncm91cFNlcCAhPT0gYWx0R3JvdXBTZXAgKSB7XG5cdFx0XHRpbnRlZ2VyID0gaW50ZWdlci5zcGxpdCggYWx0R3JvdXBTZXAgKS5qb2luKCBcIlwiICk7XG5cdFx0fVxuXHRcdC8vIGJ1aWxkIGEgbmF0aXZlbHkgcGFyc2FibGUgbnVtYmVyIHN0cmluZ1xuXHRcdHZhciBwID0gc2lnbiArIGludGVnZXI7XG5cdFx0aWYgKCBmcmFjdGlvbiAhPT0gbnVsbCApIHtcblx0XHRcdHAgKz0gXCIuXCIgKyBmcmFjdGlvbjtcblx0XHR9XG5cdFx0aWYgKCBleHBvbmVudCAhPT0gbnVsbCApIHtcblx0XHRcdC8vIGV4cG9uZW50IGl0c2VsZiBtYXkgaGF2ZSBhIG51bWJlciBwYXR0ZXJuZFxuXHRcdFx0dmFyIGV4cFNpZ25JbmZvID0gcGFyc2VOZWdhdGl2ZVBhdHRlcm4oIGV4cG9uZW50LCBuZiwgXCItblwiICk7XG5cdFx0XHRwICs9IFwiZVwiICsgKCBleHBTaWduSW5mb1swXSB8fCBcIitcIiApICsgZXhwU2lnbkluZm9bIDEgXTtcblx0XHR9XG5cdFx0aWYgKCByZWdleFBhcnNlRmxvYXQudGVzdChwKSApIHtcblx0XHRcdHJldCA9IHBhcnNlRmxvYXQoIHAgKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJldDtcbn07XG5cbkdsb2JhbGl6ZS5jdWx0dXJlID0gZnVuY3Rpb24oIGN1bHR1cmVTZWxlY3RvciApIHtcblx0Ly8gc2V0dGVyXG5cdGlmICggdHlwZW9mIGN1bHR1cmVTZWxlY3RvciAhPT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHR0aGlzLmN1bHR1cmVTZWxlY3RvciA9IGN1bHR1cmVTZWxlY3Rvcjtcblx0fVxuXHQvLyBnZXR0ZXJcblx0cmV0dXJuIHRoaXMuZmluZENsb3Nlc3RDdWx0dXJlKCBjdWx0dXJlU2VsZWN0b3IgKSB8fCB0aGlzLmN1bHR1cmVzWyBcImRlZmF1bHRcIiBdO1xufTtcblxufSggdGhpcyApKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2dsb2JhbGl6ZS9saWIvZ2xvYmFsaXplLmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIGNuID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHsgY2xhc3NOYW1lLCBjaGlsZHJlbiwgLi4ucHJvcHN9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8YnV0dG9uIHsuLi5wcm9wc30gdHlwZT0nYnV0dG9uJyBjbGFzc05hbWU9e2NuKGNsYXNzTmFtZSwgJ3J3LWJ0bicpfT5cclxuICAgICAgICB7IGNoaWxkcmVuIH1cclxuICAgICAgPC9idXR0b24+XHJcbiAgICApXHJcbiAgfVxyXG59KVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL1dpZGdldEJ1dHRvbi5qc3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBfID0gcmVxdWlyZSgnLi4vdXRpbC9fJyk7XHJcblxyXG4vL2JhY2twb3J0IFB1cmVSZW5kZXJFcXVhbFxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xyXG4gICAgcmV0dXJuICFfLmlzU2hhbGxvd0VxdWFsKHRoaXMucHJvcHMsIG5leHRQcm9wcykgfHxcclxuICAgICAgICAgICAhXy5pc1NoYWxsb3dFcXVhbCh0aGlzLnN0YXRlLCBuZXh0U3RhdGUpO1xyXG4gIH1cclxufVxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvbWl4aW5zL1B1cmVSZW5kZXJNaXhpbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgXHJcbiAgY29udGV4dFR5cGVzOiB7XHJcbiAgICBpc1J0bDogUmVhY3QuUHJvcFR5cGVzLmJvb2xcclxuICB9LFxyXG5cclxuICBpc1J0bDogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gISF0aGlzLmNvbnRleHQuaXNSdGxcclxuICB9XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvbWl4aW5zL1J0bENoaWxkQ29udGV4dE1peGluLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXHJcbiAgLCBfID0gIHJlcXVpcmUoJy4uL3V0aWwvXycpOyAvL3VuaXF1ZUlEXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgcHJvcFR5cGVzOiB7XHJcblxyXG4gICAgZGlzYWJsZWQ6ICAgICAgIFJlYWN0LlByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnZGlzYWJsZWQnXSlcclxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxyXG5cclxuICAgIHJlYWRPbmx5OiAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsncmVhZE9ubHknXSlcclxuICAgICAgICAgICAgICAgICAgICBdKSxcclxuICB9LFxyXG5cclxuICBpc0Rpc2FibGVkOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuZGlzYWJsZWQgPT09IHRydWUgfHwgdGhpcy5wcm9wcy5kaXNhYmxlZCA9PT0gJ2Rpc2FibGVkJ1xyXG4gIH0sXHJcblxyXG4gIGlzUmVhZE9ubHk6IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5yZWFkT25seSA9PT0gdHJ1ZVxyXG4gICAgICB8fCB0aGlzLnByb3BzLnJlYWRPbmx5ID09PSAncmVhZG9ubHknXHJcbiAgfSxcclxuXHJcbiAgbm90aWZ5OiBmdW5jdGlvbihoYW5kbGVyLCBhcmdzKXtcclxuICAgIHRoaXMucHJvcHNbaGFuZGxlcl1cclxuICAgICAgJiYgdGhpcy5wcm9wc1toYW5kbGVyXS5hcHBseShudWxsLCBbXS5jb25jYXQoYXJncykpXHJcbiAgfSxcclxuXHJcbiAgX2lkOiBmdW5jdGlvbihzdWZmaXgpe1xyXG4gICAgdGhpcy5faWRfIHx8ICh0aGlzLl9pZF8gPSBfLnVuaXF1ZUlkKCdyd18nKSlcclxuICAgIHJldHVybiAodGhpcy5wcm9wcy5pZCB8fCB0aGlzLl9pZF8pICArIHN1ZmZpeFxyXG4gIH0sXHJcblxyXG4gIF9tYXliZUhhbmRsZTogZnVuY3Rpb24oaGFuZGxlciwgZGlzYWJsZWRPbmx5KXtcclxuICAgIGlmICggISh0aGlzLmlzRGlzYWJsZWQoKSB8fCAoIWRpc2FibGVkT25seSAmJiB0aGlzLmlzUmVhZE9ubHkoKSkpIClcclxuICAgICAgcmV0dXJuIGhhbmRsZXJcclxuICAgIHJldHVybiBmdW5jdGlvbigpe31cclxuICB9LFxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvbWl4aW5zL1dpZGdldE1peGluLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXHJcbiAgLCBkYXRlcyA9IHJlcXVpcmUoJy4uL3V0aWwvZGF0ZXMnKVxyXG4gICwgZGlyZWN0aW9ucyA9IHJlcXVpcmUoJy4uL3V0aWwvY29uc3RhbnRzJykuZGlyZWN0aW9ucztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmlld1VuaXQsIHNtYWxsVW5pdCl7XHJcblxyXG4gIHJldHVybiB7IFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgIHZhbHVlOiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXHJcbiAgICAgIG1pbjogICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXHJcbiAgICAgIG1heDogICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXHJcbiAgICB9LFxyXG5cclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBmb2N1c2VkRGF0ZTogICBjb25zdHJhaW5WYWx1ZSh0aGlzLnByb3BzLnZhbHVlLCB0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgIHZhciBmb2N1c2VkID0gdGhpcy5zdGF0ZS5mb2N1c2VkRGF0ZVxyXG5cclxuICAgICAgLy8hZGF0ZXMuaW5SYW5nZShmb2N1c2VkLCBuZXh0UHJvcHMubWluLCBuZXh0UHJvcHMubWF4KVxyXG5cclxuICAgICAgaWYgKCAhZGF0ZXMuZXEobmV4dFByb3BzLnZhbHVlLCBmb2N1c2VkLCBzbWFsbFVuaXQpICkgXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBmb2N1c2VkRGF0ZTogbmV4dFByb3BzLnZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgX2tleURvd246IGZ1bmN0aW9uKGUpe1xyXG4gICAgICB2YXIga2V5ID0gZS5rZXlcclxuICAgICAgICAsIGN1cnJlbnQgPSB0aGlzLnN0YXRlLmZvY3VzZWREYXRlXHJcbiAgICAgICAgLCBkYXRlID0gY3VycmVudDtcclxuXHJcbiAgICAgIGlmICgga2V5ID09PSAnRW50ZXInKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNoYW5nZShkYXRlKVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBpZiAoIGtleSA9PT0gJ0Fycm93TGVmdCcpXHJcbiAgICAgICAgZGF0ZSA9IHRoaXMubW92ZShkYXRlLCBkaXJlY3Rpb25zLkxFRlQpXHJcblxyXG4gICAgICBlbHNlIGlmICgga2V5ID09PSAnQXJyb3dSaWdodCcpXHJcbiAgICAgICAgZGF0ZSA9IHRoaXMubW92ZShkYXRlLCBkaXJlY3Rpb25zLlJJR0hUKVxyXG5cclxuICAgICAgZWxzZSBpZiAoIGtleSA9PT0gJ0Fycm93VXAnKVxyXG4gICAgICAgIGRhdGUgPSB0aGlzLm1vdmUoZGF0ZSwgZGlyZWN0aW9ucy5VUClcclxuXHJcbiAgICAgIGVsc2UgaWYgKCBrZXkgPT09ICdBcnJvd0Rvd24nKVxyXG4gICAgICAgIGRhdGUgPSB0aGlzLm1vdmUoZGF0ZSwgZGlyZWN0aW9ucy5ET1dOKVxyXG5cclxuXHJcbiAgICAgIGlmICggIWRhdGVzLmVxKGN1cnJlbnQsIGRhdGUsIHNtYWxsVW5pdCkgKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcblxyXG4gICAgICAgIGlmICggZGF0ZXMuZ3QoZGF0ZSwgdGhpcy5wcm9wcy52YWx1ZSwgdmlld1VuaXQpIClcclxuICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uTW92ZVJpZ2h0KGRhdGUpXHJcblxyXG4gICAgICAgIGlmICggZGF0ZXMubHQoZGF0ZSwgdGhpcy5wcm9wcy52YWx1ZSwgdmlld1VuaXQpIClcclxuICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm9uTW92ZUxlZnQoZGF0ZSlcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBmb2N1c2VkRGF0ZTogZGF0ZVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBjb25zdHJhaW5WYWx1ZSh2YWx1ZSwgbWluLCBtYXgpe1xyXG4gIGlmKCB2YWx1ZSA9PSBudWxsKSByZXR1cm4gdmFsdWVcclxuICByZXR1cm4gZGF0ZXMubWF4KGRhdGVzLm1pbih2YWx1ZSwgbWF4KSwgbWluKVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvbWl4aW5zL0RhdGVGb2N1c01peGluLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXHJcbiAgLCB2ZXJzaW9uID0gUmVhY3QudmVyc2lvbi5zcGxpdCgnLicpLm1hcChwYXJzZUZsb2F0KTtcclxuXHJcblxyXG52YXIgY29tcGF0ID0gbW9kdWxlLmV4cG9ydHMgPSB7XHJcblxyXG4gIHZlcnNpb246IGZ1bmN0aW9uKCl7XHJcbiAgICByZXR1cm4gdmVyc2lvbjtcclxuICB9LFxyXG5cclxuICBwcm9wVHlwZTogZnVuY3Rpb24oZm4pIHtcclxuXHJcbiAgICByZXR1cm4gZnVuY3Rpb24gdmFsaWRhdG9yKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24pe1xyXG4gICAgICB2YXIgZXJyID0gZm4uY2FsbCh0aGlzLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uKVxyXG5cclxuICAgICAgaWYgKCBlcnIgJiYgZXJyICE9PSB0cnVlICkgXHJcbiAgICAgICAgcmV0dXJuIGVyclxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIHR5cGU6IGZ1bmN0aW9uKGNvbXBvbmVudCl7XHJcbiAgICBpZiggdmVyc2lvblswXSA9PT0gMCAmJiB2ZXJzaW9uWzFdID49IDEzKVxyXG4gICAgICByZXR1cm4gY29tcG9uZW50XHJcblxyXG4gICAgcmV0dXJuIGNvbXBvbmVudC50eXBlXHJcbiAgfVxyXG59XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2NvbXBhdC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ICAgPSByZXF1aXJlKCdyZWFjdCcpXHJcbiAgLCBSZXBsYWNlVHJhbnNpdGlvbkdyb3VwICA9IHJlcXVpcmUoJy4vUmVwbGFjZVRyYW5zaXRpb25Hcm91cCcpXHJcbiAgLCBfID0gcmVxdWlyZSgnLi91dGlsL18nKVxyXG4gICwgJCA9IHJlcXVpcmUoJy4vdXRpbC9kb20nKTtcclxuXHJcblxyXG52YXIgU2xpZGVDaGlsZEdyb3VwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGRpcmVjdGlvbjogUmVhY3QuUHJvcFR5cGVzLm9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcclxuICAgIGR1cmF0aW9uOiAgUmVhY3QuUHJvcFR5cGVzLm51bWJlclxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxFbnRlcjogZnVuY3Rpb24oZG9uZSkge1xyXG4gICAgdmFyIG5vZGUgID0gdGhpcy5nZXRET01Ob2RlKClcclxuICAgICAgLCB3aWR0aCA9ICQud2lkdGgobm9kZSlcclxuICAgICAgLCBkaXJlY3Rpb24gPSB0aGlzLnByb3BzLmRpcmVjdGlvbjtcclxuXHJcbiAgICB3aWR0aCA9IGRpcmVjdGlvbiA9PT0gJ2xlZnQnID8gd2lkdGggOiAtd2lkdGhcclxuXHJcbiAgICB0aGlzLk9SR0lOQUxfUE9TSVRJT04gPSBub2RlLnN0eWxlLnBvc2l0aW9uO1xyXG4gICAgXHJcbiAgICAkLmNzcyhub2RlLCB7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiB3aWR0aCArICdweCcgLCB0b3A6IDAgfSlcclxuXHJcbiAgICAkLmFuaW1hdGUobm9kZSwgeyBsZWZ0OiAwIH0sIHRoaXMucHJvcHMuZHVyYXRpb24sICgpID0+IHtcclxuXHJcbiAgICAgICAgJC5jc3Mobm9kZSwgeyBcclxuICAgICAgICAgIHBvc2l0aW9uOiAgdGhpcy5PUkdJTkFMX1BPU0lUSU9OLCBcclxuICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLk9SR0lOQUxfUE9TSVRJT04gPSBudWxsXHJcbiAgICAgICAgZG9uZSAmJiBkb25lKClcclxuICAgICAgfSlcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRXaWxsTGVhdmU6IGZ1bmN0aW9uKGRvbmUpIHtcclxuICAgIHZhciBub2RlICA9IHRoaXMuZ2V0RE9NTm9kZSgpXHJcbiAgICAgICwgd2lkdGggPSAkLndpZHRoKG5vZGUpXHJcbiAgICAgICwgZGlyZWN0aW9uID0gdGhpcy5wcm9wcy5kaXJlY3Rpb247XHJcblxyXG4gICAgd2lkdGggPSBkaXJlY3Rpb24gPT09ICdsZWZ0JyA/IC13aWR0aCA6IHdpZHRoXHJcblxyXG4gICAgdGhpcy5PUkdJTkFMX1BPU0lUSU9OID0gbm9kZS5zdHlsZS5wb3NpdGlvblxyXG5cclxuICAgICQuY3NzKG5vZGUsIHsgcG9zaXRpb246ICdhYnNvbHV0ZScsIHRvcDogMCwgbGVmdDogMH0pXHJcblxyXG4gICAgJC5hbmltYXRlKG5vZGUsIHsgbGVmdDogd2lkdGggKyAncHgnIH0sIHRoaXMucHJvcHMuZHVyYXRpb24sICgpID0+IHtcclxuICAgICAgICAkLmNzcyhub2RlLCB7IFxyXG4gICAgICAgICAgcG9zaXRpb246IHRoaXMuT1JHSU5BTF9QT1NJVElPTiwgXHJcbiAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5PUkdJTkFMX1BPU0lUSU9OID0gbnVsbFxyXG4gICAgICAgIGRvbmUgJiYgZG9uZSgpXHJcbiAgICAgIH0pXHJcbiAgfSxcclxuXHJcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xyXG4gIH1cclxuXHJcbn0pXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgZGlyZWN0aW9uOiBSZWFjdC5Qcm9wVHlwZXMub25lT2YoWydsZWZ0JywgJ3JpZ2h0J10pLFxyXG4gICAgZHVyYXRpb246ICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyXHJcbiAgfSxcclxuXHJcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZGlyZWN0aW9uOiAnbGVmdCcsXHJcbiAgICAgIGR1cmF0aW9uOiAyNTBcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBfd3JhcENoaWxkOiBmdW5jdGlvbihjaGlsZCwgcmVmKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8U2xpZGVDaGlsZEdyb3VwIGtleT17Y2hpbGQua2V5fSByZWY9e3JlZn0gXHJcbiAgICAgICAgZGlyZWN0aW9uPXt0aGlzLnByb3BzLmRpcmVjdGlvbn0gXHJcbiAgICAgICAgZHVyYXRpb249e3RoaXMucHJvcHMuZHVyYXRpb259PlxyXG4gICAgICAgIHtjaGlsZH1cclxuICAgICAgPC9TbGlkZUNoaWxkR3JvdXA+KVxyXG4gIH0sXHJcblxyXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgeyBzdHlsZSwgY2hpbGRyZW4sIC4uLnByb3BzIH0gPSB0aGlzLnByb3BzXHJcblxyXG4gICAgc3R5bGUgPSBfLmFzc2lnbih7fSwgc3R5bGUsIHsgcG9zaXRpb246ICdyZWxhdGl2ZScsIG92ZXJmbG93OiAnaGlkZGVuJyB9KVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxSZXBsYWNlVHJhbnNpdGlvbkdyb3VwIFxyXG4gICAgICAgIHsuLi5wcm9wc31cclxuICAgICAgICByZWY9J2NvbnRhaW5lcicgXHJcbiAgICAgICAgY2hpbGRGYWN0b3J5PXt0aGlzLl93cmFwQ2hpbGR9XHJcbiAgICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgIGNvbXBvbmVudD17J2Rpdid9PlxyXG4gICAgICAgIHsgY2hpbGRyZW4gfVxyXG4gICAgICA8L1JlcGxhY2VUcmFuc2l0aW9uR3JvdXA+KVxyXG4gIH0sXHJcblxyXG4gIGlzVHJhbnNpdGlvbmluZzogZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiB0aGlzLmlzTW91bnRlZCgpICYmIHRoaXMucmVmcy5jb250YWluZXIuaXNUcmFuc2l0aW9uaW5nKClcclxuICB9XHJcbn0pO1xyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvU2xpZGVUcmFuc2l0aW9uLmpzeFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIHsgaGFzIH0gPSByZXF1aXJlKCcuLi91dGlsL18nKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICB2YXIgdGltZXJzID0gdGhpcy5fdGltZXJzIHx8IHt9O1xyXG5cclxuICAgIGZvciAodmFyIGsgaW4gdGltZXJzKSBpZiAoIGhhcyh0aW1lcnMsIGspICkgXHJcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcnNba10pXHJcbiAgfSxcclxuXHJcbiAgc2V0VGltZW91dChrZXksIGNiLCBkdXJhdGlvbil7XHJcbiAgICB2YXIgdGltZXJzID0gdGhpcy5fdGltZXJzIHx8ICh0aGlzLl90aW1lcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpKTtcclxuXHJcbiAgICBjbGVhclRpbWVvdXQodGltZXJzW2tleV0pXHJcbiAgICB0aW1lcnNba2V5XSA9IHNldFRpbWVvdXQoY2IsIGR1cmF0aW9uKVxyXG4gIH1cclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9taXhpbnMvVGltZW91dE1peGluLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBcclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGlzUnRsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxyXG4gIH0sXHJcblxyXG4gIGNvbnRleHRUeXBlczoge1xyXG4gICAgaXNSdGw6IFJlYWN0LlByb3BUeXBlcy5ib29sXHJcbiAgfSxcclxuXHJcbiAgY2hpbGRDb250ZXh0VHlwZXM6IHtcclxuICAgIGlzUnRsOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbFxyXG4gIH0sXHJcblxyXG4gIGdldENoaWxkQ29udGV4dDogZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4geyBcclxuICAgICAgaXNSdGw6IHRoaXMucHJvcHMuaXNSdGwgfHwgKHRoaXMuY29udGV4dCAmJiB0aGlzLmNvbnRleHQuaXNSdGwpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgaXNSdGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuICEhKHRoaXMucHJvcHMuaXNSdGwgfHwgKHRoaXMuY29udGV4dCAmJiB0aGlzLmNvbnRleHQuaXNSdGwpKVxyXG4gIH1cclxuXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9taXhpbnMvUnRsUGFyZW50Q29udGV4dE1peGluLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXHJcbiAgLCBkYXRlcyA9IHJlcXVpcmUoJy4vdXRpbC9kYXRlcycpXHJcbiAgLCBMaXN0ID0gcmVxdWlyZSgnLi9MaXN0JylcclxuICAsIEN1c3RvbVByb3BUeXBlcyAgPSByZXF1aXJlKCcuL3V0aWwvcHJvcFR5cGVzJylcclxuICAsIF8gPSByZXF1aXJlKCcuL3V0aWwvXycpIC8vIG9taXRcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcbiAgZGlzcGxheU5hbWU6ICdUaW1lTGlzdCcsXHJcblxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgdmFsdWU6ICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxyXG4gICAgbWluOiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxyXG4gICAgbWF4OiAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5pbnN0YW5jZU9mKERhdGUpLFxyXG4gICAgc3RlcDogICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcbiAgICBpdGVtQ29tcG9uZW50OiAgQ3VzdG9tUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxyXG4gICAgb25TZWxlY3Q6ICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgcHJlc2VydmVEYXRlOiAgIFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgY3VsdHVyZTogICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgfSxcclxuXHJcbiAgbWl4aW5zOiBbXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9UaW1lb3V0TWl4aW4nKVxyXG4gIF0sXHJcblxyXG4gIGdldERlZmF1bHRQcm9wcygpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RlcDogICAzMCxcclxuICAgICAgZm9ybWF0OiAndCcsXHJcbiAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbigpe30sXHJcbiAgICAgIHByZXNlcnZlRGF0ZTogdHJ1ZSxcclxuICAgICAgZGVsYXk6IDMwMFxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGdldEluaXRpYWxTdGF0ZSgpe1xyXG4gICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRlcyh0aGlzLnByb3BzKVxyXG4gICAgICAsIGZvY3VzZWRJdGVtID0gdGhpcy5fY2xvc2VzdERhdGUoZGF0YSwgdGhpcy5wcm9wcy52YWx1ZSk7XHJcblxyXG4gICAgcmV0dXJuIHsgXHJcbiAgICAgIGZvY3VzZWRJdGVtOiBmb2N1c2VkSXRlbSB8fCBkYXRhWzBdLFxyXG4gICAgICBkYXRlczogZGF0YVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XHJcbiAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGVzKG5leHRQcm9wcylcclxuICAgICAgLCBmb2N1c2VkSXRlbSA9IHRoaXMuX2Nsb3Nlc3REYXRlKGRhdGEsIHRoaXMucHJvcHMudmFsdWUpO1xyXG5cclxuICAgIGlmICggbmV4dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLnZhbHVlKVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgXHJcbiAgICAgICAgZm9jdXNlZEl0ZW06IGZvY3VzZWRJdGVtIHx8IGRhdGFbMF0sXHJcbiAgICAgICAgZGF0ZXM6IGRhdGFcclxuICAgICAgfSlcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdGltZXMgPSB0aGlzLnN0YXRlLmRhdGVzXHJcbiAgICAgICwgZGF0ZSAgPSB0aGlzLl9jbG9zZXN0RGF0ZSh0aW1lcywgdGhpcy5wcm9wcy52YWx1ZSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPExpc3Qgey4uLl8ub21pdCh0aGlzLnByb3BzLCAndmFsdWUnKX1cclxuICAgICAgICByZWY9XCJsaXN0XCJcclxuICAgICAgICBkYXRhPXt0aW1lc31cclxuICAgICAgICB0ZXh0RmllbGQ9J2xhYmVsJ1xyXG4gICAgICAgIHZhbHVlRmllbGQ9J2RhdGUnXHJcbiAgICAgICAgc2VsZWN0ZWQ9e2RhdGV9XHJcbiAgICAgICAgZm9jdXNlZD17dGhpcy5zdGF0ZS5mb2N1c2VkSXRlbX1cclxuICAgICAgICBpdGVtQ29tcG9uZW50PXt0aGlzLnByb3BzLml0ZW1Db21wb25lbnR9XHJcbiAgICAgICAgb25TZWxlY3Q9e3RoaXMucHJvcHMub25TZWxlY3R9Lz5cclxuICAgIClcclxuICB9LFxyXG5cclxuICBfY2xvc2VzdERhdGU6IGZ1bmN0aW9uKHRpbWVzLCBkYXRlKXtcclxuICAgIHZhciByb3VuZFRvID0gMTAwMCAqIDYwICogdGhpcy5wcm9wcy5zdGVwXHJcbiAgICAgICwgaW5zdCA9IG51bGxcclxuICAgICAgLCBsYWJlbDtcclxuXHJcbiAgICBpZiggIWRhdGUpIHJldHVybiBudWxsXHJcblxyXG4gICAgZGF0ZSAgPSBuZXcgRGF0ZShNYXRoLmZsb29yKGRhdGUuZ2V0VGltZSgpIC8gcm91bmRUbykgKiByb3VuZFRvKVxyXG4gICAgbGFiZWwgPSBkYXRlcy5mb3JtYXQoZGF0ZSwgdGhpcy5wcm9wcy5mb3JtYXQsIHRoaXMucHJvcHMuY3VsdHVyZSlcclxuXHJcbiAgICB0aW1lcy5zb21lKCB0aW1lID0+IHtcclxuICAgICAgaWYoIHRpbWUubGFiZWwgPT09IGxhYmVsICkgXHJcbiAgICAgICAgcmV0dXJuIChpbnN0ID0gdGltZSlcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIGluc3RcclxuICB9LFxyXG5cclxuICBfZGF0YSgpeyBcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLmRhdGVzXHJcbiAgfSxcclxuXHJcbiAgX2RhdGVzOiBmdW5jdGlvbihwcm9wcyl7XHJcbiAgICB2YXIgdGltZXMgID0gW10sIGkgPSAwXHJcbiAgICAgICwgdmFsdWVzID0gdGhpcy5fZGF0ZVZhbHVlcyhwcm9wcylcclxuICAgICAgLCBzdGFydCAgPSB2YWx1ZXMubWluXHJcbiAgICAgICwgc3RhcnREYXkgPSBkYXRlcy5kYXRlKHN0YXJ0KTtcclxuXHJcbiAgICAvLyBkZWJ1Z2dlcjtcclxuICAgIHdoaWxlKCBpIDwgMTAwICYmIChkYXRlcy5kYXRlKHN0YXJ0KSA9PT0gc3RhcnREYXkgJiYgZGF0ZXMubHRlKHN0YXJ0LCB2YWx1ZXMubWF4KSApICkge1xyXG4gICAgICBpKytcclxuICAgICAgdGltZXMucHVzaCh7IGRhdGU6IHN0YXJ0LCBsYWJlbDogZGF0ZXMuZm9ybWF0KHN0YXJ0LCBwcm9wcy5mb3JtYXQsIHByb3BzLmN1bHR1cmUpIH0pXHJcbiAgICAgIHN0YXJ0ID0gZGF0ZXMuYWRkKHN0YXJ0LCBwcm9wcy5zdGVwIHx8IDMwLCAnbWludXRlcycpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGltZXNcclxuICB9LFxyXG5cclxuICBfZGF0ZVZhbHVlczogZnVuY3Rpb24ocHJvcHMpe1xyXG4gICAgdmFyIHZhbHVlID0gcHJvcHMudmFsdWUgfHwgZGF0ZXMudG9kYXkoKVxyXG4gICAgICAsIHVzZURhdGUgPSBwcm9wcy5wcmVzZXJ2ZURhdGVcclxuICAgICAgLCBtaW4gPSBwcm9wcy5taW5cclxuICAgICAgLCBtYXggPSBwcm9wcy5tYXhcclxuICAgICAgLCBzdGFydCwgZW5kO1xyXG5cclxuICAgIC8vY29tcGFyZSBqdXN0IHRoZSB0aW1lIHJlZ3JhZGxlc3Mgb2Ygd2hldGhlciB0aGV5IGZhbGwgb24gdGhlIHNhbWUgZGF5XHJcbiAgICBpZighdXNlRGF0ZSkge1xyXG4gICAgICBzdGFydCA9IGRhdGVzLnN0YXJ0T2YoZGF0ZXMubWVyZ2UobmV3IERhdGUsIG1pbiksICdtaW51dGVzJylcclxuICAgICAgZW5kICAgPSBkYXRlcy5zdGFydE9mKGRhdGVzLm1lcmdlKG5ldyBEYXRlLCBtYXgpLCAnbWludXRlcycpXHJcblxyXG4gICAgICBpZiggZGF0ZXMubHRlKGVuZCwgc3RhcnQpICYmIGRhdGVzLmd0KG1heCwgbWluLCAnZGF5JykpXHJcbiAgICAgICAgZW5kID0gZGF0ZXMudG9tb3Jyb3coKVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBtaW46IHN0YXJ0LFxyXG4gICAgICAgIG1heDogZW5kXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL2RhdGUgcGFydHMgYXJlIGVxdWFsXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtaW46IGRhdGVzLmVxKHZhbHVlLCBtaW4sICdkYXknKSA/IG1pbiA6IGRhdGVzLnRvZGF5KCksXHJcbiAgICAgIG1heDogZGF0ZXMuZXEodmFsdWUsIG1heCwgJ2RheScpID8gbWluIDogZGF0ZXMudG9tb3Jyb3coKVxyXG4gICAgfVxyXG5cclxuICB9LFxyXG5cclxuICBfa2V5RG93bjogZnVuY3Rpb24oZSl7XHJcbiAgICB2YXIga2V5ID0gZS5rZXlcclxuICAgICAgLCBjaGFyYWN0ZXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSlcclxuICAgICAgLCBmb2N1c2VkSXRlbSAgPSB0aGlzLnN0YXRlLmZvY3VzZWRJdGVtXHJcbiAgICAgICwgbGlzdCA9IHRoaXMucmVmcy5saXN0O1xyXG5cclxuICAgIGlmICgga2V5ID09PSAnRW5kJyApXHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBmb2N1c2VkSXRlbTogbGlzdC5sYXN0KCkgfSlcclxuXHJcbiAgICBlbHNlIGlmICgga2V5ID09PSAnSG9tZScgKVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZEl0ZW06IGxpc3QuZmlyc3QoKSB9KVxyXG5cclxuICAgIGVsc2UgaWYgKCBrZXkgPT09ICdFbnRlcicgKVxyXG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGZvY3VzZWRJdGVtKVxyXG5cclxuICAgIGVsc2UgaWYgKCBrZXkgPT09ICdBcnJvd0Rvd24nICkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWRJdGVtOiBsaXN0Lm5leHQoZm9jdXNlZEl0ZW0pIH0pXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICgga2V5ID09PSAnQXJyb3dVcCcgKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgZm9jdXNlZEl0ZW06IGxpc3QucHJldihmb2N1c2VkSXRlbSkgfSlcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuXHJcbiAgICAgIHRoaXMuc2VhcmNoKGNoYXJhY3RlciwgaXRlbSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGZvY3VzZWRJdGVtOiBpdGVtIH0pXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgc2VhcmNoOiBmdW5jdGlvbihjaGFyYWN0ZXIsIGNiKXtcclxuICAgIHZhciB3b3JkID0gKCh0aGlzLl9zZWFyY2hUZXJtIHx8ICcnKSArIGNoYXJhY3RlcikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgXHJcbiAgICB0aGlzLl9zZWFyY2hUZXJtID0gd29yZCBcclxuXHJcbiAgICB0aGlzLnNldFRpbWVvdXQoJ3NlYXJjaCcsICgpID0+IHtcclxuICAgICAgdmFyIGxpc3QgPSB0aGlzLnJlZnMubGlzdFxyXG4gICAgICAgICwgaXRlbSA9IGxpc3QubmV4dCh0aGlzLnN0YXRlLmZvY3VzZWRJdGVtLCB3b3JkKTtcclxuICAgICAgXHJcbiAgICAgIHRoaXMuX3NlYXJjaFRlcm0gPSAnJ1xyXG4gICAgICBpZiAoaXRlbSkgY2IoaXRlbSlcclxuXHJcbiAgICB9LCB0aGlzLnByb3BzLmRlbGF5KVxyXG4gIH0sXHJcblxyXG59KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvVGltZUxpc3QuanN4XG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXHJcbiAgLCBjeCA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKVxyXG4gICwgZGF0ZXMgPSByZXF1aXJlKCcuL3V0aWwvZGF0ZXMnKVxyXG4gICwgQ3VzdG9tUHJvcFR5cGVzID0gcmVxdWlyZSgnLi91dGlsL3Byb3BUeXBlcycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGRpc3BsYXlOYW1lOiAnRGF0ZVBpY2tlcklucHV0JyxcclxuXHJcblxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgZm9ybWF0OiAgICAgICBDdXN0b21Qcm9wVHlwZXMubG9jYWxlRm9ybWF0LFxyXG4gICAgcGFyc2U6ICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG5cclxuICAgIHZhbHVlOiAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmluc3RhbmNlT2YoRGF0ZSksXHJcbiAgICBvbkNoYW5nZTogICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBjdWx0dXJlOiAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgfSxcclxuXHJcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGV4dFZhbHVlOiAnJ1xyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgIHRleHRWYWx1ZTogZm9ybWF0RGF0ZShcclxuICAgICAgICAgICAgbmV4dFByb3BzLnZhbHVlXHJcbiAgICAgICAgICAsIG5leHRQcm9wcy5lZGl0aW5nICYmIG5leHRQcm9wcy5lZGl0Rm9ybWF0IFxyXG4gICAgICAgICAgICAgID8gbmV4dFByb3BzLmVkaXRGb3JtYXQgXHJcbiAgICAgICAgICAgICAgOiBuZXh0UHJvcHMuZm9ybWF0XHJcbiAgICAgICAgICAsIG5leHRQcm9wcy5jdWx0dXJlKVxyXG4gICAgfSlcclxuICB9LFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdGV4dCA9IGZvcm1hdERhdGUoXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMudmFsdWVcclxuICAgICAgICAgICwgdGhpcy5wcm9wcy5lZGl0aW5nICYmIHRoaXMucHJvcHMuZWRpdEZvcm1hdCBcclxuICAgICAgICAgICAgICA/IHRoaXMucHJvcHMuZWRpdEZvcm1hdCBcclxuICAgICAgICAgICAgICA6IHRoaXMucHJvcHMuZm9ybWF0XHJcbiAgICAgICAgICAsIHRoaXMucHJvcHMuY3VsdHVyZSlcclxuXHJcbiAgICB0aGlzLmxhc3RWYWx1ZSA9IHRleHRcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZXh0VmFsdWU6IHRleHRcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnN0YXRlLnRleHRWYWx1ZVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxpbnB1dCBcclxuICAgICAgICB7Li4udGhpcy5wcm9wc31cclxuICAgICAgICB0eXBlPSd0ZXh0JyBcclxuICAgICAgICBjbGFzc05hbWU9e2N4KHsncnctaW5wdXQnOiB0cnVlIH0pfSBcclxuICAgICAgICB2YWx1ZT17dmFsdWV9IFxyXG4gICAgICAgIGFyaWEtZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9XHJcbiAgICAgICAgYXJpYS1yZWFkb25seT17dGhpcy5wcm9wcy5yZWFkT25seX1cclxuICAgICAgICBkaXNhYmxlZD17dGhpcy5wcm9wcy5kaXNhYmxlZH1cclxuICAgICAgICByZWFkT25seT17dGhpcy5wcm9wcy5yZWFkT25seX1cclxuICAgICAgICBvbkNoYW5nZT17dGhpcy5fY2hhbmdlfSBcclxuICAgICAgICBvbkJsdXI9e2NoYWluKHRoaXMucHJvcHMuYmx1ciwgdGhpcy5fYmx1ciwgdGhpcyl9IC8+XHJcbiAgICApXHJcbiAgfSxcclxuXHJcbiAgX2NoYW5nZTogZnVuY3Rpb24oZSl7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgdGV4dFZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KTtcclxuICB9LFxyXG5cclxuICBfYmx1cjogZnVuY3Rpb24oZSl7XHJcbiAgICB2YXIgdmFsID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG4gICAgdGhpcy5wcm9wcy5vbkNoYW5nZShcclxuICAgICAgdGhpcy5wcm9wcy5wYXJzZSh2YWwpLCB2YWwpO1xyXG4gIH0sXHJcblxyXG4gIGZvY3VzOiBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5nZXRET01Ob2RlKCkuZm9jdXMoKVxyXG4gIH1cclxuXHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gaXNWYWxpZChkKSB7XHJcbiAgcmV0dXJuICFpc05hTihkLmdldFRpbWUoKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0LCBjdWx0dXJlKXtcclxuICB2YXIgdmFsID0gJydcclxuXHJcbiAgaWYgKCAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpICYmIGlzVmFsaWQoZGF0ZSkgKVxyXG4gICAgdmFsID0gZGF0ZXMuZm9ybWF0KGRhdGUsIGZvcm1hdCwgY3VsdHVyZSlcclxuXHJcbiAgcmV0dXJuIHZhbDtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhaW4oYSxiLCB0aGlzQXJnKXtcclxuICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgIGEgJiYgYS5hcHBseSh0aGlzQXJnLCBhcmd1bWVudHMpXHJcbiAgICBiICYmIGIuYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKVxyXG4gIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL0RhdGVJbnB1dC5qc3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBzY3JvbGxUbyA9IHJlcXVpcmUoJy4uL3V0aWwvZG9tL3Njcm9sbCcpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgX3Njcm9sbFRvKHNlbGVjdGVkLCBsaXN0KSB7XHJcbiAgICB2YXIgaGFuZGxlciA9IHRoaXMucHJvcHMub25Nb3ZlOyBcclxuXHJcbiAgICBpZiAoIHRoaXMucHJvcHMub3Blbil7XHJcbiAgICAgIGlmICggaGFuZGxlciApIFxyXG4gICAgICAgIGhhbmRsZXIoc2VsZWN0ZWQsIGxpc3QpXHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhbmNlbCAmJiB0aGlzLl9zY3JvbGxDYW5jZWwoKVxyXG4gICAgICAgIHRoaXMuX3Njcm9sbENhbmNlbCA9IHNjcm9sbFRvKHNlbGVjdGVkLCBsaXN0KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL21peGlucy9Qb3B1cFNjcm9sbFRvTWl4aW4uanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcclxuICAsIF8gPSAgcmVxdWlyZSgnLi4vdXRpbC9fJylcclxuICAsIGZpbHRlciA9IHJlcXVpcmUoJy4uL3V0aWwvZmlsdGVyJylcclxuICAsIGhlbHBlciA9IHJlcXVpcmUoJy4vRGF0YUhlbHBlcnNNaXhpbicpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICBcclxuICBwcm9wVHlwZXM6IHsgICAgXHJcbiAgICB0ZXh0RmllbGQ6ICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gIH0sXHJcblxyXG4gIGZpcnN0KCl7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YSgpWzBdXHJcbiAgfSxcclxuXHJcbiAgbGFzdCgpe1xyXG4gICAgdmFyIGRhdGEgPSB0aGlzLl9kYXRhKClcclxuICAgIHJldHVybiBkYXRhW2RhdGEubGVuZ3RoLTFdXHJcbiAgfSxcclxuXHJcbiAgcHJldihpdGVtLCB3b3JkKXtcclxuICAgIHZhciBkYXRhID0gdGhpcy5fZGF0YSgpXHJcbiAgICAgICwgaWR4ICA9IGRhdGEuaW5kZXhPZihpdGVtKVxyXG5cclxuICAgIGlmIChpZHggPT09IC0xKSBpZHggPSBkYXRhLmxlbmd0aDtcclxuXHJcbiAgICByZXR1cm4gd29yZCBcclxuICAgICAgPyBmaW5kUHJldkluc3RhbmNlKHRoaXMsICBkYXRhLCB3b3JkLCBpZHgpXHJcbiAgICAgIDogLS1pZHggPCAwID8gZGF0YVswXSA6IGRhdGFbaWR4XVxyXG4gIH0sXHJcblxyXG4gIG5leHQoaXRlbSwgd29yZCl7XHJcbiAgICB2YXIgZGF0YSA9IHRoaXMuX2RhdGEoKVxyXG4gICAgICAsIGlkeCAgPSBkYXRhLmluZGV4T2YoaXRlbSlcclxuXHJcbiAgICByZXR1cm4gd29yZCBcclxuICAgICAgPyBmaW5kTmV4dEluc3RhbmNlKHRoaXMsIGRhdGEsIHdvcmQsIGlkeClcclxuICAgICAgOiArK2lkeCA9PT0gZGF0YS5sZW5ndGggPyBkYXRhW2RhdGEubGVuZ3RoIC0gMV0gOiBkYXRhW2lkeF1cclxuICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kTmV4dEluc3RhbmNlKGN0eCwgZGF0YSwgd29yZCwgc3RhcnRJbmRleCl7XHJcbiAgdmFyIG1hdGNoZXMgPSBmaWx0ZXIuc3RhcnRzV2l0aFxyXG4gICAgLCBpZHggPSAtMVxyXG4gICAgLCBsZW4gPSBkYXRhLmxlbmd0aFxyXG4gICAgLCBmb3VuZFN0YXJ0LCBpdGVtVGV4dDtcclxuXHJcbiAgd29yZCA9IHdvcmQudG9Mb3dlckNhc2UoKVxyXG5cclxuICB3aGlsZSAoKytpZHggPCBsZW4pe1xyXG4gICAgZm91bmRTdGFydCA9IGZvdW5kU3RhcnQgfHwgaWR4ID4gc3RhcnRJbmRleCBcclxuICAgIGl0ZW1UZXh0ICAgPSBmb3VuZFN0YXJ0ICYmIGhlbHBlci5fZGF0YVRleHQuY2FsbChjdHgsIGRhdGFbaWR4XSkudG9Mb3dlckNhc2UoKVxyXG5cclxuICAgIGlmKCBmb3VuZFN0YXJ0ICYmIG1hdGNoZXMoaXRlbVRleHQsIHdvcmQpIClcclxuICAgICAgcmV0dXJuIGRhdGFbaWR4XVxyXG4gIH0gIFxyXG59XHJcblxyXG5mdW5jdGlvbiBmaW5kUHJldkluc3RhbmNlKGN0eCwgZGF0YSwgd29yZCwgc3RhcnRJbmRleCl7XHJcbiAgdmFyIG1hdGNoZXMgPSBmaWx0ZXIuc3RhcnRzV2l0aFxyXG4gICAgLCBpZHggPSBkYXRhLmxlbmd0aFxyXG4gICAgLCBmb3VuZFN0YXJ0LCBpdGVtVGV4dDtcclxuXHJcbiAgd29yZCA9IHdvcmQudG9Mb3dlckNhc2UoKVxyXG5cclxuICB3aGlsZSAoLS1pZHggPj0gMCApe1xyXG4gICAgZm91bmRTdGFydCA9IGZvdW5kU3RhcnQgfHwgaWR4IDwgc3RhcnRJbmRleCBcclxuICAgIGl0ZW1UZXh0ICAgPSBmb3VuZFN0YXJ0ICYmIGhlbHBlci5fZGF0YVRleHQuY2FsbChjdHgsIGRhdGFbaWR4XSkudG9Mb3dlckNhc2UoKVxyXG4gICAgXHJcbiAgICBpZiggZm91bmRTdGFydCAmJiBtYXRjaGVzKGl0ZW1UZXh0LCB3b3JkKSApXHJcbiAgICAgIHJldHVybiBkYXRhW2lkeF1cclxuICB9ICBcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL21peGlucy9MaXN0TW92ZW1lbnRNaXhpbi5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFJlYWN0ICAgPSByZXF1aXJlKCdyZWFjdCcpXHJcbiAgLCBDdXN0b21Qcm9wVHlwZXMgID0gcmVxdWlyZSgnLi91dGlsL3Byb3BUeXBlcycpXHJcbiAgLCBjeCA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKVxyXG4gICwgXyAgPSByZXF1aXJlKCcuL3V0aWwvXycpO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBkaXNwbGF5TmFtZTogJ0xpc3QnLFxyXG5cclxuICBtaXhpbnM6IFsgXHJcbiAgICByZXF1aXJlKCcuL21peGlucy9XaWRnZXRNaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvRGF0YUhlbHBlcnNNaXhpbicpLFxyXG4gICAgcmVxdWlyZSgnLi9taXhpbnMvTGlzdE1vdmVtZW50TWl4aW4nKVxyXG4gIF0sXHJcblxyXG4gIHByb3BUeXBlczoge1xyXG4gICAgZGF0YTogICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5hcnJheSxcclxuICAgIG9uU2VsZWN0OiAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uTW92ZTogICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuXHJcbiAgICBpdGVtQ29tcG9uZW50OiAgQ3VzdG9tUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxyXG4gICAgZ3JvdXBDb21wb25lbnQ6IEN1c3RvbVByb3BUeXBlcy5lbGVtZW50VHlwZSxcclxuXHJcbiAgICBzZWxlY3RlZDogICAgICAgUmVhY3QuUHJvcFR5cGVzLmFueSxcclxuICAgIGZvY3VzZWQ6ICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYW55LFxyXG5cclxuICAgIHZhbHVlRmllbGQ6ICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgdGV4dEZpZWxkOiAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiBcclxuICAgIG9wdElEOiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG5cclxuICAgIGdyb3VwQnk6ICAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICBdKSxcclxuXHJcbiAgICBtZXNzYWdlczogICAgICAgUmVhY3QuUHJvcFR5cGVzLnNoYXBlKHtcclxuICAgICAgZW1wdHlMaXN0OiAgICBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nXHJcbiAgICB9KSxcclxuICB9LFxyXG5cclxuXHJcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgb3B0SUQ6ICAgICAgICAgJycsXHJcbiAgICAgIG9uU2VsZWN0OiAgICAgIGZ1bmN0aW9uKCl7fSxcclxuICAgICAgZGF0YTogICAgICAgICAgW10sXHJcbiAgICAgIG1lc3NhZ2VzOiB7XHJcbiAgICAgICAgZW1wdHlMaXN0OiAgIFwiVGhlcmUgYXJlIG5vIGl0ZW1zIGluIHRoaXMgbGlzdFwiXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIGtleXMgPSBbXTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBncm91cHM6IHRoaXMuX2dyb3VwKHRoaXMucHJvcHMuZ3JvdXBCeSwgdGhpcy5wcm9wcy5kYXRhLCBrZXlzKSxcclxuXHJcbiAgICAgIHNvcnRlZEtleXM6IGtleXNcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcclxuICAgIHZhciBrZXlzID0gW107XHJcblxyXG4gICAgaWYobmV4dFByb3BzLmRhdGEgIT09IHRoaXMucHJvcHMuZGF0YSB8fCBuZXh0UHJvcHMuZ3JvdXBCeSAhPT0gdGhpcy5wcm9wcy5ncm91cEJ5KVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgXHJcbiAgICAgICAgZ3JvdXBzOiB0aGlzLl9ncm91cChuZXh0UHJvcHMuZ3JvdXBCeSwgbmV4dFByb3BzLmRhdGEsIGtleXMpLFxyXG4gICAgICAgIHNvcnRlZEtleXM6IGtleXNcclxuICAgICAgfSlcclxuICB9LFxyXG5cclxuICBjb21wb25lbnREaWRNb3VudChwcmV2UHJvcHMsIHByZXZTdGF0ZSl7XHJcbiAgICB0aGlzLl9zZXRTY3JvbGxQb3NpdGlvbigpXHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcyl7XHJcbiAgICBpZiAoIHByZXZQcm9wcy5mb2N1c2VkICE9PSB0aGlzLnByb3BzLmZvY3VzZWQpXHJcbiAgICAgIHRoaXMuX3NldFNjcm9sbFBvc2l0aW9uKClcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgeyBcclxuICAgICAgICBjbGFzc05hbWVcclxuICAgICAgLCAuLi5wcm9wcyB9ID0gXy5vbWl0KHRoaXMucHJvcHMsIFsnZGF0YScsICdzZWxlY3RlZEluZGV4J10pXHJcbiAgICAgICwgZ3JvdXBzID0gdGhpcy5zdGF0ZS5ncm91cHNcclxuICAgICAgLCBpdGVtcyA9IFtdXHJcbiAgICAgICwgaWR4ID0gLTFcclxuICAgICAgLCBncm91cDtcclxuICAgIFxyXG4gICAgaWYgKCB0aGlzLnByb3BzLmRhdGEubGVuZ3RoICl7XHJcbiAgICAgIGl0ZW1zID0gdGhpcy5zdGF0ZS5zb3J0ZWRLZXlzXHJcbiAgICAgICAgLnJlZHVjZSggKGl0ZW1zLCBrZXkpID0+IHtcclxuICAgICAgICAgIGdyb3VwID0gZ3JvdXBzW2tleV1cclxuICAgICAgICAgIGl0ZW1zLnB1c2godGhpcy5fcmVuZGVyR3JvdXBIZWFkZXIoa2V5KSlcclxuXHJcbiAgICAgICAgICBmb3IgKHZhciBpdGVtSWR4ID0gMDsgaXRlbUlkeCA8IGdyb3VwLmxlbmd0aDsgaXRlbUlkeCsrKSBcclxuICAgICAgICAgICAgaXRlbXMucHVzaChcclxuICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKGtleSwgZ3JvdXBbaXRlbUlkeF0sICsraWR4KSlcclxuXHJcbiAgICAgICAgICByZXR1cm4gaXRlbXNcclxuICAgICAgICB9LCBbXSlcclxuICAgIH1cclxuICAgIGVsc2UgXHJcbiAgICAgIGl0ZW1zID0gPGxpPnsgdGhpcy5wcm9wcy5tZXNzYWdlcy5lbXB0eUxpc3QgfTwvbGk+XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHVsIHsgLi4ucHJvcHMgfVxyXG4gICAgICAgIGNsYXNzTmFtZT17IChjbGFzc05hbWUgfHwgJycpICsgJyBydy1saXN0ICBydy1saXN0LWdyb3VwZWQnIH0gXHJcbiAgICAgICAgcmVmPSdzY3JvbGxhYmxlJ1xyXG4gICAgICAgIHJvbGU9J2xpc3Rib3gnPlxyXG4gICAgICAgIHsgaXRlbXMgfVxyXG4gICAgICA8L3VsPlxyXG4gICAgKVxyXG4gIH0sXHJcblxyXG4gIF9yZW5kZXJHcm91cEhlYWRlcihncm91cCl7XHJcbiAgICB2YXIgSXRlbUNvbXBvbmVudCA9IHRoaXMucHJvcHMuZ3JvdXBDb21wb25lbnQ7XHJcblxyXG4gICAgcmV0dXJuICg8bGkgXHJcbiAgICAgIGtleT17J2l0ZW1fJyArIGdyb3VwfVxyXG4gICAgICB0YWJJbmRleD0nLTEnXHJcbiAgICAgIHJvbGU9XCJzZXBhcmF0b3JcIlxyXG4gICAgICBjbGFzc05hbWU9J3J3LWxpc3Qtb3B0Z3JvdXAnPlxyXG4gICAgICAgIHsgSXRlbUNvbXBvbmVudCA/IDxJdGVtQ29tcG9uZW50IGl0ZW09e2dyb3VwfS8+IDogZ3JvdXAgfVxyXG4gICAgPC9saT4pXHJcbiAgfSxcclxuXHJcbiAgX3JlbmRlckl0ZW0oZ3JvdXAsIGl0ZW0sIGlkeCl7XHJcbiAgICB2YXIgZm9jdXNlZCAgPSB0aGlzLnByb3BzLmZvY3VzZWQgID09PSBpdGVtXHJcbiAgICAgICwgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdGVkID09PSBpdGVtXHJcbiAgICAgICwgSXRlbUNvbXBvbmVudCA9IHRoaXMucHJvcHMuaXRlbUNvbXBvbmVudDtcclxuXHJcbiAgICAvL2NvbnNvbGUubG9nKCdoaScpXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8bGkgXHJcbiAgICAgICAga2V5PXsnaXRlbV8nICsgZ3JvdXAgKyAnXycgKyBpZHh9XHJcbiAgICAgICAgcm9sZT0nb3B0aW9uJ1xyXG4gICAgICAgIGlkPXsgZm9jdXNlZCA/IHRoaXMucHJvcHMub3B0SUQgOiB1bmRlZmluZWQgfVxyXG4gICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbGVjdGVkfVxyXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMucHJvcHMub25TZWxlY3QuYmluZChudWxsLCBpdGVtKX1cclxuICAgICAgICBjbGFzc05hbWU9e2N4KHsgXHJcbiAgICAgICAgICAncnctc3RhdGUtZm9jdXMnOiAgICBmb2N1c2VkLFxyXG4gICAgICAgICAgJ3J3LXN0YXRlLXNlbGVjdGVkJzogc2VsZWN0ZWQsXHJcbiAgICAgICAgICAncnctbGlzdC1vcHRpb24nOiAgICB0cnVlXHJcbiAgICAgICAgfSl9PlxyXG4gICAgICAgICAgeyBJdGVtQ29tcG9uZW50XHJcbiAgICAgICAgICAgICAgPyA8SXRlbUNvbXBvbmVudCBpdGVtPXtpdGVtfS8+XHJcbiAgICAgICAgICAgICAgOiB0aGlzLl9kYXRhVGV4dChpdGVtKVxyXG4gICAgICAgICAgfVxyXG4gICAgICA8L2xpPilcclxuICB9LFxyXG5cclxuICBfaXNJbmRleE9mKGlkeCwgaXRlbSl7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5kYXRhW2lkeF0gPT09IGl0ZW1cclxuICB9LFxyXG5cclxuICBfZ3JvdXAoZ3JvdXBCeSwgZGF0YSwga2V5cyl7XHJcbiAgICB2YXIgaXRlciA9IHR5cGVvZiBncm91cEJ5ID09PSAnZnVuY3Rpb24nID8gZ3JvdXBCeSA6IGl0ZW0gPT4gaXRlbVtncm91cEJ5XVxyXG5cclxuICAgIC8vIHRoZSBrZXlzIGFycmF5IGVuc3VyZXMgdGhhdCBncm91cHMgYXJlIHJlbmRlcmVkIGluIHRoZSBvcmRlciB0aGV5IGNhbWUgaW5cclxuICAgIC8vIHdoaWNoIG1lYW5zIHRoYXQgaWYgeW91IHNvcnQgdGhlIGRhdGEgYXJyYXkgaXQgd2lsbCByZW5kZXIgc29ydGVkLCBcclxuICAgIC8vIHNvIGxvbmcgYXMgeW91IGFsc28gc29ydGVkIGJ5IGdyb3VwXHJcbiAgICBrZXlzID0ga2V5cyB8fCBbXVxyXG5cclxuICAgIHJldHVybiBkYXRhLnJlZHVjZSggKGdycHMsIGl0ZW0pID0+IHtcclxuICAgICAgdmFyIGdyb3VwID0gaXRlcihpdGVtKTtcclxuXHJcbiAgICAgIF8uaGFzKGdycHMsIGdyb3VwKSBcclxuICAgICAgICA/IGdycHNbZ3JvdXBdLnB1c2goaXRlbSlcclxuICAgICAgICA6IChrZXlzLnB1c2goZ3JvdXApLCBncnBzW2dyb3VwXSA9IFtpdGVtXSlcclxuXHJcbiAgICAgIHJldHVybiBncnBzXHJcbiAgICB9LCB7fSkgXHJcbiAgfSxcclxuXHJcbiAgX2RhdGEoKXsgXHJcbiAgICB2YXIgZ3JvdXBzID0gdGhpcy5zdGF0ZS5ncm91cHM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuc29ydGVkS2V5c1xyXG4gICAgICAucmVkdWNlKCAoZmxhdCwgZ3JwKSA9PiBmbGF0LmNvbmNhdChncm91cHNbZ3JwXSksIFtdKVxyXG4gIH0sXHJcblxyXG4gIF9zZXRTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24oKXtcclxuICAgIHZhciBzZWxlY3RlZCA9IHRoaXMuZ2V0SXRlbURPTU5vZGUodGhpcy5wcm9wcy5mb2N1c2VkKTtcclxuXHJcbiAgICBpZiggIXNlbGVjdGVkICkgcmV0dXJuIFxyXG5cclxuICAgIHRoaXMubm90aWZ5KCdvbk1vdmUnLCBbIHNlbGVjdGVkLCB0aGlzLmdldERPTU5vZGUoKSBdKVxyXG4gIH0sXHJcblxyXG4gIGdldEl0ZW1ET01Ob2RlKGl0ZW0pe1xyXG4gICAgdmFyIGxpc3QgPSB0aGlzLmdldERPTU5vZGUoKVxyXG4gICAgICAsIGdyb3VwcyA9IHRoaXMuc3RhdGUuZ3JvdXBzXHJcbiAgICAgICwgaWR4ID0gLTFcclxuICAgICAgLCBpdGVtSWR4LCBjaGlsZDtcclxuXHJcbiAgICB0aGlzLnN0YXRlLnNvcnRlZEtleXMuc29tZShncm91cCA9PiB7XHJcbiAgICAgIGl0ZW1JZHggPSBncm91cHNbZ3JvdXBdLmluZGV4T2YoaXRlbSlcclxuICAgICAgaWR4Kys7XHJcblxyXG4gICAgICBpZiggaXRlbUlkeCAhPT0gLTEpIFxyXG4gICAgICAgIHJldHVybiAhIShjaGlsZCA9IGxpc3QuY2hpbGRyZW5baWR4ICsgaXRlbUlkeCArIDFdKVxyXG5cclxuICAgICAgaWR4ICs9IGdyb3Vwc1tncm91cF0ubGVuZ3RoXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBjaGlsZFxyXG4gIH1cclxuXHJcbn0pXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvTGlzdEdyb3VwYWJsZS5qc3hcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBSZWFjdCAgID0gcmVxdWlyZSgncmVhY3QnKVxyXG4gICwgZmlsdGVycyA9IHJlcXVpcmUoJy4uL3V0aWwvZmlsdGVyJylcclxuICAsIGhlbHBlciAgPSByZXF1aXJlKCcuL0RhdGFIZWxwZXJzTWl4aW4nKTtcclxuXHJcbnZhciBmaWx0ZXJUeXBlcyA9IE9iamVjdC5rZXlzKGZpbHRlcnMpLmZpbHRlciggaSA9PiBpICE9PSAnZmlsdGVyJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgIGRhdGE6ICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgIHZhbHVlOiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMuYW55LFxyXG4gICAgICBmaWx0ZXI6ICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMub25lT2YoZmlsdGVyVHlwZXMuY29uY2F0KGZhbHNlKSlcclxuICAgICAgICAgICAgICAgICAgICAgIF0pLFxyXG4gICAgICBjYXNlU2Vuc2l0aXZlOiAgUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgIG1pbkxlbmd0aDogICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgfSxcclxuXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY2FzZVNlbnNpdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgbWluTGVuZ3RoOiAxXHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmlsdGVySW5kZXhPZjogZnVuY3Rpb24oaXRlbXMsIHNlYXJjaFRlcm0pe1xyXG4gICAgICB2YXIgaWR4ID0gLTFcclxuICAgICAgICAsIG1hdGNoZXMgPSB0eXBlb2YgdGhpcy5wcm9wcy5maWx0ZXIgPT09ICdmdW5jdGlvbidcclxuICAgICAgICAgICAgPyB0aGlzLnByb3BzLmZpbHRlclxyXG4gICAgICAgICAgICA6IGdldEZpbHRlcihmaWx0ZXJzW3RoaXMucHJvcHMuZmlsdGVyIHx8ICdlcSddLCBzZWFyY2hUZXJtLCB0aGlzKTtcclxuXHJcbiAgICAgIGlmICggIXNlYXJjaFRlcm0gfHwgIXNlYXJjaFRlcm0udHJpbSgpIHx8ICh0aGlzLnByb3BzLmZpbHRlciAmJiBzZWFyY2hUZXJtLmxlbmd0aCA8ICh0aGlzLnByb3BzLm1pbkxlbmd0aCB8fCAxKSkpXHJcbiAgICAgICAgcmV0dXJuIC0xXHJcblxyXG4gICAgICBpdGVtcy5ldmVyeSggKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICBpZiAobWF0Y2hlcyhpdGVtLCBzZWFyY2hUZXJtKSlcclxuICAgICAgICAgIHJldHVybiAoaWR4ID0gaSksIGZhbHNlXHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICByZXR1cm4gaWR4ICBcclxuICAgIH0sXHJcblxyXG4gICAgZmlsdGVyOiBmdW5jdGlvbihpdGVtcywgc2VhcmNoVGVybSl7XHJcbiAgICAgIHZhciBtYXRjaGVzID0gdHlwZW9mIHRoaXMucHJvcHMuZmlsdGVyID09PSAnc3RyaW5nJ1xyXG4gICAgICAgICAgICA/IGdldEZpbHRlcihmaWx0ZXJzW3RoaXMucHJvcHMuZmlsdGVyXSwgc2VhcmNoVGVybSwgdGhpcylcclxuICAgICAgICAgICAgOiB0aGlzLnByb3BzLmZpbHRlcjtcclxuXHJcbiAgICAgIGlmICggIW1hdGNoZXMgfHwgIXNlYXJjaFRlcm0gfHwgIXNlYXJjaFRlcm0udHJpbSgpIHx8IHNlYXJjaFRlcm0ubGVuZ3RoIDwgKHRoaXMucHJvcHMubWluTGVuZ3RoIHx8IDEpKVxyXG4gICAgICAgIHJldHVybiBpdGVtc1xyXG5cclxuICAgICAgcmV0dXJuIGl0ZW1zLmZpbHRlciggXHJcbiAgICAgICAgaXRlbSA9PiBtYXRjaGVzKGl0ZW0sIHNlYXJjaFRlcm0pKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRGaWx0ZXIobWF0Y2hlciwgc2VhcmNoVGVybSwgY3R4KXtcclxuICBzZWFyY2hUZXJtID0gIWN0eC5jYXNlU2Vuc2l0aXZlIFxyXG4gICAgPyBzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkgXHJcbiAgICA6IHNlYXJjaFRlcm1cclxuXHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgIHZhciB2YWwgPSBoZWxwZXIuX2RhdGFUZXh0LmNhbGwoY3R4LCBpdGVtKTtcclxuXHJcbiAgICBpZiAoICFjdHguY2FzZVNlbnNpdGl2ZSApXHJcbiAgICAgIHZhbCA9IHZhbC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIHJldHVybiBtYXRjaGVyKHZhbCwgc2VhcmNoVGVybSlcclxuICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9taXhpbnMvRGF0YUZpbHRlck1peGluLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG52YXIgUmVhY3QgICA9IHJlcXVpcmUoJ3JlYWN0JylcclxuICAsIEN1c3RvbVByb3BUeXBlcyA9IHJlcXVpcmUoJy4vdXRpbC9wcm9wVHlwZXMnKVxyXG4gICwgZ2xvYmFsaXplID0gcmVxdWlyZSgnZ2xvYmFsaXplJyk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG4gIGRpc3BsYXlOYW1lOiAnTnVtYmVyUGlja2VySW5wdXQnLCBcclxuXHJcbiAgcHJvcFR5cGVzOiB7XHJcbiAgICB2YWx1ZTogICAgICAgIFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcblxyXG4gICAgZm9ybWF0OiAgICAgICBDdXN0b21Qcm9wVHlwZXMubG9jYWxlRm9ybWF0LmlzUmVxdWlyZWQsXHJcbiAgICBwYXJzZTogICAgICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBjdWx0dXJlOiAgICAgIFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcblxyXG4gICAgbWluOiAgICAgICAgICBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgXHJcbiAgICBvbkNoYW5nZTogICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICBvbktleURvd246ICAgIFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gIH0sXHJcblxyXG4gIGdldERlZmF1bHRQcm9wcygpe1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdmFsdWU6IG51bGwsXHJcbiAgICAgIGZvcm1hdDogJ2QnLFxyXG4gICAgICBlZGl0aW5nOiBmYWxzZSxcclxuICAgICAgcGFyc2U6IChudW1iZXIsIGN1bHR1cmUpID0+IGdsb2JhbGl6ZS5wYXJzZUZsb2F0KG51bWJlciwgMTAsIGN1bHR1cmUpXHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZ2V0RGVmYXVsdFN0YXRlKHByb3BzKXtcclxuICAgIHZhciB2YWx1ZSA9IHByb3BzLmVkaXRpbmcgXHJcbiAgICAgICAgICA/IHByb3BzLnZhbHVlXHJcbiAgICAgICAgICA6IGZvcm1hdE51bWJlcihwcm9wcy52YWx1ZSwgcHJvcHMuZm9ybWF0LCBwcm9wcy5jdWx0dXJlKVxyXG5cclxuICAgIGlmICggdmFsdWUgPT0gbnVsbCB8fCBpc05hTihwcm9wcy52YWx1ZSkgKSBcclxuICAgICAgdmFsdWUgPSAnJ1xyXG5cclxuICAgIHJldHVybiB7IFxyXG4gICAgICBzdHJpbmdWYWx1ZTogXCJcIisgdmFsdWVcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0U3RhdGUodGhpcy5wcm9wcylcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wcykge1xyXG4gICAgdGhpcy5zZXRTdGF0ZShcclxuICAgICAgdGhpcy5nZXREZWZhdWx0U3RhdGUobmV4dFByb3BzKSlcclxuICB9LFxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIHZhciB2YWx1ZSA9IHRoaXMuc3RhdGUuc3RyaW5nVmFsdWU7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGlucHV0IHsuLi50aGlzLnByb3BzfVxyXG4gICAgICAgIHR5cGU9J3RleHQnIFxyXG4gICAgICAgIGNsYXNzTmFtZT0ncnctaW5wdXQnXHJcbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuX2NoYW5nZX1cclxuICAgICAgICBvbkJsdXI9e3RoaXMuX2ZpbmlzaH1cclxuICAgICAgICBhcmlhLWRpc2FibGVkPXt0aGlzLnByb3BzLmRpc2FibGVkfVxyXG4gICAgICAgIGFyaWEtcmVhZG9ubHk9e3RoaXMucHJvcHMucmVhZE9ubHl9XHJcbiAgICAgICAgZGlzYWJsZWQ9e3RoaXMucHJvcHMuZGlzYWJsZWR9XHJcbiAgICAgICAgcmVhZE9ubHk9e3RoaXMucHJvcHMucmVhZE9ubHl9XHJcbiAgICAgICAgdmFsdWU9e3ZhbHVlfS8+XHJcbiAgICApXHJcbiAgfSxcclxuXHJcbiAgX2NoYW5nZShlKXtcclxuICAgIHZhciB2YWwgPSBlLnRhcmdldC52YWx1ZVxyXG4gICAgICAsIG51bWJlciA9IHRoaXMucHJvcHMucGFyc2UoZS50YXJnZXQudmFsdWUsIHRoaXMucHJvcHMuY3VsdHVyZSlcclxuICAgICAgLCBpc051bGwgPSB2YWwgIT09IDAgJiYgIXZhbFxyXG4gICAgICAsIGhhc01pbiA9IHRoaXMucHJvcHMubWluICYmIGlzRmluaXRlKHRoaXMucHJvcHMubWluKVxyXG5cclxuICAgIC8vYSBudWxsIHZhbHVlIGlzIG9ubHkgcG9zc2libGUgd2hlbiB0aGVyZSBpcyBubyBtaW5cclxuICAgIGlmKCFoYXNNaW4gJiYgaXNOdWxsKVxyXG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5vbkNoYW5nZShudWxsKVxyXG5cclxuICAgIGlmKHRoaXMuaXNWYWxpZChudW1iZXIpICYmIG51bWJlciAhPT0gdGhpcy5wcm9wcy52YWx1ZSlcclxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMub25DaGFuZ2UobnVtYmVyKVxyXG5cclxuICAgIC8vY29uc29sZS5sb2codmFsICE9PSAwICYmICF2YWwpXHJcbiAgICB0aGlzLmN1cnJlbnQoZS50YXJnZXQudmFsdWUpXHJcbiAgfSxcclxuXHJcbiAgX2ZpbmlzaChlKXtcclxuICAgIHZhciBudW1iZXIgPSB0aGlzLnByb3BzLnBhcnNlKFxyXG4gICAgICAgICAgICB0aGlzLnN0YXRlLnN0cmluZ1ZhbHVlXHJcbiAgICAgICAgICAsIHRoaXMucHJvcHMuY3VsdHVyZSk7XHJcblxyXG4gICAgLy8gaWYgbnVtYmVyIGlzIGJlbG93IHRoZSBtaW5cclxuICAgIC8vIHdlIG5lZWQgdG8gZmx1c2ggbG93IHZhbHVlcyBldmVudHVhbGx5LCBvbkJsdXIgbWVhbnMgaSdtIGRvbmUgaW5wdXRpbmdcclxuICAgIGlmKCFpc05hTihudW1iZXIpICYmIG51bWJlciA8IHRoaXMucHJvcHMubWluKSB7XHJcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UobnVtYmVyKVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGlzVmFsaWQobnVtKSB7XHJcbiAgICBpZih0eXBlb2YgbnVtICE9PSAnbnVtYmVyJyB8fCBpc05hTihudW0pKSBcclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICByZXR1cm4gbnVtID49IHRoaXMucHJvcHMubWluXHJcbiAgfSxcclxuXHJcbiAgLy90aGlzIGludGVybWVkaWF0ZSBzdGF0ZSBpcyBmb3Igd2hlbiBvbmUgcnVucyBpbnRvIHRoZSBkZWNpbWFsIG9yIGFyZSB0eXBpbmcgdGhlIG51bWJlclxyXG4gIGN1cnJlbnQodmFsKXtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBzdHJpbmdWYWx1ZTogdmFsIH0pXHJcbiAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuZnVuY3Rpb24gcGFyc2VMb2NhbGVGbG9hdChudW1iZXIsIHBhcnNlciwgY3VsdHVyZSkge1xyXG4gIGlmICggdHlwZW9mIGZvcm1hdCA9PT0gJ2Z1bmN0aW9uJylcclxuICAgIHJldHVybiBmb3JtYXQobnVtYmVyLCBjdWx0dXJlKVxyXG5cclxuICByZXR1cm4gZ2xvYmFsaXplLnBhcnNlRmxvYXQobnVtYmVyLCAxMCwgY3VsdHVyZSlcclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG51bWJlciwgZm9ybWF0LCBjdWx0dXJlKXtcclxuICBpZiAoIHR5cGVvZiBmb3JtYXQgPT09ICdmdW5jdGlvbicpXHJcbiAgICByZXR1cm4gZm9ybWF0KG51bWJlciwgY3VsdHVyZSlcclxuXHJcbiAgcmV0dXJuIGdsb2JhbGl6ZS5mb3JtYXQobnVtYmVyLCBmb3JtYXQsIGN1bHR1cmUpXHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9OdW1iZXJJbnB1dC5qc3hcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cclxuICBvbjogZnVuY3Rpb24obm9kZSwgZXZlbnROYW1lLCBoYW5kbGVyKXtcclxuICAgIGlmIChub2RlLmFkZEV2ZW50TGlzdGVuZXIpXHJcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKTtcclxuXHJcbiAgICBlbHNlIGlmIChub2RlLmF0dGFjaEV2ZW50KVxyXG4gICAgICBub2RlLmF0dGFjaEV2ZW50KCdvbicgKyBldmVudE5hbWUsIGhhbmRsZXIpO1xyXG5cclxuICB9LFxyXG5cclxuICBvZmY6IGZ1bmN0aW9uKG5vZGUsIGV2ZW50TmFtZSwgaGFuZGxlcil7XHJcbiAgICBpZiAobm9kZS5hZGRFdmVudExpc3RlbmVyKVxyXG4gICAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSk7XHJcblxyXG4gICAgZWxzZSBpZiAobm9kZS5hdHRhY2hFdmVudClcclxuICAgICAgbm9kZS5kZXRhY2hFdmVudCgnb24nICsgZXZlbnROYW1lLCBoYW5kbGVyKTtcclxuICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2RvbS9ldmVudHMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBjb250YWlucyA9IHJlcXVpcmUoJy4vY29udGFpbnMnKVxyXG5cclxuZnVuY3Rpb24gb2Zmc2V0KG5vZGUpIHtcclxuICB2YXIgZG9jICAgICA9IG5vZGUub3duZXJEb2N1bWVudFxyXG4gICAgLCBkb2NFbGVtID0gZG9jICYmIGRvYy5kb2N1bWVudEVsZW1lbnRcclxuICAgICwgYm94ICAgICA9IHsgdG9wOiAwLCBsZWZ0OiAwLCBoZWlnaHQ6IDAsIHdpZHRoOiAwIH07XHJcblxyXG4gIGlmICggIWRvY0VsZW0gKSByZXR1cm5cclxuXHJcbiAgaWYgKCAhY29udGFpbnMoZG9jRWxlbSwgbm9kZSkpXHJcbiAgICByZXR1cm4gYm94XHJcblxyXG4gIGlmICggbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgIT09IHVuZGVmaW5lZCApXHJcbiAgICBib3ggPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdG9wOiBib3gudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gZG9jRWxlbS5jbGllbnRUb3AsXHJcbiAgICBsZWZ0OiBib3gubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCAtIGRvY0VsZW0uY2xpZW50TGVmdCxcclxuICAgIHdpZHRoOiBib3gud2lkdGggfHwgbm9kZS5vZmZzZXRXaWR0aCxcclxuICAgIGhlaWdodDogYm94LmhlaWdodCB8fCBub2RlLm9mZnNldEhlaWdodCxcclxuICB9O1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgd2lkdGg6IGZ1bmN0aW9uKG5vZGUsIGNsaWVudCl7XHJcbiAgICB2YXIgd2luID0gZ2V0V2luZG93KG5vZGUpXHJcbiAgICByZXR1cm4gd2luID8gd2luLmlubmVyV2lkdGggOiBjbGllbnQgPyBub2RlLmNsaWVudFdpZHRoIDogb2Zmc2V0KG5vZGUpLndpZHRoXHJcbiAgfSxcclxuXHJcbiAgaGVpZ2h0OiBmdW5jdGlvbihub2RlLCBjbGllbnQpe1xyXG4gICAgdmFyIHdpbiA9IGdldFdpbmRvdyhub2RlKVxyXG4gICAgcmV0dXJuIHdpbiA/IHdpbi5pbm5lckhlaWdodCA6IGNsaWVudCA/IG5vZGUuY2xpZW50SGVpZ2h0IDogb2Zmc2V0KG5vZGUpLmhlaWdodFxyXG4gIH0sXHJcblxyXG4gIG9mZnNldFxyXG4gIFxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXaW5kb3coIG5vZGUgKSB7XHJcbiAgcmV0dXJuIG5vZGUgPT09IG5vZGUud2luZG93XHJcbiAgICA/IG5vZGUgOiBub2RlLm5vZGVUeXBlID09PSA5ICYmIG5vZGUuZGVmYXVsdFZpZXc7XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2RvbS9kaW1lbnNpb25zLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIGNhbWVsaXplICA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9jYW1lbGl6ZVN0eWxlTmFtZScpIFxyXG4gICwgaHlwaGVuYXRlID0gcmVxdWlyZSgncmVhY3QvbGliL2h5cGhlbmF0ZVN0eWxlTmFtZScpXHJcbiAgLCBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjc3NGbihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpe1xyXG4gIHZhciBjc3MgPSAnJ1xyXG4gICAgLCBwcm9wcyA9IHByb3BlcnR5O1xyXG5cclxuICBpZiAoIHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ3N0cmluZycpIHtcclxuICAgIGlmICggdmFsdWUgPT09IHVuZGVmaW5lZClcclxuICAgICAgcmV0dXJuIG5vZGUuc3R5bGVbY2FtZWxpemUocHJvcGVydHkpXSB8fCBfZ2V0Q29tcHV0ZWRTdHlsZShub2RlKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KVxyXG4gICAgZWxzZVxyXG4gICAgICAocHJvcHMgPSB7fSlbcHJvcGVydHldID0gdmFsdWVcclxuICB9XHJcblxyXG4gIGZvcih2YXIga2V5IGluIHByb3BzKSBpZiAoIGhhcy5jYWxsKHByb3BzLCBrZXkpICkgXHJcbiAge1xyXG4gICAgIXByb3BzW2tleV0gJiYgcHJvcHNba2V5XSAhPT0gMFxyXG4gICAgICA/IHJlbW92ZVN0eWxlKG5vZGUuc3R5bGUsIGh5cGhlbmF0ZShrZXkpKVxyXG4gICAgICA6IChjc3MgKz0gaHlwaGVuYXRlKGtleSkgKyAnOicgKyBwcm9wc1trZXldICsgJzsnKVxyXG4gIH1cclxuXHJcbiAgbm9kZS5zdHlsZS5jc3NUZXh0ICs9ICc7JyArIGNzc1xyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZShzdHlsZXMsIGtleSl7XHJcbiAgcmV0dXJuICgncmVtb3ZlUHJvcGVydHknIGluIHN0eWxlcylcclxuICAgID8gc3R5bGVzLnJlbW92ZVByb3BlcnR5KGtleSlcclxuICAgIDogc3R5bGVzLnJlbW92ZUF0dHJpYnV0ZShrZXkpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9nZXRDb21wdXRlZFN0eWxlKG5vZGUpIHtcclxuICBpZiggIW5vZGUpIHRocm93IG5ldyBFcnJvcigpXHJcbiAgdmFyIGRvYyA9IG5vZGUub3duZXJEb2N1bWVudDtcclxuXHJcbiAgcmV0dXJuIFwiZGVmYXVsdFZpZXdcIiBpbiBkb2MgXHJcbiAgICA/IGRvYy5kZWZhdWx0Vmlldy5vcGVuZXJcclxuICAgICAgPyBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSggbm9kZSwgbnVsbCApXHJcbiAgICAgIDogd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSwgbnVsbClcclxuICAgIDogeyAvL2llIDggXCJtYWdpY1wiXHJcbiAgICAgICAgZ2V0UHJvcGVydHlWYWx1ZShwcm9wKSB7XHJcbiAgICAgICAgICB2YXIgcmUgPSAvKFxcLShbYS16XSl7MX0pL2c7XHJcbiAgICAgICAgICBpZiAocHJvcCA9PSAnZmxvYXQnKSBwcm9wID0gJ3N0eWxlRmxvYXQnO1xyXG4gICAgICAgICAgaWYgKHJlLnRlc3QocHJvcCkpXHJcbiAgICAgICAgICAgIHByb3AgPSBwcm9wLnJlcGxhY2UocmUsICguLi5hcmdzKSA9PiBhcmdzWzJdLnRvVXBwZXJDYXNlKCkpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgcmV0dXJuIG5vZGUuY3VycmVudFN0eWxlW3Byb3BdIHx8IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2RvbS9jc3MuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcbnZhciBjYW5Vc2VET00gPSByZXF1aXJlKCdyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnKS5jYW5Vc2VET01cclxuXHJcbnZhciBjb250YWlucyA9IChmdW5jdGlvbigpe1xyXG4gICAgdmFyIHJvb3QgPSBjYW5Vc2VET00gJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XHJcblxyXG4gICAgcmV0dXJuIChyb290ICYmIHJvb3QuY29udGFpbnMpXHJcbiAgICAgID8gZnVuY3Rpb24oY29udGV4dCwgbm9kZSl7IHJldHVybiBjb250ZXh0LmNvbnRhaW5zKG5vZGUpOyB9XHJcbiAgICAgIDogKHJvb3QgJiYgcm9vdC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbilcclxuICAgICAgICAgID8gZnVuY3Rpb24oY29udGV4dCwgbm9kZSl7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbnRleHQgPT09IG5vZGUgfHwgISEoY29udGV4dC5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihub2RlKSAmIDE2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgOiBmdW5jdGlvbihjb250ZXh0LCBub2RlKXtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIGRvIHtcclxuICAgICAgICAgICAgICBpZiAobm9kZSA9PT0gY29udGV4dCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gd2hpbGUgKChub2RlID0gbm9kZS5wYXJlbnROb2RlKSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgfSkoKVxyXG4gIFxyXG5tb2R1bGUuZXhwb3J0cyA9IGNvbnRhaW5zXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogRTovUHJvamVjdHMvcmVhY3Qtd2lkZ2V0cy9zcmMvdXRpbC9kb20vY29udGFpbnMuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgY3NzID0gcmVxdWlyZSgnLi9jc3MnKVxyXG4gICwgeyBoZWlnaHQgfSA9IHJlcXVpcmUoJy4vZGltZW5zaW9ucycpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNjcm9sbFByYXJlbnQobm9kZSl7XHJcbiAgdmFyIHBvc2l0aW9uID0gY3NzKG5vZGUsIFwicG9zaXRpb25cIiApXHJcbiAgICAsIGV4Y2x1ZGVTdGF0aWMgPSBwb3NpdGlvbiA9PT0gXCJhYnNvbHV0ZVwiXHJcbiAgICAsIG93bmVyRG9jID0gbm9kZS5vd25lckRvY3VtZW50O1xyXG5cclxuICBpZiAocG9zaXRpb24gPT09ICdmaXhlZCcpIFxyXG4gICAgcmV0dXJuIG93bmVyRG9jIHx8IGRvY3VtZW50XHJcblxyXG4gIHdoaWxlICggKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpICYmIG5vZGUubm9kZVR5cGUgIT09IDkpe1xyXG4gICAgXHJcbiAgICB2YXIgaXNTdGF0aWMgPSBleGNsdWRlU3RhdGljICYmIGNzcyhub2RlLCBcInBvc2l0aW9uXCIgKSA9PT0gXCJzdGF0aWNcIlxyXG4gICAgICAsIHN0eWxlICAgID0gY3NzKG5vZGUsICdvdmVyZmxvdycpIFxyXG4gICAgICAgICAgICAgICAgICsgY3NzKG5vZGUsICdvdmVyZmxvdy15JykgXHJcbiAgICAgICAgICAgICAgICAgKyBjc3Mobm9kZSwgJ292ZXJmbG93LXgnKTtcclxuXHJcbiAgICBpZiAoaXNTdGF0aWMpIGNvbnRpbnVlXHJcblxyXG4gICAgaWYgKCAoLyhhdXRvfHNjcm9sbCkvKS50ZXN0KHN0eWxlKSAmJiBoZWlnaHQobm9kZSkgPCBub2RlLnNjcm9sbEhlaWdodCApXHJcbiAgICAgIHJldHVybiBub2RlXHJcbiAgfVxyXG5cclxuICByZXR1cm4gZG9jdW1lbnRcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2RvbS9zY3JvbGxQYXJlbnQuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNjcm9sbFRvcChub2RlLCB2YWwpe1xyXG4gIHZhciB3aW4gPSBub2RlID09PSBub2RlLndpbmRvd1xyXG4gICAgPyBub2RlIDogbm9kZS5ub2RlVHlwZSA9PT0gOSAmJiBub2RlLmRlZmF1bHRWaWV3O1xyXG5cclxuICBpZiAoIHZhbCA9PT0gdW5kZWZpbmVkIClcclxuICAgIHJldHVybiB3aW4gXHJcbiAgICAgID8gKCdwYWdlWU9mZnNldCcgaW4gd2luKSBcclxuICAgICAgICA/IHdpbi5wYWdlWU9mZnNldFxyXG4gICAgICAgIDogd2luLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgXHJcbiAgICAgIDogbm9kZS5zY3JvbGxUb3A7XHJcbiAgXHJcbiAgaWYgKCB3aW4gKSBcclxuICAgIHdpbi5zY3JvbGxUbygoJ3BhZ2VYT2Zmc2V0JyBpbiB3aW4pIFxyXG4gICAgICA/IHdpbi5wYWdlWE9mZnNldCBcclxuICAgICAgOiB3aW4uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsIHZhbClcclxuICBlbHNlIFxyXG4gICAgbm9kZS5zY3JvbGxUb3AgPSB2YWxcclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIEU6L1Byb2plY3RzL3JlYWN0LXdpZGdldHMvc3JjL3V0aWwvZG9tL3Njcm9sbFRvcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBjYW5Vc2VET00gPSByZXF1aXJlKCdyZWFjdC9saWIvRXhlY3V0aW9uRW52aXJvbm1lbnQnKS5jYW5Vc2VET01cclxuICAsIGNhbmNlbCA9ICdjbGVhclRpbWVvdXQnXHJcbiAgLCByYWYgICAgPSBmYWxsYmFja1xyXG4gICwgY29tcGF0UmFmO1xyXG4gIFxyXG52YXIga2V5cyA9IFtcclxuICAgICAgICAnY2FuY2VsQW5pbWF0aW9uRnJhbWUnXHJcbiAgICAgICwgJ3dlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lJ1xyXG4gICAgICAsICdtb3pDYW5jZWxBbmltYXRpb25GcmFtZSdcclxuICAgICAgLCAnb0NhbmNlbEFuaW1hdGlvbkZyYW1lJ1xyXG4gICAgICAsICdtc0NhbmNlbEFuaW1hdGlvbkZyYW1lJ1xyXG4gICAgICBdO1xyXG5cclxuXHJcbmNvbXBhdFJhZiA9IGNiID0+IHJhZihjYilcclxuY29tcGF0UmFmLmNhbmNlbCA9IGlkID0+IHdpbmRvd1tjYW5jZWxdKGlkKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb21wYXRSYWZcclxuXHJcbmlmICggY2FuVXNlRE9NICkge1xyXG4gIHJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcclxuICAgICAgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxyXG4gICAgICB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbiAgICAgIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcbiAgICAgIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZVxyXG4gICAgICB8fCBmYWxsYmFjaztcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKVxyXG4gICAgaWYgKCBrZXlzW2ldIGluIHdpbmRvdyl7XHJcbiAgICAgIGNhbmNlbCA9IGtleXNbaV1cclxuICAgICAgYnJlYWtcclxuICAgIH1cclxufVxyXG5cclxuLyogaHR0cHM6Ly9naXRodWIuY29tL2NvbXBvbmVudC9yYWYgKi9cclxudmFyIHByZXYgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHJcbmZ1bmN0aW9uIGZhbGxiYWNrKGZuKSB7XHJcbiAgdmFyIGN1cnIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgLCBtcyA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnIgLSBwcmV2KSlcclxuICAgICwgcmVxID0gc2V0VGltZW91dChmbiwgbXMpXHJcbiAgcHJldiA9IGN1cnI7XHJcbiAgcmV0dXJuIHJlcTtcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2RvbS9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuanNcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcclxudmFyIGNhblVzZURPTSA9IHJlcXVpcmUoJ3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudCcpLmNhblVzZURPTVxyXG4gICwgaHlwaGVuYXRlID0gcmVxdWlyZSgncmVhY3QvbGliL2h5cGhlbmF0ZVN0eWxlTmFtZScpXHJcbiAgLCBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XHJcbiAgLCBjc3MgPSByZXF1aXJlKCcuL2NzcycpXHJcbiAgLCB7IFxyXG4gICAgb25cclxuICAsIG9mZiB9ID0gcmVxdWlyZSgnLi9ldmVudHMnKTtcclxuXHJcbnZhciBUUkFOU0xBVElPTl9NQVAgPSB7IFxyXG4gICAgICBsZWZ0OiAndHJhbnNsYXRlWCcsIHJpZ2h0OiAndHJhbnNsYXRlWCdcclxuICAgICwgdG9wOiAndHJhbnNsYXRlWScsIGJvdHRvbTogJ3RyYW5zbGF0ZVknfVxyXG5cclxudmFyIHJlc2V0ID0ge31cclxuICAsIHRyYW5zZm9ybSA9J3RyYW5zZm9ybSdcclxuICAsIHRyYW5zaXRpb24gPSB7fVxyXG4gICwgdHJhbnNpdGlvblRpbWluZywgdHJhbnNpdGlvbkR1cmF0aW9uXHJcbiAgLCB0cmFuc2l0aW9uUHJvcGVydHksIHRyYW5zaXRpb25EZWxheTtcclxuXHJcbmlmICggY2FuVXNlRE9NICkge1xyXG4gIHRyYW5zaXRpb24gPSBnZXRUcmFuc2l0aW9uUHJvcGVydGllcygpO1xyXG5cclxuICB0cmFuc2Zvcm0gPSB0cmFuc2l0aW9uLnByZWZpeCArIHRyYW5zZm9ybVxyXG5cclxuICByZXNldFt0cmFuc2l0aW9uUHJvcGVydHkgPSB0cmFuc2l0aW9uLnByZWZpeCArICd0cmFuc2l0aW9uLXByb3BlcnR5J10gPVxyXG4gIHJlc2V0W3RyYW5zaXRpb25EdXJhdGlvbiA9IHRyYW5zaXRpb24ucHJlZml4ICsgJ3RyYW5zaXRpb24tZHVyYXRpb24nXSA9XHJcbiAgcmVzZXRbdHJhbnNpdGlvbkRlbGF5ICAgID0gdHJhbnNpdGlvbi5wcmVmaXggKyAndHJhbnNpdGlvbi1kZWxheSddID1cclxuICByZXNldFt0cmFuc2l0aW9uVGltaW5nICAgPSB0cmFuc2l0aW9uLnByZWZpeCArICd0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbiddID0gJydcclxufVxyXG5cclxuYW5pbWF0ZS5lbmRFdmVudCA9IHRyYW5zaXRpb24uZW5kRXZlbnRcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYW5pbWF0ZVxyXG5cclxuLyogY29kZSBpbiBwYXJ0IGZyb206IFplcHRvIDEuMS40IHwgemVwdG9qcy5jb20vbGljZW5zZSAqL1xyXG4vLyBzdXBlciBsZWFuIGFuaW1hdGUgZnVuY3Rpb24gZm9yIHRyYW5zaXRpb25zXHJcbi8vIGRvZXNuJ3Qgc3VwcG9ydCBhbGwgdHJhbnNsYXRpb25zIHRvIGtlZXAgaXQgbWF0Y2hpbmcgdGhlIGpxdWVyeSBBUElcclxuZnVuY3Rpb24gYW5pbWF0ZShub2RlLCBwcm9wZXJ0aWVzLCBkdXJhdGlvbiwgZWFzaW5nLCBjYWxsYmFjayl7XHJcbiAgICB2YXIgY3NzUHJvcGVydGllcyA9IFtdXHJcbiAgICAgICwgZmFrZUV2ZW50ICA9IHsgdGFyZ2V0OiBub2RlLCBjdXJyZW50VGFyZ2V0OiBub2RlIH1cclxuICAgICAgLCBjc3NWYWx1ZXMgID0ge31cclxuICAgICAgLCB0cmFuc2Zvcm1zID0nJ1xyXG4gICAgICAsIGZpcmVkO1xyXG5cclxuICAgIGlmICggdHlwZW9mIGVhc2luZyA9PT0gJ2Z1bmN0aW9uJyApXHJcbiAgICAgIGNhbGxiYWNrID0gZWFzaW5nLCBlYXNpbmcgPSBudWxsXHJcblxyXG4gICAgaWYgKCAhdHJhbnNpdGlvbi5lbmRFdmVudCApICAgICAgICAgICAgICBkdXJhdGlvbiA9IDBcclxuICAgIGlmICggZHVyYXRpb24gPT09IHVuZGVmaW5lZCApIGR1cmF0aW9uID0gMjAwXHJcblxyXG4gICAgZm9yKHZhciBrZXkgaW4gcHJvcGVydGllcykgaWYgKCBoYXMuY2FsbChwcm9wZXJ0aWVzLCBrZXkpICkge1xyXG4gICAgICBpZiggLyh0b3B8Ym90dG9tKS8udGVzdChrZXkpICkgXHJcbiAgICAgICAgdHJhbnNmb3JtcyArPSBUUkFOU0xBVElPTl9NQVBba2V5XSArJygnICsgcHJvcGVydGllc1trZXldICsgJykgJ1xyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBjc3NWYWx1ZXNba2V5XSA9IHByb3BlcnRpZXNba2V5XVxyXG4gICAgICAgIGNzc1Byb3BlcnRpZXMucHVzaChoeXBoZW5hdGUoa2V5KSlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0cmFuc2Zvcm1zKSB7XHJcbiAgICAgIGNzc1ZhbHVlc1t0cmFuc2Zvcm1dID0gdHJhbnNmb3Jtc1xyXG4gICAgICBjc3NQcm9wZXJ0aWVzLnB1c2godHJhbnNmb3JtKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChkdXJhdGlvbiA+IDAgKSB7XHJcbiAgICAgIGNzc1ZhbHVlc1t0cmFuc2l0aW9uUHJvcGVydHldID0gY3NzUHJvcGVydGllcy5qb2luKCcsICcpXHJcbiAgICAgIGNzc1ZhbHVlc1t0cmFuc2l0aW9uRHVyYXRpb25dID0gKGR1cmF0aW9uIC8gMTAwMCkgKyAncydcclxuICAgICAgY3NzVmFsdWVzW3RyYW5zaXRpb25EZWxheV0gICAgPSAwICsgJ3MnXHJcbiAgICAgIGNzc1ZhbHVlc1t0cmFuc2l0aW9uVGltaW5nXSAgID0gZWFzaW5nIHx8ICdsaW5lYXInXHJcblxyXG4gICAgICBvbihub2RlLCB0cmFuc2l0aW9uLmVuZEV2ZW50LCBkb25lKVxyXG5cclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmICghZmlyZWQpIGRvbmUoZmFrZUV2ZW50KVxyXG4gICAgICB9LCBkdXJhdGlvbiArIDUwMClcclxuICAgIH1cclxuXHJcbiAgICAvLyB0cmlnZ2VyIHBhZ2UgcmVmbG93XHJcbiAgICBub2RlLmNsaWVudExlZnRcclxuICAgIGNzcyhub2RlLCBjc3NWYWx1ZXMpXHJcblxyXG4gICAgaWYgKGR1cmF0aW9uIDw9IDApXHJcbiAgICAgIHNldFRpbWVvdXQoZG9uZS5iaW5kKG51bGwsIGZha2VFdmVudCksIDApXHJcblxyXG4gICAgZnVuY3Rpb24gZG9uZShldmVudCkge1xyXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSBldmVudC5jdXJyZW50VGFyZ2V0KSByZXR1cm5cclxuXHJcbiAgICAgIGZpcmVkID0gdHJ1ZVxyXG4gICAgICBvZmYoZXZlbnQudGFyZ2V0LCB0cmFuc2l0aW9uLmVuZEV2ZW50LCBkb25lKVxyXG4gICAgICBcclxuICAgICAgY3NzKG5vZGUsIHJlc2V0KVxyXG5cclxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2suY2FsbCh0aGlzKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRUcmFuc2l0aW9uUHJvcGVydGllcygpe1xyXG4gIHZhciBlbmRFdmVudFxyXG4gICAgLCBwcmVmaXggPSAnJ1xyXG4gICAgLCB0cmFuc2l0aW9ucyA9IHtcclxuICAgICAgICBPOidvdHJhbnNpdGlvbmVuZCcsXHJcbiAgICAgICAgTW96Oid0cmFuc2l0aW9uZW5kJyxcclxuICAgICAgICBXZWJraXQ6J3dlYmtpdFRyYW5zaXRpb25FbmQnXHJcbiAgICAgIH07XHJcblxyXG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuXHJcbiAgZm9yKHZhciB2ZW5kb3IgaW4gdHJhbnNpdGlvbnMpIGlmKCBoYXMuY2FsbCh0cmFuc2l0aW9ucywgdmVuZG9yKSApXHJcbiAge1xyXG4gICAgaWYgKGVsZW1lbnQuc3R5bGVbdmVuZG9yICsgJ1RyYW5zaXRpb25Qcm9wZXJ0eSddICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcHJlZml4ID0gJy0nICsgdmVuZG9yLnRvTG93ZXJDYXNlKCkgKyAnLSdcclxuICAgICAgZW5kRXZlbnQgPSB0cmFuc2l0aW9uc1t2ZW5kb3JdO1xyXG4gICAgICBicmVha1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKCFlbmRFdmVudCAmJiBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb25Qcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgZW5kRXZlbnQgPSAndHJhbnNpdGlvbmVuZCdcclxuXHJcbiAgcmV0dXJuIHsgZW5kRXZlbnQsIHByZWZpeCB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2RvbS9hbmltYXRlLmpzXG4gKiovIiwiZnVuY3Rpb24gY2xhc3NOYW1lcygpIHtcblx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cdHZhciBjbGFzc2VzID0gW107XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGFyZyA9IGFyZ3NbaV07XG5cdFx0aWYgKCFhcmcpIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGFyZyB8fCAnbnVtYmVyJyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0fSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZW9mIGFyZykge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRpZiAoIWFyZy5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8ICFhcmdba2V5XSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG59XG5cbi8vIHNhZmVseSBleHBvcnQgY2xhc3NOYW1lcyBpbiBjYXNlIHRoZSBzY3JpcHQgaXMgaW5jbHVkZWQgZGlyZWN0bHkgb24gYSBwYWdlXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY2xhc3NuYW1lcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDY2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgTUlMSSBcdFx0PSAnbWlsbGlzZWNvbmRzJ1xyXG4gICwgU0VDT05EUyA9ICdzZWNvbmRzJ1xyXG4gICwgTUlOVVRFUyA9ICdtaW51dGVzJ1xyXG4gICwgSE9VUlMgXHQ9ICdob3VycydcclxuICAsIERBWSBcdFx0PSAnZGF5J1xyXG4gICwgV0VFSyBcdFx0PSAnd2VlaydcclxuICAsIE1PTlRIIFx0PSAnbW9udGgnXHJcbiAgLCBZRUFSIFx0XHQ9ICd5ZWFyJ1xyXG4gICwgREVDQURFICA9ICdkZWNhZGUnXHJcbiAgLCBDRU5UVVJZID0gJ2NlbnR1cnknO1xyXG5cclxuLy8gZnVuY3Rpb24gdGljayhkYXRlKXtcclxuLy8gXHR0aGlzLl9fdmFsX18gPSBkYXRlO1xyXG4vLyB9XHJcblxyXG52YXIgZGF0ZXMgPSBtb2R1bGUuZXhwb3J0cyA9IHtcclxuXHJcbiAgc3RhcnRPZldlZWs6IGZ1bmN0aW9uKGQpe1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfSxcclxuXHJcblx0YWRkOiBmdW5jdGlvbihkYXRlLCBudW0sIHVuaXQpIHtcclxuXHRcdGRhdGUgPSBuZXcgRGF0ZShkYXRlKVxyXG5cclxuXHRcdGlmICggdW5pdCA9PT0gTUlMSSApIFxyXG5cdFx0XHRyZXR1cm4gZGF0ZXMubWlsbGlzZWNvbmRzKGRhdGUsIGRhdGVzLm1pbGxpc2Vjb25kcyhkYXRlKSArIG51bSlcclxuXHJcblx0XHRlbHNlIGlmICggdW5pdCA9PT0gU0VDT05EUyApIFxyXG5cdFx0XHRyZXR1cm4gZGF0ZXMuc2Vjb25kcyhkYXRlLCBkYXRlcy5zZWNvbmRzKGRhdGUpICsgbnVtKVxyXG5cclxuXHRcdGVsc2UgaWYgKCB1bml0ID09PSBNSU5VVEVTICkgXHJcblx0XHRcdHJldHVybiBkYXRlcy5taW51dGVzKGRhdGUsIGRhdGVzLm1pbnV0ZXMoZGF0ZSkgKyBudW0pXHJcblxyXG5cdFx0ZWxzZSBpZiAoIHVuaXQgPT09IEhPVVJTICkgXHJcblx0XHRcdHJldHVybiBkYXRlcy5ob3VycyhkYXRlLCBkYXRlcy5ob3VycyhkYXRlKSArIG51bSlcclxuXHJcblx0XHRlbHNlIGlmICggdW5pdCA9PT0gREFZICkgXHJcblx0XHRcdHJldHVybiBkYXRlcy5kYXRlKGRhdGUsIGRhdGVzLmRhdGUoZGF0ZSkgKyBudW0pXHJcblx0XHRcclxuXHRcdGVsc2UgaWYgKCB1bml0ID09PSBXRUVLIClcclxuXHRcdFx0cmV0dXJuIGRhdGVzLmRhdGUoZGF0ZSwgZGF0ZXMuZGF0ZShkYXRlKSArICg3ICogbnVtKSkgXHJcblxyXG5cdFx0ZWxzZSBpZiAoIHVuaXQgPT09IE1PTlRIIClcclxuXHRcdFx0cmV0dXJuIG1vbnRoTWF0aChkYXRlLCBudW0pXHJcblxyXG5cdFx0ZWxzZSBpZiAoIHVuaXQgPT09IFlFQVIgKVxyXG5cdFx0XHRyZXR1cm4gZGF0ZXMueWVhcihkYXRlLCBkYXRlcy55ZWFyKGRhdGUpICsgbnVtKVxyXG5cclxuICAgIGVsc2UgaWYgKCB1bml0ID09PSBERUNBREUgKVxyXG4gICAgICByZXR1cm4gZGF0ZXMueWVhcihkYXRlLCBkYXRlcy55ZWFyKGRhdGUpICsgKG51bSAqIDEwKSlcclxuXHJcbiAgICBlbHNlIGlmICggdW5pdCA9PT0gQ0VOVFVSWSApXHJcbiAgICAgIHJldHVybiBkYXRlcy55ZWFyKGRhdGUsIGRhdGVzLnllYXIoZGF0ZSkgKyAobnVtICogMTAwKSlcclxuXHJcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHVuaXRzOiBcIicgKyB1bml0ICsgJ1wiJylcclxuXHR9LFxyXG5cclxuXHRzdWJ0cmFjdDogZnVuY3Rpb24oZGF0ZSwgbnVtLCB1bml0KSB7XHJcblx0XHRyZXR1cm4gZGF0ZXMuYWRkKGRhdGUsIC1udW0sIHVuaXQpXHJcblx0fSxcclxuXHJcblx0c3RhcnRPZjogZnVuY3Rpb24oZGF0ZSwgdW5pdCkge1xyXG4gICAgdmFyIGRlY2FkZSwgY2VudHVyeTtcclxuXHJcblx0XHRkYXRlID0gbmV3IERhdGUoZGF0ZSlcclxuXHJcblx0XHRzd2l0Y2ggKHVuaXQpIHtcclxuICAgICAgY2FzZSAnY2VudHVyeSc6XHJcbiAgICAgIGNhc2UgJ2RlY2FkZSc6XHJcblx0XHRcdGNhc2UgJ3llYXInOlxyXG4gICAgICAgICAgZGF0ZSA9IGRhdGVzLm1vbnRoKGRhdGUsIDApO1xyXG4gICAgICBjYXNlICdtb250aCc6XHJcbiAgICAgICAgICBkYXRlID0gZGF0ZXMuZGF0ZShkYXRlLCAxKTtcclxuICAgICAgY2FzZSAnd2Vlayc6XHJcbiAgICAgIGNhc2UgJ2RheSc6XHJcbiAgICAgICAgICBkYXRlID0gZGF0ZXMuaG91cnMoZGF0ZSwgMCk7XHJcbiAgICAgIGNhc2UgJ2hvdXJzJzpcclxuICAgICAgICAgIGRhdGUgPSBkYXRlcy5taW51dGVzKGRhdGUsIDApO1xyXG4gICAgICBjYXNlICdtaW51dGVzJzpcclxuICAgICAgICAgIGRhdGUgPSBkYXRlcy5zZWNvbmRzKGRhdGUsIDApO1xyXG4gICAgICBjYXNlICdzZWNvbmRzJzpcclxuICAgICAgICAgIGRhdGUgPSBkYXRlcy5taWxsaXNlY29uZHMoZGF0ZSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHVuaXQgPT09IERFQ0FERSkgXHJcbiAgICAgIGRhdGUgPSBkYXRlcy5zdWJ0cmFjdChkYXRlLCBkYXRlcy55ZWFyKGRhdGUpICUgMTAsICd5ZWFyJylcclxuICAgIFxyXG4gICAgaWYgKHVuaXQgPT09IENFTlRVUlkpIFxyXG4gICAgICBkYXRlID0gZGF0ZXMuc3VidHJhY3QoZGF0ZSwgZGF0ZXMueWVhcihkYXRlKSAlIDEwMCwgJ3llYXInKVxyXG5cclxuICAgIGlmICh1bml0ID09PSBXRUVLKSBcclxuICAgIFx0ZGF0ZSA9IGRhdGVzLndlZWtkYXkoZGF0ZSwgMCk7XHJcblxyXG4gICAgcmV0dXJuIGRhdGVcclxuXHR9LFxyXG5cclxuXHJcblx0ZW5kT2Y6IGZ1bmN0aW9uKGRhdGUsIHVuaXQpe1xyXG5cdFx0ZGF0ZSA9IG5ldyBEYXRlKGRhdGUpXHJcblx0XHRkYXRlID0gZGF0ZXMuc3RhcnRPZihkYXRlLCB1bml0KVxyXG5cdFx0ZGF0ZSA9IGRhdGVzLmFkZChkYXRlLCAxLCB1bml0KVxyXG5cdFx0ZGF0ZSA9IGRhdGVzLnN1YnRyYWN0KGRhdGUsIDEsIE1JTEkpXHJcblx0XHRyZXR1cm4gZGF0ZVxyXG5cdH0sXHJcblxyXG5cdGVxOiBjcmVhdGVDb21wYXJlcihmdW5jdGlvbihhLCBiKXtcclxuXHRcdHJldHVybiBhID09PSBiXHJcblx0fSksXHJcblxyXG5cdGd0OiBjcmVhdGVDb21wYXJlcihmdW5jdGlvbihhLCBiKXtcclxuXHRcdHJldHVybiBhID4gYlxyXG5cdH0pLFxyXG5cclxuXHRndGU6IGNyZWF0ZUNvbXBhcmVyKGZ1bmN0aW9uKGEsIGIpe1xyXG5cdFx0cmV0dXJuIGEgPj0gYlxyXG5cdH0pLFxyXG5cclxuXHRsdDogY3JlYXRlQ29tcGFyZXIoZnVuY3Rpb24oYSwgYil7XHJcblx0XHRyZXR1cm4gYSA8IGJcclxuXHR9KSxcclxuXHJcblx0bHRlOiBjcmVhdGVDb21wYXJlcihmdW5jdGlvbihhLCBiKXtcclxuXHRcdHJldHVybiBhIDw9IGJcclxuXHR9KSxcclxuXHJcbiAgbWluOiBmdW5jdGlvbigpe1xyXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG5cclxuICAgIHJldHVybiBuZXcgRGF0ZShNYXRoLm1pbi5hcHBseShNYXRoLCBhcmdzKSlcclxuICB9LFxyXG5cclxuICBtYXg6IGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBEYXRlKE1hdGgubWF4LmFwcGx5KE1hdGgsIGFyZ3MpKVxyXG4gIH0sXHJcbiAgXHJcbiAgaW5SYW5nZTogZnVuY3Rpb24oZGF5LCBtaW4sIG1heCwgdW5pdCl7XHJcbiAgICB1bml0ID0gdW5pdCB8fCAnZGF5J1xyXG5cclxuICAgIHJldHVybiAoIW1pbiB8fCBkYXRlcy5ndGUoZGF5LCBtaW4sIHVuaXQpKVxyXG4gICAgICAgICYmICghbWF4IHx8IGRhdGVzLmx0ZShkYXksIG1heCwgdW5pdCkpXHJcbiAgfSxcclxuXHJcblx0bWlsbGlzZWNvbmRzOiBcdGNyZWF0ZUFjY2Vzc29yKCdNaWxsaXNlY29uZHMnKSxcclxuXHRzZWNvbmRzOiBcdFx0XHRcdGNyZWF0ZUFjY2Vzc29yKCdTZWNvbmRzJyksXHJcblx0bWludXRlczogXHRcdFx0XHRjcmVhdGVBY2Nlc3NvcignTWludXRlcycpLFxyXG5cdGhvdXJzOiBcdFx0XHRcdFx0Y3JlYXRlQWNjZXNzb3IoJ0hvdXJzJyksXHJcblx0ZGF5OiBcdFx0XHRcdFx0XHRjcmVhdGVBY2Nlc3NvcignRGF5JyksXHJcblx0ZGF0ZTogXHRcdFx0XHRcdGNyZWF0ZUFjY2Vzc29yKCdEYXRlJyksXHJcblx0bW9udGg6IFx0XHRcdFx0XHRjcmVhdGVBY2Nlc3NvcignTW9udGgnKSxcclxuXHR5ZWFyOiBcdFx0XHRcdFx0Y3JlYXRlQWNjZXNzb3IoJ0Z1bGxZZWFyJyksXHJcblxyXG4gIGRlY2FkZTogZnVuY3Rpb24gKGRhdGUsIHZhbCkge1xyXG4gICAgcmV0dXJuIHZhbCA9PSB1bmRlZmluZWQgXHJcbiAgICAgID8gZGF0ZXMueWVhcihkYXRlcy5zdGFydE9mKGRhdGUsIERFQ0FERSkpXHJcbiAgICAgIDogZGF0ZXMuYWRkKGRhdGUsIHZhbCArIDEwLCBZRUFSKTtcclxuICB9LFxyXG5cclxuICBjZW50dXJ5OiBmdW5jdGlvbiAoZGF0ZSwgdmFsKSB7XHJcbiAgICByZXR1cm4gdmFsID09IHVuZGVmaW5lZCBcclxuICAgICAgPyBkYXRlcy55ZWFyKGRhdGVzLnN0YXJ0T2YoZGF0ZSwgQ0VOVFVSWSkpXHJcbiAgICAgIDogZGF0ZXMuYWRkKGRhdGUsIHZhbCArIDEwMCwgWUVBUik7XHJcbiAgfSxcclxuXHJcblx0d2Vla2RheTogZnVuY3Rpb24gKGRhdGUsIHZhbCkge1xyXG4gICAgICB2YXIgd2Vla2RheSA9IChkYXRlcy5kYXkoZGF0ZSkgKyA3IC0gZGF0ZXMuc3RhcnRPZldlZWsoKSApICUgNztcclxuXHJcbiAgICAgIHJldHVybiB2YWwgPT0gdW5kZWZpbmVkIFxyXG4gICAgICAgID8gd2Vla2RheSBcclxuICAgICAgICA6IGRhdGVzLmFkZChkYXRlLCB2YWwgLSB3ZWVrZGF5LCBEQVkpO1xyXG4gIH0sXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBtb250aE1hdGgoZGF0ZSwgdmFsKXtcclxuXHR2YXIgY3VycmVudCA9IGRhdGVzLm1vbnRoKGRhdGUpXHJcblx0ICAsIG5ld01vbnRoICA9IChjdXJyZW50ICsgdmFsKTtcclxuXHJcbiAgXHRkYXRlID0gZGF0ZXMubW9udGgoZGF0ZSwgbmV3TW9udGgpXHJcblxyXG4gIFx0aWYgKG5ld01vbnRoIDwgMCApIG5ld01vbnRoID0gMTIgKyB2YWxcclxuICBcdFx0XHJcbiAgXHQvL21vbnRoIHJvbGxvdmVyXHJcbiAgXHRpZiAoIGRhdGVzLm1vbnRoKGRhdGUpICE9PSAoIG5ld01vbnRoICUgMTIpKVxyXG4gIFx0XHRkYXRlID0gZGF0ZXMuZGF0ZShkYXRlLCAwKSAvL21vdmUgdG8gbGFzdCBvZiBtb250aFxyXG5cclxuICBcdHJldHVybiBkYXRlXHJcbn1cclxuXHJcbi8vTE9DQUxJWkFUSU9OXHJcblxyXG5cclxuZnVuY3Rpb24gY3JlYXRlQWNjZXNzb3IobWV0aG9kKXtcclxuXHRtZXRob2QgPSBtZXRob2QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBtZXRob2Quc3Vic3RyKDEpXHJcblxyXG5cdHJldHVybiBmdW5jdGlvbihkYXRlLCB2YWwpe1xyXG5cdFx0aWYgKHZhbCA9PT0gdW5kZWZpbmVkKVxyXG5cdFx0XHRyZXR1cm4gZGF0ZVsnZ2V0JyArIG1ldGhvZF0oKVxyXG5cclxuXHRcdGRhdGUgPSBuZXcgRGF0ZShkYXRlKVxyXG5cdFx0ZGF0ZVsnc2V0JyArIG1ldGhvZF0odmFsKVxyXG5cdFx0cmV0dXJuIGRhdGVcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBhcmVyKG9wZXJhdG9yKSB7XHJcblxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCB1bml0KSB7XHJcbiAgICAgICAgcmV0dXJuIG9wZXJhdG9yKCtkYXRlcy5zdGFydE9mKGEsIHVuaXQpLCArIGRhdGVzLnN0YXJ0T2YoYiwgdW5pdCkpXHJcbiAgICB9O1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2RhdGUtYXJpdGhtZXRpYy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDY3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBiYWJlbEhlbHBlcnMgPSByZXF1aXJlKFwiLi91dGlsL2JhYmVsSGVscGVycy5qc1wiKTtcbnZhciBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKFwicmVhY3QvbGliL2ludmFyaWFudFwiKTtcblxuZnVuY3Rpb24gY3VzdG9tUHJvcFR5cGUoaGFuZGxlciwgcHJvcFR5cGUpIHtcblxuICByZXR1cm4gZnVuY3Rpb24gKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24pIHtcblxuICAgIGlmIChwcm9wc1twcm9wTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCFwcm9wc1toYW5kbGVyXSkgcmV0dXJuIG5ldyBFcnJvcihcIllvdSBoYXZlIHByb3ZpZGVkIGEgYFwiICsgcHJvcE5hbWUgKyBcImAgcHJvcCB0byBcIiArIFwiYFwiICsgY29tcG9uZW50TmFtZSArIFwiYCB3aXRob3V0IGFuIGBcIiArIGhhbmRsZXIgKyBcImAgaGFuZGxlci4gVGhpcyB3aWxsIHJlbmRlciBhIHJlYWQtb25seSBmaWVsZC4gXCIgKyBcIklmIHRoZSBmaWVsZCBzaG91bGQgYmUgbXV0YWJsZSB1c2UgYFwiICsgZGVmYXVsdEtleShwcm9wTmFtZSkgKyBcImAuIE90aGVyd2lzZSwgc2V0IGBcIiArIGhhbmRsZXIgKyBcImBcIik7XG5cbiAgICAgIHJldHVybiBwcm9wVHlwZSAmJiBwcm9wVHlwZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciB2ZXJzaW9uID0gUmVhY3QudmVyc2lvbi5zcGxpdChcIi5cIikubWFwKHBhcnNlRmxvYXQpO1xuXG5mdW5jdGlvbiBnZXRUeXBlKGNvbXBvbmVudCkge1xuICBpZiAodmVyc2lvblswXSA9PT0gMCAmJiB2ZXJzaW9uWzFdID49IDEzKSByZXR1cm4gY29tcG9uZW50O1xuXG4gIHJldHVybiBjb21wb25lbnQudHlwZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ29tcG9uZW50LCBjb250cm9sbGVkVmFsdWVzLCB0YXBzKSB7XG4gIHZhciB0eXBlcyA9IHt9O1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgZ2V0VHlwZShDb21wb25lbnQpLnByb3BUeXBlcykge1xuICAgIHR5cGVzID0gdHJhbnNmb3JtKGNvbnRyb2xsZWRWYWx1ZXMsIGZ1bmN0aW9uIChvYmosIGhhbmRsZXIsIHByb3ApIHtcbiAgICAgIHZhciB0eXBlID0gZ2V0VHlwZShDb21wb25lbnQpLnByb3BUeXBlc1twcm9wXTtcblxuICAgICAgaW52YXJpYW50KHR5cGVvZiBoYW5kbGVyID09PSBcInN0cmluZ1wiICYmIGhhbmRsZXIudHJpbSgpLmxlbmd0aCwgXCJVbmNvbnRyb2xsYWJsZSAtIFslc106IHRoZSBwcm9wIGAlc2AgbmVlZHMgYSB2YWxpZCBoYW5kbGVyIGtleSBuYW1lIGluIG9yZGVyIHRvIG1ha2UgaXQgdW5jb250cm9sbGFibGVcIiwgQ29tcG9uZW50LmRpc3BsYXlOYW1lLCBwcm9wKTtcblxuICAgICAgb2JqW3Byb3BdID0gY3VzdG9tUHJvcFR5cGUoaGFuZGxlciwgdHlwZSk7XG4gICAgICBvYmpbZGVmYXVsdEtleShwcm9wKV0gPSB0eXBlO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHRhcHMgPSB0YXBzIHx8IHt9O1xuXG4gIHJldHVybiBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgICBkaXNwbGF5TmFtZTogQ29tcG9uZW50LmRpc3BsYXlOYW1lLFxuXG4gICAgcHJvcFR5cGVzOiB0eXBlcyxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHByb3BzID0gdGhpcy5wcm9wcyxcbiAgICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMoY29udHJvbGxlZFZhbHVlcyk7XG5cbiAgICAgIHJldHVybiB0cmFuc2Zvcm0oa2V5cywgZnVuY3Rpb24gKHN0YXRlLCBrZXkpIHtcbiAgICAgICAgc3RhdGVba2V5XSA9IHByb3BzW2RlZmF1bHRLZXkoa2V5KV07XG4gICAgICB9LCB7fSk7XG4gICAgfSxcblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgLy9sZXQgdGhlIHNldFN0YXRlIHRyaWdnZXIgdGhlIHVwZGF0ZVxuICAgICAgcmV0dXJuICF0aGlzLl9ub3RpZnlpbmcgfHwgIXRoaXMuX25vdGlmeWluZy5sZW5ndGg7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIHByb3BzID0ge307XG5cbiAgICAgIGVhY2goY29udHJvbGxlZFZhbHVlcywgZnVuY3Rpb24gKGhhbmRsZSwgcHJvcCkge1xuXG4gICAgICAgIHByb3BzW3Byb3BdID0gaXNQcm9wKF90aGlzLnByb3BzLCBwcm9wKSA/IF90aGlzLnByb3BzW3Byb3BdIDogX3RoaXMuc3RhdGVbcHJvcF07XG5cbiAgICAgICAgcHJvcHNbaGFuZGxlXSA9IHNldEFuZE5vdGlmeS5iaW5kKF90aGlzLCBwcm9wKTtcbiAgICAgIH0pO1xuXG4gICAgICBwcm9wcyA9IGJhYmVsSGVscGVycy5fZXh0ZW5kcyh7fSwgdGhpcy5wcm9wcywgcHJvcHMpO1xuXG4gICAgICBlYWNoKHRhcHMsIGZ1bmN0aW9uICh2YWwsIGtleSkge1xuICAgICAgICByZXR1cm4gcHJvcHNba2V5XSA9IGNoYWluKF90aGlzLCB2YWwsIHByb3BzW2tleV0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudCwgcHJvcHMpO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2V0QW5kTm90aWZ5KHByb3AsIHZhbHVlKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgaGFuZGxlciA9IGNvbnRyb2xsZWRWYWx1ZXNbcHJvcF0sXG4gICAgICAgIGNvbnRyb2xsZWQgPSBoYW5kbGVyICYmIGlzUHJvcCh0aGlzLnByb3BzLCBwcm9wKSxcbiAgICAgICAgYXJncztcblxuICAgIGlmICh0aGlzLnByb3BzW2hhbmRsZXJdKSB7XG4gICAgICB0aGlzLl9ub3RpZnlpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5wcm9wc1toYW5kbGVyXS5hcHBseSh0aGlzLCBbdmFsdWVdLmNvbmNhdChhcmdzKSk7XG4gICAgICB0aGlzLl9ub3RpZnlpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3NldFN0YXRlID0ge307XG4gICAgICBfc2V0U3RhdGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiBfc2V0U3RhdGU7XG4gICAgfSkoKSk7XG5cbiAgICByZXR1cm4gIWNvbnRyb2xsZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBpc1Byb3AocHJvcHMsIHByb3ApIHtcbiAgICByZXR1cm4gcHJvcHNbcHJvcF0gIT09IHVuZGVmaW5lZDtcbiAgfVxufTtcblxuZnVuY3Rpb24gZGVmYXVsdEtleShrZXkpIHtcbiAgcmV0dXJuIFwiZGVmYXVsdFwiICsga2V5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsga2V5LnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gY2hhaW4odGhpc0FyZywgYSwgYikge1xuICByZXR1cm4gZnVuY3Rpb24gY2hhaW5lZEZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGEgJiYgYS5hcHBseSh0aGlzQXJnLCBbXS5jb25jYXQoYXJncykpO1xuICAgIGIgJiYgYi5hcHBseSh0aGlzQXJnLCBbXS5jb25jYXQoYXJncykpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm0ob2JqLCBjYiwgc2VlZCkge1xuICBlYWNoKG9iaiwgY2IuYmluZChudWxsLCBzZWVkID0gc2VlZCB8fCAoQXJyYXkuaXNBcnJheShvYmopID8gW10gOiB7fSkpKTtcbiAgcmV0dXJuIHNlZWQ7XG59XG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBjYiwgdGhpc0FyZykge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSByZXR1cm4gb2JqLmZvckVhY2goY2IsIHRoaXNBcmcpO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChoYXMob2JqLCBrZXkpKSBjYi5jYWxsKHRoaXNBcmcsIG9ialtrZXldLCBrZXksIG9iaik7XG59XG5cbmZ1bmN0aW9uIGhhcyhvLCBrKSB7XG4gIHJldHVybiBvID8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIGspIDogZmFsc2U7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdW5jb250cm9sbGFibGUvbGliL3VuY29udHJvbGxhYmxlLmpzXG4gKiogbW9kdWxlIGlkID0gNjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBpbnZhcmlhbnRcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIGludmFyaWFudCA9IGZ1bmN0aW9uKGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArXG4gICAgICAgICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLidcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICAnSW52YXJpYW50IFZpb2xhdGlvbjogJyArXG4gICAgICAgIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107IH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvaW52YXJpYW50LmpzXG4gKiogbW9kdWxlIGlkID0gNjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgT2JqZWN0LmFzc2lnblxuICovXG5cbi8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1vYmplY3QuYXNzaWduXG5cbmZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZXMpIHtcbiAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiB0YXJnZXQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cblxuICB2YXIgdG8gPSBPYmplY3QodGFyZ2V0KTtcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICBmb3IgKHZhciBuZXh0SW5kZXggPSAxOyBuZXh0SW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBuZXh0SW5kZXgrKykge1xuICAgIHZhciBuZXh0U291cmNlID0gYXJndW1lbnRzW25leHRJbmRleF07XG4gICAgaWYgKG5leHRTb3VyY2UgPT0gbnVsbCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGZyb20gPSBPYmplY3QobmV4dFNvdXJjZSk7XG5cbiAgICAvLyBXZSBkb24ndCBjdXJyZW50bHkgc3VwcG9ydCBhY2Nlc3NvcnMgbm9yIHByb3hpZXMuIFRoZXJlZm9yZSB0aGlzXG4gICAgLy8gY29weSBjYW5ub3QgdGhyb3cuIElmIHdlIGV2ZXIgc3VwcG9ydGVkIHRoaXMgdGhlbiB3ZSBtdXN0IGhhbmRsZVxuICAgIC8vIGV4Y2VwdGlvbnMgYW5kIHNpZGUtZWZmZWN0cy4gV2UgZG9uJ3Qgc3VwcG9ydCBzeW1ib2xzIHNvIHRoZXkgd29uJ3RcbiAgICAvLyBiZSB0cmFuc2ZlcnJlZC5cblxuICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG4gICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRvO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ247XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvT2JqZWN0LmFzc2lnbi5qc1xuICoqIG1vZHVsZSBpZCA9IDcwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcclxuICogQSBzdHJlYW1saW5lZCB2ZXJzaW9uIG9mIFRyYW5zaXRpb25Hcm91cCBidWlsdCBmb3IgbWFuYWdpbmcgYXQgbW9zdCB0d28gYWN0aXZlIGNoaWxkcmVuXHJcbiAqIGFsc28gcHJvdmlkZXMgYWRkaXRpb25hbCBob29rcyBmb3IgYW5pbWF0aW9uIHN0YXJ0L2VuZFxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9tYXN0ZXIvc3JjL2FkZG9ucy90cmFuc2l0aW9ucy9SZWFjdFRyYW5zaXRpb25Hcm91cC5qc1xyXG4gKiByZWxldmVudCBjb2RlIGlzIGxpY2Vuc2VkIGFjY29yZGluZ2x5IFxyXG4gKi9cclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxyXG4gICwgJCAgICAgPSByZXF1aXJlKCcuL3V0aWwvZG9tJylcclxuICAsIF8gICAgID0gcmVxdWlyZSgnLi91dGlsL18nKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG5cclxuICBkaXNwbGF5TmFtZTogJ1JlcGxhY2VUcmFuc2l0aW9uR3JvdXAnLFxyXG5cclxuICBwcm9wVHlwZXM6IHtcclxuICAgIGNvbXBvbmVudDogICAgUmVhY3QuUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLmVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuUHJvcFR5cGVzLnN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICBdKSxcclxuICAgIGNoaWxkRmFjdG9yeTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcblxyXG4gICAgb25BbmltYXRpbmc6ICBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcclxuICAgIG9uQW5pbWF0ZTogICAgUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXHJcbiAgfSxcclxuXHJcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNvbXBvbmVudDogICAgJ3NwYW4nLFxyXG4gICAgICBjaGlsZEZhY3Rvcnk6IGZ1bmN0aW9uKGEpeyByZXR1cm4gYSB9LFxyXG5cclxuICAgICAgb25BbmltYXRpbmc6IF8ubm9vcCxcclxuICAgICAgb25BbmltYXRlOiAgIF8ubm9vcFxyXG4gICAgfTtcclxuICB9LFxyXG5cclxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2hpbGRyZW46IF8uc3BsYXQodGhpcy5wcm9wcy5jaGlsZHJlbilcclxuICAgIH07XHJcbiAgfSxcclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICB2YXIgbmV4dENoaWxkID0gZ2V0Q2hpbGQobmV4dFByb3BzLmNoaWxkcmVuKVxyXG4gICAgICAsIHN0YWNrICAgICA9IHRoaXMuc3RhdGUuY2hpbGRyZW4uc2xpY2UoKVxyXG4gICAgICAsIG5leHQgICAgICA9IHN0YWNrWzFdXHJcbiAgICAgICwgbGFzdCAgICAgID0gc3RhY2tbMF07XHJcblxyXG4gICAgdmFyIGlzTGFzdENoaWxkID0gbGFzdCAmJiBrZXkobGFzdCkgPT09IGtleShuZXh0Q2hpbGQpXHJcbiAgICAgICwgaXNOZXh0Q2hpbGQgPSBuZXh0ICYmIGtleShuZXh0KSA9PT0ga2V5KG5leHRDaGlsZCk7XHJcblxyXG4gICAgLy9ubyBjaGlsZHJlblxyXG4gICAgaWYgKCFsYXN0KSB7XHJcbiAgICAgIHN0YWNrLnB1c2gobmV4dENoaWxkKVxyXG4gICAgICB0aGlzLmVudGVyaW5nID0gbmV4dENoaWxkXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICggbGFzdCAmJiAhbmV4dCAmJiAhaXNMYXN0Q2hpbGQpIHtcclxuICAgICAgLy9uZXcgY2hpbGRcclxuICAgICAgc3RhY2sucHVzaChuZXh0Q2hpbGQpXHJcbiAgICAgIHRoaXMubGVhdmluZyAgPSBsYXN0IFxyXG4gICAgICB0aGlzLmVudGVyaW5nID0gbmV4dENoaWxkXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICggbGFzdCAmJiBuZXh0ICYmICFpc0xhc3RDaGlsZCAmJiAhaXNOZXh0Q2hpbGQpIHtcclxuICAgICAgLy8gdGhlIGNoaWxkIGlzIG5vdCB0aGUgY3VycmVudCBvbmUsIGV4aXQgdGhlIGN1cnJlbnQgb25lLCBhZGQgdGhlIG5ldyBvbmVcclxuICAgICAgLy8gIC0gc2hpZnQgdGhlIHN0YWNrIGRvd25cclxuICAgICAgc3RhY2suc2hpZnQoKVxyXG4gICAgICBzdGFjay5wdXNoKG5leHRDaGlsZClcclxuICAgICAgdGhpcy5sZWF2aW5nICA9IG5leHRcclxuICAgICAgdGhpcy5lbnRlcmluZyA9IG5leHRDaGlsZFxyXG4gICAgfVxyXG4gICAgLy9uZXcgY2hpbGQgdGhhdCBqdXN0IG5lZWRzIHRvIGJlIHJlLXJlbmRlcmVkXHJcbiAgICBlbHNlIGlmIChpc0xhc3RDaGlsZCkgc3RhY2suc3BsaWNlKDAsIDEsIG5leHRDaGlsZCkgXHJcbiAgICBlbHNlIGlmIChpc05leHRDaGlsZCkgc3RhY2suc3BsaWNlKDEsIDEsIG5leHRDaGlsZClcclxuXHJcbiAgICBpZiggdGhpcy5zdGF0ZS5jaGlsZHJlblswXSAhPT0gc3RhY2tbMF0gfHwgdGhpcy5zdGF0ZS5jaGlsZHJlblsxXSAhPT0gc3RhY2tbMV0gKSBcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNoaWxkcmVuOiBzdGFjayB9KTtcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5hbmltYXRpbmdLZXlzID0ge307XHJcbiAgICB0aGlzLmxlYXZpbmcgID0gbnVsbDtcclxuICAgIHRoaXMuZW50ZXJpbmcgPSBudWxsO1xyXG4gIH0sXHJcblxyXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgZW50ZXJpbmcgPSB0aGlzLmVudGVyaW5nXHJcbiAgICAgICwgbGVhdmluZyAgPSB0aGlzLmxlYXZpbmdcclxuICAgICAgLCBmaXJzdCAgICA9IHRoaXMucmVmc1trZXkoZW50ZXJpbmcpIHx8IGtleShsZWF2aW5nKV1cclxuICAgICAgLCBub2RlICAgICA9IHRoaXMuZ2V0RE9NTm9kZSgpXHJcbiAgICAgICwgZWwgICAgICAgPSBmaXJzdCAmJiBmaXJzdC5nZXRET01Ob2RlKCk7XHJcblxyXG4gICAgaWYoIGVsIClcclxuICAgICAgJC5jc3Mobm9kZSwge1xyXG4gICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcclxuICAgICAgICBoZWlnaHQ6ICQuaGVpZ2h0KGVsKSArICdweCcsXHJcbiAgICAgICAgd2lkdGg6ICAkLndpZHRoKGVsKSArICdweCdcclxuICAgICAgfSlcclxuICAgIFxyXG4gICAgdGhpcy5wcm9wcy5vbkFuaW1hdGluZygpO1xyXG5cclxuICAgIHRoaXMuZW50ZXJpbmcgPSBudWxsO1xyXG4gICAgdGhpcy5sZWF2aW5nICA9IG51bGw7XHJcblxyXG4gICAgaWYgKGVudGVyaW5nKSB0aGlzLnBlcmZvcm1FbnRlcihrZXkoZW50ZXJpbmcpKVxyXG4gICAgaWYgKGxlYXZpbmcpICB0aGlzLnBlcmZvcm1MZWF2ZShrZXkobGVhdmluZykpXHJcbiAgfSxcclxuXHJcbiAgcGVyZm9ybUVudGVyOiBmdW5jdGlvbihrZXkpIHtcclxuICAgIHZhciBjb21wb25lbnQgPSB0aGlzLnJlZnNba2V5XVxyXG5cclxuICAgIGlmKCFjb21wb25lbnQpIHJldHVyblxyXG5cclxuICAgIHRoaXMuYW5pbWF0aW5nS2V5c1trZXldID0gdHJ1ZVxyXG5cclxuICAgIGlmIChjb21wb25lbnQuY29tcG9uZW50V2lsbEVudGVyKSBcclxuICAgICAgY29tcG9uZW50LmNvbXBvbmVudFdpbGxFbnRlcihcclxuICAgICAgICB0aGlzLl9oYW5kbGVEb25lRW50ZXJpbmcuYmluZCh0aGlzLCBrZXkpKVxyXG4gICAgZWxzZSBcclxuICAgICAgdGhpcy5faGFuZGxlRG9uZUVudGVyaW5nKGtleSlcclxuICB9LFxyXG5cclxuICBfdHJ5RmluaXNoOiBmdW5jdGlvbigpe1xyXG5cclxuICAgIGlmICggdGhpcy5pc1RyYW5zaXRpb25pbmcoKSApXHJcbiAgICAgIHJldHVybiBcclxuXHJcbiAgICBpZiAoIHRoaXMuaXNNb3VudGVkKCkgKVxyXG4gICAgICAkLmNzcyh0aGlzLmdldERPTU5vZGUoKSwgeyBvdmVyZmxvdzogJ3Zpc2libGUnLCBoZWlnaHQ6ICcnLCB3aWR0aDogJycgfSlcclxuXHJcbiAgICB0aGlzLnByb3BzLm9uQW5pbWF0ZSgpIFxyXG4gIH0sIFxyXG5cclxuICBfaGFuZGxlRG9uZUVudGVyaW5nOiBmdW5jdGlvbihlbnRlcmtleSkge1xyXG4gICAgdmFyIGNvbXBvbmVudCA9IHRoaXMucmVmc1tlbnRlcmtleV07XHJcblxyXG4gICAgaWYgKGNvbXBvbmVudCAmJiBjb21wb25lbnQuY29tcG9uZW50RGlkRW50ZXIpIFxyXG4gICAgICBjb21wb25lbnQuY29tcG9uZW50RGlkRW50ZXIoKVxyXG4gICAgXHJcbiAgICBkZWxldGUgdGhpcy5hbmltYXRpbmdLZXlzW2VudGVya2V5XVxyXG5cclxuICAgIGlmICgga2V5KHRoaXMucHJvcHMuY2hpbGRyZW4pICE9PSBlbnRlcmtleSkgXHJcbiAgICAgIHRoaXMucGVyZm9ybUxlYXZlKGVudGVya2V5KSAvLyBUaGlzIHdhcyByZW1vdmVkIGJlZm9yZSBpdCBoYWQgZnVsbHkgZW50ZXJlZC4gUmVtb3ZlIGl0LlxyXG4gICAgXHJcbiAgICB0aGlzLl90cnlGaW5pc2goKVxyXG4gIH0sXHJcblxyXG4gIGlzVHJhbnNpdGlvbmluZzogZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmFuaW1hdGluZ0tleXMpLmxlbmd0aCAhPT0gMFxyXG4gIH0sXHJcblxyXG4gIHBlcmZvcm1MZWF2ZTogZnVuY3Rpb24oa2V5KSB7XHJcbiAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5yZWZzW2tleV1cclxuXHJcbiAgICBpZighY29tcG9uZW50KSByZXR1cm5cclxuXHJcbiAgICB0aGlzLmFuaW1hdGluZ0tleXNba2V5XSA9IHRydWVcclxuXHJcbiAgICBpZiAoY29tcG9uZW50LmNvbXBvbmVudFdpbGxMZWF2ZSkgXHJcbiAgICAgIGNvbXBvbmVudC5jb21wb25lbnRXaWxsTGVhdmUodGhpcy5faGFuZGxlRG9uZUxlYXZpbmcuYmluZCh0aGlzLCBrZXkpKTtcclxuICAgIGVsc2UgXHJcbiAgICAgIHRoaXMuX2hhbmRsZURvbmVMZWF2aW5nKGtleSlcclxuICB9LFxyXG5cclxuICBfaGFuZGxlRG9uZUxlYXZpbmc6IGZ1bmN0aW9uKGxlYXZla2V5KSB7XHJcbiAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5yZWZzW2xlYXZla2V5XTtcclxuXHJcbiAgICBpZiAoY29tcG9uZW50ICYmIGNvbXBvbmVudC5jb21wb25lbnREaWRMZWF2ZSkgXHJcbiAgICAgIGNvbXBvbmVudC5jb21wb25lbnREaWRMZWF2ZSgpXHJcbiAgICBcclxuICAgIGRlbGV0ZSB0aGlzLmFuaW1hdGluZ0tleXNbbGVhdmVrZXldXHJcblxyXG4gICAgaWYgKGtleSh0aGlzLnByb3BzLmNoaWxkcmVuKSA9PT0gbGVhdmVrZXkgKVxyXG4gICAgICB0aGlzLnBlcmZvcm1FbnRlcihsZWF2ZWtleSkgLy8gVGhpcyBlbnRlcmVkIGFnYWluIGJlZm9yZSBpdCBmdWxseSBsZWZ0LiBBZGQgaXQgYWdhaW4uXHJcblxyXG4gICAgZWxzZSBpZiAoIHRoaXMuaXNNb3VudGVkKCkgKVxyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgXHJcbiAgICAgICAgY2hpbGRyZW46IHRoaXMuc3RhdGUuY2hpbGRyZW4uZmlsdGVyKCBjID0+IGtleShjKSAhPT0gbGVhdmVrZXkpIFxyXG4gICAgICB9KVxyXG4gICAgXHJcbiAgICB0aGlzLl90cnlGaW5pc2goKSBcclxuICB9LFxyXG5cclxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgdmFyIENvbXBvbmVudCA9IHRoaXMucHJvcHMuY29tcG9uZW50XHJcbiAgICByZXR1cm4gPENvbXBvbmVudCB7Li4udGhpcy5wcm9wc30+eyB0aGlzLnN0YXRlLmNoaWxkcmVuLm1hcChjID0+IHRoaXMucHJvcHMuY2hpbGRGYWN0b3J5KGMsIGtleShjKSkpIH08L0NvbXBvbmVudD47XHJcbiAgfVxyXG59KTtcclxuXHJcbmZ1bmN0aW9uIGdldENoaWxkKGNoaWxkcmVuKXtcclxuICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ub25seShjaGlsZHJlbilcclxufVxyXG5cclxuZnVuY3Rpb24ga2V5KGNoaWxkKXtcclxuICByZXR1cm4gY2hpbGQgJiYgY2hpbGQua2V5XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy9SZXBsYWNlVHJhbnNpdGlvbkdyb3VwLmpzeFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxudmFyIHsgXHJcbiAgICBvZmZzZXQ6IGdldE9mZnNldFxyXG4gICwgaGVpZ2h0IH0gPSByZXF1aXJlKCcuL2RpbWVuc2lvbnMnKVxyXG4gICwgZ2V0U2Nyb2xsUGFyZW50ID0gcmVxdWlyZSgnLi9zY3JvbGxQYXJlbnQnKVxyXG4gICwgc2Nyb2xsVG9wID0gcmVxdWlyZSgnLi9zY3JvbGxUb3AnKVxyXG4gICwgcmFmID0gcmVxdWlyZSgnLi9yZXF1ZXN0QW5pbWF0aW9uRnJhbWUnKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzY3JvbGxUbyggc2VsZWN0ZWQsIHNjcm9sbFBhcmVudCApIHtcclxuICB2YXIgb2Zmc2V0ID0gZ2V0T2Zmc2V0KHNlbGVjdGVkKVxyXG4gICAgLCBwb2ZmICAgPSB7IHRvcDogMCwgbGVmdDogMCB9XHJcbiAgICAsIGxpc3QsIGxpc3RTY3JvbGxUb3AsIHNlbGVjdGVkVG9wLCBpc1dpblxyXG4gICAgLCBzZWxlY3RlZEhlaWdodCwgbGlzdEhlaWdodCwgYm90dG9tO1xyXG5cclxuICAgIGlmKCAhc2VsZWN0ZWQgKSByZXR1cm4gXHJcblxyXG4gICAgbGlzdCAgICAgICAgICA9IHNjcm9sbFBhcmVudCB8fCBnZXRTY3JvbGxQYXJlbnQoc2VsZWN0ZWQpXHJcbiAgICBpc1dpbiAgICAgICAgID0gZ2V0V2luZG93KGxpc3QpXHJcbiAgICBsaXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wKGxpc3QpXHJcblxyXG4gICAgbGlzdEhlaWdodCAgICA9IGhlaWdodChsaXN0LCB0cnVlKVxyXG4gICAgaXNXaW4gICAgICAgICA9IGdldFdpbmRvdyhsaXN0KVxyXG5cclxuICAgIGlmICghaXNXaW4pIFxyXG4gICAgICBwb2ZmID0gZ2V0T2Zmc2V0KGxpc3QpXHJcblxyXG4gICAgb2Zmc2V0ICAgICA9IHtcclxuICAgICAgdG9wOiAgICBvZmZzZXQudG9wICAtIHBvZmYudG9wLFxyXG4gICAgICBsZWZ0OiAgIG9mZnNldC5sZWZ0IC0gcG9mZi5sZWZ0LFxyXG4gICAgICBoZWlnaHQ6IG9mZnNldC5oZWlnaHQsXHJcbiAgICAgIHdpZHRoOiAgb2Zmc2V0LndpZHRoXHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBzZWxlY3RlZEhlaWdodCA9IG9mZnNldC5oZWlnaHRcclxuICAgIHNlbGVjdGVkVG9wICAgID0gb2Zmc2V0LnRvcCAgKyAoaXNXaW4gPyAwIDogbGlzdFNjcm9sbFRvcClcclxuICAgIGJvdHRvbSAgICAgICAgID0gc2VsZWN0ZWRUb3AgKyBzZWxlY3RlZEhlaWdodFxyXG5cclxuICAgIGxpc3RTY3JvbGxUb3AgPSBsaXN0U2Nyb2xsVG9wID4gc2VsZWN0ZWRUb3BcclxuICAgICAgICAgID8gc2VsZWN0ZWRUb3BcclxuICAgICAgICAgIDogYm90dG9tID4gKGxpc3RTY3JvbGxUb3AgKyBsaXN0SGVpZ2h0KSBcclxuICAgICAgICAgICAgICA/IChib3R0b20gLSBsaXN0SGVpZ2h0KVxyXG4gICAgICAgICAgICAgIDogbGlzdFNjcm9sbFRvcFxyXG5cclxuICAgIHZhciBpZCA9IHJhZigoKSA9PiBzY3JvbGxUb3AobGlzdCwgbGlzdFNjcm9sbFRvcCkpXHJcblxyXG4gICAgcmV0dXJuICgpID0+IHJhZi5jYW5jZWwoaWQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFdpbmRvdyggbm9kZSApIHtcclxuICByZXR1cm4gbm9kZSA9PT0gbm9kZS53aW5kb3dcclxuICAgID8gbm9kZSA6IG5vZGUubm9kZVR5cGUgPT09IDkgJiYgbm9kZS5kZWZhdWx0VmlldztcclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBFOi9Qcm9qZWN0cy9yZWFjdC13aWRnZXRzL3NyYy91dGlsL2RvbS9zY3JvbGwuanNcbiAqKi8iLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGNhbWVsaXplU3R5bGVOYW1lXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgY2FtZWxpemUgPSByZXF1aXJlKFwiLi9jYW1lbGl6ZVwiKTtcblxudmFyIG1zUGF0dGVybiA9IC9eLW1zLS87XG5cbi8qKlxuICogQ2FtZWxjYXNlcyBhIGh5cGhlbmF0ZWQgQ1NTIHByb3BlcnR5IG5hbWUsIGZvciBleGFtcGxlOlxuICpcbiAqICAgPiBjYW1lbGl6ZVN0eWxlTmFtZSgnYmFja2dyb3VuZC1jb2xvcicpXG4gKiAgIDwgXCJiYWNrZ3JvdW5kQ29sb3JcIlxuICogICA+IGNhbWVsaXplU3R5bGVOYW1lKCctbW96LXRyYW5zaXRpb24nKVxuICogICA8IFwiTW96VHJhbnNpdGlvblwiXG4gKiAgID4gY2FtZWxpemVTdHlsZU5hbWUoJy1tcy10cmFuc2l0aW9uJylcbiAqICAgPCBcIm1zVHJhbnNpdGlvblwiXG4gKlxuICogQXMgQW5kaSBTbWl0aCBzdWdnZXN0c1xuICogKGh0dHA6Ly93d3cuYW5kaXNtaXRoLmNvbS9ibG9nLzIwMTIvMDIvbW9kZXJuaXpyLXByZWZpeGVkLyksIGFuIGAtbXNgIHByZWZpeFxuICogaXMgY29udmVydGVkIHRvIGxvd2VyY2FzZSBgbXNgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY2FtZWxpemVTdHlsZU5hbWUoc3RyaW5nKSB7XG4gIHJldHVybiBjYW1lbGl6ZShzdHJpbmcucmVwbGFjZShtc1BhdHRlcm4sICdtcy0nKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FtZWxpemVTdHlsZU5hbWU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvY2FtZWxpemVTdHlsZU5hbWUuanNcbiAqKiBtb2R1bGUgaWQgPSA3M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIGh5cGhlbmF0ZVN0eWxlTmFtZVxuICogQHR5cGVjaGVja3NcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGh5cGhlbmF0ZSA9IHJlcXVpcmUoXCIuL2h5cGhlbmF0ZVwiKTtcblxudmFyIG1zUGF0dGVybiA9IC9ebXMtLztcblxuLyoqXG4gKiBIeXBoZW5hdGVzIGEgY2FtZWxjYXNlZCBDU1MgcHJvcGVydHkgbmFtZSwgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnYmFja2dyb3VuZENvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmQtY29sb3JcIlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnTW96VHJhbnNpdGlvbicpXG4gKiAgIDwgXCItbW96LXRyYW5zaXRpb25cIlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnbXNUcmFuc2l0aW9uJylcbiAqICAgPCBcIi1tcy10cmFuc2l0aW9uXCJcbiAqXG4gKiBBcyBNb2Rlcm5penIgc3VnZ2VzdHMgKGh0dHA6Ly9tb2Rlcm5penIuY29tL2RvY3MvI3ByZWZpeGVkKSwgYW4gYG1zYCBwcmVmaXhcbiAqIGlzIGNvbnZlcnRlZCB0byBgLW1zLWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBoeXBoZW5hdGVTdHlsZU5hbWUoc3RyaW5nKSB7XG4gIHJldHVybiBoeXBoZW5hdGUoc3RyaW5nKS5yZXBsYWNlKG1zUGF0dGVybiwgJy1tcy0nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoeXBoZW5hdGVTdHlsZU5hbWU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvaHlwaGVuYXRlU3R5bGVOYW1lLmpzXG4gKiogbW9kdWxlIGlkID0gNzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBFeGVjdXRpb25FbnZpcm9ubWVudFxuICovXG5cbi8qanNsaW50IGV2aWw6IHRydWUgKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjYW5Vc2VET00gPSAhIShcbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgd2luZG93LmRvY3VtZW50ICYmXG4gIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50XG4pO1xuXG4vKipcbiAqIFNpbXBsZSwgbGlnaHR3ZWlnaHQgbW9kdWxlIGFzc2lzdGluZyB3aXRoIHRoZSBkZXRlY3Rpb24gYW5kIGNvbnRleHQgb2ZcbiAqIFdvcmtlci4gSGVscHMgYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzIGFuZCBhbGxvd3MgY29kZSB0byByZWFzb24gYWJvdXRcbiAqIHdoZXRoZXIgb3Igbm90IHRoZXkgYXJlIGluIGEgV29ya2VyLCBldmVuIGlmIHRoZXkgbmV2ZXIgaW5jbHVkZSB0aGUgbWFpblxuICogYFJlYWN0V29ya2VyYCBkZXBlbmRlbmN5LlxuICovXG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSB7XG5cbiAgY2FuVXNlRE9NOiBjYW5Vc2VET00sXG5cbiAgY2FuVXNlV29ya2VyczogdHlwZW9mIFdvcmtlciAhPT0gJ3VuZGVmaW5lZCcsXG5cbiAgY2FuVXNlRXZlbnRMaXN0ZW5lcnM6XG4gICAgY2FuVXNlRE9NICYmICEhKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyIHx8IHdpbmRvdy5hdHRhY2hFdmVudCksXG5cbiAgY2FuVXNlVmlld3BvcnQ6IGNhblVzZURPTSAmJiAhIXdpbmRvdy5zY3JlZW4sXG5cbiAgaXNJbldvcmtlcjogIWNhblVzZURPTSAvLyBGb3Igbm93LCB0aGlzIGlzIHRydWUgLSBtaWdodCBjaGFuZ2UgaW4gdGhlIGZ1dHVyZS5cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeGVjdXRpb25FbnZpcm9ubWVudDtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlYWN0L2xpYi9FeGVjdXRpb25FbnZpcm9ubWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDc1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtcImV4cG9ydHNcIl0sIGZhY3RvcnkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgZmFjdG9yeShleHBvcnRzKTtcbiAgfSBlbHNlIHtcbiAgICBmYWN0b3J5KHJvb3QuYmFiZWxIZWxwZXJzID0ge30pO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gIHZhciBiYWJlbEhlbHBlcnMgPSBnbG9iYWw7XG5cbiAgYmFiZWxIZWxwZXJzLl9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbn0pXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdW5jb250cm9sbGFibGUvbGliL3V0aWwvYmFiZWxIZWxwZXJzLmpzXG4gKiogbW9kdWxlIGlkID0gNzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBjYW1lbGl6ZVxuICogQHR5cGVjaGVja3NcbiAqL1xuXG52YXIgX2h5cGhlblBhdHRlcm4gPSAvLSguKS9nO1xuXG4vKipcbiAqIENhbWVsY2FzZXMgYSBoeXBoZW5hdGVkIHN0cmluZywgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGNhbWVsaXplKCdiYWNrZ3JvdW5kLWNvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmRDb2xvclwiXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjYW1lbGl6ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9oeXBoZW5QYXR0ZXJuLCBmdW5jdGlvbihfLCBjaGFyYWN0ZXIpIHtcbiAgICByZXR1cm4gY2hhcmFjdGVyLnRvVXBwZXJDYXNlKCk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbWVsaXplO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVhY3QvbGliL2NhbWVsaXplLmpzXG4gKiogbW9kdWxlIGlkID0gNzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBoeXBoZW5hdGVcbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxudmFyIF91cHBlcmNhc2VQYXR0ZXJuID0gLyhbQS1aXSkvZztcblxuLyoqXG4gKiBIeXBoZW5hdGVzIGEgY2FtZWxjYXNlZCBzdHJpbmcsIGZvciBleGFtcGxlOlxuICpcbiAqICAgPiBoeXBoZW5hdGUoJ2JhY2tncm91bmRDb2xvcicpXG4gKiAgIDwgXCJiYWNrZ3JvdW5kLWNvbG9yXCJcbiAqXG4gKiBGb3IgQ1NTIHN0eWxlIG5hbWVzLCB1c2UgYGh5cGhlbmF0ZVN0eWxlTmFtZWAgaW5zdGVhZCB3aGljaCB3b3JrcyBwcm9wZXJseVxuICogd2l0aCBhbGwgdmVuZG9yIHByZWZpeGVzLCBpbmNsdWRpbmcgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGh5cGhlbmF0ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF91cHBlcmNhc2VQYXR0ZXJuLCAnLSQxJykudG9Mb3dlckNhc2UoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoeXBoZW5hdGU7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWFjdC9saWIvaHlwaGVuYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gNzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6Il90ZXN0LmJ1bmRsZS5qcyJ9