import './styles/button.less';

import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';

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
            reactist: true,
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
Button.propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func,
    secondary: PropTypes.bool,
    small: PropTypes.bool,
    white: PropTypes.bool,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    data_tip: PropTypes.string,
};

export default Button;