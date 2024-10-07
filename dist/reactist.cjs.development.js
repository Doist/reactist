'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var classNames = require('classnames');
var flattenChildren = require('react-keyed-flatten-children');
var react = require('@ariakit/react');
var useCallbackRef = require('use-callback-ref');
var FocusLock = require('react-focus-lock');
var ariaHidden = require('aria-hidden');
var ReactDOM = require('react-dom');
var dayjs = require('dayjs');
var LocalizedFormat = require('dayjs/plugin/localizedFormat');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return n;
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var classNames__default = /*#__PURE__*/_interopDefaultLegacy(classNames);
var flattenChildren__default = /*#__PURE__*/_interopDefaultLegacy(flattenChildren);
var FocusLock__default = /*#__PURE__*/_interopDefaultLegacy(FocusLock);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);
var LocalizedFormat__default = /*#__PURE__*/_interopDefaultLegacy(LocalizedFormat);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A wrapper to use React.forwardRef with polymorphic components in a type-safe manner. This is a
 * convenience over merely using React.forwardRef directly, and then manually forcing the resulting
 * value to be typed using `as PolymorphicComponent<…>`.
 *
 * @deprecated Use Ariakit's composition instead (https://ariakit.org/guide/composition)
 */

function polymorphicComponent(render) {
  return /*#__PURE__*/React__namespace.forwardRef(render);
}

/**
 * Builds a css module class name for a given prop + prop-value combination.
 *
 * We have a convention of building the internal utility-based class names system in a way that
 * resembles the prop for which it is used and the value of the prop. For instance, in a component
 * with a prop `width` with possible values `narrow` and `wide`, we encode the styles for each of
 * these alternatives in the class-names `.width-narrow` and `.width-wide`.
 *
 * Furthermore, this helper is aware of responsive prop values. For instance, if you provide the
 * `width` prop above with the value `['narrow', 'wide']` this returns `['narrow', 'tablet-wide']`.
 * That is, it returns an array of class names, following the same convention above, but also
 * prefixing by the viewport width variant (`tablet-` or `desktop-`).
 *
 * @param styles the class names mapping imported from a css module
 * @param property the prop name
 * @param value the given prop's value
 */

function getClassNames(styles, property, value) {
  if (!value) {
    return null;
  }

  const classList = [];

  if (typeof value === 'string') {
    classList.push(styles[property + "-" + value]);
  } else {
    if (value.mobile) classList.push(styles[property + "-" + value.mobile]);
    if (value.tablet) classList.push(styles["tablet-" + property + "-" + value.tablet]);
    if (value.desktop) classList.push(styles["desktop-" + property + "-" + value.desktop]);
  }

  if (!classList.every(Boolean)) {
    // eslint-disable-next-line no-console
    console.warn('Not all generated class names were found', {
      property,
      value,
      classList
    });
  }

  return classList;
}
/**
 * A mapping over a responsive prop value.
 *
 * Since response values can be an object but also a scalar value, this helper makes it easier to
 * to map the values when it's an object but keeps it consistent for the case when it is a scalar
 * value as well.
 *
 * @param fromValue the responsive prop value
 * @param mapper the mapping function
 */


function mapResponsiveProp(fromValue, mapper) {
  if (!fromValue) {
    return undefined;
  }

  if (typeof fromValue !== 'object') {
    return mapper(fromValue);
  }

  return {
    mobile: fromValue.mobile ? mapper(fromValue.mobile) : undefined,
    tablet: fromValue.tablet ? mapper(fromValue.tablet) : undefined,
    desktop: fromValue.desktop ? mapper(fromValue.desktop) : undefined
  };
}

var modules_54d944f2 = {"box":"fb8d74bb","position-absolute":"_18f74af9","position-fixed":"b292fef1","position-relative":"e4e217d4","position-sticky":"_66895b64","tablet-position-absolute":"_00e8a0ce","tablet-position-fixed":"efaf64be","tablet-position-relative":"_76e540fd","tablet-position-sticky":"bd286900","desktop-position-absolute":"_09e9f472","desktop-position-fixed":"_893383f1","desktop-position-relative":"dea3890d","desktop-position-sticky":"_6a61c94d","display-block":"_64dcc902","display-flex":"_14423c92","display-inline":"_6a38242d","display-inlineBlock":"_348efc1f","display-inlineFlex":"_150907c8","display-none":"_3da48ad6","tablet-display-block":"_0daac9f2","tablet-display-flex":"f62c43b1","tablet-display-inline":"_5839a4e4","tablet-display-inlineBlock":"_8068aaf2","tablet-display-inlineFlex":"_76562ea5","tablet-display-none":"_4f7a886f","desktop-display-block":"_4fd4b789","desktop-display-flex":"_4d08e78f","desktop-display-inline":"_0da15585","desktop-display-inlineBlock":"d0fcc019","desktop-display-inlineFlex":"_79f967d4","desktop-display-none":"_2ffa0d03","flexDirection-column":"_2d7320f2","flexDirection-row":"_5f8879d9","tablet-flexDirection-column":"_2c919a43","tablet-flexDirection-row":"_4da1f194","desktop-flexDirection-column":"_66fd35ea","desktop-flexDirection-row":"_4b79448d","flexWrap-wrap":"_202b0c8c","flexWrap-nowrap":"_45a8f27f","flexShrink-0":"_7d9ec5b0","flexGrow-0":"_9ce442fb","flexGrow-1":"c3b69d70","alignItems-flexStart":"_7cc6458c","alignItems-center":"b76144ce","alignItems-flexEnd":"e42ffab4","alignItems-baseline":"_3975b234","tablet-alignItems-flexStart":"b670f77e","tablet-alignItems-center":"_976e7156","tablet-alignItems-flexEnd":"_385c60b1","tablet-alignItems-baseline":"_52b577fc","desktop-alignItems-flexStart":"_2e1cc27f","desktop-alignItems-center":"_3a9e51e9","desktop-alignItems-flexEnd":"dfc189b2","desktop-alignItems-baseline":"_5fabaec4","justifyContent-flexStart":"a65d9c55","justifyContent-center":"b4e05554","justifyContent-flexEnd":"f76804e6","justifyContent-spaceAround":"_0095203e","justifyContent-spaceBetween":"_6eb365d1","justifyContent-spaceEvenly":"_4111e641","tablet-justifyContent-flexStart":"_6fda855d","tablet-justifyContent-center":"c2d359f8","tablet-justifyContent-flexEnd":"e271941d","tablet-justifyContent-spaceAround":"_2321488d","tablet-justifyContent-spaceBetween":"e4a9b2e3","tablet-justifyContent-spaceEvenly":"bdc232f2","desktop-justifyContent-flexStart":"_0d16bb5c","desktop-justifyContent-center":"eca8082a","desktop-justifyContent-flexEnd":"_97ea6bb7","desktop-justifyContent-spaceBetween":"_58e61602","alignSelf-stretch":"_794c8ab8","alignSelf-flexStart":"c510efd5","alignSelf-center":"b3f71626","alignSelf-flexEnd":"_13771d73","alignSelf-baseline":"_64318454","tablet-alignSelf-stretch":"_309c6ba7","tablet-alignSelf-flexStart":"_92dfd036","tablet-alignSelf-center":"_811f9906","tablet-alignSelf-flexEnd":"_2cd2336e","tablet-alignSelf-baseline":"bd2c9dad","desktop-alignSelf-stretch":"d8215926","desktop-alignSelf-flexStart":"b78f5c06","desktop-alignSelf-center":"_683e0cdb","desktop-alignSelf-flexEnd":"_489f1dc8","desktop-alignSelf-baseline":"_4aca1032","overflow-hidden":"_68aab614","overflow-auto":"ac28a3b1","overflow-visible":"_50b88b52","overflow-scroll":"c2fdd1c1","height-full":"_75ca308a","bg-default":"a9ca9830","bg-aside":"b9ff0c93","bg-highlight":"efc303e5","bg-selected":"ec657626","bg-toast":"_00d3482f","borderRadius-standard":"_958da546","borderRadius-full":"_79077c62","border-primary":"_68981e89","border-secondary":"_2bda8f7a","border-tertiary":"_7152c573","textAlign-start":"_1f362dec","textAlign-center":"_1c09cd18","textAlign-end":"b9663f5e","textAlign-justify":"a0eba489","tablet-textAlign-start":"_60b9abf8","tablet-textAlign-center":"_2c70943c","tablet-textAlign-end":"a512d4e1","tablet-textAlign-justify":"_5d02c334","desktop-textAlign-start":"ad2496a1","desktop-textAlign-center":"ee87b016","desktop-textAlign-end":"_6dd48127","desktop-textAlign-justify":"_1e70d216"};

var modules_b537a8ee = {"paddingTop-xsmall":"c4803194","paddingTop-small":"_4e9ab24b","paddingTop-medium":"_1d226e27","paddingTop-large":"eb6097f1","paddingTop-xlarge":"d3229ba4","paddingTop-xxlarge":"_47978ba4","tablet-paddingTop-xsmall":"f987719c","tablet-paddingTop-small":"_8dbc4b4d","tablet-paddingTop-medium":"ae44fe07","tablet-paddingTop-large":"ffe9548d","tablet-paddingTop-xlarge":"f2b76a44","tablet-paddingTop-xxlarge":"c6eb8f43","desktop-paddingTop-xsmall":"_8699b560","desktop-paddingTop-small":"_02c374b7","desktop-paddingTop-medium":"_0dd0332f","desktop-paddingTop-large":"da55f1f6","desktop-paddingTop-xlarge":"_8ef2a278","desktop-paddingTop-xxlarge":"_8b493b28","paddingRight-xsmall":"_211eebc7","paddingRight-small":"ad0ccf15","paddingRight-medium":"a03e39af","paddingRight-large":"f0941ead","paddingRight-xlarge":"e47c5a43","paddingRight-xxlarge":"e849a5cf","tablet-paddingRight-xsmall":"_85374228","tablet-paddingRight-small":"_89df37b9","tablet-paddingRight-medium":"_1cc50ebe","tablet-paddingRight-large":"_1060982b","tablet-paddingRight-xlarge":"be58847d","tablet-paddingRight-xxlarge":"_45093484","desktop-paddingRight-xsmall":"f8d99d6a","desktop-paddingRight-small":"efa076d9","desktop-paddingRight-medium":"e59caa64","desktop-paddingRight-large":"da42f46a","desktop-paddingRight-xlarge":"b3ee2580","desktop-paddingRight-xxlarge":"_3ef94658","paddingBottom-xsmall":"b0e6eab4","paddingBottom-small":"_9510d053","paddingBottom-medium":"d7af60c9","paddingBottom-large":"b75f86cd","paddingBottom-xlarge":"fbd4ce29","paddingBottom-xxlarge":"_33e3ad63","tablet-paddingBottom-xsmall":"f0302da7","tablet-paddingBottom-small":"_4f9b8012","tablet-paddingBottom-medium":"_4333e20e","tablet-paddingBottom-large":"_30bbc76c","tablet-paddingBottom-xlarge":"ba5a4008","tablet-paddingBottom-xxlarge":"_423a3b1a","desktop-paddingBottom-xsmall":"b40139b7","desktop-paddingBottom-small":"f96071fa","desktop-paddingBottom-medium":"fe803c9a","desktop-paddingBottom-large":"_01686eb9","desktop-paddingBottom-xlarge":"afa763d8","desktop-paddingBottom-xxlarge":"a95785f1","paddingLeft-xsmall":"cad4e2ec","paddingLeft-small":"d70b3c17","paddingLeft-medium":"_8c851bd6","paddingLeft-large":"_078feb3c","paddingLeft-xlarge":"_76ab968c","paddingLeft-xxlarge":"aaca85d7","tablet-paddingLeft-xsmall":"_5eb0e5aa","tablet-paddingLeft-small":"_0384fb4f","tablet-paddingLeft-medium":"edffff6f","tablet-paddingLeft-large":"_873b9a46","tablet-paddingLeft-xlarge":"_89105db5","tablet-paddingLeft-xxlarge":"db1966fe","desktop-paddingLeft-xsmall":"b17f826b","desktop-paddingLeft-small":"_6dc83610","desktop-paddingLeft-medium":"_3421b8b2","desktop-paddingLeft-large":"_68cec7a6","desktop-paddingLeft-xlarge":"_94bde020","desktop-paddingLeft-xxlarge":"b94ee579"};

var modules_131405ac = {"marginTop-xsmall":"c7813d79","marginTop-small":"d3449da6","marginTop-medium":"_4ea254c1","marginTop-large":"c0844f64","marginTop-xlarge":"_213145b4","marginTop-xxlarge":"df61c84c","marginTop--xsmall":"efe72b13","marginTop--small":"_870c2768","marginTop--medium":"_0b927c57","marginTop--large":"_461db014","marginTop--xlarge":"_2a3a8cb8","marginTop--xxlarge":"_9bcda921","tablet-marginTop-xsmall":"_6add01e4","tablet-marginTop-small":"_735ef86b","tablet-marginTop-medium":"_0477d068","tablet-marginTop-large":"_2c90af97","tablet-marginTop-xlarge":"_63a82db6","tablet-marginTop-xxlarge":"_03cd7726","tablet-marginTop--xsmall":"c986a62a","tablet-marginTop--small":"be2bdcdd","tablet-marginTop--medium":"_47d2686b","tablet-marginTop--large":"_25e5af9d","tablet-marginTop--xlarge":"ee82f441","tablet-marginTop--xxlarge":"a6f9d404","desktop-marginTop-xsmall":"_4d8d9a36","desktop-marginTop-small":"e813cee7","desktop-marginTop-medium":"_56975b7d","desktop-marginTop-large":"_53b367f6","desktop-marginTop-xlarge":"d69e7311","desktop-marginTop-xxlarge":"_92f57c7e","desktop-marginTop--xsmall":"_96880d3e","desktop-marginTop--small":"dc3f3555","desktop-marginTop--medium":"_86dd06bb","desktop-marginTop--large":"c93ef12e","desktop-marginTop--xlarge":"bc8fd4a2","desktop-marginTop--xxlarge":"b12a9124","marginRight-xsmall":"_6016f4fb","marginRight-small":"b85e3dfa","marginRight-medium":"_297575f4","marginRight-large":"b401ac6c","marginRight-xlarge":"dc3ec387","marginRight-xxlarge":"_24694604","marginRight--xsmall":"_8e9bf2ee","marginRight--small":"ae9d1115","marginRight--medium":"_14e46fc3","marginRight--large":"_3370631b","marginRight--xlarge":"_3f0e9b50","marginRight--xxlarge":"bc13e010","tablet-marginRight-xsmall":"_6fa1aae3","tablet-marginRight-small":"_2976c5cb","tablet-marginRight-medium":"_38d94802","tablet-marginRight-large":"db9569b5","tablet-marginRight-xlarge":"_4a52f06d","tablet-marginRight-xxlarge":"_8a0f0410","tablet-marginRight--xsmall":"e7d40e9d","tablet-marginRight--small":"_680fde91","tablet-marginRight--medium":"_021010ca","tablet-marginRight--large":"_9e52c87c","tablet-marginRight--xlarge":"_4d602613","tablet-marginRight--xxlarge":"_21b1b65a","desktop-marginRight-xsmall":"_7321bc07","desktop-marginRight-small":"fa1721f4","desktop-marginRight-medium":"_3fd7b4b8","desktop-marginRight-large":"_4fdc2f74","desktop-marginRight-xlarge":"c0254761","desktop-marginRight-xxlarge":"_710a5f09","desktop-marginRight--xsmall":"e08bee7f","desktop-marginRight--small":"e5ab73d2","desktop-marginRight--medium":"_5e731477","desktop-marginRight--large":"_0f57a22e","desktop-marginRight--xlarge":"_25f26ed3","desktop-marginRight--xxlarge":"_11a3b4e0","marginBottom-xsmall":"_6a4f69f7","marginBottom-small":"db26b033","marginBottom-medium":"c7313022","marginBottom-large":"a5885889","marginBottom-xlarge":"_33dfbd8e","marginBottom-xxlarge":"_795ad2de","marginBottom--xsmall":"a329dbd3","marginBottom--small":"_85e739fb","marginBottom--medium":"_681f65ff","marginBottom--large":"caf50d8f","marginBottom--xlarge":"_1e084cbf","marginBottom--xxlarge":"_3dfb1c7e","tablet-marginBottom-xsmall":"ef4735be","tablet-marginBottom-small":"de55afba","tablet-marginBottom-medium":"_0e33ce88","tablet-marginBottom-large":"_8ca391fc","tablet-marginBottom-xlarge":"_3a609d23","tablet-marginBottom-xxlarge":"_3e1177e4","tablet-marginBottom--xsmall":"d384884d","tablet-marginBottom--small":"_75254cec","tablet-marginBottom--medium":"_5d9f127d","tablet-marginBottom--large":"_835f1089","tablet-marginBottom--xlarge":"dad52a72","tablet-marginBottom--xxlarge":"_8703a4bf","desktop-marginBottom-xsmall":"_90fd20e9","desktop-marginBottom-small":"f3769191","desktop-marginBottom-medium":"_156410f8","desktop-marginBottom-large":"_7fed74d0","desktop-marginBottom-xlarge":"_477dc10e","desktop-marginBottom-xxlarge":"_85c82d89","desktop-marginBottom--xsmall":"_4f09c1e0","desktop-marginBottom--small":"_9523e048","desktop-marginBottom--medium":"efe10240","desktop-marginBottom--large":"c43971e6","desktop-marginBottom--xlarge":"f9b4da15","desktop-marginBottom--xxlarge":"a10fdf70","marginLeft-xsmall":"f9be90b4","marginLeft-small":"f53218d5","marginLeft-medium":"c4a9b3ab","marginLeft-large":"_5755e2c3","marginLeft-xlarge":"_33fc9354","marginLeft-xxlarge":"_4749a3bf","marginLeft--xsmall":"c76cb3c7","marginLeft--small":"_96003c07","marginLeft--medium":"_09988d07","marginLeft--large":"b4a486f6","marginLeft--xlarge":"f396e75e","marginLeft--xxlarge":"_81d1f26d","tablet-marginLeft-xsmall":"_0a46e8f1","tablet-marginLeft-small":"_57c970af","tablet-marginLeft-medium":"_4b6099d3","tablet-marginLeft-large":"_378fcff5","tablet-marginLeft-xlarge":"f8785663","tablet-marginLeft-xxlarge":"_72f957ee","tablet-marginLeft--xsmall":"_2288c7e1","tablet-marginLeft--small":"b27c1c05","tablet-marginLeft--medium":"_702cbb13","tablet-marginLeft--large":"_1a2748b4","tablet-marginLeft--xlarge":"b8c043a5","tablet-marginLeft--xxlarge":"_8dc8ff63","desktop-marginLeft-xsmall":"c2af646d","desktop-marginLeft-small":"c03d07be","desktop-marginLeft-medium":"_915fb1d3","desktop-marginLeft-large":"_64214ee1","desktop-marginLeft-xlarge":"_7be4a22c","desktop-marginLeft-xxlarge":"_5ec0a401","desktop-marginLeft--xsmall":"ea29f1ee","desktop-marginLeft--small":"c26652c7","desktop-marginLeft--medium":"c24f6af9","desktop-marginLeft--large":"c2671f27","desktop-marginLeft--xlarge":"cc51a04e","desktop-marginLeft--xxlarge":"fd581f54"};

