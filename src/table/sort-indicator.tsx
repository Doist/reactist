import * as React from 'react'

import styles from './table.module.css'

function SortIndicator({ direction }: { direction: 'asc' | 'desc' }) {
    return (
        <svg className={styles.sortIndicatorIcon} viewBox="0 0 16 16" focusable="false">
            <path d={direction === 'asc' ? 'M4 10l4-4 4 4' : 'M4 6l4 4 4-4'} />
        </svg>
    )
}

export { SortIndicator }
