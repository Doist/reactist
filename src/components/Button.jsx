import './styles/button.less';

import classNames from 'classnames';
import React from 'react';
import ReactTooltip from 'react-tooltip';

class Button extends React.Component {
    constructor(props, context) {
        super(props, context);
        this._onClick = this._onClick.bind(this);
    }

    _onClick(event) {
        event.preventDefault();
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const { data_tip } = this.props

        const className = classNames({
            button: true,
            secondary: this.props.secondary,
            small: this.props.small,
            white: this.props.white,
            loading: this.props.loading
        });

        return (
            <button
                className={className}
                disabled={this.props.disabled}
                onClick={this._onClick}>
                <div
                    data-tip={data_tip}
                    className='wrapper'>
                    <span>{this.props.name}</span>
                </div>
                {data_tip && <ReactTooltip effect='solid' multiline />}
            </button>
        )
    }
}

export default Button;