var modules_89b7671c = {"minWidth-0":"_68ab48ca","minWidth-xsmall":"_6fa2b565","minWidth-small":"dd50fabd","minWidth-medium":"e7e2c808","minWidth-large":"_6abbe25e","minWidth-xlarge":"_54f479ac","maxWidth-xsmall":"_148492bc","maxWidth-small":"bd023b96","maxWidth-medium":"e102903f","maxWidth-large":"_0e8d76d7","maxWidth-xlarge":"_47a031d0","maxWidth-full":"cd4c8183","width-0":"_5f5959e8","width-full":"_8c75067a","width-auto":"_56a651f6","width-maxContent":"_26f87bb8","width-minContent":"_07a6ab44","width-fitContent":"a87016fa","width-xsmall":"_1a972e50","width-small":"c96d8261","width-medium":"f3829d42","width-large":"_2caef228","width-xlarge":"_069e1491"};

var modules_8b5c09cb = {"gap-none":"_64ed24f4","gap-xsmall":"_2580a74b","gap-small":"c68f8bf6","gap-medium":"_43e5f8e9","gap-large":"_966b120f","gap-xlarge":"f957894c","gap-xxlarge":"_8cca104b","tablet-gap-none":"_5797cee2","tablet-gap-xsmall":"_9015672f","tablet-gap-small":"_7ec86eec","tablet-gap-medium":"_714d7179","tablet-gap-large":"ae1deb59","tablet-gap-xlarge":"e1cfce55","tablet-gap-xxlarge":"_168a8ff8","desktop-gap-none":"_43e2b619","desktop-gap-xsmall":"_0ea9bf88","desktop-gap-small":"d451307a","desktop-gap-medium":"bf93cf66","desktop-gap-large":"_1430cddf","desktop-gap-xlarge":"fa00c93e","desktop-gap-xxlarge":"_6f3aee54"};

const _excluded$v = ["as", "position", "display", "flexDirection", "flexWrap", "flexGrow", "flexShrink", "gap", "alignItems", "justifyContent", "alignSelf", "overflow", "width", "height", "background", "border", "borderRadius", "minWidth", "maxWidth", "textAlign", "padding", "paddingY", "paddingX", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "margin", "marginY", "marginX", "marginTop", "marginRight", "marginBottom", "marginLeft", "className", "children"];

function getBoxClassNames({
  position = 'static',
  display,
  flexDirection = 'row',
  flexWrap,
  flexGrow,
  flexShrink,
  gap,
  alignItems,
  justifyContent,
  alignSelf,
  overflow,
  width,
  height,
  background,
  border,
  borderRadius,
  minWidth,
  maxWidth,
  textAlign,
  padding,
  paddingY,
  paddingX,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  margin,
  marginY,
  marginX,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  className
}) {
  var _ref, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;

  const resolvedPaddingTop = (_ref = paddingTop != null ? paddingTop : paddingY) != null ? _ref : padding;
  const resolvedPaddingRight = (_ref2 = paddingRight != null ? paddingRight : paddingX) != null ? _ref2 : padding;
  const resolvedPaddingBottom = (_ref3 = paddingBottom != null ? paddingBottom : paddingY) != null ? _ref3 : padding;
  const resolvedPaddingLeft = (_ref4 = paddingLeft != null ? paddingLeft : paddingX) != null ? _ref4 : padding;
  const resolvedMarginTop = (_ref5 = marginTop != null ? marginTop : marginY) != null ? _ref5 : margin;
  const resolvedMarginRight = (_ref6 = marginRight != null ? marginRight : marginX) != null ? _ref6 : margin;
  const resolvedMarginBottom = (_ref7 = marginBottom != null ? marginBottom : marginY) != null ? _ref7 : margin;
  const resolvedMarginLeft = (_ref8 = marginLeft != null ? marginLeft : marginX) != null ? _ref8 : margin;
  const omitFlex = !display || typeof display === 'string' && display !== 'flex' && display !== 'inlineFlex';
  return classNames__default["default"](className, modules_54d944f2.box, display ? getClassNames(modules_54d944f2, 'display', display) : null, position !== 'static' ? getClassNames(modules_54d944f2, 'position', position) : null, minWidth != null ? getClassNames(modules_89b7671c, 'minWidth', String(minWidth)) : null, getClassNames(modules_89b7671c, 'maxWidth', maxWidth), getClassNames(modules_54d944f2, 'textAlign', textAlign), // padding
  getClassNames(modules_b537a8ee, 'paddingTop', resolvedPaddingTop), getClassNames(modules_b537a8ee, 'paddingRight', resolvedPaddingRight), getClassNames(modules_b537a8ee, 'paddingBottom', resolvedPaddingBottom), getClassNames(modules_b537a8ee, 'paddingLeft', resolvedPaddingLeft), // margin
  getClassNames(modules_131405ac, 'marginTop', resolvedMarginTop), getClassNames(modules_131405ac, 'marginRight', resolvedMarginRight), getClassNames(modules_131405ac, 'marginBottom', resolvedMarginBottom), getClassNames(modules_131405ac, 'marginLeft', resolvedMarginLeft), // flex props
  omitFlex ? null : getClassNames(modules_54d944f2, 'flexDirection', flexDirection), omitFlex ? null : getClassNames(modules_54d944f2, 'flexWrap', flexWrap), omitFlex ? null : getClassNames(modules_54d944f2, 'alignItems', alignItems), omitFlex ? null : getClassNames(modules_54d944f2, 'justifyContent', justifyContent), alignSelf != null ? getClassNames(modules_54d944f2, 'alignSelf', alignSelf) : null, flexShrink != null ? getClassNames(modules_54d944f2, 'flexShrink', String(flexShrink)) : null, flexGrow != null ? getClassNames(modules_54d944f2, 'flexGrow', String(flexGrow)) : null, gap ? getClassNames(modules_8b5c09cb, 'gap', gap) : null, // other props
  getClassNames(modules_54d944f2, 'overflow', overflow), width != null ? getClassNames(modules_89b7671c, 'width', String(width)) : null, getClassNames(modules_54d944f2, 'height', height), getClassNames(modules_54d944f2, 'bg', background), borderRadius !== 'none' ? getClassNames(modules_54d944f2, 'borderRadius', borderRadius) : null, border !== 'none' ? getClassNames(modules_54d944f2, 'border', border) : null);
}

const Box$1 = /*#__PURE__*/polymorphicComponent(function Box(_ref9, ref) {
  let {
    as: component = 'div',
    position = 'static',
    display,
    flexDirection = 'row',
    flexWrap,
    flexGrow,
    flexShrink,
    gap,
    alignItems,
    justifyContent,
    alignSelf,
    overflow,
    width,
    height,
    background,
    border,
    borderRadius,
    minWidth,
    maxWidth,
    textAlign,
    padding,
    paddingY,
    paddingX,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginY,
    marginX,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    className,
    children
  } = _ref9,
      props = _objectWithoutProperties(_ref9, _excluded$v);

  return /*#__PURE__*/React__namespace.createElement(component, _objectSpread2(_objectSpread2({}, props), {}, {
    className: getBoxClassNames({
      position,
      display,
      flexDirection,
      flexWrap,
      flexGrow,
      flexShrink,
      gap,
      alignItems,
      justifyContent,
      alignSelf,
      overflow,
      width,
      height,
      background,
      border,
      borderRadius,
      minWidth,
      maxWidth,
      textAlign,
      padding,
      paddingY,
      paddingX,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      margin,
      marginY,
      marginX,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      className
    }),
    ref
  }), children);
});

var modules_67f2d07a = {"container":"eae3d34f","container-xsmall":"_9b4012c9","container-small":"e35e0320","container-medium":"_0703e67f","container-large":"_1cf15621","container-xlarge":"_1c7dff67","container-xxlarge":"_25bee9b6","columnWidth-content":"_4bb9987d","columnWidth-auto":"_9dd31975","columnWidth-1-2":"_38d11c0e","columnWidth-1-3":"_7ac225c6","columnWidth-2-3":"_9c340680","columnWidth-1-4":"_81cb99d2","columnWidth-3-4":"_10fd355f","columnWidth-1-5":"_3ee66520","columnWidth-2-5":"df1201a5","columnWidth-3-5":"f772e0b2","columnWidth-4-5":"_880cbbb1"};

const _excluded$u = ["width", "children", "exceptionallySetClassName"],
      _excluded2$6 = ["space", "align", "alignY", "collapseBelow", "children", "exceptionallySetClassName"];
const Column = /*#__PURE__*/polymorphicComponent(function Column(_ref, ref) {
  let {
    width = 'auto',
    children,
    exceptionallySetClassName
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$u);

  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    className: [exceptionallySetClassName, getClassNames(modules_67f2d07a, 'columnWidth', width.replace('/', '-'))],
    minWidth: 0,
    height: "full",
    flexShrink: width === 'content' ? 0 : undefined,
    flexGrow: width === 'auto' ? 1 : 0,
    ref: ref
  }), children);
});
const Columns = /*#__PURE__*/polymorphicComponent(function Columns(_ref2, ref) {
  let {
    space,
    align = 'left',
    alignY = 'top',
    collapseBelow,
    children,
    exceptionallySetClassName
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2$6);

  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    className: [exceptionallySetClassName, modules_67f2d07a.container, getClassNames(modules_67f2d07a, 'container', space)],
    display: "flex",
    gap: space,
    flexDirection: collapseBelow === 'desktop' ? {
      mobile: 'column',
      tablet: 'column',
      desktop: 'row'
    } : collapseBelow === 'tablet' ? {
      mobile: 'column',
      tablet: 'row'
    } : 'row',
    alignItems: mapResponsiveProp(alignY, alignY => alignY === 'top' ? 'flexStart' : alignY === 'bottom' ? 'flexEnd' : alignY),
    justifyContent: mapResponsiveProp(align, align => align === 'left' ? 'flexStart' : align === 'right' ? 'flexEnd' : align),
    ref: ref
  }), children);
});

var modules_c742c4d7 = {"weight-primary":"_3f3a401c","weight-secondary":"_03b05b70","weight-tertiary":"b6f67ff8"};

const _excluded$t = ["weight"];

function Divider(_ref) {
  let {
    weight = 'tertiary'
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$t);

  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2({
    as: "hr",
    className: getClassNames(modules_c742c4d7, 'weight', weight)
  }, props));
}

const _excluded$s = ["as", "space", "align", "alignY", "children", "exceptionallySetClassName"];
const Inline = /*#__PURE__*/polymorphicComponent(function Inline(_ref, ref) {
  let {
    as,
    space,
    align = 'left',
    alignY = 'center',
    children,
    exceptionallySetClassName
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$s);

  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    as: as,
    display: "flex",
    flexWrap: "wrap",
    gap: space,
    className: exceptionallySetClassName,
    ref: ref,
    alignItems: mapResponsiveProp(alignY, alignY => alignY === 'top' ? 'flexStart' : alignY === 'bottom' ? 'flexEnd' : 'center'),
    justifyContent: mapResponsiveProp(align, align => align === 'left' ? 'flexStart' : align === 'right' ? 'flexEnd' : 'center')
  }), children);
});

const _excluded$r = ["as", "space", "align", "dividers", "width", "children", "exceptionallySetClassName"];
const Stack = /*#__PURE__*/polymorphicComponent(function Stack(_ref, ref) {
  let {
    as,
    space,
    align,
    dividers = 'none',
    width = 'full',
    children,
    exceptionallySetClassName
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$r);

  const alignItems = align === undefined ? undefined : mapResponsiveProp(align, align => align === 'start' ? 'flexStart' : align === 'end' ? 'flexEnd' : 'center');
  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    display: "flex",
    flexDirection: "column",
    width: width,
    alignItems: alignItems,
    gap: space,
    as: as,
    className: exceptionallySetClassName,
    ref: ref
  }), dividers !== 'none' ? React__namespace.Children.map(flattenChildren__default["default"](children), (child, index) => index > 0 ? /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Divider, {
    weight: dividers
  }), child) : child) : children);
});

var modules_4689e97e = {"hiddenOnPrint":"_0e595dea"};

const _excluded$q = ["display", "children", "exceptionallySetClassName"];
/**
 * A component that allows to specify how to hide itself on certain responsive screen sizes, or on
 * print media.
 *
 * @see HiddenProps
 * @see HiddenVisually for hiding content only visually, while keeping it available for assistive
 *   technologies.
 */

const Hidden = /*#__PURE__*/polymorphicComponent(function Hidden(_ref, ref) {
  let {
    display = 'block',
    children,
    exceptionallySetClassName
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$q);

  const hiddenOnPrint = 'print' in props && props.print;
  const hiddenOnDesktop = ('above' in props);
  const hiddenOnMobile = ('below' in props);
  const hiddenOnTablet = 'below' in props && props.below === 'desktop' || 'above' in props && props.above === 'mobile';

  if (hiddenOnDesktop && hiddenOnMobile) {
    // eslint-disable-next-line no-console
    console.warn('<Hidden /> should receive either above="…" or below="…" but not both');
  }

  if (!hiddenOnDesktop && !hiddenOnMobile && !hiddenOnPrint) {
    // eslint-disable-next-line no-console
    console.warn('<Hidden /> did not receive any criteria to hide itself');
  } // We need to delete these so they do not get forwarded to the Box


  if ('above' in props) delete props['above'];
  if ('below' in props) delete props['below'];
  if ('print' in props) delete props['print'];
  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    ref: ref,
    className: [exceptionallySetClassName, hiddenOnPrint ? modules_4689e97e.hiddenOnPrint : null],
    display: hiddenOnDesktop && hiddenOnMobile ? 'none' : {
      mobile: hiddenOnMobile ? 'none' : display,
      tablet: hiddenOnTablet ? 'none' : display,
      desktop: hiddenOnDesktop ? 'none' : display
    }
  }), children);
});

var modules_61c16c43 = {"hiddenVisually":"_618235b7"};

/**
 * Provides content to assistive technologies while hiding it from the screen.
 *
 * @see Hidden for fully hiding content, and only under certain conditions.
 */

const HiddenVisually = /*#__PURE__*/polymorphicComponent(function HiddenVisually(props, ref) {
  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    ref: ref,
    position: "absolute",
    overflow: "hidden",
    className: modules_61c16c43.hiddenVisually
  }));
});

var modules_c7f5018f = {"svg":"_51539197","spinner":"_54fbe2b3","tint":"a0c466ed","fill":"_745b73d3"};

function Spinner({
  size = 24
}) {
  return /*#__PURE__*/React__namespace.createElement("svg", {
    "aria-hidden": true,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className: modules_c7f5018f.svg,
    "data-chromatic": "ignore"
  }, /*#__PURE__*/React__namespace.createElement("g", {
    fill: "none",
    fillRule: "nonzero"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    className: modules_c7f5018f.tint,
    d: "M17.945 3.958A9.955 9.955 0 0 0 12 2c-2.19 0-4.217.705-5.865 1.9L5.131 2.16A11.945 11.945 0 0 1 12 0c2.59 0 4.99.82 6.95 2.217l-1.005 1.741z"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    className: modules_c7f5018f.fill,
    d: "M5.13 2.16L6.136 3.9A9.987 9.987 0 0 0 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10a9.986 9.986 0 0 0-4.055-8.042l1.006-1.741A11.985 11.985 0 0 1 24 12c0 6.627-5.373 12-12 12S0 18.627 0 12c0-4.073 2.029-7.671 5.13-9.84z"
  })));
}

var modules_95f1407a = {"tooltip":"_487c82cd"};

function Tooltip({
  children,
  content,
  position = 'top',
  gapSize = 3,
  withArrow = false,
  exceptionallySetClassName
}) {
  const tooltip = react.useTooltipStore({
    placement: position,
    showTimeout: 500,
    hideTimeout: 100
  });
  const isOpen = tooltip.useState('open');
  const child = React__namespace.Children.only(children);

  if (!child) {
    return child;
  }

  if (typeof child.ref === 'string') {
    throw new Error('Tooltip: String refs cannot be used as they cannot be forwarded');
  }

  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(react.TooltipAnchor, {
    render: child,
    store: tooltip,
    ref: child.ref
  }), isOpen && content ? /*#__PURE__*/React__namespace.createElement(react.Tooltip, {
    store: tooltip,
    gutter: gapSize,
    render: /*#__PURE__*/React__namespace.createElement(Box$1, {
      className: [modules_95f1407a.tooltip, exceptionallySetClassName],
      background: "toast",
      borderRadius: "standard",
      paddingX: "small",
      paddingY: "xsmall",
      maxWidth: "medium",
      width: "fitContent",
      overflow: "hidden",
      textAlign: "center"
    })
  }, withArrow ? /*#__PURE__*/React__namespace.createElement(react.TooltipArrow, null) : null, typeof content === 'function' ? content() : content) : null);
}

var modules_5357ebb8 = {"baseButton":"_3930afa0","label":"_90654824","shape-rounded":"c05d17c2","size-small":"_1e29d236","size-normal":"_7246d092","size-large":"_2d084671","disabled":"_2b0b9d95","iconButton":"abd5766f","startIcon":"_380e7c73","endIcon":"_20fe4105","variant-primary":"_7ea1378e","variant-secondary":"_64ee8afd","variant-tertiary":"_650176bf","variant-quaternary":"aa19cb97","tone-destructive":"_7a2d9a8c"};

