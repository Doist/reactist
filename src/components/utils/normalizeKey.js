const SUPPORTED_KEYS = {
    ARROW_UP: 'ArrowUp',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ENTER: 'Enter',
    BACKSPACE: 'Backspace',
    ESCAPE: 'Escape',
    TAB: 'Tab'
}

/**
 * Resolves an event key value, taking into account
 * possible edge-cases, e.g different IE key naming
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key#Example
 * @param {string} params.eventKey
 * @returns {string} ‚Äì normalized key value
 */
export default function normalizeKey(eventKey) {
    switch (eventKey) {
        case 37:
        case 'Left': // IE specific
        case 'ArrowLeft': {
            return SUPPORTED_KEYS.ARROW_LEFT
        }
        case 38:
        case 'Up': // IE specific
        case 'ArrowUp': {
            return SUPPORTED_KEYS.ARROW_UP
        }
        case 39:
        case 'Right': // IE specific
        case 'ArrowRight': {
            return SUPPORTED_KEYS.ARROW_RIGHT
        }
        case 40:
        case 'Down': // IE specific
        case 'ArrowDown': {
            return SUPPORTED_KEYS.ARROW_DOWN
        }
        case 13:
        case 'Enter': {
            return SUPPORTED_KEYS.ENTER
        }
        case 8:
        case 'Backspace': {
            return SUPPORTED_KEYS.BACKSPACE
        }
        case 27:
        case 'Esc': // IE specific
        case 'Escape': {
            return SUPPORTED_KEYS.ESCAPE
        }

        case 9:
        case 'Tab': {
            return SUPPORTED_KEYS.TAB
        }

        default: {
            return eventKey
        }
    }
}
