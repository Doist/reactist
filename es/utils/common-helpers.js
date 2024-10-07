import * as React from 'react'

let uid = 0

function uniqueId() {
    return uid++
}

function generateElementId(prefix) {
    const num = uniqueId()
    return prefix + '-' + num
}
function useId(providedId) {
    const ref = React.useRef(providedId != null ? providedId : null)

    if (!ref.current) {
        ref.current = generateElementId('element')
    }

    return ref.current
}

export { generateElementId, useId }
//# sourceMappingURL=common-helpers.js.map
