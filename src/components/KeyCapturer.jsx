import React from 'react'
import PropTypes from 'prop-types'

const SUPPORTED_KEYS = {
    ARROW_UP: 'ArrowUp',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ENTER: 'Enter',
    BACKSPACE: 'Backspace',
    ESCAPE: 'Escape'
}

const KeyCapturerResolver = {
    resolveByKey: eventKey => {
        switch (eventKey) {
            case 'Left': // IE specific
            case 'ArrowLeft': {
                return SUPPORTED_KEYS.ARROW_LEFT
            }
            case 'Up': // IE specific
            case 'ArrowUp': {
                return SUPPORTED_KEYS.ARROW_UP
            }
            case 'Right': // IE specific
            case 'ArrowRight': {
                return SUPPORTED_KEYS.ARROW_RIGHT
            }
            case 'Down': // IE specific
            case 'ArrowDown': {
                return SUPPORTED_KEYS.ARROW_DOWN
            }
            case 'Enter': {
                return SUPPORTED_KEYS.ENTER
            }
            case 'Backspace': {
                return SUPPORTED_KEYS.BACKSPACE
            }
            case 'Esc': // IE specific
            case 'Escape': {
                return SUPPORTED_KEYS.ESCAPE
            }
            default: {
                return null
            }
        }
    },
    resolveByKeyCode: keyCode => {
        switch (keyCode) {
            case 37: {
                return SUPPORTED_KEYS.ARROW_LEFT
            }
            case 38: {
                return SUPPORTED_KEYS.ARROW_UP
            }
            case 39: {
                return SUPPORTED_KEYS.ARROW_RIGHT
            }
            case 40: {
                return SUPPORTED_KEYS.ARROW_DOWN
            }
            case 13: {
                return SUPPORTED_KEYS.ENTER
            }
            case 8: {
                return SUPPORTED_KEYS.BACKSPACE
            }
            case 27: {
                return SUPPORTED_KEYS.ESCAPE
            }
            default: {
                return null
            }
        }
    }
}

/**
 * Use this component to wrap anything you want to handle key events for (e.g. an input).
 * You can specify the `eventName` to capture (defaults to `onKeyDown`).
 * Check the SUPPORTED_KEYS map to see which keys are supported and supply the respective
 * `on${Key}` prop (i.e. `onEnter` or `onArrowDown`).
 * If you want the default behaviour to be preserved (i.e. only want to hook into the event
 * instead of replacing it) set the `propagate${Key}` prop (e.g. propagateBackspace).
 */
class KeyCapturer extends React.Component {
    _handleKeyEvent = event => {
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        const key =
            event.key !== undefined
                ? KeyCapturerResolver.resolveByKey(event.key)
                : KeyCapturerResolver.resolveByKeyCode(event.keyCode)

        if (Object.values(SUPPORTED_KEYS).includes(key)) {
            if (typeof this.props[`on${key}`] === 'function') {
                this.props[`on${key}`]()
                if (this.props[`propagate${key}`] !== true) {
                    event.preventDefault()
                    event.stopPropagation()
                }
            }
        }
    }

    render() {
        const { children, eventName = 'onKeyDown' } = this.props

        return React.cloneElement(children, {
            [eventName]: this._handleKeyEvent
        })
    }
}

KeyCapturer.propTypes = {
    children: PropTypes.any,
    eventName: PropTypes.string
}

export default KeyCapturer
export { KeyCapturerResolver, SUPPORTED_KEYS }
