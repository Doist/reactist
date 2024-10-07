import * as React from 'react';
import { BaseFieldVariantProps, FieldComponentProps } from '../base-field';
interface TextAreaProps extends FieldComponentProps<HTMLTextAreaElement>, BaseFieldVariantProps {
    /**
     * The number of visible text lines for the text area.
     *
     * If it is specified, it must be a positive integer. If it is not specified, the default
     * value is 2 (set by the browser).
     *
     * When `autoExpand` is true, this value serves the purpose of specifying the minimum number
     * of rows that the textarea will shrink to when the content is not large enough to make it
     * expand.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea#attr-rows
     */
    rows?: number;
    /**
     * If `true`, the textarea will be automatically resized to fit the content, and the ability to
     * manually resize the textarea will be disabled.
     */
    autoExpand?: boolean;
    /**
     * If `true`, the ability to manually resize the textarea will be disabled.
     *
     * When `autoExpand` is true, this property serves no purpose, because the ability to manually
     * resize the textarea is always disabled when `autoExpand` is true.
     */
    disableResize?: boolean;
}
declare const TextArea: React.ForwardRefExoticComponent<Omit<TextAreaProps, "ref"> & React.RefAttributes<HTMLTextAreaElement>>;
export { TextArea };
export type { TextAreaProps };
