webpackJsonp(["app"],{

/***/ "./.cache/api-runner-browser.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.apiRunner = apiRunner;
exports.apiRunnerAsync = apiRunnerAsync;
/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

var preferDefault = function preferDefault(m) {
  return m && m.default || m;
};
var plugins = [];

// During bootstrap, we write requires at top of this file which looks
// basically like:
// var plugins = [
//   require('/path/to/plugin1/gatsby-browser.js'),
//   require('/path/to/plugin2/gatsby-browser.js'),
// ]

function apiRunner(api, args, defaultReturn) {
  var results = plugins.map(function (plugin) {
    if (plugin.plugin[api]) {
      var result = plugin.plugin[api](args, plugin.options);
      return result;
    }
  });

  // Filter out undefined results.
  results = results.filter(function (result) {
    return typeof result !== "undefined";
  });

  if (results.length > 0) {
    return results;
  } else if (defaultReturn) {
    return [defaultReturn];
  } else {
    return [];
  }
}

function apiRunnerAsync(api, args, defaultReturn) {
  return plugins.reduce(function (previous, next) {
    return next.plugin[api] ? previous.then(function () {
      return next.plugin[api](args, next.options);
    }) : previous;
  }, Promise.resolve());
}

/***/ }),

/***/ "./.cache/async-requires.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _exports$json;

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

// prefer default export if available
var preferDefault = function preferDefault(m) {
  return m && m.default || m;
};

exports.components = {
  "component---src-templates-component-js": __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=component---src-templates-component-js!./src/templates/component.js"),
  "component---src-pages-controllables-md": __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=component---src-pages-controllables-md!./src/pages/controllables.md"),
  "component---src-pages-index-md": __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=component---src-pages-index-md!./src/pages/index.md"),
  "component---src-pages-migration-v-4-md": __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=component---src-pages-migration-v-4-md!./src/pages/migration-v4.md"),
  "component---src-pages-theming-md": __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=component---src-pages-theming-md!./src/pages/theming.md"),
  "component---src-pages-localization-md": __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=component---src-pages-localization-md!./src/pages/localization.md")
};

exports.json = (_exports$json = {
  "layout-index.json": __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"),
  "api-calendar.json": __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---api-calendar!./.cache/json/api-calendar.json")
}, _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["api-combobox.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---api-combobox!./.cache/json/api-combobox.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["api-date-time-picker.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---api-date-time-picker!./.cache/json/api-date-time-picker.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["api-dropdown-list.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---api-dropdown-list!./.cache/json/api-dropdown-list.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["api-multiselect.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---api-multiselect!./.cache/json/api-multiselect.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["api-number-picker.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---api-number-picker!./.cache/json/api-number-picker.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["api-select-list.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---api-select-list!./.cache/json/api-select-list.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["controllables.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---controllables!./.cache/json/controllables.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---index!./.cache/json/index.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["migration-v-4.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---migration-v-4!./.cache/json/migration-v-4.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["theming.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---theming!./.cache/json/theming.json"), _exports$json["layout-index.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json"), _exports$json["localization.json"] = __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=path---localization!./.cache/json/localization.json"), _exports$json);

exports.layouts = {
  "component---src-layouts-index-js": __webpack_require__("./node_modules/gatsby-module-loader/index.js?name=component---src-layouts-index-js!./.cache/layouts/index.js")
};

/***/ }),

/***/ "./.cache/component-renderer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _loader = __webpack_require__("./.cache/loader.js");

var _loader2 = _interopRequireDefault(_loader);

var _emitter = __webpack_require__("./.cache/emitter.js");

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

var DefaultLayout = function DefaultLayout(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    "div",
    null,
    children()
  );
};

// Pass pathname in as prop.
// component will try fetching resources. If they exist,
// will just render, else will render null.

var ComponentRenderer = function (_React$Component) {
  _inherits(ComponentRenderer, _React$Component);

  function ComponentRenderer(props) {
    _classCallCheck(this, ComponentRenderer);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.state = {
      location: props.location,
      pageResources: _loader2.default.getResourcesForPathname(props.location.pathname)
    };
    return _this;
  }

  ComponentRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    if (this.state.location.pathname !== nextProps.location.pathname) {
      var pageResources = _loader2.default.getResourcesForPathname(nextProps.location.pathname);
      if (!pageResources) {
        // Page resources won't be set in cases where the browser back button
        // or forward button is pushed as we can't wait as normal for resources
        // to load before changing the page.
        _loader2.default.getResourcesForPathname(nextProps.location.pathname, function (pageResources) {
          _this2.setState({
            location: nextProps.location,
            pageResources: pageResources
          });
        });
      } else {
        this.setState({
          location: nextProps.location,
          pageResources: pageResources
        });
      }
    }
  };

  ComponentRenderer.prototype.componentDidMount = function componentDidMount() {
    var _this3 = this;

    // Listen to events so when our page gets updated, we can transition.
    // This is only useful on delayed transitions as the page will get rendered
    // without the necessary page resources and then re-render once those come in.
    _emitter2.default.on("onPostLoadPageResources", function (e) {
      if (e.page.path === _loader2.default.getPage(_this3.state.location.pathname).path) {
        _this3.setState({ pageResources: e.pageResources });
      }
    });
  };

  ComponentRenderer.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    // Check if the component or json have changed.
    if (!this.state.pageResources || nextState.pageResources) {
      return true;
    }
    if (this.state.pageResources.component !== nextState.pageResources.component) {
      return true;
    }
    if (this.state.pageResources.json !== nextState.pageResources.json) {
      return true;
    }
    // Check if location has changed on a page using internal routing
    // via matchPath configuration.
    if (this.state.location.key !== nextState.location.key && nextState.pageResources.page && nextState.pageResources.page.matchPath) {
      return true;
    }
    return false;
  };

  ComponentRenderer.prototype.render = function render() {
    if (this.props.page) {
      if (this.state.pageResources) {
        return (0, _react.createElement)(this.state.pageResources.component, _extends({
          key: this.props.location.pathname
        }, this.props, this.state.pageResources.json));
      } else {
        return null;
      }
    } else if (this.props.layout) {
      return (0, _react.createElement)(this.state.pageResources && this.state.pageResources.layout ? this.state.pageResources.layout : DefaultLayout, _extends({
        key: this.state.pageResources && this.state.pageResources.layout ? this.state.pageResources.layout : "DefaultLayout"
      }, this.props));
    } else {
      return null;
    }
  };

  return ComponentRenderer;
}(_react2.default.Component);

