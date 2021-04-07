import * as React from 'react'
import classNames from 'classnames'
import { Box, BoxProps } from '../box'
import { useId } from '../common-helpers'
import { Text } from '../text'
import { WithEnhancedClassName } from '../common-types'
import styles from './base-field.module.css'

function FieldHint({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <Text component="p" tone="secondary" size="small" id={id} className={styles.fieldHint}>
            {children}
        </Text>
    )
}

//
// BaseField
//

type HtmlInputProps<T extends HTMLElement> = React.DetailedHTMLProps<
    React.InputHTMLAttributes<T>,
    T
>

interface BaseFieldChildren {
    children: (props: { id: string; 'aria-describedby'?: string }) => React.ReactNode
}

interface BaseFieldProps<T extends HTMLElement = HTMLInputElement>
    extends Omit<HtmlInputProps<T>, 'className' | 'style'> {
    label?: React.ReactNode
    secondaryLabel?: React.ReactNode
    auxiliaryLabel?: React.ReactNode
    hint?: React.ReactNode
    maxWidth?: BoxProps['maxWidth']
}

function BaseField({
    label,
    secondaryLabel,
    auxiliaryLabel,
    hint,
    className,
    children,
    maxWidth,
    ...props
}: BaseFieldProps & BaseFieldChildren & WithEnhancedClassName) {
    const id = useId(props.id)
    const hintId = useId()

    const ariaDescribedBy = hint
        ? classNames(hintId, props['aria-describedby'])
        : props['aria-describedby']

    return (
        <Box className={[className, styles.container]} maxWidth={maxWidth}>
            <Box
                component="span"
                display="flex"
                justifyContent="spaceBetween"
                alignItems="flexEnd"
                paddingBottom="small"
            >
                <Text component="label" htmlFor={id}>
                    {label ? <span className={styles.primaryLabel}>{label}</span> : null}
                    {secondaryLabel ? (
                        <span className={styles.secondaryLabel}>&nbsp;({secondaryLabel})</span>
                    ) : null}
                </Text>
                {auxiliaryLabel ? (
                    <Box className={styles.auxiliaryLabel}>{auxiliaryLabel}</Box>
                ) : null}
            </Box>
            {children(ariaDescribedBy ? { id, 'aria-describedby': ariaDescribedBy } : { id })}
            {hint ? <FieldHint id={hintId}>{hint}</FieldHint> : null}
        </Box>
    )
}

export { BaseField, FieldHint }
export { BaseFieldProps }
