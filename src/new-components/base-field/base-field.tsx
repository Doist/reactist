import * as React from 'react'
import { Box, BoxProps } from '../box'
import { useId } from '../common-helpers'
import { Text } from '../text'
import { WithEnhancedClassName } from '../common-types'
import styles from './base-field.module.css'
import { Stack } from '../stack'

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
                d="M8.00073 14.0002C11.3144 14.0002 14.0007 11.314 14.0007 8.00024C14.0007 4.68654 11.3144 2.00024 8.00073 2.00024C4.68702 2.00024 2.00073 4.68654 2.00073 8.00024C2.00073 11.314 4.68702 14.0002 8.00073 14.0002ZM8.00073 13.0002C5.23931 13.0002 3.00073 10.7617 3.00073 8.00024C3.00073 5.23882 5.23931 3.00024 8.00073 3.00024C10.7622 3.00024 13.0007 5.23882 13.0007 8.00024C13.0007 10.7617 10.7622 13.0002 8.00073 13.0002ZM8.75073 5.25044C8.75073 5.66465 8.41495 6.00044 8.00073 6.00044C7.58652 6.00044 7.25073 5.66465 7.25073 5.25044C7.25073 4.83623 7.58652 4.50044 8.00073 4.50044C8.41495 4.50044 8.75073 4.83623 8.75073 5.25044ZM7.25073 8.25044C7.25073 7.83623 7.58652 7.50044 8.00073 7.50044C8.41494 7.50044 8.75073 7.83623 8.75073 8.25044V10.7504C8.75073 11.1647 8.41494 11.5004 8.00073 11.5004C7.58652 11.5004 7.25073 11.1647 7.25073 10.7504V8.25044Z"
                fill="currentColor"
            />
        </svg>
    )
}

function FieldError({ id, children }: FieldHintProps) {
    return (
        <Text as="p" tone="danger" size="copy" id={id}>
            <ErrorMessageIcon aria-hidden className={styles.errorMessageIcon} />
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
         * An error message associated with the field. It is rendered below the field, and with an
         * appearance that conveys that the field has currently an error (e.g. coloured red). It
         * also sets the field border red.
         *
         * It sets the `aria-errormessage` attribute pointing to the element that holds the error
         * message text, and sets `aria-invalid="true"`.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-errormessage
         * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid
         */
        error?: React.ReactNode

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
    error,
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
    const errorId = useId()

    const ariaDescribedBy = originalAriaDescribedBy ?? (hint ? hintId : undefined)
    const ariaErrorMessage = originalAriaErrorMessage ?? (error ? errorId : undefined)

    const childrenProps: ChildrenRenderProps = {
        id,
        'aria-describedby': ariaDescribedBy,
        'aria-errormessage': ariaErrorMessage,
        'aria-invalid': error ? true : undefined,
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
            {error ? <FieldError id={errorId}>{error}</FieldError> : null}
            {hint ? <FieldHint id={hintId}>{hint}</FieldHint> : null}
        </Stack>
    )
}

export { BaseField, FieldHint, FieldError }
export type { FieldComponentProps }
