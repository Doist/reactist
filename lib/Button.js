(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define("reactist", ["prop-types", "react", "classnames"], factory);
	else if(typeof exports === 'object')
		exports["reactist"] = factory(require("prop-types"), require("react"), require("classnames"));
	else
		root["reactist"] = factory(root["prop-types"], root["React"], root["classnames"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
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
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(3);

// EXTERNAL MODULE: ./src/components/styles/popover.less
var popover = __webpack_require__(8);

// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(1);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(2);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// CONCATENATED MODULE: ./src/components/utils/PositioningUtils.js
/** @typedef {{width: number; height: number}} Dimensions */

/** @typedef {{x: number; y: number}} Position */

/**
 * @param {Dimensions} windowDimensions
 * @param {Dimensions} elementDimensions
 * @param {Dimensions} wrapperDimensions
 * @param {Position} wrapperPosition
 * @param {'top' | 'right' | 'bottom' | 'left'} position
 * @param {number} gap
 */
var hasEnoughSpace = function (windowDimensions, elementDimensions, wrapperDimensions, wrapperPosition, position, gap) {
  if (gap === void 0) {
    gap = 0;
  }

  var windowHeight = windowDimensions.height,
      windowWidth = windowDimensions.width;
  var elementHeight = elementDimensions.height,
      elementWidth = elementDimensions.width;
  var wrapperHeight = wrapperDimensions.height,
      wrapperWidth = wrapperDimensions.width;
  var wrapperX = wrapperPosition.x,
      wrapperY = wrapperPosition.y;

  var verticalPosition = _calculateVerticalPosition(wrapperPosition, wrapperDimensions, elementDimensions);

  var horizontalPosition = _calculateHorizontalPosition(wrapperPosition, wrapperDimensions, elementDimensions);

  var canPlaceVertically = verticalPosition >= 0 && verticalPosition + elementWidth <= windowWidth;
  var canPlaceHorizontally = horizontalPosition >= 0 && horizontalPosition + elementHeight <= windowHeight;

  if (position === 'top') {
    return canPlaceVertically && wrapperY - elementHeight - gap >= 0;
  } else if (position === 'right') {
    return canPlaceHorizontally && wrapperX + wrapperWidth + elementWidth + gap <= windowWidth;
  } else if (position === 'left') {
    return canPlaceHorizontally && wrapperX - elementWidth - gap >= 0;
  } else if (position === 'bottom') {
    return canPlaceVertically && wrapperY + wrapperHeight + elementHeight + gap <= windowHeight;
  }

  return false;
};
/**
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 */


var _calculateVerticalPosition = function (wrapperPosition, wrapperDimensions, elementDimensions) {
  return wrapperPosition.x + (wrapperDimensions.width - elementDimensions.width) / 2;
};
/**
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 */


var _calculateHorizontalPosition = function (wrapperPosition, wrapperDimensions, elementDimensions) {
  return wrapperPosition.y + (wrapperDimensions.height - elementDimensions.height) / 2;
};
/**
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 * @param {number} [gap]
 */


var calculateTopCenterPosition = function (wrapperDimensions, wrapperPosition, elementDimensions, gap) {
  if (gap === void 0) {
    gap = 0;
  }

  var x = _calculateVerticalPosition(wrapperPosition, wrapperDimensions, elementDimensions);

  var y = wrapperPosition.y - elementDimensions.height - gap;
  return {
    x: x,
    y: y
  };
};
/**
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 * @param {number} [gap]
 */


var calculateBottomCenterPosition = function (wrapperDimensions, wrapperPosition, elementDimensions, gap) {
  if (gap === void 0) {
    gap = 0;
  }

  var x = _calculateVerticalPosition(wrapperPosition, wrapperDimensions, elementDimensions);

  var y = wrapperPosition.y + wrapperDimensions.height + gap;
  return {
    x: x,
    y: y
  };
};
/**
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 * @param {number} [gap]
 */


var calculateRightCenterPosition = function (wrapperDimensions, wrapperPosition, elementDimensions, gap) {
  if (gap === void 0) {
    gap = 0;
  }

  var x = wrapperPosition.x + wrapperDimensions.width + gap;

  var y = _calculateHorizontalPosition(wrapperPosition, wrapperDimensions, elementDimensions);

  return {
    x: x,
    y: y
  };
};
/**
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 * @param {number} [gap]
 */


var calculateLeftCenterPosition = function (wrapperDimensions, wrapperPosition, elementDimensions, gap) {
  if (gap === void 0) {
    gap = 0;
  }

  var x = wrapperPosition.x - elementDimensions.width - gap;

  var y = _calculateHorizontalPosition(wrapperPosition, wrapperDimensions, elementDimensions);

  return {
    x: x,
    y: y
  };
};
/**
 * @param {'top' | 'right' | 'bottom' | 'left'} position
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 * @param {number} [gap]
 */


var calculatePosition = function (position, wrapperDimensions, wrapperPosition, elementDimensions, gap) {
  if (gap === void 0) {
    gap = 0;
  }

  if (position === 'top') {
    return calculateTopCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions, gap);
  } else if (position === 'right') {
    return calculateRightCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions, gap);
  } else if (position === 'bottom') {
    return calculateBottomCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions, gap);
  } else if (position === 'left') {
    return calculateLeftCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions, gap);
  }

  return wrapperPosition;
};


