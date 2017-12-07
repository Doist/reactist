const hasEnoughSpace = (windowDimensions, elementDimensions, wrapperDimensions, wrapperPosition, position, gap = 0) => {
    const { height: windowHeight, width: windowWidth } = windowDimensions
    const { height: elementHeight, width: elementWidth } = elementDimensions
    const { height: wrapperHeight, width: wrapperWidth } = wrapperDimensions
    const { x: wrapperX, y: wrapperY } = wrapperPosition

    const verticalPosition = _calculateVerticalPosition(wrapperPosition, wrapperDimensions, elementDimensions)
    const horizontalPosition = _calculateHorizontalPosition(wrapperPosition, wrapperDimensions, elementDimensions)
    const canPlaceVertically = verticalPosition + elementWidth <= windowWidth
    const canPlaceHorizontally = horizontalPosition - elementHeight >= 0

    if (position === 'top') {
        return canPlaceVertically
            && (wrapperY - elementHeight - gap) >= 0
    } else if (position === 'right') {
        return canPlaceHorizontally
            && (wrapperX + wrapperWidth + elementWidth + gap) <= windowWidth
    } else if (position === 'left') {
        return canPlaceHorizontally
            && (wrapperX - elementWidth - gap) >= 0
    } else if (position === 'bottom') {
        return canPlaceVertically
            && (wrapperY + wrapperHeight + elementHeight + gap) <= windowHeight
    }
    return false
}

const _calculateVerticalPosition = (wrapperPosition, wrapperDimensions, elementDimensions) => {
    return wrapperPosition.x + ((wrapperDimensions.width - elementDimensions.width) / 2)
}
const _calculateHorizontalPosition = (wrapperPosition, wrapperDimensions, elementDimensions) => {
    return wrapperPosition.y + ((wrapperDimensions.height - elementDimensions.height) / 2)
}

const calculateTopCenterPosition = (wrapperDimensions, wrapperPosition, elementDimensions, gap = 0) => {
    const x = _calculateVerticalPosition(wrapperPosition, wrapperDimensions, elementDimensions)
    const y = wrapperPosition.y - elementDimensions.height - gap
    return { x, y }
}

const calculateBottomCenterPosition = (wrapperDimensions, wrapperPosition, elementDimensions, gap = 0) => {
    const x = _calculateVerticalPosition(wrapperPosition, wrapperDimensions, elementDimensions)
    const y = wrapperPosition.y + wrapperDimensions.height + gap
    return { x, y }
}

const calculateRightCenterPosition = (wrapperDimensions, wrapperPosition, elementDimensions, gap = 0) => {
    const x = wrapperPosition.x + wrapperDimensions.width + gap
    const y = _calculateHorizontalPosition(wrapperPosition, wrapperDimensions, elementDimensions)
    return { x, y }
}

const calculateLeftCenterPosition = (wrapperDimensions, wrapperPosition, elementDimensions, gap = 0) => {
    const x = wrapperPosition.x - elementDimensions.width - gap
    const y = _calculateHorizontalPosition(wrapperPosition, wrapperDimensions, elementDimensions)
    return { x, y }
}

const calculatePosition = (position, wrapperDimensions, wrapperPosition, elementDimensions, gap = 0)  => {
    if (position === 'top') {
        return calculateTopCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions, gap)
    } else if (position === 'right') {
        return calculateRightCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions, gap)
    } else if (position === 'bottom') {
        return calculateBottomCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions, gap)
    } else if (position === 'left') {
        return calculateLeftCenterPosition(wrapperDimensions, wrapperPosition, elementDimensions, gap)
    }
    return wrapperPosition
}

export {
    hasEnoughSpace,
    calculatePosition,
    calculateTopCenterPosition,
    calculateBottomCenterPosition,
    calculateRightCenterPosition,
    calculateLeftCenterPosition
}
