import * as React from 'react'
import { VisuallyHidden } from 'reakit/VisuallyHidden'
import { Box } from '../box'
import { FieldComponentProps, FieldHint } from '../base-field'
import styles from './switch-field.module.css'
import { useId } from '../common-helpers'
import { Stack } from '../stack'

type SwitchFieldProps = Omit<
    FieldComponentProps<HTMLInputElement>,
    'type' | 'secondaryLabel' | 'auxiliaryLabel' | 'maxWidth'
>

const SwitchField = React.forwardRef<HTMLInputElement, SwitchFieldProps>(function SwitchField(
    {
        label,
        hint,
        disabled = false,
        hidden,
        defaultChecked,
        id: originalId,
        'aria-describedby': originalAriaDescribedBy,
        onChange,
        ...props
    },
    ref,
) {
    const id = useId(originalId)
    const hintId = useId()
    const ariaDescribedBy = originalAriaDescribedBy ?? (hint ? hintId : undefined)
    const [checkedState, setChecked] = React.useState(props.checked ?? defaultChecked ?? false)
    const isChecked = props.checked ?? checkedState
    return (
        <Stack space="small" hidden={hidden}>
            <Box
                className={[
                    styles.container,
                    disabled ? styles.disabled : null,
                    isChecked ? styles.checked : null,
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
                    <VisuallyHidden>
                        <input
                            {...props}
                            id={id}
                            type="checkbox"
                            disabled={disabled}
                            aria-describedby={ariaDescribedBy}
                            ref={ref}
                            checked={isChecked}
                            onChange={(event) => {
                                onChange?.(event)
                                if (!event.defaultPrevented) {
                                    setChecked(event.currentTarget.checked)
                                }
                            }}
                        />
                    </VisuallyHidden>
                    <span className={styles.handle} />
                </Box>
                <span className={styles.label}>{label}</span>
            </Box>
            {hint ? <FieldHint id={hintId}>{hint}</FieldHint> : null}
        </Stack>
    )
})

export { SwitchField }
export type { SwitchFieldProps }