const _excluded$p = ["variant", "tone", "size", "shape", "type", "disabled", "loading", "tooltip", "render", "onClick", "exceptionallySetClassName", "children", "startIcon", "endIcon", "width", "align"],
      _excluded2$5 = ["variant", "tone", "size", "shape", "type", "disabled", "loading", "tooltip", "render", "onClick", "exceptionallySetClassName", "children", "icon"];

function preventDefault(event) {
  event.preventDefault();
}
/**
 * A button element that displays a text label and optionally a start or end icon. It follows the
 * [WAI-ARIA Button Pattern](https://www.w3.org/TR/wai-aria-practices/#button).
 */


const Button$1 = /*#__PURE__*/React__namespace.forwardRef(function Button(_ref, ref) {
  let {
    variant,
    tone = 'normal',
    size = 'normal',
    shape = 'normal',
    type = 'button',
    disabled = false,
    loading = false,
    tooltip,
    render,
    onClick,
    exceptionallySetClassName,
    children,
    startIcon,
    endIcon,
    width = 'auto',
    align = 'center'
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$p);

  const isDisabled = loading || disabled;
  const buttonElement = /*#__PURE__*/React__namespace.createElement(react.Role.button, _objectSpread2(_objectSpread2({}, props), {}, {
    render: render,
    type: render != null ? undefined : type,
    ref: ref,
    "aria-disabled": isDisabled,
    onClick: isDisabled ? preventDefault : onClick,
    className: classNames__default["default"]([getBoxClassNames({
      width
    }), exceptionallySetClassName, modules_5357ebb8.baseButton, modules_5357ebb8["variant-" + variant], modules_5357ebb8["tone-" + tone], modules_5357ebb8["size-" + size], shape === 'rounded' ? modules_5357ebb8['shape-rounded'] : null, disabled ? modules_5357ebb8.disabled : null])
  }), /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, startIcon ? /*#__PURE__*/React__namespace.createElement(Box$1, {
    display: "flex",
    className: modules_5357ebb8.startIcon,
    "aria-hidden": true
  }, loading && !endIcon ? /*#__PURE__*/React__namespace.createElement(Spinner, null) : startIcon) : null, children ? /*#__PURE__*/React__namespace.createElement(Box$1, {
    as: "span",
    className: modules_5357ebb8.label,
    overflow: "hidden",
    width: width === 'full' ? 'full' : undefined,
    textAlign: width === 'auto' ? 'center' : align
  }, children) : null, endIcon || loading && !startIcon ? /*#__PURE__*/React__namespace.createElement(Box$1, {
    display: "flex",
    className: modules_5357ebb8.endIcon,
    "aria-hidden": true
  }, loading ? /*#__PURE__*/React__namespace.createElement(Spinner, null) : endIcon) : null));
  return tooltip ? /*#__PURE__*/React__namespace.createElement(Tooltip, {
    content: tooltip
  }, buttonElement) : buttonElement;
});
/**
 * A button element that displays an icon only, visually, though it is semantically labelled. It
 * also makes sure to always show a tooltip with its label. It follows the
 * [WAI-ARIA Button Pattern](https://www.w3.org/TR/wai-aria-practices/#button).
 */

const IconButton = /*#__PURE__*/React__namespace.forwardRef(function IconButton(_ref2, ref) {
  let {
    variant,
    tone = 'normal',
    size = 'normal',
    shape = 'normal',
    type = 'button',
    disabled = false,
    loading = false,
    tooltip,
    render,
    onClick,
    exceptionallySetClassName,
    children,
    icon
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2$5);

  const isDisabled = loading || disabled;
  const buttonElement = /*#__PURE__*/React__namespace.createElement(react.Role.button, _objectSpread2(_objectSpread2({}, props), {}, {
    render: render,
    type: render != null ? undefined : type,
    ref: ref,
    "aria-disabled": isDisabled,
    onClick: isDisabled ? preventDefault : onClick,
    className: classNames__default["default"]([exceptionallySetClassName, modules_5357ebb8.baseButton, modules_5357ebb8["variant-" + variant], modules_5357ebb8["tone-" + tone], modules_5357ebb8["size-" + size], shape === 'rounded' ? modules_5357ebb8['shape-rounded'] : null, modules_5357ebb8.iconButton, disabled ? modules_5357ebb8.disabled : null])
  }), loading && /*#__PURE__*/React__namespace.createElement(Spinner, null) || icon);
  const tooltipContent = tooltip === undefined ? props['aria-label'] : tooltip;
  return tooltipContent ? /*#__PURE__*/React__namespace.createElement(Tooltip, {
    content: tooltipContent
  }, buttonElement) : buttonElement;
});

const _excluded$o = ["tone"];
const alertIconForTone = {
  info: AlertInfoIcon,
  positive: AlertPositiveIcon,
  caution: AlertCautionIcon,
  critical: AlertCriticalIcon
};

function AlertIcon(_ref) {
  let {
    tone
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$o);

  const Icon = alertIconForTone[tone];
  return Icon ? /*#__PURE__*/React__namespace.createElement(Icon, _objectSpread2({}, props)) : null;
}

function AlertInfoIcon(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _objectSpread2({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-8-3.94a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM10.25 10a.75.75 0 0 0 0 1.5h1.25V15h-1.25a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5H13v-4.25a.75.75 0 0 0-.75-.75h-2Z",
    fill: "currentColor"
  }));
}

function AlertPositiveIcon(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _objectSpread2({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5.555-2.99a.75.75 0 0 1 1.06 1.06l-5.303 5.304a.748.748 0 0 1-1.061 0l-2.475-2.475a.75.75 0 0 1 1.06-1.06l1.945 1.944 4.774-4.773Z",
    fill: "currentColor"
  }));
}

function AlertCautionIcon(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _objectSpread2({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "m10.272 4.962-7.018 12.03A2 2 0 0 0 4.982 20h14.036a2 2 0 0 0 1.727-3.008l-7.018-12.03a2 2 0 0 0-3.455 0ZM13 16.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.014-7.013A.987.987 0 0 0 12 8.5h-.028l-.027.002a.987.987 0 0 0-.93 1.04l.236 4.25c.052.944 1.445.944 1.498 0l.236-4.25a1.925 1.925 0 0 0 .001-.055Z",
    fill: "currentColor"
  }));
}

function AlertCriticalIcon(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _objectSpread2({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12.9866 2.25049C12.3729 1.91683 11.6271 1.91683 11.0134 2.25049L4.04793 6.03744C3.40122 6.38904 2.99999 7.05702 2.99999 7.78208V15.2184C2.99999 15.9435 3.40122 16.6115 4.04793 16.963L11.0134 20.75C11.6271 21.0837 12.3729 21.0837 12.9866 20.75L19.9521 16.963C20.5988 16.6114 21 15.9435 21 15.2184V7.78208C21 7.05701 20.5988 6.38904 19.9521 6.03744L12.9866 2.25049ZM12 7.00024C12.5448 7.00024 12.9865 7.44191 12.9865 7.98674C12.9864 8.00043 12.9863 8.00727 12.9861 8.01411C12.9859 8.02095 12.9856 8.02779 12.985 8.04146L12.7489 12.2918C12.6964 13.2364 11.3036 13.2364 11.2512 12.2918L11.015 8.04146C10.9848 7.49747 11.4013 7.03198 11.9453 7.00176L11.9726 7.00062L12 7.00024ZM13 15.0002C13 15.5525 12.5523 16.0002 12 16.0002C11.4477 16.0002 11 15.5525 11 15.0002C11 14.448 11.4477 14.0002 12 14.0002C12.5523 14.0002 13 14.448 13 15.0002Z",
    fill: "currentColor"
  }));
}

function CloseIcon(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _objectSpread2({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24"
  }, props), /*#__PURE__*/React__namespace.createElement("path", {
    fill: "currentColor",
    d: "M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
  }));
}

var modules_6205a58e = {"container":"_51a84fb3","tone-info":"_5649104a","icon":"_79fa06e2","tone-positive":"c67632e4","tone-caution":"_654ff216","tone-critical":"b1ee4ff1"};

function Alert({
  id,
  children,
  tone,
  closeLabel,
  onClose
}) {
  return /*#__PURE__*/React__namespace.createElement(Box$1, {
    id: id,
    role: "alert",
    "aria-live": "polite",
    borderRadius: "full",
    className: [modules_6205a58e.container, getClassNames(modules_6205a58e, 'tone', tone)]
  }, /*#__PURE__*/React__namespace.createElement(Columns, {
    space: "small",
    alignY: "center"
  }, /*#__PURE__*/React__namespace.createElement(Column, {
    width: "content"
  }, /*#__PURE__*/React__namespace.createElement(AlertIcon, {
    tone: tone,
    className: modules_6205a58e.icon
  })), /*#__PURE__*/React__namespace.createElement(Column, null, /*#__PURE__*/React__namespace.createElement(Box$1, {
    paddingY: "xsmall",
    paddingRight: onClose != null && closeLabel != null ? undefined : 'small'
  }, children)), onClose != null && closeLabel != null ? /*#__PURE__*/React__namespace.createElement(Column, {
    width: "content"
  }, /*#__PURE__*/React__namespace.createElement(Button$1, {
    variant: "quaternary",
    size: "small",
    onClick: onClose,
    "aria-label": closeLabel,
    icon: /*#__PURE__*/React__namespace.createElement(CloseIcon, null),
    style: {
      // @ts-expect-error not sure how to make TypeScript understand custom CSS properties
      '--reactist-btn-hover-fill': 'transparent'
    }
  })) : null));
}

let uid = 0;

function uniqueId() {
  return uid++;
}

function generateElementId(prefix) {
  const num = uniqueId();
  return prefix + "-" + num;
}
function useId(providedId) {
  const ref = React__namespace.useRef(providedId != null ? providedId : null);

  if (!ref.current) {
    ref.current = generateElementId('element');
  }

  return ref.current;
}

var modules_afa80466 = {"banner":"c1dffd60","banner-info":"_9d552538","banner-promotion":"d797752e","title":"_8cd610da","title-without-description":"_78ea5373","title-info":"_319c73fa","title-promotion":"fc84253f","description":"af4bd758","description-info":"b95a8c07","description-promotion":"_3c33f615"};

const _excluded$n = ["id", "tone", "icon", "title", "description", "action"];
const Banner = /*#__PURE__*/React__namespace.forwardRef(function Banner(_ref, ref) {
  let {
    id,
    tone,
    icon,
    title,
    description,
    action
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$n);

  const titleId = useId();
  const descriptionId = useId();
  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    ref: ref,
    id: id,
    role: "status",
    "aria-labelledby": titleId,
    "aria-describedby": descriptionId,
    "aria-live": "polite",
    tabIndex: 0,
    borderRadius: "standard",
    className: [modules_afa80466.banner, modules_afa80466["banner-" + tone]]
  }), /*#__PURE__*/React__namespace.createElement(Columns, {
    space: "medium",
    alignY: "center"
  }, /*#__PURE__*/React__namespace.createElement(Column, {
    width: "content",
    "aria-hidden": true,
    style: {
      /* Make sure the icon is centered vertically */
      lineHeight: 0
    }
  }, icon), /*#__PURE__*/React__namespace.createElement(Column, null, /*#__PURE__*/React__namespace.createElement(Box$1, {
    paddingY: "xsmall"
  }, description ? /*#__PURE__*/React__namespace.createElement(Box$1, {
    id: titleId,
    className: [modules_afa80466.title, modules_afa80466["title-" + tone]]
  }, title) : /*#__PURE__*/React__namespace.createElement(Box$1, {
    id: titleId,
    className: [modules_afa80466.title, // If the banner does not have a description, we need to slightly tweak
    // the styling of the title applying an extra css class
    modules_afa80466["title-without-description"], modules_afa80466["title-" + tone]]
  }, title), description ? /*#__PURE__*/React__namespace.createElement(Box$1, {
    id: descriptionId,
    className: [modules_afa80466.description, modules_afa80466["description-" + tone]]
  }, description) : null)), action ? /*#__PURE__*/React__namespace.createElement(Column, {
    width: "content"
  }, action) : null));
});

const _excluded$m = ["size", "exceptionallySetClassName"];
const sizeMapping = {
  xsmall: 16,
  small: 24,
  medium: 36,
  large: 48
};

function Loading(_ref) {
  var _sizeMapping$size;

  let {
    size = 'small',
    exceptionallySetClassName
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$m);

  const numericSize = (_sizeMapping$size = sizeMapping[size]) != null ? _sizeMapping$size : sizeMapping.small;
  const ariaLabel = props['aria-label'] ? props['aria-label'] : !props['aria-labelledby'] ? 'Loading…' : undefined;
  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    "aria-label": ariaLabel,
    className: exceptionallySetClassName,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    role: "progressbar"
  }), /*#__PURE__*/React__namespace.createElement(Spinner, {
    size: numericSize,
    "aria-hidden": true
  }));
}

var modules_1b547e7e = {"container":"_464500ae","tone-info":"_1abfe147","tone-positive":"_36ce9859","tone-caution":"f92214b7","tone-critical":"be6cf28e"};

function Notice({
  id,
  children,
  tone
}) {
  return /*#__PURE__*/React__namespace.createElement(Box$1, {
    id: id,
    role: "alert",
    "aria-live": "polite",
    className: [modules_1b547e7e.container, getClassNames(modules_1b547e7e, 'tone', tone)]
  }, /*#__PURE__*/React__namespace.createElement(Columns, {
    space: "small",
    alignY: "top"
  }, /*#__PURE__*/React__namespace.createElement(Column, {
    width: "content"
  }, /*#__PURE__*/React__namespace.createElement(AlertIcon, {
    tone: tone
  })), /*#__PURE__*/React__namespace.createElement(Column, null, /*#__PURE__*/React__namespace.createElement(Box$1, {
    paddingY: "xsmall"
  }, children))));
}

var modules_a9637dd3 = {"text":"a83bd4e0","size-caption":"_266d6623","size-copy":"a8d37c6e","size-subtitle":"_39f4eb1f","weight-semibold":"_7be5c531","weight-bold":"e214ff2e","tone-secondary":"_6a3e5ade","tone-danger":"_8f5b5f2b","tone-positive":"_9ae47ae4","lineClampMultipleLines":"_969f18f7","lineClamp-1":"_2f303ac3","lineClamp-2":"d3e04245","lineClamp-3":"_33411704","lineClamp-4":"bfc32640","lineClamp-5":"f813c82f"};

const _excluded$l = ["as", "size", "weight", "tone", "align", "children", "lineClamp", "exceptionallySetClassName"];
const Text = /*#__PURE__*/polymorphicComponent(function Text(_ref, ref) {
  let {
    as,
    size = 'body',
    weight = 'regular',
    tone = 'normal',
    align,
    children,
    lineClamp,
    exceptionallySetClassName
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$l);

  const lineClampMultipleLines = typeof lineClamp === 'string' ? Number(lineClamp) > 1 : (lineClamp != null ? lineClamp : 1) > 1;
  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    as: as,
    className: [exceptionallySetClassName, modules_a9637dd3.text, size !== 'body' ? getClassNames(modules_a9637dd3, 'size', size) : null, weight !== 'regular' ? getClassNames(modules_a9637dd3, 'weight', weight) : null, tone !== 'normal' ? getClassNames(modules_a9637dd3, 'tone', tone) : null, lineClampMultipleLines ? modules_a9637dd3.lineClampMultipleLines : null, lineClamp ? getClassNames(modules_a9637dd3, 'lineClamp', lineClamp.toString()) : null],
    textAlign: align,
    // Prevents emojis from being cut-off
    // See https://github.com/Doist/reactist/pull/528
    paddingRight: lineClamp ? 'xsmall' : undefined,
    ref: ref
  }), children);
});

var modules_d11e18f0 = {"stackedToastsView":"_616cc3f3","toastContainer":"_1b5f8e86","slot":"ce2e3476"};

const _excluded$k = ["message", "description", "icon", "action", "onDismiss", "dismissLabel"];
/**
 * A toast that shows a message, and an optional action associated with it.
 *
 * This component is generally not meant to be used directly. Most of the time you'll want to use
 * toasts generated via `useToasts` instead. However, this component is available in case you need
 * to take control of rendering a toast under different circumstances than that of notification-like
 * floating toasts.
 *
 * This component makes no assumptions outwardly about how it is positioned on the screen. That is,
 * it will not be shown floating or fixed to the viewport edges, as toasts normally show up. It only
 * provides the toast look and feel, but you are responsible for positioning it as you want.
 *
 * @see useToasts
 */

const StaticToast = /*#__PURE__*/React__default["default"].forwardRef(function Toast(_ref, ref) {
  let {
    message,
    description,
    icon,
    action,
    onDismiss,
    dismissLabel = 'Close'
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$k);

  return /*#__PURE__*/React__default["default"].createElement(Box$1, _objectSpread2({
    ref: ref,
    role: "alert",
    "aria-live": "polite",
    borderRadius: "full",
    width: "fitContent",
    background: "toast",
    display: "flex",
    padding: "large",
    alignItems: "center",
    className: modules_d11e18f0.toastContainer
  }, props), icon ? /*#__PURE__*/React__default["default"].createElement(ToastContentSlot, null, icon) : null, /*#__PURE__*/React__default["default"].createElement(Box$1, {
    flexGrow: 1,
    maxWidth: "small"
  }, description ? /*#__PURE__*/React__default["default"].createElement(Stack, {
    space: "small"
  }, /*#__PURE__*/React__default["default"].createElement(Text, {
    weight: "bold"
  }, message, " "), /*#__PURE__*/React__default["default"].createElement(Text, null, description)) : /*#__PURE__*/React__default["default"].createElement(Text, null, message)), action ? /*#__PURE__*/React__default["default"].createElement(ToastContentSlot, null, isActionObject(action) ? /*#__PURE__*/React__default["default"].createElement(Button$1, {
    variant: "tertiary",
    size: "small",
    onClick: action.onClick
  }, action.label) : action) : null, onDismiss ? /*#__PURE__*/React__default["default"].createElement(ToastContentSlot, null, /*#__PURE__*/React__default["default"].createElement(IconButton, {
    variant: "quaternary",
    size: "small",
    onClick: onDismiss,
    "aria-label": dismissLabel,
    icon: /*#__PURE__*/React__default["default"].createElement(CloseIcon, null)
  })) : null);
});

