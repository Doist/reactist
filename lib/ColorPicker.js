(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("prop-types"), require("react"), require("classnames"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define("reactist", ["prop-types", "react", "classnames", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["reactist"] = factory(require("prop-types"), require("react"), require("classnames"), require("react-dom"));
	else
		root["reactist"] = factory(root["prop-types"], root["React"], root["classnames"], root["ReactDOM"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/components/styles/popover.less
var popover = __webpack_require__(7);

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
var hasEnoughSpace = function hasEnoughSpace(windowDimensions, elementDimensions, wrapperDimensions, wrapperPosition, position) {
  var gap = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
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

var _calculateVerticalPosition = function _calculateVerticalPosition(wrapperPosition, wrapperDimensions, elementDimensions) {
  return wrapperPosition.x + (wrapperDimensions.width - elementDimensions.width) / 2;
};

var _calculateHorizontalPosition = function _calculateHorizontalPosition(wrapperPosition, wrapperDimensions, elementDimensions) {
  return wrapperPosition.y + (wrapperDimensions.height - elementDimensions.height) / 2;
};

var calculateTopCenterPosition = function calculateTopCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions) {
  var gap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var x = _calculateVerticalPosition(wrapperPosition, wrapperDimensions, elementDimensions);

  var y = wrapperPosition.y - elementDimensions.height - gap;
  return {
    x: x,
    y: y
  };
};

var calculateBottomCenterPosition = function calculateBottomCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions) {
  var gap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var x = _calculateVerticalPosition(wrapperPosition, wrapperDimensions, elementDimensions);

  var y = wrapperPosition.y + wrapperDimensions.height + gap;
  return {
    x: x,
    y: y
  };
};

var calculateRightCenterPosition = function calculateRightCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions) {
  var gap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var x = wrapperPosition.x + wrapperDimensions.width + gap;

  var y = _calculateHorizontalPosition(wrapperPosition, wrapperDimensions, elementDimensions);

  return {
    x: x,
    y: y
  };
};

var calculateLeftCenterPosition = function calculateLeftCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions) {
  var gap = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var x = wrapperPosition.x - elementDimensions.width - gap;

  var y = _calculateHorizontalPosition(wrapperPosition, wrapperDimensions, elementDimensions);

  return {
    x: x,
    y: y
  };
};

var calculatePosition = function calculatePosition(position, wrapperDimensions, wrapperPosition, elementDimensions) {
  var gap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

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


// CONCATENATED MODULE: ./src/components/Popover.jsx
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







var Popover_Popover =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Popover, _React$Component);

  function Popover() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Popover);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Popover)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "_updatePopoverPosition", function () {
      var _this$props = _this.props,
          position = _this$props.position,
          allowVaguePositioning = _this$props.allowVaguePositioning,
          gapSize = _this$props.gapSize;

      var wrapperRect = _this.wrapper.getBoundingClientRect();

      var popoverRect = _this.popover.getBoundingClientRect(); // Instead of using the documentElement find the nearest absolutely positioned element


      var documentEl = document.documentElement;
      var node = _this.wrapper;
      var foundParent = false;

      while (!foundParent) {
        var styles = getComputedStyle(node);

        var _position = styles.getPropertyValue('position');

        if (_position === 'absolute' || node === documentEl || !node.parentElement) {
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
      var positionsToTry = position === 'auto' ? ['top', 'right', 'bottom', 'left', 'top'] : position === 'vertical' ? ['top', 'bottom'] : position === 'horizontal' ? ['left', 'right'] : [position];

      for (var index = 0; index < positionsToTry.length; index++) {
        var currentPosition = positionsToTry[index];
        var enoughSpaceAtPosition = hasEnoughSpace(windowDimensions, popoverDimensions, wrapperDimensions, wrapperPositionRelative, currentPosition, gapSize);

        if (enoughSpaceAtPosition || index === positionsToTry.length - 1) {
          var popoverPosition = calculatePosition(currentPosition, wrapperDimensions, wrapperPositionAbsolute, popoverDimensions, gapSize);
          _this.popover.style.top = "".concat(popoverPosition.y, "px");
          _this.popover.style.left = "".concat(popoverPosition.x, "px");
          /**
           * Correct placement if vague positioning is allowed.
           * When it's not allowed we "cut off" popovers and display them
           * out of the viewport to maintain their centered position.
           */

          if (allowVaguePositioning) {
            // correct horizontally
            if (popoverPosition.x < 0) {
              _this.popover.style.left = "".concat(2 * gapSize, "px");
            } // correct vertically


            if (popoverPosition.y + popoverDimensions.height > windowDimensions.height) {
              _this.popover.style.top = "".concat(windowDimensions.height - popoverDimensions.height - 2 * gapSize, "px");
            }
          }

          if (currentPosition !== position) {
            _this.popover.className = _this._getClassNameForPosition(currentPosition);
          }

          break;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_getClassNameForPosition", function (position) {
      var _this$props2 = _this.props,
          visible = _this$props2.visible,
          withArrow = _this$props2.withArrow,
          arrowClassName = _this$props2.arrowClassName;
      var className = external_classnames_default()('reactist_popover', {
        visible: visible
      });

      if (visible && withArrow) {
        return external_classnames_default()(className, arrowClassName, {
          arrow_top: position === 'bottom',
          arrow_right: position === 'left',
          arrow_bottom: position === 'auto' || position === 'top',
          arrow_left: position === 'right'
        });
      }

      return className;
    });

    _defineProperty(_assertThisInitialized(_this), "_updatePopoverRef", function (popover) {
      _this.popover = popover;

      if (typeof _this.props.popoverRef === 'function') {
        _this.props.popoverRef(popover);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_updateWrapperRef", function (wrapper) {
      _this.wrapper = wrapper;

      if (typeof _this.props.wrapperRef === 'function') {
        _this.props.wrapperRef(wrapper);
      }
    });

    return _this;
  }

  _createClass(Popover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.visible) {
        this._updatePopoverPosition();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
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
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          position = _this$props3.position,
          wrapperClassName = _this$props3.wrapperClassName,
          popoverClassName = _this$props3.popoverClassName,
          onMouseEnter = _this$props3.onMouseEnter,
          onMouseLeave = _this$props3.onMouseLeave,
          onClick = _this$props3.onClick,
          trigger = _this$props3.trigger,
          content = _this$props3.content;

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
    }
  }]);

  return Popover;
}(external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.Component);

