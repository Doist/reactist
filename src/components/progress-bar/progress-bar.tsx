import { HiddenVisually } from '../../hidden-visually'
import classNames from 'classnames'

import styles from './progress-bar.module.css'

type Props = {
    /** Additional css class applied to the progress bar. */
    className?: string
    /** How much of the progress bar should be filled. Number between 0 and 100 inclusive. */
    fillPercentage?: number
    /** Defines the human readable text alternative for assitive technologies. */
    'aria-valuetext'?: string
}
function ProgressBar({ fillPercentage = 0, className, 'aria-valuetext': ariaValuetext }: Props) {
    const finalClassName = classNames(styles.progressBar, className)
    const width = fillPercentage < 0 ? 0 : fillPercentage > 100 ? 100 : fillPercentage
    return (
        <div className={finalClassName}>
            <div className={styles.inner} style={{ width: `${width}%` }} />
            <HiddenVisually>
                <progress value={width} max={100} aria-valuetext={ariaValuetext ?? undefined} />
            </HiddenVisually>
        </div>
    )
}
ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
