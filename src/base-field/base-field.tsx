import * as React from 'react'
import { Box, BoxProps } from '../box'
import { useId } from '../utils/common-helpers'
import { Text } from '../text'
import styles from './base-field.module.css'
import { Stack } from '../stack'

import type { WithEnhancedClassName } from '../utils/common-types'
import { Spinner } from '../spinner'

type FieldHintProps = {
    id: string
    children: React.ReactNode
}

function FieldHint(props: FieldHintProps) {
    return <Text as="p" tone="secondary" size="copy" {...props} />
}

function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8ZM8.66667 10.3333C8.66667 10.7015 8.36819 11 8 11C7.63181 11 7.33333 10.7015 7.33333 10.3333C7.33333 9.96514 7.63181 9.66667 8 9.66667C8.36819 9.66667 8.66667 9.96514 8.66667 10.3333ZM8.65766 5.65766C8.65766 5.29445 8.36322 5 8 5C7.99087 5.00008 7.98631 5.00013 7.98175 5.00025C7.97719 5.00038 7.97263 5.00059 7.96352 5.00101C7.60086 5.02116 7.3232 5.33149 7.34335 5.69415L7.50077 8.52774C7.53575 9.15742 8.46425 9.15742 8.49923 8.52774L8.65665 5.69415C8.65707 5.68503 8.65728 5.68047 8.65741 5.67591C8.65754 5.67135 8.65758 5.66679 8.65766 5.65766Z"
                fill="currentColor"
            />
        </svg>
    )
}

type FieldTone = 'neutral' | 'success' | 'error' | 'loading'

type FieldMessageProps = FieldHintProps & {
    tone: FieldTone
}

function FieldMessage({ id, children, tone }: FieldMessageProps) {
    const textTone = tone === 'error' ? 'danger' : tone === 'success' ? 'positive' : 'normal'
    return (
        <Text as="p" tone={textTone} size="copy" id={id}>
            <Box as="span" marginRight="xsmall" display="inlineFlex" className={styles.messageIcon}>
                {tone === 'loading' ? <Spinner size={16} /> : <MessageIcon aria-hidden />}
            </Box>
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
         * @see BaseFieldProps['secondaryLabel']
         * @see BaseFieldProps['auxiliaryLabel']
         */
        label: React.ReactNode

        /**
         * An optional secondary label for this field element. It is combined with the `label` to
         * form the field's entire accessible name (unless the field label is overriden by using
         * `aria-label` or `aria-labelledby`).
         *
         * Avoid providing interactive elements in the label. Prefer `auxiliaryLabel` for that.
         *
         * @see BaseFieldProps['label']
         * @see BaseFieldProps['auxiliaryLabel']
         */
        secondaryLabel?: React.ReactNode

        /**
         * An optional extra element to be placed to the right of the main and secondary labels.
         *
         * This extra element is not included in the accessible name of the field element. Its only
         * purpose is either visual, or functional (if you include interactive elements in it).
         *
         * @see BaseFieldProps['label']
         * @see BaseFieldProps['secondaryLabel']
         */
        auxiliaryLabel?: React.ReactNode

        /**
         * A message associated with the field. It is rendered below the field, and with an
         * appearance that conveys the tone of the field (e.g. coloured red for errors, green for
         * success, etc).
         *
         * The message element is associated to the field via the `aria-describedby` attribute. If a
         * `hint` is provided, both the hint and the message are associated as the field accessible
         * description.
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
         * A hint or help-like content associated as the accessible description of the field. It is
         * generally rendered below it, and with a visual style that reduces its prominence (i.e.
         * as secondary text).
         *
         * It sets the `aria-describedby` attribute pointing to the element that holds the hint
         * content.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
         */
        hint?: React.ReactNode

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
    secondaryLabel,
    auxiliaryLabel,
    hint,
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
    const hintId = useId()
    const messageId = useId()

    const ariaDescribedBy =
        originalAriaDescribedBy ?? [message ? messageId : null, hintId].filter(Boolean).join(' ')

    const childrenProps: ChildrenRenderProps = {
        id,
        'aria-describedby': ariaDescribedBy,
        'aria-invalid': tone === 'error' ? true : undefined,
    }

    return (
        <Stack space="small" hidden={hidden}>
            <Box
                className={[
                    className,
                    styles.container,
                    tone === 'error' ? styles.error : null,
                    variant === 'bordered' ? styles.bordered : null,
                ]}
                maxWidth={maxWidth}
            >
                {label || secondaryLabel || auxiliaryLabel ? (
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
                            {secondaryLabel ? (
                                <span className={styles.secondaryLabel}>
                                    &nbsp;({secondaryLabel})
                                </span>
                            ) : null}
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
            {hint ? <FieldHint id={hintId}>{hint}</FieldHint> : null}
        </Stack>
    )
}

export { BaseField, FieldHint, FieldMessage }
export type { BaseFieldVariant, BaseFieldVariantProps, FieldComponentProps }
