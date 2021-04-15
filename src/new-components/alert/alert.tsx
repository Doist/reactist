import * as React from 'react'
import { AlertTone } from '../common-types'
import { getClassNames } from '../responsive-props'
import { Box } from '../box'
import { Columns, Column } from '../columns'

import { AlertIcon } from '../icons/alert-icon'
import { CloseIcon } from '../icons/close-icon'

import styles from './alert.module.css'

type AllOrNone<T> = T | { [K in keyof T]?: never }

type AlertCloseProps = AllOrNone<{
    closeLabel: string
    onClose: () => void
}>

type AlertProps = {
    id?: string
    children: React.ReactNode
    tone: AlertTone
} & AlertCloseProps

function Alert({ id, children, tone, closeLabel, onClose }: AlertProps) {
    return (
        <Box
            id={id}
            role="alert"
            aria-live="polite"
            padding="small"
            className={[styles.container, getClassNames(styles, 'tone', tone)]}
        >
            <Columns space="small" alignY="top">
                <Column width="content">
                    <AlertIcon tone={tone} />
                </Column>
                <Column>{children}</Column>
                {onClose != null ? (
                    <Column width="content">
                        <button type="button" onClick={onClose} aria-label={closeLabel}>
                            <CloseIcon />
                        </button>
                    </Column>
                ) : null}
            </Columns>
        </Box>
    )
}

export { Alert }
export type { AlertProps }