Popover_Popover.displayName = 'Popover';
Popover_Popover.defaultProps = {
  position: 'auto',
  gapSize: 5 // default size of the arrow (see `tooltip.less`)

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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_dropdown_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _styles_dropdown_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_dropdown_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Box =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Box, _React$Component);

  function Box(props, context) {
    var _this;

    _classCallCheck(this, Box);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Box).call(this, props, context));
    _this.state = {
      show_body: false,
      top: props.top || false
    };
    _this._handleClickOutside = _this._handleClickOutside.bind(_assertThisInitialized(_this));
    _this._setPosition = _this._setPosition.bind(_assertThisInitialized(_this));
    _this._toggleShowBody = _this._toggleShowBody.bind(_assertThisInitialized(_this));
    _this._timeout = null;
    return _this;
  }

  _createClass(Box, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('click', this._handleClickOutside, true);

      if (this._timeout) {
        clearTimeout(this._timeout);
      }
    }
  }, {
    key: "_handleClickOutside",
    value: function _handleClickOutside(event) {
      var _this2 = this;

      var dropdown_dom_node = react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(this);
      if (!dropdown_dom_node.contains(event.target)) this._toggleShowBody();else if (!this.props.allowBodyInteractions) {
        // won't close when body interactions are allowed
        this._timeout = setTimeout(function () {
          if (_this2.state.show_body) {
            _this2._toggleShowBody();
          }
        }, 100);
      }
    }
  }, {
    key: "_toggleShowBody",
    value: function _toggleShowBody() {
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
        show_body: !this.state.show_body
      });
    }
  }, {
    key: "_getTriggerComponent",
    value: function _getTriggerComponent() {
      var _trigger = this.props.children[0];
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.cloneElement(_trigger, {
        onClick: this._toggleShowBody
      });
    } // https://facebook.github.io/react/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components

  }, {
    key: "_setPosition",
    value: function _setPosition(body) {
      if (body) {
        var scrolling_parent = document.getElementById(this.props.scrolling_parent);

        if (scrolling_parent) {
          var dropdown = react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(this);
          var dropdown_vertical_position = react_dom__WEBPACK_IMPORTED_MODULE_2___default.a.findDOMNode(this).offsetTop;
          var dropdown_trigger_height = dropdown.querySelector('.trigger').clientHeight;
          var dropdown_body_height = body.clientHeight;
          var scrolling_parent_height = scrolling_parent.clientHeight;
          var scrolling_parent_offset = scrolling_parent.scrollTop;
          var bottom_offset = scrolling_parent_height + scrolling_parent_offset - dropdown_vertical_position - dropdown_trigger_height;
          var top = bottom_offset < dropdown_body_height;

          if (top !== this.state.top) {
            this.setState({
              top: top
            });
          }
        }
      }
    }
  }, {
    key: "_getBodyComponent",
    value: function _getBodyComponent() {
      if (!this.state.show_body) {
        return null;
      }

      var top = this.state.top;
      var _this$props = this.props,
          _this$props$right = _this$props.right,
          right = _this$props$right === void 0 ? false : _this$props$right,
          children = _this$props.children;
      var props = {
        top: top,
        right: right,
        setPosition: this._setPosition
      };
      var class_name = classnames__WEBPACK_IMPORTED_MODULE_4___default()({
        body_wrapper: true,
        with_arrow: true,
        top: top,
        bottom: !top
      });
      var body = children[1];
      var contentMarkup = typeof body === 'function' ? body(props) : react__WEBPACK_IMPORTED_MODULE_1___default.a.cloneElement(body, props);
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: class_name,
        style: {
          position: 'relative'
        }
      }, contentMarkup);
    }
  }, {
    key: "render",
    value: function render() {
      var className = classnames__WEBPACK_IMPORTED_MODULE_4___default()('reactist_dropdown', this.props.className);
      var top = this.state.top;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: {
          display: 'inline-block'
        },
        className: className
      }, top && this._getBodyComponent(), this._getTriggerComponent(), !top && this._getBodyComponent());
    }
  }]);

  return Box;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

