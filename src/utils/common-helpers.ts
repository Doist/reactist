import * as React from 'react'

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
    const [id] = React.useState<string>(() => providedId || generateElementId('element'))
    return id
}
