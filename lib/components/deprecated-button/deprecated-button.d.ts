import * as React from 'react';
import './deprecated-button.less';
type NativeButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
/** @deprecated */
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'link';
/** @deprecated */
export type ButtonSize = 'default' | 'small' | 'large';
/** @deprecated */
export type ButtonProps = Omit<NativeButtonProps, 'title' | 'ref'> & {
    /**
     * Loading style. When true it disables the button, but it also adds a visual indication of
     * some in-progress operation going on.
     */
    loading?: boolean;
    /**
     * Controls visually how the button shows up from a predefined set of kinds of buttons.
     */
    variant?: ButtonVariant;
    /**
     * The size of the button. If not provided it shows up in a normal size.
     */
    size?: ButtonSize;
    /**
     * Tooltip that is displayed on hover.
     *
     * This replaces `title` which is not supported for these buttons to avoid confusion.
     */
    tooltip?: React.ReactNode;
};
/**
 * @deprecated
 */
declare const Button: React.ForwardRefExoticComponent<Omit<NativeButtonProps, "title" | "ref"> & {
    /**
     * Loading style. When true it disables the button, but it also adds a visual indication of
     * some in-progress operation going on.
     */
    loading?: boolean | undefined;
    /**
     * Controls visually how the button shows up from a predefined set of kinds of buttons.
     */
    variant?: ButtonVariant | undefined;
    /**
     * The size of the button. If not provided it shows up in a normal size.
     */
    size?: ButtonSize | undefined;
    /**
     * Tooltip that is displayed on hover.
     *
     * This replaces `title` which is not supported for these buttons to avoid confusion.
     */
    tooltip?: React.ReactNode;
} & React.RefAttributes<HTMLButtonElement>>;
export { Button };