function isActionObject(action) {
  return action != null && typeof action === 'object' && 'label' in action && 'onClick' in action && typeof action.label === 'string' && typeof action.onClick === 'function';
}

function ToastContentSlot({
  children
}) {
  return /*#__PURE__*/React__default["default"].createElement(Box$1, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginX: "-xsmall",
    marginY: "-medium",
    className: modules_d11e18f0.slot
  }, children);
}

/**
 * Adapted with minor changes from https://github.com/seek-oss/braid-design-system/blob/7a5ebccb/packages/braid-design-system/lib/components/useToast/useFlipList.ts
 *
 * MIT License
 *
 * Copyright (c) 2018 SEEK
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const ANIMATION_TIMEOUT = 400;
const ENTRANCE_TRANSITION = 'transform 0.3s ease, opacity 0.3s ease';
const EXIT_TRANSITION = 'opacity 0.2s ease';
/**
 * Applies the "from" value of given CSS properties, and also sets a transition CSS property. Then
 * it waits an animation frame before setting the same CSS properties to the target "to" value. This
 * triggers the browser to perform the CSS transition on them.
 *
 * At the end of the animation, it cleans up, unsetting all the CSS properties (including the
 * transition), and calls the "done" callback, if given.
 */

function animate({
  element,
  transforms,
  transition,
  done
}) {
  const fallbackTimeout = setTimeout(() => {
    done == null ? void 0 : done();
  }, ANIMATION_TIMEOUT);
  transforms.forEach(({
    property,
    from = ''
  }) => {
    element.style.setProperty(property, from);
  });
  element.style.setProperty('transition', '');

  function transitionEndHandler(event) {
    if (event.target !== element) {
      return;
    }

    element.style.setProperty('transition', '');
    done == null ? void 0 : done();
    element.removeEventListener('transitionend', transitionEndHandler);
    clearTimeout(fallbackTimeout);
  }

  element.addEventListener('transitionend', transitionEndHandler); // Call requestAnimationFrame twice to make sure we have a full animation frame at our disposal

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      element.style.setProperty('transition', transition);
      transforms.forEach(({
        property,
        to = ''
      }) => {
        element.style.setProperty(property, to);
      });
    });
  });
}
/**
 * Provides the functionality of animating the stacked toasts when they appear and before they
 * disappear.
 *
 * It works by keeping a mapping from toast IDs to the toast elements, and keeping a mapping from
 * toast IDs to their top position. Then, on every single re-render, it compares the new DOM
 * situation with the previously stored one in these mappings. With this information, it applies
 * animations that smoothly transitions between both states.
 */


function useToastsAnimation() {
  const refs = React.useMemo(() => new Map(), []);
  const positions = React.useMemo(() => new Map(), []);
  React.useLayoutEffect(() => {
    const animations = [];
    Array.from(refs.entries()).forEach(([id, element]) => {
      if (!element) {
        refs.delete(id);
        return;
      }

      const prevTop = positions.get(id);
      const {
        top,
        height
      } = element.getBoundingClientRect();

      if (typeof prevTop === 'number' && prevTop !== top) {
        // Move animation
        animations.push({
          element,
          transition: ENTRANCE_TRANSITION,
          transforms: [{
            property: 'transform',
            from: "translateY(" + (prevTop - top) + "px)"
          }]
        });
      } else if (typeof prevTop !== 'number') {
        // Enter animation
        animations.push({
          element,
          transition: ENTRANCE_TRANSITION,
          transforms: [{
            property: 'transform',
            from: "translateY(" + height + "px)"
          }, {
            property: 'opacity',
            from: '0'
          }]
        });
      }

      positions.set(id, element.getBoundingClientRect().top);
    });
    animations.forEach(({
      element,
      transforms,
      transition
    }) => {
      animate({
        element,
        transforms,
        transition
      });
    });
  });
  const animateRemove = React.useCallback(function animateRemove(id, onAnimationDone) {
    const element = refs.get(id);

    if (element) {
      // Removal animation
      animate({
        element,
        transforms: [{
          property: 'opacity',
          to: '0'
        }],
        transition: EXIT_TRANSITION,
        done: onAnimationDone
      });
    }
  }, [refs]);
  const mappedRef = React.useCallback(id => ref => {
    refs.set(id, ref);
  }, [refs]);
  return {
    mappedRef,
    animateRemove
  };
}

const _excluded$j = ["toastId"];
/** @private */

const InternalToast = /*#__PURE__*/React__default["default"].forwardRef(function InternalToast({
  message,
  description,
  icon,
  action,
  autoDismissDelay,
  dismissLabel,
  showDismissButton = true,
  toastId,
  onDismiss,
  onRemoveToast
}, ref) {
  const [timeoutRunning, setTimeoutRunning] = React__default["default"].useState(Boolean(autoDismissDelay));
  const timeoutRef = React__default["default"].useRef();
  const startTimeout = React__default["default"].useCallback(function startTimeout() {
    setTimeoutRunning(true);
  }, []);
  const stopTimeout = React__default["default"].useCallback(function stopTimeout() {
    setTimeoutRunning(false);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
  }, []);
  const removeToast = React__default["default"].useCallback(function removeToast() {
    onRemoveToast(toastId);
    onDismiss == null ? void 0 : onDismiss();
  }, [onDismiss, onRemoveToast, toastId]);
  React__default["default"].useEffect(function setupAutoDismiss() {
    if (!timeoutRunning || !autoDismissDelay) return;
    timeoutRef.current = window.setTimeout(removeToast, autoDismissDelay * 1000);
    return stopTimeout;
  }, [autoDismissDelay, removeToast, stopTimeout, timeoutRunning]);
  /**
   * If the action is toast action object and not a custom element,
   * the `onClick` property is wrapped in another handler responsible
   * for removing the toast when the action is triggered.
   */

  const actionWithCustomActionHandler = React__default["default"].useMemo(() => {
    if (!isActionObject(action)) {
      return action;
    }

    return _objectSpread2(_objectSpread2({}, action), {}, {
      onClick: function handleActionClick() {
        if (!action) {
          return;
        }

        action.onClick();
        removeToast();
      }
    });
  }, [action, removeToast]);
  return /*#__PURE__*/React__default["default"].createElement(StaticToast, {
    ref: ref,
    message: message,
    description: description,
    icon: icon,
    action: actionWithCustomActionHandler,
    onDismiss: showDismissButton ? removeToast : undefined,
    dismissLabel: dismissLabel,
    // @ts-expect-error
    onMouseEnter: stopTimeout,
    onMouseLeave: startTimeout
  });
});
const ToastsContext = /*#__PURE__*/React__default["default"].createContext(() => () => undefined);
/**
 * Provides the state management and rendering of the toasts currently active.
 *
 * You need to render this near the top of your app components tree, in order to `useToasts`.
 *
 * @see useToasts
 */

function ToastsProvider({
  children,
  padding = 'large',
  defaultAutoDismissDelay = 10
  /* seconds */
  ,
  defaultDismissLabel = 'Close',
  containerClassName
}) {
  const [toasts, setToasts] = React__default["default"].useState([]);
  const {
    mappedRef,
    animateRemove
  } = useToastsAnimation();
  const removeToast = React__default["default"].useCallback(function onRemoveToast(toastId) {
    animateRemove(toastId, () => {
      setToasts(list => {
        const index = list.findIndex(n => n.toastId === toastId);
        if (index < 0) return list;
        const copy = [...list];
        copy.splice(index, 1);
        return copy;
      });
    });
  }, [animateRemove]);
  const showToast = React__default["default"].useCallback(function showToast(props) {
    const toastId = generateElementId('toast');

    const newToast = _objectSpread2(_objectSpread2({
      autoDismissDelay: defaultAutoDismissDelay,
      dismissLabel: defaultDismissLabel
    }, props), {}, {
      toastId
    });

    setToasts(list => [...list, newToast]);
    return () => removeToast(toastId);
  }, [defaultAutoDismissDelay, defaultDismissLabel, removeToast]);
  return /*#__PURE__*/React__default["default"].createElement(ToastsContext.Provider, {
    value: showToast
  }, children, /*#__PURE__*/React__default["default"].createElement(react.Portal, null, toasts.length === 0 ? null : /*#__PURE__*/React__default["default"].createElement(Box$1, {
    className: [modules_d11e18f0.stackedToastsView, containerClassName],
    position: "fixed",
    width: "full",
    paddingX: padding,
    paddingBottom: padding,
    "data-testid": "toasts-container"
  }, /*#__PURE__*/React__default["default"].createElement(Stack, {
    space: "medium"
  }, toasts.map(_ref => {
    let {
      toastId
    } = _ref,
        props = _objectWithoutProperties(_ref, _excluded$j);

    return /*#__PURE__*/React__default["default"].createElement(InternalToast, _objectSpread2({
      key: toastId,
      ref: mappedRef(toastId),
      toastId: toastId,
      onRemoveToast: removeToast
    }, props));
  })))));
}
/**
 * Provides a function `showToast` that shows a new toast every time you call it.
 *
 * ```jsx
 * const showToast = useToasts()
 *
 * <button onClick={() => showToast({ message: 'Hello' })}>
 *   Say hello
 * </button>
 * ```
 *
 * All toasts fired via this function are rendered in a global fixed location, and stacked one on
 * top of the other.
 *
 * When called, `showToast` returns a function that dismisses the toast when called.
 *
 * @see ToastsProvider
 */


function useToasts() {
  return React__default["default"].useContext(ToastsContext);
}
/**
 * Adds a toast to be rendered, stacked alongside any other currently active toasts.
 *
 * For most situations, you should prefer to use the `showToast` function obtained from `useToasts`.
 * This component is provided for convenience to render toasts in the markup, but it has some
 * peculiarities, which are discussed below.
 *
 * Internally, this calls `showToast`. It is provided for two reasons:
 *
 * 1. Convenience, when you want to fire a toast in markup/jsx code. Keep in mind, though, that
 *    toasts rendered in this way will be removed from view when the context where it is rendered
 *    is unmounted. Unlike toasts fired with `showToast`, which will normally be dismissed, either
 *    by the user or after a delay. They'll still be animated on their way out, though.
 * 2. When combined with disabling dismissing it (e.g. `showDismissButton={false}` and
 *    `autoDismissDelay={false}` it provides a way to show "permanent" toasts that only go away when
 *    the component ceases to be rendered).
 *
 * This is useful for cases when the consumer wants to control when a toast is visible, and to keep
 * it visible based on an app-specific condition.
 *
 * Something important to note about this component is that it triggers the toast based on the props
 * passed when first rendered, and it does not update the toast if these props change on subsequent
 * renders. In this sense, this is an imperative component, more than a descriptive one. This is
 * done to simplify the internals, and to keep it in line with how `showToast` works: you fire up a
 * toast imperatively, and you loose control over it. It remains rendered according to the props you
 * first passed.
 *
 * @see useToasts
 */


function Toast(props) {
  const showToast = useToasts();
  const propsRef = React__default["default"].useRef(props);
  React__default["default"].useEffect(() => {
    const dismissToast = showToast(propsRef.current);
    return dismissToast;
  }, [showToast]);
  return null;
}

var modules_949d2ff4 = {"heading":"bff24867","weight-medium":"_9b540c61","weight-light":"c6729907","tone-secondary":"d6507f70","tone-danger":"d1846d93","size-largest":"_7cbdd1ba","size-larger":"b3e14969","size-smaller":"be14a265","lineClampMultipleLines":"_71391f13","lineClamp-1":"_97298b1b","lineClamp-2":"_6d357d76","lineClamp-3":"d820b451","lineClamp-4":"_8d37487d","lineClamp-5":"_5215b4d7"};

const _excluded$i = ["level", "weight", "size", "tone", "children", "lineClamp", "align", "exceptionallySetClassName"];
const Heading = /*#__PURE__*/React__namespace.forwardRef(function Heading(_ref, ref) {
  let {
    level,
    weight = 'regular',
    size,
    tone = 'normal',
    children,
    lineClamp,
    align,
    exceptionallySetClassName
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$i);

  // In TypeScript v4.1, this would be properly recognized without needing the type assertion
  // https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#template-literal-types
  const headingElementName = "h" + level;
  const lineClampMultipleLines = typeof lineClamp === 'string' ? parseInt(lineClamp, 10) > 1 : (lineClamp || 0) > 1;
  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    className: [exceptionallySetClassName, modules_949d2ff4.heading, weight !== 'regular' ? getClassNames(modules_949d2ff4, 'weight', weight) : null, tone !== 'normal' ? getClassNames(modules_949d2ff4, 'tone', tone) : null, getClassNames(modules_949d2ff4, 'size', size), lineClampMultipleLines ? modules_949d2ff4.lineClampMultipleLines : null, lineClamp ? getClassNames(modules_949d2ff4, 'lineClamp', lineClamp.toString()) : null],
    textAlign: align,
    // Prevents emojis from being cut-off
    // See https://github.com/Doist/reactist/pull/528
    paddingRight: lineClamp ? 'xsmall' : undefined,
    as: headingElementName,
    ref: ref
  }), children);
});

var modules_8ebe6db0 = {"prose":"_560c1e08","darkModeTypography":"_8b53b13e"};

const _excluded$h = ["darkModeTypography", "exceptionallySetClassName"];
/**
 * Used to style HTML you don’t control, like HTML content generated from Markdown.
 */

function Prose(_ref) {
  let {
    darkModeTypography,
    exceptionallySetClassName
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$h);

  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    className: [modules_8ebe6db0.prose, darkModeTypography ? modules_8ebe6db0.darkModeTypography : null, exceptionallySetClassName]
  }));
}

var modules_3d05deee = {"container":"fdc181b3"};

const _excluded$g = ["as", "openInNewTab", "exceptionallySetClassName"];
const TextLink = /*#__PURE__*/polymorphicComponent(function TextLink(_ref, ref) {
  let {
    as = 'a',
    openInNewTab = false,
    exceptionallySetClassName
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$g);

  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    as: as,
    display: "inline",
    className: [exceptionallySetClassName, modules_3d05deee.container],
    ref: ref,
    target: openInNewTab ? '_blank' : undefined,
    rel: openInNewTab ? 'noopener noreferrer' : undefined
  }));
});

const _excluded$f = ["checked", "indeterminate", "disabled"];
const svgPath = {
  checked: 'M18 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12zm-2.457 4.293l-5.293 5.293-1.793-1.793a1 1 0 1 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414z',
  unchecked: 'M18 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12zm0 1H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z',
  mixed: 'M18 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12zm-2 7H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2z',
  filled: 'M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z'
};

function getPathKey({
  checked,
  indeterminate,
  disabled
}) {
  if (indeterminate) {
    return 'mixed'; // indeterminate, when true, overrides the checked state
  }

  if (checked) {
    return 'checked';
  } // We only used 'filled' when unchecked AND disabled, because the default unchecked icon
  // is not enough to convey the disabled state with opacity alone. For all other cases
  // above, when disabled, we use the same icon the corresponds to that state, and the
  // opacity conveys the fact that the checkbox is disabled.
  // See https://twist.com/a/1585/ch/414345/t/2257308/c/65201390


  if (disabled) {
    return 'filled';
  }

  return 'unchecked';
}

