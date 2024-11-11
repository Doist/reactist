import * as React from 'react'
import { getClassNames } from '../utils/responsive-props'
import { Box } from '../box'
import { Columns, Column } from '../columns'
import { AlertIcon } from '../icons/alert-icon'

import type { AlertTone } from '../utils/common-types'

import styles from './notice.module.css'

type NoticeProps = {
    id?: string
    children: React.ReactNode
    tone: AlertTone
}

function Notice({ id, children, tone }: NoticeProps) {
    return (
        <Box
            id={id}
            role="alert"
            aria-live="polite"
            className={[styles.container, getClassNames(styles, 'tone', tone)]}
        >
            <Columns space="small" alignY="top">
                <Column width="content">
                    <Box className={styles.icon}>
                        <AlertIcon tone={tone} />
                    </Box>
                </Column>
                <Column>
                    <Box className={styles.content}>{children}</Box>
                </Column>
            </Columns>
        </Box>
    )
}

export { Notice }
export type { NoticeProps }
