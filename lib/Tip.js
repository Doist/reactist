(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("classnames"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define("reactist", ["prop-types", "react", "classnames", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["reactist"] = factory(require("prop-types"), require("react"), require("classnames"), require("react-dom"));
	else
		root["reactist"] = factory(root["prop-types"], root["React"], root["classnames"], root["ReactDOM"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __rest; });
/* unused harmony export __decorate */
/* unused harmony export __param */
/* unused harmony export __metadata */
/* unused harmony export __awaiter */
/* unused harmony export __generator */
/* unused harmony export __createBinding */
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __spreadArrays */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/* unused harmony export __importStar */
/* unused harmony export __importDefault */
/* unused harmony export __classPrivateFieldGet */
/* unused harmony export __classPrivateFieldSet */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/components/styles/tip.less
var tip = __webpack_require__(42);

// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(1);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(2);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// CONCATENATED MODULE: ./src/components/icons/ThinQuestionMarkIcon.svg.js


var ThinQuestionMark = function () {
  return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("svg", {
    width: "18px",
    height: "18px",
    viewBox: "0 0 18 18"
  }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("g", {
    stroke: "none",
    strokeWidth: "1",
    fill: "none",
    fillRule: "evenodd"
  }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("g", {
    fill: "#979797"
  }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("path", {
    d: "M9,17 C13.418278,17 17,13.418278 17,9 C17,4.581722 13.418278,1 9,1 C4.581722,1 1,4.581722 1,9 C1,13.418278 4.581722,17 9,17 Z M9,18 C4.02943725,18 0,13.9705627 0,9 C0,4.02943725 4.02943725,0 9,0 C13.9705627,0 18,4.02943725 18,9 C18,13.9705627 13.9705627,18 9,18 Z",
    fillRule: "nonzero"
  }), external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("path", {
    d: "M5.625,6.671875 L6.9609375,6.671875 C7.046875,5.5546875 7.796875,4.859375 8.9765625,4.859375 C10.140625,4.859375 10.890625,5.5703125 10.890625,6.5390625 C10.890625,7.375 10.5390625,7.8671875 9.6328125,8.421875 C8.5625,9.0625 8.0625,9.765625 8.0703125,10.796875 L8.0703125,11.515625 L9.4375,11.515625 L9.4375,11.0078125 C9.4375,10.1875 9.71875,9.75 10.7109375,9.1640625 C11.7109375,8.5625 12.34375,7.6953125 12.34375,6.46875 C12.34375,4.859375 11,3.640625 9.03125,3.640625 C6.8359375,3.640625 5.7109375,4.984375 5.625,6.671875 Z M8.859375,15.140625 C9.4921875,15.140625 9.9375,14.6875 9.9375,14.0546875 C9.9375,13.4140625 9.4921875,12.9609375 8.859375,12.9609375 C8.2265625,12.9609375 7.7734375,13.4140625 7.7734375,14.0546875 C7.7734375,14.6875 8.2265625,15.140625 8.859375,15.140625 Z"
  }))));
};

/* harmony default export */ var ThinQuestionMarkIcon_svg = (ThinQuestionMark);
// EXTERNAL MODULE: ./src/components/Dropdown.js
var Dropdown = __webpack_require__(6);

// CONCATENATED MODULE: ./src/components/Tip.js






/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {React.ReactNode} [title]
 * @property {React.ReactNode} [message]
 * @property {boolean | undefined} [top]
 */

/** @type {React.FC<Props>} */

var Tip = function (_a) {
  var title = _a.title,
      message = _a.message,
      top = _a.top,
      className = _a.className;
  var tipClass = external_classnames_default()('reactist_tip__container', className);
  return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(Dropdown["default"].Box, {
    top: top,
    className: tipClass
  }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(Dropdown["default"].Trigger, null, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(ThinQuestionMarkIcon_svg, null)), external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(Dropdown["default"].Body, null, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
    className: "reactist_tip"
  }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("p", {
    className: "reactist_tip--title"
  }, title), external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("p", {
    className: "reactist_tip--message"
  }, message))));
};

Tip.displayName = 'Tip';
Tip.defaultProps = {
  top: false
};
Tip.propTypes = {
  /** Whether the tip content should be displayed to the top or not. Maps to the Dropdown.Box top property. */
  top: external_prop_types_default.a.bool,

  /** Title of the tip. */
  title: external_prop_types_default.a.string.isRequired,

  /** Message of the tip. */
  message: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.arrayOf(external_prop_types_default.a.node), external_prop_types_default.a.node]).isRequired,

  /** Additional css class that is applied to the Tip. */
  className: external_prop_types_default.a.string
};
/* harmony default export */ var components_Tip = __webpack_exports__["default"] = (Tip);

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _styles_dropdown_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _styles_dropdown_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_dropdown_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);






