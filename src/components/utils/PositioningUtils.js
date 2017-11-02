const hasEnoughSpace = (windowDimensions, elementDimensions, wrapperDimensions, wrapperPosition, position, gap = 0) => {
    const { height: windowHeight, width: windowWidth } = windowDimensions
    const { height: elementHeight, width: elementWidth } = elementDimensions
    const { height: wrapperHeight, width: wrapperWidth } = wrapperDimensions
    const { x: wrapperX, y: wrapperY } = wrapperPosition

    if (position === 'top') {
        return (wrapperY - elementHeight - gap) >= 0
    } else if (position === 'right') {
        return (wrapperX + wrapperWidth + elementWidth + gap) <= windowWidth
    } else if (position === 'left') {
        return (wrapperX - elementWidth - gap) >= 0
    } else if (position === 'bottom') {
        return (wrapperY + wrapperHeight + elementHeight + gap) <= windowHeight
    }
    return false
}

const calculateTopCenterPosition = (wrapperDimensions, wrapperPosition, elementDimensions, gap = 0) => {
    const x = wrapperPosition.x + ((wrapperDimensions.width - elementDimensions.width) / 2)
    const y = wrapperPosition.y - elementDimensions.height - gap
    return { x, y }
}

const calculateBottomCenterPosition = (wrapperDimensions, wrapperPosition, elementDimensions, gap = 0) => {
    const x = wrapperPosition.x + ((wrapperDimensions.width - elementDimensions.width) / 2)
    const y = wrapperPosition.y + wrapperDimensions.height + gap
    return { x, y }
}

const calculateRightCenterPosition = (wrapperDimensions, wrapperPosition, elementDimensions, gap = 0) => {
    const x = wrapperPosition.x + wrapperDimensions.width + gap
    const y = wrapperPosition.y + ((wrapperDimensions.height - elementDimensions.height) / 2)
    return { x, y }
}

const calculateLeftCenterPosition = (wrapperDimensions, wrapperPosition, elementDimensions, gap = 0) => {
    const x = wrapperPosition.x - elementDimensions.width - gap
    const y = wrapperPosition.y + ((wrapperDimensions.height - elementDimensions.height) / 2)
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
