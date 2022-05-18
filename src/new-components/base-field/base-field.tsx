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

//
// BaseField
//

type ChildrenRenderProps = {
    id: string
    'aria-describedby'?: string
}

type HtmlInputProps<T extends HTMLElement> = React.DetailedHTMLProps<
    React.InputHTMLAttributes<T>,
    T
>

type BaseFieldProps = WithEnhancedClassName &
    Pick<HtmlInputProps<HTMLInputElement>, 'id' | 'hidden' | 'aria-describedby'> & {
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
         * A hint or help-like content associated as the accessible description of the field. It is
         * generally rendered below it, and with a visual style that reduces its prominence (i.e.
         * as secondary text).
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
                {children(ariaDescribedBy ? { id, 'aria-describedby': ariaDescribedBy } : { id })}
            </Box>
            {hint ? <FieldHint id={hintId}>{hint}</FieldHint> : null}
        </Stack>
    )
}

export { BaseField, FieldHint }
export type { FieldComponentProps }
