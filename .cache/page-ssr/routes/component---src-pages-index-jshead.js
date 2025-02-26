exports.id = "component---src-pages-index-jshead";
exports.ids = ["component---src-pages-index-jshead"];
exports.modules = {

/***/ "./node_modules/camelcase/index.js":
/*!*****************************************!*\
  !*** ./node_modules/camelcase/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;

const LEADING_SEPARATORS = new RegExp('^' + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
const NUMBERS_AND_IDENTIFIER = new RegExp('\\d+' + IDENTIFIER.source, 'gu');

const preserveCamelCase = (string, toLowerCase, toUpperCase) => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && UPPERCASE.test(character)) {
			string = string.slice(0, i) + '-' + string.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
		}
	}

	return string;
};

const preserveConsecutiveUppercase = (input, toLowerCase) => {
	LEADING_CAPITAL.lastIndex = 0;

	return input.replace(LEADING_CAPITAL, m1 => toLowerCase(m1));
};

const postProcess = (input, toUpperCase) => {
	SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
	NUMBERS_AND_IDENTIFIER.lastIndex = 0;

	return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier))
		.replace(NUMBERS_AND_IDENTIFIER, m => toUpperCase(m));
};

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = {
		pascalCase: false,
		preserveConsecutiveUppercase: false,
		...options
	};

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	const toLowerCase = options.locale === false ?
		string => string.toLowerCase() :
		string => string.toLocaleLowerCase(options.locale);
	const toUpperCase = options.locale === false ?
		string => string.toUpperCase() :
		string => string.toLocaleUpperCase(options.locale);

	if (input.length === 1) {
		return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
	}

	const hasUpperCase = input !== toLowerCase(input);

	if (hasUpperCase) {
		input = preserveCamelCase(input, toLowerCase, toUpperCase);
	}

	input = input.replace(LEADING_SEPARATORS, '');

	if (options.preserveConsecutiveUppercase) {
		input = preserveConsecutiveUppercase(input, toLowerCase);
	} else {
		input = toLowerCase(input);
	}

	if (options.pascalCase) {
		input = toUpperCase(input.charAt(0)) + input.slice(1);
	}

	return postProcess(input, toUpperCase);
};

module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports["default"] = camelCase;


/***/ }),

/***/ "./node_modules/gatsby-page-utils/dist/apply-trailing-slash-option.js":
/*!****************************************************************************!*\
  !*** ./node_modules/gatsby-page-utils/dist/apply-trailing-slash-option.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.applyTrailingSlashOption = void 0;
const endsWithSuffixes = (suffixes, input) => {
  for (const suffix of suffixes) {
    if (input.endsWith(suffix)) return true;
  }
  return false;
};
const suffixes = [`.html`, `.json`, `.js`, `.map`, `.txt`, `.xml`, `.pdf`];
const applyTrailingSlashOption = (input, option = `always`) => {
  if (input === `/`) return input;
  const hasTrailingSlash = input.endsWith(`/`);
  if (endsWithSuffixes(suffixes, input)) {
    return input;
  }
  if (option === `always`) {
    return hasTrailingSlash ? input : `${input}/`;
  }
  if (option === `never`) {
    return hasTrailingSlash ? input.slice(0, -1) : input;
  }
  return input;
};
exports.applyTrailingSlashOption = applyTrailingSlashOption;

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = exports.ScrollContext = void 0;
var _scrollHandler = __webpack_require__(/*! ./scroll-handler */ "./node_modules/gatsby-react-router-scroll/scroll-handler.js");
exports.ScrollContext = _scrollHandler.ScrollHandler;
var _useScrollRestoration = __webpack_require__(/*! ./use-scroll-restoration */ "./node_modules/gatsby-react-router-scroll/use-scroll-restoration.js");
exports.useScrollRestoration = _useScrollRestoration.useScrollRestoration;

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/scroll-handler.js":
/*!*******************************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/scroll-handler.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");
exports.__esModule = true;
exports.ScrollHandler = exports.ScrollContext = void 0;
var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js"));
var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js"));
var React = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));
var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));
var _sessionStorage = __webpack_require__(/*! ./session-storage */ "./node_modules/gatsby-react-router-scroll/session-storage.js");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ScrollContext = /*#__PURE__*/React.createContext(new _sessionStorage.SessionStorage());
exports.ScrollContext = ScrollContext;
ScrollContext.displayName = "GatsbyScrollContext";
var ScrollHandler = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(ScrollHandler, _React$Component);
  function ScrollHandler() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this._stateStorage = new _sessionStorage.SessionStorage();
    _this._isTicking = false;
    _this._latestKnownScrollY = 0;
    _this.scrollListener = function () {
      _this._latestKnownScrollY = window.scrollY;
      if (!_this._isTicking) {
        _this._isTicking = true;
        requestAnimationFrame(_this._saveScroll.bind((0, _assertThisInitialized2.default)(_this)));
      }
    };
    _this.windowScroll = function (position, prevProps) {
      if (_this.shouldUpdateScroll(prevProps, _this.props)) {
        window.scrollTo(0, position);
      }
    };
    _this.scrollToHash = function (hash, prevProps) {
      var node = document.getElementById(hash.substring(1));
      if (node && _this.shouldUpdateScroll(prevProps, _this.props)) {
        node.scrollIntoView();
      }
    };
    _this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
      var shouldUpdateScroll = _this.props.shouldUpdateScroll;
      if (!shouldUpdateScroll) {
        return true;
      }

      // Hack to allow accessing this._stateStorage.
      return shouldUpdateScroll.call((0, _assertThisInitialized2.default)(_this), prevRouterProps, routerProps);
    };
    return _this;
  }
  var _proto = ScrollHandler.prototype;
  _proto._saveScroll = function _saveScroll() {
    var key = this.props.location.key || null;
    if (key) {
      this._stateStorage.save(this.props.location, key, this._latestKnownScrollY);
    }
    this._isTicking = false;
  };
  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener("scroll", this.scrollListener);
    var scrollPosition;
    var _this$props$location = this.props.location,
      key = _this$props$location.key,
      hash = _this$props$location.hash;
    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    /** If a hash is present in the browser url as the component mounts (i.e. the user is navigating
     * from an external website) then scroll to the hash instead of any previously stored scroll
     * position. */
    if (hash) {
      this.scrollToHash(decodeURI(hash), undefined);
    } else if (scrollPosition) {
      this.windowScroll(scrollPosition, undefined);
    }
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props$location2 = this.props.location,
      hash = _this$props$location2.hash,
      key = _this$props$location2.key;
    var scrollPosition;
    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    /**  There are two pieces of state: the browser url and
     * history state which keeps track of scroll position
     * Native behaviour prescribes that we ought to restore scroll position
     * when a user navigates back in their browser (this is the `POP` action)
     * Currently, reach router has a bug that prevents this at https://github.com/reach/router/issues/228
     * So we _always_ stick to the url as a source of truth — if the url
     * contains a hash, we scroll to it
     */

    if (hash) {
      this.scrollToHash(decodeURI(hash), prevProps);
    } else {
      this.windowScroll(scrollPosition, prevProps);
    }
  };
  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
      value: this._stateStorage
    }, this.props.children);
  };
  return ScrollHandler;
}(React.Component);
exports.ScrollHandler = ScrollHandler;
ScrollHandler.propTypes = {
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.element.isRequired,
  location: _propTypes.default.object.isRequired
};

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/session-storage.js":
/*!********************************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/session-storage.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;
exports.SessionStorage = void 0;
var STATE_KEY_PREFIX = "@@scroll|";
var GATSBY_ROUTER_SCROLL_STATE = "___GATSBY_REACT_ROUTER_SCROLL";
var SessionStorage = /*#__PURE__*/function () {
  function SessionStorage() {}
  var _proto = SessionStorage.prototype;
  _proto.read = function read(location, key) {
    var stateKey = this.getStateKey(location, key);
    try {
      var value = window.sessionStorage.getItem(stateKey);
      return value ? JSON.parse(value) : 0;
    } catch (e) {
      if (true) {
        console.warn("[gatsby-react-router-scroll] Unable to access sessionStorage; sessionStorage is not available.");
      }
      if (window && window[GATSBY_ROUTER_SCROLL_STATE] && window[GATSBY_ROUTER_SCROLL_STATE][stateKey]) {
        return window[GATSBY_ROUTER_SCROLL_STATE][stateKey];
      }
      return 0;
    }
  };
  _proto.save = function save(location, key, value) {
    var stateKey = this.getStateKey(location, key);
    var storedValue = JSON.stringify(value);
    try {
      window.sessionStorage.setItem(stateKey, storedValue);
    } catch (e) {
      if (window && window[GATSBY_ROUTER_SCROLL_STATE]) {
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      } else {
        window[GATSBY_ROUTER_SCROLL_STATE] = {};
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      }
      if (true) {
        console.warn("[gatsby-react-router-scroll] Unable to save state in sessionStorage; sessionStorage is not available.");
      }
    }
  };
  _proto.getStateKey = function getStateKey(location, key) {
    var stateKeyBase = "" + STATE_KEY_PREFIX + location.pathname;
    return key === null || typeof key === "undefined" ? stateKeyBase : stateKeyBase + "|" + key;
  };
  return SessionStorage;
}();
exports.SessionStorage = SessionStorage;

/***/ }),

/***/ "./node_modules/gatsby-react-router-scroll/use-scroll-restoration.js":
/*!***************************************************************************!*\
  !*** ./node_modules/gatsby-react-router-scroll/use-scroll-restoration.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = useScrollRestoration;
var _scrollHandler = __webpack_require__(/*! ./scroll-handler */ "./node_modules/gatsby-react-router-scroll/scroll-handler.js");
var _react = __webpack_require__(/*! react */ "react");
var _reachRouter = __webpack_require__(/*! @gatsbyjs/reach-router */ "./node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs");
function useScrollRestoration(identifier) {
  var location = (0, _reachRouter.useLocation)();
  var state = (0, _react.useContext)(_scrollHandler.ScrollContext);
  var ref = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(function () {
    if (ref.current) {
      var position = state.read(location, identifier);
      ref.current.scrollTo(0, position || 0);
    }
  }, [location.key]);
  return {
    ref: ref,
    onScroll: function onScroll() {
      if (ref.current) {
        state.save(location, identifier, ref.current.scrollTop);
      }
    }
  };
}

/***/ }),

/***/ "./.cache/context-utils.js":
/*!*********************************!*\
  !*** ./.cache/context-utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createServerOrClientContext: () => (/* binding */ createServerOrClientContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


// Ensure serverContext is not created more than once as React will throw when creating it more than once
// https://github.com/facebook/react/blob/dd2d6522754f52c70d02c51db25eb7cbd5d1c8eb/packages/react/src/ReactServerContext.js#L101
const createServerContext = (name, defaultValue = null) => {
  /* eslint-disable no-undef */
  if (!globalThis.__SERVER_CONTEXT) {
    globalThis.__SERVER_CONTEXT = {};
  }
  if (!globalThis.__SERVER_CONTEXT[name]) {
    globalThis.__SERVER_CONTEXT[name] = react__WEBPACK_IMPORTED_MODULE_0___default().createServerContext(name, defaultValue);
  }
  return globalThis.__SERVER_CONTEXT[name];
};
function createServerOrClientContext(name, defaultValue) {
  if ((react__WEBPACK_IMPORTED_MODULE_0___default().createServerContext)) {
    return createServerContext(name, defaultValue);
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext(defaultValue);
}


/***/ }),

/***/ "./.cache/emitter.js":
/*!***************************!*\
  !*** ./.cache/emitter.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mitt */ "./node_modules/mitt/dist/mitt.es.js");

const emitter = (0,mitt__WEBPACK_IMPORTED_MODULE_0__["default"])();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (emitter);

/***/ }),

/***/ "./.cache/find-path.js":
/*!*****************************!*\
  !*** ./.cache/find-path.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanPath: () => (/* binding */ cleanPath),
/* harmony export */   findMatchPath: () => (/* binding */ findMatchPath),
/* harmony export */   findPath: () => (/* binding */ findPath),
/* harmony export */   grabMatchParams: () => (/* binding */ grabMatchParams),
/* harmony export */   setMatchPaths: () => (/* binding */ setMatchPaths)
/* harmony export */ });
/* harmony import */ var _gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @gatsbyjs/reach-router */ "./node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs");
/* harmony import */ var _strip_prefix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./strip-prefix */ "./.cache/strip-prefix.js");
/* harmony import */ var _normalize_page_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./normalize-page-path */ "./.cache/normalize-page-path.js");
/* harmony import */ var _redirect_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./redirect-utils.js */ "./.cache/redirect-utils.js");




const pathCache = new Map();
let matchPaths = [];
const trimPathname = rawPathname => {
  let newRawPathname = rawPathname;
  const queryIndex = rawPathname.indexOf(`?`);
  if (queryIndex !== -1) {
    const [path, qs] = rawPathname.split(`?`);
    newRawPathname = `${path}?${encodeURIComponent(qs)}`;
  }
  const pathname = decodeURIComponent(newRawPathname);

  // Remove the pathPrefix from the pathname.
  const trimmedPathname = (0,_strip_prefix__WEBPACK_IMPORTED_MODULE_1__["default"])(pathname, decodeURIComponent(""))
  // Remove any hashfragment
  .split(`#`)[0];
  return trimmedPathname;
};
function absolutify(path) {
  // If it's already absolute, return as-is
  if (path.startsWith(`/`) || path.startsWith(`https://`) || path.startsWith(`http://`)) {
    return path;
  }
  // Calculate path relative to current location, adding a trailing slash to
  // match behavior of @reach/router
  return new URL(path, window.location.href + (window.location.href.endsWith(`/`) ? `` : `/`)).pathname;
}

/**
 * Set list of matchPaths
 *
 * @param {Array<{path: string, matchPath: string}>} value collection of matchPaths
 */
const setMatchPaths = value => {
  matchPaths = value;
};

/**
 * Return a matchpath url
 * if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
 * `/foo?bar=far` => `/page1`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string|null}
 */
const findMatchPath = rawPathname => {
  const trimmedPathname = cleanPath(rawPathname);
  const pickPaths = matchPaths.map(({
    path,
    matchPath
  }) => {
    return {
      path: matchPath,
      originalPath: path
    };
  });
  const path = (0,_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_0__.pick)(pickPaths, trimmedPathname);
  if (path) {
    return (0,_normalize_page_path__WEBPACK_IMPORTED_MODULE_2__["default"])(path.route.originalPath);
  }
  return null;
};

/**
 * Return a matchpath params from reach/router rules
 * if `match-paths.json` contains `{ ":bar/*foo" }`, and the path is /baz/zaz/zoo
 * then it returns
 *  { bar: baz, foo: zaz/zoo }
 *
 * @param {string} rawPathname A raw pathname
 * @return {object}
 */
const grabMatchParams = rawPathname => {
  const trimmedPathname = cleanPath(rawPathname);
  const pickPaths = matchPaths.map(({
    path,
    matchPath
  }) => {
    return {
      path: matchPath,
      originalPath: path
    };
  });
  const path = (0,_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_0__.pick)(pickPaths, trimmedPathname);
  if (path) {
    return path.params;
  }
  return {};
};

// Given a raw URL path, returns the cleaned version of it (trim off
// `#` and query params), or if it matches an entry in
// `match-paths.json`, its matched path is returned
//
// E.g. `/foo?bar=far` => `/foo`
//
// Or if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
// `/foo?bar=far` => `/page1`
const findPath = rawPathname => {
  const trimmedPathname = trimPathname(absolutify(rawPathname));
  if (pathCache.has(trimmedPathname)) {
    return pathCache.get(trimmedPathname);
  }
  const redirect = (0,_redirect_utils_js__WEBPACK_IMPORTED_MODULE_3__.maybeGetBrowserRedirect)(rawPathname);
  if (redirect) {
    return findPath(redirect.toPath);
  }
  let foundPath = findMatchPath(trimmedPathname);
  if (!foundPath) {
    foundPath = cleanPath(rawPathname);
  }
  pathCache.set(trimmedPathname, foundPath);
  return foundPath;
};

/**
 * Clean a url and converts /index.html => /
 * E.g. `/foo?bar=far` => `/foo`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string}
 */
const cleanPath = rawPathname => {
  const trimmedPathname = trimPathname(absolutify(rawPathname));
  let foundPath = trimmedPathname;
  if (foundPath === `/index.html`) {
    foundPath = `/`;
  }
  foundPath = (0,_normalize_page_path__WEBPACK_IMPORTED_MODULE_2__["default"])(foundPath);
  return foundPath;
};

/***/ }),

/***/ "./.cache/gatsby-browser-entry.js":
/*!****************************************!*\
  !*** ./.cache/gatsby-browser-entry.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Link: () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.Link),
/* harmony export */   PageRenderer: () => (/* reexport default from dynamic */ _public_page_renderer__WEBPACK_IMPORTED_MODULE_1___default.a),
/* harmony export */   Script: () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.Script),
/* harmony export */   ScriptStrategy: () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.ScriptStrategy),
/* harmony export */   Slice: () => (/* reexport safe */ _slice__WEBPACK_IMPORTED_MODULE_5__.Slice),
/* harmony export */   StaticQuery: () => (/* reexport safe */ _static_query__WEBPACK_IMPORTED_MODULE_4__.StaticQuery),
/* harmony export */   StaticQueryContext: () => (/* reexport safe */ _static_query__WEBPACK_IMPORTED_MODULE_4__.StaticQueryContext),
/* harmony export */   collectedScriptsByPage: () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.collectedScriptsByPage),
/* harmony export */   graphql: () => (/* binding */ graphql),
/* harmony export */   navigate: () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.navigate),
/* harmony export */   parsePath: () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.parsePath),
/* harmony export */   prefetchPathname: () => (/* binding */ prefetchPathname),
/* harmony export */   scriptCache: () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.scriptCache),
/* harmony export */   scriptCallbackCache: () => (/* reexport safe */ gatsby_script__WEBPACK_IMPORTED_MODULE_6__.scriptCallbackCache),
/* harmony export */   useScrollRestoration: () => (/* reexport safe */ gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2__.useScrollRestoration),
/* harmony export */   useStaticQuery: () => (/* reexport safe */ _static_query__WEBPACK_IMPORTED_MODULE_4__.useStaticQuery),
/* harmony export */   withAssetPrefix: () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.withAssetPrefix),
/* harmony export */   withPrefix: () => (/* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_3__.withPrefix)
/* harmony export */ });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loader */ "./.cache/loader.js");
/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./public-page-renderer */ "./.cache/public-page-renderer.js");
/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_public_page_renderer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby-react-router-scroll */ "./node_modules/gatsby-react-router-scroll/index.js");
/* harmony import */ var gatsby_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby-link */ "./node_modules/gatsby-link/dist/index.modern.mjs");
/* harmony import */ var _static_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./static-query */ "./.cache/static-query.js");
/* harmony import */ var _slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./slice */ "./.cache/slice.js");
/* harmony import */ var gatsby_script__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gatsby-script */ "./node_modules/gatsby-script/dist/index.modern.mjs");

const prefetchPathname = _loader__WEBPACK_IMPORTED_MODULE_0__["default"].enqueue;
function graphql() {
  throw new Error(`It appears like Gatsby is misconfigured. Gatsby related \`graphql\` calls ` + `are supposed to only be evaluated at compile time, and then compiled away. ` + `Unfortunately, something went wrong and the query was left in the compiled code.\n\n` + `Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.`);
}








/***/ }),

/***/ "./.cache/loader.js":
/*!**************************!*\
  !*** ./.cache/loader.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseLoader: () => (/* binding */ BaseLoader),
/* harmony export */   PageResourceStatus: () => (/* binding */ PageResourceStatus),
/* harmony export */   ProdLoader: () => (/* binding */ ProdLoader),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getSliceResults: () => (/* binding */ getSliceResults),
/* harmony export */   getStaticQueryResults: () => (/* binding */ getStaticQueryResults),
/* harmony export */   publicLoader: () => (/* binding */ publicLoader),
/* harmony export */   setLoader: () => (/* binding */ setLoader)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-server-dom-webpack */ "./node_modules/react-server-dom-webpack/index.js");
/* harmony import */ var _prefetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prefetch */ "./.cache/prefetch.js");
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emitter */ "./.cache/emitter.js");
/* harmony import */ var _find_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./find-path */ "./.cache/find-path.js");





/**
 * Available resource loading statuses
 */
const PageResourceStatus = {
  /**
   * At least one of critical resources failed to load
   */
  Error: `error`,
  /**
   * Resources loaded successfully
   */
  Success: `success`
};
const preferDefault = m => m && m.default || m;
const stripSurroundingSlashes = s => {
  s = s[0] === `/` ? s.slice(1) : s;
  s = s.endsWith(`/`) ? s.slice(0, -1) : s;
  return s;
};
const createPageDataUrl = rawPath => {
  const [path, maybeSearch] = rawPath.split(`?`);
  const fixedPath = path === `/` ? `index` : stripSurroundingSlashes(path);
  return `${""}/page-data/${fixedPath}/page-data.json${maybeSearch ? `?${maybeSearch}` : ``}`;
};

/**
 * Utility to check the path that goes into doFetch for e.g. potential malicious intentions.
 * It checks for "//" because with this you could do a fetch request to a different domain.
 */
const shouldAbortFetch = rawPath => rawPath.startsWith(`//`);
function doFetch(url, method = `GET`) {
  return new Promise(resolve => {
    const req = new XMLHttpRequest();
    req.open(method, url, true);
    req.onreadystatechange = () => {
      if (req.readyState == 4) {
        resolve(req);
      }
    };
    req.send(null);
  });
}
const doesConnectionSupportPrefetch = () => {
  if (`connection` in navigator && typeof navigator.connection !== `undefined`) {
    if ((navigator.connection.effectiveType || ``).includes(`2g`)) {
      return false;
    }
    if (navigator.connection.saveData) {
      return false;
    }
  }
  return true;
};

// Regex that matches common search crawlers
const BOT_REGEX = /bot|crawler|spider|crawling/i;
const toPageResources = (pageData, component = null, head) => {
  var _pageData$slicesMap;
  const page = {
    componentChunkName: pageData.componentChunkName,
    path: pageData.path,
    webpackCompilationHash: pageData.webpackCompilationHash,
    matchPath: pageData.matchPath,
    staticQueryHashes: pageData.staticQueryHashes,
    getServerDataError: pageData.getServerDataError,
    slicesMap: (_pageData$slicesMap = pageData.slicesMap) !== null && _pageData$slicesMap !== void 0 ? _pageData$slicesMap : {}
  };
  return {
    component,
    head,
    json: pageData.result,
    page
  };
};
function waitForResponse(response) {
  return new Promise(resolve => {
    try {
      const result = response.readRoot();
      resolve(result);
    } catch (err) {
      if (Object.hasOwnProperty.call(err, `_response`) && Object.hasOwnProperty.call(err, `_status`)) {
        setTimeout(() => {
          waitForResponse(response).then(resolve);
        }, 200);
      } else {
        throw err;
      }
    }
  });
}
class BaseLoader {
  constructor(loadComponent, matchPaths) {
    this.inFlightNetworkRequests = new Map();
    // Map of pagePath -> Page. Where Page is an object with: {
    //   status: PageResourceStatus.Success || PageResourceStatus.Error,
    //   payload: PageResources, // undefined if PageResourceStatus.Error
    // }
    // PageResources is {
    //   component,
    //   json: pageData.result,
    //   page: {
    //     componentChunkName,
    //     path,
    //     webpackCompilationHash,
    //     staticQueryHashes
    //   },
    //   staticQueryResults
    // }
    this.pageDb = new Map();
    this.inFlightDb = new Map();
    this.staticQueryDb = {};
    this.pageDataDb = new Map();
    this.partialHydrationDb = new Map();
    this.slicesDataDb = new Map();
    this.sliceInflightDb = new Map();
    this.slicesDb = new Map();
    this.isPrefetchQueueRunning = false;
    this.prefetchQueued = [];
    this.prefetchTriggered = new Set();
    this.prefetchCompleted = new Set();
    this.loadComponent = loadComponent;
    (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.setMatchPaths)(matchPaths);
  }
  memoizedGet(url) {
    let inFlightPromise = this.inFlightNetworkRequests.get(url);
    if (!inFlightPromise) {
      inFlightPromise = doFetch(url, `GET`);
      this.inFlightNetworkRequests.set(url, inFlightPromise);
    }

    // Prefer duplication with then + catch over .finally to prevent problems in ie11 + firefox
    return inFlightPromise.then(response => {
      this.inFlightNetworkRequests.delete(url);
      return response;
    }).catch(err => {
      this.inFlightNetworkRequests.delete(url);
      throw err;
    });
  }
  setApiRunner(apiRunner) {
    this.apiRunner = apiRunner;
    this.prefetchDisabled = apiRunner(`disableCorePrefetching`).some(a => a);
  }
  fetchPageDataJson(loadObj) {
    const {
      pagePath,
      retries = 0
    } = loadObj;
    const url = createPageDataUrl(pagePath);
    return this.memoizedGet(url).then(req => {
      const {
        status,
        responseText
      } = req;

      // Handle 200
      if (status === 200) {
        try {
          const jsonPayload = JSON.parse(responseText);
          if (jsonPayload.path === undefined) {
            throw new Error(`not a valid pageData response`);
          }
          const maybeSearch = pagePath.split(`?`)[1];
          if (maybeSearch && !jsonPayload.path.includes(maybeSearch)) {
            jsonPayload.path += `?${maybeSearch}`;
          }
          return Object.assign(loadObj, {
            status: PageResourceStatus.Success,
            payload: jsonPayload
          });
        } catch (err) {
          // continue regardless of error
        }
      }

      // Handle 404
      if (status === 404 || status === 200) {
        // If the request was for a 404/500 page and it doesn't exist, we're done
        if (pagePath === `/404.html` || pagePath === `/500.html`) {
          return Object.assign(loadObj, {
            status: PageResourceStatus.Error
          });
        }

        // Need some code here to cache the 404 request. In case
        // multiple loadPageDataJsons result in 404s
        return this.fetchPageDataJson(Object.assign(loadObj, {
          pagePath: `/404.html`,
          notFound: true
        }));
      }

      // handle 500 response (Unrecoverable)
      if (status === 500) {
        return this.fetchPageDataJson(Object.assign(loadObj, {
          pagePath: `/500.html`,
          internalServerError: true
        }));
      }

      // Handle everything else, including status === 0, and 503s. Should retry
      if (retries < 3) {
        return this.fetchPageDataJson(Object.assign(loadObj, {
          retries: retries + 1
        }));
      }

      // Retried 3 times already, result is an error.
      return Object.assign(loadObj, {
        status: PageResourceStatus.Error
      });
    });
  }
  fetchPartialHydrationJson(loadObj) {
    const {
      pagePath,
      retries = 0
    } = loadObj;
    const url = createPageDataUrl(pagePath).replace(`.json`, `-rsc.json`);
    return this.memoizedGet(url).then(req => {
      const {
        status,
        responseText
      } = req;

      // Handle 200
      if (status === 200) {
        try {
          return Object.assign(loadObj, {
            status: PageResourceStatus.Success,
            payload: responseText
          });
        } catch (err) {
          // continue regardless of error
        }
      }

      // Handle 404
      if (status === 404 || status === 200) {
        // If the request was for a 404/500 page and it doesn't exist, we're done
        if (pagePath === `/404.html` || pagePath === `/500.html`) {
          return Object.assign(loadObj, {
            status: PageResourceStatus.Error
          });
        }

        // Need some code here to cache the 404 request. In case
        // multiple loadPageDataJsons result in 404s
        return this.fetchPartialHydrationJson(Object.assign(loadObj, {
          pagePath: `/404.html`,
          notFound: true
        }));
      }

      // handle 500 response (Unrecoverable)
      if (status === 500) {
        return this.fetchPartialHydrationJson(Object.assign(loadObj, {
          pagePath: `/500.html`,
          internalServerError: true
        }));
      }

      // Handle everything else, including status === 0, and 503s. Should retry
      if (retries < 3) {
        return this.fetchPartialHydrationJson(Object.assign(loadObj, {
          retries: retries + 1
        }));
      }

      // Retried 3 times already, result is an error.
      return Object.assign(loadObj, {
        status: PageResourceStatus.Error
      });
    });
  }
  loadPageDataJson(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    if (this.pageDataDb.has(pagePath)) {
      const pageData = this.pageDataDb.get(pagePath);
      if (true) {
        return Promise.resolve(pageData);
      }
    }
    return this.fetchPageDataJson({
      pagePath
    }).then(pageData => {
      this.pageDataDb.set(pagePath, pageData);
      return pageData;
    });
  }
  loadPartialHydrationJson(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    if (this.partialHydrationDb.has(pagePath)) {
      const pageData = this.partialHydrationDb.get(pagePath);
      if (true) {
        return Promise.resolve(pageData);
      }
    }
    return this.fetchPartialHydrationJson({
      pagePath
    }).then(pageData => {
      this.partialHydrationDb.set(pagePath, pageData);
      return pageData;
    });
  }
  loadSliceDataJson(sliceName) {
    if (this.slicesDataDb.has(sliceName)) {
      const jsonPayload = this.slicesDataDb.get(sliceName);
      return Promise.resolve({
        sliceName,
        jsonPayload
      });
    }
    const url = `${""}/slice-data/${sliceName}.json`;
    return doFetch(url, `GET`).then(res => {
      const jsonPayload = JSON.parse(res.responseText);
      this.slicesDataDb.set(sliceName, jsonPayload);
      return {
        sliceName,
        jsonPayload
      };
    });
  }
  findMatchPath(rawPath) {
    return (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findMatchPath)(rawPath);
  }

  // TODO check all uses of this and whether they use undefined for page resources not exist
  loadPage(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    if (this.pageDb.has(pagePath)) {
      const page = this.pageDb.get(pagePath);
      if (true) {
        if (page.error) {
          return Promise.resolve({
            error: page.error,
            status: page.status
          });
        }
        return Promise.resolve(page.payload);
      }
    }
    if (this.inFlightDb.has(pagePath)) {
      return this.inFlightDb.get(pagePath);
    }
    const loadDataPromises = [this.loadAppData(), this.loadPageDataJson(pagePath)];
    if (false) {}
    const inFlightPromise = Promise.all(loadDataPromises).then(allData => {
      const [appDataResponse, pageDataResponse, rscDataResponse] = allData;
      if (pageDataResponse.status === PageResourceStatus.Error || (rscDataResponse === null || rscDataResponse === void 0 ? void 0 : rscDataResponse.status) === PageResourceStatus.Error) {
        return {
          status: PageResourceStatus.Error
        };
      }
      let pageData = pageDataResponse.payload;
      const {
        componentChunkName,
        staticQueryHashes: pageStaticQueryHashes = [],
        slicesMap = {}
      } = pageData;
      const finalResult = {};
      const dedupedSliceNames = Array.from(new Set(Object.values(slicesMap)));
      const loadSlice = slice => {
        if (this.slicesDb.has(slice.name)) {
          return this.slicesDb.get(slice.name);
        } else if (this.sliceInflightDb.has(slice.name)) {
          return this.sliceInflightDb.get(slice.name);
        }
        const inFlight = this.loadComponent(slice.componentChunkName).then(component => {
          return {
            component: preferDefault(component),
            sliceContext: slice.result.sliceContext,
            data: slice.result.data
          };
        });
        this.sliceInflightDb.set(slice.name, inFlight);
        inFlight.then(results => {
          this.slicesDb.set(slice.name, results);
          this.sliceInflightDb.delete(slice.name);
        });
        return inFlight;
      };
      return Promise.all(dedupedSliceNames.map(sliceName => this.loadSliceDataJson(sliceName))).then(slicesData => {
        const slices = [];
        const dedupedStaticQueryHashes = [...pageStaticQueryHashes];
        for (const {
          jsonPayload,
          sliceName
        } of Object.values(slicesData)) {
          slices.push({
            name: sliceName,
            ...jsonPayload
          });
          for (const staticQueryHash of jsonPayload.staticQueryHashes) {
            if (!dedupedStaticQueryHashes.includes(staticQueryHash)) {
              dedupedStaticQueryHashes.push(staticQueryHash);
            }
          }
        }
        const loadChunkPromises = [Promise.all(slices.map(loadSlice)), this.loadComponent(componentChunkName, `head`)];
        if (true) {
          loadChunkPromises.push(this.loadComponent(componentChunkName));
        }

        // In develop we have separate chunks for template and Head components
        // to enable HMR (fast refresh requires single exports).
        // In production we have shared chunk with both exports. Double loadComponent here
        // will be deduped by webpack runtime resulting in single request and single module
        // being loaded for both `component` and `head`.
        // get list of components to get
        const componentChunkPromises = Promise.all(loadChunkPromises).then(components => {
          const [sliceComponents, headComponent, pageComponent] = components;
          finalResult.createdAt = new Date();
          for (const sliceComponent of sliceComponents) {
            if (!sliceComponent || sliceComponent instanceof Error) {
              finalResult.status = PageResourceStatus.Error;
              finalResult.error = sliceComponent;
            }
          }
          if ( true && (!pageComponent || pageComponent instanceof Error)) {
            finalResult.status = PageResourceStatus.Error;
            finalResult.error = pageComponent;
          }
          let pageResources;
          if (finalResult.status !== PageResourceStatus.Error) {
            finalResult.status = PageResourceStatus.Success;
            if (pageDataResponse.notFound === true || (rscDataResponse === null || rscDataResponse === void 0 ? void 0 : rscDataResponse.notFound) === true) {
              finalResult.notFound = true;
            }
            pageData = Object.assign(pageData, {
              webpackCompilationHash: appDataResponse ? appDataResponse.webpackCompilationHash : ``
            });
            if (typeof (rscDataResponse === null || rscDataResponse === void 0 ? void 0 : rscDataResponse.payload) === `string`) {
              pageResources = toPageResources(pageData, null, headComponent);
              pageResources.partialHydration = rscDataResponse.payload;
              const readableStream = new ReadableStream({
                start(controller) {
                  const te = new TextEncoder();
                  controller.enqueue(te.encode(rscDataResponse.payload));
                },
                pull(controller) {
                  // close on next read when queue is empty
                  controller.close();
                },
                cancel() {}
              });
              return waitForResponse((0,react_server_dom_webpack__WEBPACK_IMPORTED_MODULE_0__.createFromReadableStream)(readableStream)).then(result => {
                pageResources.partialHydration = result;
                return pageResources;
              });
            } else {
              pageResources = toPageResources(pageData, pageComponent, headComponent);
            }
          }

          // undefined if final result is an error
          return pageResources;
        });

        // get list of static queries to get
        const staticQueryBatchPromise = Promise.all(dedupedStaticQueryHashes.map(staticQueryHash => {
          // Check for cache in case this static query result has already been loaded
          if (this.staticQueryDb[staticQueryHash]) {
            const jsonPayload = this.staticQueryDb[staticQueryHash];
            return {
              staticQueryHash,
              jsonPayload
            };
          }
          return this.memoizedGet(`${""}/page-data/sq/d/${staticQueryHash}.json`).then(req => {
            const jsonPayload = JSON.parse(req.responseText);
            return {
              staticQueryHash,
              jsonPayload
            };
          }).catch(() => {
            throw new Error(`We couldn't load "${""}/page-data/sq/d/${staticQueryHash}.json"`);
          });
        })).then(staticQueryResults => {
          const staticQueryResultsMap = {};
          staticQueryResults.forEach(({
            staticQueryHash,
            jsonPayload
          }) => {
            staticQueryResultsMap[staticQueryHash] = jsonPayload;
            this.staticQueryDb[staticQueryHash] = jsonPayload;
          });
          return staticQueryResultsMap;
        });
        return Promise.all([componentChunkPromises, staticQueryBatchPromise]).then(([pageResources, staticQueryResults]) => {
          let payload;
          if (pageResources) {
            payload = {
              ...pageResources,
              staticQueryResults
            };
            finalResult.payload = payload;
            _emitter__WEBPACK_IMPORTED_MODULE_2__["default"].emit(`onPostLoadPageResources`, {
              page: payload,
              pageResources: payload
            });
          }
          this.pageDb.set(pagePath, finalResult);
          if (finalResult.error) {
            return {
              error: finalResult.error,
              status: finalResult.status
            };
          }
          return payload;
        })
        // when static-query fail to load we throw a better error
        .catch(err => {
          return {
            error: err,
            status: PageResourceStatus.Error
          };
        });
      });
    });
    inFlightPromise.then(() => {
      this.inFlightDb.delete(pagePath);
    }).catch(error => {
      this.inFlightDb.delete(pagePath);
      throw error;
    });
    this.inFlightDb.set(pagePath, inFlightPromise);
    return inFlightPromise;
  }

  // returns undefined if the page does not exists in cache
  loadPageSync(rawPath, options = {}) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    if (this.pageDb.has(pagePath)) {
      const pageData = this.pageDb.get(pagePath);
      if (pageData.payload) {
        return pageData.payload;
      }
      if (options !== null && options !== void 0 && options.withErrorDetails) {
        return {
          error: pageData.error,
          status: pageData.status
        };
      }
    }
    return undefined;
  }
  shouldPrefetch(pagePath) {
    // Skip prefetching if we know user is on slow or constrained connection
    if (!doesConnectionSupportPrefetch()) {
      return false;
    }

    // Don't prefetch if this is a crawler bot
    if (navigator.userAgent && BOT_REGEX.test(navigator.userAgent)) {
      return false;
    }

    // Check if the page exists.
    if (this.pageDb.has(pagePath)) {
      return false;
    }
    return true;
  }
  prefetch(pagePath) {
    if (!this.shouldPrefetch(pagePath)) {
      return {
        then: resolve => resolve(false),
        abort: () => {}
      };
    }
    if (this.prefetchTriggered.has(pagePath)) {
      return {
        then: resolve => resolve(true),
        abort: () => {}
      };
    }
    const defer = {
      resolve: null,
      reject: null,
      promise: null
    };
    defer.promise = new Promise((resolve, reject) => {
      defer.resolve = resolve;
      defer.reject = reject;
    });
    this.prefetchQueued.push([pagePath, defer]);
    const abortC = new AbortController();
    abortC.signal.addEventListener(`abort`, () => {
      const index = this.prefetchQueued.findIndex(([p]) => p === pagePath);
      // remove from the queue
      if (index !== -1) {
        this.prefetchQueued.splice(index, 1);
      }
    });
    if (!this.isPrefetchQueueRunning) {
      this.isPrefetchQueueRunning = true;
      setTimeout(() => {
        this._processNextPrefetchBatch();
      }, 3000);
    }
    return {
      then: (resolve, reject) => defer.promise.then(resolve, reject),
      abort: abortC.abort.bind(abortC)
    };
  }
  _processNextPrefetchBatch() {
    const idleCallback = window.requestIdleCallback || (cb => setTimeout(cb, 0));
    idleCallback(() => {
      const toPrefetch = this.prefetchQueued.splice(0, 4);
      const prefetches = Promise.all(toPrefetch.map(([pagePath, dPromise]) => {
        // Tell plugins with custom prefetching logic that they should start
        // prefetching this path.
        if (!this.prefetchTriggered.has(pagePath)) {
          this.apiRunner(`onPrefetchPathname`, {
            pathname: pagePath
          });
          this.prefetchTriggered.add(pagePath);
        }

        // If a plugin has disabled core prefetching, stop now.
        if (this.prefetchDisabled) {
          return dPromise.resolve(false);
        }
        return this.doPrefetch((0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(pagePath)).then(() => {
          if (!this.prefetchCompleted.has(pagePath)) {
            this.apiRunner(`onPostPrefetchPathname`, {
              pathname: pagePath
            });
            this.prefetchCompleted.add(pagePath);
          }
          dPromise.resolve(true);
        });
      }));
      if (this.prefetchQueued.length) {
        prefetches.then(() => {
          setTimeout(() => {
            this._processNextPrefetchBatch();
          }, 3000);
        });
      } else {
        this.isPrefetchQueueRunning = false;
      }
    });
  }
  doPrefetch(pagePath) {
    const pageDataUrl = createPageDataUrl(pagePath);
    if (false) {} else {
      return (0,_prefetch__WEBPACK_IMPORTED_MODULE_1__["default"])(pageDataUrl, {
        crossOrigin: `anonymous`,
        as: `fetch`
      }).then(() =>
      // This was just prefetched, so will return a response from
      // the cache instead of making another request to the server
      this.loadPageDataJson(pagePath));
    }
  }
  hovering(rawPath) {
    this.loadPage(rawPath);
  }
  getResourceURLsForPathname(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    const page = this.pageDataDb.get(pagePath);
    if (page) {
      const pageResources = toPageResources(page.payload);
      return [...createComponentUrls(pageResources.page.componentChunkName), createPageDataUrl(pagePath)];
    } else {
      return null;
    }
  }
  isPageNotFound(rawPath) {
    const pagePath = (0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(rawPath);
    const page = this.pageDb.get(pagePath);
    return !page || page.notFound;
  }
  loadAppData(retries = 0) {
    return this.memoizedGet(`${""}/page-data/app-data.json`).then(req => {
      const {
        status,
        responseText
      } = req;
      let appData;
      if (status !== 200 && retries < 3) {
        // Retry 3 times incase of non-200 responses
        return this.loadAppData(retries + 1);
      }

      // Handle 200
      if (status === 200) {
        try {
          const jsonPayload = JSON.parse(responseText);
          if (jsonPayload.webpackCompilationHash === undefined) {
            throw new Error(`not a valid app-data response`);
          }
          appData = jsonPayload;
        } catch (err) {
          // continue regardless of error
        }
      }
      return appData;
    });
  }
}
const createComponentUrls = componentChunkName => (window.___chunkMapping[componentChunkName] || []).map(chunk => "" + chunk);
class ProdLoader extends BaseLoader {
  constructor(asyncRequires, matchPaths, pageData) {
    const loadComponent = (chunkName, exportType = `components`) => {
      if (true) {
        exportType = `components`;
      }
      if (!asyncRequires[exportType][chunkName]) {
        throw new Error(`We couldn't find the correct component chunk with the name "${chunkName}"`);
      }
      return asyncRequires[exportType][chunkName]()
      // loader will handle the case when component is error
      .catch(err => err);
    };
    super(loadComponent, matchPaths);
    if (pageData) {
      this.pageDataDb.set((0,_find_path__WEBPACK_IMPORTED_MODULE_3__.findPath)(pageData.path), {
        pagePath: pageData.path,
        payload: pageData,
        status: `success`
      });
    }
  }
  doPrefetch(pagePath) {
    return super.doPrefetch(pagePath).then(result => {
      if (result.status !== PageResourceStatus.Success) {
        return Promise.resolve();
      }
      const pageData = result.payload;
      const chunkName = pageData.componentChunkName;
      const componentUrls = createComponentUrls(chunkName);
      return Promise.all(componentUrls.map(_prefetch__WEBPACK_IMPORTED_MODULE_1__["default"])).then(() => pageData);
    });
  }
  loadPageDataJson(rawPath) {
    return super.loadPageDataJson(rawPath).then(data => {
      if (data.notFound) {
        if (shouldAbortFetch(rawPath)) {
          return data;
        }
        // check if html file exist using HEAD request:
        // if it does we should navigate to it instead of showing 404
        return doFetch(rawPath, `HEAD`).then(req => {
          if (req.status === 200) {
            // page (.html file) actually exist (or we asked for 404 )
            // returning page resources status as errored to trigger
            // regular browser navigation to given page
            return {
              status: PageResourceStatus.Error
            };
          }

          // if HEAD request wasn't 200, return notFound result
          // and show 404 page
          return data;
        });
      }
      return data;
    });
  }
  loadPartialHydrationJson(rawPath) {
    return super.loadPartialHydrationJson(rawPath).then(data => {
      if (data.notFound) {
        if (shouldAbortFetch(rawPath)) {
          return data;
        }
        // check if html file exist using HEAD request:
        // if it does we should navigate to it instead of showing 404
        return doFetch(rawPath, `HEAD`).then(req => {
          if (req.status === 200) {
            // page (.html file) actually exist (or we asked for 404 )
            // returning page resources status as errored to trigger
            // regular browser navigation to given page
            return {
              status: PageResourceStatus.Error
            };
          }

          // if HEAD request wasn't 200, return notFound result
          // and show 404 page
          return data;
        });
      }
      return data;
    });
  }
}
let instance;
const setLoader = _loader => {
  instance = _loader;
};
const publicLoader = {
  enqueue: rawPath => instance.prefetch(rawPath),
  // Real methods
  getResourceURLsForPathname: rawPath => instance.getResourceURLsForPathname(rawPath),
  loadPage: rawPath => instance.loadPage(rawPath),
  // TODO add deprecation to v4 so people use withErrorDetails and then we can remove in v5 and change default behaviour
  loadPageSync: (rawPath, options = {}) => instance.loadPageSync(rawPath, options),
  prefetch: rawPath => instance.prefetch(rawPath),
  isPageNotFound: rawPath => instance.isPageNotFound(rawPath),
  hovering: rawPath => instance.hovering(rawPath),
  loadAppData: () => instance.loadAppData()
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (publicLoader);
function getStaticQueryResults() {
  if (instance) {
    return instance.staticQueryDb;
  } else {
    return {};
  }
}
function getSliceResults() {
  if (instance) {
    return instance.slicesDb;
  } else {
    return {};
  }
}

/***/ }),

/***/ "./.cache/normalize-page-path.js":
/*!***************************************!*\
  !*** ./.cache/normalize-page-path.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pathAndSearch => {
  if (pathAndSearch === undefined) {
    return pathAndSearch;
  }
  let [path, search = ``] = pathAndSearch.split(`?`);
  if (search) {
    search = `?` + search;
  }
  if (path === `/`) {
    return `/` + search;
  }
  if (path.charAt(path.length - 1) === `/`) {
    return path.slice(0, -1) + search;
  }
  return path + search;
});

/***/ }),

/***/ "./.cache/prefetch.js":
/*!****************************!*\
  !*** ./.cache/prefetch.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const support = function (feature) {
  if (typeof document === `undefined`) {
    return false;
  }
  const fakeLink = document.createElement(`link`);
  try {
    if (fakeLink.relList && typeof fakeLink.relList.supports === `function`) {
      return fakeLink.relList.supports(feature);
    }
  } catch (err) {
    return false;
  }
  return false;
};
const linkPrefetchStrategy = function (url, options) {
  return new Promise((resolve, reject) => {
    if (typeof document === `undefined`) {
      reject();
      return;
    }
    const link = document.createElement(`link`);
    link.setAttribute(`rel`, `prefetch`);
    link.setAttribute(`href`, url);
    Object.keys(options).forEach(key => {
      link.setAttribute(key, options[key]);
    });
    link.onload = resolve;
    link.onerror = reject;
    const parentElement = document.getElementsByTagName(`head`)[0] || document.getElementsByName(`script`)[0].parentNode;
    parentElement.appendChild(link);
  });
};
const xhrPrefetchStrategy = function (url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(`GET`, url, true);
    req.onload = () => {
      if (req.status === 200) {
        resolve();
      } else {
        reject();
      }
    };
    req.send(null);
  });
};
const supportedPrefetchStrategy = support(`prefetch`) ? linkPrefetchStrategy : xhrPrefetchStrategy;
const preFetched = {};
const prefetch = function (url, options) {
  return new Promise(resolve => {
    if (preFetched[url]) {
      resolve();
      return;
    }
    supportedPrefetchStrategy(url, options).then(() => {
      resolve();
      preFetched[url] = true;
    }).catch(() => {}); // 404s are logged to the console anyway
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (prefetch);

/***/ }),

/***/ "./.cache/public-page-renderer.js":
/*!****************************************!*\
  !*** ./.cache/public-page-renderer.js ***!
  \****************************************/
/***/ ((module) => {

const preferDefault = m => m && m.default || m;
if (false) {} else if (false) {} else {
  module.exports = () => null;
}

/***/ }),

/***/ "./.cache/redirect-utils.js":
/*!**********************************!*\
  !*** ./.cache/redirect-utils.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   maybeGetBrowserRedirect: () => (/* binding */ maybeGetBrowserRedirect)
/* harmony export */ });
/* harmony import */ var _redirects_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./redirects.json */ "./.cache/redirects.json");


// Convert to a map for faster lookup in maybeRedirect()

const redirectMap = new Map();
const redirectIgnoreCaseMap = new Map();
_redirects_json__WEBPACK_IMPORTED_MODULE_0__.forEach(redirect => {
  if (redirect.ignoreCase) {
    redirectIgnoreCaseMap.set(redirect.fromPath, redirect);
  } else {
    redirectMap.set(redirect.fromPath, redirect);
  }
});
function maybeGetBrowserRedirect(pathname) {
  let redirect = redirectMap.get(pathname);
  if (!redirect) {
    redirect = redirectIgnoreCaseMap.get(pathname.toLowerCase());
  }
  return redirect;
}

/***/ }),

/***/ "./.cache/slice.js":
/*!*************************!*\
  !*** ./.cache/slice.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Slice: () => (/* binding */ Slice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _slice_server_slice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slice/server-slice */ "./.cache/slice/server-slice.js");
/* harmony import */ var _slice_inline_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slice/inline-slice */ "./.cache/slice/inline-slice.js");
/* harmony import */ var _slice_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./slice/context */ "./.cache/slice/context.js");
"use client";





function Slice(props) {
  if (true) {
    // we use sliceName internally, so remap alias to sliceName
    const internalProps = {
      ...props,
      sliceName: props.alias
    };
    delete internalProps.alias;
    delete internalProps.__renderedByLocation;
    const slicesContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_slice_context__WEBPACK_IMPORTED_MODULE_3__.SlicesContext);

    // validate props
    const propErrors = validateSliceProps(props);
    if (Object.keys(propErrors).length) {
      throw new SlicePropsError(slicesContext.renderEnvironment === `browser`, internalProps.sliceName, propErrors, props.__renderedByLocation);
    }
    if (slicesContext.renderEnvironment === `server`) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_slice_server_slice__WEBPACK_IMPORTED_MODULE_1__.ServerSlice, internalProps);
    } else if (slicesContext.renderEnvironment === `browser`) {
      // in the browser, we'll just render the component as is
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_slice_inline_slice__WEBPACK_IMPORTED_MODULE_2__.InlineSlice, internalProps);
    } else if (slicesContext.renderEnvironment === `engines` || slicesContext.renderEnvironment === `dev-ssr`) {
      // if we're in SSR, we'll just render the component as is
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_slice_inline_slice__WEBPACK_IMPORTED_MODULE_2__.InlineSlice, internalProps);
    } else if (slicesContext.renderEnvironment === `slices`) {
      // we are not yet supporting nested slices

      let additionalContextMessage = ``;

      // just in case generating additional contextual information fails, we still want the base message to show
      // and not show another cryptic error message
      try {
        additionalContextMessage = `\n\nSlice component "${slicesContext.sliceRoot.name}" (${slicesContext.sliceRoot.componentPath}) tried to render <Slice alias="${props.alias}"/>`;
      } catch {
        // don't need to handle it, we will just skip the additional context message if we fail to generate it
      }
      throw new Error(`Nested slices are not supported.${additionalContextMessage}\n\nSee https://gatsbyjs.com/docs/reference/built-in-components/gatsby-slice#nested-slices`);
    } else {
      throw new Error(`Slice context "${slicesContext.renderEnvironment}" is not supported.`);
    }
  } else {}
}
class SlicePropsError extends Error {
  constructor(inBrowser, sliceName, propErrors, renderedByLocation) {
    const errors = Object.entries(propErrors).map(([key, value]) => `not serializable "${value}" type passed to "${key}" prop`).join(`, `);
    const name = `SlicePropsError`;
    let stack = ``;
    let message = ``;
    if (inBrowser) {
      // They're just (kinda) kidding, I promise... You can still work here <3
      //   https://www.gatsbyjs.com/careers/
      const fullStack = react__WEBPACK_IMPORTED_MODULE_0___default().__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactDebugCurrentFrame.getCurrentStack();

      // remove the first line of the stack trace
      const stackLines = fullStack.trim().split(`\n`).slice(1);
      stackLines[0] = stackLines[0].trim();
      stack = `\n` + stackLines.join(`\n`);
      message = `Slice "${sliceName}" was passed props that are not serializable (${errors}).`;
    } else {
      // we can't really grab any extra info outside of the browser, so just print what we can
      message = `${name}: Slice "${sliceName}" was passed props that are not serializable (${errors}).`;
      const stackLines = new Error().stack.trim().split(`\n`).slice(2);
      stack = `${message}\n${stackLines.join(`\n`)}`;
    }
    super(message);
    this.name = name;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, SlicePropsError);
    }
    if (renderedByLocation) {
      this.forcedLocation = {
        ...renderedByLocation,
        functionName: `Slice`
      };
    }
  }
}
const validateSliceProps = (props, errors = {}, seenObjects = [], path = null) => {
  // recursively validate all props
  for (const [name, value] of Object.entries(props)) {
    if (value === undefined || value === null || !path && name === `children`) {
      continue;
    }
    const propPath = path ? `${path}.${name}` : name;
    if (typeof value === `function`) {
      errors[propPath] = typeof value;
    } else if (typeof value === `object` && seenObjects.indexOf(value) <= 0) {
      seenObjects.push(value);
      validateSliceProps(value, errors, seenObjects, propPath);
    }
  }
  return errors;
};

/***/ }),

/***/ "./.cache/slice/context.js":
/*!*********************************!*\
  !*** ./.cache/slice/context.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SlicesContext: () => (/* binding */ SlicesContext),
/* harmony export */   SlicesMapContext: () => (/* binding */ SlicesMapContext),
/* harmony export */   SlicesPropsContext: () => (/* binding */ SlicesPropsContext),
/* harmony export */   SlicesResultsContext: () => (/* binding */ SlicesResultsContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SlicesResultsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});
const SlicesContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});
const SlicesMapContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});
const SlicesPropsContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createContext({});


/***/ }),

/***/ "./.cache/slice/inline-slice.js":
/*!**************************************!*\
  !*** ./.cache/slice/inline-slice.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InlineSlice: () => (/* binding */ InlineSlice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./.cache/slice/context.js");


const InlineSlice = ({
  sliceName,
  allowEmpty,
  children,
  ...sliceProps
}) => {
  const slicesMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_1__.SlicesMapContext);
  const slicesResultsMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_1__.SlicesResultsContext);
  const concreteSliceName = slicesMap[sliceName];
  const slice = slicesResultsMap.get(concreteSliceName);
  if (!slice) {
    if (allowEmpty) {
      return null;
    } else {
      throw new Error(`Slice "${concreteSliceName}" for "${sliceName}" slot not found`);
    }
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(slice.component, Object.assign({
    sliceContext: slice.sliceContext,
    data: slice.data
  }, sliceProps), children);
};

/***/ }),

/***/ "./.cache/slice/server-slice-renderer.js":
/*!***********************************************!*\
  !*** ./.cache/slice/server-slice-renderer.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServerSliceRenderer: () => (/* binding */ ServerSliceRenderer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ServerSliceRenderer = ({
  sliceId,
  children
}) => {
  const contents = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-start`, {
    id: `${sliceId}-1`
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-end`, {
    id: `${sliceId}-1`
  })];
  if (children) {
    // if children exist, we split the slice into a before and after piece
    // see renderSlices in render-html
    contents.push(children);
    contents.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-start`, {
      id: `${sliceId}-2`
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(`slice-end`, {
      id: `${sliceId}-2`
    }));
  }
  return contents;
};

/***/ }),

/***/ "./.cache/slice/server-slice.js":
/*!**************************************!*\
  !*** ./.cache/slice/server-slice.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ServerSlice: () => (/* binding */ ServerSlice)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_core_utils_create_content_digest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby-core-utils/create-content-digest */ "./node_modules/gatsby-core-utils/dist/create-content-digest.mjs");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context */ "./.cache/slice/context.js");
/* harmony import */ var _server_slice_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./server-slice-renderer */ "./.cache/slice/server-slice-renderer.js");




const getSliceId = (sliceName, sliceProps) => {
  if (!Object.keys(sliceProps).length) {
    return sliceName;
  }
  const propsString = (0,gatsby_core_utils_create_content_digest__WEBPACK_IMPORTED_MODULE_1__.createContentDigest)(sliceProps);
  return `${sliceName}-${propsString}`;
};
const ServerSlice = ({
  sliceName,
  allowEmpty,
  children,
  ...sliceProps
}) => {
  const slicesMap = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_2__.SlicesMapContext);
  const slicesProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context__WEBPACK_IMPORTED_MODULE_2__.SlicesPropsContext);
  const concreteSliceName = slicesMap[sliceName];
  if (!concreteSliceName) {
    if (allowEmpty) {
      return null;
    } else {
      throw new Error(`Slice "${concreteSliceName}" for "${sliceName}" slot not found`);
    }
  }
  const sliceId = getSliceId(concreteSliceName, sliceProps);

  // set props on context object for static-entry to return
  let sliceUsage = slicesProps[sliceId];
  if (!sliceUsage) {
    slicesProps[sliceId] = sliceUsage = {
      props: sliceProps,
      sliceName: concreteSliceName,
      hasChildren: !!children
    };
  } else {
    if (children) {
      sliceUsage.hasChildren = true;
    }
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_server_slice_renderer__WEBPACK_IMPORTED_MODULE_3__.ServerSliceRenderer, {
    sliceId: sliceId
  }, children);
};

/***/ }),

/***/ "./.cache/static-query.js":
/*!********************************!*\
  !*** ./.cache/static-query.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StaticQuery: () => (/* binding */ StaticQuery),
/* harmony export */   StaticQueryContext: () => (/* binding */ StaticQueryContext),
/* harmony export */   useStaticQuery: () => (/* binding */ useStaticQuery)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context-utils */ "./.cache/context-utils.js");



const StaticQueryContext = (0,_context_utils__WEBPACK_IMPORTED_MODULE_1__.createServerOrClientContext)(`StaticQuery`, {});
function StaticQueryDataRenderer({
  staticQueryData,
  data,
  query,
  render
}) {
  const finalData = data ? data.data : staticQueryData[query] && staticQueryData[query].data;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, finalData && render(finalData), !finalData && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, "Loading (StaticQuery)"));
}
let warnedAboutStaticQuery = false;

// TODO(v6): Remove completely
const StaticQuery = props => {
  const {
    data,
    query,
    render,
    children
  } = props;
  if ( true && !warnedAboutStaticQuery) {
    console.warn(`The <StaticQuery /> component is deprecated and will be removed in Gatsby v6. Use useStaticQuery instead. Refer to the migration guide for more information: https://gatsby.dev/migrating-4-to-5/#staticquery--is-deprecated`);
    warnedAboutStaticQuery = true;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StaticQueryContext.Consumer, null, staticQueryData => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(StaticQueryDataRenderer, {
    data: data,
    query: query,
    render: render || children,
    staticQueryData: staticQueryData
  }));
};
StaticQuery.propTypes = {
  data: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object),
  query: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  render: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func)
};
const useStaticQuery = query => {
  var _context$query;
  if (typeof (react__WEBPACK_IMPORTED_MODULE_0___default().useContext) !== `function` && "development" === `development`) {
    // TODO(v5): Remove since we require React >= 18
    throw new Error(`You're likely using a version of React that doesn't support Hooks\n` + `Please update React and ReactDOM to 16.8.0 or later to use the useStaticQuery hook.`);
  }
  const context = react__WEBPACK_IMPORTED_MODULE_0___default().useContext(StaticQueryContext);

  // query is a stringified number like `3303882` when wrapped with graphql, If a user forgets
  // to wrap the query in a grqphql, then casting it to a Number results in `NaN` allowing us to
  // catch the misuse of the API and give proper direction
  if (isNaN(Number(query))) {
    throw new Error(`useStaticQuery was called with a string but expects to be called using \`graphql\`. Try this:

import { useStaticQuery, graphql } from 'gatsby';

useStaticQuery(graphql\`${query}\`);
`);
  }
  if ((_context$query = context[query]) !== null && _context$query !== void 0 && _context$query.data) {
    return context[query].data;
  } else {
    throw new Error(`The result of this StaticQuery could not be fetched.\n\n` + `This is likely a bug in Gatsby and if refreshing the page does not fix it, ` + `please open an issue in https://github.com/gatsbyjs/gatsby/issues`);
  }
};


/***/ }),

/***/ "./.cache/strip-prefix.js":
/*!********************************!*\
  !*** ./.cache/strip-prefix.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ stripPrefix)
/* harmony export */ });
/**
 * Remove a prefix from a string. Return the input string if the given prefix
 * isn't found.
 */

function stripPrefix(str, prefix = ``) {
  if (!prefix) {
    return str;
  }
  if (str === prefix) {
    return `/`;
  }
  if (str.startsWith(`${prefix}/`)) {
    return str.slice(prefix.length);
  }
  return str;
}

/***/ }),

/***/ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GatsbyImage: () => (/* binding */ X),
/* harmony export */   MainImage: () => (/* binding */ D),
/* harmony export */   Placeholder: () => (/* binding */ C),
/* harmony export */   StaticImage: () => (/* binding */ Z),
/* harmony export */   generateImageData: () => (/* binding */ b),
/* harmony export */   getImage: () => (/* binding */ I),
/* harmony export */   getImageData: () => (/* binding */ R),
/* harmony export */   getLowResolutionImageURL: () => (/* binding */ y),
/* harmony export */   getSrc: () => (/* binding */ W),
/* harmony export */   getSrcSet: () => (/* binding */ j),
/* harmony export */   withArtDirection: () => (/* binding */ _)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camelcase */ "./node_modules/camelcase/index.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);




function n() {
  return n = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
  }, n.apply(this, arguments);
}
function o(e, t) {
  if (null == e) return {};
  var a,
    i,
    r = {},
    n = Object.keys(e);
  for (i = 0; i < n.length; i++) t.indexOf(a = n[i]) >= 0 || (r[a] = e[a]);
  return r;
}
var s = [.25, .5, 1, 2],
  l = [750, 1080, 1366, 1920],
  u = [320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840, 4096],
  d = 800,
  c = 800,
  h = 4 / 3,
  g = function (e) {
    return console.warn(e);
  },
  p = function (e, t) {
    return e - t;
  },
  m = function (e, t) {
    switch (t) {
      case "constrained":
        return "(min-width: " + e + "px) " + e + "px, 100vw";
      case "fixed":
        return e + "px";
      case "fullWidth":
        return "100vw";
      default:
        return;
    }
  },
  f = function (e) {
    return e.map(function (e) {
      return e.src + " " + e.width + "w";
    }).join(",\n");
  };
function v(e) {
  var t = e.lastIndexOf(".");
  if (-1 !== t) {
    var a = e.slice(t + 1);
    if ("jpeg" === a) return "jpg";
    if (3 === a.length || 4 === a.length) return a;
  }
}
function w(e) {
  var t = e.layout,
    i = void 0 === t ? "constrained" : t,
    r = e.width,
    o = e.height,
    s = e.sourceMetadata,
    l = e.breakpoints,
    u = e.aspectRatio,
    d = e.formats,
    g = void 0 === d ? ["auto", "webp"] : d;
  return g = g.map(function (e) {
    return e.toLowerCase();
  }), i = camelcase__WEBPACK_IMPORTED_MODULE_1___default()(i), r && o ? n({}, e, {
    formats: g,
    layout: i,
    aspectRatio: r / o
  }) : (s.width && s.height && !u && (u = s.width / s.height), "fullWidth" === i ? (r = r || s.width || l[l.length - 1], o = o || Math.round(r / (u || h))) : (r || (r = o && u ? o * u : s.width ? s.width : o ? Math.round(o / h) : c), u && !o ? o = Math.round(r / u) : u || (u = r / o)), n({}, e, {
    width: r,
    height: o,
    aspectRatio: u,
    layout: i,
    formats: g
  }));
}
function y(e, t) {
  var a;
  return void 0 === t && (t = 20), null == (a = (0, (e = w(e)).generateImageSource)(e.filename, t, Math.round(t / e.aspectRatio), e.sourceMetadata.format || "jpg", e.fit, e.options)) ? void 0 : a.src;
}
function b(e) {
  var t,
    a = (e = w(e)).pluginName,
    i = e.sourceMetadata,
    r = e.generateImageSource,
    o = e.layout,
    u = e.fit,
    d = e.options,
    h = e.width,
    p = e.height,
    y = e.filename,
    b = e.reporter,
    S = void 0 === b ? {
      warn: g
    } : b,
    N = e.backgroundColor,
    x = e.placeholderURL;
  if (a || S.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'), "function" != typeof r) throw new Error("generateImageSource must be a function");
  i && (i.width || i.height) ? i.format || (i.format = v(y)) : i = {
    width: h,
    height: p,
    format: (null == (t = i) ? void 0 : t.format) || v(y) || "auto"
  };
  var I = new Set(e.formats);
  (0 === I.size || I.has("auto") || I.has("")) && (I.delete("auto"), I.delete(""), I.add(i.format)), I.has("jpg") && I.has("png") && (S.warn("[" + a + "] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"), I.delete("jpg" === i.format ? "png" : "jpg"));
  var W = function (e) {
      var t = e.filename,
        a = e.layout,
        i = void 0 === a ? "constrained" : a,
        r = e.sourceMetadata,
        o = e.reporter,
        u = void 0 === o ? {
          warn: g
        } : o,
        d = e.breakpoints,
        h = void 0 === d ? l : d,
        p = Object.entries({
          width: e.width,
          height: e.height
        }).filter(function (e) {
          var t = e[1];
          return "number" == typeof t && t < 1;
        });
      if (p.length) throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are " + p.map(function (e) {
        return e.join(": ");
      }).join(", "));
      return "fixed" === i ? function (e) {
        var t = e.filename,
          a = e.sourceMetadata,
          i = e.width,
          r = e.height,
          n = e.fit,
          o = void 0 === n ? "cover" : n,
          l = e.outputPixelDensities,
          u = e.reporter,
          d = void 0 === u ? {
            warn: g
          } : u,
          h = a.width / a.height,
          p = k(void 0 === l ? s : l);
        if (i && r) {
          var m = M(a, {
            width: i,
            height: r,
            fit: o
          });
          i = m.width, r = m.height, h = m.aspectRatio;
        }
        i ? r || (r = Math.round(i / h)) : i = r ? Math.round(r * h) : c;
        var f = i;
        if (a.width < i || a.height < r) {
          var v = a.width < i ? "width" : "height";
          d.warn("\nThe requested " + v + ' "' + ("width" === v ? i : r) + 'px" for the image ' + t + " was larger than the actual image " + v + " of " + a[v] + "px. If possible, replace the current image with a larger one."), "width" === v ? (i = a.width, r = Math.round(i / h)) : i = (r = a.height) * h;
        }
        return {
          sizes: p.filter(function (e) {
            return e >= 1;
          }).map(function (e) {
            return Math.round(e * i);
          }).filter(function (e) {
            return e <= a.width;
          }),
          aspectRatio: h,
          presentationWidth: f,
          presentationHeight: Math.round(f / h),
          unscaledWidth: i
        };
      }(e) : "constrained" === i ? E(e) : "fullWidth" === i ? E(n({
        breakpoints: h
      }, e)) : (u.warn("No valid layout was provided for the image at " + t + ". Valid image layouts are fixed, fullWidth, and constrained. Found " + i), {
        sizes: [r.width],
        presentationWidth: r.width,
        presentationHeight: r.height,
        aspectRatio: r.width / r.height,
        unscaledWidth: r.width
      });
    }(n({}, e, {
      sourceMetadata: i
    })),
    j = {
      sources: []
    },
    R = e.sizes;
  R || (R = m(W.presentationWidth, o)), I.forEach(function (e) {
    var t = W.sizes.map(function (t) {
      var i = r(y, t, Math.round(t / W.aspectRatio), e, u, d);
      if (null != i && i.width && i.height && i.src && i.format) return i;
      S.warn("[" + a + "] The resolver for image " + y + " returned an invalid value.");
    }).filter(Boolean);
    if ("jpg" === e || "png" === e || "auto" === e) {
      var i = t.find(function (e) {
        return e.width === W.unscaledWidth;
      }) || t[0];
      i && (j.fallback = {
        src: i.src,
        srcSet: f(t),
        sizes: R
      });
    } else {
      var n;
      null == (n = j.sources) || n.push({
        srcSet: f(t),
        sizes: R,
        type: "image/" + e
      });
    }
  });
  var _ = {
    images: j,
    layout: o,
    backgroundColor: N
  };
  switch (x && (_.placeholder = {
    fallback: x
  }), o) {
    case "fixed":
      _.width = W.presentationWidth, _.height = W.presentationHeight;
      break;
    case "fullWidth":
      _.width = 1, _.height = 1 / W.aspectRatio;
      break;
    case "constrained":
      _.width = e.width || W.presentationWidth || 1, _.height = (_.width || 1) / W.aspectRatio;
  }
  return _;
}
var k = function (e) {
  return Array.from(new Set([1].concat(e))).sort(p);
};
function E(e) {
  var t,
    a = e.sourceMetadata,
    i = e.width,
    r = e.height,
    n = e.fit,
    o = void 0 === n ? "cover" : n,
    l = e.outputPixelDensities,
    u = e.breakpoints,
    c = e.layout,
    h = a.width / a.height,
    g = k(void 0 === l ? s : l);
  if (i && r) {
    var m = M(a, {
      width: i,
      height: r,
      fit: o
    });
    i = m.width, r = m.height, h = m.aspectRatio;
  }
  i = i && Math.min(i, a.width), r = r && Math.min(r, a.height), i || r || (r = (i = Math.min(d, a.width)) / h), i || (i = r * h);
  var f = i;
  return (a.width < i || a.height < r) && (i = a.width, r = a.height), i = Math.round(i), (null == u ? void 0 : u.length) > 0 ? (t = u.filter(function (e) {
    return e <= a.width;
  })).length < u.length && !t.includes(a.width) && t.push(a.width) : t = (t = g.map(function (e) {
    return Math.round(e * i);
  })).filter(function (e) {
    return e <= a.width;
  }), "constrained" !== c || t.includes(i) || t.push(i), {
    sizes: t = t.sort(p),
    aspectRatio: h,
    presentationWidth: f,
    presentationHeight: Math.round(f / h),
    unscaledWidth: i
  };
}
function M(e, t) {
  var a = e.width / e.height,
    i = t.width,
    r = t.height;
  switch (t.fit) {
    case "fill":
      i = t.width ? t.width : e.width, r = t.height ? t.height : e.height;
      break;
    case "inside":
      var n = t.width ? t.width : Number.MAX_SAFE_INTEGER,
        o = t.height ? t.height : Number.MAX_SAFE_INTEGER;
      i = Math.min(n, Math.round(o * a)), r = Math.min(o, Math.round(n / a));
      break;
    case "outside":
      var s = t.width ? t.width : 0,
        l = t.height ? t.height : 0;
      i = Math.max(s, Math.round(l * a)), r = Math.max(l, Math.round(s / a));
      break;
    default:
      t.width && !t.height && (i = t.width, r = Math.round(t.width / a)), t.height && !t.width && (i = Math.round(t.height * a), r = t.height);
  }
  return {
    width: i,
    height: r,
    aspectRatio: i / r
  };
}
var S = ["baseUrl", "urlBuilder", "sourceWidth", "sourceHeight", "pluginName", "formats", "breakpoints", "options"],
  N = ["images", "placeholder"];
function x() {
  return "undefined" != typeof GATSBY___IMAGE && GATSBY___IMAGE;
}
var I = function (e) {
    var t;
    return function (e) {
      var t, a;
      return Boolean(null == e || null == (t = e.images) || null == (a = t.fallback) ? void 0 : a.src);
    }(e) ? e : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImageData);
    }(e) ? e.gatsbyImageData : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImage);
    }(e) ? e.gatsbyImage : null == e || null == (t = e.childImageSharp) ? void 0 : t.gatsbyImageData;
  },
  W = function (e) {
    var t, a, i;
    return null == (t = I(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.src;
  },
  j = function (e) {
    var t, a, i;
    return null == (t = I(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.srcSet;
  };
function R(e) {
  var t,
    a = e.baseUrl,
    i = e.urlBuilder,
    r = e.sourceWidth,
    s = e.sourceHeight,
    l = e.pluginName,
    d = void 0 === l ? "getImageData" : l,
    c = e.formats,
    h = void 0 === c ? ["auto"] : c,
    g = e.breakpoints,
    p = e.options,
    m = o(e, S);
  return null != (t = g) && t.length || "fullWidth" !== m.layout && "FULL_WIDTH" !== m.layout || (g = u), b(n({}, m, {
    pluginName: d,
    generateImageSource: function (e, t, a, r) {
      return {
        width: t,
        height: a,
        format: r,
        src: i({
          baseUrl: e,
          width: t,
          height: a,
          options: p,
          format: r
        })
      };
    },
    filename: a,
    formats: h,
    breakpoints: g,
    sourceMetadata: {
      width: r,
      height: s,
      format: "auto"
    }
  }));
}
function _(e, t) {
  var a,
    i,
    r,
    s = e.images,
    l = e.placeholder,
    u = n({}, o(e, N), {
      images: n({}, s, {
        sources: []
      }),
      placeholder: l && n({}, l, {
        sources: []
      })
    });
  return t.forEach(function (t) {
    var a,
      i = t.media,
      r = t.image;
    i ? (r.layout !== e.layout && "development" === "development" && console.warn('[gatsby-plugin-image] Mismatched image layout: expected "' + e.layout + '" but received "' + r.layout + '". All art-directed images use the same layout as the default image'), (a = u.images.sources).push.apply(a, r.images.sources.map(function (e) {
      return n({}, e, {
        media: i
      });
    }).concat([{
      media: i,
      srcSet: r.images.fallback.srcSet
    }])), u.placeholder && u.placeholder.sources.push({
      media: i,
      srcSet: r.placeholder.fallback
    })) :  true && console.warn("[gatsby-plugin-image] All art-directed images passed to must have a value set for `media`. Skipping.");
  }), (a = u.images.sources).push.apply(a, s.sources), null != l && l.sources && (null == (i = u.placeholder) || (r = i.sources).push.apply(r, l.sources)), u;
}
var A,
  O = ["src", "srcSet", "loading", "alt", "shouldLoad"],
  T = ["fallback", "sources", "shouldLoad"],
  z = function (t) {
    var a = t.src,
      i = t.srcSet,
      r = t.loading,
      s = t.alt,
      l = void 0 === s ? "" : s,
      u = t.shouldLoad,
      d = o(t, O);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", n({}, d, {
      decoding: "async",
      loading: r,
      src: u ? a : void 0,
      "data-src": u ? void 0 : a,
      srcSet: u ? i : void 0,
      "data-srcset": u ? void 0 : i,
      alt: l
    }));
  },
  L = function (t) {
    var a = t.fallback,
      i = t.sources,
      r = void 0 === i ? [] : i,
      s = t.shouldLoad,
      l = void 0 === s || s,
      u = o(t, T),
      d = u.sizes || (null == a ? void 0 : a.sizes),
      c = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, n({}, u, a, {
        sizes: d,
        shouldLoad: l
      }));
    return r.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture", null, r.map(function (t) {
      var a = t.media,
        i = t.srcSet,
        r = t.type;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source", {
        key: a + "-" + r + "-" + i,
        type: r,
        media: a,
        srcSet: l ? i : void 0,
        "data-srcset": l ? void 0 : i,
        sizes: d
      });
    }), c) : c;
  };
z.propTypes = {
  src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool
}, L.displayName = "Picture", L.propTypes = {
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string
  }),
  sources: prop_types__WEBPACK_IMPORTED_MODULE_2__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  }), prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  })]))
};
var q = ["fallback"],
  C = function (t) {
    var a = t.fallback,
      i = o(t, q);
    return a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(L, n({}, i, {
      fallback: {
        src: a
      },
      "aria-hidden": !0,
      alt: ""
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", n({}, i));
  };
C.displayName = "Placeholder", C.propTypes = {
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  sources: null == (A = L.propTypes) ? void 0 : A.sources,
  alt: function (e, t, a) {
    return e[t] ? new Error("Invalid prop `" + t + "` supplied to `" + a + "`. Validation failed.") : null;
  }
};
var D = function (t) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(L, n({}, t)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("noscript", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(L, n({}, t, {
    shouldLoad: !0
  }))));
};
D.displayName = "MainImage", D.propTypes = L.propTypes;
var P = ["children"],
  H = function () {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
      type: "module",
      dangerouslySetInnerHTML: {
        __html: 'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("[data-placeholder-image]").style.opacity=0)}}'
      }
    });
  },
  F = function (t) {
    var a = t.layout,
      i = t.width,
      r = t.height;
    return "fullWidth" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "aria-hidden": !0,
      style: {
        paddingTop: r / i * 100 + "%"
      }
    }) : "constrained" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        maxWidth: i,
        display: "block"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      alt: "",
      role: "presentation",
      "aria-hidden": "true",
      src: "data:image/svg+xml;charset=utf-8,%3Csvg%20height='" + r + "'%20width='" + i + "'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E",
      style: {
        maxWidth: "100%",
        display: "block",
        position: "static"
      }
    })) : null;
  },
  B = function (a) {
    var i = a.children,
      r = o(a, P);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F, n({}, r)), i, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(H, null));
  },
  G = ["as", "className", "class", "style", "image", "loading", "imgClassName", "imgStyle", "backgroundColor", "objectFit", "objectPosition"],
  V = ["style", "className"],
  U = function (e) {
    return e.replace(/\n/g, "");
  },
  X = function (t) {
    var a = t.as,
      i = void 0 === a ? "div" : a,
      r = t.className,
      s = t.class,
      l = t.style,
      u = t.image,
      d = t.loading,
      c = void 0 === d ? "lazy" : d,
      h = t.imgClassName,
      g = t.imgStyle,
      p = t.backgroundColor,
      m = t.objectFit,
      f = t.objectPosition,
      v = o(t, G);
    if (!u) return console.warn("[gatsby-plugin-image] Missing image prop"), null;
    s && (r = s), g = n({
      objectFit: m,
      objectPosition: f,
      backgroundColor: p
    }, g);
    var w = u.width,
      y = u.height,
      b = u.layout,
      k = u.images,
      E = u.placeholder,
      M = u.backgroundColor,
      S = function (e, t, a) {
        var i = {},
          r = "gatsby-image-wrapper";
        return x() || (i.position = "relative", i.overflow = "hidden"), "fixed" === a ? (i.width = e, i.height = t) : "constrained" === a && (x() || (i.display = "inline-block", i.verticalAlign = "top"), r = "gatsby-image-wrapper gatsby-image-wrapper-constrained"), {
          className: r,
          "data-gatsby-image-wrapper": "",
          style: i
        };
      }(w, y, b),
      N = S.style,
      I = S.className,
      W = o(S, V),
      j = {
        fallback: void 0,
        sources: []
      };
    return k.fallback && (j.fallback = n({}, k.fallback, {
      srcSet: k.fallback.srcSet ? U(k.fallback.srcSet) : void 0
    })), k.sources && (j.sources = k.sources.map(function (e) {
      return n({}, e, {
        srcSet: U(e.srcSet)
      });
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i, n({}, W, {
      style: n({}, N, l, {
        backgroundColor: p
      }),
      className: I + (r ? " " + r : "")
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(B, {
      layout: b,
      width: w,
      height: y
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(C, n({}, function (e, t, a, i, r, o, s, l) {
      var u = {};
      o && (u.backgroundColor = o, "fixed" === a ? (u.width = i, u.height = r, u.backgroundColor = o, u.position = "relative") : ("constrained" === a || "fullWidth" === a) && (u.position = "absolute", u.top = 0, u.left = 0, u.bottom = 0, u.right = 0)), s && (u.objectFit = s), l && (u.objectPosition = l);
      var d = n({}, e, {
        "aria-hidden": !0,
        "data-placeholder-image": "",
        style: n({
          opacity: 1,
          transition: "opacity 500ms linear"
        }, u)
      });
      return x() || (d.style = {
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
      }), d;
    }(E, 0, b, w, y, M, m, f))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(D, n({
      "data-gatsby-image-ssr": "",
      className: h
    }, v, function (e, t, a, i, r) {
      return void 0 === r && (r = {}), x() || (r = n({
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        transform: "translateZ(0)",
        transition: "opacity 250ms linear",
        width: "100%",
        willChange: "opacity"
      }, r)), n({}, a, {
        loading: i,
        shouldLoad: e,
        "data-main-image": "",
        style: n({}, r, {
          opacity: 0
        })
      });
    }("eager" === c, 0, j, c, g)))));
  },
  Y = ["src", "__imageData", "__error", "width", "height", "aspectRatio", "tracedSVGOptions", "placeholder", "formats", "quality", "transformOptions", "jpgOptions", "pngOptions", "webpOptions", "avifOptions", "blurredOptions", "breakpoints", "outputPixelDensities"],
  Z = function (t) {
    return function (a) {
      var i = a.src,
        r = a.__imageData,
        s = a.__error,
        l = o(a, Y);
      return s && console.warn(s), r ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t, n({
        image: r
      }, l)) : (console.warn("Image not loaded", i), s || "development" !== "development" || console.warn('Please ensure that "gatsby-plugin-image" is included in the plugins array in gatsby-config.js, and that your version of gatsby is at least 2.24.78'), null);
    };
  }(X),
  J = function (e, t) {
    return "fullWidth" !== e.layout || "width" !== t && "height" !== t || !e[t] ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t].concat([].slice.call(arguments, 2))) : new Error('"' + t + '" ' + e[t] + " may not be passed when layout is fullWidth.");
  },
  K = new Set(["fixed", "fullWidth", "constrained"]),
  Q = {
    src: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    alt: function (e, t, a) {
      return e.alt || "" === e.alt ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t, a].concat([].slice.call(arguments, 3))) : new Error('The "alt" prop is required in ' + a + '. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');
    },
    width: J,
    height: J,
    sizes: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    layout: function (e) {
      if (void 0 !== e.layout && !K.has(e.layout)) return new Error("Invalid value " + e.layout + '" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');
    }
  };
Z.displayName = "StaticImage", Z.propTypes = Q;


/***/ }),

/***/ "./src/components/CustomCursor.js":
/*!****************************************!*\
  !*** ./src/components/CustomCursor.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! framer-motion */ "./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs");


const CustomCursor = () => {
  const {
    0: mousePosition,
    1: setMousePosition
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    x: 0,
    y: 0
  });
  const {
    0: isHoveringLink,
    1: setIsHoveringLink
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const updateMousePosition = ev => {
      setMousePosition({
        x: ev.clientX,
        y: ev.clientY
      });
    };
    const handleLinkHover = () => {
      setIsHoveringLink(true);
    };
    const handleLinkUnhover = () => {
      setIsHoveringLink(false);
    };
    window.addEventListener("mousemove", updateMousePosition);
    document.querySelectorAll("a").forEach(link => {
      link.addEventListener("mouseenter", handleLinkHover);
      link.addEventListener("mouseleave", handleLinkUnhover);
    });
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.querySelectorAll("a").forEach(link => {
        link.removeEventListener("mouseenter", handleLinkHover);
        link.removeEventListener("mouseleave", handleLinkUnhover);
      });
    };
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
    className: "custom-cursor",
    style: {
      top: mousePosition.y,
      left: mousePosition.x,
      pointerEvents: "none",
      zIndex: 9999
    },
    animate: {
      transform: isHoveringLink ? "scale(1.3) translate(-50%,-50%)" : "scale(1) translate(-50%,-50%)",
      opacity: isHoveringLink ? 0.5 : 1
    },
    transition: {
      type: "tween",
      stiffness: 0
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(framer_motion__WEBPACK_IMPORTED_MODULE_1__.motion.div, {
    className: "mouse-gradient",
    animate: {
      top: mousePosition.y,
      left: mousePosition.x
    },
    transition: {
      type: "ease",
      stiffness: 300
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomCursor);

/***/ }),

/***/ "./src/components/SEO.js":
/*!*******************************!*\
  !*** ./src/components/SEO.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SEO: () => (/* binding */ SEO)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hooks_use_site_metadata__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hooks/use-site-metadata */ "./src/hooks/use-site-metadata.jsx");


const SEO = ({
  title,
  description,
  pathname,
  children
}) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    image,
    ogImage,
    siteUrl
  } = (0,_hooks_use_site_metadata__WEBPACK_IMPORTED_MODULE_1__.useSiteMetadata)();
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    ogImage: `${ogImage}`,
    url: `${siteUrl}${pathname || ``}`
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("title", null, seo.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "description",
    content: seo.description
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    name: "image",
    content: seo.image
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:title",
    content: seo.title
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:description",
    content: seo.description
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:url",
    content: seo.url
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("meta", {
    property: "og:image",
    content: seo.ogImage
  }), children);
};

/***/ }),

/***/ "./src/components/SidePanel.js":
/*!*************************************!*\
  !*** ./src/components/SidePanel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");



const SidePanel = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "side-panel"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "logo"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__.StaticImage, {
    src: "../images/logo.png",
    alt: "George Bottomley",
    placeholder: "blurred",
    width: 50,
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/924930019.json */ "./.cache/caches/gatsby-plugin-image/924930019.json")
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "nav"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "",
    className: "nav-item"
  }, "About"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "",
    className: "nav-item"
  }, "Portfolio"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "",
    className: "nav-item"
  }, "Contact")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: "",
    className: "icon"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__.StaticImage, {
    src: "../images/git.png",
    alt: "Github George Bottomley",
    placeholder: "blurred",
    width: 36,
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/3919071205.json */ "./.cache/caches/gatsby-plugin-image/3919071205.json")
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SidePanel);

/***/ }),

/***/ "./src/components/layout.js":
/*!**********************************!*\
  !*** ./src/components/layout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_favicon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-favicon */ "./node_modules/react-favicon/dist/index.js");
/* harmony import */ var react_favicon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_favicon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_main_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_favicon_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/favicon.png */ "./src/images/favicon.png");
/* harmony import */ var _SidePanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SidePanel */ "./src/components/SidePanel.js");



// Styles



function Layout({
  children
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react_favicon__WEBPACK_IMPORTED_MODULE_1___default()), {
    url: _images_favicon_png__WEBPACK_IMPORTED_MODULE_3__["default"]
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SidePanel__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "gradient"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("main", null, children));
}

/***/ }),

/***/ "./src/hooks/use-site-metadata.jsx":
/*!*****************************************!*\
  !*** ./src/hooks/use-site-metadata.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSiteMetadata: () => (/* binding */ useSiteMetadata)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_2407236387_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/2407236387.json */ "./public/page-data/sq/d/2407236387.json");

const useSiteMetadata = () => {
  const data = _public_page_data_sq_d_2407236387_json__WEBPACK_IMPORTED_MODULE_0__.data;
  return data.site.siteMetadata;
};

/***/ }),

/***/ "./src/pages/index.js?export=head":
/*!****************************************!*\
  !*** ./src/pages/index.js?export=head ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Head: () => (/* binding */ Head),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.js");
/* harmony import */ var _components_SEO__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/SEO */ "./src/components/SEO.js");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var react_type_animation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-type-animation */ "./node_modules/react-type-animation/dist/esm/index.es.js");
/* harmony import */ var _components_CustomCursor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/CustomCursor */ "./src/components/CustomCursor.js");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");








const IndexPage = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_CustomCursor__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "counter"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1", null, "George Bottomley", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_type_animation__WEBPACK_IMPORTED_MODULE_4__.TypeAnimation, {
    sequence: [" Frontend Developer", 1000, " UI/UX & CX Designer", 1000, " Saas Product designer", 1000],
    wrapper: "span",
    speed: 10,
    style: {
      fontSize: "1.3em",
      display: "inline-block",
      fontFamily: "Bentham",
      fontWeight: 400,
      fontStyle: "normal"
    },
    repeat: Infinity
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby__WEBPACK_IMPORTED_MODULE_3__.Link, {
    to: "",
    className: "button"
  }, "see portfolio"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_6__.StaticImage, {
    className: "shape",
    src: "../images/shape.png",
    alt: "",
    width: 420,
    layout: "fixed",
    placeholder: "none",
    __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/247823103.json */ "./.cache/caches/gatsby-plugin-image/247823103.json")
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IndexPage);
const Head = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_SEO__WEBPACK_IMPORTED_MODULE_2__.SEO, null);
};

/***/ }),

/***/ "./node_modules/mitt/dist/mitt.es.js":
/*!*******************************************!*\
  !*** ./node_modules/mitt/dist/mitt.es.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mitt);
//# sourceMappingURL=mitt.es.js.map


/***/ }),

/***/ "./node_modules/node-object-hash/dist/hasher.js":
/*!******************************************************!*\
  !*** ./node_modules/node-object-hash/dist/hasher.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var objectSorter_1 = __importDefault(__webpack_require__(/*! ./objectSorter */ "./node_modules/node-object-hash/dist/objectSorter.js"));
var crypto_1 = __importDefault(__webpack_require__(/*! crypto */ "crypto"));
/**
 * Default hash algorithm
 */
var DEFAULT_ALG = 'sha256';
/**
 * Default hash string enoding
 */
var DEFAULT_ENC = 'hex';
/**
 * Hasher constructor
 * @param options hasher options
 * @return hasher instance
 */
function hasher(options) {
    if (options === void 0) { options = {}; }
    var sortObject = (0, objectSorter_1.default)(options);
    /**
     * Object hash function
     * @param obj object to hash
     * @param opts hasher options
     * @returns hash string
     */
    function hashObject(obj, opts) {
        if (opts === void 0) { opts = {}; }
        var alg = opts.alg || options.alg || DEFAULT_ALG;
        var enc = opts.enc || options.enc || DEFAULT_ENC;
        var sorted = sortObject(obj);
        return crypto_1.default.createHash(alg).update(sorted).digest(enc);
    }
    return {
        hash: hashObject,
        sort: sortObject,
        sortObject: sortObject,
    };
}
module.exports = hasher;
//# sourceMappingURL=hasher.js.map

/***/ }),

/***/ "./node_modules/node-object-hash/dist/objectSorter.js":
/*!************************************************************!*\
  !*** ./node_modules/node-object-hash/dist/objectSorter.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var typeGuess_1 = __webpack_require__(/*! ./typeGuess */ "./node_modules/node-object-hash/dist/typeGuess.js");
var str = __importStar(__webpack_require__(/*! ./stringifiers */ "./node_modules/node-object-hash/dist/stringifiers.js"));
/**
 * Object sorter consturctor
 * @param options object transformation options
 * @return function that transforms object to strings
 */
function objectSorter(options) {
    if (options === void 0) { options = {}; }
    var _a = __assign({ sort: true, coerce: true, trim: false }, options), sort = _a.sort, coerce = _a.coerce, trim = _a.trim;
    var stringifiers = {
        unknown: function _unknown(obj) {
            var _a, _b;
            // `unknonw` - is a typo, saved for backward compatibility
            var constructorName = (_b = (_a = obj.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'unknonw';
            var objectName = typeof obj.toString === 'function' ? obj.toString() : 'unknown';
            return "<:" + constructorName + ">:" + objectName;
        },
    };
    var sortOptions = {
        array: typeof sort === 'boolean' ? sort : sort.array,
        typedArray: typeof sort === 'boolean' ? false : sort.typedArray,
        object: typeof sort === 'boolean' ? sort : sort.object,
        set: typeof sort === 'boolean' ? sort : sort.set,
        map: typeof sort === 'boolean' ? sort : sort.map,
    };
    var coerceOptions = {
        boolean: typeof coerce === 'boolean' ? coerce : coerce.boolean,
        number: typeof coerce === 'boolean' ? coerce : coerce.number,
        bigint: typeof coerce === 'boolean' ? coerce : coerce.bigint,
        string: typeof coerce === 'boolean' ? coerce : coerce.string,
        undefined: typeof coerce === 'boolean' ? coerce : coerce.undefined,
        null: typeof coerce === 'boolean' ? coerce : coerce.null,
        symbol: typeof coerce === 'boolean' ? coerce : coerce.symbol,
        function: typeof coerce === 'boolean' ? coerce : coerce.function,
        date: typeof coerce === 'boolean' ? coerce : coerce.date,
        set: typeof coerce === 'boolean' ? coerce : coerce.set,
    };
    var trimOptions = {
        string: typeof trim === 'boolean' ? trim : trim.string,
        function: typeof trim === 'boolean' ? trim : trim.function,
    };
    stringifiers.hashable = str._hashable.bind(stringifiers);
    if (trimOptions.string) {
        stringifiers.string = coerceOptions.string
            ? str._stringTrimCoerce.bind(stringifiers)
            : str._stringTrim.bind(stringifiers);
    }
    else {
        stringifiers.string = coerceOptions.string
            ? str._stringCoerce.bind(stringifiers)
            : str._string.bind(stringifiers);
    }
    stringifiers.number = coerceOptions.number
        ? str._numberCoerce.bind(stringifiers)
        : str._number.bind(stringifiers);
    stringifiers.bigint = coerceOptions.bigint
        ? str._bigIntCoerce.bind(stringifiers)
        : str._bigInt.bind(stringifiers);
    stringifiers.boolean = coerceOptions.boolean
        ? str._booleanCoerce.bind(stringifiers)
        : str._boolean.bind(stringifiers);
    stringifiers.symbol = coerceOptions.symbol
        ? str._symbolCoerce.bind(stringifiers)
        : str._symbol.bind(stringifiers);
    stringifiers.undefined = coerceOptions.undefined
        ? str._undefinedCoerce.bind(stringifiers)
        : str._undefined.bind(stringifiers);
    stringifiers.null = coerceOptions.null
        ? str._nullCoerce.bind(stringifiers)
        : str._null.bind(stringifiers);
    if (trimOptions.function) {
        stringifiers.function = coerceOptions.function
            ? str._functionTrimCoerce.bind(stringifiers)
            : str._functionTrim.bind(stringifiers);
    }
    else {
        stringifiers.function = coerceOptions.function
            ? str._functionCoerce.bind(stringifiers)
            : str._function.bind(stringifiers);
    }
    stringifiers.date = coerceOptions.date
        ? str._dateCoerce.bind(stringifiers)
        : str._date.bind(stringifiers);
    stringifiers.array = sortOptions.array
        ? str._arraySort.bind(stringifiers)
        : str._array.bind(stringifiers);
    stringifiers.typedarray = sortOptions.typedArray
        ? str._typedArraySort.bind(stringifiers)
        : str._typedArray.bind(stringifiers);
    if (sortOptions.set) {
        stringifiers.set = coerceOptions.set
            ? str._setSortCoerce.bind(stringifiers)
            : str._setSort.bind(stringifiers);
    }
    else {
        stringifiers.set = coerceOptions.set
            ? str._setCoerce.bind(stringifiers)
            : str._set.bind(stringifiers);
    }
    stringifiers.object = sortOptions.object
        ? str._objectSort.bind(stringifiers)
        : str._object.bind(stringifiers);
    stringifiers.map = sortOptions.map
        ? str._mapSort.bind(stringifiers)
        : str._map.bind(stringifiers);
    /**
     * Serializes object to string
     * @param obj object
     */
    function objectToString(obj) {
        return stringifiers[(0, typeGuess_1.guessType)(obj)](obj);
    }
    return objectToString;
}
module.exports = objectSorter;
//# sourceMappingURL=objectSorter.js.map

/***/ }),

/***/ "./node_modules/node-object-hash/dist/stringifiers.js":
/*!************************************************************!*\
  !*** ./node_modules/node-object-hash/dist/stringifiers.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * @private
 * @inner
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._mapSort = exports._map = exports._objectSort = exports._object = exports._setCoerce = exports._set = exports._setSort = exports._setSortCoerce = exports._typedArray = exports._typedArraySort = exports._array = exports._arraySort = exports._date = exports._dateCoerce = exports._functionTrim = exports._functionTrimCoerce = exports._function = exports._functionCoerce = exports._null = exports._nullCoerce = exports._undefined = exports._undefinedCoerce = exports._symbol = exports._symbolCoerce = exports._boolean = exports._booleanCoerce = exports._bigInt = exports._bigIntCoerce = exports._number = exports._numberCoerce = exports._stringTrim = exports._stringTrimCoerce = exports._string = exports._stringCoerce = exports._hashable = exports.PREFIX = void 0;
var typeGuess_1 = __webpack_require__(/*! ./typeGuess */ "./node_modules/node-object-hash/dist/typeGuess.js");
/**
 * Prefixes that used when type coercion is disabled
 */
exports.PREFIX = {
    string: '<:s>',
    number: '<:n>',
    bigint: '<:bi>',
    boolean: '<:b>',
    symbol: '<:smbl>',
    undefined: '<:undf>',
    null: '<:null>',
    function: '<:func>',
    array: '',
    date: '<:date>',
    set: '<:set>',
    map: '<:map>',
};
/**
 * Converts Hashable to string
 * @private
 * @param obj object to convert
 * @returns object string representation
 */
function _hashable(obj) {
    return obj.toHashableString();
}
exports._hashable = _hashable;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _stringCoerce(obj) {
    return obj;
}
exports._stringCoerce = _stringCoerce;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _string(obj) {
    return exports.PREFIX.string + ':' + obj;
}
exports._string = _string;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _stringTrimCoerce(obj) {
    return obj.replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ').trim();
}
exports._stringTrimCoerce = _stringTrimCoerce;
/**
 * Converts string to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _stringTrim(obj) {
    return exports.PREFIX.string + ':' + obj.replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ').trim();
}
exports._stringTrim = _stringTrim;
/**
 * Converts number to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _numberCoerce(obj) {
    return obj.toString();
}
exports._numberCoerce = _numberCoerce;
/**
 * Converts number to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _number(obj) {
    return exports.PREFIX.number + ":" + obj;
}
exports._number = _number;
/**
 * Converts BigInt to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _bigIntCoerce(obj) {
    return obj.toString();
}
exports._bigIntCoerce = _bigIntCoerce;
/**
 * Converts BigInt to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _bigInt(obj) {
    return exports.PREFIX.bigint + ":" + obj.toString();
}
exports._bigInt = _bigInt;
/**
 * Converts boolean to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _booleanCoerce(obj) {
    return obj ? '1' : '0';
}
exports._booleanCoerce = _booleanCoerce;
/**
 * Converts boolean to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _boolean(obj) {
    return exports.PREFIX.boolean + ':' + obj.toString();
}
exports._boolean = _boolean;
/**
 * Converts symbol to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _symbolCoerce() {
    return exports.PREFIX.symbol;
}
exports._symbolCoerce = _symbolCoerce;
/**
 * Converts symbol to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _symbol(obj) {
    return exports.PREFIX.symbol + ':' + obj.toString();
}
exports._symbol = _symbol;
/**
 * Converts undefined to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _undefinedCoerce() {
    return '';
}
exports._undefinedCoerce = _undefinedCoerce;
/**
 * Converts undefined to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _undefined() {
    return exports.PREFIX.undefined;
}
exports._undefined = _undefined;
/**
 * Converts null to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _nullCoerce() {
    return '';
}
exports._nullCoerce = _nullCoerce;
/**
 * Converts null to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _null() {
    return exports.PREFIX.null;
}
exports._null = _null;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _functionCoerce(obj) {
    return obj.name + '=>' + obj.toString();
}
exports._functionCoerce = _functionCoerce;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _function(obj) {
    return exports.PREFIX.function + ':' + obj.name + '=>' + obj.toString();
}
exports._function = _function;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _functionTrimCoerce(obj) {
    return (obj.name +
        '=>' +
        obj
            .toString()
            .replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ')
            .trim());
}
exports._functionTrimCoerce = _functionTrimCoerce;
/**
 * Converts function to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _functionTrim(obj) {
    return (exports.PREFIX.function +
        ':' +
        obj.name +
        '=>' +
        obj
            .toString()
            .replace(/(\s+|\t|\r\n|\n|\r)/gm, ' ')
            .trim());
}
exports._functionTrim = _functionTrim;
/**
 * Converts date to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _dateCoerce(obj) {
    return obj.toISOString();
}
exports._dateCoerce = _dateCoerce;
/**
 * Converts date to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _date(obj) {
    return exports.PREFIX.date + ':' + obj.toISOString();
}
exports._date = _date;
/**
 * Converts array to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _arraySort(obj) {
    var stringifiers = this;
    return ('[' +
        obj
            .map(function (item) {
            return stringifiers[(0, typeGuess_1.guessType)(item)](item);
        })
            .sort()
            .toString() +
        ']');
}
exports._arraySort = _arraySort;
/**
 * Converts array to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _array(obj) {
    var stringifiers = this;
    return ('[' +
        obj
            .map(function (item) {
            return stringifiers[(0, typeGuess_1.guessType)(item)](item);
        })
            .toString() +
        ']');
}
exports._array = _array;
/**
 * Converts TypedArray to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _typedArraySort(obj) {
    var stringifiers = this;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var values = Array.prototype.slice.call(obj);
    return ('[' +
        values
            .map(function (num) {
            return stringifiers[(0, typeGuess_1.guessType)(num)](num);
        })
            .sort()
            .toString() +
        ']');
}
exports._typedArraySort = _typedArraySort;
/**
 * Converts TypedArray to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _typedArray(obj) {
    var stringifiers = this;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var values = Array.prototype.slice.call(obj);
    return ('[' +
        values
            .map(function (num) {
            return stringifiers[(0, typeGuess_1.guessType)(num)](num);
        })
            .toString() +
        ']');
}
exports._typedArray = _typedArray;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _setSortCoerce(obj) {
    return _arraySort.call(this, Array.from(obj));
}
exports._setSortCoerce = _setSortCoerce;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _setSort(obj) {
    return exports.PREFIX.set + ":" + _arraySort.call(this, Array.from(obj));
}
exports._setSort = _setSort;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _set(obj) {
    return exports.PREFIX.set + ":" + _array.call(this, Array.from(obj));
}
exports._set = _set;
/**
 * Converts set to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _setCoerce(obj) {
    return _array.call(this, Array.from(obj));
}
exports._setCoerce = _setCoerce;
/**
 * Converts object to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _object(obj) {
    var stringifiers = this;
    var keys = Object.keys(obj);
    var objArray = [];
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var val = obj[key];
        var valT = (0, typeGuess_1.guessType)(val);
        objArray.push(key + ':' + stringifiers[valT](val));
    }
    return '{' + objArray.toString() + '}';
}
exports._object = _object;
/**
 * Converts object to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _objectSort(obj) {
    var stringifiers = this;
    var keys = Object.keys(obj).sort();
    var objArray = [];
    for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
        var key = keys_2[_i];
        var val = obj[key];
        var valT = (0, typeGuess_1.guessType)(val);
        objArray.push(key + ':' + stringifiers[valT](val));
    }
    return '{' + objArray.toString() + '}';
}
exports._objectSort = _objectSort;
/**
 * Converts map to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _map(obj) {
    var stringifiers = this;
    var arr = Array.from(obj);
    var mapped = [];
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var item = arr_1[_i];
        var _a = item, key = _a[0], value = _a[1];
        mapped.push([
            stringifiers[(0, typeGuess_1.guessType)(key)](key),
            stringifiers[(0, typeGuess_1.guessType)(value)](value),
        ]);
    }
    return '[' + mapped.join(';') + ']';
}
exports._map = _map;
/**
 * Converts map to string
 * @private
 * @param obj object to convert
 * @return object string representation
 */
function _mapSort(obj) {
    var stringifiers = this;
    var arr = Array.from(obj);
    var mapped = [];
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var item = arr_2[_i];
        var _a = item, key = _a[0], value = _a[1];
        mapped.push([
            stringifiers[(0, typeGuess_1.guessType)(key)](key),
            stringifiers[(0, typeGuess_1.guessType)(value)](value),
        ]);
    }
    return '[' + mapped.sort().join(';') + ']';
}
exports._mapSort = _mapSort;
//# sourceMappingURL=stringifiers.js.map

/***/ }),

/***/ "./node_modules/node-object-hash/dist/typeGuess.js":
/*!*********************************************************!*\
  !*** ./node_modules/node-object-hash/dist/typeGuess.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.guessType = exports.guessObjectType = exports.TYPE_MAP = void 0;
/**
 * Type mapping rules.
 */
exports.TYPE_MAP = {
    Array: 'array',
    Int8Array: 'typedarray',
    Uint8Array: 'typedarray',
    Uint8ClampedArray: 'typedarray',
    Int16Array: 'typedarray',
    Uint16Array: 'typedarray',
    Int32Array: 'typedarray',
    Uint32Array: 'typedarray',
    Float32Array: 'typedarray',
    Float64Array: 'typedarray',
    BigUint64Array: 'typedarray',
    BigInt64Array: 'typedarray',
    Buffer: 'typedarray',
    Map: 'map',
    Set: 'set',
    Date: 'date',
    String: 'string',
    Number: 'number',
    BigInt: 'bigint',
    Boolean: 'boolean',
    Object: 'object',
};
/**
 * Guess object type
 * @param obj analyzed object
 * @return object type
 */
function guessObjectType(obj) {
    var _a, _b;
    if (obj === null) {
        return 'null';
    }
    if (instanceOfHashable(obj)) {
        return 'hashable';
    }
    var type = (_b = (_a = obj.constructor) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'unknown';
    return exports.TYPE_MAP[type] || 'unknown';
}
exports.guessObjectType = guessObjectType;
/**
 * Guess variable type
 * @param obj analyzed variable
 * @return variable type
 */
function guessType(obj) {
    var type = typeof obj;
    return type !== 'object' ? type : guessObjectType(obj);
}
exports.guessType = guessType;
/**
 * Identify if object is instance of Hashable interface
 * @param object analyzed variable
 * @return true if object has toHashableString property and this property is function
 * otherwise return false
 */
function instanceOfHashable(object) {
    return typeof object.toHashableString === 'function';
}
//# sourceMappingURL=typeGuess.js.map

/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/react-favicon/dist/index.js":
/*!**************************************************!*\
  !*** ./node_modules/react-favicon/dist/index.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.jsx
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_react = __webpack_require__(/*! react */ "react");
var import_prop_types = __toESM(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));
var DefaultCanvasSize = 16;
var linkElements = [];
var drawAlert = (context, { fillColor, text, textColor, canvasSize }) => {
  const Padding = canvasSize / 5;
  context.font = `bold ${canvasSize - Padding * 2}px arial`;
  const w = Math.min(
    // Take the text with if it's smaller than available space (eg: '2')
    context.measureText(text).width,
    // Or take the maximum size we'll force our text to fit in anyway (eg: '1000000')
    canvasSize - Padding
  ) + Padding;
  const x = canvasSize - w;
  const y = canvasSize / 2 - Padding;
  const h = Padding + canvasSize / 2;
  const r = Math.min(w / 2, h / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + w, y, x + w, y + h, r);
  context.arcTo(x + w, y + h, x, y + h, r);
  context.arcTo(x, y + h, x, y, r);
  context.arcTo(x, y, x + w, y, r);
  context.closePath();
  context.fillStyle = fillColor;
  context.fill();
  context.fillStyle = textColor;
  context.textBaseline = "bottom";
  context.textAlign = "right";
  context.fillText(
    text,
    canvasSize - Padding / 2,
    canvasSize,
    // This will prevent the text from going outside the favicon, instead it'll squeeze his with to fit in
    canvasSize - Padding
  );
};
var drawIcon = ({
  alertCount,
  alertFillColor,
  alertTextColor,
  callback,
  renderOverlay,
  url: src,
  canvasSize
}) => {
  const img = document.createElement("img");
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    const canvas = document.createElement("canvas");
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, img.width, img.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    if (alertCount) {
      drawAlert(context, {
        fillColor: alertFillColor,
        textColor: alertTextColor,
        text: alertCount,
        canvasSize
      });
    }
    if (renderOverlay) {
      renderOverlay(canvas, context);
    }
    callback(context.canvas.toDataURL());
  };
  img.src = src;
};
var updateHtmlIconLink = (keepIconLink) => {
  if (typeof document === "undefined") {
    return;
  }
  if (linkElements.length === 0) {
    var head = document.getElementsByTagName("head")[0];
    const linkEl = document.createElement("link");
    linkEl.type = "image/x-icon";
    linkEl.rel = "icon";
    const linkApple = document.createElement("link");
    linkApple.rel = "apple-touch-icon";
    linkElements.push(linkEl, linkApple);
    var links = head.getElementsByTagName("link");
    for (var i = links.length; --i >= 0; ) {
      if (/\bicon\b/i.test(links[i].getAttribute("rel")) && !keepIconLink(links[i])) {
        head.removeChild(links[i]);
      }
    }
    linkElements.forEach((el) => head.appendChild(el));
  }
};
var defaultKeepIconLink = () => false;
var Favicon = ({
  iconSize = DefaultCanvasSize,
  alertCount = null,
  alertFillColor = "red",
  alertTextColor = "white",
  animated = true,
  animationDelay = 500,
  keepIconLink = defaultKeepIconLink,
  renderOverlay = null,
  url = null
}) => {
  const animationIndex = (0, import_react.useRef)(0);
  const animationTickIntervalId = (0, import_react.useRef)(null);
  const [, updateState] = (0, import_react.useState)();
  const forceUpdate = (0, import_react.useCallback)(() => updateState({}), []);
  const onAnimationTick = (0, import_react.useCallback)(() => {
    updateHtmlIconLink(keepIconLink);
    animationIndex.current = (animationIndex.current + 1) % url.length;
    forceUpdate();
  }, [forceUpdate, keepIconLink, url]);
  (0, import_react.useEffect)(() => {
    onAnimationTick();
  }, [onAnimationTick]);
  const isAnimated = url instanceof Array && animated;
  (0, import_react.useEffect)(() => {
    if (isAnimated) {
      if (!animationTickIntervalId.current) {
        const intervalId = setInterval(onAnimationTick, animationDelay);
        animationTickIntervalId.current = intervalId;
      }
    } else {
      if (animationTickIntervalId.current) {
        clearInterval(animationTickIntervalId.current);
        animationTickIntervalId.current = null;
        updateHtmlIconLink(keepIconLink);
      }
    }
  }, [animationDelay, isAnimated, keepIconLink, onAnimationTick, url]);
  const currentUrl = isAnimated ? url[animationIndex.current] : url instanceof Array ? url[0] : url;
  if (alertCount || renderOverlay) {
    drawIcon({
      alertCount,
      alertFillColor,
      alertTextColor,
      callback: (url2) => {
        linkElements.forEach((el) => el.href = url2);
      },
      renderOverlay,
      url: currentUrl,
      canvasSize: iconSize
    });
  } else {
    linkElements.forEach((el) => el.href = currentUrl);
  }
  return null;
};
Favicon.propTypes = {
  iconSize: import_prop_types.default.number,
  alertCount: import_prop_types.default.oneOfType([import_prop_types.default.number, import_prop_types.default.string]),
  alertFillColor: import_prop_types.default.string,
  alertTextColor: import_prop_types.default.string,
  animated: import_prop_types.default.bool,
  animationDelay: import_prop_types.default.number,
  keepIconLink: import_prop_types.default.func,
  renderOverlay: import_prop_types.default.func,
  url: import_prop_types.default.oneOfType([
    import_prop_types.default.arrayOf(import_prop_types.default.string),
    import_prop_types.default.string
  ]).isRequired
};
var src_default = Favicon;
module.exports = module.exports.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack.development.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack.development.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-server-dom-webpack.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

function createStringDecoder() {
  return new TextDecoder();
}
var decoderOptions = {
  stream: true
};
function readPartialStringChunk(decoder, buffer) {
  return decoder.decode(buffer, decoderOptions);
}
function readFinalStringChunk(decoder, buffer) {
  return decoder.decode(buffer);
}

function parseModel(response, json) {
  return JSON.parse(json, response._fromJSON);
}

// eslint-disable-next-line no-unused-vars
function resolveModuleReference(bundlerConfig, moduleData) {
  if (bundlerConfig) {
    return bundlerConfig[moduleData.id][moduleData.name];
  }

  return moduleData;
} // The chunk cache contains all the chunks we've preloaded so far.
// If they're still pending they're a thenable. This map also exists
// in Webpack but unfortunately it's not exposed so we have to
// replicate it in user space. null means that it has already loaded.

var chunkCache = new Map(); // Start preloading the modules since we might need them soon.
// This function doesn't suspend.

function preloadModule(moduleData) {
  var chunks = moduleData.chunks;

  for (var i = 0; i < chunks.length; i++) {
    var chunkId = chunks[i];
    var entry = chunkCache.get(chunkId);

    if (entry === undefined) {
      var thenable = __webpack_require__.e(chunkId);

      var resolve = chunkCache.set.bind(chunkCache, chunkId, null);
      var reject = chunkCache.set.bind(chunkCache, chunkId);
      thenable.then(resolve, reject);
      chunkCache.set(chunkId, thenable);
    }
  }
} // Actually require the module or suspend if it's not yet ready.
// Increase priority if necessary.

function requireModule(moduleData) {
  var chunks = moduleData.chunks;

  for (var i = 0; i < chunks.length; i++) {
    var chunkId = chunks[i];
    var entry = chunkCache.get(chunkId);

    if (entry !== null) {
      // We assume that preloadModule has been called before.
      // So we don't expect to see entry being undefined here, that's an error.
      // Let's throw either an error or the Promise.
      throw entry;
    }
  }

  var moduleExports = __webpack_require__(moduleData.id);

  if (moduleData.name === '*') {
    // This is a placeholder value that represents that the caller imported this
    // as a CommonJS module as is.
    return moduleExports;
  }

  if (moduleData.name === '') {
    // This is a placeholder value that represents that the caller accessed the
    // default property of this if it was an ESM interop module.
    return moduleExports.__esModule ? moduleExports.default : moduleExports;
  }

  return moduleExports[moduleData.name];
}

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED = Symbol.for('react.default_value');

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

var ContextRegistry = ReactSharedInternals.ContextRegistry;
function getOrCreateServerContext(globalName) {
  if (!ContextRegistry[globalName]) {
    ContextRegistry[globalName] = React.createServerContext(globalName, REACT_SERVER_CONTEXT_DEFAULT_VALUE_NOT_LOADED);
  }

  return ContextRegistry[globalName];
}

var PENDING = 0;
var RESOLVED_MODEL = 1;
var RESOLVED_MODULE = 2;
var INITIALIZED = 3;
var ERRORED = 4;

function Chunk(status, value, response) {
  this._status = status;
  this._value = value;
  this._response = response;
}

Chunk.prototype.then = function (resolve) {
  var chunk = this;

  if (chunk._status === PENDING) {
    if (chunk._value === null) {
      chunk._value = [];
    }

    chunk._value.push(resolve);
  } else {
    resolve();
  }
};

function readChunk(chunk) {
  switch (chunk._status) {
    case INITIALIZED:
      return chunk._value;

    case RESOLVED_MODEL:
      return initializeModelChunk(chunk);

    case RESOLVED_MODULE:
      return initializeModuleChunk(chunk);

    case PENDING:
      // eslint-disable-next-line no-throw-literal
      throw chunk;

    default:
      throw chunk._value;
  }
}

function readRoot() {
  var response = this;
  var chunk = getChunk(response, 0);
  return readChunk(chunk);
}

function createPendingChunk(response) {
  return new Chunk(PENDING, null, response);
}

function createErrorChunk(response, error) {
  return new Chunk(ERRORED, error, response);
}

function createInitializedChunk(response, value) {
  return new Chunk(INITIALIZED, value, response);
}

function wakeChunk(listeners) {
  if (listeners !== null) {
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
  }
}

function triggerErrorOnChunk(chunk, error) {
  if (chunk._status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var listeners = chunk._value;
  var erroredChunk = chunk;
  erroredChunk._status = ERRORED;
  erroredChunk._value = error;
  wakeChunk(listeners);
}

function createResolvedModelChunk(response, value) {
  return new Chunk(RESOLVED_MODEL, value, response);
}

function createResolvedModuleChunk(response, value) {
  return new Chunk(RESOLVED_MODULE, value, response);
}

function resolveModelChunk(chunk, value) {
  if (chunk._status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var listeners = chunk._value;
  var resolvedChunk = chunk;
  resolvedChunk._status = RESOLVED_MODEL;
  resolvedChunk._value = value;
  wakeChunk(listeners);
}

function resolveModuleChunk(chunk, value) {
  if (chunk._status !== PENDING) {
    // We already resolved. We didn't expect to see this.
    return;
  }

  var listeners = chunk._value;
  var resolvedChunk = chunk;
  resolvedChunk._status = RESOLVED_MODULE;
  resolvedChunk._value = value;
  wakeChunk(listeners);
}

function initializeModelChunk(chunk) {
  var value = parseModel(chunk._response, chunk._value);
  var initializedChunk = chunk;
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
}

function initializeModuleChunk(chunk) {
  var value = requireModule(chunk._value);
  var initializedChunk = chunk;
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
} // Report that any missing chunks in the model is now going to throw this
// error upon read. Also notify any pending promises.


function reportGlobalError(response, error) {
  response._chunks.forEach(function (chunk) {
    // If this chunk was already resolved or errored, it won't
    // trigger an error but if it wasn't then we need to
    // because we won't be getting any new data to resolve it.
    triggerErrorOnChunk(chunk, error);
  });
}

function createElement(type, key, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: null,
    props: props,
    // Record the component responsible for creating this element.
    _owner: null
  };

  {
    // We don't really need to add any of these but keeping them for good measure.
    // Unfortunately, _store is enumerable in jest matchers so for equality to
    // work, I need to keep it or make _store non-enumerable in the other file.
    element._store = {};
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: true // This element has already been validated on the server.

    });
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: null
    });
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: null
    });
  }

  return element;
}

function createLazyChunkWrapper(chunk) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _payload: chunk,
    _init: readChunk
  };
  return lazyType;
}

function getChunk(response, id) {
  var chunks = response._chunks;
  var chunk = chunks.get(id);

  if (!chunk) {
    chunk = createPendingChunk(response);
    chunks.set(id, chunk);
  }

  return chunk;
}

function parseModelString(response, parentObject, value) {
  switch (value[0]) {
    case '$':
      {
        if (value === '$') {
          return REACT_ELEMENT_TYPE;
        } else if (value[1] === '$' || value[1] === '@') {
          // This was an escaped string value.
          return value.substring(1);
        } else {
          var id = parseInt(value.substring(1), 16);
          var chunk = getChunk(response, id);
          return readChunk(chunk);
        }
      }

    case '@':
      {
        var _id = parseInt(value.substring(1), 16);

        var _chunk = getChunk(response, _id); // We create a React.lazy wrapper around any lazy values.
        // When passed into React, we'll know how to suspend on this.


        return createLazyChunkWrapper(_chunk);
      }
  }

  return value;
}
function parseModelTuple(response, value) {
  var tuple = value;

  if (tuple[0] === REACT_ELEMENT_TYPE) {
    // TODO: Consider having React just directly accept these arrays as elements.
    // Or even change the ReactElement type to be an array.
    return createElement(tuple[1], tuple[2], tuple[3]);
  }

  return value;
}
function createResponse(bundlerConfig) {
  var chunks = new Map();
  var response = {
    _bundlerConfig: bundlerConfig,
    _chunks: chunks,
    readRoot: readRoot
  };
  return response;
}
function resolveModel(response, id, model) {
  var chunks = response._chunks;
  var chunk = chunks.get(id);

  if (!chunk) {
    chunks.set(id, createResolvedModelChunk(response, model));
  } else {
    resolveModelChunk(chunk, model);
  }
}
function resolveProvider(response, id, contextName) {
  var chunks = response._chunks;
  chunks.set(id, createInitializedChunk(response, getOrCreateServerContext(contextName).Provider));
}
function resolveModule(response, id, model) {
  var chunks = response._chunks;
  var chunk = chunks.get(id);
  var moduleMetaData = parseModel(response, model);
  var moduleReference = resolveModuleReference(response._bundlerConfig, moduleMetaData); // TODO: Add an option to encode modules that are lazy loaded.
  // For now we preload all modules as early as possible since it's likely
  // that we'll need them.

  preloadModule(moduleReference);

  if (!chunk) {
    chunks.set(id, createResolvedModuleChunk(response, moduleReference));
  } else {
    resolveModuleChunk(chunk, moduleReference);
  }
}
function resolveSymbol(response, id, name) {
  var chunks = response._chunks; // We assume that we'll always emit the symbol before anything references it
  // to save a few bytes.

  chunks.set(id, createInitializedChunk(response, Symbol.for(name)));
}
function resolveError(response, id, message, stack) {
  // eslint-disable-next-line react-internal/prod-error-codes
  var error = new Error(message);
  error.stack = stack;
  var chunks = response._chunks;
  var chunk = chunks.get(id);

  if (!chunk) {
    chunks.set(id, createErrorChunk(response, error));
  } else {
    triggerErrorOnChunk(chunk, error);
  }
}
function close(response) {
  // In case there are any remaining unresolved chunks, they won't
  // be resolved now. So we need to issue an error to those.
  // Ideally we should be able to early bail out if we kept a
  // ref count of pending chunks.
  reportGlobalError(response, new Error('Connection closed.'));
}

function processFullRow(response, row) {
  if (row === '') {
    return;
  }

  var tag = row[0]; // When tags that are not text are added, check them here before
  // parsing the row as text.
  // switch (tag) {
  // }

  var colon = row.indexOf(':', 1);
  var id = parseInt(row.substring(1, colon), 16);
  var text = row.substring(colon + 1);

  switch (tag) {
    case 'J':
      {
        resolveModel(response, id, text);
        return;
      }

    case 'M':
      {
        resolveModule(response, id, text);
        return;
      }

    case 'P':
      {
        resolveProvider(response, id, text);
        return;
      }

    case 'S':
      {
        resolveSymbol(response, id, JSON.parse(text));
        return;
      }

    case 'E':
      {
        var errorInfo = JSON.parse(text);
        resolveError(response, id, errorInfo.message, errorInfo.stack);
        return;
      }

    default:
      {
        throw new Error("Error parsing the data. It's probably an error code or network corruption.");
      }
  }
}

function processStringChunk(response, chunk, offset) {
  var linebreak = chunk.indexOf('\n', offset);

  while (linebreak > -1) {
    var fullrow = response._partialRow + chunk.substring(offset, linebreak);
    processFullRow(response, fullrow);
    response._partialRow = '';
    offset = linebreak + 1;
    linebreak = chunk.indexOf('\n', offset);
  }

  response._partialRow += chunk.substring(offset);
}
function processBinaryChunk(response, chunk) {

  var stringDecoder = response._stringDecoder;
  var linebreak = chunk.indexOf(10); // newline

  while (linebreak > -1) {
    var fullrow = response._partialRow + readFinalStringChunk(stringDecoder, chunk.subarray(0, linebreak));
    processFullRow(response, fullrow);
    response._partialRow = '';
    chunk = chunk.subarray(linebreak + 1);
    linebreak = chunk.indexOf(10); // newline
  }

  response._partialRow += readPartialStringChunk(stringDecoder, chunk);
}

function createFromJSONCallback(response) {
  return function (key, value) {
    if (typeof value === 'string') {
      // We can't use .bind here because we need the "this" value.
      return parseModelString(response, this, value);
    }

    if (typeof value === 'object' && value !== null) {
      return parseModelTuple(response, value);
    }

    return value;
  };
}

function createResponse$1(bundlerConfig) {
  // NOTE: CHECK THE COMPILER OUTPUT EACH TIME YOU CHANGE THIS.
  // It should be inlined to one object literal but minor changes can break it.
  var stringDecoder =  createStringDecoder() ;
  var response = createResponse(bundlerConfig);
  response._partialRow = '';

  {
    response._stringDecoder = stringDecoder;
  } // Don't inline this call because it causes closure to outline the call above.


  response._fromJSON = createFromJSONCallback(response);
  return response;
}

function startReadingFromStream(response, stream) {
  var reader = stream.getReader();

  function progress(_ref) {
    var done = _ref.done,
        value = _ref.value;

    if (done) {
      close(response);
      return;
    }

    var buffer = value;
    processBinaryChunk(response, buffer);
    return reader.read().then(progress, error);
  }

  function error(e) {
    reportGlobalError(response, e);
  }

  reader.read().then(progress, error);
}

function createFromReadableStream(stream, options) {
  var response = createResponse$1(options && options.moduleMap ? options.moduleMap : null);
  startReadingFromStream(response, stream);
  return response;
}

function createFromFetch(promiseForResponse, options) {
  var response = createResponse$1(options && options.moduleMap ? options.moduleMap : null);
  promiseForResponse.then(function (r) {
    startReadingFromStream(response, r.body);
  }, function (e) {
    reportGlobalError(response, e);
  });
  return response;
}

function createFromXHR(request, options) {
  var response = createResponse$1(options && options.moduleMap ? options.moduleMap : null);
  var processedLength = 0;

  function progress(e) {
    var chunk = request.responseText;
    processStringChunk(response, chunk, processedLength);
    processedLength = chunk.length;
  }

  function load(e) {
    progress();
    close(response);
  }

  function error(e) {
    reportGlobalError(response, new TypeError('Network error'));
  }

  request.addEventListener('progress', progress);
  request.addEventListener('load', load);
  request.addEventListener('error', error);
  request.addEventListener('abort', error);
  request.addEventListener('timeout', error);
  return response;
}

exports.createFromFetch = createFromFetch;
exports.createFromReadableStream = createFromReadableStream;
exports.createFromXHR = createFromXHR;
  })();
}


/***/ }),

/***/ "./node_modules/react-server-dom-webpack/index.js":
/*!********************************************************!*\
  !*** ./node_modules/react-server-dom-webpack/index.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-server-dom-webpack.development.js */ "./node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack.development.js");
}


/***/ }),

/***/ "./node_modules/react-type-animation/dist/esm/index.es.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-type-animation/dist/esm/index.es.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TypeAnimation: () => (/* binding */ m)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function i(e,t,r,n){return new(r||(r=Promise))((function(o,a){function i(e){try{c(n.next(e))}catch(e){a(e)}}function u(e){try{c(n.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,u)}c((n=n.apply(e,t||[])).next())}))}function u(e,t){var r,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function u(a){return function(u){return function(a){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==a[0]&&2!==a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=t.call(e,i)}catch(e){a=[6,e],n=0}finally{r=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,u])}}}function c(e){var t="function"==typeof Symbol&&Symbol.iterator,r=t&&e[t],n=0;if(r)return r.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function l(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,a=r.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=a.return)&&r.call(a)}finally{if(o)throw o.error}}return i}function s(e,t,r){if(r||2===arguments.length)for(var n,o=0,a=t.length;o<a;o++)!n&&o in t||(n||(n=Array.prototype.slice.call(t,0,o)),n[o]=t[o]);return e.concat(n||Array.prototype.slice.call(t))}function f(e,t,r,n,o){for(var a=[],f=5;f<arguments.length;f++)a[f-5]=arguments[f];return i(this,void 0,void 0,(function(){var i,f,h,y,v,b;return u(this,(function(u){switch(u.label){case 0:u.trys.push([0,12,13,14]),i=c(a),f=i.next(),u.label=1;case 1:if(f.done)return[3,11];switch(h=f.value,typeof h){case"string":return[3,2];case"number":return[3,4];case"function":return[3,6]}return[3,8];case 2:return[4,d(e,t,h,r,n,o)];case 3:return u.sent(),[3,10];case 4:return[4,p(h)];case 5:return u.sent(),[3,10];case 6:return[4,h.apply(void 0,s([e,t,r,n,o],l(a),!1))];case 7:return u.sent(),[3,10];case 8:return[4,h];case 9:u.sent(),u.label=10;case 10:return f=i.next(),[3,1];case 11:return[3,14];case 12:return y=u.sent(),v={error:y},[3,14];case 13:try{f&&!f.done&&(b=i.return)&&b.call(i)}finally{if(v)throw v.error}return[7];case 14:return[2]}}))}))}function d(e,t,r,n,o,a){return i(this,void 0,void 0,(function(){var i,c;return u(this,(function(u){switch(u.label){case 0:return i=e.textContent||"",c=function(e,t){var r=l(t).slice(0);return s(s([],l(e),!1),[NaN],!1).findIndex((function(e,t){return r[t]!==e}))}(i,r),[4,h(e,s(s([],l(v(i,t,c)),!1),l(y(r,t,c)),!1),n,o,a)];case 1:return u.sent(),[2]}}))}))}function p(e){return i(this,void 0,void 0,(function(){return u(this,(function(t){switch(t.label){case 0:return[4,new Promise((function(t){return setTimeout(t,e)}))];case 1:return t.sent(),[2]}}))}))}function h(e,t,r,n,o){return i(this,void 0,void 0,(function(){var a,i,s,f,d,h,y,v,b,m,w,g,x;return u(this,(function(S){switch(S.label){case 0:if(a=t,o){for(i=0,s=1;s<t.length;s++)if(f=l([t[s-1],t[s]],2),d=f[0],(h=f[1]).length>d.length||""===h){i=s;break}a=t.slice(i,t.length)}S.label=1;case 1:S.trys.push([1,6,7,8]),y=c(function(e){var t,r,n,o,a,i,l;return u(this,(function(s){switch(s.label){case 0:t=function(e){return u(this,(function(t){switch(t.label){case 0:return[4,{op:function(t){return requestAnimationFrame((function(){return t.textContent=e}))},opCode:function(t){var r=t.textContent||"";return""===e||r.length>e.length?"DELETE":"WRITING"}}];case 1:return t.sent(),[2]}}))},s.label=1;case 1:s.trys.push([1,6,7,8]),r=c(e),n=r.next(),s.label=2;case 2:return n.done?[3,5]:(o=n.value,[5,t(o)]);case 3:s.sent(),s.label=4;case 4:return n=r.next(),[3,2];case 5:return[3,8];case 6:return a=s.sent(),i={error:a},[3,8];case 7:try{n&&!n.done&&(l=r.return)&&l.call(r)}finally{if(i)throw i.error}return[7];case 8:return[2]}}))}(a)),v=y.next(),S.label=2;case 2:return v.done?[3,5]:(b=v.value,m="WRITING"===b.opCode(e)?r+r*(Math.random()-.5):n+n*(Math.random()-.5),b.op(e),[4,p(m)]);case 3:S.sent(),S.label=4;case 4:return v=y.next(),[3,2];case 5:return[3,8];case 6:return w=S.sent(),g={error:w},[3,8];case 7:try{v&&!v.done&&(x=y.return)&&x.call(y)}finally{if(g)throw g.error}return[7];case 8:return[2]}}))}))}function y(e,t,r){var n,o;return void 0===r&&(r=0),u(this,(function(a){switch(a.label){case 0:n=t(e),o=n.length,a.label=1;case 1:return r<o?[4,n.slice(0,++r).join("")]:[3,3];case 2:return a.sent(),[3,1];case 3:return[2]}}))}function v(e,t,r){var n,o;return void 0===r&&(r=0),u(this,(function(a){switch(a.label){case 0:n=t(e),o=n.length,a.label=1;case 1:return o>r?[4,n.slice(0,--o).join("")]:[3,3];case 2:return a.sent(),[3,1];case 3:return[2]}}))}var b="index-module_type__E-SaG";!function(e,t){void 0===t&&(t={});var r=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css","top"===r&&n.firstChild?n.insertBefore(o,n.firstChild):n.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}}(".index-module_type__E-SaG::after {\n  content: '|';\n  animation: index-module_cursor__PQg0P 1.1s infinite step-start;\n}\n\n@keyframes index-module_cursor__PQg0P {\n  50% {\n    opacity: 0;\n  }\n}\n");var m=(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)((0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)((function(o,a){var i=o.sequence,u=o.repeat,c=o.className,d=o.speed,p=void 0===d?40:d,h=o.deletionSpeed,y=o.omitDeletionAnimation,v=void 0!==y&&y,m=o.preRenderFirstString,w=void 0!==m&&m,g=o.wrapper,x=void 0===g?"span":g,S=o.splitter,E=void 0===S?function(e){return s([],l(e),!1)}:S,_=o.cursor,k=void 0===_||_,O=o.style,T=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(n=Object.getOwnPropertySymbols(e);o<n.length;o++)t.indexOf(n[o])<0&&Object.prototype.propertyIsEnumerable.call(e,n[o])&&(r[n[o]]=e[n[o]])}return r}(o,["sequence","repeat","className","speed","deletionSpeed","omitDeletionAnimation","preRenderFirstString","wrapper","splitter","cursor","style"]),A=T["aria-label"],C=T["aria-hidden"],N=T.role;h||(h=p);var P=new Array(2).fill(40);[p,h].forEach((function(e,t){switch(typeof e){case"number":P[t]=Math.abs(e-100);break;case"object":var r=e.type,n=e.value;if("number"!=typeof n)break;if("keyStrokeDelayInMs"===r)P[t]=n}}));var j,I,G,D,M,R,q=P[0],F=P[1],B=function(e,r){void 0===r&&(r=null);var o=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(r);return (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){e&&("function"==typeof e?e(o.current):e.current=o.current)}),[e]),o}(a),Q=b;j=c?"".concat(k?Q+" ":"").concat(c):k?Q:"",I=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)((function(){var e,t=i;u===1/0?e=f:"number"==typeof u&&(t=Array(1+u).fill(i).flat());var r=e?s(s([],l(t),!1),[e],!1):s([],l(t),!1);return f.apply(void 0,s([B.current,E,q,F,v],l(r),!1)),function(){B.current}})),G=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),D=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),M=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(!1),R=l((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0),2)[1],D.current&&(M.current=!0),(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return D.current||(G.current=I.current(),D.current=!0),R((function(e){return e+1})),function(){M.current&&G.current&&G.current()}}),[]);var W=x,L=w?i.find((function(e){return"string"==typeof e}))||"":null;return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(W,{"aria-hidden":C,"aria-label":A,role:N,style:O,className:j,children:A?react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span",{"aria-hidden":"true",ref:B,children:L}):L,ref:A?void 0:B})})),(function(e,t){return!0}));


/***/ }),

/***/ "./node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

var assign = Object.assign;

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            // eslint-disable-next-line react-internal/prod-error-codes
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
    return type;
  }
} // $FlowFixMe only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      {
        checkKeyStringCoercion(maybeKey);
      }

      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */


function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentNameFromType(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentNameFromType(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/*!*******************************************!*\
  !*** ./node_modules/react/jsx-runtime.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "./node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "./src/images/favicon.png":
/*!********************************!*\
  !*** ./src/images/favicon.png ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAA+CAYAAADd977FAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAcDSURBVHgB7Zy7cttGFIZ/AJQdOYWZMt26TCX6CbxOkS4jOl0qw1XSyXkC0VVKyVW6EOnSKX4CwX1mZDWpMua6yiQzGVnjTBTbJJA9AiDCoLC7uBGQjW/mDCkutAT333P2dkgL9TOUNpa2JY3FNowf0whpL+PHY2nP4ufPNPWPYkugOn5BzztQg+9KO5QWVrSZtCkiUS/j4SXX98Rw1CNCnp0gEoen3tPFeyyIhXIwrDbUZVA4oRD0FFE4EpnyUVzXlkFdVM/juM6D1OtC2q3UfQ1jM4Vl/haZ5wIdZwdRz1X1bPIajuIN40o70tSdLU97SJOeSp9pD/qOszaocemmTISoCo0fM5iPOQnhGm2KFsVhUDcQ9aCHqJ8Jmhck6f3TlFFIPDL8f3r/MdYIg1qMGVbjcJ24MBdkjOVUewx9Y+5DH1Z5fN1MU9ceioXoUjDNjRyt4yagFmWW8z8c+gYsykRTZ6PtQRV3QYyEh6hXEIZy0MxQNak5RENM0V6YyuMQ5oKoQtYJqsGhFrv28dRFM72rKgyrvTNPEBfN9uJ9qAWvLXowqEPVBO0yQTcEGWJNXjKFOlS1DcXwqoJMUQ+HivcoteFpZ/5miD5IHo/QPrSF4qMbHCvKtlCCrCC7imt9aR66wTG6geqogKEEdqYCV3HtT+gOPrrBS005Q0HSgqi8Q6A73kHoDrHWhU6QwqQF4YrrfHQLgauBQEEG8SOH2r26FK4Syp7l1MlIUVbKixMPua+4htzSR89lqGZSlQRRKf0UPXlwRVmpJQIJQivO2l3vA4AjP8x7KDnOkSAjzTW9IJeTF+YFKiygSRCuuUagJ4uL/DXbA1RoMxJEt8QX6EnDkL9mIzF8VICmvbpt4toXP1cYhmhDkWVeF9LuoYbwbkO9/ujFWELpT3RKyjKve9Juo6axVuchH7ogNOHZRjResNTr1C60WKYtdh81YhKy2oAaYgfVYIoyjtUzEZZ5zjLlAlHj07qMhGiks9L2Q6gopzf9BOuHo8FkgZIILCc41C5Jxv4z1DzxCTXWBhz6++qS0diyixpyDXQeQpCHrHss4ajuIXTPeeFYYLlhKqCGxfWYJIQTHqKFoUBJZlCrr1vJNwFDlMxA5sY2RpTiqeut9Hk4mjlTH8b1HhrcQ+n0Up0gpStuAA/6hmDxtS7qFyTNCPq220VBaB2imz8zXB0qhYqCULvR+kN1VjRBwXQgEuRUcw3H1UBg/cfMNE65UK9FKIfYOOybeMgdXA18tAdtm6gmPgcwxEQQGsg4uk+bqUEkxmNFOYM6o+eCRBDdtJaj+7R9brMPdTvehwE2ll/MVLGNHh3Ujk8U5RwGE6TkTP2J5roRuu8lAu2j69hcU34hiAc9hefUHyBCU66dbSWCmKT6cFydKXBbCE35TU35O5mLJgfzvZeoqbznlxbER+8lrZP9OoKJl9A+UBcPtboA05TrdkVWBPGhXuAkb1rH5tz7iK6jCk35iiDExOAfaQe4H09W4Zpy7eL1MkFoYLoHPRP0omRR7fsJGOy32Tmvk5IPoGeCXpQEBvU6w4cBA0WZB3WWXsIkvpHv0OxqmaPYzjPDetG108WEafblH64Fa3vuYBhsWGLhBI8++/lTQWW2ppIJoobWQWPKIQx3NAvC47rJGLoJpSy5ivKLg7Pfv/pz+va6PT27YY3/u2Hxs03Lfb258fzXb/4+T3sy/RYSRzSzYgbXivgGPJSHZisk8n2Yr3tu4V0P9ZC/w0plJiHZBA51QkZysojfvv5rL7Cxs3AsSO+wFjI+BQMLCwfSrPD1RvB5ka+FMUQeY7SNjOWvhT7FMn9JVfcoftyOn5usdUTq+d3M30fIj+ke6hGEevW+olwgvq+jb09Y8Gb+nMRYDEIpBglxIQZIHPn8yQDmCCyPK01ykJIMDTdTx0ssU3TSZvL+tCud/HCAUFzLoB5gX6AaHFEbcMU1AqlO8u81bAUbthVIT5ifN34IEiWwrVCKQQLR63eKCJLgxeaieHJYkWuJ5CTOh/kRLUMzWY9Jni+HPoz6yBzrvrkO9taxw7kjvePcIyLvCBzbir2DRLlZRpAELzaOSByaATFURyDyhCKJzC6WyWxj6D2OQg01rslmIIP556L6aBLkZQtefYxTOX5YwYYTkhDzKFxZ6ZAVODgtMoaYMEpZ+pet825eIApBL1AtTzZEu9B9UyfKPcY92DsZngX2iRzEw9g7rLmc48ppr/Sac1GsAKFXtyAqWPyYjCF1sm5BkmNvmrD4MPTkH394tS/HiZ05jR2RV4SRl1hh4ISnAezbVUJWUQSao64prAqBZWcSKMHpR/OJPRjg7TVrJ0i8RHpH6NinwWB+d/LFplinh/TEfH9wxhfXne25HQ4XzuLY+WfTm9yzzqPG/4emiKFwD3r0AAAAAElFTkSuQmCC");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inheritsLoose.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inheritsLoose.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}
module.exports = _inheritsLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/animate/single-value.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animate/single-value.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateSingleValue: () => (/* binding */ animateSingleValue)
/* harmony export */ });
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../value/index.mjs */ "./node_modules/framer-motion/dist/es/value/index.mjs");
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/utils/is-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs");
/* harmony import */ var _interfaces_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../interfaces/motion-value.mjs */ "./node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs");




function animateSingleValue(value, keyframes, options) {
    const motionValue$1 = (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(value) ? value : (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_1__.motionValue)(value);
    motionValue$1.start((0,_interfaces_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__.animateMotionValue)("", motionValue$1, keyframes, options));
    return motionValue$1.animation;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/animators/AcceleratedAnimation.mjs":
/*!*****************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animators/AcceleratedAnimation.mjs ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AcceleratedAnimation: () => (/* binding */ AcceleratedAnimation)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _easing_anticipate_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../easing/anticipate.mjs */ "./node_modules/framer-motion/dist/es/easing/anticipate.mjs");
/* harmony import */ var _easing_back_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../easing/back.mjs */ "./node_modules/framer-motion/dist/es/easing/back.mjs");
/* harmony import */ var _easing_circ_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../easing/circ.mjs */ "./node_modules/framer-motion/dist/es/easing/circ.mjs");
/* harmony import */ var _render_dom_DOMKeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../render/dom/DOMKeyframesResolver.mjs */ "./node_modules/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs");
/* harmony import */ var _BaseAnimation_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./BaseAnimation.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/BaseAnimation.mjs");
/* harmony import */ var _MainThreadAnimation_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainThreadAnimation.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/MainThreadAnimation.mjs");
/* harmony import */ var _utils_accelerated_values_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/accelerated-values.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/utils/accelerated-values.mjs");
/* harmony import */ var _waapi_index_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./waapi/index.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/waapi/index.mjs");
/* harmony import */ var _waapi_utils_get_final_keyframe_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./waapi/utils/get-final-keyframe.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs");
/* harmony import */ var _waapi_utils_supports_waapi_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./waapi/utils/supports-waapi.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/waapi/utils/supports-waapi.mjs");













/**
 * 10ms is chosen here as it strikes a balance between smooth
 * results (more than one keyframe per frame at 60fps) and
 * keyframe quantity.
 */
const sampleDelta = 10; //ms
/**
 * Implement a practical max duration for keyframe generation
 * to prevent infinite loops
 */
const maxDuration = 20000;
/**
 * Check if an animation can run natively via WAAPI or requires pregenerated keyframes.
 * WAAPI doesn't support spring or function easings so we run these as JS animation before
 * handing off.
 */
function requiresPregeneratedKeyframes(options) {
    return ((0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.isGenerator)(options.type) ||
        options.type === "spring" ||
        !(0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.isWaapiSupportedEasing)(options.ease));
}
function pregenerateKeyframes(keyframes, options) {
    /**
     * Create a main-thread animation to pregenerate keyframes.
     * We sample this at regular intervals to generate keyframes that we then
     * linearly interpolate between.
     */
    const sampleAnimation = new _MainThreadAnimation_mjs__WEBPACK_IMPORTED_MODULE_2__.MainThreadAnimation({
        ...options,
        keyframes,
        repeat: 0,
        delay: 0,
        isGenerator: true,
    });
    let state = { done: false, value: keyframes[0] };
    const pregeneratedKeyframes = [];
    /**
     * Bail after 20 seconds of pre-generated keyframes as it's likely
     * we're heading for an infinite loop.
     */
    let t = 0;
    while (!state.done && t < maxDuration) {
        state = sampleAnimation.sample(t);
        pregeneratedKeyframes.push(state.value);
        t += sampleDelta;
    }
    return {
        times: undefined,
        keyframes: pregeneratedKeyframes,
        duration: t - sampleDelta,
        ease: "linear",
    };
}
const unsupportedEasingFunctions = {
    anticipate: _easing_anticipate_mjs__WEBPACK_IMPORTED_MODULE_3__.anticipate,
    backInOut: _easing_back_mjs__WEBPACK_IMPORTED_MODULE_4__.backInOut,
    circInOut: _easing_circ_mjs__WEBPACK_IMPORTED_MODULE_5__.circInOut,
};
function isUnsupportedEase(key) {
    return key in unsupportedEasingFunctions;
}
class AcceleratedAnimation extends _BaseAnimation_mjs__WEBPACK_IMPORTED_MODULE_6__.BaseAnimation {
    constructor(options) {
        super(options);
        const { name, motionValue, element, keyframes } = this.options;
        this.resolver = new _render_dom_DOMKeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_7__.DOMKeyframesResolver(keyframes, (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe), name, motionValue, element);
        this.resolver.scheduleResolve();
    }
    initPlayback(keyframes, finalKeyframe) {
        let { duration = 300, times, ease, type, motionValue, name, startTime, } = this.options;
        /**
         * If element has since been unmounted, return false to indicate
         * the animation failed to initialised.
         */
        if (!motionValue.owner || !motionValue.owner.current) {
            return false;
        }
        /**
         * If the user has provided an easing function name that isn't supported
         * by WAAPI (like "anticipate"), we need to provide the corressponding
         * function. This will later get converted to a linear() easing function.
         */
        if (typeof ease === "string" &&
            (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.supportsLinearEasing)() &&
            isUnsupportedEase(ease)) {
            ease = unsupportedEasingFunctions[ease];
        }
        /**
         * If this animation needs pre-generated keyframes then generate.
         */
        if (requiresPregeneratedKeyframes(this.options)) {
            const { onComplete, onUpdate, motionValue, element, ...options } = this.options;
            const pregeneratedAnimation = pregenerateKeyframes(keyframes, options);
            keyframes = pregeneratedAnimation.keyframes;
            // If this is a very short animation, ensure we have
            // at least two keyframes to animate between as older browsers
            // can't animate between a single keyframe.
            if (keyframes.length === 1) {
                keyframes[1] = keyframes[0];
            }
            duration = pregeneratedAnimation.duration;
            times = pregeneratedAnimation.times;
            ease = pregeneratedAnimation.ease;
            type = "keyframes";
        }
        const animation = (0,_waapi_index_mjs__WEBPACK_IMPORTED_MODULE_8__.startWaapiAnimation)(motionValue.owner.current, name, keyframes, { ...this.options, duration, times, ease });
        // Override the browser calculated startTime with one synchronised to other JS
        // and WAAPI animations starting this event loop.
        animation.startTime = startTime !== null && startTime !== void 0 ? startTime : this.calcStartTime();
        if (this.pendingTimeline) {
            (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.attachTimeline)(animation, this.pendingTimeline);
            this.pendingTimeline = undefined;
        }
        else {
            /**
             * Prefer the `onfinish` prop as it's more widely supported than
             * the `finished` promise.
             *
             * Here, we synchronously set the provided MotionValue to the end
             * keyframe. If we didn't, when the WAAPI animation is finished it would
             * be removed from the element which would then revert to its old styles.
             */
            animation.onfinish = () => {
                const { onComplete } = this.options;
                motionValue.set((0,_waapi_utils_get_final_keyframe_mjs__WEBPACK_IMPORTED_MODULE_9__.getFinalKeyframe)(keyframes, this.options, finalKeyframe));
                onComplete && onComplete();
                this.cancel();
                this.resolveFinishedPromise();
            };
        }
        return {
            animation,
            duration,
            times,
            type,
            ease,
            keyframes: keyframes,
        };
    }
    get duration() {
        const { resolved } = this;
        if (!resolved)
            return 0;
        const { duration } = resolved;
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.millisecondsToSeconds)(duration);
    }
    get time() {
        const { resolved } = this;
        if (!resolved)
            return 0;
        const { animation } = resolved;
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.millisecondsToSeconds)(animation.currentTime || 0);
    }
    set time(newTime) {
        const { resolved } = this;
        if (!resolved)
            return;
        const { animation } = resolved;
        animation.currentTime = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToMilliseconds)(newTime);
    }
    get speed() {
        const { resolved } = this;
        if (!resolved)
            return 1;
        const { animation } = resolved;
        return animation.playbackRate;
    }
    set speed(newSpeed) {
        const { resolved } = this;
        if (!resolved)
            return;
        const { animation } = resolved;
        animation.playbackRate = newSpeed;
    }
    get state() {
        const { resolved } = this;
        if (!resolved)
            return "idle";
        const { animation } = resolved;
        return animation.playState;
    }
    get startTime() {
        const { resolved } = this;
        if (!resolved)
            return null;
        const { animation } = resolved;
        // Coerce to number as TypeScript incorrectly types this
        // as CSSNumberish
        return animation.startTime;
    }
    /**
     * Replace the default DocumentTimeline with another AnimationTimeline.
     * Currently used for scroll animations.
     */
    attachTimeline(timeline) {
        if (!this._resolved) {
            this.pendingTimeline = timeline;
        }
        else {
            const { resolved } = this;
            if (!resolved)
                return motion_utils__WEBPACK_IMPORTED_MODULE_1__.noop;
            const { animation } = resolved;
            (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.attachTimeline)(animation, timeline);
        }
        return motion_utils__WEBPACK_IMPORTED_MODULE_1__.noop;
    }
    play() {
        if (this.isStopped)
            return;
        const { resolved } = this;
        if (!resolved)
            return;
        const { animation } = resolved;
        if (animation.playState === "finished") {
            this.updateFinishedPromise();
        }
        animation.play();
    }
    pause() {
        const { resolved } = this;
        if (!resolved)
            return;
        const { animation } = resolved;
        animation.pause();
    }
    stop() {
        this.resolver.cancel();
        this.isStopped = true;
        if (this.state === "idle")
            return;
        this.resolveFinishedPromise();
        this.updateFinishedPromise();
        const { resolved } = this;
        if (!resolved)
            return;
        const { animation, keyframes, duration, type, ease, times } = resolved;
        if (animation.playState === "idle" ||
            animation.playState === "finished") {
            return;
        }
        /**
         * WAAPI doesn't natively have any interruption capabilities.
         *
         * Rather than read commited styles back out of the DOM, we can
         * create a renderless JS animation and sample it twice to calculate
         * its current value, "previous" value, and therefore allow
         * Motion to calculate velocity for any subsequent animation.
         */
        if (this.time) {
            const { motionValue, onUpdate, onComplete, element, ...options } = this.options;
            const sampleAnimation = new _MainThreadAnimation_mjs__WEBPACK_IMPORTED_MODULE_2__.MainThreadAnimation({
                ...options,
                keyframes,
                duration,
                type,
                ease,
                times,
                isGenerator: true,
            });
            const sampleTime = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToMilliseconds)(this.time);
            motionValue.setWithVelocity(sampleAnimation.sample(sampleTime - sampleDelta).value, sampleAnimation.sample(sampleTime).value, sampleDelta);
        }
        const { onStop } = this.options;
        onStop && onStop();
        this.cancel();
    }
    complete() {
        const { resolved } = this;
        if (!resolved)
            return;
        resolved.animation.finish();
    }
    cancel() {
        const { resolved } = this;
        if (!resolved)
            return;
        resolved.animation.cancel();
    }
    static supports(options) {
        const { motionValue, name, repeatDelay, repeatType, damping, type } = options;
        if (!motionValue ||
            !motionValue.owner ||
            !(motionValue.owner.current instanceof HTMLElement)) {
            return false;
        }
        const { onUpdate, transformTemplate } = motionValue.owner.getProps();
        return ((0,_waapi_utils_supports_waapi_mjs__WEBPACK_IMPORTED_MODULE_10__.supportsWaapi)() &&
            name &&
            _utils_accelerated_values_mjs__WEBPACK_IMPORTED_MODULE_11__.acceleratedValues.has(name) &&
            /**
             * If we're outputting values to onUpdate then we can't use WAAPI as there's
             * no way to read the value from WAAPI every frame.
             */
            !onUpdate &&
            !transformTemplate &&
            !repeatDelay &&
            repeatType !== "mirror" &&
            damping !== 0 &&
            type !== "inertia");
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/animators/BaseAnimation.mjs":
/*!**********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animators/BaseAnimation.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseAnimation: () => (/* binding */ BaseAnimation)
/* harmony export */ });
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../frameloop/sync-time.mjs */ "./node_modules/framer-motion/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _render_utils_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../render/utils/KeyframesResolver.mjs */ "./node_modules/framer-motion/dist/es/render/utils/KeyframesResolver.mjs");
/* harmony import */ var _utils_use_instant_transition_state_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/use-instant-transition-state.mjs */ "./node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs");
/* harmony import */ var _utils_can_animate_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/can-animate.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/utils/can-animate.mjs");
/* harmony import */ var _waapi_utils_get_final_keyframe_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./waapi/utils/get-final-keyframe.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs");






/**
 * Maximum time allowed between an animation being created and it being
 * resolved for us to use the latter as the start time.
 *
 * This is to ensure that while we prefer to "start" an animation as soon
 * as it's triggered, we also want to avoid a visual jump if there's a big delay
 * between these two moments.
 */
const MAX_RESOLVE_DELAY = 40;
class BaseAnimation {
    constructor({ autoplay = true, delay = 0, type = "keyframes", repeat = 0, repeatDelay = 0, repeatType = "loop", ...options }) {
        // Track whether the animation has been stopped. Stopped animations won't restart.
        this.isStopped = false;
        this.hasAttemptedResolve = false;
        this.createdAt = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__.time.now();
        this.options = {
            autoplay,
            delay,
            type,
            repeat,
            repeatDelay,
            repeatType,
            ...options,
        };
        this.updateFinishedPromise();
    }
    /**
     * This method uses the createdAt and resolvedAt to calculate the
     * animation startTime. *Ideally*, we would use the createdAt time as t=0
     * as the following frame would then be the first frame of the animation in
     * progress, which would feel snappier.
     *
     * However, if there's a delay (main thread work) between the creation of
     * the animation and the first commited frame, we prefer to use resolvedAt
     * to avoid a sudden jump into the animation.
     */
    calcStartTime() {
        if (!this.resolvedAt)
            return this.createdAt;
        return this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY
            ? this.resolvedAt
            : this.createdAt;
    }
    /**
     * A getter for resolved data. If keyframes are not yet resolved, accessing
     * this.resolved will synchronously flush all pending keyframe resolvers.
     * This is a deoptimisation, but at its worst still batches read/writes.
     */
    get resolved() {
        if (!this._resolved && !this.hasAttemptedResolve) {
            (0,_render_utils_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_1__.flushKeyframeResolvers)();
        }
        return this._resolved;
    }
    /**
     * A method to be called when the keyframes resolver completes. This method
     * will check if its possible to run the animation and, if not, skip it.
     * Otherwise, it will call initPlayback on the implementing class.
     */
    onKeyframesResolved(keyframes, finalKeyframe) {
        this.resolvedAt = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__.time.now();
        this.hasAttemptedResolve = true;
        const { name, type, velocity, delay, onComplete, onUpdate, isGenerator, } = this.options;
        /**
         * If we can't animate this value with the resolved keyframes
         * then we should complete it immediately.
         */
        if (!isGenerator && !(0,_utils_can_animate_mjs__WEBPACK_IMPORTED_MODULE_2__.canAnimate)(keyframes, name, type, velocity)) {
            // Finish immediately
            if (_utils_use_instant_transition_state_mjs__WEBPACK_IMPORTED_MODULE_3__.instantAnimationState.current || !delay) {
                onUpdate &&
                    onUpdate((0,_waapi_utils_get_final_keyframe_mjs__WEBPACK_IMPORTED_MODULE_4__.getFinalKeyframe)(keyframes, this.options, finalKeyframe));
                onComplete && onComplete();
                this.resolveFinishedPromise();
                return;
            }
            // Finish after a delay
            else {
                this.options.duration = 0;
            }
        }
        const resolvedAnimation = this.initPlayback(keyframes, finalKeyframe);
        if (resolvedAnimation === false)
            return;
        this._resolved = {
            keyframes,
            finalKeyframe,
            ...resolvedAnimation,
        };
        this.onPostResolved();
    }
    onPostResolved() { }
    /**
     * Allows the returned animation to be awaited or promise-chained. Currently
     * resolves when the animation finishes at all but in a future update could/should
     * reject if its cancels.
     */
    then(resolve, reject) {
        return this.currentFinishedPromise.then(resolve, reject);
    }
    flatten() {
        this.options.type = "keyframes";
        this.options.ease = "linear";
    }
    updateFinishedPromise() {
        this.currentFinishedPromise = new Promise((resolve) => {
            this.resolveFinishedPromise = resolve;
        });
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/animators/MainThreadAnimation.mjs":
/*!****************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animators/MainThreadAnimation.mjs ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MainThreadAnimation: () => (/* binding */ MainThreadAnimation),
/* harmony export */   animateValue: () => (/* binding */ animateValue)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _render_utils_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../render/utils/KeyframesResolver.mjs */ "./node_modules/framer-motion/dist/es/render/utils/KeyframesResolver.mjs");
/* harmony import */ var _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../stats/animation-count.mjs */ "./node_modules/framer-motion/dist/es/stats/animation-count.mjs");
/* harmony import */ var _utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/clamp.mjs */ "./node_modules/framer-motion/dist/es/utils/clamp.mjs");
/* harmony import */ var _utils_mix_index_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/mix/index.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/index.mjs");
/* harmony import */ var _utils_pipe_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/pipe.mjs */ "./node_modules/framer-motion/dist/es/utils/pipe.mjs");
/* harmony import */ var _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../generators/inertia.mjs */ "./node_modules/framer-motion/dist/es/animation/generators/inertia.mjs");
/* harmony import */ var _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../generators/keyframes.mjs */ "./node_modules/framer-motion/dist/es/animation/generators/keyframes.mjs");
/* harmony import */ var _generators_spring_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../generators/spring/index.mjs */ "./node_modules/framer-motion/dist/es/animation/generators/spring/index.mjs");
/* harmony import */ var _BaseAnimation_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./BaseAnimation.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/BaseAnimation.mjs");
/* harmony import */ var _drivers_driver_frameloop_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./drivers/driver-frameloop.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/drivers/driver-frameloop.mjs");
/* harmony import */ var _waapi_utils_get_final_keyframe_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./waapi/utils/get-final-keyframe.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs");














const generators = {
    decay: _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_2__.inertia,
    inertia: _generators_inertia_mjs__WEBPACK_IMPORTED_MODULE_2__.inertia,
    tween: _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_3__.keyframes,
    keyframes: _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_3__.keyframes,
    spring: _generators_spring_index_mjs__WEBPACK_IMPORTED_MODULE_4__.spring,
};
const percentToProgress = (percent) => percent / 100;
/**
 * Animation that runs on the main thread. Designed to be WAAPI-spec in the subset of
 * features we expose publically. Mostly the compatibility is to ensure visual identity
 * between both WAAPI and main thread animations.
 */
class MainThreadAnimation extends _BaseAnimation_mjs__WEBPACK_IMPORTED_MODULE_5__.BaseAnimation {
    constructor(options) {
        super(options);
        /**
         * The time at which the animation was paused.
         */
        this.holdTime = null;
        /**
         * The time at which the animation was cancelled.
         */
        this.cancelTime = null;
        /**
         * The current time of the animation.
         */
        this.currentTime = 0;
        /**
         * Playback speed as a factor. 0 would be stopped, -1 reverse and 2 double speed.
         */
        this.playbackSpeed = 1;
        /**
         * The state of the animation to apply when the animation is resolved. This
         * allows calls to the public API to control the animation before it is resolved,
         * without us having to resolve it first.
         */
        this.pendingPlayState = "running";
        /**
         * The time at which the animation was started.
         */
        this.startTime = null;
        this.state = "idle";
        /**
         * This method is bound to the instance to fix a pattern where
         * animation.stop is returned as a reference from a useEffect.
         */
        this.stop = () => {
            this.resolver.cancel();
            this.isStopped = true;
            if (this.state === "idle")
                return;
            this.teardown();
            const { onStop } = this.options;
            onStop && onStop();
        };
        const { name, motionValue, element, keyframes } = this.options;
        const KeyframeResolver$1 = (element === null || element === void 0 ? void 0 : element.KeyframeResolver) || _render_utils_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_6__.KeyframeResolver;
        const onResolved = (resolvedKeyframes, finalKeyframe) => this.onKeyframesResolved(resolvedKeyframes, finalKeyframe);
        this.resolver = new KeyframeResolver$1(keyframes, onResolved, name, motionValue, element);
        this.resolver.scheduleResolve();
    }
    flatten() {
        super.flatten();
        // If we've already resolved the animation, re-initialise it
        if (this._resolved) {
            Object.assign(this._resolved, this.initPlayback(this._resolved.keyframes));
        }
    }
    initPlayback(keyframes$1) {
        const { type = "keyframes", repeat = 0, repeatDelay = 0, repeatType, velocity = 0, } = this.options;
        const generatorFactory = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.isGenerator)(type)
            ? type
            : generators[type] || _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_3__.keyframes;
        /**
         * If our generator doesn't support mixing numbers, we need to replace keyframes with
         * [0, 100] and then make a function that maps that to the actual keyframes.
         *
         * 100 is chosen instead of 1 as it works nicer with spring animations.
         */
        let mapPercentToKeyframes;
        let mirroredGenerator;
        if ( true &&
            generatorFactory !== _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_3__.keyframes) {
            (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.invariant)(keyframes$1.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${keyframes$1}`);
        }
        if (generatorFactory !== _generators_keyframes_mjs__WEBPACK_IMPORTED_MODULE_3__.keyframes &&
            typeof keyframes$1[0] !== "number") {
            mapPercentToKeyframes = (0,_utils_pipe_mjs__WEBPACK_IMPORTED_MODULE_7__.pipe)(percentToProgress, (0,_utils_mix_index_mjs__WEBPACK_IMPORTED_MODULE_8__.mix)(keyframes$1[0], keyframes$1[1]));
            keyframes$1 = [0, 100];
        }
        const generator = generatorFactory({ ...this.options, keyframes: keyframes$1 });
        /**
         * If we have a mirror repeat type we need to create a second generator that outputs the
         * mirrored (not reversed) animation and later ping pong between the two generators.
         */
        if (repeatType === "mirror") {
            mirroredGenerator = generatorFactory({
                ...this.options,
                keyframes: [...keyframes$1].reverse(),
                velocity: -velocity,
            });
        }
        /**
         * If duration is undefined and we have repeat options,
         * we need to calculate a duration from the generator.
         *
         * We set it to the generator itself to cache the duration.
         * Any timeline resolver will need to have already precalculated
         * the duration by this step.
         */
        if (generator.calculatedDuration === null) {
            generator.calculatedDuration = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.calcGeneratorDuration)(generator);
        }
        const { calculatedDuration } = generator;
        const resolvedDuration = calculatedDuration + repeatDelay;
        const totalDuration = resolvedDuration * (repeat + 1) - repeatDelay;
        return {
            generator,
            mirroredGenerator,
            mapPercentToKeyframes,
            calculatedDuration,
            resolvedDuration,
            totalDuration,
        };
    }
    onPostResolved() {
        const { autoplay = true } = this.options;
        _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_9__.activeAnimations.mainThread++;
        this.play();
        if (this.pendingPlayState === "paused" || !autoplay) {
            this.pause();
        }
        else {
            this.state = this.pendingPlayState;
        }
    }
    tick(timestamp, sample = false) {
        const { resolved } = this;
        // If the animations has failed to resolve, return the final keyframe.
        if (!resolved) {
            const { keyframes } = this.options;
            return { done: true, value: keyframes[keyframes.length - 1] };
        }
        const { finalKeyframe, generator, mirroredGenerator, mapPercentToKeyframes, keyframes, calculatedDuration, totalDuration, resolvedDuration, } = resolved;
        if (this.startTime === null)
            return generator.next(0);
        const { delay, repeat, repeatType, repeatDelay, onUpdate } = this.options;
        /**
         * requestAnimationFrame timestamps can come through as lower than
         * the startTime as set by performance.now(). Here we prevent this,
         * though in the future it could be possible to make setting startTime
         * a pending operation that gets resolved here.
         */
        if (this.speed > 0) {
            this.startTime = Math.min(this.startTime, timestamp);
        }
        else if (this.speed < 0) {
            this.startTime = Math.min(timestamp - totalDuration / this.speed, this.startTime);
        }
        // Update currentTime
        if (sample) {
            this.currentTime = timestamp;
        }
        else if (this.holdTime !== null) {
            this.currentTime = this.holdTime;
        }
        else {
            // Rounding the time because floating point arithmetic is not always accurate, e.g. 3000.367 - 1000.367 =
            // 2000.0000000000002. This is a problem when we are comparing the currentTime with the duration, for
            // example.
            this.currentTime =
                Math.round(timestamp - this.startTime) * this.speed;
        }
        // Rebase on delay
        const timeWithoutDelay = this.currentTime - delay * (this.speed >= 0 ? 1 : -1);
        const isInDelayPhase = this.speed >= 0
            ? timeWithoutDelay < 0
            : timeWithoutDelay > totalDuration;
        this.currentTime = Math.max(timeWithoutDelay, 0);
        // If this animation has finished, set the current time  to the total duration.
        if (this.state === "finished" && this.holdTime === null) {
            this.currentTime = totalDuration;
        }
        let elapsed = this.currentTime;
        let frameGenerator = generator;
        if (repeat) {
            /**
             * Get the current progress (0-1) of the animation. If t is >
             * than duration we'll get values like 2.5 (midway through the
             * third iteration)
             */
            const progress = Math.min(this.currentTime, totalDuration) / resolvedDuration;
            /**
             * Get the current iteration (0 indexed). For instance the floor of
             * 2.5 is 2.
             */
            let currentIteration = Math.floor(progress);
            /**
             * Get the current progress of the iteration by taking the remainder
             * so 2.5 is 0.5 through iteration 2
             */
            let iterationProgress = progress % 1.0;
            /**
             * If iteration progress is 1 we count that as the end
             * of the previous iteration.
             */
            if (!iterationProgress && progress >= 1) {
                iterationProgress = 1;
            }
            iterationProgress === 1 && currentIteration--;
            currentIteration = Math.min(currentIteration, repeat + 1);
            /**
             * Reverse progress if we're not running in "normal" direction
             */
            const isOddIteration = Boolean(currentIteration % 2);
            if (isOddIteration) {
                if (repeatType === "reverse") {
                    iterationProgress = 1 - iterationProgress;
                    if (repeatDelay) {
                        iterationProgress -= repeatDelay / resolvedDuration;
                    }
                }
                else if (repeatType === "mirror") {
                    frameGenerator = mirroredGenerator;
                }
            }
            elapsed = (0,_utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_10__.clamp)(0, 1, iterationProgress) * resolvedDuration;
        }
        /**
         * If we're in negative time, set state as the initial keyframe.
         * This prevents delay: x, duration: 0 animations from finishing
         * instantly.
         */
        const state = isInDelayPhase
            ? { done: false, value: keyframes[0] }
            : frameGenerator.next(elapsed);
        if (mapPercentToKeyframes) {
            state.value = mapPercentToKeyframes(state.value);
        }
        let { done } = state;
        if (!isInDelayPhase && calculatedDuration !== null) {
            done =
                this.speed >= 0
                    ? this.currentTime >= totalDuration
                    : this.currentTime <= 0;
        }
        const isAnimationFinished = this.holdTime === null &&
            (this.state === "finished" || (this.state === "running" && done));
        if (isAnimationFinished && finalKeyframe !== undefined) {
            state.value = (0,_waapi_utils_get_final_keyframe_mjs__WEBPACK_IMPORTED_MODULE_11__.getFinalKeyframe)(keyframes, this.options, finalKeyframe);
        }
        if (onUpdate) {
            onUpdate(state.value);
        }
        if (isAnimationFinished) {
            this.finish();
        }
        return state;
    }
    get duration() {
        const { resolved } = this;
        return resolved ? (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.millisecondsToSeconds)(resolved.calculatedDuration) : 0;
    }
    get time() {
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.millisecondsToSeconds)(this.currentTime);
    }
    set time(newTime) {
        newTime = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToMilliseconds)(newTime);
        this.currentTime = newTime;
        if (this.holdTime !== null || this.speed === 0) {
            this.holdTime = newTime;
        }
        else if (this.driver) {
            this.startTime = this.driver.now() - newTime / this.speed;
        }
    }
    get speed() {
        return this.playbackSpeed;
    }
    set speed(newSpeed) {
        const hasChanged = this.playbackSpeed !== newSpeed;
        this.playbackSpeed = newSpeed;
        if (hasChanged) {
            this.time = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.millisecondsToSeconds)(this.currentTime);
        }
    }
    play() {
        if (!this.resolver.isScheduled) {
            this.resolver.resume();
        }
        if (!this._resolved) {
            this.pendingPlayState = "running";
            return;
        }
        if (this.isStopped)
            return;
        const { driver = _drivers_driver_frameloop_mjs__WEBPACK_IMPORTED_MODULE_12__.frameloopDriver, onPlay, startTime } = this.options;
        if (!this.driver) {
            this.driver = driver((timestamp) => this.tick(timestamp));
        }
        onPlay && onPlay();
        const now = this.driver.now();
        if (this.holdTime !== null) {
            this.startTime = now - this.holdTime;
        }
        else if (!this.startTime) {
            this.startTime = startTime !== null && startTime !== void 0 ? startTime : this.calcStartTime();
        }
        else if (this.state === "finished") {
            this.startTime = now;
        }
        if (this.state === "finished") {
            this.updateFinishedPromise();
        }
        this.cancelTime = this.startTime;
        this.holdTime = null;
        /**
         * Set playState to running only after we've used it in
         * the previous logic.
         */
        this.state = "running";
        this.driver.start();
    }
    pause() {
        var _a;
        if (!this._resolved) {
            this.pendingPlayState = "paused";
            return;
        }
        this.state = "paused";
        this.holdTime = (_a = this.currentTime) !== null && _a !== void 0 ? _a : 0;
    }
    complete() {
        if (this.state !== "running") {
            this.play();
        }
        this.pendingPlayState = this.state = "finished";
        this.holdTime = null;
    }
    finish() {
        this.teardown();
        this.state = "finished";
        const { onComplete } = this.options;
        onComplete && onComplete();
    }
    cancel() {
        if (this.cancelTime !== null) {
            this.tick(this.cancelTime);
        }
        this.teardown();
        this.updateFinishedPromise();
    }
    teardown() {
        this.state = "idle";
        this.stopDriver();
        this.resolveFinishedPromise();
        this.updateFinishedPromise();
        this.startTime = this.cancelTime = null;
        this.resolver.cancel();
        _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_9__.activeAnimations.mainThread--;
    }
    stopDriver() {
        if (!this.driver)
            return;
        this.driver.stop();
        this.driver = undefined;
    }
    sample(time) {
        this.startTime = 0;
        return this.tick(time, true);
    }
}
// Legacy interface
function animateValue(options) {
    return new MainThreadAnimation(options);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/animators/drivers/driver-frameloop.mjs":
/*!*********************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animators/drivers/driver-frameloop.mjs ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   frameloopDriver: () => (/* binding */ frameloopDriver)
/* harmony export */ });
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../frameloop/sync-time.mjs */ "./node_modules/framer-motion/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");



const frameloopDriver = (update) => {
    const passTimestamp = ({ timestamp }) => update(timestamp);
    return {
        start: () => _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_0__.frame.update(passTimestamp, true),
        stop: () => (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_0__.cancelFrame)(passTimestamp),
        /**
         * If we're processing this frame we can use the
         * framelocked timestamp to keep things in sync.
         */
        now: () => (_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_0__.frameData.isProcessing ? _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_0__.frameData.timestamp : _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__.time.now()),
    };
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/animators/utils/accelerated-values.mjs":
/*!*********************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animators/utils/accelerated-values.mjs ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   acceleratedValues: () => (/* binding */ acceleratedValues)
/* harmony export */ });
/**
 * A list of values that can be hardware-accelerated.
 */
const acceleratedValues = new Set([
    "opacity",
    "clipPath",
    "filter",
    "transform",
    // TODO: Can be accelerated but currently disabled until https://issues.chromium.org/issues/41491098 is resolved
    // or until we implement support for linear() easing.
    // "background-color"
]);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/animators/utils/can-animate.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animators/utils/can-animate.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canAnimate: () => (/* binding */ canAnimate)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _utils_is_animatable_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/is-animatable.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs");




function hasKeyframesChanged(keyframes) {
    const current = keyframes[0];
    if (keyframes.length === 1)
        return true;
    for (let i = 0; i < keyframes.length; i++) {
        if (keyframes[i] !== current)
            return true;
    }
}
function canAnimate(keyframes, name, type, velocity) {
    /**
     * Check if we're able to animate between the start and end keyframes,
     * and throw a warning if we're attempting to animate between one that's
     * animatable and another that isn't.
     */
    const originKeyframe = keyframes[0];
    if (originKeyframe === null)
        return false;
    /**
     * These aren't traditionally animatable but we do support them.
     * In future we could look into making this more generic or replacing
     * this function with mix() === mixImmediate
     */
    if (name === "display" || name === "visibility")
        return true;
    const targetKeyframe = keyframes[keyframes.length - 1];
    const isOriginAnimatable = (0,_utils_is_animatable_mjs__WEBPACK_IMPORTED_MODULE_2__.isAnimatable)(originKeyframe, name);
    const isTargetAnimatable = (0,_utils_is_animatable_mjs__WEBPACK_IMPORTED_MODULE_2__.isAnimatable)(targetKeyframe, name);
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.warning)(isOriginAnimatable === isTargetAnimatable, `You are trying to animate ${name} from "${originKeyframe}" to "${targetKeyframe}". ${originKeyframe} is not an animatable value - to enable this animation set ${originKeyframe} to a value animatable to ${targetKeyframe} via the \`style\` property.`);
    // Always skip if any of these are true
    if (!isOriginAnimatable || !isTargetAnimatable) {
        return false;
    }
    return (hasKeyframesChanged(keyframes) ||
        ((type === "spring" || (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.isGenerator)(type)) && velocity));
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/animators/waapi/index.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animators/waapi/index.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startWaapiAnimation: () => (/* binding */ startWaapiAnimation)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../stats/animation-count.mjs */ "./node_modules/framer-motion/dist/es/stats/animation-count.mjs");
/* harmony import */ var _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../stats/buffer.mjs */ "./node_modules/framer-motion/dist/es/stats/buffer.mjs");




function startWaapiAnimation(element, valueName, keyframes, { delay = 0, duration = 300, repeat = 0, repeatType = "loop", ease = "easeInOut", times, } = {}) {
    const keyframeOptions = { [valueName]: keyframes };
    if (times)
        keyframeOptions.offset = times;
    const easing = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.mapEasingToNativeEasing)(ease, duration);
    /**
     * If this is an easing array, apply to keyframes, not animation as a whole
     */
    if (Array.isArray(easing))
        keyframeOptions.easing = easing;
    if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_1__.statsBuffer.value) {
        _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_2__.activeAnimations.waapi++;
    }
    const animation = element.animate(keyframeOptions, {
        delay,
        duration,
        easing: !Array.isArray(easing) ? easing : "linear",
        fill: "both",
        iterations: repeat + 1,
        direction: repeatType === "reverse" ? "alternate" : "normal",
    });
    if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_1__.statsBuffer.value) {
        animation.finished.finally(() => {
            _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_2__.activeAnimations.waapi--;
        });
    }
    return animation;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs":
/*!***************************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFinalKeyframe: () => (/* binding */ getFinalKeyframe)
/* harmony export */ });
const isNotNull = (value) => value !== null;
function getFinalKeyframe(keyframes, { repeat, repeatType = "loop" }, finalKeyframe) {
    const resolvedKeyframes = keyframes.filter(isNotNull);
    const index = repeat && repeatType !== "loop" && repeat % 2 === 1
        ? 0
        : resolvedKeyframes.length - 1;
    return !index || finalKeyframe === undefined
        ? resolvedKeyframes[index]
        : finalKeyframe;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/animators/waapi/utils/supports-waapi.mjs":
/*!***********************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/animators/waapi/utils/supports-waapi.mjs ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supportsWaapi: () => (/* binding */ supportsWaapi)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");


const supportsWaapi = /*@__PURE__*/ (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.memo)(() => Object.hasOwnProperty.call(Element.prototype, "animate"));




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/generators/inertia.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/generators/inertia.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   inertia: () => (/* binding */ inertia)
/* harmony export */ });
/* harmony import */ var _spring_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./spring/index.mjs */ "./node_modules/framer-motion/dist/es/animation/generators/spring/index.mjs");
/* harmony import */ var _utils_velocity_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/velocity.mjs */ "./node_modules/framer-motion/dist/es/animation/generators/utils/velocity.mjs");



function inertia({ keyframes, velocity = 0.0, power = 0.8, timeConstant = 325, bounceDamping = 10, bounceStiffness = 500, modifyTarget, min, max, restDelta = 0.5, restSpeed, }) {
    const origin = keyframes[0];
    const state = {
        done: false,
        value: origin,
    };
    const isOutOfBounds = (v) => (min !== undefined && v < min) || (max !== undefined && v > max);
    const nearestBoundary = (v) => {
        if (min === undefined)
            return max;
        if (max === undefined)
            return min;
        return Math.abs(min - v) < Math.abs(max - v) ? min : max;
    };
    let amplitude = power * velocity;
    const ideal = origin + amplitude;
    const target = modifyTarget === undefined ? ideal : modifyTarget(ideal);
    /**
     * If the target has changed we need to re-calculate the amplitude, otherwise
     * the animation will start from the wrong position.
     */
    if (target !== ideal)
        amplitude = target - origin;
    const calcDelta = (t) => -amplitude * Math.exp(-t / timeConstant);
    const calcLatest = (t) => target + calcDelta(t);
    const applyFriction = (t) => {
        const delta = calcDelta(t);
        const latest = calcLatest(t);
        state.done = Math.abs(delta) <= restDelta;
        state.value = state.done ? target : latest;
    };
    /**
     * Ideally this would resolve for t in a stateless way, we could
     * do that by always precalculating the animation but as we know
     * this will be done anyway we can assume that spring will
     * be discovered during that.
     */
    let timeReachedBoundary;
    let spring$1;
    const checkCatchBoundary = (t) => {
        if (!isOutOfBounds(state.value))
            return;
        timeReachedBoundary = t;
        spring$1 = (0,_spring_index_mjs__WEBPACK_IMPORTED_MODULE_0__.spring)({
            keyframes: [state.value, nearestBoundary(state.value)],
            velocity: (0,_utils_velocity_mjs__WEBPACK_IMPORTED_MODULE_1__.calcGeneratorVelocity)(calcLatest, t, state.value), // TODO: This should be passing * 1000
            damping: bounceDamping,
            stiffness: bounceStiffness,
            restDelta,
            restSpeed,
        });
    };
    checkCatchBoundary(0);
    return {
        calculatedDuration: null,
        next: (t) => {
            /**
             * We need to resolve the friction to figure out if we need a
             * spring but we don't want to do this twice per frame. So here
             * we flag if we updated for this frame and later if we did
             * we can skip doing it again.
             */
            let hasUpdatedFrame = false;
            if (!spring$1 && timeReachedBoundary === undefined) {
                hasUpdatedFrame = true;
                applyFriction(t);
                checkCatchBoundary(t);
            }
            /**
             * If we have a spring and the provided t is beyond the moment the friction
             * animation crossed the min/max boundary, use the spring.
             */
            if (timeReachedBoundary !== undefined && t >= timeReachedBoundary) {
                return spring$1.next(t - timeReachedBoundary);
            }
            else {
                !hasUpdatedFrame && applyFriction(t);
                return state;
            }
        },
    };
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/generators/keyframes.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/generators/keyframes.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultEasing: () => (/* binding */ defaultEasing),
/* harmony export */   keyframes: () => (/* binding */ keyframes)
/* harmony export */ });
/* harmony import */ var _easing_ease_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../easing/ease.mjs */ "./node_modules/framer-motion/dist/es/easing/ease.mjs");
/* harmony import */ var _easing_utils_is_easing_array_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../easing/utils/is-easing-array.mjs */ "./node_modules/framer-motion/dist/es/easing/utils/is-easing-array.mjs");
/* harmony import */ var _easing_utils_map_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../easing/utils/map.mjs */ "./node_modules/framer-motion/dist/es/easing/utils/map.mjs");
/* harmony import */ var _utils_interpolate_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/interpolate.mjs */ "./node_modules/framer-motion/dist/es/utils/interpolate.mjs");
/* harmony import */ var _utils_offsets_default_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/offsets/default.mjs */ "./node_modules/framer-motion/dist/es/utils/offsets/default.mjs");
/* harmony import */ var _utils_offsets_time_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/offsets/time.mjs */ "./node_modules/framer-motion/dist/es/utils/offsets/time.mjs");







function defaultEasing(values, easing) {
    return values.map(() => easing || _easing_ease_mjs__WEBPACK_IMPORTED_MODULE_0__.easeInOut).splice(0, values.length - 1);
}
function keyframes({ duration = 300, keyframes: keyframeValues, times, ease = "easeInOut", }) {
    /**
     * Easing functions can be externally defined as strings. Here we convert them
     * into actual functions.
     */
    const easingFunctions = (0,_easing_utils_is_easing_array_mjs__WEBPACK_IMPORTED_MODULE_1__.isEasingArray)(ease)
        ? ease.map(_easing_utils_map_mjs__WEBPACK_IMPORTED_MODULE_2__.easingDefinitionToFunction)
        : (0,_easing_utils_map_mjs__WEBPACK_IMPORTED_MODULE_2__.easingDefinitionToFunction)(ease);
    /**
     * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
     * to reduce GC during animation.
     */
    const state = {
        done: false,
        value: keyframeValues[0],
    };
    /**
     * Create a times array based on the provided 0-1 offsets
     */
    const absoluteTimes = (0,_utils_offsets_time_mjs__WEBPACK_IMPORTED_MODULE_3__.convertOffsetToTimes)(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    times && times.length === keyframeValues.length
        ? times
        : (0,_utils_offsets_default_mjs__WEBPACK_IMPORTED_MODULE_4__.defaultOffset)(keyframeValues), duration);
    const mapTimeToKeyframe = (0,_utils_interpolate_mjs__WEBPACK_IMPORTED_MODULE_5__.interpolate)(absoluteTimes, keyframeValues, {
        ease: Array.isArray(easingFunctions)
            ? easingFunctions
            : defaultEasing(keyframeValues, easingFunctions),
    });
    return {
        calculatedDuration: duration,
        next: (t) => {
            state.value = mapTimeToKeyframe(t);
            state.done = t >= duration;
            return state;
        },
    };
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/generators/spring/defaults.mjs":
/*!*************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/generators/spring/defaults.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   springDefaults: () => (/* binding */ springDefaults)
/* harmony export */ });
const springDefaults = {
    // Default spring physics
    stiffness: 100,
    damping: 10,
    mass: 1.0,
    velocity: 0.0,
    // Default duration/bounce-based options
    duration: 800, // in ms
    bounce: 0.3,
    visualDuration: 0.3, // in seconds
    // Rest thresholds
    restSpeed: {
        granular: 0.01,
        default: 2,
    },
    restDelta: {
        granular: 0.005,
        default: 0.5,
    },
    // Limits
    minDuration: 0.01, // in seconds
    maxDuration: 10.0, // in seconds
    minDamping: 0.05,
    maxDamping: 1,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/generators/spring/find.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/generators/spring/find.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcAngularFreq: () => (/* binding */ calcAngularFreq),
/* harmony export */   findSpring: () => (/* binding */ findSpring)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/clamp.mjs */ "./node_modules/framer-motion/dist/es/utils/clamp.mjs");
/* harmony import */ var _defaults_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaults.mjs */ "./node_modules/framer-motion/dist/es/animation/generators/spring/defaults.mjs");




const safeMin = 0.001;
function findSpring({ duration = _defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.springDefaults.duration, bounce = _defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.springDefaults.bounce, velocity = _defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.springDefaults.velocity, mass = _defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.springDefaults.mass, }) {
    let envelope;
    let derivative;
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.warning)(duration <= (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.secondsToMilliseconds)(_defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.springDefaults.maxDuration), "Spring duration must be 10 seconds or less");
    let dampingRatio = 1 - bounce;
    /**
     * Restrict dampingRatio and duration to within acceptable ranges.
     */
    dampingRatio = (0,_utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_2__.clamp)(_defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.springDefaults.minDamping, _defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.springDefaults.maxDamping, dampingRatio);
    duration = (0,_utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_2__.clamp)(_defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.springDefaults.minDuration, _defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.springDefaults.maxDuration, (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.millisecondsToSeconds)(duration));
    if (dampingRatio < 1) {
        /**
         * Underdamped spring
         */
        envelope = (undampedFreq) => {
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const a = exponentialDecay - velocity;
            const b = calcAngularFreq(undampedFreq, dampingRatio);
            const c = Math.exp(-delta);
            return safeMin - (a / b) * c;
        };
        derivative = (undampedFreq) => {
            const exponentialDecay = undampedFreq * dampingRatio;
            const delta = exponentialDecay * duration;
            const d = delta * velocity + velocity;
            const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq, 2) * duration;
            const f = Math.exp(-delta);
            const g = calcAngularFreq(Math.pow(undampedFreq, 2), dampingRatio);
            const factor = -envelope(undampedFreq) + safeMin > 0 ? -1 : 1;
            return (factor * ((d - e) * f)) / g;
        };
    }
    else {
        /**
         * Critically-damped spring
         */
        envelope = (undampedFreq) => {
            const a = Math.exp(-undampedFreq * duration);
            const b = (undampedFreq - velocity) * duration + 1;
            return -safeMin + a * b;
        };
        derivative = (undampedFreq) => {
            const a = Math.exp(-undampedFreq * duration);
            const b = (velocity - undampedFreq) * (duration * duration);
            return a * b;
        };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.secondsToMilliseconds)(duration);
    if (isNaN(undampedFreq)) {
        return {
            stiffness: _defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.springDefaults.stiffness,
            damping: _defaults_mjs__WEBPACK_IMPORTED_MODULE_1__.springDefaults.damping,
            duration,
        };
    }
    else {
        const stiffness = Math.pow(undampedFreq, 2) * mass;
        return {
            stiffness,
            damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
            duration,
        };
    }
}
const rootIterations = 12;
function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for (let i = 1; i < rootIterations; i++) {
        result = result - envelope(result) / derivative(result);
    }
    return result;
}
function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/generators/spring/index.mjs":
/*!**********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/generators/spring/index.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   spring: () => (/* binding */ spring)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/clamp.mjs */ "./node_modules/framer-motion/dist/es/utils/clamp.mjs");
/* harmony import */ var _utils_velocity_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/velocity.mjs */ "./node_modules/framer-motion/dist/es/animation/generators/utils/velocity.mjs");
/* harmony import */ var _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./defaults.mjs */ "./node_modules/framer-motion/dist/es/animation/generators/spring/defaults.mjs");
/* harmony import */ var _find_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./find.mjs */ "./node_modules/framer-motion/dist/es/animation/generators/spring/find.mjs");







const durationKeys = ["duration", "bounce"];
const physicsKeys = ["stiffness", "damping", "mass"];
function isSpringType(options, keys) {
    return keys.some((key) => options[key] !== undefined);
}
function getSpringOptions(options) {
    let springOptions = {
        velocity: _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.velocity,
        stiffness: _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.stiffness,
        damping: _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.damping,
        mass: _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.mass,
        isResolvedFromDuration: false,
        ...options,
    };
    // stiffness/damping/mass overrides duration/bounce
    if (!isSpringType(options, physicsKeys) &&
        isSpringType(options, durationKeys)) {
        if (options.visualDuration) {
            const visualDuration = options.visualDuration;
            const root = (2 * Math.PI) / (visualDuration * 1.2);
            const stiffness = root * root;
            const damping = 2 *
                (0,_utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_3__.clamp)(0.05, 1, 1 - (options.bounce || 0)) *
                Math.sqrt(stiffness);
            springOptions = {
                ...springOptions,
                mass: _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.mass,
                stiffness,
                damping,
            };
        }
        else {
            const derived = (0,_find_mjs__WEBPACK_IMPORTED_MODULE_4__.findSpring)(options);
            springOptions = {
                ...springOptions,
                ...derived,
                mass: _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.mass,
            };
            springOptions.isResolvedFromDuration = true;
        }
    }
    return springOptions;
}
function spring(optionsOrVisualDuration = _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.visualDuration, bounce = _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.bounce) {
    const options = typeof optionsOrVisualDuration !== "object"
        ? {
            visualDuration: optionsOrVisualDuration,
            keyframes: [0, 1],
            bounce,
        }
        : optionsOrVisualDuration;
    let { restSpeed, restDelta } = options;
    const origin = options.keyframes[0];
    const target = options.keyframes[options.keyframes.length - 1];
    /**
     * This is the Iterator-spec return value. We ensure it's mutable rather than using a generator
     * to reduce GC during animation.
     */
    const state = { done: false, value: origin };
    const { stiffness, damping, mass, duration, velocity, isResolvedFromDuration, } = getSpringOptions({
        ...options,
        velocity: -(0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.millisecondsToSeconds)(options.velocity || 0),
    });
    const initialVelocity = velocity || 0.0;
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
    const initialDelta = target - origin;
    const undampedAngularFreq = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.millisecondsToSeconds)(Math.sqrt(stiffness / mass));
    /**
     * If we're working on a granular scale, use smaller defaults for determining
     * when the spring is finished.
     *
     * These defaults have been selected emprically based on what strikes a good
     * ratio between feeling good and finishing as soon as changes are imperceptible.
     */
    const isGranularScale = Math.abs(initialDelta) < 5;
    restSpeed || (restSpeed = isGranularScale
        ? _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.restSpeed.granular
        : _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.restSpeed.default);
    restDelta || (restDelta = isGranularScale
        ? _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.restDelta.granular
        : _defaults_mjs__WEBPACK_IMPORTED_MODULE_2__.springDefaults.restDelta.default);
    let resolveSpring;
    if (dampingRatio < 1) {
        const angularFreq = (0,_find_mjs__WEBPACK_IMPORTED_MODULE_4__.calcAngularFreq)(undampedAngularFreq, dampingRatio);
        // Underdamped spring
        resolveSpring = (t) => {
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            return (target -
                envelope *
                    (((initialVelocity +
                        dampingRatio * undampedAngularFreq * initialDelta) /
                        angularFreq) *
                        Math.sin(angularFreq * t) +
                        initialDelta * Math.cos(angularFreq * t)));
        };
    }
    else if (dampingRatio === 1) {
        // Critically damped spring
        resolveSpring = (t) => target -
            Math.exp(-undampedAngularFreq * t) *
                (initialDelta +
                    (initialVelocity + undampedAngularFreq * initialDelta) * t);
    }
    else {
        // Overdamped spring
        const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
        resolveSpring = (t) => {
            const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
            // When performing sinh or cosh values can hit Infinity so we cap them here
            const freqForT = Math.min(dampedAngularFreq * t, 300);
            return (target -
                (envelope *
                    ((initialVelocity +
                        dampingRatio * undampedAngularFreq * initialDelta) *
                        Math.sinh(freqForT) +
                        dampedAngularFreq *
                            initialDelta *
                            Math.cosh(freqForT))) /
                    dampedAngularFreq);
        };
    }
    const generator = {
        calculatedDuration: isResolvedFromDuration ? duration || null : null,
        next: (t) => {
            const current = resolveSpring(t);
            if (!isResolvedFromDuration) {
                let currentVelocity = 0.0;
                /**
                 * We only need to calculate velocity for under-damped springs
                 * as over- and critically-damped springs can't overshoot, so
                 * checking only for displacement is enough.
                 */
                if (dampingRatio < 1) {
                    currentVelocity =
                        t === 0
                            ? (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToMilliseconds)(initialVelocity)
                            : (0,_utils_velocity_mjs__WEBPACK_IMPORTED_MODULE_5__.calcGeneratorVelocity)(resolveSpring, t, current);
                }
                const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
                const isBelowDisplacementThreshold = Math.abs(target - current) <= restDelta;
                state.done =
                    isBelowVelocityThreshold && isBelowDisplacementThreshold;
            }
            else {
                state.done = t >= duration;
            }
            state.value = state.done ? target : current;
            return state;
        },
        toString: () => {
            const calculatedDuration = Math.min((0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.calcGeneratorDuration)(generator), motion_dom__WEBPACK_IMPORTED_MODULE_0__.maxGeneratorDuration);
            const easing = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.generateLinearEasing)((progress) => generator.next(calculatedDuration * progress).value, calculatedDuration, 30);
            return calculatedDuration + "ms " + easing;
        },
    };
    return generator;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/generators/utils/velocity.mjs":
/*!************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/generators/utils/velocity.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcGeneratorVelocity: () => (/* binding */ calcGeneratorVelocity)
/* harmony export */ });
/* harmony import */ var _utils_velocity_per_second_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/velocity-per-second.mjs */ "./node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs");


const velocitySampleDuration = 5; // ms
function calcGeneratorVelocity(resolveValue, t, current) {
    const prevT = Math.max(t - velocitySampleDuration, 0);
    return (0,_utils_velocity_per_second_mjs__WEBPACK_IMPORTED_MODULE_0__.velocityPerSecond)(current - resolveValue(prevT), t - prevT);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs":
/*!**********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateMotionValue: () => (/* binding */ animateMotionValue)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");
/* harmony import */ var _utils_GlobalConfig_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/GlobalConfig.mjs */ "./node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs");
/* harmony import */ var _utils_use_instant_transition_state_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/use-instant-transition-state.mjs */ "./node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs");
/* harmony import */ var _animators_AcceleratedAnimation_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../animators/AcceleratedAnimation.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/AcceleratedAnimation.mjs");
/* harmony import */ var _animators_MainThreadAnimation_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../animators/MainThreadAnimation.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/MainThreadAnimation.mjs");
/* harmony import */ var _animators_waapi_utils_get_final_keyframe_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../animators/waapi/utils/get-final-keyframe.mjs */ "./node_modules/framer-motion/dist/es/animation/animators/waapi/utils/get-final-keyframe.mjs");
/* harmony import */ var _utils_default_transitions_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/default-transitions.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs");
/* harmony import */ var _utils_is_transition_defined_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/is-transition-defined.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/is-transition-defined.mjs");











const animateMotionValue = (name, value, target, transition = {}, element, isHandoff) => (onComplete) => {
    const valueTransition = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.getValueTransition)(transition, name) || {};
    /**
     * Most transition values are currently completely overwritten by value-specific
     * transitions. In the future it'd be nicer to blend these transitions. But for now
     * delay actually does inherit from the root transition if not value-specific.
     */
    const delay = valueTransition.delay || transition.delay || 0;
    /**
     * Elapsed isn't a public transition option but can be passed through from
     * optimized appear effects in milliseconds.
     */
    let { elapsed = 0 } = transition;
    elapsed = elapsed - (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToMilliseconds)(delay);
    let options = {
        keyframes: Array.isArray(target) ? target : [null, target],
        ease: "easeOut",
        velocity: value.getVelocity(),
        ...valueTransition,
        delay: -elapsed,
        onUpdate: (v) => {
            value.set(v);
            valueTransition.onUpdate && valueTransition.onUpdate(v);
        },
        onComplete: () => {
            onComplete();
            valueTransition.onComplete && valueTransition.onComplete();
        },
        name,
        motionValue: value,
        element: isHandoff ? undefined : element,
    };
    /**
     * If there's no transition defined for this value, we can generate
     * unqiue transition settings for this value.
     */
    if (!(0,_utils_is_transition_defined_mjs__WEBPACK_IMPORTED_MODULE_2__.isTransitionDefined)(valueTransition)) {
        options = {
            ...options,
            ...(0,_utils_default_transitions_mjs__WEBPACK_IMPORTED_MODULE_3__.getDefaultTransition)(name, options),
        };
    }
    /**
     * Both WAAPI and our internal animation functions use durations
     * as defined by milliseconds, while our external API defines them
     * as seconds.
     */
    if (options.duration) {
        options.duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToMilliseconds)(options.duration);
    }
    if (options.repeatDelay) {
        options.repeatDelay = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToMilliseconds)(options.repeatDelay);
    }
    if (options.from !== undefined) {
        options.keyframes[0] = options.from;
    }
    let shouldSkip = false;
    if (options.type === false ||
        (options.duration === 0 && !options.repeatDelay)) {
        options.duration = 0;
        if (options.delay === 0) {
            shouldSkip = true;
        }
    }
    if (_utils_use_instant_transition_state_mjs__WEBPACK_IMPORTED_MODULE_4__.instantAnimationState.current ||
        _utils_GlobalConfig_mjs__WEBPACK_IMPORTED_MODULE_5__.MotionGlobalConfig.skipAnimations) {
        shouldSkip = true;
        options.duration = 0;
        options.delay = 0;
    }
    /**
     * If we can or must skip creating the animation, and apply only
     * the final keyframe, do so. We also check once keyframes are resolved but
     * this early check prevents the need to create an animation at all.
     */
    if (shouldSkip && !isHandoff && value.get() !== undefined) {
        const finalKeyframe = (0,_animators_waapi_utils_get_final_keyframe_mjs__WEBPACK_IMPORTED_MODULE_6__.getFinalKeyframe)(options.keyframes, valueTransition);
        if (finalKeyframe !== undefined) {
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__.frame.update(() => {
                options.onUpdate(finalKeyframe);
                options.onComplete();
            });
            // We still want to return some animation controls here rather
            // than returning undefined
            return new motion_dom__WEBPACK_IMPORTED_MODULE_0__.GroupPlaybackControls([]);
        }
    }
    /**
     * Animate via WAAPI if possible. If this is a handoff animation, the optimised animation will be running via
     * WAAPI. Therefore, this animation must be JS to ensure it runs "under" the
     * optimised animation.
     */
    if (!isHandoff && _animators_AcceleratedAnimation_mjs__WEBPACK_IMPORTED_MODULE_8__.AcceleratedAnimation.supports(options)) {
        return new _animators_AcceleratedAnimation_mjs__WEBPACK_IMPORTED_MODULE_8__.AcceleratedAnimation(options);
    }
    else {
        return new _animators_MainThreadAnimation_mjs__WEBPACK_IMPORTED_MODULE_9__.MainThreadAnimation(options);
    }
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs":
/*!*******************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateTarget: () => (/* binding */ animateTarget)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var _render_html_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../render/html/utils/keys-position.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-position.mjs");
/* harmony import */ var _render_utils_setters_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../render/utils/setters.mjs */ "./node_modules/framer-motion/dist/es/render/utils/setters.mjs");
/* harmony import */ var _value_use_will_change_add_will_change_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../value/use-will-change/add-will-change.mjs */ "./node_modules/framer-motion/dist/es/value/use-will-change/add-will-change.mjs");
/* harmony import */ var _optimized_appear_get_appear_id_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../optimized-appear/get-appear-id.mjs */ "./node_modules/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs");
/* harmony import */ var _motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./motion-value.mjs */ "./node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");








/**
 * Decide whether we should block this animation. Previously, we achieved this
 * just by checking whether the key was listed in protectedKeys, but this
 * posed problems if an animation was triggered by afterChildren and protectedKeys
 * had been set to true in the meantime.
 */
function shouldBlockAnimation({ protectedKeys, needsAnimating }, key) {
    const shouldBlock = protectedKeys.hasOwnProperty(key) && needsAnimating[key] !== true;
    needsAnimating[key] = false;
    return shouldBlock;
}
function animateTarget(visualElement, targetAndTransition, { delay = 0, transitionOverride, type } = {}) {
    var _a;
    let { transition = visualElement.getDefaultTransition(), transitionEnd, ...target } = targetAndTransition;
    if (transitionOverride)
        transition = transitionOverride;
    const animations = [];
    const animationTypeState = type &&
        visualElement.animationState &&
        visualElement.animationState.getState()[type];
    for (const key in target) {
        const value = visualElement.getValue(key, (_a = visualElement.latestValues[key]) !== null && _a !== void 0 ? _a : null);
        const valueTarget = target[key];
        if (valueTarget === undefined ||
            (animationTypeState &&
                shouldBlockAnimation(animationTypeState, key))) {
            continue;
        }
        const valueTransition = {
            delay,
            ...(0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.getValueTransition)(transition || {}, key),
        };
        /**
         * If this is the first time a value is being animated, check
         * to see if we're handling off from an existing animation.
         */
        let isHandoff = false;
        if (window.MotionHandoffAnimation) {
            const appearId = (0,_optimized_appear_get_appear_id_mjs__WEBPACK_IMPORTED_MODULE_1__.getOptimisedAppearId)(visualElement);
            if (appearId) {
                const startTime = window.MotionHandoffAnimation(appearId, key, _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.frame);
                if (startTime !== null) {
                    valueTransition.startTime = startTime;
                    isHandoff = true;
                }
            }
        }
        (0,_value_use_will_change_add_will_change_mjs__WEBPACK_IMPORTED_MODULE_3__.addValueToWillChange)(visualElement, key);
        value.start((0,_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__.animateMotionValue)(key, value, valueTarget, visualElement.shouldReduceMotion && _render_html_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_5__.positionalKeys.has(key)
            ? { type: false }
            : valueTransition, visualElement, isHandoff));
        const animation = value.animation;
        if (animation) {
            animations.push(animation);
        }
    }
    if (transitionEnd) {
        Promise.all(animations).then(() => {
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.frame.update(() => {
                transitionEnd && (0,_render_utils_setters_mjs__WEBPACK_IMPORTED_MODULE_6__.setTarget)(visualElement, transitionEnd);
            });
        });
    }
    return animations;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/interfaces/visual-element-variant.mjs":
/*!********************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/interfaces/visual-element-variant.mjs ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateVariant: () => (/* binding */ animateVariant),
/* harmony export */   sortByTreeOrder: () => (/* binding */ sortByTreeOrder)
/* harmony export */ });
/* harmony import */ var _render_utils_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../render/utils/resolve-dynamic-variants.mjs */ "./node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs");
/* harmony import */ var _visual_element_target_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visual-element-target.mjs */ "./node_modules/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs");



function animateVariant(visualElement, variant, options = {}) {
    var _a;
    const resolved = (0,_render_utils_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_0__.resolveVariant)(visualElement, variant, options.type === "exit"
        ? (_a = visualElement.presenceContext) === null || _a === void 0 ? void 0 : _a.custom
        : undefined);
    let { transition = visualElement.getDefaultTransition() || {} } = resolved || {};
    if (options.transitionOverride) {
        transition = options.transitionOverride;
    }
    /**
     * If we have a variant, create a callback that runs it as an animation.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */
    const getAnimation = resolved
        ? () => Promise.all((0,_visual_element_target_mjs__WEBPACK_IMPORTED_MODULE_1__.animateTarget)(visualElement, resolved, options))
        : () => Promise.resolve();
    /**
     * If we have children, create a callback that runs all their animations.
     * Otherwise, we resolve a Promise immediately for a composable no-op.
     */
    const getChildAnimations = visualElement.variantChildren && visualElement.variantChildren.size
        ? (forwardDelay = 0) => {
            const { delayChildren = 0, staggerChildren, staggerDirection, } = transition;
            return animateChildren(visualElement, variant, delayChildren + forwardDelay, staggerChildren, staggerDirection, options);
        }
        : () => Promise.resolve();
    /**
     * If the transition explicitly defines a "when" option, we need to resolve either
     * this animation or all children animations before playing the other.
     */
    const { when } = transition;
    if (when) {
        const [first, last] = when === "beforeChildren"
            ? [getAnimation, getChildAnimations]
            : [getChildAnimations, getAnimation];
        return first().then(() => last());
    }
    else {
        return Promise.all([getAnimation(), getChildAnimations(options.delay)]);
    }
}
function animateChildren(visualElement, variant, delayChildren = 0, staggerChildren = 0, staggerDirection = 1, options) {
    const animations = [];
    const maxStaggerDuration = (visualElement.variantChildren.size - 1) * staggerChildren;
    const generateStaggerDuration = staggerDirection === 1
        ? (i = 0) => i * staggerChildren
        : (i = 0) => maxStaggerDuration - i * staggerChildren;
    Array.from(visualElement.variantChildren)
        .sort(sortByTreeOrder)
        .forEach((child, i) => {
        child.notify("AnimationStart", variant);
        animations.push(animateVariant(child, variant, {
            ...options,
            delay: delayChildren + generateStaggerDuration(i),
        }).then(() => child.notify("AnimationComplete", variant)));
    });
    return Promise.all(animations);
}
function sortByTreeOrder(a, b) {
    return a.sortNodePosition(b);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/interfaces/visual-element.mjs":
/*!************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/interfaces/visual-element.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animateVisualElement: () => (/* binding */ animateVisualElement)
/* harmony export */ });
/* harmony import */ var _render_utils_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../render/utils/resolve-dynamic-variants.mjs */ "./node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs");
/* harmony import */ var _visual_element_target_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./visual-element-target.mjs */ "./node_modules/framer-motion/dist/es/animation/interfaces/visual-element-target.mjs");
/* harmony import */ var _visual_element_variant_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visual-element-variant.mjs */ "./node_modules/framer-motion/dist/es/animation/interfaces/visual-element-variant.mjs");




function animateVisualElement(visualElement, definition, options = {}) {
    visualElement.notify("AnimationStart", definition);
    let animation;
    if (Array.isArray(definition)) {
        const animations = definition.map((variant) => (0,_visual_element_variant_mjs__WEBPACK_IMPORTED_MODULE_0__.animateVariant)(visualElement, variant, options));
        animation = Promise.all(animations);
    }
    else if (typeof definition === "string") {
        animation = (0,_visual_element_variant_mjs__WEBPACK_IMPORTED_MODULE_0__.animateVariant)(visualElement, definition, options);
    }
    else {
        const resolvedDefinition = typeof definition === "function"
            ? (0,_render_utils_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_1__.resolveVariant)(visualElement, definition, options.custom)
            : definition;
        animation = Promise.all((0,_visual_element_target_mjs__WEBPACK_IMPORTED_MODULE_2__.animateTarget)(visualElement, resolvedDefinition, options));
    }
    return animation.then(() => {
        visualElement.notify("AnimationComplete", definition);
    });
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   optimizedAppearDataAttribute: () => (/* binding */ optimizedAppearDataAttribute),
/* harmony export */   optimizedAppearDataId: () => (/* binding */ optimizedAppearDataId)
/* harmony export */ });
/* harmony import */ var _render_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../render/dom/utils/camel-to-dash.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs");


const optimizedAppearDataId = "framerAppearId";
const optimizedAppearDataAttribute = "data-" + (0,_render_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_0__.camelToDash)(optimizedAppearDataId);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs":
/*!*****************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOptimisedAppearId: () => (/* binding */ getOptimisedAppearId)
/* harmony export */ });
/* harmony import */ var _data_id_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data-id.mjs */ "./node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs");


function getOptimisedAppearId(visualElement) {
    return visualElement.props[_data_id_mjs__WEBPACK_IMPORTED_MODULE_0__.optimizedAppearDataAttribute];
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs":
/*!************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/utils/default-transitions.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultTransition: () => (/* binding */ getDefaultTransition)
/* harmony export */ });
/* harmony import */ var _render_html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../render/html/utils/keys-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs");


const underDampedSpring = {
    type: "spring",
    stiffness: 500,
    damping: 25,
    restSpeed: 10,
};
const criticallyDampedSpring = (target) => ({
    type: "spring",
    stiffness: 550,
    damping: target === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
});
const keyframesTransition = {
    type: "keyframes",
    duration: 0.8,
};
/**
 * Default easing curve is a slightly shallower version of
 * the default browser easing curve.
 */
const ease = {
    type: "keyframes",
    ease: [0.25, 0.1, 0.35, 1],
    duration: 0.3,
};
const getDefaultTransition = (valueKey, { keyframes }) => {
    if (keyframes.length > 2) {
        return keyframesTransition;
    }
    else if (_render_html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.transformProps.has(valueKey)) {
        return valueKey.startsWith("scale")
            ? criticallyDampedSpring(keyframes[1])
            : underDampedSpring;
    }
    return ease;
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/utils/is-animatable.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAnimatable: () => (/* binding */ isAnimatable)
/* harmony export */ });
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/types/complex/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/complex/index.mjs");


/**
 * Check if a value is animatable. Examples:
 *
 * ✅: 100, "100px", "#fff"
 * ❌: "block", "url(2.jpg)"
 * @param value
 *
 * @internal
 */
const isAnimatable = (value, name) => {
    // If the list of keys tat might be non-animatable grows, replace with Set
    if (name === "zIndex")
        return false;
    // If it's a number or a keyframes array, we can animate it. We might at some point
    // need to do a deep isAnimatable check of keyframes, or let Popmotion handle this,
    // but for now lets leave it like this for performance reasons
    if (typeof value === "number" || Array.isArray(value))
        return true;
    if (typeof value === "string" && // It's animatable if we have a string
        (_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__.complex.test(value) || value === "0") && // And it contains numbers and/or colors
        !value.startsWith("url(") // Unless it starts with "url("
    ) {
        return true;
    }
    return false;
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAnimationControls: () => (/* binding */ isAnimationControls)
/* harmony export */ });
function isAnimationControls(v) {
    return (v !== null &&
        typeof v === "object" &&
        typeof v.start === "function");
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs":
/*!************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isKeyframesTarget: () => (/* binding */ isKeyframesTarget)
/* harmony export */ });
const isKeyframesTarget = (v) => {
    return Array.isArray(v);
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/utils/is-none.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/utils/is-none.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNone: () => (/* binding */ isNone)
/* harmony export */ });
/* harmony import */ var _utils_is_zero_value_string_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/is-zero-value-string.mjs */ "./node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs");


function isNone(value) {
    if (typeof value === "number") {
        return value === 0;
    }
    else if (value !== null) {
        return value === "none" || value === "0" || (0,_utils_is_zero_value_string_mjs__WEBPACK_IMPORTED_MODULE_0__.isZeroValueString)(value);
    }
    else {
        return true;
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/animation/utils/is-transition-defined.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/animation/utils/is-transition-defined.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isTransitionDefined: () => (/* binding */ isTransitionDefined)
/* harmony export */ });
/**
 * Decide whether a transition is defined on a given Transition.
 * This filters out orchestration options and returns true
 * if any options are left.
 */
function isTransitionDefined({ when, delay: _delay, delayChildren, staggerChildren, staggerDirection, repeat, repeatType, repeatDelay, from, elapsed, ...transition }) {
    return !!Object.keys(transition).length;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs":
/*!****************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPresent: () => (/* binding */ isPresent),
/* harmony export */   useIsPresent: () => (/* binding */ useIsPresent),
/* harmony export */   usePresence: () => (/* binding */ usePresence)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../context/PresenceContext.mjs */ "./node_modules/framer-motion/dist/es/context/PresenceContext.mjs");



/**
 * When a component is the child of `AnimatePresence`, it can use `usePresence`
 * to access information about whether it's still present in the React tree.
 *
 * ```jsx
 * import { usePresence } from "framer-motion"
 *
 * export const Component = () => {
 *   const [isPresent, safeToRemove] = usePresence()
 *
 *   useEffect(() => {
 *     !isPresent && setTimeout(safeToRemove, 1000)
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * If `isPresent` is `false`, it means that a component has been removed the tree, but
 * `AnimatePresence` won't really remove it until `safeToRemove` has been called.
 *
 * @public
 */
function usePresence(subscribe = true) {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_1__.PresenceContext);
    if (context === null)
        return [true, null];
    const { isPresent, onExitComplete, register } = context;
    // It's safe to call the following hooks conditionally (after an early return) because the context will always
    // either be null or non-null for the lifespan of the component.
    const id = (0,react__WEBPACK_IMPORTED_MODULE_0__.useId)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (subscribe) {
            return register(id);
        }
    }, [subscribe]);
    const safeToRemove = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => subscribe && onExitComplete && onExitComplete(id), [id, onExitComplete, subscribe]);
    return !isPresent && onExitComplete ? [false, safeToRemove] : [true];
}
/**
 * Similar to `usePresence`, except `useIsPresent` simply returns whether or not the component is present.
 * There is no `safeToRemove` function.
 *
 * ```jsx
 * import { useIsPresent } from "framer-motion"
 *
 * export const Component = () => {
 *   const isPresent = useIsPresent()
 *
 *   useEffect(() => {
 *     !isPresent && console.log("I've been removed!")
 *   }, [isPresent])
 *
 *   return <div />
 * }
 * ```
 *
 * @public
 */
function useIsPresent() {
    return isPresent((0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_1__.PresenceContext));
}
function isPresent(context) {
    return context === null ? true : context.isPresent;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LayoutGroupContext: () => (/* binding */ LayoutGroupContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";


const LayoutGroupContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/context/LazyContext.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/context/LazyContext.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LazyContext: () => (/* binding */ LazyContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";


const LazyContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({ strict: false });




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MotionConfigContext: () => (/* binding */ MotionConfigContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";


/**
 * @public
 */
const MotionConfigContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
    transformPagePoint: (p) => p,
    isStatic: false,
    reducedMotion: "never",
});




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/context/MotionContext/create.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/context/MotionContext/create.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCreateMotionContext: () => (/* binding */ useCreateMotionContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.mjs */ "./node_modules/framer-motion/dist/es/context/MotionContext/index.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs");




function useCreateMotionContext(props) {
    const { initial, animate } = (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_1__.getCurrentTreeVariants)(props, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_index_mjs__WEBPACK_IMPORTED_MODULE_2__.MotionContext));
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({ initial, animate }), [variantLabelsAsDependency(initial), variantLabelsAsDependency(animate)]);
}
function variantLabelsAsDependency(prop) {
    return Array.isArray(prop) ? prop.join(" ") : prop;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/context/MotionContext/index.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/context/MotionContext/index.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MotionContext: () => (/* binding */ MotionContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";


const MotionContext = /* @__PURE__ */ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/context/MotionContext/utils.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentTreeVariants: () => (/* binding */ getCurrentTreeVariants)
/* harmony export */ });
/* harmony import */ var _render_utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../render/utils/is-controlling-variants.mjs */ "./node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs");
/* harmony import */ var _render_utils_is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../render/utils/is-variant-label.mjs */ "./node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs");



function getCurrentTreeVariants(props, context) {
    if ((0,_render_utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_0__.isControllingVariants)(props)) {
        const { initial, animate } = props;
        return {
            initial: initial === false || (0,_render_utils_is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_1__.isVariantLabel)(initial)
                ? initial
                : undefined,
            animate: (0,_render_utils_is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_1__.isVariantLabel)(animate) ? animate : undefined,
        };
    }
    return props.inherit !== false ? context : {};
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/context/PresenceContext.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/context/PresenceContext.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PresenceContext: () => (/* binding */ PresenceContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";


/**
 * @public
 */
const PresenceContext = 
/* @__PURE__ */ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SwitchLayoutGroupContext: () => (/* binding */ SwitchLayoutGroupContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";


/**
 * Internal, exported only for usage in Framer
 */
const SwitchLayoutGroupContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/easing/anticipate.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/easing/anticipate.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   anticipate: () => (/* binding */ anticipate)
/* harmony export */ });
/* harmony import */ var _back_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./back.mjs */ "./node_modules/framer-motion/dist/es/easing/back.mjs");


const anticipate = (p) => (p *= 2) < 1 ? 0.5 * (0,_back_mjs__WEBPACK_IMPORTED_MODULE_0__.backIn)(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/easing/back.mjs":
/*!************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/easing/back.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   backIn: () => (/* binding */ backIn),
/* harmony export */   backInOut: () => (/* binding */ backInOut),
/* harmony export */   backOut: () => (/* binding */ backOut)
/* harmony export */ });
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubic-bezier.mjs */ "./node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs");
/* harmony import */ var _modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/mirror.mjs */ "./node_modules/framer-motion/dist/es/easing/modifiers/mirror.mjs");
/* harmony import */ var _modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/reverse.mjs */ "./node_modules/framer-motion/dist/es/easing/modifiers/reverse.mjs");




const backOut = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0.33, 1.53, 0.69, 0.99);
const backIn = /*@__PURE__*/ (0,_modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_1__.reverseEasing)(backOut);
const backInOut = /*@__PURE__*/ (0,_modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_2__.mirrorEasing)(backIn);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/easing/circ.mjs":
/*!************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/easing/circ.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   circIn: () => (/* binding */ circIn),
/* harmony export */   circInOut: () => (/* binding */ circInOut),
/* harmony export */   circOut: () => (/* binding */ circOut)
/* harmony export */ });
/* harmony import */ var _modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/mirror.mjs */ "./node_modules/framer-motion/dist/es/easing/modifiers/mirror.mjs");
/* harmony import */ var _modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/reverse.mjs */ "./node_modules/framer-motion/dist/es/easing/modifiers/reverse.mjs");



const circIn = (p) => 1 - Math.sin(Math.acos(p));
const circOut = (0,_modifiers_reverse_mjs__WEBPACK_IMPORTED_MODULE_0__.reverseEasing)(circIn);
const circInOut = (0,_modifiers_mirror_mjs__WEBPACK_IMPORTED_MODULE_1__.mirrorEasing)(circIn);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cubicBezier: () => (/* binding */ cubicBezier)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");


/*
  Bezier function generator
  This has been modified from Gaëtan Renaudeau's BezierEasing
  https://github.com/gre/bezier-easing/blob/master/src/index.js
  https://github.com/gre/bezier-easing/blob/master/LICENSE
  
  I've removed the newtonRaphsonIterate algo because in benchmarking it
  wasn't noticiably faster than binarySubdivision, indeed removing it
  usually improved times, depending on the curve.
  I also removed the lookup table, as for the added bundle size and loop we're
  only cutting ~4 or so subdivision iterations. I bumped the max iterations up
  to 12 to compensate and this still tended to be faster for no perceivable
  loss in accuracy.
  Usage
    const easeOut = cubicBezier(.17,.67,.83,.67);
    const x = easeOut(0.5); // returns 0.627...
*/
// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
const calcBezier = (t, a1, a2) => (((1.0 - 3.0 * a2 + 3.0 * a1) * t + (3.0 * a2 - 6.0 * a1)) * t + 3.0 * a1) *
    t;
const subdivisionPrecision = 0.0000001;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
    let currentX;
    let currentT;
    let i = 0;
    do {
        currentT = lowerBound + (upperBound - lowerBound) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - x;
        if (currentX > 0.0) {
            upperBound = currentT;
        }
        else {
            lowerBound = currentT;
        }
    } while (Math.abs(currentX) > subdivisionPrecision &&
        ++i < subdivisionMaxIterations);
    return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
    // If this is a linear gradient, return linear easing
    if (mX1 === mY1 && mX2 === mY2)
        return motion_utils__WEBPACK_IMPORTED_MODULE_0__.noop;
    const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
    // If animation is at start/end, return t without easing
    return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/easing/ease.mjs":
/*!************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/easing/ease.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   easeIn: () => (/* binding */ easeIn),
/* harmony export */   easeInOut: () => (/* binding */ easeInOut),
/* harmony export */   easeOut: () => (/* binding */ easeOut)
/* harmony export */ });
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cubic-bezier.mjs */ "./node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs");


const easeIn = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0.42, 0, 1, 1);
const easeOut = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0, 0, 0.58, 1);
const easeInOut = /*@__PURE__*/ (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_0__.cubicBezier)(0.42, 0, 0.58, 1);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/easing/modifiers/mirror.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/easing/modifiers/mirror.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mirrorEasing: () => (/* binding */ mirrorEasing)
/* harmony export */ });
// Accepts an easing function and returns a new one that outputs mirrored values for
// the second half of the animation. Turns easeIn into easeInOut.
const mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/easing/modifiers/reverse.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/easing/modifiers/reverse.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reverseEasing: () => (/* binding */ reverseEasing)
/* harmony export */ });
// Accepts an easing function and returns a new one that outputs reversed values.
// Turns easeIn into easeOut.
const reverseEasing = (easing) => (p) => 1 - easing(1 - p);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/easing/utils/is-easing-array.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/easing/utils/is-easing-array.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isEasingArray: () => (/* binding */ isEasingArray)
/* harmony export */ });
const isEasingArray = (ease) => {
    return Array.isArray(ease) && typeof ease[0] !== "number";
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/easing/utils/map.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/easing/utils/map.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   easingDefinitionToFunction: () => (/* binding */ easingDefinitionToFunction)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _anticipate_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../anticipate.mjs */ "./node_modules/framer-motion/dist/es/easing/anticipate.mjs");
/* harmony import */ var _back_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../back.mjs */ "./node_modules/framer-motion/dist/es/easing/back.mjs");
/* harmony import */ var _circ_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../circ.mjs */ "./node_modules/framer-motion/dist/es/easing/circ.mjs");
/* harmony import */ var _cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../cubic-bezier.mjs */ "./node_modules/framer-motion/dist/es/easing/cubic-bezier.mjs");
/* harmony import */ var _ease_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ease.mjs */ "./node_modules/framer-motion/dist/es/easing/ease.mjs");








const easingLookup = {
    linear: motion_utils__WEBPACK_IMPORTED_MODULE_1__.noop,
    easeIn: _ease_mjs__WEBPACK_IMPORTED_MODULE_2__.easeIn,
    easeInOut: _ease_mjs__WEBPACK_IMPORTED_MODULE_2__.easeInOut,
    easeOut: _ease_mjs__WEBPACK_IMPORTED_MODULE_2__.easeOut,
    circIn: _circ_mjs__WEBPACK_IMPORTED_MODULE_3__.circIn,
    circInOut: _circ_mjs__WEBPACK_IMPORTED_MODULE_3__.circInOut,
    circOut: _circ_mjs__WEBPACK_IMPORTED_MODULE_3__.circOut,
    backIn: _back_mjs__WEBPACK_IMPORTED_MODULE_4__.backIn,
    backInOut: _back_mjs__WEBPACK_IMPORTED_MODULE_4__.backInOut,
    backOut: _back_mjs__WEBPACK_IMPORTED_MODULE_4__.backOut,
    anticipate: _anticipate_mjs__WEBPACK_IMPORTED_MODULE_5__.anticipate,
};
const easingDefinitionToFunction = (definition) => {
    if ((0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.isBezierDefinition)(definition)) {
        // If cubic bezier definition, create bezier curve
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.invariant)(definition.length === 4, `Cubic bezier arrays must contain four numerical values.`);
        const [x1, y1, x2, y2] = definition;
        return (0,_cubic_bezier_mjs__WEBPACK_IMPORTED_MODULE_6__.cubicBezier)(x1, y1, x2, y2);
    }
    else if (typeof definition === "string") {
        // Else lookup from table
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.invariant)(easingLookup[definition] !== undefined, `Invalid easing type '${definition}'`);
        return easingLookup[definition];
    }
    return definition;
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/events/add-dom-event.mjs":
/*!*********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/events/add-dom-event.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addDomEvent: () => (/* binding */ addDomEvent)
/* harmony export */ });
function addDomEvent(target, eventName, handler, options = { passive: true }) {
    target.addEventListener(eventName, handler, options);
    return () => target.removeEventListener(eventName, handler);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/events/add-pointer-event.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/events/add-pointer-event.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPointerEvent: () => (/* binding */ addPointerEvent)
/* harmony export */ });
/* harmony import */ var _add_dom_event_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-dom-event.mjs */ "./node_modules/framer-motion/dist/es/events/add-dom-event.mjs");
/* harmony import */ var _event_info_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./event-info.mjs */ "./node_modules/framer-motion/dist/es/events/event-info.mjs");



function addPointerEvent(target, eventName, handler, options) {
    return (0,_add_dom_event_mjs__WEBPACK_IMPORTED_MODULE_0__.addDomEvent)(target, eventName, (0,_event_info_mjs__WEBPACK_IMPORTED_MODULE_1__.addPointerInfo)(handler), options);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/events/event-info.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/events/event-info.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPointerInfo: () => (/* binding */ addPointerInfo),
/* harmony export */   extractEventInfo: () => (/* binding */ extractEventInfo)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");


function extractEventInfo(event) {
    return {
        point: {
            x: event.pageX,
            y: event.pageY,
        },
    };
}
const addPointerInfo = (handler) => {
    return (event) => (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.isPrimaryPointer)(event) && handler(event, extractEventInfo(event));
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/frameloop/batcher.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/frameloop/batcher.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRenderBatcher: () => (/* binding */ createRenderBatcher)
/* harmony export */ });
/* harmony import */ var _utils_GlobalConfig_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/GlobalConfig.mjs */ "./node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs");
/* harmony import */ var _order_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./order.mjs */ "./node_modules/framer-motion/dist/es/frameloop/order.mjs");
/* harmony import */ var _render_step_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render-step.mjs */ "./node_modules/framer-motion/dist/es/frameloop/render-step.mjs");




const maxElapsed = 40;
function createRenderBatcher(scheduleNextBatch, allowKeepAlive) {
    let runNextFrame = false;
    let useDefaultElapsed = true;
    const state = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false,
    };
    const flagRunNextFrame = () => (runNextFrame = true);
    const steps = _order_mjs__WEBPACK_IMPORTED_MODULE_0__.stepsOrder.reduce((acc, key) => {
        acc[key] = (0,_render_step_mjs__WEBPACK_IMPORTED_MODULE_1__.createRenderStep)(flagRunNextFrame, allowKeepAlive ? key : undefined);
        return acc;
    }, {});
    const { read, resolveKeyframes, update, preRender, render, postRender } = steps;
    const processBatch = () => {
        const timestamp = _utils_GlobalConfig_mjs__WEBPACK_IMPORTED_MODULE_2__.MotionGlobalConfig.useManualTiming
            ? state.timestamp
            : performance.now();
        runNextFrame = false;
        if (!_utils_GlobalConfig_mjs__WEBPACK_IMPORTED_MODULE_2__.MotionGlobalConfig.useManualTiming) {
            state.delta = useDefaultElapsed
                ? 1000 / 60
                : Math.max(Math.min(timestamp - state.timestamp, maxElapsed), 1);
        }
        state.timestamp = timestamp;
        state.isProcessing = true;
        // Unrolled render loop for better per-frame performance
        read.process(state);
        resolveKeyframes.process(state);
        update.process(state);
        preRender.process(state);
        render.process(state);
        postRender.process(state);
        state.isProcessing = false;
        if (runNextFrame && allowKeepAlive) {
            useDefaultElapsed = false;
            scheduleNextBatch(processBatch);
        }
    };
    const wake = () => {
        runNextFrame = true;
        useDefaultElapsed = true;
        if (!state.isProcessing) {
            scheduleNextBatch(processBatch);
        }
    };
    const schedule = _order_mjs__WEBPACK_IMPORTED_MODULE_0__.stepsOrder.reduce((acc, key) => {
        const step = steps[key];
        acc[key] = (process, keepAlive = false, immediate = false) => {
            if (!runNextFrame)
                wake();
            return step.schedule(process, keepAlive, immediate);
        };
        return acc;
    }, {});
    const cancel = (process) => {
        for (let i = 0; i < _order_mjs__WEBPACK_IMPORTED_MODULE_0__.stepsOrder.length; i++) {
            steps[_order_mjs__WEBPACK_IMPORTED_MODULE_0__.stepsOrder[i]].cancel(process);
        }
    };
    return { schedule, cancel, state, steps };
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/frameloop/frame.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancelFrame: () => (/* binding */ cancelFrame),
/* harmony export */   frame: () => (/* binding */ frame),
/* harmony export */   frameData: () => (/* binding */ frameData),
/* harmony export */   frameSteps: () => (/* binding */ frameSteps)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _batcher_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./batcher.mjs */ "./node_modules/framer-motion/dist/es/frameloop/batcher.mjs");



const { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps, } = (0,_batcher_mjs__WEBPACK_IMPORTED_MODULE_1__.createRenderBatcher)(typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : motion_utils__WEBPACK_IMPORTED_MODULE_0__.noop, true);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/frameloop/microtask.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/frameloop/microtask.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cancelMicrotask: () => (/* binding */ cancelMicrotask),
/* harmony export */   microtask: () => (/* binding */ microtask)
/* harmony export */ });
/* harmony import */ var _batcher_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./batcher.mjs */ "./node_modules/framer-motion/dist/es/frameloop/batcher.mjs");


const { schedule: microtask, cancel: cancelMicrotask } = (0,_batcher_mjs__WEBPACK_IMPORTED_MODULE_0__.createRenderBatcher)(queueMicrotask, false);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/frameloop/order.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/frameloop/order.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   stepsOrder: () => (/* binding */ stepsOrder)
/* harmony export */ });
const stepsOrder = [
    "read", // Read
    "resolveKeyframes", // Write/Read/Write/Read
    "update", // Compute
    "preRender", // Compute
    "render", // Write
    "postRender", // Compute
];




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/frameloop/render-step.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/frameloop/render-step.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRenderStep: () => (/* binding */ createRenderStep)
/* harmony export */ });
/* harmony import */ var _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stats/buffer.mjs */ "./node_modules/framer-motion/dist/es/stats/buffer.mjs");


function createRenderStep(runNextFrame, stepName) {
    /**
     * We create and reuse two queues, one to queue jobs for the current frame
     * and one for the next. We reuse to avoid triggering GC after x frames.
     */
    let thisFrame = new Set();
    let nextFrame = new Set();
    /**
     * Track whether we're currently processing jobs in this step. This way
     * we can decide whether to schedule new jobs for this frame or next.
     */
    let isProcessing = false;
    let flushNextFrame = false;
    /**
     * A set of processes which were marked keepAlive when scheduled.
     */
    const toKeepAlive = new WeakSet();
    let latestFrameData = {
        delta: 0.0,
        timestamp: 0.0,
        isProcessing: false,
    };
    let numCalls = 0;
    function triggerCallback(callback) {
        if (toKeepAlive.has(callback)) {
            step.schedule(callback);
            runNextFrame();
        }
        numCalls++;
        callback(latestFrameData);
    }
    const step = {
        /**
         * Schedule a process to run on the next frame.
         */
        schedule: (callback, keepAlive = false, immediate = false) => {
            const addToCurrentFrame = immediate && isProcessing;
            const queue = addToCurrentFrame ? thisFrame : nextFrame;
            if (keepAlive)
                toKeepAlive.add(callback);
            if (!queue.has(callback))
                queue.add(callback);
            return callback;
        },
        /**
         * Cancel the provided callback from running on the next frame.
         */
        cancel: (callback) => {
            nextFrame.delete(callback);
            toKeepAlive.delete(callback);
        },
        /**
         * Execute all schedule callbacks.
         */
        process: (frameData) => {
            latestFrameData = frameData;
            /**
             * If we're already processing we've probably been triggered by a flushSync
             * inside an existing process. Instead of executing, mark flushNextFrame
             * as true and ensure we flush the following frame at the end of this one.
             */
            if (isProcessing) {
                flushNextFrame = true;
                return;
            }
            isProcessing = true;
            [thisFrame, nextFrame] = [nextFrame, thisFrame];
            // Execute this frame
            thisFrame.forEach(triggerCallback);
            /**
             * If we're recording stats then
             */
            if (stepName && _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_0__.statsBuffer.value) {
                _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_0__.statsBuffer.value.frameloop[stepName].push(numCalls);
            }
            numCalls = 0;
            // Clear the frame so no callbacks remain. This is to avoid
            // memory leaks should this render step not run for a while.
            thisFrame.clear();
            isProcessing = false;
            if (flushNextFrame) {
                flushNextFrame = false;
                step.process(frameData);
            }
        },
    };
    return step;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/frameloop/sync-time.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/frameloop/sync-time.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   time: () => (/* binding */ time)
/* harmony export */ });
/* harmony import */ var _utils_GlobalConfig_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/GlobalConfig.mjs */ "./node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs");
/* harmony import */ var _frame_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");



let now;
function clearTime() {
    now = undefined;
}
/**
 * An eventloop-synchronous alternative to performance.now().
 *
 * Ensures that time measurements remain consistent within a synchronous context.
 * Usually calling performance.now() twice within the same synchronous context
 * will return different values which isn't useful for animations when we're usually
 * trying to sync animations to the same frame.
 */
const time = {
    now: () => {
        if (now === undefined) {
            time.set(_frame_mjs__WEBPACK_IMPORTED_MODULE_0__.frameData.isProcessing || _utils_GlobalConfig_mjs__WEBPACK_IMPORTED_MODULE_1__.MotionGlobalConfig.useManualTiming
                ? _frame_mjs__WEBPACK_IMPORTED_MODULE_0__.frameData.timestamp
                : performance.now());
        }
        return now;
    },
    set: (newTime) => {
        now = newTime;
        queueMicrotask(clearTime);
    },
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs":
/*!****************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VisualElementDragControls: () => (/* binding */ VisualElementDragControls),
/* harmony export */   elementDragControls: () => (/* binding */ elementDragControls)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _animation_interfaces_motion_value_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../animation/interfaces/motion-value.mjs */ "./node_modules/framer-motion/dist/es/animation/interfaces/motion-value.mjs");
/* harmony import */ var _events_add_dom_event_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../events/add-dom-event.mjs */ "./node_modules/framer-motion/dist/es/events/add-dom-event.mjs");
/* harmony import */ var _events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../events/add-pointer-event.mjs */ "./node_modules/framer-motion/dist/es/events/add-pointer-event.mjs");
/* harmony import */ var _events_event_info_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../events/event-info.mjs */ "./node_modules/framer-motion/dist/es/events/event-info.mjs");
/* harmony import */ var _projection_geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../projection/geometry/conversion.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs");
/* harmony import */ var _projection_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../projection/geometry/delta-calc.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs");
/* harmony import */ var _projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../projection/geometry/models.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/models.mjs");
/* harmony import */ var _projection_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../projection/utils/each-axis.mjs */ "./node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs");
/* harmony import */ var _projection_utils_measure_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../projection/utils/measure.mjs */ "./node_modules/framer-motion/dist/es/projection/utils/measure.mjs");
/* harmony import */ var _utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../utils/is-ref-object.mjs */ "./node_modules/framer-motion/dist/es/utils/is-ref-object.mjs");
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../utils/mix/number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../value/types/numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");
/* harmony import */ var _value_use_will_change_add_will_change_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../value/use-will-change/add-will-change.mjs */ "./node_modules/framer-motion/dist/es/value/use-will-change/add-will-change.mjs");
/* harmony import */ var _pan_PanSession_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../pan/PanSession.mjs */ "./node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs");
/* harmony import */ var _utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/constraints.mjs */ "./node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");



















const elementDragControls = new WeakMap();
/**
 *
 */
// let latestPointerEvent: PointerEvent
class VisualElementDragControls {
    constructor(visualElement) {
        this.openDragLock = null;
        this.isDragging = false;
        this.currentDirection = null;
        this.originPoint = { x: 0, y: 0 };
        /**
         * The permitted boundaries of travel, in pixels.
         */
        this.constraints = false;
        this.hasMutatedConstraints = false;
        /**
         * The per-axis resolved elastic values.
         */
        this.elastic = (0,_projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_2__.createBox)();
        this.visualElement = visualElement;
    }
    start(originEvent, { snapToCursor = false } = {}) {
        /**
         * Don't start dragging if this component is exiting
         */
        const { presenceContext } = this.visualElement;
        if (presenceContext && presenceContext.isPresent === false)
            return;
        const onSessionStart = (event) => {
            const { dragSnapToOrigin } = this.getProps();
            // Stop or pause any animations on both axis values immediately. This allows the user to throw and catch
            // the component.
            dragSnapToOrigin ? this.pauseAnimation() : this.stopAnimation();
            if (snapToCursor) {
                this.snapToCursor((0,_events_event_info_mjs__WEBPACK_IMPORTED_MODULE_3__.extractEventInfo)(event).point);
            }
        };
        const onStart = (event, info) => {
            // Attempt to grab the global drag gesture lock - maybe make this part of PanSession
            const { drag, dragPropagation, onDragStart } = this.getProps();
            if (drag && !dragPropagation) {
                if (this.openDragLock)
                    this.openDragLock();
                this.openDragLock = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.setDragLock)(drag);
                // If we don 't have the lock, don't start dragging
                if (!this.openDragLock)
                    return;
            }
            this.isDragging = true;
            this.currentDirection = null;
            this.resolveConstraints();
            if (this.visualElement.projection) {
                this.visualElement.projection.isAnimationBlocked = true;
                this.visualElement.projection.target = undefined;
            }
            /**
             * Record gesture origin
             */
            (0,_projection_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_4__.eachAxis)((axis) => {
                let current = this.getAxisMotionValue(axis).get() || 0;
                /**
                 * If the MotionValue is a percentage value convert to px
                 */
                if (_value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_5__.percent.test(current)) {
                    const { projection } = this.visualElement;
                    if (projection && projection.layout) {
                        const measuredAxis = projection.layout.layoutBox[axis];
                        if (measuredAxis) {
                            const length = (0,_projection_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_6__.calcLength)(measuredAxis);
                            current = length * (parseFloat(current) / 100);
                        }
                    }
                }
                this.originPoint[axis] = current;
            });
            // Fire onDragStart event
            if (onDragStart) {
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__.frame.postRender(() => onDragStart(event, info));
            }
            (0,_value_use_will_change_add_will_change_mjs__WEBPACK_IMPORTED_MODULE_8__.addValueToWillChange)(this.visualElement, "transform");
            const { animationState } = this.visualElement;
            animationState && animationState.setActive("whileDrag", true);
        };
        const onMove = (event, info) => {
            // latestPointerEvent = event
            const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag, } = this.getProps();
            // If we didn't successfully receive the gesture lock, early return.
            if (!dragPropagation && !this.openDragLock)
                return;
            const { offset } = info;
            // Attempt to detect drag direction if directionLock is true
            if (dragDirectionLock && this.currentDirection === null) {
                this.currentDirection = getCurrentDirection(offset);
                // If we've successfully set a direction, notify listener
                if (this.currentDirection !== null) {
                    onDirectionLock && onDirectionLock(this.currentDirection);
                }
                return;
            }
            // Update each point with the latest position
            this.updateAxis("x", info.point, offset);
            this.updateAxis("y", info.point, offset);
            /**
             * Ideally we would leave the renderer to fire naturally at the end of
             * this frame but if the element is about to change layout as the result
             * of a re-render we want to ensure the browser can read the latest
             * bounding box to ensure the pointer and element don't fall out of sync.
             */
            this.visualElement.render();
            /**
             * This must fire after the render call as it might trigger a state
             * change which itself might trigger a layout update.
             */
            onDrag && onDrag(event, info);
        };
        const onSessionEnd = (event, info) => this.stop(event, info);
        const resumeAnimation = () => (0,_projection_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_4__.eachAxis)((axis) => {
            var _a;
            return this.getAnimationState(axis) === "paused" &&
                ((_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.play());
        });
        const { dragSnapToOrigin } = this.getProps();
        this.panSession = new _pan_PanSession_mjs__WEBPACK_IMPORTED_MODULE_9__.PanSession(originEvent, {
            onSessionStart,
            onStart,
            onMove,
            onSessionEnd,
            resumeAnimation,
        }, {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin,
        });
    }
    stop(event, info) {
        const isDragging = this.isDragging;
        this.cancel();
        if (!isDragging)
            return;
        const { velocity } = info;
        this.startAnimation(velocity);
        const { onDragEnd } = this.getProps();
        if (onDragEnd) {
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__.frame.postRender(() => onDragEnd(event, info));
        }
    }
    cancel() {
        this.isDragging = false;
        const { projection, animationState } = this.visualElement;
        if (projection) {
            projection.isAnimationBlocked = false;
        }
        this.panSession && this.panSession.end();
        this.panSession = undefined;
        const { dragPropagation } = this.getProps();
        if (!dragPropagation && this.openDragLock) {
            this.openDragLock();
            this.openDragLock = null;
        }
        animationState && animationState.setActive("whileDrag", false);
    }
    updateAxis(axis, _point, offset) {
        const { drag } = this.getProps();
        // If we're not dragging this axis, do an early return.
        if (!offset || !shouldDrag(axis, drag, this.currentDirection))
            return;
        const axisValue = this.getAxisMotionValue(axis);
        let next = this.originPoint[axis] + offset[axis];
        // Apply constraints
        if (this.constraints && this.constraints[axis]) {
            next = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_10__.applyConstraints)(next, this.constraints[axis], this.elastic[axis]);
        }
        axisValue.set(next);
    }
    resolveConstraints() {
        var _a;
        const { dragConstraints, dragElastic } = this.getProps();
        const layout = this.visualElement.projection &&
            !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(false)
            : (_a = this.visualElement.projection) === null || _a === void 0 ? void 0 : _a.layout;
        const prevConstraints = this.constraints;
        if (dragConstraints && (0,_utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_11__.isRefObject)(dragConstraints)) {
            if (!this.constraints) {
                this.constraints = this.resolveRefConstraints();
            }
        }
        else {
            if (dragConstraints && layout) {
                this.constraints = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_10__.calcRelativeConstraints)(layout.layoutBox, dragConstraints);
            }
            else {
                this.constraints = false;
            }
        }
        this.elastic = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_10__.resolveDragElastic)(dragElastic);
        /**
         * If we're outputting to external MotionValues, we want to rebase the measured constraints
         * from viewport-relative to component-relative.
         */
        if (prevConstraints !== this.constraints &&
            layout &&
            this.constraints &&
            !this.hasMutatedConstraints) {
            (0,_projection_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_4__.eachAxis)((axis) => {
                if (this.constraints !== false &&
                    this.getAxisMotionValue(axis)) {
                    this.constraints[axis] = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_10__.rebaseAxisConstraints)(layout.layoutBox[axis], this.constraints[axis]);
                }
            });
        }
    }
    resolveRefConstraints() {
        const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
        if (!constraints || !(0,_utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_11__.isRefObject)(constraints))
            return false;
        const constraintsElement = constraints.current;
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.invariant)(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
        const { projection } = this.visualElement;
        // TODO
        if (!projection || !projection.layout)
            return false;
        const constraintsBox = (0,_projection_utils_measure_mjs__WEBPACK_IMPORTED_MODULE_12__.measurePageBox)(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
        let measuredConstraints = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_10__.calcViewportConstraints)(projection.layout.layoutBox, constraintsBox);
        /**
         * If there's an onMeasureDragConstraints listener we call it and
         * if different constraints are returned, set constraints to that
         */
        if (onMeasureDragConstraints) {
            const userConstraints = onMeasureDragConstraints((0,_projection_geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_13__.convertBoxToBoundingBox)(measuredConstraints));
            this.hasMutatedConstraints = !!userConstraints;
            if (userConstraints) {
                measuredConstraints = (0,_projection_geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_13__.convertBoundingBoxToBox)(userConstraints);
            }
        }
        return measuredConstraints;
    }
    startAnimation(velocity) {
        const { drag, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd, } = this.getProps();
        const constraints = this.constraints || {};
        const momentumAnimations = (0,_projection_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_4__.eachAxis)((axis) => {
            if (!shouldDrag(axis, drag, this.currentDirection)) {
                return;
            }
            let transition = (constraints && constraints[axis]) || {};
            if (dragSnapToOrigin)
                transition = { min: 0, max: 0 };
            /**
             * Overdamp the boundary spring if `dragElastic` is disabled. There's still a frame
             * of spring animations so we should look into adding a disable spring option to `inertia`.
             * We could do something here where we affect the `bounceStiffness` and `bounceDamping`
             * using the value of `dragElastic`.
             */
            const bounceStiffness = dragElastic ? 200 : 1000000;
            const bounceDamping = dragElastic ? 40 : 10000000;
            const inertia = {
                type: "inertia",
                velocity: dragMomentum ? velocity[axis] : 0,
                bounceStiffness,
                bounceDamping,
                timeConstant: 750,
                restDelta: 1,
                restSpeed: 10,
                ...dragTransition,
                ...transition,
            };
            // If we're not animating on an externally-provided `MotionValue` we can use the
            // component's animation controls which will handle interactions with whileHover (etc),
            // otherwise we just have to animate the `MotionValue` itself.
            return this.startAxisValueAnimation(axis, inertia);
        });
        // Run all animations and then resolve the new drag constraints.
        return Promise.all(momentumAnimations).then(onDragTransitionEnd);
    }
    startAxisValueAnimation(axis, transition) {
        const axisValue = this.getAxisMotionValue(axis);
        (0,_value_use_will_change_add_will_change_mjs__WEBPACK_IMPORTED_MODULE_8__.addValueToWillChange)(this.visualElement, axis);
        return axisValue.start((0,_animation_interfaces_motion_value_mjs__WEBPACK_IMPORTED_MODULE_14__.animateMotionValue)(axis, axisValue, 0, transition, this.visualElement, false));
    }
    stopAnimation() {
        (0,_projection_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_4__.eachAxis)((axis) => this.getAxisMotionValue(axis).stop());
    }
    pauseAnimation() {
        (0,_projection_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_4__.eachAxis)((axis) => { var _a; return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.pause(); });
    }
    getAnimationState(axis) {
        var _a;
        return (_a = this.getAxisMotionValue(axis).animation) === null || _a === void 0 ? void 0 : _a.state;
    }
    /**
     * Drag works differently depending on which props are provided.
     *
     * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
     * - Otherwise, we apply the delta to the x/y motion values.
     */
    getAxisMotionValue(axis) {
        const dragKey = `_drag${axis.toUpperCase()}`;
        const props = this.visualElement.getProps();
        const externalMotionValue = props[dragKey];
        return externalMotionValue
            ? externalMotionValue
            : this.visualElement.getValue(axis, (props.initial
                ? props.initial[axis]
                : undefined) || 0);
    }
    snapToCursor(point) {
        (0,_projection_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_4__.eachAxis)((axis) => {
            const { drag } = this.getProps();
            // If we're not dragging this axis, do an early return.
            if (!shouldDrag(axis, drag, this.currentDirection))
                return;
            const { projection } = this.visualElement;
            const axisValue = this.getAxisMotionValue(axis);
            if (projection && projection.layout) {
                const { min, max } = projection.layout.layoutBox[axis];
                axisValue.set(point[axis] - (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_15__.mixNumber)(min, max, 0.5));
            }
        });
    }
    /**
     * When the viewport resizes we want to check if the measured constraints
     * have changed and, if so, reposition the element within those new constraints
     * relative to where it was before the resize.
     */
    scalePositionWithinConstraints() {
        if (!this.visualElement.current)
            return;
        const { drag, dragConstraints } = this.getProps();
        const { projection } = this.visualElement;
        if (!(0,_utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_11__.isRefObject)(dragConstraints) || !projection || !this.constraints)
            return;
        /**
         * Stop current animations as there can be visual glitching if we try to do
         * this mid-animation
         */
        this.stopAnimation();
        /**
         * Record the relative position of the dragged element relative to the
         * constraints box and save as a progress value.
         */
        const boxProgress = { x: 0, y: 0 };
        (0,_projection_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_4__.eachAxis)((axis) => {
            const axisValue = this.getAxisMotionValue(axis);
            if (axisValue && this.constraints !== false) {
                const latest = axisValue.get();
                boxProgress[axis] = (0,_utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_10__.calcOrigin)({ min: latest, max: latest }, this.constraints[axis]);
            }
        });
        /**
         * Update the layout of this element and resolve the latest drag constraints
         */
        const { transformTemplate } = this.visualElement.getProps();
        this.visualElement.current.style.transform = transformTemplate
            ? transformTemplate({}, "")
            : "none";
        projection.root && projection.root.updateScroll();
        projection.updateLayout();
        this.resolveConstraints();
        /**
         * For each axis, calculate the current progress of the layout axis
         * within the new constraints.
         */
        (0,_projection_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_4__.eachAxis)((axis) => {
            if (!shouldDrag(axis, drag, null))
                return;
            /**
             * Calculate a new transform based on the previous box progress
             */
            const axisValue = this.getAxisMotionValue(axis);
            const { min, max } = this.constraints[axis];
            axisValue.set((0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_15__.mixNumber)(min, max, boxProgress[axis]));
        });
    }
    addListeners() {
        if (!this.visualElement.current)
            return;
        elementDragControls.set(this.visualElement, this);
        const element = this.visualElement.current;
        /**
         * Attach a pointerdown event listener on this DOM element to initiate drag tracking.
         */
        const stopPointerListener = (0,_events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_16__.addPointerEvent)(element, "pointerdown", (event) => {
            const { drag, dragListener = true } = this.getProps();
            drag && dragListener && this.start(event);
        });
        const measureDragConstraints = () => {
            const { dragConstraints } = this.getProps();
            if ((0,_utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_11__.isRefObject)(dragConstraints) && dragConstraints.current) {
                this.constraints = this.resolveRefConstraints();
            }
        };
        const { projection } = this.visualElement;
        const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
        if (projection && !projection.layout) {
            projection.root && projection.root.updateScroll();
            projection.updateLayout();
        }
        _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_7__.frame.read(measureDragConstraints);
        /**
         * Attach a window resize listener to scale the draggable target within its defined
         * constraints as the window resizes.
         */
        const stopResizeListener = (0,_events_add_dom_event_mjs__WEBPACK_IMPORTED_MODULE_17__.addDomEvent)(window, "resize", () => this.scalePositionWithinConstraints());
        /**
         * If the element's layout changes, calculate the delta and apply that to
         * the drag gesture's origin point.
         */
        const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
            if (this.isDragging && hasLayoutChanged) {
                (0,_projection_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_4__.eachAxis)((axis) => {
                    const motionValue = this.getAxisMotionValue(axis);
                    if (!motionValue)
                        return;
                    this.originPoint[axis] += delta[axis].translate;
                    motionValue.set(motionValue.get() + delta[axis].translate);
                });
                this.visualElement.render();
            }
        }));
        return () => {
            stopResizeListener();
            stopPointerListener();
            stopMeasureLayoutListener();
            stopLayoutUpdateListener && stopLayoutUpdateListener();
        };
    }
    getProps() {
        const props = this.visualElement.getProps();
        const { drag = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = _utils_constraints_mjs__WEBPACK_IMPORTED_MODULE_10__.defaultElastic, dragMomentum = true, } = props;
        return {
            ...props,
            drag,
            dragDirectionLock,
            dragPropagation,
            dragConstraints,
            dragElastic,
            dragMomentum,
        };
    }
}
function shouldDrag(direction, drag, currentDirection) {
    return ((drag === true || drag === direction) &&
        (currentDirection === null || currentDirection === direction));
}
/**
 * Based on an x/y offset determine the current drag direction. If both axis' offsets are lower
 * than the provided threshold, return `null`.
 *
 * @param offset - The x/y offset from origin.
 * @param lockThreshold - (Optional) - the minimum absolute offset before we can determine a drag direction.
 */
function getCurrentDirection(offset, lockThreshold = 10) {
    let direction = null;
    if (Math.abs(offset.y) > lockThreshold) {
        direction = "y";
    }
    else if (Math.abs(offset.x) > lockThreshold) {
        direction = "x";
    }
    return direction;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/gestures/drag/index.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/gestures/drag/index.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DragGesture: () => (/* binding */ DragGesture)
/* harmony export */ });
/* harmony import */ var _motion_features_Feature_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../motion/features/Feature.mjs */ "./node_modules/framer-motion/dist/es/motion/features/Feature.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _VisualElementDragControls_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./VisualElementDragControls.mjs */ "./node_modules/framer-motion/dist/es/gestures/drag/VisualElementDragControls.mjs");




class DragGesture extends _motion_features_Feature_mjs__WEBPACK_IMPORTED_MODULE_1__.Feature {
    constructor(node) {
        super(node);
        this.removeGroupControls = motion_utils__WEBPACK_IMPORTED_MODULE_0__.noop;
        this.removeListeners = motion_utils__WEBPACK_IMPORTED_MODULE_0__.noop;
        this.controls = new _VisualElementDragControls_mjs__WEBPACK_IMPORTED_MODULE_2__.VisualElementDragControls(node);
    }
    mount() {
        // If we've been provided a DragControls for manual control over the drag gesture,
        // subscribe this component to it on mount.
        const { dragControls } = this.node.getProps();
        if (dragControls) {
            this.removeGroupControls = dragControls.subscribe(this.controls);
        }
        this.removeListeners = this.controls.addListeners() || motion_utils__WEBPACK_IMPORTED_MODULE_0__.noop;
    }
    unmount() {
        this.removeGroupControls();
        this.removeListeners();
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/gestures/drag/utils/constraints.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyConstraints: () => (/* binding */ applyConstraints),
/* harmony export */   calcOrigin: () => (/* binding */ calcOrigin),
/* harmony export */   calcRelativeAxisConstraints: () => (/* binding */ calcRelativeAxisConstraints),
/* harmony export */   calcRelativeConstraints: () => (/* binding */ calcRelativeConstraints),
/* harmony export */   calcViewportAxisConstraints: () => (/* binding */ calcViewportAxisConstraints),
/* harmony export */   calcViewportConstraints: () => (/* binding */ calcViewportConstraints),
/* harmony export */   defaultElastic: () => (/* binding */ defaultElastic),
/* harmony export */   rebaseAxisConstraints: () => (/* binding */ rebaseAxisConstraints),
/* harmony export */   resolveAxisElastic: () => (/* binding */ resolveAxisElastic),
/* harmony export */   resolveDragElastic: () => (/* binding */ resolveDragElastic),
/* harmony export */   resolvePointElastic: () => (/* binding */ resolvePointElastic)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _projection_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../projection/geometry/delta-calc.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs");
/* harmony import */ var _utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/clamp.mjs */ "./node_modules/framer-motion/dist/es/utils/clamp.mjs");
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/mix/number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");





/**
 * Apply constraints to a point. These constraints are both physical along an
 * axis, and an elastic factor that determines how much to constrain the point
 * by if it does lie outside the defined parameters.
 */
function applyConstraints(point, { min, max }, elastic) {
    if (min !== undefined && point < min) {
        // If we have a min point defined, and this is outside of that, constrain
        point = elastic
            ? (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__.mixNumber)(min, point, elastic.min)
            : Math.max(point, min);
    }
    else if (max !== undefined && point > max) {
        // If we have a max point defined, and this is outside of that, constrain
        point = elastic
            ? (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__.mixNumber)(max, point, elastic.max)
            : Math.min(point, max);
    }
    return point;
}
/**
 * Calculate constraints in terms of the viewport when defined relatively to the
 * measured axis. This is measured from the nearest edge, so a max constraint of 200
 * on an axis with a max value of 300 would return a constraint of 500 - axis length
 */
function calcRelativeAxisConstraints(axis, min, max) {
    return {
        min: min !== undefined ? axis.min + min : undefined,
        max: max !== undefined
            ? axis.max + max - (axis.max - axis.min)
            : undefined,
    };
}
/**
 * Calculate constraints in terms of the viewport when
 * defined relatively to the measured bounding box.
 */
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
    return {
        x: calcRelativeAxisConstraints(layoutBox.x, left, right),
        y: calcRelativeAxisConstraints(layoutBox.y, top, bottom),
    };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative axis
 */
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
    let min = constraintsAxis.min - layoutAxis.min;
    let max = constraintsAxis.max - layoutAxis.max;
    // If the constraints axis is actually smaller than the layout axis then we can
    // flip the constraints
    if (constraintsAxis.max - constraintsAxis.min <
        layoutAxis.max - layoutAxis.min) {
        [min, max] = [max, min];
    }
    return { min, max };
}
/**
 * Calculate viewport constraints when defined as another viewport-relative box
 */
function calcViewportConstraints(layoutBox, constraintsBox) {
    return {
        x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
        y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y),
    };
}
/**
 * Calculate a transform origin relative to the source axis, between 0-1, that results
 * in an asthetically pleasing scale/transform needed to project from source to target.
 */
function calcOrigin(source, target) {
    let origin = 0.5;
    const sourceLength = (0,_projection_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_2__.calcLength)(source);
    const targetLength = (0,_projection_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_2__.calcLength)(target);
    if (targetLength > sourceLength) {
        origin = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.progress)(target.min, target.max - sourceLength, source.min);
    }
    else if (sourceLength > targetLength) {
        origin = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.progress)(source.min, source.max - targetLength, target.min);
    }
    return (0,_utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_3__.clamp)(0, 1, origin);
}
/**
 * Rebase the calculated viewport constraints relative to the layout.min point.
 */
function rebaseAxisConstraints(layout, constraints) {
    const relativeConstraints = {};
    if (constraints.min !== undefined) {
        relativeConstraints.min = constraints.min - layout.min;
    }
    if (constraints.max !== undefined) {
        relativeConstraints.max = constraints.max - layout.min;
    }
    return relativeConstraints;
}
const defaultElastic = 0.35;
/**
 * Accepts a dragElastic prop and returns resolved elastic values for each axis.
 */
function resolveDragElastic(dragElastic = defaultElastic) {
    if (dragElastic === false) {
        dragElastic = 0;
    }
    else if (dragElastic === true) {
        dragElastic = defaultElastic;
    }
    return {
        x: resolveAxisElastic(dragElastic, "left", "right"),
        y: resolveAxisElastic(dragElastic, "top", "bottom"),
    };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
    return {
        min: resolvePointElastic(dragElastic, minLabel),
        max: resolvePointElastic(dragElastic, maxLabel),
    };
}
function resolvePointElastic(dragElastic, label) {
    return typeof dragElastic === "number"
        ? dragElastic
        : dragElastic[label] || 0;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/gestures/focus.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/gestures/focus.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusGesture: () => (/* binding */ FocusGesture)
/* harmony export */ });
/* harmony import */ var _events_add_dom_event_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/add-dom-event.mjs */ "./node_modules/framer-motion/dist/es/events/add-dom-event.mjs");
/* harmony import */ var _motion_features_Feature_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../motion/features/Feature.mjs */ "./node_modules/framer-motion/dist/es/motion/features/Feature.mjs");
/* harmony import */ var _utils_pipe_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/pipe.mjs */ "./node_modules/framer-motion/dist/es/utils/pipe.mjs");




class FocusGesture extends _motion_features_Feature_mjs__WEBPACK_IMPORTED_MODULE_0__.Feature {
    constructor() {
        super(...arguments);
        this.isActive = false;
    }
    onFocus() {
        let isFocusVisible = false;
        /**
         * If this element doesn't match focus-visible then don't
         * apply whileHover. But, if matches throws that focus-visible
         * is not a valid selector then in that browser outline styles will be applied
         * to the element by default and we want to match that behaviour with whileFocus.
         */
        try {
            isFocusVisible = this.node.current.matches(":focus-visible");
        }
        catch (e) {
            isFocusVisible = true;
        }
        if (!isFocusVisible || !this.node.animationState)
            return;
        this.node.animationState.setActive("whileFocus", true);
        this.isActive = true;
    }
    onBlur() {
        if (!this.isActive || !this.node.animationState)
            return;
        this.node.animationState.setActive("whileFocus", false);
        this.isActive = false;
    }
    mount() {
        this.unmount = (0,_utils_pipe_mjs__WEBPACK_IMPORTED_MODULE_1__.pipe)((0,_events_add_dom_event_mjs__WEBPACK_IMPORTED_MODULE_2__.addDomEvent)(this.node.current, "focus", () => this.onFocus()), (0,_events_add_dom_event_mjs__WEBPACK_IMPORTED_MODULE_2__.addDomEvent)(this.node.current, "blur", () => this.onBlur()));
    }
    unmount() { }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/gestures/hover.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/gestures/hover.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HoverGesture: () => (/* binding */ HoverGesture)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var _events_event_info_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/event-info.mjs */ "./node_modules/framer-motion/dist/es/events/event-info.mjs");
/* harmony import */ var _motion_features_Feature_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../motion/features/Feature.mjs */ "./node_modules/framer-motion/dist/es/motion/features/Feature.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");





function handleHoverEvent(node, event, lifecycle) {
    const { props } = node;
    if (node.animationState && props.whileHover) {
        node.animationState.setActive("whileHover", lifecycle === "Start");
    }
    const eventName = ("onHover" + lifecycle);
    const callback = props[eventName];
    if (callback) {
        _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__.frame.postRender(() => callback(event, (0,_events_event_info_mjs__WEBPACK_IMPORTED_MODULE_2__.extractEventInfo)(event)));
    }
}
class HoverGesture extends _motion_features_Feature_mjs__WEBPACK_IMPORTED_MODULE_3__.Feature {
    mount() {
        const { current } = this.node;
        if (!current)
            return;
        this.unmount = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.hover)(current, (_element, startEvent) => {
            handleHoverEvent(this.node, startEvent, "Start");
            return (endEvent) => handleHoverEvent(this.node, endEvent, "End");
        });
    }
    unmount() { }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanSession: () => (/* binding */ PanSession)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../events/add-pointer-event.mjs */ "./node_modules/framer-motion/dist/es/events/add-pointer-event.mjs");
/* harmony import */ var _events_event_info_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/event-info.mjs */ "./node_modules/framer-motion/dist/es/events/event-info.mjs");
/* harmony import */ var _utils_distance_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/distance.mjs */ "./node_modules/framer-motion/dist/es/utils/distance.mjs");
/* harmony import */ var _utils_pipe_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/pipe.mjs */ "./node_modules/framer-motion/dist/es/utils/pipe.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");








/**
 * @internal
 */
class PanSession {
    constructor(event, handlers, { transformPagePoint, dragSnapToOrigin = false } = {}) {
        /**
         * @internal
         */
        this.startEvent = null;
        /**
         * @internal
         */
        this.lastMoveEvent = null;
        /**
         * @internal
         */
        this.lastMoveEventInfo = null;
        /**
         * @internal
         */
        this.handlers = {};
        this.updatePoint = () => {
            if (!(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const info = getPanInfo(this.lastMoveEventInfo, this.history);
            const isPanStarted = this.startEvent !== null;
            // Only start panning if the offset is larger than 3 pixels. If we make it
            // any larger than this we'll want to reset the pointer history
            // on the first update to avoid visual snapping to the cursoe.
            const isDistancePastThreshold = (0,_utils_distance_mjs__WEBPACK_IMPORTED_MODULE_2__.distance2D)(info.offset, { x: 0, y: 0 }) >= 3;
            if (!isPanStarted && !isDistancePastThreshold)
                return;
            const { point } = info;
            const { timestamp } = _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData;
            this.history.push({ ...point, timestamp });
            const { onStart, onMove } = this.handlers;
            if (!isPanStarted) {
                onStart && onStart(this.lastMoveEvent, info);
                this.startEvent = this.lastMoveEvent;
            }
            onMove && onMove(this.lastMoveEvent, info);
        };
        this.handlePointerMove = (event, info) => {
            if (event.target instanceof Element &&
                event.target.hasPointerCapture &&
                event.pointerId !== undefined) {
                try {
                    if (!event.target.hasPointerCapture(event.pointerId)) {
                        return;
                    }
                }
                catch (e) { }
            }
            this.lastMoveEvent = event;
            this.lastMoveEventInfo = transformPoint(info, this.transformPagePoint);
            // Throttle mouse move event to once per frame
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frame.update(this.updatePoint, true);
        };
        this.handlePointerUp = (event, info) => {
            (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.capturePointer)(event, "release");
            this.end();
            const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
            if (this.dragSnapToOrigin)
                resumeAnimation && resumeAnimation();
            if (!(this.lastMoveEvent && this.lastMoveEventInfo))
                return;
            const panInfo = getPanInfo(event.type === "pointercancel" ||
                event.type === "lostpointercapture"
                ? this.lastMoveEventInfo
                : transformPoint(info, this.transformPagePoint), this.history);
            if (this.startEvent && onEnd) {
                onEnd(event, panInfo);
            }
            onSessionEnd && onSessionEnd(event, panInfo);
        };
        // If we have more than one touch, don't start detecting this gesture
        if (!(0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.isPrimaryPointer)(event))
            return;
        this.dragSnapToOrigin = dragSnapToOrigin;
        this.handlers = handlers;
        this.transformPagePoint = transformPagePoint;
        const info = (0,_events_event_info_mjs__WEBPACK_IMPORTED_MODULE_4__.extractEventInfo)(event);
        const initialInfo = transformPoint(info, this.transformPagePoint);
        const { point } = initialInfo;
        const { timestamp } = _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData;
        this.history = [{ ...point, timestamp }];
        const { onSessionStart } = handlers;
        onSessionStart &&
            onSessionStart(event, getPanInfo(initialInfo, this.history));
        (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.capturePointer)(event, "set");
        this.removeListeners = (0,_utils_pipe_mjs__WEBPACK_IMPORTED_MODULE_5__.pipe)((0,_events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_6__.addPointerEvent)(event.currentTarget, "pointermove", this.handlePointerMove), (0,_events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_6__.addPointerEvent)(event.currentTarget, "pointerup", this.handlePointerUp), (0,_events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_6__.addPointerEvent)(event.currentTarget, "pointercancel", this.handlePointerUp), (0,_events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_6__.addPointerEvent)(event.currentTarget, "lostpointercapture", this.handlePointerUp));
    }
    updateHandlers(handlers) {
        this.handlers = handlers;
    }
    end() {
        this.removeListeners && this.removeListeners();
        (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.cancelFrame)(this.updatePoint);
    }
}
function transformPoint(info, transformPagePoint) {
    return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
    return { x: a.x - b.x, y: a.y - b.y };
}
function getPanInfo({ point }, history) {
    return {
        point,
        delta: subtractPoint(point, lastDevicePoint(history)),
        offset: subtractPoint(point, startDevicePoint(history)),
        velocity: getVelocity(history, 0.1),
    };
}
function startDevicePoint(history) {
    return history[0];
}
function lastDevicePoint(history) {
    return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
    if (history.length < 2) {
        return { x: 0, y: 0 };
    }
    let i = history.length - 1;
    let timestampedPoint = null;
    const lastPoint = lastDevicePoint(history);
    while (i >= 0) {
        timestampedPoint = history[i];
        if (lastPoint.timestamp - timestampedPoint.timestamp >
            (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.secondsToMilliseconds)(timeDelta)) {
            break;
        }
        i--;
    }
    if (!timestampedPoint) {
        return { x: 0, y: 0 };
    }
    const time = (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.millisecondsToSeconds)(lastPoint.timestamp - timestampedPoint.timestamp);
    if (time === 0) {
        return { x: 0, y: 0 };
    }
    const currentVelocity = {
        x: (lastPoint.x - timestampedPoint.x) / time,
        y: (lastPoint.y - timestampedPoint.y) / time,
    };
    if (currentVelocity.x === Infinity) {
        currentVelocity.x = 0;
    }
    if (currentVelocity.y === Infinity) {
        currentVelocity.y = 0;
    }
    return currentVelocity;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/gestures/pan/index.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/gestures/pan/index.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanGesture: () => (/* binding */ PanGesture)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../events/add-pointer-event.mjs */ "./node_modules/framer-motion/dist/es/events/add-pointer-event.mjs");
/* harmony import */ var _motion_features_Feature_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../motion/features/Feature.mjs */ "./node_modules/framer-motion/dist/es/motion/features/Feature.mjs");
/* harmony import */ var _PanSession_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PanSession.mjs */ "./node_modules/framer-motion/dist/es/gestures/pan/PanSession.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");






const asyncHandler = (handler) => (event, info) => {
    if (handler) {
        _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__.frame.postRender(() => handler(event, info));
    }
};
class PanGesture extends _motion_features_Feature_mjs__WEBPACK_IMPORTED_MODULE_2__.Feature {
    constructor() {
        super(...arguments);
        this.removePointerDownListener = motion_utils__WEBPACK_IMPORTED_MODULE_0__.noop;
    }
    onPointerDown(pointerDownEvent) {
        this.session = new _PanSession_mjs__WEBPACK_IMPORTED_MODULE_3__.PanSession(pointerDownEvent, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
        });
    }
    createPanHandlers() {
        const { onPanSessionStart, onPanStart, onPan, onPanEnd } = this.node.getProps();
        return {
            onSessionStart: asyncHandler(onPanSessionStart),
            onStart: asyncHandler(onPanStart),
            onMove: onPan,
            onEnd: (event, info) => {
                delete this.session;
                if (onPanEnd) {
                    _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__.frame.postRender(() => onPanEnd(event, info));
                }
            },
        };
    }
    mount() {
        this.removePointerDownListener = (0,_events_add_pointer_event_mjs__WEBPACK_IMPORTED_MODULE_4__.addPointerEvent)(this.node.current, "pointerdown", (event) => this.onPointerDown(event));
    }
    update() {
        this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
        this.removePointerDownListener();
        this.session && this.session.end();
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/gestures/press.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/gestures/press.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PressGesture: () => (/* binding */ PressGesture)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var _events_event_info_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../events/event-info.mjs */ "./node_modules/framer-motion/dist/es/events/event-info.mjs");
/* harmony import */ var _motion_features_Feature_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../motion/features/Feature.mjs */ "./node_modules/framer-motion/dist/es/motion/features/Feature.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");





function handlePressEvent(node, event, lifecycle) {
    const { props } = node;
    if (node.current instanceof HTMLButtonElement && node.current.disabled) {
        return;
    }
    if (node.animationState && props.whileTap) {
        node.animationState.setActive("whileTap", lifecycle === "Start");
    }
    const eventName = ("onTap" + (lifecycle === "End" ? "" : lifecycle));
    const callback = props[eventName];
    if (callback) {
        _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__.frame.postRender(() => callback(event, (0,_events_event_info_mjs__WEBPACK_IMPORTED_MODULE_2__.extractEventInfo)(event)));
    }
}
class PressGesture extends _motion_features_Feature_mjs__WEBPACK_IMPORTED_MODULE_3__.Feature {
    mount() {
        const { current } = this.node;
        if (!current)
            return;
        this.unmount = (0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.press)(current, (_element, startEvent) => {
            handlePressEvent(this.node, startEvent, "Start");
            return (endEvent, { success }) => handlePressEvent(this.node, endEvent, success ? "End" : "Cancel");
        }, { useGlobalTarget: this.node.props.globalTapTarget });
    }
    unmount() { }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/Feature.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/Feature.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Feature: () => (/* binding */ Feature)
/* harmony export */ });
class Feature {
    constructor(node) {
        this.isMounted = false;
        this.node = node;
    }
    update() { }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExitAnimationFeature: () => (/* binding */ ExitAnimationFeature)
/* harmony export */ });
/* harmony import */ var _Feature_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Feature.mjs */ "./node_modules/framer-motion/dist/es/motion/features/Feature.mjs");


let id = 0;
class ExitAnimationFeature extends _Feature_mjs__WEBPACK_IMPORTED_MODULE_0__.Feature {
    constructor() {
        super(...arguments);
        this.id = id++;
    }
    update() {
        if (!this.node.presenceContext)
            return;
        const { isPresent, onExitComplete } = this.node.presenceContext;
        const { isPresent: prevIsPresent } = this.node.prevPresenceContext || {};
        if (!this.node.animationState || isPresent === prevIsPresent) {
            return;
        }
        const exitAnimation = this.node.animationState.setActive("exit", !isPresent);
        if (onExitComplete && !isPresent) {
            exitAnimation.then(() => {
                onExitComplete(this.id);
            });
        }
    }
    mount() {
        const { register, onExitComplete } = this.node.presenceContext || {};
        if (onExitComplete) {
            onExitComplete(this.id);
        }
        if (register) {
            this.unmount = register(this.id);
        }
    }
    unmount() { }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/animation/index.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/animation/index.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnimationFeature: () => (/* binding */ AnimationFeature)
/* harmony export */ });
/* harmony import */ var _animation_utils_is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../animation/utils/is-animation-controls.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs");
/* harmony import */ var _render_utils_animation_state_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../render/utils/animation-state.mjs */ "./node_modules/framer-motion/dist/es/render/utils/animation-state.mjs");
/* harmony import */ var _Feature_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Feature.mjs */ "./node_modules/framer-motion/dist/es/motion/features/Feature.mjs");




class AnimationFeature extends _Feature_mjs__WEBPACK_IMPORTED_MODULE_0__.Feature {
    /**
     * We dynamically generate the AnimationState manager as it contains a reference
     * to the underlying animation library. We only want to load that if we load this,
     * so people can optionally code split it out using the `m` component.
     */
    constructor(node) {
        super(node);
        node.animationState || (node.animationState = (0,_render_utils_animation_state_mjs__WEBPACK_IMPORTED_MODULE_1__.createAnimationState)(node));
    }
    updateAnimationControlsSubscription() {
        const { animate } = this.node.getProps();
        if ((0,_animation_utils_is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_2__.isAnimationControls)(animate)) {
            this.unmountControls = animate.subscribe(this.node);
        }
    }
    /**
     * Subscribe any provided AnimationControls to the component's VisualElement
     */
    mount() {
        this.updateAnimationControlsSubscription();
    }
    update() {
        const { animate } = this.node.getProps();
        const { animate: prevAnimate } = this.node.prevProps || {};
        if (animate !== prevAnimate) {
            this.updateAnimationControlsSubscription();
        }
    }
    unmount() {
        var _a;
        this.node.animationState.reset();
        (_a = this.unmountControls) === null || _a === void 0 ? void 0 : _a.call(this);
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/animations.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/animations.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animations: () => (/* binding */ animations)
/* harmony export */ });
/* harmony import */ var _animation_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation/index.mjs */ "./node_modules/framer-motion/dist/es/motion/features/animation/index.mjs");
/* harmony import */ var _animation_exit_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animation/exit.mjs */ "./node_modules/framer-motion/dist/es/motion/features/animation/exit.mjs");



const animations = {
    animation: {
        Feature: _animation_index_mjs__WEBPACK_IMPORTED_MODULE_0__.AnimationFeature,
    },
    exit: {
        Feature: _animation_exit_mjs__WEBPACK_IMPORTED_MODULE_1__.ExitAnimationFeature,
    },
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/definitions.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/definitions.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   featureDefinitions: () => (/* binding */ featureDefinitions)
/* harmony export */ });
const featureProps = {
    animation: [
        "animate",
        "variants",
        "whileHover",
        "whileTap",
        "exit",
        "whileInView",
        "whileFocus",
        "whileDrag",
    ],
    exit: ["exit"],
    drag: ["drag", "dragControls"],
    focus: ["whileFocus"],
    hover: ["whileHover", "onHoverStart", "onHoverEnd"],
    tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
    pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
    inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
    layout: ["layout", "layoutId"],
};
const featureDefinitions = {};
for (const key in featureProps) {
    featureDefinitions[key] = {
        isEnabled: (props) => featureProps[key].some((name) => !!props[name]),
    };
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/drag.mjs":
/*!*********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/drag.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drag: () => (/* binding */ drag)
/* harmony export */ });
/* harmony import */ var _gestures_drag_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../gestures/drag/index.mjs */ "./node_modules/framer-motion/dist/es/gestures/drag/index.mjs");
/* harmony import */ var _gestures_pan_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../gestures/pan/index.mjs */ "./node_modules/framer-motion/dist/es/gestures/pan/index.mjs");
/* harmony import */ var _layout_MeasureLayout_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout/MeasureLayout.mjs */ "./node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs");
/* harmony import */ var _projection_node_HTMLProjectionNode_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../projection/node/HTMLProjectionNode.mjs */ "./node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs");





const drag = {
    pan: {
        Feature: _gestures_pan_index_mjs__WEBPACK_IMPORTED_MODULE_0__.PanGesture,
    },
    drag: {
        Feature: _gestures_drag_index_mjs__WEBPACK_IMPORTED_MODULE_1__.DragGesture,
        ProjectionNode: _projection_node_HTMLProjectionNode_mjs__WEBPACK_IMPORTED_MODULE_2__.HTMLProjectionNode,
        MeasureLayout: _layout_MeasureLayout_mjs__WEBPACK_IMPORTED_MODULE_3__.MeasureLayout,
    },
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/gestures.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/gestures.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gestureAnimations: () => (/* binding */ gestureAnimations)
/* harmony export */ });
/* harmony import */ var _gestures_hover_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../gestures/hover.mjs */ "./node_modules/framer-motion/dist/es/gestures/hover.mjs");
/* harmony import */ var _gestures_focus_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../gestures/focus.mjs */ "./node_modules/framer-motion/dist/es/gestures/focus.mjs");
/* harmony import */ var _gestures_press_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../gestures/press.mjs */ "./node_modules/framer-motion/dist/es/gestures/press.mjs");
/* harmony import */ var _viewport_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewport/index.mjs */ "./node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs");





const gestureAnimations = {
    inView: {
        Feature: _viewport_index_mjs__WEBPACK_IMPORTED_MODULE_0__.InViewFeature,
    },
    tap: {
        Feature: _gestures_press_mjs__WEBPACK_IMPORTED_MODULE_1__.PressGesture,
    },
    focus: {
        Feature: _gestures_focus_mjs__WEBPACK_IMPORTED_MODULE_2__.FocusGesture,
    },
    hover: {
        Feature: _gestures_hover_mjs__WEBPACK_IMPORTED_MODULE_3__.HoverGesture,
    },
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/layout.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/layout.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   layout: () => (/* binding */ layout)
/* harmony export */ });
/* harmony import */ var _projection_node_HTMLProjectionNode_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../projection/node/HTMLProjectionNode.mjs */ "./node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs");
/* harmony import */ var _layout_MeasureLayout_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layout/MeasureLayout.mjs */ "./node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs");



const layout = {
    layout: {
        ProjectionNode: _projection_node_HTMLProjectionNode_mjs__WEBPACK_IMPORTED_MODULE_0__.HTMLProjectionNode,
        MeasureLayout: _layout_MeasureLayout_mjs__WEBPACK_IMPORTED_MODULE_1__.MeasureLayout,
    },
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs":
/*!*************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/layout/MeasureLayout.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MeasureLayout: () => (/* binding */ MeasureLayout)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _components_AnimatePresence_use_presence_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/AnimatePresence/use-presence.mjs */ "./node_modules/framer-motion/dist/es/components/AnimatePresence/use-presence.mjs");
/* harmony import */ var _context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../context/LayoutGroupContext.mjs */ "./node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs");
/* harmony import */ var _context_SwitchLayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../context/SwitchLayoutGroupContext.mjs */ "./node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs");
/* harmony import */ var _projection_node_state_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../projection/node/state.mjs */ "./node_modules/framer-motion/dist/es/projection/node/state.mjs");
/* harmony import */ var _projection_styles_scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../projection/styles/scale-border-radius.mjs */ "./node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs");
/* harmony import */ var _projection_styles_scale_box_shadow_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../projection/styles/scale-box-shadow.mjs */ "./node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs");
/* harmony import */ var _projection_styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../projection/styles/scale-correction.mjs */ "./node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs");
/* harmony import */ var _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../frameloop/microtask.mjs */ "./node_modules/framer-motion/dist/es/frameloop/microtask.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");
"use client";












class MeasureLayoutWithContext extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
    /**
     * This only mounts projection nodes for components that
     * need measuring, we might want to do it for all components
     * in order to incorporate transforms
     */
    componentDidMount() {
        const { visualElement, layoutGroup, switchLayoutGroup, layoutId } = this.props;
        const { projection } = visualElement;
        (0,_projection_styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_2__.addScaleCorrector)(defaultScaleCorrectors);
        if (projection) {
            if (layoutGroup.group)
                layoutGroup.group.add(projection);
            if (switchLayoutGroup && switchLayoutGroup.register && layoutId) {
                switchLayoutGroup.register(projection);
            }
            projection.root.didUpdate();
            projection.addEventListener("animationComplete", () => {
                this.safeToRemove();
            });
            projection.setOptions({
                ...projection.options,
                onExitComplete: () => this.safeToRemove(),
            });
        }
        _projection_node_state_mjs__WEBPACK_IMPORTED_MODULE_3__.globalProjectionState.hasEverUpdated = true;
    }
    getSnapshotBeforeUpdate(prevProps) {
        const { layoutDependency, visualElement, drag, isPresent } = this.props;
        const projection = visualElement.projection;
        if (!projection)
            return null;
        /**
         * TODO: We use this data in relegate to determine whether to
         * promote a previous element. There's no guarantee its presence data
         * will have updated by this point - if a bug like this arises it will
         * have to be that we markForRelegation and then find a new lead some other way,
         * perhaps in didUpdate
         */
        projection.isPresent = isPresent;
        if (drag ||
            prevProps.layoutDependency !== layoutDependency ||
            layoutDependency === undefined) {
            projection.willUpdate();
        }
        else {
            this.safeToRemove();
        }
        if (prevProps.isPresent !== isPresent) {
            if (isPresent) {
                projection.promote();
            }
            else if (!projection.relegate()) {
                /**
                 * If there's another stack member taking over from this one,
                 * it's in charge of the exit animation and therefore should
                 * be in charge of the safe to remove. Otherwise we call it here.
                 */
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_4__.frame.postRender(() => {
                    const stack = projection.getStack();
                    if (!stack || !stack.members.length) {
                        this.safeToRemove();
                    }
                });
            }
        }
        return null;
    }
    componentDidUpdate() {
        const { projection } = this.props.visualElement;
        if (projection) {
            projection.root.didUpdate();
            _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_5__.microtask.postRender(() => {
                if (!projection.currentAnimation && projection.isLead()) {
                    this.safeToRemove();
                }
            });
        }
    }
    componentWillUnmount() {
        const { visualElement, layoutGroup, switchLayoutGroup: promoteContext, } = this.props;
        const { projection } = visualElement;
        if (projection) {
            projection.scheduleCheckAfterUnmount();
            if (layoutGroup && layoutGroup.group)
                layoutGroup.group.remove(projection);
            if (promoteContext && promoteContext.deregister)
                promoteContext.deregister(projection);
        }
    }
    safeToRemove() {
        const { safeToRemove } = this.props;
        safeToRemove && safeToRemove();
    }
    render() {
        return null;
    }
}
function MeasureLayout(props) {
    const [isPresent, safeToRemove] = (0,_components_AnimatePresence_use_presence_mjs__WEBPACK_IMPORTED_MODULE_6__.usePresence)();
    const layoutGroup = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_7__.LayoutGroupContext);
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MeasureLayoutWithContext, { ...props, layoutGroup: layoutGroup, switchLayoutGroup: (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_context_SwitchLayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_8__.SwitchLayoutGroupContext), isPresent: isPresent, safeToRemove: safeToRemove }));
}
const defaultScaleCorrectors = {
    borderRadius: {
        ..._projection_styles_scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_9__.correctBorderRadius,
        applyTo: [
            "borderTopLeftRadius",
            "borderTopRightRadius",
            "borderBottomLeftRadius",
            "borderBottomRightRadius",
        ],
    },
    borderTopLeftRadius: _projection_styles_scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_9__.correctBorderRadius,
    borderTopRightRadius: _projection_styles_scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_9__.correctBorderRadius,
    borderBottomLeftRadius: _projection_styles_scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_9__.correctBorderRadius,
    borderBottomRightRadius: _projection_styles_scale_border_radius_mjs__WEBPACK_IMPORTED_MODULE_9__.correctBorderRadius,
    boxShadow: _projection_styles_scale_box_shadow_mjs__WEBPACK_IMPORTED_MODULE_10__.correctBoxShadow,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/load-features.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/load-features.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadFeatures: () => (/* binding */ loadFeatures)
/* harmony export */ });
/* harmony import */ var _definitions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./definitions.mjs */ "./node_modules/framer-motion/dist/es/motion/features/definitions.mjs");


function loadFeatures(features) {
    for (const key in features) {
        _definitions_mjs__WEBPACK_IMPORTED_MODULE_0__.featureDefinitions[key] = {
            ..._definitions_mjs__WEBPACK_IMPORTED_MODULE_0__.featureDefinitions[key],
            ...features[key],
        };
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/viewport/index.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InViewFeature: () => (/* binding */ InViewFeature)
/* harmony export */ });
/* harmony import */ var _Feature_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Feature.mjs */ "./node_modules/framer-motion/dist/es/motion/features/Feature.mjs");
/* harmony import */ var _observers_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./observers.mjs */ "./node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs");



const thresholdNames = {
    some: 0,
    all: 1,
};
class InViewFeature extends _Feature_mjs__WEBPACK_IMPORTED_MODULE_0__.Feature {
    constructor() {
        super(...arguments);
        this.hasEnteredView = false;
        this.isInView = false;
    }
    startObserver() {
        this.unmount();
        const { viewport = {} } = this.node.getProps();
        const { root, margin: rootMargin, amount = "some", once } = viewport;
        const options = {
            root: root ? root.current : undefined,
            rootMargin,
            threshold: typeof amount === "number" ? amount : thresholdNames[amount],
        };
        const onIntersectionUpdate = (entry) => {
            const { isIntersecting } = entry;
            /**
             * If there's been no change in the viewport state, early return.
             */
            if (this.isInView === isIntersecting)
                return;
            this.isInView = isIntersecting;
            /**
             * Handle hasEnteredView. If this is only meant to run once, and
             * element isn't visible, early return. Otherwise set hasEnteredView to true.
             */
            if (once && !isIntersecting && this.hasEnteredView) {
                return;
            }
            else if (isIntersecting) {
                this.hasEnteredView = true;
            }
            if (this.node.animationState) {
                this.node.animationState.setActive("whileInView", isIntersecting);
            }
            /**
             * Use the latest committed props rather than the ones in scope
             * when this observer is created
             */
            const { onViewportEnter, onViewportLeave } = this.node.getProps();
            const callback = isIntersecting ? onViewportEnter : onViewportLeave;
            callback && callback(entry);
        };
        return (0,_observers_mjs__WEBPACK_IMPORTED_MODULE_1__.observeIntersection)(this.node.current, options, onIntersectionUpdate);
    }
    mount() {
        this.startObserver();
    }
    update() {
        if (typeof IntersectionObserver === "undefined")
            return;
        const { props, prevProps } = this.node;
        const hasOptionsChanged = ["amount", "margin", "root"].some(hasViewportOptionChanged(props, prevProps));
        if (hasOptionsChanged) {
            this.startObserver();
        }
    }
    unmount() { }
}
function hasViewportOptionChanged({ viewport = {} }, { viewport: prevViewport = {} } = {}) {
    return (name) => viewport[name] !== prevViewport[name];
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/features/viewport/observers.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observeIntersection: () => (/* binding */ observeIntersection)
/* harmony export */ });
/**
 * Map an IntersectionHandler callback to an element. We only ever make one handler for one
 * element, so even though these handlers might all be triggered by different
 * observers, we can keep them in the same map.
 */
const observerCallbacks = new WeakMap();
/**
 * Multiple observers can be created for multiple element/document roots. Each with
 * different settings. So here we store dictionaries of observers to each root,
 * using serialised settings (threshold/margin) as lookup keys.
 */
const observers = new WeakMap();
const fireObserverCallback = (entry) => {
    const callback = observerCallbacks.get(entry.target);
    callback && callback(entry);
};
const fireAllObserverCallbacks = (entries) => {
    entries.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root, ...options }) {
    const lookupRoot = root || document;
    /**
     * If we don't have an observer lookup map for this root, create one.
     */
    if (!observers.has(lookupRoot)) {
        observers.set(lookupRoot, {});
    }
    const rootObservers = observers.get(lookupRoot);
    const key = JSON.stringify(options);
    /**
     * If we don't have an observer for this combination of root and settings,
     * create one.
     */
    if (!rootObservers[key]) {
        rootObservers[key] = new IntersectionObserver(fireAllObserverCallbacks, { root, ...options });
    }
    return rootObservers[key];
}
function observeIntersection(element, options, callback) {
    const rootInteresectionObserver = initIntersectionObserver(options);
    observerCallbacks.set(element, callback);
    rootInteresectionObserver.observe(element);
    return () => {
        observerCallbacks.delete(element);
        rootInteresectionObserver.unobserve(element);
    };
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/index.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/index.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRendererMotionComponent: () => (/* binding */ createRendererMotionComponent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../context/LayoutGroupContext.mjs */ "./node_modules/framer-motion/dist/es/context/LayoutGroupContext.mjs");
/* harmony import */ var _context_LazyContext_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../context/LazyContext.mjs */ "./node_modules/framer-motion/dist/es/context/LazyContext.mjs");
/* harmony import */ var _context_MotionConfigContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../context/MotionConfigContext.mjs */ "./node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs");
/* harmony import */ var _context_MotionContext_index_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../context/MotionContext/index.mjs */ "./node_modules/framer-motion/dist/es/context/MotionContext/index.mjs");
/* harmony import */ var _context_MotionContext_create_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../context/MotionContext/create.mjs */ "./node_modules/framer-motion/dist/es/context/MotionContext/create.mjs");
/* harmony import */ var _utils_is_browser_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/is-browser.mjs */ "./node_modules/framer-motion/dist/es/utils/is-browser.mjs");
/* harmony import */ var _features_definitions_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./features/definitions.mjs */ "./node_modules/framer-motion/dist/es/motion/features/definitions.mjs");
/* harmony import */ var _features_load_features_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./features/load-features.mjs */ "./node_modules/framer-motion/dist/es/motion/features/load-features.mjs");
/* harmony import */ var _utils_symbol_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/symbol.mjs */ "./node_modules/framer-motion/dist/es/motion/utils/symbol.mjs");
/* harmony import */ var _utils_use_motion_ref_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/use-motion-ref.mjs */ "./node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs");
/* harmony import */ var _utils_use_visual_element_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/use-visual-element.mjs */ "./node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs");
"use client";















/**
 * Create a `motion` component.
 *
 * This function accepts a Component argument, which can be either a string (ie "div"
 * for `motion.div`), or an actual React component.
 *
 * Alongside this is a config option which provides a way of rendering the provided
 * component "offline", or outside the React render cycle.
 */
function createRendererMotionComponent({ preloadedFeatures, createVisualElement, useRender, useVisualState, Component, }) {
    var _a, _b;
    preloadedFeatures && (0,_features_load_features_mjs__WEBPACK_IMPORTED_MODULE_3__.loadFeatures)(preloadedFeatures);
    function MotionComponent(props, externalRef) {
        /**
         * If we need to measure the element we load this functionality in a
         * separate class component in order to gain access to getSnapshotBeforeUpdate.
         */
        let MeasureLayout;
        const configAndProps = {
            ...(0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_MotionConfigContext_mjs__WEBPACK_IMPORTED_MODULE_4__.MotionConfigContext),
            ...props,
            layoutId: useLayoutId(props),
        };
        const { isStatic } = configAndProps;
        const context = (0,_context_MotionContext_create_mjs__WEBPACK_IMPORTED_MODULE_5__.useCreateMotionContext)(props);
        const visualState = useVisualState(props, isStatic);
        if (!isStatic && _utils_is_browser_mjs__WEBPACK_IMPORTED_MODULE_6__.isBrowser) {
            useStrictMode(configAndProps, preloadedFeatures);
            const layoutProjection = getProjectionFunctionality(configAndProps);
            MeasureLayout = layoutProjection.MeasureLayout;
            /**
             * Create a VisualElement for this component. A VisualElement provides a common
             * interface to renderer-specific APIs (ie DOM/Three.js etc) as well as
             * providing a way of rendering to these APIs outside of the React render loop
             * for more performant animations and interactions
             */
            context.visualElement = (0,_utils_use_visual_element_mjs__WEBPACK_IMPORTED_MODULE_7__.useVisualElement)(Component, visualState, configAndProps, createVisualElement, layoutProjection.ProjectionNode);
        }
        /**
         * The mount order and hierarchy is specific to ensure our element ref
         * is hydrated by the time features fire their effects.
         */
        return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_context_MotionContext_index_mjs__WEBPACK_IMPORTED_MODULE_8__.MotionContext.Provider, { value: context, children: [MeasureLayout && context.visualElement ? ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MeasureLayout, { visualElement: context.visualElement, ...configAndProps })) : null, useRender(Component, props, (0,_utils_use_motion_ref_mjs__WEBPACK_IMPORTED_MODULE_9__.useMotionRef)(visualState, context.visualElement, externalRef), visualState, isStatic, context.visualElement)] }));
    }
    MotionComponent.displayName = `motion.${typeof Component === "string"
        ? Component
        : `create(${(_b = (_a = Component.displayName) !== null && _a !== void 0 ? _a : Component.name) !== null && _b !== void 0 ? _b : ""})`}`;
    const ForwardRefMotionComponent = (0,react__WEBPACK_IMPORTED_MODULE_2__.forwardRef)(MotionComponent);
    ForwardRefMotionComponent[_utils_symbol_mjs__WEBPACK_IMPORTED_MODULE_10__.motionComponentSymbol] = Component;
    return ForwardRefMotionComponent;
}
function useLayoutId({ layoutId }) {
    const layoutGroupId = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_LayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_11__.LayoutGroupContext).id;
    return layoutGroupId && layoutId !== undefined
        ? layoutGroupId + "-" + layoutId
        : layoutId;
}
function useStrictMode(configAndProps, preloadedFeatures) {
    const isStrict = (0,react__WEBPACK_IMPORTED_MODULE_2__.useContext)(_context_LazyContext_mjs__WEBPACK_IMPORTED_MODULE_12__.LazyContext).strict;
    /**
     * If we're in development mode, check to make sure we're not rendering a motion component
     * as a child of LazyMotion, as this will break the file-size benefits of using it.
     */
    if ( true &&
        preloadedFeatures &&
        isStrict) {
        const strictMessage = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
        configAndProps.ignoreStrict
            ? (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.warning)(false, strictMessage)
            : (0,motion_utils__WEBPACK_IMPORTED_MODULE_1__.invariant)(false, strictMessage);
    }
}
function getProjectionFunctionality(props) {
    const { drag, layout } = _features_definitions_mjs__WEBPACK_IMPORTED_MODULE_13__.featureDefinitions;
    if (!drag && !layout)
        return {};
    const combined = { ...drag, ...layout };
    return {
        MeasureLayout: (drag === null || drag === void 0 ? void 0 : drag.isEnabled(props)) || (layout === null || layout === void 0 ? void 0 : layout.isEnabled(props))
            ? combined.MeasureLayout
            : undefined,
        ProjectionNode: combined.ProjectionNode,
    };
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs":
/*!************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isForcedMotionValue: () => (/* binding */ isForcedMotionValue)
/* harmony export */ });
/* harmony import */ var _projection_styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../projection/styles/scale-correction.mjs */ "./node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs");
/* harmony import */ var _render_html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../render/html/utils/keys-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs");



function isForcedMotionValue(key, { layout, layoutId }) {
    return (_render_html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.transformProps.has(key) ||
        key.startsWith("origin") ||
        ((layout || layoutId !== undefined) &&
            (!!_projection_styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_1__.scaleCorrectors[key] || key === "opacity")));
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/utils/symbol.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/utils/symbol.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   motionComponentSymbol: () => (/* binding */ motionComponentSymbol)
/* harmony export */ });
const motionComponentSymbol = Symbol.for("motionComponentSymbol");




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/utils/use-motion-ref.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMotionRef: () => (/* binding */ useMotionRef)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/is-ref-object.mjs */ "./node_modules/framer-motion/dist/es/utils/is-ref-object.mjs");



/**
 * Creates a ref function that, when called, hydrates the provided
 * external ref and VisualElement.
 */
function useMotionRef(visualState, visualElement, externalRef) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((instance) => {
        if (instance) {
            visualState.onMount && visualState.onMount(instance);
        }
        if (visualElement) {
            if (instance) {
                visualElement.mount(instance);
            }
            else {
                visualElement.unmount();
            }
        }
        if (externalRef) {
            if (typeof externalRef === "function") {
                externalRef(instance);
            }
            else if ((0,_utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_1__.isRefObject)(externalRef)) {
                externalRef.current = instance;
            }
        }
    }, 
    /**
     * Only pass a new ref callback to React if we've received a visual element
     * factory. Otherwise we'll be mounting/remounting every time externalRef
     * or other dependencies change.
     */
    [visualElement]);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/utils/use-visual-element.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useVisualElement: () => (/* binding */ useVisualElement)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/PresenceContext.mjs */ "./node_modules/framer-motion/dist/es/context/PresenceContext.mjs");
/* harmony import */ var _context_MotionContext_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../context/MotionContext/index.mjs */ "./node_modules/framer-motion/dist/es/context/MotionContext/index.mjs");
/* harmony import */ var _utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/use-isomorphic-effect.mjs */ "./node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs");
/* harmony import */ var _context_LazyContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/LazyContext.mjs */ "./node_modules/framer-motion/dist/es/context/LazyContext.mjs");
/* harmony import */ var _context_MotionConfigContext_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../context/MotionConfigContext.mjs */ "./node_modules/framer-motion/dist/es/context/MotionConfigContext.mjs");
/* harmony import */ var _animation_optimized_appear_data_id_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../animation/optimized-appear/data-id.mjs */ "./node_modules/framer-motion/dist/es/animation/optimized-appear/data-id.mjs");
/* harmony import */ var _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../frameloop/microtask.mjs */ "./node_modules/framer-motion/dist/es/frameloop/microtask.mjs");
/* harmony import */ var _utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/is-ref-object.mjs */ "./node_modules/framer-motion/dist/es/utils/is-ref-object.mjs");
/* harmony import */ var _context_SwitchLayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../context/SwitchLayoutGroupContext.mjs */ "./node_modules/framer-motion/dist/es/context/SwitchLayoutGroupContext.mjs");











function useVisualElement(Component, visualState, props, createVisualElement, ProjectionNodeConstructor) {
    var _a, _b;
    const { visualElement: parent } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_MotionContext_index_mjs__WEBPACK_IMPORTED_MODULE_1__.MotionContext);
    const lazyContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_LazyContext_mjs__WEBPACK_IMPORTED_MODULE_2__.LazyContext);
    const presenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_3__.PresenceContext);
    const reducedMotionConfig = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_MotionConfigContext_mjs__WEBPACK_IMPORTED_MODULE_4__.MotionConfigContext).reducedMotion;
    const visualElementRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    /**
     * If we haven't preloaded a renderer, check to see if we have one lazy-loaded
     */
    createVisualElement = createVisualElement || lazyContext.renderer;
    if (!visualElementRef.current && createVisualElement) {
        visualElementRef.current = createVisualElement(Component, {
            visualState,
            parent,
            props,
            presenceContext,
            blockInitialAnimation: presenceContext
                ? presenceContext.initial === false
                : false,
            reducedMotionConfig,
        });
    }
    const visualElement = visualElementRef.current;
    /**
     * Load Motion gesture and animation features. These are rendered as renderless
     * components so each feature can optionally make use of React lifecycle methods.
     */
    const initialLayoutGroupConfig = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_SwitchLayoutGroupContext_mjs__WEBPACK_IMPORTED_MODULE_5__.SwitchLayoutGroupContext);
    if (visualElement &&
        !visualElement.projection &&
        ProjectionNodeConstructor &&
        (visualElement.type === "html" || visualElement.type === "svg")) {
        createProjectionNode(visualElementRef.current, props, ProjectionNodeConstructor, initialLayoutGroupConfig);
    }
    const isMounted = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useInsertionEffect)(() => {
        /**
         * Check the component has already mounted before calling
         * `update` unnecessarily. This ensures we skip the initial update.
         */
        if (visualElement && isMounted.current) {
            visualElement.update(props, presenceContext);
        }
    });
    /**
     * Cache this value as we want to know whether HandoffAppearAnimations
     * was present on initial render - it will be deleted after this.
     */
    const optimisedAppearId = props[_animation_optimized_appear_data_id_mjs__WEBPACK_IMPORTED_MODULE_6__.optimizedAppearDataAttribute];
    const wantsHandoff = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(Boolean(optimisedAppearId) &&
        !((_a = window.MotionHandoffIsComplete) === null || _a === void 0 ? void 0 : _a.call(window, optimisedAppearId)) &&
        ((_b = window.MotionHasOptimisedAnimation) === null || _b === void 0 ? void 0 : _b.call(window, optimisedAppearId)));
    (0,_utils_use_isomorphic_effect_mjs__WEBPACK_IMPORTED_MODULE_7__.useIsomorphicLayoutEffect)(() => {
        if (!visualElement)
            return;
        isMounted.current = true;
        window.MotionIsMounted = true;
        visualElement.updateFeatures();
        _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_8__.microtask.render(visualElement.render);
        /**
         * Ideally this function would always run in a useEffect.
         *
         * However, if we have optimised appear animations to handoff from,
         * it needs to happen synchronously to ensure there's no flash of
         * incorrect styles in the event of a hydration error.
         *
         * So if we detect a situtation where optimised appear animations
         * are running, we use useLayoutEffect to trigger animations.
         */
        if (wantsHandoff.current && visualElement.animationState) {
            visualElement.animationState.animateChanges();
        }
    });
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (!visualElement)
            return;
        if (!wantsHandoff.current && visualElement.animationState) {
            visualElement.animationState.animateChanges();
        }
        if (wantsHandoff.current) {
            // This ensures all future calls to animateChanges() in this component will run in useEffect
            queueMicrotask(() => {
                var _a;
                (_a = window.MotionHandoffMarkAsComplete) === null || _a === void 0 ? void 0 : _a.call(window, optimisedAppearId);
            });
            wantsHandoff.current = false;
        }
    });
    return visualElement;
}
function createProjectionNode(visualElement, props, ProjectionNodeConstructor, initialPromotionConfig) {
    const { layoutId, layout, drag, dragConstraints, layoutScroll, layoutRoot, } = props;
    visualElement.projection = new ProjectionNodeConstructor(visualElement.latestValues, props["data-framer-portal-id"]
        ? undefined
        : getClosestProjectingNode(visualElement.parent));
    visualElement.projection.setOptions({
        layoutId,
        layout,
        alwaysMeasureLayout: Boolean(drag) || (dragConstraints && (0,_utils_is_ref_object_mjs__WEBPACK_IMPORTED_MODULE_9__.isRefObject)(dragConstraints)),
        visualElement,
        /**
         * TODO: Update options in an effect. This could be tricky as it'll be too late
         * to update by the time layout animations run.
         * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
         * ensuring it gets called if there's no potential layout animations.
         *
         */
        animationType: typeof layout === "string" ? layout : "both",
        initialPromotionConfig,
        layoutScroll,
        layoutRoot,
    });
}
function getClosestProjectingNode(visualElement) {
    if (!visualElement)
        return undefined;
    return visualElement.options.allowProjection !== false
        ? visualElement.projection
        : getClosestProjectingNode(visualElement.parent);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeUseVisualState: () => (/* binding */ makeUseVisualState)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _animation_utils_is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../animation/utils/is-animation-controls.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs");
/* harmony import */ var _context_MotionContext_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../context/MotionContext/index.mjs */ "./node_modules/framer-motion/dist/es/context/MotionContext/index.mjs");
/* harmony import */ var _context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/PresenceContext.mjs */ "./node_modules/framer-motion/dist/es/context/PresenceContext.mjs");
/* harmony import */ var _render_utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../render/utils/is-controlling-variants.mjs */ "./node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs");
/* harmony import */ var _render_utils_resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../render/utils/resolve-variants.mjs */ "./node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs");
/* harmony import */ var _utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/use-constant.mjs */ "./node_modules/framer-motion/dist/es/utils/use-constant.mjs");
/* harmony import */ var _value_utils_resolve_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../value/utils/resolve-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs");









function makeState({ scrapeMotionValuesFromProps, createRenderState, onUpdate, }, props, context, presenceContext) {
    const state = {
        latestValues: makeLatestValues(props, context, presenceContext, scrapeMotionValuesFromProps),
        renderState: createRenderState(),
    };
    if (onUpdate) {
        /**
         * onMount works without the VisualElement because it could be
         * called before the VisualElement payload has been hydrated.
         * (e.g. if someone is using m components <m.circle />)
         */
        state.onMount = (instance) => onUpdate({ props, current: instance, ...state });
        state.onUpdate = (visualElement) => onUpdate(visualElement);
    }
    return state;
}
const makeUseVisualState = (config) => (props, isStatic) => {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_MotionContext_index_mjs__WEBPACK_IMPORTED_MODULE_1__.MotionContext);
    const presenceContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_context_PresenceContext_mjs__WEBPACK_IMPORTED_MODULE_2__.PresenceContext);
    const make = () => makeState(config, props, context, presenceContext);
    return isStatic ? make() : (0,_utils_use_constant_mjs__WEBPACK_IMPORTED_MODULE_3__.useConstant)(make);
};
function makeLatestValues(props, context, presenceContext, scrapeMotionValues) {
    const values = {};
    const motionValues = scrapeMotionValues(props, {});
    for (const key in motionValues) {
        values[key] = (0,_value_utils_resolve_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__.resolveMotionValue)(motionValues[key]);
    }
    let { initial, animate } = props;
    const isControllingVariants$1 = (0,_render_utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_5__.isControllingVariants)(props);
    const isVariantNode$1 = (0,_render_utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_5__.isVariantNode)(props);
    if (context &&
        isVariantNode$1 &&
        !isControllingVariants$1 &&
        props.inherit !== false) {
        if (initial === undefined)
            initial = context.initial;
        if (animate === undefined)
            animate = context.animate;
    }
    let isInitialAnimationBlocked = presenceContext
        ? presenceContext.initial === false
        : false;
    isInitialAnimationBlocked = isInitialAnimationBlocked || initial === false;
    const variantToSet = isInitialAnimationBlocked ? animate : initial;
    if (variantToSet &&
        typeof variantToSet !== "boolean" &&
        !(0,_animation_utils_is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_6__.isAnimationControls)(variantToSet)) {
        const list = Array.isArray(variantToSet) ? variantToSet : [variantToSet];
        for (let i = 0; i < list.length; i++) {
            const resolved = (0,_render_utils_resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_7__.resolveVariantFromProps)(props, list[i]);
            if (resolved) {
                const { transitionEnd, transition, ...target } = resolved;
                for (const key in target) {
                    let valueTarget = target[key];
                    if (Array.isArray(valueTarget)) {
                        /**
                         * Take final keyframe if the initial animation is blocked because
                         * we want to initialise at the end of that blocked animation.
                         */
                        const index = isInitialAnimationBlocked
                            ? valueTarget.length - 1
                            : 0;
                        valueTarget = valueTarget[index];
                    }
                    if (valueTarget !== null) {
                        values[key] = valueTarget;
                    }
                }
                for (const key in transitionEnd) {
                    values[key] = transitionEnd[key];
                }
            }
        }
    }
    return values;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isValidMotionProp: () => (/* binding */ isValidMotionProp)
/* harmony export */ });
/**
 * A list of all valid MotionProps.
 *
 * @privateRemarks
 * This doesn't throw if a `MotionProp` name is missing - it should.
 */
const validMotionProps = new Set([
    "animate",
    "exit",
    "variants",
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "custom",
    "inherit",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "_dragX",
    "_dragY",
    "onHoverStart",
    "onHoverEnd",
    "onViewportEnter",
    "onViewportLeave",
    "globalTapTarget",
    "ignoreStrict",
    "viewport",
]);
/**
 * Check whether a prop name is a valid `MotionProp` key.
 *
 * @param key - Name of the property to check
 * @returns `true` is key is a valid `MotionProp`.
 *
 * @public
 */
function isValidMotionProp(key) {
    return (key.startsWith("while") ||
        (key.startsWith("drag") && key !== "draggable") ||
        key.startsWith("layout") ||
        key.startsWith("onTap") ||
        key.startsWith("onPan") ||
        key.startsWith("onLayout") ||
        validMotionProps.has(key));
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mixValues: () => (/* binding */ mixValues)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _easing_circ_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../easing/circ.mjs */ "./node_modules/framer-motion/dist/es/easing/circ.mjs");
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/mix/number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../value/types/numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");





const borders = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"];
const numBorders = borders.length;
const asNumber = (value) => typeof value === "string" ? parseFloat(value) : value;
const isPx = (value) => typeof value === "number" || _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px.test(value);
function mixValues(target, follow, lead, progress, shouldCrossfadeOpacity, isOnlyMember) {
    if (shouldCrossfadeOpacity) {
        target.opacity = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__.mixNumber)(0, 
        // TODO Reinstate this if only child
        lead.opacity !== undefined ? lead.opacity : 1, easeCrossfadeIn(progress));
        target.opacityExit = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__.mixNumber)(follow.opacity !== undefined ? follow.opacity : 1, 0, easeCrossfadeOut(progress));
    }
    else if (isOnlyMember) {
        target.opacity = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__.mixNumber)(follow.opacity !== undefined ? follow.opacity : 1, lead.opacity !== undefined ? lead.opacity : 1, progress);
    }
    /**
     * Mix border radius
     */
    for (let i = 0; i < numBorders; i++) {
        const borderLabel = `border${borders[i]}Radius`;
        let followRadius = getRadius(follow, borderLabel);
        let leadRadius = getRadius(lead, borderLabel);
        if (followRadius === undefined && leadRadius === undefined)
            continue;
        followRadius || (followRadius = 0);
        leadRadius || (leadRadius = 0);
        const canMix = followRadius === 0 ||
            leadRadius === 0 ||
            isPx(followRadius) === isPx(leadRadius);
        if (canMix) {
            target[borderLabel] = Math.max((0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__.mixNumber)(asNumber(followRadius), asNumber(leadRadius), progress), 0);
            if (_value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.percent.test(leadRadius) || _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.percent.test(followRadius)) {
                target[borderLabel] += "%";
            }
        }
        else {
            target[borderLabel] = leadRadius;
        }
    }
    /**
     * Mix rotation
     */
    if (follow.rotate || lead.rotate) {
        target.rotate = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__.mixNumber)(follow.rotate || 0, lead.rotate || 0, progress);
    }
}
function getRadius(values, radiusName) {
    return values[radiusName] !== undefined
        ? values[radiusName]
        : values.borderRadius;
}
// /**
//  * We only want to mix the background color if there's a follow element
//  * that we're not crossfading opacity between. For instance with switch
//  * AnimateSharedLayout animations, this helps the illusion of a continuous
//  * element being animated but also cuts down on the number of paints triggered
//  * for elements where opacity is doing that work for us.
//  */
// if (
//     !hasFollowElement &&
//     latestLeadValues.backgroundColor &&
//     latestFollowValues.backgroundColor
// ) {
//     /**
//      * This isn't ideal performance-wise as mixColor is creating a new function every frame.
//      * We could probably create a mixer that runs at the start of the animation but
//      * the idea behind the crossfader is that it runs dynamically between two potentially
//      * changing targets (ie opacity or borderRadius may be animating independently via variants)
//      */
//     leadState.backgroundColor = followState.backgroundColor = mixColor(
//         latestFollowValues.backgroundColor as string,
//         latestLeadValues.backgroundColor as string
//     )(p)
// }
const easeCrossfadeIn = /*@__PURE__*/ compress(0, 0.5, _easing_circ_mjs__WEBPACK_IMPORTED_MODULE_3__.circOut);
const easeCrossfadeOut = /*@__PURE__*/ compress(0.5, 0.95, motion_utils__WEBPACK_IMPORTED_MODULE_0__.noop);
function compress(min, max, easing) {
    return (p) => {
        // Could replace ifs with clamp
        if (p < min)
            return 0;
        if (p > max)
            return 1;
        return easing((0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.progress)(min, max, p));
    };
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertBoundingBoxToBox: () => (/* binding */ convertBoundingBoxToBox),
/* harmony export */   convertBoxToBoundingBox: () => (/* binding */ convertBoxToBoundingBox),
/* harmony export */   transformBoxPoints: () => (/* binding */ transformBoxPoints)
/* harmony export */ });
/**
 * Bounding boxes tend to be defined as top, left, right, bottom. For various operations
 * it's easier to consider each axis individually. This function returns a bounding box
 * as a map of single-axis min/max values.
 */
function convertBoundingBoxToBox({ top, left, right, bottom, }) {
    return {
        x: { min: left, max: right },
        y: { min: top, max: bottom },
    };
}
function convertBoxToBoundingBox({ x, y }) {
    return { top: y.min, right: x.max, bottom: y.max, left: x.min };
}
/**
 * Applies a TransformPoint function to a bounding box. TransformPoint is usually a function
 * provided by Framer to allow measured points to be corrected for device scaling. This is used
 * when measuring DOM elements and DOM event points.
 */
function transformBoxPoints(point, transformPoint) {
    if (!transformPoint)
        return point;
    const topLeft = transformPoint({ x: point.left, y: point.top });
    const bottomRight = transformPoint({ x: point.right, y: point.bottom });
    return {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x,
    };
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/geometry/copy.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/geometry/copy.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   copyAxisDeltaInto: () => (/* binding */ copyAxisDeltaInto),
/* harmony export */   copyAxisInto: () => (/* binding */ copyAxisInto),
/* harmony export */   copyBoxInto: () => (/* binding */ copyBoxInto)
/* harmony export */ });
/**
 * Reset an axis to the provided origin box.
 *
 * This is a mutative operation.
 */
function copyAxisInto(axis, originAxis) {
    axis.min = originAxis.min;
    axis.max = originAxis.max;
}
/**
 * Reset a box to the provided origin box.
 *
 * This is a mutative operation.
 */
function copyBoxInto(box, originBox) {
    copyAxisInto(box.x, originBox.x);
    copyAxisInto(box.y, originBox.y);
}
/**
 * Reset a delta to the provided origin box.
 *
 * This is a mutative operation.
 */
function copyAxisDeltaInto(delta, originDelta) {
    delta.translate = originDelta.translate;
    delta.scale = originDelta.scale;
    delta.originPoint = originDelta.originPoint;
    delta.origin = originDelta.origin;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyAxisDelta: () => (/* binding */ applyAxisDelta),
/* harmony export */   applyBoxDelta: () => (/* binding */ applyBoxDelta),
/* harmony export */   applyPointDelta: () => (/* binding */ applyPointDelta),
/* harmony export */   applyTreeDeltas: () => (/* binding */ applyTreeDeltas),
/* harmony export */   scalePoint: () => (/* binding */ scalePoint),
/* harmony export */   transformAxis: () => (/* binding */ transformAxis),
/* harmony export */   transformBox: () => (/* binding */ transformBox),
/* harmony export */   translateAxis: () => (/* binding */ translateAxis)
/* harmony export */ });
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/mix/number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");
/* harmony import */ var _utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/has-transform.mjs */ "./node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs");



/**
 * Scales a point based on a factor and an originPoint
 */
function scalePoint(point, scale, originPoint) {
    const distanceFromOrigin = point - originPoint;
    const scaled = scale * distanceFromOrigin;
    return originPoint + scaled;
}
/**
 * Applies a translate/scale delta to a point
 */
function applyPointDelta(point, translate, scale, originPoint, boxScale) {
    if (boxScale !== undefined) {
        point = scalePoint(point, boxScale, originPoint);
    }
    return scalePoint(point, scale, originPoint) + translate;
}
/**
 * Applies a translate/scale delta to an axis
 */
function applyAxisDelta(axis, translate = 0, scale = 1, originPoint, boxScale) {
    axis.min = applyPointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = applyPointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Applies a translate/scale delta to a box
 */
function applyBoxDelta(box, { x, y }) {
    applyAxisDelta(box.x, x.translate, x.scale, x.originPoint);
    applyAxisDelta(box.y, y.translate, y.scale, y.originPoint);
}
const TREE_SCALE_SNAP_MIN = 0.999999999999;
const TREE_SCALE_SNAP_MAX = 1.0000000000001;
/**
 * Apply a tree of deltas to a box. We do this to calculate the effect of all the transforms
 * in a tree upon our box before then calculating how to project it into our desired viewport-relative box
 *
 * This is the final nested loop within updateLayoutDelta for future refactoring
 */
function applyTreeDeltas(box, treeScale, treePath, isSharedTransition = false) {
    const treeLength = treePath.length;
    if (!treeLength)
        return;
    // Reset the treeScale
    treeScale.x = treeScale.y = 1;
    let node;
    let delta;
    for (let i = 0; i < treeLength; i++) {
        node = treePath[i];
        delta = node.projectionDelta;
        /**
         * TODO: Prefer to remove this, but currently we have motion components with
         * display: contents in Framer.
         */
        const { visualElement } = node.options;
        if (visualElement &&
            visualElement.props.style &&
            visualElement.props.style.display === "contents") {
            continue;
        }
        if (isSharedTransition &&
            node.options.layoutScroll &&
            node.scroll &&
            node !== node.root) {
            transformBox(box, {
                x: -node.scroll.offset.x,
                y: -node.scroll.offset.y,
            });
        }
        if (delta) {
            // Incoporate each ancestor's scale into a culmulative treeScale for this component
            treeScale.x *= delta.x.scale;
            treeScale.y *= delta.y.scale;
            // Apply each ancestor's calculated delta into this component's recorded layout box
            applyBoxDelta(box, delta);
        }
        if (isSharedTransition && (0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.hasTransform)(node.latestValues)) {
            transformBox(box, node.latestValues);
        }
    }
    /**
     * Snap tree scale back to 1 if it's within a non-perceivable threshold.
     * This will help reduce useless scales getting rendered.
     */
    if (treeScale.x < TREE_SCALE_SNAP_MAX &&
        treeScale.x > TREE_SCALE_SNAP_MIN) {
        treeScale.x = 1.0;
    }
    if (treeScale.y < TREE_SCALE_SNAP_MAX &&
        treeScale.y > TREE_SCALE_SNAP_MIN) {
        treeScale.y = 1.0;
    }
}
function translateAxis(axis, distance) {
    axis.min = axis.min + distance;
    axis.max = axis.max + distance;
}
/**
 * Apply a transform to an axis from the latest resolved motion values.
 * This function basically acts as a bridge between a flat motion value map
 * and applyAxisDelta
 */
function transformAxis(axis, axisTranslate, axisScale, boxScale, axisOrigin = 0.5) {
    const originPoint = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__.mixNumber)(axis.min, axis.max, axisOrigin);
    // Apply the axis delta to the final axis
    applyAxisDelta(axis, axisTranslate, axisScale, originPoint, boxScale);
}
/**
 * Apply a transform to a box from the latest resolved motion values.
 */
function transformBox(box, transform) {
    transformAxis(box.x, transform.x, transform.scaleX, transform.scale, transform.originX);
    transformAxis(box.y, transform.y, transform.scaleY, transform.scale, transform.originY);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcAxisDelta: () => (/* binding */ calcAxisDelta),
/* harmony export */   calcBoxDelta: () => (/* binding */ calcBoxDelta),
/* harmony export */   calcLength: () => (/* binding */ calcLength),
/* harmony export */   calcRelativeAxis: () => (/* binding */ calcRelativeAxis),
/* harmony export */   calcRelativeAxisPosition: () => (/* binding */ calcRelativeAxisPosition),
/* harmony export */   calcRelativeBox: () => (/* binding */ calcRelativeBox),
/* harmony export */   calcRelativePosition: () => (/* binding */ calcRelativePosition),
/* harmony export */   isNear: () => (/* binding */ isNear)
/* harmony export */ });
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/mix/number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");


const SCALE_PRECISION = 0.0001;
const SCALE_MIN = 1 - SCALE_PRECISION;
const SCALE_MAX = 1 + SCALE_PRECISION;
const TRANSLATE_PRECISION = 0.01;
const TRANSLATE_MIN = 0 - TRANSLATE_PRECISION;
const TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(axis) {
    return axis.max - axis.min;
}
function isNear(value, target, maxDistance) {
    return Math.abs(value - target) <= maxDistance;
}
function calcAxisDelta(delta, source, target, origin = 0.5) {
    delta.origin = origin;
    delta.originPoint = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_0__.mixNumber)(source.min, source.max, delta.origin);
    delta.scale = calcLength(target) / calcLength(source);
    delta.translate =
        (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_0__.mixNumber)(target.min, target.max, delta.origin) - delta.originPoint;
    if ((delta.scale >= SCALE_MIN && delta.scale <= SCALE_MAX) ||
        isNaN(delta.scale)) {
        delta.scale = 1.0;
    }
    if ((delta.translate >= TRANSLATE_MIN &&
        delta.translate <= TRANSLATE_MAX) ||
        isNaN(delta.translate)) {
        delta.translate = 0.0;
    }
}
function calcBoxDelta(delta, source, target, origin) {
    calcAxisDelta(delta.x, source.x, target.x, origin ? origin.originX : undefined);
    calcAxisDelta(delta.y, source.y, target.y, origin ? origin.originY : undefined);
}
function calcRelativeAxis(target, relative, parent) {
    target.min = parent.min + relative.min;
    target.max = target.min + calcLength(relative);
}
function calcRelativeBox(target, relative, parent) {
    calcRelativeAxis(target.x, relative.x, parent.x);
    calcRelativeAxis(target.y, relative.y, parent.y);
}
function calcRelativeAxisPosition(target, layout, parent) {
    target.min = layout.min - parent.min;
    target.max = target.min + calcLength(layout);
}
function calcRelativePosition(target, layout, parent) {
    calcRelativeAxisPosition(target.x, layout.x, parent.x);
    calcRelativeAxisPosition(target.y, layout.y, parent.y);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   removeAxisDelta: () => (/* binding */ removeAxisDelta),
/* harmony export */   removeAxisTransforms: () => (/* binding */ removeAxisTransforms),
/* harmony export */   removeBoxTransforms: () => (/* binding */ removeBoxTransforms),
/* harmony export */   removePointDelta: () => (/* binding */ removePointDelta)
/* harmony export */ });
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/mix/number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../value/types/numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");
/* harmony import */ var _delta_apply_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delta-apply.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs");




/**
 * Remove a delta from a point. This is essentially the steps of applyPointDelta in reverse
 */
function removePointDelta(point, translate, scale, originPoint, boxScale) {
    point -= translate;
    point = (0,_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_0__.scalePoint)(point, 1 / scale, originPoint);
    if (boxScale !== undefined) {
        point = (0,_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_0__.scalePoint)(point, 1 / boxScale, originPoint);
    }
    return point;
}
/**
 * Remove a delta from an axis. This is essentially the steps of applyAxisDelta in reverse
 */
function removeAxisDelta(axis, translate = 0, scale = 1, origin = 0.5, boxScale, originAxis = axis, sourceAxis = axis) {
    if (_value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.percent.test(translate)) {
        translate = parseFloat(translate);
        const relativeProgress = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__.mixNumber)(sourceAxis.min, sourceAxis.max, translate / 100);
        translate = relativeProgress - sourceAxis.min;
    }
    if (typeof translate !== "number")
        return;
    let originPoint = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_2__.mixNumber)(originAxis.min, originAxis.max, origin);
    if (axis === originAxis)
        originPoint -= translate;
    axis.min = removePointDelta(axis.min, translate, scale, originPoint, boxScale);
    axis.max = removePointDelta(axis.max, translate, scale, originPoint, boxScale);
}
/**
 * Remove a transforms from an axis. This is essentially the steps of applyAxisTransforms in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function removeAxisTransforms(axis, transforms, [key, scaleKey, originKey], origin, sourceAxis) {
    removeAxisDelta(axis, transforms[key], transforms[scaleKey], transforms[originKey], transforms.scale, origin, sourceAxis);
}
/**
 * The names of the motion values we want to apply as translation, scale and origin.
 */
const xKeys = ["x", "scaleX", "originX"];
const yKeys = ["y", "scaleY", "originY"];
/**
 * Remove a transforms from an box. This is essentially the steps of applyAxisBox in reverse
 * and acts as a bridge between motion values and removeAxisDelta
 */
function removeBoxTransforms(box, transforms, originBox, sourceBox) {
    removeAxisTransforms(box.x, transforms, xKeys, originBox ? originBox.x : undefined, sourceBox ? sourceBox.x : undefined);
    removeAxisTransforms(box.y, transforms, yKeys, originBox ? originBox.y : undefined, sourceBox ? sourceBox.y : undefined);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/geometry/models.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/geometry/models.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createAxis: () => (/* binding */ createAxis),
/* harmony export */   createAxisDelta: () => (/* binding */ createAxisDelta),
/* harmony export */   createBox: () => (/* binding */ createBox),
/* harmony export */   createDelta: () => (/* binding */ createDelta)
/* harmony export */ });
const createAxisDelta = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0,
});
const createDelta = () => ({
    x: createAxisDelta(),
    y: createAxisDelta(),
});
const createAxis = () => ({ min: 0, max: 0 });
const createBox = () => ({
    x: createAxis(),
    y: createAxis(),
});




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/geometry/utils.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/geometry/utils.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   aspectRatio: () => (/* binding */ aspectRatio),
/* harmony export */   axisDeltaEquals: () => (/* binding */ axisDeltaEquals),
/* harmony export */   axisEquals: () => (/* binding */ axisEquals),
/* harmony export */   axisEqualsRounded: () => (/* binding */ axisEqualsRounded),
/* harmony export */   boxEquals: () => (/* binding */ boxEquals),
/* harmony export */   boxEqualsRounded: () => (/* binding */ boxEqualsRounded),
/* harmony export */   isDeltaZero: () => (/* binding */ isDeltaZero)
/* harmony export */ });
/* harmony import */ var _delta_calc_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./delta-calc.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs");


function isAxisDeltaZero(delta) {
    return delta.translate === 0 && delta.scale === 1;
}
function isDeltaZero(delta) {
    return isAxisDeltaZero(delta.x) && isAxisDeltaZero(delta.y);
}
function axisEquals(a, b) {
    return a.min === b.min && a.max === b.max;
}
function boxEquals(a, b) {
    return axisEquals(a.x, b.x) && axisEquals(a.y, b.y);
}
function axisEqualsRounded(a, b) {
    return (Math.round(a.min) === Math.round(b.min) &&
        Math.round(a.max) === Math.round(b.max));
}
function boxEqualsRounded(a, b) {
    return axisEqualsRounded(a.x, b.x) && axisEqualsRounded(a.y, b.y);
}
function aspectRatio(box) {
    return (0,_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_0__.calcLength)(box.x) / (0,_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_0__.calcLength)(box.y);
}
function axisDeltaEquals(a, b) {
    return (a.translate === b.translate &&
        a.scale === b.scale &&
        a.originPoint === b.originPoint);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs":
/*!***************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DocumentProjectionNode: () => (/* binding */ DocumentProjectionNode)
/* harmony export */ });
/* harmony import */ var _create_projection_node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-projection-node.mjs */ "./node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs");
/* harmony import */ var _events_add_dom_event_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../events/add-dom-event.mjs */ "./node_modules/framer-motion/dist/es/events/add-dom-event.mjs");



const DocumentProjectionNode = (0,_create_projection_node_mjs__WEBPACK_IMPORTED_MODULE_0__.createProjectionNode)({
    attachResizeListener: (ref, notify) => (0,_events_add_dom_event_mjs__WEBPACK_IMPORTED_MODULE_1__.addDomEvent)(ref, "resize", notify),
    measureScroll: () => ({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => true,
});




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/node/HTMLProjectionNode.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTMLProjectionNode: () => (/* binding */ HTMLProjectionNode),
/* harmony export */   rootProjectionNode: () => (/* binding */ rootProjectionNode)
/* harmony export */ });
/* harmony import */ var _create_projection_node_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-projection-node.mjs */ "./node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs");
/* harmony import */ var _DocumentProjectionNode_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DocumentProjectionNode.mjs */ "./node_modules/framer-motion/dist/es/projection/node/DocumentProjectionNode.mjs");



const rootProjectionNode = {
    current: undefined,
};
const HTMLProjectionNode = (0,_create_projection_node_mjs__WEBPACK_IMPORTED_MODULE_0__.createProjectionNode)({
    measureScroll: (instance) => ({
        x: instance.scrollLeft,
        y: instance.scrollTop,
    }),
    defaultParent: () => {
        if (!rootProjectionNode.current) {
            const documentNode = new _DocumentProjectionNode_mjs__WEBPACK_IMPORTED_MODULE_1__.DocumentProjectionNode({});
            documentNode.mount(window);
            documentNode.setOptions({ layoutScroll: true });
            rootProjectionNode.current = documentNode;
        }
        return rootProjectionNode.current;
    },
    resetTransform: (instance, value) => {
        instance.style.transform = value !== undefined ? value : "none";
    },
    checkIsScrollRoot: (instance) => Boolean(window.getComputedStyle(instance).position === "fixed"),
});




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs":
/*!***************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/node/create-projection-node.mjs ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanDirtyNodes: () => (/* binding */ cleanDirtyNodes),
/* harmony export */   createProjectionNode: () => (/* binding */ createProjectionNode),
/* harmony export */   mixAxis: () => (/* binding */ mixAxis),
/* harmony export */   mixAxisDelta: () => (/* binding */ mixAxisDelta),
/* harmony export */   mixBox: () => (/* binding */ mixBox),
/* harmony export */   propagateDirtyNodes: () => (/* binding */ propagateDirtyNodes)
/* harmony export */ });
/* harmony import */ var motion_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-dom */ "./node_modules/motion-dom/dist/es/index.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _animation_animate_single_value_mjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../animation/animate/single-value.mjs */ "./node_modules/framer-motion/dist/es/animation/animate/single-value.mjs");
/* harmony import */ var _animation_optimized_appear_get_appear_id_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../animation/optimized-appear/get-appear-id.mjs */ "./node_modules/framer-motion/dist/es/animation/optimized-appear/get-appear-id.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");
/* harmony import */ var _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../frameloop/microtask.mjs */ "./node_modules/framer-motion/dist/es/frameloop/microtask.mjs");
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../frameloop/sync-time.mjs */ "./node_modules/framer-motion/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _render_dom_utils_is_svg_element_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../render/dom/utils/is-svg-element.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs");
/* harmony import */ var _render_utils_flat_tree_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../render/utils/flat-tree.mjs */ "./node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs");
/* harmony import */ var _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../stats/animation-count.mjs */ "./node_modules/framer-motion/dist/es/stats/animation-count.mjs");
/* harmony import */ var _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../stats/buffer.mjs */ "./node_modules/framer-motion/dist/es/stats/buffer.mjs");
/* harmony import */ var _utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../utils/clamp.mjs */ "./node_modules/framer-motion/dist/es/utils/clamp.mjs");
/* harmony import */ var _utils_delay_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/delay.mjs */ "./node_modules/framer-motion/dist/es/utils/delay.mjs");
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../utils/mix/number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");
/* harmony import */ var _utils_subscription_manager_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../utils/subscription-manager.mjs */ "./node_modules/framer-motion/dist/es/utils/subscription-manager.mjs");
/* harmony import */ var _value_utils_resolve_motion_value_mjs__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../../value/utils/resolve-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs");
/* harmony import */ var _animation_mix_values_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../animation/mix-values.mjs */ "./node_modules/framer-motion/dist/es/projection/animation/mix-values.mjs");
/* harmony import */ var _geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../geometry/copy.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/copy.mjs");
/* harmony import */ var _geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../geometry/delta-apply.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs");
/* harmony import */ var _geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../geometry/delta-calc.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/delta-calc.mjs");
/* harmony import */ var _geometry_delta_remove_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../geometry/delta-remove.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/delta-remove.mjs");
/* harmony import */ var _geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../geometry/models.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/models.mjs");
/* harmony import */ var _geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../geometry/utils.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/utils.mjs");
/* harmony import */ var _shared_stack_mjs__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../shared/stack.mjs */ "./node_modules/framer-motion/dist/es/projection/shared/stack.mjs");
/* harmony import */ var _styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../styles/scale-correction.mjs */ "./node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs");
/* harmony import */ var _styles_transform_mjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../styles/transform.mjs */ "./node_modules/framer-motion/dist/es/projection/styles/transform.mjs");
/* harmony import */ var _utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../utils/each-axis.mjs */ "./node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs");
/* harmony import */ var _utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../utils/has-transform.mjs */ "./node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs");
/* harmony import */ var _state_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state.mjs */ "./node_modules/framer-motion/dist/es/projection/node/state.mjs");






























const metrics = {
    nodes: 0,
    calculatedTargetDeltas: 0,
    calculatedProjections: 0,
};
const transformAxes = ["", "X", "Y", "Z"];
const hiddenVisibility = { visibility: "hidden" };
/**
 * We use 1000 as the animation target as 0-1000 maps better to pixels than 0-1
 * which has a noticeable difference in spring animations
 */
const animationTarget = 1000;
let id = 0;
function resetDistortingTransform(key, visualElement, values, sharedAnimationValues) {
    const { latestValues } = visualElement;
    // Record the distorting transform and then temporarily set it to 0
    if (latestValues[key]) {
        values[key] = latestValues[key];
        visualElement.setStaticValue(key, 0);
        if (sharedAnimationValues) {
            sharedAnimationValues[key] = 0;
        }
    }
}
function cancelTreeOptimisedTransformAnimations(projectionNode) {
    projectionNode.hasCheckedOptimisedAppear = true;
    if (projectionNode.root === projectionNode)
        return;
    const { visualElement } = projectionNode.options;
    if (!visualElement)
        return;
    const appearId = (0,_animation_optimized_appear_get_appear_id_mjs__WEBPACK_IMPORTED_MODULE_2__.getOptimisedAppearId)(visualElement);
    if (window.MotionHasOptimisedAnimation(appearId, "transform")) {
        const { layout, layoutId } = projectionNode.options;
        window.MotionCancelOptimisedAnimation(appearId, "transform", _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frame, !(layout || layoutId));
    }
    const { parent } = projectionNode;
    if (parent && !parent.hasCheckedOptimisedAppear) {
        cancelTreeOptimisedTransformAnimations(parent);
    }
}
function createProjectionNode({ attachResizeListener, defaultParent, measureScroll, checkIsScrollRoot, resetTransform, }) {
    return class ProjectionNode {
        constructor(latestValues = {}, parent = defaultParent === null || defaultParent === void 0 ? void 0 : defaultParent()) {
            /**
             * A unique ID generated for every projection node.
             */
            this.id = id++;
            /**
             * An id that represents a unique session instigated by startUpdate.
             */
            this.animationId = 0;
            /**
             * A Set containing all this component's children. This is used to iterate
             * through the children.
             *
             * TODO: This could be faster to iterate as a flat array stored on the root node.
             */
            this.children = new Set();
            /**
             * Options for the node. We use this to configure what kind of layout animations
             * we should perform (if any).
             */
            this.options = {};
            /**
             * We use this to detect when its safe to shut down part of a projection tree.
             * We have to keep projecting children for scale correction and relative projection
             * until all their parents stop performing layout animations.
             */
            this.isTreeAnimating = false;
            this.isAnimationBlocked = false;
            /**
             * Flag to true if we think this layout has been changed. We can't always know this,
             * currently we set it to true every time a component renders, or if it has a layoutDependency
             * if that has changed between renders. Additionally, components can be grouped by LayoutGroup
             * and if one node is dirtied, they all are.
             */
            this.isLayoutDirty = false;
            /**
             * Flag to true if we think the projection calculations for this node needs
             * recalculating as a result of an updated transform or layout animation.
             */
            this.isProjectionDirty = false;
            /**
             * Flag to true if the layout *or* transform has changed. This then gets propagated
             * throughout the projection tree, forcing any element below to recalculate on the next frame.
             */
            this.isSharedProjectionDirty = false;
            /**
             * Flag transform dirty. This gets propagated throughout the whole tree but is only
             * respected by shared nodes.
             */
            this.isTransformDirty = false;
            /**
             * Block layout updates for instant layout transitions throughout the tree.
             */
            this.updateManuallyBlocked = false;
            this.updateBlockedByResize = false;
            /**
             * Set to true between the start of the first `willUpdate` call and the end of the `didUpdate`
             * call.
             */
            this.isUpdating = false;
            /**
             * If this is an SVG element we currently disable projection transforms
             */
            this.isSVG = false;
            /**
             * Flag to true (during promotion) if a node doing an instant layout transition needs to reset
             * its projection styles.
             */
            this.needsReset = false;
            /**
             * Flags whether this node should have its transform reset prior to measuring.
             */
            this.shouldResetTransform = false;
            /**
             * Store whether this node has been checked for optimised appear animations. As
             * effects fire bottom-up, and we want to look up the tree for appear animations,
             * this makes sure we only check each path once, stopping at nodes that
             * have already been checked.
             */
            this.hasCheckedOptimisedAppear = false;
            /**
             * An object representing the calculated contextual/accumulated/tree scale.
             * This will be used to scale calculcated projection transforms, as these are
             * calculated in screen-space but need to be scaled for elements to layoutly
             * make it to their calculated destinations.
             *
             * TODO: Lazy-init
             */
            this.treeScale = { x: 1, y: 1 };
            /**
             *
             */
            this.eventHandlers = new Map();
            this.hasTreeAnimated = false;
            // Note: Currently only running on root node
            this.updateScheduled = false;
            this.scheduleUpdate = () => this.update();
            this.projectionUpdateScheduled = false;
            this.checkUpdateFailed = () => {
                if (this.isUpdating) {
                    this.isUpdating = false;
                    this.clearAllSnapshots();
                }
            };
            /**
             * This is a multi-step process as shared nodes might be of different depths. Nodes
             * are sorted by depth order, so we need to resolve the entire tree before moving to
             * the next step.
             */
            this.updateProjection = () => {
                this.projectionUpdateScheduled = false;
                /**
                 * Reset debug counts. Manually resetting rather than creating a new
                 * object each frame.
                 */
                if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__.statsBuffer.value) {
                    metrics.nodes =
                        metrics.calculatedTargetDeltas =
                            metrics.calculatedProjections =
                                0;
                }
                this.nodes.forEach(propagateDirtyNodes);
                this.nodes.forEach(resolveTargetDelta);
                this.nodes.forEach(calcProjection);
                this.nodes.forEach(cleanDirtyNodes);
                if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__.statsBuffer.addProjectionMetrics) {
                    _stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__.statsBuffer.addProjectionMetrics(metrics);
                }
            };
            /**
             * Frame calculations
             */
            this.resolvedRelativeTargetAt = 0.0;
            this.hasProjected = false;
            this.isVisible = true;
            this.animationProgress = 0;
            /**
             * Shared layout
             */
            // TODO Only running on root node
            this.sharedNodes = new Map();
            this.latestValues = latestValues;
            this.root = parent ? parent.root || parent : this;
            this.path = parent ? [...parent.path, parent] : [];
            this.parent = parent;
            this.depth = parent ? parent.depth + 1 : 0;
            for (let i = 0; i < this.path.length; i++) {
                this.path[i].shouldResetTransform = true;
            }
            if (this.root === this)
                this.nodes = new _render_utils_flat_tree_mjs__WEBPACK_IMPORTED_MODULE_5__.FlatTree();
        }
        addEventListener(name, handler) {
            if (!this.eventHandlers.has(name)) {
                this.eventHandlers.set(name, new _utils_subscription_manager_mjs__WEBPACK_IMPORTED_MODULE_6__.SubscriptionManager());
            }
            return this.eventHandlers.get(name).add(handler);
        }
        notifyListeners(name, ...args) {
            const subscriptionManager = this.eventHandlers.get(name);
            subscriptionManager && subscriptionManager.notify(...args);
        }
        hasListeners(name) {
            return this.eventHandlers.has(name);
        }
        /**
         * Lifecycles
         */
        mount(instance, isLayoutDirty = this.root.hasTreeAnimated) {
            if (this.instance)
                return;
            this.isSVG = (0,_render_dom_utils_is_svg_element_mjs__WEBPACK_IMPORTED_MODULE_7__.isSVGElement)(instance);
            this.instance = instance;
            const { layoutId, layout, visualElement } = this.options;
            if (visualElement && !visualElement.current) {
                visualElement.mount(instance);
            }
            this.root.nodes.add(this);
            this.parent && this.parent.children.add(this);
            if (isLayoutDirty && (layout || layoutId)) {
                this.isLayoutDirty = true;
            }
            if (attachResizeListener) {
                let cancelDelay;
                const resizeUnblockUpdate = () => (this.root.updateBlockedByResize = false);
                attachResizeListener(instance, () => {
                    this.root.updateBlockedByResize = true;
                    cancelDelay && cancelDelay();
                    cancelDelay = (0,_utils_delay_mjs__WEBPACK_IMPORTED_MODULE_8__.delay)(resizeUnblockUpdate, 250);
                    if (_state_mjs__WEBPACK_IMPORTED_MODULE_9__.globalProjectionState.hasAnimatedSinceResize) {
                        _state_mjs__WEBPACK_IMPORTED_MODULE_9__.globalProjectionState.hasAnimatedSinceResize = false;
                        this.nodes.forEach(finishAnimation);
                    }
                });
            }
            if (layoutId) {
                this.root.registerSharedNode(layoutId, this);
            }
            // Only register the handler if it requires layout animation
            if (this.options.animate !== false &&
                visualElement &&
                (layoutId || layout)) {
                this.addEventListener("didUpdate", ({ delta, hasLayoutChanged, hasRelativeLayoutChanged, layout: newLayout, }) => {
                    if (this.isTreeAnimationBlocked()) {
                        this.target = undefined;
                        this.relativeTarget = undefined;
                        return;
                    }
                    // TODO: Check here if an animation exists
                    const layoutTransition = this.options.transition ||
                        visualElement.getDefaultTransition() ||
                        defaultLayoutTransition;
                    const { onLayoutAnimationStart, onLayoutAnimationComplete, } = visualElement.getProps();
                    /**
                     * The target layout of the element might stay the same,
                     * but its position relative to its parent has changed.
                     */
                    const hasTargetChanged = !this.targetLayout ||
                        !(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_10__.boxEqualsRounded)(this.targetLayout, newLayout);
                    /*
                     * Note: Disabled to fix relative animations always triggering new
                     * layout animations. If this causes further issues, we can try
                     * a different approach to detecting relative target changes.
                     */
                    // || hasRelativeLayoutChanged
                    /**
                     * If the layout hasn't seemed to have changed, it might be that the
                     * element is visually in the same place in the document but its position
                     * relative to its parent has indeed changed. So here we check for that.
                     */
                    const hasOnlyRelativeTargetChanged = !hasLayoutChanged && hasRelativeLayoutChanged;
                    if (this.options.layoutRoot ||
                        this.resumeFrom ||
                        hasOnlyRelativeTargetChanged ||
                        (hasLayoutChanged &&
                            (hasTargetChanged || !this.currentAnimation))) {
                        if (this.resumeFrom) {
                            this.resumingFrom = this.resumeFrom;
                            this.resumingFrom.resumingFrom = undefined;
                        }
                        this.setAnimationOrigin(delta, hasOnlyRelativeTargetChanged);
                        const animationOptions = {
                            ...(0,motion_dom__WEBPACK_IMPORTED_MODULE_0__.getValueTransition)(layoutTransition, "layout"),
                            onPlay: onLayoutAnimationStart,
                            onComplete: onLayoutAnimationComplete,
                        };
                        if (visualElement.shouldReduceMotion ||
                            this.options.layoutRoot) {
                            animationOptions.delay = 0;
                            animationOptions.type = false;
                        }
                        this.startAnimation(animationOptions);
                    }
                    else {
                        /**
                         * If the layout hasn't changed and we have an animation that hasn't started yet,
                         * finish it immediately. Otherwise it will be animating from a location
                         * that was probably never commited to screen and look like a jumpy box.
                         */
                        if (!hasLayoutChanged) {
                            finishAnimation(this);
                        }
                        if (this.isLead() && this.options.onExitComplete) {
                            this.options.onExitComplete();
                        }
                    }
                    this.targetLayout = newLayout;
                });
            }
        }
        unmount() {
            this.options.layoutId && this.willUpdate();
            this.root.nodes.remove(this);
            const stack = this.getStack();
            stack && stack.remove(this);
            this.parent && this.parent.children.delete(this);
            this.instance = undefined;
            (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.cancelFrame)(this.updateProjection);
        }
        // only on the root
        blockUpdate() {
            this.updateManuallyBlocked = true;
        }
        unblockUpdate() {
            this.updateManuallyBlocked = false;
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize;
        }
        isTreeAnimationBlocked() {
            return (this.isAnimationBlocked ||
                (this.parent && this.parent.isTreeAnimationBlocked()) ||
                false);
        }
        // Note: currently only running on root node
        startUpdate() {
            if (this.isUpdateBlocked())
                return;
            this.isUpdating = true;
            this.nodes && this.nodes.forEach(resetSkewAndRotation);
            this.animationId++;
        }
        getTransformTemplate() {
            const { visualElement } = this.options;
            return visualElement && visualElement.getProps().transformTemplate;
        }
        willUpdate(shouldNotifyListeners = true) {
            this.root.hasTreeAnimated = true;
            if (this.root.isUpdateBlocked()) {
                this.options.onExitComplete && this.options.onExitComplete();
                return;
            }
            /**
             * If we're running optimised appear animations then these must be
             * cancelled before measuring the DOM. This is so we can measure
             * the true layout of the element rather than the WAAPI animation
             * which will be unaffected by the resetSkewAndRotate step.
             *
             * Note: This is a DOM write. Worst case scenario is this is sandwiched
             * between other snapshot reads which will cause unnecessary style recalculations.
             * This has to happen here though, as we don't yet know which nodes will need
             * snapshots in startUpdate(), but we only want to cancel optimised animations
             * if a layout animation measurement is actually going to be affected by them.
             */
            if (window.MotionCancelOptimisedAnimation &&
                !this.hasCheckedOptimisedAppear) {
                cancelTreeOptimisedTransformAnimations(this);
            }
            !this.root.isUpdating && this.root.startUpdate();
            if (this.isLayoutDirty)
                return;
            this.isLayoutDirty = true;
            for (let i = 0; i < this.path.length; i++) {
                const node = this.path[i];
                node.shouldResetTransform = true;
                node.updateScroll("snapshot");
                if (node.options.layoutRoot) {
                    node.willUpdate(false);
                }
            }
            const { layoutId, layout } = this.options;
            if (layoutId === undefined && !layout)
                return;
            const transformTemplate = this.getTransformTemplate();
            this.prevTransformTemplateValue = transformTemplate
                ? transformTemplate(this.latestValues, "")
                : undefined;
            this.updateSnapshot();
            shouldNotifyListeners && this.notifyListeners("willUpdate");
        }
        update() {
            this.updateScheduled = false;
            const updateWasBlocked = this.isUpdateBlocked();
            // When doing an instant transition, we skip the layout update,
            // but should still clean up the measurements so that the next
            // snapshot could be taken correctly.
            if (updateWasBlocked) {
                this.unblockUpdate();
                this.clearAllSnapshots();
                this.nodes.forEach(clearMeasurements);
                return;
            }
            if (!this.isUpdating) {
                this.nodes.forEach(clearIsLayoutDirty);
            }
            this.isUpdating = false;
            /**
             * Write
             */
            this.nodes.forEach(resetTransformStyle);
            /**
             * Read ==================
             */
            // Update layout measurements of updated children
            this.nodes.forEach(updateLayout);
            /**
             * Write
             */
            // Notify listeners that the layout is updated
            this.nodes.forEach(notifyLayoutUpdate);
            this.clearAllSnapshots();
            /**
             * Manually flush any pending updates. Ideally
             * we could leave this to the following requestAnimationFrame but this seems
             * to leave a flash of incorrectly styled content.
             */
            const now = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_11__.time.now();
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData.delta = (0,_utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_12__.clamp)(0, 1000 / 60, now - _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData.timestamp);
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData.timestamp = now;
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData.isProcessing = true;
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameSteps.update.process(_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData);
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameSteps.preRender.process(_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData);
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameSteps.render.process(_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData);
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData.isProcessing = false;
        }
        didUpdate() {
            if (!this.updateScheduled) {
                this.updateScheduled = true;
                _frameloop_microtask_mjs__WEBPACK_IMPORTED_MODULE_13__.microtask.read(this.scheduleUpdate);
            }
        }
        clearAllSnapshots() {
            this.nodes.forEach(clearSnapshot);
            this.sharedNodes.forEach(removeLeadSnapshots);
        }
        scheduleUpdateProjection() {
            if (!this.projectionUpdateScheduled) {
                this.projectionUpdateScheduled = true;
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frame.preRender(this.updateProjection, false, true);
            }
        }
        scheduleCheckAfterUnmount() {
            /**
             * If the unmounting node is in a layoutGroup and did trigger a willUpdate,
             * we manually call didUpdate to give a chance to the siblings to animate.
             * Otherwise, cleanup all snapshots to prevents future nodes from reusing them.
             */
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frame.postRender(() => {
                if (this.isLayoutDirty) {
                    this.root.didUpdate();
                }
                else {
                    this.root.checkUpdateFailed();
                }
            });
        }
        /**
         * Update measurements
         */
        updateSnapshot() {
            if (this.snapshot || !this.instance)
                return;
            this.snapshot = this.measure();
            if (this.snapshot &&
                !(0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcLength)(this.snapshot.measuredBox.x) &&
                !(0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcLength)(this.snapshot.measuredBox.y)) {
                this.snapshot = undefined;
            }
        }
        updateLayout() {
            if (!this.instance)
                return;
            // TODO: Incorporate into a forwarded scroll offset
            this.updateScroll();
            if (!(this.options.alwaysMeasureLayout && this.isLead()) &&
                !this.isLayoutDirty) {
                return;
            }
            /**
             * When a node is mounted, it simply resumes from the prevLead's
             * snapshot instead of taking a new one, but the ancestors scroll
             * might have updated while the prevLead is unmounted. We need to
             * update the scroll again to make sure the layout we measure is
             * up to date.
             */
            if (this.resumeFrom && !this.resumeFrom.instance) {
                for (let i = 0; i < this.path.length; i++) {
                    const node = this.path[i];
                    node.updateScroll();
                }
            }
            const prevLayout = this.layout;
            this.layout = this.measure(false);
            this.layoutCorrected = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
            this.isLayoutDirty = false;
            this.projectionDelta = undefined;
            this.notifyListeners("measure", this.layout.layoutBox);
            const { visualElement } = this.options;
            visualElement &&
                visualElement.notify("LayoutMeasure", this.layout.layoutBox, prevLayout ? prevLayout.layoutBox : undefined);
        }
        updateScroll(phase = "measure") {
            let needsMeasurement = Boolean(this.options.layoutScroll && this.instance);
            if (this.scroll &&
                this.scroll.animationId === this.root.animationId &&
                this.scroll.phase === phase) {
                needsMeasurement = false;
            }
            if (needsMeasurement) {
                const isRoot = checkIsScrollRoot(this.instance);
                this.scroll = {
                    animationId: this.root.animationId,
                    phase,
                    isRoot,
                    offset: measureScroll(this.instance),
                    wasRoot: this.scroll ? this.scroll.isRoot : isRoot,
                };
            }
        }
        resetTransform() {
            if (!resetTransform)
                return;
            const isResetRequested = this.isLayoutDirty ||
                this.shouldResetTransform ||
                this.options.alwaysMeasureLayout;
            const hasProjection = this.projectionDelta && !(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_10__.isDeltaZero)(this.projectionDelta);
            const transformTemplate = this.getTransformTemplate();
            const transformTemplateValue = transformTemplate
                ? transformTemplate(this.latestValues, "")
                : undefined;
            const transformTemplateHasChanged = transformTemplateValue !== this.prevTransformTemplateValue;
            if (isResetRequested &&
                (hasProjection ||
                    (0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_16__.hasTransform)(this.latestValues) ||
                    transformTemplateHasChanged)) {
                resetTransform(this.instance, transformTemplateValue);
                this.shouldResetTransform = false;
                this.scheduleRender();
            }
        }
        measure(removeTransform = true) {
            const pageBox = this.measurePageBox();
            let layoutBox = this.removeElementScroll(pageBox);
            /**
             * Measurements taken during the pre-render stage
             * still have transforms applied so we remove them
             * via calculation.
             */
            if (removeTransform) {
                layoutBox = this.removeTransform(layoutBox);
            }
            roundBox(layoutBox);
            return {
                animationId: this.root.animationId,
                measuredBox: pageBox,
                layoutBox,
                latestValues: {},
                source: this.id,
            };
        }
        measurePageBox() {
            var _a;
            const { visualElement } = this.options;
            if (!visualElement)
                return (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
            const box = visualElement.measureViewportBox();
            const wasInScrollRoot = ((_a = this.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot) || this.path.some(checkNodeWasScrollRoot);
            if (!wasInScrollRoot) {
                // Remove viewport scroll to give page-relative coordinates
                const { scroll } = this.root;
                if (scroll) {
                    (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_17__.translateAxis)(box.x, scroll.offset.x);
                    (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_17__.translateAxis)(box.y, scroll.offset.y);
                }
            }
            return box;
        }
        removeElementScroll(box) {
            var _a;
            const boxWithoutScroll = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(boxWithoutScroll, box);
            if ((_a = this.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot) {
                return boxWithoutScroll;
            }
            /**
             * Performance TODO: Keep a cumulative scroll offset down the tree
             * rather than loop back up the path.
             */
            for (let i = 0; i < this.path.length; i++) {
                const node = this.path[i];
                const { scroll, options } = node;
                if (node !== this.root && scroll && options.layoutScroll) {
                    /**
                     * If this is a new scroll root, we want to remove all previous scrolls
                     * from the viewport box.
                     */
                    if (scroll.wasRoot) {
                        (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(boxWithoutScroll, box);
                    }
                    (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_17__.translateAxis)(boxWithoutScroll.x, scroll.offset.x);
                    (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_17__.translateAxis)(boxWithoutScroll.y, scroll.offset.y);
                }
            }
            return boxWithoutScroll;
        }
        applyTransform(box, transformOnly = false) {
            const withTransforms = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(withTransforms, box);
            for (let i = 0; i < this.path.length; i++) {
                const node = this.path[i];
                if (!transformOnly &&
                    node.options.layoutScroll &&
                    node.scroll &&
                    node !== node.root) {
                    (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_17__.transformBox)(withTransforms, {
                        x: -node.scroll.offset.x,
                        y: -node.scroll.offset.y,
                    });
                }
                if (!(0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_16__.hasTransform)(node.latestValues))
                    continue;
                (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_17__.transformBox)(withTransforms, node.latestValues);
            }
            if ((0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_16__.hasTransform)(this.latestValues)) {
                (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_17__.transformBox)(withTransforms, this.latestValues);
            }
            return withTransforms;
        }
        removeTransform(box) {
            const boxWithoutTransform = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(boxWithoutTransform, box);
            for (let i = 0; i < this.path.length; i++) {
                const node = this.path[i];
                if (!node.instance)
                    continue;
                if (!(0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_16__.hasTransform)(node.latestValues))
                    continue;
                (0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_16__.hasScale)(node.latestValues) && node.updateSnapshot();
                const sourceBox = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
                const nodeBox = node.measurePageBox();
                (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(sourceBox, nodeBox);
                (0,_geometry_delta_remove_mjs__WEBPACK_IMPORTED_MODULE_19__.removeBoxTransforms)(boxWithoutTransform, node.latestValues, node.snapshot ? node.snapshot.layoutBox : undefined, sourceBox);
            }
            if ((0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_16__.hasTransform)(this.latestValues)) {
                (0,_geometry_delta_remove_mjs__WEBPACK_IMPORTED_MODULE_19__.removeBoxTransforms)(boxWithoutTransform, this.latestValues);
            }
            return boxWithoutTransform;
        }
        setTargetDelta(delta) {
            this.targetDelta = delta;
            this.root.scheduleUpdateProjection();
            this.isProjectionDirty = true;
        }
        setOptions(options) {
            this.options = {
                ...this.options,
                ...options,
                crossfade: options.crossfade !== undefined ? options.crossfade : true,
            };
        }
        clearMeasurements() {
            this.scroll = undefined;
            this.layout = undefined;
            this.snapshot = undefined;
            this.prevTransformTemplateValue = undefined;
            this.targetDelta = undefined;
            this.target = undefined;
            this.isLayoutDirty = false;
        }
        forceRelativeParentToResolveTarget() {
            if (!this.relativeParent)
                return;
            /**
             * If the parent target isn't up-to-date, force it to update.
             * This is an unfortunate de-optimisation as it means any updating relative
             * projection will cause all the relative parents to recalculate back
             * up the tree.
             */
            if (this.relativeParent.resolvedRelativeTargetAt !==
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData.timestamp) {
                this.relativeParent.resolveTargetDelta(true);
            }
        }
        resolveTargetDelta(forceRecalculation = false) {
            var _a;
            /**
             * Once the dirty status of nodes has been spread through the tree, we also
             * need to check if we have a shared node of a different depth that has itself
             * been dirtied.
             */
            const lead = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = lead.isProjectionDirty);
            this.isTransformDirty || (this.isTransformDirty = lead.isTransformDirty);
            this.isSharedProjectionDirty || (this.isSharedProjectionDirty = lead.isSharedProjectionDirty);
            const isShared = Boolean(this.resumingFrom) || this !== lead;
            /**
             * We don't use transform for this step of processing so we don't
             * need to check whether any nodes have changed transform.
             */
            const canSkip = !(forceRecalculation ||
                (isShared && this.isSharedProjectionDirty) ||
                this.isProjectionDirty ||
                ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty) ||
                this.attemptToResolveRelativeTarget ||
                this.root.updateBlockedByResize);
            if (canSkip)
                return;
            const { layout, layoutId } = this.options;
            /**
             * If we have no layout, we can't perform projection, so early return
             */
            if (!this.layout || !(layout || layoutId))
                return;
            this.resolvedRelativeTargetAt = _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData.timestamp;
            /**
             * If we don't have a targetDelta but do have a layout, we can attempt to resolve
             * a relativeParent. This will allow a component to perform scale correction
             * even if no animation has started.
             */
            if (!this.targetDelta && !this.relativeTarget) {
                const relativeParent = this.getClosestProjectingParent();
                if (relativeParent &&
                    relativeParent.layout &&
                    this.animationProgress !== 1) {
                    this.relativeParent = relativeParent;
                    this.forceRelativeParentToResolveTarget();
                    this.relativeTarget = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
                    this.relativeTargetOrigin = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
                    (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcRelativePosition)(this.relativeTargetOrigin, this.layout.layoutBox, relativeParent.layout.layoutBox);
                    (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(this.relativeTarget, this.relativeTargetOrigin);
                }
                else {
                    this.relativeParent = this.relativeTarget = undefined;
                }
            }
            /**
             * If we have no relative target or no target delta our target isn't valid
             * for this frame.
             */
            if (!this.relativeTarget && !this.targetDelta)
                return;
            /**
             * Lazy-init target data structure
             */
            if (!this.target) {
                this.target = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
                this.targetWithTransforms = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
            }
            /**
             * If we've got a relative box for this component, resolve it into a target relative to the parent.
             */
            if (this.relativeTarget &&
                this.relativeTargetOrigin &&
                this.relativeParent &&
                this.relativeParent.target) {
                this.forceRelativeParentToResolveTarget();
                (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcRelativeBox)(this.target, this.relativeTarget, this.relativeParent.target);
                /**
                 * If we've only got a targetDelta, resolve it into a target
                 */
            }
            else if (this.targetDelta) {
                if (Boolean(this.resumingFrom)) {
                    // TODO: This is creating a new object every frame
                    this.target = this.applyTransform(this.layout.layoutBox);
                }
                else {
                    (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(this.target, this.layout.layoutBox);
                }
                (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_17__.applyBoxDelta)(this.target, this.targetDelta);
            }
            else {
                /**
                 * If no target, use own layout as target
                 */
                (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(this.target, this.layout.layoutBox);
            }
            /**
             * If we've been told to attempt to resolve a relative target, do so.
             */
            if (this.attemptToResolveRelativeTarget) {
                this.attemptToResolveRelativeTarget = false;
                const relativeParent = this.getClosestProjectingParent();
                if (relativeParent &&
                    Boolean(relativeParent.resumingFrom) ===
                        Boolean(this.resumingFrom) &&
                    !relativeParent.options.layoutScroll &&
                    relativeParent.target &&
                    this.animationProgress !== 1) {
                    this.relativeParent = relativeParent;
                    this.forceRelativeParentToResolveTarget();
                    this.relativeTarget = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
                    this.relativeTargetOrigin = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
                    (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcRelativePosition)(this.relativeTargetOrigin, this.target, relativeParent.target);
                    (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(this.relativeTarget, this.relativeTargetOrigin);
                }
                else {
                    this.relativeParent = this.relativeTarget = undefined;
                }
            }
            /**
             * Increase debug counter for resolved target deltas
             */
            if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__.statsBuffer.value) {
                metrics.calculatedTargetDeltas++;
            }
        }
        getClosestProjectingParent() {
            if (!this.parent ||
                (0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_16__.hasScale)(this.parent.latestValues) ||
                (0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_16__.has2DTranslate)(this.parent.latestValues)) {
                return undefined;
            }
            if (this.parent.isProjecting()) {
                return this.parent;
            }
            else {
                return this.parent.getClosestProjectingParent();
            }
        }
        isProjecting() {
            return Boolean((this.relativeTarget ||
                this.targetDelta ||
                this.options.layoutRoot) &&
                this.layout);
        }
        calcProjection() {
            var _a;
            const lead = this.getLead();
            const isShared = Boolean(this.resumingFrom) || this !== lead;
            let canSkip = true;
            /**
             * If this is a normal layout animation and neither this node nor its nearest projecting
             * is dirty then we can't skip.
             */
            if (this.isProjectionDirty || ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.isProjectionDirty)) {
                canSkip = false;
            }
            /**
             * If this is a shared layout animation and this node's shared projection is dirty then
             * we can't skip.
             */
            if (isShared &&
                (this.isSharedProjectionDirty || this.isTransformDirty)) {
                canSkip = false;
            }
            /**
             * If we have resolved the target this frame we must recalculate the
             * projection to ensure it visually represents the internal calculations.
             */
            if (this.resolvedRelativeTargetAt === _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frameData.timestamp) {
                canSkip = false;
            }
            if (canSkip)
                return;
            const { layout, layoutId } = this.options;
            /**
             * If this section of the tree isn't animating we can
             * delete our target sources for the following frame.
             */
            this.isTreeAnimating = Boolean((this.parent && this.parent.isTreeAnimating) ||
                this.currentAnimation ||
                this.pendingAnimation);
            if (!this.isTreeAnimating) {
                this.targetDelta = this.relativeTarget = undefined;
            }
            if (!this.layout || !(layout || layoutId))
                return;
            /**
             * Reset the corrected box with the latest values from box, as we're then going
             * to perform mutative operations on it.
             */
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(this.layoutCorrected, this.layout.layoutBox);
            /**
             * Record previous tree scales before updating.
             */
            const prevTreeScaleX = this.treeScale.x;
            const prevTreeScaleY = this.treeScale.y;
            /**
             * Apply all the parent deltas to this box to produce the corrected box. This
             * is the layout box, as it will appear on screen as a result of the transforms of its parents.
             */
            (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_17__.applyTreeDeltas)(this.layoutCorrected, this.treeScale, this.path, isShared);
            /**
             * If this layer needs to perform scale correction but doesn't have a target,
             * use the layout as the target.
             */
            if (lead.layout &&
                !lead.target &&
                (this.treeScale.x !== 1 || this.treeScale.y !== 1)) {
                lead.target = lead.layout.layoutBox;
                lead.targetWithTransforms = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
            }
            const { target } = lead;
            if (!target) {
                /**
                 * If we don't have a target to project into, but we were previously
                 * projecting, we want to remove the stored transform and schedule
                 * a render to ensure the elements reflect the removed transform.
                 */
                if (this.prevProjectionDelta) {
                    this.createProjectionDeltas();
                    this.scheduleRender();
                }
                return;
            }
            if (!this.projectionDelta || !this.prevProjectionDelta) {
                this.createProjectionDeltas();
            }
            else {
                (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyAxisDeltaInto)(this.prevProjectionDelta.x, this.projectionDelta.x);
                (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyAxisDeltaInto)(this.prevProjectionDelta.y, this.projectionDelta.y);
            }
            /**
             * Update the delta between the corrected box and the target box before user-set transforms were applied.
             * This will allow us to calculate the corrected borderRadius and boxShadow to compensate
             * for our layout reprojection, but still allow them to be scaled correctly by the user.
             * It might be that to simplify this we may want to accept that user-set scale is also corrected
             * and we wouldn't have to keep and calc both deltas, OR we could support a user setting
             * to allow people to choose whether these styles are corrected based on just the
             * layout reprojection or the final bounding box.
             */
            (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcBoxDelta)(this.projectionDelta, this.layoutCorrected, target, this.latestValues);
            if (this.treeScale.x !== prevTreeScaleX ||
                this.treeScale.y !== prevTreeScaleY ||
                !(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_10__.axisDeltaEquals)(this.projectionDelta.x, this.prevProjectionDelta.x) ||
                !(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_10__.axisDeltaEquals)(this.projectionDelta.y, this.prevProjectionDelta.y)) {
                this.hasProjected = true;
                this.scheduleRender();
                this.notifyListeners("projectionUpdate", target);
            }
            /**
             * Increase debug counter for recalculated projections
             */
            if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__.statsBuffer.value) {
                metrics.calculatedProjections++;
            }
        }
        hide() {
            this.isVisible = false;
            // TODO: Schedule render
        }
        show() {
            this.isVisible = true;
            // TODO: Schedule render
        }
        scheduleRender(notifyAll = true) {
            var _a;
            (_a = this.options.visualElement) === null || _a === void 0 ? void 0 : _a.scheduleRender();
            if (notifyAll) {
                const stack = this.getStack();
                stack && stack.scheduleRender();
            }
            if (this.resumingFrom && !this.resumingFrom.instance) {
                this.resumingFrom = undefined;
            }
        }
        createProjectionDeltas() {
            this.prevProjectionDelta = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createDelta)();
            this.projectionDelta = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createDelta)();
            this.projectionDeltaWithTransform = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createDelta)();
        }
        setAnimationOrigin(delta, hasOnlyRelativeTargetChanged = false) {
            const snapshot = this.snapshot;
            const snapshotLatestValues = snapshot
                ? snapshot.latestValues
                : {};
            const mixedValues = { ...this.latestValues };
            const targetDelta = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createDelta)();
            if (!this.relativeParent ||
                !this.relativeParent.options.layoutRoot) {
                this.relativeTarget = this.relativeTargetOrigin = undefined;
            }
            this.attemptToResolveRelativeTarget = !hasOnlyRelativeTargetChanged;
            const relativeLayout = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
            const snapshotSource = snapshot ? snapshot.source : undefined;
            const layoutSource = this.layout ? this.layout.source : undefined;
            const isSharedLayoutAnimation = snapshotSource !== layoutSource;
            const stack = this.getStack();
            const isOnlyMember = !stack || stack.members.length <= 1;
            const shouldCrossfadeOpacity = Boolean(isSharedLayoutAnimation &&
                !isOnlyMember &&
                this.options.crossfade === true &&
                !this.path.some(hasOpacityCrossfade));
            this.animationProgress = 0;
            let prevRelativeTarget;
            this.mixTargetDelta = (latest) => {
                const progress = latest / 1000;
                mixAxisDelta(targetDelta.x, delta.x, progress);
                mixAxisDelta(targetDelta.y, delta.y, progress);
                this.setTargetDelta(targetDelta);
                if (this.relativeTarget &&
                    this.relativeTargetOrigin &&
                    this.layout &&
                    this.relativeParent &&
                    this.relativeParent.layout) {
                    (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcRelativePosition)(relativeLayout, this.layout.layoutBox, this.relativeParent.layout.layoutBox);
                    mixBox(this.relativeTarget, this.relativeTargetOrigin, relativeLayout, progress);
                    /**
                     * If this is an unchanged relative target we can consider the
                     * projection not dirty.
                     */
                    if (prevRelativeTarget &&
                        (0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_10__.boxEquals)(this.relativeTarget, prevRelativeTarget)) {
                        this.isProjectionDirty = false;
                    }
                    if (!prevRelativeTarget)
                        prevRelativeTarget = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
                    (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(prevRelativeTarget, this.relativeTarget);
                }
                if (isSharedLayoutAnimation) {
                    this.animationValues = mixedValues;
                    (0,_animation_mix_values_mjs__WEBPACK_IMPORTED_MODULE_20__.mixValues)(mixedValues, snapshotLatestValues, this.latestValues, progress, shouldCrossfadeOpacity, isOnlyMember);
                }
                this.root.scheduleUpdateProjection();
                this.scheduleRender();
                this.animationProgress = progress;
            };
            this.mixTargetDelta(this.options.layoutRoot ? 1000 : 0);
        }
        startAnimation(options) {
            this.notifyListeners("animationStart");
            this.currentAnimation && this.currentAnimation.stop();
            if (this.resumingFrom && this.resumingFrom.currentAnimation) {
                this.resumingFrom.currentAnimation.stop();
            }
            if (this.pendingAnimation) {
                (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.cancelFrame)(this.pendingAnimation);
                this.pendingAnimation = undefined;
            }
            /**
             * Start the animation in the next frame to have a frame with progress 0,
             * where the target is the same as when the animation started, so we can
             * calculate the relative positions correctly for instant transitions.
             */
            this.pendingAnimation = _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frame.update(() => {
                _state_mjs__WEBPACK_IMPORTED_MODULE_9__.globalProjectionState.hasAnimatedSinceResize = true;
                _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_21__.activeAnimations.layout++;
                this.currentAnimation = (0,_animation_animate_single_value_mjs__WEBPACK_IMPORTED_MODULE_22__.animateSingleValue)(0, animationTarget, {
                    ...options,
                    onUpdate: (latest) => {
                        this.mixTargetDelta(latest);
                        options.onUpdate && options.onUpdate(latest);
                    },
                    onStop: () => {
                        _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_21__.activeAnimations.layout--;
                    },
                    onComplete: () => {
                        _stats_animation_count_mjs__WEBPACK_IMPORTED_MODULE_21__.activeAnimations.layout--;
                        options.onComplete && options.onComplete();
                        this.completeAnimation();
                    },
                });
                if (this.resumingFrom) {
                    this.resumingFrom.currentAnimation = this.currentAnimation;
                }
                this.pendingAnimation = undefined;
            });
        }
        completeAnimation() {
            if (this.resumingFrom) {
                this.resumingFrom.currentAnimation = undefined;
                this.resumingFrom.preserveOpacity = undefined;
            }
            const stack = this.getStack();
            stack && stack.exitAnimationComplete();
            this.resumingFrom =
                this.currentAnimation =
                    this.animationValues =
                        undefined;
            this.notifyListeners("animationComplete");
        }
        finishAnimation() {
            if (this.currentAnimation) {
                this.mixTargetDelta && this.mixTargetDelta(animationTarget);
                this.currentAnimation.stop();
            }
            this.completeAnimation();
        }
        applyTransformsToTarget() {
            const lead = this.getLead();
            let { targetWithTransforms, target, layout, latestValues } = lead;
            if (!targetWithTransforms || !target || !layout)
                return;
            /**
             * If we're only animating position, and this element isn't the lead element,
             * then instead of projecting into the lead box we instead want to calculate
             * a new target that aligns the two boxes but maintains the layout shape.
             */
            if (this !== lead &&
                this.layout &&
                layout &&
                shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, layout.layoutBox)) {
                target = this.target || (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
                const xLength = (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcLength)(this.layout.layoutBox.x);
                target.x.min = lead.target.x.min;
                target.x.max = target.x.min + xLength;
                const yLength = (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcLength)(this.layout.layoutBox.y);
                target.y.min = lead.target.y.min;
                target.y.max = target.y.min + yLength;
            }
            (0,_geometry_copy_mjs__WEBPACK_IMPORTED_MODULE_18__.copyBoxInto)(targetWithTransforms, target);
            /**
             * Apply the latest user-set transforms to the targetBox to produce the targetBoxFinal.
             * This is the final box that we will then project into by calculating a transform delta and
             * applying it to the corrected box.
             */
            (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_17__.transformBox)(targetWithTransforms, latestValues);
            /**
             * Update the delta between the corrected box and the final target box, after
             * user-set transforms are applied to it. This will be used by the renderer to
             * create a transform style that will reproject the element from its layout layout
             * into the desired bounding box.
             */
            (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcBoxDelta)(this.projectionDeltaWithTransform, this.layoutCorrected, targetWithTransforms, latestValues);
        }
        registerSharedNode(layoutId, node) {
            if (!this.sharedNodes.has(layoutId)) {
                this.sharedNodes.set(layoutId, new _shared_stack_mjs__WEBPACK_IMPORTED_MODULE_23__.NodeStack());
            }
            const stack = this.sharedNodes.get(layoutId);
            stack.add(node);
            const config = node.options.initialPromotionConfig;
            node.promote({
                transition: config ? config.transition : undefined,
                preserveFollowOpacity: config && config.shouldPreserveFollowOpacity
                    ? config.shouldPreserveFollowOpacity(node)
                    : undefined,
            });
        }
        isLead() {
            const stack = this.getStack();
            return stack ? stack.lead === this : true;
        }
        getLead() {
            var _a;
            const { layoutId } = this.options;
            return layoutId ? ((_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.lead) || this : this;
        }
        getPrevLead() {
            var _a;
            const { layoutId } = this.options;
            return layoutId ? (_a = this.getStack()) === null || _a === void 0 ? void 0 : _a.prevLead : undefined;
        }
        getStack() {
            const { layoutId } = this.options;
            if (layoutId)
                return this.root.sharedNodes.get(layoutId);
        }
        promote({ needsReset, transition, preserveFollowOpacity, } = {}) {
            const stack = this.getStack();
            if (stack)
                stack.promote(this, preserveFollowOpacity);
            if (needsReset) {
                this.projectionDelta = undefined;
                this.needsReset = true;
            }
            if (transition)
                this.setOptions({ transition });
        }
        relegate() {
            const stack = this.getStack();
            if (stack) {
                return stack.relegate(this);
            }
            else {
                return false;
            }
        }
        resetSkewAndRotation() {
            const { visualElement } = this.options;
            if (!visualElement)
                return;
            // If there's no detected skew or rotation values, we can early return without a forced render.
            let hasDistortingTransform = false;
            /**
             * An unrolled check for rotation values. Most elements don't have any rotation and
             * skipping the nested loop and new object creation is 50% faster.
             */
            const { latestValues } = visualElement;
            if (latestValues.z ||
                latestValues.rotate ||
                latestValues.rotateX ||
                latestValues.rotateY ||
                latestValues.rotateZ ||
                latestValues.skewX ||
                latestValues.skewY) {
                hasDistortingTransform = true;
            }
            // If there's no distorting values, we don't need to do any more.
            if (!hasDistortingTransform)
                return;
            const resetValues = {};
            if (latestValues.z) {
                resetDistortingTransform("z", visualElement, resetValues, this.animationValues);
            }
            // Check the skew and rotate value of all axes and reset to 0
            for (let i = 0; i < transformAxes.length; i++) {
                resetDistortingTransform(`rotate${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
                resetDistortingTransform(`skew${transformAxes[i]}`, visualElement, resetValues, this.animationValues);
            }
            // Force a render of this element to apply the transform with all skews and rotations
            // set to 0.
            visualElement.render();
            // Put back all the values we reset
            for (const key in resetValues) {
                visualElement.setStaticValue(key, resetValues[key]);
                if (this.animationValues) {
                    this.animationValues[key] = resetValues[key];
                }
            }
            // Schedule a render for the next frame. This ensures we won't visually
            // see the element with the reset rotate value applied.
            visualElement.scheduleRender();
        }
        getProjectionStyles(styleProp) {
            var _a, _b;
            if (!this.instance || this.isSVG)
                return undefined;
            if (!this.isVisible) {
                return hiddenVisibility;
            }
            const styles = {
                visibility: "",
            };
            const transformTemplate = this.getTransformTemplate();
            if (this.needsReset) {
                this.needsReset = false;
                styles.opacity = "";
                styles.pointerEvents =
                    (0,_value_utils_resolve_motion_value_mjs__WEBPACK_IMPORTED_MODULE_24__.resolveMotionValue)(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
                styles.transform = transformTemplate
                    ? transformTemplate(this.latestValues, "")
                    : "none";
                return styles;
            }
            const lead = this.getLead();
            if (!this.projectionDelta || !this.layout || !lead.target) {
                const emptyStyles = {};
                if (this.options.layoutId) {
                    emptyStyles.opacity =
                        this.latestValues.opacity !== undefined
                            ? this.latestValues.opacity
                            : 1;
                    emptyStyles.pointerEvents =
                        (0,_value_utils_resolve_motion_value_mjs__WEBPACK_IMPORTED_MODULE_24__.resolveMotionValue)(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || "";
                }
                if (this.hasProjected && !(0,_utils_has_transform_mjs__WEBPACK_IMPORTED_MODULE_16__.hasTransform)(this.latestValues)) {
                    emptyStyles.transform = transformTemplate
                        ? transformTemplate({}, "")
                        : "none";
                    this.hasProjected = false;
                }
                return emptyStyles;
            }
            const valuesToRender = lead.animationValues || lead.latestValues;
            this.applyTransformsToTarget();
            styles.transform = (0,_styles_transform_mjs__WEBPACK_IMPORTED_MODULE_25__.buildProjectionTransform)(this.projectionDeltaWithTransform, this.treeScale, valuesToRender);
            if (transformTemplate) {
                styles.transform = transformTemplate(valuesToRender, styles.transform);
            }
            const { x, y } = this.projectionDelta;
            styles.transformOrigin = `${x.origin * 100}% ${y.origin * 100}% 0`;
            if (lead.animationValues) {
                /**
                 * If the lead component is animating, assign this either the entering/leaving
                 * opacity
                 */
                styles.opacity =
                    lead === this
                        ? (_b = (_a = valuesToRender.opacity) !== null && _a !== void 0 ? _a : this.latestValues.opacity) !== null && _b !== void 0 ? _b : 1
                        : this.preserveOpacity
                            ? this.latestValues.opacity
                            : valuesToRender.opacityExit;
            }
            else {
                /**
                 * Or we're not animating at all, set the lead component to its layout
                 * opacity and other components to hidden.
                 */
                styles.opacity =
                    lead === this
                        ? valuesToRender.opacity !== undefined
                            ? valuesToRender.opacity
                            : ""
                        : valuesToRender.opacityExit !== undefined
                            ? valuesToRender.opacityExit
                            : 0;
            }
            /**
             * Apply scale correction
             */
            for (const key in _styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_26__.scaleCorrectors) {
                if (valuesToRender[key] === undefined)
                    continue;
                const { correct, applyTo, isCSSVariable } = _styles_scale_correction_mjs__WEBPACK_IMPORTED_MODULE_26__.scaleCorrectors[key];
                /**
                 * Only apply scale correction to the value if we have an
                 * active projection transform. Otherwise these values become
                 * vulnerable to distortion if the element changes size without
                 * a corresponding layout animation.
                 */
                const corrected = styles.transform === "none"
                    ? valuesToRender[key]
                    : correct(valuesToRender[key], lead);
                if (applyTo) {
                    const num = applyTo.length;
                    for (let i = 0; i < num; i++) {
                        styles[applyTo[i]] = corrected;
                    }
                }
                else {
                    // If this is a CSS variable, set it directly on the instance.
                    // Replacing this function from creating styles to setting them
                    // would be a good place to remove per frame object creation
                    if (isCSSVariable) {
                        this.options.visualElement.renderState.vars[key] = corrected;
                    }
                    else {
                        styles[key] = corrected;
                    }
                }
            }
            /**
             * Disable pointer events on follow components. This is to ensure
             * that if a follow component covers a lead component it doesn't block
             * pointer events on the lead.
             */
            if (this.options.layoutId) {
                styles.pointerEvents =
                    lead === this
                        ? (0,_value_utils_resolve_motion_value_mjs__WEBPACK_IMPORTED_MODULE_24__.resolveMotionValue)(styleProp === null || styleProp === void 0 ? void 0 : styleProp.pointerEvents) || ""
                        : "none";
            }
            return styles;
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = undefined;
        }
        // Only run on root
        resetTree() {
            this.root.nodes.forEach((node) => { var _a; return (_a = node.currentAnimation) === null || _a === void 0 ? void 0 : _a.stop(); });
            this.root.nodes.forEach(clearMeasurements);
            this.root.sharedNodes.clear();
        }
    };
}
function updateLayout(node) {
    node.updateLayout();
}
function notifyLayoutUpdate(node) {
    var _a;
    const snapshot = ((_a = node.resumeFrom) === null || _a === void 0 ? void 0 : _a.snapshot) || node.snapshot;
    if (node.isLead() &&
        node.layout &&
        snapshot &&
        node.hasListeners("didUpdate")) {
        const { layoutBox: layout, measuredBox: measuredLayout } = node.layout;
        const { animationType } = node.options;
        const isShared = snapshot.source !== node.layout.source;
        // TODO Maybe we want to also resize the layout snapshot so we don't trigger
        // animations for instance if layout="size" and an element has only changed position
        if (animationType === "size") {
            (0,_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_27__.eachAxis)((axis) => {
                const axisSnapshot = isShared
                    ? snapshot.measuredBox[axis]
                    : snapshot.layoutBox[axis];
                const length = (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcLength)(axisSnapshot);
                axisSnapshot.min = layout[axis].min;
                axisSnapshot.max = axisSnapshot.min + length;
            });
        }
        else if (shouldAnimatePositionOnly(animationType, snapshot.layoutBox, layout)) {
            (0,_utils_each_axis_mjs__WEBPACK_IMPORTED_MODULE_27__.eachAxis)((axis) => {
                const axisSnapshot = isShared
                    ? snapshot.measuredBox[axis]
                    : snapshot.layoutBox[axis];
                const length = (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcLength)(layout[axis]);
                axisSnapshot.max = axisSnapshot.min + length;
                /**
                 * Ensure relative target gets resized and rerendererd
                 */
                if (node.relativeTarget && !node.currentAnimation) {
                    node.isProjectionDirty = true;
                    node.relativeTarget[axis].max =
                        node.relativeTarget[axis].min + length;
                }
            });
        }
        const layoutDelta = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createDelta)();
        (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcBoxDelta)(layoutDelta, layout, snapshot.layoutBox);
        const visualDelta = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createDelta)();
        if (isShared) {
            (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcBoxDelta)(visualDelta, node.applyTransform(measuredLayout, true), snapshot.measuredBox);
        }
        else {
            (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcBoxDelta)(visualDelta, layout, snapshot.layoutBox);
        }
        const hasLayoutChanged = !(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_10__.isDeltaZero)(layoutDelta);
        let hasRelativeLayoutChanged = false;
        if (!node.resumeFrom) {
            const relativeParent = node.getClosestProjectingParent();
            /**
             * If the relativeParent is itself resuming from a different element then
             * the relative snapshot is not relavent
             */
            if (relativeParent && !relativeParent.resumeFrom) {
                const { snapshot: parentSnapshot, layout: parentLayout } = relativeParent;
                if (parentSnapshot && parentLayout) {
                    const relativeSnapshot = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
                    (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcRelativePosition)(relativeSnapshot, snapshot.layoutBox, parentSnapshot.layoutBox);
                    const relativeLayout = (0,_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_15__.createBox)();
                    (0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.calcRelativePosition)(relativeLayout, layout, parentLayout.layoutBox);
                    if (!(0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_10__.boxEqualsRounded)(relativeSnapshot, relativeLayout)) {
                        hasRelativeLayoutChanged = true;
                    }
                    if (relativeParent.options.layoutRoot) {
                        node.relativeTarget = relativeLayout;
                        node.relativeTargetOrigin = relativeSnapshot;
                        node.relativeParent = relativeParent;
                    }
                }
            }
        }
        node.notifyListeners("didUpdate", {
            layout,
            snapshot,
            delta: visualDelta,
            layoutDelta,
            hasLayoutChanged,
            hasRelativeLayoutChanged,
        });
    }
    else if (node.isLead()) {
        const { onExitComplete } = node.options;
        onExitComplete && onExitComplete();
    }
    /**
     * Clearing transition
     * TODO: Investigate why this transition is being passed in as {type: false } from Framer
     * and why we need it at all
     */
    node.options.transition = undefined;
}
function propagateDirtyNodes(node) {
    /**
     * Increase debug counter for nodes encountered this frame
     */
    if (_stats_buffer_mjs__WEBPACK_IMPORTED_MODULE_4__.statsBuffer.value) {
        metrics.nodes++;
    }
    if (!node.parent)
        return;
    /**
     * If this node isn't projecting, propagate isProjectionDirty. It will have
     * no performance impact but it will allow the next child that *is* projecting
     * but *isn't* dirty to just check its parent to see if *any* ancestor needs
     * correcting.
     */
    if (!node.isProjecting()) {
        node.isProjectionDirty = node.parent.isProjectionDirty;
    }
    /**
     * Propagate isSharedProjectionDirty and isTransformDirty
     * throughout the whole tree. A future revision can take another look at
     * this but for safety we still recalcualte shared nodes.
     */
    node.isSharedProjectionDirty || (node.isSharedProjectionDirty = Boolean(node.isProjectionDirty ||
        node.parent.isProjectionDirty ||
        node.parent.isSharedProjectionDirty));
    node.isTransformDirty || (node.isTransformDirty = node.parent.isTransformDirty);
}
function cleanDirtyNodes(node) {
    node.isProjectionDirty =
        node.isSharedProjectionDirty =
            node.isTransformDirty =
                false;
}
function clearSnapshot(node) {
    node.clearSnapshot();
}
function clearMeasurements(node) {
    node.clearMeasurements();
}
function clearIsLayoutDirty(node) {
    node.isLayoutDirty = false;
}
function resetTransformStyle(node) {
    const { visualElement } = node.options;
    if (visualElement && visualElement.getProps().onBeforeLayoutMeasure) {
        visualElement.notify("BeforeLayoutMeasure");
    }
    node.resetTransform();
}
function finishAnimation(node) {
    node.finishAnimation();
    node.targetDelta = node.relativeTarget = node.target = undefined;
    node.isProjectionDirty = true;
}
function resolveTargetDelta(node) {
    node.resolveTargetDelta();
}
function calcProjection(node) {
    node.calcProjection();
}
function resetSkewAndRotation(node) {
    node.resetSkewAndRotation();
}
function removeLeadSnapshots(stack) {
    stack.removeLeadSnapshot();
}
function mixAxisDelta(output, delta, p) {
    output.translate = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_28__.mixNumber)(delta.translate, 0, p);
    output.scale = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_28__.mixNumber)(delta.scale, 1, p);
    output.origin = delta.origin;
    output.originPoint = delta.originPoint;
}
function mixAxis(output, from, to, p) {
    output.min = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_28__.mixNumber)(from.min, to.min, p);
    output.max = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_28__.mixNumber)(from.max, to.max, p);
}
function mixBox(output, from, to, p) {
    mixAxis(output.x, from.x, to.x, p);
    mixAxis(output.y, from.y, to.y, p);
}
function hasOpacityCrossfade(node) {
    return (node.animationValues && node.animationValues.opacityExit !== undefined);
}
const defaultLayoutTransition = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1],
};
const userAgentContains = (string) => typeof navigator !== "undefined" &&
    navigator.userAgent &&
    navigator.userAgent.toLowerCase().includes(string);
/**
 * Measured bounding boxes must be rounded in Safari and
 * left untouched in Chrome, otherwise non-integer layouts within scaled-up elements
 * can appear to jump.
 */
const roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/")
    ? Math.round
    : motion_utils__WEBPACK_IMPORTED_MODULE_1__.noop;
function roundAxis(axis) {
    // Round to the nearest .5 pixels to support subpixel layouts
    axis.min = roundPoint(axis.min);
    axis.max = roundPoint(axis.max);
}
function roundBox(box) {
    roundAxis(box.x);
    roundAxis(box.y);
}
function shouldAnimatePositionOnly(animationType, snapshot, layout) {
    return (animationType === "position" ||
        (animationType === "preserve-aspect" &&
            !(0,_geometry_delta_calc_mjs__WEBPACK_IMPORTED_MODULE_14__.isNear)((0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_10__.aspectRatio)(snapshot), (0,_geometry_utils_mjs__WEBPACK_IMPORTED_MODULE_10__.aspectRatio)(layout), 0.2)));
}
function checkNodeWasScrollRoot(node) {
    var _a;
    return node !== node.root && ((_a = node.scroll) === null || _a === void 0 ? void 0 : _a.wasRoot);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/node/state.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/node/state.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   globalProjectionState: () => (/* binding */ globalProjectionState)
/* harmony export */ });
/**
 * This should only ever be modified on the client otherwise it'll
 * persist through server requests. If we need instanced states we
 * could lazy-init via root.
 */
const globalProjectionState = {
    /**
     * Global flag as to whether the tree has animated since the last time
     * we resized the window
     */
    hasAnimatedSinceResize: true,
    /**
     * We set this to true once, on the first update. Any nodes added to the tree beyond that
     * update will be given a `data-projection-id` attribute.
     */
    hasEverUpdated: false,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/shared/stack.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/shared/stack.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NodeStack: () => (/* binding */ NodeStack)
/* harmony export */ });
/* harmony import */ var _utils_array_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/array.mjs */ "./node_modules/framer-motion/dist/es/utils/array.mjs");


class NodeStack {
    constructor() {
        this.members = [];
    }
    add(node) {
        (0,_utils_array_mjs__WEBPACK_IMPORTED_MODULE_0__.addUniqueItem)(this.members, node);
        node.scheduleRender();
    }
    remove(node) {
        (0,_utils_array_mjs__WEBPACK_IMPORTED_MODULE_0__.removeItem)(this.members, node);
        if (node === this.prevLead) {
            this.prevLead = undefined;
        }
        if (node === this.lead) {
            const prevLead = this.members[this.members.length - 1];
            if (prevLead) {
                this.promote(prevLead);
            }
        }
    }
    relegate(node) {
        const indexOfNode = this.members.findIndex((member) => node === member);
        if (indexOfNode === 0)
            return false;
        /**
         * Find the next projection node that is present
         */
        let prevLead;
        for (let i = indexOfNode; i >= 0; i--) {
            const member = this.members[i];
            if (member.isPresent !== false) {
                prevLead = member;
                break;
            }
        }
        if (prevLead) {
            this.promote(prevLead);
            return true;
        }
        else {
            return false;
        }
    }
    promote(node, preserveFollowOpacity) {
        const prevLead = this.lead;
        if (node === prevLead)
            return;
        this.prevLead = prevLead;
        this.lead = node;
        node.show();
        if (prevLead) {
            prevLead.instance && prevLead.scheduleRender();
            node.scheduleRender();
            node.resumeFrom = prevLead;
            if (preserveFollowOpacity) {
                node.resumeFrom.preserveOpacity = true;
            }
            if (prevLead.snapshot) {
                node.snapshot = prevLead.snapshot;
                node.snapshot.latestValues =
                    prevLead.animationValues || prevLead.latestValues;
            }
            if (node.root && node.root.isUpdating) {
                node.isLayoutDirty = true;
            }
            const { crossfade } = node.options;
            if (crossfade === false) {
                prevLead.hide();
            }
            /**
             * TODO:
             *   - Test border radius when previous node was deleted
             *   - boxShadow mixing
             *   - Shared between element A in scrolled container and element B (scroll stays the same or changes)
             *   - Shared between element A in transformed container and element B (transform stays the same or changes)
             *   - Shared between element A in scrolled page and element B (scroll stays the same or changes)
             * ---
             *   - Crossfade opacity of root nodes
             *   - layoutId changes after animation
             *   - layoutId changes mid animation
             */
        }
    }
    exitAnimationComplete() {
        this.members.forEach((node) => {
            const { options, resumingFrom } = node;
            options.onExitComplete && options.onExitComplete();
            if (resumingFrom) {
                resumingFrom.options.onExitComplete &&
                    resumingFrom.options.onExitComplete();
            }
        });
    }
    scheduleRender() {
        this.members.forEach((node) => {
            node.instance && node.scheduleRender(false);
        });
    }
    /**
     * Clear any leads that have been removed this render to prevent them from being
     * used in future animations and to prevent memory leaks
     */
    removeLeadSnapshot() {
        if (this.lead && this.lead.snapshot) {
            this.lead.snapshot = undefined;
        }
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/styles/scale-border-radius.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   correctBorderRadius: () => (/* binding */ correctBorderRadius),
/* harmony export */   pixelsToPercent: () => (/* binding */ pixelsToPercent)
/* harmony export */ });
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/types/numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");


function pixelsToPercent(pixels, axis) {
    if (axis.max === axis.min)
        return 0;
    return (pixels / (axis.max - axis.min)) * 100;
}
/**
 * We always correct borderRadius as a percentage rather than pixels to reduce paints.
 * For example, if you are projecting a box that is 100px wide with a 10px borderRadius
 * into a box that is 200px wide with a 20px borderRadius, that is actually a 10%
 * borderRadius in both states. If we animate between the two in pixels that will trigger
 * a paint each time. If we animate between the two in percentage we'll avoid a paint.
 */
const correctBorderRadius = {
    correct: (latest, node) => {
        if (!node.target)
            return latest;
        /**
         * If latest is a string, if it's a percentage we can return immediately as it's
         * going to be stretched appropriately. Otherwise, if it's a pixel, convert it to a number.
         */
        if (typeof latest === "string") {
            if (_value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px.test(latest)) {
                latest = parseFloat(latest);
            }
            else {
                return latest;
            }
        }
        /**
         * If latest is a number, it's a pixel value. We use the current viewportBox to calculate that
         * pixel value as a percentage of each axis
         */
        const x = pixelsToPercent(latest, node.target.x);
        const y = pixelsToPercent(latest, node.target.y);
        return `${x}% ${y}%`;
    },
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/styles/scale-box-shadow.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   correctBoxShadow: () => (/* binding */ correctBoxShadow)
/* harmony export */ });
/* harmony import */ var _utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/mix/number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/types/complex/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/complex/index.mjs");



const correctBoxShadow = {
    correct: (latest, { treeScale, projectionDelta }) => {
        const original = latest;
        const shadow = _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__.complex.parse(latest);
        // TODO: Doesn't support multiple shadows
        if (shadow.length > 5)
            return original;
        const template = _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__.complex.createTransformer(latest);
        const offset = typeof shadow[0] !== "number" ? 1 : 0;
        // Calculate the overall context scale
        const xScale = projectionDelta.x.scale * treeScale.x;
        const yScale = projectionDelta.y.scale * treeScale.y;
        shadow[0 + offset] /= xScale;
        shadow[1 + offset] /= yScale;
        /**
         * Ideally we'd correct x and y scales individually, but because blur and
         * spread apply to both we have to take a scale average and apply that instead.
         * We could potentially improve the outcome of this by incorporating the ratio between
         * the two scales.
         */
        const averageScale = (0,_utils_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__.mixNumber)(xScale, yScale, 0.5);
        // Blur
        if (typeof shadow[2 + offset] === "number")
            shadow[2 + offset] /= averageScale;
        // Spread
        if (typeof shadow[3 + offset] === "number")
            shadow[3 + offset] /= averageScale;
        return template(shadow);
    },
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/styles/scale-correction.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addScaleCorrector: () => (/* binding */ addScaleCorrector),
/* harmony export */   scaleCorrectors: () => (/* binding */ scaleCorrectors)
/* harmony export */ });
/* harmony import */ var _render_dom_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../render/dom/utils/is-css-variable.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs");


const scaleCorrectors = {};
function addScaleCorrector(correctors) {
    for (const key in correctors) {
        scaleCorrectors[key] = correctors[key];
        if ((0,_render_dom_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_0__.isCSSVariableName)(key)) {
            scaleCorrectors[key].isCSSVariable = true;
        }
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/styles/transform.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/styles/transform.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildProjectionTransform: () => (/* binding */ buildProjectionTransform)
/* harmony export */ });
function buildProjectionTransform(delta, treeScale, latestTransform) {
    let transform = "";
    /**
     * The translations we use to calculate are always relative to the viewport coordinate space.
     * But when we apply scales, we also scale the coordinate space of an element and its children.
     * For instance if we have a treeScale (the culmination of all parent scales) of 0.5 and we need
     * to move an element 100 pixels, we actually need to move it 200 in within that scaled space.
     */
    const xTranslate = delta.x.translate / treeScale.x;
    const yTranslate = delta.y.translate / treeScale.y;
    const zTranslate = (latestTransform === null || latestTransform === void 0 ? void 0 : latestTransform.z) || 0;
    if (xTranslate || yTranslate || zTranslate) {
        transform = `translate3d(${xTranslate}px, ${yTranslate}px, ${zTranslate}px) `;
    }
    /**
     * Apply scale correction for the tree transform.
     * This will apply scale to the screen-orientated axes.
     */
    if (treeScale.x !== 1 || treeScale.y !== 1) {
        transform += `scale(${1 / treeScale.x}, ${1 / treeScale.y}) `;
    }
    if (latestTransform) {
        const { transformPerspective, rotate, rotateX, rotateY, skewX, skewY } = latestTransform;
        if (transformPerspective)
            transform = `perspective(${transformPerspective}px) ${transform}`;
        if (rotate)
            transform += `rotate(${rotate}deg) `;
        if (rotateX)
            transform += `rotateX(${rotateX}deg) `;
        if (rotateY)
            transform += `rotateY(${rotateY}deg) `;
        if (skewX)
            transform += `skewX(${skewX}deg) `;
        if (skewY)
            transform += `skewY(${skewY}deg) `;
    }
    /**
     * Apply scale to match the size of the element to the size we want it.
     * This will apply scale to the element-orientated axes.
     */
    const elementScaleX = delta.x.scale * treeScale.x;
    const elementScaleY = delta.y.scale * treeScale.y;
    if (elementScaleX !== 1 || elementScaleY !== 1) {
        transform += `scale(${elementScaleX}, ${elementScaleY})`;
    }
    return transform || "none";
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/utils/each-axis.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eachAxis: () => (/* binding */ eachAxis)
/* harmony export */ });
function eachAxis(callback) {
    return [callback("x"), callback("y")];
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/utils/has-transform.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   has2DTranslate: () => (/* binding */ has2DTranslate),
/* harmony export */   hasScale: () => (/* binding */ hasScale),
/* harmony export */   hasTransform: () => (/* binding */ hasTransform)
/* harmony export */ });
function isIdentityScale(scale) {
    return scale === undefined || scale === 1;
}
function hasScale({ scale, scaleX, scaleY }) {
    return (!isIdentityScale(scale) ||
        !isIdentityScale(scaleX) ||
        !isIdentityScale(scaleY));
}
function hasTransform(values) {
    return (hasScale(values) ||
        has2DTranslate(values) ||
        values.z ||
        values.rotate ||
        values.rotateX ||
        values.rotateY ||
        values.skewX ||
        values.skewY);
}
function has2DTranslate(values) {
    return is2DTranslate(values.x) || is2DTranslate(values.y);
}
function is2DTranslate(value) {
    return value && value !== "0%";
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/projection/utils/measure.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/projection/utils/measure.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   measurePageBox: () => (/* binding */ measurePageBox),
/* harmony export */   measureViewportBox: () => (/* binding */ measureViewportBox)
/* harmony export */ });
/* harmony import */ var _geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/conversion.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/conversion.mjs");
/* harmony import */ var _geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../geometry/delta-apply.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/delta-apply.mjs");



function measureViewportBox(instance, transformPoint) {
    return (0,_geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__.convertBoundingBoxToBox)((0,_geometry_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__.transformBoxPoints)(instance.getBoundingClientRect(), transformPoint));
}
function measurePageBox(element, rootProjectionNode, transformPagePoint) {
    const viewportBox = measureViewportBox(element, transformPagePoint);
    const { scroll } = rootProjectionNode;
    if (scroll) {
        (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_1__.translateAxis)(viewportBox.x, scroll.offset.x);
        (0,_geometry_delta_apply_mjs__WEBPACK_IMPORTED_MODULE_1__.translateAxis)(viewportBox.y, scroll.offset.y);
    }
    return viewportBox;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/VisualElement.mjs":
/*!*********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/VisualElement.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VisualElement: () => (/* binding */ VisualElement)
/* harmony export */ });
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../frameloop/sync-time.mjs */ "./node_modules/framer-motion/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _motion_features_definitions_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../motion/features/definitions.mjs */ "./node_modules/framer-motion/dist/es/motion/features/definitions.mjs");
/* harmony import */ var _projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../projection/geometry/models.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/models.mjs");
/* harmony import */ var _utils_is_numerical_string_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../utils/is-numerical-string.mjs */ "./node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs");
/* harmony import */ var _utils_is_zero_value_string_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../utils/is-zero-value-string.mjs */ "./node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs");
/* harmony import */ var _utils_reduced_motion_index_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/reduced-motion/index.mjs */ "./node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs");
/* harmony import */ var _utils_reduced_motion_state_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/reduced-motion/state.mjs */ "./node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs");
/* harmony import */ var _utils_subscription_manager_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../utils/subscription-manager.mjs */ "./node_modules/framer-motion/dist/es/utils/subscription-manager.mjs");
/* harmony import */ var _utils_warn_once_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/warn-once.mjs */ "./node_modules/framer-motion/dist/es/utils/warn-once.mjs");
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../value/index.mjs */ "./node_modules/framer-motion/dist/es/value/index.mjs");
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../value/types/complex/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../value/utils/is-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs");
/* harmony import */ var _dom_value_types_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./dom/value-types/animatable-none.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs");
/* harmony import */ var _dom_value_types_find_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./dom/value-types/find.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs");
/* harmony import */ var _html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./html/utils/keys-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs");
/* harmony import */ var _store_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store.mjs */ "./node_modules/framer-motion/dist/es/render/store.mjs");
/* harmony import */ var _utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/is-controlling-variants.mjs */ "./node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs");
/* harmony import */ var _utils_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/KeyframesResolver.mjs */ "./node_modules/framer-motion/dist/es/render/utils/KeyframesResolver.mjs");
/* harmony import */ var _utils_motion_values_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/motion-values.mjs */ "./node_modules/framer-motion/dist/es/render/utils/motion-values.mjs");
/* harmony import */ var _utils_resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./utils/resolve-variants.mjs */ "./node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");






















const propEventHandlers = [
    "AnimationStart",
    "AnimationComplete",
    "Update",
    "BeforeLayoutMeasure",
    "LayoutMeasure",
    "LayoutAnimationStart",
    "LayoutAnimationComplete",
];
/**
 * A VisualElement is an imperative abstraction around UI elements such as
 * HTMLElement, SVGElement, Three.Object3D etc.
 */
class VisualElement {
    /**
     * This method takes React props and returns found MotionValues. For example, HTML
     * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
     *
     * This isn't an abstract method as it needs calling in the constructor, but it is
     * intended to be one.
     */
    scrapeMotionValuesFromProps(_props, _prevProps, _visualElement) {
        return {};
    }
    constructor({ parent, props, presenceContext, reducedMotionConfig, blockInitialAnimation, visualState, }, options = {}) {
        /**
         * A reference to the current underlying Instance, e.g. a HTMLElement
         * or Three.Mesh etc.
         */
        this.current = null;
        /**
         * A set containing references to this VisualElement's children.
         */
        this.children = new Set();
        /**
         * Determine what role this visual element should take in the variant tree.
         */
        this.isVariantNode = false;
        this.isControllingVariants = false;
        /**
         * Decides whether this VisualElement should animate in reduced motion
         * mode.
         *
         * TODO: This is currently set on every individual VisualElement but feels
         * like it could be set globally.
         */
        this.shouldReduceMotion = null;
        /**
         * A map of all motion values attached to this visual element. Motion
         * values are source of truth for any given animated value. A motion
         * value might be provided externally by the component via props.
         */
        this.values = new Map();
        this.KeyframeResolver = _utils_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_0__.KeyframeResolver;
        /**
         * Cleanup functions for active features (hover/tap/exit etc)
         */
        this.features = {};
        /**
         * A map of every subscription that binds the provided or generated
         * motion values onChange listeners to this visual element.
         */
        this.valueSubscriptions = new Map();
        /**
         * A reference to the previously-provided motion values as returned
         * from scrapeMotionValuesFromProps. We use the keys in here to determine
         * if any motion values need to be removed after props are updated.
         */
        this.prevMotionValues = {};
        /**
         * An object containing a SubscriptionManager for each active event.
         */
        this.events = {};
        /**
         * An object containing an unsubscribe function for each prop event subscription.
         * For example, every "Update" event can have multiple subscribers via
         * VisualElement.on(), but only one of those can be defined via the onUpdate prop.
         */
        this.propEventSubscriptions = {};
        this.notifyUpdate = () => this.notify("Update", this.latestValues);
        this.render = () => {
            if (!this.current)
                return;
            this.triggerBuild();
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection);
        };
        this.renderScheduledAt = 0.0;
        this.scheduleRender = () => {
            const now = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__.time.now();
            if (this.renderScheduledAt < now) {
                this.renderScheduledAt = now;
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.frame.render(this.render, false, true);
            }
        };
        const { latestValues, renderState, onUpdate } = visualState;
        this.onUpdate = onUpdate;
        this.latestValues = latestValues;
        this.baseTarget = { ...latestValues };
        this.initialValues = props.initial ? { ...latestValues } : {};
        this.renderState = renderState;
        this.parent = parent;
        this.props = props;
        this.presenceContext = presenceContext;
        this.depth = parent ? parent.depth + 1 : 0;
        this.reducedMotionConfig = reducedMotionConfig;
        this.options = options;
        this.blockInitialAnimation = Boolean(blockInitialAnimation);
        this.isControllingVariants = (0,_utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_3__.isControllingVariants)(props);
        this.isVariantNode = (0,_utils_is_controlling_variants_mjs__WEBPACK_IMPORTED_MODULE_3__.isVariantNode)(props);
        if (this.isVariantNode) {
            this.variantChildren = new Set();
        }
        this.manuallyAnimateOnMount = Boolean(parent && parent.current);
        /**
         * Any motion values that are provided to the element when created
         * aren't yet bound to the element, as this would technically be impure.
         * However, we iterate through the motion values and set them to the
         * initial values for this component.
         *
         * TODO: This is impure and we should look at changing this to run on mount.
         * Doing so will break some tests but this isn't necessarily a breaking change,
         * more a reflection of the test.
         */
        const { willChange, ...initialMotionValues } = this.scrapeMotionValuesFromProps(props, {}, this);
        for (const key in initialMotionValues) {
            const value = initialMotionValues[key];
            if (latestValues[key] !== undefined && (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__.isMotionValue)(value)) {
                value.set(latestValues[key], false);
            }
        }
    }
    mount(instance) {
        this.current = instance;
        _store_mjs__WEBPACK_IMPORTED_MODULE_5__.visualElementStore.set(instance, this);
        if (this.projection && !this.projection.instance) {
            this.projection.mount(instance);
        }
        if (this.parent && this.isVariantNode && !this.isControllingVariants) {
            this.removeFromVariantTree = this.parent.addVariantChild(this);
        }
        this.values.forEach((value, key) => this.bindToMotionValue(key, value));
        if (!_utils_reduced_motion_state_mjs__WEBPACK_IMPORTED_MODULE_6__.hasReducedMotionListener.current) {
            (0,_utils_reduced_motion_index_mjs__WEBPACK_IMPORTED_MODULE_7__.initPrefersReducedMotion)();
        }
        this.shouldReduceMotion =
            this.reducedMotionConfig === "never"
                ? false
                : this.reducedMotionConfig === "always"
                    ? true
                    : _utils_reduced_motion_state_mjs__WEBPACK_IMPORTED_MODULE_6__.prefersReducedMotion.current;
        if (true) {
            (0,_utils_warn_once_mjs__WEBPACK_IMPORTED_MODULE_8__.warnOnce)(this.shouldReduceMotion !== true, "You have Reduced Motion enabled on your device. Animations may not appear as expected.");
        }
        if (this.parent)
            this.parent.children.add(this);
        this.update(this.props, this.presenceContext);
    }
    unmount() {
        this.projection && this.projection.unmount();
        (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.cancelFrame)(this.notifyUpdate);
        (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.cancelFrame)(this.render);
        this.valueSubscriptions.forEach((remove) => remove());
        this.valueSubscriptions.clear();
        this.removeFromVariantTree && this.removeFromVariantTree();
        this.parent && this.parent.children.delete(this);
        for (const key in this.events) {
            this.events[key].clear();
        }
        for (const key in this.features) {
            const feature = this.features[key];
            if (feature) {
                feature.unmount();
                feature.isMounted = false;
            }
        }
        this.current = null;
    }
    bindToMotionValue(key, value) {
        if (this.valueSubscriptions.has(key)) {
            this.valueSubscriptions.get(key)();
        }
        const valueIsTransform = _html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_9__.transformProps.has(key);
        if (valueIsTransform && this.onBindTransform) {
            this.onBindTransform();
        }
        const removeOnChange = value.on("change", (latestValue) => {
            this.latestValues[key] = latestValue;
            this.props.onUpdate && _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.frame.preRender(this.notifyUpdate);
            if (valueIsTransform && this.projection) {
                this.projection.isTransformDirty = true;
            }
        });
        const removeOnRenderRequest = value.on("renderRequest", this.scheduleRender);
        let removeSyncCheck;
        if (window.MotionCheckAppearSync) {
            removeSyncCheck = window.MotionCheckAppearSync(this, key, value);
        }
        this.valueSubscriptions.set(key, () => {
            removeOnChange();
            removeOnRenderRequest();
            if (removeSyncCheck)
                removeSyncCheck();
            if (value.owner)
                value.stop();
        });
    }
    sortNodePosition(other) {
        /**
         * If these nodes aren't even of the same type we can't compare their depth.
         */
        if (!this.current ||
            !this.sortInstanceNodePosition ||
            this.type !== other.type) {
            return 0;
        }
        return this.sortInstanceNodePosition(this.current, other.current);
    }
    updateFeatures() {
        let key = "animation";
        for (key in _motion_features_definitions_mjs__WEBPACK_IMPORTED_MODULE_10__.featureDefinitions) {
            const featureDefinition = _motion_features_definitions_mjs__WEBPACK_IMPORTED_MODULE_10__.featureDefinitions[key];
            if (!featureDefinition)
                continue;
            const { isEnabled, Feature: FeatureConstructor } = featureDefinition;
            /**
             * If this feature is enabled but not active, make a new instance.
             */
            if (!this.features[key] &&
                FeatureConstructor &&
                isEnabled(this.props)) {
                this.features[key] = new FeatureConstructor(this);
            }
            /**
             * If we have a feature, mount or update it.
             */
            if (this.features[key]) {
                const feature = this.features[key];
                if (feature.isMounted) {
                    feature.update();
                }
                else {
                    feature.mount();
                    feature.isMounted = true;
                }
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props);
    }
    /**
     * Measure the current viewport box with or without transforms.
     * Only measures axis-aligned boxes, rotate and skew must be manually
     * removed with a re-render to work.
     */
    measureViewportBox() {
        return this.current
            ? this.measureInstanceViewportBox(this.current, this.props)
            : (0,_projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_11__.createBox)();
    }
    getStaticValue(key) {
        return this.latestValues[key];
    }
    setStaticValue(key, value) {
        this.latestValues[key] = value;
    }
    /**
     * Update the provided props. Ensure any newly-added motion values are
     * added to our map, old ones removed, and listeners updated.
     */
    update(props, presenceContext) {
        if (props.transformTemplate || this.props.transformTemplate) {
            this.scheduleRender();
        }
        this.prevProps = this.props;
        this.props = props;
        this.prevPresenceContext = this.presenceContext;
        this.presenceContext = presenceContext;
        /**
         * Update prop event handlers ie onAnimationStart, onAnimationComplete
         */
        for (let i = 0; i < propEventHandlers.length; i++) {
            const key = propEventHandlers[i];
            if (this.propEventSubscriptions[key]) {
                this.propEventSubscriptions[key]();
                delete this.propEventSubscriptions[key];
            }
            const listenerName = ("on" + key);
            const listener = props[listenerName];
            if (listener) {
                this.propEventSubscriptions[key] = this.on(key, listener);
            }
        }
        this.prevMotionValues = (0,_utils_motion_values_mjs__WEBPACK_IMPORTED_MODULE_12__.updateMotionValuesFromProps)(this, this.scrapeMotionValuesFromProps(props, this.prevProps, this), this.prevMotionValues);
        if (this.handleChildMotionValue) {
            this.handleChildMotionValue();
        }
        this.onUpdate && this.onUpdate(this);
    }
    getProps() {
        return this.props;
    }
    /**
     * Returns the variant definition with a given name.
     */
    getVariant(name) {
        return this.props.variants ? this.props.variants[name] : undefined;
    }
    /**
     * Returns the defined default transition on this component.
     */
    getDefaultTransition() {
        return this.props.transition;
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
        return this.isVariantNode
            ? this
            : this.parent
                ? this.parent.getClosestVariantNode()
                : undefined;
    }
    /**
     * Add a child visual element to our set of children.
     */
    addVariantChild(child) {
        const closestVariantNode = this.getClosestVariantNode();
        if (closestVariantNode) {
            closestVariantNode.variantChildren &&
                closestVariantNode.variantChildren.add(child);
            return () => closestVariantNode.variantChildren.delete(child);
        }
    }
    /**
     * Add a motion value and bind it to this visual element.
     */
    addValue(key, value) {
        // Remove existing value if it exists
        const existingValue = this.values.get(key);
        if (value !== existingValue) {
            if (existingValue)
                this.removeValue(key);
            this.bindToMotionValue(key, value);
            this.values.set(key, value);
            this.latestValues[key] = value.get();
        }
    }
    /**
     * Remove a motion value and unbind any active subscriptions.
     */
    removeValue(key) {
        this.values.delete(key);
        const unsubscribe = this.valueSubscriptions.get(key);
        if (unsubscribe) {
            unsubscribe();
            this.valueSubscriptions.delete(key);
        }
        delete this.latestValues[key];
        this.removeValueFromRenderState(key, this.renderState);
    }
    /**
     * Check whether we have a motion value for this key
     */
    hasValue(key) {
        return this.values.has(key);
    }
    getValue(key, defaultValue) {
        if (this.props.values && this.props.values[key]) {
            return this.props.values[key];
        }
        let value = this.values.get(key);
        if (value === undefined && defaultValue !== undefined) {
            value = (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_13__.motionValue)(defaultValue === null ? undefined : defaultValue, { owner: this });
            this.addValue(key, value);
        }
        return value;
    }
    /**
     * If we're trying to animate to a previously unencountered value,
     * we need to check for it in our state and as a last resort read it
     * directly from the instance (which might have performance implications).
     */
    readValue(key, target) {
        var _a;
        let value = this.latestValues[key] !== undefined || !this.current
            ? this.latestValues[key]
            : (_a = this.getBaseTargetFromProps(this.props, key)) !== null && _a !== void 0 ? _a : this.readValueFromInstance(this.current, key, this.options);
        if (value !== undefined && value !== null) {
            if (typeof value === "string" &&
                ((0,_utils_is_numerical_string_mjs__WEBPACK_IMPORTED_MODULE_14__.isNumericalString)(value) || (0,_utils_is_zero_value_string_mjs__WEBPACK_IMPORTED_MODULE_15__.isZeroValueString)(value))) {
                // If this is a number read as a string, ie "0" or "200", convert it to a number
                value = parseFloat(value);
            }
            else if (!(0,_dom_value_types_find_mjs__WEBPACK_IMPORTED_MODULE_16__.findValueType)(value) && _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_17__.complex.test(target)) {
                value = (0,_dom_value_types_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_18__.getAnimatableNone)(key, target);
            }
            this.setBaseTarget(key, (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__.isMotionValue)(value) ? value.get() : value);
        }
        return (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__.isMotionValue)(value) ? value.get() : value;
    }
    /**
     * Set the base target to later animate back to. This is currently
     * only hydrated on creation and when we first read a value.
     */
    setBaseTarget(key, value) {
        this.baseTarget[key] = value;
    }
    /**
     * Find the base target for a value thats been removed from all animation
     * props.
     */
    getBaseTarget(key) {
        var _a;
        const { initial } = this.props;
        let valueFromInitial;
        if (typeof initial === "string" || typeof initial === "object") {
            const variant = (0,_utils_resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_19__.resolveVariantFromProps)(this.props, initial, (_a = this.presenceContext) === null || _a === void 0 ? void 0 : _a.custom);
            if (variant) {
                valueFromInitial = variant[key];
            }
        }
        /**
         * If this value still exists in the current initial variant, read that.
         */
        if (initial && valueFromInitial !== undefined) {
            return valueFromInitial;
        }
        /**
         * Alternatively, if this VisualElement config has defined a getBaseTarget
         * so we can read the value from an alternative source, try that.
         */
        const target = this.getBaseTargetFromProps(this.props, key);
        if (target !== undefined && !(0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_4__.isMotionValue)(target))
            return target;
        /**
         * If the value was initially defined on initial, but it doesn't any more,
         * return undefined. Otherwise return the value as initially read from the DOM.
         */
        return this.initialValues[key] !== undefined &&
            valueFromInitial === undefined
            ? undefined
            : this.baseTarget[key];
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new _utils_subscription_manager_mjs__WEBPACK_IMPORTED_MODULE_20__.SubscriptionManager();
        }
        return this.events[eventName].add(callback);
    }
    notify(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].notify(...args);
        }
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/components/create-factory.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/components/create-factory.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMotionComponentFactory: () => (/* binding */ createMotionComponentFactory)
/* harmony export */ });
/* harmony import */ var _motion_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../motion/index.mjs */ "./node_modules/framer-motion/dist/es/motion/index.mjs");
/* harmony import */ var _dom_use_render_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom/use-render.mjs */ "./node_modules/framer-motion/dist/es/render/dom/use-render.mjs");
/* harmony import */ var _dom_utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/utils/is-svg-component.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs");
/* harmony import */ var _html_config_motion_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../html/config-motion.mjs */ "./node_modules/framer-motion/dist/es/render/html/config-motion.mjs");
/* harmony import */ var _svg_config_motion_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../svg/config-motion.mjs */ "./node_modules/framer-motion/dist/es/render/svg/config-motion.mjs");






function createMotionComponentFactory(preloadedFeatures, createVisualElement) {
    return function createMotionComponent(Component, { forwardMotionProps } = { forwardMotionProps: false }) {
        const baseConfig = (0,_dom_utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_0__.isSVGComponent)(Component)
            ? _svg_config_motion_mjs__WEBPACK_IMPORTED_MODULE_1__.svgMotionConfig
            : _html_config_motion_mjs__WEBPACK_IMPORTED_MODULE_2__.htmlMotionConfig;
        const config = {
            ...baseConfig,
            preloadedFeatures,
            useRender: (0,_dom_use_render_mjs__WEBPACK_IMPORTED_MODULE_3__.createUseRender)(forwardMotionProps),
            createVisualElement,
            Component,
        };
        return (0,_motion_index_mjs__WEBPACK_IMPORTED_MODULE_4__.createRendererMotionComponent)(config);
    };
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/components/create-proxy.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/components/create-proxy.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDOMMotionComponentProxy: () => (/* binding */ createDOMMotionComponentProxy)
/* harmony export */ });
/* harmony import */ var _utils_warn_once_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/warn-once.mjs */ "./node_modules/framer-motion/dist/es/utils/warn-once.mjs");


function createDOMMotionComponentProxy(componentFactory) {
    if (typeof Proxy === "undefined") {
        return componentFactory;
    }
    /**
     * A cache of generated `motion` components, e.g `motion.div`, `motion.input` etc.
     * Rather than generating them anew every render.
     */
    const componentCache = new Map();
    const deprecatedFactoryFunction = (...args) => {
        if (true) {
            (0,_utils_warn_once_mjs__WEBPACK_IMPORTED_MODULE_0__.warnOnce)(false, "motion() is deprecated. Use motion.create() instead.");
        }
        return componentFactory(...args);
    };
    return new Proxy(deprecatedFactoryFunction, {
        /**
         * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
         * The prop name is passed through as `key` and we can use that to generate a `motion`
         * DOM component with that name.
         */
        get: (_target, key) => {
            if (key === "create")
                return componentFactory;
            /**
             * If this element doesn't exist in the component cache, create it and cache.
             */
            if (!componentCache.has(key)) {
                componentCache.set(key, componentFactory(key));
            }
            return componentCache.get(key);
        },
    });
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/components/motion/create.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/components/motion/create.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createMotionComponent: () => (/* binding */ createMotionComponent)
/* harmony export */ });
/* harmony import */ var _motion_features_animations_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../motion/features/animations.mjs */ "./node_modules/framer-motion/dist/es/motion/features/animations.mjs");
/* harmony import */ var _motion_features_drag_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../motion/features/drag.mjs */ "./node_modules/framer-motion/dist/es/motion/features/drag.mjs");
/* harmony import */ var _motion_features_gestures_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../motion/features/gestures.mjs */ "./node_modules/framer-motion/dist/es/motion/features/gestures.mjs");
/* harmony import */ var _motion_features_layout_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../motion/features/layout.mjs */ "./node_modules/framer-motion/dist/es/motion/features/layout.mjs");
/* harmony import */ var _create_factory_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../create-factory.mjs */ "./node_modules/framer-motion/dist/es/render/components/create-factory.mjs");
/* harmony import */ var _dom_create_visual_element_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dom/create-visual-element.mjs */ "./node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs");







const createMotionComponent = /*@__PURE__*/ (0,_create_factory_mjs__WEBPACK_IMPORTED_MODULE_0__.createMotionComponentFactory)({
    ..._motion_features_animations_mjs__WEBPACK_IMPORTED_MODULE_1__.animations,
    ..._motion_features_gestures_mjs__WEBPACK_IMPORTED_MODULE_2__.gestureAnimations,
    ..._motion_features_drag_mjs__WEBPACK_IMPORTED_MODULE_3__.drag,
    ..._motion_features_layout_mjs__WEBPACK_IMPORTED_MODULE_4__.layout,
}, _dom_create_visual_element_mjs__WEBPACK_IMPORTED_MODULE_5__.createDomVisualElement);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   motion: () => (/* binding */ motion)
/* harmony export */ });
/* harmony import */ var _create_proxy_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../create-proxy.mjs */ "./node_modules/framer-motion/dist/es/render/components/create-proxy.mjs");
/* harmony import */ var _create_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create.mjs */ "./node_modules/framer-motion/dist/es/render/components/motion/create.mjs");



const motion = /*@__PURE__*/ (0,_create_proxy_mjs__WEBPACK_IMPORTED_MODULE_0__.createDOMMotionComponentProxy)(_create_mjs__WEBPACK_IMPORTED_MODULE_1__.createMotionComponent);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOMKeyframesResolver: () => (/* binding */ DOMKeyframesResolver)
/* harmony export */ });
/* harmony import */ var _animation_utils_is_none_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../animation/utils/is-none.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/is-none.mjs");
/* harmony import */ var _html_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../html/utils/keys-position.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-position.mjs");
/* harmony import */ var _html_utils_make_none_animatable_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../html/utils/make-none-animatable.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/make-none-animatable.mjs");
/* harmony import */ var _utils_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/KeyframesResolver.mjs */ "./node_modules/framer-motion/dist/es/render/utils/KeyframesResolver.mjs");
/* harmony import */ var _utils_css_variables_conversion_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/css-variables-conversion.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs");
/* harmony import */ var _utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/is-css-variable.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs");
/* harmony import */ var _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/unit-conversion.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs");
/* harmony import */ var _value_types_dimensions_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./value-types/dimensions.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs");









class DOMKeyframesResolver extends _utils_KeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_0__.KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element) {
        super(unresolvedKeyframes, onComplete, name, motionValue, element, true);
    }
    readKeyframes() {
        const { unresolvedKeyframes, element, name } = this;
        if (!element || !element.current)
            return;
        super.readKeyframes();
        /**
         * If any keyframe is a CSS variable, we need to find its value by sampling the element
         */
        for (let i = 0; i < unresolvedKeyframes.length; i++) {
            let keyframe = unresolvedKeyframes[i];
            if (typeof keyframe === "string") {
                keyframe = keyframe.trim();
                if ((0,_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__.isCSSVariableToken)(keyframe)) {
                    const resolved = (0,_utils_css_variables_conversion_mjs__WEBPACK_IMPORTED_MODULE_2__.getVariableValue)(keyframe, element.current);
                    if (resolved !== undefined) {
                        unresolvedKeyframes[i] = resolved;
                    }
                    if (i === unresolvedKeyframes.length - 1) {
                        this.finalKeyframe = keyframe;
                    }
                }
            }
        }
        /**
         * Resolve "none" values. We do this potentially twice - once before and once after measuring keyframes.
         * This could be seen as inefficient but it's a trade-off to avoid measurements in more situations, which
         * have a far bigger performance impact.
         */
        this.resolveNoneKeyframes();
        /**
         * Check to see if unit type has changed. If so schedule jobs that will
         * temporarily set styles to the destination keyframes.
         * Skip if we have more than two keyframes or this isn't a positional value.
         * TODO: We can throw if there are multiple keyframes and the value type changes.
         */
        if (!_html_utils_keys_position_mjs__WEBPACK_IMPORTED_MODULE_3__.positionalKeys.has(name) || unresolvedKeyframes.length !== 2) {
            return;
        }
        const [origin, target] = unresolvedKeyframes;
        const originType = (0,_value_types_dimensions_mjs__WEBPACK_IMPORTED_MODULE_4__.findDimensionValueType)(origin);
        const targetType = (0,_value_types_dimensions_mjs__WEBPACK_IMPORTED_MODULE_4__.findDimensionValueType)(target);
        /**
         * Either we don't recognise these value types or we can animate between them.
         */
        if (originType === targetType)
            return;
        /**
         * If both values are numbers or pixels, we can animate between them by
         * converting them to numbers.
         */
        if ((0,_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_5__.isNumOrPxType)(originType) && (0,_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_5__.isNumOrPxType)(targetType)) {
            for (let i = 0; i < unresolvedKeyframes.length; i++) {
                const value = unresolvedKeyframes[i];
                if (typeof value === "string") {
                    unresolvedKeyframes[i] = parseFloat(value);
                }
            }
        }
        else {
            /**
             * Else, the only way to resolve this is by measuring the element.
             */
            this.needsMeasurement = true;
        }
    }
    resolveNoneKeyframes() {
        const { unresolvedKeyframes, name } = this;
        const noneKeyframeIndexes = [];
        for (let i = 0; i < unresolvedKeyframes.length; i++) {
            if ((0,_animation_utils_is_none_mjs__WEBPACK_IMPORTED_MODULE_6__.isNone)(unresolvedKeyframes[i])) {
                noneKeyframeIndexes.push(i);
            }
        }
        if (noneKeyframeIndexes.length) {
            (0,_html_utils_make_none_animatable_mjs__WEBPACK_IMPORTED_MODULE_7__.makeNoneKeyframesAnimatable)(unresolvedKeyframes, noneKeyframeIndexes, name);
        }
    }
    measureInitialState() {
        const { element, unresolvedKeyframes, name } = this;
        if (!element || !element.current)
            return;
        if (name === "height") {
            this.suspendedScrollY = window.pageYOffset;
        }
        this.measuredOrigin = _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_5__.positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
        unresolvedKeyframes[0] = this.measuredOrigin;
        // Set final key frame to measure after next render
        const measureKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
        if (measureKeyframe !== undefined) {
            element.getValue(name, measureKeyframe).jump(measureKeyframe, false);
        }
    }
    measureEndState() {
        var _a;
        const { element, name, unresolvedKeyframes } = this;
        if (!element || !element.current)
            return;
        const value = element.getValue(name);
        value && value.jump(this.measuredOrigin, false);
        const finalKeyframeIndex = unresolvedKeyframes.length - 1;
        const finalKeyframe = unresolvedKeyframes[finalKeyframeIndex];
        unresolvedKeyframes[finalKeyframeIndex] = _utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_5__.positionalValues[name](element.measureViewportBox(), window.getComputedStyle(element.current));
        if (finalKeyframe !== null && this.finalKeyframe === undefined) {
            this.finalKeyframe = finalKeyframe;
        }
        // If we removed transform values, reapply them before the next render
        if ((_a = this.removedTransforms) === null || _a === void 0 ? void 0 : _a.length) {
            this.removedTransforms.forEach(([unsetTransformName, unsetTransformValue]) => {
                element
                    .getValue(unsetTransformName)
                    .set(unsetTransformValue);
            });
        }
        this.resolveNoneKeyframes();
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOMVisualElement: () => (/* binding */ DOMVisualElement)
/* harmony export */ });
/* harmony import */ var _VisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../VisualElement.mjs */ "./node_modules/framer-motion/dist/es/render/VisualElement.mjs");
/* harmony import */ var _DOMKeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMKeyframesResolver.mjs */ "./node_modules/framer-motion/dist/es/render/dom/DOMKeyframesResolver.mjs");
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../value/utils/is-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs");




class DOMVisualElement extends _VisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__.VisualElement {
    constructor() {
        super(...arguments);
        this.KeyframeResolver = _DOMKeyframesResolver_mjs__WEBPACK_IMPORTED_MODULE_1__.DOMKeyframesResolver;
    }
    sortInstanceNodePosition(a, b) {
        /**
         * compareDocumentPosition returns a bitmask, by using the bitwise &
         * we're returning true if 2 in that bitmask is set to true. 2 is set
         * to true if b preceeds a.
         */
        return a.compareDocumentPosition(b) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(props, key) {
        return props.style
            ? props.style[key]
            : undefined;
    }
    removeValueFromRenderState(key, { vars, style }) {
        delete vars[key];
        delete style[key];
    }
    handleChildMotionValue() {
        if (this.childSubscription) {
            this.childSubscription();
            delete this.childSubscription;
        }
        const { children } = this.props;
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__.isMotionValue)(children)) {
            this.childSubscription = children.on("change", (latest) => {
                if (this.current) {
                    this.current.textContent = `${latest}`;
                }
            });
        }
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/create-visual-element.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createDomVisualElement: () => (/* binding */ createDomVisualElement)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _html_HTMLVisualElement_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../html/HTMLVisualElement.mjs */ "./node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs");
/* harmony import */ var _svg_SVGVisualElement_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../svg/SVGVisualElement.mjs */ "./node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs");
/* harmony import */ var _utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/is-svg-component.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs");





const createDomVisualElement = (Component, options) => {
    return (0,_utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_1__.isSVGComponent)(Component)
        ? new _svg_SVGVisualElement_mjs__WEBPACK_IMPORTED_MODULE_2__.SVGVisualElement(options)
        : new _html_HTMLVisualElement_mjs__WEBPACK_IMPORTED_MODULE_3__.HTMLVisualElement(options, {
            allowProjection: Component !== react__WEBPACK_IMPORTED_MODULE_0__.Fragment,
        });
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/use-render.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/use-render.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createUseRender: () => (/* binding */ createUseRender)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _html_use_props_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../html/use-props.mjs */ "./node_modules/framer-motion/dist/es/render/html/use-props.mjs");
/* harmony import */ var _utils_filter_props_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/filter-props.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs");
/* harmony import */ var _utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/is-svg-component.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs");
/* harmony import */ var _svg_use_props_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../svg/use-props.mjs */ "./node_modules/framer-motion/dist/es/render/svg/use-props.mjs");
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../value/utils/is-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs");







function createUseRender(forwardMotionProps = false) {
    const useRender = (Component, props, ref, { latestValues }, isStatic) => {
        const useVisualProps = (0,_utils_is_svg_component_mjs__WEBPACK_IMPORTED_MODULE_1__.isSVGComponent)(Component)
            ? _svg_use_props_mjs__WEBPACK_IMPORTED_MODULE_2__.useSVGProps
            : _html_use_props_mjs__WEBPACK_IMPORTED_MODULE_3__.useHTMLProps;
        const visualProps = useVisualProps(props, latestValues, isStatic, Component);
        const filteredProps = (0,_utils_filter_props_mjs__WEBPACK_IMPORTED_MODULE_4__.filterProps)(props, typeof Component === "string", forwardMotionProps);
        const elementProps = Component !== react__WEBPACK_IMPORTED_MODULE_0__.Fragment
            ? { ...filteredProps, ...visualProps, ref }
            : {};
        /**
         * If component has been handed a motion value as its child,
         * memoise its initial value and render that. Subsequent updates
         * will be handled by the onChange handler
         */
        const { children } = props;
        const renderedChildren = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_5__.isMotionValue)(children) ? children.get() : children), [children]);
        return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(Component, {
            ...elementProps,
            children: renderedChildren,
        });
    };
    return useRender;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   camelToDash: () => (/* binding */ camelToDash)
/* harmony export */ });
/**
 * Convert camelCase to dash-case properties.
 */
const camelToDash = (str) => str.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs":
/*!******************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/utils/css-variables-conversion.mjs ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getVariableValue: () => (/* binding */ getVariableValue),
/* harmony export */   parseCSSVariable: () => (/* binding */ parseCSSVariable)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _utils_is_numerical_string_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/is-numerical-string.mjs */ "./node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs");
/* harmony import */ var _is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-css-variable.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs");




/**
 * Parse Framer's special CSS variable format into a CSS token and a fallback.
 *
 * ```
 * `var(--foo, #fff)` => [`--foo`, '#fff']
 * ```
 *
 * @param current
 */
const splitCSSVariableRegex = 
// eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(current) {
    const match = splitCSSVariableRegex.exec(current);
    if (!match)
        return [,];
    const [, token1, token2, fallback] = match;
    return [`--${token1 !== null && token1 !== void 0 ? token1 : token2}`, fallback];
}
const maxDepth = 4;
function getVariableValue(current, element, depth = 1) {
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.invariant)(depth <= maxDepth, `Max CSS variable fallback depth detected in property "${current}". This may indicate a circular fallback dependency.`);
    const [token, fallback] = parseCSSVariable(current);
    // No CSS variable detected
    if (!token)
        return;
    // Attempt to read this CSS variable off the element
    const resolved = window.getComputedStyle(element).getPropertyValue(token);
    if (resolved) {
        const trimmed = resolved.trim();
        return (0,_utils_is_numerical_string_mjs__WEBPACK_IMPORTED_MODULE_1__.isNumericalString)(trimmed) ? parseFloat(trimmed) : trimmed;
    }
    return (0,_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_2__.isCSSVariableToken)(fallback)
        ? getVariableValue(fallback, element, depth + 1)
        : fallback;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/utils/filter-props.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filterProps: () => (/* binding */ filterProps),
/* harmony export */   loadExternalIsValidProp: () => (/* binding */ loadExternalIsValidProp)
/* harmony export */ });
/* harmony import */ var _motion_utils_valid_prop_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../motion/utils/valid-prop.mjs */ "./node_modules/framer-motion/dist/es/motion/utils/valid-prop.mjs");


let shouldForward = (key) => !(0,_motion_utils_valid_prop_mjs__WEBPACK_IMPORTED_MODULE_0__.isValidMotionProp)(key);
function loadExternalIsValidProp(isValidProp) {
    if (!isValidProp)
        return;
    // Explicitly filter our events
    shouldForward = (key) => key.startsWith("on") ? !(0,_motion_utils_valid_prop_mjs__WEBPACK_IMPORTED_MODULE_0__.isValidMotionProp)(key) : isValidProp(key);
}
/**
 * Emotion and Styled Components both allow users to pass through arbitrary props to their components
 * to dynamically generate CSS. They both use the `@emotion/is-prop-valid` package to determine which
 * of these should be passed to the underlying DOM node.
 *
 * However, when styling a Motion component `styled(motion.div)`, both packages pass through *all* props
 * as it's seen as an arbitrary component rather than a DOM node. Motion only allows arbitrary props
 * passed through the `custom` prop so it doesn't *need* the payload or computational overhead of
 * `@emotion/is-prop-valid`, however to fix this problem we need to use it.
 *
 * By making it an optionalDependency we can offer this functionality only in the situations where it's
 * actually required.
 */
try {
    /**
     * We attempt to import this package but require won't be defined in esm environments, in that case
     * isPropValid will have to be provided via `MotionContext`. In a 6.0.0 this should probably be removed
     * in favour of explicit injection.
     */
    loadExternalIsValidProp(require("@emotion/is-prop-valid").default);
}
catch (_a) {
    // We don't need to actually do anything here - the fallback is the existing `isPropValid`.
}
function filterProps(props, isDom, forwardMotionProps) {
    const filteredProps = {};
    for (const key in props) {
        /**
         * values is considered a valid prop by Emotion, so if it's present
         * this will be rendered out to the DOM unless explicitly filtered.
         *
         * We check the type as it could be used with the `feColorMatrix`
         * element, which we support.
         */
        if (key === "values" && typeof props.values === "object")
            continue;
        if (shouldForward(key) ||
            (forwardMotionProps === true && (0,_motion_utils_valid_prop_mjs__WEBPACK_IMPORTED_MODULE_0__.isValidMotionProp)(key)) ||
            (!isDom && !(0,_motion_utils_valid_prop_mjs__WEBPACK_IMPORTED_MODULE_0__.isValidMotionProp)(key)) ||
            // If trying to use native HTML drag events, forward drag listeners
            (props["draggable"] &&
                key.startsWith("onDrag"))) {
            filteredProps[key] =
                props[key];
        }
    }
    return filteredProps;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isCSSVariableName: () => (/* binding */ isCSSVariableName),
/* harmony export */   isCSSVariableToken: () => (/* binding */ isCSSVariableToken)
/* harmony export */ });
const checkStringStartsWith = (token) => (key) => typeof key === "string" && key.startsWith(token);
const isCSSVariableName = 
/*@__PURE__*/ checkStringStartsWith("--");
const startsAsVariableToken = 
/*@__PURE__*/ checkStringStartsWith("var(--");
const isCSSVariableToken = (value) => {
    const startsWithToken = startsAsVariableToken(value);
    if (!startsWithToken)
        return false;
    // Ensure any comments are stripped from the value as this can harm performance of the regex.
    return singleCssVariableRegex.test(value.split("/*")[0].trim());
};
const singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs":
/*!**********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/utils/is-svg-component.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSVGComponent: () => (/* binding */ isSVGComponent)
/* harmony export */ });
/* harmony import */ var _svg_lowercase_elements_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../svg/lowercase-elements.mjs */ "./node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs");


function isSVGComponent(Component) {
    if (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof Component !== "string" ||
        /**
         * If it contains a dash, the element is a custom HTML webcomponent.
         */
        Component.includes("-")) {
        return false;
    }
    else if (
    /**
     * If it's in our list of lowercase SVG tags, it's an SVG component
     */
    _svg_lowercase_elements_mjs__WEBPACK_IMPORTED_MODULE_0__.lowercaseSVGElements.indexOf(Component) > -1 ||
        /**
         * If it contains a capital letter, it's an SVG component
         */
        /[A-Z]/u.test(Component)) {
        return true;
    }
    return false;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/utils/is-svg-element.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSVGElement: () => (/* binding */ isSVGElement)
/* harmony export */ });
function isSVGElement(element) {
    return element instanceof SVGElement && element.tagName !== "svg";
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNumOrPxType: () => (/* binding */ isNumOrPxType),
/* harmony export */   positionalValues: () => (/* binding */ positionalValues),
/* harmony export */   removeNonTranslationalTransform: () => (/* binding */ removeNonTranslationalTransform)
/* harmony export */ });
/* harmony import */ var _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/types/numbers/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../value/types/numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");
/* harmony import */ var _html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../html/utils/keys-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs");




const isNumOrPxType = (v) => v === _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__.number || v === _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px;
const getPosFromMatrix = (matrix, pos) => parseFloat(matrix.split(", ")[pos]);
const getTranslateFromMatrix = (pos2, pos3) => (_bbox, { transform }) => {
    if (transform === "none" || !transform)
        return 0;
    const matrix3d = transform.match(/^matrix3d\((.+)\)$/u);
    if (matrix3d) {
        return getPosFromMatrix(matrix3d[1], pos3);
    }
    else {
        const matrix = transform.match(/^matrix\((.+)\)$/u);
        if (matrix) {
            return getPosFromMatrix(matrix[1], pos2);
        }
        else {
            return 0;
        }
    }
};
const transformKeys = new Set(["x", "y", "z"]);
const nonTranslationalTransformKeys = _html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__.transformPropOrder.filter((key) => !transformKeys.has(key));
function removeNonTranslationalTransform(visualElement) {
    const removedTransforms = [];
    nonTranslationalTransformKeys.forEach((key) => {
        const value = visualElement.getValue(key);
        if (value !== undefined) {
            removedTransforms.push([key, value.get()]);
            value.set(key.startsWith("scale") ? 1 : 0);
        }
    });
    return removedTransforms;
}
const positionalValues = {
    // Dimensions
    width: ({ x }, { paddingLeft = "0", paddingRight = "0" }) => x.max - x.min - parseFloat(paddingLeft) - parseFloat(paddingRight),
    height: ({ y }, { paddingTop = "0", paddingBottom = "0" }) => y.max - y.min - parseFloat(paddingTop) - parseFloat(paddingBottom),
    top: (_bbox, { top }) => parseFloat(top),
    left: (_bbox, { left }) => parseFloat(left),
    bottom: ({ y }, { top }) => parseFloat(top) + (y.max - y.min),
    right: ({ x }, { left }) => parseFloat(left) + (x.max - x.min),
    // Transform
    x: getTranslateFromMatrix(4, 13),
    y: getTranslateFromMatrix(5, 14),
};
// Alias translate longform names
positionalValues.translateX = positionalValues.x;
positionalValues.translateY = positionalValues.y;




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs":
/*!***************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAnimatableNone: () => (/* binding */ getAnimatableNone)
/* harmony export */ });
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../value/types/complex/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _value_types_complex_filter_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../value/types/complex/filter.mjs */ "./node_modules/framer-motion/dist/es/value/types/complex/filter.mjs");
/* harmony import */ var _defaults_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defaults.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs");




function getAnimatableNone(key, value) {
    let defaultValueType = (0,_defaults_mjs__WEBPACK_IMPORTED_MODULE_0__.getDefaultValueType)(key);
    if (defaultValueType !== _value_types_complex_filter_mjs__WEBPACK_IMPORTED_MODULE_1__.filter)
        defaultValueType = _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_2__.complex;
    // If value is not recognised as animatable, ie "none", create an animatable version origin based on the target
    return defaultValueType.getAnimatableNone
        ? defaultValueType.getAnimatableNone(value)
        : undefined;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultValueTypes: () => (/* binding */ defaultValueTypes),
/* harmony export */   getDefaultValueType: () => (/* binding */ getDefaultValueType)
/* harmony export */ });
/* harmony import */ var _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../value/types/color/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/index.mjs");
/* harmony import */ var _value_types_complex_filter_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../value/types/complex/filter.mjs */ "./node_modules/framer-motion/dist/es/value/types/complex/filter.mjs");
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs");




/**
 * A map of default value types for common values
 */
const defaultValueTypes = {
    ..._number_mjs__WEBPACK_IMPORTED_MODULE_0__.numberValueTypes,
    // Color props
    color: _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__.color,
    backgroundColor: _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__.color,
    outlineColor: _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__.color,
    fill: _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__.color,
    stroke: _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__.color,
    // Border props
    borderColor: _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__.color,
    borderTopColor: _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__.color,
    borderRightColor: _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__.color,
    borderBottomColor: _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__.color,
    borderLeftColor: _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__.color,
    filter: _value_types_complex_filter_mjs__WEBPACK_IMPORTED_MODULE_2__.filter,
    WebkitFilter: _value_types_complex_filter_mjs__WEBPACK_IMPORTED_MODULE_2__.filter,
};
/**
 * Gets the default ValueType for the provided value key
 */
const getDefaultValueType = (key) => defaultValueTypes[key];




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs":
/*!**********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dimensionValueTypes: () => (/* binding */ dimensionValueTypes),
/* harmony export */   findDimensionValueType: () => (/* binding */ findDimensionValueType)
/* harmony export */ });
/* harmony import */ var _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/types/numbers/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../value/types/numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");
/* harmony import */ var _test_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./test.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs");
/* harmony import */ var _type_auto_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type-auto.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs");





/**
 * A list of value types commonly used for dimensions
 */
const dimensionValueTypes = [_value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__.number, _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.px, _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.percent, _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.degrees, _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.vw, _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.vh, _type_auto_mjs__WEBPACK_IMPORTED_MODULE_2__.auto];
/**
 * Tests a dimensional value against the list of dimension ValueTypes
 */
const findDimensionValueType = (v) => dimensionValueTypes.find((0,_test_mjs__WEBPACK_IMPORTED_MODULE_3__.testValueType)(v));




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/value-types/find.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findValueType: () => (/* binding */ findValueType)
/* harmony export */ });
/* harmony import */ var _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../value/types/color/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/index.mjs");
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../value/types/complex/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _dimensions_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dimensions.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/dimensions.mjs");
/* harmony import */ var _test_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./test.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs");





/**
 * A list of all ValueTypes
 */
const valueTypes = [..._dimensions_mjs__WEBPACK_IMPORTED_MODULE_0__.dimensionValueTypes, _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_1__.color, _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_2__.complex];
/**
 * Tests a value against the list of ValueTypes
 */
const findValueType = (v) => valueTypes.find((0,_test_mjs__WEBPACK_IMPORTED_MODULE_3__.testValueType)(v));




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getValueAsType: () => (/* binding */ getValueAsType)
/* harmony export */ });
/**
 * Provided a value and a ValueType, returns the value as that value type.
 */
const getValueAsType = (value, type) => {
    return type && typeof value === "number"
        ? type.transform(value)
        : value;
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/value-types/number-browser.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/value-types/number-browser.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   browserNumberValueTypes: () => (/* binding */ browserNumberValueTypes)
/* harmony export */ });
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/types/numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");


const browserNumberValueTypes = {
    // Border props
    borderWidth: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderTopWidth: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderRightWidth: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderBottomWidth: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderLeftWidth: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderRadius: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    radius: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderTopLeftRadius: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderTopRightRadius: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderBottomRightRadius: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    borderBottomLeftRadius: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    // Positioning props
    width: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    maxWidth: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    height: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    maxHeight: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    top: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    right: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    bottom: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    left: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    // Spacing props
    padding: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingTop: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingRight: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingBottom: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    paddingLeft: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    margin: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginTop: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginRight: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginBottom: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    marginLeft: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    // Misc
    backgroundPositionX: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    backgroundPositionY: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   numberValueTypes: () => (/* binding */ numberValueTypes)
/* harmony export */ });
/* harmony import */ var _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../value/types/numbers/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../value/types/numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");
/* harmony import */ var _number_browser_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number-browser.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/number-browser.mjs");
/* harmony import */ var _transform_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/transform.mjs");
/* harmony import */ var _type_int_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type-int.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs");






const numberValueTypes = {
    ..._number_browser_mjs__WEBPACK_IMPORTED_MODULE_0__.browserNumberValueTypes,
    ..._transform_mjs__WEBPACK_IMPORTED_MODULE_1__.transformValueTypes,
    zIndex: _type_int_mjs__WEBPACK_IMPORTED_MODULE_2__.int,
    size: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_3__.px,
    // SVG
    fillOpacity: _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_4__.alpha,
    strokeOpacity: _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_4__.alpha,
    numOctaves: _type_int_mjs__WEBPACK_IMPORTED_MODULE_2__.int,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/value-types/test.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   testValueType: () => (/* binding */ testValueType)
/* harmony export */ });
/**
 * Tests a provided value against a ValueType
 */
const testValueType = (v) => (type) => type.test(v);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/value-types/transform.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/value-types/transform.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformValueTypes: () => (/* binding */ transformValueTypes)
/* harmony export */ });
/* harmony import */ var _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../value/types/numbers/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/types/numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");



const transformValueTypes = {
    rotate: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.degrees,
    rotateX: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.degrees,
    rotateY: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.degrees,
    rotateZ: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.degrees,
    scale: _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.scale,
    scaleX: _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.scale,
    scaleY: _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.scale,
    scaleZ: _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.scale,
    skew: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.degrees,
    skewX: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.degrees,
    skewY: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.degrees,
    distance: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    translateX: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    translateY: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    translateZ: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    x: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    y: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    z: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    perspective: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    transformPerspective: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
    opacity: _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.alpha,
    originX: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.progressPercentage,
    originY: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.progressPercentage,
    originZ: _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/value-types/type-auto.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   auto: () => (/* binding */ auto)
/* harmony export */ });
/**
 * ValueType for "auto"
 */
const auto = {
    test: (v) => v === "auto",
    parse: (v) => v,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/dom/value-types/type-int.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   int: () => (/* binding */ int)
/* harmony export */ });
/* harmony import */ var _value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/types/numbers/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/index.mjs");


const int = {
    ..._value_types_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_0__.number,
    transform: Math.round,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/html/HTMLVisualElement.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTMLVisualElement: () => (/* binding */ HTMLVisualElement),
/* harmony export */   getComputedStyle: () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _projection_utils_measure_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../projection/utils/measure.mjs */ "./node_modules/framer-motion/dist/es/projection/utils/measure.mjs");
/* harmony import */ var _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/DOMVisualElement.mjs */ "./node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs");
/* harmony import */ var _dom_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom/utils/is-css-variable.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs");
/* harmony import */ var _dom_value_types_defaults_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom/value-types/defaults.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs");
/* harmony import */ var _utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/build-styles.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs");
/* harmony import */ var _utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/keys-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs");
/* harmony import */ var _utils_render_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/render.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/render.mjs");
/* harmony import */ var _utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/scrape-motion-values.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs");









function getComputedStyle(element) {
    return window.getComputedStyle(element);
}
class HTMLVisualElement extends _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__.DOMVisualElement {
    constructor() {
        super(...arguments);
        this.type = "html";
        this.renderInstance = _utils_render_mjs__WEBPACK_IMPORTED_MODULE_1__.renderHTML;
    }
    readValueFromInstance(instance, key) {
        if (_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__.transformProps.has(key)) {
            const defaultType = (0,_dom_value_types_defaults_mjs__WEBPACK_IMPORTED_MODULE_3__.getDefaultValueType)(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        else {
            const computedStyle = getComputedStyle(instance);
            const value = ((0,_dom_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_4__.isCSSVariableName)(key)
                ? computedStyle.getPropertyValue(key)
                : computedStyle[key]) || 0;
            return typeof value === "string" ? value.trim() : value;
        }
    }
    measureInstanceViewportBox(instance, { transformPagePoint }) {
        return (0,_projection_utils_measure_mjs__WEBPACK_IMPORTED_MODULE_5__.measureViewportBox)(instance, transformPagePoint);
    }
    build(renderState, latestValues, props) {
        (0,_utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_6__.buildHTMLStyles)(renderState, latestValues, props.transformTemplate);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return (0,_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_7__.scrapeMotionValuesFromProps)(props, prevProps, visualElement);
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/html/config-motion.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/html/config-motion.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   htmlMotionConfig: () => (/* binding */ htmlMotionConfig)
/* harmony export */ });
/* harmony import */ var _motion_utils_use_visual_state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../motion/utils/use-visual-state.mjs */ "./node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs");
/* harmony import */ var _utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/scrape-motion-values.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs");
/* harmony import */ var _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/create-render-state.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs");




const htmlMotionConfig = {
    useVisualState: (0,_motion_utils_use_visual_state_mjs__WEBPACK_IMPORTED_MODULE_0__.makeUseVisualState)({
        scrapeMotionValuesFromProps: _utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_1__.scrapeMotionValuesFromProps,
        createRenderState: _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_2__.createHtmlRenderState,
    }),
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/html/use-props.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/html/use-props.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   copyRawValuesOnly: () => (/* binding */ copyRawValuesOnly),
/* harmony export */   useHTMLProps: () => (/* binding */ useHTMLProps)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _motion_utils_is_forced_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../motion/utils/is-forced-motion-value.mjs */ "./node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs");
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../value/utils/is-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs");
/* harmony import */ var _utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/build-styles.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs");
/* harmony import */ var _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/create-render-state.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs");






function copyRawValuesOnly(target, source, props) {
    for (const key in source) {
        if (!(0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__.isMotionValue)(source[key]) && !(0,_motion_utils_is_forced_motion_value_mjs__WEBPACK_IMPORTED_MODULE_2__.isForcedMotionValue)(key, props)) {
            target[key] = source[key];
        }
    }
}
function useInitialMotionValues({ transformTemplate }, visualState) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        const state = (0,_utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_3__.createHtmlRenderState)();
        (0,_utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_4__.buildHTMLStyles)(state, visualState, transformTemplate);
        return Object.assign({}, state.vars, state.style);
    }, [visualState]);
}
function useStyle(props, visualState) {
    const styleProp = props.style || {};
    const style = {};
    /**
     * Copy non-Motion Values straight into style
     */
    copyRawValuesOnly(style, styleProp, props);
    Object.assign(style, useInitialMotionValues(props, visualState));
    return style;
}
function useHTMLProps(props, visualState) {
    // The `any` isn't ideal but it is the type of createElement props argument
    const htmlProps = {};
    const style = useStyle(props, visualState);
    if (props.drag && props.dragListener !== false) {
        // Disable the ghost element when a user drags
        htmlProps.draggable = false;
        // Disable text selection
        style.userSelect =
            style.WebkitUserSelect =
                style.WebkitTouchCallout =
                    "none";
        // Disable scrolling on the draggable direction
        style.touchAction =
            props.drag === true
                ? "none"
                : `pan-${props.drag === "x" ? "y" : "x"}`;
    }
    if (props.tabIndex === undefined &&
        (props.onTap || props.onTapStart || props.whileTap)) {
        htmlProps.tabIndex = 0;
    }
    htmlProps.style = style;
    return htmlProps;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildHTMLStyles: () => (/* binding */ buildHTMLStyles)
/* harmony export */ });
/* harmony import */ var _dom_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom/utils/is-css-variable.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs");
/* harmony import */ var _dom_value_types_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dom/value-types/get-as-type.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs");
/* harmony import */ var _dom_value_types_number_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../dom/value-types/number.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs");
/* harmony import */ var _build_transform_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./build-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs");
/* harmony import */ var _keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs");






function buildHTMLStyles(state, latestValues, transformTemplate) {
    const { style, vars, transformOrigin } = state;
    // Track whether we encounter any transform or transformOrigin values.
    let hasTransform = false;
    let hasTransformOrigin = false;
    /**
     * Loop over all our latest animated values and decide whether to handle them
     * as a style or CSS variable.
     *
     * Transforms and transform origins are kept separately for further processing.
     */
    for (const key in latestValues) {
        const value = latestValues[key];
        if (_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.transformProps.has(key)) {
            // If this is a transform, flag to enable further transform processing
            hasTransform = true;
            continue;
        }
        else if ((0,_dom_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_1__.isCSSVariableName)(key)) {
            vars[key] = value;
            continue;
        }
        else {
            // Convert the value to its default value type, ie 0 -> "0px"
            const valueAsType = (0,_dom_value_types_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_2__.getValueAsType)(value, _dom_value_types_number_mjs__WEBPACK_IMPORTED_MODULE_3__.numberValueTypes[key]);
            if (key.startsWith("origin")) {
                // If this is a transform origin, flag and enable further transform-origin processing
                hasTransformOrigin = true;
                transformOrigin[key] =
                    valueAsType;
            }
            else {
                style[key] = valueAsType;
            }
        }
    }
    if (!latestValues.transform) {
        if (hasTransform || transformTemplate) {
            style.transform = (0,_build_transform_mjs__WEBPACK_IMPORTED_MODULE_4__.buildTransform)(latestValues, state.transform, transformTemplate);
        }
        else if (style.transform) {
            /**
             * If we have previously created a transform but currently don't have any,
             * reset transform style to none.
             */
            style.transform = "none";
        }
    }
    /**
     * Build a transformOrigin style. Uses the same defaults as the browser for
     * undefined origins.
     */
    if (hasTransformOrigin) {
        const { originX = "50%", originY = "50%", originZ = 0, } = transformOrigin;
        style.transformOrigin = `${originX} ${originY} ${originZ}`;
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs":
/*!**********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/html/utils/build-transform.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildTransform: () => (/* binding */ buildTransform)
/* harmony export */ });
/* harmony import */ var _dom_value_types_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom/value-types/get-as-type.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/get-as-type.mjs");
/* harmony import */ var _dom_value_types_number_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dom/value-types/number.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/number.mjs");
/* harmony import */ var _keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs");




const translateAlias = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
};
const numTransforms = _keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.transformPropOrder.length;
/**
 * Build a CSS transform style from individual x/y/scale etc properties.
 *
 * This outputs with a default order of transforms/scales/rotations, this can be customised by
 * providing a transformTemplate function.
 */
function buildTransform(latestValues, transform, transformTemplate) {
    // The transform string we're going to build into.
    let transformString = "";
    let transformIsDefault = true;
    /**
     * Loop over all possible transforms in order, adding the ones that
     * are present to the transform string.
     */
    for (let i = 0; i < numTransforms; i++) {
        const key = _keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.transformPropOrder[i];
        const value = latestValues[key];
        if (value === undefined)
            continue;
        let valueIsDefault = true;
        if (typeof value === "number") {
            valueIsDefault = value === (key.startsWith("scale") ? 1 : 0);
        }
        else {
            valueIsDefault = parseFloat(value) === 0;
        }
        if (!valueIsDefault || transformTemplate) {
            const valueAsType = (0,_dom_value_types_get_as_type_mjs__WEBPACK_IMPORTED_MODULE_1__.getValueAsType)(value, _dom_value_types_number_mjs__WEBPACK_IMPORTED_MODULE_2__.numberValueTypes[key]);
            if (!valueIsDefault) {
                transformIsDefault = false;
                const transformName = translateAlias[key] || key;
                transformString += `${transformName}(${valueAsType}) `;
            }
            if (transformTemplate) {
                transform[key] = valueAsType;
            }
        }
    }
    transformString = transformString.trim();
    // If we have a custom `transform` template, pass our transform values and
    // generated transformString to that before returning
    if (transformTemplate) {
        transformString = transformTemplate(transform, transformIsDefault ? "" : transformString);
    }
    else if (transformIsDefault) {
        transformString = "none";
    }
    return transformString;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createHtmlRenderState: () => (/* binding */ createHtmlRenderState)
/* harmony export */ });
const createHtmlRenderState = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {},
});




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/html/utils/keys-position.mjs":
/*!********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/html/utils/keys-position.mjs ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   positionalKeys: () => (/* binding */ positionalKeys)
/* harmony export */ });
/* harmony import */ var _keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keys-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs");


const positionalKeys = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    ..._keys_transform_mjs__WEBPACK_IMPORTED_MODULE_0__.transformPropOrder,
]);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transformPropOrder: () => (/* binding */ transformPropOrder),
/* harmony export */   transformProps: () => (/* binding */ transformProps)
/* harmony export */ });
/**
 * Generate a list of every possible transform key.
 */
const transformPropOrder = [
    "transformPerspective",
    "x",
    "y",
    "z",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "skew",
    "skewX",
    "skewY",
];
/**
 * A quick lookup for transform props.
 */
const transformProps = new Set(transformPropOrder);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/html/utils/make-none-animatable.mjs":
/*!***************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/html/utils/make-none-animatable.mjs ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   makeNoneKeyframesAnimatable: () => (/* binding */ makeNoneKeyframesAnimatable)
/* harmony export */ });
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/types/complex/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _dom_value_types_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dom/value-types/animatable-none.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/animatable-none.mjs");



/**
 * If we encounter keyframes like "none" or "0" and we also have keyframes like
 * "#fff" or "200px 200px" we want to find a keyframe to serve as a template for
 * the "none" keyframes. In this case "#fff" or "200px 200px" - then these get turned into
 * zero equivalents, i.e. "#fff0" or "0px 0px".
 */
const invalidTemplates = new Set(["auto", "none", "0"]);
function makeNoneKeyframesAnimatable(unresolvedKeyframes, noneKeyframeIndexes, name) {
    let i = 0;
    let animatableTemplate = undefined;
    while (i < unresolvedKeyframes.length && !animatableTemplate) {
        const keyframe = unresolvedKeyframes[i];
        if (typeof keyframe === "string" &&
            !invalidTemplates.has(keyframe) &&
            (0,_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_0__.analyseComplexValue)(keyframe).values.length) {
            animatableTemplate = unresolvedKeyframes[i];
        }
        i++;
    }
    if (animatableTemplate && name) {
        for (const noneIndex of noneKeyframeIndexes) {
            unresolvedKeyframes[noneIndex] = (0,_dom_value_types_animatable_none_mjs__WEBPACK_IMPORTED_MODULE_1__.getAnimatableNone)(name, animatableTemplate);
        }
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/html/utils/render.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/html/utils/render.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderHTML: () => (/* binding */ renderHTML)
/* harmony export */ });
function renderHTML(element, { style, vars }, styleProp, projection) {
    Object.assign(element.style, style, projection && projection.getProjectionStyles(styleProp));
    // Loop over any CSS variables and assign those.
    for (const key in vars) {
        element.style.setProperty(key, vars[key]);
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs":
/*!***************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scrapeMotionValuesFromProps: () => (/* binding */ scrapeMotionValuesFromProps)
/* harmony export */ });
/* harmony import */ var _motion_utils_is_forced_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../motion/utils/is-forced-motion-value.mjs */ "./node_modules/framer-motion/dist/es/motion/utils/is-forced-motion-value.mjs");
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/utils/is-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs");



function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    var _a;
    const { style } = props;
    const newValues = {};
    for (const key in style) {
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(style[key]) ||
            (prevProps.style &&
                (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(prevProps.style[key])) ||
            (0,_motion_utils_is_forced_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__.isForcedMotionValue)(key, props) ||
            ((_a = visualElement === null || visualElement === void 0 ? void 0 : visualElement.getValue(key)) === null || _a === void 0 ? void 0 : _a.liveStyle) !== undefined) {
            newValues[key] = style[key];
        }
    }
    return newValues;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/store.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/store.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   visualElementStore: () => (/* binding */ visualElementStore)
/* harmony export */ });
const visualElementStore = new WeakMap();




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/SVGVisualElement.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SVGVisualElement: () => (/* binding */ SVGVisualElement)
/* harmony export */ });
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");
/* harmony import */ var _projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../projection/geometry/models.mjs */ "./node_modules/framer-motion/dist/es/projection/geometry/models.mjs");
/* harmony import */ var _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/DOMVisualElement.mjs */ "./node_modules/framer-motion/dist/es/render/dom/DOMVisualElement.mjs");
/* harmony import */ var _dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom/utils/camel-to-dash.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs");
/* harmony import */ var _dom_value_types_defaults_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom/value-types/defaults.mjs */ "./node_modules/framer-motion/dist/es/render/dom/value-types/defaults.mjs");
/* harmony import */ var _html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../html/utils/keys-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs");
/* harmony import */ var _utils_build_attrs_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/build-attrs.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs");
/* harmony import */ var _utils_camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/camel-case-attrs.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs");
/* harmony import */ var _utils_is_svg_tag_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/is-svg-tag.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs");
/* harmony import */ var _utils_measure_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/measure.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/measure.mjs");
/* harmony import */ var _utils_render_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/render.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/render.mjs");
/* harmony import */ var _utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/scrape-motion-values.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs");













class SVGVisualElement extends _dom_DOMVisualElement_mjs__WEBPACK_IMPORTED_MODULE_0__.DOMVisualElement {
    constructor() {
        super(...arguments);
        this.type = "svg";
        this.isSVGTag = false;
        this.measureInstanceViewportBox = _projection_geometry_models_mjs__WEBPACK_IMPORTED_MODULE_1__.createBox;
        this.updateDimensions = () => {
            if (this.current && !this.renderState.dimensions) {
                (0,_utils_measure_mjs__WEBPACK_IMPORTED_MODULE_2__.updateSVGDimensions)(this.current, this.renderState);
            }
        };
    }
    getBaseTargetFromProps(props, key) {
        return props[key];
    }
    readValueFromInstance(instance, key) {
        if (_html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_3__.transformProps.has(key)) {
            const defaultType = (0,_dom_value_types_defaults_mjs__WEBPACK_IMPORTED_MODULE_4__.getDefaultValueType)(key);
            return defaultType ? defaultType.default || 0 : 0;
        }
        key = !_utils_camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_5__.camelCaseAttributes.has(key) ? (0,_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_6__.camelToDash)(key) : key;
        return instance.getAttribute(key);
    }
    scrapeMotionValuesFromProps(props, prevProps, visualElement) {
        return (0,_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_7__.scrapeMotionValuesFromProps)(props, prevProps, visualElement);
    }
    onBindTransform() {
        if (this.current && !this.renderState.dimensions) {
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_8__.frame.postRender(this.updateDimensions);
        }
    }
    build(renderState, latestValues, props) {
        (0,_utils_build_attrs_mjs__WEBPACK_IMPORTED_MODULE_9__.buildSVGAttrs)(renderState, latestValues, this.isSVGTag, props.transformTemplate);
    }
    renderInstance(instance, renderState, styleProp, projection) {
        (0,_utils_render_mjs__WEBPACK_IMPORTED_MODULE_10__.renderSVG)(instance, renderState, styleProp, projection);
    }
    mount(instance) {
        this.isSVGTag = (0,_utils_is_svg_tag_mjs__WEBPACK_IMPORTED_MODULE_11__.isSVGTag)(instance.tagName);
        super.mount(instance);
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/config-motion.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/config-motion.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   svgMotionConfig: () => (/* binding */ svgMotionConfig)
/* harmony export */ });
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");
/* harmony import */ var _motion_utils_use_visual_state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../motion/utils/use-visual-state.mjs */ "./node_modules/framer-motion/dist/es/motion/utils/use-visual-state.mjs");
/* harmony import */ var _html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../html/utils/keys-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs");
/* harmony import */ var _utils_build_attrs_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/build-attrs.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs");
/* harmony import */ var _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/create-render-state.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs");
/* harmony import */ var _utils_is_svg_tag_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/is-svg-tag.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs");
/* harmony import */ var _utils_measure_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/measure.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/measure.mjs");
/* harmony import */ var _utils_render_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/render.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/render.mjs");
/* harmony import */ var _utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/scrape-motion-values.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs");










const layoutProps = ["x", "y", "width", "height", "cx", "cy", "r"];
const svgMotionConfig = {
    useVisualState: (0,_motion_utils_use_visual_state_mjs__WEBPACK_IMPORTED_MODULE_0__.makeUseVisualState)({
        scrapeMotionValuesFromProps: _utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_1__.scrapeMotionValuesFromProps,
        createRenderState: _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_2__.createSvgRenderState,
        onUpdate: ({ props, prevProps, current, renderState, latestValues, }) => {
            if (!current)
                return;
            let hasTransform = !!props.drag;
            if (!hasTransform) {
                for (const key in latestValues) {
                    if (_html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_3__.transformProps.has(key)) {
                        hasTransform = true;
                        break;
                    }
                }
            }
            if (!hasTransform)
                return;
            let needsMeasure = !prevProps;
            if (prevProps) {
                /**
                 * Check the layout props for changes, if any are found we need to
                 * measure the element again.
                 */
                for (let i = 0; i < layoutProps.length; i++) {
                    const key = layoutProps[i];
                    if (props[key] !==
                        prevProps[key]) {
                        needsMeasure = true;
                    }
                }
            }
            if (!needsMeasure)
                return;
            _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_4__.frame.read(() => {
                (0,_utils_measure_mjs__WEBPACK_IMPORTED_MODULE_5__.updateSVGDimensions)(current, renderState);
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_4__.frame.render(() => {
                    (0,_utils_build_attrs_mjs__WEBPACK_IMPORTED_MODULE_6__.buildSVGAttrs)(renderState, latestValues, (0,_utils_is_svg_tag_mjs__WEBPACK_IMPORTED_MODULE_7__.isSVGTag)(current.tagName), props.transformTemplate);
                    (0,_utils_render_mjs__WEBPACK_IMPORTED_MODULE_8__.renderSVG)(current, renderState);
                });
            });
        },
    }),
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/lowercase-elements.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   lowercaseSVGElements: () => (/* binding */ lowercaseSVGElements)
/* harmony export */ });
/**
 * We keep these listed separately as we use the lowercase tag names as part
 * of the runtime bundle to detect SVG components
 */
const lowercaseSVGElements = [
    "animate",
    "circle",
    "defs",
    "desc",
    "ellipse",
    "g",
    "image",
    "line",
    "filter",
    "marker",
    "mask",
    "metadata",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "rect",
    "stop",
    "switch",
    "symbol",
    "svg",
    "text",
    "tspan",
    "use",
    "view",
];




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/use-props.mjs":
/*!*********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/use-props.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSVGProps: () => (/* binding */ useSVGProps)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _html_use_props_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../html/use-props.mjs */ "./node_modules/framer-motion/dist/es/render/html/use-props.mjs");
/* harmony import */ var _utils_build_attrs_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/build-attrs.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs");
/* harmony import */ var _utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/create-render-state.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs");
/* harmony import */ var _utils_is_svg_tag_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/is-svg-tag.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs");






function useSVGProps(props, visualState, _isStatic, Component) {
    const visualProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
        const state = (0,_utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_1__.createSvgRenderState)();
        (0,_utils_build_attrs_mjs__WEBPACK_IMPORTED_MODULE_2__.buildSVGAttrs)(state, visualState, (0,_utils_is_svg_tag_mjs__WEBPACK_IMPORTED_MODULE_3__.isSVGTag)(Component), props.transformTemplate);
        return {
            ...state.attrs,
            style: { ...state.style },
        };
    }, [visualState]);
    if (props.style) {
        const rawStyles = {};
        (0,_html_use_props_mjs__WEBPACK_IMPORTED_MODULE_4__.copyRawValuesOnly)(rawStyles, props.style, props);
        visualProps.style = { ...rawStyles, ...visualProps.style };
    }
    return visualProps;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/utils/build-attrs.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildSVGAttrs: () => (/* binding */ buildSVGAttrs)
/* harmony export */ });
/* harmony import */ var _html_utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../html/utils/build-styles.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/build-styles.mjs");
/* harmony import */ var _path_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./path.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/path.mjs");
/* harmony import */ var _transform_origin_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform-origin.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs");




/**
 * Build SVG visual attrbutes, like cx and style.transform
 */
function buildSVGAttrs(state, { attrX, attrY, attrScale, originX, originY, pathLength, pathSpacing = 1, pathOffset = 0, 
// This is object creation, which we try to avoid per-frame.
...latest }, isSVGTag, transformTemplate) {
    (0,_html_utils_build_styles_mjs__WEBPACK_IMPORTED_MODULE_0__.buildHTMLStyles)(state, latest, transformTemplate);
    /**
     * For svg tags we just want to make sure viewBox is animatable and treat all the styles
     * as normal HTML tags.
     */
    if (isSVGTag) {
        if (state.style.viewBox) {
            state.attrs.viewBox = state.style.viewBox;
        }
        return;
    }
    state.attrs = state.style;
    state.style = {};
    const { attrs, style, dimensions } = state;
    /**
     * However, we apply transforms as CSS transforms. So if we detect a transform we take it from attrs
     * and copy it into style.
     */
    if (attrs.transform) {
        if (dimensions)
            style.transform = attrs.transform;
        delete attrs.transform;
    }
    // Parse transformOrigin
    if (dimensions &&
        (originX !== undefined || originY !== undefined || style.transform)) {
        style.transformOrigin = (0,_transform_origin_mjs__WEBPACK_IMPORTED_MODULE_1__.calcSVGTransformOrigin)(dimensions, originX !== undefined ? originX : 0.5, originY !== undefined ? originY : 0.5);
    }
    // Render attrX/attrY/attrScale as attributes
    if (attrX !== undefined)
        attrs.x = attrX;
    if (attrY !== undefined)
        attrs.y = attrY;
    if (attrScale !== undefined)
        attrs.scale = attrScale;
    // Build SVG path if one has been defined
    if (pathLength !== undefined) {
        (0,_path_mjs__WEBPACK_IMPORTED_MODULE_2__.buildSVGPath)(attrs, pathLength, pathSpacing, pathOffset, false);
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs":
/*!**********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   camelCaseAttributes: () => (/* binding */ camelCaseAttributes)
/* harmony export */ });
/**
 * A set of attribute names that are always read/written as camel case.
 */
const camelCaseAttributes = new Set([
    "baseFrequency",
    "diffuseConstant",
    "kernelMatrix",
    "kernelUnitLength",
    "keySplines",
    "keyTimes",
    "limitingConeAngle",
    "markerHeight",
    "markerWidth",
    "numOctaves",
    "targetX",
    "targetY",
    "surfaceScale",
    "specularConstant",
    "specularExponent",
    "stdDeviation",
    "tableValues",
    "viewBox",
    "gradientTransform",
    "pathLength",
    "startOffset",
    "textLength",
    "lengthAdjust",
]);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs":
/*!*************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/utils/create-render-state.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createSvgRenderState: () => (/* binding */ createSvgRenderState)
/* harmony export */ });
/* harmony import */ var _html_utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../html/utils/create-render-state.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/create-render-state.mjs");


const createSvgRenderState = () => ({
    ...(0,_html_utils_create_render_state_mjs__WEBPACK_IMPORTED_MODULE_0__.createHtmlRenderState)(),
    attrs: {},
});




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/utils/is-svg-tag.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isSVGTag: () => (/* binding */ isSVGTag)
/* harmony export */ });
const isSVGTag = (tag) => typeof tag === "string" && tag.toLowerCase() === "svg";




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/utils/measure.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/utils/measure.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateSVGDimensions: () => (/* binding */ updateSVGDimensions)
/* harmony export */ });
function updateSVGDimensions(instance, renderState) {
    try {
        renderState.dimensions =
            typeof instance.getBBox === "function"
                ? instance.getBBox()
                : instance.getBoundingClientRect();
    }
    catch (e) {
        // Most likely trying to measure an unrendered element under Firefox
        renderState.dimensions = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/utils/path.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/utils/path.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildSVGPath: () => (/* binding */ buildSVGPath)
/* harmony export */ });
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/types/numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");


const dashKeys = {
    offset: "stroke-dashoffset",
    array: "stroke-dasharray",
};
const camelKeys = {
    offset: "strokeDashoffset",
    array: "strokeDasharray",
};
/**
 * Build SVG path properties. Uses the path's measured length to convert
 * our custom pathLength, pathSpacing and pathOffset into stroke-dashoffset
 * and stroke-dasharray attributes.
 *
 * This function is mutative to reduce per-frame GC.
 */
function buildSVGPath(attrs, length, spacing = 1, offset = 0, useDashCase = true) {
    // Normalise path length by setting SVG attribute pathLength to 1
    attrs.pathLength = 1;
    // We use dash case when setting attributes directly to the DOM node and camel case
    // when defining props on a React component.
    const keys = useDashCase ? dashKeys : camelKeys;
    // Build the dash offset
    attrs[keys.offset] = _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px.transform(-offset);
    // Build the dash array
    const pathLength = _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px.transform(length);
    const pathSpacing = _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px.transform(spacing);
    attrs[keys.array] = `${pathLength} ${pathSpacing}`;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/utils/render.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/utils/render.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderSVG: () => (/* binding */ renderSVG)
/* harmony export */ });
/* harmony import */ var _dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dom/utils/camel-to-dash.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/camel-to-dash.mjs");
/* harmony import */ var _html_utils_render_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../html/utils/render.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/render.mjs");
/* harmony import */ var _camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./camel-case-attrs.mjs */ "./node_modules/framer-motion/dist/es/render/svg/utils/camel-case-attrs.mjs");




function renderSVG(element, renderState, _styleProp, projection) {
    (0,_html_utils_render_mjs__WEBPACK_IMPORTED_MODULE_0__.renderHTML)(element, renderState, undefined, projection);
    for (const key in renderState.attrs) {
        element.setAttribute(!_camel_case_attrs_mjs__WEBPACK_IMPORTED_MODULE_1__.camelCaseAttributes.has(key) ? (0,_dom_utils_camel_to_dash_mjs__WEBPACK_IMPORTED_MODULE_2__.camelToDash)(key) : key, renderState.attrs[key]);
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/utils/scrape-motion-values.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scrapeMotionValuesFromProps: () => (/* binding */ scrapeMotionValuesFromProps)
/* harmony export */ });
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../value/utils/is-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs");
/* harmony import */ var _html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../html/utils/keys-transform.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/keys-transform.mjs");
/* harmony import */ var _html_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../html/utils/scrape-motion-values.mjs */ "./node_modules/framer-motion/dist/es/render/html/utils/scrape-motion-values.mjs");




function scrapeMotionValuesFromProps(props, prevProps, visualElement) {
    const newValues = (0,_html_utils_scrape_motion_values_mjs__WEBPACK_IMPORTED_MODULE_0__.scrapeMotionValuesFromProps)(props, prevProps, visualElement);
    for (const key in props) {
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__.isMotionValue)(props[key]) ||
            (0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_1__.isMotionValue)(prevProps[key])) {
            const targetKey = _html_utils_keys_transform_mjs__WEBPACK_IMPORTED_MODULE_2__.transformPropOrder.indexOf(key) !== -1
                ? "attr" + key.charAt(0).toUpperCase() + key.substring(1)
                : key;
            newValues[targetKey] = props[key];
        }
    }
    return newValues;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs":
/*!**********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/svg/utils/transform-origin.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcSVGTransformOrigin: () => (/* binding */ calcSVGTransformOrigin)
/* harmony export */ });
/* harmony import */ var _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../value/types/numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");


function calcOrigin(origin, offset, size) {
    return typeof origin === "string"
        ? origin
        : _value_types_numbers_units_mjs__WEBPACK_IMPORTED_MODULE_0__.px.transform(offset + size * origin);
}
/**
 * The SVG transform origin defaults are different to CSS and is less intuitive,
 * so we use the measured dimensions of the SVG to reconcile these.
 */
function calcSVGTransformOrigin(dimensions, originX, originY) {
    const pxOriginX = calcOrigin(originX, dimensions.x, dimensions.width);
    const pxOriginY = calcOrigin(originY, dimensions.y, dimensions.height);
    return `${pxOriginX} ${pxOriginY}`;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/KeyframesResolver.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/KeyframesResolver.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   KeyframeResolver: () => (/* binding */ KeyframeResolver),
/* harmony export */   flushKeyframeResolvers: () => (/* binding */ flushKeyframeResolvers)
/* harmony export */ });
/* harmony import */ var _dom_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/utils/unit-conversion.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/unit-conversion.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");



const toResolve = new Set();
let isScheduled = false;
let anyNeedsMeasurement = false;
function measureAllKeyframes() {
    if (anyNeedsMeasurement) {
        const resolversToMeasure = Array.from(toResolve).filter((resolver) => resolver.needsMeasurement);
        const elementsToMeasure = new Set(resolversToMeasure.map((resolver) => resolver.element));
        const transformsToRestore = new Map();
        /**
         * Write pass
         * If we're measuring elements we want to remove bounding box-changing transforms.
         */
        elementsToMeasure.forEach((element) => {
            const removedTransforms = (0,_dom_utils_unit_conversion_mjs__WEBPACK_IMPORTED_MODULE_0__.removeNonTranslationalTransform)(element);
            if (!removedTransforms.length)
                return;
            transformsToRestore.set(element, removedTransforms);
            element.render();
        });
        // Read
        resolversToMeasure.forEach((resolver) => resolver.measureInitialState());
        // Write
        elementsToMeasure.forEach((element) => {
            element.render();
            const restore = transformsToRestore.get(element);
            if (restore) {
                restore.forEach(([key, value]) => {
                    var _a;
                    (_a = element.getValue(key)) === null || _a === void 0 ? void 0 : _a.set(value);
                });
            }
        });
        // Read
        resolversToMeasure.forEach((resolver) => resolver.measureEndState());
        // Write
        resolversToMeasure.forEach((resolver) => {
            if (resolver.suspendedScrollY !== undefined) {
                window.scrollTo(0, resolver.suspendedScrollY);
            }
        });
    }
    anyNeedsMeasurement = false;
    isScheduled = false;
    toResolve.forEach((resolver) => resolver.complete());
    toResolve.clear();
}
function readAllKeyframes() {
    toResolve.forEach((resolver) => {
        resolver.readKeyframes();
        if (resolver.needsMeasurement) {
            anyNeedsMeasurement = true;
        }
    });
}
function flushKeyframeResolvers() {
    readAllKeyframes();
    measureAllKeyframes();
}
class KeyframeResolver {
    constructor(unresolvedKeyframes, onComplete, name, motionValue, element, isAsync = false) {
        /**
         * Track whether this resolver has completed. Once complete, it never
         * needs to attempt keyframe resolution again.
         */
        this.isComplete = false;
        /**
         * Track whether this resolver is async. If it is, it'll be added to the
         * resolver queue and flushed in the next frame. Resolvers that aren't going
         * to trigger read/write thrashing don't need to be async.
         */
        this.isAsync = false;
        /**
         * Track whether this resolver needs to perform a measurement
         * to resolve its keyframes.
         */
        this.needsMeasurement = false;
        /**
         * Track whether this resolver is currently scheduled to resolve
         * to allow it to be cancelled and resumed externally.
         */
        this.isScheduled = false;
        this.unresolvedKeyframes = [...unresolvedKeyframes];
        this.onComplete = onComplete;
        this.name = name;
        this.motionValue = motionValue;
        this.element = element;
        this.isAsync = isAsync;
    }
    scheduleResolve() {
        this.isScheduled = true;
        if (this.isAsync) {
            toResolve.add(this);
            if (!isScheduled) {
                isScheduled = true;
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__.frame.read(readAllKeyframes);
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_1__.frame.resolveKeyframes(measureAllKeyframes);
            }
        }
        else {
            this.readKeyframes();
            this.complete();
        }
    }
    readKeyframes() {
        const { unresolvedKeyframes, name, element, motionValue } = this;
        /**
         * If a keyframe is null, we hydrate it either by reading it from
         * the instance, or propagating from previous keyframes.
         */
        for (let i = 0; i < unresolvedKeyframes.length; i++) {
            if (unresolvedKeyframes[i] === null) {
                /**
                 * If the first keyframe is null, we need to find its value by sampling the element
                 */
                if (i === 0) {
                    const currentValue = motionValue === null || motionValue === void 0 ? void 0 : motionValue.get();
                    const finalKeyframe = unresolvedKeyframes[unresolvedKeyframes.length - 1];
                    if (currentValue !== undefined) {
                        unresolvedKeyframes[0] = currentValue;
                    }
                    else if (element && name) {
                        const valueAsRead = element.readValue(name, finalKeyframe);
                        if (valueAsRead !== undefined && valueAsRead !== null) {
                            unresolvedKeyframes[0] = valueAsRead;
                        }
                    }
                    if (unresolvedKeyframes[0] === undefined) {
                        unresolvedKeyframes[0] = finalKeyframe;
                    }
                    if (motionValue && currentValue === undefined) {
                        motionValue.set(unresolvedKeyframes[0]);
                    }
                }
                else {
                    unresolvedKeyframes[i] = unresolvedKeyframes[i - 1];
                }
            }
        }
    }
    setFinalKeyframe() { }
    measureInitialState() { }
    renderEndStyles() { }
    measureEndState() { }
    complete() {
        this.isComplete = true;
        this.onComplete(this.unresolvedKeyframes, this.finalKeyframe);
        toResolve.delete(this);
    }
    cancel() {
        if (!this.isComplete) {
            this.isScheduled = false;
            toResolve.delete(this);
        }
    }
    resume() {
        if (!this.isComplete)
            this.scheduleResolve();
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/animation-state.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/animation-state.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkVariantsDidChange: () => (/* binding */ checkVariantsDidChange),
/* harmony export */   createAnimationState: () => (/* binding */ createAnimationState)
/* harmony export */ });
/* harmony import */ var _animation_interfaces_visual_element_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../animation/interfaces/visual-element.mjs */ "./node_modules/framer-motion/dist/es/animation/interfaces/visual-element.mjs");
/* harmony import */ var _animation_utils_is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../animation/utils/is-animation-controls.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs");
/* harmony import */ var _animation_utils_is_keyframes_target_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../animation/utils/is-keyframes-target.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs");
/* harmony import */ var _utils_shallow_compare_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../utils/shallow-compare.mjs */ "./node_modules/framer-motion/dist/es/utils/shallow-compare.mjs");
/* harmony import */ var _get_variant_context_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-variant-context.mjs */ "./node_modules/framer-motion/dist/es/render/utils/get-variant-context.mjs");
/* harmony import */ var _is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./is-variant-label.mjs */ "./node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs");
/* harmony import */ var _resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resolve-dynamic-variants.mjs */ "./node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs");
/* harmony import */ var _variant_props_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variant-props.mjs */ "./node_modules/framer-motion/dist/es/render/utils/variant-props.mjs");









const reversePriorityOrder = [..._variant_props_mjs__WEBPACK_IMPORTED_MODULE_0__.variantPriorityOrder].reverse();
const numAnimationTypes = _variant_props_mjs__WEBPACK_IMPORTED_MODULE_0__.variantPriorityOrder.length;
function animateList(visualElement) {
    return (animations) => Promise.all(animations.map(({ animation, options }) => (0,_animation_interfaces_visual_element_mjs__WEBPACK_IMPORTED_MODULE_1__.animateVisualElement)(visualElement, animation, options)));
}
function createAnimationState(visualElement) {
    let animate = animateList(visualElement);
    let state = createState();
    let isInitialRender = true;
    /**
     * This function will be used to reduce the animation definitions for
     * each active animation type into an object of resolved values for it.
     */
    const buildResolvedTypeValues = (type) => (acc, definition) => {
        var _a;
        const resolved = (0,_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_2__.resolveVariant)(visualElement, definition, type === "exit"
            ? (_a = visualElement.presenceContext) === null || _a === void 0 ? void 0 : _a.custom
            : undefined);
        if (resolved) {
            const { transition, transitionEnd, ...target } = resolved;
            acc = { ...acc, ...target, ...transitionEnd };
        }
        return acc;
    };
    /**
     * This just allows us to inject mocked animation functions
     * @internal
     */
    function setAnimateFunction(makeAnimator) {
        animate = makeAnimator(visualElement);
    }
    /**
     * When we receive new props, we need to:
     * 1. Create a list of protected keys for each type. This is a directory of
     *    value keys that are currently being "handled" by types of a higher priority
     *    so that whenever an animation is played of a given type, these values are
     *    protected from being animated.
     * 2. Determine if an animation type needs animating.
     * 3. Determine if any values have been removed from a type and figure out
     *    what to animate those to.
     */
    function animateChanges(changedActiveType) {
        const { props } = visualElement;
        const context = (0,_get_variant_context_mjs__WEBPACK_IMPORTED_MODULE_3__.getVariantContext)(visualElement.parent) || {};
        /**
         * A list of animations that we'll build into as we iterate through the animation
         * types. This will get executed at the end of the function.
         */
        const animations = [];
        /**
         * Keep track of which values have been removed. Then, as we hit lower priority
         * animation types, we can check if they contain removed values and animate to that.
         */
        const removedKeys = new Set();
        /**
         * A dictionary of all encountered keys. This is an object to let us build into and
         * copy it without iteration. Each time we hit an animation type we set its protected
         * keys - the keys its not allowed to animate - to the latest version of this object.
         */
        let encounteredKeys = {};
        /**
         * If a variant has been removed at a given index, and this component is controlling
         * variant animations, we want to ensure lower-priority variants are forced to animate.
         */
        let removedVariantIndex = Infinity;
        /**
         * Iterate through all animation types in reverse priority order. For each, we want to
         * detect which values it's handling and whether or not they've changed (and therefore
         * need to be animated). If any values have been removed, we want to detect those in
         * lower priority props and flag for animation.
         */
        for (let i = 0; i < numAnimationTypes; i++) {
            const type = reversePriorityOrder[i];
            const typeState = state[type];
            const prop = props[type] !== undefined
                ? props[type]
                : context[type];
            const propIsVariant = (0,_is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_4__.isVariantLabel)(prop);
            /**
             * If this type has *just* changed isActive status, set activeDelta
             * to that status. Otherwise set to null.
             */
            const activeDelta = type === changedActiveType ? typeState.isActive : null;
            if (activeDelta === false)
                removedVariantIndex = i;
            /**
             * If this prop is an inherited variant, rather than been set directly on the
             * component itself, we want to make sure we allow the parent to trigger animations.
             *
             * TODO: Can probably change this to a !isControllingVariants check
             */
            let isInherited = prop === context[type] &&
                prop !== props[type] &&
                propIsVariant;
            /**
             *
             */
            if (isInherited &&
                isInitialRender &&
                visualElement.manuallyAnimateOnMount) {
                isInherited = false;
            }
            /**
             * Set all encountered keys so far as the protected keys for this type. This will
             * be any key that has been animated or otherwise handled by active, higher-priortiy types.
             */
            typeState.protectedKeys = { ...encounteredKeys };
            // Check if we can skip analysing this prop early
            if (
            // If it isn't active and hasn't *just* been set as inactive
            (!typeState.isActive && activeDelta === null) ||
                // If we didn't and don't have any defined prop for this animation type
                (!prop && !typeState.prevProp) ||
                // Or if the prop doesn't define an animation
                (0,_animation_utils_is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_5__.isAnimationControls)(prop) ||
                typeof prop === "boolean") {
                continue;
            }
            /**
             * As we go look through the values defined on this type, if we detect
             * a changed value or a value that was removed in a higher priority, we set
             * this to true and add this prop to the animation list.
             */
            const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
            let shouldAnimateType = variantDidChange ||
                // If we're making this variant active, we want to always make it active
                (type === changedActiveType &&
                    typeState.isActive &&
                    !isInherited &&
                    propIsVariant) ||
                // If we removed a higher-priority variant (i is in reverse order)
                (i > removedVariantIndex && propIsVariant);
            let handledRemovedValues = false;
            /**
             * As animations can be set as variant lists, variants or target objects, we
             * coerce everything to an array if it isn't one already
             */
            const definitionList = Array.isArray(prop) ? prop : [prop];
            /**
             * Build an object of all the resolved values. We'll use this in the subsequent
             * animateChanges calls to determine whether a value has changed.
             */
            let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
            if (activeDelta === false)
                resolvedValues = {};
            /**
             * Now we need to loop through all the keys in the prev prop and this prop,
             * and decide:
             * 1. If the value has changed, and needs animating
             * 2. If it has been removed, and needs adding to the removedKeys set
             * 3. If it has been removed in a higher priority type and needs animating
             * 4. If it hasn't been removed in a higher priority but hasn't changed, and
             *    needs adding to the type's protectedKeys list.
             */
            const { prevResolvedValues = {} } = typeState;
            const allKeys = {
                ...prevResolvedValues,
                ...resolvedValues,
            };
            const markToAnimate = (key) => {
                shouldAnimateType = true;
                if (removedKeys.has(key)) {
                    handledRemovedValues = true;
                    removedKeys.delete(key);
                }
                typeState.needsAnimating[key] = true;
                const motionValue = visualElement.getValue(key);
                if (motionValue)
                    motionValue.liveStyle = false;
            };
            for (const key in allKeys) {
                const next = resolvedValues[key];
                const prev = prevResolvedValues[key];
                // If we've already handled this we can just skip ahead
                if (encounteredKeys.hasOwnProperty(key))
                    continue;
                /**
                 * If the value has changed, we probably want to animate it.
                 */
                let valueHasChanged = false;
                if ((0,_animation_utils_is_keyframes_target_mjs__WEBPACK_IMPORTED_MODULE_6__.isKeyframesTarget)(next) && (0,_animation_utils_is_keyframes_target_mjs__WEBPACK_IMPORTED_MODULE_6__.isKeyframesTarget)(prev)) {
                    valueHasChanged = !(0,_utils_shallow_compare_mjs__WEBPACK_IMPORTED_MODULE_7__.shallowCompare)(next, prev);
                }
                else {
                    valueHasChanged = next !== prev;
                }
                if (valueHasChanged) {
                    if (next !== undefined && next !== null) {
                        // If next is defined and doesn't equal prev, it needs animating
                        markToAnimate(key);
                    }
                    else {
                        // If it's undefined, it's been removed.
                        removedKeys.add(key);
                    }
                }
                else if (next !== undefined && removedKeys.has(key)) {
                    /**
                     * If next hasn't changed and it isn't undefined, we want to check if it's
                     * been removed by a higher priority
                     */
                    markToAnimate(key);
                }
                else {
                    /**
                     * If it hasn't changed, we add it to the list of protected values
                     * to ensure it doesn't get animated.
                     */
                    typeState.protectedKeys[key] = true;
                }
            }
            /**
             * Update the typeState so next time animateChanges is called we can compare the
             * latest prop and resolvedValues to these.
             */
            typeState.prevProp = prop;
            typeState.prevResolvedValues = resolvedValues;
            /**
             *
             */
            if (typeState.isActive) {
                encounteredKeys = { ...encounteredKeys, ...resolvedValues };
            }
            if (isInitialRender && visualElement.blockInitialAnimation) {
                shouldAnimateType = false;
            }
            /**
             * If this is an inherited prop we want to skip this animation
             * unless the inherited variants haven't changed on this render.
             */
            const willAnimateViaParent = isInherited && variantDidChange;
            const needsAnimating = !willAnimateViaParent || handledRemovedValues;
            if (shouldAnimateType && needsAnimating) {
                animations.push(...definitionList.map((animation) => ({
                    animation: animation,
                    options: { type },
                })));
            }
        }
        /**
         * If there are some removed value that haven't been dealt with,
         * we need to create a new animation that falls back either to the value
         * defined in the style prop, or the last read value.
         */
        if (removedKeys.size) {
            const fallbackAnimation = {};
            /**
             * If the initial prop contains a transition we can use that, otherwise
             * allow the animation function to use the visual element's default.
             */
            if (typeof props.initial !== "boolean") {
                const initialTransition = (0,_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_2__.resolveVariant)(visualElement, Array.isArray(props.initial)
                    ? props.initial[0]
                    : props.initial);
                if (initialTransition && initialTransition.transition) {
                    fallbackAnimation.transition = initialTransition.transition;
                }
            }
            removedKeys.forEach((key) => {
                const fallbackTarget = visualElement.getBaseTarget(key);
                const motionValue = visualElement.getValue(key);
                if (motionValue)
                    motionValue.liveStyle = true;
                // @ts-expect-error - @mattgperry to figure if we should do something here
                fallbackAnimation[key] = fallbackTarget !== null && fallbackTarget !== void 0 ? fallbackTarget : null;
            });
            animations.push({ animation: fallbackAnimation });
        }
        let shouldAnimate = Boolean(animations.length);
        if (isInitialRender &&
            (props.initial === false || props.initial === props.animate) &&
            !visualElement.manuallyAnimateOnMount) {
            shouldAnimate = false;
        }
        isInitialRender = false;
        return shouldAnimate ? animate(animations) : Promise.resolve();
    }
    /**
     * Change whether a certain animation type is active.
     */
    function setActive(type, isActive) {
        var _a;
        // If the active state hasn't changed, we can safely do nothing here
        if (state[type].isActive === isActive)
            return Promise.resolve();
        // Propagate active change to children
        (_a = visualElement.variantChildren) === null || _a === void 0 ? void 0 : _a.forEach((child) => { var _a; return (_a = child.animationState) === null || _a === void 0 ? void 0 : _a.setActive(type, isActive); });
        state[type].isActive = isActive;
        const animations = animateChanges(type);
        for (const key in state) {
            state[key].protectedKeys = {};
        }
        return animations;
    }
    return {
        animateChanges,
        setActive,
        setAnimateFunction,
        getState: () => state,
        reset: () => {
            state = createState();
            isInitialRender = true;
        },
    };
}
function checkVariantsDidChange(prev, next) {
    if (typeof next === "string") {
        return next !== prev;
    }
    else if (Array.isArray(next)) {
        return !(0,_utils_shallow_compare_mjs__WEBPACK_IMPORTED_MODULE_7__.shallowCompare)(next, prev);
    }
    return false;
}
function createTypeState(isActive = false) {
    return {
        isActive,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {},
    };
}
function createState() {
    return {
        animate: createTypeState(true),
        whileInView: createTypeState(),
        whileHover: createTypeState(),
        whileTap: createTypeState(),
        whileDrag: createTypeState(),
        whileFocus: createTypeState(),
        exit: createTypeState(),
    };
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareByDepth: () => (/* binding */ compareByDepth)
/* harmony export */ });
const compareByDepth = (a, b) => a.depth - b.depth;




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/flat-tree.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FlatTree: () => (/* binding */ FlatTree)
/* harmony export */ });
/* harmony import */ var _utils_array_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/array.mjs */ "./node_modules/framer-motion/dist/es/utils/array.mjs");
/* harmony import */ var _compare_by_depth_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compare-by-depth.mjs */ "./node_modules/framer-motion/dist/es/render/utils/compare-by-depth.mjs");



class FlatTree {
    constructor() {
        this.children = [];
        this.isDirty = false;
    }
    add(child) {
        (0,_utils_array_mjs__WEBPACK_IMPORTED_MODULE_0__.addUniqueItem)(this.children, child);
        this.isDirty = true;
    }
    remove(child) {
        (0,_utils_array_mjs__WEBPACK_IMPORTED_MODULE_0__.removeItem)(this.children, child);
        this.isDirty = true;
    }
    forEach(callback) {
        this.isDirty && this.children.sort(_compare_by_depth_mjs__WEBPACK_IMPORTED_MODULE_1__.compareByDepth);
        this.isDirty = false;
        this.children.forEach(callback);
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/get-variant-context.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/get-variant-context.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getVariantContext: () => (/* binding */ getVariantContext)
/* harmony export */ });
/* harmony import */ var _is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-variant-label.mjs */ "./node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs");
/* harmony import */ var _variant_props_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variant-props.mjs */ "./node_modules/framer-motion/dist/es/render/utils/variant-props.mjs");



const numVariantProps = _variant_props_mjs__WEBPACK_IMPORTED_MODULE_0__.variantProps.length;
function getVariantContext(visualElement) {
    if (!visualElement)
        return undefined;
    if (!visualElement.isControllingVariants) {
        const context = visualElement.parent
            ? getVariantContext(visualElement.parent) || {}
            : {};
        if (visualElement.props.initial !== undefined) {
            context.initial = visualElement.props.initial;
        }
        return context;
    }
    const context = {};
    for (let i = 0; i < numVariantProps; i++) {
        const name = _variant_props_mjs__WEBPACK_IMPORTED_MODULE_0__.variantProps[i];
        const prop = visualElement.props[name];
        if ((0,_is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_1__.isVariantLabel)(prop) || prop === false) {
            context[name] = prop;
        }
    }
    return context;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs":
/*!*************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/is-controlling-variants.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isControllingVariants: () => (/* binding */ isControllingVariants),
/* harmony export */   isVariantNode: () => (/* binding */ isVariantNode)
/* harmony export */ });
/* harmony import */ var _animation_utils_is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../animation/utils/is-animation-controls.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/is-animation-controls.mjs");
/* harmony import */ var _is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is-variant-label.mjs */ "./node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs");
/* harmony import */ var _variant_props_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./variant-props.mjs */ "./node_modules/framer-motion/dist/es/render/utils/variant-props.mjs");




function isControllingVariants(props) {
    return ((0,_animation_utils_is_animation_controls_mjs__WEBPACK_IMPORTED_MODULE_0__.isAnimationControls)(props.animate) ||
        _variant_props_mjs__WEBPACK_IMPORTED_MODULE_1__.variantProps.some((name) => (0,_is_variant_label_mjs__WEBPACK_IMPORTED_MODULE_2__.isVariantLabel)(props[name])));
}
function isVariantNode(props) {
    return Boolean(isControllingVariants(props) || props.variants);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/is-variant-label.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isVariantLabel: () => (/* binding */ isVariantLabel)
/* harmony export */ });
/**
 * Decides if the supplied variable is variant label
 */
function isVariantLabel(v) {
    return typeof v === "string" || Array.isArray(v);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/motion-values.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/motion-values.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateMotionValuesFromProps: () => (/* binding */ updateMotionValuesFromProps)
/* harmony export */ });
/* harmony import */ var _utils_warn_once_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/warn-once.mjs */ "./node_modules/framer-motion/dist/es/utils/warn-once.mjs");
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../value/index.mjs */ "./node_modules/framer-motion/dist/es/value/index.mjs");
/* harmony import */ var _value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/utils/is-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs");




function updateMotionValuesFromProps(element, next, prev) {
    for (const key in next) {
        const nextValue = next[key];
        const prevValue = prev[key];
        if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(nextValue)) {
            /**
             * If this is a motion value found in props or style, we want to add it
             * to our visual element's motion value map.
             */
            element.addValue(key, nextValue);
            /**
             * Check the version of the incoming motion value with this version
             * and warn against mismatches.
             */
            if (true) {
                (0,_utils_warn_once_mjs__WEBPACK_IMPORTED_MODULE_1__.warnOnce)(nextValue.version === "12.4.7", `Attempting to mix Motion versions ${nextValue.version} with 12.4.7 may not work as expected.`);
            }
        }
        else if ((0,_value_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(prevValue)) {
            /**
             * If we're swapping from a motion value to a static value,
             * create a new motion value from that
             */
            element.addValue(key, (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_2__.motionValue)(nextValue, { owner: element }));
        }
        else if (prevValue !== nextValue) {
            /**
             * If this is a flat value that has changed, update the motion value
             * or create one if it doesn't exist. We only want to do this if we're
             * not handling the value with our animation state.
             */
            if (element.hasValue(key)) {
                const existingValue = element.getValue(key);
                if (existingValue.liveStyle === true) {
                    existingValue.jump(nextValue);
                }
                else if (!existingValue.hasAnimated) {
                    existingValue.set(nextValue);
                }
            }
            else {
                const latestValue = element.getStaticValue(key);
                element.addValue(key, (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_2__.motionValue)(latestValue !== undefined ? latestValue : nextValue, { owner: element }));
            }
        }
    }
    // Handle removed values
    for (const key in prev) {
        if (next[key] === undefined)
            element.removeValue(key);
    }
    return next;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveVariant: () => (/* binding */ resolveVariant)
/* harmony export */ });
/* harmony import */ var _resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resolve-variants.mjs */ "./node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs");


function resolveVariant(visualElement, definition, custom) {
    const props = visualElement.getProps();
    return (0,_resolve_variants_mjs__WEBPACK_IMPORTED_MODULE_0__.resolveVariantFromProps)(props, definition, custom !== undefined ? custom : props.custom, visualElement);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/resolve-variants.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveVariantFromProps: () => (/* binding */ resolveVariantFromProps)
/* harmony export */ });
function getValueState(visualElement) {
    const state = [{}, {}];
    visualElement === null || visualElement === void 0 ? void 0 : visualElement.values.forEach((value, key) => {
        state[0][key] = value.get();
        state[1][key] = value.getVelocity();
    });
    return state;
}
function resolveVariantFromProps(props, definition, custom, visualElement) {
    /**
     * If the variant definition is a function, resolve.
     */
    if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    /**
     * If the variant definition is a variant label, or
     * the function returned a variant label, resolve.
     */
    if (typeof definition === "string") {
        definition = props.variants && props.variants[definition];
    }
    /**
     * At this point we've resolved both functions and variant labels,
     * but the resolved variant label might itself have been a function.
     * If so, resolve. This can only have returned a valid target object.
     */
    if (typeof definition === "function") {
        const [current, velocity] = getValueState(visualElement);
        definition = definition(custom !== undefined ? custom : props.custom, current, velocity);
    }
    return definition;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/setters.mjs":
/*!*********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/setters.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setTarget: () => (/* binding */ setTarget)
/* harmony export */ });
/* harmony import */ var _utils_resolve_value_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/resolve-value.mjs */ "./node_modules/framer-motion/dist/es/utils/resolve-value.mjs");
/* harmony import */ var _value_index_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../value/index.mjs */ "./node_modules/framer-motion/dist/es/value/index.mjs");
/* harmony import */ var _resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resolve-dynamic-variants.mjs */ "./node_modules/framer-motion/dist/es/render/utils/resolve-dynamic-variants.mjs");




/**
 * Set VisualElement's MotionValue, creating a new MotionValue for it if
 * it doesn't exist.
 */
function setMotionValue(visualElement, key, value) {
    if (visualElement.hasValue(key)) {
        visualElement.getValue(key).set(value);
    }
    else {
        visualElement.addValue(key, (0,_value_index_mjs__WEBPACK_IMPORTED_MODULE_0__.motionValue)(value));
    }
}
function setTarget(visualElement, definition) {
    const resolved = (0,_resolve_dynamic_variants_mjs__WEBPACK_IMPORTED_MODULE_1__.resolveVariant)(visualElement, definition);
    let { transitionEnd = {}, transition = {}, ...target } = resolved || {};
    target = { ...target, ...transitionEnd };
    for (const key in target) {
        const value = (0,_utils_resolve_value_mjs__WEBPACK_IMPORTED_MODULE_2__.resolveFinalValueInKeyframes)(target[key]);
        setMotionValue(visualElement, key, value);
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/render/utils/variant-props.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/render/utils/variant-props.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   variantPriorityOrder: () => (/* binding */ variantPriorityOrder),
/* harmony export */   variantProps: () => (/* binding */ variantProps)
/* harmony export */ });
const variantPriorityOrder = [
    "animate",
    "whileInView",
    "whileFocus",
    "whileHover",
    "whileTap",
    "whileDrag",
    "exit",
];
const variantProps = ["initial", ...variantPriorityOrder];




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/stats/animation-count.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/stats/animation-count.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activeAnimations: () => (/* binding */ activeAnimations)
/* harmony export */ });
const activeAnimations = {
    layout: 0,
    mainThread: 0,
    waapi: 0,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/stats/buffer.mjs":
/*!*************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/stats/buffer.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   statsBuffer: () => (/* binding */ statsBuffer)
/* harmony export */ });
const statsBuffer = {
    value: null,
    addProjectionMetrics: null,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/GlobalConfig.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MotionGlobalConfig: () => (/* binding */ MotionGlobalConfig)
/* harmony export */ });
const MotionGlobalConfig = {
    skipAnimations: false,
    useManualTiming: false,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/array.mjs":
/*!************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/array.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addUniqueItem: () => (/* binding */ addUniqueItem),
/* harmony export */   moveItem: () => (/* binding */ moveItem),
/* harmony export */   removeItem: () => (/* binding */ removeItem)
/* harmony export */ });
function addUniqueItem(arr, item) {
    if (arr.indexOf(item) === -1)
        arr.push(item);
}
function removeItem(arr, item) {
    const index = arr.indexOf(item);
    if (index > -1)
        arr.splice(index, 1);
}
// Adapted from array-move
function moveItem([...arr], fromIndex, toIndex) {
    const startIndex = fromIndex < 0 ? arr.length + fromIndex : fromIndex;
    if (startIndex >= 0 && startIndex < arr.length) {
        const endIndex = toIndex < 0 ? arr.length + toIndex : toIndex;
        const [item] = arr.splice(fromIndex, 1);
        arr.splice(endIndex, 0, item);
    }
    return arr;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/clamp.mjs":
/*!************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/clamp.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clamp: () => (/* binding */ clamp)
/* harmony export */ });
const clamp = (min, max, v) => {
    if (v > max)
        return max;
    if (v < min)
        return min;
    return v;
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/delay.mjs":
/*!************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/delay.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   delay: () => (/* binding */ delay),
/* harmony export */   delayInSeconds: () => (/* binding */ delayInSeconds)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../frameloop/sync-time.mjs */ "./node_modules/framer-motion/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");




/**
 * Timeout defined in ms
 */
function delay(callback, timeout) {
    const start = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_1__.time.now();
    const checkElapsed = ({ timestamp }) => {
        const elapsed = timestamp - start;
        if (elapsed >= timeout) {
            (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.cancelFrame)(checkElapsed);
            callback(elapsed - timeout);
        }
    };
    _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.frame.read(checkElapsed, true);
    return () => (0,_frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_2__.cancelFrame)(checkElapsed);
}
function delayInSeconds(callback, timeout) {
    return delay(callback, (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.secondsToMilliseconds)(timeout));
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/distance.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/distance.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   distance: () => (/* binding */ distance),
/* harmony export */   distance2D: () => (/* binding */ distance2D)
/* harmony export */ });
const distance = (a, b) => Math.abs(a - b);
function distance2D(a, b) {
    // Multi-dimensional
    const xDelta = distance(a.x, b.x);
    const yDelta = distance(a.y, b.y);
    return Math.sqrt(xDelta ** 2 + yDelta ** 2);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/hsla-to-rgba.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/hsla-to-rgba.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hslaToRgba: () => (/* binding */ hslaToRgba)
/* harmony export */ });
// Adapted from https://gist.github.com/mjackson/5311256
function hueToRgb(p, q, t) {
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslaToRgba({ hue, saturation, lightness, alpha }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
        red = green = blue = lightness;
    }
    else {
        const q = lightness < 0.5
            ? lightness * (1 + saturation)
            : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        red = hueToRgb(p, q, hue + 1 / 3);
        green = hueToRgb(p, q, hue);
        blue = hueToRgb(p, q, hue - 1 / 3);
    }
    return {
        red: Math.round(red * 255),
        green: Math.round(green * 255),
        blue: Math.round(blue * 255),
        alpha,
    };
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/interpolate.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/interpolate.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interpolate: () => (/* binding */ interpolate)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _clamp_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clamp.mjs */ "./node_modules/framer-motion/dist/es/utils/clamp.mjs");
/* harmony import */ var _mix_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mix/index.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/index.mjs");
/* harmony import */ var _pipe_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pipe.mjs */ "./node_modules/framer-motion/dist/es/utils/pipe.mjs");





function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || _mix_index_mjs__WEBPACK_IMPORTED_MODULE_1__.mix;
    const numMixers = output.length - 1;
    for (let i = 0; i < numMixers; i++) {
        let mixer = mixerFactory(output[i], output[i + 1]);
        if (ease) {
            const easingFunction = Array.isArray(ease) ? ease[i] || motion_utils__WEBPACK_IMPORTED_MODULE_0__.noop : ease;
            mixer = (0,_pipe_mjs__WEBPACK_IMPORTED_MODULE_2__.pipe)(easingFunction, mixer);
        }
        mixers.push(mixer);
    }
    return mixers;
}
/**
 * Create a function that maps from a numerical input array to a generic output array.
 *
 * Accepts:
 *   - Numbers
 *   - Colors (hex, hsl, hsla, rgb, rgba)
 *   - Complex (combinations of one or more numbers or strings)
 *
 * ```jsx
 * const mixColor = interpolate([0, 1], ['#fff', '#000'])
 *
 * mixColor(0.5) // 'rgba(128, 128, 128, 1)'
 * ```
 *
 * TODO Revist this approach once we've moved to data models for values,
 * probably not needed to pregenerate mixer functions.
 *
 * @public
 */
function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
    const inputLength = input.length;
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.invariant)(inputLength === output.length, "Both input and output ranges must be the same length");
    /**
     * If we're only provided a single input, we can just make a function
     * that returns the output.
     */
    if (inputLength === 1)
        return () => output[0];
    if (inputLength === 2 && output[0] === output[1])
        return () => output[1];
    const isZeroDeltaRange = input[0] === input[1];
    // If input runs highest -> lowest, reverse both arrays
    if (input[0] > input[inputLength - 1]) {
        input = [...input].reverse();
        output = [...output].reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const numMixers = mixers.length;
    const interpolator = (v) => {
        if (isZeroDeltaRange && v < input[0])
            return output[0];
        let i = 0;
        if (numMixers > 1) {
            for (; i < input.length - 2; i++) {
                if (v < input[i + 1])
                    break;
            }
        }
        const progressInRange = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.progress)(input[i], input[i + 1], v);
        return mixers[i](progressInRange);
    };
    return isClamp
        ? (v) => interpolator((0,_clamp_mjs__WEBPACK_IMPORTED_MODULE_3__.clamp)(input[0], input[inputLength - 1], v))
        : interpolator;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/is-browser.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/is-browser.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBrowser: () => (/* binding */ isBrowser)
/* harmony export */ });
const isBrowser = typeof window !== "undefined";




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/is-numerical-string.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNumericalString: () => (/* binding */ isNumericalString)
/* harmony export */ });
/**
 * Check if value is a numerical string, ie a string that is purely a number eg "100" or "-100.1"
 */
const isNumericalString = (v) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(v);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/is-ref-object.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/is-ref-object.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isRefObject: () => (/* binding */ isRefObject)
/* harmony export */ });
function isRefObject(ref) {
    return (ref &&
        typeof ref === "object" &&
        Object.prototype.hasOwnProperty.call(ref, "current"));
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/is-zero-value-string.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isZeroValueString: () => (/* binding */ isZeroValueString)
/* harmony export */ });
/**
 * Check if the value is a zero value string like "0px" or "0%"
 */
const isZeroValueString = (v) => /^0[^.\s]+$/u.test(v);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/mix/color.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/mix/color.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mixColor: () => (/* binding */ mixColor),
/* harmony export */   mixLinearColor: () => (/* binding */ mixLinearColor)
/* harmony export */ });
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _hsla_to_rgba_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hsla-to-rgba.mjs */ "./node_modules/framer-motion/dist/es/utils/hsla-to-rgba.mjs");
/* harmony import */ var _value_types_color_hex_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../value/types/color/hex.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/hex.mjs");
/* harmony import */ var _value_types_color_rgba_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../value/types/color/rgba.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/rgba.mjs");
/* harmony import */ var _value_types_color_hsla_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../value/types/color/hsla.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/hsla.mjs");
/* harmony import */ var _immediate_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./immediate.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/immediate.mjs");








// Linear color space blending
// Explained https://www.youtube.com/watch?v=LKnqECcg6Gw
// Demonstrated http://codepen.io/osublake/pen/xGVVaN
const mixLinearColor = (from, to, v) => {
    const fromExpo = from * from;
    const expo = v * (to * to - fromExpo) + fromExpo;
    return expo < 0 ? 0 : Math.sqrt(expo);
};
const colorTypes = [_value_types_color_hex_mjs__WEBPACK_IMPORTED_MODULE_1__.hex, _value_types_color_rgba_mjs__WEBPACK_IMPORTED_MODULE_2__.rgba, _value_types_color_hsla_mjs__WEBPACK_IMPORTED_MODULE_3__.hsla];
const getColorType = (v) => colorTypes.find((type) => type.test(v));
function asRGBA(color) {
    const type = getColorType(color);
    (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.warning)(Boolean(type), `'${color}' is not an animatable color. Use the equivalent color code instead.`);
    if (!Boolean(type))
        return false;
    let model = type.parse(color);
    if (type === _value_types_color_hsla_mjs__WEBPACK_IMPORTED_MODULE_3__.hsla) {
        // TODO Remove this cast - needed since Motion's stricter typing
        model = (0,_hsla_to_rgba_mjs__WEBPACK_IMPORTED_MODULE_4__.hslaToRgba)(model);
    }
    return model;
}
const mixColor = (from, to) => {
    const fromRGBA = asRGBA(from);
    const toRGBA = asRGBA(to);
    if (!fromRGBA || !toRGBA) {
        return (0,_immediate_mjs__WEBPACK_IMPORTED_MODULE_5__.mixImmediate)(from, to);
    }
    const blended = { ...fromRGBA };
    return (v) => {
        blended.red = mixLinearColor(fromRGBA.red, toRGBA.red, v);
        blended.green = mixLinearColor(fromRGBA.green, toRGBA.green, v);
        blended.blue = mixLinearColor(fromRGBA.blue, toRGBA.blue, v);
        blended.alpha = (0,_number_mjs__WEBPACK_IMPORTED_MODULE_6__.mixNumber)(fromRGBA.alpha, toRGBA.alpha, v);
        return _value_types_color_rgba_mjs__WEBPACK_IMPORTED_MODULE_2__.rgba.transform(blended);
    };
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/mix/complex.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/mix/complex.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMixer: () => (/* binding */ getMixer),
/* harmony export */   mixArray: () => (/* binding */ mixArray),
/* harmony export */   mixComplex: () => (/* binding */ mixComplex),
/* harmony export */   mixObject: () => (/* binding */ mixObject)
/* harmony export */ });
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");
/* harmony import */ var _color_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./color.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/color.mjs");
/* harmony import */ var _pipe_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../pipe.mjs */ "./node_modules/framer-motion/dist/es/utils/pipe.mjs");
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../value/types/color/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/index.mjs");
/* harmony import */ var _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../value/types/complex/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _render_dom_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../render/dom/utils/is-css-variable.mjs */ "./node_modules/framer-motion/dist/es/render/dom/utils/is-css-variable.mjs");
/* harmony import */ var _visibility_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./visibility.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/visibility.mjs");
/* harmony import */ var _immediate_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./immediate.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/immediate.mjs");










function mixNumber(a, b) {
    return (p) => (0,_number_mjs__WEBPACK_IMPORTED_MODULE_1__.mixNumber)(a, b, p);
}
function getMixer(a) {
    if (typeof a === "number") {
        return mixNumber;
    }
    else if (typeof a === "string") {
        return (0,_render_dom_utils_is_css_variable_mjs__WEBPACK_IMPORTED_MODULE_2__.isCSSVariableToken)(a)
            ? _immediate_mjs__WEBPACK_IMPORTED_MODULE_3__.mixImmediate
            : _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_4__.color.test(a)
                ? _color_mjs__WEBPACK_IMPORTED_MODULE_5__.mixColor
                : mixComplex;
    }
    else if (Array.isArray(a)) {
        return mixArray;
    }
    else if (typeof a === "object") {
        return _value_types_color_index_mjs__WEBPACK_IMPORTED_MODULE_4__.color.test(a) ? _color_mjs__WEBPACK_IMPORTED_MODULE_5__.mixColor : mixObject;
    }
    return _immediate_mjs__WEBPACK_IMPORTED_MODULE_3__.mixImmediate;
}
function mixArray(a, b) {
    const output = [...a];
    const numValues = output.length;
    const blendValue = a.map((v, i) => getMixer(v)(v, b[i]));
    return (p) => {
        for (let i = 0; i < numValues; i++) {
            output[i] = blendValue[i](p);
        }
        return output;
    };
}
function mixObject(a, b) {
    const output = { ...a, ...b };
    const blendValue = {};
    for (const key in output) {
        if (a[key] !== undefined && b[key] !== undefined) {
            blendValue[key] = getMixer(a[key])(a[key], b[key]);
        }
    }
    return (v) => {
        for (const key in blendValue) {
            output[key] = blendValue[key](v);
        }
        return output;
    };
}
function matchOrder(origin, target) {
    var _a;
    const orderedOrigin = [];
    const pointers = { color: 0, var: 0, number: 0 };
    for (let i = 0; i < target.values.length; i++) {
        const type = target.types[i];
        const originIndex = origin.indexes[type][pointers[type]];
        const originValue = (_a = origin.values[originIndex]) !== null && _a !== void 0 ? _a : 0;
        orderedOrigin[i] = originValue;
        pointers[type]++;
    }
    return orderedOrigin;
}
const mixComplex = (origin, target) => {
    const template = _value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_6__.complex.createTransformer(target);
    const originStats = (0,_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_6__.analyseComplexValue)(origin);
    const targetStats = (0,_value_types_complex_index_mjs__WEBPACK_IMPORTED_MODULE_6__.analyseComplexValue)(target);
    const canInterpolate = originStats.indexes.var.length === targetStats.indexes.var.length &&
        originStats.indexes.color.length === targetStats.indexes.color.length &&
        originStats.indexes.number.length >= targetStats.indexes.number.length;
    if (canInterpolate) {
        if ((_visibility_mjs__WEBPACK_IMPORTED_MODULE_7__.invisibleValues.has(origin) &&
            !targetStats.values.length) ||
            (_visibility_mjs__WEBPACK_IMPORTED_MODULE_7__.invisibleValues.has(target) &&
                !originStats.values.length)) {
            return (0,_visibility_mjs__WEBPACK_IMPORTED_MODULE_7__.mixVisibility)(origin, target);
        }
        return (0,_pipe_mjs__WEBPACK_IMPORTED_MODULE_8__.pipe)(mixArray(matchOrder(originStats, targetStats), targetStats.values), template);
    }
    else {
        (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.warning)(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
        return (0,_immediate_mjs__WEBPACK_IMPORTED_MODULE_3__.mixImmediate)(origin, target);
    }
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/mix/immediate.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/mix/immediate.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mixImmediate: () => (/* binding */ mixImmediate)
/* harmony export */ });
function mixImmediate(a, b) {
    return (p) => (p > 0 ? b : a);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/mix/index.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/mix/index.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mix: () => (/* binding */ mix)
/* harmony export */ });
/* harmony import */ var _complex_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./complex.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/complex.mjs");
/* harmony import */ var _number_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");



function mix(from, to, p) {
    if (typeof from === "number" &&
        typeof to === "number" &&
        typeof p === "number") {
        return (0,_number_mjs__WEBPACK_IMPORTED_MODULE_0__.mixNumber)(from, to, p);
    }
    const mixer = (0,_complex_mjs__WEBPACK_IMPORTED_MODULE_1__.getMixer)(from);
    return mixer(from, to);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/mix/number.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mixNumber: () => (/* binding */ mixNumber)
/* harmony export */ });
/*
  Value in range from progress

  Given a lower limit and an upper limit, we return the value within
  that range as expressed by progress (usually a number from 0 to 1)

  So progress = 0.5 would change

  from -------- to

  to

  from ---- to

  E.g. from = 10, to = 20, progress = 0.5 => 15

  @param [number]: Lower limit of range
  @param [number]: Upper limit of range
  @param [number]: The progress between lower and upper limits expressed 0-1
  @return [number]: Value as calculated from progress within range (not limited within range)
*/
const mixNumber = (from, to, progress) => {
    return from + (to - from) * progress;
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/mix/visibility.mjs":
/*!*********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/mix/visibility.mjs ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   invisibleValues: () => (/* binding */ invisibleValues),
/* harmony export */   mixVisibility: () => (/* binding */ mixVisibility)
/* harmony export */ });
const invisibleValues = new Set(["none", "hidden"]);
/**
 * Returns a function that, when provided a progress value between 0 and 1,
 * will return the "none" or "hidden" string only when the progress is that of
 * the origin or target.
 */
function mixVisibility(origin, target) {
    if (invisibleValues.has(origin)) {
        return (p) => (p <= 0 ? origin : target);
    }
    else {
        return (p) => (p >= 1 ? target : origin);
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/offsets/default.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/offsets/default.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultOffset: () => (/* binding */ defaultOffset)
/* harmony export */ });
/* harmony import */ var _fill_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fill.mjs */ "./node_modules/framer-motion/dist/es/utils/offsets/fill.mjs");


function defaultOffset(arr) {
    const offset = [0];
    (0,_fill_mjs__WEBPACK_IMPORTED_MODULE_0__.fillOffset)(offset, arr.length - 1);
    return offset;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/offsets/fill.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/offsets/fill.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fillOffset: () => (/* binding */ fillOffset)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../mix/number.mjs */ "./node_modules/framer-motion/dist/es/utils/mix/number.mjs");



function fillOffset(offset, remaining) {
    const min = offset[offset.length - 1];
    for (let i = 1; i <= remaining; i++) {
        const offsetProgress = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.progress)(0, remaining, i);
        offset.push((0,_mix_number_mjs__WEBPACK_IMPORTED_MODULE_1__.mixNumber)(min, 1, offsetProgress));
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/offsets/time.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/offsets/time.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertOffsetToTimes: () => (/* binding */ convertOffsetToTimes)
/* harmony export */ });
function convertOffsetToTimes(offset, duration) {
    return offset.map((o) => o * duration);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/pipe.mjs":
/*!***********************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/pipe.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pipe: () => (/* binding */ pipe)
/* harmony export */ });
/**
 * Pipe
 * Compose other transformers to run linearily
 * pipe(min(20), max(40))
 * @param  {...functions} transformers
 * @return {function}
 */
const combineFunctions = (a, b) => (v) => b(a(v));
const pipe = (...transformers) => transformers.reduce(combineFunctions);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/reduced-motion/index.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initPrefersReducedMotion: () => (/* binding */ initPrefersReducedMotion)
/* harmony export */ });
/* harmony import */ var _is_browser_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../is-browser.mjs */ "./node_modules/framer-motion/dist/es/utils/is-browser.mjs");
/* harmony import */ var _state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.mjs */ "./node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs");



function initPrefersReducedMotion() {
    _state_mjs__WEBPACK_IMPORTED_MODULE_0__.hasReducedMotionListener.current = true;
    if (!_is_browser_mjs__WEBPACK_IMPORTED_MODULE_1__.isBrowser)
        return;
    if (window.matchMedia) {
        const motionMediaQuery = window.matchMedia("(prefers-reduced-motion)");
        const setReducedMotionPreferences = () => (_state_mjs__WEBPACK_IMPORTED_MODULE_0__.prefersReducedMotion.current = motionMediaQuery.matches);
        motionMediaQuery.addListener(setReducedMotionPreferences);
        setReducedMotionPreferences();
    }
    else {
        _state_mjs__WEBPACK_IMPORTED_MODULE_0__.prefersReducedMotion.current = false;
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/reduced-motion/state.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasReducedMotionListener: () => (/* binding */ hasReducedMotionListener),
/* harmony export */   prefersReducedMotion: () => (/* binding */ prefersReducedMotion)
/* harmony export */ });
// Does this device prefer reduced motion? Returns `null` server-side.
const prefersReducedMotion = { current: null };
const hasReducedMotionListener = { current: false };




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/resolve-value.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/resolve-value.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isCustomValue: () => (/* binding */ isCustomValue),
/* harmony export */   resolveFinalValueInKeyframes: () => (/* binding */ resolveFinalValueInKeyframes)
/* harmony export */ });
/* harmony import */ var _animation_utils_is_keyframes_target_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../animation/utils/is-keyframes-target.mjs */ "./node_modules/framer-motion/dist/es/animation/utils/is-keyframes-target.mjs");


const isCustomValue = (v) => {
    return Boolean(v && typeof v === "object" && v.mix && v.toValue);
};
const resolveFinalValueInKeyframes = (v) => {
    // TODO maybe throw if v.length - 1 is placeholder token?
    return (0,_animation_utils_is_keyframes_target_mjs__WEBPACK_IMPORTED_MODULE_0__.isKeyframesTarget)(v) ? v[v.length - 1] || 0 : v;
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/shallow-compare.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/shallow-compare.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   shallowCompare: () => (/* binding */ shallowCompare)
/* harmony export */ });
function shallowCompare(next, prev) {
    if (!Array.isArray(prev))
        return false;
    const prevLength = prev.length;
    if (prevLength !== next.length)
        return false;
    for (let i = 0; i < prevLength; i++) {
        if (prev[i] !== next[i])
            return false;
    }
    return true;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/subscription-manager.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/subscription-manager.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubscriptionManager: () => (/* binding */ SubscriptionManager)
/* harmony export */ });
/* harmony import */ var _array_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array.mjs */ "./node_modules/framer-motion/dist/es/utils/array.mjs");


class SubscriptionManager {
    constructor() {
        this.subscriptions = [];
    }
    add(handler) {
        (0,_array_mjs__WEBPACK_IMPORTED_MODULE_0__.addUniqueItem)(this.subscriptions, handler);
        return () => (0,_array_mjs__WEBPACK_IMPORTED_MODULE_0__.removeItem)(this.subscriptions, handler);
    }
    notify(a, b, c) {
        const numSubscriptions = this.subscriptions.length;
        if (!numSubscriptions)
            return;
        if (numSubscriptions === 1) {
            /**
             * If there's only a single handler we can just call it without invoking a loop.
             */
            this.subscriptions[0](a, b, c);
        }
        else {
            for (let i = 0; i < numSubscriptions; i++) {
                /**
                 * Check whether the handler exists before firing as it's possible
                 * the subscriptions were modified during this loop running.
                 */
                const handler = this.subscriptions[i];
                handler && handler(a, b, c);
            }
        }
    }
    getSize() {
        return this.subscriptions.length;
    }
    clear() {
        this.subscriptions.length = 0;
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/use-constant.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/use-constant.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useConstant: () => (/* binding */ useConstant)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */
function useConstant(init) {
    const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    if (ref.current === null) {
        ref.current = init();
    }
    return ref.current;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/use-instant-transition-state.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   instantAnimationState: () => (/* binding */ instantAnimationState)
/* harmony export */ });
const instantAnimationState = {
    current: false,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/use-isomorphic-effect.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useIsomorphicLayoutEffect: () => (/* binding */ useIsomorphicLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _is_browser_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./is-browser.mjs */ "./node_modules/framer-motion/dist/es/utils/is-browser.mjs");



const useIsomorphicLayoutEffect = _is_browser_mjs__WEBPACK_IMPORTED_MODULE_1__.isBrowser ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   velocityPerSecond: () => (/* binding */ velocityPerSecond)
/* harmony export */ });
/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/
function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1000 / frameDuration) : 0;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/utils/warn-once.mjs":
/*!****************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/utils/warn-once.mjs ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   warnOnce: () => (/* binding */ warnOnce)
/* harmony export */ });
const warned = new Set();
function warnOnce(condition, message, element) {
    if (condition || warned.has(message))
        return;
    console.warn(message);
    if (element)
        console.warn(element);
    warned.add(message);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/index.mjs":
/*!************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/index.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MotionValue: () => (/* binding */ MotionValue),
/* harmony export */   collectMotionValues: () => (/* binding */ collectMotionValues),
/* harmony export */   motionValue: () => (/* binding */ motionValue)
/* harmony export */ });
/* harmony import */ var _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../frameloop/sync-time.mjs */ "./node_modules/framer-motion/dist/es/frameloop/sync-time.mjs");
/* harmony import */ var _utils_subscription_manager_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/subscription-manager.mjs */ "./node_modules/framer-motion/dist/es/utils/subscription-manager.mjs");
/* harmony import */ var _utils_velocity_per_second_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/velocity-per-second.mjs */ "./node_modules/framer-motion/dist/es/utils/velocity-per-second.mjs");
/* harmony import */ var _utils_warn_once_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/warn-once.mjs */ "./node_modules/framer-motion/dist/es/utils/warn-once.mjs");
/* harmony import */ var _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../frameloop/frame.mjs */ "./node_modules/framer-motion/dist/es/frameloop/frame.mjs");






/**
 * Maximum time between the value of two frames, beyond which we
 * assume the velocity has since been 0.
 */
const MAX_VELOCITY_DELTA = 30;
const isFloat = (value) => {
    return !isNaN(parseFloat(value));
};
const collectMotionValues = {
    current: undefined,
};
/**
 * `MotionValue` is used to track the state and velocity of motion values.
 *
 * @public
 */
class MotionValue {
    /**
     * @param init - The initiating value
     * @param config - Optional configuration options
     *
     * -  `transformer`: A function to transform incoming values with.
     *
     * @internal
     */
    constructor(init, options = {}) {
        /**
         * This will be replaced by the build step with the latest version number.
         * When MotionValues are provided to motion components, warn if versions are mixed.
         */
        this.version = "12.4.7";
        /**
         * Tracks whether this value can output a velocity. Currently this is only true
         * if the value is numerical, but we might be able to widen the scope here and support
         * other value types.
         *
         * @internal
         */
        this.canTrackVelocity = null;
        /**
         * An object containing a SubscriptionManager for each active event.
         */
        this.events = {};
        this.updateAndNotify = (v, render = true) => {
            const currentTime = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__.time.now();
            /**
             * If we're updating the value during another frame or eventloop
             * than the previous frame, then the we set the previous frame value
             * to current.
             */
            if (this.updatedAt !== currentTime) {
                this.setPrevFrameValue();
            }
            this.prev = this.current;
            this.setCurrent(v);
            // Update update subscribers
            if (this.current !== this.prev && this.events.change) {
                this.events.change.notify(this.current);
            }
            // Update render subscribers
            if (render && this.events.renderRequest) {
                this.events.renderRequest.notify(this.current);
            }
        };
        this.hasAnimated = false;
        this.setCurrent(init);
        this.owner = options.owner;
    }
    setCurrent(current) {
        this.current = current;
        this.updatedAt = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__.time.now();
        if (this.canTrackVelocity === null && current !== undefined) {
            this.canTrackVelocity = isFloat(this.current);
        }
    }
    setPrevFrameValue(prevFrameValue = this.current) {
        this.prevFrameValue = prevFrameValue;
        this.prevUpdatedAt = this.updatedAt;
    }
    /**
     * Adds a function that will be notified when the `MotionValue` is updated.
     *
     * It returns a function that, when called, will cancel the subscription.
     *
     * When calling `onChange` inside a React component, it should be wrapped with the
     * `useEffect` hook. As it returns an unsubscribe function, this should be returned
     * from the `useEffect` function to ensure you don't add duplicate subscribers..
     *
     * ```jsx
     * export const MyComponent = () => {
     *   const x = useMotionValue(0)
     *   const y = useMotionValue(0)
     *   const opacity = useMotionValue(1)
     *
     *   useEffect(() => {
     *     function updateOpacity() {
     *       const maxXY = Math.max(x.get(), y.get())
     *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
     *       opacity.set(newOpacity)
     *     }
     *
     *     const unsubscribeX = x.on("change", updateOpacity)
     *     const unsubscribeY = y.on("change", updateOpacity)
     *
     *     return () => {
     *       unsubscribeX()
     *       unsubscribeY()
     *     }
     *   }, [])
     *
     *   return <motion.div style={{ x }} />
     * }
     * ```
     *
     * @param subscriber - A function that receives the latest value.
     * @returns A function that, when called, will cancel this subscription.
     *
     * @deprecated
     */
    onChange(subscription) {
        if (true) {
            (0,_utils_warn_once_mjs__WEBPACK_IMPORTED_MODULE_1__.warnOnce)(false, `value.onChange(callback) is deprecated. Switch to value.on("change", callback).`);
        }
        return this.on("change", subscription);
    }
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new _utils_subscription_manager_mjs__WEBPACK_IMPORTED_MODULE_2__.SubscriptionManager();
        }
        const unsubscribe = this.events[eventName].add(callback);
        if (eventName === "change") {
            return () => {
                unsubscribe();
                /**
                 * If we have no more change listeners by the start
                 * of the next frame, stop active animations.
                 */
                _frameloop_frame_mjs__WEBPACK_IMPORTED_MODULE_3__.frame.read(() => {
                    if (!this.events.change.getSize()) {
                        this.stop();
                    }
                });
            };
        }
        return unsubscribe;
    }
    clearListeners() {
        for (const eventManagers in this.events) {
            this.events[eventManagers].clear();
        }
    }
    /**
     * Attaches a passive effect to the `MotionValue`.
     *
     * @internal
     */
    attach(passiveEffect, stopPassiveEffect) {
        this.passiveEffect = passiveEffect;
        this.stopPassiveEffect = stopPassiveEffect;
    }
    /**
     * Sets the state of the `MotionValue`.
     *
     * @remarks
     *
     * ```jsx
     * const x = useMotionValue(0)
     * x.set(10)
     * ```
     *
     * @param latest - Latest value to set.
     * @param render - Whether to notify render subscribers. Defaults to `true`
     *
     * @public
     */
    set(v, render = true) {
        if (!render || !this.passiveEffect) {
            this.updateAndNotify(v, render);
        }
        else {
            this.passiveEffect(v, this.updateAndNotify);
        }
    }
    setWithVelocity(prev, current, delta) {
        this.set(current);
        this.prev = undefined;
        this.prevFrameValue = prev;
        this.prevUpdatedAt = this.updatedAt - delta;
    }
    /**
     * Set the state of the `MotionValue`, stopping any active animations,
     * effects, and resets velocity to `0`.
     */
    jump(v, endAnimation = true) {
        this.updateAndNotify(v);
        this.prev = v;
        this.prevUpdatedAt = this.prevFrameValue = undefined;
        endAnimation && this.stop();
        if (this.stopPassiveEffect)
            this.stopPassiveEffect();
    }
    /**
     * Returns the latest state of `MotionValue`
     *
     * @returns - The latest state of `MotionValue`
     *
     * @public
     */
    get() {
        if (collectMotionValues.current) {
            collectMotionValues.current.push(this);
        }
        return this.current;
    }
    /**
     * @public
     */
    getPrevious() {
        return this.prev;
    }
    /**
     * Returns the latest velocity of `MotionValue`
     *
     * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
     *
     * @public
     */
    getVelocity() {
        const currentTime = _frameloop_sync_time_mjs__WEBPACK_IMPORTED_MODULE_0__.time.now();
        if (!this.canTrackVelocity ||
            this.prevFrameValue === undefined ||
            currentTime - this.updatedAt > MAX_VELOCITY_DELTA) {
            return 0;
        }
        const delta = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
        // Casts because of parseFloat's poor typing
        return (0,_utils_velocity_per_second_mjs__WEBPACK_IMPORTED_MODULE_4__.velocityPerSecond)(parseFloat(this.current) -
            parseFloat(this.prevFrameValue), delta);
    }
    /**
     * Registers a new animation to control this `MotionValue`. Only one
     * animation can drive a `MotionValue` at one time.
     *
     * ```jsx
     * value.start()
     * ```
     *
     * @param animation - A function that starts the provided animation
     *
     * @internal
     */
    start(startAnimation) {
        this.stop();
        return new Promise((resolve) => {
            this.hasAnimated = true;
            this.animation = startAnimation(resolve);
            if (this.events.animationStart) {
                this.events.animationStart.notify();
            }
        }).then(() => {
            if (this.events.animationComplete) {
                this.events.animationComplete.notify();
            }
            this.clearAnimation();
        });
    }
    /**
     * Stop the currently active animation.
     *
     * @public
     */
    stop() {
        if (this.animation) {
            this.animation.stop();
            if (this.events.animationCancel) {
                this.events.animationCancel.notify();
            }
        }
        this.clearAnimation();
    }
    /**
     * Returns `true` if this value is currently animating.
     *
     * @public
     */
    isAnimating() {
        return !!this.animation;
    }
    clearAnimation() {
        delete this.animation;
    }
    /**
     * Destroy and clean up subscribers to this `MotionValue`.
     *
     * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
     * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
     * created a `MotionValue` via the `motionValue` function.
     *
     * @public
     */
    destroy() {
        this.clearListeners();
        this.stop();
        if (this.stopPassiveEffect) {
            this.stopPassiveEffect();
        }
    }
}
function motionValue(init, options) {
    return new MotionValue(init, options);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/color/hex.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/color/hex.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hex: () => (/* binding */ hex)
/* harmony export */ });
/* harmony import */ var _rgba_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rgba.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/rgba.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/utils.mjs");



function parseHex(v) {
    let r = "";
    let g = "";
    let b = "";
    let a = "";
    // If we have 6 characters, ie #FF0000
    if (v.length > 5) {
        r = v.substring(1, 3);
        g = v.substring(3, 5);
        b = v.substring(5, 7);
        a = v.substring(7, 9);
        // Or we have 3 characters, ie #F00
    }
    else {
        r = v.substring(1, 2);
        g = v.substring(2, 3);
        b = v.substring(3, 4);
        a = v.substring(4, 5);
        r += r;
        g += g;
        b += b;
        a += a;
    }
    return {
        red: parseInt(r, 16),
        green: parseInt(g, 16),
        blue: parseInt(b, 16),
        alpha: a ? parseInt(a, 16) / 255 : 1,
    };
}
const hex = {
    test: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isColorString)("#"),
    parse: parseHex,
    transform: _rgba_mjs__WEBPACK_IMPORTED_MODULE_1__.rgba.transform,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/color/hsla.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/color/hsla.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hsla: () => (/* binding */ hsla)
/* harmony export */ });
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../numbers/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../numbers/units.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs");
/* harmony import */ var _utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/sanitize.mjs */ "./node_modules/framer-motion/dist/es/value/types/utils/sanitize.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/utils.mjs");





const hsla = {
    test: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.isColorString)("hsl", "hue"),
    parse: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_0__.splitColor)("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
        return ("hsla(" +
            Math.round(hue) +
            ", " +
            _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.percent.transform((0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__.sanitize)(saturation)) +
            ", " +
            _numbers_units_mjs__WEBPACK_IMPORTED_MODULE_1__.percent.transform((0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__.sanitize)(lightness)) +
            ", " +
            (0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_2__.sanitize)(_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_3__.alpha.transform(alpha$1)) +
            ")");
    },
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/color/index.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/color/index.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   color: () => (/* binding */ color)
/* harmony export */ });
/* harmony import */ var _hex_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hex.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/hex.mjs");
/* harmony import */ var _hsla_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hsla.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/hsla.mjs");
/* harmony import */ var _rgba_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rgba.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/rgba.mjs");




const color = {
    test: (v) => _rgba_mjs__WEBPACK_IMPORTED_MODULE_0__.rgba.test(v) || _hex_mjs__WEBPACK_IMPORTED_MODULE_1__.hex.test(v) || _hsla_mjs__WEBPACK_IMPORTED_MODULE_2__.hsla.test(v),
    parse: (v) => {
        if (_rgba_mjs__WEBPACK_IMPORTED_MODULE_0__.rgba.test(v)) {
            return _rgba_mjs__WEBPACK_IMPORTED_MODULE_0__.rgba.parse(v);
        }
        else if (_hsla_mjs__WEBPACK_IMPORTED_MODULE_2__.hsla.test(v)) {
            return _hsla_mjs__WEBPACK_IMPORTED_MODULE_2__.hsla.parse(v);
        }
        else {
            return _hex_mjs__WEBPACK_IMPORTED_MODULE_1__.hex.parse(v);
        }
    },
    transform: (v) => {
        return typeof v === "string"
            ? v
            : v.hasOwnProperty("red")
                ? _rgba_mjs__WEBPACK_IMPORTED_MODULE_0__.rgba.transform(v)
                : _hsla_mjs__WEBPACK_IMPORTED_MODULE_2__.hsla.transform(v);
    },
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/color/rgba.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/color/rgba.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rgbUnit: () => (/* binding */ rgbUnit),
/* harmony export */   rgba: () => (/* binding */ rgba)
/* harmony export */ });
/* harmony import */ var _utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/clamp.mjs */ "./node_modules/framer-motion/dist/es/utils/clamp.mjs");
/* harmony import */ var _numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../numbers/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/numbers/index.mjs");
/* harmony import */ var _utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/sanitize.mjs */ "./node_modules/framer-motion/dist/es/value/types/utils/sanitize.mjs");
/* harmony import */ var _utils_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/utils.mjs");





const clampRgbUnit = (v) => (0,_utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_0__.clamp)(0, 255, v);
const rgbUnit = {
    ..._numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.number,
    transform: (v) => Math.round(clampRgbUnit(v)),
};
const rgba = {
    test: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.isColorString)("rgb", "red"),
    parse: /*@__PURE__*/ (0,_utils_mjs__WEBPACK_IMPORTED_MODULE_2__.splitColor)("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" +
        rgbUnit.transform(red) +
        ", " +
        rgbUnit.transform(green) +
        ", " +
        rgbUnit.transform(blue) +
        ", " +
        (0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_3__.sanitize)(_numbers_index_mjs__WEBPACK_IMPORTED_MODULE_1__.alpha.transform(alpha$1)) +
        ")",
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/color/utils.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/color/utils.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isColorString: () => (/* binding */ isColorString),
/* harmony export */   splitColor: () => (/* binding */ splitColor)
/* harmony export */ });
/* harmony import */ var _utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/float-regex.mjs */ "./node_modules/framer-motion/dist/es/value/types/utils/float-regex.mjs");
/* harmony import */ var _utils_is_nullish_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/is-nullish.mjs */ "./node_modules/framer-motion/dist/es/value/types/utils/is-nullish.mjs");
/* harmony import */ var _utils_single_color_regex_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/single-color-regex.mjs */ "./node_modules/framer-motion/dist/es/value/types/utils/single-color-regex.mjs");




/**
 * Returns true if the provided string is a color, ie rgba(0,0,0,0) or #000,
 * but false if a number or multiple colors
 */
const isColorString = (type, testProp) => (v) => {
    return Boolean((typeof v === "string" &&
        _utils_single_color_regex_mjs__WEBPACK_IMPORTED_MODULE_0__.singleColorRegex.test(v) &&
        v.startsWith(type)) ||
        (testProp &&
            !(0,_utils_is_nullish_mjs__WEBPACK_IMPORTED_MODULE_1__.isNullish)(v) &&
            Object.prototype.hasOwnProperty.call(v, testProp)));
};
const splitColor = (aName, bName, cName) => (v) => {
    if (typeof v !== "string")
        return v;
    const [a, b, c, alpha] = v.match(_utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_2__.floatRegex);
    return {
        [aName]: parseFloat(a),
        [bName]: parseFloat(b),
        [cName]: parseFloat(c),
        alpha: alpha !== undefined ? parseFloat(alpha) : 1,
    };
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/complex/filter.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/complex/filter.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filter: () => (/* binding */ filter)
/* harmony export */ });
/* harmony import */ var _index_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.mjs */ "./node_modules/framer-motion/dist/es/value/types/complex/index.mjs");
/* harmony import */ var _utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/float-regex.mjs */ "./node_modules/framer-motion/dist/es/value/types/utils/float-regex.mjs");



/**
 * Properties that should default to 1 or 100%
 */
const maxDefaults = new Set(["brightness", "contrast", "saturate", "opacity"]);
function applyDefaultFilter(v) {
    const [name, value] = v.slice(0, -1).split("(");
    if (name === "drop-shadow")
        return v;
    const [number] = value.match(_utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_0__.floatRegex) || [];
    if (!number)
        return v;
    const unit = value.replace(number, "");
    let defaultValue = maxDefaults.has(name) ? 1 : 0;
    if (number !== value)
        defaultValue *= 100;
    return name + "(" + defaultValue + unit + ")";
}
const functionRegex = /\b([a-z-]*)\(.*?\)/gu;
const filter = {
    ..._index_mjs__WEBPACK_IMPORTED_MODULE_1__.complex,
    getAnimatableNone: (v) => {
        const functions = v.match(functionRegex);
        return functions ? functions.map(applyDefaultFilter).join(" ") : v;
    },
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/complex/index.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/complex/index.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   analyseComplexValue: () => (/* binding */ analyseComplexValue),
/* harmony export */   complex: () => (/* binding */ complex)
/* harmony export */ });
/* harmony import */ var _color_index_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../color/index.mjs */ "./node_modules/framer-motion/dist/es/value/types/color/index.mjs");
/* harmony import */ var _utils_color_regex_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/color-regex.mjs */ "./node_modules/framer-motion/dist/es/value/types/utils/color-regex.mjs");
/* harmony import */ var _utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/float-regex.mjs */ "./node_modules/framer-motion/dist/es/value/types/utils/float-regex.mjs");
/* harmony import */ var _utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/sanitize.mjs */ "./node_modules/framer-motion/dist/es/value/types/utils/sanitize.mjs");





function test(v) {
    var _a, _b;
    return (isNaN(v) &&
        typeof v === "string" &&
        (((_a = v.match(_utils_float_regex_mjs__WEBPACK_IMPORTED_MODULE_0__.floatRegex)) === null || _a === void 0 ? void 0 : _a.length) || 0) +
            (((_b = v.match(_utils_color_regex_mjs__WEBPACK_IMPORTED_MODULE_1__.colorRegex)) === null || _b === void 0 ? void 0 : _b.length) || 0) >
            0);
}
const NUMBER_TOKEN = "number";
const COLOR_TOKEN = "color";
const VAR_TOKEN = "var";
const VAR_FUNCTION_TOKEN = "var(";
const SPLIT_TOKEN = "${}";
// this regex consists of the `singleCssVariableRegex|rgbHSLValueRegex|digitRegex`
const complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(value) {
    const originalValue = value.toString();
    const values = [];
    const indexes = {
        color: [],
        number: [],
        var: [],
    };
    const types = [];
    let i = 0;
    const tokenised = originalValue.replace(complexRegex, (parsedValue) => {
        if (_color_index_mjs__WEBPACK_IMPORTED_MODULE_2__.color.test(parsedValue)) {
            indexes.color.push(i);
            types.push(COLOR_TOKEN);
            values.push(_color_index_mjs__WEBPACK_IMPORTED_MODULE_2__.color.parse(parsedValue));
        }
        else if (parsedValue.startsWith(VAR_FUNCTION_TOKEN)) {
            indexes.var.push(i);
            types.push(VAR_TOKEN);
            values.push(parsedValue);
        }
        else {
            indexes.number.push(i);
            types.push(NUMBER_TOKEN);
            values.push(parseFloat(parsedValue));
        }
        ++i;
        return SPLIT_TOKEN;
    });
    const split = tokenised.split(SPLIT_TOKEN);
    return { values, split, indexes, types };
}
function parseComplexValue(v) {
    return analyseComplexValue(v).values;
}
function createTransformer(source) {
    const { split, types } = analyseComplexValue(source);
    const numSections = split.length;
    return (v) => {
        let output = "";
        for (let i = 0; i < numSections; i++) {
            output += split[i];
            if (v[i] !== undefined) {
                const type = types[i];
                if (type === NUMBER_TOKEN) {
                    output += (0,_utils_sanitize_mjs__WEBPACK_IMPORTED_MODULE_3__.sanitize)(v[i]);
                }
                else if (type === COLOR_TOKEN) {
                    output += _color_index_mjs__WEBPACK_IMPORTED_MODULE_2__.color.transform(v[i]);
                }
                else {
                    output += v[i];
                }
            }
        }
        return output;
    };
}
const convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
function getAnimatableNone(v) {
    const parsed = parseComplexValue(v);
    const transformer = createTransformer(v);
    return transformer(parsed.map(convertNumbersToZero));
}
const complex = {
    test,
    parse: parseComplexValue,
    createTransformer,
    getAnimatableNone,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/numbers/index.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/numbers/index.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   alpha: () => (/* binding */ alpha),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   scale: () => (/* binding */ scale)
/* harmony export */ });
/* harmony import */ var _utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/clamp.mjs */ "./node_modules/framer-motion/dist/es/utils/clamp.mjs");


const number = {
    test: (v) => typeof v === "number",
    parse: parseFloat,
    transform: (v) => v,
};
const alpha = {
    ...number,
    transform: (v) => (0,_utils_clamp_mjs__WEBPACK_IMPORTED_MODULE_0__.clamp)(0, 1, v),
};
const scale = {
    ...number,
    default: 1,
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/numbers/units.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   degrees: () => (/* binding */ degrees),
/* harmony export */   percent: () => (/* binding */ percent),
/* harmony export */   progressPercentage: () => (/* binding */ progressPercentage),
/* harmony export */   px: () => (/* binding */ px),
/* harmony export */   vh: () => (/* binding */ vh),
/* harmony export */   vw: () => (/* binding */ vw)
/* harmony export */ });
const createUnitType = (unit) => ({
    test: (v) => typeof v === "string" && v.endsWith(unit) && v.split(" ").length === 1,
    parse: parseFloat,
    transform: (v) => `${v}${unit}`,
});
const degrees = /*@__PURE__*/ createUnitType("deg");
const percent = /*@__PURE__*/ createUnitType("%");
const px = /*@__PURE__*/ createUnitType("px");
const vh = /*@__PURE__*/ createUnitType("vh");
const vw = /*@__PURE__*/ createUnitType("vw");
const progressPercentage = {
    ...percent,
    parse: (v) => percent.parse(v) / 100,
    transform: (v) => percent.transform(v * 100),
};




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/utils/color-regex.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/utils/color-regex.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorRegex: () => (/* binding */ colorRegex)
/* harmony export */ });
const colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/utils/float-regex.mjs":
/*!******************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/utils/float-regex.mjs ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   floatRegex: () => (/* binding */ floatRegex)
/* harmony export */ });
const floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/utils/is-nullish.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/utils/is-nullish.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNullish: () => (/* binding */ isNullish)
/* harmony export */ });
function isNullish(v) {
    return v == null;
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/utils/sanitize.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/utils/sanitize.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sanitize: () => (/* binding */ sanitize)
/* harmony export */ });
// If this number is a decimal, make it just five decimal places
// to avoid exponents
const sanitize = (v) => Math.round(v * 100000) / 100000;




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/types/utils/single-color-regex.mjs":
/*!*************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/types/utils/single-color-regex.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   singleColorRegex: () => (/* binding */ singleColorRegex)
/* harmony export */ });
const singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu;




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/use-will-change/add-will-change.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/use-will-change/add-will-change.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addValueToWillChange: () => (/* binding */ addValueToWillChange)
/* harmony export */ });
/* harmony import */ var _is_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is.mjs */ "./node_modules/framer-motion/dist/es/value/use-will-change/is.mjs");


function addValueToWillChange(visualElement, key) {
    const willChange = visualElement.getValue("willChange");
    /**
     * It could be that a user has set willChange to a regular MotionValue,
     * in which case we can't add the value to it.
     */
    if ((0,_is_mjs__WEBPACK_IMPORTED_MODULE_0__.isWillChangeMotionValue)(willChange)) {
        return willChange.add(key);
    }
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/use-will-change/is.mjs":
/*!*************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/use-will-change/is.mjs ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isWillChangeMotionValue: () => (/* binding */ isWillChangeMotionValue)
/* harmony export */ });
/* harmony import */ var _utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs");


function isWillChangeMotionValue(value) {
    return Boolean((0,_utils_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(value) && value.add);
}




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isMotionValue: () => (/* binding */ isMotionValue)
/* harmony export */ });
const isMotionValue = (value) => Boolean(value && value.getVelocity);




/***/ }),

/***/ "./node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs":
/*!*********************************************************************************!*\
  !*** ./node_modules/framer-motion/dist/es/value/utils/resolve-motion-value.mjs ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveMotionValue: () => (/* binding */ resolveMotionValue)
/* harmony export */ });
/* harmony import */ var _utils_resolve_value_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/resolve-value.mjs */ "./node_modules/framer-motion/dist/es/utils/resolve-value.mjs");
/* harmony import */ var _is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-motion-value.mjs */ "./node_modules/framer-motion/dist/es/value/utils/is-motion-value.mjs");



/**
 * If the provided value is a MotionValue, this returns the actual value, otherwise just the value itself
 *
 * TODO: Remove and move to library
 */
function resolveMotionValue(value) {
    const unwrappedValue = (0,_is_motion_value_mjs__WEBPACK_IMPORTED_MODULE_0__.isMotionValue)(value) ? value.get() : value;
    return (0,_utils_resolve_value_mjs__WEBPACK_IMPORTED_MODULE_1__.isCustomValue)(unwrappedValue)
        ? unwrappedValue.toValue()
        : unwrappedValue;
}




/***/ }),

/***/ "./node_modules/gatsby-core-utils/dist/create-content-digest.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/gatsby-core-utils/dist/create-content-digest.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContentDigest: () => (/* binding */ createContentDigest)
/* harmony export */ });
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var node_object_hash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! node-object-hash */ "./node_modules/node-object-hash/dist/hasher.js");


const hasher = node_object_hash__WEBPACK_IMPORTED_MODULE_1__({
  coerce: false,
  alg: `md5`,
  enc: `hex`,
  sort: {
    map: true,
    object: true,
    array: false,
    set: false
  }
});
const hashPrimitive = input => crypto__WEBPACK_IMPORTED_MODULE_0__.createHash(`md5`).update(input).digest(`hex`);

/**
 * Hashes an input using md5 hash of hexadecimal digest.
 *
 * @param input The input to encrypt
 * @return The content digest
 */

const createContentDigest = input => {
  if (typeof input === `object` && !Buffer.isBuffer(input)) {
    return hasher.hash(input);
  }
  return hashPrimitive(input);
};

/***/ }),

/***/ "./node_modules/gatsby-link/dist/index.modern.mjs":
/*!********************************************************!*\
  !*** ./node_modules/gatsby-link/dist/index.modern.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Link: () => (/* binding */ E),
/* harmony export */   navigate: () => (/* binding */ g),
/* harmony export */   parsePath: () => (/* binding */ a),
/* harmony export */   withAssetPrefix: () => (/* binding */ v),
/* harmony export */   withPrefix: () => (/* binding */ f)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @gatsbyjs/reach-router */ "./node_modules/@gatsbyjs/reach-router/dist/index.modern.mjs");
/* harmony import */ var gatsby_page_utils_apply_trailing_slash_option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby-page-utils/apply-trailing-slash-option */ "./node_modules/gatsby-page-utils/dist/apply-trailing-slash-option.js");
"use client"
;function i(){return i=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},i.apply(this,arguments)}function a(t){let e=t||"/",n="",r="";const o=e.indexOf("#");-1!==o&&(r=e.slice(o),e=e.slice(0,o));const s=e.indexOf("?");return-1!==s&&(n=e.slice(s),e=e.slice(0,s)),{pathname:e,search:"?"===n?"":n,hash:"#"===r?"":r}}const c=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=t=>{if("string"==typeof t)return!(t=>c.test(t))(t)},p=()=> true? true?"":0:0,h=()=> true? true?"":0:0;function f(t,e=p()){var n;if(!l(t))return t;if(t.startsWith("./")||t.startsWith("../"))return t;const r=null!=(n=null!=e?e:h())?n:"/";return`${null!=r&&r.endsWith("/")?r.slice(0,-1):r}${t.startsWith("/")?t:`/${t}`}`}const u=t=>null==t?void 0:t.startsWith("/"),_=()=> true?"always":0;function d(t,e){const{pathname:n,search:r,hash:o}=a(t);return`${(0,gatsby_page_utils_apply_trailing_slash_option__WEBPACK_IMPORTED_MODULE_2__.applyTrailingSlashOption)(n,e)}${r}${o}`}const m=(t,e)=>"number"==typeof t?t:l(t)?u(t)?function(t){const e=f(t),n=_();return"always"===n||"never"===n?d(e,n):e}(t):function(t,e){if(u(t))return t;const r=_(),o=(0,_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.resolve)(t,e);return"always"===r||"never"===r?d(o,r):o}(t,e):t,y=["to","getProps","onClick","onMouseEnter","activeClassName","activeStyle","innerRef","partiallyActive","state","replace","_location"];function v(t){return f(t,h())}const b={activeClassName:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,activeStyle:prop_types__WEBPACK_IMPORTED_MODULE_3__.object,partiallyActive:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool};function w(t){/*#__PURE__*/return react__WEBPACK_IMPORTED_MODULE_0__.createElement(_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.Location,null,({location:n})=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(P,i({},t,{_location:n})))}class P extends react__WEBPACK_IMPORTED_MODULE_0__.Component{constructor(t){super(t),this.defaultGetProps=({isPartiallyCurrent:t,isCurrent:e})=>(this.props.partiallyActive?t:e)?{className:[this.props.className,this.props.activeClassName].filter(Boolean).join(" "),style:i({},this.props.style,this.props.activeStyle)}:null;let e=!1;"undefined"!=typeof window&&window.IntersectionObserver&&(e=!0),this.state={IOSupported:e},this.abortPrefetch=null,this.handleRef=this.handleRef.bind(this)}_prefetch(){let t=window.location.pathname+window.location.search;this.props._location&&this.props._location.pathname&&(t=this.props._location.pathname+this.props._location.search);const e=a(m(this.props.to,t)),n=e.pathname+e.search;if(t!==n)return ___loader.enqueue(n)}componentWillUnmount(){if(!this.io)return;const{instance:t,el:e}=this.io;this.abortPrefetch&&this.abortPrefetch.abort(),t.unobserve(e),t.disconnect()}handleRef(t){this.props.innerRef&&Object.prototype.hasOwnProperty.call(this.props.innerRef,"current")?this.props.innerRef.current=t:this.props.innerRef&&this.props.innerRef(t),this.state.IOSupported&&t&&(this.io=((t,e)=>{const n=new window.IntersectionObserver(n=>{n.forEach(n=>{t===n.target&&e(n.isIntersecting||n.intersectionRatio>0)})});return n.observe(t),{instance:n,el:t}})(t,t=>{t?this.abortPrefetch=this._prefetch():this.abortPrefetch&&this.abortPrefetch.abort()}))}render(){const t=this.props,{to:n,getProps:r=this.defaultGetProps,onClick:s,onMouseEnter:c,state:p,replace:h,_location:f}=t,u=function(t,e){if(null==t)return{};var n,r,o={},s=Object.keys(t);for(r=0;r<s.length;r++)e.indexOf(n=s[r])>=0||(o[n]=t[n]);return o}(t,y); false||l(n)||console.warn(`External link ${n} was detected in a Link component. Use the Link component only for internal links. See: https://gatsby.dev/internal-links`);const _=m(n,f.pathname);return l(_)?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_gatsbyjs_reach_router__WEBPACK_IMPORTED_MODULE_1__.Link,i({to:_,state:p,getProps:r,innerRef:this.handleRef,onMouseEnter:t=>{c&&c(t);const e=a(_);___loader.hovering(e.pathname+e.search)},onClick:t=>{if(s&&s(t),!(0!==t.button||this.props.target||t.defaultPrevented||t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)){t.preventDefault();let e=h;const n=encodeURI(_)===f.pathname;"boolean"!=typeof h&&n&&(e=!0),window.___navigate(_,{state:p,replace:e})}return!0}},u)):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("a",i({href:_},u))}}P.propTypes=i({},b,{onClick:prop_types__WEBPACK_IMPORTED_MODULE_3__.func,to:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,replace:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool,state:prop_types__WEBPACK_IMPORTED_MODULE_3__.object});const E=react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((t,n)=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(w,i({innerRef:n},t))),g=(t,e)=>{window.___navigate(m(t,window.location.pathname),e)};
//# sourceMappingURL=index.modern.mjs.map


/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/controls/BaseGroup.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/controls/BaseGroup.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseGroupPlaybackControls: () => (/* binding */ BaseGroupPlaybackControls)
/* harmony export */ });
/* harmony import */ var _utils_supports_scroll_timeline_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/supports/scroll-timeline.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs");


class BaseGroupPlaybackControls {
    constructor(animations) {
        // Bound to accomodate common `return animation.stop` pattern
        this.stop = () => this.runAll("stop");
        this.animations = animations.filter(Boolean);
    }
    get finished() {
        // Support for new finished Promise and legacy thennable API
        return Promise.all(this.animations.map((animation) => "finished" in animation ? animation.finished : animation));
    }
    /**
     * TODO: Filter out cancelled or stopped animations before returning
     */
    getAll(propName) {
        return this.animations[0][propName];
    }
    setAll(propName, newValue) {
        for (let i = 0; i < this.animations.length; i++) {
            this.animations[i][propName] = newValue;
        }
    }
    attachTimeline(timeline, fallback) {
        const subscriptions = this.animations.map((animation) => {
            if ((0,_utils_supports_scroll_timeline_mjs__WEBPACK_IMPORTED_MODULE_0__.supportsScrollTimeline)() && animation.attachTimeline) {
                return animation.attachTimeline(timeline);
            }
            else if (typeof fallback === "function") {
                return fallback(animation);
            }
        });
        return () => {
            subscriptions.forEach((cancel, i) => {
                cancel && cancel();
                this.animations[i].stop();
            });
        };
    }
    get time() {
        return this.getAll("time");
    }
    set time(time) {
        this.setAll("time", time);
    }
    get speed() {
        return this.getAll("speed");
    }
    set speed(speed) {
        this.setAll("speed", speed);
    }
    get startTime() {
        return this.getAll("startTime");
    }
    get duration() {
        let max = 0;
        for (let i = 0; i < this.animations.length; i++) {
            max = Math.max(max, this.animations[i].duration);
        }
        return max;
    }
    runAll(methodName) {
        this.animations.forEach((controls) => controls[methodName]());
    }
    flatten() {
        this.runAll("flatten");
    }
    play() {
        this.runAll("play");
    }
    pause() {
        this.runAll("pause");
    }
    cancel() {
        this.runAll("cancel");
    }
    complete() {
        this.runAll("complete");
    }
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/controls/Group.mjs":
/*!**********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/controls/Group.mjs ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupPlaybackControls: () => (/* binding */ GroupPlaybackControls)
/* harmony export */ });
/* harmony import */ var _BaseGroup_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseGroup.mjs */ "./node_modules/motion-dom/dist/es/animation/controls/BaseGroup.mjs");


/**
 * TODO: This is a temporary class to support the legacy
 * thennable API
 */
class GroupPlaybackControls extends _BaseGroup_mjs__WEBPACK_IMPORTED_MODULE_0__.BaseGroupPlaybackControls {
    then(onResolve, onReject) {
        return Promise.all(this.animations).then(onResolve).catch(onReject);
    }
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs":
/*!**************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calcGeneratorDuration: () => (/* binding */ calcGeneratorDuration),
/* harmony export */   maxGeneratorDuration: () => (/* binding */ maxGeneratorDuration)
/* harmony export */ });
/**
 * Implement a practical max duration for keyframe generation
 * to prevent infinite loops
 */
const maxGeneratorDuration = 20000;
function calcGeneratorDuration(generator) {
    let duration = 0;
    const timeStep = 50;
    let state = generator.next(duration);
    while (!state.done && duration < maxGeneratorDuration) {
        duration += timeStep;
        state = generator.next(duration);
    }
    return duration >= maxGeneratorDuration ? Infinity : duration;
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs":
/*!************************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGeneratorEasing: () => (/* binding */ createGeneratorEasing)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _calc_duration_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calc-duration.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs");



/**
 * Create a progress => progress easing function from a generator.
 */
function createGeneratorEasing(options, scale = 100, createGenerator) {
    const generator = createGenerator({ ...options, keyframes: [0, scale] });
    const duration = Math.min((0,_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_1__.calcGeneratorDuration)(generator), _calc_duration_mjs__WEBPACK_IMPORTED_MODULE_1__.maxGeneratorDuration);
    return {
        type: "keyframes",
        ease: (progress) => {
            return generator.next(duration * progress).value / scale;
        },
        duration: (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.millisecondsToSeconds)(duration),
    };
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs":
/*!*************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isGenerator: () => (/* binding */ isGenerator)
/* harmony export */ });
function isGenerator(type) {
    return typeof type === "function";
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs":
/*!**********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getValueTransition: () => (/* binding */ getValueTransition)
/* harmony export */ });
function getValueTransition(transition, key) {
    return transition
        ? transition[key] ||
            transition["default"] ||
            transition
        : undefined;
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/NativeAnimationControls.mjs":
/*!*************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/NativeAnimationControls.mjs ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NativeAnimationControls: () => (/* binding */ NativeAnimationControls)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _utils_attach_timeline_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/attach-timeline.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/attach-timeline.mjs");



class NativeAnimationControls {
    constructor(animation) {
        this.animation = animation;
    }
    get duration() {
        var _a, _b, _c;
        const durationInMs = ((_b = (_a = this.animation) === null || _a === void 0 ? void 0 : _a.effect) === null || _b === void 0 ? void 0 : _b.getComputedTiming().duration) ||
            ((_c = this.options) === null || _c === void 0 ? void 0 : _c.duration) ||
            300;
        return (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.millisecondsToSeconds)(Number(durationInMs));
    }
    get time() {
        var _a;
        if (this.animation) {
            return (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.millisecondsToSeconds)(((_a = this.animation) === null || _a === void 0 ? void 0 : _a.currentTime) || 0);
        }
        return 0;
    }
    set time(newTime) {
        if (this.animation) {
            this.animation.currentTime = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.secondsToMilliseconds)(newTime);
        }
    }
    get speed() {
        return this.animation ? this.animation.playbackRate : 1;
    }
    set speed(newSpeed) {
        if (this.animation) {
            this.animation.playbackRate = newSpeed;
        }
    }
    get state() {
        return this.animation ? this.animation.playState : "finished";
    }
    get startTime() {
        return this.animation ? this.animation.startTime : null;
    }
    get finished() {
        return this.animation ? this.animation.finished : Promise.resolve();
    }
    play() {
        this.animation && this.animation.play();
    }
    pause() {
        this.animation && this.animation.pause();
    }
    stop() {
        if (!this.animation ||
            this.state === "idle" ||
            this.state === "finished") {
            return;
        }
        if (this.animation.commitStyles) {
            this.animation.commitStyles();
        }
        this.cancel();
    }
    flatten() {
        var _a;
        if (!this.animation)
            return;
        (_a = this.animation.effect) === null || _a === void 0 ? void 0 : _a.updateTiming({ easing: "linear" });
    }
    attachTimeline(timeline) {
        if (this.animation)
            (0,_utils_attach_timeline_mjs__WEBPACK_IMPORTED_MODULE_1__.attachTimeline)(this.animation, timeline);
        return motion_utils__WEBPACK_IMPORTED_MODULE_0__.noop;
    }
    complete() {
        this.animation && this.animation.finish();
    }
    cancel() {
        try {
            this.animation && this.animation.cancel();
        }
        catch (e) { }
    }
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/PseudoAnimation.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/PseudoAnimation.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PseudoAnimation: () => (/* binding */ PseudoAnimation)
/* harmony export */ });
/* harmony import */ var _NativeAnimationControls_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NativeAnimationControls.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/NativeAnimationControls.mjs");
/* harmony import */ var _utils_convert_options_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/convert-options.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/convert-options.mjs");



class PseudoAnimation extends _NativeAnimationControls_mjs__WEBPACK_IMPORTED_MODULE_0__.NativeAnimationControls {
    constructor(target, pseudoElement, valueName, keyframes, options) {
        const animationOptions = (0,_utils_convert_options_mjs__WEBPACK_IMPORTED_MODULE_1__.convertMotionOptionsToNative)(valueName, keyframes, options);
        const animation = target.animate(animationOptions.keyframes, {
            pseudoElement,
            ...animationOptions.options,
        });
        super(animation);
    }
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/utils/attach-timeline.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/utils/attach-timeline.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   attachTimeline: () => (/* binding */ attachTimeline)
/* harmony export */ });
function attachTimeline(animation, timeline) {
    animation.timeline = timeline;
    animation.onfinish = null;
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/utils/convert-options.mjs":
/*!***********************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/utils/convert-options.mjs ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyGeneratorOptions: () => (/* binding */ applyGeneratorOptions),
/* harmony export */   convertMotionOptionsToNative: () => (/* binding */ convertMotionOptionsToNative)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/supports/linear-easing.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs");
/* harmony import */ var _generators_utils_create_generator_easing_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../generators/utils/create-generator-easing.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs");
/* harmony import */ var _generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../generators/utils/is-generator.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs");
/* harmony import */ var _easing_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./easing.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs");






const defaultEasing = "easeOut";
function applyGeneratorOptions(options) {
    var _a;
    if ((0,_generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_3__.isGenerator)(options.type)) {
        const generatorOptions = (0,_generators_utils_create_generator_easing_mjs__WEBPACK_IMPORTED_MODULE_2__.createGeneratorEasing)(options, 100, options.type);
        options.ease = (0,_utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_1__.supportsLinearEasing)()
            ? generatorOptions.ease
            : defaultEasing;
        options.duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.secondsToMilliseconds)(generatorOptions.duration);
        options.type = "keyframes";
    }
    else {
        options.duration = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.secondsToMilliseconds)((_a = options.duration) !== null && _a !== void 0 ? _a : 0.3);
        options.ease = options.ease || defaultEasing;
    }
}
// TODO: Reuse for NativeAnimation
function convertMotionOptionsToNative(valueName, keyframes, options) {
    var _a;
    const nativeKeyframes = {};
    const nativeOptions = {
        fill: "both",
        easing: "linear",
        composite: "replace",
    };
    nativeOptions.delay = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.secondsToMilliseconds)((_a = options.delay) !== null && _a !== void 0 ? _a : 0);
    applyGeneratorOptions(options);
    nativeOptions.duration = options.duration;
    const { ease, times } = options;
    if (times)
        nativeKeyframes.offset = times;
    nativeKeyframes[valueName] = keyframes;
    const easing = (0,_easing_mjs__WEBPACK_IMPORTED_MODULE_4__.mapEasingToNativeEasing)(ease, options.duration);
    /**
     * If this is an easing array, apply to keyframes, not animation as a whole
     */
    if (Array.isArray(easing)) {
        nativeKeyframes.easing = easing;
    }
    else {
        nativeOptions.easing = easing;
    }
    return {
        keyframes: nativeKeyframes,
        options: nativeOptions,
    };
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cubicBezierAsString: () => (/* binding */ cubicBezierAsString),
/* harmony export */   isWaapiSupportedEasing: () => (/* binding */ isWaapiSupportedEasing),
/* harmony export */   mapEasingToNativeEasing: () => (/* binding */ mapEasingToNativeEasing),
/* harmony export */   supportedWaapiEasing: () => (/* binding */ supportedWaapiEasing)
/* harmony export */ });
/* harmony import */ var _utils_is_bezier_definition_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/is-bezier-definition.mjs */ "./node_modules/motion-dom/dist/es/utils/is-bezier-definition.mjs");
/* harmony import */ var _utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/supports/linear-easing.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs");
/* harmony import */ var _linear_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./linear.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs");




function isWaapiSupportedEasing(easing) {
    return Boolean((typeof easing === "function" && (0,_utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_1__.supportsLinearEasing)()) ||
        !easing ||
        (typeof easing === "string" &&
            (easing in supportedWaapiEasing || (0,_utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_1__.supportsLinearEasing)())) ||
        (0,_utils_is_bezier_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isBezierDefinition)(easing) ||
        (Array.isArray(easing) && easing.every(isWaapiSupportedEasing)));
}
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
const supportedWaapiEasing = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: /*@__PURE__*/ cubicBezierAsString([0, 0.65, 0.55, 1]),
    circOut: /*@__PURE__*/ cubicBezierAsString([0.55, 0, 1, 0.45]),
    backIn: /*@__PURE__*/ cubicBezierAsString([0.31, 0.01, 0.66, -0.59]),
    backOut: /*@__PURE__*/ cubicBezierAsString([0.33, 1.53, 0.69, 0.99]),
};
function mapEasingToNativeEasing(easing, duration) {
    if (!easing) {
        return undefined;
    }
    else if (typeof easing === "function" && (0,_utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_1__.supportsLinearEasing)()) {
        return (0,_linear_mjs__WEBPACK_IMPORTED_MODULE_2__.generateLinearEasing)(easing, duration);
    }
    else if ((0,_utils_is_bezier_definition_mjs__WEBPACK_IMPORTED_MODULE_0__.isBezierDefinition)(easing)) {
        return cubicBezierAsString(easing);
    }
    else if (Array.isArray(easing)) {
        return easing.map((segmentEasing) => mapEasingToNativeEasing(segmentEasing, duration) ||
            supportedWaapiEasing.easeOut);
    }
    else {
        return supportedWaapiEasing[easing];
    }
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateLinearEasing: () => (/* binding */ generateLinearEasing)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");


const generateLinearEasing = (easing, duration, // as milliseconds
resolution = 10 // as milliseconds
) => {
    let points = "";
    const numPoints = Math.max(Math.round(duration / resolution), 2);
    for (let i = 0; i < numPoints; i++) {
        points += easing((0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.progress)(0, numPoints - 1, i)) + ", ";
    }
    return `linear(${points.substring(0, points.length - 2)})`;
};




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isDragActive: () => (/* binding */ isDragActive),
/* harmony export */   isDragging: () => (/* binding */ isDragging)
/* harmony export */ });
const isDragging = {
    x: false,
    y: false,
};
function isDragActive() {
    return isDragging.x || isDragging.y;
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setDragLock: () => (/* binding */ setDragLock)
/* harmony export */ });
/* harmony import */ var _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is-active.mjs */ "./node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs");


function setDragLock(axis) {
    if (axis === "x" || axis === "y") {
        if (_is_active_mjs__WEBPACK_IMPORTED_MODULE_0__.isDragging[axis]) {
            return null;
        }
        else {
            _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__.isDragging[axis] = true;
            return () => {
                _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__.isDragging[axis] = false;
            };
        }
    }
    else {
        if (_is_active_mjs__WEBPACK_IMPORTED_MODULE_0__.isDragging.x || _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__.isDragging.y) {
            return null;
        }
        else {
            _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__.isDragging.x = _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__.isDragging.y = true;
            return () => {
                _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__.isDragging.x = _is_active_mjs__WEBPACK_IMPORTED_MODULE_0__.isDragging.y = false;
            };
        }
    }
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/gestures/hover.mjs":
/*!************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/gestures/hover.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hover: () => (/* binding */ hover)
/* harmony export */ });
/* harmony import */ var _drag_state_is_active_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drag/state/is-active.mjs */ "./node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs");
/* harmony import */ var _utils_setup_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/setup.mjs */ "./node_modules/motion-dom/dist/es/gestures/utils/setup.mjs");



function isValidHover(event) {
    return !(event.pointerType === "touch" || (0,_drag_state_is_active_mjs__WEBPACK_IMPORTED_MODULE_0__.isDragActive)());
}
/**
 * Create a hover gesture. hover() is different to .addEventListener("pointerenter")
 * in that it has an easier syntax, filters out polyfilled touch events, interoperates
 * with drag gestures, and automatically removes the "pointerennd" event listener when the hover ends.
 *
 * @public
 */
function hover(elementOrSelector, onHoverStart, options = {}) {
    const [elements, eventOptions, cancel] = (0,_utils_setup_mjs__WEBPACK_IMPORTED_MODULE_1__.setupGesture)(elementOrSelector, options);
    const onPointerEnter = (enterEvent) => {
        if (!isValidHover(enterEvent))
            return;
        const { target } = enterEvent;
        const onHoverEnd = onHoverStart(target, enterEvent);
        if (typeof onHoverEnd !== "function" || !target)
            return;
        const onPointerLeave = (leaveEvent) => {
            if (!isValidHover(leaveEvent))
                return;
            onHoverEnd(leaveEvent);
            target.removeEventListener("pointerleave", onPointerLeave);
        };
        target.addEventListener("pointerleave", onPointerLeave, eventOptions);
    };
    elements.forEach((element) => {
        element.addEventListener("pointerenter", onPointerEnter, eventOptions);
    });
    return cancel;
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/gestures/press/index.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/gestures/press/index.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   press: () => (/* binding */ press)
/* harmony export */ });
/* harmony import */ var _drag_state_is_active_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../drag/state/is-active.mjs */ "./node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs");
/* harmony import */ var _utils_capture_pointer_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/capture-pointer.mjs */ "./node_modules/motion-dom/dist/es/gestures/utils/capture-pointer.mjs");
/* harmony import */ var _utils_is_node_or_child_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/is-node-or-child.mjs */ "./node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs");
/* harmony import */ var _utils_is_primary_pointer_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/is-primary-pointer.mjs */ "./node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs");
/* harmony import */ var _utils_setup_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/setup.mjs */ "./node_modules/motion-dom/dist/es/gestures/utils/setup.mjs");
/* harmony import */ var _utils_is_keyboard_accessible_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/is-keyboard-accessible.mjs */ "./node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs");
/* harmony import */ var _utils_keyboard_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/keyboard.mjs */ "./node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs");
/* harmony import */ var _utils_state_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/state.mjs */ "./node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs");









/**
 * Filter out events that are not primary pointer events, or are triggering
 * while a Motion gesture is active.
 */
function isValidPressEvent(event) {
    return (0,_utils_is_primary_pointer_mjs__WEBPACK_IMPORTED_MODULE_3__.isPrimaryPointer)(event) && !(0,_drag_state_is_active_mjs__WEBPACK_IMPORTED_MODULE_0__.isDragActive)();
}
/**
 * Create a press gesture.
 *
 * Press is different to `"pointerdown"`, `"pointerup"` in that it
 * automatically filters out secondary pointer events like right
 * click and multitouch.
 *
 * It also adds accessibility support for keyboards, where
 * an element with a press gesture will receive focus and
 *  trigger on Enter `"keydown"` and `"keyup"` events.
 *
 * This is different to a browser's `"click"` event, which does
 * respond to keyboards but only for the `"click"` itself, rather
 * than the press start and end/cancel. The element also needs
 * to be focusable for this to work, whereas a press gesture will
 * make an element focusable by default.
 *
 * @public
 */
function press(targetOrSelector, onPressStart, options = {}) {
    const [targets, eventOptions, cancelEvents] = (0,_utils_setup_mjs__WEBPACK_IMPORTED_MODULE_4__.setupGesture)(targetOrSelector, options);
    const startPress = (startEvent) => {
        const target = startEvent.currentTarget;
        if (!target || !isValidPressEvent(startEvent) || _utils_state_mjs__WEBPACK_IMPORTED_MODULE_7__.isPressing.has(target))
            return;
        _utils_state_mjs__WEBPACK_IMPORTED_MODULE_7__.isPressing.add(target);
        (0,_utils_capture_pointer_mjs__WEBPACK_IMPORTED_MODULE_1__.capturePointer)(startEvent, "set");
        const onPressEnd = onPressStart(target, startEvent);
        const onPointerEnd = (endEvent, success) => {
            target.removeEventListener("pointerup", onPointerUp);
            target.removeEventListener("pointercancel", onPointerCancel);
            (0,_utils_capture_pointer_mjs__WEBPACK_IMPORTED_MODULE_1__.capturePointer)(endEvent, "release");
            if (!isValidPressEvent(endEvent) || !_utils_state_mjs__WEBPACK_IMPORTED_MODULE_7__.isPressing.has(target)) {
                return;
            }
            _utils_state_mjs__WEBPACK_IMPORTED_MODULE_7__.isPressing.delete(target);
            if (typeof onPressEnd === "function") {
                onPressEnd(endEvent, { success });
            }
        };
        const onPointerUp = (upEvent) => {
            const isOutside = !upEvent.isTrusted
                ? false
                : checkOutside(upEvent, target instanceof Element
                    ? target.getBoundingClientRect()
                    : {
                        left: 0,
                        top: 0,
                        right: window.innerWidth,
                        bottom: window.innerHeight,
                    });
            if (isOutside) {
                onPointerEnd(upEvent, false);
            }
            else {
                onPointerEnd(upEvent, !(target instanceof Element) ||
                    (0,_utils_is_node_or_child_mjs__WEBPACK_IMPORTED_MODULE_2__.isNodeOrChild)(target, upEvent.target));
            }
        };
        const onPointerCancel = (cancelEvent) => {
            onPointerEnd(cancelEvent, false);
        };
        target.addEventListener("pointerup", onPointerUp, eventOptions);
        target.addEventListener("pointercancel", onPointerCancel, eventOptions);
        target.addEventListener("lostpointercapture", onPointerCancel, eventOptions);
    };
    targets.forEach((target) => {
        target = options.useGlobalTarget ? window : target;
        let canAddKeyboardAccessibility = false;
        if (target instanceof HTMLElement) {
            canAddKeyboardAccessibility = true;
            if (!(0,_utils_is_keyboard_accessible_mjs__WEBPACK_IMPORTED_MODULE_5__.isElementKeyboardAccessible)(target) &&
                target.getAttribute("tabindex") === null) {
                target.tabIndex = 0;
            }
        }
        target.addEventListener("pointerdown", startPress, eventOptions);
        if (canAddKeyboardAccessibility) {
            target.addEventListener("focus", (event) => (0,_utils_keyboard_mjs__WEBPACK_IMPORTED_MODULE_6__.enableKeyboardPress)(event, eventOptions), eventOptions);
        }
    });
    return cancelEvents;
}
function checkOutside(event, rect) {
    return (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom);
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs":
/*!*****************************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/gestures/press/utils/is-keyboard-accessible.mjs ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isElementKeyboardAccessible: () => (/* binding */ isElementKeyboardAccessible)
/* harmony export */ });
const focusableElements = new Set([
    "BUTTON",
    "INPUT",
    "SELECT",
    "TEXTAREA",
    "A",
]);
function isElementKeyboardAccessible(element) {
    return (focusableElements.has(element.tagName) ||
        element.tabIndex !== -1);
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs":
/*!***************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/gestures/press/utils/keyboard.mjs ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   enableKeyboardPress: () => (/* binding */ enableKeyboardPress)
/* harmony export */ });
/* harmony import */ var _state_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.mjs */ "./node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs");


/**
 * Filter out events that are not "Enter" keys.
 */
function filterEvents(callback) {
    return (event) => {
        if (event.key !== "Enter")
            return;
        callback(event);
    };
}
function firePointerEvent(target, type) {
    target.dispatchEvent(new PointerEvent("pointer" + type, { isPrimary: true, bubbles: true }));
}
const enableKeyboardPress = (focusEvent, eventOptions) => {
    const element = focusEvent.currentTarget;
    if (!element)
        return;
    const handleKeydown = filterEvents(() => {
        if (_state_mjs__WEBPACK_IMPORTED_MODULE_0__.isPressing.has(element))
            return;
        firePointerEvent(element, "down");
        const handleKeyup = filterEvents(() => {
            firePointerEvent(element, "up");
        });
        const handleBlur = () => firePointerEvent(element, "cancel");
        element.addEventListener("keyup", handleKeyup, eventOptions);
        element.addEventListener("blur", handleBlur, eventOptions);
    });
    element.addEventListener("keydown", handleKeydown, eventOptions);
    /**
     * Add an event listener that fires on blur to remove the keydown events.
     */
    element.addEventListener("blur", () => element.removeEventListener("keydown", handleKeydown), eventOptions);
};




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/gestures/press/utils/state.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPressing: () => (/* binding */ isPressing)
/* harmony export */ });
const isPressing = new WeakSet();




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/gestures/utils/capture-pointer.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/gestures/utils/capture-pointer.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capturePointer: () => (/* binding */ capturePointer)
/* harmony export */ });
function capturePointer(event, action) {
    const actionName = `${action}PointerCapture`;
    if (event.target instanceof Element &&
        actionName in event.target &&
        event.pointerId !== undefined) {
        try {
            event.target[actionName](event.pointerId);
        }
        catch (e) { }
    }
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNodeOrChild: () => (/* binding */ isNodeOrChild)
/* harmony export */ });
/**
 * Recursively traverse up the tree to check whether the provided child node
 * is the parent or a descendant of it.
 *
 * @param parent - Element to find
 * @param child - Element to test against parent
 */
const isNodeOrChild = (parent, child) => {
    if (!child) {
        return false;
    }
    else if (parent === child) {
        return true;
    }
    else {
        return isNodeOrChild(parent, child.parentElement);
    }
};




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs":
/*!*******************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isPrimaryPointer: () => (/* binding */ isPrimaryPointer)
/* harmony export */ });
const isPrimaryPointer = (event) => {
    if (event.pointerType === "mouse") {
        return typeof event.button !== "number" || event.button <= 0;
    }
    else {
        /**
         * isPrimary is true for all mice buttons, whereas every touch point
         * is regarded as its own input. So subsequent concurrent touch points
         * will be false.
         *
         * Specifically match against false here as incomplete versions of
         * PointerEvents in very old browser might have it set as undefined.
         */
        return event.isPrimary !== false;
    }
};




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/gestures/utils/setup.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/gestures/utils/setup.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setupGesture: () => (/* binding */ setupGesture)
/* harmony export */ });
/* harmony import */ var _utils_resolve_elements_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/resolve-elements.mjs */ "./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs");


function setupGesture(elementOrSelector, options) {
    const elements = (0,_utils_resolve_elements_mjs__WEBPACK_IMPORTED_MODULE_0__.resolveElements)(elementOrSelector);
    const gestureAbortController = new AbortController();
    const eventOptions = {
        passive: true,
        ...options,
        signal: gestureAbortController.signal,
    };
    const cancel = () => gestureAbortController.abort();
    return [elements, eventOptions, cancel];
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/index.mjs":
/*!***************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/index.mjs ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GroupPlaybackControls: () => (/* reexport safe */ _animation_controls_Group_mjs__WEBPACK_IMPORTED_MODULE_0__.GroupPlaybackControls),
/* harmony export */   NativeAnimationControls: () => (/* reexport safe */ _animation_waapi_NativeAnimationControls_mjs__WEBPACK_IMPORTED_MODULE_5__.NativeAnimationControls),
/* harmony export */   ViewTransitionBuilder: () => (/* reexport safe */ _view_index_mjs__WEBPACK_IMPORTED_MODULE_17__.ViewTransitionBuilder),
/* harmony export */   attachTimeline: () => (/* reexport safe */ _animation_waapi_utils_attach_timeline_mjs__WEBPACK_IMPORTED_MODULE_6__.attachTimeline),
/* harmony export */   calcGeneratorDuration: () => (/* reexport safe */ _animation_generators_utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_2__.calcGeneratorDuration),
/* harmony export */   capturePointer: () => (/* reexport safe */ _gestures_utils_capture_pointer_mjs__WEBPACK_IMPORTED_MODULE_11__.capturePointer),
/* harmony export */   createGeneratorEasing: () => (/* reexport safe */ _animation_generators_utils_create_generator_easing_mjs__WEBPACK_IMPORTED_MODULE_3__.createGeneratorEasing),
/* harmony export */   cubicBezierAsString: () => (/* reexport safe */ _animation_waapi_utils_easing_mjs__WEBPACK_IMPORTED_MODULE_7__.cubicBezierAsString),
/* harmony export */   generateLinearEasing: () => (/* reexport safe */ _animation_waapi_utils_linear_mjs__WEBPACK_IMPORTED_MODULE_8__.generateLinearEasing),
/* harmony export */   getValueTransition: () => (/* reexport safe */ _animation_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_1__.getValueTransition),
/* harmony export */   hover: () => (/* reexport safe */ _gestures_hover_mjs__WEBPACK_IMPORTED_MODULE_9__.hover),
/* harmony export */   isBezierDefinition: () => (/* reexport safe */ _utils_is_bezier_definition_mjs__WEBPACK_IMPORTED_MODULE_12__.isBezierDefinition),
/* harmony export */   isDragActive: () => (/* reexport safe */ _gestures_drag_state_is_active_mjs__WEBPACK_IMPORTED_MODULE_18__.isDragActive),
/* harmony export */   isDragging: () => (/* reexport safe */ _gestures_drag_state_is_active_mjs__WEBPACK_IMPORTED_MODULE_18__.isDragging),
/* harmony export */   isGenerator: () => (/* reexport safe */ _animation_generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_4__.isGenerator),
/* harmony export */   isNodeOrChild: () => (/* reexport safe */ _gestures_utils_is_node_or_child_mjs__WEBPACK_IMPORTED_MODULE_20__.isNodeOrChild),
/* harmony export */   isPrimaryPointer: () => (/* reexport safe */ _gestures_utils_is_primary_pointer_mjs__WEBPACK_IMPORTED_MODULE_21__.isPrimaryPointer),
/* harmony export */   isWaapiSupportedEasing: () => (/* reexport safe */ _animation_waapi_utils_easing_mjs__WEBPACK_IMPORTED_MODULE_7__.isWaapiSupportedEasing),
/* harmony export */   mapEasingToNativeEasing: () => (/* reexport safe */ _animation_waapi_utils_easing_mjs__WEBPACK_IMPORTED_MODULE_7__.mapEasingToNativeEasing),
/* harmony export */   maxGeneratorDuration: () => (/* reexport safe */ _animation_generators_utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_2__.maxGeneratorDuration),
/* harmony export */   press: () => (/* reexport safe */ _gestures_press_index_mjs__WEBPACK_IMPORTED_MODULE_10__.press),
/* harmony export */   resolveElements: () => (/* reexport safe */ _utils_resolve_elements_mjs__WEBPACK_IMPORTED_MODULE_13__.resolveElements),
/* harmony export */   setDragLock: () => (/* reexport safe */ _gestures_drag_state_set_active_mjs__WEBPACK_IMPORTED_MODULE_19__.setDragLock),
/* harmony export */   supportedWaapiEasing: () => (/* reexport safe */ _animation_waapi_utils_easing_mjs__WEBPACK_IMPORTED_MODULE_7__.supportedWaapiEasing),
/* harmony export */   supportsFlags: () => (/* reexport safe */ _utils_supports_flags_mjs__WEBPACK_IMPORTED_MODULE_14__.supportsFlags),
/* harmony export */   supportsLinearEasing: () => (/* reexport safe */ _utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_15__.supportsLinearEasing),
/* harmony export */   supportsScrollTimeline: () => (/* reexport safe */ _utils_supports_scroll_timeline_mjs__WEBPACK_IMPORTED_MODULE_16__.supportsScrollTimeline),
/* harmony export */   view: () => (/* reexport safe */ _view_index_mjs__WEBPACK_IMPORTED_MODULE_17__.view)
/* harmony export */ });
/* harmony import */ var _animation_controls_Group_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation/controls/Group.mjs */ "./node_modules/motion-dom/dist/es/animation/controls/Group.mjs");
/* harmony import */ var _animation_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animation/utils/get-value-transition.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs");
/* harmony import */ var _animation_generators_utils_calc_duration_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./animation/generators/utils/calc-duration.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/calc-duration.mjs");
/* harmony import */ var _animation_generators_utils_create_generator_easing_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animation/generators/utils/create-generator-easing.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs");
/* harmony import */ var _animation_generators_utils_is_generator_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./animation/generators/utils/is-generator.mjs */ "./node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs");
/* harmony import */ var _animation_waapi_NativeAnimationControls_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./animation/waapi/NativeAnimationControls.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/NativeAnimationControls.mjs");
/* harmony import */ var _animation_waapi_utils_attach_timeline_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./animation/waapi/utils/attach-timeline.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/attach-timeline.mjs");
/* harmony import */ var _animation_waapi_utils_easing_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./animation/waapi/utils/easing.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs");
/* harmony import */ var _animation_waapi_utils_linear_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./animation/waapi/utils/linear.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/linear.mjs");
/* harmony import */ var _gestures_hover_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./gestures/hover.mjs */ "./node_modules/motion-dom/dist/es/gestures/hover.mjs");
/* harmony import */ var _gestures_press_index_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./gestures/press/index.mjs */ "./node_modules/motion-dom/dist/es/gestures/press/index.mjs");
/* harmony import */ var _gestures_utils_capture_pointer_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./gestures/utils/capture-pointer.mjs */ "./node_modules/motion-dom/dist/es/gestures/utils/capture-pointer.mjs");
/* harmony import */ var _utils_is_bezier_definition_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/is-bezier-definition.mjs */ "./node_modules/motion-dom/dist/es/utils/is-bezier-definition.mjs");
/* harmony import */ var _utils_resolve_elements_mjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/resolve-elements.mjs */ "./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs");
/* harmony import */ var _utils_supports_flags_mjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils/supports/flags.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/flags.mjs");
/* harmony import */ var _utils_supports_linear_easing_mjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/supports/linear-easing.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs");
/* harmony import */ var _utils_supports_scroll_timeline_mjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/supports/scroll-timeline.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs");
/* harmony import */ var _view_index_mjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./view/index.mjs */ "./node_modules/motion-dom/dist/es/view/index.mjs");
/* harmony import */ var _gestures_drag_state_is_active_mjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./gestures/drag/state/is-active.mjs */ "./node_modules/motion-dom/dist/es/gestures/drag/state/is-active.mjs");
/* harmony import */ var _gestures_drag_state_set_active_mjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./gestures/drag/state/set-active.mjs */ "./node_modules/motion-dom/dist/es/gestures/drag/state/set-active.mjs");
/* harmony import */ var _gestures_utils_is_node_or_child_mjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./gestures/utils/is-node-or-child.mjs */ "./node_modules/motion-dom/dist/es/gestures/utils/is-node-or-child.mjs");
/* harmony import */ var _gestures_utils_is_primary_pointer_mjs__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./gestures/utils/is-primary-pointer.mjs */ "./node_modules/motion-dom/dist/es/gestures/utils/is-primary-pointer.mjs");
























/***/ }),

/***/ "./node_modules/motion-dom/dist/es/utils/is-bezier-definition.mjs":
/*!************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/is-bezier-definition.mjs ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBezierDefinition: () => (/* binding */ isBezierDefinition)
/* harmony export */ });
const isBezierDefinition = (easing) => Array.isArray(easing) && typeof easing[0] === "number";




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs":
/*!********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/resolve-elements.mjs ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveElements: () => (/* binding */ resolveElements)
/* harmony export */ });
function resolveElements(elementOrSelector, scope, selectorCache) {
    var _a;
    if (elementOrSelector instanceof EventTarget) {
        return [elementOrSelector];
    }
    else if (typeof elementOrSelector === "string") {
        let root = document;
        if (scope) {
            // TODO: Refactor to utils package
            // invariant(
            //     Boolean(scope.current),
            //     "Scope provided, but no element detected."
            // )
            root = scope.current;
        }
        const elements = (_a = selectorCache === null || selectorCache === void 0 ? void 0 : selectorCache[elementOrSelector]) !== null && _a !== void 0 ? _a : root.querySelectorAll(elementOrSelector);
        return elements ? Array.from(elements) : [];
    }
    return Array.from(elementOrSelector);
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/utils/supports/flags.mjs":
/*!******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/supports/flags.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supportsFlags: () => (/* binding */ supportsFlags)
/* harmony export */ });
/**
 * Add the ability for test suites to manually set support flags
 * to better test more environments.
 */
const supportsFlags = {
    linearEasing: undefined,
};




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/supports/linear-easing.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supportsLinearEasing: () => (/* binding */ supportsLinearEasing)
/* harmony export */ });
/* harmony import */ var _memo_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./memo.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/memo.mjs");


const supportsLinearEasing = /*@__PURE__*/ (0,_memo_mjs__WEBPACK_IMPORTED_MODULE_0__.memoSupports)(() => {
    try {
        document
            .createElement("div")
            .animate({ opacity: 0 }, { easing: "linear(0, 1)" });
    }
    catch (e) {
        return false;
    }
    return true;
}, "linearEasing");




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/utils/supports/memo.mjs":
/*!*****************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/supports/memo.mjs ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   memoSupports: () => (/* binding */ memoSupports)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _flags_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flags.mjs */ "./node_modules/motion-dom/dist/es/utils/supports/flags.mjs");



function memoSupports(callback, supportsFlag) {
    const memoized = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.memo)(callback);
    return () => { var _a; return (_a = _flags_mjs__WEBPACK_IMPORTED_MODULE_1__.supportsFlags[supportsFlag]) !== null && _a !== void 0 ? _a : memoized(); };
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   supportsScrollTimeline: () => (/* binding */ supportsScrollTimeline)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");


const supportsScrollTimeline = (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.memo)(() => window.ScrollTimeline !== undefined);




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/view/index.mjs":
/*!********************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/view/index.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ViewTransitionBuilder: () => (/* binding */ ViewTransitionBuilder),
/* harmony export */   view: () => (/* binding */ view)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _start_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./start.mjs */ "./node_modules/motion-dom/dist/es/view/start.mjs");



/**
 * TODO:
 * - Create view transition on next tick
 * - Replace animations with Motion animations
 * - Return GroupAnimation on next tick
 */
class ViewTransitionBuilder {
    constructor(update, options = {}) {
        this.currentTarget = "root";
        this.targets = new Map();
        this.notifyReady = motion_utils__WEBPACK_IMPORTED_MODULE_0__.noop;
        this.readyPromise = new Promise((resolve) => {
            this.notifyReady = resolve;
        });
        queueMicrotask(() => {
            (0,_start_mjs__WEBPACK_IMPORTED_MODULE_1__.startViewAnimation)(update, options, this.targets).then((animation) => this.notifyReady(animation));
        });
    }
    get(selector) {
        this.currentTarget = selector;
        return this;
    }
    layout(keyframes, options) {
        this.updateTarget("layout", keyframes, options);
        return this;
    }
    new(keyframes, options) {
        this.updateTarget("new", keyframes, options);
        return this;
    }
    old(keyframes, options) {
        this.updateTarget("old", keyframes, options);
        return this;
    }
    enter(keyframes, options) {
        this.updateTarget("enter", keyframes, options);
        return this;
    }
    exit(keyframes, options) {
        this.updateTarget("exit", keyframes, options);
        return this;
    }
    crossfade(options) {
        this.updateTarget("enter", { opacity: 1 }, options);
        this.updateTarget("exit", { opacity: 0 }, options);
        return this;
    }
    updateTarget(target, keyframes, options = {}) {
        const { currentTarget, targets } = this;
        if (!targets.has(currentTarget)) {
            targets.set(currentTarget, {});
        }
        const targetData = targets.get(currentTarget);
        targetData[target] = { keyframes, options };
    }
    then(resolve, reject) {
        return this.readyPromise.then(resolve, reject);
    }
}
function view(update, defaultOptions = {}) {
    return new ViewTransitionBuilder(update, defaultOptions);
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/view/start.mjs":
/*!********************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/view/start.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startViewAnimation: () => (/* binding */ startViewAnimation)
/* harmony export */ });
/* harmony import */ var motion_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! motion-utils */ "./node_modules/motion-utils/dist/es/index.mjs");
/* harmony import */ var _animation_controls_BaseGroup_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../animation/controls/BaseGroup.mjs */ "./node_modules/motion-dom/dist/es/animation/controls/BaseGroup.mjs");
/* harmony import */ var _animation_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../animation/utils/get-value-transition.mjs */ "./node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs");
/* harmony import */ var _animation_waapi_NativeAnimationControls_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../animation/waapi/NativeAnimationControls.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/NativeAnimationControls.mjs");
/* harmony import */ var _animation_waapi_PseudoAnimation_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../animation/waapi/PseudoAnimation.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/PseudoAnimation.mjs");
/* harmony import */ var _animation_waapi_utils_convert_options_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../animation/waapi/utils/convert-options.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/convert-options.mjs");
/* harmony import */ var _animation_waapi_utils_easing_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../animation/waapi/utils/easing.mjs */ "./node_modules/motion-dom/dist/es/animation/waapi/utils/easing.mjs");
/* harmony import */ var _utils_choose_layer_type_mjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/choose-layer-type.mjs */ "./node_modules/motion-dom/dist/es/view/utils/choose-layer-type.mjs");
/* harmony import */ var _utils_css_mjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/css.mjs */ "./node_modules/motion-dom/dist/es/view/utils/css.mjs");
/* harmony import */ var _utils_get_layer_name_mjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/get-layer-name.mjs */ "./node_modules/motion-dom/dist/es/view/utils/get-layer-name.mjs");
/* harmony import */ var _utils_get_view_animations_mjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/get-view-animations.mjs */ "./node_modules/motion-dom/dist/es/view/utils/get-view-animations.mjs");
/* harmony import */ var _utils_has_target_mjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/has-target.mjs */ "./node_modules/motion-dom/dist/es/view/utils/has-target.mjs");













const definitionNames = ["layout", "enter", "exit", "new", "old"];
function startViewAnimation(update, defaultOptions, targets) {
    if (!document.startViewTransition) {
        return new Promise(async (resolve) => {
            await update();
            resolve(new _animation_controls_BaseGroup_mjs__WEBPACK_IMPORTED_MODULE_1__.BaseGroupPlaybackControls([]));
        });
    }
    // TODO: Go over existing targets and ensure they all have ids
    /**
     * If we don't have any animations defined for the root target,
     * remove it from being captured.
     */
    if (!(0,_utils_has_target_mjs__WEBPACK_IMPORTED_MODULE_11__.hasTarget)("root", targets)) {
        _utils_css_mjs__WEBPACK_IMPORTED_MODULE_8__.css.set(":root", {
            "view-transition-name": "none",
        });
    }
    /**
     * Set the timing curve to linear for all view transition layers.
     * This gets baked into the keyframes, which can't be changed
     * without breaking the generated animation.
     *
     * This allows us to set easing via updateTiming - which can be changed.
     */
    _utils_css_mjs__WEBPACK_IMPORTED_MODULE_8__.css.set("::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)", { "animation-timing-function": "linear !important" });
    _utils_css_mjs__WEBPACK_IMPORTED_MODULE_8__.css.commit(); // Write
    const transition = document.startViewTransition(async () => {
        await update();
        // TODO: Go over new targets and ensure they all have ids
    });
    transition.finished.finally(() => {
        _utils_css_mjs__WEBPACK_IMPORTED_MODULE_8__.css.remove(); // Write
    });
    return new Promise((resolve) => {
        transition.ready.then(() => {
            var _a;
            const generatedViewAnimations = (0,_utils_get_view_animations_mjs__WEBPACK_IMPORTED_MODULE_10__.getViewAnimations)();
            const animations = [];
            /**
             * Create animations for our definitions
             */
            targets.forEach((definition, target) => {
                // TODO: If target is not "root", resolve elements
                // and iterate over each
                for (const key of definitionNames) {
                    if (!definition[key])
                        continue;
                    const { keyframes, options } = definition[key];
                    for (let [valueName, valueKeyframes] of Object.entries(keyframes)) {
                        if (!valueKeyframes)
                            continue;
                        const valueOptions = {
                            ...(0,_animation_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_2__.getValueTransition)(defaultOptions, valueName),
                            ...(0,_animation_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_2__.getValueTransition)(options, valueName),
                        };
                        const type = (0,_utils_choose_layer_type_mjs__WEBPACK_IMPORTED_MODULE_7__.chooseLayerType)(key);
                        /**
                         * If this is an opacity animation, and keyframes are not an array,
                         * we need to convert them into an array and set an initial value.
                         */
                        if (valueName === "opacity" &&
                            !Array.isArray(valueKeyframes)) {
                            const initialValue = type === "new" ? 0 : 1;
                            valueKeyframes = [initialValue, valueKeyframes];
                        }
                        /**
                         * Resolve stagger function if provided.
                         */
                        if (typeof valueOptions.delay === "function") {
                            valueOptions.delay = valueOptions.delay(0, 1);
                        }
                        const animation = new _animation_waapi_PseudoAnimation_mjs__WEBPACK_IMPORTED_MODULE_4__.PseudoAnimation(document.documentElement, `::view-transition-${type}(${target})`, valueName, valueKeyframes, valueOptions);
                        animations.push(animation);
                    }
                }
            });
            /**
             * Handle browser generated animations
             */
            for (const animation of generatedViewAnimations) {
                if (animation.playState === "finished")
                    continue;
                const { effect } = animation;
                if (!effect || !(effect instanceof KeyframeEffect))
                    continue;
                const { pseudoElement } = effect;
                if (!pseudoElement)
                    continue;
                const name = (0,_utils_get_layer_name_mjs__WEBPACK_IMPORTED_MODULE_9__.getLayerName)(pseudoElement);
                if (!name)
                    continue;
                const targetDefinition = targets.get(name.layer);
                if (!targetDefinition) {
                    /**
                     * If transition name is group then update the timing of the animation
                     * whereas if it's old or new then we could possibly replace it using
                     * the above method.
                     */
                    const transitionName = name.type === "group" ? "layout" : "";
                    const animationTransition = {
                        ...(0,_animation_utils_get_value_transition_mjs__WEBPACK_IMPORTED_MODULE_2__.getValueTransition)(defaultOptions, transitionName),
                    };
                    (0,_animation_waapi_utils_convert_options_mjs__WEBPACK_IMPORTED_MODULE_5__.applyGeneratorOptions)(animationTransition);
                    const easing = (0,_animation_waapi_utils_easing_mjs__WEBPACK_IMPORTED_MODULE_6__.mapEasingToNativeEasing)(animationTransition.ease, animationTransition.duration);
                    effect.updateTiming({
                        delay: (0,motion_utils__WEBPACK_IMPORTED_MODULE_0__.secondsToMilliseconds)((_a = animationTransition.delay) !== null && _a !== void 0 ? _a : 0),
                        duration: animationTransition.duration,
                        easing,
                    });
                    animations.push(new _animation_waapi_NativeAnimationControls_mjs__WEBPACK_IMPORTED_MODULE_3__.NativeAnimationControls(animation));
                }
                else if (hasOpacity(targetDefinition, "enter") &&
                    hasOpacity(targetDefinition, "exit") &&
                    effect
                        .getKeyframes()
                        .some((keyframe) => keyframe.mixBlendMode)) {
                    animations.push(new _animation_waapi_NativeAnimationControls_mjs__WEBPACK_IMPORTED_MODULE_3__.NativeAnimationControls(animation));
                }
                else {
                    animation.cancel();
                }
            }
            resolve(new _animation_controls_BaseGroup_mjs__WEBPACK_IMPORTED_MODULE_1__.BaseGroupPlaybackControls(animations));
        });
    });
}
function hasOpacity(target, key) {
    var _a;
    return (_a = target === null || target === void 0 ? void 0 : target[key]) === null || _a === void 0 ? void 0 : _a.keyframes.opacity;
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/view/utils/choose-layer-type.mjs":
/*!**************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/view/utils/choose-layer-type.mjs ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chooseLayerType: () => (/* binding */ chooseLayerType)
/* harmony export */ });
function chooseLayerType(valueName) {
    if (valueName === "layout")
        return "group";
    if (valueName === "enter" || valueName === "new")
        return "new";
    if (valueName === "exit" || valueName === "old")
        return "old";
    return "group";
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/view/utils/css.mjs":
/*!************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/view/utils/css.mjs ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   css: () => (/* binding */ css)
/* harmony export */ });
let pendingRules = {};
let style = null;
const css = {
    set: (selector, values) => {
        pendingRules[selector] = values;
    },
    commit: () => {
        if (!style) {
            style = document.createElement("style");
            style.id = "motion-view";
        }
        let cssText = "";
        for (const selector in pendingRules) {
            const rule = pendingRules[selector];
            cssText += `${selector} {\n`;
            for (const [property, value] of Object.entries(rule)) {
                cssText += `  ${property}: ${value};\n`;
            }
            cssText += "}\n";
        }
        style.textContent = cssText;
        document.head.appendChild(style);
        pendingRules = {};
    },
    remove: () => {
        if (style && style.parentElement) {
            style.parentElement.removeChild(style);
        }
    },
};




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/view/utils/get-layer-name.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/view/utils/get-layer-name.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLayerName: () => (/* binding */ getLayerName)
/* harmony export */ });
function getLayerName(pseudoElement) {
    const match = pseudoElement.match(/::view-transition-(old|new|group|image-pair)\((.*?)\)/);
    if (!match)
        return null;
    return { layer: match[2], type: match[1] };
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/view/utils/get-view-animations.mjs":
/*!****************************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/view/utils/get-view-animations.mjs ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getViewAnimations: () => (/* binding */ getViewAnimations)
/* harmony export */ });
function filterViewAnimations(animation) {
    var _a;
    const { effect } = animation;
    if (!effect)
        return false;
    return (effect.target === document.documentElement &&
        ((_a = effect.pseudoElement) === null || _a === void 0 ? void 0 : _a.startsWith("::view-transition")));
}
function getViewAnimations() {
    return document.getAnimations().filter(filterViewAnimations);
}




/***/ }),

/***/ "./node_modules/motion-dom/dist/es/view/utils/has-target.mjs":
/*!*******************************************************************!*\
  !*** ./node_modules/motion-dom/dist/es/view/utils/has-target.mjs ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasTarget: () => (/* binding */ hasTarget)
/* harmony export */ });
function hasTarget(target, targets) {
    return targets.has(target) && Object.keys(targets.get(target)).length > 0;
}




/***/ }),

/***/ "./node_modules/motion-utils/dist/es/errors.mjs":
/*!******************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/errors.mjs ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   invariant: () => (/* binding */ invariant),
/* harmony export */   warning: () => (/* binding */ warning)
/* harmony export */ });
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./noop.mjs */ "./node_modules/motion-utils/dist/es/noop.mjs");


let warning = _noop_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
let invariant = _noop_mjs__WEBPACK_IMPORTED_MODULE_0__.noop;
if (true) {
    warning = (check, message) => {
        if (!check && typeof console !== "undefined") {
            console.warn(message);
        }
    };
    invariant = (check, message) => {
        if (!check) {
            throw new Error(message);
        }
    };
}




/***/ }),

/***/ "./node_modules/motion-utils/dist/es/index.mjs":
/*!*****************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/index.mjs ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   invariant: () => (/* reexport safe */ _errors_mjs__WEBPACK_IMPORTED_MODULE_0__.invariant),
/* harmony export */   memo: () => (/* reexport safe */ _memo_mjs__WEBPACK_IMPORTED_MODULE_1__.memo),
/* harmony export */   millisecondsToSeconds: () => (/* reexport safe */ _time_conversion_mjs__WEBPACK_IMPORTED_MODULE_4__.millisecondsToSeconds),
/* harmony export */   noop: () => (/* reexport safe */ _noop_mjs__WEBPACK_IMPORTED_MODULE_2__.noop),
/* harmony export */   progress: () => (/* reexport safe */ _progress_mjs__WEBPACK_IMPORTED_MODULE_3__.progress),
/* harmony export */   secondsToMilliseconds: () => (/* reexport safe */ _time_conversion_mjs__WEBPACK_IMPORTED_MODULE_4__.secondsToMilliseconds),
/* harmony export */   warning: () => (/* reexport safe */ _errors_mjs__WEBPACK_IMPORTED_MODULE_0__.warning)
/* harmony export */ });
/* harmony import */ var _errors_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors.mjs */ "./node_modules/motion-utils/dist/es/errors.mjs");
/* harmony import */ var _memo_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./memo.mjs */ "./node_modules/motion-utils/dist/es/memo.mjs");
/* harmony import */ var _noop_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./noop.mjs */ "./node_modules/motion-utils/dist/es/noop.mjs");
/* harmony import */ var _progress_mjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./progress.mjs */ "./node_modules/motion-utils/dist/es/progress.mjs");
/* harmony import */ var _time_conversion_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./time-conversion.mjs */ "./node_modules/motion-utils/dist/es/time-conversion.mjs");







/***/ }),

/***/ "./node_modules/motion-utils/dist/es/memo.mjs":
/*!****************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/memo.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   memo: () => (/* binding */ memo)
/* harmony export */ });
/*#__NO_SIDE_EFFECTS__*/
function memo(callback) {
    let result;
    return () => {
        if (result === undefined)
            result = callback();
        return result;
    };
}




/***/ }),

/***/ "./node_modules/motion-utils/dist/es/noop.mjs":
/*!****************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/noop.mjs ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   noop: () => (/* binding */ noop)
/* harmony export */ });
/*#__NO_SIDE_EFFECTS__*/
const noop = (any) => any;




/***/ }),

/***/ "./node_modules/motion-utils/dist/es/progress.mjs":
/*!********************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/progress.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   progress: () => (/* binding */ progress)
/* harmony export */ });
/*
  Progress within given range

  Given a lower limit and an upper limit, we return the progress
  (expressed as a number 0-1) represented by the given value, and
  limit that progress to within 0-1.

  @param [number]: Lower limit
  @param [number]: Upper limit
  @param [number]: Value to find progress within given range
  @return [number]: Progress of value within range as expressed 0-1
*/
/*#__NO_SIDE_EFFECTS__*/
const progress = (from, to, value) => {
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
};




/***/ }),

/***/ "./node_modules/motion-utils/dist/es/time-conversion.mjs":
/*!***************************************************************!*\
  !*** ./node_modules/motion-utils/dist/es/time-conversion.mjs ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   millisecondsToSeconds: () => (/* binding */ millisecondsToSeconds),
/* harmony export */   secondsToMilliseconds: () => (/* binding */ secondsToMilliseconds)
/* harmony export */ });
/**
 * Converts seconds to milliseconds
 *
 * @param seconds - Time in seconds.
 * @return milliseconds - Converted time in milliseconds.
 */
/*#__NO_SIDE_EFFECTS__*/
const secondsToMilliseconds = (seconds) => seconds * 1000;
/*#__NO_SIDE_EFFECTS__*/
const millisecondsToSeconds = (milliseconds) => milliseconds / 1000;




/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/247823103.json":
/*!**********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/247823103.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"fixed","images":{"fallback":{"src":"/static/5fec867705eb644cbeb75f835117a66a/3312b/shape.png","srcSet":"/static/5fec867705eb644cbeb75f835117a66a/3312b/shape.png 420w","sizes":"420px"},"sources":[{"srcSet":"/static/5fec867705eb644cbeb75f835117a66a/ab6df/shape.webp 420w","type":"image/webp","sizes":"420px"}]},"width":420,"height":462}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/3919071205.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/3919071205.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","placeholder":{"fallback":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAACXBIWXMAABYlAAAWJQFJUiTwAAABy0lEQVR42pWUSyiFQRTHx73kkQ0WRJGNZEFkYWfDVtnYkAVbO4pSpESKlCJKWSiPLJDHmoVXUawolLAReYV73Xtd/qP/4TQ+ytSvb+a85syc840x38MHYjivBHPgEgRAFLyBJ3AMRkCx8vMZZ4ggCyyBdwaJcq4Rmd1gFCQ7Mb4m+eBMGQdBGEQcwtRFaLsLMtyg6eCEBvfg2snGK8MbcMf5jsr0c0woh37KWpnxHlgA82AbXIAO4Aftym9IghWBEI9iFU2Ux4JE58Jt0ZKos6OOPhEWz16b6aUwwG8HjeNVEJ/TBaJrok+Q307DY0jatyBbBYoxP4eWp4BT5b9phY/qohfdav0x5NiDqlgPhgu5v1ka+f8RsMeJYV5Uhlv/CBjH77Tq3WfDtpCU7S6FKqhXYC3PZD/KHe4b9o9dXHGHQ1CgCuBVFDtywRp9X/kdtopyLo5AFThQFRsACU523WCDm7+rh8POK8RwlYIVviLnXE96HHOMuhADyT+9ro9RwqfJKhpBGigFqeqYUtUWJ2CU8zLjVLRGGS6DGVCvbGLVPy5/lhy1we0OmVTzBRHDPtVzErDNaZPa31pNBDlgnE5dHgGbqZsCeW6wD01vrcoxAEjbAAAAAElFTkSuQmCC"},"images":{"fallback":{"src":"/static/fe5a4ecfb31b91ce227fdd794a4723a4/087b5/git.png","srcSet":"/static/fe5a4ecfb31b91ce227fdd794a4723a4/abaea/git.png 9w,\\n/static/fe5a4ecfb31b91ce227fdd794a4723a4/7ceb7/git.png 18w,\\n/static/fe5a4ecfb31b91ce227fdd794a4723a4/087b5/git.png 36w,\\n/static/fe5a4ecfb31b91ce227fdd794a4723a4/27c48/git.png 72w","sizes":"(min-width: 36px) 36px, 100vw"},"sources":[{"srcSet":"/static/fe5a4ecfb31b91ce227fdd794a4723a4/a8d60/git.webp 9w,\\n/static/fe5a4ecfb31b91ce227fdd794a4723a4/4f7ad/git.webp 18w,\\n/static/fe5a4ecfb31b91ce227fdd794a4723a4/5edbd/git.webp 36w,\\n/static/fe5a4ecfb31b91ce227fdd794a4723a4/8aca2/git.webp 72w","type":"image/webp","sizes":"(min-width: 36px) 36px, 100vw"}]},"width":36,"height":35}');

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/924930019.json":
/*!**********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/924930019.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","placeholder":{"fallback":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsTAAALEwEAmpwYAAABkElEQVR42nXTSyiEURQH8Pv5hsljo8QGa68SWVhMjVhRJELjsVIe2RCFLCmxUcgzLKSJLLCQhURjYUGJkoWSjZoahZR343/G/07XV279Zrp3zj333McopVSM+m3VcAbL0AdDsAm7sAY+6IdB6IUeKFH/tA74glr29SLxEIBjqIQwrEMh1MMFbIPNeEs+shnYycE4cEEs+3mwARlctNEopIhz69iPJF6EEKuJrmJUmsjjyOLkZmNyOsfazYRB2DIHHE1vP5OTG4zfujg/zSxGguY44HIkyefqVbwIiZ1l0ik4YcyfYiRo1TGoExbDHmOO4AOmoRxaYAQueSTRebdwxY55fjq53OY7eOGNz0dfnrRJ+OR5RtooKyhl381k+pblEp75VL6hieMJ/PbIfNu2a3TCVLiHG8fh6gpla69QwEp9xsKKbzec7ErymDeZC9fwAANQBhX8xwT4eL3ciZkwx1LWHb53ztseVw67Q6fmBbgZLO9yCcagFVK4Cz93IX/DcZiBfRiW8/RPvBzMLzwFfwBERVosu8vrfgAAAABJRU5ErkJggg=="},"images":{"fallback":{"src":"/static/130b9fcaca70a5e70993a82cde4bead1/961df/logo.png","srcSet":"/static/130b9fcaca70a5e70993a82cde4bead1/885e1/logo.png 13w,\\n/static/130b9fcaca70a5e70993a82cde4bead1/74ad3/logo.png 25w,\\n/static/130b9fcaca70a5e70993a82cde4bead1/961df/logo.png 50w,\\n/static/130b9fcaca70a5e70993a82cde4bead1/e2842/logo.png 100w","sizes":"(min-width: 50px) 50px, 100vw"},"sources":[{"srcSet":"/static/130b9fcaca70a5e70993a82cde4bead1/e7324/logo.webp 13w,\\n/static/130b9fcaca70a5e70993a82cde4bead1/5e61e/logo.webp 25w,\\n/static/130b9fcaca70a5e70993a82cde4bead1/1d9ef/logo.webp 50w,\\n/static/130b9fcaca70a5e70993a82cde4bead1/9f21a/logo.webp 100w","type":"image/webp","sizes":"(min-width: 50px) 50px, 100vw"}]},"width":50,"height":31.000000000000004}');

/***/ }),

/***/ "./.cache/redirects.json":
/*!*******************************!*\
  !*** ./.cache/redirects.json ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = [];

/***/ }),

/***/ "./public/page-data/sq/d/2407236387.json":
/*!***********************************************!*\
  !*** ./public/page-data/sq/d/2407236387.json ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"data":{"site":{"siteMetadata":{"title":"George Bottomley - Portfolio","description":"George Bottomley\'s portfolio website.","image":"/logo.png","ogImage":"/og.png","siteUrl":"https://www.george-bottomley.co.nz"}}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-index-jshead.js.map