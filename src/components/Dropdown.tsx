import './styles/dropdown.less'

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * @typedef {Object} BoxProps
 * @property {() => void} [onShowBody]
 * @property {() => void} [onHideBody]
 * @property {boolean} [allowBodyInteractions]
 * @property {boolean} [top]
 * @property {boolean} [right]
 * @property {string} [scrolling_parent]
 * @property {[React.ReactElement<TriggerProps>, React.ReactElement<{}> | ((props: {}) => JSX.Element)]} children
 * @property {string} [className]
 */

/**
 * @typedef {Object} BoxState
 * @typedef {boolean} top
 * @typedef {boolean} show_body
 */

/** @extends {React.Component<BoxProps, BoxState>} */
class Box extends React.Component<any, any> {
    public static displayName
    public static propTypes

    /**
     * @param {BoxProps} props
     * @param {unknown} context
     */
    constructor(props, context) {
        super(props, context)
        this.state = {
            //eslint-disable-next-line @typescript-eslint/camelcase
            show_body: false,
            top: props.top || false,
        }

        this._handleClickOutside = this._handleClickOutside.bind(this)
        this._setPosition = this._setPosition.bind(this)
        this._toggleShowBody = this._toggleShowBody.bind(this)
        ;(this as any)._timeout = null
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleClickOutside, true)
        if ((this as any)._timeout) {
            clearTimeout((this as any)._timeout)
        }
    }

    /**
     * @param {MouseEvent} event
     */
    _handleClickOutside(event) {
        //eslint-disable-next-line @typescript-eslint/camelcase
        const dropdown_dom_node = ReactDOM.findDOMNode(this)

        //eslint-disable-next-line @typescript-eslint/camelcase
        if (!dropdown_dom_node.contains(/** @type {Node} */ event.target))
            this._toggleShowBody()
        else if (!this.props.allowBodyInteractions) {
            // won't close when body interactions are allowed
            ;(this as any)._timeout = setTimeout(() => {
                if (this.state.show_body) {
                    this._toggleShowBody()
                }
            }, 100)
        }
    }

    _toggleShowBody() {
        if (!this.state.show_body) {
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
            //eslint-disable-next-line @typescript-eslint/camelcase
            show_body: !this.state.show_body,
        })
    }

    _getTriggerComponent() {
        const _trigger = this.props.children[0]
        return React.cloneElement(_trigger, { onClick: this._toggleShowBody })
    }

    // https://facebook.github.io/react/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components
    /**
     * @param {HTMLElement} body
     */
    _setPosition(body) {
        if (body) {
            //eslint-disable-next-line @typescript-eslint/camelcase
            const scrolling_parent = document.getElementById(
                this.props.scrolling_parent
            )

            /* eslint-disable @typescript-eslint/camelcase */
            if (scrolling_parent) {
                const dropdown = ReactDOM.findDOMNode(this)
                const dropdown_vertical_position = /** @type {HTMLElement} */ (ReactDOM.findDOMNode(
                    this
                ) as HTMLElement).offsetTop
                const dropdown_trigger_height = /** @type {Element} */ (dropdown as Element).querySelector(
                    '.trigger'
                ).clientHeight
                const dropdown_body_height = body.clientHeight

                const scrolling_parent_height = scrolling_parent.clientHeight
                const scrolling_parent_offset = scrolling_parent.scrollTop

                const bottom_offset =
                    scrolling_parent_height +
                    scrolling_parent_offset -
                    dropdown_vertical_position -
                    dropdown_trigger_height

                const top = bottom_offset < dropdown_body_height

                if (top !== this.state.top) {
                    this.setState({ top })
                }
            }
            /* eslint-enable @typescript-eslint/camelcase */
        }
    }

    _getBodyComponent() {
        if (!this.state.show_body) {
            return null
        }
        const { top } = this.state
        const { right = false, children } = this.props
        const props = { top, right, setPosition: this._setPosition }

        /* eslint-disable @typescript-eslint/camelcase */
        const class_name = classNames({
            body_wrapper: true,
            with_arrow: true,
            top: top,
            bottom: !top,
        })
        /* eslint-enable @typescript-eslint/camelcase */

        const body = children[1]

        const contentMarkup =
            typeof body === 'function'
                ? body(props)
                : React.cloneElement(body, props)
        return (
            //eslint-disable-next-line @typescript-eslint/camelcase
            <div className={class_name} style={{ position: 'relative' }}>
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
Box.propTypes = {
    /** Whether the dropdown should open to the top. */
    top: PropTypes.bool,
    /** Whether the dropdown should open to the right. */
    right: PropTypes.bool,
    /** Id of the scrolling parent element to place dropdown in it. */
    //eslint-disable-next-line @typescript-eslint/camelcase
    scrolling_parent: PropTypes.string,
    /** Whether to keep dropdown open when interacted with the Body content. */
    allowBodyInteractions: PropTypes.bool,
    /** Callback function when the body is shown. */
    onShowBody: PropTypes.func,
    /** Callback function when the body is hidden. */
    onHideBody: PropTypes.func,
    /** Additional css class applied to the Dropdown. */
    className: PropTypes.string,
    /** Should be two elements: Dropdown.Trigger and Dropdown.Body.
     * Second element can be a function, which will be called only if it is open */
    children: PropTypes.any,
}

interface TriggerProps {
    onClick?: (event?: React.MouseEvent) => void
}

class Trigger extends React.Component<TriggerProps> {
    public static displayName
    public static propTypes

    /**
     * @param {TriggerProps} props
     * @param {unknown} context
     */
    constructor(props, context) {
        super(props, context)
        this._onClick = this._onClick.bind(this)
    }

    /**
     * @param {React.MouseEvent} event
     */
    _onClick(event) {
        event.preventDefault()
        event.stopPropagation()
        this.props.onClick(event)
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
Trigger.propTypes = {
    /** INTERNAL Callback when the trigger is clicked. Setting this yourself won't have an effect. */
    onClick: PropTypes.func,
    /** Content of the dropdown trigger. Can be anything from a string to component(s). */
    children: PropTypes.any,
}

class Body extends React.Component<any, any, any> {
    public static displayName
    public static propTypes

    render() {
        /** @type {React.CSSProperties} */
        const style = {
            position: 'absolute',
            right: 0,
            top: 0,
        } as any

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
Body.propTypes = {
    /** INTERNAL Whether the dropdown should open to the top. Set this on the Dropdown.Box. */
    top: PropTypes.bool,
    /** INTERNAL Whether the dropdown should open to the right. Set this on the Dropdown.Box. */
    right: PropTypes.bool,
    /** INTERNAL Callback to correctly set the position of the dropdown. Setting this yourself wont' have an effect. */
    setPosition: PropTypes.func,
    /** Content of the dropdown body. Can be anything from a string to component(s). */
    children: PropTypes.any,
}

const Dropdown = {
    Box,
    Trigger,
    Body,
}

export default Dropdown
