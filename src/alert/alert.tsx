import * as React from 'react'
import { getClassNames } from '../utils/responsive-props'
import { Box } from '../box'
import { IconButton } from '../button'
import { Columns, Column } from '../columns'

import { AlertIcon } from '../icons/alert-icon'
import { CloseIcon } from '../icons/close-icon'

import styles from './alert.module.css'

import type { AlertTone } from '../utils/common-types'

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
            borderRadius="full"
            className={[styles.container, getClassNames(styles, 'tone', tone)]}
        >
            <Columns space="small" alignY="center">
                <Column width="content">
                    <AlertIcon tone={tone} className={styles.icon} />
                </Column>
                <Column>
                    <Box
                        paddingY="xsmall"
                        paddingRight={onClose != null && closeLabel != null ? undefined : 'small'}
                        display="flex"
                        alignItems="center"
                        className={styles.content}
                    >
                        {children}
                    </Box>
                </Column>
                {onClose != null && closeLabel != null ? (
                    <Column width="content">
                        <IconButton
                            variant="quaternary"
                            size="small"
                            onClick={onClose}
                            aria-label={closeLabel}
                            icon={<CloseIcon />}
                            style={{
                                // @ts-expect-error not sure how to make TypeScript understand custom CSS properties
                                '--reactist-btn-hover-fill': 'transparent',
                            }}
                        />
                    </Column>
                ) : null}
            </Columns>
        </Box>
    )
}

export { Alert }
export type { AlertProps }
