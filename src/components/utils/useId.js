import { useRef } from 'react'
let uid = 0

export default function useId(prefix) {
    const ref = useRef()
    if (!ref.current) {
        ref.current = `${prefix}-${++uid}`
    }

    return ref.current
}