// CONCATENATED MODULE: ./src/components/Popover.js






/** @typedef {'left' | 'right' | 'top' | 'bottom' | 'vertical' | 'horizontal' | 'auto'} Position */

/**
 * @typedef {Object} Props
 * @property {boolean} [visible]
 * @property {React.Ref<HTMLElement>} [popoverRef]
 * @property {React.Ref<HTMLElement>} [wrapperRef]
 * @property {React.MouseEventHandler} [onMouseEnter]
 * @property {React.MouseEventHandler} [onMouseLeave]
 * @property {React.MouseEventHandler} [onClick]
 * @property {string} [wrapperClassName]
 * @property {string} [popoverClassName]
 * @property {string} [arrowClassName]
 * @property {(() => React.ReactNode) | React.ReactNode} [content]
 * @property {React.ReactNode} [trigger]
 * @property {Position} position
 * @property {boolean} [withArrow]
 * @property {boolean} [allowVaguePositioning]
 * @property {number} gapSize
 */

/** @extends {React.Component<Props>} */

var Popover_Popover =
/** @class */
function (_super) {
  Object(tslib_es6["b" /* __extends */])(Popover, _super);

  function Popover() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._updatePopoverPosition = function () {
      var _a = _this.props,
          position = _a.position,
          allowVaguePositioning = _a.allowVaguePositioning,
          gapSize = _a.gapSize;

      var wrapperRect = _this.wrapper.getBoundingClientRect();

      var popoverRect = _this.popover.getBoundingClientRect(); // Instead of using the documentElement find the nearest absolutely positioned element


      var documentEl = document.documentElement;
      var node = _this.wrapper;
      var foundParent = false;

      while (!foundParent) {
        var styles = getComputedStyle(node);
        var position_1 = styles.getPropertyValue('position');

        if (position_1 === 'absolute' || node === documentEl || !node.parentElement) {
          foundParent = true;
        } else {
          node = node.parentElement;
        }
      }

      var nodeRect = node.getBoundingClientRect();
      var windowDimensions = {
        height: nodeRect.height,
        width: nodeRect.width
      };
      var popoverDimensions = {
        height: popoverRect.height,
        width: popoverRect.width
      };
      var wrapperDimensions = {
        height: wrapperRect.height,
        width: wrapperRect.width
      };
      var wrapperPositionRelative = {
        x: wrapperRect.left - nodeRect.left,
        y: wrapperRect.top - nodeRect.top
      };
      var wrapperPositionAbsolute = {
        x: wrapperRect.left,
        y: wrapperRect.top
      };
      /** @type {("left" | "right" | "top" | "bottom")[]} */

      var positionsToTry = position === 'auto' ? ['top', 'right', 'bottom', 'left', 'top'] : position === 'vertical' ? ['top', 'bottom'] : position === 'horizontal' ? ['left', 'right'] : [position];

      for (var index = 0; index < positionsToTry.length; index++) {
        var currentPosition = positionsToTry[index];
        var enoughSpaceAtPosition = hasEnoughSpace(windowDimensions, popoverDimensions, wrapperDimensions, wrapperPositionRelative, currentPosition, gapSize);

        if (enoughSpaceAtPosition || index === positionsToTry.length - 1) {
          var popoverPosition = calculatePosition(currentPosition, wrapperDimensions, wrapperPositionAbsolute, popoverDimensions, gapSize);
          _this.popover.style.top = popoverPosition.y + "px";
          _this.popover.style.left = popoverPosition.x + "px";
          /**
           * Correct placement if vague positioning is allowed.
           * When it's not allowed we "cut off" popovers and display them
           * out of the viewport to maintain their centered position.
           */

          if (allowVaguePositioning) {
            // correct horizontally
            if (popoverPosition.x < 0) {
              ;
              _this.popover.style.left = 2 * gapSize + "px";
            } // correct vertically


            if (popoverPosition.y + popoverDimensions.height > windowDimensions.height) {
              ;
              _this.popover.style.top = windowDimensions.height - popoverDimensions.height - 2 * gapSize + "px";
            }
          }

          if (currentPosition !== position) {
            ;
            _this.popover.className = _this._getClassNameForPosition(currentPosition);
          }

          break;
        }
      }
    };
    /**
     * @param {Position} position
     */


    _this._getClassNameForPosition = function (position) {
      var _a = _this.props,
          visible = _a.visible,
          withArrow = _a.withArrow,
          arrowClassName = _a.arrowClassName;
      var className = external_classnames_default()('reactist_popover', {
        visible: visible
      });
      /* eslint-disable @typescript-eslint/camelcase */

      if (visible && withArrow) {
        return external_classnames_default()(className, arrowClassName, {
          arrow_top: position === 'bottom',
          arrow_right: position === 'left',
          arrow_bottom: position === 'auto' || position === 'top',
          arrow_left: position === 'right'
        });
      }
      /* eslint-enable @typescript-eslint/camelcase */


      return className;
    };
    /**
     * @param {HTMLElement} popover
     */


    _this._updatePopoverRef = function (popover) {
      ;
      _this.popover = popover;

      if (typeof _this.props.popoverRef === 'function') {
        _this.props.popoverRef(popover);
      }
    };
    /**
     * @param {HTMLElement} wrapper
     */


    _this._updateWrapperRef = function (wrapper) {
      ;
      _this.wrapper = wrapper;

      if (typeof _this.props.wrapperRef === 'function') {
        _this.props.wrapperRef(wrapper);
      }
    };

    return _this;
  }

  Popover.prototype.componentDidMount = function () {
    if (this.props.visible) {
      this._updatePopoverPosition();
    }
  };
  /**
   * @param {Props} prevProps
   */


  Popover.prototype.componentDidUpdate = function (prevProps) {
    if (this.wrapper && this.props.visible) {
      var positionChanged = prevProps.position !== this.props.position;
      var vaguePositioningChanged = prevProps.allowVaguePositioning !== this.props.allowVaguePositioning;
      var visibilityChanged = prevProps.visible !== this.props.visible;
      var arrowChanged = prevProps.withArrow !== this.props.withArrow;
      var gapSizeChanged = prevProps.gapSize !== this.props.gapSize;
      var contentChanged = prevProps.content !== this.props.content;

      if (positionChanged || vaguePositioningChanged || visibilityChanged || arrowChanged || gapSizeChanged || contentChanged) {
        this._updatePopoverPosition();
      }
    }
  };

  Popover.prototype.render = function () {
    var _a = this.props,
        position = _a.position,
        wrapperClassName = _a.wrapperClassName,
        popoverClassName = _a.popoverClassName,
        onMouseEnter = _a.onMouseEnter,
        onMouseLeave = _a.onMouseLeave,
        onClick = _a.onClick,
        trigger = _a.trigger,
        content = _a.content;

    var popoverClass = this._getClassNameForPosition(position);

    var popoverContentClass = external_classnames_default()('reactist_popover__content', popoverClassName);
    var wrapperClass = external_classnames_default()('reactist_popover__wrapper', wrapperClassName);
    return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("span", {
      className: wrapperClass,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onClick: onClick,
      ref: this._updateWrapperRef
    }, trigger, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("span", {
      className: popoverClass,
      ref: this._updatePopoverRef
    }, this.props.visible ? external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("span", {
      className: popoverContentClass
    }, typeof content === 'function' ? content() : content) : null));
  };

  return Popover;
}(external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.Component);

