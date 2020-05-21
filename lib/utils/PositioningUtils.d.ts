/** @typedef {{width: number; height: number}} Dimensions */
/** @typedef {{x: number; y: number}} Position */
/**
 * @param {Dimensions} windowDimensions
 * @param {Dimensions} elementDimensions
 * @param {Dimensions} wrapperDimensions
 * @param {Position} wrapperPosition
 * @param {'top' | 'right' | 'bottom' | 'left'} position
 * @param {number} gap
 */
declare const hasEnoughSpace: (windowDimensions: any, elementDimensions: any, wrapperDimensions: any, wrapperPosition: any, position: any, gap?: number) => boolean;
/**
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 * @param {number} [gap]
 */
declare const calculateTopCenterPosition: (wrapperDimensions: any, wrapperPosition: any, elementDimensions: any, gap?: number) => {
    x: any;
    y: number;
};
/**
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 * @param {number} [gap]
 */
declare const calculateBottomCenterPosition: (wrapperDimensions: any, wrapperPosition: any, elementDimensions: any, gap?: number) => {
    x: any;
    y: any;
};
/**
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 * @param {number} [gap]
 */
declare const calculateRightCenterPosition: (wrapperDimensions: any, wrapperPosition: any, elementDimensions: any, gap?: number) => {
    x: any;
    y: any;
};
/**
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 * @param {number} [gap]
 */
declare const calculateLeftCenterPosition: (wrapperDimensions: any, wrapperPosition: any, elementDimensions: any, gap?: number) => {
    x: number;
    y: any;
};
/**
 * @param {'top' | 'right' | 'bottom' | 'left'} position
 * @param {Position} wrapperPosition
 * @param {Dimensions} wrapperDimensions
 * @param {Dimensions} elementDimensions
 * @param {number} [gap]
 */
declare const calculatePosition: (position: any, wrapperDimensions: any, wrapperPosition: any, elementDimensions: any, gap?: number) => any;
export { hasEnoughSpace, calculatePosition, calculateTopCenterPosition, calculateBottomCenterPosition, calculateRightCenterPosition, calculateLeftCenterPosition, };