function CheckboxIcon(_ref) {
  let {
    checked,
    indeterminate,
    disabled
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$f);

  const pathKey = getPathKey({
    checked,
    indeterminate,
    disabled
  });
  return /*#__PURE__*/React__namespace.createElement("svg", _objectSpread2({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React__namespace.createElement("path", {
    fill: "currentColor",
    fillRule: "nonzero",
    d: svgPath[pathKey]
  }));
}

var modules_664a6a80 = {"container":"_84dfdb83","disabled":"_131a2ca4","checked":"_95b1556d","keyFocused":"_49de7ebd","icon":"_6b4b1851","label":"_9047f3bd"};

/**
 * Sets both a function and object React ref.
 */

function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
/**
 * Merges React Refs into a single memoized function ref so you can pass it to an element.
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useForkRef(internalRef, ref)} />;
 * });
 */


function useForkRef(...refs) {
  return React.useMemo(() => {
    if (!refs.some(Boolean)) return;
    return value => {
      refs.forEach(ref => setRef(ref, value));
    };
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  refs);
}

const _excluded$e = ["label", "icon", "disabled", "indeterminate", "defaultChecked", "onChange"];
const CheckboxField = /*#__PURE__*/React__namespace.forwardRef(function CheckboxField(_ref, ref) {
  var _ref2, _props$checked, _props$checked2;

  let {
    label,
    icon,
    disabled,
    indeterminate,
    defaultChecked,
    onChange
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$e);

  const isControlledComponent = typeof props.checked === 'boolean';

  if (typeof indeterminate === 'boolean' && !isControlledComponent) {
    // eslint-disable-next-line no-console
    console.warn('Cannot use indeterminate on an uncontrolled checkbox');
    indeterminate = undefined;
  }

  if (!label && !props['aria-label'] && !props['aria-labelledby']) {
    // eslint-disable-next-line no-console
    console.warn('A Checkbox needs a label');
  }

  const [keyFocused, setKeyFocused] = React__namespace.useState(false);
  const [checkedState, setChecked] = React__namespace.useState((_ref2 = (_props$checked = props.checked) != null ? _props$checked : defaultChecked) != null ? _ref2 : false);
  const isChecked = (_props$checked2 = props.checked) != null ? _props$checked2 : checkedState;
  const internalRef = React__namespace.useRef(null);
  const combinedRef = useForkRef(internalRef, ref);
  React__namespace.useEffect(function setIndeterminate() {
    if (internalRef.current && typeof indeterminate === 'boolean') {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  return /*#__PURE__*/React__namespace.createElement(Box$1, {
    as: "label",
    display: "flex",
    alignItems: "center",
    className: [modules_664a6a80.container, disabled ? modules_664a6a80.disabled : null, isChecked ? modules_664a6a80.checked : null, keyFocused ? modules_664a6a80.keyFocused : null]
  }, /*#__PURE__*/React__namespace.createElement("input", _objectSpread2(_objectSpread2({}, props), {}, {
    ref: combinedRef,
    type: "checkbox",
    "aria-checked": indeterminate ? 'mixed' : isChecked,
    checked: isChecked,
    disabled: disabled,
    onChange: event => {
      onChange == null ? void 0 : onChange(event);

      if (!event.defaultPrevented) {
        setChecked(event.currentTarget.checked);
      }
    },
    onBlur: event => {
      setKeyFocused(false);
      props == null ? void 0 : props.onBlur == null ? void 0 : props.onBlur(event);
    },
    onKeyUp: event => {
      setKeyFocused(true);
      props == null ? void 0 : props.onKeyUp == null ? void 0 : props.onKeyUp(event);
    }
  })), /*#__PURE__*/React__namespace.createElement(CheckboxIcon, {
    checked: isChecked,
    disabled: disabled,
    indeterminate: indeterminate,
    "aria-hidden": true
  }), icon ? /*#__PURE__*/React__namespace.createElement(Box$1, {
    display: "flex",
    className: modules_664a6a80.icon,
    "aria-hidden": true
  }, icon) : null, label ? /*#__PURE__*/React__namespace.createElement(Box$1, {
    display: "flex",
    className: modules_664a6a80.label
  }, /*#__PURE__*/React__namespace.createElement(Text, null, label)) : null);
});

function PasswordVisibleIcon(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _objectSpread2({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24"
  }, props), /*#__PURE__*/React__namespace.createElement("g", {
    fill: "none",
    fillRule: "evenodd",
    stroke: "gray"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    d: "M21.358 12C17.825 7.65 14.692 5.5 12 5.5c-2.624 0-5.67 2.043-9.097 6.181a.5.5 0 0 0 0 .638C6.331 16.457 9.376 18.5 12 18.5c2.692 0 5.825-2.15 9.358-6.5z"
  }), /*#__PURE__*/React__namespace.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3.5"
  })));
}

function PasswordHiddenIcon(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _objectSpread2({
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24"
  }, props), /*#__PURE__*/React__namespace.createElement("g", {
    fill: "gray",
    fillRule: "evenodd",
    transform: "translate(2 4)"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "nonzero",
    d: "M13.047 2.888C11.962 2.294 10.944 2 10 2 7.56 2 4.63 3.966 1.288 8c1.133 1.368 2.218 2.497 3.253 3.394l-.708.708c-1.068-.93-2.173-2.085-3.315-3.464a1 1 0 0 1 0-1.276C4.031 3.121 7.192 1 10 1c1.196 0 2.456.385 3.78 1.154l-.733.734zm-6.02 10.263C8.084 13.72 9.076 14 10 14c2.443 0 5.373-1.969 8.712-6-1.11-1.34-2.176-2.453-3.193-3.341l.708-.709C17.437 5.013 18.695 6.363 20 8c-3.721 4.667-7.054 7-10 7-1.175 0-2.411-.371-3.709-1.113l.735-.736z"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    fillRule: "nonzero",
    d: "M8.478 11.7l.79-.79a3 3 0 0 0 3.642-3.642l.79-.79A4 4 0 0 1 8.477 11.7zM6.334 9.602a4 4 0 0 1 5.268-5.268l-.78.78A3.002 3.002 0 0 0 7.113 8.82l-.78.78z"
  }), /*#__PURE__*/React__namespace.createElement("rect", {
    width: "21",
    height: "1",
    x: "-.722",
    y: "7.778",
    rx: ".5",
    transform: "rotate(-45 9.778 8.278)"
  })));
}

var modules_540a88ff = {"container":"d5ff04da","auxiliaryLabel":"_8d2b52f1","bordered":"_49c37b27","error":"_922ff337","primaryLabel":"af23c791","loadingIcon":"_75edcef6"};

const MAX_LENGTH_THRESHOLD = 10;

function fieldToneToTextTone(tone) {
  return tone === 'error' ? 'danger' : tone === 'success' ? 'positive' : 'secondary';
}

function FieldMessage({
  id,
  children,
  tone
}) {
  return /*#__PURE__*/React__namespace.createElement(Text, {
    as: "p",
    tone: fieldToneToTextTone(tone),
    size: "copy",
    id: id
  }, tone === 'loading' ? /*#__PURE__*/React__namespace.createElement(Box$1, {
    as: "span",
    marginRight: "xsmall",
    display: "inlineFlex",
    className: modules_540a88ff.loadingIcon
  }, /*#__PURE__*/React__namespace.createElement(Spinner, {
    size: 16
  })) : null, children);
}

function FieldCharacterCount({
  children,
  tone
}) {
  return /*#__PURE__*/React__namespace.createElement(Text, {
    tone: fieldToneToTextTone(tone),
    size: "copy"
  }, children);
}

function validateInputLength({
  value,
  maxLength
}) {
  if (!maxLength) {
    return {
      count: null,
      tone: 'neutral'
    };
  }

  const currentLength = String(value || '').length;
  const isNearMaxLength = maxLength - currentLength <= MAX_LENGTH_THRESHOLD;
  return {
    count: currentLength + "/" + maxLength,
    tone: isNearMaxLength ? 'error' : 'neutral'
  };
}

function BaseField({
  variant = 'default',
  label,
  value,
  auxiliaryLabel,
  message,
  tone = 'neutral',
  className,
  children,
  maxWidth,
  maxLength,
  hidden,
  'aria-describedby': originalAriaDescribedBy,
  id: originalId
}) {
  const id = useId(originalId);
  const messageId = useId();
  const inputLength = validateInputLength({
    value,
    maxLength
  });
  const [characterCount, setCharacterCount] = React__namespace.useState(inputLength.count);
  const [characterCountTone, setCharacterCountTone] = React__namespace.useState(inputLength.tone);
  const ariaDescribedBy = originalAriaDescribedBy != null ? originalAriaDescribedBy : message ? messageId : null;

  const childrenProps = _objectSpread2(_objectSpread2({
    id,
    value
  }, ariaDescribedBy ? {
    'aria-describedby': ariaDescribedBy
  } : {}), {}, {
    'aria-invalid': tone === 'error' ? true : undefined,

    onChange(event) {
      if (!maxLength) {
        return;
      }

      const inputLength = validateInputLength({
        value: event.currentTarget.value,
        maxLength
      });
      setCharacterCount(inputLength.count);
      setCharacterCountTone(inputLength.tone);
    }

  });

  React__namespace.useEffect(function updateCharacterCountOnPropChange() {
    if (!maxLength) {
      return;
    }

    const inputLength = validateInputLength({
      value,
      maxLength
    });
    setCharacterCount(inputLength.count);
    setCharacterCountTone(inputLength.tone);
  }, [maxLength, value]);
  return /*#__PURE__*/React__namespace.createElement(Stack, {
    space: "xsmall",
    hidden: hidden
  }, /*#__PURE__*/React__namespace.createElement(Box$1, {
    className: [className, modules_540a88ff.container, tone === 'error' ? modules_540a88ff.error : null, variant === 'bordered' ? modules_540a88ff.bordered : null],
    maxWidth: maxWidth
  }, label || auxiliaryLabel ? /*#__PURE__*/React__namespace.createElement(Box$1, {
    as: "span",
    display: "flex",
    justifyContent: "spaceBetween",
    alignItems: "flexEnd"
  }, /*#__PURE__*/React__namespace.createElement(Text, {
    size: variant === 'bordered' ? 'caption' : 'body',
    as: "label",
    htmlFor: id
  }, label ? /*#__PURE__*/React__namespace.createElement("span", {
    className: modules_540a88ff.primaryLabel
  }, label) : null), auxiliaryLabel ? /*#__PURE__*/React__namespace.createElement(Box$1, {
    className: modules_540a88ff.auxiliaryLabel,
    paddingLeft: "small"
  }, auxiliaryLabel) : null) : null, children(childrenProps)), message || characterCount ? /*#__PURE__*/React__namespace.createElement(Columns, {
    align: "right",
    space: "small",
    maxWidth: maxWidth
  }, message ? /*#__PURE__*/React__namespace.createElement(Column, {
    width: "auto"
  }, /*#__PURE__*/React__namespace.createElement(FieldMessage, {
    id: messageId,
    tone: tone
  }, message)) : null, characterCount ? /*#__PURE__*/React__namespace.createElement(Column, {
    width: "content"
  }, /*#__PURE__*/React__namespace.createElement(FieldCharacterCount, {
    tone: characterCountTone
  }, characterCount)) : null) : null);
}

var modules_aaf25250 = {"inputWrapper":"f2de4e8d","readOnly":"ee26e40c","bordered":"_3afb1a56","error":"f3ff9f57","slot":"_3eb7b0ef"};

const _excluded$d = ["variant", "id", "label", "value", "auxiliaryLabel", "message", "tone", "type", "maxWidth", "maxLength", "hidden", "aria-describedby", "startSlot", "endSlot", "onChange"],
      _excluded2$4 = ["onChange"];
const TextField = /*#__PURE__*/React__namespace.forwardRef(function TextField(_ref, ref) {
  let {
    variant = 'default',
    id,
    label,
    value,
    auxiliaryLabel,
    message,
    tone,
    type = 'text',
    maxWidth,
    maxLength,
    hidden,
    'aria-describedby': ariaDescribedBy,
    startSlot,
    endSlot,
    onChange: originalOnChange
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$d);

  const internalRef = React__namespace.useRef(null);
  const combinedRef = useCallbackRef.useMergeRefs([ref, internalRef]);

  function handleClick(event) {
    var _internalRef$current;

    if (event.currentTarget === combinedRef.current) return;
    (_internalRef$current = internalRef.current) == null ? void 0 : _internalRef$current.focus();
  }

  return /*#__PURE__*/React__namespace.createElement(BaseField, {
    variant: variant,
    id: id,
    label: label,
    value: value,
    auxiliaryLabel: auxiliaryLabel,
    message: message,
    tone: tone,
    maxWidth: maxWidth,
    maxLength: maxLength,
    hidden: hidden,
    "aria-describedby": ariaDescribedBy
  }, _ref2 => {
    let {
      onChange
    } = _ref2,
        extraProps = _objectWithoutProperties(_ref2, _excluded2$4);

    return /*#__PURE__*/React__namespace.createElement(Box$1, {
      display: "flex",
      alignItems: "center",
      className: [modules_aaf25250.inputWrapper, tone === 'error' ? modules_aaf25250.error : null, variant === 'bordered' ? modules_aaf25250.bordered : null, props.readOnly ? modules_aaf25250.readOnly : null],
      onClick: handleClick
    }, startSlot ? /*#__PURE__*/React__namespace.createElement(Box$1, {
      className: modules_aaf25250.slot,
      display: "flex",
      marginRight: variant === 'bordered' ? 'xsmall' : '-xsmall',
      marginLeft: variant === 'bordered' ? '-xsmall' : 'xsmall'
    }, startSlot) : null, /*#__PURE__*/React__namespace.createElement("input", _objectSpread2(_objectSpread2(_objectSpread2({}, props), extraProps), {}, {
      type: type,
      ref: combinedRef,
      maxLength: maxLength,
      onChange: event => {
        originalOnChange == null ? void 0 : originalOnChange(event);
        onChange == null ? void 0 : onChange(event);
      }
    })), endSlot ? /*#__PURE__*/React__namespace.createElement(Box$1, {
      className: modules_aaf25250.slot,
      display: "flex",
      marginRight: variant === 'bordered' ? '-xsmall' : 'xsmall',
      marginLeft: variant === 'bordered' ? 'xsmall' : '-xsmall'
    }, endSlot) : null);
  });
});

const _excluded$c = ["togglePasswordLabel", "endSlot"];
const PasswordField = /*#__PURE__*/React__namespace.forwardRef(function PasswordField(_ref, ref) {
  let {
    togglePasswordLabel = 'Toggle password visibility',
    endSlot
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$c);

  const [isPasswordVisible, setPasswordVisible] = React__namespace.useState(false);
  const Icon = isPasswordVisible ? PasswordVisibleIcon : PasswordHiddenIcon;
  return /*#__PURE__*/React__namespace.createElement(TextField, _objectSpread2(_objectSpread2({}, props), {}, {
    ref: ref,
    // @ts-expect-error TextField does not support type="password", so we override the type check here
    type: isPasswordVisible ? 'text' : 'password',
    endSlot: /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, endSlot, /*#__PURE__*/React__namespace.createElement(IconButton, {
      variant: "quaternary",
      icon: /*#__PURE__*/React__namespace.createElement(Icon, {
        "aria-hidden": true
      }),
      "aria-label": togglePasswordLabel,
      onClick: () => setPasswordVisible(v => !v)
    }))
  }));
});

var modules_1fa9b208 = {"selectWrapper":"b930bb07","bordered":"e1f620b6","error":"_7e87474e"};

const _excluded$b = ["variant", "id", "label", "value", "auxiliaryLabel", "message", "tone", "maxWidth", "children", "hidden", "aria-describedby", "onChange"];
const SelectField = /*#__PURE__*/React__namespace.forwardRef(function SelectField(_ref, ref) {
  let {
    variant = 'default',
    id,
    label,
    value,
    auxiliaryLabel,
    message,
    tone,
    maxWidth,
    children,
    hidden,
    'aria-describedby': ariaDescribedBy,
    onChange: originalOnChange
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$b);

  return /*#__PURE__*/React__namespace.createElement(BaseField, {
    variant: variant,
    id: id,
    label: label,
    value: value,
    auxiliaryLabel: auxiliaryLabel,
    message: message,
    tone: tone,
    maxWidth: maxWidth,
    hidden: hidden,
    "aria-describedby": ariaDescribedBy
  }, extraProps => /*#__PURE__*/React__namespace.createElement(Box$1, {
    "data-testid": "select-wrapper",
    className: [modules_1fa9b208.selectWrapper, tone === 'error' ? modules_1fa9b208.error : null, variant === 'bordered' ? modules_1fa9b208.bordered : null]
  }, /*#__PURE__*/React__namespace.createElement("select", _objectSpread2(_objectSpread2(_objectSpread2({}, props), extraProps), {}, {
    ref: ref,
    onChange: event => {
      originalOnChange == null ? void 0 : originalOnChange(event);
    }
  }), children), /*#__PURE__*/React__namespace.createElement(SelectChevron, {
    "aria-hidden": true
  })));
});

function SelectChevron(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _objectSpread2({
    width: "16",
    height: "16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), /*#__PURE__*/React__namespace.createElement("path", {
    d: "M11.646 5.646a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L8 9.293l3.646-3.647z",
    fill: "currentColor"
  }));
}

var modules_8e05f7c9 = {"container":"bae487be","disabled":"_408d32a0","checked":"_99b0ead7","toggle":"_5af09fb5","label":"a66e1846","handle":"_0dcf70ec","keyFocused":"_1f5e7fd4"};

const _excluded$a = ["label", "message", "tone", "disabled", "hidden", "defaultChecked", "id", "aria-describedby", "aria-label", "aria-labelledby", "onChange"];
const SwitchField = /*#__PURE__*/React__namespace.forwardRef(function SwitchField(_ref, ref) {
  var _ref2, _props$checked, _props$checked2;

  let {
    label,
    message,
    tone = 'neutral',
    disabled = false,
    hidden,
    defaultChecked,
    id: originalId,
    'aria-describedby': originalAriaDescribedBy,
    'aria-label': originalAriaLabel,
    'aria-labelledby': originalAriaLabelledby,
    onChange
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$a);

  const id = useId(originalId);
  const messageId = useId();
  const ariaDescribedBy = originalAriaDescribedBy != null ? originalAriaDescribedBy : message ? messageId : undefined;
  const ariaLabel = originalAriaLabel != null ? originalAriaLabel : undefined;
  const ariaLabelledBy = originalAriaLabelledby != null ? originalAriaLabelledby : undefined;
  const [keyFocused, setKeyFocused] = React__namespace.useState(false);
  const [checkedState, setChecked] = React__namespace.useState((_ref2 = (_props$checked = props.checked) != null ? _props$checked : defaultChecked) != null ? _ref2 : false);
  const isChecked = (_props$checked2 = props.checked) != null ? _props$checked2 : checkedState;
  return /*#__PURE__*/React__namespace.createElement(Stack, {
    space: "small",
    hidden: hidden
  }, /*#__PURE__*/React__namespace.createElement(Box$1, {
    className: [modules_8e05f7c9.container, disabled ? modules_8e05f7c9.disabled : null, isChecked ? modules_8e05f7c9.checked : null, keyFocused ? modules_8e05f7c9.keyFocused : null],
    as: "label",
    display: "flex",
    alignItems: "center"
  }, /*#__PURE__*/React__namespace.createElement(Box$1, {
    position: "relative",
    display: "inlineBlock",
    overflow: "visible",
    marginRight: "small",
    flexShrink: 0,
    className: modules_8e05f7c9.toggle
  }, /*#__PURE__*/React__namespace.createElement(HiddenVisually, null, /*#__PURE__*/React__namespace.createElement("input", _objectSpread2(_objectSpread2({}, props), {}, {
    id: id,
    type: "checkbox",
    disabled: disabled,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    ref: ref,
    checked: isChecked,
    onChange: event => {
      onChange == null ? void 0 : onChange(event);

      if (!event.defaultPrevented) {
        setChecked(event.currentTarget.checked);
      }
    },
    onBlur: event => {
      setKeyFocused(false);
      props == null ? void 0 : props.onBlur == null ? void 0 : props.onBlur(event);
    },
    onKeyUp: event => {
      setKeyFocused(true);
      props == null ? void 0 : props.onKeyUp == null ? void 0 : props.onKeyUp(event);
    }
  }))), /*#__PURE__*/React__namespace.createElement("span", {
    className: modules_8e05f7c9.handle
  })), /*#__PURE__*/React__namespace.createElement(Text, {
    exceptionallySetClassName: modules_8e05f7c9.label
  }, label)), message ? /*#__PURE__*/React__namespace.createElement(FieldMessage, {
    id: messageId,
    tone: tone
  }, message) : null);
});

var modules_2728c236 = {"textAreaContainer":"a95cb864","innerContainer":"ab9873f7","bordered":"de380efd","error":"_29a9d12f","disableResize":"_44f7147e"};