Popover_Popover.displayName = 'Popover';
Popover_Popover.defaultProps = {
  position: 'auto',
  gapSize: 5
};
Popover_Popover.propTypes = {
  /**
   * Position of the popover. Defaults to `auto`.
   * `auto` tries to position the tooltip to the top,
   * if there's not enough space it tries to position the tooltip clockwise (right, bottom, left).
   * Setting a distinct value like `right` will always position the popover right, regardless of available space.
   * Specifying `horizontal` will only try to position the tooltip left and right in that order.
   * Specifying `vertical` will only try to position the tooltip top and bottom in that order.
   */
  position: external_prop_types_default.a.oneOf(['auto', 'top', 'right', 'bottom', 'left', 'horizontal', 'vertical']),

  /**
   * Whether vague positioning is allowed. When set to true the popover prefers to be fully visible over being correctly centered.
   */
  allowVaguePositioning: external_prop_types_default.a.bool,

  /** Whether or not the popover is currently visibble. */
  visible: external_prop_types_default.a.bool.isRequired,

  /** Content slot of the popover. */
  content: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.arrayOf(external_prop_types_default.a.node), external_prop_types_default.a.func, external_prop_types_default.a.node]).isRequired,

  /** Trigger slot of the popover. */
  trigger: external_prop_types_default.a.oneOfType([external_prop_types_default.a.string, external_prop_types_default.a.arrayOf(external_prop_types_default.a.node), external_prop_types_default.a.node]),

  /** Function to be called when the trigger is clicked. */
  onClick: external_prop_types_default.a.func,

  /** Function to be called when the mouse enters the trigger. */
  onMouseEnter: external_prop_types_default.a.func,

  /** Function to be called when the mouse leaves the trigger. */
  onMouseLeave: external_prop_types_default.a.func,

  /** Additional css class that is applied to the wrapper element. */
  wrapperClassName: external_prop_types_default.a.string,

  /** Additional css class that is applied to the popover element. */
  popoverClassName: external_prop_types_default.a.string,

  /** Additional css class that is applied to style the arrow. Not applied when `withArrow` is false. */
  arrowClassName: external_prop_types_default.a.string,

  /** Whether or not the popover should have a centered arrow pointing to the trigger element. */
  withArrow: external_prop_types_default.a.bool,

  /** Gap between the popover wrapper and the arrow. */
  gapSize: external_prop_types_default.a.number,

  /** ref of the wrapper in case you need to manipulate it. */
  wrapperRef: external_prop_types_default.a.func,

  /** ref of the popover in case you need to manipulate it. */
  popoverRef: external_prop_types_default.a.func
};
/* harmony default export */ var components_Popover = __webpack_exports__["default"] = (Popover_Popover);

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _styles_tooltip_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _styles_tooltip_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_tooltip_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Popover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);






