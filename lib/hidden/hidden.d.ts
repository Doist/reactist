import * as React from 'react';
import type { ResponsiveBreakpoints } from '../utils/responsive-props';
type AboveProp = {
    /**
     * Hides the element on viewport sizes equal or larger to the one given.
     *
     * It is not supported to pass it alongside `below`, and the resulting behavior is undefined
     * (most likely itʼll hide the element all the time to make it apparent that there's a problem).
     *
     * @see below
     */
    above: Exclude<ResponsiveBreakpoints, 'desktop'>;
    below?: never;
};
type BelowProp = {
    /**
     * Hides the element on viewport sizes equal or smaller to the one given.
     *
     * It is not supported to pass it alongside `above`, and the resulting behavior is undefined
     * (most likely itʼll hide the element all the time to make it apparent that there's a problem).
     *
     * @see above
     */
    below: Exclude<ResponsiveBreakpoints, 'mobile'>;
    above?: never;
};
type CommonProps = {
    children: React.ReactNode;
    /**
     * hides the element when on print media.
     */
    print?: boolean;
    /**
     * Useful if you want the element to be an inline element when it is visible.
     */
    display?: 'inline' | 'block';
};
type HiddenProps = CommonProps & (AboveProp | BelowProp | Required<Pick<CommonProps, 'print'>>);
/**
 * A component that allows to specify how to hide itself on certain responsive screen sizes, or on
 * print media.
 *
 * @see HiddenProps
 * @see HiddenVisually for hiding content only visually, while keeping it available for assistive
 *   technologies.
 */
declare const Hidden: import("../utils/polymorphism").PolymorphicComponent<"div", HiddenProps, "obfuscateClassName">;
export { Hidden };
export type { HiddenProps };