ComponentRenderer.propTypes = {
  page: _propTypes2.default.bool,
  layout: _propTypes2.default.bool,
  location: _propTypes2.default.object
};

exports.default = ComponentRenderer;

/***/ }),

/***/ "./.cache/emitter.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _mitt = __webpack_require__("./node_modules/mitt/dist/mitt.es.js");

var _mitt2 = _interopRequireDefault(_mitt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

var emitter = (0, _mitt2.default)();
exports.default = emitter;

/***/ }),

/***/ "./.cache/find-page.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/es/index.js");

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

// TODO add tests especially for handling prefixed links.


var pageCache = {};

module.exports = function (pages) {
  var pathPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  return function (pathname) {
    // Remove the pathPrefix from the pathname.
    var trimmedPathname = pathname.slice(pathPrefix.length);

    // Remove any hashfragment
    if (trimmedPathname.split("#").length > 1) {
      trimmedPathname = trimmedPathname.split("#").slice(0, -1).join("");
    }

    if (pageCache[trimmedPathname]) {
      return pageCache[trimmedPathname];
    }

    var foundPage = void 0;
    // Array.prototype.find is not supported in IE so we use this somewhat odd
    // work around.
    pages.some(function (page) {
      if (page.matchPath) {
        // Try both the path and matchPath
        if ((0, _reactRouterDom.matchPath)(trimmedPathname, { path: page.path }) || (0, _reactRouterDom.matchPath)(trimmedPathname, {
          path: page.matchPath
        })) {
          foundPage = page;
          pageCache[trimmedPathname] = page;
          return true;
        }
      } else {
        if ((0, _reactRouterDom.matchPath)(trimmedPathname, {
          path: page.path,
          exact: true
        })) {
          foundPage = page;
          pageCache[trimmedPathname] = page;
          return true;
        }
      }

      return false;
    });

    return foundPage;
  };
};

/***/ }),

/***/ "./.cache/loader.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _findPage = __webpack_require__("./.cache/find-page.js");

var _findPage2 = _interopRequireDefault(_findPage);

var _emitter = __webpack_require__("./.cache/emitter.js");

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

var preferDefault = function preferDefault(m) {
  return m && m.default || m;
};

var prefetcher = void 0;
var inInitialRender = true;
var hasFetched = Object.create(null);
var syncRequires = {};
var asyncRequires = {};

var fetchResource = function fetchResource(resourceName) {
  // Find resource
  var resourceFunction = resourceName.startsWith("component---") ? asyncRequires.components[resourceName] || asyncRequires.layouts[resourceName] : asyncRequires.json[resourceName];

  // Download the resource
  hasFetched[resourceName] = true;
  return resourceFunction();
};

var getResourceModule = function getResourceModule(resourceName) {
  return fetchResource(resourceName).then(preferDefault);
};

// Prefetcher logic
if (true) {
  prefetcher = __webpack_require__("./.cache/prefetcher.js")({
    fetchNextResource: function fetchNextResource() {
      var next = queue.dequeue();
      return next && fetchResource(next);
    }
  });

  _emitter2.default.on("onPreLoadPageResources", function (e) {
    prefetcher.onPreLoadPageResources(e);
  });
  _emitter2.default.on("onPostLoadPageResources", function (e) {
    prefetcher.onPostLoadPageResources(e);
  });
}

// Note we're not actively using the path data atm. There
// could be future optimizations however around trying to ensure
// we load all resources for likely-to-be-visited paths.
// let pathArray = []
// let pathCount = {}

var resourcesCount = Object.create(null);
var sortResourcesByCount = function sortResourcesByCount(a, b) {
  if (resourcesCount[a] > resourcesCount[b]) return 1;else if (resourcesCount[a] < resourcesCount[b]) return -1;else return 0;
};

var findPage = void 0;
var pages = [];
var pathScriptsCache = {};
var resourcesArray = [];
var mountOrder = 1;

var queue = {
  empty: function empty() {
    resourcesCount = Object.create(null);
    resourcesArray = [];
    pages = [];
  },

  addPagesArray: function addPagesArray(newPages) {
    pages = newPages;
    var pathPrefix = "";
    if (false) {
      pathPrefix = __PATH_PREFIX__;
    }
    findPage = (0, _findPage2.default)(newPages, pathPrefix);
  },
  addDevRequires: function addDevRequires(devRequires) {
    syncRequires = devRequires;
  },
  addProdRequires: function addProdRequires(prodRequires) {
    asyncRequires = prodRequires;
  },

  dequeue: function dequeue() {
    return resourcesArray.pop();
  },

  // dequeue: path => pathArray.pop(),

  enqueue: function enqueue(path) {
    // Check page exists.
    if (!pages.some(function (p) {
      return p.path === path;
    })) {
      return false;
    }

    var mountOrderBoost = 1 / mountOrder;
    mountOrder += 1;

    function enqueueResource(resourceName) {
      if (!resourceName) return;
      if (!resourcesCount[resourceName]) {
        resourcesCount[resourceName] = 1 + mountOrderBoost;
      } else {
        resourcesCount[resourceName] += 1 + mountOrderBoost;
      }

      // Before adding, checking that the resource isn't either
      // already queued or been downloading.
      if (hasFetched[resourceName] || resourcesArray.includes(resourceName)) return;

      resourcesArray.unshift(resourceName);
    }

    // Add resources to queue.
    var page = findPage(path);

    enqueueResource(page.jsonName);
    enqueueResource(page.componentChunkName);

    // Sort resources by resourcesCount.
    resourcesArray.sort(sortResourcesByCount);

    if (true) {
      prefetcher.onNewResourcesAdded();
    }

    return true;
  },

  getPage: function getPage(pathname) {
    return findPage(pathname);
  },

  getResourcesForPathname: function getResourcesForPathname(path) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    if (inInitialRender && navigator && navigator.serviceWorker && navigator.serviceWorker.controller && navigator.serviceWorker.controller.state === "activated") {
      // If we're loading from a service worker (it's already activated on
      // this initial render) and we can't find a page, there's a good chance
      // we're on a new page that this (now old) service worker doesn't know
      // about so we'll unregister it and reload.
      if (!findPage(path)) {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
          for (var _iterator = registrations, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var registration = _ref;

            registration.unregister();
          }
          window.location.reload();
        });
      }
    }
    inInitialRender = false;
    // In development we know the code is loaded already
    // so we just return with it immediately.
    if (false) {
      var _page = findPage(path);
      if (!_page) return null;

      var pageResources = {
        component: syncRequires.components[_page.componentChunkName],
        json: syncRequires.json[_page.jsonName],
        layout: syncRequires.layouts[_page.layoutComponentChunkName]
        // page,
      };
      cb(pageResources);
      return pageResources;
    }
    // Production code path
    var page = findPage(path);

    if (!page) {
      console.log("A page wasn't found for \"" + path + "\"");
      return null;
    }

    // Use the path from the page so the pathScriptsCache uses
    // the normalized path.
    path = page.path;

    // Check if it's in the cache already.
    if (pathScriptsCache[path]) {
      Promise.resolve().then(function () {
        cb(pathScriptsCache[path]);
        _emitter2.default.emit("onPostLoadPageResources", {
          page: page,
          pageResources: pathScriptsCache[path]
        });
      });
      return pathScriptsCache[path];
    }

    _emitter2.default.emit("onPreLoadPageResources", { path: path });

    Promise.all([getResourceModule(page.componentChunkName), getResourceModule(page.jsonName), getResourceModule(page.layoutComponentChunkName)]).then(function (_ref2) {
      var component = _ref2[0],
          json = _ref2[1],
          layout = _ref2[2];

      var pageResources = { component: component, json: json, layout: layout };

      pathScriptsCache[path] = pageResources;
      cb(pageResources);

      _emitter2.default.emit("onPostLoadPageResources", {
        page: page,
        pageResources: pageResources
      });
    });

    return null;
  },

  // for testing
  ___resources: function ___resources() {
    return resourcesArray.slice().reverse();
  }
};

