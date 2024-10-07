import * as React from 'react';
import type { ObfuscatedClassName, Tone } from '../utils/common-types';
import type { BoxProps } from '../box';
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6';
type HeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className' | 'children'> & {
    children: React.ReactNode;
    /**
     * The semantic level of the heading.
     */
    level: HeadingLevel;
    /**
     * The weight of the heading. Used to de-emphasize the heading visually when using 'medium' or 'light'.
     *
     * @default 'regular'
     */
    weight?: 'regular' | 'medium' | 'light';
    /**
     * Shifts the default heading visual text size up or down, depending on the original size
     * imposed by the `level`. The heading continues to be semantically at the given level.
     *
     * By default, no value is applied, and the default size from the level is applied. The values
     * have the following effect:
     *
     * - 'smaller' shifts the default level size down in the font-size scale (it tends to make the
     * level look visually as if it were of the immediately lower level).
     * - 'larger' has the opposite effect than 'smaller' shifting the visual font size up in the
     * scale.
     * - 'largest' can be thought of as applying 'larger' twice.
     *
     * @see level
     * @default undefined
     */
    size?: 'smaller' | 'larger' | 'largest';
    /**
     * The tone (semantic color) of the heading.
     *
     * @default 'normal'
     */
    tone?: Tone;
    /**
     * Used to truncate the heading to a given number of lines.
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
     * How to align the heading text horizontally.
     *
     * @default 'start'
     */
    align?: BoxProps['textAlign'];
};
declare const Heading: React.ForwardRefExoticComponent<Omit<React.HTMLAttributes<HTMLHeadingElement>, "className" | "children"> & {
    children: React.ReactNode;
    /**
     * The semantic level of the heading.
     */
    level: HeadingLevel;
    /**
     * The weight of the heading. Used to de-emphasize the heading visually when using 'medium' or 'light'.
     *
     * @default 'regular'
     */
    weight?: "regular" | "medium" | "light" | undefined;
    /**
     * Shifts the default heading visual text size up or down, depending on the original size
     * imposed by the `level`. The heading continues to be semantically at the given level.
     *
     * By default, no value is applied, and the default size from the level is applied. The values
     * have the following effect:
     *
     * - 'smaller' shifts the default level size down in the font-size scale (it tends to make the
     * level look visually as if it were of the immediately lower level).
     * - 'larger' has the opposite effect than 'smaller' shifting the visual font size up in the
     * scale.
     * - 'largest' can be thought of as applying 'larger' twice.
     *
     * @see level
     * @default undefined
     */
    size?: "smaller" | "larger" | "largest" | undefined;
    /**
     * The tone (semantic color) of the heading.
     *
     * @default 'normal'
     */
    tone?: Tone | undefined;
    /**
     * Used to truncate the heading to a given number of lines.
     *
     * It will add an ellipsis (`…`) to the text at the end of the last line, only if the text was
     * truncated. If the text fits without it being truncated, no ellipsis is added.
     *
     * By default, the text is not truncated at all, no matter how many lines it takes to render it.
     *
     * @default undefined
     */
    lineClamp?: 1 | 2 | 3 | 4 | 5 | "1" | "2" | "3" | "4" | "5" | undefined;
    /**
     * How to align the heading text horizontally.
     *
     * @default 'start'
     */
    align?: BoxProps['textAlign'];
} & ObfuscatedClassName & React.RefAttributes<HTMLHeadingElement>>;
export type { HeadingProps, HeadingLevel };
export { Heading };
