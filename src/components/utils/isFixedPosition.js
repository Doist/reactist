/*
 * Check if the element or one of its parents is fixed
 */
export default function isFixedPosition(element) {
    if (element === document || !element) {
        return false
    }

    const isFixed =
        window
            .getComputedStyle(element)
            .getPropertyValue('position')
            .toLowerCase() === 'fixed'

    if (!isFixed) {
        return isFixedPosition(element.parentNode)
    }

    return true
}
