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
    }

    _inherits(TextField, _React$Component);

    _createClass(TextField, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this._adjustHeight();
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            this._adjustHeight();
        }
    }, {
        key: "_adjustHeight",
        value: function _adjustHeight() {
            if (this.props.multiline) {
                var textarea = this.refs.container.getDOMNode();
                textarea.style.height = "1px";
                textarea.style.height = textarea.scrollHeight + "px";
            }
        }
    }, {
        key: "_onChange",
        value: function _onChange() {
            if (this.props.onChange) {
                var _value = this.refs.container.getDOMNode().value;
                this.props.onChange(_value);
            } else {
                this.forceUpdate();
            }
        }
    }, {
        key: "_onFocus",
        value: function _onFocus() {
            if (this.props.onFocus) {
                this.props.onFocus();
            }
        }
    }, {
        key: "_onBlur",
        value: function _onBlur() {
            this.keymap = [];
            if (this.props.onBlur) {
                this.props.onBlur();
            }
        }
    }, {
        key: "_trackKeyEvents",
        value: function _trackKeyEvents(event) {
            if (this.props.action) {
                if (event.keyCode == 13) {
                    if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
                        event.preventDefault();
                        this.props.action();
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
                onKeyDown: this._trackKeyEvents.bind(this),
                onFocus: this._onFocus.bind(this),
                onBlur: this._onBlur.bind(this)
            });
        }
    }, {
        key: "_renderInput",
        value: function _renderInput() {
            var type = "text";
            if (this.props.type) {
                type = this.props.type;
            }
            return React.createElement("input", {
                value: this.props.value,
                ref: "container",
                type: type,
                onChange: this._onChange.bind(this),
                placeholder: this.props.placeholder,
                onKeyDown: this._trackKeyEvents.bind(this),
                onFocus: this._onFocus.bind(this),
                onBlur: this._onBlur.bind(this)
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