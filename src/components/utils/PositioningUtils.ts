/** @typedef {{width: number; height: number}} Dimensions */
/** @typedef {{x: number; y: number}} Position */

type Dimensions = { width: number; height: number }
type AbsolutePosition = { x: number; y: number }
type RelativePosition = 'top' | 'right' | 'bottom' | 'left'

type HasEnoughSpaceFn = (
    windowDimensions: Dimensions,
    elementDimensions: Dimensions,
    wrapperDimensions: Dimensions,
    wrapperPosition: AbsolutePosition,
    position: RelativePosition,
    gap: number
) => boolean

const hasEnoughSpace: HasEnoughSpaceFn = (
    windowDimensions,
    elementDimensions,
    wrapperDimensions,
    wrapperPosition,
    position,
    gap = 0
) => {
    const { height: windowHeight, width: windowWidth } = windowDimensions
    const { height: elementHeight, width: elementWidth } = elementDimensions
    const { height: wrapperHeight, width: wrapperWidth } = wrapperDimensions
    const { x: wrapperX, y: wrapperY } = wrapperPosition

    const verticalPosition = _calculateVerticalPosition(
        wrapperPosition,
        wrapperDimensions,
        elementDimensions
    )
    const horizontalPosition = _calculateHorizontalPosition(
        wrapperPosition,
        wrapperDimensions,
        elementDimensions
    )
    const canPlaceVertically =
        verticalPosition >= 0 && verticalPosition + elementWidth <= windowWidth
    const canPlaceHorizontally =
        horizontalPosition >= 0 &&
        horizontalPosition + elementHeight <= windowHeight

    if (position === 'top') {
        return canPlaceVertically && wrapperY - elementHeight - gap >= 0
    } else if (position === 'right') {
        return (
            canPlaceHorizontally &&
            wrapperX + wrapperWidth + elementWidth + gap <= windowWidth
        )
    } else if (position === 'left') {
        return canPlaceHorizontally && wrapperX - elementWidth - gap >= 0
    } else if (position === 'bottom') {
        return (
            canPlaceVertically &&
            wrapperY + wrapperHeight + elementHeight + gap <= windowHeight
        )
    }
    return false
}

type VerticalHorizontalPositionFn = (
    wrapperPosition: AbsolutePosition,
    wrapperDimensions: Dimensions,
    elementDimensions: Dimensions
) => number

const _calculateVerticalPosition: VerticalHorizontalPositionFn = (
    wrapperPosition,
    wrapperDimensions,
    elementDimensions
) => {
    return (
        wrapperPosition.x +
        (wrapperDimensions.width - elementDimensions.width) / 2
    )
}

const _calculateHorizontalPosition: VerticalHorizontalPositionFn = (
    wrapperPosition,
    wrapperDimensions,
    elementDimensions
) => {
    return (
        wrapperPosition.y +
        (wrapperDimensions.height - elementDimensions.height) / 2
    )
}

type CenterPositionFn = (
    wrapperDimensions: Dimensions,
    wrapperPosition: AbsolutePosition,
    elementDimensions: Dimensions,
    gap?: number
) => AbsolutePosition

const calculateTopCenterPosition: CenterPositionFn = (
    wrapperDimensions,
    wrapperPosition,
    elementDimensions,
    gap = 0
) => {
    const x = _calculateVerticalPosition(
        wrapperPosition,
        wrapperDimensions,
        elementDimensions
    )
    const y = wrapperPosition.y - elementDimensions.height - gap
    return { x, y }
}

const calculateBottomCenterPosition: CenterPositionFn = (
    wrapperDimensions,
    wrapperPosition,
    elementDimensions,
    gap = 0
) => {
    const x = _calculateVerticalPosition(
        wrapperPosition,
        wrapperDimensions,
        elementDimensions
    )
    const y = wrapperPosition.y + wrapperDimensions.height + gap
    return { x, y }
}

const calculateRightCenterPosition: CenterPositionFn = (
    wrapperDimensions,
    wrapperPosition,
    elementDimensions,
    gap = 0
) => {
    const x = wrapperPosition.x + wrapperDimensions.width + gap
    const y = _calculateHorizontalPosition(
        wrapperPosition,
        wrapperDimensions,
        elementDimensions
    )
    return { x, y }
}

const calculateLeftCenterPosition: CenterPositionFn = (
    wrapperDimensions,
    wrapperPosition,
    elementDimensions,
    gap = 0
) => {
    const x = wrapperPosition.x - elementDimensions.width - gap
    const y = _calculateHorizontalPosition(
        wrapperPosition,
        wrapperDimensions,
        elementDimensions
    )
    return { x, y }
}

type PositionFn = (
    position: 'top' | 'right' | 'bottom' | 'left',
    wrapperDimensions: Dimensions,
    wrapperPosition: AbsolutePosition,
    elementDimensions: Dimensions,
    gap?: number
) => AbsolutePosition

const calculatePosition: PositionFn = (
    position,
    wrapperDimensions,
    wrapperPosition,
    elementDimensions,
    gap = 0
) => {
    if (position === 'top') {
        return calculateTopCenterPosition(
            wrapperDimensions,
            wrapperPosition,
            elementDimensions,
            gap
        )
    } else if (position === 'right') {
        return calculateRightCenterPosition(
            wrapperDimensions,
            wrapperPosition,
            elementDimensions,
            gap
        )
    } else if (position === 'bottom') {
        return calculateBottomCenterPosition(
            wrapperDimensions,
            wrapperPosition,
            elementDimensions,
            gap
        )
    } else if (position === 'left') {
        return calculateLeftCenterPosition(
            wrapperDimensions,
            wrapperPosition,
            elementDimensions,
            gap
        )
    }
    return wrapperPosition
}

type PositioningUtils = {
    hasEnoughSpace: typeof hasEnoughSpace
    calculatePosition: typeof calculatePosition
    calculateTopCenterPosition: typeof calculateTopCenterPosition
    calculateBottomCenterPosition: typeof calculateBottomCenterPosition
    calculateRightCenterPosition: typeof calculateRightCenterPosition
    calculateLeftCenterPosition: typeof calculateLeftCenterPosition
}

export {
    hasEnoughSpace,
    calculatePosition,
    calculateTopCenterPosition,
    calculateBottomCenterPosition,
    calculateRightCenterPosition,
    calculateLeftCenterPosition,
}
export type { PositioningUtils, AbsolutePosition, RelativePosition }
