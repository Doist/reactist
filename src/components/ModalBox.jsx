import './styles/modal_box.less';

import React from 'react';
import ReactDOM from 'react-dom';

import closeIcon from './icons/closeIcon.js';

class ModalBox extends React.Component {
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

class Header extends React.Component {
    _closeModal(event) {
        event.preventDefault();
        ReactDOM.unmountComponentAtNode(document.getElementById('modal_box'));
    }

    render() {
        let className = 'modal_box__header';
        let close_icon_color = '#fff'

        if (this.props.whiteBg) {
            className += ' white'
            close_icon_color = '#B3B3B3'
        }

        return (
            <div className={className}>
                <p>{this.props.children}</p>
                <a
                    className='close'
                    onClick={this._closeModal.bind(this)}
                    dangerouslySetInnerHTML={{ __html: closeIcon(close_icon_color) }}
                    href='#'
                />
            </div>
        );
    }
}

class Body extends React.Component {
    render() {
        return (
            <div className='modal_box__body'>
                {this.props.children}
            </div>
        );
    }
}

class Actions extends React.Component {
    _onClick(on_click) {
        on_click();
        ReactDOM.unmountComponentAtNode(document.getElementById('modal_box'));
    }

    render() {
        const children = React.Children.map(this.props.children, (child) => {
            if (!child) return false;
            if (child.type.name == 'Button' && child.props.close) {
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


export { ModalBox, Header, Body, Actions };
