import * as React from 'react'

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
    const ref = React.useRef<T | null>(null)

    React.useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}

export { usePrevious }