Box.displayName = 'Dropdown.Box';
Box.propTypes = {
  /** Whether the dropdown should open to the top. */
  top: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Whether the dropdown should open to the right. */
  right: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Id of the scrolling parent element to place dropdown in it. */
  scrolling_parent: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** Whether to keep dropdown open when interacted with the Body content. */
  allowBodyInteractions: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** Callback function when the body is shown. */
  onShowBody: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /** Callback function when the body is hidden. */
  onHideBody: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /** Additional css class applied to the Dropdown. */
  className: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string,

  /** Should be two elements: Dropdown.Trigger and Dropdown.Body.
   * Second element can be a function, which will be called only if it is open */
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.any
};

var Trigger =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Trigger, _React$Component2);

  function Trigger(props, context) {
    var _this3;

    _classCallCheck(this, Trigger);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Trigger).call(this, props, context));
    _this3._onClick = _this3._onClick.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(Trigger, [{
    key: "_onClick",
    value: function _onClick(event) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onClick(event);
    }
  }, {
    key: "render",
    value: function render() {
      var style = {
        display: 'block'
      };
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        style: style,
        className: "trigger",
        onClick: this._onClick
      }, this.props.children);
    }
  }]);

  return Trigger;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

Trigger.displayName = 'Dropdown.Trigger';
Trigger.propTypes = {
  /** INTERNAL Callback when the trigger is clicked. Setting this yourself won't have an effect. */
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /** Content of the dropdown trigger. Can be anything from a string to component(s). */
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.any
};

var Body =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(Body, _React$Component3);

  function Body() {
    _classCallCheck(this, Body);

    return _possibleConstructorReturn(this, _getPrototypeOf(Body).apply(this, arguments));
  }

  _createClass(Body, [{
    key: "render",
    value: function render() {
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

      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        ref: this.props.setPosition,
        style: style,
        className: "body",
        id: "reactist-dropdown-body"
      }, this.props.children);
    }
  }]);

  return Body;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

