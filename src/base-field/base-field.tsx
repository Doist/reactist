import * as React from 'react'

import { Box } from '../box'
import { Column, Columns } from '../columns'
import { Spinner } from '../spinner'
import { Stack } from '../stack'
import { Text } from '../text'
import { useId } from '../utils/common-helpers'

import styles from './base-field.module.css'

import type { BoxProps } from '../box'
import type { WithEnhancedClassName } from '../utils/common-types'

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
        return { count: null, tone: 'neutral' }
    }
    const currentLength = String(value || '').length
    const isNearMaxLength = maxLength - currentLength <= MAX_LENGTH_THRESHOLD
    return {
        count: `${currentLength}/${maxLength}`,
        tone: isNearMaxLength ? 'error' : 'neutral',
    }
}

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

export type BaseFieldProps = WithEnhancedClassName &
    Pick<HtmlInputProps<HTMLInputElement>, 'id' | 'hidden' | 'maxLength' | 'aria-describedby'> & {
        /** Main label. Pass `null` for components that render the label themselves. */
        label: React.ReactNode
        value?: React.InputHTMLAttributes<unknown>['value']
        /** @deprecated removed from the latest form-field spec; will be deleted in a future major. */
        auxiliaryLabel?: React.ReactNode
        message?: React.ReactNode
        tone?: FieldTone
        maxWidth?: BoxProps['maxWidth']
        maxLength?: number
        children: (props: ChildrenRenderProps) => React.ReactNode
        /** 'below' (default) renders the count under the field; 'inline' yields it via the render-prop; 'hidden' suppresses. */
        characterCountPosition?: 'below' | 'inline' | 'hidden'
    }

type FieldComponentProps<T extends HTMLElement> = Omit<
    BaseFieldProps,
    'children' | 'className' | 'fieldRef'
> &
    Omit<HtmlInputProps<T>, 'className' | 'style'>

function BaseField({
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
}: BaseFieldProps) {
    const id = useId(originalId)
    const messageId = useId()

    const inputLength = validateInputLength({ value, maxLength })

    const [previousValue, setPreviousValue] = React.useState<BaseFieldProps['value']>(value)
    const [previousMaxLength, setPreviousMaxLength] =
        React.useState<BaseFieldProps['maxLength']>(maxLength)
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
            if (!maxLength) return
            const inputLength = validateInputLength({
                value: event.currentTarget.value,
                maxLength,
            })
            setCharacterCount(inputLength.count)
            setCharacterCountTone(inputLength.tone)
        },
        characterCountElement: renderCharacterCountInline ? renderCharacterCount() : null,
    }

    if (value !== previousValue || maxLength !== previousMaxLength) {
        setPreviousValue(value)
        setPreviousMaxLength(maxLength)
        setCharacterCount(inputLength.count)
        setCharacterCountTone(inputLength.tone)
    }

    return (
        <Stack space="xsmall" hidden={hidden}>
            <Box className={[className, styles.container]} maxWidth={maxWidth}>
                {label || auxiliaryLabel ? (
                    <Box
                        as="span"
                        display="flex"
                        justifyContent="spaceBetween"
                        alignItems="flexEnd"
                    >
                        <Text size="body" as="label" htmlFor={id}>
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

            {message || renderCharacterCountBelow ? (
                <Columns align="right" space="small" maxWidth={maxWidth}>
                    {message ? (
                        <Column width="auto">
                            <FieldMessage id={messageId} tone={tone}>
                                {message}
                            </FieldMessage>
                        </Column>
                    ) : null}
                    {characterCountPosition === 'below' ? (
                        <Column width="content">{renderCharacterCount()}</Column>
                    ) : null}
                </Columns>
            ) : null}
        </Stack>
    )
}

export { BaseField, FieldMessage }
export type { FieldComponentProps }
