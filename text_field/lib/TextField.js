(function() {
  var React, TextField;

  React = require('react');

  TextField = React.createClass({
    componentDidMount: function() {
      return this._adjustHeight();
    },
    componentDidUpdate: function() {
      return this._adjustHeight();
    },
    _adjustHeight: function() {
      var textarea;
      if (this.props.multiline) {
        textarea = this.refs.container.getDOMNode();
        return textarea.style.height = textarea.scrollHeight + "px";
      }
    },
    _onChange: function() {
      var _value;
      if (this.props.onChange) {
        _value = this.refs.container.getDOMNode().value;
        return this.props.onChange(_value);
      } else {
        return this.forceUpdate();
      }
    },
    _onFocus: function() {
      if (this.props.onFocus) {
        return this.props.onFocus();
      }
    },
    _onBlur: function() {
      this.keymap = [];
      if (this.props.onBlur) {
        return this.props.onBlur();
      }
    },
    _trackKeyEvents: function(event) {
      if (this.props.action) {
        if (event.keyCode === 13) {
          if ((event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) || !this.props.multiline) {
            event.preventDefault();
            return this.props.action();
          }
        }
      }
    },
    _renderTextarea: function() {
      return React.createElement("textarea", {
        "value": this.props.value,
        "ref": "container",
        "onChange": this._onChange,
        "placeholder": this.props.placeholder,
        "onKeyDown": this._trackKeyEvents,
        "onFocus": this._onFocus,
        "onBlur": this._onBlur
      });
    },
    _renderInput: function() {
      var type;
      type = "text";
      if (this.props.type) {
        type = this.props.type;
      }
      return React.createElement("input", {
        "value": this.props.value,
        "ref": "container",
        "type": type,
        "onChange": this._onChange,
        "placeholder": this.props.placeholder,
        "onKeyDown": this._trackKeyEvents,
        "onFocus": this._onFocus,
        "onBlur": this._onBlur
      });
    },
    render: function() {
      var container;
      container = this._renderInput();
      if (this.props.multiline) {
        container = this._renderTextarea();
      }
      return React.createElement("div", {
        "className": "o-textfield"
      }, container);
    }
  });

  module.exports = TextField;

}).call(this);
