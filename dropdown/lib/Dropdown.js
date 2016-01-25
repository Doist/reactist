(function() {
  var Dropdown, OptionItem, Options, React, Trigger;

  React = require('react');

  Dropdown = React.createClass({
    getInitialState: function() {
      return {
        show_options: false,
        force_options_on_bottom: false
      };
    },
    _toggle: function(event) {
      var element_offset, force_options_on_bottom, offset, scroll_offset;
      force_options_on_bottom = false;
      if (event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.props.scroll_bottom_limit && this.props.scroll_element) {
          scroll_offset = document.getElementsByClassName(this.props.scroll_element)[0].scrollTop;
          element_offset = event.target.offsetTop;
          offset = element_offset - scroll_offset;
          if (offset < this.props.scroll_bottom_limit) {
            force_options_on_bottom = true;
          }
        }
      }
      if (this.state.show_options && this.props.onDropdownClose) {
        this.props.onDropdownClose();
      }
      if (!this.state.show_options && this.props.onDropdownOpen) {
        this.props.onDropdownOpen();
      }
      return this.setState({
        show_options: !this.state.show_options,
        force_options_on_bottom: force_options_on_bottom
      });
    },
    _renderMenuTrigger: function() {
      var menu_trigger;
      menu_trigger = null;
      React.Children.forEach(this.props.children, (function(_this) {
        return function(child) {
          if (child.type === Trigger) {
            return menu_trigger = React.cloneElement(child, {
              onClick: _this._toggle
            });
          }
        };
      })(this));
      return menu_trigger;
    },
    _renderMenuOptions: function() {
      var menu_options, on_top;
      if (!this.state.show_options) {
        return false;
      }
      menu_options = null;
      on_top = this.props.options_on_top && !this.state.force_options_on_bottom;
      React.Children.forEach(this.props.children, (function(_this) {
        return function(child) {
          if (child.type === Options) {
            return menu_options = React.createElement("div", {
              "className": "o-dropdown__options_renderer"
            }, React.cloneElement(child, {
              hideOptions: _this._toggle,
              on_top: on_top
            }));
          }
        };
      })(this));
      return menu_options;
    },
    render: function() {
      return React.createElement("div", {
        "className": "o-dropdown"
      }, (this.props.options_on_top === true && !this.state.force_options_on_bottom ? this._renderMenuOptions() : void 0), this._renderMenuTrigger(), (this.props.options_on_top !== true || this.state.force_options_on_bottom ? this._renderMenuOptions() : void 0));
    }
  });

  Trigger = React.createClass({
    render: function() {
      return React.createElement("div", {
        "className": "o-dropdown__trigger",
        "onClick": this.props.onClick
      }, this.props.children);
    }
  });

  Options = React.createClass({
    _handleClick: function(event) {
      return this.props.hideOptions();
    },
    componentWillMount: function() {
      return document.addEventListener("click", this._handleClick, false);
    },
    componentWillUnmount: function() {
      return document.removeEventListener("click", this._handleClick, false);
    },
    render: function() {
      var className;
      className = "o-dropdown__options";
      if (this.props.on_top) {
        className += " o-dropdown__options--on_top";
      }
      if (this.props.align === "right") {
        className += " o-dropdown__options--align_right";
      }
      return React.createElement("div", {
        "className": className
      }, React.createElement("ul", null, this.props.children));
    }
  });

  OptionItem = React.createClass({
    render: function() {
      return React.createElement("li", null, this.props.children);
    }
  });

  Dropdown.Trigger = Trigger;

  Dropdown.Options = Options;

  Dropdown.OptionItem = OptionItem;

  module.exports = Dropdown;

}).call(this);
