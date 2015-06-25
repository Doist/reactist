(function() {
  var Item, React, Tabs;

  React = require('react');

  Tabs = React.createClass({
    getInitialState: function() {
      return {
        active_tab_index: 0
      };
    },
    _switchActiveTab: function(index) {
      return this.setState({
        active_tab_index: index
      });
    },
    _getTabItemLink: function() {
      return React.Children.map(this.props.children, (function(_this) {
        return function(child, index) {
          var className;
          className = "";
          if (index === _this.state.active_tab_index) {
            className = "is_active";
          }
          return React.createElement("a", {
            "className": className,
            "href": "#",
            "onClick": _this._switchActiveTab.bind(_this, index)
          }, child.props.title);
        };
      })(this));
    },
    render: function() {
      var links;
      links = this._getTabItemLink();
      return React.createElement("div", {
        "className": "o-tabs"
      }, React.createElement("div", {
        "className": "o-tabs__link"
      }, links), this.props.children[this.state.active_tab_index]);
    }
  });

  Item = React.createClass({
    render: function() {
      return React.createElement("div", {
        "className": "o-tabs__content"
      }, this.props.children);
    }
  });

  Tabs.Item = Item;

  module.exports = Tabs;

}).call(this);
