import * as React from 'react'

let uid = 0
function uniqueId() {
    return uid++
}

export function generateElementId(prefix: string): string {
    const num = uniqueId()
    return `${prefix}-${num}`
}

export function useId(providedId?: string): string {
    const ref = React.useRef<string | null>(providedId ?? null)
    if (!ref.current) {
        ref.current = generateElementId('element')
    }
    return ref.current
}
