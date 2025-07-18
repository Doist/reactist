import * as React from 'react'
import { Box, BoxProps } from '../box'
import { useId } from '../utils/common-helpers'
import { Text } from '../text'
import styles from './base-field.module.css'
import { Stack } from '../stack'

import type { WithEnhancedClassName } from '../utils/common-types'
import { Spinner } from '../spinner'
import { Column, Columns } from '../columns'

// Define the remaining characters before the character count turns red
// See: https://twist.com/a/1585/ch/765851/t/6664583/c/93631846 for latest spec
const MAX_LENGTH_THRESHOLD = 0

type FieldTone = 'neutral' | 'success' | 'error' | 'loading'

type FieldMessageProps = {
    id: string
    children: React.ReactNode
    tone: FieldTone
}

function fieldToneToTextTone(tone: FieldTone) {
    return tone === 'error' ? 'danger' : tone === 'success' ? 'positive' : 'secondary'
}

function FieldMessage({ id, children, tone }: FieldMessageProps) {
    return (
        <Text as="p" tone={fieldToneToTextTone(tone)} size="copy" id={id}>
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

type FieldCharacterCountProps = {
    children: React.ReactNode
    tone: FieldTone
}

function FieldCharacterCount({ children, tone }: FieldCharacterCountProps) {
    return (
        <Text tone={fieldToneToTextTone(tone)} size="copy">
            {children}
        </Text>
    )
}

type ValidateInputLengthProps = {
    value?: React.InputHTMLAttributes<unknown>['value']
    maxLength?: number
}

type ValidateInputLengthResult = {
    count: string | null
    tone: FieldTone
}

function validateInputLength({
    value,
    maxLength,
}: ValidateInputLengthProps): ValidateInputLengthResult {
    if (!maxLength) {
        return {
            count: null,
            tone: 'neutral',
        }
    }

    const currentLength = String(value || '').length
    const isNearMaxLength = maxLength - currentLength <= MAX_LENGTH_THRESHOLD

    return {
        count: `${currentLength}/${maxLength}`,
        tone: isNearMaxLength ? 'error' : 'neutral',
    }
}

//
// BaseField
//

type ChildrenRenderProps = {
    id: string
    value?: React.InputHTMLAttributes<unknown>['value']
    'aria-describedby'?: string
    'aria-invalid'?: true
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    characterCountElement?: React.ReactNode | null
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

export type BaseFieldProps = WithEnhancedClassName &
    Pick<HtmlInputProps<HTMLInputElement>, 'id' | 'hidden' | 'maxLength' | 'aria-describedby'> & {
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
         * The initial value for this field element.
         *
         * This prop is used to calculate the character count for the initial value, and is then
         * passed to the underlying child element.
         */
        value?: React.InputHTMLAttributes<unknown>['value']

        /**
         * An optional extra element to be placed to the right of the main label.
         *
         * This extra element is not included in the accessible name of the field element. Its only
         * purpose is either visual, or functional (if you include interactive elements in it).
         *
         * @see BaseFieldProps['label']
         *
         * @deprecated The usage of this element is discouraged given that it was removed from the
         * latest form field spec revision.
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
         * The maximum number of characters that the input field can accept.
         * When this limit is reached, the input field will not accept any more characters.
         * The counter element will turn red when the number of characters is within 10 of the maximum limit.
         */
        maxLength?: number

        /**
         * Used internally by components composed using `BaseField`. It is not exposed as part of
         * the public props of such components.
         */
        children: (props: ChildrenRenderProps) => React.ReactNode

        /**
         * The position of the character count element.
         * It can be shown below the field or inline with the field.
         *
         * @default 'below'
         */
        characterCountPosition?: 'below' | 'inline' | 'hidden'
    } & (
        | {
              supportsStartAndEndSlots?: false
              endSlot?: never
              endSlotPosition?: never
          }
        | {
              supportsStartAndEndSlots: true
              endSlot?: React.ReactElement | string | number
              /**
               * This is solely for `bordered` variants of TextField. When set to `bottom` (the default),
               * the endSlot will be placed inline with the input field. When set to `fullHeight`, the endSlot
               * will be placed to the side of both the input field and the label.
               */
              endSlotPosition?: 'bottom' | 'fullHeight'
          }
    )

type FieldComponentProps<T extends HTMLElement> = Omit<
    BaseFieldProps,
    'children' | 'className' | 'fieldRef' | 'variant'
> &
    Omit<HtmlInputProps<T>, 'className' | 'style'>

/**
 * BaseField is a base component that provides a consistent structure for form fields.
 */
function BaseField({
    variant = 'default',
    label,
    value,
    auxiliaryLabel,
    message,
    tone = 'neutral',
    className,
    children,
    maxWidth,
    maxLength,
    hidden,
    'aria-describedby': originalAriaDescribedBy,
    id: originalId,
    characterCountPosition = 'below',
    endSlot,
    endSlotPosition = 'bottom',
}: BaseFieldProps & BaseFieldVariantProps & WithEnhancedClassName) {
    const id = useId(originalId)
    const messageId = useId()

    const inputLength = validateInputLength({ value, maxLength })

    const [characterCount, setCharacterCount] = React.useState<string | null>(inputLength.count)
    const [characterCountTone, setCharacterCountTone] = React.useState<FieldTone>(inputLength.tone)

    const ariaDescribedBy = originalAriaDescribedBy ?? (message ? messageId : null)

    const renderCharacterCountBelow = characterCountPosition === 'below' && characterCount !== null
    const renderCharacterCountInline =
        characterCountPosition === 'inline' && characterCount !== null

    function renderCharacterCount() {
        return <FieldCharacterCount tone={characterCountTone}>{characterCount}</FieldCharacterCount>
    }

    const childrenProps: ChildrenRenderProps = {
        id,
        value,
        ...(ariaDescribedBy ? { 'aria-describedby': ariaDescribedBy } : {}),
        'aria-invalid': tone === 'error' ? true : undefined,
        onChange(event) {
            if (!maxLength) {
                return
            }

            const inputLength = validateInputLength({
                value: event.currentTarget.value,
                maxLength,
            })

            setCharacterCount(inputLength.count)
            setCharacterCountTone(inputLength.tone)
        },
        // If the character count is inline, we pass it as a prop to the children element so it can be rendered inline
        characterCountElement: renderCharacterCountInline ? renderCharacterCount() : null,
    }

    React.useEffect(
        function updateCharacterCountOnPropChange() {
            if (!maxLength) {
                return
            }

            const inputLength = validateInputLength({
                value,
                maxLength,
            })

            setCharacterCount(inputLength.count)
            setCharacterCountTone(inputLength.tone)
        },
        [maxLength, value],
    )

    return (
        <Stack space="xsmall" hidden={hidden}>
            <Box
                display="flex"
                flexDirection="row"
                className={[
                    className,
                    styles.container,
                    tone === 'error' ? styles.error : null,
                    variant === 'bordered' ? styles.bordered : null,
                ]}
                maxWidth={maxWidth}
                alignItems="center"
            >
                <Box flexGrow={1}>
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
                                {label ? (
                                    <span className={styles.primaryLabel}>{label}</span>
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
                {endSlot && endSlotPosition === 'fullHeight' ? endSlot : null}
            </Box>

            {message || renderCharacterCountBelow ? (
                <Columns align="right" space="small" maxWidth={maxWidth}>
                    {message ? (
                        <Column width="auto">
                            <FieldMessage id={messageId} tone={tone}>
                                {message}
                            </FieldMessage>
                        </Column>
                    ) : null}

                    {/* If the character count is below the field, we render it, if it's inline,
                        we pass it as a prop to the children element so it can be rendered inline */}
                    {characterCountPosition === 'below' ? (
                        <Column width="content">{renderCharacterCount()}</Column>
                    ) : null}
                </Columns>
            ) : null}
        </Stack>
    )
}

export { BaseField, FieldMessage }
export type { BaseFieldVariant, BaseFieldVariantProps, FieldComponentProps }