module.exports = queue;

/***/ }),

/***/ "./.cache/pages.json":
/***/ (function(module, exports) {

module.exports = [{"componentChunkName":"component---src-templates-component-js","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"api-calendar.json","path":"/api/Calendar/"},{"componentChunkName":"component---src-templates-component-js","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"api-combobox.json","path":"/api/Combobox/"},{"componentChunkName":"component---src-templates-component-js","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"api-date-time-picker.json","path":"/api/DateTimePicker/"},{"componentChunkName":"component---src-templates-component-js","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"api-dropdown-list.json","path":"/api/DropdownList/"},{"componentChunkName":"component---src-templates-component-js","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"api-multiselect.json","path":"/api/Multiselect/"},{"componentChunkName":"component---src-templates-component-js","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"api-number-picker.json","path":"/api/NumberPicker/"},{"componentChunkName":"component---src-templates-component-js","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"api-select-list.json","path":"/api/SelectList/"},{"componentChunkName":"component---src-pages-controllables-md","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"controllables.json","path":"/controllables/"},{"componentChunkName":"component---src-pages-index-md","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"index.json","path":"/"},{"componentChunkName":"component---src-pages-migration-v-4-md","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"migration-v-4.json","path":"/migration-v4/"},{"componentChunkName":"component---src-pages-theming-md","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"theming.json","path":"/theming/"},{"componentChunkName":"component---src-pages-localization-md","layout":"index","layoutComponentChunkName":"component---src-layouts-index-js","jsonName":"localization.json","path":"/localization/"}]

/***/ }),

/***/ "./.cache/prefetcher.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

module.exports = function (_ref) {
  var fetchNextResource = _ref.fetchNextResource;

  var pagesLoading = [];
  var current = null;
  var clearCurrent = function clearCurrent() {
    current = null;
  };

  var enqueueUpdate = function enqueueUpdate() {
    // Take actions.
    // Wait for event loop queue to finish.
    setTimeout(function () {
      if (current || !!pagesLoading.length) return;

      // Start another resource downloading.
      var next = fetchNextResource();
      if (!next) return;
      current = next.then(clearCurrent, clearCurrent).then(enqueueUpdate);
    });
  };

  var reducer = function reducer(action) {
    switch (action.type) {
      case "ON_PRE_LOAD_PAGE_RESOURCES":
        pagesLoading.push(action.payload.path);
        break;
      case "ON_POST_LOAD_PAGE_RESOURCES":
        pagesLoading = pagesLoading.filter(function (p) {
          return p !== action.payload.page.path;
        });
        break;
      case "ON_NEW_RESOURCES_ADDED":
        break;
    }

    enqueueUpdate();
  };

  return {
    onResourcedFinished: function onResourcedFinished(event) {
      // Tell prefetcher that the resource finished downloading
      // so it can grab the next one.
      reducer({ type: "RESOURCE_FINISHED", payload: event });
    },
    onPreLoadPageResources: function onPreLoadPageResources(event) {
      // Tell prefetcher a page load has started so it should stop
      // loading anything new
      reducer({ type: "ON_PRE_LOAD_PAGE_RESOURCES", payload: event });
    },
    onPostLoadPageResources: function onPostLoadPageResources(event) {
      // Tell prefetcher a page load has finished so it should start
      // loading resources again.
      reducer({ type: "ON_POST_LOAD_PAGE_RESOURCES", payload: event });
    },
    onNewResourcesAdded: function onNewResourcesAdded() {
      // Tell prefetcher that more resources to be downloaded have
      // been added.
      reducer({ type: "ON_NEW_RESOURCES_ADDED" });
    },
    getState: function getState() {
      return { pagesLoading: pagesLoading, current: current };
    },
    empty: function empty() {
      pagesLoading = [];
      clearCurrent();
    }
  };
};

/***/ }),

/***/ "./.cache/production-app.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _apiRunnerBrowser = __webpack_require__("./.cache/api-runner-browser.js");

var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__("./node_modules/react-router-dom/es/index.js");

var _reactRouterScroll = __webpack_require__("./node_modules/react-router-scroll/lib/index.js");

var _createBrowserHistory = __webpack_require__("./node_modules/history/createBrowserHistory.js");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _domready = __webpack_require__("./node_modules/domready/ready.js");

var _domready2 = _interopRequireDefault(_domready);

var _emitter = __webpack_require__("./.cache/emitter.js");

var _emitter2 = _interopRequireDefault(_emitter);

var _pages = __webpack_require__("./.cache/pages.json");

var _pages2 = _interopRequireDefault(_pages);

