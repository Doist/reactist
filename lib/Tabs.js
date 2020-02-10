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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
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

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tabs", function() { return Tabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab", function() { return Tab; });
/* harmony import */ var _styles_tabs_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39);
/* harmony import */ var _styles_tabs_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_tabs_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
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






var Tabs =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs(props, context) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabs).call(this, props, context));

    _defineProperty(_assertThisInitialized(_this), "_switchActiveTab", function (tab, i) {
      _this.setState(function () {
        return {
          activeTabIndex: i
        };
      });

      if (_this.props.onChange) _this.props.onChange(tab.props.value);
    });

    _defineProperty(_assertThisInitialized(_this), "_renderTabLinks", function (tabs) {
      return tabs.map(function (t, i) {
        var _t$props = t.props,
            title = _t$props.title,
            disabled = _t$props.disabled;
        var value = t.props.value || i;
        var className = classnames__WEBPACK_IMPORTED_MODULE_3___default()('reactist_tabs__header--item', {
          disabled: disabled,
          active: i === _this.state.activeTabIndex
        });
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
          className: className,
          href: "",
          key: value,
          onClick: function onClick(event) {
            event.preventDefault();

            if (!disabled) {
              _this._switchActiveTab(t, i);
            }
          }
        }, title);
      });
    });

    var defaultTab = props.defaultTab,
        onChange = props.onChange;
    var children = react__WEBPACK_IMPORTED_MODULE_1___default.a.Children.toArray(_this.props.children);
    var hasDefault = defaultTab || defaultTab === 0;

    if (hasDefault || onChange) {
      var missing = children.find(function (c) {
        return !c.props.value && c.props.value !== 0;
      });
      if (missing) throw new Error('(Tab) Missing property: all Tab must have "value" set if "defaultTab" or "onChange" is used');
    }

    if (hasDefault) {
      var i = children.findIndex(function (x) {
        return x.props.value === defaultTab;
      });
      if (i === -1) throw new Error("(Tabs) Unable to find Tab with the matching defaultTab value \"".concat(defaultTab, "\""));
      _this.state = {
        activeTabIndex: i
      };
    } else {
      _this.state = {
        activeTabIndex: 0
      };
    }

    return _this;
  }

  _createClass(Tabs, [{
    key: "render",
    value: function render() {
      // ensures that single or no child components don't throw
      var children = react__WEBPACK_IMPORTED_MODULE_1___default.a.Children.toArray(this.props.children);
      var activeTab = children[this.state.activeTabIndex] || children[0] || null;
      var cls = classnames__WEBPACK_IMPORTED_MODULE_3___default()('reactist_tabs', this.props.spreadLayout ? 'tabs--spreadlayout' : null);
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: cls
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "reactist_tabs__header"
      }, this._renderTabLinks(children)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "reactist_tabs__body"
      }, activeTab));
    }
  }]);

  return Tabs;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

Tabs.displayName = 'Tabs';
Tabs.propTypes = {
  /** selects the tab whose value prop matches this prop */
  defaultTab: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number]),

  /** Whether the tabs should take all available space and distribute it evenly or use the minimum required **/
  spreadLayout: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /** Callback for tab change event. Tab value will be passed */
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,

  /** Children of the Tabs component. Most commonly an array of Tab components. */
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any
};
Tabs.defaultProps = {
  spreadLayout: false
};

var Tab = function Tab(_ref) {
  var children = _ref.children,
      className = _ref.className;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('reactist_tabs__tab', className)
  }, children);
};

Tab.displayName = 'Tab';
Tab.defaultProps = {
  disabled: false
};
Tab.propTypes = {
  /* It assigns a value to the tab so that it can be selected by the Tabs.*/
  value: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number]),

  /** Title of the tab. */
  title: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,

  /** Disabled tabs can't be selected. */
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,

  /** Additional css class applied to Tab. */
  className: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,

  /** Children of the Tab component. Can be a simple string or other component(s). */
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.any
};


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
});