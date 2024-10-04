import * as React from 'react';
import type { ObfuscatedClassName } from '../utils/common-types';
type Size = 'xsmall' | 'small' | 'medium' | 'large';
type NativeProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'className' | 'aria-describedby' | 'aria-label' | 'aria-labelledby' | 'role' | 'size'>;
type LoadingProps = NativeProps & ObfuscatedClassName & {
    /**
     * The size of the loading spinner.
     * @default 'small'
     */
    size?: Size;
    /**
     * Identifies the element (or elements) that describes the loading component for assistive technologies.
     */
    'aria-describedby'?: string;
} & ({
    /** Defines a string value that labels the current loading component for assistive technologies. */
    'aria-label': string;
    'aria-labelledby'?: never;
} | {
    /** Identifies the element (or elements) that labels the current loading component for assistive technologies. */
    'aria-labelledby': string;
    'aria-label'?: never;
});
declare function Loading({ size, exceptionallySetClassName, ...props }: LoadingProps): React.JSX.Element;
export { Loading };
export type { LoadingProps };
