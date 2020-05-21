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
/******/ 	return __webpack_require__(__webpack_require__.s = 47);
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

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(3);

// EXTERNAL MODULE: ./src/components/styles/modal.less
var modal = __webpack_require__(32);

// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(1);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);

// EXTERNAL MODULE: external {"root":"ReactDOM","commonjs2":"react-dom","commonjs":"react-dom","amd":"react-dom"}
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_ = __webpack_require__(4);
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(2);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// CONCATENATED MODULE: ./src/components/icons/CloseIcon.svg.js


var CloseIcon = function () {
  return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("path", {
    fill: "gray",
    fillRule: "evenodd",
    d: "M11.293 12L5.146 5.854a.5.5 0 1 1 .708-.708L12 11.293l6.146-6.147a.5.5 0 0 1 .708.708L12.707 12l6.147 6.146a.5.5 0 0 1-.708.708L12 12.707l-6.146 6.147a.5.5 0 0 1-.708-.708L11.293 12z"
  }));
};

/* harmony default export */ var CloseIcon_svg = (CloseIcon);
// CONCATENATED MODULE: ./src/components/Modal.js







/**
 * @typedef {Object} Props
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 * @property {boolean} [large]
 * @property {boolean} [medium]
 * @property {boolean} [closeOnOverlayClick]
 */

/** @extends {React.Component<Props>} */

var Modal_Box =
/** @class */
function (_super) {
  Object(tslib_es6["b" /* __extends */])(Box, _super);
  /**
   * @param {Props} props
   * @param {unknown} context
   */


  function Box(props, context) {
    var _this = _super.call(this, props, context) || this;

    _this._handleKeyDown = _this._handleKeyDown.bind(_this);
    _this._closeModal = _this._closeModal.bind(_this);
    _this._handleOverlayClick = _this._handleOverlayClick.bind(_this);
    window.addEventListener('keydown', _this._handleKeyDown);
    return _this;
  }

  Box.prototype.componentWillUnmount = function () {
    window.removeEventListener('keydown', this._handleKeyDown);
  };

  Box.prototype._closeModal = function () {
    external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default.a.unmountComponentAtNode(document.getElementById('modal_box'));
  };
  /**
   * @param {KeyboardEvent} event
   */


  Box.prototype._handleKeyDown = function (event) {
    if (event.keyCode === 27) {
      // ESC
      this._closeModal();

      event.preventDefault();
    }
  };
  /**
   * @param {React.MouseEvent<Element>} event
   */


  Box.prototype._handleOverlayClick = function (event) {
    if (event.target instanceof Element && (event.target.id === 'reactist-overlay' || event.target.id === 'reactist-overlay-inner')) {
      this._closeModal();
    }
  };

  Box.prototype.render = function () {
    var _a = this.props,
        large = _a.large,
        medium = _a.medium,
        style = _a.style,
        children = _a.children,
        closeOnOverlayClick = _a.closeOnOverlayClick;
    var className = external_classnames_default()('reactist_modal_box', {
      large: large,
      medium: medium
    }, this.props.className);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
      className: "reactist_overlay",
      id: "reactist-overlay",
      onClick: closeOnOverlayClick ? this._handleOverlayClick : undefined
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
      className: "reactist_overlay_inner",
      id: "reactist-overlay-inner"
    }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
      style: style,
      className: className
    }, children)));
  };

  return Box;
}(external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.Component);

Modal_Box.displayName = 'Modal.Box';
Modal_Box.defaultProps = {
  large: false,
  closeOnOverlayClick: false
};
Modal_Box.propTypes = {
  /** Additional css class applied to the Modal.Box. */
  className: external_prop_types_default.a.string,

  /** Sometimes a class name is not enough so you can use this to set the style directly. */
  style: external_prop_types_default.a.object,

  /** Large style. */
  large: external_prop_types_default.a.bool,

  /** Medium size syle. */
  medium: external_prop_types_default.a.bool,

  /** Close the Modal when clicking on the overlay. */
  closeOnOverlayClick: external_prop_types_default.a.bool,

  /** Children to render inside the Modal.Box. Normally Modal.Header, Modal.Body and Modal.Actions. */
  children: external_prop_types_default.a.oneOfType([external_prop_types_default.a.arrayOf(external_prop_types_default.a.node), external_prop_types_default.a.node])
};

var Modal_Header =
/** @class */
function (_super) {
  Object(tslib_es6["b" /* __extends */])(Header, _super);

  function Header() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * @param {React.MouseEvent} event
   */


  Header.prototype._closeModal = function (event) {
    event.preventDefault();

    if (typeof this.props.beforeClose === 'function') {
      this.props.beforeClose();
    }

    external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default.a.unmountComponentAtNode(document.getElementById('modal_box'));
  };

  Header.prototype.render = function () {
    return (
      /* eslint-disable jsx-a11y/anchor-is-valid */
      external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
        className: "reactist_modal_box__header"
      }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("p", null, this.props.title && external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("span", {
        className: "title"
      }, this.props.title), this.props.subtitle && external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("span", {
        className: "subtitle"
      }, this.props.subtitle), this.props.children), external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("a", {
        className: "close",
        onClick: this._closeModal.bind(this),
        href: "#"
      }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(CloseIcon_svg, null)))
      /* eslint-enable jsx-a11y/anchor-is-valid */

    );
  };

  return Header;
}(external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.Component);