var _componentRenderer = __webpack_require__("./.cache/component-renderer.js");

var _componentRenderer2 = _interopRequireDefault(_componentRenderer);

var _asyncRequires = __webpack_require__("./.cache/async-requires.js");

var _asyncRequires2 = _interopRequireDefault(_asyncRequires);

var _loader = __webpack_require__("./.cache/loader.js");

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

if (true) {
  __webpack_require__("./node_modules/core-js/modules/es6.promise.js");
}


window.asyncRequires = _asyncRequires2.default;
window.___emitter = _emitter2.default;
window.___loader = _loader2.default;

window.matchPath = _reactRouterDom.matchPath;

_loader2.default.addPagesArray(_pages2.default);
_loader2.default.addProdRequires(_asyncRequires2.default);

// Let the site/plugins run code very early.
(0, _apiRunnerBrowser.apiRunnerAsync)("onClientEntry").then(function () {
  // Let plugins register a service worker. The plugin just needs
  // to return true.
  if ((0, _apiRunnerBrowser.apiRunner)("registerServiceWorker").length > 0) {
    __webpack_require__("./.cache/register-service-worker.js");
  }

  var navigateTo = function navigateTo(pathname) {
    // If we're already at this path, do nothing.
    if (window.location.pathname === pathname) {
      return;
    }

    // Listen to loading events. If page resources load before
    // a second, navigate immediately.
    function eventHandler(e) {
      if (e.page.path === _loader2.default.getPage(pathname).path) {
        _emitter2.default.off("onPostLoadPageResources", eventHandler);
        clearTimeout(timeoutId);
        window.___history.push(pathname);
      }
    }

    // Start a timer to wait for a second before transitioning and showing a
    // loader in case resources aren't around yet.
    var timeoutId = setTimeout(function () {
      _emitter2.default.off("onPostLoadPageResources", eventHandler);
      _emitter2.default.emit("onDelayedLoadPageResources", { pathname: pathname });
      window.___history.push(pathname);
    }, 1000);

    if (_loader2.default.getResourcesForPathname(pathname)) {
      // The resources are already loaded so off we go.
      clearTimeout(timeoutId);
      window.___history.push(pathname);
    } else {
      // They're not loaded yet so let's add a listener for when
      // they finish loading.
      _emitter2.default.on("onPostLoadPageResources", eventHandler);
    }
  };

  // window.___loadScriptsForPath = loadScriptsForPath
  window.___navigateTo = navigateTo;

  var history = (0, _createBrowserHistory2.default)();

  // Call onRouteUpdate on the initial page load.
  (0, _apiRunnerBrowser.apiRunner)("onRouteUpdate", {
    location: history.location,
    action: history.action
  });

  function attachToHistory(history) {
    if (!window.___history) {
      window.___history = history;

      history.listen(function (location, action) {
        (0, _apiRunnerBrowser.apiRunner)("onRouteUpdate", { location: location, action: action });
      });
    }
  }

  function shouldUpdateScroll(prevRouterProps, _ref) {
    var pathname = _ref.location.pathname;

    var results = (0, _apiRunnerBrowser.apiRunner)("shouldUpdateScroll", {
      prevRouterProps: prevRouterProps,
      pathname: pathname
    });
    if (results.length > 0) {
      return results[0];
    }

    if (prevRouterProps) {
      var oldPathname = prevRouterProps.location.pathname;

      if (oldPathname === pathname) {
        return false;
      }
    }
    return true;
  }

  var AltRouter = (0, _apiRunnerBrowser.apiRunner)("replaceRouterComponent", { history: history })[0];
  var DefaultRouter = function DefaultRouter(_ref2) {
    var children = _ref2.children;
    return _react2.default.createElement(
      _reactRouterDom.Router,
      { history: history },
      children
    );
  };

  _loader2.default.getResourcesForPathname(window.location.pathname, function () {
    var Root = function Root() {
      return (0, _react.createElement)(AltRouter ? AltRouter : DefaultRouter, null, (0, _react.createElement)(_reactRouterScroll.ScrollContext, { shouldUpdateScroll: shouldUpdateScroll }, (0, _react.createElement)((0, _reactRouterDom.withRouter)(_componentRenderer2.default), {
        layout: true,
        children: function children(layoutProps) {
          return (0, _react.createElement)(_reactRouterDom.Route, {
            render: function render(routeProps) {
              attachToHistory(routeProps.history);
              var props = layoutProps ? layoutProps : routeProps;

              if (_loader2.default.getPage(props.location.pathname)) {
                return (0, _react.createElement)(_componentRenderer2.default, _extends({
                  page: true
                }, props));
              } else {
                return (0, _react.createElement)(_componentRenderer2.default, {
                  location: { page: true, pathname: "/404.html" }
                });
              }
            }
          });
        }
      })));
    };

    var NewRoot = (0, _apiRunnerBrowser.apiRunner)("wrapRootComponent", { Root: Root }, Root)[0];
    (0, _domready2.default)(function () {
      _reactDom2.default.render(_react2.default.createElement(NewRoot, null), typeof window !== "undefined" ? document.getElementById("___gatsby") : void 0, function () {
        (0, _apiRunnerBrowser.apiRunner)("onInitialClientRender");
      });
    });
  });
});

/***/ }),

/***/ "./.cache/register-service-worker.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _emitter = __webpack_require__("./.cache/emitter.js");

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

var pathPrefix = "/";
if (undefined) {
  pathPrefix = "" + "/";
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(pathPrefix + "sw.js").then(function (reg) {
    reg.addEventListener("updatefound", function () {
      // The updatefound event implies that reg.installing is set; see
      // https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
      var installingWorker = reg.installing;
      console.log("installingWorker", installingWorker);
      installingWorker.addEventListener("statechange", function () {
        switch (installingWorker.state) {
          case "installed":
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and the fresh content will
              // have been added to the cache.
              // We reload immediately so the user sees the new content.
              // This could/should be made configurable in the future.
              window.location.reload();
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a "Content is cached for offline use." message.
              console.log("Content is now available offline!");
              _emitter2.default.emit("sw:installed");
            }
            break;

          case "redundant":
            console.error("The installing service worker became redundant.");
            break;
        }
      });
    });
  }).catch(function (e) {
    console.error("Error during service worker registration:", e);
  });
}

/***/ }),

/***/ "./node_modules/create-react-class/factory.js":
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = __webpack_require__("./node_modules/object-assign/index.js");

