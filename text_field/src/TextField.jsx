var React = require('react');

class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.keymap = [];

        if (this.props.onKeysDoAction) {
            this.special_keys = this.props.onKeysDoAction.map(obj => obj.keys);
            this.special_keys = this.special_keys.concat.apply([],this.special_keys);
        }
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
        var keyCode = event.keyCode;
        if (this.props.onKeysDoAction && this.special_keys.indexOf(keyCode) != -1) {
            this.keymap[keyCode] = event.type == 'keydown';
            for (var obj of this.props.onKeysDoAction) {
                var match = true
                for(var key of obj.keys) {
                    if (this.keymap[key] != true) {
                        match = false;
                        break;
                    }
                }
                if(match) {
                    obj.action();
                    this.keymap = [];
                    break;
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
            onKeyUp={this._trackKeyEvents.bind(this)}
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
            onKeyUp={this._trackKeyEvents.bind(this)}
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
