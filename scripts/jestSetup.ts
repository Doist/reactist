import { toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom'

expect.extend(toHaveNoViolations)

/* Stub out ResizeObserver */
if (!window.ResizeObserver) {
    class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    }

    window.ResizeObserver = ResizeObserver
    global.ResizeObserver = ResizeObserver
}

/**
 * When focus falls back to the body, jsdom fires focusout events with the document as the
 * `relatedTarget`, something browsers never do. Base UI's focus manager then calls
 * `relatedTarget.hasAttribute(...)`, which does not exist on documents and throws. Give the
 * document a no-op `hasAttribute` so those events are processed as not matching any element.
 *
 * @see https://github.com/mui/base-ui/blob/master/packages/react/src/floating-ui-react/components/FloatingFocusManager.tsx
 */
if (!('hasAttribute' in document)) {
    Object.defineProperty(Document.prototype, 'hasAttribute', {
        value: function hasAttribute() {
            return false
        },
        configurable: true,
    })
}