var emptyObject = __webpack_require__("./node_modules/fbjs/lib/emptyObject.js");
var _invariant = __webpack_require__("./node_modules/fbjs/lib/invariant.js");

if (false) {
  var warning = require('fbjs/lib/warning');
}

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

var ReactPropTypeLocationNames;
if (false) {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
} else {
  ReactPropTypeLocationNames = {};
}

function factory(ReactComponent, isValidElement, ReactNoopUpdateQueue) {
  /**
   * Policies that describe methods in `ReactClassInterface`.
   */

  var injectedMixins = [];

  /**
   * Composite components are higher-level components that compose other composite
   * or host components.
   *
   * To create a new type of `ReactClass`, pass a specification of
   * your new class to `React.createClass`. The only requirement of your class
   * specification is that you implement a `render` method.
   *
   *   var MyComponent = React.createClass({
   *     render: function() {
   *       return <div>Hello World</div>;
   *     }
   *   });
   *
   * The class specification supports a specific protocol of methods that have
   * special meaning (e.g. `render`). See `ReactClassInterface` for
   * more the comprehensive protocol. Any other properties and methods in the
   * class specification will be available on the prototype.
   *
   * @interface ReactClassInterface
   * @internal
   */
  var ReactClassInterface = {
    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
     *     return {
     *       isOn: false,
     *       fooBaz: new BazFoo()
     *     }
     *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
     *     var name = this.props.name;
     *     return <div>Hello, {name}!</div>;
     *   }
     *
     * @return {ReactComponent}
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
     *     this.setState({
     *       likesIncreasing: nextProps.likeCount > this.props.likeCount
     *     });
     *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
     *     return !equal(nextProps, this.props) ||
     *       !equal(nextState, this.state) ||
     *       !equal(nextContext, this.context);
     *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'
  };

  /**
   * Mapping from class specification keys to special processing functions.
   *
   * Although these are declared like instance properties in the specification
   * when defining classes using `React.createClass`, they are actually static
   * and are accessible on the constructor instead of the prototype. Despite
   * being static, they must be defined outside of the "statics" key under
   * which all other static methods are defined.
   */
  var RESERVED_SPEC_KEYS = {
    displayName: function(Constructor, displayName) {
      Constructor.displayName = displayName;
    },
    mixins: function(Constructor, mixins) {
      if (mixins) {
        for (var i = 0; i < mixins.length; i++) {
          mixSpecIntoComponent(Constructor, mixins[i]);
        }
      }
    },
    childContextTypes: function(Constructor, childContextTypes) {
      if (false) {
        validateTypeDef(Constructor, childContextTypes, 'childContext');
      }
      Constructor.childContextTypes = _assign(
        {},
        Constructor.childContextTypes,
        childContextTypes
      );
    },
    contextTypes: function(Constructor, contextTypes) {
      if (false) {
        validateTypeDef(Constructor, contextTypes, 'context');
      }
      Constructor.contextTypes = _assign(
        {},
        Constructor.contextTypes,
        contextTypes
      );
    },
    /**
     * Special case getDefaultProps which should move into statics but requires
     * automatic merging.
     */
    getDefaultProps: function(Constructor, getDefaultProps) {
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps = createMergedResultFunction(
          Constructor.getDefaultProps,
          getDefaultProps
        );
      } else {
        Constructor.getDefaultProps = getDefaultProps;
      }
    },
    propTypes: function(Constructor, propTypes) {
      if (false) {
        validateTypeDef(Constructor, propTypes, 'prop');
      }
      Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
    },
    statics: function(Constructor, statics) {
      mixStaticSpecIntoComponent(Constructor, statics);
    },
    autobind: function() {}
  };

  function validateTypeDef(Constructor, typeDef, location) {
    for (var propName in typeDef) {
      if (typeDef.hasOwnProperty(propName)) {
        // use a warning instead of an _invariant so components
        // don't show up in prod but only in __DEV__
        if (false) {
          warning(
            typeof typeDef[propName] === 'function',
            '%s: %s type `%s` is invalid; it must be a function, usually from ' +
              'React.PropTypes.',
            Constructor.displayName || 'ReactClass',
            ReactPropTypeLocationNames[location],
            propName
          );
        }
      }
    }
  }

  function validateMethodOverride(isAlreadyDefined, name) {
    var specPolicy = ReactClassInterface.hasOwnProperty(name)
      ? ReactClassInterface[name]
      : null;

    // Disallow overriding of base class methods unless explicitly allowed.
    if (ReactClassMixin.hasOwnProperty(name)) {
      _invariant(
        specPolicy === 'OVERRIDE_BASE',
        'ReactClassInterface: You are attempting to override ' +
          '`%s` from your class specification. Ensure that your method names ' +
          'do not overlap with React methods.',
        name
      );
    }

    // Disallow defining methods more than once unless explicitly allowed.
    if (isAlreadyDefined) {
      _invariant(
        specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED',
        'ReactClassInterface: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be due ' +
          'to a mixin.',
        name
      );
    }
  }

  /**
   * Mixin helper which handles policy validation and reserved
   * specification keys when building React classes.
   */
  function mixSpecIntoComponent(Constructor, spec) {
    if (!spec) {
      if (false) {
        var typeofSpec = typeof spec;
        var isMixinValid = typeofSpec === 'object' && spec !== null;

        if (process.env.NODE_ENV !== 'production') {
          warning(
            isMixinValid,
            "%s: You're attempting to include a mixin that is either null " +
              'or not an object. Check the mixins included by the component, ' +
              'as well as any mixins they include themselves. ' +
              'Expected object but got %s.',
            Constructor.displayName || 'ReactClass',
            spec === null ? null : typeofSpec
          );
        }
      }

      return;
    }

    _invariant(
      typeof spec !== 'function',
      "ReactClass: You're attempting to " +
        'use a component class or function as a mixin. Instead, just use a ' +
        'regular object.'
    );
    _invariant(
      !isValidElement(spec),
      "ReactClass: You're attempting to " +
        'use a component as a mixin. Instead, just use a regular object.'
    );

    var proto = Constructor.prototype;
    var autoBindPairs = proto.__reactAutoBindPairs;

    // By handling mixins before any other properties, we ensure the same
    // chaining order is applied to methods with DEFINE_MANY policy, whether
    // mixins are listed before or after these methods in the spec.
    if (spec.hasOwnProperty(MIXINS_KEY)) {
      RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
    }

    for (var name in spec) {
      if (!spec.hasOwnProperty(name)) {
        continue;
      }

      if (name === MIXINS_KEY) {
        // We have already handled mixins in a special case above.
        continue;
      }

      var property = spec[name];
      var isAlreadyDefined = proto.hasOwnProperty(name);
      validateMethodOverride(isAlreadyDefined, name);

      if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
        RESERVED_SPEC_KEYS[name](Constructor, property);
      } else {
        // Setup methods on prototype:
        // The following member methods should not be automatically bound:
        // 1. Expected ReactClass methods (in the "interface").
        // 2. Overridden methods (that were mixed in).
        var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
        var isFunction = typeof property === 'function';
        var shouldAutoBind =
          isFunction &&
          !isReactClassMethod &&
          !isAlreadyDefined &&
          spec.autobind !== false;

        if (shouldAutoBind) {
          autoBindPairs.push(name, property);
          proto[name] = property;
        } else {
          if (isAlreadyDefined) {
            var specPolicy = ReactClassInterface[name];

            // These cases should already be caught by validateMethodOverride.
            _invariant(
              isReactClassMethod &&
                (specPolicy === 'DEFINE_MANY_MERGED' ||
                  specPolicy === 'DEFINE_MANY'),
              'ReactClass: Unexpected spec policy %s for key %s ' +
                'when mixing in component specs.',
              specPolicy,
              name
            );

            // For methods which are defined more than once, call the existing
            // methods before calling the new property, merging if appropriate.
            if (specPolicy === 'DEFINE_MANY_MERGED') {
              proto[name] = createMergedResultFunction(proto[name], property);
            } else if (specPolicy === 'DEFINE_MANY') {
              proto[name] = createChainedFunction(proto[name], property);
            }
          } else {
            proto[name] = property;
            if (false) {
              // Add verbose displayName to the function, which helps when looking
              // at profiling tools.
              if (typeof property === 'function' && spec.displayName) {
                proto[name].displayName = spec.displayName + '_' + name;
              }
            }
          }
        }
      }
    }
  }

  function mixStaticSpecIntoComponent(Constructor, statics) {
    if (!statics) {
      return;
    }
    for (var name in statics) {
      var property = statics[name];
      if (!statics.hasOwnProperty(name)) {
        continue;
      }

      var isReserved = name in RESERVED_SPEC_KEYS;
      _invariant(
        !isReserved,
        'ReactClass: You are attempting to define a reserved ' +
          'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' +
          'as an instance property instead; it will still be accessible on the ' +
          'constructor.',
        name
      );

      var isInherited = name in Constructor;
      _invariant(
        !isInherited,
        'ReactClass: You are attempting to define ' +
          '`%s` on your component more than once. This conflict may be ' +
          'due to a mixin.',
        name
      );
      Constructor[name] = property;
    }
  }

  /**
   * Merge two objects, but throw if both contain the same key.
   *
   * @param {object} one The first object, which is mutated.
   * @param {object} two The second object
   * @return {object} one after it has been mutated to contain everything in two.
   */
  function mergeIntoWithNoDuplicateKeys(one, two) {
    _invariant(
      one && two && typeof one === 'object' && typeof two === 'object',
      'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.'
    );

    for (var key in two) {
      if (two.hasOwnProperty(key)) {
        _invariant(
          one[key] === undefined,
          'mergeIntoWithNoDuplicateKeys(): ' +
            'Tried to merge two objects with the same key: `%s`. This conflict ' +
            'may be due to a mixin; in particular, this may be caused by two ' +
            'getInitialState() or getDefaultProps() methods returning objects ' +
            'with clashing keys.',
          key
        );
        one[key] = two[key];
      }
    }
    return one;
  }

  /**
   * Creates a function that invokes two functions and merges their return values.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createMergedResultFunction(one, two) {
    return function mergedResult() {
      var a = one.apply(this, arguments);
      var b = two.apply(this, arguments);
      if (a == null) {
        return b;
      } else if (b == null) {
        return a;
      }
      var c = {};
      mergeIntoWithNoDuplicateKeys(c, a);
      mergeIntoWithNoDuplicateKeys(c, b);
      return c;
    };
  }

  /**
   * Creates a function that invokes two functions and ignores their return vales.
   *
   * @param {function} one Function to invoke first.
   * @param {function} two Function to invoke second.
   * @return {function} Function that invokes the two argument functions.
   * @private
   */
  function createChainedFunction(one, two) {
    return function chainedFunction() {
      one.apply(this, arguments);
      two.apply(this, arguments);
    };
  }

  /**
   * Binds a method to the component.
   *
   * @param {object} component Component whose method is going to be bound.
   * @param {function} method Method to be bound.
   * @return {function} The bound method.
   */
  function bindAutoBindMethod(component, method) {
    var boundMethod = method.bind(component);
    if (false) {
      boundMethod.__reactBoundContext = component;
      boundMethod.__reactBoundMethod = method;
      boundMethod.__reactBoundArguments = null;
      var componentName = component.constructor.displayName;
      var _bind = boundMethod.bind;
      boundMethod.bind = function(newThis) {
        for (
          var _len = arguments.length,
            args = Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        // User is trying to bind() an autobound method; we effectively will
        // ignore the value of "this" that the user is trying to use, so
        // let's warn.
        if (newThis !== component && newThis !== null) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): React component methods may only be bound to the ' +
                'component instance. See %s',
              componentName
            );
          }
        } else if (!args.length) {
          if (process.env.NODE_ENV !== 'production') {
            warning(
              false,
              'bind(): You are binding a component method to the component. ' +
                'React does this for you automatically in a high-performance ' +
                'way, so you can safely remove this call. See %s',
              componentName
            );
          }
          return boundMethod;
        }
        var reboundMethod = _bind.apply(boundMethod, arguments);
        reboundMethod.__reactBoundContext = component;
        reboundMethod.__reactBoundMethod = method;
        reboundMethod.__reactBoundArguments = args;
        return reboundMethod;
      };
    }
    return boundMethod;
  }

  /**
   * Binds all auto-bound methods in a component.
   *
   * @param {object} component Component whose method is going to be bound.
   */
  function bindAutoBindMethods(component) {
    var pairs = component.__reactAutoBindPairs;
    for (var i = 0; i < pairs.length; i += 2) {
      var autoBindKey = pairs[i];
      var method = pairs[i + 1];
      component[autoBindKey] = bindAutoBindMethod(component, method);
    }
  }

  var IsMountedPreMixin = {
    componentDidMount: function() {
      this.__isMounted = true;
    }
  };

  var IsMountedPostMixin = {
    componentWillUnmount: function() {
      this.__isMounted = false;
    }
  };

  /**
   * Add more to the ReactClass base class. These are all legacy features and
   * therefore not already part of the modern ReactComponent.
   */
  var ReactClassMixin = {
    /**
     * TODO: This will be deprecated because state should always keep a consistent
     * type signature and the only use case for this, is to avoid that.
     */
    replaceState: function(newState, callback) {
      this.updater.enqueueReplaceState(this, newState, callback);
    },

    /**
     * Checks whether or not this composite component is mounted.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function() {
      if (false) {
        warning(
          this.__didWarnIsMounted,
          '%s: isMounted is deprecated. Instead, make sure to clean up ' +
            'subscriptions and pending requests in componentWillUnmount to ' +
            'prevent memory leaks.',
          (this.constructor && this.constructor.displayName) ||
            this.name ||
            'Component'
        );
        this.__didWarnIsMounted = true;
      }
      return !!this.__isMounted;
    }
  };

  var ReactClassComponent = function() {};
  _assign(
    ReactClassComponent.prototype,
    ReactComponent.prototype,
    ReactClassMixin
  );

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  function createClass(spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function(props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (false) {
        warning(
          this instanceof Constructor,
          'Something is calling a React component directly. Use a factory or ' +
            'JSX instead. See: https://fb.me/react-legacyfactory'
        );
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (false) {
        // We allow auto-mocks to proceed as if they're returning null.
        if (
          initialState === undefined &&
          this.getInitialState._isMockFunction
        ) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      _invariant(
        typeof initialState === 'object' && !Array.isArray(initialState),
        '%s.getInitialState(): must return an object or null',
        Constructor.displayName || 'ReactCompositeComponent'
      );

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, IsMountedPreMixin);
    mixSpecIntoComponent(Constructor, spec);
    mixSpecIntoComponent(Constructor, IsMountedPostMixin);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (false) {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    _invariant(
      Constructor.prototype.render,
      'createClass(...): Class specification must implement a `render` method.'
    );

    if (false) {
      warning(
        !Constructor.prototype.componentShouldUpdate,
        '%s has a method called ' +
          'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' +
          'The name is phrased as a question because the function is ' +
          'expected to return a value.',
        spec.displayName || 'A component'
      );
      warning(
        !Constructor.prototype.componentWillRecieveProps,
        '%s has a method called ' +
          'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?',
        spec.displayName || 'A component'
      );
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  }

  return createClass;
}

module.exports = factory;



/***/ }),

