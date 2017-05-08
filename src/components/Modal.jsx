import './styles/modal.less';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import CloseIcon from './icons/CloseIcon.svg';

class Box extends React.Component {
    componentDidMount() {
        var overlay = ReactDOM.findDOMNode(this);
        // adds the 'overlay-active' class after a small timeout
        setTimeout(() => {
            if (overlay && overlay.classList && !overlay.classList.contains('overlay-active')) {
                overlay.className += ' overlay-active';
            }
        }, 10);
    }

    render() {
        let class_name = 'modal_box';
        if (this.props.className) {
            class_name += ` ${this.props.className}`;
        }
        
        return (
            <div className='overlay'>
                <div className={class_name}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
Box.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

class Header extends React.Component {
    _closeModal(event) {
        event.preventDefault();
        ReactDOM.unmountComponentAtNode(document.getElementById('modal_box'));
    }

    render() {
        let className = 'modal_box__header';

        return (
            <div className={className}>
                <p>
                    {this.props.title && <span className="title">{this.props.title}</span>}
                    {this.props.subtitle && <span className="subtitle">{this.props.subtitle}</span>}
                    {this.props.children}
                </p>
                <a className='close'
                   onClick={this._closeModal.bind(this)}
                   href='#'>
                    <CloseIcon />
                </a>
            </div>
        );
    }
}
Header.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    title: PropTypes.string,
    subtitle: PropTypes.string
};

class Body extends React.Component {
    _closeModal(event) {
        event.preventDefault();
        ReactDOM.unmountComponentAtNode(document.getElementById('modal_box'));
    }

    render() {
        return (
            <div className='modal_box__body'>
                {this.props.showCloseIcon && (
                    <a className='close'
                        onClick={this._closeModal.bind(this)}
                        href='#'>
                        <CloseIcon />
                    </a>)
                }
                {this.props.icon
                    ? ( <div>
                            <div className='icon'>{this.props.icon}</div>
                            <div className='content'>{this.props.children}</div>
                        </div> )
                    : this.props.children
                }
            </div>
        );
    }
}
Body.propTypes = {
    icon: PropTypes.node,
    showCloseIcon: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

class Actions extends React.Component {
    _onClick(on_click) {
        if(typeof on_click === 'function') {
            on_click();
        }        
        ReactDOM.unmountComponentAtNode(document.getElementById('modal_box'));
    }

    render() {
        const children = React.Children.map(this.props.children, (child) => {
            if (!child) return false;
            if (child.props.close) {
                return React.cloneElement(child, { onClick: this._onClick.bind(null, child.props.onClick) });
            } else {
                return React.cloneElement(child);
            }
        });

        return (
            <div className='modal_box__actions'>
                {children}
            </div>
        );
    }
}
/**
 * Children can have an optional `close` property (boolean).
 * When supplied and set to true it will close the modal after the onClick function
 */
Actions.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default { 
    Box, 
    Header, 
    Body, 
    Actions 
};
