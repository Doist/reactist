import * as React from 'react'
import { Box } from '../box'
import { BaseFieldProps, FieldHint } from '../base-field'
import styles from './switch-field.module.css'
import { useId } from '../common-helpers'

function join(...args: Array<string | null | undefined>) {
    const list = args.map((s) => s?.trim()).filter(Boolean)
    return list.length > 0 ? list.join(' ') : undefined
}

type SwitchFieldProps = BaseFieldProps<HTMLInputElement>

function SwitchField({
    label,
    hint,
    disabled = false,
    checked = false,
    maxWidth,
    ...props
}: SwitchFieldProps) {
    const id = useId(props.id)
    const hintId = useId()
    return (
        <Box className={[styles.container, disabled ? styles.disabled : null]} maxWidth={maxWidth}>
            <Box as="label" display="flex" alignItems="center">
                <Box className={[styles.inputWrapper, checked ? styles.checked : null]}>
                    <input
                        id={id}
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        aria-describedby={join(hint ? hintId : null, props['aria-describedby'])}
                        {...props}
                    />
                    <span className={styles.handle} />
                </Box>
                <span>{label}</span>
            </Box>
            {hint ? <FieldHint id={hintId}>{hint}</FieldHint> : null}
        </Box>
    )
}

export { SwitchField }
export type { SwitchFieldProps }