/***/ "./node_modules/domready/ready.js":
/***/ (function(module, exports, __webpack_require__) {

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

/*!
  * domready (c) Dustin Diaz 2014 - License MIT
  */
!function (name, definition) {

  if (true) module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()

}('domready', function () {

  var fns = [], listener
    , doc = document
    , hack = doc.documentElement.doScroll
    , domContentLoaded = 'DOMContentLoaded'
    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


  if (!loaded)
  doc.addEventListener(domContentLoaded, listener = function () {
    doc.removeEventListener(domContentLoaded, listener)
    loaded = 1
    while (listener = fns.shift()) listener()
  })

  return function (fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn)
  }

});



/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=component---src-layouts-index-js!./.cache/layouts/index.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("component---src-layouts-index-js").then(__webpack_require__.bind(null, "./node_modules/babel-loader/lib/index.js?{\"presets\":[[\"/Users/jason/src/react-widgets/node_modules/babel-preset-jason/index.js\",{\"debug\":false,\"targets\":{\"browsers\":[\"> 1%\",\"last 4 versions\",\"not ie < 9\"]}}],[\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-react/lib/index.js\"],\"plugins\":[\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-remove-graphql-queries/index.js\",\"/Users/jason/src/react-widgets/node_modules/babel-plugin-transform-decorators-legacy/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"cacheDirectory\":true}!./node_modules/css-literal-loader/lib/loader.js?{\"extension\":\".less\",\"tagName\":\"less\"}!./node_modules/imports-loader/index.js?define=>false,__VERSION__=>\"4.0.0-rc.16\"!./.cache/layouts/index.js"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=component---src-pages-controllables-md!./src/pages/controllables.md":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("component---src-pages-controllables-md").then(__webpack_require__.bind(null, "./node_modules/babel-loader/lib/index.js?{\"presets\":[[\"/Users/jason/src/react-widgets/node_modules/babel-preset-jason/index.js\",{\"debug\":false,\"targets\":{\"browsers\":[\"> 1%\",\"last 4 versions\",\"not ie < 9\"]}}],[\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-react/lib/index.js\"],\"plugins\":[\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-remove-graphql-queries/index.js\",\"/Users/jason/src/react-widgets/node_modules/babel-plugin-transform-decorators-legacy/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"cacheDirectory\":true}!./plugins/gatsby-plugin-jsxtreme-markdown/loader.js!./src/pages/controllables.md"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=component---src-pages-index-md!./src/pages/index.md":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("component---src-pages-index-md").then(__webpack_require__.bind(null, "./node_modules/babel-loader/lib/index.js?{\"presets\":[[\"/Users/jason/src/react-widgets/node_modules/babel-preset-jason/index.js\",{\"debug\":false,\"targets\":{\"browsers\":[\"> 1%\",\"last 4 versions\",\"not ie < 9\"]}}],[\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-react/lib/index.js\"],\"plugins\":[\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-remove-graphql-queries/index.js\",\"/Users/jason/src/react-widgets/node_modules/babel-plugin-transform-decorators-legacy/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"cacheDirectory\":true}!./plugins/gatsby-plugin-jsxtreme-markdown/loader.js!./src/pages/index.md"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=component---src-pages-localization-md!./src/pages/localization.md":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("component---src-pages-localization-md").then(__webpack_require__.bind(null, "./node_modules/babel-loader/lib/index.js?{\"presets\":[[\"/Users/jason/src/react-widgets/node_modules/babel-preset-jason/index.js\",{\"debug\":false,\"targets\":{\"browsers\":[\"> 1%\",\"last 4 versions\",\"not ie < 9\"]}}],[\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-react/lib/index.js\"],\"plugins\":[\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-remove-graphql-queries/index.js\",\"/Users/jason/src/react-widgets/node_modules/babel-plugin-transform-decorators-legacy/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"cacheDirectory\":true}!./plugins/gatsby-plugin-jsxtreme-markdown/loader.js!./src/pages/localization.md"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=component---src-pages-migration-v-4-md!./src/pages/migration-v4.md":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("component---src-pages-migration-v-4-md").then(__webpack_require__.bind(null, "./node_modules/babel-loader/lib/index.js?{\"presets\":[[\"/Users/jason/src/react-widgets/node_modules/babel-preset-jason/index.js\",{\"debug\":false,\"targets\":{\"browsers\":[\"> 1%\",\"last 4 versions\",\"not ie < 9\"]}}],[\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-react/lib/index.js\"],\"plugins\":[\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-remove-graphql-queries/index.js\",\"/Users/jason/src/react-widgets/node_modules/babel-plugin-transform-decorators-legacy/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"cacheDirectory\":true}!./plugins/gatsby-plugin-jsxtreme-markdown/loader.js!./src/pages/migration-v4.md"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=component---src-pages-theming-md!./src/pages/theming.md":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("component---src-pages-theming-md").then(__webpack_require__.bind(null, "./node_modules/babel-loader/lib/index.js?{\"presets\":[[\"/Users/jason/src/react-widgets/node_modules/babel-preset-jason/index.js\",{\"debug\":false,\"targets\":{\"browsers\":[\"> 1%\",\"last 4 versions\",\"not ie < 9\"]}}],[\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-react/lib/index.js\"],\"plugins\":[\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-remove-graphql-queries/index.js\",\"/Users/jason/src/react-widgets/node_modules/babel-plugin-transform-decorators-legacy/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"cacheDirectory\":true}!./plugins/gatsby-plugin-jsxtreme-markdown/loader.js!./src/pages/theming.md"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=component---src-templates-component-js!./src/templates/component.js":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("component---src-templates-component-js").then(__webpack_require__.bind(null, "./node_modules/babel-loader/lib/index.js?{\"presets\":[[\"/Users/jason/src/react-widgets/node_modules/babel-preset-jason/index.js\",{\"debug\":false,\"targets\":{\"browsers\":[\"> 1%\",\"last 4 versions\",\"not ie < 9\"]}}],[\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-env/lib/index.js\",{\"loose\":true,\"uglify\":true,\"modules\":\"commonjs\",\"targets\":{\"browsers\":[\"> 1%\",\"last 2 versions\",\"IE >= 9\"]},\"exclude\":[\"transform-regenerator\",\"transform-es2015-typeof-symbol\"]}],\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-stage-0/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-preset-react/lib/index.js\"],\"plugins\":[\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-remove-graphql-queries/index.js\",\"/Users/jason/src/react-widgets/node_modules/babel-plugin-transform-decorators-legacy/lib/index.js\",\"/Users/jason/src/react-widgets/www/node_modules/babel-plugin-transform-object-assign/lib/index.js\"],\"cacheDirectory\":true}!./node_modules/css-literal-loader/lib/loader.js?{\"extension\":\".less\",\"tagName\":\"less\"}!./node_modules/imports-loader/index.js?define=>false,__VERSION__=>\"4.0.0-rc.16\"!./src/templates/component.js"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---!./.cache/json/layout-index.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---").then(__webpack_require__.bind(null, "./.cache/json/layout-index.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---api-calendar!./.cache/json/api-calendar.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---api-calendar").then(__webpack_require__.bind(null, "./.cache/json/api-calendar.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---api-combobox!./.cache/json/api-combobox.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---api-combobox").then(__webpack_require__.bind(null, "./.cache/json/api-combobox.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---api-date-time-picker!./.cache/json/api-date-time-picker.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---api-date-time-picker").then(__webpack_require__.bind(null, "./.cache/json/api-date-time-picker.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---api-dropdown-list!./.cache/json/api-dropdown-list.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---api-dropdown-list").then(__webpack_require__.bind(null, "./.cache/json/api-dropdown-list.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---api-multiselect!./.cache/json/api-multiselect.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---api-multiselect").then(__webpack_require__.bind(null, "./.cache/json/api-multiselect.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---api-number-picker!./.cache/json/api-number-picker.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---api-number-picker").then(__webpack_require__.bind(null, "./.cache/json/api-number-picker.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---api-select-list!./.cache/json/api-select-list.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---api-select-list").then(__webpack_require__.bind(null, "./.cache/json/api-select-list.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---controllables!./.cache/json/controllables.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---controllables").then(__webpack_require__.bind(null, "./.cache/json/controllables.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---index!./.cache/json/index.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---index").then(__webpack_require__.bind(null, "./.cache/json/index.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---localization!./.cache/json/localization.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---localization").then(__webpack_require__.bind(null, "./.cache/json/localization.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---migration-v-4!./.cache/json/migration-v-4.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---migration-v-4").then(__webpack_require__.bind(null, "./.cache/json/migration-v-4.json"))

/***/ }),

/***/ "./node_modules/gatsby-module-loader/index.js?name=path---theming!./.cache/json/theming.json":
/***/ (function(module, exports, __webpack_require__) {

module.exports = () => __webpack_require__.e/* import() */("path---theming").then(__webpack_require__.bind(null, "./.cache/json/theming.json"))

/***/ }),

/***/ "./node_modules/hoist-non-react-statics/index.js":
/***/ (function(module, exports) {

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';

var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};



/***/ }),

/***/ "./node_modules/mitt/dist/mitt.es.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

//      
// An event handler can take an optional event argument
// and should not return a value
                                          
// An array of all currently registered event handlers for a type
                                            
// A map of event types and their corresponding event handlers.
                        
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberof mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).map(function (handler) { handler(evt); });
			(all['*'] || []).map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ __webpack_exports__["default"] = (mitt);
//# sourceMappingURL=mitt.es.js.map



/***/ }),

/***/ "./node_modules/object-assign/index.js":
/***/ (function(module, exports) {

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};



/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

/*** IMPORTS FROM imports-loader ***/
var define = false;
var __VERSION__ = "4.0.0-rc.16";

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };



/***/ })

},["./.cache/production-app.js"]);
//# sourceMappingURL=app-9d2845bf55f74980c8b5.js.map