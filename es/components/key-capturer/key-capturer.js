import { objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'

const SUPPORTED_KEYS = {
    ARROW_UP: 'ArrowUp',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ENTER: 'Enter',
    BACKSPACE: 'Backspace',
    ESCAPE: 'Escape',
}
const KeyCapturerResolver = {
    resolveByKey(eventKey) {
        switch (eventKey) {
            case 'Left': // IE specific

            case 'ArrowLeft': {
                return 'ArrowLeft'
            }

            case 'Up': // IE specific

            case 'ArrowUp': {
                return 'ArrowUp'
            }

            case 'Right': // IE specific

            case 'ArrowRight': {
                return 'ArrowRight'
            }

            case 'Down': // IE specific

            case 'ArrowDown': {
                return 'ArrowDown'
            }

            case 'Enter': {
                return 'Enter'
            }

            case 'Backspace': {
                return 'Backspace'
            }

            case 'Esc': // IE specific

            case 'Escape': {
                return 'Escape'
            }

            default: {
                return null
            }
        }
    },

    resolveByKeyCode(keyCode) {
        switch (keyCode) {
            case 37: {
                return 'ArrowLeft'
            }

            case 38: {
                return 'ArrowUp'
            }

            case 39: {
                return 'ArrowRight'
            }

            case 40: {
                return 'ArrowDown'
            }

            case 13: {
                return 'Enter'
            }

            case 8: {
                return 'Backspace'
            }

            case 27: {
                return 'Escape'
            }

            default: {
                return null
            }
        }
    },
}
const keyEventHandlerMapping = {
    ArrowUp: 'onArrowUp',
    ArrowDown: 'onArrowDown',
    ArrowLeft: 'onArrowLeft',
    ArrowRight: 'onArrowRight',
    Enter: 'onEnter',
    Backspace: 'onBackspace',
    Escape: 'onEscape',
}
const keyPropagatePropMapping = {
    ArrowUp: 'propagateArrowUp',
    ArrowDown: 'propagateArrowDown',
    ArrowLeft: 'propagateArrowLeft',
    ArrowRight: 'propagateArrowRight',
    Enter: 'propagateEnter',
    Backspace: 'propagateBackspace',
    Escape: 'propagateEscape',
}
/**
 * Use this component to wrap anything you want to handle key events for (e.g. an input).
 * You can specify the `eventName` to capture (defaults to `onKeyDown`).
 * Check the SUPPORTED_KEYS map to see which keys are supported and supply the respective
 * `on${Key}` prop (i.e. `onEnter` or `onArrowDown`).
 * If you want the default behaviour to be preserved (i.e. only want to hook into the event
 * instead of replacing it) set the `propagate${Key}` prop (e.g. propagateBackspace).
 */

function KeyCapturer(props) {
    const { children, eventName = 'onKeyDown' } = props
    const composingRef = React.useRef(false)
    const composingEventHandlers = props.onEnter
        ? {
              onCompositionStart: () => {
                  composingRef.current = true
              },
              onCompositionEnd: () => {
                  composingRef.current = false
              },
          }
        : undefined

    function handleKeyEvent(event) {
        // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
        const key =
            event.key !== undefined
                ? KeyCapturerResolver.resolveByKey(event.key)
                : KeyCapturerResolver.resolveByKeyCode(event.keyCode)
        if (!key) return
        const propagateEvent = props[keyPropagatePropMapping[key]] || false
        const eventHandler = props[keyEventHandlerMapping[key]]

        if (key === 'Enter' && eventHandler) {
            if (
                composingRef.current || // Safari fires the onCompositionEnd event before the keydown event, so we
                // have to rely on the 229 keycode, which is Enter when fired from an IME
                // https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
                (event.keyCode || event.which) === 229
            ) {
                return
            }
        }

        if (eventHandler) {
            eventHandler(event)

            if (!propagateEvent) {
                event.preventDefault()
                event.stopPropagation()
            }
        }
    }

    return /*#__PURE__*/ React.cloneElement(
        children,
        _objectSpread2(
            {
                [eventName]: handleKeyEvent,
            },
            composingEventHandlers,
        ),
    )
}

export { KeyCapturer, KeyCapturerResolver, SUPPORTED_KEYS }
//# sourceMappingURL=key-capturer.js.map
