import * as React from 'react';
import type { Tone } from '../utils/common-types';
import type { BoxProps } from '../box';
type TextProps = {
    children: React.ReactNode;
    /**
     * The size of the text.
     *
     * The supported values, from smaller size to larger size, are:
     * 'caption', 'copy', 'body', and 'subtitle'
     *
     * @default 'body'
     */
    size?: 'caption' | 'copy' | 'body' | 'subtitle';
    /**
     * The weight of the text font.
     *
     * @default 'regular'
     */
    weight?: 'regular' | 'semibold' | 'bold';
    /**
     * The tone (semantic color) of the text.
     *
     * @default 'normal'
     */
    tone?: Tone;
    /**
     * Used to truncate the text to a given number of lines.
     *
     * It will add an ellipsis (`…`) to the text at the end of the last line, only if the text was
     * truncated. If the text fits without it being truncated, no ellipsis is added.
     *
     * By default, the text is not truncated at all, no matter how many lines it takes to render it.
     *
     * @default undefined
     */
    lineClamp?: 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5';
    /**
     * How to align the text horizontally.
     *
     * @default 'start'
     */
    align?: BoxProps['textAlign'];
};
declare const Text: import("../utils/polymorphism").PolymorphicComponent<"div", TextProps, "obfuscateClassName">;
export type { TextProps };
export { Text };
