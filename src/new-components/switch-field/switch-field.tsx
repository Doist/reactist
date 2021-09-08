import * as React from 'react'
import { Box } from '../box'
import { Stack } from '../stack'
import { Text } from '../text'
import { HiddenVisually } from '../hidden-visually'
import { FieldComponentProps, FieldHint } from '../base-field'
import { useId } from '../common-helpers'
import styles from './switch-field.module.css'

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
                    <HiddenVisually>
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
                    </HiddenVisually>
                    <span className={styles.handle} />
                </Box>
                <Text exceptionallySetClassName={styles.label}>{label}</Text>
            </Box>
            {hint ? <FieldHint id={hintId}>{hint}</FieldHint> : null}
        </Stack>
    )
})

export { SwitchField }
export type { SwitchFieldProps }
