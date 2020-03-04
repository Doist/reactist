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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* 3 */,
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
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
});