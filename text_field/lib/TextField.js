"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var React = require("react");

var TextField = (function (_React$Component) {
    function TextField(props) {
        _classCallCheck(this, TextField);

        _get(Object.getPrototypeOf(TextField.prototype), "constructor", this).call(this, props);
        this.ENTER = 13;
        this.keymap = [];

        if (this.props.onKeysDoAction) {
            this.special_keys = this.props.onKeysDoAction.map(function (obj) {
                return obj.keys;
            });
            this.special_keys = this.special_keys.concat.apply([], this.special_keys);
        }
    }

    _inherits(TextField, _React$Component);

    _createClass(TextField, [{
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            // auto height update on textareas
            if (this.props.multiline) {
                var textarea = this.refs.container.getDOMNode();
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";
            }
        }
    }, {
        key: "_onChange",
        value: function _onChange() {
            var _value = this.refs.container.getDOMNode().value;
            this.props.onChange(_value);
        }
    }, {
        key: "_onFocus",
        value: function _onFocus() {
            return null;
        }
    }, {
        key: "_trackKeyEvents",
        value: function _trackKeyEvents(event) {
            var keyCode = event.keyCode;
            console.log(this.special_keys);
            console.log(this.special_keys.indexOf(keyCode) != -1);
            if (this.props.onKeysDoAction && this.special_keys.indexOf(keyCode) != -1) {
                this.keymap[keyCode] = event.type == "keydown";
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.props.onKeysDoAction[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var obj = _step.value;

                        // var action = obj.action;
                        var match = true;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = obj.keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var key = _step2.value;

                                console.log(key + " -> " + obj.keys);
                                if (this.keymap[key] != true) {
                                    match = false;
                                    break;
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                                    _iterator2["return"]();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        if (match) {
                            obj.action();
                            this.keymap = [];
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }, {
        key: "_renderTextarea",
        value: function _renderTextarea() {
            return React.createElement("textarea", {
                value: this.props.value,
                ref: "container",
                onChange: this._onChange.bind(this),
                placeholder: this.props.placeholder,
                onFocus: this._onFocus.bind(this),
                onKeyDown: this._trackKeyEvents.bind(this),
                onKeyUp: this._trackKeyEvents.bind(this)
            });
        }
    }, {
        key: "_renderInput",
        value: function _renderInput() {
            return React.createElement("input", {
                value: this.props.value,
                ref: "container",
                onChange: this._onChange.bind(this),
                placeholder: this.props.placeholder,
                onKeyDown: this._trackKeyEvents.bind(this),
                onKeyUp: this._trackKeyEvents.bind(this)
            });
        }
    }, {
        key: "render",
        value: function render() {
            var container = this._renderInput();
            if (this.props.multiline) {
                container = this._renderTextarea();
            }
            return React.createElement(
                "div",
                { className: "o-textfield" },
                container
            );
        }
    }]);

    return TextField;
})(React.Component);

;

module.exports = TextField;