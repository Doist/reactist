import * as React from 'react'
import { Box, BoxProps } from '../box'
import { useId } from '../utils/common-helpers'
import { Text } from '../text'
import styles from './base-field.module.css'
import { Stack } from '../stack'

import type { WithEnhancedClassName } from '../utils/common-types'
import { Spinner } from '../spinner'

type FieldTone = 'neutral' | 'success' | 'error' | 'loading'

type FieldMessageProps = {
    id: string
    children: React.ReactNode
    tone: FieldTone
}

function FieldMessage({ id, children, tone }: FieldMessageProps) {
    const textTone = tone === 'error' ? 'danger' : tone === 'success' ? 'positive' : 'secondary'
    return (
        <Text as="p" tone={textTone} size="copy" id={id}>
            {tone === 'loading' ? (
                <Box
                    as="span"
                    marginRight="xsmall"
                    display="inlineFlex"
                    className={styles.loadingIcon}
                >
                    <Spinner size={16} />
                </Box>
            ) : null}
            {children}
        </Text>
    )
}

//
// BaseField
//

type ChildrenRenderProps = {
    id: string
    'aria-describedby'?: string
    'aria-invalid'?: true
}

type HtmlInputProps<T extends HTMLElement> = React.DetailedHTMLProps<
    React.InputHTMLAttributes<T>,
    T
>

type BaseFieldVariant = 'default' | 'bordered'
type BaseFieldVariantProps = {
    /**
     * Provides alternative visual layouts or modes that the field can be rendered in.
     *
     * Namely, there are two variants supported:
     *
     * - the default one
     * - a "bordered" variant, where the border of the field surrounds also the labels, instead
     *   of just surrounding the actual field element
     *
     * In both cases, the message and description texts for the field lie outside the bordered
     * area.
     */
    variant?: BaseFieldVariant
}

type BaseFieldProps = WithEnhancedClassName &
    Pick<HtmlInputProps<HTMLInputElement>, 'id' | 'hidden' | 'aria-describedby'> & {
        /**
         * The main label for this field element.
         *
         * This prop is not optional. Consumers of field components must be explicit about not
         * wanting a label by passing `label=""` or `label={null}`. In those situations, consumers
         * should make sure that fields are properly labelled semantically by other means (e.g using
         * `aria-labelledby`, or rendering a `<label />` element referencing the field by id).
         *
         * Avoid providing interactive elements in the label. Prefer `auxiliaryLabel` for that.
         *
         * @see BaseFieldProps['auxiliaryLabel']
         */
        label: React.ReactNode

        /**
         * An optional extra element to be placed to the right of the main label.
         *
         * This extra element is not included in the accessible name of the field element. Its only
         * purpose is either visual, or functional (if you include interactive elements in it).
         *
         * @see BaseFieldProps['label']
         */
        auxiliaryLabel?: React.ReactNode

        /**
         * A message associated with the field. It is rendered below the field, and with an
         * appearance that conveys the tone of the field (e.g. coloured red for errors, green for
         * success, etc).
         *
         * The message element is associated to the field via the `aria-describedby` attribute.
         *
         * In the future, when `aria-errormessage` gets better user agent support, we should use it
         * to associate the filed with a message when tone is `"error"`.
         *
         * @see BaseFieldProps['tone']
         * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage
         * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid
         */
        message?: React.ReactNode

        /**
         * The tone with which the message, if any, is presented.
         *
         * If the tone is `"error"`, the field border turns red, and the message, if any, is also
         * red.
         *
         * When the tone is `"loading"`, it is recommended that you also disable the field. However,
         * this is not enforced by the component. It is only a recommendation.
         *
         * @see BaseFieldProps['message']
         * @see BaseFieldProps['hint']
         */
        tone?: FieldTone

        /**
         * The maximum width that the input field can expand to.
         */
        maxWidth?: BoxProps['maxWidth']

        /**
         * Used internally by components composed using `BaseField`. It is not exposed as part of
         * the public props of such components.
         */
        children: (props: ChildrenRenderProps) => React.ReactNode
    }

type FieldComponentProps<T extends HTMLElement> = Omit<
    BaseFieldProps,
    'children' | 'className' | 'variant'
> &
    Omit<HtmlInputProps<T>, 'className' | 'style'>

function BaseField({
    variant = 'default',
    label,
    auxiliaryLabel,
    message,
    tone = 'neutral',
    className,
    children,
    maxWidth,
    hidden,
    'aria-describedby': originalAriaDescribedBy,
    id: originalId,
}: BaseFieldProps & BaseFieldVariantProps & WithEnhancedClassName) {
    const id = useId(originalId)
    const messageId = useId()

    const ariaDescribedBy = originalAriaDescribedBy ?? (message ? messageId : null)

    const childrenProps: ChildrenRenderProps = {
        id,
        ...(ariaDescribedBy ? { 'aria-describedby': ariaDescribedBy } : {}),
        'aria-invalid': tone === 'error' ? true : undefined,
    }

    return (
        <Stack space="xsmall" hidden={hidden}>
            <Box
                className={[
                    className,
                    styles.container,
                    tone === 'error' ? styles.error : null,
                    variant === 'bordered' ? styles.bordered : null,
                ]}
                maxWidth={maxWidth}
            >
                {label || auxiliaryLabel ? (
                    <Box
                        as="span"
                        display="flex"
                        justifyContent="spaceBetween"
                        alignItems="flexEnd"
                    >
                        <Text
                            size={variant === 'bordered' ? 'caption' : 'body'}
                            as="label"
                            htmlFor={id}
                        >
                            {label ? <span className={styles.primaryLabel}>{label}</span> : null}
                        </Text>
                        {auxiliaryLabel ? (
                            <Box className={styles.auxiliaryLabel} paddingLeft="small">
                                {auxiliaryLabel}
                            </Box>
                        ) : null}
                    </Box>
                ) : null}
                {children(childrenProps)}
            </Box>
            {message ? (
                <FieldMessage id={messageId} tone={tone}>
                    {message}
                </FieldMessage>
            ) : null}
        </Stack>
    )
}

export { BaseField, FieldMessage }
export type { BaseFieldVariant, BaseFieldVariantProps, FieldComponentProps }
