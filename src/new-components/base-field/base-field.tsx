import * as React from 'react'
import { Box, BoxProps } from '../box'
import { useId } from '../common-helpers'
import { Text } from '../text'
import styles from './base-field.module.css'
import { Stack } from '../stack'

import type { WithEnhancedClassName } from '../common-types'
import { Spinner } from '../spinner'

type FieldHintProps = {
    id: string
    children: React.ReactNode
}

function FieldHint(props: FieldHintProps) {
    return <Text as="p" tone="secondary" size="copy" {...props} />
}

function ErrorMessageIcon(props: React.SVGProps<SVGSVGElement>) {
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

function SuccessMessageIcon(props: React.SVGProps<SVGSVGElement>) {
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
                d="M5.63807 7.86191C5.37772 7.60156 4.95561 7.60156 4.69526 7.86191C4.43491 8.12226 4.43491 8.54437 4.69526 8.80472L6.36193 10.4714C6.62228 10.7317 7.04439 10.7317 7.30474 10.4714L11.3047 6.47138C11.5651 6.21103 11.5651 5.78892 11.3047 5.52858C11.0444 5.26823 10.6223 5.26823 10.3619 5.52858L6.83333 9.05717L5.63807 7.86191Z"
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
            {tone && tone !== 'neutral' ? (
                <Box
                    as="span"
                    marginRight="xsmall"
                    display="inlineFlex"
                    className={styles.messageIcon}
                >
                    {tone === 'error' ? (
                        <ErrorMessageIcon aria-hidden />
                    ) : tone === 'success' ? (
                        <SuccessMessageIcon aria-hidden />
                    ) : tone === 'loading' ? (
                        <Spinner size={16} />
                    ) : null}
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
    'aria-errormessage'?: string
    'aria-invalid'?: true
}

type HtmlInputProps<T extends HTMLElement> = React.DetailedHTMLProps<
    React.InputHTMLAttributes<T>,
    T
>

type BaseFieldProps = WithEnhancedClassName &
    Pick<
        HtmlInputProps<HTMLInputElement>,
        'id' | 'hidden' | 'aria-describedby' | 'aria-errormessage'
    > & {
        /**
         * The main label for this field element.
         *
         * Avoid providing interactive elements in the label. Prefer `auxiliaryLabel` for that.
         *
         * @see secondaryLabel
         * @see auxiliaryLabel
         */
        label: React.ReactNode

        /**
         * An optional secondary label for this field element. It is combined with the `label` to
         * form the field's entire accessible name (unless the field label is overriden by using
         * `aria-label` or `aria-labelledby`).
         *
         * Avoid providing interactive elements in the label. Prefer `auxiliaryLabel` for that.
         *
         * @see label
         * @see auxiliaryLabel
         */
        secondaryLabel?: React.ReactNode

        /**
         * An optional extra element to be placed to the right of the main and secondary labels.
         *
         * This extra element is not included in the accessible name of the field element. Its only
         * purpose is either visual, or functional (if you include interactive elements in it).
         *
         * @see label
         * @see secondaryLabel
         */
        auxiliaryLabel?: React.ReactNode

        /**
         * A message associated with the field. It is rendered below the field, and with an
         * appearance that conveys the tone of the field (e.g. coloured red for errors, green for
         * success, etc).
         *
         * When the tone is `"error"`, the message element is associated to the field via the
         * `aria-errormessage` attribute. Otherwise it is associated as an extra description,
         * alongside the `hint` element, if any.
         *
         * @see tone
         * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage
         * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid
         */
        message?: React.ReactNode

        /**
         * The tone with which the message, if any, is presented.
         *
         * If the tone is `"error"`, the field border turns red, and the message, if any, is also
         * red. The message will also be associated to the field via the `aria-errormessage`
         * attribute.
         *
         * If the tone is not `"error"`, the message, if present, acts as an extra description,
         * alongside the `hint` element, if any.
         *
         * When the tone is `"loading"`, it is recommended that you also disable the field. However,
         * this is not enforced by the component. It is only a recommendation.
         *
         * @see message
         * @see hint
         */
        tone?: FieldTone

        /**
         * A hint or help-like content associated as the accessible description of the field. It is
         * generally rendered below it, and with a visual style that reduces its prominence (i.e.
         * as secondary text).
         *
         * It sets the `aria-describedby` attribute pointing to the element that holds the error
         * message.
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

type FieldComponentProps<T extends HTMLElement> = Omit<BaseFieldProps, 'children' | 'className'> &
    Omit<HtmlInputProps<T>, 'className' | 'style'>

function BaseField({
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
    'aria-errormessage': originalAriaErrorMessage,
    id: originalId,
}: BaseFieldProps & WithEnhancedClassName) {
    const id = useId(originalId)
    const hintId = useId()
    const messageId = useId()

    const ariaDescribedBy =
        originalAriaDescribedBy ??
        [message && tone !== 'error' ? messageId : null, hintId].filter(Boolean).join(' ')
    const ariaErrorMessage =
        originalAriaErrorMessage ?? (tone === 'error' && message ? messageId : undefined)

    const childrenProps: ChildrenRenderProps = {
        id,
        'aria-describedby': ariaDescribedBy,
        'aria-errormessage': ariaErrorMessage,
        'aria-invalid': tone === 'error' ? true : undefined,
    }

    return (
        <Stack space="small" hidden={hidden}>
            <Box className={[className, styles.container]} maxWidth={maxWidth}>
                <Box
                    as="span"
                    display="flex"
                    justifyContent="spaceBetween"
                    alignItems="flexEnd"
                    paddingBottom="small"
                >
                    <Text size="body" as="label" htmlFor={id}>
                        {label ? <span className={styles.primaryLabel}>{label}</span> : null}
                        {secondaryLabel ? (
                            <span className={styles.secondaryLabel}>&nbsp;({secondaryLabel})</span>
                        ) : null}
                    </Text>
                    {auxiliaryLabel ? (
                        <Box className={styles.auxiliaryLabel} paddingLeft="small">
                            {auxiliaryLabel}
                        </Box>
                    ) : null}
                </Box>
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
export type { FieldComponentProps }