var Box =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"])(Box, _super);

  function Box(props, context) {
    var _this = _super.call(this, props, context) || this;

    _this.state = {
      //eslint-disable-next-line @typescript-eslint/camelcase
      show_body: false,
      top: props.top || false
    };
    _this._handleClickOutside = _this._handleClickOutside.bind(_this);
    _this._setPosition = _this._setPosition.bind(_this);
    _this._toggleShowBody = _this._toggleShowBody.bind(_this);
    _this._timeout = null;
    return _this;
  }

  Box.prototype.componentWillUnmount = function () {
    document.removeEventListener('click', this._handleClickOutside, true);

    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  };

  Box.prototype._handleClickOutside = function (event) {
    var _this = this; //eslint-disable-next-line @typescript-eslint/camelcase


    var dropdown_dom_node = react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.findDOMNode(this);
    if ( //eslint-disable-next-line @typescript-eslint/camelcase
    dropdown_dom_node && //eslint-disable-next-line @typescript-eslint/camelcase
    !dropdown_dom_node.contains(event.target)) this._toggleShowBody();else if (!this.props.allowBodyInteractions) {
      // won't close when body interactions are allowed
      ;
      this._timeout = setTimeout(function () {
        if (_this.state.show_body) {
          _this._toggleShowBody();
        }
      }, 100);
    }
  };

  Box.prototype._toggleShowBody = function () {
    if (!this.state.show_body) {
      // will show
      if (this.props.onShowBody) this.props.onShowBody();
      document.addEventListener('click', this._handleClickOutside, true);
    } else {
      // will hide
      if (this.props.onHideBody) this.props.onHideBody();
      document.removeEventListener('click', this._handleClickOutside, true);
    }

    this.setState({
      //eslint-disable-next-line @typescript-eslint/camelcase
      show_body: !this.state.show_body
    });
  };

  Box.prototype._getTriggerComponent = function () {
    var _trigger = this.props.children && this.props.children[0];

    return _trigger ? react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(_trigger, {
      onClick: this._toggleShowBody
    }) : undefined;
  }; // https://facebook.github.io/react/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components


  Box.prototype._setPosition = function (body) {
    if (body) {
      //eslint-disable-next-line @typescript-eslint/camelcase
      var scrolling_parent = document.getElementById(this.props.scrolling_parent ? this.props.scrolling_parent : '');
      /* eslint-disable @typescript-eslint/camelcase */

      if (scrolling_parent) {
        var dropdown = react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.findDOMNode(this);

        if (!dropdown) {
          return;
        }

        var dropdown_vertical_position =
        /** @type {HTMLElement} */
        react_dom__WEBPACK_IMPORTED_MODULE_3___default.a.findDOMNode(this).offsetTop;
        var dropdown_trigger = dropdown.querySelector('.trigger');

        if (!dropdown_trigger) {
          return;
        }

        var dropdown_trigger_height =
        /** @type {Element} */
        dropdown_trigger.clientHeight;
        var dropdown_body_height = body.clientHeight;
        var scrolling_parent_height = scrolling_parent.clientHeight;
        var scrolling_parent_offset = scrolling_parent.scrollTop;
        var bottom_offset = scrolling_parent_height + scrolling_parent_offset - dropdown_vertical_position - dropdown_trigger_height;
        var top_1 = bottom_offset < dropdown_body_height;

        if (top_1 !== this.state.top) {
          this.setState({
            top: top_1
          });
        }
      }
      /* eslint-enable @typescript-eslint/camelcase */

    }
  };

  Box.prototype._getBodyComponent = function () {
    if (!this.state.show_body) {
      return null;
    }

    var top = this.state.top;
    var _a = this.props,
        _b = _a.right,
        right = _b === void 0 ? false : _b,
        children = _a.children;
    var props = {
      top: top,
      right: right,
      setPosition: this._setPosition
    };
    /* eslint-disable @typescript-eslint/camelcase */

    var class_name = classnames__WEBPACK_IMPORTED_MODULE_4___default()({
      body_wrapper: true,
      with_arrow: true,
      top: top,
      bottom: !top
    });
    /* eslint-enable @typescript-eslint/camelcase */

    var body = children && children[1];
    var contentMarkup = typeof body === 'function' ? body(props) : body ? react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(body, props) : undefined;
    return (//eslint-disable-next-line @typescript-eslint/camelcase
      react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: class_name,
        style: {
          position: 'relative'
        }
      }, contentMarkup)
    );
  };

  Box.prototype.render = function () {
    var className = classnames__WEBPACK_IMPORTED_MODULE_4___default()('reactist_dropdown', this.props.className);
    var top = this.state.top;
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      style: {
        display: 'inline-block'
      },
      className: className
    }, top && this._getBodyComponent(), this._getTriggerComponent(), !top && this._getBodyComponent());
  };

  return Box;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Box.displayName = 'Dropdown.Box';

var Trigger =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"])(Trigger, _super);

  function Trigger(props, context) {
    var _this = _super.call(this, props, context) || this;

    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  Trigger.prototype._onClick = function (event) {
    event.preventDefault();
    event.stopPropagation();
    this.props.onClick && this.props.onClick(event);
  };

  Trigger.prototype.render = function () {
    var style = {
      display: 'block'
    };
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      style: style,
      className: "trigger",
      onClick: this._onClick
    }, this.props.children);
  };

  return Trigger;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Trigger.displayName = 'Dropdown.Trigger';

var Body =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"])(Body, _super);

  function Body() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Body.prototype.render = function () {
    /** @type {React.CSSProperties} */
    var style = {
      position: 'absolute',
      right: 0,
      top: 0
    };

    if (this.props.top) {
      style.top = 'auto';
      style.bottom = 0;
    }

    if (this.props.right) {
      style.right = 'auto';
      style.left = 0;
    }

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      ref: this.props.setPosition,
      style: style,
      className: "body",
      id: "reactist-dropdown-body"
    }, this.props.children);
  };

  return Body;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Body.displayName = 'Dropdown.Body';
var Dropdown = {
  Box: Box,
  Trigger: Trigger,
  Body: Body
};
/* harmony default export */ __webpack_exports__["default"] = (Dropdown);

/***/ })

/******/ });
});