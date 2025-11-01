import { Box } from '../box'
import { Column, Columns } from '../columns'
import { AlertIcon } from '../icons/alert-icon'
import { getClassNames } from '../utils/responsive-props'

import styles from './notice.module.css'

import type { ReactNode } from 'react'
import type { AlertTone } from '../utils/common-types'

type NoticeProps = {
    id?: string
    children: ReactNode
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
                    <AlertIcon tone={tone} className={styles.icon} />
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