/** @typedef {import('./Popover').Props} PopoverProps */

/**
 * @typedef {Object} TooltipProps
 * @property {React.MouseEventHandler} [onMouseEnter]
 * @property {React.MouseEventHandler} [onMouseLeave]
 * @property {string} [tooltipClassName]
 * @property {number} delayShow
 * @property {number} delayHide
 * @property {boolean} [hideOnScroll]
 * @property {boolean} [inverted]
 * @property {PopoverProps['content']} [text]
 */

/**
 * @typedef {React.PropsWithChildren<TooltipProps & Pick<PopoverProps, "popoverClassName" | "wrapperClassName" | "allowVaguePositioning" | "gapSize" | "withArrow" | "position">>} Props
 */

/**
 * @typedef {Object} State
 * @property {boolean} visible
 */

/** @extends {React.Component<Props, State>} */

var Tooltip =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"])(Tooltip, _super);

  function Tooltip() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /** @type {State} */


    _this.state = {
      visible: false
    };

    _this._show = function () {
      _this._delayAction(function () {
        _this.setState(function () {
          return {
            visible: true
          };
        });

        if (_this.props.hideOnScroll) {
          _this._initScrollListener();
        }
      }, _this.props.delayShow);
    };

    _this._hide = function () {
      _this._delayAction(function () {
        _this._clearDelayTimeout();

        _this.setState(function () {
          return {
            visible: false
          };
        });

        if (_this.props.hideOnScroll) {
          _this._removeScrollListener();
        }
      }, _this.props.delayHide);
    };
    /**
     * @param {HTMLLIElement} tooltip
     */


    _this._updateTooltipRef = function (tooltip) {
      ;
      _this.tooltip = tooltip;
    };
    /**
     * @param {HTMLLIElement} wrapper
     */


    _this._updateWrapperRef = function (wrapper) {
      ;
      _this.wrapper = wrapper;
    };

    return _this;
  }
  /**
   * @param {Props} nextProps
   * @param {State} nextState
   * @return {boolean}
   */


  Tooltip.prototype.shouldComponentUpdate = function (nextProps, nextState) {
    // only update on state or prop changes
    return this.state.visible !== nextState.visible || this.props.position !== nextProps.position || this.props.text !== nextProps.text || this.props.hideOnScroll !== nextProps.hideOnScroll || this.props.delayShow !== nextProps.delayShow || this.props.delayHide !== nextProps.delayHide || this.props.gapSize !== nextProps.gapSize || this.props.children !== nextProps.children;
  };

  Tooltip.prototype.componentWillUnmount = function () {
    this._clearDelayTimeout();

    this._removeScrollListener();
  };

  Tooltip.prototype._initScrollListener = function () {
    document.addEventListener('scroll', this._hide, true);
  };

  Tooltip.prototype._removeScrollListener = function () {
    document.removeEventListener('scroll', this._hide, true);
  };

  Tooltip.prototype._clearDelayTimeout = function () {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  };
  /**
   * @param {(...args: any[]) => void} actionFn
   * @param {number} delay
   */


  Tooltip.prototype._delayAction = function (actionFn, delay) {
    ;

    this._clearDelayTimeout();

    this.delayTimeout = setTimeout(actionFn, delay);
  };

  Tooltip.prototype.render = function () {
    var _this = this;

    var _a = this.props,
        position = _a.position,
        allowVaguePositioning = _a.allowVaguePositioning,
        wrapperClassName = _a.wrapperClassName,
        tooltipClassName = _a.tooltipClassName,
        text = _a.text,
        children = _a.children,
        gapSize = _a.gapSize,
        inverted = _a.inverted,
        withArrow = _a.withArrow;
    var wrapperClass = classnames__WEBPACK_IMPORTED_MODULE_4___default()('reactist_tooltip__wrapper', wrapperClassName);
    var tooltipClass = classnames__WEBPACK_IMPORTED_MODULE_4___default()('reactist_tooltip__text', tooltipClassName, {
      inverted: inverted
    });
    var arrowClass = classnames__WEBPACK_IMPORTED_MODULE_4___default()('reactist_tooltip__arrow', {
      inverted: inverted
    });

    if (!text) {
      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
        className: wrapperClass
      }, children);
    } // wrap on click of trigger to hide tooltip on click


    var trigger = react__WEBPACK_IMPORTED_MODULE_2___default.a.Children.map(children, function (child) {
      if (react__WEBPACK_IMPORTED_MODULE_2___default.a.isValidElement(child)) {
        /**
         * We can only attach click listeners to valid elements.
         * When passing in a string / number as child we cannot attach the listener.
         */
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(child, {
          /**
           * @param {React.MouseEvent} event
           */
          onClick: function (event) {
            _this._hide();

            if (typeof child.props.onClick === 'function') {
              child.props.onClick(event);
            }
          }
        });
      } else {
        return child;
      }
    });
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Popover__WEBPACK_IMPORTED_MODULE_5__["default"], {
      position: position,
      visible: this.state.visible,
      trigger: trigger,
      content: text,
      popoverClassName: tooltipClass,
      wrapperClassName: wrapperClass,
      arrowClassName: arrowClass,
      onMouseEnter: this._show,
      onMouseLeave: this._hide,
      allowVaguePositioning: allowVaguePositioning,
      gapSize: gapSize,
      popoverRef: this._updateTooltipRef,
      wrapperRef: this._updateWrapperRef,
      withArrow: withArrow
    });
  };

  return Tooltip;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Tooltip.displayName = 'Tooltip';
