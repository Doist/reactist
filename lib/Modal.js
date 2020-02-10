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

/***/ 2:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/components/styles/modal.less
var modal = __webpack_require__(31);

// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(1);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);

// EXTERNAL MODULE: external {"root":"ReactDOM","commonjs2":"react-dom","commonjs":"react-dom","amd":"react-dom"}
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_ = __webpack_require__(3);
var external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(2);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// CONCATENATED MODULE: ./src/components/icons/CloseIcon.svg.jsx


var CloseIcon_svg_CloseIcon = function CloseIcon() {
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

/* harmony default export */ var CloseIcon_svg = (CloseIcon_svg_CloseIcon);
// CONCATENATED MODULE: ./src/components/Modal.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Modal_Box =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Box, _React$Component);

  function Box(props, context) {
    var _this;

    _classCallCheck(this, Box);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Box).call(this, props, context));
    _this._handleKeyDown = _this._handleKeyDown.bind(_assertThisInitialized(_this));
    _this._closeModal = _this._closeModal.bind(_assertThisInitialized(_this));
    _this._handleOverlayClick = _this._handleOverlayClick.bind(_assertThisInitialized(_this));
    window.addEventListener('keydown', _this._handleKeyDown);
    window.addEventListener('click', _this._handleOverlayClick);
    return _this;
  }

  _createClass(Box, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this._handleKeyDown);
      window.removeEventListener('click', this._handleOverlayClick);
    }
  }, {
    key: "_closeModal",
    value: function _closeModal() {
      external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default.a.unmountComponentAtNode(document.getElementById('modal_box'));
    }
  }, {
    key: "_handleKeyDown",
    value: function _handleKeyDown(event) {
      if (event.keyCode === 27) {
        // ESC
        this._closeModal();

        event.preventDefault();
      }
    }
  }, {
    key: "_handleOverlayClick",
    value: function _handleOverlayClick(event) {
      if (this.props.closeOnOverlayClick && event && event.target && (event.target.id === 'reactist-overlay' || event.target.id === 'reactist-overlay-inner')) {
        this._closeModal();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          large = _this$props.large,
          medium = _this$props.medium,
          style = _this$props.style,
          children = _this$props.children;
      var className = external_classnames_default()('reactist_modal_box', {
        large: large,
        medium: medium
      }, this.props.className);
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
        className: "reactist_overlay",
        id: "reactist-overlay"
      }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
        className: "reactist_overlay_inner",
        id: "reactist-overlay-inner"
      }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
        style: style,
        className: className
      }, children)));
    }
  }]);

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
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Header, _React$Component2);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "_closeModal",
    value: function _closeModal(event) {
      event.preventDefault();

      if (typeof this.props.beforeClose === 'function') {
        this.props.beforeClose();
      }

      external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default.a.unmountComponentAtNode(document.getElementById('modal_box'));
    }
  }, {
    key: "render",
    value: function render() {
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
        className: "reactist_modal_box__header"
      }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("p", null, this.props.title && external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("span", {
        className: "title"
      }, this.props.title), this.props.subtitle && external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("span", {
        className: "subtitle"
      }, this.props.subtitle), this.props.children), external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("a", {
        className: "close",
        onClick: this._closeModal.bind(this),
        href: "#"
      }, external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement(CloseIcon_svg, null)));
    }
  }]);

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
/*#__PURE__*/
function (_React$Component3) {
  _inherits(Body, _React$Component3);

  function Body() {
    _classCallCheck(this, Body);

    return _possibleConstructorReturn(this, _getPrototypeOf(Body).apply(this, arguments));
  }

  _createClass(Body, [{
    key: "_closeModal",
    value: function _closeModal(event) {
      event.preventDefault();
      external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default.a.unmountComponentAtNode(document.getElementById('modal_box'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          icon = _this$props2.icon,
          plain = _this$props2.plain,
          children = _this$props2.children,
          style = _this$props2.style,
          showCloseIcon = _this$props2.showCloseIcon;
      var className = external_classnames_default()('reactist_modal_box__body', {
        plain: plain
      }, this.props.className);
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
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
      }, children)) : children);
    }
  }]);

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

var Modal_Actions =
/*#__PURE__*/
function (_React$Component4) {
  _inherits(Actions, _React$Component4);

  function Actions() {
    _classCallCheck(this, Actions);

    return _possibleConstructorReturn(this, _getPrototypeOf(Actions).apply(this, arguments));
  }

  _createClass(Actions, [{
    key: "_onClick",
    value: function _onClick(on_click) {
      if (typeof on_click === 'function') {
        on_click();
      }

      external_root_ReactDOM_commonjs2_react_dom_commonjs_react_dom_amd_react_dom_default.a.unmountComponentAtNode(document.getElementById('modal_box'));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var children = external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.Children.map(this.props.children, function (child) {
        if (!child) return false;

        if (child.props.close) {
          return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.cloneElement(child, {
            onClick: function onClick() {
              return _this2._onClick(child.props.onClick);
            }
          });
        } else {
          return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.cloneElement(child);
        }
      });
      return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
        className: "reactist_modal_box__actions"
      }, children);
    }
  }]);

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