import { useMemo } from 'react'

import type { MutableRefObject, Ref, RefCallback } from 'react'

/**
 * Sets both a function and object React ref.
 */
function setRef<T>(ref: RefCallback<T> | MutableRefObject<T> | null | undefined, value: T) {
    if (typeof ref === 'function') {
        ref(value)
    } else if (ref) {
        ref.current = value
    }
}

/**
 * Merges React Refs into a single memoized function ref so you can pass it to an element.
 * @example
 * const Component = forwardRef((props, ref) => {
 *   const internalRef = useRef();
 *   return <div {...props} ref={useForkRef(internalRef, ref)} />;
 * });
 */
function useForkRef(...refs: Array<Ref<unknown> | undefined>) {
    return useMemo(
        () => {
            if (!refs.some(Boolean)) return
            return (value: unknown) => {
                refs.forEach((ref) => setRef(ref, value))
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        refs,
    )
}

export { useForkRef }
