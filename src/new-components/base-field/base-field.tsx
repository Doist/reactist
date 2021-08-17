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
    hidden?: boolean
}

function FieldHint(props: FieldHintProps) {
    return <Text as="p" tone="secondary" size="copy" {...props} />
}

//
// BaseField
//

type HtmlInputProps<T extends HTMLElement> = React.DetailedHTMLProps<
    React.InputHTMLAttributes<T>,
    T
>

type BaseFieldProps = WithEnhancedClassName &
    Pick<HtmlInputProps<HTMLInputElement>, 'id' | 'hidden' | 'aria-describedby'> & {
        label: React.ReactNode
        secondaryLabel?: React.ReactNode
        auxiliaryLabel?: React.ReactNode
        hint?: React.ReactNode
        maxWidth?: BoxProps['maxWidth']
        children: (props: { id: string; 'aria-describedby'?: string }) => React.ReactNode
    }

type FieldComponentProps<T extends HTMLElement> = Omit<BaseFieldProps, 'children' | 'className'> &
    Omit<HtmlInputProps<T>, 'className' | 'style'>

function BaseField({
    label,
    secondaryLabel,
    auxiliaryLabel,
    hint,
    className,
    children,
    maxWidth,
    hidden,
    'aria-describedby': originalAriaDescribedBy,
    id: originalId,
}: BaseFieldProps & WithEnhancedClassName) {
    const id = useId(originalId)
    const hintId = useId()

    const ariaDescribedBy = originalAriaDescribedBy ?? (hint ? hintId : undefined)

    const fieldBox = (
        <Box className={className} maxWidth={maxWidth} hidden={hidden}>
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
            {children(ariaDescribedBy ? { id, 'aria-describedby': ariaDescribedBy } : { id })}
        </Box>
    )

    if (!hint) {
        return fieldBox
    }

    return (
        <Stack space="small">
            <Box className={className} maxWidth={maxWidth} hidden={hidden}>
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
                {children(ariaDescribedBy ? { id, 'aria-describedby': ariaDescribedBy } : { id })}
            </Box>
            {hint ? (
                <FieldHint hidden={hidden} id={hintId}>
                    {hint}
                </FieldHint>
            ) : null}
        </Stack>
    )
}

export { BaseField, FieldHint }
export type { FieldComponentProps }
