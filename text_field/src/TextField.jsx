var React = require('react');

class TextField extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        // auto height update on textareas
        if (this.props.multiline) {
            var textarea = this.refs.container.getDOMNode();
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }

    _onChange() {
        var _value = this.refs.container.getDOMNode().value;
        this.props.onChange(_value);
    }

    _onFocus() {
        return null
    }

    _renderTextarea() {
        return <textarea
            value={this.props.value}
            ref="container"
            onChange={this._onChange.bind(this)}
            placeholder={this.props.placeholder}
            onFocus={this._onFocus.bind(this)}
            />
    }

    _renderInput() {
        return <input
            value={this.props.value}
            ref="container"
            onChange={this._onChange.bind(this)}
            placeholder={this.props.placeholder}
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