const _excluded$9 = ["variant", "id", "label", "value", "auxiliaryLabel", "message", "tone", "maxWidth", "maxLength", "hidden", "aria-describedby", "rows", "autoExpand", "disableResize", "onChange"],
      _excluded2$3 = ["onChange"];
const TextArea = /*#__PURE__*/React__namespace.forwardRef(function TextArea(_ref, ref) {
  let {
    variant = 'default',
    id,
    label,
    value,
    auxiliaryLabel,
    message,
    tone,
    maxWidth,
    maxLength,
    hidden,
    'aria-describedby': ariaDescribedBy,
    rows,
    autoExpand = false,
    disableResize = false,
    onChange: originalOnChange
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$9);

  const containerRef = React__namespace.useRef(null);
  const internalRef = React__namespace.useRef(null);
  const combinedRef = useCallbackRef.useMergeRefs([ref, internalRef]);
  const textAreaClassName = classNames__default["default"]([autoExpand ? modules_2728c236.disableResize : null, disableResize ? modules_2728c236.disableResize : null]);
  React__namespace.useEffect(function setupAutoExpand() {
    const containerElement = containerRef.current;

    function handleAutoExpand(value) {
      if (containerElement) {
        containerElement.dataset.replicatedValue = value;
      }
    }

    function handleInput(event) {
      handleAutoExpand(event.currentTarget.value);
    }

    const textAreaElement = internalRef.current;

    if (!textAreaElement || !autoExpand) {
      return undefined;
    } // Apply change initially, in case the text area has a non-empty initial value


    handleAutoExpand(textAreaElement.value);
    textAreaElement.addEventListener('input', handleInput);
    return () => textAreaElement.removeEventListener('input', handleInput);
  }, [autoExpand]);
  return /*#__PURE__*/React__namespace.createElement(BaseField, {
    variant: variant,
    id: id,
    label: label,
    value: value,
    auxiliaryLabel: auxiliaryLabel,
    message: message,
    tone: tone,
    hidden: hidden,
    "aria-describedby": ariaDescribedBy,
    className: [modules_2728c236.textAreaContainer, tone === 'error' ? modules_2728c236.error : null, variant === 'bordered' ? modules_2728c236.bordered : null],
    maxWidth: maxWidth,
    maxLength: maxLength
  }, _ref2 => {
    let {
      onChange
    } = _ref2,
        extraProps = _objectWithoutProperties(_ref2, _excluded2$3);

    return /*#__PURE__*/React__namespace.createElement(Box$1, {
      width: "full",
      display: "flex",
      className: modules_2728c236.innerContainer,
      ref: containerRef
    }, /*#__PURE__*/React__namespace.createElement("textarea", _objectSpread2(_objectSpread2(_objectSpread2({}, props), extraProps), {}, {
      ref: combinedRef,
      rows: rows,
      className: textAreaClassName,
      maxLength: maxLength,
      onChange: event => {
        originalOnChange == null ? void 0 : originalOnChange(event);
        onChange == null ? void 0 : onChange(event);
      }
    })));
  });
});

function getInitials(name) {
  var _initials;

  if (!name) {
    return '';
  }

  const seed = name.trim().split(' ');
  const firstInitial = seed[0];
  const lastInitial = seed[seed.length - 1];
  let initials = firstInitial == null ? void 0 : firstInitial[0];

  if (firstInitial != null && lastInitial != null && initials != null && // Better readable this way.
  // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
  firstInitial[0] !== lastInitial[0]) {
    initials += lastInitial[0];
  }

  return (_initials = initials) == null ? void 0 : _initials.toUpperCase();
}

function emailToIndex(email, maxIndex) {
  const seed = email.split('@')[0];
  const hash = seed ? seed.charCodeAt(0) + seed.charCodeAt(seed.length - 1) || 0 : 0;
  return hash % maxIndex;
}

var modules_08f3eeac = {"avatar":"_38a1be89","size-xxs":"d32e92ae","size-xs":"_0667d719","size-s":"cf529fcf","size-m":"_6e268eab","size-l":"d64c62cf","size-xl":"_44fb77de","size-xxl":"_01f85e0e","size-xxxl":"_41a5fe19","tablet-size-xxs":"_6ab1577d","tablet-size-xs":"b52a4963","tablet-size-s":"_714a8419","tablet-size-m":"_81cd4d51","tablet-size-l":"bf0a4edb","tablet-size-xl":"e4f0dabd","tablet-size-xxl":"_67ea065d","tablet-size-xxxl":"_2af7f76f","desktop-size-xxs":"_759081dc","desktop-size-xs":"_8290d1c1","desktop-size-s":"_48ea172d","desktop-size-m":"_758f6641","desktop-size-l":"f9ada088","desktop-size-xl":"d3bb7470","desktop-size-xxl":"_9a312ee3","desktop-size-xxxl":"a1d30c23"};

const _excluded$8 = ["user", "avatarUrl", "size", "className", "colorList", "exceptionallySetClassName"];
const AVATAR_COLORS = ['#fcc652', '#e9952c', '#e16b2d', '#d84b40', '#e8435a', '#e5198a', '#ad3889', '#86389c', '#a8a8a8', '#98be2f', '#5d9d50', '#5f9f85', '#5bbcb6', '#32a3bf', '#2bafeb', '#2d88c3', '#3863cc', '#5e5e5e'];

function Avatar(_ref) {
  let {
    user,
    avatarUrl,
    size = 'l',
    className,
    colorList = AVATAR_COLORS,
    exceptionallySetClassName
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$8);

  const userInitials = getInitials(user.name) || getInitials(user.email);
  const avatarSize = size ? size : 'l';
  const style = avatarUrl ? {
    backgroundImage: "url(" + avatarUrl + ")",
    textIndent: '-9999px' // hide the initials

  } : {
    backgroundColor: colorList[emailToIndex(user.email, colorList.length)]
  };
  const sizeClassName = getClassNames(modules_08f3eeac, 'size', avatarSize);
  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2({
    className: [className, modules_08f3eeac.avatar, sizeClassName, exceptionallySetClassName],
    style: style
  }, props), userInitials);
}

Avatar.displayName = 'Avatar';

var modules_33c7c985 = {"badge":"c6ba5977","badge-info":"cf731337","badge-positive":"_7cfc5738","badge-promote":"_63691069","badge-attention":"_28ffb572","badge-warning":"_89e77f92"};

const _excluded$7 = ["tone", "label"];

function Badge(_ref) {
  let {
    tone,
    label
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$7);

  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    as: "span" // It enables putting the badge inside a button (https://stackoverflow.com/a/12982334)
    ,
    display: "inline",
    className: [modules_33c7c985.badge, modules_33c7c985["badge-" + tone]]
  }), label);
}

var modules_8f59d13b = {"overlay":"_756b318e","fadein":"_21966801","fitContent":"_52bde55e","container":"_46152754","full":"bf469f5d","large":"_3208ba07","medium":"_29f86ad4","small":"_64c0762d","xsmall":"_3196b4d0","xlarge":"_3517025e","expand":"_8d20cc11","buttonContainer":"_37ed43a6","headerContent":"_7df92d5c"};

const _excluded$6 = ["isOpen", "onDismiss", "height", "width", "exceptionallySetClassName", "exceptionallySetOverlayClassName", "autoFocus", "hideOnEscape", "hideOnInteractOutside", "children", "portalElement", "onKeyDown", "className"],
      _excluded2$2 = ["children", "button", "withDivider", "exceptionallySetClassName"],
      _excluded3$1 = ["exceptionallySetClassName", "children"],
      _excluded4$1 = ["exceptionallySetClassName", "withDivider"],
      _excluded5$1 = ["children"];
const ModalContext = /*#__PURE__*/React__namespace.createContext({
  onDismiss: undefined,
  height: 'fitContent'
});

function isNotInternalFrame(element) {
  return !(element.ownerDocument === document && element.tagName.toLowerCase() === 'iframe');
}
/**
 * Renders a modal that sits on top of the rest of the content in the entire page.
 *
 * Follows the WAI-ARIA Dialog (Modal) Pattern.
 *
 * @see ModalHeader
 * @see ModalFooter
 * @see ModalBody
 */


function Modal(_ref) {
  let {
    isOpen,
    onDismiss,
    height = 'fitContent',
    width = 'medium',
    exceptionallySetClassName,
    exceptionallySetOverlayClassName,
    autoFocus = true,
    hideOnEscape = true,
    hideOnInteractOutside = true,
    children,
    portalElement,
    onKeyDown,
    // @ts-expect-error we want to make sure to not pass it to the Dialog component
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$6);

  const setOpen = React__namespace.useCallback(visible => {
    if (!visible) {
      onDismiss == null ? void 0 : onDismiss();
    }
  }, [onDismiss]);
  const store = react.useDialogStore({
    open: isOpen,
    setOpen
  });
  const contextValue = React__namespace.useMemo(() => ({
    onDismiss,
    height
  }), [onDismiss, height]);
  const portalRef = React__namespace.useRef(null);
  const dialogRef = React__namespace.useRef(null);
  const backdropRef = React__namespace.useRef(null);
  const handleBackdropClick = React__namespace.useCallback(event => {
    var _dialogRef$current, _backdropRef$current;

    if ( // The focus lock element takes up the same space as the backdrop and is where the event bubbles up from,
    // so instead of checking the backdrop as the event target, we need to make sure it's just above the dialog
    !((_dialogRef$current = dialogRef.current) != null && _dialogRef$current.contains(event.target)) && // Events fired from other portals will bubble up to the backdrop, even if it isn't a child in the DOM
    (_backdropRef$current = backdropRef.current) != null && _backdropRef$current.contains(event.target)) {
      event.stopPropagation();
      onDismiss == null ? void 0 : onDismiss();
    }
  }, [onDismiss]);
  React__namespace.useLayoutEffect(function disableAccessibilityTreeOutside() {
    if (!isOpen || !portalRef.current) {
      return;
    }

    return ariaHidden.hideOthers(portalRef.current);
  }, [isOpen]);
  const handleKeyDown = React__namespace.useCallback(function handleKeyDown(event) {
    if (hideOnEscape && onDismiss != null && event.key === 'Escape' && !event.defaultPrevented) {
      event.stopPropagation();
      onDismiss();
    }

    onKeyDown == null ? void 0 : onKeyDown(event);
  }, [onDismiss, hideOnEscape, onKeyDown]);

  if (!isOpen) {
    return null;
  }

  return /*#__PURE__*/React__namespace.createElement(react.Portal, {
    portalRef: portalRef,
    portalElement: portalElement
  }, /*#__PURE__*/React__namespace.createElement(Box$1, {
    "data-testid": "modal-overlay",
    "data-overlay": true,
    className: classNames__default["default"](modules_8f59d13b.overlay, modules_8f59d13b[height], modules_8f59d13b[width], exceptionallySetOverlayClassName),

    /**
     * We're using `onPointerDown` instead of `onClick` to prevent the modal from
     * closing when the click starts inside the modal and ends on the backdrop.
     */
    onPointerDown: hideOnInteractOutside ? handleBackdropClick : undefined,
    ref: backdropRef
  }, /*#__PURE__*/React__namespace.createElement(FocusLock__default["default"], {
    autoFocus: autoFocus,
    whiteList: isNotInternalFrame,
    returnFocus: true,
    crossFrame: false
  }, /*#__PURE__*/React__namespace.createElement(react.Dialog, _objectSpread2(_objectSpread2({}, props), {}, {
    ref: dialogRef,
    render: /*#__PURE__*/React__namespace.createElement(Box$1, {
      borderRadius: "full",
      background: "default",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      height: height === 'expand' ? 'full' : undefined,
      flexGrow: height === 'expand' ? 1 : 0
    }),
    className: classNames__default["default"](exceptionallySetClassName, modules_8f59d13b.container),
    store: store,
    preventBodyScroll: true,
    // Disable focus lock as we set up our own using ReactFocusLock
    modal: false,
    autoFocus: false,
    autoFocusOnShow: false,
    autoFocusOnHide: false,
    // Disable portal and backdrop as we control their markup
    portal: false,
    backdrop: false,
    hideOnInteractOutside: false,
    hideOnEscape: false,
    onKeyDown: handleKeyDown
  }), /*#__PURE__*/React__namespace.createElement(ModalContext.Provider, {
    value: contextValue
  }, children)))));
}
/**
 * The close button rendered by ModalHeader. Provided independently so that consumers can customize
 * the button's label.
 *
 * @see ModalHeader
 */

function ModalCloseButton(props) {
  const {
    onDismiss
  } = React__namespace.useContext(ModalContext);
  const [includeInTabOrder, setIncludeInTabOrder] = React__namespace.useState(false);
  const [isMounted, setIsMounted] = React__namespace.useState(false);
  React__namespace.useEffect(function skipAutoFocus() {
    if (isMounted) {
      setIncludeInTabOrder(true);
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);
  return /*#__PURE__*/React__namespace.createElement(IconButton, _objectSpread2(_objectSpread2({}, props), {}, {
    variant: "quaternary",
    onClick: onDismiss,
    icon: /*#__PURE__*/React__namespace.createElement(CloseIcon, null),
    tabIndex: includeInTabOrder ? 0 : -1
  }));
}
/**
 * Renders a standard modal header area with an optional close button.
 *
 * @see Modal
 * @see ModalFooter
 * @see ModalBody
 */

function ModalHeader(_ref2) {
  let {
    children,
    button = true,
    withDivider = false,
    exceptionallySetClassName
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2$2);

  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    as: "header",
    paddingLeft: "large",
    paddingRight: button === false || button === null ? 'large' : 'small',
    paddingY: "small",
    className: exceptionallySetClassName
  }), /*#__PURE__*/React__namespace.createElement(Columns, {
    space: "large",
    alignY: "center"
  }, /*#__PURE__*/React__namespace.createElement(Column, {
    width: "auto"
  }, children), button === false || button === null ? /*#__PURE__*/React__namespace.createElement("div", {
    className: modules_8f59d13b.headerContent
  }) : /*#__PURE__*/React__namespace.createElement(Column, {
    width: "content",
    exceptionallySetClassName: modules_8f59d13b.buttonContainer,
    "data-testid": "button-container"
  }, typeof button === 'boolean' ? /*#__PURE__*/React__namespace.createElement(ModalCloseButton, {
    "aria-label": "Close modal",
    autoFocus: false
  }) : button))), withDivider ? /*#__PURE__*/React__namespace.createElement(Divider, null) : null);
}
/**
 * Renders the body of a modal.
 *
 * Convenient to use alongside ModalHeader and/or ModalFooter as needed. It ensures, among other
 * things, that the content of the modal body expands or contracts depending on the modal height
 * setting or the size of the content. The body content also automatically scrolls when it's too
 * large to fit the available space.
 *
 * @see Modal
 * @see ModalHeader
 * @see ModalFooter
 */

const ModalBody = /*#__PURE__*/React.forwardRef(function ModalBody(_ref3, ref) {
  let {
    exceptionallySetClassName,
    children
  } = _ref3,
      props = _objectWithoutProperties(_ref3, _excluded3$1);

  const {
    height
  } = React__namespace.useContext(ModalContext);
  return /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({}, props), {}, {
    ref: ref,
    className: exceptionallySetClassName,
    flexGrow: height === 'expand' ? 1 : 0,
    height: height === 'expand' ? 'full' : undefined,
    overflow: "auto"
  }), /*#__PURE__*/React__namespace.createElement(Box$1, {
    padding: "large",
    paddingBottom: "xxlarge"
  }, children));
});
/**
 * Renders a standard modal footer area.
 *
 * @see Modal
 * @see ModalHeader
 * @see ModalBody
 */

function ModalFooter(_ref4) {
  let {
    exceptionallySetClassName,
    withDivider = false
  } = _ref4,
      props = _objectWithoutProperties(_ref4, _excluded4$1);

  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, withDivider ? /*#__PURE__*/React__namespace.createElement(Divider, null) : null, /*#__PURE__*/React__namespace.createElement(Box$1, _objectSpread2(_objectSpread2({
    as: "footer"
  }, props), {}, {
    className: exceptionallySetClassName,
    padding: "large"
  })));
}
/**
 * A specific version of the ModalFooter, tailored to showing an inline list of actions (buttons).
 * @see ModalFooter
 */

function ModalActions(_ref5) {
  let {
    children
  } = _ref5,
      props = _objectWithoutProperties(_ref5, _excluded5$1);

  return /*#__PURE__*/React__namespace.createElement(ModalFooter, _objectSpread2({}, props), /*#__PURE__*/React__namespace.createElement(Inline, {
    align: "right",
    space: "large"
  }, children));
}

var modules_40c67f5b = {"tab":"e96bf360","track":"_430e252d","tab-neutral":"f631ccbe","tab-themed":"_6ba96acc","track-neutral":"ef4cd8d3","track-themed":"_344b3b10"};

const _excluded$5 = ["children", "space"],
      _excluded2$1 = ["children", "id", "renderMode"];
const TabsContext = /*#__PURE__*/React__namespace.createContext(null);
/**
 * Used to group components that compose a set of tabs. There can only be one active tab within the same `<Tabs>` group.
 */

function Tabs({
  children,
  selectedId,
  defaultSelectedId,
  variant = 'neutral',
  onSelectedIdChange
}) {
  const tabStore = react.useTabStore({
    defaultSelectedId,
    selectedId,
    setSelectedId: onSelectedIdChange
  });
  const actualSelectedId = tabStore.useState('selectedId');
  const memoizedTabState = React__namespace.useMemo(() => {
    var _ref;

    return {
      tabStore,
      variant,
      selectedId: (_ref = selectedId != null ? selectedId : actualSelectedId) != null ? _ref : null
    };
  }, [variant, tabStore, selectedId, actualSelectedId]);
  return /*#__PURE__*/React__namespace.createElement(TabsContext.Provider, {
    value: memoizedTabState
  }, children);
}
/**
 * Represents the individual tab elements within the group. Each `<Tab>` must have a corresponding `<TabPanel>` component.
 */


const Tab = /*#__PURE__*/React__namespace.forwardRef(function Tab({
  children,
  id,
  exceptionallySetClassName,
  render,
  onClick
}, ref) {
  const tabContextValue = React__namespace.useContext(TabsContext);
  if (!tabContextValue) return null;
  const {
    variant,
    tabStore
  } = tabContextValue;
  const className = classNames__default["default"](exceptionallySetClassName, modules_40c67f5b.tab, modules_40c67f5b["tab-" + variant]);
  return /*#__PURE__*/React__namespace.createElement(react.Tab, {
    id: id,
    ref: ref,
    store: tabStore,
    render: render,
    className: className,
    onClick: onClick
  }, children);
});
/**
 * A component used to group `<Tab>` elements together.
 */