Body.displayName = 'Dropdown.Body';
Body.propTypes = {
  /** INTERNAL Whether the dropdown should open to the top. Set this on the Dropdown.Box. */
  top: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** INTERNAL Whether the dropdown should open to the right. Set this on the Dropdown.Box. */
  right: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,

  /** INTERNAL Callback to correctly set the position of the dropdown. Setting this yourself wont' have an effect. */
  setPosition: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func,

  /** Content of the dropdown body. Can be anything from a string to component(s). */
  children: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.any
};
/* harmony default export */ __webpack_exports__["default"] = ({
  Box: Box,
  Trigger: Trigger,
  Body: Body
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_tooltip_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _styles_tooltip_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_tooltip_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Popover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
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







var Tooltip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tooltip)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      visible: false
    });

    _defineProperty(_assertThisInitialized(_this), "_show", function () {
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
    });

    _defineProperty(_assertThisInitialized(_this), "_hide", function () {
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
    });

    _defineProperty(_assertThisInitialized(_this), "_updateTooltipRef", function (tooltip) {
      _this.tooltip = tooltip;
    });

    _defineProperty(_assertThisInitialized(_this), "_updateWrapperRef", function (wrapper) {
      _this.wrapper = wrapper;
    });

    return _this;
  }

  _createClass(Tooltip, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      // only update on state or prop changes
      return this.state.visible !== nextState.visible || this.props.position !== nextProps.position || this.props.text !== nextProps.text || this.props.hideOnScroll !== nextProps.hideOnScroll || this.props.delayShow !== nextProps.delayShow || this.props.delayHide !== nextProps.delayHide || this.props.gapSize !== nextProps.gapSize || this.props.children !== nextProps.children;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._clearDelayTimeout();

      this._removeScrollListener();
    }
  }, {
    key: "_initScrollListener",
    value: function _initScrollListener() {
      document.addEventListener('scroll', this._hide, true);
    }
  }, {
    key: "_removeScrollListener",
    value: function _removeScrollListener() {
      document.removeEventListener('scroll', this._hide, true);
    }
  }, {
    key: "_clearDelayTimeout",
    value: function _clearDelayTimeout() {
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
    }
  }, {
    key: "_delayAction",
    value: function _delayAction(actionFn, delay) {
      this._clearDelayTimeout();

      this.delayTimeout = setTimeout(actionFn, delay);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          position = _this$props.position,
          allowVaguePositioning = _this$props.allowVaguePositioning,
          wrapperClassName = _this$props.wrapperClassName,
          tooltipClassName = _this$props.tooltipClassName,
          text = _this$props.text,
          children = _this$props.children,
          gapSize = _this$props.gapSize,
          inverted = _this$props.inverted,
          withArrow = _this$props.withArrow;
      var wrapperClass = classnames__WEBPACK_IMPORTED_MODULE_3___default()('reactist_tooltip__wrapper', wrapperClassName);
      var tooltipClass = classnames__WEBPACK_IMPORTED_MODULE_3___default()('reactist_tooltip__text', tooltipClassName, {
        inverted: inverted
      });
      var arrowClass = classnames__WEBPACK_IMPORTED_MODULE_3___default()('reactist_tooltip__arrow', {
        inverted: inverted
      });

      if (!text) {
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
          className: wrapperClass
        }, children);
      } // wrap on click of trigger to hide tooltip on click


      var trigger = react__WEBPACK_IMPORTED_MODULE_1___default.a.Children.map(children, function (child) {
        if (react__WEBPACK_IMPORTED_MODULE_1___default.a.isValidElement(child)) {
          /**
           * We can only attach click listeners to valid elements.
           * When passing in a string / number as child we cannot attach the listener.
           */
          return react__WEBPACK_IMPORTED_MODULE_1___default.a.cloneElement(child, {
            onClick: function onClick(event) {
              _this2._hide();

              if (typeof child.props.onClick === 'function') {
                child.props.onClick(event);
              }
            }
          });
        } else {
          return child;
        }
      });
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Popover__WEBPACK_IMPORTED_MODULE_4__["default"], {
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
    }
  }]);

  return Tooltip;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

