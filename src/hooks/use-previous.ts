import * as React from 'react'

/**
 * usePrevious track the change of the given value -
 * when a given value has been changed from previous call,
 * it will return the value prior to the change.
 *
 * Example:
 *
 * const [x, setX] = useState(1)
 * const prevX = usePrevious(x)
 *
 * Suppose `setX(2)` is called, then in the next component rendering
 * call, x = 2 and prevX = 1
 */
export function usePrevious<T>(value: T): T | null {
    const ref = React.useRef<T | null>(null)

    React.useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}
