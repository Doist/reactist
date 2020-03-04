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
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
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

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_range_input_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var _styles_range_input_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_range_input_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);





var RangeInput = function RangeInput(_ref) {
  var value = _ref.value,
      min = _ref.min,
      max = _ref.max,
      stepSize = _ref.stepSize,
      onPlus = _ref.onPlus,
      onMinus = _ref.onMinus,
      _onChange = _ref.onChange,
      className = _ref.className;

  if (typeof onPlus !== 'function') {
    onPlus = _onChange;
  }

  if (typeof onMinus !== 'function') {
    onMinus = _onChange;
  }

  var rangeInputClassName = classnames__WEBPACK_IMPORTED_MODULE_3___default()('reactist_range_input', className);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: rangeInputClassName
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "range_btn minus",
    onClick: function onClick() {
      return value > min && onMinus(value - stepSize);
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
    value: value,
    className: "range_slider",
    type: "range",
    min: min,
    max: max,
    step: stepSize,
    onChange: function onChange(event) {
      return _onChange(parseInt(event.target.value));
    }
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "range_btn plus",
    onClick: function onClick() {
      return value < max && onPlus(value + stepSize);
    }
  }));
};

RangeInput.displayName = 'RangeInput';
RangeInput.defaultProps = {
  value: 0,
  min: 0,
  max: 100,
  stepSize: 1
};
RangeInput.propTypes = {
  /** Current value of the range input. */
  value: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,

  /** Minimum value of the range input. */
  min: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,

  /** Maximum value of the range input. */
  max: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,

  /** Step size of the range input and the plus/minus buttons. */
  stepSize: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,

  /** Optional function that is called when plus button is clicked. If not supplied onChange will be called with the next value. */
  onPlus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /** Optional function that is called when minus button is clicked. If not supplied onChange will be called with the next value. */
  onMinus: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /** Callback function that is called whenever the range input value changes. When onPlus or onMinus is supplied this will not be called for button clicks. */
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired,

  /** Optional css class that is applied to the range input. */
  className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (RangeInput);

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
});