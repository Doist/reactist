var React = require('react');

class TextField extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._adjustHeight();
    }

    componentDidUpdate() {
        this._adjustHeight();
    }

    _adjustHeight() {
        if (this.props.multiline) {
            var textarea = this.refs.container.getDOMNode();
            textarea.style.height = "1px";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }

    _onChange() {
        if (this.props.onChange) {
            var _value = this.refs.container.getDOMNode().value;
            this.props.onChange(_value);
        } else {
            this.forceUpdate();
        }

    }

    _onFocus() {
        if (this.props.onFocus) {
            this.props.onFocus();
        }

    }

    _onBlur() {
        this.keymap = [];
        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    _trackKeyEvents(event) {
        if (this.props.action) {
            if (event.keyCode == 13)  {
                if (event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
                    event.preventDefault();
                    this.props.action();
                }
            }
        }
    }

    _renderTextarea() {
        return <textarea
            value={this.props.value}
            ref="container"
            onChange={this._onChange.bind(this)}
            placeholder={this.props.placeholder}
            onKeyDown={this._trackKeyEvents.bind(this)}
            onFocus={this._onFocus.bind(this)}
            onBlur={this._onBlur.bind(this)}
            />
    }

    _renderInput() {
        var type = "text"
        if (this.props.type) {
            type = this.props.type
        }
        return <input
            value={this.props.value}
            ref="container"
            type={type}
            onChange={this._onChange.bind(this)}
            placeholder={this.props.placeholder}
            onKeyDown={this._trackKeyEvents.bind(this)}
            onFocus={this._onFocus.bind(this)}
            onBlur={this._onBlur.bind(this)}
            />
    }

    render() {
        var container = this._renderInput();
        if (this.props.multiline) {
            container = this._renderTextarea();
        }
        return <div className="o-textfield">
            {container}
        </div>
    }
};

module.exports = TextField;
