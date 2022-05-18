import * as React from 'react'
import { Box } from '../box'
import { Stack } from '../stack'
import { Text } from '../text'
import { HiddenVisually } from '../hidden-visually'
import { FieldComponentProps, FieldHint, FieldError } from '../base-field'
import { useId } from '../common-helpers'
import styles from './switch-field.module.css'

type SwitchFieldProps = Omit<
    FieldComponentProps<HTMLInputElement>,
    | 'type'
    | 'secondaryLabel'
    | 'auxiliaryLabel'
    | 'maxWidth'
    | 'aria-describedby'
    | 'aria-label'
    | 'aria-labelledby'
> & {
    /** Identifies the element (or elements) that describes the switch for assistive technologies. */
    'aria-describedby'?: string
    /** Defines a string value that labels the current switch for assistive technologies. */
    'aria-label'?: string
    /** Identifies the element (or elements) that labels the current switch for assistive technologies. */
    'aria-labelledby'?: string
}

const SwitchField = React.forwardRef<HTMLInputElement, SwitchFieldProps>(function SwitchField(
    {
        label,
        hint,
        error,
        disabled = false,
        hidden,
        defaultChecked,
        id: originalId,
        'aria-errormessage': originalAriaErrorMessage,
        'aria-describedby': originalAriaDescribedBy,
        'aria-label': originalAriaLabel,
        'aria-labelledby': originalAriaLabelledby,
        onChange,
        ...props
    },
    ref,
) {
    const id = useId(originalId)
    const hintId = useId()
    const errorId = useId()

    const ariaErrorMessage = originalAriaErrorMessage ?? (error ? errorId : undefined)
    const ariaDescribedBy = originalAriaDescribedBy ?? (hint ? hintId : undefined)
    const ariaLabel = originalAriaLabel ?? undefined
    const ariaLabelledBy = originalAriaLabelledby ?? undefined

    const [keyFocused, setKeyFocused] = React.useState(false)
    const [checkedState, setChecked] = React.useState(props.checked ?? defaultChecked ?? false)
    const isChecked = props.checked ?? checkedState

    return (
        <Stack space="small" hidden={hidden}>
            <Box
                className={[
                    styles.container,
                    disabled ? styles.disabled : null,
                    isChecked ? styles.checked : null,
                    keyFocused ? styles.keyFocused : null,
                ]}
                as="label"
                display="flex"
                alignItems="center"
            >
                <Box
                    position="relative"
                    display="inlineBlock"
                    overflow="visible"
                    marginRight="small"
                    flexShrink={0}
                    className={styles.toggle}
                >
                    <HiddenVisually>
                        <input
                            {...props}
                            id={id}
                            type="checkbox"
                            disabled={disabled}
                            aria-errormessage={ariaErrorMessage}
                            aria-invalid={error ? true : undefined}
                            aria-describedby={ariaDescribedBy}
                            aria-label={ariaLabel}
                            aria-labelledby={ariaLabelledBy}
                            ref={ref}
                            checked={isChecked}
                            onChange={(event) => {
                                onChange?.(event)
                                if (!event.defaultPrevented) {
                                    setChecked(event.currentTarget.checked)
                                }
                            }}
                            onBlur={(event) => {
                                setKeyFocused(false)
                                props?.onBlur?.(event)
                            }}
                            onKeyUp={(event) => {
                                setKeyFocused(true)
                                props?.onKeyUp?.(event)
                            }}
                        />
                    </HiddenVisually>
                    <span className={styles.handle} />
                </Box>
                <Text exceptionallySetClassName={styles.label}>{label}</Text>
            </Box>
            {error ? <FieldError id={errorId}>{error}</FieldError> : null}
            {hint ? <FieldHint id={hintId}>{hint}</FieldHint> : null}
        </Stack>
    )
})

export { SwitchField }
export type { SwitchFieldProps }