Modal_Header.displayName = 'Modal.Header';
Modal_Header.propTypes = {
  /** Children to render inside the Modal.Header for a fully customizable appearance. */
  children: external_prop_types_default.a.oneOfType([external_prop_types_default.a.arrayOf(external_prop_types_default.a.node), external_prop_types_default.a.node]),

  /** Title of the Modal.Header. */
  title: external_prop_types_default.a.string,

  /** Subtitle of the Modal.Header. */
  subtitle: external_prop_types_default.a.string,

  /** Function that is called right before the Modal unmounts itself. */
  beforeClose: external_prop_types_default.a.func
};

var Modal_Body =
/** @class */
function (_super) {
  Object(tslib_es6["b" /* __extends */])(Body, _super);

  function Body() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * @param {React.MouseEvent} event
   */


  Body.prototype._closeModal = function (event) {
    event.preventDefault();
    external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default.a.unmountComponentAtNode(document.getElementById('modal_box'));
  };

  Body.prototype.render = function () {
    var _a = this.props,
        icon = _a.icon,
        plain = _a.plain,
        children = _a.children,
        style = _a.style,
        showCloseIcon = _a.showCloseIcon;
    var className = external_classnames_default()('reactist_modal_box__body', {
      plain: plain
    }, this.props.className);
    return (
      /* eslint-disable jsx-a11y/anchor-is-valid */
      external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
        className: className,
        style: style
      }, showCloseIcon && external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("a", {
        className: "close",
        onClick: this._closeModal.bind(this),
        href: "#"
      }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(CloseIcon_svg, null)), icon ? external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
        className: "dialog"
      }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
        className: "reactist_icon"
      }, icon), external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
        className: "content"
      }, children)) : children)
      /* eslint-enable jsx-a11y/anchor-is-valid */

    );
  };

  return Body;
}(external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.Component);

Modal_Body.displayName = 'Modal.Body';
Modal_Body.defaultProps = {
  showCloseIcon: false
};
Modal_Body.propTypes = {
  /** Display an icon (or basically any component) on the right hand side of the Modal.Body. */
  icon: external_prop_types_default.a.node,

  /**
   * Render a close icon in the top right corner of the Modal.Body.
   * Recommended to use when no Modal.Header is used.
   */
  showCloseIcon: external_prop_types_default.a.bool,

  /** Additionall css class applied to the Modal.Body. */
  className: external_prop_types_default.a.string,

  /** Sometimes a class name is not enough so you can use this to set the style directly. */
  style: external_prop_types_default.a.object,

  /** Applies less styles on the body (e.g. no padding) */
  plain: external_prop_types_default.a.bool,

  /** Children to render inside the Modal.Body. */
  children: external_prop_types_default.a.oneOfType([external_prop_types_default.a.arrayOf(external_prop_types_default.a.node), external_prop_types_default.a.node])
};
/**
 * @typedef {Object} ActionProps
 * @property {() => void} [onClick]
 * @property {boolean} [close]
 */

/** @extends {React.Component} */

var Modal_Actions =
/** @class */
function (_super) {
  Object(tslib_es6["b" /* __extends */])(Actions, _super);

  function Actions() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /** @param {ActionProps['onClick']} on_click */

  /* eslint-disable @typescript-eslint/camelcase */


  Actions.prototype._onClick = function (on_click) {
    if (typeof on_click === 'function') {
      on_click();
    }

    external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default.a.unmountComponentAtNode(document.getElementById('modal_box'));
  };
  /* eslint-enable @typescript-eslint/camelcase */


  Actions.prototype.render = function () {
    var _this = this;

    var children = external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.Children.map(this.props.children,
    /** @param {React.ReactElement<ActionProps>} child */
    function (child) {
      if (!child) return false;

      if (child.props.close) {
        return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.cloneElement(child, {
          onClick: function () {
            return _this._onClick(child.props.onClick);
          }
        });
      } else {
        return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.cloneElement(child);
      }
    });
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
      className: "reactist_modal_box__actions"
    }, children);
  };

  return Actions;
}(external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.Component);

Modal_Actions.displayName = 'Modal.Actions';
Modal_Actions.propTypes = {
  /**
   * Children to render inside the Modal.Actions. They can have an optional `close` property (boolean).
   * When that is supplied and set to true it will close the modal after the onClick function
   */
  children: external_prop_types_default.a.oneOfType([external_prop_types_default.a.arrayOf(external_prop_types_default.a.node), external_prop_types_default.a.node])
};
/* harmony default export */ var Modal = __webpack_exports__["default"] = ({
  Box: Modal_Box,
  Header: Modal_Header,
  Body: Modal_Body,
  Actions: Modal_Actions
});

/***/ })

/******/ });
});