Tooltip.displayName = 'Tooltip';
Tooltip.defaultProps = {
  position: 'auto',
  hideOnScroll: true,
  delayShow: 500,
  delayHide: 0,
  allowVaguePositioning: false,
  inverted: false,
  withArrow: true,
  gapSize: 5 // default size of the arrow (see `tooltip.less`)

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
  position: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOf(['auto', 'top', 'right', 'bottom', 'left', 'horizontal', 'vertical']),

  /**
   * Whether vague positioning is allowed. When set to true the tooltip prefers to be fully visible over being correctly centered.
   */
  allowVaguePositioning: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /** Text that is displayed inside the tooltip */
  text: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node]).isRequired,

  /** Set whether scrolling should hide the tooltip or not. */
  hideOnScroll: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /** How long to wait after hovering before the tooltip is shown (in ms). */
  delayShow: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,

  /** How long to wait after unhovering before the tooltip is hidden (in ms). */
  delayHide: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,

  /** Children that are wrapped by the toolip. */
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node]),

  /** Additional css class that is applied to the wrapper element. */
  wrapperClassName: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,

  /** Additional css class that is applied to the tooltip element. */
  tooltipClassName: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,

  /** Inverted tooltips have a light background with dark text. */
  inverted: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /** Gap between the tooltip wrapper and the arrow  */
  gapSize: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,

  /** Whether or not the tooltip should have a centered arrow pointing to the trigger element. */
  withArrow: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
};
/* harmony default export */ __webpack_exports__["default"] = (Tooltip);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorItem", function() { return ColorItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLORS", function() { return COLORS; });
/* harmony import */ var _styles_color_picker_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _styles_color_picker_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_color_picker_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);






var COLORS = ['#606060', '#4A90E2', '#03B3B2', '#008299', '#82BA00', '#D24726', '#AC193D', '#DC4FAD', '#3BD5FB', '#74E8D3', '#FFCC00', '#FB886E', '#CCCCCC'];

var _isNamedColor = function _isNamedColor(color) {
  return typeof color !== 'string';
};

var _getColor = function _getColor(colorList, colorIndex) {
  var index = colorIndex >= colorList.length ? 0 : colorIndex;
  return colorList[index];
};

var ColorPicker = function ColorPicker(_ref) {
  var color = _ref.color,
      small = _ref.small,
      onChange = _ref.onChange,
      _ref$colorList = _ref.colorList,
      colorList = _ref$colorList === void 0 ? COLORS : _ref$colorList;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Box, {
    right: true,
    className: "reactist_color_picker"
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Trigger, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('color_trigger', {
      small: small
    }),
    style: {
      backgroundColor: _isNamedColor(colorList[color]) ? _getColor(colorList, color).color : _getColor(colorList, color)
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "color_trigger--inner_ring"
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Body, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "color_options"
  }, colorList.reduce(function (items, currentColor, currentIndex) {
    var isNamed = _isNamedColor(currentColor);

    items.push(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ColorItem, {
      isActive: color >= colorList.length ? currentIndex === 0 : currentIndex === color,
      key: currentIndex,
      color: isNamed ? currentColor.color : currentColor,
      colorIndex: currentIndex,
      onClick: onChange,
      tooltip: isNamed ? currentColor.name : null
    }));
    return items;
  }, []))));
};

ColorPicker.displayName = 'ColorPicker';
ColorPicker.defaultProps = {
  color: 0
};
ColorPicker.propTypes = {
  /** Currently selected color. Needs to be the index of the COLORS array. */
  color: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,

  /** Callback that is invoked when a color has been selected. Is called with the index of the COLORS array. */
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /** Optional flag whether a smaller version of the color picker should be rendered. */
  small: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /** Optional list of color codes. Either as an array of strings or an array of objects with the color name. Defaults to COLORS array without names. */
  colorList: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    color: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
    name: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
  })]))
};

var ColorItem = function ColorItem(_ref2) {
  var color = _ref2.color,
      colorIndex = _ref2.colorIndex,
      isActive = _ref2.isActive,
      _onClick = _ref2.onClick,
      tooltip = _ref2.tooltip;
  var item = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: 'reactist color_item' + (isActive ? ' active' : ''),
    style: {
      backgroundColor: color
    },
    onClick: function onClick() {
      return _onClick && _onClick(colorIndex);
    }
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "color_item--inner_ring"
  }));
  return tooltip ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], {
    text: tooltip
  }, item) : item;
};

ColorItem.displayName = 'ColorItem';
ColorItem.propTypes = {
  /** The color of the ColorItem as string. */
  color: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,

  /** Index of the color to display. Is based upon the colorList array. */
  colorIndex: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number.isRequired,

  /** Flag that can be used to highlight the currently selected item. */
  isActive: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /** Optional callback that is called when the item is clicked. */
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /** Optional tooltip to be shown when hovering the item. */
  tooltip: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (ColorPicker);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
});