function TabList(_ref2) {
  let {
    children,
    space
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded$5);

  const tabContextValue = React__namespace.useContext(TabsContext);

  if (!tabContextValue) {
    return null;
  }

  const {
    tabStore,
    variant
  } = tabContextValue;
  return (
    /*#__PURE__*/
    // The extra <div> prevents <Inline>'s negative margins from collapsing when used in a flex container
    // which will render the track with the wrong height
    React__namespace.createElement("div", null, /*#__PURE__*/React__namespace.createElement(react.TabList, _objectSpread2({
      store: tabStore,
      render: /*#__PURE__*/React__namespace.createElement(Box$1, {
        position: "relative",
        width: "maxContent"
      })
    }, props), /*#__PURE__*/React__namespace.createElement(Box$1, {
      className: [modules_40c67f5b.track, modules_40c67f5b["track-" + variant]]
    }), /*#__PURE__*/React__namespace.createElement(Inline, {
      space: space
    }, children)))
  );
}
/**
 * Used to define the content to be rendered when a tab is active. Each `<TabPanel>` must have a
 * corresponding `<Tab>` component.
 */


const TabPanel = /*#__PURE__*/React__namespace.forwardRef(function TabPanel(_ref3, ref) {
  let {
    children,
    id,
    renderMode = 'always'
  } = _ref3,
      props = _objectWithoutProperties(_ref3, _excluded2$1);

  const tabContextValue = React__namespace.useContext(TabsContext);
  const [tabRendered, setTabRendered] = React__namespace.useState(false);
  const selectedId = tabContextValue == null ? void 0 : tabContextValue.tabStore.useState('selectedId');
  const tabIsActive = selectedId === id;
  React__namespace.useEffect(function trackTabRenderedState() {
    if (!tabRendered && tabIsActive) {
      setTabRendered(true);
    }
  }, [tabRendered, tabIsActive]);

  if (!tabContextValue) {
    return null;
  }

  const {
    tabStore
  } = tabContextValue;
  const shouldRender = renderMode === 'always' || renderMode === 'active' && tabIsActive || renderMode === 'lazy' && (tabIsActive || tabRendered);
  return shouldRender ? /*#__PURE__*/React__namespace.createElement(react.TabPanel, _objectSpread2(_objectSpread2({}, props), {}, {
    tabId: id,
    store: tabStore,
    ref: ref
  }), children) : null;
});
/**
 * Allows content to be rendered based on the current tab being selected while outside of the
 * TabPanel component. Can be placed freely within the main `<Tabs>` component.
 */

function TabAwareSlot({
  children
}) {
  const tabContextValue = React__namespace.useContext(TabsContext);
  const selectedId = tabContextValue == null ? void 0 : tabContextValue.tabStore.useState('selectedId');
  return tabContextValue ? children({
    selectedId
  }) : null;
}

const _excluded$4 = ["children", "onItemSelect"],
      _excluded2 = ["exceptionallySetClassName"],
      _excluded3 = ["render"],
      _excluded4 = ["exceptionallySetClassName", "modal"],
      _excluded5 = ["value", "children", "onSelect", "hideOnSelect", "onClick", "exceptionallySetClassName"],
      _excluded6 = ["label", "children", "exceptionallySetClassName"];
const MenuContext = /*#__PURE__*/React__namespace.createContext({
  menuStore: null,
  handleItemSelect: () => undefined,
  getAnchorRect: null,
  setAnchorRect: () => undefined
});
/**
 * Wrapper component to control a menu. It does not render anything, only providing the state
 * management for the menu components inside it.
 */

function Menu(_ref) {
  let {
    children,
    onItemSelect
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$4);

  const [anchorRect, setAnchorRect] = React__namespace.useState(null);
  const getAnchorRect = React__namespace.useMemo(() => anchorRect ? () => anchorRect : null, [anchorRect]);
  const menuStore = react.useMenuStore(_objectSpread2({
    focusLoop: true
  }, props));
  const value = React__namespace.useMemo(() => ({
    menuStore,
    handleItemSelect: onItemSelect,
    getAnchorRect,
    setAnchorRect
  }), [menuStore, onItemSelect, getAnchorRect, setAnchorRect]);
  return /*#__PURE__*/React__namespace.createElement(MenuContext.Provider, {
    value: value
  }, children);
}
/**
 * A button to toggle a dropdown menu open or closed.
 */


const MenuButton = /*#__PURE__*/React__namespace.forwardRef(function MenuButton(_ref2, ref) {
  let {
    exceptionallySetClassName
  } = _ref2,
      props = _objectWithoutProperties(_ref2, _excluded2);

  const {
    menuStore
  } = React__namespace.useContext(MenuContext);

  if (!menuStore) {
    throw new Error('MenuButton must be wrapped in <Menu/>');
  }

  return /*#__PURE__*/React__namespace.createElement(react.MenuButton, _objectSpread2(_objectSpread2({}, props), {}, {
    store: menuStore,
    ref: ref,
    className: classNames__default["default"]('reactist_menubutton', exceptionallySetClassName)
  }));
});
const ContextMenuTrigger = /*#__PURE__*/React__namespace.forwardRef(function ContextMenuTrigger(_ref3, ref) {
  let {
    render
  } = _ref3,
      props = _objectWithoutProperties(_ref3, _excluded3);

  const {
    setAnchorRect,
    menuStore
  } = React__namespace.useContext(MenuContext);

  if (!menuStore) {
    throw new Error('ContextMenuTrigger must be wrapped in <Menu/>');
  }

  const handleContextMenu = React__namespace.useCallback(function handleContextMenu(event) {
    event.preventDefault();
    setAnchorRect({
      x: event.clientX,
      y: event.clientY
    });
    menuStore.show();
  }, [setAnchorRect, menuStore]);
  const isOpen = menuStore.useState('open');
  React__namespace.useEffect(() => {
    if (!isOpen) setAnchorRect(null);
  }, [isOpen, setAnchorRect]);
  return /*#__PURE__*/React__namespace.createElement(react.Role.div, _objectSpread2(_objectSpread2({}, props), {}, {
    onContextMenu: handleContextMenu,
    ref: ref,
    render: render
  }));
});
/**
 * The dropdown menu itself, containing a list of menu items.
 */

const MenuList = /*#__PURE__*/React__namespace.forwardRef(function MenuList(_ref4, ref) {
  let {
    exceptionallySetClassName,
    modal = true
  } = _ref4,
      props = _objectWithoutProperties(_ref4, _excluded4);

  const {
    menuStore,
    getAnchorRect
  } = React__namespace.useContext(MenuContext);

  if (!menuStore) {
    throw new Error('MenuList must be wrapped in <Menu/>');
  }

  const isOpen = menuStore.useState('open');
  return isOpen ? /*#__PURE__*/React__namespace.createElement(react.Portal, {
    preserveTabOrder: true
  }, /*#__PURE__*/React__namespace.createElement(react.Menu, _objectSpread2(_objectSpread2({}, props), {}, {
    store: menuStore,
    gutter: 8,
    shift: 4,
    ref: ref,
    className: classNames__default["default"]('reactist_menulist', exceptionallySetClassName),
    getAnchorRect: getAnchorRect != null ? getAnchorRect : undefined,
    modal: modal
  }))) : null;
});
/**
 * A menu item inside a menu list. It can be selected by the user, triggering the `onSelect`
 * callback.
 */

const MenuItem = /*#__PURE__*/React__namespace.forwardRef(function MenuItem(_ref5, ref) {
  let {
    value,
    children,
    onSelect,
    hideOnSelect = true,
    onClick,
    exceptionallySetClassName
  } = _ref5,
      props = _objectWithoutProperties(_ref5, _excluded5);

  const {
    handleItemSelect,
    menuStore
  } = React__namespace.useContext(MenuContext);

  if (!menuStore) {
    throw new Error('MenuItem must be wrapped in <Menu/>');
  }

  const {
    hide
  } = menuStore;
  const handleClick = React__namespace.useCallback(function handleClick(event) {
    onClick == null ? void 0 : onClick(event);
    const onSelectResult = onSelect && !event.defaultPrevented ? onSelect() : undefined;
    const shouldClose = onSelectResult !== false && hideOnSelect;
    handleItemSelect == null ? void 0 : handleItemSelect(value);
    if (shouldClose) hide();
  }, [onSelect, onClick, handleItemSelect, hideOnSelect, hide, value]);
  return /*#__PURE__*/React__namespace.createElement(react.MenuItem, _objectSpread2(_objectSpread2({}, props), {}, {
    store: menuStore,
    ref: ref,
    onClick: handleClick,
    className: exceptionallySetClassName,
    hideOnClick: false
  }), children);
});
/**
 * This component can be rendered alongside other `MenuItem` inside a `MenuList` in order to have
 * a sub-menu.
 *
 * Its children are expected to have the structure of a first level menu (a `MenuButton` and a
 * `MenuList`).
 *
 * ```jsx
 * <MenuItem label="Edit profile" />
 * <SubMenu>
 *   <MenuButton>More options</MenuButton>
 *   <MenuList>
 *     <MenuItem label="Preferences" />
 *     <MenuItem label="Sign out" />
 *   </MenuList>
 * </SubMenu>
 * ```
 *
 * The `MenuButton` will become a menu item in the current menu items list, and it will lead to
 * opening a sub-menu with the menu items list below it.
 */

const SubMenu = /*#__PURE__*/React__namespace.forwardRef(function SubMenu({
  children,
  onItemSelect
}, ref) {
  const {
    handleItemSelect: parentMenuItemSelect,
    menuStore
  } = React__namespace.useContext(MenuContext);

  if (!menuStore) {
    throw new Error('SubMenu must be wrapped in <Menu/>');
  }

  const {
    hide: parentMenuHide
  } = menuStore;
  const handleSubItemSelect = React__namespace.useCallback(function handleSubItemSelect(value) {
    onItemSelect == null ? void 0 : onItemSelect(value);
    parentMenuItemSelect == null ? void 0 : parentMenuItemSelect(value);
    parentMenuHide();
  }, [parentMenuHide, parentMenuItemSelect, onItemSelect]);
  const [button, list] = React__namespace.Children.toArray(children);
  const buttonElement = button;
  return /*#__PURE__*/React__namespace.createElement(Menu, {
    onItemSelect: handleSubItemSelect
  }, /*#__PURE__*/React__namespace.createElement(react.MenuItem, {
    store: menuStore,
    ref: ref,
    hideOnClick: false,
    render: buttonElement
  }, buttonElement.props.children), list);
});
/**
 * A way to semantically group some menu items.
 *
 * This group does not add any visual separator. You can do that yourself adding `<hr />` elements
 * before and/or after the group if you so wish.
 */

const MenuGroup = /*#__PURE__*/React__namespace.forwardRef(function MenuGroup(_ref6, ref) {
  let {
    label,
    children,
    exceptionallySetClassName
  } = _ref6,
      props = _objectWithoutProperties(_ref6, _excluded6);

  const {
    menuStore
  } = React__namespace.useContext(MenuContext);

  if (!menuStore) {
    throw new Error('MenuGroup must be wrapped in <Menu/>');
  }

  return /*#__PURE__*/React__namespace.createElement(react.MenuGroup, _objectSpread2(_objectSpread2({}, props), {}, {
    ref: ref,
    store: menuStore,
    className: exceptionallySetClassName
  }), label ? /*#__PURE__*/React__namespace.createElement("div", {
    role: "presentation",
    className: "reactist_menugroup__label"
  }, label) : null, children);
});

const _excluded$3 = ["type", "variant", "size", "loading", "disabled", "tooltip", "onClick", "children"];
/**
 * @deprecated
 */

const Button = /*#__PURE__*/React__namespace.forwardRef(function Button(_ref, ref) {
  let {
    type = 'button',
    variant,
    size = 'default',
    loading = false,
    disabled = false,
    tooltip,
    onClick,
    children
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$3);

  const className = classNames__default["default"]('reactist_button', variant ? "reactist_button--" + variant : null, size !== 'default' ? "reactist_button--" + size : null, {
    'reactist_button--loading': loading
  }, props.className);
  const button = /*#__PURE__*/React__namespace.createElement("button", _objectSpread2(_objectSpread2({}, props), {}, {
    ref: ref,
    type: type,
    className: className,
    "aria-disabled": disabled || loading,
    onClick: disabled || loading ? undefined : onClick
  }), children);
  return tooltip ? /*#__PURE__*/React__namespace.createElement(Tooltip, {
    content: tooltip
  }, button) : button;
});
Button.displayName = 'Button';
Button.defaultProps = {
  size: 'default',
  loading: false,
  disabled: false
};

const _excluded$2 = ["children", "onClick", "tooltip", "className"];

class Box extends React__namespace.Component {
  constructor(props, context) {
    super(props, context);
    this._timeout = void 0;

    this._handleClickOutside = event => {
      const dropdownDOMNode = ReactDOM__default["default"].findDOMNode(this);
      if (dropdownDOMNode && !dropdownDOMNode.contains(event.target)) this._toggleShowBody();else if (!this.props.allowBodyInteractions) {
        // won't close when body interactions are allowed
        this._timeout = setTimeout(() => {
          if (this.state.showBody) {
            this._toggleShowBody();
          }
        }, 100);
      }
    };

    this._toggleShowBody = () => {
      if (!this.state.showBody) {
        // will show
        if (this.props.onShowBody) this.props.onShowBody();
        document.addEventListener('click', this._handleClickOutside, true);
      } else {
        // will hide
        if (this.props.onHideBody) this.props.onHideBody();
        document.removeEventListener('click', this._handleClickOutside, true);
      }

      this.setState({
        showBody: !this.state.showBody
      });
    };

    this._setPosition = body => {
      if (body) {
        const scrollingParent = document.getElementById(this.props.scrolling_parent ? this.props.scrolling_parent : '');

        if (scrollingParent) {
          const dropdown = ReactDOM__default["default"].findDOMNode(this);

          if (!dropdown) {
            return;
          }

          const dropdownVerticalPosition = ReactDOM__default["default"].findDOMNode(this).offsetTop;
          const dropdownTrigger = dropdown.querySelector('.trigger');

          if (!dropdownTrigger) {
            return;
          }

          const dropdownTriggerHeight = dropdownTrigger.clientHeight;
          const dropdownBodyHeight = body.clientHeight;
          const scrollingParentHeight = scrollingParent.clientHeight;
          const scrollingParentOffset = scrollingParent.scrollTop;
          const bottomOffset = scrollingParentHeight + scrollingParentOffset - dropdownVerticalPosition - dropdownTriggerHeight;
          const top = bottomOffset < dropdownBodyHeight;

          if (top !== this.state.top) {
            this.setState({
              top
            });
          }
        }
      }
    };

    this.state = {
      showBody: false,
      top: props.top || false
    };
    this._timeout = undefined;
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutside, true);

    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _getTriggerComponent() {
    var _this$props$children;

    const _trigger = (_this$props$children = this.props.children) == null ? void 0 : _this$props$children[0];

    return _trigger ? /*#__PURE__*/React__namespace.cloneElement(_trigger, {
      onClick: this._toggleShowBody
    }) : undefined;
  } // https://facebook.github.io/react/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components


  _getBodyComponent() {
    if (!this.state.showBody) {
      return null;
    }

    const {
      top
    } = this.state;
    const {
      right = false,
      children
    } = this.props;
    const props = {
      top,
      right,
      setPosition: this._setPosition
    };
    const className = classNames__default["default"]({
      body_wrapper: true,
      with_arrow: true,
      top: top,
      bottom: !top
    });
    const body = children == null ? void 0 : children[1];
    const contentMarkup = typeof body === 'function' ? body(props) : body ? /*#__PURE__*/React__namespace.cloneElement(body, props) : undefined;
    return /*#__PURE__*/React__namespace.createElement("div", {
      className: className,
      style: {
        position: 'relative'
      }
    }, contentMarkup);
  }

  render() {
    const className = classNames__default["default"]('reactist_dropdown', this.props.className);
    const {
      top
    } = this.state;
    return /*#__PURE__*/React__namespace.createElement("div", {
      style: {
        display: 'inline-block'
      },
      className: className,
      "data-testid": "reactist-dropdown-box"
    }, top && this._getBodyComponent(), this._getTriggerComponent(), !top && this._getBodyComponent());
  }

}

Box.displayName = void 0;
Box.displayName = 'Dropdown.Box';
const Trigger = /*#__PURE__*/React__namespace.forwardRef(function Trigger(_ref, ref) {
  let {
    children,
    onClick,
    tooltip,
    className
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$2);

  function handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    if (onClick) onClick(event);
  }

  return /*#__PURE__*/React__namespace.createElement(Button, _objectSpread2(_objectSpread2({}, props), {}, {
    className: classNames__default["default"]('trigger', className),
    onClick: handleClick,
    tooltip: tooltip,
    ref: ref
  }), children);
});
Trigger.displayName = 'Dropdown.Trigger';

function Body({
  top,
  right,
  children,
  setPosition
}) {
  const style = {
    position: 'absolute',
    right: 0,
    top: 0
  };

  if (top) {
    style.top = 'auto';
    style.bottom = 0;
  }

  if (right) {
    style.right = 'auto';
    style.left = 0;
  }

  return /*#__PURE__*/React__namespace.createElement("div", {
    ref: setPosition,
    style: style,
    className: "body",
    id: "reactist-dropdown-body",
    "data-testid": "reactist-dropdown-body"
  }, children);
}

Body.displayName = 'Dropdown.Body';
const Dropdown = {
  Box,
  Trigger,
  Body
};

const COLORS = ['#606060', '#4A90E2', '#03B3B2', '#008299', '#82BA00', '#D24726', '#AC193D', '#DC4FAD', '#3BD5FB', '#74E8D3', '#FFCC00', '#FB886E', '#CCCCCC'];

const _isNamedColor = color => typeof color !== 'string';

const _getColor = (colorList, colorIndex) => {
  const index = colorIndex >= colorList.length ? 0 : colorIndex;
  return colorList[index];
};

