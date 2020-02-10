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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
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

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuButton", function() { return MenuButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuButtonItem", function() { return MenuButtonItem; });
/* harmony import */ var _styles_menu_button_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
/* harmony import */ var _styles_menu_button_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_menu_button_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);






var MenuButton = function MenuButton(_ref) {
  var className = _ref.className,
      name = _ref.name,
      onClick = _ref.onClick,
      children = _ref.children;
  var menuButtonClass = classnames__WEBPACK_IMPORTED_MODULE_3___default()('reactist_menu_button', className);

  if (!children || children.length === 0) {
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: menuButtonClass,
      onClick: onClick
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "reactist_menu_button_trigger"
    }, name));
  }

  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Box, {
    className: menuButtonClass
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Trigger, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
    className: "reactist_menu_button_trigger"
  }, name)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Dropdown__WEBPACK_IMPORTED_MODULE_4__["default"].Body, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "reactist_menu_button_items"
  }, children)));
};

MenuButton.displayName = 'MenuButton';
MenuButton.propTypes = {
  /** Name that is displayed as trigger of the MenuButton.  */
  name: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node]),

  /** When not providing any children you can control what happens when the MenuButton is clicked. */
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /** Children are displayed as items after clicking on the MenuButton. */
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node),

  /** Additional css class applied to the MenuButton. */
  className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};

var MenuButtonItem = function MenuButtonItem(_ref2) {
  var className = _ref2.className,
      onClick = _ref2.onClick,
      children = _ref2.children;
  var menuButtonItemClass = classnames__WEBPACK_IMPORTED_MODULE_3___default()('reactist_menu_button_item', className);
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: menuButtonItemClass,
    onClick: onClick
  }, children);
};

MenuButtonItem.displayName = 'MenuButtonItem';
MenuButtonItem.propTypes = {
  /** Callback when MenuButtonItem is clicked. */
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /** Content of the MenuButtonItem. */
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node)]),

  /** Additional css class applied to the MenuButtonItem. */
  className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string
};


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 5:
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

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
});