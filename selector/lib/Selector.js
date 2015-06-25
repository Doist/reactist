(function() {
  var ARROW_DOWN, ARROW_UP, BACKSPACE, Current, ENTER, ESCAPE, React, Selector, Universe;

  React = require('react');

  ARROW_UP = 38;

  ARROW_DOWN = 40;

  ENTER = 13;

  BACKSPACE = 8;

  ESCAPE = 27;

  Selector = React.createClass({
    getInitialState: function() {
      return {
        show_filtered_items: false,
        active_item_index: 0,
        current: this._getItems(this.props.children, Current),
        universe: this._getItems(this.props.children, Universe)
      };
    },
    componentWillReceiveProps: function(nextProps) {
      return this.setState({
        current: this._getItems(nextProps.children, Current),
        universe: this._getItems(nextProps.children, Universe)
      });
    },
    _compare: (function(_this) {
      return function(a, b) {
        if (a.props[_this.props.id].toLowerCase() < b.props[_this.props.id].toLowerCase()) {
          return -1;
        } else {
          return 1;
        }
      };
    })(this),
    _showFilteredItems: function() {
      return this.setState({
        show_filtered_items: true
      });
    },
    _hideFilteredItems: function() {
      return this._timeout = setTimeout(((function(_this) {
        return function() {
          return _this.setState({
            show_filtered_items: false
          });
        };
      })(this)), 200);
    },
    _getItems: function(children, type) {
      var items;
      items = null;
      React.Children.forEach(children, (function(_this) {
        return function(child) {
          if (child.type === type) {
            return items = child.props.children;
          }
        };
      })(this));
      return items;
    },
    _renderItems: function(items, order) {
      var _items;
      if (order == null) {
        order = false;
      }
      _items = null;
      return React.Children.map(items, (function(_this) {
        return function(child) {
          return React.cloneElement(child, {
            onClick: _this._onItemClick.bind(null, child)
          });
        };
      })(this));
    },
    _onItemClick: function(item) {
      var input;
      this.props.onItemClick(item);
      clearTimeout(this._timeout);
      input = this.refs.input.getDOMNode();
      return input.focus();
    },
    _processActions: function(event) {
      var active_item, active_item_index, current, filtered, key;
      key = event.keyCode;
      active_item_index = this.state.active_item_index;
      filtered = this.state.filtered;
      current = this.state.current;
      if (key === ARROW_DOWN) {
        this._showFilteredItems();
        if (active_item_index < filtered.length - 1) {
          return this.setState({
            active_item_index: active_item_index + 1
          });
        }
      } else if (key === ARROW_UP) {
        this._showFilteredItems();
        if (active_item_index > 0) {
          return this.setState({
            active_item_index: active_item_index - 1
          });
        }
      } else if (key === ENTER) {
        active_item = filtered[active_item_index];
        if (active_item) {
          this._onItemToggle(active_item);
        }
        return event.preventDefault();
      } else if (key === BACKSPACE && this.state.query === '' && current.length > 0) {
        return this._onItemToggle(current[current.length - 1]);
      } else if (key === ESCAPE) {
        return this._hideFilteredItems();
      }
    },
    _processQuery: function() {
      return console.log("process");
    },
    render: function() {
      return React.createElement("div", {
        "className": "o-selector"
      }, React.createElement("div", {
        "className": "o-selector__current"
      }, this._renderItems(this.state.current), React.createElement("input", {
        "ref": "input",
        "value": this.state.query,
        "onFocus": this._showFilteredItems,
        "onBlur": this._hideFilteredItems,
        "onKeyDown": this._processActions,
        "onChange": this._processQuery
      })), React.createElement("div", {
        "className": "o-selector__filtered"
      }, (this.state.show_filtered_items ? this._renderItems(this.state.universe) : void 0)));
    }
  });

  Current = React.createClass({
    getInitialState: function() {
      return {
        query: ""
      };
    },
    render: function() {
      return false;
    }
  });

  Universe = React.createClass({
    render: function() {
      return React.createElement("div", {
        "className": "o-selector__universe"
      }, this.props.children);
    }
  });

  Selector.Current = Current;

  Selector.Universe = Universe;

  module.exports = Selector;

}).call(this);