function ColorPicker({
  color = 0,
  small,
  onChange,
  colorList = COLORS
}) {
  return /*#__PURE__*/React__namespace.createElement(Dropdown.Box, {
    right: true,
    className: "reactist_color_picker"
  }, /*#__PURE__*/React__namespace.createElement(Dropdown.Trigger, null, (() => {
    const backgroundColor = _getColor(colorList, color);

    return /*#__PURE__*/React__namespace.createElement("span", {
      className: classNames__default["default"]('color_trigger', {
        small
      }),
      style: {
        backgroundColor: _isNamedColor(backgroundColor) ? backgroundColor.color : backgroundColor
      }
    }, /*#__PURE__*/React__namespace.createElement("span", {
      className: "color_trigger--inner_ring"
    }));
  })()), /*#__PURE__*/React__namespace.createElement(Dropdown.Body, null, /*#__PURE__*/React__namespace.createElement("div", {
    className: "color_options"
  }, colorList.reduce((items, currentColor, currentIndex) => {
    items.push( /*#__PURE__*/React__namespace.createElement(ColorItem, {
      isActive: color >= colorList.length ? currentIndex === 0 : currentIndex === color,
      key: currentIndex,
      color: _isNamedColor(currentColor) ? currentColor.color : currentColor,
      colorIndex: currentIndex,
      onClick: onChange,
      tooltip: _isNamedColor(currentColor) ? currentColor.name : null
    }));
    return items;
  }, []))));
}

ColorPicker.displayName = 'ColorPicker';

function ColorItem({
  color,
  colorIndex,
  isActive,
  onClick,
  tooltip
}) {
  const item = /*#__PURE__*/React__namespace.createElement("span", {
    "data-testid": "reactist-color-item",
    className: 'reactist color_item' + (isActive ? ' active' : ''),
    style: {
      backgroundColor: color
    },
    onClick: () => onClick == null ? void 0 : onClick(colorIndex)
  }, /*#__PURE__*/React__namespace.createElement("span", {
    className: "color_item--inner_ring"
  }));
  return tooltip ? /*#__PURE__*/React__namespace.createElement(Tooltip, {
    content: tooltip
  }, item) : item;
}

ColorItem.displayName = 'ColorItem';

const _excluded$1 = ["children", "className", "translateKey", "isMac"];
// Support for setting up how to translate modifiers globally.
//

let globalTranslateKey = key => key;

KeyboardShortcut.setTranslateKey = tr => {
  globalTranslateKey = tr;
};

function translateKeyMac(key) {
  switch (key.toLowerCase()) {
    case 'cmd':
    case 'mod':
      return '⌘';

    case 'control':
    case 'ctrl':
      return '⌃';

    case 'alt':
      return '⌥';

    case 'shift':
      return '⇧';

    case 'space':
      return '␣';

    default:
      return key;
  }
} //
// Some helpers
//


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function hasModifiers(str) {
  return /\b(mod|cmd|ctrl|control|alt|shift)\b/i.test(str);
}

function isSpecialKey(str) {
  return /^(mod|cmd|ctrl|control|alt|shift|space|super)$/i.test(str);
}

function parseKeys(shortcut, isMac, translateKey) {
  const t = isMac ? translateKeyMac : translateKey;

  const _hasModifiers = hasModifiers(shortcut);

  function mapIndividualKey(str) {
    if (isSpecialKey(str)) {
      return capitalize(t(str));
    }

    if (_hasModifiers && str.length === 1) {
      return str.toUpperCase();
    }

    return str;
  }

  if (!isMac) {
    shortcut = shortcut.replace(/\b(mod|cmd)\b/i, 'ctrl');
  }

  return shortcut.split(/\s*\+\s*/).map(mapIndividualKey);
}

function KeyboardShortcut(_ref) {
  var _navigator$platform$t, _navigator$platform;

  let {
    children,
    className,
    translateKey = globalTranslateKey,
    isMac = (_navigator$platform$t = (_navigator$platform = navigator.platform) == null ? void 0 : _navigator$platform.toUpperCase().includes('MAC')) != null ? _navigator$platform$t : false
  } = _ref,
      props = _objectWithoutProperties(_ref, _excluded$1);

  const shortcuts = typeof children === 'string' ? [children] : children;
  return /*#__PURE__*/React__namespace.createElement("span", _objectSpread2({
    className: classNames__default["default"]('reactist_keyboard_shortcut', className, {
      'reactist_keyboard_shortcut--macos': isMac
    })
  }, props), shortcuts.map((shortcut, i) => /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, {
    key: i
  }, i === 0 ? null : ', ', /*#__PURE__*/React__namespace.createElement("kbd", null, parseKeys(shortcut, isMac, translateKey).map((key, j) => /*#__PURE__*/React__namespace.createElement("kbd", {
    key: j
  }, key))))));
}

const SUPPORTED_KEYS = {
  ARROW_UP: 'ArrowUp',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ENTER: 'Enter',
  BACKSPACE: 'Backspace',
  ESCAPE: 'Escape'
};
const KeyCapturerResolver = {
  resolveByKey(eventKey) {
    switch (eventKey) {
      case 'Left': // IE specific

      case 'ArrowLeft':
        {
          return 'ArrowLeft';
        }

      case 'Up': // IE specific

      case 'ArrowUp':
        {
          return 'ArrowUp';
        }

      case 'Right': // IE specific

      case 'ArrowRight':
        {
          return 'ArrowRight';
        }

      case 'Down': // IE specific

      case 'ArrowDown':
        {
          return 'ArrowDown';
        }

      case 'Enter':
        {
          return 'Enter';
        }

      case 'Backspace':
        {
          return 'Backspace';
        }

      case 'Esc': // IE specific

      case 'Escape':
        {
          return 'Escape';
        }

      default:
        {
          return null;
        }
    }
  },

  resolveByKeyCode(keyCode) {
    switch (keyCode) {
      case 37:
        {
          return 'ArrowLeft';
        }

      case 38:
        {
          return 'ArrowUp';
        }

      case 39:
        {
          return 'ArrowRight';
        }

      case 40:
        {
          return 'ArrowDown';
        }

      case 13:
        {
          return 'Enter';
        }

      case 8:
        {
          return 'Backspace';
        }

      case 27:
        {
          return 'Escape';
        }

      default:
        {
          return null;
        }
    }
  }

};
const keyEventHandlerMapping = {
  ArrowUp: 'onArrowUp',
  ArrowDown: 'onArrowDown',
  ArrowLeft: 'onArrowLeft',
  ArrowRight: 'onArrowRight',
  Enter: 'onEnter',
  Backspace: 'onBackspace',
  Escape: 'onEscape'
};
const keyPropagatePropMapping = {
  ArrowUp: 'propagateArrowUp',
  ArrowDown: 'propagateArrowDown',
  ArrowLeft: 'propagateArrowLeft',
  ArrowRight: 'propagateArrowRight',
  Enter: 'propagateEnter',
  Backspace: 'propagateBackspace',
  Escape: 'propagateEscape'
};
/**
 * Use this component to wrap anything you want to handle key events for (e.g. an input).
 * You can specify the `eventName` to capture (defaults to `onKeyDown`).
 * Check the SUPPORTED_KEYS map to see which keys are supported and supply the respective
 * `on${Key}` prop (i.e. `onEnter` or `onArrowDown`).
 * If you want the default behaviour to be preserved (i.e. only want to hook into the event
 * instead of replacing it) set the `propagate${Key}` prop (e.g. propagateBackspace).
 */

function KeyCapturer(props) {
  const {
    children,
    eventName = 'onKeyDown'
  } = props;
  const composingRef = React__namespace.useRef(false);
  const composingEventHandlers = props.onEnter ? {
    onCompositionStart: () => {
      composingRef.current = true;
    },
    onCompositionEnd: () => {
      composingRef.current = false;
    }
  } : undefined;

  function handleKeyEvent(event) {
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
    const key = event.key !== undefined ? KeyCapturerResolver.resolveByKey(event.key) : KeyCapturerResolver.resolveByKeyCode(event.keyCode);
    if (!key) return;
    const propagateEvent = props[keyPropagatePropMapping[key]] || false;
    const eventHandler = props[keyEventHandlerMapping[key]];

    if (key === 'Enter' && eventHandler) {
      if (composingRef.current || // Safari fires the onCompositionEnd event before the keydown event, so we
      // have to rely on the 229 keycode, which is Enter when fired from an IME
      // https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
      (event.keyCode || event.which) === 229) {
        return;
      }
    }

    if (eventHandler) {
      eventHandler(event);

      if (!propagateEvent) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  return /*#__PURE__*/React__namespace.cloneElement(children, _objectSpread2({
    [eventName]: handleKeyEvent
  }, composingEventHandlers));
}

function ProgressBar({
  fillPercentage = 0,
  className,
  'aria-valuetext': ariaValuetext
}) {
  const finalClassName = classNames__default["default"]('reactist_progress_bar', className);
  const width = fillPercentage < 0 ? 0 : fillPercentage > 100 ? 100 : fillPercentage;
  return /*#__PURE__*/React__namespace.createElement("div", {
    className: finalClassName
  }, /*#__PURE__*/React__namespace.createElement("div", {
    className: "inner",
    style: {
      width: width + "%"
    }
  }), /*#__PURE__*/React__namespace.createElement(HiddenVisually, null, /*#__PURE__*/React__namespace.createElement("progress", {
    value: width,
    max: 100,
    "aria-valuetext": ariaValuetext != null ? ariaValuetext : undefined
  })));
}

ProgressBar.displayName = 'ProgressBar';

dayjs__default["default"].extend(LocalizedFormat__default["default"]);
const TimeUtils = {
  SHORT_FORMAT_CURRENT_YEAR: 'L',
  SHORT_FORMAT_PAST_YEAR: 'LL',
  LONG_FORMAT: 'LL, LT',

  timeAgo(timestamp, config = {}) {
    const {
      locale = 'en',
      shortFormatCurrentYear = this.SHORT_FORMAT_CURRENT_YEAR,
      shortFormatPastYear = this.SHORT_FORMAT_PAST_YEAR,
      daysSuffix = 'd',
      hoursSuffix = 'h',
      minutesSuffix = 'm',
      momentsAgo = 'moments ago'
    } = config;
    const now = dayjs__default["default"]();
    const date = dayjs__default["default"](timestamp * 1000);
    date.locale(locale);
    const diffMinutes = now.diff(date, 'minute');
    const diffHours = now.diff(date, 'hour');
    const diffDays = now.diff(date, 'day');

    if (diffDays > 1) {
      if (date.isSame(now, 'year')) {
        return date.format(shortFormatCurrentYear);
      } else {
        return date.format(shortFormatPastYear);
      }
    } else if (diffDays === 1) {
      return "" + diffDays + daysSuffix;
    } else if (diffHours > 0 && diffHours <= 23) {
      return "" + diffHours + hoursSuffix;
    } else if (diffMinutes > 0 && diffMinutes <= 59) {
      return "" + diffMinutes + minutesSuffix;
    } else {
      return momentsAgo;
    }
  },

  formatTime(timestamp, config = {}) {
    const {
      locale = 'en',
      shortFormatCurrentYear = this.SHORT_FORMAT_CURRENT_YEAR,
      shortFormatPastYear = this.SHORT_FORMAT_PAST_YEAR
    } = config;
    const date = dayjs__default["default"](timestamp * 1000);
    date.locale(locale);

    if (date.isSame(dayjs__default["default"](), 'year')) {
      return date.format(shortFormatCurrentYear);
    } else {
      return date.format(shortFormatPastYear);
    }
  },

  formatTimeLong(timestamp, config = {}) {
    const {
      locale = 'en',
      longFormat = this.LONG_FORMAT
    } = config;
    const date = dayjs__default["default"](timestamp * 1000);
    date.locale(locale);
    return date.format(longFormat);
  }

};

const DELAY = 60000;

class Time extends React__namespace.Component {
  constructor(props) {
    super(props);
    this.refreshInterval = void 0;
    this.refreshInterval = undefined;
    this.state = {
      hovered: false,
      mouseX: undefined,
      mouseY: undefined
    };
  }

  componentDidMount() {
    if (this.props.refresh) {
      this._refresh();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.refresh && this.props.refresh) {
      this._refresh();
    }

    if (prevProps.refresh && !this.props.refresh) {
      if (this.refreshInterval) {
        clearTimeout(this.refreshInterval);
      }
    }
  }

  componentWillUnmount() {
    if (this.refreshInterval) {
      clearTimeout(this.refreshInterval);
    }
  }

  _setHovered(hovered, event) {
    const {
      mouseX,
      mouseY
    } = this.state;
    const {
      clientX,
      clientY
    } = event;

    if (clientX !== mouseX || clientY !== mouseY) {
      // mouse has moved
      this.setState(() => ({
        hovered,
        mouseX: clientX,
        mouseY: clientY
      }));
    }
  }

  _renderTime(config) {
    if (!this.props.time) {
      return;
    }

    if (this.state.hovered) {
      if (this.props.expandFullyOnHover && !this.props.tooltipOnHover) {
        return TimeUtils.formatTimeLong(this.props.time, config);
      }

      if (this.props.expandOnHover && !this.props.tooltipOnHover) {
        return TimeUtils.formatTime(this.props.time, config);
      }
    }

    return TimeUtils.timeAgo(this.props.time, config);
  }

  _refresh() {
    this.refreshInterval = setInterval(() => {
      this.forceUpdate();
    }, DELAY);
  }

  render() {
    let className = 'reactist_time';

    if (this.props.className) {
      className = this.props.className;
    }

    const timeComponent = this._renderTime(this.props.config);

    return /*#__PURE__*/React__namespace.createElement("time", {
      className: className,
      onMouseEnter: event => this._setHovered(true, event),
      onMouseLeave: event => this._setHovered(false, event)
    }, this.props.tooltipOnHover ? /*#__PURE__*/React__namespace.createElement(Tooltip, {
      content: this.props.tooltip || this.props.time && TimeUtils.formatTimeLong(this.props.time, this.props.config)
    }, /*#__PURE__*/React__namespace.createElement("span", null, timeComponent)) : timeComponent);
  }

}

Time.displayName = void 0;
Time.defaultProps = void 0;
Time.displayName = 'Time';
Time.defaultProps = {
  expandOnHover: false,
  expandFullyOnHover: false,
  tooltipOnHover: false,
  refresh: true,
  config: {
    locale: 'en',
    daysSuffix: 'd',
    hoursSuffix: 'h',
    minutesSuffix: 'm',
    momentsAgo: 'moments ago'
  }
};

/**
 * @deprecated
 */

const Input = /*#__PURE__*/React__namespace.forwardRef(function Input(props, ref) {
  const className = classNames__default["default"]('reactist_input', props.className);
  return /*#__PURE__*/React__namespace.createElement("input", _objectSpread2(_objectSpread2({}, props), {}, {
    className: className,
    ref: ref
  }));
});
Input.displayName = 'Input';

const _excluded = ["value", "options", "onChange", "disabled", "className", "defaultValue"];

function Select(_ref) {
  let {
    value,
    options = [],
    onChange,
    disabled = true,
    className = '',
    defaultValue
  } = _ref,
      otherProps = _objectWithoutProperties(_ref, _excluded);

  const selectClassName = classNames__default["default"]('reactist_select', {
    disabled
  }, className);
  return /*#__PURE__*/React__namespace.createElement("select", _objectSpread2({
    className: selectClassName,
    value: value,
    onChange: event => onChange ? onChange(event.target.value) : undefined,
    disabled: disabled,
    defaultValue: defaultValue
  }, otherProps), options == null ? void 0 : options.map(option => /*#__PURE__*/React__namespace.createElement("option", {
    key: option.key || option.value,
    value: option.value,
    disabled: option.disabled
  }, option.text)));
}

Select.displayName = 'Select';
Select.defaultProps = {
  options: [],
  disabled: false
};

exports.Alert = Alert;
exports.Avatar = Avatar;
exports.Badge = Badge;
exports.Banner = Banner;
exports.Box = Box$1;
exports.Button = Button$1;
exports.COLORS = COLORS;
exports.CheckboxField = CheckboxField;
exports.ColorPicker = ColorPicker;
exports.Column = Column;
exports.Columns = Columns;
exports.ContextMenuTrigger = ContextMenuTrigger;
exports.DeprecatedButton = Button;
exports.DeprecatedDropdown = Dropdown;
exports.DeprecatedInput = Input;
exports.DeprecatedSelect = Select;
exports.Divider = Divider;
exports.Heading = Heading;
exports.Hidden = Hidden;
exports.HiddenVisually = HiddenVisually;
exports.IconButton = IconButton;
exports.Inline = Inline;
exports.KeyCapturer = KeyCapturer;
exports.KeyboardShortcut = KeyboardShortcut;
exports.Loading = Loading;
exports.Menu = Menu;
exports.MenuButton = MenuButton;
exports.MenuGroup = MenuGroup;
exports.MenuItem = MenuItem;
exports.MenuList = MenuList;
exports.Modal = Modal;
exports.ModalActions = ModalActions;
exports.ModalBody = ModalBody;
exports.ModalCloseButton = ModalCloseButton;
exports.ModalFooter = ModalFooter;
exports.ModalHeader = ModalHeader;
exports.Notice = Notice;
exports.PasswordField = PasswordField;
exports.ProgressBar = ProgressBar;
exports.Prose = Prose;
exports.SUPPORTED_KEYS = SUPPORTED_KEYS;
exports.SelectField = SelectField;
exports.Stack = Stack;
exports.StaticToast = StaticToast;
exports.SubMenu = SubMenu;
exports.SwitchField = SwitchField;
exports.Tab = Tab;
exports.TabAwareSlot = TabAwareSlot;
exports.TabList = TabList;
exports.TabPanel = TabPanel;
exports.Tabs = Tabs;
exports.Text = Text;
exports.TextArea = TextArea;
exports.TextField = TextField;
exports.TextLink = TextLink;
exports.Time = Time;
exports.Toast = Toast;
exports.ToastsProvider = ToastsProvider;
exports.Tooltip = Tooltip;
exports.getBoxClassNames = getBoxClassNames;
exports.useToasts = useToasts;
//# sourceMappingURL=reactist.cjs.development.js.map
