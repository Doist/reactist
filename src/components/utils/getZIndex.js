export default function getZIndex(element, maxZIndex = 1) {
    if (!element || element === document) {
        return maxZIndex
    }

    const zIndex = window.document.defaultView
        .getComputedStyle(element)
        .getPropertyValue('z-index')

    if (isNaN(zIndex)) {
        return getZIndex(element.parentNode, maxZIndex)
    }

    return getZIndex(
        element.parentNode,
        zIndex > maxZIndex ? zIndex : maxZIndex
    )
}
