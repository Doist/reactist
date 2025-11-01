import { useEffect, useRef } from 'react'

/**
 * usePrevious tracks the change of the given value -
 * when a given value has been changed from a previous call,
 * it will return the value prior to the change.
 *
 * Example:
 *
 * const [x, setX] = useState(1)
 * const prevX = usePrevious(x)
 *
 * Suppose `setX(2)` is called, then in the next component render
 * x = 2 and prevX = 1
 */
function usePrevious<T>(value: T): T | null {
    const ref = useRef<T | null>(null)

    useEffect(() => {
        ref.current = value
    }, [value])

    // This is necessary for usePrevious to work in its current form, however, we are
    // warned that it's possible for the ref to be stale
    // See https://github.com/facebook/react/issues/31330
    // eslint-disable-next-line react-hooks/refs
    return ref.current
}

export { usePrevious }
