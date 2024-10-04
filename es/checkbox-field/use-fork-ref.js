import { useMemo } from 'react'

/**
 * Sets both a function and object React ref.
 */

function setRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value)
    } else if (ref) {
        ref.current = value
    }
}
/**
 * Merges React Refs into a single memoized function ref so you can pass it to an element.
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useForkRef(internalRef, ref)} />;
 * });
 */

function useForkRef(...refs) {
    return useMemo(
        () => {
            if (!refs.some(Boolean)) return
            return (value) => {
                refs.forEach((ref) => setRef(ref, value))
            }
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        refs,
    )
}

export { useForkRef }
//# sourceMappingURL=use-fork-ref.js.map
