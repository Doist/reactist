import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import { Button } from '../deprecated-button/deprecated-button.js'

const _excluded = ['children', 'onClick', 'tooltip', 'className']

class Box extends React.Component {
    constructor(props, context) {
        super(props, context)
        this._timeout = void 0

        this._handleClickOutside = (event) => {
            const dropdownDOMNode = ReactDOM.findDOMNode(this)
            if (dropdownDOMNode && !dropdownDOMNode.contains(event.target)) this._toggleShowBody()
            else if (!this.props.allowBodyInteractions) {
                // won't close when body interactions are allowed
                this._timeout = setTimeout(() => {
                    if (this.state.showBody) {
                        this._toggleShowBody()
                    }
                }, 100)
            }
        }

        this._toggleShowBody = () => {
            if (!this.state.showBody) {
                // will show
                if (this.props.onShowBody) this.props.onShowBody()
                document.addEventListener('click', this._handleClickOutside, true)
            } else {
                // will hide
                if (this.props.onHideBody) this.props.onHideBody()
                document.removeEventListener('click', this._handleClickOutside, true)
            }

            this.setState({
                showBody: !this.state.showBody,
            })
        }

        this._setPosition = (body) => {
            if (body) {
                const scrollingParent = document.getElementById(
                    this.props.scrolling_parent ? this.props.scrolling_parent : '',
                )

                if (scrollingParent) {
                    const dropdown = ReactDOM.findDOMNode(this)

                    if (!dropdown) {
                        return
                    }

                    const dropdownVerticalPosition = ReactDOM.findDOMNode(this).offsetTop
                    const dropdownTrigger = dropdown.querySelector('.trigger')

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
                        this.setState({
                            top,
                        })
                    }
                }
            }
        }

        this.state = {
            showBody: false,
            top: props.top || false,
        }
        this._timeout = undefined
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleClickOutside, true)

        if (this._timeout) {
            clearTimeout(this._timeout)
        }
    }

    _getTriggerComponent() {
        var _this$props$children

        const _trigger =
            (_this$props$children = this.props.children) == null ? void 0 : _this$props$children[0]

        return _trigger
            ? /*#__PURE__*/ React.cloneElement(_trigger, {
                  onClick: this._toggleShowBody,
              })
            : undefined
    } // https://facebook.github.io/react/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components

    _getBodyComponent() {
        if (!this.state.showBody) {
            return null
        }

        const { top } = this.state
        const { right = false, children } = this.props
        const props = {
            top,
            right,
            setPosition: this._setPosition,
        }
        const className = classNames({
            body_wrapper: true,
            with_arrow: true,
            top: top,
            bottom: !top,
        })
        const body = children == null ? void 0 : children[1]
        const contentMarkup =
            typeof body === 'function'
                ? body(props)
                : body
                ? /*#__PURE__*/ React.cloneElement(body, props)
                : undefined
        return /*#__PURE__*/ React.createElement(
            'div',
            {
                className: className,
                style: {
                    position: 'relative',
                },
            },
            contentMarkup,
        )
    }

    render() {
        const className = classNames('reactist_dropdown', this.props.className)
        const { top } = this.state
        return /*#__PURE__*/ React.createElement(
            'div',
            {
                style: {
                    display: 'inline-block',
                },
                className: className,
                'data-testid': 'reactist-dropdown-box',
            },
            top && this._getBodyComponent(),
            this._getTriggerComponent(),
            !top && this._getBodyComponent(),
        )
    }
}

Box.displayName = void 0
Box.displayName = 'Dropdown.Box'
const Trigger = /*#__PURE__*/ React.forwardRef(function Trigger(_ref, ref) {
    let { children, onClick, tooltip, className } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    function handleClick(event) {
        event.preventDefault()
        event.stopPropagation()
        if (onClick) onClick(event)
    }

    return /*#__PURE__*/ React.createElement(
        Button,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                className: classNames('trigger', className),
                onClick: handleClick,
                tooltip: tooltip,
                ref: ref,
            },
        ),
        children,
    )
})
Trigger.displayName = 'Dropdown.Trigger'

function Body({ top, right, children, setPosition }) {
    const style = {
        position: 'absolute',
        right: 0,
        top: 0,
    }

    if (top) {
        style.top = 'auto'
        style.bottom = 0
    }

    if (right) {
        style.right = 'auto'
        style.left = 0
    }

    return /*#__PURE__*/ React.createElement(
        'div',
        {
            ref: setPosition,
            style: style,
            className: 'body',
            id: 'reactist-dropdown-body',
            'data-testid': 'reactist-dropdown-body',
        },
        children,
    )
}

Body.displayName = 'Dropdown.Body'
const Dropdown = {
    Box,
    Trigger,
    Body,
}

export { Dropdown }
//# sourceMappingURL=dropdown.js.map
