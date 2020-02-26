import { useCallback } from 'react'

function setRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value)
    } else if (ref !== null) {
        ref.current = value
    }
}

// https://github.com/facebook/react/issues/13029#issuecomment-497629971
export default function useForkRef(refA, refB) {
    /**
     * This will create a new function if the ref props change.
     * This means react will call the old forkRef with `null` and the new forkRef
     * with the ref. Cleanup naturally emerges from this behavior
     */
    return useCallback(
        instance => {
            setRef(refA, instance)
            setRef(refB, instance)
        },
        [refA, refB]
    )
}
