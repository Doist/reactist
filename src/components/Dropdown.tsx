import './styles/dropdown.less'

import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

type BoxProps = {
    onShowBody?: () => void
    onHideBody?: () => void
    allowBodyInteractions?: boolean
    top?: boolean
    right?: boolean
    scrolling_parent?: string
    children?: [
        React.ReactElement<TriggerProps>,
        React.ReactElement<{}> | ((props: {}) => JSX.Element)
    ]
    className?: string
}

type BoxState = {
    top: boolean
    showBody: boolean
}

class Box extends React.Component<BoxProps, BoxState> {
    public static displayName: string

    constructor(props: BoxProps, context: React.Context<any>) {
        super(props, context)
        this.state = {
            showBody: false,
            top: props.top || false,
        }

        this._handleClickOutside = this._handleClickOutside.bind(this)
        this._setPosition = this._setPosition.bind(this)
        this._toggleShowBody = this._toggleShowBody.bind(this)
        this._timeout = undefined
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleClickOutside, true)
        if (this._timeout) {
            clearTimeout(this._timeout)
        }
    }
    _timeout?: ReturnType<typeof setTimeout>

    _handleClickOutside(event: MouseEvent) {
        const dropdownDOMNode = ReactDOM.findDOMNode(this)

        if (dropdownDOMNode && !dropdownDOMNode.contains(event.target as Node))
            this._toggleShowBody()
        else if (!this.props.allowBodyInteractions) {
            // won't close when body interactions are allowed
            this._timeout = setTimeout(() => {
                if (this.state.showBody) {
                    this._toggleShowBody()
                }
            }, 100)
        }
    }

    _toggleShowBody() {
        if (!this.state.showBody) {
            // will show
            if (this.props.onShowBody) this.props.onShowBody()
            document.addEventListener('click', this._handleClickOutside, true)
        } else {
            // will hide
            if (this.props.onHideBody) this.props.onHideBody()
            document.removeEventListener(
                'click',
                this._handleClickOutside,
                true
            )
        }

        this.setState({
            showBody: !this.state.showBody,
        })
    }

    _getTriggerComponent() {
        const _trigger = this.props.children && this.props.children[0]
        return _trigger
            ? React.cloneElement(_trigger, { onClick: this._toggleShowBody })
            : undefined
    }

    // https://facebook.github.io/react/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components
    _setPosition(body: HTMLElement) {
        if (body) {
            const scrollingParent = document.getElementById(
                this.props.scrolling_parent ? this.props.scrolling_parent : ''
            )

            if (scrollingParent) {
                const dropdown = ReactDOM.findDOMNode(this)
                if (!dropdown) {
                    return
                }
                const dropdownVerticalPosition = (ReactDOM.findDOMNode(
                    this
                ) as HTMLElement).offsetTop
                const dropdownTrigger = (dropdown as Element).querySelector(
                    '.trigger'
                )
                if (!dropdownTrigger) {
                    return
                }
                const dropdownTriggerHeight = dropdownTrigger.clientHeight
                const dropdownBodyHeight = body.clientHeight

                const scrollingParentHeight = scrollingParent.clientHeight
                const scrollingParentOffset = scrollingParent.scrollTop

                const bottomOffset =
                    scrollingParentHeight +
                    scrollingParentOffset -
                    dropdownVerticalPosition -
                    dropdownTriggerHeight

                const top = bottomOffset < dropdownBodyHeight

                if (top !== this.state.top) {
                    this.setState({ top })
                }
            }
        }
    }

    _getBodyComponent() {
        if (!this.state.showBody) {
            return null
        }
        const { top } = this.state
        const { right = false, children } = this.props
        const props = { top, right, setPosition: this._setPosition }

        /* eslint-disable @typescript-eslint/camelcase */
        const className = classNames({
            body_wrapper: true,
            with_arrow: true,
            top: top,
            bottom: !top,
        })
        /* eslint-enable @typescript-eslint/camelcase */

        const body = children && children[1]

        const contentMarkup =
            typeof body === 'function'
                ? body(props)
                : body
                ? React.cloneElement(body, props)
                : undefined
        return (
            <div className={className} style={{ position: 'relative' }}>
                {contentMarkup}
            </div>
        )
    }

    render() {
        const className = classNames('reactist_dropdown', this.props.className)
        const { top } = this.state

        return (
            <div style={{ display: 'inline-block' }} className={className}>
                {top && this._getBodyComponent()}
                {this._getTriggerComponent()}
                {!top && this._getBodyComponent()}
            </div>
        )
    }
}
Box.displayName = 'Dropdown.Box'

type TriggerProps = {
    onClick?: (event?: React.MouseEvent) => void
}

class Trigger extends React.Component<TriggerProps> {
    public static displayName: string

    constructor(props: TriggerProps, context: React.Context<unknown>) {
        super(props, context)
        this._onClick = this._onClick.bind(this)
    }

    _onClick(event: React.MouseEvent) {
        event.preventDefault()
        event.stopPropagation()
        if (this.props.onClick) this.props.onClick(event)
    }

    render() {
        const style = {
            display: 'block',
        }

        return (
            <div style={style} className="trigger" onClick={this._onClick}>
                {this.props.children}
            </div>
        )
    }
}
Trigger.displayName = 'Dropdown.Trigger'

class Body extends React.Component<any, any, any> {
    public static displayName: string

    render() {
        const style: React.CSSProperties = {
            position: 'absolute',
            right: 0,
            top: 0,
        }

        if (this.props.top) {
            style.top = 'auto'
            style.bottom = 0
        }

        if (this.props.right) {
            style.right = 'auto'
            style.left = 0
        }

        return (
            <div
                ref={this.props.setPosition}
                style={style}
                className="body"
                id="reactist-dropdown-body"
            >
                {this.props.children}
            </div>
        )
    }
}
Body.displayName = 'Dropdown.Body'

const Dropdown = {
    Box,
    Trigger,
    Body,
}

export default Dropdown
