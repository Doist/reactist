import * as React from 'react'

import classNames from 'classnames'

import { HiddenVisually } from '../../hidden-visually'

import styles from './progress-bar.module.css'

type Props = {
    /** Additional css class applied to the progress bar. */
    className?: string
    /** How much of the progress bar should be filled. Number between 0 and 100 inclusive. */
    fillPercentage?: number
    /** Defines the human readable text alternative for assitive technologies. */
    'aria-valuetext'?: string
    /** When true, renders a percentage scale with tick marks below the progress bar. */
    showScale?: boolean
}
function ProgressBar({
    fillPercentage = 0,
    className,
    'aria-valuetext': ariaValuetext,
    showScale,
}: Props) {
    const width = fillPercentage < 0 ? 0 : fillPercentage > 100 ? 100 : fillPercentage

    const bar = (
        <div className={classNames(styles.progressBar, !showScale && className)}>
            <div className={styles.inner} style={{ width: `${width}%` }} />
            <HiddenVisually>
                <progress value={width} max={100} aria-valuetext={ariaValuetext ?? undefined} />
            </HiddenVisually>
        </div>
    )

    if (!showScale) {
        return bar
    }

    return (
        <div className={classNames(styles.wrapper, className)}>
            {bar}
            <div className={styles.scaleContainer}>
                <div className={styles.ticks} aria-hidden="true">
                    <span>00</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span />
                </div>
            </div>
        </div>
    )
}
ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
