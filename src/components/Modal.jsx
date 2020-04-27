import './styles/modal.less'

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import CloseIcon from './icons/CloseIcon.svg'

/**
 * @typedef {Object} Props
 * @property {string} [className]
 * @property {React.CSSProperties} [style]
 * @property {boolean} [large]
 * @property {boolean} [medium]
 * @property {boolean} [closeOnOverlayClick]
 */

/** @extends {React.Component<Props>} */
class Box extends React.Component {
    /**
     * @param {Props} props
     * @param {unknown} context
     */
    constructor(props, context) {
        super(props, context)
        this._handleKeyDown = this._handleKeyDown.bind(this)
        this._closeModal = this._closeModal.bind(this)
        this._handleOverlayClick = this._handleOverlayClick.bind(this)
        window.addEventListener('keydown', this._handleKeyDown)
        window.addEventListener('click', this._handleOverlayClick)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this._handleKeyDown)
        window.removeEventListener('click', this._handleOverlayClick)
    }

    _closeModal() {
        ReactDOM.unmountComponentAtNode(document.getElementById('modal_box'))
    }

    /**
     * @param {KeyboardEvent} event
     */
    _handleKeyDown(event) {
        if (event.keyCode === 27) {
            // ESC
            this._closeModal()
            event.preventDefault()
        }
    }

    /**
     * @param {MouseEvent} event
     */
    _handleOverlayClick(event) {
        if (
            this.props.closeOnOverlayClick &&
            event &&
            event.target &&
            (event.target.id === 'reactist-overlay' ||
                event.target.id === 'reactist-overlay-inner')
        ) {
            this._closeModal()
        }
    }

    render() {
        const { large, medium, style, children } = this.props
        const className = classnames(
            'reactist_modal_box',
            { large, medium },
            this.props.className
        )

        return (
            <div className="reactist_overlay" id="reactist-overlay">
                <div
                    className="reactist_overlay_inner"
                    id="reactist-overlay-inner"
                >
                    <div style={style} className={className}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}
Box.displayName = 'Modal.Box'
Box.defaultProps = {
    large: false,
    closeOnOverlayClick: false
}
Box.propTypes = {
    /** Additional css class applied to the Modal.Box. */
    className: PropTypes.string,
    /** Sometimes a class name is not enough so you can use this to set the style directly. */
    style: PropTypes.object,
    /** Large style. */
    large: PropTypes.bool,
    /** Medium size syle. */
    medium: PropTypes.bool,
    /** Close the Modal when clicking on the overlay. */
    closeOnOverlayClick: PropTypes.bool,
    /** Children to render inside the Modal.Box. Normally Modal.Header, Modal.Body and Modal.Actions. */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

class Header extends React.Component {
    /**
     * @param {React.MouseEvent} event
     */
    _closeModal(event) {
        event.preventDefault()
        if (typeof this.props.beforeClose === 'function') {
            this.props.beforeClose()
        }
        ReactDOM.unmountComponentAtNode(document.getElementById('modal_box'))
    }

    render() {
        return (
            <div className="reactist_modal_box__header">
                <p>
                    {this.props.title && (
                        <span className="title">{this.props.title}</span>
                    )}
                    {this.props.subtitle && (
                        <span className="subtitle">{this.props.subtitle}</span>
                    )}
                    {this.props.children}
                </p>
                <a
                    className="close"
                    onClick={this._closeModal.bind(this)}
                    href="#"
                >
                    <CloseIcon />
                </a>
            </div>
        )
    }
}
Header.displayName = 'Modal.Header'
Header.propTypes = {
    /** Children to render inside the Modal.Header for a fully customizable appearance. */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    /** Title of the Modal.Header. */
    title: PropTypes.string,
    /** Subtitle of the Modal.Header. */
    subtitle: PropTypes.string,
    /** Function that is called right before the Modal unmounts itself. */
    beforeClose: PropTypes.func
}

class Body extends React.Component {
    /**
     * @param {React.MouseEvent} event
     */
    _closeModal(event) {
        event.preventDefault()
        ReactDOM.unmountComponentAtNode(document.getElementById('modal_box'))
    }

    render() {
        const { icon, plain, children, style, showCloseIcon } = this.props
        const className = classnames(
            'reactist_modal_box__body',
            { plain },
            this.props.className
        )

        return (
            <div className={className} style={style}>
                {showCloseIcon && (
                    <a
                        className="close"
                        onClick={this._closeModal.bind(this)}
                        href="#"
                    >
                        <CloseIcon />
                    </a>
                )}
                {icon ? (
                    <div className="dialog">
                        <div className="reactist_icon">{icon}</div>
                        <div className="content">{children}</div>
                    </div>
                ) : (
                    children
                )}
            </div>
        )
    }
}
Body.displayName = 'Modal.Body'
Body.defaultProps = {
    showCloseIcon: false
}
Body.propTypes = {
    /** Display an icon (or basically any component) on the right hand side of the Modal.Body. */
    icon: PropTypes.node,
    /**
     * Render a close icon in the top right corner of the Modal.Body.
     * Recommended to use when no Modal.Header is used.
     */
    showCloseIcon: PropTypes.bool,
    /** Additionall css class applied to the Modal.Body. */
    className: PropTypes.string,
    /** Sometimes a class name is not enough so you can use this to set the style directly. */
    style: PropTypes.object,
    /** Applies less styles on the body (e.g. no padding) */
    plain: PropTypes.bool,
    /** Children to render inside the Modal.Body. */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

/**
 * @typedef {Object} ActionProps
 * @property {() => void} [onClick]
 * @property {boolean} [close]
 */

/** @extends {React.Component} */
class Actions extends React.Component {
    /** @param {ActionProps['onClick']} on_click */
    _onClick(on_click) {
        if (typeof on_click === 'function') {
            on_click()
        }
        ReactDOM.unmountComponentAtNode(document.getElementById('modal_box'))
    }

    render() {
        const children = React.Children.map(
            this.props.children,
            /** @param {React.ReactElement<ActionProps>} child */ child => {
                if (!child) return false
                if (child.props.close) {
                    return React.cloneElement(child, {
                        onClick: () => this._onClick(child.props.onClick)
                    })
                } else {
                    return React.cloneElement(child)
                }
            }
        )

        return <div className="reactist_modal_box__actions">{children}</div>
    }
}
Actions.displayName = 'Modal.Actions'
Actions.propTypes = {
    /**
     * Children to render inside the Modal.Actions. They can have an optional `close` property (boolean).
     * When that is supplied and set to true it will close the modal after the onClick function
     */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default {
    Box,
    Header,
    Body,
    Actions
}
