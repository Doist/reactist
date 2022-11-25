import { useCallback } from 'react'

// Inspired by this
// https://github.com/facebook/react/issues/13029#issuecomment-497641073

type Ref = React.RefCallback<unknown> | React.ForwardedRef<unknown>

function applyRef(element: unknown, ref: Ref) {
    if (!ref) return
    if (typeof ref === 'function') {
        ref(element)
    } else {
        ref.current = element
    }
}

function useCombinedRefs(ref1: Ref, ref2: Ref) {
    return useCallback(
        (element: unknown) => {
            applyRef(element, ref1)
            applyRef(element, ref2)
        },
        [ref1, ref2],
    )
}

export { useCombinedRefs }
