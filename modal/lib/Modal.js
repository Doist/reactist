(function() {
  var Actions, Content, ESCAPE_KEY_CODE, Modal, React;

  React = require('react');

  ESCAPE_KEY_CODE = 27;

  Modal = React.createClass({
    _listenForESC: function(event) {
      if (event.keyCode === ESCAPE_KEY_CODE) {
        event.preventDefault();
        return this._close();
      }
    },
    _close: function(event) {
      this.props.onClose();
      if (event) {
        return event.preventDefault();
      }
    },
    _handleClick: function(event) {
      if (this.getDOMNode().isEqualNode(event.target)) {
        return this._close(event);
      }
    },
    componentWillMount: function() {
      if (this.props.close_on_esc) {
        document.addEventListener("keydown", this._listenForESC, false);
      }
      return document.addEventListener("click", this._handleClick, false);
    },
    componentWillUnmount: function() {
      if (this.props.close_on_esc) {
        document.removeEventListener("keydown", this._listenForESC, false);
      }
      return document.removeEventListener("click", this._handleClick, false);
    },
    render: function() {
      var modal_className;
      modal_className = "o-modal";
      if (this.props.size === "small") {
        modal_className += " o-modal--small";
      } else if (this.props.size === "medium") {
        modal_className += " o-modal--medium";
      } else {
        modal_className += " o-modal--large";
      }
      return React.createElement("div", {
        "ref": "modal_overlay",
        "className": "o-modal__wrapper"
      }, React.createElement("div", {
        "className": modal_className
      }, React.createElement("header", {
        "className": "o-modal__header"
      }, React.createElement("h1", null, this.props.title), React.createElement("a", {
        "href": "#",
        "className": "o-modal__header__close",
        "onClick": this._close
      }, "Close")), this.props.children));
    }
  });

  Content = React.createClass({
    render: function() {
      return React.createElement("main", {
        "className": "o-modal__main"
      }, this.props.children);
    }
  });

  Actions = React.createClass({
    _addMarginLeft: function(action) {
      return React.cloneElement(action, {
        style: {
          marginLeft: 10
        }
      });
    },
    render: function() {
      var actions;
      actions = React.Children.map(this.props.children, this._addMarginLeft);
      return React.createElement("section", {
        "className": "o-modal__actions"
      }, actions);
    }
  });

  Modal.Content = Content;

  Modal.Actions = Actions;

  module.exports = Modal;

}).call(this);
