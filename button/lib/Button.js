(function() {
  var Button, React;

  React = require('react');

  Button = React.createClass({
    render: function() {
      var className;
      className = "o-button";
      if (this.props.secondary) {
        className += " o-button--secondary";
      }
      if (this.props.fill) {
        className += " u-flex_grow";
      }
      return React.createElement("button", {
        "className": className,
        "onClick": this.props.onClick,
        "style": this.props.style
      }, this.props.children);
    }
  });

  module.exports = Button;

}).call(this);
