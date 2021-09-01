import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

// import CloseIcon from '../icons/CloseIcon.svg'

// import './modal.less'

import styles from './modal.module.css'

type Props = {
    /** Additional css class applied to the Modal.Box. */
    className?: string
    /** Sometimes a class name is not enough so you can use this to set the style directly. */
    style?: React.CSSProperties
    /** Large style. */
    large: boolean
    /** Medium size syle. */
    medium?: boolean
    /** Close the Modal when clicking on the overlay. */
    closeOnOverlayClick: boolean
}

class Box extends React.Component<React.PropsWithChildren<Props>> {
    public static displayName: string
    public static defaultProps: Props

    componentDidMount() {
        window.addEventListener('keydown', this._handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this._handleKeyDown)
    }

    _closeModal = () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const modalElement = document.getElementById('modal_box')!
        ReactDOM.unmountComponentAtNode(modalElement)
    }

    _handleKeyDown = (event: Partial<KeyboardEvent>) => {
        if (event.keyCode === 27) {
            // ESC
            this._closeModal()
            if (event.preventDefault) event.preventDefault()
        }
    }

    _handleOverlayClick = (event: React.MouseEvent<Element>) => {
        if (
            event.target instanceof Element &&
            (event.target.id === 'reactist-overlay' || event.target.id === 'reactist-overlay-inner')
        ) {
            this._closeModal()
        }
    }

    render() {
        const { large, medium, style, children, closeOnOverlayClick } = this.props

        const className = classnames([
            styles.modalBox,
            { [styles[`modalBox-large`]]: large },
            { [styles[`modalBox-medium`]]: medium },
            this.props.className,
        ])

        return (
            <div
                className={styles.reactistOverlay}
                id="reactist-overlay"
                onClick={closeOnOverlayClick ? this._handleOverlayClick : undefined}
            >
                <div className={styles.reactistOverlayInner} id="reactist-overlay-inner">
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
    closeOnOverlayClick: false,
}

type HeaderProps = {
    /** Title of the Modal.Header. */
    title?: string | React.ReactNode
    /** Subtitle of the Modal.Header. */
    subtitle?: string | React.ReactNode
    /** Function that is called right before the Modal unmounts itself. */
    beforeClose?: () => void
}

class Header extends React.Component<HeaderProps> {
    public static displayName: string
    public static defaultProps: HeaderProps

    _closeModal(event: React.MouseEvent) {
        event.preventDefault()
        if (typeof this.props.beforeClose === 'function') {
            this.props.beforeClose()
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const modalElement = document.getElementById('modal_box')!
        ReactDOM.unmountComponentAtNode(modalElement)
    }

    render() {
        return (
            /* eslint-disable jsx-a11y/anchor-is-valid */
            <div className={styles.reactistModalBoxHeader}>
                <p>
                    {this.props.title && (
                        <span className={styles.reactistModalBoxHeaderTitle}>
                            {this.props.title}
                        </span>
                    )}
                    {this.props.subtitle && (
                        <span className={styles.reactistModalBoxHeaderSubtitle}>
                            {this.props.subtitle}
                        </span>
                    )}
                    {this.props.children}
                </p>
                <a
                    className={styles.reactistModalBoxHeaderClose}
                    onClick={this._closeModal.bind(this)}
                    href="#"
                >
                    {/* <CloseIcon /> */}
                </a>
            </div>
            /* eslint-enable jsx-a11y/anchor-is-valid */
        )
    }
}
Header.displayName = 'Modal.Header'

type BodyProps = {
    /** Display an icon (or basically any component) on the right hand side of the Modal.Body. */
    icon?: React.ReactNode
    /** Applies less styles on the body (e.g. no padding) */
    plain?: boolean
    /** Sometimes a class name is not enough so you can use this to set the style directly. */
    style?: React.CSSProperties
    /** Additionall css class applied to the Modal.Body. */
    className?: string
    /**
     * Render a close icon in the top right corner of the Modal.Body.
     * Recommended to use when no Modal.Header is used.
     */
    showCloseIcon?: boolean
}
class Body extends React.Component<BodyProps> {
    public static displayName: string
    public static defaultProps: BodyProps

    _closeModal(event: React.MouseEvent) {
        event.preventDefault()
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const modalElement = document.getElementById('modal_box')!
        ReactDOM.unmountComponentAtNode(modalElement)
    }

    render() {
        const { icon, plain, children, style, showCloseIcon } = this.props
        const className = classnames(
            styles.reactistModalBoxBodyBody,
            { [styles[`reactistModalBoxBodyBody-plain`]]: plain },
            this.props.className,
        )

        return (
            /* eslint-disable jsx-a11y/anchor-is-valid */
            <div className={className} style={style}>
                {showCloseIcon && (
                    <a
                        className={styles.reactistModalBoxBodyClose}
                        onClick={this._closeModal.bind(this)}
                        href="#"
                    >
                        {/* <CloseIcon /> */}
                    </a>
                )}
                {icon ? (
                    <div className={styles.reactistModalBoxBodyDialog}>
                        <div className={styles.reactistIcon}>{icon}</div>
                        <div className={styles.reactistModalBoxBodyContent}>{children}</div>
                    </div>
                ) : (
                    children
                )}
            </div>
            /* eslint-enable jsx-a11y/anchor-is-valid */
        )
    }
}
Body.displayName = 'Modal.Body'
Body.defaultProps = {
    showCloseIcon: false,
}

type ActionProps = {
    /**
     * Children to render inside the Modal.Actions. They can have an optional `close` property (boolean).
     * When that is supplied and set to true it will close the modal after the onClick function
     */
    children?: React.ReactNode
}

type ActionChildrenProps = {
    close?: boolean
    onClick?: () => void
}

class Actions extends React.Component<ActionProps> {
    public static displayName: string

    _onClick(onClick: ActionChildrenProps['onClick']) {
        if (onClick) {
            onClick()
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const modalElement = document.getElementById('modal_box')!
        ReactDOM.unmountComponentAtNode(modalElement)
    }

    render() {
        const children = React.Children.map(
            // see: https://github.com/microsoft/TypeScript/issues/21699
            // @ts-expect-error Children cannot be typed properly yet in React
            this.props.children,
            (child: React.ReactElement<ActionChildrenProps>) => {
                if (child?.props?.close) {
                    return React.cloneElement(child, {
                        onClick: () => this._onClick(child.props.onClick),
                    })
                } else {
                    return child ? React.cloneElement(child) : <></>
                }
            },
        )

        return <div className={styles.reactistModalBoxActions}>{children}</div>
    }
}
Actions.displayName = 'Modal.Actions'

type Modal = {
    Box: Box
    Header: Header
    Body: Body
    Actions: Actions
}

export type { Modal }

export { Box, Header, Body, Actions }
