(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define("reactist", ["prop-types", "react"], factory);
	else if(typeof exports === 'object')
		exports["reactist"] = factory(require("prop-types"), require("react"));
	else
		root["reactist"] = factory(root["prop-types"], root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCapturerResolver", function() { return KeyCapturerResolver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUPPORTED_KEYS", function() { return SUPPORTED_KEYS; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/** @type {Record<string, string>} */

var SUPPORTED_KEYS = {
  ARROW_UP: 'ArrowUp',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ENTER: 'Enter',
  BACKSPACE: 'Backspace',
  ESCAPE: 'Escape'
};
var KeyCapturerResolver = {
  /**
   * @param {string} eventKey
   */
  resolveByKey: function resolveByKey(eventKey) {
    switch (eventKey) {
      case 'Left': // IE specific

      case 'ArrowLeft':
        {
          return SUPPORTED_KEYS.ARROW_LEFT;
        }

      case 'Up': // IE specific

      case 'ArrowUp':
        {
          return SUPPORTED_KEYS.ARROW_UP;
        }

      case 'Right': // IE specific

      case 'ArrowRight':
        {
          return SUPPORTED_KEYS.ARROW_RIGHT;
        }

      case 'Down': // IE specific

      case 'ArrowDown':
        {
          return SUPPORTED_KEYS.ARROW_DOWN;
        }

      case 'Enter':
        {
          return SUPPORTED_KEYS.ENTER;
        }

      case 'Backspace':
        {
          return SUPPORTED_KEYS.BACKSPACE;
        }

      case 'Esc': // IE specific

      case 'Escape':
        {
          return SUPPORTED_KEYS.ESCAPE;
        }

      default:
        {
          return null;
        }
    }
  },

  /**
   * @param {number} keyCode
   */
  resolveByKeyCode: function resolveByKeyCode(keyCode) {
    switch (keyCode) {
      case 37:
        {
          return SUPPORTED_KEYS.ARROW_LEFT;
        }

      case 38:
        {
          return SUPPORTED_KEYS.ARROW_UP;
        }

      case 39:
        {
          return SUPPORTED_KEYS.ARROW_RIGHT;
        }

      case 40:
        {
          return SUPPORTED_KEYS.ARROW_DOWN;
        }

      case 13:
        {
          return SUPPORTED_KEYS.ENTER;
        }

      case 8:
        {
          return SUPPORTED_KEYS.BACKSPACE;
        }

      case 27:
        {
          return SUPPORTED_KEYS.ESCAPE;
        }

      default:
        {
          return null;
        }
    }
  }
};
/**
 * @typedef {Record<string, (() => void) | boolean | React.ReactChild> & {eventName?: 'onKeyDown' | 'onKeyDownCapture' | 'onKeyUp' | 'onKeyUpCapture'}} Props
 */

/**
 * Use this component to wrap anything you want to handle key events for (e.g. an input).
 * You can specify the `eventName` to capture (defaults to `onKeyDown`).
 * Check the SUPPORTED_KEYS map to see which keys are supported and supply the respective
 * `on${Key}` prop (i.e. `onEnter` or `onArrowDown`).
 * If you want the default behaviour to be preserved (i.e. only want to hook into the event
 * instead of replacing it) set the `propagate${Key}` prop (e.g. propagateBackspace).
 *
 * @extends {React.Component<Props>}
 */

var KeyCapturer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(KeyCapturer, _React$Component);

  function KeyCapturer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, KeyCapturer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(KeyCapturer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_handleKeyEvent", function (event) {
      // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
      var key = event.key !== undefined ? KeyCapturerResolver.resolveByKey(event.key) : KeyCapturerResolver.resolveByKeyCode(event.keyCode);

      if (Object.values(SUPPORTED_KEYS).includes(key)) {
        if (typeof _this.props["on".concat(key)] === 'function') {
          // @ts-ignore Dynamic type not expressible in TypeScript.
          _this.props["on".concat(key)]();

          if (_this.props["propagate".concat(key)] !== true) {
            event.preventDefault();
            event.stopPropagation();
          }
        }
      }
    });

    return _this;
  }

  _createClass(KeyCapturer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          _this$props$eventName = _this$props.eventName,
          eventName = _this$props$eventName === void 0 ? 'onKeyDown' : _this$props$eventName;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(
      /** @type {React.ReactElement} */
      children, _defineProperty({}, eventName, this._handleKeyEvent));
    }
  }]);

  return KeyCapturer;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

KeyCapturer.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  eventName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (KeyCapturer);


/***/ })

/******/ });
});