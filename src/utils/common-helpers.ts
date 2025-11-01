import { useRef } from 'react'

let uid = 0
function uniqueId() {
    return uid++
}

export function generateElementId(prefix: string): string {
    const num = uniqueId()
    return `${prefix}-${num}`
}

/**
 * @deprecated Use `useId` available from React 18 or above instead.
 */
export function useId(providedId?: string): string {
    const ref = useRef<string | null>(providedId ?? null)
    // eslint-disable-next-line react-hooks/refs
    if (!ref.current) {
        ref.current = generateElementId('element')
    }
    // eslint-disable-next-line react-hooks/refs
    return ref.current
}
