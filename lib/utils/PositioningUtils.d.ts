export type Dimensions = {
    width: number;
    height: number;
};
export type Position = {
    x: number;
    y: number;
};
export function hasEnoughSpace(windowDimensions: {
    width: number;
    height: number;
}, elementDimensions: {
    width: number;
    height: number;
}, wrapperDimensions: {
    width: number;
    height: number;
}, wrapperPosition: {
    x: number;
    y: number;
}, position: "top" | "right" | "bottom" | "left", gap?: number): boolean;
export function calculatePosition(position: "top" | "right" | "bottom" | "left", wrapperDimensions: {
    width: number;
    height: number;
}, wrapperPosition: {
    x: number;
    y: number;
}, elementDimensions: {
    width: number;
    height: number;
}, gap?: number): {
    x: number;
    y: number;
};
export function calculateTopCenterPosition(wrapperDimensions: {
    width: number;
    height: number;
}, wrapperPosition: {
    x: number;
    y: number;
}, elementDimensions: {
    width: number;
    height: number;
}, gap?: number): {
    x: number;
    y: number;
};
export function calculateBottomCenterPosition(wrapperDimensions: {
    width: number;
    height: number;
}, wrapperPosition: {
    x: number;
    y: number;
}, elementDimensions: {
    width: number;
    height: number;
}, gap?: number): {
    x: number;
    y: number;
};
export function calculateRightCenterPosition(wrapperDimensions: {
    width: number;
    height: number;
}, wrapperPosition: {
    x: number;
    y: number;
}, elementDimensions: {
    width: number;
    height: number;
}, gap?: number): {
    x: number;
    y: number;
};
export function calculateLeftCenterPosition(wrapperDimensions: {
    width: number;
    height: number;
}, wrapperPosition: {
    x: number;
    y: number;
}, elementDimensions: {
    width: number;
    height: number;
}, gap?: number): {
    x: number;
    y: number;
};
