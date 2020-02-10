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
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
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

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/components/styles/avatar.less
var avatar = __webpack_require__(12);

// EXTERNAL MODULE: external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"}
var external_root_React_commonjs2_react_commonjs_react_amd_react_ = __webpack_require__(1);
var external_root_React_commonjs2_react_commonjs_react_amd_react_default = /*#__PURE__*/__webpack_require__.n(external_root_React_commonjs2_react_commonjs_react_amd_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(0);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "classnames"
var external_classnames_ = __webpack_require__(2);
var external_classnames_default = /*#__PURE__*/__webpack_require__.n(external_classnames_);

// CONCATENATED MODULE: ./src/components/utils/TextUtils.js
var getInitials = function getInitials(name) {
  if (!name) {
    return '';
  }

  var seed = name.trim().split(' ');
  var first_initial = seed[0];
  var last_initial = seed[seed.length - 1];
  var initials = first_initial[0];

  if (first_initial[0] !== last_initial[0]) {
    initials += last_initial[0];
  }

  return initials.toUpperCase();
};

var emailToIndex = function emailToIndex(email, maxIndex) {
  var seed = email.split('@')[0];
  var hash = seed.charCodeAt(0) + seed.charCodeAt(seed.length - 1) || 0;
  return hash % maxIndex;
};


// CONCATENATED MODULE: ./src/components/Avatar.jsx





var AVATAR_COLORS = ['#fcc652', '#e9952c', '#e16b2d', '#d84b40', '#e8435a', '#e5198a', '#ad3889', '#86389c', '#a8a8a8', '#98be2f', '#5d9d50', '#5f9f85', '#5bbcb6', '#32a3bf', '#2bafeb', '#2d88c3', '#3863cc', '#5e5e5e'];
var AVATAR_SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];

var Avatar_Avatar = function Avatar(_ref) {
  var user = _ref.user,
      avatarUrl = _ref.avatarUrl,
      size = _ref.size,
      className = _ref.className,
      _ref$colorList = _ref.colorList,
      colorList = _ref$colorList === void 0 ? AVATAR_COLORS : _ref$colorList;
  var userInitials = getInitials(user.name) || getInitials(user.email);
  var avatarSize = AVATAR_SIZES.includes(size) ? size : 'l';
  var avatarClass = external_classnames_default()("reactist_avatar reactist_avatar_size--".concat(avatarSize), className);
  var style = avatarUrl ? {
    backgroundImage: "url(".concat(avatarUrl, ")"),
    textIndent: '-9999px' // hide the initials

  } : {
    backgroundColor: colorList[emailToIndex(user.email, colorList.length)]
  };
  return external_root_React_commonjs2_react_commonjs_react_amd_react_default.a.createElement("div", {
    className: avatarClass,
    style: style
  }, userInitials);
};

Avatar_Avatar.displayName = 'Avatar';
Avatar_Avatar.defaultProps = {
  size: 'l'
};
Avatar_Avatar.propTypes = {
  /** Minimal required user shape for the avatar. */
  user: external_prop_types_default.a.shape({
    /** Name of the user. */
    name: external_prop_types_default.a.string,

    /** Email of the user. Used to calculate avatar color and as fallback in case name is not set. */
    email: external_prop_types_default.a.string
  }).isRequired,

  /** URL of the avatar image. In case nothing is set a colored circle with the user's initials is displayed. */
  avatarUrl: external_prop_types_default.a.string,

  /** Size of the Avatar between XXS and XXXL. */
  size: external_prop_types_default.a.oneOf(AVATAR_SIZES),

  /** Additional css class applied to the avatar. */
  className: external_prop_types_default.a.string,

  /** Optional list of color codes used as fallback when image not available. Defaults to AVATAR_COLORS array. */
  colorList: external_prop_types_default.a.arrayOf(external_prop_types_default.a.string)
};
/* harmony default export */ var components_Avatar = __webpack_exports__["default"] = (Avatar_Avatar);

/***/ })

/******/ });
});