Tooltip.defaultProps = {
  position: 'auto',
  hideOnScroll: true,
  delayShow: 500,
  delayHide: 0,
  allowVaguePositioning: false,
  inverted: false,
  withArrow: true,
  gapSize: 5
};
Tooltip.propTypes = {
  /**
   * Position of the tooltip. Defaults to `auto`.
   * `auto` tries to position the tooltip to the top,
   * if there's not enough space it tries to position the tooltip clockwise (right, bottom, left).
   * Setting a distinct value like `right` will always position the tooltip right, regardless of available space.
   * Specifying `horizontal` will only try to position the tooltip left and right in that order.
   * Specifying `vertical` will only try to position the tooltip top and bottom in that order.
   */
  position: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOf(['auto', 'top', 'right', 'bottom', 'left', 'horizontal', 'vertical']),

  /**
   * Whether vague positioning is allowed. When set to true the tooltip prefers to be fully visible over being correctly centered.
   */
  allowVaguePositioning: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Text that is displayed inside the tooltip */
  text: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node]).isRequired,

  /** Set whether scrolling should hide the tooltip or not. */
  hideOnScroll: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** How long to wait after hovering before the tooltip is shown (in ms). */
  delayShow: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /** How long to wait after unhovering before the tooltip is hidden (in ms). */
  delayHide: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /** Children that are wrapped by the toolip. */
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node]),

  /** Additional css class that is applied to the wrapper element. */
  wrapperClassName: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** Additional css class that is applied to the tooltip element. */
  tooltipClassName: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** Inverted tooltips have a light background with dark text. */
  inverted: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Gap between the tooltip wrapper and the arrow  */
  gapSize: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,

  /** Whether or not the tooltip should have a centered arrow pointing to the trigger element. */
  withArrow: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (Tooltip);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _styles_button_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _styles_button_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_button_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);






