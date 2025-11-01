import { Box } from '../box'

import styles from './badge.module.css'

type BadgeTone = 'info' | 'positive' | 'promote' | 'attention' | 'warning'

type BadgeProps = {
    /**
     * The label to show inside the badge element.
     */
    label: string
    /**
     * The tone of the badge.
     */
    tone: BadgeTone
}

function Badge({ tone, label, ...props }: BadgeProps) {
    return (
        <Box
            {...props}
            as="span" // It enables putting the badge inside a button (https://stackoverflow.com/a/12982334)
            display="inline"
            className={[styles.badge, styles[`badge-${tone}`]]}
        >
            {label}
        </Box>
    )
}

export { Badge }
export type { BadgeProps }
