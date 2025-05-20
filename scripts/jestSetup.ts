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