/**
 * @typedef {Object} Props
 * @property {(event?: React.MouseEvent) => void} [onClick]
 * @property {boolean} [disabled]
 * @property {boolean} [loading]
 * @property {string} [className]
 * @property {boolean} [secondary]
 * @property {boolean} [small]
 * @property {boolean} [white]
 * @property {boolean} [large]
 * @property {boolean} [danger]
 * @property {string} [data_tip]
 * @property {React.ReactNode} [name]
 * @property {boolean} [close]
 */

/** @extends {React.Component<any>} */

var Button =
/** @class */
function (_super) {
  Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __extends */ "b"])(Button, _super);

  function Button() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    /**
     * @param {React.MouseEvent} event
     */


    _this._onClick = function (event) {
      event.preventDefault();

      if (!_this.props.disabled && !_this.props.loading && _this.props.onClick) {
        _this.props.onClick();
      }
    };

    return _this;
  }

  Button.prototype.render = function () {
    var _a = this.props,
        className = _a.className,
        secondary = _a.secondary,
        small = _a.small,
        large = _a.large,
        white = _a.white,
        loading = _a.loading,
        danger = _a.danger,
        disabled = _a.disabled,
        name = _a.name,
        //eslint-disable-next-line @typescript-eslint/camelcase
    data_tip = _a.data_tip,
        extraProps = Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __rest */ "c"])(_a, ["className", "secondary", "small", "large", "white", "loading", "danger", "disabled", "name", "data_tip"]);

    delete extraProps.onClick;
    var buttonClass = classnames__WEBPACK_IMPORTED_MODULE_4___default()('reactist_button', {
      secondary: secondary,
      small: small,
      large: large,
      white: white,
      busy: loading,
      danger: danger
    }, className);
    var button = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", Object(tslib__WEBPACK_IMPORTED_MODULE_0__[/* __assign */ "a"])({
      className: buttonClass,
      disabled: disabled,
      onClick: this._onClick
    }, extraProps), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "wrapper"
    }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, name))); // conditionally wrap into tooltip
    //eslint-disable-next-line @typescript-eslint/camelcase

    return data_tip ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_Tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], {
      text: data_tip
    }, button) : button;
  };

  return Button;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

Button.displayName = 'Button';
Button.defaultProps = {
  secondary: false,
  small: false,
  white: false,
  loading: false,
  disabled: false,
  danger: false
};
Button.propTypes = {
  /** Text that is displayed on the button. */
  name: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node]),

  /**
   * Function that is called when the button is clicked.
   * Is only invoked when disabled is not set.
   */
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /** Secondary style. */
  secondary: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Small style. */
  small: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Large style. */
  large: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** White style. */
  white: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Loading style. Prevents onClick from being called. */
  loading: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Disabled style. Prevents onClick from being called. */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Danger style. */
  danger: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Tooltip that is displayed on hover. */
  //eslint-disable-next-line @typescript-eslint/camelcase
  data_tip: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.node]),

  /** Additional css class applied to the button. */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
});